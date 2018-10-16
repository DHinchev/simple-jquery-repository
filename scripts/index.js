(function () {
    var Slider = function () {
        var $slider;
        var $sliderContainer;
        var $prev;
        var $next;
        var $images;
        var sliderChildren;
        var imageTransitionTime;
        var animationDuration;
        var animationDurationMobile;
        var interval = null;
        var intervalMobile = null;
        var nextLeftOffset = 0;
        var sliderNext = 0;
        var sliderPrev = 0;
        var currentLeftValue = 0;
        var sliding = 0;
        var startClientX = 0;
        var startPixelOffset = 0;
        var pixelOffset = 0;
        var currentSlide = 0;
        var sliderContainerWidth;
        var sliderChildrenLength;
        var sliderWidth;
        var menuIcon = document.querySelector('.menu-icon');
        const menuSlider = document.querySelector('.slide-menu');

        function getElements() {
            $slider = getSliderElement();
            $images = getSliderElement().children();
            $sliderContainer = getSliderContainerElement();
            $prev = getSliderPrevArrowElement();
            $next = getSliderNextArrowElement();
            sliderChildren = $slider.children();
            sliderChildrenLength = sliderChildren.length;
        }

        function getSliderOptions() {
            imageTransitionTime = getSliderTransitionTime();
            animationDuration = getSliderDurationTime();
            animationDurationTime = getSliderMobileMobileTime();
        }

        function getSliderDimensions() {
            sliderContainerWidth = $sliderContainer.width();
            sliderWidth = sliderContainerWidth * sliderChildrenLength;
        }

        function getSliderElement() {
            var $slider = $('[data-slider]');
            if (!$slider.length) {
                throw new Error('Error: data-slider attribute not set on page');
            }
            return $('.' + $slider.attr('class'));
        }

        function getSliderContainerElement() {
            var $sliderContainer = $('[data-slider-container]');
            if (!$sliderContainer.length) {
                throw new Error("Error: data-slider-container attribute not set on page");
            }
            return $('.' + $sliderContainer.attr('class'));
        }

        function getSliderTransitionTime() {
            var $sliderSpeed = $('[data-slider-speed]');
            if (!$sliderSpeed.length) {
                imageTransitionTime = 5000;
            } else {
                imageTransitionTime = $sliderSpeed.attr('data-slider-speed');
            }
            return imageTransitionTime;
        }

        function getSliderDurationTime() {
            var $sliderDuration = $('[data-slider-duration]');
            if (!$sliderDuration.length) {
                animationDuration = 1000;
            } else {
                animationDuration = $sliderDuration.attr('data-slider-duration');
            }
            return animationDuration;
        }

        function getSliderMobileMobileTime() {
            var $sliderMobileDuration = $('[data-slider-mobile-duration]');
            if (!$sliderMobileDuration.length) {
                animationMobileDuration = 5000;
            } else {
                animationMobileDuration = $sliderMobileDuration.attr('data-slider-mobile-duration');
            }
            return animationMobileDuration;
        }

        function getSliderPrevArrowElement() {
            var $sliderPrev = $('[data-slider-prev]');
            if (!$sliderPrev.length) {
                throw new Error("Error: data-slider-prev attribute not set on page");
            }
            return $('.' + $sliderPrev.attr('class'));
        }

        function getSliderNextArrowElement() {
            var $sliderNext = $('[data-slider-next]');
            if (!$sliderNext.length) {
                throw new Error("Error: data-slider-next attribute not set on page");
            }
            return $('.' + $sliderNext.attr('class'));
        }

        function addClassOnMenuIcon() {
            menuSlider.classList.toggle("open");
        }

        function autoSlide() {
            currentLeftValue = $slider.offset().left;

            if (currentLeftValue <= (sliderContainerWidth - sliderWidth)) {
                $slider.css('left', 0);
            } else {
                nextLeftOffset = currentLeftValue - sliderContainerWidth;
                $slider.animate({
                    'left': nextLeftOffset + 'px'
                }, {
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

        function createSliderNavigation(navigationImages) {
            var $sliderNavigation = $('<div class="slider-navigation"></div>');
            var $sliderNavigationContainer = $('<div class="slider-navigation-container"></div>');

            $sliderNavigation.append($sliderNavigationContainer);
            $sliderContainer.append($sliderNavigation);
            navigationImages.each(function (index) {
                var $imgClone = $(this).clone();
                $imgClone.removeClass('slider-img').addClass('slider-navigation-image');
                $imgClone.data('index', index);
                $sliderNavigationContainer.append($imgClone);
            });
        }

        function createSliderBulletsNavigation(navigationImages) {
            var $sliderBulletsNavigation = $('<div class="bullets-navigation"></div>');
            var $sliderBulletsContainer = $('<div class="slider-bullets"></div>');

            $sliderBulletsNavigation.append($sliderBulletsContainer);
            $sliderContainer.append($sliderBulletsNavigation);
            navigationImages.each(function (index) {
                var $tempBullet = $('<div class="round-bullet-navigation"></div>');
                $tempBullet.data('bullet-index', index);
                $sliderBulletsContainer.append($tempBullet);
            });
        }

        var disableArrows = function () {
            $prev.addClass('active');
            $next.addClass('active');
        }

        var enableArrows = function () {
            $prev.removeClass('active');
            $next.removeClass('active');
        }

        function moveOffsetLeft() {
            currentLeftValue = $slider.offset().left;
            clearInterval(interval);
            if (currentLeftValue >= 0) {
                sliderPrev = -sliderWidth + sliderContainerWidth;
                $slider.css('left', sliderPrev + 'px');
            } else {
                sliderPrev = currentLeftValue + sliderContainerWidth;
                $slider.animate({
                    'left': +sliderPrev + 'px'
                }, {
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
            if (currentLeftValue == (-sliderWidth + sliderContainerWidth)) {
                $slider.css('left', '0px');
            } else {
                sliderNext = currentLeftValue - sliderContainerWidth;
                $slider.animate({
                    'left': +sliderNext + 'px'
                }, {
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
            if (e.target.className === 'slider-navigation-image') {
                clearInterval(interval);
                var moveSliderTo = $(e.target).data('index');
                $slider.css('left', -(sliderContainerWidth * moveSliderTo) + 'px');
                interval = setInterval(autoSlide, imageTransitionTime);
            }
        }

        function restrictImageSizeToSliderContainer() {
            $images.each(function () {
                $(this).width(sliderContainerWidth);
            });
        }

        function initEvents() {
            $prev.click(function (e) {
                e.stopPropagation();
                moveOffsetLeft();
            });

            $next.click(function (e) {
                e.stopPropagation();
                moveOffsetRight();
            });

            $sliderContainer.click(function (e) {
                e.stopPropagation();
                navigationClick(e);
            });

            menuIcon.addEventListener('click', addClassOnMenuIcon);
        }

        function autoSlideMobile() {
            currentLeftValue = $slider.offset().left;
            if (currentLeftValue <= (-sliderWidth + sliderContainerWidth)) {
                currentSlide = 0;
                $slider.css('left', '0px');
                checkBulletsPosition(currentSlide);
            } else {
                currentSlide += 1;
                nextLeftOffset = currentLeftValue - sliderContainerWidth;
                $slider.animate({
                    'left': +nextLeftOffset + 'px'
                }, animationDurationMobile);
                checkBulletsPosition(currentSlide);
            }
        };

        function navigateMobileImages(e) {
            if (e.target.className === 'round-bullet-navigation') {
                clearInterval(intervalMobile);
                var moveSliderTo = $(e.target).data('bullet-index');
                $(e.target).siblings().removeClass('active-bullet');
                $(e.target).addClass('active-bullet');
                $slider.animate({
                    'left': + -(sliderContainerWidth * moveSliderTo) + 'px'
                }, animationDurationMobile);
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

        function mobileSliding(event) {
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
            var bulletTruePosition = $('[data-bullet-index=' + position + ']');
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
                $slider.animate({
                    'left': +pixelOffset + 'px'
                }, animationDurationMobile);
                checkBulletsPosition(currentSlide);
            }
            intervalMobile = setInterval(autoSlideMobile, imageTransitionTime);
        }

        function initMobileEvents() {
            $sliderContainer.on('mousedown touchstart', mobileSlideStart);
            $sliderContainer.on('mouseup touchend', mobileSlideEnd);
            $sliderContainer.on('mousemove touchmove', mobileSliding);
            $sliderContainer.click(function (e) {
                navigateMobileImages(e)
            });
        }

        function init() {
            getElements();
            getSliderOptions();
            getSliderDimensions();

            initEvents();
            $slider.width(sliderWidth);

            createSliderNavigation(sliderChildren);
            createSliderBulletsNavigation(sliderChildren);
            restrictImageSizeToSliderContainer();

            interval = setInterval(autoSlide, imageTransitionTime);

            if ($(document).width() < 750) {
                disableArrows();
                slideCount = $images.length;
                initMobileEvents();
                intervalMobile = setInterval(autoSlideMobile, imageTransitionTime);
            }
        }

        var SliderApi = {
            init: init
        }

        return SliderApi;
    }();

    window.Slider = Slider;
}());