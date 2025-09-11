import { gameState } from "./mainChess.js";
import { move,capture } from "./preloadsound.js";
import { renderboard } from "./mainChess.js";
import { WhiteCapturedPiece } from "./mainChess.js";
import { BlackCapturedPiece } from "./mainChess.js";
export let WhiteleftRooKMoved = false;
export let WhiteRightRooKMoved = false;
export let BlackleftRooKMoved = false;
export let BlackRightRooKMoved = false;


/* import { renderboard } from "./chess.js"; */
function isSamePiece(board,Row, Col, clickedPieceColor) {
  let piece = board[Row][Col];
  if (piece === '') return false; // early return if cell is empty

  let pieceColor = piece === piece.toUpperCase() ? "white" : "black";
  return clickedPieceColor === pieceColor;
}

function userAttackHighlight(board,AttackCell,locationOfPiece,selectedrow,selectedcol,highlight,clickedPiece){
let {row,col} = locationOfPiece;
  AttackCell.classList.add(`${highlight}`);
    AttackCell.onclick = () =>{

    let iswhitepiece = clickedPiece === clickedPiece.toUpperCase()? true : false;
    
    if(clickedPiece == 'R' && row == 7 && col == 0){
      WhiteleftRooKMoved = true;
    }else if(clickedPiece == 'R' && row == 7 && col == 7){
      WhiteRightRooKMoved = true;
    }else if(clickedPiece == 'r' && row == 0 && col == 0){
      BlackleftRooKMoved = true;
    }else if(clickedPiece == 'r' && row == 0 && col == 7){
      BlackRightRooKMoved = true;
    }

    if(board[selectedrow][selectedcol] !== '' && iswhitepiece){
      capture.play();
      let capturedpiece = board[selectedrow][selectedcol];
      WhiteCapturedPiece.push(capturedpiece);
    }else if(board[selectedrow][selectedcol] !== '' && !iswhitepiece){
      capture.play();
      let capturedpiece = board[selectedrow][selectedcol];      
      BlackCapturedPiece.push(capturedpiece);
    }else if(board[selectedrow][selectedcol] == ''){
      move.play();
    }
    gameState.push([clickedPiece,selectedrow,selectedcol,row,col]); 
    board[selectedrow][selectedcol] = clickedPiece;
    board[row][col] = '';
    renderboard(board);
  }
}
/* ******************************************** This is  for up_LeftAttack cell ************************************************* */
export function up_LeftAttackfnc(board,locationOfPiece,clickedPieceColor,clickedPiece){
let {row,col} = locationOfPiece;
  if(col != 0 && row != 0){
    let issamepiecerow = '';
    let issamepiecercol = '';
    let issameAttackpiece;
    let attackpiecefound = false;
   for(let i=1; i<8; i++){
       let upLeftrow = row - i;
       let upLeftcol =col - i;
       if((upLeftrow >= 0 && upLeftrow < 8) && (upLeftcol >=0 && upLeftcol < 8)){
           if(board[upLeftrow][upLeftcol] !== ''){
             attackpiecefound = true;
             issamepiecerow = upLeftrow;
             issamepiecercol = upLeftcol;
         if (issamepiecerow >= 0 && issamepiecerow < 8 && issamepiecercol >= 0 && issamepiecercol < 8){
             issameAttackpiece = isSamePiece(board,issamepiecerow, issamepiecercol, clickedPieceColor);
         }
             break;
           }else if(board[upLeftrow][upLeftcol] == ''){
             let up_LeftAttack = document.querySelector(`.cell[data-row="${upLeftrow}"][data-col="${upLeftcol}"]`);
             userAttackHighlight(board,up_LeftAttack,locationOfPiece,upLeftrow,upLeftcol,'highlighted',clickedPiece);
           }
       }
   }
     if (issamepiecerow >= 0 && issamepiecerow < 8 && issamepiecercol >= 0 && issamepiecercol < 8){
       if(attackpiecefound && !issameAttackpiece){
         let up_LeftAttack = document.querySelector(`.cell[data-row="${issamepiecerow}"][data-col="${issamepiecercol}"]`);
         userAttackHighlight(board,up_LeftAttack,locationOfPiece,issamepiecerow,issamepiecercol,'AttackHighlight',clickedPiece);
       }
     }
  }
}
/* ********************************************This is  for up_RightAttack cell************************************************* */
export function up_RightAttackfnc(board,locationOfPiece,clickedPieceColor,clickedPiece){
let {row,col} = locationOfPiece;
  if(col != 7 && row != 0){
    let issamepiecerow = '';
    let issamepiecercol = '';
    let issameAttackpiece;
    let attackpiecefound = false;
   for(let i=1; i<8; i++){
    let upRightrow = row - i;
    let upRightcol = col + i;      
    if((upRightrow >= 0 && upRightrow < 8) && (upRightcol >= 0 && upRightcol < 8)){
      if(board[upRightrow][upRightcol]!== ''){
            attackpiecefound = true;
            issamepiecerow = upRightrow;
            issamepiecercol = upRightcol;
        if (issamepiecerow >= 0 && issamepiecerow < 8 && issamepiecercol >= 0 && issamepiecercol < 8){
            issameAttackpiece = isSamePiece(board,issamepiecerow, issamepiecercol, clickedPieceColor);
        }
        break;
      }else if(board[upRightrow][upRightcol] == ''){
        let up_RightAttack = document.querySelector(`.cell[data-row="${upRightrow}"][data-col="${upRightcol}"]`);
        userAttackHighlight(board,up_RightAttack,locationOfPiece,upRightrow,upRightcol,'highlighted',clickedPiece);
      }
    }
   }
    if (issamepiecerow >= 0 && issamepiecerow < 8 && issamepiecercol >= 0 && issamepiecercol < 8){
      if(attackpiecefound && !issameAttackpiece){
        let up_RightAttack = document.querySelector(`.cell[data-row="${issamepiecerow}"][data-col="${issamepiecercol}"]`);
        userAttackHighlight(board,up_RightAttack,locationOfPiece,issamepiecerow,issamepiecercol,'AttackHighlight',clickedPiece);
      }
    }
  }
}
/* ********************************************This is  for down_LeftAttack cell************************************************* */
export function down_LeftAttackfnc(board,locationOfPiece,clickedPieceColor,clickedPiece){
let {row,col} = locationOfPiece;
  if(col != 0 && row != 7){
    let issamepiecerow = '';
    let issamepiecercol = '';
    let issameAttackpiece;
    let attackpiecefound = false;
   for(let i=1; i<8; i++){
     let downLeftrow = row + i;
     let downLeftcol = col - i;
     if((downLeftrow >= 0 && downLeftrow < 8) && (downLeftcol >= 0 && downLeftcol < 8)){
       if(board[downLeftrow][downLeftcol] !== ''){
         attackpiecefound = true;
         issamepiecerow = downLeftrow;
         issamepiecercol = downLeftcol;
         if (issamepiecerow >= 0 && issamepiecerow < 8 && issamepiecercol >= 0 && issamepiecercol < 8){
             issameAttackpiece = isSamePiece(board,issamepiecerow, issamepiecercol, clickedPieceColor);
         }
         break;
       }else if(board[downLeftrow][downLeftcol] == ''){
         let down_LeftAttack = document.querySelector(`.cell[data-row="${downLeftrow}"][data-col="${downLeftcol}"]`);
         userAttackHighlight(board,down_LeftAttack,locationOfPiece,downLeftrow,downLeftcol,'highlighted',clickedPiece); 
       }
     }
   }
   if (issamepiecerow >= 0 && issamepiecerow < 8 && issamepiecercol >= 0 && issamepiecercol < 8){
     if(attackpiecefound && !issameAttackpiece){
       let down_LeftAttack = document.querySelector(`.cell[data-row="${issamepiecerow}"][data-col="${issamepiecercol}"]`);
       userAttackHighlight(board,down_LeftAttack,locationOfPiece,issamepiecerow,issamepiecercol,'AttackHighlight',clickedPiece);
     }
   }
  }
}
/* ********************************************This is  for down_RightAttack cell************************************************* */
export function down_RightAttackfnc(board,locationOfPiece,clickedPieceColor,clickedPiece){
let {row,col} = locationOfPiece;
  if(row != 7 && col != 7){
    let issamepiecerow = '';
    let issamepiecercol = '';
    let issameAttackpiece;
    let attackpiecefound = false;
   for(let i=1; i<8; i++){
     let downRightrow = row + i;
     let downRightcol = col + i;
     if((downRightrow >= 0 && downRightrow < 8) && (downRightcol >= 0 && downRightcol < 8)){
       if(board[downRightrow][downRightcol] !== ''){
         attackpiecefound = true;
         issamepiecerow = downRightrow;
         issamepiecercol = downRightcol;
         if (issamepiecerow >= 0 && issamepiecerow < 8 && issamepiecercol >= 0 && issamepiecercol < 8){
             issameAttackpiece = isSamePiece(board,issamepiecerow, issamepiecercol, clickedPieceColor);
         }
         break;
       }else if(board[downRightrow][downRightcol] == ''){
         let down_RightAttack = document.querySelector(`.cell[data-row="${downRightrow}"][data-col="${downRightcol}"]`);
         userAttackHighlight(board,down_RightAttack,locationOfPiece,downRightrow,downRightcol,'highlighted',clickedPiece);  
       }
     }
   }
   if (issamepiecerow >= 0 && issamepiecerow < 8 && issamepiecercol >= 0 && issamepiecercol < 8){
     if(attackpiecefound && !issameAttackpiece){
       let down_RightAttack = document.querySelector(`.cell[data-row="${issamepiecerow}"][data-col="${issamepiecercol}"]`);
       userAttackHighlight(board,down_RightAttack,locationOfPiece,issamepiecerow,issamepiecercol,'AttackHighlight',clickedPiece);
     }
   }
 }
}

/* __________________________________________________This for straight Attack ____________________________________________________ */

/* ********************************************This is  for upAttack cell************************************************* */
export function upAttackfnc(board,locationOfPiece,clickedPieceColor,clickedPiece){
let {row,col} = locationOfPiece;
    if(row != 0){ 
      let issamepiecerow = '';
      let issamepiecercol = '';
      let issameAttackpiece;
      let attackpiecefound = false;
      for(let i = 1; i<=row; i++){
        if(board[row - i][col] !== ''){
          attackpiecefound = true;
          issamepiecerow = row-i;
          issamepiecercol = col;
          issameAttackpiece = isSamePiece(board,issamepiecerow,issamepiecercol,clickedPieceColor);
          break;
        }else if(board[row - i][col] == ''){
          let upAttackRow = row - i;
          let upAttackCol = col; 
          let upAttack = document.querySelector(`.cell[data-row="${upAttackRow}"][data-col="${upAttackCol}"]`);
          userAttackHighlight(board,upAttack,locationOfPiece,upAttackRow,upAttackCol,'highlighted',clickedPiece);
        }
    }
        if(attackpiecefound && !issameAttackpiece){
          let upAttackingCell = document.querySelector(`.cell[data-row="${issamepiecerow}"][data-col="${issamepiecercol}"]`);
          userAttackHighlight(board,upAttackingCell,locationOfPiece,issamepiecerow,issamepiecercol,'AttackHighlight',clickedPiece);
        }
    }
}
/* ********************************************This is  for leftAttack cell************************************************* */
export function leftAttackfnc(board,locationOfPiece,clickedPieceColor,clickedPiece){
let {row,col} = locationOfPiece;
    if(col != 0){
      let issamepiecerow = '';
      let issamepiecercol = '';
      let issameAttackpiece;
      let attackpiecefound = false;
      for(let i = 1; i<=col;i++){
        if(board[row][col - i] !== ''){
          attackpiecefound = true;
          issamepiecerow = row;
          issamepiecercol = col - i;
          issameAttackpiece = isSamePiece(board,issamepiecerow,issamepiecercol,clickedPieceColor);
          break;
        }else if(board[row][col - i] == ''){
          let leftAttackrow = row;
          let leftAttackcol = col - i; 
          let leftAttack = document.querySelector(`.cell[data-row="${leftAttackrow}"][data-col="${leftAttackcol}"]`);
          userAttackHighlight(board,leftAttack,locationOfPiece,leftAttackrow,leftAttackcol,'highlighted',clickedPiece);
        }
      }
      if(attackpiecefound && !issameAttackpiece){
        let leftAttackingCell = document.querySelector(`.cell[data-row="${issamepiecerow}"][data-col="${issamepiecercol}"]`);
        userAttackHighlight(board,leftAttackingCell,locationOfPiece,issamepiecerow,issamepiecercol,'AttackHighlight',clickedPiece);
      }
    }
}
/* ********************************************This is  for downAttack cell************************************************* */
export function downAttackfnc(board,locationOfPiece,clickedPieceColor,clickedPiece){
let {row,col} = locationOfPiece;
    if(row != 7){
     let downrow = 7 - row;
     let issamepiecerow = '';
     let issamepiecercol = '';
     let issameAttackpiece;
     let attackpiecefound = false;
     for(let i = 1; i<= downrow; i++){
       if(board[row + i][col] !== ''){
         attackpiecefound = true;
         issamepiecerow = row + i;
         issamepiecercol = col;
         issameAttackpiece = isSamePiece(board,issamepiecerow,issamepiecercol,clickedPieceColor);
         break;
       }else if(board[row + i][col] == ''){
           let downAttackrow = row + i;
           let downAttackcol = col; 
           let downAttack = document.querySelector(`.cell[data-row="${downAttackrow}"][data-col="${downAttackcol}"]`);
           userAttackHighlight(board,downAttack,locationOfPiece,downAttackrow,downAttackcol,'highlighted',clickedPiece);
       }
     }
     if(attackpiecefound && !issameAttackpiece){
       let downAttackingCell = document.querySelector(`.cell[data-row="${issamepiecerow}"][data-col="${issamepiecercol}"]`);
       userAttackHighlight(board,downAttackingCell,locationOfPiece,issamepiecerow,issamepiecercol,'AttackHighlight',clickedPiece);
     }
   }
}
/* ********************************************This is  for rightAttack cell************************************************* */
export function rightAttackfnc(board,locationOfPiece,clickedPieceColor,clickedPiece){
let {row,col} = locationOfPiece;
    if(col != 7){
     let rightcol = 7 - col;
     let issamepiecerow = '';
     let issamepiecercol = '';
     let issameAttackpiece;
     let attackpiecefound = false;
     for(let i = 1; i<= rightcol; i++){
       if(board[row][col + i] !== ''){
         attackpiecefound = true;
         issamepiecerow = row;
         issamepiecercol = col + i;
         issameAttackpiece = isSamePiece(board,issamepiecerow,issamepiecercol,clickedPieceColor);
         break;
       }else if(board[row][col + i] == ''){
           let rightAttackrow = row;
           let rightAttackcol = col + i; 
           let rightAttack = document.querySelector(`.cell[data-row="${rightAttackrow}"][data-col="${rightAttackcol}"]`);
           userAttackHighlight(board,rightAttack,locationOfPiece,rightAttackrow,rightAttackcol,'highlighted',clickedPiece);
       }
     }
       if(attackpiecefound && !issameAttackpiece){
       let rightAttackingCell = document.querySelector(`.cell[data-row="${issamepiecerow}"][data-col="${issamepiecercol}"]`);
       userAttackHighlight(board,rightAttackingCell,locationOfPiece,issamepiecerow,issamepiecercol,'AttackHighlight',clickedPiece);
     }
    }
}