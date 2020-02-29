function initPieGraph() {
  const graphs = document.querySelectorAll('.pie');
  graphs.forEach((graph) => {
    const percentage = parseFloat(graph.innerHTML) / 100;
    if(percentage <= 0.5) {
      graph.style.background = `linear-gradient(${percentage + 0.25}turn, transparent 50%,#37c 50%)`;
    } else {
      graph.style.background = `linear-gradient(${percentage + 0.25}turn, #3c7 50%, transparent 50%)`;
    }
  });
}
initPieGraph();