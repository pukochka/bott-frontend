import { ref } from 'vue';
import { defineStore } from 'pinia';

import { useConnect, useMove } from '../../../utils';
import { getRect } from 'src/utils/helpers/dom';
import { handlerUpdate } from 'src/utils/helpers/handles';

import { CombineLine, Connection } from '../classes';

import { VectorStore, ScrollAreaEvent } from './model';

export const useVectorStore = defineStore({
  id: 'vector',
  state: () =>
    ref({
      followingMessages: [],
      connections: [],

      mountedParent: false,
      mountedLine: null,
      mountedCombine: null,

      editCombine: null,
      editConnection: null,

      linesValue: [],

      combineLines: [],

      scrollValues: {
        horizontal: 0,
        vertical: 0,
      },

      parentEl: null,
      messageEl: null,
      buttonEl: null,
    } as VectorStore),
  getters: {
    combining: (state) => state.mountedCombine !== null,
    connection: (state): boolean => state.mountedLine !== null,
    lines: (state): Connection[] => state.linesValue,
    scroll: (state) => state.scrollValues,
  },
  actions: {
    update() {
      this.updateCombined();
      this.updateConnections();
    },
    positionParent() {
      this.parentEl = getRect('container');
    },
    positionElems(message_id: number, button_id: number) {
      this.messageEl = getRect('message_' + message_id);
      this.buttonEl = getRect('button_' + button_id);
    },
    updateScroll(event: ScrollAreaEvent) {
      const { horizontalPosition, verticalPosition } = event;

      this.scrollValues.horizontal = horizontalPosition;
      this.scrollValues.vertical = verticalPosition;

      if (this.mountedLine !== null)
        this.positionElems(
          this.mountedLine.message_id,
          this.mountedLine.button_id
        );
    },
    mountingLine(message_id: number, button_id: number) {
      const line = new Connection(
        message_id,
        button_id,
        handlerUpdate(
          () => this.positionElems(message_id, button_id),
          'reverse'
        )
      );

      if (this.linesValue.find((item) => item.button_id === line.button_id)) {
        const index = this.linesValue
          .map((line) => line.button_id)
          .indexOf(button_id);

        this.linesValue[index] = line;
      } else {
        this.linesValue.push(line);
      }

      this.mountedLine = line;

      this.positionParent();
      this.positionElems(message_id, button_id);
    },
    /**
     *
     * */
    moving(ev: MouseEvent) {
      const line = useMove(ev);

      this.mountedLine?.applyLine(line);
    },
    startMove(ev: MouseEvent, message_id: number, button_id: number) {
      this.mountingLine(message_id, button_id);

      if (this.mountedLine === null) return;

      this.moving(ev);
      document.addEventListener('mousemove', this.moving, false);
    },
    endMove(end: number) {
      document.removeEventListener('mousemove', this.moving, false);

      if (this.mountedLine) {
        this.mountedLine.line = useConnect(
          end,
          this.mountedLine?.button_id ?? 0
        );
        this.applyConnection(end, this.mountedLine?.button_id ?? 0);

        this.mountedLine = null;
      }
    },
    /**
     *
     * */
    setConnections(value: SCConnection[]) {
      this.connections = value;

      this.equal();
    },
    applyConnection(message_id: number, button_id: number) {
      const index = this.connections
        .map((item) => item.button_id)
        .indexOf(button_id);

      const connection = { message_id: message_id, button_id: button_id };

      if (index === -1) this.connections.push(connection);
      else this.connections[index] = connection;
    },
    /**
     *
     * */
    updateConnections() {
      for (const { message_id, button_id } of this.connections) {
        const line = useConnect(message_id, button_id);

        const index = this.linesValue
          .map((line) => line.button_id)
          .indexOf(button_id);

        if (index === -1) continue;

        this.linesValue[index].line = line;
      }
    },
    mountingConnections() {
      for (const { message_id, button_id } of this.connections) {
        const line = useConnect(message_id, button_id);

        const connection = new Connection(
          message_id,
          button_id,
          undefined,
          line
        );

        this.linesValue.push(connection);
      }
    },

    deleteConnection(by: 'message_id' | 'button_id', id: number) {
      this.linesValue = this.linesValue.filter((item) => item[by] !== id);
      this.connections = this.connections.filter((item) => item[by] !== id);
    },
    equal() {
      for (const { button_id } of this.linesValue) {
        const index = this.connections
          .map((item) => item.button_id)
          .indexOf(button_id);

        if (index === -1)
          this.linesValue = this.linesValue.filter(
            (line) => line.button_id !== button_id
          );
      }
    },
    /**
     * Костыли нужно убрать TODO
     * Объденить всё в единую систему
     * */

    startCombine(ev: MouseEvent, start_id: number) {
      const index = this.combineLines.map((item) => item.id).indexOf(start_id);
      const line = new CombineLine('bottom_target_' + start_id, ev);

      if (index !== -1 && this.combineLines[index]) {
        this.mountedCombine = this.combineLines[index];
      } else {
        this.mountedCombine = line;
        this.combineLines.push(line);
      }

      document.addEventListener('mousemove', this.movingCombine, false);
    },
    movingCombine(ev: MouseEvent) {
      if (this.mountedCombine) this.mountedCombine.move(ev);
    },
    endCombine(end_id: number) {
      document.removeEventListener('mousemove', this.movingCombine, false);

      if (this.mountedCombine)
        this.mountedCombine.combine('top_target_' + end_id, 20);

      this.mountedCombine = null;
    },

    updateCombined() {
      for (const combineEl of this.combineLines) {
        combineEl.combine(combineEl.endId ?? '', 20);
      }

      this.combineLines = this.combineLines.filter((item) => !item.deleted);
    },

    renderCombine() {
      for (const [start_id, end_id] of this.followingMessages) {
        const line = new CombineLine('bottom_target_' + start_id);

        line.combine('top_target_' + end_id, 20);

        this.combineLines.push(line);
      }
    },

    updateCurrentCombine() {
      const [id, endId] = <[number, string]>this.editCombine;

      this.combineLines.forEach((item) => {
        if (item.id === id) item.endId = endId;
      });

      this.updateCombined();
      this.editCombine = null;
    },
    dropCombineLine(id: number) {
      this.combineLines = this.combineLines.filter((item) => item.id !== id);
    },
  },
});
