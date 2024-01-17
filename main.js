function abrirCadastroBD(){
    window.location.href = 'CadastraBanco.html';
}

function abrirCadastoTabela(){
    window.location.href = 'CadastraTabela.html';
}

function abrirCadastroUsuario(){
    window.location.href = 'CadastroUsuario.html';
}

function abrirCadastroColuna(){
    window.location.href = 'CadastraColuna.html';
}

let BD = [];
let auxBD = null;

let US = [];

getUser();

function getBancoDeDados(){
    getUser();
    $(document).ready(function () {
        $.ajax({
            url: "http://localhost:8989/BancoDeDados",
            method: "GET"
        }).then(function (BancoDeDados, status, info) {
            BD = BancoDeDados;
            var tabela = "";
            var CB = "";

            for (let index = 0; index < BancoDeDados.length; index++) {
                tabela += linhaTabela(BancoDeDados[index]);
            }

            
            for (let i = 0; i < US.length; i++) {
                CB += linhaDaCB(US[i]);
            }
            console.log(US);
            $('#mainTabela').html(tabela);
            $('#UsuarioBD').html(CB);
        });
    });
}

function getUser(){
    $(document).ready(function () {
        $.ajax({
            url: "http://localhost:8989/Usuario",
            method: "GET"
        }).then(function (usuario, status, info) {
            US = usuario;
        });
    });
}

let idDoBanco;
function editarBD(id){
    idDoBanco = id;
    $(document).ready(function () {
        auxBD = BD.find(i => i.idBancoDeDados == id);
        var data = {
            idBancoDeDados : auxBD.idBancoDeDados,
            nomeDoBanco: auxBD.nomeDoBanco,
            tipoDoBanco: auxBD.tipoDoBanco,
            usuario: {
                idUsuario: auxBD.usuario.idUsuario
            }
        };

        console.log(data)
        $.ajax({
            type: "PUT",
            contentType: "application/json",
            url: "http://localhost:8989/BancoDeDados",
            data: JSON.stringify(data),
            success: function (response) {
                console.log("Cadastro realizado com sucesso:", response);
            },
            error: function (error) {
                console.error("Erro ao cadastrar usuário:", error);
            
            }
        });
    });

    console.log(BD);
    document.getElementById('nomeBD').value = auxBD.nomeDoBanco;
    document.getElementById('tipoBD').value = auxBD.tipoDoBanco;
    document.getElementById('UsuarioBD').value = auxBD.usuario.nomeUsuario;
    openModal();

}



function salvarDados(){

    if(auxBD == null){
            $(document).ready(function () {
            var nomeBancoDeDados = document.getElementById('nomeBD').value;
            var tipoBD = document.getElementById('tipoBD').value;
            var idUsuario = document.getElementById('UsuarioBD').value;

            for (let index = 0; index < US.length; index++) {
                if(idUsuario == US[index].nomeUsuario){
                    idUsuario = US[index].idUsuario;
                    break;
                }
            }

            console.log(idUsuario);
            console.log("Valor de tipoBD:", tipoBD);
            var data = {
                nomeDoBanco: nomeBancoDeDados,
                tipoDoBanco: tipoBD,
                usuario: {
                    idUsuario: idUsuario
                }
            };
            console.log(data)
            $.ajax({
                type: "POST",
                contentType: "application/json",
                url: "http://localhost:8989/BancoDeDados",
                data: JSON.stringify(data),
                success: function (response) {
                    console.log("Cadastro realizado com sucesso:", response);
                    getBancoDeDados();
                },
                error: function (error) {
                    console.error("Erro ao cadastrar usuário:", error);
            
                }
            });
        });
    
    }else{
        $(document).ready(function () {
            auxBD = BD.find(i => i.idBancoDeDados == idDoBanco);
            var nomeBancoDeDados = document.getElementById('nomeBD').value;
            var tipoBD = document.getElementById('tipoBD').value;
            var idUsuario = document.getElementById('UsuarioBD').value;

            for (let index = 0; index < US.length; index++) {
                if(idUsuario == US[index].nomeUsuario){
                    idUsuario = US[index].idUsuario;
                    break;
                }
            }
            var data = {
                idBancoDeDados : auxBD.idBancoDeDados,
                nomeDoBanco: nomeBancoDeDados,
                tipoDoBanco: tipoBD,
                usuario: {
                    idUsuario: idUsuario
                }
            };
    
            console.log(data)
            $.ajax({
                type: "PUT",
                contentType: "application/json",
                url: "http://localhost:8989/BancoDeDados",
                data: JSON.stringify(data),
                success: function (response) {
                    console.log("Editado realizado com sucesso:", response);
                    getBancoDeDados();
                },
                error: function (error) {
                    console.error("Erro ao editar usuário:", error);
                
                }
            });
        });
    }
    

}

function buscarPorNomeBd(){
    var nomeDaPesquisa = document.getElementById('pesquisaBD').value;
    $(document).ready(function () {
        $.ajax({
            url: "http://localhost:8989/BancoDeDados/BuscarPorNome?nomeDoBanco="+nomeDaPesquisa,
            method: "GET"
        }).then(function (BancoDeDados, status, info) {
            
            var tabela = "";

            for (let index = 0; index < BancoDeDados.length; index++) {
                tabela += linhaTabela(BancoDeDados[index]);
                
            }
            $('#mainTabela').html(tabela);
        });
    });
}
