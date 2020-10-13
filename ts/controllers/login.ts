import { Router, Request, Response, NextFunction } from "express";
import { PasswordHelper } from "../helpers/password";
import { UserModel } from "../models";
import { ErrorResponse, SuccessResponse } from "../helpers/response";
import { envConfig } from "../configs/envConfig";
import { TokensHelper } from "../helpers/token";
import { User } from "../entities";

const LoginController: Router = Router()


LoginController.post("/", async (request: Request, response: Response, next : NextFunction) => {
    try{
        let body = request.body;
        if(!body.username || !body.password){
            response.status(envConfig.statusCode.UNAUTHORIZED_ACCESS).send(new ErrorResponse("Invalid Request, Password/Username is missing", envConfig.errorCode.validation_error))
        }
        let user = await UserModel.findOne({ username : body.username }).lean() as any as User;
        if(user){
            let isValid = PasswordHelper.compare(body.password, user.password)
            let token = TokensHelper.generateToken(user, { expiresIn: 60 * 60 })
            if(isValid){
                response.status(envConfig.statusCode.OK).send(new SuccessResponse({ token : token, type : "Bearer"}))
            }else{
                response.status(envConfig.statusCode.UNAUTHORIZED_ACCESS).send(new ErrorResponse("Invalid Password", envConfig.errorCode.validation_error))
            }
            return
        }
        response.status(envConfig.statusCode.UNAUTHORIZED_ACCESS).send(new ErrorResponse("User not found", envConfig.errorCode.validation_error))
        return
    }catch(err){
        response.status(envConfig.statusCode.UNPROCESSED_ENTITY).send(new ErrorResponse(err.message, envConfig.errorCode.unprocessed_entry))
    }
})

export default LoginController;