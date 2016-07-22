/**
 * @author Chris Reynoso
 * Homepage: http://www.kfsoft.info
 * Based off original: Paul Chan / KF Software House
 * Forked from: https://github.com/kfsoft/MyDigitClock-By-Kfsoft.info
 *
 * Version 0.5.2
 * Copyright for portions of project are held by KF Software House, 2010 as part of project MyDigitClock-By-Kfsoft.info.
 * All other copyright for project are held by Chris Reynoso, 2016.
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 *
 */

/*jslint this multivar browser */
(function ($) {
    "use strict";
    var _options = {},
        _container = {};

    jQuery.fn.MyDigitClock = function (options) {
        var id = $(this).get(0).id,
            getDD,
            showClock;
        _options[id] = $.extend({}, $.fn.MyDigitClock.defaults, options);

        getDD = function (num) {
            return (num >= 10)
                ? num
                : "0" + num;
        };

        showClock = function (id) {
            var d = new Date(),
                h = d.getHours(),
                m = d.getMinutes(),
                s = d.getSeconds(),
                ampm = "";
            if (_options[id].bAmPm) {
                if (h === 0) {
                    h = 12;
                    ampm = " AM"
                } else if (h === 12) {
                    ampm = " PM";
                } else if (h > 12) {
                    h = h - 12;
                    ampm = " PM";
                } else {
                    ampm = " AM";
                }
            }

            var templateStr = _options[id].timeFormat + ampm;
            templateStr = templateStr.replace("{HH}", getDD(h));
            templateStr = templateStr.replace("{MM}", getDD(m));
            templateStr = templateStr.replace("{SS}", getDD(s));

            var obj = $("#" + id);
            obj.css("fontSize", _options[id].fontSize);
            obj.css("fontFamily", _options[id].fontFamily);
            obj.css("color", _options[id].fontColor);
            obj.css("background", _options[id].background);
            obj.css("fontWeight", _options[id].fontWeight);

            //change reading
            obj.html(templateStr);

            //toggle hands
            if (_options[id].bShowHeartBeat) {
                obj.find("#ch1").fadeTo(800, 0.1);
                obj.find("#ch2").fadeTo(800, 0.1);
            }
            setTimeout(function () {
                showClock(id);
            }, 1000);
        };

        return this.each(function () {
            _container[id] = $(this);
            showClock(id);
        });
    };

    //default values
    jQuery.fn.MyDigitClock.defaults = {
        background: "#fff",
        bAmPm: false,
        bShowHeartBeat: false,
        fontColor: "#ff2200",
        fontFamily: "Open Sans, Helvetica, Arial, Times",
        fontSize: "50px",
        fontWeight: "bold",
        timeFormat: "{HH}<span id=\"ch1\">:</span>{MM}<span id=\"ch2\">:</span>{SS}"
    };

})(jQuery);