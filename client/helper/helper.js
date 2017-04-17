const handleError = (message) =>{
  $('#errorMessage').text(message);
  if($('#domoMessage')){
    $('#domoMessage').animate({width:'toggle'},350);
    console.log('domoHelp');
  }
  
  if($('#dogoMessage')){
    $('#dogoMessage').animate({width:'toggle'},350);   
    console.log('dogoHelp');

  }

};

const redirect = (response) =>{
  $('#domoMessage').animate({width:'hide'},350);
  window.location = response.redirect;
}

const sendAjax = (type, action, data, success) =>{
  console.dir(type);
  console.dir(action);
  console.dir(data);
  console.dir(success);
  $.ajax({
    cache: false,
    type: type,
    url: action,
    data: data,
    dataType: "json",
    success: success,
    error: function(xhr, status, error) {
      console.log(xhr.responseText);
      var messageObj = JSON.parse(xhr.responseText);
      handleError(messageObj.error);
    }
  });
};