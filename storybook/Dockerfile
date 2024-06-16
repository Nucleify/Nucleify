FROM node:20

WORKDIR app/storybook

COPY package*.json ./

RUN npm install

EXPOSE 6006

CMD ["npm", "run", "storybook"]
