# Build the backend docker image and push it to the local registry
cd ./to-do-list-backend && \
docker build -t todo-list-backend:latest -f Dockerfile . && \
docker tag todo-list-backend:latest localhost:5000/todo-list-backend:latest && \
docker push localhost:5000/todo-list-backend:latest && \
docker rmi $(docker images -f "dangling=true" -q)