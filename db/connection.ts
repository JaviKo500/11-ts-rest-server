import { Sequelize } from 'sequelize';


const db = new Sequelize( 'node', 'root', '#JaViKo@500', {
    host: 'localhost',
    dialect: 'mysql',
} );

export default db;

