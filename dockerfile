FROM node:16

# Establece el directorio de trabajo en la imagen
WORKDIR /reserva

# Copia los archivos package.json y package-lock.json
COPY package*.json ./package-lock.json

# Instala las dependencias de la aplicación
RUN npm install

# Copia el resto de la aplicación al contenedor
COPY . .

# Expone el puerto que usa la aplicación
EXPOSE 5000

# Define el comando para ejecutar la aplicación
CMD ["npm", "start"]
