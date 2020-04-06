//tilt
"use strict";
var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
    return typeof t
} : function (t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
};
! function (t) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : "object" === ("undefined" == typeof module ? "undefined" : _typeof(module)) && module.exports ? module.exports = function (i, s) {
        return void 0 === s && (s = "undefined" != typeof window ? require("jquery") : require("jquery")(i)), t(s), s
    } : t(jQuery)
}(function (t) {
    return t.fn.tilt = function (i) {
        var s = function () {
                this.ticking || (requestAnimationFrame(l.bind(this)), this.ticking = !0)
            },
            e = function () {
                var i = this;
                void 0 !== this.timeout && clearTimeout(this.timeout), t(this).css({
                    transition: this.settings.speed + "ms " + this.settings.easing
                }), this.settings.glare && this.glareElement.css({
                    transition: "opacity " + this.settings.speed + "ms " + this.settings.easing
                }), this.timeout = setTimeout(function () {
                    t(i).css({
                        transition: ""
                    }), i.settings.glare && i.glareElement.css({
                        transition: ""
                    })
                }, this.settings.speed)
            },
            n = function (i) {
                this.ticking = !1, t(this).css({
                    "will-change": "transform"
                }), e.call(this), t(this).trigger("tilt.mouseEnter")
            },
            a = function (i) {
                return void 0 === i && (i = {
                    pageX: t(this).offset().left + t(this).outerWidth() / 2,
                    pageY: t(this).offset().top + t(this).outerHeight() / 2
                }), {
                    x: i.pageX,
                    y: i.pageY
                }
            },
            o = function (t) {
                this.mousePositions = a(t), s.call(this)
            },
            r = function () {
                e.call(this), this.reset = !0, s.call(this), t(this).trigger("tilt.mouseLeave")
            },
            h = function () {
                var i = t(this).outerWidth(),
                    s = t(this).outerHeight(),
                    e = t(this).offset().left,
                    n = t(this).offset().top,
                    a = (this.mousePositions.x - e) / i,
                    o = (this.mousePositions.y - n) / s;
                return {
                    tiltX: (this.settings.maxTilt / 2 - a * this.settings.maxTilt).toFixed(2),
                    tiltY: (o * this.settings.maxTilt - this.settings.maxTilt / 2).toFixed(2),
                    percentageX: 100 * a,
                    percentageY: 100 * o,
                    angle: Math.atan2(this.mousePositions.x - (e + i / 2), -(this.mousePositions.y - (n + s / 2))) * (180 / Math.PI)
                }
            },
            l = function () {
                if (this.transforms = h.call(this), this.reset) return this.reset = !1, t(this).css("transform", "perspective(" + this.settings.perspective + "px) rotateX(0deg) rotateY(0deg)"), void(this.settings.glare && (this.glareElement.css("transform", "rotate(180deg) translate(-50%, -50%)"), this.glareElement.css("opacity", "0")));
                t(this).css("transform", "perspective(" + this.settings.perspective + "px) rotateX(" + ("x" === this.settings.disableAxis ? 0 : this.transforms.tiltY) + "deg) rotateY(" + ("y" === this.settings.disableAxis ? 0 : this.transforms.tiltX) + "deg) scale3d(" + this.settings.scale + "," + this.settings.scale + "," + this.settings.scale + ")"), this.settings.glare && (this.glareElement.css("transform", "rotate(" + this.transforms.angle + "deg) translate(-50%, -50%)"), this.glareElement.css("opacity", "" + this.transforms.percentageY * this.settings.maxGlare / 100)), t(this).trigger("change", [this.transforms]), this.ticking = !1
            },
            g = function () {
                this.glareElement.css({
                    width: "" + 2 * t(this).outerWidth(),
                    height: "" + 2 * t(this).outerWidth()
                })
            };
        return t.fn.tilt.destroy = function () {
            t(this).each(function () {
                t(this).find(".js-tilt-glare").remove(), t(this).css({
                    "will-change": "",
                    transform: ""
                }), t(this).off("mousemove mouseenter mouseleave")
            })
        }, t.fn.tilt.getValues = function () {
            var i = [];
            return t(this).each(function () {
                this.mousePositions = a.call(this), i.push(h.call(this))
            }), i
        }, t.fn.tilt.reset = function () {
            t(this).each(function () {
                var i = this;
                this.mousePositions = a.call(this), this.settings = t(this).data("settings"), r.call(this), setTimeout(function () {
                    i.reset = !1
                }, this.settings.transition)
            })
        }, this.each(function () {
            var s = this;
            this.settings = t.extend({
                maxTilt: t(this).is("[data-tilt-max]") ? t(this).data("tilt-max") : 20,
                perspective: t(this).is("[data-tilt-perspective]") ? t(this).data("tilt-perspective") : 100,
                easing: t(this).is("[data-tilt-easing]") ? t(this).data("tilt-easing") : "cubic-bezier(.03,.98,.52,.99)",
                scale: t(this).is("[data-tilt-scale]") ? t(this).data("tilt-scale") : "1",
                speed: t(this).is("[data-tilt-speed]") ? t(this).data("tilt-speed") : "400",
                transition: !t(this).is("[data-tilt-transition]") || t(this).data("tilt-transition"),
                disableAxis: t(this).is("[data-tilt-disable-axis]") ? t(this).data("tilt-disable-axis") : null,
                axis: t(this).is("[data-tilt-axis]") ? t(this).data("tilt-axis") : null,
                reset: !t(this).is("[data-tilt-reset]") || t(this).data("tilt-reset"),
                glare: !!t(this).is("[data-tilt-glare]") && t(this).data("tilt-glare"),
                maxGlare: t(this).is("[data-tilt-maxglare]") ? t(this).data("tilt-maxglare") : 1
            }, i), null !== this.settings.axis && (console.warn("Tilt.js: the axis setting has been renamed to disableAxis. See https://github.com/gijsroge/tilt.js/pull/26 for more information"), this.settings.disableAxis = this.settings.axis), this.init = function () {
                t(s).data("settings", s.settings), s.settings.glare && function () {
                        var i = this.settings.glarePrerender;
                        i || t(this).append('<div class="js-tilt-glare"><div class="js-tilt-glare-inner"></div></div>'), this.glareElementWrapper = t(this).find(".js-tilt-glare"), this.glareElement = t(this).find(".js-tilt-glare-inner"), i || (this.glareElementWrapper.css({
                            position: "absolute",
                            top: "0",
                            left: "0",
                            width: "100%",
                            height: "100%"
                        }).css({
                            overflow: "hidden",
                            "pointer-events": "none"
                        }), this.glareElement.css({
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            width: "" + 2 * t(this).outerWidth(),
                            height: "" + 2 * t(this).outerWidth(),
                            transform: "rotate(180deg) translate(-50%, -50%)",
                            "transform-origin": "0% 0%",
                            opacity: "0"
                        }))
                    }.call(s),
                    function () {
                        t(this).on("mousemove", o), t(this).on("mouseenter", n), this.settings.reset && t(this).on("mouseleave", r), this.settings.glare && t(window).on("resize", g.bind(this))
                    }.call(s)
            }, this.init()
        })
    }, t("[data-tilt]").tilt(), !0
});


$(function () {
    //gotottop button
    if ($(window).width() < 600) {
        $('.advantages li').removeClass('js-tilt');
    } else {
        var layoutWidth = $('.layout').outerWidth();
        var screenWidth = $('html, body').outerWidth();
        var marginWidth = screenWidth - layoutWidth;
        var halfMarginWidth = marginWidth / 2;
        $('.arrow_up').css('right', halfMarginWidth);
    }
    //tilt advantages
    $('.advantages .js-tilt').tilt({
        glare: true,
        maxGlare: .1,
        scale: .75,
        //find tilt.js str206 and 271
    });
    //load more our_products
    // удалить и переделать лоад, на бэке.
    $('.arrow_down').click(function () {
        $('.our_products .chair li:nth-child(5)').show();
        $('.our_products .chair li:nth-child(6)').show();
        $('.our_products .chair li:nth-child(7)').show();
        $('.our_products .chair li:nth-child(8)').show();
        $('.arrow_down').hide();
    });
    //our_products arrow_down
    $('.arrow_down').on("click", function () {
        $('html, body').animate({
            scrollTop: $(".our_products .chair li:nth-child(8)").offset().top
        }, 2000);
    });
    //tabs epoxy
    $(".wooden ul li").click(function () {
        var thisClass = this.className.slice(0, 2);
        $(".tab").hide();
        $(".tab." + thisClass).fadeIn(500);
        $("#menu-tabs li").removeClass("active");
        $(this).addClass("active");
        return false;
    });
    $(".wooden ul li.t1").click();
    //arrow_up
    $('.arrow_up').on("click", function () {
        $('html, body').animate({
            scrollTop: $("header").offset().top
        }, 2000);
    });
    //footer go_top arrow
    $('.go_top').bind('click.smoothscroll', function (e) {
        e.preventDefault();
        $('html, body').stop().animate({
            'scrollTop': $('body').offset().top
        }, 2000, 'swing');
    });
    $(window).scroll(() => {
        var windowTop = $(window).scrollTop();
        windowTop > 1001 ? $('.go_top').css({
            'opacity': '1',
            'z-index': '1'
        }) : $('.button').css({
            'opacity': '0',
            'z-index': '-1'
        });
    });
    //header menu-btn click
    $('header .menu-btn').click(function () {
        $(this).toggleClass(".on");
        $('header nav').toggleClass('open');
        lockScroll();
    });
    //header nav click
    $('nav li').click(function () {
        $('nav').removeClass('open');
        var $anchor = $("#content ." + this.className.split(" ")[0]).offset();
        $('html, body').animate({
            scrollTop: $anchor.top
        }, 1000);
        return false;
    });
    //hide lang
    $(window).scroll(function () {
        var sc = $(window).scrollTop()
        if (sc > 200) {
            $(".lang").addClass("dn")
        } else {
            $(".lang").removeClass("dn")
        }
    });
    //nex function
});
