//IMPORTS
import { UserModel } from '../models/user.js'

//RESOLVER{
const resolversUser = {
    
    //  DEFINICION DE QUERY
    Query: {
        Users: async (parent, args) => {
            console.log('parent usuario', parent);
            const users = await UserModel.find();
            return users;
        },
        User: async (parent, args) => {
            const user = await UserModel.findOne({ _id: args._id });
            return user;
        },
    },
    //  DEFINICIÓN DE MUTACIONES 
    Mutation: {
        creteUser: async (parent, args) => {
            const userCreated = await UserModel.create({
                nombre: args.nombre,
                apellido: args.apellido,
                identificacion: args.identificacion,
                correo: args.correo,
                rol: args.rol,
            });

            if (Object.keys(args).includes('estado')) {
                userCreated.estado = args.estado;
            }

            return userCreated;
        },
        editUser: async (parent, args) => {
            const editedUser = await UserModel.findByIdAndUpdate(
                args._id,
                {
                    nombre: args.nombre,
                    apellido: args.apellido,
                    identificacion: args.identificacion,
                    correo: args.correo,
                    estado: args.estado,
                },
                { new: true }
            );

            return editedUser;
        },
        deleteUser: async (parent, args) => {
            if (Object.keys(args).includes('_id')) {
                const userDeleted = await UserModel.findOneAndDelete({ _id: args._id });
                return userDeleted;
            } else if (Object.keys(args).includes('correo')) {
                const userDeleted = await UserModel.findOneAndDelete({ correo: args.correo });
                return userDeleted;
            }
        },
    },
};

//EXPORT
export { resolversUser };