# start image registry
docker-compose down && docker-compose up -d registry && \
# Description: This script is used to deploy the application to a Kubernetes cluster.
cd ./deployments/apps && \
kubectl apply -f ./database-deployment.yaml && \
kubectl apply -f ./backend-deployment.yaml && \
kubectl apply -f ./frontend-deployment.yaml && \
kubectl apply -f ./ingress-deployment.yaml && \
kubectl wait --for=condition=available --timeout=300s -n ingress-nginx deployment/ingress-nginx-controller && \
kubectl apply -f ../ingress-rule/todolist-ingress-rule.yaml && \
kubectl apply -f ./metric-server.yaml