/**
 * Created by castle on 4/24/16.
 */
$(function() {
  //Modals initialization
    $('.modal-trigger').leanModal({
      dimissible: true,
      in_duration: 200,
      out_duration: 200,

    //Remove previous values
      complete: function() {
        $('.task-title').val('');
        $('.task-content').val('');
      }
    });

    $('.datepicker').pickadate();
    $('#drawer').sketch();
    //TODO:Columns to rows. No yet implemented
    $('#sort').on('click', function () {
      $('.col.s12.m7.l4')
          .removeClass('col s12 m7 l4')
          .addClass('row');
    });
      //Autocomplete search bar and lazy search
    var arr = [];
    $('.todo-title').each( function(index) {
      arr.push($(this).text());
    });

    $('.search').autocomplete({ source: arr })
      .on('keydown', function(e) {
        if(e.which == 13) {
          window.find($(this).val());
          e.preventDefault();
        }
    });


    var cards = $('.date_end').each( function(index) {
      console.log($(this).text());
      console.log(new Date($(this).text()) === 'May 06 2016');
    });

  });
  //End date notification