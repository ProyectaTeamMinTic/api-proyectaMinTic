//IMPORTS
import { registrationModel } from "./registration.js";

//RESOLVER{

const registrationResolvers = {
  //  DEFINICION DE QUERY
  Query: {
    Registrations: async (parent, args) => {
      const registrations = await registrationModel.find();
      return registrations;
    },
    inscripcionesConProyectoYEstudiante: async (parent, args) => {
      const inscripcionesConProyectoYEstudiante = await registrationModel
        .find
        // {
        //   estado: 'ACEPTADA'
        // }
        ()
        .populate("estudiante")
        .populate("proyecto");
      return inscripcionesConProyectoYEstudiante;
    },
  },
  //  DEFINICIÓN DE MUTACIONES
  Mutation: {
    createRegistration: async (parent, args) => {
      const registrationCreated = await registrationModel.create({
        // estado: args.estado,
        proyecto: args.proyecto,
        estudiante: args.estudiante,
      });
      return registrationCreated;
    },
    approveRegistration: async (parent, args) => {
      const registrationApproved = await registrationModel.findByIdAndUpdate(
        args._id,
        {
          estado: args.estado,
          // fechaIngreso: (new Date()).toISOString().split("T")[0],
          //fechaFin:new Date().toISOString().split("T")[0]
        },
        { new: true }
      );
      return registrationApproved;
    },
    //FECHA DE EGRESO CUANDO UN PROYECTO ESTA EN FASE DE TERMINADO, ADICIONAL
    // updateEndDateRegistration: async (parent, args) => {
    //   const updatedEndDateRegistration = await ProjectModel.findOne(
    //     args.fase,
    //     {
    //       fase: "TERMINADO",
    //       fechaEgreso: Date.now(),
    //     },

    //     { new: true }
    //   );
    //   return updatedEndDateRegistration;
    // },
  },
};

//EXPORT
export { registrationResolvers };
