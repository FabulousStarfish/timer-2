let startBtn = document.getElementById('start');
let stopBtn = document.getElementById('stop');
let resetBtn = document.getElementById('reset');

let minute = 0;
let second = 0;
let count = 0;

startBtn.addEventListener('click', function () {	
	timer = true;	
	toggleFlashlight();
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

function toggleFlashlight() {
	if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
		navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
			.then(function(stream) {
				const track = stream.getVideoTracks()[0];
				const imageCapture = new ImageCapture(track);

				imageCapture.getPhotoCapabilities()
					.then(function(photoCapabilities) {
						if (photoCapabilities.fillLightMode.includes('flash')) {
							track.applyConstraints({
								advanced: [{ torch: true }]
							});
						}
					})
					.catch(function(error) {
						console.error('Error getting photo capabilities: ', error);
					});
			})
			.catch(function(error) {
				console.error('Error accessing camera: ', error);
			});
	} else {
		console.error('getUserMedia is not supported in this browser.');
	}
}