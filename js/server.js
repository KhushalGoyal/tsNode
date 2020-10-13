"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable import/first */
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const configs_1 = require("./configs");
const express_1 = require("./configs/express");
const app = express_1.ExpressApp.init();
/** Initiate mongo connection */
configs_1.MongooseService.connect();
app.listen(8080, () => {
    console.info(`server started on 8080`);
});
process.on('SIGINT', () => {
    configs_1.MongooseService.disconnect();
});
