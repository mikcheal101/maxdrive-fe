FROM node:22-slim as build

WORKDIR /app

COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

FROM nginx:alpine

# Copy the build output to replace the default Nginx contents.
COPY --from=build /app/dist /usr/share/nginx/html

# Copy the custom Nginx configuration file
COPY ./infra/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 to the Docker host, so we can access it
EXPOSE 80

# Run Nginx
CMD ["nginx", "-g", "daemon off;"]
