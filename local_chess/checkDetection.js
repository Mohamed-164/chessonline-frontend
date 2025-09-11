import { board } from "./boarddata.js";
import { blackKinglocation,
         whitepawnlocation,
         whiteKnightloaction,
         whiterookORqueenlocation,
         whiteBishopORqueenlocation
        } from "./blackPathDetection.js";
import { whiteKinglocation,
         blackpawnlocation,
         blackKnightloaction,
         blackrookORqueenlocation,
         blackBishopORqueenlocation
       } from "./whitePathDetection.js";
       
       /* ******************************************* checking king in check ******************************************* */
       
export function iskinginCheck(){


  let {
       black_left,
       black_right
      } = blackpawnlocation();
  let {
        white_left,
        white_right
      } = whitepawnlocation();
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
       black_rookQueenup,
       black_rookQueendown,
       black_rookQueenleft,
       black_rookQueenright
      } = blackrookORqueenlocation();
  let {
       black_bishopQueenupleft,
       black_bishopQueenupright,
       black_bishopQueendownleft,
       black_bishopQueendownright
      } = blackBishopORqueenlocation();
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
       white_rookQueenup,
       white_rookQueendown,
       white_rookQueenleft,
       white_rookQueenright
      } = whiterookORqueenlocation();
  let{
       white_bishopQueenupleft,
       white_bishopQueenupright,
       white_bishopQueendownleft,
       white_bishopQueendownright
      } = whiteBishopORqueenlocation();



let whitethreadposition = [];
let blackthreadposition = [];
let DistanceBetweenWhite;
let DistanceBetweenBlack = [];
  function checkerWhitePath(arr1,arr2){
      if( arr1 !== undefined && arr2 !== undefined && arr1.length > 0  && arr2.length > 0 ){
        for(let i = 0; i < arr2.length; i++){
          let kingfound = false;
          let [kingrow,kingcol] = arr1[0];
          let [r,c,x,y] = arr2[i];
          if(kingrow == x && kingcol  == y){
            kingfound = true;
            whitethreadposition.push([r,c]);
            if(kingfound && board[r][c] !== 'n'){
              let distance = [];
              for(let j = 0; j < arr2.length ; j++){
                let[threadrow,threadcol]=whitethreadposition[0];
                let[a,b,c,d] = arr2[j];
                if(a == threadrow && b == threadcol && (kingrow !== c || kingcol !== d)){
                  distance.push([a,b,c,d]);
                }
              }
              DistanceBetweenWhite = distance;
            }
            return true;
          }
        }
      }
      return false;
  }
  
  function checkerBlackPath(arr1,arr2){
      if( arr1 !== undefined && arr2 !== undefined && arr1.length > 0  && arr2.length > 0 ){
        for(let i = 0; i < arr2.length; i++){
          let kingfound = false;
          let [kingrow,kingcol] = arr1[0];
          let [r,c,x,y] = arr2[i];
          if(kingrow == x && kingcol  == y){
            blackthreadposition.push([r,c]);
            kingfound = true;            
            if(kingfound && board[r][c] !== 'N'){
              let distance = [];
              for(let j = 0; j < arr2.length ; j++){
                let[threadrow,threadcol]=blackthreadposition[0];
                let[a,b,c,d] = arr2[j];
                if(a == threadrow && b == threadcol && (kingrow !== c || kingcol !== d)){
                  distance.push([a,b,c,d]);
                }
              }
              DistanceBetweenBlack = distance;
            }
            return true;
          }
        }
      }
    return false;
  }
  
        
  let {white_KingLoaction} = whiteKinglocation();
  let {black_KingLoaction} = blackKinglocation();
  let isWhiteincheck = false;
  let isBlackincheck = false;

function setWhitecheck(){
  isWhiteincheck = true;
}
function setblackcheck(){
  isBlackincheck = true;
}

function whiteincheck(arr){
  if(arr.length > 0){
    let positionofCheck = checkerWhitePath(white_KingLoaction,arr);
    if(whitethreadposition.length > 0){
      setWhitecheck();
    }
    if(positionofCheck){
     return true;
    }
  }
}

let [whiterow,whitecol] = white_KingLoaction[0];
let [blackrow,blackcol] = black_KingLoaction[0];

/* _______________________________________ knight check ____________________________________________ */

whiteincheck(black_KnightUP_left);
whiteincheck(black_KnightUp_right);
whiteincheck(black_Knightdown_left);
whiteincheck(black_Knightdown_right);
whiteincheck(black_Knightright_up);
whiteincheck(black_Knightright_down);
whiteincheck(black_Knightleft_up);
whiteincheck(black_Knightleft_down);
/* _______________________________________ rook or queen check ____________________________________________ */
let whiteup = whiteincheck(black_rookQueenup);
let whitedown = whiteincheck(black_rookQueendown);
let whiteleft = whiteincheck(black_rookQueenleft);
let whiteright = whiteincheck(black_rookQueenright);
/* _______________________________________ bishop or queen check ____________________________________________ */
let whiteupleft = whiteincheck(black_bishopQueenupleft);
let whiteupright = whiteincheck(black_bishopQueenupright);
let whitedownleft = whiteincheck(black_bishopQueendownleft);
let whitedownright = whiteincheck(black_bishopQueendownright);
/* _______________________________________ pawn check ____________________________________________ */
whiteincheck(black_left);
whiteincheck(black_right);

 function blackincheck(arr){
  if(arr.length > 0){
    let positionofCheck = checkerBlackPath(black_KingLoaction,arr);
    if(blackthreadposition.length > 0){
      setblackcheck();
    }
    if(positionofCheck){
     return true;
    }
  }
 }
  /* _________________________________ knight check ____________________________________ */
  
blackincheck(white_KnightUP_left);
blackincheck(white_KnightUp_right);
blackincheck(white_Knightdown_left);
blackincheck(white_Knightdown_right);
blackincheck(white_Knightright_up);
blackincheck(white_Knightright_down);
blackincheck(white_Knightleft_up);
blackincheck(white_Knightleft_down);
/* _______________________________________ rook or queen check ____________________________________________ */
let blackup = blackincheck(white_rookQueenup);
let blackdown = blackincheck(white_rookQueendown);
let blackleft = blackincheck(white_rookQueenleft);
let blackright = blackincheck(white_rookQueenright);
/* _______________________________________ bishop or queen check ____________________________________________ */
let blackupleft = blackincheck(white_bishopQueenupleft);
let blackupright = blackincheck(white_bishopQueenupright);
let blackdownleft = blackincheck(white_bishopQueendownleft);
let blackdownright = blackincheck(white_bishopQueendownright);
/* _______________________________________ pawn check ____________________________________________ */

blackincheck(white_left);
blackincheck(white_right);



if(isWhiteincheck){
  let kingplace = 
  document.querySelector(`.cell[data-row="${whiterow}"][data-col="${whitecol}"]`);
  kingplace.classList.add('checkhighlight');
}
if(isBlackincheck){
  let kingplace = 
  document.querySelector(`.cell[data-row="${blackrow}"][data-col="${blackcol}"]`);
  kingplace.classList.add('checkhighlight');
}

  return{isWhiteincheck,
         whiteup,
         whitedown,
         whiteleft,
         whiteright,
         whiteupleft,
         whiteupright,
         whitedownleft,
         whitedownright,
         isBlackincheck,
         blackup,
         blackdown,
         blackleft,
         blackright,
         blackupleft,
         blackupright,
         blackdownleft,
         blackdownright,
         whitethreadposition,
         DistanceBetweenWhite,
         blackthreadposition,
         DistanceBetweenBlack,
        };
}/*  ? isKing in check ______ */


