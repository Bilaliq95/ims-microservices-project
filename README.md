# Microservices E-Commerce Platform

This project is a microservices-based e-commerce platform built using Docker, Kubernetes, and Node.js services for user authentication, product management, and frontend UI.

---

## 🛠️ Setup Instructions

### Prerequisites

- Docker & Docker Compose
- Kubernetes (minikube or compatible cluster)
- `kubectl` CLI

### 🚀 Local Development (Docker Compose)

```bash
git clone https://github.com/Bilaliq95/ims-microservices-project.git
cd your-repo
docker-compose up --build
```

### 🌐 Available Services

- Frontend: `http://localhost:3001`
- Auth Service: `http://localhost:3000`
- Product Service: `http://localhost:3002`

### ☸️ Kubernetes Deployment

```bash
kubectl create namespace ecommerce
kubectl apply -f k8s/db-secrets.yaml
kubectl apply -f k8s/db-config.yaml
kubectl apply -f k8s/auth-db-deployment.yaml
kubectl apply -f k8s/products-db-deployment.yaml
kubectl apply -f k8s/auth-db-service.yaml
kubectl apply -f k8s/products-db-service.yaml
kubectl apply -f k8s/auth-service-deployment.yaml
kubectl apply -f k8s/product-service-deployment.yaml
kubectl apply -f k8s/frontend-deployment.yaml
```

---

## 🧱 Architecture

- **Auth Service**: JWT-based authentication
- **Product Service**: Product management APIs
- **Frontend**: EJS UI

### REST API Endpoints

- `POST /auth/login`
- `GET /products`

---

## 🐳 Docker Images

- `auth-service`: `proshenjitbanik/auth-service:latest`
- `product-service`: `proshenjitbanik/product-service:latest`
- `frontend`: `proshenjitbanik/frontend:latest`

---

## ☸ Kubernetes Notes

### Autoscaling Example

```bash
kubectl autoscale deployment product-service --cpu-percent=50 --min=2 --max=5
```

### Secrets

Managed securely using Kubernetes Secrets.

---

## ✅ Testing Strategy

- **Unit Tests**: Auth & Product logic
- **Integration Tests**: DB interaction
- **E2E Tests**: Login + Product flow

---

## 🔁 CI/CD

### GitHub Actions

```yaml
name: Deploy
on: [push]
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: docker-compose build
      - run: docker-compose push
```

---

## 🚀 Usage Guide

1. Open `http://localhost:3001`
2. Login via Auth Service
3. Browse products via Product Service

---

## 📦 Repository

https://github.com/Bilaliq95/ims-microservices-project.git
