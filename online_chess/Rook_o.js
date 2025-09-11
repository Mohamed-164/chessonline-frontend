
import { clearHighlights } from "./mainChess_o.js";
import { isPiecePinned } from "./pinnedPieces_o.js";
import { iskinginCheck } from "./checkDetection_o.js";
import { upAttackfnc,
         downAttackfnc,
         leftAttackfnc,
         rightAttackfnc
        } from "./DiognalAndStraightAttack_o.js";

export function RookMovement(board,clickedPiece,locationOfPiece){
  clearHighlights();
let {isWhiteincheck,isBlackincheck} = iskinginCheck();

  let {RookorQueenUpAttack,
    RookorQueenDownAttack,
    RookorQueenLeftAttack,
    RookorQueenRightAttack,
    isKingInThread} = isPiecePinned(board,clickedPiece,locationOfPiece);

  let isKingunderThread = isKingInThread;
/* *********************************This is Delcaration is setup for AttackCell************************************* */
  let clickedPieceColor = clickedPiece === "R"? "white" : "black";


let iskingischecked = false;
if (clickedPieceColor === "white" && isWhiteincheck){
  iskingischecked = true;
}else if(clickedPieceColor === "black" && isBlackincheck){
  iskingischecked = true
}
if(!isKingunderThread && !iskingischecked){
  upAttackfnc(board,locationOfPiece,clickedPieceColor,clickedPiece);
  downAttackfnc(board,locationOfPiece,clickedPieceColor,clickedPiece);
  leftAttackfnc(board,locationOfPiece,clickedPieceColor,clickedPiece);
  rightAttackfnc(board,locationOfPiece,clickedPieceColor,clickedPiece);
}/* < this bracket belongs to isKingInThread condition > */
if(isKingunderThread && RookorQueenUpAttack && !iskingischecked){
  upAttackfnc(board,locationOfPiece,clickedPieceColor,clickedPiece);
  downAttackfnc(board,locationOfPiece,clickedPieceColor,clickedPiece);
}else if(isKingunderThread && RookorQueenLeftAttack && !iskingischecked){
  leftAttackfnc(board,locationOfPiece,clickedPieceColor,clickedPiece);
  rightAttackfnc(board,locationOfPiece,clickedPieceColor,clickedPiece);
}else if(isKingunderThread && RookorQueenDownAttack && !iskingischecked){
  upAttackfnc(board,locationOfPiece,clickedPieceColor,clickedPiece);
  downAttackfnc(board,locationOfPiece,clickedPieceColor,clickedPiece);
}else if(isKingunderThread && RookorQueenRightAttack && !iskingischecked){
  leftAttackfnc(board,locationOfPiece,clickedPieceColor,clickedPiece);
  rightAttackfnc(board,locationOfPiece,clickedPieceColor,clickedPiece);
}
}