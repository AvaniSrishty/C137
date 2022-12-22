status = "";
object = [];

function setup(){
    canvas = createCanvas(500, 400);
    canvas.position(390, 300);
    video = createCapture(VIDEO);
    video.hide();
    video.size(500, 400);
}

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelloaded);
    document.getElementById("status").innerHTML = "Status = Detecting Object";
    input = document.getElementById("input_id").value;

}

function modelloaded(){
    console.log("model is ready to work");
    status = true;
}

function draw(){
    console.log("draw function is working");
    image(video, 0, 0, 500, 400);
    if(status != ""){
        // console.log("if function is working");
        objectDetector.detect(video ,gotResult);
       for(i = 0; i < object.length; i++){
        
          percent = floor(object[i].confidence * 100);
          fill("blue");
          text(object[i].label + "" + percent + "%", object[i].x +15, object[i].y +15);
          noFill();
          stroke("green");
          rect(object[i].x, object[i].y, object[i].width, object[i].height);
         
          


          if(object[i].label == input){
            video.stop();
            objectDetector.detect(gotResult);
            document.getElementById("object_found").innerHTML = input + "Found";
            var synth = window.speechSynthesis;
            var utterThis = new SpeechSynthesisUtterance(input + "Found");
            synth.speak(utterThis);
        }
        else{
            document.getElementById("object_found").innerHTML = input + " Not Found";
        }

        }
    }
}

function gotResult(error, result){
    if(error){
       console.log(error);
    }
       console.log(result);
       object = result;
}