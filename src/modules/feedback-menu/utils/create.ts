import Paper, { Point } from 'paper';
import { useFeedbackStore } from '../stores/feedbackStore';
import { setCenter } from './coords';

import { createShell } from './shapes/shell';
import { setting } from './common';
import { FirstConnection } from './lines/connection';

let oldDelta = new Point(0, 0);

export function install() {
  const canvas = <HTMLCanvasElement>document.getElementById('feedback-layer');

  const store = useFeedbackStore();

  Paper.setup(canvas);

  store.view = Paper.project.view;
  store.layer = Paper.project.activeLayer;
  store.view.zoom = 0.5;

  store.view.center = setCenter();

  update(true);

  store.loading = false;

  store.view.onMouseDrag = (event: any) => {
    if (store.dragging || store.onconnection) return;

    store.view.translate(event.delta.subtract(oldDelta));
    oldDelta = oldDelta.subtract(event.delta);
  };

  canvas.addEventListener('wheel', (ev: any) => {
    const oldZoom = store.view.zoom;
    const newZoom = ev.deltaY > 0 ? oldZoom * 0.92 : oldZoom * 1.08;

    if (newZoom > 1.5 || newZoom < 0.25) {
      return;
    }

    const mousePosition = new Point(ev.offsetX, ev.offsetY);

    const to = store.view.viewToProject(mousePosition);
    const center = store.view.center;

    const ratio = oldZoom / newZoom;
    const pc = to.subtract(center);
    const offset = to.subtract(pc.multiply(ratio)).subtract(center);

    store.view.zoom = newZoom;
    store.view.center = store.view.center.add(offset);
  });
}

export function update(start?: boolean) {
  const store = useFeedbackStore();

  store.connect = [];
  store.shells = [];

  if (!start) store.layer.removeChildren();

  for (const input of store.feedback.inputs) {
    const elSetting = setting[input.type];
    Object.assign(input, { setting: elSetting });
  }

  for (let i = 0; i < store.feedback.inputs.length; i++) {
    const { shell, platform } = createShell(store.feedback.inputs[i], [0, 0]);

    store.feedback.inputs[i] = Object.assign(store.feedback.inputs[i], {
      shell,
      platform,
    });
  }

  store.mountLink();

  if (!store.feedback.inputs.length) {
    const connection = new FirstConnection();

    store.first = connection.group;
  } else {
    store.first?.remove();
  }
}
