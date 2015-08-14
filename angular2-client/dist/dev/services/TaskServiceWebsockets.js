var TaskServiceWebsockets = (function () {
    function TaskServiceWebsockets() {
        this.connection = new WebSocket("ws://127.0.0.1:8081");
    }
    TaskServiceWebsockets.prototype.sendMessage = function (message) {
        var _this = this;
        console.log("TaskServiceWebsockets.sendMessage(obj);");
        return new Promise(function (resolve, reject) {
            console.log("TaskServiceWebsockets.sendMessage starting a new promise ...");
            if (_this.connection.readyState === 1) {
                console.log("using previously opened connection");
                console.log("TaskServiceWebsockets.sending: " + JSON.stringify(message));
                _this.connection.send(JSON.stringify(message));
            }
            if (_this.connection.readyState === 0) {
                _this.connection.onopen = function () {
                    console.log("opening connection");
                    console.log("TaskServiceWebsockets.sending: " + JSON.stringify(message));
                    _this.connection.send(JSON.stringify(message));
                };
            }
            _this.connection.onmessage = function (evt) {
                console.log('onmessage got something: ' + evt);
                console.log("evt.data: " + evt.data);
                resolve(JSON.parse(evt.data).tasks);
            };
            _this.connection.onerror = function (error) {
                console.log("onerror: " + error);
                reject(error);
            };
            _this.connection.onclose = function (error) {
                console.log("onclose");
            };
            console.log("TaskServiceWebsockets.sendMessage ending promise.");
        });
    };
    return TaskServiceWebsockets;
})();
exports.TaskServiceWebsockets = TaskServiceWebsockets;
;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZpY2VzL1Rhc2tTZXJ2aWNlV2Vic29ja2V0cy50cyJdLCJuYW1lcyI6WyJUYXNrU2VydmljZVdlYnNvY2tldHMiLCJUYXNrU2VydmljZVdlYnNvY2tldHMuY29uc3RydWN0b3IiLCJUYXNrU2VydmljZVdlYnNvY2tldHMuc2VuZE1lc3NhZ2UiXSwibWFwcGluZ3MiOiJBQUFBO0lBSUNBO1FBRlFDLGVBQVVBLEdBQWNBLElBQUlBLFNBQVNBLENBQUNBLHFCQUFxQkEsQ0FBQ0EsQ0FBQ0E7SUFHckVBLENBQUNBO0lBR0RELDJDQUFXQSxHQUFYQSxVQUFZQSxPQUFjQTtRQUExQkUsaUJBa0NDQTtRQWpDQUEsT0FBT0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EseUNBQXlDQSxDQUFDQSxDQUFDQTtRQUN2REEsTUFBTUEsQ0FBQ0EsSUFBSUEsT0FBT0EsQ0FBQ0EsVUFBQ0EsT0FBT0EsRUFBRUEsTUFBTUE7WUFDbENBLE9BQU9BLENBQUNBLEdBQUdBLENBQUNBLDhEQUE4REEsQ0FBQ0EsQ0FBQ0E7WUFDNUVBLEVBQUVBLENBQUNBLENBQUNBLEtBQUlBLENBQUNBLFVBQVVBLENBQUNBLFVBQVVBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2dCQUN0Q0EsT0FBT0EsQ0FBQ0EsR0FBR0EsQ0FBQ0Esb0NBQW9DQSxDQUFDQSxDQUFDQTtnQkFDbERBLE9BQU9BLENBQUNBLEdBQUdBLENBQUNBLGlDQUFpQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3pFQSxLQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUMvQ0EsQ0FBQ0E7WUFDREEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsS0FBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsVUFBVUEsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3RDQSxLQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxNQUFNQSxHQUFHQTtvQkFDeEJBLE9BQU9BLENBQUNBLEdBQUdBLENBQUNBLG9CQUFvQkEsQ0FBQ0EsQ0FBQ0E7b0JBQ2xDQSxPQUFPQSxDQUFDQSxHQUFHQSxDQUFDQSxpQ0FBaUNBLEdBQUdBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBO29CQUN6RUEsS0FBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQy9DQSxDQUFDQSxDQUFDQTtZQUNIQSxDQUFDQTtZQUlEQSxLQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxTQUFTQSxHQUFHQSxVQUFlQSxHQUFHQTtnQkFDN0NBLE9BQU9BLENBQUNBLEdBQUdBLENBQUNBLDJCQUEyQkEsR0FBR0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7Z0JBQy9DQSxPQUFPQSxDQUFDQSxHQUFHQSxDQUFDQSxZQUFZQSxHQUFHQSxHQUFHQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtnQkFFckNBLE9BQU9BLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLEdBQUdBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBO1lBQ3JDQSxDQUFDQSxDQUFDQTtZQUNGQSxLQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxPQUFPQSxHQUFHQSxVQUFhQSxLQUFLQTtnQkFDM0NBLE9BQU9BLENBQUNBLEdBQUdBLENBQUNBLFdBQVdBLEdBQUdBLEtBQUtBLENBQUNBLENBQUNBO2dCQUNqQ0EsTUFBTUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0E7WUFDZkEsQ0FBQ0EsQ0FBQ0E7WUFDRkEsS0FBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsT0FBT0EsR0FBR0EsVUFBYUEsS0FBS0E7Z0JBQzNDQSxPQUFPQSxDQUFDQSxHQUFHQSxDQUFDQSxTQUFTQSxDQUFDQSxDQUFDQTtZQUN4QkEsQ0FBQ0EsQ0FBQ0E7WUFDRkEsT0FBT0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsbURBQW1EQSxDQUFDQSxDQUFDQTtRQUNsRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7SUFDSkEsQ0FBQ0E7SUFrQkZGLDRCQUFDQTtBQUFEQSxDQTVEQSxBQTREQ0EsSUFBQTtBQTVEWSw2QkFBcUIsd0JBNERqQyxDQUFBO0FBQUEsQ0FBQyIsImZpbGUiOiJzZXJ2aWNlcy9UYXNrU2VydmljZVdlYnNvY2tldHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgVGFza1NlcnZpY2VXZWJzb2NrZXRzIHtcblxuXHRwcml2YXRlIGNvbm5lY3Rpb246IFdlYlNvY2tldCA9IG5ldyBXZWJTb2NrZXQoXCJ3czovLzEyNy4wLjAuMTo4MDgxXCIpO1xuXG5cdGNvbnN0cnVjdG9yKCkge1xuXHR9XG5cblx0Ly8gVE9ETyB1c2UgcHJvcGVyIFR5cGVkIE9iamVjdCBmb3IgJ21lc3NhZ2UnXG5cdHNlbmRNZXNzYWdlKG1lc3NhZ2U6T2JqZWN0KTogUHJvbWlzZTxhbnk+IHtcblx0XHRjb25zb2xlLmxvZyhcIlRhc2tTZXJ2aWNlV2Vic29ja2V0cy5zZW5kTWVzc2FnZShvYmopO1wiKTtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0Y29uc29sZS5sb2coXCJUYXNrU2VydmljZVdlYnNvY2tldHMuc2VuZE1lc3NhZ2Ugc3RhcnRpbmcgYSBuZXcgcHJvbWlzZSAuLi5cIik7XG5cdFx0XHRpZiAodGhpcy5jb25uZWN0aW9uLnJlYWR5U3RhdGUgPT09IDEpIHtcblx0XHRcdFx0Y29uc29sZS5sb2coXCJ1c2luZyBwcmV2aW91c2x5IG9wZW5lZCBjb25uZWN0aW9uXCIpO1xuXHRcdFx0XHRjb25zb2xlLmxvZyhcIlRhc2tTZXJ2aWNlV2Vic29ja2V0cy5zZW5kaW5nOiBcIiArIEpTT04uc3RyaW5naWZ5KG1lc3NhZ2UpKTtcblx0XHRcdFx0dGhpcy5jb25uZWN0aW9uLnNlbmQoSlNPTi5zdHJpbmdpZnkobWVzc2FnZSkpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKHRoaXMuY29ubmVjdGlvbi5yZWFkeVN0YXRlID09PSAwKSB7XG5cdFx0XHRcdHRoaXMuY29ubmVjdGlvbi5vbm9wZW4gPSA8RXZlbnQ+KCkgPT4ge1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKFwib3BlbmluZyBjb25uZWN0aW9uXCIpO1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKFwiVGFza1NlcnZpY2VXZWJzb2NrZXRzLnNlbmRpbmc6IFwiICsgSlNPTi5zdHJpbmdpZnkobWVzc2FnZSkpO1xuXHRcdFx0XHRcdHRoaXMuY29ubmVjdGlvbi5zZW5kKEpTT04uc3RyaW5naWZ5KG1lc3NhZ2UpKTtcblx0XHRcdFx0fTtcblx0XHRcdH1cblx0XHRcdC8vfSBlbHNlIHtcblx0XHRcdC8vXHRjb25zb2xlLmxvZyhcIlRhc2tTZXJ2aWNlV2Vic29ja2V0cy5yZWFkeVN0YXRlOiBcIiArIHRoaXMuY29ubmVjdGlvbi5yZWFkeVN0YXRlKTtcblx0XHRcdC8vfVxuXHRcdFx0dGhpcy5jb25uZWN0aW9uLm9ubWVzc2FnZSA9IDxNZXNzYWdlRXZlbnQ+KGV2dCkgPT4ge1xuXHRcdFx0XHRjb25zb2xlLmxvZygnb25tZXNzYWdlIGdvdCBzb21ldGhpbmc6ICcgKyBldnQpO1xuXHRcdFx0XHRjb25zb2xlLmxvZyhcImV2dC5kYXRhOiBcIiArIGV2dC5kYXRhKTtcblx0XHRcdFx0Ly90aGlzLmNvbm5lY3Rpb24uY2xvc2UoKTtcblx0XHRcdFx0cmVzb2x2ZShKU09OLnBhcnNlKGV2dC5kYXRhKS50YXNrcyk7XG5cdFx0XHR9O1xuXHRcdFx0dGhpcy5jb25uZWN0aW9uLm9uZXJyb3IgPSA8RXJyb3JFdmVudD4oZXJyb3IpID0+IHtcblx0XHRcdFx0Y29uc29sZS5sb2coXCJvbmVycm9yOiBcIiArIGVycm9yKTtcblx0XHRcdFx0cmVqZWN0KGVycm9yKTtcblx0XHRcdH07XG5cdFx0XHR0aGlzLmNvbm5lY3Rpb24ub25jbG9zZSA9IDxFcnJvckV2ZW50PihlcnJvcikgPT4ge1xuXHRcdFx0XHRjb25zb2xlLmxvZyhcIm9uY2xvc2VcIik7XG5cdFx0XHR9O1xuXHRcdFx0Y29uc29sZS5sb2coXCJUYXNrU2VydmljZVdlYnNvY2tldHMuc2VuZE1lc3NhZ2UgZW5kaW5nIHByb21pc2UuXCIpO1xuXHRcdH0pO1xuXHR9XG5cblx0Ly9hZGRUYXNrKHRhc2s6VGFzayk6UHJvbWlzZTxhbnk+IHtcblx0Ly9cdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdC8vXHRcdHRoaXMuY29ubmVjdGlvbi5zZW5kKEpTT04uc3RyaW5naWZ5KHttZXNzYWdlVHlwZTogXCJBRERfVEFTS1wiLCB0YXNrOiB0YXNrfSkpO1xuXHQvL1x0XHQvLyBUT0RPIGFcblx0Ly9cdFx0cmVzb2x2ZSh7XCJva1wifSk7XG5cdC8vXHR9KTtcblx0Ly99XG5cdC8vXG5cdC8vdXBkYXRlVGFzayh0YXNrOlRhc2spOlByb21pc2U8YW55PiB7XG5cdC8vXHRyZXR1cm4gdW5kZWZpbmVkO1xuXHQvL31cblx0Ly9cblx0Ly9kZWxldGVUYXNrKHRhc2s6VGFzayk6UHJvbWlzZTxhbnk+IHtcblx0Ly9cdHJldHVybiB1bmRlZmluZWQ7XG5cdC8vfVxuXG59OyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==