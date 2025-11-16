const resultado = document.getElementById("resultado");
const botoes = document.querySelectorAll(".choice");
const btnReiniciar = document.getElementById("btn-reiniciar");


const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const icones = {
    pedra: "🪨",
    papel: "📄",
    tesoura: "✂️"
};

const opcoes = ["pedra", "papel", "tesoura"];

let animacaoInterval = null;
let colidiu = false;

function verificarResultado(jogador, computador) {
    if (jogador === computador) return "empate";

    if (
        (jogador === "pedra" && computador === "tesoura") ||
        (jogador === "papel" && computador === "pedra") ||
        (jogador === "tesoura" && computador === "papel")
    ) {
        return "jogador";
    } else {
        return "computador";
    }
}

function animar(jogador, computador, vencedor) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (animacaoInterval) clearInterval(animacaoInterval);

    let xJogador = 20;
    let xComputador = 200;
    const y = 100;
    const velocidade = 4;

    animacaoInterval = setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.font = "60px serif";

        if (colidiu) {

            if (vencedor === "jogador") {
                ctx.fillText(icones[jogador], xJogador, y);
            } else {
                ctx.fillText(icones[computador], xComputador, y);
            }

            clearInterval(animacaoInterval);
            return;
        }

        ctx.fillText(icones[jogador], xJogador, y);
        ctx.fillText(icones[computador], xComputador, y);

        if (vencedor === "jogador") xJogador += velocidade;
        if (vencedor === "computador") xComputador -= velocidade;

        if (Math.abs(xJogador - xComputador) < 50) {
            colidiu = true;

            if (vencedor === "jogador") {
                xJogador = xComputador; 
            } else {
                xComputador = xJogador;
            }
        }

    }, 16);
}


botoes.forEach(botao => {
    botao.addEventListener("click", () => {
        const escolhaUsuario = botao.getAttribute("data-option");
        const escolhaComputador = opcoes[Math.floor(Math.random() * 3)];
        colidiu = false
        const vencedor = verificarResultado(escolhaUsuario, escolhaComputador);
        

        canvas.classList.remove("hidden"); // ← mostra o canvas

        let mensagem = `Você escolheu ${escolhaUsuario} — Computador escolheu ${escolhaComputador}<br>`;
        if (vencedor === "empate") {
            mensagem += "Empate!";
        } else if (vencedor === "jogador") {
            mensagem += "🎉 Você venceu!";
        } else {
            mensagem += "😢 Você perdeu!";
        }

        resultado.innerHTML = mensagem;

        animar(escolhaUsuario, escolhaComputador, vencedor);
    });
});

btnReiniciar.addEventListener("click", () => {
    resultado.innerHTML = "Escolha uma opção para jogar!";

    if (animacaoInterval) clearInterval(animacaoInterval);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.classList.add("hidden");
});
