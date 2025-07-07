document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("diario-form");
  const lista = document.getElementById("lista-entradas");
  const tituloInput = document.getElementById("titulo");

  // Preenche o campo de título com data e hora atual
  function preencherTituloAutomatico() {
    const agora = new Date();
    const dia = String(agora.getDate()).padStart(2, "0");
    const mes = String(agora.getMonth() + 1).padStart(2, "0");
    const ano = agora.getFullYear();
    const hora = String(agora.getHours()).padStart(2, "0");
    const minutos = String(agora.getMinutes()).padStart(2, "0");

    tituloInput.value = `Entrada de ${dia}/${mes}/${ano} às ${hora}:${minutos}`;
  }

  preencherTituloAutomatico(); // Preenche ao carregar

  const entradas = JSON.parse(localStorage.getItem("entradas")) || [];
  entradas.forEach(renderEntrada);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const titulo = tituloInput.value.trim();
    const mensagem = document.getElementById("mensagem").value.trim();

    if (!titulo || !mensagem) return;

    const entrada = {
      titulo,
      mensagem,
      data: new Date().toISOString(),
    };

    entradas.unshift(entrada);
    localStorage.setItem("entradas", JSON.stringify(entradas));
    renderEntrada(entrada);
    form.reset();
    preencherTituloAutomatico(); // Preenche de novo após salvar
  });

  function renderEntrada(entrada) {
    const artigo = document.createElement("article");
    const data = new Date(entrada.data);
    artigo.innerHTML = `
      <h3>${entrada.titulo}</h3>
      <time datetime="${entrada.data}">${data.toLocaleDateString(
      "pt-BR"
    )} ${data.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    })}</time>
      <p>${entrada.mensagem}</p>
    `;
    lista.prepend(artigo);
  }
});
