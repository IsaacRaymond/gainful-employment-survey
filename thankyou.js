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


$( "#college" ).autocomplete({
  source: collegeList,
  minLength: 3,
  change: function(event, ui) {
  if (ui.item == null) {
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
    event.currentTarget.value = '';
    event.currentTarget.focus();
  }
}
})

checkInputs();

});

function checkInputs(){
  let college, areaOfStudy;

  var form = document.querySelector('form');
form.addEventListener('change', function() {

  college = $('#college').val();
  areaOfStudy = $('#area-of-study').val();

  if (college && areaOfStudy){
    $.post('/data',
    {
      college: college,
      areaOfStudy: areaOfStudy
    }).done(function( percentage ){
      console.log('yes');
      $("#results").append(percentage);
    });
  }
  });
}
