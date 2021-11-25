//IMPORTS
import { gql } from 'apollo-server-express';

//DEFINICIÓN DE TIPOS
const userTypes = gql`
type User {
    _id: ID!
    nombre: String!
    apellido: String!
    identificacion: String!
    correo: String!
    rol: Enum_Rol!
    estado: Enum_EstadoUsuario
    # virtual populate para traer array de proyectos
    proyectos:[Project]
}

#  DEFINICION DE QUERY
type Query{
    Users: [User]
    User(_id: String!): User
}

# DEFINICION DE MUTACIONES
type Mutation {
    createUser(
      nombre: String!
      apellido: String!
      identificacion: String!
      correo: String!
      rol: Enum_Rol!
      estado: Enum_EstadoUsuario
    ): User

    updateUser(
      _id: String!
      nombre: String!
      apellido: String!
      identificacion: String!
      correo: String!
      estado: Enum_EstadoUsuario!
    ): User

    deleteUser(_id: String, correo: String): User
    }
`;

//EXPORTACIÓN DEL TIPO
export { userTypes };