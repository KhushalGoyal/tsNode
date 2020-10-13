"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokensHelper = exports.secretKey = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const appexception_1 = require("./appexception");
const envConfig_1 = require("../configs/envConfig");
exports.secretKey = "ajsdfhauYSFDAFDAHSVDgavhsgdfhagsfdghasfdhgavdhga";
class TokensHelper {
    static generateToken(payload, configs) {
        return jsonwebtoken_1.sign(payload, exports.secretKey, configs);
    }
    static verifyToken(token, verifyOptions) {
        return jsonwebtoken_1.verify(token, exports.secretKey, verifyOptions);
    }
    static decodeToken(token) {
        return jsonwebtoken_1.decode(token);
    }
    static getToken(authorization) {
        if (!authorization || authorization == "")
            appexception_1.AppException.create(envConfig_1.envConfig.statusCode.UNAUTHORIZED_ACCESS, "Authorization Header Not Found", envConfig_1.envConfig.errorCode.validation_error);
        const isBearer = authorization.startsWith("Bearer");
        if (!isBearer)
            appexception_1.AppException.create(envConfig_1.envConfig.statusCode.UNAUTHORIZED_ACCESS, "Access/Refresh Should be Type Of Bearer", envConfig_1.envConfig.errorCode.validation_error);
        const token = authorization.split(" ")[1];
        if (!token)
            appexception_1.AppException.create(envConfig_1.envConfig.statusCode.UNAUTHORIZED_ACCESS, "Access/Refresh Token Is Missing", envConfig_1.envConfig.errorCode.access_token_missing);
        return token;
    }
}
exports.TokensHelper = TokensHelper;
