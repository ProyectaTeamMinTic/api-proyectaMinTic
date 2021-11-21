//IMPORTS
import { gql } from 'apollo-server-express';

//DEFINICIÓN DE TIPOS
const typesUser = gql`
type User {
    _id: ID!
    nombre: String!
    apellido: String!
    identificacion: String!
    correo: String!
    rol: Enum_Rol!
    estado: Enum_EstadoUsuario
}

//DEFINICION DE QUERY
type Query{
    User: [User]
    User(_id: String!): User
}

//DEFINICION DE MUTACIONES
type Mutation {
    createUser(
      nombre: String!
      apellido: String!
      identificacion: String!
      correo: String!
      rol: Enum_Rol!
      estado: Enum_EstadoUsuario
    ): User

    editUser(
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
export { typesUser };