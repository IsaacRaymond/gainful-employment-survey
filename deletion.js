
function deleteData(){
  $.post('/deleteData',
  {

  }).done(function(response){
    if(response){
      document.getElementById('target').innerHTML = 'Your previous response was successfully deleted';
    } else {
      document.getElementById('target').innerHTML = 'There were no records found in the database that match this Facebook user'
    }
  });
}
