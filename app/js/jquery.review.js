
( function() {
    "use strict";

    $( function() {

        $.each( $( '.review' ), function() {

            new Review ( $( this ) );

        } );


    });

    var Review = function ( obj ) {

        //private properties
        var _self = this,
            _obj = obj,
            _sliderTop = _obj.find( '.review__slides-top' ),
            _sliderThumbs = _obj.find( '.review__slides-thumbs' ),
            _info = _obj.find( '.review__info' ),
            _infoTitle = _info.find( 'span' ),
            _infoText = _info.find( 'p '),
            _infoArr;

        //private methods
        var _addEvents = function () {

                _sliderTop.on( 'init', function(  ){

                    _infoArr = $( '.review__slides-top .slick-current' ).data( 'info' );
                    _infoTitle.text( _infoArr[0].name );
                    _infoText.text( _infoArr[0].text );

                } );

                _sliderTop.on( 'afterChange', function( event, slick, currentSlide, nextSlide ) {

                    _infoArr = $( '.review__slides-top .slick-current' ).data( 'info' );

                    _info.addClass( 'hide' );

                    setTimeout( function() {

                        _infoTitle.text( _infoArr[0].name );
                        _infoText.text( _infoArr[0].text );
                        _info.removeClass( 'hide' );

                    }, 300 );

                } );

            },
            _initSlider = function(){

                _sliderTop.slick({
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    touchThreshold: 18,
                    autoplay: true,
                    autoplaySpeed: 5000,
                    asNavFor: '.review__slides-thumbs'
                });
                _sliderThumbs.slick({
                    slidesToShow: 5,
                    slidesToScroll: 1,
                    asNavFor: '.review__slides-top',
                    centerMode: true,
                    arrows: false,
                    touchThreshold: 18,
                    focusOnSelect: true,
                    centerPadding: 0,
                    responsive: [
                        {
                            breakpoint: 1024,
                            settings: {
                                slidesToShow: 3
                            }
                        },
                        {
                            breakpoint: 768,
                            settings: {
                                slidesToShow: 1
                            }
                        }
                    ]
                });

            },

            _init = function () {
                _obj[0].slides = _self;
                _addEvents();
                _initSlider()
            };

        //public properties

        //public methods

        _init();
    };

} )();




