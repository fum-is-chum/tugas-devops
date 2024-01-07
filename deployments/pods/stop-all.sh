# Stop all pods
kubectl delete deployment frontend-deployment -n ingress-nginx && \
kubectl delete deployment backend-deployment -n ingress-nginx && \
kubectl delete deployment mysqldb-deployment -n ingress-nginx && \
kubectl delete ingress todolist-ingress -n ingress-nginx && \
kubectl delete deployment ingress-nginx-controller -n ingress-nginx && \
docker container prune -f