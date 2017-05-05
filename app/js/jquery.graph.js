( function(){

    "use strict";

    $( function () {

        $.each( $( '.statistic__item' ), function() {
            new Animations ( $( this ) );
        } );

    } );

    var Animations = function ( obj ) {

        //private properties
        var _self = this,
            _obj = obj,
            _percentage = _obj,
            _percentageText = _percentage.find( '.statistic__percent span' ),
            _duration = 2000,
            _canAnimate = true,
            _canDraw = true,
            _firstStep = true,
            _number = parseInt( _percentage.data( 'percent' ) ),
            _textNumber = parseInt( _percentage.data( 'num' ) ),
            _startTime = 0,
            _canvas = document.createElement( 'canvas' ),
            _ctx = _canvas.getContext( '2d' ),
            _from = 0,
            _window = $( window );

        //private methods
        var _constructor = function () {
                _percentage[0].percentage = _self;
                _onEvents();
                _percentageText.text( _from );
                _checkScroll();
                _addCanvas();
            },
            _checkScroll = function(){

                var windowH = _window.height();

                _obj.each(function () {

                    var topPos = _obj.offset().top;

                    if( _window.scrollTop() > (topPos - windowH/1.3) ){

                        setTimeout( function() {
                            _loop();
                        }, 500 );

                    }
                })

            },
            _onEvents = function () {

                _window.on( {
                    load: function(){

                    },
                    resize: function() {
                        _redDraw()
                    },
                    scroll: function () {

                        _checkScroll();

                    }
                } );

            },
            _addCanvas = function() {

                _canvas.width = _canvas.height = _percentage.height() + 6;

                var color='rgba(251,183,75, 1)';

                _ctx.translate( _canvas.width / 2, _canvas.height / 2 );
                _ctx.strokeStyle = color;
                _ctx.lineWidth = 2;
                _percentage.prepend( _canvas );

                $(_canvas).width( _percentage.height() + 6 );
                $(_canvas).height( _percentage.height() + 6 );

            },
            _loop = function (){

                if( _canAnimate && _canDraw && _number !== 0 ) {

                    _render();
                    _canAnimate = false;
                }

            },
            _gradToRad = function( grad ){

                return grad * Math.PI / 180;

            },
            _redDraw = function() {

                var color='rgba(251,183,75, 1)',
                    result = parseInt( _number );

                _canvas.width = _canvas.height = _percentage.height() + 6;
                _ctx.strokeStyle = color;
                _ctx.lineWidth = 2;
                _ctx.translate( _canvas.width/2, _canvas.height/2 );
                _ctx.clearRect( - ( _canvas.width/2),-(_canvas.height/2),_canvas.width,_canvas.height);
                _ctx.beginPath();
                _ctx.arc( 0, 0, ( _canvas.height - 8 ) / 2, _gradToRad( 270 ), _gradToRad( 270 + ( ( result/100 ) * 360 ) ) );
                _ctx.stroke();

                $( _canvas ).width( _percentage.height() + 6 );
                $( _canvas ).height( _percentage.height() + 6 );

            },
            _render = function( ){

                var resultVal = null,
                    range = _number,
                    current = 0,
                    increment = _number > 0? 1 : -1,
                    stepTime = Math.abs( Math.floor( _duration / range ) ),
                    stepTime2 = Math.abs( Math.floor( _duration / _textNumber ) ),
                    timer,
                    timer2,
                    number = 0,
                    pauseAnimation = true,
                    randomInt = Math.floor( Math.random() * ( 25 - 5 + 1 ) ) + 5;

                timer = setInterval( function() {

                    if ( pauseAnimation ) {

                        current += increment;

                        _ctx.clearRect( -( _canvas.width/2 ), - ( _canvas.height/2 ), _canvas.width, _canvas.height );
                        _ctx.beginPath();
                        _ctx.arc( 0, 0, ( _canvas.height - 8 )/2, _gradToRad( 270 ), _gradToRad( 270 + ( ( current/100 ) * 360 ) ) );

                        _ctx.stroke();

                        resultVal = current + '';

                        if ( current == range ) {

                            clearInterval( timer );

                        }
                    }

                }, stepTime );

                timer2 = setInterval( function() {

                    if ( pauseAnimation ) {

                        number = number + 1;

                        _percentageText.text( number );

                        if ( number == _textNumber ) {

                            clearInterval( timer2 );

                        }
                    }

                }, stepTime2 );

                setTimeout( function () {

                    clearInterval( timer2 );
                    _percentageText.text( _textNumber );

                }, _duration )

                _canAnimate = false;
                _canDraw = false;
            };

        //public properties

        //public methods

        _constructor();
    };

} )();