import { Connection } from '../classes';

export interface VectorStore {
  connections: SCConnection[];

  mountedParent: boolean;
  mountedLine: Connection | null;

  linesValue: Connection[];

  parentEl: DOMRect | null;
  buttonEl: DOMRect | null;
  messageEl: DOMRect | null;

  scrollValues: {
    horizontal: number;
    vertical: number;
  };
}

export interface Line {
  start_x: number;
  start_y: number;
  end_x: number;
  end_y: number;
  reverse: boolean;
  path: string;
  polygon: string;
}

export interface ScrollAreaEvent {
  horizontalPosition: number;
  verticalPosition: number;
}
