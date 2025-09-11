
import { clearHighlights } from "./mainChess.js";
import { upAttackfnc } from "./DiognalAndStraightAttack.js";
import { downAttackfnc } from "./DiognalAndStraightAttack.js";
import { leftAttackfnc } from "./DiognalAndStraightAttack.js";
import { rightAttackfnc } from "./DiognalAndStraightAttack.js";
import { up_LeftAttackfnc } from "./DiognalAndStraightAttack.js";
import { up_RightAttackfnc } from "./DiognalAndStraightAttack.js";
import { down_LeftAttackfnc } from "./DiognalAndStraightAttack.js";
import { down_RightAttackfnc } from "./DiognalAndStraightAttack.js";
import { isPiecePinned } from "./pinnedPieces.js";
import { iskinginCheck } from "./checkDetection.js";
export function QueenMovement(board,clickedPiece,locationOfPiece){

 clearHighlights();

let {isWhiteincheck,isBlackincheck} = iskinginCheck();

const {RookorQueenUpAttack,
    RookorQueenDownAttack,
    RookorQueenLeftAttack,
    RookorQueenRightAttack,
    BishoporQueenUpLeftAttack,
    BishoporQueenDownLeftAttack,
    BishoporQueenUpRightAttack,
    BishoporQueenDownRightAttack,
  isKingInThread} = isPiecePinned(board,clickedPiece,locationOfPiece);
 let isKingunderThread = isKingInThread;
/* *********************************This is Delcaration is setup for AttackCell************************************* */
let clickedPieceColor = clickedPiece == "Q" ? "white" : "black";

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
  up_LeftAttackfnc(board,locationOfPiece,clickedPieceColor,clickedPiece);
  up_RightAttackfnc(board,locationOfPiece,clickedPieceColor,clickedPiece);
  down_LeftAttackfnc(board,locationOfPiece,clickedPieceColor,clickedPiece);
  down_RightAttackfnc(board,locationOfPiece,clickedPieceColor,clickedPiece);
}
if(isKingunderThread && RookorQueenUpAttack&& !iskingischecked){
  upAttackfnc(board,locationOfPiece,clickedPieceColor,clickedPiece);
  downAttackfnc(board,locationOfPiece,clickedPieceColor,clickedPiece);
}else if(isKingunderThread && RookorQueenLeftAttack&& !iskingischecked){
  leftAttackfnc(board,locationOfPiece,clickedPieceColor,clickedPiece);
  rightAttackfnc(board,locationOfPiece,clickedPieceColor,clickedPiece);
}else if(isKingunderThread && RookorQueenDownAttack && !iskingischecked){
  upAttackfnc(board,locationOfPiece,clickedPieceColor,clickedPiece);
  downAttackfnc(board,locationOfPiece,clickedPieceColor,clickedPiece);
}else if(isKingunderThread && RookorQueenRightAttack && !iskingischecked){
  leftAttackfnc(board,locationOfPiece,clickedPieceColor,clickedPiece);
  rightAttackfnc(board,locationOfPiece,clickedPieceColor,clickedPiece);
}else if(isKingunderThread && BishoporQueenUpLeftAttack && !iskingischecked){
  up_LeftAttackfnc(board,locationOfPiece,clickedPieceColor,clickedPiece);
  down_RightAttackfnc(board,locationOfPiece,clickedPieceColor,clickedPiece);
}else if(isKingunderThread && BishoporQueenDownRightAttack&& !iskingischecked){
  down_RightAttackfnc(board,locationOfPiece,clickedPieceColor,clickedPiece);
  up_LeftAttackfnc(board,locationOfPiece,clickedPieceColor,clickedPiece);
}else if(isKingunderThread && BishoporQueenUpRightAttack && !iskingischecked){
  up_RightAttackfnc(board,locationOfPiece,clickedPieceColor,clickedPiece);
  down_LeftAttackfnc(board,locationOfPiece,clickedPieceColor,clickedPiece);
}else if(isKingunderThread && BishoporQueenDownLeftAttack&& !iskingischecked){
  down_LeftAttackfnc(board,locationOfPiece,clickedPieceColor,clickedPiece);
  up_RightAttackfnc(board,locationOfPiece,clickedPieceColor,clickedPiece);
}
}