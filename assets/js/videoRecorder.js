const recorderContainer = document.getElementById('jsRecorderContainer');
const recordBtn = document.getElementById('jsRecordButton');
const videoPreview = document.getElementById('jsVideoPreview');

async function startRecording() {
	try {
		const stream = await navigator.mediaDevices.getUserMedia({
			audio: true,
			video: true,
		});
		console.log(stream);
	} catch (err) {
		recordBtn.innerHTML = '😅 failed to start recording';
		recordBtn.removeEventListener('click', startRecording);
		console.log(err);
	}
}

function init() {
	recordBtn.addEventListener('click', startRecording);
}

if (recorderContainer) {
	init();
}
