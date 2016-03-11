/**
 * Deprecated. See version 3.
 */
$(function() {

    var attr = {
        intervalPageChange : 800,
        speedPageChange : 500,
        direction : 'right-to-left',
        active : 0,
        zIndex : 100,
        mouseIn : false,
        dotColor : '#494949'
    };
    var el = {
        slider : function() {
            return $('#my-slider');
        },
        li : function() {
            return el.slider().find('li');
        },
        activeSlider : function() {
            return el.li().eq(getActiveNo());
        },
        nav : {
            left : function () {
                return el.slider().find('nav img:eq(0)');
            },
            right : function () {
                return el.slider().find('nav img:eq(1)');
            }
        }
    };

    el.slider()
        .mouseover(pauseAnimation)
        .mouseleave(resumeAnimation);


    el.nav.left().click(function(){
        console.log('left clicked');
        attr.direction = 'left-to-right';
        animate(true);
    });
    el.nav.right().click(function(){
        console.log('right clicked');
        attr.direction = 'right-to-left';
        animate(true);
    });



    putButtonMiddle();
    function showDots() {
        var m = '';
        for ( var i = 0 ; i < el.li().length ; i ++ ) {
            m += '<b no="'+i+'">-</b>';
        }
        el.slider().append('<nav class="dots">' + m + '</nav>');
        var $dots = el.slider().find('.dots');
        $dots.css( {
            'position': 'absolute',
            'z-index': 987654321,
            'bottom' : 0,
            'left' : 0,
            'right' : 0,
            'text-align' : 'center',
            'font-size': '40px',
            'color': attr.dotColor,
            'line-height' : '20px',
            'cursor': 'pointer'
        });
        $dots.find(':eq(0)').css({
            'color': 'white'
        });
        $dots.find('b').click(function(){
            var no = $(this).attr('no');
            console.log(no);
            animateNo(no);
        });
    }
    showDots();



    setInterval(animate, attr.intervalPageChange);

    //console.log( el.li().length );

    function animateNo(no) {
        if ( attr.direction == 'right-to-left' ) {
            attr.active = parseInt(no) - 1;
        }
        else {
            attr.active = parseInt(no) + 1;
        }
        console.log('attr.active:' + attr.active);
        animate(true);
    }
    function animate( force ) {

        if ( ! force ) if ( attr.mouseIn ) return;

        var w = el.slider().width();
        var left;
        if ( attr.direction == 'right-to-left' ) {
            increaseActiveNo();
            left = w;
        }
        else {
            decreaseActiveNo();
            left = -w;
        }

        moveDots();

        var $act = el.activeSlider();// $li.eq(getActiveNo());//getActiveSlider();
        var z = getNextIndex();
        $act.css({
            'display' : 'block'
            , 'z-index': z
            , 'left' : left
            , 'width' : w + 1
        } );
        $act.animate({left:0}, attr.speedPageChange, function(){
            el.activeSlider().css('display', 'block');
        });
        function resizeHeight() {
            el.li().height(el.activeSlider().find('img').height());
        }

        resizeHeight();

        putButtonMiddle();
    }


    function moveDots() {
        var $dots = el.slider().find('.dots');
        $dots.find('b').css('color', attr.dotColor);
        $dots.find('b:eq("'+getActiveNo()+'")').css('color', 'white');
    }


    function increaseActiveNo() {
        ++ attr.active;
    }
    function decreaseActiveNo() {
        -- attr.active;
    }

    function getActiveNo() {
        if ( attr.active >= el.li().length ) attr.active = 0;
        else if ( attr.active < 0 ) attr.active = el.li().length - 1;
        return attr.active;
    }


    function getNextIndex() {
        return ++ attr.zIndex;
    }


    function putButtonMiddle() {
        var h_slider = el.activeSlider().height();
        var h_button = el.nav.left().height();
        var pos_top = ( h_slider / 2 - h_button / 2 );
        el.nav.left().css('top', pos_top);
        el.nav.right().css('top', pos_top);
    }



    // functions
    function pauseAnimation() {
        attr.mouseIn = true;
    }
    function resumeAnimation() {
        attr.mouseIn = false;
    }

});