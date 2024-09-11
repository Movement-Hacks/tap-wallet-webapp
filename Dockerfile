# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/go/dockerfile-reference/

# Want to help us make this template better? Share your feedback here: https://forms.gle/ybq9Krt8jtBL3iCk7

ARG NODE_VERSION=22.3.0
 
################################################################################
# Use node image for base image for all stages.
FROM node:${NODE_VERSION}-alpine as base
RUN echo ${REACT_APP_GOOGLE_CLIENT_ID}
# Set working directory for all build stages.
WORKDIR /usr/src/app

# Install global cli
RUN npm install serve -g

################################################################################
# Create a stage for installing production dependecies.
FROM base as deps

# Download dependencies as a separate step to take advantage of Docker's caching.
# Leverage a cache mount to /root/.npm to speed up subsequent builds.
# Leverage bind mounts to package.json and package-lock.json to avoid having to copy them
# into this layer.
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

################################################################################
# Create a stage for building the application.
FROM deps as build

# Download additional development dependencies before building, as some projects require
# "devDependencies" to be installed to build. If you don't need this, remove this step.
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci

ENV NODE_ENV production

ARG REACT_APP_GOOGLE_REDIRECT_URI
ENV REACT_APP_GOOGLE_REDIRECT_URI $REACT_APP_GOOGLE_REDIRECT_URI

ARG REACT_APP_GOOGLE_CLIENT_ID
ENV REACT_APP_GOOGLE_CLIENT_ID $REACT_APP_GOOGLE_CLIENT_ID

ARG REACT_APP_BACKEND_API_URL
ENV REACT_APP_BACKEND_API_URL $REACT_APP_BACKEND_API_URL

ARG REACT_APP_BACKEND_GRAPHQL_URL
ENV REACT_APP_BACKEND_GRAPHQL_URL $REACT_APP_BACKEND_GRAPHQL_URL

# Copy the rest of the source files into the image.
COPY . .
# Run the build script.
RUN npm run build

################################################################################
# Create a new stage to run the application with minimal runtime dependencies
# where the necessary files are copied from the build stage.
FROM base as final

USER node

COPY --from=build /usr/src/app/build ./build

EXPOSE 7755

CMD serve -s build -l 7755
