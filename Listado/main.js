// const app=require('electron').app;
// const BrowserWindow=require('electron').BrowserWindow;
const {app,BrowserWindow} = require('electron');
const path = require('path'); //Muestra la ruta del archivo
const url = require('url'); //Carga una página
//Constantes para PDF:
const electron=require('electron');
const fs=require('fs');//Sistema de archivos de la PC.
const os = require('os');//Acceso al sistema operativo.
//Para declarar una función remota (IPC's):
const ipc=electron.ipcMain;//llamada a un prodecimiento interno.,
//Para abrir el archivo PDF se debe acceder a la terminal (línea de comandos):
const shell=electron.shell; //llamando a la terminal del OS (Operative System).


// ECMASCRIPT = 6
let PantallaPrincipal;
//objeto global para compartir datos entre pantallas:
global.infoUsuarios={
	nombre: '',
	genero: '',
	foto: '',
	direccion: '',
	telefono: ''
}
function muestraPantallaPrincipal(){
	PantallaPrincipal = new BrowserWindow({width:320,height:425});
	PantallaPrincipal.loadURL(url.format({
		pathname: path.join(__dirname,'index.html'),
		protocol: 'file',
		slashes: true
	}))
	//PantallaPrincipal.webContents.openDevTools();
	PantallaPrincipal.show();
}
//Evento para PDF (declaración): join --> para unir cadenas.
ipc.on('print-to-pdf',function(event){ //Se trae la ventana y extrae su contenido.
	const pdfPath=path.join(os.tmpdir(),'print.pdf')//uniendo la ruta con el nombre del archivo.
	//obteniendo el contenido web de la ventana que se desea imprimir:
	const win=BrowserWindow.fromWebContents(event.sender)
	win.webContents.printToPDF({},function(error,data){
		if(error) throw error
		fs.writeFile(pdfPath,data,function(error){
			if(error){
				throw error//si hay error lanza el mismo.
			}
			//si todo sale bien abre el archivo construido.
			shell.openExternal('file://'+pdfPath)
			win.close()	
		})
	})
});

app.on('ready',muestraPantallaPrincipal);

		

