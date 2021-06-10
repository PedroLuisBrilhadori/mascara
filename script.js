const video = document.getElementById('video');

const TEXTO = document.getElementById('texto');
const BODY = document.getElementById('borda');


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
    TEXTO.innerHTML = "";
    if(erro){
        console.log(erro)
        return;
    }
    // console.log(resultado)
    if(resultado[0].label === 'mascara'){
        console.log('mascara')
        TEXTO.innerHTML = "COM MASCARA";
        BODY.classList.remove("sem")
        BODY.classList.add("com")
    } else{
        TEXTO.innerHTML = "SEM MASCARA";
        BODY.classList.remove("com")
        BODY.classList.add("sem")
    }
        
}
