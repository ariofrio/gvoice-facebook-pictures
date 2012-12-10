(function() {
  var facebookFriends = {};

  function insertListener(event) {
    if(event.animationName == "nodeInserted") {
      replaceWithPicture(event.target);
    }
  }

  function replaceWithPicture(img) {
    try {
      var metadata = img.parentNode.parentNode.nextElementSibling;
      var name = metadata.querySelector(".gc-message-name-link").textContent;
      if(name in facebookFriends) {
        img.src = "https://graph.facebook.com/" + facebookFriends[name] + "/picture?return_ssl_resources=1&width=64&height=64"
      }
    } catch(e) {
      console.warn(e);
    }
  }

  function handlePageOfFriends(response) {
    if(response.data) {
      for(var i=0; i<response.data.length; i++) {
        facebookFriends[response.data[i].name] = response.data[i].id;
      }
    }
    if(response.paging && response.paging.next) {
      FB.api(response.paging.next, handlePageOfFriends);
    } else {
      friendsLoaded();
    }
  }

  function friendsLoaded() {
    document.addEventListener("animationstart", insertListener, false);
    document.addEventListener("MSAnimationStart", insertListener, false);
    document.addEventListener("webkitAnimationStart", insertListener, false);

    var imgs = document.querySelectorAll(
        '.gc-message-portrait > img[alt="Blue_ghost"]');
    for(var i=0; i<imgs.length; i++) {
      replaceWithPicture(imgs[i]);
    }
  }

  function loggedIn() {
    FB.api('/me/friends', handlePageOfFriends);
  }

  window.fbAsyncInit = function() {
      FB.init({
        appId: '120425281453003',
        status: true,
        cookie: true
      });
      FB.getLoginStatus(function(response) {
        if(response.status === 'connected') {
          loggedIn();
        } else {
          FB.login(function(response) {
            if(response.authResponse) {
              loggedIn();
            }
          });
        }
      });
  }
})();

// Load the Facebook SDK asynchronously
(function(d, debug){
  var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
  if (d.getElementById(id)) {return;}
  js = d.createElement('script'); js.id = id; js.async = true;
  js.src = "//connect.facebook.net/en_US/all" + (debug ? "/debug" : "") + ".js";
  ref.parentNode.insertBefore(js, ref);
}(document, /*debug*/ false));

