/* CATÁLOGO — EXTERNO */

const produtos = [
    {
        id: 1,
        nome: "Rena de Led",
        categoria: "Decoração",
        preco: 17.90,
        imagem: "https://cdn.awsli.com.br/1000x1000/2765/2765888/produto/295547971/bola-de-natal-listras-vermelho-10cm---4-un-0-g8ytcnsln3.jpg",
        disponivel: true
    },
    {
        id: 2,
        nome: "Placa de Jardim",
        categoria: "Decoração",
        preco: 19.99,
        imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcAKzyE167uRYrA0cQh1rL8o_1ZgmXtXYubvOgjipWoA&s=10",
        disponivel: true
    },
    {
        id: 3,
        nome: "Guirlanda",
        categoria: "Decoração",
        preco: 11.09,
        imagem: "https://cdn.leroymerlin.com.br/products/enfeite_arvore_natal_laco_dourado_com_glitter_16cm_4_unidades_1570790908_fa7e_600x600.jpg",
        disponivel: true
    },
    {
        id: 4,
        nome: "Capa de porta",
        categoria: "Decoração",
        preco: 10.99,
        imagem: "https://http2.mlstatic.com/D_NQ_NP_845260-MLB113800350628_072026-O-1--mini-papai-noel-pendente-decorar-arvore-natal-9cm.webp",
        disponivel: true
    },
    {
        id: 5,
        nome: "Boneco de neve",
        categoria: "Decoração",
        preco: 8.90,
        imagem: "https://http2.mlstatic.com/D_NQ_NP_772924-MLB101926223611_122025-O.webp",
        disponivel: true
    },
    {
        id: 6,
        nome: "Trenó decorativo",
        categoria: "Decoração",
        preco: 15.50,
        imagem: "https://static.welban.com.br/public/welban/imagens/produtos/festao-verde-5cm-x-5m-natalino-impulsetto-636bfc3e91828.jpg",
        disponivel: true
    },
    {
        id: 7,
        nome: "Árvore inflável",
        categoria: "Decoração",
        preco: 15.50,
        imagem: "https://images.tcdn.com.br/img/img_prod/388802/festo_hologrfico_branco_fino_natal_luxo_180m_x_5_1_20260506114716_b89a476c7dbd.jpg",
        disponivel: true
    },
    {
        id: 8,
        nome: "Placa com LED",
        categoria: "Decoração",
        preco: 10.99,
        imagem: "https://cdn.awsli.com.br/761/761999/produto/373480799/1084074-nz30l97u19.jpg",
        disponivel: true
    },
    {
        id: 9,
        nome: "Pisca-pisca externo",
        categoria: "Decoração",
        preco: 17.90,
        imagem: "https://http2.mlstatic.com/D_NQ_NP_914669-MLB109980993179_042026-O-bola-natalina-grande-enfeite-arvore-natal-dourada-15cm.webp",
        disponivel: true
    },
    {
        id: 10,
        nome: "Estrela de LED",
        categoria: "Decoração",
        preco: 5.99,
        imagem: "https://nilmaraquintela.com.br/wp-content/uploads/2019/11/IMG_2060.jpg",
        disponivel: true
    },
    {
        id: 11,
        nome: "Pesente de LED",
        categoria: "Decoração",
        preco: 15.50,
        imagem: "https://static.welban.com.br/public/welban/imagens/produtos/festao-metaloide-dourado-9cm-x-2m-natalino-global-63694f000cf1c.jpg",
        disponivel: true
    },
    {
        id: 12,
        nome: "Bolas com LED",
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
