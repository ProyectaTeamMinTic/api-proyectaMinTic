//IMPORTS
import mongoose from "mongoose";

//DEFINIR ESQUEMAS
const { Schema, model } = mongoose;

const userSchema = new Schema({
  correo: {
    type: String,
    required: true,
    unique: true,
    //Validacion del correo por medio de expresiones regulares
    validate: {
      validator: (email) => {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
      },
      message: 'El formato del correo electrónico no es valido.',
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
},
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//METODOLOGIA 4 - VIRTUAL POPULATE (DESDE EL LADO 1 DE LA RELACIÓN)
userSchema.virtual("Project", {
  ref: "Project",
  localField: "_id",
  foreignField: "nombre",//como traer varios foreignField de proyecto
});

//DEFINIR MODELO DEL OBJETO
const UserModel = model("User", userSchema);

//EXPORTACIÓN DEL MODELO
export { UserModel };
