import { gameState,
         gamemove,
         renderboard,
         clearHighlights,
         WhiteCapturedPiece,
         BlackCapturedPiece
        } from "./mainChess_o.js";
import { color,gamecode,socket } from "./onlineChess.js";
import { castling, move , capture} from "./preloadsound_o.js";
import { iswhitepathinthread } from "./whitePathDetection_o.js";
import { isblackpathinthread } from "./blackPathDetection_o.js";
import { iskinginCheck } from "./checkDetection_o.js";
import { WhiteleftRooKMoved,
         WhiteRightRooKMoved,
         BlackleftRooKMoved,
         BlackRightRooKMoved
        } from "./DiognalAndStraightAttack_o.js";

export function kingMovement(board,clickedPiece,locationOfPiece){
   clearHighlights();
   let {isWhiteincheck,isBlackincheck} = iskinginCheck();
   let WhiteCast_cancel = false;
   let BlackCast_Cancel = false;

   for(let i = 0; i < gameState.length; i++){
    let [piece,currentrow,currentcol,pastrow,pastcol] = gameState[i];
    if(piece == 'K'){
      WhiteCast_cancel = true;
    }
    if(piece == 'k'){
      BlackCast_Cancel = true;
    }
   }

   let {row,col} = locationOfPiece;
   let up_leftrow = row - 1;
   let up_leftcol = col - 1;
   let up_centerrow = row - 1;
   let up_centercol = col;
   let up_rightrow = row - 1;
   let up_rightcol = col + 1;
   let leftrow = row;
   let leftcol = col - 1; 
   let rightrow = row;
   let rightcol = col + 1;
   let down_leftrow = row + 1;
   let down_leftcol = col - 1;
   let down_centerrow = row + 1;
   let down_centercol = col;
   let down_rightrow = row + 1;
   let down_rightcol = col + 1;

   let clickedPieceColor = clickedPiece == "K"? "white" : "black";

function isSamePiece(Row, Col, clickedPieceColor){
    let piece = board[Row][Col];
    if (piece === '') return false; // early return if cell is empty
  
    let pieceColor = piece === piece.toUpperCase() ? "white" : "black";
    return clickedPieceColor === pieceColor;
}
function userAttackHighlight(board,AttackCell,selectedrow,selectedcol,highlight){
    AttackCell.classList.add(`${highlight}`);
      AttackCell.onclick = () =>{
      if(clickedPiece == 'K' && board[selectedrow][selectedcol] !== ''){
        capture.play();
        let capturedpiece = board[selectedrow][selectedcol];
        WhiteCapturedPiece.push(capturedpiece);
        let captureobj = {code : gamecode,mycolor : color,color : 'white',captured : capturedpiece};
        socket.emit('capture',captureobj);
      }else if(clickedPiece == 'k' && board[selectedrow][selectedcol] !== ''){
        capture.play();
        let capturedpiece = board[selectedrow][selectedcol];
        BlackCapturedPiece.push(capturedpiece);
        let captureobj = {code : gamecode,mycolor : color,color : 'black',captured : capturedpiece};
        socket.emit('capture',captureobj);
      }
      if(board[selectedrow][selectedcol] == ''){
        move.play();
      }
      gameState.push([clickedPiece,selectedrow,selectedcol,row,col]);
      let moveData = new gamemove(color,gamecode,row,col,selectedrow,selectedcol);
      socket.emit("move", moveData);
      board[selectedrow][selectedcol] = clickedPiece;
      board[row][col] = '';
    
      renderboard(board);
    }
}
function makeAttack(board,selectedrow,selectedcol){
  if (selectedrow < 0 || selectedrow > 7 || selectedcol < 0 || selectedcol > 7) return;
    let SamePiece = isSamePiece(selectedrow,selectedcol,clickedPieceColor);
    let Attack_Cell = 
    document.querySelector(`.cell[data-row="${selectedrow}"][data-col="${selectedcol}"]`);
    if(board[selectedrow][selectedcol] == ''){
      userAttackHighlight(board,Attack_Cell,selectedrow,selectedcol,'highlighted');
    }else if(board[selectedrow][selectedcol] !== '' && !SamePiece){
      userAttackHighlight(board,Attack_Cell,selectedrow,selectedcol,'AttackHighlight');
    }
}
let paththread;
if(clickedPiece == 'K'){
  paththread = iswhitepathinthread();
}else if(clickedPiece == 'k'){
  paththread = isblackpathinthread();
}
const {
  up_leftPathUnavailable,
  up_centerPathUnavailable,
  up_rightPathUnavailable,
  leftPathUnavailable,
  rightPathUnavailable,
  down_leftPathUnavailable,
  down_centerPathUnavailable,
  down_rightPathUnavailable,
  leftcastinThread, 
  rightcastinThread
} = paththread;

let castlingobj = {code : gamecode,mycolor : color}

if(clickedPiece == 'K' && row == 7 && col == 4 && !isWhiteincheck){
   let leftpathClear = board[7][3] == '' && board[7][2] == '' && board[7][1] == ''&& board[7][0] == 'R'? true : false;
   let rightpathClear = board[7][5] == '' && board[7][6] == '' && board[7][7] == 'R'? true : false;

   if(!leftPathUnavailable && !WhiteleftRooKMoved && 
    !WhiteCast_cancel && leftpathClear && !leftcastinThread){
     let castleftcol = col - 2;
     let castleft =
     document.querySelector(`.cell[data-row="${leftrow}"][data-col="${castleftcol}"]`);
     castleft.classList.add('highlighted');
     castleft.onclick = () =>{
       let movedata = new gamemove(color,gamecode,row,0,leftrow,leftcol);
       socket.emit("move", movedata);
      gameState.push([clickedPiece,leftrow,castleftcol,row,col]);
      let moveData = new gamemove(color,gamecode,row,col,leftrow,castleftcol);
      socket.emit("move", moveData);
      socket.emit('castling',castlingobj);
      castling.play();
      board[leftrow][castleftcol] = clickedPiece;
      board[leftrow][leftcol] = board[row][0];
      board[row][0] = '';
      board[row][col] = '';
      renderboard(board);
     }
   }
   if(!rightPathUnavailable && !WhiteRightRooKMoved && 
    !WhiteCast_cancel && rightpathClear && !rightcastinThread){
    let castrightcol = col + 2;
    let castright = 
    document.querySelector(`.cell[data-row="${rightrow}"][data-col="${castrightcol}"]`);
    castright.classList.add('highlighted');
    castright.onclick = () =>{
      let movedata = new gamemove(color,gamecode,row,7,rightrow,rightcol);
      socket.emit("move", movedata);
      gameState.push([clickedPiece,rightrow,castrightcol,row,col]);
      let moveData = new gamemove(color,gamecode,row,col,rightrow,castrightcol);
      socket.emit("move", moveData);
      socket.emit('castling',castlingobj);
      castling.play();
      board[rightrow][castrightcol] = clickedPiece;
      board[rightrow][rightcol] = board[row][7];
      board[row][7] = '';
      board[row][col] = '';
      renderboard(board);
    }
   }
}
if(clickedPiece == 'k' && row == 0 && col == 4 && !isBlackincheck){
   let leftpathClear = board[0][3] == '' && board[0][2] == '' && board[0][1] == '' && board[0][0] == 'r'? true : false;
   let rightpathClear = board[0][5] == '' && board[0][6] == '' && board[0][7] == 'r'? true : false;

   if(!leftPathUnavailable && !BlackleftRooKMoved && 
    !BlackCast_Cancel && leftpathClear && !leftcastinThread){
     let castleftcol = col - 2;
     let castleft =
     document.querySelector(`.cell[data-row="${leftrow}"][data-col="${castleftcol}"]`);
     castleft.classList.add('highlighted');
     castleft.onclick = () =>{
      let movedata = new gamemove(color,gamecode,row,0,leftrow,leftcol);
      socket.emit("move", movedata);
      gameState.push([clickedPiece,leftrow,castleftcol,row,col]);
      let moveData = new gamemove(color,gamecode,row,col,leftrow,castleftcol);
      socket.emit("move", moveData);
      socket.emit('castling',castlingobj);
      castling.play();
      board[leftrow][castleftcol] = clickedPiece;
      board[leftrow][leftcol] = board[row][0];
      board[row][0] = '';
      board[row][col] = '';
      renderboard(board);
     }
   }
   if(!rightPathUnavailable && !BlackRightRooKMoved && 
    !BlackCast_Cancel && rightpathClear && !rightcastinThread){
    let castrightcol = col + 2;
    let castright = 
    document.querySelector(`.cell[data-row="${rightrow}"][data-col="${castrightcol}"]`);
    castright.classList.add('highlighted');
    castright.onclick = () =>{
      let movedata = new gamemove(color,gamecode,row,7,rightrow,rightcol);
      socket.emit("move", movedata);
      gameState.push([clickedPiece,rightrow,castrightcol,row,col]);
      let moveData = new gamemove(color,gamecode,row,col,rightrow,castrightcol);
      socket.emit("move", moveData);
      socket.emit('castling',castlingobj);
      castling.play();
      board[rightrow][castrightcol] = clickedPiece;
      board[rightrow][rightcol] = board[row][7];
      board[row][7] = '';
      board[row][col] = '';
      renderboard(board);
    }
   }
}

  if(row != 0){
    if(up_leftrow>=0 && up_leftcol<8 && !up_leftPathUnavailable){
      makeAttack(board,up_leftrow,up_leftcol);
    }
  
   if(up_centerrow>=0 && up_centercol<8 && !up_centerPathUnavailable){    
    makeAttack(board,up_centerrow,up_centercol);
   }
   if(up_rightrow>=0 && up_rightcol<8 && !up_rightPathUnavailable){
     makeAttack(board,up_rightrow,up_rightcol);
   }
  }
  if(col != 0 && leftrow>=0 && leftcol<8 && !leftPathUnavailable){
      makeAttack(board,leftrow,leftcol);
  }
  if(col != 7 && rightrow>=0 && rightcol<8 && !rightPathUnavailable){
      makeAttack(board,rightrow,rightcol);
  }
  if(row != 7){
    if(down_leftrow>=0 && down_leftcol<8 && !down_leftPathUnavailable){
      makeAttack(board,down_leftrow,down_leftcol);
    }
    if(down_centerrow>=0 && down_centercol<8 && !down_centerPathUnavailable){
      makeAttack(board,down_centerrow,down_centercol);
    }
    if(down_rightrow>=0 && down_rightcol<8 && !down_rightPathUnavailable){
      makeAttack(board,down_rightrow,down_rightcol);
    }
  }
  
}
