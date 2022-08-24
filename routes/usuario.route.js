import { crearUsuario,
     obtenerTodosLosUsuarios,
     confirmarCuenta,
     editarUsuario,
     eliminarUsuario,
     autenticarUsuario
     } from '../controller/usuario.controller.js';
import checkAuth from '../middleware/authMiddleware.js';
import {Router} from 'express';
const router = Router();

//Obtenemos todos los usuarios
router.get('/', obtenerTodosLosUsuarios)

//crear un nuevo usuario
router.post('/', crearUsuario)

//Autentnicar ususario
router.post('/autenticar' , autenticarUsuario);

//confirmar usuario token
router.get('/confirmar/:token' , confirmarCuenta)

//editar un usuario , tiene que estar autenticado
router.put('/:id' , checkAuth, editarUsuario);

//borrar un usuario, tiene que estar autenticado
router.delete('/:id' ,checkAuth, eliminarUsuario);

//Obtenemos un usuario en especifico
router.get('/:id' , (req,res) => {
    res.send('Desde usuarios routes');
})

export default router;