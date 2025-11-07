const x = new Promise ((resolve, reject) => {

    const dataFound = false;
    if (dataFound) {
        setTimeout(function() {
            resolve("Data loaded!");
        }, 1000);
    } else {
        setTimeout(function() {
            reject("Data not found!");
        }, 1000);
    }
})

console.log("Initial log");

console.log(x);

x.then (result => console.log("Sucess: " , result))
    .catch (error => console.log("Error: ", error))
    .finally(() => console.log("Promise finalized"))

console.log("Final log");

