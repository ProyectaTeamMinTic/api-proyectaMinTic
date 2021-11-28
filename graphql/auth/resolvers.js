//IMPORTS
import { UserModel } from '../../models/user/user.js';
import bcrypt from 'bcrypt';
import { generateToken } from '../../utils/tokenUtils.js';
//DEFINICION DE RESOLVER
const resolversAutenticacion = {
  //DEFINICION DE MUTACIONES
  Mutation: {
    register: async (parent, args) => {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(args.password, salt);
      const createdUser = await UserModel.create({
        nombre: args.nombre,
        apellido: args.apellido,
        identificacion: args.identificacion,
        correo: args.correo,
        rol: args.rol,
        password: hashedPassword,
      });
      console.log('usuario creado', createdUser);
      return {
        token: generateToken({
          _id: createdUser._id,
          nombre: createdUser.nombre,
          apellido: createdUser.apellido,
          identificacion: createdUser.identificacion,
          correo: createdUser.correo,
          rol: createdUser.rol,
        }),
      };
    },

    login: async (parent, args) => {
      const foundUser = await UserModel.findOne({ correo: args.correo });
      if (await bcrypt.compare(args.password, foundUser.password)) {
        return {
          token: generateToken({
            _id: foundUser._id,
            nombre: foundUser.nombre,
            apellido: foundUser.apellido,
            identificacion: foundUser.identificacion,
            correo: foundUser.correo,
            rol: foundUser.rol,
          }),
        };
      }
    },

    refreshToken: async (parent, args, context) => {
      console.log('contexto', context);
      if (!context.userData) {
        return {
          error: 'token no valido',
        };
      } else {
        return {
          token: generateToken({
            _id: context.userData._id,
            nombre: context.userData.nombre,
            apellido: context.userData.apellido,
            identificacion: context.userData.identificacion,
            correo: context.userData.correo,
            rol: context.userData.rol,
          }),
        };
      }
      // valdiar que el contexto tenga info del usuario. si si, refrescar el token
      // si no devolver null para que en el front redirija al login.
    },
  },
}

//EXPORT
export { resolversAutenticacion };