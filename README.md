# Coupon Management API

## 1. Project Overview
This is a simple HTTP API for managing e-commerce coupons. It allows users to create new coupons with specific rules (dates, cart values, user tiers) and automatically finds the best applicable coupon for a given user and cart.

## 2. Tech Stack
* **Language:** JavaScript (Node.js)
* **Framework:** Express.js
* **Database:** In-memory storage (JavaScript Arrays)

## 3. How to Run
### Prerequisites
* Node.js installed (v14 or higher)

## 4. How to Run Tests
To verify the system is working, you can run the included test script which creates a coupon and checks if it applies to a sample cart:
```bash
node test-final.js

### Setup Steps
1.  Clone the repository or download the files.
2.  Open the terminal in the project folder.
3.  Install dependencies:
    ```bash
    npm install
    ```

### Start the Service
Run the following command:
```bash
node index.js