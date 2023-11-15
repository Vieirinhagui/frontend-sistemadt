import { handleButtonClick } from "../js/menu.js";

const alunodetail = document.getElementById("alunodetails");
function calcularIdade(dataNascimento) {
  const hoje = new Date();
  const dataNasc = new Date(dataNascimento);
  const diferenca = hoje - dataNasc;
  const idade = Math.floor(diferenca / (1000 * 60 * 60 * 24 * 365.25));
  return idade;
}

function verificarIdade() {
  const dataNascimentoInput = document.getElementById("inputDataNascimento");
  const infoAlunosMaiores = document.getElementById("infoAlunosMaiores");
  const infoResponsavel = document.getElementById("infoResponsaveis");
  if (dataNascimentoInput.value) {
    const idade = calcularIdade(dataNascimentoInput.value);

    if (idade >= 18) {
      infoAlunosMaiores.style.display = "block";
      infoResponsavel.style.display = "none";
    } else {
      infoAlunosMaiores.style.display = "none";
      infoResponsavel.style.display = "block";
    }
  }
}

document
  .getElementById("inputDataNascimento")
  .addEventListener("change", verificarIdade);

const form = document.getElementById("formcadastrar");

form.addEventListener("submit", cadastrarAluno);

const btncadastrar = document.getElementById("btnformcadastraraluno");
btncadastrar.addEventListener("click", cadastrarAluno);

const inputIds = [
  "inputNome",
  "inputEmail",
  "inputTelefone",
  "inputEndereco",
  "inputCep",
  "inputUnidade",
  "inputBairro",
  "inputPlano",
  "inputDiasSemana",
  "inputDataNascimento",
  "inputRedeSocial",
  "inputPago",
  "inputPendente",
  "inputObservacoes",
  "inputSocio",
  "inputNaoSocio",
  "inputnomeresponsavel",
  "inputTelefoneresponsavel",
  "inputEmailresponsavel",
  "inputCepresponsavel",
  "inputDataNascimentoresponsavel",
];

function cadastrarAluno(event) {
  event.preventDefault();
  const getValue = (id) => {
    const element = document.getElementById(id).value;
    return element ? element : null;
  };

  // Lista de campos obrigatórios
  const camposObrigatorios = [
    "inputNome",
    "inputUnidade",
    "inputPlano",
    "inputDiasSemana",
    "inputDataNascimento",
    "inputObservacoes",
  ];

  // Verifica se algum dos campos obrigatórios está em branco
  const camposEmBranco = camposObrigatorios.filter((id) => !getValue(id));

  if (camposEmBranco.length > 0) {
    // Exibe uma mensagem de erro informando quais campos estão em branco
    alert(`Os seguintes campos estão em branco: ${camposEmBranco.join(", ")}`);
    return;
  }

  const getCheckedValue = (id) => document.getElementById(id).checked;

  const responsavel = {
    nome: getValue("inputnomeresponsavel"),
    telefone: getValue("inputTelefoneresponsavel"),
    email: getValue("inputEmailresponsavel"),
    endereco: getValue("inputCepresponsavel"),
    dataNascimento: getValue("inputDataNascimentoresponsavel"),
  };

  // Valores dos campos
  const data = {
    nome: getValue("inputNome"),
    email: getValue("inputEmail"),
    telefone: getValue("inputTelefone"),
    endereco: getValue("inputEndereco"),
    cep: parseInt(getValue("inputCep")),
    unidade: getValue("inputUnidade"),
    bairro: getValue("inputBairro"),
    plano: getValue("inputPlano"),
    qntDias: parseInt(getValue("inputDiasSemana")),
    dataNascimento: getValue("inputDataNascimento"),
    status: getCheckedValue("inputAtivo"),
    redeSocial: getValue("inputRedeSocial"),
    statusPag: getCheckedValue("inputPago"),
    observacoes: getValue("inputObservacoes"),
    socio: getCheckedValue("inputSocio"),
    responsavel: responsavel,
  };

  // Envia os dados para o servidor
  fetch("https://191.252.205.138:3333/alunos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((responseData) => {
      // Limpa os campos do formulário
      const gruposRadio = ["status", "statusPagamento", "socio"];

      // Função para limpar a seleção de um grupo de input radio
      function limparSelecaoRadio(grupo) {
        const radios = document.getElementsByName(grupo);
        radios.forEach((radio) => {
          radio.checked = false;
        });
      }

      // Chame a função para limpar a seleção de cada grupo de input radio
      gruposRadio.forEach((grupo) => {
        limparSelecaoRadio(grupo);
      });
      inputIds.forEach((id) => (document.getElementById(id).value = ""));
      const sectionCadastro = document.getElementById("cadastraralunos");
      sectionCadastro.style.display = "none";
      const sectionHome = document.getElementById("home");
      sectionHome.style.display = "flex";

      alunodetail.open = false;

      handleButtonClick("home");
      alert("Cadastrado com sucesso!");
    })
    .catch((error) => {
      console.error("Ocorreu um erro durante o cadastro:", error);
    });
}
