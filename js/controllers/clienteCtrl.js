
angular.module("desafioTecnico").controller("clienteCtrl", function ($scope,clienteFactoryService){    
    $scope.clientes= [];
    $scope.telefones= [];
    $scope.enderecos= [];
    $scope.mensagemDeErro = ""

    $scope.alterarValorDoRadio = function(){
        $scope.enderecos = $scope.enderecos.filter(function(endereco){
            endereco.principal = "";
            return endereco;
        });      
    }
    
    $scope.salvarCliente = function(cliente,enderecos){       
        let objCliente = {
            nome: cliente.nome,
            cpf: cliente.cpf,
            endereco : enderecoPrincipal()[0], 
            telefones : $scope.telefones,
            enderecos: enderecos
        }

        if (cliente.id) {
            objCliente.id = cliente.id;
            clienteFactoryService.atualizarCliente(objCliente).then(successCallback, errorCallback);
        }else{
            clienteFactoryService.salvarCliente(objCliente).then(successCallback, errorCallback);
        }        

        function successCallback(response){
            
            $scope.mensagemDeErro=""
            $scope.telefones = [];
            $scope.enderecos = [];
            popularClientes();
        }

        function errorCallback(error){
            $scope.mensagemDeErro = error.data.message
        }
    }

    $scope.excluirCliente = function(cliente){  
        clienteFactoryService.excluirCliente(cliente).then(successCallback, errorCallback);
        function successCallback(response){ 
            $scope.cliente.id = response.data.id
            $scope.mensagemDeErro=""
            $scope.telefones = [];
            $scope.enderecos = [];
            popularClientes(); 
        } 
        function errorCallback(error){
            $scope.mensagemDeErro = error.data.message
            return;
        }
    }
    let enderecoPrincipal = function(){
        return $scope.enderecos.filter(function(endereco){
            if (endereco.principal =="principal"){
                return endereco;
            }            
        });  
    }

    $scope.adicionarEndereco = function(endereco,cliente){
        if(cliente.id){
            endereco.entidadeId = cliente.id;
            clienteFactoryService.adicionarEndereco(endereco).then(successCallback, errorCallback);
            function successCallback(response){ 
                $scope.enderecos.push(angular.copy(response.data));
                delete $scope.endereco;                 
            } 
            function errorCallback(error){
                $scope.mensagemDeErro = error.data.message
                return;
            }
        }else{
            $scope.enderecos.push(angular.copy(endereco));
            delete $scope.endereco;
            $scope.mensagemDeErro = ""
        }    
            
    }
    
    $scope.excluirEnderecos = function(enderecos,cliente){
        let idsDeEndereco = "";
        let enderecosAtualizado = enderecos.filter(function(endereco){
            if (!endereco.excluirCheckado){
                return endereco;
            }
        });
        
        enderecos.filter(function(endereco){
            if (endereco.excluirCheckado){                
                idsDeEndereco = idsDeEndereco == "" ? endereco.id : idsDeEndereco+","+endereco.id;
            }
        });
        
        if (cliente.id){     
            clienteFactoryService.excluirEndereco(idsDeEndereco,cliente.id).then(successCallback, errorCallback);       
            function successCallback(response){
                $scope.enderecos =  enderecosAtualizado;
                $scope.mensagemDeErro = "";
            }
            function errorCallback(error){
                $scope.mensagemDeErro = error.data.message           
                return false;
            }  
        }
    }
    
    $scope.adicionarTelefone = function(telefone,cliente){        
        if(permiteAdicionarTelefone(telefone) == false){
            $scope.mensagemDeErro = "Telefone já informado.";
            return;
        }
        if(cliente.id){
            telefone.entidadeId = cliente.id;
            clienteFactoryService.adicionarTelefone(telefone).then(successCallback, errorCallback);
        }  
        function successCallback(response){ $scope.mensagemDeErro ="" } 
        function errorCallback(error){
            $scope.mensagemDeErro = error.data.message
            return;
        }
        $scope.telefones.push(angular.copy(telefone));
        delete $scope.telefone;
        $scope.mensagemDeErro = ""
    }

    $scope.excluirTelefone = function(telefoneParaExcluir,cliente){
        if ((telefoneParaExcluir.id) && (cliente.id)){
            clienteFactoryService.excluirTelefone(telefoneParaExcluir.id,cliente.id).then(successCallback, errorCallback);
        }
        function successCallback(response){ $scope.mensagemDeErro = "";}
        function errorCallback(error){
            $scope.mensagemDeErro = error.data.message
            return;
        }
        $scope.telefones = $scope.telefones.filter(function(telefone){            
            if (permiteExcluirTelefone(telefone,telefoneParaExcluir) == false) { 
                return telefone 
            }
        });        
    }

    $scope.editar = function (cliente){
        $scope.cliente = cliente;
        $scope.telefones = cliente.telefones
        $scope.mensagemDeErro = "";
        $scope.enderecos = cliente.enderecos.filter(function(endereco){       
            if (endereco.id == cliente.endereco.id){
                endereco.principal = "principal";
            }  
            return endereco;          
        });
       
    };
    let permiteExcluirTelefone = function(telefone,telefoneParaExcluir){
       return telefonesSaoEquivalente(telefone,telefoneParaExcluir);
    }

    let permiteAdicionarTelefone = function(telefoneParaAdicionar){
        let permiteAdicionar = true;
        $scope.telefones.filter(function(telefone){            
            if ((permiteAdicionar == true) && (telefonesSaoEquivalente(telefone,telefoneParaAdicionar))){
                permiteAdicionar = false;
            }
        });
        return permiteAdicionar;
    };

    function telefonesSaoEquivalente(telefone,telefoneParaComparar){
        let ehEquivalente = false;
        ehEquivalente = telefone.dd == telefoneParaComparar.dd ? true : false;
        ehEquivalente = (ehEquivalente && (telefone.ddd == telefoneParaComparar.ddd)) ? true : false;
        return (ehEquivalente && (telefone.telefone == telefoneParaComparar.telefone)) ? true : false;
    };
    function popularClientes(){
        clienteFactoryService.obterClientes().then(successCallback, errorCallback);
        function successCallback(response){
            $scope.clientes = [];
            response.data.filter(function(cliente){ 
                $scope.clientes.push(angular.copy(cliente));
                delete $scope.cliente;                
            });
            $scope.mensagemDeErro = ""
        }
        function errorCallback(error){
            $scope.mensagemDeErro = error.data.message
        }
    };
    
    popularClientes();
});