import { GameBoard } from "./board/game_board";

let gameBoard = new GameBoard(3);

const gameBoardCanvas = (document.getElementById("game_board_canvas") as HTMLCanvasElement);

gameBoard.renderToCanvas(gameBoardCanvas);