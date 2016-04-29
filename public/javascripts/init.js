/**
 * Created by castle on 4/24/16.
 */
$(function() {
  $('.modal-trigger').leanModal({
    dimissible: true,
    in_duration: 200,
    out_duration: 200,
    complete: function() {
      $('.task-title').val('');
      $('.task-content').val('');
    }
  });
  $('.datepicker').pickadate();
  
  $('#sort').on('click', function () {
    $('.col.s12.m7.l4')
        .removeClass('col s12 m7 l4')
        .addClass('row');
  });
});