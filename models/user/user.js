//IMPORTS
import mongoose from "mongoose";
const { Schema, model } = mongoose;
// import { Enum_Rol, Enum_EstadoUsuario } from "./enums";

//DEFINIR ESQUEMAS
const userSchema = new Schema({
  correo: {
    type: String,
    required: true,
  },

  identificacion: {
    type: String,
    required: true,
  },
  nombre: {
    type: String,
    required: true,
  },
  apellido: {
    type: String,
    required: true,
  },
  //   rol: Enum_Rol;
  //   estado: Enum_EstadoUsuario;
});

//METODOLOGIA 4 - VIRTUAL POPULATE (DESDE EL LADO 1 DE LA RELACIÓN)

//DEFINIR MODELO DEL OBJETO

const UserModel = model("User", userSchema);

//EXPORTACIÓN DEL MODELO

export { UserModel };
