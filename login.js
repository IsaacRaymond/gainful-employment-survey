$(document).ready(function() {
  checkLoginState();
});


window.fbAsyncInit = function() {
  FB.init({
    appId      : "723133751859399",
    cookie     : true,
    xfbml      : true,
    version    : 'v7.0'
  });

  FB.AppEvents.logPageView();

};

(function(d, s, id){
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {return;}
  js = d.createElement(s); js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}

//The only information obtained from the Facebook login is the user's ID.
//The user's ID is not displayed for confidentiality reasons.
//It is hiddin in a private server, unattached to the user's college submission
//to make sure people are not submitting more than one response.
function statusChangeCallback(response) {
  if (response.status === 'connected') {
    FB.api('/me', function (response) {
      window.location.href = "/login.html";

      $.post('/setFacebookId',
      {
        facebookId: response.id
      });

    });
  } else {
    // The person is not logged into your app or we are unable to tell.
    document.getElementById('status').innerHTML = 'Please log ' +
    'into this app. <br/> <div class="fb-login-button" data-size="large" data-button-type="continue_with" data-layout="default" data-auto-logout-link="false" data-use-continue-as="true" data-width="" scope="" onlogin="checkLoginState()"</div>' ;
  }
}

function logout(){
  FB.getLoginStatus(function(response) {
    FB.logout(function(response){
      window.location = "/";
    });
  });
}
