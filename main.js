prediction_1="";
prediction_2="";

Webcam.set({

    width:350,
    height:300,
    image_format:'png',
    png_quality:90

})

Camera=document.getElementById("camera");

Webcam.attach("#camera");

function takeSnapshot(){

    Webcam.snap(function (data_uri){

        document.getElementById("result").innerHTML='<img id="IMG" src="'+data_uri+'"/>';

    });

}

console.log("ml5version",ml5.version);

classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/tmSrBONjq/model.json", model_loaded);

function model_loaded(){

    console.log("model loaded");

}

function speak(){

    synth=window.speechSynthesis;
    speak_data="The first prediction is "+prediction_1+" And the second prediction is "+prediction_2;
    var utterThis= new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);

}

function PredictEmoji(){

    image=document.getElementById("IMG");
    classifier.classify(image, getResults);

}

function getResults(error,results){

    if(error){

        console.error(error);

    }
    else{

        console.log(results);
        document.getElementById("p1").innerHTML=results[0].label;
        document.getElementById("p3").innerHTML=results[1].label;
        prediction_1=results[0].label;
        prediction_2=results[1].label;
        speak();
        if(results[0].label=="happy"){

            document.getElementById("p2").innerHTML="&#128522;";

        }
        if(results[0].label=="angry"){

            document.getElementById("p2").innerHTML="&#128548;";

        }
        if(results[0].label=="sad"){

            document.getElementById("p4").innerHTML="&#128532;";

        }
        if(results[1].label=="happy"){

            document.getElementById("p4").innerHTML="&#128522;";

        }
        if(results[1].label=="angry"){

            document.getElementById("p4").innerHTML="&#128548;";

        }
        if(results[1].label=="sad"){

            document.getElementById("p4").innerHTML="&#128532;";

        }

    }

}