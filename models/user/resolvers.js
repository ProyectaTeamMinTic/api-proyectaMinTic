//IMPORTS
import { UserModel } from './user.js'
import bcrypt from 'bcrypt';
//RESOLVER{
const userResolvers = {
    User: {
        inscripciones: async (parent, args) => {
            return registrationModel.find({ estado: parent.estado, proyecto: parent.Project, estudiante: parent.User })
        },
    },
    //  DEFINICION DE QUERY
    Query: {
        Users: async (parent, args) => {
            const users = await UserModel.find()
            return users;
        },
        User: async (parent, args) => {
            //virtual populate para traer informacion de proyectos de un lider
            const user = await UserModel.findOne({ _id: args._id }).populate('proyectos');
            return user;
        },
        // User: async (parent, args) => {
        //     //virtual populate para traer informacion de proyectos de un lider
        //     const user = await UserModel.findOne({ _id: args._id }).populate('inscripciones');
        //     return user;
        // },
    },
    //  DEFINICIÓN DE MUTACIONES 
    Mutation: {
        createUser: async (parent, args) => {
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
            //validar dato por defecto
            if (Object.keys(args).includes('estado')) {
                createdUser.estado = args.estado;
            }
            return createdUser;
        },
        updateUser: async (parent, args) => {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(args.password, salt);
            const updatedUser = await UserModel.findByIdAndUpdate(
                args._id,
                {
                    nombre: args.nombre,
                    apellido: args.apellido,
                    identificacion: args.identificacion,
                    correo: args.correo,
                    estado: args.estado,
                    // password: hashedPassword,
                },
                { new: true }
            );
            return updatedUser;
        },

        updateUserState: async (parent, args) => {
            const updatedUserState = await UserModel.findByIdAndUpdate(
                args._id,
                {
                    estado: args.estado,
                },
                { new: true }
            );
            return updatedUserState;
        },

        deleteUser: async (parent, args) => {
            if (Object.keys(args).includes('_id')) {
                const deletedUser = await UserModel.findOneAndDelete({ _id: args._id });
                return deletedUser;
            } else if (Object.keys(args).includes('correo')) {
                const deletedUser = await UserModel.findOneAndDelete({ correo: args.correo });
                return deletedUser;
            }
        },
    },
};
//EXPORT
export { userResolvers };