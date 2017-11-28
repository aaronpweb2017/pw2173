const {BrowserWindow}=require('electron').remote;
const app=require('electron').app;
const path=require('path');
const url=require('url');
const $ = require('jquery');
let PantallaDeAlumnos;

function datosGrupo(clavemateria,grupo){
	this.clavemateria=clavemateria;
	this.grupo=grupo;
}
var vectorGrupos=new Array(3);
function inicia()
{
	var nombreUsuario=require('electron').remote.getGlobal('infoLlamadasApi').usuario;
	var UsuarioValida=require('electron').remote.getGlobal('infoLlamadasApi').usuariovalida;
	var periodo=require('electron').remote.getGlobal('infoLlamadasApi').periodoactual;
	$.ajax({
	  url: 'http://itculiacan.edu.mx/dadm/apipaselista/data/obtienegrupos2.php?usuario='
	  +nombreUsuario+'&usuariovalida='+UsuarioValida+'&periodoactual='+periodo,
	  dataType: 'json',
	  success: function(data) {
	  	var nombreMateria = "";
	  	var clavemateria="";
	  	var grupo="";
	  	var resultado="";
	  	for(var i=1;i<4;i++){
	  		//if(data.respuesta==true){
	  			nombremateria=data.grupos[i].materia;
	  			clavemateria = data.grupos[i].clavemateria;
	  			grupo= data.grupos[i].grupo;
	  			resultado="<li>nombreMateria: "+nombremateria+"<br> clavemateria: "
	  			+clavemateria+"<br>ClaveGrupo: "
	  			+grupo+"<button id='"+i+"'>Alumnos</button></li>";
	  			$("#lstGrupos").append(resultado);
	  			vectorGrupos[i]=new datosGrupo(clavemateria,grupo);//arreglo de objetos.
	  		//}
	  		//else
	  			//alert("Error al obtener el dato "+i+".");
	  	}	  	
	  }
	});
}
function botonAlumnos(){
	require('electron').remote.getGlobal('infoLlamadasApi').materia=vectorGrupos[this.id].clavemateria;
	require('electron').remote.getGlobal('infoLlamadasApi').grupo=vectorGrupos[this.id].grupo;
	PantallaDeAlumnos = new BrowserWindow({width:320,height:425});
	PantallaDeAlumnos.loadURL(url.format({
		pathname: path.join(__dirname,'listaAlumnos.html'),
		protocol: 'file',
		slashes: true
	}))
	PantallaDeAlumnos.show();
}
$("body").on("click", "li > button",botonAlumnos);
inicia();