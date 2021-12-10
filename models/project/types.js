//IMPORTS
import { gql } from "apollo-server-express";

//DEFINICIÓN DE TIPOS E INPUTS
const projectTypes = gql`
  # ---------------------------------------------------------
  # Se va crear la definición de tipos para proyecto en GraphQL

  type Objetivo {
    _id: ID!
    descripcion: String!
    tipo: Enum_TipoObjetivo!
  }

  input crearObjetivo {
    descripcion: String!
    tipo: Enum_TipoObjetivo!
  }

  input camposObjetivo {
    descripcion: String!
    tipo: Enum_TipoObjetivo!
  }


  input camposProyecto {
    nombre: String
    presupuesto: Float
    fechaInicio: Date
    fechaFin: Date
    #fechaFin:new Date().toISOString().split("T")[0]
    estado: Enum_EstadoProyecto
    fase: Enum_FaseProyecto
    lider: String
  }

  type Project {
    _id: ID!
    nombre: String!
    presupuesto: Float!
    fechaInicio: Date
    fechaFin: Date
    estado: Enum_EstadoProyecto
    fase: Enum_FaseProyecto
    lider: User
    objetivos: [Objetivo]!
    avances: [Progress]
    inscripciones: [Registration]
  }
  
  #DEFINICION DE QUERY
  type Query {
    # ---------------------------------------------------------
    # Aqui se va a crear el Query de Proyecto
    Projects: [Project]
    # ---------------------------------------------------------
    # Aqui se va a consultar por un proyecto Específico utilizando el ID.
    Project(_id: String!): Project
  }

  #DEFINICION DE MUTACIONES
  type Mutation {
    # Esto es lo que se necesita para el proyecto
    # ---------------------------------------------------------
    # Aqui se van a crear las mutaciones para el proyecto
    createProject(
      nombre: String!
      presupuesto: Float!
      # fechaInicio: Date!
      # fechaFin: Date!
      # estado: Enum_EstadoProyecto!
      # fase: Enum_FaseProyecto!
      lider: String! # Se asume que el usuario ya está creado
      objetivos: [crearObjetivo]
    ): Project

    # updateProject(
    #   _id: String!
    #   nombre: String!
    #   presupuesto: Float!
    #   fechaInicio: Date!
    #   fechaFin: Date!
    #   estado: Enum_EstadoProyecto!
    #   fase: Enum_FaseProyecto!
    #   lider: String! # Se asume que el usuario ya está creado
    #   objetivos: [crearObjetivo]
    # ): Project

    updateProject(_id: String!, campos: camposProyecto!): Project
    updateProjectStateAndSetDate(_id: String!, campos: camposProyecto!): Project
    deleteProject(_id: String): Project
    # ---------------------------------------------------------
    createObjective(idProyecto: String!, campos: camposObjetivo!): Project

    updateObjective(
      idProyecto: String!
      indexObjetivo: Int!
      campos: camposObjetivo!
    ): Project

    deleteObjective(idProyecto: String!, idObjetivo: String!): Project
  }
`;

//EXPORTACIÓN DEL TIPO
export { projectTypes };
