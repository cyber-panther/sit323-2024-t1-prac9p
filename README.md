# MongoDB Deployment on Kubernetes

This repository contains configuration files and scripts for deploying a MongoDB database on a Kubernetes cluster and setting up a Node.js application to interact with the database.

## Repository Structure

- **createDeployment.yaml**: MongoDB deployment configuration
- **createPersistentVolume.yaml**: Persistent Volume configuration
- **createPersistentVolumeClaim.yaml**: Persistent Volume Claim configuration
- **createService.yaml**: MongoDB service configuration
- **createStorageClass.yaml**: Storage class configuration
- **db.js**: MongoDB connection script for the Node.js application
- **index.js**: Node.js application script
- **Dockerfile**: Dockerfile for building the Node.js application

## Instructions

1. **Clone the Repository**

   ```sh
   git clone https://github.com/username/sit323/737-2024-t1-prac7p.git
   cd sit323/737-2024-t1-prac7p
   ```

2. **Build the Docker Image**

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

4. **Deploy Node.js Application on Kubernetes**

   ```sh
   kubectl apply -f nodeDeployment.yaml
   ```

5. **Access the Application**

   Find the NodePort for the service and access the application via `http://<node-ip>:<node-port>`.

6. **Test the Deployment**

   Ensure the application can perform CRUD operations on the MongoDB database. Use the following endpoints for testing:

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

7. **Monitor Performance**

   Use monitoring tools to ensure MongoDB and the application are running efficiently.

## Deliverables

- **GitHub Repository**: [https://github.com/username/sit323/737-2024-t1-prac7p](https://github.com/username/sit323/737-2024-t1-prac7p)
- **Dockerfile**: Included in the repository
- **Kubernetes Configurations**: Included in the repository
- **Instructions**: Provided in this README

## Screenshots/Videos

Include screenshots or videos demonstrating the successful deployment and interaction with the application. For example, you can show:

- MongoDB and Node.js application running on Kubernetes.
- Accessing the application via browser.
- Performing CRUD operations and viewing results.

Feel free to add any additional information or documentation as necessary.