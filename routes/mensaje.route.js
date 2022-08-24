import {Router} from 'express';
import  { obtenerTodosLosMensajes,
          crearMensaje,
          actualizarMensaje,
          borrarMensaje,
          obtenerMensaje
        } from '../controller/mensaje.controller.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = Router();
//obtener todos los mensajes
router.get('/' , obtenerTodosLosMensajes);

//crear un mensaje
router.post('/' , authMiddleware , crearMensaje);

//actualizar un mensaje
router.patch('/:id', authMiddleware, actualizarMensaje);

//borrar un mensaje
router.delete('/:id' , authMiddleware , borrarMensaje);

//obtener mensaje en especifico
router.get('/:id' , authMiddleware , obtenerMensaje);

export default router;