FROM node:16 AS development

WORKDIR /projects/project_planning/frontend

COPY package*.json  /projects/project_planning/frontend/

RUN npm install
RUN npm install -g @angular/cli@15.0.0

COPY . /projects/project_planning/frontend

EXPOSE 4300