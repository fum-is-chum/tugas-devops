# execute this to stress test the backend server
kubectl run -i --tty load-generator-1 --rm --image=busybox:1.28 --restart=Never -- /bin/sh -c "while sleep 0.01; do wget -q -O- http://backend-service/activity-groups; done" && docker container prune -f

# execute this to stress test the frontend server
kubectl run -i --tty load-generator-1 --rm --image=busybox:1.28 --restart=Never -- /bin/sh -c "while sleep 0.01; do wget -q -O- http://frontend-service/activity-groups; done" && docker container prune -f

# crash backend pod
kubectl run -i --tty pod-crasher --rm --image=busybox:1.28 --restart=Never -- /bin/sh -c "wget -q -O- http://backend-service/crash" && docker container prune -f