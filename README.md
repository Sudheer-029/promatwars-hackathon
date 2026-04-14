# ⚡ StadiumFlow AI

**StadiumFlow AI** is a smart assistant and live operations dashboard for large-scale sporting and entertainment venues. By aggregating mock live sensor data and utilizing context-aware routing logic, it drastically improves the physical event experience by reducing crowd confusion, wait times, and operational bottlenecks.

---

## 👥 Personas & Vertical
**Vertical:** Sports, Live Events, Entertainment Technology  
**Primary Persona (Fan):** A sports fan navigating a massive stadium who wants to find the fastest route to their seat, the shortest line for a beer, or accessibility-friendly paths without getting stuck in congested concourses.  
**Secondary Persona (Ops Staff):** A venue operations manager who needs a bird's-eye view of crowd hotspots to redeploy staff and broadcast safety alerts instantly.

## 🎯 Problem Statement Alignment
Large events inherently create congestion. Fans waste valuable game time stuck in the wrong queues or packed into overcrowded gates. Operations teams often react to incidents too late because they lack real-time predictive dashboards. StadiumFlow solves this by seamlessly bridging **crowd routing** with **real-time ops management**.

---

## 🏗️ Architecture & Approach
To guarantee high performance and scalability, this project is built using a **Vanilla JavaScript (ES6 Modules)** architecture. No heavy frameworks (like React or Angular) are used, resulting in a microscopic footprint of less than 1MB and instant load times.

- **Frontend:** Pure HTML/CSS/JS (Mobile-first, Dark Theme).
- **Data Layer:** In-memory stores (`venueData`, `liveStatus`) simulating a live, reactive backend database.
- **Service Layer Integrations:** Modular abstracted services (`routingService`, `geminiService`, `firebaseService`) that proxy logic as if interacting with live API services.

## ✨ Feature List
1. **Live Queue Optimizer:** Dynamically calculates wait times and recommends faster, nearby alternatives.
2. **Context-Aware AI Assistant:** "Gemini-powered" mock chat interface that answers routing and utility questions based on the fan's current zone and game state.
3. **Smart Hotspot Detection:** Ops view intelligently detects areas with over 80% density and automatically flags them as critical hotspots.
4. **Instant Action Broadcasting:** Ops can dispatch live alerts that instantly render on the Fan UI via simulated Pub/Sub logic.
5. **Accessibility Layer:** A dedicated toggle filters out stairs and long-distance walks, ensuring inclusive routing for mobility-restricted users.

---

## ☁️ Google Services Integration Strategy
StadiumFlow is architected to seamlessly plug directly into the following Google Cloud services for production environments:

1. **Google Maps Platform (Indoor Maps & Directions API):** The `routingService.js` currently mocks the graph nodes. In production, this service would pass coordinates to the Directions API for accessible indoor paths.
2. **Firebase Realtime Database / Firestore:** The `firebaseService.js` simulates listeners. In real-world usage, the `liveStatus` object would be a Firestore document that pushes updates to all connected instances (via `onSnapshot`) instantly.
3. **Gemini API:** The `geminiService.js` simulates the LLM. In reality, we would pass the `liveStatus` JSON and the user's prompt as context into the Gemini Flash model to generate the dynamic natural language output.

---

## 🧪 How to Run Locally
1. Clone this repository to your local machine.
2. Because it uses native ES6 Modules, you cannot open the HTML file directly using `file://`.
3. Use a simple local server. For example:
   - If using VS Code, use the **Live Server** extension.
   - Or using Python: `python -m http.server 8000`
   - Or using Node/npx: `npx serve .`
4. Open your browser to `http://localhost:8000`.

---

## 🚀 Features Walkthrough & Testing Scenarios

To validate the core flows of the system locally, run through these primary user scenarios:

### Scenario 1: The "Smart Fan" Experience
1. Ensure the UI is on the **Fan Assistant** tab.
2. Observe the "Live Queues Near You" panel. 
3. This displays realtime data pulled from the simulated Firebase database, demonstrating how the system dynamically calculates the best option based on distance and wait-time algorithms.

### Scenario 2: The Context-Aware Assistant
1. In the AI Assistant chat box, click the quick-prompt: **"Fastest way to my seat?"**
2. The AI will respond intelligently based on your currently selected context.
3. Change the "Current Zone" dropdown to a "Congested Gate" (e.g., Gate A).
4. Ask the assistant: **"Is my gate congested?"** and watch it recommend switching to Gate B based on the live density matrix.

### Scenario 3: The Accessibility Layer
1. Note the wait times for the restrooms.
2. At the top right of the header, toggle **♿ Accessible Routes** ON.
3. Observe how the Queue Panel dynamically filters out "Restroom South" because the venue graph data flags it as having stairs-only access.

### Scenario 4: Ops Hotspot Detection
1. Click the **Ops Dashboard** button in the top navigation.
2. Review the top red "Busiest Zone" card and the "Crowd Hotspots" section below it. 
3. This validates the threshold logic that automatically surfaces operational bottlenecks to the staff, enabling rapid response.

### Scenario 5: Real-Time Alert Dispatch
1. While on the Ops Dashboard, type a warning in the "Quick Actions" box: *"Medical emergency near Gate A. Please clear."*
2. Click **Dispatch Alert via Firebase**.
3. Immediately switch back to the **Fan Assistant** tab.
4. Validate that the dynamic orange/red alert banner has instantly appeared at the top of the fan's screen, demonstrating real-time Pub/Sub behavior.

---

## 🔮 Future Scope & Assumptions
- **Assumptions:** We assume venue structural maps can be mapped into a node-graph. We assume live IoT sensors or camera models (Vertex AI edge models) provide the live density counts.
- **Future:** Integrating real venue indoor mapping, biometric fast-lane ticketing with Google Wallet, and ordering food directly from the seat.