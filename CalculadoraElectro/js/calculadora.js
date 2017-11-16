//Constantes de electron:
const {BrowserWindow}=require('electron').remote
const app=require('electron').app
const path=require('path') //ruta del sistema de archivos.
const url=require('url') //ruta del URL para cargar la página

//Otra ventana:
let ventanaCalcCient;

function cacluladoraCientifica(){
	ventanaCalcCient = new BrowserWindow({width: 500, height: 500});
	ventanaCalcCient.loadURL(url.format({
		pathname: path.join(__dirname, 'CalculadoraCientifica.html'),
		protocol: 'file',
		slashes: true
	}))
	ventanaCalcCient.webContents.openDevTools(); //para ver los errores.
	ventanaCalcCient.show();
}
//variable global (está declarada arriba de todas las funciones y
//se puede mandar llamar de todas las funciones).
var operador=""; 
function numeros(num){
	if(operador==""){//operando1.
		var valorInicial=document.calculadora.operando1.value;
		if(valorInicial==0)
			document.calculadora.operando1.value="";
		//también se sigue la jerarquía de los elementos.
		//le concatena los valores de num con los del operando1
		document.calculadora.operando1.value=document.calculadora.operando1.value + num;
	}
	else{//operando2.
		var valorInicial=document.calculadora.operando2.value;
		if(valorInicial==0)
			document.calculadora.operando2.value="";
		document.calculadora.operando2.value=document.calculadora.operando2.value + num;
	}
}
function operadores(ope){
	operador=ope;
}
function igual(){
	var valor1=document.calculadora.operando1.value;
	var valor2=document.calculadora.operando2.value;
	document.calculadora.resultado.value=eval(valor1+operador+valor2);
}
function borrar(){
	operador=""; 
	document.calculadora.operando1.value=0;
	document.calculadora.operando2.value=0;
	document.calculadora.resultado.value=0;
}