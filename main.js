img="";
status="";
objects=[];

function setup()
{
   canvas=createCanvas(700, 500);
   canvas.center();
   video=createCapture(VIDEO);
   video.size(700, 500);
   video.hide();
}

function draw()
{
image(video,0, 0, 700, 500);
if(status!="")
{
   r=random(255);
   g=random(255);
   b=random(255);
   for(i=0; i<objects.length; i++)
   {
      objectDetector.detect(video, gotResult);
      document.getElementById("status").innerHTML= "Status: Object Detected";
      document.getElementById("number_of_objects").innerHTML="Number OF Object Detected Are: "+object.length;
      fill(r,g,b);
      percent=floor(objects[i].confidence*100);
      text(objects[i].label+"  "+percent+"%", objects[i].x+15,objects[i].y+15);
      noFill();
      stroke(r,g,b);
      rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
   }
}
}  
function modelLoaded()
{
   console.log('modelLoaded!')
   status=true;
}

function gotResult(error, results)
{
   if(error)
   {
      console.log(error);
   }
   console.log(results);
   objects=results;
}
function start()
{
   objectDetector=ml5.objectDetector('cocossd', modelLoaded);
   document.getElementById("status").innerHTML = "STATUS:- Detecting Objects";
}