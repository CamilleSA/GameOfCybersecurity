FROM node:latest
WORKDIR /web_client
ENV PATH="./node_modules/.bin:$PATH"
COPY . .
RUN npm install --force
CMD ["npm", "start"]