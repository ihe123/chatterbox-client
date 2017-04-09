// YOUR CODE HERE:
$(document).ready(function() {
  var app = {};

  app.server = 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages';

  app.init = function() {
    // initializing fetch call;
    this.fetch();

    // setting username, and displaying welcome message
    var username = window.location.search.slice(10);
    var welcomeMessage = $('<h3></h3>');
    welcomeMessage.text('Welcome ' + username);
    $('#inputs').prepend(welcomeMessage);

    // refresh button
    $('#fetch-chats').click(function() {
      app.clearMessages();
      app.fetch();
    });

    // user input message and send to server

    var message = {
      username: username,
      // roomname: '4chan'
    };


    $('#submit-message').click(function() {
      message.text = document.getElementById('input-box').value; // come from user input
      var roomSelect = document.getElementById("roomSelect");
      var roomName = roomSelect.options[roomSelect.selectedIndex].text;
      message.roomname = roomName;
      // console.log(message);
      app.send(message);
      app.clearMessages();
      app.fetch();
    });


    // allow user to select room to post in
    $('#submitRoom').click(function(){
      var roomSelect = document.getElementById("roomSelect");
      var roomName = roomSelect.options[roomSelect.selectedIndex].text.replace(/[=,0-9,!,@,#,$,%,^,&,*,9,\/,\.\?,\~,:,\+,\-, ,\",\',\\]/ig, '');
      console.log(roomName)
      $(".chat").hide();
      
      $('.chat').filter('.' + roomName).show();
     
     //befriend
     //show username messages
     $('') 

    });

    // allow user to create new room to add to room list
    $('#createRoom').click(function() {
      var newRoom = document.getElementById('input-room-box').value;
      app.renderRoom(newRoom);
    });

    // send message
    // fetch all messages / refresh page

    // console.log($('.chat').text);
    // console.log($('#main'));
    // console.log($('#chats').first());
    // console.log($('div .chats'))
    // $('#main').click(function() {
    //   // if ($(this).hasClass('username')) {
    //   //   console.log(this);
    //   //   $(this).parent().addClass('friend');
    //   // }
    //   console.log($(this));
    //   $(this).addClass('friend');
    //   console.log("here");
    // });
    
    
    
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
        // console.log('SEND: ' + data);
        return data;
        // add to message object in server
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });
  };

  app.rooms = {};

  app.fetch = function() {
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: this.server,
      type: 'GET',
      // data: JSON.stringify(message),
      contentType: 'application/json',
      data: 'order=-createdAt',
      // dataType: 'json',
      // dataFilter: function(data) {
      //   // sort by date
      // },
      success: function (data) {
        console.log('chatterbox: Messages recieved');
        // console.log('FETCH (first): ' + JSON.stringify(data.results[0]));
        // console.log('FETCH (last): ' + data.results[data.results.length - 1].text);
        // iterate through messages
        for (var i = 0; i < data.results.length; i++) {
          // console.log(data.results[i]);
          app.renderMessage(data.results[i]);
          // console.log(data.results[i].roomname)
          // if roomname does not exist in the rooms object
          if (app.rooms[data.results[i].roomname] === undefined && data.results[i].roomname !== "" && data.results[i].roomname !== undefined) {
            // add roomname to object as key-value pair
            // console.log(app.rooms)
            app.rooms[data.results[i].roomname] = data.results[i].roomname;
            // add roomname to #roomSelect
            app.renderRoom(data.results[i].roomname);
          }
        }
      },
      error: function () {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to recieve messages');
      }
    });
  };

  app.clearMessages = function() {
    var chats = document.getElementById('chats');
    while (chats.firstChild) {
      chats.removeChild(chats.firstChild);
    }
  };

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
    var fixedRoom = message.roomname.replace(/[=,0-9,!,@,#,$,%,^,&,*,9,\/,\.\?,\~,:,\+,\-, ,\",\',\\]/ig, '');
    renderedMessage.addClass(fixedRoom);
    // add message container to big chats section
    $('#chats').append(renderedMessage);
  };

  app.renderRoom = function(room){
    var renderRoom = $('<option></option>');
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