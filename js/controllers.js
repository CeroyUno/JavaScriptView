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
    viewSlideHammer:function(e){
         $JSView.dataView({
            'title': 'Slide',
            'text1': '<h1>Slide 1</h1>',
            'content1': '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>',
            'text2': '<h1>Slide 2</h1>',
            'content2': '<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.</p>',
            'text3': '<h1>Slide 3</h1>',
            'content3': '<p>But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth.</p>'
        },e)

        $JSView.slideHammer('#slideHammer',e);

    },
    viewSlideAdvertising: function(e){
        
        $JSView.dataView({
            'title': 'Slide Advertising',
            'titleA': 'Title Advertising A',
            'descriptionA': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            'photoA': '../img/productA.png',
            'titleB': 'Slide 2',
            'descriptionB': 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem.',
            'photoB': '../img/productB.png',
            'titleC': 'Slide 3',
            'descriptionC': 'But I must explain to you how all this mistaken idea.',
            'photoC': '../img/productC.png'
        },e)
        
        $JSView.initSlideAdvertising('#slide', {
            width: innerWidth,
            height: 300
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
        
        $JSView.initScroll([
            {
                'name': 'User 1',
                'text': 'Lorem ipsum dolor sit amet.'
            },
            {           
                'name': 'User 2',
                'text': 'Eaque ipsa quae ab illo inventore.'
            },
            {
                'name': 'User 3',
                'text': 'But I must explain to you how.'
            },
            {
                'name': 'User 4',
                'text': 'Lorem ipsum dolor sit amet.'
            },
            {           
                'name': 'User 5',
                'text': 'Eaque ipsa quae ab illo inventore.'
            },
            {
                'name': 'User 6',
                'text': 'But I must explain to you how.'
            },
            {
                'name': 'User 7',
                'text': 'Lorem ipsum dolor sit amet.'
            },
            {           
                'name': 'User 8',
                'text': 'Eaque ipsa quae ab illo inventore.'
            },
            {
                'name': 'User 9',
                'text': 'But I must explain to you how.'
            },
            {
                'name': 'User 10',
                'text': 'Lorem ipsum dolor sit amet.'
            },
            {           
                'name': 'User 11',
                'text': 'Eaque ipsa quae ab illo inventore.'
            },
            {
                'name': 'User 12',
                'text': 'But I must explain to you how. End'
            }
        ],e);
    },
    viewListPhotosLoadMoreRemote: function(e){
        $JSView.dataView({
            'title': 'Photos initLoadMore Remote'
        },e);

        $JSView.initScroll({
            type: 'GET', 
            url:'http://api.javascriptview.com/loadmore',
            loadmore: true
        },e);
    },
    viewListVideosLoadMoreRemote: function(e){
        $JSView.dataView({
            'title': 'Videos initLoadMore Remote'
        },e);
        
        $JSView.initScroll({
            type: 'GET', 
            url:'http://api.javascriptview.com/videos',
            loadmore: true
        },e);
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
