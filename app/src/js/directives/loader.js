/*global angular, Spinner*/

angular.module('FastToDo').directive('loader', function () {
    'use strict';

    return {

        scope: {
            loader: '='
        },

        link: function (scope, element, attrs) {

            var opts = {
                lines: 3, // The number of lines to draw
                length: 0, // The length of each line
                width: 15, // The line thickness
                radius: 20, // The radius of the inner circle
                corners: 0.5, // Corner roundness (0..1)
                rotate: 66, // The rotation offset
                direction: 1, // 1: clockwise, -1: counterclockwise
                color: '#000', // #rgb or #rrggbb or array of colors
                speed: 1.6, // Rounds per second
                trail: 47, // Afterglow percentage
                shadow: true, // Whether to render a shadow
                hwaccel: false, // Whether to use hardware acceleration
                className: 'spinner', // The CSS class to assign to the spinner
                zIndex: 2e9, // The z-index (defaults to 2000000000)
                top: '50%', // Top position relative to parent
                left: '50%' // Left position relative to parent
            },
                spinner = new Spinner(),
                parent = element[0].parentNode;

            element[0].style.position = "absolute";
            element[0].style.width = parent.offsetWidth + 'px';
            element[0].style.height = '100px';

            scope.$watch('loader', function (newValue, oldValue, scope) {
                if (newValue) {
                    element[0].style.display = 'block';
                    spinner.spin(element[0]);
                } else {
                    spinner.stop();
                    element[0].style.display = 'none'; // avoid this layer to overlap list items in Android devices.
                }
            });
        }

    };
});