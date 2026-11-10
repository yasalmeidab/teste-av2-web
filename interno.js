/* CATÁLOGO — DECORAÇÃO DE ÁRVORE */

const produtos = [
    {
        id: 1,
        nome: "Árvore de Natal",
        categoria: "Decoração",
        preco: 17.90,
        imagem: "img/arvore-de-natal-decorada-01.jpg",
        disponivel: true
    },
    {
        id: 2,
        nome: "Estrela árvore",
        categoria: "Decoração",
        preco: 19.99,
        imagem: "img/estrelaarvore.jpg",
        disponivel: true
    },
    {
        id: 3,
        nome: "Relógio Natalino",
        categoria: "Decoração",
        preco: 11.09,
        imagem: "img/relogionatalino.jpg",
        disponivel: true
    },
    {
        id: 4,
        nome: "Homem de Gengibre",
        categoria: "Decoração",
        preco: 10.99,
        imagem: "img/gingerbread.jpg",
        disponivel: true
    },
    {
        id: 5,
        nome: "Flocos de Neves Decorativos",
        categoria: "Decoração",
        preco: 8.90,
        imagem: "img/floco.img",
        disponivel: true
    },
    {
        id: 6,
        nome: "Bola Vermelha",
        categoria: "Decoração",
        preco: 15.50,
        imagem: "img/bola.jpg",
        disponivel: true
    },
    {
        id: 7,
        nome: "Festão Branco",
        categoria: "Decoração",
        preco: 15.50,
        imagem: "img/",
        disponivel: true
    },
    {
        id: 8,
        nome: "Mini Rena",
        categoria: "Decoração",
        preco: 10.99,
        imagem: "img/",
        disponivel: true
    },
    {
        id: 9,
        nome: "Bola dourada",
        categoria: "Decoração",
        preco: 17.90,
        imagem: "https://http2.mlstatic.com/D_NQ_NP_914669-MLB109980993179_042026-O-bola-natalina-grande-enfeite-arvore-natal-dourada-15cm.webp",
        disponivel: true
    },
    {
        id: 10,
        nome: "Mini presente",
        categoria: "Decoração",
        preco: 5.99,
        imagem: "https://nilmaraquintela.com.br/wp-content/uploads/2019/11/IMG_2060.jpg",
        disponivel: true
    },
    {
        id: 11,
        nome: "Festão dourado",
        categoria: "Decoração",
        preco: 15.50,
        imagem: "https://static.welban.com.br/public/welban/imagens/produtos/festao-metaloide-dourado-9cm-x-2m-natalino-global-63694f000cf1c.jpg",
        disponivel: true
    },
    {
        id: 12,
        nome: "Bola branca",
        categoria: "Decoração",
        preco: 17.90,
        imagem: "https://m.media-amazon.com/images/I/71TlTP-QUXL._AC_SX522_.jpg",
        disponivel: true
    }
];

function formatarPreco(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

function renderizarProdutos(listaProdutos) {
    const container = document.getElementById("container-produtos");
    if (!container) return;

    if (listaProdutos.length === 0) {
        container.innerHTML =
            '<p class="mensagem-sem-produtos">Nenhum produto encontrado para essa pesquisa.</p>';
        return;
    }

    container.innerHTML = listaProdutos.map((produto) => `
        <article class="card-produto" data-id="${produto.id}">
            <img
                src="${produto.imagem}"
                alt="${produto.nome}"
                class="produto-img"
                loading="lazy"
            >
            <div class="produto-info">
                <span class="produto-categoria">${produto.categoria}</span>
                <h2 class="produto-nome">${produto.nome}</h2>
                <p class="produto-preco">${formatarPreco(produto.preco)}</p>
                <button class="btn-comprar" type="button"
                        data-produto-id="${produto.id}">
                    Adicionar ao Carrinho
                </button>
            </div>
        </article>
    `).join("");
}

const parametrosURL = new URLSearchParams(window.location.search);
const termoBusca = (parametrosURL.get("termo") || "").trim().toLocaleLowerCase("pt-BR");

const produtosFiltrados = termoBusca
    ? produtos.filter((produto) => {
        const texto = `${produto.nome} ${produto.categoria}`.toLocaleLowerCase("pt-BR");
        return texto.includes(termoBusca);
    })
    : produtos;

renderizarProdutos(produtosFiltrados);

/* Observação: os botões de carrinho continuam sendo apenas visuais,
   pois o projeto enviado ainda não contém uma lógica de carrinho. */
