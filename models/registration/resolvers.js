//IMPORTS
import { registrationModel } from "./registration.js";
import { ProjectModel } from "../project/project.js";

//RESOLVER{

const registrationResolvers = {
  //  DEFINICION DE QUERY
  Query: {
    Registrations: async (parent, args) => {
      const registrations = await registrationModel.find();
      return registrations;
    },
  },
  //  DEFINICIÓN DE MUTACIONES
  Mutation: {
    createRegistration: async (parent, args) => {
      const registrationCreated = await registrationModel.create({
        estado: args.estado,
        proyecto: args.proyecto,
        estudiante: args.estudiante,
      });
      return registrationCreated;
    },
    approveRegistration: async (parent, args) => {
      const registrationApproved = await registrationModel.findByIdAndUpdate(
        args.id,
        {
          estado: "ACEPTADO",
          fechaIngreso: Date.now(),
        },
        { new: true }
      );
      return registrationApproved;
    },
    //FECHA DE EGRESO CUANDO UN PROYECTO ESTA EN FASE DE TERMINADO, ADICIONAL 
    updateEndDateRegistration: async (parent, args) => {
      const updatedEndDateRegistration = await ProjectModel.findOne(
        args.fase,
        {
          fase: "TERMINADO",
          fechaEgreso: Date.now(),
        },

        { new: true }
      );
      return updatedEndDateRegistration;
    },
  },
};

//EXPORT
export { registrationResolvers };
