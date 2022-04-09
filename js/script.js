"use strict";
const lightTheme = document.querySelector('.video-player__switch-theme');
const body = document.querySelector('.body');
const posterImg = document.querySelector('.player__poster');
const wrapper = document.querySelector('.player__viewer');
const startButton = document.querySelector('.player__play-button');
const playerControls = document.querySelector('.player__controls');
const playButton = document.querySelector('.controls__icon-play');
const progress = document.querySelector('.controls__progress');
const volumeButton = document.querySelector('.controls__volume-icon');
const volumeRange = document.querySelector('.controls__volume-level');

let video = document.querySelector('.player__viewer');
let currentVolume = 1;
let theme = 'dark';

lightTheme.addEventListener("click", switchTheme)
function switchTheme () {
	if (theme == 'dark') {
		theme = 'light';
		body.classList.add("light-theme");
	} else if (theme = 'light') {
		theme = 'dark';
		body.classList.remove("light-theme");
	}
	console.log(theme);
}

function setLocalStorage() {
	localStorage.setItem('theme', theme)
}
window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
	if (localStorage.getItem('theme')) {
		if (theme !== localStorage.getItem('theme')) {
			switchTheme()
		}
		
	}
}
window.addEventListener('load', getLocalStorage)

video.addEventListener("ended", () => {
	startButton.classList.remove("player__play-button_none");

})

wrapper.addEventListener("click", () => {
	toggleVideo();
	posterImg.classList.add("player__poster_active");
})

posterImg.addEventListener("click", () => {
	toggleVideo();
	startButton.classList.add("player__play-button_none");
	posterImg.classList.add("player__poster_active");
})

startButton.addEventListener("click", () => {
	toggleVideo();
	startButton.classList.add("player__play-button_none");
	posterImg.classList.add("player__poster_active");
})


playButton.addEventListener("click", () => {
	toggleVideo();
})


video.addEventListener("timeupdate", progressRangeVisual)

function progressRangeVisual() {
	progress.value = video.currentTime / video.duration * 100;
	progress.style.background = `linear-gradient(to right, #bdae82 0%, #bdae82 ${progress.value}%, #c8c8c8 ${progress.value}%, #c8c8c8 100%)`

	if (document.querySelector('.time')) document.querySelector('.time').classList.add("time_no-active");

}

progress.addEventListener("input", () => {
	if (!(document.querySelector('.time'))) {
		const time = document.createElement('div');
		time.classList.add("time");
		wrapper.after(time);
	}
	document.querySelector('.time').classList.remove("time_no-active");
	document.querySelector('.time').innerHTML =
		(Math.floor(video.currentTime) < 10) ? `00:0${Math.floor(video.currentTime)}` : `00:${Math.floor(video.currentTime)}`
	Math.floor(video.currentTime)
	document.querySelector('.time').style.left = `${(progress.value) * 0.65}%`
})


progress.addEventListener("input", () => {
	video.currentTime = progress.value / 100 * video.duration;
})



volumeRange.addEventListener("input", () => {
	volumeRange.style.background = `linear-gradient(to right, #bdae82 0%, #bdae82 ${currentVolume * 100}%, #c8c8c8 ${currentVolume
		* 100}%, #c8c8c8 100%)`
	if (video.volume <= 0.1) {
		volumeButton.classList.add("controls__volume-icon_off");
	} else {
		volumeButton.classList.remove("controls__volume-icon_off");
	}
	video.volume = volumeRange.value / 100;
	currentVolume = volumeRange.value / 100;
})

volumeButton.addEventListener("click", () => {
	volumeButton.classList.toggle("controls__volume-icon_off");
	if (video.volume > 0) {
		video.volume = 0;
		volumeRange.value = 0;
		volumeRange.style.background = `linear-gradient(to right, #bdae82 0%, #bdae82 ${0}%, #c8c8c8 ${0}%, #c8c8c8 100%)`
		console.log(currentVolume);

	} else {
		video.volume = currentVolume;
		volumeRange.value = currentVolume * 100
		volumeRange.style.background = `linear-gradient(to right, #bdae82 0%, #bdae82 ${currentVolume * 100}%, #c8c8c8 ${currentVolume
			* 100}%, #c8c8c8 100%)`
		console.log(currentVolume);
	}
})



function toggleVideo() {
	playButton.classList.toggle("controls__icon-play_pause");
	if (video.paused) {
		video.play();
		startButton.classList.add("player__play-button_none");
	} else {
		video.pause();
		startButton.classList.remove("player__play-button_none");
	};
}
console.log('%c  Самооценка 70/70 ', 'background: #222; color: #bada55');
console.log(`
Вёрстка +10
Кнопка Play/Pause на панели управления +10
Прогресс-бар отображает прогресс проигрывания видео. При перемещении ползунка прогресс-бара вручную меняется текущее время проигрывания видео. Разный цвет прогресс-бара до и после ползунка +10
При перемещении ползунка регулятора громкости звука можно сделать звук громче или тише. Разный цвет регулятора громкости звука до и после ползунка +10
При клике по кнопке Volume/Mute можно включить или отключить звук. Одновременно с включением/выключением звука меняется внешний вид кнопки. Также внешний вид кнопки меняется, если звук включают или выключают перетягиванием регулятора громкости звука от нуля или до нуля +10
Кнопка Play/Pause в центре видео +10
Очень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения +10 

`)
console.log('%c  Мои улучшения: При перемотке видео ползунком появляется время! + реализвана светлая и темная тема ', 'background: #222; color: #bada55');