(function () {
    var ClassicSlider = function () {
        var $elementClassic = $("#classic");
        var $slider = $("#slider");
        var $prev = $('#prev');
        var $next = $('#next'); 
        var $image = $(".sliderImg");
        var sliderWidth = 0;
        var interval = null;
        var intervalMobile = null;
        var imageTransitionTime = 5000;
        var nextLeftOffset = 0;
        var sliderNext = 0;
        var sliderPrev = 0;
        var currentLeftValue = 0;
        var imageWidth = 1920;
        var $sliderContainer = $(slider);
        var sliderChildren = $sliderContainer.children();
        var sliderChildrenLength = $sliderContainer.children().length;
        sliderWidth = imageWidth * sliderChildrenLength;
        $slider.width(sliderWidth);

        var initSlider = function (slider) {
            sliderNavigation(sliderChildren);
            bulletsNavigation(sliderChildren);
        }

        function autoSlide() {
            currentLeftValue = $("#slider").offset().left;
            if (currentLeftValue <= (-sliderWidth + imageWidth)) {
                $slider.css("left", 0);
            } else {
                nextLeftOffset = currentLeftValue - imageWidth;
                $slider.animate({ "left": + nextLeftOffset + "px" }, 1000);
            }
        };

        function sliderNavigation(navigationImages) {
            var sliderNavigation = $('<div></div>');
            sliderNavigation.attr('id', 'slider-navigation');
            $elementClassic.append(sliderNavigation);
            var sliderNavigationContainer = $('<div></div>');
            sliderNavigationContainer.attr('id', 'slider-navigation-container');
            $(sliderNavigation).append(sliderNavigationContainer);
            navigationImages.each(function (index) {
                var temp = $(this).clone();
                temp.addClass('sliderNavigationImage');
                temp.removeClass('sliderImg');
                temp.attr("data-index", index);
                $(sliderNavigationContainer).append(temp);
            });
        }

        function bulletsNavigation(navigationImages) {
            var sliderBulletsNavigation = $('<div></div>');
            sliderBulletsNavigation.attr('id', 'bullets-navigation');
            $elementClassic.append(sliderBulletsNavigation);
            var sliderBulletsContainer = $('<div></div>');
            sliderBulletsContainer.attr('id', 'slider-bullets');
            $(sliderBulletsNavigation).append(sliderBulletsContainer);
            navigationImages.each(function (index) {
                var tempBullet = $('<div></div>');
                tempBullet.addClass('round-bullet-navigation');
                tempBullet.attr("data-bullet-index", index);
                $(sliderBulletsContainer).append(tempBullet);
            });
        }

        function disableArrows() {
            $prev.addClass("active");
            $next.addClass("active");
        }

        function enableArrows() {
            $prev.removeClass("active");
            $next.removeClass("active");
        }

        function moveOffsetLeft () {
            currentLeftValue = $("#slider").offset().left;
            disableArrows();
            clearInterval(interval);
            if (currentLeftValue >= 0) {
                sliderPrev = -sliderWidth + imageWidth;
                $slider.css("left", sliderPrev + "px");
                enableArrows();
            } else {
                sliderPrev = currentLeftValue + imageWidth;
                enableArrows();
                $slider.animate({ "left": + sliderPrev + "px" }, 1000, enableArrows);
                setInterval(interval, imageTransitionTime);
            }
            interval = setInterval(autoSlide, imageTransitionTime);
        }

        function moveOffsetRight () {
            currentLeftValue = $("#slider").offset().left;
            disableArrows();
            clearInterval(interval);
            if (currentLeftValue == (-sliderWidth + imageWidth)) {
                $slider.css("left", "0px");
                enableArrows();
            } else {
                sliderNext = currentLeftValue - imageWidth;
                enableArrows();
                $slider.animate({ "left": + sliderNext + "px" }, 1000, enableArrows);
                setInterval(interval, imageTransitionTime);
            }
            interval = setInterval(autoSlide, imageTransitionTime);
        }

        function navigationClick(e) {
            if (e.target.className === 'sliderNavigationImage') {
                disableArrows();
                clearInterval(interval);
                var moveSliderTo = $(e.target).data('index');
                $slider.css("left", -(imageWidth * moveSliderTo) + "px");
                enableArrows();
                interval = setInterval(autoSlide, imageTransitionTime);
            }
        }

        $prev.click(function(){moveOffsetLeft()});
        $next.click(function(){moveOffsetRight()});
        $elementClassic.click(function (e) {navigationClick(e)});
        interval = setInterval(autoSlide, imageTransitionTime);

        function resetImageSize() {
            $image.each(function () {
                $(this).width($(document).width());
            });
        }

        if ($(document).width() < 750) {
            resetImageSize();
            clearInterval(interval);
            disableArrows();
            var sliding = startClientX = startPixelOffset = pixelOffset = currentSlide = 0;
            slideCount = $('.sliderImg').length;

            $elementClassic.on('mousedown touchstart', mobileSlideStart);
            $elementClassic.on('mouseup touchend', mobileSlideEnd);
            $elementClassic.on('mousemove touchmove', mobileSlide);
            $elementClassic.click(function (e) {navigateMobileImages(e)});
            intervalMobile = setInterval(autoSlideMobile, imageTransitionTime);

            function autoSlideMobile() {
                currentLeftValue = $("#slider").offset().left;
                if (currentLeftValue <= (-sliderWidth + imageWidth)) {
                    currentSlide = 0;
                    $slider.animate({ "left": + 0 + "px" }, 200);
                    checkBulletsPosition(currentSlide);
                } else {
                    currentSlide += 1; 
                    nextLeftOffset = currentLeftValue - imageWidth;
                    $slider.animate({ "left": + nextLeftOffset + "px" }, 200);
                    checkBulletsPosition(currentSlide);
                }
            };

            function navigateMobileImages(e) {
                if (e.target.className === 'round-bullet-navigation') {
                    clearInterval(intervalMobile);
                    var moveSliderTo = $(e.target).data('bullet-index');
                    $(e.target).siblings().removeClass('active-bullet');
                    $(e.target).addClass('active-bullet');
                    $slider.animate({ "left": + -(imageWidth * moveSliderTo) + "px" }, 200);
                    interval = setInterval(autoSlideMobile, imageTransitionTime);
                }
                currentSlide = $('.active-bullet').data('bullet-index');
            }

            function mobileSlideStart(event) {
                clearInterval(intervalMobile);
                if (event.originalEvent.touches)
                    event = event.originalEvent.touches[0];
                if (sliding == 0) {
                    sliding = 1;
                    startClientX = event.clientX;
                }
            }

            function mobileSlide(event) {
                clearInterval(interval);
                event.preventDefault();
                if (event.originalEvent.touches)
                    event = event.originalEvent.touches[0];
                var deltaSlide = event.clientX - startClientX;
                if (sliding == 1 && deltaSlide != 0) {
                    sliding = 2;
                    startPixelOffset = pixelOffset;
                }

                if (sliding == 2) {
                    var touchPixelRatio = 1;
                    if ((currentSlide == 0 && event.clientX > startClientX) ||
                        (currentSlide == slideCount - 1 && event.clientX < startClientX))
                        touchPixelRatio = 3;
                    pixelOffset = startPixelOffset + deltaSlide / touchPixelRatio;
                }
            }

            function checkBulletsPosition(position) {
                var bulletTruePosition = $("[data-bullet-index='" + position + "']");
                if(position != $('.active-bullet').data('bullet-index')) {
                    bulletTruePosition.siblings().removeClass('active-bullet');
                    bulletTruePosition.addClass('active-bullet');
                }
            }

            function mobileSlideEnd() {
                clearInterval(interval);
                if (sliding == 2) {
                    sliding = 0;
                    currentSlide = pixelOffset < startPixelOffset ? currentSlide + 1 : currentSlide - 1;
                    currentSlide = Math.min(Math.max(currentSlide, 0), slideCount - 1);
                    pixelOffset = currentSlide * -$elementClassic.width();
                    $slider.animate({ "left": + pixelOffset + "px" }, 200);
                    checkBulletsPosition(currentSlide);
                }
                intervalMobile = setInterval(autoSlideMobile, imageTransitionTime);
            }
        }
        var SliderApi = {
            initSlider: initSlider
        }
        return SliderApi;
    }();
    window.ClassicSlider = ClassicSlider;
}());