FROM node:16 AS development

WORKDIR /projects/project_planning/api

COPY package*.json ./

RUN npm install 

COPY . .

RUN npm run build

EXPOSE 3100


###########################
## PRODUCTION ##
###########################

FROM node:16 AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /projects/project_planning/api

COPY --from=development /projects/project_planning/api/ .

EXPOSE 3000
# run app
CMD [ "node", "dist/main"]