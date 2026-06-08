import { db } from "./firebaseConfig.js";
import { collection, addDoc, getDocs, deleteDoc, doc, query, orderBy } from "firebase/firestore";

function saveHistoryRecord(uid, record) {
    const colRef = collection(db, "users", uid, "historyRecords");
    return addDoc(colRef, record);
}

function loadHistoryRecords(uid) {
    const colRef = collection(db, "users", uid, "historyRecords");
    const q = query(colRef, orderBy("id", "desc")); // id is Date.now(), descending = newest first
    return getDocs(q).then(function (snapshot) {
        const records = [];
        snapshot.forEach(function (docSnap) {
            records.push({ ...docSnap.data(), firebaseId: docSnap.id });
        });
        return records;
    });
}

function deleteHistoryRecord(uid, firebaseId) {
    const docRef = doc(db, "users", uid, "historyRecords", firebaseId);
    return deleteDoc(docRef);
}

function persistHistoryRecord(uid, record) {
    return saveHistoryRecord(uid, record)
        .then(function savedACB(docRef) {
            record.firebaseId = docRef.id;
            return record;
        });
}

function saveRecordForUser(user, record) {
    if (!user) return Promise.resolve(record);
    return persistHistoryRecord(user.uid, record)
        .catch(function saveErrorACB(err) { console.error("Failed to save history:", err); });
}

// Coordinates state update + persistence after a completed reading
export function persistNewReading(model, readingId) {
    const record = model.addHistoryRecord(readingId);
    return saveRecordForUser(model.currentUser, record);
}

// Coordinates fetch + applying records to application state
export function loadHistoryIntoModel(model) {
    if (!model.currentUser) return Promise.resolve();
    return loadHistoryRecords(model.currentUser.uid)
        .then(function historyLoadedACB(records) { model.setHistoryRecords(records); })
        .catch(function historyErrorACB(err) { console.error("Failed to load history:", err); });
}
