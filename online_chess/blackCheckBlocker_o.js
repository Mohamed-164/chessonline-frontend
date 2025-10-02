import {
  gameState,
  gamemove,
  renderboard,
  clearHighlights,
  BlackCapturedPiece,
} from "./mainChess_o.js";
import { gamecode, color, socket } from "./onlineChess.js";
import { move, capture } from "./preloadsound_o.js";
import { board } from "./boarddata_o.js";
import { iskinginCheck } from "./checkDetection_o.js";
import { isPiecePinned } from "./pinnedPieces_o.js";
import {
  blackpawnlocation,
  blackKnightloaction,
  blackrookORqueenlocation,
  blackBishopORqueenlocation,
} from "./whitePathDetection_o.js";

/* ***************************************** function thats help to block check for white ********************************* */

export function blackcheckBlocker() {
  let { black_down, black_left, black_right, black_enpassent } =
    blackpawnlocation();
  let {
    black_KnightUP_left,
    black_KnightUp_right,
    black_Knightdown_left,
    black_Knightdown_right,
    black_Knightright_up,
    black_Knightright_down,
    black_Knightleft_up,
    black_Knightleft_down,
  } = blackKnightloaction();

  let { blackthreadposition,DistanceBetweenBlack } =
    iskinginCheck();
  let {
    black_rookQueenup,
    black_rookQueendown,
    black_rookQueenleft,
    black_rookQueenright,
  } = blackrookORqueenlocation();
  let {
    black_bishopQueenupleft,
    black_bishopQueenupright,
    black_bishopQueendownleft,
    black_bishopQueendownright,
  } = blackBishopORqueenlocation();

  let blackAttackers = false;
  let blackblockers = false;

  /* ___________________________ function that check for possible block for white_______________ */
  if (blackthreadposition.length == 1) {
    let [threadrow, threadcol] = blackthreadposition[0];
    function blackblocker() {
      let blockposition = [];
      if (board[threadrow][threadcol] !== "N") {
        if (DistanceBetweenBlack.length > 0) {
          for (let i = 0; i < DistanceBetweenBlack.length; i++) {
            function blockerCheck(arr) {
              if (arr.length > 0) {
                for (let j = 0; j < arr.length; j++) {
                  let [a, b, Dist_row, Dist_col] = DistanceBetweenBlack[i];
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
            blockerCheck(black_KnightUP_left);
            blockerCheck(black_KnightUp_right);
            blockerCheck(black_Knightdown_left);
            blockerCheck(black_Knightdown_right);
            blockerCheck(black_Knightright_up);
            blockerCheck(black_Knightright_down);
            blockerCheck(black_Knightleft_up);
            blockerCheck(black_Knightleft_down);
            /* _____________________________________ rook and queen _______________________________________ */
            blockerCheck(black_rookQueenup);
            blockerCheck(black_rookQueendown);
            blockerCheck(black_rookQueenleft);
            blockerCheck(black_rookQueenright);
            /* ____________________________________ bishop and queen _______________________________________ */
            blockerCheck(black_bishopQueenupleft);
            blockerCheck(black_bishopQueenupright);
            blockerCheck(black_bishopQueendownleft);
            blockerCheck(black_bishopQueendownright);
            /* ___________________________________ pawn black  _____________________________________ */
            blockerCheck(black_down);
            blockerCheck(black_enpassent);
          } /* ? belongs distance loop  */
        }
      }
      return { blockposition };
    }

    /* _____________ function that check for possible piece that remove threat for white_____________ */

    function blackAttacker() {
      let Attackerposition = [];

      function Attackercheck(arr) {
        if (arr.length > 0) {
          for (let j = 0; j < arr.length; j++) {
            let [thread_row, thread_col] = blackthreadposition[0];
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
      Attackercheck(black_KnightUP_left);
      Attackercheck(black_KnightUp_right);
      Attackercheck(black_Knightdown_left);
      Attackercheck(black_Knightdown_right);
      Attackercheck(black_Knightright_up);
      Attackercheck(black_Knightright_down);
      Attackercheck(black_Knightleft_up);
      Attackercheck(black_Knightleft_down);
      /* __________________________________ rook and queen _________________________________________ */
      Attackercheck(black_rookQueenup);
      Attackercheck(black_rookQueendown);
      Attackercheck(black_rookQueenleft);
      Attackercheck(black_rookQueenright);
      /* ____________________________________ bishop and queen ________________________________________ */
      Attackercheck(black_bishopQueenupleft);
      Attackercheck(black_bishopQueenupright);
      Attackercheck(black_bishopQueendownleft);
      Attackercheck(black_bishopQueendownright);
      /* ____________________________________ black pawn _______________________________________ */
      Attackercheck(black_left);
      Attackercheck(black_right);

      return { Attackerposition };
    }

    /* ************************ helper function to find place for check block ******************** */
    let { blockposition } = blackblocker();
    let { Attackerposition } = blackAttacker();
    blackAttackers = Attackerposition.length > 0 ? true : false;
    blackblockers = blockposition.length > 0 ? true : false;
    let piece_onlyAttack = [];
    let piece_onlyBlock = [];
    let piece_Bothability = [];


    if(blackAttackers || blackblockers){
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
            BlackCapturedPiece.push(capturedpiece);
            let captureobj = {
              code: gamecode,
              mycolor: color,
              color: "black",
              captured: capturedpiece,
              };
              socket.emit("capture", captureobj);
              let moveData = new gamemove(
                color,
                gamecode,
                r,
                c,
                Attackrow,
                Attackcol
              );
            socket.emit("move", moveData);
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
                let moveData = new gamemove(color, gamecode, bkrow, bkcol, brow, bcol);
                socket.emit("move", moveData);
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
                let moveData = new gamemove(color, gamecode, bkrow, bkcol, brow, bcol);
                socket.emit("move", moveData);
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
            BlackCapturedPiece.push(capturedpiece);
            let captureobj = {
              code: gamecode,
              mycolor: color,
              color: "black",
              captured: capturedpiece,
              };
              socket.emit("capture", captureobj);
              let moveData = new gamemove(
                color,
                gamecode,
                r,
                c,
                Attackrow,
                Attackcol
              );
            socket.emit("move", moveData);
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

  return blackAttackers || blackblockers;
}
