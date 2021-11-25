import { gql } from "apollo-server-express";
import { enumsType } from '../models/enums/types.js';
import { userTypes } from "../models/user/types.js";
import { projectTypes } from "../models/project/types.js";
import { progressTypes } from "../models/progress/types.js";
import { registrationTypes } from "../models/registration/types.js";

const typesGlobales = gql`
  scalar Date
`;

export const types = [
  typesGlobales,
  enumsTypes,
  userTypes,
  projectTypes,
  progressTypes,
  registrationTypes,
];
