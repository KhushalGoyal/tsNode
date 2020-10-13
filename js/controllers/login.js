"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const password_1 = require("../helpers/password");
const models_1 = require("../models");
const response_1 = require("../helpers/response");
const envConfig_1 = require("../configs/envConfig");
const token_1 = require("../helpers/token");
const LoginController = express_1.Router();
LoginController.post("/", async (request, response, next) => {
    try {
        let body = request.body;
        if (!body.username || !body.password) {
            response.status(envConfig_1.envConfig.statusCode.UNAUTHORIZED_ACCESS).send(new response_1.ErrorResponse("Invalid Request, Password/Username is missing", envConfig_1.envConfig.errorCode.validation_error));
        }
        let user = await models_1.UserModel.findOne({ username: body.username }).lean();
        if (user) {
            let isValid = password_1.PasswordHelper.compare(body.password, user.password);
            let token = token_1.TokensHelper.generateToken(user, { expiresIn: 60 * 60 });
            if (isValid) {
                response.status(envConfig_1.envConfig.statusCode.OK).send(new response_1.SuccessResponse({ token: token, type: "Bearer" }));
            }
            else {
                response.status(envConfig_1.envConfig.statusCode.UNAUTHORIZED_ACCESS).send(new response_1.ErrorResponse("Invalid Password", envConfig_1.envConfig.errorCode.validation_error));
            }
            return;
        }
        response.status(envConfig_1.envConfig.statusCode.UNAUTHORIZED_ACCESS).send(new response_1.ErrorResponse("User not found", envConfig_1.envConfig.errorCode.validation_error));
        return;
    }
    catch (err) {
        response.status(envConfig_1.envConfig.statusCode.UNPROCESSED_ENTITY).send(new response_1.ErrorResponse(err.message, envConfig_1.envConfig.errorCode.unprocessed_entry));
    }
});
exports.default = LoginController;
