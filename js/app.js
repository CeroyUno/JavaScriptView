window.addEventListener('load', function() {

    $JSView.run('bottom');
   
    $JSView.declareMenu({
        /*
        menu: {
            url: '/menu',
            template: 'views/menuLeft.html',
            controller: 'menu'
        },
        */
        menu: {
            url: '/menu',
            template: 'views/menuBottom.html',
            controller: 'menu'
        },
        
        viewMenuA: {
            url: '/viewMenuA',
            template: 'views/viewMenuA.html',
            controller: 'viewMenuA'
        },
        viewMenuB: {
            url: '/viewMenuB',
            template: 'views/viewMenuB.html',
            controller: 'viewMenuB'
        },
        viewMenuC: {
            url: '/viewMenuC',
            template: 'views/viewMenuC.html',
            controller: 'viewMenuC'
        },
        viewMenuD: {
            url: '/viewMenuD',
            template: 'views/viewMenuD.html',
            controller: 'viewMenuD'
        },
        viewMenuE: {
            url: '/viewMenuE',
            template: 'views/viewMenuE.html',
            controller: 'viewMenuE'
        }
    });
    
    $JSView.declareView({ 
        viewA: {
            url: '/viewA',
            template: 'views/viewA.html',
            controller: 'viewA'
        },
        viewB: {
            url: '/viewB',
            template: 'views/viewB.html',
            controller: 'viewB'
        },
        viewC: {
            url: '/viewC',
            template: 'views/viewC.html',
            controller: 'viewC'
        },
        viewD: {
            url: '/viewD',
            template: 'views/viewD.html',
            controller: 'viewD'
        },
        viewE: {
            url: '/viewE',
            template: 'views/viewE.html',
            controller: 'viewE'
        },
        viewF: {
            url: '/viewF',
            template: 'views/viewF.html',
            controller: 'viewF'
        },
        viewG: {
            url: '/viewG',
            template: 'views/viewG.html',
            controller: 'viewG'
        }
    });
    
    $JSView.declareModal({
        modalA: {
            url: '/modal',
            template: 'views/modal.html',
            controller: 'modal'
        }
    });
    
    $JSView
        .initView('viewMenuA');
    
}, false);