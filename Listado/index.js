const {BrowserWindow}=require('electron').remote
const app=require('electron').app;
const path=require('path');
const url=require('url');
const $ = require('jquery');

function datos(nombre,genero,foto,direccion,telefono){
	this.nombre=nombre;
	this.genero=genero;
	this.foto=foto;
	this.direccion=direccion;
	this.telefono=telefono;
}
var usuarios=new Array(20);//es una variable donde se puede guardar un conjunto de elementos del mismo tipo.
function inicia()
{
	$.ajax({
	  url: 'https://randomuser.me/api/?results=20',
	  dataType: 'json',
	  success: function(data) {
	  	var resultado = "";
	  	var nombre = "";
	  	var genero="";
	  	var direccion="";
	  	var telefono="";
	  	var foto="";
	  	for(var i=0;i<20;i++)
	  	{
	  		nombre = data.results[i].name.first+" "+data.results[i].name.last;
	  		genero=data.results[i].gender;
			direccion=data.results[i].location.street;
			telefono=data.results[i].phone;
	  		foto = data.results[i].picture.medium;
	  		resultado="<li><img src="+foto+">"+nombre+"<button id='"+i+"'>Detalle</button></li>";
	  		$("#lstUsuarios").append(resultado);
	  		usuarios[i]=new datos(nombre,genero,foto,direccion,telefono);//arreglo de objetos.
	  	}	  	
	  }
	});
}
/*No se le pueden creaer eventos para elementos creados en tiempo de ejecución:
function botonDetalle(){
	alert("click");
}
$("#0").on("click", botonDetalle);
*/
/*Para hacer lo anterior se hace:*/
function botonDetalle(){
	alert(usuarios[this.id].nombre);
	alert(usuarios[this.id].genero);
	alert(usuarios[this.id].foto);
}
$("body").on("click", "li > button",botonDetalle);//todos los botones dentro de los elementos li.
inicia();