/* Constante com o URL da nossa API (api.js) para que não estejamos sempre a escrever este URL */
const API_BASE_URL = 'http://localhost:3000/items'

// NOTA: Dentro de todas as funções, sempre que estamos a usar 'const', a keyword poderia ser 'let', 
// apenas estamos a indicar que é uma variável

/* INÍCIO - Funções transversais - De forma a não estarmos sempre a duplicar o mesmo código ao longo do nosso ficheiro, 
utilizando-as nos diferentes métodos que iremos criar para os botões do nosso HTML */

// Função que faz a chamada à nossa API e nos retorna a resposta 
// Parâmetros: URL + Options (caso queiramos enviar informação adicional no nosso pedido)
async function request(url, options = {}) {

    const res = await fetch(url, {
        hearders: {
            'Content-Type': 'application/json', // Indica o tipo de dados que deverá ser enviado do lado do servidor, neste caso dados no formato JSON
        },
        ...options // Outras opções que poderão ser enviadas no pedido à API
    });  // Estamos a fazer o pedido à nossa API, através do URL e dos argumentos enviados no parametro 'options'

    if (!res.ok) { // Valida se a resposta que vem do lado do servidor está ok, entra no bloco de código caso não o esteja
        const text = await res.text(); // Atribui à variável 'text' o valor da resposta convertida em String, uma vez que a função text() é uma Promise, temos de esperar que a mesma fique completa antes de avançar
        throw new Error(`Request failed: ${res.status} - ${text}`); // Retorna um novo erro a indicar que o resultado falhou, o estado da resposta e a resposta convertida em String
    }

    return await res.json(); // Caso não falhe, a função irá retornar o objeto JSON que veio da resposta

}

// Função que insere no ecrã, os dados que recebemos da API
// Parâmetros: Items (lista de dados JSON)
function renderItems(items) {

    const itemsListEl = document.getElementById('itemsList'); // Nó do HTML que consiste numa lista (<ul> </ul>), que está disponível no ficheiro index HTML
    itemsListEl.innerHTML = ''; // Limpamos a informação que se encontra dentro do nó. Exemplo abaixo:

    /* Ecrã    VS     HTML
    |          |      <ul>         | Quando queremos fazer o refresh da informação do que temos no ecrã, 
    | - Banana | <li> Banana </li> | Temos de limpar a informação que se encontra dentro da lista para voltarmos a reescrever a informação
    | - Maçã   | <li> Maçã </li>   | Neste caso, limpar o <li> Banana </li> e <li> Maçã </li>.
    |          |     </ul>         | Que é o objetivo da linha nº 32
    */


    items.forEach(item => { // Para cada elemento da lista de items que será enviada como argumento, cada objeto é do tipo: {id: 1, name: 'Item 1'} (pode ser consultado no ficheiro api.js)
        const li = document.createElement('li'); // Cria-se um elemento que será o que deverá aparecer na lista, ou seja, HTML cujo formato é <li> </li>
        li.textContent = `ID: ${item.id} - ${item.name}`; // Indicamos qual o conteúdo, o texto, que deverá aparecer no ecrã, neste caso será algo do género 'ID: 1 - Item 1', ficando <li>ID: 1 - Item 1</li>
        itemsListEl.appendChild(li); // Adicionamos o elemento construído (<li>ID: 1 - Item 1</li>) dentro da nossa lista do HTML, que se encontra na variável itemsListEl (linha nº 31) 
    })
}

/* FIM - Funções transversais */

/* INÍCIO GET - Comportamento do botão Load Items */

// Função que faz um request básico à nossa API, cujo objetivo é retornarnos um objeto JSON com todos os items existentes
async function getAllItems() {
    return request(API_BASE_URL)
}

// Vamos buscar o botão 'Load items' através do ID, este ID pode ser visto no ficheiro index.html
let getItemsButton = document.getElementById('loadItemsBtn')

// Atribuição de comportamento ao botão 'Load Items' no momento em que existe um click sobre o mesmo 
getItemsButton.addEventListener('click', async () => {

    // Chamada da função 'getAllItems' que nos retorna os items todos em formato JSON
    // Necessário o await porque é nos enviada um objeto 'Promise' e só podemos continuar a nossa lógica quando temos os dados completos
    const items = await getAllItems();
    // Com a infromação que obtemos da nossa API, chamamos a função renderItems, para que a informação fique visível no ecrã
    renderItems(items);
})

/* FIM GET - Comportamento do botão Load Items */

