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
``` 

## 5. AI Usage Note
I utilized AI tools (Gemini) primarily for debugging and clarifying technical concepts during development.

**Summary of Usage:**
* **Concept Clarification:** Used AI to better understand how to structure an Express.js API and handle HTTP requests.
* **Debugging:** Assisted in resolving syntax errors and platform-specific issues (e.g., Windows PowerShell commands).
* **Testing:** Consulted AI to verify how to test API endpoints effectively using `curl` and `fetch` scripts since no frontend UI was required.

**Key Prompts Used:**
* "How to structure a Node.js project for a simple API?"
* "Explain how to filter arrays in JavaScript based on multiple conditions."
* "How to simulate a login request using fetch in a test script?"
* "Why am I getting a 'Cannot GET /' error in Express?"