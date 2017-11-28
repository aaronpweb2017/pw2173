const app=require('electron').app; 
const BrowserWindow = require('electron').BrowserWindow;
const path=require('path');
const url=require('url');
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
app.on('ready', muestraPantallaPrincipal)//enciende la aplicación