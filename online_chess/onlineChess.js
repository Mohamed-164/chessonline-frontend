import { board } from "./boarddata_o.js";
import { renderboard,Timer } from "./mainChess_o.js";
import { resultframe } from "./StalemateDetection_o.js";
import { gameover, preloadAllSounds } from "./preloadsound_o.js";
import { capture,move,castling } from "./preloadsound_o.js";
import { gameState,BlackCapturedPiece,WhiteCapturedPiece } from "./mainChess_o.js";

export const socket = io("https://chessonline-backend.onrender.com");

export let duration = null;
export let color = null;
export let gamecode = null; 


const entry = document.getElementById('entry');
const mode_Select = document.getElementById('mode-select');
const waiting = document.getElementById('waiting');
const gameboard = document.getElementById('board');
const code = document.querySelector('.code-mod');
const ExistsGame = document.getElementById('code');
const header = document.querySelector('.head');

function gameCode(){
  let userCode =  String(ExistsGame.value);
 
  socket.emit('AvailableGame',userCode);
}

function requestCode(){
    entry.style.display = "none";
    mode_Select.style.display = "flex";
}

function modeSelect(event){

   mode_Select.style.display = "none";
   waiting.style.display = "block";

   const selectedMode = event.value;
   socket.emit('createCode',selectedMode);
}

socket.on('code',(code_Mod) => {
  code.textContent = code_Mod;
  header.textContent = "player"
});

window.gameCode = gameCode;
window.requestCode = requestCode;
window.modeSelect = modeSelect;

socket.on('boardSetup',(setupdata) => {
  preloadAllSounds();
  if(!isNaN(setupdata.mode)){
    duration = 1000*60*setupdata.mode;
  }
  
  color = setupdata.color;
  gamecode = setupdata.code;
  renderboard(board);
  entry.style.display = "none";
  waiting.style.display = "none";
  gameboard.style.display = "block";
});

socket.on('pausetimer',() =>{
  let {
    whitepauseTimer,
    blackpauseTimer,
    whiteresumeTimer,
    blackresumeTimer
  } = Timer;
  if(color == "white"){
    whitepauseTimer();
    blackresumeTimer();
  }else if(color == "black"){
    blackpauseTimer();
    whiteresumeTimer();
  }
});

socket.on('resumeTimer',() => {
  let {
    whitepauseTimer,
    whiteresumeTimer,
    blackresumeTimer,
    blackpauseTimer,
  } = Timer;
  if(color == "white"){
    blackpauseTimer();
    whiteresumeTimer();
  }else if(color == "black"){
    if(gameState.length > 2){
      blackresumeTimer();
    }
    whitepauseTimer();
  }

});

socket.on('move',(moveData) => {

  let fromRow = moveData.fromrow;
  let fromCol = moveData.fromcol;

  let toRow = moveData.torow;
  let toCol = moveData.tocol;

  let from = board[fromRow][fromCol];
  let to = board[toRow][toCol];

  gameState.push([from,toRow,toCol,fromRow,fromCol]);
   if(to == ''){
    move.play();
   }

  console.log(moveData.whitetime);

    board[toRow][toCol] = board[fromRow][fromCol];
    board[fromRow][fromCol] = '';

    renderboard(board);

});

socket.on('captured',(captureobj) => {
  let makecapture = captureobj.color;
  if(color == "white" && makecapture == "black"){
    BlackCapturedPiece.push(captureobj.captured);
    capture.play();
  }else if(color == "black" && makecapture == "white"){
    WhiteCapturedPiece.push(captureobj.captured);
    capture.play();
  }
});

socket.on('castled',() => {
  castling.play();
});

socket.on('resigned',() =>{
  gameover.play();
  let image = "../pieces_Img/resignicon.png";
  let resigntext = color == "white"? "White Won" : "Black Won";
  resultframe("rgb(11, 220, 98)",resigntext,"by Resignation",image);
});


socket.on('opponentLeft',() => {
  gameover.play();
  let image = "../pieces_Img/abandentent.png";
  let Abortedtext = color == "white"? "White Won" : "Black Won";
  resultframe("rgb(11, 220, 98)",Abortedtext,"by Abandentent",image);
});

socket.on('connect_timeout',() =>{
    window.location.href = '/';
});

socket.on('gameNotExists',() =>{
    window.location.href = '/invalid.html';
});

