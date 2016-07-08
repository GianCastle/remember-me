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

    var left = [];
    var now = Date.now();
    $('.date_end').each( function(index, value) {

      var val = new Date($(this).text()).toJSON().slice(0,10);
      var now = new Date(Date.now()).toJSON().slice(0,10);
      
      if(val === now)
          left.push($(this).text());
    });

    console.log(left);
    Materialize.toast((left.length > 0) ? `You have ${left.length} task for today` : 'No task for today',3000);

  });
  //End date notification