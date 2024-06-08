import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import routes from './routes/routes.js';
import sequelize from './db.js';
import { Order, Product, ProductOrder } from './models/models.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));

app.use('/api', routes);

sequelize
  .authenticate()
  .then(() => {
    console.log('Successful connection');
    return sequelize.sync();
  })
  .then(() => {
    console.log('Sync models');
  })
  .catch((err) => console.error('Connection error:', err));

app.use((req, res, next) => {
  res.status(404).json({ message: 'Endpoint not found' });
});

export default app;
