import Stripe from "stripe";
import { STRIPE_SECRET_KEY } from "../config.js";

// Al importar Stripe, lo que nos brinda es una clase por lo que debemos instanciarla y, a su vez, esta recibe como parámetro la 'secret key' de nuestra cuenta de Stripe.
const stripe = new Stripe(STRIPE_SECRET_KEY);

// Creamos la función que se va a ejecutar en la ruta de crear el pago. Es una función asíncrona por lo que debemos usar async-await.
// 1. Obtenemos el array de productos desde el body en la solicitud (req.body)
// 2. Declaramos una constante (lineItems) que utilizaremos luego para crear la sesión de pago. Esta será un mapeo del array de productos, por cada producto vamos a crear un objeto para pasarselo a Stripe.
// 3. El return de cada producto va a ser la estructura que espera Stripe:
//      ► un objeto price_data >
//            • un objeto product_data (con las propiedades del producto; name, descrip, etc.).
//            • propiedad currency (moneda en la que se va a manejar el pago).
//            • unit_amount (el precio del producto [multiplicado por 100 ya que Stripe trabaja con centavos]).
//      ► propiedad quantity para determinar la cantidad del producto.
export const createSession = async (req, res) => {
  const { products } = req.body;

  const lineItems = products.map((product) => {
    return {
      price_data: {
        product_data: {
          name: product.name,
          description: product.description,
        },
        currency: "usd",
        unit_amount: product.price * 100, // Se multiplica por 100 para convertirlo a centavos debido a cómo opera Stripe.
      },
      quantity: product.quantity,
    };
  });

  // Luego de crear nuesta constante de lineItems hacemos uso del método de Stripe > checkout > sessions > create el cual recibirá un objeto como parámetro con las siguientes propiedades:
  //    • line_items → el objeto de productos, en nuestro caso, la variable lineItems que creamos arriba.
  //    • mode → si es un pago único (payment) o una suscripción (subscription).
  //    • success_url → dónde nos redireccionará en caso de que el pago se haya completado de manera exitosa.
  //    • cancel_url → dónde nos redireccionará en caso de que el usuario oprima 'Volver'.
  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: "payment",
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cancel",
  });

// Finalmente, devolvemos en formato JSON nuestra constante 'session'.
  return res.json(session);
};
