( function(){

    $( function() {

        $('.contact__map-canvas').each(function () {

            new Map( $(this) );

        });

        $('.contact__map-info').each(function () {

            // new MapInfo( $(this) );

        });

    } );

    var Map = function (obj) {

        this.obj = obj;
        this.mapWrap = this.obj;

        //private properties
        var _self = this,
            _marker = [],
            _infowindow,
            _data = JSON.parse(this.mapWrap.attr('data-map')).marks,
            _zoom = JSON.parse(this.mapWrap.attr('data-map')).zoom;

        //private methods
        var _onEvents = function () {

                google.maps.event.addDomListener(window, 'load', _initialize);

            },
            _initialize = function () {

                var mapOptions = {
                    zoom: _zoom,
                    scrollwheel: false,
                    center:  new google.maps.LatLng(_data[0].poi_latitude, _data[0].poi_longitude),
                    styles: [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#f0f3f6"},{"visibility":"on"}]}]
                };

                var map = new google.maps.Map(_self.mapWrap[0], mapOptions);

                _setMarkers(map);

            },
            _setMarkers = function (map) {

                var image = {
                    url: './img/map_marker.svg',
                    size: new google.maps.Size(64, 96),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(0, 40)
                };

                $.each(_data, function (i) {

                    var curItem = this,
                        curLatLng = new google.maps.LatLng(curItem.poi_latitude, curItem.poi_longitude);

                    _marker[ i ] = new google.maps.Marker({
                        position: curLatLng,
                        map: map,
                        icon: image
                    });

                    // _infowindow = new google.maps.InfoWindow({
                    //
                    //     content:  '<div class="contact__map-image"><img src="../assets/app/dist/pic/Capture2.jpg" alt="building"></div>'
                    //
                    // });

                    // google.maps.event.addListener( _marker[0], 'mouseover', function(){
                    //
                    //     if (!$('.contact__map-tooltip').length) {
                    //
                    //         _infowindow.open( map, _marker[0] );
                    //
                    //         $('.contact__map-image').parent().parent().parent().parent().addClass( 'contact__map-tooltip' );
                    //
                    //         setTimeout(function () {
                    //
                    //             $('.contact__map-tooltip').addClass('active');
                    //
                    //         }, 300)
                    //
                    //     }
                    //
                    // });
                    //
                    // google.maps.event.addListener(_infowindow, 'closeclick',function(){
                    //
                    //     map.setCenter(new google.maps.LatLng(curItem.poi_latitude, curItem.poi_longitude));
                    //
                    // });

                });

            },

            _init = function () {
                _onEvents();
            };
        _init();
    };

    var MapInfo = function (obj) {

        //private properties
        var _obj = obj,
            _flag = false,
            _openBtn = _obj.find('.contact__map-open'),
            _window = $( window );

        //private methods
        var _onEvents = function () {

                _openBtn.on({
                    click: function(){

                        if (_window.width() < 768) {
                            _obj.toggleClass( 'open' );
                            _openBtn.toggleClass( 'active' );
                            _flag = true
                        }

                    }
                });
                _window.on({
                    resize: function(){

                        _setCondition();

                    }
                });
            },
            _setCondition = function () {

                if ( _window.width() >= 768 ) {

                    _obj.addClass( 'open' );
                    _openBtn.addClass( 'active' );
                    _flag = false;

                }else if( _window.width() < 768 &&  !_flag ){
                    _obj.removeClass( 'open' );
                    _openBtn.removeClass( 'active' );
                }

            },
            _init = function () {
                _setCondition();
                _onEvents();
            };
        _init();
    };

} )();

