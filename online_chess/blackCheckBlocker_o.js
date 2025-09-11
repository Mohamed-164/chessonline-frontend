import { gameState,
         gamemove,
         renderboard,
         clearHighlights,
         BlackCapturedPiece
        } from "./mainChess_o.js";
import { gamecode,color, socket } from "./onlineChess.js";
import { move,capture } from "./preloadsound_o.js";
import { board } from "./boarddata_o.js";
import { iskinginCheck } from "./checkDetection_o.js";
import { isPiecePinned } from "./pinnedPieces_o.js";
import { blackpawnlocation,
         blackKnightloaction,
         blackrookORqueenlocation,
         blackBishopORqueenlocation
        } from "./whitePathDetection_o.js";
  
 /* ***************************************** function thats help to block check for white ********************************* */
    
export function blackcheckBlocker(){

let {
  black_down,
  black_left,
  black_right,
  black_enpassent
} = blackpawnlocation();
let {
      black_KnightUP_left,
      black_KnightUp_right,
      black_Knightdown_left,
      black_Knightdown_right,
      black_Knightright_up,
      black_Knightright_down,
      black_Knightleft_up,
      black_Knightleft_down
    } = blackKnightloaction();

let {
    blackthreadposition,
    isBlackincheck,
    DistanceBetweenBlack
} = iskinginCheck();
let {
    black_rookQueenup,
    black_rookQueendown,
    black_rookQueenleft,
    black_rookQueenright} = blackrookORqueenlocation();
let  {
    black_bishopQueenupleft,
    black_bishopQueenupright,
    black_bishopQueendownleft,
    black_bishopQueendownright} = blackBishopORqueenlocation();

let blackAttackers = false;
let blackblockers = false;

/* ___________________________ function that check for possible block for white_______________ */
if(blackthreadposition.length == 1){ 

let [threadrow,threadcol] = blackthreadposition[0];
function blackblocker(){
    let blockposition = [];
    if(board[threadrow][threadcol] !== 'N'){
      if(DistanceBetweenBlack.length > 0){
        for(let i = 0; i < DistanceBetweenBlack.length ; i++){
  
          function blockerCheck(arr){
            if(arr.length > 0){
                for(let j = 0; j < arr.length; j++){
                    let [a,b,Dist_row,Dist_col] = DistanceBetweenBlack[i];
                    let [r,c,x,y] = arr[j];
                    let uprow;
                    let upcol;
                    if(Dist_row == x && Dist_col == y){
                      uprow = x;
                      upcol = y;
                      blockposition.push([r,c,uprow,upcol]);
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
  
    }/* ? belongs distance loop  */
  
    }
    }
    return {blockposition};
}

/* _____________ function that check for possible piece that remove threat for white_____________ */

function blackAttacker(){
    let Attackerposition = [];

    function Attackercheck(arr){
      if(arr.length > 0){
         for(let j = 0; j < arr.length; j++){
             let [thread_row,thread_col] = blackthreadposition[0];
             let [r,c,x,y] = arr[j];
             if(thread_row == x && thread_col == y){
               Attackerposition.push([r,c,x,y]);
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

    return {Attackerposition};
}

/* ************************ helper function to find place for check block ******************** */
let {blockposition} = blackblocker();
let {Attackerposition} = blackAttacker();
blackAttackers = Attackerposition.length > 0 ? true : false;
blackblockers = blockposition.length > 0 ? true : false;
    function checkerPath(){
        if(
            blackthreadposition.length > 0 &&
            blackthreadposition !== undefined
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
                              let capturepiece = board[Attackrow][Attackcol];
                              BlackCapturedPiece.push(capturepiece);
                              let captureobj = 
                              {code : gamecode,mycolor : color,color : 'black',captured : capturepiece};
                              socket.emit('capture',captureobj);
                              let moveData = new gamemove(color,gamecode,r,c,Attackrow,Attackcol);
                              socket.emit("move", moveData);
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
                                let moveData = new gamemove(color,gamecode,r,c,row,col);
                                socket.emit("move", moveData);
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
              if(Attackerpiece){
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
                       BlackCapturedPiece.push(capturedpiece);
                       let captureobj = 
                       {code : gamecode,mycolor : color,color : 'black',captured : capturedpiece};
                       socket.emit('capture',captureobj);
                       let moveData = new gamemove(color,gamecode,a,b,x,y);
                       socket.emit("move", moveData);
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

 return blackAttackers || blackblockers;
}
