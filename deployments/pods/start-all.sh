# Description: This script is used to deploy the application to a Kubernetes cluster.
cd ./deployments/pods && \
kubectl apply -f ./database-deployment.yaml -n ingress-nginx && \
kubectl apply -f ./backend-deployment.yaml -n ingress-nginx && \
kubectl apply -f ./frontend-deployment.yaml -n ingress-nginx && \
kubectl apply -f ./ingress-deployment.yaml -n ingress-nginx && \
kubectl wait --for=condition=available --timeout=300s deployment/ingress-nginx-controller -n ingress-nginx && \
kubectl apply -f ../ingress/todolist-ingress.yaml