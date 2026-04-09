FROM node:20-alpine

WORKDIR /app

COPY package.json ./
RUN npm install

COPY . .

ARG VITE_FORMSPREE_ID
ENV VITE_FORMSPREE_ID=$VITE_FORMSPREE_ID

RUN npm run build

EXPOSE 4173

CMD ["npm", "run", "preview"]
