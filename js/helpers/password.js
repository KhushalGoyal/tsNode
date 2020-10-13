"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordHelper = void 0;
const bcrypt_1 = require("bcrypt");
const salt = 10;
class PasswordHelper {
    /**
     * Used to encrypt password
     * @param text - text password
     */
    static encrypt(text) {
        return bcrypt_1.hashSync(text, salt);
    }
    /**
     * compare hash and text password
     * @param text - text passowrd
     * @param hash - hash
     */
    static compare(text, hash) {
        return bcrypt_1.compareSync(text, hash);
    }
}
exports.PasswordHelper = PasswordHelper;
