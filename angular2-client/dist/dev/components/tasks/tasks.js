if (typeof __decorate !== "function") __decorate = function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
if (typeof __metadata !== "function") __metadata = function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var angular2_1 = require('angular2/angular2');
var AuthenticationService_1 = require('../../services/AuthenticationService');
var task_1 = require('components/tasks/task');
var TaskService_1 = require('../../services/TaskService');
var EventManager_1 = require("utils/eventbus/EventManager");
var forms_1 = require('angular2/forms');
var Tasks = (function () {
    function Tasks(authenticationService, taskService) {
        var _this = this;
        this.authenticationService = authenticationService;
        this.taskService = taskService;
        this.task = new task_1.Task();
        this.eventManager = EventManager_1.EventManager.getInstance();
        console.log("tasks.ts constructor");
        if (this.authenticationService.isLoggedIn()) {
            this.taskService.getTasks().then(function (obj) {
                _this.tasks = obj.actionResult;
                console.log("finished getting tasks: " + _this.tasks.length);
                _this.nrOfTasks = _this.tasks.length;
            }).catch(function (error) {
                _this.eventManager.publish("tasksResult", [false, error.message]);
            });
        }
        else {
            this.eventManager.publish("authenticationStateChange", [false, "You are not authenticated, please log in."]);
        }
    }
    Tasks.prototype.saveTask = function (event) {
        var _this = this;
        event.preventDefault();
        if (this.task && (this.task._id == null || this.task._id == undefined)) {
            var newTask = this.task;
            this.taskService.addTask(newTask).then(function (obj) {
                console.dir(obj);
                newTask.setId(obj.actionResult._id);
                console.log("before push: " + _this.tasks.length);
                _this.nrOfTasks = _this.tasks.push(newTask);
                _this.eventManager.publish("tasksResult", [true, "Added task '" + newTask.getId() + "'"]);
                _this.task = new task_1.Task();
            }).catch(function (error) {
                _this.eventManager.publish("tasksResult", [false, error.message]);
            });
        }
        else {
            this.taskService.updateTask(this.task).then(function (obj) {
                _this.eventManager.publish("tasksResult", [true, "Updated task '" + _this.task._id + "'"]);
                _this.task = new task_1.Task();
            }).catch(function (error) {
                _this.eventManager.publish("tasksResult", [false, error.message]);
            });
        }
    };
    Tasks.prototype.loadTask = function (event, task) {
        event.preventDefault();
        console.log("load task " + task._id);
        this.task = task;
    };
    Tasks.prototype.clearTask = function (event) {
        event.preventDefault();
        this.task = new task_1.Task();
    };
    Tasks = __decorate([
        angular2_1.Component({
            selector: 'component-2',
            viewInjector: [AuthenticationService_1.AuthenticationService, TaskService_1.TaskServiceImpl]
        }),
        angular2_1.View({
            templateUrl: './components/tasks/tasks.html?v=0.7.0',
            directives: [angular2_1.NgFor, angular2_1.NgIf, forms_1.formDirectives]
        }), 
        __metadata('design:paramtypes', [AuthenticationService_1.AuthenticationService, TaskService_1.TaskServiceImpl])
    ], Tasks);
    return Tasks;
})();
exports.Tasks = Tasks;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvdGFza3MvdGFza3MudHMiXSwibmFtZXMiOlsiVGFza3MiLCJUYXNrcy5jb25zdHJ1Y3RvciIsIlRhc2tzLnNhdmVUYXNrIiwiVGFza3MubG9hZFRhc2siLCJUYXNrcy5jbGVhclRhc2siXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEseUJBQTJDLG1CQUFtQixDQUFDLENBQUE7QUFFL0Qsc0NBQW9DLHNDQUFzQyxDQUFDLENBQUE7QUFDM0UscUJBQW1CLHVCQUF1QixDQUFDLENBQUE7QUFDM0MsNEJBQThCLDRCQUE0QixDQUFDLENBQUE7QUFDM0QsNkJBQTJCLDZCQUE2QixDQUFDLENBQUE7QUFFekQsc0JBQTZCLGdCQUFnQixDQUFDLENBQUE7QUFFOUM7SUFjSUEsZUFBbUJBLHFCQUE0Q0EsRUFBU0EsV0FBNEJBO1FBZHhHQyxpQkFnRUNBO1FBbERzQkEsMEJBQXFCQSxHQUFyQkEscUJBQXFCQSxDQUF1QkE7UUFBU0EsZ0JBQVdBLEdBQVhBLFdBQVdBLENBQWlCQTtRQUp2R0EsU0FBSUEsR0FBU0EsSUFBSUEsV0FBSUEsRUFBRUEsQ0FBQ0E7UUFFYkEsaUJBQVlBLEdBQWlCQSwyQkFBWUEsQ0FBQ0EsV0FBV0EsRUFBRUEsQ0FBQ0E7UUFHNURBLE9BQU9BLENBQUNBLEdBQUdBLENBQUNBLHNCQUFzQkEsQ0FBQ0EsQ0FBQ0E7UUFFcENBLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLHFCQUFxQkEsQ0FBQ0EsVUFBVUEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDMUNBLElBQUlBLENBQUNBLFdBQVdBLENBQUNBLFFBQVFBLEVBQUVBLENBQUNBLElBQUlBLENBQUNBLFVBQUNBLEdBQUdBO2dCQUNqQ0EsS0FBSUEsQ0FBQ0EsS0FBS0EsR0FBR0EsR0FBR0EsQ0FBQ0EsWUFBWUEsQ0FBQ0E7Z0JBQzlCQSxPQUFPQSxDQUFDQSxHQUFHQSxDQUFDQSwwQkFBMEJBLEdBQUdBLEtBQUlBLENBQUNBLEtBQUtBLENBQUNBLE1BQU1B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cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBWaWV3LCBOZ0ZvciwgTmdJZn0gZnJvbSAnYW5ndWxhcjIvYW5ndWxhcjInO1xuXG5pbXBvcnQge0F1dGhlbnRpY2F0aW9uU2VydmljZX0gZnJvbSAnLi4vLi4vc2VydmljZXMvQXV0aGVudGljYXRpb25TZXJ2aWNlJztcbmltcG9ydCB7VGFza30gZnJvbSAnY29tcG9uZW50cy90YXNrcy90YXNrJztcbmltcG9ydCB7VGFza1NlcnZpY2VJbXBsfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9UYXNrU2VydmljZSc7XG5pbXBvcnQge0V2ZW50TWFuYWdlcn0gZnJvbSBcInV0aWxzL2V2ZW50YnVzL0V2ZW50TWFuYWdlclwiO1xuXG5pbXBvcnQge2Zvcm1EaXJlY3RpdmVzfSBmcm9tICdhbmd1bGFyMi9mb3Jtcyc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnY29tcG9uZW50LTInLFxuICAgIHZpZXdJbmplY3RvcjogW0F1dGhlbnRpY2F0aW9uU2VydmljZSwgVGFza1NlcnZpY2VJbXBsXVxufSlcbkBWaWV3KHtcbiAgICB0ZW1wbGF0ZVVybDogJy4vY29tcG9uZW50cy90YXNrcy90YXNrcy5odG1sP3Y9PCU9IFZFUlNJT04gJT4nLFxuICAgIGRpcmVjdGl2ZXM6IFtOZ0ZvciwgTmdJZiwgZm9ybURpcmVjdGl2ZXNdXG59KVxuZXhwb3J0IGNsYXNzIFRhc2tzIHtcbiAgICB0YXNrczogQXJyYXk8VGFzaz47XG5cdHRhc2s6IFRhc2sgPSBuZXcgVGFzaygpO1xuXHRuck9mVGFza3M6IG51bWJlcjtcbiAgICBwcml2YXRlIGV2ZW50TWFuYWdlcjogRXZlbnRNYW5hZ2VyID0gRXZlbnRNYW5hZ2VyLmdldEluc3RhbmNlKCk7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgYXV0aGVudGljYXRpb25TZXJ2aWNlOiBBdXRoZW50aWNhdGlvblNlcnZpY2UsIHB1YmxpYyB0YXNrU2VydmljZTogVGFza1NlcnZpY2VJbXBsKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwidGFza3MudHMgY29uc3RydWN0b3JcIik7XG5cbiAgICAgICAgaWYgKHRoaXMuYXV0aGVudGljYXRpb25TZXJ2aWNlLmlzTG9nZ2VkSW4oKSkge1xuICAgICAgICAgICAgdGhpcy50YXNrU2VydmljZS5nZXRUYXNrcygpLnRoZW4oKG9iaikgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMudGFza3MgPSBvYmouYWN0aW9uUmVzdWx0O1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZmluaXNoZWQgZ2V0dGluZyB0YXNrczogXCIgKyB0aGlzLnRhc2tzLmxlbmd0aCk7XG5cdCAgICAgICAgICAgIHRoaXMubnJPZlRhc2tzID0gdGhpcy50YXNrcy5sZW5ndGg7XG4gICAgICAgICAgICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcblx0ICAgICAgICAgICAgdGhpcy5ldmVudE1hbmFnZXIucHVibGlzaChcInRhc2tzUmVzdWx0XCIsIFtmYWxzZSwgZXJyb3IubWVzc2FnZV0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgdGhpcy5ldmVudE1hbmFnZXIucHVibGlzaChcImF1dGhlbnRpY2F0aW9uU3RhdGVDaGFuZ2VcIiwgW2ZhbHNlLCBcIllvdSBhcmUgbm90IGF1dGhlbnRpY2F0ZWQsIHBsZWFzZSBsb2cgaW4uXCJdKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNhdmVUYXNrKGV2ZW50OiBhbnkpOiB2b2lkIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTsgLy8gcHJldmVudCBuYXRpdmUgcGFnZSByZWZyZXNoXG4gICAgICAgIGlmICh0aGlzLnRhc2sgJiYgKHRoaXMudGFzay5faWQgPT0gbnVsbCB8fCB0aGlzLnRhc2suX2lkID09IHVuZGVmaW5lZCkpIHtcblx0ICAgICAgICBsZXQgbmV3VGFzayA9IHRoaXMudGFzaztcblx0ICAgICAgICB0aGlzLnRhc2tTZXJ2aWNlLmFkZFRhc2sobmV3VGFzaykudGhlbigob2JqKSA9PiB7XG5cdFx0ICAgICAgICBjb25zb2xlLmRpcihvYmopO1xuXHRcdCAgICAgICAgbmV3VGFzay5zZXRJZChvYmouYWN0aW9uUmVzdWx0Ll9pZCk7XG5cdFx0ICAgICAgICBjb25zb2xlLmxvZyhcImJlZm9yZSBwdXNoOiBcIiArIHRoaXMudGFza3MubGVuZ3RoKTtcblx0XHQgICAgICAgIHRoaXMubnJPZlRhc2tzID0gdGhpcy50YXNrcy5wdXNoKG5ld1Rhc2spO1xuXHRcdCAgICAgICAgdGhpcy5ldmVudE1hbmFnZXIucHVibGlzaChcInRhc2tzUmVzdWx0XCIsIFt0cnVlLCBcIkFkZGVkIHRhc2sgJ1wiICsgbmV3VGFzay5nZXRJZCgpICsgXCInXCJdKTtcblx0XHQgICAgICAgIHRoaXMudGFzayA9IG5ldyBUYXNrKCk7XG5cdCAgICAgICAgfSkuY2F0Y2goKGVycm9yKSA9PiB7XG5cdFx0ICAgICAgICB0aGlzLmV2ZW50TWFuYWdlci5wdWJsaXNoKFwidGFza3NSZXN1bHRcIiwgW2ZhbHNlLCBlcnJvci5tZXNzYWdlXSk7XG5cdCAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgdGhpcy50YXNrU2VydmljZS51cGRhdGVUYXNrKHRoaXMudGFzaykudGhlbigob2JqKSA9PiB7XG5cdFx0ICAgICAgICB0aGlzLmV2ZW50TWFuYWdlci5wdWJsaXNoKFwidGFza3NSZXN1bHRcIiwgW3RydWUsIFwiVXBkYXRlZCB0YXNrICdcIiArIHRoaXMudGFzay5faWQgKyBcIidcIl0pO1xuXHRcdCAgICAgICAgdGhpcy50YXNrID0gbmV3IFRhc2soKTtcblx0ICAgICAgICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcblx0XHQgICAgICAgIHRoaXMuZXZlbnRNYW5hZ2VyLnB1Ymxpc2goXCJ0YXNrc1Jlc3VsdFwiLCBbZmFsc2UsIGVycm9yLm1lc3NhZ2VdKTtcblx0ICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuXHRsb2FkVGFzayhldmVudDogYW55LCB0YXNrOiBUYXNrKTogdm9pZCB7XG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTsgLy8gcHJldmVudCBuYXRpdmUgcGFnZSByZWZyZXNoXG5cdFx0Y29uc29sZS5sb2coXCJsb2FkIHRhc2sgXCIgKyB0YXNrLl9pZCk7XG5cdFx0dGhpcy50YXNrID0gdGFzaztcblx0fVxuXG5cdGNsZWFyVGFzayhldmVudDogYW55KTogdm9pZCB7XG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTsgLy8gcHJldmVudCBuYXRpdmUgcGFnZSByZWZyZXNoXG5cdFx0dGhpcy50YXNrID0gbmV3IFRhc2soKTtcblx0fVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9