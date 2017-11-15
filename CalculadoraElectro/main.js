

const app=require('electron').app; //necesito un acceso al paquete electron y a la aplicación.
const BrowserWindow = require('electron').BrowserWindow; //Da acceso al sistema de pantallas del SO (Windowsm LINUX ó MAC).
const path=require('path');//Muestra la ruta del archivo.
const url=require('url');//Carga una página.
//ECMASCRIPT=6
let PantallaPrincipal;/*let-->inicializa la constante que despues obtendra el valor el cual no cambiara por ser constante.*/

function muestraPantallaPrincipal(){
		PantallaPrincipal=new BrowserWindow({width:800, height:700});
		PantallaPrincipal.loadURL(url.format({
			//join --> concatena cadenas.
			pathname: path.join(__dirname, 'index1.html'),
			protocol: 'file',//tipo de archivo.
			slashes: true //diagonales normales.
		}))
		PantallaPrincipal.show();
}

app.on('ready', muestraPantallaPrincipal)//enciende la aplicación