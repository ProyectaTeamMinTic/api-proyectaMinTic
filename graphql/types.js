import { gql } from "apollo-server-express";
// import { tiposEnums } from '../models/enums/tipos.js';
import { typesUser } from "../models/user/types.js";
import { typesProject } from "../models/project/types.js";
import { typesProgress } from "../models/progress/types.js";
import { typesRegistration } from "../models/registration/types.js";

const typesGlobales = gql`
  scalar Date
`;

export const types = [
  typesGlobales,
  //   typesEnums,
  typesUser,
  typesProject,
  typesProgress,
  typesRegistration,
];
