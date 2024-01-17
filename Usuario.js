let Usuario = [];
let UserAux = null;
function postUsuario(){
    $(document).ready(function () {

        var nomeUsuario = $("#nomeUsuario").val();
        var codigoUsuario = $("#codigoUsuario").val();
        var senhaUsuario = $("#senhaUsuario").val();
        console.log("Valor de codigoUsuario:", codigoUsuario);
        var data = {
            nomeUsuario: nomeUsuario,
            codigoUsuario: codigoUsuario,
            senhaUsuario: senhaUsuario
        };

        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "http://localhost:8989/Usuario",
            data: JSON.stringify(data),
            success: function (response) {
                console.log("Cadastro realizado com sucesso:", response);
                getUsuario();
            },
            error: function (error) {
                console.error("Erro ao cadastrar usuário:", error);
                
            }
        });

    });
}

function getUsuario(){
    $(document).ready(function () {
        $.ajax({
            url: "http://localhost:8989/Usuario",
            method: "GET"
        }).then(function (usuario, status, info) {
            Usuario = usuario;
            var tabela = "";

            for (let index = 0; index < usuario.length; index++) {
                tabela += linhaTabela(usuario[index]);
                
            }

            $('#mainTabelaUsuario').html(tabela);
        });
    });
}


function deleteUsuario(id){
    $(document).ready(function(){
        $.ajax({
            url : "http://localhost:8989/Usuario/"+ id,
            type : 'DELETE',
            data : {idUsuario : id},
            success: function (response) {
                console.log("Editado realizado com sucesso:", response);
                getUsuario();
            },
            error: function (error) {
                console.error("Erro ao editar usuário:", error);
        
            }
        });    
    });
}
var idUser;
function putUsuario(id){
    idUser = id;
    $(document).ready(function () {
        UserAux = Usuario.find(i => i.idUsuario == id);
        var data = {
            idUsuario: UserAux.idUsuario,
            nomeUsuario: UserAux.nomeUsuario,
            codigoUsuario: UserAux.codigoUsuario,
            senhaUsuario: UserAux.senhaUsuario
        };

        console.log(data)
        $.ajax({
            type: "PUT",
            contentType: "application/json",
            url: "http://localhost:8989/Usuario",
            data: JSON.stringify(data),
            success: function (response) {
                console.log("Cadastro realizado com sucesso:", response);
                getUsuario();
            },
            error: function (error) {
                console.error("Erro ao cadastrar usuário:", error);
                
            }
        });
    });

    console.log(BD);
    document.getElementById('nomeUsuario').value =  UserAux.nomeUsuario;
    document.getElementById('codigoUsuario').value = UserAux.codigoUsuario;
    document.getElementById('senhaUsuario').value = UserAux.senhaUsuario;
    openModal();
}

function salvarDadosUsuario(){
    if (UserAux == null) {
        $(document).ready(function () {

            var nomeUsuario = $("#nomeUsuario").val();
            var codigoUsuario = $("#codigoUsuario").val();
            var senhaUsuario = $("#senhaUsuario").val();
            console.log("Valor de codigoUsuario:", codigoUsuario);
            var data = {
                nomeUsuario: nomeUsuario,
                codigoUsuario: codigoUsuario,
                senhaUsuario: senhaUsuario
            };
    
            $.ajax({
                type: "POST",
                contentType: "application/json",
                url: "http://localhost:8989/Usuario",
                data: JSON.stringify(data),
                success: function (response) {
                    console.log("Cadastro realizado com sucesso:", response);
                    getUsuario();
                },
                error: function (error) {
                    console.error("Erro ao cadastrar usuário:", error);
                    
                }
            });
    
        });
    }else{
        idUser = id;
        $(document).ready(function () {
            UserAux = Usuario.find(i => i.idUsuario == id);
            var data = {
                idUsuario: UserAux.idUsuario,
                nomeUsuario: UserAux.nomeUsuario,
                codigoUsuario: UserAux.codigoUsuario,
                senhaUsuario: UserAux.senhaUsuario
            };
    
            console.log(data)
            $.ajax({
                type: "PUT",
                contentType: "application/json",
                url: "http://localhost:8989/Usuario",
                data: JSON.stringify(data),
                success: function (response) {
                    console.log("Cadastro realizado com sucesso:", response);
                    getUsuario();
                },
                error: function (error) {
                    console.error("Erro ao cadastrar usuário:", error);
                    
                }
            });
        });
    
        console.log(BD);
        document.getElementById('nomeUsuario').value =  UserAux.nomeUsuario;
        document.getElementById('codigoUsuario').value = UserAux.codigoUsuario;
        document.getElementById('senhaUsuario').value = UserAux.senhaUsuario;
        openModal();
    }
}


function linhaTabela(U){
    return(
        '<tr><td>' + U.nomeUsuario + '</td>'+
        '<td>' + U.codigoUsuario + '</td>'+
        '<td><button class="btn-editar" type="button" onclick="putUsuario('+ U.idUsuario +')">Editar</button><button class="btn-excluir" type="button" onclick="deleteUsuario(' + U.idUsuario + ')">Excluir</button></td></tr>'
    );
}