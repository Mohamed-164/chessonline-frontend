import { gameState, WhiteCapturedPiece } from "./mainChess.js";
import { move, capture } from "./preloadsound.js";
import { board } from "./boarddata.js";
import { iskinginCheck } from "./checkDetection.js";
import { renderboard } from "./mainChess.js";
import { isPiecePinned } from "./pinnedPieces.js";
import {
  whitepawnlocation,
  whiteKnightloaction,
  whiterookORqueenlocation,
  whiteBishopORqueenlocation,
} from "./blackPathDetection.js";
import { clearHighlights } from "./mainChess.js";

/* ********************** function thats help to block check for white ************************* */

export function whitecheckBlocker() {
  let { white_up, white_left, white_right, white_enpassent } =
    whitepawnlocation();
  let {
    white_KnightUP_left,
    white_KnightUp_right,
    white_Knightdown_left,
    white_Knightdown_right,
    white_Knightright_up,
    white_Knightright_down,
    white_Knightleft_up,
    white_Knightleft_down,
  } = whiteKnightloaction();

  let { isWhiteincheck, whitethreadposition, DistanceBetweenWhite } =
    iskinginCheck();
  let {
    white_rookQueenup,
    white_rookQueendown,
    white_rookQueenleft,
    white_rookQueenright,
  } = whiterookORqueenlocation();
  let {
    white_bishopQueenupleft,
    white_bishopQueenupright,
    white_bishopQueendownleft,
    white_bishopQueendownright,
  } = whiteBishopORqueenlocation();

  let whiteblockers = false;
  let whiteAttackers = false;
  if (whitethreadposition.length == 1) {
    let [threadrow, threadcol] = whitethreadposition[0];
    /* ____________________ function that check for possible block for white_______________ */

    function whiteblocker() {
      let blockposition = [];
      if (board[threadrow][threadcol] !== "n") {
        if (DistanceBetweenWhite.length > 0) {
          for (let i = 0; i < DistanceBetweenWhite.length; i++) {
            function blockerCheck(arr) {
              if (arr.length > 0) {
                for (let j = 0; j < arr.length; j++) {
                  let [a, b, Dist_row, Dist_col] = DistanceBetweenWhite[i];
                  let [r, c, x, y] = arr[j];
                  let blockrow;
                  let blockcol;
                  if (Dist_row == x && Dist_col == y) {
                    blockrow = x;
                    blockcol = y;
                    let locationOfPiece = { row: r, col: c };
                    let clickedPiece = board[r][c];
                    const { isKingInThread } = isPiecePinned(
                      board,
                      clickedPiece,
                      locationOfPiece
                    );
                    let ispinned = isKingInThread;
                    if (!ispinned) {
                      blockposition.push([r, c, blockrow, blockcol]);
                    }
                  }
                }
              }
            }
            /* _______________________________________ knight ________________________________________ */
            blockerCheck(white_KnightUP_left);
            blockerCheck(white_KnightUp_right);
            blockerCheck(white_Knightdown_left);
            blockerCheck(white_Knightdown_right);
            blockerCheck(white_Knightright_up);
            blockerCheck(white_Knightright_down);
            blockerCheck(white_Knightleft_up);
            blockerCheck(white_Knightleft_down);
            /* _______________________________________ rook and queen ______________________________________ */
            blockerCheck(white_rookQueenup);
            blockerCheck(white_rookQueendown);
            blockerCheck(white_rookQueenleft);
            blockerCheck(white_rookQueenright);
            /* _____________________________________ bishop and queen ______________________________________ */
            blockerCheck(white_bishopQueenupleft);
            blockerCheck(white_bishopQueenupright);
            blockerCheck(white_bishopQueendownleft);
            blockerCheck(white_bishopQueendownright);
            /* ___________________________________ pawn white  _____________________________________ */
            blockerCheck(white_up);
            blockerCheck(white_enpassent);
          } /* ? belongs distance loop  */
        }
      }
      return { blockposition };
    }

    /* _____________ function that check for possible piece that remove threat for white_____________ */
    function whiteAttacker() {
      let Attackerposition = [];

      function Attackercheck(arr) {
        if (arr.length > 0) {
          for (let j = 0; j < arr.length; j++) {
            let [thread_row, thread_col] = whitethreadposition[0];
            let [r, c, x, y] = arr[j];
            if (thread_row == x && thread_col == y) {
              let locationOfPiece = { row: r, col: c };
              let clickedPiece = board[r][c];
              const { isKingInThread } = isPiecePinned(
                board,
                clickedPiece,
                locationOfPiece
              );
              let ispinned = isKingInThread;
              if (!ispinned) {
                Attackerposition.push([r, c, x, y]);
              }
            }
          }
        }
      }
      /* __________________________________ knight _________________________________________ */
      Attackercheck(white_KnightUP_left);
      Attackercheck(white_KnightUp_right);
      Attackercheck(white_Knightdown_left);
      Attackercheck(white_Knightdown_right);
      Attackercheck(white_Knightright_up);
      Attackercheck(white_Knightright_down);
      Attackercheck(white_Knightleft_up);
      Attackercheck(white_Knightleft_down);
      /* __________________________________ rook and queen _______________________________________ */
      Attackercheck(white_rookQueenup);
      Attackercheck(white_rookQueendown);
      Attackercheck(white_rookQueenleft);
      Attackercheck(white_rookQueenright);
      /* ________________________________ bishop and queen _________________________________________ */
      Attackercheck(white_bishopQueenupleft);
      Attackercheck(white_bishopQueenupright);
      Attackercheck(white_bishopQueendownleft);
      Attackercheck(white_bishopQueendownright);
      /* ____________________________________ white pawn _______________________________________ */
      Attackercheck(white_left);
      Attackercheck(white_right);

      return { Attackerposition };
    }

    /* ************************ helper function to find place for check block ******************** */
    let { blockposition } = whiteblocker();
    let { Attackerposition } = whiteAttacker();
    whiteblockers = blockposition.length > 0 ? true : false;
    whiteAttackers = Attackerposition.length > 0 ? true : false;
    let piece_onlyAttack = [];
    let piece_onlyBlock = [];
    let piece_Bothability = [];


    if(whiteAttackers || whiteblockers){
      if(Attackerposition.length > 0 && blockposition.length > 0){
        for(let i = 0; i < blockposition.length; i++){
         let [piecerow,piececol,blockrow,blockcol] = blockposition[i];
         for(let j = 0; j < Attackerposition.length; j++){
          let[AttackerRow,AttackerCol,threadRow,threadcol] = Attackerposition[j];
          if(AttackerRow == piecerow && AttackerCol == piececol){
            piece_Bothability.push([piecerow,piececol,blockrow,blockcol]);
          }
         }
        }
      }

      if(blockposition.length > 0){
        if(piece_Bothability.length > 0){
          for(let i = 0; i < blockposition.length; i++){
            let [piecerow,piececol,blockrow,blockcol] = blockposition[i];
            for(let j = 0; j < piece_Bothability.length; j++){
              let [bothrow,bothcol,bothx,bothy] = piece_Bothability[j];
              if(piecerow !== bothrow && piececol !== bothcol){
                piece_onlyBlock.push([piecerow,piececol,blockrow,blockcol]);
              }
            }
          }
        }else{
          piece_onlyBlock = blockposition;
        }
      }

      if(Attackerposition.length > 0){
        if(piece_Bothability.length > 0){
          for(let i = 0; i < Attackerposition.length; i++){
            let [AttackerRow,AttackerCol,threadRow,threadcol] = Attackerposition[i];
            for(let j = 0; j < piece_Bothability; j++){
              let [bothrow,bothcol,bothx,bothy] = piece_Bothability[j];
              if(AttackerRow !== bothrow && AttackerCol !== bothcol){
                piece_onlyAttack.push([bothrow,bothcol]);
              }
            }
          }
        }else{
          piece_onlyAttack = Attackerposition;
        }
      }
    }

    function bothAbility(){
      for(let i = 0; i < piece_Bothability.length; i++){
        let blockerArray = [];
        let blockplacer = [];
        let [bkrow,bkcol,x,y] = piece_Bothability[i];

        for(let j = 0; j < piece_Bothability.length; j++){
          let [piecerow,piececol,r,c] = piece_Bothability[j];
          if(bkrow == piecerow && bkcol == piececol){
            blockerArray.push([bkrow,bkcol,r,c]);
          }
        }
        let threadremover = 
        document.querySelector(`.cell[data-row="${bkrow}"][data-col="${bkcol}"]`);
        let threadplace = 
        document.querySelector(`.cell[data-row="${threadrow}"][data-col="${threadcol}"]`);
        
        if(blockerArray.length > 0){
          for(let k = 0; k < blockerArray.length; k++){
            let [brow,bcol,r,c] = blockerArray[k];
            blockplacer[k] = document.querySelector(`.cell[data-row="${r}"][data-col="${c}"]`);
          }
        }

        threadremover.onclick = () =>{
          clearHighlights();
          threadplace.classList.add("AttackHighlight");

          let clickedPiece = board[bkrow][bkcol];
          threadplace.onclick = () =>{
            gameState.push([clickedPiece,threadrow,threadcol,bkrow,bkcol]);
            let capturedpiece = board[threadrow][threadcol];      
            WhiteCapturedPiece.push(capturedpiece);
            board[threadrow][threadcol] = board[bkrow][bkcol];
            board[bkrow][bkcol] = "";
            capture.play();
            clearHighlights();
            renderboard(board);
          }
          blockplacer.forEach((el) => {
            el.classList.add("highlighted");
            el.onclick = () => {
               const brow = parseInt(el.dataset.row);
               const bcol = parseInt(el.dataset.col);
                gameState.push([clickedPiece, brow, bcol, bkrow, bkcol]);
                board[brow][bcol] = board[bkrow][bkcol];
                board[bkrow][bkcol] = "";
                move.play();
                clearHighlights();
                renderboard(board);
            }
          });
        }
      }
    }

    function onlyBlock(){
      for(let i = 0; i < piece_onlyBlock.length; i++){
        let blockerArray = [];
        let blockplacer = [];
        let [bkrow,bkcol,x,y] = piece_onlyBlock[i];

        for(let j = 0; j < piece_onlyBlock.length; j++){
          let [piecerow,piececol,r,c] = piece_onlyBlock[j];
          if(bkrow == piecerow && bkcol == piececol){
            blockerArray.push([bkrow,bkcol,r,c]);
          }
        }
        let threadblocker = 
        document.querySelector(`.cell[data-row="${bkrow}"][data-col="${bkcol}"]`);
        
        if(blockerArray.length > 0){
          for(let k = 0; k < blockerArray.length; k++){
            let [brow,bcol,r,c] = blockerArray[k];
            blockplacer[k] = document.querySelector(`.cell[data-row="${r}"][data-col="${c}"]`);
          }
        }

        threadblocker.onclick = () =>{
          clearHighlights();
          let clickedPiece = board[bkrow][bkcol];

          blockplacer.forEach((el) => {
            el.classList.add("highlighted");
            el.onclick = () => {
               const brow = parseInt(el.dataset.row);
               const bcol = parseInt(el.dataset.col);
                gameState.push([clickedPiece, brow, bcol, bkrow, bkcol]);
                board[brow][bcol] = board[bkrow][bkcol];
                board[bkrow][bkcol] = "";
                move.play();
                clearHighlights();
                renderboard(board);
            }
          });
        }
      }
    }

    function onlyAttack(){
      for(let i = 0; i < piece_onlyAttack.length; i++){
        let [row,col] = piece_onlyAttack[i];
        let clickedPiece = board[row][col];
        let threadremover = 
        document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
        let threadplace = 
        document.querySelector(`.cell[data-row="${threadrow}"][data-col="${threadcol}"]`);
        threadremover.onclick = () => {
          threadplace.classList.add("AttackHighlight");
          threadplace.onclick = () => {
            gameState.push([clickedPiece,threadrow,threadcol,row,col]);
            let capturedpiece = board[threadrow][threadcol];      
            WhiteCapturedPiece.push(capturedpiece);
            board[threadrow][threadcol] = board[row][col];
            board[row][col] = "";
            capture.play();
            renderboard(board);
          }
        }
      }
    }

if(piece_Bothability.length > 0){
  bothAbility();
}
if(piece_onlyBlock.length > 0){
  onlyBlock();
}
if(piece_onlyAttack.length > 0){
  onlyAttack();
}
  }

  return whiteAttackers || whiteblockers;
}
