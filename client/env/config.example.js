// All this is doing is inserting the parse API keys into every $.ajax
// request that you make so you don't have to.

// Put your parse application keys here!
$.ajaxPrefilter(function (settings, _, jqXHR) {
  jqXHR.setRequestHeader('X-Parse-Application-Id', 'fake_app_id');
  jqXHR.setRequestHeader('X-Parse-REST-API-Key', 'fake_api_key');
});
