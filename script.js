let tarefas = [];
let filtroAtual = "todas";

// Adicionar tarefa
function adicionarTarefa() {
  let input = document.getElementById("inputTarefa");
  let texto = input.value.trim();

  if (texto === "") return;

  tarefas.push({
    texto: texto,
    concluida: false
  });

  salvarTarefas(); // 👈 adiciona aqui

  input.value = "";
  atualizarLista();
}

// Atualizar lista na tela
function atualizarLista() {
  let lista = document.getElementById("listaTarefas");
  lista.innerHTML = "";

  let tarefasFiltradas = tarefas.filter(tarefa => {
    if (filtroAtual === "pendentes") return !tarefa.concluida;
    if (filtroAtual === "concluidas") return tarefa.concluida;
    return true;
  });

  tarefasFiltradas.forEach((tarefa, index) => {
    let li = document.createElement("li");

    li.innerHTML = `
      <span style="${tarefa.concluida ? 'text-decoration: line-through;' : ''}">
        ${tarefa.texto}
      </span>

      <div>
        <button class="concluir" onclick="toggle(${index})">✔</button>
        <button class="excluir" onclick="remover(${index})">✖</button>
      </div>
    `;

    lista.appendChild(li);
  });

  atualizarContador();
}

// Marcar como concluída
function toggle(index) {
  tarefas[index].concluida = !tarefas[index].concluida;
  atualizarLista();
  salvarTarefas();
}

// Remover tarefa
function remover(index) {
  tarefas.splice(index, 1);
  atualizarLista();
  salvarTarefas(); // 👈 aqui
}

// Filtros
function filtrar(tipo) {
  filtroAtual = tipo;
  atualizarLista();
}

// Contador
function atualizarContador() {
  let contador = document.getElementById("contador");
  let total = tarefas.length;
  let concluidas = tarefas.filter(t => t.concluida).length;

  contador.innerText = `Total: ${total} | Concluídas: ${concluidas}`;
}

// Salvar no navegador
function salvarTarefas() {
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

// Carregar tarefas salvas
function carregarTarefas() {
  let dados = localStorage.getItem("tarefas");

  if (dados) {
    tarefas = JSON.parse(dados);
  }
}

// Inicializar o aplicativo
carregarTarefas();
atualizarLista();