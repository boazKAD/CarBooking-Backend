import express from 'express';
import morgan from 'morgan';
import  {connectToDatabase} from './src/batabase/db';
import router from './src/router/userRoute';

const app = express();
require('dotenv').config();
const port = process.env.port;

app.use(express.json());
app.use(morgan("dev")); 
app.use("/api",router)

connectToDatabase();
app.get('/', (req, res) => {
  res.send('Whatsapp, Kigali!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});