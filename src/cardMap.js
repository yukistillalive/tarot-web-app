// cardMap.js
// 占卜 API name -> 牌解 API name_short (= currentCardID)
// Auto-generated from ekelen/tarot-api card_data.json

const NAME_TO_ID = {
  // === Major Arcana ===
  "The Fool": "ar00",
  "The Magician": "ar01",
  "The High Priestess": "ar02",
  "The Empress": "ar03",
  "The Emperor": "ar04",
  "The Hierophant": "ar05",
  "The Lovers": "ar06",
  "The Chariot": "ar07",
  "Strength": "ar08",
  "The Hermit": "ar09",
  "Wheel of Fortune": "ar10",
  "Justice": "ar11",
  "The Hanged Man": "ar12",
  "Death": "ar13",
  "Temperance": "ar14",
  "The Devil": "ar15",
  "The Tower": "ar16",
  "The Star": "ar17",
  "The Moon": "ar18",
  "The Sun": "ar19",
  "Judgement": "ar20",
  "The World": "ar21",
  // === Wands ===
  "Ace of Wands": "waac",
  "2 of Wands": "wa02",
  "3 of Wands": "wa03",
  "4 of Wands": "wa04",
  "5 of Wands": "wa05",
  "6 of Wands": "wa06",
  "7 of Wands": "wa07",
  "8 of Wands": "wa08",
  "9 of Wands": "wa09",
  "10 of Wands": "wa10",
  "Page of Wands": "wapa",
  "Knight of Wands": "wakn",
  "Queen of Wands": "waqu",
  "King of Wands": "waki",
  // === Cups ===
  "Ace of Cups": "cuac",
  "2 of Cups": "cu02",
  "3 of Cups": "cu03",
  "4 of Cups": "cu04",
  "5 of Cups": "cu05",
  "6 of Cups": "cu06",
  "7 of Cups": "cu07",
  "8 of Cups": "cu08",
  "9 of Cups": "cu09",
  "10 of Cups": "cu10",
  "Page of Cups": "cupa",
  "Knight of Cups": "cukn",
  "Queen of Cups": "cuqu",
  "King of Cups": "cuki",
  // === Pentacles ===
  "Ace of Pentacles": "peac",
  "2 of Pentacles": "pe02",
  "3 of Pentacles": "pe03",
  "4 of Pentacles": "pe04",
  "5 of Pentacles": "pe05",
  "6 of Pentacles": "pe06",
  "7 of Pentacles": "pe07",
  "8 of Pentacles": "pe08",
  "9 of Pentacles": "pe09",
  "10 of Pentacles": "pe10",
  "Page of Pentacles": "pepa",
  "Knight of Pentacles": "pekn",
  "Queen of Pentacles": "pequ",
  "King of Pentacles": "peki",
  // === Swords ===
  "Ace of Swords": "swac",
  "2 of Swords": "sw02",
  "3 of Swords": "sw03",
  "4 of Swords": "sw04",
  "5 of Swords": "sw05",
  "6 of Swords": "sw06",
  "7 of Swords": "sw07",
  "8 of Swords": "sw08",
  "9 of Swords": "sw09",
  "10 of Swords": "sw10",
  "Page of Swords": "swpa",
  "Knight of Swords": "swkn",
  "Queen of Swords": "swqu",
  "King of Swords": "swki",
};

// 处理两个 API 之间的命名差异，以及本地数据中的英文数字写法。
const ALIASES = {
  "Fortitude": "ar08",
  "Judgment": "ar20",
  "The Last Judgment": "ar20",
  "The Last Judgement": "ar20",
  "Wheel Of Fortune": "ar10",

  "Two of Wands": "wa02",
  "Three of Wands": "wa03",
  "Four of Wands": "wa04",
  "Five of Wands": "wa05",
  "Six of Wands": "wa06",
  "Seven of Wands": "wa07",
  "Eight of Wands": "wa08",
  "Nine of Wands": "wa09",
  "Ten of Wands": "wa10",

  "Two of Cups": "cu02",
  "Three of Cups": "cu03",
  "Four of Cups": "cu04",
  "Five of Cups": "cu05",
  "Six of Cups": "cu06",
  "Seven of Cups": "cu07",
  "Eight of Cups": "cu08",
  "Nine of Cups": "cu09",
  "Ten of Cups": "cu10",

  "Two of Pentacles": "pe02",
  "Three of Pentacles": "pe03",
  "Four of Pentacles": "pe04",
  "Five of Pentacles": "pe05",
  "Six of Pentacles": "pe06",
  "Seven of Pentacles": "pe07",
  "Eight of Pentacles": "pe08",
  "Nine of Pentacles": "pe09",
  "Ten of Pentacles": "pe10",

  "Two of Swords": "sw02",
  "Three of Swords": "sw03",
  "Four of Swords": "sw04",
  "Five of Swords": "sw05",
  "Six of Swords": "sw06",
  "Seven of Swords": "sw07",
  "Eight of Swords": "sw08",
  "Nine of Swords": "sw09",
  "Ten of Swords": "sw10",
};

/**
 * 将任意外部 card name 映射为内部 currentCardID (= name_short)
 * @param {string} name - 占卜 API 或其他来源的卡牌名
 * @returns {string|null} name_short 格式的 cardID，未匹配返回 null
 */

export function getCardId(name) {
  const trimmed = name.trim();
  return NAME_TO_ID[trimmed] ?? ALIASES[trimmed] ?? null;
}

/**
 * 反向查找：通过 cardID (name_short) 获取 display name
 * @param {string} cardId - name_short 格式
 * @returns {string|null}
 */
const ID_TO_NAME = Object.fromEntries(
  Object.entries(NAME_TO_ID).map(([name, id]) => [id, name])
);

export function getCardName(cardId) {
  return ID_TO_NAME[cardId] ?? null;
}

/**
 * API 返回的卡牌名字 -> 本地卡牌名字的映射
 * 用于处理命名差异（如数字表示方式）
 * 你可以根据实际的本地图片名字来修改这个映射
 */
const API_NAME_TO_LOCAL_NAME = {
  // === Major Arcana ===
  "The Fool": "The Fool",
  "The Magician": "The Magician",
  "The High Priestess": "The High Priestess",
  "The Empress": "The Empress",
  "The Emperor": "The Emperor",
  "The Hierophant": "The Hierophant",
  "The Lovers": "The Lovers",
  "The Chariot": "The Chariot",
  "Strength": "Strength",
  "The Hermit": "The Hermit",
  "Wheel of Fortune": "Wheel of Fortune",
  "Justice": "Justice",
  "The Hanged Man": "The Hanged Man",
  "Death": "Death",
  "Temperance": "Temperance",
  "The Devil": "The Devil",
  "The Tower": "The Tower",
  "The Star": "The Star",
  "The Moon": "The Moon",
  "The Sun": "The Sun",
  "Judgement": "Judgement",
  "The World": "The World",

  // === Wands ===
  "Ace of Wands": "Ace of Wands",
  "2 of Wands": "Two of Wands",
  "3 of Wands": "Three of Wands",
  "4 of Wands": "Four of Wands",
  "5 of Wands": "Five of Wands",
  "6 of Wands": "Six of Wands",
  "7 of Wands": "Seven of Wands",
  "8 of Wands": "Eight of Wands",
  "9 of Wands": "Nine of Wands",
  "10 of Wands": "Ten of Wands",
  "Page of Wands": "Page of Wands",
  "Knight of Wands": "Knight of Wands",
  "Queen of Wands": "Queen of Wands",
  "King of Wands": "King of Wands",

  // === Cups ===
  "Ace of Cups": "Ace of Cups",
  "2 of Cups": "Two of Cups",
  "3 of Cups": "Three of Cups",
  "4 of Cups": "Four of Cups",
  "5 of Cups": "Five of Cups",
  "6 of Cups": "Six of Cups",
  "7 of Cups": "Seven of Cups",
  "8 of Cups": "Eight of Cups",
  "9 of Cups": "Nine of Cups",
  "10 of Cups": "Ten of Cups",
  "Page of Cups": "Page of Cups",
  "Knight of Cups": "Knight of Cups",
  "Queen of Cups": "Queen of Cups",
  "King of Cups": "King of Cups",

  // === Pentacles ===
  "Ace of Pentacles": "Ace of Pentacles",
  "2 of Pentacles": "Two of Pentacles",
  "3 of Pentacles": "Three of Pentacles",
  "4 of Pentacles": "Four of Pentacles",
  "5 of Pentacles": "Five of Pentacles",
  "6 of Pentacles": "Six of Pentacles",
  "7 of Pentacles": "Seven of Pentacles",
  "8 of Pentacles": "Eight of Pentacles",
  "9 of Pentacles": "Nine of Pentacles",
  "10 of Pentacles": "Ten of Pentacles",
  "Page of Pentacles": "Page of Pentacles",
  "Knight of Pentacles": "Knight of Pentacles",
  "Queen of Pentacles": "Queen of Pentacles",
  "King of Pentacles": "King of Pentacles",

  // === Swords ===
  "Ace of Swords": "Ace of Swords",
  "2 of Swords": "Two of Swords",
  "3 of Swords": "Three of Swords",
  "4 of Swords": "Four of Swords",
  "5 of Swords": "Five of Swords",
  "6 of Swords": "Six of Swords",
  "7 of Swords": "Seven of Swords",
  "8 of Swords": "Eight of Swords",
  "9 of Swords": "Nine of Swords",
  "10 of Swords": "Ten of Swords",
  "Page of Swords": "Page of Swords",
  "Knight of Swords": "Knight of Swords",
  "Queen of Swords": "Queen of Swords",
  "King of Swords": "King of Swords",
};

/**
 * 根据 API 返回的卡牌名字获取本地卡牌名字（用于匹配本地图片）
 * @param {string} apiCardName - API 返回的卡牌名字
 * @returns {string|null} 本地卡牌名字或 null
 */
export function getLocalCardName(apiCardName) {
  return API_NAME_TO_LOCAL_NAME[apiCardName] ?? null;
}

/**
 * 根据本地卡牌名字获取本地卡牌图片路径
 * @param {string} localCardName - 本地卡牌名字
 * @param {Array} localTarotCards - 本地塔罗牌数据数组
 * @returns {string|null} 本地图片路径或 null
 */
export function getImagePathByLocalName(localCardName, localTarotCards) {
  const card = localTarotCards.find(c => c.name === localCardName);
  return card?.image ?? null;
}

/**
 * 根据 API 返回的卡牌名字获取本地卡牌图片路径
 * @param {string} apiCardName - API 返回的卡牌名字
 * @param {Array} localTarotCards - 本地塔罗牌数据数组
 * @returns {string|null} 本地图片路径或 null
 */
export function getCardImagePath(apiCardName, localTarotCards) {
  const localCardName = getLocalCardName(apiCardName);
  if (localCardName) {
    return getImagePathByLocalName(localCardName, localTarotCards);
  }
  return null;
}

export { NAME_TO_ID };
