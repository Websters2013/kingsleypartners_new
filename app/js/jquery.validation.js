( function(){

    $( function() {

        $( '.contact__form' ).each( function(){
            new FilterForm( $( this ) );
            new FormValidator( $( this ) );
        } );

    } );

    var FilterForm = function (obj) {

        //private properties
        var _obj = obj,
            _category = _obj.find( '[data-category]' ),
            _candidateInputs = _obj.find( '[data-candidate]' );

        //private methods
        var _constructor = function () {
                _onEvents();
                _checkCategory();
            },
            _onEvents = function () {

                _category.on( 
                    'change', function () {
                        _checkCategory();
                    }
                )
            
            },
            _checkCategory = function () {

                var category = _obj.find( '[data-category]:checked' );

                if ( category.data( 'category' ) == 'client' ){
                    _candidateInputs.removeClass( 'hide' );

                    _candidateInputs.each( function () {

                        var curItem = $( this );

                        if ( curItem.hasClass( 'need-valid' ) ) {

                            curItem.removeClass( 'need-valid' );
                            curItem.attr( 'data-required', true );

                        }

                    } );


                } else if ( category.data( 'category' ) == 'candidate' ) {

                    _candidateInputs.addClass( 'hide' );
                    _candidateInputs.val( '' );

                    _candidateInputs.each( function () {

                        var curItem = $( this );

                        if ( curItem.data( 'required' ) == true ) {

                            curItem.addClass( 'need-valid' );
                            curItem.removeAttr( 'data-required' );
                            curItem.removeClass( 'not-valid' );
                            curItem.removeClass( 'not-touched' );

                        }

                    } )

                }

            };

        //public properties

        //public methods

        _constructor();
    };

    var FormValidator = function (obj) {

        //private properties
        var _obj = obj,
            _valueFlag = false,
            _inputs = _obj.find( 'input, textarea' ),
            _requiredInputs = _obj.find( '[data-required]' );

        //private methods
        var _constructor = function () {
                _onEvents();
            },
            _addNotTouchedClass = function () {

                _requiredInputs.each( function() {

                    var curItem = $(this);

                    if( curItem.val() === '' ){

                        curItem.addClass( 'not-touched' );

                        _validateField( curItem );

                    }

                } );

            },
            _onEvents = function () {
                _requiredInputs.on( {
                    focus: function() {

                        $( this ).removeClass( 'not-touched' );

                    },
                    focusout: function() {

                        var curItem = $(this);
                        _validateField( curItem );

                    }
                } );
                _inputs.on( {
                    focusout: function() {

                        var letterCounter = 0;

                        _requiredInputs = _obj.find( '[data-required]' );

                        _requiredInputs.each( function () {

                            var curItem = $(this);

                            if ( curItem.val().length > 0 ){
                                letterCounter = letterCounter + 1
                            }

                        } );

                        if ( letterCounter == 0 ){
                            _requiredInputs.removeClass( 'not-valid' );
                        }

                    }
                } );
                _obj.on( {
                    submit: function() {

                        _addNotTouchedClass();

                        _requiredInputs = _obj.find( '[data-required]' )

                        if( _requiredInputs.hasClass('not-touched') || _requiredInputs.hasClass('not-valid') ) {

                            _obj.find('.not-touched:first').focus();
                            _obj.find('.not-valid:first').focus();
                            return false;

                        } else {

                            return true;

                        }
                    }
                } );
            },
            _makeNotValid = function ( field ) {
                field.addClass( 'not-valid' );
                field.removeClass( 'valid' );
            },
            _makeValid = function ( field ) {
                field.removeClass( 'not-valid' );
                field.addClass( 'valid' );
            },
            _validateEmail = function ( email ) {
                var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(email);
            },
            _validateField = function ( field ) {
                var type = field.attr( 'type'),
                    tagName = field[0].tagName;

                if( type === 'email' || type === 'text' || type === 'tel' ){

                    if( field.val() === '' ){
                        _makeNotValid( field );
                        return false;
                    }

                }

                if( type === 'email' ){
                    if( !_validateEmail( field.val() ) ){
                        _makeNotValid( field );
                        return false;
                    }
                }


                if( tagName.toLocaleLowerCase() == 'textarea' ){

                    if( field.val() === '' ){
                        _makeNotValid( field );
                        return false;
                    }

                }

                _makeValid( field );
            };

        //public properties

        //public methods

        _constructor();
    };

} )();

