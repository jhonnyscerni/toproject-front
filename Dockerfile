### Multi Stage Build ###

### Estágio 1 - Obter o source e gerar o build ###

#Cria o Container Node e apelida de ng-builder
FROM node:10.13-alpine AS ng-builder
#Cria um Diretorio /app
RUN mkdir -p /app
#Path de trabalho
WORKDIR /app
#Copia o package.json para dentro da pasta /app
COPY package.json /app
#Roda o compando e instala as dependencias do package.json
RUN npm install
#Copia para pasta /app
COPY . /app
#Rodar um comando npm dentro do container
RUN $(npm bin)/ng build --prod


### Estágio 2 - Subir o source para o servidor NGINX com a app Angular ###
FROM nginx
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=ng-builder /app/dist/ltr /usr/share/nginx/html

EXPOSE 80

#Gerar imagem
#docker build -t projeto-front .

#Executar imagem
#docker run -p 8081:80 projeto-front
