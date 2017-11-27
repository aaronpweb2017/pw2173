const {BrowserWindow}=require('electron').remote;
const app=require('electron').app;
const path=require('path'); 
const url=require('url');
const $ = require('jquery');
let ventanaGrupos;
function abreGrupos(){
	ventanaGrupos = new BrowserWindow({width: 500, height: 500});
	ventanaGrupos.loadURL(url.format({
		pathname: path.join(__dirname, 'grupos.html'),
		protocol: 'file',
		slashes: true
	}))
	ventanaGrupos.show();
}
function respuestaInicio(){
	$.ajax({
	  url: 'http://itculiacan.edu.mx/dadm/apipaselista/data/validausuario.php?usuario=920&clave=12345678',
	  dataType: 'json',
	  success: function(data) {
	  	$("#artAnswer").html("Respuesta: "+data.respuesta);
	  	$("#artUsuarioValida").html("Usuario Válida: "+data.usuariovalida);
	  	$("#artPeriodo").html("Periodo Actual: "+data.periodoactual);
	 	//document.getElementById("artAnswer").innerHTML = Respuesta: "+data.respuesta;
	 	//document.getElementById("artUsuarioValida").innerHTML = "Usuario Válida: "+data.usuariovalida;
	 	//document.getElementById("artPeriodo").innerHTML = "Periodo Actual: "+data.periodoactual;
	  }
	});
}