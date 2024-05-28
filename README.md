# MongoDB Deployment on Kubernetes

This repository contains configuration files and scripts for deploying a MongoDB database on a Kubernetes cluster and setting up a Node.js application to interact with the database for SIT323 Task 9.1P 

## Repository Structure

- **createDeployment.yaml**: MongoDB deployment configuration
- **createPersistentVolume.yaml**: Persistent Volume configuration
- **createPersistentVolumeClaim.yaml**: Persistent Volume Claim configuration
- **createService.yaml**: MongoDB service configuration
- **createStorageClass.yaml**: Storage class configuration
- **db.js**: MongoDB connection script for the Node.js application
- **index.js**: Node.js application script
- **Dockerfile**: Dockerfile for building the Node.js application

1. **Build the Docker Image**

   ```sh
   docker build -t node-app .
   ```

3. **Deploy MongoDB on Kubernetes**

   ```sh
   kubectl apply -f createStorageClass.yaml
   kubectl apply -f createPersistentVolume.yaml
   kubectl apply -f createPersistentVolumeClaim.yaml
   kubectl apply -f createDeployment.yaml
   kubectl apply -f createService.yaml
   ```

6. **Test the Deployment**

   The application can perform CRUD operations on the MongoDB database. Used the following endpoints for testing:

   - **GET /history**: Retrieve calculation history.
   - **PUT /history/:id**: Update a calculation record.
   - **DELETE /history/:id**: Delete a calculation record.
   - **GET /add?num1=&num2=**: Perform addition.
   - **GET /subtract?num1=&num2=**: Perform subtraction.
   - **GET /multiply?num1=&num2=**: Perform multiplication.
   - **GET /divide?num1=&num2=**: Perform division.
   - **GET /exponential?num1=&num2=**: Perform exponential operation.
   - **GET /squareRoot?num1=**: Perform square root operation.
   - **GET /modulo?num1=&num2=**: Perform modulo operation.