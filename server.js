var express = require('express');
var app = express();
http = require('http'),
socketIo = require('socket.io');
app.set('port', (process.env.PORT || 8080));
app.use(express.static(__dirname + '/public'));
var server = http.createServer(app);
var io = socketIo.listen(server);
var connectCounter = 0;
server.listen(app.get('port'), function() {
console.log('clickwar is running on port', app.get('port'));
});

io.on('connection', function(socket) {

if(io.engine.clientsCount <2){
io.emit('user',{
user:"Blue",
clients: io.engine.clientsCount
}) ;

}

if(io.engine.clientsCount >1){

io.emit('user',{user:"Red",
clients: io.engine.clientsCount}) ;

   io.emit('gamestart');
}

    
    
    
    
socket.on("click",function(data){
var movement = 0;
if(data.button == "leftmove"){
movement = 5;    
}
    
else if(data.button == "rightmove"){
movement = -5;    
}
    
    
io.emit('movebar', {movement:movement + data.width + "%"});


});//scan detected
    
});//io on connect

