//IMPORTS
import conectarBD from "./db/db";
import { UserModel } from "./models/user/user";
import express from "./express";

//VARIABLES DE ENTORNO
dotenv.config();

//ACTIVACIÓN DE APOLLO COMO SERVIDOR DE GRAPHQL

//ACTIVACIÓN DE EXPRESS

//ACTIVACIÓN DE CORS

//CONFIGURACIÓN DE SERVIDOR

/*CONEXIÓN BASE DE DATOS
const main = async () => {
  await conectarBD();
  CONEXIÓN PRUEBA
  await UserModel.create({
    correo: "carlos@email.com",
    identificacion: "1104865957",
    nombre: "carlos",
    apellido: "Camargo",
  })
    .then((u) => {
      console.log("Usuario creado", u);
    })
    .catch((e) => {
      console.error("Error creando el usuario", e);
    });
};main();*/
