import express from 'express';
import morgan from 'morgan';
import cors from "cors";
import bodyParser from "body-parser";
import  {connectToDatabase} from './src/batabase/db';
import router from './src/router/index';

const app = express();
app.use(cors());
require('dotenv').config();
const port = process.env.port || 5000;
// force
// const app = express();/
app.use(cors());
app.use(bodyParser.json({ limit: "50mb", type: "application/json" }));
app.use(express.json());
// force
app.use(express.json());
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev")); 
app.use("/api",router)

app.get('/', (req, res) => {
  res.send('Whatsapp, Kigali!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  connectToDatabase();
});