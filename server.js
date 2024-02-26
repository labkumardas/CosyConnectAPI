"use strict";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import connectToMongoDB from './config/db.js';
import fileUpload from 'express-fileupload';
// import corsOptions from './config/whitelist.js';
import setupRoutes from './app/routes/index-route.js';
import loggers from './config/logger.js';
import connectSocket from './app/socket/socketManager.js';
import http from 'http';
const app = express();
let server = http.createServer(app);
import { Server } from 'socket.io';
dotenv.config();
process.env.TZ = process.env.TZ || 'Europe/London';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const { PORT } = process.env;
connectToMongoDB();


app.use(bodyParser.json());
app.use(
  fileUpload({
    limits: {
      fileSize: 1024 * 1024 * 100000,
    },
    createParentPath: false,
  })
);
//

app.use(cors());

// const io = new Server(server, {
//   cors: {
//     transports: ['websocket', 'polling'],
//     origin: '*',
//   },
// });


app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set("view engine", "ejs")
app.use(logger('dev'));
loggers(app)
app.use(express.static('views'));
app.get('/', (req, res) => {
  res.send(`Hey folks API-V1 running on port ${PORT} !!`);
});
const nowInDefaultTimeZone = new Date();
//route
setupRoutes(app);

// connect socket
connectSocket(server)

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} , ${nowInDefaultTimeZone.toLocaleString()}`);
})

app.get("/home", function (req, res) {
  res.render("home");
});



app.get("/test", function (req, res) {
  let a = [
    {
      address: "Ambala",
      preference: "100 km",
    },
    {
      address: "Mohalie",
      preference: "100 km",
    }
  ];

  let b = {
    address: "Mohali sector 71",
    preference: "110 km"
  };

  // Extracting the addresses from array a and the new address from object b
  let addressesToSearch = a.map(item => item.address);
  let newAddress = b.address;

  // Building a regular expression pattern for the text search
  let regexPattern = addressesToSearch.map(address => `(${address})`).join('|');
  let regex = new RegExp(regexPattern, 'i');

  // MongoDB query using $regex and $text
  let query = {
    $or: [
      { address: { $regex: regex, $options: 'i' } },
      { $text: { $search: newAddress } }
    ]
  };

  console.log(query);
  return res.json(query)

})