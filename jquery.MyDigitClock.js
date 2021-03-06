/**
 * @author Chris Reynoso
 * Homepage: https://github.com/FreedomMercenary/MyDigitClock-By-Kfsoft.info
 * Based off original: Paul Chan / KF Software House
 * Forked from: https://github.com/kfsoft/MyDigitClock-By-Kfsoft.info
 *
 * Version 0.7
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
            getDateTime,
            showClock;
        _options[id] = $.extend({}, $.fn.MyDigitClock.defaults, options);

        getDateTime = function () {
            var absoluteOffset,
                currentDate = new Date(),
                offset,
                offsetDirection,
                splitOffset,
                timeZone = _options[id].timeZone;
            if (!timeZone || $.type(timeZone) !== "string") {
                return currentDate;
            }
            // Convert to UTC
            currentDate = new Date(currentDate.getUTCFullYear(), currentDate.getUTCMonth(), currentDate.getUTCDate(), currentDate.getUTCHours(), currentDate.getUTCMinutes(), currentDate.getUTCSeconds());
            offsetDirection = timeZone.substring(0, 1) === "-" ? -1 : 1;
            absoluteOffset = offsetDirection === 1
                ? timeZone
                : timeZone.substring(1);
            splitOffset = absoluteOffset.split(",");
            if (splitOffset.length === 2) {
                offset = (parseInt(splitOffset[0], 10) * 60) + parseInt(splitOffset[1], 10);
            } else if (splitOffset.length === 1) {
                offset = parseInt(splitOffset[0], 10) * 60;
            } else {
                return currentDate;
            }

            currentDate.setMinutes(currentDate.getMinutes() + (offset * offsetDirection));

            return currentDate;
        };

        getDD = function (num) {
            return (num >= 10 || !_options[id].digitPrefix)
                ? num
                : "0" + num;
        };

        showClock = function (id) {
            var customFormat = "",
                customFormatRegex = /\{date:([^}]*)\}/g,
                d = getDateTime(),
                h = d.getHours(),
                m = d.getMinutes(),
                s = d.getSeconds(),
                ampm = "";
            if (_options[id].bAmPm) {
                if (h === 0) {
                    h = 12;
                    ampm = " AM";
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
            // Handle custom format
            if (_options[id].dateFormatter && templateStr.indexOf("{date:") !== -1) {
                customFormat = customFormatRegex.exec(templateStr)[1];
                templateStr = templateStr.replace("{date:" + customFormat + "}", _options[id].dateFormatter(customFormat, d));
            }

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
                obj.find(".ch1").fadeTo(800, 0.1);
                obj.find(".ch2").fadeTo(800, 0.1);
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
        dateFormatter: null,
        digitPrefix: true,
        fontColor: "#ff2200",
        fontFamily: "Open Sans, Helvetica, Arial, Times",
        fontSize: "50px",
        fontWeight: "bold",
        timeFormat: "{date:M d, yy} {HH}<span class=\"ch1\">:</span>{MM}<span class=\"ch2\">:</span>{SS}",
        timeZone: null
    };

})(jQuery);