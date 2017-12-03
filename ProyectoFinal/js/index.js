const {BrowserWindow}=require('electron').remote;
const app=require('electron').app;
const path=require('path'); 
const url=require('url');
const $ = require('jquery');
//Siguiente Pantalla...
let ventanaGrupos;
//Variables para la primer llamada a la API:
var nombreUsuario="";
var claveUsuario="";
//Funciones del diseño de algunos elementos:
function spnNitoUser(){
	$("#spanUserName").css({
	  	'color': 'black'
	});
}
function spnNitoPass(){
	$("#spanUserPass").css({
	  	'color': 'black'
	  });
}
//Muestra la siguiente pantalla (grupos.html):
function abreGrupos(){
	ventanaGrupos = new BrowserWindow({width: 500, height: 500});
	ventanaGrupos.loadURL(url.format({
		pathname: path.join(__dirname, 'grupos.html'),
		protocol: 'file',
		slashes: true
	}))
	ventanaGrupos.show();
}
//Función que llama a la función que abre la siguiente pantalla.
function respuestaInicio(){
	if(document.getElementById("inpUserName").value=="" || document.getElementById("inpUserPass").value=="")
		return alert("Faltan datos por ingresar.");
	//Asignando a las variables los datos del usuario para la petición a la API:
	nombreUsuario=document.getElementById("inpUserName").value;
	claveUsuario=document.getElementById("inpUserPass").value;
	$.ajax({	
	  //Concatenando a la URL actual los valores de las variables para la peticón:
	  url: 'http://itculiacan.edu.mx/dadm/apipaselista/data/validausuario.php?usuario='+nombreUsuario+'&clave='+claveUsuario,
	  dataType: 'json',
	  success: function(data) {
	  	if(data.respuesta==true){
	  		//Asignando los valores a las variables globales para las llamadas subsecuentes:
			require('electron').remote.getGlobal('infoLlamadasApi').usuario=nombreUsuario;
			require('electron').remote.getGlobal('infoLlamadasApi').usuariovalida=data.usuariovalida;
			require('electron').remote.getGlobal('infoLlamadasApi').periodoactual=data.periodoactual;
			abreGrupos(); return; //Abre los grupos del usuario (profesor) que ingresó.
		}
		alert("Usuario ó contraseña Incorrectos... Respuesta: "+data.respuesta);
	  }
	});
}