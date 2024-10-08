const listaProdutos = document.getElementById('lista-produtos');
const formAdicionar = document.getElementById('form-adicionar');


function listarProdutos() {
  fetch('http://127.0.0.1:5000/produtos')
    .then(response => response.json())
    .then(produtos => {
      listaProdutos.innerHTML = '';
      produtos.forEach(produto => {
        const itemProduto = document.createElement('li');
        itemProduto.innerHTML = `${produto.nome} - R$ ${produto.preco.toFixed(2)}
          <button onclick="editarProduto(${produto.id})">Editar</button>
          <button onclick="deletarProduto(${produto.id})">Deletar</button>`;
        listaProdutos.appendChild(itemProduto);
      });
    })
    .catch(error => {
      console.error('Erro na requisição:', error);
      alert('Falha ao se conectar com a API.');
    });
}


formAdicionar.onsubmit = function (event) {
  event.preventDefault();
  const nome = document.getElementById('nome').value;
  const preco = parseFloat(document.getElementById('preco').value);

  fetch('http://127.0.0.1:5000/produtos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ nome, preco })
  })
    .then(response => response.json())
    .then(produto => {
      console.log('Produto adicionado:', produto);
      listarProdutos();
      formAdicionar.reset();
    })
    .catch(error => {
      console.error('Erro ao adicionar produto:', error);
    });
};


function deletarProduto(id) {
  fetch(`http://127.0.0.1:5000/produtos/${id}`, {
    method: 'DELETE'
  })
    .then(response => response.json())
    .then(mensagem => {
      console.log(mensagem);
      listarProdutos();
    })
    .catch(error => {
      console.error('Erro ao deletar produto:', error);
    });
}


function editarProduto(id) {
  const nome = prompt('Novo nome do produto:');
  const preco = prompt('Novo preço do produto:');

  if (nome && preco) {
    fetch(`http://127.0.0.1:5000/produtos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nome, preco: parseFloat(preco) })
    })
      .then(response => response.json())
      .then(produto => {
        console.log('Produto atualizado:', produto);
        listarProdutos();
      })
      .catch(error => {
        console.error('Erro ao atualizar produto:', error);
      });
  }
}


listarProdutos();