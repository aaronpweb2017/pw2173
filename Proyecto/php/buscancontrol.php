<?php
	include 'conexion.php';
	include 'utileria.php';

	function buscaNcontrol(){
		$respuesta=false;
		$conexion=conectaBD();
		$ncontrol=GetSQLValueString($_POST["ncontrol"],"text");
		//Consulta:
		$consulta=sprintf("select * from alumnos where ncontrol=%s limit 1",$ncontrol);
		$resConsulta=mysqli_query($conexion,$consulta);
		$nombre="";
		$carrera=0;
		$clave="";
		if(mysqli_num_rows($resConsulta) > 0){
			$respuesta=true;
			if($registro=mysqli_fetch_array($resConsulta)){
				$nombre=$registro["nombre"];
				$carrera=$registro["carrera"];
				$clave=$registro["clave"];
			}
		}
		$salida=array('respuesta' => $respuesta,
						'nombre' => $nombre,
						'carrera' => $carrera,
						'clave' => $clave);
		print json_encode($salida);//se manda la salida al js...
	}
	$opc=$_POST["opc"];
	switch ($opc) {
		case 'buscaNcontrol':
			buscaNcontrol();
			break;
		
		default:
			# code...
			break;
		}
?>