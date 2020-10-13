"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuard = void 0;
const token_1 = require("../helpers/token");
const envConfig_1 = require("../configs/envConfig");
const helpers_1 = require("../helpers");
function AuthGuard() {
    return (request, response, next) => {
        try {
            const hash = token_1.TokensHelper.getToken(request.headers.authorization);
            const tokenPayload = token_1.TokensHelper.verifyToken(hash);
            response.locals.user = tokenPayload;
            next();
        }
        catch (error) {
            console.log(error);
            if (error.name == "TokenExpiredError") {
                error.statusCode = envConfig_1.envConfig.statusCode.UNAUTHORIZED_ACCESS;
                error.errorCode = envConfig_1.envConfig.errorCode.token_expired;
            }
            response.status(error.statusCode).send(new helpers_1.ErrorResponse(error.message, error.errorCode));
            return;
        }
    };
}
exports.AuthGuard = AuthGuard;
