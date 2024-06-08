import { Sequelize } from 'sequelize';
import { DB_URL } from './config.js';

const sequelize = new Sequelize(DB_URL, {
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

export default sequelize;
