( function(){

    $( function() {

        $('.news').each( function(){

            new Gallery($(this));
        } );

    } );

    var Gallery = function (obj) {

        //private properties
        var _self = this,
            _obj = obj,
            _window = $( window ),
            _slider = null,
            _perView = null,
            _prevBtn = _obj.find( '.swiper-button-prev' ),
            _nextBtn = _obj.find( '.swiper-button-next' ),
            _container = _obj.find('.swiper-container');

        //private methods
        var _constructor = function () {

                _obj[0].slider = _self;
                _onEvents();
                _setPerView();

            },
            _onEvents = function () {

                _window.on({
                    resize: function(){

                        _setPerView();
                    }
                });

            },
            _setPerView = function () {

                if ( _window.width() >=768 ) {

                    _perView = 3;

                } else {

                    _perView = 1;

                }

                _initSlider();

            },
            _initSlider = function(){

                if ( !_slider ) {

                    _slider = new Swiper(_container,{
                        slidesPerView: _perView,
                        paginationClickable: true,
                        spaceBetween: 30,
                        nextButton: _nextBtn,
                        prevButton: _prevBtn
                    });

                } else {

                    _slider.destroy();
                    _slider = null;
                }


            };

        //public properties

        //public methods

        _constructor();
    };

} )();

