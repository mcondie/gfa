var assert = chai.assert,  
expect = chai.expect,
should = chai.should();

describe('TaskService.GetTasks', function(){
	var $httpBackend, taskService;
	var baseUrl = "http://someUrl.com";

	beforeEach(module('taskServiceModule'));

	beforeEach(module(function($provide){
		$provide.constant('baseUrl', baseUrl);
	}));

	beforeEach(inject(function($injector){
		$httpBackend = $injector.get('$httpBackend');

		getTasksHandler = $httpBackend.when('GET', baseUrl + '/tasks')
		.respond({data:[{name:'A Name'}]})
	}));

	beforeEach(inject(function(_taskService_){
		taskService = _taskService_;
	}));

	afterEach(function() {
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	});

	it('should call GET /tasks', function(){
		$httpBackend.expectGET(baseUrl + '/tasks');
		taskService.getTasks();
		$httpBackend.flush();
	});
});