const checkboxativo = document.getElementById("filterRelatorioativo");
const checkboxinativo = document.getElementById("filterRelatorioinativo");
const checkboxnome = document.getElementById("filterRelatorionome");
const checkboxtelefone = document.getElementById("filterRelatoriotelefone");
const checkboxemail = document.getElementById("filterRelatorioemail");
const checkboxendereco = document.getElementById("filterRelatorioendereco");
const checkboxcep = document.getElementById("filterRelatoriocep");
const checkboxunidade = document.getElementById("filterRelatoriounidade");
const checkboxplano = document.getElementById("filterRelatorioplano");
const checkboxsocio = document.getElementById("filterRelatoriosocio");
const checkboxbairro = document.getElementById("filterRelatoriobairro");
const checkboxqntDias = document.getElementById("filterRelatorioqntDias");
const checkboxstatus = document.getElementById("filterRelatoriostatus");
const checkboxredeSocial = document.getElementById("filterRelatorioredeSocial");
const checkboxobservacoes = document.getElementById(
  "filterRelatorioobservacoes"
);
const checkboxstatusPag = document.getElementById("filterRelatoriostatusPag");
const checkboxdataNascimento = document.getElementById(
  "filterRelatoriodataNascimento"
);

const btnGerarRelatorio = document.getElementById("btngerarrelatorio");
btnGerarRelatorio.addEventListener("click", gerarRelatorio);

async function gerarRelatorio() {
  const parametros = [];
  let ativo = true;

  if (checkboxativo.checked) {
    ativo = true;
  } else {
    ativo = false;
  }
  if (checkboxinativo.checked) {
    ativo = false;
  } else {
    ativo = true;
  }

  if (checkboxnome.checked) {
    parametros.push("nome");
  }

  if (checkboxtelefone.checked) {
    parametros.push("telefone");
  }

  if (checkboxemail.checked) {
    parametros.push("email");
  }

  if (checkboxendereco.checked) {
    parametros.push("endereco");
  }

  if (checkboxcep.checked) {
    parametros.push("cep");
  }

  if (checkboxunidade.checked) {
    parametros.push("unidade");
  }

  if (checkboxplano.checked) {
    parametros.push("plano");
  }

  if (checkboxsocio.checked) {
    parametros.push("socio");
  }

  if (checkboxbairro.checked) {
    parametros.push("bairro");
  }

  if (checkboxqntDias.checked) {
    parametros.push("qntDias");
  }

  if (checkboxstatus.checked) {
    parametros.push("status");
  }

  if (checkboxredeSocial.checked) {
    parametros.push("redeSocial");
  }

  if (checkboxobservacoes.checked) {
    parametros.push("observacoes");
  }

  if (checkboxstatusPag.checked) {
    parametros.push("statusPag");
  }

  if (checkboxdataNascimento.checked) {
    parametros.push("dataNascimento");
  }
  const queryString = `ativo=${ativo}&campos=${parametros.join(",")}`;

  const apiUrl = `https://vps50387.publiccloud.com.br:3333/relatorios?${queryString}`;

  await fetch(apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.blob())
    .then((pdfBlob) => {
      const fileURL = URL.createObjectURL(pdfBlob);

      window.open(fileURL, "_blank");
    })
    .catch((error) => {
      console.error("Ocorreu um erro durante a busca:", error);
    });
}
