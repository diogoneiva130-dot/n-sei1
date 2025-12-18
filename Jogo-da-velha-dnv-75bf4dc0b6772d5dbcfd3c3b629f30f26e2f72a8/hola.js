// Pega todos os quadradin
const q = document.querySelectorAll(".QuadradinDoJogo");

// Indicador de turno
const indicador = document.getElementById("IndicadorTurno");

// Variáveis principais
let turno = (Math.random() > 0.5) ? "O" : "X";
let jogoAtivo = true;

// Memória do jogo
let gokuSS4 = ["", "", "", "", "", "", "", "", ""];

// Combinações vencedoras
const vitorias = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// Atualiza o indicador de turno
function atualizarIndicador() {
    indicador.textContent = `Vez do jogador: ${turno}`;

    indicador.classList.remove("Xturno", "Oturno");
    indicador.classList.add(turno === "X" ? "Xturno" : "Oturno");
}

// Inicializa o indicador
atualizarIndicador();

// Clique nos quadrados
q.forEach((QuadradinDoJogo, index) => {
    QuadradinDoJogo.addEventListener("click", () => {

        // Bloqueios
        if (!jogoAtivo) return;
        if (gokuSS4[index] !== "") return;

        // Salvar jogada
        gokuSS4[index] = turno;

        // Mostra no quadrado
        QuadradinDoJogo.textContent = turno;
        QuadradinDoJogo.classList.add(turno);

        // Verifica vitória
        if (verificarVitoria()) {
            indicador.textContent = ` Jogador ${turno} venceu!`;
            jogoAtivo = false;
            return;
        }

        // Verifica empate
        if (!gokuSS4.includes("")) {
            indicador.textContent = " Empate!";
            jogoAtivo = false;
            return;
        }

        // Troca turno
        turno = (turno === "X") ? "O" : "X";
        atualizarIndicador();
    });
});

// Função que verifica vitória
function verificarVitoria() {
    return vitorias.some(combinacao =>
        combinacao.every(index => gokuSS4[index] === turno)
    );
}

// Botão Resetar
document.getElementById("Bresetar").addEventListener("click", () => {
    gokuSS4 = ["", "", "", "", "", "", "", "", ""];
    jogoAtivo = true;
    turno = (Math.random() > 0.5) ? "O" : "X";

    q.forEach(qd => {
        qd.textContent = "";
        qd.classList.remove("X", "O");
    });

    atualizarIndicador();
});
