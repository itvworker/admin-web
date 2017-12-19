!
    function(e) {
        function t(n) {
            if (r[n]) return r[n].exports;
            var i = r[n] = {
                exports: {},
                id: n,
                loaded: !1
            };
            return e[n].call(i.exports, i, i.exports, t), i.loaded = !0, i.exports
        }
        var n = window.webpackJsonp;
        window.webpackJsonp = function(r, o) {
            for (var a, s, u = 0, c = []; u < r.length; u++) s = r[u], i[s] && c.push.apply(c, i[s]), i[s] = 0;
            for (a in o) e[a] = o[a];
            for (n && n(r, o); c.length;) c.shift().call(null, t)
        };
        var r = {},
            i = {
                0: 0
            };
        return t.e = function(e, n) {
            if (0 === i[e]) return n.call(null, t);
            if (void 0 !== i[e]) i[e].push(n);
            else {
                i[e] = [n];
                var r = document.getElementsByTagName("head")[0],
                    o = document.createElement("script");
                o.type = "text/javascript", o.charset = "utf-8", o.async = !0, o.src = t.p + "" + ({}[e] || e) + ".chunk.js", r.appendChild(o)
            }
        }, t.m = e, t.c = r, t.p = "./dist/", t(0)
    }([function(e, t, n) {
        function r(e, t) {

            var n = this;
            if (!e) throw new Error("没有收到图片，可能的解决方案：https://github.com/think2011/localResizeIMG4/issues/7");
            t = t || {}, n.defaults = {
                width: null,
                height: null,
                quality: t.q?t.q:0
            }, n.file = e;
            for (var r in t) t.hasOwnProperty(r) && (n.defaults[r] = t[r]);
            return this.init()
        }
        function i() {
            var e = document.scripts[document.scripts.length - 1].src;
            return e.substr(0, e.lastIndexOf("/"))
        }
        n.p = i() + "/", window.URL = window.URL || window.webkitURL;
        var o = n(1),
            a = n(4),
            s = function(e) {
                var t = /OS (\d)_.* like Mac OS X/g.exec(e);
                return null === t ? !1 : +t.pop() < 8
            }(navigator.userAgent),
            u = function(e) {
                var t = /Android (\d.*?);/g.exec(e);
                return null === t ? !1 : +t.pop().substr(0, 3) < 4.5
            }(navigator.userAgent);
        r.prototype.init = function() {
            var e = this,
                t = e.file,
                n = new Image,
                r = document.createElement("canvas"),
                i = "string" == typeof t ? t : URL.createObjectURL(t);
            if (e.img = n, e.blob = i, e.canvas = r, !document.createElement("canvas").getContext) throw new Error("浏览器不支持canvas");
            return new o(function(t, r) {
                n.onerror = function() {
                    throw new Error("加载图片文件失败")
                }, n.onload = function() {
                    e._getBase64().then(function(e) {
                        return e.length < 10 && r("生成base64失败"), e
                    }).then(function(n) {
                        t({
                            origin: e.file,
                            base64: n,
                            base64Len: n.length
                        });
                        for (var r in e) e.hasOwnProperty(r) && (e[r] = null);
                        URL.revokeObjectURL(e.blob)
                    })
                }, n.crossOrigin = "*", n.src = i
            })
        }, r.prototype._getBase64 = function() {
            var e = this,
                t = e.img,
                n = e.canvas;
            return new o(function(r) {
                a.getData(t, function() {

                    e.orientation = a.getTag(this, "Orientation"), e.resize = e._getResize(), e.ctx = n.getContext("2d"), n.width = e.resize.width, n.height = e.resize.height, e.ctx.fillStyle = "transparent", e.ctx.fillRect(0, 0, n.width, n.height), s ? e._createBase64ForOldIOS().then(r) : e._createBase64().then(r)
                })
            })
        }, r.prototype._createBase64ForOldIOS = function() {
            var e = this,
                t = e.img,
                r = e.canvas,
                i = e.orientation;
            return new o(function(o) {
                n.e(1, function(n) {
                    var a = [n(5)];
                    (function(n) {
                        var a = new n(t);
                        "5678".indexOf(i) > -1 ? a.render(r, {
                            width: r.height,
                            height: r.width,
                            orientation: i
                        }) : a.render(r, {
                            width: r.width,
                            height: r.height,
                            orientation: i
                        }), o(r.toDataURL(s.type, e.defaults.quality))
                    }).apply(null, a)
                })
            })
        }, r.prototype._createBase64 = function() {
            var e = this,
                t = e.resize,
                r = e.img,
                i = e.canvas,
                a = e.ctx,
                s = e.defaults,
                c = e.orientation;
            switch (c) {
                case 3:
                    a.rotate(180 * Math.PI / 180), a.drawImage(r, -t.width, -t.height, t.width, t.height);
                    break;
                case 6:
                    a.rotate(90 * Math.PI / 180), a.drawImage(r, 0, -t.width, t.height, t.width);
                    break;
                case 8:
                    a.rotate(270 * Math.PI / 180), a.drawImage(r, -t.height, 0, t.height, t.width);
                    break;
                case 2:
                    a.translate(t.width, 0), a.scale(-1, 1), a.drawImage(r, 0, 0, t.width, t.height);
                    break;
                case 4:
                    a.translate(t.width, 0), a.scale(-1, 1), a.rotate(180 * Math.PI / 180), a.drawImage(r, -t.width, -t.height, t.width, t.height);
                    break;
                case 5:
                    a.translate(t.width, 0), a.scale(-1, 1), a.rotate(90 * Math.PI / 180), a.drawImage(r, 0, -t.width, t.height, t.width);
                    break;
                case 7:
                    a.translate(t.width, 0), a.scale(-1, 1), a.rotate(270 * Math.PI / 180), a.drawImage(r, -t.height, 0, t.height, t.width);
                    break;
                default:
                    a.drawImage(r, 0, 0, t.width, t.height)
            }
            return new o(function(e) {

                u ? n.e(2, function(t) {
                    var n = [t(6)];
                    (function(t) {
                        var n = new t,
                            r = a.getImageData(0, 0, i.width, i.height);
                        e(n.encode(r, 100 * s.quality))
                    }).apply(null, n)
                }) : e(i.toDataURL(s.type, s.quality));

            })
        }, r.prototype._getResize = function() {
            var e = this,
                t = e.img,
                n = e.defaults,
                r = n.width,
                i = n.height,
                o = e.orientation,
                a = {
                    width: t.width,
                    height: t.height
                };
            "5678".indexOf(o) > -1 && (a.width = t.height, a.height = t.width);
            var s = a.width / a.height;
            return r && i ? s >= r / i ? a.width > r && (a.width = r, a.height = Math.ceil(r / s)) : a.height > i && (a.height = i, a.width = Math.ceil(i * s)) : r ? r < a.width && (a.width = r, a.height = Math.ceil(r / s)) : i && i < a.height && (a.width = Math.ceil(i * s), a.height = i), (a.width >= 3264 || a.height >= 2448) && (a.width *= .8, a.height *= .8), a
        }, window.lrz = function(e, t) {
            return new r(e, t)
        }, window.lrz.version = "4.1.4", e.exports = window.lrz
    }, function(e, t, n) {
        (function(t) {
            !
                function(n) {
                    function r(e, t) {
                        return function() {
                            e.apply(t, arguments)
                        }
                    }
                    function i(e) {
                        if ("object" != typeof this) throw new TypeError("Promises must be constructed via new");
                        if ("function" != typeof e) throw new TypeError("not a function");
                        this._state = null, this._value = null, this._deferreds = [], l(e, r(a, this), r(s, this))
                    }
                    function o(e) {
                        var t = this;
                        return null === this._state ? void this._deferreds.push(e) : void h(function() {
                            var n = t._state ? e.onFulfilled : e.onRejected;
                            if (null === n) return void(t._state ? e.resolve : e.reject)(t._value);
                            var r;
                            try {
                                r = n(t._value)
                            } catch (i) {
                                return void e.reject(i)
                            }
                            e.resolve(r)
                        })
                    }
                    function a(e) {
                        try {
                            if (e === this) throw new TypeError("A promise cannot be resolved with itself.");
                            if (e && ("object" == typeof e || "function" == typeof e)) {
                                var t = e.then;
                                if ("function" == typeof t) return void l(r(t, e), r(a, this), r(s, this))
                            }
                            this._state = !0, this._value = e, u.call(this)
                        } catch (n) {
                            s.call(this, n)
                        }
                    }
                    function s(e) {
                        this._state = !1, this._value = e, u.call(this)
                    }
                    function u() {
                        for (var e = 0, t = this._deferreds.length; t > e; e++) o.call(this, this._deferreds[e]);
                        this._deferreds = null
                    }
                    function c(e, t, n, r) {
                        this.onFulfilled = "function" == typeof e ? e : null, this.onRejected = "function" == typeof t ? t : null, this.resolve = n, this.reject = r
                    }
                    function l(e, t, n) {
                        var r = !1;
                        try {
                            e(function(e) {
                                r || (r = !0, t(e))
                            }, function(e) {
                                r || (r = !0, n(e))
                            })
                        } catch (i) {
                            if (r) return;
                            r = !0, n(i)
                        }
                    }
                    var h = "function" == typeof t && t ||
                        function(e) {
                            setTimeout(e, 1)
                        }, f = Array.isArray ||
                        function(e) {
                            return "[object Array]" === Object.prototype.toString.call(e)
                        };
                    i.prototype["catch"] = function(e) {
                        return this.then(null, e)
                    }, i.prototype.then = function(e, t) {
                        var n = this;
                        return new i(function(r, i) {
                            o.call(n, new c(e, t, r, i))
                        })
                    }, i.all = function() {
                        var e = Array.prototype.slice.call(1 === arguments.length && f(arguments[0]) ? arguments[0] : arguments);
                        return new i(function(t, n) {
                            function r(o, a) {
                                try {
                                    if (a && ("object" == typeof a || "function" == typeof a)) {
                                        var s = a.then;
                                        if ("function" == typeof s) return void s.call(a, function(e) {
                                            r(o, e)
                                        }, n)
                                    }
                                    e[o] = a, 0 === --i && t(e)
                                } catch (u) {
                                    n(u)
                                }
                            }
                            if (0 === e.length) return t([]);
                            for (var i = e.length, o = 0; o < e.length; o++) r(o, e[o])
                        })
                    }, i.resolve = function(e) {
                        return e && "object" == typeof e && e.constructor === i ? e : new i(function(t) {
                            t(e)
                        })
                    }, i.reject = function(e) {
                        return new i(function(t, n) {
                            n(e)
                        })
                    }, i.race = function(e) {
                        return new i(function(t, n) {
                            for (var r = 0, i = e.length; i > r; r++) e[r].then(t, n)
                        })
                    }, i._setImmediateFn = function(e) {
                        h = e
                    }, i.prototype.always = function(e) {
                        var t = this.constructor;
                        return this.then(function(n) {
                            return t.resolve(e()).then(function() {
                                return n
                            })
                        }, function(n) {
                            return t.resolve(e()).then(function() {
                                throw n
                            })
                        })
                    }, "undefined" != typeof e && e.exports ? e.exports = i : n.Promise || (n.Promise = i)
                }(this)
        }).call(t, n(2).setImmediate)
    }, function(e, t, n) {
        (function(e, r) {
            function i(e, t) {
                this._id = e, this._clearFn = t
            }
            var o = n(3).nextTick,
                a = Function.prototype.apply,
                s = Array.prototype.slice,
                u = {},
                c = 0;
            t.setTimeout = function() {
                return new i(a.call(setTimeout, window, arguments), clearTimeout)
            }, t.setInterval = function() {
                return new i(a.call(setInterval, window, arguments), clearInterval)
            }, t.clearTimeout = t.clearInterval = function(e) {
                e.close()
            }, i.prototype.unref = i.prototype.ref = function() {}, i.prototype.close = function() {
                this._clearFn.call(window, this._id)
            }, t.enroll = function(e, t) {
                clearTimeout(e._idleTimeoutId), e._idleTimeout = t
            }, t.unenroll = function(e) {
                clearTimeout(e._idleTimeoutId), e._idleTimeout = -1
            }, t._unrefActive = t.active = function(e) {
                clearTimeout(e._idleTimeoutId);
                var t = e._idleTimeout;
                t >= 0 && (e._idleTimeoutId = setTimeout(function() {
                    e._onTimeout && e._onTimeout()
                }, t))
            }, t.setImmediate = "function" == typeof e ? e : function(e) {
                var n = c++,
                    r = arguments.length < 2 ? !1 : s.call(arguments, 1);
                return u[n] = !0, o(function() {
                    u[n] && (r ? e.apply(null, r) : e.call(null), t.clearImmediate(n))
                }), n
            }, t.clearImmediate = "function" == typeof r ? r : function(e) {
                delete u[e]
            }
        }).call(t, n(2).setImmediate, n(2).clearImmediate)
    }, function(e, t) {
        function n() {
            c = !1, a.length ? u = a.concat(u) : l = -1, u.length && r()
        }
        function r() {
            if (!c) {
                var e = setTimeout(n);
                c = !0;
                for (var t = u.length; t;) {
                    for (a = u, u = []; ++l < t;) a[l].run();
                    l = -1, t = u.length
                }
                a = null, c = !1, clearTimeout(e)
            }
        }
        function i(e, t) {
            this.fun = e, this.array = t
        }
        function o() {}
        var a, s = e.exports = {},
            u = [],
            c = !1,
            l = -1;
        s.nextTick = function(e) {
            var t = new Array(arguments.length - 1);
            if (arguments.length > 1) for (var n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
            u.push(new i(e, t)), 1 !== u.length || c || setTimeout(r, 0)
        }, i.prototype.run = function() {
            this.fun.apply(null, this.array)
        }, s.title = "browser", s.browser = !0, s.env = {}, s.argv = [], s.version = "", s.versions = {}, s.on = o, s.addListener = o, s.once = o, s.off = o, s.removeListener = o, s.removeAllListeners = o, s.emit = o, s.binding = function(e) {
            throw new Error("process.binding is not supported")
        }, s.cwd = function() {
            return "/"
        }, s.chdir = function(e) {
            throw new Error("process.chdir is not supported")
        }, s.umask = function() {
            return 0
        }
    }, function(e, t, r) {
        var i, o;
        (function() {
            function r(e) {
                return !!e.exifdata
            }
            function a(e, t) {
                t = t || e.match(/^data\:([^\;]+)\;base64,/im)[1] || "", e = e.replace(/^data\:([^\;]+)\;base64,/gim, "");
                for (var n = atob(e), r = n.length, i = new ArrayBuffer(r), o = new Uint8Array(i), a = 0; r > a; a++) o[a] = n.charCodeAt(a);
                return i
            }
            function s(e, t) {
                var n = new XMLHttpRequest;
                n.open("GET", e, !0), n.responseType = "blob", n.onload = function(e) {
                    (200 == this.status || 0 === this.status) && t(this.response)
                }, n.send()
            }
            function u(e, t) {
                function n(n) {
                    var r = c(n),
                        i = l(n);
                    e.exifdata = r || {}, e.iptcdata = i || {}, t && t.call(e)
                }
                if (e.src) if (/^data\:/i.test(e.src)) {
                    var r = a(e.src);
                    n(r)
                } else if (/^blob\:/i.test(e.src)) {
                    var i = new FileReader;
                    i.onload = function(e) {
                        n(e.target.result)
                    }, s(e.src, function(e) {
                        i.readAsArrayBuffer(e)
                    })
                } else {
                    var o = new XMLHttpRequest;
                    o.onload = function() {
                        if (200 != this.status && 0 !== this.status) throw "Could not load image";
                        n(o.response), o = null
                    }, o.open("GET", e.src, !0), o.responseType = "arraybuffer", o.send(null)
                } else if (window.FileReader && (e instanceof window.Blob || e instanceof window.File)) {
                    var i = new FileReader;
                    i.onload = function(e) {
                        m && console.log("Got file of length " + e.target.result.byteLength), n(e.target.result)
                    }, i.readAsArrayBuffer(e)
                }
            }
            function c(e) {
                var t = new DataView(e);
                if (m && console.log("Got file of length " + e.byteLength), 255 != t.getUint8(0) || 216 != t.getUint8(1)) return m && console.log("Not a valid JPEG"), !1;
                for (var n, r = 2, i = e.byteLength; i > r;) {
                    if (255 != t.getUint8(r)) return m && console.log("Not a valid marker at offset " + r + ", found: " + t.getUint8(r)), !1;
                    if (n = t.getUint8(r + 1), m && console.log(n), 225 == n) return m && console.log("Found 0xFFE1 marker"), p(t, r + 4, t.getUint16(r + 2) - 2);
                    r += 2 + t.getUint16(r + 2)
                }
            }
            function l(e) {
                var t = new DataView(e);
                if (m && console.log("Got file of length " + e.byteLength), 255 != t.getUint8(0) || 216 != t.getUint8(1)) return m && console.log("Not a valid JPEG"), !1;
                for (var n = 2, r = e.byteLength, i = function(e, t) {
                    return 56 === e.getUint8(t) && 66 === e.getUint8(t + 1) && 73 === e.getUint8(t + 2) && 77 === e.getUint8(t + 3) && 4 === e.getUint8(t + 4) && 4 === e.getUint8(t + 5)
                }; r > n;) {
                    if (i(t, n)) {
                        var o = t.getUint8(n + 7);
                        o % 2 !== 0 && (o += 1), 0 === o && (o = 4);
                        var a = n + 8 + o,
                            s = t.getUint16(n + 6 + o);
                        return h(e, a, s)
                    }
                    n++
                }
            }
            function h(e, t, n) {
                for (var r, i, o, a, s, u = new DataView(e), c = {}, l = t; t + n > l;) 28 === u.getUint8(l) && 2 === u.getUint8(l + 1) && (a = u.getUint8(l + 2), a in F && (o = u.getInt16(l + 3), s = o + 5, i = F[a], r = g(u, l + 5, o), c.hasOwnProperty(i) ? c[i] instanceof Array ? c[i].push(r) : c[i] = [c[i], r] : c[i] = r)), l++;
                return c
            }
            function f(e, t, n, r, i) {
                var o, a, s, u = e.getUint16(n, !i),
                    c = {};
                for (s = 0; u > s; s++) o = n + 12 * s + 2, a = r[e.getUint16(o, !i)], !a && m && console.log("Unknown tag: " + e.getUint16(o, !i)), c[a] = d(e, o, t, n, i);
                return c
            }
            function d(e, t, n, r, i) {
                var o, a, s, u, c, l, h = e.getUint16(t + 2, !i),
                    f = e.getUint32(t + 4, !i),
                    d = e.getUint32(t + 8, !i) + n;
                switch (h) {
                    case 1:
                    case 7:
                        if (1 == f) return e.getUint8(t + 8, !i);
                        for (o = f > 4 ? d : t + 8, a = [], u = 0; f > u; u++) a[u] = e.getUint8(o + u);
                        return a;
                    case 2:
                        return o = f > 4 ? d : t + 8, g(e, o, f - 1);
                    case 3:
                        if (1 == f) return e.getUint16(t + 8, !i);
                        for (o = f > 2 ? d : t + 8, a = [], u = 0; f > u; u++) a[u] = e.getUint16(o + 2 * u, !i);
                        return a;
                    case 4:
                        if (1 == f) return e.getUint32(t + 8, !i);
                        for (a = [], u = 0; f > u; u++) a[u] = e.getUint32(d + 4 * u, !i);
                        return a;
                    case 5:
                        if (1 == f) return c = e.getUint32(d, !i), l = e.getUint32(d + 4, !i), s = new Number(c / l), s.numerator = c, s.denominator = l, s;
                        for (a = [], u = 0; f > u; u++) c = e.getUint32(d + 8 * u, !i), l = e.getUint32(d + 4 + 8 * u, !i), a[u] = new Number(c / l), a[u].numerator = c, a[u].denominator = l;
                        return a;
                    case 9:
                        if (1 == f) return e.getInt32(t + 8, !i);
                        for (a = [], u = 0; f > u; u++) a[u] = e.getInt32(d + 4 * u, !i);
                        return a;
                    case 10:
                        if (1 == f) return e.getInt32(d, !i) / e.getInt32(d + 4, !i);
                        for (a = [], u = 0; f > u; u++) a[u] = e.getInt32(d + 8 * u, !i) / e.getInt32(d + 4 + 8 * u, !i);
                        return a
                }
            }
            function g(e, t, r) {
                var i = "";
                for (let n = t; n < t + r; n++) i += String.fromCharCode(e.getUint8(n));
                return i
            }
            function p(e, t) {
                if ("Exif" != g(e, t, 4)) return m && console.log("Not valid EXIF data! " + g(e, t, 4)), !1;
                var n, r, i, o, a, s = t + 6;
                if (18761 == e.getUint16(s)) n = !1;
                else {
                    if (19789 != e.getUint16(s)) return m && console.log("Not valid TIFF data! (no 0x4949 or 0x4D4D)"), !1;
                    n = !0
                }
                if (42 != e.getUint16(s + 2, !n)) return m && console.log("Not valid TIFF data! (no 0x002A)"), !1;
                var u = e.getUint32(s + 4, !n);
                if (8 > u) return m && console.log("Not valid TIFF data! (First offset less than 8)", e.getUint32(s + 4, !n)), !1;
                if (r = f(e, s, s + u, y, n), r.ExifIFDPointer) {
                    o = f(e, s, s + r.ExifIFDPointer, v, n);
                    for (i in o) {
                        switch (i) {
                            case "LightSource":
                            case "Flash":
                            case "MeteringMode":
                            case "ExposureProgram":
                            case "SensingMethod":
                            case "SceneCaptureType":
                            case "SceneType":
                            case "CustomRendered":
                            case "WhiteBalance":
                            case "GainControl":
                            case "Contrast":
                            case "Saturation":
                            case "Sharpness":
                            case "SubjectDistanceRange":
                            case "FileSource":
                                o[i] = P[i][o[i]];
                                break;
                            case "ExifVersion":
                            case "FlashpixVersion":
                                o[i] = String.fromCharCode(o[i][0], o[i][1], o[i][2], o[i][3]);
                                break;
                            case "ComponentsConfiguration":
                                o[i] = P.Components[o[i][0]] + P.Components[o[i][1]] + P.Components[o[i][2]] + P.Components[o[i][3]]
                        }
                        r[i] = o[i]
                    }
                }
                if (r.GPSInfoIFDPointer) {
                    a = f(e, s, s + r.GPSInfoIFDPointer, S, n);
                    for (i in a) {
                        switch (i) {
                            case "GPSVersionID":
                                a[i] = a[i][0] + "." + a[i][1] + "." + a[i][2] + "." + a[i][3]
                        }
                        r[i] = a[i]
                    }
                }
                return r
            }
            var m = !1,
                w = function(e) {
                    return e instanceof w ? e : this instanceof w ? void(this.EXIFwrapped = e) : new w(e)
                };
            "undefined" != typeof e && e.exports && (t = e.exports = w), t.EXIF = w;
            var v = w.Tags = {
                    36864: "ExifVersion",
                    40960: "FlashpixVersion",
                    40961: "ColorSpace",
                    40962: "PixelXDimension",
                    40963: "PixelYDimension",
                    37121: "ComponentsConfiguration",
                    37122: "CompressedBitsPerPixel",
                    37500: "MakerNote",
                    37510: "UserComment",
                    40964: "RelatedSoundFile",
                    36867: "DateTimeOriginal",
                    36868: "DateTimeDigitized",
                    37520: "SubsecTime",
                    37521: "SubsecTimeOriginal",
                    37522: "SubsecTimeDigitized",
                    33434: "ExposureTime",
                    33437: "FNumber",
                    34850: "ExposureProgram",
                    34852: "SpectralSensitivity",
                    34855: "ISOSpeedRatings",
                    34856: "OECF",
                    37377: "ShutterSpeedValue",
                    37378: "ApertureValue",
                    37379: "BrightnessValue",
                    37380: "ExposureBias",
                    37381: "MaxApertureValue",
                    37382: "SubjectDistance",
                    37383: "MeteringMode",
                    37384: "LightSource",
                    37385: "Flash",
                    37396: "SubjectArea",
                    37386: "FocalLength",
                    41483: "FlashEnergy",
                    41484: "SpatialFrequencyResponse",
                    41486: "FocalPlaneXResolution",
                    41487: "FocalPlaneYResolution",
                    41488: "FocalPlaneResolutionUnit",
                    41492: "SubjectLocation",
                    41493: "ExposureIndex",
                    41495: "SensingMethod",
                    41728: "FileSource",
                    41729: "SceneType",
                    41730: "CFAPattern",
                    41985: "CustomRendered",
                    41986: "ExposureMode",
                    41987: "WhiteBalance",
                    41988: "DigitalZoomRation",
                    41989: "FocalLengthIn35mmFilm",
                    41990: "SceneCaptureType",
                    41991: "GainControl",
                    41992: "Contrast",
                    41993: "Saturation",
                    41994: "Sharpness",
                    41995: "DeviceSettingDescription",
                    41996: "SubjectDistanceRange",
                    40965: "InteroperabilityIFDPointer",
                    42016: "ImageUniqueID"
                },
                y = w.TiffTags = {
                    256: "ImageWidth",
                    257: "ImageHeight",
                    34665: "ExifIFDPointer",
                    34853: "GPSInfoIFDPointer",
                    40965: "InteroperabilityIFDPointer",
                    258: "BitsPerSample",
                    259: "Compression",
                    262: "PhotometricInterpretation",
                    274: "Orientation",
                    277: "SamplesPerPixel",
                    284: "PlanarConfiguration",
                    530: "YCbCrSubSampling",
                    531: "YCbCrPositioning",
                    282: "XResolution",
                    283: "YResolution",
                    296: "ResolutionUnit",
                    273: "StripOffsets",
                    278: "RowsPerStrip",
                    279: "StripByteCounts",
                    513: "JPEGInterchangeFormat",
                    514: "JPEGInterchangeFormatLength",
                    301: "TransferFunction",
                    318: "WhitePoint",
                    319: "PrimaryChromaticities",
                    529: "YCbCrCoefficients",
                    532: "ReferenceBlackWhite",
                    306: "DateTime",
                    270: "ImageDescription",
                    271: "Make",
                    272: "Model",
                    305: "Software",
                    315: "Artist",
                    33432: "Copyright"
                },
                S = w.GPSTags = {
                    0: "GPSVersionID",
                    1: "GPSLatitudeRef",
                    2: "GPSLatitude",
                    3: "GPSLongitudeRef",
                    4: "GPSLongitude",
                    5: "GPSAltitudeRef",
                    6: "GPSAltitude",
                    7: "GPSTimeStamp",
                    8: "GPSSatellites",
                    9: "GPSStatus",
                    10: "GPSMeasureMode",
                    11: "GPSDOP",
                    12: "GPSSpeedRef",
                    13: "GPSSpeed",
                    14: "GPSTrackRef",
                    15: "GPSTrack",
                    16: "GPSImgDirectionRef",
                    17: "GPSImgDirection",
                    18: "GPSMapDatum",
                    19: "GPSDestLatitudeRef",
                    20: "GPSDestLatitude",
                    21: "GPSDestLongitudeRef",
                    22: "GPSDestLongitude",
                    23: "GPSDestBearingRef",
                    24: "GPSDestBearing",
                    25: "GPSDestDistanceRef",
                    26: "GPSDestDistance",
                    27: "GPSProcessingMethod",
                    28: "GPSAreaInformation",
                    29: "GPSDateStamp",
                    30: "GPSDifferential"
                },
                P = w.StringValues = {
                    ExposureProgram: {
                        0: "Not defined",
                        1: "Manual",
                        2: "Normal program",
                        3: "Aperture priority",
                        4: "Shutter priority",
                        5: "Creative program",
                        6: "Action program",
                        7: "Portrait mode",
                        8: "Landscape mode"
                    },
                    MeteringMode: {
                        0: "Unknown",
                        1: "Average",
                        2: "CenterWeightedAverage",
                        3: "Spot",
                        4: "MultiSpot",
                        5: "Pattern",
                        6: "Partial",
                        255: "Other"
                    },
                    LightSource: {
                        0: "Unknown",
                        1: "Daylight",
                        2: "Fluorescent",
                        3: "Tungsten (incandescent light)",
                        4: "Flash",
                        9: "Fine weather",
                        10: "Cloudy weather",
                        11: "Shade",
                        12: "Daylight fluorescent (D 5700 - 7100K)",
                        13: "Day white fluorescent (N 4600 - 5400K)",
                        14: "Cool white fluorescent (W 3900 - 4500K)",
                        15: "White fluorescent (WW 3200 - 3700K)",
                        17: "Standard light A",
                        18: "Standard light B",
                        19: "Standard light C",
                        20: "D55",
                        21: "D65",
                        22: "D75",
                        23: "D50",
                        24: "ISO studio tungsten",
                        255: "Other"
                    },
                    Flash: {
                        0: "Flash did not fire",
                        1: "Flash fired",
                        5: "Strobe return light not detected",
                        7: "Strobe return light detected",
                        9: "Flash fired, compulsory flash mode",
                        13: "Flash fired, compulsory flash mode, return light not detected",
                        15: "Flash fired, compulsory flash mode, return light detected",
                        16: "Flash did not fire, compulsory flash mode",
                        24: "Flash did not fire, auto mode",
                        25: "Flash fired, auto mode",
                        29: "Flash fired, auto mode, return light not detected",
                        31: "Flash fired, auto mode, return light detected",
                        32: "No flash function",
                        65: "Flash fired, red-eye reduction mode",
                        69: "Flash fired, red-eye reduction mode, return light not detected",
                        71: "Flash fired, red-eye reduction mode, return light detected",
                        73: "Flash fired, compulsory flash mode, red-eye reduction mode",
                        77: "Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected",
                        79: "Flash fired, compulsory flash mode, red-eye reduction mode, return light detected",
                        89: "Flash fired, auto mode, red-eye reduction mode",
                        93: "Flash fired, auto mode, return light not detected, red-eye reduction mode",
                        95: "Flash fired, auto mode, return light detected, red-eye reduction mode"
                    },
                    SensingMethod: {
                        1: "Not defined",
                        2: "One-chip color area sensor",
                        3: "Two-chip color area sensor",
                        4: "Three-chip color area sensor",
                        5: "Color sequential area sensor",
                        7: "Trilinear sensor",
                        8: "Color sequential linear sensor"
                    },
                    SceneCaptureType: {
                        0: "Standard",
                        1: "Landscape",
                        2: "Portrait",
                        3: "Night scene"
                    },
                    SceneType: {
                        1: "Directly photographed"
                    },
                    CustomRendered: {
                        0: "Normal process",
                        1: "Custom process"
                    },
                    WhiteBalance: {
                        0: "Auto white balance",
                        1: "Manual white balance"
                    },
                    GainControl: {
                        0: "None",
                        1: "Low gain up",
                        2: "High gain up",
                        3: "Low gain down",
                        4: "High gain down"
                    },
                    Contrast: {
                        0: "Normal",
                        1: "Soft",
                        2: "Hard"
                    },
                    Saturation: {
                        0: "Normal",
                        1: "Low saturation",
                        2: "High saturation"
                    },
                    Sharpness: {
                        0: "Normal",
                        1: "Soft",
                        2: "Hard"
                    },
                    SubjectDistanceRange: {
                        0: "Unknown",
                        1: "Macro",
                        2: "Close view",
                        3: "Distant view"
                    },
                    FileSource: {
                        3: "DSC"
                    },
                    Components: {
                        0: "",
                        1: "Y",
                        2: "Cb",
                        3: "Cr",
                        4: "R",
                        5: "G",
                        6: "B"
                    }
                },
                F = {
                    120: "caption",
                    110: "credit",
                    25: "keywords",
                    55: "dateCreated",
                    80: "byline",
                    85: "bylineTitle",
                    122: "captionWriter",
                    105: "headline",
                    116: "copyright",
                    15: "category"
                };
            w.getData = function(e, t) {
                return (e instanceof Image || e instanceof HTMLImageElement) && !e.complete ? !1 : (r(e) ? t && t.call(e) : u(e, t), !0)
            }, w.getTag = function(e, t) {
                return r(e) ? e.exifdata[t] : void 0
            }, w.getAllTags = function(e) {
                if (!r(e)) return {};
                var t, n = e.exifdata,
                    i = {};
                for (t in n) n.hasOwnProperty(t) && (i[t] = n[t]);
                return i
            }, w.pretty = function(e) {
                if (!r(e)) return "";
                var t, n = e.exifdata,
                    i = "";
                for (t in n) n.hasOwnProperty(t) && (i += "object" == typeof n[t] ? n[t] instanceof Number ? t + " : " + n[t] + " [" + n[t].numerator + "/" + n[t].denominator + "]\r\n" : t + " : [" + n[t].length + " values]\r\n" : t + " : " + n[t] + "\r\n");
                return i
            }, w.readFromBinaryFile = function(e) {
                return c(e)
            }, i = [], o = function() {
                return w
            }.apply(t, i), !(void 0 !== o && (e.exports = o))
        }).call(this)
    }]);
