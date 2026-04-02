# 🛡️ SafeSurf – AI-Powered Browser Security Shield

## 🌟 Inspiration
With the rise of phishing attacks, data leaks, and AI-based prompt injections, everyday users are increasingly vulnerable online. We wanted to build a real-time protection system that doesn’t just detect threats — but actively **warns and educates users** while browsing.

---

## 🚀 What it does
SafeSurf is a Chrome extension that analyzes websites in real-time and detects:

-  Phishing attempts  
-  Sensitive data leaks (API keys, secrets)  
-  Prompt injection attacks  
-  Suspicious scripts and behaviors  
-  Social engineering patterns  

If a threat is detected, SafeSurf:
- Blurs the webpage
- Shows a **security warning overlay**
- Explains why the page is dangerous
- Lets users safely go back or continue

---


## 🎥 Demo Video

[![Watch Demo](https://img.youtube.com/vi/YL0KcmhIUwM/0.jpg)](https://www.youtube.com/watch?v=YL0KcmhIUwM)


## 🏗️ How we built it

### 🔹 Frontend (Chrome Extension)
- `content.js` → Collects page data (forms, links, scripts)
- `background.js` → Sends data to backend & triggers UI
- `overlay.js` → Displays warning UI

### 🔹 Backend (Flask API)
- Rule-based detection engine
- AI-based analysis using Google Gemini
- Leak detection using regex patterns
- Prompt injection detection

### 🔹 AI Integration
- Uses Gemini API to analyze page content
- Provides risk scoring and reasoning

---

## ⚙️ Tech Stack

- JavaScript (Chrome Extension APIs)
- Python (Flask)
- Google Gemini API
- Regex-based security detection

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository
git clone https://github.com/rutujasoundale/SafeSurf.git
cd SafeSurf

---

### 2️⃣ Backend Setup (Flask API)

cd backend
pip install -r requirements.txt
python app.py

Make sure backend runs on:
http://127.0.0.1:5000

---

### 3️⃣ Add API Key (Gemini)

GEMINI_API_KEY=your_api_key_here

---

### 4️⃣ Load Chrome Extension

1. Open Chrome → chrome://extensions/
2. Enable Developer Mode
3. Click Load unpacked
4. Select frontend folder

---

### 5️⃣ Run the Project

- Start backend
- Open any website
- SafeSurf will analyze pages
- Warning overlay appears on threats

---

## ⚠️ Challenges we ran into

- Handling Chrome extension messaging correctly  
- Managing async script injection  
- Avoiding excessive API calls  
- Designing accurate phishing detection rules  
- Handling API rate limits (Gemini quota ~20 calls/session)

---

## 🏆 Accomplishments 

- Built a real-time browser security system
- Integrated AI + rule-based detection
- Created interactive warning UI
- Detected phishing-style websites
- Designed scalable pipeline

---

## 📚 What we learned

- Chrome extension architecture
- Cybersecurity threat patterns
- API rate limiting
- Detection system design
- UX in security tools

---

## 🤝 Contributing

- Add cookie tracking system
- Improve UI/UX
- Enhance detection logic
- Work on zero-day heuristics

---

## 🔗 GitHub Repo
https://github.com/rutujasoundale/SafeSurf
