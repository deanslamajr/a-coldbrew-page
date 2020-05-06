FROM node:12.16.0

# label helps clean up intermediate container after build
LABEL stage=builder

WORKDIR /opt/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

RUN NODE_ENV=production npm run build

# copy app to a base image with smaller filesize
# e.g. we don't need the build libraries (gcc) after running `npm install`
FROM node:12.16.0-alpine
RUN mkdir /snap-dragon
WORKDIR /snap-dragon

COPY --from=0 /opt/app .

EXPOSE 8080
ENV PORT 8080

CMD [ "npm", "run", "start" ]