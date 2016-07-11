/**
 * Created by tr3e-h0us3 on 08/07/16.
 */

 //jshint esversion: 6
const app = angular.module('app', []);

const user_id =  document.cookie.split(';')
  .reduce(value => value.substr(value.indexOf('=') + 1));

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
          user_id: value.user_id,
          _id: value._id,
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

      const title = $('input[name="title"]').val();
      const content = $('input[name="content"]').val();
      const date = Date.parse($('input[name="end_date"]').val());


      $scope.taskData = {
        user_id: user_id,
        title: title,
        content: content,
        end_date: date

      };
      console.log($scope.taskData);
      $http.post('/api/create/', $scope.taskData)
        .success(data => {
          $scope.taskData = {};
          $scope.all = data;
          console.log(data);
          Materialize.toast('Task created successfully', 2000);
        }).error( error => {
            Materialize.toast('Create task went wrong');
            console.log(error);
      });
    };

    $scope.changeState = (id, userID) => {

      $http.post(`/api/state/${id}`)
        .success(data => {
          $scope.all = data;
        }).error(error => {
          Materialize.toast('Changing state failed', 2000);
          console.log(error);
      })
    };



});
