$JSView.controller = {
    
    viewMenuA: function(e){
        $JSView.dataView({
            'title': 'Title Menu A'
        },e)
    },
    viewMenuB: function(e){
        $JSView.dataView({
            'title': 'Title Menu B'
        },e)
    },
    viewMenuC: function(e){
        $JSView.dataView({
            'title': 'Title Menu C'
        },e)
    },
    viewMenuD: function(e){
        $JSView.dataView({
            'title': 'Title Menu D'
        },e)
    },
    viewMenuE: function(e){
        $JSView.dataView({
            'title': 'Title Menu E'
        },e)
    },
    viewA: function(e){
        $JSView.dataView({
            'title': 'Title A'
        },e)
    },
    viewB: function(e){
        $JSView.dataView({
            'title': 'Title B'
        },e)
    },
    viewC: function(e){
        
        $JSView.dataView({
            'title': 'Title C',
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
    viewD: function(e){
        $JSView.dataView({
            'title': 'Title D'
        },e)
    },
    viewE: function(e){
        $JSView.dataView({
            'title': 'Title E'
        },e)
        $JSView.initTabs(e);
    },
    viewF: function(e){
        $JSView.dataView({
            'title': 'Title F'
        },e)
        
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
    viewG: function(e){
        $JSView.dataView({
            'title': 'Title H'
        },e)
        $JSView.initLoadMore({
            type: 'GET', 
            url:'http://api.javascriptview.com/loadmore'
        },e);
    },
    modalA: function(e){
        $JSView.dataView({
            'title': 'Title modal A'
        },e)
    },
    menu: function(e){
        $JSView.dataView({},e)
    }

}
