const {BrowserWindow}=require('electron').remote
const app=require('electron').app;
const path=require('path');
const url=require('url');
const $ = require('jquery');
let PantallaDetalle;
//clase de objetos tipo persona (de RM):
function datos(nombreMateria,claveMateria,ClaveGrupo){
	this.nombreMateria=nombreMateria;
	this.claveMateria=claveMateria;
	this.ClaveGrupo=ClaveGrupo;
}
//nombre de la materia, clave de materia y clave de grupo,
//var gruposs=new Array(3);
function inicia()
{
	$.ajax({
	  url: 'http://itculiacan.edu.mx/dadm/apipaselista/data/obtienegrupos2.php?usuario=920&usuariovalida=49nc8Eznl4dnU&periodoactual=2173',
	  dataType: 'json',
	  success: function(data) {
	  	var nombreMateria = "";
	  	var claveMateria="";
	  	var ClaveGrupo="";
	  	var resultado="";
	  	for(var i=1;i<4;i++)
	  	{
	  		nombreMateria=data.grupos[i].materia;
	  		claveMateria = data.grupos[i].clavemateria;
	  		ClaveGrupo= data.grupos[i].grupo;
	  		resultado="<li>nombreMateria: "+nombreMateria+"<br> claveMateria: "
	  		+claveMateria+"<br>ClaveGrupo: "
	  		+ClaveGrupo+"<button id='"+i+"'>Alumnos</button></li>";
	  		$("#lstGrupos").append(resultado);
	  	}	  	
	  }
	});
}
inicia();