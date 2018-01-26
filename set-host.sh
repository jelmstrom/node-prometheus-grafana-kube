#! /bin/bash


echo "$(minikube ip)  grafana.kube.com"  >> /etc/hosts
echo "$(minikube ip)  prometheus.kube.com"  >> /etc/hosts
echo "$(minikube ip)  cgw.kube.com"  >> /etc/hosts
