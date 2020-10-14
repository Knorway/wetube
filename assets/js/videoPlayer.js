const videoContainer = document.getElementById('jsVideoPlayer');
const videoPlayer = document.querySelector('#videoItSelf');
const playBtn = document.getElementById('jsPlayButton');
const volumeBtn = document.getElementById('jsVolumeButton');
const fullScreenBtn = document.getElementById('jsFullScreen');
const currentTime = document.getElementById('currentTime');
const totalTime = document.getElementById('totalTime');
const volumeRange = document.getElementById('jsVolume');

function handlePlayClick() {
	if (videoPlayer.paused) {
		videoPlayer.play();
		playBtn.innerHTML = '<i class="fas fa-pause"></i>';
	} else {
		videoPlayer.pause();
		playBtn.innerHTML = '<i class="fas fa-play"></i>';
	}
}

function handleVolumeClick() {
	if (videoPlayer.muted) {
		videoPlayer.muted = false;
		volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
		volumeRange.value = videoPlayer.volume;
	} else {
		volumeRange.value = 0;
		videoPlayer.muted = true;
		volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
	}
}

function goFullScreen() {
	if (videoContainer.requestFullscreen) {
		videoContainer.requestFullscreen();
	} else if (videoContainer.mozRequestFullscreen) {
		videoContainer.mozRequestFullscreen();
	} else if (videoContainer.webkitRequestFullscreen) {
		videoContainer.webkitRequestFullscreen();
	} else if (videoContainer.msRequestFullscreen) {
		videoContainer.msRequestFullscreen();
	}
	fullScreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
	fullScreenBtn.removeEventListener('click', goFullScreen);
	fullScreenBtn.addEventListener('click', exitFullScreen);
}

function exitFullScreen() {
	if (document.exitFullscreen) {
		document.exitFullscreen();
	} else if (document.mozCancelFullscreen) {
		document.mozCancelFullscreen();
	} else if (document.webkitExitFullscreen) {
		document.webkitExitFullscreen();
	} else if (document.msExitFullscreen) {
		document.msExitFullscreen();
	}
	fullScreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
	document.exitFullscreen();
	// 왜 이게 문제가 됐던 거지? 이후로 추가되는 이벤트 리스너가 전부 작동을 안한다.
	// 역할이 끝나기 전에 지워서 그랬던 거 같다.
	fullScreenBtn.addEventListener('click', goFullScreen);
	fullScreenBtn.removeEventListener('click', exitFullScreen);
}

function formatData(seconds) {
	const secondsNumber = parseInt(seconds, 10);
	let hours = Math.floor(secondsNumber / 3600);
	let minutes = Math.floor((secondsNumber - hours * 3600) / 60);
	let totalSeconds = secondsNumber - hours * 3600 - minutes * 60;

	if (hours < 10) {
		hours = `0${hours}`;
	}
	if (minutes < 10) {
		minutes = `0${minutes}`;
	}
	if (totalSeconds < 10) {
		totalSeconds = `0${totalSeconds}`;
	}
	return `${hours}:${minutes}:${totalSeconds}`;
}

function getCurrentTime() {
	currentTime.innerHTML = formatData(videoPlayer.currentTime);
}

function setTotalTime() {
	const totlaTimeString = formatData(videoPlayer.duration);
	totalTime.innerHTML = totlaTimeString;
	// setInterval(getCurrentTime, 1000);
}

function handleEnded() {
	videoPlayer.currentTime = 0;
	playBtn.innerHTML = '<i class="fas fa-play"></i>';
}

function handleDrag(event) {
	const {
		target: { value },
	} = event;
	videoPlayer.volume = value;
	if (value >= 0.6) {
		volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
	} else if (value >= 0.2) {
		volumeBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
	} else {
		volumeBtn.innerHTML = '<i class="fas fa-volume-off"></i>';
	}
}

function init() {
	videoPlayer.volume = 0.5;
	// videoPlayer.currentTime = 70;
	playBtn.addEventListener('click', handlePlayClick);
	volumeBtn.addEventListener('click', handleVolumeClick);
	fullScreenBtn.addEventListener('click', goFullScreen);
	videoPlayer.addEventListener('ended', handleEnded);
	videoPlayer.addEventListener('loadedmetadata', setTotalTime);
	videoPlayer.addEventListener('timeupdate', getCurrentTime);
	volumeRange.addEventListener('input', handleDrag);
}

if (videoContainer) {
	init();
}
