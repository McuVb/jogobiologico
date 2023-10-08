var rows = 3;
var columns = 3;

var currTile;
var otherTile; //blank tile

var movimentos = 0;

var ordemDesejada = ["1.png", "2.png", "3.png", "4.png", "5.png", "6.png", "7.png", "8.png", "9.png"];

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
shuffleArray(ordemDesejada);

window.onload = function () {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("img");
            tile.id = r.toString() + "-" + c.toString();
            tile.src = ordemDesejada.shift();

            tile.addEventListener("dragstart", dragStart);
            tile.addEventListener("dragover", dragOver);
            tile.addEventListener("dragenter", dragEnter);
            tile.addEventListener("dragleave", dragLeave);
            tile.addEventListener("drop", dragDrop);
            tile.addEventListener("dragend", dragEnd);

            document.getElementById("board").append(tile);
        }
    }
    verificarCompletude(); // Verificar se o quebra-cabeça já está completo após a criação inicial.
}

function dragStart() {
    currTile = this;
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {
}

function dragDrop() {
    otherTile = this;
}

function dragEnd() {
    let currCoords = currTile.id.split("-");
    let r = parseInt(currCoords[0]);
    let c = parseInt(currCoords[1]);

    let otherCoords = otherTile.id.split("-");
    let r2 = parseInt(otherCoords[0]);
    let c2 = parseInt(otherCoords[1]);

    let moveLeft = r == r2 && c2 == c - 1;
    let moveRight = r == r2 && c2 == c + 1;
    let moveUp = c == c2 && r2 == r - 1;
    let moveDown = c == c2 && r2 == r + 1;
    let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

    if (isAdjacent) {
        let currImg = currTile.src;
        let otherImg = otherTile.src;

        currTile.src = otherImg;
        otherTile.src = currImg;

        movimentos += 1;
        document.getElementById("movimentos").innerText = movimentos;

        verificarCompletude();
    }
}

function mostrarMensagem(texto) {
    var mensagem = document.getElementById("mensagem");
    mensagem.innerText = texto;
    mensagem.style.display = "block"; // Exibir a mensagem
}

function reiniciarJogo() {
    // Restaure a ordem original das imagens ou embaralhe novamente
    shuffleArray(ordemDesejada);
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            var tile = document.getElementById(r.toString() + "-" + c.toString());
            tile.src = ordemDesejada.shift();
        }
    }

    // Limpe a mensagem e os movimentos
    var mensagem = document.getElementById("mensagem");
    mensagem.style.display = "none";
    document.getElementById("mensagem-texto").innerText = "";
    movimentos = 0;
    document.getElementById("movimentos").innerText = movimentos;
}

function verificarCompletude() {
    var imagensAtuais = [];
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            var tile = document.getElementById(r.toString() + "-" + c.toString());
            imagensAtuais.push(tile.src);
        }
    }

    if (JSON.stringify(imagensAtuais) === JSON.stringify(ordemDesejada)) {
        mostrarMensagem("Parabéns! Você completou o quebra-cabeça!");
    }
}
