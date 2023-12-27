# Creaing Custom Resource

### from: https://www.youtube.com/watch?v=q7b23612pSc&t=159s

### Create PDF Resource
````bash
kubectl apply -f pdfdocument.yaml # will return error
````

### Create the pdf custom resource defintion
````bash
kubectl apply -f pdf-crd.yaml
````

### Listing all pdfdocument resources
````bash
kubectl get pdfdocument
kubectl api-resources | grep pdf
````

### To connect to the kubernetes api and list the resources from localhost use
````bash
kc proxy --port=8080 # on different terminal
curl localhost:8080/apis  | grep tsemach
curl localhost:8080/apis/tsemach.org/v1/namespaces/default/pdfdocuments
````

### Creating the resource itself
````bash
kubectl apply -f pdfdocument.yaml
````

### To list the new resource created
````bash
kubectl get pdf
curl localhost:8080/apis/tsemach.org/v1/namespaces/default/pdfdocuments
````

# Creating the Controller
#### Initialize the go project
````bash
go mod init tsemach.org/v2
kubebuilder init
go mod tidy
make
kubebuilder create api --group tsemach.org --version v1 --kind PdfDocument
````

# Building the controller

# Running the contoller
After writing the code run
````bash
make run
````

This will create the custom resource file at config/crd/bases directory
````bash
apply -f config/crd/bases/tsemach.org.my.domain_pdfdocuments.yaml
``````


