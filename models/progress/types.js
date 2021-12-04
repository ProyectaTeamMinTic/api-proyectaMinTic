//IMPORTS
import { gql } from "apollo-server-express";

//DEFINICIÓN DE TIPOS

const progressTypes = gql`
  type Progress {
    _id: ID!
    fecha: Date!
    descripcion: String!
    observaciones: [String]
    proyecto: Project!
    creadoPor: User!
  }

#DEFINICION DE QUERY

    type Query {
        Progresses: [Progress]
        Progress(_id: String!): [Progress]
    }

#DEFINICION DE MUTACIONES

    type Mutation {
        createProgress(
            fecha: Date! 
            descripcion: String!
            proyecto: String! 
            creadoPor: String!)
        : Progress


        updateProgress(
            _id: String!
            fecha: Date! 
            descripcion: String! 
            proyecto: String! 
            creadoPor: String!)
            : Progress

        deleteProgress(
            _id: String)
            : Progress

        createObservation(
           _id: String!
          Observacion: String!
          )
          : Progress
    }
  `;
//*reateObservacion devuelve un Avance (Progress) con la observación correspondiente, por dentro.

//EXPORTACIÓN DEL TIPO
export { progressTypes };
