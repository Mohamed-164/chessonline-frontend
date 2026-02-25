import { gameState,
         gamemove,
         renderboard,
         clearHighlights,
         WhiteCapturedPiece,
         BlackCapturedPiece,
        } from "./mainChess_o.js";
import { gamecode,color, socket } from "./onlineChess.js";
import { move,capture } from "./preloadsound_o.js";
import { isPiecePinned} from "./pinnedPieces_o.js";
import { iskinginCheck } from "./checkDetection_o.js";

export function pawnMovement(board,clickedPiece,locationOfPiece){

clearHighlights();
let EnpassantCheck;
if(gameState.length>1){
  EnpassantCheck = gameState.length - 1;
}
let {isWhiteincheck,isBlackincheck} = iskinginCheck();

const {
  pawnUpMove_Unavailable,
  pawnDownMove_Unavailable,
  pawnleftmoveAvailable,
  pawnrightmoveAvailable,
  isKingInThread } = isPiecePinned(board,clickedPiece,locationOfPiece);
let isKingunderThread = isKingInThread;

/*______________________________________Delcaration section______________________________________________________ */

   const {row,col} = locationOfPiece;
   let  destinationCell = '';
   let enpassantCell = '';
   let LeftAttackCell = '';
   let RightAttackCell = '';
   let clickedPieceColor = clickedPiece === "P" ? "white" : "black";
   let targetRow = clickedPieceColor === "white" ? row - 1 : row + 1;
   let enpassentrow = clickedPieceColor === "white" ? row - 2 : row + 2;
   let leftTarget = null;

function enpassentAttack(AttackCell,enpassentrow,enpassentcol,nowrow,nowcol){
  AttackCell.classList.add('AttackHighlight');
  AttackCell.onclick = () =>{
    if(clickedPiece == 'P'){
      let capturedpiece = board[enpassentrow][enpassentcol];
      WhiteCapturedPiece.push(capturedpiece);
      let captureobj = {code : gamecode,mycolor : color,color : 'white',captured : capturedpiece};
      socket.emit('capture',captureobj);
    }else if(clickedPiece == 'p'){
      let capturedpiece = board[enpassentrow][enpassentcol];
      BlackCapturedPiece.push(capturedpiece);
      let captureobj = {code : gamecode,mycolor : color,color : 'black',captured : capturedpiece};
      socket.emit('capture',captureobj);
    }
    gameState.push([clickedPiece,enpassentrow,enpassentcol,row,col]);
    let moveData = new gamemove(color,gamecode,row,col,enpassentrow,enpassentcol);
    socket.emit("enpassentAttack", moveData);
    board[enpassentrow][enpassentcol] = clickedPiece;
    board[row][col] = '';
    board[nowrow][nowcol] = '';
    capture.play();
    renderboard(board,false);
  }
}
if(clickedPieceColor === "white" && row == 3 && EnpassantCheck){
  let leftenpassentrow = row - 1;
  let leftenpassentcol = col - 1;
  let rightenpassentrow = row - 1;
  let rightenpassentcol = col + 1;
  let [piece,currentrow,currentcol,pastrow,pastcol] = gameState[EnpassantCheck];
  if(piece == 'p' && pastrow == row - 2 && 
    pastcol == col - 1 && currentrow == row && 
    currentcol == col - 1
  ){
    let En_passentleftCell = 
    document.querySelector(`.cell[data-row="${leftenpassentrow}"][data-col="${leftenpassentcol}"]`);
    if(board[row - 1][col - 1] == ''){
      enpassentAttack(En_passentleftCell,leftenpassentrow,leftenpassentcol,currentrow,currentcol);
    }
  }else if(piece == 'p' && pastrow == row - 2 && 
           pastcol == col + 1 && currentrow == row && 
           currentcol == col + 1
    ){
      let En_passentRightCell = 
      document.querySelector(`.cell[data-row="${rightenpassentrow}"][data-col="${rightenpassentcol}"]`);
      if(board[row - 1][col + 1] == ''){
       enpassentAttack(En_passentRightCell,rightenpassentrow,rightenpassentcol,currentrow,currentcol);
      } 
    }
}else if(clickedPieceColor === "black" && row == 4 && EnpassantCheck){
  let leftenpassentrow = row + 1;
  let leftenpassentcol = col - 1;
  let rightenpassentrow = row + 1;
  let rightenpassentcol = col + 1;
  let [piece,currentrow,currentcol,pastrow,pastcol] = gameState[EnpassantCheck];
  if(piece == 'P' && pastrow == row + 2 && 
    pastcol == col - 1 && currentrow == row && 
    currentcol == col - 1
  ){
    let En_passentleftCell = 
    document.querySelector(`.cell[data-row="${leftenpassentrow}"][data-col="${leftenpassentcol}"]`);
    if(board[row + 1][col - 1] == ''){
      enpassentAttack(En_passentleftCell,leftenpassentrow,leftenpassentcol,currentrow,currentcol);
    }
  }else if(piece == 'P' && pastrow == row + 2 && 
           pastcol == col + 1 && currentrow == row && 
           currentcol == col + 1
    ){
      let En_passentRightCell = 
      document.querySelector(`.cell[data-row="${rightenpassentrow}"][data-col="${rightenpassentcol}"]`);
      if(board[row + 1][col + 1] == ''){
       enpassentAttack(En_passentRightCell,rightenpassentrow,rightenpassentcol,currentrow,currentcol);
      } 
    }
}   


let iskingischecked = false;
if (clickedPieceColor === "white" && isWhiteincheck){
  iskingischecked = true;
}else if(clickedPieceColor === "black" && isBlackincheck){
  iskingischecked = true
}
   /* *******Set range for row column to avoid conflict like row negative and column out of bound********** */

   if (clickedPieceColor === "white" && row > 0 && col > 0) {
     leftTarget = board[row - 1][col - 1];
   } else if (clickedPieceColor === "black" && row < 7 && col > 0) {
     leftTarget = board[row + 1][col - 1];
   }
   
   let RightTarget = null;
   
   if (clickedPieceColor === "white" && row > 0 && col < 7) {
    RightTarget = board[row - 1][col + 1];
   } else if (clickedPieceColor === "black" && row < 7 && col < 7) {
    RightTarget = board[row + 1][col + 1];
   }

function userAttackHighlight (board,AttackCell,selectedrow,selectedcol){
      AttackCell.classList.add('AttackHighlight');  
       AttackCell.onclick = () => {
         if(clickedPieceColor === "white"){
           let capturedpiece = board[selectedrow][selectedcol];
           WhiteCapturedPiece.push(capturedpiece);
           let captureobj = {code : gamecode,mycolor : color,color : 'white',captured : capturedpiece};
           socket.emit('capture',captureobj);
          }else{
            let capturedpiece = board[selectedrow][selectedcol];
            BlackCapturedPiece.push(capturedpiece);
            let captureobj = {code : gamecode,mycolor : color,color : 'black',captured : capturedpiece};
            socket.emit('capture',captureobj);
          }
         gameState.push([clickedPiece,selectedrow,selectedcol,row,col]);
         let moveData = new gamemove(color,gamecode,row,col,selectedrow,selectedcol);
         socket.emit("move", moveData);
         board[selectedrow][selectedcol] = clickedPiece;
         board[row][col] = '';
         capture.play();
         if ((clickedPiece === 'P' && targetRow === 0) || (clickedPiece === 'p' && targetRow === 7)) {
           showPromotionMenu({ row: selectedrow, col: selectedcol }, clickedPiece);
          }
          renderboard(board,false);
      }
}

function isSamePiece(Row, Col, clickedPieceColor) {
  let piece = board[Row][Col];
  if (piece === '') return false; // early return if cell is empty

  let pieceColor = piece === piece.toUpperCase() ? "white" : "black";
  return clickedPieceColor === pieceColor;
}
/* **********************Decalaration of Attack piceces rows and columns************************** */
let leftAttackRow = clickedPieceColor === "white"? row -1 : row + 1;
let leftAttackCol = clickedPieceColor === "white"? col -1 : col - 1;
let RightAttackRow = clickedPieceColor === "white"? row -1 : row + 1;
let RightAttackCol = clickedPieceColor === "white"? col +1 : col + 1;


if(isKingunderThread && !iskingischecked){
   if(leftTarget !=='' && board[leftAttackRow][leftAttackCol] !== undefined && pawnleftmoveAvailable){
    LeftAttackCell = 
    document.querySelector(`.cell[data-row="${leftAttackRow}"][data-col="${leftAttackCol}"]`);
    let isSameLeftPiece = isSamePiece(leftAttackRow,leftAttackCol,clickedPieceColor);
    if(!isSameLeftPiece){
      userAttackHighlight(board,LeftAttackCell,leftAttackRow,leftAttackCol);
    }
   }
   if(RightTarget !=='' && board[RightAttackRow][RightAttackCol] !== undefined && pawnrightmoveAvailable){
     let isSameRightPiece = isSamePiece(RightAttackRow,RightAttackCol,clickedPieceColor);
    RightAttackCell = 
    document.querySelector(`.cell[data-row="${RightAttackRow}"][data-col="${RightAttackCol}"]`);
    if(!isSameRightPiece){
      userAttackHighlight(board,RightAttackCell,RightAttackRow,RightAttackCol);
    }
   }
}

if(!isKingunderThread && !iskingischecked){

/* *********************Checks for pawns cross attack and make attack if pieces available************ */
   if(leftTarget !=='' && board[leftAttackRow][leftAttackCol] !== undefined){
    LeftAttackCell = 
    document.querySelector(`.cell[data-row="${leftAttackRow}"][data-col="${leftAttackCol}"]`);
    let isSameLeftPiece = isSamePiece(leftAttackRow,leftAttackCol,clickedPieceColor);
    if(!isSameLeftPiece){
      userAttackHighlight(board,LeftAttackCell,leftAttackRow,leftAttackCol);
    }
   }
   if(RightTarget !=='' && board[RightAttackRow][RightAttackCol] !== undefined){
     let isSameRightPiece = isSamePiece(RightAttackRow,RightAttackCol,clickedPieceColor);
    RightAttackCell = 
    document.querySelector(`.cell[data-row="${RightAttackRow}"][data-col="${RightAttackCol}"]`);
    if(!isSameRightPiece){
      userAttackHighlight(board,RightAttackCell,RightAttackRow,RightAttackCol);
    }
   }
}/* < This bracket belongs to isKingInThread if condition > */

/* *******************************Promotion pieces declaration*********************************** */

const promotionpieceTable = document.querySelector(".promotion");
const promotionpiece = document.querySelectorAll(".promotionpiece");
const pieces = document.querySelectorAll(".pieces");
const queenPromotion = document.querySelector(".queen");
const knightPromotion = document.querySelector(".knight");
const bishopPromotion = document.querySelector(".bishop");
const rookPromotion = document.querySelector(".Rook");

/* ******************Condition checks for available places for pieces up for white and black for down***************** */
let EnpassantForwardWhite = row - 2;
let EnpassantForwardblack = row + 2;
if(clickedPieceColor === "white"){
 let MoveForwardWhite = row - 1;
 destinationCell = document.querySelector(`.cell[data-row="${MoveForwardWhite}"][data-col="${col}"]`);
 if(destinationCell && board[MoveForwardWhite][col] == '' && !pawnUpMove_Unavailable && !pawnDownMove_Unavailable&& !iskingischecked){
  destinationCell.classList.add('highlighted');
  if(row == 6 && board[EnpassantForwardWhite][col] == ''){
    enpassantCell = 
    document.querySelector(`.cell[data-row="${EnpassantForwardWhite}"][data-col="${col}"]`);
    enpassantCell.classList.add('highlighted');
  }
}  
}else{
 let MoveForwardBlack = row + 1;
 destinationCell = document.querySelector(`.cell[data-row="${MoveForwardBlack}"][data-col="${col}"]`);
 if(destinationCell && board[MoveForwardBlack][col] == '' && !pawnUpMove_Unavailable && !pawnDownMove_Unavailable&& !iskingischecked){
  destinationCell.classList.add('highlighted');
  if(row == 1 && board[EnpassantForwardblack][col] == ''){
    enpassantCell = 
    document.querySelector(`.cell[data-row="${EnpassantForwardblack}"][data-col="${col}"]`);
    enpassantCell.classList.add('highlighted');
  }
 } 
}
  if(destinationCell && !pawnUpMove_Unavailable && !pawnDownMove_Unavailable && !iskingischecked){
    if(enpassantCell){
      enpassantCell.onclick = () =>{
        if(enpassantCell && board[enpassentrow][col] == ''){
          gameState.push([clickedPiece,enpassentrow,col,row,col]);
          let moveData = new gamemove(color,gamecode,row,col,enpassentrow,col);
          socket.emit("move", moveData); 
          board[enpassentrow][col] = clickedPiece;
          board[row][col] = '';
          move.play();
        }
        renderboard(board,false);
      }
    }
/* *************condition checks a piece color and make decision for pawn upforward or downforward move************  */
    destinationCell.onclick= () => {
      let pawninpromo;
      if ((clickedPiece === 'P' && targetRow === 0) || (clickedPiece === 'p' && targetRow === 7)) {
        pawninpromo = showPromotionMenu({ row: targetRow, col: col }, clickedPiece);
       }
       // Update the board array
      if(destinationCell && board[targetRow][col] == ''){
        if(pawninpromo == undefined){
          gameState.push([clickedPiece,targetRow,col,row,col]);   
          let moveData = new gamemove(color,gamecode,row,col,targetRow,col);
          socket.emit("move", moveData);    
        }
        board[targetRow][col] = clickedPiece;
        board[row][col] = '';
        move.play();
       }
      // Rerender the board
        renderboard(board,false);
    }

  }
/* *****************Function that get the promotion position and promotion piece******************* */

function showPromotionMenu(promotionPosition, promotedPiece) {
  promotionpieceTable.style.display = "flex";
  let pieceColor = promotedPiece === promotedPiece.toUpperCase()? true : false;
  if(pieceColor){
    pieces.forEach((icon)=>{
      icon.style.color = "white";
    });
    promotionpiece.forEach((el)=>{
      el.style.color = "white";
    });
  }else{
    pieces.forEach((icon)=>{
      icon.style.color = "black";
    });
    promotionpiece.forEach((el)=>{
      el.style.color = "black";
    });
  }
  const promote = (newPiece) => {
    board[promotionPosition.row][promotionPosition.col] = newPiece;
    gameState.push([newPiece,promotionPosition.row,promotionPosition.col,row,col]);
    let moveData = new gamemove(color,gamecode,row,col,promotionPosition.row,promotionPosition.col);
    socket.emit("move", moveData);
    promotionpieceTable.style.display = "none";
    renderboard(board,false);
  };

/* **************onclick function that gets its value from user selection and pass it to showPromotionMenu function************* */

  queenPromotion.onclick = () => promote(promotedPiece === 'P' ? 'Q' : 'q');
  knightPromotion.onclick = () => promote(promotedPiece === 'P' ? 'N' : 'n');
  bishopPromotion.onclick = () => promote(promotedPiece === 'P' ? 'B' : 'b');
  rookPromotion.onclick = () => promote(promotedPiece === 'P' ? 'R' : 'r');
  return true;
}


}

