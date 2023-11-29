import Paper, { Point } from 'paper';
import { usePSStore } from '../stores/PSstore';
import { makeAutoAlign, setCenter } from './coords';

import { createShell } from './shapes/shell';
import { setting } from './common';

let oldDelta = new Point(0, 0);

export function install() {
  const canvas = <HTMLCanvasElement>document.getElementById('feedback-layer');

  const store = usePSStore();

  Paper.setup(canvas);

  store.view = Paper.project.view;
  store.layer = Paper.project.activeLayer;
  store.view.zoom = 0.5;

  store.view.center = setCenter();

  update(true);

  store.loading = false;

  store.view.onMouseDrag = (event: any) => {
    if (store.dragging || store.onconnection || store.onmessage) return;

    store.view.translate(event.delta.subtract(oldDelta));
    oldDelta = oldDelta.subtract(event.delta);
  };

  canvas.addEventListener('wheel', (ev: any) => {
    if (ev.wheelDelta > 0 && store.view.zoom < 1.5) store.view.zoom += 0.07;

    if (ev.wheelDelta < 0 && store.view.zoom > 0.25) store.view.zoom -= 0.07;
  });
}

export function update(start?: boolean) {
  const store = usePSStore();

  store.connect = [];
  store.shells = [];

  if (!start) store.layer.removeChildren();

  for (const input of store.feedback.inputs) {
    const elSetting = setting[input.type];
    Object.assign(input, { setting: elSetting });
  }

  for (let i = 0; i < store.feedback.inputs.length; i++) {
    const coords = makeAutoAlign();

    const { shell, platform } = createShell(
      store.feedback.inputs[i],
      coords[i]
    );

    store.feedback.inputs[i] = Object.assign(store.feedback.inputs[i], {
      shell,
      platform,
    });
  }

  store.mountLink();
}
