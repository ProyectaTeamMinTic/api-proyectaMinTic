import mongoose from "mongoose";
// const { connect } = require ("mongoose");

const conectarBD = async () => {
  return await mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => {
      console.log("Conexión Exitosa");
    })
    .catch((e) => {
      console.error("Error conectando a la Base de Datos", e);
    });
};

// const schema = new Schema({
//   name: String
// }, {
//   writeConcern: {
//      w: 'majority',
//      j: true,
//      wtimeout: 1000
//   }
// });

export default conectarBD;
