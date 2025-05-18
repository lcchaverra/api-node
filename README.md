# Node.js Express TypeScript API

![Node.js](https://img.shields.io/badge/Node.js-14.x-green)
![Express](https://img.shields.io/badge/Express-4.x-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-4.x-blue)
![MySQL](https://img.shields.io/badge/MySQL-8.x-orange)

Una API RESTful escalable y bien estructurada construida con Node.js, Express y TypeScript. Diseñada siguiendo principios de arquitectura limpia, esta API incluye autenticación JWT, documentación automática con Swagger, y mucho más.

## Características

- **Arquitectura Modular**: Estructura clara y ordenada por dominios
- **TypeScript**: Tipado estático para reducir errores
- **Autenticación JWT**: Sistema de autenticación completo con refresh tokens
- **Documentación API**: Swagger/OpenAPI para documentación automática
- **Manejo de Errores**: Sistema centralizado de manejo de errores
- **Logging**: Sistema de logging configurable
- **Base de Datos**: Soporte para MySQL con opciones para ORM o consultas nativas

## Requisitos previos

- Node.js (v14.x o superior)
- MySQL (v8.x o superior)
- npm o yarn

## Instalación

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/lcchaverra/api-node.git
   cd api-node
   ```

2. Instalar dependencias
    ```
    npm install
    ```

3. Configurar las variables de entorno
    renombra .env.example a .env y reemplaza los datos por los tuyos

4. Iniciar el servidor
    ``` 
    npm run dev


## Scripts Disponibles

1. npm run dev: Inicia el servidor en modo desarrollo con hot-reload
2. npm run build: Compila el proyecto TypeScript
3. npm start: Inicia el servidor en modo producción

## Documentación
La api está documentada en swagger y está disponible en: http://localhost:puerto/api-docs

# Convenciones de Commits

Este repositorio utiliza las siguientes convenciones para los mensajes de commits:

- **feat**: Añadir una nueva funcionalidad.
- **fix**: Corregir un error.
- **docs**: Cambios en la documentación.
- **style**: Cambios que no afectan el significado del código (espacios en blanco, formato, etc.).
- **refactor**: Cambios que no corrigen errores ni añaden funcionalidades, pero mejoran la estructura del código.
- **test**: Añadir pruebas o corregir pruebas existentes.
- **chore**: Cambios en herramientas de construcción u otras tareas auxiliares como actualizacion de librerias.

Estas convenciones permiten mantener un historial de commits más claro y facilitar el seguimiento de cambios en el proyecto.
