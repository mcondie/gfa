'use strict';
/*jshint esnext: true */

function DetailsController () {
    
}

function DetailsConfig($stateProvider){
	$stateProvider.state({
	  name: "tasks.details",
      url: "/details",
      templateUrl: "/app/pages/tasks/details/details.html",
      controller: DetailsController,
      controllerAs: "ctrl"
    });
}

angular.module('detailsModule', ['ui.router'])
  .controller("DetailsController", DetailsController)
  .config(DetailsConfig)
;