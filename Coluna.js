function getColuna(){
    $(document).ready(function () {
        $.ajax({
            url: "http://localhost:8989/Coluna",
            method: "GET"
        }).then(function (Coluna, status, info) {
            
            var coluna = "";
            var CBtabela = "";
            for (let index = 0; index < Coluna.length; index++) {
                //coluna += linhaTabelaColuna(Coluna[index]);
                
                if(Coluna[index].id){
                    Coluna[index].id = 'Sim';
                }else{
                    Coluna[index].id = 'Não';
                }

                if(Coluna[index].chaveEstrageira){
                    Coluna[index].chaveEstrageira = 'Sim';
                }else{
                    Coluna[index].chaveEstrageira = 'Não';
                }

                if(Coluna[index].nomeDaTabelaEstrageira == null){
                    Coluna[index].nomeDaTabelaEstrageira = '(Não se aplica)';
                }
                coluna += linhaTabelaColuna(Coluna[index]);
            }

            /*for (let i = 0; i < banco.length; i++) {
                CBtabela += linhaDaCBtabela(banco[i]);
            }*/

            $('#mainColuna').html(coluna);
            //$('#idBD').html(CBtabela);
        });
    });
}

function linhaTabelaColuna(col){
    return(
        '<tr><td>'+ col.nomeColuna +'</td>'+
        '<td>'+ col.tipoColuna +'</td>'+
        '<td>'+ col.id +'</td>'+
        '<td>'+ col.chaveEstrageira +'</td>'+
        '<td>'+ col.nomeDaTabelaEstrageira +'</td>'+
        '<td>'+ col.tabela.nomeDaTabela +'</td>'+
        '<td>'+ col.tabela.bancoDeDados.nomeDoBanco +'</td>'+
        '<td>'+ col.tabela.bancoDeDados.usuario.nomeUsuario +'</td>'+
        '<td><button id="btnEditar" class="btn-editar" type="button">Editar</button>'+
        '<button id="btnExcluir" class="btn-excluir" type="button" onclick="deleteTabela('+col.idColuna+')">Excluir</button></td></tr>'
    );
}