'use strict';
var PersonController;

PersonController = (function() {
  function PersonController() {}

  PersonController.prototype.load = function(cb) {
    $.ajax({
      url: '/api/Person',
      dataType: 'json',
      type: 'GET',
      contentType: 'application/json',
      success: function(data, error) {
        if ((data != null) && data.length > 0) {
          cb(data);
        }
      },
      error: function(error) {
        console.log(error);
      }
    });
  };

  PersonController.prototype.find = function(id, cb) {
    $.ajax({
      url: "/api/Person/" + id,
      dataType: 'json',
      type: 'GET',
      contentType: 'application/json',
      success: function(data, error) {
        cb(data);
      },
      error: function(error) {}
    });
  };

  PersonController.prototype.edit = function(person, cb) {
    $.ajax({
      url: "/api/Person/" + person.ID,
      dataType: "json",
      type: "PUT",
      data: JSON.stringify(person),
      contentType: 'application/json',
      success: function(data, error) {
        cb(data);
      },
      error: function(error) {}
    });
  };

  PersonController.prototype.insert = function(person, cb) {
    $.ajax({
      url: "/api/Person",
      dataType: "json",
      type: "POST",
      data: JSON.stringify(person),
      contentType: 'application/json',
      success: function(data, error) {
        cb(data);
      },
      error: function(error) {}
    });
  };

  PersonController.prototype.remove = function(id, cb) {
    $.ajax({
      url: "/api/Person/" + id,
      dataType: "json",
      type: "DELETE",
      contentType: 'application/json',
      success: function(data, error) {
        cb(data);
      },
      error: function(error) {}
    });
  };

  PersonController.prototype.file = function(cb, f) {
    $.ajax({
      url: "/Home/SendFile",
      dataType: "json",
      type: "POST",
      data: {
        file: f
      },
      processData: false,
      contentType: false,
      cache: false,
      success: function(data, error) {
        cb(data);
      },
      error: function(error) {}
    });
  };

  return PersonController;

})();
