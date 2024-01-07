# Build the frontend docker image and push it to the local registry
cd ./angular-to-do-list && \
docker build -t todo-list-frontend:latest -f Dockerfile . && \
docker tag todo-list-frontend:latest localhost:5000/todo-list-frontend:latest && \
docker push localhost:5000/todo-list-frontend:latest && \
docker rmi $(docker images -f "dangling=true" -q)