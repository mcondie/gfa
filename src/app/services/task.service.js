angular
.module('taskServiceModule', [])
.factory('taskService', TaskService);

TaskService.$inject = ['$http', 'baseUrl', '$log'];

function TaskService($http, baseUrl, $log) {
	return {
		getTasks: GetTasks
	};

	function GetTasks(){
		return $http.get(baseUrl + '/tasks').then(function(result){
			$log.debug(result);
			return result.data;
		});
	};
}

