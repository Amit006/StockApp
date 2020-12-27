FROM node:10
# Create app directory
RUN mkdir -p /usr/src/api
RUN mkdir -p /usr/src/wait
WORKDIR /usr/src/api

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy app source code
COPY . /usr/src/api

#Expose port and start application
EXPOSE 4001


CMD  ["npm", "start"]
