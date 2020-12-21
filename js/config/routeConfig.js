angular.module("desafioTecnico").config(function($routeProvider){
    $routeProvider.when("/",{
        templateUrl: "pages/login/index.html",
        controller : "desafioTecnicoCtrl"
    });
    $routeProvider.when("/pages/usuario/",{
        templateUrl: "pages/usuario/index.html",
        controller : "usuarioCtrl"
    });
    $routeProvider.when("/pages/cliente/",{
        templateUrl: "pages/cliente/index.html",
        controller : "clienteCtrl"
    });
});