import { auth } from "./firebaseConfig.js";
import { onAuthStateChanged } from "firebase/auth";
import { loadHistoryIntoModel, persistNewReading } from "./HistoryService.js";

export function connectToPersistence(model, reaction) {
    onAuthStateChanged(auth, authChangedACB);
    reaction(trackDivinePromiseACB, onNewReadingACB);

    function authChangedACB(user) {
        model.setUser(user);
        model.authInitialized = true;
        if (user) loadHistoryIntoModel(model);
    }

    function trackDivinePromiseACB() { return model.divinePromise; };
    function onNewReadingACB(promise) {
            if (!promise) return;
            promise.then(function saveReadingACB() {
                persistNewReading(model, model.currentReadingId);
            });
        }
}
