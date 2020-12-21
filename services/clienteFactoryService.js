angular.module("desafioTecnico").factory("clienteFactoryService", function ($http,config) {
	let _salvarCliente = function (cliente) {
		return $http.post(config.baseUrl + "/cliente", cliente);
	};
	let _adicionarTelefone = function (telefone) {
		return $http.post(config.baseUrl + "/cliente/add-telefone", telefone);
	};
	let _adicionarEndereco = function (endereco) {
		return $http.post(config.baseUrl + "/cliente/add-endereco", endereco);
	};
	
	let _atualizarCliente = function (cliente) {
		return $http.put(config.baseUrl + "/cliente", cliente);
	};

	let _excluirTelefone = function (telefoneId, clienteId) {
		return $http.delete(config.baseUrl + "/cliente/excluir-telefone/"+telefoneId+"/cliente/"+clienteId);
	};

	let _excluirEndereco = function (idsDeEndereco, clienteId) {
		return $http.delete(config.baseUrl + "/cliente/excluir-endereco/"+idsDeEndereco+"/cliente/"+clienteId);
	};

	let _excluirCliente = function (cliente) {
		return $http.delete(config.baseUrl + "/cliente/"+cliente.id);
	};
	
	let _obterClientes = function () {
		return $http.get(config.baseUrl + "/cliente");
	};	
	
	return {
		salvarCliente: _salvarCliente,
		obterClientes: _obterClientes,
		atualizarCliente: _atualizarCliente,
		adicionarTelefone: _adicionarTelefone,
		adicionarEndereco: _adicionarEndereco,
		excluirTelefone: _excluirTelefone,
		excluirCliente: _excluirCliente,
		excluirEndereco: _excluirEndereco
	};
});