const app=require('electron').app; 
const BrowserWindow = require('electron').BrowserWindow;
const path=require('path');
const url=require('url');

//Constantes para PDF:
const electron=require('electron');
const fs=require('fs');
const os = require('os');
const ipc=electron.ipcMain;
const shell=electron.shell;

let PantallaPrincipal;

global.infoLlamadasApi={
	usuario: '',
	usuariovalida: '',
	periodoactual: '',
	materia: '',
	grupo: '',
	ncontrol: '',
	incidencia: ''
}
function muestraPantallaPrincipal(){
		PantallaPrincipal=new BrowserWindow({width:530, height:577});
		PantallaPrincipal.loadURL(url.format({
			//join --> concatena cadenas.
			pathname: path.join(__dirname, 'index.html'),
			protocol: 'file',//tipo de archivo.
			slashes: true //diagonales normales.
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
app.on('ready', muestraPantallaPrincipal)//enciende la aplicación