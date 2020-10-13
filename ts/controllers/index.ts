import { Router } from 'express';
import LoginController from './login';
import { AuthGuard } from '../services/authguard';


const AppController : Router = Router()

AppController.use('/login', LoginController)
AppController.get('/user', AuthGuard(), (req, res, next) =>{
    res.status(200).send({
        success: true
    })
})
export default AppController;