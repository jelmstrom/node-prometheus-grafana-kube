# node-prometheus-grafana-kube
Report metrics from node on kubernetes to grafana via prometheus

Node app that pushes random metrics on reporter at set intervals, each available metrics in the prom-client lib is added.

Histogram to simulate http response times
Gaugue to simulate active sessions
Counter to simulate messages receieved from i.e. mq

Grafana and Prometheus docker images running on minikube scraping the underlying infrastructure as well as pods deployed to kube.

#prerequisite
Install minikube : https://kubernetes.io/docs/tasks/tools/install-minikube/
Install kubectl : https://kubernetes.io/docs/tasks/tools/install-kubectl/
Install helm : https://docs.helm.sh/using_helm/#installing-helm

## Bootstrap

Run `sudo .init.sh`

One command completes there should be a minikube installed. To view dashboard run : `minikube dashboard`
Open a browser to `grafana.kube.com` to verify that the ingress config is correct. You should see a login screen. Use admin/admin to log in.
Sudo is needed to add the hostnames, the minikube IP changes with virtualbox driver (at least on mac) (https://github.com/kubernetes/minikube/issues/951)

##  Prometheus
Accessible on `prometheus.kube.com`
Exposes metrics to

## Setup grafana
Log in to grafana on `http://grafana.kube.com`

Configure prometheus datasource as `http://prometheus` using the `proxy` option in grafana. This works because the service is in the same namespace and the service port is `80`
