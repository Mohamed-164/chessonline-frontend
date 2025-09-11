
export function isPiecePinned(board,clickedPiece,locationOfPiece){
let pawnUpMove_Unavailable = false;
let pawnDownMove_Unavailable = false;
let BishoporQueenUpLeftAttack = false;
let BishoporQueenUpRightAttack = false;
let BishoporQueenDownLeftAttack = false;
let BishoporQueenDownRightAttack = false;
let RookorQueenUpAttack = false;
let RookorQueenDownAttack = false;
let RookorQueenLeftAttack = false;
let RookorQueenRightAttack = false;
let pawnleftmoveAvailable = false;
let pawnrightmoveAvailable = false;
let isKingInThread = false;


  function isSamePiece(Row, Col, clickedPieceColor) {
  let piece = board[Row][Col];
  if (piece === '') return false; // early return if cell is empty

  let pieceColor = piece === piece.toUpperCase() ? "white" : "black";
  return clickedPieceColor === pieceColor;
}
/*_____________________________________ pawn protection from rook and queen ______________________________________________*/
    let {row,col} = locationOfPiece;
    let clickedPieceColor = clickedPiece === clickedPiece.toUpperCase() ? "white" : "black";
/*------------------------------------------- Straight Attack Defense Started Here-----------------------------------------------*/

let otherstraight = ['P','p','N','n','b','B'];
let otherdiagonal = ['P','p','N','n','r','R']

upProtection();
downProtection();
leftProtection();
rightProtection();
upleftProtection();
uprightProtection();
downleftProtection();
downrightProtection();

/* **************************** This protection is for Up Column Attack ************************************ */
function upProtection(){
  if(row != 0){ 
    let downrow = 7 - row;
    let issamepiecerow = '';
    let issamepiecercol = '';
    let issameAttackpiece;
    let issameKingColor;
    for(let i = 1; i<= downrow; i++){
    let ispieceinpath = board[row + i][col];
    if(ispieceinpath !== ''){
      if(board[row + i][col] == 'K' || board[row + i][col] == 'k'){  
          let theKingrow = row + i;
          let theKingcol = col;
          issameKingColor = isSamePiece(theKingrow,theKingcol,clickedPieceColor)
          for(let i = 1; i<=row; i++){
            if(otherstraight.includes(board[row - i][col])){
              break;
            }else if(board[row - i][col] == 'R' || board[row - i][col] == 'r'){
              issamepiecerow = row-i;
              issamepiecercol = col;
              issameAttackpiece = isSamePiece(issamepiecerow,issamepiecercol,clickedPieceColor);
              if(!issameAttackpiece && issameKingColor){
                RookorQueenUpAttack = true;
                isKingInThread = true;
              }
              break;
            }else if(board[row - i][col] == 'Q' || board[row - i][col] == 'q'){
              issamepiecerow = row - i;
              issamepiecercol = col;
              issameAttackpiece = isSamePiece(issamepiecerow,issamepiecercol,clickedPieceColor);
              if(!issameAttackpiece && issameKingColor){
                RookorQueenUpAttack = true;
                isKingInThread = true;
              }
              break;
            }
          }
        break;
        }else{
          break;
        }
    }
    }
  }
}
  /* **************************** This protection is for Down Column Attack **************************** */
function downProtection(){
  if(row != 7){
      let downrow = 7 - row;
      let issamepiecerow = '';
      let issamepiecercol = '';
      let issameAttackpiece;
      let issameKingColor;
      for(let i = 1; i<=row; i++){
        let ispieceinpath = board[row - i][col];
        if(ispieceinpath !== ''){
          if(board[row - i][col] == 'K' || board[row - i][col] == 'k'){   
            let theKingrow = row - i;
            let theKingcol = col;
            issameKingColor = isSamePiece(theKingrow,theKingcol,clickedPieceColor)
            for(let i = 1; i<=downrow; i++){
              if(otherstraight.includes(board[row + i][col])){
                break;
              }else if(board[row + i][col] == 'R' || board[row + i][col] == 'r'){
                issamepiecerow = row+i;
                issamepiecercol = col;
                issameAttackpiece = isSamePiece(issamepiecerow,issamepiecercol,clickedPieceColor);
                if(!issameAttackpiece && issameKingColor){
                  RookorQueenDownAttack = true;
                  isKingInThread = true;
                }
                break;
              }else if(board[row + i][col] == 'Q' || board[row + i][col] == 'q'){
                issamepiecerow = row + i;
                issamepiecercol = col;
                issameAttackpiece = isSamePiece(issamepiecerow,issamepiecercol,clickedPieceColor);
                if(!issameAttackpiece && issameKingColor){
                  RookorQueenDownAttack = true;
                  isKingInThread = true;
                }
                break;
              }
            }
          break;
          }else{
            break;
          }
        }
      }
  }
}
 /* *************************** This protection is for Left Row Attack ************************** */
 function leftProtection(){
   if(col != 0){
       let rightcol = 7 - col;
       let issamepiecerow = '';
       let issamepiecercol = '';
       let issameAttackpiece;
       let issameKingColor;
       for(let i = 1; i<=rightcol;i++){
        let ispieceinpath = board[row][col + i];
        if(ispieceinpath !== ''){
          if(board[row][col + i] == 'K' || board[row][col + i] == 'k'){
            let theKingrow = row;
            let theKingcol = col + i;
            issameKingColor = isSamePiece(theKingrow,theKingcol,clickedPieceColor)
            for(let i = 1; i<=col; i++){
              if(otherstraight.includes(board[row][col - i])){
                break;
              }else if(board[row][col - i] == 'R' || board[row][col - i] == 'r'){
                issamepiecerow = row;
                issamepiecercol = col - i;
                issameAttackpiece = isSamePiece(issamepiecerow,issamepiecercol,clickedPieceColor);
                if(!issameAttackpiece && issameKingColor){
                  pawnUpMove_Unavailable = true;
                  pawnDownMove_Unavailable = true;
                  RookorQueenLeftAttack = true;
                  isKingInThread = true;
                }
                break;
              }else if(board[row][col - i] == 'Q' || board[row][col - i] == 'q'){
                issamepiecerow = row;
                issamepiecercol = col - i;
                issameAttackpiece = isSamePiece(issamepiecerow,issamepiecercol,clickedPieceColor);
                if(!issameAttackpiece && issameKingColor){
                  pawnUpMove_Unavailable = true;
                  pawnDownMove_Unavailable = true;
                  RookorQueenLeftAttack = true;
                  isKingInThread = true;
                }
                break;
              }
            }
          break;
          }else{
            break;
          }
        }
       }
     }
 }
 /* *************************** This protection is for Right Row Attack ************************** */
 function rightProtection(){
   if(col != 7){
    let rightcol = 7 - col;
    let issamepiecerow = '';
    let issamepiecercol = '';
    let issameAttackpiece;
    let issameKingColor;
    for(let i = 1; i<=col;i++){
      let ispieceinpath = board[row][col - i];
      if(ispieceinpath !== ''){
        if(board[row][col - i] == 'K' || board[row][col - i] == 'k'){
          let theKingrow = row;
          let theKingcol = col - i;
          issameKingColor = isSamePiece(theKingrow,theKingcol,clickedPieceColor)
          for(let i = 1; i<=rightcol; i++){
            if(otherstraight.includes(board[row][col + i])){
              break;
            }else if(board[row][col + i] == 'R' || board[row][col + i] == 'r'){
              issamepiecerow = row;
              issamepiecercol = col + i;
              issameAttackpiece = isSamePiece(issamepiecerow,issamepiecercol,clickedPieceColor);
              if(!issameAttackpiece && issameKingColor){
                pawnUpMove_Unavailable = true;
                pawnDownMove_Unavailable = true;
                RookorQueenRightAttack = true;
                isKingInThread = true;
              }
              break;
            }else if(board[row][col + i] == 'Q' || board[row][col + i] == 'q'){
              issamepiecerow = row;
              issamepiecercol = col + i;
              issameAttackpiece = isSamePiece(issamepiecerow,issamepiecercol,clickedPieceColor);
              if(!issameAttackpiece && issameKingColor){
                pawnUpMove_Unavailable = true;
                pawnDownMove_Unavailable = true;
                RookorQueenRightAttack = true;
                isKingInThread = true;
              }
              break;
            }
          }
        break;
        }else{
          break;
        }
      }
    }
  }
 }

/* ------------------------------------------- Straight Attack Protection Finished ---------------------------------------   */

/* ------------------------------------------- Diagonal Attack Defense Started here ---------------------------------------- */

/* ************************************* This protection is  for upleft ************************************ */
function upleftProtection(){
  if(col != 0 && row != 0 && col != 7 && row != 7){
    let issamepiecerow = '';
    let issamepiecercol = '';
    let issameKingColor;
    let issameAttackpiece;
   for(let i=1; i<8; i++){
       let downRightrow = row + i;
       let downRightcol =col + i;
       if((downRightrow >= 0 && downRightrow < 8) && (downRightcol >=0 && downRightcol < 8)){
        let ispieceinpath = board[downRightrow][downRightcol];
        if(ispieceinpath !== ''){
          if(board[downRightrow][downRightcol] == 'K' || board[downRightrow][downRightcol] == 'k'){
            let theKingrow = downRightrow;
            let theKingcol = downRightcol;
            if (theKingrow >= 0 && theKingrow < 8 && theKingcol >= 0 && theKingcol < 8){
              issameKingColor = isSamePiece(theKingrow, theKingcol, clickedPieceColor);
            }
            for(let i=1; i<8; i++){
              let upLeftrow = row - i;
              let upLeftcol = col - i;
              if((upLeftrow >= 0 && upLeftrow < 8) && (upLeftcol >=0 && upLeftcol < 8)){
                if(otherdiagonal.includes(board[upLeftrow][upLeftcol])){
                  break;
                }else if(board[upLeftrow][upLeftcol] == 'B' || board[upLeftrow][upLeftcol] == 'b'){
                  issamepiecerow = upLeftrow;
                  issamepiecercol = upLeftcol;
                  if (issamepiecerow >= 0 && issamepiecerow < 8 && issamepiecercol >= 0 && issamepiecercol < 8){
                    issameAttackpiece = isSamePiece(issamepiecerow, issamepiecercol, clickedPieceColor);
                  }
                  if(!issameAttackpiece && issameKingColor){
                    pawnDownMove_Unavailable = true;
                    pawnUpMove_Unavailable = true;
                    BishoporQueenUpLeftAttack = true;
                    isKingInThread = true;
                    if(board[row][col] == 'P'){
                      if(board[row - 1][col - 1] == board[upLeftrow][upLeftcol]){
                        pawnleftmoveAvailable = true;
                      }
                    }
                  }
                  break;
                }else if(board[upLeftrow][upLeftcol] == 'Q' || board[upLeftrow][upLeftcol] == 'q'){
                  issamepiecerow = upLeftrow;
                  issamepiecercol = upLeftcol;
                  if (issamepiecerow >= 0 && issamepiecerow < 8 && issamepiecercol >= 0 && issamepiecercol < 8){
                    issameAttackpiece = isSamePiece(issamepiecerow, issamepiecercol, clickedPieceColor);
                  }
                  if(!issameAttackpiece && issameKingColor){
                    BishoporQueenUpLeftAttack = true;
                    pawnDownMove_Unavailable = true;
                    pawnUpMove_Unavailable = true;
                    isKingInThread = true;
                    if(board[row][col] == 'P'){
                      if(board[row - 1][col - 1] == board[upLeftrow][upLeftcol]){
                        pawnleftmoveAvailable = true;
                      }
                    }
                  }
                  break;
                }
              }
            }
          }else{
            break;
          }
        }
        }
       }
   }
}
/* ************************************* This protection is  for downRight ************************************ */
function downrightProtection(){
  if(col != 0 && row != 0 && col != 7 && row != 7){
    let issamepiecerow = '';
    let issamepiecercol = '';
    let issameKingColor;
    let issameAttackpiece;
   for(let i=1; i<8; i++){
       let upLeftrow = row - i;
       let upLeftcol =col - i;
       if((upLeftrow >= 0 && upLeftrow < 8) && (upLeftcol >=0 && upLeftcol < 8)){
        let ispieceinpath = board[upLeftrow][upLeftcol];
        if(ispieceinpath !== ''){
          if(board[upLeftrow][upLeftcol] == 'K' || board[upLeftrow][upLeftcol] == 'k'){
            let theKingrow = upLeftrow;
            let theKingcol = upLeftcol;
            if (theKingrow >= 0 && theKingrow < 8 && theKingcol >= 0 && theKingcol < 8){
              issameKingColor = isSamePiece(theKingrow, theKingcol, clickedPieceColor);
            }
            for(let i=1; i<8; i++){
              let downRightrow = row + i;
              let downRightcol = col + i;
              if((downRightrow >= 0 && downRightrow < 8) && (downRightcol >=0 && downRightcol < 8)){
                if(otherdiagonal.includes(board[downRightrow][downRightcol])){
                  break;
                }else
                if(board[downRightrow][downRightcol] == 'B' || board[downRightrow][downRightcol] == 'b'){
                  issamepiecerow = downRightrow;
                  issamepiecercol = downRightcol;
                  if (issamepiecerow >= 0 && issamepiecerow < 8 && issamepiecercol >= 0 && issamepiecercol < 8){
                    issameAttackpiece = isSamePiece(issamepiecerow, issamepiecercol, clickedPieceColor);
                   }
                   if(!issameAttackpiece && issameKingColor){
                     pawnDownMove_Unavailable = true;
                     pawnUpMove_Unavailable = true;
                     BishoporQueenDownRightAttack = true;
                     isKingInThread = true;
                     if(board[row][col] == 'p'){
                      if(board[row + 1][col + 1] == board[downRightrow][downRightcol]){
                        pawnrightmoveAvailable = true;
                      }
                     }
                   }
                   break;
                 }else if(board[downRightrow][downRightcol] == 'Q' || board[downRightrow][downRightcol] == 'q'){
                   issamepiecerow = downRightrow;
                   issamepiecercol = downRightcol;
                   if (issamepiecerow >= 0 && issamepiecerow < 8 && issamepiecercol >= 0 && issamepiecercol < 8){
                     issameAttackpiece = isSamePiece(issamepiecerow, issamepiecercol, clickedPieceColor);
                   }
                   if(!issameAttackpiece && issameKingColor){
                     pawnDownMove_Unavailable = true;
                     pawnUpMove_Unavailable = true;
                     BishoporQueenDownRightAttack = true;
                     isKingInThread = true;
                     if(board[row][col] == 'p'){
                      if(board[row + 1][col + 1] == board[downRightrow][downRightcol]){
                        pawnrightmoveAvailable = true;
                      }
                     }
                   }
                   break;
                 }
               }
             }
          }else{
            break;
          }
        }
        }
       }
   }
}
/* ************************************* This protection is  for UpRight ************************************ */
function uprightProtection(){
  if(col != 0 && row != 0 && col != 7 && row != 7){
    let issamepiecerow = '';
    let issamepiecercol = '';
    let issameKingColor;
    let issameAttackpiece;
   for(let i=1; i<8; i++){
       let downLeftrow = row + i;
       let downLeftcol =col - i;
       if((downLeftrow >= 0 && downLeftrow < 8) && (downLeftcol >=0 && downLeftcol < 8)){
        let ispieceinpath = board[downLeftrow][downLeftcol];
        if(ispieceinpath !== ''){
          if(board[downLeftrow][downLeftcol] == 'K' || board[downLeftrow][downLeftcol] == 'k'){
            let theKingrow = downLeftrow;
            let theKingcol = downLeftcol;
            if (theKingrow >= 0 && theKingrow < 8 && theKingcol >= 0 && theKingcol < 8){
              issameKingColor = isSamePiece(theKingrow, theKingcol, clickedPieceColor);
            }
            for(let i=1; i<8; i++){
              let upRightrow = row - i;
              let upRightcol = col + i;
              if((upRightrow >= 0 && upRightrow < 8) && (upRightcol >=0 && upRightcol < 8)){
                if(otherdiagonal.includes(board[upRightrow][upRightcol])){
                  break;
                }else
                if(board[upRightrow][upRightcol] == 'B' || board[upRightrow][upRightcol] == 'b'){
                  issamepiecerow = upRightrow;
                  issamepiecercol = upRightcol;
                  if (issamepiecerow >= 0 && issamepiecerow < 8 && issamepiecercol >= 0 && issamepiecercol < 8){
                    issameAttackpiece = isSamePiece(issamepiecerow, issamepiecercol, clickedPieceColor);
                   }
                   if(!issameAttackpiece && issameKingColor){
                     pawnDownMove_Unavailable = true;
                     pawnUpMove_Unavailable = true;
                     BishoporQueenUpRightAttack = true;
                     isKingInThread = true;
                     if(board[row][col] == 'P'){
                      if(board[row - 1][col + 1] == board[upRightrow][upRightcol]){
                        pawnrightmoveAvailable = true;
                      }
                     }
                   }
                   break;
                 }else if(board[upRightrow][upRightcol] == 'Q' || board[upRightrow][upRightcol] == 'q'){
                   issamepiecerow = upRightrow;
                   issamepiecercol = upRightcol;
                   if (issamepiecerow >= 0 && issamepiecerow < 8 && issamepiecercol >= 0 && issamepiecercol < 8){
                     issameAttackpiece = isSamePiece(issamepiecerow, issamepiecercol, clickedPieceColor);
                   }
                   if(!issameAttackpiece && issameKingColor){
                     pawnDownMove_Unavailable = true;
                     pawnUpMove_Unavailable = true;
                     BishoporQueenUpRightAttack = true;
                     isKingInThread = true;
                     if(board[row][col] == 'P'){
                      if(board[row - 1][col + 1] == board[upRightrow][upRightcol]){
                        pawnrightmoveAvailable = true;
                      }
                     }
                   }
                   break;
                 }
               }
             }
          }else{
            break;
          }
         }
        }
       }
   }
}
  /* ************************************* This protection is  for Downleft ************************************ */
  function downleftProtection(){
    if(col != 0 && row != 0 && col != 7 && row != 7){
      let issamepiecerow = '';
      let issamepiecercol = '';
      let issameKingColor;
      let issameAttackpiece;
     for(let i=1; i<8; i++){
         let upRightrow = row - i;
         let upRightcol =col + i;
         if((upRightrow >= 0 && upRightrow < 8) && (upRightcol >=0 && upRightcol < 8)){
          let ispieceinpath = board[upRightrow][upRightcol];
          if(ispieceinpath !== ''){
            if(board[upRightrow][upRightcol] == 'K' || board[upRightrow][upRightcol] == 'k'){
              let theKingrow = upRightrow;
              let theKingcol = upRightcol;
              if (theKingrow >= 0 && theKingrow < 8 && theKingcol >= 0 && theKingcol < 8){
                issameKingColor = isSamePiece(theKingrow, theKingcol, clickedPieceColor);
              }
              for(let i=1; i<8; i++){
                let downLeftrow = row + i;
                let downLeftcol = col - i;
                if((downLeftrow >= 0 && downLeftrow < 8) && (downLeftcol >=0 && downLeftcol < 8)){
                if(otherdiagonal.includes(board[downLeftrow][downLeftcol])){
                  break;
                }else
                if(board[downLeftrow][downLeftcol] == 'B' || board[downLeftrow][downLeftcol] == 'b'){
                    issamepiecerow = downLeftrow;
                    issamepiecercol = downLeftcol;
                    if (issamepiecerow >= 0 && issamepiecerow < 8 && issamepiecercol >= 0 && issamepiecercol < 8){
                      issameAttackpiece = isSamePiece(issamepiecerow, issamepiecercol, clickedPieceColor);
                     }
                     if(!issameAttackpiece && issameKingColor){
                       pawnDownMove_Unavailable = true;
                       pawnUpMove_Unavailable = true;
                       BishoporQueenDownLeftAttack = true;
                       isKingInThread = true;
                     if(board[row][col] == 'p'){
                      if(board[row + 1][col - 1] == board[downLeftrow][downLeftcol]){
                        pawnleftmoveAvailable = true;
                      }
                     }
                     }
                     break;
                   }else if(board[downLeftrow][downLeftcol] == 'Q' || board[downLeftrow][downLeftcol] == 'q'){
                     issamepiecerow = downLeftrow;
                     issamepiecercol = downLeftcol;
                     if (issamepiecerow >= 0 && issamepiecerow < 8 && issamepiecercol >= 0 && issamepiecercol < 8){
                       issameAttackpiece = isSamePiece(issamepiecerow, issamepiecercol, clickedPieceColor);
                     }
                     if(!issameAttackpiece && issameKingColor){
                       pawnDownMove_Unavailable = true;
                       pawnUpMove_Unavailable = true;
                       BishoporQueenDownLeftAttack = true;
                       isKingInThread = true;
                     if(board[row][col] == 'p'){
                      if(board[row + 1][col - 1] == board[downLeftrow][downLeftcol]){
                        pawnleftmoveAvailable = true;
                      }
                     }
                     }
                     break;
                   }
                 }
               }
            }else{
              break;
            }
           }
         }
        }
     }
  }

    return {isKingInThread,
    ...((clickedPiece === 'P' || clickedPiece === 'p') && {
      pawnUpMove_Unavailable,
      pawnDownMove_Unavailable,
      pawnleftmoveAvailable,
      pawnrightmoveAvailable
    }),
    ...((clickedPiece ==='B' || clickedPiece === 'b') && {
      BishoporQueenUpLeftAttack,
      BishoporQueenDownLeftAttack,
      BishoporQueenUpRightAttack,
      BishoporQueenDownRightAttack
    }),
    ...((clickedPiece === 'R' || clickedPiece === 'r') && {
      RookorQueenUpAttack,
      RookorQueenDownAttack,
      RookorQueenLeftAttack,
      RookorQueenRightAttack
    }),
    ...((clickedPiece === 'Q' || clickedPiece === 'q') && {
      RookorQueenUpAttack,
      RookorQueenDownAttack,
      RookorQueenLeftAttack,
      RookorQueenRightAttack,
      BishoporQueenUpLeftAttack,
      BishoporQueenUpRightAttack,
      BishoporQueenDownLeftAttack,
      BishoporQueenDownRightAttack
    }),
    };

}