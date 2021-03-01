FROM node:lts
 
RUN mkdir /src
COPY . /src
WORKDIR /src
RUN npm install
RUN npm run build
EXPOSE 3003
CMD ["npm", "start"]