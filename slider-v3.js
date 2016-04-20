(
    function( $ ) {
        $.fn.animateMySlider = function ( options ) {
            this.each ( function () {
                var $this = $(this);


                // variables
                var settings = $.extend( {
                    intervalPageChange : 800,      
                    speedPageChange : 500,
                    direction : 'right-to-left',
                    active : 0,
                    zIndex : 100,
                    mouseIn : false,
                    dotColor : '#494949'
                }, options );

                var inAnimation = false;


                // elements
                var el = {
                    slider : function() {
                        return $this;
                    },
                    li : function() {
                        return el.slider().find('li');
                    },
                    activeSlider : function() {
                        return el.li().eq(getActiveNo());
                    },
                    nav : {
                        left : function () {
                            return el.slider().find('nav img:eq(0)')     
                        },
                        right : function () {
                            return el.slider().find('nav img:eq(1)');
                        }
                    },
                    navs : function() {
                        return el.slider().find('nav img');
                    }
                };


                // listeners
                el.slider()
                    .mouseenter(pauseAnimation)
                    .mouseleave(resumeAnimation);

             
                // initialize
                showDots();
                setTimeout(putNavButtonMiddle, 10);
                setInterval(animate, settings.intervalPageChange);
                navButtonClick();


                // Animation
                function animateNo(no) {
                    if ( settings.direction == 'right-to-left' ) {
                        settings.active = parseInt(no) - 1;
                    }
                    else {
                        settings.active = parseInt(no) + 1;
                    }
                    animate(true);
                    }   
                function animate( force ) {
                    if ( ! force ) if ( settings.mouseIn ) return;

                    var w = el.slider().width();
                    var left;
                    if ( settings.direction == 'right-to-left' ) {
                        increaseActiveNo();
                        left = w;
                    }
                    else {
                        decreaseActiveNo();
                        left = -w;
                    }

                    moveDots();

                    var $act = el.activeSlider();
                    var z = getNextIndex();
                    $act.css({
                        'display' : 'block'
                        , 'z-index': z
                        , 'left' : left
                        , 'width' : w + 1
                    } );
                    inAnimation = true;
                    $act.animate({left:0}, settings.speedPageChange, function(){
                        inAnimation = false;
                        el.activeSlider().css('display', 'block');
                    });
                    function resizeHeight() {
                        el.li().height(el.activeSlider().find('img').height());
                    }

                    resizeHeight();
                    putNavButtonMiddle();
                }


                // functions
                function showDots() {
                    var m = '';
                    for ( var i = 0 ; i < el.li().length ; i ++ ) {
                        m += '<b no="'+i+'"><i class="fa fa-circle" aria-hidden="true"></i></b>'; 
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
                        'font-size': '20px',    
                        'color': settings.dotColor, 
                        'line-height' : '20px',
                        'cursor': 'pointer'
                    });                  
                            
                    el.slider().find('.fa-circle').css('padding-left', '4px');
                    
                    $dots.find(':eq(0)').css({
                        'color': 'white'
                    });
                    $dots.find('b').click(function(){
                        if ( inAnimation ) return;
                        var no = $(this).attr('no');
                        //console.log(no);
                        animateNo(no);
                    });
                }


                function moveDots() {
                    var $dots = el.slider().find('.dots');
                    $dots.find('b').css('color', settings.dotColor);
                    $dots.find('b:eq("'+getActiveNo()+'")').css('color', 'white');
                }


                function increaseActiveNo() {
                    ++ settings.active;
                }
                function decreaseActiveNo() {
                    -- settings.active;
                }

                function getActiveNo() {
                    if ( settings.active >= el.li().length ) settings.active = 0;
                    else if ( settings.active < 0 ) settings.active = el.li().length - 1;
                    return settings.active;
                }


                function getNextIndex() {
                    return ++ settings.zIndex;
                }


                function putNavButtonMiddle() {
                    var h_slider = el.slider().height();
                    var h_button = el.nav.left().height();
                    var pos_top = parseInt( h_slider / 2 - h_button / 2 );
                    el.nav.left().css('top', pos_top);
                    el.nav.right().css('top', pos_top);
                    el.navs().css('display', 'block');
                }

                 function navButtonClick() {
                    if (el.nav.left().click(function(){
                        if ( inAnimation ) return; 
                    settings.direction = 'left-to-right';
                    animate(true);
                    }));
                    if (el.nav.right().click(function(){
                        if ( inAnimation ) return; 
                        settings.direction = 'right-to-left';
                        animate(true);
                    }));       
                }

                function pauseAnimation() {
                    settings.mouseIn = true;
                }
                function resumeAnimation() {
                    settings.mouseIn = false;
                }

            } );
        };
    } ( jQuery )
);
