/* eslint-disable import/first */
import dotenv from "dotenv";

dotenv.config();

import { MongooseService } from "./configs";
import { ExpressApp } from "./configs/express";

const app = ExpressApp.init();

/** Initiate mongo connection */
MongooseService.connect();

app.listen(8080, () => {
  console.info(`server started on 8080`);
});

process.on('SIGINT', () => {
  MongooseService.disconnect();
});