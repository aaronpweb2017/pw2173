<?php
	function conectaBD(){
		//servidor,usuario,contraseña,base de datos
		$conexion=mysqli_connect("localhost","root","","pw2173");
		return $conexion;
	}
?>