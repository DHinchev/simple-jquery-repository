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
        var imageTransitionTime = 3000;
        var nextLeftOffset = 0;
        var sliderNext = 0;
        var sliderPrev = 0;
        var currentLeftValue = 0;
        var imageWidth = $(".sliderImg").width();

        var initSlider = function (slider) {
            var $sliderImages = $(".sliderImg");
            $sliderImages.each(function () {
                sliderWidth += $(this).width();
            });
            $slider.width(sliderWidth);

            $targetElementTop.hide();
        }

        // $(document).ready(function () {
        //     $targetElementTop.hide();
        // });

        // $targetElementTop.mousedown(function () {
        //     resetScroller($elementClassic);
        // });

        // function resetScroller(el) {
        //     var currentY = $(window).scrollTop();
        //     var targetY = $elementClassic.offset().top;
        //     var animator = setTimeout('resetScroller(\'' + el + '\')', speed);
        //     if (currentY > targetY) {
        //         scrollY = currentY - distance;
        //         window.scroll(0, scrollY);
        //     } else {
        //         clearTimeout(animator);
        //     }
        // }

        // $(window).scroll(function () {
        //     if ($(this).scrollTop() < 10) {
        //         $targetElementTop.stop(true, true).fadeOut("slow");
        //     } else {
        //         $targetElementTop.stop(true, true).fadeIn("slow");
        //     }
        // });

        function autoSlide() {
            currentLeftValue = parseInt($slider.css("left"));
            if (currentLeftValue <= (-sliderWidth + imageWidth * 2)) {
                $slider.css("left", 0);
            } else {
                nextLeftOffset = currentLeftValue - imageWidth;
                $slider.animate({ "left": + nextLeftOffset + "px" }, 1000);
            }
        };

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

        interval = setInterval(autoSlide, imageTransitionTime);

        var SliderApi = {
            initSlider: initSlider
        }

        return SliderApi;
    }();
    window.ClassicSlider = ClassicSlider;
}());