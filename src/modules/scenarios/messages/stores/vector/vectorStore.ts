import { ref } from 'vue';
import { defineStore } from 'pinia';

import { useConnect, useMove } from '../../../utils';
import { getRect } from 'src/utils/helpers/dom';
import { handlerUpdate } from 'src/utils/helpers/handles';

import { Connection } from '../classes';

import { VectorStore, ScrollAreaEvent } from './model';

export const useVectorStore = defineStore({
  id: 'vector',
  state: () =>
    ref({
      connections: [],

      mountedParent: false,
      mountedLine: null,

      linesValue: [],

      scrollValues: {
        horizontal: 0,
        vertical: 0,
      },

      parentEl: null,
      messageEl: null,
      buttonEl: null,
    } as VectorStore),
  getters: {
    connection: (state): boolean => state.mountedLine !== null,
    lines: (state): Connection[] => state.linesValue,
    scroll: (state) => state.scrollValues,
  },
  actions: {
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
    moving(e: MouseEvent) {
      const line = useMove(e);

      this.mountedLine?.applyLine(line);
    },
    startMove(e: MouseEvent, message_id: number, button_id: number) {
      this.mountingLine(message_id, button_id);
      if (this.mountedLine === null) return;

      document.addEventListener('mousemove', this.moving, false);

      this.moving(e);
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
  },
});
