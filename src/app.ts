import dotenv from 'dotenv';
import { Server } from './core/server';
import { initDatabase } from './core/database';

dotenv.config();

async function startServer() {
    try {
        await initDatabase();
        
        const server = new Server();
        server.listen();
    } catch (error) {
        console.error('Error al iniciar el servidor:', error);
        process.exit(1);
    }
}

startServer();