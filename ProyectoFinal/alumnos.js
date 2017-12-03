const {BrowserWindow}=require('electron').remote;
const app=require('electron').app;
const path=require('path');
const url=require('url');
const $ = require('jquery');
//Variables de la llamada anterior para la siguiente llamada a la API:
var nombreUsuario="";
var UsuarioValida="";
var periodo="";
var Materia="";
var Grupo=""; 
//Constantes para llamar al PDF (para mostrar el contenido de la ventana actual):
const ipc=require('electron').ipcRenderer
const botonPDF=document.getElementById('btnAlumnosPDF')
botonPDF.addEventListener('click',function(event){
	botonPDF.style.display="none"
	desapareceBotones(); textoNegritas();
	ipc.send('print-to-pdf')
})
//Desaparece los botones de la lista de alumnos (creados en tiempo de ejecución):
function desapareceBotones(){
	$("#lstAlumnos > li > input").css({
		'display':'none'
	});
}
//Texto en negritas de la lista de alumnos:
function textoNegritas(){
	$("#lstAlumnos > li").css({
		'color': 'black'
	});
}
//Clase de objetos tipo alumno:
function datosAlumno(NoControl,nombreCompleto,incidencia){
	this.NoControl=NoControl;
	this.nombreCompleto=nombreCompleto;
	this.incidencia=incidencia;
}
//Arreglo de los alumnos a mostrar:
var arregloAlumnos=new Array(30);
//Muestra los alumnos del grupo seleccionado en la llamada anterior:
function iniciaListaAlumnos()
{
	//Asignando a las variables (locales) los valores de las... 
	//...variables (globales) de la llamada anterior para la llamada actual:
	nombreUsuario=require('electron').remote.getGlobal('infoLlamadasApi').usuario;
	UsuarioValida=require('electron').remote.getGlobal('infoLlamadasApi').usuariovalida;
	periodo=require('electron').remote.getGlobal('infoLlamadasApi').periodoactual;
	Materia=require('electron').remote.getGlobal('infoLlamadasApi').materia;
	Grupo=require('electron').remote.getGlobal('infoLlamadasApi').grupo; 
	$.ajax({
	  url: 'http://itculiacan.edu.mx/dadm/apipaselista/data/obtienealumnos2.php?usuario='+nombreUsuario+'&usuariovalida='+UsuarioValida+'&periodoactual='+periodo+'&materia='+Materia+'&grupo='+Grupo,
	  dataType: 'json',
	  success: function(data) {
	  	//Variables de los alumnos a mostrar: 
	  	var NoControl="";
	  	var nombreCompleto="";
	  	var resultado="";
	  	var incidencia=0;
	  	//Muestra los datos de los alumnos:
	  	for(var i=1;i<data.alumnos[0].cantidad;i++){
	  		NoControl=data.alumnos[i].ncontrol;
	  		nombreCompleto= data.alumnos[i].apellidopaterno+" "+data.alumnos[i].apellidomaterno+" "+data.alumnos[i].nombre;
	  		/*Insertando los datos del alumno "i" en una li*/
	  		resultado="<li>No. Control: "+NoControl+"<br>Nombre: "+nombreCompleto+
	  		"<br><input id='"+i+"' type='button' value='A'><input id='"+i+"' type='button' value='F'></li>";
	  		//Insertando la li que contiene los datos del alumno "i" en la lista de alumnos (ol):
	  		$("#lstAlumnos").append(resultado);
	  		arregloAlumnos[i]=new datosAlumno(NoControl,nombreCompleto,incidencia);
	  	}
	  	//Diseño (CSS) de los elementos de la ventana actual (en tiempo de ejecución):
	  	$("#lstAlumnos").css({
	  		'background':'#37474F',
	  		'border-radius':'10px',
	  		'box-shadow': '10px 10px 5px #455A64'
	  	});
	  	$("#lstAlumnos > li").css({
	  		'border-radius':'5px',
	  		'background':'#37474F',
	  		'font-size':'1.1em',
	  		'color':'#ECEFF1'
	  	});
	  	$("#lstAlumnos > li > input").css({
	  		'font-family': 'arial',
	  		'font-size':'1.1em',
	  		'background':'#263238',
	  		'border-radius':'5px',
	  		'text-align':'center',
	  		'color':'#ECEFF1'	
	  	});	 	  	
	  }
	});
}
/*Muestra la incidencia asiganada al alumno seleccionado:*/
function determinaIncidencia(){
	if(this.value=="A") //Asistencia...
	 	arregloAlumnos[this.id].incidencia=1;
	else //Falta...
	 	arregloAlumnos[this.id].incidencia=2;
	//Asignando los valores de las variables de la llamada actual a las variables globales para la siguiente llamada:
	require('electron').remote.getGlobal('infoLlamadasApi').ncontrol=arregloAlumnos[this.id].NoControl;
	require('electron').remote.getGlobal('infoLlamadasApi').incidencia=arregloAlumnos[this.id].incidencia;
	//Mostrando la incidencia del alumno seleccionado con su número de control:
	alert("El alumno con No. Control "+require('electron').remote.getGlobal('infoLlamadasApi').ncontrol
		+" tiene una incidencia="+require('electron').remote.getGlobal('infoLlamadasApi').incidencia);
}
$("body").on("click", "li > input",determinaIncidencia);
iniciaListaAlumnos();