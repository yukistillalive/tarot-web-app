import { tarotReading } from "./cardSource.js";
import { tarotCards } from "/src/data/tarotCards.js";
import { resolvePromise } from "./resolvePromise.js";
import { getCardImagePath, getCardId } from "./cardMap.js";
import { updateAvatar, loginWithEmail, loginWithGoogle, registerWithEmail, registerWithGoogle, resetPassword, logout } from "./AuthService.js";

export const model = {

    // Auth (Tianyang)

    currentUser: null,      // Firebase user object, set by onAuthStateChanged
    isLoggedIn: false,      // true when currentUser is non-null
    photoURL: null,         // tracked separately so MobX reacts to avatar updates
    authInitialized: false, // false until onAuthStateChanged fires for the first time

    // Called by onAuthStateChanged in mobxReactiveModel
    setUser(user) {
        this.currentUser = user;
        this.isLoggedIn = !!user;
        this.photoURL = user ? user.photoURL : null;
        this.historyRecords = [];
    },

    logout() {
    this.cards = [];
    this.divineParam = {};
    return logout();
},


    // Login Page (Tianyang)

    loginWithEmail(email, password) {
        return loginWithEmail(email, password);
    },

    loginWithGoogle() {
        return loginWithGoogle();
    },

    resetPassword(email) {
        return resetPassword(email);
    },


    // Register Page (Tianyang)

    registerWithEmail(formData) { return registerWithEmail(formData); },
    registerWithGoogle(avatarFile) { return registerWithGoogle(avatarFile); },


    // Profile Page (Yuewei)

    uploadAvatar(file) {
        if (!this.currentUser) return;
        return updateAvatar(this.currentUser, file)
            .then(function avatarUploadedACB(newPhotoURL) { this.photoURL = newPhotoURL; }.bind(this))
            .catch(function avatarErrorACB(err) { console.error("Failed to upload avatar:", err); });
    },


    // Dash Page (Yue)

    divineParam: {},      // { type: string, query: string } — user's current spread selection
    divinePromise: {},    // promise state object { promise, data, error } managed by resolvePromise
    currentReadingId: null, // ID generated at the start of a reading; used for /results/:recordId routing

    setDivineType(type) { this.divineParam.type = type; },
    setDivineQuery(query) { this.divineParam.query = query; },

    startDivination() {
        this.currentReadingId = Date.now();
        const prms = tarotReading(this.divineParam);
        resolvePromise(prms, this.divinePromise);
        prms.then(this.setTarotApiResponse.bind(this));
    },


    // Results Page (Yue & Guoxi)

    cards: [],           // processed card array with local image paths resolved
    positions: [],       // position labels from the API
    interpretation: "",  // AI-generated reading text
    error: null,

    // Maps API card names to local image assets, then stores processed data
    setTarotApiResponse(apiResponse) {
        if (apiResponse?.success) {
            const cardsWithImages = (apiResponse.data.cards || []).map(function mapCardACB(card) {
                const imagePath = getCardImagePath(card.name, tarotCards);
                return {
                    ...card,
                    image: imagePath || card.image,
                    cardId: getCardId(card.name),
                };
            });
            this.cards = cardsWithImages;
            this.positions = apiResponse.data.positions || [];
            this.interpretation = apiResponse.data.interpretation || "";
            this.error = null;
        } else {
            this.error = "Failed to load";
        }
    },


    // History Page (Yue)

    historyRecords: [],  // list of past readings, newest first

    setHistoryRecords(records) { this.historyRecords = records; },

    // Updates application state only; call via HistoryService.persistNewReading to also save
    addHistoryRecord(readingId) {
        const record = {
            id: readingId,
            date: new Date().toLocaleString(),
            type: this.divineParam.type,
            question: this.divineParam.query,
            cards: this.cards,
            positions: this.positions,
            interpretation: this.interpretation,
        };
        this.historyRecords.unshift(record);
        this.divineParam.query = "";
        return record;
    },



    // Library Page (Yuewei)

    allTarots: tarotCards,  // full card list, filtered/sorted in place by doSearch

    doSearch(params) {
        const query = (params.query || "").toLowerCase();
        const type = params.type || "";
        let results = [...tarotCards];
        if (type) {
            results = results.filter(function filterByTypeACB(card) {
                if (type === "Major Arcana")
                    return card.name.startsWith("The") ||
                        ["Fool", "Magician", "Strength", "Justice", "Judgement", "Death", "Temperance", "Wheel of Fortune"]
                            .some(function(w) { return card.name.includes(w); });
                return card.name.includes(type.slice(0, -1));
            });
        }
        if (query) {
            results = results.sort(function sortCardsACB(cardA, cardB) {
                const isAMatch = cardA.name.toLowerCase().includes(query);
                const isBMatch = cardB.name.toLowerCase().includes(query);
                if (isAMatch && !isBMatch) return -1;
                if (!isAMatch && isBMatch) return 1;
                return 0;
            });
        }
        this.allTarots = results;
    },


    // Details Page (Yuewei)

    // Finds the image for a given cardId by searching divination results then full library
    getCardImage(cardId) {
        const available = [...(this.cards || []), ...tarotCards];
        const matched = available.find(function findCardACB(c) { return getCardId(c.name) === cardId; });
        return matched?.image || null;
    },

}
