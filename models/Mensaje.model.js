import mongoose from 'mongoose';



const mensajeSchema = new mongoose.Schema({
    contenido: {
        required:true,
        type:String
    },
    destino:{
        required:true,
        type:Number,
    },
    origen:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Usuario'
    }
},{
    timestamps:true
}
);


const mensaje = mongoose.model('mensaje', mensajeSchema);
export default mensaje;