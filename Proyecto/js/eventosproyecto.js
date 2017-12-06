var inicia = function(){
	var entrada = function(){
		var usuario = $("#txtUsuario").val();
		var clave   = $("#txtClave").val();
		var parametros="opc=valida"+
					   "&usuario="+usuario+
					   "&clave="+clave+
					   "&id="+Math.random();
		$.ajax({
			 url:"php/entrada.php",
			 dataType: 'json', //retorno
			 type: "POST", //lo que enviamos
			 data:parametros,
			 success:function(data){
			 	if(data.respuesta == true){
			 		// alert("Bienvenido "+data.nombre);
			 		$("main").load("menu.html");
			 	}else{
			 		alert("Usuario y/o clave incorrectos");
			 	}
			 },
			 error:function(a,b,c){
			 	alert("No se pudo conectar al server");
			 }
		});
	}
	$("#btnEntrar").on("click",entrada);
}
$(document).ready(inicia);