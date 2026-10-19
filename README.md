# Tarot Web App

This is a React web app that offers Tarot divination across three spread types (i.e., Past-Present-Future, Relationship, and Life Purpose). Users can draw cards, receive personalised interpretations, and revisit past readings through a history view. 

This is done in a group project of four, where I was responsible for DashView and HistoryView, the API requests for three types of reading, component state management as well as reviewing and maintaining the (persistence-)model-view-presenter architecture.

Contribution: Yue Zhu, Yuewei He, Tianyang Lu, Guoxi Pan

**Implemented features:**
- Tarot divination with three spread types (Past-Present-Future, Relationship, Life Purpose)
- AI-generated card interpretations via the Tarot AI Reading API
- Tarot encyclopedia with search and filtering
- Card detail page with upright/reversed meanings and descriptions
- History of past readings with the ability to restore any session
- User authentication: email/password and Google sign-in
- Avatar upload

## Setup

**1. Install dependencies**
```bash
npm install
```

**2. Configure environment variables**

Copy the example file as environment cofig:
```bash
cp .env.local.example .env.local
```

**Tarot API**:
```
VITE_PROXY_URL=https://your-proxy-url-here
VITE_PROXY_KEY=your-api-key-here
```

**Firebase Setup**
```
VITE_API_KEY=AIzaSy...
VITE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_PROJECT_ID=your-project
VITE_STORAGE_BUCKET=your-project.firebasestorage.app
VITE_MESSAGING_SENDER_ID=...
VITE_APP_ID=1:...:web:...
```

Storage rules:
```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /avatars/{uid} {
      allow read, write: if request.auth != null && request.auth.uid == uid;
    }
  }
}
```
**3. Start the dev server**
```bash
npm run dev
```
---

## Third-Party Components

The following user-visible components were written by others and integrated into the project:

| Component | Source | Used in |
|---|---|---|
| **HeroUI** (`@heroui/react`) | [heroui.com](https://www.heroui.com) | `loginView.jsx` (Card, Button, Input, Alert), `headbarView.jsx` (Avatar, Button), `dashView.jsx` (Button, TextField, Select), `historyView.jsx` (Card, Chip), `searchFormView.jsx` (Select, ListBox), `suspenseView.jsx` (Alert),|
| **TextType** | [Reactbits](https://reactbits.dev/text-animations/text-type) | `src/views/TextType.jsx` · used in `dashView.jsx` for the animated prompt text |
| **TiltedCard** | [Reactbits](https://reactbits.dev/components/tilted-card) | `src/views/TiltedCard.jsx` · used in `resultsView.jsx` for hoverable card display |

---

## Project Architecture (MVP)

A React MVP (Model-View-Presenter) architecture with Firebase as the persistence.

```
src/
  TarotModel.js              # Application state
  mobxReactiveModel.js       # Wraps model with MobX observable, calls connectToPersistence
  HistoryService.js          # Persistence: Firestore read/write and coordination for history records
  cardSource.js              # Persistence: Tarot API fetch functions
  firestoreModel.js          # Persistence: connectToPersistence — wires auth listener and save reaction
  AuthService.js             # Persistence: Firebase Auth service logic
  AuthRepository.js          # Persistence: Firebase Auth low-level calls
  firebaseConfig.js          # Firebase initialisation
  cardMap.js                 # Utility: maps card names to local image paths and IDs

  reactjs/                   # Presenter
    ReactRoot.jsx
    dashPresenter.jsx
    detailsPresenter.jsx
    headbarPresenter.jsx
    historyPresenter.jsx
    libraryPresenter.jsx
    resultsPresenter.jsx
    tutorialPresenter.jsx
    loginPresenter.jsx
    registerPresenter.jsx
    profilePresenter.jsx

  views/                     # View
    dashView.jsx
    detailsView.jsx
    headbarView.jsx
    historyView.jsx
    libraryView.jsx
    resultsView.jsx
    searchFormView.jsx
    suspenseView.jsx
    tutorialView.jsx
    loginView.jsx
    registerView.jsx
    profileView.jsx
    TextType.jsx              # 3rd party component
    TiltCard.jsx            # 3rd party component
```

---

## Dummy API request for testing

Paste into the browser console to simulate API requests.

### Three Card Reading
```js
window.myModel.setDivineQuery("Will my career change bring me happiness?");
window.myModel.setDivineType("Past-Present-Future");

Promise.resolve({
    "success": true,
    "data": {
        "cards": [
            { "position": 1, "name": "The Fool", "orientation": "upright", "image": "major_arcana_fool.png" },
            { "position": 2, "name": "6 of Wands", "orientation": "upright", "image": "minor_arcana_wands_6.png" },
            { "position": 3, "name": "4 of Cups", "orientation": "reversed", "image": "minor_arcana_cups_4.png" }
        ],
        "positions": ["Past", "Present", "Future"],
        "interpretation": "The Fool signals a bold new beginning. Six of Wands brings recognition and momentum. Four of Cups reversed suggests a turning point — embrace what is being offered."
    }
})
.then(window.myModel.setTarotApiResponse.bind(window.myModel))
.then(window.myModel.addHistoryRecord.bind(window.myModel))
.then(function() { window.location.hash = "#/results"; });
```

### Relationship Reading
```js
window.myModel.setDivineQuery("What does my partner truly feel about me?");
window.myModel.setDivineType("Relationship");

Promise.resolve({
    "success": true,
    "data": {
        "cards": [
            { "position": 1, "name": "The Lovers", "orientation": "upright", "image": "major_arcana_lovers.png" },
            { "position": 2, "name": "2 of Cups", "orientation": "upright", "image": "minor_arcana_cups_2.png" },
            { "position": 3, "name": "King of Swords", "orientation": "reversed", "image": "minor_arcana_swords_king.png" },
            { "position": 4, "name": "The Moon", "orientation": "reversed", "image": "major_arcana_moon.png" }
        ],
        "positions": ["You", "Your Partner", "The Bond", "What to Watch"],
        "interpretation": "The Lovers confirms deep emotional connection. Two of Cups reflects mutual affection. King of Swords reversed warns against cold communication. The Moon reversed suggests hidden feelings are surfacing."
    }
})
.then(window.myModel.setTarotApiResponse.bind(window.myModel))
.then(window.myModel.addHistoryRecord.bind(window.myModel))
.then(function() { window.location.hash = "#/results"; });
```

### Life Purpose Reading
```js
window.myModel.setDivineQuery("What is my true calling in life?");
window.myModel.setDivineType("Life Purpose");

Promise.resolve({
    "success": true,
    "data": {
        "cards": [
            { "position": 1, "name": "The Star", "orientation": "upright", "image": "major_arcana_star.png" },
            { "position": 2, "name": "8 of Pentacles", "orientation": "upright", "image": "minor_arcana_pentacles_8.png" },
            { "position": 3, "name": "The World", "orientation": "upright", "image": "major_arcana_world.png" },
            { "position": 4, "name": "Ace of Wands", "orientation": "upright", "image": "minor_arcana_wands_ac.png" },
            { "position": 5, "name": "The Hermit", "orientation": "reversed", "image": "major_arcana_hermit.png" }
        ],
        "positions": ["Your Gift", "Your Path", "Your Destination", "What Ignites You", "What to Release"],
        "interpretation": "The Star reveals a healing and inspiring purpose. Eight of Pentacles calls for dedicated mastery. The World promises fulfilment through completion. Ace of Wands sparks creative passion. The Hermit reversed urges you to stop isolating your gifts from the world."
    }
})
.then(window.myModel.setTarotApiResponse.bind(window.myModel))
.then(window.myModel.addHistoryRecord.bind(window.myModel))
.then(function() { window.location.hash = "#/results"; });
```
