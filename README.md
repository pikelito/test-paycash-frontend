# Frontend Test PayCash

link de url desplegada en amplify: https://main.d3ve0w7jvdyrdb.amplifyapp.com

Frontend desarrollado con Next.js para la gestión de personas.

## Requisitos Previos

- Docker Desktop instalado y ejecutándose
- Docker Compose

## Instalación con Docker

1. **Clonar el repositorio:**

   ```bash
   git clone https://github.com/pikelito/test-paycash-frontend
   cd test-paycash-frontend
   ```

2. **Construir e iniciar los contenedores:**

   ```bash
   docker-compose up -d --build
   ```

## Tecnologías Principales

- Next.js 14
- React 20
- TypeScript
- NextUI
- TailwindCSS
- Vitest para testing

## Comandos Docker útiles

- **Iniciar los contenedores:**

  ```bash
  docker-compose up -d
  ```

- **Detener los contenedores:**

  ```bash
  docker-compose down
  ```

- **Ver logs:**

  ```bash
  docker-compose logs -f frontend
  ```

- **Ejecutar comandos dentro del contenedor:**

  ```bash
  docker-compose exec frontend npm run test
  docker-compose exec frontend npm run lint
  ```

- **Reconstruir la imagen:**
  ```bash
  docker-compose build frontend
  ```

## Acceso a la aplicación

- **Desarrollo:** [http://localhost:3000](http://localhost:3000)

## Notas

- Asegúrate que Docker Desktop esté ejecutándose antes de iniciar el proyecto
- El contenedor del frontend se conectará automáticamente con el backend en el puerto 8000
- Los cambios en el código se reflejarán automáticamente gracias al hot-reloading
- Para problemas de permisos en Linux/MacOS, puede ser necesario ajustar los permisos de los volúmenes
