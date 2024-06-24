# Budget Management System

A comprehensive budget management system developed for the Commercial Bank of Ethiopia using Expo React Native for the front end and Supabase for the back end. This system helps in tracking, managing, and analyzing financial data to ensure effective budget management.

## Table of Contents
- [Description](#description)
- [structure](#structure)
- [Usage](#usage)


## Description
The Budget Management System (BMS) is designed to streamline and enhance the financial planning and budgeting processes of the Commercial Bank of Ethiopia. It provides tools for budget creation, expense tracking, financial forecasting, and detailed reporting.

## structure


```
app
├── (auth)
│   ├── signin.jsx
│   ├── signup.jsx
│   └── _layout.jsx          # Stack navigation for auth screens
│
├── (drawer)
│   ├── tabs
│   │   ├── income.jsx
│   │   ├── setBudget.jsx
│   │   ├── setIncome.jsx
│   │   └── (budget)
│   │       ├── [id].jsx
│   │       └── myBudget.jsx
│   │   └── _layout.jsx      # Tab navigation for tabs screens
│   ├── help.jsx
│   ├── about.jsx
│   ├── endBudget.jsx
│   └── _layout.jsx          # Drawer navigation for drawer screens
│
├── index.jsx                # Main entry point
└── _layout.jsx              # Stack navigation for the app
```


## Installation

### Prerequisites
- [Node.js](https://nodejs.org/) (version 14.x or higher)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Supabase](https://supabase.io/) account and project
- [Git](https://git-scm.com/)
  
### Steps

#### Front End (Expo React Native)
1. Clone the repository:
    ```sh
    https://github.com/code-cooker-tech/Budget_management.git
    ```
2. Navigate to the front-end directory:
    ```sh
    cd Budget_management
    ```
    ```sh
    cd my-app
    ```
3. Install dependencies:
    ```sh
    npm install
    ```
4. Start the Expo server:
    ```sh
    npx expo start
    ```
5.email and password for login:
```sh
temesgengonfa@gmail.com
```
```sh
222222
```


#### Back End (Supabase)
1. Set up a new project on Supabase.
2. Create the necessary tables and schemas as per your requirements
```
Account    (id, created_at, CBE, Wallet, Telegram, uuid,transaction_date )
Budget     (id, created_at, budgetName, exchange, startDate, endDate, notes, total_amount, uuid)
Categories (id, created_at, item, amount, budget_id, uuid, remain)
Income     (id, created_at, incomeSourceName, amount, exchange, dateReceived, notes, frequency, incomeType, uuid)
Users      (id, created_at, email, uuid)
```
3. Obtain the Supabase URL and API key from your project settings.
4. Create a `.env` file in the `frontend` directory and add the following:
    ```env
    SUPABASE_URL=your_supabase_url
    SUPABASE_ANON_KEY=your_supabase_anon_key
    ``
## Usage

1. Open the Expo Go app on your mobile device.
2. Scan the QR code generated by `npx expo start`.
3. Log in with your credentials provided by the system admin.
4. Use the app to:
    - Create and manage budgets.
    - Track expenses and income.
    - Generate financial reports.
    - Analyze financial data with built-in tools.`
      
# splash screen
![splash screen](https://github.com/code-cooker-tech/Budget_management/assets/173291463/e7bdb287-90e7-4f11-884f-df6f93e16e60)

# Welcome screen
![welcome](https://github.com/code-cooker-tech/Budget_management/assets/173291463/fa52ee89-4901-4bbd-8b4f-4751a78dac23)

# My Account screen 

![my account 1](https://github.com/code-cooker-tech/Budget_management/assets/173291463/5c0ca133-57e3-411f-a319-948aebfbcdfa)


![my account 2](https://github.com/code-cooker-tech/Budget_management/assets/173291463/3967c920-4497-45b1-bb2b-6ada0d4221c5)

# my account screen

![set budget 1](https://github.com/code-cooker-tech/Budget_management/assets/173291463/4b03ebd5-7f5b-4837-a93d-0014e83ba765)



![set budget 2](https://github.com/code-cooker-tech/Budget_management/assets/173291463/443785dc-8596-44ad-bace-d436c9f0ad6d)


# set income screen

![set income 1](https://github.com/code-cooker-tech/Budget_management/assets/173291463/9433d1cc-0e22-4690-a8ad-fb056cdd7df3)



![set income 2](https://github.com/code-cooker-tech/Budget_management/assets/173291463/b061cdc2-8dcd-4a1c-95e5-17da170887f6)


# My budget screen

![my budget](https://github.com/code-cooker-tech/Budget_management/assets/173291463/0a3d7318-46ea-4d3a-98c6-a1cf0f4b0376)


![my budget detail](https://github.com/code-cooker-tech/Budget_management/assets/173291463/3b422835-28ee-4b2a-a901-27b604140d22)


![expense modal](https://github.com/code-cooker-tech/Budget_management/assets/173291463/2854c2a0-7648-43c7-b4a3-6f8da96fa0df)



# Drower Navigation

![drow navigation](https://github.com/code-cooker-tech/Budget_management/assets/173291463/e2d84a4f-8158-4ece-bb91-ec47a37d0076)

# closed Budget Screen

![closed budget](https://github.com/code-cooker-tech/Budget_management/assets/173291463/2d7567f6-5132-4eb0-86ab-a8887cd8cdc6)


# Income Screen

![income](https://github.com/code-cooker-tech/Budget_management/assets/173291463/3fa31221-2443-4df2-a738-b0d1a6cfeacb)


# Setting Screen

![setting](https://github.com/code-cooker-tech/Budget_management/assets/173291463/d69f6211-f3e4-4b84-9264-6ad0482c7aa3)













##Temesgen Gonfa 2024 
  
  
