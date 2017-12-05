var inicia = function(){
	var entrada = function(){
		//Los datos que van a ir de entrada:
		var usuario = $("#txtUsuario").val();
		var clave   = $("#txtClave").val();
		var parametros="opc=valida"+
					   "&usuario="+usuario+
					   "&clave="+clave+
					   "&id="+Math.random();
		$.ajax({
			 url:"php/entrada.php",
			 dataType: 'json', //Tipo de datos de retorno (lo que se desea obtener).
			 type: "POST", //lo que enviamos...
			 data:parametros, //los que se mandan por Host...
			 success:function(data){
			 	if(data.respuesta == true){
			 		alert("¡Bienvenido!");
			 	}else{
			 		alert("Usuario o Clave incorrectos.");
			 	}
			 },
			 error:function(a,b,c){
			 	alert("No se pudo conectar al servidor...");
			 }
		});
	}
	$("#btnEntrar").on("click",entrada);
}
$(document).ready(inicia); //incializa JQuery.