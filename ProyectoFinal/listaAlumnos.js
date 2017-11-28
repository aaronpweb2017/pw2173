const {BrowserWindow}=require('electron').remote;
const app=require('electron').app;
const path=require('path');
const url=require('url');
const $ = require('jquery');

function iniciaListaAlumnos()
{
	var nombreUsuario=require('electron').remote.getGlobal('infoLlamadasApi').usuario;
	var UsuarioValida=require('electron').remote.getGlobal('infoLlamadasApi').usuariovalida;
	var periodo=require('electron').remote.getGlobal('infoLlamadasApi').periodoactual;
	var Materia=require('electron').remote.getGlobal('infoLlamadasApi').materia;
	var Grupo=require('electron').remote.getGlobal('infoLlamadasApi').grupo; 
	$.ajax({
	 //Ejemplo:// url: 'http://itculiacan.edu.mx/dadm/apipaselista/data/obtienealumnos2.php?usuario=920&usuariovalida=49nc8Eznl4dnU&periodoactual=2173&materia=AEB1055&grupo=8B',
	  url: 'http://itculiacan.edu.mx/dadm/apipaselista/data/obtienealumnos2.php?usuario='+nombreUsuario+'&usuariovalida='+UsuarioValida+'&periodoactual='+periodo+'&materia='+Materia+'&grupo='+Grupo,
	  dataType: 'json',
	  success: function(data) {
	  	var NoControl="";
	  	var nombreCompleto="";
	  	var resultado="";
	  	for(var i=1;i<data.alumnos[0].cantidad;i++){
	  		//if(data.respuesta==true){
	  			NoControl=data.alumnos[i].ncontrol;
	  			nombreCompleto= data.alumnos[i].apellidopaterno+" "+data.alumnos[i].apellidomaterno+" "+data.alumnos[i].nombre;
	  			resultado="<li>No. Control: "+NoControl+"<br>Nombre: "+nombreCompleto+
	  			"<br><input id='A' type='button' value='A'><input id='F' type='button' value='F'></li>";
	  			$("#lstAlumnos").append(resultado);
	  		//}
	  		//else
	  			//alert("Error al obtener el dato "+i+".");
	  	}	  	
	  }
	});
}
function determinaIncidencia(){
	if(this.value=="A"){
		require('electron').remote.getGlobal('infoLlamadasApi').incidencia=1;
		alert("ASISTENCIA.");
	}
	else{
		require('electron').remote.getGlobal('infoLlamadasApi').incidencia=2;
		alert("FALTA.");
	}	
}
$("body").on("click", "li > input",determinaIncidencia);
iniciaListaAlumnos();