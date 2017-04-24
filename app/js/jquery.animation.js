
( function() {
    "use strict";

    $( function() {

        $.each( $( '.slides' ), function() {
            new Slides ( $( this ) );
        } );

    });

    var Slides = function ( obj ) {

        //private properties
        var _self = this,
            _obj = obj,
            _window = $( window ),
            _characters;

        //private methods
        var _addEvents = function () {
                _window.on({
                    scroll: function () {

                        _checkScroll();

                    }
                });
            },
            _checkScroll = function(){

                var windowH = _window.height(),
                    i = 0,
                    elements = _obj.find('.slides__item');

                elements.each(function () {

                    var curItem = $(this),
                        topPos = _obj.offset().top;

                    if( _window.scrollTop() > topPos - windowH/1.2 ){

                        if ( !curItem.hasClass('animation') ) {

                            setTimeout(function () {

                                curItem.addClass( 'animation' );

                            }, i);

                            i += 300

                        }
                    }

                })

            },
            _init = function () {
                _obj[0].slides = _self;
                _addEvents();
                _checkScroll();
            };

        //public properties

        //public methods

        _init();
    };

} )();




