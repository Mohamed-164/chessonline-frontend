    
import { duration,gameOver } from "./mainChess.js";
import { result_from,resultcolor,result,reason,resultImage } from "./StalemateDetection.js";
import { gameover } from "./preloadsound.js";
export function timer(){
  let white_remain = duration;
  let black_remain = duration;
  let white_endTime;
  let black_endTime;
  let white_paused = true;
  let black_paused = true;

  const whitetimer = document.querySelector('.white-time');
  const whiteclock = document.querySelector('.whitetimer');
  const blackclock = document.querySelector('.blacktimer');

  function whiteupdate() {
    if (white_paused) return;

    const now = Date.now();
    const timeLeft = Math.max(white_endTime - now, 0);

    const minutes = Math.floor(timeLeft / 60000);
    const seconds = Math.ceil((timeLeft % 60000) / 1000);

    whitetimer.textContent = 
    `${minutes.toString().padStart(2,'0')} : ${seconds.toString().padStart(2,'0')}`;

    if(minutes == 0){
      whiteclock.classList.add('whitelight');
    }
    if (timeLeft > 0) {
      requestAnimationFrame(whiteupdate);
    }else{
        result_from.style.display = "flex";
        resultcolor.style.backgroundColor = "rgb(11, 220, 98)";
        result.textContent = "Black Won";
        reason.textContent = "by timeout";
        resultImage.src = "pieces_Img/timeout.png";
        gameover.play();
        gameOver();
    }
  }

  function whitestartTimer() {
    white_endTime = Date.now() + white_remain;
    white_paused = false;
    requestAnimationFrame(whiteupdate);
  }

  function whitepauseTimer() {
    white_paused = true;
    white_remain = white_endTime - Date.now();
  }

  function whiteresumeTimer() {
    white_endTime = Date.now() + white_remain;
    white_paused = false;
    requestAnimationFrame(whiteupdate);
  }
/* |_____________________________________ black timer _____________________________________| */
  const blacktimer = document.querySelector('.black-time');

  function blackupdate() {
    if (black_paused) return;

    const now = Date.now();
    const timeLeft = Math.max(black_endTime - now, 0);

    const minutes = Math.floor(timeLeft / 60000);
    const seconds = Math.ceil((timeLeft % 60000) / 1000);

    blacktimer.textContent = 
    `${minutes.toString().padStart(2,'0')} : ${seconds.toString().padStart(2,'0')}`;

    if(minutes == 0){
      blackclock.classList.add('blacklight');
    }
    if (timeLeft > 0) {
      requestAnimationFrame(blackupdate);
    }else{
        result_from.style.display = "flex";
        resultcolor.style.backgroundColor = "rgb(11, 220, 98)";
        result.textContent = "White Won";
        reason.textContent = "by timeout";
        resultImage.src = "pieces_Img/timeout.png";
        gameover.play();
        gameOver();
    }
  }

  function blackstartTimer() {
    black_endTime = Date.now() + black_remain;
    black_paused = false;
    requestAnimationFrame(blackupdate);
  }

  function blackpauseTimer() {
    black_paused = true;
    black_remain = black_endTime - Date.now();
  }

  function blackresumeTimer() {
    black_endTime = Date.now() + black_remain;
    black_paused = false;
    requestAnimationFrame(blackupdate);
  }
  return {whitestartTimer,
          whitepauseTimer,
          whiteresumeTimer,
          blackstartTimer,
          blackpauseTimer,
          blackresumeTimer
        };
}
