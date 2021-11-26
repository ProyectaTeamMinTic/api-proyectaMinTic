//IMPORTS
import { ProgressModel } from "./progress.js";

//RESOLVER{
const progressResolvers = {
  //  DEFINICION DE QUERY
  Query: {
    Progresses: async (parent, args) => {
      //????
      const progresses = await ProgressModel.find()
        .populate("proyecto")
        .populate("creadoPor");
      return progresses;
    },

    Progress: async (parent, args) => {
      //???
      const progress = await ProgressModel.findById({
        proyecto: args._id,
      })
        .populate("proyecto")
        .populate("creadoPor");
      return progress;
    },
    //HACE FALTA QUERY DE OBSERVACIONES A LOS AVANCES
  },

  //  DEFINICIÓN DE MUTACIONES }
  Mutation: {
    createProgress: async (parents, args) => {
      const createdProgress = await ProgressModel.create({
        fecha: args.fecha,
        descripcion: args.descripcion,
        proyecto: args.proyecto,
        creadoPor: args.creadoPor,
      });
      return createdProgress;
    },

    updateProgress: async (parents, args) => {
      const updatedProgress = await ProgressModel.findByIdAndUpdate(
        args_id,
        {
          fecha: args.fecha, //FECHA AUTOMATICA
          descripcion: args.descripcion,
          proyecto: args.proyecto,
          creadoPor: args.creadoPor,
        },
        { new: true } //Para que el campo se actualice después de aplicar el findByIdAndUpdate (y en general todas las funciones de update)
      );
      return updatedProgress;
    },
    deleteProgress: async (parent, args) => {
      if (Object.keys(args).includes("_id")) {
        const deletedProgress = await ProgressModel.findOneAndDelete({
          _id: args._id,
        });
        return deletedProgress;
      }
    },
    //HACEN FALTA MUTACION PARA CREAR Y ACTUALIZAR OBSERVACIONES
  },
};

//EXPORT
export { progressResolvers };
