
( function() {
    "use strict";

    $( function() {

        $.each( $( '.values_scroll' ), function() {
            new ScrollTo ( $( this ) );
        } );

    });

    var ScrollTo = function ( obj ) {

        //private properties
        var _self = this,
            _obj = obj,
            _scroller = $( 'html,body' ),
            _window = $( window );

        //private methods
        var _addEvents = function () {
                _window.on({
                    load: function () {
                        _window.scrollTo();

                    }
                });
            },
            _init = function () {
                _obj[0].slides = _self;
                _addEvents();
            };

        //public properties

        //public methods
        _window.scrollTo = function () {

            var stopScrollPosition = _obj.offset().top;

            _scroller.animate({
                scrollTop: stopScrollPosition
            },{
                duration: 500
            });
        };

        _init();
    };

} )();




