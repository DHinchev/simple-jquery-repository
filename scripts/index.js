(function () {
    var ClassicSlider = function () {
        var scrollY = 0;
        var distance = 40;
        var speed = 20;
        var $elementClassic = $("#classic");
        var $slider = $("#slider");
        var $targetElementTop = $("#top");
        var sliderWidth = 0;
        var interval = null;
        var imageTransitionTime = 5000;
        var nextLeftOffset = 0;
        var sliderNext = 0;
        var sliderPrev = 0;
        var currentLeftValue = 0;
        var imageWidth = $(".sliderImg").width();

        var initSlider = function (slider) {
            var $sliderContainer = $(slider);
            var sliderChildren = $sliderContainer.children();
            sliderChildren.each(function () {
                sliderWidth += $(this).width();
            });
            $slider.width(sliderWidth);
            $targetElementTop.hide();
            sliderNavigation(sliderChildren);
        }

        function autoSlide() {
            currentLeftValue = parseInt($slider.css("left"));
            if (currentLeftValue <= (-sliderWidth + imageWidth * 2)) {
                $slider.css("left", 0);
            } else {
                nextLeftOffset = currentLeftValue - imageWidth;
                $slider.animate({ "left": + nextLeftOffset + "px" }, 1000);
            }
        };

        function sliderNavigation(navigationImages) {
            var sliderNavigation = $('<div></div>');
            sliderNavigation.attr('id','slider-navigation');
            $('#classic').append(sliderNavigation);
            var sliderNavigationContainer = $('<div></div>');
            sliderNavigationContainer.attr('id','slider-navigation-container');
            $(sliderNavigation).append(sliderNavigationContainer);
            navigationImages.each(function (index) {
                var temp = $(this).clone();
                temp.addClass('sliderNavigationImage');
                temp.removeClass('sliderImg');
                temp.attr( "data-index", index);
                $(sliderNavigationContainer).append(temp);    
            });
        }

        function disableArrows() {
            $('#prev').addClass("active");
            $('#next').addClass("active");
        }

        function enableArrows() {
            $('#prev').removeClass("active");
            $('#next').removeClass("active");
        }

        $('#prev').click(function () {
            currentLeftValue = parseInt($slider.css("left"));
            disableArrows();
            clearInterval(interval);
            if (currentLeftValue >= 0) {
                sliderPrev = -sliderWidth + imageWidth;
                $slider.css("left", sliderPrev + "px");
                enableArrows();
            } else {
                sliderPrev = currentLeftValue + imageWidth;
                $slider.animate({ "left": + sliderPrev + "px" }, 1000, enableArrows);
                setInterval(interval, imageTransitionTime);
            }
            interval = setInterval(autoSlide, imageTransitionTime);
        });

        $('#next').click(function () {
            currentLeftValue = parseInt($slider.css("left"));
            disableArrows();
            clearInterval(interval);
            if (currentLeftValue == (-sliderWidth + imageWidth)) {
                $slider.css("left", "0px");
                enableArrows();
            } else {
                sliderNext = currentLeftValue - imageWidth;
                $slider.animate({ "left": + sliderNext + "px" }, 1000, enableArrows);
                setInterval(interval, imageTransitionTime);
            }
            interval = setInterval(autoSlide, imageTransitionTime);
        });

        $('#classic').click(function (e) {
            if(e.target.className === 'sliderNavigationImage') {
                disableArrows();
                clearInterval(interval);
                var moveSliderTo = $(e.target).data('index');
                $slider.css("left", -(imageWidth * moveSliderTo) + "px");
                enableArrows();
                interval = setInterval(autoSlide, imageTransitionTime);
            }
        });

        interval = setInterval(autoSlide, imageTransitionTime);
        
        var SliderApi = {
            initSlider: initSlider
        } 
        return SliderApi;
    }();
    window.ClassicSlider = ClassicSlider;
}());