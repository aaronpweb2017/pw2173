var inicia=function(){
  var nuevo=function(){
    //JSON = JavaScript Object Notation.
    //$ --> JQuery.
    $.ajax({
        url: 'https://randomuser.me/api/',
        dataType: 'json',
        success: function(data) {
          //alert(data.results[0].name.first+" "+data.results[0].name.last);
          //console.log(data);
          //.html --> incrusta código HTML en JQuery.
          $("#foto").attr("src", data.results[0].picture.large);
          $("#nombre").html("nombre: "+data.results[0].name.first+" "+data.results[0].name.last);
        }
   });
  }
	//alert("Lista la página");
  //Aquí van todos los elementos que corresonden al apágina (se encienden los eventos):
  //$("ntnNuevo").off("click", nuevo); --> aquí no hace nada el botón.
  $("#btnNuevo").on("click",nuevo); //El botón realiza una acción.
}
//iniciamos JQuery 
//cuando la página está lista ejecuta la función inicia.
$(document).ready(inicia);