//IMPORTS
import { UserModel } from "./user.js";
import bcrypt from "bcrypt";
import { registrationModel } from "../registration/registration.js";

//RESOLVER{
const userResolvers = {
  //   User: {
  //     inscripciones: async (parent, args) => {
  //       return registrationModel.find({ proyecto: parent._id });
  //     },
  //   },
  //  DEFINICION DE QUERY
  Query: {
    Users: async (parent, args, context) => {
      if (context.userData) {
        if (context.userData.rol === "LIDER") {
          const users = await UserModel.find({ rol: "ESTUDIANTE" });
          return users;
        } else if (context.userData.rol === "ADMINISTRADOR") {
          const users = await UserModel.find();
          return users;
        }
      }
    },
    User: async (parent, args) => {
      //virtual populate para traer informacion de proyectos de un lider
      const user = await UserModel.findOne({ _id: args._id })
        .populate("inscripciones")
        .populate("proyectos");
      return user;
    },
  },
  //  DEFINICIÓN DE MUTACIONES
  Mutation: {
    createUser: async (parent, args) => {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(args.password, salt);
      const createdUser = await UserModel.create({
        nombre: args.nombre,
        apellido: args.apellido,
        identificacion: args.identificacion,
        correo: args.correo,
        rol: args.rol,
        password: hashedPassword,
      });
      //validar dato por defecto
      if (Object.keys(args).includes("estado")) {
        createdUser.estado = args.estado;
      }
      return createdUser;
    },
    updateUser: async (parent, args) => {
      const updatedUser = await UserModel.findByIdAndUpdate(
        args._id,
        {
          nombre: args.nombre,
          apellido: args.apellido,
          identificacion: args.identificacion,
          correo: args.correo,
          estado: args.estado,
        },
        { new: true }
      );
      return updatedUser;
    },

    updateUserState: async (parent, args) => {
      const updatedUserState = await UserModel.findByIdAndUpdate(
        args._id,
        {
          estado: args.estado,
        },
        { new: true }
      );
      return updatedUserState;
    },

    deleteUser: async (parent, args) => {
      if (Object.keys(args).includes("_id")) {
        const deletedUser = await UserModel.findOneAndDelete({ _id: args._id });
        return deletedUser;
      } else if (Object.keys(args).includes("correo")) {
        const deletedUser = await UserModel.findOneAndDelete({
          correo: args.correo,
        });
        return deletedUser;
      }
    },
  },
};
//EXPORT
export { userResolvers };
