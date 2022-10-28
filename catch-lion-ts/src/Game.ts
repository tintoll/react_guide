import { Board, DeadZone } from './Board';

export class Game {
  readonly board = new Board();
  readonly upperDeadZone = new DeadZone('UPPER');
  readonly lowerDeadZone = new DeadZone('LOWER');

  constructor() {
    const boardContainer = document.querySelector('.board-container');
    boardContainer?.firstChild?.remove();
    boardContainer?.appendChild(this.board._el);
  }
}
