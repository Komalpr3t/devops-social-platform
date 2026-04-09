# Kubernetes Notes

## Overview
Kubernetes deploys and manages containers in a cluster using objects like Deployments and Services.
This project includes Kubernetes manifests in `k8s/` for both backend and frontend.

## Key Kubernetes concepts
- Pod: the smallest deployable unit, one or more containers.
- Deployment: manages replica sets and ensures pods remain running.
- Service: exposes pods to other pods or external traffic.
- ClusterIP: internal-only service.
- NodePort: external access on a node port.

## Backend manifests
### Deployment: `k8s/backend-deployment.yaml`
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: backend-deployment
spec:
  replicas: 1
  selector:
    matchLabels:
      app: backend
  template:
    metadata:
      labels:
        app: backend
    spec:
      containers:
        - name: backend
          image: komalpreet1703/devops-social-backend:latest
          ports:
            - containerPort: 5000
```

### Service: `k8s/backend-service.yaml`
```yaml
apiVersion: v1
kind: Service
metadata:
  name: backend-service
spec:
  selector:
    app: backend
  ports:
    - protocol: TCP
      port: 5000
      targetPort: 5000
  type: ClusterIP
```

### What this does
- Deployment creates pods using the backend image.
- The pod has label `app: backend`.
- Service selects those pods and routes port `5000`.
- `ClusterIP` means the backend is reachable only inside the cluster, e.g. from the frontend service.

## Frontend manifests
### Deployment: `k8s/frontend-deployment.yaml`
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: frontend-deployment
spec:
  replicas: 1
  selector:
    matchLabels:
      app: frontend
  template:
    metadata:
      labels:
        app: frontend
    spec:
      containers:
        - name: frontend
          image: komalpreet1703/devops-social-frontend:latest
          ports:
            - containerPort: 80
```

### Service: `k8s/frontend-service.yaml`
```yaml
apiVersion: v1
kind: Service
metadata:
  name: frontend-service
spec:
  selector:
    app: frontend
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80
  type: NodePort
```

### What this does
- Frontend deployment creates pods from the published frontend image.
- Service selects pods with `app: frontend`.
- `type: NodePort` exposes the frontend outside the cluster on a node port.

## Example internal communication
Inside Kubernetes, the frontend can call the backend using service DNS:
```text
http://backend-service:5000/api
```
This means the frontend pod does not need to know host machine addresses.

## Example scaling
To scale the backend to 3 pods:
```bash
kubectl scale deployment backend-deployment --replicas=3
```
Kubernetes will create 3 identical backend pods and the backend service will load balance across them.

## Deployment considerations
- Use `readinessProbe` and `livenessProbe` for production readiness.
- Keep container ports aligned with the Docker image ports.
- Use proper resource requests and limits for CPU and memory.
- Use a registry for images rather than local builds.

## Networking notes
- `ClusterIP` is best for internal APIs and services.
- `NodePort` allows external access but is not ideal for production by itself.
- In production, combine `NodePort` with an Ingress or LoadBalancer.

## Best practices for this project
- keep manifest files small and readable
- use `Deployment` for pod lifecycle management
- use `Service` to decouple pods from network consumers
- avoid exposing backend directly as `NodePort` unless necessary
- use distinct labels like `app: backend` and `app: frontend`

## Example command flow
```bash
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/backend-service.yaml
kubectl apply -f k8s/frontend-deployment.yaml
kubectl apply -f k8s/frontend-service.yaml
```

Then verify with:
```bash
kubectl get pods
kubectl get svc
```

## Difference between:
- `kubectl get nodes`: Lists all nodes in the cluster (physical or virtual machines).
- `kubectl get pods`: Lists all pods running in the cluster (containers grouped in pods).

## Recent Deployment Efforts
I was trying to deploy the full-stack social platform application to a local Kubernetes cluster using Minikube. This involved:
- Starting Minikube to create a local Kubernetes environment.
- Applying the Kubernetes manifests for backend and frontend deployments and services.
- Verifying the pods and services are running correctly.
- Pushing the Kubernetes YAML files to GitHub for version control.
- Ensuring the frontend can communicate with the backend via internal service DNS.
- Testing external access to the frontend through NodePort.
