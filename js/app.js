window.addEventListener('load', function() {
    
    //You can change (bottom) or (left)
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
        }
    });
    
    $JSView.declareView({ 
        viewGeneral: {
            url: '/viewGeneral',
            template: 'views/viewGeneral.html',
            controller: 'viewGeneral'
        },
        viewForms: {
            url: '/viewForms',
            template: 'views/viewForms.html',
            controller: 'viewForms'
        },
        viewGrids: {
            url: '/viewGrids',
            template: 'views/viewGrids.html',
            controller: 'viewGrids'
        },
        viewSlide: {
            url: '/viewSlide',
            template: 'views/viewSlide.html',
            controller: 'viewSlide'
        },
        viewRoomChat: {
            url: '/viewRoomChat',
            template: 'views/viewRoomChat.html',
            controller: 'viewRoomChat'
        },
        viewTabs: {
            url: '/viewTabs',
            template: 'views/viewTabs.html',
            controller: 'viewTabs'
        },
        viewList: {
            url: '/viewList',
            template: 'views/viewList.html',
            controller: 'viewList'
        },
        viewListPhotos: {
            url: '/viewListPhotos',
            template: 'views/viewListPhotos.html',
            controller: 'viewListPhotos'
        },
        viewListVideos: {
            url: '/viewListVideos',
            template: 'views/viewListVideos.html',
            controller: 'viewListVideos'
        },
        viewTweets: {
            url: '/viewTweets',
            template: 'views/viewTweets.html',
            controller: 'viewTweets'
        },
        viewCards: {
            url: '/viewCards',
            template: 'views/viewCards.html',
            controller: 'viewCards'
        },
        viewOptions: {
            url: '/viewOptions',
            template: 'views/viewOptions.html',
            controller: 'viewOptions'
        },
        viewNotification: {
            url: '/viewNotification',
            template: 'views/viewNotification.html',
            controller: 'viewNotification'
        },
        viewCircle: {
            url: '/viewCircle',
            template: 'views/viewCircle.html',
            controller: 'viewCircle'
        },
        viewListPhotosLoadMoreLocal: {
            url: '/viewListPhotosLoadMoreLocal',
            template: 'views/viewListPhotosLoadMoreLocal.html',
            controller: 'viewListPhotosLoadMoreLocal'
        },
        viewListPhotosLoadMoreRemote: {
            url: '/viewListPhotosLoadMoreRemote',
            template: 'views/viewListPhotosLoadMoreRemote.html',
            controller: 'viewListPhotosLoadMoreRemote'
        },
        viewListVideosLoadMoreRemote: {
            url: '/viewListVideosLoadMoreRemote',
            template: 'views/viewListVideosLoadMoreRemote.html',
            controller: 'viewListVideosLoadMoreRemote'
        }
    });
    
    $JSView.declareModal({
        modal: {
            url: '/modal',
            template: 'views/modal.html',
            controller: 'modal'
        }
    });
    
    $JSView
        .initView('viewMenuA');
    
}, false);