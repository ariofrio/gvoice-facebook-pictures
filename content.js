var js, ref = document.getElementsByTagName('script')[0];
js = document.createElement('script');
js.src = chrome.extension.getURL("injected.js");
ref.parentNode.insertBefore(js, ref);

