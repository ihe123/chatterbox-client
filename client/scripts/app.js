// YOUR CODE HERE:
$(document).ready(function() {
  var app = {};

  app.server = 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages';

  app.init = function() {
    // call fetch, current assuption is that this will return a JSON
    this.fetch();
    // console.log($('.chat').text);
    console.log($('#main'));
    console.log($('#chats').first());
    // console.log($('div .chats'))
    $('#main').click(function() {
      // if ($(this).hasClass('username')) {
      //   console.log(this);
      //   $(this).parent().addClass('friend');
      // }
      console.log($(this));
      $(this).addClass('friend');
      console.log("here");
    });
    
    
    // this.handleUserNameClick();

  };

  app.send = function(message) {
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: this.server,
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });
  };

  app.fetch = function() {
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: this.server,
      type: 'GET',
      // data: JSON.stringify(message),
      contentType: 'application/json',
      // dataType: 'json',
      success: function (data) {
        console.log('chatterbox: Messages recieved');
        for (var i = 0; i < data.results.length; i++) {
          app.renderMessage(data.results[i]);
        }
      },
      error: function () {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to recieve messages');
      }
    });
  };

  // app.clearMessages = function() {
  //   var chats = document.getElementById('chats');
  //   while (chats.firstChild) {
  //     chats.removeChild(chats.firstChild);
  //   }
  // };

  app.renderMessage = function(message) {
    // create big container for whole message
    var renderedMessage = $('<div></div>');
    // create inner p-container for username
    var renderedUser = $('<div></div>');
    renderedUser.text(message.username + ':');
    renderedUser.addClass('username');
    // add username container to message container
    renderedMessage.append(renderedUser);
    // create inner p-container for message text
    var renderedText = $('<div></div>');
    renderedText.text(message.text);

    // add text container to message container
    renderedMessage.append(renderedText);
    renderedMessage.addClass('chat');
    $('#chats').append(renderedMessage);
  };

  app.renderRoom = function(room){
    var renderRoom = $('<p></p>');
    renderRoom.text(room);
    $('#roomSelect').append(renderRoom);
  };

  // app.handleUserNameClick = function() {
  //   $('.username').on("click", function() {
  //     console.log($('this'));
  //     $('this').addClass('friend');
  //   });
  // };

  app.init();

});