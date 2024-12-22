FROM node:20

# Set the working directory
WORKDIR /app

# Install wkhtmltopdf
RUN apt-get update && apt-get install -y wkhtmltopdf

# Chrome dependencies
RUN apt-get install -y libnss3 libasound2

# Copy and build project
COPY . .
RUN npm ci
RUN npm run build

EXPOSE 3000

CMD ["node", "build"]