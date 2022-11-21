//---------------------------------------------------------------//

var botaoAdicionar = document.querySelector("#adicionar-paciente");
botaoAdicionar.addEventListener("click", function (event){
    event.preventDefault();
   
    var form = document.querySelector("#form-adiciona");

// EXTRAINDO INFORMAÇOES DO PACIENTE DO FORM 

    var paciente = obtemPacienteForm(form);

// CRIA A TR E A TD DO PACIENTE

    var erros = validaPaciente(paciente);
    
    if(erros.length > 0){
        exibeMensagemErro(erros);
        return;
    }

// ADICIONANDO PACIENTE NA TABLE 

    adicionaPacienteNaTabela(paciente);

    form.reset();
    var mensagensErro = document.querySelector("#mensagens-erro");
    mensagensErro.innerHTML = "";
});

function adicionaPacienteNaTabela(paciente){
    var pacienteTr = montaTr(paciente);
    var tabela = document.querySelector("#tabela-pacientes");
    tabela.appendChild(pacienteTr);
}


function exibeMensagemErro(erros){
    var ul = document.querySelector("#mensagens-erro");

    ul.innerHTML = "";

    erros.forEach(function(erro){
        var li = document.createElement("li");
        li.textContent = erro;
        ul.appendChild(li);
    });
}

function obtemPacienteForm(form){

    var paciente = {
        nome: form.nome.value,
        peso: form.peso.value,
        altura: form.altura.value,
        gordura: form.gordura.value,
        imc: calculaImc(form.peso.value, form.altura.value)
    }
    
    return paciente;
}

function montaTr(paciente){
    var pacienteTr = document.createElement("tr");
    pacienteTr.classList.add("paciente");
    
    var nomeTd = montarTd(paciente.nome, "info-nome");
    var pesoTd = montarTd(paciente.peso, "info-peso");
    var alturaTd = montarTd(paciente.altura, "info-altura");
    var gorduraTd = montarTd(paciente.gordura, "info-gordura");
    var imcTd = montarTd(paciente.imc, "info-imc");

    pacienteTr.appendChild(nomeTd);
    pacienteTr.appendChild(pesoTd);
    pacienteTr.appendChild(alturaTd);
    pacienteTr.appendChild(gorduraTd);
    pacienteTr.appendChild(imcTd);

    return pacienteTr;
}

function montarTd(dado, classe){
    var td = document.createElement("td");
    td.textContent = dado;
    td.classList.add(classe);
    
    return td;
}

function validaPaciente(paciente){

    var erros = [];

    if(paciente.nome.length == 0){
        erros.push("Campo Inválido!");
    }

    if(!validaPeso(paciente.peso)){
         erros.push("Peso é Inválido!");
    }
    
    if(!validaAltura(paciente.altura)){
        erros.push("Altura é Inválida!");
    }

    if(paciente.gordura.length == 0){
        erros.push("Campo Inválido!");
    }

    if(paciente.peso.length == 0){
        erros.push("Campo Inválido!");
    }

    if(paciente.altura.length == 0){
        erros.push("Campo Inválido!");
    }
    return erros;
}