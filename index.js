
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import connectDB from './database.js';
import LinkRouter from './routers/linkRouter.js';
import UserRouter from './routers/userRouter.js';
import requestIp from 'request-ip';

connectDB();
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(requestIp.mw());

const port = 3000;

app.use("/user", UserRouter);
app.use("/link", LinkRouter);

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});