# RAKSHEDHA BALACHANDER - INTELLIGENT AI PORTFOLIO & VOICE ASSISTANT

## Executive Summary
This repository contains the source code for a high-performance, interactive engineering portfolio. Designed to showcase advanced proficiency in Artificial Intelligence, Multi-Agent Systems, and Full-Stack Web Development, the application is driven by a custom dual-brain AI voice assistant named "Rada." 

The system leverages a hybrid architecture, routing predictable deterministic queries to a local zero-latency knowledge graph (JSON) while seamlessly falling back to a cloud-based Groq LPU inference engine (LLaMA-3-8b-8192) for complex, dynamic reasoning.

---

## Technical Badges & Core Technologies

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Groq](https://img.shields.io/badge/Groq_LPU-F55036?style=for-the-badge&logo=gitea&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)

---

## User Interface & Page Breakdown

The frontend is divided into targeted, high-impact sections designed to guide recruiters and clients through a seamless narrative of technical expertise.

*   **Home:** The cinematic entry point of the application. It features a hardware-accelerated video background with dynamic text overlays and a custom viewport snap-scroll mechanism, instantly establishing a premium, high-tech engineering brand.
*   **About:** A concise professional summary highlighting the core identity as an AI Product Engineer and developer. It bridges the gap between technical capability and real-world problem-solving, setting the stage for the portfolio's advanced AI integrations.
*   **Experience:** A timeline of professional milestones, freelance engagements, and architectural achievements. It emphasizes measurable impact, workflow optimization, and leadership in deploying production-ready applications.
*   **Skills:** A structured, scannable matrix of the technical stack. It highlights expertise across LLM integration, agentic frameworks, and modern web development (e.g., LangGraph.js, Next.js, Google Gemini, PostgreSQL, AWS).
*   **Project:** The core technical showcase featuring deep dives into enterprise-grade applications. It highlights complex logic, architecture, and live implementation of tools like Legal Counsel AI, DevSeek, and ZeroTrust PR.
*   **Service:** A dedicated module outlining specialized freelance and consulting capabilities, including custom AI workflow automation, autonomous multi-agent systems, and high-performance frontend engineering.
*   **Contact:** The conversion layer of the portfolio. It provides direct links to professional networks (GitHub, LinkedIn), email routing, and an integration point for the Rada AI assistant to autonomously answer final inquiries or provide the downloadable resume.

---

## System Architecture

### 1. Hybrid Routing Logic (The "Dual-Brain" Engine)
The application utilizes an optimized request-routing mechanism to minimize API calls, reduce token expenditure, and guarantee zero-latency responses for frequent queries.
*   **Layer 1 (Client-Side Retrieval):** User input is intercepted and parsed against a localized, modular JSON knowledge base. Exact matches and category triggers (e.g., "skills," "resume," "projects") return an immediate response (0ms latency).
*   **Layer 2 (Groq API Fallback):** Unstructured or complex queries are routed to a Vercel Serverless Function, which queries the Groq LPU API. The localized JSON data is injected into the system prompt to maintain contextual awareness without hardcoding personal data into the model weights.

### 2. Stateful Voice Recognition & Synthesizer
*   **Continuous Listening:** Implements the native Web Speech API with an auto-restart loop, functioning as a persistent background listener similar to smart home devices. 
*   **Echo Cancellation:** Automatically suspends microphone input during AI audio playback to prevent recursive feedback loops and self-prompting.
*   **Asynchronous Text-to-Speech:** Processes textual output through browser-native synthesis, specifically targeting localized English (India) profiles for accurate dialect representation.

---

## Application Structure

The application is structured into modular components to ensure maintainability and separation of concerns.

### Landing Experience (`VideoIntro.jsx`)
*   **Functionality:** Serves as the cinematic entry point to the application.
*   **Technical Implementation:** Features a hardware-accelerated video background with dynamic text overlays. It utilizes standard DOM event listeners (wheel, keydown) to implement a custom viewport snap-scroll mechanism, ensuring a controlled, presentation-style navigation flow. Includes state-managed audio toggling and automated cross-component navigation upon video completion.

### The AI Interface (`RadaAssistant.jsx`)
*   **Functionality:** The interactive core of the application, serving as the user interface for the AI assistant.
*   **Technical Implementation:** A fixed-position, z-indexed overlay housing the chat interface. It manages state for user inputs, AI responses, typing indicators, and microphone permissions. It executes the hybrid routing logic and maintains the continuous loop for the `SpeechRecognition` API.

### Knowledge Base (`/src/data/`)
*   **Functionality:** The static data layer serving both the frontend UI and the LLM context window.
*   **Structure:** Separated into strict schemas (`profile.json`, `projects.json`, `skills.json`, `services.json`, `faq.json`) to allow scalable updates to credentials, tech stacks, and portfolio items without modifying application logic.

### Serverless Backend (`/api/chat.js`)
*   **Functionality:** Secure proxy for external LLM processing.
*   **Technical Implementation:** A Node.js serverless function that securely stores the `GROQ_API_KEY`. It constructs the system prompt dynamically based on the localized JSON state, handles the API request to Groq, and returns the strictly formatted output to the client to prevent prompt injection or hallucination.

---

## Core Portfolio Highlights

The application serves as a vessel to display complex engineering projects, which are parsed by the AI for user inquiries:
*   **Legal Counsel AI:** Agentic AI workspace for corporate contract negotiation utilizing LangGraph.js, PostgreSQL, and AWS.
*   **DevSeek:** Parallelized multi-agent RAG search engine leveraging Google Gemini 1.5 Pro.
*   **ZeroTrust PR:** Autonomous DevSecOps auditing tool for CI/CD pipeline vulnerabilities.

---

## Local Development Setup

1.  **Clone the Repository:** Execute standard git clone procedures.
2.  **Environment Variables:** Create a `.env` file in the root directory. Assign your Groq API key to `GROQ_API_KEY`.
3.  **Install Dependencies:** Execute `npm install` (or `yarn install`).
4.  **Local Serverless Environment:** To emulate the Vercel serverless environment locally, utilize the Vercel CLI. Run `vercel dev` to initiate both the frontend client and the backend API routes simultaneously.