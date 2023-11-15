// import { setActiveTab } from "./menu.js";

const btneditar = document.getElementById("btnformeditaraluno");
const editarAlunosection = document.getElementById("editaralunos");

const btnSalvarEdicao = document.getElementById("btnformsalvaraluno");

function limpartabela() {
  const tabela = document.getElementById("resultsTable");
  tabela.innerHTML = `
    <tr>
      <th>STATUS</th>
      <th>ID</th>
      <th>NOME</th>
      <th>AÇÃO</th>
    </tr>
  `;
}

export default function sectionEditarAluno(event) {
  event.preventDefault();
  limpartabela();
  const btnid = btneditar.attributes["data-id"].value;
  document.getElementById("buscaralunos").style.display = "none";
  const perfilAluno = document.getElementById("perfilaluno");
  perfilAluno.style.display = "none";

  const infoAlunosMaiores = document.getElementById("infoEditarAlunosMaiores");

  fetch(`https://vps50387.publiccloud.com.br:3333/alunosId/${btnid}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((responseData) => {
      const resultado = responseData[0];
      document.getElementById("inputEditarBairro").value = resultado.bairro;
      document.getElementById("inputEditarCep").value = resultado.cep;
      document.getElementById("inputEditarDataNascimento").value =
        resultado.dataNascimento;
      document.getElementById("inputEditarEndereco").value = resultado.endereco;
      document.getElementById("inputEditarNome").value = resultado.nome;
      document.getElementById("inputEditarObservacoes").value =
        resultado.observacoes;
      document.getElementById("inputEditarPlano").value = resultado.plano;
      document.getElementById("inputEditarDiasSemana").value =
        resultado.qntDias;
      document.getElementById("inputEditarUnidade").value = resultado.unidade;
      if (resultado.socio == true) {
        document.getElementById("inputEditarSocio").checked = true;
      } else {
        document.getElementById("inputEditarNaoSocio").checked = true;
      }
      if (resultado.statusPag == true) {
        document.getElementById("inputEditarPago").checked = true;
      } else {
        document.getElementById("inputEditarPendente").checked = true;
      }
      if (resultado.status == true) {
        document.getElementById("inputEditarAtivo").checked = true;
      } else {
        document.getElementById("inputEditarInativo").checked = true;
      }

      if (resultado.email != null) {
        document.getElementById("inputEditarEmail").value = resultado.email;
        document.getElementById("inputEditarTelefone").value =
          resultado.telefone;
        document.getElementById("inputEditarRedeSocial").value =
          resultado.redeSocial;

        infoAlunosMaiores.style.display = "block";
      } else {
        infoAlunosMaiores.style.display = "none";
      }
      editarAlunosection.style.display = "flex";
      btnSalvarEdicao.addEventListener("click", editarAluno);
    })
    .catch((error) => {
      console.error("Ocorreu um erro durante a busca:", error);
    });
}

function editarAluno(event) {
  event.preventDefault();
  const id = btneditar.attributes["data-id"].value;
  let socio = true;
  let statusPag = true;
  let status = false;
  if (document.getElementById("inputEditarSocio").checked) {
    socio = true;
  } else {
    socio = false;
  }
  if (document.getElementById("inputEditarPago").checked) {
    statusPag = true;
  } else {
    statusPag = false;
  }
  if (document.getElementById("inputEditarAtivo").checked) {
    status = true;
  } else {
    status = false;
  }
  const getValue = (id) => {
    const element = document.getElementById(id).value;
    return element ? element : null;
  };

  const data = {
    nome: getValue("inputEditarNome"),
    email: getValue("inputEditarEmail"),
    telefone: getValue("inputEditarTelefone"),
    endereco: getValue("inputEditarEndereco"),
    cep: getValue("inputEditarCep"),
    unidade: getValue("inputEditarUnidade"),
    bairro: getValue("inputEditarBairro"),
    plano: getValue("inputEditarPlano"),
    qntDias: getValue("inputEditarDiasSemana"),
    dataNascimento: getValue("inputEditarDataNascimento"),
    status: status,
    redeSocial: getValue("inputEditarRedeSocial"),
    statusPag: statusPag,
    observacoes: getValue("inputEditarObservacoes"),
    socio: socio,
  };
  fetch(`https://vps50387.publiccloud.com.br:3333/alunos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((responseData) => {
      alert("Editado com sucesso!");
      const homesection = document.getElementById("home");
      homesection.style.display = "flex";
      editarAlunosection.style.display = "none";
      // setActiveTab("home");
    })
    .catch((error) => {
      console.error("Ocorreu um erro durante a busca:", error);
    });
}
