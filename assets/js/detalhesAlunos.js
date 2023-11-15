import sectionEditarAluno from "./editarAlunos.js";

const resultStatus = document.getElementById("resultStatus");
const resultStatusPag = document.getElementById("resultStatusPag");
const resultSocio = document.getElementById("resultSocio");
const resultNome = document.getElementById("resultNome");
const resultDataNascimento = document.getElementById("resultDataNascimento");
const resultUnidade = document.getElementById("resultUnidade");
const resultPlano = document.getElementById("resultPlano");
const resultDiasSemana = document.getElementById("resultDiasSemana");
const resultObservacoes = document.getElementById("resultObservacoes");
const resultEmail = document.getElementById("resultEmail");
const resultRedeSocial = document.getElementById("resultRedeSocial");
const resultTelefone = document.getElementById("resultTelefone");
const resultCep = document.getElementById("resultCep");
const resultEndereco = document.getElementById("resultEndereco");
const resultBairro = document.getElementById("resultBairro");

const resultsectionnomeresponsavel = document.getElementById(
  "resultsectionnomeresponsavel"
);
const resultdataNascimentoresponsavel = document.getElementById(
  "resultdataNascimentoresponsavel"
);
const resultsectiontelefoneresponsavel = document.getElementById(
  "resultsectiontelefoneresponsavel"
);
const resultsectionEmailresponsavel = document.getElementById(
  "resultsectionEmailresponsavel"
);
const resultsectionredesocialresponsavel = document.getElementById(
  "resultsectionredesocialresponsavel"
);
const resultsectioncepresponsavel = document.getElementById(
  "resultsectioncepresponsavel"
);

const infoSectionAlunosMaiores = document.getElementById(
  "infoSectionAlunosMaiores"
);
const infoSectionResponsavel = document.getElementById(
  "infoSectionResponsaveis"
);
const btnformeditaraluno = document.getElementById("btnformeditaraluno");

function resetarSecaoDetalhesAluno() {
  resultStatus.innerText = "";
  resultStatusPag.innerText = "";
  resultSocio.innerText = "";
  resultNome.innerText = "";
  resultDataNascimento.innerText = "";
  resultUnidade.innerText = "";
  resultPlano.innerText = "";
  resultDiasSemana.innerText = "";
  resultObservacoes.innerText = "";
  resultEmail.innerText = "";
  resultRedeSocial.innerText = "";
  resultTelefone.innerText = "";
  resultCep.innerText = "";
  resultEndereco.innerText = "";
  resultBairro.innerText = "";
  infoSectionAlunosMaiores.style.display = "block"; // Define como visível
  infoSectionResponsavel.style.display = "block"; // Define como visível
}

export default function mostrarDetalhesAluno(id) {
  resetarSecaoDetalhesAluno(); // Chama a função para redefinir a seção

  const perfilAluno = document.getElementById("perfilaluno");
  perfilAluno.style.display = "flex";


  fetch(`https://vps50387.publiccloud.com.br:3333/alunosId/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  })
    .then((response) => response.json())
    .then((responseData) => {
      if (responseData.status == true) {
        resultStatus.innerText = "Ativo";
      } else {
        resultStatus.innerText = "Inativo";
      }
      if (responseData.statusPag == true) {
        resultStatusPag.innerText = "Pago";
      } else {
        resultStatusPag.innerText = "Pendente";
      }
      if (responseData.socio == true) {
        resultSocio.innerText = "Sócio";
      } else {
        resultSocio.innerText = "Não Sócio";
      }

      resultNome.innerText = responseData.nome;
      resultDataNascimento.innerText = responseData.dataNascimento;
      resultUnidade.innerText = responseData.unidade;
      resultPlano.innerText = responseData.plano;
      resultDiasSemana.innerText = responseData.qntDias;
      resultObservacoes.innerText = responseData.observacoes;

      if (responseData.email == null) {
        infoSectionAlunosMaiores.style.display = "none"; // Define como visível
        infoSectionResponsavel.style.display = "block";
      } else {
        resultEmail.innerText = responseData.email; // Define como visível
        infoSectionResponsavel.style.display = "none";
      }
      if (responseData.redeSocial) {
        resultRedeSocial.innerText = responseData.redeSocial;
      } else {
        infoSectionAlunosMaiores.style.display = "none";
      }
      if (responseData.telefone) {
        resultTelefone.innerText = responseData.telefone;
      } else {
        infoSectionAlunosMaiores.style.display = "none";
      }
      if (responseData.cep) {
        resultCep.innerText = responseData.cep;
      } else {
        infoSectionAlunosMaiores.style.display = "none";
      }
      if (responseData.endereco) {
        resultEndereco.innerText = responseData.endereco;
      } else {
        infoSectionAlunosMaiores.style.display = "none";
      }
      if (responseData.bairro) {
        resultBairro.innerText = responseData.bairro;
      } else {
        infoSectionAlunosMaiores.style.display = "none";
      }

      if (responseData.responsavel.nome) {
        infoSectionAlunosMaiores.style.display = "none"; 
        infoSectionResponsavel.style.display = "block";
        resultsectionnomeresponsavel.innerText =
          responseData.Responsavei.nome;
        resultdataNascimentoresponsavel.innerText =
          responseData.Responsavei.dataNascimento;
        resultsectiontelefoneresponsavel.innerText =
          responseData.Responsavei.telefone;
        resultsectionEmailresponsavel.innerText =
          responseData.Responsavei.email;
        resultsectioncepresponsavel.innerText =
          responseData.Responsavei.endereco;
      }
      btnformeditaraluno.setAttribute("data-id", id);
      btnformeditaraluno.addEventListener("click", sectionEditarAluno);
    })
    .catch((error) => {
      console.error("Ocorreu um erro durante a busca:", error);
    });
}
