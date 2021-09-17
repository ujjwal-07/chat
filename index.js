const { Socket } = require('socket.io');
const mongoose = require("mongoose")
const express = require("express")
const app = express()
const bodyParser = require("body-parser");
const Msg = require("./chatDbModal");


// Parsers for POST data
app.use(express.json({limit: '20mb'}));
app.use(express.urlencoded({ extended: false, limit: '20mb' }));
app.use(express.static('public'))
DB = "mongodb://localhost:27017/chat"

mongoose.connect(DB,{ useNewUrlParser: true ,useUnifiedTopology: true});

mongoose.connection.once('open',()=>{
   console.log("Connected to Db");

}).on('err',(err)=>{
   console.log('error is : ',err);
})


mongoose.connect()
const io = require('socket.io')(8000, {
    cors: {
      origin: '*',
    }
  });
const users = {};

io.on('connection', socket=>{
    socket.on('new-user-joined', name=>{
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });

    socket.on('send', msg=>{
        const message = new Msg({msg})
        message.save().then(()=>
        socket.broadcast.emit('receive', { name: users[socket.id],message: msg})
        )
    });
    socket.on('disconnect', message=>{
        socket.broadcast.emit('left', { name: users[socket.id],message: message})
        delete users[socket.id];
    });

})

















// const { Socket } = require('socket.io');

// const io = require('socket.io')(8000, {
//     cors: {
//       origin: '*',
//     }
//   });
// const users = {};

// io.on('connection', socket=>{
//     socket.on('new-user-joined', name=>{
//         users[socket.id] = name;
//         socket.broadcast.emit('user-joined', name);
//     });

//     socket.on('send', message=>{
//         socket.broadcast.emit('receive', { name: users[socket.id],message: message})
//     });
//     socket.on('disconnect', message=>{
//         socket.broadcast.emit('left', { name: users[socket.id],message: message})
//         delete users[socket.id];
//     });

// })