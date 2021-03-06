$(document).ready(function() {
  var request = new XMLHttpRequest();
  var request2 = new XMLHttpRequest();
  request.open("GET", "./collegelist.csv", false);
  request.send(null);

  request2.open("GET", "./majors.csv", false);
  request2.send(null);

  var collegeList = [];
  var majors = [];

  var jsonObject = request.responseText.split(/\r?\n|\r/);
  for (var i = 0; i < jsonObject.length; i++) {
    collegeList.push(jsonObject[i]);
  }

  var jsonObject2 = request2.responseText.split(/\r?\n|\r/);
  for (var i = 0; i < jsonObject2.length; i++) {
    majors.push(jsonObject2[i]);
  }
  // Retrived data from csv file content

  $( "#college" ).autocomplete({
    source: collegeList,
    minLength: 3,
    change: function(event, ui) {
    if (ui.item == null) {
      alert("Please choose a school from the list");
      event.currentTarget.value = '';
      event.currentTarget.focus();
    }
}

  });

  $( "#area-of-study" ).autocomplete({
    source: majors,
    minLength: 3,
    change: function(event, ui) {
    if (ui.item == null) {
      alert("Please choose a major from the list");
      event.currentTarget.value = '';
      event.currentTarget.focus();
    }
}
  })

  checkInputs();

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
      document.getElementById('status').innerHTML =
      'Thanks for logging in!';
      setId(response.id);
    });
  } else {
    // The person is not logged into your app or we are unable to tell.
    document.getElementById('status').innerHTML = 'Please log ' +
    'into this app.';
  }
}

function logout(){
  FB.getLoginStatus(function(response) {
    FB.logout(function(response){
      window.location = "/";
    });
  });
}

function submit(){
  let college = document.getElementById("college").value;
  let areaOfStudy = document.getElementById("area-of-study").value;
  let question = document.getElementById("question").value;

  $.get('/setFacebookId', {}).done(function(response){
    $.post('/submit',
    {
      id: response,
      college: college,
      areaOfStudy: areaOfStudy,
      question: question
    }).done(function( alreadyAnswered ){
      if( alreadyAnswered ){
        window.location.href ="./repeat.html"
      } else {
        alert('Thank you for your submission.');
        window.location.href ="./results.html"
      }
    });
  });
}

function getId(){
  $.get('/setFacebookId',{}).done(function(response){
    return response.facebookId;
  });
}


function checkInputs(){
  let college, areaOfStudy, question;

  var form = document.querySelector('form');
form.addEventListener('change', function() {

  college = $('#college').val();
  areaOfStudy = $('#area-of-study').val();
  question = $('#question').find(":selected").text();

  if (college && areaOfStudy && question){
    $('#submit').attr("disabled", false);
  } else {
    $('#submit').attr("disabled", true);
  }
  });
}

function clearCollege(){
  $("#college").val('');
}

function clearAreaOfStudy(){
  $("#area-of-study").val('');
}
