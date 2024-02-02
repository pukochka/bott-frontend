import Paper, { Point } from 'paper';
import { useFeedbackStore } from '../stores/feedbackStore';
import { makeAutoAlign, setCenter } from './coords';

import { createShell } from './shapes/shell';
import { setting } from './common';
import { FirstConnection } from './lines/connection';

let oldDelta = new Point(0, 0);

export function install() {
  const canvas = <HTMLCanvasElement>document.getElementById('feedback-layer');

  const feedback = useFeedbackStore();

  Paper.setup(canvas);

  feedback.view = Paper.project.view;
  feedback.layer = Paper.project.activeLayer;
  feedback.view.zoom = 0.5;

  feedback.view.center = setCenter();

  update(true);

  feedback.loading = false;

  feedback.view.onMouseDrag = (event: any) => {
    if (feedback.dragging || feedback.onconnection) return;

    feedback.view.translate(event.delta.subtract(oldDelta));
    oldDelta = oldDelta.subtract(event.delta);
  };

  canvas.addEventListener('wheel', (ev: any) => {
    const oldZoom = feedback.view.zoom;
    const newZoom = ev.deltaY > 0 ? oldZoom * 0.92 : oldZoom * 1.08;

    if (newZoom > 1.5 || newZoom < 0.25) {
      return;
    }

    const mousePosition = new Point(ev.offsetX, ev.offsetY);

    const to = feedback.view.viewToProject(mousePosition);
    const center = feedback.view.center;

    const ratio = oldZoom / newZoom;
    const pc = to.subtract(center);
    const offset = to.subtract(pc.multiply(ratio)).subtract(center);

    feedback.view.zoom = newZoom;
    feedback.view.center = feedback.view.center.add(offset);
  });
}

export function update(start?: boolean) {
  const feedback = useFeedbackStore();

  feedback.connect = [];
  feedback.shells = [];

  if (!start) feedback.layer.removeChildren();

  for (const input of feedback.feedback.inputs) {
    const elSetting = setting[input.type];
    Object.assign(input, { setting: elSetting });
  }

  const coords = makeAutoAlign();

  for (let i = 0; i < feedback.feedback.inputs.length; i++) {
    const { shell, platform } = createShell(
      feedback.feedback.inputs[i],
      feedback.feedback.inputs.length === 1 ? [0, 0] : coords[i]
    );

    feedback.feedback.inputs[i] = Object.assign(feedback.feedback.inputs[i], {
      shell,
      platform,
    });
  }

  if (start) {
    const center = setCenter();

    if (
      center.x === 0 &&
      center.y === 0 &&
      feedback.feedback.inputs.length >= 2
    ) {
      feedback.view.center = new Point([
        ((feedback.feedback.inputs.length - 1) * 300) / 2,
        0,
      ]);
    }
  }

  feedback.mountLink();

  if (!feedback.feedback.inputs.length) {
    const connection = new FirstConnection();

    feedback.first = connection.group;
  } else {
    feedback.first?.remove();
  }
}
