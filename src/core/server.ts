import express, { Application } from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import { errorHandler } from '../api/middlewares/error.middleware';
import routes from '../api/routes';

export class Server {
  private app: Application;
  private port: string | number;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8020;
    this.middlewares();
    this.setupSwagger();
    this.routes();
    this.errorHandling();
  }

  middlewares(): void {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  setupSwagger(): void {
    const options = {
      definition: {
        openapi: '3.0.0',
        info: {
          title: 'API Documentation',
          version: '1.0.0',
          description: 'API Documentation',
        },
        servers: [
          {
            url: `http://localhost:${this.port}`,
          },
        ],
      },
      apis: ['./src/modules/**/routes.ts'],
    };

    const specs = swaggerJsdoc(options);
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  }

  routes(): void {
    this.app.use('/api', routes);
  }

  errorHandling(): void {
    this.app.use(errorHandler);
  }

  listen(): void {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en el puerto ${this.port}`);
      console.log(`Documentación disponible en http://localhost:${this.port}/api-docs`);
    });
  }
}