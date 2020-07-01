# Build web sever
FROM golang:alpine AS build-env
ADD . /src
RUN cd /src && go build -o hello

# -------------------------
# Final image
FROM alpine
WORKDIR /
COPY --from=build-env /src/hello /
ENTRYPOINT ./hello
