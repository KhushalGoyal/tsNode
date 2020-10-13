import { TokensHelper } from "../helpers/token";
import { User } from "../entities";
import { envConfig } from "../configs/envConfig";
import { ErrorResponse } from "../helpers";

export function AuthGuard(): any {
    return (request: any, response: any, next: any) => {
        try {
            const hash = TokensHelper.getToken(request.headers.authorization);
            const tokenPayload = TokensHelper.verifyToken<User>(hash);
            response.locals.user = tokenPayload;
            next();
        } catch (error) {
            console.log(error);
             if(error.name == "TokenExpiredError"){
                error.statusCode = envConfig.statusCode.UNAUTHORIZED_ACCESS;
                error.errorCode = envConfig.errorCode.token_expired;
            }
            response.status(error.statusCode).send(new ErrorResponse(error.message, error.errorCode))
            return;
        }
    }
}