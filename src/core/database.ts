import { DataSource } from 'typeorm';
import { User } from '../modules/users/entities/user.entity';

import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'my_api',
    synchronize: process.env.NODE_ENV !== 'production', // Solo para desarrollo
    logging: process.env.NODE_ENV !== 'production',
    entities: [User],
    migrations: ['src/migrations/**/*.ts'],
    subscribers: [],
    driver: require('mysql2'),
});

export const initDatabase = async (): Promise<void> => {
    try {
        await AppDataSource.initialize();
        console.log('Conexión a la base de datos establecida exitosamente');
    } catch (error) {
        console.error('Error al conectar con la base de datos:', error);
        throw error;
    }
};