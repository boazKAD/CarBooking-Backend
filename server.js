import express from 'express';
import morgan from 'morgan';
import  {connectToDatabase} from './src/batabase/db';

const app = express();

require('dotenv').config();
const port = process.env.port;

app.use(morgan("dev")); 

connectToDatabase();
app.get('/', (req, res) => {
  res.send('Whatsapp, Kigali!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});