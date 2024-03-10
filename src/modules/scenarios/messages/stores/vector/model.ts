import { CombineLine, Connection } from '../classes';

export interface VectorStore {
  followingMessages: Array<Array<number>>;
  connections: Array<SCConnection>;

  mountedParent: boolean;
  mountedLine: Connection | null;
  mountedCombine: CombineLine | null;

  editCombine: [number, string] | null;
  editConnection: [number, number] | null;

  linesValue: Array<Connection>;
  combineLines: Array<CombineLine>;

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
