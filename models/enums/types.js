import { gql } from "apollo-server-express";

const enumsTypes = gql`
  enum Enum_EstadoUsuario {
    PENDIENTE
    AUTORIZADO
    NO_AUTORIZADO
  }

  enum Enum_Rol {
    ESTUDIANTE
    LIDER
    ADMINISTRADOR
  }

  enum Enum_EstadoProyecto {
    ACTIVO
    INACTIVO
  }

  enum Enum_FaseProyecto {
    INICIADO
    DESARROLLO
    TERMINADO
    NULL
  }

  enum Enum_TipoObjetivo {
    GENERAL
    ESPECIFICO
  }

  enum Enum_EstadoInscripcion {
    ACEPTADA
    RECHAZADA
    PENDIENTE
  }
`;

export { enumsTypes };
