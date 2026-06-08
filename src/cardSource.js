import { PROXY_URL, PROXY_KEY } from "./apiConfig";

function gotResponseACB(response) {
  if(!response.ok) // equal to 200
      throw new Error("Response was not 200");
    return response.json(); 
}

function gotCardArrayACB(data) {
    console.log(data);
    if (!data.success || !data.data) {
    throw new Error("No results in API response");
    }
  return data;
}

function handleErrorACB(error) {
  throw error;
}

const SPREAD_TYPE_TO_ENDPOINT = {
    "Past-Present-Future": "/api/three-card",
    "Relationship":        "/api/relationship",
    "Life Purpose":        "/api/life-purpose",
};

export function getCardDetails(cardId) {
    return fetch("https://tarotapi.dev/api/v1/cards/" + cardId)
        .then(function (response) {
            if (!response.ok)
                throw new Error("找不到该塔罗牌，请检查 ID 是否正确");
            return response.json();
        })
        .then(function (data) {
            return data.card;
        })
        .catch(handleErrorACB);
}

// promise handler, calling in the model
export function tarotReading(divineParam) {
    const endpoint = SPREAD_TYPE_TO_ENDPOINT[divineParam.type] || "/api/three-card";
    const url = PROXY_URL + endpoint;
    return fetch(url, {
    method: 'POST', // REST, HTTP method
    headers: {
        'X-DH2642-Key': PROXY_KEY,
        'X-DH2642-Group': "100",
        'x-rapidapi-key': import.meta.env.VITE_RAPIDAPI_KEY,
        'x-rapidapi-host': 'tarot-ai-reading.p.rapidapi.com',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
		spread_type: divineParam.type
	})
  })
  .then(gotResponseACB) // handlerACB1: check http status
  .then(gotCardArrayACB) // handlerACB2: parse data
  .catch(handleErrorACB); // error hander
}

// ---for debug purpose---
// Check if the API promise resolved
// myModel.divinePromiseState.data

// Check if parsing stored the expected data in the model
// myModel.cards
// myModel.interpretation
// myModel.positions
// myModel.error

// Simulate api response
// myModel.setTarotApiResponse({"success":true,"credits_used":3,"data":{"cards":[{"position":1,"name":"8 of Cups","orientation":"reversed","image":"minor_arcana_cups_8.png"},{"position":2,"name":"6 of Pentacles","orientation":"upright","image":"minor_arcana_pentacles_6.png"},{"position":3,"name":"6 of Wands","orientation":"upright","image":"minor_arcana_wands_6.png"},{"position":4,"name":"King of Pentacles","orientation":"reversed","image":"minor_arcana_pentacles_king.png"},{"position":5,"name":"10 of Wands","orientation":"reversed","image":"minor_arcana_wands_10.png"}],"positions":["The Hidden Self","The Trigger","The Lesson","The Gift","Path to Integration"],"interpretation":"Welcome, brave traveler..."}})


// export function getMenuDetails(ids_array) {
//     const url=PROXY_URL + "/recipes/informationBulk?" + new URLSearchParams({ids: ids_array});

//     return fetch(url,{
//         method: 'GET',
//         headers: {
//             'X-DH2642-Key': PROXY_KEY,
//             'X-DH2642-Group': "100",
//         },
//     })
//     .then(gotResponseACB)
//     .catch(handleErrorACB);
// }

// function gotFirstDishACB(array) {
//     return array[0];
// }
// export function getDishDetails(id) {
//     return getMenuDetails([id]).then(gotFirstDishACB);
// }
