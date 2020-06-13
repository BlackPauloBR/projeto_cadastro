let globalnames = ['Um', 'Dois', 'Três', 'Quatro'];
let inputName = null;
let acessoDiv = null;
let global_ul = null;
let global_editando = false;
let global_index = null;

window.addEventListener('load', () => {
  console.log('Pagina Carregada.');
  inputName = document.querySelector('#campo_nome');
  acessoDiv = document.querySelector('#nomes');
  preventFormSubmit();
  render(globalnames.length);
  inputName.addEventListener('keyup', escutarTeclas);
  focusinputName();
});

function preventFormSubmit() {
  function handleSubmit(event) {
    event.preventDefault();
  }

  let form = document.querySelector('.formulario');
  form.addEventListener('submit', handleSubmit);
}

function focusinputName() {
  inputName.focus();
}
function cleanInput() {
  inputName.value = '';
  inputName.focus();
}

function escutarTeclas(event) {
  let bloquearEspaçovazio =
    !!event.target.value && event.target.value.trim() !== '';
  if (!bloquearEspaçovazio) {
    cleanInput();
    return;
  }
  if (event.key === 'Enter') {
    if (global_editando) {
      globalnames[global_index] = event.target.value;
    } else {
      globalnames = [...globalnames, event.target.value];
    }
    global_editando = false;
    render(globalnames.length);
    cleanInput();
  }
}

function render(index) {
  function criando_li() {
    let li = document.createElement('li');
    global_ul.appendChild(li);
    criandoButtondDelete(li, globalnames.length);
    criandoSpan(li, globalnames.length);
  }

  function criandoButtondDelete(li, i) {
    function deleteName() {
      let indice = i - 1; // i-1 pois i é o length do array global, pois começa em [0]

      //globalnames.splice(indice, 1);   porque não splice? Porque essa função mesmo que fique mais elegante, ela é mutavel, enquato filter é imutavel.(se houver uma situação que tiver codigo concorrente executado ao mesmo tempo, splice entra e altera sem respeitar a ordem do momento, causando bugs)
      globalnames = globalnames.filter((_, b) => indice !== b);
      render();
    }
    let button = document.createElement('button');
    button.classList.add('deleteButton');
    button.textContent = 'X';
    li.appendChild(button);
    button.addEventListener('click', deleteName);
  }

  function criandoSpan(li, i) {
    function editandoItem() {
      inputName.value = globalnames[indice];
      inputName.focus();
      global_editando = true;
      global_index = indice;
    }
    let span = document.createElement('span');
    let indice = i - 1; // i-1 pois i é o length do array global, pois começa em [0]
    li.appendChild(span);
    span.classList.add('clickable');
    span.textContent = globalnames[indice];
    span.addEventListener('click', editandoItem);
  }
  function pre_render() {
    if (global_ul === null || globalnames.length > 0) {
      global_ul = document.createElement('ul');
      acessoDiv.appendChild(global_ul);
      for (let i = 1; i <= globalnames.length; i++) {
        let pre_li = document.createElement('li');
        global_ul.appendChild(pre_li);
        //console.log(i);
        criandoButtondDelete(pre_li, i);
        criandoSpan(pre_li, i);
      }
      return true;
    }
    return false;
  }
  acessoDiv.innerHTML = '';
  //console.log(index + ' criando_li');
  if (pre_render() === false && index > 0) {
    criando_li(index);
  }
}
