import { Router } from "express";
import { createSession } from "../controller/payment.controllers.js";

// Inicializamos el enrutador con el Router que importamos de Express.
const router = Router();

// Creamos las rutas para el pago.
router.post('/create-checkout-session', createSession)
router.get('/success', (req, res) => res.send('✅ Pago completado con éxito ✅'))
router.get('/cancel', (req, res) => res.send('❌ Pago cancelado ❌'))

export default router;
