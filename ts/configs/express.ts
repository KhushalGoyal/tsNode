/* eslint-disable @typescript-eslint/no-var-requires */
import express, { Express } from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import AppController from "../controllers";

export class ExpressApp {
    private static app: Express = undefined;

    private static middlewares(): void {
        this.app = express();
        this.app.use(express.static(path.join(__dirname, '../../public')));
        this.app.use(cors());
        this.app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));
        this.app.use(bodyParser.json({ limit: "10mb" }));
        this.app.use(morgan("combined"));
        this.app.use("/api", AppController);
    }

    public static init(): Express {
        this.middlewares();
        return this.app;
    }
}
