# 🚗 Tabela Fipe - Frontend Test

## 📝 Description
This repository contains my solution for the frontend technical test, which includes programming exercises and a vehicle price consultation project using the Brazilian FIPE table.

## 🛠️ Tech Stack
- **Framework**: React.js
- **State Management**: Redux Toolkit
- **UI Components**: Material-UI
- **Styling**: Emotion (CSS-in-JS)
- **Font**: Roboto
- **Deployment**: Vercel

## 🚀 Live Demo
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-%23000000?style=flat&logo=vercel)](https://tabela-fipe.vercel.app)

## 📋 Exercises Solution

### 1️⃣ Maskify Credit Card Numbers
```javascript
function maskify(string) {
  return string.length > 4 
    ? '#'.repeat(string.length - 4) + string.slice(-4)
    : string;
}
