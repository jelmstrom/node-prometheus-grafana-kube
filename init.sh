#! /bin/bash

minikube start --bootstrapper kubeadm
kubectl apply -f minikube_config/tiller.yml
kubectl apply -f minikube_config/propmetheus-roles.yml
kubectl apply -f minikube_config/default_backend.yml
helm init --service-account tiller

#pause until tiller is available

kubectl get pod -n kube-system | grep tiller | grep 1/1  | grep Running
while [ $? -ne 0 ]; do
    sleep 5s
    echo 'retry' ;
    kubectl get pod -n kube-system | grep tiller | grep 1/1 | grep Running
done

helm install --name ingress-controller stable/nginx-ingress --namespace kube-system --set controller.hostNetwork=true,controller.kind=DaemonSet --set rbac.create=true
helm install --name metrics charts/metrics
