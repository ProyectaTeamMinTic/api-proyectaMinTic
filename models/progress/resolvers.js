//IMPORTS
import { ProjectModel } from "../project/project.js";
import { ProgressModel } from "./progress.js";

//RESOLVER{
const progressResolvers = {
  // Progress: {
  //   proyecto: async (parent, args) => {
  //     return ProjectModel.find({ proyecto: parent.estado });
  //   },
  // },
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
        _id: args._id,
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
      const fecha = new Date()
      const createdProgress = await ProgressModel.create({
        fecha: fecha.toISOString().split('T')[0],
        descripcion: args.descripcion,
        proyecto: args.proyecto,
        creadoPor: args.creadoPor,
      });
      // const updatedProjectPhase = await ProjectModel.findByIdAndUpdate(
      //   proyecto._id,
      //   {
      //     ...args.campos,
      //     fase: 'DESARROLLO',
      //   },
      //   { new: true }
      // );
      return createdProgress //updatedProjectPhase;

    },

    updateProgress: async (parents, args) => {
      const updatedProgress = await ProgressModel.findByIdAndUpdate(
        args._id,
        {
          descripcion: args.descripcion,
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
      const progressWithObservation = await ProgressModel.findByIdAndUpdate(
        args.idAvance,
        {
          $addToSet: {
            observaciones: {
              descripcion: args.descripcion,
            },
          },
        },
        { new: true }
      );
      return progressWithObservation;
    },

    updateObservation: async (parent, args) => {
      const progressWithObservationUpdated =
        await ProgressModel.findByIdAndUpdate(
          args.idAvance,
          {
            $set: {
              [`observaciones.${args.indexObservacion}.descripcion`]:
                args.descripcion,
            },
          },
          // console.log(args.idAvance),
          // console.log(args.indexAvance),
          // console.log(args.descripcion),
          { new: true }
        );
      return progressWithObservationUpdated;
    },

    deleteObservation: async (parent, args) => {
      const projectWithObservationDeleted =
        await ProgressModel.findByIdAndUpdate(
          { _id: args.idAvance },
          {
            $pull: {
              observaciones: {
                _id: args.idObservacion,
              },
            },
          },
          { new: true }
        );
      return projectWithObservationDeleted;
    },
  },
};

//EXPORT
export { progressResolvers };
