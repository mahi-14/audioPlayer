const music = new Audio("audios/1.mp3");

//create array

const songs = [
  {
    id: "1",
    songName: `On my way
    <div class="subtitle">Alan Walker</div> `,
    poster: "images/1.jpg",
  },
  {
    id: "2",
    songName: `Purple planets <br>
    <div class="subtitle">Geoff Harvey</div> `,
    poster: "images/2.jpg",
  },
  {
    id: "3",
    songName: `I am all about it <br>
    <div class="subtitle">Robert Copsey</div> `,
    poster: "images/3.jpg",
  },
  {
    id: "4",
    songName: `Unforgettable dreams <br>
    <div class="subtitle">Jennifer Melgar</div> `,
    poster: "images/4.jpg",
  },
  {
    id: "5",
    songName: `Finding my mood <br>
    <div class="subtitle">Iann Dior</div> `,
    poster: "images/5.jpg",
  },
  {
    id: "6",
    songName: `Real feel today <br>
    <div class="subtitle">Geoff Harvey</div> `,
    poster: "images/6.jpg",
  },
  {
    id: "7",
    songName: `Dreamy mood <br>
    <div class="subtitle">Iann Dior</div> `,
    poster: "images/7.jpg",
  },
  {
    id: "8",
    songName: `Alan Walker-Fade <br>
    <div class="subtitle">Alan Walker</div> `,
    poster: "images/8.jpg",
  },
  {
    id: "9",
    songName: `Let it be<br>
    <div class="subtitle">Beatles</div> `,
    poster: "images/9.jpg",
  },
  {
    id: "10",
    songName: `Gold <br>
    <div class="subtitle">Spandau Ballet</div> `,
    poster: "images/10.jpg",
  },
  {
    id: "11",
    songName: `You better do it
    <div class="subtitle">Robert Meunier</div> `,
    poster: "images/11.jpg",
  },
  {
    id: "12",
    songName: ` Okay you wanna see<br>
    <div class="subtitle">Grace mesa</div> `,
    poster: "images/12.jpg",
  },
  {
    id: "13",
    songName: `Hidden forest <br>
    <div class="subtitle">taizo</div> `,
    poster: "images/13.jpg",
  },
  {
    id: "14",
    songName: `The cascade of emotions<br>
    <div class="subtitle">Grace mesa</div> `,
    poster: "images/14.jpg",
  },
  {
    id: "15",
    songName: `Ray of hope<br>
    <div class="subtitle">Iann Dior</div> `,
    poster: "images/15.jpg",
  },
  {
    id: "16",
    songName: `Young world <br>
    <div class="subtitle">Geoff Harvey</div> `,
    poster: "images/16.jpg",
  },
];

Array.from(document.getElementsByClassName("songItem")).forEach(
  (element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].poster;
    element.getElementsByTagName("h5")[0].innerHTML = songs[i].songName;
  }
);

//handel play/pause
let masterPlay = document.getElementById("master_play");
let wave = document.getElementsByClassName("wave")[0];

masterPlay.addEventListener("click", () => {
  if (music.paused || music.currentTime <= 0) {
    music.play();
    masterPlay.classList.remove("fa-play");
    masterPlay.classList.add("fa-pause");
    wave.classList.add("active2");
  } else {
    music.pause();
    masterPlay.classList.add("fa-play");
    masterPlay.classList.remove("fa-pause");
    wave.classList.remove("active2");
  }
});

const makeAllPlays = () => {
  Array.from(document.getElementsByClassName("playListPlay")).forEach(
    (element) => {
      element.classList.add("fa-circle-play");
      element.classList.remove("fa-circle-pause");
    }
  );
};

const makeAllBackgrounds = () => {
  Array.from(document.getElementsByClassName("songItem")).forEach((element) => {
    element.style.background = "rgb(105, 105, 170, 0)";
  });
};

let index = 0;
let poster_master_play = document.getElementById("poster_master_play");
let title = document.getElementById("title");

Array.from(document.getElementsByClassName("playListPlay")).forEach(
  (element) => {
    element.addEventListener("click", (e) => {
      index = e.target.id;
      makeAllPlays();
      e.target.classList.remove("fa-circle-play");
      e.target.classList.add("fa-circle-pause");
      music.src = `audios/${index}.mp3`;
      poster_master_play.src = `images/${index}.jpg`;
      music.play();
      let song_title = songs.filter((ele) => {
        return ele.id == index;
      });
      song_title.forEach((ele) => {
        let { songName } = ele;
        title.innerHTML = songName;
      });
      masterPlay.classList.remove("fa-play");
      masterPlay.classList.add("fa-pause");
      wave.classList.add("active2");
      music.addEventListener("ended", () => {
        masterPlay.classList.add("fa-play");
        masterPlay.classList.remove("fa-pause");
        wave.classList.remove("active2");
      });
      makeAllBackgrounds();
      Array.from(document.getElementsByClassName("songItem"))[
        `${index - 1}`
      ].style.background = "rgb(105,105,105,.1)";
    });
  }
);

//time updation
let currentStart = document.getElementById("currentStart");
let currentEnd = document.getElementById("currentEnd");
//updating seekbar
let seek = document.getElementById("seek");
let bar2 = document.getElementById("bar2");
let dot = document.getElementsByClassName("dot")[0];

music.addEventListener("timeupdate", () => {
  let music_curr = music.currentTime;
  let music_dur = music.duration;

  let min = Math.floor(music_dur / 60);
  let sec = Math.floor(music_dur % 60);
  if (sec < 10) {
    sec = `0${sec}`;
  }
  currentEnd.innerText = `${min}:${sec}`;

  let min1 = Math.floor(music_curr / 60);
  let sec1 = Math.floor(music_curr % 60);
  if (sec < 10) {
    sec = `0${sec}`;
  }
  currentStart.innerText = `${min1}:${sec1}`;

  let progressbar = parseInt((music.currentTime / music.duration) * 100);
  seek.value = progressbar;
  let seekbar = seek.value;
  bar2.style.width = `${seekbar}%`;
  dot.style.left = `${seekbar}%`;
});

seek.addEventListener("change", () => {
  music.currentTime = (seek.value * music.duration) / 100;
});

music.addEventListener("ended", () => {
  masterPlay.classList.add("fa-play");
  masterPlay.classList.remove("fa-pause");
  wave.classList.remove("active2");
});

//volume
let vol_icon = document.getElementById("vol_icon");
let vol = document.getElementById("vol");
let vol_dot = document.getElementById("vol_dot");
let volBar = document.getElementsByClassName("volBar")[0];

vol.addEventListener("change", () => {
  if (vol.value == 0) {
    vol_icon.classList.remove("fa-volume-low");
    vol_icon.classList.add("fa-volume-mute");
    vol_icon.classList.remove("fa-volume-up");
  }
  if (vol.value > 0) {
    vol_icon.classList.add("fa-volume-low");
    vol_icon.classList.remove("fa-volume-mute");
    vol_icon.classList.remove("fa-volume-up");
  }
  if (vol.value > 50) {
    vol_icon.classList.remove("fa-volume-low");
    vol_icon.classList.remove("fa-volume-mute");
    vol_icon.classList.add("fa-volume-up");
  }

  let vol_a = vol.value;
  volBar.style.width = `${vol_a}%`;
  vol_dot.style.left = `${vol_a}%`;
  music.volume = vol_a / 100;
});

//handel previous/next buttons
let back = document.getElementById("back");
let next = document.getElementById("next");

back.addEventListener("click", () => {
  index -= 1;
  if (index < 1) {
    index = Array.from(document.getElementsByClassName("songItem")).length;
  }
  music.src = `audios/${index}.mp3`;
  poster_master_play.src = `images/${index}.jpg`;
  music.play();
  let song_title = songs.filter((ele) => {
    return ele.id == index;
  });
  song_title.forEach((ele) => {
    let { songName } = ele;
    title.innerHTML = songName;
  });
  makeAllPlays();
  document.getElementById(`${index}`).classList.remove("fa-play");
  document.getElementById(`${index}`).classList.add("fa-pause");
  makeAllBackgrounds();
  Array.from(document.getElementsByClassName("songItem"))[
    `${index - 1}`
  ].style.background = "rgb(105,105,105,.1)";
});

next.addEventListener("click", () => {
  index -= 0;
  index += 1;
  if (index > Array.from(document.getElementsByClassName("songItem")).length) {
    index = 1;
  }
  music.src = `audios/${index}.mp3`;
  poster_master_play.src = `images/${index}.jpg`;
  music.play();
  let song_title = songs.filter((ele) => {
    return ele.id == index;
  });
  song_title.forEach((ele) => {
    let { songName } = ele;
    title.innerHTML = songName;
  });
  makeAllPlays();
  document.getElementById(`${index}`).classList.remove("fa-play");
  document.getElementById(`${index}`).classList.add("fa-pause");
  makeAllBackgrounds();
  Array.from(document.getElementsByClassName("songItem"))[
    `${index - 1}`
  ].style.background = "rgb(105,105,105,.1)";
});

//handel left right arrows
let left_scroll = document.getElementById("left_scroll");
let right_scroll = document.getElementById("right_scroll");
let popSong = document.getElementsByClassName("popSong")[0];

left_scroll.addEventListener("click", () => {
  popSong.scrollLeft -= 330;
});
right_scroll.addEventListener("click", () => {
  popSong.scrollLeft += 330;
});

let left_scrolls = document.getElementById("left_scrolls");
let right_scrolls = document.getElementById("right_scrolls");
let item = document.getElementsByClassName("item")[0];

left_scrolls.addEventListener("click", () => {
  item.scrollLeft -= 330;
});
right_scrolls.addEventListener("click", () => {
  item.scrollLeft += 330;
});
