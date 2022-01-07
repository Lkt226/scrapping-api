# scrapping-api
 
# Scrapping and Add
## Objetivo
Esse é um projeto bem simples, ele ta servindo de suporte para uma loja virtual que estou fazendo, para treinar.

O objetivo dele é facilitar adicionando os produtos da loja no Firebase, o "Real database" do firebase pode ser consumida por REST API.

Basicamente oque esse projeto faz é, pegar todos os produtos de uma determinada página e adicionar na API para consumo posterior.

## Como usar separadamente

* Scrapping parametros,
    * URL é o link da pagina que você quer pegar.
    * Base_element é por onde vai começar a pegar.
    * Item é o seu produto na estrutura dele.
        * no item você deve passar o nome na API e onde esta localizado no site.
        * você pode tambem usar "*->" para ações especiais como pegar links ou imagens.
            * (parte da url comum) *-> (image | link)
        ```
        let item = {
            imgs: 'img_prod*->image',
            name: '<h1 class="product-name">',
        }
    ```
* API parametros (POST),
    * URL é o link da API   
    * Data é o item que você vai adicionar na API

## Como usar junto
No "index.js", basta você acertar os parametros que estão marcados como parametros para seu uso, e mudar as strings nos "scrapping", elas se referem onde o script vai começar.

* Você vai mudar todos as strings grandes no index.js
* Nos "scrapping" estão o elemento base do seu site
* No item, a string deve mostrar em qual elemento, esta seu texto.