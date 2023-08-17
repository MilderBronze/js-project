const play = document.getElementById("play");
const music = document.querySelector("audio");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const img = document.querySelector("img");
let artist = document.getElementById("artist");
let title = document.getElementById("title");
const idMarquee = document.getElementById("idMarquee");
const songList = [
  {
    title: "BURN IT DOWN",
    artist: "LINKIN PARK",
    src: "music/BurnItDown.mp3",
    cover: "images/thapa-1.jpg",
  },
  {
    title: "CASTLE OF GLASS",
    artist: "LINKIN PARK",
    src: "music/CastleOfGlassRemix.mp3",
    cover: "images/thapa-2.jpeg",
  },
  {
    title: "FAINT",
    artist: "LINKIN PARK",
    src: "music/Faint.mp3",
    cover: "images/thapa-3.jpg",
  },
  {
    title: "DESPACITO",
    artist: "DADDY YANKEE ft. JUSTIN BIEBER",
    src: "music/despacito.mp3",
    cover: "images/thapa-4.jpeg",
  },
];

let songIndex = 0;
let playpause = false;
play.addEventListener("click", function () {
  if (!playpause) {
    // toh mtlb gaana band/paused hai and on click, it needs to be played
    playpause = true;
    play.classList.replace("fa-play", "fa-pause");
    img.classList.add("anime");
    music.play();
  } else {
    playpause = false;
    play.classList.replace("fa-pause", "fa-play");
    img.classList.remove("anime");
    music.pause();
  }
});

let height = artist.clientHeight;
let marquee = document.createElement("marquee");
const marqueefunction = () => {
  if (artist.clientHeight > height) {
    idMarquee.appendChild(marquee);
    marquee.appendChild(artist);
  } else if (artist.clientHeight <= height) {
    marquee.remove();
    idMarquee.appendChild(artist);
  }
};
const previousSong = () => {
  playpause = true;
  play.classList.replace("fa-play", "fa-pause");
  img.classList.add("anime");
  songIndex = (songIndex - 1 + songList.length) % songList.length;
  img.src = songList[songIndex].cover;
  title.textContent = songList[songIndex].title;
  artist.textContent = songList[songIndex].artist;
  marqueefunction();
  music.src = songList[songIndex].src;
  music.play();
};
const nextSong = () => {
  playpause = true;
  play.classList.replace("fa-play", "fa-pause");
  songIndex = (songIndex + 1) % songList.length;
  img.classList.add("anime");
  img.src = songList[songIndex].cover;
  title.textContent = songList[songIndex].title;
  artist.textContent = songList[songIndex].artist;
  marqueefunction();
  music.src = songList[songIndex].src;
  music.play();
};

// progress js work

let current_time = document.getElementById("current_time");
let duration = document.getElementById("duration");
let curTime = {
  min: 0,
  sec: 0,
};
let duraTime = {
  min1: 0,
  sec1: 0,
};
// object destructuring
let { min, sec } = curTime;
let { min1, sec1 } = duraTime;
let percentWidth;
const progress_div = document.getElementById("progress_div");
const progress = document.getElementById("progress");

music.addEventListener("timeupdate", (event) => {
  min = Math.floor(event.target.currentTime / 60);
  sec = Math.floor(event.target.currentTime % 60);
  percentWidth = (event.target.currentTime / event.target.duration) * 100;
  progress.style.width = `${percentWidth}%`;
  min1 = Math.floor(event.target.duration / 60);
  sec1 = Math.floor(event.target.duration % 60);
  current_time.textContent = `${min}:${sec}`;
  if (sec < 10) {
    current_time.textContent = `${min}:0${sec}`;
  }
  if (min1 && sec1) {
    duration.textContent = `${min1}:${sec1}`;
  }
});
music.addEventListener("ended", nextSong);

progress_div.addEventListener("click", (event) => {
  const { duration } = music;
  let move_prog = (event.offsetX / progress_div.offsetWidth) * duration;
  music.currentTime = move_prog;
});

prev.addEventListener("click", previousSong);
next.addEventListener("click", nextSong);
