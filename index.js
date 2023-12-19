var apm = require('elastic-apm-node').start({
  serviceName: 'my-service-name',

  secretToken: 'BgqkrxPiNnk6MmnOkl',

  serverUrl: 'https://17753c254e824399b755a1a7f8dd9573.apm.us-central1.gcp.cloud.es.io:443',

  environment: 'my-environment'
})

const express = require('express')
const Pagos = require('./sequelize'); // Ajusta la ruta según tu estructura de archivos


const bodyParser= require('body-parser')

const path = require('path')

const PUBLISHABLE_KEY= "pk_test_51OMNnaKFOk7cqJRg8SOe25iI3OnSiyTEjlICIwMrISfsIrTxaSOcKpunCSc3KhwfbJZPw7MFxqPMVC0PT8Z3NiHM008lFaV5rn"
const SECRET_KEY= "sk_test_51OMNnaKFOk7cqJRg0qWj6G5NAo7o6v3Mw4C9DnHRndJRKT1hkQLZ6ljIYRDTXK5wi6DOb0ueVZ0BEvICzl9jMXXt00yVIwxZIv"

const stripe = require('stripe')(SECRET_KEY)
const cors = require('cors');

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.set("view engine", "ejs")

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.render('Home', {
        key: PUBLISHABLE_KEY
    })
})

app.post('/payment', async (req, res) => {
    try {
      const customer = await stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken,
        name: req.body.nombre,
        address: {
          line1: '24 Mountain Valley New Delhi',
          postal_code: '110092',
          city: "New Delhi",
          state: "Delhi",
          country: "India"
        }
      });
  
      const charge = await stripe.charges.create({
        amount: req.body.monto,
        description: 'Web development Product',
        currency: 'USD',
        customer: customer.id
      });
  
      // Crear un nuevo registro en la tabla Pagos
      const nuevoPago = await Pagos.create({
        usuario: req.body.usuario,
        usuario_nombre: req.body.nombre,
        monto: req.body.monto,
      });
  
      console.log(nuevoPago);
  
      res.send('Success');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error en el servidor');
    }
  });
  
  // Sincroniza el modelo con la base de datos
  Pagos.sync({ force: false }).then(() => {
    console.log('Modelo Pagos sincronizado con la base de datos');
  });
  
  app.listen(PORT, () => {
    console.log(`App is listening on ${PORT}`);
  });
  
