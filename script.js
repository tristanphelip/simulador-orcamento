const WHATSAPP = "5511966497117";

const PRECO_PAGINA = 80;

const form = document.getElementById("form-orcamento");
const tipo = document.getElementById("tipo");
const paginas = document.getElementById("paginas");
const paginasValor = document.getElementById("paginas-valor");
const totalEl = document.getElementById("total");
const prazoEl = document.getElementById("prazo");
const btnWhats = document.getElementById("btn-whats");

const formatarReal = (valor) =>
  valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

function calcular() {
  const base = Number(tipo.value);
  const extrasPaginas = Number(paginas.value);

  const marcados = [...form.querySelectorAll("input[type=checkbox]:checked")];
  const nomesRecursos = marcados.map((c) => c.dataset.nome);
  const valorRecursos = marcados.reduce((soma, c) => soma + Number(c.value), 0);

  const total = base + extrasPaginas * PRECO_PAGINA + valorRecursos;
  const prazoDias = 3 + extrasPaginas + marcados.length * 2;

  paginasValor.textContent = extrasPaginas;
  totalEl.textContent = formatarReal(total);
  prazoEl.textContent = `Prazo estimado: ${prazoDias} dias úteis`;

  const tipoTexto = tipo.options[tipo.selectedIndex].text;
  const recursos = nomesRecursos.length ? nomesRecursos.join(", ") : "nenhum";

  const mensagem = `Olá! Fiz uma simulação e quero um orçamento.
Tipo: ${tipoTexto}
Páginas extras: ${extrasPaginas}
Recursos: ${recursos}
Estimativa: ${formatarReal(total)}`;

  btnWhats.href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(mensagem)}`;
}

form.addEventListener("input", calcular);
calcular();
