import express from "express";
import bodyParser from "body-parser";
import "./src/database/index";
import Router from "./src/routes/router";
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.DB_PORT;

const pw = process.env.DB_PASSWORD;

console.log('first', pw);

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(Router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
