const {BrowserWindow}=require('electron').remote;
const app=require('electron').app;
const path=require('path');
const url=require('url');
const $ = require('jquery');
//Muestra la siguiente Pantalla:
let PantallaDeAlumnos;
//Variables anteriores para la siguiente llamada a la API:
var nombreUsuario="";
var UsuarioValida="";
var periodo="";
//Constantes para llamar al PDF (para mostrar el contenido de grupos.html):
const ipc=require('electron').ipcRenderer
const botonPDF=document.getElementById('btnGruposPDF')
botonPDF.addEventListener('click',function(event){
	botonPDF.style.display="none" 
	ipc.send('print-to-pdf')
})
//Clase de objetos tipo grupo:
function datosGrupo(clavemateria,grupo){
	this.clavemateria=clavemateria;
	this.grupo=grupo;
}
//Vector o arreglo de los grupos a mostrar:
var vectorGrupos=new Array(3); //Hay solo 3 grupos???.
//Muestra los grupos del usuario ingresado en la llamada anterior.
function iniciaListaGrupos()
{
	//Asignando a las variables (locales) los valores de las... 
	//...variables (globales) de la llamada anterior para la siguiente llamada:
	nombreUsuario=require('electron').remote.getGlobal('infoLlamadasApi').usuario;
	UsuarioValida=require('electron').remote.getGlobal('infoLlamadasApi').usuariovalida;
	periodo=require('electron').remote.getGlobal('infoLlamadasApi').periodoactual;
	$.ajax({
		//Concatenando a la URL actual los valores de la URL anterior:
	  url: 'http://itculiacan.edu.mx/dadm/apipaselista/data/obtienegrupos2.php?usuario='
	  +nombreUsuario+'&usuariovalida='+UsuarioValida+'&periodoactual='+periodo,
	  dataType: 'json',
	  success: function(data) {
	  	//Variables de los grupos a mostrar en la UL lstGrupos: 
	  	var nombreMateria = "";
	  	var clavemateria="";
	  	var grupo="";
	  	var resultado="";
	  	//Muestra los datos de los grupos:
	  	for(var i=1;i<4;i++){
	  		nombremateria=data.grupos[i].materia;
	  		clavemateria = data.grupos[i].clavemateria;
	  		grupo= data.grupos[i].grupo;
	  		//Concatenando los datos anteriores:
	  		resultado="<li>nombreMateria: "+nombremateria+"<br> clavemateria: "
	  		+clavemateria+"<br>ClaveGrupo: "
	  		+grupo+"<button id='"+i+"'>Alumnos</button></li>";
	  		//Insertando los datos del grupo "i" en la lista:
	  		$("#lstGrupos").append(resultado);
	  		//Guardando los datos del grupo (clavemateria,grupo) en el arreglo de grupos:
	  		vectorGrupos[i]=new datosGrupo(clavemateria,grupo);
	  	}	  	
	  }
	});
}
////Muestra la siguiente pantalla (listaAlumnos.html):
function botonAlumnos(){
	//Asignando los valores a las variables globales para la siguiente llamada:
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
iniciaListaGrupos();
