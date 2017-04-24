( function(){

    $( function() {

        $( '.references ').each( function(){

            new Gallery( $( this ) );
        } );
    } );

    var Gallery = function ( obj ) {

        //private properties
        var _self = this,
            _obj = obj,
            _slider = null,
            _prevBtn = _obj.find( '.swiper-button-prev' ),
            _nextBtn = _obj.find( '.swiper-button-next' ),
            _container = _obj.find( '.swiper-container' );

        //private methods
        var _init = function () {
                _obj[0].slider = _self;
                _initSlider();
            },
            _initSlider = function(){

                _slider = new Swiper( _container, {
                    slidesPerView: 'auto',
                    centeredSlides: true,
                    loop: true,
                    spaceBetween: 116,
                    nextButton: _nextBtn,
                    prevButton: _prevBtn
                });
            };

        //public properties

        //public methods

        _init();
    };

} )();

