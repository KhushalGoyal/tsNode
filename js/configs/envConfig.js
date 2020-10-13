"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envConfig = void 0;
exports.envConfig = {
    server: {
        environment: "local"
    },
    database: {
        username: 'pranav',
        password: 'BfErJvXLeKXBYyyx',
        host: 'cluster0.agxqi.mongodb.net',
        name: 'test'
    },
    statusCode: {
        OK: 200,
        INTERNAL_SERVER_ERROR: 500,
        UNPROCESSED_ENTITY: 422,
        UNAUTHORIZED_ACCESS: 401,
        UNAUTHORIZED_TOKEN: 402,
        NOT_FOUND: 404,
        BAD_REQUEST: 400
    },
    errorCode: {
        validation_error: "validation_error",
        access_token_missing: "access_token_missing",
        token_expired: "token_expired",
        unprocessed_entry: "unprocessed_entry"
    },
    user: {
        email: 'pranav.patwardhan@wwindia.com',
        username: 'pranav@123',
        firstname: 'Pranav',
        lastname: 'Patwardhan',
        password: 'hyshv&661v@H'
    }
};
