FROM node:18-alpine

WORKDIR /server

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]





# #Establece la imagen base

# FROM nginx:latest

# #Copia el archivo index.html a la carpeta raíz del servidor web
# COPY index.html /usr/share/nginx/html
# #Exponer el puerto 80 para que podamos acceder a la aplicación web
# EXPOSE 3000
