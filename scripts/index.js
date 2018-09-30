(function () {
    var ClassicSlider = function () {

        function getSliderElement() {
            if ($(document).find($('[data-slider]')) && $('[data-slider]').attr('data-slider') == 'true') {
                var sliderId = $('[data-slider]').attr('id');
                var slider = $('#' + sliderId);
            } else {
                throw new Error("Error: data-slider attribute not set on page");
            }
            return slider;
        }

        function getSliderContainerElement() {
            if ($(document).find($('[data-slider-container]')) && $('[data-slider-container]').attr('data-slider-container') == 'true') {
                var containerId = $('[data-slider-container]').attr('id');
                var sliderContainer = $('#' + containerId);
            } else {
                throw new Error("Error: data-slider-container attribute not set on page");
            }
            return sliderContainer;
        }

        function getSliderTransitionTime() {
            if ($(document).find($('[data-slider-speed]'))) {
                var imageTransitionTimeValue = $('[data-slider-speed]').attr('data-slider-speed');
                imageTransitionTime = imageTransitionTimeValue;
            } else {
                imageTransitionTime = 5000;
            }
            return imageTransitionTime;
        }

        function getSliderDurationTime() {
            if ($(document).find($('[data-slider-duration]'))) {
                var animationDurationValue = $('[data-slider-duration]').attr('data-slider-duration');
                animationDuration = animationDurationValue;
            } else {
                animationDuration = 1000;
            }
            return animationDuration;
        }

        function getSliderMobileMobileTime() {
            if ($(document).find($('[data-slider-mobile-duration]'))) {
                var animationMobileDurationValue = $('[data-slider-mobile-duration]').attr('data-slider-mobile-duration');
                animationMobileDuration = animationMobileDurationValue;
            } else {
                animationMobileDuration = 5000;
            }
            return animationMobileDuration;
        }

        function getSliderPrevArrowElement() {
            if ($(document).find($('[data-slider-prev]')) && $('[data-slider-prev]').attr('data-slider-prev') == 'prev') {
                var prevValue = $('[data-slider-prev]').attr('id');
                var prev = $('#' + prevValue);
            } else {
                throw new Error("Error: data-slider-prev attribute not set on page");
            }
            return prev;
        }

        function getSliderNextArrowElement() {
            if ($(document).find($('[data-slider-next]')) && $('[data-slider-next]').attr('data-slider-next') == 'next') {
                var nextValue = $('[data-slider-next]').attr('id');
                var next = $('#' + nextValue);
            } else {
                throw new Error("Error: data-slider-next attribute not set on page");
            }
            return next;
        }

        var $slider = getSliderElement();
        var $sliderContainer = getSliderContainerElement();
        var imageTransitionTime = getSliderTransitionTime();
        var animationDuration = getSliderDurationTime();
        var animationDurationMobile = getSliderMobileMobileTime();
        var $prev = getSliderPrevArrowElement();
        var $next = getSliderNextArrowElement();
        var $image = getSliderElement().children();
        var interval = null;
        var intervalMobile = null;
        var nextLeftOffset = 0;
        var sliderNext = 0;
        var sliderPrev = 0;
        var currentLeftValue = 0;
        var imageWidth = $sliderContainer.width();
        var imageWidthMobile = imageWidth;
        var sliderChildren = $($slider).children();
        var sliderChildrenLength = $($slider).children().length;
        var sliderWidth = imageWidth * sliderChildrenLength;
        $slider.width(sliderWidth);

        var initSlider = function () {
            sliderNavigation(sliderChildren);
            bulletsNavigation(sliderChildren);
            resetImageSize();
        }

        function autoSlide() {
            currentLeftValue = $slider.offset().left;
            if (currentLeftValue <= (-sliderWidth + imageWidth)) {
                $slider.css("left", 0);

            } else {
                nextLeftOffset = currentLeftValue - imageWidth;
                $slider.animate({ "left": + nextLeftOffset + "px" }, {
                    duration: animationDuration,
                    start: function () {
                        disableArrows();
                    },
                    complete: function () {
                        enableArrows();
                    }
                });
            }
        };

        function sliderNavigation(navigationImages) {
            var sliderNavigation = $('<div></div>');
            sliderNavigation.attr('id', 'slider-navigation');
            $sliderContainer.append(sliderNavigation);
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
            $sliderContainer.append(sliderBulletsNavigation);
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

        var disableArrows = function () {
            $prev.addClass("active");
            $next.addClass("active");
        }

        var enableArrows = function () {
            $prev.removeClass("active");
            $next.removeClass("active");
        }

        function moveOffsetLeft() {
            currentLeftValue = $slider.offset().left;
            clearInterval(interval);
            if (currentLeftValue >= 0) {
                sliderPrev = -sliderWidth + imageWidth;
                $slider.css("left", sliderPrev + "px");
            } else {
                sliderPrev = currentLeftValue + imageWidth;
                $slider.animate({ "left": + sliderPrev + "px" }, {
                    duration: animationDuration,
                    start: function () {
                        disableArrows();
                    },
                    complete: function () {
                        enableArrows()
                    }
                });
                setInterval(interval, imageTransitionTime);
            }
            interval = setInterval(autoSlide, imageTransitionTime);
        }

        function moveOffsetRight() {
            currentLeftValue = $slider.offset().left;
            clearInterval(interval);
            if (currentLeftValue == (-sliderWidth + imageWidth)) {
                $slider.css("left", "0px");
            } else {
                sliderNext = currentLeftValue - imageWidth;
                $slider.animate({ "left": + sliderNext + "px" }, {
                    duration: animationDuration,
                    start: function () {
                        disableArrows();
                    },
                    complete: function () {
                        enableArrows()
                    }
                });
                setInterval(interval, imageTransitionTime);
            }
            interval = setInterval(autoSlide, imageTransitionTime);
        }

        function navigationClick(e) {
            if (e.target.className === 'sliderNavigationImage') {
                clearInterval(interval);
                var moveSliderTo = $(e.target).data('index');
                $slider.css("left", -(imageWidth * moveSliderTo) + "px");
                interval = setInterval(autoSlide, imageTransitionTime);
            }
        }

        $prev.click(function (e) { e.stopPropagation(); moveOffsetLeft(); });
        $next.click(function (e) { e.stopPropagation(); moveOffsetRight(); });
        $sliderContainer.click(function (e) { e.stopPropagation(); navigationClick(e); });
        interval = setInterval(autoSlide, imageTransitionTime);

        function resetImageSize() {
            $image.each(function () {
                $(this).width(imageWidthMobile);
            });
        }

        if ($(document).width() < 750) {
            resetImageSize();
            clearInterval(interval);
            disableArrows();
            var sliding = startClientX = startPixelOffset = pixelOffset = currentSlide = 0;
            slideCount = $image.length;
            $slider.width(slideCount * imageWidthMobile);
            sliderWidth = slideCount * imageWidthMobile;

            $sliderContainer.on('mousedown touchstart', mobileSlideStart);
            $sliderContainer.on('mouseup touchend', mobileSlideEnd);
            $sliderContainer.on('mousemove touchmove', mobileSlide);
            $sliderContainer.click(function (e) { navigateMobileImages(e) });
            intervalMobile = setInterval(autoSlideMobile, imageTransitionTime);

            function autoSlideMobile() {
                currentLeftValue = $slider.offset().left;
                if (currentLeftValue <= (-sliderWidth + imageWidthMobile)) {
                    currentSlide = 0;
                    $slider.css("left", "0px");
                    checkBulletsPosition(currentSlide);
                } else {
                    currentSlide += 1;
                    nextLeftOffset = currentLeftValue - imageWidthMobile;
                    $slider.animate({ "left": + nextLeftOffset + "px" }, animationDurationMobile);
                    checkBulletsPosition(currentSlide);
                }
            };

            function navigateMobileImages(e) {
                if (e.target.className === 'round-bullet-navigation') {
                    clearInterval(intervalMobile);
                    var moveSliderTo = $(e.target).data('bullet-index');
                    $(e.target).siblings().removeClass('active-bullet');
                    $(e.target).addClass('active-bullet');
                    $slider.animate({ "left": + -(imageWidthMobile * moveSliderTo) + "px" }, animationDurationMobile);
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
                if (position != $('.active-bullet').data('bullet-index')) {
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
                    pixelOffset = currentSlide * -$sliderContainer.width();
                    $slider.animate({ "left": + pixelOffset + "px" }, animationDurationMobile);
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