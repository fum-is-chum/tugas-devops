# start image registry
docker-compose down && docker-compose up -d registry && \
# Description: This script is used to deploy the application to a Kubernetes cluster.
cd ./deployments/apps && \
kubectl apply -f ./database-deployment.yaml -n ingress-nginx && \
kubectl apply -f ./backend-deployment.yaml -n ingress-nginx && \
kubectl apply -f ./frontend-deployment.yaml -n ingress-nginx && \
kubectl apply -f ./ingress-deployment.yaml -n ingress-nginx && \
kubectl wait --for=condition=available --timeout=300s deployment/ingress-nginx-controller -n ingress-nginx && \
kubectl apply -f ../ingress-rule/todolist-ingress-rule.yaml && \
kubectl apply -f ./metric-server.yaml