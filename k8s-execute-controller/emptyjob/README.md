# Creaing Custom Resource

### from: https://www.youtube.com/watch?v=q7b23612pSc&t=159s

### Create PDF Resource
````bash
kubectl apply -f emptyjob.yaml # will return error
````

### Create the pdf custom resource defintion
````bash
kubectl apply -f emptyjob-crd.yaml
````

### Listing all emptyjob resources
````bash
kubectl get emptyjob
kubectl api-resources | grep pdf
````

### To connect to the kubernetes api and list the resources from localhost use
````bash
kc proxy --port=8080 # on different terminal
curl localhost:8080/apis  | grep tsemach
curl localhost:8080/apis/tsemach.org/v1/namespaces/default/emptyjobs
````

### Creating the resource itself
````bash
kubectl apply -f emptyjob.yaml
````

### To list the new resource created
````bash
kubectl get emptyjob
curl localhost:8080/apis/tsemach.org/v1/namespaces/default/emptyjobs
````

# Creating the Controller
#### Initialize the go project
````bash
go mod init tsemach.org/v2
kubebuilder init
go mod tidy
make
kubebuilder create api --group tsemach.org --version v1 --kind EmptyJob
````

# Building the controller

This will create the custom resource file at config/crd/bases directory
````bash
apply -f config/crd/bases/tsemach.org.my.domain_emptyjobs.yaml
``````

# Running the contoller
After writing the code run
````bash
make run
````


