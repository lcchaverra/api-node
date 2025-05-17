import dotenv from 'dotenv';
import { Server } from './core/server';
import { initDatabase } from './core/database';

// Configuración del archivo .env
dotenv.config();

async function startServer() {
    try {
        // Inicializar conexión a base de datos
        await initDatabase();
        
        // Iniciar el servidor
        const server = new Server();
        server.listen();
    } catch (error) {
        console.error('Error al iniciar el servidor:', error);
        process.exit(1);
    }
}

startServer();