const {BrowserWindow}=require('electron').remote;
const app=require('electron').app;
const path=require('path');
const url=require('url');
const $ = require('jquery');
//Siguiente Pantalla...
let PantallaDeAlumnos;
//Variables de la llamada anterior para la siguiente llamada a la API:
var nombreUsuario="";
var UsuarioValida="";
var periodo="";
//Constantes para llamar al PDF (para mostrar el contenido de la ventana actual):
const ipc=require('electron').ipcRenderer
const botonPDF=document.getElementById('btnGruposPDF')
botonPDF.addEventListener('click',function(event){
	botonPDF.style.display="none"
	desapareceBotones(); textoNegritas();
	ipc.send('print-to-pdf')
})
//Desaparece los botones de la lista de grupos (creados en tiempo de ejecución):
function desapareceBotones(){
	$("#lstGrupos > li > button").css({
		'display':'none'
	});	
}
//Texto en negritas de la lista de grupos:
function textoNegritas(){
	$("#lstGrupos > li").css({
		'color': 'black'
	});
}
//Clase de objetos tipo grupo:
function datosGrupo(clavemateria,grupo){
	this.clavemateria=clavemateria;
	this.grupo=grupo;
}
//Arreglo de los grupos a mostrar:
var arregloGrupos=new Array(3);
//Muestra los grupos del usuario ingresado en la llamada anterior.
function iniciaListaGrupos()
{
	//Asignando a las variables (locales) los valores de las... 
	//...variables (globales) de la llamada anterior para la llamada actual:
	nombreUsuario=require('electron').remote.getGlobal('infoLlamadasApi').usuario;
	UsuarioValida=require('electron').remote.getGlobal('infoLlamadasApi').usuariovalida;
	periodo=require('electron').remote.getGlobal('infoLlamadasApi').periodoactual;
	$.ajax({
	  //Concatenando a la URL actual los valores de las variables de la llamada anterior:
	  url: 'http://itculiacan.edu.mx/dadm/apipaselista/data/obtienegrupos2.php?usuario='
	  +nombreUsuario+'&usuariovalida='+UsuarioValida+'&periodoactual='+periodo,
	  dataType: 'json',
	  success: function(data) {
	  	//Variables de los grupos a mostrar: 
	  	var nombreMateria = "";
	  	var clavemateria="";
	  	var grupo="";
	  	var resultado="";
	  	//Muestra los datos de los grupos:
	  	for(var i=1;i<4;i++){
	  		nombremateria=data.grupos[i].materia;
	  		clavemateria=data.grupos[i].clavemateria;
	  		grupo=data.grupos[i].grupo;
	  		/*Insertando los datos del grupo "i" en una li*/
	  		resultado="<li>Materia: "+nombremateria+"<br> ClaveMateria: "
	  		+clavemateria+"<button id='"+i+"'>Alumnos</button><br>Grupo: "+grupo+"</li>";
	  		//Insertando la li que contiene los datos del grupo "i" en la lista de grupos (ol):
	  		$("#lstGrupos").append(resultado);
	  		//Guardando los datos del grupo en el arreglo de grupos:
	  		arregloGrupos[i]=new datosGrupo(clavemateria,grupo);
	  	}
	  	//Diseño (CSS) de los elementos de la ventana actual (en tiempo de ejecución):
	  	$("#lstGrupos").css({
	  		'background':'#37474F',
	  		'border-radius':'10px',
	  		'box-shadow': '10px 10px 5px #455A64'
	  	});
	  	$("#lstGrupos > li").css({
	  		'border-radius':'5px',
	  		'background':'#37474F',
	  		'font-size':'1.1em',
	  		'color':'#ECEFF1'
	  	});
	  	$("#lstGrupos > li > button").css({
	  		'font-family': 'arial',
	  		'font-size':'1.1em',
	  		'background':'#263238',
	  		'border-radius':'5px',
	  		'text-align':'center',
	  		'color':'#ECEFF1',
	  		'margin-left':'85px'
	  	});	  	
	  }
	});
}
////Muestra la siguiente pantalla (listaAlumnos.html):
function botonAlumnos(){
	//Asignando los valores de las variables de la llamada actual a las variables globales para la siguiente llamada:
	require('electron').remote.getGlobal('infoLlamadasApi').materia=arregloGrupos[this.id].clavemateria;
	require('electron').remote.getGlobal('infoLlamadasApi').grupo=arregloGrupos[this.id].grupo;
	PantallaDeAlumnos = new BrowserWindow({width:320,height:425});
	PantallaDeAlumnos.loadURL(url.format({
		pathname: path.join(__dirname,'alumnos.html'),
		protocol: 'file',
		slashes: true
	}))
	PantallaDeAlumnos.show();
}
$("body").on("click", "li > button",botonAlumnos);
iniciaListaGrupos();