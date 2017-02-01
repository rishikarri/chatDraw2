// this page is the main server

var http = require('http');
// bringing in http grabs the http module and sets it to http - now we have access to http variables - this is native to javascript
var fs = require('fs');

var socketIo = require('socket.io');

var socketUsers = []; 

// we need to handle a socket connection
// and we need to run code whenver  a socket connects

var io = socketIo.listen(server); 
io.sockets.on('connect', (socket)=>{

	// make an object and push it onto socket users
	socketUsers.push({
		socketID: socket.id,
		name: 'Anonymous'
	})

	// pass the users from the server to the client page - call the action users and send them the socketUsers arrray

	// io.sockets.emit('users', socketUsers);


})



var server = http.createServer((req, res)=>{
	console.log('hi someone connected to this server');

		console.log(req.url);

		if (req.url ==='/'){
			fs.readFile('index.html', 'utf-8', (error, fileData)=>{
				// if there is an error, write an error
				if(error){
					res.writeHead(500, {'content-type': 'text/html'});
					res.end(error);
				}else{
					// if there isn't an error, print out the file data
					res.writeHead(200, {'content-type': 'text/html'});
					console.log(fileData);
					res.end(fileData);
				}
			})			
		// }else{
		// 	console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&')
		// 	res.writeHead(404, {'content-type': 'text/html'});
		// 	res.end('error');
		}
		// if (error){
		// 	res.writeHead(500, {'content-type':'text/html'});
		// 	res.end(error);
		// }else{
		// 	res.end('hi');
		// }
		
});

server.listen(8000);
