angular.module("desafioTecnico").factory("usuarioFactoryService", function ($http,config) {
	
	let _salvarUsuario = function (usuario) {
		return $http.post(config.baseUrl + "/usuario", usuario);
	};	
	return {
		salvarUsuario: _salvarUsuario
	};
});