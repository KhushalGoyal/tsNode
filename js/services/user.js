"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const user_1 = require("../models/user");
class UserService {
    async save(payload) {
        return (await user_1.UserModel.create(payload)).toObject();
    }
    async update(_id, payload) {
        return (await user_1.UserModel.findByIdAndUpdate({ _id: _id }, payload)).toObject();
    }
    async findById(id) {
        return user_1.UserModel.findById(id).lean();
    }
    async pagination(filter, paginationOptions) {
        return user_1.UserModel.paginate(filter, paginationOptions);
    }
    async getAll(requestQuery) {
        requestQuery = requestQuery ? requestQuery : {};
        return user_1.UserModel.find(requestQuery).lean();
    }
    async getByUserName(username) {
        return user_1.UserModel.findOne({ username: username }).lean();
    }
    async addDefaultUser(payload) {
        return (await user_1.UserModel.create(payload)).toObject();
    }
}
exports.UserService = UserService;
