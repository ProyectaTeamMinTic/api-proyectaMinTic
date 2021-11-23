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
  },
};

//EXPORT
export { registrationResolvers };
