import resetarTela from "./resetaTela.js";

const btnFechar = document.getElementById("fecharMenu");
const btnAbrir = document.getElementById("abrirMenu");
const background = document.getElementById("menu-background");
const alunodetail = document.getElementById("alunodetails");

const mobileButtons = {
  home: document.getElementById("btnhomeMobile"),
  buscaralunos: document.getElementById("btnbuscarAlunosMobile"),
  cadastraralunos: document.getElementById("btncadastrarAlunosMobile"),
  relatorios: document.getElementById("btnrelatoriosMobile"),
};

const desktopButtons = {
  home: document.getElementById("btnhomeDesktop"),
  buscaralunos: document.getElementById("btnbuscarAlunosDesktop"),
  cadastraralunos: document.getElementById("btncadastrarAlunosDesktop"),
  relatorios: document.getElementById("btnrelatoriosDesktop"),
};

const sections = {
  home: document.getElementById("home"),
  buscaralunos: document.getElementById("buscaralunos"),
  cadastraralunos: document.getElementById("cadastraralunos"),
  perfilaluno: document.getElementById("perfilaluno"),
  editaraluno: document.getElementById("editaralunos"),
  relatorios: document.getElementById("relatorios"),
};

btnAbrir.addEventListener("click", toggleMenu);
btnFechar.addEventListener("click", toggleMenu);

Object.entries(mobileButtons).forEach(([key, button]) => {
  button.addEventListener("click", () => handleButtonClick(key));
});

Object.entries(desktopButtons).forEach(([key, button]) => {
  button.addEventListener("click", () => handleButtonClick(key));
});

function toggleMenu() {
  resetarTela();
  background.style.display =
    background.style.display === "none" ? "flex" : "none";
}

export function handleButtonClick(key) {
  const { home, buscarAlunos, cadastrarAlunos } = mobileButtons;
  Object.values(mobileButtons).forEach((button) =>
    button.classList.remove("active")
  );
  Object.values(desktopButtons).forEach((button) =>
    button.classList.remove("active")
  );
  if (mobileButtons[key].id == "btnhomeMobile" || desktopButtons[key].id == "btnhomeDesktop") {
    alunodetail.open = false;
  }
  mobileButtons[key].classList.add("active");
  desktopButtons[key].classList.add("active");
  Object.values(sections).forEach(
    (section) => (section.style.display = "none")
  );
  background.style.display = "none";
  sections[key].style.display = "flex";
}
