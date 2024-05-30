# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application’s source code
COPY . .

# Bind the app to port 3000
EXPOSE 3000

# Define the command to run your app
CMD ["node", "app.js"]
