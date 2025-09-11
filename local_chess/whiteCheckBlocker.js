import { gameState, WhiteCapturedPiece } from "./mainChess.js";
import { move,capture } from "./preloadsound.js";
import { board } from "./boarddata.js";
import { iskinginCheck } from "./checkDetection.js";
import {renderboard} from "./mainChess.js"
import { isPiecePinned } from "./pinnedPieces.js";
import { whitepawnlocation,
         whiteKnightloaction,
         whiterookORqueenlocation,
         whiteBishopORqueenlocation
        } from "./blackPathDetection.js";
import { clearHighlights } from "./mainChess.js";
   
 /* ********************** function thats help to block check for white ************************* */
    
export function whitecheckBlocker(){

let {
  white_up,
  white_left,
  white_right,
  white_enpassent
} = whitepawnlocation();
let {
      white_KnightUP_left,
      white_KnightUp_right,
      white_Knightdown_left,
      white_Knightdown_right,
      white_Knightright_up,
      white_Knightright_down,
      white_Knightleft_up,
      white_Knightleft_down
    } = whiteKnightloaction();

let {
    isWhiteincheck,
    whitethreadposition,
    DistanceBetweenWhite
} = iskinginCheck();
let {
    white_rookQueenup,
    white_rookQueendown,
    white_rookQueenleft,
    white_rookQueenright} = whiterookORqueenlocation();
let  {
    white_bishopQueenupleft,
    white_bishopQueenupright,
    white_bishopQueendownleft,
    white_bishopQueendownright} = whiteBishopORqueenlocation();

let whiteblockers = false;
let whiteAttackers = false;
if(whitethreadposition.length == 1){
  let [threadrow,threadcol] = whitethreadposition[0];
/* ____________________ function that check for possible block for white_______________ */

function whiteblocker(){
    let blockposition = [];
    if(board[threadrow][threadcol] !== 'n'){      
      if(DistanceBetweenWhite.length > 0){
        for(let i = 0; i < DistanceBetweenWhite.length ; i++){
  
          function blockerCheck(arr){
            if(arr.length > 0){
                for(let j = 0; j < arr.length; j++){
                    let [a,b,Dist_row,Dist_col] = DistanceBetweenWhite[i];
                    let [r,c,x,y] = arr[j];
                    let blockrow;
                    let blockcol;
                    if(Dist_row == x && Dist_col == y){
                      blockrow = x;
                      blockcol = y;
                      blockposition.push([r,c,blockrow,blockcol]);
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
  
         }/* ? belongs distance loop  */
  
      }
    }
    return {blockposition};
}

/* _____________ function that check for possible piece that remove threat for white_____________ */
function whiteAttacker(){
    let Attackerposition = [];
    
    function Attackercheck(arr){
      if(arr.length > 0){
         for(let j = 0; j < arr.length; j++){
             let [thread_row,thread_col] = whitethreadposition[0];
             let [r,c,x,y] = arr[j];
             if(thread_row == x && thread_col == y){
               Attackerposition.push([r,c,x,y]);
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


    return {Attackerposition};
}

/* ************************ helper function to find place for check block ******************** */
let {blockposition} = whiteblocker();
let {Attackerposition} = whiteAttacker();
whiteblockers = blockposition.length > 0 ? true : false;
whiteAttackers = Attackerposition.length > 0 ? true : false; 
    function checkerPath(){
        if(
            whitethreadposition.length > 0 &&
            whitethreadposition !== undefined
        ){
          let piece_onlyAttack = [];
          let piece_Bothability = [];
                if(blockposition.length > 0){
                  for(let i = 0; i < blockposition.length; i++){
                    let locationOfPiece = {row : null , col : null}
                    let [r,c,x,y] = blockposition[i];
                    locationOfPiece.row = r;
                    locationOfPiece.col = c;
                    let blockArray = [[x,y]];
                    if(Attackerposition.length > 0){
                      for(let j = 0; j < Attackerposition.length; j++){
                        let [ar,ac,tr,tc] = Attackerposition[j];
                        if(ar == r && ac == c){
                          piece_Bothability.push([tr,tc]);
                        }else{
                          piece_onlyAttack.push([ar,ac,tr,tc]);
                        }
                      }
                    }
                      for(let j = 0; j < blockposition.length; j++){
                        let [a,b,e,d] = blockposition[j];
                        if(a == r && b == c && (e !== x || d !== y)){
                          let block = [e,d];
                           blockArray.push(block);
                        }
                      }
                      let clickedPiece = board[locationOfPiece.row][locationOfPiece.col];
                      let threadblocker = document.querySelector
                      (`.cell[data-row="${locationOfPiece.row}"][data-col="${locationOfPiece.col}"]`);
                      let Attacker;
                      let Attackrow;
                      let Attackcol;
                      if(piece_Bothability.length > 0){
                        let [attackrow,attackcol] = piece_Bothability[0];
                        Attackrow = attackrow;
                        Attackcol = attackcol;
                        Attacker = document.querySelector
                          (`.cell[data-row="${attackrow}"][data-col="${attackcol}"]`);
                      }
                      let blockplacer = [];
                      for(let k = 0; k<blockArray.length;k++){
                        let [br,bc] = blockArray[k];
                        blockplacer[k] = document.
                        querySelector(`.cell[data-row="${br}"][data-col="${bc}"]`);
                      }
                      const {isKingInThread} = isPiecePinned(board,clickedPiece,locationOfPiece);
                      let ispinned = isKingInThread;
                      if(!ispinned){
                        threadblocker.onclick = () =>{
                           clearHighlights();
                           if(Attacker){
                             Attacker.classList.add('AttackHighlight');
                             Attacker.onclick = () =>{
                              gameState.push([clickedPiece,Attackrow,Attackcol,r,c]);
                              let capturedpiece = board[Attackrow][Attackcol];
                              WhiteCapturedPiece.push(capturedpiece);
                              board[Attackrow][Attackcol] = board[r][c];
                              board[r][c] = '';
                              capture.play();
                              clearHighlights();
                              renderboard(board);
                             }
                           }
                           blockplacer.forEach(el =>{                          
                             el.classList.add('highlighted');
                             el.onclick = () =>{
                                const row = parseInt(el.dataset.row);
                                const col = parseInt(el.dataset.col);
                                gameState.push([clickedPiece,row,col,r,c]);
                                board[row][col] = board[r][c];
                                board[r][c] = '';
                                move.play();
                                clearHighlights();
                                renderboard(board);
                             }
                           });
                        }
                      }
                  }
                }
                let Attackerpiece = [];
                if(Attackerposition.length > 0 && piece_Bothability.length > 0){
                  for(let i = 0; i < Attackerposition.length; i++){
                    for(let j = 0; j < piece_Bothability.length; j++){
                      let [r,c,x,y] = Attackerposition[i];
                      let [a,b] = piece_Bothability[j];
                      if(x!==a && c !==y){
                        Attackerpiece.push([r,c,x,y]);
                      }
                    }
                  }
                }else if(Attackerposition.length > 0){
                  Attackerpiece = Attackerposition;
                }
                if(Attackerpiece.length > 0){
                  for(let i = 0; i < Attackerpiece.length; i++){
                    let [a,b,x,y] = Attackerpiece[i];
                    let Attacker = document.
                    querySelector(`.cell[data-row="${a}"][data-col="${b}"]`);
                    let threadplace = document.
                    querySelector(`.cell[data-row="${x}"][data-col="${y}"]`);
                    let clickedPiece = board[a][b];
                    let locationOfPiece = { row: a, col: b }; 
                    const {isKingInThread} = isPiecePinned(board,clickedPiece,locationOfPiece);
                    let ispinned = isKingInThread;
                    if(!ispinned){
                      Attacker.onclick = () =>{
                      threadplace.classList.add('AttackHighlight');
                       threadplace.onclick = () =>{
                         gameState.push([clickedPiece,x,y,a,b]);
                         let capturedpiece = board[x][y];
                         WhiteCapturedPiece.push(capturedpiece);
                         board[x][y] = board[a][b];
                         board[a][b] = '';
                         capture.play();
                         clearHighlights();
                         renderboard(board);
                       }
                      }
                    }
                  }
                }
            }
          }
          checkerPath();
}

 return whiteAttackers || whiteblockers;
}


