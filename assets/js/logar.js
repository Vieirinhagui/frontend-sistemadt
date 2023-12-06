const btnentrar = document.getElementById("btnentrar");
const passwordField = document.getElementById("password");

passwordField.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    logar();
  }
});

btnentrar.addEventListener("click", logar);

function logar() {
  const username = document.getElementById("username").value;
  const password = passwordField.value;

  const data = {
    username: username,
    password: password,
  };

  fetch("https://vps50387.publiccloud.com.br:3333/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      // Verifica se a resposta é bem-sucedida
      console.log(response);
      if (!response.ok) {
        throw new Error("Falha na resposta da rede");
      }
      for (let [key, value] of response.headers.entries()) {
        console.log(key + ": " + value);
      }
      // Extrai o token do cabeçalho 'Authorization'
      const token = response.headers.get("Authorization");
      console.log(token);
      console.log(token.split(" ")[1]);
      // Verifica se o token existe
      // if (token) {
      //   // Armazena o token na sessionStorage
      //   sessionStorage.setItem("token", token.split(" ")[1]); // Assume que o formato é 'Bearer token'
      //   window.location.href = "./paginaInicial.html";
      // } else {
      //   alert("Login falhou. Token não encontrado no cabeçalho.");
      // }
    })
    .catch((error) => {
      // Trata erros de rede ou de processamento
      console.error("Ocorreu um erro durante o login:", error);
      alert("Erro ao realizar o login.");
    });
}
