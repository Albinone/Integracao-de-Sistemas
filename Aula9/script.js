async function fetchData() {
    
    try {

        let response = await fetch("https://jsonplaceholder.typicode.com/posts");

        if (!response.ok) {
            throw new Error("Response not ok, with status: " + response.status)
        }

        let data = await response.json();

        const userIds = [...new Set(data.map(post => post.userId))];

        const userPromises = userIds.map(id => fetch(`https://jsonplaceholder.typicode.com/users/${id}`));

        const userResponses = await Promise.all(userPromises);

        const users = await Promise.all(userResponses.map(response => response.json()));

        const map = new Map(users.map( user => [user.id, user.name]));

        displayData(data, map);

       

    } catch (error) {
        console.log('Error: ' + error);
    }
}

function displayData(data,map) {

    let outputDiv = document.getElementById('output');

    outputDiv.innerHTML = '';

    data.forEach(post => {
        let user = map.get(post.userId);
        const postElement = document.createElement('div');
        postElement.innerHTML = `<h3>${post.title}</h3><p>${post.body}</p><p>${user.name}</p>`;
        outputDiv.appendChild(postElement);
    });

}

const fetchDataButton = document.getElementById('fetch-data');
fetchDataButton.addEventListener('click', fetchData);
