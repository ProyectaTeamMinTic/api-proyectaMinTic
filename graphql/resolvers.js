import { projectResolvers } from "../models/project/resolvers.js";
import { userResolvers } from "../models/user/resolvers.js";
import { progressResolvers } from "../models/progress/resolvers.js";
import { registrationResolvers } from "../models/registration/resolvers.js";
import { resolversAutenticacion } from './auth/resolvers.js';

export const resolvers = [
  userResolvers,
  projectResolvers,
  progressResolvers,
  registrationResolvers,
  resolversAutenticacion,
];
