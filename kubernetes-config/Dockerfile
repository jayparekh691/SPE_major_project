# Choose a base image
FROM alpine:3.14

# Create a working directory
WORKDIR /app

# Copy the configuration files
COPY ./kubernetes /app/kubernetes

# Install kubectl
RUN apk add --no-cache curl \
  && curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl" \
  && chmod +x kubectl \
  && mv kubectl /usr/local/bin/kubectl

# Set the entry point
ENTRYPOINT ["kubectl"]
