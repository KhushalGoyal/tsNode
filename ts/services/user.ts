import { PaginateOptions, PaginateResult } from "mongoose";
import { User } from "../entities";
import { UserModel } from "../models/user";

export class UserService {
    async save(payload: User): Promise<User> {
        return (await UserModel.create(payload)).toObject();
    }
    async update(_id : string ,payload: User) : Promise<User> {
        return (await UserModel.findByIdAndUpdate({ _id : _id}, payload)).toObject();
    }
    async findById(id: string): Promise<User> {
        return UserModel.findById(id).lean() as any;
    }
    async pagination(filter: User, paginationOptions: PaginateOptions): Promise<PaginateResult<any>> {
        return UserModel.paginate(filter, paginationOptions);
    }
    async getAll(requestQuery: any): Promise<any> {
        requestQuery = requestQuery ? requestQuery : {};
        return UserModel.find(requestQuery).lean() as any;
    }
    async getByUserName(username : string): Promise<User> {
        return UserModel.findOne({ username : username }).lean() as any;
    }
    async addDefaultUser(payload : User): Promise<User> {
        return (await UserModel.create(payload)).toObject();
    }
}