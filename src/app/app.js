'use strict';
/*jshint esnext: true */

function AppConfig ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
  }

angular.module('gfa', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ui.router', 'mm.foundation', 'homeModule', 'tasksModule', 'detailsModule'])
  .config(AppConfig)
;