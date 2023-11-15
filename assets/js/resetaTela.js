export default function resetarTela(){
    const perfilAluno = document.getElementById("perfilaluno");
    const editaraluno = document.getElementById("editaralunos");

    perfilAluno.style.display = "none";
    editaraluno.style.display = "none";

    document.getElementById("inputfilternome").value = "";
    
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