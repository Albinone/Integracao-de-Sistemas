const API_BASE_URL = 'http://localhost:3000/items'

async function request(url, options = {}) {

    const res = await fetch(url, {
        hearders: {
            'Content-Type':'application/json',
        },
        options
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Request failed: ${res.status} - ${text}`);
    }

    return await res.json();
    
}

async function getAllItems() {
    return request(API_BASE_URL)
}

let getItemsButton = document.getElementById('loadItemsBtn')

getItemsButton.addEventListener('click', async() => {
    const items = await getAllItems();
    renderItems(items);
})

function renderItems(items) {
    const itemsListEl = document.getElementById('itemsList');
    itemsListEl.innerHTML = '';
    items.forEach (item => {
        const li = document.createElement('li');
        li.textContent = `ID: ${item.id} - ${item.name}`;
        itemsListEl.appendChild(li);
    })
}