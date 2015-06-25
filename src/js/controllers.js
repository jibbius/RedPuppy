var iConnectPlusApp = angular.module('iConnectPlusApp', []);

iConnectPlusApp.controller('PageCtrl', function ($scope) {
    $scope.pages = [
        {'name': 'Options', route:'/options.html'},
        {'name': 'Help', route:'/help.html'}
    ];
});