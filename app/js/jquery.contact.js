( function(){

    $( function() {

        $('.contact__map-canvas').each(function () {

            new Map( $(this) );
        });
    } );

    var Map = function (obj) {

        this.obj = obj;
        this.mapWrap = this.obj;

        //private properties
        var _self = this,
            _mapInfoWrap = $( '.contact__map-info' ),
            _addressBtns = _mapInfoWrap.find( '.contact__map-switcher-item' ),
            _addressItem = _mapInfoWrap.find( '.contact__map-address' ),
            _telItem = _mapInfoWrap.find( '.contact__map-tel' ),
            _emailItem = _mapInfoWrap.find( '.contact__map-email' ),
            _markers = [],
            _map,
            _data = JSON.parse(this.mapWrap.attr('data-map')).marks,
            _zoom = JSON.parse(this.mapWrap.attr('data-map')).zoom;

        //private methods
        var _onEvents = function () {

                google.maps.event.addDomListener( window, 'load', _initMap );

                _addressBtns.on({
                    click: function () {

                        if ( $( this ).hasClass( 'active' ) ) {

                            return false

                        } else {

                            _choiceAddress( $( this ) )
                        }
                    }
                });
            },
            _initMap = function () {

                var mapOptions = {
                    zoom: _zoom,
                    scrollwheel: false,
                    center:  new google.maps.LatLng(_data[0].poi_latitude, _data[0].poi_longitude),
                    styles: [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#f0f3f6"},{"visibility":"on"}]}]
                };

                _map = new google.maps.Map( _self.mapWrap[0], mapOptions );

                _setMarkers();
            },
            _choiceAddress = function ( elem ) {

                var curBtn = elem,
                    country = curBtn.data( 'country' );

                _addressBtns.removeClass( 'active' );
                curBtn.addClass( 'active' );

                _setCenterMap( country )

            },
            _getActiveLocation = function () {

                _addressBtns.each( function () {

                    var curElem = $( this );

                    if ( curElem.hasClass( 'active' ) ) {

                        _setCenterMap( curElem.data( 'country' ) )
                    }
                } )
            },
            _setCenterMap = function ( country ) {

                for ( var i = 0; i < _markers.length; i++ ) {

                    if ( _markers[ i ][ 'country' ] === country ) {

                        _map.panTo( _markers[ i ].getPosition() );

                        _setAddressInfo( _markers[ i ] )
                    }
                }
            },
            _setAddressInfo = function ( info ) {

                var address = info[ 'address' ],
                    tel = info[ 'tel' ],
                    email = info[ 'email' ];

                _addressItem.html( address );
                _telItem.html( tel );
                _emailItem.attr( 'href', 'tel:'+tel+'' );
                _emailItem.html( email );
                _emailItem.attr( 'href', 'mailto:'+email+'' );

            },
            _setMarkers = function () {

                $.each( _data, function ( i ) {

                    var curItem = this,
                        curLatLng = new google.maps.LatLng( curItem.poi_latitude, curItem.poi_longitude);

                    _markers[ i ] = new google.maps.Marker({
                        position: curLatLng,
                        map: _map,
                        icon: {
                            url: './img/map_marker.png',
                            size: new google.maps.Size(40, 60)
                        },
                        country: curItem.country,
                        address: curItem.address,
                        email: curItem.email,
                        tel: curItem.tel
                    });
                });
            },

            _init = function () {
                _onEvents();
                _getActiveLocation();
            };
        _init();
    };

} )();

