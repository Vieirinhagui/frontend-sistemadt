import mostrarDetalhesAluno from "./detalhesAlunos.js";

const btnfilterbuscaralunos = document.getElementById("btnbuscaraluno");
btnfilterbuscaralunos.addEventListener("click", buscaralunos);

const inputfilter = document.getElementById("inputfilternome");
const tableresponse = document.getElementById("resultsTable");
const results = document.getElementById("results");
inputfilter.addEventListener("input", buscarAlunosEmTempoReal);

function buscaralunos() {
  const perfilAluno = document.getElementById("perfilaluno");
  perfilAluno.style.display = "none";
  results.style.display = "flex";
  fetch("https://191.252.205.138:3333/alunos", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((responseData) => {
      tableresponse.innerHTML = `
        <tr>
          <th>STATUS</th>
          <th>ID</th>
          <th>NOME</th>
          <th>AÇÃO</th>
        </tr>
      `;

      responseData.forEach((result) => {
        const newRow = tableresponse.insertRow();

        const statusSVG = result.status
          ? `
            <svg
              width="16"
              height="17"
              viewBox="0 0 16 17"
              fill="#00A859"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 8.5C16 12.9183 12.4183 16.5 8 16.5C3.58172 16.5 0 12.9183 0 8.5C0 4.08172 3.58172 0.5 8 0.5C12.4183 0.5 16 4.08172 16 8.5Z"
              />
            </svg>`
          : `
            <svg
              width="16"
              height="17"
              viewBox="0 0 16 17"
              fill="#FF0000"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 8.5C16 12.9183 12.4183 16.5 8 16.5C3.58172 16.5 0 12.9183 0 8.5C0 4.08172 3.58172 0.5 8 0.5C12.4183 0.5 16 4.08172 16 8.5Z"
              />
            </svg>`;

        newRow.innerHTML = `
        <td>${statusSVG}</td>
        <td>${result.id}</td>
        <td>${result.nome}</td>
        <td><button class="detalhes-button">Detalhes</button></td>
        `;

        const detalhesButton = newRow.querySelector(".detalhes-button");
        detalhesButton.addEventListener("click", () => {
          inputfilter.value = "";

          results.style.display = "none";
          mostrarDetalhesAluno(result.id);
        });
      });
    })
    .catch((error) => {
      console.error("Ocorreu um erro durante a busca:", error);
    });
}

function buscarAlunosEmTempoReal() {
  const perfilAluno = document.getElementById("perfilaluno");
  perfilAluno.style.display = "none";
  results.style.display = "flex";

  const inputText = inputfilter.value;

  const data = {
    nome: inputText,
  };

  fetch(`https://191.252.205.138:3333/alunosNome/${inputText}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((responseData) => {
      tableresponse.innerHTML = `
        <tr>
          <th>STATUS</th>
          <th>ID</th>
          <th>NOME</th>
          <th>AÇÃO</th>
        </tr>
      `;

      responseData.forEach((result) => {
        const newRow = tableresponse.insertRow();

        const statusSVG = result.status
          ? `
            <svg
              width="16"
              height="17"
              viewBox="0 0 16 17"
              fill="#00A859"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 8.5C16 12.9183 12.4183 16.5 8 16.5C3.58172 16.5 0 12.9183 0 8.5C0 4.08172 3.58172 0.5 8 0.5C12.4183 0.5 16 4.08172 16 8.5Z"
              />
            </svg>`
          : `
            <svg
              width="16"
              height="17"
              viewBox="0 0 16 17"
              fill="#FF0000"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 8.5C16 12.9183 12.4183 16.5 8 16.5C3.58172 16.5 0 12.9183 0 8.5C0 4.08172 3.58172 0.5 8 0.5C12.4183 0.5 16 4.08172 16 8.5Z"
              />
            </svg>`;

        newRow.innerHTML = `
        <td>${statusSVG}</td>
        <td>${result.id}</td>
        <td>${result.nome}</td>
        <td><button class="detalhes-button">Detalhes</button></td>
        `;

        const detalhesButton = newRow.querySelector(".detalhes-button");
        detalhesButton.addEventListener("click", () => {
          inputfilter.value = "";
          results.style.display = "none";
          mostrarDetalhesAluno(result.id);
        });
      });
    })
    .catch((error) => {
      console.error("Ocorreu um erro durante a busca:", error);
    });
}
