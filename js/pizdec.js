$(function () {

    var initAngle = 0;
    var $arrow = $("#arrow");
    var $device = $('#device');

    var xArrow = $arrow.offset().left + $arrow.width();
    var yArrow = $arrow.offset().top;

    var fixed = false;
    var fixedLabel = -1;
    var angles = [40, 55, 69, 83, 96, 108, 121, 132, 148];

    var init = function() {
        rotate(initAngle);

        $device.on('mousemove', function(e) {
            var x1 = e.pageX;
            var y1 = e.pageY;

            var angleDeg = Math.atan2(y1 - yArrow, x1 - xArrow) * 180 / Math.PI;
            angleDeg *= -1;

            var angle = 180-angleDeg;

            if( fixed === true ) {
                return;
            }


            if( angle <= angles[0] ) {
                rotate(angles[0]);
            }
            else if( angle >= angles[angles.length-1] ) {
                rotate(angles[angles.length-1]);
            }
            else {
                rotate(angle);
            }

        });

        $('label[id^=label_]').on("click", function(e) {
            var id = $(this).data("number");
            highlightLabel(id, false);

            rotate(angles[id]);
            fixed = true;
            fixedLabel = id;
        });

        $('label[id^=label_]').on("mouseover", function(e) {
            var id = $(this).data("number");
            highlightLabel(id, true);
        });

        $('label[id^=label_]').on("mouseout", function(e) {
            var id = $(this).data("number");
            unHighlightLabel(id);
        });
    };

    function rotate(degree) {
        $arrow.css({
            WebkitTransform: 'rotate(' + degree + 'deg)'
        });
        $arrow.css({
            '-moz-transform': 'rotate(' + degree + 'deg)'
        });
    }

    var highlightLabel = function(id, mouseover) {
        for(var j = 0; j < angles.length; j++) {
            var label = $('#label_'+j);

            if(id === j) {
                label.addClass("label-selected");
            }
            else {
                if(mouseover === false ) {
                    label.removeClass("label-selected");
                }
                else {
                    if( j !== fixedLabel ) {
                        label.removeClass("label-selected");
                    }
                }

            }
        }
    };

    var unHighlightLabel = function(id) {
        for(var j = 0; j < angles.length; j++) {
            var label = $('#label_'+j);
            if( j !== fixedLabel ) {
                label.removeClass("label-selected");
            }
        }
    };

    init();
});