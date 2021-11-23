//IMPORTS
import { UserModel } from '../models/user.js'

//RESOLVER{
const userResolvers = {

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
            const createdUser = await UserModel.create({
                nombre: args.nombre,
                apellido: args.apellido,
                identificacion: args.identificacion,
                correo: args.correo,
                rol: args.rol,
            });
            //validar dato por defecto
            if (Object.keys(args).includes('estado')) {
                createdUser.estado = args.estado;
            }

            return createdUser;
        },
        updateUser: async (parent, args) => {
            const updatedUser = await UserModel.findByIdAndUpdate(
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

            return updatedUser;
        },
        deleteUser: async (parent, args) => {
            if (Object.keys(args).includes('_id')) {
                const deletedUser = await UserModel.findOneAndDelete({ _id: args._id });
                return userDeleted;
            } else if (Object.keys(args).includes('correo')) {
                const deletedUser = await UserModel.findOneAndDelete({ correo: args.correo });
                return deletedUser;
            }
        },
    },
};

//EXPORT
export { userResolvers };