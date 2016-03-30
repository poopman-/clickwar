var rfid = 12345678;
var device_id = 13;
var user = "";
$(document).on("ready",function(){
    
var socket = io.connect('http://localhost:8080');

$(".circle").on("click.war",function(){
 var button = $(this).attr("id");   
 var bar_width =  ($(".progress-bar").width()/$(".progress").width()*100)
 socket.emit('click', {
            button: button,
            width: bar_width
 });
    
});//circle on hover    

    socket.on('movebar', function(movement) {
        $(".progress-bar").css("width", movement.movement)
       
    })//socket message
$(".circle").one("click.war",function(){
    setInterval(function(){
        if(($(".progress-bar").width()/$(".progress").width()*100)>99.99){
            //right wins
$("#output").text("Blue wins");
$(window).off(".war");
        }
        else if(($(".progress-bar").width()/$(".progress").width()*100)<0){
            //left wins
$("#output").text("Red wins");
$(window).off(".war");
        }
   else if(($(".progress-bar").width()/$(".progress").width()*100)>55){
            //right wins
$("#output").text("Blue is winning!");
$("#output").removeClass("text-muted").removeClass("text-danger").addClass("text-primary")
        }    
   else if(($(".progress-bar").width()/$(".progress").width()*100)<45){
            //right wins
$("#output").text("Red is winning!");
$("#output").removeClass("text-muted").removeClass("text-primary").addClass("text-danger")
        }
        else if(($(".progress-bar").width()/$(".progress").width()*100)<55){
            //right wins
$("#output").text("You are even");
$("#output").removeClass("text-danger").removeClass("text-primary").addClass("text-muted")
        }
        
    },100)
})
socket.on('user',function(data){
console.log(data.clients)
if (user !=="Blue"){
    user = data.user
}
})
 socket.on('gamestart', function() {
$("#user").text("You are the "+user+" user.")
 $("#waiting p").text("User found!")
setTimeout(function(){$("#waiting p").text("Starting in 3 "+user)   },500)    
setTimeout(function(){$("#waiting p").text("Starting in 2 "+user)   },1000)   
setTimeout(function(){$("#waiting p").text("Starting in 1 "+user)   },1500) 
setTimeout(function(){$(".overlay").remove();   },2000) 
 });//gamestart
socket.emit('bam',{});
})//document ready