(function($) {
    "use strict";

    /**
     *  Variables
     */
    var clickEventType = ((document.ontouchstart !== null) ? 'click' : 'touchstart');


    /**
     * Detect Device Type
     */
    var isMobile;
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        isMobile = true;
        $('html').addClass('mobile');
    } else {
        isMobile = false;
        $('html').addClass('desktop');
    }


    /**
     * Functions
     */
    function windowScrollAnimations() {
        var $animate = $('.animate-up, .animate-down, .animate-left, .animate-right');

        if (!isMobile) {
            $animate.appear();

            $animate.on('appear', function(event, affected) {
                for (var i = 0; i < affected.length; i++) {
                    $(affected[i]).addClass('animated');
                }
            });

            $.force_appear();
        }
    }

    function fillProgressBars() {
        var $progress_bar = $('.progress-bar');

        if (!isMobile) {
            $progress_bar.appear();
            $progress_bar.on('appear', function(event, $affected) {
                setProgressBarsWidth($affected)
            });

            $.force_appear();
        } else {
            setProgressBarsWidth($progress_bar)
        }
    }

    function setProgressBarsWidth(bars) {
        for (var i = 0; i < bars.length; i++) {
            var $bar_fill = $(bars[i]).find('.bar-fill');

            $bar_fill.width($bar_fill.data('width'));
        }
    }

    function positioningInterestsTooltips() {
        var interests = $(".interests-list");
        var tooltips = $(".interests-list li span");

        if (interests.length > 0) {
            for (var i = 0; i < tooltips.length; i++) {
                var width = $(tooltips[i]).outerWidth();
                var parent_width = $(tooltips[i]).parent().outerWidth();
                var left = (parent_width - width) / 2;

                $(tooltips[i]).css('left', left + 'px');
            }
        }
    }

    function positioningTimelineElements() {
        if ($(window).width() > 600) { // For large devices
            $('.timeline').each(function() {
                var $gutter = 25;
                var $col1_top = 0;
                var $col2_top = 70;
                var $col1_last_el_height = 0;
                var $col2_last_el_height = 0;
                var $tline_height = 0;
                var $tline_bar_height = 0;
                var $tline_bar = $(this).find('.timeline-bar');
                var $tline_inner = $(this).find('.timeline-inner');
                var $tline_col1_elems = $(this).find('.timeline-box-left');
                var $tline_col2_elems = $(this).find('.timeline-box-right');

                // Positioning first column elements
                /*
                 for (var i = 0; i < this.busyDays.length; i++) {
                 if (this.busyDays[i].getFullYear() == year && this.busyDays[i].getMonth() == month) {
                 monthBusyDays[i] = this.busyDays[i].getDate();
                 }
                 }
                 */
                for (var i = 0; i < $tline_col1_elems.length; i++) {
                    $($tline_col1_elems[i]).css({ 'position': 'absolute', 'left': '0', 'top': $col1_top + 'px' });
                    $col1_top = $col1_top + $($tline_col1_elems[i]).height() + $gutter;
                    $col1_last_el_height = $($tline_col1_elems[i]).height();
                }

                // Positioning second column elements               
                for (var i = 0; i < $tline_col2_elems.length; i++) {
                    $($tline_col2_elems[i]).css({ 'position': 'absolute', 'right': '0', 'top': $col2_top + 'px' });
                    $col2_top = $col2_top + $($tline_col2_elems[i]).height() + $gutter;
                    $col2_last_el_height = $($tline_col2_elems[i]).height();
                }

                // Set container & bar height's
                if ($col1_top > $col2_top) {
                    $tline_height = $col1_top - $gutter;
                    $tline_bar_height = $tline_height - $col1_last_el_height;
                } else {
                    $tline_height = $col2_top - $gutter;
                    $tline_bar_height = $tline_height - $col2_last_el_height;
                }
                $tline_inner.height($tline_height);
                $tline_bar.css({ 'top': '80px', 'height': $tline_bar_height + 'px' });
            });
        } else { // For small devices
            $('.timeline-bar').attr('style', '');
            $('.timeline-box').attr('style', '');
            $('.timeline-inner').attr('style', '');
        }
    }


    function filterBarLinePositioning(grid, button) {
        var filterValue = button.attr('data-filter');
        var buttonLeft = button.position().left;
        var buttonWidth = button.outerWidth();
        var filterLine = button.closest('.filter').find('.filter-bar-line');

        grid.isotope({ filter: filterValue });
        filterLine.css({ "left": buttonLeft + "px", "width": buttonWidth });
    }

    function navigationSmoothScrollOnLoad() {
        if ($('body').hasClass('home')) {
            var hash = location.hash.replace('#', '');

            if (hash != '') {
                // Clear the hash in the URL
                //location.hash = '';
                $('html, body').animate({ scrollTop: $('#' + hash).offset().top }, 500);
            }
        }
    }

    function stickyNavigationAppear() {
        var header = $('.header');
        var stickyNav = $('.head-bar');
        var stickyNavHeight = 0;

        if (stickyNav.length > 0) {
            stickyNav.addClass('animated');

            if ($(window).width() > 767 && !isMobile) {
                if (stickyNavHeight < stickyNav.outerHeight()) {
                    stickyNavHeight = stickyNav.outerHeight();
                    header.css('min-height', stickyNavHeight + 'px');
                }

                if ($(window).scrollTop() > stickyNav.outerHeight()) {
                    stickyNav.addClass('head-sticky');
                } else {
                    stickyNav.removeClass('head-sticky');
                }
            } else {
                stickyNav.removeClass('head-sticky');
                header.css('min-height', '0px');
            }

        }
    }

    function hideSitePreloader() {
        $('#preloader').remove();
        $('body').removeClass('loading');
    }

    function initialiseGoogleMap() {
        var latlng;
        var lat = 39.272706;
        var lng = -76.6069546;
        var map = $('#map');
        var mapCanvas = map.get(0);
        var map_styles = [
            { "featureType": "landscape", "stylers": [{ "saturation": -100 }, { "lightness": 65 }, { "visibility": "on" }] },
            { "featureType": "poi", "stylers": [{ "saturation": -100 }, { "lightness": 51 }, { "visibility": "simplified" }] },
            { "featureType": "road.highway", "stylers": [{ "saturation": -100 }, { "visibility": "simplified" }] }, {
                "featureType": "road.arterial",
                "stylers": [{ "saturation": -100 }, { "lightness": 30 }, { "visibility": "on" }]
            },
            { "featureType": "road.local", "stylers": [{ "saturation": -100 }, { "lightness": 40 }, { "visibility": "on" }] },
            { "featureType": "transit", "stylers": [{ "saturation": -100 }, { "visibility": "simplified" }] },
            { "featureType": "administrative.province", "stylers": [{ "visibility": "off" }] }, {
                "featureType": "water",
                "elementType": "labels",
                "stylers": [{ "visibility": "on" }, { "lightness": -25 }, { "saturation": -100 }]
            }, {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [{ "hue": "#ffff00" }, { "lightness": -25 }, { "saturation": -97 }]
            }
        ];

        if ($('html').hasClass('theme-skin-dark')) {
            map_styles = [
                { "stylers": [{ "hue": "#ff1a00" }, { "invert_lightness": true }, { "saturation": -100 }, { "lightness": 33 }, { "gamma": 0.5 }] },
                { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#2D333C" }] }
            ];
        }


        if (map.data("latitude")) lat = map.data("latitude");
        if (map.data("longitude")) lng = map.data("longitude");

        latlng = new google.maps.LatLng(lat, lng);

        // Map Options
        var mapOptions = {
            zoom: 13,
            center: latlng,
            scrollwheel: true,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            styles: map_styles
        };

        // Create the Map
        map = new google.maps.Map(mapCanvas, mapOptions);

        var marker = new Marker({
            map: map,
            position: latlng,
            icon: {
                path: SQUARE_PIN,
                fillColor: '',
                fillOpacity: 0,
                strokeColor: '',
                strokeWeight: 0
            },
            map_icon_label: '<span class="map-icon map-icon-postal-code"></span>'
        });

        // Keep Marker in Center
        google.maps.event.addDomListener(window, 'resize', function() {
            map.setCenter(latlng);
        });
    };

    function lockScroll() {
        var $html = $('html');
        var $body = $('body');

        var initWidth = $body.outerWidth();
        var initHeight = $body.outerHeight();

        var scrollPosition = [
            self.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
            self.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        ];
        $html.data('scroll-position', scrollPosition);
        $html.data('previous-overflow', $html.css('overflow'));
        $html.css('overflow', 'hidden');
        window.scrollTo(scrollPosition[0], scrollPosition[1]);

        var marginR = $body.outerWidth() - initWidth;
        var marginB = $body.outerHeight() - initHeight;
        $body.css({ 'margin-right': marginR, 'margin-bottom': marginB });
        $html.addClass('lock-scroll');
    }

    function unlockScroll() {
        var $html = $('html');
        var $body = $('body');

        $html.css('overflow', $html.data('previous-overflow'));
        var scrollPosition = $html.data('scroll-position');
        window.scrollTo(scrollPosition[0], scrollPosition[1]);

        $body.css({ 'margin-right': 0, 'margin-bottom': 0 });
        $html.removeClass('lock-scroll');
    }

    function openMobileNav() {
        $('body').addClass('mobile-nav-opened');
        lockScroll();
    }

    function closeMobileNav() {
        $('body').removeClass('mobile-nav-opened');
        unlockScroll();
    }

    function openSidebar() {
        $('body').addClass('sidebar-opened');
        lockScroll();
    }

    function closeSidebar() {
        $('body').removeClass('sidebar-opened');
        unlockScroll();
    }

    function arrayContains(array, value) {
        for (var i = 0; i < array.length; i++) {
            if (array[i] === value) {
                return true;
            }
        }
        return false;
    }

    function isValidEmail(emailAddress) {
        var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        return pattern.test(emailAddress);
    };

    function setSectionContactHeight() {
        var section = $('.section-contact .row');
        var section_box = section.find('.section-box');

        if ($(window).width() > 767) {
            section_box.css('min-height', section.height() + 'px');
        } else {
            section_box.css('min-height', '0px');
        }
    }

    function ripple(element, pageX, pageY) {
        var $rippleElement = $('<span class="ripple-effect" />');
        var xPos = parseInt(pageX, 10) - parseInt(element.offset().left, 10);
        var yPos = parseInt(pageY, 10) - parseInt(element.offset().top, 10);
        var size = Math.floor(Math.min(element.height(), element.width()) * 0.5);
        var animateSize = Math.floor(Math.max(element.width(), element.height()) * Math.PI);

        $rippleElement
            .css({
                top: yPos,
                left: xPos,
                width: size,
                height: size
            })
            .appendTo(element)
            .animate({
                width: animateSize,
                height: animateSize,
                opacity: 0
            }, 500, function() {
                $(this).remove();
            });
    }

    function setPriceBoxHeight() {
        var priceRow = $('.price-list');

        if ($(window).width() > 767) {
            priceRow.each(function() {
                var priceRowHeight = 0;
                var priceBox = $(this).find('.price-box');

                priceBox.css('height', 'auto');
                priceRowHeight = $(this).height();
                priceBox.height(priceRowHeight);
            });
        } else {
            $('.price-box').css('height', 'auto');
        }
    }

    /**
     * Window Load
     */
    $(window).load(function() {

        /** Window Scroll Animations */
        windowScrollAnimations();


        /** Progress Bars:
         *  fill progress bars on window scroll */
        fillProgressBars();


        /** Tooltips:
         *  positioning interests section tooltips */
        positioningInterestsTooltips();


        /** Timeline:
         *  positioning timeline elements */
        positioningTimelineElements();


        /** Calendar:
         *  calendar object initialization */
        // availabilityCalendar();

        /** Contct Section:
         *  set equal height for section boxes */
        setSectionContactHeight();

        /** Set Price Boxe's height */
        setPriceBoxHeight();

        /** Reference Slider */
        var ref_slider = $('.ref-slider');
        var slide_speed = $('.ref-slider').data('speed');
        if (ref_slider.length > 0) {
            for (var i = 0; i < ref_slider.length; i++) {
                var $ref_slider_prev = $(ref_slider[i]).closest('.section-box').find('.slider-prev');
                var $ref_slider_next = $(ref_slider[i]).closest('.section-box').find('.slider-next');

                $(ref_slider[i]).bxSlider({
                    auto: true,
                    speed: 800,
                    pause: slide_speed,
                    pager: false,
                    controls: true,
                    adaptiveHeight: true,
                    nextSelector: $ref_slider_prev,
                    prevSelector: $ref_slider_next,
                    nextText: '<i class="rsicon rsicon-chevron_right"></i>',
                    prevText: '<i class="rsicon rsicon-chevron_left"></i>'
                });
            }
        }


        /** Post Slider */
        var post_slider = $('.post-slider');
        if (post_slider.length > 0) {
            for (var i = 0; i < post_slider.length; i++) {
                var $prevSelector = $(post_slider[i]).closest('.post-media').find('.slider-prev');
                var $nextSelector = $(post_slider[i]).closest('.post-media').find('.slider-next');

                $(post_slider[i]).bxSlider({
                    pager: false,
                    controls: true,
                    nextSelector: $nextSelector,
                    prevSelector: $prevSelector,
                    nextText: '<i class="rsicon rsicon-chevron_right"></i>',
                    prevText: '<i class="rsicon rsicon-chevron_left"></i>'
                });
            }
        }

        /** Clients Carousel */
        var clients_carousel = $(".clients-carousel");
        if (clients_carousel.length > 0) {
            for (var i = 0; i < clients_carousel.length; i++) {
                var carousel = $(clients_carousel[i]);
                var items_count = carousel.children().size();
                var items_single = false;

                if (items_count >= 5) items_count = 5;
                if (items_count == 1) items_single = true;

                carousel.owlCarousel({
                    items: items_count,
                    singleItem: items_single,
                    autoPlay: true,
                    stopOnHover: true,
                    responsive: true,
                    navigation: false,
                    pagination: false,
                    lazyLoad: true,
                    itemsDesktopSmall: [992, 4],
                    itemsTabletSmall: [767, 3],
                    itemsMobile: [320, 1]
                });
            }
        }


        /** Audio Player */
        var post_audio = $('.post-media audio');
        if (post_audio.length > 0) {
            post_audio.mediaelementplayer({
                loop: false,
                audioHeight: 40,
                startVolume: 0.7
            });
        }


        /** Video Player */
        var post_video = $('.post-media video');
        if (post_video.length > 0) {
            post_video.mediaelementplayer({
                loop: false,
                defaultVideoWidth: 723,
                defaultVideoHeight: 405,
                videoWidth: -1,
                videoHeight: -1,
                startVolume: 0.7,
                enableAutosize: true,
                alwaysShowControls: true
            });
        }


        /** Material Inputs */
        var material_inputs = $('.input-field input, .input-field textarea');

        for (var i = 0; i < material_inputs.length; i++) {
            if ($(material_inputs[i]).val())
                $(material_inputs[i]).parent('.input-field').addClass('used');
            else
                $(material_inputs[i]).parent('.input-field').removeClass('used');
        }

        material_inputs.on('blur', function() {
            if ($(this).val())
                $(this).parent().addClass('used');
            else
                $(this).parent().removeClass('used');
        });

        material_inputs.on('focus', function() {
            $(this).parent().addClass('used');
        });


        /** Ripple:
         *  appears where clicked on the element */
        $(document).on(clickEventType, '.ripple', function(e) {
            ripple($(this), e.pageX, e.pageY);
        });


        /** Ripple Centered:
         *  appears from element center */
        $(document).on(clickEventType, '.ripple-centered', function() {
            var $rippleElement = $('<span class="ripple-effect" />'),
                $buttonElement = $(this),
                xPos = $buttonElement.width() / 2,
                yPos = $buttonElement.height() / 2,
                size = Math.floor(Math.min($buttonElement.height(), $buttonElement.width()) * 0.5),
                animateSize = Math.floor(Math.max($buttonElement.width(), $buttonElement.height()) * 1.5);
            $rippleElement
                .css({
                    top: yPos,
                    left: xPos,
                    width: size,
                    height: size,
                    backgroundColor: $buttonElement.data("ripple-color")
                })
                .appendTo($buttonElement)
                .animate({
                    width: animateSize,
                    height: animateSize,
                    opacity: 0
                }, 450, function() {
                    $(this).remove();
                });
        });


        /** Portfolio */
        var grid_seector = $('.grid');
        if (grid_seector.length > 0) {

            // Isotope Initialization
            var $grid = grid_seector.isotope({
                itemSelector: '.grid .grid-item',
                percentPosition: true,
                masonry: {
                    columnWidth: '.grid-sizer'
                }
            });

            $grid.imagesLoaded().progress(function() {
                $grid.isotope('layout');
            });

            // Isotope Filter
            var filter = $('.filter');
            if (filter.length > 0) {
                var filter_btn = filter.find('button');
                var filter_btn_first = $('.filter-btn-group button:first-child');

                filterBarLinePositioning($grid, filter_btn_first);
                filter_btn_first.addClass('active');

                filter_btn.on('click', function() {
                    filter_btn.removeClass('active');
                    $(this).addClass('active');
                    $('.grid-box').addClass('animated');
                    filterBarLinePositioning($grid, $(this));
                });
            }

            // Isotope Append New Elements
            var $elemTotalCount = 0;
            var $elemLoadedCount = 0;
            var $elemCountPerLoad = 3;
            var $gridMore = $('.grid-more');
            var $gridMoreBtn = $gridMore.find('.btn');
            var $gridAjaxLoader = $gridMore.find('.ajax-loader');

            $gridMoreBtn.on('click', function() {
                $.ajax({
                    url: "ajax/portfolio.html",
                    dataType: "html",
                    beforeSend: function() {
                        // show ajax loader
                        $gridMoreBtn.css('display', 'none');
                        $gridAjaxLoader.css('display', 'inline-block');
                    },
                    success: function(data) {
                        $elemTotalCount = $.grep($.parseHTML(data), function(el, i) {
                            return $(el).hasClass("grid-item")
                        }).length;

                        if ($elemLoadedCount < $elemTotalCount) {
                            for (var i = 1; i <= $elemCountPerLoad; i++) {

                                var $item = $(data).filter('.grid-item:eq(' + $elemLoadedCount + ')'); // started from 0
                                grid_seector.append($item).isotope('appended', $item);

                                $elemLoadedCount++;
                            }
                        }

                        if ($elemLoadedCount >= $elemTotalCount) {
                            $gridMore.hide();
                        }

                        // hide ajax loader
                        $gridMoreBtn.css('display', 'inline-block');
                        $gridAjaxLoader.css('display', 'none');
                    }
                })
            });


            // Portfolio fancybox
            var _player;
            $('.portfolioFancybox').fancybox({
                padding: 0,
                wrapCSS: 'fancybox-portfolio',
                maxWidth: '795px',
                maxHeight: '85%',
                minWidth: '250px',
                mouseWheel: 'true',
                scrolling: "no",
                autoCenter: true,
                beforeShow: function() {
                    // Get current popup
                    var currentID = $(this.element).attr("href");
                    var currentPopup = $('.fancybox-portfolio ' + currentID);

                    // Append current popup embed
                    var currentEmbed = currentPopup.find('.inline-embed');
                    if (currentEmbed.length > 0) {
                        var currentEmbedType = currentEmbed.data('embed-type');
                        var curentEmbedUrl = currentEmbed.data('embed-url');

                        switch (currentEmbedType) {
                            case "image":
                                currentEmbed.empty();
                                currentEmbed.addClass('inline-embed-image');
                                currentEmbed.append('<img src="' + curentEmbedUrl + '" />');
                                break;
                            case "iframe":
                                currentEmbed.empty();
                                currentEmbed.addClass('inline-embed-iframe');
                                currentEmbed.append('<iframe src="' + curentEmbedUrl + '" allowfullscreen></iframe>');
                                break;
                            case "video":
                                _player = ''; // reset player
                                currentEmbed.addClass('inline-embed-video');
                                var currentVideo = $('' + currentID + '').find('video');
                                if (currentVideo.length > 0) {
                                    new MediaElementPlayer(currentID + ' video', { // initialize player
                                        loop: false,
                                        defaultVideoWidth: 723,
                                        defaultVideoHeight: 405,
                                        videoWidth: -1,
                                        videoHeight: -1,
                                        startVolume: 0.7,
                                        enableAutosize: true,
                                        alwaysShowControls: true,
                                        success: function(mediaElement, domObject) {
                                            _player = mediaElement;
                                            _player.load();
                                        }
                                    });
                                }
                                break;
                        }
                    }
                },
                afterShow: function() {
                    // Get current popup
                    var currentID = $(this.element).attr("href");
                    var currentPopup = $('.fancybox-portfolio ' + currentID);

                    // Make current popup visible with css
                    currentPopup.addClass('opened');
                },
                beforeClose: function() {
                    // reset player
                    _player = '';
                }
            });
        }


        /** Main Navigation */
        navigationSmoothScrollOnLoad();

        // Header Navigation
        $('#nav>ul').onePageNav({
            currentClass: 'active',
            changeHash: true,
            scrollSpeed: 500,
            scrollThreshold: 0.5,
            easing: 'swing'
        });

        // Add header navigation hover lines
        if ($('.nav-wrap .nav').length > 0) {
            $('.nav-wrap .nav > ul > li > a').append('<span></span>');
        }

        // Sticky Navigation        
        stickyNavigationAppear();

        $(window).scroll(function() {
            stickyNavigationAppear();
        });


        /** Mobile Navigation */
        // Mobile Navigation
        $('#mobile-nav>ul').onePageNav({
            currentClass: 'active',
            changeHash: true,
            scrollSpeed: 500,
            scrollThreshold: 0.5,
            easing: 'swing',
            begin: function() {
                closeMobileNav();
            }
        });

        // open/close mobile navigation
        $(document).on(clickEventType, '.btn-mobile', function() {
            if ($('body').hasClass('mobile-nav-opened')) {
                closeMobileNav();
            } else {
                openMobileNav();
            }
        });

        // init mobile navigation custom scroll
        if ($('.mobile-nav').length > 0) {
            $(".mobile-nav-inner").mCustomScrollbar({
                theme: "dark"
            });
        }


        /** Sidebar */

        // open/close sidebar
        $(document).on(clickEventType, '.btn-sidebar', function() {
            if ($('body').hasClass('sidebar-opened')) {
                closeSidebar();
            } else {
                openSidebar();
            }
        });

        // init sidebar custom scroll
        var sidebarFixed = $('.sidebar-fixed');
        if (sidebarFixed.length > 0) {
            var sidebarScrollArea = sidebarFixed.find('.widget-area');
            sidebarScrollArea.mCustomScrollbar({
                theme: "dark",
                updateOnContentResize: true,
                updateOnImageLoad: true
            });
        }

        /** Overlay:
         *  the same overlay is used for fixed sidebar and for mobile navigation */
        $(document).on(clickEventType, '#overlay', function() {
            if ($('body').hasClass('mobile-nav-opened')) closeMobileNav();

            if ($('body').hasClass('sidebar-opened')) closeSidebar();
        });


        /** Google Map Initialisation */
        if ($('#map').length > 0) {
            initialiseGoogleMap();
        }

        /** Blog */
        var blog_grid_selector = $('.blog-grid');
        if (blog_grid_selector.length > 0) {
            var blog_grid = blog_grid_selector.isotope({
                itemSelector: '.blog-grid .grid-item',
                percentPosition: true,
                masonry: {
                    columnWidth: '.grid-sizer'
                }
            });

            blog_grid.imagesLoaded().progress(function() {
                blog_grid.isotope('layout');
            });
        }


        /** Window Scroll Top Button */
        var $btnScrollTop = $('.btn-scroll-top');
        $(window).scroll(function() {
            if ($(this).scrollTop() > 100) {
                $btnScrollTop.fadeIn();
            } else {
                $btnScrollTop.fadeOut();
            }
        });

        $btnScrollTop.on('click', function() {
            $('html, body').animate({ scrollTop: 0 }, 800);
            return false;
        });

        /** Contact Form */
        $('.rsFormSubmit').on('click', function(e) {
            var rsForm = $(this).closest('.rsForm');
            var rsFormErrors = false;
            var rsFormAction = rsForm.attr('action');
            var rsFormCaptcha = rsForm.data('captcha');
            var rsFormFields = rsForm.find('.input-field');
            var rsFormName = rsForm.find("[name='rsName']");
            var rsFormEmail = rsForm.find("[name='rsEmail']");
            var rsFormMessage = rsForm.find("[name='rsMessage']");
            var rsFormResponce = rsForm.find('.rsFormResponce');

            // Button ripple effect
            ripple($(this).parent(), e.pageX, e.pageY);

            // Reset form errors
            rsFormFields.removeClass('error');
            rsFormErrors = false;

            // Validate form fields 
            if (!rsFormName.val()) {
                rsFormErrors = true;
                rsFormName.parent().addClass('error');
            }

            if (!rsFormEmail.val() || !isValidEmail(rsFormEmail.val())) {
                rsFormErrors = true;
                rsFormEmail.parent().addClass('error');
            }

            if (!rsFormMessage.val()) {
                rsFormErrors = true;
                rsFormMessage.parent().addClass('error');
            }

            if (rsFormErrors) {
                // if has errors - do nothing
                return false;
            } else {
                if (rsFormCaptcha === true) {
                    // if captcha - goto captcha page
                    return true;
                } else {
                    // if no captcha - make ajax request
                    $.post(rsFormAction,
                        rsForm.serialize(),
                        function(response) {
                            var data = jQuery.parseJSON(response);
                            if (data) {
                                rsForm.append('<div class="rsFormResponce"><strong>Congratulation!</strong><br>Your email was sent successfully!</div>');
                            } else {
                                rsForm.append('<div class="rsFormResponce"><strong>OOPS!</strong> Something went wrong.<br>Please try again.</div>');
                            }
                        }
                    );
                    return false;
                }
            }
        });



        /** Preloader:
         *  site was successfully loaded, hide site pre-loader */
        hideSitePreloader();
    });


    /**
     * Window Resize
     */
    var resizeTimeout;
    var winWidth = $(window).width();
    var winHeight = $(window).height();

    $(window).resize(function() {
        var onResize = function() {
            setPriceBoxHeight();
            stickyNavigationAppear();
            setSectionContactHeight();
            positioningTimelineElements();
        }

        // New height and width
        var winNewWidth = $(window).width(),
            winNewHeight = $(window).height();

        // Compare the new height and width with old one
        if (winWidth != winNewWidth || winHeight != winNewHeight) {
            window.clearTimeout(resizeTimeout);
            resizeTimeout = window.setTimeout(onResize, 10);
        }

        //Update the width and height
        winWidth = winNewWidth;
        winHeight = winNewHeight;
    });

})(jQuery);
