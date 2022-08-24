import Usuario from '../models/Usuario.model.js';
import enviarEmailRegistro from '../helpers/enviarEmailRegistro.js';
import generarJWT from '../helpers/generarJWT.js';

const crearUsuario =  async (req,res) => {
    const {nombre,email,password,celular} = req.body;
    
    //Validaciones
    if(!nombre || !email || !password || !celular){
        return res.status(400).send('error en validacion de datos');
    }
    //guardar en bd
    try {
        const usuario = new Usuario(req.body);
        const usuarioGuardado = await usuario.save();

        //enviar emaill
        enviarEmailRegistro(usuario);

        //rta
        res.status(200).json(usuarioGuardado);
    } catch (error) {
        console.log(error);
    }

}

const confirmarCuenta = async (req,res) => {
    const { token } = req.params;
    const userConfirmar = await Usuario.findOne({token});
    if(!userConfirmar){
        return res.status(400).json( {msg: 'Error token no valido' });
    } 
    try {
        userConfirmar.token = null;
        userConfirmar.verificado = true;
        await userConfirmar.save();
        res.json( {msg: "usuario confirmado...."});   
    } catch (error) {
        console.log(error)
    }
}

const obtenerTodosLosUsuarios = async (req,res) => {
    try {
        const todosUsuarios = await Usuario.find().where('verificado').equals(true);
        res.json(todosUsuarios);   
    } catch (error) {
        console.log(error);
    }
}

const editarUsuario = async (req,res) => {
    const { id } = req.params;
    try {
        let usuario = await Usuario.findById(id);
        if(!usuario){
            return res.status(400).json({msg: 'Usuario no encontrado'});
        }
        
        usuario.nombre = req.body.nombre || usuario.nombre;
        usuario.celular = req.body.celular || usuario.celular;

        const guardado = await usuario.save(); 
        res.json( {msg: "Cambios hechos con exito" , datos: guardado} );
    } catch (error) {
        console.log(error);
    }
}

const eliminarUsuario = async (req,res) => {
    const { id } = req.params;
    const usuario = await Usuario.findById(id);
    if(!usuario){
        return res.status(400).json({msg: 'Error no existe id'});
    }
    await Usuario.findByIdAndDelete(id);
    res.status(200).json({msg: 'Usuario eliminado' , usuario});

}

const autenticarUsuario = async (req,res) => {
    const { email , password } = req.body;

    try {
    //verificamos que exista email en bd
    const user = await Usuario.findOne({email});
    if(!user){
        return res.status(400).json({msg: 'Error email no registrado'});
    }
    //verificamos que esté activo/confirmado
    if(!user.verificado){
        return res.status(400).json({msg: 'Error usuario no verificado'});
    }

    //verificamos contrasenia
    if (await user.comprobarContraseña(password)){
        res.json({ token:generarJWT(user.id) });
    }
    } catch (error) {
            console.log(error);
    }
}

export {
    crearUsuario,
    obtenerTodosLosUsuarios,
    confirmarCuenta,
    editarUsuario,
    eliminarUsuario,
    autenticarUsuario
}