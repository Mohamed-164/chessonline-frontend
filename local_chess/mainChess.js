import { check,preloadAllSounds } from "./preloadsound.js";
import { timer} from "./timer.js";
import { board } from "./boarddata.js";
import { pawnMovement } from "./pawnMovement.js";
import { knightMovement } from "./Knight.js";
import { RookMovement } from "./Rook.js";
import { BishopMovement } from "./Bishop.js";
import { QueenMovement } from "./queen.js";
import { kingMovement } from "./king.js";
import { whitecheckBlocker } from "./whiteCheckBlocker.js";
import { 
    whitepawnlocation,
    blackKinglocation,
    whiteKnightloaction,
    whiterookORqueenlocation,
    whiteBishopORqueenlocation,
    isblackpathinthread
} from "./blackPathDetection.js";
import { 
    blackpawnlocation,
    whiteKinglocation,
    blackKnightloaction,
    blackrookORqueenlocation,
    blackBishopORqueenlocation,
    iswhitepathinthread
} from "./whitePathDetection.js";
import { iskinginCheck } from "./checkDetection.js";
import { blackcheckBlocker } from "./blackCheckBlocker.js";
import { stalemate } from "./StalemateDetection.js";

export let WhiteCapturedPiece = [];
export let BlackCapturedPiece = [];
export let gameState = [];
export let duration;
let gamefinish = false;

const beforegame = document.querySelector('.beforegame');
const startgame = document.querySelector('.game-layout');
let Timer = null;
let notime = false;

function userselect(event){
  beforegame.style.display = "none";
  startgame.style.display = "grid";

  preloadAllSounds();
  const whitetimer = document.querySelector('.white-time');
  const blacktimer = document.querySelector('.black-time');
  const click = event.target.closest('button');
    
  if(click.classList.contains('notime')){
    notime = true;
  }else if(click.classList.contains('3min')){
    whitetimer.textContent = "3 : 00";
    blacktimer.textContent = "3 : 00";
    duration = 1000 * 60 * 3;
  }else if(click.classList.contains('5min')){
    whitetimer.textContent = "5 : 00";
    blacktimer.textContent = "5 : 00";
    duration = 1000 * 60 * 5;
  }else if(click.classList.contains('10min')){
    whitetimer.textContent = "10 : 00";
    blacktimer.textContent = "10 : 00";
    duration = 1000 * 60 * 10;
  }else if(click.classList.contains('15min')){
    whitetimer.textContent = "15 : 00";
    blacktimer.textContent = "15 : 00";
    duration = 1000 * 60 * 15;
  }
  const gamestart = new Audio('../sounds/Chess.wav');
  gamestart.play();
   renderboard(board);
}

function resetgame(){
  window.location.reload();
}

window.userselect = userselect;
window.resetgame = resetgame;


export function gameOver(){
  gamefinish = true;
  let {
       whitepauseTimer,
       blackpauseTimer
      } = Timer;
  const whiteresign = document.querySelector('.whiteresign');
  const Blackresign = document.querySelector('.blackresign');
  Blackresign.disabled = true;
  whiteresign.disabled = true;
    for(let i = 0; i < 8; i++){
      for(let j = 0; j < 8; j++){
        let cell = document.querySelector(`.cell[data-row="${i}"][data-col="${j}"]`);
        cell.onclick = null;
      }
    }
   whitepauseTimer();
   blackpauseTimer();
}

function blackrotateTurn(){
    const chessboard = document.getElementById('chessboard');
    const blacktimer = document.querySelector('.blacktimer');
    const whitetimer = document.querySelector('.whitetimer');
    const cellimg = document.querySelectorAll('.cell img');

    if(window.innerWidth > 700){
      chessboard.style.transform = "rotate(180deg)";
      blacktimer.style.gridRow = '3';
      whitetimer.style.gridRow = '1';
    }
    cellimg.forEach((e)=>{
      e.style.transform = "rotate(180deg)"
    });
}


function capturedpieceshown() {
    const whiteCapture = document.querySelector('.Whitecapture');
    const blackCapture = document.querySelector('.blackcapture');
    whiteCapture.innerHTML = '';
    blackCapture.innerHTML = '';

    for (let i = 0; i < WhiteCapturedPiece.length; i++) {
        const capturecell = document.createElement('div');
        let [piece] = WhiteCapturedPiece[i];
        capturecell.classList.add('capturecell');
        const img = document.createElement('img');
        img.src = pieceImagePath(piece);
        img.alt = piece;
        capturecell.appendChild(img);
        whiteCapture.appendChild(capturecell);
    }

    for (let i = 0; i < BlackCapturedPiece.length; i++) {
        const capturecell = document.createElement('div');
        let [piece] = BlackCapturedPiece[i];
        capturecell.classList.add('capturecell');
        const img = document.createElement('img');
        img.src = pieceImagePath(piece);
        img.alt = piece;
        capturecell.appendChild(img);
        blackCapture.appendChild(capturecell);
    }
}

function pieceImagePath(piece) {
    const map = {
        'P': '/pieces_Img/whitePawn.png',
        'p': '/pieces_Img/blackPawn.png',
        'R': '/pieces_Img/whiteRook.png',
        'r': '/pieces_Img/blackRook.png',
        'N': '/pieces_Img/whiteKnight.png',
        'n': '/pieces_Img/blackKnight.png',
        'B': '/pieces_Img/whiteBishop.png',
        'b': '/pieces_Img/blackBishop.png',
        'Q': '/pieces_Img/whiteQueen.png',
        'q': '/pieces_Img/blackQueen.png',
        'K': '/pieces_Img/whiteKing.png',
        'k': '/pieces_Img/blackKing.png',
    };
    return map[piece] || null;
}

function blackClickDiable(){
    for(let i = 0; i < 8 ; i++){
        for(let j = 0; j < 8; j++){
            let blackpiece = board[i][j];
            let black = blackpiece && blackpiece === blackpiece.toLowerCase()? true : false;
            if(black){
             let blackplace = document.querySelector(`.cell[data-row="${i}"][data-col="${j}"]`);
             if(blackplace !== null){
                 blackplace.onclick = null;
             }
            }
        }
    }
}

function whiteClickDisable(){
    for(let i = 0; i < 8 ; i++){
        for(let j = 0; j < 8; j++){
            let whitepiece = board[i][j];
            let white = whitepiece && whitepiece === whitepiece.toUpperCase()? true : false;
            if(white){
             let whiteplace = document.querySelector(`.cell[data-row="${i}"][data-col="${j}"]`);
             if(whiteplace !== null){
                 whiteplace.onclick = null;
             }
            }
        }
    }
}
function initializetimer(){
  Timer = timer(); 
}

function handler(){
  if(Timer == null){
    initializetimer();
  }
    let {whitestartTimer,
       blackstartTimer,
       whitepauseTimer,
       whiteresumeTimer,
       blackresumeTimer,
       blackpauseTimer} = Timer;
    const chessboard = document.getElementById('chessboard');
    const blackTimer = document.querySelector('.blacktimer');
    const whiteTimer = document.querySelector('.whitetimer');
    const blackCapture = document.querySelector('.blackcapture');
      if(window.innerWidth > 700){
        blackTimer.style.gridRow = '1';
        whiteTimer.style.gridRow = '3';
      }
      blackCapture.style.transform = "rotate(180deg)";
      chessboard.style.transform = "rotate(0deg)";
 if(gameState.length < 1){
    blackClickDiable();
    if(!notime){
      whitestartTimer();
    }
  }
  if(gameState.length == 1){
    if(!notime){
      blackstartTimer();
    }
  }
 if(gameState.length > 0){
   let [piece,currentrow,currentcol,pastrow,pastcol] = gameState.at(-1);
   let piececolor = piece === piece.toUpperCase()? true : false;
   let pastcell = document.querySelector(`.cell[data-row="${pastrow}"][data-col="${pastcol}"]`);
   let currentcell = document.querySelector(`.cell[data-row="${currentrow}"][data-col="${currentcol}"]`);
   pastcell.classList.add('pasthighlight');
   currentcell.classList.add('currenthighlight');
   if(piececolor){
      if(!notime){
        blackresumeTimer();
        whitepauseTimer();
      }
        blackrotateTurn();
        whiteClickDisable();
    }else{
    blackClickDiable();
    if(!notime){
      whiteresumeTimer();
      blackpauseTimer();
    }
   }
 }
}

export function clearHighlights() {
  const highlighted = document.
  querySelectorAll(".cell.highlighted, .cell.AttackHighlight");
  highlighted.forEach(cell => {
    cell.classList.remove("highlighted", "AttackHighlight");
    cell.onclick = null;
    renderboard(board);
});
}

let previouspiece = {Row:null,Col:null};
let previousclick = null;

export function renderboard(board){

    const chessboard = document.getElementById('chessboard');
    chessboard.innerHTML = '';
    for(let row = 0;row<8;row++){
        for(let col = 0; col <8; col++){
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = row;
            cell.dataset.col = col;
            const piece = board[row][col];
            const pieceImgPath = pieceImagePath(piece);
            if (pieceImgPath) {
            const img = document.createElement('img');
            img.src = pieceImgPath;
            img.alt = piece;
            cell.appendChild(img);
           }
            if(piece == piece.toUpperCase()){
                cell.style.color = "rgba(211, 236, 255, 1)";
                cell.style.textShadow = 
                "0 0 1px black, 0 0 2px black, 0 0 3px black, 0 0 4px black, 0 0 5px black";
            }
            if((row+col) % 2 === 0){
                cell.style.backgroundColor = "#ffffffff";
            }else{
                cell.style.backgroundColor = "#6e96bfff";
            }
            cell.onclick=() => {
                clearHighlights();
               let clickedPiece = board[row][col];
               let clickedcell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
               if(previousclick !== null){
                previousclick.classList.remove('clickhighlight');
               }
               if(board[row][col] !== ''){
                   clickedcell.classList.add('clickhighlight');
                   previousclick = clickedcell
               }
               let locationOfPiece = {row,col};
               if(previouspiece.Row !== null && previouspiece.Col !== null){
                if(previouspiece.Row == row && previouspiece.Col == col){
                    clearHighlights();
                    previousclick.classList.remove('clickhighlight');
                    previouspiece.Row = null;
                    previouspiece.Col = null;
                    return;
                }
               }
               previouspiece.Row = row;
               previouspiece.Col = col;
               if(clickedPiece === ''){
                   clearHighlights();
                   return;
                }else if(clickedPiece == "P" || clickedPiece == "p"){
                    pawnMovement(board,clickedPiece,locationOfPiece);
                }else if(clickedPiece == "N" || clickedPiece == "n"){
                    knightMovement(board,clickedPiece,locationOfPiece);
                }else if(clickedPiece == "R" || clickedPiece == "r"){
                    RookMovement(board,clickedPiece,locationOfPiece);
                }else if(clickedPiece == "B" || clickedPiece == "b"){
                    BishopMovement(board,clickedPiece,locationOfPiece);
                }else if(clickedPiece == "Q" || clickedPiece == "q"){
                    QueenMovement(board,clickedPiece,locationOfPiece);
                }else if(clickedPiece == "K" || clickedPiece == "k"){
                    kingMovement(board,clickedPiece,locationOfPiece);
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
    
    let {isWhiteincheck,
    isBlackincheck} = iskinginCheck();
    if(isWhiteincheck){
        let whiteAttackorBlock = whitecheckBlocker();
        let {up_leftPathUnavailable : uplef,
             up_centerPathUnavailable : upcen,
             up_rightPathUnavailable : uprig,
             leftPathUnavailable : left,
             rightPathUnavailable : right,
             down_leftPathUnavailable : dowlef,
             down_centerPathUnavailable : dowcen,
             down_rightPathUnavailable : dowrig
            } = iswhitepathinthread();
        let legalmove = [uplef,upcen,uprig,left,right,dowlef,dowcen,dowrig]
        let whitehasmove = legalmove.includes(false);
        if(whitehasmove || whiteAttackorBlock){
          check.play();
        }
    }
    if(isBlackincheck){
      let blackAttackerblock = blackcheckBlocker();
      let {up_leftPathUnavailable : uplef,
             up_centerPathUnavailable : upcen,
             up_rightPathUnavailable : uprig,
             leftPathUnavailable : left,
             rightPathUnavailable : right,
             down_leftPathUnavailable : dowlef,
             down_centerPathUnavailable : dowcen,
             down_rightPathUnavailable : dowrig
      } = isblackpathinthread();
      let legalmove = [uplef,upcen,uprig,left,right,dowlef,dowcen,dowrig];
      let blackhasmove = legalmove.includes(false);
      if(blackhasmove || blackAttackerblock){
        check.play();
      }
    }
    capturedpieceshown();
    stalemate();
    if(!gamefinish){
      handler();
    }
}
