export const move = new Audio("../sounds/move.wav");

export const capture = new Audio("../sounds/Capture.wav");

export const check = new Audio("../sounds/check.ogg");

export const stalemateaudio = new Audio("../sounds/Stalemate.wav");

export const gameover = new Audio("../sounds/gameover.wav");

export const Checkmate = new Audio("../sounds/Checkmate.wav");

export const castling = new Audio("../sounds/Castling.wav");

function warmUpAudio(audio) {
  audio.volume = 0;
  audio.play().then(() => {
    audio.pause();
    audio.currentTime = 0;
    audio.volume = 1;
  }).catch(err => {
    console.warn("Audio warm-up failed:", err);
  });
}

export function preloadAllSounds() {
  [move, capture, check,stalemateaudio,gameover,Checkmate,castling].forEach(warmUpAudio);
}