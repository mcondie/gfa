'use strict';
/*jshint esnext: true */

function HomeController () {
    
}

function HomeConfig($stateProvider){
	$stateProvider.state({
	  name: "home",
      url: "/",
      templateUrl: "/app/pages/home/home.html",
      controller: HomeController,
      controllerAs: "ctrl"
    });
}

angular.module('homeModule', ['ui.router'])
  .controller("HomeController", HomeController)
  .config(HomeConfig)
;