const {BrowserWindow}=require('electron').remote;
const app=require('electron').app;
const path=require('path');
const url=require('url');
const $ = require('jquery');
//Variables anteriores para la última llamada a la API:
var nombreUsuario="";
var UsuarioValida="";
var periodo="";
var Materia="";
var Grupo=""; 
//Constantes para llamar al PDF (para mostrar el contenido de listaAlumnos.html):
const ipc=require('electron').ipcRenderer
const botonPDF=document.getElementById('btnAlumnosPDF')
botonPDF.addEventListener('click',function(event){
	botonPDF.style.display="none"  
	ipc.send('print-to-pdf')
})
function datosAlumno(NoControl,nombreCompleto,incidencia){
	this.NoControl=NoControl;
	this.nombreCompleto=nombreCompleto;
	this.incidencia=incidencia;
}
var vectorAlumnos=new Array(50);//No hay más de 50 alumnos por grupo.
function iniciaListaAlumnos()
{
	nombreUsuario=require('electron').remote.getGlobal('infoLlamadasApi').usuario;
	UsuarioValida=require('electron').remote.getGlobal('infoLlamadasApi').usuariovalida;
	periodo=require('electron').remote.getGlobal('infoLlamadasApi').periodoactual;
	Materia=require('electron').remote.getGlobal('infoLlamadasApi').materia;
	Grupo=require('electron').remote.getGlobal('infoLlamadasApi').grupo; 
	$.ajax({
	  url: 'http://itculiacan.edu.mx/dadm/apipaselista/data/obtienealumnos2.php?usuario='+nombreUsuario+'&usuariovalida='+UsuarioValida+'&periodoactual='+periodo+'&materia='+Materia+'&grupo='+Grupo,
	  dataType: 'json',
	  success: function(data) {
	  	var NoControl="";
	  	var nombreCompleto="";
	  	var resultado="";
	  	var incidencia=0;
	  	for(var i=1;i<data.alumnos[0].cantidad;i++){
	  		NoControl=data.alumnos[i].ncontrol;
	  		nombreCompleto= data.alumnos[i].apellidopaterno+" "+data.alumnos[i].apellidomaterno+" "+data.alumnos[i].nombre;
	  		resultado="<li>No. Control: "+NoControl+"<br>Nombre: "+nombreCompleto+
	  		"<br><input id='"+i+"' type='button' value='A'><input id='"+i+"' type='button' value='F'></li>";
	  		$("#lstAlumnos").append(resultado);
	  		vectorAlumnos[i]=new datosAlumno(NoControl,nombreCompleto,incidencia);
	  	}
	  	//Diseño (CSS) de los elementos en tiempo de ejecución:	
	  	$("#lstAlumnos").css({
	  		'background':'#37474F',
	  		'border-radius':'5px',
	  		'box-shadow': '10px 10px 5px #455A64'
	  	});
	  	$("#lstAlumnos > li").css({
	  		'color': 'black',
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
function determinaIncidencia(){
	if(this.value=="A") //Asistencia.
	 	vectorAlumnos[this.id].incidencia=1;
	else //Falta.
	 	vectorAlumnos[this.id].incidencia=2;
	require('electron').remote.getGlobal('infoLlamadasApi').ncontrol=vectorAlumnos[this.id].NoControl;
	require('electron').remote.getGlobal('infoLlamadasApi').incidencia=vectorAlumnos[this.id].incidencia;
	alert("El alumno con No. Control "+require('electron').remote.getGlobal('infoLlamadasApi').ncontrol
		+" tiene una incidencia="+require('electron').remote.getGlobal('infoLlamadasApi').incidencia);
}
$("body").on("click", "li > input",determinaIncidencia);
iniciaListaAlumnos();