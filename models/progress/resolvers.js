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
    //HACE FALTA MUTACION PARA QUE EL LIDER PUEDA AGREGAR OBSERVACIONES A LOS AVANCES. (HU_18)
    //Para que esta operación solo pueda ser ejecutada por el líder uso PrivateComponent en el front
    createObservation: async (parent, args) => {
      const progressWithObjective = await ProgressModel.findByIdAndUpdate(
        args._Id,
        {
          $addToSet: {
            Observacion: {
              descripcion: args.descripcion,
            },
          },
        },
        { new: true }
      );
      return progressWithObjective;
    },
  },
};

//EXPORT
export { progressResolvers };
