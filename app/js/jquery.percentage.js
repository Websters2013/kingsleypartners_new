window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame ||
        function(callback){
            window.setTimeout(callback, 1000 / 60);
        };
})();

( function(){
    "use strict";

    $( function () {

        $.each( $( '.project__panel-graph' ), function() {

            new Counter ( $( this ) );

        } );

    } );

    var Counter = function (obj) {

        //private properties
        var _self = this,
            _obj = obj,
            _duration = 2000,
            _canAnimate = false,
            _canDraw = false,
            _firstStep = true,
            _number = (_obj.text()),
            _startTime = 0,
            _from = 0,
            _window = $( window ),
            _body = $( 'body' );

        //private methods
        var _addEvents = function () {

                _window.on({
                    scroll: function () {
                        _checkScroll();
                    }
                });

            },
            _checkScroll = function(){

                var curScroll = _window.scrollTop(),
                    windowH = _window.height(),
                    topPos = _obj.eq(0).offset().top,
                    topInWindow = topPos - curScroll,
                    visiblePercent = 1-( topInWindow / windowH );

                if( visiblePercent > .3 ){

                    if( !_canAnimate ){
                        _canAnimate = true;
                        _canDraw = true;
                    }

                }
            },
            _init = function () {

                _obj[0].counter = _self;
                _obj.width( _obj.width() );
                _loop( 0 );
                _addEvents();
                _obj.text(_from);

            },
            _loop = function (time){

                if( _canAnimate && _canDraw ){
                    if( _firstStep ){
                        _firstStep = false;
                        _startTime = time;
                    }
                    _render( time );
                } else{
                    //_obj.text(_separateNumber(_number));
                }

                requestAnimFrame( _loop );
            },
            _render = function(time){
                var now = time - _startTime,
                    progress = now/_duration;

                if(progress>1){
                    progress = 1;
                    _firstStep = true;
                    _canDraw = false;
                }

                _obj.text(_numberWithCommas(parseInt(((+_number.toString().replace(".", "")-_from)*progress)+_from)+''));

            },
            _numberWithCommas = function ( x ) {

                var parts = x.toString().split('.');
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
                return parts.join('.');

            },
            _separateNumber = function(str){
                return str.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
            };

        //public properties

        //public methods


        _init();
    };

} )();
