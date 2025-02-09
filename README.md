# 🐶 Dog Adoption App

This is a **Dog Adoption Platform** built with **Angular 19**. It allows users to search for dog breeds and submit adoption requests.  
The app integrates with an external API to fetch breed data and images.

---

## 🚀 Features

- **Dynamic Navigation**: Tab-based navigation between the breed search and adoption form.
- **API Integration**: Fetches real-time breed information and images.
- **Reactive Forms**: Uses Angular Reactive Forms for the adoption form.
- **State Management**: Manages state using RxJS `BehaviorSubject`.
- **Responsive UI**: Optimized for both desktop and mobile.

---

## 📂 Project Structure

```
/src
 ├── app/
 │   ├── components/
 │   │   ├── tabs/            # Navigation between sections
 │   │   ├── search/          # Search for breeds
 │   │   ├── adoption-form/   # Adoption form
 │   ├── services/
 │   │   ├── dog.service.ts   # Handles API calls and state management
 │   ├── app.component.ts     # Root component
 ├── assets/                  # Images, styles
 ├── environments/            # API configuration
```

---

## 🛠 Installation & Setup

### 1️⃣ Install Dependencies
```sh
npm install
```

### 2️⃣ Run the Development Server
```sh
ng serve
```
Then, open **[http://localhost:4200](http://localhost:4200)** in your browser.

---

## 📡 API Integration

The app retrieves data from the **Dog CEO API** and supports:

- Fetching **all available breeds**
- Searching for **specific breeds**
- Fetching **random breed images**
- Selecting **number of images per request**

---

## 📝 Running Tests

To execute unit tests, use:
```sh
ng test
```
For end-to-end testing:
```sh
ng e2e
```

---

## 📦 Building for Production

To create a production-ready build, run:
```sh
ng build --configuration=production
```
The output will be stored in the `/dist` folder.

---

## 📝 Additional Notes for Reviewers

- The **search component** allows filtering breeds in real time.
- The **adoption form** ensures that required fields are validated before submission.
- The app is structured using **Angular best practices**, including modularization and service-based API calls.
- **State management** is handled using `BehaviorSubject` for efficient reactivity.


