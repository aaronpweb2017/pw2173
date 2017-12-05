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
			 data:parametros, //los que se mandan por Host...
			 type: "POST", //lo que enviamos...
			 
			 success:function(data){
			 	if(data.respuesta == true){
			 		// alert("¡Bienvenido!"+data.nombre+".");
			 		$("main").load("menu.html");
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