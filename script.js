let startBtn = document.getElementById('start');
let stopBtn = document.getElementById('stop');
let resetBtn = document.getElementById('reset');

let minute = 0;
let second = 0;
let count = 0;

startBtn.addEventListener('click', function () {	
	timer = true;
	stopWatch();
	
});

stopBtn.addEventListener('click', function () {
	timer = false;
});

resetBtn.addEventListener('click', function () {
	timer = false;
	minute = 0;
	second = 0;
	count = 0;
	document.getElementById('min').innerHTML = "00";
	document.getElementById('sec').innerHTML = "00";
	document.getElementById('count').innerHTML = "00";
	document.getElementById("life").style.backgroundColor = "white";
	const digits = document.getElementsByClassName("digit");
	for (const box of digits) {
		box.style.color = "#393951";
	}
	const txt = document.getElementsByClassName("txt");
	for (const tx of txt) {
		tx.style.color = "#393951";
	}
});

function stopWatch() {
	if (timer) {	
		document.getElementById("life").style.backgroundColor = "red";
		const digits = document.getElementsByClassName("digit");
		for (const box of digits) {
			box.style.color = "white";
		}
		const txt = document.getElementsByClassName("txt");
		for (const tx of txt) {
			tx.style.color = "white";
		}
		count++;
		light()

		if (count == 100) {
			second++;
			count = 0;
		}

		if (second == 60) {
			minute++;
			second = 0;
		}

		if (minute == 60) {
			minute = 0;
			second = 0;
		}
		let minString = minute;
		let secString = second;
		let countString = count;
		if (minute < 10) {
			minString = "0" + minString;
		}

		if (second < 10) {
			secString = "0" + secString;
		}

		if (count < 10) {
			countString = "0" + countString;
		}
		document.getElementById('min').innerHTML = minString;
		document.getElementById('sec').innerHTML = secString;
		document.getElementById('count').innerHTML = countString;
		setTimeout(stopWatch, 10);
	}
}

function light(){
const SUPPORTS_MEDIA_DEVICES = 'mediaDevices' in navigator;

if (SUPPORTS_MEDIA_DEVICES) {
  //Get the environment camera (usually the second one)
  navigator.mediaDevices.enumerateDevices().then(devices => {
  
    const cameras = devices.filter((device) => device.kind === 'videoinput');

    if (cameras.length === 0) {
      throw 'No camera found on this device.';
    }
    const camera = cameras[cameras.length - 1];

    // Create stream and get video track
    navigator.mediaDevices.getUserMedia({
      video: {
        deviceId: camera.deviceId,
        facingMode: ['user', 'environment'],
        height: {ideal: 1080},
        width: {ideal: 1920}
      }
    }).then(stream => {
      const track = stream.getVideoTracks()[0];

      //Create image capture object and get camera capabilities
      const imageCapture = new ImageCapture(track)
      const photoCapabilities = imageCapture.getPhotoCapabilities().then(() => {

        //todo: check if camera has a torch

        //let there be light!
        const btn = document.querySelector('.switch');
        btn.addEventListener('click', function(){
          track.applyConstraints({
            advanced: [{torch: true}]
          });
        });
      });
    });
  });
  
  //The light will be on as long the track exists
  
  
}
}
