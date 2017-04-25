( function(){
    'use strict';

    $( function () {

        $( '.search__aside-form' ).each( function () {
            new FilterForm( $( this ) );
        } );

    } );

    var FilterForm = function( obj ){

        //private properties
        var _self = this,
            _obj = obj,
            _filterMap = _obj.find( '.search__aside-map' ),
            _filterCategory = _obj.find('.search__aside-category'),
            _filterCategoryWrap = _filterCategory.find('.search__aside-inner'),
            _categoryRadioBtn = _filterCategory.find('input:radio'),
            _categoryRadioLabel = _categoryRadioBtn.next('label'),
            _mapPath = _filterMap.find( 'path' ),
            _budgetSlider = _obj.find( '.budget-slider' ),
            _mapHiddenInput = _obj.find( '.search__map-field' ),
            _mapSelect = _obj.find( 'select' ),
            _zipCodesArr = [],
            _window = $( window ),
            _body = $('body');

        //private methods
        var _addTooltip = function () {

                _body.append('<div class="map-tooltip"></div>')

            },
            _checkCategory = function () {

                var activeLabel = _categoryRadioLabel.filter('.active');

                if ( activeLabel.length ) {

                    _checkSubCategory( true , activeLabel.data('parent_category_id'));

                }else{

                    _checkSubCategory( false , '');

                }
            },
            _checkSubCategory = function ( check , parent_category_id) {

                console.log(check, _filterCategoryWrap.length, parent_category_id);

                if ( check ) {
                    
                    _filterCategoryWrap.slideUp( 300 );
                    _filterCategoryWrap.filter('#'+parent_category_id+'').slideDown( 300 );

                }else if ( !check ) {

                    _filterCategoryWrap.slideUp( 300 );

                }

            },
            _init = function(){
                _obj[ 0 ].obj = _self;
                _addTooltip();
                _checkCategory();
                _checkSubCategory();
                _initBudgetSlider();
                _onEvents();
            },
            _initBudgetSlider = function() {

                new BudgetSlider ( _budgetSlider );

            },
            _onEvents = function(){

                _mapPath.on({
                    click: function(){

                        _setActivePath( $( this ) );
                        _setZipCodes();

                    },
                    mouseenter: function(){

                        _tooltipActivate( $( this ), true );

                    },
                    mouseleave: function(){

                        _tooltipActivate( $( this ), false );

                    }
                });

                _mapSelect.on({
                    change: function(){

                        _setZipCodes();

                    }
                });

                _obj.on({
                    submit: function(){

                        _setZipCodes();
                        _sendForm();
                        return false;
                    }
                });

                _categoryRadioBtn.on({
                    change: function(){


                        // return false;

                    }
                });

                _categoryRadioLabel.on({

                    mouseup: function(){

                        console.log('mouseup');

                        _unCheckedCategory( $(this) );

                    }
                });

            },
            _sendForm = function(){

                var form_data = _obj.serialize();

                $.ajax({
                    type: _obj.attr( 'method' ),
                    url: _obj.attr( 'action' ),
                    data: form_data,
                    success: function () {

                    }
                })
            },
            _setZipCodes = function () {

                var activeItems = _mapPath.filter( '.active' );

                _zipCodesArr = [];
                _mapHiddenInput.val('');

                activeItems.each( function () {

                    var curItem = $( this ),
                        curCode = curItem.data( 'zip' );


                    console.log(curCode);


                    if ( curCode !== undefined ) {

                        _zipCodesArr.push( curCode ) ;

                    }

                });

                _mapHiddenInput.val( _zipCodesArr );

            },
            _setActivePath = function ( elem ) {

                var curItem = elem,
                    selectParent = _mapSelect.parent();

                if ( !curItem.hasClass( 'active' ) ) {

                    curItem.addClass( 'active' )

                }else{

                    curItem.removeClass( 'active' )
                }

                if (curItem.hasClass( 'laeken' ) && !selectParent.hasClass( 'active' )) {

                    selectParent.addClass( 'active' )

                }else if( curItem.hasClass( 'laeken' ) && selectParent.hasClass( 'active' ) ){

                    selectParent.removeClass( 'active' )

                }
            },
            _tooltipActivate = function ( elem, flag ) {

                var mapTooltip = $( '.map-tooltip' );

                if ( flag ) {

                    var curElem = elem,
                        curElemWidth = curElem[0].getBoundingClientRect().width,
                        topPosition = curElem.offset().top,
                        leftPosition = curElem.offset().left,
                        dataTitle = curElem.data( 'title' );

                    setTimeout(function () {

                        mapTooltip.html( dataTitle );

                        if ( (leftPosition + ( curElemWidth/2 ))-mapTooltip.innerWidth()/2 < 10 ) {

                            mapTooltip.css({

                                'left': leftPosition,
                                'top': topPosition - ( mapTooltip.innerHeight()+25 ),
                                'margin-left': 0

                            });

                            mapTooltip.addClass( 'active_left' );

                        }else{

                            mapTooltip.css({

                                'left': leftPosition + ( curElemWidth/2 ),
                                'top': topPosition - (mapTooltip.innerHeight() + 10),
                                'margin-left': - ( mapTooltip.innerWidth()/2 )

                            });

                            mapTooltip.removeClass( 'active_left' );

                        }

                        mapTooltip.addClass( 'active' );


                    },200);

                }else{

                    setTimeout(function () {

                        mapTooltip.removeClass( 'active' );
                        mapTooltip.css({

                            'left': 'auto',
                            'top': 'auto',
                            'margin-left': 0

                        });

                    },200)
                }

            },
            _unCheckedCategory = function ( elem ) {

                var curItem = elem,
                    curRadio = curItem.prev();

                if ( curItem.hasClass( 'active' ) ) {

                    setTimeout(function () {
                        curRadio[0].checked = false;
                    }, 10);

                    curItem.removeClass('active');
                    _checkCategory();
                    curRadio.trigger('check-change');

                } else if( !curItem.hasClass( 'active' ) ) {

                    curRadio[0].checked = true;
                    _categoryRadioLabel.removeClass( 'active' );

                    curItem.addClass( 'active' );
                    _checkCategory();
                    curRadio.trigger( 'check-change' );
                }
            };


        //public properties

        //public methods

        _init();
    };

} )();
