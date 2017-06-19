function flash_message(identifier, msg, type) {
  $(".error-msg").remove(".error-msg");
  $(identifier).append("<div class=\"error-msg\">" + msg + "</div>");

  if (type === 'danger') {
    $(identifier).removeClass("send");
    $(identifier).addClass("danger");
  }
  else {
    $(identifier).removeClass("danger");
    $(identifier).addClass("send");
  };

  $(identifier).slideDown(function() {
      setTimeout(function() {
          $(identifier).slideUp();
      }, 3000);
  });
};

function submitForm(mail, text) {
  $.post("http://45.32.154.234//message",
  {
    email: mail,
    msg: text
  },
  function(data, status){
    if (status === "success") {
      $("input[name='send-email']").attr("disabled", true);
      $("#send-msg").attr("disabled", true);
      $("#send-btn").prop("disabled", true);
      $("#send-btn").removeClass("send")
      $("#send-btn").addClass("disabled");
      flash_message('.flash-message', 'Message sent!', 'send');
    }
    else {
      flash_message('.flash-message', 'Message not sent!', 'danger');
    }
  });
};

$("#send-btn").click(function(){
  var email = $("input[name='send-email']").val();
  var msg = $("#send-msg").val();

  if (email && msg) {
    submitForm(email, msg);
  }
  else {
    flash_message('.flash-message', 'Please fill in both fields!', 'danger');
  };
});

$('#show-btn').click(function() {
  var btn_value = $('#show-btn').val();

  if (btn_value === "Send me a message!") {
    $('.contact-container').slideDown();
    $('#show-btn').val("Cancel");
    $('#show-btn').addClass("danger");
  }
  else {
    $('.contact-container').slideUp();
    $('#show-btn').val("Send me a message!");
    $('#show-btn').removeClass("danger");
  }
});
