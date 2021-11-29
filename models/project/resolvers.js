//IMPORTS
import { ProjectModel } from "./project.js";

//RESOLVER{
const projectResolvers = {
  //  DEFINICION DE QUERIES
  Query: {
    // ---------------------------------------------------------
    // Aqui se va a crear el Query de Proyecto para consultar todos los proyectos, se deben crear por supuesto muchas más de acuerdo a los requisitos.
    Projects: async (parent, args) => {
      const projects = await ProjectModel.find()
        .populate("lider")
        // .populate("avances")
        .populate("inscripciones");
      return projects;
    },
    Project: async (parent, args) => {
      const project = await ProjectModel.findOne({ _id: args._id });
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
        fechaInicio: args.fechaInicio,
        fechaFin: args.fechaFin,
        estado: args.estado,
        fase: args.fase,
        lider: args.lider,
        objetivos: args.objetivos,
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
      // const updatedProject = await ProjectModel.findByIdAndUpdate(
      //   args._id,
      //   {
      //     nombre: args.nombre,
      //     presupuesto: args.presupuesto,
      //     fechaInicio: args.fechaInicio,
      //     fechaFin: args.fechaFin,
      //     estado: args.estado,
      //     fase: args.fase,
      //     lider: args.lider,
      //     objetivos: args.objetivos,
      //   },
      const updatedProject = await ProjectModel.findByIdAndUpdate(
        args._id,
        { ...args.campos },
        { new: true }
      );
      return updatedProject;
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

    // ---------------------------------------------------------
  },
};

//EXPORT
export { projectResolvers };
