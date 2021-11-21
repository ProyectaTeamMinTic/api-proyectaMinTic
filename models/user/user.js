//IMPORTS
import mongoose from "mongoose";
const { Schema, model } = mongoose;
// import { Enum_Rol, Enum_EstadoUsuario } from "./enums";

//DEFINIR ESQUEMAS
const userSchema = new Schema({
  correo: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
      },
      message: 'El formato del correo electrónico está malo.',
    },
  },

  identificacion: {
    type: String,
    required: true,
    unique: true,
  },
  nombre: {
    type: String,
    required: true,
  },
  apellido: {
    type: String,
    required: true,
  },
  rol: {
    type: String,
    required: true,
    enum: ['ESTUDIANTE', 'LIDER', 'ADMINISTRADOR'],
  },
  estado: {
    type: String,
    enum: ['PENDIENTE', 'AUTORIZADO', 'NO_AUTORIZADO'],
    default: 'PENDIENTE',
  },
});

//METODOLOGIA 4 - VIRTUAL POPULATE (DESDE EL LADO 1 DE LA RELACIÓN)

//DEFINIR MODELO DEL OBJETO
const UserModel = model("User", userSchema);

//EXPORTACIÓN DEL MODELO
export { UserModel };
