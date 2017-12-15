# node-prometheus-grafana-kube
Report metrics from node on kubernetes top grafana via prometheus

Node app that pusheds random metrics on reporter at set intervals, each available metrics inthe prom-client lib is added.

Histogram to simulate http response times
Gaugue to simulate active sessions
Counter to simulate messages receieved from i.e. mq

Grafana and Prometheus docker images running on minikube scraping the underlying infrastructure as well as  pods deployed to kube

## Bootstrap

Start minikube

`minikube start`

To view dashboard : 
`minikube dashboard`

## Install prometheus
Create config : 
` kubectl apply -f minikube_config/prometheus-config.yaml`
```
-> configmap "prometheus-config-pod" created
```

`kubectl apply -f minikube_config/prometheus.yml`

```
->  clusterrole "prometheus" configured
    serviceaccount "default" configured
    clusterrolebinding "prometheus" configured
    deployment "prometheus" configured
    service "prometheus" configured 
```
 `minikube service --namespace=default prometheus` 
 to open the UI of prometheus (needed later)   

## Install grafana 
`kubectl apply -f minikube_config/grafana.yml`
```
->  deployment "grafana" configured
    service "grafana" configured
```
open UI: 
 `minikube service --namespace=default grafana` 

Configure prometheus datasource
Copy the URL from the prometheus taband use as URL in grafana  

## Node app 
`kubectl apply -f minikube_config/node-app.yml`
```
->  deployment "node-app" configured
    service "node-app" configured 
```
