( function(){

    $( function() {

        $('.testimonials').each( function(){
            new TestimonialSlider($(this));
        } );

        $('.about-us__slider').each( function(){
            SwiperGallery = new SwiperGallery( $( this ) );
        } );

        $('.search-panel__dropdown').each( function(){
            DropDownSelect = new DropDownSelect( $( this ) );
        } );

        $('.search-panel__result').each( function(){
            DropDownResult = new DropDownResult( $( this ) );
        } );

        $('.site__hero').each( function(){
            Hero = new Hero( $( this ) );
        } );

    } );

    var SwiperGallery = function (obj) {

        //private properties
        var _self = this,
            _obj = obj,
            _btnPrev = $('.about-us__slider-arrow_prev'),
            _btnNext = $('.about-us__slider-arrow_next');

        //private methods
        var _addEvents = function () {

            },
            _initGallery = function(){
                var swiper = new Swiper( _obj.find( ' .swiper-container' ), {
                    loop: true,
                    nextButton: $('.about-us__slider-next'),
                    prevButton: $('.about-us__slider-prev'),
                    // autoplay: 5000,
                    autoplayDisableOnInteraction: true
                });
            },
            _init = function () {
                _addEvents();
                _obj[0].productGallery = _self;
                _initGallery();
            };

        //public properties

        //public methods

        _init();
    };

    var DropDownResult = function ( obj ) {

        //private properties
        var _self = this,
            _obj = obj,
            _dropBtn = $('.search__location'),
            _dropWrap = _obj.find('.search-panel__result-wrap'),
            _dropItem = _dropWrap.find('li'),
            _body = $('body');

        //private methods
        var _onEvents = function () {

                _dropBtn.on({
                    click: function(){

                        $('.search-panel__dropdown-wrap').removeClass( 'show' );
                        $('.search-panel__dropdown-val').removeClass( 'active' );

                        _obj.addClass( 'show' );

                        if ( _obj.hasClass( 'show' ) ) {

                            _addScroll();
                            _dropWrap.getNiceScroll().resize();

                        } else {

                            _dropWrap.getNiceScroll().remove();

                        }

                    }
                });

                _dropItem.on({

                    click: function(){

                        _setValue( $( this ) );

                        _obj.removeClass( 'show' );
                        _dropWrap.getNiceScroll().remove();
                    }

                });

                _dropBtn.on( {
                    click: function( event ){
                        event = event || window.event;

                        if ( event.stopPropagation ) {
                            event.stopPropagation();
                        } else {
                            event.cancelBubble = true;
                        }
                    }
                } );

                _obj.on( {
                    click: function( event ){
                        event = event || window.event;

                        if ( event.stopPropagation ) {
                            event.stopPropagation();
                        } else {
                            event.cancelBubble = true;
                        }
                    }
                } );

                _body.on( {
                    click: function() {

                        _obj.removeClass('show');
                        _dropWrap.getNiceScroll().remove();

                    }
                } );

            },
            _setValue = function ( elem ) {

                var curElem = elem,
                    curText = curElem.text();

                _dropItem.removeClass( 'active' );
                curElem.addClass( 'active' );
                _dropBtn.val( curText );

            },
            _addScroll = function () {

                _dropWrap.niceScroll({

                    cursorcolor:"#ebebeb",
                    cursoropacitymin: "1",
                    cursorborderradius: "5px",
                    cursorborder: "none",
                    cursorwidth: "5px"

                });
            },
            _init = function () {
                _onEvents();
                // _addScroll();
            };

        //public properties

        //public methods

        _init();
    };

    var DropDownSelect = function (obj) {

        //private properties
        var _self = this,
            _obj = obj,
            _hiddenInput = _obj.find('input.sector'),
            _dropBtn = _obj.find('.search-panel__dropdown-val'),
            _dropWrap = _obj.find('.search-panel__dropdown-wrap'),
            _dropList = _obj.find('.search-panel__dropdown-list'),
            // _dropListSub = _dropList.find('.search-panel__dropdown-sub'),
            _dropItem = _dropList.find('li'),
            _body = $('body');

        //private methods
        var _onEvents = function () {

                _dropBtn.on({
                    click: function(){

                        $( '.search-panel__result' ).removeClass( 'show' );

                        _dropBtn.toggleClass( 'active' );
                        _dropWrap.toggleClass( 'show' );

                        if ( _dropWrap.hasClass( 'show' ) ) {

                            _addScroll();
                            _dropList.getNiceScroll().resize();

                        } else {

                            _dropList.getNiceScroll().remove();

                        }

                    }
                });

                _dropItem.on({
                    click: function(){

                        _setValue( $(this) );

                        _dropWrap.removeClass('show');
                        _dropList.getNiceScroll().remove();

                    }
                });

                _obj.on( {
                    click: function( event ){
                        event = event || window.event;

                        if ( event.stopPropagation ) {
                            event.stopPropagation();
                        } else {
                            event.cancelBubble = true;
                        }
                    }
                } );

                _body.on( {
                    click: function() {

                        _dropBtn.removeClass( 'active' );
                        _dropWrap.removeClass('show');
                        _dropList.getNiceScroll().remove();

                    }
                } );

            },
            _setValue = function ( elem ) {

                var curElem = elem,
                    curText = curElem.text();

                _dropItem.removeClass( 'active' );
                curElem.addClass( 'active' );
                _dropBtn.html( curText );
                _hiddenInput.val( curText )

            },
            _addScroll = function () {

                _dropList.niceScroll({

                    cursorcolor:"#ebebeb",
                    cursoropacitymin: "1",
                    cursorborderradius: "5px",
                    cursorborder: "none",
                    cursorwidth: "5px"

                });
            },
            _init = function () {
                _onEvents();
                // _addScroll();
            };

        //public properties

        //public methods

        _init();
    };

    var TestimonialSlider = function (obj) {

        //private properties
        var _self = this,
            _obj = obj,
            _slider = null,
            _container = _obj.find('.swiper-container'),
            _pagination = _obj.find('.swiper-pagination');

        //private methods
        var _init = function () {
                _obj[0].slider = _self;
                _initSlider();
            },
            _initSlider = function(){

                _slider = new Swiper(_container,{
                    pagination: _pagination,
                    autoplay: 4000,
                    paginationClickable: true
                });
            };

        //public properties

        //public methods

        _init();
    };

    var Hero = function (obj) {

        //private properties
        var _self = this,
            _obj = obj,
            _window = $(window),
            _header = $('.site__header'),
            _body = $('body'),
            _globalWidth = 0,
            _galleryContainer = _obj.find( '.site__hero-slider' ),
            _swiper = null;

        //private methods
        var _onEvents = function () {

                _window.on( {
                    load: function () {

                        _globalWidth = _window.width();

                    },
                    resize: function(){

                        if( _window.width() < 1024 ) {

                            if( _globalWidth !== _window.width() ) {

                                _globalWidth = _window.width() + 1;

                                _setHeight();

                            }


                        } if( _window.width() >= 1024 ) {

                            _setHeight();

                        }

                    }
                } );

            },
            _setHeight = function () {

                var headerHeight = _header.innerHeight();

                _obj.innerHeight( _window.height() - headerHeight );

            },
            _initGallery = function () {

                _swiper = new Swiper( _galleryContainer, {
                    loop: true,
                    speed: 500,
                    autoplay: 8000,
                    autoplayDisableOnInteraction: false,
                    effect: 'fade'
                });

            },
            _init = function () {
                _onEvents();
                _setHeight();
                _initGallery();
            };

        //public properties

        //public methods

        _init();
    };

} )();

