import { resolversProject } from "../models/project/resolvers.js";
import { resolversUser } from "../models/user/resolvers.js";
import { resolversProgress } from "../models/progress/resolvers.js";
import { resolversRegistration } from "../models/registration/resolvers.js";

export const resolvers = [
  resolversUser,
  resolversProject,
  resolversProgress,
  resolversRegistration,
];
