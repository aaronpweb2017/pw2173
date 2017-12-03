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
//Pantalla principal a mostrar:
let PantallaPrincipal;
//Variables globales para las peticiones a la API:
global.infoLlamadasApi={
	usuario: '',
	usuariovalida: '',
	periodoactual: '',
	materia: '',
	grupo: '',
	ncontrol: '',
	incidencia: ''
}
//Muestra la pantalla principal (index.html):
function muestraPantallaPrincipal(){
		PantallaPrincipal=new BrowserWindow({width:530, height:620});
		PantallaPrincipal.loadURL(url.format({
			pathname: path.join(__dirname, 'index.html'),
			protocol: 'file',
			slashes: true
		}))
		//PantallaPrincipal.webContents.openDevTools();
		PantallaPrincipal.show();
}
//Evento para imprimir a PDF (declaración):
ipc.on('print-to-pdf',function(event){
	const pdfPath=path.join(os.tmpdir(),'print.pdf')
	const win=BrowserWindow.fromWebContents(event.sender)
	win.webContents.printToPDF({},function(error,data){
		if(error) throw error
		fs.writeFile(pdfPath,data,function(error){
			if(error){
				throw error
			}
			shell.openExternal('file://'+pdfPath)
			win.close()	
		})
	})
});
app.on('ready', muestraPantallaPrincipal)