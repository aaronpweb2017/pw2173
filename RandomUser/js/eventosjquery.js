var inicia=function(){
  var nuevo=function(){
    $.ajax({
        url: 'https://randomuser.me/api/',
        dataType: 'json',
        success: function(data) {
          $("#foto").attr("src", data.results[0].picture.large);
          $("#name").html("<img src=img/D1.JPG> <h1>Hi, My name is: "+data.results[0].name.first+" "+data.results[0].name.last+"</h1>");
          $("#email").html("<img src=img/D2.JPG> <h1>My email address is: "+data.results[0].email+"</h1>");
          $("#birthday").html("<img src=img/D3.JPG> <h1>My birthday is: "+data.results[0].dob+"</h1>");
          $("#address").html("<img src=img/D4.JPG> <h1>My address is: "+data.results[0].location.street+"</h1>");
          $("#phoneNumber").html("<img src=img/D5.JPG> <h1>My phone number is: "+data.results[0].phone+"</h1>");
          $("#pass").html("<img src=img/D6.JPG> <h1>My password is: "+data.results[0].login.password+"</h1>");
        }
   });
  }
  $("#btnNuevo").on("click",nuevo);
}
$(document).ready(inicia);