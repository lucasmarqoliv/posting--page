class PacoteBuscador {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    get(endpoint) {
        return fetch(this.baseURL + endpoint)
            .then(response => response.json());
    }

    put(endpoint, body) {
        return this._send("put", endpoint, body);
    }

    post(endpoint, body) {
        return this._send("post", endpoint, body);
    }

    delete(endpoint, body) {
        return this._send("delete", endpoint, body);
    }

    _send(method, endpoint, body) {
        return fetch(this.baseURL + endpoint, {
            method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }).then(response => response.json());
    }
}

const formulario = document.querySelector("#formulario");
const titulo = document.querySelector("#titulo");
const descricao = document.querySelector("#descricao");
const btnPostar = document.querySelector("#btnPostar");
const renderizarTitulo = document.querySelector("#renderizar-titulo");
const renderizarDescricao = document.querySelector("#renderizar-descricao");

    formulario.addEventListener("submit", event => {
        event.preventDefault()
        const API = new PacoteBuscador("https://jsonplaceholder.typicode.com")
        API.post("/posts", {
            title: titulo.value,
            body: descricao.value, 
            userId: 1
        }).then(data => {
            renderizarTitulo.innerHTML = data.title
            renderizarDescricao.innerHTML = data.body
        }).catch(error => {
            console.log("Erro ao postar", error)
        })
    })
