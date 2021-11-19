// import { convertToObject } from "typescript";
import conectarBD from "./db/db";
import { UserModel } from "./models/user/user";

const main = async () => {
  await conectarBD();

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
};

main();
