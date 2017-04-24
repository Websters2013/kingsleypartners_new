var BudgetSlider = function ( obj ) {

    //private properties
    var _self = this,
        _obj = obj,
        _slider = _obj.find( '#budget-slider__slider' ),
        _min = _slider.data( 'min' ),
        _max = _slider.data( 'max' ),
        _defMax = _slider.data( 'default-max' ),
        _defMin = _slider.data( 'default-min' ),
        _form = $( '.filter-form' );

    //private methods
    var _onEvents = function() {

        },
        _initSlider = function() {

            _slider.slider( {
                range: true,
                min: _min,
                max: _max,
                values: [ _defMin, _defMax ],

                slide: function( event, ui) {

                    var valWrap_1 = $( '.budget-slider__values > span' ).eq(0),
                        valWrap_2 = $( '.budget-slider__values > span' ).eq(1);

                    valWrap_1.text( Math.round( parseFloat(ui.values[ 0 ]) /1000 )+ 'k');
                    valWrap_2.text( Math.round( parseFloat(ui.values[ 1 ])/1000) + 'k');

                    _slider.data('min' , parseFloat(ui.values[ 0 ]));
                    _slider.data('max' , parseFloat(ui.values[ 1 ]));
                    _slider.trigger('slide-complete');

                },
                stop: function( event, ui ) {
                    _form.trigger( 'submit' );
                }
            } );

            var valWrap_1 = $( '.budget-slider__values > span' ).eq(0),
                valWrap_2 = $( '.budget-slider__values > span' ).eq(1);

            valWrap_1.text( Math.round( parseFloat(_slider.slider( 'values', 0 ))/1000) + 'k');
            valWrap_2.text( Math.round( _slider.slider( 'values', 1 )/1000) + 'k');
        },

        _init = function() {
            _obj[ 0 ].obj = _self;
            _initSlider();
            _onEvents();
        };

    //public properties

    //public methods

    _init();
};

