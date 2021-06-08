const video = document.getElementById('video');

if(navigator.mediaDevices.getUserMedia){
    navigator.mediaDevices.getUserMedia({video: true})
        .then(stream => {
            video.srcObject = stream;
      })
}

let ModeloURL = 'https://teachablemachine.withgoogle.com/models/Bz10Ask6Q/'

ml5.imageClassifier(ModeloURL + 'model.json').then(classifier =>{
    iniciar(classifier);
})

let PrintVideo

function iniciar(classifier){
    setInterval(async() =>{
       ClassificarVideo(classifier); 
    }, 400)
}

function ClassificarVideo(classifier){
    PrintVideo = ml5.flipImage(video);
    classifier.classify(PrintVideo, PegarResultado)
}

function PegarResultado(erro, resultado){
    document.getElementById('texto').innerHTML = "";
    if(erro){
        console.log(erro)
        return;
    }
    // console.log(resultado)
    if(resultado[0].label === 'mascara'){
        console.log('mascara')
        document.getElementById('texto').innerHTML = "MASCARA";
    } else{
        document.getElementById('texto').innerHTML = "SEM MASCARA";
    }
        
}
