cd . && \
docker-compose build && \
docker tag todo-list-backend:latest localhost:5000/todo-list-backend:latest && \
docker tag todo-list-frontend:latest localhost:5000/todo-list-frontend:latest && \
docker push localhost:5000/todo-list-backend:latest && \
docker push localhost:5000/todo-list-frontend:latest