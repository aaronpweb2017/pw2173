const {BrowserWindow} = require('electron').remote;
const app = require('electron').app;
const $ = require('jquery');
//Constantes para llamar al PDF:
const ipc=require('electron').ipcRenderer
const botonPDF=document.getElementById('btnPDF')
//Se activa el evento click del botón btnPDF:
botonPDF.addEventListener('click',function(event){
	//desaparece el botón antes de que aparezca el PDF:
	botonPDF.style.display="none" 
	ipc.send('print-to-pdf')
})

var nombre=require('electron').remote.getGlobal('infoUsuarios').nombre;
var genero=require('electron').remote.getGlobal('infoUsuarios').genero;
var foto=require('electron').remote.getGlobal('infoUsuarios').foto;
var direccion=require('electron').remote.getGlobal('infoUsuarios').direccion;
var telefono=require('electron').remote.getGlobal('infoUsuarios').telefono;

$("#idNombre").html(nombre);
$("#idGenero").html(genero);
$("#idDireccion").html(direccion);
$("#idTelefono").html(telefono);
$("#idFoto").attr("src", foto);