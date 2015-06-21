window.addEventListener('load', function() {

    $JSView.run('bottom');
   
    $JSView.declareMenu({
        /*
        menu: {
            url: '/menu',
            template: 'views/menuLeft.html',
            controler: 'menu'
        },
        */
        menu: {
            url: '/menu',
            template: 'views/menuBottom.html',
            controler: 'menu'
        },
        
        viewMenuA: {
            url: '/viewMenuA',
            template: 'views/viewMenuA.html',
            controler: 'viewMenuA'
        },
        viewMenuB: {
            url: '/viewMenuB',
            template: 'views/viewMenuB.html',
            controler: 'viewMenuB'
        },
        viewMenuC: {
            url: '/viewMenuC',
            template: 'views/viewMenuC.html',
            controler: 'viewMenuC'
        },
        viewMenuD: {
            url: '/viewMenuD',
            template: 'views/viewMenuD.html',
            controler: 'viewMenuD'
        },
        viewMenuE: {
            url: '/viewMenuE',
            template: 'views/viewMenuE.html',
            controler: 'viewMenuE'
        }
    });
    
    $JSView.declareView({ 
        viewA: {
            url: '/viewA',
            template: 'views/viewA.html',
            controler: 'viewA'
        },
        viewB: {
            url: '/viewB',
            template: 'views/viewB.html',
            controler: 'viewB'
        },
        viewC: {
            url: '/viewC',
            template: 'views/viewC.html',
            controler: 'viewC'
        },
        viewD: {
            url: '/viewD',
            template: 'views/viewD.html',
            controler: 'viewD'
        },
        viewE: {
            url: '/viewE',
            template: 'views/viewE.html',
            controler: 'viewE'
        }
    });
    
    $JSView.declareModal({
        modalA: {
            url: '/modal',
            template: 'views/modal.html',
            controler: 'modal'
        }
    });
    
    $JSView
        .initView('viewMenuA');
    

}, false);