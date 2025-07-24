# Accenture - eCommerce App

A modern eCommerce web application built using **Next.js**, **TypeScript**, and **Redux** with responsive design  and modular architecture.

---

## Features

- Product listing with filters and search
- Product quick-view popup modal with accessibility support
- Mobile responsive design
- Modular styling with CSS Modules
- Clean folder structure and scalable codebase
- Basic accessibility features (aria labels, keyboard navigation, color contrast)


---

## Getting Started

### 1. How to Run this App on local:
    1.1 Clone this Repo
        git clone https://github.com/JagOrganisation/eCommerce.git
        cd eCommerce

    1.2. Install Dependencies
         npm install

    1.3. npm run dev
         App will be available at [http://localhost:3000](http://localhost:3000)

   > 🚨 **Warning:** If you face any errors, delete the `node_modules` folder and `package-lock.json` file, then re-run `npm install`.
---


## Build for Production

```bash
npm run build
```

This command will create PROD ready files under .next > static folder.
We have deployed this App on Vercel using PROD build and Link for same is:
> https://e-commerce-five-ebon-61.vercel.app
---

## How to Check Linting Errors

```bash
npm run lint
```

---

## How to run Unit tests

```bash
npm run test
```

---

## Tech Stack

- **Framework**: Next.js 15.x
- **Language**: TypeScript
- **State Management**: Redux Toolkit
- **Styling**: CSS Modules
- **CI/CD**: GitHub Actions (example workflow included)

---
