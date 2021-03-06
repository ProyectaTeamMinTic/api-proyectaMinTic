//IMPORTS
import { gql } from "apollo-server-express";

//DEFINICIÓN DE TIPOS
const registrationTypes = gql`
  type Registration {
    _id: String !
    estado: Enum_EstadoInscripcion!
    fechaIngreso: Date
    fechaEgreso: Date
    proyecto(lider: String): Project!
    estudiante: User!
  }

  type RegistrationE {
    _id: String !
    estado: Enum_EstadoInscripcion!
    fechaIngreso: Date
    fechaEgreso: Date
    estudiante: User!
    proyecto: Project!
  }

#DEFINICION DE QUERY
type Query {
    Registrations: [Registration]
    Registration(_id: String!): Registration
    inscripcionesConProyectoYEstudiante(estado: Enum_EstadoInscripcion): [RegistrationE]
  }

#DEFINICION DE MUTACIONES
type Mutation {
    createRegistration(
      # estado: Enum_EstadoInscripcion!
      proyecto: String!
      estudiante: String!
    ): Registration

    approveRegistration(_id: String!
    estado: Enum_EstadoInscripcion!): Registration
  }
`;

//EXPORTACIÓN DEL TIPO
export { registrationTypes };
