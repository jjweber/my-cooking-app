/***********************************************/
/*************** My JQuery Plugin **************/
/***********************************************/

$(function() {

  $.fn.jjwModal = function(options) {
    let $modal = $('<div class="jjw-modal"></div>');
    let $content = $('<div class="jjw-modal-content"></div>');
    let $header = $('<div class="jjw-modal-header"><span class="close">&times;</span><h2>Modal Header</h2></div>');
    let $body = $('<div class="jjw-modal-body"><p>Custom modal</p></div>');

    $content.append($header, $body);
    $modal.append($content);

    // If there is not a modal present I am appending it to the body.
    // Else I am finding the existing modal and replacing its Html.
    if(!$(".jjw-modal").length) {
      $("body").append($modal);
    } else {
      $(".jjw-modal").replaceWith($modal);
    };

    // get the modal so can toggle display, etc.
    $modal = $(".jjw-modal");

    // Variable to hold the span with class close
    let $closeSpan = $("span.close");

    // When the user clicks on <span> (x), close the modal
    $closeSpan.click(function() {
      $modal.css("display", "none");
    });

    // When the user clicks anywhere outside of the modal, close it
    $(document).click(function(e) {
      // if the user clicks anywhere on the backdrop, close the modal
      if (e.target.className == "jjw-modal") {
        $modal.css("display", "none");
      }
    });

    // This is the easiest way to have default options.
    var settings = $.extend(
      {
        // These are the defaults.
        headerText: "Default Header Text",
        bodyHtml: "<p>Default Body Text</p>",
        modalClass: "alert" // defaults to class of alert, which is bootstrap default
      },
      options
    );

    $(".jjw-modal-header").addClass(settings.modalClass);
    $(".jjw-modal-header > h2").text(settings.headerText);
    $(".jjw-modal-body").html(settings.bodyHtml);

    // open the modal
    $modal.css("display", "block");

    return {
        // Uses something called closure to return functions that change this dialog
        closeDialog: function() {
            $(".jjw-modal").css("display", "none");
        }
    }
  }
});
