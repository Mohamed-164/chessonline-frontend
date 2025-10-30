import { color, socket, duration, gamecode } from "./onlineChess.js";
import { board } from "./boarddata_o.js";
import { timer } from "./timer_o.js";
import { RookMovement } from "./Rook_o.js";
import { kingMovement } from "./king_o.js";
import { QueenMovement } from "./queen_o.js";
import { knightMovement } from "./Knight_o.js";
import { BishopMovement } from "./Bishop_o.js";
import { pawnMovement } from "./pawnMovement_o.js";
import { iskinginCheck } from "./checkDetection_o.js";
import { stalemate } from "./StalemateDetection_o.js";
import { check } from "./preloadsound_o.js";
import { whitecheckBlocker } from "./whiteCheckBlocker_o.js";
import { blackcheckBlocker } from "./blackCheckBlocker_o.js";
import { blackClickDiable, whiteClickDisable } from "./clickManagement.js";
import {
  whitepawnlocation,
  blackKinglocation,
  whiteKnightloaction,
  whiterookORqueenlocation,
  whiteBishopORqueenlocation,
  isblackpathinthread,
} from "./blackPathDetection_o.js";
import {
  blackpawnlocation,
  whiteKinglocation,
  blackKnightloaction,
  blackrookORqueenlocation,
  blackBishopORqueenlocation,
  iswhitepathinthread,
} from "./whitePathDetection_o.js";

export let WhiteCapturedPiece = [];
export let BlackCapturedPiece = [];
export let gameState = [];

let gamefinish = false;

export let Timer = null;

export class gamemove {
  constructor(mycolor, code, pastrow, pastcol, currentrow, currentcol) {
    this.mycolor = mycolor;
    this.code = code;
    this.fromrow = pastrow;
    this.fromcol = pastcol;
    this.torow = currentrow;
    this.tocol = currentcol;
  }
}

function resetgame() {
  window.location.reload();
}

window.resetgame = resetgame;

export function gameOver() {
  gamefinish = true;
  let { whitepauseTimer, blackpauseTimer } = Timer;
  const whiteresign = document.querySelector(".whiteresign");

  whiteresign.disabled = true;
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      let cell = document.querySelector(
        `.cell[data-row="${i}"][data-col="${j}"]`
      );
      cell.onclick = null;
    }
  }
  whitepauseTimer();
  blackpauseTimer();
}

function capturedpieceshown() {
  const whiteCapture = document.querySelector(".Whitecapture");
  const blackCapture = document.querySelector(".blackcapture");
  whiteCapture.innerHTML = "";
  blackCapture.innerHTML = "";

  for (let i = 0; i < WhiteCapturedPiece.length; i++) {
    const capturecell = document.createElement("div");
    let [piece] = WhiteCapturedPiece[i];
    capturecell.classList.add("capturecell");
    const img = document.createElement("img");
    img.src = pieceImagePath(piece);
    img.alt = piece;
    capturecell.appendChild(img);
    whiteCapture.appendChild(capturecell);
  }

  for (let i = 0; i < BlackCapturedPiece.length; i++) {
    const capturecell = document.createElement("div");
    let [piece] = BlackCapturedPiece[i];
    capturecell.classList.add("capturecell");
    const img = document.createElement("img");
    img.src = pieceImagePath(piece);
    img.alt = piece;
    capturecell.appendChild(img);
    blackCapture.appendChild(capturecell);
  }
}

function pieceImagePath(piece) {
  const map = {
    P: "../pieces_Img/whitePawn.png",
    p: "../pieces_Img/blackPawn.png",
    R: "../pieces_Img/whiteRook.png",
    r: "../pieces_Img/blackRook.png",
    N: "../pieces_Img/whiteKnight.png",
    n: "../pieces_Img/blackKnight.png",
    B: "../pieces_Img/whiteBishop.png",
    b: "../pieces_Img/blackBishop.png",
    Q: "../pieces_Img/whiteQueen.png",
    q: "../pieces_Img/blackQueen.png",
    K: "../pieces_Img/whiteKing.png",
    k: "../pieces_Img/blackKing.png",
  };
  return map[piece] || null;
}

function initializetimer() {
  Timer = timer();
}

let desktopview = window.innerWidth;

function handler() {

  const chessboard = document.getElementById("chessboard");
  const pieceImg = document.querySelectorAll(".cell img");
  const blacktimer = document.querySelector(".blacktimer");
  const whitetimer = document.querySelector(".whitetimer");
  const whitecapture = document.querySelector('.Whitecapture');
  const blackcapture = document.querySelector('.blackcapture');

  function adjustCaptureCell(){
      blackcapture.style.gridColumn = "1";
      whitecapture.style.gridColumn = "1";
  }
  if (color == "white") {
    blackClickDiable();
  }
  if (color == "black") {
    if (desktopview > 600) { 
      blackcapture.style.gridRow = "3";
      whitecapture.style.gridRow = "1";
      adjustCaptureCell();
      blacktimer.style.gridRow = "3";
      blacktimer.style.gridColumn = "2";
      whitetimer.style.gridRow = "1";
      whitetimer.style.gridColumn = "2";

    }else if(desktopview < 600){
      blackcapture.style.gridRow = "4";
      whitecapture.style.gridRow = "2";
      blacktimer.style.gridRow = "5";
      blacktimer.style.gridColumn = "1";
      whitetimer.style.gridRow = "1";
      whitetimer.style.gridColumn = "1";
     adjustCaptureCell();  
    }
    chessboard.style.transform = "rotate(180deg)";

    pieceImg.forEach((e) => {
      e.style.transform = "rotate(180deg)";
    });
    whiteClickDisable();
  }

  if (Timer == null && duration !== 0) {
    initializetimer();
  }
  let {
    whitestartTimer,
    blackstartTimer,
  } = Timer ?? {};
  if (gameState.length < 1) {
    blackClickDiable();
    if (duration) {
      whitestartTimer();
    }
  }
  if (gameState.length == 1) {
    if (duration) {
      blackstartTimer();
    }
  }
  if (gameState.length > 0) {
    let [piece, currentrow, currentcol, pastrow, pastcol] = gameState.at(-1);
    let piececolor = piece === piece.toUpperCase() ? true : false;
    let pastcell = document.querySelector(
      `.cell[data-row="${pastrow}"][data-col="${pastcol}"]`
    );
    let currentcell = document.querySelector(
      `.cell[data-row="${currentrow}"][data-col="${currentcol}"]`
    );
    pastcell.classList.add("pasthighlight");
    currentcell.classList.add("currenthighlight");
    if (piececolor) {
      whiteClickDisable();
    } else {
      blackClickDiable();
    }
  }
}

export function clearHighlights() {
  const highlighted = document.querySelectorAll(
    ".cell.highlighted, .cell.AttackHighlight"
  );
  highlighted.forEach((cell) => {
    cell.classList.remove("highlighted", "AttackHighlight");
    cell.onclick = null;
    renderboard(board,false);
  });
}

let previouspiece = { Row: null, Col: null };
let previousclick = null;

export function renderboard(board) {
  const chessboard = document.getElementById("chessboard");
  chessboard.innerHTML = "";
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.row = row;
      cell.dataset.col = col;
      const piece = board[row][col];
      const pieceImgPath = pieceImagePath(piece);
      if (pieceImgPath) {
        const img = document.createElement("img");
        img.src = pieceImgPath;
        img.alt = piece;
        cell.appendChild(img);
      }
      if (piece == piece.toUpperCase()) {
        cell.style.color = "rgba(211, 236, 255, 1)";
        cell.style.textShadow =
          "0 0 1px black, 0 0 2px black, 0 0 3px black, 0 0 4px black, 0 0 5px black";
      }
      if ((row + col) % 2 === 0) {
        cell.style.backgroundColor = "#ffffffff";
      } else {
        cell.style.backgroundColor = "#6e96bfff";
      }
      cell.onclick = () => {
        clearHighlights();
        let clickedPiece = board[row][col];
        let clickedcell = document.querySelector(
          `.cell[data-row="${row}"][data-col="${col}"]`
        );
        if (previousclick !== null) {
          previousclick.classList.remove("clickhighlight");
        }
        if (board[row][col] !== "") {
          clickedcell.classList.add("clickhighlight");
          previousclick = clickedcell;
        }
        let locationOfPiece = { row, col };
        if (previouspiece.Row !== null && previouspiece.Col !== null) {
          if (previouspiece.Row == row && previouspiece.Col == col) {
            clearHighlights();
            previousclick.classList.remove("clickhighlight");
            previouspiece.Row = null;
            previouspiece.Col = null;
            return;
          }
        }
        previouspiece.Row = row;
        previouspiece.Col = col;
        if (clickedPiece === "") {
          clearHighlights();
          return;
        } else if (clickedPiece == "P" || clickedPiece == "p") {
          pawnMovement(board, clickedPiece, locationOfPiece);
        } else if (clickedPiece == "N" || clickedPiece == "n") {
          knightMovement(board, clickedPiece, locationOfPiece);
        } else if (clickedPiece == "R" || clickedPiece == "r") {
          RookMovement(board, clickedPiece, locationOfPiece);
        } else if (clickedPiece == "B" || clickedPiece == "b") {
          BishopMovement(board, clickedPiece, locationOfPiece);
        } else if (clickedPiece == "Q" || clickedPiece == "q") {
          QueenMovement(board, clickedPiece, locationOfPiece);
        } else if (clickedPiece == "K" || clickedPiece == "k") {
          kingMovement(board, clickedPiece, locationOfPiece);
        }
      };
      chessboard.appendChild(cell);
    }
  }
  whitepawnlocation();
  whiteKnightloaction();
  blackKinglocation();
  whiterookORqueenlocation();
  whiteBishopORqueenlocation();
  blackpawnlocation();
  blackKnightloaction();
  whiteKinglocation();
  blackrookORqueenlocation();
  blackBishopORqueenlocation();

  let { isWhiteincheck, isBlackincheck } = iskinginCheck();
  if (isWhiteincheck) {
    let whiteAttackorBlock = whitecheckBlocker();
    let {
      up_leftPathUnavailable: uplef,
      up_centerPathUnavailable: upcen,
      up_rightPathUnavailable: uprig,
      leftPathUnavailable: left,
      rightPathUnavailable: right,
      down_leftPathUnavailable: dowlef,
      down_centerPathUnavailable: dowcen,
      down_rightPathUnavailable: dowrig,
    } = iswhitepathinthread();
    let legalmove = [uplef, upcen, uprig, left, right, dowlef, dowcen, dowrig];
    let whitehasmove = legalmove.includes(false);
    if (whitehasmove || whiteAttackorBlock) {
      check.play();
    }
  }
  if (isBlackincheck) {
    let blackAttackerblock = blackcheckBlocker();
    let {
      up_leftPathUnavailable: uplef,
      up_centerPathUnavailable: upcen,
      up_rightPathUnavailable: uprig,
      leftPathUnavailable: left,
      rightPathUnavailable: right,
      down_leftPathUnavailable: dowlef,
      down_centerPathUnavailable: dowcen,
      down_rightPathUnavailable: dowrig,
    } = isblackpathinthread();
    let legalmove = [uplef, upcen, uprig, left, right, dowlef, dowcen, dowrig];
    let blackhasmove = legalmove.includes(false);
    if (blackhasmove || blackAttackerblock) {
      check.play();
    }
  }
  capturedpieceshown();
  stalemate();
  if(gamefinish == true){
    socket.emit('gameover',gamecode);
  }
  handler();

}


