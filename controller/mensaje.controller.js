import Mensaje from '../models/Mensaje.model.js';

const obtenerTodosLosMensajes = (req,res) => {
    res.send('Desde mensajes controlller');
}

const crearMensaje = async (req,res) => {
    //validaciones
    if(!req.usuario){
        return res.status(400).json({msg:'Error, algo salio mal'});
    }

    const { contenido } = req.body;
    let { destino } = req.body;
    const origen = req.usuario._id;

    if (!contenido || !destino) {
        return res.status(400).json({msg:'No podes mandar un msj vacio'});
    }

    const destino2 = JSON.parse(destino);

    if(!Number.isInteger(destino2)){
        return res.status(400).json({msg:'El destino tiene que ser solo números'});
    }
    
    destino = destino.toString();

    try {
        const mensaje = new Mensaje({contenido,destino,origen});
        await mensaje.save();
        return res.status(200).json({Msg:'Mensaje enviado!' , mensaje})
    } catch (error) {
        console.log(error);
    }
    
}


const actualizarMensaje = async (req,res) => {
    const { id } = req.params;
    const { contenido } = req.body;

    try {
        //Obtenemos el mensaje:
        const obtenerMensajeActualizar = await Mensaje.findById(id);

        if(!req.usuario){
            return res.status(400).json({msg:'Error en tokeen'});
        }
        //Chekeamos que el mensaje sea del que inicio sesion:
        if(obtenerMensajeActualizar.origen.toString() !== req.usuario._id.toString()){
            return res.status(400).json({msg: 'Tu no tienes permiso para actulizar éste mensaje'});
        }

        obtenerMensajeActualizar.contenido = contenido || obtenerMensajeActualizar.contenido;

        await obtenerMensajeActualizar.save();

        return res.status(200).json({msg:'Mensaje actualizado' , obtenerMensajeActualizar});
        

    }catch (error) {
        console.log(error);
    }

}

const borrarMensaje = async (req,res) => {
    const { id } = req.params;
    try {
        if(!req.usuario){
            return res.status(400).json({msg:'Error en tokeen'});
        }

        //Obtenemos el mensaje:
        const obtenerMensajeBorrar = await Mensaje.findById(id);

        //Chekeamos que el mensaje sea del que inicio sesion:
        if(obtenerMensajeBorrar.origen.toString() !== req.usuario._id.toString()){
            return res.status(400).json({msg: 'Tu no tienes permiso para borrar éste mensaje'});
        }

        //Boramos el msj:
        obtenerMensajeBorrar.remove();
        res.status(200).json({msg:'El mensaje se borro correctamente'});

    } catch (error) {
        console.log(error);
    }

}

const obtenerMensaje = async (req,res) => {
    const { id } = req.params;
    try {
        const mensaje = await Mensaje.findById(id);
        if(!mensaje){
            return res.status(400).json({msg:'Error no existe el msj'});
        }

        res.json(mensaje);
    } catch (error) {
        console.log(error);
    }
}

export {
    obtenerTodosLosMensajes,
    crearMensaje,
    actualizarMensaje,
    borrarMensaje,
    obtenerMensaje
}