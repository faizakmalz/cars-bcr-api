import express from "express";
import bodyParser from "body-parser";
import "./src/database/index";
import Router from "./src/routes/router";
import cors from 'cors';

const app = express();
const PORT = 3002;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(Router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
