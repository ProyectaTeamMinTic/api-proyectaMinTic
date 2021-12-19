//IMPORTS
import { ProjectModel } from "./project.js";
import { registrationModel } from "../registration/registration.js";
import { ProgressModel } from "../progress/progress.js"
//RESOLVER{
const projectResolvers = {
  Project: {
    inscripciones: async (parent, args) => {
      return registrationModel.find({ proyecto: parent._id });
    },
  },
  Project: {
    avances: async (parent, args) => {
      return ProgressModel.find({ proyecto: parent._id });
    },
  },
  //  DEFINICION DE QUERIES
  Query: {
    // ---------------------------------------------------------
    // Aqui se va a crear el Query de Proyecto para consultar todos los proyectos, se deben crear por supuesto muchas más de acuerdo a los requisitos.
    Projects: async (parent, args) => {
      const projects = await ProjectModel.find().populate("lider");
      // .populate("avances")
      // .populate("inscripciones");
      return projects;
    },
    Project: async (parent, args) => {
      const project = await ProjectModel.findOne({ _id: args._id }).populate(
        "lider"
      );
      return project;
    },
    // ---------------------------------------------------------
  },

  //  DEFINICIÓN DE MUTACIONES
  Mutation: {
    // Esto es lo que se necesita para el proyecto
    // ---------------------------------------------------------
    // Aqui se va a crear todas las mutaciones del modelo de Proyecto.
    createProject: async (parent, args) => {
      const createdProject = await ProjectModel.create({
        nombre: args.nombre,
        presupuesto: args.presupuesto,
        lider: args.lider,
        objetivoGeneral: args.objetivoGeneral,
        objetivoEspecifico1: args.objetivoEspecifico1,
        objetivoEspecifico2: args.objetivoEspecifico2,
        objetivoEspecifico3: args.objetivoEspecifico3,
        // objetivos: args.objetivos,
      });

      if (Object.keys(args).includes("estado")) {
        createdProject.estado = args.estado;
      }
      if (Object.keys(args).includes("fase")) {
        createdProject.fase = args.fase;
      }
      return createdProject;
    },

    updateProject: async (parent, args) => {
      // const fecha = new Date()
      // if (args.campos.fase === 'TERMINADO') {
      //   const updatedProject = await ProjectModel.findByIdAndUpdate(
      //     args._id,
      //     {
      //       ...args.campos,
      //       estado: 'INACTIVO',
      //       fechaFin: fecha.toISOString().split('T')[0]
      //     },
      //     { new: true }
      //   );
      //   return updatedProject;
      // } else {
      const updatedProject = await ProjectModel.findByIdAndUpdate(
        args._id,
        {
          ...args.campos,
        },
        { new: true }
      );
      return updatedProject;
      // }
    },

    //mutacion para actualizar el estado del proyecto y establecer fechas automaticas
    updateProjectStateAndSetDate: async (parent, args) => {
      if (args.campos.estado === 'ACTIVO') {
        const fecha = new Date()
        const updatedProjectStateAndSetDate = await ProjectModel.findByIdAndUpdate(
          args._id,
          {
            ...args.campos,
            fechaInicio: fecha.toISOString().split('T')[0],
            fase: 'INICIADO'
          },
          { new: true }
        );
        return updatedProjectStateAndSetDate;
      } else if (args.campos.estado === 'INACTIVO') {
        const fecha = new Date()
        const updatedProjectStateAndSetDate = await ProjectModel.findByIdAndUpdate(
          args._id,
          {
            ...args.campos,
            fechaFin: fecha.toISOString().split('T')[0],
          },
          { new: true }
        );
        return updatedProjectStateAndSetDate;
      }
    },

    updateProjectPhaseAndSetDate: async (parent, args) => {
      if (args.campos.fase === 'TERMINADO') {
        const fecha = new Date()
        const updatedProjectPhaseAndSetDate = await ProjectModel.findByIdAndUpdate(
          args._id,
          {
            ...args.campos,
            fechaFin: fecha.toISOString().split('T')[0],
          },
          { new: true }
        );
        return updatedProjectPhaseAndSetDate;
      } //else if (args.campos.estado === 'INACTIVO') {
      //   const fecha = new Date()
      //   const updatedProjectStateAndSetDate = await ProjectModel.findByIdAndUpdate(
      //     args._id,
      //     {
      //       ...args.campos,
      //       fechaFin: fecha.toISOString().split('T')[0],
      //     },
      //     { new: true }
      //   );
      //   return updatedProjectStateAndSetDate;
      // }
    },

    deleteProject: async (parent, args) => {
      if (Object.keys(args).includes("_id")) {
        const deletedProject = await ProjectModel.findOneAndDelete({
          _id: args._id,
        });
        return deletedProject;
      }
    },

    createObjective: async (parent, args) => {
      const projectWithObjective = await ProjectModel.findByIdAndUpdate(
        args.idProyecto,
        {
          $addToSet: {
            objetivos: {
              ...args.campos,
            },
          },
        },
        { new: true }
      );
      return projectWithObjective;
    },

    updateObjective: async (parent, args) => {
      const projectWithObjectiveUpdated = await ProjectModel.findByIdAndUpdate(
        args.idProyecto,
        {
          $set: {
            [`objetivos.${args.indexObjetivo}.descripcion`]:
              args.campos.descripcion,
            [`objetivos.${args.indexObjetivo}.tipo`]: args.campos.tipo,
          },
        },
        { new: true }
      );
      return projectWithObjectiveUpdated;
    },

    deleteObjective: async (parent, args) => {
      const projectWithObjectiveDeleted = await ProjectModel.findByIdAndUpdate(
        { _id: args.idProyecto },
        {
          $pull: {
            objetivos: {
              _id: args.idObjetivo,
            },
          },
        },
        { new: true }
      );
      return projectWithObjectiveDeleted;
    },

    // ---------------------------------------------------------
  },
};

//EXPORT
export { projectResolvers };
