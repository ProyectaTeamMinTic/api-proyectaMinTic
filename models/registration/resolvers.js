//IMPORTS
import { registrationModel } from "./registration.js";
import { ProjectModel } from "../project/project.js";
import { UserModel } from "../user/user.js";
//RESOLVER{

const registrationResolvers = {
  // Registration: {
  // proyecto: async (parent, args) => {
  //   return await ProjectModel.findOne({ _id: parent.proyecto })
  // },
  // estudiante: async (parent, args) => {
  //   return await UserModel.findOne({ _id: parent.estudiante })
  // },
  // pro: async (parent, args) => {
  //   return await ProjectModel.find({ _id: parent._id })
  // },
  // },
  //  DEFINICION DE QUERY
  Query: {
    //FALTA TRAER NOMBRE DE PROYECTOS
    Registrations: async (parent, args, context) => {
      let filtro = {};
      if (context.userData) {
        if (context.userData.rol === 'LIDER') {
          const projects = await ProjectModel.find({ lider: context.userData._id });
          const projectList = projects.map((p) => p._id.toString());
          filtro = {
            proyecto: {
              $in: projectList,
            },
          };
        }
      }
      const registrations = await registrationModel.find({ ...filtro });
      return registrations;
    },

    // Registration: async (parent, args) => {
    //   const registration = await registrationModel.findOne({ _id: args._id })
    //   return registration;
    // },
    inscripcionesConProyectoYEstudiante: async (parent, args) => {
      const inscripcionesConProyectoYEstudiante = await registrationModel.find(
        // {
        //   estado: 'ACEPTADA'
        // }
      ).populate('estudiante').populate('proyecto');
      return inscripcionesConProyectoYEstudiante;
    },
  },
  //  DEFINICIÓN DE MUTACIONES
  Mutation: {
    createRegistration: async (parent, args) => {
      const registrationCreated = await registrationModel.create({
        proyecto: args.proyecto,
        estudiante: args.estudiante,
      });
      return registrationCreated;
    },
    approveRegistration: async (parent, args) => {
      if (args.estado === 'ACEPTADA') {
        const fecha = new Date()
        const registrationApproved = await registrationModel.findByIdAndUpdate(
          args._id,
          {
            estado: args.estado,
            fechaIngreso: fecha.toISOString().split('T')[0]
          },
          { new: true }
        );
        return registrationApproved;
      } else {
        const registrationApproved = await registrationModel.findByIdAndUpdate(
          args._id,
          {
            estado: args.estado,
          },
          { new: true }
        );
        return registrationApproved;
      }
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
