let banco = [];

getBD();

function getTabela(){
    $(document).ready(function () {
        $.ajax({
            url: "http://localhost:8989/Tabela",
            method: "GET"
        }).then(function (Tabela, status, info) {
            
            var tabela = "";
            var CBtabela = "";
            for (let index = 0; index < Tabela.length; index++) {
                tabela += linhaTabelaTabela(Tabela[index]);
                
            }

            for (let i = 0; i < banco.length; i++) {
                CBtabela += linhaDaCBtabela(banco[i]);
            }

            $('#mainTabelaTabela').html(tabela);
            $('#idBD').html(CBtabela);
        });
    });
}

function linhaDaCBtabela(B){
    return(
        '<option id="'+B.idBancoDeDados+'" value="'+B.nomeDoBanco+'">'+B.nomeDoBanco+'</option>'
    );
}

function postTabela(){
    $(document).ready(function () {
        var nomeTabela = document.getElementById('nomeTabela').value;
        var idBD = document.getElementById('idBD').value;

        for (let index = 0; index < banco.length; index++) {
            if(idBD == banco[index].nomeDoBanco){
                idBD = banco[index].idBancoDeDados;
                break;
            }
        }
        var data = {
            nomeDaTabela: nomeTabela,
            bancoDeDados: {
                idBancoDeDados: idBD
            }
        };
        console.log(data)
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "http://localhost:8989/Tabela",
            data: JSON.stringify(data),
            success: function (response) {
                console.log("Cadastro realizado com sucesso:", response);
                getTabela();
            },
            error: function (error) {
                console.error("Erro ao cadastrar usuário:", error);
        
            }
        });
    });

}

function deleteTabela(msg){
    $(document).ready(function(){
        $.ajax({
            url : "http://localhost:8989/Tabela/"+ msg,
            type : 'DELETE',
            data : {idTabela : msg},
            success: function (response) {
                console.log("Editado realizado com sucesso:", response);
                getTabela();
            },
            error: function (error) {
                console.error("Erro ao editar usuário:", error);
        
            }
        });    
    });
    //window.location.href = 'CadastraBanco.html';
}

function getBD(){
    $(document).ready(function () {
        $.ajax({
            url: "http://localhost:8989/BancoDeDados",
            method: "GET"
        }).then(function (BancoDeDados, status, info) {
            banco = BancoDeDados;
        });
    });
}