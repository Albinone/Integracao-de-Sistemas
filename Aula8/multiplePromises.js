// cenário: dashboard com dados dos user e posts

const userRequest = fetch('https://jsonplaceholder.typicode.com/users')
    .then(result => result.json());

const postsRequest = fetch('https://jsonplaceholder.typicode.com/posts')
    .then(result => result.json());

Promise.all([userRequest, postsRequest])
.then(([users, posts]) => {
    console.log('Users:', users);
    console.log('Posts:', posts);


})

// Promise com múltiplos pedidos paralelos