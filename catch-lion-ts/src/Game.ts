import { Board, Cell, DeadZone } from './Board';
import { Player, PlayerType } from './Player';

export class Game {
  private selectedCell: Cell;
  private turn = 0;
  private currentPlayer: Player;
  private gameInfoEl = document.querySelector('.alert');
  private state: 'STARTED' | 'END';

  readonly upperPlayer = new Player(PlayerType.UPPER);
  readonly lowerPlayer = new Player(PlayerType.LOWER);
  readonly board = new Board(this.upperPlayer, this.lowerPlayer);
  readonly upperDeadZone = new DeadZone('UPPER');
  readonly lowerDeadZone = new DeadZone('LOWER');

  constructor() {
    const boardContainer = document.querySelector('.board-container');
    boardContainer?.firstChild?.remove();
    boardContainer?.appendChild(this.board._el);

    this.currentPlayer = this.upperPlayer;

    this.board.render();
    this.renderInfo();
  }

  renderInfo() {
    this.gameInfoEl?.innerHTML = `#${this.turn}턴 ${this.currentPlayer.type} 차례`;
  }
  changeTurn() {
    this.selectedCell.deactive();
    this.selectedCell = null;

    if (this.state === 'END') {
      this.renderInfo(`END! winner is ${this.currentPlayer.type}`);
    } else {
      this.turn += 1;
      this.currentPlayer =
        this.currentPlayer === this.lowerPlayer
          ? this.upperPlayer
          : this.lowerPlayer;
      this.renderInfo();
    }
    this.board.render();
  }
}
