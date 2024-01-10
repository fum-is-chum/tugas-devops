# Stop all pods
kubectl delete deployment frontend-deployment -n ingress-nginx && \
kubectl wait --for=delete deployment/frontend-deployment -n ingress-nginx --timeout=60s

kubectl delete deployment backend-deployment -n ingress-nginx && \
kubectl wait --for=delete deployment/backend-deployment -n ingress-nginx --timeout=60s

kubectl delete deployment mysqldb-deployment -n ingress-nginx && \
kubectl wait --for=delete deployment/mysqldb-deployment -n ingress-nginx --timeout=60s

kubectl delete ingress frontend-ingress -n ingress-nginx && \
kubectl wait --for=delete ingress/frontend-ingress -n ingress-nginx --timeout=60s

kubectl delete ingress backend-ingress -n ingress-nginx && \
kubectl wait --for=delete ingress/backend-ingress -n ingress-nginx --timeout=60s

kubectl delete deployment ingress-nginx-controller -n ingress-nginx && \
kubectl wait --for=delete deployment/ingress-nginx-controller -n ingress-nginx --timeout=60s

kubectl delete deployment metrics-server -n kube-system && \
kubectl wait --for=delete deployment/metrics-server -n kube-system --timeout=60s

docker container prune -f