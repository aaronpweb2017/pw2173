// const app=require('electron').app;
// const BrowserWindow=require('electron').BrowserWindow;
const {app,BrowserWindow} = require('electron');
const path = require('path'); //Muestra la ruta del archivo
const url = require('url'); //Carga una página
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

app.on('ready',muestraPantallaPrincipal);