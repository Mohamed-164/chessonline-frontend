import { board } from "./boarddata_o.js";
import { iskinginCheck } from "./checkDetection_o.js";
import { whiteKinglocation } from "./whitePathDetection_o.js";
let clickedPieceColor = "black";

function isSamePiece(board,Row, Col, clickedPieceColor) {
  let piece = board[Row][Col];
  if (piece === '') return false; // early return if cell is empty

  let pieceColor = piece === piece.toUpperCase() ? "white" : "black";
  return clickedPieceColor !== pieceColor;
}
export function blackKinglocation(){
  
  let black_KingLoaction = [];
  for(let kingrow = 0; kingrow<8; kingrow++){
    for(let kingcol = 0;kingcol<8; kingcol++){
      if(board[kingrow][kingcol] == 'k'){
        let position = [kingrow,kingcol];
        black_KingLoaction.push(position);
      }
    }
  }

let blackKingup_left = [];
let blackKingup_center = [];
let blackKingup_right = [];
let blackKing_left = [];
let blackKing_right = [];
let blackKingDown_left = [];
let blackKingDown_center = [];
let blackKingDown_right = [];

  for(let i = 0; i<black_KingLoaction.length; i++){
    let [kingrow,kingcol] = black_KingLoaction[i];
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
      
      let blackkingupleft = [kingrow,kingcol,up_leftrow,up_leftcol];
      let blackkingupcenter = [kingrow,kingcol,up_centerrow,up_centercol];
      let blackkingupright = [kingrow,kingcol,up_rightrow,up_rightcol];
      let blackkingleft = [kingrow,kingcol,leftrow,leftcol];
      let blackkingright = [kingrow,kingcol,rightrow,rightcol];
      let blackkingdownleft = [kingrow,kingcol,down_leftrow,down_leftcol];
      let blackkingdowncenter = [kingrow,kingcol,down_centerrow,down_centercol];
      let blackkingdownright = [kingrow,kingcol,down_rightrow,down_rightcol];

      if(up_leftrow >= 0 && up_leftrow < 8 && up_leftcol >= 0 && up_leftcol < 8){
        blackKingup_left.push(blackkingupleft);
      }
      if(up_centerrow >= 0 && up_centerrow <8 && up_centercol >= 0 && up_centercol < 8){
        blackKingup_center.push(blackkingupcenter);
      }
      if(up_rightrow >= 0 && up_rightrow < 8 && up_rightcol >= 0 && up_rightcol < 8){
        blackKingup_right.push(blackkingupright);
      }
      if(leftrow >= 0 && leftrow < 8 && leftcol >= 0 && leftcol < 8){
        blackKing_left.push(blackkingleft)
      }
      if(rightrow >= 0 && rightrow < 8 && rightcol >= 0 && rightcol < 8){
        blackKing_right.push(blackkingright);
      }
      if(down_leftrow >= 0 && down_leftrow < 8 && down_leftcol >= 0 && down_leftcol < 8){
        blackKingDown_left.push(blackkingdownleft);
      }
      if(down_centerrow >= 0 && down_centerrow < 8 && down_centercol >=0 && down_centercol < 8){
        blackKingDown_center.push(blackkingdowncenter);
      }
      if(down_rightrow >= 0 && down_rightrow < 8 && down_rightcol >= 0 && down_rightcol < 8){
        blackKingDown_right.push(blackkingdownright);
      }
  }
  return {
    black_KingLoaction,
    blackKingup_left,
    blackKingup_center,
    blackKingup_right,
    blackKing_left,
    blackKing_right,
    blackKingDown_left,
    blackKingDown_center,
    blackKingDown_right
  }
}
/* ---------------------------------------- knight thread ------------------------------------------------ */
export function whiteKnightloaction(){

  let white_Knightloaction = [];

  for(let Knightrow = 0; Knightrow< 8; Knightrow++){
      for(let knightcol = 0; knightcol<8; knightcol++){
        if(board[Knightrow][knightcol] == 'N'){
          let position = [Knightrow,knightcol];
          white_Knightloaction.push(position);
        }
      }
  }
  let white_KnightUP_left = [];
  let white_KnightUp_right = [];
  let white_Knightdown_left = [];
  let white_Knightdown_right = [];
  let white_Knightright_up = [];
  let white_Knightright_down = [];
  let white_Knightleft_up = [];
  let white_Knightleft_down = [];

    for(let Knight = 0; Knight<white_Knightloaction.length; Knight++){

        let[whiteKnightrow,whiteKnightcol] = white_Knightloaction[Knight];
        let up_LeftAttackRow = whiteKnightrow - 2;
        let up_LeftAttackCol = whiteKnightcol - 1;
        let up_RightAttackRow = whiteKnightrow - 2;
        let up_RightAttackCol = whiteKnightcol + 1;
        let down_LeftAttackRow = whiteKnightrow + 2;
        let down_LeftAttackCol = whiteKnightcol - 1;
        let down_RightAttackRow = whiteKnightrow + 2;
        let down_RightAttackCol = whiteKnightcol + 1;
        let right_UpAttackRow = whiteKnightrow - 1;
        let right_UpAttackCol = whiteKnightcol + 2;
        let right_DownAttackRow = whiteKnightrow + 1;
        let right_DownAttackCol = whiteKnightcol + 2;
        let left_UpAttackRow = whiteKnightrow - 1;
        let left_UpAttackCol = whiteKnightcol - 2;
        let left_DownAttackRow = whiteKnightrow + 1;
        let left_DownAttackCol = whiteKnightcol - 2;

      let up_left = [whiteKnightrow,whiteKnightcol,up_LeftAttackRow,up_LeftAttackCol];
      let up_right = [whiteKnightrow,whiteKnightcol,up_RightAttackRow,up_RightAttackCol];
      let down_left = [whiteKnightrow,whiteKnightcol,down_LeftAttackRow,down_LeftAttackCol];
      let down_right = [whiteKnightrow,whiteKnightcol,down_RightAttackRow,down_RightAttackCol];
      let right_up = [whiteKnightrow,whiteKnightcol,right_UpAttackRow,right_UpAttackCol];
      let right_down = [whiteKnightrow,whiteKnightcol,right_DownAttackRow,right_DownAttackCol];
      let left_up = [whiteKnightrow,whiteKnightcol,left_UpAttackRow,left_UpAttackCol];
      let left_down = [whiteKnightrow,whiteKnightcol,left_DownAttackRow,left_DownAttackCol];

      if(up_LeftAttackRow >= 0 && up_LeftAttackRow < 8 && up_LeftAttackCol >= 0 && up_LeftAttackCol <8){
        white_KnightUP_left.push(up_left);
      }
      if(up_RightAttackRow >= 0 && up_RightAttackRow < 8 && up_RightAttackCol >= 0 && up_RightAttackCol < 8){
        white_KnightUp_right.push(up_right);
      }
      if(down_LeftAttackRow >= 0 && down_LeftAttackRow < 8 && down_LeftAttackCol >= 0 && down_LeftAttackCol < 8){
        white_Knightdown_left.push(down_left);
      }
      if(down_RightAttackRow >= 0 && down_RightAttackRow < 8 && down_RightAttackCol >= 0 && down_RightAttackCol < 8){
        white_Knightdown_right.push(down_right);
      }
      if(right_UpAttackRow >= 0 && right_UpAttackRow < 8 && right_UpAttackCol >= 0 && right_UpAttackCol < 8){
        white_Knightright_up.push(right_up);
      }
      if(right_DownAttackRow >= 0 && right_DownAttackRow < 8 && right_DownAttackCol >= 0 && right_DownAttackCol < 8){
        white_Knightright_down.push(right_down);
      }
      if(left_UpAttackRow >= 0 && left_UpAttackRow < 8 && left_UpAttackCol >= 0 && left_UpAttackCol < 8){
        white_Knightleft_up.push(left_up);
      }
      if(left_DownAttackRow >= 0 && left_DownAttackRow < 8 && left_DownAttackCol >= 0 && left_DownAttackCol < 8){
        white_Knightleft_down.push(left_down);
      }
      }
    

    return {
      white_Knightloaction,
      white_KnightUP_left,
      white_KnightUp_right,
      white_Knightdown_left,
      white_Knightdown_right,
      white_Knightright_up,
      white_Knightright_down,
      white_Knightleft_up,
      white_Knightleft_down
    }
}

/* --------------------------------------------- rook in path --------------------------------------------------- */
export function whiterookORqueenlocation(){

  let white_rookORqueenlocation = [];
  let white_rooklocation = [];
  let white_queenlocation = [];
  for(let i = 0; i<8; i++){
    for(let j = 0;j<8;j++){
      if(board[i][j] == 'R'){
        let position = [i,j];
        white_rooklocation.push(position);
      }else if(board[i][j] == 'Q'){
        let position = [i,j];
        white_queenlocation.push(position);      
      }
      if(board[i][j] == 'R' || board[i][j] == 'Q'){
        let position = [i,j];
        white_rookORqueenlocation.push(position);
      }
    }
  }

  let white_rookQueenup = [];
  let white_rookQueendown = [];
  let white_rookQueenleft = [];
  let white_rookQueenright = [];
  for(let location = 0; location<white_rookORqueenlocation.length;location++){
   let [rORqRow,rORqCol] = white_rookORqueenlocation[location];
/*    ************************************ up ************************************** */
   if(rORqRow != 0){
      let issamepiecerow = '';
      let issamepiecercol = '';
      let issameProtectionpiece;
      let protectionpiecefound = false;
      for(let i = 1;i<=rORqRow; i++){
        if(board[rORqRow - i][rORqCol] !== ''){
          let up = board[rORqRow - i][rORqCol];
          let black = up === up.toLowerCase()? true:false;
          if(black){
          let upAttackRow = rORqRow - i;
          let upAttackCol = rORqCol; 
          let position = [rORqRow,rORqCol,upAttackRow,upAttackCol];
          white_rookQueenup.push(position);  
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
          white_rookQueenup.push(position);
        }
      }
      if(protectionpiecefound && issameProtectionpiece){
        let position = [rORqRow,rORqCol,issamepiecerow,issamepiecercol];
        white_rookQueenup.push(position);
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
          let black = down === down.toLowerCase()?true:false;
          if(black){
          let downAttackRow = rORqRow + i;
          let downAttackCol = rORqCol; 
          let position = [rORqRow,rORqCol,downAttackRow,downAttackCol];
          white_rookQueendown.push(position);
          }
          protectionpiecefound = true;
          issamepiecerow = rORqRow+i;
          issamepiecercol = rORqCol;
          issameProtectionpiece = isSamePiece(board,issamepiecerow,issamepiecercol,clickedPieceColor);
          break;
        }else if(board[rORqRow + i][rORqCol] == ''){
          let downAttackRow = rORqRow + i;
          let downAttackCol = rORqCol; 
          let position = [rORqRow,rORqCol,downAttackRow,downAttackCol];
          white_rookQueendown.push(position);
        }
      }
      if(protectionpiecefound && issameProtectionpiece){
        let position = [rORqRow,rORqCol,issamepiecerow,issamepiecercol];
        white_rookQueendown.push(position);
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
          let black = left === left.toLowerCase()?true:false;
          if(black){
          let leftAttackRow = rORqRow;
          let leftAttackCol = rORqCol - i; 
          let position = [rORqRow,rORqCol,leftAttackRow,leftAttackCol];
          white_rookQueenleft.push(position);
          }
          protectionpiecefound = true;
          issamepiecerow = rORqRow;
          issamepiecercol = rORqCol - i;
          issameProtectionpiece = isSamePiece(board,issamepiecerow,issamepiecercol,clickedPieceColor);
          break;
        }else if(board[rORqRow][rORqCol - i] == ''){
          let leftAttackRow = rORqRow;
          let leftAttackCol = rORqCol - i; 
          let position = [rORqRow,rORqCol,leftAttackRow,leftAttackCol];
          white_rookQueenleft.push(position);
        }
      }
      if(protectionpiecefound && issameProtectionpiece){
        let position = [rORqRow,rORqCol,issamepiecerow,issamepiecercol];
        white_rookQueenleft.push(position);
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
          let black = right === right.toLowerCase()? true:false;
          if(black){
          let rightAttackRow = rORqRow;
          let rightAttackCol = rORqCol + i; 
          let position = [rORqRow,rORqCol,rightAttackRow,rightAttackCol];
          white_rookQueenright.push(position);
          }
          protectionpiecefound = true;
          issamepiecerow = rORqRow;
          issamepiecercol = rORqCol + i;
          issameProtectionpiece = isSamePiece(board,issamepiecerow,issamepiecercol,clickedPieceColor);
          break;
        }else if(board[rORqRow][rORqCol + i] == ''){
          let rightAttackRow = rORqRow;
          let rightAttackCol = rORqCol + i; 
          let position = [rORqRow,rORqCol,rightAttackRow,rightAttackCol];
          white_rookQueenright.push(position);
        }
      }
      if(protectionpiecefound && issameProtectionpiece){
        let position = [rORqRow,rORqCol,issamepiecerow,issamepiecercol];
        white_rookQueenright.push(position);
      }
  }
  }
  return {
    white_rookQueenup,
    white_rookQueendown,
    white_rookQueenleft,
    white_rookQueenright,
    white_rooklocation,
    white_queenlocation
  };
}

export function whiteBishopORqueenlocation(){

 let white_bishopORqueenlocation = [];
 let white_bishoplocation = [];
 for(let i=0; i<8; i++){
  for(let j=0; j<8; j++){
    if(board[i][j] == 'B'){
      let position = [i,j];
      white_bishoplocation.push(position);
    }
    if(board[i][j] == 'B' || board[i][j] == 'Q'){
      let position = [i,j];
      white_bishopORqueenlocation.push(position);
    }
  }
 }
 let white_bishopQueenupleft = [];
 let white_bishopQueenupright = [];
 let white_bishopQueendownleft = [];
 let white_bishopQueendownright = [];

 for(let loc = 0; loc <white_bishopORqueenlocation.length;loc++){
  let [bORqROw,bORqCol] = white_bishopORqueenlocation[loc];
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
            let black = upleft === upleft.toLowerCase()?true:false;
            if(black){
            let position = [bORqROw,bORqCol,upLeftrow,upLeftcol];
            white_bishopQueenupleft.push(position);
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
            white_bishopQueenupleft.push(position);
          }
       }
   }
   if (issamepiecerow >= 0 && issamepiecerow < 8 && issamepiecercol >= 0 && issamepiecercol < 8){
    if(Protectionpiecefound && issameprotectionpiece){
      let position = [bORqROw,bORqCol,issamepiecerow,issamepiecercol];
      white_bishopQueenupleft.push(position);
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
            let black = upright.toLowerCase()?true:false;
            if(black){
            let position = [bORqROw,bORqCol,uprightrow,uprightcol];
            white_bishopQueenupright.push(position);
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
            white_bishopQueenupright.push(position);
          }
       }
   }
   if (issamepiecerow >= 0 && issamepiecerow < 8 && issamepiecercol >= 0 && issamepiecercol < 8){
    if(Protectionpiecefound && issameprotectionpiece){
      let position = [bORqROw,bORqCol,issamepiecerow,issamepiecercol];
      white_bishopQueenupright.push(position);
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
            let black = downleft === downleft.toLowerCase()?true:false;
            if(black){
            let position = [bORqROw,bORqCol,downleftrow,downleftcol];
            white_bishopQueendownleft.push(position);
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
            white_bishopQueendownleft.push(position);
          }
       }
   }
   if (issamepiecerow >= 0 && issamepiecerow < 8 && issamepiecercol >= 0 && issamepiecercol < 8){
    if(Protectionpiecefound && issameprotectionpiece){
      let position = [bORqROw,bORqCol,issamepiecerow,issamepiecercol];
      white_bishopQueendownleft.push(position);
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
            let black = downright === downright.toLowerCase()?true:false;
            if(black){
            let position = [bORqROw,bORqCol,downrightrow,downrightcol];
            white_bishopQueendownright.push(position);
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
            white_bishopQueendownright.push(position);
          }
       }
   }
   if (issamepiecerow >= 0 && issamepiecerow < 8 && issamepiecercol >= 0 && issamepiecercol < 8){
    if(Protectionpiecefound && issameprotectionpiece){
      let position = [bORqROw,bORqCol,issamepiecerow,issamepiecercol];
      white_bishopQueendownright.push(position);
    }
   }
  }


 }


  return {
    white_bishopQueenupleft,
    white_bishopQueenupright,
    white_bishopQueendownleft,
    white_bishopQueendownright,
    white_bishoplocation
  };
}

export function whitepawnlocation(){
 let white_pawnlocation = [];
 for(let i = 0;i<8;i++){
  for(let j = 0;j<8;j++){
    if(board[i][j] == 'P'){
      let blackpawn = [i,j];
      white_pawnlocation.push(blackpawn);
    }
  }
 }
 let white_up = [];
 let white_left = [];
 let white_right = [];
 let white_enpassent = [];
 for(let loc = 0; loc<white_pawnlocation.length;loc++){
  let [pawnRow,pawnCol] = white_pawnlocation[loc];

/*   **************************************** up block ***************************************** */  
  let uprow = pawnRow - 1;
  let upcol = pawnCol;
  if(uprow >= 0 && uprow < 8 && upcol >= 0 && upcol < 8){
    let upmove = [pawnRow,pawnCol,uprow,upcol];
    if(board[uprow][upcol] == ''){
      white_up.push(upmove);
    }
  }
/*   ************************************** Enpassant block ********************************** */ 
if(pawnRow == 6){
  let enblockrow = pawnRow - 2;
  let enblockcol = pawnCol;
  let enMove = [pawnRow,pawnCol,enblockrow,enblockcol];
  if(board[enblockrow][enblockcol] == ''){
    white_enpassent.push(enMove);
  }
}
/*   **************************************** left thread *************************************** */
  let leftrow = pawnRow - 1;
  let leftcol = pawnCol - 1;
  if(leftrow >= 0 && leftrow < 8 && leftcol >= 0 && leftcol < 8){
    let leftthread = [pawnRow,pawnCol,leftrow,leftcol];
    white_left.push(leftthread);
  }
/*   **************************************** right thread ***************************************** */
  let rightrow = pawnRow - 1;
  let rightcol = pawnCol + 1;
  if(rightrow >= 0 && rightrow <8 && rightcol >=0 && rightcol < 8){
    let rightthread = [pawnRow,pawnCol,rightrow,rightcol];
    white_right.push(rightthread);
  }
 }

 return{
  white_up,
  white_left,
  white_right,
  white_enpassent,
  white_pawnlocation
 };
}
/* ------------------------------------------------- path in thread -----------------------------------------
 */export function isblackpathinthread(){

  let { blackup,
         blackdown,
         blackleft,
         blackright,
         blackupleft,
         blackupright,
         blackdownleft,
         blackdownright
        } = iskinginCheck();

  let {
    blackKingup_left,
    blackKingup_center,
    blackKingup_right,
    blackKing_left,
    blackKing_right,
    blackKingDown_left,
    blackKingDown_center,
    blackKingDown_right
  } = blackKinglocation();

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
checkfilepathdetect(blackup,"up_centerPathUnavailable");
checkfilepathdetect(blackdown,"down_centerPathUnavailable");
checkfilepathdetect(blackleft,"leftPathUnavailable");
checkfilepathdetect(blackright,"rightPathUnavailable");
checkfilepathdetect(blackupleft,"up_leftPathUnavailable");
checkfilepathdetect(blackupright,"up_rightPathUnavailable");
checkfilepathdetect(blackdownleft,"down_leftPathUnavailable");
checkfilepathdetect(blackdownright,"down_rightPathUnavailable");


let upleft = blackKingup_left[0];;
let upcenter = blackKingup_center[0];
let upright = blackKingup_right[0];
let left = blackKing_left[0];
let right = blackKing_right[0];
let downleft = blackKingDown_left[0];
let downcenter = blackKingDown_center[0];
let downright = blackKingDown_right[0];
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
/*             Castleft = [[0,2],[0,3]]   Castright = [[0,6]] */
            if((threadrow == 0 && threadcol == 2) || (threadrow == 0 && threadcol == 3)){
              pathflag.leftcastinThread = true;
            }
            if(threadrow == 0 && threadcol == 6){
              pathflag.rightcastinThread = true;
            }
            if(moves[i] !== undefined){
              let [kingrow,kingcol,KingFutureRow,KingFutureCol] = moves[i];
              let blackpiece = board[KingFutureRow][KingFutureCol];
              let ownpiece = blackpiece !== '' && blackpiece === blackpiece.toLowerCase()? true : false;
              if((KingFutureRow == threadrow && KingFutureCol == threadcol) || ownpiece){
                   let path = Object.keys(pathflag)[i];
                   pathflag[path] = true;
              }
            }
          }
        }
      }
    }
  }

  let checkpath = checksKingpositonInThread(kingmoves);

/* ____________________________________ white king thread ____________________________________ */
  function whitekingthread(){
    let {whiteKingup_left,
         whiteKingup_center,
         whiteKingup_right,
         whiteKing_left,
         whiteKing_right,
         whiteKingDown_left,
         whiteKingDown_center,
         whiteKingDown_right
        } = whiteKinglocation();
   checkpath(whiteKingup_left);
   checkpath(whiteKingup_center);
   checkpath(whiteKingup_right);
   checkpath(whiteKing_left);
   checkpath(whiteKing_right);
   checkpath(whiteKingDown_left);
   checkpath(whiteKingDown_center);
   checkpath(whiteKingDown_right);
  }

/* __________________________________________ knight thread __________________________________ */

  function whiteKnightThread(){
    let {white_KnightUP_left,
      white_KnightUp_right,
      white_Knightdown_left,
      white_Knightdown_right,
      white_Knightright_up,
      white_Knightright_down,
      white_Knightleft_up,
      white_Knightleft_down
    } = whiteKnightloaction();

   checkpath(white_KnightUP_left);
   checkpath(white_KnightUp_right);
   checkpath(white_Knightdown_left);
   checkpath(white_Knightdown_right);
   checkpath(white_Knightright_up);
   checkpath(white_Knightright_down);
   checkpath(white_Knightleft_up);
   checkpath(white_Knightleft_down);

  }

/* _______________________________________ rook and queen thread _____________________________ */

function rookandqueenthread(){
  let {
       white_rookQueenup,
       white_rookQueendown,
       white_rookQueenleft,
       white_rookQueenright
      } = whiterookORqueenlocation();

  checkpath(white_rookQueenup);
  checkpath(white_rookQueendown);
  checkpath(white_rookQueenleft);
  checkpath(white_rookQueenright);

}

/* _____________________________________ bishop and queen thread _________________________________ */

function bishopandqueenthread(){
 let {
       white_bishopQueenupleft,
       white_bishopQueenupright,
       white_bishopQueendownleft,
       white_bishopQueendownright
      } = whiteBishopORqueenlocation();

  checkpath(white_bishopQueenupleft);
  checkpath(white_bishopQueenupright);
  checkpath(white_bishopQueendownleft);
  checkpath(white_bishopQueendownright);

}

/* _________________________________________ pawn thread _______________________________________ */

function whitepawnthread(){

 let {
      white_left,
      white_right
    } = whitepawnlocation();

  checkpath(white_left);
  checkpath(white_right);

}
whitekingthread();
whitepawnthread();
whiteKnightThread();
rookandqueenthread();
bishopandqueenthread(); 
return pathflag;
}
