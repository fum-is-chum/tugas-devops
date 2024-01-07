cd ./ && docker-compose down && docker-compose build \
&& docker-compose up -d registry \
&& docker tag todo-list-frontend:latest localhost:5000/todo-list-frontend:latest \
&& docker push localhost:5000/todo-list-frontend:latest \
&& docker tag todo-list-backend:latest localhost:5000/todo-list-backend:latest \
&& docker push localhost:5000/todo-list-backend:latest