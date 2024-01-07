FROM golang:1.20.1-alpine as dependencies
WORKDIR /app
COPY go.mod .
COPY go.sum .
RUN go mod download

FROM dependencies as builder
COPY . .
RUN go build -o server

# Final
FROM alpine
WORKDIR /root/app
COPY --from=builder /app/. .

# Install wait-for-it script
RUN apk --no-cache add curl && apk --no-cache add bash\
    && curl -o wait-for-it.sh https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh \
    && chmod +x wait-for-it.sh

EXPOSE 8000
# Set server to wait for MySQL service
CMD ["./wait-for-it.sh", "--timeout=60", "mysqldb-service:3306", "--", "./server"]