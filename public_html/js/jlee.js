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
	LeeDocsJ(dibDocs);
	$("#texto").val('');
	$("#texto").hide();
}

function dibDocs(datos)
{
	llenaSelector(datos, "docs");
}

function docSel()
{
	iddoc = $('#docs').val();
	if (iddoc) {		
		LeeDocJ(iddoc, dibTexto);
		$("#busy").show();
	}
}

function dibTexto(datos)
{
	if (datos) {
		gtexto = datos;
		var userLang = navigator.language || navigator.userLanguage; 
		$("#busy").hide();
		$("#texto").val(gtexto);
		$("#texto").show();
	}
}
