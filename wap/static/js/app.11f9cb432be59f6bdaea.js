webpackJsonp([1], {
    "+Hhr": function(t, a) {},
    "1IYX": function(t, a) {},
    "1dTx": function(t, a) {},
    "3Jyr": function(t, a) {},
    "4B/U": function(t, a, e) {
        "use strict";
        function i(t) {
            if (null == t) return window;
            if ("[object Window]" !== t.toString()) {
                var a = t.ownerDocument;
                return a && a.defaultView || window
            }
            return t
        }
        function s(t) {
            return t instanceof i(t).Element || t instanceof Element
        }
        function n(t) {
            return t instanceof i(t).HTMLElement || t instanceof HTMLElement
        }
        function o(t) {
            return "undefined" != typeof ShadowRoot && (t instanceof i(t).ShadowRoot || t instanceof ShadowRoot)
        }
        e.d(a, "a",
        function() {
            return j
        }),
        e.d(a, "b",
        function() {
            return M
        });
        var r = Math.round;
        function c(t, a) {
            void 0 === a && (a = !1);
            var e = t.getBoundingClientRect(),
            i = 1,
            s = 1;
            if (n(t) && a) {
                var o = t.offsetHeight,
                c = t.offsetWidth;
                c > 0 && (i = r(e.width) / c || 1),
                o > 0 && (s = r(e.height) / o || 1)
            }
            return {
                width: e.width / i,
                height: e.height / s,
                top: e.top / s,
                right: e.right / i,
                bottom: e.bottom / s,
                left: e.left / i,
                x: e.left / i,
                y: e.top / s
            }
        }
        function l(t) {
            var a = i(t);
            return {
                scrollLeft: a.pageXOffset,
                scrollTop: a.pageYOffset
            }
        }
        function d(t) {
            return t ? (t.nodeName || "").toLowerCase() : null
        }
        function v(t) {
            return ((s(t) ? t.ownerDocument: t.document) || window.document).documentElement
        }
        function p(t) {
            return i(t).getComputedStyle(t)
        }
        function u(t) {
            var a = p(t),
            e = a.overflow,
            i = a.overflowX,
            s = a.overflowY;
            return /auto|scroll|overlay|hidden/.test(e + s + i)
        }
        function f(t, a, e) {
            void 0 === e && (e = !1);
            var s, o, p = n(a),
            f = n(a) &&
            function(t) {
                var a = t.getBoundingClientRect(),
                e = r(a.width) / t.offsetWidth || 1,
                i = r(a.height) / t.offsetHeight || 1;
                return 1 !== e || 1 !== i
            } (a),
            g = v(a),
            h = c(t, f),
            _ = {
                scrollLeft: 0,
                scrollTop: 0
            },
            m = {
                x: 0,
                y: 0
            };
            return (p || !p && !e) && (("body" !== d(a) || u(g)) && (_ = (s = a) !== i(s) && n(s) ? {
                scrollLeft: (o = s).scrollLeft,
                scrollTop: o.scrollTop
            }: l(s)), n(a) ? ((m = c(a, !0)).x += a.clientLeft, m.y += a.clientTop) : g && (m.x = function(t) {
                return c(v(t)).left + l(t).scrollLeft
            } (g))),
            {
                x: h.left + _.scrollLeft - m.x,
                y: h.top + _.scrollTop - m.y,
                width: h.width,
                height: h.height
            }
        }
        function g(t) {
            return "html" === d(t) ? t: t.assignedSlot || t.parentNode || (o(t) ? t.host: null) || v(t)
        }
        function h(t, a) {
            var e;
            void 0 === a && (a = []);
            var s = function t(a) {
                return ["html", "body", "#document"].indexOf(d(a)) >= 0 ? a.ownerDocument.body: n(a) && u(a) ? a: t(g(a))
            } (t),
            o = s === (null == (e = t.ownerDocument) ? void 0 : e.body),
            r = i(s),
            c = o ? [r].concat(r.visualViewport || [], u(s) ? s: []) : s,
            l = a.concat(c);
            return o ? l: l.concat(h(g(c)))
        }
        function _(t) {
            return ["table", "td", "th"].indexOf(d(t)) >= 0
        }
        function m(t) {
            return n(t) && "fixed" !== p(t).position ? t.offsetParent: null
        }
        function b(t) {
            for (var a = i(t), e = m(t); e && _(e) && "static" === p(e).position;) e = m(e);
            return e && ("html" === d(e) || "body" === d(e) && "static" === p(e).position) ? a: e ||
            function(t) {
                var a = -1 !== navigator.userAgent.toLowerCase().indexOf("firefox");
                if ( - 1 !== navigator.userAgent.indexOf("Trident") && n(t) && "fixed" === p(t).position) return null;
                var e = g(t);
                for (o(e) && (e = e.host); n(e) && ["html", "body"].indexOf(d(e)) < 0;) {
                    var i = p(e);
                    if ("none" !== i.transform || "none" !== i.perspective || "paint" === i.contain || -1 !== ["transform", "perspective"].indexOf(i.willChange) || a && "filter" === i.willChange || a && i.filter && "none" !== i.filter) return e;
                    e = e.parentNode
                }
                return null
            } (t) || a
        }
        var y = "top",
        w = "bottom",
        C = "right",
        k = "left",
        x = "auto",
        $ = "start",
        S = "end",
        I = [].concat([y, w, C, k], [x]).reduce(function(t, a) {
            return t.concat([a, a + "-" + $, a + "-" + S])
        },
        []),
        L = ["beforeRead", "read", "afterRead", "beforeMain", "main", "afterMain", "beforeWrite", "write", "afterWrite"];
        function A(t) {
            var a = new Map,
            e = new Set,
            i = [];
            return t.forEach(function(t) {
                a.set(t.name, t)
            }),
            t.forEach(function(t) {
                e.has(t.name) ||
                function t(s) {
                    e.add(s.name),
                    [].concat(s.requires || [], s.requiresIfExists || []).forEach(function(i) {
                        if (!e.has(i)) {
                            var s = a.get(i);
                            s && t(s)
                        }
                    }),
                    i.push(s)
                } (t)
            }),
            i
        }
        function T(t) {
            for (var a = arguments.length,
            e = new Array(a > 1 ? a - 1 : 0), i = 1; i < a; i++) e[i - 1] = arguments[i];
            return [].concat(e).reduce(function(t, a) {
                return t.replace(/%s/, a)
            },
            t)
        }
        var E = 'Popper: modifier "%s" provided an invalid %s property, expected %s but got %s',
        U = 'Popper: modifier "%s" requires "%s", but "%s" modifier is not available',
        N = ["name", "enabled", "phase", "fn", "effect", "requires", "options"];
        function D(t) {
            return t.split("-")[0]
        }
        function P(t) {
            return t.split("-")[1]
        }
        var z = "Popper: Invalid reference or popper argument provided. They must be either a DOM element or virtual element.",
        B = "Popper: An infinite loop in the modifiers cycle has been detected! The cycle has been interrupted to prevent a browser crash.",
        R = {
            placement: "bottom",
            modifiers: [],
            strategy: "absolute"
        };
        function F() {
            for (var t = arguments.length,
            a = new Array(t), e = 0; e < t; e++) a[e] = arguments[e];
            return ! a.some(function(t) {
                return ! (t && "function" == typeof t.getBoundingClientRect)
            })
        }
        var O = {
            passive: !0
        };
        var q = {
            top: "auto",
            right: "auto",
            bottom: "auto",
            left: "auto"
        };
        function V(t) {
            var a, e = t.popper,
            s = t.popperRect,
            n = t.placement,
            o = t.variation,
            c = t.offsets,
            l = t.position,
            d = t.gpuAcceleration,
            u = t.adaptive,
            f = t.roundOffsets,
            g = t.isFixed,
            h = c.x,
            _ = void 0 === h ? 0 : h,
            m = c.y,
            x = void 0 === m ? 0 : m,
            $ = "function" == typeof f ? f({
                x: _,
                y: x
            }) : {
                x: _,
                y: x
            };
            _ = $.x,
            x = $.y;
            var I = c.hasOwnProperty("x"),
            L = c.hasOwnProperty("y"),
            A = k,
            T = y,
            E = window;
            if (u) {
                var U = b(e),
                N = "clientHeight",
                D = "clientWidth";
                if (U === i(e) && "static" !== p(U = v(e)).position && "absolute" === l && (N = "scrollHeight", D = "scrollWidth"), U = U, n === y || (n === k || n === C) && o === S) T = w,
                x -= (g && U === E && E.visualViewport ? E.visualViewport.height: U[N]) - s.height,
                x *= d ? 1 : -1;
                if (n === k || (n === y || n === w) && o === S) A = C,
                _ -= (g && U === E && E.visualViewport ? E.visualViewport.width: U[D]) - s.width,
                _ *= d ? 1 : -1
            }
            var P, z = Object.assign({
                position: l
            },
            u && q),
            B = !0 === f ?
            function(t) {
                var a = t.x,
                e = t.y,
                i = window.devicePixelRatio || 1;
                return {
                    x: r(a * i) / i || 0,
                    y: r(e * i) / i || 0
                }
            } ({
                x: _,
                y: x
            }) : {
                x: _,
                y: x
            };
            return _ = B.x,
            x = B.y,
            d ? Object.assign({},
            z, ((P = {})[T] = L ? "0": "", P[A] = I ? "0": "", P.transform = (E.devicePixelRatio || 1) <= 1 ? "translate(" + _ + "px, " + x + "px)": "translate3d(" + _ + "px, " + x + "px, 0)", P)) : Object.assign({},
            z, ((a = {})[T] = L ? x + "px": "", a[A] = I ? _ + "px": "", a.transform = "", a))
        }
        var j = function(t) {
            void 0 === t && (t = {});
            var a = t,
            e = a.defaultModifiers,
            i = void 0 === e ? [] : e,
            n = a.defaultOptions,
            o = void 0 === n ? R: n;
            return function(t, a, e) {
                void 0 === e && (e = o);
                var n, r, l = {
                    placement: "bottom",
                    orderedModifiers: [],
                    options: Object.assign({},
                    R, o),
                    modifiersData: {},
                    elements: {
                        reference: t,
                        popper: a
                    },
                    attributes: {},
                    styles: {}
                },
                d = [],
                v = !1,
                u = {
                    state: l,
                    setOptions: function(e) {
                        var n = "function" == typeof e ? e(l.options) : e;
                        g(),
                        l.options = Object.assign({},
                        o, l.options, n),
                        l.scrollParents = {
                            reference: s(t) ? h(t) : t.contextElement ? h(t.contextElement) : [],
                            popper: h(a)
                        };
                        var r = function(t) {
                            var a = A(t);
                            return L.reduce(function(t, e) {
                                return t.concat(a.filter(function(t) {
                                    return t.phase === e
                                }))
                            },
                            [])
                        } (function(t) {
                            var a = t.reduce(function(t, a) {
                                var e = t[a.name];
                                return t[a.name] = e ? Object.assign({},
                                e, a, {
                                    options: Object.assign({},
                                    e.options, a.options),
                                    data: Object.assign({},
                                    e.data, a.data)
                                }) : a,
                                t
                            },
                            {});
                            return Object.keys(a).map(function(t) {
                                return a[t]
                            })
                        } ([].concat(i, l.options.modifiers)));
                        l.orderedModifiers = r.filter(function(t) {
                            return t.enabled
                        }),
                        function(t) {
                            t.forEach(function(a) { [].concat(Object.keys(a), N).filter(function(t, a, e) {
                                    return e.indexOf(t) === a
                                }).forEach(function(e) {
                                    switch (e) {
                                    case "name":
                                        "string" != typeof a.name && console.error(T(E, String(a.name), '"name"', '"string"', '"' + String(a.name) + '"'));
                                        break;
                                    case "enabled":
                                        "boolean" != typeof a.enabled && console.error(T(E, a.name, '"enabled"', '"boolean"', '"' + String(a.enabled) + '"'));
                                        break;
                                    case "phase":
                                        L.indexOf(a.phase) < 0 && console.error(T(E, a.name, '"phase"', "either " + L.join(", "), '"' + String(a.phase) + '"'));
                                        break;
                                    case "fn":
                                        "function" != typeof a.fn && console.error(T(E, a.name, '"fn"', '"function"', '"' + String(a.fn) + '"'));
                                        break;
                                    case "effect":
                                        null != a.effect && "function" != typeof a.effect && console.error(T(E, a.name, '"effect"', '"function"', '"' + String(a.fn) + '"'));
                                        break;
                                    case "requires":
                                        null == a.requires || Array.isArray(a.requires) || console.error(T(E, a.name, '"requires"', '"array"', '"' + String(a.requires) + '"'));
                                        break;
                                    case "requiresIfExists":
                                        Array.isArray(a.requiresIfExists) || console.error(T(E, a.name, '"requiresIfExists"', '"array"', '"' + String(a.requiresIfExists) + '"'));
                                        break;
                                    case "options":
                                    case "data":
                                        break;
                                    default:
                                        console.error('PopperJS: an invalid property has been provided to the "' + a.name + '" modifier, valid properties are ' + N.map(function(t) {
                                            return '"' + t + '"'
                                        }).join(", ") + '; but "' + e + '" was provided.')
                                    }
                                    a.requires && a.requires.forEach(function(e) {
                                        null == t.find(function(t) {
                                            return t.name === e
                                        }) && console.error(T(U, String(a.name), e, e))
                                    })
                                })
                            })
                        } ((c = [].concat(r, l.options.modifiers), v = function(t) {
                            return t.name
                        },
                        f = new Set, c.filter(function(t) {
                            var a = v(t);
                            if (!f.has(a)) return f.add(a),
                            !0
                        }))),
                        D(l.options.placement) === x && (l.orderedModifiers.find(function(t) {
                            return "flip" === t.name
                        }) || console.error(['Popper: "auto" placements require the "flip" modifier be', "present and enabled to work."].join(" ")));
                        var c, v, f, _ = p(a);
                        return [_.marginTop, _.marginRight, _.marginBottom, _.marginLeft].some(function(t) {
                            return parseFloat(t)
                        }) && console.warn(['Popper: CSS "margin" styles cannot be used to apply padding', "between the popper and its reference element or boundary.", "To replicate margin, use the `offset` modifier, as well as", "the `padding` option in the `preventOverflow` and `flip`", "modifiers."].join(" ")),
                        l.orderedModifiers.forEach(function(t) {
                            var a = t.name,
                            e = t.options,
                            i = void 0 === e ? {}: e,
                            s = t.effect;
                            if ("function" == typeof s) {
                                var n = s({
                                    state: l,
                                    name: a,
                                    instance: u,
                                    options: i
                                });
                                d.push(n ||
                                function() {})
                            }
                        }),
                        u.update()
                    },
                    forceUpdate: function() {
                        if (!v) {
                            var t = l.elements,
                            a = t.reference,
                            e = t.popper;
                            if (F(a, e)) {
                                var i, s, n, o;
                                l.rects = {
                                    reference: f(a, b(e), "fixed" === l.options.strategy),
                                    popper: (i = e, s = c(i), n = i.offsetWidth, o = i.offsetHeight, Math.abs(s.width - n) <= 1 && (n = s.width), Math.abs(s.height - o) <= 1 && (o = s.height), {
                                        x: i.offsetLeft,
                                        y: i.offsetTop,
                                        width: n,
                                        height: o
                                    })
                                },
                                l.reset = !1,
                                l.placement = l.options.placement,
                                l.orderedModifiers.forEach(function(t) {
                                    return l.modifiersData[t.name] = Object.assign({},
                                    t.data)
                                });
                                for (var r = 0,
                                d = 0; d < l.orderedModifiers.length; d++) {
                                    if ((r += 1) > 100) {
                                        console.error(B);
                                        break
                                    }
                                    if (!0 !== l.reset) {
                                        var p = l.orderedModifiers[d],
                                        g = p.fn,
                                        h = p.options,
                                        _ = void 0 === h ? {}: h,
                                        m = p.name;
                                        "function" == typeof g && (l = g({
                                            state: l,
                                            options: _,
                                            name: m,
                                            instance: u
                                        }) || l)
                                    } else l.reset = !1,
                                    d = -1
                                }
                            } else console.error(z)
                        }
                    },
                    update: (n = function() {
                        return new Promise(function(t) {
                            u.forceUpdate(),
                            t(l)
                        })
                    },
                    function() {
                        return r || (r = new Promise(function(t) {
                            Promise.resolve().then(function() {
                                r = void 0,
                                t(n())
                            })
                        })),
                        r
                    }),
                    destroy: function() {
                        g(),
                        v = !0
                    }
                };
                if (!F(t, a)) return console.error(z),
                u;
                function g() {
                    d.forEach(function(t) {
                        return t()
                    }),
                    d = []
                }
                return u.setOptions(e).then(function(t) { ! v && e.onFirstUpdate && e.onFirstUpdate(t)
                }),
                u
            }
        } ({
            defaultModifiers: [{
                name: "eventListeners",
                enabled: !0,
                phase: "write",
                fn: function() {},
                effect: function(t) {
                    var a = t.state,
                    e = t.instance,
                    s = t.options,
                    n = s.scroll,
                    o = void 0 === n || n,
                    r = s.resize,
                    c = void 0 === r || r,
                    l = i(a.elements.popper),
                    d = [].concat(a.scrollParents.reference, a.scrollParents.popper);
                    return o && d.forEach(function(t) {
                        t.addEventListener("scroll", e.update, O)
                    }),
                    c && l.addEventListener("resize", e.update, O),
                    function() {
                        o && d.forEach(function(t) {
                            t.removeEventListener("scroll", e.update, O)
                        }),
                        c && l.removeEventListener("resize", e.update, O)
                    }
                },
                data: {}
            },
            {
                name: "popperOffsets",
                enabled: !0,
                phase: "read",
                fn: function(t) {
                    var a = t.state,
                    e = t.name;
                    a.modifiersData[e] = function(t) {
                        var a, e = t.reference,
                        i = t.element,
                        s = t.placement,
                        n = s ? D(s) : null,
                        o = s ? P(s) : null,
                        r = e.x + e.width / 2 - i.width / 2,
                        c = e.y + e.height / 2 - i.height / 2;
                        switch (n) {
                        case y:
                            a = {
                                x: r,
                                y: e.y - i.height
                            };
                            break;
                        case w:
                            a = {
                                x: r,
                                y: e.y + e.height
                            };
                            break;
                        case C:
                            a = {
                                x: e.x + e.width,
                                y: c
                            };
                            break;
                        case k:
                            a = {
                                x: e.x - i.width,
                                y: c
                            };
                            break;
                        default:
                            a = {
                                x: e.x,
                                y: e.y
                            }
                        }
                        var l = n ?
                        function(t) {
                            return ["top", "bottom"].indexOf(t) >= 0 ? "x": "y"
                        } (n) : null;
                        if (null != l) {
                            var d = "y" === l ? "height": "width";
                            switch (o) {
                            case $:
                                a[l] = a[l] - (e[d] / 2 - i[d] / 2);
                                break;
                            case S:
                                a[l] = a[l] + (e[d] / 2 - i[d] / 2)
                            }
                        }
                        return a
                    } ({
                        reference: a.rects.reference,
                        element: a.rects.popper,
                        strategy: "absolute",
                        placement: a.placement
                    })
                },
                data: {}
            },
            {
                name: "computeStyles",
                enabled: !0,
                phase: "beforeWrite",
                fn: function(t) {
                    var a = t.state,
                    e = t.options,
                    i = e.gpuAcceleration,
                    s = void 0 === i || i,
                    n = e.adaptive,
                    o = void 0 === n || n,
                    r = e.roundOffsets,
                    c = void 0 === r || r,
                    l = p(a.elements.popper).transitionProperty || "";
                    o && ["transform", "top", "right", "bottom", "left"].some(function(t) {
                        return l.indexOf(t) >= 0
                    }) && console.warn(["Popper: Detected CSS transitions on at least one of the following", 'CSS properties: "transform", "top", "right", "bottom", "left".', "\n\n", 'Disable the "computeStyles" modifier\'s `adaptive` option to allow', "for smooth transitions, or remove these properties from the CSS", "transition declaration on the popper element if only transitioning", "opacity or background-color for example.", "\n\n", "We recommend using the popper element as a wrapper around an inner", "element that can have any CSS property transitioned for animations."].join(" "));
                    var d = {
                        placement: D(a.placement),
                        variation: P(a.placement),
                        popper: a.elements.popper,
                        popperRect: a.rects.popper,
                        gpuAcceleration: s,
                        isFixed: "fixed" === a.options.strategy
                    };
                    null != a.modifiersData.popperOffsets && (a.styles.popper = Object.assign({},
                    a.styles.popper, V(Object.assign({},
                    d, {
                        offsets: a.modifiersData.popperOffsets,
                        position: a.options.strategy,
                        adaptive: o,
                        roundOffsets: c
                    })))),
                    null != a.modifiersData.arrow && (a.styles.arrow = Object.assign({},
                    a.styles.arrow, V(Object.assign({},
                    d, {
                        offsets: a.modifiersData.arrow,
                        position: "absolute",
                        adaptive: !1,
                        roundOffsets: c
                    })))),
                    a.attributes.popper = Object.assign({},
                    a.attributes.popper, {
                        "data-popper-placement": a.placement
                    })
                },
                data: {}
            },
            {
                name: "applyStyles",
                enabled: !0,
                phase: "write",
                fn: function(t) {
                    var a = t.state;
                    Object.keys(a.elements).forEach(function(t) {
                        var e = a.styles[t] || {},
                        i = a.attributes[t] || {},
                        s = a.elements[t];
                        n(s) && d(s) && (Object.assign(s.style, e), Object.keys(i).forEach(function(t) {
                            var a = i[t]; ! 1 === a ? s.removeAttribute(t) : s.setAttribute(t, !0 === a ? "": a)
                        }))
                    })
                },
                effect: function(t) {
                    var a = t.state,
                    e = {
                        popper: {
                            position: a.options.strategy,
                            left: "0",
                            top: "0",
                            margin: "0"
                        },
                        arrow: {
                            position: "absolute"
                        },
                        reference: {}
                    };
                    return Object.assign(a.elements.popper.style, e.popper),
                    a.styles = e,
                    a.elements.arrow && Object.assign(a.elements.arrow.style, e.arrow),
                    function() {
                        Object.keys(a.elements).forEach(function(t) {
                            var i = a.elements[t],
                            s = a.attributes[t] || {},
                            o = Object.keys(a.styles.hasOwnProperty(t) ? a.styles[t] : e[t]).reduce(function(t, a) {
                                return t[a] = "",
                                t
                            },
                            {});
                            n(i) && d(i) && (Object.assign(i.style, o), Object.keys(s).forEach(function(t) {
                                i.removeAttribute(t)
                            }))
                        })
                    }
                },
                requires: ["computeStyles"]
            }]
        });
        var M = {
            name: "offset",
            enabled: !0,
            phase: "main",
            requires: ["popperOffsets"],
            fn: function(t) {
                var a = t.state,
                e = t.options,
                i = t.name,
                s = e.offset,
                n = void 0 === s ? [0, 0] : s,
                o = I.reduce(function(t, e) {
                    return t[e] = function(t, a, e) {
                        var i = D(t),
                        s = [k, y].indexOf(i) >= 0 ? -1 : 1,
                        n = "function" == typeof e ? e(Object.assign({},
                        a, {
                            placement: t
                        })) : e,
                        o = n[0],
                        r = n[1];
                        return o = o || 0,
                        r = (r || 0) * s,
                        [k, C].indexOf(i) >= 0 ? {
                            x: r,
                            y: o
                        }: {
                            x: o,
                            y: r
                        }
                    } (e, a.rects, n),
                    t
                },
                {}),
                r = o[a.placement],
                c = r.x,
                l = r.y;
                null != a.modifiersData.popperOffsets && (a.modifiersData.popperOffsets.x += c, a.modifiersData.popperOffsets.y += l),
                a.modifiersData[i] = o
            }
        }
    },
    "4ml/": function(t, a) {},
    "5FF6": function(t, a) {},
    "5Qam": function(t, a) {},
    "6FIa": function(t, a) {},
    DYwm: function(t, a) {},
    H7XO: function(t, a) {},
    JGRa: function(t, a) {},
    JOYd: function(t, a) {},
    KAOl: function(t, a) {},
    KwRj: function(t, a) {},
    NHnr: function(t, a, e) {
        "use strict";
        Object.defineProperty(a, "__esModule", {
            value: !0
        });
        var i = e("7+uW"),
        s = e("mvHQ"),
        n = e.n(s),
        o = {
            name: "App",
            data: function() {
                return {
                    daoTime: null,
                    loading: !1,
                    pid: ""
                }
            },
            created: function() {
                var t = this.$route.query;
                this.getApp(),
                this.getGameList(),
                sessionStorage.getItem("token") && (this.openDaoTime(), this.getUserInfo()),
                t.pid && (this.pid = t.pid, this.$router.push({
                    path: "/login?type=1&pid=" + t.pid
                })),
                this.getVisitUrl()
            },
            methods: {
                getVisitUrl: function() {
                    var t = this;
                    t.$apiFun.get("/api/getVisitUrl", {}).then(function(a) {
                        if (200 == a.code) {
                            0;
                            var e = t.pid ? a.data.url + "register?pid=" + t.pid: a.data.url;
                            window.open(e, "_self")
                        }
                    }).
                    catch(function(t) {})
                },
                getGameList: function() {
                    var t = this;
                    t.$apiFun.get("/api/game/list", {
                        category: ""
                    }).then(function(a) {
                        if (200 == a.code) {
                            var e = [],
                            i = [],
                            s = [],
                            o = [],
                            r = [],
                            c = [];
                            a.data.forEach(function(a) {
                                "realbet" == a.category_id && 1 == a.app_state && e.push(a),
                                "joker" == a.category_id && 1 == a.app_state && i.push(a),
                                "gaming" == a.category_id && 1 == a.app_state && s.push(a),
                                "sport" == a.category_id && 1 == a.app_state && o.push(a),
                                "lottery" == a.category_id && 1 == a.app_state && r.push(a),
                                "concise" == a.category_id && 1 == a.app_state && c.push(a),
                                localStorage.setItem("realbetList", n()(e)),
                                localStorage.setItem("jokerList", n()(i)),
                                localStorage.setItem("gamingList", n()(s)),
                                localStorage.setItem("sportList", n()(o)),
                                localStorage.setItem("lotteryList", n()(r)),
                                localStorage.setItem("conciseList", n()(c)),
                                t.$store.commit("changGameList")
                            })
                        }
                    })
                },
                getApp: function() {
                    var t = this;
                    t.$apiFun.post("/api/app", {}).then(function(a) {
                        200 == a.code && (localStorage.setItem("appInfo", n()(a.data)), t.$store.commit("changappInfo"), document.getElementsByTagName("title")[0].innerText = t.$store.state.appInfo.title)
                    })
                },
                outLogin: function() {
                    var t = this;
                    t.$dialog.confirm({
                        title: "提示",
                        message: "您确定要退出登录吗?"
                    }).then(function() {
                        t.showLoading(),
                        t.$apiFun.post("/api/logoff", {}).then(function(a) {
                            localStorage.clear(),
                            sessionStorage.clear(),
                            t.$store.commit("changUserInfo"),
                            t.$store.commit("changToken"),
                            t.closeDaoTime(),
                            t.hideLoading(),
                            t.$router.push({
                                path: "/login"
                            })
                        }).
                        catch(function() {
                            localStorage.clear(),
                            sessionStorage.clear(),
                            t.$store.commit("changUserInfo"),
                            t.$store.commit("changToken"),
                            t.closeDaoTime(),
                            t.hideLoading(),
                            t.$router.push({
                                path: "/login"
                            })
                        })
                    }).
                    catch(function() {})
                },
                openGamePage: function(t, a, e) { (sessionStorage.getItem("token") ? sessionStorage.getItem("token") : "") ? this.goNav("/gamePage?name=" + t + "&type=" + a + "&code=" + e) : this.showTost(0, "请登录！")
                },
                doCopy: function(t) {
                    var a = document.createElement("input");
                    a.style.opacity = "0",
                    a.value = t,
                    document.body.appendChild(a),
                    a.select(),
                    document.execCommand("copy"),
                    this.showTost(1, "复制成功！")
                },
                goNav: function(t) {
                    var a = this;
                    if ("/mine" == t && (this.$store.state.token || this.$router.push({
                        path: "/login"
                    })), "/hongbao" == t || "/transfer" == t) {
                        if (!this.$store.state.token) return void this.$dialog.confirm({
                            message: "精彩内容等你来体验，快来登录吧！"
                        }).then(function() {
                            a.$router.push({
                                path: "/login"
                            })
                        });
                        if ("/hongbao" == t && 0 == this.$store.state.appInfo.redpacket_switch) return void this.showTost(0, "红包已关闭")
                    }
                    t != this.$route.fullPath ? this.$router.push({
                        path: t
                    }) : this.showTost(0, "已在当前页面！")
                },
                closeDaoTime: function() {
                    null != this.daoTime && clearInterval(this.daoTime),
                    this.daoTime = null
                },
                getBalance: function() {
                    var t = this;
                    t.$apiFun.post("/api/balance", {}).then(function(a) {
                        if (200 == a.code) {
                            var e = JSON.parse(localStorage.getItem("userInfo"));
                            e.balance = a.data.balance,
                            localStorage.setItem("userInfo", n()(e)),
                            t.$store.commit("changUserInfo")
                        }
                        401 == a.code && (localStorage.clear(), sessionStorage.clear(), t.$store.commit("changUserInfo"), t.$store.commit("changToken"), t.closeDaoTime(), t.$router.push({
                            path: "/login"
                        }))
                    }).
                    catch(function(t) {})
                },
                openDaoTime: function() {
                    var t = this;
                    t.daoTime = setInterval(function() {
                        t.getBalance()
                    },
                    4300)
                },
                getUserInfo: function() {
                    var t = this;
                    t.$apiFun.post("/api/user", {}).then(function(a) {
                        if (200 === a.code) {
                            var e = a.data,
                            i = e.current_vip,
                            s = i.indexOf("P"),
                            o = i.substr(s + 1, i.length);
                            e.vip = o,
                            localStorage.setItem("userInfo", n()(e)),
                            t.userInfo = e,
                            t.$store.commit("changUserInfo")
                        }
                    })
                },
                getUserInfoShowLoding: function() {
                    var t = this;
                    t.showLoading(),
                    t.$apiFun.post("/api/user", {}).then(function(a) {
                        if (200 === a.code) {
                            var e = a.data,
                            i = e.current_vip,
                            s = i.indexOf("P"),
                            o = i.substr(s + 1, i.length);
                            e.vip = o,
                            localStorage.setItem("userInfo", n()(e)),
                            t.userInfo = e,
                            t.$store.commit("changUserInfo"),
                            t.hideLoading()
                        }
                    })
                },
                userapimoney: function(code) {
                    var t = this;				
                    t.showLoading(),
                    t.$apiFun.post("api/userapimoney/" + code, {}).then(function(a) {
						if(200 === a.code){
							t.showTost(1, '刷新成功'),
							t.hideLoading()							
						}else{
							t.showTost(0, a.message),
							t.hideLoading()							
						}
                    })
                },				
                getAgentLoginUrl: function() {
                    this.$parent.goNav("/gamePage?dailiD=1")
                },
                openKefu: function() {
                    this.goNav("/kefu")
                },
                showTost: function(t, a) {
                    var e = t ? "success": "danger";
                    this.$notify({
                        type: e,
                        message: a
                    })
                },
                showLoading: function() {
                    this.loading = !0
                },
                hideLoading: function() {
                    this.loading = !1
                }
            },
            mounted: function() {},
            beforeDestroy: function() {
                this.daoTime && clearInterval(this.daoTime),
                this.daoTime = null
            }
        },
        r = {
            render: function() {
                var t = this,
                a = t.$createElement,
                e = t._self._c || a;
                return e("div", {
                    attrs: {
                        id: "app"
                    }
                },
                [1 == t.$store.state.appInfo.site_state ? e("div", [t.loading ? e("div", {
                    staticClass: "meLoading"
                },
                [e("van-loading", {
                    attrs: {
                        size: "24px",
                        vertical: "",
                        color: "#0094ff",
                        "text-color": "#0094ff"
                    }
                },
                [t._v("加载中...")])], 1) : t._e(), t._v(" "), e("keep-alive", [t.$route.meta.keepAlive ? e("router-view", {
                    key: t.$route.name
                }) : t._e()], 1), t._v(" "), t.$route.meta.keepAlive ? t._e() : e("router-view", {
                    key: t.$route.name
                })], 1) : t._e(), t._v(" "), 0 == t.$store.state.appInfo.site_state ? e("div", {
                    staticStyle: {
                        "box-sizing": "border-box",
                        padding: "30px",
                        "fong-size": "26px"
                    }
                },
                [t._v(t._s(t.$store.state.appInfo.repair_tips))]) : t._e()])
            },
            staticRenderFns: []
        };
        var c = e("VU/8")(o, r, !1,
        function(t) {
            e("1IYX")
        },
        null, null).exports,
        l = e("/ocq"),
        d = {
            name: "Header",
            data: function() {
                return {
                    bankShow: !1,
                    show: !0
                }
            },
            created: function() {},
            methods: {
                transall: function() {
                    var t = this;
                    t.$parent.showLoading(),
                    t.$apiFun.post("/api/transall", {}).then(function(a) {
                        t.$parent.showTost(0, a.message),
                        t.$parent.getUserInfoShowLoding(),
                        t.$parent.hideLoading()
                    }).
                    catch(function(a) {
                        t.$parent.hideLoading()
                    })
                },
                changPath: function() {
                    var t = this.$route.path;
                    if (this.bankShow = !1, this.title = "", this.show = !0, console.log(t), "/" == t && (this.bankShow = !1, this.title = ""), "/activity" != t && "/activityInfo" != t && "/mine" != t && "/transfer" != t || (this.show = !1), "/gamePage" == t && (this.bankShow = !1, this.title = ""), "/message" == t && (this.bankShow = !0, this.title = "消息"), "/abouts" == t) {
                        this.bankShow = !0,
                        this.title = "";
                        var a = this.$route.query.type;
                        5 == a && (this.title = "条款与规则"),
                        6 == a && (this.title = "隐私政策")
                    }
                }
            },
            updated: function() {},
            mounted: function() {},
            watch: {
                $route: {
                    immediate: !0,
                    handler: function() {
                        this.changPath()
                    }
                }
            }
        },
        v = {
            render: function() {
                var t = this,
                a = t.$createElement,
                e = t._self._c || a;
                return t.show ? e("div", {
                    staticClass: "header",
                    attrs: {
                        "data-v-8a75a126": "",
                        "data-v-f531b812": ""
                    }
                },
                [t.bankShow ? e("div", {
                    staticClass: "header__top-wrapper",
                    attrs: {
                        "data-v-8a75a126": ""
                    }
                },
                [e("div", {
                    staticClass: "van-nav-bar van-nav-bar--fixed fixed-top rounded-corners nav-header",
                    attrs: {
                        "data-v-8a75a126": ""
                    }
                },
                [e("div", {
                    staticClass: "van-nav-bar__content"
                },
                [e("div", {
                    staticClass: "van-nav-bar__left",
                    on: {
                        click: function(a) {
                            return t.$router.back()
                        }
                    }
                },
                [e("i", {
                    staticClass: "van-icon van-icon-arrow-left van-nav-bar__arrow"
                })]), t._v(" "), e("div", {
                    staticClass: "van-nav-bar__title van-ellipsis"
                },
                [t._v(t._s(t.title))])])])]) : e("div", {
                    staticClass: "header__top-wrapper",
                    attrs: {
                        "data-v-8a75a126": ""
                    }
                },
                [e("div", {
                    staticClass: "van-nav-bar van-nav-bar--fixed rounded-corners nav-header",
                    attrs: {
                        "data-v-8a75a126": ""
                    }
                },
                [e("div", {
                    staticClass: "van-nav-bar__content"
                },
                [e("div", {
                    staticClass: "van-nav-bar__left",
                    on: {
                        click: function(a) {
                            return t.$parent.goNav("/")
                        }
                    }
                },
                [t._m(0)]), t._v(" "), e("div", {
                    staticClass: "van-nav-bar__title van-ellipsis"
                }), t._v(" "), t.$store.state.token ? e("div", {
                    staticClass: "van-nav-bar__right"
                },
                [e("div", {
                    staticClass: "header-style-home"
                },
                [e("div", {
                    staticClass: "header-style-login"
                },
                [e("div", {
                    staticClass: "home-money"
                },
                [e("div", {
                    staticClass: "amount"
                },
                [t._v(t._s(t.$store.state.userInfo.balance))]), t._v(" "), e("svg", {
                    staticClass: "account-amount-refresh svg-icon svg-icon--mini-small svg-icon--refresh svg-icon--icon",
                    staticStyle: {
                        width: "0.56rem",
                        height: "0.56rem"
                    },
                    attrs: {
                        "aria-hidden": "true"
                    },
                    on: {
                        click: function(a) {
                            return t.$parent.getUserInfoShowLoding()
                        }
                    }
                },
                [e("use", {
                    attrs: {
                        "xlink:href": "#icon-refresh"
                    }
                })])]), t._v(" "), e("div", {
                    staticClass: "home-recharge startTheme-green",
                    staticStyle: {
                        background: "url('/static/image/uacPlmEAaMyAHbLrAAA6unmbQqs626.png')",
                        "min-width": "2rem",
                        "background-size": "100% 100% !important",
                        height: "0.66rem",
                        "line-height": "0.66rem"
                    },
                    on: {
                        click: t.transall
                    }
                },
                [t._v("一键回收")])])])]) : e("div", {
                    staticClass: "van-nav-bar__right"
                },
                [e("div", {
                    staticClass: "header-style-home"
                },
                [e("div", {
                    staticClass: "header-style-noLogin"
                },
                [e("div", {
                    staticClass: "home-login",
                    staticStyle: {
                        background: "url('/static/image/uacPlmEAaMyAOg0kAAAgsrNqG9M230.png')"
                    },
                    on: {
                        click: function(a) {
                            return t.$parent.goNav("/login")
                        }
                    }
                },
                [t._v("登录")]), t._v(" "), e("div", {
                    staticClass: "home-register",
                    staticStyle: {
                        background: "url('/static/image/uacPoGJhV7OAGmb4AAA6unmbQqs623.png')"
                    },
                    on: {
                        click: function(a) {
                            return t.$parent.goNav("/login?type=1")
                        }
                    }
                },
                [t._v("注册")])])])])])])])]) : t._e()
            },
            staticRenderFns: [function() {
                var t = this.$createElement,
                a = this._self._c || t;
                return a("div", {
                    staticClass: "home-top-login"
                },
                [a("img", {
                    staticClass: "logo",
                    attrs: {
                        src: "/static/image/uacPoGJlb02AMGnUAAAYLvRuglw960.png",
                        alt: ""
                    }
                })])
            }]
        };
        var p = {
            render: function() {
                var t = this,
                a = t.$createElement,
                e = t._self._c || a;
                return e("van-tabbar", {
                    staticStyle: {
                        "border-top": "1px solid #d5d8e0",
                        "box-sizing": "border-box",
                        "background-color": "rgb(243, 246, 255)",
                        "z-index": "200"
                    },
                    attrs: {
                        "active-color": "#597ef7",
                        "inactive-color": "#000"
                    },
                    on: {
                        change: t.onChange
                    },
                    model: {
                        value: t.type,
                        callback: function(a) {
                            t.type = a
                        },
                        expression: "type"
                    }
                },
                [e("van-tabbar-item", {
                    scopedSlots: t._u([{
                        key: "icon",
                        fn: function(t) {
                            return [e("img", {
                                attrs: {
                                    src: t.active ? "/static/image/tabbar_icon1_select.png": "data:image/png;base64,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"
                                }
                            })]
                        }
                    }])
                },
                [e("span", [t._v("首页")])]), t._v(" "), e("van-tabbar-item", {
                    scopedSlots: t._u([{
                        key: "icon",
                        fn: function(t) {
                            return [e("img", {
                                attrs: {
                                    src: t.active ? "/static/image/tabbar_icon2_select.png": "data:image/png;base64,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"
                                }
                            })]
                        }
                    }])
                },
                [e("span", [t._v("优惠")])]), t._v(" "), e("van-tabbar-item", {
                    scopedSlots: t._u([{
                        key: "icon",
                        fn: function(t) {
                            return [e("img", {
                                attrs: {
                                    src: t.active ? "/static/image/tabbar_icon3_select.png": "data:image/png;base64,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"
                                }
                            })]
                        }
                    }])
                },
                [e("span", [t._v("客服")])]), t._v(" "), e("van-tabbar-item", {
                    scopedSlots: t._u([{
                        key: "icon",
                        fn: function(t) {
                            return [e("img", {
                                attrs: {
                                    src: t.active ? "/static/image/tabbar_icon4_select.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAC9FBMVEVMaXGqqr+1v8+xt8eIf5mouLynrsLg//+yv9Gosr2us8S4vc6jsMOws8i/x9IAAEb0//+zvs+8xNKosL/AxNGwtsl7e6XN0dvCydvS1t/T1t+9wc++xtTHzdfS1+DS1+C9x9vDydjJzdi8yODO0tzR1d64wtqvutK4xdzN0NrByNuyvtvEytmlrsm1w+LS1t/S1+DT1+K7ytu8yNu9xtq+x925xN6z///I0+nHzty7x97Hzt6dpsS5xeCvuNDFzN60vNLR1d7T19/Bzuqdrsyru9m0wNq6x+PDy+Cut8vU2eDN0NzR1+fv7/itvdfs8Pjv7/fi5u6hss7r8PaitdLs7vbC0OnG0uy5wNS2wdrJ0NrP1eW9xNnZ3efN0+TS2uzF0Oals87z9v26yObL1euzweOyv+Gtu9/h5/TCzuTo7PfZ4PGpuNPT3O3v8/yhsM2cq8mywNm2w9u1w+OquN6uvOC3xOXq7/nw9P24xd6/y+jc4vK5xubY3/DH0eewvuH2+P2wvtft8fq7x9/d4/LR2ezN1uqisdnV3O7J0+ifrcqsu9WZqciWpcXf5fOircjAzOLX3u+pt9z3+v6ntdHl6vaXp8a/yuG8yefO1+vX3e7q7/3t8PiWorumscvk6fWuus/Q2OszP1aNnLru8vmPocGrudSGlrVpepy3wNdZZHgjL0H6+/60wtyNn8Cer8vl6/3f5vyxu9be5POsttHJ0eIcJz1AS17k6PDq7fbF0eyGmLmZpr/m6/a4xOPM1OWyvtqmtNva4vvb4e+ls9uCkK6mtdwVIDSToMQnM0m7xdrAzel9kLKdqsd1hqrN1u+LnMCerdd4hZ57i6y0vMmvvNygrtGVo8LU3vvb4fKSnLBqdpR/jKSBkrT9/v7T3PDDzuqhs87Q1N/Q2fK9yeHHzuGutsLAydmrt8tKV3BlcotDUGdIU2pcaYXU2eODjJrh5Oybp7XH2uOKlKELFimksdPZ2+HS5exyf4/R5etSXng6RVkOfUtxAAAAX3RSTlMAAyAZAgkNAQYEDxUGEygBAhAkCz4rAz4zYm8cMDdzjbBXRcNSaU28z0yj8JbuwZhXp1B9bnTtA9NejWn9q/W50YWA44trU/fNPniM/VCAf0Clz99hv5jhy+h48/mx53wMvJ4AAAAJcEhZcwAACxMAAAsTAQCanBgAAAa3SURBVHicvZRVdFtXFoZtyZJlgWPJzBzmhjkpw7QDbYdHksUUi2Uxgy2WJVn2mJndmhnGHGbGhqHcDr7MupKTODSP8z3cu89a5z8bzj47KOj/D3rjjjSQ39qUtj1g/A9++clnVDGX8zFggzht3OLf/OoX6Nfu3pi5hUUfqVCbmcswcXGYT5n1ZucInS5e/sZrBMs5ahqV2iW+mdshkUh8zNyb+C4bFavmtCW9WrCsnsmUMuQOtsVLJsiEXi+bKWdIxUym+TWpvH2zowN3HZt/vq793CjvbHtdXdut69fdHbm/fuX20JD3LV5r23FivvvQN/2lpZ6e+rpR4nGF1Wt5K/QV+5eEgbdZ69otRGrOtdZCgNZr1+jEwfET7XVvISOWvHR+TPhvB9lDQ3hVqyrnKarWCkvD0JDybVjIC05CwyK3Dd5wH7nTmnMw72AewEG/UVhac+QEn7wUFvGcIjQ48vPBGzfqe1S1mlpNbY6qsLBQlZOn0Wg0OQNH2if4q6Kf8xEaAdk5ePiw5G6OSCQS5ZXer2lsbDxd1q/SiESi2u/Yxin+WigsYpEAhnrzsERyRkWn00WqysZjRxqGGq4eayzrr6XT6ZqvThgnBEsjY54lHgPdfFjiK/v7iMdDLx0+VmP1WiwWr7Xu6ukSjcfjybt00shfi4I8FURAwG9KCIRLGirVkzPcYD3KZrMr2Ww229J+dVJEpY70nzo5o3wHGvYkoK3wdAlBduobqs0maqo5WlBQUOCuHQN+BdaaAarNpvn25BRlNwIWEhCEIMErfbLR5lKp1NbPLsgFGGvNwQP/DushulRXceaYkb8KBA0LBBUMBb1HGD3/YwWD4Rlj4/F4vPnQgEplUANmrreWwbj43QMjn/QOChaobBgqWiLjXT6jczoH1Hg3vkh0cAEp3u3usEmdztL/GF3kHWCIP6ZQJHipT0h6cI/BYpWamUy3nfrXBZrsTCYTq2Ox6H0WF3k3Bhrjr1Fk4iYfj1z9FUuvF5nNZnyN+ssv/CjKjtabzdhJvZ7aPOcir42G++sUAQVtJgACvaF4gKNWM4enO78EOF5Wg+9Uq1nyYkNF32k+eW0SCgYItsKj35CRlNV3TURihZbD4bjLyv8GcLyhXM3hcCZZRGJF3zSflPk+AglkHYwGBIK+70sUCoahjcvl4CUXLty6deGCndPG5XLp+fkKest5Ci8zCgwBBDB09GYCSfDvb7twOEMXVywW14+f7bY34UnlwEIxicMZPD+5BMLMKLC/rmHo6E0EEqXxMRVHo+mIWq228vz0lekrDQ3lXK1Wa1PQaPK71XylbG8U2J9DMDw6/V2S4NzsGNbhUFAdRUVN9jJ7d/nwcKW26DbW5HDgKpq/ppAIu6MQMOCqQ6CYjVt4An71P4HDsF00RxG3SVt0m8vVOhx6HY5Gc1JbrEoeYUccAulvJQhoaaZQyZ9u6WHgcDiWzkCj0XA4HPBlSPNxCkPXj48pZMK725PQgX6FgaNW80gUV3XzR6b8/HyiTl6swOEUOCJL519LK/0OlqeHQ4MXeilp5+95Atdc7xWsyUAkEllyne6iVCctARbFUkcfkIF4dUZioJeCYqCYrLRxEmXicu+pHqe+qqq4qliv1+uriourqlgllc3zFLJsdNXOZBQyIAiBgKP+sOqs0jXV3Hu58qIJ+wyWvOfSo/mfyUJCZ1o6Bhq88Ehj4OHrV3aTBTPGr2eby4oY8hJnianEVFLCMN1vnK/+mczzde7LXrjngIvEqIR95WTKjPFEb/WV+/eq5AwGQ87qqbz0oPchhSz01e/5MD080KtPXGTtX2M/S5kxnrzcO//we9oP//jXD2dOPZp97FWShIRu+8r45KdPGnABQ8VtX71ml0vgmjIaTz+a/6mlpWV2tu/hOQGZJyPYdy1LyABFBj8bfaEREHBU/Oo1R7vJAr5rZmJqYm5u7hyfIiCThL5x+65lKSsw8IUJ8HQWg2KzP9xX3j1OIikpAAKlksSTEcSd5WtWpqwIRyEXTUr/7UFBsfEH0vZ0NmlvE4QAMplPUnSoac/vUhOA/YFLXuwDmpi8PiV175Z7d8aqTM6LcifWcKfoT8vXHYjPwKBhixJ4ooiJRIRnxH+QuuG9v3wkt41QJ01/3LZ33f6ErOREOOzF8wGWBMPgoLgV8QkHUlPXbfjzhg3rUvd/kJ0VG46APJfvIkJgEDQoKTZrfXZCSkpKQnb8+oy4cHDkS+EvCiskDAJHYMLjkmNjY2OTkzCJaCjy5eif12yFQSLhKAQCgUBDIciwF4oZFPRfqTHfavm93RwAAAAASUVORK5CYII="
                                }
                            })]
                        }
                    }])
                },
                [e("span", [t._v("赞助")])]), t._v(" "), e("van-tabbar-item", {
                    scopedSlots: t._u([{
                        key: "icon",
                        fn: function(t) {
                            return [e("img", {
                                attrs: {
                                    src: t.active ? "/static/image/tabbar_icon5_select.png": "data:image/png;base64,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"
                                }
                            })]
                        }
                    }])
                },
                [e("span", [t._v("我的")])])], 1)
            },
            staticRenderFns: []
        };
        var u = {
            name: "Main",
            data: function() {
                return {
                    baseURL: ""
                }
            },
            components: {
                Header: e("VU/8")(d, v, !1,
                function(t) {
                    e("+Hhr")
                },
                "data-v-78ba7058", null).exports,
                Foot: e("VU/8")({
                    name: "Foot",
                    data: function() {
                        return {
                            type: 0
                        }
                    },
                    methods: {
                        onChange: function(t) {
                            0 == t && this.$parent.goNav("/"),
                            1 == t && this.$parent.goNav("/activity"),
                            2 == t && this.$parent.openKefu(),
                            3 == t && this.$parent.goNav("/zhanzhu"),
                            4 == t && this.$parent.goNav("/mine")
                        },
                        changPath: function() {
                            var t = this.$route.path;
                            "/" == t && (this.type = 0),
                            "/activity" == t && (this.type = 1),
                            "/kefu" == t && (this.type = 2),
                            "/zhanzhu" == t && (this.type = 3),
                            "/mine" == t && (this.type = 4),
                            "/gamePage" != t && "/hongbao" != t && "/app" != t || (this.type = 5)
                        }
                    },
                    mounted: function() {},
                    watch: {
                        $route: {
                            immediate: !0,
                            handler: function() {
                                this.changPath()
                            }
                        }
                    }
                },
                p, !1,
                function(t) {
                    e("T2s3")
                },
                "data-v-372f0a7a", null).exports
            },
            created: function() {
                this.baseURL = sessionStorage.getItem("baseURL") || ""
            },
            updated: function() {},
            mounted: function() {},
            methods: {
                outLogin: function() {
                    this.$parent.outLogin()
                },
                openDaoTime: function() {
                    this.openDaoTime()
                },
                closeDaoTime: function() {
                    this.$parent.closeDaoTime()
                },
                openGamePage: function(t, a, e) {
                    this.$parent.openGamePage(t, a, e)
                },
                goNav: function(t) {
                    this.$parent.goNav(t)
                },
                getUserInfo: function() {
                    this.$parent.getUserInfo()
                },
                getUserInfoShowLoding: function() {
                    this.$parent.getUserInfoShowLoding()
                },
                doCopy: function(t) {
                    this.$parent.doCopy(t)
                },
                showLoading: function() {
                    this.$parent.showLoading()
                },
                hideLoading: function() {
                    this.$parent.hideLoading()
                },
                openKefu: function() {
                    this.$parent.openKefu()
                },
                getAgentLoginUrl: function() {
                    this.$parent.getAgentLoginUrl()
                },
                showTost: function(t, a) {
                    this.$parent.showTost(t, a)
                },
                getBalance: function() {
                    this.$parent.getBalance()
                }
            },
            beforeDestroy: function() {
                this.daoTime && clearInterval(this.daoTime),
                this.daoTime = null
            }
        },
        f = {
            render: function() {
                var t = this.$createElement,
                a = this._self._c || t;
                return a("div", {
                    staticClass: "app app-ti_green"
                },
                [a("router-view"), this._v(" "), a("Foot")], 1)
            },
            staticRenderFns: []
        };
        var g = e("VU/8")(u, f, !1,
        function(t) {
            e("JGRa")
        },
        "data-v-3627d95b", null).exports,
        h = {
            name: "index",
            data: function() {
                return {
                    hongbashow: !0,
                    appShow: !0,
                    current: 0,
                    bannerList: [],
                    homenoticelis: [],
                    leftshow: !1,
                    activeKey: 0,
                    gameType: 0,
                    tanshow: !0,
                    appshow: !0,
                    goInfo: null
                }
            },
            created: function() {
                this.getBanList(),
                this.homenotice()
            },
            methods: {
                openGogao: function(t) {
                    this.goInfo = t
                },
                changtanshow: function() {
                    this.tanshow = !this.tanshow
                },
                changGameType: function(t) {
                    this.gameType = t
                },
                doCopy: function(t) {
                    var a = document.createElement("input");
                    a.style.opacity = "0",
                    a.value = t,
                    document.body.appendChild(a),
                    a.select(),
                    document.execCommand("copy"),
                    this.$parent.showTost(1, "复制成功！")
                },
                changleftshow: function() {
                    this.leftshow = !this.leftshow
                },
                getBanList: function() {
                    var t = this;
                    t.$parent.showLoading(),
                    t.$apiFun.post("/api/bannerList", {
                        type: 2
                    }).then(function(a) {
                        200 != a.code && t.showTost(0, a.message),
                        200 == a.code && (t.bannerList = a.data),
                        t.$parent.hideLoading()
                    }).
                    catch(function(a) {
                        t.$parent.hideLoading()
                    })
                },
                homenotice: function() {
                    var t = this;
                    t.$apiFun.post("/api/homenotice", {}).then(function(a) {
                        200 != a.code && t.showTost(0, a.message),
                        200 == a.code && (t.homenoticelis = a.data, t.ok = !0)
                    })
                },
                onChange: function(t) {
                    this.current = t
                },
                changhongbashow: function() {
                    this.hongbashow = !1
                },
                changappShow: function() {
                    this.appShow = !1
                }
            },
            mounted: function() {},
            updated: function() {},
            beforeDestroy: function() {}
        },
        _ = {
            render: function() {
                var t = this,
                a = t.$createElement,
                e = t._self._c || a;
                return t.bannerList.length > 0 ? e("div", [1 == t.$store.state.appInfo.redpacket_switch && t.hongbashow ? e("div", {
                    attrs: {
                        id: "redPacket"
                    }
                },
                [e("i", {
                    staticClass: "grab",
                    on: {
                        click: function(a) {
                            return t.$parent.goNav("/hongbao")
                        }
                    }
                }), t._v(" "), e("img", {
                    attrs: {
                        src: "/static/image/hongbaocolse.png"
                    },
                    on: {
                        click: t.changhongbashow
                    }
                })]) : t._e(), t._v(" "), t.appshow ? e("div", {
                    staticClass: "appbox"
                },
                [e("img", {
                    staticClass: "colse",
                    attrs: {
                        src: "/static/image/hongbaocolse.png",
                        alt: ""
                    },
                    on: {
                        click: function(a) {
                            t.appshow = !1
                        }
                    }
                }), t._v(" "), e("img", {
                    staticClass: "logo",
                    attrs: {
                        src: t.$store.state.appInfo.site_logo,
                        onerror: "this.src = '/static/image/app-logo.png'",
                        alt: ""
                    }
                }), t._v(" "), e("div", {
                    staticClass: "testz"
                },
                [e("div", {
                    staticClass: "tit"
                },
                [t._v(t._s(t.$store.state.appInfo.title) + "app")]), t._v(" "), e("div", {
                    staticClass: "cx"
                },
                [t._v("真人娱乐，体育投注，电子游艺等尽在一手掌握")])]), t._v(" "), e("van-button", {
                    attrs: {
                        type: "info",
                        size: "mini"
                    },
                    on: {
                        click: function(a) {
                            return t.$parent.goNav("/app")
                        }
                    }
                },
                [t._v("立即下载")])], 1) : t._e(), t._v(" "), e("div", {
                    staticStyle: {
                        position: "relative"
                    }
                },
                [e("div", {
                    staticClass: "homeHeder"
                },
                [e("img", {
                    staticClass: "leftImg",
                    attrs: {
                        src: "/static/image/logo.png",
                        alt: ""
                    },
                    on: {
                        click: t.changleftshow
                    }
                }), t._v(" "), e("div", {
                    staticClass: "rbox",
                    on: {
                        click: t.$parent.openKefu
                    }
                },
                [e("img", {
                    attrs: {
                        src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAABjUExURUdwTC8yPxaX/zAzQTAzQS8zQTA0QTA0QS8vPy8wPy8yQS8zQQ+f/xWa/y8zQRab/xab/y8zQRac/zAyQi8zQTAzQDAzQhWc/zAzQTA0QjAzQRab/y8zQRab/xaa/zA0Qhec/5YkaVEAAAAfdFJOUwAxIO/fgO+/ECBfrxAxcO/foLpvUE/PU49/z4iQoHBYvRm1AAABtUlEQVR42tVV22KDIAydCgJe62Vtte3k/79yJEUxRdj62PPSFHI5ITH5+gjIkXfCoOSj/If2IJYdRCHj6lO2vIBNKqw/bupsFmyTi5D7q6UxWJ9JUS6I6yEvdYa7jEtyyDHQWR3o400pvfMOafkW6L85Ct1gjFdPwD9LjpNLcsiDnhXgBfTDFiN5IOb4hFjle1KTOehiFYX35TRApqItkJMQBSYVBSecod8wQDyE2P5AxQKKxOnKaTRyqMEI7e+Vn6tBXdmztLZCZQVllO67N3uqt1o/KlDvtT6loA7CBS9NEp2jx9Brqw1uRjqB0BvhBkKLYZnJ2hnM8HvReG0iaURqLfUPdicxYMQg1YiaGAjfoNoo9SCcNkrpC6VuTfpiHPaYNAiY9MPoP5PeFYu7QtegZQX6rAm2nytc807h5OLoRRtc0T6JQhGnDfKLYsJ+8z8PCjqE2E6D/9XgHXB4YwgM3iwb42Nm8b+YOwyS0CDL8FugkPMSSnwA/dkfujmW0oMsA8NYwbEMrKRZhR6OQK377i4PIuPu2eHM1v2Vjcf7LV980JXkV9+HGGIdwwVBB4v9E/ALkrM7Ujx9RygAAAAASUVORK5CYII=",
                        alt: ""
                    }
                }), t._v("\n        \n      ")])]), t._v(" "), e("van-swipe", {
                    on: {
                        change: t.onChange
                    },
                    scopedSlots: t._u([{
                        key: "indicator",
                        fn: function() {
                            return [e("div", {
                                staticClass: "swiper-dots"
                            },
                            [e("div", {
                                staticClass: "num"
                            },
                            [t._v(t._s(t.current + 1))]), t._v(" "), e("div", {
                                staticClass: "sign"
                            },
                            [t._v("/")]), t._v(" "), e("div", {
                                staticClass: "num"
                            },
                            [t._v("4")])])]
                        },
                        proxy: !0
                    }], null, !1, 2667590721)
                },
                t._l(t.bannerList,
                function(t, a) {
                    return e("van-swipe-item", {
                        key: a
                    },
                    [e("img", {
                        staticStyle: {
                            width: "100%"
                        },
                        attrs: {
                            src: t.src,
                            alt: ""
                        }
                    })])
                }), 1)], 1), t._v(" "), t.homenoticelis.length > 0 ? e("div", {
                    staticStyle: {
                        "background-color": "#f4f6ff",
                        padding: "6px 0 0"
                    }
                },
                [e("div", {
                    staticClass: "gonggao"
                },
                [e("img", {
                    staticStyle: {
                        width: "20px"
                    },
                    attrs: {
                        src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAACQUExURUdwTD+v/yGh/y2l/x6g/yOg/x+f/zKn/zCm/y+f/0Ou/zCm/xuc/zeo/zus/x2e/xyd/z2s/0Cu/yuj/ymj/xme/0Ov/z+v/yCd/zWp/0Ou/z+v/0Sw/0Ot/y+l/yWi/zCn/zSp/yqk/yul/yKh/zKo/zqs/yCg/yej/x+f/z6t/y6m/zeq/xue/0Sw/0Gu/486lM4AAAAfdFJOUwAg339g/iBg/hDfb9/a7++QYJ+fx5+AMC/vj0Cv71DVHGkzAAABLklEQVR42s2PiY6CMBRFK4u2oOI2js5WNiltB/j/v5vbFpwUfsATSG7yTu57Ja/INfkY03vytRx/7vq+dzFFYsRndRoMJrIT5ld/zMK9UmpQg1GTof8++vPjvmmUBfO9GpKV335pnuA+pU5sKt4YwntR/IKmwWfqUjKxyx+gAFAgAeKhc0rzB6XFvzUTdD5CH65rJlRVpSut6WThd6c5VqQEkKDB0nQSzuNhd9KW3DlOg6KtkFO7ckdazltIvC2fXXbFj1vBSFxjyK3W8tLi3QgB8JgD66DNFzIhYDgNoGsmrCNDGAghoMVxbIU08i14gZTGMXWE3Dg/s7kSbTshrYU3BHUdrBclb53sJHCFdRaRhXLpDCaygxAyRFjugWBJOylwx3JPdhjjbYv0EvwBbEUvyx5XUUEAAAAASUVORK5CYII=",
                        alt: ""
                    }
                }), t._v(" "), e("div", {
                    staticStyle: {
                        flex: "1"
                    }
                },
                [e("van-notice-bar", {
                    attrs: {
                        color: "#5d75a2",
                        background: "#f4f6ff",
                        scrollable: ""
                    }
                },
                t._l(t.homenoticelis,
                function(a, i) {
                    return e("span", {
                        key: i,
                        on: {
                            click: function(e) {
                                return t.openGogao(a)
                            }
                        }
                    },
                    [t._v(t._s(a))])
                }), 0)], 1), t._v(" "), e("img", {
                    staticStyle: {
                        width: "68px"
                    },
                    attrs: {
                        src: "data:image/png;base64,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",
                        alt: ""
                    },
                    on: {
                        click: function(a) {
                            return t.$parent.goNav("/message")
                        }
                    }
                })])]) : t._e(), t._v(" "), t.goInfo ? e("div", {
                    staticClass: "domainModal_domainView__FWCzg"
                },
                [e("div", {
                    staticClass: "domainModal_mask__24Y2m domainModal_fadeIn__1I3AS false",
                    on: {
                        click: function(a) {
                            t.goInfo = null
                        }
                    }
                }), t._v(" "), e("div", {
                    staticClass: "domainModal_content__1nBgc",
                    staticStyle: {
                        width: "80%"
                    }
                },
                [e("img", {
                    staticStyle: {
                        position: "absolute",
                        top: "5px",
                        right: "13px",
                        width: "0.7rem"
                    },
                    attrs: {
                        src: "/static/image/hongbaocolse.png",
                        alt: ""
                    },
                    on: {
                        click: function(a) {
                            t.goInfo = null
                        }
                    }
                }), t._v(" "), e("div", {
                    staticClass: "domainModal_middle__3gQPm",
                    staticStyle: {
                        padding: "35px 10px 15px"
                    }
                },
                [t._v("\n        " + t._s(t.goInfo) + "\n\n        "), e("van-button", {
                    staticStyle: {
                        margin: "0 auto",
                        "margin-top": "20px",
                        width: "120px",
                        "border-radius": "10px",
                        height: "35px"
                    },
                    attrs: {
                        type: "info"
                    },
                    on: {
                        click: function(a) {
                            return t.$parent.goNav("/message")
                        }
                    }
                },
                [t._v("更多公告")])], 1)])]) : t._e(), t._v(" "), e("div", {
                    staticClass: "xiding"
                },
                [e("div", {
                    staticClass: "caosuo"
                },
                [t.$store.state.token ? e("div", {
                    staticClass: "lefsg"
                },
                [e("div", {
                    staticClass: "name"
                },
                [t._v(t._s(t.$store.state.userInfo.username))]), t._v(" "), e("div", {
                    staticClass: "mey"
                },
                [e("span", [t._v("￥")]), t._v(t._s(t.$store.state.userInfo.balance))])]) : e("div", {
                    staticClass: "lefsg",
                    on: {
                        click: function(a) {
                            return t.$parent.goNav("/login")
                        }
                    }
                },
                [e("div", {
                    staticClass: "name"
                },
                [t._v("您还未登录")]), t._v(" "), e("div", {
                    staticClass: "mey"
                },
                [t._v("登录/注册后查看")])]), t._v(" "), e("div", {
                    staticClass: "riggs"
                },
                [e("div", {
                    staticClass: "lisImg",
                    on: {
                        click: function(a) {
                            return t.$parent.goNav("/recharge")
                        }
                    }
                },
                [e("img", {
                    attrs: {
                        src: "data:image/png;base64,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",
                        alt: ""
                    }
                }), t._v("\n          存款\n        ")]), t._v(" "), e("div", {
                    staticClass: "lisImg",
                    on: {
                        click: function(a) {
                            return t.$parent.goNav("/transfer")
                        }
                    }
                },
                [e("img", {
                    attrs: {
                        src: "data:image/png;base64,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",
                        alt: ""
                    }
                }), t._v("\n          转账\n        ")]), t._v(" "), e("div", {
                    staticClass: "lisImg",
                    on: {
                        click: function(a) {
                            return t.$parent.goNav("/withdrawal")
                        }
                    }
                },
                [e("img", {
                    attrs: {
                        src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAMAAAC5zwKfAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAIfUExURUdwTE+89Ey0+Dtmqkur90vG8jdnsCJq1TGJ2zdnt06u+Enc7zhkpzlipjRru0+PvztnrFCo+02m9U22+UXn7E+k/GDO8jplqj1prVGk+07C8ky2+Ejb70rJ8kiMvCFp1D1srWjY+kjR8SdCcilHeihFdj5qripIfTxmqTdeof///3WW0oyo4X2d1zlipilGeGaEyF58woWj3Hma1Iml3lp3wFZzvQwbNThgpG2NzShEdWKAxU52sDdfo1yEtjhhpShDc4Kg2m2VvoKkxy5TkVJvuzBVlTJZnTJboWqIynGRzzVhqjRfp0Nsq1Sn/YGf2mK5/yxPiixNhitLgi1RjjFXmU6f/WqJynKSzzxorTRepVCj/VJuu0+o/Eub/Dljp0NtrF2v/myMzUev6FTC9Fis/jFYmTNdpF60/5i00EiW/GW9/mC2/pi00UmZ/CVv1mXW+id0106z+lvP92F/xUaT/Eyd/Ebu7CBl01zJ9kjk7z6g41yx/9Pn/1ap/kbq61K97k627EvL9Nbq/1Cr/Dma4ePy/07T82ve/Cl52BNOyjWS3kKm5pm00UvY8pjN/n+9/mWDx0doolh3sld8tDVyny2B2kXb527j/k66+KbT/zJVio7D/nKSzERura/a/0HL1hlazW25/n6d1y1lunmbxEOXzjSCpcXg//X6/2KAuDFekTyGx3HE/kWR/Dikt4C6/VW2+4ik3gAkV0dwTBfC2e8AAAC1dFJOUwAgRX9i/m/+/iDvXu+/nxDv34vK6se/37/v79/XkN+/v3/P/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wC0Ozf+AAAFGElEQVR42u2X6V8aRxjHEcGrxnjkbtNLTRaSSNKTGlFSY1trjbZpVTSoCFEUNbJ4ohYFFK0RjEoMahJjvdpcTf/CPs/Ours6kSDbl35nnnNmfgzsi/2gOOKII+LgeOKZ0xdiJvPjpNSocqlnYlQyiUlGFMmkTJPJ9KR4s7R9tqu9HRz4rtl2rLpwzs62d5ECYulmsYkjM+kgvURcXiyNnc1FIpl4wP1MDMMsfnsoFhkTA7z1jqnpsFJUfEiKGCQ9VUGTAQuVRYfmAoMce8sFm5gmprKysrmyuRkC559U8hkWMKEBOdkDDjx0GAYOMsfpX7AJYOKhAA4W0M/lWElJAYCuCSdXYOBpEhdIjTvFmv7O6foSQI9WgFkB5ODAcKAjuR4MgcCvc2dOU4IGvcGg1+sN+hI9giWpSYN04SxuEMAcOgaYlKBGozEYYOrB8XIa8AguYYrgGonQxRwPaQBaMDYMB/RpwcsyoQS/iMq/YNGhBD+TCSVYVVV1AwAPk0QAAhpPlTChLQziKMErEv6kMqpBQQl+LhNK8JJMKMG6uh956jirgwaOXQeGCHuEvI4UlOA3PC0t4NBIiIp0ByVYW15eXlsLBk6gFisycWDFBX6VGKkpwatx84DzlOD13utR6RV9by8fuRw9NCjBazKhBL+UCSX4lUwowbKyOzDKiN1Bj0AEhwOnsEWE1LBGCQ4ODiYnJ99DnE7n9PTDlJmJ4ftW6/iYbcjV0zP16NFUT49ryGYbGx+3Wu8PD0/MzKQ8nHYmDz579gcQRdAZq2AKCN47UPBrmVCCF4E8GOgRktDQK+QMJZgHahy6vCgcvIUS1AF5uvihBPMFdPlR0BFHQwkWFhqNYIXEsMCI8FFYIQN3k1Y+TKOREoQducbcXDAjCRzYxJpfwym18Os1z8CAZ+11OJcSzD0820sDBBBdeo+6ofjJ5J5iSiAXFDsrax6PJzD00uFwDAXdHs+JhL2C/C9dCFNXiB5TREzFGjZsL3ncQw4Bl9tzYu8l8yQsXuZYgIxEmrDbHXBUS3AE3O49ihdF5m8Q/oaMRIrnS25X9T5c7j3f+rbAyuMrHI9XMMN4m2LN7eoEliefgl/3Tb7EyuX+QCL4/JddFi4R5iEjkWJ7Kdhp77TbtVrtU/v6pFY7arfbO6uD0mcd/plnvoWwABmJNOqgzY74UHESXAirEVtQcsUPf+XRXH2AXGuFDIC4n5vhYGDEMgKzE8VQdITDEggqBcFTN2NnK6C2IKuh5b9QbzIUWucatsB5QfCT8HcxYw28uQuEtBLmsPMm8Kn4V35M8xuhlXfoW3ESh8b31d67yLJUMIQdi1etEDi19X2seL2/I5Ydn88H33kSwjLUgNcrCiace/FDjHi9twR8cDmxAkERlfVFRVtbW319fRsGBAJXCylJxtR+7vj63NwcPOdlCBYiqD6nkJA9nLLxE1ABIypWtb8BWNVK+Ac7fnWOQooqxTm4sVHxTrZsLB7f81BWscPazu/7F56Br3t819Mv+il8zY+Nwzt+YsIWqQEsowA+FAg7t7ATsSmpP/ZJH71bcIaNmGt4RuFyu7k58r4iPlQRtqa/v7EfDAUxAathIypFnOSw5kbCDjwPPvWzcME4SUhjG7o5LL7RGpKZ2bQERdyoWLahQ0p3A8sqFTJQpvnNjX0C3WZ/mkohi4Qss9/c39H36lVfR7/Z789JUMhFlWUWyMLryUeZffJsQ8PZk9lKxRH/H/8B+cQPkc7qCy0AAAAASUVORK5CYII=",
                        alt: ""
                    }
                }), t._v("\n          取款\n        ")]), t._v(" "), e("div", {
                    staticClass: "lisImg",
                    on: {
                        click: function(a) {
                            return t.$parent.goNav("/vip")
                        }
                    }
                },
                [e("img", {
                    attrs: {
                        src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAMAAAC5zwKfAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAJnUExURUdwTDpiqDljpjFTjjhmrjKH2Vaz4Tdnr1HA8yZt1DRZmzhgpTZkr0299Uur9CtMgzVfqk+r+U2x91DC60WEszxnq1La8jVntjhjqTplqSlHfDtmq0+n+0yt9UXn7DRYlyhDdU2z+Tpnq0bp6U2590fX8EnS8UiMvClGeS9QiTJWlCxMgzBSjTVam////y1OhyhDdCpIfCtKfzZdnjJUkYOh20FopzRZmTljp32d10pxrDdfpDViqi9UkjRYlzJanjNcoTFYmjRepYek3jBWlidBcTdeoStLgGC3/ztmq1Z8sUyd/ClFdjRfp1Gj/YCf2W6OzDpkqXma1F2y/mSJty5Sjzhhplqu/lx5wDphojtio0qa/FGn/Vap/keX/MHX9V98wll1vXOZvtDh+WKAxE+g/Wa6/9jl+Yqn3w0eOl+0/lJutnOS0HaU1GmHyWaExzxprEbt7HeX0uv0/k+q+/P3/mS9/j1VmE5pskaT/Efl7U3V8x86ZVVyu4emyFmr/mze/TBGfxUsThElRrLH66a/6l3H9ujw/FG78Ct61kVfqKzW/vf7/z2d4d7p+kyw5+Pt+1rO9kmr5ypz11C2+kvL9FJzq7bN8DaT3jdOjEfc7Jm00VB3saO715Kt306x+Tdzp5ey5Mzb9YSw6IKm59Tq/khrpqC45EKk40tlrECRwRoyWlyAtozE/JSuz2TU903F9Xu/9ELL2Z3K9TmCpWOa4x5g0I+/7Cdmv0hiqWLI5yBdvCNWiHCv6j6dx22z/oSavziEx0JboH/K8yJVqithizBtkUB/2nKOs2+o5xVHpilXckdwTKiX9LcAAADNdFJOUwBI3591/v4g/v6fn7sgYp8w70XGEM9pn1+Pn9/XjOf+n9/vSKjP59//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////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",
                        alt: ""
                    }
                }), t._v("\n          VIP\n        ")])])])]), t._v(" "), e("div", {
                    staticClass: "gameBoxs"
                },
                [e("div", {
                    staticClass: "lfst"
                },
                [e("div", {
                    class: 0 == t.gameType ? "ls active": "ls",
                    on: {
                        click: function(a) {
                            return t.changGameType(0)
                        }
                    }
                },
                [e("img", {
                    attrs: {
                        src: "/static/style/" + (0 == t.gameType ? "sidebar_casino_icon_select": "sidebar_casino_icon_nor") + ".png",
                        alt: ""
                    }
                }), t._v(" "), e("span", [t._v("真人")])]), t._v(" "), e("div", {
                    class: 1 == t.gameType ? "ls active": "ls",
                    on: {
                        click: function(a) {
                            return t.changGameType(1)
                        }
                    }
                },
                [e("img", {
                    attrs: {
                        src: "/static/style/" + (1 == t.gameType ? "sidebar_sports_icon_select": "sidebar_sports_icon_nor") + ".png",
                        alt: ""
                    }
                }), t._v(" "), e("span", [t._v("体育")])]), t._v(" "), e("div", {
                    class: 2 == t.gameType ? "ls active": "ls",
                    on: {
                        click: function(a) {
                            return t.changGameType(2)
                        }
                    }
                },
                [e("img", {
                    attrs: {
                        src: "/static/style/" + (2 == t.gameType ? "sidebar_esports_icon_select": "sidebar_esports_icon_nor") + ".png",
                        alt: ""
                    }
                }), t._v(" "), e("span", [t._v("电竞")])]), t._v(" "), e("div", {
                    class: 3 == t.gameType ? "ls active": "ls",
                    on: {
                        click: function(a) {
                            return t.changGameType(3)
                        }
                    }
                },
                [e("img", {
                    attrs: {
                        src: "/static/style/" + (3 == t.gameType ? "sidebar_board_icon_select": "sidebar_board_icon_nor") + ".png",
                        alt: ""
                    }
                }), t._v(" "), e("span", [t._v("棋牌")])]), t._v(" "), e("div", {
                    class: 4 == t.gameType ? "ls active": "ls",
                    on: {
                        click: function(a) {
                            return t.changGameType(4)
                        }
                    }
                },
                [e("img", {
                    attrs: {
                        src: "/static/style/" + (4 == t.gameType ? "sidebar_slot_icon_select": "sidebar_slot_icon_nor") + ".png",
                        alt: ""
                    }
                }), t._v(" "), e("span", [t._v("电子")])]), t._v(" "), e("div", {
                    class: 5 == t.gameType ? "ls active": "ls",
                    on: {
                        click: function(a) {
                            return t.changGameType(5)
                        }
                    }
                },
                [e("img", {
                    attrs: {
                        src: "/static/style/" + (5 == t.gameType ? "sidebar_lottery_icon_select": "sidebar_lottery_icon_nor") + ".png",
                        alt: ""
                    }
                }), t._v(" "), e("span", [t._v("彩票")])])]), t._v(" "), 0 == t.gameType ? e("div", {
                    staticClass: "rigts"
                },
                t._l(t.$store.state.realbetList,
                function(a, i) {
                    return e("img", {
                        key: i,
                        attrs: {
                            src: a.mobile_img,
                            alt: ""
                        },
                        on: {
                            click: function(e) {
                                return t.$parent.openGamePage(a.platform_name, a.game_code, a.category_id)
                            }
                        }
                    })
                }), 0) : t._e(), t._v(" "), 1 == t.gameType ? e("div", {
                    staticClass: "rigts"
                },
                t._l(t.$store.state.sportList,
                function(a, i) {
                    return e("img", {
                        key: i,
                        attrs: {
                            src: a.mobile_img,
                            alt: ""
                        },
                        on: {
                            click: function(e) {
                                return t.$parent.openGamePage(a.platform_name, a.game_code, a.category_id)
                            }
                        }
                    })
                }), 0) : t._e(), t._v(" "), 2 == t.gameType ? e("div", {
                    staticClass: "rigts"
                },
                t._l(t.$store.state.gamingList,
                function(a, i) {
                    return e("img", {
                        key: i,
                        attrs: {
                            src: a.mobile_img,
                            alt: ""
                        },
                        on: {
                            click: function(e) {
                                return t.$parent.openGamePage(a.platform_name, a.game_code, a.category_id)
                            }
                        }
                    })
                }), 0) : t._e(), t._v(" "), 3 == t.gameType ? e("div", {
                    staticClass: "rigts"
                },
                t._l(t.$store.state.jokerList,
                function(a, i) {
                    return e("img", {
                        key: i,
                        attrs: {
                            src: a.mobile_img,
                            alt: ""
                        },
                        on: {
                            click: function(e) {
                                return t.$parent.openGamePage(a.platform_name, a.game_code, a.category_id)
                            }
                        }
                    })
                }), 0) : t._e(), t._v(" "), 4 == t.gameType ? e("div", {
                    staticClass: "rigts"
                },
                [t._l(t.$store.state.conciseList,
                function(a, i) {
                    return e("img", {
                        key: i,
                        attrs: {
                            src: a.mobile_img,
                            alt: ""
                        },
                        on: {
                            click: function(e) {
                                return t.$parent.openGamePage(a.platform_name, a.game_code, a.category_id)
                            }
                        }
                    })
                })], 2) : t._e(), t._v(" "), 5 == t.gameType ? e("div", {
                    staticClass: "rigts"
                },
                t._l(t.$store.state.lotteryList,
                function(a, i) {
                    return e("img", {
                        key: i,
                        style: "VR" == a.platform_name ? "width:100%": "",
                        attrs: {
                            src: a.mobile_img,
                            alt: ""
                        },
                        on: {
                            click: function(e) {
                                return t.$parent.openGamePage(a.platform_name, a.game_code, a.category_id)
                            }
                        }
                    })
                }), 0) : t._e()]), t._v(" "), e("van-popup", {
                    style: {
                        height: "100%"
                    },
                    attrs: {
                        position: "left"
                    },
                    model: {
                        value: t.leftshow,
                        callback: function(a) {
                            t.leftshow = a
                        },
                        expression: "leftshow"
                    }
                },
                [e("div", {
                    staticClass: "leftbox"
                },
                [e("div", {
                    staticClass: "side__main__1NhyG"
                },
                [e("h3", [t._v("Hi，欢迎进入" + t._s(t.$store.state.appInfo.title))]), t._v(" "), e("dl", {
                    staticClass: "side__vip__1dW8w"
                },
                [e("div", {
                    staticClass: "topxs"
                },
                [t._v("专属VIP体验")]), t._v(" "), e("p", [t._v("立享会员特权")]), t._v(" "), e("p", [t._v("享受只属于你的与众不同")]), t._v(" "), e("dd", {
                    on: {
                        click: function(a) {
                            return t.$parent.goNav("/vip")
                        }
                    }
                },
                [t._v("会员中心")])]), t._v(" "), e("ul", [t.$store.state.token ? e("li", {
                    on: {
                        click: function(a) {
                            return t.$parent.goNav("/message")
                        }
                    }
                },
                [e("img", {
                    attrs: {
                        src: "/static/image/meunIcon.39f38dc98ad956615952d485d0e6af04.svg"
                    }
                }), t._v("消息中心"), e("span", {
                    staticClass: "side__subtitle__3QtYC"
                })]) : t._e(), t._v(" "), e("li", {
                    on: {
                        click: t.$parent.openKefu
                    }
                },
                [e("img", {
                    attrs: {
                        src: "/static/image/meunIcon2.5d0d78496889fb8b027f603254286fdf.svg"
                    }
                }), t._v("意见反馈"), e("span", {
                    staticClass: "side__subtitle__3QtYC"
                })]), t._v(" "), e("li", {
                    on: {
                        click: function(a) {
                            return t.doCopy(t.$store.state.appInfo.h5_url)
                        }
                    }
                },
                [e("img", {
                    attrs: {
                        src: "/static/image/menuIcon5.5687ef4d1512d53aa3535e3b1088fe70.png"
                    }
                }), t._v("永久域名"), e("span", {
                    staticClass: "side__subtitle__3QtYC"
                },
                [t._v(t._s(t.$store.state.appInfo.h5_url))])]), t._v(" "), e("li", {
                    on: {
                        click: function(a) {
                            return t.$parent.goNav("/abouts")
                        }
                    }
                },
                [e("img", {
                    attrs: {
                        src: "/static/image/meunIcon3.c51bbb9ebece978f1976397ab12acba7.svg"
                    }
                }), t._v("关于我们"), e("span", {
                    staticClass: "side__subtitle__3QtYC"
                })])]), t._v(" "), t.$store.state.token ? e("div", {
                    staticClass: "nisd",
                    on: {
                        click: t.$parent.outLogin
                    }
                },
                [e("img", {
                    attrs: {
                        src: "/static/image/tuichu.93c1b9e3d4b4a7772481916ca32c074f.svg"
                    }
                }), t._v("安全退出")]) : e("div", {
                    staticClass: "nisd",
                    on: {
                        click: function(a) {
                            return t.$parent.goNav("/login")
                        }
                    }
                },
                [t._v("立即登录")])])])]), t._v(" "), 1 == t.$store.state.appInfo.index_modal && t.tanshow ? e("div", {
                    staticClass: "domainModal_domainView__FWCzg"
                },
                [e("div", {
                    staticClass: "domainModal_mask__24Y2m domainModal_fadeIn__1I3AS false",
                    on: {
                        click: t.changtanshow
                    }
                }), t._v(" "), e("div", {
                    staticClass: "domainModal_content__1nBgc",
                    staticStyle: {
                        width: "80%"
                    }
                },
                [e("div", {
                    staticClass: "domainModal_contentTop__2C4jc",
                    attrs: {
                        id: "domain"
                    }
                },
                [e("img", {
                    staticStyle: {
                        position: "absolute",
                        top: "5px",
                        right: "13px",
                        width: "0.6rem"
                    },
                    attrs: {
                        src: "/static/image/hongbaocolse.png",
                        alt: ""
                    },
                    on: {
                        click: t.changtanshow
                    }
                }), t._v(" "), e("div", {
                    staticClass: "domainModal_top__1omYS"
                },
                [t._v("欢迎来到" + t._s(t.$store.state.appInfo.title))]), t._v(" "), e("div", {
                    staticClass: "domainModal_middle__3gQPm",
                    domProps: {
                        innerHTML: t._s(t.$store.state.appInfo.webcontent)
                    }
                })])])]) : t._e()], 1) : t._e()
            },
            staticRenderFns: []
        };
        var m = e("VU/8")(h, _, !1,
        function(t) {
            e("lk9I")
        },
        "data-v-0d4d2b4d", null).exports,
        b = {
            name: "app",
            data: function() {
                return {}
            },
            created: function() {},
            methods: {
                downloadUrl: function(t) {
                    var a = this;
                    this.$parent.showLoading();
                    var e = document.createElement("iframe");
                    e.src = t,
                    e.style.display = "none",
                    e.style.height = 0,
                    document.body.appendChild(e),
                    setTimeout(function() {
                        a.$parent.hideLoading(),
                        document.body.removeChild(e)
                    },
                    2e3)
                }
            },
            mounted: function() {},
            updated: function() {},
            beforeDestroy: function() {}
        },
        y = {
            render: function() {
                var t = this,
                a = t.$createElement,
                e = t._self._c || a;
                return e("div", [e("div", {
                    staticStyle: {
                        "font-size": "0.5rem",
                        height: "1.3rem",
                        display: "flex",
                        "align-items": "center",
                        "justify-content": "center",
                        "font-weight": "700",
                        color: "#0620dc"
                    }
                },
                [t._v(t._s(t.$store.state.appInfo.title) + "app下载")]), t._v(" "), e("img", {
                    staticStyle: {
                        width: "100%",
                        "margin-top": "20px"
                    },
                    attrs: {
                        src: "/static/image/sports_and_2_title-eb044a43aca57221f5bdc248cbb1356d.png",
                        alt: ""
                    }
                }), t._v(" "), e("van-swipe", {
                    staticClass: "my-swipe",
                    attrs: {
                        autoplay: 3e3,
                        "indicator-color": "white"
                    }
                },
                [e("van-swipe-item", [e("img", {
                    staticStyle: {
                        width: "100%"
                    },
                    attrs: {
                        src: "/static/image/sports_8.png",
                        alt: ""
                    }
                })]), t._v(" "), e("van-swipe-item", [e("img", {
                    staticStyle: {
                        width: "100%"
                    },
                    attrs: {
                        src: "/static/image/sports_71.png",
                        alt: ""
                    }
                })]), t._v(" "), e("van-swipe-item", [e("img", {
                    staticStyle: {
                        width: "100%"
                    },
                    attrs: {
                        src: "/static/image/sports_aa.png",
                        alt: ""
                    }
                })]), t._v(" "), e("van-swipe-item", [e("img", {
                    staticStyle: {
                        width: "100%"
                    },
                    attrs: {
                        src: "/static/image/sports_and4.png",
                        alt: ""
                    }
                })])], 1), t._v(" "), e("img", {
                    staticStyle: {
                        width: "100%",
                        "margin-top": "20px"
                    },
                    attrs: {
                        src: "/static/image/sports_and_1_icon-c53b51a31998cee56a723ab1dcaa4f91.png",
                        alt: ""
                    }
                }), t._v(" "), e("div", {
                    staticStyle: {
                        width: "90%",
                        margin: "0 auto",
                        color: "#ccc",
                        "text-align": "center",
                        "margin-top": "20px"
                    }
                },
                [t._v("可扫描下发二维码进行app下载")]), t._v(" "), e("img", {
                    staticStyle: {
                        width: "70%",
                        margin: "0 auto",
                        display: "block"
                    },
                    attrs: {
                        src: t.$store.state.appInfo.ios_download_qrcode,
                        onerror: "this.src = '/static/image/appurl.jpg'",
                        alt: ""
                    }
                }), t._v(" "), e("van-button", {
                    staticStyle: {
                        width: "90%",
                        margin: "0 auto",
                        "margin-top": "30px",
                        display: "block"
                    },
                    attrs: {
                        type: "info"
                    },
                    on: {
                        click: function(a) {
                            return t.$parent.goNav("/gamePage?app=1")
                        }
                    }
                },
                [t._v("立即下载")]), t._v(" "), e("div", {
                    staticStyle: {
                        width: "90%",
                        margin: "10px auto",
                        color: "#ccc"
                    }
                },
                [t._v("需在同一网络环境下下载安装注册，请勿切换网络； 若无法正常安装，请使用手机自带浏览器打开本页面")]), t._v(" "), e("iframe", {
                    ref: "iframe",
                    staticStyle: {
                        height: "100px",
                        opacity: "0"
                    },
                    attrs: {
                        scrolling: "auto",
                        frameborder: "0",
                        id: "iframe"
                    }
                })], 1)
            },
            staticRenderFns: []
        };
        var w = e("VU/8")(b, y, !1,
        function(t) {
            e("vnBx")
        },
        "data-v-4a6b47ee", null).exports,
        C = {
            render: function() {
                var t = this.$createElement,
                a = this._self._c || t;
                return a("div", [this.url ? a("div", {
                    staticStyle: {
                        height: "calc(100vh - 50px)",
                        "overflow-y": "scroll",
                        "-webkit-overflow-scrolling": "touch"
                    }
                },
                [a("iframe", {
                    ref: "iframe",
                    staticStyle: {
                        height: "calc(100% - 1.5rem)",
                        width: "100%"
                    },
                    attrs: {
                        scrolling: "auto",
                        frameborder: "0",
                        id: "iframe"
                    }
                })]) : this._e()])
            },
            staticRenderFns: []
        };
        var k = e("VU/8")({
            name: "kefu",
            data: function() {
                return {
                    url: null
                }
            },
            created: function() {
                this.getservicerurl()
            },
            methods: {
                getservicerurl: function() {
                    var t = this;
                    t.$apiFun.post("/api/getservicerurl", {}).then(function(a) {
                        200 != a.code && t.showTost(0, a.message),
                        200 == a.code && (t.url = a.data.url)
                    })
                }
            },
            mounted: function() {},
            updated: function() {
                this.$refs.iframe.contentWindow.location.replace(this.url)
            }
        },
        C, !1,
        function(t) {
            e("xv8h")
        },
        "data-v-1b0c5558", null).exports,
        x = {
            name: "gamePage",
            data: function() {
                return {
                    url: null,
                    type: null
                }
            },
            created: function() {
                var t = this.$route.query;
                if (console.log(t), 1 != t.dailiD) {
                    if (2 != t.dailiD) return 1 == t.app ? (this.type = "app", void(this.url = this.$store.state.appInfo.ios_download_url)) : void(t.name && this.goGamePage(t.name, t.type, t.code));
                    this.getservicerurl()
                } else this.getAgentLoginUrl()
            },
            methods: {
                getservicerurl: function() {
                    var t = this;
                    t.$apiFun.post("/api/getservicerurl", {}).then(function(a) {
                        200 != a.code && t.showTost(0, a.message),
                        200 == a.code && (t.url = a.data.url)
                    })
                },
                getAgentLoginUrl: function() {
                    var t = this;
                    t.$apiFun.get("/api/getAgentLoginUrl", {}).then(function(a) {
                        200 != a.code && t.showTost(0, a.message),
                        200 == a.code && (t.url = a.data.url)
                    })
                },
                goGamePage: function(t, a, e) {
                    var i = this;
					i.$parent.showLoading(),
                    i.$apiFun.post("/api/getGameUrl", {
                        plat_name: t,
                        game_type: a || 0,
                        game_code: e,
                        is_mobile_url: 1
                    }).then(function(t) {
                        i.$parent.hideLoading(),
                        200 != t.code && (i.$parent.showTost(0, t.message),window.history.go(-1)),
                        /*200 == t.code && (i.url = t.data.url)*/
						200 == t.code && (i.$parent.showTost(1, '正在进入游戏,请稍后'),window.history.go(-1),window.location.href=t.data.url)																	
                    }).
                    catch(function(t) {})
                }
            },
            mounted: function() {},
            updated: function() {
                this.$refs.iframe.contentWindow.location.replace(this.url)
            }
        },
        $ = {
            render: function() {
                var t = this,
                a = t.$createElement,
                e = t._self._c || a;
                return e("div", [e("van-nav-bar", {
                    staticStyle: {
                        position: "fixed",
                        top: "0",
                        left: "0",
                        width: "100%",
                        "background-color": "#edf2fd"
                    },
                    attrs: {
                        title: "",
                        "left-arrow": ""
                    },
                    on: {
                        "click-left": function(a) {
                            return t.$router.back()
                        }
                    }
                }), t._v(" "), e("div", {
                    staticStyle: {
                        height: "46px"
                    }
                }), t._v(" "), t.url ? e("div", {
                    staticStyle: {
                        height: "calc(100vh - 46px)",
                        "overflow-y": "scroll",
                        "-webkit-overflow-scrolling": "touch"
                    }
                },
                [t.type ? e("iframe", {
                    ref: "iframe",
                    staticStyle: {
                        height: "100%",
                        width: "100%"
                    },
                    attrs: {
                        src: t.url,
                        scrolling: "auto",
                        frameborder: "0",
                        id: "iframe"
                    }
                }) : e("iframe", {
                    ref: "iframe",
                    staticStyle: {
                        height: "100%",
                        width: "100%"
                    },
                    attrs: {
                        scrolling: "auto",
                        frameborder: "0",
                        id: "iframe"
                    }
                })]) : t._e()], 1)
            },
            staticRenderFns: []
        };
        var S = e("VU/8")(x, $, !1,
        function(t) {
            e("O3QM")
        },
        "data-v-0aa7e2fa", null).exports,
        I = {
            name: "hongbao",
            data: function() {
                return {
                    show: !1,
                    redpacketList: [],
                    page: 1,
                    redpacketShowData: {},
                    userredpacket: {
                        rules: []
                    },
                    weikaishi: !1,
                    end: !1,
                    mey: 0,
                    zhongjiang: !1,
                    henbaoqian: !1,
                    message: ""
                }
            },
            created: function() {
                this.getuserredpacket()
            },
            methods: {
                closeAll: function() {
                    this.show = !1,
                    this.weikaishi = !1,
                    this.end = !1,
                    this.zhongjiang = !1,
                    this.henbaoqian = !1,
                    this.message = ""
                },
                changShow: function() {
                    if (this.userredpacket.sendnums <= 0) return this.henbaoqian = !0,
                    void(this.message = "您暂未达到领取条件，快去完成吧！");
                    this.getwelfare()
                },
                getwelfare: function() {
                    var t = this;
                    t.$parent.showLoading(),
                    t.$apiFun.post("/api/douserredpacket", {}).then(function(a) {
                        console.log(a),
                        200 == a.code ? (t.mey = a.data.redpacketmoney, t.getuserredpacket(), t.zhongjiang = !0) : (t.henbaoqian = !0, t.message = a.message),
                        t.$parent.hideLoading()
                    }).
                    catch(function() {
                        t.$parent.showTost(0, "服务器异常，请稍后再试"),
                        t.$parent.hideLoading()
                    })
                },
                getuserredpacket: function() {
                    var t = this;
                    t.$parent.showLoading(),
                    t.$apiFun.get("/api/userredpacket", {}).then(function(a) {
                        console.log(a),
                        200 != a.code && t.$parent.showTost(0, a.message),
                        200 == a.code && (t.userredpacket = a.data),
                        t.$parent.hideLoading()
                    })
                }
            },
            mounted: function() {},
            updated: function() {}
        },
        L = {
            render: function() {
                var t = this,
                a = t.$createElement,
                e = t._self._c || a;
                return e("div", {
                    staticClass: "bisd",
                    staticStyle: {
                        background: "url(/static/image/bg123456.jpg) top center no-repeat !important",
                        width: "100%"
                    }
                },
                [e("input", {
                    attrs: {
                        type: "hidden",
                        id: "startDate",
                        value: "2022-06-18"
                    }
                }), t._v(" "), e("input", {
                    attrs: {
                        type: "hidden",
                        id: "endDate",
                        value: "2022-06-18"
                    }
                }), t._v(" "), e("input", {
                    attrs: {
                        type: "hidden",
                        id: "startTime",
                        value: "14:00:00"
                    }
                }), t._v(" "), e("input", {
                    attrs: {
                        type: "hidden",
                        id: "endTime",
                        value: "15:59:59"
                    }
                }), t._v(" "), e("input", {
                    attrs: {
                        type: "hidden",
                        id: "currentDateTime",
                        value: "2022-06-18 16:13:44"
                    }
                }), t._v(" "), e("input", {
                    attrs: {
                        type: "hidden",
                        id: "redPacketStatus",
                        value: "END"
                    }
                }), t._v(" "), e("input", {
                    attrs: {
                        type: "hidden",
                        id: "activityTimeId",
                        value: ""
                    }
                }), t._v(" "), e("input", {
                    attrs: {
                        type: "hidden",
                        id: "memberType",
                        value: "0"
                    }
                }), t._v(" "), e("input", {
                    attrs: {
                        type: "hidden",
                        id: "amount1",
                        value: "0"
                    }
                }), t._v(" "), e("input", {
                    attrs: {
                        type: "hidden",
                        id: "amount2",
                        value: "00"
                    }
                }), t._v(" "), e("input", {
                    attrs: {
                        type: "hidden",
                        id: "isLocal",
                        value: "0"
                    }
                }), t._v(" "), e("input", {
                    attrs: {
                        type: "hidden",
                        id: "isWindow",
                        value: "0"
                    }
                }), t._v(" "), e("input", {
                    attrs: {
                        type: "hidden",
                        id: "windowHeight",
                        value: ""
                    }
                }), t._v(" "), e("input", {
                    attrs: {
                        type: "hidden",
                        id: "windowWidth",
                        value: ""
                    }
                }), t._v(" "), e("div", {
                    staticClass: "redEnveBody"
                },
                [e("div", {
                    staticClass: "redEnveBodyToo"
                },
                [e("div", {
                    staticClass: "redEnveBodyMain center"
                },
                [t._m(0), t._v(" "), t._m(1), t._v(" "), e("div", {
                    staticClass: "toddyTotal"
                }), t._v(" "), t._e(), t._v(" "), e("div", {
                    staticClass: "receiveTimes"
                },
                [e("p", {
                    staticStyle: {
                        "text-align": "center"
                    }
                },
                [t._v("\n              剩余领取次数 "), e("span", {
                    staticClass: "yellow",
                    attrs: {
                        id: "remainNum"
                    }
                },
                [t._v(t._s(t.userredpacket.sendnums < 0 ? 0 : t.userredpacket.sendnums))]), t._v(" 次，已领取 "), e("span", {
                    staticClass: "yellow",
                    attrs: {
                        id: "currentNum"
                    }
                },
                [t._v(t._s(t.userredpacket.acquirednum))]), t._v(" 次\n            ")])]), t._v(" "), e("div", {
                    staticClass: "currReceiveTimes"
                },
                [e("p", {
                    staticStyle: {
                        "text-align": "center"
                    }
                },
                [t._v("\n              当前最多可领取 "), e("span", {
                    staticClass: "yellow3"
                },
                [t._v(t._s(t.userredpacket.max_times))]), t._v(" 次， "), e("span", {
                    attrs: {
                        id: "maxMsg"
                    }
                },
                [t._v("\n                快去满足条件吧！ ")])])]), t._v(" "), e("div", {
                    staticClass: "redEnveButtons",
                    on: {
                        click: t.changShow
                    }
                }), t._v(" "), e("div", {
                    staticClass: "activityInfo"
                },
                [e("div", {
                    staticClass: "activityTop wow zoomIn",
                    staticStyle: {
                        visibility: "visible",
                        "animation-name": "zoomIn"
                    }
                }), t._v(" "), t.userredpacket.rules.length > 0 ? e("table", {
                    staticStyle: {
                        "font-size": "8px !important"
                    },
                    attrs: {
                        id: "activityTable"
                    }
                },
                [e("tbody", [t._m(7), t._v(" "), t._l(t.userredpacket.rules,
                function(a, i) {
                    return e("tr", {
                        key: i
                    },
                    [e("td", [t._v(t._s(a.start_time) + " ~ " + t._s(a.end_time))]), t._v(" "), e("td", [t._v(t._s(a.day_flow) + "-" + t._s(a.flow_money))]), t._v(" "), e("td", [t._v(t._s(Math.floor(a.recharge)))])])
                })], 2)]) : t._e(), t._v(" "), t._m(8)]), t._v(" "), e("div", {
                    staticClass: "h400"
                }), t._v(" "), t._m(9)])]), t._v(" "), t._m(10), t._v(" "), t._m(11)]), t._v(" "), t._e(), t._v(" "), t.weikaishi ? e("div", {
                    staticClass: "weikaishi divIndex"
                },
                [e("p", {
                    staticStyle: {
                        "margin-top": "66px",
                        "font-size": "16px"
                    }
                },
                [t._v("活动还没开始，请静待活动开始。")]), t._v(" "), e("a", {
                    staticClass: "close",
                    attrs: {
                        href: "javascript:;"
                    },
                    on: {
                        click: t.closeAll
                    }
                })]) : t._e(), t._v(" "), t.end ? e("div", {
                    staticClass: "qiangwan divIndex"
                },
                [e("p", {
                    staticStyle: {
                        "margin-top": "66px",
                        "font-size": "18px"
                    }
                },
                [t._v("请静待下次活动。")]), t._v(" "), e("a", {
                    staticClass: "close",
                    attrs: {
                        href: "javascript:;"
                    },
                    on: {
                        click: t.closeAll
                    }
                })]) : t._e(), t._v(" "), t.zhongjiang ? e("div", {
                    staticClass: "zhongjiang divIndex"
                },
                [e("p", [t._v("恭喜您")]), t._v(" "), e("p", [t._v("\n        抢到"), e("span", {
                    staticClass: "yellow bigFont",
                    attrs: {
                        id: "redPacketAmount"
                    }
                },
                [t._v(t._s(t.mey))]), t._v("元\n      ")]), t._v(" "), e("a", {
                    staticClass: "close",
                    attrs: {
                        href: "javascript:;"
                    },
                    on: {
                        click: t.closeAll
                    }
                })]) : t._e(), t._v(" "), t.henbaoqian ? e("div", {
                    staticClass: "henbaoqian divIndex"
                },
                [e("p", {
                    attrs: {
                        id: "henbaoqian"
                    }
                },
                [t._v(t._s(t.message))]), t._v(" "), e("div", {
                    staticClass: "rules",
                    attrs: {
                        id: "viewRules"
                    },
                    on: {
                        click: function(a) {
                            return t.$parent.goNav("/wallet?type=0")
                        }
                    }
                },
                [t._v("立即充值")]), t._v(" "), e("a", {
                    staticClass: "close",
                    attrs: {
                        href: "javascript:;"
                    },
                    on: {
                        click: t.closeAll
                    }
                })]) : t._e()])
            },
            staticRenderFns: [function() {
                var t = this.$createElement,
                a = this._self._c || t;
                return a("div", {
                    staticClass: "redEnveBodyTop"
                },
                [a("div", {
                    staticClass: "pen",
                    staticStyle: {
                        "z-index": "200"
                    }
                },
                [a("img", {
                    attrs: {
                        src: "/static/image/pen.png"
                    }
                })])])
            },
            function() {
                var t = this.$createElement,
                a = this._self._c || t;
                return a("div", {
                    staticClass: "redEnveFont"
                },
                [a("img", {
                    attrs: {
                        alt: "",
                        src: "/static/image/qianghb.png"
                    }
                })])
            },
            function() {
                var t = this,
                a = t.$createElement,
                e = t._self._c || a;
                return e("div", {
                    staticStyle: {
                        display: "none"
                    },
                    attrs: {
                        id: "ready"
                    }
                },
                [e("div", {
                    staticClass: "wow zoomInLeft animated",
                    staticStyle: {
                        visibility: "visible",
                        "animation-duration": "0.35s",
                        "animation-delay": "0.35s",
                        "animation-name": "zoomInLeft"
                    },
                    attrs: {
                        "data-wow-duration": "0.35s",
                        "data-wow-delay": "0.35s"
                    }
                },
                [t._v("\n                    始")]), t._v(" "), e("div", {
                    staticClass: "wow zoomInLeft animated",
                    staticStyle: {
                        visibility: "visible",
                        "animation-duration": "0.3s",
                        "animation-delay": "0.3s",
                        "animation-name": "zoomInLeft"
                    },
                    attrs: {
                        "data-wow-duration": "0.30s",
                        "data-wow-delay": "0.30s"
                    }
                },
                [t._v("\n                    开")]), t._v(" "), e("div", {
                    staticClass: "wow zoomInLeft animated",
                    staticStyle: {
                        visibility: "visible",
                        "animation-duration": "0.25s",
                        "animation-delay": "0.25s",
                        "animation-name": "zoomInLeft"
                    },
                    attrs: {
                        "data-wow-duration": "0.25s",
                        "data-wow-delay": "0.25s"
                    }
                },
                [t._v("\n                    包")]), t._v(" "), e("div", {
                    staticClass: "wow zoomInLeft animated",
                    staticStyle: {
                        visibility: "visible",
                        "animation-duration": "0.2s",
                        "animation-delay": "0.2s",
                        "animation-name": "zoomInLeft"
                    },
                    attrs: {
                        "data-wow-duration": "0.20s",
                        "data-wow-delay": "0.20s"
                    }
                },
                [t._v("\n                    红")]), t._v(" "), e("div", {
                    staticClass: "wow zoomInLeft animated",
                    staticStyle: {
                        visibility: "visible",
                        "animation-duration": "0.15s",
                        "animation-delay": "0.15s",
                        "animation-name": "zoomInLeft"
                    },
                    attrs: {
                        "data-wow-duration": "0.15s",
                        "data-wow-delay": "0.15s"
                    }
                },
                [t._v("\n                    离")]), t._v(" "), e("div", {
                    staticClass: "wow zoomInLeft animated",
                    staticStyle: {
                        visibility: "visible",
                        "animation-duration": "0.1s",
                        "animation-delay": "0.1s",
                        "animation-name": "zoomInLeft"
                    },
                    attrs: {
                        "data-wow-duration": "0.10s",
                        "data-wow-delay": "0.10s"
                    }
                },
                [t._v("\n                    距")])])
            },
            function() {
                var t = this,
                a = t.$createElement,
                e = t._self._c || a;
                return e("div", {
                    staticStyle: {
                        display: "none"
                    },
                    attrs: {
                        id: "starting"
                    }
                },
                [e("div", {
                    staticClass: "wow zoomInLeft animated",
                    staticStyle: {
                        visibility: "visible",
                        "animation-duration": "0.35s",
                        "animation-delay": "0.35s",
                        "animation-name": "zoomInLeft"
                    },
                    attrs: {
                        "data-wow-duration": "0.35s",
                        "data-wow-delay": "0.35s"
                    }
                },
                [t._v("\n                    束")]), t._v(" "), e("div", {
                    staticClass: "wow zoomInLeft animated",
                    staticStyle: {
                        visibility: "visible",
                        "animation-duration": "0.3s",
                        "animation-delay": "0.3s",
                        "animation-name": "zoomInLeft"
                    },
                    attrs: {
                        "data-wow-duration": "0.30s",
                        "data-wow-delay": "0.30s"
                    }
                },
                [t._v("\n                    结")]), t._v(" "), e("div", {
                    staticClass: "wow zoomInLeft animated",
                    staticStyle: {
                        visibility: "visible",
                        "animation-duration": "0.25s",
                        "animation-delay": "0.25s",
                        "animation-name": "zoomInLeft"
                    },
                    attrs: {
                        "data-wow-duration": "0.25s",
                        "data-wow-delay": "0.25s"
                    }
                },
                [t._v("\n                    包")]), t._v(" "), e("div", {
                    staticClass: "wow zoomInLeft animated",
                    staticStyle: {
                        visibility: "visible",
                        "animation-duration": "0.2s",
                        "animation-delay": "0.2s",
                        "animation-name": "zoomInLeft"
                    },
                    attrs: {
                        "data-wow-duration": "0.20s",
                        "data-wow-delay": "0.20s"
                    }
                },
                [t._v("\n                    红")]), t._v(" "), e("div", {
                    staticClass: "wow zoomInLeft animated",
                    staticStyle: {
                        visibility: "visible",
                        "animation-duration": "0.15s",
                        "animation-delay": "0.15s",
                        "animation-name": "zoomInLeft"
                    },
                    attrs: {
                        "data-wow-duration": "0.15s",
                        "data-wow-delay": "0.15s"
                    }
                },
                [t._v("\n                    离")]), t._v(" "), e("div", {
                    staticClass: "wow zoomInLeft animated",
                    staticStyle: {
                        visibility: "visible",
                        "animation-duration": "0.1s",
                        "animation-delay": "0.1s",
                        "animation-name": "zoomInLeft"
                    },
                    attrs: {
                        "data-wow-duration": "0.10s",
                        "data-wow-delay": "0.10s"
                    }
                },
                [t._v("\n                    距")])])
            },
            function() {
                var t = this,
                a = t.$createElement,
                e = t._self._c || a;
                return e("div", {
                    staticStyle: {
                        display: "none"
                    },
                    attrs: {
                        id: "red-packet-finish"
                    }
                },
                [e("div", {
                    staticClass: "wow zoomInLeft animated",
                    staticStyle: {
                        visibility: "visible",
                        "animation-duration": "0.3s",
                        "animation-delay": "0.3s",
                        "animation-name": "zoomInLeft"
                    },
                    attrs: {
                        "data-wow-duration": "0.30s",
                        "data-wow-delay": "0.30s"
                    }
                },
                [t._v("\n                    完")]), t._v(" "), e("div", {
                    staticClass: "wow zoomInLeft animated",
                    staticStyle: {
                        visibility: "visible",
                        "animation-duration": "0.25s",
                        "animation-delay": "0.25s",
                        "animation-name": "zoomInLeft"
                    },
                    attrs: {
                        "data-wow-duration": "0.25s",
                        "data-wow-delay": "0.25s"
                    }
                },
                [t._v("\n                    抢")]), t._v(" "), e("div", {
                    staticClass: "wow zoomInLeft animated",
                    staticStyle: {
                        visibility: "visible",
                        "animation-duration": "0.2s",
                        "animation-delay": "0.2s",
                        "animation-name": "zoomInLeft"
                    },
                    attrs: {
                        "data-wow-duration": "0.20s",
                        "data-wow-delay": "0.20s"
                    }
                },
                [t._v("\n                    已")]), t._v(" "), e("div", {
                    staticClass: "wow zoomInLeft animated",
                    staticStyle: {
                        visibility: "visible",
                        "animation-duration": "0.15s",
                        "animation-delay": "0.15s",
                        "animation-name": "zoomInLeft"
                    },
                    attrs: {
                        "data-wow-duration": "0.15s",
                        "data-wow-delay": "0.15s"
                    }
                },
                [t._v("\n                    包")]), t._v(" "), e("div", {
                    staticClass: "wow zoomInLeft animated",
                    staticStyle: {
                        visibility: "visible",
                        "animation-duration": "0.1s",
                        "animation-delay": "0.1s",
                        "animation-name": "zoomInLeft"
                    },
                    attrs: {
                        "data-wow-duration": "0.10s",
                        "data-wow-delay": "0.10s"
                    }
                },
                [t._v("\n                    红")])])
            },
            function() {
                var t = this,
                a = t.$createElement,
                e = t._self._c || a;
                return e("div", {
                    staticStyle: {
                        display: "block"
                    },
                    attrs: {
                        id: "finish"
                    }
                },
                [e("div", {
                    staticClass: "wow zoomInLeft",
                    staticStyle: {
                        visibility: "visible",
                        "animation-duration": "0.3s",
                        "animation-delay": "0.3s",
                        "animation-name": "zoomInLeft"
                    },
                    attrs: {
                        "data-wow-duration": "0.30s",
                        "data-wow-delay": "0.30s"
                    }
                },
                [t._v("\n                    束")]), t._v(" "), e("div", {
                    staticClass: "wow zoomInLeft",
                    staticStyle: {
                        visibility: "visible",
                        "animation-duration": "0.25s",
                        "animation-delay": "0.25s",
                        "animation-name": "zoomInLeft"
                    },
                    attrs: {
                        "data-wow-duration": "0.25s",
                        "data-wow-delay": "0.25s"
                    }
                },
                [t._v("\n                    结")]), t._v(" "), e("div", {
                    staticClass: "wow zoomInLeft",
                    staticStyle: {
                        visibility: "visible",
                        "animation-duration": "0.2s",
                        "animation-delay": "0.2s",
                        "animation-name": "zoomInLeft"
                    },
                    attrs: {
                        "data-wow-duration": "0.20s",
                        "data-wow-delay": "0.20s"
                    }
                },
                [t._v("\n                    已")]), t._v(" "), e("div", {
                    staticClass: "wow zoomInLeft",
                    staticStyle: {
                        visibility: "visible",
                        "animation-duration": "0.15s",
                        "animation-delay": "0.15s",
                        "animation-name": "zoomInLeft"
                    },
                    attrs: {
                        "data-wow-duration": "0.15s",
                        "data-wow-delay": "0.15s"
                    }
                },
                [t._v("\n                    包")]), t._v(" "), e("div", {
                    staticClass: "wow zoomInLeft",
                    staticStyle: {
                        visibility: "visible",
                        "animation-duration": "0.1s",
                        "animation-delay": "0.1s",
                        "animation-name": "zoomInLeft"
                    },
                    attrs: {
                        "data-wow-duration": "0.10s",
                        "data-wow-delay": "0.10s"
                    }
                },
                [t._v("\n                    红")])])
            },
            function() {
                var t = this.$createElement,
                a = this._self._c || t;
                return a("div", {
                    staticClass: "time2"
                },
                [a("span", [this._v("天")]), this._v(" "), a("span", [this._v("时")]), this._v(" "), a("span", [this._v("分")]), this._v(" "), a("span", [this._v("秒")])])
            },
            function() {
                var t = this.$createElement,
                a = this._self._c || t;
                return a("tr", [a("td", {
                    staticStyle: {
                        "border-radius": "17px 0px 0px"
                    }
                },
                [this._v("活动时间")]), this._v(" "), a("td", {
                    staticStyle: {
                        "min-width": "100px"
                    }
                },
                [this._v("累计充值金额")]), this._v(" "), a("td", {
                    staticStyle: {
                        "border-radius": "0px 17px 0px 0px",
                        "min-width": "60px"
                    }
                },
                [this._v("红包次数")])])
            },
            function() {
                var t = this.$createElement,
                a = this._self._c || t;
                return a("div", {
                    staticClass: "activityBot wow flipInX",
                    staticStyle: {
                        visibility: "visible",
                        "animation-name": "flipInX",
                        "line-height": "1.5",
                        "font-size": "10px!important"
                    }
                },
                [a("h3", {
                    staticClass: "yellow",
                    staticStyle: {
                        "font-size": "12px!important"
                    }
                },
                [this._v("领取规则：")]), this._v(" "), a("p", [this._v("1.抢到红包后，系统自动派彩，"), a("span", {
                    staticClass: "yellow"
                },
                [this._v("秒到账")]), this._v("，达到流水倍数即可取款；")]), this._v(" "), a("p", [this._v("2.领取红包条件：充值金额需要在规定的活动日期（美东时间）范围内，根据充值累计金额，获取抢红包次数，即可抢对应次数的红包；")])])
            },
            function() {
                var t = this,
                a = t.$createElement,
                e = t._self._c || a;
                return e("div", {
                    staticClass: "activityDes"
                },
                [e("div", {
                    staticClass: "activityDesTop wow zoomIn",
                    staticStyle: {
                        visibility: "visible",
                        "animation-name": "zoomIn"
                    }
                }), t._v(" "), e("div", {
                    staticClass: "activityDesMain"
                },
                [e("p", {
                    staticStyle: {
                        "text-align": "center"
                    }
                },
                [e("strong", [t._v("金沙集团官网")])]), t._v(" "), e("p", [e("strong", [t._v("注意："), e("strong", {
                    staticStyle: {
                        "white-space": "normal"
                    }
                },
                [t._v("抢红包")]), t._v("北京时间为每天早上\n                  10点到12点，存款计算为前一天12点到今天10点，谢谢~")]), e("br"), t._v("每日百万现金红包！存款越多，机会越多，红包享不停，惊喜抢不停，还等什么？快快叫上好友一起分享吧！！"), e("br")]), t._v(" "), e("p", [t._v("1、会员必须在指定的活动日期（美东时间）范围内，根据充值累计金额，即可获得对应抢红包次数。若在规定的时间范围内没有达到存款金额范围，则不计算抢红包次数，逾期作废！")]), t._v(" "), e("p", [t._v("2、所有的活动优惠特为玩家而设，如发现任何团体或个人，以不诚实的方式套取红利或任何威胁、滥用公司优惠等行为，公司保留冻结、取消该团体或个人账户及账户结余的权利。")]), t._v(" "), e("p", [t._v("3、金沙集团官网保留所有解释权，在任何时候都可以更改、停止、取消优惠活动。")]), t._v(" "), e("p", [e("br")])])])
            },
            function() {
                var t = this.$createElement,
                a = this._self._c || t;
                return a("div", {
                    staticClass: "botLeft wow bounceInLeft",
                    staticStyle: {
                        visibility: "visible",
                        "animation-name": "bounceInLeft"
                    }
                },
                [a("img", {
                    attrs: {
                        src: "/static/image/botLeft.png"
                    }
                })])
            },
            function() {
                var t = this.$createElement,
                a = this._self._c || t;
                return a("div", {
                    staticClass: "botright"
                },
                [a("img", {
                    staticClass: "wow bounceInRight",
                    staticStyle: {
                        visibility: "visible",
                        "animation-name": "bounceInRight"
                    },
                    attrs: {
                        src: "/static/image/botRight.png"
                    }
                })])
            }]
        };
        var A = e("VU/8")(I, L, !1,
        function(t) {
            e("kShl")
        },
        "data-v-6f64e04b", null).exports,
        T = {
            name: "activity",
            data: function() {
                return {
                    activitytypeList: [],
                    actType: "",
                    activitylistList: []
                }
            },
            created: function() {
                this.activitytype(),
                this.activitylist()
            },
            methods: {
                activitytype: function() {
                    var t = this;
                    t.$apiFun.post("/api/activitytype", {}).then(function(a) {
                        console.log(a),
                        200 !== a.code && t.$parent.showTost(0, a.message),
                        200 === a.code && (t.activitytypeList = a.data)
                    })
                },
                activitylist: function() {
                    var t = this,
                    a = "" == t.actType ? {}: {
                        type: t.actType
                    };
                    t.$parent.showLoading(),
                    t.$apiFun.post("/api/activitylist", a).then(function(a) {
                        console.log(a),
                        200 !== a.code && t.$parent.showTost(0, a.message),
                        200 === a.code && (t.activitylistList = a.data.data),
                        t.$parent.hideLoading()
                    })
                },
                changActType: function(t) {
                    t != this.actType && (this.actType = t, this.activitylist())
                }
            },
            mounted: function() {},
            updated: function() {},
            beforeDestroy: function() {}
        },
        E = {
            render: function() {
                var t = this,
                a = t.$createElement,
                e = t._self._c || a;
                return t.activitytypeList.length > 0 ? e("div", {
                    staticClass: "acts",
                    staticStyle: {
                        background: "#f1f1f1"
                    }
                },
                [e("div", {
                    staticClass: "pageTop"
                },
                [t._v("优惠活动")]), t._v(" "), e("van-tabs", {
                    staticClass: "topsa",
                    on: {
                        click: t.activitylist
                    },
                    model: {
                        value: t.actType,
                        callback: function(a) {
                            t.actType = a
                        },
                        expression: "actType"
                    }
                },
                [e("van-tab", {
                    attrs: {
                        title: "全部",
                        name: ""
                    }
                }), t._v(" "), t._l(t.activitytypeList,
                function(t, a) {
                    return e("van-tab", {
                        key: a,
                        attrs: {
                            name: t.id,
                            title: t.name
                        }
                    })
                })], 2), t._v(" "), e("div", {
                    staticClass: "consg"
                },
                [t._l(t.activitylistList,
                function(a, i) {
                    return e("div", {
                        key: i,
                        staticClass: "lis",
                        on: {
                            click: function(e) {
                                return t.$parent.goNav("/activityInfo?id=" + a.id)
                            }
                        }
                    },
                    [e("img", {
                        attrs: {
                            src: a.banner,
                            alt: ""
                        }
                    }), t._v(" "), e("div", {
                        staticClass: "tite_sf"
                    },
                    [t._v(t._s(a.title))])])
                }), t._v(" "), e("van-divider", {
                    style: {
                        color: "#ccc",
                        borderColor: "#ccc",
                        padding: "20px 16px"
                    },
                    attrs: {
                        dashed: ""
                    }
                },
                [t._v("END")])], 2)], 1) : t._e()
            },
            staticRenderFns: []
        };
        var U = e("VU/8")(T, E, !1,
        function(t) {
            e("mx8y")
        },
        "data-v-298e18cb", null).exports,
        N = {
            render: function() {
                var t = this,
                a = t.$createElement,
                e = t._self._c || a;
                return e("div", {
                    staticClass: "acts",
                    staticStyle: {
                        "background-color": "rgb(237, 242, 253)",
                        "min-height": "100vh"
                    }
                },
                [e("div", {
                    staticClass: "pageTop"
                },
                [t._v("赞助")]), t._v(" "), e("div", {
                    staticStyle: {
                        height: "30px"
                    }
                }), t._v(" "), e("div", {
                    staticClass: "lis",
                    on: {
                        click: function(a) {
                            return t.$parent.goNav("/zhanzhuye?type=1")
                        }
                    }
                },
                [t._m(0), t._v(" "), t._m(1)]), t._v(" "), e("div", {
                    staticClass: "lis",
                    on: {
                        click: function(a) {
                            return t.$parent.goNav("/zhanzhuye?type=2")
                        }
                    }
                },
                [t._m(2), t._v(" "), t._m(3)]), t._v(" "), e("van-divider", {
                    style: {
                        color: "#ccc",
                        borderColor: "#ccc",
                        padding: "20px 100px"
                    },
                    attrs: {
                        dashed: ""
                    }
                },
                [t._v("没有更多了~")])], 1)
            },
            staticRenderFns: [function() {
                var t = this.$createElement,
                a = this._self._c || t;
                return a("div", {
                    staticClass: "lfs"
                },
                [a("img", {
                    attrs: {
                        src: "/static/image/ddf471901f2b4fff9ee57015a1698227.png"
                    }
                }), this._v(" "), a("div", {
                    staticClass: "you"
                },
                [this._v("尤文图斯")]), this._v(" "), a("div", {
                    staticClass: "te"
                },
                [this._v("官方区域合作伙伴")])])
            },
            function() {
                var t = this.$createElement,
                a = this._self._c || t;
                return a("div", {
                    staticClass: "rig"
                },
                [a("img", {
                    attrs: {
                        src: "/static/image/93b000fa1d3246ce9b90a62c018714af.png",
                        alt: ""
                    }
                })])
            },
            function() {
                var t = this.$createElement,
                a = this._self._c || t;
                return a("div", {
                    staticClass: "lfs"
                },
                [a("img", {
                    attrs: {
                        src: "/static/image/ddf471901f2b4fff9ee57015a1698227.png"
                    }
                }), this._v(" "), a("div", {
                    staticClass: "you"
                },
                [this._v("阿斯顿维拉")]), this._v(" "), a("div", {
                    staticClass: "te"
                },
                [this._v("官方全球顶级合作伙伴")])])
            },
            function() {
                var t = this.$createElement,
                a = this._self._c || t;
                return a("div", {
                    staticClass: "rig"
                },
                [a("img", {
                    attrs: {
                        src: "/static/image/bd72c14c428d41ce8105a0d82a1bb696.png",
                        alt: ""
                    }
                })])
            }]
        };
        var D = e("VU/8")({
            name: "zhanzhu",
            data: function() {
                return {}
            },
            created: function() {},
            methods: {},
            mounted: function() {},
            updated: function() {},
            beforeDestroy: function() {}
        },
        N, !1,
        function(t) {
            e("KAOl")
        },
        "data-v-9ff44138", null).exports,
        P = e("c/Tr"),
        z = e.n(P),
        B = {
            name: "mine",
            data: function() {
                return {
                    activitylistList: [],
                    bfNum: 0,
                    vipLis: []
                }
            },
            created: function() {
                this.activitylist(),
                this.uservip()
            },
            methods: {
                onchangemd: function(t) {
                    var a = this;
                    console.log(t.target.files);
                    var e = new FormData;
                    z()(t.target.files).map(function(t) {
                        console.log(t),
                        e.append("file", t)
                    }),
                    a.$parent.showLoading(),
                    a.$apiFun.post("/api/uploadimg", e).then(function(t) {
                        a.$parent.hideLoading(),
                        a.$parent.getUserInfoShowLoding()
                    })
                },
                uservip: function() {
                    var t = this;
                    t.$parent.showLoading(),
                    t.$apiFun.post("/api/uservip", {}).then(function(a) {
                        200 != a.code && t.$parent.showTost(0, a.message),
                        200 == a.code && (t.vipLis = a.data, t.getbfNum()),
                        t.$parent.hideLoading()
                    }).
                    catch(function(a) {
                        t.$parent.hideLoading()
                    })
                },
                getbfNum: function() {
                    var t = 0,
                    a = 1 * this.$store.state.userInfo.vip;
                    this.vipLis.forEach(function(e, i) {
                        console.log(),
                        i == a && (t = 1 * e.recharge)
                    });
                    var e = 1 * this.$store.state.userInfo.paysum,
                    i = 0 == e || 0 == t ? 0 : Math.round(e / t * 100);
                    this.bfNum = i > 100 ? 100 : i,
                    console.log(111)
                },
                transall: function() {
                    var t = this;
                    t.$parent.showLoading(),
                    t.$apiFun.post("/api/transall", {}).then(function(a) {
                        t.$parent.showTost(0, a.message),
                        t.$parent.getUserInfoShowLoding(),
                        t.$parent.hideLoading()
                    }).
                    catch(function(a) {
                        t.$parent.hideLoading()
                    })
                },
                activitylist: function() {
                    var t = this,
                    a = "" == t.actType ? {}: {
                        type: t.actType
                    };
                    t.$parent.showLoading(),
                    t.$apiFun.post("/api/activitylist", a).then(function(a) {
                        console.log(a),
                        200 !== a.code && t.$parent.showTost(0, a.message),
                        200 === a.code && (t.activitylistList = a.data.data),
                        t.$parent.hideLoading()
                    })
                }
            },
            mounted: function() {},
            updated: function() {},
            beforeDestroy: function() {}
        },
        R = {
            render: function() {
                var t = this,
                a = t.$createElement,
                e = t._self._c || a;
                return e("div", {
                    staticStyle: {
                        "background-color": "rgb(237, 242, 253)",
                        "min-height": "100vh",
                        "box-sizing": "border-box"
                    }
                },
                [e("div", {
                    staticStyle: {
                        padding: "0 18px"
                    }
                },
                [e("div", {
                    staticClass: "mineTop"
                },
                [t._v("\n      我的\n      "), e("div", {
                    staticClass: "kefus",
                    on: {
                        click: function(a) {
                            return t.$parent.openKefu()
                        }
                    }
                },
                [e("img", {
                    attrs: {
                        src: "/static/image/iconKefu.da12a10e52caa3da81e8cbe383247f67.png"
                    }
                }), e("span", [t._v("客服")])])]), t._v(" "), e("div", {
                    staticClass: "usersg"
                },
                [e("div", {
                    staticClass: "lesf"
                },
                [e("img", {
                    attrs: {
                        src: t.$store.state.userInfo.avatar ? t.$store.state.userInfo.avatar: "/static/image/imageAvatar02@3x.png",
                        alt: ""
                    }
                }), t._v(" "), e("input", {
                    staticClass: "inputsw",
                    attrs: {
                        type: "file",
                        single: "",
                        accept: "image/gif,image/png"
                    },
                    on: {
                        change: t.onchangemd
                    }
                })]), t._v(" "), e("div", {
                    staticClass: "center",
                    on: {
                        click: function(a) {
                            return t.$parent.goNav("/userInfo")
                        }
                    }
                },
                [e("div", {
                    staticClass: "name"
                },
                [t._v("\n          " + t._s(t.$store.state.userInfo.username) + "\n          "), e("img", {
                    attrs: {
                        src: "/static/style/vip" + t.$store.state.userInfo.vip + ".png",
                        alt: ""
                    }
                })]), t._v(" "), e("div", {
                    staticClass: "dat"
                },
                [t._v("加入" + t._s(t.$store.state.appInfo.title) + "第" + t._s(t.$store.state.userInfo.joinday) + "天")])]), t._v(" "), e("img", {
                    staticClass: "rig",
                    attrs: {
                        src: "/static/style/icoArrowGrey@2x.abc43ab099390c4587d33290a76fc15e.png",
                        alt: ""
                    },
                    on: {
                        click: function(a) {
                            return t.$parent.goNav("/userInfo")
                        }
                    }
                })]), t._v(" "), e("div", {
                    staticClass: "meys"
                },
                [e("div", {
                    staticClass: "lefs"
                },
                [e("img", {
                    attrs: {
                        src: "/static/image/wallet.png",
                        alt: ""
                    }
                }), t._v(" "), e("span", [t._v("中心钱包")]), t._v(" "), e("div", {
                    staticClass: "imsg",
                    on: {
                        click: function(a) {
                            return t.$parent.getUserInfoShowLoding()
                        }
                    }
                },
                [e("img", {
                    attrs: {
                        src: "/static/style/refresh_2.98852cef4dfc05494e3f32a99e17d124.png"
                    }
                })])]), t._v(" "), e("div", {
                    staticClass: "meysf"
                },
                [e("span", [t._v("￥")]), t._v("\n        " + t._s(t.$store.state.userInfo.balance) + "\n      ")])]), t._v(" "), e("div", {
                    staticClass: "vipousf"
                },
                [e("div", {
                    staticClass: "box",
                    on: {
                        click: function(a) {
                            return t.$parent.goNav("/vip")
                        }
                    }
                },
                [e("img", {
                    attrs: {
                        src: "/static/image/vipnew.png",
                        alt: ""
                    }
                }), t._v(" "), t._m(0)]), t._v(" "), e("div", {
                    staticClass: "shu"
                }), t._v(" "), e("div", {
                    staticClass: "box",
                    on: {
                        click: function(a) {
                            return t.$parent.goNav("/activity")
                        }
                    }
                },
                [e("img", {
                    attrs: {
                        src: "/static/image/giftnew.png",
                        alt: ""
                    }
                }), t._v(" "), t._m(1)])])]), t._v(" "), e("div", {
                    staticClass: "uslis"
                },
                [e("div", {
                    staticStyle: {
                        "box-sizing": "border-box",
                        padding: "0 12px"
                    }
                },
                [e("div", {
                    staticStyle: {
                        height: "24px"
                    }
                }), t._v(" "), e("div", {
                    staticClass: "thbs"
                },
                [e("div", {
                    staticClass: "lis",
                    on: {
                        click: function(a) {
                            return t.$parent.goNav("/money")
                        }
                    }
                },
                [e("img", {
                    attrs: {
                        src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAMAAAC5zwKfAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAKvUExURRmZ/wCD/xqR+zSg9iKW9xaX/zWZ8kdwTCOd/yyb9lee5Tqb70Gh7gD//xWa/2ul4Him2Vyj6E+d52ai4BiZ/xOg/0Sg65+qyECa7Ian0kqf61Oj6g2b/2Kh4Iyo0RKY/26m3Y2o0BiZ/4On1JKozS2j+5aoy3ul2X2m1qCqyHym2JyqyZqqy42nzzmj9Wun3Yam0XOi2F2j45WqzYmo0Z6ryJOozZCpznKk3IKn1J6qyIWm0xSf/5iqy5eqzJGozZOozXWo25WpzBON/yyU84qn0JyqyZ6qyI+pzz1prWGb2n+o14up0Zuqypqqy5yqyZ2qyZSpzYCn1Z6qyZ6ryZipyoCk1JGozp2qyTploz15ux4wUZqqyy0/XjJRgjRblTxpq4iWtiU5WqCqyJ6qyDplpztppDlKajZemTtxtzValT9Wd2R4nDVXidTk/C9DZXGw0VVnhyAxT1BhgnmGptHZ8yo9X2h6mxwtSzFFZTFDYyI3WjZIaXeIqYCRsX2QsW9+nTpfkC5Pgf///xsxUtHZ/xswUxwxVRovUiE4YB81WxotTzddmiA3Xh0yVj5qrSI6YyQ8ZjhgniZBbTtlpj9rr97k/z5qrjpjoypHeDxnqStKfB4zWTRYkjtkpD1oqy5OgzJVjTliofb4/zFTizNXkDlhoC1MgD5prDValRkrSjxmqDBSiC9QhShEczZcmA4bM9zi/zZblzhenChEcihDcCU/alFyqThfnTBRhylGdtXc/y1MfuLo/0BsrwwYK0ttp05vo118sL7K8uns+ziG01rG9ER3sXGMwMbS+ExrnDFmvxpNsNzg6bbF8MjP2/Dz+JGpunqUxo+p5b/d/DF5zk6v6T+U22TX/ElnlUKX302s6TZ2niJewRMvYyxszQ8iP9Hb5DFXdLPA1gCX/7pvw00AAADldFJOUxQCFRgWERkAFRcjGhsBCys4IyAqEgUc6BxNHiAGKFsOL18JSHIWiTo+8ju5o2IZLU82JXxU3HhoMkbLSxCUjG92NIUSGFm32WT+LkBXp5+yxnpD0cybRWzBpz37rOPV4+zG9+/gzWjX8VP+69O0++Hht/Dy4+z9q/f72v7zta6b54v+Ff///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////xTDCVoUAAAImElEQVR42r2Z91taWRrHr3AlXHqTIEUURdkYMSAjGHvX2LvJZFKn1+19d3b3GbGLoib2qFFjjMYZo446mZ20md3N1O29/yP7HrjEey4Y4/A8+/FywR/4PN+X93DOPRfi0OMR600SY2EhAagijRJTlHifNxCPlUnAxCZSohd/KWGUUUXshUR/UKHYhNuCc+oj9hXur8OVpicW6iP31uApn0gYYSSeGGPE/kKo9gCo9PsIxRLigEgeK4zIIg5MZMTewgjoRrhGguUL20jgvvCNBOYL04gLoR9hGMVBQgkRFhK2UE+EiQkXRqjCFaoiMKGRCBsjUwgFh4+eIQw9YvgcPmDmIziMF3AiOJyQnaaFplAukqQoiovgWa08oZVrtXK5Vi5AUWYSrKH7QoQY0igWxeW9dPLcuXLPoseDHohyT/nioqf83HMnXwIxSXJYTpWYFupZPsjGE516bmhscdhzGRgeph/Azy9f9iyOTZ08JeRRQUYTLcQDckiqSKh+/sWRoTHPsN8xDC6/DPk8V24MzZ49pRHyzKzCVX6hnu3jirSnXvRO3bgC+VAwCFl+2TPsgRNQvnhlbGqh5+wJrYhLsSJG+YQSvGDKqtYKzr7snYWS/VyBg8nY0Ii3Z/KkQKHmUXhEIxKKsXzIp7M/PzPZszA1dGOMwQ0/8Dw0tbC1Nr9sk9MZsbYQrIr5RSKdPfW1uclV7+zU0BC8m8XU1NTIrLfn+vzyT6VyrZBVtB6EWMXQX61AajuzPP9yj3dkCjEyAkcA9HJ21ntrdXJm5TWXUqC2kphRAsJI/BPU6Awuy+3tmeurWwsLI7Pwdh8Lswtw8uPd6lmbn/vZmaRYg0KER4w8RIgJLKFQKz8hax5fmZtc69nyehfQgbHl3brVszY5szx9pt4mtau5JMEAdFFYTyiRwuCqODY+vTx/fbXn1laAW4h3A9y9+/Dhn2+fiba47DohLtQTJlbFAqkso3IUap4EI4O7n39xFePTVx3NNqVARDEFoMN6Yuaq7bGW6LjR2ytzYFxbXVtbhQdw74urDy69g/GtuMwjJ+TqIqYAdEZMyFMY8usdzp3x6bmZ+cnrj3j44Oql99pw3ik7VuGya3n40CaysJ7wdEpbRnHL+vi1FWR8xH+vXmr77M6te/eZQqej3mXQWfE2EypmT8wi+AjjYxI2Rm9Pb4MxwPTnD95ruwN9+SVTmFucYVPqhGZciEGKBKlHMuPyBkfHr20vz80EGPj0/bb7vkYzhQkx8TKpToQJWZg18tQj0Snpg+vjEHF5eY5m4t+X2oITJsRlJknleJtxOKRGHgvCus0NiDi9sr0MbC9vb0/8+v22tvv37vzmV0xhHghTBSKS2BtSLY+1HEupGxi86TMG6P/P63SPWcIjqQINKyG2taE0fmH/5sbOOBgDjH/wC8jG4vW8lGgQ4iWrcCHpF6b1Dwyu74yO374WoPNfH//2szZsXP/uq3lxIGSVnIUNbA5FC3v7Nwc3wLiL+4N/fPLPD//y14/+9NEf/vj7v3/y8Yd/eyU9BZWspvCBLQklnOhExps7O6OPGFx6G6f9jRAlg84ULCxLa+/q7B8A5fr6zUes+9nY2Bjc3Ozv7Op7Ix1KjsUTgg5bAQLCjr6JXqTcHGSzCQwMIJ/7GRAGJYwixJhQ7Rcudb/V1wXK/oFg+vtBN9Hn7g4ISXyCPVQYLKz77lK3u28ClIh+Fp2dvV0T7R0hhZH0IsUeNl9f6u54C4xdveBk4Nf1+gIufT9EyRJ8GeVQaoEv4QtLYEQZgV42XeCDgEtfY49DehkVq5grAAjhu/wdEHa72/smEF04ExPgc3d3L70JXz12QljoscthLj3bZD8Dwo4OUPaBFA4GoGt3d3R3v5DjmxzkIpJZMRJGMVdRuW8+zPnR02CEqt3tiD44AiAd8l34cWIumg+xZU/vv5zbrdkskkuTYMbOOfrq0yBEIf20B3C3u8HX0X3hfHUiPWPzGT32C02786FQp5RlFOcWVNecv4CECDetpeUdiB+er2kqgDUl38AU6v1CRlv4Qv+ql5Z9urXhJ698rwODFv7g29/4ZmNyVXZamaPCZWCsepERQRftZp7W7oKBmJ5ztKS24dnDhy9+hc3Fi4cPP9XQWlOdmIC+ynZ1EfuiHRBHBmrmqgWp8CHmFmRXJdc2lIIymGdLG2pLIKCzMkMmZYyayBAbHw6Faq5wlKXnNJ0uqW1sKC0tfYpJKdBwvLWkqqkAAlpcBsVuk/UhtmYcVHNsUnylsy6nqaomubW29jjQiP4aG48jamtbk2uqshPTnY5mGUyvvIDQGHLzSHI1AmW+JTqmpS4xu7rqdE0JkJwMhw/4p6bmdFVTdkG6szjTF5DiBG8eGX3hUxBRml8RXezMS0vMzm6qrj6KUV3dlJ1TkJZQVgkFK+UQkE8XHHoDzieLhDpDqqwi05HiTEhPKyhITMzJSUTQLwoK0tITnHGOeEu+VK4TFpEhN+CAOIs28uCi+ES+JSPaEZPibGnJzc1N8JOLHrktLc6UGEd08xGX1K7QcM3+gFl73sTgI6PCLnXJLM2ZxxyVlcXFMUyKKysd0fH1FlusUqDTwD4l+CYGZgTIIp5GKzCkumxJlor65uaM+F0yMpqb6yssMlus1C7QinhmkoP72DeCdvdmCrlBmepy5dtkNhkDm82W74pNVRrkCjVsHzEfJsSMfDPXKlLrBHa7wWBQAlJ00BgMdrlcoVOLeFyST/v2uZnGB6girlWo0WoVWoVCodPpFDr0pEDotGqNSMilSD7dj9A307DRwyH40G4KrDyEUIh29EKhkAcHl8elYEsPNj8S8T43JPUq+lvoz0pD0mcOnJEroFOZ/v+3TMO/qRsK0/5KqFZ8gBvjEZDy4DpcyEYv2dtmjPqyPy6EyFl44B8XcGmUSWLMUvlMhUaJCWSP538J3P0OvwDsDwAAAABJRU5ErkJggg==",
                        alt: ""
                    }
                }), t._v(" "), e("span", [t._v("我的钱包")])]), t._v(" "), e("div", {
                    staticClass: "lis",
                    on: {
                        click: function(a) {
                            return t.$parent.goNav("/transRecord")
                        }
                    }
                },
                [e("img", {
                    attrs: {
                        src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAMAAAC5zwKfAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAMAUExURRmZ/0qe7FSe52ul3xiZ/yuY9EGh70dwTCSW+iOd/wCD/xWa/3yn2i6i/wD//xOX/42oz5OozTSZ8hSV/2Sk4Tqd9Z6qyRiR8lCj7Dah9pqqymah3Tma63el2Z2qyT+Y64yo0Hmk14Sm05aoypiqzFae44ap1W+l3Vim6RmR/xmX/xKW/w2q/2Ol43Kk3Fyi43WNuJGozn2m14ao05SozIOn1oGn1ZKozYqn0YOl0jVblpapy4+oznWl252oxo2ozpOpzp+qyJapzDx5vIen0o6auACZ/yWi+Jiqyoun0CxAYZ+qyDZcl5mqypmoxzJNeI+pz4qn0p6ryDRxtztppBqT/52qyX2k1YqVtzVfnGSLvpyqyi9OfjBFaX6j0p+qyDNPfDBVipiqzIWQt1d6rT1inD9nopuqyjNKc3SMt5uqyis9XXCItGiDryx7yXWNt1+Nwyal/52pyFh4pzZJa1JkhTaAz2J0li9RhTJVjC9CY4KTtI6auCY6XZ+ryTFHbTBQgj1jnUqBwDdekSU4WTpnmiw+YYyZt42ZtzFJcTJMdTFJcZSgv5WgvzJnpjNmoz9lnzZclzValRouUDNWjzVblhswUzZcmDZdmB40WjNXkTRZkzFTizJUizBRiC9QhR0yVhovUiA3XipHeBwxVRksTSdDcSlFdS1MfytJey5NgSxLfRouYB0yWSZAbhovWB80by5OhdHa/yI5YiQ9ZyA2ZyE2iiI6ZiU/ax4zXx80eB4xgLLV/RsuaLrW/r3c/azU/PT4/+rw/N/q/xsudiM6ciI6fcTX/yNMpi5Pgh0yZidBeCxLhChBiy5Pi6rQ+9bj/ypKjBstcE6i4N/k/+70/1JropbV+CM+kytFmMjh/m6RvGiJumPM9iRZvqi52lWP1/z9/1x0qZ7B7jR7y7DF6Iuz6EmBzDBbr1BfnZ+x0WmEsZymx42dwmSl3ODl8SxmvsfO4kCHyla56TyAxn3C8Tx3qyZTplya1c7W6zt1q5XH8G+U2gEUKgMcLWbu/9ekA44AAAEAdFJOUxQeISwQFxsAFhUCCzkWARFedBkHKBrOFR8YpSoaNrwbXDpKjosjSi4hFQkNBicxJbJtPUx7REJxVUj+hGg061923Yk5UPQFFphY4OrunrjaY1PeNnUTxUD1jly0zN9F4tbjjvdx2ZSt3K6q4aaWI7RJFNSG0uEnrP//563u+tfer8RBafVb8Onp3tvd3t5RX7j//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////xRAhiqTAAAJvUlEQVR42sXZd1xT5xoH8JOEExOyICRCTGKGQMLMDYQlcBGlDAURARVRq9ZdrdYu6W7v3jdAQoCwkSkIsocgIigq7lH36m5v29u7xx/3eRNtyUsiUP64PzMO8PH7eZ7znpP3PSfEnKeH6+/LcsrMJCA8nhPLN547xX8gnoqxQMLDY/lzfxAY78cjHIXlP1OQ64treJ1uzlODODcF6Ttt0A3jHFc5LdDZiZh2/JynBqHbGSTTbQqQyyJmGBYO4u3OODxnx6AztDtbkcC8WYsE5s1aJDBvFiIOwnjMQuROAlnErMLCQTdilvG1BWEHzjKZzjagHzHrOE0EoeHZx20C6Lhhd3cfwsfdnbC8wKbPFCNtBX0dYATBdPd54QUmCshMtO3DZMIfHI8L4XBEAOMwGWR6cvHvSZKD/nH+kLwpnWQwgLc/LtzHoJs9jWAyOCI+n5+xMDdLKOQLhSKRMEtvyBDyRSTJYLrbK9MXgfb2IGAJDBE/fcmSJZQMvSmLssQSjyy9KQO209NFUCfDnTmpRCvob/vbF92hUZHo1azkXL3J9D6A2zQmvQmi2abXZ7yv1xuKN2W9KhIxGAROxltAlq3HZHJIPj19U05Rsb6gYF+GXr9NpYcs1AduW2jYss9gMBTnl2xKp/NFHHxn+iGQiw1tAkkKKdRNB/KLig36gm37/vje2rUFBfoC/cIta7e+t+8l/cJcAA+so8okJIj4sBB4xz4MvoxC/cnYgZyiXEOBKXltcPDaZFMBRI+2tyRDhUX5JWV1P6NShKIErER/AFm2BTJEQopXwLsNj0GTaevWZMAgJr1+61Z4hwoR+G6AmiIhGe7Yhw6BjTGTgzzVuroDJdCyqQD908MDWgbWAJ4ht9hS4TqVwIsuJG1B3hwC24VMUuihoUkRmF9sMECn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",
                        alt: ""
                    }
                }), t._v(" "), e("span", [t._v("交易记录")])]), t._v(" "), e("div", {
                    staticClass: "lis",
                    on: {
                        click: function(a) {
                            return t.$parent.goNav("/betRecord")
                        }
                    }
                },
                [e("img", {
                    attrs: {
                        src: "data:image/png;base64,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",
                        alt: ""
                    }
                }), t._v(" "), e("span", [t._v("投注记录")])]), t._v(" "), e("div", {
                    staticClass: "lis",
                    on: {
                        click: function(a) {
                            return t.$parent.goNav("/userCent")
                        }
                    }
                },
                [e("img", {
                    attrs: {
                        src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAMAAAC5zwKfAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAMAUExURRmZ/3um2Dmb81Kc5BiZ/xiR+DSc9EdwTCSd/yKW9hOd/06f6Gej3xSW/wB//xeY/yub9Xil2Uig7QD//42p0IWn052qypKozUKh8Gyl4Iuo0TyZ7GOi4oSm1BWa/zp9y1Wj6JeqzHKk25+ryZOpzV2h41mh5BKW/y6i/3am2j2j9X+m1Y+buY6oz5Gpz4Kn1ZuqypKpzoOm06CryYyn0JaoyyqU836m12qg3Yin0p6ryZ6qyZyqypqqy5uqy5Kpzm+n3o6p0ACZ/5WqzZapzJ2qyTVNd5+qyZmqzDNSgiw+XZ6qyZ+ryo+buJmpzC5CY5mqyzVSfzVdmIan0zVQfJaozJ6ryTJGajNJcDxsqztmp32MrJqpyUF7ujhKbB4xUx0vTzmE1jRVimx7mz5ztCY6Wp+ryJeiwaCryXKEpTZbkT5QbzxoqkNVdTlioDpwti5BY0d2qzdZjDhbjTxpq2Z4mYiWtIKStIGRsZHw/7j//xtqTxouUhswUz5qrhotThwxVjxmqD9rrztkpT1oqzddmh0zWDpioT5prSdCcR8zc9HZ/xkrSjtlpiA2YR40XDpjozhfnTlhoDZbl7XT/djf/xwxWy1MfiU+aj9rrjBSiCA1bMzY/ylEjsXX/ytIeilGdjhgnShDey9QhTJWjzFUix0yYzhgoDVZkyA2WiM7ZB0yaB4wiiE1hE9wpvP1/7bX/i5OgihEhB8ygtLb/77V/TRYkh4vgB8yeTFQlStLk9Xd/ydBh+vu/42ZyCE3aGJ8st/l/ytJivz9//f5/+Lr/+/z/qvS/SM7cyE2ejFWly9Oi4qjyixKgneg4nyo5cvf/jZ2xYiv55HI8iNStI2s1k6d14i67SlZsyU8kBtJs6/K9DNuucLK38HZ/rLW/V/H8kp7yyxhv0VrplyM15uuzUFin+Ln9URdlmyIu0VooIOn5DJowx49oVKl34/Y+7ji/jNlsUmOziVKp26Rxm+T2pW23aa833C27GGl0TyK0nWQwVm162O26iBCo//A/0vqnFMAAAEAdFJOUxQ7GiIQFRgAFRYGICsRAgkXOB0BXUy8dRosWBsoSgs1IYwy3nglIw0WNRlC9WRqRqZzSOpfjhg/LlHPzrShq24uYAV8g8fg6pbS4uDW9JvgnNnxTd6Iy+LhZcrGpzv5+/olxehJ+eTw6KK7zPHE4kb2UqWZ8KnLrq8hFv///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////xRR8rw6AAAJKElEQVR42sWZaVhTxxqAT07I8ZwskAXMSm4SCSRQoHKRAILsAoq2irvXervctnfflx9hSWlEKigkUgFFQEBcrxWVCuoVF8R936hL1e7L7Xr37bnf5BzbzMGm0vzoeyZzkueB9/m+mcmcmQkxLjAqcZgxRCYjAJksxBiWqxoXGCKgzAgmPjKjWPWNhLkxmA3DKB6rUBUGtkDIxKEBhGPUccqwhxaKMV2gKB9KGBpCPDQxoV8vhGzHgvhrhCojMUaMAYWQ7piRheJCzAfpBmskeL6gjQTuC95IYL4gjbgQ+iMIo2qU0EgEhZEvFBNBEoYLoQGDJRQTxhBBE+IvhISDR+wnxBIOpqc5YRjBg2ZrkYgW0SwMvEOfuRsB9YP7heD3CA2FhsIwchv15HcewJNyuY1BWvhbHBUnFPN9IhEjT6EWLvpJ+fLy8vLlzc3lHM1wlS//zaKFsZTNRo8yhnFCGT9hRk6RP19U5QLDC0A5XD6ay19A7hddVT9bQlJyOVJiTlbID5CxURrlM7PrXa7y5mbQcU5wwb0Zheiqq579jJKkGJsIF+aCkP+lg2zBt2R2Q3WdCxIG2Lz9gAg73LOXSJSxcgYXxiChisBg5LEaifVHm9yeKpfrRX9c7MvlggA73H1PWSV6MPK7heBlTDOUXmL9ZfcmdweEiFNXhyqg3uP2drUstEo0lJzmDW4Czxh8EJ/2Vy19XrenvqqurqquCgoHeltfVV/v6XBv6ur8tRYZGcxoBCE2CEW2WGW01FLc0gUheqrhn31UV1fXw8XR0+H29nV3PmWXRispBhvhsnEE3oQ0BGiwCIo7uzd53Q2eao/njcH33vDAm56eHo+nB916GtzeTV0tO4sFFoNEj+cMuly8S2L10VpFYvFOCBGMHQ2njx3d8c7phoYOKB1Q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",
                        alt: ""
                    }
                }), t._v(" "), e("span", [t._v("账户设置")])])]), t._v(" "), e("div", {
                    staticClass: "bosfs"
                },
                [e("div", {
                    staticClass: "hgsw",
                    on: {
                        click: function(a) {
                            return t.$parent.goNav("/message")
                        }
                    }
                },
                [e("img", {
                    staticClass: "firsimg",
                    attrs: {
                        src: "/static/image/ob@2x.png",
                        alt: ""
                    }
                }), t._v(" "), e("span", {
                    staticClass: "tit"
                },
                [t._v("消息中心")]), t._v(" "), e("span", {
                    staticClass: "tisf"
                }), t._v(" "), e("img", {
                    staticClass: "rigiong",
                    attrs: {
                        src: "/static/style/icoArrowGrey@2x.abc43ab099390c4587d33290a76fc15e.png",
                        alt: ""
                    }
                })]), t._v(" "), e("div", {
                    staticClass: "hgsw",
                    on: {
                        click: function(a) {
                            return t.$parent.goNav("/fanshui")
                        }
                    }
                },
                [e("img", {
                    staticClass: "firsimg",
                    attrs: {
                        src: "/static/image/haoyou.svg",
                        alt: ""
                    }
                }), t._v(" "), e("span", {
                    staticClass: "tit"
                },
                [t._v("返水中心")]), t._v(" "), e("span", {
                    staticClass: "tisf"
                }), t._v(" "), e("img", {
                    staticClass: "rigiong",
                    attrs: {
                        src: "/static/style/icoArrowGrey@2x.abc43ab099390c4587d33290a76fc15e.png",
                        alt: ""
                    }
                })]), t._v(" "), e("div", {
                    staticClass: "hgsw",
                    on: {
                        click: function(a) {
                            return t.$parent.goNav("/activityRecord")
                        }
                    }
                },
                [e("img", {
                    staticClass: "firsimg",
                    attrs: {
                        src: "/static/image/help.png",
                        alt: ""
                    }
                }), t._v(" "), e("span", {
                    staticClass: "tit"
                },
                [t._v("活动记录")]), t._v(" "), e("span", {
                    staticClass: "tisf"
                }), t._v(" "), e("img", {
                    staticClass: "rigiong",
                    attrs: {
                        src: "/static/style/icoArrowGrey@2x.abc43ab099390c4587d33290a76fc15e.png",
                        alt: ""
                    }
                })]), t._v(" "), e("div", {
                    staticClass: "hgsw",
                    on: {
                        click: function(a) {
                            return t.$parent.goNav("/welfare")
                        }
                    }
                },
                [e("img", {
                    staticClass: "firsimg",
                    attrs: {
                        src: "/static/image/haoyou.svg",
                        alt: ""
                    }
                }), t._v(" "), e("span", {
                    staticClass: "tit"
                },
                [t._v("福利中心")]), t._v(" "), e("span", {
                    staticClass: "tisf"
                }), t._v(" "), e("img", {
                    staticClass: "rigiong",
                    attrs: {
                        src: "/static/style/icoArrowGrey@2x.abc43ab099390c4587d33290a76fc15e.png",
                        alt: ""
                    }
                })]), t._v(" "), 0 == t.$store.state.userInfo.isagent ? e("div", {
                    staticClass: "hgsw",
                    on: {
                        click: function(a) {
                            return t.$parent.goNav("/applyagent")
                        }
                    }
                },
                [e("img", {
                    staticClass: "firsimg",
                    attrs: {
                        src: "/static/image/join.png",
                        alt: ""
                    }
                }), t._v(" "), e("span", {
                    staticClass: "tit"
                },
                [t._v("合营计划")]), t._v(" "), e("span", {
                    staticClass: "tisf"
                },
                [t._v("加入我们，共赢财富")]), t._v(" "), e("img", {
                    staticClass: "rigiong",
                    attrs: {
                        src: "/static/style/icoArrowGrey@2x.abc43ab099390c4587d33290a76fc15e.png",
                        alt: ""
                    }
                })]) : t._e(), t._v(" "), 1 == t.$store.state.userInfo.isagent ? e("div", {
                    staticClass: "hgsw",
                    on: {
                        click: function(a) {
                            return t.$parent.goNav("/gamePage?dailiD=1")
                        }
                    }
                },
                [e("img", {
                    staticClass: "firsimg",
                    attrs: {
                        src: "/static/image/join.png",
                        alt: ""
                    }
                }), t._v(" "), e("span", {
                    staticClass: "tit"
                },
                [t._v("代理登录")]), t._v(" "), e("span", {
                    staticClass: "tisf"
                }), t._v(" "), e("img", {
                    staticClass: "rigiong",
                    attrs: {
                        src: "/static/style/icoArrowGrey@2x.abc43ab099390c4587d33290a76fc15e.png",
                        alt: ""
                    }
                })]) : t._e(), t._v(" "), e("div", {
                    staticClass: "hgsw",
                    on: {
                        click: function(a) {
                            return t.$parent.goNav("/app")
                        }
                    }
                },
                [e("img", {
                    staticClass: "firsimg",
                    attrs: {
                        src: "/static/image/appxiazaus.png",
                        alt: ""
                    }
                }), t._v(" "), e("span", {
                    staticClass: "tit"
                },
                [t._v("app下载")]), t._v(" "), e("span", {
                    staticClass: "tisf"
                }), t._v(" "), e("img", {
                    staticClass: "rigiong",
                    attrs: {
                        src: "/static/style/icoArrowGrey@2x.abc43ab099390c4587d33290a76fc15e.png",
                        alt: ""
                    }
                })]), t._v(" "), e("div", {
                    staticClass: "hgsw",
                    on: {
                        click: function(a) {
                            return t.$parent.goNav("/boutBallBet")
                        }
                    }
                },
                [e("img", {
                    staticClass: "firsimg",
                    attrs: {
                        src: "/static/image/help.png",
                        alt: ""
                    }
                }), t._v(" "), e("span", {
                    staticClass: "tit"
                },
                [t._v("帮助中心")]), t._v(" "), e("span", {
                    staticClass: "tisf"
                }), t._v(" "), e("img", {
                    staticClass: "rigiong",
                    attrs: {
                        src: "/static/style/icoArrowGrey@2x.abc43ab099390c4587d33290a76fc15e.png",
                        alt: ""
                    }
                })]), t._v(" "), e("div", {
                    staticClass: "hgsw",
                    staticStyle: {
                        border: "none"
                    },
                    on: {
                        click: t.$parent.outLogin
                    }
                },
                [e("img", {
                    staticClass: "firsimg",
                    staticStyle: {
                        width: "18px",
                        "margin-left": "3px",
                        "margin-right": "3px"
                    },
                    attrs: {
                        src: "/static/image/close151.png",
                        alt: ""
                    }
                }), t._v(" "), e("span", {
                    staticClass: "tit"
                },
                [t._v("退出系统")]), t._v(" "), e("span", {
                    staticClass: "tisf"
                }), t._v(" "), e("img", {
                    staticClass: "rigiong",
                    attrs: {
                        src: "/static/style/icoArrowGrey@2x.abc43ab099390c4587d33290a76fc15e.png",
                        alt: ""
                    }
                })])])])])])
            },
            staticRenderFns: [function() {
                var t = this.$createElement,
                a = this._self._c || t;
                return a("div", [a("div", {
                    staticClass: "nsgs"
                },
                [this._v("VIP特权")]), this._v(" "), a("div", {
                    staticClass: "nsgsss"
                },
                [this._v("VIP PRIVILEGE")])])
            },
            function() {
                var t = this.$createElement,
                a = this._self._c || t;
                return a("div", [a("div", {
                    staticClass: "nsgs"
                },
                [this._v("豪礼赠送")]), this._v(" "), a("div", {
                    staticClass: "nsgsss"
                },
                [this._v("SPREE ACTIVITY")])])
            }]
        };
        var F = e("VU/8")(B, R, !1,
        function(t) {
            e("H7XO")
        },
        "data-v-2f124e27", null).exports,
        O = {
            name: "login",
            data: function() {
                return {
                    registerInfo: {},
                    loginInfo: {},
                    imgLis: ["2PYL", "6AQ5", "8PHD", "21I7", "69HM", "ACWA", "DUZ7", "IY98", "K647", "M52T", "NY52", "NZFA", "SN76", "SP4D", "VAEO", "YFQM", "ZZU5", "7GQT", "LFW3", "NU2T", "UAE3"],
                    index: 0,
                    infoType: 0,
                    psw1: !0,
                    psw2: !0,
                    psw3: !0,
                    pid: ""
                }
            },
            created: function() {
                var t = this.$route.query;
                t.type && (this.infoType = t.type),
                t.pid && (this.pid = t.pid),
                this.changIndex()
            },
            methods: {
                changPsw: function(t) {
                    this[t] = !this[t]
                },
                changInfoType: function(t) {
                    this.infoType != t && (this.infoType = t, this.changIndex(), this.loginInfo = {},
                    this.registerInfo = {},
                    this.psw1 = !0, this.psw2 = !0, this.psw3 = !0)
                },
                changIndex: function() {
                    this.index = parseInt(20 * Math.random())
                },
                register: function() {
                    var t = this,
                    a = t.registerInfo;
                    if (console.log(a), !a.name || a.name.length < 6) t.$parent.showTost(0, " 用户名长度6~16位，以字母或数字组合！");
                    else if (!a.password || a.password.length < 6) t.$parent.showTost(0, "请输入正确的密码长度，最少6位！");
                    else if (a.confirmPass && a.confirmPass == a.password) if (!a.realname || a.realname.length < 2) t.$parent.showTost(0, "请输入您的真实姓名!");
                    else if (!a.paypassword || a.paypassword.length < 6) t.$parent.showTost(0, "请输入正确的支付密码长度，最少6位！");
                    else {
                        var e = t.registerInfo.code;
                        if (e) {
                            if (e.toUpperCase() != t.imgLis[t.index]) return t.$parent.showTost(0, "验证码错误！"),
                            t.registerInfo.code = null,
                            void t.changIndex();
                            t.$parent.showLoading(),
                            t.pid && (a.pid = t.pid),
                            t.$apiFun.register(a).then(function(a) {
                                t.$parent.showTost(1, a.message),
                                200 == a.code && (sessionStorage.setItem("token", a.data.api_token), t.$store.commit("changToken"), t.$parent.getUserInfo(), t.$parent.openDaoTime(), t.$parent.goNav("/")),
                                t.$parent.hideLoading()
                            })
                        } else t.$parent.showTost(0, "请输入验证码！")
                    } else t.$parent.showTost(0, "两次密码不一致！")
                },
                login: function() {
                    var t = this,
                    a = t.loginInfo;
                    if (a.name && a.password) {
                        var e = t.loginInfo.code;
                        if (e) {
                            if (e.toUpperCase() != t.imgLis[t.index]) return t.$parent.showTost(0, "验证码错误！"),
                            t.loginInfo.code = null,
                            void t.changIndex();
                            t.$parent.showLoading(),
                            t.$apiFun.login(a).then(function(a) {
                                200 !== a.code && (t.$parent.showTost(0, a.message), t.$parent.hideLoading()),
                                200 === a.code && (sessionStorage.setItem("token", a.data.api_token), t.$store.commit("changToken"), t.$parent.getUserInfo(), t.$parent.openDaoTime(), t.$parent.goNav("/")),
                                t.$parent.hideLoading()
                            })
                        } else t.$parent.showTost(0, "请输入验证码！")
                    } else t.$parent.showTost(0, "请输入您的账号和密码！")
                }
            },
            mounted: function() {},
            updated: function() {},
            beforeDestroy: function() {}
        },
        q = {
            render: function() {
                var t = this,
                a = t.$createElement,
                e = t._self._c || a;
                return e("div", {
                    staticStyle: {
                        "overflow-y": "auto"
                    },
                    attrs: {
                        id: "__next"
                    }
                },
                [e("div", {
                    staticClass: "entry_entryStyle__FXwIQ"
                },
                [0 == t.infoType ? e("div", {
                    staticClass: "entry_entryMain__2anz2 entry_loginAnimated__1Gwda"
                },
                [e("div", {
                    staticStyle: {
                        width: "100vw"
                    }
                },
                [e("div", {
                    staticClass: "login_formContainer__2zhUW"
                },
                [e("div", {
                    staticClass: "login_normalContent__1I3Xg"
                },
                [e("div", {
                    staticClass: "login_title__1VIs3"
                },
                [t._v("登录")]), t._v(" "), e("div", {
                    staticClass: "login_form__1BQh1"
                },
                [e("div", {
                    staticClass: "login_normalLoginWrap__Q4P0O"
                },
                [e("div", {
                    staticClass: "login_inputBox__3j84z"
                },
                [e("div", {
                    staticClass: "login_inputGroup__1xPH8"
                },
                [e("div", {
                    staticClass: "login_accountIcon__1eker"
                }), t._v(" "), e("div", {
                    staticClass: "login_inputMain__18b4V"
                },
                [e("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: t.loginInfo.name,
                        expression: "loginInfo.name"
                    }],
                    staticClass: "login_input__hMBpm",
                    attrs: {
                        maxlength: "32",
                        placeholder: "用户名",
                        type: "text",
                        autocomplete: "off"
                    },
                    domProps: {
                        value: t.loginInfo.name
                    },
                    on: {
                        input: function(a) {
                            a.target.composing || t.$set(t.loginInfo, "name", a.target.value)
                        }
                    }
                })]), t._v(" "), e("div", {
                    staticClass: "login_operateBtn__25zoY login_deleteBtn__Tamqm",
                    staticStyle: {
                        opacity: "0"
                    }
                })]), t._v(" "), e("div", {
                    staticClass: "login_inputGroup__1xPH8"
                },
                [e("div", {
                    staticClass: "login_passwordIcon__foPzR"
                }), t._v(" "), e("div", {
                    staticClass: "login_inputMain__18b4V"
                },
                [e("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: t.loginInfo.password,
                        expression: "loginInfo.password"
                    }],
                    staticClass: "login_input__hMBpm",
                    attrs: {
                        placeholder: "密码",
                        maxlength: "32",
                        type: "password",
                        autocomplete: "off"
                    },
                    domProps: {
                        value: t.loginInfo.password
                    },
                    on: {
                        input: function(a) {
                            a.target.composing || t.$set(t.loginInfo, "password", a.target.value)
                        }
                    }
                })]), t._v(" "), e("div", {
                    staticClass: "login_operateBtn__25zoY login_hidePwdBtn__3EBnN",
                    staticStyle: {
                        opacity: "0"
                    }
                })]), t._v(" "), e("div", {
                    staticClass: "login_inputGroup__1xPH8"
                },
                [e("div", {
                    staticClass: "login_passwordIcon__foPzR"
                }), t._v(" "), e("div", {
                    staticClass: "login_inputMain__18b4V",
                    staticStyle: {
                        "flex-flow": "row nowrap",
                        "align-items": "center"
                    }
                },
                [e("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: t.loginInfo.code,
                        expression: "loginInfo.code"
                    }],
                    staticClass: "login_input__hMBpm",
                    attrs: {
                        maxlength: "6",
                        placeholder: "验证码 ",
                        type: "text",
                        autocomplete: "off"
                    },
                    domProps: {
                        value: t.loginInfo.code
                    },
                    on: {
                        input: function(a) {
                            a.target.composing || t.$set(t.loginInfo, "code", a.target.value)
                        }
                    }
                }), t._v(" "), e("img", {
                    staticStyle: {
                        cursor: "pointer",
                        height: "30px"
                    },
                    attrs: {
                        src: "/static/image/yzm/" + t.imgLis[t.index] + ".png",
                        alt: ""
                    },
                    on: {
                        click: t.changIndex
                    }
                })]), t._v(" "), e("div", {
                    staticClass: "login_operateBtn__25zoY login_deleteBtn__Tamqm",
                    staticStyle: {
                        opacity: "0"
                    }
                })])]), t._v(" "), e("div", {
                    staticClass: "login_btnGroup__37-ja"
                },
                [e("button", {
                    staticClass: "login_activeBtn__3wLDx",
                    attrs: {
                        type: "button",
                        "data-analytics": "button",
                        "data-label": "登录",
                        "data-key": "yb_lgn_btn_tap"
                    },
                    on: {
                        click: t.login
                    }
                },
                [t._v("登录")])]), t._v(" "), e("div", {
                    staticClass: "login_visitorBtn__2xo1h"
                },
                [e("a", {
                    attrs: {
                        "data-analytics": "button",
                        "data-label": "先去逛逛",
                        "data-key": "yb_tour"
                    },
                    on: {
                        click: function(a) {
                            return t.$parent.goNav("/")
                        }
                    }
                },
                [t._v("先去逛逛")]), e("a", {
                    on: {
                        click: t.$parent.openKefu
                    }
                },
                [t._v("在线客服")])])])])]), t._v(" "), e("div", {
                    staticClass: "login_locationToRight__gIQoN",
                    on: {
                        click: function(a) {
                            return t.changInfoType(1)
                        }
                    }
                },
                [t._m(0)])])])]) : t._e(), t._v(" "), 1 == t.infoType ? e("div", {
                    staticClass: "entry_entryMain__2anz2 entry_registerAnimated__2Bdsz entry_transition__38Yv4"
                },
                [e("div", {
                    staticStyle: {
                        width: "100vw",
                        "margin-left": "100vw"
                    }
                },
                [e("div", {
                    staticClass: "register_formContainer__3DhlE"
                },
                [e("div", {
                    staticClass: "register_locationToLeft__17bW-",
                    on: {
                        click: function(a) {
                            return t.changInfoType(0)
                        }
                    }
                },
                [t._m(1)]), t._v(" "), e("div", {
                    staticClass: "register_registerContent__16A8K"
                },
                [e("div", {
                    staticClass: "register_registerTitle__gkT0e"
                },
                [t._v("注册")]), t._v(" "), e("div", {
                    staticClass: "register_form__1pmZ3"
                },
                [e("div", {
                    staticClass: "register_inputBox__6n6TQ"
                },
                [e("div", {
                    staticClass: "register_inputGroup__2VkRD"
                },
                [e("div", {
                    staticClass: "register_inputIcon__2arpa register_accountIcon__27e07"
                }), t._v(" "), e("div", {
                    staticClass: "register_inputMain__3Ur5m"
                },
                [e("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: t.registerInfo.name,
                        expression: "registerInfo.name"
                    }],
                    staticClass: "register_input__1ukwi",
                    attrs: {
                        placeholder: "用户名",
                        maxlength: "32",
                        "data-inputtype": "register",
                        type: "text"
                    },
                    domProps: {
                        value: t.registerInfo.name
                    },
                    on: {
                        input: function(a) {
                            a.target.composing || t.$set(t.registerInfo, "name", a.target.value)
                        }
                    }
                })]), t._v(" "), e("div", {
                    staticClass: "register_operateBtn__12YnF register_deleteBtn__2EnTW",
                    staticStyle: {
                        opacity: "0"
                    }
                })]), t._v(" "), e("div", {
                    staticClass: "register_inputGroup__2VkRD"
                },
                [e("div", {
                    staticClass: "register_inputIcon__2arpa register_passwordIcon__18fIi"
                }), t._v(" "), e("div", {
                    staticClass: "register_inputMain__3Ur5m"
                },
                [e("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: t.registerInfo.password,
                        expression: "registerInfo.password"
                    }],
                    staticClass: "register_input__1ukwi",
                    attrs: {
                        placeholder: "登录密码",
                        maxlength: "32",
                        "data-inputtype": "register",
                        type: "password",
                        autocomplete: "off"
                    },
                    domProps: {
                        value: t.registerInfo.password
                    },
                    on: {
                        input: function(a) {
                            a.target.composing || t.$set(t.registerInfo, "password", a.target.value)
                        }
                    }
                })]), t._v(" "), e("div", {
                    staticClass: "register_operateBtn__12YnF register_hidePwdBtn__Qkz7h",
                    staticStyle: {
                        opacity: "0"
                    }
                })]), t._v(" "), e("div", {
                    staticClass: "register_inputGroup__2VkRD"
                },
                [e("div", {
                    staticClass: "register_inputIcon__2arpa register_passwordIcon__18fIi"
                }), t._v(" "), e("div", {
                    staticClass: "register_inputMain__3Ur5m"
                },
                [e("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: t.registerInfo.confirmPass,
                        expression: "registerInfo.confirmPass"
                    }],
                    staticClass: "register_input__1ukwi",
                    attrs: {
                        placeholder: "确认密码",
                        "data-inputtype": "register",
                        maxlength: "32",
                        type: "password",
                        autocomplete: "off"
                    },
                    domProps: {
                        value: t.registerInfo.confirmPass
                    },
                    on: {
                        input: function(a) {
                            a.target.composing || t.$set(t.registerInfo, "confirmPass", a.target.value)
                        }
                    }
                })]), t._v(" "), e("div", {
                    staticClass: "register_operateBtn__12YnF register_hidePwdBtn__Qkz7h",
                    staticStyle: {
                        opacity: "0"
                    }
                })]), t._v(" "), e("div", {
                    staticClass: "register_inputGroup__2VkRD"
                },
                [e("div", {
                    staticClass: "register_inputIcon__2arpa register_accountIcon__27e07"
                }), t._v(" "), e("div", {
                    staticClass: "register_inputMain__3Ur5m"
                },
                [e("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: t.registerInfo.realname,
                        expression: "registerInfo.realname"
                    }],
                    staticClass: "register_input__1ukwi",
                    attrs: {
                        placeholder: "真实姓名",
                        maxlength: "32",
                        "data-inputtype": "register",
                        type: "text"
                    },
                    domProps: {
                        value: t.registerInfo.realname
                    },
                    on: {
                        input: function(a) {
                            a.target.composing || t.$set(t.registerInfo, "realname", a.target.value)
                        }
                    }
                })]), t._v(" "), e("div", {
                    staticClass: "register_operateBtn__12YnF register_deleteBtn__2EnTW",
                    staticStyle: {
                        opacity: "0"
                    }
                })]), t._v(" "), e("div", {
                    staticClass: "register_inputGroup__2VkRD"
                },
                [e("div", {
                    staticClass: "register_inputIcon__2arpa register_passwordIcon__18fIi"
                }), t._v(" "), e("div", {
                    staticClass: "register_inputMain__3Ur5m"
                },
                [e("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: t.registerInfo.paypassword,
                        expression: "registerInfo.paypassword"
                    }],
                    staticClass: "register_input__1ukwi",
                    attrs: {
                        placeholder: "支付密码",
                        maxlength: "32",
                        "data-inputtype": "register",
                        type: "password",
                        autocomplete: "off"
                    },
                    domProps: {
                        value: t.registerInfo.paypassword
                    },
                    on: {
                        input: function(a) {
                            a.target.composing || t.$set(t.registerInfo, "paypassword", a.target.value)
                        }
                    }
                })]), t._v(" "), e("div", {
                    staticClass: "register_operateBtn__12YnF register_hidePwdBtn__Qkz7h",
                    staticStyle: {
                        opacity: "0"
                    }
                })]), t._v(" "), e("div", {
                    staticClass: "register_inputGroup__2VkRD"
                },
                [e("div", {
                    staticClass: "register_inputIcon__2arpa register_passwordIcon__18fIi"
                }), t._v(" "), e("div", {
                    staticClass: "register_inputMain__3Ur5m",
                    staticStyle: {
                        "flex-flow": "row nowrap",
                        "align-items": "center"
                    }
                },
                [e("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: t.registerInfo.code,
                        expression: "registerInfo.code"
                    }],
                    staticClass: "register_input__1ukwi",
                    attrs: {
                        "data-inputtype": "register",
                        maxlength: "4",
                        placeholder: "验证码",
                        type: "text",
                        autocomplete: "off"
                    },
                    domProps: {
                        value: t.registerInfo.code
                    },
                    on: {
                        input: function(a) {
                            a.target.composing || t.$set(t.registerInfo, "code", a.target.value)
                        }
                    }
                }), t._v(" "), e("img", {
                    staticStyle: {
                        cursor: "pointer",
                        height: "30px"
                    },
                    attrs: {
                        src: "/static/image/yzm/" + t.imgLis[t.index] + ".png",
                        alt: ""
                    },
                    on: {
                        click: t.changIndex
                    }
                })]), t._v(" "), e("div", {
                    staticClass: "register_operateBtn__12YnF register_hidePwdBtn__Qkz7h",
                    staticStyle: {
                        opacity: "0"
                    }
                })])]), t._v(" "), e("div", {
                    staticClass: "register_ruleContainer__1h-YD"
                }), t._v(" "), e("div", {
                    staticClass: "register_btnGroup__1vkHI"
                },
                [e("button", {
                    staticClass: "register_registerBtn__1set3",
                    attrs: {
                        type: "button",
                        "data-key": "yb_rgstr_btn_tap",
                        "data-analytics": "button",
                        "data-label": "注册"
                    },
                    on: {
                        click: t.register
                    }
                },
                [t._v("注册")])])])])])])]) : t._e()]), t._v(" "), t._m(2)])
            },
            staticRenderFns: [function() {
                var t = this.$createElement,
                a = this._self._c || t;
                return a("div", {
                    staticClass: "login_locationContent__o3pkw"
                },
                [a("div", {
                    staticClass: "login_linkRegisterIcon__3AVOn"
                }), this._v(" "), a("div", {
                    staticClass: "login_text__-W8Ok"
                },
                [a("span", [this._v("注")]), a("span", [this._v("册")]), a("span", [this._v("新")]), a("span", [this._v("用")]), a("span", [this._v("户")])])])
            },
            function() {
                var t = this.$createElement,
                a = this._self._c || t;
                return a("div", {
                    staticClass: "register_locationContent__2IbiZ"
                },
                [a("div", {
                    staticClass: "register_linkRegisterIcon__bUBqC"
                }), this._v(" "), a("div", {
                    staticClass: "register_text__33mcY"
                },
                [a("span", [this._v("返")]), a("span", [this._v("回")]), a("span", [this._v("登")]), a("span", [this._v("录")])])])
            },
            function() {
                var t = this,
                a = t.$createElement,
                e = t._self._c || a;
                return e("div", {
                    staticClass: "footer_footer_bg_hidden__1QCjG",
                    staticStyle: {
                        display: "none"
                    },
                    attrs: {
                        id: "app-footer"
                    }
                },
                [e("ul", [e("li", {
                    attrs: {
                        "data-analytics": "button",
                        "data-label": "首页"
                    }
                },
                [e("i"), t._v(" "), e("div", {
                    staticClass: "image_imageContainer__2dKjX image_cover__3B5D- footer_icon__1Rh5j",
                    staticStyle: {
                        cursor: "inherit"
                    }
                },
                [e("div", {
                    staticStyle: {
                        display: "block",
                        overflow: "hidden",
                        position: "absolute",
                        top: "0px",
                        left: "0px",
                        bottom: "0px",
                        right: "0px",
                        "box-sizing": "border-box",
                        margin: "0px"
                    }
                },
                [e("img", {
                    staticClass: "footer_icon__1Rh5j",
                    staticStyle: {
                        position: "absolute",
                        top: "0px",
                        left: "0px",
                        bottom: "0px",
                        right: "0px",
                        "box-sizing": "border-box",
                        padding: "0px",
                        border: "none",
                        margin: "auto",
                        display: "block",
                        width: "0px",
                        height: "0px",
                        "min-width": "100%",
                        "max-width": "100%",
                        "min-height": "100%",
                        "max-height": "100%",
                        "object-fit": "cover"
                    },
                    attrs: {
                        src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEVklEQVRoge2ZT2zbVBzHAxoIEBxgAk0CIY4gxAWkSQghgcQFBDshIXFjlzEIF24goQmhHcoJoYnTOHBaWlg1mO2kSZv37KSxn5NtbVBI/ziJnffshGRts7GtZRR+yKUJiZtgu423TuQnfQ+R8/Q+3zy/9/vaCYVGNapRDbUKBbgXE/YxJuw8JqyKFbqCFYYwoV/OztcfC+3nQln6CiJsASkU+gkTuoZVdhwA7grttxIJO4YJ+3MQfK8R9h0COBDaL4VV9pkX8G4lZcrnctYDtxUcAO5GKj3lF356lgKHDeCxLk8TdvB2btZxJ5w6X4elyhpIKusPn64Ch/R/hfViIm09eUvhUaHxIFZYwgk3V2zA7zc3wa7FyuoO+IQTHrVlsFjaePaWwEsXa48iheWccPmFJvx2/Sasb/yxJWWu1nM9nhoEr2+vhLEqSMZLgcKjS7WnsMKWnPA/LzZhpbUOrasbsHZlA4gDfsoNHnVM3IiK1SOBwIu5+nOYUKsfvNW4Bo2V61BrXIPZC2bP9ZhXeNS5nTYFsXp0qPCYWC/bTcgJP7/QhAq9ArR2Fcq0BVK2d+NGJcMnvN6RgKufDgVezJpHsELXexqRQuFi4VdYKK+CZqxBUVuxu2wvvLh7eK5jwvh6T11bVMyjSGGbTvhsvg7zxSYUli7D3C+N3tNGHg48ty0eGRH7yPYNj1Xzg37nuH2Pq/n61gqo872bNSlTEPBwwLneXsEj5CN6YIW9OijXpHImyJesHZt1RqbAiwHAIx3OJ3WI8NpXPgzQ/H+Hsd7PMxlqx4JA4H9KVuAMvwwRTtv8YarytCt8SrFe8JVr5Kq9xIHBR7hlOLOtcU476f7rE/Mjz/CZ4ODPzVQ64B3xy9iDAXbSW6IMEH66vBOeW7b3waIHA3TMDT4xawQGPxkv9YXfVmnPBuI2fADgHHaF37uBeCo4+LNTrvB7MzAVFDzS4fuoJ/jdG4h5CWVYN+zswmPjEzdxWP+GQ3r9H3jNK/zuDMQk91+QR0Y6nW4+FPJRsQx9ZELQ8j7g/RlI+ojDMYkebo/PULgfZc3XkMLe7padajNzlx/vnms8WnojEANJuQqCj1yTy8E9ncdNQrWBEUSh61g132rPNcFXDg3fgEzHBJ9xuD1WJOYJtx5i56z29yen2cGhGxAkY8zvKdIeiwg97drFCW0FaoDHIwMwWgFudAvp+3ITn42X79xNPBkvAVaqd6aBc4ny1usaTKinPvD5fjLw43Sl+2VCwdUAlunrvA94Huu19lhRYV+4d2JW7BhGcCDCaTcGwdsP9Q7zp0NeKpmh33p5ZBRE46+ZDA13gBT2BCa0NtgA2xSJ9W73XON86UQ/eA454dkCUhuHQl5rJkMPR0XjmID0cD/xUvV9KWc97xyXyrceFlXzHftPv25h1XxPvGA902+uiejyixGhdDwiaOEJQQvHJD2MiLklUTE/RIS9iSpwn2f4UY3qf1R/A/1BRmX2Ea0WAAAAAElFTkSuQmCC",
                        decoding: "async"
                    }
                })])]), t._v(" "), e("span", {},
                [t._v("首页")])]), t._v(" "), e("li", {
                    attrs: {
                        "data-analytics": "button",
                        "data-label": "优惠"
                    }
                },
                [e("i"), t._v(" "), e("div", {
                    staticClass: "image_imageContainer__2dKjX image_cover__3B5D- footer_icon__1Rh5j",
                    staticStyle: {
                        cursor: "inherit"
                    }
                },
                [e("div", {
                    staticStyle: {
                        display: "block",
                        overflow: "hidden",
                        position: "absolute",
                        top: "0px",
                        left: "0px",
                        bottom: "0px",
                        right: "0px",
                        "box-sizing": "border-box",
                        margin: "0px"
                    }
                },
                [e("img", {
                    staticClass: "footer_icon__1Rh5j",
                    staticStyle: {
                        position: "absolute",
                        top: "0px",
                        left: "0px",
                        bottom: "0px",
                        right: "0px",
                        "box-sizing": "border-box",
                        padding: "0px",
                        border: "none",
                        margin: "auto",
                        display: "block",
                        width: "0px",
                        height: "0px",
                        "min-width": "100%",
                        "max-width": "100%",
                        "min-height": "100%",
                        "max-height": "100%",
                        "object-fit": "cover"
                    },
                    attrs: {
                        src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEUElEQVRoge2ZTWwbRRiGDRTooUJAhUBISIgT4lCERLjCCfGjnkAcEIgLEj30hoRQhUAcoBIXuJBL4YCEZOMEldLZdVLbmVm7dnbWTtsEWYmwY+/uzHpdJ2liuQ0OpHxoNzGEFLx/Y35Uf9J7sOSdfZ7RzOzndSw2qlGNyrMA4BaisQ8JZU1CeZtQ/hXR7LGYgCpWOvcSar2DKV8ilHUIZal86fIjMZGFNf4eVhnsD6F8VqHNV8tluD3omLk5doRQdoqobPPGcVkdAxwQJuDM/F8J7LlhU6HWB1hrPzBoHAC4LVdiL2HKyKDxsrMMZGIcFQKPK+1Dg262T2QLU/Z1rmQ/tXcMSvlhrLF3CeWm1xjZIgOJ6CAr5ttCBFwJlXG/EntkTrnXltgzROVdP9dkCyZIWAfkJKe/KExA0fgrWOXbwST4Nm7AQULZl36+nykwQMRw4SWip5yDQ5iAK1Gyntg5ifi4r6j8dec6XG4+qmj800HfTRfMcUT0cQkbnyFsvObsFaHw/9sCgFsrFbjj30o5xPHsFtaaz2GVlwllPwfdvH4znd9Z78gjEjGYRIxPMIaDvuAVtfnssKD7mfIJj/aKYGPSl4DzdB0qfC44PNpNKseOeC8fynpDgZ81IZULB476AorxhrfAEOBnVAZyhJlH/WWkGG/94wIzTl+jRANHQQQI5UwoPBEDj9wlxF7wFlD55yLgnY5SEgiPsLGK8frdngKqunYXobwQCb5oCoWXsL4hE/Z8LMgTmGjWUaJa7yuqdTJIskV2UlIMMSHGxxLW3zx33nwwdlNXfmHjntwF+z6vyDlxKYftg/rltLSE8hNY5S2vNZ8+bwrcrHp/3fcQ0aXTuPFwKAFC+Ud+Nuy5IcCjHQGYnFqGhFRrJHH7UCD4ahXudH/f7kLSeRt4qwut1WvA7S40eAd+bKzDwtIq0PkW5EtNkJXoT1rUD9FhYmoZ4qjq5htp+VgggTzlj/fhSwstuH79V+htbUOnuwXttU1XxhG4tLgC6qUWEGpBSkCrgHZnfiJV+x3eSQJVx4MtH80e6wu0Vq7BZu8XWNv4CWrGOizW1mCu0obiBRuIZkG6IK5VQFiH5D54V0CqfhFaYOXKJqx3ei648zklcqngffDSn8GFCFiXu2C3r8LC4spQ4RN/Ax9ZoME6booX7SHBNyA+AD6ywNLyFZhfWnXegwqHP4t1T/hIAs5rvtIPbZi92IJ0Qex5f3am4ZwunvChBdyOEuugaBbMqFxod/l91j98PJRAwR5zHibOzcT29DqcydR9g8fDCqSIOTaMDftdOjh8/L8icDr9R2swdAEJm08Kgyc6fDsdHj4eRiBD+WFR8JMR4eNO5OqJWNBC2MhEFZhIRYdPoOpWUjYeCywwrVgPIWLMhZ35pHxjUxY4UvVqXKq6/zOEKozhgJxjT0vYPCZj/bjfJKfqxxNyLVKScv3lM5n6/aHhRzWqm6R+Az1Dmn8oNv4FAAAAAElFTkSuQmCC",
                        decoding: "async"
                    }
                })])]), t._v(" "), e("span", {},
                [t._v("优惠")])]), t._v(" "), e("li", {
                    attrs: {
                        "data-analytics": "button",
                        "data-label": "客服"
                    }
                },
                [e("i"), t._v(" "), e("div", {
                    staticClass: "image_imageContainer__2dKjX image_cover__3B5D- footer_icon__1Rh5j",
                    staticStyle: {
                        cursor: "inherit"
                    }
                },
                [e("div", {
                    staticStyle: {
                        display: "block",
                        overflow: "hidden",
                        position: "absolute",
                        top: "0px",
                        left: "0px",
                        bottom: "0px",
                        right: "0px",
                        "box-sizing": "border-box",
                        margin: "0px"
                    }
                },
                [e("img", {
                    staticClass: "footer_icon__1Rh5j",
                    staticStyle: {
                        position: "absolute",
                        top: "0px",
                        left: "0px",
                        bottom: "0px",
                        right: "0px",
                        "box-sizing": "border-box",
                        padding: "0px",
                        border: "none",
                        margin: "auto",
                        display: "block",
                        width: "0px",
                        height: "0px",
                        "min-width": "100%",
                        "max-width": "100%",
                        "min-height": "100%",
                        "max-height": "100%",
                        "object-fit": "cover"
                    },
                    attrs: {
                        src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAE/UlEQVRoge2ZXWgcVRTHt1rrByr1wRfRgoKQB1+0UuyDHw/Wl2JFiyhWBYUiKFZqDBTUJ8UXkT5aBEGpOJM11obeO/uV5N7ZbDYzm9UQajB17u7OzJ3dtGnzXVONTY7cbdJusjP7kcykBfOHw8IOM/z+55577pndUGhTm9qUr1L1sw+qmeIrVHcOqxn+Jc04X1C9+L6a4S8lfxu9N3QjigxObqcZ51OqOUNE4+AVVHcWqOb0qlrxPcOAW683dyibhVvUjNNKNT5eC9zVjOYUSD8/cN3gRTlQnSe1wVGwitNwfmIOiudm4Ux+ArKnz9Y10NXHARETMLWOEwK3bSi8OsgfFhm0SzOwsLgIF+fmoTR2EUbyE5AZqg+f6LPL8GgpMDE1Qia3b1y9687Ihck5EJq5+A84o7Mw9McYpLLFuvDxVfBo2QS14gBwc/AGdB61ijNl+OnZv+HPwiQkM05DdR9PWa7w6KoJ86tA4anuvKwNluDywiJMTgv4iYY3bay3NjwSQa2FGLEfCazjUI0beXsKxqcugfhUG8x8LNkAPFneDxYKxEBygO8XMKJ8cvYUDDTQaUREm4BHSxEjpRbfDVDNOS6ARKf59fdz9eH7bYgkmwNH11bhiK/wojtQjU8IsP7BUl34Ho2DsobMo6t7wUz7aoBozv2Nbtaefg6KukZwcvVcmPLVQHJgdFfD8HR98GgpstnSHU2DipvEFEl05xjN8IMEYKv4Xh0o7qsH393PRR/3BR6J6LUeKq8+GbsTEfOjnyLsWLuSexsAbnKFHx4e3kZ1fnoFmM6jALBluQN5wqdtf+HJlU4k4DExR8LYAAktB+t0L5PM6NOuU+NAcU8tA10C3kdwVGEAU/uwjFkF/JVox/mnqgyoeuk1VwO686GXgUTaFqen7/CobKDQIinGt6vhRcgo926VAaKVXnc3UGxzM7B6ovQzThETOmKFFhmz790MtGN2aF0GEqkA4btNkJERnIF4gPCd3fkyvBSUgVhvgPBd+RWQvhuIBgh/MrES3ncD0T6+Pyj4E4lcFaCvBiJJ3hZR7X2+w1MTTsTd4f0x0M8holrihG2LJvkuv+E7Yt7w0toMFF91mygxtQ4lUqUdfhroiNaGl5AB4URuh4TYN64HGWbvuBhwnijDpzlg9drpGqHObkJgK6LmjB+ZD0eqRwOpGnAxPAzb2hV20PV61HisyoCY8nrSPIorRgOsWl8vX8fU/NkLDFNLRUlzb62IJs294WhubxhdiXbMPvE2YIyVk0pgq4xZz8oxwjhaBV9hYotCrecV1W6NEP5M5TVM7be8s2s5oSYlYfaZ9yqwE5WJlbHxQrvCWqVo/snQWpVKnb8LEeuC5yoQ+/FGnyUSJWE25LkCCnszFIRER/IuI3Monea3N/IcGeeOeGYfG9MIWfcEYkAAYmoWapTSD/V+qBXlICN22TP7iH0cClKo19qJqXnJu9NYBqbWntX3dcbt+yTMfqzZfRCzTq3lXbhZ1drQnd2F5VLgMmaK2JAyYlkJsYU68H91KOajgcNfM2G9gak5Xwl/smsJvtnAxnw4wl4MbbQQsZ7F1BwV8L+4TJSNhIyNsXW1x/VK0cbv7kwUjsrY+Lc5cLYoIyZJMfZA6EaQmF1EB5ExO1MH/oKE2HdhxHaGblSJrMpK/jkZ5z6QFfa5jFmbrOQOhCPG7vBG/AuzqU39j/QfAdrRLU83fWwAAAAASUVORK5CYII=",
                        decoding: "async"
                    }
                })])]), t._v(" "), e("span", {},
                [t._v("客服")])]), t._v(" "), e("li", {
                    attrs: {
                        "data-analytics": "button",
                        "data-label": "赞助"
                    }
                },
                [e("i"), t._v(" "), e("div", {
                    staticClass: "image_imageContainer__2dKjX image_cover__3B5D- footer_icon__1Rh5j",
                    staticStyle: {
                        cursor: "inherit"
                    }
                },
                [e("div", {
                    staticStyle: {
                        display: "block",
                        overflow: "hidden",
                        position: "absolute",
                        top: "0px",
                        left: "0px",
                        bottom: "0px",
                        right: "0px",
                        "box-sizing": "border-box",
                        margin: "0px"
                    }
                },
                [e("img", {
                    staticClass: "footer_icon__1Rh5j",
                    staticStyle: {
                        position: "absolute",
                        top: "0px",
                        left: "0px",
                        bottom: "0px",
                        right: "0px",
                        "box-sizing": "border-box",
                        padding: "0px",
                        border: "none",
                        margin: "auto",
                        display: "block",
                        width: "0px",
                        height: "0px",
                        "min-width": "100%",
                        "max-width": "100%",
                        "min-height": "100%",
                        "max-height": "100%",
                        "object-fit": "cover"
                    },
                    attrs: {
                        src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAESElEQVRoge2YT2gjVRjAo4J7EPGkIq4HEQQPihfBVe8qiIqeBA+exJPoxbMIiuJJWQQvenClaberrM6bSZqm75tp08wkbbe1pstu0mbevEmTNO12i+2mNm0+maFLp900mTeTtCvkg4+Qf+/9fm++mfnmRSL96Ec/2sa4YT8Nhv0l6PZlanDoeaY5yKopE2DfKWCfiwQNRLwPjNJn1ODbVOd4Ejk2yZGoDCVqukmANSUwf4jPVR4QFlAz/NuTAqc6x6QDDwfw3iTA4oLwpZfAsPeOTgIGx+xfFcxdX8X5azWcXVjBqfkKpmeWQ8JbSFqAH0qVfehbwK33I5MsFNZwp7GH2//u4vrGNpZXNrHIN9zPZ3JV1DJ2MPgURwk6wLtHwSz6FzDsmncS095AJ+rbDbyxUcfllU1csm7iQn4Np/+uYmq6FAh+NGX5gr+dMc18zK9A8/YkDmCz2cRb9QaWqptozJbdUgpb84kJMXjJOQoqf9aXgHciB3qr3sDq6lbgMrkTvvXJKnVIRePPCQvU1m7h6nrdLZduwI+MB4OXggpUalvIy/+4pSQKC4a9BQafp7q967yPh4CXggo4J/D14jrqs2UxeN2uqpnSE+54hv1GbNzaDQMvBRW4uriGc1drODEldqWBDP/YO6ZE2YVTEZjJVVG/Irj6hj2Zz+MZ75gytc8SMMsnLqBlxa48oNs0NVd5pNW4ClgvEDAXTlSAdlxtvgO6/RM17I/U6eVn/Iwva+xlmbJPCLBBt2E7TQEty9+NhAgC7JtTFVCNypNhBCTK3vcrMKwsdV+AZvj5oPByHs8QYFk/8IOk0CMBpynTra+CPDBJlMU6wxcxSvI4IOV7I+B0lDKwpkLZKyICBKxPO8H/SU2MkoIL3xOBhNMO709GgCX9wiPivYSaN9vCjxUxug/eE4ERpx32TEioafoVGNWrj7aD/2OseAi86wIj44fh949A1q9ALof3E2CNVvCXk63huyZwfEfJLkQEgoB5TQQ+vECaY0xr0w4DS3jHSE7yxwm1PpAo+1pS+TuJqRsPec8BCVjJ+//fE0tt4UMJjOkcY579mlbptASEss8VzXpVAvbj0RJxT1qwvlBU600C5q/e734b6QwfXCDNUVGDd5Cd8lJ80Rd8IAFn5eUOKx8mh2P+4YUFxtLuDao38GDixdjBDWqg2wLJtHXsNl83ckgRW/kBUQEiuF/jN53tw0FZfOUHRAV6UzYHTdn/SwDYnvN6tK+5qwUImDMErPdkrfzwxETtwYty4fWoVIjd9QLEAdest44bNyoXXwwjMtwrAQdcptbbvgYPITLsWwBYzSf4FRHw0CLxgrvT1zEImJf8gCPiPZEuxJCSPxcl+Xg7+ChZ9P28EUmmrKckMNd7De5XJCrnd0Yn+WsRkaC6fZZQ67wETCPAfnG6yF6BtxSRC99HpYI2pBR+pin7+Tt+1I9+9CPixH88983PRtjROwAAAABJRU5ErkJggg==",
                        decoding: "async"
                    }
                })])]), t._v(" "), e("span", {},
                [t._v("赞助")])]), t._v(" "), e("li", {
                    attrs: {
                        "data-analytics": "button",
                        "data-label": "我的"
                    }
                },
                [e("i"), t._v(" "), e("div", {
                    staticClass: "image_imageContainer__2dKjX image_cover__3B5D- footer_icon__1Rh5j",
                    staticStyle: {
                        cursor: "inherit"
                    }
                },
                [e("div", {
                    staticStyle: {
                        display: "block",
                        overflow: "hidden",
                        position: "absolute",
                        top: "0px",
                        left: "0px",
                        bottom: "0px",
                        right: "0px",
                        "box-sizing": "border-box",
                        margin: "0px"
                    }
                },
                [e("img", {
                    staticClass: "footer_icon__1Rh5j",
                    staticStyle: {
                        position: "absolute",
                        top: "0px",
                        left: "0px",
                        bottom: "0px",
                        right: "0px",
                        "box-sizing": "border-box",
                        padding: "0px",
                        border: "none",
                        margin: "auto",
                        display: "block",
                        width: "0px",
                        height: "0px",
                        "min-width": "100%",
                        "max-width": "100%",
                        "min-height": "100%",
                        "max-height": "100%",
                        "object-fit": "cover"
                    },
                    attrs: {
                        src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEPUlEQVRoge2XT2gcVRzHp2gVKoIUBFvBgxdBvXhSg3gRKRVET4IKepOKCJ48eVAhCIIoEk+CByPsJE2KJe/NbppN3pvtZrOTTFMLbdXMbPa9nbfbNdsmsUla3dL85M0mm7HMrrM7O7MV8oPvZfYPn+/v/X6/9xtF2Y/92I+eRcasHdHz4j1qON+SvBijhpOkefEDzYvP9fnKiwBwj3I3BjXE89QQM9QQ2yTvQCtRQ9Sm58Qnplk5pNwNYZqVQzQvhttBezWdcwBTBpjySjLDX+orfHaxdpQaYjE4fAkwYYB2hCm/pdHS+/3LvA/84sU/QFQ3YPNGHeq3bsPGVh3OLghIzzqAKG/Ce4V1/kbsBojh/OQFl5DlHfA7lTXLvuBNUb6lZfiTscHr8+UBL/zsuTJUa1uwun7TVW31BhRK63Bp6SrkzlXaw5PdcmJabAaI4dC9qeIAE3/CldqmK4utQWZBuJ+dOVsKBI92lCT8hbgatzkqz19eAV6+7urCb7XmqUx2CI8ap/Bd5AaIIU54y+f35VVYKq7BZeta81mqC3jkiovoDcw7Q7ugsjkvLl11JftAPktm/CdNUBGy9lCkBqjhnPI2rxybUi68Hg4eEQaRTyOaF1Pe0Tl3vuJOml7AI2mAiOeiNWCI0TsvL42GB0e7kyhbfiJqA4PN1WDOkbdoz+ARZX9rFtwfrYEF5/jeUvZveI3yV00TDv6XsM6/aGEgp0Qdcp+fmSstI5+ywZR/GeQ/MOWzvvWv83eUOAJl+IctMrg2la081u63GnWOY8q3/e4A04SDsRiYvFB9ABFW9b1NCctjsvKIL7xefgZTtuI/ffhHSpyBdDaACfvL/yT4qkb5x/I70znnUUz5y0jnX8v939e0zsYB4IASd2DdeSvs5ME6Nyf6+Xqp6extWfvdjU1+elS78rDS72iUCUsGzjph60jn7/YFFgAOJDOlY5jwbzDl84jyMqbsJqasHjjzM/y2iu16AlubKrK5iuy0qlmfqZP205HCyzmNKC+EqfkJUgQVWZBoIRXZmTFcfLan4Nls7UFEeDpsw07MFFuCJ7wmsL0tT6Qn8HI/l7M9LPzp6WDwCa9wYSjUeE3lnMOIcDM0fLoLeLRrwhru2gAmfCws/M9nlruHRw2N4MKJjuGTuvNKWPhTU+HhE25jW9dHU87hzrJPuR4Gfnyy0BP4xF4pfRoYPpXlT4WBP5nqMTySsquEwL2BDCDKBruGT9oRwFuNXtDs14OWz0I38CPJKDJvecqoMBTwBPhG5/DRZT7RbGabBC2hXzuCx9HDJxo6GbSEvg8GXwQVxwIObg9g64NABlIZdgRTfq0d/ARhcrTFBq8i65fRS3BfIANuGelsoNXmKZeydhtlz+GxnR1P88eVbl7eMS29iSn7ClM+LIUIG5b7SdRSsf3jCLIHVWy91pf35f3YD+X/E/8AJUVb1128F3IAAAAASUVORK5CYII=",
                        decoding: "async"
                    }
                })])]), t._v(" "), e("span", {},
                [t._v("我的")])])])])
            }]
        };
        var V = e("VU/8")(O, q, !1,
        function(t) {
            e("bNtg")
        },
        "data-v-70e8fb54", null).exports,
        j = {
            name: "activityInfo",
            data: function() {
                return {
                    dataInfo: {}
                }
            },
            created: function() {
                var t = this.$route.query;
                t.id && this.getInfo(t.id)
            },
            methods: {
                getInfo: function(t) {
                    var a = this;
                    a.$parent.showLoading(),
                    a.$apiFun.post("/api/activitydeatil", {
                        id: t
                    }).then(function(t) {
                        console.log(t),
                        200 !== t.code && a.$parent.showTost(0, t.message),
                        200 === t.code && (a.dataInfo = t.data),
                        a.$parent.hideLoading()
                    })
                },
                doactivityapply: function() {
                    var t = this;
                    t.$parent.showLoading(),
                    t.$apiFun.post("/api/doactivityapply", {
                        activityid: t.dataInfo.id
                    }).then(function(a) {
                        t.$parent.hideLoading(),
                        t.$parent.showTost(1, a.message)
                    })
                }
            },
            mounted: function() {},
            updated: function() {},
            beforeDestroy: function() {}
        },
        M = {
            render: function() {
                var t = this,
                a = t.$createElement,
                e = t._self._c || a;
                return e("div", [e("van-nav-bar", {
                    staticStyle: {
                        position: "fixed",
                        top: "0",
                        left: "0",
                        width: "100%",
                        "background-color": "#edf2fd"
                    },
                    attrs: {
                        title: "活动详情",
                        "left-arrow": ""
                    },
                    on: {
                        "click-left": function(a) {
                            return t.$router.back()
                        }
                    }
                }), t._v(" "), e("div", {
                    staticStyle: {
                        height: "46px"
                    }
                }), t._v(" "), t.dataInfo.title ? e("div", [e("img", {
                    staticStyle: {
                        width: "100%",
                        display: "block"
                    },
                    attrs: {
                        src: t.dataInfo.banner,
                        alt: ""
                    }
                }), t._v(" "), e("div", {
                    staticStyle: {
                        "text-align": "center",
                        "font-size": "16px",
                        "padding-top": "15px"
                    }
                },
                [t._v(t._s(t.dataInfo.title))]), t._v(" "), e("van-divider", {
                    style: {
                        color: "#000",
                        borderColor: "#ccc",
                        padding: "10px",
                        width: "50%",
                        margin: "0 auto"
                    },
                    attrs: {
                        dashed: ""
                    }
                },
                [t._v("活动详情")]), t._v(" "), e("div", {
                    staticClass: "tables",
                    domProps: {
                        innerHTML: t._s(t.dataInfo.content)
                    }
                }), t._v(" "), e("van-divider", {
                    style: {
                        color: "#000",
                        borderColor: "#ccc",
                        padding: "10px",
                        width: "50%",
                        margin: "0 auto"
                    },
                    attrs: {
                        dashed: ""
                    }
                },
                [t._v("活动说明")]), t._v(" "), e("div", {
                    staticClass: "tables",
                    domProps: {
                        innerHTML: t._s(t.dataInfo.memo)
                    }
                }), t._v(" "), e("div", {
                    staticStyle: {
                        height: "120px"
                    }
                }), t._v(" "), e("div", {
                    staticClass: "bonsf"
                },
                [t.$store.state.token ? e("div", {
                    staticClass: "btsdn",
                    on: {
                        click: t.doactivityapply
                    }
                },
                [t._v("立即申请")]) : e("div", {
                    staticClass: "btsdn",
                    on: {
                        click: function(a) {
                            return t.$parent.goNav("/login")
                        }
                    }
                },
                [t._v("前往登录")])])], 1) : t._e()], 1)
            },
            staticRenderFns: []
        };
        var G = e("VU/8")(j, M, !1,
        function(t) {
            e("Yme6")
        },
        "data-v-79a5c630", null).exports,
        Y = {
            render: function() {
                var t = this,
                a = t.$createElement,
                e = t._self._c || a;
                return e("div", {
                    staticStyle: {
                        height: "100vh",
                        "overflow-y": "scroll",
                        "-webkit-overflow-scrolling": "touch"
                    }
                },
                [e("img", {
                    staticClass: "bancgs",
                    attrs: {
                        src: "/static/image/bank_020021515.png",
                        alt: ""
                    },
                    on: {
                        click: function(a) {
                            return t.$router.back()
                        }
                    }
                }), t._v(" "), 1 == t.type ? e("iframe", {
                    ref: "iframe",
                    staticStyle: {
                        height: "calc(100% - 6px)",
                        width: "100%"
                    },
                    attrs: {
                        src: "https://baike.baidu.com/item/%E5%B0%A4%E6%96%87%E5%9B%BE%E6%96%AF%E8%B6%B3%E7%90%83%E4%BF%B1%E4%B9%90%E9%83%A8/4606239",
                        scrolling: "auto",
                        frameborder: "0",
                        id: "iframe"
                    }
                }) : t._e(), t._v(" "), 2 == t.type ? e("iframe", {
                    ref: "iframe",
                    staticStyle: {
                        height: "calc(100% - 6px)",
                        width: "100%"
                    },
                    attrs: {
                        src: "https://baike.baidu.com/item/%E9%98%BF%E6%96%AF%E9%A1%BF%E7%BB%B4%E6%8B%89%E8%B6%B3%E7%90%83%E4%BF%B1%E4%B9%90%E9%83%A8/10933192",
                        scrolling: "auto",
                        frameborder: "0",
                        id: "iframe"
                    }
                }) : t._e()])
            },
            staticRenderFns: []
        };
        var J = e("VU/8")({
            name: "zhanzhuye",
            data: function() {
                return {
                    type: 1
                }
            },
            created: function() {
                var t = this.$route.query;
                this.type = t.type
            },
            methods: {},
            mounted: function() {},
            updated: function() {}
        },
        Y, !1,
        function(t) {
            e("5FF6")
        },
        "data-v-71f06ada", null).exports,
        X = {
            name: "vip",
            data: function() {
                return {
                    url: null,
                    vipLis: [],
                    vipTab: 1,
                    bfNum: 0
                }
            },
            created: function() {
                this.$store.state.token && (this.vipTab = this.$store.state.userInfo.vip),
                this.uservip()
            },
            methods: {
                swiperChang: function(t) {
                    console.log(t)
                },
                changvipTab: function(t) {
                    this.vipTab = t
                },
                uservip: function() {
                    var t = this;
                    t.$parent.showLoading(),
                    t.$apiFun.post("/api/uservip", {}).then(function(a) {
                        if (200 == a.code) {
                            t.vipLis = a.data,
                            t.getbfNum();
                            new Swiper(".swiper-container", {
                                loop: !1,
                                autoplay: !1,
                                grabCursor: !0,
                                slidesPerView: 1,
                                initialSlide: t.vipTab - 1,
                                observer: !0,
                                observeParents: !0,
                                on: {
                                    slideChangeTransitionEnd: function() {
                                        t.vipTab = this.realIndex + 1
                                    }
                                }
                            })
                        }
                        t.$parent.hideLoading()
                    }).
                    catch(function(a) {
                        t.$parent.hideLoading()
                    })
                },
                getbfNum: function() {
                    var t = 0,
                    a = 1 * this.$store.state.userInfo.vip;
                    this.vipLis.forEach(function(e, i) {
                        console.log(),
                        i == a && (t = 1 * e.recharge)
                    });
                    var e = 1 * this.$store.state.userInfo.paysum,
                    i = 0 == e || 0 == t ? 0 : Math.round(e / t * 100);
                    this.bfNum = i > 100 ? 100 : i
                }
            },
            mounted: function() {},
            updated: function() {}
        },
        Q = {
            render: function() {
                var t = this,
                a = t.$createElement,
                e = t._self._c || a;
                return t.vipLis.length > 0 ? e("div", {
                    staticStyle: {
                        "background-color": "#f1f1f1",
                        "min-height": "100vh"
                    }
                },
                [e("van-nav-bar", {
                    staticStyle: {
                        position: "fixed",
                        top: "0",
                        left: "0",
                        width: "100%",
                        "background-color": "#edf2fd"
                    },
                    attrs: {
                        title: "VIP特权",
                        "left-arrow": ""
                    },
                    on: {
                        "click-left": function(a) {
                            return t.$router.back()
                        }
                    }
                }), t._v(" "), e("div", {
                    staticStyle: {
                        height: "46px"
                    }
                }), t._v(" "), e("img", {
                    staticStyle: {
                        width: "100%"
                    },
                    attrs: {
                        src: "/static/image/xiangqing@2x.8b5b315d4cf3a4593fab14da84b35192.jpg",
                        alt: ""
                    }
                }), t._v(" "), e("div", {
                    staticClass: "vipType"
                },
                t._l(10,
                function(a, i) {
                    return e("div", {
                        key: i,
                        staticClass: "vipLis",
                        on: {
                            click: function(e) {
                                return t.changvipTab(a)
                            }
                        }
                    },
                    [e("img", {
                        class: a == t.vipTab ? "imgsd": "",
                        attrs: {
                            src: "/static/image/vip-" + a + ".png",
                            alt: ""
                        }
                    }), t._v("\n      VIP" + t._s(a) + "\n    ")])
                }), 0), t._v(" "), e("div", {
                    staticClass: "vipshow"
                },
                [e("div", {
                    staticClass: "bisx"
                },
                [e("img", {
                    attrs: {
                        src: "/static/image/vip-" + t.vipTab + "_bg.png",
                        alt: ""
                    }
                }), t._v(" "), e("div", {
                    staticClass: "ishw"
                },
                [t._v(t._s(1 * t.$store.state.userInfo.vip >= 1 * t.vipTab ? "已达标": "未达标"))]), t._v(" "), e("div", {
                    staticClass: "vip"
                },
                [t._v("VIP" + t._s(t.vipTab))]), t._v(" "), e("div", {
                    staticClass: "leiji"
                },
                [e("span", [t._v("累计存款")]), e("span", {
                    staticClass: "megs"
                },
                [t._v(t._s(t.vipLis[t.vipTab - 1].recharge) + " ")])]), t._v(" "), e("div", {
                    staticClass: "liushui"
                },
                [e("span", [t._v("流水要求")]), e("span", {
                    staticClass: "megs"
                },
                [t._v(t._s(t.vipLis[t.vipTab - 1].flow))])])])]), t._v(" "), t._m(0), t._v(" "), e("div", {
                    staticClass: "vipDetailStyle__table__2KDLc guize_con",
                    attrs: {
                        "data-v-f2b5b3f8": ""
                    }
                },
                [e("div", {
                    staticClass: "month__table__vcSJ7",
                    attrs: {
                        "data-v-f2b5b3f8": ""
                    }
                },
                [e("ul", {
                    attrs: {
                        "data-v-f2b5b3f8": ""
                    }
                },
                [t._m(1), t._v(" "), t._l(10,
                function(a, i) {
                    return e("li", {
                        key: i,
                        attrs: {
                            "data-v-f2b5b3f8": ""
                        }
                    },
                    [e("span", {
                        attrs: {
                            "data-v-f2b5b3f8": ""
                        }
                    },
                    [t._v("VIP" + t._s(a))])])
                })], 2), t._v(" "), e("div", {
                    staticClass: "month__tableContent__q7JRn",
                    attrs: {
                        "data-v-f2b5b3f8": ""
                    }
                },
                [e("ul", {
                    attrs: {
                        "data-v-f2b5b3f8": ""
                    }
                },
                [t._m(2), t._v(" "), t._l(10,
                function(a, i) {
                    return e("li", {
                        key: i,
                        attrs: {
                            "data-v-f2b5b3f8": ""
                        }
                    },
                    [e("span", {
                        attrs: {
                            "data-v-f2b5b3f8": ""
                        }
                    },
                    [t._v(t._s(t.vipLis[i].realperson))])])
                })], 2), t._v(" "), e("ul", {
                    attrs: {
                        "data-v-f2b5b3f8": ""
                    }
                },
                [t._m(3), t._v(" "), t._l(10,
                function(a, i) {
                    return e("li", {
                        key: i,
                        attrs: {
                            "data-v-f2b5b3f8": ""
                        }
                    },
                    [e("span", {
                        attrs: {
                            "data-v-f2b5b3f8": ""
                        }
                    },
                    [t._v(t._s(t.vipLis[i].sport))])])
                })], 2), t._v(" "), e("ul", {
                    attrs: {
                        "data-v-f2b5b3f8": ""
                    }
                },
                [t._m(4), t._v(" "), t._l(10,
                function(a, i) {
                    return e("li", {
                        key: i,
                        attrs: {
                            "data-v-f2b5b3f8": ""
                        }
                    },
                    [e("span", {
                        attrs: {
                            "data-v-f2b5b3f8": ""
                        }
                    },
                    [t._v(t._s(t.vipLis[i].e_sport))])])
                })], 2), t._v(" "), e("ul", {
                    attrs: {
                        "data-v-f2b5b3f8": ""
                    }
                },
                [t._m(5), t._v(" "), t._l(10,
                function(a, i) {
                    return e("li", {
                        key: i,
                        attrs: {
                            "data-v-f2b5b3f8": ""
                        }
                    },
                    [e("span", {
                        attrs: {
                            "data-v-f2b5b3f8": ""
                        }
                    },
                    [t._v(t._s(t.vipLis[i].joker))])])
                })], 2), t._v(" "), e("ul", {
                    attrs: {
                        "data-v-f2b5b3f8": ""
                    }
                },
                [t._m(6), t._v(" "), t._l(10,
                function(a, i) {
                    return e("li", {
                        key: i,
                        attrs: {
                            "data-v-f2b5b3f8": ""
                        }
                    },
                    [e("span", {
                        attrs: {
                            "data-v-f2b5b3f8": ""
                        }
                    },
                    [t._v(t._s(t.vipLis[i].electron))])])
                })], 2), t._v(" "), e("ul", {
                    attrs: {
                        "data-v-f2b5b3f8": ""
                    }
                },
                [t._m(7), t._v(" "), t._l(10,
                function(a, i) {
                    return e("li", {
                        key: i,
                        attrs: {
                            "data-v-f2b5b3f8": ""
                        }
                    },
                    [e("span", {
                        attrs: {
                            "data-v-f2b5b3f8": ""
                        }
                    },
                    [t._v(t._s(t.vipLis[i].lottery))])])
                })], 2)])])]), t._v(" "), t._m(8)], 1) : t._e()
            },
            staticRenderFns: [function() {
                var t = this.$createElement,
                a = this._self._c || t;
                return a("div", {
                    staticClass: "fanshiw"
                },
                [a("img", {
                    attrs: {
                        "data-v-f2b5b3f8": "",
                        src: "/static/image/xiangqing.af99e65ed557473a7e18a21288144c2d.png",
                        alt: ""
                    }
                }), this._v("\n    VIP最高返水比例\n  ")])
            },
            function() {
                var t = this.$createElement,
                a = this._self._c || t;
                return a("li", {
                    attrs: {
                        "data-v-f2b5b3f8": ""
                    }
                },
                [a("span", {
                    attrs: {
                        "data-v-f2b5b3f8": ""
                    }
                },
                [this._v("VIP等级")])])
            },
            function() {
                var t = this.$createElement,
                a = this._self._c || t;
                return a("li", {
                    attrs: {
                        "data-v-f2b5b3f8": ""
                    }
                },
                [a("span", {
                    attrs: {
                        "data-v-f2b5b3f8": ""
                    }
                },
                [this._v("真人(%)")])])
            },
            function() {
                var t = this.$createElement,
                a = this._self._c || t;
                return a("li", {
                    attrs: {
                        "data-v-f2b5b3f8": ""
                    }
                },
                [a("span", {
                    attrs: {
                        "data-v-f2b5b3f8": ""
                    }
                },
                [this._v("体育(%)")])])
            },
            function() {
                var t = this.$createElement,
                a = this._self._c || t;
                return a("li", {
                    attrs: {
                        "data-v-f2b5b3f8": ""
                    }
                },
                [a("span", {
                    attrs: {
                        "data-v-f2b5b3f8": ""
                    }
                },
                [this._v("电竞(%)")])])
            },
            function() {
                var t = this.$createElement,
                a = this._self._c || t;
                return a("li", {
                    attrs: {
                        "data-v-f2b5b3f8": ""
                    }
                },
                [a("span", {
                    attrs: {
                        "data-v-f2b5b3f8": ""
                    }
                },
                [this._v("棋牌(%)")])])
            },
            function() {
                var t = this.$createElement,
                a = this._self._c || t;
                return a("li", {
                    attrs: {
                        "data-v-f2b5b3f8": ""
                    }
                },
                [a("span", {
                    attrs: {
                        "data-v-f2b5b3f8": ""
                    }
                },
                [this._v("电子(%)")])])
            },
            function() {
                var t = this.$createElement,
                a = this._self._c || t;
                return a("li", {
                    attrs: {
                        "data-v-f2b5b3f8": ""
                    }
                },
                [a("span", {
                    attrs: {
                        "data-v-f2b5b3f8": ""
                    }
                },
                [this._v("彩票(%)")])])
            },
            function() {
                var t = this,
                a = t.$createElement,
                e = t._self._c || a;
                return e("div", {
                    staticClass: "vipDetailStyle__vipDetail__2q9TP"
                },
                [e("div", {
                    staticClass: "vipDetailStyle__vipInfo__3IZIT",
                    attrs: {
                        "data-v-f2b5b3f8": ""
                    }
                },
                [e("div", {
                    staticClass: "vipDetailStyle__rule__2s4Rz",
                    attrs: {
                        "data-v-f2b5b3f8": ""
                    }
                },
                [e("h2", {
                    staticStyle: {
                        margin: "0"
                    },
                    attrs: {
                        "data-v-f2b5b3f8": ""
                    }
                },
                [e("span", {
                    attrs: {
                        "data-v-f2b5b3f8": ""
                    }
                },
                [t._v("活动规则")])]), t._v(" "), e("h4", {
                    attrs: {
                        "data-v-f2b5b3f8": ""
                    }
                },
                [e("span", {
                    attrs: {
                        "data-v-f2b5b3f8": ""
                    }
                },
                [t._v("1")]), t._v("晋升标准")]), t._v(" "), e("p", {
                    attrs: {
                        "data-v-f2b5b3f8": ""
                    }
                },
                [t._v("会员的累计存款以及累计流水达到相应级别的要求，即可在次日24点前晋级相应VIP等级。")]), t._v(" "), e("h4", {
                    attrs: {
                        "data-v-f2b5b3f8": ""
                    }
                },
                [e("span", {
                    attrs: {
                        "data-v-f2b5b3f8": ""
                    }
                },
                [t._v("2")]), t._v("晋升顺序")]), t._v(" "), e("p", {
                    attrs: {
                        "data-v-f2b5b3f8": ""
                    }
                },
                [t._v("VIP等级达到相应的要求可每天晋升一级，但VIP等级不可越级晋升。")]), t._v(" "), e("h4", {
                    attrs: {
                        "data-v-f2b5b3f8": ""
                    }
                },
                [e("span", {
                    attrs: {
                        "data-v-f2b5b3f8": ""
                    }
                },
                [t._v("3")]), t._v("保级要求")]), t._v(" "), e("p", {
                    attrs: {
                        "data-v-f2b5b3f8": ""
                    }
                },
                [t._v("会员在达到某VIP等级后，90天内投注需要完成保级流水要求。如果在此期间完成晋升，保级要求重新按照当前等级计算。")]), t._v(" "), e("h4", {
                    attrs: {
                        "data-v-f2b5b3f8": ""
                    }
                },
                [e("span", {
                    attrs: {
                        "data-v-f2b5b3f8": ""
                    }
                },
                [t._v("4")]), t._v("降级标准")]), t._v(" "), e("p", {
                    attrs: {
                        "data-v-f2b5b3f8": ""
                    }
                },
                [t._v("如果会员在一个季度（90天计算）内没有完成相应的保级要求流水，系统会自动降级一个等级，相应的返水及其它优惠也会随之调整至降级后的等级。")]), t._v(" "), e("h4", {
                    attrs: {
                        "data-v-f2b5b3f8": ""
                    }
                },
                [e("span", {
                    attrs: {
                        "data-v-f2b5b3f8": ""
                    }
                },
                [t._v("8")]), t._v("VIP返水")]), t._v(" "), e("p", {
                    attrs: {
                        "data-v-f2b5b3f8": ""
                    }
                },
                [t._v("VIP返水优惠发放金额根据会员当天北京时间00:00—23:59之间的有效投注进行计算，当天所有的投注额返水将在注单结算当天结束后24小时内发放到福利中心，进入个人中心点击福利中心进行手动领取。（VIP返水1倍流水即可提款）")]), t._v(" "), e("div", {
                    staticClass: "vipDetailStyle__note__2kqnK",
                    attrs: {
                        "data-v-f2b5b3f8": ""
                    }
                },
                [t._v("欧宝娱乐保留对活动的修改，停止及最终解释权")])])])])
            }]
        };
        var H = e("VU/8")(X, Q, !1,
        function(t) {
            e("Rkdi")
        },
        "data-v-038ab399", null).exports,
        K = {
            render: function() {
                var t = this,
                a = t.$createElement,
                e = t._self._c || a;
                return e("div", {
                    staticClass: "app app-ti_green",
                    attrs: {
                        "data-v-f531b812": ""
                    }
                },
                [e("div", {
                    staticClass: "header",
                    attrs: {
                        "data-v-8a75a126": "",
                        "data-v-f531b812": ""
                    }
                },
                [e("div", {
                    staticClass: "header__top-wrapper",
                    attrs: {
                        "data-v-8a75a126": ""
                    }
                },
                [e("div", {
                    staticClass: "van-nav-bar van-nav-bar--fixed fixed-top nav-header",
                    attrs: {
                        "data-v-8a75a126": ""
                    }
                },
                [e("div", {
                    staticClass: "van-nav-bar__content"
                },
                [e("div", {
                    staticClass: "van-nav-bar__left",
                    on: {
                        click: function(a) {
                            return t.$router.back()
                        }
                    }
                },
                [e("i", {
                    staticClass: "van-icon van-icon-arrow-left van-nav-bar__arrow"
                })]), t._v(" "), e("div", {
                    staticClass: "van-nav-bar__title van-ellipsis"
                },
                [t._v("合营计划")])])])])]), t._v(" "), e("div", {
                    staticClass: "pahsn"
                },
                [e("img", {
                    staticStyle: {
                        display: "block",
                        width: "80%",
                        margin: "0 auto",
                        "padding-top": "30px"
                    },
                    attrs: {
                        "data-v-56fcd294": "",
                        src: "/static/image/__al__title01.7a3975958589d48b22c30b3b976a95fc.png"
                    }
                }), t._v(" "), e("img", {
                    staticStyle: {
                        display: "block",
                        width: "100%",
                        margin: "0 auto"
                    },
                    attrs: {
                        "data-v-56fcd294": "",
                        src: "/static/image/__al__person01.8b896040f87c2dfffa7e8de68ed19c42.png"
                    }
                }), t._v(" "), e("div", {
                    staticClass: "zixun",
                    on: {
                        click: t.$parent.openKefu
                    }
                },
                [e("img", {
                    attrs: {
                        "data-v-56fcd294": "",
                        src: "/static/image/16044962635685155.png"
                    }
                }), t._v(" "), t._m(0), t._v(" "), e("div", {
                    staticClass: "zusnb"
                },
                [t._v("咨询")])]), t._v(" "), e("div", {
                    staticClass: "bsd"
                },
                [e("van-form", [e("van-field", {
                    attrs: {
                        label: "用户名",
                        disabled: ""
                    },
                    model: {
                        value: t.$store.state.userInfo.username,
                        callback: function(a) {
                            t.$set(t.$store.state.userInfo, "username", a)
                        },
                        expression: "$store.state.userInfo.username"
                    }
                }), t._v(" "), e("van-field", {
                    attrs: {
                        label: "真实姓名",
                        disabled: ""
                    },
                    model: {
                        value: t.$store.state.userInfo.realname,
                        callback: function(a) {
                            t.$set(t.$store.state.userInfo, "realname", a)
                        },
                        expression: "$store.state.userInfo.realname"
                    }
                }), t._v(" "), e("van-field", {
                    attrs: {
                        label: "联系方式",
                        placeholder: "请输入您的联系方式"
                    },
                    model: {
                        value: t.info.mobile,
                        callback: function(a) {
                            t.$set(t.info, "mobile", a)
                        },
                        expression: "info.mobile"
                    }
                }), t._v(" "), e("van-field", {
                    attrs: {
                        label: "申请理由",
                        placeholder: "请输入申请说明"
                    },
                    model: {
                        value: t.info.apply_info,
                        callback: function(a) {
                            t.$set(t.info, "apply_info", a)
                        },
                        expression: "info.apply_info"
                    }
                })], 1), t._v(" "), e("van-button", {
                    attrs: {
                        block: "",
                        type: "info"
                    },
                    on: {
                        click: t.shenqing
                    }
                },
                [t._v("加入我们")])], 1)])])
            },
            staticRenderFns: [function() {
                var t = this.$createElement,
                a = this._self._c || t;
                return a("div", {
                    staticClass: "cnets"
                },
                [a("div", {
                    staticClass: "tos"
                },
                [this._v("合营部")]), this._v(" "), a("div", {
                    staticClass: "bos"
                },
                [this._v("立即咨询")])])
            }]
        };
        var W = e("VU/8")({
            name: "applyagent",
            data: function() {
                return {
                    info: {}
                }
            },
            created: function() {},
            methods: {
                shenqing: function() {
                    var t = this,
                    a = t.info;
                    /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(a.mobile) ? a.apply_info ? (t.$parent.showLoading(), t.$apiFun.post("/api/applyagentdo", a).then(function(a) {
                        t.$parent.showTost(1, a.message),
                        t.$parent.hideLoading()
                    }).
                    catch(function(a) {
                        t.$parent.hideLoading()
                    })) : t.$parent.showTost(0, "请输入申请理由") : t.$parent.showTost(0, "请输入正确手机号")
                }
            },
            mounted: function() {},
            updated: function() {}
        },
        K, !1,
        function(t) {
            e("YhKM")
        },
        "data-v-e691a368", null).exports,
        Z = {
            render: function() {
                var t = this,
                a = t.$createElement,
                e = t._self._c || a;
                return e("div", [e("div", {
                    staticStyle: {
                        height: "180px"
                    }
                }), t._v(" "), e("img", {
                    staticClass: "bancgs",
                    attrs: {
                        src: "/static/image/bank_020021515.png",
                        alt: ""
                    },
                    on: {
                        click: function(a) {
                            return t.$router.back()
                        }
                    }
                }), t._v(" "), t._m(0), t._v(" "), e("div", {
                    staticClass: "bosfs"
                },
                [e("div", {
                    staticClass: "hgsw",
                    on: {
                        click: function(a) {
                            return t.$parent.goNav("/boutBallBetInfo?type=7")
                        }
                    }
                },
                [e("img", {
                    staticClass: "firsimg",
                    attrs: {
                        src: "/static/image/1587555761884253.png",
                        alt: ""
                    }
                }), t._v(" "), e("span", {
                    staticClass: "tit"
                },
                [t._v("关于我们")]), t._v(" "), e("span", {
                    staticClass: "tisf"
                }), t._v(" "), e("img", {
                    staticClass: "rigiong",
                    attrs: {
                        src: "/static/style/icoArrowGrey@2x.abc43ab099390c4587d33290a76fc15e.png",
                        alt: ""
                    }
                })]), t._v(" "), e("div", {
                    staticClass: "hgsw",
                    on: {
                        click: function(a) {
                            return t.$parent.goNav("/boutBallBetInfo?type=1")
                        }
                    }
                },
                [e("img", {
                    staticClass: "firsimg",
                    attrs: {
                        src: "/static/image/1587555761884253.png",
                        alt: ""
                    }
                }), t._v(" "), e("span", {
                    staticClass: "tit"
                },
                [t._v("常见问题")]), t._v(" "), e("span", {
                    staticClass: "tisf"
                }), t._v(" "), e("img", {
                    staticClass: "rigiong",
                    attrs: {
                        src: "/static/style/icoArrowGrey@2x.abc43ab099390c4587d33290a76fc15e.png",
                        alt: ""
                    }
                })]), t._v(" "), e("div", {
                    staticClass: "hgsw",
                    on: {
                        click: function(a) {
                            return t.$parent.goNav("/boutBallBetInfo?type=2")
                        }
                    }
                },
                [e("img", {
                    staticClass: "firsimg",
                    attrs: {
                        src: "/static/image/1587555761884253.png",
                        alt: ""
                    }
                }), t._v(" "), e("span", {
                    staticClass: "tit"
                },
                [t._v("隐私政策")]), t._v(" "), e("span", {
                    staticClass: "tisf"
                }), t._v(" "), e("img", {
                    staticClass: "rigiong",
                    attrs: {
                        src: "/static/style/icoArrowGrey@2x.abc43ab099390c4587d33290a76fc15e.png",
                        alt: ""
                    }
                })]), t._v(" "), e("div", {
                    staticClass: "hgsw",
                    on: {
                        click: function(a) {
                            return t.$parent.goNav("/boutBallBetInfo?type=3")
                        }
                    }
                },
                [e("img", {
                    staticClass: "firsimg",
                    attrs: {
                        src: "/static/image/1587555761884253.png",
                        alt: ""
                    }
                }), t._v(" "), e("span", {
                    staticClass: "tit"
                },
                [t._v("免责说明")]), t._v(" "), e("span", {
                    staticClass: "tisf"
                }), t._v(" "), e("img", {
                    staticClass: "rigiong",
                    attrs: {
                        src: "/static/style/icoArrowGrey@2x.abc43ab099390c4587d33290a76fc15e.png",
                        alt: ""
                    }
                })]), t._v(" "), e("div", {
                    staticClass: "hgsw",
                    on: {
                        click: function(a) {
                            return t.$parent.goNav("/boutBallBetInfo?type=4")
                        }
                    }
                },
                [e("img", {
                    staticClass: "firsimg",
                    attrs: {
                        src: "/static/image/1587555761884253.png",
                        alt: ""
                    }
                }), t._v(" "), e("span", {
                    staticClass: "tit"
                },
                [t._v("联系我们")]), t._v(" "), e("span", {
                    staticClass: "tisf"
                }), t._v(" "), e("img", {
                    staticClass: "rigiong",
                    attrs: {
                        src: "/static/style/icoArrowGrey@2x.abc43ab099390c4587d33290a76fc15e.png",
                        alt: ""
                    }
                })]), t._v(" "), e("div", {
                    staticClass: "hgsw",
                    on: {
                        click: function(a) {
                            return t.$parent.goNav("/boutBallBetInfo?type=5")
                        }
                    }
                },
                [e("img", {
                    staticClass: "firsimg",
                    attrs: {
                        src: "/static/image/1587555761884253.png",
                        alt: ""
                    }
                }), t._v(" "), e("span", {
                    staticClass: "tit"
                },
                [t._v("代理加盟")]), t._v(" "), e("span", {
                    staticClass: "tisf"
                }), t._v(" "), e("img", {
                    staticClass: "rigiong",
                    attrs: {
                        src: "/static/style/icoArrowGrey@2x.abc43ab099390c4587d33290a76fc15e.png",
                        alt: ""
                    }
                })]), t._v(" "), e("div", {
                    staticClass: "hgsw",
                    staticStyle: {
                        border: "none"
                    },
                    on: {
                        click: function(a) {
                            return t.$parent.goNav("/boutBallBetInfo?type=8")
                        }
                    }
                },
                [e("img", {
                    staticClass: "firsimg",
                    attrs: {
                        src: "/static/image/1587555761884253.png",
                        alt: ""
                    }
                }), t._v(" "), e("span", {
                    staticClass: "tit"
                },
                [t._v("博彩责任")]), t._v(" "), e("span", {
                    staticClass: "tisf"
                }), t._v(" "), e("img", {
                    staticClass: "rigiong",
                    attrs: {
                        src: "/static/style/icoArrowGrey@2x.abc43ab099390c4587d33290a76fc15e.png",
                        alt: ""
                    }
                })])]), t._v(" "), e("div", {
                    staticStyle: {
                        "margin-top": "0.48rem",
                        "text-align": "center",
                        color: "#6c7c9d",
                        "padding-bottom": "0.6rem"
                    }
                },
                [t._v("没有找到解决办法？请联系"), e("a", {
                    staticStyle: {
                        color: "#597ef7",
                        "font-weight": "600"
                    },
                    on: {
                        click: t.$parent.openKefu
                    }
                },
                [t._v("人工客服")]), t._v("解决")])])
            },
            staticRenderFns: [function() {
                var t = this.$createElement,
                a = this._self._c || t;
                return a("div", {
                    staticClass: "topsf"
                },
                [a("div", {
                    staticClass: "tois"
                },
                [a("img", {
                    attrs: {
                        src: "/static/style/tx.0d38194b71b5a32ef1df50b7090ca7f5.png",
                        alt: ""
                    }
                }), this._v(" "), a("div", {
                    staticClass: "dwd"
                },
                [a("div", {
                    staticClass: "tisaa"
                },
                [this._v("Hi,尊敬的会员用户")]), this._v(" "), a("div", {
                    staticClass: "newsa"
                },
                [this._v("早上好，欢迎来到帮助中心")])])]), this._v(" "), a("div", {
                    staticStyle: {
                        color: "#fff",
                        "text-align": "center",
                        "margin-top": "20px"
                    }
                },
                [this._v("若相关问题仍未解决，可咨询在线客服")])])
            }]
        };
        var tt = e("VU/8")({
            name: "boutBallBet",
            data: function() {
                return {
                    url: null
                }
            },
            created: function() {},
            methods: {},
            mounted: function() {},
            updated: function() {}
        },
        Z, !1,
        function(t) {
            e("JOYd")
        },
        "data-v-15276896", null).exports,
        at = {
            render: function() {
                var t = this,
                a = t.$createElement,
                e = t._self._c || a;
                return e("div", {
                    staticClass: "sdddd"
                },
                [e("div", {
                    staticStyle: {
                        height: "180px"
                    }
                }), t._v(" "), e("img", {
                    staticClass: "bancgs",
                    attrs: {
                        src: "/static/image/bank_020021515.png",
                        alt: ""
                    },
                    on: {
                        click: function(a) {
                            return t.$router.back()
                        }
                    }
                }), t._v(" "), e("div", {
                    staticClass: "topsf"
                },
                [t._m(0), t._v(" "), e("div", {
                    staticStyle: {
                        color: "#fff",
                        "text-align": "center",
                        "margin-top": "10px",
                        "font-size": "20px"
                    }
                },
                [t._v(t._s(t.title))])]), t._v(" "), e("div", {
                    staticStyle: {
                        color: "#666",
                        padding: "0px 20px",
                        "box-sizing": "border-box"
                    },
                    domProps: {
                        innerHTML: t._s(t.dataBox.content)
                    }
                }), t._v(" "), t.dataBox.content ? e("div", {
                    staticStyle: {
                        "margin-top": "0.48rem",
                        "text-align": "center",
                        color: "#6c7c9d",
                        "padding-bottom": "0.6rem"
                    }
                },
                [t._v("没有找到解决办法？请联系"), e("a", {
                    staticStyle: {
                        color: "#597ef7",
                        "font-weight": "600"
                    },
                    on: {
                        click: t.$parent.openKefu
                    }
                },
                [t._v("人工客服")]), t._v("解决")]) : t._e()])
            },
            staticRenderFns: [function() {
                var t = this.$createElement,
                a = this._self._c || t;
                return a("div", {
                    staticClass: "tois"
                },
                [a("img", {
                    attrs: {
                        src: "/static/style/tx.0d38194b71b5a32ef1df50b7090ca7f5.png",
                        alt: ""
                    }
                }), this._v(" "), a("div", {
                    staticClass: "dwd"
                },
                [a("div", {
                    staticClass: "tisaa"
                },
                [this._v("Hi,尊敬的会员用户")]), this._v(" "), a("div", {
                    staticClass: "newsa"
                },
                [this._v("早上好，欢迎来到帮助中心")]), this._v(" "), a("div", {
                    staticClass: "newsa"
                },
                [this._v("若相关问题仍未解决，可咨询在线客服")])])])
            }]
        };
        var et = e("VU/8")({
            name: "boutBallBetInfo",
            data: function() {
                return {
                    title: "",
                    type: 0,
                    dataBox: {}
                }
            },
            created: function() {
                var t = this.$route.query;
                if (t.type) {
                    var a = 1 * t.type;
                    this.type = a,
                    1 == a && (this.title = "常见问题"),
                    2 == a && (this.title = "隐私政策"),
                    3 == a && (this.title = "免责说明"),
                    4 == a && (this.title = "联系我们"),
                    5 == a && (this.title = "代理加盟"),
                    7 == a && (this.title = "关于我们"),
                    8 == a && (this.title = "博彩责任"),
                    this.getAllCont(a)
                }
            },
            methods: {
                getAllCont: function(t) {
                    var a = this;
                    a.$parent.showLoading(),
                    a.$apiFun.post("/api/article", {
                        type: t
                    }).then(function(t) {
                        a.dataBox = t.data,
                        a.$parent.hideLoading()
                    }).
                    catch(function(t) {
                        a.$parent.hideLoading()
                    })
                }
            },
            mounted: function() {},
            updated: function() {}
        },
        at, !1,
        function(t) {
            e("QhRG")
        },
        "data-v-40758cc9", null).exports,
        it = {
            name: "message",
            data: function() {
                return {
                    type: 1,
                    noticeList: [],
                    homenoticelis: [],
                    noticeListInfo: {},
                    page: 1
                }
            },
            created: function() {
                var t = this.$route.query;
                t.type && (this.type = 1 * t.type),
                this.homenotice(),
                this.getDatalist()
            },
            methods: {
                changType: function(t) {
                    this.type = t
                },
                homenotice: function() {
                    var t = this;
                    t.$parent.showLoading(),
                    t.$apiFun.post("/api/homenotice", {}).then(function(a) {
                        200 != a.code && t.showTost(0, a.message),
                        200 == a.code && (t.homenoticelis = a.data),
                        t.$parent.hideLoading()
                    })
                },
                getDatalist: function() {
                    var t = this,
                    a = t.page;
                    a > t.noticeListInfo.last_page ? t.loading = !1 : (t.$parent.showLoading(), t.$apiFun.post("/api/noticeList", {
                        page: a
                    }).then(function(e) {
                        if (200 != e.code && t.$parent.showTost(0, e.message), 200 == e.code) {
                            if (t.noticeListInfo = e.data, 1 == a) t.noticeList = e.data.data;
                            else {
                                var i = JSON.parse(n()(t.list4));
                                e.data.data.forEach(function(t) {
                                    i.push(t)
                                }),
                                t.noticeList = i
                            }
                            t.page = a + 1
                        }
                        t.loading = !1,
                        t.$parent.hideLoading()
                    }).
                    catch(function(a) {
                        t.$parent.hideLoading()
                    }))
                }
            },
            mounted: function() {},
            updated: function() {},
            beforeDestroy: function() {}
        },
        st = {
            render: function() {
                var t = this,
                a = t.$createElement,
                e = t._self._c || a;
                return e("div", [e("van-nav-bar", {
                    staticStyle: {
                        position: "fixed",
                        top: "0",
                        left: "0",
                        width: "100%",
                        "background-color": "#edf2fd"
                    },
                    attrs: {
                        title: "消息中心",
                        "left-arrow": ""
                    },
                    on: {
                        "click-left": function(a) {
                            return t.$router.back()
                        }
                    }
                }), t._v(" "), e("div", {
                    staticStyle: {
                        height: "60px"
                    }
                }), t._v(" "), e("div", {
                    staticClass: "van-tabs-view van-tabs"
                },
                [e("div", {
                    staticClass: "van-tabs__wrap"
                },
                [e("div", {
                    staticClass: "van-tabs__nav van-tabs__nav--card",
                    attrs: {
                        role: "tablist"
                    }
                },
                [e("div", {
                    class: 1 == t.type ? "van-tab van-tab--active": "van-tab",
                    attrs: {
                        role: "tab",
                        "aria-selected": "true"
                    },
                    on: {
                        click: function(a) {
                            return t.changType(1)
                        }
                    }
                },
                [e("span", {
                    staticClass: "van-tab__text van-tab__text--ellipsis"
                },
                [t._v("公告")])]), t._v(" "), e("div", {
                    class: 2 == t.type ? "van-tab van-tab--active": "van-tab",
                    attrs: {
                        role: "tab"
                    },
                    on: {
                        click: function(a) {
                            return t.changType(2)
                        }
                    }
                },
                [t._m(0)])])]), t._v(" "), e("div", {
                    staticClass: "van-tabs__content",
                    staticStyle: {
                        width: "90%",
                        margin: "0 auto"
                    }
                },
                [1 == t.type ? e("div", {
                    staticClass: "van-tab__pane",
                    attrs: {
                        role: "tabpanel"
                    }
                },
                [t.homenoticelis.length > 0 ? e("van-list", {
                    attrs: {
                        "finished-text": "没有更多了",
                        finished: !0
                    }
                },
                t._l(t.homenoticelis,
                function(a, i) {
                    return e("van-cell", {
                        key: i
                    },
                    [e("div", {
                        staticClass: "content"
                    },
                    [t._v(t._s(a))])])
                }), 1) : e("van-divider", {
                    style: {
                        color: "#ccc",
                        borderColor: "#ccc",
                        padding: "20px 100px"
                    },
                    attrs: {
                        dashed: ""
                    }
                },
                [t._v("没有更多了~")])], 1) : t._e(), t._v(" "), 2 == t.type ? e("div", {
                    staticClass: "van-tab__pane",
                    attrs: {
                        role: "tabpanel"
                    }
                },
                [t.noticeList.length > 0 ? e("van-list", {
                    attrs: {
                        "finished-text": "没有更多了",
                        offset: "300",
                        finished: t.noticeList.length == t.noticeListInfo.total
                    },
                    on: {
                        load: t.getDatalist
                    },
                    model: {
                        value: t.loading,
                        callback: function(a) {
                            t.loading = a
                        },
                        expression: "loading"
                    }
                },
                t._l(t.noticeList,
                function(a, i) {
                    return e("van-cell", {
                        key: i
                    },
                    [e("h3", {
                        staticClass: "unReadTitle"
                    },
                    [e("span", [t._v(t._s(a.title))])]), t._v(" "), e("div", {
                        staticClass: "content",
                        domProps: {
                            innerHTML: t._s(a.content)
                        }
                    },
                    [t._v(t._s(a))]), t._v(" "), e("div", {
                        staticClass: "content"
                    },
                    [t._v(t._s(a.created_at))])])
                }), 1) : e("van-divider", {
                    style: {
                        color: "#ccc",
                        borderColor: "#ccc",
                        padding: "20px 100px"
                    },
                    attrs: {
                        dashed: ""
                    }
                },
                [t._v("没有更多了~")])], 1) : t._e()])])], 1)
            },
            staticRenderFns: [function() {
                var t = this.$createElement,
                a = this._self._c || t;
                return a("span", {
                    staticClass: "van-tab__text van-tab__text--ellipsis"
                },
                [a("span", [this._v("站内信")])])
            }]
        };
        var nt = e("VU/8")(it, st, !1,
        function(t) {
            e("o3h8")
        },
        "data-v-3f3101ca", null).exports,
        ot = {
            name: "fanshui",
            data: function() {
                return {
                    date: 4,
                    list: [],
                    pageData: {},
                    page: 1,
                    dogameLis: [],
                    api_type: "",
                    loading: !1,
                    name: "全平台",
                    show: !1,
                    jisuan: 0,
                    nojisuan: 0,
                    dateName: ["", "今日", "近7日", "近15日", "近30日"],
                    popup: !1,
                    showXuan: 1
                }
            },
            created: function() {
                this.getdogame(),
                this.getData()
            },
            methods: {
                changDogame: function(t, a) {
                    this.name = t,
                    this.api_type = a,
                    this.popup = !1,
                    this.page = 1,
                    this.getData()
                },
                changtype: function(t, a) {
                    this[t] = a,
                    this.popup = !1,
                    this.page = 1,
                    this.getData()
                },
                showPopup: function(t) {
                    this.popup = !0,
                    this.showXuan = t
                },
                lingqu: function() {
                    var t = this;
                    t.nojisuan <= 0 ? t.$parent.showTost(0, "暂无领取额度！") : (t.$parent.showLoading(), t.$apiFun.post("/api/dofanshui", {}).then(function(a) {
                        console.log(a),
                        t.$parent.getUserInfo(),
                        t.$parent.showTost(1, a.message),
                        t.getfanshui()
                    }).
                    catch(function(a) {
                        t.$parent.hideLoading()
                    }))
                },
                openOrclose: function() {
                    this.show = !this.show
                },
                changtab: function() {
                    this.page = 1,
                    this.list = [],
                    this.pageData = {},
                    this.getData()
                },
                getdogame: function() {
                    var t = this;
                    t.$apiFun.post("/api/balancelist", {}).then(function(a) {
                        console.log(a),
                        200 != a.code && t.$parent.showTost(a.message),
                        200 == a.code && (t.dogameLis = a.data, t.dogameLis.unshift({
                            name: "全平台",
                            platname: ""
                        }))
                    })
                },
                changeDate: function() {
                    this.page = 1,
                    this.getData()
                },
                getData: function() {
                    var t = this,
                    a = t.page;
                    if (a > t.pageData.last_page) t.loading = !1;
                    else {
                        t.$parent.showLoading();
                        var e = {
                            date: t.date,
                            page: t.page,
                            api_type: t.api_type,
                            type: ""
                        };
                        t.$apiFun.post("/api/getfanshui", e).then(function(e) {
                            if (200 != e.code && t.$parent.showTost(0, e.message), 200 == e.code) {
                                if (t.pageData = e.data.list, t.jisuan = e.data.jisuan, t.nojisuan = e.data.nojisuan, 1 == t.page) t.list = e.data.list.data;
                                else {
                                    var i = JSON.parse(n()(t.list));
                                    e.data.list.data.forEach(function(t) {
                                        i.push(t)
                                    }),
                                    t.list = i
                                }
                                t.page = a + 1
                            }
                            t.loading = !1,
                            t.$parent.hideLoading()
                        }).
                        catch(function(a) {
                            t.$parent.hideLoading(),
                            t.loading = !1
                        })
                    }
                }
            },
            mounted: function() {},
            updated: function() {}
        },
        rt = {
            render: function() {
                var t = this,
                a = t.$createElement,
                e = t._self._c || a;
                return e("div", {
                    staticStyle: {
                        width: "100%",
                        "min-height": "100vh",
                        background: "rgb(237, 241, 255)"
                    }
                },
                [e("van-nav-bar", {
                    staticStyle: {
                        position: "fixed",
                        top: "0",
                        left: "0",
                        width: "100%",
                        "background-color": "#edf2fd"
                    },
                    attrs: {
                        title: "返水中心",
                        "left-arrow": ""
                    },
                    on: {
                        "click-left": function(a) {
                            return t.$router.back()
                        }
                    }
                }), t._v(" "), e("div", {
                    staticStyle: {
                        height: "46px"
                    }
                }), t._v(" "), e("div", {
                    staticStyle: {
                        width: "95%",
                        "min-width": "250px",
                        margin: "0 auto",
                        background: "#fff",
                        "border-radius": "10px",
                        "box-sizing": "border-box",
                        padding: "10px",
                        "min-height": "90vh"
                    }
                },
                [e("div", {
                    staticStyle: {
                        "padding-bottom": "10px",
                        display: "flex",
                        "align-items": "center",
                        "justify-content": "space-between"
                    }
                },
                [e("span", {
                    staticStyle: {
                        "font-size": "0.3rem"
                    }
                },
                [t._v(" 返水记录 ")]), t._v(" "), e("van-button", {
                    staticStyle: {
                        width: "3rem",
                        height: "0.68rem",
                        "min-width": "80px"
                    },
                    attrs: {
                        type: "info"
                    },
                    on: {
                        click: t.lingqu
                    }
                },
                [e("span", {
                    staticStyle: {
                        color: "#fff",
                        "font-size": "0.3rem"
                    }
                },
                [t._v("点击领取")])])], 1), t._v(" "), e("div", {
                    staticStyle: {
                        display: "flex",
                        "box-sizing": "border-box",
                        padding: "0 12px",
                        "font-size": "0.3rem",
                        "justify-content": "space-between",
                        height: "1.1rem",
                        "align-items": "center",
                        "border-bottom": "1px solid #f1f1f1"
                    }
                },
                [e("div", {
                    staticStyle: {
                        "font-size": "0.3rem",
                        "text-align": "center",
                        width: "49%"
                    }
                },
                [e("div", {
                    staticStyle: {
                        "font-size": "0.3rem"
                    }
                },
                [t._v("累计领取")]), t._v(" "), e("div", {
                    staticStyle: {
                        "font-size": "0.3rem",
                        color: "#597ef7",
                        "font-weight": "700"
                    }
                },
                [t._v("￥" + t._s(t.jisuan))])]), t._v(" "), e("div", {
                    staticStyle: {
                        height: "76%",
                        "border-left": "1px solid #f1f1f1"
                    }
                }), t._v(" "), e("div", {
                    staticStyle: {
                        "font-size": "0.3rem",
                        "text-align": "center",
                        width: "49%"
                    }
                },
                [e("div", {
                    staticStyle: {
                        "font-size": "0.3rem"
                    }
                },
                [t._v("待领取")]), t._v(" "), e("div", {
                    staticStyle: {
                        "font-size": "0.3rem",
                        color: "#597ef7",
                        "font-weight": "700"
                    }
                },
                [t._v("￥" + t._s(t.nojisuan))])])]), t._v(" "), e("div", {
                    staticClass: "saibox"
                },
                [e("div", {
                    staticClass: "sai",
                    on: {
                        click: function(a) {
                            return t.showPopup(1)
                        }
                    }
                },
                [t._v(t._s(t.name))]), t._v(" "), e("div", {
                    staticClass: "sai",
                    on: {
                        click: function(a) {
                            return t.showPopup(2)
                        }
                    }
                },
                [t._v(t._s(t.dateName[t.date]))])]), t._v(" "), t.list.length > 0 ? e("van-list", {
                    staticStyle: {
                        "margin-top": "10px",
                        "padding-bottom": "120px"
                    },
                    attrs: {
                        "finished-text": "没有更多了",
                        offset: "300",
                        finished: t.list.length == t.pageData.total
                    },
                    on: {
                        load: t.getData
                    },
                    model: {
                        value: t.loading,
                        callback: function(a) {
                            t.loading = a
                        },
                        expression: "loading"
                    }
                },
                t._l(t.list,
                function(a, i) {
                    return e("van-cell", {
                        key: i
                    },
                    [e("div", {
                        staticStyle: {
                            color: "#888 !important"
                        }
                    },
                    [e("div", {
                        staticStyle: {
                            display: "flex",
                            "justify-content": "space-between",
                            "font-size": "0.3rem"
                        }
                    },
                    [t._v("\n            " + t._s(a.gamename) + " "), e("span", {
                        staticStyle: {
                            "font-size": "0.3rem"
                        }
                    },
                    [t._v("返水金额 :" + t._s(a.money))])]), t._v(" "), e("div", {
                        staticStyle: {
                            "font-size": "0.3rem"
                        }
                    },
                    [t._v("返水时间:" + t._s(a.created_at))]), t._v(" "), e("div", {
                        staticStyle: {
                            "font-size": "0.3rem"
                        }
                    },
                    [t._v("领取时间：" + t._s(0 == a.state ? "暂未领取": a.updated_at))])])])
                }), 1) : e("div", {
                    staticStyle: {
                        "margin-top": "60px",
                        "text-align": "center"
                    }
                },
                [e("img", {
                    staticStyle: {
                        width: "35%"
                    },
                    attrs: {
                        src: "/static/image/mescroll-empty.png",
                        alt: ""
                    }
                }), t._v(" "), e("van-divider", {
                    style: {
                        color: "#ccc",
                        borderColor: "#ccc",
                        padding: "20px "
                    },
                    attrs: {
                        dashed: ""
                    }
                },
                [t._v("空空如也")])], 1)], 1), t._v(" "), e("van-popup", {
                    style: {
                        height: "calc(100% - 3.9rem - 46px)"
                    },
                    attrs: {
                        position: "bottom"
                    },
                    model: {
                        value: t.popup,
                        callback: function(a) {
                            t.popup = a
                        },
                        expression: "popup"
                    }
                },
                [1 == t.showXuan ? e("div", {
                    staticClass: "lisg"
                },
                t._l(t.dogameLis,
                function(a, i) {
                    return e("div", {
                        key: i,
                        staticClass: "bs",
                        on: {
                            click: function(e) {
                                return t.changDogame(a.name, a.platname)
                            }
                        }
                    },
                    [e("div", {
                        class: t.api_type == a.platname ? "lisga act": "lisga"
                    },
                    [t._v(t._s(a.name))])])
                }), 0) : t._e(), t._v(" "), 2 == t.showXuan ? e("div", {
                    staticClass: "lisg"
                },
                [e("div", {
                    staticClass: "bs",
                    on: {
                        click: function(a) {
                            return t.changtype("date", 1)
                        }
                    }
                },
                [e("div", {
                    class: 1 == t.date ? "lisga act": "lisga"
                },
                [t._v("今日")])]), t._v(" "), e("div", {
                    staticClass: "bs",
                    on: {
                        click: function(a) {
                            return t.changtype("date", 2)
                        }
                    }
                },
                [e("div", {
                    class: 2 == t.date ? "lisga act": "lisga"
                },
                [t._v("近7日")])]), t._v(" "), e("div", {
                    staticClass: "bs",
                    on: {
                        click: function(a) {
                            return t.changtype("date", 3)
                        }
                    }
                },
                [e("div", {
                    class: 3 == t.date ? "lisga act": "lisga"
                },
                [t._v("近15日")])]), t._v(" "), e("div", {
                    staticClass: "bs",
                    on: {
                        click: function(a) {
                            return t.changtype("date", 4)
                        }
                    }
                },
                [e("div", {
                    class: 4 == t.date ? "lisga act": "lisga"
                },
                [t._v("近30日")])])]) : t._e()])], 1)
            },
            staticRenderFns: []
        };
        var ct = e("VU/8")(ot, rt, !1,
        function(t) {
            e("KwRj")
        },
        "data-v-88760572", null).exports,
        lt = e("bOdI"),
        dt = e.n(lt),
        vt = {
            name: "userInfo",
            data: function() {
                return {
                    mobile: null,
                    email: null,
                    birthday: null,
                    showPicker: !1,
                    minDate: new Date(1980, 0, 1)
                }
            },
            created: function() {
                var t = JSON.parse(localStorage.getItem("userInfo"));
                this.mobile = t.mobile,
                this.email = t.email,
                this.birthday = t.birthday
            },
            methods: dt()({
                onchangemd: function(t) {
                    var a = this;
                    console.log(t.target.files);
                    var e = new FormData;
                    z()(t.target.files).map(function(t) {
                        console.log(t),
                        e.append("file", t)
                    }),
                    a.$parent.showLoading(),
                    a.$apiFun.post("/api/uploadimg", e).then(function(t) {
                        a.$parent.hideLoading(),
                        a.$parent.getUserInfoShowLoding()
                    })
                },
                timeFormat: function(t) {
                    return (t = new Date(t.getTime() + 288e5)).toJSON().split("T").join(" ").substr(0, 10)
                },
                changShow: function() {
                    this.showPicker = !this.showPicker,
                    console.log(123)
                },
                onConfirm: function(t) {
                    this.birthday = this.timeFormat(t),
                    this.showPicker = !1
                },
                isOk: function() {
                    var t = this,
                    a = {
                        email: t.email,
                        mobile: t.mobile,
                        birthday: t.birthday
                    };
                    console.log(t.birthday);
                    /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(t.mobile) ? /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(t.email) ? /^(\d{4})-(\d{2})-(\d{2})$/.test(t.birthday) ? (t.$parent.showLoading(), t.$apiFun.post("/api/updateuserinfo", a).then(function(e) {
                        if (console.log(e), 200 != e.code && t.$parent.showTost(0, e.message), 200 == e.code) {
                            var i = JSON.parse(localStorage.getItem("userInfo"));
                            i.mobile = a.mobile,
                            i.email = a.email,
                            i.birthday = a.birthday,
                            localStorage.setItem("userInfo", n()(i)),
                            t.$parent.getUserInfo(),
                            t.$parent.showTost(1, "操作成功")
                        }
                        t.$parent.hideLoading()
                    }).
                    catch(function(a) {
                        t.$parent.hideLoading()
                    })) : t.$parent.showTost(0, "请输入正确的日期格式：YYYY-MM-DD") : t.$parent.showTost(0, "请输入正确邮箱号") : t.$parent.showTost(0, "请输入正确手机号")
                }
            },
            "onchangemd",
            function(t) {
                var a = this;
                console.log(t.target.files);
                var e = new FormData;
                z()(t.target.files).map(function(t) {
                    console.log(t),
                    e.append("file", t)
                }),
                a.$parent.showLoading(),
                a.$apiFun.post("/api/uploadimg", e).then(function(t) {
                    a.$parent.getUserInfoShowLoding()
                })
            }),
            mounted: function() {},
            updated: function() {}
        },
        pt = {
            render: function() {
                var t = this,
                a = t.$createElement,
                e = t._self._c || a;
                return e("div", {
                    staticStyle: {
                        width: "100%",
                        "min-height": "100vh",
                        background: "#f1f1f1"
                    }
                },
                [e("van-nav-bar", {
                    staticStyle: {
                        position: "fixed",
                        top: "0",
                        left: "0",
                        width: "100%",
                        "background-color": "#edf2fd"
                    },
                    attrs: {
                        title: "个人资料",
                        "left-arrow": ""
                    },
                    on: {
                        "click-left": function(a) {
                            return t.$router.back()
                        }
                    }
                }), t._v(" "), e("div", {
                    staticStyle: {
                        height: "46px"
                    }
                }), t._v(" "), e("div", {
                    staticClass: "usrse"
                },
                [e("div", {
                    staticClass: "hgs"
                },
                [e("div", {
                    staticClass: "nams"
                },
                [t._v("个人头像")]), t._v(" "), e("div", {
                    staticClass: "imgsa"
                },
                [e("img", {
                    attrs: {
                        mode: "aspectFill",
                        src: t.$store.state.userInfo.avatar ? t.$store.state.userInfo.avatar: "/static/image/imageAvatar02@3x.png",
                        alt: ""
                    }
                }), t._v(" "), e("input", {
                    staticClass: "inputsw",
                    attrs: {
                        type: "file",
                        single: "",
                        accept: "image/gif,image/png"
                    },
                    on: {
                        change: t.onchangemd
                    }
                }), t._v(" "), e("img", {
                    staticClass: "bisn",
                    attrs: {
                        mode: "aspectFill",
                        src: "/static/image/avatarEdit.cf65ea838bb7aba043f461f551f740ac.png"
                    }
                })])]), t._v(" "), e("div", {
                    staticClass: "hgs"
                },
                [e("div", {
                    staticClass: "nams"
                },
                [t._v("用户名")]), t._v(" "), e("div", {
                    staticStyle: {
                        "border-bottom": "1px solid #f2f2f2"
                    }
                },
                [e("van-cell-group", [e("van-field", {
                    attrs: {
                        placeholder: "请输入用户名",
                        disabled: ""
                    },
                    model: {
                        value: t.$store.state.userInfo.username,
                        callback: function(a) {
                            t.$set(t.$store.state.userInfo, "username", a)
                        },
                        expression: "$store.state.userInfo.username"
                    }
                })], 1)], 1)]), t._v(" "), e("div", {
                    staticClass: "hgs"
                },
                [e("div", {
                    staticClass: "nams"
                },
                [t._v("真实姓名")]), t._v(" "), e("div", {
                    staticStyle: {
                        "border-bottom": "1px solid #f2f2f2"
                    }
                },
                [e("van-cell-group", [e("van-field", {
                    attrs: {
                        placeholder: "请输入真实姓名",
                        disabled: ""
                    },
                    model: {
                        value: t.$store.state.userInfo.realname,
                        callback: function(a) {
                            t.$set(t.$store.state.userInfo, "realname", a)
                        },
                        expression: "$store.state.userInfo.realname"
                    }
                })], 1)], 1)]), t._v(" "), e("div", {
                    staticClass: "hgs",
                    on: {
                        click: t.changShow
                    }
                },
                [e("div", {
                    staticClass: "nams"
                },
                [t._v("出生日期")]), t._v(" "), e("div", {
                    staticStyle: {
                        "border-bottom": "1px solid #f2f2f2"
                    }
                },
                [e("van-cell-group", [e("van-field", {
                    attrs: {
                        placeholder: "请选择出入日期",
                        disabled: ""
                    },
                    model: {
                        value: t.birthday,
                        callback: function(a) {
                            t.birthday = a
                        },
                        expression: "birthday"
                    }
                })], 1)], 1)]), t._v(" "), e("div", {
                    staticClass: "hgs"
                },
                [e("div", {
                    staticClass: "nams"
                },
                [t._v("手机号码")]), t._v(" "), e("div", {
                    staticStyle: {
                        "border-bottom": "1px solid #f2f2f2"
                    }
                },
                [e("van-cell-group", [e("van-field", {
                    attrs: {
                        placeholder: "绑定手机号，保障账号安全"
                    },
                    model: {
                        value: t.mobile,
                        callback: function(a) {
                            t.mobile = a
                        },
                        expression: "mobile"
                    }
                })], 1)], 1)]), t._v(" "), e("div", {
                    staticClass: "hgs"
                },
                [e("div", {
                    staticClass: "nams"
                },
                [t._v("电子邮箱")]), t._v(" "), e("div", {
                    staticStyle: {
                        "border-bottom": "1px solid #f2f2f2"
                    }
                },
                [e("van-cell-group", [e("van-field", {
                    attrs: {
                        placeholder: "绑定邮箱保护账号安全"
                    },
                    model: {
                        value: t.email,
                        callback: function(a) {
                            t.email = a
                        },
                        expression: "email"
                    }
                })], 1)], 1)]), t._v(" "), e("van-button", {
                    staticStyle: {
                        "margin-top": "20px",
                        width: "100%"
                    },
                    attrs: {
                        type: "info"
                    },
                    on: {
                        click: t.isOk
                    }
                },
                [t._v("确认修改")])], 1), t._v(" "), t.showPicker ? e("van-datetime-picker", {
                    staticStyle: {
                        position: "fixed",
                        width: "100%",
                        bottom: "0px",
                        left: "0",
                        background: "#f1f1f1"
                    },
                    attrs: {
                        type: "date",
                        "min-date": t.minDate
                    },
                    on: {
                        confirm: t.onConfirm,
                        cancel: t.changShow
                    }
                }) : t._e()], 1)
            },
            staticRenderFns: []
        };
        var ut = e("VU/8")(vt, pt, !1,
        function(t) {
            e("3Jyr")
        },
        "data-v-64c53ec4", null).exports,
        ft = {
            render: function() {
                var t = this,
                a = t.$createElement,
                e = t._self._c || a;
                return e("div", {
                    staticStyle: {
                        width: "100%",
                        "min-height": "100vh",
                        background: "#f1f1f1"
                    }
                },
                [e("van-nav-bar", {
                    staticStyle: {
                        position: "fixed",
                        top: "0",
                        left: "0",
                        width: "100%",
                        "background-color": "#edf2fd"
                    },
                    attrs: {
                        title: "个人资料",
                        "left-arrow": ""
                    },
                    on: {
                        "click-left": function(a) {
                            return t.$router.back()
                        }
                    }
                }), t._v(" "), e("div", {
                    staticStyle: {
                        height: "46px"
                    }
                }), t._v(" "), t._m(0), t._v(" "), e("div", {
                    staticClass: "boxst"
                },
                [e("div", {
                    staticClass: "hgs",
                    on: {
                        click: function(a) {
                            return t.$parent.goNav("/userInfo")
                        }
                    }
                },
                [t._m(1), t._v(" "), t._m(2)]), t._v(" "), e("div", {
                    staticClass: "hgs",
                    on: {
                        click: function(a) {
                            return t.$parent.goNav("/wallet")
                        }
                    }
                },
                [t._m(3), t._v(" "), t._m(4)]), t._v(" "), e("div", {
                    staticClass: "hgs",
                    on: {
                        click: function(a) {
                            return t.$parent.goNav("/password?type=1")
                        }
                    }
                },
                [t._m(5), t._v(" "), t._m(6)]), t._v(" "), e("div", {
                    staticClass: "hgs",
                    on: {
                        click: function(a) {
                            return t.$parent.goNav("/password?type=2")
                        }
                    }
                },
                [t._m(7), t._v(" "), t._m(8)])])], 1)
            },
            staticRenderFns: [function() {
                var t = this.$createElement,
                a = this._self._c || t;
                return a("div", {
                    staticClass: "tops"
                },
                [a("img", {
                    attrs: {
                        src: "/static/image/safety.d3a323b5ad7cca95958707791f3861b1.png",
                        alt: ""
                    }
                }), this._v(" "), a("div", {
                    staticClass: "tes"
                },
                [this._v("完善账户信息，更安全")])])
            },
            function() {
                var t = this.$createElement,
                a = this._self._c || t;
                return a("div", {
                    staticClass: "lfs"
                },
                [a("div", {
                    staticClass: "topas"
                },
                [this._v("完善个人资料")]), this._v(" "), a("div", {
                    staticClass: "tisg"
                },
                [this._v("资料更完整，我们的服务更加周到")])])
            },
            function() {
                var t = this.$createElement,
                a = this._self._c || t;
                return a("div", {
                    staticClass: "rigs"
                },
                [this._v("去完善 "), a("img", {
                    attrs: {
                        src: "/static/image/right.b9a9c7c64558347505384ad01922580c.png",
                        alt: ""
                    }
                })])
            },
            function() {
                var t = this.$createElement,
                a = this._self._c || t;
                return a("div", {
                    staticClass: "lfs"
                },
                [a("div", {
                    staticClass: "topas"
                },
                [this._v("卡片管理")]), this._v(" "), a("div", {
                    staticClass: "tisg"
                },
                [this._v("如需提现，请绑定银行卡或虚拟币地址")])])
            },
            function() {
                var t = this.$createElement,
                a = this._self._c || t;
                return a("div", {
                    staticClass: "rigs"
                },
                [a("img", {
                    attrs: {
                        src: "/static/image/right.b9a9c7c64558347505384ad01922580c.png",
                        alt: ""
                    }
                })])
            },
            function() {
                var t = this.$createElement,
                a = this._self._c || t;
                return a("div", {
                    staticClass: "lfs"
                },
                [a("div", {
                    staticClass: "topas"
                },
                [this._v("登录密码管理")]), this._v(" "), a("div", {
                    staticClass: "tisg"
                },
                [this._v("定期修改登录密码，有利账户安全")])])
            },
            function() {
                var t = this.$createElement,
                a = this._self._c || t;
                return a("div", {
                    staticClass: "rigs"
                },
                [a("img", {
                    attrs: {
                        src: "/static/image/right.b9a9c7c64558347505384ad01922580c.png",
                        alt: ""
                    }
                })])
            },
            function() {
                var t = this.$createElement,
                a = this._self._c || t;
                return a("div", {
                    staticClass: "lfs"
                },
                [a("div", {
                    staticClass: "topas"
                },
                [this._v("取款密码管理")]), this._v(" "), a("div", {
                    staticClass: "tisg"
                },
                [this._v("定期修改登录密码，有利账户安全")])])
            },
            function() {
                var t = this.$createElement,
                a = this._self._c || t;
                return a("div", {
                    staticClass: "rigs"
                },
                [a("img", {
                    attrs: {
                        src: "/static/image/right.b9a9c7c64558347505384ad01922580c.png",
                        alt: ""
                    }
                })])
            }]
        };
        var gt = e("VU/8")({
            name: "userCent",
            data: function() {
                return {}
            },
            created: function() {},
            methods: {},
            mounted: function() {},
            updated: function() {}
        },
        ft, !1,
        function(t) {
            e("v0lD")
        },
        "data-v-5575261c", null).exports,
        ht = {
            render: function() {
                var t = this,
                a = t.$createElement,
                e = t._self._c || a;
                return e("div", {
                    staticStyle: {
                        width: "100%",
                        "min-height": "100vh",
                        background: "rgb(237, 241, 255)"
                    }
                },
                [e("van-nav-bar", {
                    staticStyle: {
                        position: "fixed",
                        top: "0",
                        left: "0",
                        width: "100%",
                        "background-color": "#edf2fd"
                    },
                    attrs: {
                        title: "卡片管理",
                        "left-arrow": ""
                    },
                    on: {
                        "click-left": function(a) {
                            return t.$router.back()
                        }
                    }
                }), t._v(" "), e("div", {
                    staticStyle: {
                        height: "46px"
                    }
                }), t._v(" "), e("van-tabs", {
                    model: {
                        value: t.type,
                        callback: function(a) {
                            t.type = a
                        },
                        expression: "type"
                    }
                },
                [e("van-tab", {
                    attrs: {
                        title: "虚拟币",
                        name: "1"
                    }
                },
                [t._l(t.usdssLis,
                function(a, i) {
                    return e("div", {
                        key: i,
                        staticClass: "lis"
                    },
                    [e("img", {
                        staticClass: "lefs",
                        attrs: {
                            src: "/static/image/1595237922936176.png",
                            alt: ""
                        }
                    }), t._v(" "), e("div", {
                        staticClass: "cest"
                    },
                    [e("div", {
                        staticClass: "type"
                    },
                    [t._v(t._s(a.bank) + "-" + t._s(a.bank_owner))]), t._v(" "), e("div", {
                        staticClass: "num"
                    },
                    [e("span", [t._v("****")]), e("span", [t._v("****")]), e("span", [t._v("****")]), e("span", [t._v(t._s(a.bank_no.substr( - 4)))])])]), t._v(" "), e("img", {
                        staticClass: "rigss",
                        attrs: {
                            src: "/static/style/wdb_icon.png",
                            alt: ""
                        },
                        on: {
                            click: function(e) {
                                return t.delCard(a.id)
                            }
                        }
                    })])
                }), t._v(" "), e("div", {
                    staticClass: "adds"
                },
                [t.usdssLis.length < 5 ? e("van-button", {
                    staticStyle: {
                        width: "100%"
                    },
                    attrs: {
                        plain: "",
                        type: "info"
                    },
                    on: {
                        click: function(a) {
                            return t.$parent.goNav("/addUsdtCard")
                        }
                    }
                },
                [t._v("添加USDT地址")]) : t._e(), t._v(" "), e("div", {
                    staticClass: "btntits"
                },
                [t._v("最多支持添加5个地址")])], 1)], 2), t._v(" "), e("van-tab", {
                    attrs: {
                        title: "银行卡",
                        name: "2"
                    }
                },
                [t._l(t.usercardLis,
                function(a, i) {
                    return e("div", {
                        key: i,
                        staticClass: "lis"
                    },
                    [e("img", {
                        staticClass: "lefs",
                        attrs: {
                            src: a.ico,
                            alt: ""
                        }
                    }), t._v(" "), e("div", {
                        staticClass: "cest"
                    },
                    [e("div", {
                        staticClass: "type"
                    },
                    [t._v(t._s(a.bank))]), t._v(" "), e("div", {
                        staticClass: "type"
                    },
                    [t._v(t._s(a.bank_owner))]), t._v(" "), e("div", {
                        staticClass: "num"
                    },
                    [e("span", [t._v("****")]), e("span", [t._v("****")]), e("span", [t._v("****")]), e("span", [t._v(t._s(a.bank_no.substr( - 4)))])])]), t._v(" "), e("img", {
                        staticClass: "rigss",
                        attrs: {
                            src: "/static/style/wdb_icon.png",
                            alt: ""
                        },
                        on: {
                            click: function(e) {
                                return t.delCard(a.id)
                            }
                        }
                    })])
                }), t._v(" "), e("div", {
                    staticClass: "adds"
                },
                [t.usercardLis.length < 5 ? e("van-button", {
                    staticStyle: {
                        width: "100%"
                    },
                    attrs: {
                        plain: "",
                        type: "info"
                    },
                    on: {
                        click: function(a) {
                            return t.$parent.goNav("/addBankCard")
                        }
                    }
                },
                [t._v("添加银行卡")]) : t._e(), t._v(" "), e("div", {
                    staticClass: "btntits"
                },
                [t._v("最多支持添加5张银行卡")])], 1)], 2)], 1)], 1)
            },
            staticRenderFns: []
        };
        var _t = e("VU/8")({
            name: "wallet",
            data: function() {
                return {
                    usercardLis: [],
                    usdssLis: [],
                    type: 1
                }
            },
            created: function() {
                var t = this.$route.query;
                t.type && (this.type = t.type),
                this.getUsercard(),
                this.getUsdssList()
            },
            methods: {
                delCard: function(t) {
                    var a = this;
                    a.$dialog.confirm({
                        title: "温馨提示",
                        message: "确定要解除绑定该卡片吗？"
                    }).then(function() {
                        a.$parent.showLoading(),
                        a.$apiFun.post("/api/delcard", {
                            id: t
                        }).then(function(t) {
                            200 != t.code && a.$parent.showTost(0, t.message),
                            a.$parent.hideLoading(),
                            200 == t.code && (a.$parent.showTost(1, "解绑成功"), a.getUsercard(), a.getUsdssList())
                        })
                    }).
                    catch(function() {})
                },
                getUsercard: function() {
                    var t = this,
                    a = this;
                    this.$parent.showLoading(),
                    a.$apiFun.post("/api/getcard", {
                        type: 1
                    }).then(function(e) {
                        200 == e.code && (a.usercardLis = e.data),
                        t.$parent.hideLoading()
                    })
                },
                getUsdssList: function() {
                    var t = this,
                    a = this;
                    this.$parent.showLoading(),
                    a.$apiFun.post("/api/getcard", {
                        type: 2
                    }).then(function(e) {
                        200 == e.code && (a.usdssLis = e.data),
                        t.$parent.hideLoading()
                    })
                }
            },
            mounted: function() {},
            updated: function() {}
        },
        ht, !1,
        function(t) {
            e("1dTx")
        },
        "data-v-0645b765", null).exports,
        mt = {
            render: function() {
                var t = this,
                a = t.$createElement,
                e = t._self._c || a;
                return e("div", {
                    staticStyle: {
                        width: "100%",
                        "min-height": "100vh",
                        background: "rgb(237, 241, 255)"
                    }
                },
                [e("van-nav-bar", {
                    staticStyle: {
                        position: "fixed",
                        top: "0",
                        left: "0",
                        width: "100%",
                        "background-color": "#edf2fd"
                    },
                    attrs: {
                        title: "新增USDT地址",
                        "left-arrow": ""
                    },
                    on: {
                        "click-left": function(a) {
                            return t.$router.back()
                        }
                    }
                }), t._v(" "), e("div", {
                    staticStyle: {
                        height: "46px"
                    }
                }), t._v(" "), e("div", {
                    staticClass: "tipsh"
                },
                [e("div", {
                    staticClass: "tops"
                },
                [t._v("USDT价格稳定 流通性高 不受监管 "), e("span", {
                    on: {
                        click: function(a) {
                            return t.$parent.goNav("/usdtmore")
                        }
                    }
                },
                [t._v("了解更多 >")])]), t._v(" "), t._m(0)]), t._v(" "), e("div", {
                    staticClass: "usrse"
                },
                [e("div", {
                    staticClass: "hgs"
                },
                [e("div", {
                    staticClass: "nams sc"
                },
                [t._v("\n        钱包协议\n        "), e("div", {
                    class: "TRC20" == t.usdtInfo.bank_owner ? " ssa acti": "ssa",
                    on: {
                        click: function(a) {
                            return t.changXie("TRC20")
                        }
                    }
                },
                [t._v("TRC20")]), t._v(" "), e("div", {
                    class: "ERC20" == t.usdtInfo.bank_owner ? " ssa acti": "ssa",
                    staticStyle: {
                        "margin-left": "0.5rem"
                    },
                    on: {
                        click: function(a) {
                            return t.changXie("ERC20")
                        }
                    }
                },
                [t._v("ERC20")])]), t._v(" "), e("div", {
                    staticStyle: {
                        "border-bottom": "1px solid #f2f2f2"
                    }
                })]), t._v(" "), e("div", {
                    staticClass: "hgs"
                },
                [e("div", {
                    staticClass: "nams"
                },
                [t._v("USDT地址")]), t._v(" "), e("div", {
                    staticStyle: {
                        "border-bottom": "1px solid #f2f2f2"
                    }
                },
                [e("div", {
                    staticClass: "van-cell-group van-hairline--top-bottom",
                    attrs: {
                        "data-v-a12ec382": ""
                    }
                },
                [e("div", {
                    staticClass: "van-cell van-field",
                    attrs: {
                        "data-v-a12ec382": ""
                    }
                },
                [e("div", {
                    staticClass: "van-cell__value van-cell__value--alone van-field__value"
                },
                [e("div", {
                    staticClass: "van-field__body"
                },
                [e("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: t.usdtInfo.bank_no,
                        expression: "usdtInfo.bank_no"
                    }],
                    staticClass: "van-field__control",
                    attrs: {
                        type: "text",
                        onfocus: "this.removeAttribute('readonly');",
                        "auto-complete": "off",
                        onblur: "this.setAttribute('readonly',true);",
                        placeholder: "请输入USDT地址"
                    },
                    domProps: {
                        value: t.usdtInfo.bank_no
                    },
                    on: {
                        input: function(a) {
                            a.target.composing || t.$set(t.usdtInfo, "bank_no", a.target.value)
                        }
                    }
                })])])])])])]), t._v(" "), e("div", {
                    staticClass: "hgs"
                },
                [e("div", {
                    staticClass: "nams"
                },
                [t._v("支付密码")]), t._v(" "), e("div", {
                    staticStyle: {
                        "border-bottom": "1px solid #f2f2f2"
                    }
                },
                [e("van-cell-group", [e("van-field", {
                    attrs: {
                        type: "password",
                        placeholder: "请输入支付密码"
                    },
                    model: {
                        value: t.usdtInfo.pay_pass,
                        callback: function(a) {
                            t.$set(t.usdtInfo, "pay_pass", a)
                        },
                        expression: "usdtInfo.pay_pass"
                    }
                })], 1)], 1)]), t._v(" "), e("van-button", {
                    staticStyle: {
                        "margin-top": "20px",
                        width: "100%"
                    },
                    attrs: {
                        type: "info"
                    },
                    on: {
                        click: t.bindUsdss
                    }
                },
                [t._v("确认添加")])], 1)], 1)
            },
            staticRenderFns: [function() {
                var t = this.$createElement,
                a = this._self._c || t;
                return a("div", {
                    staticClass: "tsg"
                },
                [a("div", {
                    staticClass: "tsgs"
                },
                [this._v("绑定协议地址")]), this._v(" "), a("div", {
                    staticClass: "tsgs"
                },
                [this._v("交易所划转")]), this._v(" "), a("div", {
                    staticClass: "tsgs"
                },
                [this._v("完成取款")])])
            }]
        };
        var bt = e("VU/8")({
            name: "addUsdtCard",
            data: function() {
                return {
                    usdtInfo: {
                        bank_owner: "TRC20"
                    }
                }
            },
            created: function() {},
            methods: {
                changXie: function(t) {
                    this.usdtInfo.bank_owner = t
                },
                bindUsdss: function() {
                    var t = this,
                    a = t.usdtInfo;
                    a.bank = "USDT",
                    null != a.bank_no && "" != a.bank_no ? a.bank_owner && null != a.bank_owner ? a.pay_pass ? (t.$parent.showLoading(), t.$apiFun.post("/api/bindcard", a).then(function(a) {
                        200 != a.code && t.$parent.showTost(0, a.message),
                        200 == a.code && (t.$parent.showTost(1, a.message), t.$router.back()),
                        t.$parent.hideLoading()
                    }).
                    catch(function(a) {
                        t.$parent.hideLoading()
                    })) : t.$parent.showTost(0, "请输人支付密码") : t.$parent.showTost(0, "请选择钱包协议") : t.$parent.showTost(0, "请输入USDT地址")
                }
            },
            mounted: function() {},
            updated: function() {}
        },
        mt, !1,
        function(t) {
            e("5Qam")
        },
        "data-v-67a69e42", null).exports,
        yt = {
            name: "addBankCard",
            data: function() {
                return {
                    cardInfo: {},
                    banklist: [],
                    show: !1
                }
            },
            created: function() {
                this.getBanklist()
            },
            methods: {
                changShow: function() {
                    this.show = !this.show
                },
                onConfirm: function(t, a) {
                    this.cardInfo.bank = t.bank_name,
                    console.log(this.cardInfo.bank),
                    this.show = !1
                },
                onChange: function(t, a, e) {},
                onCancel: function() {
                    this.show = !1
                },
                getBanklist: function() {
                    var t = this;
                    t.$parent.showLoading(),
                    t.$apiFun.post("/api/banklist", {}).then(function(a) {
                        200 != a.code && t.showTost(0, a.message),
                        200 == a.code && (t.banklist = a.data),
                        t.$parent.hideLoading()
                    }).
                    catch(function(a) {
                        t.$parent.hideLoading()
                    })
                },
                bindCard: function() {
                    var t = this;
                    t.cardInfo.bank_owner ? t.cardInfo.bank ? t.cardInfo.bank_address ? t.cardInfo.bank_no ? t.cardInfo.pay_pass ? t.cardInfo.bank_no.length < 8 ? t.$parent.showTost(0, "请输人正确的卡号长度") : t.cardInfo.pay_pass.length < 6 || t.cardInfo.pay_pass.length > 18 ? t.$parent.showTost(0, "请输人支付密码长度") : (t.$parent.showLoading(), t.$apiFun.post("/api/bindcard", t.cardInfo).then(function(a) {
                        200 != a.code && t.$parent.showTost(0, a.message),
                        200 == a.code && (t.$parent.showTost(1, "绑定成功"), t.$router.back()),
                        t.$parent.hideLoading()
                    }).
                    catch(function(a) {
                        t.$parent.hideLoading()
                    })) : t.$parent.showTost(0, "请输人支付密码") : t.$parent.showTost(0, "请输人银行卡号") : t.$parent.showTost(0, "请输入开户行地址") : t.$parent.showTost(0, "请输入银行") : t.$parent.showTost(0, "请输入姓名")
                }
            },
            mounted: function() {},
            updated: function() {}
        },
        wt = {
            render: function() {
                var t = this,
                a = t.$createElement,
                e = t._self._c || a;
                return e("div", {
                    staticStyle: {
                        width: "100%",
                        "min-height": "100vh",
                        background: "rgb(237, 241, 255)"
                    }
                },
                [e("van-nav-bar", {
                    staticStyle: {
                        position: "fixed",
                        top: "0",
                        left: "0",
                        width: "100%",
                        "background-color": "#edf2fd"
                    },
                    attrs: {
                        title: "新增银行卡",
                        "left-arrow": ""
                    },
                    on: {
                        "click-left": function(a) {
                            return t.$router.back()
                        }
                    }
                }), t._v(" "), e("div", {
                    staticStyle: {
                        height: "46px"
                    }
                }), t._v(" "), e("div", {
                    staticClass: "usrse"
                },
                [e("div", {
                    staticClass: "hgs"
                },
                [e("div", {
                    staticClass: "nams"
                },
                [t._v("持卡人姓名")]), t._v(" "), e("div", [e("div", {
                    staticClass: "van-cell-group van-hairline--top-bottom",
                    attrs: {
                        "data-v-a12ec382": ""
                    }
                },
                [e("div", {
                    staticClass: "van-cell van-field",
                    attrs: {
                        "data-v-a12ec382": ""
                    }
                },
                [e("div", {
                    staticClass: "van-cell__value van-cell__value--alone van-field__value"
                },
                [e("div", {
                    staticClass: "van-field__body"
                },
                [e("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: t.cardInfo.bank_owner,
                        expression: "cardInfo.bank_owner"
                    }],
                    staticClass: "van-field__control",
                    attrs: {
                        type: "text",
                        onfocus: "this.removeAttribute('readonly');",
                        "auto-complete": "off",
                        onblur: "this.setAttribute('readonly',true);",
                        placeholder: "请输入持卡人姓名"
                    },
                    domProps: {
                        value: t.cardInfo.bank_owner
                    },
                    on: {
                        input: function(a) {
                            a.target.composing || t.$set(t.cardInfo, "bank_owner", a.target.value)
                        }
                    }
                })])])])])])])]), t._v(" "), e("div", {
                    staticStyle: {
                        "font-size": "0.24rem",
                        color: "#98a5b3",
                        "text-align": "center",
                        "box-sizing": "border-box",
                        padding: "6px"
                    }
                },
                [t._v("为了您的资金能够迅速到账，请确保填写的姓名与银行卡的开户姓名一致")]), t._v(" "), e("div", {
                    staticClass: "usrse"
                },
                [e("div", {
                    staticClass: "hgs",
                    on: {
                        click: t.changShow
                    }
                },
                [e("div", {
                    staticClass: "nams"
                },
                [t._v("银行类型")]), t._v(" "), e("div", {
                    staticStyle: {
                        "border-bottom": "1px solid #f2f2f2"
                    }
                },
                [e("div", {
                    staticClass: "van-cell-group van-hairline--top-bottom",
                    attrs: {
                        "data-v-a12ec382": ""
                    }
                },
                [e("div", {
                    staticClass: "van-cell van-field",
                    attrs: {
                        "data-v-a12ec382": ""
                    }
                },
                [e("div", {
                    staticClass: "van-cell__value van-cell__value--alone van-field__value"
                },
                [e("div", {
                    staticClass: "van-field__body"
                },
                [e("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: t.cardInfo.bank,
                        expression: "cardInfo.bank"
                    }],
                    staticClass: "van-field__control",
                    attrs: {
                        type: "text",
                        readonly: "",
                        onfocus: "this.removeAttribute('readonly');",
                        "auto-complete": "off",
                        onblur: "this.setAttribute('readonly',true);",
                        disabled: "",
                        placeholder: "请选择银行类型"
                    },
                    domProps: {
                        value: t.cardInfo.bank
                    },
                    on: {
                        input: function(a) {
                            a.target.composing || t.$set(t.cardInfo, "bank", a.target.value)
                        }
                    }
                })])])])])])]), t._v(" "), e("div", {
                    staticClass: "hgs"
                },
                [e("div", {
                    staticClass: "nams"
                },
                [t._v("银行卡号")]), t._v(" "), e("div", {
                    staticStyle: {
                        "border-bottom": "1px solid #f2f2f2"
                    }
                },
                [e("div", {
                    staticClass: "van-cell-group van-hairline--top-bottom",
                    attrs: {
                        "data-v-a12ec382": ""
                    }
                },
                [e("div", {
                    staticClass: "van-cell van-field",
                    attrs: {
                        "data-v-a12ec382": ""
                    }
                },
                [e("div", {
                    staticClass: "van-cell__value van-cell__value--alone van-field__value"
                },
                [e("div", {
                    staticClass: "van-field__body"
                },
                [e("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: t.cardInfo.bank_no,
                        expression: "cardInfo.bank_no"
                    }],
                    staticClass: "van-field__control",
                    attrs: {
                        type: "text",
                        onfocus: "this.removeAttribute('readonly');",
                        "auto-complete": "off",
                        onblur: "this.setAttribute('readonly',true);",
                        placeholder: "请输入银行卡号"
                    },
                    domProps: {
                        value: t.cardInfo.bank_no
                    },
                    on: {
                        input: function(a) {
                            a.target.composing || t.$set(t.cardInfo, "bank_no", a.target.value)
                        }
                    }
                })])])])])])]), t._v(" "), e("div", {
                    staticClass: "hgs"
                },
                [e("div", {
                    staticClass: "nams"
                },
                [t._v("开户行")]), t._v(" "), e("div", {
                    staticStyle: {
                        "border-bottom": "1px solid #f2f2f2"
                    }
                },
                [e("div", {
                    staticClass: "van-cell-group van-hairline--top-bottom",
                    attrs: {
                        "data-v-a12ec382": ""
                    }
                },
                [e("div", {
                    staticClass: "van-cell van-field",
                    attrs: {
                        "data-v-a12ec382": ""
                    }
                },
                [e("div", {
                    staticClass: "van-cell__value van-cell__value--alone van-field__value"
                },
                [e("div", {
                    staticClass: "van-field__body"
                },
                [e("input", {
                    directives: [{
                        name: "model",
                        rawName: "v-model",
                        value: t.cardInfo.bank_address,
                        expression: "cardInfo.bank_address"
                    }],
                    staticClass: "van-field__control",
                    attrs: {
                        type: "text",
                        onfocus: "this.removeAttribute('readonly');",
                        "auto-complete": "off",
                        onblur: "this.setAttribute('readonly',true);",
                        placeholder: "请输入开户行"
                    },
                    domProps: {
                        value: t.cardInfo.bank_address
                    },
                    on: {
                        input: function(a) {
                            a.target.composing || t.$set(t.cardInfo, "bank_address", a.target.value)
                        }
                    }
                })])])])])])]), t._v(" "), e("div", {
                    staticClass: "hgs"
                },
                [e("div", {
                    staticClass: "nams"
                },
                [t._v("支付密码")]), t._v(" "), e("div", {
                    staticStyle: {
                        "border-bottom": "1px solid #f2f2f2"
                    }
                },
                [e("van-cell-group", [e("van-field", {
                    attrs: {
                        type: "password",
                        placeholder: "请输入支付密码"
                    },
                    model: {
                        value: t.cardInfo.pay_pass,
                        callback: function(a) {
                            t.$set(t.cardInfo, "pay_pass", a)
                        },
                        expression: "cardInfo.pay_pass"
                    }
                })], 1)], 1)]), t._v(" "), e("van-button", {
                    staticStyle: {
                        "margin-top": "20px",
                        width: "100%"
                    },
                    attrs: {
                        type: "info"
                    },
                    on: {
                        click: t.bindCard
                    }
                },
                [t._v("确认添加")]), t._v(" "), e("div", {
                    staticStyle: {
                        height: "60px"
                    }
                })], 1), t._v(" "), t.show ? e("div", {
                    staticStyle: {
                        position: "fixed",
                        width: "100%",
                        height: "100%",
                        top: "0",
                        "z-index": "999",
                        background: "rgba(0, 0, 0, 0.39)"
                    }
                },
                [e("van-picker", {
                    staticStyle: {
                        position: "absolute",
                        bottom: "0",
                        left: "0",
                        width: "100%"
                    },
                    attrs: {
                        title: "银行类型",
                        "show-toolbar": "",
                        columns: t.banklist,
                        "value-key": "bank_name"
                    },
                    on: {
                        confirm: t.onConfirm,
                        cancel: t.onCancel,
                        change: t.onChange
                    }
                })], 1) : t._e()], 1)
            },
            staticRenderFns: []
        };
        var Ct = e("VU/8")(yt, wt, !1,
        function(t) {
            e("Z0Bs")
        },
        "data-v-68dffa35", null).exports,
        kt = {
            render: function() {
                var t = this,
                a = t.$createElement,
                e = t._self._c || a;
                return e("div", {
                    staticStyle: {
                        width: "100%",
                        "min-height": "100vh",
                        background: "rgb(237, 241, 255)"
                    }
                },
                [e("van-nav-bar", {
                    staticStyle: {
                        position: "fixed",
                        top: "0",
                        left: "0",
                        width: "100%",
                        "background-color": "#edf2fd"
                    },
                    attrs: {
                        title: "协议的区别",
                        "left-arrow": ""
                    },
                    on: {
                        "click-left": function(a) {
                            return t.$router.back()
                        }
                    }
                }), t._v(" "), e("div", {
                    staticStyle: {
                        height: "46px"
                    }
                }), t._v(" "), t._m(0)], 1)
            },
            staticRenderFns: [function() {
                var t = this,
                a = t.$createElement,
                e = t._self._c || a;
                return e("div", {
                    staticClass: "virtualProto__virtualCurrency__b7CGB undefined",
                    attrs: {
                        "data-v-9c86c1e4": ""
                    }
                },
                [e("div", {
                    staticClass: "virtualProto__block__3o4T3",
                    attrs: {
                        "data-v-9c86c1e4": ""
                    }
                },
                [e("div", {
                    staticClass: "virtualProto__top_img__2l2NV",
                    staticStyle: {
                        "background-image": "url('/static/image/title-bg6.ac4a470f9139139d8e0364b02421375b.png')",
                        width: "206px"
                    },
                    attrs: {
                        "data-v-9c86c1e4": ""
                    }
                },
                [t._v("\n        协议介绍\n      ")]), t._v(" "), e("div", {
                    staticClass: "virtualProto__firstPart__1A0Z-",
                    attrs: {
                        "data-v-9c86c1e4": ""
                    }
                },
                [e("span", {
                    attrs: {
                        "data-v-9c86c1e4": ""
                    }
                },
                [t._v("TRC20：基于波场网络协议")]), t._v(" "), e("p", {
                    attrs: {
                        "data-v-9c86c1e4": ""
                    }
                },
                [t._v("TRC20的提币手续费最低，这意味着用户可以享受低手续费的交易所提币服务。同时，波场网络的TPS能够达到上千级别，可以实现交易秒级确认。")])]), t._v(" "), e("div", {
                    staticClass: "virtualProto__firstPart__1A0Z-",
                    attrs: {
                        "data-v-9c86c1e4": ""
                    }
                },
                [e("span", {
                    attrs: {
                        "data-v-9c86c1e4": ""
                    }
                },
                [t._v("ERC20：基于以太坊网络协议")]), t._v(" "), e("p", {
                    attrs: {
                        "data-v-9c86c1e4": ""
                    }
                },
                [t._v("以太坊发行自己的原生代币及其他代币。但成千上万种代币的规则都不一样，这对后期市场发展非常不利。所以代币发行者做了一个智能合约标准，也就是ERC20。")])])]), t._v(" "), e("div", {
                    staticClass: "virtualProto__block__3o4T3",
                    attrs: {
                        "data-v-9c86c1e4": ""
                    }
                },
                [e("div", {
                    staticClass: "virtualProto__top_img__2l2NV",
                    staticStyle: {
                        "background-image": "url('/static/image/title-bg6.ac4a470f9139139d8e0364b02421375b.png')",
                        width: "206px"
                    },
                    attrs: {
                        "data-v-9c86c1e4": ""
                    }
                },
                [t._v("\n        协议的区别？\n      ")]), t._v(" "), e("table", {
                    attrs: {
                        "data-v-9c86c1e4": ""
                    }
                },
                [e("thead", {
                    attrs: {
                        "data-v-9c86c1e4": ""
                    }
                },
                [e("tr", {
                    attrs: {
                        "data-v-9c86c1e4": ""
                    }
                },
                [e("th", {
                    attrs: {
                        "data-v-9c86c1e4": ""
                    }
                },
                [t._v("区别点")]), t._v(" "), e("th", {
                    attrs: {
                        "data-v-9c86c1e4": ""
                    }
                },
                [t._v("TRC20协议")]), t._v(" "), e("th", {
                    attrs: {
                        "data-v-9c86c1e4": ""
                    }
                },
                [t._v("ERC20协议")])])]), t._v(" "), e("tbody", {
                    attrs: {
                        "data-v-9c86c1e4": ""
                    }
                },
                [e("tr", {
                    attrs: {
                        "data-v-9c86c1e4": ""
                    }
                },
                [e("td", {
                    attrs: {
                        "data-v-9c86c1e4": ""
                    }
                },
                [t._v("地址样式")]), t._v(" "), e("td", {
                    attrs: {
                        "data-v-9c86c1e4": ""
                    }
                },
                [t._v("TRC20-USDT地址以T开头")]), t._v(" "), e("td", {
                    attrs: {
                        "data-v-9c86c1e4": ""
                    }
                },
                [t._v("ERC20-USDT地址以0x开头")])]), t._v(" "), e("tr", {
                    attrs: {
                        "data-v-9c86c1e4": ""
                    }
                },
                [e("td", {
                    attrs: {
                        "data-v-9c86c1e4": ""
                    }
                },
                [t._v("使用网络")]), t._v(" "), e("td", {
                    attrs: {
                        "data-v-9c86c1e4": ""
                    }
                },
                [t._v("波场网络")]), t._v(" "), e("td", {
                    attrs: {
                        "data-v-9c86c1e4": ""
                    }
                },
                [t._v("以太坊网络")])]), t._v(" "), e("tr", {
                    attrs: {
                        "data-v-9c86c1e4": ""
                    }
                },
                [e("td", {
                    attrs: {
                        "data-v-9c86c1e4": ""
                    }
                },
                [t._v("网络状态")]), t._v(" "), e("td", {
                    attrs: {
                        "data-v-9c86c1e4": ""
                    }
                },
                [t._v("基本不堵")]), t._v(" "), e("td", {
                    attrs: {
                        "data-v-9c86c1e4": ""
                    }
                },
                [t._v("经常拥堵")])]), t._v(" "), e("tr", {
                    attrs: {
                        "data-v-9c86c1e4": ""
                    }
                },
                [e("td", {
                    attrs: {
                        "data-v-9c86c1e4": ""
                    }
                },
                [t._v("转账速度")]), t._v(" "), e("td", {
                    attrs: {
                        "data-v-9c86c1e4": ""
                    }
                },
                [e("div", {
                    attrs: {
                        "data-v-9c86c1e4": ""
                    }
                },
                [t._v("极快")]), t._v(" "), e("div", {
                    attrs: {
                        "data-v-9c86c1e4": ""
                    }
                },
                [t._v("(几秒到几分钟)")])]), t._v(" "), e("td", {
                    attrs: {
                        "data-v-9c86c1e4": ""
                    }
                },
                [e("div", {
                    attrs: {
                        "data-v-9c86c1e4": ""
                    }
                },
                [t._v("普通")]), t._v(" "), e("div", {
                    attrs: {
                        "data-v-9c86c1e4": ""
                    }
                },
                [t._v("(几分钟到数十分钟)")])])]), t._v(" "), e("tr", {
                    attrs: {
                        "data-v-9c86c1e4": ""
                    }
                },
                [e("td", {
                    attrs: {
                        "data-v-9c86c1e4": ""
                    }
                },
                [t._v("手续费用")]), t._v(" "), e("td", {
                    attrs: {
                        "data-v-9c86c1e4": ""
                    }
                },
                [t._v("低")]), t._v(" "), e("td", {
                    attrs: {
                        "data-v-9c86c1e4": ""
                    }
                },
                [t._v("普通")])]), t._v(" "), e("tr", {
                    attrs: {
                        "data-v-9c86c1e4": ""
                    }
                },
                [e("td", {
                    attrs: {
                        "data-v-9c86c1e4": ""
                    }
                },
                [t._v("安全系数")]), t._v(" "), e("td", {
                    attrs: {
                        "data-v-9c86c1e4": ""
                    }
                },
                [t._v("普通")]), t._v(" "), e("td", {
                    attrs: {
                        "data-v-9c86c1e4": ""
                    }
                },
                [t._v("高")])]), t._v(" "), e("tr", {
                    attrs: {
                        "data-v-9c86c1e4": ""
                    }
                },
                [e("td", {
                    attrs: {
                        "data-v-9c86c1e4": ""
                    }
                },
                [t._v("使用建议")]), t._v(" "), e("td", {
                    attrs: {
                        "data-v-9c86c1e4": ""
                    }
                },
                [e("div", {
                    attrs: {
                        "data-v-9c86c1e4": ""
                    }
                },
                [t._v("小额高频")]), t._v(" "), e("div", {
                    attrs: {
                        "data-v-9c86c1e4": ""
                    }
                },
                [t._v("交易推荐")])]), t._v(" "), e("td", {
                    attrs: {
                        "data-v-9c86c1e4": ""
                    }
                },
                [e("div", {
                    attrs: {
                        "data-v-9c86c1e4": ""
                    }
                },
                [t._v("中等额度")]), t._v(" "), e("div", {
                    attrs: {
                        "data-v-9c86c1e4": ""
                    }
                },
                [t._v("常规交易推荐")])])])])])]), t._v(" "), e("div", {
                    staticClass: "virtualProto__block__3o4T3",
                    attrs: {
                        "data-v-9c86c1e4": ""
                    }
                },
                [e("div", {
                    staticClass: "virtualProto__top_img__2l2NV",
                    staticStyle: {
                        "background-image": "url('/static/image/title-bg6.ac4a470f9139139d8e0364b02421375b.png')",
                        width: "206px"
                    },
                    attrs: {
                        "data-v-9c86c1e4": ""
                    }
                },
                [t._v("\n        到底选哪种协议更好？\n      ")]), t._v(" "), e("div", {
                    staticClass: "virtualProto__container__3gv6Q",
                    attrs: {
                        "data-v-9c86c1e4": ""
                    }
                },
                [e("img", {
                    attrs: {
                        "data-v-9c86c1e4": "",
                        src: "/static/image/pic-xiaoe@2x.dad75f2e30f8e82488d587df87d8aef3.png",
                        width: "72px"
                    }
                }), t._v(" "), e("div", {
                    staticClass: "virtualProto__rightContent__3OhXd",
                    attrs: {
                        "data-v-9c86c1e4": ""
                    }
                },
                [e("span", {
                    attrs: {
                        "data-v-9c86c1e4": ""
                    }
                },
                [t._v("小额交易推荐")]), t._v(" "), e("div", {
                    attrs: {
                        "data-v-9c86c1e4": ""
                    }
                },
                [t._v("低手续费，秒级到账。")])])]), t._v(" "), e("div", {
                    staticClass: "virtualProto__container__3gv6Q",
                    attrs: {
                        "data-v-9c86c1e4": ""
                    }
                },
                [e("img", {
                    attrs: {
                        "data-v-9c86c1e4": "",
                        src: "/static/image/pic-zhonge@2x.e0bb8a0ad2b83c10733aa1d33dba786c.png",
                        width: "72px"
                    }
                }), t._v(" "), e("div", {
                    staticClass: "virtualProto__rightContent__3OhXd",
                    attrs: {
                        "data-v-9c86c1e4": ""
                    }
                },
                [e("span", {
                    attrs: {
                        "data-v-9c86c1e4": ""
                    }
                },
                [t._v("中等额度推荐")]), t._v(" "), e("div", {
                    attrs: {
                        "data-v-9c86c1e4": ""
                    }
                },
                [t._v("手续费和速度都介于中间值。")])])]), t._v(" "), e("p", {
                    staticClass: "virtualProto__bot__1w1K_",
                    attrs: {
                        "data-v-9c86c1e4": ""
                    }
                },
                [t._v("*两种协议对应的USDT地址不互通，进行转账、充值等操作时，应仔细核对正确地址！")])])])
            }]
        };
        var xt = e("VU/8")({
            name: "usdtmore",
            data: function() {
                return {}
            },
            created: function() {},
            methods: {},
            mounted: function() {},
            updated: function() {}
        },
        kt, !1,
        function(t) {
            e("cE2z")
        },
        "data-v-9d0be442", null).exports,
        $t = {
            name: "password",
            data: function() {
                return {
                    passwordInfo: {},
                    type: 1,
                    psw1: !0,
                    psw2: !0,
                    psw3: !0
                }
            },
            created: function() {
                var t = this.$route.query;
                t.type && (this.type = 1 * t.type)
            },
            methods: {
                changPsw: function(t) {
                    this[t] = !this[t]
                },
                changtab: function() {
                    this.passwordInfo = {},
                    this.info = {}
                },
                editPassword: function(t) {
                    var a = this;
                    if (a.passwordInfo.password) if (a.passwordInfo.paypassword) if (a.passwordInfo.password.length < 6) a.$parent.showTost(0, "请输入正确的旧密码长度");
                    else if (a.passwordInfo.paypassword.length < 6) a.$parent.showTost(0, "请输入正确的新密码长度");
                    else if (a.passwordInfo.newpasword) if (a.passwordInfo.newpasword == a.passwordInfo.paypassword) {
                        if (a.passwordInfo.password == a.passwordInfo.paypassword) return a.$parent.showTost(0, "新旧密码不能一致！"),
                        void(a.passwordInfo = {});
                        var e = 1 == t ? "/api/editPassword": "/api/editPayPassword";
                        a.$parent.showLoading(),
                        a.$apiFun.post(e, {
                            paypassword: a.passwordInfo.paypassword,
                            password: a.passwordInfo.password
                        }).then(function(e) {
                            console.log(e),
                            200 != e.code && a.$parent.showTost(0, e.message),
                            a.$parent.hideLoading(),
                            200 == e.code && (a.$parent.showTost(1, "密码修改成功！"), a.passwordInfo = {},
                            1 == t && (a.$parent.closeDaoTime(), localStorage.clear(), sessionStorage.clear(), a.$store.commit("changUserInfo"), a.$store.commit("changToken"), a.$router.push({
                                path: "/login"
                            })))
                        })
                    } else a.$parent.showTost(0, "两次密码不一致！");
                    else a.$parent.showTost(0, "请输入确认密码");
                    else a.$parent.showTost(0, "请输入新密码");
                    else a.$parent.showTost(0, "请输入旧密码")
                }
            },
            mounted: function() {},
            updated: function() {}
        },
        St = {
            render: function() {
                var t = this,
                a = t.$createElement,
                e = t._self._c || a;
                return e("div", {
                    staticStyle: {
                        width: "100%",
                        "min-height": "100vh",
                        background: "rgb(237, 241, 255)"
                    }
                },
                [e("van-nav-bar", {
                    staticStyle: {
                        position: "fixed",
                        top: "0",
                        left: "0",
                        width: "100%",
                        "background-color": "#edf2fd"
                    },
                    attrs: {
                        title: 1 == t.type ? "修改登录密码": "设置提现密码",
                        "left-arrow": ""
                    },
                    on: {
                        "click-left": function(a) {
                            return t.$router.back()
                        }
                    }
                }), t._v(" "), e("div", {
                    staticStyle: {
                        height: "46px"
                    }
                }), t._v(" "), e("div", {
                    staticClass: "usrse"
                },
                [e("div", {
                    staticClass: "hgs"
                },
                [e("div", {
                    staticClass: "nams"
                },
                [t._v("原密码")]), t._v(" "), e("div", {
                    staticStyle: {
                        "border-bottom": "1px solid #f2f2f2"
                    }
                },
                [e("van-cell-group", [e("van-field", {
                    attrs: {
                        type: "password",
                        placeholder: "请输入当前密码"
                    },
                    model: {
                        value: t.passwordInfo.password,
                        callback: function(a) {
                            t.$set(t.passwordInfo, "password", a)
                        },
                        expression: "passwordInfo.password"
                    }
                })], 1)], 1)]), t._v(" "), e("div", {
                    staticClass: "hgs"
                },
                [e("div", {
                    staticClass: "nams"
                },
                [t._v("新密码")]), t._v(" "), e("div", {
                    staticStyle: {
                        "border-bottom": "1px solid #f2f2f2"
                    }
                },
                [e("van-cell-group", [e("van-field", {
                    attrs: {
                        type: "password",
                        placeholder: "请输入新密码"
                    },
                    model: {
                        value: t.passwordInfo.paypassword,
                        callback: function(a) {
                            t.$set(t.passwordInfo, "paypassword", a)
                        },
                        expression: "passwordInfo.paypassword"
                    }
                })], 1)], 1)]), t._v(" "), e("div", {
                    staticClass: "hgs"
                },
                [e("div", {
                    staticClass: "nams"
                },
                [t._v("确认新密码")]), t._v(" "), e("div", {
                    staticStyle: {
                        "border-bottom": "1px solid #f2f2f2"
                    }
                },
                [e("van-cell-group", [e("van-field", {
                    attrs: {
                        type: "password",
                        placeholder: "请再次输入密码"
                    },
                    model: {
                        value: t.passwordInfo.newpasword,
                        callback: function(a) {
                            t.$set(t.passwordInfo, "newpasword", a)
                        },
                        expression: "passwordInfo.newpasword"
                    }
                })], 1)], 1)]), t._v(" "), e("van-button", {
                    staticStyle: {
                        "margin-top": "20px",
                        width: "100%"
                    },
                    attrs: {
                        type: "info"
                    },
                    on: {
                        click: function(a) {
                            return t.editPassword(t.type)
                        }
                    }
                },
                [t._v("确认修改")]), t._v(" "), e("div", {
                    staticStyle: {
                        height: "60px"
                    }
                })], 1)], 1)
            },
            staticRenderFns: []
        };
        var It = e("VU/8")($t, St, !1,
        function(t) {
            e("tbm1")
        },
        "data-v-145976bc", null).exports,
        Lt = {
            name: "welfare",
            data: function() {
                return {
                    list: [],
                    pageData: {},
                    userredpacket: {},
                    page: 1,
                    loading: !1
                }
            },
            created: function() {
                this.getuserredpacket(),
                this.getData()
            },
            methods: {
                getData: function() {
                    var t = this,
                    a = t.page;
                    if (a > t.pageData.last_page) t.loading = !1;
                    else {
                        t.$parent.showLoading();
                        var e = {
                            page: t.page
                        };
                        t.$apiFun.post("/api/redpacket", e).then(function(e) {
                            if (200 != e.code && t.$parent.showTost(0, e.message), 200 == e.code) {
                                if (t.pageData = e.data, 1 == t.page) t.list = e.data.data;
                                else {
                                    var i = JSON.parse(n()(t.list));
                                    e.data.data.forEach(function(t) {
                                        i.push(t)
                                    }),
                                    t.list = i
                                }
                                t.page = a + 1
                            }
                            t.loading = !1,
                            t.$parent.hideLoading()
                        }).
                        catch(function(a) {
                            t.$parent.hideLoading(),
                            t.loading = !1
                        })
                    }
                },
                getuserredpacket: function() {
                    var t = this;
                    t.$parent.showLoading();
                    var a = {
                        page: t.page
                    };
                    t.$apiFun.get("/api/userredpacket", a).then(function(a) {
                        console.log(a),
                        200 != a.code && t.$parent.showTost(0, a.message),
                        200 == a.code && (t.userredpacket = a.data),
                        t.$parent.hideLoading()
                    })
                }
            },
            mounted: function() {},
            updated: function() {}
        },
        At = {
            render: function() {
                var t = this,
                a = t.$createElement,
                e = t._self._c || a;
                return e("div", {
                    staticStyle: {
                        width: "100%",
                        "min-height": "100vh",
                        background: "rgb(237, 241, 255)"
                    }
                },
                [e("van-nav-bar", {
                    staticStyle: {
                        position: "fixed",
                        top: "0",
                        left: "0",
                        width: "100%",
                        "background-color": "#edf2fd"
                    },
                    attrs: {
                        title: "福利中心",
                        "left-arrow": ""
                    },
                    on: {
                        "click-left": function(a) {
                            return t.$router.back()
                        }
                    }
                }), t._v(" "), e("div", {
                    staticStyle: {
                        height: "46px"
                    }
                }), t._v(" "), e("div", {
                    staticStyle: {
                        width: "95%",
                        "min-width": "250px",
                        margin: "0 auto",
                        background: "#fff",
                        "border-radius": "10px",
                        "box-sizing": "border-box",
                        padding: "10px",
                        "min-height": "90vh"
                    }
                },
                [e("div", {
                    staticStyle: {
                        "padding-bottom": "10px",
                        display: "flex",
                        "align-items": "center",
                        "justify-content": "space-between"
                    }
                },
                [e("span", {
                    staticStyle: {
                        "font-size": "0.3rem"
                    }
                },
                [t._v(" 红包记录 ")]), t._v(" "), e("van-button", {
                    staticStyle: {
                        width: "3rem",
                        height: "0.68rem",
                        "min-width": "80px"
                    },
                    attrs: {
                        type: "info"
                    },
                    on: {
                        click: function(a) {
                            return t.$parent.goNav("/hongbao")
                        }
                    }
                },
                [e("span", {
                    staticStyle: {
                        color: "#fff",
                        "font-size": "0.3rem"
                    }
                },
                [t._v("前往领取")])])], 1), t._v(" "), e("div", {
                    staticStyle: {
                        display: "flex",
                        "box-sizing": "border-box",
                        padding: "0 12px",
                        "font-size": "0.3rem",
                        "justify-content": "space-between",
                        height: "1.1rem",
                        "align-items": "center"
                    }
                },
                [e("div", {
                    staticStyle: {
                        "font-size": "0.3rem"
                    }
                },
                [t._v(" 剩余领取次数：" + t._s(t.userredpacket.sendnums))]), t._v(" "), e("div", {
                    staticStyle: {
                        "font-size": "0.3rem"
                    }
                },
                [t._v("已领取次数：" + t._s(t.userredpacket.acquirednum))])]), t._v(" "), t.list.length > 0 ? e("van-list", {
                    staticStyle: {
                        "margin-top": "10px",
                        "padding-bottom": "120px"
                    },
                    attrs: {
                        "finished-text": "没有更多了",
                        offset: "300",
                        finished: t.list.length == t.pageData.total
                    },
                    on: {
                        load: t.getData
                    },
                    model: {
                        value: t.loading,
                        callback: function(a) {
                            t.loading = a
                        },
                        expression: "loading"
                    }
                },
                t._l(t.list,
                function(a, i) {
                    return e("van-cell", {
                        key: i
                    },
                    [e("div", {
                        staticStyle: {
                            color: "#888 !important"
                        }
                    },
                    [e("div", {
                        staticStyle: {
                            display: "flex",
                            "justify-content": "space-between"
                        }
                    },
                    [t._v("\n            充值金额 :" + t._s(a.money) + " "), e("span", [t._v("红包金额：" + t._s(a.redpacketmoney))])]), t._v(" "), e("div", [t._v("充值时间:" + t._s(a.created_at))]), t._v(" "), e("div", [t._v("领取时间：" + t._s(a.usetime))])])])
                }), 1) : e("div", {
                    staticStyle: {
                        "margin-top": "60px",
                        "text-align": "center"
                    }
                },
                [e("img", {
                    staticStyle: {
                        width: "35%"
                    },
                    attrs: {
                        src: "/static/image/mescroll-empty.png",
                        alt: ""
                    }
                }), t._v(" "), e("van-divider", {
                    style: {
                        color: "#ccc",
                        borderColor: "#ccc",
                        padding: "20px "
                    },
                    attrs: {
                        dashed: ""
                    }
                },
                [t._v("空空如也")])], 1)], 1)], 1)
            },
            staticRenderFns: []
        };
        var Tt = e("VU/8")(Lt, At, !1,
        function(t) {
            e("znr/")
        },
        "data-v-31282edb", null).exports,
        Et = {
            name: "betRecord",
            data: function() {
                return {
                    date: 4,
                    list: [],
                    pageData: {},
                    page: 1,
                    statuType: ["无效注单", "已结算", "未结算"],
                    dogameLis: [],
                    api_type: "",
                    loading: !1,
                    name: "全平台",
                    show: !1,
                    dateName: ["", "今日", "近7日", "近15日", "近30日"],
                    popup: !1,
                    showXuan: 1
                }
            },
            created: function() {
                this.getdogame(),
                this.getData()
            },
            methods: {
                changDogame: function(t, a) {
                    this.name = t,
                    this.api_type = a,
                    this.popup = !1,
                    this.page = 1,
                    this.getData()
                },
                changtype: function(t, a) {
                    this[t] = a,
                    this.popup = !1,
                    this.page = 1,
                    this.getData()
                },
                showPopup: function(t) {
                    this.popup = !0,
                    this.showXuan = t
                },
                openOrclose: function() {
                    this.show = !this.show
                },
                changtab: function() {
                    this.page = 1,
                    this.list = [],
                    this.pageData = {},
                    this.getData()
                },
                getdogame: function() {
                    var t = this;
                    t.$apiFun.post("/api/balancelist", {}).then(function(a) {
                        console.log(a),
                        200 != a.code && t.showTost(a.message),
                        200 == a.code && (t.dogameLis = a.data, t.dogameLis.unshift({
                            name: "全平台",
                            platname: ""
                        }))
                    })
                },
                changeDate: function() {
                    this.page = 1,
                    this.getData()
                },
                getData: function() {
                    var t = this,
                    a = t.page;
                    if (a > t.pageData.last_page) t.loading = !1;
                    else {
                        t.$parent.showLoading();
                        var e = {
                            date: t.date,
                            page: t.page,
                            api_type: t.api_type
                        };
                        t.$apiFun.post("/api/betrecord", e).then(function(e) {
                            if (200 != e.code && t.$parent.showTost(0, e.message), 200 == e.code) {
                                if (t.pageData = e.data, 1 == t.page) t.list = e.data.data;
                                else {
                                    var i = JSON.parse(n()(t.list));
                                    e.data.data.forEach(function(t) {
                                        i.push(t)
                                    }),
                                    t.list = i
                                }
                                t.page = a + 1
                            }
                            t.loading = !1,
                            t.$parent.hideLoading()
                        }).
                        catch(function(a) {
                            t.$parent.hideLoading(),
                            t.loading = !1
                        })
                    }
                }
            },
            mounted: function() {},
            updated: function() {}
        },
        Ut = {
            render: function() {
                var t = this,
                a = t.$createElement,
                e = t._self._c || a;
                return e("div", {
                    staticStyle: {
                        width: "100%",
                        "min-height": "100vh",
                        background: "rgb(237, 241, 255)"
                    }
                },
                [e("van-nav-bar", {
                    staticStyle: {
                        position: "fixed",
                        top: "0",
                        left: "0",
                        width: "100%",
                        "background-color": "#edf2fd"
                    },
                    attrs: {
                        title: "投注记录",
                        "left-arrow": ""
                    },
                    on: {
                        "click-left": function(a) {
                            return t.$router.back()
                        }
                    }
                }), t._v(" "), e("div", {
                    staticStyle: {
                        height: "46px"
                    }
                }), t._v(" "), e("div", {
                    staticStyle: {
                        width: "95%",
                        "min-width": "250px",
                        margin: "0 auto",
                        background: "#fff",
                        "border-radius": "10px",
                        "box-sizing": "border-box",
                        padding: "10px",
                        "min-height": "90vh"
                    }
                },
                [e("div", {
                    staticClass: "saibox"
                },
                [e("div", {
                    staticClass: "sai",
                    on: {
                        click: function(a) {
                            return t.showPopup(1)
                        }
                    }
                },
                [t._v(t._s(t.name))]), t._v(" "), e("div", {
                    staticClass: "sai",
                    on: {
                        click: function(a) {
                            return t.showPopup(2)
                        }
                    }
                },
                [t._v(t._s(t.dateName[t.date]))])]), t._v(" "), t.list.length > 0 ? e("van-list", {
                    staticStyle: {
                        "margin-top": "10px",
                        "padding-bottom": "120px"
                    },
                    attrs: {
                        "finished-text": "没有更多了",
                        offset: "300",
                        finished: t.list.length == t.pageData.total
                    },
                    on: {
                        load: t.getData
                    },
                    model: {
                        value: t.loading,
                        callback: function(a) {
                            t.loading = a
                        },
                        expression: "loading"
                    }
                },
                t._l(t.list,
                function(a, i) {
                    return e("van-cell", {
                        key: i
                    },
                    [e("div", {
                        staticStyle: {
                            "font-size": "0.3rem"
                        }
                    },
                    [t._v("订单号：" + t._s(a.bet_id))]), t._v(" "), e("div", {
                        staticStyle: {
                            display: "flex",
                            "justify-content": "space-between"
                        }
                    },
                    [e("div", {
                        staticStyle: {
                            "font-size": "0.3rem"
                        }
                    },
                    [t._v("金额 :" + t._s(a.bet_amount))]), t._v(" "), e("div", {
                        staticStyle: {
                            "font-size": "0.3rem"
                        }
                    },
                    [t._v("派彩 :" + t._s(a.win_loss))])]), t._v(" "), e("div", {
                        staticStyle: {
                            display: "flex",
                            "justify-content": "space-between"
                        }
                    },
                    [e("div", {
                        staticStyle: {
                            "font-size": "0.3rem"
                        }
                    },
                    [t._v(t._s(a.Code))]), t._v(" "), e("div", {
                        staticStyle: {
                            "font-size": "0.3rem"
                        }
                    },
                    [t._v(t._s(t.statuType[a.status]))])]), t._v(" "), e("div", {
                        staticStyle: {
                            "font-size": "0.3rem"
                        }
                    },
                    [t._v(t._s(a.created_at))])])
                }), 1) : e("div", {
                    staticStyle: {
                        "margin-top": "60px",
                        "text-align": "center"
                    }
                },
                [e("img", {
                    staticStyle: {
                        width: "35%"
                    },
                    attrs: {
                        src: "/static/image/mescroll-empty.png",
                        alt: ""
                    }
                }), t._v(" "), e("van-divider", {
                    style: {
                        color: "#ccc",
                        borderColor: "#ccc",
                        padding: "20px "
                    },
                    attrs: {
                        dashed: ""
                    }
                },
                [t._v("空空如也")])], 1)], 1), t._v(" "), e("van-popup", {
                    style: {
                        height: "calc(100% - 1.9rem - 46px)"
                    },
                    attrs: {
                        position: "bottom"
                    },
                    model: {
                        value: t.popup,
                        callback: function(a) {
                            t.popup = a
                        },
                        expression: "popup"
                    }
                },
                [1 == t.showXuan ? e("div", {
                    staticClass: "lisg"
                },
                t._l(t.dogameLis,
                function(a, i) {
                    return e("div", {
                        key: i,
                        staticClass: "bs",
                        on: {
                            click: function(e) {
                                return t.changDogame(a.name, a.platname)
                            }
                        }
                    },
                    [e("div", {
                        class: t.api_type == a.platname ? "lisga act": "lisga"
                    },
                    [t._v(t._s(a.name))])])
                }), 0) : t._e(), t._v(" "), 2 == t.showXuan ? e("div", {
                    staticClass: "lisg"
                },
                [e("div", {
                    staticClass: "bs",
                    on: {
                        click: function(a) {
                            return t.changtype("date", 1)
                        }
                    }
                },
                [e("div", {
                    class: 1 == t.date ? "lisga act": "lisga"
                },
                [t._v("今日")])]), t._v(" "), e("div", {
                    staticClass: "bs",
                    on: {
                        click: function(a) {
                            return t.changtype("date", 2)
                        }
                    }
                },
                [e("div", {
                    class: 2 == t.date ? "lisga act": "lisga"
                },
                [t._v("近7日")])]), t._v(" "), e("div", {
                    staticClass: "bs",
                    on: {
                        click: function(a) {
                            return t.changtype("date", 3)
                        }
                    }
                },
                [e("div", {
                    class: 3 == t.date ? "lisga act": "lisga"
                },
                [t._v("近15日")])]), t._v(" "), e("div", {
                    staticClass: "bs",
                    on: {
                        click: function(a) {
                            return t.changtype("date", 4)
                        }
                    }
                },
                [e("div", {
                    class: 4 == t.date ? "lisga act": "lisga"
                },
                [t._v("近30日")])])]) : t._e()])], 1)
            },
            staticRenderFns: []
        };
        var Nt = e("VU/8")(Et, Ut, !1,
        function(t) {
            e("ZznZ")
        },
        "data-v-4d755651", null).exports,
        Dt = {
            name: "activityRecord",
            data: function() {
                return {
                    list: [],
                    pageData: {},
                    page: 1,
                    loading: !1,
                    statuTypeS: ["0未约定", "待审核", "通过", "拒绝", "4未约定"]
                }
            },
            created: function() {
                this.getData()
            },
            methods: {
                getData: function() {
                    var t = this,
                    a = t.page;
                    if (a > t.pageData.last_page) t.loading = !1;
                    else {
                        t.$parent.showLoading();
                        var e = {
                            page: t.page
                        };
                        t.$apiFun.post("/api/activityApplyLog", e).then(function(e) {
                            if (200 != e.code && t.$parent.showTost(0, e.message), 200 == e.code) {
                                if (t.pageData = e.data, 1 == t.page) t.list = e.data.data;
                                else {
                                    var i = JSON.parse(n()(t.list));
                                    e.data.data.forEach(function(t) {
                                        i.push(t)
                                    }),
                                    t.list = i
                                }
                                t.page = a + 1
                            }
                            t.loading = !1,
                            t.$parent.hideLoading()
                        }).
                        catch(function(a) {
                            t.$parent.hideLoading(),
                            t.loading = !1
                        })
                    }
                }
            },
            mounted: function() {},
            updated: function() {}
        },
        Pt = {
            render: function() {
                var t = this,
                a = t.$createElement,
                e = t._self._c || a;
                return e("div", {
                    staticStyle: {
                        width: "100%",
                        "min-height": "100vh",
                        background: "rgb(237, 241, 255)"
                    }
                },
                [e("van-nav-bar", {
                    staticStyle: {
                        position: "fixed",
                        top: "0",
                        left: "0",
                        width: "100%",
                        "background-color": "#edf2fd"
                    },
                    attrs: {
                        title: "活动申请记录",
                        "left-arrow": ""
                    },
                    on: {
                        "click-left": function(a) {
                            return t.$router.back()
                        }
                    }
                }), t._v(" "), e("div", {
                    staticStyle: {
                        height: "46px"
                    }
                }), t._v(" "), e("div", {
                    staticStyle: {
                        width: "95%",
                        "min-width": "250px",
                        margin: "0 auto",
                        background: "#fff",
                        "border-radius": "10px",
                        "box-sizing": "border-box",
                        padding: "10px",
                        "min-height": "90vh"
                    }
                },
                [t.list.length > 0 ? e("van-list", {
                    staticStyle: {
                        "margin-top": "10px",
                        "padding-bottom": "120px"
                    },
                    attrs: {
                        "finished-text": "没有更多了",
                        offset: "300",
                        finished: t.list.length == t.pageData.total
                    },
                    on: {
                        load: t.getData
                    },
                    model: {
                        value: t.loading,
                        callback: function(a) {
                            t.loading = a
                        },
                        expression: "loading"
                    }
                },
                t._l(t.list,
                function(a, i) {
                    return e("van-cell", {
                        key: i
                    },
                    [e("div", {
                        staticStyle: {
                            color: "#888 !important"
                        }
                    },
                    [e("div", [t._v("活动标题：" + t._s(a.activity_name))]), t._v(" "), e("div", {
                        staticStyle: {
                            display: "flex",
                            "justify-content": "space-between"
                        }
                    },
                    [t._v("\n              申请时间：" + t._s(a.created_at) + " "), e("span", [t._v("状态： " + t._s(t.statuTypeS[a.state]))])])])])
                }), 1) : e("div", {
                    staticStyle: {
                        "margin-top": "60px",
                        "text-align": "center"
                    }
                },
                [e("img", {
                    staticStyle: {
                        width: "35%"
                    },
                    attrs: {
                        src: "/static/image/mescroll-empty.png",
                        alt: ""
                    }
                }), t._v(" "), e("van-divider", {
                    style: {
                        color: "#ccc",
                        borderColor: "#ccc",
                        padding: "20px "
                    },
                    attrs: {
                        dashed: ""
                    }
                },
                [t._v("空空如也")])], 1)], 1)], 1)
            },
            staticRenderFns: []
        };
        var zt = e("VU/8")(Dt, Pt, !1,
        function(t) {
            e("qIXG")
        },
        "data-v-59f4bebd", null).exports,
        Bt = {
            name: "transRecord",
            data: function() {
                return {
                    date: 4,
                    list: [],
                    pageData: {},
                    type: 1,
                    page: 1,
                    stateType12: ["未定义", "待审核", "审核通过", "审核拒绝"],
                    stateType34: ["失败", "成功", "待结算", "未定义"],
                    dogameLis: [],
                    api_type: "",
                    loading: !1,
                    name: "全平台",
                    dateName: ["", "今日", "近7日", "近15日", "近30日"],
                    typeName: ["", "存款", "取款", "转入", "转出"],
                    popup: !1,
                    showXuan: 1
                }
            },
            created: function() {
                this.getdogame(),
                this.getData()
            },
            methods: {
                changDogame: function(t, a) {
                    this.name = t,
                    this.api_type = a,
                    this.popup = !1,
                    this.page = 1,
                    this.getData()
                },
                changtype: function(t, a) {
                    this[t] = a,
                    this.popup = !1,
                    this.page = 1,
                    this.getData()
                },
                showPopup: function(t) {
                    this.popup = !0,
                    this.showXuan = t
                },
                openOrclose: function() {
                    this.show = !this.show
                },
                changtab: function() {
                    this.page = 1,
                    this.list = [],
                    this.pageData = {},
                    this.getData()
                },
                getdogame: function() {
                    var t = this;
                    t.$apiFun.post("/api/balancelist", {}).then(function(a) {
                        console.log(a),
                        200 != a.code && t.showTost(a.message),
                        200 == a.code && (t.dogameLis = a.data, t.dogameLis.unshift({
                            name: "全平台",
                            platname: ""
                        }))
                    })
                },
                changeDate: function() {
                    this.page = 1,
                    this.getData()
                },
                getData: function() {
                    var t = this,
                    a = t.page;
                    if (a > t.pageData.last_page) t.loading = !1;
                    else {
                        t.$parent.showLoading();
                        var e = {
                            date: t.date,
                            type: t.type,
                            page: t.page,
                            api_type: t.api_type
                        };
                        t.$apiFun.post("/api/gettransrecord", e).then(function(e) {
                            if (200 != e.code && t.$parent.showTost(0, e.message), 200 == e.code) {
                                if (t.pageData = e.data, 1 == t.page) t.list = e.data.data;
                                else {
                                    var i = JSON.parse(n()(t.list));
                                    e.data.data.forEach(function(t) {
                                        i.push(t)
                                    }),
                                    t.list = i
                                }
                                t.page = a + 1
                            }
                            t.loading = !1,
                            t.$parent.hideLoading()
                        }).
                        catch(function(a) {
                            t.$parent.hideLoading(),
                            t.loading = !1
                        })
                    }
                }
            },
            mounted: function() {},
            updated: function() {}
        },
        Rt = {
            render: function() {
                var t = this,
                a = t.$createElement,
                e = t._self._c || a;
                return e("div", {
                    staticStyle: {
                        width: "100%",
                        "min-height": "100vh",
                        background: "rgb(237, 241, 255)"
                    }
                },
                [e("van-nav-bar", {
                    staticStyle: {
                        position: "fixed",
                        top: "0",
                        left: "0",
                        width: "100%",
                        "background-color": "#edf2fd"
                    },
                    attrs: {
                        title: "交易记录",
                        "left-arrow": ""
                    },
                    on: {
                        "click-left": function(a) {
                            return t.$router.back()
                        }
                    }
                }), t._v(" "), e("div", {
                    staticStyle: {
                        height: "46px"
                    }
                }), t._v(" "), e("div", {
                    staticStyle: {
                        width: "95%",
                        "min-width": "250px",
                        margin: "0 auto",
                        background: "#fff",
                        "border-radius": "10px",
                        "box-sizing": "border-box",
                        padding: "10px",
                        "min-height": "90vh"
                    }
                },
                [e("div", {
                    staticClass: "saibox"
                },
                [e("div", {
                    staticClass: "sai",
                    on: {
                        click: function(a) {
                            return t.showPopup(1)
                        }
                    }
                },
                [t._v(t._s(t.name))]), t._v(" "), e("div", {
                    staticClass: "sai",
                    on: {
                        click: function(a) {
                            return t.showPopup(2)
                        }
                    }
                },
                [t._v(t._s(t.dateName[t.date]))]), t._v(" "), e("div", {
                    staticClass: "sai",
                    on: {
                        click: function(a) {
                            return t.showPopup(3)
                        }
                    }
                },
                [t._v(t._s(t.typeName[t.type]))])]), t._v(" "), t.list.length > 0 ? e("van-list", {
                    staticStyle: {
                        "margin-top": "10px",
                        "padding-bottom": "120px"
                    },
                    attrs: {
                        "finished-text": "没有更多了",
                        offset: "300",
                        finished: t.list.length == t.pageData.total
                    },
                    on: {
                        load: t.getData
                    },
                    model: {
                        value: t.loading,
                        callback: function(a) {
                            t.loading = a
                        },
                        expression: "loading"
                    }
                },
                t._l(t.list,
                function(a, i) {
                    return e("van-cell", {
                        key: i
                    },
                    [1 == t.type || 2 == t.type ? e("div", {
                        staticStyle: {
                            "font-size": "0.3rem"
                        }
                    },
                    [t._v("订单号：" + t._s(a.out_trade_no))]) : t._e(), t._v(" "), e("div", {
                        staticStyle: {
                            display: "flex",
                            "justify-content": "space-between"
                        }
                    },
                    [e("div", {
                        staticStyle: {
                            "font-size": "0.3rem"
                        }
                    },
                    [t._v("金额 :" + t._s(a.amount))]), t._v(" "), e("div", {
                        staticStyle: {
                            "font-size": "0.3rem"
                        }
                    },
                    [t._v(t._s(a.pay_way))]), t._v(" "), e("div", {
                        staticStyle: {
                            "font-size": "0.3rem"
                        }
                    },
                    [t._v(t._s(1 == t.type || 2 == t.type ? t.stateType12[a.state] : t.stateType34[a.state]))])]), t._v(" "), e("div", {
                        staticStyle: {
                            "font-size": "0.3rem"
                        }
                    },
                    [t._v(t._s(a.created_at))])])
                }), 1) : e("div", {
                    staticStyle: {
                        "margin-top": "60px",
                        "text-align": "center"
                    }
                },
                [e("img", {
                    staticStyle: {
                        width: "35%"
                    },
                    attrs: {
                        src: "/static/image/mescroll-empty.png",
                        alt: ""
                    }
                }), t._v(" "), e("van-divider", {
                    style: {
                        color: "#ccc",
                        borderColor: "#ccc",
                        padding: "20px "
                    },
                    attrs: {
                        dashed: ""
                    }
                },
                [t._v("空空如也")])], 1)], 1), t._v(" "), e("van-popup", {
                    style: {
                        height: "calc(100% - 1.9rem - 46px)"
                    },
                    attrs: {
                        position: "bottom"
                    },
                    model: {
                        value: t.popup,
                        callback: function(a) {
                            t.popup = a
                        },
                        expression: "popup"
                    }
                },
                [1 == t.showXuan ? e("div", {
                    staticClass: "lisg"
                },
                t._l(t.dogameLis,
                function(a, i) {
                    return e("div", {
                        key: i,
                        staticClass: "bs",
                        on: {
                            click: function(e) {
                                return t.changDogame(a.name, a.platname)
                            }
                        }
                    },
                    [e("div", {
                        class: t.api_type == a.platname ? "lisga act": "lisga"
                    },
                    [t._v(t._s(a.name))])])
                }), 0) : t._e(), t._v(" "), 2 == t.showXuan ? e("div", {
                    staticClass: "lisg"
                },
                [e("div", {
                    staticClass: "bs",
                    on: {
                        click: function(a) {
                            return t.changtype("date", 1)
                        }
                    }
                },
                [e("div", {
                    class: 1 == t.date ? "lisga act": "lisga"
                },
                [t._v("今日")])]), t._v(" "), e("div", {
                    staticClass: "bs",
                    on: {
                        click: function(a) {
                            return t.changtype("date", 2)
                        }
                    }
                },
                [e("div", {
                    class: 2 == t.date ? "lisga act": "lisga"
                },
                [t._v("近7日")])]), t._v(" "), e("div", {
                    staticClass: "bs",
                    on: {
                        click: function(a) {
                            return t.changtype("date", 3)
                        }
                    }
                },
                [e("div", {
                    class: 3 == t.date ? "lisga act": "lisga"
                },
                [t._v("近15日")])]), t._v(" "), e("div", {
                    staticClass: "bs",
                    on: {
                        click: function(a) {
                            return t.changtype("date", 4)
                        }
                    }
                },
                [e("div", {
                    class: 4 == t.date ? "lisga act": "lisga"
                },
                [t._v("近30日")])])]) : t._e(), t._v(" "), 3 == t.showXuan ? e("div", {
                    staticClass: "lisg"
                },
                [e("div", {
                    staticClass: "bs",
                    on: {
                        click: function(a) {
                            return t.changtype("type", 1)
                        }
                    }
                },
                [e("div", {
                    class: 1 == t.type ? "lisga act": "lisga"
                },
                [t._v("存款")])]), t._v(" "), e("div", {
                    staticClass: "bs",
                    on: {
                        click: function(a) {
                            return t.changtype("type", 2)
                        }
                    }
                },
                [e("div", {
                    class: 2 == t.type ? "lisga act": "lisga"
                },
                [t._v("取款")])]), t._v(" "), e("div", {
                    staticClass: "bs",
                    on: {
                        click: function(a) {
                            return t.changtype("type", 3)
                        }
                    }
                },
                [e("div", {
                    class: 3 == t.type ? "lisga act": "lisga"
                },
                [t._v("转入")])]), t._v(" "), e("div", {
                    staticClass: "bs",
                    on: {
                        click: function(a) {
                            return t.changtype("type", 4)
                        }
                    }
                },
                [e("div", {
                    class: 4 == t.type ? "lisga act": "lisga"
                },
                [t._v("转出")])])]) : t._e()])], 1)
            },
            staticRenderFns: []
        };
        var Ft = e("VU/8")(Bt, Rt, !1,
        function(t) {
            e("6FIa")
        },
        "data-v-ef128572", null).exports,
        Ot = {
            name: "money",
            data: function() {
                return {
                    daoTime: null,
                    balancelist: []
                }
            },
            created: function() {
                var t = this;
                t.getbalancelist(),
                t.daoTime = setInterval(function() {
                    t.getbalancelistNoLoding()
                },
                3500)
            },
            methods: {
                transall: function() {
                    var t = this;
                    t.$parent.showLoading(),
                    t.$apiFun.post("/api/transall", {}).then(function(a) {
                        t.$parent.showTost(1, a.message),
                        t.getbalancelist(),
                        t.refreshusermoney(),
                        t.$parent.hideLoading()
                    }).
                    catch(function(a) {
                        t.$parent.hideLoading()
                    })
                },
                getbalancelist: function() {
                    var t = this;
                    t.$parent.showLoading(),
                    t.$apiFun.post("/api/balancelist", {}).then(function(a) {
                        if (200 !== a.code && t.$parent.showTost(0, a.message), 200 === a.code) {
                            t.balancelist = a.data;
                            var e = a.data;
                            t.balancelist = e
                        }
                        t.$parent.hideLoading()
                    }).
                    catch(function(a) {
                        t.$parent.hideLoading()
                    })
                },
                getbalancelistNoLoding: function() {
                    var t = this;
                    t.$apiFun.post("/api/balancelist", {}).then(function(a) {
                        if (200 !== a.code && t.$parent.showTost(0, a.message), 200 === a.code) {
                            t.balancelist = a.data;
                            var e = a.data;
                            t.balancelist = e
                        }
                    }).
                    catch(function(t) {})
                },
                refreshusermoney: function() {
                    var t = this;
                    t.$apiFun.post("/api/refreshusermoney", {}).then(function(a) {
                        t.$parent.hideLoading(),
                        200 == a.code && (localStorage.setItem("userInfo", n()(a.data)), t.$store.commit("changUserInfo"))
                    })
                }
            },
            mounted: function() {},
            updated: function() {},
            beforeDestroy: function() {
                this.daoTime && clearInterval(this.daoTime),
                this.daoTime = null
            }
        },
        qt = {
            render: function() {
                var t = this,
                a = t.$createElement,
                e = t._self._c || a;
                return e("div", {
                    staticStyle: {
                        "background-color": "#f8f8f8"
                    }
                },
                [e("div", {
                    staticStyle: {
                        "min-height": "100vh",
                        background: "url('/static/image/bg_01.c00a1854e1446ef9fbd9f5b282da92f1.c00a1854.png') no-repeat",
                        "background-size": "100% auto",
                        "background-attachment": "fixed"
                    }
                },
                [e("img", {
                    staticClass: "bancgs",
                    staticStyle: {
                        opacity: "1"
                    },
                    attrs: {
                        src: "/static/image/bank_020021515.png",
                        alt: ""
                    },
                    on: {
                        click: function(a) {
                            return t.$router.back()
                        }
                    }
                }), t._v(" "), e("div", {
                    staticClass: "tit"
                },
                [t._v("我的钱包")]), t._v(" "), e("div", {
                    staticClass: "mefs"
                },
                [e("div", {
                    staticClass: "conts",
                    staticStyle: {
                        "padding-top": "1.4rem"
                    }
                },
                [e("div", {
                    staticClass: "titsg"
                },
                [t._v("总资产（元）")]), t._v(" "), e("div", {
                    staticClass: "mehs"
                },
                [e("div", {
                    staticClass: "lfs"
                },
                [t._v("￥")]), t._v(" "), e("div", {
                    staticClass: "num"
                },
                [t._v(t._s(1 * t.$store.state.userInfo.balance + 1 * t.$store.state.userInfo.gameblance))]), t._v(" "), e("img", {
                    staticClass: "shua",
                    attrs: {
                        src: "/static/image/icon_sx.88b45347bfcdb11586ef9a0872038bf9.png",
                        alt: ""
                    },
                    on: {
                        click: function(a) {
                            return t.$parent.getUserInfoShowLoding()
                        }
                    }
                })])])]), t._v(" "), e("div", {
                    staticClass: "bios"
                },
                [t._m(0), t._v(" "), t._v(" "), e("div", {
                    staticClass: "typelist"
                },
                [e("div", {
                    staticClass: "lis",
                    on: {
                        click: function(a) {
                            return t.$parent.goNav("/recharge")
                        }
                    }
                },
                [e("img", {
                    attrs: {
                        src: "/static/image/feature_moneydraw.ddbdd6cb1996bc0dccf6c8570d9e0183.ddbdd6cb.png",
                        alt: ""
                    }
                }), t._v("存款")]), t._v(" "), e("div", {
                    staticClass: "lis",
                    on: {
                        click: function(a) {
                            return t.$parent.goNav("/transfer")
                        }
                    }
                },
                [e("img", {
                    attrs: {
                        src: "/static/image/feature_moneytransfer.5a83f20d17131faad2162df5435af5ca.5a83f20d.png",
                        alt: ""
                    }
                }), t._v("转账")]), t._v(" "), e("div", {
                    staticClass: "lis",
                    on: {
                        click: function(a) {
                            return t.$parent.goNav("/withdrawal")
                        }
                    }
                },
                [e("img", {
                    attrs: {
                        src: "/static/image/feature_withdrawmoney.932feadcf30fa1646577e19f04412aaf.932feadc.png",
                        alt: ""
                    }
                }), t._v("取款")]), t._v(" "), e("div", {
                    staticClass: "lis",
                    on: {
                        click: function(a) {
                            return t.$parent.goNav("/wallet")
                        }
                    }
                },
                [e("img", {
                    attrs: {
                        src: "/static/image/feature_bankcard.30833143844bfe739725bd4781495a2d.30833143.png",
                        alt: ""
                    }
                }), t._v("卡片管理")])]), t._v(" "), e("div", {
                    staticClass: "gamensg"
                },
                [e("div", {
                    staticClass: "titws"
                },
                [t._v("\n          场馆余额\n          "), e("div", {
                    staticClass: "btn",
                    on: {
                        click: t.transall
                    }
                },
                [t._v("一键回收")])]), t._v(" "), e("div", {
                    staticClass: "gameBox"
                },
                t._l(t.balancelist,
                function(a, i) {					
                    return e("div", {
                        key: i,
                        staticClass: "lis"
                    },
                    [e("div", {
                        staticClass: "name"
                    },
                    [t._v(t._s(a.name))]), t._v(" "), e("div", {
                        staticClass: "nmey"
                    },
                    [t._v(t._s(a.balance)),e("img", {
                    staticClass: "shua",
                    staticStyle: {
                        width: "0.35rem",
						"margin-left": "0.2rem"
                    },					
                    attrs: {
                        src: "/static/image/iconRefresh.5b108ae65439270527aeee8ac17c2aca.png",
                        alt: ""
                    },					
                    on: {
                        click: function() {
                            return t.$parent.userapimoney(a.platname)
                        }
                    }
                })])])
                }), 0)]), t._v(" "), e("div", {
                    staticStyle: {
                        height: "1rem"
                    }
                })]), t._v(" "), e("div", {
                    staticStyle: {
                        height: "1rem"
                    }
                })])])
            },
            staticRenderFns: [function() {
                var t = this.$createElement,
                a = this._self._c || t;
                return a("div", {
                    staticClass: "toptit"
                },
                [a("div", {
                    staticClass: "shu"
                }), this._v("\n        中心钱包（元）\n      ")])
            },
            function() {
                var t = this.$createElement,
                a = this._self._c || t;
                return a("div", {
                    staticClass: "top"
                },
                [a("img", {
                    attrs: {
                        src: "/static/image/qianbao123.png",
                        alt: ""
                    }
                }), this._v("中心钱包")])
            },
            function() {
                var t = this.$createElement,
                a = this._self._c || t;
                return a("div", {
                    staticClass: "top"
                },
                [a("img", {
                    attrs: {
                        src: "/static/image/qianbao123.png",
                        alt: ""
                    }
                }), this._v("游戏钱包")])
            }]
        };
        var Vt = e("VU/8")(Ot, qt, !1,
        function(t) {
            e("Zm6Q")
        },
        "data-v-2313b02c", null).exports,
        jt = {
            name: "recharge",
            data: function() {
                var t;
                return t = {
                    pay_way: "",
                    bankBox: {},
                    payInfo: {},
                    amount: null,
                    cardLis: [],
                    banklist: []
                },
                dt()(t, "bankBox", {}),
                dt()(t, "meyXi", "TRC20"),
                dt()(t, "payWayList", {}),
                dt()(t, "show", !1),
                dt()(t, "userbank", []),
                dt()(t, "userUSD", [1]),
                dt()(t, "min_price", 100),
                dt()(t, "max_price", 1e4),
                t
            },
            created: function() {
                this.getPayWay(),
                this.getBanklist(),
                this.getcard()
            },
            methods: {
                getPayRange: function() {
                    var t = this,
                    a = null;
                    "bank" == t.pay_way && (a = "bank"),
                    "wechat" == t.pay_way && (a = "wechat"),
                    "alipay" == t.pay_way && (a = "alipay"),
                    "usdt" == t.pay_way && ("ERC20" == t.meyXi && (a = "usdt-erc20"), "TRC20" == t.meyXi && (a = "usdt-trc20")),
                    t.showLoading(),
                    t.$apiFun.post("/api/getPayRange", {
                        type: a
                    }).then(function(a) {
                        200 == a.code && (t.min_price = a.data.min_price, t.max_price = a.data.max_price),
                        t.hideLoading()
                    }).
                    catch(function(a) {
                        t.hideLoading()
                    })
                },
                changShow: function() {
                    this.show = !this.show
                },
                onConfirm: function(t, a) {
                    this.bankBox.bank = t.bank_name,
                    this.show = !1
                },
                onChange: function(t, a, e) {},
                onCancel: function() {
                    this.show = !1
                },
                changXiyi: function(t) {
                    this.meyXi != t && (this.meyXi = t, this.getPayRange())
                },
                getPayWay: function() {
                    var t = this;
                    t.showLoading(),
                    t.$apiFun.get("/api/get_pay_way", {}).then(function(a) {
                        if (200 == a.code) {
                            t.payWayList = a.data,
                            t.payWayList.rengong = 1;
                            var e = t.payWayList;
                            for (var i in e) if (1 == e[i]) return t.pay_way = "card" == i ? "bank": i,
                            t.hideLoading(),
                            void t.getPayRange()
                        }
                        t.hideLoading()
                    }).
                    catch(function(a) {
                        t.hideLoading()
                    })
                },
                payTest: function() {
                    var t = this,
                    a = {};
                    if ("bank" == t.pay_way) {
                        if (a = {
                            paytype: t.pay_way,
                            amount: 1 * t.amount,
                            bank: t.bankBox.bank,
                            bank_address: t.bankBox.bank_address,
                            bank_no: t.bankBox.bank_no,
                            bank_owner: t.bankBox.bank_owner
                        },
                        console.log(a), !a.bank_owner) return void t.showTost(0, "请输入存款人姓名");
                        if (!a.bank) return void t.showTost(0, "请输入银行类型");
                        if (!a.bank_no) return void t.showTost(0, "请输入银行卡号");
                        if (!a.bank_address) return void t.showTost(0, "请输入银行开户行地址")
                    } else a = {
                        paytype: t.pay_way,
                        amount: 1 * t.amount
                    };
                    "usdt" == t.pay_way && (a.catepay = t.meyXi),
                    a.amount < t.min_price || a.amount > t.max_price ? t.showTost(0, "请输入金额在" + t.min_price + "-" + t.max_price + "之间！") : (t.showLoading(), a.paytype = "wechat" == a.paytype ? "wxpay": a.paytype, t.$apiFun.post("/api/recharge", a).then(function(a) {
                        if (console.log(a), 200 != a.code && t.showTost(0, a.message), 200 == a.code) {
                            if (t.amount = null, "bank" == t.pay_way) return t.showTost(1, "提交成功，等待后台审核"),
                            t.bankBox = {},
                            t.amount = null,
                            t.hideLoading(),
                            void t.$router.push({
                                path: "/transRecord"
                            });
                            t.bankBox = {},
                            t.amount = null,
                            t.$router.push({
                                path: "/payInfo?deposit_no=" + a.message
                            })
                        }
                        t.hideLoading()
                    }).
                    catch(function(a) {
                        t.hideLoading()
                    }))
                },
                changMey: function(t) {
                    this.amount = 1 * t
                },
                getBanklist: function() {
                    var t = this;
                    t.$apiFun.post("/api/banklist", {}).then(function(a) {
                        200 != a.code && t.showTost(0, a.message),
                        200 == a.code && (t.banklist = a.data),
                        t.hideLoading()
                    }).
                    catch(function(a) {
                        t.hideLoading()
                    })
                },
                getcard: function() {
                    var t = this;
                    t.showLoading(),
                    t.$apiFun.post("/api/getpaybank", {}).then(function(a) {
                        200 != a.code && t.showTost(0, a.message),
                        200 == a.code && (t.cardLis = a.data, t.hideLoading())
                    }).
                    catch(function(a) {
                        t.hideLoading()
                    })
                },
                changPayway: function(t) {
                    t != this.pay_way && (this.pay_way = t, this.bankBox = {},
                    this.payInfo = {},
                    this.amount = null, this.getPayRange())
                },
                goNav: function(t) {
                    this.$parent.goNav(t)
                },
                doCopy: function(t) {
                    var a = document.createElement("input");
                    a.style.opacity = "0",
                    a.value = t,
                    document.body.appendChild(a),
                    a.select(),
                    document.execCommand("copy"),
                    this.showTost(1, "复制成功！")
                },
                getUserInfo: function() {
                    this.$parent.getUserInfo()
                },
                showLoading: function() {
                    this.$parent.showLoading()
                },
                hideLoading: function() {
                    this.$parent.hideLoading()
                },
                openKefu: function() {
                    this.$parent.openKefu()
                },
                showTost: function(t, a) {
                    this.$parent.showTost(t, a)
                },
                getuseCardlist: function() {
                    var t = this;
                    t.$apiFun.post("/api/getcard", {
                        type: 1
                    }).then(function(a) {
                        200 == a.code && (t.userbank = a.data)
                    }),
                    t.$apiFun.post("/api/getcard", {
                        type: 2
                    }).then(function(a) {
                        200 == a.code && (t.userUSD = a.data)
                    })
                }
            },
            mounted: function() {},
            updated: function() {},
            beforeRouteEnter: function(t, a, e) {
                e(function(t) {
                    console.log(t);
                    t.getuseCardlist()
                })
            }
        },
        Mt = {
            render: function() {
                var t = this,
                a = t.$createElement,
                e = t._self._c || a;
                return t.pay_way ? e("div", {
                    staticClass: "sdg",
                    staticStyle: {
                        width: "100%",
                        "min-height": "100vh",
                        background: "rgb(237, 241, 255)",
                        "padding-bottom": "50px"
                    }
                },
                [e("div", {
                    staticStyle: {
                        width: "100%",
                        background: "#fff"
                    }
                },
                [e("van-nav-bar", {
                    staticStyle: {
                        position: "fixed",
                        top: "0",
                        left: "0",
                        width: "100%",
                        "background-color": "#edf2fd"
                    },
                    attrs: {
                        title: "存款",
                        "left-arrow": ""
                    },
                    on: {
                        "click-left": function(a) {
                            return t.$router.back()
                        }
                    }
                }), t._v(" "), e("div", {
                    staticStyle: {
                        height: "46px"
                    }
                }), t._v(" "), e("div", {
                    staticClass: "typelis"
                },
                [1 == t.payWayList.card ? e("div", {
                    class: "bank" == t.pay_way ? " tyls atc": "tyls",
                    on: {
                        click: function(a) {
                            return t.changPayway("bank")
                        }
                    }
                },
                [e("img", {
                    attrs: {
                        src: "/static/image/icoOnlineTransfer2@3x.png",
                        alt: ""
                    }
                }), t._v("网银转账")]) : t._e(), t._v(" "), 1 == t.payWayList.usdt ? e("div", {
                    class: "usdt" == t.pay_way ? " tyls atc": "tyls",
                    on: {
                        click: function(a) {
                            return t.changPayway("usdt")
                        }
                    }
                },
                [e("img", {
                    attrs: {
                        src: "/static/image/1595237922936176.png",
                        alt: ""
                    }
                }), t._v("USDT")]) : t._e(), t._v(" "), 1 == t.payWayList.wechat ? e("div", {
                    class: "wechat" == t.pay_way ? " tyls atc": "tyls",
                    on: {
                        click: function(a) {
                            return t.changPayway("wechat")
                        }
                    }
                },
                [e("img", {
                    attrs: {
                        src: "/static/image/QuickWechat.png",
                        alt: ""
                    }
                }), t._v("微信")]) : t._e(), t._v(" "), 1 == t.payWayList.alipay ? e("div", {
                    class: "alipay" == t.pay_way ? " tyls atc": "tyls",
                    on: {
                        click: function(a) {
                            return t.changPayway("alipay")
                        }
                    }
                },
                [e("img", {
                    attrs: {
                        src: "/static/image/icoAlipay2@3x.png",
                        alt: ""
                    }
                }), t._v("支付宝")]) : t._e()]), t._v(" "), "bank" != t.pay_way || 0 == t.userbank.length && 0 == t.userUSD.length ? t._e() : e("div", [e("div", {
                    staticClass: "usrse"
                },
                [t._l(t.cardLis,
                function(a, i) {
                    return e("div", {
                        key: i,
                        staticClass: "bans"
                    },
                    [e("p", [e("span", {
                        staticClass: "frists"
                    },
                    [t._v(" 收款账号 ")]), e("span", {
                        staticClass: "sdsw"
                    },
                    [t._v(t._s(a.bank_no))]), e("span", {
                        staticClass: "copy",
                        on: {
                            click: function(e) {
                                return t.doCopy(a.bank_no)
                            }
                        }
                    },
                    [t._v(" 复制 ")])]), t._v(" "), e("p", [e("span", {
                        staticClass: "frists"
                    },
                    [t._v(" 银行户名 ")]), e("span", {
                        staticClass: "sdsw"
                    },
                    [t._v(t._s(a.bank_owner))]), e("span", {
                        staticClass: "copy",
                        on: {
                            click: function(e) {
                                return t.doCopy(a.bank_owner)
                            }
                        }
                    },
                    [t._v(" 复制 ")])]), t._v(" "), e("p", [e("span", {
                        staticClass: "frists"
                    },
                    [t._v(" 开户行 ")]), e("span", {
                        staticClass: "sdsw"
                    },
                    [t._v(t._s(a.bank_data.bank_name))]), e("span", {
                        staticClass: "copy",
                        on: {
                            click: function(e) {
                                return t.doCopy(a.bank_data.bank_name)
                            }
                        }
                    },
                    [t._v(" 复制 ")])]), t._v(" "), e("p", [e("span", {
                        staticClass: "frists"
                    },
                    [t._v(" 银行地址 ")]), e("span", {
                        staticClass: "sdsw"
                    },
                    [t._v(t._s(a.bank_address))]), e("span", {
                        staticClass: "copy",
                        on: {
                            click: function(e) {
                                return t.doCopy(a.bank_address)
                            }
                        }
                    },
                    [t._v(" 复制 ")])])])
                }), t._v(" "), e("div", {
                    staticClass: "hgs",
                    on: {
                        click: t.changShow
                    }
                },
                [e("div", {
                    staticClass: "nams"
                },
                [t._v("开户银行")]), t._v(" "), e("div", {
                    staticStyle: {
                        "border-bottom": "1px solid #f2f2f2"
                    }
                },
                [e("van-cell-group", [e("van-field", {
                    attrs: {
                        type: "text",
                        placeholder: "选择开户银行",
                        disabled: ""
                    },
                    model: {
                        value: t.bankBox.bank,
                        callback: function(a) {
                            t.$set(t.bankBox, "bank", a)
                        },
                        expression: "bankBox.bank"
                    }
                })], 1)], 1)]), t._v(" "), e("div", {
                    staticStyle: {
                        height: "0.2rem",
                        background: "#f8f8f8",
                        width: "100wh"
                    }
                }), t._v(" "), e("div", {
                    staticClass: "hgs"
                },
                [e("div", {
                    staticClass: "nams"
                },
                [t._v("存款人姓名")]), t._v(" "), e("div", {
                    staticStyle: {
                        "border-bottom": "1px solid #f2f2f2"
                    }
                },
                [e("van-cell-group", [e("van-field", {
                    attrs: {
                        type: "text",
                        placeholder: "请输入存款人姓名"
                    },
                    model: {
                        value: t.bankBox.bank_owner,
                        callback: function(a) {
                            t.$set(t.bankBox, "bank_owner", a)
                        },
                        expression: "bankBox.bank_owner"
                    }
                })], 1)], 1), t._v(" "), e("div", {
                    staticClass: "lasthg"
                },
                [t._v("为及时到账，请务必输入正确的存款人姓名")])]), t._v(" "), e("div", {
                    staticStyle: {
                        height: "0.2rem",
                        background: "#f8f8f8",
                        width: "100wh"
                    }
                }), t._v(" "), e("div", {
                    staticClass: "hgs"
                },
                [e("div", {
                    staticClass: "nams"
                },
                [t._v("银行卡号")]), t._v(" "), e("div", {
                    staticStyle: {
                        "border-bottom": "1px solid #f2f2f2"
                    }
                },
                [e("van-cell-group", [e("van-field", {
                    attrs: {
                        type: "text",
                        placeholder: "请输入银行卡号"
                    },
                    model: {
                        value: t.bankBox.bank_no,
                        callback: function(a) {
                            t.$set(t.bankBox, "bank_no", a)
                        },
                        expression: "bankBox.bank_no"
                    }
                })], 1)], 1)]), t._v(" "), e("div", {
                    staticStyle: {
                        height: "0.2rem",
                        background: "#f8f8f8",
                        width: "100wh"
                    }
                }), t._v(" "), e("div", {
                    staticClass: "hgs"
                },
                [e("div", {
                    staticClass: "nams"
                },
                [t._v("开户行地址")]), t._v(" "), e("div", {
                    staticStyle: {
                        "border-bottom": "1px solid #f2f2f2"
                    }
                },
                [e("van-cell-group", [e("van-field", {
                    attrs: {
                        type: "text",
                        placeholder: "请输入开户行地址"
                    },
                    model: {
                        value: t.bankBox.bank_address,
                        callback: function(a) {
                            t.$set(t.bankBox, "bank_address", a)
                        },
                        expression: "bankBox.bank_address"
                    }
                })], 1)], 1)]), t._v(" "), e("div", {
                    staticStyle: {
                        height: "0.2rem",
                        background: "#f8f8f8",
                        width: "100wh"
                    }
                }), t._v(" "), e("div", {
                    staticClass: "hgs"
                },
                [e("div", {
                    staticClass: "nams"
                },
                [t._v("存款金额")]), t._v(" "), e("div", {
                    staticStyle: {
                        "border-bottom": "1px solid #f2f2f2"
                    }
                },
                [e("van-cell-group", [e("van-field", {
                    attrs: {
                        label: "￥",
                        type: "text",
                        placeholder: "请输入取款金额 " + t.min_price + " - " + t.max_price
                    },
                    scopedSlots: t._u([{
                        key: "button",
                        fn: function() {
                            return [e("span", {
                                staticStyle: {
                                    color: "#000"
                                }
                            },
                            [t._v(" 元")])]
                        },
                        proxy: !0
                    }], null, !1, 1753935358),
                    model: {
                        value: t.amount,
                        callback: function(a) {
                            t.amount = a
                        },
                        expression: "amount"
                    }
                })], 1)], 1), t._v(" "), e("div", {
                    staticClass: "lasthg"
                })]), t._v(" "), e("div", {
                    staticStyle: {
                        height: "0.2rem",
                        background: "#f8f8f8",
                        width: "100wh"
                    }
                })], 2)]), t._v(" "), "usdt" == t.pay_way ? e("div", [e("div", {
                    staticClass: "tipsh"
                },
                [e("div", {
                    staticClass: "tops"
                },
                [t._v("USDT价格稳定 流通性高 不受监管 "), e("span", {
                    on: {
                        click: function(a) {
                            return t.$parent.goNav("/usdtmore")
                        }
                    }
                },
                [t._v("了解更多 >")])]), t._v(" "), t._m(0)]), t._v(" "), e("div", {
                    staticClass: "usrse"
                },
                [e("div", {
                    staticClass: "hgs"
                },
                [e("div", {
                    staticClass: "nams sc"
                },
                [t._v("\n            钱包协议\n            "), e("div", {
                    class: "TRC20" == t.meyXi ? " ssa acti": "ssa",
                    on: {
                        click: function(a) {
                            return t.changXiyi("TRC20")
                        }
                    }
                },
                [t._v("TRC20")]), t._v(" "), e("div", {
                    class: "ERC20" == t.meyXi ? " ssa acti": "ssa",
                    staticStyle: {
                        "margin-left": "0.5rem"
                    },
                    on: {
                        click: function(a) {
                            return t.changXiyi("ERC20")
                        }
                    }
                },
                [t._v("ERC20")])]), t._v(" "), e("div", {
                    staticStyle: {
                        "border-bottom": "1px solid #f2f2f2"
                    }
                })]), t._v(" "), e("div", {
                    staticStyle: {
                        height: "0.2rem",
                        background: "#f8f8f8",
                        width: "100wh"
                    }
                }), t._v(" "), e("div", {
                    staticClass: "hgs"
                },
                [e("div", {
                    staticClass: "nams"
                },
                [t._v("存款金额")]), t._v(" "), e("div", {
                    staticStyle: {
                        "border-bottom": "1px solid #f2f2f2"
                    }
                },
                [e("van-cell-group", [e("van-field", {
                    attrs: {
                        label: "￥",
                        type: "text",
                        placeholder: "请输入取款金额 " + t.min_price + " - " + t.max_price
                    },
                    scopedSlots: t._u([{
                        key: "button",
                        fn: function() {
                            return [e("span", {
                                staticStyle: {
                                    color: "#000"
                                }
                            },
                            [t._v(" 元")])]
                        },
                        proxy: !0
                    }], null, !1, 1753935358),
                    model: {
                        value: t.amount,
                        callback: function(a) {
                            t.amount = a
                        },
                        expression: "amount"
                    }
                })], 1)], 1), t._v(" "), e("div", {
                    staticClass: "lasthg"
                },
                [e("span", {
                    staticStyle: {
                        color: "red",
                        "font-size": "0.43rem",
                        "margin-right": "10px"
                    }
                },
                [t._v("≈ ")]), t._v(" " + t._s(t.amount ? Math.floor(t.amount / t.$store.state.userInfo.usdtrate * 100) / 100 : "0.00") + "USDT ; 参考汇率：" + t._s(t.$store.state.userInfo.usdtrate))])]), t._v(" "), e("div", {
                    staticStyle: {
                        height: "0.2rem",
                        background: "#f8f8f8",
                        width: "100wh"
                    }
                }), t._v(" "), t._m(1), t._v(" "), e("div", {
                    staticStyle: {
                        height: "0.2rem",
                        background: "#f8f8f8",
                        width: "100wh"
                    }
                })])]) : t._e(), t._v(" "), "wechat" == t.pay_way || "alipay" == t.pay_way ? e("div", [e("div", {
                    staticStyle: {
                        height: "0.2rem",
                        background: "#f8f8f8",
                        width: "100wh"
                    }
                }), t._v(" "), e("div", {
                    staticClass: "usrse"
                },
                [e("div", {
                    staticClass: "hgs"
                },
                [e("div", {
                    staticClass: "nams"
                },
                [t._v("存款金额")]), t._v(" "), e("div", {
                    staticStyle: {
                        "border-bottom": "1px solid #f2f2f2"
                    }
                },
                [e("van-cell-group", [e("van-field", {
                    attrs: {
                        label: "￥",
                        type: "text",
                        placeholder: "请输入取款金额 " + t.min_price + " - " + t.max_price
                    },
                    scopedSlots: t._u([{
                        key: "button",
                        fn: function() {
                            return [e("span", {
                                staticStyle: {
                                    color: "#000"
                                }
                            },
                            [t._v(" 元")])]
                        },
                        proxy: !0
                    }], null, !1, 1753935358),
                    model: {
                        value: t.amount,
                        callback: function(a) {
                            t.amount = a
                        },
                        expression: "amount"
                    }
                })], 1)], 1), t._v(" "), e("div", {
                    staticClass: "lasthg"
                })]), t._v(" "), e("div", {
                    staticStyle: {
                        height: "0.2rem",
                        background: "#f8f8f8",
                        width: "100wh"
                    }
                })])]) : t._e(), t._v(" "), e("div", {
                    staticStyle: {
                        margin: "0 auto",
                        width: "86%"
                    }
                },
                [e("van-button", {
                    staticStyle: {
                        "margin-top": "20px",
                        width: "100%"
                    },
                    attrs: {
                        type: "info"
                    },
                    on: {
                        click: t.payTest
                    }
                },
                [t._v("立即存款")]), t._v(" "), e("div", {
                    staticClass: "textcns",
                    staticStyle: {
                        "text-align": "center",
                        color: "#999",
                        padding: "10px 0"
                    }
                },
                [t._v("存款遇到问题？联系 "), e("span", {
                    staticStyle: {
                        color: "#597ef7",
                        display: "inline-block",
                        margin: "0 6px"
                    },
                    on: {
                        click: t.$parent.openKefu
                    }
                },
                [t._v("人工客服")]), t._v(" 解决")])], 1)], 1), t._v(" "), t.show ? e("div", {
                    staticStyle: {
                        position: "fixed",
                        width: "100%",
                        height: "100%",
                        top: "0",
                        "z-index": "999",
                        background: "rgba(0, 0, 0, 0.39)"
                    }
                },
                [e("van-picker", {
                    staticStyle: {
                        position: "absolute",
                        bottom: "0",
                        left: "0",
                        width: "100%"
                    },
                    attrs: {
                        title: "银行类型",
                        "show-toolbar": "",
                        columns: t.banklist,
                        "value-key": "bank_name"
                    },
                    on: {
                        confirm: t.onConfirm,
                        cancel: t.onCancel,
                        change: t.onChange
                    }
                })], 1) : t._e(), t._v(" "), 0 == t.userbank.length && 0 == t.userUSD.length ? e("div", {
                    staticClass: "domainModal_domainView__FWCzg"
                },
                [e("div", {
                    staticClass: "domainModal_mask__24Y2m domainModal_fadeIn__1I3AS false",
                    on: {
                        click: function(a) {
                            return t.$router.back()
                        }
                    }
                }), t._v(" "), e("div", {
                    staticClass: "domainModal_content__1nBgc",
                    staticStyle: {
                        width: "80%"
                    }
                },
                [e("div", {
                    staticClass: "domainModal_contentTop__2C4jc",
                    attrs: {
                        id: "domain"
                    }
                },
                [e("img", {
                    staticStyle: {
                        position: "absolute",
                        top: "5px",
                        right: "13px",
                        width: "0.6rem"
                    },
                    attrs: {
                        src: "/static/image/hongbaocolse.png",
                        alt: ""
                    },
                    on: {
                        click: function(a) {
                            return t.$router.back()
                        }
                    }
                }), t._v(" "), e("div", {
                    staticClass: "domainModal_top__1omYS"
                },
                [t._v("温馨提示")]), t._v(" "), e("div", {
                    staticClass: "domainModal_middle__3gQPm",
                    staticStyle: {
                        padding: "30px"
                    }
                },
                [t._v("您还为绑定任何钱包卡片，请前往绑定！")]), t._v(" "), e("div", {
                    staticStyle: {
                        height: "30px",
                        "text-align": "center",
                        "line-height": "30px",
                        color: "#fff"
                    },
                    on: {
                        click: function(a) {
                            return t.$parent.goNav("/wallet")
                        }
                    }
                },
                [t._v("前往绑定")])])])]) : t._e()]) : t._e()
            },
            staticRenderFns: [function() {
                var t = this.$createElement,
                a = this._self._c || t;
                return a("div", {
                    staticClass: "tsg"
                },
                [a("div", {
                    staticClass: "tsgs"
                },
                [this._v("绑定协议地址")]), this._v(" "), a("div", {
                    staticClass: "tsgs"
                },
                [this._v("交易所划转")]), this._v(" "), a("div", {
                    staticClass: "tsgs"
                },
                [this._v("完成取款")])])
            },
            function() {
                var t = this.$createElement,
                a = this._self._c || t;
                return a("div", {
                    staticClass: "hgs"
                },
                [a("div", {
                    staticClass: "nams"
                },
                [this._v("温馨提示")]), this._v(" "), a("div", {
                    staticClass: "lasthg",
                    staticStyle: {
                        "border-top": "1px solid #eee",
                        "margin-top": "10px"
                    }
                },
                [this._v("请选择正确的USDT协议付款，若您选择错误的协议付款，平台将无法收到您的付款，为此我们不承担任何负责！")])])
            }]
        };
        var Gt = e("VU/8")(jt, Mt, !1,
        function(t) {
            e("RvBS")
        },
        "data-v-9c8fdf02", null).exports,
        Yt = {
            name: "payInfo",
            data: function() {
                return {
                    payInfo: {},
                    type: null,
                    daoTime: null,
                    m: 0,
                    s: 0
                }
            },
            created: function() {
                var t = this.$route.query;
                t.deposit_no && this.getpayinfo(t.deposit_no)
            },
            methods: {
                doCopy: function(t) {
                    var a = document.createElement("input");
                    a.style.opacity = "0",
                    a.value = t,
                    document.body.appendChild(a),
                    a.select(),
                    document.execCommand("copy"),
                    this.$parent.showTost(1, "复制成功！")
                },
                getpayinfo: function(t) {
                    var a = this,
                    e = this;
                    this.$parent.showLoading(),
                    e.$apiFun.post("/api/payinfo", {
                        deposit_no: t
                    }).then(function(t) {
                        console.log(t),
                        200 != t.code && e.$parent.showTost(0, t.message),
                        200 == t.code && (e.payInfo = t.data, e.type = t.message, e.countTime()),
                        a.$parent.hideLoading()
                    })
                },
                countTime: function() {
                    var t = (new Date).getTime(),
                    a = this.payInfo.info.created_at,
                    e = new Date(a).getTime() + 36e5 - t;
                    if (! (e >= 0)) return clearInterval(this.countTime),
                    void(this.countTime = null);
                    this.m = Math.floor(e / 1e3 / 60 % 60),
                    this.s = Math.floor(e / 1e3 % 60);
                    this.m,
                    this.m,
                    this.s,
                    this.s;
                    setTimeout(this.countTime, 1e3)
                }
            },
            mounted: function() {},
            updated: function() {},
            beforeDestroy: function() {
                this.countTime && clearInterval(this.countTime),
                this.countTime = null
            }
        },
        Jt = {
            render: function() {
                var t = this,
                a = t.$createElement,
                e = t._self._c || a;
                return e("div", {
                    staticClass: "app app-ti_green metransRecord",
                    attrs: {
                        "data-v-f531b812": ""
                    }
                },
                [e("div", {
                    staticClass: "header",
                    attrs: {
                        "data-v-8a75a126": "",
                        "data-v-f531b812": ""
                    }
                },
                [e("div", {
                    staticClass: "header__top-wrapper",
                    attrs: {
                        "data-v-8a75a126": ""
                    }
                },
                [e("div", {
                    staticClass: "van-nav-bar van-nav-bar--fixed fixed-top rounded-corners nav-header",
                    attrs: {
                        "data-v-8a75a126": ""
                    }
                },
                [e("div", {
                    staticClass: "van-nav-bar__content"
                },
                [e("div", {
                    staticClass: "van-nav-bar__left",
                    on: {
                        click: function(a) {
                            return t.$router.back()
                        }
                    }
                },
                [e("i", {
                    staticClass: "van-icon van-icon-arrow-left van-nav-bar__arrow"
                })]), t._v(" "), e("div", {
                    staticClass: "van-nav-bar__title van-ellipsis"
                },
                [t._v("充值信息")])])])])]), t._v(" "), e("div", {
                    staticStyle: {
                        height: "40px"
                    }
                }), t._v(" "), e("div", {
                    staticClass: "wrapper green-wrapper",
                    attrs: {
                        "data-v-334775a8": "",
                        "data-v-f531b812": ""
                    }
                },
                [e("div", {
                    attrs: {
                        "data-v-334775a8": ""
                    }
                },
                [e("div", {
                    staticClass: "PayInfoTime green-PayInfoTime",
                    attrs: {
                        "data-v-334775a8": ""
                    }
                },
                [e("div", {
                    staticClass: "PayAmount"
                },
                [e("span", {
                    staticClass: "Amount"
                },
                [t._v(t._s(t.payInfo.info.amount))]), e("span", [t._v(" 元 ")])]), t._v(" "), e("div", {
                    staticClass: "Countdown"
                },
                [e("div", [t._v("\n            请在"), e("span", {
                    attrs: {
                        place: "time"
                    }
                },
                [t._v(t._s(t.m >= 10 ? t.m: "0" + t.m) + "：" + t._s(t.s >= 10 ? t.s: "0" + t.s))]), t._v("内完成支付\n          ")])]), t._v(" "), e("div", [t._v("成功付款后，将自动到账！")]), t._v(" "), e("div", [t._v("如有问题，请"), e("span", {
                    staticClass: "contact-customer",
                    attrs: {
                        place: "thing"
                    },
                    on: {
                        click: t.$parent.openKefu
                    }
                },
                [t._v(" 联系客服 ")]), t._v("确认")])])]), t._v(" "), e("div", {
                    staticClass: "transaction-detail bg",
                    attrs: {
                        "data-v-334775a8": ""
                    }
                },
                ["usdtpay" == t.type ? e("p", {
                    attrs: {
                        "data-v-334775a8": ""
                    }
                },
                [e("span", {
                    attrs: {
                        "data-v-334775a8": ""
                    }
                },
                [t._v(" 收款地址 ")]), e("span", {
                    staticStyle: {
                        "word-break": "break-word",
                        "max-width": "240px"
                    },
                    attrs: {
                        "data-v-334775a8": ""
                    }
                },
                [e("span", {
                    staticClass: "transNum paddingSty",
                    attrs: {
                        "data-v-334775a8": ""
                    }
                },
                [t._v(t._s(t.payInfo.cardlist.mch_id))]), e("span", {
                    staticClass: "copy",
                    attrs: {
                        "data-v-334775a8": ""
                    },
                    on: {
                        click: function(a) {
                            return t.doCopy(t.payInfo.cardlist.mch_id)
                        }
                    }
                },
                [t._v(" 复制 ")])])]) : t._e(), t._v(" "), e("p", {
                    attrs: {
                        "data-v-334775a8": ""
                    }
                },
                [e("span", {
                    attrs: {
                        "data-v-334775a8": ""
                    }
                },
                [t._v(" 订单号 ")]), e("span", {
                    attrs: {
                        "data-v-334775a8": ""
                    }
                },
                [e("span", {
                    staticClass: "transNum paddingSty",
                    attrs: {
                        "data-v-334775a8": ""
                    }
                },
                [t._v(t._s(t.payInfo.deposit_no))]), t._e()])]), t._v(" "), e("p", {
                    attrs: {
                        "data-v-334775a8": ""
                    }
                },
                [t._v("交易时间 "), e("span", {
                    staticClass: "tran-time",
                    attrs: {
                        "data-v-334775a8": ""
                    }
                },
                [t._v(" " + t._s(t.payInfo.info.created_at) + " ")])]), t._v(" "), e("p", {
                    attrs: {
                        "data-v-334775a8": ""
                    }
                },
                [t._v("\n        充值方式"), e("span", {
                    staticClass: "tran-type",
                    attrs: {
                        "data-v-334775a8": ""
                    }
                },
                [t._v(t._s(t.payInfo.info.paytype))])]), t._v(" "), "usdtpay" == t.type ? e("p", {
                    attrs: {
                        "data-v-334775a8": ""
                    }
                },
                [t._v("\n        钱包协议"), e("span", {
                    staticClass: "tran-type",
                    attrs: {
                        "data-v-334775a8": ""
                    }
                },
                [t._v(t._s(t.payInfo.cardlist.content))])]) : t._e(), t._v(" "), e("img", {
                    staticStyle: {
                        width: "80%",
                        display: "block",
                        margin: "10px auto"
                    },
                    attrs: {
                        src: t.payInfo.cardlist.payimg,
                        alt: ""
                    }
                })]), t._v(" "), e("div", {
                    staticClass: "footer",
                    attrs: {
                        "data-v-334775a8": ""
                    }
                },
                [e("div", {
                    staticClass: "goback-button",
                    attrs: {
                        "data-v-334775a8": ""
                    },
                    on: {
                        click: function(a) {
                            return t.$parent.goNav("/transRecord")
                        }
                    }
                },
                [e("img", {
                    staticClass: "icon",
                    attrs: {
                        "data-v-334775a8": "",
                        src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAWCAMAAADpVnyHAAAAPFBMVEVHcEwLqoUPqIUPqIYIp4cAr4AOqIYMp4cOp4UNp4UPqIYPqIYPqIYOp4YOqIUPqIYOqIUPp4UNqYYPqIanHmPRAAAAE3RSTlMAMO/wIBBwQIBg0MDfoLCvkOBQvn0j8QAAAJFJREFUGBl1wYkBwiAQBMAlPHdAXrf/XgVJFA3OoOMi/ogTBUM7yYABn1ko7szMSnETJ74ofu08beLQ8xs7c/C4mMRvs6AxE28ULwcHIirLkYgicmRyKMRyIKNyiQOCyi88LSJRV1YZTWCjqJxakg6NWFaKxiQy4OQSC8XJr1xx8QvJgIs/Mj4CafAmREce6MgTIHASgfcpjWAAAAAASUVORK5CYII="
                    }
                }), e("span", {
                    attrs: {
                        "data-v-334775a8": ""
                    }
                },
                [t._v("充值完成")])]), t._v(" "), e("div", {
                    staticClass: "seedetail-button",
                    attrs: {
                        "data-v-334775a8": ""
                    },
                    on: {
                        click: function(a) {
                            return t.$parent.goNav("/transRecord")
                        }
                    }
                },
                [e("img", {
                    staticClass: "icon",
                    attrs: {
                        "data-v-334775a8": "",
                        src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAcCAMAAACnDzTfAAAAOVBMVEUMqIcPqIYOqIUOqIYPqIUAr4ALqoVHcEwPp4YOqYcNp4UPqIYPp4UOqIYOqIUIp4cNqYYOqIUPqIbGVSZiAAAAEnRSTlM/0JBw8BAwAMB/YN/goG8gULADspVqAAAAtklEQVQoz42S2xbEEAxFg0hCbzP5/48d2lqL0mnPm2xHboDZL5NeZCwnAW+oA5mdfXX+wEURNWSmCtwpqiRGqj1iyFGAJxZDo1gzaYuUmllpZN/mo7Y9epvvHxvrmZ1v5oBfZZLgR4yOXSLxpYfkMooWHCr6Lp87HH5W2zFRe94xAxarmdGNT7o/UfKd/2VRXKHUyXudAXcD5LKLcn/llPy5JydYzcWl5YYt+QluZplem+8Ye6EfKyMbAQTPPjYAAAAASUVORK5CYII="
                    }
                }), e("span", {
                    attrs: {
                        "data-v-334775a8": ""
                    }
                },
                [t._v("资金明细")])])])]), t._v(" "), e("div", {
                    staticClass: "float-divbox",
                    attrs: {
                        "data-v-f531b812": ""
                    }
                }), t._v(" "), e("span", {
                    staticClass: "customer-service-container",
                    attrs: {
                        "data-v-7b0f8a3e": "",
                        "data-v-f531b812": ""
                    }
                }), e("span", {
                    attrs: {
                        "data-v-f531b812": ""
                    }
                }), t._v(" "), t._m(0)])
            },
            staticRenderFns: [function() {
                var t = this.$createElement,
                a = this._self._c || t;
                return a("div", {
                    staticClass: "select-service-line-view select-service-line-view",
                    attrs: {
                        "data-v-55ec3770": "",
                        "data-v-f531b812": ""
                    }
                },
                [a("dl", {
                    staticClass: "select-service-list",
                    attrs: {
                        "data-v-55ec3770": ""
                    }
                },
                [a("div", {
                    staticStyle: {
                        height: "55px"
                    },
                    attrs: {
                        "data-v-55ec3770": ""
                    }
                })])])
            }]
        };
        var Xt = e("VU/8")(Yt, Jt, !1,
        function(t) {
            e("f3ov")
        },
        "data-v-0527af62", null).exports,
        Qt = {
            name: "withdrawal",
            data: function() {
                return {
                    usercardLis: [],
                    usdssLis: [],
                    amount: null,
                    bankId: null,
                    chanmeyXi: null,
                    password: null,
                    activeName: 1,
                    daoTime: null,
                    balancelist: [],
                    showLis: 3,
                    show: !1,
                    hgInfo: {},
                    betAmount: null
                }
            },
            created: function() {
                var t = this;
                t.getBetAmount(),
                t.getUsercard(),
                t.getUsdssList(),
                t.getbalancelist(),
                t.daoTime = setInterval(function() {
                    t.getbalancelistNoLoding()
                },
                3500)
            },
            methods: {
                getBetAmount: function() {
                    var t = this;
                    t.$apiFun.post("/api/getBetAmount", {}).then(function(a) {
                        200 != a.code && t.$parent.showTost(0, a.message),
                        200 == a.code && (t.betAmount = a.data.bet_amount)
                    }).
                    catch(function(t) {})
                },
                bigMey: function(t) {
                    this.amount = 1 * t
                },
                changShow: function() {
                    this.show = !this.show
                },
                changShowLis: function(t) {
                    this.showLis = t
                },
                getbalancelist: function() {
                    var t = this;
                    t.$parent.showLoading(),
                    t.$apiFun.post("/api/balancelist", {}).then(function(a) {
                        if (200 !== a.code && t.$parent.showTost(0, a.message), 200 === a.code) {
                            t.balancelist = a.data;
                            var e = a.data;
                            t.balancelist = e
                        }
                        t.$parent.hideLoading()
                    }).
                    catch(function(a) {
                        t.$parent.hideLoading()
                    })
                },
                getbalancelistNoLoding: function() {
                    var t = this;
                    t.$apiFun.post("/api/balancelist", {}).then(function(a) {
                        if (200 !== a.code && t.$parent.showTost(0, a.message), 200 === a.code) {
                            t.balancelist = a.data;
                            var e = a.data;
                            t.balancelist = e
                        }
                    }).
                    catch(function(t) {})
                },
                transall: function() {
                    var t = this;
                    t.$parent.showLoading(),
                    t.$apiFun.post("/api/transall", {}).then(function(a) {
                        t.showTost(1, a.message),
                        t.getbalancelist(),
                        t.refreshusermoney(),
                        t.$parent.hideLoading()
                    }).
                    catch(function(a) {
                        t.$parent.hideLoading()
                    })
                },
                changApiType: function(t) {
                    if (this.hgInfo = t, console.log(t), 1 == this.qutype) {
                        var a = null;
                        this.usdssLis.forEach(function(e) {
                            e.id != t || (a = e.bank_owner)
                        }),
                        this.chanmeyXi = a
                    } else this.chanmeyXi = null;
                    this.bankId = t.id,
                    this.password = null,
                    this.amount = null,
                    this.show = !1
                },
                changevT: function(t) {
                    console.log(t),
                    t != this.activeName && (this.hgInfo = {},
                    this.activeName = t, this.amount = null, this.bankId = null, this.chanmeyXi = null, this.password = null)
                },
                withdraw: function() {
                    var t = this,
                    a = t.bankId,
                    e = t.amount,
                    i = t.password;
                    a ? e < 100 ? t.$parent.showTost(0, "单笔取款不能低于100元") : i ? (t.$parent.showLoading(), t.$apiFun.post("/api/withdraw", {
                        amount: e,
                        bank: a,
                        password: i
                    }).then(function(a) {
                        200 != a.code && t.$parent.showTost(0, a.message),
                        200 == a.code && (t.$parent.showTost(1, "提交成功，等待后台审核"), t.changevT(), setTimeout(function() {
                            t.$router.push({
                                path: "/transRecord"
                            })
                        },
                        1500)),
                        t.$parent.hideLoading()
                    }).
                    catch(function(a) {
                        t.$parent.hideLoading()
                    })) : t.$parent.showTost(0, "请输入您的支付密码") : t.$parent.showTost(0, "请选择您要提现到的银行卡")
                },
                withdraw1: function() {
                    var t = this,
                    a = t.bankId,
                    e = t.amount,
                    i = t.password;
                    a ? e < 100 ? t.$parent.showTost(0, "单笔取款不能低于100元") : i ? (t.$parent.showLoading(), t.$apiFun.post("/api/withdraw", {
                        amount: e,
                        bank: a,
                        password: i
                    }).then(function(a) {
                        200 != a.code && t.$parent.showTost(0, a.message),
                        200 == a.code && (t.$parent.showTost(1, "提交成功，等待后台审核"), t.changevT(), setTimeout(function() {
                            t.$router.push({
                                path: "/transRecord"
                            })
                        },
                        1500)),
                        t.$parent.hideLoading()
                    }).
                    catch(function(a) {
                        t.$parent.hideLoading()
                    })) : t.$parent.showTost(0, "请输入您的支付密码") : t.$parent.showTost(0, "请选择USDT地址")
                },
                getUsercard: function() {
                    var t = this,
                    a = this;
                    this.$parent.showLoading(),
                    a.$apiFun.post("/api/getcard", {
                        type: 1
                    }).then(function(e) {
                        200 == e.code && (a.usercardLis = e.data),
                        t.$parent.hideLoading()
                    })
                },
                getUsdssList: function() {
                    var t = this,
                    a = this;
                    this.$parent.showLoading(),
                    a.$apiFun.post("/api/getcard", {
                        type: 2
                    }).then(function(e) {
                        200 == e.code && (a.usdssLis = e.data),
                        t.$parent.hideLoading()
                    })
                }
            },
            mounted: function() {},
            updated: function() {},
            beforeDestroy: function() {
                this.daoTime && clearInterval(this.daoTime),
                this.daoTime = null
            }
        },
        Ht = {
            render: function() {
                var t = this,
                a = t.$createElement,
                e = t._self._c || a;
                return e("div", {
                    staticClass: "sdg sdgg",
                    staticStyle: {
                        width: "100%",
                        "min-height": "100vh",
                        "background-color": "#f1f1f1",
                        "padding-bottom": "50px"
                    }
                },
                [e("van-nav-bar", {
                    staticStyle: {
                        position: "fixed",
                        top: "0",
                        left: "0",
                        width: "100%",
                        "background-color": "#edf2fd",
                        "z-index": "222"
                    },
                    attrs: {
                        title: "取款",
                        "left-arrow": ""
                    },
                    on: {
                        "click-left": function(a) {
                            return t.$router.back()
                        }
                    }
                }), t._v(" "), e("div", {
                    staticStyle: {
                        height: "46px"
                    }
                }), t._v(" "), e("div", {
                    staticClass: "tabVox"
                },
                [e("div", {
                    class: 1 == t.activeName ? "tab atc": "tab",
                    on: {
                        click: function(a) {
                            return t.changevT(1)
                        }
                    }
                },
                [t._v("USDT取款")]), t._v(" "), e("div", {
                    class: 2 == t.activeName ? "tab atc": "tab",
                    on: {
                        click: function(a) {
                            return t.changevT(2)
                        }
                    }
                },
                [t._v("银行卡取款")])]), t._v(" "), e("div", {
                    staticStyle: {
                        background: "#fff",
                        "box-sizing": "border-box",
                        padding: "0 20px"
                    }
                },
                [e("div", {
                    staticClass: "qibao"
                },
                [e("div", {
                    staticClass: "fes"
                },
                [t._v("钱包金额")]), t._v(" "), e("div", {
                    staticClass: "imgs"
                },
                [e("img", {
                    attrs: {
                        src: "/static/image/iconRefresh.5b108ae65439270527aeee8ac17c2aca.png",
                        alt: ""
                    },
                    on: {
                        click: function(a) {
                            return t.$parent.getUserInfoShowLoding()
                        }
                    }
                })]), t._v(" "), t.$store.state.userInfo.transferstatus === 1 ? e("div", {
                    staticClass: "btns",
                    on: {
                        click: t.transall
                    }
                },
                [t._v("一键回收")]) : t._v(" ")]), t._v(" "), e("div", {
                    staticClass: "mesg"
                },
                [e("div", {
                    staticClass: "bosgf"
                },
                [t._m(0), t._v(" "), e("div", {
                    staticClass: "bots"
                },
                [e("span", [t._v("￥")]), t._v(t._s(t.$store.state.userInfo.balance))])]), t._v(" ")]), t._v(" "), t.balancelist.length ? e("div", {
                    staticClass: "gameBox"
                },
                [t._l(t.balancelist,
                function(a, i) {
                    return i < t.showLis ? e("div", {
                        key: i,
                        staticClass: "lis"
                    },
                    [e("div", {
                        staticClass: "name"
                    },
                    [t._v(t._s(a.name))]), t._v(" "), e("div", {
                        staticClass: "num"
                    },
                    [t._v(t._s(a.balance)),e("img", {
                    staticClass: "shua",
                    staticStyle: {
                        width: "0.35rem",
						"margin-left": "0.2rem"
                    },					
                    attrs: {
                        src: "/static/image/iconRefresh.5b108ae65439270527aeee8ac17c2aca.png",
                        alt: ""
                    },					
                    on: {
                        click: function() {
                            return t.$parent.userapimoney(a.platname)
                        }
                    }
                })])]) : t._e()
                }), t._v(" "), 3 != t.showLis ? e("div", {
                    staticClass: "lis",
                    on: {
                        click: function(a) {
                            return t.changShowLis(3)
                        }
                    }
                },
                [e("div", {
                    staticClass: "name"
                },
                [t._v("收起")]), t._v(" "), t._m(2)]) : t._e(), t._v(" "), 3 == t.showLis ? e("div", {
                    staticClass: "lis",
                    on: {
                        click: function(a) {
                            return t.changShowLis(t.balancelist.length)
                        }
                    }
                },
                [e("div", {
                    staticClass: "name"
                },
                [t._v("展开")]), t._v(" "), t._m(3)]) : t._e()], 2) : t._e()]), t._v(" "), 1 == t.activeName ? e("div", {
                    staticClass: "usrse"
                },
                [0 == t.usdssLis.length ? e("div", {
                    staticClass: "hgs",
                    on: {
                        click: function(a) {
                            return t.$parent.goNav("/addUsdtCard")
                        }
                    }
                },
                [e("div", {
                    staticClass: "nams"
                },
                [t._v("选择USDT地址")]), t._v(" "), e("div", {
                    staticStyle: {
                        color: "#597ef7",
                        height: "30px",
                        "line-height": "30px",
                        "text-align": "center"
                    }
                },
                [t._v("+添加USDT地址")])]) : e("div", {
                    staticClass: "hgs",
                    on: {
                        click: t.changShow
                    }
                },
                [e("div", {
                    staticClass: "nams"
                },
                [t._v("选择USDT地址")]), t._v(" "), t.bankId ? e("div", {
                    staticClass: "cardhgs"
                },
                [e("img", {
                    attrs: {
                        src: "/static/image/1595237922936176.png",
                        alt: ""
                    }
                }), t._v(" "), e("div", [t._v(t._s(t.hgInfo.bank_owner) + " "), e("span", [t._v("****")]), e("span", [t._v("****")]), e("span", [t._v("****")]), t._v(t._s(t.hgInfo.bank_no.substr( - 4)))])]) : e("div", {
                    staticStyle: {
                        color: "#597ef7",
                        height: "30px",
                        "line-height": "30px",
                        "text-align": "center"
                    }
                },
                [t._v("请选择USDT地址")])]), t._v(" "), e("div", {
                    staticStyle: {
                        height: "0.2rem",
                        background: "#f8f8f8",
                        width: "100wh"
                    }
                }), t._v(" "), e("div", {
                    staticClass: "hgs"
                },
                [e("div", {
                    staticClass: "nams"
                },
                [t._v("打码量")]), t._v(" "), e("div", [e("van-cell-group", [e("van-field", {
                    attrs: {
                        type: "text",
                        disabled: "",
                        placeholder: "打码量"
                    },
                    model: {
                        value: t.betAmount,
                        callback: function(a) {
                            t.betAmount = a
                        },
                        expression: "betAmount"
                    }
                })], 1)], 1)]), t._v(" "), e("div", {
                    staticStyle: {
                        height: "0.2rem",
                        background: "#f8f8f8",
                        width: "100wh"
                    }
                }), t._v(" "), e("div", {
                    staticClass: "hgs"
                },
                [e("div", {
                    staticClass: "nams"
                },
                [t._v("取款金额")]), t._v(" "), e("div", [e("van-cell-group", [e("van-field", {
                    attrs: {
                        type: "text",
                        placeholder: "请输入取款金额"
                    },
                    scopedSlots: t._u([{
                        key: "button",
                        fn: function() {
                            return [e("van-button", {
                                attrs: {
                                    size: "mini",
                                    type: "info"
                                },
                                on: {
                                    click: function(a) {
                                        return t.bigMey(t.$store.state.userInfo.balance)
                                    }
                                }
                            },
                            [t._v("最大金额")])]
                        },
                        proxy: !0
                    }], null, !1, 2903943802),
                    model: {
                        value: t.amount,
                        callback: function(a) {
                            t.amount = a
                        },
                        expression: "amount"
                    }
                })], 1)], 1)]), t._v(" "), e("div", {
                    staticStyle: {
                        height: "0.2rem",
                        background: "#f8f8f8",
                        width: "100wh"
                    }
                }), t._v(" "), e("div", {
                    staticClass: "hgs"
                },
                [e("div", {
                    staticClass: "nams"
                },
                [t._v("支付密码")]), t._v(" "), e("div", [e("van-cell-group", [e("van-field", {
                    attrs: {
                        type: "password",
                        autocomplete: "new-password",
                        placeholder: "请输入支付密码"
                    },
                    model: {
                        value: t.password,
                        callback: function(a) {
                            t.password = a
                        },
                        expression: "password"
                    }
                })], 1)], 1)]), t._v(" "), e("div", {
                    staticStyle: {
                        height: "0.2rem",
                        background: "#f8f8f8",
                        width: "100wh"
                    }
                }), t._v(" "), t.chanmeyXi ? e("div", {
                    staticClass: "hgs"
                },
                [e("div", {
                    staticClass: "nams"
                },
                [t._v("每笔手续费")]), t._v(" "), e("div", [t._v(t._s("ERC20" == t.chanmeyXi ? t.$store.state.userInfo.withdrawcashfee: t.$store.state.userInfo.withdrawfeeusdttrc) + " USDT")])]) : t._e(), t._v(" "), t.chanmeyXi ? e("div", {
                    staticStyle: {
                        height: "0.2rem",
                        background: "#f8f8f8",
                        width: "100wh"
                    }
                }) : t._e(), t._v(" "), e("div", {
                    staticClass: "hgs"
                },
                [e("div", {
                    staticClass: "nams"
                },
                [t._v("折合USDT")]), t._v(" "), e("div", {
                    staticStyle: {
                        "padding-top": "5px"
                    }
                },
                [e("span", {
                    staticStyle: {
                        color: "rgb(240, 80, 80)"
                    }
                },
                [t._v("≈ ")]), t._v(t._s(t.amount ? Math.floor(t.amount / t.$store.state.userInfo.withdrawusdtrate * 100) / 100 : "0.00") + " SDT          参考汇率：" + t._s(t.$store.state.userInfo.withdrawusdtrate) + " 实时变化\n      ")]), t._v(" "), e("div", {
                    staticClass: "lasthg",
                    staticStyle: {
                        padding: "5px 0"
                    }
                },
                [t._v("实际到账：" + t._s(t.amount ? Math.floor(t.amount / t.$store.state.userInfo.withdrawusdtrate * 100) / 100 - ("ERC20" == t.chanmeyXi ? 1 * t.$store.state.userInfo.withdrawcashfee: 1 * t.$store.state.userInfo.withdrawfeeusdttrc) : "0.00") + "USDT")])]), t._v(" "), e("div", {
                    staticStyle: {
                        height: "0.2rem",
                        background: "#f8f8f8",
                        width: "100wh"
                    }
                })]) : t._e(), t._v(" "), 2 == t.activeName ? e("div", {
                    staticClass: "usrse"
                },
                [0 == t.usercardLis.length ? e("div", {
                    staticClass: "hgs",
                    on: {
                        click: function(a) {
                            return t.$parent.goNav("/addBankCard")
                        }
                    }
                },
                [e("div", {
                    staticClass: "nams"
                },
                [t._v("选择银行卡")]), t._v(" "), t._m(4)]) : e("div", {
                    staticClass: "hgs",
                    on: {
                        click: t.changShow
                    }
                },
                [e("div", {
                    staticClass: "nams"
                },
                [t._v("选择银行卡")]), t._v(" "), t.bankId ? e("div", {
                    staticClass: "cardhgs"
                },
                [e("img", {
                    attrs: {
                        src: t.hgInfo.ico,
                        alt: ""
                    }
                }), t._v(" "), e("div", [t._v("\n          " + t._s(t.hgInfo.bank) + " "), e("span", [t._v(t._s(t.hgInfo.bank_owner))]), e("span", [t._v("****")]), t._v(t._s(t.hgInfo.bank_no.substr( - 4)) + "\n        ")])]) : e("div", {
                    staticStyle: {
                        color: "#597ef7",
                        height: "30px",
                        "line-height": "30px",
                        "text-align": "center"
                    }
                },
                [t._v("请选择银行卡")])]), t._v(" "), e("div", {
                    staticStyle: {
                        height: "0.2rem",
                        background: "#f8f8f8",
                        width: "100wh"
                    }
                }), t._v(" "), e("div", {
                    staticClass: "hgs"
                },
                [e("div", {
                    staticClass: "nams"
                },
                [t._v("打码量")]), t._v(" "), e("div", [e("van-cell-group", [e("van-field", {
                    attrs: {
                        type: "text",
                        disabled: "",
                        placeholder: "打码量"
                    },
                    model: {
                        value: t.betAmount,
                        callback: function(a) {
                            t.betAmount = a
                        },
                        expression: "betAmount"
                    }
                })], 1)], 1)]), t._v(" "), e("div", {
                    staticStyle: {
                        height: "0.2rem",
                        background: "#f8f8f8",
                        width: "100wh"
                    }
                }), t._v(" "), e("div", {
                    staticClass: "hgs"
                },
                [e("div", {
                    staticClass: "nams"
                },
                [t._v("取款金额")]), t._v(" "), e("div", [e("van-cell-group", [e("van-field", {
                    attrs: {
                        type: "text",
                        placeholder: "请输入取款金额"
                    },
                    scopedSlots: t._u([{
                        key: "button",
                        fn: function() {
                            return [e("van-button", {
                                attrs: {
                                    size: "mini",
                                    type: "info"
                                },
                                on: {
                                    click: function(a) {
                                        return t.bigMey(t.$store.state.userInfo.balance)
                                    }
                                }
                            },
                            [t._v("最大金额")])]
                        },
                        proxy: !0
                    }], null, !1, 2903943802),
                    model: {
                        value: t.amount,
                        callback: function(a) {
                            t.amount = a
                        },
                        expression: "amount"
                    }
                })], 1)], 1)]), t._v(" "), e("div", {
                    staticStyle: {
                        height: "0.2rem",
                        background: "#f8f8f8",
                        width: "100wh"
                    }
                }), t._v(" "), e("div", {
                    staticClass: "hgs"
                },
                [e("div", {
                    staticClass: "nams"
                },
                [t._v("支付密码")]), t._v(" "), e("div", [e("van-cell-group", [e("van-field", {
                    attrs: {
                        autocomplete: "new-password",
                        type: "password",
                        placeholder: "请输入支付密码"
                    },
                    model: {
                        value: t.password,
                        callback: function(a) {
                            t.password = a
                        },
                        expression: "password"
                    }
                })], 1)], 1)]), t._v(" "), e("div", {
                    staticStyle: {
                        height: "0.2rem",
                        background: "#f8f8f8",
                        width: "100wh"
                    }
                })]) : t._e(), t._v(" "), 2 == t.activeName ? e("div", {
                    staticStyle: {
                        margin: "0 auto",
                        width: "86%"
                    }
                },
                [e("van-button", {
                    staticStyle: {
                        "margin-top": "20px",
                        width: "100%"
                    },
                    attrs: {
                        type: "info"
                    },
                    on: {
                        click: t.withdraw
                    }
                },
                [t._v("立即取款")]), t._v(" "), e("div", {
                    staticClass: "textcns",
                    staticStyle: {
                        "text-align": "center",
                        color: "#999",
                        padding: "10px 0"
                    }
                },
                [t._v("取款遇到问题？联系 "), e("span", {
                    staticStyle: {
                        color: "#597ef7",
                        display: "inline-block",
                        margin: "0 6px"
                    },
                    on: {
                        click: t.$parent.openKefu
                    }
                },
                [t._v("人工客服")]), t._v(" 解决")])], 1) : t._e(), t._v(" "), 1 == t.activeName ? e("div", {
                    staticStyle: {
                        margin: "0 auto",
                        width: "86%"
                    }
                },
                [e("van-button", {
                    staticStyle: {
                        "margin-top": "20px",
                        width: "100%"
                    },
                    attrs: {
                        type: "info"
                    },
                    on: {
                        click: t.withdraw1
                    }
                },
                [t._v("立即取款")]), t._v(" "), e("div", {
                    staticClass: "textcns",
                    staticStyle: {
                        "text-align": "center",
                        color: "#999",
                        padding: "10px 0"
                    }
                },
                [t._v("取款遇到问题？联系 "), e("span", {
                    staticStyle: {
                        color: "#597ef7",
                        display: "inline-block",
                        margin: "0 6px"
                    },
                    on: {
                        click: t.$parent.openKefu
                    }
                },
                [t._v("人工客服")]), t._v(" 解决")])], 1) : t._e(), t._v(" "), 2 == t.activeName && t.show ? e("van-popup", {
                    staticClass: "card",
                    style: {
                        height: "70%",
                        background: "#f8f8f8"
                    },
                    attrs: {
                        position: "bottom"
                    },
                    model: {
                        value: t.show,
                        callback: function(a) {
                            t.show = a
                        },
                        expression: "show"
                    }
                },
                [e("div", {
                    staticClass: "poptit"
                },
                [t._v("请选择银行卡")]), t._v(" "), t._l(t.usercardLis,
                function(a, i) {
                    return e("div", {
                        key: i,
                        staticClass: "lis",
                        on: {
                            click: function(e) {
                                return t.changApiType(a)
                            }
                        }
                    },
                    [e("img", {
                        staticClass: "lefs",
                        attrs: {
                            src: a.ico,
                            alt: ""
                        }
                    }), t._v(" "), e("div", {
                        staticClass: "cest"
                    },
                    [e("div", {
                        staticClass: "type"
                    },
                    [t._v(t._s(a.bank))]), t._v(" "), e("div", {
                        staticClass: "type"
                    },
                    [t._v(t._s(a.bank_owner))]), t._v(" "), e("div", {
                        staticClass: "num"
                    },
                    [e("span", [t._v("****")]), e("span", [t._v("****")]), e("span", [t._v("****")]), e("span", [t._v(t._s(a.bank_no.substr( - 4)))])])])])
                })], 2) : t._e(), t._v(" "), 1 == t.activeName && t.show ? e("van-popup", {
                    staticClass: "card",
                    style: {
                        height: "70%",
                        background: "#f8f8f8"
                    },
                    attrs: {
                        position: "bottom"
                    },
                    model: {
                        value: t.show,
                        callback: function(a) {
                            t.show = a
                        },
                        expression: "show"
                    }
                },
                [e("div", {
                    staticClass: "poptit"
                },
                [t._v("请选择USDT地址")]), t._v(" "), t._l(t.usdssLis,
                function(a, i) {
                    return e("div", {
                        key: i,
                        staticClass: "lis",
                        on: {
                            click: function(e) {
                                return t.changApiType(a)
                            }
                        }
                    },
                    [e("img", {
                        staticClass: "lefs",
                        attrs: {
                            src: "/static/image/1595237922936176.png",
                            alt: ""
                        }
                    }), t._v(" "), e("div", {
                        staticClass: "cest"
                    },
                    [e("div", {
                        staticClass: "type"
                    },
                    [t._v(t._s(a.bank) + "-" + t._s(a.bank_owner))]), t._v(" "), e("div", {
                        staticClass: "num"
                    },
                    [e("span", [t._v("****")]), e("span", [t._v("****")]), e("span", [t._v("****")]), e("span", [t._v(t._s(a.bank_no.substr( - 4)))])])])])
                })], 2) : t._e()], 1)
            },
            staticRenderFns: [function() {
                var t = this.$createElement,
                a = this._self._c || t;
                return a("div", {
                    staticClass: "top"
                },
                [a("img", {
                    attrs: {
                        src: "/static/image/qianbao123.png",
                        alt: ""
                    }
                }), this._v("中心钱包")])
            },
            function() {
                var t = this.$createElement,
                a = this._self._c || t;
                return a("div", {
                    staticClass: "top"
                },
                [a("img", {
                    attrs: {
                        src: "/static/image/qianbao123.png",
                        alt: ""
                    }
                }), this._v("游戏钱包")])
            },
            function() {
                var t = this.$createElement,
                a = this._self._c || t;
                return a("div", {
                    staticClass: "num"
                },
                [a("img", {
                    attrs: {
                        src: "/static/image/xiangshang.png",
                        alt: ""
                    }
                })])
            },
            function() {
                var t = this.$createElement,
                a = this._self._c || t;
                return a("div", {
                    staticClass: "num"
                },
                [a("img", {
                    attrs: {
                        src: "/static/image/xiangxia.png",
                        alt: ""
                    }
                })])
            },
            function() {
                var t = this.$createElement,
                a = this._self._c || t;
                return a("div", [a("div", {
                    staticStyle: {
                        color: "#597ef7",
                        height: "30px",
                        "line-height": "30px",
                        "text-align": "center"
                    }
                },
                [this._v("+添加银行卡")])])
            }]
        };
        var Kt = e("VU/8")(Qt, Ht, !1,
        function(t) {
            e("DYwm")
        },
        "data-v-d19ff99a", null).exports,
        Wt = {
            name: "transfer",
            data: function() {
                return {
                    nshow: !0,
                    balancelist: [],
                    openInfo: {},
                    amount: null,
                    payType: 0,
                    openShow: !1,
                    daoTime: null,
                    showLis: 4,
                    show: !1,
                    type: "sourcetype",
                    sourcetype: {
                        platname: "userbalance",
                        name: "平台钱包"
                    },
                    targettype: {}
                }
            },
            created: function() {
                var t = this;
                t.getbalancelist(),
                t.daoTime = setInterval(function() {
                    t.getbalancelistNoLoding()
                },
                1500)
            },
            methods: {
                bigMey: function() {
                    "userbalance" == this.sourcetype.platname ? this.amount = this.$store.state.userInfo.balance: this.amount = 1 * this.sourcetype.balance
                },
                changShow: function(t) {
                    this.type = t,
                    this.show = !0
                },
                changApiType: function(t, a) {
                    this[t] = a,
                    this.show = !1,
                    "sourcetype" == t && (this.amount = null)
                },
                changShowLis: function(t) {
                    this.showLis = t
                },
                transall: function() {
                    var t = this;
                    t.$parent.showLoading(),
                    t.$apiFun.post("/api/transall", {}).then(function(a) {
                        t.showTost(1, a.message),
                        t.getbalancelist(),
                        t.refreshusermoney(),
                        t.$parent.hideLoading()
                    }).
                    catch(function(a) {
                        t.$parent.hideLoading()
                    })
                },
                btnOk: function() {
                    var t = this;
                    if (t.sourcetype.platname != t.targettype.platname) if ("userbalance" == t.sourcetype.platname || "userbalance" == t.targettype.platname) if (null != t.amount && "" != t.amount) {
                        var a = {
                            amount: t.amount,
                            sourcetype: t.sourcetype.platname,
                            targettype: t.targettype.platname
                        };
                        t.showLoading(),
                        t.$apiFun.post("/api/transfer", a).then(function(a) {
                            t.showTost(1, a.message),
                            200 === a.code ? (t.refreshusermoney(), t.getbalancelist()) : t.hideLoading()
                        }).
                        catch(function(a) {
                            t.$parent.hideLoading()
                        })
                    } else t.showTost(0, "请输入操作金额！");
                    else t.showTost(0, "场馆内钱包不支持互转");
                    else t.showTost(0, "同平台不支持互转")
                },
                isOk: function() {
                    var t = this,
                    a = "",
                    e = "";
                    0 == t.payType ? (a = "userbalance", e = t.openInfo.platname) : (a = t.openInfo.platname, e = "userbalance");
                    var i = {
                        amount: t.amount,
                        sourcetype: a,
                        targettype: e
                    };
                    null != t.amount ? (t.closeCv(), t.showLoading(), t.$apiFun.post("/api/transfer", i).then(function(a) {
                        t.showTost(1, a.message),
                        200 === a.code ? (t.refreshusermoney(), t.getbalancelist()) : t.hideLoading()
                    })) : t.showTost(0, "请输入操作金额！")
                },
                closeCv: function() {
                    this.openInfo = {},
                    this.amount = null,
                    this.openShow = !1
                },
                refreshusermoney: function() {
                    var t = this;
                    t.$apiFun.post("/api/refreshusermoney", {}).then(function(a) {
                        t.hideLoading(),
                        200 == a.code && (localStorage.setItem("userInfo", n()(a.data)), t.$store.commit("changUserInfo"))
                    })
                },
                getBalances: function() {
                    var t = this;
                    t.showLoading(),
                    t.getbalancelist(),
                    t.$apiFun.post("/api/balance", {}).then(function(a) {
                        if (200 == a.code) {
                            var e = JSON.parse(localStorage.getItem("userInfo"));
                            e.balance = a.data.balance,
                            localStorage.setItem("userInfo", n()(e)),
                            t.$store.commit("changUserInfo")
                        }
                        t.hideLoading()
                    }).
                    catch(function(a) {
                        t.hideLoading()
                    })
                },
                changeTasfer: function() {
                    var t = this;
                    t.$parent.showLoading();
                    var a = JSON.parse(localStorage.getItem("userInfo")),
                    e = a.transferstatus ? 0 : 1;
                    t.$apiFun.post("/api/uptransferstatus", {
                        transferstatus: e
                    }).then(function(i) {
                        200 != i.code && t.$parent.showTost(0, i.message),
                        200 == i.code && (a.transferstatus = e, localStorage.setItem("userInfo", n()(a)), t.$store.commit("changUserInfo"), t.$parent.showTost(1, "操作成功！")),
                        t.$parent.hideLoading()
                    }).
                    catch(function(a) {
                        t.$parent.hideLoading()
                    })
                },
                changVal: function(t) {
                    1 != this.$store.state.userInfo.transferstatus && (this.openInfo = t, this.openShow = !0, this.amount = null)
                },
                close: function() {
                    that.openInfo = {},
                    that.openShow = !1,
                    that.amount = null
                },
                getbalancelist: function() {
                    var t = this;
                    t.$parent.showLoading(),
                    t.$apiFun.post("/api/balancelist", {}).then(function(a) {
                        if (200 !== a.code && t.$parent.showTost(0, a.message), 200 === a.code) {
                            t.balancelist = a.data;
                            var e = a.data;
                            e.unshift({
                                platname: "userbalance",
                                name: "平台钱包"
                            }),
                            t.balancelist = e,
                            t.targettype = e[1]
                        }
                        t.$parent.hideLoading()
                    }).
                    catch(function(a) {
                        t.$parent.hideLoading()
                    })
                },
                getbalancelistNoLoding: function() {
                    var t = this;
                    t.$apiFun.post("/api/balancelist", {}).then(function(a) {
                        if (200 !== a.code && t.$parent.showTost(0, a.message), 200 === a.code) {
                            t.balancelist = a.data;
                            var e = a.data;
                            e.unshift({
                                platname: "userbalance",
                                name: "平台钱包"
                            }),
                            t.balancelist = e
                        }
                    }).
                    catch(function(t) {})
                },
                showLoading: function() {
                    this.$parent.showLoading()
                },
                hideLoading: function() {
                    this.$parent.hideLoading()
                },
                openKefu: function() {
                    this.$parent.openKefu()
                },
                showTost: function(t, a) {
                    this.$parent.showTost(t, a)
                }
            },
            mounted: function() {},
            updated: function() {},
            beforeDestroy: function() {
                this.daoTime && clearInterval(this.daoTime),
                this.daoTime = null
            }
        },
        Zt = {
            render: function() {
                var t = this,
                a = t.$createElement,
                e = t._self._c || a;
                return e("div", {
                    staticClass: "sdg sdgg stddss",
                    staticStyle: {
                        width: "100%",
                        "min-height": "100vh",
                        "background-color": "#f1f1f1",
                        "padding-bottom": "50px"
                    }
                },
                [e("van-nav-bar", {
                    staticStyle: {
                        position: "fixed",
                        top: "0",
                        left: "0",
                        width: "100%",
                        "background-color": "#edf2fd",
                        "z-index": "222"
                    },
                    attrs: {
                        title: "转账",
                        "left-arrow": ""
                    },
                    on: {
                        "click-left": function(a) {
                            return t.$router.back()
                        }
                    }
                }), t._v(" "), e("div", {
                    staticStyle: {
                        height: "46px"
                    }
                }), t._v(" "), e("div", {
                    staticStyle: {
                        background: "#fff",
                        "box-sizing": "border-box",
                        padding: "0 20px"
                    }
                },
                [e("div", {
                    staticClass: "qibao"
                },
                [e("div", {
                    staticClass: "fes"
                },
                [t._v("钱包金额")]), t._v(" "), e("div", {
                    staticClass: "imgs"
                },
                [e("img", {
                    attrs: {
                        src: "/static/image/iconRefresh.5b108ae65439270527aeee8ac17c2aca.png",
                        alt: ""
                    },
                    on: {
                        click: function(a) {
                            return t.$parent.getUserInfoShowLoding()
                        }
                    }
                })]), t._v(" "), t.$store.state.userInfo.transferstatus === 1 ? e("div", {
                    staticClass: "btns",
                    on: {
                        click: t.transall
                    }
                },
                [t._v("一键回收")]) : t._v(" ") ]), t._v(" "), e("div", {
                    staticClass: "mesg"
                },
                [e("div", {
                    staticClass: "bosgf"
                },
                [t._m(0), t._v(" "), e("div", {
                    staticClass: "bots"
                },
                [e("span", [t._v("￥")]), t._v(t._s(t.$store.state.userInfo.balance))])]), t._v(" ")]), t._v(" "), t.balancelist.length ? e("div", {
                    staticClass: "gameBox"
                },
                [t._l(t.balancelist,
                function(a, i) {
                    return i < t.showLis && 0 != i ? e("div", {
                        key: i,
                        staticClass: "lis"
                    },
                    [e("div", {
                        staticClass: "name"
                    },
                    [t._v(t._s(a.name))]), t._v(" "), e("div", {
                        staticClass: "num"
                    },
                    [t._v(t._s(a.balance)),e("img", {
                    staticClass: "shua",
                    staticStyle: {
                        width: "0.35rem",
						"margin-left": "0.2rem"
                    },					
                    attrs: {
                        src: "/static/image/iconRefresh.5b108ae65439270527aeee8ac17c2aca.png",
                        alt: ""
                    },					
                    on: {
                        click: function() {
                            return t.$parent.userapimoney(a.platname)
                        }
                    }
                })])]) : t._e()
                }), t._v(" "), 4 != t.showLis ? e("div", {
                    staticClass: "lis",
                    on: {
                        click: function(a) {
                            return t.changShowLis(4)
                        }
                    }
                },
                [e("div", {
                    staticClass: "name"
                },
                [t._v("收起")]), t._v(" "), t._m(2)]) : t._e(), t._v(" "), 4 == t.showLis ? e("div", {
                    staticClass: "lis",
                    on: {
                        click: function(a) {
                            return t.changShowLis(t.balancelist.length)
                        }
                    }
                },
                [e("div", {
                    staticClass: "name"
                },
                [t._v("展开")]), t._v(" "), t._m(3)]) : t._e()], 2) : t._e()]), t._v(" "), e("div", {
                    staticClass: "mianzhuan"
                },
                [e("div", {
                    staticClass: "lfs"
                },
                [t._v("自动免转")]), t._v(" "), e("div", {
                    staticClass: "ces"
                },
                [t._v("开启后余额自动转入游戏场馆")]), t._v(" "), e("van-switch", {
                    attrs: {
                        "active-value": 1,
                        "inactive-value": 0,
                        size: "24px"
                    },
                    on: {
                        change: function(a) {
                            return t.changeTasfer()
                        }
                    },
                    model: {
                        value: t.$store.state.userInfo.transferstatus,
                        callback: function(a) {
                            t.$set(t.$store.state.userInfo, "transferstatus", a)
                        },
                        expression: "$store.state.userInfo.transferstatus"
                    }
                })], 1), t._v(" "), 0 == t.$store.state.userInfo.transferstatus ? e("div", {
                    staticClass: "zhuanzang"
                },
                [e("div", {
                    staticClass: "tit"
                },
                [e("div", {
                    staticClass: "lesg",
                    on: {
                        click: function(a) {
                            return t.changShow("sourcetype")
                        }
                    }
                },
                [t._v(t._s(t.sourcetype.name) + " "), e("span", [t._v(">")])]), t._v(" "), e("img", {
                    attrs: {
                        src: "/static/image/iconTransfer.png",
                        alt: ""
                    }
                }), t._v(" "), e("div", {
                    staticClass: "lesg",
                    on: {
                        click: function(a) {
                            return t.changShow("targettype")
                        }
                    }
                },
                [t._v(t._s(t.targettype.name) + " "), e("span", [t._v(">")])])]), t._v(" "), e("div", {
                    staticStyle: {
                        padding: "0.2rem 0",
                        "font-size": "0.24rem",
                        color: "#a5a9b3"
                    }
                },
                [t._v("场馆内钱包不支持互转")]), t._v(" "), e("van-cell-group", [e("van-field", {
                    attrs: {
                        label: "￥",
                        type: "text",
                        placeholder: "请输入转账金额"
                    },
                    scopedSlots: t._u([{
                        key: "button",
                        fn: function() {
                            return [e("van-button", {
                                attrs: {
                                    size: "mini",
                                    type: "info"
                                },
                                on: {
                                    click: t.bigMey
                                }
                            },
                            [t._v("最大金额")])]
                        },
                        proxy: !0
                    }], null, !1, 1019065511),
                    model: {
                        value: t.amount,
                        callback: function(a) {
                            t.amount = a
                        },
                        expression: "amount"
                    }
                })], 1)], 1) : t._e(), t._v(" "), e("div", {
                    staticStyle: {
                        margin: "0 auto",
                        width: "86%"
                    }
                },
                [0 == t.$store.state.userInfo.transferstatus ? e("van-button", {
                    staticStyle: {
                        "margin-top": "20px",
                        width: "100%"
                    },
                    attrs: {
                        type: "info"
                    },
                    on: {
                        click: t.btnOk
                    }
                },
                [t._v("立即转账")]) : t._e(), t._v(" "), e("div", {
                    staticClass: "textcns",
                    staticStyle: {
                        "text-align": "center",
                        color: "#999",
                        padding: "10px 0"
                    }
                },
                [t._v("转账遇到问题？联系 "), e("span", {
                    staticStyle: {
                        color: "#597ef7",
                        display: "inline-block",
                        margin: "0 6px"
                    },
                    on: {
                        click: t.$parent.openKefu
                    }
                },
                [t._v("人工客服")]), t._v(" 解决")])], 1), t._v(" "), "sourcetype" == t.type && t.show ? e("van-popup", {
                    staticClass: "card",
                    style: {
                        height: "70%",
                        background: "#f8f8f8"
                    },
                    attrs: {
                        position: "bottom"
                    },
                    model: {
                        value: t.show,
                        callback: function(a) {
                            t.show = a
                        },
                        expression: "show"
                    }
                },
                [e("div", {
                    staticClass: "poptit"
                },
                [t._v("选择钱包")]), t._v(" "), e("div", {
                    staticStyle: {
                        height: "0.2rem"
                    }
                }), t._v(" "), e("div", {
                    staticStyle: {
                        background: "#fff",
                        width: "100%",
                        margin: "0 auto",
                        padding: "0 20px",
                        "box-sizing": "border-box"
                    }
                },
                t._l(t.balancelist,
                function(a, i) {
                    return e("div", {
                        key: i,
                        staticClass: "lis",
                        on: {
                            click: function(e) {
                                return t.changApiType("sourcetype", a)
                            }
                        }
                    },
                    [e("div", [t._v(t._s(a.name))]), t._v(" "), t.sourcetype.name == a.name ? e("img", {
                        attrs: {
                            src: "/static/image/icon_chose.28d0a1732f077f8062a64082a086ebf2.png",
                            alt: ""
                        }
                    }) : t._e()])
                }), 0)]) : t._e(), t._v(" "), "targettype" == t.type && t.show ? e("van-popup", {
                    staticClass: "card",
                    style: {
                        height: "70%",
                        background: "#f8f8f8"
                    },
                    attrs: {
                        position: "bottom"
                    },
                    model: {
                        value: t.show,
                        callback: function(a) {
                            t.show = a
                        },
                        expression: "show"
                    }
                },
                [e("div", {
                    staticClass: "poptit"
                },
                [t._v("选择钱包")]), t._v(" "), e("div", {
                    staticStyle: {
                        height: "0.2rem"
                    }
                }), t._v(" "), e("div", {
                    staticStyle: {
                        background: "#fff",
                        width: "100%",
                        margin: "0 auto",
                        padding: "0 20px",
                        "box-sizing": "border-box"
                    }
                },
                t._l(t.balancelist,
                function(a, i) {
                    return e("div", {
                        key: i,
                        staticClass: "lis",
                        on: {
                            click: function(e) {
                                return t.changApiType("targettype", a)
                            }
                        }
                    },
                    [e("div", [t._v(t._s(a.name))]), t._v(" "), t.targettype.name == a.name ? e("img", {
                        attrs: {
                            src: "/static/image/icon_chose.28d0a1732f077f8062a64082a086ebf2.png",
                            alt: ""
                        }
                    }) : t._e()])
                }), 0)]) : t._e()], 1)
            },
            staticRenderFns: [function() {
                var t = this.$createElement,
                a = this._self._c || t;
                return a("div", {
                    staticClass: "top"
                },
                [a("img", {
                    attrs: {
                        src: "/static/image/qianbao123.png",
                        alt: ""
                    }
                }), this._v("中心钱包")])
            },
            function() {
                var t = this.$createElement,
                a = this._self._c || t;
                return a("div", {
                    staticClass: "top"
                },
                [a("img", {
                    attrs: {
                        src: "/static/image/qianbao123.png",
                        alt: ""
                    }
                }), this._v("游戏钱包")])
            },
            function() {
                var t = this.$createElement,
                a = this._self._c || t;
                return a("div", {
                    staticClass: "num"
                },
                [a("img", {
                    attrs: {
                        src: "/static/image/xiangshang.png",
                        alt: ""
                    }
                })])
            },
            function() {
                var t = this.$createElement,
                a = this._self._c || t;
                return a("div", {
                    staticClass: "num"
                },
                [a("img", {
                    attrs: {
                        src: "/static/image/xiangxia.png",
                        alt: ""
                    }
                })])
            }]
        };
        var ta = e("VU/8")(Wt, Zt, !1,
        function(t) {
            e("gJVS")
        },
        "data-v-37593f32", null).exports,
        aa = {
            name: "concise",
            data: function() {
                return {
                    gamecode: "obgdy",
                    obgdyList: [],
                    ppList: [],
                    fgdzList: [],
                    aeList: []
                }
            },
            created: function() {
                var t = this.$route.query;
                t.type && (this.gamecode = t.type),
                console.log(t),
                this.gamelistBycode()
            },
            methods: {
                handleClick: function() {
                    this.gamelistBycode()
                },
                gamelistBycode: function() {
                    var t = this,
                    a = t.gamecode + "List";
                    t[a].length > 0 || (t.$parent.showLoading(), t.$apiFun.post("/api/gamelistBycode", {
                        gamecode: t.gamecode
                    }).then(function(e) {
                        console.log(e),
                        200 != e.code && t.$parent.showTost(0, e.message),
                        200 == e.code && (t[a] = e.data),
                        t.$parent.hideLoading()
                    }).
                    catch(function(a) {
                        t.$parent.hideLoading()
                    }))
                }
            },
            mounted: function() {},
            updated: function() {},
            beforeDestroy: function() {},
            watch: {
                $route: {
                    immediate: !0,
                    handler: function() {
                        var t = this.$route.query;
                        t.type && (this.gamecode = t.type, this.gamelistBycode())
                    }
                }
            }
        },
        ea = {
            render: function() {
                var t = this,
                a = t.$createElement,
                e = t._self._c || a;
                return e("div", {
                    staticStyle: {
                        width: "100%",
                        "min-height": "100vh",
                        background: "rgb(237, 241, 255"
                    }
                },
                [e("van-nav-bar", {
                    staticStyle: {
                        position: "fixed",
                        top: "0",
                        left: "0",
                        width: "100%",
                        "background-color": "#edf2fd"
                    },
                    attrs: {
                        title: "",
                        "left-arrow": ""
                    },
                    on: {
                        "click-left": function(a) {
                            return t.$router.back()
                        }
                    }
                }), t._v(" "), e("div", {
                    staticStyle: {
                        height: "46px"
                    }
                }), t._v(" "), e("img", {
                    staticStyle: {
                        width: "100%",
                        "border-radius": "20px"
                    },
                    attrs: {
                        src: "/static/image/73b07f2.jpg",
                        alt: ""
                    }
                }), t._v(" "), e("van-tabs", {
                    staticClass: "gameBox",
                    on: {
                        change: t.handleClick
                    },
                    model: {
                        value: t.gamecode,
                        callback: function(a) {
                            t.gamecode = a
                        },
                        expression: "gamecode"
                    }
                },
                [e("van-tab", {
                    attrs: {
                        title: "OB电子",
                        name: "obgdy"
                    }
                },
                [e("div", {
                    staticClass: "gameList"
                },
                t._l(t.obgdyList,
                function(a, i) {
                    return e("div", {
                        key: i,
                        staticClass: "gameLis",
                        on: {
                            click: function(e) {
                                return t.$parent.openGamePage(a.catecode, a.gamecode, "")
                            }
                        }
                    },
                    [e("img", {
                        attrs: {
                            src: a.gamepic,
                            alt: ""
                        }
                    }), t._v(" "), e("p", [t._v(t._s(a.gamename))])])
                }), 0)]), t._v(" "), e("van-tab", {
                    attrs: {
                        title: "FG电子",
                        name: "fgdz"
                    }
                },
                [e("div", {
                    staticClass: "gameList"
                },
                t._l(t.fgdzList,
                function(a, i) {
                    return e("div", {
                        key: i,
                        staticClass: "gameLis",
                        on: {
                            click: function(e) {
                                return t.$parent.openGamePage(a.catecode, a.gamecode, "")
                            }
                        }
                    },
                    [e("img", {
                        attrs: {
                            src: a.gamepic,
                            alt: ""
                        }
                    }), t._v(" "), e("p", [t._v(t._s(a.gamename))])])
                }), 0)]), t._v(" "), e("van-tab", {
                    attrs: {
                        title: "PP电子",
                        name: "pp"
                    }
                },
                [e("div", {
                    staticClass: "gameList"
                },
                t._l(t.ppList,
                function(a, i) {
                    return e("div", {
                        key: i,
                        staticClass: "gameLis",
                        on: {
                            click: function(e) {
                                return t.$parent.openGamePage(a.catecode, a.gamecode, "")
                            }
                        }
                    },
                    [e("img", {
                        attrs: {
                            src: a.gamepic,
                            alt: ""
                        }
                    }), t._v(" "), e("p", [t._v(t._s(a.gamename))])])
                }), 0)]), t._v(" "), e("van-tab", {
                    attrs: {
                        title: "AE电子",
                        name: "ae"
                    }
                },
                [e("div", {
                    staticClass: "gameList"
                },
                t._l(t.aeList,
                function(a, i) {
                    return e("div", {
                        key: i,
                        staticClass: "gameLis",
                        on: {
                            click: function(e) {
                                return t.$parent.openGamePage(a.catecode, a.gamecode, "")
                            }
                        }
                    },
                    [e("img", {
                        attrs: {
                            src: a.gamepic,
                            alt: ""
                        }
                    }), t._v(" "), e("p", [t._v(t._s(a.gamename))])])
                }), 0)])], 1)], 1)
            },
            staticRenderFns: []
        };
        var ia = e("VU/8")(aa, ea, !1,
        function(t) {
            e("UG8z")
        },
        "data-v-2dfc89fc", null).exports;
        i.a.use(l.a);
        var sa = new l.a({
            mode: "hash",
            routes: [{
                path: "/",
                name: "Main",
                component: g,
                children: [{
                    path: "/",
                    name: "index",
                    component: m,
                    meta: {
                        keepAlive: !0,
                        useCatch: !1
                    }
                },
                {
                    path: "/hongbao",
                    name: "hongbao",
                    component: A
                },
                {
                    path: "/activity",
                    name: "activity",
                    component: U,
                    meta: {
                        keepAlive: !0,
                        useCatch: !1
                    }
                },
                {
                    path: "/zhanzhu",
                    name: "zhanzhu",
                    component: D,
                    meta: {
                        keepAlive: !0,
                        useCatch: !1
                    }
                },
                {
                    path: "/mine",
                    name: "mine",
                    component: F,
                    meta: {
                        keepAlive: !0,
                        useCatch: !1,
                        requireAuth: !0
                    }
                },
                {
                    path: "/app",
                    name: "app",
                    component: w,
                    meta: {
                        keepAlive: !0,
                        useCatch: !1,
                        requireAuth: !0
                    }
                },
                {
                    path: "/kefu",
                    name: "kefu",
                    component: k
                }]
            },
            {
                path: "/login",
                name: "login",
                component: V
            },
            {
                path: "/gamePage",
                name: "gamePage",
                component: S
            },
            {
                path: "/activityInfo",
                name: "activityInfo",
                component: G
            },
            {
                path: "/zhanzhuye",
                name: "zhanzhuye",
                component: J
            },
            {
                path: "/vip",
                name: "vip",
                component: H,
                meta: {
                    keepAlive: !0,
                    useCatch: !1
                }
            },
            {
                path: "/applyagent",
                name: "applyagent",
                component: W
            },
            {
                path: "/boutBallBet",
                name: "boutBallBet",
                component: tt
            },
            {
                path: "/boutBallBetInfo",
                name: "boutBallBetInfo",
                component: et
            },
            {
                path: "/message",
                name: "message",
                component: nt,
                meta: {
                    requireAuth: !0
                }
            },
            {
                path: "/fanshui",
                name: "fanshui",
                component: ct,
                meta: {
                    requireAuth: !0
                }
            },
            {
                path: "/userInfo",
                name: "userInfo",
                component: ut,
                meta: {
                    requireAuth: !0
                }
            },
            {
                path: "/userCent",
                name: "userCent",
                component: gt,
                meta: {
                    requireAuth: !0
                }
            },
            {
                path: "/wallet",
                name: "wallet",
                component: _t,
                meta: {
                    requireAuth: !0
                }
            },
            {
                path: "/addBankCard",
                name: "addBankCard",
                component: Ct,
                meta: {
                    requireAuth: !0
                }
            },
            {
                path: "/addUsdtCard",
                name: "addUsdtCard",
                component: bt,
                meta: {
                    requireAuth: !0
                }
            },
            {
                path: "/usdtmore",
                name: "usdtmore",
                component: xt
            },
            {
                path: "/password",
                name: "password",
                component: It,
                meta: {
                    requireAuth: !0
                }
            },
            {
                path: "/welfare",
                name: "welfare",
                component: Tt,
                meta: {
                    requireAuth: !0
                }
            },
            {
                path: "/betRecord",
                name: "betRecord",
                component: Nt,
                meta: {
                    requireAuth: !0
                }
            },
            {
                path: "/activityRecord",
                name: "activityRecord",
                component: zt,
                meta: {
                    requireAuth: !0
                }
            },
            {
                path: "/transRecord",
                name: "transRecord",
                component: Ft,
                meta: {
                    requireAuth: !0
                }
            },
            {
                path: "/money",
                name: "money",
                component: Vt,
                meta: {
                    requireAuth: !0
                }
            },
            {
                path: "/recharge",
                name: "recharge",
                component: Gt,
                meta: {
                    requireAuth: !0,
                    keepAlive: !0,
                    useCatch: !1
                }
            },
            {
                path: "/payInfo",
                name: "payInfo",
                component: Xt
            },
            {
                path: "/concise",
                name: "concise",
                component: ia,
                meta: {
                    keepAlive: !0,
                    useCatch: !1
                }
            },
            {
                path: "/withdrawal",
                name: "withdrawal",
                component: Kt,
                meta: {
                    requireAuth: !0
                }
            },
            {
                path: "/transfer",
                name: "transfer",
                component: ta,
                meta: {
                    requireAuth: !0
                }
            },
            {
                path: "*",
                redirect: "/"
            }]
        }),
        na = e("//Fk"),
        oa = e.n(na),
        ra = e("mtWM"),
        ca = e.n(ra),
        la = e("Fd2+"),
        da = "http://127.0.13.6";
        sessionStorage.setItem("baseURL", da);
        var va = {
            baseURL: da,
            timeout: 3e4
        },
        pa = ca.a.create(va);
        pa.interceptors.request.use(function(t) {
            var a = sessionStorage.getItem("token") ? sessionStorage.getItem("token") : "";
            return t.headers.Authorization = "Bearer " + a,
            t
        },
        function(t) {
            return oa.a.reject(t)
        }),
        pa.interceptors.response.use(function(t) {
            return 401 === t.data.code && la.a.alert({
                title: "认证失败",
                message: "您的账号登陆过期，请重新登陆"
            }).then(function() {
                localStorage.clear(),
                sessionStorage.clear(),
                sa.replace("/login")
            }),
            t
        },
        function(t) {
            return oa.a.reject(t)
        });
        var ua = {
            get: function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
                a = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                return new oa.a(function(e, i) {
                    pa({
                        url: t,
                        params: a,
                        headers: {
                            "Content-Type": "application/json;charset=UTF-8"
                        },
                        method: "GET"
                    }).then(function(t) {
                        return e(t.data),
                        t
                    }).
                    catch(function(t) {
                        i(t)
                    })
                })
            },
            post: function() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
                a = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                return "/api/register" != t && "/api/login_pc" != t || sessionStorage.setItem("baseURL", da),
                new oa.a(function(e, i) {
                    pa({
                        url: t,
                        data: a,
                        headers: {
                            "Content-Type": "application/json;charset=UTF-8"
                        },
                        method: "POST"
                    }).then(function(t) {
                        return e(t.data),
                        t
                    }).
                    catch(function(t) {
                        i(t)
                    })
                })
            }
        },
        fa = {
            get: function(t, a) {
                return ua.get(t, a)
            },
            post: function(t, a) {
                return ua.post(t, a)
            },
            login: function(t) {
                var a = sessionStorage.getItem("baseURL") || "";
                return a || sessionStorage.setItem("baseURL", a),
                ua.post("/api/login_pc", t)
            },
            register: function(t) {
                var a = sessionStorage.getItem("baseURL") || "";
                return a || sessionStorage.setItem("baseURL", a),
                ua.post("/api/register", t)
            }
        },
        ga = fa,
        ha = e("NYxO");
        i.a.use(ha.a);
        var _a = JSON.parse(localStorage.getItem("userInfo")) || {},
        ma = sessionStorage.getItem("token") || "",
        ba = JSON.parse(localStorage.getItem("appInfo")) || {},
        ya = ma && localStorage.getItem("messageNum") || 0,
        wa = new ha.a.Store({
            state: {
                userInfo: _a,
                token: ma,
                messageNum: ya,
                appInfo: ba,
                bannerList: [],
                realbetList: [],
                jokerList: [],
                gamingList: [],
                sportList: [],
                lotteryList: [],
                conciseList: []
            },
            getters: {},
            mutations: {
                changGameList: function(t) {
                    var a = localStorage.getItem("bannerList") ? JSON.parse(localStorage.getItem("bannerList")) : [];
                    t.bannerList = a;
                    var e = localStorage.getItem("realbetList") ? JSON.parse(localStorage.getItem("realbetList")) : [];
                    t.realbetList = e;
                    var i = localStorage.getItem("jokerList") ? JSON.parse(localStorage.getItem("jokerList")) : [];
                    t.jokerList = i;
                    var s = localStorage.getItem("gamingList") ? JSON.parse(localStorage.getItem("gamingList")) : [];
                    t.gamingList = s;
                    var n = localStorage.getItem("sportList") ? JSON.parse(localStorage.getItem("sportList")) : [];
                    t.sportList = n;
                    var o = localStorage.getItem("lotteryList") ? JSON.parse(localStorage.getItem("lotteryList")) : [];
                    t.lotteryList = o;
                    var r = localStorage.getItem("conciseList") ? JSON.parse(localStorage.getItem("conciseList")) : [];
                    t.conciseList = r
                },
                changUserInfo: function(t) {
                    var a = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : {};
                    t.userInfo = a
                },
                changToken: function(t) {
                    t.token = sessionStorage.getItem("token") || ""
                },
                changMessageNum: function(t) {
                    var a = localStorage.getItem("show");
                    t.messageNum = a ? 0 : localStorage.getItem("messageNum")
                },
                changappInfo: function(t) {
                    var a = JSON.parse(localStorage.getItem("appInfo"));
                    t.appInfo = a
                }
            },
            actions: {},
            modules: {}
        });
        e("QKTF"),
        e("4ml/");
        i.a.use(la.b),
        i.a.prototype.$apiFun = ga,
        i.a.config.productionTip = !1,
        sa.afterEach(function(t, a, e) {
            window.scrollTo(0, 0),
            document.querySelector(".index-page") && document.querySelector(".index-page").scrollTo(0, 0)
        }),
        sa.beforeEach(function(t, a, e) {
            sessionStorage.getItem("token") && sessionStorage.getItem("token");
            t.matched.some(function(t) {
                return t.meta.requireAuth
            }) ? sessionStorage.getItem("token") ? e() : e({
                path: "/login",
                query: {
                    redirect: t.fullPath
                }
            }) : e()
        }),
        new i.a({
            el: "#app",
            store: wa,
            router: sa,
            components: {
                App: c
            },
            template: "<App/>"
        })
    },
    O3QM: function(t, a) {},
    QhRG: function(t, a) {},
    Rkdi: function(t, a) {},
    RvBS: function(t, a) {},
    T2s3: function(t, a) {},
    UG8z: function(t, a) {},
    YhKM: function(t, a) {},
    Yme6: function(t, a) {},
    Z0Bs: function(t, a) {},
    Zm6Q: function(t, a) {},
    ZznZ: function(t, a) {},
    bNtg: function(t, a) {},
    cE2z: function(t, a) {},
    f3ov: function(t, a) {},
    gJVS: function(t, a) {},
    kShl: function(t, a) {},
    lk9I: function(t, a) {},
    mx8y: function(t, a) {},
    o3h8: function(t, a) {},
    qIXG: function(t, a) {},
    tbm1: function(t, a) {},
    v0lD: function(t, a) {},
    vnBx: function(t, a) {},
    xv8h: function(t, a) {},
    "znr/": function(t, a) {}
},
["NHnr"]);
//# sourceMappingURL=app.11f9cb432be59f6bdaea.js.map
