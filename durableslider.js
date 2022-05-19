(function($){

    // ==== BEGINS PLUGGIN ====
    $.fn.durableslider = function(data, callback){

        // ==== CACHE DOM ====
        var $durableslider = $(this);
        var $msContent = $durableslider.find('.MS-content');
        var $msRight = $durableslider.find('button.MS-right');
        var $msLeft = $durableslider.find('button.MS-left');
        var $imgFirst = $msContent.find('.item:first');

        // === DETERMINE ACTION ====
        // string = method | object or nothing is to initialize
        if(typeof data === 'string'){
            getStringArgs(data);
            return $durableslider;
        } else if (typeof data === 'object' || typeof data  ==='undefined'){
            init();
        }

        // ==== PLUGGIN VARIABLES ====
        var $imgLast,
        totalWidth,
        numberVisibleSlides,
        animateDistance,
        animateSlideRight,
        animateSlideLeft,
        defaults,
        settings,
        animateDuration,
        autoSlideInterval;

        // = INITIALIZE =
        function init(){
            minifyContent();        // minify html
            createSettings();       // merge defaults and user provided options
            saveData();             // add data object to DOM el with reference to animation functions, allows for methods to reference at any time
            selectAnimations();     // choose default animation
        }


        // ==== EVENT HANDLERS ====
        $msRight.on('click', animateSlideLeft);
        $msLeft.on('click', animateSlideRight);
        $durableslider.on('click','.MS-right, .MS-left', resetInterval);
        $(window).on('resize', findItemWidth);


        // ==== FUNCTIONS (for days...) ====
        // =================================

        function pauseAbove(){
            if (window.innerWidth > settings.pauseAbove){ $durableslider.addClass('ms-PAUSE'); }
            $(window).on('resize',function(){
                if (window.innerWidth > settings.pauseAbove){
                    $durableslider.addClass('ms-PAUSE');
                } else {
                    $durableslider.removeClass('ms-PAUSE');
                }
            });
        }

        function pauseBelow(){
            if (window.innerWidth < settings.pauseBelow){ $durableslider.addClass('ms-PAUSE'); }
            $(window).on('resize',function(){
                if (window.innerWidth < settings.pauseBelow){
                    $durableslider.addClass('ms-PAUSE');
                } else {
                    $durableslider.removeClass('ms-PAUSE');
                }
            });
        }

        // used if method is called after initialization
        function getStringArgs(str){
            if (typeof $durableslider.data(str) !== 'undefined'){
                $durableslider.data(str)();
            } else {
                console.error("durableslider currently only accepts the following methods: next, prev, pause, play");
            }
        }

        // saves data object to DOM element
        function saveData(){
            $durableslider.data({
                "pause":function(){ $durableslider.addClass('ms-PAUSE'); },
                "unPause":function(){ $durableslider.removeClass('ms-PAUSE'); },
                "continuous":function(){ $durableslider.removeClass('ms-PAUSE'); continuousLeft(); },
                "next":function(){ overRidePause(singleLeft); },
                "nextAll":function(){ overRidePause(allLeft); },
                "prev":function(){ overRidePause(singleRight); },
                "prevAll":function(){ overRidePause(allRight); },
                "settings":settings
            });
        }

        // used when calling 'next', 'prev' methods
        function overRidePause(animation){
            if ($durableslider.hasClass('ms-PAUSE')){
                $durableslider.removeClass('ms-PAUSE');
                animation();
                $durableslider.addClass('ms-PAUSE');
            } else {
                animation();
            }
            resetInterval();
        }

        // CRITICAL for items to be perfectly side-by-side without floating them
        function minifyContent(){
            $msContent.contents().filter(function(){
                return (this.nodeType == 3 && !/\S/.test(this.nodeValue));
            }).remove();
        }

        // updated options with defaults, measure slide widths for animation calculations, carry out setting implementations
        function createSettings() {
            defaults = settings || {
    			continuous: false,	// endless scrolling with no pauses
    			slideAll: false,	// slide all visible slides, or just one at a time
    			// autoSlide: true,	// DEPRECATED
    			interval: 2000,		// time bewteen slide animation, 0 or 'false' prevents auto-sliding
    			duration: 500,	    // duration of slide animation
    			hoverPause: true,	// pause slideshow on hover
                pauseAbove: null,   // pause above specified screen width
                pauseBelow: null    // pause below specified screen width
    		};

    		settings = $.extend({},defaults,data);

            findItemWidth();
            animateDuration = settings.duration;

            if (settings.hoverPause){pauseHover();}
            // autoSlide is being depricated | Feb 2 2017
            if (settings.continuous !== true && settings.interval !== 0 && settings.interval !== false && settings.autoSlide !== false){autoSlide();}
            if (settings.pauseAbove !== null && typeof settings.pauseAbove === 'number'){ pauseAbove(); }
            if (settings.pauseBelow !== null && typeof settings.pauseBelow === 'number'){ pauseBelow(); }
        }

        // determine between single and multi-slide animations
        function selectAnimations () {
            if (settings.continuous){
                settings.autoSlide = false;
                continuousLeft();
            } else if (settings.slideAll){
                animateSlideRight = $durableslider.data('prevAll');
                animateSlideLeft = $durableslider.data('nextAll');
            } else {
                animateSlideRight = $durableslider.data('prev');
                animateSlideLeft = $durableslider.data('next');
            }
        }

        // measure slide width, for animation calculations
        function findItemWidth(){
            reTargetSlides();
            animateDistance = $imgFirst.width();
            var left = parseInt($msContent.find('.item:first').css('padding-left'));
            var right = parseInt($msContent.find('.item:first').css('padding-right'));
            if (left !== 0){animateDistance += left;}
            if (right !== 0){animateDistance += right;}
        }

        // recursive auto-slide loop
        function autoSlide() {
            autoSlideInterval = setInterval(function(){
                if (!$durableslider.hasClass('ms-PAUSE')){
                    animateSlideLeft();
                }
            }, settings.interval);
        }

        function resetInterval() {
            if (settings.interval !== 0 && settings.interval !== false && settings.continuous !== true){
                clearInterval(autoSlideInterval);
                autoSlide();
            }
        }

        // target first and last visible slides before each new animation
        function reTargetSlides(){
            $imgFirst = $msContent.find('.item:first');
            $imgLast = $msContent.find('.item:last');
        }

        // prevent animation firing if durableslider is currently animating
        // all animations pass through this function, which emits events, and adds/removes animating class
        function isItAnimating(callback){
			if(!$durableslider.hasClass('ms-animating') &&
               !$durableslider.hasClass('ms-HOVER') &&
               !$durableslider.hasClass('ms-PAUSE')){
                    $durableslider.trigger('ms.before.animate'); // event!
                    $durableslider.addClass('ms-animating');
                    callback();    //callback is animation
			}
		}

        // update durableslider at the end of each animation
        function doneAnimating() {
			if($durableslider.hasClass('ms-animating')){
				$durableslider.removeClass('ms-animating');
                $durableslider.trigger('ms.after.animate'); // event!
            }
		}

        // logic for pausing and restarting the durableslider on hover
        function pauseHover() {
            // continuous scroll pause slightly different
            if(settings.continuous){
				$msContent.on('mouseover',function(){
					doneAnimating();
					$msContent.children('.item:first').stop();
				});
				$msContent.on('mouseout',function(){
					continuousLeft();
				});
			} else {
            // regular animation pausing
                $msContent.on('mouseover',function(){
                    $durableslider.addClass('ms-HOVER');
                });
                $msContent.on('mouseout',function(){
                    $durableslider.removeClass('ms-HOVER');
                });
			}
        }

        // calculate remaining animation, if stopped mid-animation and resuming
        function midAnimateResume(){
            animateDuration = settings.duration;
            var currentMargin = parseFloat($msContent.find('.item:first').css("margin-left"));
            var percentageRemaining = 1-(currentMargin/-(animateDistance-1));
            animateDuration = percentageRemaining*animateDuration;
        }

        // determine how many slides need to be moved over, if slideAll is true
        function calcNumSlidesToMove(){
            totalWidth = $msContent.width();						          // total width of .MS-content containing all visible slides
		    numberVisibleSlides = Math.floor(totalWidth/animateDistance);     // number of (visible) slides needed to be moved in each animation
        }


        // ==== ANIMATION FUNCTIONS ====
        // =============================
        function continuousLeft () {
            isItAnimating(function(){
                reTargetSlides();
                midAnimateResume();
                $imgFirst.animate(
                    {marginLeft: -(animateDistance+1)},
                    {
                        duration: animateDuration,
                        easing: "linear",
                        complete: function(){
                            $imgFirst.insertAfter($imgLast).removeAttr("style");
                            doneAnimating();
                            continuousLeft ();
                        }
                    }
                );
            });
        }

        function allLeft(){
            isItAnimating(function(){
                reTargetSlides();
                calcNumSlidesToMove();

                var $clonedItemSet = $msContent.children('.item').clone();
                var filteredClones = $clonedItemSet.splice(0, numberVisibleSlides);

                $msContent.append(filteredClones);

                $imgFirst.animate(
                    {marginLeft: -totalWidth}, {
                        duration: animateDuration,
                        easing: "swing",
                        complete: function(){
                            $($msContent.children('.item').splice(0,numberVisibleSlides)).remove();
                            doneAnimating();
                        }
                    }
                );
            });
        }

        function allRight() {
            isItAnimating(function(){
                reTargetSlides();
                calcNumSlidesToMove();

                var numberTotalSlides = $msContent.children('.item').length;
                var $clonedItemSet = $msContent.children('.item').clone();
                var filteredClones = $clonedItemSet.splice(numberTotalSlides-numberVisibleSlides,numberTotalSlides);

                $($(filteredClones)[0]).css('margin-left',-totalWidth); // give clone array negative margin before preppending
                $msContent.prepend(filteredClones);

                reTargetSlides();

                $imgFirst.animate(
                    {
                        marginLeft: 0
                    }, {
                        duration: animateDuration,
                        easing: "swing",
                        complete: function(){
                            numberTotalSlides = $msContent.find('.item').length;
                            $($msContent.find('.item').splice(numberTotalSlides-numberVisibleSlides,numberTotalSlides)).remove();
                            $imgFirst.removeAttr('style');
                            doneAnimating();
                        }
                    }
                );
            });
        }

        function singleLeft(){
            isItAnimating(function(){
                reTargetSlides();
                $imgFirst.animate(
                    {
                        marginLeft: -animateDistance
                    }, {
                        duration: animateDuration,
                        easing: "swing",
                        complete: function(){
                            $imgFirst.detach().removeAttr('style').appendTo($msContent);
                            doneAnimating();
                        }
                    }
                );
            });
        }

        function singleRight(){
            isItAnimating(function(){
                reTargetSlides();
                $imgLast.css('margin-left',-animateDistance).prependTo($msContent);
                $imgLast.animate(
                    {
                        marginLeft: 0
                    }, {
                        duration: animateDuration,
                        easing: "swing",
                        complete: function(){
                            $imgLast.removeAttr("style");
                            doneAnimating();
                        }
                    }
                );
            });
        } 
        return $durableslider;
    }
})(jQuery);