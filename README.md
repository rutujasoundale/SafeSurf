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

## ⚠️ Challenges we ran into

- Handling Chrome extension messaging correctly  
- Managing async script injection  
- Avoiding excessive API calls  
- Designing accurate phishing detection rules 
- Handling API rate limits (Gemini quota issues) beacause there is imit of 20 api calls per session

---

## 🏆 Accomplishments 

- Built a **real-time browser security system**
- Integrated AI + rule-based hybrid detection
- Created a clean and interactive warning UI
- Successfully detected phishing-style websites
- Designed a modular and scalable pipeline

---

## 📚 What we learned

- Chrome extension architecture (content/background scripts)
- Real-world cybersecurity threats
- API integration and rate limiting
- Designing detection systems with low false positives
- Importance of UX in security tools

---

---

## 🤝 Contributing

I welcome contributions! 🚀  

### To get started:
1. Fork the repo  
2. Create a new branch  
3. Make your changes  
4. Submit a Pull Request  
Where you can contibute I am trying to add a cookie management were users will be able to track the cookies how many websites
are using what tye of data of user(can be done with javascript)- 🍪 Cookie/session hijacking detection  

Tasks:
- Detect document.cookie usage
- Flag third-party cookies
- Send data to backend
You can also raise issues!You can also try to enhance UI or any idea you have regarding responses or threats.
If you have interest in cybersecurity You can also try to work on Zero day attacks.- 🛡️ Zero-day attack heuristics  


Check issues labeled **`good first issue`** to start.
-


---

## 🔗 GitHub Repo
 https://github.com/rutujasoundale/SafeSurf

---
