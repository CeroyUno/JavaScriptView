/*
Hola y bienvenid@ a JavaScriptView

JavaScriptView es un proyecto opensource, por lo que puedes utilizarlo, modificarlo y adaptarlo a tus necesidades. Nos gustaría saber algo más y que nos enviaras ejemplos de apps que crees con este framework.

Queremos que entres en el equipo y que colabores con este pequeño framework. Puedes enviarnos un email a contacto@javascriptview.com

Gracias!
*/

//Declaración de variables Globales
var JSVFullSpinner, JSVStatusFullSpinner = false, JSVActualView, statusActionMenuSide = false, typeProject, tempDevice = 'iOS';

//Variable array que guarda los htmls de cada view cargado por ajax
var JSVDeclareViews = new Array();

//Variable array que guarda los htmls de cada view cargado por ajax
var JSVContainersViews = new Array();

//Inicializamos el componente, recorriendo y creando todas las vistas y la modal loading
$JSView = {
    run: function(type){
        //Obtenemos el tipo de dispositivo para cambiar el alto de la cabecera en el caso de iOS
        if(tempDevice == 'iOS'){
            var style = document.createElement('style');
            style.type = 'text/css';
            style.innerHTML += 'jsv-content { top: 64px; }';
            style.innerHTML += 'jsv-tabs{ top: 64px; }';
            style.innerHTML += '.has-tabs{ top: 109px; }';
            style.innerHTML += 'jsv-header { padding-top: 20px; height: 64px }';
            document.getElementsByTagName('head')[0].appendChild(style); 
        }
        
        //Cargamos FastClick
        new FastClick(document.body);
        //Guardamos el tipo de proyecto que es, (null,left,bottom)
        typeProject = type;
        //Añadimos la capa del spinner a full en el dom
        $v.select('body').innerHTML += spinnerModal;
        //Guardamos la referencia a la capa del spinner full en una variable global
        JSVfullLoading = $v.select('#JSVcontainerLoading');
    },
    declareView: function(e){
        //Recorremos el json de todas las vistas declaradas
        for(var obj in e){
            //Creamos los contenedores de todas las vistas externas a jsv-main
            if(!$v.select('#' + obj)){
                //Añadimos a body o al contenedor el elemento jsv-view de la vista
                $v.select('body').innerHTML += '<jsv-view id="' + obj + '"></jsv-view>';
                //Colocamos todos los contenedores fuera de cámara
                $v.select('#' + obj).classList.add('JSVcontainerRight');
                $v.select('#' + obj).classList.add('JSVcontainerTransition');
                //Guardamos en un array las vistas declaradas con las opciones (url, template, controlador, ...)
                if(e.hasOwnProperty(obj)){
                    JSVDeclareViews[obj] = e[obj];
                }
                $JSVRequest.do(obj,e[obj].template);
            }
        }
    },
    initView: function(e){
        //Asignamos la vista actual en una variable global
        JSVActualView = e;
        //Colocamos la vista actual dentro de cámara
        $v.select('#' + e).classList.remove('JSVcontainerRight');
        $v.select('#' + e).classList.add('JSVcontainerCenter');
        $v.select('#' + e).classList.remove('JSVcontainerBackground');
        $v.select('#' + e).classList.add('JSVcontainerForeground');
        //Leemos el template
        $JSVRequest.do(e,JSVDeclareViews[e].template,true);
        window.history.pushState(e, "Titulo", '/www/index.html#' + e);
    },
    dataView: function(obj,e) {
        console.log('dataView obj -> ' + obj);
        console.log('dataView e -> ' + e);
        console.log('dataView JSVContainersViews[e] -> ' + JSVContainersViews[e]);
        var contentView = JSVContainersViews[e];
        for (var x in obj) {
            console.log(x);
            console.log(obj[x]);
            if(!obj[x]) obj[x]='';
            contentView = contentView.replace(new RegExp(x, 'g'), obj[x]);
        }
        //Eliminamos el contenido anterior del contenedor
        $v.select('#' + e).innerHTML = ''
        //Añadimos el contenido nuevo al contenedor
        $v.select('#' + e).innerHTML += contentView;
    },
    goToView: function(e){
        
        console.group('goToView e -> ' + e);
        console.time('goToView');
        
        //Si el padre de la vista SÍ es jsv-main, movemos a la izquerda jsv-main
        if($v.select('#' + JSVActualView).parentNode.tagName.toLowerCase() == 'jsv-container'){
            //Colocamos la vista actual fuera de cámara
            $v.select('jsv-main').classList.add('JSVcontainerLeft')
            $v.select('jsv-main').classList.remove('JSVcontainerCenter')
            //Colocamos la nueva vista dentro de cámara
            $v.select('#' + e).classList.add('JSVcontainerCenter')
            $v.select('#' + e).classList.remove('JSVcontainerRight')
        //Si el padre de la vista NO es jsv-main, movemos a la izquerda la vista
        }else{
            //Colocamos la vista actual fuera de cámara
            $v.select('#' + JSVActualView).classList.add('JSVcontainerLeft')
            $v.select('#' + JSVActualView).classList.remove('JSVcontainerCenter')
            //Colocamos la nueva vista dentro de cámara
            $v.select('#' + e).classList.add('JSVcontainerCenter')
            $v.select('#' + e).classList.remove('JSVcontainerRight')
        }
        //Eliminamos el contenido anterior del contenedor
        //$v.select('#' + e).innerHTML = ''
        //Añadimos el contenido de la vista al contenedor
        //$v.select('#' + e).innerHTML += JSVContainersViews[e];
        //Asignamos la vista actual en una variable global
        JSVActualView = e;
        /*-------------------REFERENCIA PARA TEST AL CONTROLADOR----------------------*/
        console.log('Antes de llamar al controlador');
        eval( '$JSView.controller.' + e + '("' + e + '")' );
        console.log('Después de llamar al controlador');
        /*-------------------REFERENCIA PARA TEST AL CONTROLADOR----------------------*/
        //Cambiamos la url del state
        window.history.pushState(e, '', '/www/index.html#' + e);
        
        console.timeEnd('goToView');
        console.groupEnd();
        
    },
    declareMenu: function(e){
        //Si añadimos el componente jsv-main a body (Esto es por que queremos un menú)
        $v.select('body').innerHTML = '<jsv-main></jsv-main>';
        $v.select('jsv-main').innerHTML = '<jsv-container></jsv-container>';
        $v.select('jsv-main').classList.add('JSVcontainerCenter');
        $v.select('jsv-main').classList.add('JSVcontainerTransition');
        $v.select('jsv-container').classList.add('jsv-main-' + typeProject);
        $v.select('jsv-container').classList.add('JSVcontainerCenter');
        $v.select('jsv-container').classList.add('JSVcontainerTransition');
        //Recorremos el json de todas las vistas declaradas
        for(var obj in e){
            if(obj == 'menu'){
                $v.select('jsv-main').innerHTML += '<jsv-menu-' + typeProject + ' id="' + obj + '"></jsv-menu-' + e[obj].type + '>';
                $JSVRequest.do(obj, e[obj].template, true);
            }else{
                //Añadimos al contenedor el elemento jsv-view de la vista
                $v.select('jsv-container').innerHTML += '<jsv-view id="' + obj + '"></jsv-view>';
                //Colocamos todos los contenedores fuera de cámara
                $v.select('#' + obj).classList.add('JSVcontainerBackground');
                //Guardamos en un array las vistas declaradas con las opciones (url, template, controlador, ...)
                if(e.hasOwnProperty(obj)){
                    JSVDeclareViews[obj] = e[obj];
                }
                $JSVRequest.do(obj, e[obj].template);
            }
        }
    },
    declareModal: function(e,options){
        //Recorremos el json de todas las modales declaradas
        for(var obj in e){
            //Creamos los contenedores de todas las vistas externas a jsv-main
            if(!$v.select('#' + obj)){
                //Añadimos a body o al contenedor el elemento jsv-view de la vista
                $v.select('body').innerHTML += '<jsv-modal id="' + obj + '"></jsv-modal>';
                //Colocamos todos los contenedores fuera de cámara
                $v.select('#' + obj).classList.add('JSVcontainerBottom');
                $v.select('#' + obj).classList.add('JSVcontainerTransition');
                //Guardamos en un array las vistas declaradas con las opciones (url, template, controlador, ...)
                if(e.hasOwnProperty(obj)){
                    JSVDeclareViews[obj] = e[obj];
                }
                $JSVRequest.do(obj,e[obj].template);
            }
        }
    },
    openModal: function(e){
        //Cambiamos las clases para mostrar la modal
        $v.select('#' + e).classList.add('JSVcontainerCenter')
        $v.select('#' + e).classList.remove('JSVcontainerBottom')
        //Eliminamos el contenido anterior del contenedor
        //$v.select('#' + e).innerHTML = ''
        //Añadimos el contenido nuevo al contenedor
        //$v.select('#' + e).innerHTML += JSVContainersViews[e];
        //Asignamos la vista actual en una variable global
        JSVActualView = e;
        /*-------------------REFERENCIA PARA TEST AL CONTROLADOR----------------------*/
        console.log('Antes de llamar al controlador');
        eval( '$JSView.controller.' + e + '("' + e + '")' );
        console.log('Después de llamar al controlador');
        /*-------------------REFERENCIA PARA TEST AL CONTROLADOR----------------------*/
        //Cambiamos la url del state
        window.history.pushState(e, '', '/www/index.html#'+e);
    },
    closeModal: function(e){
        //Cambiamos las clases para ocultar la modal
        $v.select('#' + e).classList.add('JSVcontainerBottom')
        $v.select('#' + e).classList.remove('JSVcontainerCenter')
        //Volvemos a la url del state anterior
        window.history.back()
        setTimeout(function(){
            //Asignamos la vista actual en una variable global
            JSVActualView = window.history.state
        },0);
    },
    back: function(){
        //Volvemos a la url del state anterior
        window.history.back();
        setTimeout(function(){
            console.log(window.history.state);
            $JSView.returnTo(window.history.state);
        },0);
    },
    returnTo: function(e){
        //Si el padre de la vista SÍ es jsv-main, movemos al centro jsv-main
        if($v.select('#' + e).parentNode.tagName.toLowerCase() == 'jsv-container'){
            //Colocamos la vista actual fuera de cámara
            $v.select('#' + JSVActualView).classList.add('JSVcontainerRight')
            $v.select('#' + JSVActualView).classList.remove('JSVcontainerCenter')
            //Colocamos la nueva vista dentro de cámara
            $v.select('jsv-main').classList.add('JSVcontainerCenter')
            $v.select('jsv-main').classList.remove('JSVcontainerLeft')
        //Si el padre de la vista NO es jsv-main, movemos al centro la vista
        }else{
            //Colocamos la vista actual fuera de cámara
            $v.select('#' + JSVActualView).classList.add('JSVcontainerRight')
            $v.select('#' + JSVActualView).classList.remove('JSVcontainerCenter')
            //Colocamos la nueva vista dentro de cámara
            $v.select('#' + e).classList.add('JSVcontainerCenter')
            $v.select('#' + e).classList.remove('JSVcontainerLeft')
        }
        //Asignamos la vista actual en una variable global
        JSVActualView = e
    },
    actionMenu: function(e){
        //Si ejecutamos actionMenu con un valor en e, es que queremos cambiar la vista interna de jsv-main
        if (typeof e != 'undefined') {
            $v.select('jsv-container .JSVcontainerForeground').classList.add('JSVcontainerBackground');
            $v.select('jsv-container .JSVcontainerForeground').classList.remove('JSVcontainerForeground');
            $v.select('#' + e).classList.remove('JSVcontainerBackground');
            $v.select('#' + e).classList.add('JSVcontainerForeground');
            //Eliminamos el contenido anterior del contenedor
            //$v.select('#' + e).innerHTML = ''
            //Añadimos el contenido nuevo al contenedor
            //$v.select('#' + e).innerHTML += JSVContainersViews[e];
            //Asignamos la vista actual en una variable global
            JSVActualView = e;
            /*-------------------REFERENCIA PARA TEST AL CONTROLADOR----------------------*/
            console.log('Antes de llamar al controlador');
            eval( '$JSView.controller.' + e + '("' + e + '")' );
            console.log('Después de llamar al controlador');
            /*-------------------REFERENCIA PARA TEST AL CONTROLADOR----------------------*/
            //Cambiamos la url del state
            window.history.pushState(e, '', '/www/index.html#'+e);
        }
        //Si el menu es left y tiene que abrir entra
        if(typeProject == 'left'){
            if(statusActionMenuSide == false){
                $v.select('jsv-container').classList.add('JSVcontainerLeftMenuSide')
                $v.select('jsv-container').classList.remove('JSVcontainerCenter') 
                statusActionMenuSide = true
            }else{
                $v.select('jsv-container').classList.add('JSVcontainerCenter')
                $v.select('jsv-container').classList.remove('JSVcontainerLeftMenuSide')
                statusActionMenuSide = false
            }
        }
    },
    //Esta función parsea los a y aplica un onclick para abrir con inappbrowser de cordova
    parseAllLink: function(e){
        $v('a').each(function() {
            $v( this ).attr( "onclick", "window.open('"+$v( this ).attr("href")+"', '_blank', 'location=yes')");
            $v( this ).removeAttr("href");
        }); 
    },
    //Esta función permite abrir las alertas con notification de cordova
    openDialog: function(message,title,button){
        navigator.notification.alert(
            message, // message
            null,    // callback
            title,   // title
            button   // buttonName
        );
    },
    //Esta función nos permite crear los slides
    initSlide: function(e, options){
        var elements = $v.selectAll(e + ' .JSVscroller ul li');
        var numberElement;
        var maxWidth;
        /*Asignamos el ancho*/
        if(options.responsive == true){
            //Responsive
            numberElement = elements.length;
            maxWidth = $v.select(e).parentElement.offsetWidth;
            maxHeight = $v.select(e).parentElement.offsetHeight;
            var divs = $v.selectAll(e + ' .JSVscroller ul li');
            for (var i = 0; i < numberElement; ++i) {
                $v.selectAll(e + ' .JSVscroller ul li')[i].style.width = maxWidth + 'px';
                $v.selectAll(e + ' .JSVscroller ul li')[i].style.height = maxHeight + 'px';
            }
            $v.select(e + ' .JSVscroller').style.width = (maxWidth * numberElement) + 'px';
        }else if(options.width && options.height){
            //Absolute
            $v.select(e).style.width = options.width + 'px';
            $v.select(e).style.height = options.height + 'px' ;
            numberElement = elements.length;
            maxWidth = options.width;
            for (var i = 0; i < numberElement; ++i) {
                $v.selectAll(e + ' .JSVscroller ul li')[i].style.width = maxWidth + 'px';
            }
            $v.select(e + ' .JSVscroller').style.width = (maxWidth * numberElement) + 'px';
        }else{
            console.warn("Debes definir un diseño responsive o absoluto con width y eight.")   
        }
        /*---------------------*/

        /*Creamos los indicadores*/
        if(options.indicators == true){
            $v.select(e).innerHTML += '<div class="JVSnav"><ul class="JSVindicator"></ul></div>';
            var indicator = '';
            for (var i = 1; i <= numberElement; i++){
                if ( i == 1) indicator += '<li class="active">' + i + '</li>';
                else indicator += '<li>' + i + '</li>';
            }
            $v.select('.JSVindicator').innerHTML = indicator;
            $v.select('.JSVindicator').style.paddingLeft = (maxWidth - this.innerWidth) + 'px';
        }
        /*---------------------*/

        /*Añadimos el slide al array*/
        new iScroll(e, {
            snap: true,
            momentum: false,
            hScrollbar: false,
            onScrollEnd: function () {
                if(options.indicators == true){
                    $v.select('.JSVindicator > li.active').className = '';
                    $v.select('.JSVindicator > li:nth-child(' + (this.currPageX+1) + ')').className = 'active';
                }
            }
         });
         /*---------------------*/
    },
    //Esta función nos permite crear los slides
    initTabs: function(e, options){
        for (var i = 0; i < $v.selectAll('jsv-tabs jsv-tab').length; ++i) {
            $v.selectAll('jsv-tabs jsv-tab')[i].addEventListener('click', function() { 
                $v.select('jsv-tabs > jsv-tab.active').classList.remove('active');
                this.classList.add('active');
            }, false);  
        }
    }
}

//Función que nos permite mostrar y ocultar la modal loading
$JSVspinner = {
    show: function(){
        JSVfullLoading.classList.add('JSVshowLoading')
        JSVfullLoading.classList.remove('JSVhideLoading')
        JSVstatusFullSpinner = true
    },
    hide: function(){
        JSVfullLoading.classList.add('JSVhideLoading')
        JSVfullLoading.classList.remove('JSVshowLoading')
        JSVstatusFullSpinner = false
    }
}

/**************************/
/**************************/
/**************************/
/***CODE GENERIC ELEMENT***/

$v = {
    select: function(e){
        return document.querySelector(e);
    },
    selectAll: function(e){
        return document.querySelectorAll(e);
    }
}

/*---------------------*/

/****************/
/****************/
/****************/
/***CODE SLIDE***/

//Función para ir para adelante
//myScroll.scrollToPage('next', 0);
//Función para ir atrás
//myScroll.scrollToPage('prev', 0);

//Contenedor, Responsive, Indicadores

$JSVslide = {
    create: function(e, options){
        var elements = $v.selectAll(e + ' .JSVscroller ul li');
        var numberElement;
        var maxWidth;
        /*Asignamos el ancho*/
        if(options.responsive == true){
            //Responsive
            numberElement = elements.length;
            maxWidth = $v.select(e).parentElement.offsetWidth;
            maxHeight = $v.select(e).parentElement.offsetHeight;
            var divs = $v.selectAll(e + ' .JSVscroller ul li');
            for (var i = 0; i < numberElement; ++i) {
                $v.selectAll(e + ' .JSVscroller ul li')[i].style.width = maxWidth + 'px';
                $v.selectAll(e + ' .JSVscroller ul li')[i].style.height = maxHeight + 'px';
            }
            $v.select(e + ' .JSVscroller').style.width = (maxWidth * numberElement) + 'px';
        }else if(options.width && options.height){
            //Absolute
            $v.select(e).style.width = options.width + 'px';
            $v.select(e).style.height = options.height + 'px' ;
            numberElement = elements.length;
            maxWidth = options.width;
            for (var i = 0; i < numberElement; ++i) {
                $v.selectAll(e + ' .JSVscroller ul li')[i].style.width = maxWidth + 'px';
            }
            $v.select(e + ' .JSVscroller').style.width = (maxWidth * numberElement) + 'px';
        }else{
            console.warn("Debes definir un diseño responsive o absoluto con width y eight.")   
        }
        /*---------------------*/

        /*Creamos los indicadores*/
        if(options.indicators == true){
            $v.select(e).innerHTML += '<div class="JVSnav"><ul class="JSVindicator"></ul></div>';
            var indicator = '';
            for (var i = 1; i <= numberElement; i++){
                if ( i == 1) indicator += '<li class="active">' + i + '</li>';
                else indicator += '<li>' + i + '</li>';
            }
            $v.select('.JSVindicator').innerHTML = indicator;
            $v.select('.JSVindicator').style.paddingLeft = (maxWidth - this.innerWidth) + 'px';
        }
        /*---------------------*/

        /*Añadimos el slide al array*/
        new iScroll(e, {
            snap: true,
            momentum: false,
            hScrollbar: false,
            onScrollEnd: function () {
                if(options.indicators == true){
                    $v.select('.JSVindicator > li.active').className = '';
                    $v.select('.JSVindicator > li:nth-child(' + (this.currPageX+1) + ')').className = 'active';
                }
            }
         });
         /*---------------------*/
    }
}
/*---------------------*/

/****************/
/****************/
/****************/
/******AJAX******/
$JSVRequest = {
    do: function(e,url,viewInit){
        var http_request = new XMLHttpRequest();
        http_request.onreadystatechange = function(url){
            if (http_request.readyState == 4) {
                if (http_request.status == 200 || http_request.status == 0) {
                    //Guardamos en el array la vista
                    JSVContainersViews[e] = http_request.responseText;
                    //Si el valor de viewInit es true es que hay que ejecutarlo al inicio
                    if (viewInit == true){
                        console.group('$JSVRequest e -> ' + e);
                        console.time('$JSVRequest');
                        /*-------------------REFERENCIA PARA TEST AL CONTROLADOR----------------------*/
                        console.log('Antes de llamar al controlador');
                        eval( '$JSView.controller.' + e + '("' + e + '")' );
                        console.log('Después de llamar al controlador');
                        /*-------------------REFERENCIA PARA TEST AL CONTROLADOR----------------------*/
                        console.timeEnd('$JSVRequest');
                        console.groupEnd();
                    }
                } else {
                    console.error('Can´t load -> ' + url);
                }
            }
        }
        http_request.open('GET', './' + url, true);
        http_request.send(null);
    }
}
/*---------------------*/