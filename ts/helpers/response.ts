class BaseResponse {
    public success: boolean;
    public error_code: string;
    public message: any;

    protected constructor(success: boolean) {
        this.success = success;
    }

    protected setMessage(message: any): void {
        if (message) this.message = message;
    }

    protected setErrorCode(error_code: any): void {
        if (error_code) this.error_code = error_code;
    }
    
}

export class SuccessResponse extends BaseResponse {
    constructor(message? : any) {
        super(true);
        this.setMessage(message);
    }
}

export class ErrorResponse extends BaseResponse {
    constructor(message? : any, error_code? : any) {
        super(false);
        this.setMessage(message);
        this.setErrorCode(error_code)
    }
}
