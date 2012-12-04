function insertListener(event) {
  if(event.animationName == "nodeInserted") {
    replaceWithPicture(event.target);
  }
}

function replaceWithPicture(img) {
  try {
    var metadata = img.parentNode.parentNode.nextElementSibling;
    var name = metadata.querySelector(".gc-message-name-link").textContent;
  } catch(e) {
    console.warn(e);
  }
  img.src = "http://www.demilked.com/magazine/wp-content/uploads/2012/05/funny-portraits-blow-job-tadas-cerniauskas-thumb45.jpg";
}

window.fbAsyncInit = function() {
  setTimeout(function() {
    FB.init({
      appId: '120425281453003',
      status: true,
      cookie: true
    });

    document.addEventListener("animationstart", insertListener, false);
    document.addEventListener("MSAnimationStart", insertListener, false);
    document.addEventListener("webkitAnimationStart", insertListener, false);

    var imgs = document.querySelectorAll(
        '.gc-message-portrait > img[alt="Blue_ghost"]');
    for(var i=0; i<imgs.length; i++) {
      replaceWithPicture(imgs[i]);
    }
  }, 1000);
}

// Load the Facebook SDK asynchronously
(function(d, debug){
  var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
  if (d.getElementById(id)) {return;}
  js = d.createElement('script'); js.id = id; js.async = true;
  js.src = "//connect.facebook.net/en_US/all" + (debug ? "/debug" : "") + ".js";
  ref.parentNode.insertBefore(js, ref);
}(document, /*debug*/ false));

