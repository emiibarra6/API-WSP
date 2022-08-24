import {Router} from 'express';
import routerMensaje from './mensaje.route.js';
import routerUsuario from './usuario.route.js';

    function apiRoute(app){
        const router = Router();
        app.use('/api/v1', router);
        router.use('/mensaje' , routerMensaje);
        router.use('/usuario' , routerUsuario);
    }


export default apiRoute;