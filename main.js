
const lista_inputs = document.querySelectorAll('.number-base')
var msgErro = document.querySelector('.mensage-error')

//Objeto que armazena o id do elemento, o valor da base, a tecla digitada e o valor do input.
var target = {
    id:'',
    base: '',
    digito: '',
    value: '',
}
/*
   Chama a função de criar_objeto_target, verifica se o digito é válido e 
   converte o valor nas outras bases.  
*/
lista_inputs.forEach((input)=>{
    input.addEventListener('keyup',(e)=>{
        criar_objeto_target(input,e.key)
        msgErro.style.opacity = 0

        if(!(target.regex())){ 
            msgErro.style.opacity = 1
            input.value = input.value.slice(0, -1)
        }else{
            conversor_base()
        }
    })
})
/*
    Cria objeto target usando como parametro input ativado e o digito
 */
function criar_objeto_target(input,digito){
    let inputDados = [input.id,input.dataset.numeracao,digito,input.value]
    Object.keys(target).map((i,j)=>{
        target[i] = inputDados[j]
    })

    /*metodo que verifica se o digito é válido 
    */ 
    target['regex'] = function (){
        let regex = (this.base == '2') ? /[^2-9]+/ : (this.base == '8')? /[^8-9]+/ : (this.base == '16')? /[^G-Zg-z\W\_]+/ : /[^D]+/
        return regex.test(this.digito)
    }
}
/*
    Converte o valor digitado na base em que cada input suporta, utilizando como referencia o objeto target.
*/
function conversor_base(){
    lista_inputs.forEach((input)=>{
        if(!(input.id.includes(target.id))){
            if(target.value){
                input.value = parseInt(target.value,target.base).toString(input.dataset.numeracao).toUpperCase()
            }else{
                input.value = ""
            }
        }
    })
}
