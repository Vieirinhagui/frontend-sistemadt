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
    .then((response) => response.json())
    .then((responseData) => {
      if (responseData.token) {
        sessionStorage.setItem("token", responseData.token);
        window.location.href = "./paginaInicial.html";
      } else {
        alert("Login falhou. Verifique suas credenciais.");
      }
    })
    .catch((error) => {
      console.error("Ocorreu um erro durante o login:", error);
    });
}
