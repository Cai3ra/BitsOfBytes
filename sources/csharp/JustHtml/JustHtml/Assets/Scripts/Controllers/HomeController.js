'use strict';
var PersonController;

PersonController = (function() {
  function PersonController(baseUrl) {
    this.baseUrl = baseUrl;
  }

  PersonController.prototype.load = function() {
    $.ajax({
      url: this.baseUrl + '/api/Person',
      dataType: 'json',
      type: 'GET',
      success: function(data, error) {
        var grid, line, person, _i, _len, _results;
        if ((data != null) && data.length > 0) {
          grid = $('.grid tbody');
          _results = [];
          for (_i = 0, _len = data.length; _i < _len; _i++) {
            person = data[_i];
            line = "<tr><td>" + person.ID + "</td><td>" + person.Name + "</td><td>" + person.Age + "</td></tr>";
            _results.push(grid.append(line));
          }
          return _results;
        }
      },
      error: function(error) {
        console.log(error);
      }
    });
  };

  PersonController.prototype.find = function(id) {
    $.ajax({
      url: this.baseUrl + '/api/Person/#{id}',
      dataType: 'json',
      type: 'GET',
      success: function(data, error) {},
      error: function(error) {}
    });
  };

  PersonController.prototype.edit = function(person) {
    $.ajax({
      url: this.baseUrl + '/api/Person',
      dataType: 'json',
      type: 'PUT',
      data: person,
      success: function(data, error) {},
      error: function(error) {}
    });
  };

  PersonController.prototype.insert = function(person) {
    $.ajax({
      url: this.baseUrl + '/api/Person',
      dataType: 'json',
      type: 'POST',
      data: person,
      success: function(data, error) {},
      error: function(error) {}
    });
  };

  PersonController.prototype.remove = function(person) {
    $.ajax({
      url: this.baseUrl + '/api/Person',
      dataType: 'json',
      type: 'DELETE',
      data: person,
      success: function(data, error) {},
      error: function(error) {}
    });
  };

  return PersonController;

})();
