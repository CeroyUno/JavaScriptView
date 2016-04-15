$JSView.controller = {
    
    viewMenuA: function(e){
        $JSView.dataView({
            'title': 'Welcome'
        },e)
    },
    viewMenuB: function(e){
        $JSView.dataView({
            'title': 'Templates'
        },e)
    },
    viewMenuC: function(e){
        $JSView.dataView({
            'title': 'Examples initLoadMore'
        },e)
    },
    viewMenuD: function(e){
        $JSView.dataView({
            'title': 'Examples initReload'
        },e)
    },
    viewGeneral: function(e){
        $JSView.dataView({
            'title': 'General elements'
        },e)
    },
    viewForms: function(e){
        $JSView.dataView({
            'title': 'Forms elements'
        },e)
    },
	viewFormsPlaceholder: function(e){
        $JSView.dataView({
            'title': 'Forms elements placeholder'
        },e)
        
        $JSView.initFormPlaceholder(e, 'formExample');
        
    },
    viewGrids: function(e){
        $JSView.dataView({
            'title': 'Grids'
        },e)
    },
    viewSlide: function(e){
        
        $JSView.dataView({
            'title': 'Slide',
            'text1': '<h1>Slide 1</h1>',
            'content1': '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>',
            'text2': '<h1>Slide 2</h1>',
            'content2': '<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.</p>',
            'text3': '<h1>Slide 3</h1>',
            'content3': '<p>But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth.</p>'
        },e)
        
        $JSView.initSlide('#slide', {
            responsive: true,
            indicators: true
        });
        
    },
    viewRoomChat: function(e){
        $JSView.dataView({
            'title': 'Room chat'
        },e)
    },
    viewTabs: function(e){
        $JSView.dataView({
            'title': 'Tabs'
        },e)
        $JSView.initTabs(e);
    },
    viewList: function(e){
        $JSView.dataView({
            'title': 'List'
        },e)
    },
    viewListPhotos: function(e){
        $JSView.dataView({
            'title': 'List Photos'
        },e)
    },
    viewListVideos: function(e){
        $JSView.dataView({
            'title': 'List Videos'
        },e)
    },
    viewTweets: function(e){
        $JSView.dataView({
            'title': 'Tweets'
        },e)
    },
    viewCards: function(e){
        $JSView.dataView({
            'title': 'Cards'
        },e)
    },
    viewOptions: function(e){
        $JSView.dataView({
            'title': 'Menu Options'
        },e)
    },
    viewNotification: function(e){
        $JSView.dataView({
            'title': 'Notification'
        },e)
    },
    viewCircle: function(e){
        $JSView.dataView({
            'title': 'Menu Circle'
        },e)
        
        $JSView.initMenuCircle(e)
        
    },
    viewImagePopup: function(e){
        $JSView.dataView({
            'title': 'Image Popup'
        },e)
    },
    viewListPhotosLoadMoreLocal: function(e){
        $JSView.dataView({
            'title': 'Photos initLoadMore Local'
        },e),

        $JSView.initLoadMore({
            item1: {
                'name': 'User 1',
                'text': 'Lorem ipsum dolor sit amet.'
            },
            item2: {           
                'name': 'User 2',
                'text': 'Eaque ipsa quae ab illo inventore.'
            },
            item3: {
                'name': 'User 3',
                'text': 'But I must explain to you how.'
            },
            item4: {
                'name': 'User 1',
                'text': 'Lorem ipsum dolor sit amet.'
            },
            item5: {           
                'name': 'User 2',
                'text': 'Eaque ipsa quae ab illo inventore.'
            },
            item6: {
                'name': 'User 3',
                'text': 'But I must explain to you how.'
            },
            item7: {
                'name': 'User 1',
                'text': 'Lorem ipsum dolor sit amet.'
            },
            item8: {           
                'name': 'User 2',
                'text': 'Eaque ipsa quae ab illo inventore.'
            },
            item9: {
                'name': 'User 3',
                'text': 'But I must explain to you how.'
            },
            item10: {
                'name': 'User 1',
                'text': 'Lorem ipsum dolor sit amet.'
            },
            item11: {           
                'name': 'User 2',
                'text': 'Eaque ipsa quae ab illo inventore.'
            },
            item12: {
                'name': 'User 3',
                'text': 'But I must explain to you how. End'
            }
        },e); 
    },
    viewListPhotosLoadMoreRemote: function(e){
        $JSView.dataView({
            'title': 'Photos initLoadMore Remote'
        },e),

        $JSView.initScroll({
            type: 'GET', 
            url:'http://api.javascriptview.com/loadmore'
        },e),

        // $JSView.reload({
        //     type: 'GET', 
        //     url:'http://api.javascriptview.com/reload'
        // },e),

        $JSView.swipeRight({},e);
    },
    viewListVideosLoadMoreRemote: function(e){
        $JSView.dataView({
            'title': 'Videos initLoadMore Remote'
        },e),

        $JSView.initScroll({
            type: 'GET', 
            url:'http://api.javascriptview.com/videos'
        },e),
        
        $JSView.swipeRight({},e);
    },
    modal: function(e){
        $JSView.dataView({
            'title': 'Modal'      
        },e)
    },
    menu: function(e){
        $JSView.dataView({},e)
    }

}
