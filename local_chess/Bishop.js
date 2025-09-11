
import { clearHighlights } from "./mainChess.js";
import { isPiecePinned } from "./pinnedPieces.js";
import { up_LeftAttackfnc } from "./DiognalAndStraightAttack.js";
import { up_RightAttackfnc } from "./DiognalAndStraightAttack.js";
import { down_LeftAttackfnc } from "./DiognalAndStraightAttack.js";
import { down_RightAttackfnc } from "./DiognalAndStraightAttack.js";
import { iskinginCheck } from "./checkDetection.js";

export function BishopMovement(board,clickedPiece,locationOfPiece){

 clearHighlights();

let {isWhiteincheck,isBlackincheck} = iskinginCheck();

const {isKingInThread,
      BishoporQueenUpLeftAttack,
      BishoporQueenDownLeftAttack,
      BishoporQueenUpRightAttack,
      BishoporQueenDownRightAttack} = isPiecePinned(board,clickedPiece,locationOfPiece);
let isKingunderThread = isKingInThread;

/* ********************************* This is Delcaration is setup for AttackCell ************************************* */
  let clickedPieceColor = clickedPiece == "B" ? "white" : "black";


let iskingischecked = false;
if (clickedPieceColor === "white" && isWhiteincheck){
  iskingischecked = true;
}else if(clickedPieceColor === "black" && isBlackincheck){
  iskingischecked = true
}
if(!isKingunderThread && !iskingischecked){
  up_LeftAttackfnc(board,locationOfPiece,clickedPieceColor,clickedPiece);
  up_RightAttackfnc(board,locationOfPiece,clickedPieceColor,clickedPiece);
  down_LeftAttackfnc(board,locationOfPiece,clickedPieceColor,clickedPiece);
  down_RightAttackfnc(board,locationOfPiece,clickedPieceColor,clickedPiece);
}

if(isKingunderThread && BishoporQueenUpLeftAttack && !iskingischecked){
  up_LeftAttackfnc(board,locationOfPiece,clickedPieceColor,clickedPiece);
  down_RightAttackfnc(board,locationOfPiece,clickedPieceColor,clickedPiece);
}else if(isKingunderThread && BishoporQueenDownRightAttack && !iskingischecked){
  down_RightAttackfnc(board,locationOfPiece,clickedPieceColor,clickedPiece);
  up_LeftAttackfnc(board,locationOfPiece,clickedPieceColor,clickedPiece);
}else if(isKingunderThread && BishoporQueenUpRightAttack && !iskingischecked){
  up_RightAttackfnc(board,locationOfPiece,clickedPieceColor,clickedPiece);
  down_LeftAttackfnc(board,locationOfPiece,clickedPieceColor,clickedPiece);
}else if(isKingunderThread && BishoporQueenDownLeftAttack && !iskingischecked){
  down_LeftAttackfnc(board,locationOfPiece,clickedPieceColor,clickedPiece);
  up_RightAttackfnc(board,locationOfPiece,clickedPieceColor,clickedPiece);
}
}