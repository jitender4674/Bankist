# **Bankist**

Bankist is a minimalistic online banking application designed to simulate core functionalities of a modern banking interface. It provides a clean and intuitive user experience while showcasing JavaScript concepts and DOM manipulation techniques.

## **Features**

- **User Login:**
  - Secure login using a unique username and PIN.
  - Personalized welcome message displayed after login.

- **Account Overview:**
  - Displays the current balance with real-time currency formatting based on the user's locale.
  - Highlights recent transactions (deposits and withdrawals) along with formatted dates (e.g., "Today," "Yesterday," or specific dates).

- **Transaction Management:**
  - **Money Transfers:** Transfer funds to other accounts within the system, with instant updates to balances and transactions.
  - **Loan Requests:** Request loans, approved based on deposit history.
  - **Account Closure:** Securely delete an account by verifying credentials.

- **Dynamic Updates:**
  - Real-time clock display below the balance section.
  - Automatic updates for all account-related changes, such as balance recalculations and transaction logs.

- **Data Management:**
  - Movement dates and transaction amounts are dynamically stored and formatted using `Date` and `Intl` APIs.
  - Accounts are pre-defined for demo purposes, but the architecture supports multiple users.

## **Technical Highlights**
- **JavaScript ES6+:**
  - Use of higher-order functions like `map`, `filter`, and `reduce`.
  - Modular functions for reusable code.
- **Date and Time Handling:**
  - Dynamic formatting with `Intl.DateTimeFormat` for locale-specific display.
- **Responsive Design:**
  - Clean and structured UI for better user experience.
- **Currency Formatting:**
  - Seamless number and currency display with `Intl.NumberFormat`.

## **How to Use**
1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/jitender4674/Bankist.git
   ```
2. Open the project folder and start the `index.html` file in your browser.

## **Demo Account**
Use the following credentials to log in:
- **Username:** `jb`
- **PIN:** `1111`

## **Future Enhancements**
- Adding persistent data storage via local storage or backend integration.
- Enhancing security features for account access.
- Expanding the app with additional banking functionalities like recurring payments and spending insights.

---
