const video = document.getElementById('video');

if(navigator.mediaDevices.getUserMedia){
    navigator.mediaDevices.getUserMedia({video: true})
        .then(stream => {
            video.srcObject = stream;
      })
}

