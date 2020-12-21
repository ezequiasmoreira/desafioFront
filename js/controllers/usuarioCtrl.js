
angular.module("desafioTecnico").controller("usuarioCtrl", function ($scope,$window,usuarioFactoryService){
    $scope.cadastrarUsuario = function(usuario){

        $scope.mensagemDeErro = ""
        
        usuarioFactoryService.salvarUsuario(usuario).then(successCallback, errorCallback);  

        function successCallback(response){
            $scope.usuario.nome = "";
            $scope.usuario.email = "";
            $scope.usuario.senha = "";
            $window.location.href = '../../index.html';
        }

        function errorCallback(error){
            $scope.mensagemDeErro = error.data.message
        }
    }
});