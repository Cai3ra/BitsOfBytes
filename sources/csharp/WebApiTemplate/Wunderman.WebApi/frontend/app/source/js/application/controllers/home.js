app.controller('HomeController', function ($scope, $http, dataFactory, $timeout) {

    $scope.customers;
    $scope.orders;
    $scope.status = false;
    $scope.status_show = false;
    $scope.action = "Insert";

    getCustomers();

    function getCustomers() {
        dataFactory.getCustomers()
            .success(function (custs) {
                $scope.customers = custs;
            })
            .error(function (error) {
                $scope.status = 'Unable to load customer data: ' + error.message;
            });
    };

     $scope.updateCustomer = function (id) {
        
        var cust;

        for (var i = 0; i < $scope.customers.length; i++) {
            var currCust = $scope.customers[i];
            if (currCust.Id === id) {
                cust = currCust;
                break;
            }
        }

        dataFactory.updateCustomer(cust)
          .success(function () {
              $scope.status = 'Updated Customer! Refreshing customer list.';
              isInsert();
              resetForm();
          })
          .error(function (error) {
              $scope.status = 'Unable to update customer: ' + error.message;
          });
          showMessage();
    };

    $scope.insertCustomer = function (cust) {

        if( cust.Id != undefined ){
            $scope.updateCustomer(cust.Id);
            return;
        }

        dataFactory.insertCustomer(cust)
            .success(function (custLast) {
                $scope.status = 'Inserted Customer! Refreshing customer list.';
                resetForm();
                getCustomers();
            }).
            error(function(error) {
                $scope.status = 'Unable to insert customer: ' + error.message;
            });
            showMessage();
    };

    $scope.deleteCustomer = function (id) {
        dataFactory.deleteCustomer(id)
        .success(function () {
            $scope.status = 'Deleted Customer! Refreshing customer list.';
            for (var i = 0; i < $scope.customers.length; i++) {
                var cust = $scope.customers[i];
                if (cust.Id === id) {
                    $scope.customers.splice(i, 1);
                    break;
                }
            }
            $scope.orders = null;
            showMessage();
        })
        .error(function (error) {
            $scope.status = 'Unable to delete customer: ' + error.message;
        });
    };

    $scope.getCustomerOrders = function (id) {
        dataFactory.getOrders(id)
        .success(function (orders) {
            $scope.status = 'Retrieved orders!';
            $scope.orders = orders;
        })
        .error(function (error) {
            $scope.status = 'Error retrieving customers! ' + error.message;
        });
    };

    $scope.insertCustomerInForm = function(id){
        for (var i = 0; i <= $scope.customers.length; i++) {
            var cust = $scope.customers[i];
            if (cust.Id == id) {
                
                $scope.cust = $scope.customers[i];
                isUpdate();

                break;
            }
        }
        scrollTop();
        return false;
    }

    $scope.cancelUpdate = function(){
        resetForm();
        isInsert();
    }

    var scrollTop = function(){
        var body = $("html, body");
        body.animate({scrollTop:0}, '500', 'swing');
    }

    var resetForm = function(){
        $scope.cust = {};
    }

    var clearMessage = function(){
        $timeout(function() {
            $scope.status_show = false;
        }, 3000);
    }

    var showMessage = function(){
        $scope.status_show = true;
        clearMessage();
    }

    var isInsert = function(){
        $scope.action = "Insert";
        $scope.show_cancel = false;
    }

    var isUpdate = function(){
        $scope.action = "Update";
        $scope.show_cancel = true;
    }
});