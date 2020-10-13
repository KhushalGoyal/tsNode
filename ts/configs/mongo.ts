import { connect, Mongoose, set, model } from 'mongoose';
import { envConfig } from './envConfig';
import { UserService } from '../services';
import { PasswordHelper } from '../helpers/password';

export class MongooseService {
    private static mongoConnection: Mongoose = undefined;

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    private constructor() {}

    public static async connect(): Promise<void> {
        set("debug", (envConfig.server.environment === "local"));
        const { username, password, host, name } = envConfig.database;
        // eslint-disable-next-line max-len
        const mongoUrl = `mongodb+srv://${username}:${password}@${host}/${name}?ssl=true&authSource=admin&retryWrites=true`;
        if (!this.isConnected()) {
            connect(mongoUrl, {
                useUnifiedTopology: true,
                useNewUrlParser: true,
                useFindAndModify: false,
                socketTimeoutMS: 60000,
                connectTimeoutMS: 60000,
            })
            .then(async (connection) => {
                this.setConnection(connection);
                const userService = new UserService()
                console.info(`successfully connected to database`);
                let user = await userService.getByUserName(envConfig.user.username)
                console.log(user)
                if(!user){
                    envConfig.user.password = PasswordHelper.encrypt(envConfig.user.password)
                    let result = await userService.addDefaultUser(envConfig.user);
                }
            })
            .catch((err) => {
                console.warn(`mongo connection error`, err);
            });
        } else {
            console.info(`Database Already Connected`);
        }
    }

    public static setConnection(connection: Mongoose): void {
        this.mongoConnection = connection;
        this.mongoConnection.connection.on("disconnected", () => {
            console.info("database connection closed");
        });
    }

    public static isConnected(): boolean {
        if (this.mongoConnection && this.mongoConnection.connection) {
            const { readyState } = this.mongoConnection.connection;
            console.info(`MongoDB ready state = ${readyState}`);
            return readyState === 1;
        }
        return false;
    }

    public static getConnection(): Mongoose {
        return this.mongoConnection;
    }

    public static disconnect(): void {
        this.mongoConnection.connection.close(() => {
            this.mongoConnection = undefined;
            process.exit(0);
        });
    }
}