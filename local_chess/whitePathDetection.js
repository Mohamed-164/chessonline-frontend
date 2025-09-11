import { board } from "./boarddata.js";
import { iskinginCheck } from "./checkDetection.js";
import { blackKinglocation } from "./blackPathDetection.js";
let clickedPieceColor = "white";

function isSamePiece(board,Row, Col, clickedPieceColor) {
  let piece = board[Row][Col];
  if (piece === '') return false; // early return if cell is empty

  let pieceColor = piece === piece.toUpperCase() ? "white" : "black";
  return clickedPieceColor !== pieceColor;
}
export function whiteKinglocation(){
  
  let white_KingLoaction = [];
  for(let kingrow = 0; kingrow<8; kingrow++){
    for(let kingcol = 0;kingcol<8; kingcol++){
      if(board[kingrow][kingcol] == 'K'){
        let position = [kingrow,kingcol];
        white_KingLoaction.push(position);
      }
    }
  }

let whiteKingup_left = [];
let whiteKingup_center = [];
let whiteKingup_right = [];
let whiteKing_left = [];
let whiteKing_right = [];
let whiteKingDown_left = [];
let whiteKingDown_center = [];
let whiteKingDown_right = [];

  for(let i = 0; i<white_KingLoaction.length; i++){
    let [kingrow,kingcol] = white_KingLoaction[i];
      let up_leftrow = kingrow - 1;
      let up_leftcol = kingcol - 1;
      let up_centerrow = kingrow - 1;
      let up_centercol = kingcol;
      let up_rightrow = kingrow - 1;
      let up_rightcol = kingcol + 1;
      let leftrow = kingrow;
      let leftcol = kingcol - 1; 
      let rightrow = kingrow;
      let rightcol = kingcol + 1;
      let down_leftrow = kingrow + 1;
      let down_leftcol = kingcol - 1;
      let down_centerrow = kingrow + 1;
      let down_centercol = kingcol;
      let down_rightrow = kingrow + 1;
      let down_rightcol = kingcol + 1;
      
      let whitekingupleft = [kingrow,kingcol,up_leftrow,up_leftcol];
      let whitekingupcenter = [kingrow,kingcol,up_centerrow,up_centercol];
      let whitekingupright = [kingrow,kingcol,up_rightrow,up_rightcol];
      let whitekingleft = [kingrow,kingcol,leftrow,leftcol];
      let whitekingright = [kingrow,kingcol,rightrow,rightcol];
      let whitekingdownleft = [kingrow,kingcol,down_leftrow,down_leftcol];
      let whitekingdowncenter = [kingrow,kingcol,down_centerrow,down_centercol];
      let whitekingdownright = [kingrow,kingcol,down_rightrow,down_rightcol];

      if(up_leftrow >= 0 && up_leftrow < 8 && up_leftcol >= 0 && up_leftcol < 8){
        whiteKingup_left.push(whitekingupleft);
      }
      if(up_centerrow >= 0 && up_centerrow <8 && up_centercol >= 0 && up_centercol < 8){
        whiteKingup_center.push(whitekingupcenter);
      }
      if(up_rightrow >= 0 && up_rightrow < 8 && up_rightcol >= 0 && up_rightcol < 8){
        whiteKingup_right.push(whitekingupright);
      }
      if(leftrow >= 0 && leftrow < 8 && leftcol >= 0 && leftcol < 8){
        whiteKing_left.push(whitekingleft)
      }
      if(rightrow >= 0 && rightrow < 8 && rightcol >= 0 && rightcol < 8){
        whiteKing_right.push(whitekingright);
      }
      if(down_leftrow >= 0 && down_leftrow < 8 && down_leftcol >= 0 && down_leftcol < 8){
        whiteKingDown_left.push(whitekingdownleft);
      }
      if(down_centerrow >= 0 && down_centerrow < 8 && down_centercol >=0 && down_centercol < 8){
        whiteKingDown_center.push(whitekingdowncenter);
      }
      if(down_rightrow >= 0 && down_rightrow < 8 && down_rightcol >= 0 && down_rightcol < 8){
        whiteKingDown_right.push(whitekingdownright);
      }
  }
  return {
    white_KingLoaction,
    whiteKingup_left,
    whiteKingup_center,
    whiteKingup_right,
    whiteKing_left,
    whiteKing_right,
    whiteKingDown_left,
    whiteKingDown_center,
    whiteKingDown_right
  }
}
/* ---------------------------------------- knight thread ------------------------------------------------ */
export function blackKnightloaction(){

  let black_Knightloaction = [];

  for(let Knightrow = 0; Knightrow< 8; Knightrow++){
      for(let knightcol = 0; knightcol<8; knightcol++){
        if(board[Knightrow][knightcol] == 'n'){
          let position = [Knightrow,knightcol];
          black_Knightloaction.push(position);
        }
      }

  }
  let black_KnightUP_left = [];
  let black_KnightUp_right = [];
  let black_Knightdown_left = [];
  let black_Knightdown_right = [];
  let black_Knightright_up = [];
  let black_Knightright_down = [];
  let black_Knightleft_up = [];
  let black_Knightleft_down = [];

    for(let Knight = 0; Knight<black_Knightloaction.length; Knight++){

        let[blackKnightrow,blackKnightcol] = black_Knightloaction[Knight];
        let up_LeftAttackRow = blackKnightrow - 2;
        let up_LeftAttackCol = blackKnightcol - 1;
        let up_RightAttackRow = blackKnightrow - 2;
        let up_RightAttackCol = blackKnightcol + 1;
        let down_LeftAttackRow = blackKnightrow + 2;
        let down_LeftAttackCol = blackKnightcol - 1;
        let down_RightAttackRow = blackKnightrow + 2;
        let down_RightAttackCol = blackKnightcol + 1;
        let right_UpAttackRow = blackKnightrow - 1;
        let right_UpAttackCol = blackKnightcol + 2;
        let right_DownAttackRow = blackKnightrow + 1;
        let right_DownAttackCol = blackKnightcol + 2;
        let left_UpAttackRow = blackKnightrow - 1;
        let left_UpAttackCol = blackKnightcol - 2;
        let left_DownAttackRow = blackKnightrow + 1;
        let left_DownAttackCol = blackKnightcol - 2;

      let up_left = [blackKnightrow,blackKnightcol,up_LeftAttackRow,up_LeftAttackCol];
      let up_right = [blackKnightrow,blackKnightcol,up_RightAttackRow,up_RightAttackCol];
      let down_left = [blackKnightrow,blackKnightcol,down_LeftAttackRow,down_LeftAttackCol];
      let down_right = [blackKnightrow,blackKnightcol,down_RightAttackRow,down_RightAttackCol];
      let right_up = [blackKnightrow,blackKnightcol,right_UpAttackRow,right_UpAttackCol];
      let right_down = [blackKnightrow,blackKnightcol,right_DownAttackRow,right_DownAttackCol];
      let left_up = [blackKnightrow,blackKnightcol,left_UpAttackRow,left_UpAttackCol];
      let left_down = [blackKnightrow,blackKnightcol,left_DownAttackRow,left_DownAttackCol];

      if(up_LeftAttackRow >= 0 && up_LeftAttackRow < 8 && up_LeftAttackCol >= 0 && up_LeftAttackCol <8){
        black_KnightUP_left.push(up_left);
      }
      if(up_RightAttackRow >= 0 && up_RightAttackRow < 8 && up_RightAttackCol >= 0 && up_RightAttackCol < 8){
        black_KnightUp_right.push(up_right);
      }
      if(down_LeftAttackRow >= 0 && down_LeftAttackRow < 8 && down_LeftAttackCol >= 0 && down_LeftAttackCol < 8){
        black_Knightdown_left.push(down_left);
      }
      if(down_RightAttackRow >= 0 && down_RightAttackRow < 8 && down_RightAttackCol >= 0 && down_RightAttackCol < 8){
        black_Knightdown_right.push(down_right);
      }
      if(right_UpAttackRow >= 0 && right_UpAttackRow < 8 && right_UpAttackCol >= 0 && right_UpAttackCol < 8){
        black_Knightright_up.push(right_up);
      }
      if(right_DownAttackRow >= 0 && right_DownAttackRow < 8 && right_DownAttackCol >= 0 && right_DownAttackCol < 8){
        black_Knightright_down.push(right_down);
      }
      if(left_UpAttackRow >= 0 && left_UpAttackRow < 8 && left_UpAttackCol >= 0 && left_UpAttackCol < 8){
        black_Knightleft_up.push(left_up);
      }
      if(left_DownAttackRow >= 0 && left_DownAttackRow < 8 && left_DownAttackCol >= 0 && left_DownAttackCol < 8){
        black_Knightleft_down.push(left_down);
      }
      }
    

    return {
      black_Knightloaction,
      black_KnightUP_left,
      black_KnightUp_right,
      black_Knightdown_left,
      black_Knightdown_right,
      black_Knightright_up,
      black_Knightright_down,
      black_Knightleft_up,
      black_Knightleft_down
    }
}

/* --------------------------------------------- rook in path --------------------------------------------------- */
export function blackrookORqueenlocation(){

  let black_rookORqueenlocation = [];
  let black_rooklocation = [];
  let black_queenlocation = [];
  for(let i = 0; i<8; i++){
    for(let j = 0;j<8;j++){
      if(board[i][j] == 'r'){
        let position = [i,j];
        black_rooklocation.push(position);
      }else if(board[i][j] == 'q'){
        let position = [i,j];
        black_queenlocation.push(position);        
      }
      if(board[i][j] == 'r' || board[i][j] == 'q'){
        let position = [i,j];
        black_rookORqueenlocation.push(position);
      }
    }
  }

  let black_rookQueenup = [];
  let black_rookQueendown = [];
  let black_rookQueenleft = [];
  let black_rookQueenright = [];
  for(let location = 0; location<black_rookORqueenlocation.length;location++){
   let [rORqRow,rORqCol] = black_rookORqueenlocation[location];
/*    ************************************ up ************************************** */
   if(rORqRow != 0){
      let issamepiecerow = '';
      let issamepiecercol = '';
      let issameProtectionpiece;
      let protectionpiecefound = false;
      for(let i = 1;i<=rORqRow; i++){
        if(board[rORqRow - i][rORqCol] !== ''){
          let up = board[rORqRow - i][rORqCol];
          let white = up === up.toUpperCase()?true:false;
          if(white){
          let upAttackRow = rORqRow - i;
          let upAttackCol = rORqCol; 
          let position = [rORqRow,rORqCol,upAttackRow,upAttackCol];
          black_rookQueenup.push(position);
          }
          protectionpiecefound = true;
          issamepiecerow = rORqRow-i;
          issamepiecercol = rORqCol;
          issameProtectionpiece = isSamePiece(board,issamepiecerow,issamepiecercol,clickedPieceColor);
          break;
        }else if(board[rORqRow - i][rORqCol] == ''){
          let upAttackRow = rORqRow - i;
          let upAttackCol = rORqCol; 
          let position = [rORqRow,rORqCol,upAttackRow,upAttackCol];
          black_rookQueenup.push(position);
        }
      }
      if(protectionpiecefound && issameProtectionpiece){
        let position = [rORqRow,rORqCol,issamepiecerow,issamepiecercol];
        black_rookQueenup.push(position);
      }
   }
/*    ************************************ down ************************************** */
   if(rORqRow != 7){
    let downrow = 7 - rORqRow;
      let issamepiecerow = '';
      let issamepiecercol = '';
      let issameProtectionpiece;
      let protectionpiecefound = false;
      for(let i = 1;i<=downrow; i++){
        if(board[rORqRow + i][rORqCol] !== ''){
          let down = board[rORqRow + i][rORqCol];
          let white = down === down.toUpperCase()?true:false;
          if(white){
          let upAttackRow = rORqRow + i;
          let upAttackCol = rORqCol; 
          let position = [rORqRow,rORqCol,upAttackRow,upAttackCol];
            black_rookQueendown.push(position);
          }
          protectionpiecefound = true;
          issamepiecerow = rORqRow+i;
          issamepiecercol = rORqCol;
          issameProtectionpiece = isSamePiece(board,issamepiecerow,issamepiecercol,clickedPieceColor);
          break;
        }else if(board[rORqRow + i][rORqCol] == ''){
          let upAttackRow = rORqRow + i;
          let upAttackCol = rORqCol; 
          let position = [rORqRow,rORqCol,upAttackRow,upAttackCol];
          black_rookQueendown.push(position);
        }
      }
      if(protectionpiecefound && issameProtectionpiece){
        let position = [rORqRow,rORqCol,issamepiecerow,issamepiecercol];
        black_rookQueendown.push(position);
      }
   }
/*    ************************************ left ************************************** */
  if(rORqCol != 0){
      let issamepiecerow = '';
      let issamepiecercol = '';
      let issameProtectionpiece;
      let protectionpiecefound = false;
      for(let i = 1;i<=rORqCol; i++){
        if(board[rORqRow][rORqCol - i] !== ''){
          let left = board[rORqRow][rORqCol - i];
          let white = left === left.toUpperCase()?true:false;
          if(white){
          let upAttackRow = rORqRow;
          let upAttackCol = rORqCol - i; 
          let position = [rORqRow,rORqCol,upAttackRow,upAttackCol];
          black_rookQueenleft.push(position);
          }
          protectionpiecefound = true;
          issamepiecerow = rORqRow;
          issamepiecercol = rORqCol - i;
          issameProtectionpiece = isSamePiece(board,issamepiecerow,issamepiecercol,clickedPieceColor);
          break;
        }else if(board[rORqRow][rORqCol - i] == ''){
          let upAttackRow = rORqRow;
          let upAttackCol = rORqCol - i; 
          let position = [rORqRow,rORqCol,upAttackRow,upAttackCol];
          black_rookQueenleft.push(position);
        }
      }
      if(protectionpiecefound && issameProtectionpiece){
        let position = [rORqRow,rORqCol,issamepiecerow,issamepiecercol];
        black_rookQueenleft.push(position);
      }
  }
/*    ************************************ right ************************************** */
  if(rORqCol != 7){
    let rightcol = 7 - rORqCol;
      let issamepiecerow = '';
      let issamepiecercol = '';
      let issameProtectionpiece;
      let protectionpiecefound = false;
      for(let i = 1;i<=rightcol; i++){
        if(board[rORqRow][rORqCol + i] !== ''){
          let right = board[rORqRow][rORqCol + i];
          let white = right === right.toUpperCase()?true:false;
          if(white){
          let upAttackRow = rORqRow;
          let upAttackCol = rORqCol + i; 
          let position = [rORqRow,rORqCol,upAttackRow,upAttackCol];
          black_rookQueenright.push(position);
          }
          protectionpiecefound = true;
          issamepiecerow = rORqRow;
          issamepiecercol = rORqCol + i;
          issameProtectionpiece = isSamePiece(board,issamepiecerow,issamepiecercol,clickedPieceColor);
          break;
        }else if(board[rORqRow][rORqCol + i] == ''){
          let upAttackRow = rORqRow;
          let upAttackCol = rORqCol + i; 
          let position = [rORqRow,rORqCol,upAttackRow,upAttackCol];
          black_rookQueenright.push(position);
        }
      }
      if(protectionpiecefound && issameProtectionpiece){
        let position = [rORqRow,rORqCol,issamepiecerow,issamepiecercol];
        black_rookQueenright.push(position);
      }
  }
  }
  return {
    black_rookQueenup,
    black_rookQueendown,
    black_rookQueenleft,
    black_rookQueenright,
    black_rooklocation,
    black_queenlocation
  }
}

export function blackBishopORqueenlocation(){

 let black_bishopORqueenlocation = [];
 let black_bishoplocation = [];
 for(let i=0; i<8; i++){
  for(let j=0; j<8; j++){
    if(board[i][j] == 'b'){
      let position = [i,j];
      black_bishoplocation.push(position);
    }
    if(board[i][j] == 'b' || board[i][j] == 'q'){
      let position = [i,j];
      black_bishopORqueenlocation.push(position);
    }
  }
 }
 let black_bishopQueenupleft = [];
 let black_bishopQueenupright = [];
 let black_bishopQueendownleft = [];
 let black_bishopQueendownright = [];

 for(let loc = 0; loc <black_bishopORqueenlocation.length;loc++){
  let [bORqROw,bORqCol] = black_bishopORqueenlocation[loc];
/*    ******************************************* up left ******************************************** */
  if(bORqROw != 0 && bORqCol != 0){
    let issamepiecerow = '';
    let issamepiecercol = '';
    let issameprotectionpiece;
    let Protectionpiecefound = false;
    for(let i=1; i<8; i++){
       let upLeftrow = bORqROw - i;
       let upLeftcol =bORqCol - i;
       if((upLeftrow >= 0 && upLeftrow < 8) && (upLeftcol >=0 && upLeftcol < 8)){
          if(board[upLeftrow][upLeftcol] !== ''){
            let upleft = board[upLeftrow][upLeftcol];
            let white = upleft === upleft.toUpperCase()?true:false;
            if(white){
            let position = [bORqROw,bORqCol,upLeftrow,upLeftcol];
            black_bishopQueenupleft.push(position);
            }
             Protectionpiecefound = true;
             issamepiecerow = upLeftrow;
             issamepiecercol = upLeftcol;
            if (issamepiecerow >= 0 && issamepiecerow < 8 && issamepiecercol >= 0 && issamepiecercol < 8){
             issameprotectionpiece = isSamePiece(board,issamepiecerow, issamepiecercol, clickedPieceColor);
            }
          break;
          }else if(board[upLeftrow][upLeftcol] == ''){
            let position = [bORqROw,bORqCol,upLeftrow,upLeftcol];
            black_bishopQueenupleft.push(position);
          }
       }
   }
   if (issamepiecerow >= 0 && issamepiecerow < 8 && issamepiecercol >= 0 && issamepiecercol < 8){
    if(Protectionpiecefound && issameprotectionpiece){
      let position = [bORqROw,bORqCol,issamepiecerow,issamepiecercol];
      black_bishopQueenupleft.push(position);
    }
   }
  }
/*    ****************************************** up right ******************************************** */
  if(bORqROw != 0 && bORqCol != 7){
    let issamepiecerow = '';
    let issamepiecercol = '';
    let issameprotectionpiece;
    let Protectionpiecefound = false;
    for(let i=1; i<8; i++){
       let uprightrow = bORqROw - i;
       let uprightcol =bORqCol + i;
       if((uprightrow >= 0 && uprightrow < 8) && (uprightcol >=0 && uprightcol < 8)){
          if(board[uprightrow][uprightcol] !== ''){
            let upright = board[uprightrow][uprightcol];
            let white = upright === upright.toUpperCase()?true:false;
            if(white){
            let position = [bORqROw,bORqCol,uprightrow,uprightcol];
            black_bishopQueenupright.push(position);
            }
             Protectionpiecefound = true;
             issamepiecerow = uprightrow;
             issamepiecercol = uprightcol;
            if (issamepiecerow >= 0 && issamepiecerow < 8 && issamepiecercol >= 0 && issamepiecercol < 8){
             issameprotectionpiece = isSamePiece(board,issamepiecerow, issamepiecercol, clickedPieceColor);
            }
          break;
          }else if(board[uprightrow][uprightcol] == ''){
            let position = [bORqROw,bORqCol,uprightrow,uprightcol];
            black_bishopQueenupright.push(position);
          }
       }
   }
   if (issamepiecerow >= 0 && issamepiecerow < 8 && issamepiecercol >= 0 && issamepiecercol < 8){
    if(Protectionpiecefound && issameprotectionpiece){
      let position = [bORqROw,bORqCol,issamepiecerow,issamepiecercol];
      black_bishopQueenupright.push(position);
    }
   }
  }
/*    ****************************************** down left ******************************************** */
  if(bORqROw != 7 && bORqCol != 0){
    let issamepiecerow = '';
    let issamepiecercol = '';
    let issameprotectionpiece;
    let Protectionpiecefound = false;
    for(let i=1; i<8; i++){
       let downleftrow = bORqROw + i;
       let downleftcol =bORqCol - i;
       if((downleftrow >= 0 && downleftrow < 8) && (downleftcol >=0 && downleftcol < 8)){
          if(board[downleftrow][downleftcol] !== ''){
            let downleft = board[downleftrow][downleftcol];
            let white = downleft === downleft.toUpperCase()?true:false;
            if(white){
            let position = [bORqROw,bORqCol,downleftrow,downleftcol];
            black_bishopQueendownleft.push(position);
            }
             Protectionpiecefound = true;
             issamepiecerow = downleftrow;
             issamepiecercol = downleftcol;
            if (issamepiecerow >= 0 && issamepiecerow < 8 && issamepiecercol >= 0 && issamepiecercol < 8){
             issameprotectionpiece = isSamePiece(board,issamepiecerow, issamepiecercol, clickedPieceColor);
            }
          break;
          }else if(board[downleftrow][downleftcol] == ''){
            let position = [bORqROw,bORqCol,downleftrow,downleftcol];
            black_bishopQueendownleft.push(position);
          }
       }
   }
   if (issamepiecerow >= 0 && issamepiecerow < 8 && issamepiecercol >= 0 && issamepiecercol < 8){
    if(Protectionpiecefound && issameprotectionpiece){
      let position = [bORqROw,bORqCol,issamepiecerow,issamepiecercol];
      black_bishopQueendownleft.push(position);
    }
   }
  }
/*    ****************************************** down right ******************************************** */
  if(bORqROw != 7 && bORqCol != 7){
    let issamepiecerow = '';
    let issamepiecercol = '';
    let issameprotectionpiece;
    let Protectionpiecefound = false;
    for(let i=1; i<8; i++){
       let downrightrow = bORqROw + i;
       let downrightcol =bORqCol + i;
       if((downrightrow >= 0 && downrightrow < 8) && (downrightcol >=0 && downrightcol < 8)){
          if(board[downrightrow][downrightcol] !== ''){
            let downright = board[downrightrow][downrightcol];
            let white = downright === downright.toUpperCase()?true:false;
            if(white){
            let position = [bORqROw,bORqCol,downrightrow,downrightcol];
            black_bishopQueendownright.push(position);
            }
             Protectionpiecefound = true;
             issamepiecerow = downrightrow;
             issamepiecercol = downrightcol;
            if (issamepiecerow >= 0 && issamepiecerow < 8 && issamepiecercol >= 0 && issamepiecercol < 8){
             issameprotectionpiece = isSamePiece(board,issamepiecerow, issamepiecercol, clickedPieceColor);
            }
          break;
          }else if(board[downrightrow][downrightcol] == ''){
            let position = [bORqROw,bORqCol,downrightrow,downrightcol];
            black_bishopQueendownright.push(position);
          }
       }
   }
   if (issamepiecerow >= 0 && issamepiecerow < 8 && issamepiecercol >= 0 && issamepiecercol < 8){
    if(Protectionpiecefound && issameprotectionpiece){
      let position = [bORqROw,bORqCol,issamepiecerow,issamepiecercol];
      black_bishopQueendownright.push(position);
    }
   }
  }


 }


  return {
    black_bishopQueenupleft,
    black_bishopQueenupright,
    black_bishopQueendownleft,
    black_bishopQueendownright,
    black_bishoplocation
  };
}

export function blackpawnlocation(){
 let black_pawnlocation = [];
 for(let i = 0;i<8;i++){
  for(let j = 0;j<8;j++){
    if(board[i][j] == 'p'){
      let blackpawn = [i,j];
      black_pawnlocation.push(blackpawn);
    }
  }
 }
 let black_down = [];
 let black_left = [];
 let black_right = [];
 let black_enpassent = [];
 for(let loc = 0; loc<black_pawnlocation.length;loc++){
  let [pawnRow,pawnCol] = black_pawnlocation[loc];

/*   **************************************** down block ***************************************** */
 let downrow = pawnRow + 1;   
 let downcol = pawnCol;   
 if(downrow >= 0 && downrow < 8 && downcol >= 0 && downcol < 8){
  let blackdown = [pawnRow,pawnCol,downrow,downcol];
  if(board[downrow][downcol] == ''){
    black_down.push(blackdown);
  }
 }
 /*   *********************************** enpassent block ************************************* */
 if(pawnRow == 1){
   let enblockrow = pawnRow + 2;
   let enblockcol = pawnCol;
   let enpassent = [pawnRow,pawnCol,enblockrow,enblockcol];
   if(board[enblockrow][enblockcol] == ''){
     black_enpassent.push(enpassent);
   }
 }
/*   **************************************** left thread ***************************************** */
  let leftrow = pawnRow + 1;
  let leftcol = pawnCol - 1;
  if(leftrow >= 0 && leftrow < 8 && leftcol >= 0 && leftcol < 8){
    let leftthread = [pawnRow,pawnCol,leftrow,leftcol];
    black_left.push(leftthread);
  }
/*   **************************************** right thread ***************************************** */
  let rightrow = pawnRow + 1;
  let rightcol = pawnCol + 1;
  if(rightrow >= 0 && rightrow <8 && rightcol >=0 && rightcol < 8){
    let rightthread = [pawnRow,pawnCol,rightrow,rightcol];
    black_right.push(rightthread);
  }
 }

 return{
  black_down,
  black_left,
  black_right,
  black_enpassent,
  black_pawnlocation
};
}

/* ------------------------------------------------- path in thread -----------------------------------------
 */export function iswhitepathinthread(){

  let {  whiteup,
         whitedown,
         whiteleft,
         whiteright,
         whiteupleft,
         whiteupright,
         whitedownleft,
         whitedownright,} = iskinginCheck();

  let {
    whiteKingup_left,
    whiteKingup_center,
    whiteKingup_right,
    whiteKing_left,
    whiteKing_right,
    whiteKingDown_left,
    whiteKingDown_center,
    whiteKingDown_right
  } = whiteKinglocation();
  
  let pathflag ={
    up_leftPathUnavailable : false,
    up_centerPathUnavailable : false,
    up_rightPathUnavailable : false,
    leftPathUnavailable : false,
    rightPathUnavailable : false,
    down_leftPathUnavailable : false,
    down_centerPathUnavailable : false,
    down_rightPathUnavailable : false,
    leftcastinThread : false, 
    rightcastinThread : false
  }
  
  function checkfilepathdetect(position,flag){
    if(position){
      pathflag[flag] = true;
    }
  }
checkfilepathdetect(whiteup,"up_centerPathUnavailable");
checkfilepathdetect(whitedown,"down_centerPathUnavailable");
checkfilepathdetect(whiteleft,"leftPathUnavailable");
checkfilepathdetect(whiteright,"rightPathUnavailable");
checkfilepathdetect(whiteupleft,"up_leftPathUnavailable");
checkfilepathdetect(whiteupright,"up_rightPathUnavailable");
checkfilepathdetect(whitedownleft,"down_leftPathUnavailable");
checkfilepathdetect(whitedownright,"down_rightPathUnavailable");

let upleft = whiteKingup_left[0];;
let upcenter = whiteKingup_center[0];
let upright = whiteKingup_right[0];
let left = whiteKing_left[0];
let right = whiteKing_right[0];
let downleft = whiteKingDown_left[0];
let downcenter = whiteKingDown_center[0];
let downright = whiteKingDown_right[0];

let kingmoves = [upleft,upcenter,upright,left,right,downleft,downcenter,downright];

for(let i = 0; i<kingmoves.length; i++){
  if(kingmoves[i] == undefined){
    let path  = Object.keys(pathflag)[i];
    pathflag[path] = null;
  }
}
  
  function checksKingpositonInThread(moves){
    return function(opponentPiece){

      if(opponentPiece.length > 0 && opponentPiece !== undefined){
        for(let i = 0; i<moves.length; i ++){
          for(let j = 0; j<opponentPiece.length; j++){
            let [piecerow,piececol,threadrow,threadcol] = opponentPiece[j];
/*               Castleft = [[7,1],[7,2]]  Castright = [[7,6]] */
            if(threadrow == 7 &&(threadcol == 1 || threadcol == 2)){
              pathflag.leftcastinThread = true;
            }
            if(threadrow == 7 && threadcol == 6){
              pathflag.rightcastinThread = true
            }
            if(moves[i] !== undefined){
              let [kingrow,kingcol,KingFutureRow,KingFutureCol] = moves[i];
              let whitepiece = board[KingFutureRow][KingFutureCol];
              let ownpiece = whitepiece !== '' && whitepiece === whitepiece.toUpperCase()? true : false;
              if((KingFutureRow == threadrow && KingFutureCol == threadcol) || ownpiece){
                   let path = Object.keys(pathflag)[i];
                   pathflag[path] = true;
              }
            }else{
                   let path = Object.keys(pathflag)[i];
                   pathflag[path] = null;
            }
          }
        }
      }
    }
  }

  let checkpath = checksKingpositonInThread(kingmoves);
/* ___________________________________ black king thread _____________________________________ */
  function blackkingthread(){
    let {blackKingup_left,
     blackKingup_center,
     blackKingup_right,
     blackKing_left,
     blackKing_right,
     blackKingDown_left,
     blackKingDown_center,
     blackKingDown_right
    } = blackKinglocation();
   checkpath(blackKingup_left);
   checkpath(blackKingup_center);
   checkpath(blackKingup_right);
   checkpath(blackKing_left);
   checkpath(blackKing_right);
   checkpath(blackKingDown_left);
   checkpath(blackKingDown_center);
   checkpath(blackKingDown_right);
  }

/* __________________________________________ knight thread __________________________________ */

  function blackKnightThread(){
    let {black_KnightUP_left,
      black_KnightUp_right,
      black_Knightdown_left,
      black_Knightdown_right,
      black_Knightright_up,
      black_Knightright_down,
      black_Knightleft_up,
      black_Knightleft_down
    } = blackKnightloaction();

   checkpath(black_KnightUP_left);
   checkpath(black_KnightUp_right);
   checkpath(black_Knightdown_left);
   checkpath(black_Knightdown_right);
   checkpath(black_Knightright_up);
   checkpath(black_Knightright_down);
   checkpath(black_Knightleft_up);
   checkpath(black_Knightleft_down);

  }

/* _______________________________________ rook and queen thread _____________________________ */

function rookandqueenthread(){
  let {
       black_rookQueenup,
       black_rookQueendown,
       black_rookQueenleft,
       black_rookQueenright
      } = blackrookORqueenlocation();

  checkpath(black_rookQueenup);
  checkpath(black_rookQueendown);
  checkpath(black_rookQueenleft);
  checkpath(black_rookQueenright);

}

/* _____________________________________ bishop and queen thread _________________________________ */

function bishopandqueenthread(){
 let {
       black_bishopQueenupleft,
       black_bishopQueenupright,
       black_bishopQueendownleft,
       black_bishopQueendownright
      } = blackBishopORqueenlocation();

  checkpath(black_bishopQueenupleft);
  checkpath(black_bishopQueenupright);
  checkpath(black_bishopQueendownleft);
  checkpath(black_bishopQueendownright);

}

/* _________________________________________ pawn thread _______________________________________ */

function blackpawnthread(){

 let {
      black_left,
      black_right
    } = blackpawnlocation();

  checkpath(black_left);
  checkpath(black_right);

}

blackkingthread();
blackpawnthread();
blackKnightThread();
rookandqueenthread();
bishopandqueenthread(); 

return pathflag;
}