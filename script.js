const API_URL = "http://localhost:3000/jogos";

let jogos = [];

const listaJogos = document.getElementById("listaJogos");

const pesquisa = document.getElementById("pesquisa");
const filtroStatus = document.getElementById("filtroStatus");

const totalJogos = document.getElementById("totalJogos");
const jogando = document.getElementById("jogando");
const finalizados = document.getElementById("finalizados");

const mensagem = document.getElementById("mensagem");

const formJogo = document.getElementById("formJogo");

const idJogo = document.getElementById("idJogo");
const titulo = document.getElementById("titulo");
const genero = document.getElementById("genero");
const plataforma = document.getElementById("plataforma");
const nota = document.getElementById("nota");
const status = document.getElementById("status");

const tituloFormulario =
    document.getElementById("tituloFormulario");

const btnSalvar =
    document.getElementById("btnSalvar");

const btnCancelar =
    document.getElementById("btnCancelar");


async function carregarJogos() {

    try {

        const resposta = await fetch(API_URL);

        if (!resposta.ok) {
            throw new Error("Erro ao acessar a API.");
        }

        const dados = await resposta.json();

        if (!Array.isArray(dados)) {
            throw new Error("A API não retornou uma lista de jogos.");
        }

        jogos = dados;

        console.log("Jogos recebidos da API:", jogos);

        renderizarJogos();

        atualizarDashboard();

    } catch (erro) {

        console.error("Erro:", erro);

        listaJogos.innerHTML = `
            <p>
                Não foi possível carregar os jogos.
            </p>
        `;

        mostrarMensagem(
            "Não foi possível conectar com a API.",
            true
        );
    }
}


function renderizarJogos() {

    listaJogos.innerHTML = "";

    const textoPesquisa =
        pesquisa.value.toLowerCase().trim();

    const statusSelecionado =
        filtroStatus.value;

    const jogosFiltrados = jogos.filter(function (jogo) {

        const tituloJogo =
            String(jogo.titulo || "").toLowerCase();

        const statusJogo =
            String(jogo.status || "");

        const correspondePesquisa =
            tituloJogo.includes(textoPesquisa);

        const correspondeStatus =
            statusSelecionado === "Todos" ||
            statusJogo === statusSelecionado;

        return correspondePesquisa &&
               correspondeStatus;

    });

    if (jogosFiltrados.length === 0) {

        listaJogos.innerHTML = `
            <p class="sem-jogos">
                Nenhum jogo encontrado.
            </p>
        `;

        return;
    }

    jogosFiltrados.forEach(function (jogo) {

        const card =
            document.createElement("div");

        card.classList.add("card-jogo");

        card.innerHTML = `

            <h3>${jogo.titulo}</h3>

            <p>
                <strong>Gênero:</strong>
                ${jogo.genero}
            </p>

            <p>
                <strong>Plataforma:</strong>
                ${jogo.plataforma}
            </p>

            <p class="nota">
                Nota: ${jogo.nota}
            </p>

            <span class="status">
                ${jogo.status}
            </span>

            <div class="card-botoes">

                <button
                    class="btn-editar"
                    onclick="editarJogo('${jogo.id}')">

                    Editar

                </button>

                <button
                    class="btn-excluir"
                    onclick="excluirJogo('${jogo.id}')">

                    Excluir

                </button>

            </div>
        `;

        listaJogos.appendChild(card);

    });
}


function atualizarDashboard() {

    totalJogos.textContent = jogos.length;

    const quantidadeJogando =
        jogos.filter(function (jogo) {

            return jogo.status === "Jogando";

        }).length;

    const quantidadeFinalizados =
        jogos.filter(function (jogo) {

            return jogo.status === "Finalizado";

        }).length;

    jogando.textContent =
        quantidadeJogando;

    finalizados.textContent =
        quantidadeFinalizados;
}


formJogo.addEventListener(
    "submit",
    async function (evento) {

        evento.preventDefault();

        const tituloValor =
            titulo.value.trim();

        const generoValor =
            genero.value.trim();

        const plataformaValor =
            plataforma.value.trim();

        const notaValor =
            Number(nota.value);

        const statusValor =
            status.value;

        if (tituloValor === "") {

            mostrarMensagem(
                "Digite o título do jogo.",
                true
            );

            titulo.focus();

            return;
        }

        if (generoValor === "") {

            mostrarMensagem(
                "Digite o gênero do jogo.",
                true
            );

            genero.focus();

            return;
        }

        if (plataformaValor === "") {

            mostrarMensagem(
                "Digite a plataforma do jogo.",
                true
            );

            plataforma.focus();

            return;
        }

        if (
            nota.value === "" ||
            notaValor < 0 ||
            notaValor > 10
        ) {

            mostrarMensagem(
                "A nota precisa estar entre 0 e 10.",
                true
            );

            nota.focus();

            return;
        }

        if (statusValor === "") {

            mostrarMensagem(
                "Selecione um status.",
                true
            );

            status.focus();

            return;
        }

        const novoJogo = {

            titulo: tituloValor,

            genero: generoValor,

            plataforma: plataformaValor,

            nota: notaValor,

            status: statusValor

        };

        try {

            if (idJogo.value !== "") {

                const resposta =
                    await fetch(
                        `${API_URL}/${idJogo.value}`,
                        {
                            method: "PUT",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body:
                                JSON.stringify({
                                    id: idJogo.value,
                                    ...novoJogo
                                })
                        }
                    );

                if (!resposta.ok) {
                    throw new Error(
                        "Erro ao editar."
                    );
                }

                mostrarMensagem(
                    "Jogo editado com sucesso!"
                );

            }

            else {

                const resposta =
                    await fetch(
                        API_URL,
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body:
                                JSON.stringify(novoJogo)
                        }
                    );

                if (!resposta.ok) {
                    throw new Error(
                        "Erro ao cadastrar."
                    );
                }

                mostrarMensagem(
                    "Jogo cadastrado com sucesso!"
                );
            }

            limparFormulario();

            await carregarJogos();

        } catch (erro) {

            console.error(erro);

            mostrarMensagem(
                "Erro ao salvar o jogo.",
                true
            );
        }
    }
);


function editarJogo(id) {

    const jogo =
        jogos.find(function (jogo) {

            return String(jogo.id) === String(id);

        });

    if (!jogo) {

        mostrarMensagem(
            "Jogo não encontrado.",
            true
        );

        return;
    }

    idJogo.value = jogo.id;

    titulo.value = jogo.titulo;

    genero.value = jogo.genero;

    plataforma.value = jogo.plataforma;

    nota.value = jogo.nota;

    status.value = jogo.status;

    tituloFormulario.textContent =
        "Editar jogo";

    btnSalvar.textContent =
        "Salvar alterações";

    btnCancelar.hidden = false;

    document
        .querySelector(".formulario-section")
        .scrollIntoView({
            behavior: "smooth"
        });
}


async function excluirJogo(id) {

    const jogo =
        jogos.find(function (jogo) {

            return String(jogo.id) === String(id);

        });

    if (!jogo) {

        mostrarMensagem(
            "Jogo não encontrado.",
            true
        );

        return;
    }

    const confirmou =
        confirm(
            `Deseja realmente excluir "${jogo.titulo}"?`
        );

    if (!confirmou) {
        return;
    }

    try {

        const resposta =
            await fetch(
                `${API_URL}/${id}`,
                {
                    method: "DELETE"
                }
            );

        if (!resposta.ok) {

            throw new Error(
                "Erro ao excluir."
            );
        }

        mostrarMensagem(
            "Jogo excluído com sucesso!"
        );

        await carregarJogos();

    } catch (erro) {

        console.error(erro);

        mostrarMensagem(
            "Erro ao excluir o jogo.",
            true
        );
    }
}


btnCancelar.addEventListener(
    "click",
    function () {

        limparFormulario();

    }
);


function limparFormulario() {

    formJogo.reset();

    idJogo.value = "";

    tituloFormulario.textContent =
        "Cadastrar novo jogo";

    btnSalvar.textContent =
        "Cadastrar jogo";

    btnCancelar.hidden = true;
}


pesquisa.addEventListener(
    "input",
    function () {

        renderizarJogos();

    }
);


filtroStatus.addEventListener(
    "change",
    function () {

        renderizarJogos();

    }
);


function mostrarMensagem(
    texto,
    erro = false
) {

    mensagem.textContent = texto;

    if (erro) {

        mensagem.style.color =
            "#ff7b8a";

    } else {

        mensagem.style.color =
            "#9b7cff";
    }

    setTimeout(
        function () {

            mensagem.textContent = "";

        },
        4000
    );
}


carregarJogos();