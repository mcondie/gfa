var assert = chai.assert,  
expect = chai.expect,
should = chai.should();

describe('TaskService.GetTasks', function(){
	var $httpBackend, taskService, $log;
	var baseUrl = "http://someUrl.com";

	beforeEach(module('taskServiceModule'));

	beforeEach(module(function($provide){
		$provide.constant('baseUrl', baseUrl);
	}));

	beforeEach(inject(function($injector){
		$httpBackend = $injector.get('$httpBackend');
		$log = $injector.get('$log');

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
		taskService.getTasks().then(function(result){
			expect(result.data.length).to.equal(1);
			expect(result.data[0].name).to.equal('A Name');
		});
		$httpBackend.flush();
		expect($log.debug.logs.length).to.equal(1);
	});
});