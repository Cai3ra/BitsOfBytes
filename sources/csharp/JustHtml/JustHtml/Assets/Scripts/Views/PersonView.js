(function() {
  'use strict';
  require(["libs/jquery-1.11.1.min", "controllers/personcontroller", "models/person", "libs/jquery.uploadfile.min"], function() {
    var bind, clean, controller, files, gridBind, insert, load, op, parse, remove, update;
    controller = new PersonController();
    op = "insert";
    files = [];
    load = function() {
      return controller.load((function(_this) {
        return function(data) {
          var grid, line, person, _i, _len;
          grid = $('.grid tbody');
          grid.empty();
          for (_i = 0, _len = data.length; _i < _len; _i++) {
            person = data[_i];
            line = "<tr>" + ("<td class='id row'>" + person.ID + "</td>") + ("<td class='name col-md-12 row'>" + person.Name + "</td>") + ("<td class='age row'>" + person.Age + "</td>") + "<td class='row'><a href='#' class='edit'>edit</a></td>" + "<td class='row'><a href='#' class='delete'>delete</a></td>" + "</tr>";
            grid.append(line);
          }
          return gridBind();
        };
      })(this));
    };
    insert = function() {
      var data, person;
      data = $('form');
      person = parse(data);
      if (data != null) {
        controller.insert(person, function(p) {
          load();
        });
      }
    };
    update = function() {
      var data, person;
      data = $('form');
      person = parse(data);
      if (data != null) {
        controller.edit(person, function(p) {
          load();
        });
      }
    };
    remove = function(id) {
      if ((id != null) && id > 0) {
        controller.remove(id, function(p) {
          load();
        });
      }
    };
    parse = function(data) {
      var person;
      person = new Person();
      person.ID = data.find('input[name=ID]').val();
      person.Name = data.find('input[name=Name]').val();
      person.Age = data.find('input[name=Age]').val();
      return person;
    };
    clean = function(data) {
      data.find('input[name=ID]').val('');
      data.find('input[name=Name]').val('');
      data.find('input[name=Age]').val('');
    };
    bind = function() {
      var form;
      form = $('form');
      form.on('submit', function(e) {
        e.preventDefault();
        switch (op) {
          case "insert":
            (function() {
              insert();
              clean(form);
            })();
            break;
          case "update":
            (function() {
              update();
              clean(form);
            })();
        }
      });
      $("#fileuploader").uploadFile({
        url: "/Home/SendFile",
        fileName: "file"
      });
    };
    gridBind = (function(_this) {
      return function() {
        var data;
        data = $('form');
        $('.edit').on('click', function(e) {
          var age, el, id, name;
          op = 'update';
          clean(data);
          el = $(this).closest('tr');
          id = el.find('.id').text();
          name = el.find('.name').text();
          age = el.find('.age').text();
          data.find('input[name=ID]').val(id);
          data.find('input[name=Name]').val(name);
          data.find('input[name=Age]').val(age);
        });
        $('.delete').on('click', function(e) {
          var el, id;
          op = 'delete';
          el = $(this).closest('tr');
          id = el.find('.id').text();
          remove(id);
          op = 'insert';
          clean(data);
        });
      };
    })(this);
    load();
    bind();
  });

}).call(this);
