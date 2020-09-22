const music=document.querySelector("audio");
const img=document.querySelector("img");
const play=document.getElementById("play");
const artist=document.getElementById("artist");
const title=document.getElementById("title");
const prev=document.getElementById("prev");
const next=document.getElementById("next");

let progress=document.getElementById("progress");

let total_duration=document.getElementById("duration");
let current_time=document.getElementById("current_time");
const progress_div=document.getElementById("progress_div");

let volume_slider = document.querySelector(".volume_slider"); 

let isPlaying=false;

//For Play Function
  const playMusic = () => {
  isPlaying=true;
  music.play();
  play.classList.replace("fa-play", "fa-pause");
  img.classList.add("anime");
};

//For Pause Function
  const pauseMusic = () => {
  isPlaying=false;
  music.pause();
  play.classList.replace( "fa-pause", "fa-play");
  img.classList.remove("anime");
};

play.addEventListener("click", () => {
  if(isPlaying){
    pauseMusic();
  }else{
    playMusic();
  }
});

//Array

const songs = [
  {
    name: "Danish1",
    title: " Tumko Cahunga",
    artist: "A.R Rahman",
  },
  {
    name: "Danish2",
    title: "Raabta",
    artist: "Arijit Singh",
  },
  {
    name: "Danish3",
    title: "Janam Janam",
    artist: "Arijit Singh",
  },
  {
    name: "Danish4",
    title: "Rang Sharbaton ",
    artist: "Atif Aslam",
  },
  {
    name: "Danish5",
    title: "Satyamev Jayte",
    artist: "Sajid-Wajid",
  },
  {
    name: "Danish6",
    title: "Sau Aasmano Ko",
    artist: "Armaan Malik",
  },
  {
    name: "Danish7",
    title: "Tera Fitoor",
    artist: "Arijit Singh",
  },
];

//Acessing All Data When We Click Next

  const loadSong = (songs) => {
  title.textContent = songs.title;
  artist.textContent = songs.artist;
  music.src = "music/" + songs.name + ".mp3";
  img.src = "image/" + songs.name + ".jpg";
};

 songIndex = 0;

const nextSong = () => {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  playMusic();
};

const prevSong = () => {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  playMusic();
};

//progress Bar And time Duration

music.addEventListener("timeupdate", (event) => {
  //console.log(event);
  
  const { currentTime , duration } = event.target;
  console.log(currentTime);
  console.log(duration);
  let progress_time = (currentTime / duration)* 100;
  progress.style.width = `${progress_time}%`;
  
  //Timing Duration Update

  let min_duration = Math.floor(duration / 60);
  let sec_duration = Math.floor(duration % 60);

  let tot_duration = `${min_duration}:${sec_duration}`;
  if (duration){
    total_duration.textContent = `${tot_duration}`;
  }

   //Current Timing Duration Update

   let min_currentTime = Math.floor(currentTime / 60);
   let sec_currentTime = Math.floor(currentTime % 60);

   if (sec_currentTime < 10){
    sec_currentTime = `0${sec_currentTime}`;
  }

   let tot_currentTime = `${min_currentTime}:${sec_currentTime}`;
   current_time.textContent = `${tot_currentTime}`;
  
});

//Progress Onclick Functionality

progress_div.addEventListener("click", (event) => {
  const {duration} = music;
  let move_progress = 
  (event.offsetX / event.target.clientWidth) * duration;
  music.currentTime = move_progress;
});

//Volume Slider

function setVolume() { 
  music.volume = volume_slider.value / 100; 
} 

//if music end call next funct automatically
music.addEventListener("ended" , nextSong);

next.addEventListener("click", nextSong);
prev.addEventListener("click", prevSong);

