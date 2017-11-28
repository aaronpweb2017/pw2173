const {BrowserWindow}=require('electron').remote;
const app=require('electron').app;
const path=require('path'); 
const url=require('url');
const $ = require('jquery');

let ventanaGrupos;

var nombreUsuario="";
var claveUsuario="";

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
	if(document.getElementById("inpUserName").value=="" || document.getElementById("inpUserPass").value=="")
		return alert("Faltan datos por ingresar...");
	nombreUsuario=document.getElementById("inpUserName").value;
	claveUsuario=document.getElementById("inpUserPass").value;
	$.ajax({	
	  url: 'http://itculiacan.edu.mx/dadm/apipaselista/data/validausuario.php?usuario='+nombreUsuario+'&clave='+claveUsuario,
	  dataType: 'json',
	  success: function(data) {
	  	$("#artAnswer").html("Respuesta: "+data.respuesta); 
	  	if(data.respuesta==true){
			require('electron').remote.getGlobal('infoLlamadasApi').usuario=nombreUsuario;
			require('electron').remote.getGlobal('infoLlamadasApi').usuariovalida=data.usuariovalida;
			require('electron').remote.getGlobal('infoLlamadasApi').periodoactual=data.periodoactual;
			abreGrupos(); return;
		}
		alert("Usuario ó contraseña Incorrectos...");
	  }
	});
}