/* =========================================
   X'MAS DECO — INTERAÇÕES DA PÁGINA
   ========================================= */

/* BUSCA: envia o termo para a página de produtos */

/*FORMULARIO*/
const searchForm = document.getElementById("searchForm");

if (searchForm) {
    searchForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const searchInput = document.getElementById("searchInput");
        const termo = searchInput ? searchInput.value.trim() : "";

        if (!termo) {
            alert("Por favor, digite algo para pesquisar.");
            searchInput?.focus();
            return;
        }

        window.location.href =
            `decoarvore.html?termo=${encodeURIComponent(termo)}`;
    });
}
/* CARROSSEL PRINCIPAL */
const heroTrack = document.querySelector(".carousel-track");
const heroSlides = document.querySelectorAll(".carousel-slide");
const heroPrev = document.querySelector(".prev-btn");
const heroNext = document.querySelector(".next-btn");

if (heroTrack && heroSlides.length && heroPrev && heroNext) {
    let slideAtual = 0;

    function mostrarSlide(indice) {
        slideAtual = (indice + heroSlides.length) % heroSlides.length;

        const largura = heroTrack.clientWidth;

        heroTrack.scrollTo({
            left: slideAtual * largura,
            behavior: "smooth"
        });
    }

    heroNext.addEventListener("click", () => {
        mostrarSlide(slideAtual + 1);
    });

    heroPrev.addEventListener("click", () => {
        mostrarSlide(slideAtual - 1);
    });

    // Mantém o índice correto ao redimensionar a tela
    window.addEventListener("resize", () => {
        heroTrack.scrollTo({
            left: slideAtual * heroTrack.clientWidth,
            behavior: "auto"
        });
    });
}

/* ÁUDIO*/
document.addEventListener("DOMContentLoaded", () => {
    const musica = document.getElementById("musicaNatal");
    if (!musica) return;

    musica.volume = 0.15;
    const botao = document.getElementById("botaoMusica");
    const btnTocar = document.getElementById("btnTocar");
    const btnParar = document.getElementById("btnParar");

    function atualizarBotoes() {
        if (botao) {
            botao.textContent = musica.paused ? "Tocar música" : "Pausar música";
            botao.setAttribute("aria-label", botao.textContent);
        }

        if (btnTocar && btnParar) {
            btnTocar.disabled = !musica.paused;
            btnParar.disabled = musica.paused;
            btnTocar.setAttribute("aria-label", "Tocar música");
            btnParar.setAttribute("aria-label", "Parar música");
        }
    }

    async function tocarMusica() {
        try {
            await musica.play();
        } catch (erro) {
            console.warn("Não foi possível reproduzir a música:", erro);
        }
        atualizarBotoes();
    }

    function pararMusica() {
        musica.pause();
        musica.currentTime = 0;
        atualizarBotoes();
    }

    botao?.addEventListener("click", () => {
        if (musica.paused) {
            tocarMusica();
        } else {
            musica.pause();
        }
    });

    btnTocar?.addEventListener("click", tocarMusica);
    btnParar?.addEventListener("click", pararMusica);
    musica.addEventListener("play", atualizarBotoes);
    musica.addEventListener("pause", atualizarBotoes);
    musica.addEventListener("ended", atualizarBotoes);

    // Tenta iniciar automaticamente; alguns navegadores exigem interação.
    tocarMusica();

    function iniciarAposInteracao(evento) {
        if (evento.target.closest(".music-controls")) return;
        document.removeEventListener("click", iniciarAposInteracao);
        document.removeEventListener("keydown", iniciarAposInteracao);
        tocarMusica();
    }

    document.addEventListener("click", iniciarAposInteracao);
    document.addEventListener("keydown", iniciarAposInteracao);
    atualizarBotoes();
});

/* CARROSSEL DE PROMOÇÕES */
const promoTrack = document.getElementById("slide");
const promoSlides = promoTrack
    ? Array.from(promoTrack.querySelectorAll(".slide-item"))
    : [];
const promoPrev = document.getElementById("btnPrev");
const promoNext = document.getElementById("btnNext");
const dotsContainer = document.getElementById("dotsContainer");

if (promoTrack && promoSlides.length > 0 && promoPrev && promoNext && dotsContainer) {
    let currentIndex = 0;
    let autoSlideTimer = null;

    dotsContainer.innerHTML = "";

    const dots = promoSlides.map((_, index) => {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = "dot";
        dot.setAttribute("aria-label", `Ir para a promoção ${index + 1}`);
        dot.addEventListener("click", () => goToSlide(index));
        dotsContainer.appendChild(dot);
        return dot;
    });

    function goToSlide(index, resetTimer = true) {
        currentIndex = (index + promoSlides.length) % promoSlides.length;

        promoTrack.style.transform = `translateX(-${currentIndex * 100}%)`;

        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === currentIndex);
            dot.setAttribute("aria-current", i === currentIndex ? "true" : "false");
        });

        if (resetTimer) restartAutoSlide();
    }

    function nextPromo() {
        goToSlide(currentIndex + 1, false);
    }

    function previousPromo() {
        goToSlide(currentIndex - 1, false);
    }

    function stopAutoSlide() {
        if (autoSlideTimer !== null) {
            clearInterval(autoSlideTimer);
            autoSlideTimer = null;
        }
    }

    function startAutoSlide() {
        stopAutoSlide();

        if (promoSlides.length > 1 &&
            !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            autoSlideTimer = setInterval(nextPromo, 5000);
        }
    }

    function restartAutoSlide() {
        startAutoSlide();
    }

    promoNext.addEventListener("click", () => {
        goToSlide(currentIndex + 1);
    });

    promoPrev.addEventListener("click", () => {
        goToSlide(currentIndex - 1);
    });

    const promoContainer = document.getElementById("acomodacoes");

    promoContainer?.addEventListener("mouseenter", stopAutoSlide);
    promoContainer?.addEventListener("mouseleave", startAutoSlide);
    promoContainer?.addEventListener("focusin", stopAutoSlide);
    promoContainer?.addEventListener("focusout", startAutoSlide);

    goToSlide(0, false);
    startAutoSlide();
}

//* PARALLAX DAS IMAGENS DOS DOIS SLIDES */
const heroBanner = document.querySelector(".banner-carousel-container");
const imagensParallax = document.querySelectorAll(
    ".banner-carousel-container .imagem-parallax"
);

if (heroBanner && imagensParallax.length) {
    let ticking = false;

    function atualizarParallax() {
        const posicao = heroBanner.getBoundingClientRect();
        const movimento = Math.max(
            -50,
            Math.min(50, -posicao.top * 0.25)
        );
        imagensParallax.forEach((imagem) => {
            imagem.style.transform = `translate3d(0, ${movimento}px, 0)`;
        });
        ticking = false;
    }
    window.addEventListener("scroll", () => {
        if (!ticking) {
            requestAnimationFrame(atualizarParallax);
            ticking = true;
        }
    }, { passive: true });
    window.addEventListener("resize", atualizarParallax);
    atualizarParallax();
}

/* BOTÃO VOLTAR AO INÍCIO */

const btnInicio = document.getElementById("btnInicio");
if (btnInicio) {
    function verificarFinalPagina() {
        const chegouAoFinal =
            window.scrollY + window.innerHeight >=
            document.documentElement.scrollHeight - 50;

        btnInicio.classList.toggle("escondido", !chegouAoFinal);
    }
    window.addEventListener("scroll", verificarFinalPagina);
    window.addEventListener("resize", verificarFinalPagina);

    btnInicio.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
    verificarFinalPagina();
}
function atualizarContadorNatal() {
    const contador = document.getElementById("contadorNatal");
    if (!contador) return;
    const agora = new Date();
    let anoNatal = agora.getFullYear();
    let natal = new Date(anoNatal, 11, 25, 0, 0, 0);
    if (agora >= natal) {
        anoNatal++;
        natal = new Date(anoNatal, 11, 25, 0, 0, 0);
    }
    const diferenca = natal - agora;
    const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferenca / (1000 * 60 * 60)) % 24);
    const minutos = Math.floor((diferenca / (1000 * 60)) % 60);
    const segundos = Math.floor((diferenca / 1000) % 60);
    contador.textContent =
        `🎄 Faltam ${dias}d ${horas}h ${minutos}min ${segundos}s para o Natal!`;
}

atualizarContadorNatal();
setInterval(atualizarContadorNatal, 1000);
// Atualiza imediatamente e depois a cada segundo
atualizarContadorNatal();
setInterval(atualizarContadorNatal, 1000);

//neve
// NEVE NO PRIMEIRO CARROSSEL
const areaNeve = document.getElementById("neve-carrossel");
const btnNeve = document.getElementById("btnNeve");
let intervaloNeve = null;
function criarFloco() {
    if (!areaNeve) return;
    const floco = document.createElement("span");
    floco.classList.add("floco-neve");
    floco.textContent = "❄";
    floco.style.left = Math.random() * 100 + "%";
    floco.style.opacity = Math.random();
    floco.style.fontSize = (Math.random() * 10 + 10) + "px";
    floco.style.animationDuration = (Math.random() * 4 + 4) + "s";
    areaNeve.appendChild(floco);
    floco.addEventListener("animationend", () => {
        floco.remove();
    });
}
if (areaNeve && btnNeve) {
    btnNeve.addEventListener("click", () => {
        const ativar = !areaNeve.classList.contains("ativa");
        areaNeve.classList.toggle("ativa", ativar);
        if (ativar) {
            btnNeve.textContent = "❄️ Desativar neve";
            criarFloco();
            intervaloNeve = setInterval(criarFloco, 250);
        } else {
            btnNeve.textContent = "❄️ Ativar neve";
            clearInterval(intervaloNeve);
            intervaloNeve = null;
            areaNeve.innerHTML = "";
        }
    });
}