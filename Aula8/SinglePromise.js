

    fetch('https://jsonplaceholder.typicode.com/users')

    .then(result => result.json())
    .then(data => console.log(data))
    .catch(error => console.log(error))
    .finally(() => console.log('Fetch attempt finalized'));

    // Promise c/ pedido encadeado

    fetch('https://jsonplaceholder.typicode.com/users/1')
    .then(result => result.json())
    .then(user => {
        console.log(user);
        return fetch(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`);
    
            
    })
.then(result => result.json())
.then(posts => console.log(posts))
.catch(error => console.log(error))
.finally(() => console.log('Chained fetch attempt finalized'));

