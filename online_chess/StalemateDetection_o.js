import { color,socket,gamecode } from "./onlineChess.js";
import { board } from "./boarddata_o.js";
import { gameover,stalemateaudio,Checkmate } from "./preloadsound_o.js";
import { gameOver,
         gameState,
         WhiteCapturedPiece,
         BlackCapturedPiece
        } from "./mainChess_o.js";
import { iskinginCheck } from "./checkDetection_o.js";
import { whitecheckBlocker } from "./whiteCheckBlocker_o.js";
import { blackcheckBlocker } from "./blackCheckBlocker_o.js";
import { isPiecePinned } from "./pinnedPieces_o.js";
import {
  isblackpathinthread,
  whitepawnlocation,
  whiteKnightloaction,
  whiterookORqueenlocation,
  whiteBishopORqueenlocation,
} from "./blackPathDetection_o.js";
import {
  iswhitepathinthread,
  blackpawnlocation,
  blackKnightloaction,
  blackrookORqueenlocation,
  blackBishopORqueenlocation,
} from "./whitePathDetection_o.js";

let noCapture = 0;
let previousWhiteCapture = 0;
let previousBlackCapture = 0;
let previouslengthGamestate = 0;

export const result_from = document.getElementById('result-frame');
export const resultcolor = document.querySelector('.show-result');
export const result = document.querySelector('.result');
export const reason = document.querySelector('.reason');
const cancel = document.querySelector('.cancel-btn');
const playagain = document.querySelector('.playagain');
export const resultImage = document.getElementById('image');
const confirm = document.querySelector('.confirm');

cancel.onclick = () =>{
  result_from.style.display = "none";
  playagain.style.display = "block";
}

  export function resultframe(color,results,reasons,image){
    result_from.style.display = "flex";
    resultcolor.style.backgroundColor = color;
    result.textContent = results;
    reason.textContent = reasons;
    resultImage.src = image;
    gameOver();
  }


  function resign(){
    confirm.style.display = "flex";
  }

  function confirmResign(){
    confirm.style.display = "none";
    gameover.play();
    let resignobj = {
      code : gamecode,
      mycolor : color
    }
    let image = "../pieces_Img/resignicon.png";
    let resigntext = color == "white"? "Black Won" : "White Won";
    socket.emit('resign',resignobj);
    resultframe("#a0a0a0",resigntext,"by Resignation",image);
  }
  
  function resignDenied(){
    confirm.style.display = "none";
  }
  
  window.confirmResign = confirmResign;
  window.resignDenied = resignDenied;
  window.resign = resign;

export function stalemate() {
  let whiteturn = false;
  let blackturn = false;
  if(gameState.length > 0){

    let [piece] = gameState.at(-1);
    if (piece === piece.toUpperCase()) {blackturn = true} else{whiteturn = true} 

    let currentlength = gameState.length;
    let currentWhiteCapture = WhiteCapturedPiece.length;
    let currentBlackCapture = BlackCapturedPiece.length;
    if(
      (currentWhiteCapture !== previousWhiteCapture || currentBlackCapture !== previousBlackCapture)
    ){
        previousWhiteCapture = currentWhiteCapture;
        previousBlackCapture = currentBlackCapture;
        noCapture = 0;
    }else if(currentlength !== previouslengthGamestate){
      previouslengthGamestate = currentlength;
      noCapture++;
    }
  }
  let {isWhiteincheck,isBlackincheck} = iskinginCheck();
  let {
    white_up,
    white_left,
    white_right,
    white_pawnlocation,
  } = whitepawnlocation();
  let {
    black_down,
    black_left,
    black_right,
    black_pawnlocation,
  } = blackpawnlocation();

  function pawnAttack(arr){
    if(arr.length > 0){
      for(let i = 0; i < arr.length; i++){
        let [r,c,ar,ac] = arr[i];
        let piecetype = board[r][c];
        let attackplace = board[ar][ac];
        if(attackplace){
          let piece = piecetype === piecetype.toUpperCase()? true : false;
          let attacktype = attackplace === attackplace.toUpperCase()?true:false;
          if(piece && !attacktype){
            return true;
          }else if(!piece && attacktype){
            return true;
          }else{
            return false;
          }
        }

      }
    }
  }
  let whitepawn_left = pawnAttack(white_left);
  let whitepawn_right = pawnAttack(white_right);
  let blackpawn_left = pawnAttack(black_left);
  let blackpawn_right = pawnAttack(black_right);

  let { white_Knightloaction } = whiteKnightloaction();
  let { white_rooklocation, white_queenlocation } = whiterookORqueenlocation();
  let { white_bishoplocation } = whiteBishopORqueenlocation();

  let { black_Knightloaction } = blackKnightloaction();
  let { black_rooklocation, black_queenlocation } = blackrookORqueenlocation();
  let { black_bishoplocation } = blackBishopORqueenlocation();

  let whitepawninactivity = false;
  if(white_pawnlocation.length > 0 && white_up.length == 0){
    whitepawninactivity = true;
  }
  let blackpawninactivity = false;
  if(black_pawnlocation.length > 0 && black_down.length == 0){
    blackpawninactivity = true;
  }

  let pinnedpiece = {
    white_pawn: [],
    white_knight: [],
    white_rook: [],
    white_bishop: [],
    white_queen: [],
    black_pawn: [],
    black_knight: [],
    black_rook: [],
    black_bishop: [],
    black_queen: [],
  };

function checkpiecePinned(location,piecetype){
  if(location.length > 0){
    for(let i = 0; i < location.length; i++){
      let [Prow,Pcol] = location[i];
      let scablepiece = board[Prow][Pcol] == 'Q' || board[Prow][Pcol] == 'q'? true : false;
      if(!scablepiece){
        let locationOfPiece = { row: Prow, col: Pcol };
        let clickedpiece = board[Prow][Pcol];
        const{isKingInThread,
               RookorQueenUpAttack,
               RookorQueenDownAttack,
               RookorQueenLeftAttack,
               RookorQueenRightAttack,
               BishoporQueenUpLeftAttack,
               BishoporQueenDownLeftAttack,
               BishoporQueenUpRightAttack,
               BishoporQueenDownRightAttack
              } = isPiecePinned(board,clickedpiece,locationOfPiece);
        let pinned = isKingInThread;
        let bishopcanMove = BishoporQueenUpLeftAttack||BishoporQueenDownLeftAttack||
               BishoporQueenUpRightAttack||BishoporQueenDownRightAttack;
        let rookCanMove = RookorQueenUpAttack||RookorQueenDownAttack||
               RookorQueenLeftAttack||RookorQueenRightAttack;
        let whitepinAttack = false;
        let blackpinAttack = false;
        if((clickedpiece == 'B' || clickedpiece == 'b') && bishopcanMove){
          whitepinAttack = true;
        }else if((clickedpiece == 'R' || clickedpiece == 'r') && rookCanMove){
          blackpinAttack = true;
        }
        if((whitepinAttack || blackpinAttack) && pinned){
          let piece = false;
          pinnedpiece[piecetype].push(piece);
        }
        if(pinned && (!whitepinAttack || !blackpinAttack)){
          let piece = true;
          pinnedpiece[piecetype].push(piece);
        }else{
          let piece = false;
          pinnedpiece[piecetype].push(piece);
        }
      }else{
          let piece = false;
          pinnedpiece[piecetype].push(piece); 
      }
    }
  }else{
        let piece = true;
        pinnedpiece[piecetype].push(piece);
  }
}

checkpiecePinned(white_pawnlocation,"white_pawn");
checkpiecePinned(white_Knightloaction,"white_knight");
checkpiecePinned(white_rooklocation,"white_rook");
checkpiecePinned(white_bishoplocation,"white_bishop");
checkpiecePinned(white_queenlocation,"white_queen");
checkpiecePinned(black_pawnlocation,"black_pawn");
checkpiecePinned(black_Knightloaction,"black_knight");
checkpiecePinned(black_rooklocation,"black_rook");
checkpiecePinned(black_bishoplocation,"black_bishop");
checkpiecePinned(black_queenlocation,"black_queen");

  const {
    up_leftPathUnavailable: white_upleft,
    up_centerPathUnavailable: white_upcenter,
    up_rightPathUnavailable: white_upright,
    leftPathUnavailable: white_Left,
    rightPathUnavailable: white_Right,
    down_leftPathUnavailable: white_downleft,
    down_centerPathUnavailable: white_downcenter,
    down_rightPathUnavailable: white_downright,
  } = iswhitepathinthread();

  const {
    up_leftPathUnavailable: black_upleft,
    up_centerPathUnavailable: black_upcenter,
    up_rightPathUnavailable: black_upright,
    leftPathUnavailable: black_Left,
    rightPathUnavailable: black_Right,
    down_leftPathUnavailable: black_downleft,
    down_centerPathUnavailable: black_downcenter,
    down_rightPathUnavailable: black_downright,
  } = isblackpathinthread();

  let whitekingMoves = [white_upleft,white_upcenter,white_upright,white_Left,white_Right,
    white_downleft,white_downcenter,white_downright];

 let blackKingMoves = [black_upleft,black_upcenter,black_upright,black_Left,
    black_Right,black_downleft,black_downcenter,black_downright];

  let isWhitelegalMove = whitekingMoves.includes(false);
  let whitePawn = pinnedpiece.white_pawn.includes(false); /* There is no false return false  */
  let whiteknight = pinnedpiece.white_knight.includes(false);
  let whiteknightlen = white_Knightloaction.length;
  let whiterook = pinnedpiece.white_rook.includes(false);
  let whitebishop = pinnedpiece.white_bishop.includes(false);
  let whitebishoplen = white_bishoplocation.length;
  let whitequeen = pinnedpiece.white_queen.includes(false);


  let isBlacklegalMove = blackKingMoves.includes(false);
  let blackpawn = pinnedpiece.black_pawn.includes(false);
  let blackknight = pinnedpiece.black_knight.includes(false);
  let blackknightlen = black_Knightloaction.length;
  let blackrook = pinnedpiece.black_rook.includes(false);
  let blackbishop = pinnedpiece.black_bishop.includes(false);
  let blackbishoplen = black_bishoplocation.length;
  let blackqueen = pinnedpiece.black_queen.includes(false);


let noWhitePiece = !whitePawn && !whiteknight && !whiterook && !whitebishop && !whitequeen;
let noBlackPiece = !blackpawn && !blackknight && !blackrook && !blackbishop && !blackqueen;

  function noPieceExceptKing(){
    return(noWhitePiece) &&
         (noBlackPiece);
  }

  function loneKingvsKing_Knight(){
    return (
          (!whitePawn && whiteknightlen == 1 && !whiterook &&
          !whitebishop && !whitequeen)
          && (noBlackPiece) 
          ) ||
          (
            (!blackpawn && blackknightlen == 1 && !blackrook &&
            !blackbishop && !blackqueen
            ) && 
            (noWhitePiece)
          )
  }

  function loneKingvsKing_bishop(){
    return (
          (!whitePawn && !whiteknight && !whiterook &&
           whitebishoplen == 1 && !whitequeen)
          && (noBlackPiece) 
          ) ||
          (
            (!blackpawn && !blackknight && !blackrook &&
             blackbishoplen == 1 && !blackqueen
            ) && 
            (noWhitePiece)
          )
  }
  function king_knightvsKing_knight(){
    return(!whitePawn && whiteknightlen == 1 && !whiterook &&
           !whitebishop && !whitequeen
          )
            &&
           (!blackpawn && blackknightlen == 1 && !blackrook &&
            !blackbishop && !blackqueen
          )
  }
  function king_bishopvsKing_bishop(){
    return(!whitePawn && !whiteknight && !whiterook &&
            whitebishoplen == 1 && !whitequeen
          )
            &&
           (!blackpawn && !blackknight && !blackrook &&
             blackbishoplen == 1 && !blackqueen
          )
  }
  function noLegalMoveforKing(){
    return (!isWhiteincheck && !isWhitelegalMove && noWhitePiece && whiteturn) ||
    (!isBlackincheck && !isBlacklegalMove && noBlackPiece && blackturn);
  }

  function pawninactivity(){
    return ((whiteturn && !isWhiteincheck && !isWhitelegalMove && !whiteknight && !whiterook &&
            !whitebishop && !whitequeen && whitepawninactivity && !whitepawn_left && !whitepawn_right)
          ) ||
          ((blackturn && !isBlackincheck && !isBlacklegalMove && !blackknight && !blackrook &&
            !blackbishop && !blackqueen && blackpawninactivity && !blackpawn_left && !blackpawn_right)
          )
  }
  function repetitativeMove(){
    if(gameState.length > 6){
    let white_1 = gameState.length - 6;
    let black_1 = gameState.length - 5;
    let white_2 = gameState.length - 4;
    let black_2 = gameState.length - 3;
    let white_3 = gameState.length - 2;
    let black_3 = gameState.length - 1;
    /* format [ piece , current row , current col , past row , past col] */
    let [wp1,wcr1,wcc1,wpr1,wpc1] = gameState[white_1];
    let [bp1,bcr1,bcc1,bpr1,bpc1] = gameState[black_1];
    let [wp2,wcr2,wcc2,wpr2,wpc2] = gameState[white_2];
    let [bp2,bcr2,bcc2,bpr2,bpc2] = gameState[black_2];
    let [wp3,wcr3,wcc3,wpr3,wpc3] = gameState[white_3];
    let [bp3,bcr3,bcc3,bpr3,bpc3] = gameState[black_3];
    if(((wp1 == wp2 && wcr1 == wpr2 && wcc1 == wpc2) && 
        (wp2 == wp3 && wcr2 == wpr3 && wcc2 == wpc3) &&
        (wp1 == wp3 && wcr1 == wcr3 && wcc1 == wcc3) &&
        !isWhiteincheck
      ) &&
      ((bp1 == bp2 && bcr1 == bpr2 && bcc1 == bpc2) && 
        (bp2 == bp3 && bcr2 == bpr3 && bcc2 == bpc3) &&
        (bp1 == bp3 && bcr1 == bcr3 && bcc1 == bcc3) &&
        !isBlackincheck
      )
    ){
      return true;
    }
    }
    return false;
  }
  function noPieceTaken(){
    return noCapture == 50;
  }
  function insufficientMaterial(){
    stalemateaudio.play();
    let image = "../pieces_Img/insuffdraw.png";
    resultframe("#a0a0a0","Draw","by insufficient material",image);
  }
  function stale(){
    stalemateaudio.play();
    let image = "../pieces_Img/drawimage.png";
    resultframe("#a0a0a0","Draw","by Stalemate",image);
  }
  
  if(noPieceExceptKing()){
    insufficientMaterial();
  }
  if(loneKingvsKing_Knight()){
    insufficientMaterial();
  }
  if(loneKingvsKing_bishop()){
    insufficientMaterial();
  }
  if(king_knightvsKing_knight()){
    insufficientMaterial();
  }
  if(king_bishopvsKing_bishop()){
    insufficientMaterial();
  }
  if(noLegalMoveforKing()){
    stale();
  }
  if(pawninactivity()){
    stale();
  }
  if(noPieceTaken()){
    gameover.play()
    let image = "../pieces_Img/50move.png";
    resultframe("#a0a0a0","Draw","by 50 Rules Move",image);
  }
  if(repetitativeMove()){
    gameover.play();
    let image = "../pieces_Img/repetative.png";
    resultframe("#a0a0a0","Draw","by repetitative move",image);
  }
  
  let whiteAttackorBlock = whitecheckBlocker();
  function whiteCheckmate(){
    return isWhiteincheck && !isWhitelegalMove && !whiteAttackorBlock;
  }

  let blackAttackerblock = blackcheckBlocker();
  function blackCheckmate(){
    return isBlackincheck && !isBlacklegalMove && !blackAttackerblock;
  }

  if(whiteCheckmate()){
    Checkmate.play();
    let image = "../pieces_Img/mateicon.png";
    let resultColor = color == "white"? "#a0a0a0" : "rgb(11, 220, 98)";
    resultframe(resultColor,"Black Won","by Checkmate",image);
  }
  if(blackCheckmate()){
    Checkmate.play();
    let image = "../pieces_Img/mateicon.png";
    let resultColor = color == "white"? "rgb(11, 220, 98)" : "#a0a0a0";
    resultframe(resultColor,"White Won","by Checkmate",image);
  }
}
