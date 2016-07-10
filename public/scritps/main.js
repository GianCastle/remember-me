/**
 * Created by tr3e-h0us3 on 08/07/16.
 */
const app = angular.module('app', []);

app.filter('byStateRed', () => (tasks) =>
    tasks.filter(value => value.state === 'red'));

app.filter('byStateBlue', () => (tasks) =>
    tasks.filter(value => value.state === 'blue'));

app.filter('byStateGreen', () => (tasks) =>
    tasks.filter(value => value.state === 'green'));


app.controller('mainController', ($scope, $http) => {
  $scope.all = [];
  $scope.newTaskData = {};

  $http.get('/api/todos/all')
    .success(data => {
      angular.forEach(data, (value, key) => {
        $scope.all.push({

          title: value.title,
          content: value.content,
          state: value.state,
          updated_at: new Date(value.updated_at).toDateString(),
          end_date: new Date(value.end_date).toDateString()

        });
      });

      console.log($scope.all);

    }).error(error => console.log(error));

    $scope.createTodo = () => {
      $http.post('/api/todos/create', newTaskData)
        .success(data => {
          $scope.newTaskData = {};
          $scope.all = data;

          console.log(data);

        }).error( data => console.log(error));
    };



});


