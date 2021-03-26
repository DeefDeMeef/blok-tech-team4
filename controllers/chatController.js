const User = require(`../models/user`);
const io = require(`socket.io`)(4000, {
    cors: {
      origin: `*`,
    },
  });

exports.chatWindow = async (req, res) => {
    res.render('chat', {
        title: `Chat Window`,
        name: req.session.userEmail,
    })

      const user = req.session.userEmail;
  
      io.on(`connection`, (socket) => {
        socket.broadcast.emit(`user-connected`, req.session.userEmail);
        console.log(req.session.userEmail)
        // socket.on(`new-user`, (name) => {
        //   users[socket.id] = name;
      
        //   socket.broadcast.emit(`user-connected`, name);
          
        //   console.log(users, socket.id);
        // });
      
        socket.on('create', function (room) {
          socket.join('voetbal');
        });
      
        socket.on(`send-chat-message`, (message) => {
          socket.broadcast.emit(`chat-message`, {
            message, // komt van client
            name: req.session.userEmail, // set mail as username
          });
        });
      
        socket.on(`disconnect`, () => {
          socket.broadcast.emit(`user-disconnected`, users[socket.id]);
      
          delete users[socket.id];
        });
      });

}


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