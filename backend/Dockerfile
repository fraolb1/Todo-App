# Use Node.js 20 as the base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy Prisma schema and generate client
COPY prisma ./prisma
RUN npx prisma generate

# Copy the rest of the application
COPY . .

# Build TypeScript
RUN npm run build

# Expose port
EXPOSE 5000

# Start the application
CMD ["npm", "start"]