'use strict';
/*jshint esnext: true */

function TasksController () {
    
}

function TasksConfig($stateProvider){
	$stateProvider.state({
	  name: "tasks",
      url: "/tasks",
      templateUrl: "/app/pages/tasks/tasks.html",
      controller: TasksController,
      controllerAs: "ctrl"
    });
}

angular.module('tasksModule', ['ui.router'])
  .controller("TasksController", TasksController)
  .config(TasksConfig)
;