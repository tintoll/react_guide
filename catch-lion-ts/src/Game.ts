import { Board, Cell, DeadZone } from './Board';
import { Lion } from './Piece';
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

    this.board._el.addEventListener('click', (e) => {
      if (this.state === 'END') {
        return false;
      }

      if (e.target instanceof HTMLElement) {
        let cellEl: HTMLElement;
        if (e.target.classList.contains('cell')) {
          cellEl = e.target;
        } else if (e.target.classList.contains('piece')) {
          cellEl = e.target.parentElement;
        } else {
          return false;
        }

        let cell = this.board.map.get(cellEl);
        if (this.isCurrentUserPiece(cell)) {
          this.select(cell);
          return false;
        }

        if (this.selectedCell) {
          this.move(cell);
          this.changeTurn();
        }
      }
    });
  }

  move(cell: Cell) {
    cell.deactive();
    const killed = this.selectedCell
      .getPiece()
      .move(this.selectedCell, cell)
      .getKilled();
    this.selectedCell = cell;
    if (killed) {
      if (killed.ownerType === PlayerType.UPPER) {
        this.lowerDeadZone.put(killed);
      } else {
        this.upperDeadZone.put(killed);
      }

      if (killed instanceof Lion) {
        this.state = 'END';
      }
    }
  }

  isCurrentUserPiece(cell: Cell) {
    return (
      cell != null &&
      cell.getPiece() != null &&
      cell.getPiece().ownerType === this.currentPlayer.type
    );
  }

  select(cell: Cell) {
    if (cell.getPiece() == null) {
      return;
    }

    if (cell.getPiece().ownerType !== this.currentPlayer.type) return;

    if (this.selectedCell) {
      this.selectedCell.deactive();
      this.selectedCell.render();
    }

    this.selectedCell = cell;
    cell.active();
    cell.render();
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
