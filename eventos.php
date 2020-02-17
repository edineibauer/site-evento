<html lang="pt-br">
<head>
    <meta charset="UTF-8">
	<meta name="robots" content="index, follow">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title id="core-title">Eventos Unesc</title>
	<link rel="shortcut icon" href="assetsPublic/img/favicon.png">
	<link rel="stylesheet" href="assetsPublic/core.min.css">
	<link rel="stylesheet" href="public/assets/eventos.css">
	<link rel="stylesheet" href="assetsPublic/fonts.min.css">

	<script>
		let isEdge = window.navigator.userAgent.indexOf("Edge") > -1 || /MSIE 10/i.test(navigator.userAgent) || /MSIE 9/i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent);
		const SERVICEWORKER = !1;
		const HOME = '';
		const PUBLICO = 'libs/ueb/site-evento/public/';
		const DOMINIO = 'site-evento';
		const VERSION = 1.07;
		const DEV = '1';
		const VENDOR = 'libs/ueb/';
		const HOMEPAGE = '0';
		const THEME = '#009688';
		const THEMETEXT = '#fff';
		const TITLE = 'Eventos Unesc';
		const LOGO = '';
		const FAVICON = 'uploads/site/calendario.png';
		const LIMITOFFLINE = '200';
		const PUSH_PUBLIC_KEY = '';
		const USER = JSON.parse('{"id":"1","nome":"Admin","imagem":"","status":"1","data":null,"token_recovery":null,"setor":"admin","setorData":"","groupData":"","token":"92aa60357231a449a452e0bf06fcaad1"}');
	</script>
	<script src="public/assets/eventosBase.js"></script>
	<script src="public/assets/eventos.js"></script>

</head>
<body>
<div id="app">

    <section class="core-class-container r-panel r-index" style="min-height: 969px; position: relative; top: initial; width: 100%; left: initial; overflow: hidden; opacity: 1;" data-file="index" id="core-content">
		<div class="col container-1200">
			<div id="backgroundhome"></div>
				
			<div id="logohome"><div id="logo-header">
				<h1 class="animate-top font-bold left color-text-white">Eventos Unesc</h1>
			</div>
			</div>
			<div class="col padding-128" id="home-parent">
				<div class="col padding-24" id="home"></div>
			</div>
		</div>

		<div class="col" id="evento">
			<div class="btn-close" onclick="closeCard()">
				<img src="public/assets/img/fechar.png" width="50" height="50" />
			</div>
			<div class="col padding-24" id="evento-content"></div>
		</div>
	</section>

</body></html>