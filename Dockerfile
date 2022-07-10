# ============================
# Building stage
# ============================
FROM node:16.13.2-alpine3.14 as build-stage

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --no-save

COPY . .

RUN npm run build

# ============================
# Login Building stage
# ============================
FROM appeiron/basics-login as login-build-stage

# ============================
# Run stage
# ============================
FROM nginx:1.21.6-alpine as production-stage

RUN mkdir /app
RUN mkdir /loginApp

COPY --from=build-stage /app/dist /app
COPY --from=login-build-stage /app/dist /loginApp

COPY nginx.conf /etc/nginx/nginx.conf