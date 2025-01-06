# Usa una imagen base de Node.js
FROM node:20

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia el package.json y el package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de la aplicación
COPY . .

# Construye la aplicación de Next.js
RUN npm run build

# Expone el puerto 3000
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]
