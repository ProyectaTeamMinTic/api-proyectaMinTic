//IMPORTS
import { gql } from "apollo-server-express";

//DEFINICIÓN DE TIPOS
const registrationTypes = gql`
  type Registration {
    _id: String !
    estado: Enum_Estadoregistration!
    fechaIngreso: Date
    fechaEgreso: Date
    proyecto: Proyecto!
    estudiante: Usuario!
  }

//DEFINICION DE QUERY
type Query {
    Inscripciones: [Registration]
  }

//DEFINICION DE MUTACIONES
type Mutation {
    createRegistration(
      estado: Enum_Estadoregistration!
      proyecto: String!
      estudiante: String!
    ): registration

    approveRegistration(id: String!): Registration
  }
`;

//EXPORTACIÓN DEL TIPO
export { registrationTypes };
