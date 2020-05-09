/**
 * @author botpi
 */

function inicio()
{
	// encabezado = getCookie("encabezado");
	encabezado = localStorage.getItem("encabezado");
	idtexto = 1;
	if (encabezado==null || encabezado=="")
		encabezado="'',''";
	leeServidor();
}

function verArchivo()
{
	var input = document.getElementById("uploadfile");
	var file = input.files[0];
	var cad = file.name.split('.');
	if (cad[1].toLowerCase() == 'pdf') {		
		var a = encabezado.split(','), num=5;	
		$('#subir').attr('action', 'http://142.93.52.198:8083/uploadfile');
		$("#num").val(randomInt(10000));
		$("#enviar").show();
		$("#enviar").focus();
	}
	else
		$("#enviar").hide();
}

function upload()
{
  	$("#endupload").attr("onload",'enduploadf();');
  	$("#busy").show();
}

function enduploadf(datos)
{
	$("#busy").hide();
	LeeUltTextoJ($("#num").val(), escribeTexto);
	//window.location.assign("cli.html");//reload();
}

function escribeTexto(datos)
{
	var texto = datos[0];
	/*texto = texto.split('\r\n').join('<br />'); // replace all*/
	$("#texto").show();
	$("#texto1").show();
	$("#texto").val(texto.texto);
	$("#texto1").val(texto.textoc);
}

