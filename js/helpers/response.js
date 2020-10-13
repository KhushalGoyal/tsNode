"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorResponse = exports.SuccessResponse = void 0;
class BaseResponse {
    constructor(success) {
        this.success = success;
    }
    setMessage(message) {
        if (message)
            this.message = message;
    }
    setErrorCode(error_code) {
        if (error_code)
            this.error_code = error_code;
    }
}
class SuccessResponse extends BaseResponse {
    constructor(message) {
        super(true);
        this.setMessage(message);
    }
}
exports.SuccessResponse = SuccessResponse;
class ErrorResponse extends BaseResponse {
    constructor(message, error_code) {
        super(false);
        this.setMessage(message);
        this.setErrorCode(error_code);
    }
}
exports.ErrorResponse = ErrorResponse;
