'use strict';
/*jshint esnext: true */

TasksController.$inject = ['tasks'];

function TasksController (tasks) {
    var ctrl = this;
    
    _.extend(ctrl, {
    	tasks: tasks
    });
}

function TasksConfig($stateProvider){
	$stateProvider.state({
	  name: "tasks",
      url: "/tasks",
      templateUrl: "/app/pages/tasks/tasks.html",
      controller: TasksController,
      controllerAs: "ctrl",
      resolve: {
      	tasks: function(taskService){
      		return taskService.getTasks();
      	}
      }
    });
}

angular.module('tasksModule', ['ui.router'])
  .controller("TasksController", TasksController)
  .config(TasksConfig)
;