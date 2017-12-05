<?php
	function conectaBD(){
		//recibe la llave que se solicita al servidor.
		//parámetros: servidor, usuario, contraseña, bd
		$conexion=mysqli_connect("localhost","root","","pw2173");
		return $conexion;
	}
?>