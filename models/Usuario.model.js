import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import generarId from '../helpers/generarId.js';

const schemaUsuario = new mongoose.Schema({
    nombre : {
        type:String,
        required:true,
        trim:true
    },
    email : {
        type:String,
        required:true,
        unique:true
    },
    password: {
        type: String,
        required:true
    },
    token: {
        type:String,
        default: generarId()
    },
    verificado: {
        type:Boolean,
        default: false
    },
    celular: {
        type: Number,
        required:true,
        unique:true
    }
})

schemaUsuario.pre('save', async function(next) {
    if(!this.isModified('password')){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
})

schemaUsuario.methods.comprobarContraseña = async function (contraseniaForm) {
    return await bcrypt.compare(contraseniaForm, this.password);
}

const Usuario = mongoose.model('Usuario',schemaUsuario);

export default Usuario;