/*
Hi Developer, this is JavaScriptView

JavaScriptView is an open source project, you can use, modify and adapt it to your needs. Your help is important to improve it.

We want you in the team and collaborate with this little framework. You can email us at contact@javascriptview.com

Thanks!
*/

//Global vars
var JSVFullSpinner, JSVStatusFullSpinner = false, JSVActualView, statusActionMenuSide = false, typeProject, tempDevice = 'iOS';

//This array save of each view
var JSVDeclareViews = new Array();

//This array save code html of each view ajax loaded
var JSVContainersViews = new Array();

$JSView = {
    run: function(type){
        //We get the type of device to change the height of the head in the case of iOS
        if(tempDevice == 'iOS'){
            var style = document.createElement('style');
            style.type = 'text/css';
            style.innerHTML += 'jsv-content { top: 64px; }';
            style.innerHTML += 'jsv-tabs{ top: 64px; }';
            style.innerHTML += '.has-tabs{ top: 109px; }';
            style.innerHTML += 'jsv-header { padding-top: 20px; height: 64px }';
            document.getElementsByTagName('head')[0].appendChild(style); 
        }
        
        //Load FastClick
        new FastClick(document.body);
        //Save type proyect, now we can (null,left,bottom), this corresponds to the menu.
        typeProject = type;
        //Add full spinner div in dom
        $v.select('body').innerHTML += spinnerModal;
        //Save the reference full spinner div in global var
        JSVfullLoading = $v.select('#JSVcontainerLoading');
    },
    declareView: function(e){
        //Read json of all views declared
        for(var obj in e){
            //Create the container of all external views to jsv-main
            if(!$v.select('#' + obj)){
                //Add to body or container the element jsv-view of the view
                $v.select('body').innerHTML += '<jsv-view id="' + obj + '"></jsv-view>';
                //Put all containers out of camera
                $v.select('#' + obj).classList.add('JSVcontainerRight');
                $v.select('#' + obj).classList.add('JSVcontainerTransition');
                //Save in the array the views declared with its options (url, template, controlator, ...)
                if(e.hasOwnProperty(obj)){
                    JSVDeclareViews[obj] = e[obj];
                }
                $JSVRequest.do(obj,e[obj].template);
            }
        }
    },
    initView: function(e){
        //Assign actual view to global var
        JSVActualView = e;
        //Put actual view into camera :)
        $v.select('#' + e).classList.remove('JSVcontainerRight');
        $v.select('#' + e).classList.add('JSVcontainerCenter');
        $v.select('#' + e).classList.remove('JSVcontainerBackground');
        $v.select('#' + e).classList.add('JSVcontainerForeground');
        //Read the template
        $JSVRequest.do(e,JSVDeclareViews[e].template,true);
        window.history.pushState(e, "Titulo", 'index.html#' + e);
    },
    dataView: function(obj,e) {

//        console.group('dataView obj -> ' + obj);
//        console.time('dataView');
        console.log('dataView e -> ' + e);
        console.log('dataView JSVContainersViews[e] -> ' + JSVContainersViews[e]);
        
        var contentView = JSVContainersViews[e];
        for (var x in obj) {
            console.log(x);
            console.log(obj[x]);
            if(!obj[x]) obj[x]='';
            contentView = contentView.replace(new RegExp(x, 'g'), obj[x]);
        }
        //Remove the previous contents of the container
        $v.select('#' + e).innerHTML = ''
        //Add the new contents of the container
        $v.select('#' + e).innerHTML += contentView;
        
  //      console.timeEnd('dataView');
//       console.groupEnd();
        
    },
    goToView: function(e){
        
  //     console.group('goToView e -> ' + e);
  //    console.time("goToView");
        
        //If the parent of this view YES is jsv-main, we move jsv-main to the left
        if($v.select('#' + JSVActualView).parentNode.tagName.toLowerCase() == 'jsv-container'){
            //Put the actual view out of camera
            $v.select('jsv-main').classList.add('JSVcontainerLeft')
            $v.select('jsv-main').classList.remove('JSVcontainerCenter')
            //Put the new view into the camera
            $v.select('#' + e).classList.add('JSVcontainerCenter')
            $v.select('#' + e).classList.remove('JSVcontainerRight')
        //If the parent of this view NO is jsv-main, we move this view to the left
        }else{
            //Put the actual view out the camera
            $v.select('#' + JSVActualView).classList.add('JSVcontainerLeft')
            $v.select('#' + JSVActualView).classList.remove('JSVcontainerCenter')
            //Put the new view into the camera
            $v.select('#' + e).classList.add('JSVcontainerCenter')
            $v.select('#' + e).classList.remove('JSVcontainerRight')
        }
        //Assign actual view to global var
        JSVActualView = e;
        //Execute the function controller of this view
        eval( '$JSView.controller.' + e + '("' + e + '")' );
        //Change the url
        window.history.pushState(e, '"' + e+ '"', 'index.html#' + e);
        
    //    console.timeEnd("goToView");
     //   console.groupEnd();
        
    },
    declareMenu: function(e){
        //If we add the jsv-main component to body (This is why we want a menu)
        $v.select('body').innerHTML = '<jsv-main></jsv-main>';
        $v.select('jsv-main').innerHTML = '<jsv-container></jsv-container>';
        $v.select('jsv-main').classList.add('JSVcontainerCenter');
        $v.select('jsv-main').classList.add('JSVcontainerTransition');
        $v.select('jsv-container').classList.add('jsv-main-' + typeProject);
        $v.select('jsv-container').classList.add('JSVcontainerCenter');
        $v.select('jsv-container').classList.add('JSVcontainerTransition');
        //Read json of all views declared
        for(var obj in e){
            if(obj == 'menu'){
                $v.select('jsv-main').innerHTML += '<jsv-menu-' + typeProject + ' id="' + obj + '"></jsv-menu-' + e[obj].type + '>';
                $JSVRequest.do(obj, e[obj].template, true);
            }else{
                //Add the container the jsv-vew element of the view
                $v.select('jsv-container').innerHTML += '<jsv-view id="' + obj + '"></jsv-view>';
                //Put all containers out the camera
                $v.select('#' + obj).classList.add('JSVcontainerBackground');
                //Save in array the views declarated with its options (url, template, controlator, ...)
                if(e.hasOwnProperty(obj)){
                    JSVDeclareViews[obj] = e[obj];
                }
                $JSVRequest.do(obj, e[obj].template);
            }
        }
    },
    declareModal: function(e,options){
        //Read json of all views modal declared
        for(var obj in e){
            //Create the content of all external views to jsv-main
            if(!$v.select('#' + obj)){
                //Add to body or container the element jsv-view
                $v.select('body').innerHTML += '<jsv-modal id="' + obj + '"></jsv-modal>';
                //Put all containers out the camera
                $v.select('#' + obj).classList.add('JSVcontainerBottom');
                $v.select('#' + obj).classList.add('JSVcontainerTransition');
                //Save in array the views declarated with its options (url, template, controlator, ...)
                if(e.hasOwnProperty(obj)){
                    JSVDeclareViews[obj] = e[obj];
                }
                $JSVRequest.do(obj,e[obj].template);
            }
        }
    },
    openModal: function(e){
        //Change the class and show modal div
        $v.select('#' + e).classList.add('JSVcontainerCenter')
        $v.select('#' + e).classList.remove('JSVcontainerBottom')
        //Assign actual view to global var
        JSVActualView = e;
        //Execute the function controller of this view
        eval( '$JSView.controller.' + e + '("' + e + '")' );
        //Change the url
        window.history.pushState(e, '', '/www/index.html#'+e);
    },
    closeModal: function(e){
        //Change the class and hide modal
        $v.select('#' + e).classList.add('JSVcontainerBottom')
        $v.select('#' + e).classList.remove('JSVcontainerCenter')
        //Return to previous url
        window.history.back()
        setTimeout(function(){
            //Assign actual view to global var
            JSVActualView = window.history.state
        },0);
    },
    back: function(e){
        //Return to previous url       
        window.history.back();
        var windowState = window.history.state;
        setTimeout(function(){           
           console.log("window.history.state " + windowState);
           $JSView.returnTo(window.history.state);
        },10);
        
    },
    returnTo: function(e){
        //If parent of view YES is jsv-main, move to center jsv-main
        if($v.select('#' + e).parentNode.tagName.toLowerCase() == 'jsv-container'){
            //Put all containers out the camera
            $v.select('#' + JSVActualView).classList.add('JSVcontainerRight')
            $v.select('#' + JSVActualView).classList.remove('JSVcontainerCenter')
            //Put the new view into camera
            $v.select('jsv-main').classList.add('JSVcontainerCenter')
            $v.select('jsv-main').classList.remove('JSVcontainerLeft')
        //If parent of view is NOT jsv-main, move to center the view
        }else{
            //Put all containers out the camera
            $v.select('#' + JSVActualView).classList.add('JSVcontainerRight')
            $v.select('#' + JSVActualView).classList.remove('JSVcontainerCenter')
            //Put the new view into camera
            $v.select('#' + e).classList.add('JSVcontainerCenter')
            $v.select('#' + e).classList.remove('JSVcontainerLeft')
        }
        //Assign actual view to global var
        JSVActualView = e       
    },
    actionMenu: function(e){
        //If execute actionMenu with value in e, is that we want chante the intern view of jsv-main
        if (typeof e != 'undefined') {
            $v.select('jsv-container .JSVcontainerForeground').classList.add('JSVcontainerBackground');
            $v.select('jsv-container .JSVcontainerForeground').classList.remove('JSVcontainerForeground');
            $v.select('#' + e).classList.remove('JSVcontainerBackground');
            $v.select('#' + e).classList.add('JSVcontainerForeground');
            //Assign actual view to global var
            JSVActualView = e;
            eval( '$JSView.controller.' + e + '("' + e + '")' );
            //Change the url
           /* window.history.pushState(e, 'Prueba', '/www/index.html#'+e);*/
            window.history.pushState(e, '" ' + e + ' "', 'index.html#'+ e);
            console.log("actionMenu:: " + window.history.state);
        }
        //If is the left menu enter here
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
    //This function read all 'a' element and create event onclick to open inappbrowser plugin cordova
    parseAllLink: function(e){
        $v('a').each(function() {
            $v( this ).attr( "onclick", "window.open('"+$v( this ).attr("href")+"', '_blank', 'location=yes')");
            $v( this ).removeAttr("href");
        }); 
    },
    //This function open alert native plugin cordova
    openDialog: function(message,title,button){
        navigator.notification.alert(
            message, // message
            null,    // callback
            title,   // title
            button   // buttonName
        );
    },
    //This function create slides
    initSlide: function(e, options){
        var elements = $v.selectAll(e + ' .JSVscroller ul li');
        var numberElement;
        var maxWidth;
        //Asign width
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

        //Create the indicators
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

        //Add slide to array
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
    //This function start the tabs
    initTabs: function(e, options){
        for (var i = 0; i < $v.selectAll('jsv-tabs jsv-tab').length; ++i) {
            $v.selectAll('jsv-tabs jsv-tab')[i].addEventListener('click', function() { 
                
                //Active the tab touched
                $v.select('#' + e + ' jsv-tabs > jsv-tab.active').classList.remove('active');
                this.classList.add('active');
                
                //Active jsv-content of asigned jsv-tab
                litems=this.parentNode.getElementsByTagName('jsv-tab') 
                for (i=0;i<litems.length;i++){ 
                    if (litems.item(i)==this){ 
                        $v.select('#' + e + ' jsv-content > jsv-tab.active').classList.remove('active');
                        $v.selectAll('#' + e + ' jsv-content > jsv-tab')[i].classList.add('active');
                    } 
                }
            
            }, false);  
        }
    }
}

//This function show or hide modal Spinner
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
/******AJAX******/
$JSVRequest = {
    do: function(e,url,viewInit){
        var http_request = new XMLHttpRequest();
        http_request.onreadystatechange = function(url){
            if (http_request.readyState == 4) {
                if (http_request.status == 200 || http_request.status == 0) {
                    //Save the view in array
                    JSVContainersViews[e] = http_request.responseText;
                    //If value of viewInit is true, then must run to start
                    if (viewInit == true){
//                        console.group('$JSVRequest e -> ' + e);
//                        console.time('$JSVRequest');
                        eval( '$JSView.controller.' + e + '("' + e + '")' );
  //                      console.timeEnd('$JSVRequest');
  //                      console.groupEnd();
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

/*********************/
/*********************/
/*********************/
/******FastClick******/

function FastClick(layer) {
    'use strict';
    var oldOnClick, self = this;
    this.trackingClick = false;
    this.trackingClickStart = 0;
    this.targetElement = null;
    this.touchStartX = 0;
    this.touchStartY = 0;
    this.lastTouchIdentifier = 0;
    this.layer = layer;

    if (!layer || !layer.nodeType) {
        throw new TypeError('Layer must be a document node');
    }

    this.onClick = function() { return FastClick.prototype.onClick.apply(self, arguments); };

    this.onMouse = function() { return FastClick.prototype.onMouse.apply(self, arguments); };

    this.onTouchStart = function() { return FastClick.prototype.onTouchStart.apply(self, arguments); };

    this.onTouchEnd = function() { return FastClick.prototype.onTouchEnd.apply(self, arguments); };

    this.onTouchCancel = function() { return FastClick.prototype.onTouchCancel.apply(self, arguments); };

    if (typeof window.ontouchstart === 'undefined') {
        return;
    }

    if (this.deviceIsAndroid) {
        layer.addEventListener('mouseover', this.onMouse, true);
        layer.addEventListener('mousedown', this.onMouse, true);
        layer.addEventListener('mouseup', this.onMouse, true);
    }

    layer.addEventListener('click', this.onClick, true);
    layer.addEventListener('touchstart', this.onTouchStart, false);
    layer.addEventListener('touchend', this.onTouchEnd, false);
    layer.addEventListener('touchcancel', this.onTouchCancel, false);

    if (!Event.prototype.stopImmediatePropagation) {
        layer.removeEventListener = function(type, callback, capture) {
            var rmv = Node.prototype.removeEventListener;
            if (type === 'click') {
                rmv.call(layer, type, callback.hijacked || callback, capture);
            } else {
                rmv.call(layer, type, callback, capture);
            }
        };

        layer.addEventListener = function(type, callback, capture) {
            var adv = Node.prototype.addEventListener;
            if (type === 'click') {
                adv.call(layer, type, callback.hijacked || (callback.hijacked = function(event) {
                    if (!event.propagationStopped) {
                        callback(event);
                    }
                }), capture);
            } else {
                adv.call(layer, type, callback, capture);
            }
        };
    }

    if (typeof layer.onclick === 'function') {
        oldOnClick = layer.onclick;
        layer.addEventListener('click', function(event) {
            oldOnClick(event);
        }, false);
        layer.onclick = null;
    }
}

FastClick.prototype.deviceIsAndroid = navigator.userAgent.indexOf('Android') > 0;
FastClick.prototype.deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent);
FastClick.prototype.deviceIsIOS4 = FastClick.prototype.deviceIsIOS && (/OS 4_\d(_\d)?/).test(navigator.userAgent);
FastClick.prototype.deviceIsIOSWithBadTarget = FastClick.prototype.deviceIsIOS && (/OS ([6-9]|\d{2})_\d/).test(navigator.userAgent);

FastClick.prototype.needsClick = function(target) {
    'use strict';
    switch (target.nodeName.toLowerCase()) {
    case 'button':
    case 'input':

        if (this.deviceIsIOS && target.type === 'file') {
            return true;
        }

        return target.disabled;
    case 'label':
    case 'video':
        return true;
    default:
        return (/\bneedsclick\b/).test(target.className);
    }
};

FastClick.prototype.needsFocus = function(target) {
    'use strict';
    switch (target.nodeName.toLowerCase()) {
    case 'textarea':
    case 'select':
        return true;
    case 'input':
        switch (target.type) {
        case 'button':
        case 'checkbox':
        case 'file':
        case 'image':
        case 'radio':
        case 'submit':
            return false;
        }

        return !target.disabled;
    default:
        return (/\bneedsfocus\b/).test(target.className);
    }
};

FastClick.prototype.sendClick = function(targetElement, event) {
    'use strict';
    var clickEvent, touch;

    if (document.activeElement && document.activeElement !== targetElement) {
        document.activeElement.blur();
    }

    touch = event.changedTouches[0];

    clickEvent = document.createEvent('MouseEvents');
    clickEvent.initMouseEvent('click', true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
    clickEvent.forwardedTouchEvent = true;
    targetElement.dispatchEvent(clickEvent);
};

FastClick.prototype.focus = function(targetElement) {
    'use strict';
    var length;

    if (this.deviceIsIOS && targetElement.setSelectionRange) {
        length = targetElement.value.length;
        targetElement.setSelectionRange(length, length);
    } else {
        targetElement.focus();
    }
};

FastClick.prototype.updateScrollParent = function(targetElement) {
    'use strict';
    var scrollParent, parentElement;

    scrollParent = targetElement.fastClickScrollParent;

    if (!scrollParent || !scrollParent.contains(targetElement)) {
        parentElement = targetElement;
        do {
            if (parentElement.scrollHeight > parentElement.offsetHeight) {
                scrollParent = parentElement;
                targetElement.fastClickScrollParent = parentElement;
                break;
            }

            parentElement = parentElement.parentElement;
        } while (parentElement);
    }

    if (scrollParent) {
        scrollParent.fastClickLastScrollTop = scrollParent.scrollTop;
    }
};

FastClick.prototype.getTargetElementFromEventTarget = function(eventTarget) {
    'use strict';
    
    if (eventTarget.nodeType === Node.TEXT_NODE) {
        return eventTarget.parentNode;
    }

    return eventTarget;
};

FastClick.prototype.onTouchStart = function(event) {
    'use strict';
    var targetElement, touch, selection;

    targetElement = this.getTargetElementFromEventTarget(event.target);
    touch = event.targetTouches[0];

    if (this.deviceIsIOS) {

        selection = window.getSelection();
        if (selection.rangeCount && !selection.isCollapsed) {
            return true;
        }

        if (!this.deviceIsIOS4) {

            if (touch.identifier === this.lastTouchIdentifier) {
                event.preventDefault();
                return false;
            }
        
            this.lastTouchIdentifier = touch.identifier;

            this.updateScrollParent(targetElement);
        }
    }

    this.trackingClick = true;
    this.trackingClickStart = event.timeStamp;
    this.targetElement = targetElement;

    this.touchStartX = touch.pageX;
    this.touchStartY = touch.pageY;

    if ((event.timeStamp - this.lastClickTime) < 200) {
        event.preventDefault();
    }

    return true;
};

FastClick.prototype.touchHasMoved = function(event) {
    'use strict';
    var touch = event.changedTouches[0];

    if (Math.abs(touch.pageX - this.touchStartX) > 10 || Math.abs(touch.pageY - this.touchStartY) > 10) {
        return true;
    }

    return false;
};

FastClick.prototype.findControl = function(labelElement) {
    'use strict';

    if (labelElement.control !== undefined) {
        return labelElement.control;
    }

    if (labelElement.htmlFor) {
        return document.getElementById(labelElement.htmlFor);
    }

    return labelElement.querySelector('button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea');
};

FastClick.prototype.onTouchEnd = function(event) {
    'use strict';
    var forElement, trackingClickStart, targetTagName, scrollParent, touch, targetElement = this.targetElement;

    if (this.touchHasMoved(event)) {
        this.trackingClick = false;
        this.targetElement = null;
    }

    if (!this.trackingClick) {
        return true;
    }

    if ((event.timeStamp - this.lastClickTime) < 200) {
        this.cancelNextClick = true;
        return true;
    }

    this.lastClickTime = event.timeStamp;

    trackingClickStart = this.trackingClickStart;
    this.trackingClick = false;
    this.trackingClickStart = 0;

    if (this.deviceIsIOSWithBadTarget) {
        touch = event.changedTouches[0];
        targetElement = document.elementFromPoint(touch.pageX - window.pageXOffset, touch.pageY - window.pageYOffset);
    }

    targetTagName = targetElement.tagName.toLowerCase();
    if (targetTagName === 'label') {
        forElement = this.findControl(targetElement);
        if (forElement) {
            this.focus(targetElement);
            if (this.deviceIsAndroid) {
                return false;
            }

            targetElement = forElement;
        }
    } else if (this.needsFocus(targetElement)) {

        if ((event.timeStamp - trackingClickStart) > 100 || (this.deviceIsIOS && window.top !== window && targetTagName === 'input')) {
            this.targetElement = null;
            return false;
        }

        this.focus(targetElement);

        if (!this.deviceIsIOS4 || targetTagName !== 'select') {
            this.targetElement = null;
            event.preventDefault();
        }

        return false;
    }

    if (this.deviceIsIOS && !this.deviceIsIOS4) {

        scrollParent = targetElement.fastClickScrollParent;
        if (scrollParent && scrollParent.fastClickLastScrollTop !== scrollParent.scrollTop) {
            return true;
        }
    }

    if (!this.needsClick(targetElement)) {
        event.preventDefault();
        var self = this;
        setTimeout(function(){
            self.sendClick(targetElement, event);
        }, 0);
    }

    return false;
};

FastClick.prototype.onTouchCancel = function() {
    'use strict';
    this.trackingClick = false;
    this.targetElement = null;
};

FastClick.prototype.onMouse = function(event) {
    'use strict';

    if (!this.targetElement) {
        return true;
    }

    if (event.forwardedTouchEvent) {
        return true;
    }

    if (!event.cancelable) {
        return true;
    }

    if (!this.needsClick(this.targetElement) || this.cancelNextClick) {

        if (event.stopImmediatePropagation) {
            event.stopImmediatePropagation();
        } else {
            event.propagationStopped = true;
        }

        event.stopPropagation();
        event.preventDefault();

        return false;
    }

    return true;
};

FastClick.prototype.onClick = function(event) {
    'use strict';
    var permitted;

    if (this.trackingClick) {
        this.targetElement = null;
        this.trackingClick = false;
        return true;
    }

    if (event.target.type === 'submit' && event.detail === 0) {
        return true;
    }

    permitted = this.onMouse(event);

    if (!permitted) {
        this.targetElement = null;
    }

    return permitted;
};

FastClick.prototype.destroy = function() {
    'use strict';
    var layer = this.layer;

    if (this.deviceIsAndroid) {
        layer.removeEventListener('mouseover', this.onMouse, true);
        layer.removeEventListener('mousedown', this.onMouse, true);
        layer.removeEventListener('mouseup', this.onMouse, true);
    }

    layer.removeEventListener('click', this.onClick, true);
    layer.removeEventListener('touchstart', this.onTouchStart, false);
    layer.removeEventListener('touchend', this.onTouchEnd, false);
    layer.removeEventListener('touchcancel', this.onTouchCancel, false);
};

FastClick.attach = function(layer) {
    'use strict';
    return new FastClick(layer);
};


if (typeof define !== 'undefined' && define.amd) {
    define(function() {
        'use strict';
        return FastClick;
    });
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = FastClick.attach;
    module.exports.FastClick = FastClick;
}
/*---------------------*/

/*********************/
/*********************/
/*********************/
/*********Slide*******/
(function(window, doc){
var m = Math,
    dummyStyle = doc.createElement('div').style,
    vendor = (function () {
        var vendors = 't,webkitT,MozT,msT,OT'.split(','),
            t,
            i = 0,
            l = vendors.length;

        for ( ; i < l; i++ ) {
            t = vendors[i] + 'ransform';
            if ( t in dummyStyle ) {
                return vendors[i].substr(0, vendors[i].length - 1);
            }
        }

        return false;
    })(),
    cssVendor = vendor ? '-' + vendor.toLowerCase() + '-' : '',

    // Style properties
    transform = prefixStyle('transform'),
    transitionProperty = prefixStyle('transitionProperty'),
    transitionDuration = prefixStyle('transitionDuration'),
    transformOrigin = prefixStyle('transformOrigin'),
    transitionTimingFunction = prefixStyle('transitionTimingFunction'),
    transitionDelay = prefixStyle('transitionDelay'),

    // Browser capabilities
    isAndroid = (/android/gi).test(navigator.appVersion),
    isIDevice = (/iphone|ipad/gi).test(navigator.appVersion),
    isTouchPad = (/hp-tablet/gi).test(navigator.appVersion),

    has3d = prefixStyle('perspective') in dummyStyle,
    hasTouch = 'ontouchstart' in window && !isTouchPad,
    hasTransform = vendor !== false,
    hasTransitionEnd = prefixStyle('transition') in dummyStyle,

    RESIZE_EV = 'onorientationchange' in window ? 'orientationchange' : 'resize',
    START_EV = hasTouch ? 'touchstart' : 'mousedown',
    MOVE_EV = hasTouch ? 'touchmove' : 'mousemove',
    END_EV = hasTouch ? 'touchend' : 'mouseup',
    CANCEL_EV = hasTouch ? 'touchcancel' : 'mouseup',
    TRNEND_EV = (function () {
        if ( vendor === false ) return false;

        var transitionEnd = {
                ''          : 'transitionend',
                'webkit'    : 'webkitTransitionEnd',
                'Moz'       : 'transitionend',
                'O'         : 'otransitionend',
                'ms'        : 'MSTransitionEnd'
            };

        return transitionEnd[vendor];
    })(),

    nextFrame = (function() {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function(callback) { return setTimeout(callback, 1); };
    })(),
    cancelFrame = (function () {
        return window.cancelRequestAnimationFrame ||
            window.webkitCancelAnimationFrame ||
            window.webkitCancelRequestAnimationFrame ||
            window.mozCancelRequestAnimationFrame ||
            window.oCancelRequestAnimationFrame ||
            window.msCancelRequestAnimationFrame ||
            clearTimeout;
    })(),

    translateZ = has3d ? ' translateZ(0)' : '',

    iScroll = function (el, options) {
        var that = this,
            i;

        that.wrapper = typeof el == 'object' ? el : doc.querySelector(el);
        that.wrapper.style.overflow = 'hidden';
        that.scroller = that.wrapper.children[0];

        // Default options
        that.options = {
            hScroll: true,
            vScroll: true,
            x: 0,
            y: 0,
            bounce: true,
            bounceLock: false,
            momentum: true,
            lockDirection: true,
            useTransform: true,
            useTransition: false,
            topOffset: 0,
            checkDOMChanges: false,     // Experimental
            handleClick: true,

            // Scrollbar
            hScrollbar: true,
            vScrollbar: true,
            fixedScrollbar: isAndroid,
            hideScrollbar: isIDevice,
            fadeScrollbar: isIDevice && has3d,
            scrollbarClass: '',

            // Zoom
            zoom: false,
            zoomMin: 1,
            zoomMax: 4,
            doubleTapZoom: 2,
            wheelAction: 'scroll',

            // Snap
            snap: false,
            snapThreshold: 1,

            // Events
            onRefresh: null,
            onBeforeScrollStart: function (e) { e.preventDefault(); },
            onScrollStart: null,
            onBeforeScrollMove: null,
            onScrollMove: null,
            onBeforeScrollEnd: null,
            onScrollEnd: null,
            onTouchEnd: null,
            onDestroy: null,
            onZoomStart: null,
            onZoom: null,
            onZoomEnd: null
        };

        // User defined options
        for (i in options) that.options[i] = options[i];
        
        // Set starting position
        that.x = that.options.x;
        that.y = that.options.y;

        // Normalize options
        that.options.useTransform = hasTransform && that.options.useTransform;
        that.options.hScrollbar = that.options.hScroll && that.options.hScrollbar;
        that.options.vScrollbar = that.options.vScroll && that.options.vScrollbar;
        that.options.zoom = that.options.useTransform && that.options.zoom;
        that.options.useTransition = hasTransitionEnd && that.options.useTransition;

        // Helpers FIX ANDROID BUG!
        // translate3d and scale doesn't work together!
        // Ignoring 3d ONLY WHEN YOU SET that.options.zoom
        if ( that.options.zoom && isAndroid ){
            translateZ = '';
        }
        
        // Set some default styles
        that.scroller.style[transitionProperty] = that.options.useTransform ? cssVendor + 'transform' : 'top left';
        that.scroller.style[transitionDuration] = '0';
        that.scroller.style[transformOrigin] = '0 0';
        if (that.options.useTransition) that.scroller.style[transitionTimingFunction] = 'cubic-bezier(0.33,0.66,0.66,1)';
        
        if (that.options.useTransform) that.scroller.style[transform] = 'translate(' + that.x + 'px,' + that.y + 'px)' + translateZ;
        else that.scroller.style.cssText += ';position:absolute;top:' + that.y + 'px;left:' + that.x + 'px';

        if (that.options.useTransition) that.options.fixedScrollbar = true;

        that.refresh();

        that._bind(RESIZE_EV, window);
        that._bind(START_EV);
        if (!hasTouch) {
            if (that.options.wheelAction != 'none') {
                that._bind('DOMMouseScroll');
                that._bind('mousewheel');
            }
        }

        if (that.options.checkDOMChanges) that.checkDOMTime = setInterval(function () {
            that._checkDOMChanges();
        }, 500);
    };

// Prototype
iScroll.prototype = {
    enabled: true,
    x: 0,
    y: 0,
    steps: [],
    scale: 1,
    currPageX: 0, currPageY: 0,
    pagesX: [], pagesY: [],
    aniTime: null,
    wheelZoomCount: 0,
    
    handleEvent: function (e) {
        var that = this;
        switch(e.type) {
            case START_EV:
                if (!hasTouch && e.button !== 0) return;
                that._start(e);
                break;
            case MOVE_EV: that._move(e); break;
            case END_EV:
            case CANCEL_EV: that._end(e); break;
            case RESIZE_EV: that._resize(); break;
            case 'DOMMouseScroll': case 'mousewheel': that._wheel(e); break;
            case TRNEND_EV: that._transitionEnd(e); break;
        }
    },
    
    _checkDOMChanges: function () {
        if (this.moved || this.zoomed || this.animating ||
            (this.scrollerW == this.scroller.offsetWidth * this.scale && this.scrollerH == this.scroller.offsetHeight * this.scale)) return;

        this.refresh();
    },
    
    _scrollbar: function (dir) {
        var that = this,
            bar;

        if (!that[dir + 'Scrollbar']) {
            if (that[dir + 'ScrollbarWrapper']) {
                if (hasTransform) that[dir + 'ScrollbarIndicator'].style[transform] = '';
                that[dir + 'ScrollbarWrapper'].parentNode.removeChild(that[dir + 'ScrollbarWrapper']);
                that[dir + 'ScrollbarWrapper'] = null;
                that[dir + 'ScrollbarIndicator'] = null;
            }

            return;
        }

        if (!that[dir + 'ScrollbarWrapper']) {
            // Create the scrollbar wrapper
            bar = doc.createElement('div');

            if (that.options.scrollbarClass) bar.className = that.options.scrollbarClass + dir.toUpperCase();
            else bar.style.cssText = 'position:absolute;z-index:100;' + (dir == 'h' ? 'height:7px;bottom:1px;left:2px;right:' + (that.vScrollbar ? '7' : '2') + 'px' : 'width:7px;bottom:' + (that.hScrollbar ? '7' : '2') + 'px;top:2px;right:1px');

            bar.style.cssText += ';pointer-events:none;' + cssVendor + 'transition-property:opacity;' + cssVendor + 'transition-duration:' + (that.options.fadeScrollbar ? '350ms' : '0') + ';overflow:hidden;opacity:' + (that.options.hideScrollbar ? '0' : '1');

            that.wrapper.appendChild(bar);
            that[dir + 'ScrollbarWrapper'] = bar;

            // Create the scrollbar indicator
            bar = doc.createElement('div');
            if (!that.options.scrollbarClass) {
                bar.style.cssText = 'position:absolute;z-index:100;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);' + cssVendor + 'background-clip:padding-box;' + cssVendor + 'box-sizing:border-box;' + (dir == 'h' ? 'height:100%' : 'width:100%') + ';' + cssVendor + 'border-radius:3px;border-radius:3px';
            }
            bar.style.cssText += ';pointer-events:none;' + cssVendor + 'transition-property:' + cssVendor + 'transform;' + cssVendor + 'transition-timing-function:cubic-bezier(0.33,0.66,0.66,1);' + cssVendor + 'transition-duration:0;' + cssVendor + 'transform: translate(0,0)' + translateZ;
            if (that.options.useTransition) bar.style.cssText += ';' + cssVendor + 'transition-timing-function:cubic-bezier(0.33,0.66,0.66,1)';

            that[dir + 'ScrollbarWrapper'].appendChild(bar);
            that[dir + 'ScrollbarIndicator'] = bar;
        }

        if (dir == 'h') {
            that.hScrollbarSize = that.hScrollbarWrapper.clientWidth;
            that.hScrollbarIndicatorSize = m.max(m.round(that.hScrollbarSize * that.hScrollbarSize / that.scrollerW), 8);
            that.hScrollbarIndicator.style.width = that.hScrollbarIndicatorSize + 'px';
            that.hScrollbarMaxScroll = that.hScrollbarSize - that.hScrollbarIndicatorSize;
            that.hScrollbarProp = that.hScrollbarMaxScroll / that.maxScrollX;
        } else {
            that.vScrollbarSize = that.vScrollbarWrapper.clientHeight;
            that.vScrollbarIndicatorSize = m.max(m.round(that.vScrollbarSize * that.vScrollbarSize / that.scrollerH), 8);
            that.vScrollbarIndicator.style.height = that.vScrollbarIndicatorSize + 'px';
            that.vScrollbarMaxScroll = that.vScrollbarSize - that.vScrollbarIndicatorSize;
            that.vScrollbarProp = that.vScrollbarMaxScroll / that.maxScrollY;
        }

        // Reset position
        that._scrollbarPos(dir, true);
    },
    
    _resize: function () {
        var that = this;
        setTimeout(function () { that.refresh(); }, isAndroid ? 200 : 0);
    },
    
    _pos: function (x, y) {
        if (this.zoomed) return;

        x = this.hScroll ? x : 0;
        y = this.vScroll ? y : 0;

        if (this.options.useTransform) {
            this.scroller.style[transform] = 'translate(' + x + 'px,' + y + 'px) scale(' + this.scale + ')' + translateZ;
        } else {
            x = m.round(x);
            y = m.round(y);
            this.scroller.style.left = x + 'px';
            this.scroller.style.top = y + 'px';
        }

        this.x = x;
        this.y = y;

        this._scrollbarPos('h');
        this._scrollbarPos('v');
    },

    _scrollbarPos: function (dir, hidden) {
        var that = this,
            pos = dir == 'h' ? that.x : that.y,
            size;

        if (!that[dir + 'Scrollbar']) return;

        pos = that[dir + 'ScrollbarProp'] * pos;

        if (pos < 0) {
            if (!that.options.fixedScrollbar) {
                size = that[dir + 'ScrollbarIndicatorSize'] + m.round(pos * 3);
                if (size < 8) size = 8;
                that[dir + 'ScrollbarIndicator'].style[dir == 'h' ? 'width' : 'height'] = size + 'px';
            }
            pos = 0;
        } else if (pos > that[dir + 'ScrollbarMaxScroll']) {
            if (!that.options.fixedScrollbar) {
                size = that[dir + 'ScrollbarIndicatorSize'] - m.round((pos - that[dir + 'ScrollbarMaxScroll']) * 3);
                if (size < 8) size = 8;
                that[dir + 'ScrollbarIndicator'].style[dir == 'h' ? 'width' : 'height'] = size + 'px';
                pos = that[dir + 'ScrollbarMaxScroll'] + (that[dir + 'ScrollbarIndicatorSize'] - size);
            } else {
                pos = that[dir + 'ScrollbarMaxScroll'];
            }
        }

        that[dir + 'ScrollbarWrapper'].style[transitionDelay] = '0';
        that[dir + 'ScrollbarWrapper'].style.opacity = hidden && that.options.hideScrollbar ? '0' : '1';
        that[dir + 'ScrollbarIndicator'].style[transform] = 'translate(' + (dir == 'h' ? pos + 'px,0)' : '0,' + pos + 'px)') + translateZ;
    },
    
    _start: function (e) {
        var that = this,
            point = hasTouch ? e.touches[0] : e,
            matrix, x, y,
            c1, c2;

        if (!that.enabled) return;

        if (that.options.onBeforeScrollStart) that.options.onBeforeScrollStart.call(that, e);

        if (that.options.useTransition || that.options.zoom) that._transitionTime(0);

        that.moved = false;
        that.animating = false;
        that.zoomed = false;
        that.distX = 0;
        that.distY = 0;
        that.absDistX = 0;
        that.absDistY = 0;
        that.dirX = 0;
        that.dirY = 0;

        // Gesture start
        if (that.options.zoom && hasTouch && e.touches.length > 1) {
            c1 = m.abs(e.touches[0].pageX-e.touches[1].pageX);
            c2 = m.abs(e.touches[0].pageY-e.touches[1].pageY);
            that.touchesDistStart = m.sqrt(c1 * c1 + c2 * c2);

            that.originX = m.abs(e.touches[0].pageX + e.touches[1].pageX - that.wrapperOffsetLeft * 2) / 2 - that.x;
            that.originY = m.abs(e.touches[0].pageY + e.touches[1].pageY - that.wrapperOffsetTop * 2) / 2 - that.y;

            if (that.options.onZoomStart) that.options.onZoomStart.call(that, e);
        }

        if (that.options.momentum) {
            if (that.options.useTransform) {
                // Very lame general purpose alternative to CSSMatrix
                matrix = getComputedStyle(that.scroller, null)[transform].replace(/[^0-9\-.,]/g, '').split(',');
                x = +(matrix[12] || matrix[4]);
                y = +(matrix[13] || matrix[5]);
            } else {
                x = +getComputedStyle(that.scroller, null).left.replace(/[^0-9-]/g, '');
                y = +getComputedStyle(that.scroller, null).top.replace(/[^0-9-]/g, '');
            }
            
            if (x != that.x || y != that.y) {
                if (that.options.useTransition) that._unbind(TRNEND_EV);
                else cancelFrame(that.aniTime);
                that.steps = [];
                that._pos(x, y);
                if (that.options.onScrollEnd) that.options.onScrollEnd.call(that);
            }
        }

        that.absStartX = that.x;    // Needed by snap threshold
        that.absStartY = that.y;

        that.startX = that.x;
        that.startY = that.y;
        that.pointX = point.pageX;
        that.pointY = point.pageY;

        that.startTime = e.timeStamp || Date.now();

        if (that.options.onScrollStart) that.options.onScrollStart.call(that, e);

        that._bind(MOVE_EV, window);
        that._bind(END_EV, window);
        that._bind(CANCEL_EV, window);
    },
    
    _move: function (e) {
        var that = this,
            point = hasTouch ? e.touches[0] : e,
            deltaX = point.pageX - that.pointX,
            deltaY = point.pageY - that.pointY,
            newX = that.x + deltaX,
            newY = that.y + deltaY,
            c1, c2, scale,
            timestamp = e.timeStamp || Date.now();

        if (that.options.onBeforeScrollMove) that.options.onBeforeScrollMove.call(that, e);

        // Zoom
        if (that.options.zoom && hasTouch && e.touches.length > 1) {
            c1 = m.abs(e.touches[0].pageX - e.touches[1].pageX);
            c2 = m.abs(e.touches[0].pageY - e.touches[1].pageY);
            that.touchesDist = m.sqrt(c1*c1+c2*c2);

            that.zoomed = true;

            scale = 1 / that.touchesDistStart * that.touchesDist * this.scale;

            if (scale < that.options.zoomMin) scale = 0.5 * that.options.zoomMin * Math.pow(2.0, scale / that.options.zoomMin);
            else if (scale > that.options.zoomMax) scale = 2.0 * that.options.zoomMax * Math.pow(0.5, that.options.zoomMax / scale);

            that.lastScale = scale / this.scale;

            newX = this.originX - this.originX * that.lastScale + this.x;
            newY = this.originY - this.originY * that.lastScale + this.y;

            this.scroller.style[transform] = 'translate(' + newX + 'px,' + newY + 'px) scale(' + scale + ')' + translateZ;

            if (that.options.onZoom) that.options.onZoom.call(that, e);
            return;
        }

        that.pointX = point.pageX;
        that.pointY = point.pageY;

        // Slow down if outside of the boundaries
        if (newX > 0 || newX < that.maxScrollX) {
            newX = that.options.bounce ? that.x + (deltaX / 2) : newX >= 0 || that.maxScrollX >= 0 ? 0 : that.maxScrollX;
        }
        if (newY > that.minScrollY || newY < that.maxScrollY) {
            newY = that.options.bounce ? that.y + (deltaY / 2) : newY >= that.minScrollY || that.maxScrollY >= 0 ? that.minScrollY : that.maxScrollY;
        }

        that.distX += deltaX;
        that.distY += deltaY;
        that.absDistX = m.abs(that.distX);
        that.absDistY = m.abs(that.distY);

        if (that.absDistX < 6 && that.absDistY < 6) {
            return;
        }

        // Lock direction
        if (that.options.lockDirection) {
            if (that.absDistX > that.absDistY + 5) {
                newY = that.y;
                deltaY = 0;
            } else if (that.absDistY > that.absDistX + 5) {
                newX = that.x;
                deltaX = 0;
            }
        }

        that.moved = true;
        that._pos(newX, newY);
        that.dirX = deltaX > 0 ? -1 : deltaX < 0 ? 1 : 0;
        that.dirY = deltaY > 0 ? -1 : deltaY < 0 ? 1 : 0;

        if (timestamp - that.startTime > 300) {
            that.startTime = timestamp;
            that.startX = that.x;
            that.startY = that.y;
        }
        
        if (that.options.onScrollMove) that.options.onScrollMove.call(that, e);
    },
    
    _end: function (e) {
        if (hasTouch && e.touches.length !== 0) return;

        var that = this,
            point = hasTouch ? e.changedTouches[0] : e,
            target, ev,
            momentumX = { dist:0, time:0 },
            momentumY = { dist:0, time:0 },
            duration = (e.timeStamp || Date.now()) - that.startTime,
            newPosX = that.x,
            newPosY = that.y,
            distX, distY,
            newDuration,
            snap,
            scale;

        that._unbind(MOVE_EV, window);
        that._unbind(END_EV, window);
        that._unbind(CANCEL_EV, window);

        if (that.options.onBeforeScrollEnd) that.options.onBeforeScrollEnd.call(that, e);

        if (that.zoomed) {
            scale = that.scale * that.lastScale;
            scale = Math.max(that.options.zoomMin, scale);
            scale = Math.min(that.options.zoomMax, scale);
            that.lastScale = scale / that.scale;
            that.scale = scale;

            that.x = that.originX - that.originX * that.lastScale + that.x;
            that.y = that.originY - that.originY * that.lastScale + that.y;
            
            that.scroller.style[transitionDuration] = '200ms';
            that.scroller.style[transform] = 'translate(' + that.x + 'px,' + that.y + 'px) scale(' + that.scale + ')' + translateZ;
            
            that.zoomed = false;
            that.refresh();

            if (that.options.onZoomEnd) that.options.onZoomEnd.call(that, e);
            return;
        }

        if (!that.moved) {
            if (hasTouch) {
                if (that.doubleTapTimer && that.options.zoom) {
                    // Double tapped
                    clearTimeout(that.doubleTapTimer);
                    that.doubleTapTimer = null;
                    if (that.options.onZoomStart) that.options.onZoomStart.call(that, e);
                    that.zoom(that.pointX, that.pointY, that.scale == 1 ? that.options.doubleTapZoom : 1);
                    if (that.options.onZoomEnd) {
                        setTimeout(function() {
                            that.options.onZoomEnd.call(that, e);
                        }, 200); // 200 is default zoom duration
                    }
                } else if (this.options.handleClick) {
                    that.doubleTapTimer = setTimeout(function () {
                        that.doubleTapTimer = null;

                        // Find the last touched element
                        target = point.target;
                        while (target.nodeType != 1) target = target.parentNode;

                        if (target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA') {
                            ev = doc.createEvent('MouseEvents');
                            ev.initMouseEvent('click', true, true, e.view, 1,
                                point.screenX, point.screenY, point.clientX, point.clientY,
                                e.ctrlKey, e.altKey, e.shiftKey, e.metaKey,
                                0, null);
                            ev._fake = true;
                            target.dispatchEvent(ev);
                        }
                    }, that.options.zoom ? 250 : 0);
                }
            }

            that._resetPos(400);

            if (that.options.onTouchEnd) that.options.onTouchEnd.call(that, e);
            return;
        }

        if (duration < 300 && that.options.momentum) {
            momentumX = newPosX ? that._momentum(newPosX - that.startX, duration, -that.x, that.scrollerW - that.wrapperW + that.x, that.options.bounce ? that.wrapperW : 0) : momentumX;
            momentumY = newPosY ? that._momentum(newPosY - that.startY, duration, -that.y, (that.maxScrollY < 0 ? that.scrollerH - that.wrapperH + that.y - that.minScrollY : 0), that.options.bounce ? that.wrapperH : 0) : momentumY;

            newPosX = that.x + momentumX.dist;
            newPosY = that.y + momentumY.dist;

            if ((that.x > 0 && newPosX > 0) || (that.x < that.maxScrollX && newPosX < that.maxScrollX)) momentumX = { dist:0, time:0 };
            if ((that.y > that.minScrollY && newPosY > that.minScrollY) || (that.y < that.maxScrollY && newPosY < that.maxScrollY)) momentumY = { dist:0, time:0 };
        }

        if (momentumX.dist || momentumY.dist) {
            newDuration = m.max(m.max(momentumX.time, momentumY.time), 10);

            // Do we need to snap?
            if (that.options.snap) {
                distX = newPosX - that.absStartX;
                distY = newPosY - that.absStartY;
                if (m.abs(distX) < that.options.snapThreshold && m.abs(distY) < that.options.snapThreshold) { that.scrollTo(that.absStartX, that.absStartY, 200); }
                else {
                    snap = that._snap(newPosX, newPosY);
                    newPosX = snap.x;
                    newPosY = snap.y;
                    newDuration = m.max(snap.time, newDuration);
                }
            }

            that.scrollTo(m.round(newPosX), m.round(newPosY), newDuration);

            if (that.options.onTouchEnd) that.options.onTouchEnd.call(that, e);
            return;
        }

        // Do we need to snap?
        if (that.options.snap) {
            distX = newPosX - that.absStartX;
            distY = newPosY - that.absStartY;
            if (m.abs(distX) < that.options.snapThreshold && m.abs(distY) < that.options.snapThreshold) that.scrollTo(that.absStartX, that.absStartY, 200);
            else {
                snap = that._snap(that.x, that.y);
                if (snap.x != that.x || snap.y != that.y) that.scrollTo(snap.x, snap.y, snap.time);
            }

            if (that.options.onTouchEnd) that.options.onTouchEnd.call(that, e);
            return;
        }

        that._resetPos(200);
        if (that.options.onTouchEnd) that.options.onTouchEnd.call(that, e);
    },
    
    _resetPos: function (time) {
        var that = this,
            resetX = that.x >= 0 ? 0 : that.x < that.maxScrollX ? that.maxScrollX : that.x,
            resetY = that.y >= that.minScrollY || that.maxScrollY > 0 ? that.minScrollY : that.y < that.maxScrollY ? that.maxScrollY : that.y;

        if (resetX == that.x && resetY == that.y) {
            if (that.moved) {
                that.moved = false;
                if (that.options.onScrollEnd) that.options.onScrollEnd.call(that);      // Execute custom code on scroll end
            }

            if (that.hScrollbar && that.options.hideScrollbar) {
                if (vendor == 'webkit') that.hScrollbarWrapper.style[transitionDelay] = '300ms';
                that.hScrollbarWrapper.style.opacity = '0';
            }
            if (that.vScrollbar && that.options.hideScrollbar) {
                if (vendor == 'webkit') that.vScrollbarWrapper.style[transitionDelay] = '300ms';
                that.vScrollbarWrapper.style.opacity = '0';
            }

            return;
        }

        that.scrollTo(resetX, resetY, time || 0);
    },

    _wheel: function (e) {
        var that = this,
            wheelDeltaX, wheelDeltaY,
            deltaX, deltaY,
            deltaScale;

        if ('wheelDeltaX' in e) {
            wheelDeltaX = e.wheelDeltaX / 12;
            wheelDeltaY = e.wheelDeltaY / 12;
        } else if('wheelDelta' in e) {
            wheelDeltaX = wheelDeltaY = e.wheelDelta / 12;
        } else if ('detail' in e) {
            wheelDeltaX = wheelDeltaY = -e.detail * 3;
        } else {
            return;
        }
        
        if (that.options.wheelAction == 'zoom') {
            deltaScale = that.scale * Math.pow(2, 1/3 * (wheelDeltaY ? wheelDeltaY / Math.abs(wheelDeltaY) : 0));
            if (deltaScale < that.options.zoomMin) deltaScale = that.options.zoomMin;
            if (deltaScale > that.options.zoomMax) deltaScale = that.options.zoomMax;
            
            if (deltaScale != that.scale) {
                if (!that.wheelZoomCount && that.options.onZoomStart) that.options.onZoomStart.call(that, e);
                that.wheelZoomCount++;
                
                that.zoom(e.pageX, e.pageY, deltaScale, 400);
                
                setTimeout(function() {
                    that.wheelZoomCount--;
                    if (!that.wheelZoomCount && that.options.onZoomEnd) that.options.onZoomEnd.call(that, e);
                }, 400);
            }
            
            return;
        }
        
        deltaX = that.x + wheelDeltaX;
        deltaY = that.y + wheelDeltaY;

        if (deltaX > 0) deltaX = 0;
        else if (deltaX < that.maxScrollX) deltaX = that.maxScrollX;

        if (deltaY > that.minScrollY) deltaY = that.minScrollY;
        else if (deltaY < that.maxScrollY) deltaY = that.maxScrollY;
    
        if (that.maxScrollY < 0) {
            that.scrollTo(deltaX, deltaY, 0);
        }
    },
    
    _transitionEnd: function (e) {
        var that = this;

        if (e.target != that.scroller) return;

        that._unbind(TRNEND_EV);
        
        that._startAni();
    },


    /**
    *
    * Utilities
    *
    */
    _startAni: function () {
        var that = this,
            startX = that.x, startY = that.y,
            startTime = Date.now(),
            step, easeOut,
            animate;

        if (that.animating) return;
        
        if (!that.steps.length) {
            that._resetPos(400);
            return;
        }
        
        step = that.steps.shift();
        
        if (step.x == startX && step.y == startY) step.time = 0;

        that.animating = true;
        that.moved = true;
        
        if (that.options.useTransition) {
            that._transitionTime(step.time);
            that._pos(step.x, step.y);
            that.animating = false;
            if (step.time) that._bind(TRNEND_EV);
            else that._resetPos(0);
            return;
        }

        animate = function () {
            var now = Date.now(),
                newX, newY;

            if (now >= startTime + step.time) {
                that._pos(step.x, step.y);
                that.animating = false;
                if (that.options.onAnimationEnd) that.options.onAnimationEnd.call(that);            // Execute custom code on animation end
                that._startAni();
                return;
            }

            now = (now - startTime) / step.time - 1;
            easeOut = m.sqrt(1 - now * now);
            newX = (step.x - startX) * easeOut + startX;
            newY = (step.y - startY) * easeOut + startY;
            that._pos(newX, newY);
            if (that.animating) that.aniTime = nextFrame(animate);
        };

        animate();
    },

    _transitionTime: function (time) {
        time += 'ms';
        this.scroller.style[transitionDuration] = time;
        if (this.hScrollbar) this.hScrollbarIndicator.style[transitionDuration] = time;
        if (this.vScrollbar) this.vScrollbarIndicator.style[transitionDuration] = time;
    },

    _momentum: function (dist, time, maxDistUpper, maxDistLower, size) {
        var deceleration = 0.0006,
            speed = m.abs(dist) / time,
            newDist = (speed * speed) / (2 * deceleration),
            newTime = 0, outsideDist = 0;

        // Proportinally reduce speed if we are outside of the boundaries
        if (dist > 0 && newDist > maxDistUpper) {
            outsideDist = size / (6 / (newDist / speed * deceleration));
            maxDistUpper = maxDistUpper + outsideDist;
            speed = speed * maxDistUpper / newDist;
            newDist = maxDistUpper;
        } else if (dist < 0 && newDist > maxDistLower) {
            outsideDist = size / (6 / (newDist / speed * deceleration));
            maxDistLower = maxDistLower + outsideDist;
            speed = speed * maxDistLower / newDist;
            newDist = maxDistLower;
        }

        newDist = newDist * (dist < 0 ? -1 : 1);
        newTime = speed / deceleration;

        return { dist: newDist, time: m.round(newTime) };
    },

    _offset: function (el) {
        var left = -el.offsetLeft,
            top = -el.offsetTop;
            
        while (el = el.offsetParent) {
            left -= el.offsetLeft;
            top -= el.offsetTop;
        }
        
        if (el != this.wrapper) {
            left *= this.scale;
            top *= this.scale;
        }

        return { left: left, top: top };
    },

    _snap: function (x, y) {
        var that = this,
            i, l,
            page, time,
            sizeX, sizeY;

        // Check page X
        page = that.pagesX.length - 1;
        for (i=0, l=that.pagesX.length; i<l; i++) {
            if (x >= that.pagesX[i]) {
                page = i;
                break;
            }
        }
        if (page == that.currPageX && page > 0 && that.dirX < 0) page--;
        x = that.pagesX[page];
        sizeX = m.abs(x - that.pagesX[that.currPageX]);
        sizeX = sizeX ? m.abs(that.x - x) / sizeX * 500 : 0;
        that.currPageX = page;

        // Check page Y
        page = that.pagesY.length-1;
        for (i=0; i<page; i++) {
            if (y >= that.pagesY[i]) {
                page = i;
                break;
            }
        }
        if (page == that.currPageY && page > 0 && that.dirY < 0) page--;
        y = that.pagesY[page];
        sizeY = m.abs(y - that.pagesY[that.currPageY]);
        sizeY = sizeY ? m.abs(that.y - y) / sizeY * 500 : 0;
        that.currPageY = page;

        // Snap with constant speed (proportional duration)
        time = m.round(m.max(sizeX, sizeY)) || 200;

        return { x: x, y: y, time: time };
    },

    _bind: function (type, el, bubble) {
        (el || this.scroller).addEventListener(type, this, !!bubble);
    },

    _unbind: function (type, el, bubble) {
        (el || this.scroller).removeEventListener(type, this, !!bubble);
    },


    /**
    *
    * Public methods
    *
    */
    destroy: function () {
        var that = this;

        that.scroller.style[transform] = '';

        // Remove the scrollbars
        that.hScrollbar = false;
        that.vScrollbar = false;
        that._scrollbar('h');
        that._scrollbar('v');

        // Remove the event listeners
        that._unbind(RESIZE_EV, window);
        that._unbind(START_EV);
        that._unbind(MOVE_EV, window);
        that._unbind(END_EV, window);
        that._unbind(CANCEL_EV, window);
        
        if (!that.options.hasTouch) {
            that._unbind('DOMMouseScroll');
            that._unbind('mousewheel');
        }
        
        if (that.options.useTransition) that._unbind(TRNEND_EV);
        
        if (that.options.checkDOMChanges) clearInterval(that.checkDOMTime);
        
        if (that.options.onDestroy) that.options.onDestroy.call(that);
    },

    refresh: function () {
        var that = this,
            offset,
            i, l,
            els,
            pos = 0,
            page = 0;

        if (that.scale < that.options.zoomMin) that.scale = that.options.zoomMin;
        that.wrapperW = that.wrapper.clientWidth || 1;
        that.wrapperH = that.wrapper.clientHeight || 1;

        that.minScrollY = -that.options.topOffset || 0;
        that.scrollerW = m.round(that.scroller.offsetWidth * that.scale);
        that.scrollerH = m.round((that.scroller.offsetHeight + that.minScrollY) * that.scale);
        that.maxScrollX = that.wrapperW - that.scrollerW;
        that.maxScrollY = that.wrapperH - that.scrollerH + that.minScrollY;
        that.dirX = 0;
        that.dirY = 0;

        if (that.options.onRefresh) that.options.onRefresh.call(that);

        that.hScroll = that.options.hScroll && that.maxScrollX < 0;
        that.vScroll = that.options.vScroll && (!that.options.bounceLock && !that.hScroll || that.scrollerH > that.wrapperH);

        that.hScrollbar = that.hScroll && that.options.hScrollbar;
        that.vScrollbar = that.vScroll && that.options.vScrollbar && that.scrollerH > that.wrapperH;

        offset = that._offset(that.wrapper);
        that.wrapperOffsetLeft = -offset.left;
        that.wrapperOffsetTop = -offset.top;

        // Prepare snap
        if (typeof that.options.snap == 'string') {
            that.pagesX = [];
            that.pagesY = [];
            els = that.scroller.querySelectorAll(that.options.snap);
            for (i=0, l=els.length; i<l; i++) {
                pos = that._offset(els[i]);
                pos.left += that.wrapperOffsetLeft;
                pos.top += that.wrapperOffsetTop;
                that.pagesX[i] = pos.left < that.maxScrollX ? that.maxScrollX : pos.left * that.scale;
                that.pagesY[i] = pos.top < that.maxScrollY ? that.maxScrollY : pos.top * that.scale;
            }
        } else if (that.options.snap) {
            that.pagesX = [];
            while (pos >= that.maxScrollX) {
                that.pagesX[page] = pos;
                pos = pos - that.wrapperW;
                page++;
            }
            if (that.maxScrollX%that.wrapperW) that.pagesX[that.pagesX.length] = that.maxScrollX - that.pagesX[that.pagesX.length-1] + that.pagesX[that.pagesX.length-1];

            pos = 0;
            page = 0;
            that.pagesY = [];
            while (pos >= that.maxScrollY) {
                that.pagesY[page] = pos;
                pos = pos - that.wrapperH;
                page++;
            }
            if (that.maxScrollY%that.wrapperH) that.pagesY[that.pagesY.length] = that.maxScrollY - that.pagesY[that.pagesY.length-1] + that.pagesY[that.pagesY.length-1];
        }

        // Prepare the scrollbars
        that._scrollbar('h');
        that._scrollbar('v');

        if (!that.zoomed) {
            that.scroller.style[transitionDuration] = '0';
            that._resetPos(400);
        }
    },

    scrollTo: function (x, y, time, relative) {
        var that = this,
            step = x,
            i, l;

        that.stop();

        if (!step.length) step = [{ x: x, y: y, time: time, relative: relative }];
        
        for (i=0, l=step.length; i<l; i++) {
            if (step[i].relative) { step[i].x = that.x - step[i].x; step[i].y = that.y - step[i].y; }
            that.steps.push({ x: step[i].x, y: step[i].y, time: step[i].time || 0 });
        }

        that._startAni();
    },

    scrollToElement: function (el, time) {
        var that = this, pos;
        el = el.nodeType ? el : that.scroller.querySelector(el);
        if (!el) return;

        pos = that._offset(el);
        pos.left += that.wrapperOffsetLeft;
        pos.top += that.wrapperOffsetTop;

        pos.left = pos.left > 0 ? 0 : pos.left < that.maxScrollX ? that.maxScrollX : pos.left;
        pos.top = pos.top > that.minScrollY ? that.minScrollY : pos.top < that.maxScrollY ? that.maxScrollY : pos.top;
        time = time === undefined ? m.max(m.abs(pos.left)*2, m.abs(pos.top)*2) : time;

        that.scrollTo(pos.left, pos.top, time);
    },

    scrollToPage: function (pageX, pageY, time) {
        var that = this, x, y;
        
        time = time === undefined ? 400 : time;

        if (that.options.onScrollStart) that.options.onScrollStart.call(that);

        if (that.options.snap) {
            pageX = pageX == 'next' ? that.currPageX+1 : pageX == 'prev' ? that.currPageX-1 : pageX;
            pageY = pageY == 'next' ? that.currPageY+1 : pageY == 'prev' ? that.currPageY-1 : pageY;

            pageX = pageX < 0 ? 0 : pageX > that.pagesX.length-1 ? that.pagesX.length-1 : pageX;
            pageY = pageY < 0 ? 0 : pageY > that.pagesY.length-1 ? that.pagesY.length-1 : pageY;

            that.currPageX = pageX;
            that.currPageY = pageY;
            x = that.pagesX[pageX];
            y = that.pagesY[pageY];
        } else {
            x = -that.wrapperW * pageX;
            y = -that.wrapperH * pageY;
            if (x < that.maxScrollX) x = that.maxScrollX;
            if (y < that.maxScrollY) y = that.maxScrollY;
        }

        that.scrollTo(x, y, time);
    },

    disable: function () {
        this.stop();
        this._resetPos(0);
        this.enabled = false;

        // If disabled after touchstart we make sure that there are no left over events
        this._unbind(MOVE_EV, window);
        this._unbind(END_EV, window);
        this._unbind(CANCEL_EV, window);
    },
    
    enable: function () {
        this.enabled = true;
    },
    
    stop: function () {
        if (this.options.useTransition) this._unbind(TRNEND_EV);
        else cancelFrame(this.aniTime);
        this.steps = [];
        this.moved = false;
        this.animating = false;
    },
    
    zoom: function (x, y, scale, time) {
        var that = this,
            relScale = scale / that.scale;

        if (!that.options.useTransform) return;

        that.zoomed = true;
        time = time === undefined ? 200 : time;
        x = x - that.wrapperOffsetLeft - that.x;
        y = y - that.wrapperOffsetTop - that.y;
        that.x = x - x * relScale + that.x;
        that.y = y - y * relScale + that.y;

        that.scale = scale;
        that.refresh();

        that.x = that.x > 0 ? 0 : that.x < that.maxScrollX ? that.maxScrollX : that.x;
        that.y = that.y > that.minScrollY ? that.minScrollY : that.y < that.maxScrollY ? that.maxScrollY : that.y;

        that.scroller.style[transitionDuration] = time + 'ms';
        that.scroller.style[transform] = 'translate(' + that.x + 'px,' + that.y + 'px) scale(' + scale + ')' + translateZ;
        that.zoomed = false;
    },
    
    isReady: function () {
        return !this.moved && !this.zoomed && !this.animating;
    }
};

function prefixStyle (style) {
    if ( vendor === '' ) return style;

    style = style.charAt(0).toUpperCase() + style.substr(1);
    return vendor + style;
}

dummyStyle = null;  // for the sake of it

if (typeof exports !== 'undefined') exports.iScroll = iScroll;
else window.iScroll = iScroll;

})(window, document);

/*---------------------*/

/*********************/
/*********************/
/*********************/
/********Spinner******/
var spinner = '<div class="JSVspinnerBlack"><svg viewBox="0 0 64 64"><g stroke-width="4" stroke-linecap="round"><line y1="12" y2="20" transform="translate(32,32) rotate(180)"><animate attributeName="stroke-opacity" dur="750ms" values="1;.85;.7;.65;.55;.45;.35;.25;.15;.1;0;1" repeatCount="indefinite"></animate></line><line y1="12" y2="20" transform="translate(32,32) rotate(210)"><animate attributeName="stroke-opacity" dur="750ms" values="0;1;.85;.7;.65;.55;.45;.35;.25;.15;.1;0" repeatCount="indefinite"></animate></line><line y1="12" y2="20" transform="translate(32,32) rotate(240)"><animate attributeName="stroke-opacity" dur="750ms" values=".1;0;1;.85;.7;.65;.55;.45;.35;.25;.15;.1" repeatCount="indefinite"></animate></line><line y1="12" y2="20" transform="translate(32,32) rotate(270)"><animate attributeName="stroke-opacity" dur="750ms" values=".15;.1;0;1;.85;.7;.65;.55;.45;.35;.25;.15" repeatCount="indefinite"></animate></line><line y1="12" y2="20" transform="translate(32,32) rotate(300)"><animate attributeName="stroke-opacity" dur="750ms" values=".25;.15;.1;0;1;.85;.7;.65;.55;.45;.35;.25" repeatCount="indefinite"></animate></line><line y1="12" y2="20" transform="translate(32,32) rotate(330)"><animate attributeName="stroke-opacity" dur="750ms" values=".35;.25;.15;.1;0;1;.85;.7;.65;.55;.45;.35" repeatCount="indefinite"></animate></line><line y1="12" y2="20" transform="translate(32,32) rotate(0)"><animate attributeName="stroke-opacity" dur="750ms" values=".45;.35;.25;.15;.1;0;1;.85;.7;.65;.55;.45" repeatCount="indefinite"></animate></line><line y1="12" y2="20" transform="translate(32,32) rotate(30)"><animate attributeName="stroke-opacity" dur="750ms" values=".55;.45;.35;.25;.15;.1;0;1;.85;.7;.65;.55" repeatCount="indefinite"></animate></line><line y1="12" y2="20" transform="translate(32,32) rotate(60)"><animate attributeName="stroke-opacity" dur="750ms" values=".65;.55;.45;.35;.25;.15;.1;0;1;.85;.7;.65" repeatCount="indefinite"></animate></line><line y1="12" y2="20" transform="translate(32,32) rotate(90)"><animate attributeName="stroke-opacity" dur="750ms" values=".7;.65;.55;.45;.35;.25;.15;.1;0;1;.85;.7" repeatCount="indefinite"></animate></line><line y1="12" y2="20" transform="translate(32,32) rotate(120)"><animate attributeName="stroke-opacity" dur="750ms" values=".85;.7;.65;.55;.45;.35;.25;.15;.1;0;1;.85" repeatCount="indefinite"></animate></line><line y1="12" y2="20" transform="translate(32,32) rotate(150)"><animate attributeName="stroke-opacity" dur="750ms" values="1;.85;.7;.65;.55;.45;.35;.25;.15;.1;0;1" repeatCount="indefinite"></animate></line></g></svg></div>';

var spinnerModal = '<div id="JSVcontainerLoading" class="JSVcontainer JSVcontainerTransition JSVhideLoading"><div id="JSVgifLoading"><div class="JSVspinnerWhite"><svg viewBox="0 0 64 64"><g stroke-width="4" stroke-linecap="round"><line y1="12" y2="20" transform="translate(32,32) rotate(180)"><animate attributeName="stroke-opacity" dur="750ms" values="1;.85;.7;.65;.55;.45;.35;.25;.15;.1;0;1" repeatCount="indefinite"></animate></line><line y1="12" y2="20" transform="translate(32,32) rotate(210)"><animate attributeName="stroke-opacity" dur="750ms" values="0;1;.85;.7;.65;.55;.45;.35;.25;.15;.1;0" repeatCount="indefinite"></animate></line><line y1="12" y2="20" transform="translate(32,32) rotate(240)"><animate attributeName="stroke-opacity" dur="750ms" values=".1;0;1;.85;.7;.65;.55;.45;.35;.25;.15;.1" repeatCount="indefinite"></animate></line><line y1="12" y2="20" transform="translate(32,32) rotate(270)"><animate attributeName="stroke-opacity" dur="750ms" values=".15;.1;0;1;.85;.7;.65;.55;.45;.35;.25;.15" repeatCount="indefinite"></animate></line><line y1="12" y2="20" transform="translate(32,32) rotate(300)"><animate attributeName="stroke-opacity" dur="750ms" values=".25;.15;.1;0;1;.85;.7;.65;.55;.45;.35;.25" repeatCount="indefinite"></animate></line><line y1="12" y2="20" transform="translate(32,32) rotate(330)"><animate attributeName="stroke-opacity" dur="750ms" values=".35;.25;.15;.1;0;1;.85;.7;.65;.55;.45;.35" repeatCount="indefinite"></animate></line><line y1="12" y2="20" transform="translate(32,32) rotate(0)"><animate attributeName="stroke-opacity" dur="750ms" values=".45;.35;.25;.15;.1;0;1;.85;.7;.65;.55;.45" repeatCount="indefinite"></animate></line><line y1="12" y2="20" transform="translate(32,32) rotate(30)"><animate attributeName="stroke-opacity" dur="750ms" values=".55;.45;.35;.25;.15;.1;0;1;.85;.7;.65;.55" repeatCount="indefinite"></animate></line><line y1="12" y2="20" transform="translate(32,32) rotate(60)"><animate attributeName="stroke-opacity" dur="750ms" values=".65;.55;.45;.35;.25;.15;.1;0;1;.85;.7;.65" repeatCount="indefinite"></animate></line><line y1="12" y2="20" transform="translate(32,32) rotate(90)"><animate attributeName="stroke-opacity" dur="750ms" values=".7;.65;.55;.45;.35;.25;.15;.1;0;1;.85;.7" repeatCount="indefinite"></animate></line><line y1="12" y2="20" transform="translate(32,32) rotate(120)"><animate attributeName="stroke-opacity" dur="750ms" values=".85;.7;.65;.55;.45;.35;.25;.15;.1;0;1;.85" repeatCount="indefinite"></animate></line><line y1="12" y2="20" transform="translate(32,32) rotate(150)"><animate attributeName="stroke-opacity" dur="750ms" values="1;.85;.7;.65;.55;.45;.35;.25;.15;.1;0;1" repeatCount="indefinite"></animate></line></g></svg></div></div></div>';
/*---------------------*/