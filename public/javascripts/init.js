/**
 * Created by castle on 4/24/16.
 */
$(function() {
  //Modals initialization
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
  //Columns to rows. No yet implemented
  $('#sort').on('click', function () {
    $('.col.s12.m7.l4')
        .removeClass('col s12 m7 l4')
        .addClass('row');
  });
//Autocomplete search bar
  var arr = [];
  $('.todo-title').each( function(index) {
    arr.push($(this).text());
  });
  $('.search').autocomplete({ source: arr });


  var cards = $('.date_end');
  console.log(Date.parse(cards.text())   === 'May 02 2016');
  });
  //End date notification