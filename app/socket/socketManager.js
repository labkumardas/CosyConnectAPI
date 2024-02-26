"use strict";


// Global imports
import { Server } from 'socket.io';
import messageModel from "../model/messageModel.js"

async function connectSocket(server) {
  const io = new Server(server, {
    cors: {
      transports: ['websocket', 'polling'],
      origin: '*',
    },
  });

  let socketData = [];
  io.on('connection', (socket) => {
    console.log('Socket connected' + socket.id);

    socket.on("message", async (data) => {
      console.log('received data' + data);
      const f_data = {
        senderId: data.senderId,
        message: data.message,
        receiverId: data.receiverId,
        senderRole: data.senderRole
      };

      const find_id = await messageModel.create(f_data);

      if (find_id) {
        const getInfo = await messageModel.findOne({ _id: find_id._id })
        // .populate({
        // path: "users",
        // select: "first_name last_name profile_picture username ",
        // });

        io.emit("message", JSON.stringify({ getInfo }));
      }

    })

    socket.on('disconnect', () => {
      // console.log('Socket disconnected ' + socket.id);
      // let index = socketData.findIndex((data) => data.socket_id === socket.id);
      // if (index > -1) socketData.splice(index, 1);
    });
  });
}



export default connectSocket; 