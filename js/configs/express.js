"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressApp = void 0;
/* eslint-disable @typescript-eslint/no-var-requires */
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const controllers_1 = __importDefault(require("../controllers"));
class ExpressApp {
    static middlewares() {
        this.app = express_1.default();
        this.app.use(express_1.default.static(path_1.default.join(__dirname, '../../public')));
        this.app.use(cors_1.default());
        this.app.use(body_parser_1.default.urlencoded({ extended: true, limit: "10mb" }));
        this.app.use(body_parser_1.default.json({ limit: "10mb" }));
        this.app.use(morgan_1.default("combined"));
        this.app.use("/api", controllers_1.default);
    }
    static init() {
        this.middlewares();
        return this.app;
    }
}
exports.ExpressApp = ExpressApp;
ExpressApp.app = undefined;
