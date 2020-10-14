const recorderContainer = document.getElementById('jsRecorderContainer');
const recordBtn = document.getElementById('jsRecordButton');
const videoPreview = document.getElementById('jsVideoPreview');

let streamObject;
let videoRecorder;

function handleVideoData(event) {
	const { data } = event;
	const link = document.createElement('a');
	link.href = URL.createObjectURL(data);
	link.download = 'recorded.webm';
	document.body.appendChild(link);
	link.click();
}

function stopVideoStream(video) {
	const stream = video.srcObject;
	const tracks = stream.getTracks();
	tracks.forEach((track) => {
		track.stop();
	});
	video.srcObject = null;
}

function stopRecroding() {
	videoRecorder.stop();
	recordBtn.innerHTML = 'Start recording';
	recordBtn.addEventListener('click', getVideo);
	stopVideoStream(videoPreview);
	recordBtn.removeEventListener('click', stopRecroding);
}

function startRecording() {
	videoRecorder = new MediaRecorder(streamObject);
	videoRecorder.start();
	videoRecorder.addEventListener('dataavailable', handleVideoData);
	recordBtn.addEventListener('click', stopRecroding);
}

async function getVideo() {
	try {
		const stream = await navigator.mediaDevices.getUserMedia({
			audio: true,
			video: { width: 1280, height: 720 },
		});
		videoPreview.srcObject = stream;
		videoPreview.muted = true;
		videoPreview.play();
		recordBtn.innerHTML = 'Stop recording';
		streamObject = stream;
		startRecording();
	} catch (err) {
		recordBtn.innerHTML = '😅 failed to start recording';
	} finally {
		recordBtn.removeEventListener('click', getVideo);
	}
}

function init() {
	recordBtn.addEventListener('click', getVideo);
}

if (recorderContainer) {
	init();
}
