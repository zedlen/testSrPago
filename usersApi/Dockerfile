
FROM node:lts
    
RUN mkdir /src
COPY . /src
WORKDIR /src
RUN npm install
RUN npm run build
EXPOSE 3001
CMD ["npm", "start"]