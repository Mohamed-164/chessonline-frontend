import { board } from "./boarddata_o.js";

export function blackClickDiable(){
    for(let i = 0; i < 8 ; i++){
        for(let j = 0; j < 8; j++){
            let blackpiece = board[i][j];
            let black = blackpiece && blackpiece === blackpiece.toLowerCase()? true : false;
            if(black){
             let blackplace = document.querySelector(`.cell[data-row="${i}"][data-col="${j}"]`);
             if(blackplace !== null){
                 blackplace.onclick = null;
             }
            }
        }
    }
}

export function whiteClickDisable(){
    for(let i = 0; i < 8 ; i++){
        for(let j = 0; j < 8; j++){
            let whitepiece = board[i][j];
            let white = whitepiece && whitepiece === whitepiece.toUpperCase()? true : false;
            if(white){
             let whiteplace = document.querySelector(`.cell[data-row="${i}"][data-col="${j}"]`);
             if(whiteplace !== null){
                 whiteplace.onclick = null;
             }
            }
        }
    }
}