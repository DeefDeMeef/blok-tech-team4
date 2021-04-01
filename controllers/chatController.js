const User = require(`../models/user`);
const formatMessage = require('../controllers/util/message')
const { userJoin, getCurrentUser, userLeave } = require('../controllers/util/user')
const io = require(`socket.io`)(4000, {
  cors: {
    origin: `*`,
  },
});


exports.chatWindow = async (req, res) => {
  const loggedUser = await User.findOne({ email: req.session.userEmail });
  console.log(loggedUser.profile.sport)
  res.render(`chat`, {
        title: `Chat Window`,
        name: loggedUser.profile.name,
        room: loggedUser.profile.sport,
    })
  }

    const bot = 'R2D2'
  
    io.on('connection', socket => {
      socket.on('joinRoom', ({ username, roomUser }) => {
        const user = userJoin(socket.id, username, roomUser);

        socket.join(user.room)

        socket.emit('message', formatMessage(bot, 'Welkom in deze chat!'))

        socket.broadcast
          .to(user.room).emit('message', formatMessage(bot, `${user.username} is gejoined`))
      })

      socket.on('chatMessage', message => {
        const user = getCurrentUser(socket.id)
        io.to(user.room).emit('message', formatMessage(user.username, message))
      })

      socket.on('disconnect', () => {
        const user = userLeave(socket.id)

        if (user) {
          io.to(user.room).emit('message', formatMessage(bot, `${user.username} is weggegaan`))
        }
      })
    })
  
  

      // io.on(`connection`, (socket) => {

      //   socket.on('create', function (room) {
      //     socket.join(room);
      //   });

      //   socket.in(room).emit(`user-connected`, req.session.userEmail, room);
      //   console.log(req.session.userEmail)
      //   socket.on(`new-user`, (name) => {
      //     users[socket.id] = req.session.userEmail;
      //     socket.in(room).emit('message', 'what is going on, party people?');
          
      //     // socket.broadcast.emit(`user-connected`, name, room);

      //   });
      
      //   socket.on(`send-chat-message`, (message) => {
      //     socket.in(room).emit(`chat-message`, {
      //       message, // komt van client
      //       name: req.session.userEmail, // set mail as username
      //     });
      //   });
      
      //   socket.on(`disconnect`, () => {
      //     socket.broadcast.emit(`user-disconnected`, users[socket.id]);
      
      //     delete users[socket.id];
      //   });
      // });




// try {
//     // vind de gebruiker die inlogd is
//     await User.find(
//       { email: req.session.userEmail },
//       `_id email`,
//       async (err, obj) => {
//         console.log(obj);
//         if (obj) {
//           // vind alle gebruikers != ingelogde user
//           await User.find(
//             { email: { $ne: req.session.userEmail } },
//             `_id email `,
//             async (err, obj2) => {
//               console.log(obj2);
//               res.render('chat', {
//                 title: `Chat Window`,
//                 name: req.session.userEmail,
//                 otherUsers: obj2,
//             })
//             }
//           );
//         }
//       }
//     );
//   } catch (error) {
//     console.log(error);
//   }