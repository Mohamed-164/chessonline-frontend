import { gameState,
         gamemove,
         renderboard,
         WhiteCapturedPiece,
         clearHighlights,
         BlackCapturedPiece
        } from "./mainChess_o.js";
import { color, gamecode, socket } from "./onlineChess.js";
import { move,capture } from "./preloadsound_o.js";
import { isPiecePinned } from "./pinnedPieces_o.js";
import { iskinginCheck } from "./checkDetection_o.js";
export function knightMovement(board,clickedPiece,locationOfPiece){

 clearHighlights();

let {isWhiteincheck,isBlackincheck} = iskinginCheck();

const {isKingInThread} = isPiecePinned(board,clickedPiece,locationOfPiece);
let isKingunderThread = isKingInThread;

/* *********************************This is Delcaration is setup for AttackCell************************************* */
    let {row,col} = locationOfPiece;
    let clickedPieceColor = clickedPiece === "N"? "white" : "black"; 
    let up_LeftAttack = '';
    let up_RightAttack = '';
    let down_LeftAttack = '';
    let down_RightAttack = '';
    let right_UpAttack = '';
    let right_DownAttack = '';
    let left_UpAttack = '';
    let left_DownAttack = '';
/* ***************************This is Delcaration is rows and cols for AttackCell*********************************** */
  let up_LeftAttackRow = row - 2;
  let up_LeftAttackCol = col - 1;
  let up_RightAttackRow = row - 2;
  let up_RightAttackCol = col + 1;
  let down_LeftAttackRow = row + 2;
  let down_LeftAttackCol = col - 1;
  let down_RightAttackRow = row + 2;
  let down_RightAttackCol = col + 1;
  let right_UpAttackRow = row - 1;
  let right_UpAttackCol = col + 2;
  let right_DownAttackRow = row + 1;
  let right_DownAttackCol = col + 2;
  let left_UpAttackRow = row - 1;
  let left_UpAttackCol = col - 2;
  let left_DownAttackRow = row + 1;
  let left_DownAttackCol = col - 2;

/* *******************************This is function for check samePieces in Attack cell************************************ */
let iskingischecked = false;
if (clickedPieceColor === "white" && isWhiteincheck){
  iskingischecked = true;
}else if(clickedPieceColor === "black" && isBlackincheck){
  iskingischecked = true
}
if(!isKingunderThread && !iskingischecked){
  function isSamePiece(Row, Col, clickedPieceColor) {
    let piece = board[Row][Col];
    if (piece === '') return false; // early return if cell is empty
  
    let pieceColor = piece === piece.toUpperCase() ? "white" : "black";
    return clickedPieceColor === pieceColor;
  }
  function userAttackHighlight(board,AttackCell,selectedrow,selectedcol,highlight){
    AttackCell.classList.add(`${highlight}`);
      AttackCell.onclick = () =>{
        if(clickedPiece == 'N' && board[selectedrow][selectedcol] !== ''){
          capture.play();
          let capturedpiece = board[selectedrow][selectedcol];
          WhiteCapturedPiece.push(capturedpiece);
          let captureobj = {code : gamecode,mycolor : color,color : 'white',captured : capturedpiece};
          socket.emit('capture',captureobj);
        }else if(clickedPiece == 'n' && board[selectedrow][selectedcol] !== ''){
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
  /* *******************************This is for up_LeftAttackCell**************************************************** */
        if((up_LeftAttackRow >= 0 && up_LeftAttackRow < 8) && (up_LeftAttackCol >= 0 && up_LeftAttackCol < 8)){
         
          let samePiece = isSamePiece(up_LeftAttackRow,up_LeftAttackCol,clickedPieceColor);
    
          up_LeftAttack = document.querySelector(`.cell[data-row="${up_LeftAttackRow}"][data-col="${up_LeftAttackCol}"]`);
          if(board[up_LeftAttackRow][up_LeftAttackCol] === ''){
            userAttackHighlight(board,up_LeftAttack,up_LeftAttackRow,up_LeftAttackCol,"highlighted");
          }else if(board[up_LeftAttackRow][up_LeftAttackCol] !== '' && !samePiece){
            userAttackHighlight(board,up_LeftAttack,up_LeftAttackRow,up_LeftAttackCol,'AttackHighlight');
          }
        }
    /* *******************************This is for up_RightAttackCell**************************************************** */
        if((up_RightAttackRow >= 0 && up_RightAttackRow < 8) && (up_RightAttackCol >= 0 && up_RightAttackCol < 8)){
        
          let samePiece = isSamePiece(up_RightAttackRow,up_RightAttackCol,clickedPieceColor);
          up_RightAttack = document.querySelector(`.cell[data-row="${up_RightAttackRow}"][data-col="${up_RightAttackCol}"]`);
          if(board[up_RightAttackRow][up_RightAttackCol] === ''){
            userAttackHighlight(board,up_RightAttack,up_RightAttackRow,up_RightAttackCol,'highlighted');
          }else if(board[up_RightAttackRow][up_RightAttackCol] !== '' && !samePiece){
            userAttackHighlight(board,up_RightAttack,up_RightAttackRow,up_RightAttackCol,'AttackHighlight');
          }
        }
    /* *******************************This is for Down_LeftAttackCell**************************************************** */
        if((down_LeftAttackRow >= 0 && down_LeftAttackRow < 8) && (down_LeftAttackCol >= 0 && down_LeftAttackCol < 8)){
    
          let samePiece = isSamePiece(down_LeftAttackRow,down_LeftAttackCol,clickedPieceColor);
          down_LeftAttack = document.querySelector(`.cell[data-row="${down_LeftAttackRow}"][data-col="${down_LeftAttackCol}"]`);
          if(board[down_LeftAttackRow][down_LeftAttackCol] === ''){
            userAttackHighlight(board,down_LeftAttack,down_LeftAttackRow,down_LeftAttackCol,'highlighted');
          }else if(board[down_LeftAttackRow][down_LeftAttackCol] !== '' && !samePiece){
            userAttackHighlight(board,down_LeftAttack,down_LeftAttackRow,down_LeftAttackCol,'AttackHighlight');
          }
        }
    /* *******************************This is for Down_RightAttackCell**************************************************** */
        if((down_RightAttackRow >= 0 && down_RightAttackRow < 8) && (down_RightAttackCol >= 0 && down_RightAttackCol < 8)){
    
          let samePiece = isSamePiece(down_RightAttackRow,down_RightAttackCol,clickedPieceColor);
          down_RightAttack = document.querySelector(`.cell[data-row="${down_RightAttackRow}"][data-col="${down_RightAttackCol}"]`);
          if(board[down_RightAttackRow][down_RightAttackCol] === ''){
            userAttackHighlight(board,down_RightAttack,down_RightAttackRow,down_RightAttackCol,'highlighted');
          }else if(board[down_RightAttackRow][down_RightAttackCol] !== '' && !samePiece){
            userAttackHighlight(board,down_RightAttack,down_RightAttackRow,down_RightAttackCol,'AttackHighlight');
        }
      }
    /* *******************************This is for right_UpAttackCell**************************************************** */
        if((right_UpAttackRow >= 0 && right_UpAttackRow < 8) && (right_UpAttackCol >= 0 && right_UpAttackCol < 8)){
    
          let samePiece = isSamePiece(right_UpAttackRow,right_UpAttackCol,clickedPieceColor);
          right_UpAttack = document.querySelector(`.cell[data-row="${right_UpAttackRow}"][data-col="${right_UpAttackCol}"]`);
          if(board[right_UpAttackRow][right_UpAttackCol] === ''){
            userAttackHighlight(board,right_UpAttack,right_UpAttackRow,right_UpAttackCol,'highlighted');
          }else if(board[right_UpAttackRow][right_UpAttackCol] !== '' && !samePiece){
            userAttackHighlight(board,right_UpAttack,right_UpAttackRow,right_UpAttackCol,'AttackHighlight');
          }
        }
    /* *******************************This is for right_DownAttackCell**************************************************** */
        if((right_DownAttackRow >= 0 && right_DownAttackRow < 8) && (right_DownAttackCol >= 0 && right_DownAttackCol < 8)){
    
          let samePiece = isSamePiece(right_DownAttackRow,right_DownAttackCol,clickedPieceColor);
          right_DownAttack = document.querySelector(`.cell[data-row="${right_DownAttackRow}"][data-col="${right_DownAttackCol}"]`);
          if(board[right_DownAttackRow][right_DownAttackCol] === ''){
            userAttackHighlight(board,right_DownAttack,right_DownAttackRow,right_DownAttackCol,'highlighted');
          }else if(board[right_DownAttackRow][right_DownAttackCol] !== '' && !samePiece){
            userAttackHighlight(board,right_DownAttack,right_DownAttackRow,right_DownAttackCol,'AttackHighlight');
          }
        }
    /* *******************************This is for left_UPAttackCell**************************************************** */
        if((left_UpAttackRow >= 0 && left_UpAttackRow < 8) && (left_UpAttackCol >= 0 && left_UpAttackCol < 8)){
          
          let samePiece = isSamePiece(left_UpAttackRow,left_UpAttackCol,clickedPieceColor);
          left_UpAttack = document.querySelector(`.cell[data-row="${left_UpAttackRow}"][data-col="${left_UpAttackCol}"]`);
          if(board[left_UpAttackRow][left_UpAttackCol] === ''){
            userAttackHighlight(board,left_UpAttack,left_UpAttackRow,left_UpAttackCol,'highlighted');
          }else if(board[left_UpAttackRow][left_UpAttackCol] !== '' && !samePiece){
            userAttackHighlight(board,left_UpAttack,left_UpAttackRow,left_UpAttackCol,'AttackHighlight');
          }
        }
    /* *******************************This is for left_DownAttackCell**************************************************** */
        if((left_DownAttackRow >= 0 && left_DownAttackRow < 8) && (left_DownAttackCol >= 0 && left_DownAttackCol < 8)){
    
          let samePiece = isSamePiece(left_DownAttackRow,left_DownAttackCol,clickedPieceColor);
          left_DownAttack = document.querySelector(`.cell[data-row="${left_DownAttackRow}"][data-col="${left_DownAttackCol}"]`);
          if(board[left_DownAttackRow][left_DownAttackCol] === ''){
            userAttackHighlight(board,left_DownAttack,left_DownAttackRow,left_DownAttackCol,'highlighted');
          }else if(board[left_DownAttackRow][left_DownAttackCol] !== '' && !samePiece){
            userAttackHighlight(board,left_DownAttack,left_DownAttackRow,left_DownAttackCol,'AttackHighlight');
          }
      }
}

}


