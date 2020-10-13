"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const login_1 = __importDefault(require("./login"));
const authguard_1 = require("../services/authguard");
const AppController = express_1.Router();
AppController.use('/login', login_1.default);
AppController.get('/user', authguard_1.AuthGuard(), (req, res, next) => {
    res.status(200).send({
        success: true
    });
});
exports.default = AppController;
