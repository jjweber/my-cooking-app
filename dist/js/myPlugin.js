'use strict';

/***********************************************/
/*************** My JQuery Plugin **************/
/***********************************************/

$(function () {

  $.fn.jjwModal = function (options) {
    var $modal = $('<div class="jjw-modal"></div>');
    var $content = $('<div class="jjw-modal-content"></div>');
    var $header = $('<div class="jjw-modal-header"><span class="close">&times;</span><h2>Modal Header</h2></div>');
    var $body = $('<div class="jjw-modal-body"><p>Custom modal</p></div>');

    $content.append($header, $body);
    $modal.append($content);

    // If there Is Not A Modal Present I Am Appending It To The Body.
    // Else I Am Finding the Existing Modal And Replacing Its Html.
    if (!$(".jjw-modal").length) {
      $("body").append($modal);
    } else {
      $(".jjw-modal").replaceWith($modal);
    };

    // Get Modal So Can Toggle Display, etc.
    $modal = $(".jjw-modal");

    // Variable To Hold Span with Class Close
    var $closeSpan = $("span.close");

    // When User Clicks On <span> (x), Close Modal
    $closeSpan.click(function () {
      $modal.css("display", "none");
    });

    // If User Clicks Outside Of Modal, Close It
    $(document).click(function (e) {
      if (e.target.className == "jjw-modal") {
        $modal.css("display", "none");
      }
    });

    // This Is The Easiest Way To Have Default Options.
    var settings = $.extend({
      // These Are The Defaults.
      headerText: "Default Header Text",
      bodyHtml: "<p>Default Body Text</p>",
      modalClass: "alert"
    }, options);

    $(".jjw-modal-header").addClass(settings.modalClass);
    $(".jjw-modal-header > h2").text(settings.headerText);
    $(".jjw-modal-body").html(settings.bodyHtml);

    // Open The Modal
    $modal.css("display", "block");

    return {
      // Uses Closure To Return Functions That Change This Dialog
      closeDialog: function closeDialog() {
        $(".jjw-modal").css("display", "none");
      }
    };
  };
});