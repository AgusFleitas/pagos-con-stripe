import express from "express";
import paymentRoutes from "./routes/payment.routes.js";
import { PORT } from "./config.js";

// Inicializamos nuestra app ejecutando Express.
const app = express();

// Le decimos a nuesta app que convierta los datos a JSON con el método de Express para poder entenderlos.
app.use(express.json());

// Rutas del pago.
app.use(paymentRoutes);

// Le decimos a la aplicación que "escuche" (que se inicie) en el puerto 3000 y ponemos un console.log para que la terminal nos lo indique.
app.listen(3000);
console.log("Server on port", PORT);
