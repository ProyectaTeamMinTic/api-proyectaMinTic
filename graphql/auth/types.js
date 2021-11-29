//IMPORT
import { gql } from 'apollo-server-express';

//DEFINICION DE DE VARIABLES 
const tiposAutenticacion = gql`
# DEFINICION DE TIPOS
 type Token {
    token: String
    error: String
  }
#DEFINICION DE MUTACIONES
type Mutation {
    registro(
      nombre: String!
      apellido: String!
      identificacion: String!
      correo: String!
      rol: Enum_Rol!
      estado: Enum_EstadoUsuario
      password: String!
    ): Token!
    login(correo: String!, password: String!): Token
    refreshToken: Token
  }
`

//EXPORT
export { tiposAutenticacion };

