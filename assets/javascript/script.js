'use stric'

const getBanco =() => JSON.parse(localStorage.getItem('creatlist')) ?? []
const setBanco = (banco) => localStorage.setItem ('creatlist', JSON.stringify(banco)) 

const criarItem = (tarefa, status, indice) => {
    const item = document.createElement('label')
    item.classList.add('creat_list1')
    item.innerHTML= `
    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"${status} data-indice=${indice}>
    <div>${tarefa}</div>
    <input type="button" value = "X"data-indice=${indice} class="xzinho">
    `
    document.getElementById('creatlist').appendChild(item)
}

const limparList = () =>{
    const creatlist = document.getElementById('creatlist')
    while (creatlist.firstChild){
        creatlist.removeChild(creatlist.lastChild)
    }
}

const newTela = () => {
    limparList()
    const banco = getBanco ()
    banco.forEach((item, indice) => criarItem (item.tarefa , item.status, indice))
}

const addItem = (evento) => {
    const tecla = evento.key
    const texto = evento.target.value

    if(tecla === 'Enter'){
        const banco = getBanco ( )
        banco.push ({'tarefa': texto, 'status': ''})
        setBanco(banco)
        newTela()
        const limparTarefaNova = evento.target.value = ''
    }
}

const removerItem = (indice) =>{
    const banco = getBanco()
    banco.splice  /**/ (indice,1)
    setBanco(banco)
    newTela()
}

const atualizarItem = (indice) =>{
    const banco = getBanco()
    banco[indice].status = banco[indice].status === '' ?
    'checked': ''
    setBanco(banco)
    newTela()
}

const clickItem = (evento) => {
    const elemento = evento.target
    if (elemento.type === 'button'){
        const indice = elemento.dataset.indice
        removerItem(indice)
    }else if (elemento.type ==='checkbox'){
        const indice = elemento.dataset.indice
        atualizarItem(indice)
    }
    
}
document.getElementById('mewItem').addEventListener ('keypress', addItem)

document.getElementById('creatlist').addEventListener('click',clickItem)
newTela()