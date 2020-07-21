var QueryString = function () {
    for (var e = {}, t = window.location.search.substring(1).split("&"), n = 0; n < t.length; n++) {
        var o = t[n].split("=");
        if (void 0 === e[o[0]])e[o[0]] = o[1]; else if ("string" == typeof e[o[0]]) {
            var i = [e[o[0]], o[1]];
            e[o[0]] = i
        } else e[o[0]].push(o[1])
    }
    return e
}, useragent = (navigator.userAgent || navigator.vendor || window.opera).toLowerCase(), isiPhone = /iPhone|iPad|iPod/i.test(useragent) || "MacIntel" === navigator.platform && navigator.maxTouchPoints > 1, isAndroid = /android/i.test(useragent), isWindowsPhone = /windows phone/i.test(useragent), isOpera = !!window.opera || navigator.userAgent.indexOf(" OPR/") >= 0, isFirefox = "undefined" != typeof InstallTrigger, isSafariA = (!(queryString = QueryString()).isSafari || "false" != queryString.isSafari) && (Object.prototype.toString.call(window.HTMLElement).indexOf("Constructor") > 0 || "[object SafariRemoteNotification]" === (!window.safari || safari.pushNotification).toString()), isChrome = !!window.chrome && !isOpera, isIEA = (!queryString.isIE || "false" != queryString.isIE) && !!document.documentMode, isEdge = (!queryString.isEdge || "false" != queryString.isEdge) && navigator.userAgent.indexOf("Edge") > -1;
function getChromeVersion() {
    var e = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);
    return !!e && parseInt(e[2], 10)
}
function loadScript(e, t) {
    var n = document.createElement("script");
    n.type = "text/javascript", n.readyState ? n.onreadystatechange = function () {
        "loaded" != n.readyState && "complete" != n.readyState || (n.onreadystatechange = null, t && t())
    } : n.onload = function () {
        t && t()
    }, n.onerror = function (n) {
        setTimeout(function () {
            loadScript(e, t)
        }, 5e3)
    }, n.src = e + "?v=" + currVersion, document.getElementsByTagName("head")[0].appendChild(n)
}
function stopFullScreenPopup() {
    document.getElementById("exitFullscreenButton") && (document.getElementById("exitFullscreenButton").style.display = "none"), document.getElementById("fullscreenButton") && (document.getElementById("fullscreenButton").style.display = "block"), window.resizeTo(widgetSize.width + (window.outerWidth - window.innerWidth), widgetSize.height + (window.outerHeight - window.innerHeight)), window.moveTo((screen.width - widgetSize.width) / 2, (screen.height - widgetSize.height) / 2)
}
function toggleFullScreen() {
    document.msFullscreenElement || document.fullscreen || document.mozFullScreen || document.webkitIsFullScreen ? stopFullScreen() : showFullScreen()
}
function showFullScreen() {
    var e = document.getElementById("video_container");
    e.requestFullscreen ? e.requestFullscreen() : e.msRequestFullscreen ? e.msRequestFullscreen() : e.mozRequestFullScreen ? e.mozRequestFullScreen() : e.webkitRequestFullscreen && e.webkitRequestFullscreen(), document.getElementById("exitFullscreenButton").style.display = "block"
}
function stopFullScreen() {
    document.fullscreen && document.exitFullscreen ? document.exitFullscreen() : document.fullscreen && document.msExitFullscreen ? document.msExitFullscreen() : document.fullscreen && document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.fullscreen && document.webkitCancelFullScreen && document.webkitCancelFullScreen(), document.getElementById("exitFullscreenButton") && (document.getElementById("exitFullscreenButton").style.display = "none")
}
function changeToUrl(e) {
    for (var t = e, n = new RegExp(/[-a-zA-Z0-9@:%_\+.~#?&\/\/=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)?/gi), o = t.split(" "), i = 0; i < o.length; i++)o[i].match(n) && (o[i] = '<a target="_blank" href="' + o[i] + '">' + o[i] + "</a>");
    return o.join(" ")
}
document.addEventListener("fullscreenchange", function () {
    document.fullscreen || stopFullScreen()
}, !1), document.addEventListener("mozfullscreenchange", function () {
    document.mozFullScreen || stopFullScreen()
}, !1), document.addEventListener("MSFullscreenChange", function () {
    document.msFullscreenElement || stopFullScreen()
}, !1), document.addEventListener("webkitfullscreenchange", function () {
    document.webkitIsFullScreen || stopFullScreen()
}, !1);
var prevId, prevMsgP, prevBody, errorTimer, incomingAudio, incomingMessage, enterRoom, estimateDif = function (e) {
    var t = parseInt(e / 1e3, 10), n = Math.floor(t / 3600), o = Math.floor((t - 3600 * n) / 60), i = t - 3600 * n - 60 * o;
    return n || o || i ? (n = n ? n + (1 == n ? " hour " : " hours ") : "") + (o = o ? o + (1 == o ? " minute " : " minutes ") : "") + (i = i ? i + (1 == i ? " second " : " seconds ") : "") : null
}, generateLink = function (e) {
    sessionId = Math.random().toString(36).slice(2).substring(0, 15);
    var t = {};
    if (lsRepUrl && (t.lsRepUrl = lsRepUrl), $("#roomName").val() && (sessionId = $("#roomName").val()), $("#names").val() && (t.names = $("#names").val()), agentId && (t.agentId = agentId), $("#visitorName").val() && (t.visitorName = $("#visitorName").val()), $("#config").val() && (t.config = $("#config").val()), $("#shortvisitor").val() ? (shortVisitorUrl = $("#shortvisitor").val(), shortVisitorUrl_broadcast = $("#shortvisitor").val() + "_b") : (shortVisitorUrl = Math.random().toString(36).slice(2).substring(0, 6), shortVisitorUrl_broadcast = Math.random().toString(36).slice(2).substring(0, 6)), $("#shortagent").val() ? (shortAgentUrl = $("#shortagent").val(), shortAgentUrl_broadcast = $("#shortagent").val() + "_b") : (shortAgentUrl = Math.random().toString(36).slice(2).substring(0, 6), shortAgentUrl_broadcast = Math.random().toString(36).slice(2).substring(0, 6)), $("#datetime").val()) {
        var n = new Date($("#datetime").val()).toISOString();
        t.datetime = n
    }
    $("#duration").val() && (t.duration = $("#duration").val()), $("#disableVideo").is(":checked") && (t.disableVideo = 1), $("#disableAudio").is(":checked") && (t.disableAudio = 1), $("#disableScreenShare").is(":checked") && (t.disableScreenShare = 1), $("#disableWhiteboard").is(":checked") && (t.disableWhiteboard = 1), $("#disableTransfer").is(":checked") && (t.disableTransfer = 1), $("#autoAcceptVideo").is(":checked") && (t.autoAcceptVideo = 1), $("#autoAcceptAudio").is(":checked") && (t.autoAcceptAudio = 1);
    var o = "";
    e && (o = "&broadcast=1");
    var i = window.btoa(unescape(encodeURIComponent(JSON.stringify(t))));
    visitorUrl = lsRepUrl + "pages/" + roomLinkPage + "?room=" + sessionId + "&p=" + i + o, viewerBroadcastLink = lsRepUrl + "pages/" + roomLinkPage + "?room=" + sessionId + "&p=" + i + o + "&broadcast=1";
    var r = document.createElement("input");
    r.setAttribute("value", visitorUrl), document.body.appendChild(r), r.select(), document.execCommand("copy"), document.body.removeChild(r), $("#roomPass").val() && (t.pass = $("#roomPass").val()), delete t.visitorName, t.isAdmin = 1, i = window.btoa(unescape(encodeURIComponent(JSON.stringify(t)))), agentUrl = lsRepUrl + "pages/" + roomLinkPage + "?room=" + sessionId + "&p=" + i + "&isAdmin=1" + o, agentBroadcastUrl = lsRepUrl + "pages/" + roomLinkPage + "?room=" + sessionId + "&p=" + i + "&isAdmin=1" + o + "&broadcast=1"
}, getCurrentTime = function () {
    return convertTimestamp((new Date).getTime(), !0)
}, guestName = function (e) {
    if (!e)return "Visitor-00";
    e.charCodeAt(0), e.charCodeAt(e.length - 1);
    for (var t = 0, n = 0; n < e.length; n++)t += e.charCodeAt(n);
    return "Visitor-" + parseInt(t % 100 + 1)
}, getCurrentDateFormatted = function () {
    var e = new Date;
    return e.getDate() + "_" + (e.getMonth() + 1) + "_" + e.getFullYear() + "_" + e.getHours() + e.getMinutes() + e.getSeconds()
}, getPrettyDate = function (e) {
    var t = new Date, n = String(t.getDate()).padStart(2, "0"), o = String(t.getMonth() + 1).padStart(2, "0"), i = t.getFullYear(), r = new Date(1e3 * e), a = r.getFullYear(), s = ("0" + (r.getMonth() + 1)).slice(-2), d = ("0" + r.getDate()).slice(-2), c = ("0" + r.getHours()).slice(-2), l = ("0" + r.getMinutes()).slice(-2);
    return n == d && o == s && i == a ? c + ":" + l : d + "." + s + "." + a + " " + c + ":" + l
}, convertTimestamp = function (e, t) {
    var n = new Date, o = new Date(e), i = (n.getFullYear() !== o.getFullYear() && o.getFullYear(), ("0" + (o.getMonth() + 1)).slice(-2), ("0" + o.getDate()).slice(-2), o.getHours()), r = o.getMinutes(), a = i >= 12 ? "pm" : "am", s = i % 12;
    return s = s || 12, r = r < 10 ? "0" + r : r, time = s + ":" + r + " " + a, time
}, compareDates = function (e, t) {
    var n = new Date(e);
    n.setHours(0, 0, 0, 0);
    var o = new Date(t);
    return o.setHours(0, 0, 0, 0), n.getTime() === o.getTime()
}, escapeHtmlEntities = function (e) {
    return "undefined" != typeof jQuery ? jQuery("<div/>").text(e).html() : e.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;")
}, showMessage = function (e, t, n, o, i, r) {
    if (t) {
        var a = getPrettyDate((new Date).getTime() / 1e3);
        if (n = "" !== n && null !== n && "undefined" !== n && void 0 !== n ? n : "" === e ? "" : a, "conference" == conferenceStyle) {
            if ("Me" === e) {
                e = smartVideoLocale.msgStore.me, className = "media media-chat media-chat-reverse"
            } else"" === e ? className = "media media-meta-day" : ($("#peer_name_chat").text(e), playIncomingMessage(), "undefined" === e && (e = "Guest"), className = "p-10 media-chat", i || (i = lsRepUrl + "img/small-avatar.jpg"), f = i, "avatar " + e);
            if (o = o || "", prevId && e == prevId)u = prevMsgP, d = prevBody; else {
                if ((u = $("<div />", {class: className})).attr("data-system-attribue", o), e && "Me" !== e) {
                    var s = $("<h6 />", {});
                    s.appendTo(u), s.html(e)
                }
                var d = $("<div />", {class: "media-body"});
                d.appendTo(u)
            }
            var c;
            (c = $("<p />")).html(t), c.appendTo(d), (c = $("<p />", {class: "meta"})).html('<time datetime="2018">' + n + "</time>"), c.appendTo(d), u.appendTo($("#chat-content")), $("#typing").html(""), prevId = e, prevMsgP = u, prevBody = d, (l = document.getElementById("chat-content")).scrollTop = 999999
        } else {
            var l, u = document.createElement("li"), m = "left", g = "", f = "";
            if ("Me" === e || "Me~" == e.substring(0, 3)) {
                m = "right";
                var v = "";
                if ("Me~" == e.substring(0, 3))if (e = e.substring(3, 300), v = " right-image", "img/small-avatar.jpg" !== i && i)f = '<img class="direct-chat-img ' + m + '" src="' + i + '" alt="" />'; else f = (f = e.match(/\b(\w)/g).join("").toUpperCase()) ? '<span class="acronym-right">' + f + "</span>" : '<img class="direct-chat-img ' + m + '" src="img/small-avatar.jpg" alt="" />';
                e = smartVideoLocale.msgStore.me, className = "wd-right-bubble" + v
            } else if ("" === e) {
                var p = "";
                "divider" === o && (p = " divider"), className = "wd-system-bubble" + p
            } else if (playIncomingMessage(), "undefined" === e && (e = "Guest"), g = "wd-chat-name", "wd-chat-avatar", className = "wd-left-bubble", i || (i = "/img/small-avatar.jpg"), f = '<img class="direct-chat-img ' + m + " " + guestName(e) + '" src="' + i + '" alt="" />', "He~" == e.substring(0, 3))if (e = e.substring(3, 500), "/img/small-avatar.jpg" !== i && i)f = '<img class="direct-chat-img ' + m + " " + guestName(e) + '" src="' + i + '" alt="" />'; else {
                f = e.match(/\b(\w)/g).join("").toUpperCase();
                var h = svg1 + f + svg2;
                image = "data:image/svg+xml;base64," + btoa(h), f = f ? '<img class="direct-chat-img ' + m + " " + guestName(e) + '" src="' + image + '" alt="" />' : '<img class="direct-chat-img ' + m + " " + guestName(e) + '" src="/img/small-avatar.jpg" alt="" />'
            }
            o = o || "", u.setAttribute("data-system-attribue", o), u.innerHTML = '<div class="' + className + '">' + f + '<span class="' + g + '">' + e + '</span><span class="timestamp">' + n + "</span><div>" + t + "</div>", (l = document.getElementById("newdev_chat_ul1")).appendChild(u), l.scrollTop = 999999
        }
    }
}, saveChat = function (e, t, n, o, i, r) {
    var a = queryString.names ? queryString.names : svConfigs.agentName, s = (new Date).toISOString();
    $.ajax({
        type: "POST",
        url: lsRepUrl + "/server/script.php",
        data: {
            type: "addchat",
            roomId: roomId || queryString.room,
            message: e,
            agent: a,
            agentId: o,
            from: t,
            participants: Object.keys(r).toString(),
            system: n,
            avatar: i,
            datetime: s
        }
    }).done(function (e) {
    }).fail(function () {
        console.log(!1)
    })
}, ERROR_TIMER = 1e4, toggleError = function (e, t) {
    jQuery("#error_message").show(), jQuery("#error_message_text").html(e), clearTimeout(errorTimer), errorTimer = setTimeout(function () {
        jQuery("#error_message").hide(), jQuery("#error_message_text").html("")
    }, t || ERROR_TIMER)
}, toggleNotification = function (e, t) {
    jQuery("#error_message").toggle(t), jQuery("#error_message_text").html(e)
}, getCookie = function (e) {
    var t = RegExp(e + "=.[^;]*"), n = document.cookie.match(t);
    return n ? n[0].split("=")[1] : null
}, deleteCookie = function (e) {
    document.cookie = e + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;;path=/"
}, setCookie = function (e, t, n) {
    var o = e, i = t, r = new Date, a = r.getTime() + 36e5 * parseInt(n);
    r.setTime(a), document.cookie = n ? o + "=" + i + ";expires=" + r.toGMTString() + ";path=/" : o + "=" + i + ";path=/"
}, getGuid = function () {
    function e() {
        return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1)
    }

    return e() + e() + "-" + e() + "-" + e() + "-" + e() + "-" + e() + e() + e()
};
function playIncomingCall() {
    if (!document.hasFocus()) {
        (incomingAudio = new Audio).preload = "auto", incomingAudio.autoplay = !0, incomingAudio.loop = !0, incomingAudio.src = lsRepUrl + "/media/ringtone.mp3";
        var e = incomingAudio.play();
        isIEA || void 0 !== e && e.then(function () {
            setTimeout(function () {
                incomingAudio && incomingAudio.pause()
            }, 1e4)
        }).catch(function (e) {
            console.log(e)
        })
    }
}
function playIncomingMessage() {
    if (!document.hasFocus()) {
        (incomingMessage = new Audio).preload = "auto", incomingMessage.autoplay = !0, incomingMessage.loop = !1, incomingMessage.src = lsRepUrl + "/media/msgtone.mp3";
        var e = incomingMessage.play();
        isIEA || void 0 !== e && e.then(function () {
            setTimeout(function () {
                incomingMessage && incomingMessage.pause()
            }, 1e3)
        }).catch(function (e) {
            console.log(e)
        })
    }
}
function playEnterRoom() {
    if (!document.hasFocus()) {
        (enterRoom = new Audio).preload = "auto", enterRoom.autoplay = !0, enterRoom.loop = !1, enterRoom.src = lsRepUrl + "/media/msgtone.mp3", enterRoom.play();
        var e = enterRoom.play();
        void 0 !== e && e.then(function () {
            setTimeout(function () {
                enterRoom && enterRoom.pause()
            }, 1e3)
        }).catch(function (e) {
            console.log(e)
        })
    }
}
function stopIncomingCall() {
    if (isIEA)return incomingAudio && (incomingAudio.pause(), incomingAudio.src = ""), !0;
    if (incomingAudio) {
        var e = incomingAudio.pause();
        void 0 !== e && e.then(function () {
        }).catch(function (e) {
            console.log(e)
        })
    }
}
function bytesToSize(e) {
    if (0 === e)return "0 Bytes";
    var t = parseInt(Math.floor(Math.log(e) / Math.log(1e3)), 10);
    return (e / Math.pow(1e3, t)).toPrecision(3) + " " + ["Bytes", "KB", "MB", "GB", "TB"][t]
}
function hark(e, t) {
    var n = window.webkitAudioContext || window.AudioContext, o = this;
    if (o.events = {}, o.on = function (e, t) {
            o.events[e] = t
        }, o.emit = function () {
            o.events[arguments[0]] && o.events[arguments[0]](arguments[1], arguments[2], arguments[3], arguments[4])
        }, !n)return o;
    var i = (t = t || {}).smoothing || .1, r = t.interval || 50, a = t.threshold, s = t.play, d = t.history || 10, c = !0;
    window.audioContext00 || (window.audioContext00 = new n);
    var l, u, m, g = audioContext00.createGain();
    g.connect(audioContext00.destination), g.gain.value = 0, (m = audioContext00.createAnalyser()).fftSize = 512, m.smoothingTimeConstant = i, u = new Float32Array(m.fftSize), l = audioContext00.createMediaStreamSource(e), a = a || -50, l.connect(m), s && m.connect(audioContext00.destination), o.speaking = !1, o.setThreshold = function (e) {
        a = e
    }, o.setInterval = function (e) {
        r = e
    }, o.stop = function () {
        c = !1, o.emit("volume_change", -100, a), o.speaking && (o.speaking = !1, o.emit("stopped_speaking"))
    }, o.speakingHistory = [];
    for (var f = 0; f < d; f++)o.speakingHistory.push(0);
    var v = function () {
        setTimeout(function () {
            if (c) {
                var e = function (e, t) {
                    var n = -1 / 0;
                    e.getFloatFrequencyData(t);
                    for (var o = 4, i = t.length; o < i; o++)t[o] > n && t[o] < 0 && (n = t[o]);
                    return n
                }(m, u);
                o.emit("volume_change", e, a);
                var t = 0;
                if (e > a && !o.speaking) {
                    for (var n = o.speakingHistory.length - 3; n < o.speakingHistory.length; n++)t += o.speakingHistory[n];
                    t >= 2 && (o.speaking = !0, o.emit("speaking"))
                } else if (e < a && o.speaking) {
                    for (var i = 0; i < o.speakingHistory.length; i++)t += o.speakingHistory[i];
                    0 === t && (o.speaking = !1, o.emit("stopped_speaking"))
                }
                o.speakingHistory.shift(), o.speakingHistory.push(0 + (e > a)), v()
            }
        }, r)
    };
    return v(), o
}
"use strict";
var getStats = function (e, t, n) {
    function o() {
        i(function (e) {
            if (e && e.forEach) {
                e.forEach(function (e) {
                    Object.keys(l).forEach(function (t) {
                        if ("function" == typeof l[t])try {
                            l[t](e)
                        } catch (e) {
                            console.error(e.message, e.stack, e)
                        }
                    })
                });
                try {
                    -1 !== m.iceConnectionState.search(/failed|closed|disconnected/gi) && (g = !0)
                } catch (e) {
                    g = !0
                }
                !0 === g && (c.datachannel && (c.datachannel.state = "close"), c.ended = !0), c.results = e, c.audio && c.video && (c.bandwidth.speed = c.audio.bytesSent - c.bandwidth.helper.audioBytesSent + (c.video.bytesSent - c.bandwidth.helper.videoBytesSent), c.bandwidth.helper.audioBytesSent = c.audio.bytesSent, c.bandwidth.helper.videoBytesSent = c.video.bytesSent), t(c), g || null != typeof n && n && setTimeout(o, n || 1e3)
            }
        })
    }

    function i(e) {
        void 0 !== window.InstallTrigger || u ? m.getStats(window.mediaStreamTrack || null).then(function (t) {
            var n = [];
            t.forEach(function (e) {
                n.push(e)
            }), e(n)
        }).catch(e) : m.getStats(function (t) {
            var n = [];
            t.result().forEach(function (e) {
                var t = {};
                e.names().forEach(function (n) {
                    t[n] = e.stat(n)
                }), t.id = e.id, t.type = e.type, t.timestamp = e.timestamp, n.push(t)
            }), e(n)
        })
    }

    var r, a = "Fake/5.0 (FakeOS) AppleWebKit/123 (KHTML, like Gecko) Fake/12.3.4567.89 Fake/123.45";
    (r = "undefined" != typeof global ? global : null) && "undefined" == typeof window && "undefined" != typeof global && (global.navigator = {
        userAgent: a,
        getUserMedia: function () {
        }
    }, global.console || (global.console = {}), void 0 !== global.console.log && void 0 !== global.console.error || (global.console.error = global.console.log = global.console.log || function () {
            console.log(arguments)
        }), "undefined" == typeof document && (r.document = {
        documentElement: {
            appendChild: function () {
                return ""
            }
        }
    }, document.createElement = document.captureStream = document.mozCaptureStream = function () {
        var e = {
            getContext: function () {
                return e
            }, play: function () {
            }, pause: function () {
            }, drawImage: function () {
            }, toDataURL: function () {
                return ""
            }
        };
        return e
    }, r.HTMLVideoElement = function () {
    }), "undefined" == typeof location && (r.location = {
        protocol: "file:",
        href: "",
        hash: ""
    }), "undefined" == typeof screen && (r.screen = {
        width: 0,
        height: 0
    }), "undefined" == typeof URL && (r.URL = {
        createObjectURL: function () {
            return ""
        }, revokeObjectURL: function () {
            return ""
        }
    }), "undefined" == typeof MediaStreamTrack && (r.MediaStreamTrack = function () {
    }), void 0 === s && (r.RTCPeerConnection = function () {
    }), r.window = global);
    var s = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
    "undefined" == typeof MediaStreamTrack && (MediaStreamTrack = {});
    var d = ((navigator.connection || {}).type || "unknown").toString().toLowerCase(), c = {
        encryption: "sha-256",
        audio: {
            send: {tracks: [], codecs: [], availableBandwidth: 0, streams: 0, framerateMean: 0, bitrateMean: 0},
            recv: {tracks: [], codecs: [], availableBandwidth: 0, streams: 0, framerateMean: 0, bitrateMean: 0},
            bytesSent: 0,
            bytesReceived: 0,
            latency: 0,
            packetsLost: 0
        },
        video: {
            send: {tracks: [], codecs: [], availableBandwidth: 0, streams: 0, framerateMean: 0, bitrateMean: 0},
            recv: {tracks: [], codecs: [], availableBandwidth: 0, streams: 0, framerateMean: 0, bitrateMean: 0},
            bytesSent: 0,
            bytesReceived: 0,
            latency: 0,
            packetsLost: 0
        },
        bandwidth: {
            systemBandwidth: 0,
            sentPerSecond: 0,
            encodedPerSecond: 0,
            helper: {audioBytesSent: 0, videoBytestSent: 0},
            speed: 0
        },
        results: {},
        connectionType: {
            systemNetworkType: d,
            systemIpAddress: "192.168.1.2",
            local: {candidateType: [], transport: [], ipAddress: [], networkType: []},
            remote: {candidateType: [], transport: [], ipAddress: [], networkType: []}
        },
        resolutions: {send: {width: 0, height: 0}, recv: {width: 0, height: 0}},
        internal: {audio: {send: {}, recv: {}}, video: {send: {}, recv: {}}, candidates: {}},
        nomore: function () {
            g = !0
        }
    }, l = {
        checkIfOfferer: function (e) {
            "googLibjingleSession" === e.type && (c.isOfferer = e.googInitiator)
        }
    }, u = /^((?!chrome|android).)*safari/i.test(navigator.userAgent), m = this;
    if (!(arguments[0] instanceof s))throw"1st argument is not instance of RTCPeerConnection.";
    m = arguments[0], arguments[1] instanceof MediaStreamTrack && (e = arguments[1], t = arguments[2], n = arguments[3]);
    var g = !1;
    l.datachannel = function (e) {
        "datachannel" === e.type && (c.datachannel = {state: e.state})
    }, l.googCertificate = function (e) {
        "googCertificate" == e.type && (c.encryption = e.googFingerprintAlgorithm), "certificate" == e.type && (c.encryption = e.fingerprintAlgorithm)
    }, l.checkAudioTracks = function (e) {
        if ("audio" === e.mediaType) {
            var t = e.id.split("_").pop();
            if (!0 === e.isRemote && (t = "recv"), !1 === e.isRemote && (t = "send"), t) {
                if (-1 === c.audio[t].codecs.indexOf(e.googCodecName || "opus") && c.audio[t].codecs.push(e.googCodecName || "opus"), e.bytesSent) {
                    var n = 0;
                    c.internal.audio[t].prevBytesSent || (c.internal.audio[t].prevBytesSent = e.bytesSent);
                    var o = e.bytesSent - c.internal.audio[t].prevBytesSent;
                    c.internal.audio[t].prevBytesSent = e.bytesSent, n = o / 1024, c.audio[t].availableBandwidth = n.toFixed(1), c.audio.bytesSent = n.toFixed(1)
                }
                if (e.bytesReceived) {
                    n = 0;
                    c.internal.audio[t].prevBytesReceived || (c.internal.audio[t].prevBytesReceived = e.bytesReceived);
                    o = e.bytesReceived - c.internal.audio[t].prevBytesReceived;
                    c.internal.audio[t].prevBytesReceived = e.bytesReceived, n = o / 1024, c.audio.bytesReceived = n.toFixed(1)
                }
                if (e.googTrackId && -1 === c.audio[t].tracks.indexOf(e.googTrackId) && c.audio[t].tracks.push(e.googTrackId), e.googCurrentDelayMs) {
                    n = 0;
                    c.internal.audio.prevGoogCurrentDelayMs || (c.internal.audio.prevGoogCurrentDelayMs = e.googCurrentDelayMs);
                    o = e.googCurrentDelayMs - c.internal.audio.prevGoogCurrentDelayMs;
                    c.internal.audio.prevGoogCurrentDelayMs = e.googCurrentDelayMs, c.audio.latency = o.toFixed(1), c.audio.latency < 0 && (c.audio.latency = 0)
                }
                if (e.packetsLost) {
                    n = 0;
                    c.internal.audio.prevPacketsLost || (c.internal.audio.prevPacketsLost = e.packetsLost);
                    o = e.packetsLost - c.internal.audio.prevPacketsLost;
                    c.internal.audio.prevPacketsLost = e.packetsLost, c.audio.packetsLost = o.toFixed(1), c.audio.packetsLost < 0 && (c.audio.packetsLost = 0)
                }
            }
        }
    }, l.checkVideoTracks = function (e) {
        if ("video" === e.mediaType) {
            var t = e.id.split("_").pop();
            if (!0 === e.isRemote && (t = "recv"), !1 === e.isRemote && (t = "send"), t) {
                if (-1 === c.video[t].codecs.indexOf(e.googCodecName || "VP8") && c.video[t].codecs.push(e.googCodecName || "VP8"), e.bytesSent) {
                    var n = 0;
                    c.internal.video[t].prevBytesSent || (c.internal.video[t].prevBytesSent = e.bytesSent);
                    var o = e.bytesSent - c.internal.video[t].prevBytesSent;
                    c.internal.video[t].prevBytesSent = e.bytesSent, n = o / 1024, c.video[t].availableBandwidth = n.toFixed(1), c.video.bytesSent = n.toFixed(1)
                }
                if (e.bytesReceived) {
                    n = 0;
                    c.internal.video[t].prevBytesReceived || (c.internal.video[t].prevBytesReceived = e.bytesReceived);
                    o = e.bytesReceived - c.internal.video[t].prevBytesReceived;
                    c.internal.video[t].prevBytesReceived = e.bytesReceived, n = o / 1024, c.video.bytesReceived = n.toFixed(1)
                }
                if (e.googFrameHeightReceived && e.googFrameWidthReceived && (c.resolutions[t].width = e.googFrameWidthReceived, c.resolutions[t].height = e.googFrameHeightReceived), e.googFrameHeightSent && e.googFrameWidthSent && (c.resolutions[t].width = e.googFrameWidthSent, c.resolutions[t].height = e.googFrameHeightSent), e.googTrackId && -1 === c.video[t].tracks.indexOf(e.googTrackId) && c.video[t].tracks.push(e.googTrackId), e.framerateMean) {
                    c.bandwidth.framerateMean = e.framerateMean;
                    n = 0;
                    c.internal.video[t].prevFramerateMean || (c.internal.video[t].prevFramerateMean = e.bitrateMean);
                    o = e.bytesSent - c.internal.video[t].prevFramerateMean;
                    c.internal.video[t].prevFramerateMean = e.framerateMean, n = o / 1024, c.video[t].framerateMean = o.toFixed(1)
                }
                if (e.bitrateMean) {
                    c.bandwidth.bitrateMean = e.bitrateMean;
                    n = 0;
                    c.internal.video[t].prevBitrateMean || (c.internal.video[t].prevBitrateMean = e.bitrateMean);
                    o = e.bytesSent - c.internal.video[t].prevBitrateMean;
                    c.internal.video[t].prevBitrateMean = e.bitrateMean, n = o / 1024, c.video[t].bitrateMean = o.toFixed(1)
                }
                if (e.googCurrentDelayMs) {
                    n = 0;
                    c.internal.video.prevGoogCurrentDelayMs || (c.internal.video.prevGoogCurrentDelayMs = e.googCurrentDelayMs);
                    o = e.googCurrentDelayMs - c.internal.video.prevGoogCurrentDelayMs;
                    c.internal.video.prevGoogCurrentDelayMs = e.googCurrentDelayMs, c.video.latency = o.toFixed(1), c.video.latency < 0 && (c.video.latency = 0)
                }
                if (e.packetsLost) {
                    n = 0;
                    c.internal.video.prevPacketsLost || (c.internal.video.prevPacketsLost = e.packetsLost);
                    o = e.packetsLost - c.internal.video.prevPacketsLost;
                    c.internal.video.prevPacketsLost = e.packetsLost, c.video.packetsLost = o.toFixed(1), c.video.packetsLost < 0 && (c.video.packetsLost = 0)
                }
            }
        }
    }, l.bweforvideo = function (e) {
        "VideoBwe" === e.type && (c.bandwidth.availableSendBandwidth = e.googAvailableSendBandwidth, c.bandwidth.googActualEncBitrate = e.googActualEncBitrate, c.bandwidth.googAvailableSendBandwidth = e.googAvailableSendBandwidth, c.bandwidth.googAvailableReceiveBandwidth = e.googAvailableReceiveBandwidth, c.bandwidth.googRetransmitBitrate = e.googRetransmitBitrate, c.bandwidth.googTargetEncBitrate = e.googTargetEncBitrate, c.bandwidth.googBucketDelay = e.googBucketDelay, c.bandwidth.googTransmitBitrate = e.googTransmitBitrate)
    }, l.candidatePair = function (e) {
        if ("googCandidatePair" === e.type || "candidate-pair" === e.type || "local-candidate" === e.type || "remote-candidate" === e.type) {
            if ("true" == e.googActiveConnection)Object.keys(c.internal.candidates).forEach(function (t) {
                var n = c.internal.candidates[t];
                -1 !== n.ipAddress.indexOf(e.googLocalAddress) && (c.connectionType.local.candidateType = n.candidateType, c.connectionType.local.ipAddress = n.ipAddress, c.connectionType.local.networkType = n.networkType, c.connectionType.local.transport = n.transport), -1 !== n.ipAddress.indexOf(e.googRemoteAddress) && (c.connectionType.remote.candidateType = n.candidateType, c.connectionType.remote.ipAddress = n.ipAddress, c.connectionType.remote.networkType = n.networkType, c.connectionType.remote.transport = n.transport)
            }), c.connectionType.transport = e.googTransportType, (t = c.internal.candidates[e.localCandidateId]) && t.ipAddress && (c.connectionType.systemIpAddress = t.ipAddress), (n = c.internal.candidates[e.remoteCandidateId]) && n.ipAddress && (c.connectionType.systemIpAddress = n.ipAddress);
            if ("candidate-pair" === e.type && !0 === e.selected && !0 === e.nominated && "succeeded" === e.state)var t = c.internal.candidates[e.remoteCandidateId], n = c.internal.candidates[e.remoteCandidateId];
            if ("local-candidate" === e.type && (c.connectionType.local.candidateType = e.candidateType, c.connectionType.local.ipAddress = e.ipAddress, c.connectionType.local.networkType = e.networkType, c.connectionType.local.transport = e.mozLocalTransport || e.transport), "remote-candidate" === e.type && (c.connectionType.remote.candidateType = e.candidateType, c.connectionType.remote.ipAddress = e.ipAddress, c.connectionType.remote.networkType = e.networkType, c.connectionType.remote.transport = e.mozRemoteTransport || e.transport), u) {
                var o = e.localCandidateId ? "send" : "recv";
                if (!o)return;
                if (e.bytesSent) {
                    var i = 0;
                    c.internal.video[o].prevBytesSent || (c.internal.video[o].prevBytesSent = e.bytesSent);
                    var r = e.bytesSent - c.internal.video[o].prevBytesSent;
                    c.internal.video[o].prevBytesSent = e.bytesSent, i = r / 1024, c.video[o].availableBandwidth = i.toFixed(1), c.video.bytesSent = i.toFixed(1)
                }
                if (e.bytesReceived) {
                    i = 0;
                    c.internal.video[o].prevBytesReceived || (c.internal.video[o].prevBytesReceived = e.bytesReceived);
                    r = e.bytesReceived - c.internal.video[o].prevBytesReceived;
                    c.internal.video[o].prevBytesReceived = e.bytesReceived, i = r / 1024, c.video.bytesReceived = i.toFixed(1)
                }
                if (e.availableOutgoingBitrate) {
                    i = 0;
                    c.internal.video[o].prevAvailableOutgoingBitrate || (c.internal.video[o].prevAvailableOutgoingBitrate = e.availableOutgoingBitrate);
                    r = e.availableOutgoingBitrate - c.internal.video[o].prevAvailableOutgoingBitrate;
                    c.internal.video[o].prevAvailableOutgoingBitrate = e.availableOutgoingBitrate, i = r / 1024, c.video.availableOutgoingBitrate = i.toFixed(1)
                }
                if (e.availableIncomingBitrate) {
                    i = 0;
                    c.internal.video[o].prevAvailableIncomingBitrate || (c.internal.video[o].prevAvailableIncomingBitrate = e.availableIncomingBitrate);
                    r = e.availableIncomingBitrate - c.internal.video[o].prevAvailableIncomingBitrate;
                    c.internal.video[o].prevAvailableIncomingBitrate = e.availableIncomingBitrate, i = r / 1024, c.video.availableIncomingBitrate = i.toFixed(1)
                }
            }
        }
    };
    var f = {}, v = {}, p = {}, h = {};
    l.localcandidate = function (e) {
        "localcandidate" !== e.type && "local-candidate" !== e.type || e.id && (f[e.id] || (f[e.id] = []), v[e.id] || (v[e.id] = []), p[e.id] || (p[e.id] = []), h[e.id] || (h[e.id] = []), e.candidateType && -1 === f[e.id].indexOf(e.candidateType) && f[e.id].push(e.candidateType), e.transport && -1 === v[e.id].indexOf(e.transport) && v[e.id].push(e.transport), e.ipAddress && -1 === p[e.id].indexOf(e.ipAddress + ":" + e.portNumber) && p[e.id].push(e.ipAddress + ":" + e.portNumber), e.networkType && -1 === h[e.id].indexOf(e.networkType) && h[e.id].push(e.networkType), c.internal.candidates[e.id] = {
            candidateType: f[e.id],
            ipAddress: p[e.id],
            portNumber: e.portNumber,
            networkType: h[e.id],
            priority: e.priority,
            transport: v[e.id],
            timestamp: e.timestamp,
            id: e.id,
            type: e.type
        }, c.connectionType.local.candidateType = f[e.id], c.connectionType.local.ipAddress = p[e.id], c.connectionType.local.networkType = h[e.id], c.connectionType.local.transport = v[e.id])
    };
    var S = {}, C = {}, w = {}, y = {};
    l.remotecandidate = function (e) {
        "remotecandidate" !== e.type && "remote-candidate" !== e.type || e.id && (S[e.id] || (S[e.id] = []), C[e.id] || (C[e.id] = []), w[e.id] || (w[e.id] = []), y[e.id] || (y[e.id] = []), e.candidateType && -1 === S[e.id].indexOf(e.candidateType) && S[e.id].push(e.candidateType), e.transport && -1 === C[e.id].indexOf(e.transport) && C[e.id].push(e.transport), e.ipAddress && -1 === w[e.id].indexOf(e.ipAddress + ":" + e.portNumber) && w[e.id].push(e.ipAddress + ":" + e.portNumber), e.networkType && -1 === y[e.id].indexOf(e.networkType) && y[e.id].push(e.networkType), c.internal.candidates[e.id] = {
            candidateType: S[e.id],
            ipAddress: w[e.id],
            portNumber: e.portNumber,
            networkType: y[e.id],
            priority: e.priority,
            transport: C[e.id],
            timestamp: e.timestamp,
            id: e.id,
            type: e.type
        }, c.connectionType.remote.candidateType = S[e.id], c.connectionType.remote.ipAddress = w[e.id], c.connectionType.remote.networkType = y[e.id], c.connectionType.remote.transport = C[e.id])
    }, l.dataSentReceived = function (e) {
        !e.googCodecName || "video" !== e.mediaType && "audio" !== e.mediaType || (e.bytesSent && (c[e.mediaType].bytesSent = parseInt(e.bytesSent)), e.bytesReceived && (c[e.mediaType].bytesReceived = parseInt(e.bytesReceived)))
    }, l.inboundrtp = function (e) {
        if (u && "inbound-rtp" === e.type) {
            var t = e.mediaType || "audio", n = e.isRemote ? "recv" : "send";
            if (n) {
                if (e.bytesSent) {
                    var o = 0;
                    c.internal[t][n].prevBytesSent || (c.internal[t][n].prevBytesSent = e.bytesSent);
                    var i = e.bytesSent - c.internal[t][n].prevBytesSent;
                    c.internal[t][n].prevBytesSent = e.bytesSent, o = i / 1024, c[t][n].availableBandwidth = o.toFixed(1), c[t].bytesSent = o.toFixed(1)
                }
                if (e.bytesReceived) {
                    o = 0;
                    c.internal[t][n].prevBytesReceived || (c.internal[t][n].prevBytesReceived = e.bytesReceived);
                    i = e.bytesReceived - c.internal[t][n].prevBytesReceived;
                    c.internal[t][n].prevBytesReceived = e.bytesReceived, o = i / 1024, c[t].bytesReceived = o.toFixed(1)
                }
            }
        }
    }, l.outboundrtp = function (e) {
        if (u && "outbound-rtp" === e.type) {
            var t = e.mediaType || "audio", n = e.isRemote ? "recv" : "send";
            if (n) {
                if (e.bytesSent) {
                    var o = 0;
                    c.internal[t][n].prevBytesSent || (c.internal[t][n].prevBytesSent = e.bytesSent);
                    var i = e.bytesSent - c.internal[t][n].prevBytesSent;
                    c.internal[t][n].prevBytesSent = e.bytesSent, o = i / 1024, c[t][n].availableBandwidth = o.toFixed(1), c[t].bytesSent = o.toFixed(1)
                }
                if (e.bytesReceived) {
                    o = 0;
                    c.internal[t][n].prevBytesReceived || (c.internal[t][n].prevBytesReceived = e.bytesReceived);
                    i = e.bytesReceived - c.internal[t][n].prevBytesReceived;
                    c.internal[t][n].prevBytesReceived = e.bytesReceived, o = i / 1024, c[t].bytesReceived = o.toFixed(1)
                }
            }
        }
    }, l.track = function (e) {
        if (u && "track" === e.type) {
            var t = !0 === e.remoteSource ? "send" : "recv";
            e.frameWidth && e.frameHeight && (c.resolutions[t].width = e.frameWidth, c.resolutions[t].height = e.frameHeight)
        }
    };
    var b = {audio: {send: [], recv: []}, video: {send: [], recv: []}};
    l.ssrc = function (e) {
        if (e.googCodecName && ("video" === e.mediaType || "audio" === e.mediaType) && "ssrc" === e.type) {
            var t = e.id.split("_").pop();
            -1 === b[e.mediaType][t].indexOf(e.ssrc) && b[e.mediaType][t].push(e.ssrc), c[e.mediaType][t].streams = b[e.mediaType][t].length
        }
    }, o()
};
"undefined" != typeof module && (module.exports = getStats), "function" == typeof define && define.amd && define("getStats", [], function () {
    return getStats
});
var RTCMultiConnection = function (e, t) {
    var n;

    function o(e, t) {
        function n(e) {
            return !e.audio && !e.video && !e.screen && e.data
        }

        var o = "";
        o += "?userid=" + e.userid, o += "&sessionid=" + e.sessionid, o += "&msgEvent=" + e.socketMessageEvent, o += "&socketCustomEvent=" + e.socketCustomEvent, o += "&autoCloseEntireSession=" + !!e.autoCloseEntireSession, !0 === e.session.broadcast && (o += "&oneToMany=true"), o += "&maxParticipantsAllowed=" + e.maxParticipantsAllowed, e.enableScalableBroadcast && (o += "&enableScalableBroadcast=true", o += "&maxRelayLimitPerUser=" + (e.maxRelayLimitPerUser || 2)), o += "&extra=" + JSON.stringify(e.extra || {}), e.socketCustomParameters && (o += e.socketCustomParameters);
        try {
            io.sockets = {}
        } catch (e) {
        }
        if (e.socketURL || (e.socketURL = "/"), "/" != e.socketURL.substr(e.socketURL.length - 1, 1))throw'"socketURL" MUST end with a slash.';
        e.enableLogs && ("/" == e.socketURL ? console.info("socket.io url is: ", location.origin + "/") : console.info("socket.io url is: ", e.socketURL));
        try {
            e.socket = io(e.socketURL + o)
        } catch (t) {
            e.socket = io.connect(e.socketURL + o, e.socketOptions)
        }
        var i = e.multiPeersHandler;

        function r(t, n) {
            e.peersBackup[t] || (e.peersBackup[t] = {userid: t, extra: {}}), e.peersBackup[t].extra = n
        }

        e.socket.on("extra-data-updated", function (t, n) {
            e.peers[t] && (e.peers[t].extra = n, e.onExtraDataUpdated({userid: t, extra: n}), r(t, n))
        }), e.socket.on(e.socketMessageEvent, function t(o) {
            if (o.remoteUserId == e.userid)if (e.peers[o.sender] && e.peers[o.sender].extra != o.message.extra && (e.peers[o.sender].extra = o.extra, e.onExtraDataUpdated({
                    userid: o.sender,
                    extra: o.extra
                }), r(o.sender, o.extra)), o.message.streamSyncNeeded && e.peers[o.sender]) {
                var a = e.streamEvents[o.message.streamid];
                if (!a || !a.stream)return;
                var s = o.message.action;
                if ("ended" === s || "inactive" === s || "stream-removed" === s)return e.peersBackup[a.userid] && (a.extra = e.peersBackup[a.userid].extra), void e.onstreamended(a);
                var d = "both" != o.message.type ? o.message.type : null;
                "function" == typeof a.stream[s] && a.stream[s](d)
            } else if ("dropPeerConnection" !== o.message) {
                if (o.message.allParticipants)return -1 === o.message.allParticipants.indexOf(o.sender) && o.message.allParticipants.push(o.sender), void o.message.allParticipants.forEach(function (t) {
                    i[e.peers[t] ? "renegotiatePeer" : "createNewPeer"](t, {
                        localPeerSdpConstraints: {
                            OfferToReceiveAudio: e.sdpConstraints.mandatory.OfferToReceiveAudio,
                            OfferToReceiveVideo: e.sdpConstraints.mandatory.OfferToReceiveVideo
                        },
                        remotePeerSdpConstraints: {
                            OfferToReceiveAudio: e.session.oneway ? !!e.session.audio : e.sdpConstraints.mandatory.OfferToReceiveAudio,
                            OfferToReceiveVideo: e.session.oneway ? !!e.session.video || !!e.session.screen : e.sdpConstraints.mandatory.OfferToReceiveVideo
                        },
                        isOneWay: !!e.session.oneway || "one-way" === e.direction,
                        isDataOnly: n(e.session)
                    })
                });
                if (o.message.newParticipant) {
                    if (o.message.newParticipant == e.userid)return;
                    if (e.peers[o.message.newParticipant])return;
                    i.createNewPeer(o.message.newParticipant, o.message.userPreferences || {
                            localPeerSdpConstraints: {
                                OfferToReceiveAudio: e.sdpConstraints.mandatory.OfferToReceiveAudio,
                                OfferToReceiveVideo: e.sdpConstraints.mandatory.OfferToReceiveVideo
                            },
                            remotePeerSdpConstraints: {
                                OfferToReceiveAudio: e.session.oneway ? !!e.session.audio : e.sdpConstraints.mandatory.OfferToReceiveAudio,
                                OfferToReceiveVideo: e.session.oneway ? !!e.session.video || !!e.session.screen : e.sdpConstraints.mandatory.OfferToReceiveVideo
                            },
                            isOneWay: !!e.session.oneway || "one-way" === e.direction,
                            isDataOnly: n(e.session)
                        })
                } else if (o.message.readyForOffer && (e.attachStreams.length && (e.waitingForLocalMedia = !1), e.waitingForLocalMedia))setTimeout(function () {
                    t(o)
                }, 1); else if (o.message.newParticipationRequest && o.sender !== e.userid) {
                    e.peers[o.sender] && e.deletePeer(o.sender);
                    var c = {
                        extra: o.extra || {},
                        localPeerSdpConstraints: o.message.remotePeerSdpConstraints || {
                            OfferToReceiveAudio: e.sdpConstraints.mandatory.OfferToReceiveAudio,
                            OfferToReceiveVideo: e.sdpConstraints.mandatory.OfferToReceiveVideo
                        },
                        remotePeerSdpConstraints: o.message.localPeerSdpConstraints || {
                            OfferToReceiveAudio: e.session.oneway ? !!e.session.audio : e.sdpConstraints.mandatory.OfferToReceiveAudio,
                            OfferToReceiveVideo: e.session.oneway ? !!e.session.video || !!e.session.screen : e.sdpConstraints.mandatory.OfferToReceiveVideo
                        },
                        isOneWay: void 0 !== o.message.isOneWay ? o.message.isOneWay : !!e.session.oneway || "one-way" === e.direction,
                        isDataOnly: void 0 !== o.message.isDataOnly ? o.message.isDataOnly : n(e.session),
                        dontGetRemoteStream: void 0 !== o.message.isOneWay ? o.message.isOneWay : !!e.session.oneway || "one-way" === e.direction,
                        dontAttachLocalStream: !!o.message.dontGetRemoteStream,
                        connectionDescription: o,
                        successCallback: function () {
                        }
                    };
                    e.onNewParticipant(o.sender, c)
                } else {
                    if (o.message.changedUUID && e.peers[o.message.oldUUID] && (e.peers[o.message.newUUID] = e.peers[o.message.oldUUID], delete e.peers[o.message.oldUUID]), o.message.userLeft)return i.onUserLeft(o.sender), void(o.message.autoCloseEntireSession && e.leave());
                    i.addNegotiatedMessage(o.message, o.sender)
                }
            } else e.deletePeer(o.sender)
        });
        var a = !1;
        e.socket.resetProps = function () {
            a = !1
        }, e.socket.on("connect", function () {
            a || (a = !0, e.enableLogs && console.info("socket.io connection is opened."), setTimeout(function () {
                e.socket.emit("extra-data-updated", e.extra)
            }, 1e3), t && t(e.socket))
        }), e.socket.on("disconnect", function (t) {
            e.onSocketDisconnect(t)
        }), e.socket.on("error", function (t) {
            e.onSocketError(t)
        }), e.socket.on("user-disconnected", function (t) {
            t !== e.userid && (e.onUserStatusChanged({
                userid: t,
                status: "offline",
                extra: e.peers[t] && e.peers[t].extra || {}
            }), e.deletePeer(t))
        }), e.socket.on("user-connected", function (t) {
            t !== e.userid && e.onUserStatusChanged({
                userid: t,
                status: "online",
                extra: e.peers[t] && e.peers[t].extra || {}
            })
        }), e.socket.on("closed-entire-session", function (t, n) {
            e.leave(), e.onEntireSessionClosed({sessionid: t, userid: t, extra: n})
        }), e.socket.on("userid-already-taken", function (t, n) {
            e.onUserIdAlreadyTaken(t, n)
        }), e.socket.on("logs", function (t) {
            e.enableLogs && console.debug("server-logs", t)
        }), e.socket.on("number-of-broadcast-viewers-updated", function (t) {
            e.onNumberOfBroadcastViewersUpdated(t)
        }), e.socket.on("set-isInitiator-true", function (t) {
            t == e.sessionid && (e.isInitiator = !0)
        })
    }

    function i(e) {
        var t = this, n = ["getAllParticipants", "getLength", "selectFirst", "streams", "send", "forEach"];

        function o() {
            e.fbr = new FileBufferReader, e.fbr.onProgress = function (t) {
                e.onFileProgress(t)
            }, e.fbr.onBegin = function (t) {
                e.onFileStart(t)
            }, e.fbr.onEnd = function (t) {
                e.onFileEnd(t)
            }
        }

        e.peers = {
            getLength: function () {
                var e = 0;
                for (var t in this)-1 == n.indexOf(t) && e++;
                return e
            }, selectFirst: function () {
                var e;
                for (var t in this)-1 == n.indexOf(t) && (e = this[t]);
                return e
            }, getAllParticipants: function (e) {
                var t = [];
                for (var o in this)-1 == n.indexOf(o) && o != e && t.push(o);
                return t
            }, forEach: function (t) {
                this.getAllParticipants().forEach(function (n) {
                    t(e.peers[n])
                })
            }, send: function (n, o) {
                var i = this;
                if (!m(n.size) && !m(n.type)) {
                    if (e.enableFileSharing)return void t.shareFile(n, o);
                    "string" != typeof n && (n = JSON.stringify(n))
                }
                if ("text" === n.type || n instanceof ArrayBuffer || n instanceof DataView) {
                    if ("text" === n.type && (n = JSON.stringify(n)), o) {
                        var r = e.peers[o];
                        if (r)return r.channels.length ? void r.channels.forEach(function (e) {
                            e.send(n)
                        }) : (e.peers[o].createDataChannel(), e.renegotiate(o), void setTimeout(function () {
                            i.send(n, o)
                        }, 3e3))
                    }
                    this.getAllParticipants().forEach(function (t) {
                        if (!i[t].channels.length)return e.peers[t].createDataChannel(), e.renegotiate(t), void setTimeout(function () {
                            i[t].channels.forEach(function (e) {
                                e.send(n)
                            })
                        }, 3e3);
                        i[t].channels.forEach(function (e) {
                            e.send(n)
                        })
                    })
                } else M.send({text: n, channel: this, connection: e, remoteUserId: o})
            }
        }, this.uuid = e.userid, this.getLocalConfig = function (n, i, r) {
            return r || (r = {}), {
                streamsToShare: r.streamsToShare || {},
                rtcMultiConnection: e,
                connectionDescription: r.connectionDescription,
                userid: i,
                localPeerSdpConstraints: r.localPeerSdpConstraints,
                remotePeerSdpConstraints: r.remotePeerSdpConstraints,
                dontGetRemoteStream: !!r.dontGetRemoteStream,
                dontAttachLocalStream: !!r.dontAttachLocalStream,
                renegotiatingPeer: !!r.renegotiatingPeer,
                peerRef: r.peerRef,
                channels: r.channels || [],
                onLocalSdp: function (e) {
                    t.onNegotiationNeeded(e, i)
                },
                onLocalCandidate: function (n) {
                    (n = T.processCandidates(e, n)) && t.onNegotiationNeeded(n, i)
                },
                remoteSdp: n,
                onDataChannelMessage: function (n) {
                    if (!e.fbr && e.enableFileSharing && o(), "string" != typeof n && e.enableFileSharing) {
                        var r = this;
                        n instanceof ArrayBuffer || n instanceof DataView ? e.fbr.convertToObject(n, function (e) {
                            r.onDataChannelMessage(e)
                        }) : n.readyForNextChunk ? e.fbr.getNextChunk(n, function (t, n) {
                            e.peers[i].channels.forEach(function (e) {
                                e.send(t)
                            })
                        }, i) : n.chunkMissing ? e.fbr.chunkMissing(n) : e.fbr.addChunk(n, function (t) {
                            e.peers[i].peer.channel.send(t)
                        })
                    } else t.onDataChannelMessage(n, i)
                },
                onDataChannelError: function (e) {
                    t.onDataChannelError(e, i)
                },
                onDataChannelOpened: function (e) {
                    t.onDataChannelOpened(e, i)
                },
                onDataChannelClosed: function (e) {
                    t.onDataChannelClosed(e, i)
                },
                onRemoteStream: function (n) {
                    e.peers[i] && e.peers[i].streams.push(n), t.onGettingRemoteMedia(n, i)
                },
                onRemoteStreamRemoved: function (e) {
                    t.onRemovingRemoteMedia(e, i)
                },
                onPeerStateChanged: function (e) {
                    t.onPeerStateChanged(e), "new" === e.iceConnectionState && t.onNegotiationStarted(i, e), "connected" === e.iceConnectionState && t.onNegotiationCompleted(i, e), -1 !== e.iceConnectionState.search(/closed|failed/gi) && (t.onUserLeft(i), t.disconnectWith(i))
                }
            }
        }, this.createNewPeer = function (t, n) {
            if (!(e.maxParticipantsAllowed <= e.getAllParticipants().length)) {
                if (n = n || {}, e.isInitiator && e.session.audio && "two-way" === e.session.audio && !n.streamsToShare && (n.isOneWay = !1, n.isDataOnly = !1, n.session = e.session), !n.isOneWay && !n.isDataOnly)return n.isOneWay = !0, void this.onNegotiationNeeded({
                    enableMedia: !0,
                    userPreferences: n
                }, t);
                n = e.setUserPreferences(n, t);
                var o = this.getLocalConfig(null, t, n);
                e.peers[t] = new _(o)
            }
        }, this.createAnsweringPeer = function (t, n, o) {
            o = e.setUserPreferences(o || {}, n);
            var i = this.getLocalConfig(t, n, o);
            e.peers[n] = new _(i)
        }, this.renegotiatePeer = function (t, n, o) {
            if (e.peers[t]) {
                n || (n = {}), n.renegotiatingPeer = !0, n.peerRef = e.peers[t].peer, n.channels = e.peers[t].channels;
                var i = this.getLocalConfig(o, t, n);
                e.peers[t] = new _(i)
            } else e.enableLogs && console.error("Peer (" + t + ") does not exist. Renegotiation skipped.")
        }, this.replaceTrack = function (t, n, o) {
            if (!e.peers[n])throw"This peer (" + n + ") does not exist.";
            var i = e.peers[n].peer;
            i.getSenders && "function" == typeof i.getSenders && i.getSenders().length ? i.getSenders().forEach(function (i) {
                o && "video" === i.track.kind && (e.peers[n].peer.lastVideoTrack = i.track, i.replaceTrack(t)), o || "audio" !== i.track.kind || (e.peers[n].peer.lastAudioTrack = i.track, i.replaceTrack(t))
            }) : (console.warn("RTPSender.replaceTrack is NOT supported."), this.renegotiatePeer(n))
        }, this.onNegotiationNeeded = function (e, t) {
        }, this.addNegotiatedMessage = function (n, o) {
            if (n.type && n.sdp)return "answer" == n.type && e.peers[o] && e.peers[o].addRemoteSdp(n), "offer" == n.type && (n.renegotiatingPeer ? this.renegotiatePeer(o, null, n) : this.createAnsweringPeer(n, o)), void(e.enableLogs && console.log("Remote peer's sdp:", n.sdp));
            if (n.candidate)return e.peers[o] && e.peers[o].addRemoteCandidate(n), void(e.enableLogs && console.log("Remote peer's candidate pairs:", n.candidate));
            if (n.enableMedia) {
                e.session = n.userPreferences.session || e.session, e.session.oneway && e.attachStreams.length && (e.attachStreams = []), n.userPreferences.isDataOnly && e.attachStreams.length && (e.attachStreams.length = []);
                var i = {};
                e.attachStreams.forEach(function (e) {
                    i[e.streamid] = {isAudio: !!e.isAudio, isVideo: !!e.isVideo, isScreen: !!e.isScreen}
                }), n.userPreferences.streamsToShare = i, t.onNegotiationNeeded({
                    readyForOffer: !0,
                    userPreferences: n.userPreferences
                }, o)
            }
            n.readyForOffer && e.onReadyForOffer(o, n.userPreferences)
        }, this.onGettingRemoteMedia = function (e, t) {
        }, this.onRemovingRemoteMedia = function (e, t) {
        }, this.onGettingLocalMedia = function (e) {
        }, this.onLocalMediaError = function (t, n) {
            e.onMediaError(t, n)
        }, this.shareFile = function (t, n) {
            o(), e.fbr.readAsArrayBuffer(t, function (t) {
                var o = e.getAllParticipants();
                n && (o = [n]), o.forEach(function (n) {
                    e.fbr.getNextChunk(t, function (t) {
                        e.peers[n].channels.forEach(function (e) {
                            e.send(t)
                        })
                    }, n)
                })
            }, {userid: e.userid, chunkSize: "Firefox" === DetectRTC.browser.name ? 15e3 : e.chunkSize || 0})
        };
        var i = new x(e);
        this.onDataChannelMessage = function (t, n) {
            i.receive(JSON.parse(t), n, e.peers[n] ? e.peers[n].extra : {})
        }, this.onDataChannelClosed = function (t, n) {
            t.userid = n, t.extra = e.peers[n] ? e.peers[n].extra : {}, e.onclose(t)
        }, this.onDataChannelError = function (t, n) {
            t.userid = n, event.extra = e.peers[n] ? e.peers[n].extra : {}, e.onerror(t)
        }, this.onDataChannelOpened = function (t, n) {
            e.peers[n].channels.length ? e.peers[n].channels = [t] : (e.peers[n].channels.push(t), e.onopen({
                userid: n,
                extra: e.peers[n] ? e.peers[n].extra : {},
                channel: t
            }))
        }, this.onPeerStateChanged = function (t) {
            e.onPeerStateChanged(t)
        }, this.onNegotiationStarted = function (e, t) {
        }, this.onNegotiationCompleted = function (e, t) {
        }, this.getRemoteStreams = function (t) {
            return t = t || e.peers.getAllParticipants()[0], e.peers[t] ? e.peers[t].streams : []
        }
    }

    function r(e, t, n) {
        if ("undefined" != typeof CustomEvent) {
            var o = new CustomEvent(t, {arguments: n, __exposedProps__: n});
            e.dispatchEvent(o)
        }
    }

    function a(e, t) {
        t.stream && t.stream && t.stream.addEventListener && (t.stream.addEventListener("mute", function (n) {
            (n = e.streamEvents[t.streamid]).session = {
                audio: "audio" === n.muteType,
                video: "video" === n.muteType
            }, e.onmute(n)
        }, !1), t.stream.addEventListener("unmute", function (n) {
            (n = e.streamEvents[t.streamid]).session = {
                audio: "audio" === n.unmuteType,
                video: "video" === n.unmuteType
            }, e.onunmute(n)
        }, !1))
    }

    function s() {
        if (window.crypto && window.crypto.getRandomValues && -1 === navigator.userAgent.indexOf("Safari")) {
            for (var e = window.crypto.getRandomValues(new Uint32Array(3)), t = "", n = 0, o = e.length; n < o; n++)t += e[n].toString(36);
            return t
        }
        return (Math.random() * (new Date).getTime()).toString(36).replace(/\./g, "")
    }

    function d(e, t, n) {
        if (n.autoCreateMediaElement) {
            var o = !1;
            v(e, "video").length || e.isVideo || e.isScreen || (o = !0), "Firefox" === DetectRTC.browser.name && (n.session.video || n.session.screen) && (o = !1);
            var i = document.createElement(o ? "audio" : "video");
            if (i.srcObject = e, i.setAttribute("autoplay", !0), i.setAttribute("playsinline", !0), i.setAttribute("controls", !0), i.setAttribute("muted", !1), i.setAttribute("volume", 1), "Firefox" === DetectRTC.browser.name) {
                var r = "ended";
                "oninactive" in i && (r = "inactive"), i.addEventListener(r, function () {
                    if (currentUserMediaRequest.remove(e.idInstance), "local" === e.type) {
                        r = "ended", "oninactive" in e && (r = "inactive"), E.onSyncNeeded(e.streamid, r), n.attachStreams.forEach(function (t, o) {
                            e.streamid === t.streamid && delete n.attachStreams[o]
                        });
                        var t = [];
                        n.attachStreams.forEach(function (e) {
                            e && t.push(e)
                        }), n.attachStreams = t;
                        var o = n.streamEvents[e.streamid];
                        if (o)return void n.onstreamended(o);
                        this.parentNode && this.parentNode.removeChild(this)
                    }
                }, !1)
            }
            var a = i.play();
            if (void 0 !== a) {
                var s = !1;
                setTimeout(function () {
                    s || (s = !0, t(i))
                }, 1e3), a.then(function () {
                    s || (s = !0, t(i))
                }).catch(function (e) {
                    s || (s = !0, t(i))
                })
            } else t(i)
        } else t({})
    }

    function c(e, t) {
        window.removeEventListener(e, t), window.addEventListener(e, t, !1)
    }

    function l(e) {
        var t = [];
        return e.forEach(function (e) {
            e && t.push(e)
        }), t
    }

    function u(e) {
        return !e.audio && !e.video && !e.screen && e.data
    }

    function m(e) {
        return void 0 === e
    }

    (n = "undefined" != typeof global ? global : null) && "undefined" == typeof window && "undefined" != typeof global && (global.navigator = {
        userAgent: "Fake/5.0 (FakeOS) AppleWebKit/123 (KHTML, like Gecko) Fake/12.3.4567.89 Fake/123.45",
        getUserMedia: function () {
        }
    }, global.console || (global.console = {}), void 0 === global.console.debug && (global.console.debug = global.console.info = global.console.error = global.console.log = global.console.log || function () {
            console.log(arguments)
        }), "undefined" == typeof document && (n.document = {}, document.createElement = document.captureStream = document.mozCaptureStream = function () {
        var e = {
            getContext: function () {
                return e
            }, play: function () {
            }, pause: function () {
            }, drawImage: function () {
            }, toDataURL: function () {
                return ""
            }
        };
        return e
    }, document.addEventListener = document.removeEventListener = n.addEventListener = n.removeEventListener = function () {
    }, n.HTMLVideoElement = n.HTMLMediaElement = function () {
    }), "undefined" == typeof io && (n.io = function () {
        return {
            on: function (e, t) {
                t = t || function () {
                    }, "connect" === e && t()
            }, emit: function (e, t, n) {
                n = n || function () {
                    }, "open-room" !== e && "join-room" !== e || n(!0, t.sessionid, null)
            }
        }
    }), "undefined" == typeof location && (n.location = {
        protocol: "file:",
        href: "",
        hash: "",
        origin: "self"
    }), "undefined" == typeof screen && (n.screen = {
        width: 0,
        height: 0
    }), "undefined" == typeof URL && (n.URL = {
        createObjectURL: function () {
            return ""
        }, revokeObjectURL: function () {
            return ""
        }
    }), n.window = global), function () {
        var e = "Fake/5.0 (FakeOS) AppleWebKit/123 (KHTML, like Gecko) Fake/12.3.4567.89 Fake/123.45";
        if (h = "object" == typeof process && "object" == typeof process.versions && process.versions.node && !process.browser) {
            var t = process.versions.node.toString().replace("v", "");
            e = "Nodejs/" + t + " (NodeOS) AppleWebKit/" + t + " (KHTML, like Gecko) Nodejs/" + t + " Nodejs/" + t
        }
        !function (t) {
            "undefined" == typeof window && ("undefined" == typeof window && "undefined" != typeof global && (global.navigator = {
                userAgent: e,
                getUserMedia: function () {
                }
            }, t.window = global), "undefined" == typeof location && (t.location = {
                protocol: "file:",
                href: "",
                hash: ""
            }), "undefined" == typeof screen && (t.screen = {width: 0, height: 0}))
        }("undefined" != typeof global ? global : window);
        var n = window.navigator;
        void 0 !== n ? (void 0 !== n.webkitGetUserMedia && (n.getUserMedia = n.webkitGetUserMedia), void 0 !== n.mozGetUserMedia && (n.getUserMedia = n.mozGetUserMedia)) : n = {
            getUserMedia: function () {
            }, userAgent: e
        };
        var o = !!/Android|webOS|iPhone|iPad|iPod|BB10|BlackBerry|IEMobile|Opera Mini|Mobile|mobile/i.test(n.userAgent || ""), i = !(-1 === n.userAgent.indexOf("Edge") || !n.msSaveOrOpenBlob && !n.msSaveBlob), r = !!window.opera || n.userAgent.indexOf(" OPR/") >= 0, a = void 0 !== window.InstallTrigger, s = /^((?!chrome|android).)*safari/i.test(n.userAgent), d = !!window.chrome && !r, c = "undefined" != typeof document && !!document.documentMode && !i;

        function l(e, t) {
            var n = 0, o = !1, i = window.setInterval(function () {
                e() && (window.clearInterval(i), t(o)), n++ > 50 && (window.clearInterval(i), t(o = !0))
            }, 10)
        }

        var u = {
            Android: function () {
                return n.userAgent.match(/Android/i)
            }, BlackBerry: function () {
                return n.userAgent.match(/BlackBerry|BB10/i)
            }, iOS: function () {
                return n.userAgent.match(/iPhone|iPad|iPod/i)
            }, Opera: function () {
                return n.userAgent.match(/Opera Mini/i)
            }, Windows: function () {
                return n.userAgent.match(/IEMobile/i)
            }, any: function () {
                return u.Android() || u.BlackBerry() || u.iOS() || u.Opera() || u.Windows()
            }, getOsName: function () {
                var e = "Unknown OS";
                return u.Android() && (e = "Android"), u.BlackBerry() && (e = "BlackBerry"), u.iOS() && (e = "iOS"), u.Opera() && (e = "Opera Mini"), u.Windows() && (e = "Windows"), e
            }
        };
        var m = "Unknown OS", g = "Unknown OS Version";
        var f, v, p = function () {
            for (var e, t = n.appVersion, o = n.userAgent, i = "-", r = [{
                s: "Windows 10",
                r: /(Windows 10.0|Windows NT 10.0)/
            }, {s: "Windows 8.1", r: /(Windows 8.1|Windows NT 6.3)/}, {
                s: "Windows 8",
                r: /(Windows 8|Windows NT 6.2)/
            }, {s: "Windows 7", r: /(Windows 7|Windows NT 6.1)/}, {
                s: "Windows Vista",
                r: /Windows NT 6.0/
            }, {s: "Windows Server 2003", r: /Windows NT 5.2/}, {
                s: "Windows XP",
                r: /(Windows NT 5.1|Windows XP)/
            }, {s: "Windows 2000", r: /(Windows NT 5.0|Windows 2000)/}, {
                s: "Windows ME",
                r: /(Win 9x 4.90|Windows ME)/
            }, {s: "Windows 98", r: /(Windows 98|Win98)/}, {
                s: "Windows 95",
                r: /(Windows 95|Win95|Windows_95)/
            }, {s: "Windows NT 4.0", r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/}, {
                s: "Windows CE",
                r: /Windows CE/
            }, {s: "Windows 3.11", r: /Win16/}, {s: "Android", r: /Android/}, {
                s: "Open BSD",
                r: /OpenBSD/
            }, {s: "Sun OS", r: /SunOS/}, {s: "Linux", r: /(Linux|X11)/}, {
                s: "iOS",
                r: /(iPhone|iPad|iPod)/
            }, {s: "Mac OS X", r: /Mac OS X/}, {s: "Mac OS", r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/}, {
                s: "QNX",
                r: /QNX/
            }, {s: "UNIX", r: /UNIX/}, {s: "BeOS", r: /BeOS/}, {s: "OS/2", r: /OS\/2/}, {
                s: "Search Bot",
                r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/
            }], a = 0; e = r[a]; a++)if (e.r.test(o)) {
                i = e.s;
                break
            }
            var s = "-";
            switch (/Windows/.test(i) && (/Windows (.*)/.test(i) && (s = /Windows (.*)/.exec(i)[1]), i = "Windows"), i) {
                case"Mac OS X":
                    /Mac OS X (10[\.\_\d]+)/.test(o) && (s = /Mac OS X (10[\.\_\d]+)/.exec(o)[1]);
                    break;
                case"Android":
                    /Android ([\.\_\d]+)/.test(o) && (s = /Android ([\.\_\d]+)/.exec(o)[1]);
                    break;
                case"iOS":
                    /OS (\d+)_(\d+)_?(\d+)?/.test(o) && (s = (s = /OS (\d+)_(\d+)_?(\d+)?/.exec(t))[1] + "." + s[2] + "." + (0 | s[3]))
            }
            return {osName: i, osVersion: s}
        }();
        p && p.osName && "-" != p.osName ? (m = p.osName, g = p.osVersion) : u.any() && "Android" == (m = u.getOsName()) && (g = !!(v = (f = (f || n.userAgent).toLowerCase()).match(/android\s([0-9\.]*)/)) && v[1]);
        var h = "object" == typeof process && "object" == typeof process.versions && process.versions.node;
        "Unknown OS" === m && h && (m = "Nodejs", g = process.versions.node.toString().replace("v", ""));
        var S = !1, C = !1;
        ["captureStream", "mozCaptureStream", "webkitCaptureStream"].forEach(function (e) {
            "undefined" != typeof document && "function" == typeof document.createElement && (!S && e in document.createElement("canvas") && (S = !0), !C && e in document.createElement("video") && (C = !0))
        });
        var w = /^(192\.168\.|169\.254\.|10\.|172\.(1[6-9]|2\d|3[01]))/, y = /([0-9]{1,3}(\.[0-9]{1,3}){3})/, b = /[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7}/;
        var _ = [], k = [], T = [], R = [];
        n.mediaDevices && n.mediaDevices.enumerateDevices && (n.enumerateDevices = function (e) {
            var t = n.mediaDevices.enumerateDevices();
            t && t.then ? n.mediaDevices.enumerateDevices().then(e).catch(function () {
                e([])
            }) : e([])
        });
        var A = !1;
        void 0 !== I && "getSources" in I ? A = !0 : n.mediaDevices && n.mediaDevices.enumerateDevices && (A = !0);
        var E = !1, x = !1, M = !1, P = !1, O = !1;

        function V(e) {
            if (A)if (!n.enumerateDevices && window.MediaStreamTrack && window.MediaStreamTrack.getSources && (n.enumerateDevices = window.MediaStreamTrack.getSources.bind(window.MediaStreamTrack)), !n.enumerateDevices && n.enumerateDevices && (n.enumerateDevices = n.enumerateDevices.bind(n)), n.enumerateDevices) {
                _ = [], k = [], T = [], R = [], E = !1, x = !1, M = !1, P = !1, O = !1;
                var t = {};
                n.enumerateDevices(function (n) {
                    n.forEach(function (e) {
                        var n = {};
                        for (var o in e)try {
                            "function" != typeof e[o] && (n[o] = e[o])
                        } catch (e) {
                        }
                        t[n.deviceId + n.label + n.kind] || ("audio" === n.kind && (n.kind = "audioinput"), "video" === n.kind && (n.kind = "videoinput"), n.deviceId || (n.deviceId = n.id), n.id || (n.id = n.deviceId), n.label ? ("videoinput" !== n.kind || O || (O = !0), "audioinput" !== n.kind || P || (P = !0)) : (n.isCustomLabel = !0, "videoinput" === n.kind ? n.label = "Camera " + (R.length + 1) : "audioinput" === n.kind ? n.label = "Microphone " + (k.length + 1) : "audiooutput" === n.kind ? n.label = "Speaker " + (T.length + 1) : n.label = "Please invoke getUserMedia once.", void 0 !== L && L.browser.isChrome && L.browser.version >= 46 && !/^(https:|chrome-extension:)$/g.test(location.protocol || "") && "undefined" != typeof document && "string" == typeof document.domain && document.domain.search && -1 === document.domain.search(/localhost|127.0./g) && (n.label = "HTTPs is required to get label of this " + n.kind + " device.")), "audioinput" === n.kind && (E = !0, -1 === k.indexOf(n) && k.push(n)), "audiooutput" === n.kind && (x = !0, -1 === T.indexOf(n) && T.push(n)), "videoinput" === n.kind && (M = !0, -1 === R.indexOf(n) && R.push(n)), _.push(n), t[n.deviceId + n.label + n.kind] = n)
                    }), void 0 !== L && (L.MediaDevices = _, L.hasMicrophone = E, L.hasSpeakers = x, L.hasWebcam = M, L.isWebsiteHasWebcamPermissions = O, L.isWebsiteHasMicrophonePermissions = P, L.audioInputDevices = k, L.audioOutputDevices = T, L.videoInputDevices = R), e && e()
                })
            } else e && e(); else e && e()
        }

        var L = window.DetectRTC || {};
        L.browser = function () {
            n.appVersion;
            var e, t, o, l = n.userAgent, u = n.appName, m = "" + parseFloat(n.appVersion), g = parseInt(n.appVersion, 10);
            if (s && !d && -1 !== l.indexOf("CriOS") && (s = !1, d = !0), r) {
                u = "Opera";
                try {
                    g = (m = n.userAgent.split("OPR/")[1].split(" ")[0]).split(".")[0]
                } catch (e) {
                    m = "0.0.0.0", g = 0
                }
            } else c ? ((t = l.indexOf("rv:")) > 0 ? m = l.substring(t + 3) : (t = l.indexOf("MSIE"), m = l.substring(t + 5)), u = "IE") : d ? (t = l.indexOf("Chrome"), u = "Chrome", m = l.substring(t + 7)) : s ? (t = l.indexOf("Safari"), u = "Safari", m = l.substring(t + 7), -1 !== (t = l.indexOf("Version")) && (m = l.substring(t + 8)), -1 !== n.userAgent.indexOf("Version/") && (m = n.userAgent.split("Version/")[1].split(" ")[0])) : a ? (t = l.indexOf("Firefox"), u = "Firefox", m = l.substring(t + 8)) : (e = l.lastIndexOf(" ") + 1) < (t = l.lastIndexOf("/")) && (u = l.substring(e, t), m = l.substring(t + 1), u.toLowerCase() === u.toUpperCase() && (u = n.appName));
            return i && (u = "Edge", m = n.userAgent.split("Edge/")[1]), -1 !== (o = m.search(/[; \)]/)) && (m = m.substring(0, o)), g = parseInt("" + m, 10), isNaN(g) && (m = "" + parseFloat(n.appVersion), g = parseInt(n.appVersion, 10)), {
                fullVersion: m,
                version: g,
                name: u,
                isPrivateBrowsing: !1
            }
        }(), function (e) {
            var t;
            try {
                if (window.webkitRequestFileSystem)window.webkitRequestFileSystem(window.TEMPORARY, 1, function () {
                    t = !1
                }, function (e) {
                    t = !0
                }); else if (window.indexedDB && /Firefox/.test(window.navigator.userAgent)) {
                    var n;
                    try {
                        (n = window.indexedDB.open("test")).onerror = function () {
                            return !0
                        }
                    } catch (e) {
                        t = !0
                    }
                    void 0 === t && l(function () {
                        return "done" === n.readyState
                    }, function (e) {
                        e || (t = !n.result)
                    })
                } else if (function (e) {
                        var t = e.toLowerCase();
                        if (0 === t.indexOf("msie") && 0 === t.indexOf("trident"))return !1;
                        var n = /(?:msie|rv:)\s?([\d\.]+)/.exec(t);
                        return !!(n && parseInt(n[1], 10) >= 10)
                    }(window.navigator.userAgent)) {
                    t = !1;
                    try {
                        window.indexedDB || (t = !0)
                    } catch (e) {
                        t = !0
                    }
                } else if (window.localStorage && /Safari/.test(window.navigator.userAgent)) {
                    try {
                        window.localStorage.setItem("test", 1)
                    } catch (e) {
                        t = !0
                    }
                    void 0 === t && (t = !1, window.localStorage.removeItem("test"))
                }
            } catch (e) {
                t = !1
            }
            l(function () {
                return void 0 !== t
            }, function (n) {
                e(t)
            })
        }(function (e) {
            L.browser.isPrivateBrowsing = !!e
        }), L.browser["is" + L.browser.name] = !0, L.osName = m, L.osVersion = g;
        "object" == typeof process && "object" == typeof process.versions && process.versions["node-webkit"];
        var B = !1;
        ["RTCPeerConnection", "webkitRTCPeerConnection", "mozRTCPeerConnection", "RTCIceGatherer"].forEach(function (e) {
            B || e in window && (B = !0)
        }), L.isWebRTCSupported = B, L.isORTCSupported = "undefined" != typeof RTCIceGatherer;
        var D = !1;
        (L.browser.isChrome && L.browser.version >= 35 ? D = !0 : L.browser.isFirefox && L.browser.version >= 34 ? D = !0 : L.browser.isEdge && L.browser.version >= 17 ? D = !0 : "Android" === L.osName && L.browser.isChrome && (D = !0), /^(https:|chrome-extension:)$/g.test(location.protocol || "")) || ("undefined" != typeof document && "string" == typeof document.domain && document.domain.search && -1 === document.domain.search(/localhost|127.0./g) && (L.browser.isChrome || L.browser.isEdge || L.browser.isOpera) ? D = !1 : L.browser.isFirefox && (D = !1));
        L.isScreenCapturingSupported = D;
        var N = {isSupported: !1, isCreateMediaStreamSourceSupported: !1};
        ["AudioContext", "webkitAudioContext", "mozAudioContext", "msAudioContext"].forEach(function (e) {
            N.isSupported || e in window && (N.isSupported = !0, window[e] && "createMediaStreamSource" in window[e].prototype && (N.isCreateMediaStreamSourceSupported = !0))
        }), L.isAudioContextSupported = N.isSupported, L.isCreateMediaStreamSourceSupported = N.isCreateMediaStreamSourceSupported;
        var U = !1;
        L.browser.isChrome && L.browser.version > 31 && (U = !0), L.isRtpDataChannelsSupported = U;
        var j = !1;
        L.browser.isFirefox && L.browser.version > 28 ? j = !0 : L.browser.isChrome && L.browser.version > 25 ? j = !0 : L.browser.isOpera && L.browser.version >= 11 && (j = !0), L.isSctpDataChannelsSupported = j, L.isMobileDevice = o;
        var F = !1;
        n.getUserMedia ? F = !0 : n.mediaDevices && n.mediaDevices.getUserMedia && (F = !0), L.browser.isChrome && L.browser.version >= 46 && !/^(https:|chrome-extension:)$/g.test(location.protocol || "") && "undefined" != typeof document && "string" == typeof document.domain && document.domain.search && -1 === document.domain.search(/localhost|127.0./g) && (F = "Requires HTTPs"), "Nodejs" === L.osName && (F = !1), L.isGetUserMediaSupported = F;
        var q, Q, W, H = "";
        screen.width && (H += (screen.width ? screen.width : "") + " x " + (screen.height ? screen.height : ""));
        L.displayResolution = H, L.displayAspectRatio = (q = screen.width, Q = screen.height, W = function e(t, n) {
            return 0 == n ? t : e(n, t % n)
        }(q, Q), q / W / (Q / W)).toFixed(2), L.isCanvasSupportsStreamCapturing = S, L.isVideoSupportsStreamCapturing = C, "Chrome" == L.browser.name && L.browser.version >= 53 && (L.isCanvasSupportsStreamCapturing || (L.isCanvasSupportsStreamCapturing = "Requires chrome flag: enable-experimental-web-platform-features"), L.isVideoSupportsStreamCapturing || (L.isVideoSupportsStreamCapturing = "Requires chrome flag: enable-experimental-web-platform-features")), L.DetectLocalIPAddress = function (e, t) {
            if (L.isWebRTCSupported) {
                var n = !0, o = !0;
                !function (e, t) {
                    if ("undefined" == typeof document || "function" != typeof document.getElementById)return;
                    var n = {}, o = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
                    if (!o) {
                        var i = document.getElementById("iframe");
                        if (!i)return;
                        var r = i.contentWindow;
                        o = r.RTCPeerConnection || r.mozRTCPeerConnection || r.webkitRTCPeerConnection
                    }
                    if (!o)return;
                    var a = null;
                    "Chrome" === L.browser && L.browser.version < 58 && (a = {optional: [{RtpDataChannels: !0}]});
                    var s = svConfigs.iceServers, d = new o(s, a);
                    t && (d.addStream ? d.addStream(t) : d.addTrack && t.getTracks()[0] && d.addTrack(t.getTracks()[0], t));
                    function c(t) {
                        if (t) {
                            var o = y.exec(t);
                            if (o) {
                                var i = o[1], r = t.match(w);
                                void 0 === n[i] && e(i, r, !0), n[i] = !0
                            }
                        } else e()
                    }

                    if (d.onicecandidate = function (e) {
                            e.candidate && e.candidate.candidate ? c(e.candidate.candidate) : c()
                        }, !t)try {
                        d.createDataChannel("sctp", {})
                    } catch (e) {
                    }
                    L.isPromisesSupported ? d.createOffer().then(function (e) {
                        d.setLocalDescription(e).then(l)
                    }) : d.createOffer(function (e) {
                        d.setLocalDescription(e, l, function () {
                        })
                    }, function () {
                    });
                    function l() {
                        d.localDescription.sdp.split("\n").forEach(function (e) {
                            e && 0 === e.indexOf("a=candidate:") && c(e)
                        })
                    }
                }(function (t) {
                    t ? t.match(w) ? e("Local: " + t, n = !1, o) : t.match(b) ? e("Public: " + t, n, o = !1) : e("Public: " + t, n, o) : e()
                }, t)
            }
        }, L.isWebSocketsSupported = "WebSocket" in window && 2 === window.WebSocket.CLOSING, L.isWebSocketsBlocked = !L.isWebSocketsSupported, "Nodejs" === L.osName && (L.isWebSocketsSupported = !0, L.isWebSocketsBlocked = !1), L.checkWebSocketsSupport = function (e) {
            e = e || function () {
                };
            try {
                var t, n = new WebSocket("wss://echo.websocket.org:443/");
                n.onopen = function () {
                    L.isWebSocketsBlocked = !1, t = (new Date).getTime(), n.send("ping")
                }, n.onmessage = function () {
                    L.WebsocketLatency = (new Date).getTime() - t + "ms", e(), n.close(), n = null
                }, n.onerror = function () {
                    L.isWebSocketsBlocked = !0, e()
                }
            } catch (t) {
                L.isWebSocketsBlocked = !0, e()
            }
        }, L.load = function (e) {
            V(e = e || function () {
                })
        }, L.MediaDevices = void 0 !== _ ? _ : [], L.hasMicrophone = E, L.hasSpeakers = x, L.hasWebcam = M, L.isWebsiteHasWebcamPermissions = O, L.isWebsiteHasMicrophonePermissions = P, L.audioInputDevices = k, L.audioOutputDevices = T, L.videoInputDevices = R;
        var z = !1;
        "undefined" != typeof document && "function" == typeof document.createElement && "setSinkId" in document.createElement("video") && (z = !0), L.isSetSinkIdSupported = z;
        var G = !1;
        L.browser.isFirefox && "undefined" != typeof mozRTCPeerConnection ? "getSenders" in mozRTCPeerConnection.prototype && (G = !0) : L.browser.isChrome && "undefined" != typeof webkitRTCPeerConnection && "getSenders" in webkitRTCPeerConnection.prototype && (G = !0), L.isRTPSenderReplaceTracksSupported = G;
        var $ = !1;
        L.browser.isFirefox && L.browser.version > 38 && ($ = !0), L.isRemoteStreamProcessingSupported = $;
        var Y = !1;
        void 0 !== I && "applyConstraints" in I.prototype && (Y = !0), L.isApplyConstraintsSupported = Y;
        var J = !1;
        L.browser.isFirefox && L.browser.version >= 43 && (J = !0), L.isMultiMonitorScreenCapturingSupported = J, L.isPromisesSupported = !!("Promise" in window), L.version = "1.3.9", void 0 === L && (window.DetectRTC = {});
        var K = window.MediaStream;
        void 0 === K && "undefined" != typeof webkitMediaStream && (K = webkitMediaStream), L.MediaStream = void 0 !== K && "function" == typeof K && Object.keys(K.prototype), L.MediaStreamTrack = void 0 !== I && Object.keys(I.prototype);
        var X = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
        L.RTCPeerConnection = void 0 !== X && Object.keys(X.prototype), window.DetectRTC = L, "undefined" != typeof module && (module.exports = L), "function" == typeof define && define.amd && define("DetectRTC", [], function () {
            return L
        })
    }(), "undefined" != typeof cordova && (DetectRTC.isMobileDevice = !0, DetectRTC.browser.name = "Chrome"), navigator && navigator.userAgent && -1 !== navigator.userAgent.indexOf("Crosswalk") && (DetectRTC.isMobileDevice = !0, DetectRTC.browser.name = "Chrome"), window.addEventListener || (window.addEventListener = function (e, t, n) {
        e.attachEvent && e.attachEvent("on" + t, n)
    }), window.attachEventListener = function (e, t, n, o) {
        e.addEventListener(t, n, o)
    };
    var g = window.MediaStream;

    function f(e, t) {
        return (!e.session.audio || "two-way" !== e.session.audio) && ("Firefox" === DetectRTC.browser.name && !1 !== t || !("Chrome" !== DetectRTC.browser.name || DetectRTC.browser.version < 50) && (!0 === typeof t || !(void 0 !== t || !e.session.audio || !e.session.screen || e.session.video) && (t = !0, !0)))
    }

    function v(e, t) {
        return e && e.getTracks ? e.getTracks().filter(function (e) {
            return e.kind === (t || "audio")
        }) : []
    }

    function p() {
        var e = !1;
        try {
            if ("undefined" == typeof RTCRtpTransceiver)return !1;
            if (!("currentDirection" in RTCRtpTransceiver.prototype))return !1;
            var t = new S;
            try {
                t.addTransceiver("audio"), e = !0
            } catch (e) {
            }
            t.close()
        } catch (t) {
            e = !1
        }
        return e && function () {
                var e = !1;
                try {
                    var t = new S({sdpSemantics: "unified-plan"});
                    try {
                        var n = t.getConfiguration();
                        e = "unified-plan" == n.sdpSemantics || (n.sdpSemantics, !1)
                    } catch (t) {
                        e = !1
                    }
                } catch (t) {
                    e = !1
                }
                return e
            }()
    }

    function h() {
        if ("undefined" != typeof cordova && void 0 !== cordova.plugins && void 0 !== cordova.plugins.iosrtc) {
            var e = cordova.plugins.iosrtc;
            window.webkitRTCPeerConnection = e.RTCPeerConnection, window.RTCSessionDescription = e.RTCSessionDescription, window.RTCIceCandidate = e.RTCIceCandidate, window.MediaStream = e.MediaStream, window.MediaStreamTrack = e.MediaStreamTrack, navigator.getUserMedia = navigator.webkitGetUserMedia = e.getUserMedia, e.debug.enable("iosrtc*"), "function" == typeof e.selectAudioOutput && e.selectAudioOutput(window.iOSDefaultAudioOutputDevice || "speaker"), e.registerGlobals()
        }
    }

    void 0 === g && "undefined" != typeof webkitMediaStream && (g = webkitMediaStream), void 0 !== g && ("stop" in g.prototype || (g.prototype.stop = function () {
        this.getTracks().forEach(function (e) {
            e.stop()
        })
    })), window.iOSDefaultAudioOutputDevice = window.iOSDefaultAudioOutputDevice || "speaker", document.addEventListener("deviceready", h, !1), h();
    var S, C = {};

    function w(e) {
        return {OfferToReceiveAudio: !!e.OfferToReceiveAudio, OfferToReceiveVideo: !!e.OfferToReceiveVideo}
    }

    void 0 !== window.RTCPeerConnection ? S = window.RTCPeerConnection : "undefined" != typeof mozRTCPeerConnection ? S = mozRTCPeerConnection : "undefined" != typeof webkitRTCPeerConnection && (S = webkitRTCPeerConnection);
    var y = window.RTCSessionDescription || window.mozRTCSessionDescription, b = window.RTCIceCandidate || window.mozRTCIceCandidate, I = window.MediaStreamTrack;

    function _(e) {
        if (void 0 !== window.RTCPeerConnection ? S = window.RTCPeerConnection : "undefined" != typeof mozRTCPeerConnection ? S = mozRTCPeerConnection : "undefined" != typeof webkitRTCPeerConnection && (S = webkitRTCPeerConnection), y = window.RTCSessionDescription || window.mozRTCSessionDescription, b = window.RTCIceCandidate || window.mozRTCIceCandidate, I = window.MediaStreamTrack, !S)throw"WebRTC 1.0 (RTCPeerConnection) API are NOT available in this browser.";
        var t = e.rtcMultiConnection;
        this.extra = e.remoteSdp ? e.remoteSdp.extra : t.extra, this.userid = e.userid, this.streams = [], this.channels = e.channels || [], this.connectionDescription = e.connectionDescription, this.addStream = function (e) {
            t.addStream(e, n.userid)
        }, this.removeStream = function (e) {
            t.removeStream(e, n.userid)
        };
        var n = this;
        e.remoteSdp && (this.connectionDescription = e.remoteSdp.connectionDescription);
        var o, i = {};
        C.sdpConstraints = w({OfferToReceiveAudio: !0, OfferToReceiveVideo: !0});
        var r = !!e.renegotiatingPeer;
        e.remoteSdp && (r = !!e.remoteSdp.renegotiatingPeer);
        var a = [];
        if (t.attachStreams.forEach(function (e) {
                e && a.push(e)
            }), r)o = e.peerRef; else {
            var s = "all";
            (t.candidates.turn || t.candidates.relay) && (t.candidates.stun || t.candidates.reflexive || t.candidates.host || (s = "relay"));
            try {
                var d = {iceServers: t.iceServers, iceTransportPolicy: t.iceTransportPolicy || s};
                void 0 !== t.iceCandidatePoolSize && (d.iceCandidatePoolSize = t.iceCandidatePoolSize), void 0 !== t.bundlePolicy && (d.bundlePolicy = t.bundlePolicy), void 0 !== t.rtcpMuxPolicy && (d.rtcpMuxPolicy = t.rtcpMuxPolicy), t.sdpSemantics && (d.sdpSemantics = t.sdpSemantics || "unified-plan"), t.iceServers && t.iceServers.length || (d = null, t.optionalArgument = null), o = new S(d, t.optionalArgument)
            } catch (e) {
                try {
                    d = {iceServers: t.iceServers};
                    o = new S(d)
                } catch (e) {
                    o = new S
                }
            }
        }
        !o.getRemoteStreams && o.getReceivers && (o.getRemoteStreams = function () {
            var e = new g;
            return o.getReceivers().forEach(function (t) {
                e.addTrack(t.track)
            }), [e]
        }), !o.getLocalStreams && o.getSenders && (o.getLocalStreams = function () {
            var e = new g;
            return o.getSenders().forEach(function (t) {
                e.addTrack(t.track)
            }), [e]
        }), o.onicecandidate = function (i) {
            if (i.candidate)t.trickleIce && e.onLocalCandidate({
                candidate: i.candidate.candidate,
                sdpMid: i.candidate.sdpMid,
                sdpMLineIndex: i.candidate.sdpMLineIndex
            }); else if (!t.trickleIce) {
                var r = o.localDescription;
                e.onLocalSdp({
                    type: r.type,
                    sdp: r.sdp,
                    remotePeerSdpConstraints: e.remotePeerSdpConstraints || !1,
                    renegotiatingPeer: !!e.renegotiatingPeer || !1,
                    connectionDescription: n.connectionDescription,
                    dontGetRemoteStream: !!e.dontGetRemoteStream,
                    extra: t ? t.extra : {},
                    streamsToShare: p
                })
            }
        }, a.forEach(function (i) {
            e.remoteSdp && e.remoteSdp.remotePeerSdpConstraints && e.remoteSdp.remotePeerSdpConstraints.dontGetRemoteStream || e.dontAttachLocalStream || (i = t.beforeAddingStream(i, n)) && (o.getLocalStreams().forEach(function (e) {
                i && e.id == i.id && (i = null)
            }), i && i.getTracks && i.getTracks().forEach(function (e) {
                try {
                    o.addTrack(e, i)
                } catch (e) {
                }
            }))
        }), o.oniceconnectionstatechange = o.onsignalingstatechange = function () {
            var i = n.extra;
            t.peers[n.userid] && (i = t.peers[n.userid].extra || i), o && (e.onPeerStateChanged({
                iceConnectionState: o.iceConnectionState,
                iceGatheringState: o.iceGatheringState,
                signalingState: o.signalingState,
                extra: i,
                userid: n.userid
            }), o && o.iceConnectionState && -1 !== o.iceConnectionState.search(/closed|failed/gi) && n.streams instanceof Array && n.streams.forEach(function (e) {
                var n = t.streamEvents[e.id] || {streamid: e.id, stream: e, type: "remote"};
                t.onstreamended(n)
            }))
        };
        var c = {OfferToReceiveAudio: !!a.length, OfferToReceiveVideo: !!a.length};
        e.localPeerSdpConstraints && (c = e.localPeerSdpConstraints), C.sdpConstraints = w(c);
        var l = {};
        o.ontrack = function (t) {
            if (t && "track" === t.type)if (t.stream = t.streams[t.streams.length - 1], t.stream.id || (t.stream.id = t.track.id), l[t.stream.id] && "Safari" !== DetectRTC.browser.name)t.track && (t.track.onended = function () {
                o && o.onremovestream(t)
            }); else {
                l[t.stream.id] = t.stream.id;
                var n = {};
                e.remoteSdp && e.remoteSdp.streamsToShare ? n = e.remoteSdp.streamsToShare : e.streamsToShare && (n = e.streamsToShare);
                var r = n[t.stream.id];
                r ? (t.stream.isAudio = r.isAudio, t.stream.isVideo = r.isVideo, t.stream.isScreen = r.isScreen) : (t.stream.isVideo = !!v(t.stream, "video").length, t.stream.isAudio = !t.stream.isVideo, t.stream.isScreen = !1), t.stream.streamid = t.stream.id, i[t.stream.id] = t.stream, e.onRemoteStream(t.stream), t.stream.getTracks().forEach(function (e) {
                    e.onended = function () {
                        o && o.onremovestream(t)
                    }
                }), t.stream.onremovetrack = function () {
                    o && o.onremovestream(t)
                }
            }
        }, o.onremovestream = function (t) {
            t.stream.streamid = t.stream.id, i[t.stream.id] && delete i[t.stream.id], e.onRemoteStreamRemoved(t.stream)
        }, "function" != typeof o.removeStream && (o.removeStream = function (e) {
            e.getTracks().forEach(function (t) {
                o.removeTrack(t, e)
            })
        });
        var u = !0;
        this.addRemoteCandidate = function (e) {
            o.addIceCandidate(new b(e)), isEdge && u && (u = !1, setTimeout(function () {
                o.addIceCandidate(null)
            }, 3e3))
        }, this.addRemoteSdp = function (e, n) {
            n = n || function () {
                }, "Safari" !== DetectRTC.browser.name && (e.sdp = t.processSdp(e.sdp)), o.setRemoteDescription(new y(e)).then(n, function (o) {
                t.enableLogs && console.error("setRemoteDescription failed", "\n", o, "\n", e.sdp), n()
            }).catch(function (o) {
                t.enableLogs && console.error("setRemoteDescription failed", "\n", o, "\n", e.sdp), n()
            })
        };
        var m = !0;

        function f(t) {
            t.binaryType = "arraybuffer", t.onmessage = function (t) {
                e.onDataChannelMessage(t.data)
            }, t.onopen = function () {
                e.onDataChannelOpened(t)
            }, t.onerror = function (t) {
                e.onDataChannelError(t)
            }, t.onclose = function (t) {
                e.onDataChannelClosed(t)
            }, t.internalSend = t.send, t.send = function (e) {
                "open" === t.readyState && t.internalSend(e)
            }, o.channel = t
        }

        e.remoteSdp && (m = !1), this.createDataChannel = function () {
            f(o.createDataChannel("sctp", {}))
        }, !0 !== t.session.data || r || (m ? this.createDataChannel() : o.ondatachannel = function (e) {
            f(e.channel)
        }), this.enableDisableVideoEncoding = function (e) {
            var t;
            if (o.getSenders().forEach(function (e) {
                    t || "video" !== e.track.kind || (t = e)
                }), t && t.getParameters) {
                var n = t.getParameters();
                n.encodings[1] && (n.encodings[1].active = !!e), n.encodings[2] && (n.encodings[2].active = !!e), t.setParameters(n)
            }
        }, e.remoteSdp && (e.remoteSdp.remotePeerSdpConstraints && (c = e.remoteSdp.remotePeerSdpConstraints), C.sdpConstraints = w(c), this.addRemoteSdp(e.remoteSdp, function () {
            h("createAnswer")
        })), "two-way" != t.session.audio && "two-way" != t.session.video && "two-way" != t.session.screen || (C.sdpConstraints = w({
            OfferToReceiveAudio: "two-way" == t.session.audio || e.remoteSdp && e.remoteSdp.remotePeerSdpConstraints && e.remoteSdp.remotePeerSdpConstraints.OfferToReceiveAudio,
            OfferToReceiveVideo: "two-way" == t.session.video || "two-way" == t.session.screen || e.remoteSdp && e.remoteSdp.remotePeerSdpConstraints && e.remoteSdp.remotePeerSdpConstraints.OfferToReceiveAudio
        }));
        var p = {};

        function h(i) {
            o[i](C.sdpConstraints).then(function (i) {
                "Safari" !== DetectRTC.browser.name && (i.sdp = t.processSdp(i.sdp)), o.setLocalDescription(i).then(function () {
                    t.trickleIce && (e.onLocalSdp({
                        type: i.type,
                        sdp: i.sdp,
                        remotePeerSdpConstraints: e.remotePeerSdpConstraints || !1,
                        renegotiatingPeer: !!e.renegotiatingPeer || !1,
                        connectionDescription: n.connectionDescription,
                        dontGetRemoteStream: !!e.dontGetRemoteStream,
                        extra: t ? t.extra : {},
                        streamsToShare: p
                    }), t.onSettingLocalDescription(n))
                }, function (e) {
                    t.enableLogs && console.error("setLocalDescription error", e)
                })
            }, function (e) {
                t.enableLogs && console.error("sdp-error", e)
            })
        }

        o.getLocalStreams().forEach(function (e) {
            p[e.streamid] = {isAudio: !!e.isAudio, isVideo: !!e.isVideo, isScreen: !!e.isScreen}
        }), m && h("createOffer"), o.nativeClose = o.close, o.close = function () {
            if (o) {
                try {
                    o.nativeClose !== o.close && o.nativeClose()
                } catch (e) {
                }
                o = null, n.peer = null
            }
        }, this.peer = o
    }

    var k = function () {
        function e(e, o) {
            var i = n(e);
            return i.videoCodecNumbers ? "vp8" === o && i.vp8LineNumber === i.videoCodecNumbers[0] ? e : "vp9" === o && i.vp9LineNumber === i.videoCodecNumbers[0] ? e : "h264" === o && i.h264LineNumber === i.videoCodecNumbers[0] ? e : e = t(e, o, i) : e
        }

        function t(e, t, n, o) {
            var i = "";
            if ("vp8" === t) {
                if (!n.vp8LineNumber)return e;
                i = n.vp8LineNumber
            }
            if ("vp9" === t) {
                if (!n.vp9LineNumber)return e;
                i = n.vp9LineNumber
            }
            if ("h264" === t) {
                if (!n.h264LineNumber)return e;
                i = n.h264LineNumber
            }
            var r = n.videoCodecNumbersOriginal.split("SAVPF")[0] + "SAVPF ", a = [i];
            return o && (a = []), n.videoCodecNumbers.forEach(function (e) {
                e !== i && a.push(e)
            }), r += a.join(" "), e = e.replace(n.videoCodecNumbersOriginal, r)
        }

        function n(e) {
            var t = {};
            return e.split("\n").forEach(function (e) {
                0 === e.indexOf("m=video") && (t.videoCodecNumbers = [], e.split("SAVPF")[1].split(" ").forEach(function (n) {
                    (n = n.trim()) && n.length && (t.videoCodecNumbers.push(n), t.videoCodecNumbersOriginal = e)
                })), -1 === e.indexOf("VP8/90000") || t.vp8LineNumber || (t.vp8LineNumber = e.replace("a=rtpmap:", "").split(" ")[0]), -1 === e.indexOf("VP9/90000") || t.vp9LineNumber || (t.vp9LineNumber = e.replace("a=rtpmap:", "").split(" ")[0]), -1 === e.indexOf("H264/90000") || t.h264LineNumber || (t.h264LineNumber = e.replace("a=rtpmap:", "").split(" ")[0])
            }), t
        }

        function o(e, t, n) {
            return function (e, t, n, o, i) {
                for (var r = -1 !== n ? n : e.length, a = t; a < r; ++a)if (0 === e[a].indexOf(o) && (!i || -1 !== e[a].toLowerCase().indexOf(i.toLowerCase())))return a;
                return null
            }(e, 0, -1, t, n)
        }

        function i(e) {
            var t = new RegExp("a=rtpmap:(\\d+) \\w+\\/\\d+"), n = e.match(t);
            return n && 2 === n.length ? n[1] : null
        }

        return {
            removeVPX: function (e) {
                var o = n(e);
                return e = t(e, "vp9", o, !0), e = t(e, "vp8", o, !0)
            }, disableNACK: function (e) {
                if (!e || "string" != typeof e)throw"Invalid arguments.";
                return e = (e = (e = (e = e.replace("a=rtcp-fb:126 nack\r\n", "")).replace("a=rtcp-fb:126 nack pli\r\n", "a=rtcp-fb:126 pli\r\n")).replace("a=rtcp-fb:97 nack\r\n", "")).replace("a=rtcp-fb:97 nack pli\r\n", "a=rtcp-fb:97 pli\r\n")
            }, prioritize: function (e, t) {
                if (t && t.getSenders && t.getSenders().length) {
                    if (!e || "string" != typeof e)throw"Invalid arguments.";
                    t.getSenders().forEach(function (t) {
                        for (var n = t.getParameters(), o = 0; o < n.codecs.length; o++)if (n.codecs[o].mimeType == e) {
                            n.codecs.unshift(n.codecs.splice(o, 1));
                            break
                        }
                        t.setParameters(n)
                    })
                }
            }, removeNonG722: function (e) {
                return e.replace(/m=audio ([0-9]+) RTP\/SAVPF ([0-9 ]*)/g, "m=audio $1 RTP/SAVPF 9")
            }, setApplicationSpecificBandwidth: function (e, t, n) {
                return function (e, t, n) {
                    return t ? void 0 !== isFirefox && isFirefox ? e : (n && (t.screen ? t.screen < 300 && console.warn("It seems that you are using wrong bandwidth value for screen. Screen sharing is expected to fail.") : console.warn("It seems that you are not using bandwidth for screen. Screen sharing is expected to fail.")), t.screen && n && (e = (e = e.replace(/b=AS([^\r\n]+\r\n)/g, "")).replace(/a=mid:video\r\n/g, "a=mid:video\r\nb=AS:" + t.screen + "\r\n")), (t.audio || t.video) && (e = e.replace(/b=AS([^\r\n]+\r\n)/g, "")), t.audio && (e = e.replace(/a=mid:audio\r\n/g, "a=mid:audio\r\nb=AS:" + t.audio + "\r\n")), t.screen ? e = e.replace(/a=mid:video\r\n/g, "a=mid:video\r\nb=AS:" + t.screen + "\r\n") : t.video && (e = e.replace(/a=mid:video\r\n/g, "a=mid:video\r\nb=AS:" + t.video + "\r\n")), e) : e
                }(e, t, n)
            }, setVideoBitrates: function (e, t) {
                return function (e, t) {
                    var n, r = (t = t || {}).min, a = t.max, s = e.split("\r\n"), d = o(s, "a=rtpmap", "VP8/90000");
                    if (d && (n = i(s[d])), !n)return e;
                    var c, l = o(s, "a=rtpmap", "rtx/90000");
                    if (l && (c = i(s[l])), !l)return e;
                    var u = o(s, "a=fmtp:" + c.toString());
                    if (null !== u) {
                        var m = "\r\n";
                        m += "a=fmtp:" + n + " x-google-min-bitrate=" + (r || "228") + "; x-google-max-bitrate=" + (a || "228"), s[u] = s[u].concat(m), e = s.join("\r\n")
                    }
                    return e
                }(e, t)
            }, setOpusAttributes: function (e, t) {
                return function (e, t) {
                    t = t || {};
                    var n, r = e.split("\r\n"), a = o(r, "a=rtpmap", "opus/48000");
                    if (a && (n = i(r[a])), !n)return e;
                    var s = o(r, "a=fmtp:" + n.toString());
                    if (null === s)return e;
                    var d = "";
                    return d += "; stereo=" + (void 0 !== t.stereo ? t.stereo : "1"), d += "; sprop-stereo=" + (void 0 !== t["sprop-stereo"] ? t["sprop-stereo"] : "1"), void 0 !== t.maxaveragebitrate && (d += "; maxaveragebitrate=" + (t.maxaveragebitrate || 1048576)), void 0 !== t.maxplaybackrate && (d += "; maxplaybackrate=" + (t.maxplaybackrate || 1048576)), void 0 !== t.cbr && (d += "; cbr=" + (void 0 !== t.cbr ? t.cbr : "1")), void 0 !== t.useinbandfec && (d += "; useinbandfec=" + t.useinbandfec), void 0 !== t.usedtx && (d += "; usedtx=" + t.usedtx), void 0 !== t.maxptime && (d += "\r\na=maxptime:" + t.maxptime), r[s] = r[s].concat(d), e = r.join("\r\n")
                }(e, t)
            }, preferVP9: function (t) {
                return e(t, "vp9")
            }, preferCodec: e, forceStereoAudio: function (e) {
                for (var t = e.split("\r\n"), n = null, o = 0; o < t.length; o++)if (-1 !== t[o].search("opus/48000")) {
                    var i = extractSdp(t[o], /:(\d+) opus\/48000/i);
                    break
                }
                for (o = 0; o < t.length; o++) {
                    if (-1 !== t[o].search("a=fmtp"))if (extractSdp(t[o], /a=fmtp:(\d+)/) === i) {
                        n = o;
                        break
                    }
                }
                return null === n ? e : (t[n] = t[n].concat("; stereo=1; sprop-stereo=1"), e = t.join("\r\n"))
            }
        }
    }();
    window.BandwidthHandler = k;
    var T = {
        processCandidates: function (e, t) {
            var n = t.candidate, o = e.candidates, i = o.stun, r = o.turn;
            if (m(o.reflexive) || (i = o.reflexive), m(o.relay) || (r = o.relay), (o.host || !n.match(/typ host/g)) && (r || !n.match(/typ relay/g)) && (i || !n.match(/typ srflx/g))) {
                var a = e.iceProtocols;
                if ((a.udp || !n.match(/ udp /g)) && (a.tcp || !n.match(/ tcp /g)))return e.enableLogs && console.debug("Your candidate pairs:", n), {
                    candidate: n,
                    sdpMid: t.sdpMid,
                    sdpMLineIndex: t.sdpMLineIndex
                }
            }
        }
    }, R = {
        getIceServers: function (e) {
            return svConfigs.iceServers.iceServers
        }
    };

    function A(e) {
        if (!0 !== currentUserMediaRequest.mutex) {
            currentUserMediaRequest.mutex = !0;
            var t = JSON.stringify(e.localMediaConstraints);
            if (currentUserMediaRequest.streams[t])r(currentUserMediaRequest.streams[t].stream, !0); else {
                if (!!/BB10|BlackBerry/i.test(navigator.userAgent || "") || void 0 === navigator.mediaDevices || "function" != typeof navigator.mediaDevices.getUserMedia)return navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia, void navigator.getUserMedia(e.localMediaConstraints, function (e) {
                    e.streamid = e.streamid || e.id || s(), e.idInstance = t, r(e)
                }, function (t) {
                    e.onLocalMediaError(t, e.localMediaConstraints)
                });
                if (void 0 === navigator.mediaDevices) {
                    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
                    var n, o, i = function () {
                    };
                    navigator.mediaDevices = {
                        getUserMedia: function (e) {
                            return navigator.getUserMedia(e, function (e) {
                                e(stream), n = stream
                            }, function (e) {
                                i(e), o = e
                            }), {
                                then: function (e) {
                                    if (!n)return e, {
                                        then: function (e) {
                                            o ? e(o) : i = e
                                        }
                                    };
                                    e(n)
                                }
                            }
                        }
                    }
                }
                if (!0 === e.localMediaConstraints.isScreen) {
                    if (navigator.mediaDevices.getDisplayMedia)navigator.mediaDevices.getDisplayMedia(e.localMediaConstraints).then(function (e) {
                        e.streamid = e.streamid || e.id || s(), e.idInstance = t, r(e)
                    }).catch(function (t) {
                        e.onLocalMediaError(t, e.localMediaConstraints)
                    }); else {
                        if (!navigator.getDisplayMedia)throw new Error("getDisplayMedia API is not availabe in this browser.");
                        navigator.getDisplayMedia(e.localMediaConstraints).then(function (e) {
                            e.streamid = e.streamid || e.id || s(), e.idInstance = t, r(e)
                        }).catch(function (t) {
                            e.onLocalMediaError(t, e.localMediaConstraints)
                        })
                    }
                    return
                }
                navigator.mediaDevices.getUserMedia(e.localMediaConstraints).then(function (e) {
                    e.streamid = e.streamid || e.id || s(), e.idInstance = t, r(e)
                }).catch(function (t) {
                    e.onLocalMediaError(t, e.localMediaConstraints)
                })
            }
        } else currentUserMediaRequest.queueRequests.push(e);
        function r(n, o) {
            !function (e, t) {
                e.mandatory && e.mandatory.chromeMediaSource ? t.isScreen = !0 : e.mozMediaSource || e.mediaSource ? t.isScreen = !0 : e.video ? t.isVideo = !0 : e.audio && (t.isAudio = !0)
            }(e.localMediaConstraints, n);
            var i = "ended";
            "oninactive" in n && (i = "inactive"), n.addEventListener(i, function () {
                delete currentUserMediaRequest.streams[t], currentUserMediaRequest.mutex = !1, currentUserMediaRequest.queueRequests.indexOf(e) && (delete currentUserMediaRequest.queueRequests[currentUserMediaRequest.queueRequests.indexOf(e)], currentUserMediaRequest.queueRequests = l(currentUserMediaRequest.queueRequests))
            }, !1), currentUserMediaRequest.streams[t] = {stream: n}, currentUserMediaRequest.mutex = !1, currentUserMediaRequest.queueRequests.length && A(currentUserMediaRequest.queueRequests.shift()), e.onGettingLocalMedia(n, o)
        }
    }

    window.currentUserMediaRequest = {
        streams: [], mutex: !1, queueRequests: [], remove: function (e) {
            this.mutex = !1;
            var t = this.streams[e];
            if (t) {
                var n = (t = t.stream).currentUserMediaRequestOptions;
                this.queueRequests.indexOf(n) && (delete this.queueRequests[this.queueRequests.indexOf(n)], this.queueRequests = l(this.queueRequests)), this.streams[e].stream = null, delete this.streams[e]
            }
        }
    };
    var E = function () {
        function e(e) {
            if (e)return "string" == typeof e || void 0 === e ? e : e.audio && e.video ? null : e.audio ? "audio" : e.video ? "video" : void 0
        }

        return {
            setHandlers: function (t, n, o) {
                if (t && t.addEventListener) {
                    if (void 0 === n || 1 == n) {
                        var i = "ended";
                        "oninactive" in t && (i = "inactive"), t.addEventListener(i, function () {
                            E.onSyncNeeded(this.streamid, i)
                        }, !1)
                    }
                    t.mute = function (i, a) {
                        i = e(i), void 0 !== a && (n = a), void 0 !== i && "audio" != i || v(t, "audio").forEach(function (e) {
                            e.enabled = !1, o.streamEvents[t.streamid].isAudioMuted = !0
                        }), void 0 !== i && "video" != i || v(t, "video").forEach(function (e) {
                            e.enabled = !1
                        }), void 0 !== n && 1 != n || E.onSyncNeeded(t.streamid, "mute", i), o.streamEvents[t.streamid].muteType = i || "both", r(t, "mute", i)
                    }, t.unmute = function (i, a) {
                        i = e(i), void 0 !== a && (n = a), function () {
                            if (!o.streamEvents[t.streamid].mediaElement)return;
                            var e = o.streamEvents[t.streamid].mediaElement;
                            e.volume = 0, function e(t, n, o, i) {
                                i = (i || 0) + 1;
                                if (i >= n)return;
                                setTimeout(function () {
                                    o(), e(t, n, o, i)
                                }, t)
                            }(200, 5, function () {
                                try {
                                    e.volume += .2
                                } catch (t) {
                                    e.volume = 1
                                }
                            })
                        }(), void 0 !== i && "audio" != i || v(t, "audio").forEach(function (e) {
                            e.enabled = !0, o.streamEvents[t.streamid].isAudioMuted = !1
                        }), void 0 !== i && "video" != i || (v(t, "video").forEach(function (e) {
                            e.enabled = !0
                        }), void 0 !== i && "video" == i && o.streamEvents[t.streamid].isAudioMuted && function e(n) {
                            n || (n = 0), ++n < 100 && o.streamEvents[t.streamid].isAudioMuted && (t.mute("audio"), setTimeout(function () {
                                e(n)
                            }, 50))
                        }()), void 0 !== n && 1 != n || E.onSyncNeeded(t.streamid, "unmute", i), o.streamEvents[t.streamid].unmuteType = i || "both", r(t, "unmute", i)
                    }
                }
            }, onSyncNeeded: function (e, t, n) {
            }
        }
    }();

    function x(e) {
        var t = {};
        return {
            receive: function (n, o, i) {
                var r = n.uuid;
                if (t[r] || (t[r] = []), t[r].push(n.message), n.last) {
                    var a = t[r].join("");
                    n.isobject && (a = JSON.parse(a));
                    var s = {data: a, userid: o, extra: i, latency: (new Date).getTime() - n.sendingTime};
                    e.autoTranslateText ? (s.original = s.data, e.Translator.TranslateText(s.data, function (t) {
                        s.data = t, e.onmessage(s)
                    })) : e.onmessage(s), delete t[r]
                }
            }
        }
    }

    var M = {
        send: function (e) {
            var t = e.connection, n = e.channel, o = e.remoteUserId, i = e.text, r = t.chunkSize || 1e3, a = "", d = !1;
            "string" != typeof i && (d = !0, i = JSON.stringify(i));
            var c = s(), l = (new Date).getTime();
            !function e(i, s) {
                var u = {type: "text", uuid: c, sendingTime: l};
                i && (s = i, u.packets = parseInt(s.length / r));
                s.length > r ? u.message = s.slice(0, r) : (u.message = s, u.last = !0, u.isobject = d);
                n.send(u, o);
                a = s.slice(u.message.length);
                a.length && setTimeout(function () {
                    e(null, a)
                }, t.chunkInterval || 100)
            }(i)
        }
    }, P = {
        handle: function (e) {
            var t = {};
            e.onFileStart = function (n) {
                var o = document.createElement("div");
                if (o.title = n.name, o.innerHTML = "<label>0%</label> <progress></progress>", n.remoteUserId && (o.innerHTML += " (Sharing with:" + n.remoteUserId + ")"), e.filesContainer || (e.filesContainer = document.body || document.documentElement), e.filesContainer.insertBefore(o, e.filesContainer.firstChild), !n.remoteUserId)return t[n.uuid] = {
                    div: o,
                    progress: o.querySelector("progress"),
                    label: o.querySelector("label")
                }, void(t[n.uuid].progress.max = n.maxChunks);
                t[n.uuid] || (t[n.uuid] = {}), t[n.uuid][n.remoteUserId] = {
                    div: o,
                    progress: o.querySelector("progress"),
                    label: o.querySelector("label")
                }, t[n.uuid][n.remoteUserId].progress.max = n.maxChunks
            }, e.onFileProgress = function (e) {
                var n = t[e.uuid];
                n && (e.remoteUserId && !(n = t[e.uuid][e.remoteUserId]) || (n.progress.value = e.currentPosition || e.maxChunks || n.progress.max, function (e, t) {
                    if (-1 !== e.position) {
                        var n = +e.position.toFixed(2).split(".")[1] || 100;
                        t.innerHTML = n + "%"
                    }
                }(n.progress, n.label)))
            }, e.onFileEnd = function (e) {
                var n = t[e.uuid];
                if (n) {
                    if (!e.remoteUserId || (n = t[e.uuid][e.remoteUserId])) {
                        var o = n.div;
                        -1 != e.type.indexOf("image") ? o.innerHTML = '<a href="' + e.url + '" download="' + e.name + '">Download <strong style="color:red;">' + e.name + '</strong> </a><br /><img src="' + e.url + '" title="' + e.name + '" style="max-width: 80%;">' : o.innerHTML = '<a href="' + e.url + '" download="' + e.name + '">Download <strong style="color:red;">' + e.name + '</strong> </a><br /><iframe src="' + e.url + '" title="' + e.name + '" style="width: 80%;border: 0;height: inherit;margin-top:1em;"></iframe>'
                    }
                } else console.error("No such progress-helper element exist.", e)
            }
        }
    }, O = {
        handle: function (e) {
            e.autoTranslateText = !1, e.language = "en", e.googKey = "AIzaSyCgB5hmFY74WYB-EoWkhr9cAGr6TiTHrEE", e.Translator = {
                TranslateText: function (t, n) {
                    var o = document.createElement("script");
                    o.type = "text/javascript";
                    var i = encodeURIComponent(t), r = "method" + e.token();
                    window[r] = function (e) {
                        e.data && e.data.translations[0] && n ? n(e.data.translations[0].translatedText) : e.error && "Daily Limit Exceeded" === e.error.message ? console.error('Text translation failed. Error message: "Daily Limit Exceeded."') : e.error ? console.error(e.error.message) : console.error(e)
                    };
                    var a = "https://www.googleapis.com/language/translate/v2?key=" + e.googKey + "&target=" + (e.language || "en-US") + "&callback=window." + r + "&q=" + i;
                    o.src = a, document.getElementsByTagName("head")[0].appendChild(o)
                }, getListOfLanguages: function (t) {
                    var n = new XMLHttpRequest;
                    n.onreadystatechange = function () {
                        if (n.readyState == XMLHttpRequest.DONE) {
                            var e = JSON.parse(n.responseText);
                            if (e && e.data && e.data.languages)return void t(e.data.languages);
                            if (e.error && "Daily Limit Exceeded" === e.error.message)return void console.error('Text translation failed. Error message: "Daily Limit Exceeded."');
                            if (e.error)return void console.error(e.error.message);
                            console.error(e)
                        }
                    };
                    var o = "https://www.googleapis.com/language/translate/v2/languages?key=" + e.googKey + "&target=en";
                    n.open("GET", o, !0), n.send(null)
                }
            }
        }
    };
    !function (n) {
        t = t || {useDefaultDevices: !0}, n.channel = n.sessionid = (e || location.href.replace(/\/|:|#|\?|\$|\^|%|\.|`|~|!|\+|@|\[|\||]|\|*. /g, "").split("\n").join("").split("\r").join("")) + "";
        var r = new i(n), l = {};

        function m(e) {
            if (n.socketAutoReConnect = !0, n.socket)e && e(n.socket); else {
                if (void 0 === o)if ("undefined" != typeof FirebaseConnection)window.SocketConnection = FirebaseConnection; else {
                    if ("undefined" == typeof PubNubConnection)throw"SocketConnection.js seems missed.";
                    window.SocketConnection = PubNubConnection
                }
                new o(n, function (t) {
                    e && e(n.socket)
                })
            }
        }

        function h(e, t) {
            n.socket.emit("join-room", {
                sessionid: n.sessionid,
                session: n.session,
                mediaConstraints: n.mediaConstraints,
                sdpConstraints: n.sdpConstraints,
                streams: w(),
                extra: n.extra,
                password: void 0 !== n.password && "object" != typeof n.password ? n.password : ""
            }, function (o, i) {
                if (!0 === o) {
                    if (n.enableLogs && console.log("isRoomJoined: ", o, " roomid: ", n.sessionid), n.peers[n.sessionid])return;
                    r.onNegotiationNeeded(e)
                }
                !1 === o && n.enableLogs && console.warn("isRoomJoined: ", i, " roomid: ", n.sessionid), t(o, n.sessionid, i)
            })
        }

        function C(e) {
            n.enableLogs && console.log("Sending open-room signal to socket.io"), n.waitingForLocalMedia = !1, n.socket.emit("open-room", {
                sessionid: n.sessionid,
                session: n.session,
                mediaConstraints: n.mediaConstraints,
                sdpConstraints: n.sdpConstraints,
                streams: w(),
                extra: n.extra,
                identifier: n.publicRoomIdentifier,
                password: void 0 !== n.password && "object" != typeof n.password ? n.password : ""
            }, function (t, o) {
                !0 === t && (n.enableLogs && console.log("isRoomOpened: ", t, " roomid: ", n.sessionid), e(t, n.sessionid)), !1 === t && (n.enableLogs && console.warn("isRoomOpened: ", o, " roomid: ", n.sessionid), e(t, n.sessionid, o))
            })
        }

        function w() {
            try {
                return n.streamEvents.selectAll("local").map(function (e) {
                    return {streamid: e.streamid, tracks: e.stream.getTracks().length}
                })
            } catch (e) {
                return []
            }
        }

        function y(e, t) {
            if (n.dontCaptureUserMedia || e.isDataOnly)t(); else {
                var o = {};
                e.localPeerSdpConstraints.OfferToReceiveAudio && (o.audio = n.mediaConstraints.audio), e.localPeerSdpConstraints.OfferToReceiveVideo && (o.video = n.mediaConstraints.video);
                var i = e.session || n.session;
                i.oneway && "two-way" !== i.audio && "two-way" !== i.video && "two-way" !== i.screen ? t() : (i.oneway && i.audio && "two-way" === i.audio && (i = {audio: !0}), (i.audio || i.video || i.screen) && (i.screen ? "Edge" === DetectRTC.browser.name ? navigator.getDisplayMedia({
                    video: !0,
                    audio: f(n)
                }).then(function (e) {
                    e.isScreen = !0, r.onGettingLocalMedia(e), !i.audio && !i.video || f(n) ? t(e) : n.invokeGetUserMedia(null, t)
                }, function (e) {
                    console.error("Unable to capture screen on Edge. HTTPs and version 17+ is required.")
                }) : n.invokeGetUserMedia({
                    audio: f(n),
                    video: !0,
                    isScreen: !0
                }, !i.audio && !i.video || f(n) ? t : n.invokeGetUserMedia(null, t)) : (i.audio || i.video) && n.invokeGetUserMedia(null, t, i)))
            }
        }

        function b(e, t) {
            e ? (t.audio && v(e, "audio").forEach(function (e) {
                e.applyConstraints(t.audio)
            }), t.video && v(e, "video").forEach(function (e) {
                e.applyConstraints(t.video)
            })) : n.enableLogs && console.error("No stream to applyConstraints.")
        }

        function _(e, t, o) {
            t ? r.replaceTrack(e, t, o) : n.peers.getAllParticipants().forEach(function (t) {
                r.replaceTrack(e, t, o)
            })
        }

        r.onGettingLocalMedia = function (e, t) {
            if (t = t || function () {
                    }, l[e.streamid])t(); else {
                l[e.streamid] = !0;
                try {
                    e.type = "local"
                } catch (e) {
                }
                n.setStreamEndHandler(e), d(e, function (o) {
                    o.id = e.streamid, o.muted = !0, o.volume = 0, -1 === n.attachStreams.indexOf(e) && n.attachStreams.push(e), void 0 !== E && E.setHandlers(e, !0, n), n.streamEvents[e.streamid] = {
                        stream: e,
                        type: "local",
                        mediaElement: o,
                        userid: n.userid,
                        extra: n.extra,
                        streamid: e.streamid,
                        isAudioMuted: !0
                    };
                    try {
                        !function (e, t) {
                            if (t.stream && v(t.stream, "audio").length) {
                                if (!e || !t)throw"Both arguments are required.";
                                if (e.onspeaking && e.onsilence) {
                                    if (void 0 === hark)throw"hark.js not found.";
                                    hark(t.stream, {
                                        onspeaking: function () {
                                            e.onspeaking(t)
                                        }, onsilence: function () {
                                            e.onsilence(t)
                                        }, onvolumechange: function (n, o) {
                                            e.onvolumechange && e.onvolumechange(merge({volume: n, threshold: o}, t))
                                        }
                                    })
                                }
                            }
                        }(n, n.streamEvents[e.streamid]), a(n, n.streamEvents[e.streamid]), n.onstream(n.streamEvents[e.streamid])
                    } catch (e) {
                    }
                    t()
                }, n)
            }
        }, r.onGettingRemoteMedia = function (e, t) {
            try {
                e.type = "remote"
            } catch (e) {
            }
            n.setStreamEndHandler(e, "remote-stream"), d(e, function (o) {
                o.id = e.streamid, void 0 !== E && E.setHandlers(e, !1, n), n.streamEvents[e.streamid] = {
                    stream: e,
                    type: "remote",
                    userid: t,
                    extra: n.peers[t] ? n.peers[t].extra : {},
                    mediaElement: o,
                    streamid: e.streamid
                }, a(n, n.streamEvents[e.streamid]), n.onstream(n.streamEvents[e.streamid])
            }, n)
        }, r.onRemovingRemoteMedia = function (e, t) {
            var o = n.streamEvents[e.streamid];
            o || (o = {
                stream: e,
                type: "remote",
                userid: t,
                extra: n.peers[t] ? n.peers[t].extra : {},
                streamid: e.streamid,
                mediaElement: n.streamEvents[e.streamid] ? n.streamEvents[e.streamid].mediaElement : null
            }), n.peersBackup[o.userid] && (o.extra = n.peersBackup[o.userid].extra), n.onstreamended(o), delete n.streamEvents[e.streamid]
        }, r.onNegotiationNeeded = function (e, t, o) {
            o = o || function () {
                };
            var i = {remoteUserId: t = t || e.remoteUserId, message: e = e || "", sender: n.userid};
            e.remoteUserId && e.message && e.sender && (i = e), m(function () {
                n.socket.emit(n.socketMessageEvent, i, o)
            })
        }, r.onUserLeft = function (e) {
            n.deletePeer(e)
        }, r.disconnectWith = function (e, t) {
            n.socket && n.socket.emit("disconnect-with", e, t || function () {
                }), n.deletePeer(e)
        }, n.socketOptions = {transport: "polling"}, n.openOrJoin = function (e, t) {
            t = t || function () {
                }, n.checkPresence(e, function (e, o) {
                if (e) {
                    n.sessionid = o;
                    var i, r, a = !!n.session.oneway, s = u(n.session);
                    r = {
                        OfferToReceiveAudio: n.sdpConstraints.mandatory.OfferToReceiveAudio,
                        OfferToReceiveVideo: n.sdpConstraints.mandatory.OfferToReceiveVideo
                    }, i = {
                        OfferToReceiveAudio: a ? !!n.session.audio : n.sdpConstraints.mandatory.OfferToReceiveAudio,
                        OfferToReceiveVideo: a ? !!n.session.video || !!n.session.screen : n.sdpConstraints.mandatory.OfferToReceiveVideo
                    };
                    var d = {
                        remoteUserId: n.sessionid,
                        message: {
                            newParticipationRequest: !0,
                            isOneWay: a,
                            isDataOnly: s,
                            localPeerSdpConstraints: i,
                            remotePeerSdpConstraints: r
                        },
                        sender: n.userid
                    };
                    y(d.message, function () {
                        h(d, t)
                    })
                } else n.waitingForLocalMedia = !0, n.isInitiator = !0, n.sessionid = o || n.sessionid, u(n.session) ? C(t) : n.captureUserMedia(function () {
                    C(t)
                })
            })
        }, n.waitingForLocalMedia = !1, n.open = function (e, t) {
            t = t || function () {
                }, n.waitingForLocalMedia = !0, n.isInitiator = !0, n.sessionid = e || n.sessionid, m(function () {
                u(n.session) ? C(t) : n.captureUserMedia(function () {
                    C(t)
                })
            })
        }, n.peersBackup = {}, n.deletePeer = function (e) {
            if (e && n.peers[e]) {
                var t = {userid: e, extra: n.peers[e] ? n.peers[e].extra : {}};
                if (n.peersBackup[t.userid] && (t.extra = n.peersBackup[t.userid].extra), n.onleave(t), n.peers[e]) {
                    n.peers[e].streams.forEach(function (e) {
                        e.stop()
                    });
                    var o = n.peers[e].peer;
                    if (o && "closed" !== o.iceConnectionState)try {
                        o.close()
                    } catch (e) {
                    }
                    n.peers[e] && (n.peers[e].peer = null, delete n.peers[e])
                }
            }
        }, n.rejoin = function (e) {
            if (!n.isInitiator && e && Object.keys(e).length) {
                var t = {};
                n.peers[e.remoteUserId] && (t = n.peers[e.remoteUserId].extra, n.deletePeer(e.remoteUserId)), e && e.remoteUserId && (n.join(e.remoteUserId), n.onReConnecting({
                    userid: e.remoteUserId,
                    extra: t
                }))
            }
        }, n.join = function (e, t) {
            n.sessionid = !!e && (e.sessionid || e.remoteUserId || e) || n.sessionid, n.sessionid += "";
            var o = !1, i = !1, r = !1, a = !1;
            if (e && e.session || !e || "string" == typeof e) {
                var s = e && e.session || n.session;
                r = !!s.oneway, a = u(s), i = {
                    OfferToReceiveAudio: n.sdpConstraints.mandatory.OfferToReceiveAudio,
                    OfferToReceiveVideo: n.sdpConstraints.mandatory.OfferToReceiveVideo
                }, o = {
                    OfferToReceiveAudio: r ? !!n.session.audio : n.sdpConstraints.mandatory.OfferToReceiveAudio,
                    OfferToReceiveVideo: r ? !!n.session.video || !!n.session.screen : n.sdpConstraints.mandatory.OfferToReceiveVideo
                }
            }
            var d = function () {
            };
            "function" == typeof(t = t || {}) && (d = t, t = {}), void 0 !== t.localPeerSdpConstraints && (o = t.localPeerSdpConstraints), void 0 !== t.remotePeerSdpConstraints && (i = t.remotePeerSdpConstraints), void 0 !== t.isOneWay && (r = t.isOneWay), void 0 !== t.isDataOnly && (a = t.isDataOnly);
            var c = {
                remoteUserId: n.sessionid,
                message: {
                    newParticipationRequest: !0,
                    isOneWay: r,
                    isDataOnly: a,
                    localPeerSdpConstraints: o,
                    remotePeerSdpConstraints: i
                },
                sender: n.userid
            };
            return y(c.message, function () {
                m(function () {
                    h(c, d)
                })
            }), c
        }, n.publicRoomIdentifier = "", n.getUserMedia = n.captureUserMedia = function (e, t) {
            e = e || function () {
                };
            var o = t || n.session;
            n.dontCaptureUserMedia || u(o) ? e() : (o.audio || o.video || o.screen) && (o.screen ? "Edge" === DetectRTC.browser.name ? navigator.getDisplayMedia({
                video: !0,
                audio: f(n)
            }).then(function (i) {
                if (i.isScreen = !0, r.onGettingLocalMedia(i), !o.audio && !o.video || f(n))e(i); else {
                    var a = {};
                    for (var s in o)"screen" !== s && (a[s] = o[s]);
                    n.invokeGetUserMedia(t, e, a)
                }
            }, function (e) {
                console.error("Unable to capture screen on Edge. HTTPs and version 17+ is required.")
            }) : n.invokeGetUserMedia({audio: f(n), video: !0, isScreen: !0}, function (i) {
                if (!o.audio && !o.video || f(n))e(i); else {
                    var r = {};
                    for (var a in o)"screen" !== a && (r[a] = o[a]);
                    n.invokeGetUserMedia(t, e, r)
                }
            }) : (o.audio || o.video) && n.invokeGetUserMedia(t, e, o))
        }, n.onbeforeunload = function (e, t) {
            n.closeBeforeUnload && (n.peers.getAllParticipants().forEach(function (e) {
                r.onNegotiationNeeded({userLeft: !0}, e), n.peers[e] && n.peers[e].peer && n.peers[e].peer.close(), delete n.peers[e]
            }), t || n.closeSocket(), n.isInitiator = !1)
        }, window.ignoreBeforeUnload ? n.closeBeforeUnload = !1 : (n.closeBeforeUnload = !0, window.addEventListener("beforeunload", n.onbeforeunload, !1)), n.userid = s(), n.changeUserId = function (e, t) {
            t = t || function () {
                }, n.userid = e || s(), n.socket.emit("changed-uuid", n.userid, t)
        }, n.extra = {}, n.attachStreams = [], n.session = {
            audio: !0,
            video: !0
        }, n.enableFileSharing = !1, n.bandwidth = {screen: !1, audio: !1, video: !1}, n.codecs = {
            audio: "opus",
            video: "VP9"
        }, n.processSdp = function (e) {
            return p() ? e : "Safari" === DetectRTC.browser.name ? e : ("VP8" === n.codecs.video.toUpperCase() && (e = k.preferCodec(e, "vp8")), "VP9" === n.codecs.video.toUpperCase() && (e = k.preferCodec(e, "vp9")), "H264" === n.codecs.video.toUpperCase() && (e = k.preferCodec(e, "h264")), "G722" === n.codecs.audio && (e = k.removeNonG722(e)), "Firefox" === DetectRTC.browser.name ? e : ((n.bandwidth.video || n.bandwidth.screen) && (e = k.setApplicationSpecificBandwidth(e, n.bandwidth, !!n.session.screen)), n.bandwidth.video && (e = k.setVideoBitrates(e, {
                min: 8 * n.bandwidth.video * 1024,
                max: 8 * n.bandwidth.video * 1024
            })), n.bandwidth.audio && (e = k.setOpusAttributes(e, {
                maxaveragebitrate: 8 * n.bandwidth.audio * 1024,
                maxplaybackrate: 8 * n.bandwidth.audio * 1024,
                stereo: 1,
                maxptime: 3
            })), e))
        }, void 0 !== k && (n.BandwidthHandler = n.CodecsHandler = k), n.mediaConstraints = {
            audio: {
                mandatory: {},
                optional: n.bandwidth.audio ? [{bandwidth: 8 * n.bandwidth.audio * 1024 || 1048576}] : []
            },
            video: {
                mandatory: {},
                optional: n.bandwidth.video ? [{bandwidth: 8 * n.bandwidth.video * 1024 || 1048576}, {facingMode: "user"}] : [{facingMode: "user"}]
            }
        }, "Firefox" === DetectRTC.browser.name && (n.mediaConstraints = {
            audio: !0,
            video: !0
        }), t.useDefaultDevices || DetectRTC.isMobileDevice || DetectRTC.load(function () {
            var e, t;
            if (DetectRTC.MediaDevices.forEach(function (o) {
                    "audioinput" === o.kind && !1 !== n.mediaConstraints.audio && (e = o), "videoinput" === o.kind && !1 !== n.mediaConstraints.video && (t = o)
                }), e) {
                if ("Firefox" === DetectRTC.browser.name)return void(!0 !== n.mediaConstraints.audio ? n.mediaConstraints.audio.deviceId = e.id : n.mediaConstraints.audio = {deviceId: e.id});
                1 == n.mediaConstraints.audio && (n.mediaConstraints.audio = {
                    mandatory: {},
                    optional: []
                }), n.mediaConstraints.audio.optional || (n.mediaConstraints.audio.optional = []);
                var o = [{sourceId: e.id}];
                n.mediaConstraints.audio.optional = o.concat(n.mediaConstraints.audio.optional)
            }
            if (t) {
                if ("Firefox" === DetectRTC.browser.name)return void(!0 !== n.mediaConstraints.video ? n.mediaConstraints.video.deviceId = t.id : n.mediaConstraints.video = {deviceId: t.id});
                1 == n.mediaConstraints.video && (n.mediaConstraints.video = {
                    mandatory: {},
                    optional: []
                }), n.mediaConstraints.video.optional || (n.mediaConstraints.video.optional = []);
                o = [{sourceId: t.id}];
                n.mediaConstraints.video.optional = o.concat(n.mediaConstraints.video.optional)
            }
        }), n.sdpConstraints = {
            mandatory: {OfferToReceiveAudio: !0, OfferToReceiveVideo: !0},
            optional: [{VoiceActivityDetection: !1}]
        }, n.sdpSemantics = null, n.iceCandidatePoolSize = null, n.bundlePolicy = null, n.rtcpMuxPolicy = null, n.iceTransportPolicy = null, n.optionalArgument = {
            optional: [{DtlsSrtpKeyAgreement: !0}, {googImprovedWifiBwe: !0}, {googScreencastMinBitrate: 300}, {googIPv6: !0}, {googDscp: !0}, {googCpuUnderuseThreshold: 55}, {googCpuOveruseThreshold: 85}, {googSuspendBelowMinBitrate: !0}, {googCpuOveruseDetection: !0}],
            mandatory: {}
        }, n.iceServers = R.getIceServers(n), n.candidates = {host: !0, stun: !0, turn: !0}, n.iceProtocols = {
            tcp: !0,
            udp: !0
        }, n.onopen = function (e) {
            n.enableLogs && console.info("Data connection has been opened between you & ", e.userid)
        }, n.onclose = function (e) {
            n.enableLogs && console.warn("Data connection has been closed between you & ", e.userid)
        }, n.onerror = function (e) {
            n.enableLogs && console.error(e.userid, "data-error", e)
        }, n.onmessage = function (e) {
            n.enableLogs && console.debug("data-message", e.userid, e.data)
        }, n.send = function (e, t) {
            n.peers.send(e, t)
        }, n.close = n.disconnect = n.leave = function () {
            n.onbeforeunload(!1, !0)
        }, n.closeEntireSession = function (e) {
            e = e || function () {
                }, n.socket.emit("close-entire-session", function t() {
                n.getAllParticipants().length ? setTimeout(t, 100) : (n.onEntireSessionClosed({
                    sessionid: n.sessionid,
                    userid: n.userid,
                    extra: n.extra
                }), n.changeUserId(null, function () {
                    n.close(), e()
                }))
            })
        }, n.onEntireSessionClosed = function (e) {
            n.enableLogs && console.info("Entire session is closed: ", e.sessionid, e.extra)
        }, n.onstream = function (e) {
            var t = n.videosContainer;
            t.insertBefore(e.mediaElement, t.firstChild);
            var o = e.mediaElement.play();
            void 0 === o ? setTimeout(function () {
                e.mediaElement.play()
            }, 2e3) : o.catch(function () {
            }).then(function () {
                setTimeout(function () {
                    e.mediaElement.play()
                }, 2e3)
            })
        }, n.onstreamended = function (e) {
            e.mediaElement || (e.mediaElement = document.getElementById(e.streamid)), e.mediaElement && e.mediaElement.parentNode && e.mediaElement.parentNode.removeChild(e.mediaElement)
        }, n.direction = "many-to-many", n.removeStream = function (e, t) {
            var o;
            n.attachStreams.forEach(function (t) {
                t.id === e && (o = t)
            }), o ? (n.peers.getAllParticipants().forEach(function (e) {
                if (!t || e === t) {
                    var i = n.peers[e];
                    try {
                        i.peer.removeStream(o)
                    } catch (e) {
                    }
                }
            }), n.renegotiate()) : console.warn("No such stream exist.", e)
        }, n.addStream = function (e, t) {
            if (e.getTracks)return -1 === n.attachStreams.indexOf(e) && (e.streamid || (e.streamid = e.id), n.attachStreams.push(e)), void n.renegotiate(t);
            function o(o) {
                e.streamCallback && e.streamCallback(o), n.renegotiate(t)
            }

            u(e) ? n.renegotiate(t) : (e.audio || e.video || e.screen) && (e.screen ? "Edge" === DetectRTC.browser.name ? navigator.getDisplayMedia({
                video: !0,
                audio: f(n)
            }).then(function (t) {
                t.isScreen = !0, r.onGettingLocalMedia(t), !e.audio && !e.video || f(n) ? o(t) : n.invokeGetUserMedia(null, function (e) {
                    o(e)
                })
            }, function (e) {
                console.error("Unable to capture screen on Edge. HTTPs and version 17+ is required.")
            }) : n.invokeGetUserMedia({audio: f(n), video: !0, isScreen: !0}, function (t) {
                !e.audio && !e.video || f(n) ? o(t) : n.invokeGetUserMedia(null, function (e) {
                    o(e)
                })
            }) : (e.audio || e.video) && n.invokeGetUserMedia(null, o))
        }, n.invokeGetUserMedia = function (e, t, o) {
            o || (o = n.session), e || (e = n.mediaConstraints), A({
                onGettingLocalMedia: function (n) {
                    var o = e.video;
                    o && (o.mediaSource || o.mozMediaSource ? n.isScreen = !0 : o.mandatory && o.mandatory.chromeMediaSource && (n.isScreen = !0)), n.isScreen || (n.isVideo = !!v(n, "video").length, n.isAudio = !n.isVideo && v(n, "audio").length), r.onGettingLocalMedia(n, function () {
                        "function" == typeof t && t(n)
                    })
                }, onLocalMediaError: function (e, t) {
                    r.onLocalMediaError(e, t)
                }, localMediaConstraints: e || {audio: !!o.audio && e.audio, video: !!o.video && e.video}
            })
        }, n.applyConstraints = function (e, t) {
            if (I && I.prototype.applyConstraints) {
                var o;
                if (t)return n.streamEvents[t] && (o = n.streamEvents[t].stream), void b(o, e);
                n.attachStreams.forEach(function (t) {
                    b(t, e)
                })
            } else alert("track.applyConstraints is NOT supported in your browser.")
        }, n.replaceTrack = function (e, t, o) {
            if (e = e || {}, S.prototype.getSenders)if (e instanceof I)_(e, t, o); else {
                if (e instanceof g)return v(e, "video").length && _(v(e, "video")[0], t, !0), void(v(e, "audio").length && _(v(e, "audio")[0], t, !1));
                if (u(e))throw"connection.replaceTrack requires audio and/or video and/or screen.";
                (e.audio || e.video || e.screen) && (e.screen ? "Edge" === DetectRTC.browser.name ? navigator.getDisplayMedia({
                    video: !0,
                    audio: f(n)
                }).then(function (t) {
                    t.isScreen = !0, r.onGettingLocalMedia(t), !e.audio && !e.video || f(n) ? i(t) : n.invokeGetUserMedia(null, i)
                }, function (e) {
                    console.error("Unable to capture screen on Edge. HTTPs and version 17+ is required.")
                }) : n.invokeGetUserMedia({
                    audio: f(n),
                    video: !0,
                    isScreen: !0
                }, !e.audio && !e.video || f(n) ? i : n.invokeGetUserMedia(null, i)) : (e.audio || e.video) && n.invokeGetUserMedia(null, i))
            } else n.addStream(e);
            function i(i) {
                n.replaceTrack(i, t, o || e.video || e.screen)
            }
        }, n.resetTrack = function (e, t) {
            e || (e = n.getAllParticipants()), "string" == typeof e && (e = [e]), e.forEach(function (e) {
                var o = n.peers[e].peer;
                void 0 !== t && !0 !== t || !o.lastVideoTrack || n.replaceTrack(o.lastVideoTrack, e, !0), void 0 !== t && !1 !== t || !o.lastAudioTrack || n.replaceTrack(o.lastAudioTrack, e, !1)
            })
        }, n.renegotiate = function (e) {
            e ? r.renegotiatePeer(e) : n.peers.getAllParticipants().forEach(function (e) {
                r.renegotiatePeer(e)
            })
        }, n.setStreamEndHandler = function (e, t) {
            if (e && e.addEventListener && (t = !!t, !e.alreadySetEndHandler)) {
                e.alreadySetEndHandler = !0;
                var o = "ended";
                "oninactive" in e && (o = "inactive"), e.addEventListener(o, function () {
                    if (e.idInstance && currentUserMediaRequest.remove(e.idInstance), !t) {
                        var o = [];
                        n.attachStreams.forEach(function (t) {
                            t.id != e.id && o.push(t)
                        }), n.attachStreams = o
                    }
                    var i = n.streamEvents[e.streamid];
                    if (i || (i = {
                            stream: e,
                            streamid: e.streamid,
                            type: t ? "remote" : "local",
                            userid: n.userid,
                            extra: n.extra,
                            mediaElement: n.streamEvents[e.streamid] ? n.streamEvents[e.streamid].mediaElement : null
                        }), t && n.peers[i.userid]) {
                        var r = n.peers[i.userid].peer;
                        o = [];
                        r.getRemoteStreams().forEach(function (t) {
                            t.id != e.id && o.push(t)
                        }), n.peers[i.userid].streams = o
                    }
                    i.userid === n.userid && "remote" === i.type || (n.peersBackup[i.userid] && (i.extra = n.peersBackup[i.userid].extra), n.onstreamended(i), delete n.streamEvents[e.streamid])
                }, !1)
            }
        }, n.onMediaError = function (e, t) {
            n.enableLogs && console.error(e, t)
        }, n.autoCloseEntireSession = !1, n.filesContainer = n.videosContainer = document.body || document.documentElement, n.isInitiator = !1, n.shareFile = r.shareFile, void 0 !== P && P.handle(n), void 0 !== O && O.handle(n), n.token = s, n.onNewParticipant = function (e, t) {
            n.acceptParticipationRequest(e, t)
        }, n.acceptParticipationRequest = function (e, t) {
            t.successCallback && (t.successCallback(), delete t.successCallback), r.createNewPeer(e, t)
        }, void 0 !== E && (n.StreamsHandler = E), n.onleave = function (e) {
        }, n.invokeSelectFileDialog = function (e) {
            var t = new FileSelector;
            t.accept = "*.*", t.selectSingleFile(e)
        }, n.onmute = function (e) {
            if (e && e.mediaElement)if ("both" === e.muteType || "video" === e.muteType) {
                e.mediaElement.src = null;
                var t = e.mediaElement.pause();
                void 0 !== t ? t.then(function () {
                    e.mediaElement.poster = e.snapshot || "https://cdn.webrtc-experiment.com/images/muted.png"
                }) : e.mediaElement.poster = e.snapshot || "https://cdn.webrtc-experiment.com/images/muted.png"
            } else"audio" === e.muteType && (e.mediaElement.muted = !0)
        }, n.onunmute = function (e) {
            e && e.mediaElement && e.stream && ("both" === e.unmuteType || "video" === e.unmuteType ? (e.mediaElement.poster = null, e.mediaElement.srcObject = e.stream, e.mediaElement.play()) : "audio" === e.unmuteType && (e.mediaElement.muted = !1))
        }, n.onExtraDataUpdated = function (e) {
            e.status = "online", n.onUserStatusChanged(e, !0)
        }, n.getAllParticipants = function (e) {
            return n.peers.getAllParticipants(e)
        }, void 0 !== E && (E.onSyncNeeded = function (e, t, o) {
            n.peers.getAllParticipants().forEach(function (n) {
                r.onNegotiationNeeded({streamid: e, action: t, streamSyncNeeded: !0, type: o || "both"}, n)
            })
        }), n.connectSocket = function (e) {
            m(e)
        }, n.closeSocket = function () {
            try {
                io.sockets = {}
            } catch (e) {
            }
            n.socket && ("function" == typeof n.socket.disconnect && n.socket.disconnect(), "function" == typeof n.socket.resetProps && n.socket.resetProps(), n.socket = null)
        }, n.getSocket = function (e) {
            return !e && n.enableLogs && console.warn("getSocket.callback paramter is required."), e = e || function () {
                }, n.socket ? e(n.socket) : m(function () {
                e(n.socket)
            }), n.socket
        }, n.getRemoteStreams = r.getRemoteStreams;
        var T = ["selectFirst", "selectAll", "forEach"];
        if (n.streamEvents = {
                selectFirst: function (e) {
                    return n.streamEvents.selectAll(e)[0]
                }, selectAll: function (e) {
                    e || (e = {
                        local: !0,
                        remote: !0,
                        isScreen: !0,
                        isAudio: !0,
                        isVideo: !0
                    }), "local" == e && (e = {local: !0}), "remote" == e && (e = {remote: !0}), "screen" == e && (e = {isScreen: !0}), "audio" == e && (e = {isAudio: !0}), "video" == e && (e = {isVideo: !0});
                    var t = [];
                    return Object.keys(n.streamEvents).forEach(function (o) {
                        var i = n.streamEvents[o];
                        if (-1 === T.indexOf(o)) {
                            var r = !0;
                            e.local && "local" === i.type && (r = !1), e.remote && "remote" === i.type && (r = !1), e.isScreen && i.stream.isScreen && (r = !1), e.isVideo && i.stream.isVideo && (r = !1), e.isAudio && i.stream.isAudio && (r = !1), e.userid && i.userid === e.userid && (r = !1), !1 === r && t.push(i)
                        }
                    }), t
                }
            }, n.socketURL = "/", n.socketMessageEvent = "RTCMultiConnection-Message", n.socketCustomEvent = "RTCMultiConnection-Custom-Message", n.DetectRTC = DetectRTC, n.setCustomSocketEvent = function (e) {
                e && (n.socketCustomEvent = e), n.socket && n.socket.emit("set-custom-socket-event-listener", n.socketCustomEvent)
            }, n.getNumberOfBroadcastViewers = function (e, t) {
                n.socket && e && t && n.socket.emit("get-number-of-users-in-specific-broadcast", e, t)
            }, n.onNumberOfBroadcastViewersUpdated = function (e) {
                n.enableLogs && n.isInitiator && console.info("Number of broadcast (", e.broadcastId, ") viewers", e.numberOfBroadcastViewers)
            }, n.onUserStatusChanged = function (e, t) {
                n.enableLogs && !t && console.info(e.userid, e.status)
            }, n.getUserMediaHandler = A, n.multiPeersHandler = r, n.enableLogs = !0, n.setCustomSocketHandler = function (e) {
                void 0 !== o && (o = e)
            }, n.chunkSize = 4e4, n.maxParticipantsAllowed = 1e3, n.disconnectWith = r.disconnectWith, n.checkPresence = function (e, t) {
                e = e || n.sessionid, "SSEConnection" !== o.name ? n.socket ? n.socket.emit("check-presence", e + "", function (e, o, i) {
                    n.enableLogs && console.log("checkPresence.isRoomExist: ", e, " roomid: ", o), t(e, o, i)
                }) : n.connectSocket(function () {
                    n.checkPresence(e, t)
                }) : SSEConnection.checkPresence(e, function (e, o, i) {
                    if (!n.socket)return e || (n.userid = o), void n.connectSocket(function () {
                        t(e, o, i)
                    });
                    t(e, o)
                })
            }, n.onReadyForOffer = function (e, t) {
                n.multiPeersHandler.createNewPeer(e, t)
            }, n.setUserPreferences = function (e) {
                return n.dontAttachStream && (e.dontAttachLocalStream = !0), n.dontGetRemoteStream && (e.dontGetRemoteStream = !0), e
            }, n.updateExtraData = function () {
                n.socket.emit("extra-data-updated", n.extra)
            }, n.enableScalableBroadcast = !1, n.maxRelayLimitPerUser = 3, n.dontCaptureUserMedia = !1, n.dontAttachStream = !1, n.dontGetRemoteStream = !1, n.onReConnecting = function (e) {
                n.enableLogs && console.info("ReConnecting with", e.userid, "...")
            }, n.beforeAddingStream = function (e) {
                return e
            }, n.beforeRemovingStream = function (e) {
                return e
            }, "undefined" != typeof isChromeExtensionAvailable && (n.checkIfChromeExtensionAvailable = isChromeExtensionAvailable), "undefined" != typeof isFirefoxExtensionAvailable && (n.checkIfChromeExtensionAvailable = isFirefoxExtensionAvailable), "undefined" != typeof getChromeExtensionStatus && (n.getChromeExtensionStatus = getChromeExtensionStatus), n.modifyScreenConstraints = function (e) {
                return e
            }, n.onPeerStateChanged = function (e) {
                n.enableLogs && -1 !== e.iceConnectionState.search(/closed|failed/gi) && console.error("Peer connection is closed between you & ", e.userid, e.extra, "state:", e.iceConnectionState)
            }, n.isOnline = !0, c("online", function () {
                n.isOnline = !0
            }), c("offline", function () {
                n.isOnline = !1
            }), n.isLowBandwidth = !1, navigator && navigator.connection && navigator.connection.type && (n.isLowBandwidth = -1 !== navigator.connection.type.toString().toLowerCase().search(/wifi|cell/g), n.isLowBandwidth)) {
            if (n.bandwidth = {
                    audio: !1,
                    video: !1,
                    screen: !1
                }, n.mediaConstraints.audio && n.mediaConstraints.audio.optional && n.mediaConstraints.audio.optional.length) {
                var x = [];
                n.mediaConstraints.audio.optional.forEach(function (e) {
                    void 0 === e.bandwidth && x.push(e)
                }), n.mediaConstraints.audio.optional = x
            }
            if (n.mediaConstraints.video && n.mediaConstraints.video.optional && n.mediaConstraints.video.optional.length) {
                x = [];
                n.mediaConstraints.video.optional.forEach(function (e) {
                    void 0 === e.bandwidth && x.push(e)
                }), n.mediaConstraints.video.optional = x
            }
        }
        n.getExtraData = function (e, t) {
            if (!e)throw"remoteUserId is required.";
            if ("function" != typeof t)return n.peers[e] ? n.peers[e].extra : n.peersBackup[e] ? n.peersBackup[e].extra : {};
            n.socket.emit("get-remote-user-extra-data", e, function (e, n, o) {
                t(e, n, o)
            })
        }, t.autoOpenOrJoin && n.openOrJoin(n.sessionid), n.onUserIdAlreadyTaken = function (e, t) {
            n.close(), n.closeSocket(), n.isInitiator = !1, n.userid = n.token(), n.join(n.sessionid), n.enableLogs && console.warn("Userid already taken.", e, "Your new userid:", n.userid)
        }, n.trickleIce = !0, n.version = "3.6.9", n.onSettingLocalDescription = function (e) {
            n.enableLogs && console.info("Set local description for remote user", e.userid)
        }, n.resetScreen = function () {
            sourceId = null, DetectRTC && DetectRTC.screen && delete DetectRTC.screen.sourceId, currentUserMediaRequest = {
                streams: [],
                mutex: !1,
                queueRequests: []
            }
        }, n.autoCreateMediaElement = !0, n.password = null, n.setPassword = function (e, t) {
            t = t || function () {
                }, n.socket ? n.socket.emit("set-password", e, t) : (n.password = e, t(!0, n.sessionid, null))
        }, n.onSocketDisconnect = function (e) {
            n.enableLogs && console.warn("socket.io connection is closed")
        }, n.onSocketError = function (e) {
            n.enableLogs && console.warn("socket.io connection is failed")
        }, n.errors = {
            ROOM_NOT_AVAILABLE: "Room not available",
            INVALID_PASSWORD: "Invalid password",
            USERID_NOT_AVAILABLE: "User ID does not exist",
            ROOM_PERMISSION_DENIED: "Room permission denied",
            ROOM_FULL: "Room full",
            DID_NOT_JOIN_ANY_ROOM: "Did not join any room yet",
            INVALID_SOCKET: "Invalid socket",
            PUBLIC_IDENTIFIER_MISSING: "publicRoomIdentifier is required",
            INVALID_ADMIN_CREDENTIAL: "Invalid username or password attempted"
        }
    }(this)
};
"undefined" != typeof module && (module.exports = exports = RTCMultiConnection), "function" == typeof define && define.amd && define("RTCMultiConnection", [], function () {
    return RTCMultiConnection
}), function () {
    function e() {
        function e(e, t) {
            t = t || function (e) {
                    postMessage(e)
                };
            var n = e.file;
            n.uuid || (n.uuid = (100 * Math.random()).toString().replace(/\./g, ""));
            var o = e.chunkSize || 15e3;
            e.extra && e.extra.chunkSize && (o = e.extra.chunkSize);
            var i, r = 0, a = o, s = Math.floor(Math.min(1e8, a) / o) * o, d = Math.ceil(n.size / o);
            n.maxChunks = d;
            var c = 0, l = [];
            t({
                currentPosition: c,
                uuid: n.uuid,
                maxChunks: d,
                size: n.size,
                name: n.name,
                type: n.type,
                lastModifiedDate: (n.lastModifiedDate || new Date).toString(),
                start: !0
            });
            var u, m = new FileReader;
            m.onloadend = function (e) {
                e.target.readyState == FileReader.DONE && function (e, r, a) {
                    i = Math.ceil(r.byteLength / o);
                    for (var s = 0; s < i; s++) {
                        var u = s * o;
                        l[c] = r.slice(u, Math.min(u + o, r.byteLength)), t({
                            uuid: n.uuid,
                            buffer: l[c],
                            currentPosition: c,
                            maxChunks: d,
                            size: n.size,
                            name: n.name,
                            lastModifiedDate: (n.lastModifiedDate || new Date).toString(),
                            type: n.type
                        }), c++
                    }
                    c == d && !0;
                    a()
                }(n.name, e.target.result, function () {
                    (++r + 1) * s < n.size ? (u = n.slice(r * s, (r + 1) * s), m.readAsArrayBuffer(u)) : r * s < n.size ? (u = n.slice(r * s, n.size), m.readAsArrayBuffer(u)) : (n.url = URL.createObjectURL(n), t({
                        currentPosition: c,
                        uuid: n.uuid,
                        maxChunks: d,
                        size: n.size,
                        name: n.name,
                        lastModifiedDate: (n.lastModifiedDate || new Date).toString(),
                        url: URL.createObjectURL(n),
                        type: n.type,
                        end: !0
                    }))
                })
            }, c += 1, u = n.slice(r * s, (r + 1) * s), m.readAsArrayBuffer(u)
        }

        this.readAsArrayBuffer = function (t, n) {
            var o = n.earlyCallback;

            function i(e) {
                t.chunks[e.uuid] || (t.chunks[e.uuid] = {currentPosition: -1}), n.extra = n.extra || {userid: 0}, e.userid = n.userid || n.extra.userid || 0, e.extra = n.extra, t.chunks[e.uuid][e.currentPosition] = e, e.end && o && (o(e.uuid), o = null), e.maxChunks > 200 && 200 == e.currentPosition && o && (o(e.uuid), o = null)
            }

            delete n.earlyCallback, e(n, i)
        }
    }

    function t(e) {
        var t = this;
        t.chunks = {}, t.chunksWaiters = {}, t.receive = function n(o, i) {
            if (o.uuid) {
                if (o.start && !t.chunks[o.uuid] && (t.chunks[o.uuid] = {}, e.onBegin && e.onBegin(o)), !o.end && o.buffer && (t.chunks[o.uuid][o.currentPosition] = o.buffer), o.end) {
                    var r = t.chunks[o.uuid], a = [];
                    Object.keys(r).forEach(function (e, t) {
                        a.push(r[e])
                    });
                    var s = new Blob(a, {type: o.type});
                    (s = function (e, t) {
                        if (e || (e = {}), !t)return e;
                        for (var n in t)try {
                            e[n] = t[n]
                        } catch (e) {
                        }
                        return e
                    }(s, o)).url = URL.createObjectURL(s), s.uuid = o.uuid, s.size || console.error("Something went wrong. Blob Size is 0."), e.onEnd && e.onEnd(s), delete t.chunks[o.uuid], delete t.chunksWaiters[o.uuid]
                }
                o.buffer && e.onProgress && e.onProgress(o), o.end || (i(o), t.chunksWaiters[o.uuid] = function () {
                    setTimeout(function e() {
                        o.buffer && t.chunks[o.uuid] && (o.currentPosition == o.maxChunks || t.chunks[o.uuid][o.currentPosition] || (i(o), setTimeout(e, 5e3)))
                    }, 5e3)
                }, t.chunksWaiters[o.uuid]())
            } else e.convertToObject(o, function (e) {
                n(e)
            })
        }
    }

    var n = {
        ConvertToArrayBuffer: function (e, t) {
            g.pack(e, function (e) {
                t(e.buffer)
            })
        }, ConvertToObject: function (e, t) {
            g.unpack(e, t)
        }
    };
    var o = Uint8Array.BYTES_PER_ELEMENT, i = Uint16Array.BYTES_PER_ELEMENT, r = Uint32Array.BYTES_PER_ELEMENT, a = {
        NULL: 0,
        UNDEFINED: 1,
        STRING: 2,
        NUMBER: 3,
        BOOLEAN: 4,
        ARRAY: 5,
        OBJECT: 6,
        INT8ARRAY: 7,
        INT16ARRAY: 8,
        INT32ARRAY: 9,
        UINT8ARRAY: 10,
        UINT16ARRAY: 11,
        UINT32ARRAY: 12,
        FLOAT32ARRAY: 13,
        FLOAT64ARRAY: 14,
        ARRAYBUFFER: 15,
        BLOB: 16,
        FILE: 16,
        BUFFER: 17
    }, s = [null, null, "Uint16", "Float64", "Uint8", null, null, "Int8", "Int16", "Int32", "Uint8", "Uint16", "Uint32", "Float32", "Float64", "Uint8", "Uint8", "Uint8"], d = function (e) {
        var t = 0, n = 0, d = 0, c = new ArrayBuffer(e[0].byte_length + e[0].header_size), l = new DataView(c);
        for (n = 0; n < e.length; n++) {
            e[n].header_size;
            var u = e[n].type, m = e[n].length, g = e[n].value, f = e[n].byte_length, v = s[u], p = null === v ? 0 : window[v + "Array"].BYTES_PER_ELEMENT;
            switch (u === a.BUFFER ? l.setUint8(t, a.BLOB, !1) : l.setUint8(t, u, !1), t += o, u !== a.ARRAY && u !== a.OBJECT || (l.setUint16(t, m, !1), t += i), l.setUint32(t, f, !1), t += r, u) {
                case a.NULL:
                case a.UNDEFINED:
                    break;
                case a.STRING:
                    for (d = 0; d < m; d++, t += p)l.setUint16(t, g.charCodeAt(d), !1);
                    break;
                case a.NUMBER:
                case a.BOOLEAN:
                    0, l["set" + v](t, g, !1), t += p;
                    break;
                case a.INT8ARRAY:
                case a.INT16ARRAY:
                case a.INT32ARRAY:
                case a.UINT8ARRAY:
                case a.UINT16ARRAY:
                case a.UINT32ARRAY:
                case a.FLOAT32ARRAY:
                case a.FLOAT64ARRAY:
                    new Uint8Array(l.buffer, t, f).set(new Uint8Array(g.buffer)), t += f;
                    break;
                case a.ARRAYBUFFER:
                case a.BUFFER:
                    new Uint8Array(l.buffer, t, f).set(new Uint8Array(g)), t += f;
                    break;
                case a.BLOB:
                case a.ARRAY:
                case a.OBJECT:
                    break;
                default:
                    throw"TypeError: Unexpected type found."
            }
            0
        }
        return l
    }, c = function (e, t) {
        var n, d, l, u, m, g = 0;
        n = e.getUint8(t, !1), t += o, n !== a.ARRAY && n !== a.OBJECT || (d = e.getUint16(t, !1), t += i), l = e.getUint32(t, !1), t += r;
        var f = s[n], v = null === f ? 0 : window[f + "Array"].BYTES_PER_ELEMENT;
        switch (n) {
            case a.NULL:
            case a.UNDEFINED:
                0, u = null;
                break;
            case a.STRING:
                d = l / v;
                var p = [];
                for (g = 0; g < d; g++) {
                    var h = e.getUint16(t, !1);
                    t += v, p.push(String.fromCharCode(h))
                }
                u = p.join("");
                break;
            case a.NUMBER:
                u = e.getFloat64(t, !1), t += v;
                break;
            case a.BOOLEAN:
                u = 1 === e.getUint8(t, !1), t += v;
                break;
            case a.INT8ARRAY:
            case a.INT16ARRAY:
            case a.INT32ARRAY:
            case a.UINT8ARRAY:
            case a.UINT16ARRAY:
            case a.UINT32ARRAY:
            case a.FLOAT32ARRAY:
            case a.FLOAT64ARRAY:
            case a.ARRAYBUFFER:
                m = e.buffer.slice(t, t + l), t += l, u = n === a.ARRAYBUFFER ? m : new window[f + "Array"](m);
                break;
            case a.BLOB:
                if (window.Blob) {
                    var S = c(e, t), C = c(e, S.cursor);
                    t = C.cursor, u = new Blob([C.value], {type: S.value})
                } else m = e.buffer.slice(t, t + l), t += l, u = new Buffer(m);
                break;
            case a.ARRAY:
                for (u = [], g = 0; g < d; g++)t = (m = c(e, t)).cursor, u.push(m.value);
                break;
            case a.OBJECT:
                for (u = {}, g = 0; g < d; g++) {
                    var w = c(e, t), y = c(e, w.cursor);
                    t = y.cursor, u[w.value] = y.value
                }
                break;
            default:
                throw"TypeError: Type not supported."
        }
        return {value: u, cursor: t}
    }, l = function (e, t) {
        for (var n = e.length, o = [], i = 0, r = 0, a = 0; a < e.length; a++)!function (a) {
            u(e[a], function (e) {
                if (o[a] = e, r += e[0].header_size + e[0].byte_length, ++i === n) {
                    for (var s = [], d = 0; d < o.length; d++)s = s.concat(o[d]);
                    t(s, r)
                }
            })
        }(a)
    }, u = function (e, t) {
        var n, d, c = o + r, u = 0, m = 0, g = e;
        switch (d = function (e) {
            var t = void 0;
            if (void 0 === e)t = a.UNDEFINED; else if (null === e)t = a.NULL; else {
                var n = e.constructor.name, o = e.constructor.toString().match(/\w+/g)[1];
                if (void 0 !== n && void 0 !== a[n.toUpperCase()])t = a[n.toUpperCase()]; else if (void 0 !== o && void 0 !== a[o.toUpperCase()])t = a[o.toUpperCase()]; else switch (typeof e) {
                    case"string":
                        t = a.STRING;
                        break;
                    case"number":
                        t = a.NUMBER;
                        break;
                    case"boolean":
                        t = a.BOOLEAN;
                        break;
                    case"object":
                        e instanceof Array ? t = a.ARRAY : e instanceof Int8Array ? t = a.INT8ARRAY : e instanceof Int16Array ? t = a.INT16ARRAY : e instanceof Int32Array ? t = a.INT32ARRAY : e instanceof Uint8Array ? t = a.UINT8ARRAY : e instanceof Uint16Array ? t = a.UINT16ARRAY : e instanceof Uint32Array ? t = a.UINT32ARRAY : e instanceof Float32Array ? t = a.FLOAT32ARRAY : e instanceof Float64Array ? t = a.FLOAT64ARRAY : e instanceof ArrayBuffer ? t = a.ARRAYBUFFER : e instanceof Blob ? t = a.BLOB : e instanceof Buffer ? t = a.BUFFER : e instanceof Object && (t = a.OBJECT)
                }
            }
            return t
        }(e), n = null == s[d] ? 0 : window[s[d] + "Array"].BYTES_PER_ELEMENT, d) {
            case a.UNDEFINED:
            case a.NULL:
                break;
            case a.NUMBER:
            case a.BOOLEAN:
                u = n;
                break;
            case a.STRING:
                u += (m = e.length) * n;
                break;
            case a.INT8ARRAY:
            case a.INT16ARRAY:
            case a.INT32ARRAY:
            case a.UINT8ARRAY:
            case a.UINT16ARRAY:
            case a.UINT32ARRAY:
            case a.FLOAT32ARRAY:
            case a.FLOAT64ARRAY:
                u += (m = e.length) * n;
                break;
            case a.ARRAY:
                return void l(e, function (n, o) {
                    t([{type: d, length: e.length, header_size: c + i, byte_length: o, value: null}].concat(n))
                });
            case a.OBJECT:
                var f = [];
                for (var v in e)e.hasOwnProperty(v) && (f.push(v), f.push(e[v]), m++);
                return void l(f, function (e, n) {
                    t([{type: d, length: m, header_size: c + i, byte_length: n, value: null}].concat(e))
                });
            case a.ARRAYBUFFER:
                u += e.byteLength;
                break;
            case a.BLOB:
                var p = e.type, h = new FileReader;
                return h.onload = function (e) {
                    l([p, e.target.result], function (e, n) {
                        t([{type: d, length: m, header_size: c, byte_length: n, value: null}].concat(e))
                    })
                }, h.onerror = function (e) {
                    throw"FileReader Error: " + e
                }, void h.readAsArrayBuffer(e);
            case a.BUFFER:
                u += e.length;
                break;
            default:
                throw'TypeError: Type "' + e.constructor.name + '" not supported.'
        }
        t([{type: d, length: m, header_size: c, byte_length: u, value: g}].concat([]))
    }, m = function (e, t) {
        var n = e instanceof DataView ? e : new DataView(e);
        return c(n, 0).value
    };
    var g = {
        pack: function (e, t) {
            try {
                0, u(e, function (e) {
                    t(d(e))
                })
            } catch (e) {
                throw e
            }
        }, unpack: function (e, t) {
            try {
                0;
                var n = m(e);
                0, t(n)
            } catch (e) {
                throw e
            }
        }
    };
    window.FileConverter = n, window.FileSelector = function () {
        var e = this, t = function () {
        };

        function n(n, o, i) {
            n = n || function () {
                };
            var r = document.createElement("input");
            r.type = "file", o && (r.multiple = !0), i && (r.webkitdirectory = !0), r.accept = e.accept, r.onclick = function () {
                r.clickStarted = !0
            }, document.body.onfocus = function () {
                setTimeout(function () {
                    r.clickStarted && (r.clickStarted = !1, r.value || t())
                }, 500)
            }, r.onchange = function () {
                if (o) {
                    if (!r.files.length)return void console.error("No file selected.");
                    var e = [];
                    return Array.from(r.files).forEach(function (t) {
                        t.url = t.webkitRelativePath, e.push(t)
                    }), void n(e)
                }
                r.files[0] ? (n(r.files[0]), r.parentNode.removeChild(r)) : console.error("No file selected.")
            }, r.style.display = "none", (document.body || document.documentElement).appendChild(r), function (e) {
                if ("function" == typeof e.click)return void e.click();
                if ("function" == typeof e.change)return void e.change();
                if (void 0 !== document.createEvent("Event")) {
                    if ("function" == typeof(t = document.createEvent("Event")).initEvent && "function" == typeof e.dispatchEvent)return t.initEvent("click", !0, !0), void e.dispatchEvent(t)
                }
                var t = new MouseEvent("click", {view: window, bubbles: !0, cancelable: !0});
                e.dispatchEvent(t)
            }(r)
        }

        e.selectSingleFile = function (e, o) {
            o && (t = o), n(e)
        }, e.selectMultipleFiles = function (e, o) {
            o && (t = o), n(e, !0)
        }, e.selectDirectory = function (e, o) {
            o && (t = o), n(e, !0, !0)
        }, e.accept = "*.*"
    }, window.FileBufferReader = function () {
        var o = this, i = new e;
        o.chunks = {}, o.users = {}, o.readAsArrayBuffer = function (e, t, n) {
            var r = {
                file: e, earlyCallback: function (e) {
                    t(a(e, {currentPosition: -1}))
                }, extra: n || {userid: 0}
            };
            e.extra && Object.keys(e.extra).length && Object.keys(e.extra).forEach(function (t) {
                r.extra[t] = e.extra[t]
            }), i.readAsArrayBuffer(o, r)
        }, o.getNextChunk = function (e, t, n) {
            var i;
            void 0 !== e.currentPosition && (i = e.currentPosition, e = e.uuid);
            var r = o.chunks[e];
            if (r) {
                void 0 !== n ? (o.users[n + ""] || (o.users[n + ""] = {
                    fileUUID: e,
                    userid: n,
                    currentPosition: -1
                }), void 0 !== i && (o.users[n + ""].currentPosition = i), o.users[n + ""].currentPosition++, i = o.users[n + ""].currentPosition) : (void 0 !== i && (o.chunks[e].currentPosition = i), o.chunks[e].currentPosition++, i = o.chunks[e].currentPosition);
                var s = r[i];
                if (!s)return delete o.chunks[e], void o.convertToArrayBuffer({
                    chunkMissing: !0,
                    currentPosition: i,
                    uuid: e
                }, t);
                s = a(s), void 0 !== n && (s.remoteUserId = n + ""), s.start && o.onBegin(s), s.end && o.onEnd(s), o.onProgress(s), o.convertToArrayBuffer(s, function (e) {
                    s.currentPosition != s.maxChunks ? t(e, !1) : t(e, !0)
                })
            }
        };
        var r = new t(o);

        function a(e, t) {
            if (null == e || "object" != typeof e)return e;
            if (e.constructor != Object && e.constructor != Array)return e;
            if (e.constructor == Date || e.constructor == RegExp || e.constructor == Function || e.constructor == String || e.constructor == Number || e.constructor == Boolean)return new e.constructor(e);
            for (var n in t = t || new e.constructor, e)t[n] = void 0 === t[n] ? a(e[n], null) : t[n];
            return t
        }

        o.addChunk = function (e, t) {
            e && r.receive(e, function (e) {
                o.convertToArrayBuffer({readyForNextChunk: !0, currentPosition: e.currentPosition, uuid: e.uuid}, t)
            })
        }, o.chunkMissing = function (e) {
            delete r.chunks[e.uuid], delete r.chunksWaiters[e.uuid]
        }, o.onBegin = function () {
        }, o.onEnd = function () {
        }, o.onProgress = function () {
        }, o.convertToObject = n.ConvertToObject, o.convertToArrayBuffer = n.ConvertToArrayBuffer, o.setMultipleUsers = function () {
        }
    }
}();
var publicRoomIdentifier, connection, videoConnection, screenConnection, tenant, role, sessionId, sessionForChat, roomId, socket, streamConstraints, recentFile, conversationPanel, tempStream, lsDesigner, conferenceStyle, classVideo, videoElementContainer, videoWidgetContainer, roomLinkPage, facingMode, iphoneLocalStream, forceClose = !1, autoReconnectInterval = 5e3, popupNotifications = [], repeatStatInterval = 2e3, visitorRinging = [], requirePassComm = !1, RMCMediaTrack = {
    cameraStream: null,
    cameraTrack: null,
    screen: null
}, comController = function () {
    var e = this;
    this.init = function (n, o) {
        requirePassComm = void 0 !== passRoom && passRoom, roomId = o, role = n, sessionId = getCookie("sessionId") && "admin" !== getCookie("sessionId") ? getCookie("sessionId") : getGuid(), queryString.s && (sessionId = queryString.s);
        var i = "admin" === role ? "a" : "";
        if (sessionForChat = getCookie("sessionForChat") ? getCookie("sessionForChat") : sessionId + i, "admin" === role && (sessionId = "admin"), queryString.isAdmin && (sessionId += "a"), facingMode = svConfigs.videoScreen.primaryCamera ? svConfigs.videoScreen.primaryCamera : "user", setCookie("sessionId", sessionId, 1), setCookie("sessionForChat", sessionForChat, 1), window.enableAdapter = !0, publicRoomIdentifier = "dashboard", tenant = "dashboard", (connection = new RTCMultiConnection).iceServers = svConfigs.iceServers.iceServers, connection.socketURL = svConfigs.appWss, conferenceStyle = svConfigs.videoScreen && "conference" === svConfigs.videoScreen.videoContainerStyle ? "conference" : "simple", classVideo = "conference" === conferenceStyle ? "sourcevideo" : "bigvideo", videoElementContainer = "conference" === conferenceStyle ? "video_container_small" : "video_container", videoWidgetContainer = "conference" === conferenceStyle ? "w.html" : "widget.html", roomLinkPage = "conference" == conferenceStyle ? "r.html" : "room.html", connection.publicRoomIdentifier = publicRoomIdentifier, connection.onbeforeunload = function () {
            }, connection.session = {audio: !1, video: !1, data: !0}, connection.processSdp = function (e) {
                return e
            }, void 0 !== names)var r = names[sessionId] ? names[sessionId].name : guestName(sessionId); else r = guestName(sessionId);
        if (connection.extra = {
                role: role,
                name: r,
                tenant: tenant,
                sessionId: sessionId,
                ua: navigator.userAgent,
                referrer: document.title,
                roomId: roomId,
                isAdmin: queryString.isAdmin || "admin" == role ? 1 : 0,
                pass: requirePassComm,
                callerInfo: localStorage.getItem("prd") ? JSON.parse(localStorage.getItem("prd")) : ""
            }, connection.onopen = function (e) {
                if (console.log("You are connected with: " + connection.getAllParticipants().join(", ")), lsDesigner && lsDesigner.pointsLength <= 0 && setTimeout(function () {
                        connection.send("plz-sync-points")
                    }, 1e3), "popup" == e.extra.role)if (e.extra.isAdmin) {
                    var t = jQEngager.Event("AdminPopupOnline", {
                        sessionId: e.extra.sessionId,
                        isAdmin: 1,
                        pass: e.extra.pass
                    });
                    jQEngager(document).trigger(t)
                } else {
                    if (e.extra.callerInfo)e = {
                        sessionId: e.extra.sessionId,
                        isAdmin: e.extra.isAdmin,
                        name: e.extra.callerInfo ? e.extra.callerInfo.name : e.extra.name,
                        callerInfo: e.extra.callerInfo,
                        pass: e.extra.pass
                    }; else e = {sessionId: e.extra.sessionId, isAdmin: e.extra.isAdmin, pass: e.extra.pass};
                    t = jQEngager.Event("PopupOnline", e);
                    jQEngager(document).trigger(t)
                }
                if (e.extra && "admin" == e.extra.role) {
                    t = jQEngager.Event("AdminOnline");
                    jQEngager(document).trigger(t)
                }
            }, connection.onclose = connection.onerror = connection.onleave = function (e) {
                var t = jQEngager.Event("PopupLeft", {sessionId: e.userid, isAdmin: 0});
                if (jQEngager(document).trigger(t), e.extra && "admin" == e.extra.role) {
                    t = jQEngager.Event("AdminOffline");
                    jQEngager(document).trigger(t)
                }
                e.extra && "visitor" == e.extra.role && (jQEngager("#simpleButton" + e.extra.sessionId).hide(), jQEngager("#chats-lsv-admin").remove("#simpleButton" + e.extra.sessionId)), console.log("On close", e)
            }, connection.onUserStatusChanged = function (t) {
                if ("offline" == t.status) {
                    if (0 == connection.getAllParticipants().length) {
                        var n = jQEngager.Event("AdminPopupOffline");
                        jQEngager(document).trigger(n), e.handleCallTermination()
                    }
                    n = jQEngager.Event("PopupLeft", {sessionId: t.userid, isAdmin: 0});
                    jQEngager(document).trigger(n)
                }
                if ("online" == t.status && connection.getAllParticipants().length > 0 && t.extra && t.extra.sessionId != sessionId) {
                    if (t.extra.callerInfo)t = {
                        sessionId: t.extra.sessionId,
                        isAdmin: t.extra.isAdmin,
                        name: t.extra.callerInfo ? t.extra.callerInfo.name : t.extra.name,
                        callerInfo: t.extra.callerInfo,
                        pass: t.extra.pass
                    }; else t = {sessionId: t.extra.sessionId, isAdmin: t.extra.isAdmin, pass: t.extra.pass};
                    n = jQEngager.Event("PopupOnline", t);
                    jQEngager(document).trigger(n)
                }
            }, connection.onPeerStateChanged = function (e) {
                if ("closed" == e.iceConnectionState && e.extra && e.extra.isAdmin) {
                    var t = jQEngager.Event("AdminOffline");
                    jQEngager(document).trigger(t);
                    t = jQEngager.Event("AdminPopupOffline");
                    jQEngager(document).trigger(t);
                    for (var n = 0; n < popupNotifications.length; n++)popupNotifications[n] == e.extra.sessionId && popupNotifications.splice(n, 1)
                }
            }, this.onGettingWebRTCStats = function (e, t) {
                videoConnection.peers[t] || e.nomore();
                bytesToSize(e.bandwidth.speed), e.encryption, e.audio.recv.codecs.concat(e.video.recv.codecs).join(", "), bytesToSize(e.audio.bytesReceived + e.video.bytesReceived), e.connectionType.remote.candidateType.join(", "), e.connectionType.remote.transport.join(", "), e.results.forEach(function (e) {
                    if ("ssrc" === e.type && "Channel-audio-1" === e.transportId) {
                        var t = e.packetsLost;
                        e.packetsSent, e.audioInputLevel, e.googTrackId, e.mediaType, e.id.indexOf("_send");
                        "\n", "packetsLost: " + t
                    }
                })
            }, this.joinBroadcastLooper = function () {
                videoConnection.extra.broadcaster = !1, videoConnection.dontCaptureUserMedia = !0, videoConnection.session.oneway = !0, function e() {
                    videoConnection.checkPresence(roomId + "_video", function (t, n, o) {
                        o._room && o._room.isFull && alert("Room is full."), t ? videoConnection.join(roomId + "_video", function (e, t, n) {
                            n && console.error("join", n, roomId + "_video")
                        }) : setTimeout(e, 5e3)
                    })
                }()
            }, this.startScreenConnection = function (e, t) {
                screenConnection.openOrJoin(roomId + "_screen", function (n, o, i) {
                    screenConnection.isInitiator = e, (e || screenConnection.extra.sessionId !== t) && (screenConnection.extra = {sessionId: t}), e && socket.emit(connection.socketCustomEvent, {
                        type: "startScreenShare",
                        role: role,
                        tenant: tenant,
                        sessionId: t,
                        roomId: roomId
                    })
                })
            }, connection.onmessage = function (t) {
                if (!0 !== t.data.typing)if (!1 !== t.data.typing)if (t.data.chatMessage)if (t.data.privateId) {
                    if (t.data.privateId == e.getSessionId()) {
                        d = jQEngager.Event("ChatMessage", {
                            msg: t.data.chatMessage,
                            date: t.data.date,
                            sessionId: t.data.sessionId,
                            privateId: t.data.privateId
                        });
                        jQEngager(document).trigger(d)
                    }
                    if (t.data.privateId && "admin" === role) {
                        jQEngager("#simpleButton" + t.data.privateId).show();
                        var n = $("#contentChatsimple" + t.data.privateId)[0], o = $("#nameChat" + t.data.privateId).val();
                        const e =`\n < div
                    class
                        = "msg-lsv left-msg-lsv" >\n < div
                    class
                        = "msg-lsv-bubble" >\n < div
                    class
                        = "msg-lsv-info" >\n < div
                    class
                        = "msg-lsv-info-name" >${o} < / div >\n < div
                    class
                        = "msg-lsv-info-time" >${getPrettyDate((new Date).getTime()/1e3)} < / div >\n < / div >\n\n < div
                    class
                        = "msg-lsv-text" >${t.data.chatMessage} < / div >\n < / div >\n < / div >\n                              `;
                        if (n.insertAdjacentHTML("beforeend", e), n.scrollTop += 500, playEnterRoom(), svConfigs.serverSide.chatHistory) {
                            var i = t.data.privateId, r = [];
                            r[sessionForChat] = {}, r[i] = {}, saveChat(t.data.chatMessage, o, "", null, null, r)
                        }
                    }
                } else {
                    d = jQEngager.Event("ChatMessage", {
                        msg: t.data.chatMessage,
                        date: t.data.date,
                        sessionId: t.data.sessionId
                    });
                    jQEngager(document).trigger(d)
                } else if (t.data.translateMessage) {
                    d = jQEngager.Event("TranslateMessage", {
                        msg: t.data.translateMessage,
                        sessionId: t.data.sessionId
                    });
                    jQEngager(document).trigger(d)
                } else {
                    if ("voiceSpeaking" === t.data) {
                        d = jQEngager.Event("VoiceSpeaking", {id: t.userid});
                        jQEngager(document).trigger(d)
                    }
                    if ("voiceSilence" === t.data) {
                        d = jQEngager.Event("VoiceSilence", {id: t.userid});
                        jQEngager(document).trigger(d)
                    }
                    if (lsDesigner && "plz-sync-points" === t.data)lsDesigner.sync(); else if (t.data.whiteboardData) {
                        d = jQEngager.Event("WhiteboardSync");
                        if (jQEngager(document).trigger(d), queryString.isAdmin || localStorage.getItem("hasPrivileges") || e.startWhiteboard(), lsDesigner || e.startWhiteboard(), t.data.whiteboardData) {
                            var a = t.data.whiteboardData, s = screen.width / t.data.width;
                            a.points.forEach(function (e) {
                                "text" == e[0] ? (e[1][1] = e[1][1] * s, e[1][2] = e[1][2] * s) : "image" == e[0] || "pdf" == e[0] ? (e[1][1] = e[1][1] * s, e[1][2] = e[1][2] * s, e[1][3] = e[1][3] * s, e[1][4] = e[1][4] * s) : (e[1][0] = e[1][0] * s, e[1][1] = e[1][1] * s, e[1][2] = e[1][2] * s, e[1][3] = e[1][3] * s)
                            }), lsDesigner.syncData(a)
                        } else lsDesigner.clearCanvas()
                    }
                } else {
                    var d = jQEngager.Event("SendTyping", {typing: !1});
                    jQEngager(document).trigger(d)
                } else {
                    var d = jQEngager.Event("SendTyping", {typing: !0, sessionId: t.userid});
                    jQEngager(document).trigger(d)
                }
            }, queryString.room) {
            (videoConnection = new RTCMultiConnection).iceServers = svConfigs.iceServers.iceServers, videoConnection.socketURL = svConfigs.appWss, videoConnection.maxParticipantsAllowed = svConfigs.maxParticipantsAllowed ? svConfigs.maxParticipantsAllowed : 1e3, videoConnection.publicRoomIdentifier = publicRoomIdentifier, queryString.broadcast ? videoConnection.sdpConstraints.mandatory = {
                OfferToReceiveAudio: !0,
                OfferToReceiveVideo: !!queryString.isAdmin
            } : videoConnection.sdpConstraints.mandatory = {
                OfferToReceiveAudio: !0,
                OfferToReceiveVideo: !0
            }, videoConnection.extra = {sessionId: sessionId}, videoConnection.onPeerStateChanged = function (e) {
            }, videoConnection.onspeaking = function (t) {
                audio_on && video_on && e.getStream() && connection.send("voiceSpeaking")
            }, videoConnection.onsilence = function (e) {
                connection.send("voiceSilence")
            }, videoConnection.onMediaError = function (e) {
                if ("Permission denied" === e.message) {
                    e = jQEngager.Event("TogglePermissionDenied");
                    jQEngager(document).trigger(e), socket.emit(connection.socketCustomEvent, {
                        type: "endCall",
                        role: role,
                        tenant: tenant,
                        sessionId: sessionId,
                        roomId: roomId
                    })
                } else videoConnection.openOrJoin(roomId + "_video", function (e, t, n) {
                    n && console.error("openOrJoin", n, t)
                })
            }, connection.chunkSize = 16e3, connection.enableFileSharing = !0, connection.onUserIdAlreadyTaken = function (e, t) {
            }, connection.autoSaveToDisk = !1;
            var a = {};
            if (connection.onFileProgress = function (e, t) {
                    var n = a[e.uuid];
                    n.progress[0].value = e.currentPosition || e.maxChunks || n.progress[0].max
                }, connection.onFileStart = function (e) {
                    if (e.userid === connection.userid) {
                        if (!recentFile.started) {
                            recentFile.started = !0;
                            var t = jQEngager.Event("IncomingFileTransfer", {name: e.name, sender: !0, fileId: e.uuid});
                            jQEngager(document).trigger(t)
                        }
                    } else {
                        t = jQEngager.Event("IncomingFileTransfer", {name: e.name, sender: !1, fileId: e.uuid});
                        jQEngager(document).trigger(t)
                    }
                    a[e.uuid] = {progress: jQEngager("#progress" + e.uuid)}, a[e.uuid].progress.max = e.maxChunks
                }, connection.onFileEnd = function (t) {
                    var n = e.getFileHTML(t);
                    if (t.userid === connection.userid)if (recentFile) {
                        recentFile.userIndex++;
                        var o = connection.getAllParticipants()[recentFile.userIndex];
                        o ? connection.send(recentFile, o) : recentFile = null
                    } else recentFile = null; else jQEngager("#download" + t.uuid).html(n)
                }, videoConnection.onstream = function (n) {
                    if (console.log("videoConnection.onstream", n), videoConnection.videosContainer = document.getElementById(videoElementContainer), "local" === n.type) {
                        var o = jQEngager.Event("LocalVideoStarted");
                        if (jQEngager(document).trigger(o), n.stream.isVideo)iphoneLocalStream = RMCMediaTrack.cameraStream = n.stream, RMCMediaTrack.cameraTrack = e.getTracks(n.stream, "video")[0], isiPhone && e.checkMediaDevices(), (r = document.getElementById("localVideo")).setAttribute("data-sessionId", n.extra.sessionId), r.setAttribute("volume", 0), r.setAttribute("autoplay", ""), r.setAttribute("muted", ""), r.setAttribute("playsinline", ""), r.srcObject = n.stream, RMCMediaTrack.selfVideo = r, void 0 !== (u = r.play()) && u.then(function () {
                            r.play()
                        }).catch(function (e) {
                            console.log(e)
                        }), videoConnection.extra.screen && (RMCMediaTrack.cameraTrack.onended = RMCMediaTrack.cameraTrack.onmute = RMCMediaTrack.cameraTrack.oninactive = function () {
                            t = !1, videoConnection.extra.screen = !1, e.handleScreenShareTermination()
                        })
                    } else {
                        if (void 0 === n.extra.sessionId)return;
                        $(".sourcevideo").each(function () {
                            $(this).attr("id"), n.extra.sessionId
                        }), $(".bigvideo").each(function () {
                            $(this).attr("id"), n.extra.sessionId
                        });
                        var i = document.getElementById("remoteVideoSpan" + n.extra.sessionId), r = document.getElementById(n.extra.sessionId);
                        i && i.remove(), r && r.remove(), n.mediaElement.controls = !1, n.mediaElement.removeAttribute("src"), n.mediaElement.removeAttribute("srcObject");
                        var a = document.createElement("video");
                        a.id = n.extra.sessionId;
                        var s = videoConnection.getAllParticipants().length;
                        if (a.setAttribute("class", classVideo), "conference" !== conferenceStyle) {
                            var d = s > 1 ? "49%" : "98%", c = s > 1 ? "relative" : "absolute";
                            a.style.width = d
                        }
                        try {
                            a.setAttributeNode(document.createAttribute("autoplay")), a.setAttributeNode(document.createAttribute("playsinline")), a.setAttributeNode(document.createAttribute("videoautoplay"))
                        } catch (o) {
                            a.playsinline = !0, a.autoplay = !0, a.videoautoplay = !0
                        }
                        var l = n.stream;
                        if ("srcObject" in a ? a.srcObject = l : a[navigator.mozGetUserMedia ? "mozSrcObject" : "src"] = navigator.mozGetUserMedia ? l : (window.URL || window.webkitURL).createObjectURL(l), videoConnection.videosContainer.appendChild(a), queryString.broadcast) {
                            var u;
                            o = jQEngager.Event("RemoteVideoStarted");
                            jQEngager(document).trigger(o), queryString.token ? toggleNotification(smartVideoLocale.msgStore.welcomeBroadcast, !0) : toggleNotification(smartVideoLocale.msgStore.incomingBroadcast, !0), void 0 !== (u = a.play()) && u.then(function () {
                                toggleNotification("", !1), a.play()
                            }).catch(function (e) {
                                $("#incomingBroadcast").click(function () {
                                    toggleNotification("", !1), a.play()
                                })
                            })
                        } else {
                            o = jQEngager.Event("RemoteVideoStarted");
                            jQEngager(document).trigger(o), a.play()
                        }
                        setTimeout(function () {
                            $("." + classVideo).each(function () {
                                $(this).is(":visible") && ($(this).css("width", d), $(this).css("position", c))
                            })
                        }, 100), setTimeout(function () {
                            $("." + classVideo).each(function () {
                                if ($(this).is(":visible")) {
                                    var e = $(this).attr("id");
                                    $("#remoteVideoSpan" + e).remove();
                                    var t = $(this).position(), n = jQEngager.Event("RemoteSpanPosition", {
                                        sessionId: e,
                                        position: t
                                    });
                                    jQEngager(document).trigger(n)
                                }
                            })
                        }, 1e3), visitorRinging = [], setTimeout(function () {
                            connection.send("voiceSpeaking")
                        }, 1500)
                    }
                    if (queryString.broadcast)if ("remote" === n.type && videoConnection.isInitiator) {
                        var m = [];
                        videoConnection.getAllParticipants().forEach(function (e) {
                            m.push({pid: e, broadcaster: !0 === videoConnection.peers[e].extra.broadcaster})
                        }), videoConnection.socket.emit(videoConnection.socketCustomEvent, {participants: m})
                    } else"remote" !== n.type || videoConnection.extra.broadcaster || videoConnection.socket.emit(videoConnection.socketCustomEvent, {
                        giveAllParticipants: !0,
                        roomId: roomId
                    });
                    videoConnection.onUserStatusChanged(n), e.initHark({
                        stream: n.stream,
                        streamedObject: n,
                        connection: videoConnection
                    })
                }, videoConnection.onstreamended = function (t) {
                    if (t.extra) {
                        var n = document.getElementById(t.extra.sessionId);
                        n && (n.parentNode.removeChild(n), $("#remoteVideoSpan" + t.extra.sessionId).remove());
                        var o = videoConnection.getAllParticipants().length;
                        if ("conference" !== conferenceStyle)var i = o > 1 ? "49%" : "98%", r = o > 1 ? "relative" : "absolute";
                        setTimeout(function () {
                            $("." + classVideo).each(function () {
                                $(this).is(":visible") && ($(this).css("width", i), $(this).css("position", r))
                            })
                        }, 100), setTimeout(function () {
                            $("." + classVideo).each(function () {
                                if ($(this).is(":visible")) {
                                    var e = $(this).attr("id");
                                    $("#remoteVideoSpan" + e).remove();
                                    var t = $(this).position(), n = jQEngager.Event("RemoteSpanPosition", {
                                        sessionId: e,
                                        position: t
                                    });
                                    jQEngager(document).trigger(n)
                                }
                            })
                        }, 1e3), 0 === o && e.handleCallTermination(), queryString.broadcast && connection.isInitiator
                    }
                }, videoConnection.onUserStatusChanged = function (t) {
                    var n = [];
                    connection.getAllParticipants().forEach(function (t) {
                        n.push(e.getFullName(t))
                    }), n = n.length ? [connection.extra.userFullName || "You"].concat(n) : ["Only You"], console.log("<b>Active users:</b> " + n.join(", "))
                }, videoConnection.onopen = function () {
                    console.log("You are connected with: " + connection.getAllParticipants().join(", "))
                }, videoConnection.onclose = function () {
                    videoConnection.getAllParticipants().length
                }, videoConnection.onEntireSessionClosed = function (e) {
                    videoConnection && (videoConnection.leave(), videoConnection.streamEvents.selectAll({local: !0}).forEach(function (e) {
                        e.stream.getAudioTracks()[0].stop(), e.stream.getVideoTracks()[0].stop()
                    }));
                    var t = jQEngager.Event("CallEnded");
                    jQEngager(document).trigger(t)
                }, "conference" == conferenceStyle && (connection.autoCloseEntireSession = !1, videoConnection.autoCloseEntireSession = !1), !queryString.broadcast && svConfigs.videoScreen.separateScreenShare) {
                (screenConnection = new RTCMultiConnection).maxParticipantsAllowed = svConfigs.maxParticipantsAllowed ? svConfigs.maxParticipantsAllowed : 1e3, screenConnection.closeBeforeUnload = !1, screenConnection.iceServers = svConfigs.iceServers.iceServers, screenConnection.socketURL = svConfigs.appWss, screenConnection.publicRoomIdentifier = publicRoomIdentifier, screenConnection.autoCloseEntireSession = !1, screenConnection.sdpConstraints.mandatory = {
                    OfferToReceiveAudio: !1,
                    OfferToReceiveVideo: !0
                };
                var s = {
                    mandatory: {
                        maxWidth: screen.width > 1920 ? screen.width : 1920,
                        maxHeight: screen.height > 1080 ? screen.height : 1080
                    }, optional: []
                };
                screenConnection.mediaConstraints = s, screenConnection.session = {
                    screen: !0,
                    oneway: !0
                }, screenConnection.onstream = function (e) {
                    if ("local" === e.type)var t = document.getElementById("localScreen"); else t = document.getElementById("remoteScreen");
                    try {
                        t.setAttributeNode(document.createAttribute("autoplay")), t.setAttributeNode(document.createAttribute("playsinline"))
                    } catch (n) {
                        t.setAttribute("autoplay", !0), t.setAttribute("playsinline", !0)
                    }
                    if ("local" === e.type) {
                        t.volume = 0;
                        try {
                            t.setAttributeNode(document.createAttribute("muted"))
                        } catch (n) {
                            t.setAttribute("muted", !0)
                        }
                    } else {
                        var n = jQEngager.Event("RemoteScreenShareStarted");
                        jQEngager(document).trigger(n)
                    }
                    t.srcObject = e.stream
                }, screenConnection.onstreamended = function (t) {
                    var n = jQEngager.Event("ScreenShareEnded");
                    jQEngager(document).trigger(n), e.handleScreenShareTermination()
                }, screenConnection.onMediaError = function (t) {
                    if ("Concurrent mic process limit." === t.message) {
                        if (DetectRTC.audioInputDevices.length <= 1)return void alert("Please select external microphone. Check github issue number 483.");
                        var n = DetectRTC.audioInputDevices[1].deviceId;
                        screenConnection.mediaConstraints.audio = {deviceId: n}
                    }
                    if ("Permission denied" === t.message) {
                        t = jQEngager.Event("ScreenShareEnded");
                        jQEngager(document).trigger(t), e.handleScreenShareTermination()
                    }
                }
            }
        }
        e.connect()
    }, this.connect = function () {
        this.updateListOfRooms = function (t) {
            jQEngager("#visitors").empty(), jQEngager("#visitorsCount").html(0);
            var n = 0;
            t.forEach(function (t, o) {
                t.participants.forEach(function (o, i) {
                    var r = connection.peers[o];
                    if (r) {
                        var a = r.extra, s = jQEngager("#visitors").find("#" + a.sessionId), d = a.ua ? detect.parse(a.ua) : "", c = d ? d.browser.name : "", l = d ? d.os.name : "", u = a.callerInfo && a.callerInfo.name ? a.callerInfo.name : guestName(a.sessionId), m = '<a href="javascript:void(0);" id="chat' + a.sessionId + '">Start chat</a>', g = '<section class="msger-lsv" id="simpleButton' + a.sessionId + '" style="display: none;">                            <header class="msger-lsv-header">                                <div class="msger-lsv-header-title">                                        ' + u + '                                </div>                                <div class="msger-lsv-header-options">                                        <a href="javascript:void(0);" title="" class="close-but-wd-small" id="closeSimpleChat' + a.sessionId + '"><span></span></a>                                </div>                        </header>                        <main class="msger-lsv-chat" id="contentChatsimple' + a.sessionId + '">                        </main>                        <form class="msger-lsv-inputarea" id="form' + a.sessionId + '">                                <input type="text" id="input' + a.sessionId + '" class="msger-lsv-input" placeholder="Enter your message...">                                <input type="hidden" id="nameChat' + a.sessionId + '" value="' + u + '">                                <button type="submit" class="msger-lsv-send-btn">Send</button>                        </form>                </section>';
                        if (s.length > 0) {
                            var f = s[0];
                            f.innerHTML = '<div class="messages msg_receive"><p>' + u + " " + a.referrer + " " + m + "<br/>" + l + " " + c + "</p></div>", jQEngager(s[0]).replaceWith(f)
                        } else m = '<a href="javascript:void(0);" id="chat' + a.sessionId + '">Start chat</a>', (f = document.createElement("div")).className = "col-xl-3 col-md-6 mb-4", f.id = a.sessionId, f.innerHTML = '<div class="">                                                                        <div class="messages msg_receive">                                                                                <p>' + u + " " + a.referrer + " " + m + "<br/>" + l + " " + c + "</p>                                                                                                                                                        </div>                                                                </div>", jQEngager("#visitors").append(f), n++;
                        if ($("#chat" + a.sessionId).off("click"), $("#chat" + a.sessionId).click(function () {
                                $("#simpleButton" + a.sessionId).show()
                            }), 0 == jQEngager("#chats-lsv-admin").find("#simpleButton" + a.sessionId).length) {
                            jQEngager("#chats-lsv-admin").append(g), $("#chat" + a.sessionId).click(function () {
                                $("#simpleButton" + a.sessionId).show()
                            }), $("#closeSimpleChat" + a.sessionId).click(function () {
                                $("#simpleButton" + a.sessionId).hide()
                            });
                            var v = function (e, t, n, o) {
                                if (!n)return;
                                var i = $("#contentChatsimple" + a.sessionId)[0];
                                const r =`\n < div
                                class
                                = "msg-lsv ${t}-msg-lsv" >\n < div
                                class
                                = "msg-lsv-bubble" >\n < div
                                class
                                = "msg-lsv-info" >\n < div
                                class
                                = "msg-lsv-info-name" >${e} < / div >\n < div
                                class
                                = "msg-lsv-info-time" >${o||getPrettyDate((new Date).getTime()/1e3)} < / div >\n < / div >\n\n < div
                                class
                                = "msg-lsv-text" >${n} < / div >\n < / div >\n < / div >\n                              `;
                                i.insertAdjacentHTML("beforeend", r), i.scrollTop += 500
                            };
                            $("#form" + a.sessionId).submit(function (t) {
                                t.preventDefault();
                                var n = $("#input" + a.sessionId), o = n.val();
                                if (v("Me", "right", o), n.val(""), e.addLocalChat(o, null, a.sessionId), svConfigs.serverSide.chatHistory) {
                                    var i = svConfigs.agentName ? svConfigs.agentName : "Agent", r = a.sessionId, s = [];
                                    s[sessionForChat] = {}, s[r] = {}, saveChat(o, i, "", null, null, s)
                                }
                            }), svConfigs.serverSide.chatHistory && $.ajax({
                                type: "POST",
                                url: lsRepUrl + "/server/script.php",
                                data: {type: "getchat", roomId: roomId, sessionId: a.sessionId, agentId: null}
                            }).done(function (e) {
                                e && JSON.parse(e).forEach(function (e) {
                                    var t = svConfigs.agentName ? svConfigs.agentName : "Agent";
                                    if (e.from == t)var n = "Me", o = "right"; else n = e.from, o = "left";
                                    var i = getPrettyDate(e.date_created);
                                    v(n, o, e.message, i)
                                })
                            }).fail(function () {
                                console.log(!1)
                            })
                        }
                        if ("popup" == t.extra.role) {
                            var p = jQEngager("#visitors").find("#" + a.sessionId), h = jQEngager("#visitors").find("#room" + a.sessionId), S = !1;
                            if (jQEngager("#roomid_" + t.extra.roomId).html(t.extra.roomId + ' <img src="../img/online.png" alt="waiting to connect">'), t.participants.forEach(function (e, n) {
                                    connection.peers[e] || (S = !0, jQEngager("#roomid_" + t.extra.roomId).html(t.extra.roomId + ' <img src="../img/offline.png" alt="busy">'))
                                }), p.length > 0 && 0 === h.length && !S && (setTimeout(function () {
                                    var e = p.children().children().children(), n = {};
                                    n.names = svConfigs.agentName ? svConfigs.agentName : guestName(a.sessionId), lsRepUrl && (n.lsRepUrl = lsRepUrl), agentId && (n.agentId = agentId);
                                    var o = window.btoa(unescape(encodeURIComponent(JSON.stringify(n)))), i = lsRepUrl + "pages/" + roomLinkPage + "?room=" + t.extra.roomId + "&p=" + o + "&isAdmin=1", r = document.createElement("span");
                                    r.id = "room" + a.sessionId, r.innerHTML = ' <a href="' + i + '" target="_blank">Enter Room</a>', e.append(r)
                                }, 200), -1 == jQEngager.inArray(a.sessionId, popupNotifications))) {
                                playEnterRoom();
                                var C = jQEngager.Event("EnterPageNotification", {name: u});
                                jQEngager(document).trigger(C), popupNotifications.push(a.sessionId)
                            }
                        }
                    }
                }), jQEngager("#visitorsCount").html(n)
            })
        }, this.looper = function () {
            connection.socket.emit("get-public-rooms", publicRoomIdentifier, function (t) {
                e.updateListOfRooms(t), setTimeout(e.looper, 3e3)
            })
        }, connection.connectSocket(function (t) {
            socket = t, connection.changeUserId(sessionId, null), e.showStatusBar("Connected to the chat server!", 5e3);
            var n = jQEngager.Event("CommConnected");
            jQEngager(document).trigger(n), "admin" === role && e.looper();
            socket.on("connect", function (t) {
                e.showStatusBar("Connected to the chat server!", 5e3)
            }), socket.on("disconnect", function (t) {
                e.showStatusBar("Unable to connect to the chat server! Kindly refresh", 1e4);
                var n = jQEngager.Event("AdminOffline");
                jQEngager(document).trigger(n), jQEngager("#visitors").empty(), location.reload()
            }), socket.on(connection.socketCustomEvent, function (t) {
                if ("initCall" === t.type && sessionId !== t.sessionId && t.roomId === roomId) {
                    connection.getAllParticipants().forEach(function (e) {
                        visitorRinging.push(e)
                    });
                    var n = jQEngager.Event("IncomingCall", {autoaccept: t.autoaccept, sessionId: t.sessionId});
                    jQEngager(document).trigger(n)
                }
                if ("endCall" === t.type && sessionId !== t.sessionId && t.roomId === roomId && setTimeout(function () {
                        var e = visitorRinging.indexOf(t.sessionId);
                        if (-1 !== e && visitorRinging.splice(e, 1), 0 == videoConnection.getAllParticipants().length && 0 == visitorRinging.length) {
                            var n = jQEngager.Event("CallEnded");
                            jQEngager(document).trigger(n)
                        }
                    }, 200), "remoteVideoUnmuted" === t.type && sessionId !== t.sessionId && t.roomId === roomId) {
                    n = jQEngager.Event("RemoteVideoUnmuted", {sessionId: t.sessionId});
                    jQEngager(document).trigger(n)
                }
                if ("startScreenShare" === t.type && t.roomId === roomId)if (queryString.broadcast) {
                    n = jQEngager.Event("VoiceSpeaking", {id: t.sessionId});
                    jQEngager(document).trigger(n)
                } else sessionId !== t.sessionId && e.startScreenConnection(!1, t.sessionId);
                if ("remoteVideoMuted" === t.type && sessionId !== t.sessionId && t.roomId === roomId) {
                    n = jQEngager.Event("RemoteVideoMuted", {sessionId: t.sessionId});
                    jQEngager(document).trigger(n)
                }
                if ("remoteAudioUnmuted" === t.type && sessionId !== t.sessionId && t.roomId === roomId) {
                    n = jQEngager.Event("RemoteAudioUnmuted", {sessionId: t.sessionId});
                    jQEngager(document).trigger(n)
                }
                if ("remoteAudioMuted" === t.type && sessionId !== t.sessionId && t.roomId === roomId) {
                    n = jQEngager.Event("RemoteAudioMuted", {sessionId: t.sessionId});
                    jQEngager(document).trigger(n)
                }
                if ("revokePriveleges" === t.type && sessionId == t.sessionId && t.roomId === roomId) {
                    n = jQEngager.Event("RevokePriveleges", {sessionId: t.sessionId});
                    jQEngager(document).trigger(n)
                }
                if ("grantPriveleges" === t.type && sessionId == t.sessionId && t.roomId === roomId) {
                    n = jQEngager.Event("GrantPriveleges", {sessionId: t.sessionId});
                    jQEngager(document).trigger(n)
                }
                if ("blockUser" === t.type && t.roomId === roomId) {
                    n = jQEngager.Event("BlockUser", {sessionId: t.sessionId});
                    jQEngager(document).trigger(n)
                }
                if ("forceAudioMuted" === t.type && t.roomId === roomId) {
                    n = jQEngager.Event("ForceAudioMuted", {sessionId: t.sessionId});
                    jQEngager(document).trigger(n)
                }
                if ("forceAudioMutedAll" === t.type && t.roomId === roomId) {
                    n = jQEngager.Event("ForceAudioMutedAll");
                    jQEngager(document).trigger(n)
                }
                if ("forceDelete" === t.type && t.roomId === roomId) {
                    connection.leave();
                    n = jQEngager.Event("ForceDelete", {sessionId: t.sessionId});
                    jQEngager(document).trigger(n)
                }
                if ("forceDeleteAll" === t.type && sessionId !== t.sessionId && t.roomId === roomId) {
                    connection.leave();
                    n = jQEngager.Event("ForceDeleteAll");
                    jQEngager(document).trigger(n)
                }
                if ("setPresent" === t.type && t.roomId === roomId) {
                    n = jQEngager.Event("SetPresent", {sessionId: t.sessionId, present: t.present});
                    jQEngager(document).trigger(n)
                }
                if ("endMeeting" === t.type && t.roomId === roomId) {
                    n = jQEngager.Event("EndMeeting", {sessionId: t.sessionId});
                    jQEngager(document).trigger(n)
                }
                if ("adminOnline" === t.type && t.roomId === roomId) {
                    n = jQEngager.Event("AdminOnline");
                    jQEngager(document).trigger(n)
                }
                if ("toVideo" === t.type && sessionId !== t.sessionId && t.roomId === roomId) {
                    n = jQEngager.Event("ToVideo");
                    jQEngager(document).trigger(n)
                }
                if ("startRecording" === t.type && sessionId !== t.sessionId && t.roomId === roomId) {
                    n = jQEngager.Event("RemoteStartRecording");
                    jQEngager(document).trigger(n)
                }
                if ("stopRecording" === t.type && sessionId !== t.sessionId && t.roomId === roomId) {
                    n = jQEngager.Event("RemoteStopRecording");
                    jQEngager(document).trigger(n)
                }
                if ("rejectCall" === t.type && sessionId !== t.sessionId && t.roomId === roomId) {
                    var o = visitorRinging.indexOf(t.sessionId);
                    if (-1 !== o && visitorRinging.splice(o, 1), 0 == visitorRinging.length) {
                        n = jQEngager.Event("CallEnded");
                        jQEngager(document).trigger(n)
                    }
                }
                if ("setCallerInfo" === t.type && sessionId !== t.sessionId && t.roomId === roomId) {
                    n = jQEngager.Event("CallerInfo", {
                        sessionId: t.sessionId,
                        callerInfo: t.callerInfo,
                        isAdmin: t.isAdmin
                    });
                    jQEngager(document).trigger(n)
                }
                if ("clearCanvas" === t.type && sessionId !== t.sessionId && t.roomId === roomId && lsDesigner && lsDesigner.clearCanvas(), "sendCallerBack" === t.type && t.roomId === roomId) {
                    n = jQEngager.Event("SendCallerBack", {access: t.access, sessionId: t.sessionId});
                    jQEngager(document).trigger(n)
                }
                if (t.participants && videoConnection && !videoConnection.isInitiator && !videoConnection.extra.broadcaster && t.participants.forEach(function (e) {
                        e.pid !== videoConnection.userid && -1 === videoConnection.getAllParticipants().indexOf(e.pid) && (videoConnection.extra.broadcaster || !1 !== e.broadcaster) && videoConnection.join(e.pid, function (e, t, n) {
                        })
                    }), t.giveAllParticipants && videoConnection && videoConnection.isInitiator && t.roomId == roomId) {
                    var i = [];
                    videoConnection.getAllParticipants().forEach(function (e) {
                        i.push({pid: e, broadcaster: !0 === videoConnection.peers[e].extra.broadcaster})
                    }), connection.socket.emit(connection.socketCustomEvent, {participants: i}), toggleError(smartVideoLocale.msgStore.broadcastViewers + " " + i.length, 5e3)
                }
            }), connection.checkPresence(roomId, function (e, t) {
                !0 === e ? connection.join(roomId, function (e, t, n) {
                    queryString.isAdmin && socket.emit(connection.socketCustomEvent, {
                        type: "adminOnline",
                        role: "popup",
                        sessionId: sessionId,
                        roomId: roomId
                    }), console.log("joined to " + t), n && location.reload()
                }) : connection.open(roomId, function (e, t, n) {
                    queryString.isAdmin && socket.emit(connection.socketCustomEvent, {
                        type: "adminOnline",
                        role: "popup",
                        sessionId: sessionId,
                        roomId: roomId
                    }), console.log(e, t, n), n && location.reload()
                }), "admin" === role && (connection.isInitiator = !0)
            })
        })
    }, this.renegotiate = function (e) {
        facingMode = "user" === facingMode ? "environment" : "user", navigator.mediaDevices.getUserMedia({
            video: {facingMode: facingMode},
            audio: audio_on
        }).then(function (e) {
            !function (e, t) {
                t ? videoConnection.lastCamera || (videoConnection.lastCamera = videoConnection.attachStreams[0]) : videoConnection.lastCamera = e;
                videoConnection.getAllParticipants().forEach(function (t) {
                    var n = videoConnection.peers[t].peer;
                    if (n.getSenders) {
                        var o = e.clone().getVideoTracks()[0], i = e.clone().getAudioTracks()[0];
                        n.getSenders().forEach(function (e) {
                            console.log(e, e.track), e && e.track && ("video" === e.track.kind && o ? (e.track.id != o.id && e.replaceTrack(o), o = null) : "audio" === e.track.kind && i && (e.track.id != i.id && e.replaceTrack(i), i = null))
                        })
                    }
                })
            }(e)
        }), videoConnection.streamEvents.selectAll({local: !0}).forEach(function (e) {
            e.stream.isAudio && e.stream.getAudioTracks()[0].stop(), e.stream.isVideo && e.stream.getVideoTracks()[0].stop()
        }), videoConnection.attachStreams.forEach(function (e) {
            e.stop()
        }), streamConstraints = {
            video: e ? {deviceId: {exact: e}} : {facingMode: facingMode},
            audio: audio_on
        }, videoConnection.mediaConstraints = streamConstraints, videoConnection.session = {
            video: !0,
            audio: audio_on
        }, videoConnection.join(roomId + "_video")
    }, this.initCall = function (t, n, o, i, r, a, s) {
        videoConnection.extra.roomOwner = !0;
        var d = t || ("initVideo" === this.id ? "Video" : "Audio"), c = r ? {deviceId: {exact: r}} : {};
        audio_on || (c = !1), s && jQEngager.extend(!0, c, s);
        var l = o ? {deviceId: {exact: o}} : {facingMode: facingMode};
        switch (a && jQEngager.extend(!0, l, a), d) {
            case"Video":
                var u = !0;
                streamConstraints = {video: l, audio: c};
                break;
            case"Audio":
                u = !1, streamConstraints = {audio: c, video: !1};
                break;
            default:
                u = !0, streamConstraints = {video: l, audio: c}
        }
        if (queryString.broadcast)videoConnection.session = {
            audio: !(!queryString.isAdmin && !localStorage.getItem("hasPrivileges")),
            video: !!queryString.isAdmin,
            broadcast: !0
        }, videoConnection.mediaConstraints = {
            audio: !(!queryString.isAdmin && !localStorage.getItem("hasPrivileges")) && c,
            video: !!queryString.isAdmin && l
        }, queryString.isAdmin || localStorage.getItem("hasPrivileges") ? (videoConnection.extra.broadcaster = !0, videoConnection.openOrJoin(roomId + "_video", function (e, t, n) {
            n && console.error("openOrJoin", n, t)
        })) : (videoConnection.extra.roomOwner = !1, e.joinBroadcastLooper()); else {
            videoConnection.DetectRTC.load(function () {
                var t = [];
                if (videoConnection.DetectRTC.videoInputDevices.forEach(function (e) {
                        var n = {};
                        n.value = e.id, n.text = e.label, t.push(n)
                    }), 0 === videoConnection.DetectRTC.videoInputDevices.length) {
                    var o = jQEngager.Event("VideoRemoved");
                    jQEngager(document).trigger(o), socket.emit(connection.socketCustomEvent, {
                        type: "remoteVideoMuted",
                        role: role,
                        tenant: tenant,
                        sessionId: i,
                        roomId: roomId
                    })
                }
                if (0 === videoConnection.DetectRTC.audioInputDevices.length) {
                    o = jQEngager.Event("AudioRemoved");
                    jQEngager(document).trigger(o), socket.emit(connection.socketCustomEvent, {
                        type: "remoteAudioMuted",
                        role: role,
                        tenant: tenant,
                        sessionId: i,
                        roomId: roomId
                    })
                }
                if (videoConnection.DetectRTC.videoInputDevices) {
                    o = jQEngager.Event("MediaDevices", {devices: t});
                    jQEngager(document).trigger(o)
                }
                streamConstraints.video = video_on ? streamConstraints.video : streamConstraints.video = !1, streamConstraints.audio = audio_on ? streamConstraints.audio : streamConstraints.audio = !1, videoConnection.mediaConstraints = streamConstraints, videoConnection.session = {
                    video: !!video_on && u,
                    audio: audio_on
                }, video_on || (videoConnection.session.oneway = !0), videoConnection.checkPresence(roomId + "_video", function (t, o) {
                    if (!0 === t ? videoConnection.join(roomId + "_video", function (t, n, o) {
                            o && (console.log(o), e.handleCallTermination(), videoConnection.closeEntireSession(function () {
                                videoConnection.openOrJoin(roomId + "_video")
                            }))
                        }) : videoConnection.open(roomId + "_video", function (t, n, o) {
                            o && (console.log(o), e.handleCallTermination(), videoConnection.closeEntireSession(function () {
                                videoConnection.openOrJoin(roomId + "_video")
                            }))
                        }), !video_on) {
                        var r = jQEngager.Event("LocalVideoStarted");
                        jQEngager(document).trigger(r)
                    }
                    "simple" == conferenceStyle && socket.emit(connection.socketCustomEvent, {
                        type: "initCall",
                        role: role,
                        tenant: tenant,
                        autoaccept: n,
                        sessionId: i,
                        roomId: roomId
                    }), connection.getAllParticipants().forEach(function (e) {
                        visitorRinging.push(e)
                    })
                })
            })
        }
    }, this.leave = function () {
        connection.getAllParticipants().forEach(function (e) {
            connection.disconnectWith(e)
        })
    }, this.toggleAudio = function () {
        var e = 1, t = 1;
        videoConnection.attachStreams.forEach(function (n) {
            n.getAudioTracks().forEach(function (n) {
                e = n.enabled = !n.enabled, t = 0
            })
        }), 1 == t && (videoConnection.mediaConstraints.audio = !0, videoConnection.addStream({audio: !0}));
        var n = e ? "AudioUnmuted" : "AudioMuted", o = e ? "remoteAudioUnmuted" : "remoteAudioMuted", i = jQEngager.Event(n);
        jQEngager(document).trigger(i), socket.emit(connection.socketCustomEvent, {
            type: o,
            role: role,
            tenant: tenant,
            sessionId: sessionId,
            roomId: roomId
        })
    }, this.toggleVideo = function () {
        var e = 1, t = 1;
        videoConnection.attachStreams.forEach(function (n) {
            n.getVideoTracks().forEach(function (n) {
                e = n.enabled = !n.enabled, t = 0
            })
        }), 1 == t && (videoConnection.mediaConstraints.video = !0, videoConnection.addStream({video: !0}), videoConnection.session.oneway = !1);
        var n = e ? "VideoUnmuted" : "VideoMuted", o = e ? "remoteVideoUnmuted" : "remoteVideoMuted", i = jQEngager.Event(n);
        jQEngager(document).trigger(i), socket.emit(connection.socketCustomEvent, {
            type: o,
            role: role,
            tenant: tenant,
            sessionId: sessionId,
            roomId: roomId
        })
    }, this.joinBroadcast = function () {
        videoConnection.streamEvents.selectAll({local: !0}).forEach(function (e) {
            e.stream.isAudio && e.stream.getAudioTracks()[0].stop(), e.stream.isVideo && e.stream.getVideoTracks()[0].stop()
        }), videoConnection.attachStreams.forEach(function (e) {
            e.stop()
        }), videoConnection.mediaConstraints.video = svConfigs.videoScreen.broadcastAttendeeVideo, videoConnection.mediaConstraints.audio = !0, videoConnection.addStream({
            video: svConfigs.videoScreen.broadcastAttendeeVideo,
            audio: !0
        }), videoConnection.session.oneway = !1
    }, this.revokeBroadcast = function () {
        videoConnection.streamEvents.selectAll({local: !0}).forEach(function (e) {
            e.stream.isAudio && e.stream.getAudioTracks()[0].stop(), e.stream.isVideo && e.stream.getVideoTracks()[0].stop()
        }), videoConnection.attachStreams.forEach(function (e) {
            e.stop()
        }), videoConnection.mediaConstraints.video = !1, videoConnection.mediaConstraints.audio = !1, videoConnection.addStream({
            video: !1,
            audio: !1
        }), videoConnection.session.oneway = !0, document.getElementById("localVideo").srcObject = null
    }, this.answerCall = function (t, n, o, i, r, a) {
        var s = i ? {deviceId: {exact: i}} : {};
        if (a && jQEngager.extend(!0, s, a), t)var d = o ? {deviceId: {exact: o}} : {facingMode: facingMode}; else d = !1;
        r && jQEngager.extend(!0, d, r), streamConstraints = {video: d, audio: s}, videoConnection.session = {
            video: t,
            audio: !0
        }, videoConnection.mediaConstraints = streamConstraints, n && setTimeout(function () {
            videoConnection.openOrJoin(roomId + "_video", function (t, n, o) {
                o && (console.log(o), e.handleCallTermination(), location.reload())
            })
        }, 200)
    }, this.startStopIphone = function () {
        facingMode = "user" === facingMode ? "environment" : "user", e.forceStopCall()
    }, this.forceStopCall = function () {
        videoConnection.streamEvents.selectAll({local: !0}).forEach(function (t) {
            t.stream && t.stream.isAudio && t.stream.getAudioTracks().length > 0 && (t.stream.getAudioTracks()[0].stop(), e.getTracks(t.stream, "audio").forEach(function (e) {
                t.stream.removeTrack(e)
            }), e.getTracks(t.stream, "audio").forEach(function (e) {
                t.stream.removeTrack(e)
            })), t.stream && t.stream.isVideo && t.stream.getVideoTracks().length > 0 && (t.stream.getVideoTracks()[0].stop(), e.getTracks(t.stream, "video").forEach(function (e) {
                t.stream.removeTrack(e)
            }), e.getTracks(t.stream, "video").forEach(function (e) {
                t.stream.removeTrack(e)
            }))
        }), videoConnection.attachStreams.forEach(function (e) {
            e.stop()
        }), videoConnection.leave(), document.getElementById("localVideo").srcObject = null, streamConstraints = {
            video: {facingMode: facingMode = "user" === facingMode ? "environment" : "user"},
            audio: audio_on
        }, videoConnection.mediaConstraints = streamConstraints, videoConnection.session = {
            video: video_on,
            audio: audio_on
        };
        var t = function () {
            videoConnection.getAllParticipants().forEach(function (e) {
                var t, n, o = videoConnection.peers[e].peer;
                o.getSenders && (videoConnection.streamEvents.selectAll({local: !0}).forEach(function (e) {
                    e.stream.isAudio && (n = e.stream.getAudioTracks()[0]), e.stream.isVideo && (t = e.stream.getVideoTracks()[0])
                }), o.getSenders().forEach(function (e) {
                    e && e.track && ("video" === e.track.kind && t ? (e.track.id != t.id && e.replaceTrack(t), t = null) : "audio" === e.track.kind && n && (e.track.id != n.id && e.replaceTrack(n), n = null))
                }))
            })
        };
        videoConnection.checkPresence(roomId, function (e, n) {
            !0 === e ? videoConnection.join(roomId + "_video", function (e, n, o) {
                t()
            }) : connection.open(roomId + "_video", function (e, n, o) {
                t()
            })
        })
    }, this.handleCallTermination = function () {
        videoConnection && "conference" != conferenceStyle && (videoConnection.streamEvents.selectAll({local: !0}).forEach(function (t) {
            t.stream.isAudio && (t.stream.getAudioTracks()[0].stop(), e.getTracks(t.stream, "audio").forEach(function (e) {
                t.stream.removeTrack(e)
            })), t.stream.isVideo && (t.stream.getVideoTracks()[0].stop(), e.getTracks(t.stream, "video").forEach(function (e) {
                t.stream.removeTrack(e)
            }))
        }), videoConnection.attachStreams.forEach(function (e) {
            e.stop()
        }), 0 == videoConnection.getAllParticipants().length ? videoConnection.closeSocket() : videoConnection.leave())
    }, this.reconnectWebsocket = function (t) {
        forceClose || (console.log("WebSocketClient reconnecting in " + autoReconnectInterval, t), setTimeout(function () {
            console.log("WebSocketClient: reconnecting..."), e.connect()
        }, autoReconnectInterval))
    }, this.getRoomId = function () {
        return roomId
    }, this.checkMediaDevices = function () {
        videoConnection.DetectRTC.load(function () {
            var e = [];
            videoConnection.DetectRTC.videoInputDevices.forEach(function (t) {
                var n = {};
                n.value = t.id, n.text = t.label, e.push(n)
            });
            var t = jQEngager.Event("MediaDevices", {devices: e});
            jQEngager(document).trigger(t)
        })
    }, this.getParticipants = function () {
        return connection.getAllParticipants()
    }, this.getVideoSessions = function () {
        return videoConnection ? videoConnection.getAllParticipants().length : 0
    }, this.getTracks = function (e, t) {
        return e && e.getTracks ? e.getTracks().filter(function (e) {
            return e.kind === (t || "audio")
        }) : []
    }, this.addStreamStopListener = function (e, t) {
        e.addEventListener("ended", function () {
            t(), t = function () {
            }
        }, !1), e.addEventListener("inactive", function () {
            t(), t = function () {
            }
        }, !1), e.getTracks().forEach(function (e) {
            e.addEventListener("ended", function () {
                t(), t = function () {
                }
            }, !1), e.addEventListener("inactive", function () {
                t(), t = function () {
                }
            }, !1)
        })
    }, this.addToJoinScreenShare = function () {
        screenConnection && screenConnection.checkPresence(roomId + "_screen", function (e, t, n) {
            setTimeout(function () {
                screenConnection.isInitiator = !1, screenConnection.extra.sessionId !== sessionId && (screenConnection.extra = {sessionId: sessionId}), e && screenConnection.join(roomId + "_screen", function (e, t, n) {
                    n && console.error("join", n, roomId + "_screen")
                })
            }, 1e3)
        })
    }, this.startScreenShareConf = function () {
        e.startScreenConnection(!0, sessionId)
    }, this.screenHelper = function (e) {
        if (svConfigs.videoScreen.screenConstraint)var t = svConfigs.videoScreen.screenConstraint; else t = {
            mandatory: {
                maxWidth: screen.width > 1920 ? screen.width : 1920,
                maxHeight: screen.height > 1080 ? screen.height : 1080
            }, optional: []
        };
        navigator.mediaDevices.getDisplayMedia ? navigator.mediaDevices.getDisplayMedia(t).then(t => {e(t)}, e =>
        {
            var t = jQEngager.Event("ScreenShareEnded");
            jQEngager(document).trigger(t)
        }
        ):
        navigator.getDisplayMedia ? navigator.getDisplayMedia(t).then(t => {e(t)}, e =>
        {
            var t = jQEngager.Event("ScreenShareEnded");
            jQEngager(document).trigger(t)
        }
        ):
        toggleNotification("getDisplayMedia API is not available in this browser.", !0)
    };
    var t = !1;
    this.getScreenStream = function (n) {
        e.screenHelper(function (o) {
            RMCMediaTrack.screen = e.getTracks(o, "video")[0], RMCMediaTrack.selfVideo.srcObject = o, function e() {
                "ended" !== RMCMediaTrack.screen.readyState ? setTimeout(e, 1e3) : RMCMediaTrack.screen.onended()
            }(), t = !1, RMCMediaTrack.screen.onended = function () {
                e.handleScreenShareTermination()
            }, n(o)
        })
    }, this.replaceTrack = function (e) {
        e && "ended" !== e.readyState && videoConnection.getAllParticipants().forEach(function (t) {
            var n = videoConnection.peers[t].peer;
            if (n.getSenders) {
                var o = e;
                n.getSenders().forEach(function (e) {
                    e && e.track && "video" === e.track.kind && o && (e.replaceTrack(o), o = null)
                })
            }
        })
    }, this.startScreenShare = function () {
        RMCMediaTrack.cameraStream ? e.getScreenStream(function (t) {
            videoConnection.getAllParticipants().length > 0 && e.replaceTrack(RMCMediaTrack.screen), videoConnection.attachStreams.forEach(function (t) {
                e.getTracks(t, "video").forEach(function (e) {
                    t.removeTrack(e)
                }), t.addTrack(RMCMediaTrack.screen)
            })
        }) : (videoConnection.mediaConstraints.screen = !0, videoConnection.addStream({
            video: !0,
            screen: !0
        }), videoConnection.extra.screen = !0), socket.emit(connection.socketCustomEvent, {
            type: "startScreenshare",
            role: role,
            tenant: tenant,
            sessionId: sessionId,
            roomId: roomId
        })
    }, this.rejectCall = function () {
        socket.emit(connection.socketCustomEvent, {
            type: "rejectCall",
            role: role,
            tenant: tenant,
            sessionId: sessionId,
            roomId: roomId
        })
    }, this.stopRecording = function () {
    }, this.getSessionId = function () {
        return sessionId
    }, this.getRemoteSessionId = function () {
        return ""
    }, this.getVideoStream = function () {
        var e = !1;
        return videoConnection ? videoConnection.attachStreams.forEach(function (t) {
            t.getVideoTracks().forEach(function (t) {
                e = t.enabled
            })
        }) : e = !1, e
    }, this.getStream = function () {
        return !!videoConnection && videoConnection.getAllParticipants().length > 0
    }, this.getRemoteStream = function (e) {
        var t;
        return videoConnection && Object.keys(videoConnection.streamEvents).forEach(function (n) {
            var o = videoConnection.streamEvents[n];
            if (o.stream && o.extra.sessionId == e)return t = o.stream, !1
        }), t
    }, this.endCall = function (t) {
        socket.emit(connection.socketCustomEvent, {
            type: "endCall",
            role: role,
            tenant: tenant,
            sessionId: sessionId,
            roomId: roomId,
            msg: t
        }), videoConnection && (videoConnection.streamEvents.selectAll({local: !0}).forEach(function (t) {
            t.stream.isAudio && (t.stream.getAudioTracks()[0].stop(), e.getTracks(t.stream, "audio").forEach(function (e) {
                t.stream.removeTrack(e)
            })), t.stream.isVideo && (t.stream.getVideoTracks()[0].stop(), e.getTracks(t.stream, "video").forEach(function (e) {
                t.stream.removeTrack(e)
            }))
        }), videoConnection.leave())
    }, this.setMute = function (e) {
        socket.emit(connection.socketCustomEvent, {
            type: "forceAudioMuted",
            role: role,
            tenant: tenant,
            sessionId: e,
            roomId: roomId
        })
    }, this.setMuteAll = function () {
        socket.emit(connection.socketCustomEvent, {
            type: "forceAudioMutedAll",
            role: role,
            tenant: tenant,
            roomId: roomId
        })
    }, this.setDelete = function (e) {
        socket.emit(connection.socketCustomEvent, {
            type: "forceDelete",
            role: role,
            tenant: tenant,
            sessionId: e,
            roomId: roomId
        })
    }, this.setClose = function () {
        forceClose = !0, connection.closeEntireSession()
    }, this.setPresentUser = function (e, t) {
        socket.emit(connection.socketCustomEvent, {
            type: "setPresent",
            role: role,
            tenant: tenant,
            present: t,
            sessionId: e,
            roomId: roomId
        })
    }, this.setDeleteAll = function (e) {
        socket.emit(connection.socketCustomEvent, {
            type: "forceDeleteAll",
            role: role,
            tenant: tenant,
            sessionId: e,
            roomId: roomId
        })
    }, this.revokePriveleges = function (e) {
        socket.emit(connection.socketCustomEvent, {
            type: "revokePriveleges",
            role: role,
            tenant: tenant,
            sessionId: e,
            roomId: roomId
        })
    }, this.blockUser = function (e) {
        socket.emit(connection.socketCustomEvent, {
            type: "blockUser",
            role: role,
            tenant: tenant,
            sessionId: e,
            roomId: roomId
        })
    }, this.endMeeting = function (e) {
        socket.emit(connection.socketCustomEvent, {
            type: "endMeeting",
            role: role,
            tenant: tenant,
            sessionId: e,
            roomId: roomId
        })
    }, this.toVideo = function () {
        socket.emit(connection.socketCustomEvent, {
            type: "toVideo",
            role: role,
            tenant: tenant,
            sessionId: sessionId,
            roomId: roomId
        })
    }, this.grantPriveleges = function (e) {
        socket.emit(connection.socketCustomEvent, {
            type: "grantPriveleges",
            role: role,
            tenant: tenant,
            sessionId: e,
            roomId: roomId
        })
    }, this.getScreenStreamConnections = function () {
        return !!screenConnection && screenConnection.getAllParticipants().length > 0
    }, this.startRecording = function () {
        socket.emit(connection.socketCustomEvent, {
            type: "startRecording",
            role: role,
            tenant: tenant,
            sessionId: sessionId,
            roomId: roomId
        })
    }, this.stopRecording = function () {
        socket.emit(connection.socketCustomEvent, {
            type: "stopRecording",
            role: role,
            tenant: tenant,
            sessionId: sessionId,
            roomId: roomId
        })
    }, this.setCallerInfo = function (e, t) {
        socket.emit(connection.socketCustomEvent, {
            type: "setCallerInfo",
            role: role,
            tenant: tenant,
            sessionId: sessionId,
            roomId: roomId,
            callerInfo: e,
            isAdmin: t
        }), connection.extra = {
            role: role,
            name: name,
            tenant: tenant,
            sessionId: sessionId,
            roomId: roomId,
            isAdmin: queryString.isAdmin || "admin" == role ? 1 : 0,
            pass: requirePassComm,
            callerInfo: e
        }
    }, this.sendCallerBack = function (e, t) {
        socket.emit(connection.socketCustomEvent, {
            type: "sendCallerBack",
            role: role,
            tenant: tenant,
            sessionId: t,
            roomId: roomId,
            access: e
        })
    }, this.handleScreenShareTermination = function () {
        if (queryString.broadcast || !svConfigs.videoScreen.separateScreenShare) {
            if (t)return;
            t = !0, RMCMediaTrack.cameraStream && (e.getTracks(RMCMediaTrack.cameraStream, "video")[0].readyState && (e.getTracks(RMCMediaTrack.cameraStream, "video").forEach(function (e) {
                RMCMediaTrack.cameraStream.getVideoTracks()[0].stop(), RMCMediaTrack.cameraStream.removeTrack(e)
            }), RMCMediaTrack.cameraStream.addTrack(RMCMediaTrack.cameraTrack)), RMCMediaTrack.selfVideo.srcObject = RMCMediaTrack.cameraStream, e.replaceTrack(RMCMediaTrack.cameraTrack), videoConnection.attachStreams = [RMCMediaTrack.cameraStream]);
            var n = jQEngager.Event("ScreenShareEnded");
            jQEngager(document).trigger(n)
        } else {
            if (!screenConnection)return;
            screenConnection && screenConnection.streamEvents.selectAll({local: !0}).forEach(function (e) {
                e.stream.getVideoTracks()[0].stop()
            }), screenConnection.attachStreams.forEach(function (e) {
                e.stop()
            }), screenConnection.isInitiator = !1, screenConnection.extra = {sessionId: null}, screenConnection.closeSocket()
        }
    }, this.addLocalChat = function (e, t, n) {
        e && e.replace(/ /g, "").length && (connection.send({
            chatMessage: e,
            privateId: n,
            date: t,
            sessionId: sessionId
        }), connection.send({typing: !1}))
    }, this.sendTranslateMessage = function (e) {
        e && e.replace(/ /g, "").length && connection.send({translateMessage: e, sessionId: sessionId})
    }, this.sendTyping = function (e) {
        e ? connection.send({typing: !0}) : connection.send({typing: !1})
    }, this.getFileHTML = function (e) {
        return '<a href="' + (e.url || URL.createObjectURL(e)) + '" target="_blank" download="' + e.name + '">Download: <b>' + e.name + "</b></a>"
    }, this.getFullName = function (e) {
        var t = e;
        return connection.peers[e] && connection.peers[e].extra && connection.peers[e].extra.userFullName && (t = connection.peers[e].extra.userFullName), t
    }, this.sendFile = function (e) {
        recentFile = e, connection.getAllParticipants().length >= 1 && (recentFile.userIndex = 0, connection.send(recentFile, connection.getAllParticipants()[recentFile.userIndex]))
    }, this.setWhiteboardTools = function () {
        lsDesigner && (lsDesigner.destroy(), lsDesigner = null), e.startWhiteboard()
    }, this.whiteboardTools = function () {
        lsDesigner.setSelected("pencil"), lsDesigner.setTools({
            line: !0,
            arrow: !0,
            pencil: !0,
            marker: !0,
            dragSingle: !0,
            dragMultiple: !0,
            eraser: !0,
            pdf: !0,
            rectangle: !0,
            arc: !0,
            text: !0,
            image: !0,
            zoom: !0,
            lineWidth: !0,
            colorsPicker: !0,
            extraOptions: !0,
            undo: !0
        }), lsDesigner.icons = {
            pencil: lsRepUrl + "img/whiteboard/pencil.png",
            marker: lsRepUrl + "img/whiteboard/brush.png",
            eraser: lsRepUrl + "img/whiteboard/eraser.png",
            text: lsRepUrl + "img/whiteboard/text.png",
            image: lsRepUrl + "img/whiteboard/image.png",
            dragSingle: lsRepUrl + "img/whiteboard/dragSingle.png",
            dragMultiple: lsRepUrl + "img/whiteboard/dragMultiple.png",
            line: lsRepUrl + "img/whiteboard/line.png",
            arrow: lsRepUrl + "img/whiteboard/arrow.png",
            pdf: lsRepUrl + "img/whiteboard/pdf.png",
            zoom_in: lsRepUrl + "img/whiteboard/zoom_in.png",
            zoom_out: lsRepUrl + "img/whiteboard/zoom_out.png",
            arc: lsRepUrl + "img/whiteboard/arc.png",
            rectangle: lsRepUrl + "img/whiteboard/rectangle.png",
            lineWidth: lsRepUrl + "img/whiteboard/lineWidth.png",
            undo: lsRepUrl + "img/whiteboard/undo.png",
            colorsPicker: lsRepUrl + "img/whiteboard/colorsPicker.png",
            extraOptions: lsRepUrl + "img/whiteboard/extraOptions.png"
        }
    }, this.initHark = function (e) {
        if (!window.hark)throw"Please link hark.js";
        var t = e.connection, n = e.streamedObject, o = hark(e.stream, {});
        o.on("speaking", function () {
            t.onspeaking(n)
        }), o.on("stopped_speaking", function () {
            t.onsilence(n)
        })
    }, this.startWhiteboard = function () {
        if (!lsDesigner) {
            (lsDesigner = new CanvasDesigner).widgetHtmlURL = lsRepUrl + "pages/whiteboard.html", lsDesigner.widgetJsURL = lsRepUrl + "js/whiteboard.widget.js", queryString.isAdmin || svConfigs.whiteboard.allowAnonymous || localStorage.getItem("hasPrivileges") ? (e.whiteboardTools(), lsDesigner.addSyncListener(function (e) {
                connection.send({width: screen.width, whiteboardData: e})
            })) : (lsDesigner.setTools({}), lsDesigner.setSelected("")), lsDesigner.pointsLength <= 0 && setTimeout(function () {
                connection.send("plz-sync-points")
            }, 1e3);
            var t = document.getElementById("whiteboard_canvas");
            lsDesigner.appendTo(t)
        }
        setTimeout(function () {
            lsDesigner.sync()
        }, 2e3)
    }, this.clearCanvas = function () {
        lsDesigner && (lsDesigner.clearCanvas(), socket.emit(connection.socketCustomEvent, {
            type: "clearCanvas",
            role: role,
            tenant: tenant,
            sessionId: sessionId,
            roomId: roomId
        }))
    }, this.showStatusBar = function (e, t) {
        console.log("showStatusBar", e), jQEngager("#statusbar").html(e), jQEngager("#statusbar").show(), setTimeout(function () {
            jQEngager("#statusbar").hide()
        }, t)
    }
};
!function (e) {
    var t, n = {
        msgStore: {}, persistMsgStore: function (n) {
            e.localStorage ? (localStorage.setItem("msgStore", JSON.stringify(n)), this.msgStore = n) : this.msgStore = n;
            var o = t.Event("LSLocaleUpdated");
            t(document).trigger(o)
        }, setLanguage: function (e, o) {
            t.ajax({
                url: o + "locales/" + e + ".json", dataType: "json", success: function (e) {
                    n.persistMsgStore(e)
                }, error: function (e) {
                    t.getJSON(o + "locales/en_US.json", function (e) {
                        n.persistMsgStore(e)
                    })
                }
            })
        }, initMsgStore: function (e) {
            var t = e.lang;
            n.setLanguage(t, e.lsRepUrl)
        }, init: function (n, o) {
            t = o;
            var i = "";
            e.localStorage && null !== (i = localStorage.getItem("msgStore")) ? (this.initMsgStore(n), this.msgStore = JSON.parse(i)) : this.initMsgStore(n)
        }
    };
    e.smartVideoLocale = n
}(window);
var caller_name, caller_phone, caller_avatar, caller_email, peer_name, peer_phone, peer_avatar, peer_logo, peer_background, peer_email, lsRepUrl, ui_handler, notify_handler, jQEngager, pluginInstalled, pluginController, comm_controller, visitors, queryString, videoDevices, multiStreamRecorder, agentId, recordScreen, recordCamera, recordingTimer, videoDefault, videoCurrent, audioSource, videoSource, testAudioTrack, testVideoTrack, videoSelect, audioInputSelect, audioOutputSelect, sourceBuffer, passRoom, agentAvatar, visitorName, agentName, datetime, duration, token, room, disableVideo, disableAudio, disableScreenShare, disableWhiteboard, disableTransfer, autoAcceptVideo, autoAcceptAudio, translator, uiHandler = function () {
    var e, t, n = this;
    this.init = function (n, o, i) {
        e = n, o, t = i
    }, this.setMobileChatOnly = function () {
        (isAndroid || isiPhone) && e(".wd-v-share").hide(), n.displayChatOnly()
    }, this.setVideoBoxOff = function (t) {
        audio_on = !1, video_on = !1, n.setMuteButton(), n.setVideoButton(), e("#wd-widget-content-" + t + " .wd-video-box-on").hide(), e("#wd-widget-content-video-ringing").hide(), e("#wd-widget-content-video-waiting").hide(), e("#unsupported_div").show()
    }, this.toggleHeaderChat = function (t) {
        e(".header-auido-video").hide()
    }, this.displayScreenShare = function () {
        svConfigs.videoScreen && !0 === svConfigs.videoScreen.chat ? (e(".wd-chat-box").show(), e(".wd-video-box").css("width", "70%"), e(".wd-chat-box").css("width", "30%")) : (e(".wd-chat-box").hide(), e(".wd-video-box").css("width", "100%"), e(".wd-video-box").css("border-right", 0)), e(".wd-avatar-agent").hide(), e("#mainleft_div").show(), e("#wd-widget-content-whiteboard").hide(), e("#wd-widget-content-video").show()
    }, this.displayVideoOnly = function () {
        "simple" == conferenceStyle && svConfigs.videoScreen && !0 === svConfigs.videoScreen.chat ? (e(".wd-chat-box").show(), e(".wd-video-box").css("width", "70%"), e(".wd-chat-box").css("width", "30%")) : (e(".wd-chat-box").hide(), e(".wd-video-box").css("width", "100%"), e(".wd-video-box").css("border-right", 0)), e("#mainleft_div").show(), e("#wd-widget-content-whiteboard").hide(), e("#wd-widget-content-video").show(), e("." + classVideo).each(function () {
            var t = this.id;
            e("#" + t).detach().appendTo("#" + videoElementContainer), e("#" + t).removeClass("smallvideo")
        })
    }, this.displayChatOnly = function () {
        t.getStream(t.getRemoteSessionId()) ? (e("#call_audio_video").hide(), e("#slide_video").show()) : (e("#slide_video").hide(), svConfigs.videoScreen && (!1 === svConfigs.videoScreen.onlyAgentButtons || queryString.isAdmin) && e("#call_audio_video").show()), svConfigs.videoScreen && !0 === svConfigs.videoScreen.chat ? e(".wd-v-text").hide() : e(".wd-v-text").show(), e("#mainleft_div").hide(), e(".wd-chat-box").show(), e(".wd-chat-box").css("width", "100%"), e("#wd-widget-content-whiteboard").hide()
    }, this.restoreVideoBox = function () {
        "conference" == conferenceStyle ? (e("#wd-widget-content-greenroom").hide(), e("#wd-widget-content-prev").hide(), isAndroid || isiPhone || (stopFullScreenPopup(), e("#invideo").attr("style", "")), e("#invideo").show(), e(".wd-video-c").hide()) : (e("#call_audio_video").hide(), isAndroid || isiPhone || (stopFullScreenPopup(), e("#mainleft_div").attr("style", "")), e("#mainleft_div").show())
    }, this.syncVideoChatPanelsPos = function () {
        var t = e("#newdev_video"), n = e("#newdev_chat");
        e("#newdev_video").is(":visible") ? (panel_xpos = t.css("left"), panel_ypos = t.css("top"), n.css("left", panel_xpos), n.css("top", panel_ypos)) : e("#newdev_chat").is(":visible") && (panel_xpos = n.css("left"), panel_ypos = n.css("top"), t.css("left", panel_xpos), t.css("top", panel_ypos))
    }, this.setScreenDisabled = function (t) {
        t ? (e(".wd-v-share").addClass("disabled"), e("#screenshare_div").addClass("disabled"), "simple" == conferenceStyle ? e("." + classVideo).each(function () {
            var t = this.id;
            e("#" + t).detach().appendTo("#small_video"), e("#" + t).addClass("smallvideo")
        }) : e(".bigvideo").hide()) : (e(".wd-v-share").removeClass("disabled"), e("#screenshare_div").removeClass("disabled"), "simple" == conferenceStyle ? e("." + classVideo).each(function () {
            var t = this.id;
            e("#" + t).detach().appendTo("#" + videoElementContainer), e("#" + t).removeClass("smallvideo")
        }) : (e(".bigvideo").show(), e(".sourcevideo").show()))
    }, this.setDisabled = function (t) {
        t ? (e("#raisehand_div").addClass("disabled"), e("#exit_meeting").addClass("disabled"), e("#call_video").addClass("disabled"), e("#call_audio").addClass("disabled"), e("#file_transfer").addClass("disabled"), e("#startscreenshare").addClass("disabled"), e("#callButton_1").addClass("disabled"), e("#callAudioButton_1").addClass("disabled"), e("#newdev_chat_message1").addClass("disabled"), e("#whiteboard").addClass("disabled"), e("#startVideoButton").addClass("disabled"), e(".startVideoButton").addClass("disabled"), e("#answer_call_button").addClass("disabled"), e("#answer_audiocall_button").addClass("disabled"), e("#reject_call_button").addClass("disabled"), e(".wd-v-share").addClass("disabled")) : (e("#raisehand_div").removeClass("disabled"), e("#exit_meeting").removeClass("disabled"), e("#call_video").removeClass("disabled"), e("#call_audio").removeClass("disabled"), e("#startscreenshare").removeClass("disabled"), e("#file_transfer").removeClass("disabled"), (queryString.room || queryString.broadcast) && e("#callButton_1").removeClass("disabled"), queryString.room && e("#callAudioButton_1").removeClass("disabled"), e("#newdev_chat_message1").removeClass("disabled"), e("#whiteboard").removeClass("disabled"), e("#startVideoButton").removeClass("disabled"), e(".startVideoButton").removeClass("disabled"), e("#answer_call_button").removeClass("disabled"), e("#answer_audiocall_button").removeClass("disabled"), e("#reject_call_button").removeClass("disabled"), e(".wd-v-share").removeClass("disabled"))
    }, this.toggleWidget = function () {
        e("#nd_widget_content").toggle(), e(".agent-address-wd").hide(), e("#peer_email_video").toggle(!1)
    }, this.toggleVisitors = function (t) {
        e("#nd_widget_visitors").toggle(t)
    }, this.setAgentOnlyButtons = function () {
        e("#startVideoButton").hide(), e(".wd-v-pickupaudio").hide(), e(".wd-v-pickup").hide(), e(".wd-v-share").hide(), e(".header-auido-video").hide()
    }, this.disableScreenShare = function () {
        e(".wd-v-share").hide(), e("#startscreenshare").hide()
    }, this.disableVideo = function () {
        e("#startVideoButton").hide(), e(".wd-v-pickup").hide(), e("#call_video").hide(), e("#answer_call_button").hide(), e(".muteVideo").prop("checked", !0), e(".muteVideo").hide(), e(".turnOffCamera").hide()
    }, this.disableAudio = function () {
        e(".wd-v-pickupaudio").hide(), e("#call_audio").hide(), e("#answer_audiocall_button").hide(), e(".muteAudio").prop("checked", !0), e(".muteAudio").hide(), e(".muteMe").hide()
    }, this.disableWhiteboard = function () {
        e("#whiteboard").hide()
    }, this.disableTransfer = function () {
        e("#file_transfer").hide()
    }, this.setVideoBox = function () {
        e("#recordingIcon").hide(), e("#newdev_video").show(), e("#mainleft_div").children().hide(), e("#video_container").show(), e("#video_container_oneway").hide(), e("#video_container_oneway_agent").hide(), e(".wd-v-nosound").removeClass("disabledDiv"), e("#video_back").show()
    }, this.setOneWay = function () {
        e("#localVideo").hide(), e("#video_container_oneway").show(), e("#local_video_div").hide(), e(".wd-v-video").attr("class", "wd-v-novideo"), e(".wd-v-novideo").addClass("disabledDiv"), e(".wd-v-sound").attr("class", "wd-v-nosound"), e(".wd-v-nosound").addClass("disabledDiv")
    }, this.togglePermissionError = function () {
        n.syncVideoChatPanelsPos(), n.togglePermissionWidget(!1), n.setVideoBox(), e("#permission_browsers_error").children().hide(), isChrome && e("#permission_div_error_chrome").show(), isFirefox && e("#permission_div_error_firefox").show(), e("#wd-widget-error").show(), n.setVideoButton()
    }, this.toggleInstaWhiteboard = function () {
        window.resizeTo(window.screen.availWidth, window.screen.availHeight), stopIncomingCall(), n.syncVideoChatPanelsPos(), e("#mainleft_div").show(), "simple" == conferenceStyle && svConfigs.videoScreen && !0 === svConfigs.videoScreen.chat ? (e(".wd-chat-box").show(), e(".wd-chat-box").css("width", "30%"), e(".wd-video-box").css("width", "70%"), e(".wd-video-box").css("border-right", 0), e(".wd-v-text").hide()) : (e(".wd-chat-box").hide(), e(".wd-video-box").css("width", "100%"), e(".wd-video-box").css("border-right", 0), e(".wd-v-text").show()), e("#wd-widget-content-whiteboard").show(), e("#wd-widget-content-chat-main").hide(), e("#wd-widget-content-video").hide(), e("#wd-avatar-agent").hide(), e("#video_container_chat").hide(), (queryString.isAdmin || localStorage.getItem("hasPrivileges")) && (e(".wd-v-tovideo").show(), e("#cleanCanvas").show()), e("." + classVideo).each(function () {
            var t = this.id;
            e("#" + t).detach().appendTo("#whiteboard_video"), e("#" + t).addClass("smallvideo")
        }), e(".bigvideo").each(function () {
            var t = this.id;
            e("#" + t).detach().appendTo("#whiteboard_video"), e("#" + t).addClass("smallvideo")
        }), e(".broadcastvideo").each(function () {
            e(this).detach().appendTo("#whiteboard_video"), e(this).addClass("smallvideo")
        })
    }, this.toggleInstaChat = function () {
        stopIncomingCall(), window.outerHeight == screen.availHeight && void 0 !== widgetSize ? stopFullScreenPopup() : stopFullScreen(), e(".wd-video-c").removeClass("disabled"), n.syncVideoChatPanelsPos(), n.togglePermissionWidget(!0), n.setVideoBox(), e("#recordingIcon").hide(), e("#wd-widget-content-chat-main").show(), e("#wd-avatar-agent").show(), svConfigs.videoScreen && !0 === svConfigs.videoScreen.chat ? e(".wd-v-text").hide() : e(".wd-v-text").show(), e(".wd-v-recording").hide(), e("#video_container_chat").hide(), e("#wd-widget-content-whiteboard").hide(), audio_on = video_on = !0, n.setVideoButton(), n.setMuteButton()
    }, this.toggleInstaChatScreen = function () {
        n.syncVideoChatPanelsPos(), n.togglePermissionWidget(!0), n.setVideoBox(), e("#wd-widget-content-chat-main").show(), e(".wd-avatar-agent").hide(), e("#video_container_chat").show(), e("#wd-widget-content-whiteboard").hide(), n.setVideoButton(), n.setMuteButton()
    }, this.onIncomingChat = function () {
        n.restoreVideoBox()
    }, this.onIncomingVideo = function () {
        n.restoreVideoBox()
    }, this.toggleRinging = function (t) {
        n.setMobileChatOnly(), n.displayVideoOnly(), e("#toggle_icon").removeClass("video"), e("#wd-widget-content-video").hide(), e("#wd-widget-content-chat-main").hide(), e("#wd-widget-content-video-waiting").hide(), e("#wd-widget-content-video-ringing").show(), e("#wd-widget-content-whiteboard").hide(), e("#answer_call_button").off(), e("#answer_audiocall_button").off(), e("#reject_call_button").off(), e("#answer_call_button").on("click", function () {
            video_on = !0, n.setVideoButton(), n.toggleVideoBox(!1), t(!0)
        }), e("#answer_audiocall_button").on("click", function () {
            isiPhone ? (video_on = !0, video_iphone_on = !1) : video_on = !1, n.setVideoButton(), t(!0), n.toggleVideoBox(!1)
        }), e("#reject_call_button").on("click", function () {
            t(!1), n.toggleInstaChat()
        })
    }, this.toggleVideoBox = function (t) {
        stopIncomingCall(), e("#wd-widget-content-chat-main").hide(), e("#wd-widget-content-greenroom").hide(), e("#wd-widget-content-prev").hide(), e("#wd-widget-content-video-ringing").hide(), e("#wd-widget-content-whiteboard").hide(), !0 === t ? (svConfigs.videoScreen && !0 === svConfigs.videoScreen.chat ? (e("#call_audio_video").hide(), e(".wd-v-text").hide()) : e(".wd-v-text").show(), e("#wd-widget-content-video").show(), e("#wd-widget-content-video-waiting").hide(), e("." + classVideo).each(function () {
            var t = this.id;
            e("#" + t).detach().appendTo("#" + videoElementContainer), e("#" + t).removeClass("smallvideo")
        })) : 4 == t ? (e(".wd-chat-box").hide(), e(".wd-video-box").css("width", "100%"), e(".wd-video-box").css("border-right", 0), e("#wd-widget-content-greenroom").show(), e("#wd-widget-content-video").hide(), e("#wd-widget-content-video-waiting").hide()) : (e("#wd-widget-content-video").hide(), e("#wd-widget-content-video-waiting").show(), "simple" == conferenceStyle && svConfigs.videoScreen && !0 === svConfigs.videoScreen.chat ? (e(".wd-chat-box").show(), e(".wd-video-box").css("width", "70%"), e(".wd-chat-box").css("width", "30%")) : (e(".wd-chat-box").hide(), e(".wd-video-box").css("width", "100%"), e(".wd-video-box").css("border-right", 0)))
    }, this.setWidgetValues = function () {
        e("#peer_name_video").html(peer_name), e(".peer_name_video").html(peer_name), e("#peer_name_chat").html(peer_name), e(".dw-chat-avatar").attr("src", peer_avatar), e("#peer_email_video").html(peer_email), e("#peer_email_chat").html(peer_email), e(".agent-address-wd a").attr("href", "mailto:" + peer_email), e("#peer_phone_video").html(peer_phone), e("#peer_phone_chat").html(peer_phone);
        var t = getCurrentTime();
        e("#timestamp").html(t), peer_avatar ? e("#nd_widget_content .peer_avatar").attr("src", peer_avatar) : e("#nd_widget_content .peer_avatar").attr("src", lsRepUrl + "img/small-avatar.jpg");
        var n = document.querySelector(".bg-site4");
        peer_background && null != n && (n.style.background = "url(" + peer_background + ") no-repeat center center", n.style.backgroundSize = "cover"), peer_logo && (e("#nd_widget_content .firm-logo-wd img").attr("src", peer_logo), e("#nd_widget_content .firm-logo-wd img").width(100), e("#nd_widget_content .firm-logo-wd img").height("auto")), e("#popup_widget_text").html(popup_message)
    }, this.toggleInstaVideo = function (e) {
        n.syncVideoChatPanelsPos(), n.setMuteButton(), n.setVideoBox(), n.setVideoButton(), n.toggleVideoBox(e)
    }, this.togglePermissionWidget = function (t, o, i) {
        isAndroid || (t ? (o ? e("#wd-widget-content-video-waiting").show() : e("#wd-widget-content-video-waiting").hide(), e("#permission_div").hide()) : (e("#wd-widget-content-chat-main").hide(), e("#wd-widget-content-video-waiting").hide(), n.permissionDisplay()))
    }, this.permissionDisplay = function () {
        var t = video_on ? "video" : "";
        e("#permission_browsers").children().hide(), e("#permission_div_span").show(), isChrome && e("#permission_div_chrome" + t).show(), isFirefox && e("#permission_div_firefox" + t).show(), isIEA && e("#permission_div_ie" + t).show(), e("#wd-widget-content-video-waiting").hide(), e("#permission_div").show()
    }, this.resetCallHoldState = function () {
        e("#on_hold").hide()
    }, this.setMuteButton = function () {
        audio_on ? (e(".wd-v-nosound").attr("class", "wd-v-sound"), e(".fa-microphone-slash").closest("a").addClass("active")) : (e(".wd-v-sound").attr("class", "wd-v-nosound"), e(".fa-microphone-slash").closest("a").removeClass("active"))
    }, this.setRecordingUi = function (t) {
        t ? (e(".wd-v-recording").removeClass("recording-off"), e(".wd-v-recording").addClass("recording-on"), e("#startRecording").addClass("active")) : (e(".wd-v-recording").removeClass("recording-on"), e(".wd-v-recording").addClass("recording-off"), e("#startRecording").removeClass("active"))
    }, this.setScreenButton = function (t) {
        !isChrome && !isFirefox || isAndroid || isiPhone || (t ? (e(".wd-v-share").hide(), e(".wd-v-stopshare").show(), e("#startscreenshare").hide(), e("#screensharestop_div").show()) : (e(".wd-v-share").show(), e(".wd-v-stopshare").hide(), e("#screensharestop_div").hide(), e("#startscreenshare").show()))
    }, this.setVideoButton = function () {
        video_on ? (e("#local_video_div").show(), e(".wd-v-novideo").attr("class", "wd-v-video"), e(".fa-video-camera").closest("a").addClass("active")) : (e("#local_video_div").hide(), e(".wd-v-video").attr("class", "wd-v-novideo"), e(".fa-video-camera").closest("a").removeClass("active"))
    }, this.showTranslateMessage = function (t) {
        e("#translate_message").css("width", e(".bigvideo.bigvideoadd").css("width")), e("#translate_message").css("bottom", e(".bigvideo.bigvideoadd").css("bottom")), e("#translate_message").show(), e("#translate_message").html(t)
    }, this.setLocalRemote = function (t) {
        e("#localVideo").removeClass("localvideo"), e("#localVideo").addClass(classVideo)
    }, this.setRemoteLocal = function (t) {
        e("#localVideo").removeClass(classVideo), e("#localVideo").addClass("localvideo")
    }
}, notifyHandler = function () {
    var e = this;
    this.init = function () {
        e.isNotificationSupported() ? "granted" !== Notification.permission && Notification.requestPermission() : console.log("Your browser does not support Notifications. Use Latest Chrome/Safari to save the world.")
    }, jQEngager(document).on("EnterPageNotification", function (t) {
        if (!document.hasFocus()) {
            var n = t.name ? t.name : "Visitor";
            e.showNotification(n + " has requested a chat.")
        }
    }), jQEngager(document).on("IncomingCall", function (t) {
        document.hasFocus() || e.showNotification("Visitor is calling you.")
    }), this.showNotification = function (t) {
        if (e.isNotificationSupported())if ("granted" === Notification.permission) {
            var n = new Notification(t, {
                icon: lsRepUrl + "/img/logo.png",
                body: "Click to open the page.",
                vibrate: [500, 110, 500, 110, 500]
            });
            n.onclick = function () {
                try {
                    window.focus()
                } catch (e) {
                    console.log(e)
                }
            }, setTimeout(n.close.bind(n), 1e4)
        } else"denied" !== Notification.permission && Notification.requestPermission().then(function (e) {
            "granted" === e && (n = new Notification("Hi there!"))
        }); else console.log("Your browser does not support Notifications. Use Latest Chrome/Safari to save the world.")
    }, this.requestPermissions = function () {
        "granted" !== Notification.permission && Notification.requestPermission()
    }, this.isNotificationSupported = function () {
        return "Notification" in window
    }
}, popup_instance = null, names = [], popup_message = "", widgetSize = {
    width: 750,
    height: 564
}, video_on = !0, audio_on = !0, isOnline = !1, remoteVideoSessions = 0, inCall = [], videoCurrentId = 0, audioCurrentId = 0, audioOutputCurrentId = 0, startNextCamera = !1, requirePass = !1, timerVars = [], startedRecroding = !1, is_widget_opened = !1, is_callerback = !1, is_chat_opened = !1, isLsvAdmin = !1, main = function () {
    jQEngager = jQuery;
    var e = document.currentScript || document.getElementById("newdev-embed-script");
    if (null == e || null == e) {
        var t = document.getElementsByTagName("script"), n = t.length - 1;
        e = t[n]
    }
    jQuery(document).ready(function (t) {
        if (room = e.getAttribute("data-room_id") ? e.getAttribute("data-room_id") : queryString.room, lsRepUrl = e.getAttribute("data-source_path"), agentAvatar = peer_avatar = e.getAttribute("data-avatar") ? e.getAttribute("data-avatar") : lsRepUrl + "img/small-avatar.jpg", agentName = peer_name = e.getAttribute("data-names") ? e.getAttribute("data-names") : svConfigs.agentName, visitorName = e.getAttribute("data-visitorName") ? e.getAttribute("data-visitorName") : "", passRoom = e.getAttribute("data-pass") ? e.getAttribute("data-pass") : passRoom, datetime = e.getAttribute("data-datetime") ? e.getAttribute("data-datetime") : "", duration = e.getAttribute("data-duration") ? e.getAttribute("data-duration") : "", agentId = e.getAttribute("data-agentId") ? e.getAttribute("data-agentId") : "", isLsvAdmin = e.getAttribute("data-isAdmin") ? e.getAttribute("data-isAdmin") : queryString.isAdmin, (comm_controller = new comController).init("popup", room), (notify_handler = new notifyHandler).init(), localStorage.getItem("prd")) {
            var n = localStorage.getItem("prd");
            n = JSON.parse(n), queryString.isAdmin ? agentName = agentName || n.name : visitorName = visitorName || n.name
        } else agentName = agentName || "";
        localStorage.getItem("facingMode") && (facingMode = localStorage.getItem("facingMode")), localStorage.setItem("facingMode", facingMode), token = queryString.token ? queryString.token : "", disableVideo = !!e.getAttribute("data-disableVideo"), disableAudio = !!e.getAttribute("data-disableAudio"), disableScreenShare = !!e.getAttribute("data-disableScreenShare"), disableWhiteboard = !!e.getAttribute("data-disableWhiteboard"), disableTransfer = !!e.getAttribute("data-disableTransfer"), autoAcceptVideo = !!e.getAttribute("data-autoAcceptVideo"), autoAcceptAudio = !!e.getAttribute("data-autoAcceptAudio"), "conference" == conferenceStyle && (widgetSize = {
            width: 800,
            height: 600
        }), svConfigs.serverSide && svConfigs.serverSide.agentInfo && agentId && t.ajax({
            type: "POST",
            url: lsRepUrl + "/server/script.php",
            data: {type: "getagent", tenant: agentId}
        }).done(function (e) {
            e && (e = JSON.parse(e), agentName = e.first_name + " " + e.last_name)
        }).fail(function () {
        }), (isiPhone || isAndroid) && (svConfigs.videoScreen.chat = !1), svConfigs.videoScreen && !0 === svConfigs.videoScreen.chat && (widgetSize.width = 1052);
        var o = t("<div>", {class: "nd-widget-container_lead", id: "newdev-widget"});
        t(document).on("AdminPopupOffline", function (e) {
            isOnline = !1
        }), t(document).on("VisitorsRoom", function (e) {
            visitors = e.count
        }), t(window).on("unload", function () {
            f(), console.log("close the call")
        });
        var i = function (e) {
            if (names[e.sessionId] || (names[e.sessionId] = {}), e.callerInfo.name && names[e.sessionId] && names[e.sessionId].name !== e.callerInfo.name) {
                if (names[e.sessionId].username)var n = names[e.sessionId].username;
                names[e.sessionId] = {
                    name: e.callerInfo.name,
                    email: e.callerInfo.email
                }, n && (names[e.sessionId].username = n), e.callerInfo.isAdmin && agentName && (names[e.sessionId].name = agentName), t("#peer_name_chat").text(names[e.sessionId].name), function (e) {
                    var n = smartVideoLocale.msgStore.incomingText;
                    if (n && names[e.sessionId] && t("#incoming_text").html(n.replace("{{caller_name}}", names[e.sessionId].name)), e.sessionId !== comm_controller.getSessionId()) {
                        var o = smartVideoLocale.msgStore.joinedChat;
                        if (o && -1 == names[e.sessionId].name.indexOf(svConfigs.anonVisitor)) {
                            var i = o.replace("{{caller_name}}", names[e.sessionId].name);
                            svConfigs.videoScreen && svConfigs.videoScreen.waitingRoom ? toggleError(i, 5e3) : (showMessage("", i, null, "joinedChat"), svConfigs.serverSide.chatHistory && saveChat(i, "", "joinedChat", agentId, "", names))
                        }
                    }
                }(e)
            }
            var o = e.callerInfo.avatar ? e.callerInfo.avatar : lsRepUrl + "img/small-avatar.jpg";
            names[e.sessionId] && (names[e.sessionId].avatar = o, names[e.sessionId].priv = e.callerInfo.priv, e.callerInfo.username && (names[e.sessionId].username = e.callerInfo.username)), names[e.sessionId].muted = e.callerInfo.muted, names[e.sessionId].video = e.callerInfo.video, names[e.sessionId].isAdmin = !!e.callerInfo.isAdmin && e.callerInfo.isAdmin, e.callerInfo.isAdmin && agentName && (names[e.sessionId].name = agentName), t(".dw-chat-avatar").attr("src", o), "conference" !== conferenceStyle && t(".direct-chat-img left " + guestName(e.callerInfo.name)).attr("src", o), u(), r()
        }, r = function () {
            if ("conference" == conferenceStyle) {
                t("#attendeesList").empty();
                var e = 0;
                for (var n in names) {
                    var o = "";
                    n == comm_controller.getSessionId() && (o = " (Me) ");
                    var i = "", a = "", s = "", d = t("ul#attendeesList");
                    if ("undefined" !== names[n].muted && (1 == names[n].muted ? (i = '<i class="fa fa-microphone-slash"></i> ', a = "") : (a = "", i = '<i class="fa fa-microphone"></i> ', n !== comm_controller.getSessionId() && (a = '<span class="user-action"><a data-typeid="' + n + '" href="#" id="muteAttendee' + n + '"><i class="fa fa-fw fa-volume-off"></i> Mute</a></span>'))), "undefined" !== names[n].muted && names[n].video && (s = '<i class="fa fa-tv"></i> '), n !== comm_controller.getSessionId())var c = ' <span class="user-action"><a data-typeid="' + n + '" href="#" id="private' + n + '"><i class="fa fa-comment"></i> Private</a></span>'; else c = "";
                    if (queryString.isAdmin) {
                        var l = blockIcon = "";
                        if (queryString.broadcast) {
                            if (names[n].priv)l = ' <span class="user-action"><a data-typeid="' + n + '" href="#" id="revoke' + n + '"><i class="fa fa-stop-circle-o"></i> ' + (f = smartVideoLocale.msgStore.revoke) + "</a></span>"; else names[n].raiseHand && (l = ' <span class="user-action"><a data-typeid="' + n + '" href="#" id="grant' + n + '"><i class="fa fa-hand-paper-o"></i> ' + (f = smartVideoLocale.msgStore.grant) + "</a></span>");
                            if ((svConfigs.serverSide.loginForm || svConfigs.serverSide.token) && n !== comm_controller.getSessionId()) {
                                var u = smartVideoLocale.msgStore.block;
                                blockIcon = ' <span class="user-action"><a data-typeid="' + n + '" href="#" id="block' + n + '"><i class="fa fa-stop"></i> ' + u + "</a></span>"
                            }
                        }
                        t("<li>" + i + s + '<span class="mx-10">' + names[n].name + o + "</span>" + a + c + l + blockIcon + "</li>").appendTo(d), t("#grant" + n).on("click", function (e) {
                            for (var n in names)names[n].priv && (names[n].priv = !1, comm_controller.revokePriveleges(n));
                            names[t(this).attr("data-typeid")].priv = !0, comm_controller.grantPriveleges(t(this).attr("data-typeid"))
                        }), t("#block" + n).on("click", function (e) {
                            1 == confirm(smartVideoLocale.msgStore.sureBlock) && (t.ajax({
                                type: "POST",
                                url: lsRepUrl + "/server/script.php",
                                data: {type: "blockuser", username: names[t(this).attr("data-typeid")].username}
                            }).done(function (e) {
                                console.log("blocked")
                            }).fail(function () {
                            }), delete names[t(this).attr("data-typeid")], comm_controller.blockUser(t(this).attr("data-typeid")), r(), setTimeout(function () {
                                ui_handler.toggleVisitors(!1), r()
                            }, 500))
                        }), t("#revoke" + n).on("click", function (e) {
                            names[t(this).attr("data-typeid")].priv = !1, comm_controller.revokePriveleges(t(this).attr("data-typeid")), setTimeout(function () {
                                ui_handler.toggleVisitors(!1), r()
                            }, 500)
                        }), t("#muteAttendee" + n).on("click", function (e) {
                            comm_controller.setMute(t(this).attr("data-typeid")), setTimeout(function () {
                                ui_handler.toggleVisitors(!1), r()
                            }, 500)
                        })
                    } else t("<li>" + i + s + '<span class="mx-10">' + names[n].name + o + "</span>" + c + "</li>").appendTo(d);
                    t("#private" + n).on("click", function (e) {
                        var n = t(this).attr("data-typeid");
                        t("#visitor_message").show(), t("#send_message_to").html(smartVideoLocale.msgStore.sendMessageTo + names[n].name), t("#private_message_button").off(), t("#private_message_button").on("click", function () {
                            var o = t("#private_message_small").val();
                            S(o, !0, n), t("#private_message_small").val(""), t("#visitor_message").hide(), e.stopPropagation()
                        }), e.stopPropagation()
                    }), n !== comm_controller.getSessionId() && (peer_avatar = names[n].avatar, peer_name = names[n].name, peer_name_id = n), t("<li><hr/></li>").appendTo(d), e++
                }
                e > 0 ? (t(".dw-chat-avatar").show(), t(".dw-chat-avatar").attr("src", peer_avatar), t("#peer_name_chat").html(peer_name), t("#showProfile").show()) : (t(".dw-chat-avatar").hide(), t("#peer_name_chat").html(""), t("#showProfile").hide())
            } else {
                t("#visitors").empty();
                e = 0;
                for (var n in names) {
                    if (n !== comm_controller.getSessionId()) {
                        var m = t("ul#visitors"), g = t("<li/>").addClass("ui-menu-item").attr("role", "menuitem").appendTo(m);
                        if (t("<a/>").addClass("ui-all").attr("typeid", n).text(names[n].name).attr("title", smartVideoLocale.msgStore.sendMessageTo + names[n].name).appendTo(g).click(function () {
                                t(this).attr("typeid") != comm_controller.getSessionId() && p(t(this).attr("typeid"))
                            }), queryString.isAdmin && queryString.broadcast) {
                            if (names[n].priv)var f = smartVideoLocale.msgStore.revoke, v = lsRepUrl + "img/revoke.png"; else names[n].raiseHand ? (f = smartVideoLocale.msgStore.grant, v = lsRepUrl + "img/grant.png") : f = "";
                            if (f)t("<img/>").attr("typeid", n).addClass("centerImg").attr("src", v).attr("title", f + " " + names[n].name).appendTo(g).click(function () {
                                t(this).attr("typeid") != comm_controller.getSessionId() && (names[t(this).attr("typeid")].priv ? (names[t(this).attr("typeid")].priv = !1, comm_controller.revokePriveleges(t(this).attr("typeid"))) : (names[t(this).attr("typeid")].priv = !0, comm_controller.grantPriveleges(t(this).attr("typeid")))), setTimeout(function () {
                                    ui_handler.toggleVisitors(!1), r()
                                }, 500)
                            })
                        }
                        if (queryString.isAdmin && (svConfigs.serverSide.loginForm || svConfigs.serverSide.token)) {
                            u = smartVideoLocale.msgStore.block;
                            t("<img/>").addClass("centerImg").attr("typeid", n).attr("title", u + " " + names[n].name).attr("src", lsRepUrl + "img/block.png").appendTo(g).click(function () {
                                1 == confirm(smartVideoLocale.msgStore.sureBlock) && (t.ajax({
                                    type: "POST",
                                    url: lsRepUrl + "/server/script.php",
                                    data: {type: "blockuser", username: names[t(this).attr("typeid")].username}
                                }).done(function (e) {
                                    console.log("blocked")
                                }).fail(function () {
                                }), delete names[t(this).attr("typeid")], comm_controller.blockUser(t(this).attr("typeid")), r(), setTimeout(function () {
                                    ui_handler.toggleVisitors(!1), r()
                                }, 500))
                            })
                        }
                    }
                    n !== comm_controller.getSessionId() && (peer_avatar = names[n].avatar, peer_name = names[n].name), e++
                }
            }
            function p(e) {
                t("#visitor_message").show(), t("#send_message_to").html(smartVideoLocale.msgStore.sendMessageTo + names[e].name), t("#private_message_button").off(), t("#private_message_button").on("click", function () {
                    var n = t("#private_message_small").text();
                    S(n, !0, e), t("#visitor_message").hide(), setTimeout(function () {
                        ui_handler.toggleVisitors(!1)
                    }, 500), t("#private_message_small").text("")
                })
            }

            e > 2 ? (t(".dw-chat-avatar").attr("src", lsRepUrl + "img/listusers.png"), t("#peer_name_chat").html("...")) : (t(".dw-chat-avatar").attr("src", peer_avatar), t("#peer_name_chat").html(peer_name))
        }, a = function () {
            comm_controller.getStream() || (stopIncomingCall(), m(!0), "conference" == conferenceStyle ? ui_handler.displayVideoOnly() : (inCall = [], console.log("call ended"), t("#localVideo").hide(), t("#video_back").show(), ui_handler.toggleInstaChat(), setTimeout(function () {
                A(!1)
            }, 500)))
        };

        function s(e) {
            !function (e, t) {
                var n;
                n = {video: !0}, navigator.mediaDevices.getDisplayMedia ? navigator.mediaDevices.getDisplayMedia(n).then(e).catch(t) : navigator.getDisplayMedia(n).then(e).catch(t)
            }(function (t) {
                !function (e, t) {
                    e.addEventListener("ended", function () {
                        t(), t = function () {
                        }
                    }, !1), e.addEventListener("inactive", function () {
                        t(), t = function () {
                        }
                    }, !1), e.getTracks().forEach(function (e) {
                        e.addEventListener("ended", function () {
                            t(), t = function () {
                            }
                        }, !1), e.addEventListener("inactive", function () {
                            t(), t = function () {
                            }
                        }, !1)
                    })
                }(t, function () {
                    m(!0), ui_handler.setRecordingUi(!1), comm_controller.stopRecording()
                }), e(t)
            }, function (e) {
                console.error(e), alert("Unable to capture your screen. Please check console logs.\n" + e)
            })
        }

        function d(e) {
            var t = document.createElement("video");
            t.autoplay = !0, t.muted = !0, t.srcObject = e, t.style.display = "none", (document.body || document.documentElement).appendChild(t)
        }

        var c = function () {
            m(!1), comm_controller.startRecording(), ui_handler.setRecordingUi(!0)
        }, l = function () {
            if (startedRecroding = !0, comm_controller.startRecording(), ui_handler.setRecordingUi(!0), svConfigs.recording.screen)s(function (e) {
                var t;
                recordScreen = e, d(e), t = function (t) {
                    recordCamera = t, d(t), e.width = window.screen.width, e.height = window.screen.height, e.fullcanvas = !0, t.width = 320, t.height = 240, t.top = e.height - t.height, t.left = e.width - t.width, (multiStreamRecorder = RecordRTC([e, t], {
                        type: "video",
                        mimeType: "video/webm"
                    })).startRecording(), recordingTimer = setInterval(c, 6e4)
                }, navigator.mediaDevices.getUserMedia({audio: !0, video: !0}).then(t)
            }); else {
                if (queryString.isAdmin) {
                    var e = [];
                    for (var t in names)if (svConfigs.recording.oneWay) {
                        if (t != comm_controller.getSessionId()) {
                            var n = comm_controller.getRemoteStream(t);
                            e.push(n)
                        }
                    } else n = comm_controller.getRemoteStream(t), e.push(n)
                }
                (multiStreamRecorder = RecordRTC(e, {
                    type: "video",
                    mimeType: "video/webm",
                    disableLogs: !0,
                    bitsPerSecond: 10485760
                })).startRecording()
            }
        }, u = function () {
            if (!is_chat_opened && (is_chat_opened = !0, svConfigs.serverSide.chatHistory)) {
                if (queryString.isAdmin)for (var e in names)e !== comm_controller.getSessionId() && (n = e); else var n = comm_controller.getSessionId();
                t.ajax({
                    type: "POST",
                    url: lsRepUrl + "/server/script.php",
                    data: {type: "getchat", roomId: room, sessionId: n, agentId: agentId}
                }).done(function (e) {
                    e && JSON.parse(e).forEach(function (e) {
                        var t = svConfigs.agentName ? svConfigs.agentName : "Agent";
                        if (names[comm_controller.getSessionId()] && (e.from == names[comm_controller.getSessionId()].name || queryString.isAdmin && e.from == t))var n = "Me"; else n = e.from;
                        if (queryString.isAdmin || !e.system) {
                            var o = getPrettyDate(e.date_created);
                            showMessage(n, e.message, o, e.system, e.avatar)
                        }
                    })
                }).fail(function () {
                    console.log(!1)
                })
            }
        }, m = function (e) {
            ui_handler.setRecordingUi(!1), comm_controller.stopRecording(), multiStreamRecorder && multiStreamRecorder.stopRecording(function () {
                g(e), e && svConfigs.recording.screen && (clearInterval(recordingTimer), [recordScreen, recordCamera].forEach(function (e) {
                    e.getTracks().forEach(function (e) {
                        e.stop()
                    })
                }))
            })
        }, g = function (e) {
            if (startedRecroding) {
                var n = URL.createObjectURL(multiStreamRecorder.getBlob());
                if (svConfigs.recording.download) {
                    const e = document.createElement("a");
                    e.style.display = "none", e.href = n, e.download = "record_" + getCurrentDateFormatted() + ".webm", document.body.appendChild(e), e.click(), setTimeout(function () {
                        document.body.removeChild(e)
                    }, 100)
                }
                if (svConfigs.recording.saveServer) {
                    var o = "record_" + room + "_" + getCurrentDateFormatted() + ".webm", i = new FormData;
                    i.append("video-filename", o), i.append("video-blob", multiStreamRecorder.getBlob()), i.append("room", room), i.append("agentName", agentName), i.append("agentId", agentId), i.append("isFfmpeg", 1 == svConfigs.recording.transcode), function (t, n) {
                        var o = new XMLHttpRequest;
                        o.onreadystatechange = function () {
                            4 == o.readyState && 200 == o.status && (e ? (multiStreamRecorder.destroy(), multiStreamRecorder = null) : multiStreamRecorder.startRecording())
                        }, o.open("POST", t), o.send(n)
                    }(lsRepUrl + "/server/saverecord.php", i), t.ajax({
                        type: "POST",
                        url: lsRepUrl + "/server/script.php",
                        data: {type: "addrecording", roomId: roomId || queryString.room, filename: o, agentId: agentId}
                    }).done(function (e) {
                        console.log(e)
                    }).fail(function () {
                        console.log(!1)
                    })
                }
                t("#recording_message").show(), t(".recordinglink").attr("href", n), t(".recordinglink").click(function () {
                    t("#recording_message").hide()
                }), t(".close-but-wd-small").on("click", function () {
                    window.URL.revokeObjectURL(n), t("#recording_message").hide()
                }), startedRecroding = !1
            }
        }, f = function () {
            stopIncomingCall(), "conference" == conferenceStyle ? ui_handler.displayVideoOnly() : ui_handler.toggleInstaChat(), comm_controller.getStream() && (m(!0), comm_controller.handleCallTermination(), y()), comm_controller.endCall("hang up call")
        }, v = function () {
            setCookie("lsvGreenRoom", "1"), t("<link>", {
                rel: "stylesheet",
                type: "text/css",
                href: lsRepUrl + "css/cloud.css?v=" + currVersion
            }).appendTo("head"), t("<link>", {
                rel: "stylesheet",
                type: "text/css",
                href: lsRepUrl + "css/sky-forms.css?v=" + currVersion
            }).appendTo("head");
            var e = t("#videoPreview")[0];
            audioInputSelect = document.querySelector("select#audioSource"), audioOutputSelect = document.querySelector("select#audioOutput"), videoSelect = document.querySelector("select#videoSource");
            var n = [audioInputSelect, audioOutputSelect, videoSelect];

            function o(e) {
                var t = n.map(function (e) {
                    return e.value
                });
                n.forEach(function (e) {
                    for (; e.firstChild;)e.removeChild(e.firstChild)
                });
                for (var o = 0; o !== e.length; ++o) {
                    var i = e[o], r = document.createElement("option");
                    r.value = i.deviceId, "audioinput" === i.kind ? (r.text = i.label || "microphone " + (audioInputSelect.length + 1), r.dataset.icon = "fa fa-microphone mr-2", audioInputSelect.appendChild(r)) : "audiooutput" === i.kind ? (r.text = i.label || "speaker " + (audioOutputSelect.length + 1), r.dataset.icon = "fa fa-headphones mr-2", audioOutputSelect.appendChild(r)) : "videoinput" === i.kind && (r.dataset.icon = "fa fa-video-camera mr-2", r.text = i.label || "camera " + (videoSelect.length + 1), videoSelect.appendChild(r))
                }
                n.forEach(function (e, n) {
                    Array.prototype.slice.call(e.childNodes).some(function (e) {
                        return e.value === t[n]
                    }) && (e.value = t[n])
                }), document.getElementById("audioSource").selectedIndex = audioCurrentId, document.getElementById("audioOutput").selectedIndex = audioOutputCurrentId, document.getElementById("videoSource").selectedIndex = videoCurrentId
            }

            audioCurrentId = localStorage.getItem("audioCurrentId") > 0 ? parseInt(localStorage.getItem("audioCurrentId")) : 0, videoCurrentId = localStorage.getItem("videoCurrentId") > 0 ? parseInt(localStorage.getItem("videoCurrentId")) : 0, videoSource = localStorage.getItem("videoSource") ? localStorage.getItem("videoSource") : void 0, audioOutputCurrentId = localStorage.getItem("audioOutputCurrentId") > 0 ? localStorage.getItem("audioOutputCurrentId") : 0;
            var i = !videoSource || {deviceId: videoSource ? {exact: videoSource} : void 0};
            isIEA && (i = !0);
            var r = {audio: !0, video: i};

            function a(t) {
                if (testAudioTrack = t.getAudioTracks()[0], testVideoTrack = t.getVideoTracks()[0], testAudioTrack.enabled = !1, window.stream = t, e.srcObject = t, !isIEA)return e.srcObject = t, navigator.mediaDevices.enumerateDevices()
            }

            function s() {
                window.stream && window.stream.getTracks().forEach(function (e) {
                    e.stop()
                }), audioSource = audioInputSelect.value, videoSource = videoSelect.value, videoCurrentId = videoSelect.selectedIndex, audioCurrentId = audioInputSelect.selectedIndex, localStorage.setItem("videoCurrentId", videoCurrentId), localStorage.setItem("videoSource", videoSource), localStorage.setItem("audioCurrentId", audioCurrentId);
                var e = {
                    audio: !!audio_on && {deviceId: audioSource ? {exact: audioSource} : void 0},
                    video: {deviceId: videoSource ? {exact: videoSource} : void 0}
                };
                "undefined" == typeof Promise ? navigator.getUserMedia(e, a, d) : navigator.mediaDevices.getUserMedia(e).then(a).then(o).catch(d)
            }

            function d(e) {
                console.log("navigator.getUserMedia error: ", e)
            }

            "undefined" == typeof Promise || navigator.mediaDevices.getUserMedia(r).then(a).then(function () {
                navigator.mediaDevices.enumerateDevices().then(o).catch(d)
            }).catch(function e(t) {
                if ("NotReadableError" === t.name && audio_on)audio_on = !1; else {
                    if ("OverconstrainedError" !== t.name)return;
                    localStorage.removeItem("videoSource"), localStorage.removeItem("videoCurrentId"), localStorage.removeItem("audioCurrentId");
                    var n = {audio: !0, video: !0}
                }
                "undefined" == typeof Promise || navigator.mediaDevices.getUserMedia(n).then(a).then(function () {
                    navigator.mediaDevices.enumerateDevices().then(o).catch(d)
                }).catch(e)
            }), audioInputSelect && (audioInputSelect.onchange = s), audioOutputSelect && (audioOutputSelect.onchange = function () {
                (audioOutputCurrentId = audioOutputSelect.selectedIndex) > 0 && localStorage.setItem("audioOutputCurrentId", audioOutputCurrentId);
                var t, n, o = audioOutputSelect.value;
                n = o, void 0 !== (t = e).sinkId ? t.setSinkId(n).then(function () {
                }).catch(function (e) {
                    var t = e;
                    "SecurityError" === e.name && (t = "You need to use HTTPS for selecting audio output device: " + e), console.error(t), audioOutputSelect.selectedIndex = 0
                }) : console.warn("Browser does not support output device selection.")
            }), videoSelect && (videoSelect.onchange = s), "simple" == conferenceStyle && (ui_handler.toggleInstaChat(), ui_handler.restoreVideoBox(), t("#popup_widget_text_videos").show(), ui_handler.toggleInstaVideo(4))
        }, p = function (e) {
            audio_on = !t(".muteAudio").is(":checked"), video_on = !t(".muteVideo").is(":checked"), disableAudio && (audio_on = !1), disableVideo && (video_on = !1), window.stream && window.stream.getTracks().forEach(function (e) {
                e.stop()
            }), ui_handler.restoreVideoBox(), ui_handler.toggleInstaVideo(!1);
            var n = video_on ? "Video" : "Audio";
            comm_controller.initCall(n, e, videoSource, comm_controller.getSessionId(), audioSource, svConfigs.videoScreen.videoConstraint, svConfigs.videoScreen.audioConstraint)
        }, h = function (e, n) {
            if (isOnline)if (x(comm_controller.getSessionId(), video_on), queryString.broadcast || !svConfigs.videoScreen.greenRoom || getCookie("lsvGreenRoom")) {
                ui_handler.restoreVideoBox(), ui_handler.toggleInstaVideo(!1);
                var o = video_on ? "Video" : "Audio";
                comm_controller.initCall(o, e, n, comm_controller.getSessionId(), audioSource, svConfigs.videoScreen.videoConstraint, svConfigs.videoScreen.audioConstraint)
            } else v(), t("#startVideoButton").off(), t("#startVideoButton").on("click", function () {
                p(e)
            }); else E()
        }, S = function (e, t, n) {
            e = escapeHtmlEntities(e), n && (e = '<small id="private">' + smartVideoLocale.msgStore.private + "</small> " + e), t && showMessage("Me", e);
            var o = (new Date).toLocaleTimeString();
            comm_controller.addLocalChat(e, o, n), svConfigs.serverSide.chatHistory && saveChat(e, names[comm_controller.getSessionId()].name, "", agentId, names[comm_controller.getSessionId()].avatar, names)
        }, C = function (e) {
            if ("conference" == conferenceStyle) {
                if (t("#" + e).val()) {
                    var n = t("#" + e).val();
                    S(n, !0), t("#" + e).val("")
                }
            } else if (t("#" + e).text()) {
                n = t("#" + e).text();
                S(n, !0), t("#" + e).html("")
            }
        }, w = function (e) {
            e ? (t("#wd-widget-content-video").show(), t("#local_video_div").show(), !queryString.broadcast && svConfigs.videoScreen.separateScreenShare && (t("#localScreen").show(), t("#localVideo").hide()), t("#showHideVideo").addClass("disabled")) : (t("#remoteScreenChat").hide(), !queryString.broadcast && svConfigs.videoScreen.separateScreenShare && (t("#remoteScreen").hide(), t("#localScreen").hide()), comm_controller.getStream() || "conference" == conferenceStyle ? (t("#local_video_div").show(), t("#localVideo").show()) : (t("#local_video_div").hide(), t("#localVideo").hide()), t("#showHideVideo").removeClass("disabled")), (svConfigs.videoScreen && 0 == svConfigs.videoScreen.onlyAgentButtons || queryString.isAdmin) && ui_handler.setScreenButton(e)
        }, y = function () {
            w(!1), comm_controller.handleScreenShareTermination(), comm_controller.getStream() || ("conference" == conferenceStyle ? ui_handler.displayVideoOnly() : ui_handler.toggleInstaChat())
        }, b = function () {
            if (queryString.broadcast || !svConfigs.videoScreen.separateScreenShare)if (audio_on)ui_handler.restoreVideoBox(), comm_controller.startScreenShare(), w(!0); else {
                audio_on = !audio_on;
                var e = localStorage.getItem("prd");
                (e = JSON.parse(e)).muted = !audio_on, localStorage.setItem("prd", JSON.stringify(e)), comm_controller.toggleAudio(), setTimeout(function () {
                    ui_handler.restoreVideoBox(), comm_controller.startScreenShare(), w(!0)
                }, 500)
            } else y(), ui_handler.restoreVideoBox(), comm_controller.startScreenShareConf(), w(!0)
        }, I = function () {
            if (queryString.isAdmin && (isOnline = !0), audio_on = !t(".muteAudio").is(":checked"), video_on = !t(".muteVideo").is(":checked"), disableAudio && (audio_on = !1), disableVideo && (video_on = !1), names[comm_controller.getSessionId()].muted = !audio_on, names[comm_controller.getSessionId()].video = video_on, names[comm_controller.getSessionId()].name = queryString.isAdmin ? agentName : visitorName || guestName(comm_controller.getSessionId()), names[comm_controller.getSessionId()].isAdmin = queryString.isAdmin, names[comm_controller.getSessionId()].priv = !!localStorage.getItem("hasPrivileges"), t("#ng_caller_name").val() && (queryString.isAdmin ? agentName = t("#ng_caller_name").val() : visitorName = t("#ng_caller_name").val(), names[comm_controller.getSessionId()].name = t("#ng_caller_name").val()), requirePass && localStorage.getItem("prd")) {
                var e = JSON.parse(localStorage.getItem("prd"));
                names[comm_controller.getSessionId()].password = e.password
            } else comm_controller.setCallerInfo(names[comm_controller.getSessionId()], queryString.isAdmin);
            localStorage.setItem("prd", JSON.stringify(names[comm_controller.getSessionId()])), svConfigs.videoScreen.greenRoom ? (t("#wd-widget-content-greenroom").show(), t("#startVideoButton").off(), t("#startVideoButton").on("click", function () {
                p(!1)
            }), v()) : (r(), ui_handler.setVideoButton(), h(!0)), requirePass = !1
        }, _ = function () {
            var e = new Date, t = new Date(datetime);
            if (t.setMinutes(t.getMinutes() + parseInt(duration)), e > new Date(datetime) && t > e)return !0;
            var n = new Date, o = new Date(datetime), i = Math.abs(o - n) / 1e3, r = Math.floor(i / 86400);
            i -= 86400 * r;
            var a = Math.floor(i / 3600) % 24;
            i -= 3600 * a;
            var s = Math.floor(i / 60) % 60;
            if (i -= 60 * s, diffString = "", r > 0) {
                var d = r > 1 ? smartVideoLocale.msgStore.days : smartVideoLocale.msgStore.day;
                diffString = r + " " + d
            }
            if (0 === r && a > 0) {
                var c = a > 1 ? smartVideoLocale.msgStore.hours : smartVideoLocale.msgStore.hour;
                diffString = a + " " + c
            }
            if (0 === r && 0 == a && s > 0 && (diffString = s + " " + smartVideoLocale.msgStore.minutes), diffString && new Date(datetime) > e) {
                var l = smartVideoLocale.msgStore.notexactAppointment, u = getPrettyDate(new Date(datetime).getTime() / 1e3), m = (m = l.replace("{{timemeeting}}", u)).replace("{{diffString}}", diffString);
                toggleNotification(m, !0)
            } else toggleNotification(smartVideoLocale.msgStore.appointmentPast, !0);
            return ui_handler.displayChatOnly(), ui_handler.setDisabled(!0), !1
        }, k = function (e) {
            toggleNotification("", !1), is_widget_opened = "conference" == conferenceStyle ? t("#wd-widget-content-greenroom").is(":visible") || t("#wd-widget-content-video-waiting").is(":visible") || t("#wd-widget-content-video").is(":visible") || is_widget_opened : t("#nd_widget_content").is(":visible"), console.log("openWidget", is_widget_opened, e), caller_name = caller_name || "", caller_email = caller_email || "", caller_phone = caller_phone || "", is_widget_opened || ui_handler.toggleWidget(), "conference" == conferenceStyle ? fileInput = document.querySelector("input#filetransfer") : ("chat" === e ? ui_handler.toggleInstaChat() : "video" === e ? ui_handler.toggleInstaVideo() : 4 !== e || is_widget_opened || ui_handler.toggleInstaVideo(4), document.getElementById("newdev_chat_message1").focus()), r()
        }, T = function (e) {
            t(".new_chat_badge_container").hide(), t(".wd-chat-box").is(":visible") ? (ui_handler.displayVideoOnly(), !0 === e && h(!1)) : ui_handler.displayChatOnly()
        }, R = function () {
            if (names[comm_controller.getSessionId()] || (names[comm_controller.getSessionId()] = {}), queryString.broadcast) {
                if (localStorage.removeItem("hasPrivileges"), svConfigs.serverSide.token)return is_widget_opened || comm_controller.getVideoSessions() || t("#invideo").is(":visible") || t("#ng_info").is(":visible") || (is_widget_opened = !0, ui_handler.setDisabled(!0), t.ajax({
                    type: "POST",
                    url: lsRepUrl + "server/script.php",
                    data: {type: "logintoken", isAdmin: queryString.isAdmin, token: token, roomId: room}
                }).done(function (e) {
                    return e ? (e = JSON.parse(e), ui_handler.setDisabled(!1), names[comm_controller.getSessionId()] = {
                        name: e.first_name + " " + e.last_name,
                        avatar: svConfigs.agentAvatar ? lsRepUrl + svConfigs.agentAvatar : lsRepUrl + "img/small-avatar.jpg",
                        isAdmin: queryString.isAdmin,
                        username: e.username
                    }, names[comm_controller.getSessionId()].priv = localStorage.getItem("hasPrivileges"), queryString.isAdmin ? agentName = names[comm_controller.getSessionId()].name : visitorName = names[comm_controller.getSessionId()].name, comm_controller.setCallerInfo(names[comm_controller.getSessionId()], !0), e.name = e.first_name + " " + e.last_name, e.isAdmin = queryString.isAdmin, delete e.password, localStorage.setItem("prd", JSON.stringify(e)), toggleNotification("", !1), ui_handler.setDisabled(!1), r(), "conference" == conferenceStyle && (queryString.isAdmin ? (isOnline = !0, I()) : (t("#ng_info").show(), t("#cameraMicChoose").hide(), t("#ng_caller_name").hide(), t("#login-conference-title").html(smartVideoLocale.msgStore.welcomeBroadcast), t("#continue-button").off(), t("#continue-button").on("click", function () {
                        t("#ng_info").hide(), isOnline = !0, I()
                    }))), !1) : (toggleNotification(smartVideoLocale.msgStore.notValidToken, !0), localStorage.removeItem("prd"), localStorage.removeItem("hasPrivileges"), comm_controller.setClose(comm_controller.getSessionId()), ui_handler.displayChatOnly(), ui_handler.setDisabled(!0), !1)
                }).fail(function () {
                })), !1;
                if ("conference" !== conferenceStyle)return ui_handler.toggleWidget(), ui_handler.toggleInstaChat(), ui_handler.displayVideoOnly(), ui_handler.toggleHeaderChat(), queryString.broadcast && t("#raisehand_div").show(), t("#localVideo").hide(), t(".wd-avatar-agent").hide(), t("#video_container_chat").show(), t("#wd-widget-content-video").hide(), queryString.isAdmin && (isOnline = !0, t("#callAudioButton_1").addClass("disabled"), t(".peer_avatar").hide()), !1;
                k("chat"), queryString.isAdmin && (isOnline = !0)
            }
            if (comm_controller.getVideoSessions() || t("#invideo").is(":visible") || t("#ng_info").is(":visible")) {
                o = localStorage.getItem("prd");
                comm_controller.setCallerInfo(JSON.parse(o), queryString.isAdmin)
            } else {
                if (k("chat"), !queryString.isAdmin && duration && datetime)if (!_())return !1;
                if (!queryString.isAdmin && requirePass)return toggleNotification("", !1), t("#ng_info").show(), ui_handler.displayChatOnly(), ui_handler.setDisabled(!0), visitorName && t("#ng_caller_name").val(visitorName), svConfigs.entryForm.showEmail && t("#ng_caller_email").show(), svConfigs.entryForm.showAvatar && t("#ng_caller_avatar").show(), t("#ng_password").show(), t("#continue-button").off(), t("#continue-button").on("click", function () {
                    is_callerback = !1;
                    var e = {};
                    e.name = visitorName || t("#ng_caller_name").val(), t("#ng_caller_name").val() && (e.email = t("#ng_caller_name").val()), t("#ng_caller_avatar").val() && (e.avatar = t("#ng_caller_avatar").val()), e.password = t("#ng_password").val(), comm_controller.setCallerInfo(e, !1), localStorage.setItem("prdTmp", JSON.stringify(e))
                }), !1;
                if (visitorName && !queryString.isAdmin && !svConfigs.serverSide.loginForm && !queryString.broadcast) {
                    svConfigs.entryForm.enabled = !1;
                    var e = {name: visitorName};
                    localStorage.setItem("prd", JSON.stringify(e))
                }
                if (localStorage.getItem("prd") && !svConfigs.serverSide.loginForm && !queryString.broadcast)svConfigs.entryForm.enabled = !1, (o = localStorage.getItem("prd")) && (o = JSON.parse(o)), comm_controller.setCallerInfo(o, queryString.isAdmin), names[comm_controller.getSessionId()] = {
                    name: o ? o.name : caller_name,
                    avatar: o ? o.avatar : caller_avatar,
                    email: o ? o.email : caller_email
                };
                if (svConfigs.entryForm.enabled) {
                    var n = function () {
                        caller_name = t("#ng_caller_name").val(), caller_email = t("#ng_caller_email").val(), caller_avatar = t("#ng_caller_avatar").val(), toggleNotification("", !1);
                        var e = {name: caller_name, email: caller_email, avatar: caller_avatar};
                        svConfigs.serverSide && svConfigs.serverSide.loginForm ? isLsvAdmin ? (ui_handler.setDisabled(!0), t("#ng_info").show(), t.ajax({
                            type: "POST",
                            url: lsRepUrl + "server/script.php",
                            data: {
                                type: "loginadmin",
                                email: t("#ng_caller_email").val(),
                                password: t("#ng_password").val()
                            }
                        }).done(function (n) {
                            if (!n || 200 != n)return toggleNotification(smartVideoLocale.msgStore.notValidPassword, !0), !1;
                            ui_handler.setDisabled(!1), t("#ng_info").hide(), comm_controller.setCallerInfo(e, !1), localStorage.setItem("prd", JSON.stringify(e)), "conference" == conferenceStyle && I()
                        }).fail(function () {
                            return !1
                        })) : (ui_handler.setDisabled(!0), t("#ng_info").show(), t.ajax({
                            type: "POST",
                            url: lsRepUrl + "server/script.php",
                            data: {type: "login", email: t("#ng_caller_email").val(), password: t("#ng_password").val()}
                        }).done(function (n) {
                            if (!n || 200 != n)return toggleNotification(smartVideoLocale.msgStore.notValidPassword, !0), !1;
                            ui_handler.setDisabled(!1), t("#ng_info").hide(), comm_controller.setCallerInfo(e, !1), localStorage.setItem("prd", JSON.stringify(e)), "conference" == conferenceStyle && I()
                        }).fail(function () {
                            return !1
                        })) : (localStorage.setItem("prd", JSON.stringify(e)), svConfigs.entryForm.private && requirePass ? e.password = t("#ng_password").val() : (t("#ng_info").hide(), t("#continue-button").off(), ui_handler.setDisabled(!1)), comm_controller.setCallerInfo(e, queryString.isAdmin), "conference" == conferenceStyle && I())
                    };
                    if (svConfigs.entryForm.required || svConfigs.entryForm.private) {
                        (svConfigs.entryForm.private && requirePass || svConfigs.serverSide.loginForm) && (isOnline = !1, t("#ng_password").show()), svConfigs.entryForm.showEmail && t("#ng_caller_email").show(), svConfigs.entryForm.showAvatar && t("#ng_caller_avatar").show(), i = function (e) {
                            var o = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                            13 == e.keyCode && "" !== t("#ng_caller_name").val() && "" !== t("#ng_caller_email").val() && o.test(t("#ng_caller_email").val()) && n();
                            var i = !svConfigs.entryForm.showEmail || "" !== t("#ng_caller_email").val() && o.test(t("#ng_caller_email").val()), r = !svConfigs.entryForm.showAvatar || "" !== t("#ng_caller_avatar").val();
                            "" !== t("#ng_caller_name").val() && i && r ? t("#continue-button").removeClass("disabled") : t("#continue-button").addClass("disabled")
                        }, t("#ng_caller_name").keyup(function (e) {
                            i(e)
                        }), t("#ng_caller_email").keyup(function (e) {
                            i(e)
                        }), t("#ng_password").keyup(function (e) {
                            i(e)
                        }), t("#ng_caller_avatar").keyup(function (e) {
                            i(e)
                        }), t("#ng_caller_name").blur(function (e) {
                            i(e)
                        }), t("#ng_caller_email").blur(function (e) {
                            i(e)
                        }), t("#ng_password").blur(function (e) {
                            i(e)
                        }), t("#ng_caller_avatar").blur(function (e) {
                            i(e)
                        }), t("#continue-button").addClass("disabled")
                    }
                    ui_handler.displayChatOnly(), ui_handler.setDisabled(!0), "conference" == conferenceStyle && (svConfigs.videoScreen.greenRoom ? (t("#wd-widget-content-greenroom").show(), v(), t("#startVideoButton").off(), t("#startVideoButton").on("click", function () {
                        p(!1)
                    })) : (queryString.broadcast && !queryString.isAdmin && t("#cameraMicChoose").hide(), queryString.isAdmin ? t("#ng_caller_name").val(agentName) : t("#ng_caller_name").val(visitorName))), t("#ng_info").show(), setTimeout(function () {
                        t("#ng_caller_name").focus()
                    }, 500), t("#continue-button").off(), t("#continue-button").on("click", function () {
                        n()
                    }), svConfigs.showEntryForm = !1
                } else {
                    var o;
                    if (queryString.isAdmin && agentName)svConfigs.entryForm.enabled = !1, (o = localStorage.getItem("prd")) && ((o = JSON.parse(o)).name = names[comm_controller.getSessionId()].name, o.avatar = names[comm_controller.getSessionId()].avatar), names[comm_controller.getSessionId()] = {
                        name: svConfigs.agentName ? svConfigs.agentName : "",
                        avatar: svConfigs.agentAvatar ? svConfigs.agentAvatar : lsRepUrl + "img/small-avatar.jpg"
                    }, comm_controller.setCallerInfo(o, !0), localStorage.setItem("prd", JSON.stringify(names[comm_controller.getSessionId()]));
                    isOnline ? (ui_handler.displayChatOnly(), toggleNotification("", !1), ui_handler.setDisabled(!1)) : ui_handler.setDisabled(!0), svConfigs.videoScreen.greenRoom && (v(), t("#startVideoButton").off(), t("#startVideoButton").on("click", function () {
                        p(!1)
                    }))
                }
                (o = localStorage.getItem("prd")) && (0 == (o = JSON.parse(o)).video && (disableVideo = !0), 1 == o.muted && (disableAudio = !0)), names[comm_controller.getSessionId()] = {
                    name: o ? o.name : caller_name,
                    avatar: o ? o.avatar : caller_avatar,
                    email: o ? o.email : caller_email
                }, 0 == svConfigs.entryForm.enabled && "conference" == conferenceStyle && (isOnline = !0, ui_handler.setDisabled(!1), I())
            }
            var i;
            r()
        }, A = function (e) {
            e ? t.ajax({
                type: "POST",
                url: lsRepUrl + "server/script.php",
                data: {type: "endmeeting", agentId: agentId, roomId: room}
            }).done(function (e) {
                setTimeout(function () {
                    toggleNotification(smartVideoLocale.msgStore.meetingHasEnded, !0), localStorage.removeItem("prd"), localStorage.removeItem("hasPrivileges"), comm_controller.setClose(comm_controller.getSessionId()), ui_handler.displayChatOnly(), ui_handler.setDisabled(!0), isOnline = !1
                }, 150)
            }).fail(function () {
            }) : 1 != svConfigs.serverSide.feedback || queryString.isAdmin || getCookie("lsvRateRoom") || comm_controller.getVideoSessions() || (t("#feedback_form").show(), t("#feedback-button").click(function () {
                if (t("#feedback_form").hide(), token)var e = token; else e = names[comm_controller.getSessionId()].name ? names[comm_controller.getSessionId()].name : guestName(comm_controller.getSessionId());
                t.ajax({
                    type: "POST",
                    url: lsRepUrl + "server/script.php",
                    data: {
                        type: "feedback",
                        roomId: room,
                        sessionId: comm_controller.getSessionId(),
                        rate: t("#ratestars").rateit("value"),
                        text: t("#feedback_message").val(),
                        userId: e
                    }
                }).done(function (e) {
                    e && setCookie("lsvRateRoom", "1", 240)
                }).complete(function () {
                    setCookie("lsvRateRoom", "1", 240)
                }).fail(function () {
                    console.log(!1)
                })
            }))
        }, E = function () {
            if (comm_controller.getParticipants() > 0)console.log("setOffline return"); else {
                if (!queryString.isAdmin && duration && datetime && setTimeout(function () {
                        if (!_())return !1
                    }, 50), !comm_controller.getVideoSessions() && !t("#invideo").is(":visible")) {
                    if (ui_handler.setDisabled(!0), smartVideoLocale.msgStore.waitingOtherParty)var e = smartVideoLocale.msgStore.waitingOtherParty; else e = "Waiting for the other party to join";
                    toggleNotification(e, !0)
                }
                r()
            }
        }, x = function (e, t) {
            names[e] && (names[e].video = t), r()
        };

        function M() {
            if (console.log("loadHtml"), "conference" == conferenceStyle)var n = "roomconference.css"; else n = "room.css";
            var s = t("<link>", {
                rel: "stylesheet",
                type: "text/css",
                href: lsRepUrl + "css/" + n + "?v=" + currVersion
            });
            (t(document.body).append(o), s.appendTo("head"), 1 == svConfigs.serverSide.feedback) && t("<link>", {
                rel: "stylesheet",
                type: "text/css",
                href: lsRepUrl + "css/rateit.css?v=" + currVersion
            }).appendTo("head");
            t.get(lsRepUrl + "pages/" + videoWidgetContainer + "?v=" + currVersion, function (n) {
                o.append(n), ui_handler.setWidgetValues(), svConfigs.serverSide.checkRoom && t.ajax({
                    type: "POST",
                    url: lsRepUrl + "server/script.php",
                    data: {type: "getroom", token: token, isAdmin: queryString.isAdmin, roomId: room}
                }).done(function (e) {
                    e ? (e = JSON.parse(e)).title && (document.title = e.title) : A(!0)
                }).fail(function () {
                }), "conference" == conferenceStyle && (t("#showProfile").show(), (isChrome || isFirefox || isOpera || isSafariA) && !isiPhone && (queryString.room || queryString.broadcast) && t("#screenshareLi").show(), queryString.broadcast && !queryString.isAdmin && t("#screenshareLi").hide(), svConfigs.recording.enabled && queryString.isAdmin && t("#recordingLi").show(), svConfigs.videoScreen.getSnapshot && t("#snapshotLi").show()), "conference" == conferenceStyle && queryString.broadcast && !queryString.isAdmin && (t("#showHideVideo").hide(), t("#showHideAudio").hide(), t("#raisehandLi").show(), t("#raisehandLi1").show(), t("#localVideo").hide(), t("#snapshotLi").hide()), disableWhiteboard && t("#whiteboardLi").hide(), disableScreenShare && t("#screenshareLi").hide(), t(document).on("LSLocaleUpdated", function (e) {
                    t("#cancel_call_button span").html(smartVideoLocale.msgStore.Cancel), t("#waitingToConnect").html(smartVideoLocale.msgStore.waitingToConnect), t("#answer_audiocall_button").attr("title", smartVideoLocale.msgStore.answerWithAudio), t("#answer_audiocall_button1").attr("title", smartVideoLocale.msgStore.answerWithAudio), t("#callAudioButton_4").attr("title", smartVideoLocale.msgStore.callWithAudio), t("#callAudioButton_1").attr("title", smartVideoLocale.msgStore.callWithAudio), t("#call_audio").attr("title", smartVideoLocale.msgStore.callWithAudio), t("#answer_call_button1").attr("title", smartVideoLocale.msgStore.answerWithVideo), t("#answer_call_button").attr("title", smartVideoLocale.msgStore.answerWithVideo), t("#reject_call_button").attr("title", smartVideoLocale.msgStore.rejectCall);
                    var n = smartVideoLocale.msgStore.incomingText;
                    t("#incoming_text").html(n.replace("{{caller_name}}", peer_name)), t("#callButton_4").attr("title", smartVideoLocale.msgStore.callWithVideo), t("#callButton_1").attr("title", smartVideoLocale.msgStore.callWithVideo), t("#call_video").attr("title", smartVideoLocale.msgStore.callWithVideo), t("#exit_meeting").attr("title", smartVideoLocale.msgStore.exitMeeting), t("#file_transfer").attr("title", smartVideoLocale.msgStore.fileTransfer), t("#showHideVideo").attr("title", smartVideoLocale.msgStore.showHideVideo), t("#showHideAudio").attr("title", smartVideoLocale.msgStore.showHideAudio), t(".wd-v-share").attr("title", smartVideoLocale.msgStore.startShare), t("#startscreenshare").attr("title", smartVideoLocale.msgStore.startShare), t("#stopscreenshare").attr("title", smartVideoLocale.msgStore.stopShare), t(".wd-v-stopshare").attr("title", smartVideoLocale.msgStore.stopShare), t("#cameraSwitch").attr("title", smartVideoLocale.msgStore.cameraSwitch), t("#hangupButton").attr("title", smartVideoLocale.msgStore.hangupButton), t("#enableScreenShare").html(smartVideoLocale.msgStore.enableScreenShare), t("#screensharelink").attr("src", "https://chrome.google.com/webstore/detail/" + svConfigs.chromePluginId), t(".swipe_text_video").html(smartVideoLocale.msgStore.videoScreen), t(".swipe_text").html(smartVideoLocale.msgStore.chatScreen), t(".login-wd-title").html(smartVideoLocale.msgStore.nameFieldForm), t("#login-conference-title").html(smartVideoLocale.msgStore.formConferenceTitle), t("#continue-button").html(smartVideoLocale.msgStore.continueButton), t("#ng_caller_name").attr("placeholder", smartVideoLocale.msgStore.namePlaceholder), t("#ng_caller_avatar").attr("placeholder", smartVideoLocale.msgStore.avatarPlaceholder), t("#ng_password").attr("placeholder", smartVideoLocale.msgStore.passwordPlaceholder), t("#answer_audiocall_button span").html(smartVideoLocale.msgStore.audio), t("#answer_call_button span").html(smartVideoLocale.msgStore.video), t("#reject_call_button span").html(smartVideoLocale.msgStore.reject), t(".wd-v-recording recording-on").attr("title", smartVideoLocale.msgStore.stopRecording), t(".wd-v-recording recording-off").attr("title", smartVideoLocale.msgStore.startRecording), t(".recordingIcon").attr("title", smartVideoLocale.msgStore.recording), t("#whiteboard").attr("title", smartVideoLocale.msgStore.whiteboard), t("#raisehand").attr("title", smartVideoLocale.msgStore.raiseHand), t("#raisehand1").attr("title", smartVideoLocale.msgStore.raiseHand), t("#snapshot").attr("title", smartVideoLocale.msgStore.getSnapshot), t(".recordinglink").html(smartVideoLocale.msgStore.previewRecording), t("#snapshotLink").html(smartVideoLocale.msgStore.snapshotDownload), t(".acceptFile").html(smartVideoLocale.msgStore.acceptFile), t(".rejectFile").html(smartVideoLocale.msgStore.rejectFile), t("#cleanCanvas").attr("title", smartVideoLocale.msgStore.wb_clearall);
                    var o = isiPhone ? smartVideoLocale.msgStore.notSupportedIos : smartVideoLocale.msgStore.notSupportedError;
                    t("#not_supported").html(o), t("#startVideoButton").html(smartVideoLocale.msgStore.continueToCall), t("#chooseVideoAudio").html(smartVideoLocale.msgStore.chooseOptions), t(".feedback-title").html(smartVideoLocale.msgStore.feedbackFieldForm), t("#feedback-button").html(smartVideoLocale.msgStore.feedbackButton), t(".muteMe").html(smartVideoLocale.msgStore.muteMe), t(".turnOffCamera").html(smartVideoLocale.msgStore.turnOffCamera), t("#startRecording").attr("title", smartVideoLocale.msgStore.startRecording), t("#end_meeting").attr("title", smartVideoLocale.msgStore.endMeeting)
                });
                var s = {lsRepUrl: lsRepUrl, lang: svConfigs.smartVideoLanguage};
                smartVideoLocale.init(s, jQuery), t(document).on("RemoteVideoSessions", function (e) {
                    console.log("RemoteVideoSessions", e.count), remoteVideoSessions = e.count
                }), t(document).on("IncomingCall", function (e) {
                    if (console.log("IncomingCall", e.sessionId), "conference" == conferenceStyle)ui_handler.setWidgetValues(), ui_handler.onIncomingVideo(), e.autoaccept || comm_controller.getVideoSessions() ? setTimeout(function () {
                        comm_controller.answerCall(video_on, !0)
                    }, 1e3) : (playIncomingCall(), ui_handler.toggleRinging(function (e) {
                        e ? comm_controller.answerCall(video_on, !0) : comm_controller.rejectCall()
                    })); else {
                        ui_handler.setWidgetValues(), ui_handler.onIncomingVideo();
                        var n = smartVideoLocale.msgStore.incomingText;
                        t("#incoming_text").html(n.replace("{{caller_name}}", peer_name)), autoAcceptVideo || autoAcceptAudio || svConfigs.videoScreen.autoAcceptVideo || svConfigs.videoScreen.autoAcceptAudio || e.autoaccept || comm_controller.getVideoSessions() ? queryString.isAdmin && setTimeout(function () {
                            svConfigs.videoScreen.greenRoom && !getCookie("lsvGreenRoom") ? (v(), t("#startVideoButton").click(function () {
                                window.stream && window.stream.getTracks().forEach(function (e) {
                                    e.stop()
                                }), inCall.push(e.sessionId), comm_controller.answerCall(video_on, !1, videoSource, audioSource, svConfigs.videoScreen.videoConstraint, svConfigs.videoScreen.audioConstraint)
                            })) : ((svConfigs.videoScreen.autoAcceptAudio || autoAcceptAudio) && (video_on = !1), (svConfigs.videoScreen.autoAcceptVideo || autoAcceptVideo) && (video_on = !0), ui_handler.setMobileChatOnly(), ui_handler.displayVideoOnly(), inCall.push(e.sessionId), comm_controller.answerCall(video_on, !1, videoSource, audioSource, svConfigs.videoScreen.videoConstraint, svConfigs.videoScreen.audioConstraint))
                        }, 1e3) : (playIncomingCall(), ui_handler.toggleRinging(function (n) {
                            n ? remoteVideoSessions > 0 ? (t("#wd-widget-content-video-waiting").show(), setTimeout(function () {
                                h(!0)
                            }, 1e3), inCall.includes(e.sessionId) || (inCall.push(e.sessionId), comm_controller.answerCall(video_on, !0, videoSource, audioSource, svConfigs.videoScreen.videoConstraint, svConfigs.videoScreen.audioConstraint))) : svConfigs.videoScreen.greenRoom && !getCookie("lsvGreenRoom") ? (v(), t("#startVideoButton").click(function () {
                                window.stream && window.stream.getTracks().forEach(function (e) {
                                    e.stop()
                                }), inCall.push(e.sessionId), comm_controller.answerCall(video_on, !0, videoSource, audioSource, svConfigs.videoScreen.videoConstraint, svConfigs.videoScreen.audioConstraint)
                            })) : (inCall.push(e.sessionId), comm_controller.answerCall(video_on, !0, videoSource, audioSource, svConfigs.videoScreen.videoConstraint, svConfigs.videoScreen.audioConstraint)) : comm_controller.rejectCall()
                        }))
                    }
                }), t(".wd-v-hangup").on("click", function () {
                    f()
                }), t(document).off("LocalVideoStarted"), t(document).on("LocalVideoStarted", function (n) {
                    t("#localVideo").show(), ("conference" == conferenceStyle || queryString.broadcast) && (ui_handler.toggleVideoBox(!0), x(comm_controller.getSessionId(), video_on));
                    var o = !1, i = svConfigs.transcribe ? svConfigs.transcribe.direction : "";
                    "agent" == i ? o = isChrome && queryString.isAdmin && svConfigs.transcribe && 1 == svConfigs.transcribe.enabled : "visitor" == i ? o = isChrome && !queryString.isAdmin && svConfigs.transcribe && 1 == svConfigs.transcribe.enabled : "both" == i && (o = isChrome && svConfigs.transcribe && 1 == svConfigs.transcribe.enabled), o && loadScript("../js/translator.js", function () {
                        translator = new Translator;
                        var t = e.getAttribute("data-langFrom") ? e.getAttribute("data-langFrom") : svConfigs.transcribe.language, n = e.getAttribute("data-langTo") ? e.getAttribute("data-langTo") : svConfigs.transcribe.languageTo;
                        "both" != i || queryString.isAdmin || (t = e.getAttribute("data-langTo") ? e.getAttribute("data-langTo") : svConfigs.transcribe.languageTo, n = e.getAttribute("data-langFrom") ? e.getAttribute("data-langFrom") : svConfigs.transcribe.language), translator.voiceToText(function (e) {
                            n ? translator.translateLanguage(e, {
                                from: t, to: n, callback: function (e) {
                                    comm_controller.sendTranslateMessage(e, !1)
                                }, api_key: svConfigs.transcribe.apiKey
                            }) : comm_controller.sendTranslateMessage(e, !1)
                        }, t)
                    }), !queryString.broadcast && svConfigs.videoScreen.separateScreenShare && comm_controller.addToJoinScreenShare()
                }), t("#end_meeting").on("click", function () {
                    if (f(), localStorage.removeItem("prd"), localStorage.removeItem("hasPrivileges"), queryString.isAdmin)comm_controller.setDeleteAll(), t("#invideo").hide(), t("#ng_info").show(), t("#continue-button").on("click", function () {
                        var e = {
                            name: caller_name = t("#ng_caller_name").val(),
                            email: caller_email,
                            avatar: caller_avatar
                        };
                        localStorage.setItem("prd", JSON.stringify(e)), comm_controller.setCallerInfo(e, queryString.isAdmin), t("#ng_info").hide(), I()
                    }); else {
                        var e = function () {
                            svConfigs.entryForm.enabled ? (localStorage.removeItem("prd"), localStorage.removeItem("hasPrivileges"), location.reload()) : location.href = "/"
                        };
                        1 != svConfigs.serverSide.feedback || queryString.isAdmin || getCookie("lsvRateRoom") || comm_controller.getVideoSessions() ? e() : (t("#feedback_form").show(), t("#feedback-button").click(function () {
                            if (t("#feedback_form").hide(), token)var n = token; else n = names[comm_controller.getSessionId()].name ? names[comm_controller.getSessionId()].name : guestName(comm_controller.getSessionId());
                            t.ajax({
                                type: "POST",
                                url: lsRepUrl + "server/script.php",
                                data: {
                                    type: "feedback",
                                    roomId: room,
                                    sessionId: comm_controller.getSessionId(),
                                    rate: t("#ratestars").rateit("value"),
                                    text: t("#feedback_message").val(),
                                    userId: n
                                }
                            }).done(function (e) {
                                e && setCookie("lsvRateRoom", "1", 240)
                            }).complete(function () {
                                setCookie("lsvRateRoom", "1", 240), e()
                            }).fail(function () {
                                console.log(!1)
                            })
                        }))
                    }
                }), t("#cancel_call_button").on("click", function () {
                    f()
                }), t("#callButton_1").on("click", function () {
                    video_on = video_iphone_on = !0, ui_handler.setVideoButton(), h(!1)
                }), t("#callAudioButton_1").on("click", function () {
                    ringBackStart = !0, video_on = !1, ui_handler.setVideoButton(), h(!1)
                }), t(document).on("NotSupportedBrowser", function (e) {
                    comm_controller.rejectCall(), ui_handler.setVideoBoxOff("video")
                }), t(document).off("RemoteSpanPosition"), t(document).on("RemoteSpanPosition", function (e) {
                    var n = names[e.sessionId] ? names[e.sessionId].name : peer_name, o = t("<h2 />", {
                        id: "remoteVideoSpan" + e.sessionId,
                        class: "sourcevideospan"
                    });
                    o.css("postion", "absolute"), o.css("top", e.position.top + "px"), o.css("left", e.position.left + "px"), o.appendTo(t("#" + videoElementContainer)), o.html(n)
                });
                var d = function () {
                    t(".bigvideo").each(function () {
                        if (t(this).is(":visible") && "conference" === svConfigs.videoScreen.videoContainerStyle) {
                            var e = t(this).attr("id");
                            t("#" + e).detach().appendTo("#video_container_small"), t("#" + e).removeClass("bigvideo"), t("#" + e).removeClass("bigvideoadd"), t("#" + e).addClass("sourcevideo");
                            var n = t(t("#" + e)).position();
                            t("#remoteVideoSpan" + e).remove();
                            var o = names[e] ? names[e].name : peer_name, i = t("<h2 />", {
                                id: "remoteVideoSpan" + e,
                                class: "sourcevideospan"
                            });
                            i.css("left", n.left), i.css("top", n.top), i.appendTo(t("#video_container_small")), i.html(o)
                        }
                    })
                };
                t(document).off("VoiceSpeaking"), t(document).on("VoiceSpeaking", function (e) {
                    var n = e.id;
                    if (t("#" + n).is(":visible") && !t("#wd-widget-content-whiteboard").is(":visible"))if (clearTimeout(timerVars[n]), svConfigs.videoScreen && "conference" === svConfigs.videoScreen.videoContainerStyle && jQEngager("#" + n)) {
                        if (!svConfigs.videoScreen.videoConference && !names[n].isAdmin && !queryString.isAdmin)return;
                        if (d(), !comm_controller.getScreenStreamConnections()) {
                            t("#fullScreen").show(), t("#" + n).detach().appendTo("#video_container"), t("#" + n).removeClass("sourcevideo"), t("#" + n).addClass("bigvideo"), t("#" + n).addClass("bigvideoadd"), comm_controller.getVideoSessions() > 1 ? (t("#" + n).css("height", "85%"), t("#" + n).css("height", "85%")) : (t("#" + n).css("height", "98%"), t("#" + n).css("height", "98%"));
                            var o = t("#" + n).position();
                            if (!o)return;
                            t("#remoteVideoSpan" + n).remove();
                            var i = names[n] ? names[n].name : peer_name, r = t("<h2 />", {
                                id: "remoteVideoSpan" + n,
                                class: "sourcevideospan"
                            });
                            r.css("left", o.left), r.css("top", o.top), r.appendTo(t("#video_container")), r.html(i), t(".sourcevideo").each(function () {
                                if (t(this).is(":visible") && "conference" === svConfigs.videoScreen.videoContainerStyle) {
                                    var e = t(this).attr("id");
                                    t("#remoteVideoSpan" + e).remove();
                                    var n = names[e] ? names[e].name : peer_name, o = t("#" + e).position();
                                    if (!o)return;
                                    var i = t("<h2 />", {id: "remoteVideoSpan" + e, class: "sourcevideospan"});
                                    i.css("left", o.left), i.css("top", o.top), i.appendTo(t("#video_container_small")), i.html(n)
                                }
                            })
                        }
                    } else jQEngager("#" + n).css("border", "1px solid #484d75")
                }), t(document).off("VoiceSilence"), t(document).on("VoiceSilence", function (e) {
                    if (svConfigs.videoScreen.videoConference) {
                        var n = e.id;
                        t("#" + n).is(":visible") && (timerVars[n] = setTimeout(function () {
                            svConfigs.videoScreen && "conference" === svConfigs.videoScreen.videoContainerStyle && jQEngager("#" + n) || jQEngager("#" + n).css("border", "1px solid #fff"), t("#translate_message").hide()
                        }, 5e3))
                    }
                });
                var c, g, p, _, k, M = function () {
                    _ = null, t("#snapshotData").hide(), t(".recordinglink").attr("href", "")
                };
                svConfigs.videoScreen.getSnapshot && t("#snapshotLi").click(function () {
                    if (c = t(".bigvideo.bigvideoadd")[0], g = t("#snapshotCanvas")[0], 500, c) {
                        p = c.videoHeight / (c.videoWidth / 500), isNaN(p) && (p = 375);
                        var e = g.getContext("2d");
                        p ? (g.width = 500, g.height = p, e.drawImage(c, 0, 0, 500, p), _ = g.toDataURL("image/png"), t("#snapshotData").show(), t("#snapshotLink").attr("href", _), t("#snapshotLink").attr("download", peer_name + ".png"), t("#snapshotLink").click(function () {
                            M()
                        }), t(".close-but-wd-small").on("click", function () {
                            M()
                        })) : M()
                    }
                });
                t(document).off("RemoteVideoStarted"), t(document).on("RemoteVideoStarted", function (e) {
                    var n = document.querySelector("video#videoPreview");
                    if (n && (n.src = "", n.srcObject = null), "conference" == conferenceStyle)console.log("RemoteVideoStarted"), !isChrome && !isFirefox || isiPhone || isAndroid || !queryString.isAdmin || 1 != svConfigs.recording.enabled || 0 != svConfigs.recording.autoStart || t(".fa-circle").show(), t("#permission_div").hide(), t("#video_back").hide(), stopIncomingCall(), t("#wd-widget-content-whiteboard").is(":visible") || (ui_handler.toggleVideoBox(!0), (isChrome || isFirefox) && !isiPhone && !isAndroid && queryString.isAdmin && svConfigs.recording.enabled && svConfigs.recording.autoStart && l()), x(comm_controller.getSessionId(), video_on), playEnterRoom(); else {
                        !isChrome && !isFirefox || isiPhone || isAndroid || !queryString.isAdmin || 1 != svConfigs.recording.enabled || 0 != svConfigs.recording.autoStart || t(".wd-v-recording").show(), t("#permission_div").hide(), t("#video_back").hide(), stopIncomingCall();
                        try {
                            ui_handler.toggleVideoBox(!0), (isChrome || isFirefox) && !isiPhone && !isAndroid && queryString.isAdmin && svConfigs.recording.enabled && svConfigs.recording.autoStart && l()
                        } catch (e) {
                            console.log(e)
                        }
                    }
                    M()
                }), t(document).on("VideoRemoved", function (e) {
                    console.log("VideoRemoved"), video_on = !1, ui_handler.setVideoButton(), x(comm_controller.getSessionId(), !1), names[comm_controller.getSessionId()].video = !1, localStorage.setItem("prd", JSON.stringify(names[comm_controller.getSessionId()]))
                }), t(document).on("AudioRemoved", function (e) {
                    ui_handler.disableAudio(), audio_on = !1, ui_handler.setMuteButton(), names[comm_controller.getSessionId()] && (names[comm_controller.getSessionId()].muted = !0, localStorage.setItem("prd", JSON.stringify(names[comm_controller.getSessionId()]))), r()
                }), t(document).on("VideoMuted", function (e) {
                    ui_handler.disableVideo(), console.log("VideoMuted"), video_on = !1, ui_handler.setVideoButton(), x(comm_controller.getSessionId(), !1)
                }), t(document).on("VideoUnmuted", function (e) {
                    video_on = !0, ui_handler.setVideoButton(), x(comm_controller.getSessionId(), !0)
                }), t(document).on("AudioMuted", function (e) {
                    audio_on = !1, ui_handler.setMuteButton(), names[comm_controller.getSessionId()] && (names[comm_controller.getSessionId()].muted = !0), r()
                }), t(document).on("AudioUnmuted", function (e) {
                    audio_on = !0, ui_handler.setMuteButton(), names[comm_controller.getSessionId()] && (names[comm_controller.getSessionId()].muted = !1), r()
                }), t(document).on("RemoteVideoMuted", function (e) {
                    console.log("RemoteVideoMuted"), t("#" + e.sessionId).hide(), t("#remoteVideoSpan" + e.sessionId).hide(), x(e.sessionId, !1)
                }), t(document).on("BlockUser", function (e) {
                    comm_controller.getSessionId() == e.sessionId && (f(), localStorage.removeItem("prd"), localStorage.removeItem("hasPrivileges"), comm_controller.setClose(comm_controller.getSessionId()), delete names[e.sessionId], location.reload())
                }), t(document).on("RevokePriveleges", function (e) {
                    names[e.sessionId].priv = !1, comm_controller.getSessionId() == e.sessionId && (t(".fa-hand-paper-o").closest("a").removeClass("active"), localStorage.removeItem("hasPrivileges"), t("#hangupBroadcastButton").trigger("click"), comm_controller.revokeBroadcast(), t("#screenshareLi").hide(), t("#whiteboardLi").hide())
                }), t(document).on("GrantPriveleges", function (e) {
                    names[e.sessionId].priv = !0, comm_controller.getSessionId() == e.sessionId && (localStorage.setItem("hasPrivileges", !0), t(".fa-hand-paper-o").closest("a").removeClass("active"), comm_controller.joinBroadcast(), (isChrome || isFirefox || isOpera || isSafariA) && !isiPhone && (queryString.room || queryString.broadcast) && t("#screenshareLi").show(), 1 == svConfigs.whiteboard.enabled && t("#whiteboardLi").show())
                }), t(document).on("RemoteVideoUnmuted", function (e) {
                    console.log("RemoteVideoUnmuted"), t("#" + e.sessionId).show(), t("#remoteVideoSpan" + e.sessionId).show(), x(e.sessionId, !0)
                }), t(document).on("RemoteAudioMuted", function (e) {
                    names[e.sessionId] && (names[e.sessionId].muted = !0), r()
                }), t(document).on("RemoteAudioUnmuted", function (e) {
                    names[e.sessionId] && (names[e.sessionId].muted = !1), r()
                }), t(document).on("ForceAudioMuted", function (e) {
                    if (e.sessionId == comm_controller.getSessionId()) {
                        audio_on = !1;
                        var t = localStorage.getItem("prd");
                        (t = JSON.parse(t)).muted = !audio_on, localStorage.setItem("prd", JSON.stringify(t)), comm_controller.toggleAudio()
                    }
                }), t(document).on("ForceAudioMutedAll", function (e) {
                    audio_on = !1;
                    var t = localStorage.getItem("prd");
                    (t = JSON.parse(t)).muted = !audio_on, localStorage.setItem("prd", JSON.stringify(t)), comm_controller.toggleAudio()
                }), t(document).on("ForceDelete", function (e) {
                    e.sessionId == comm_controller.getSessionId() && (f(), t("#invideo").hide(), localStorage.removeItem("prd"), localStorage.removeItem("hasPrivileges"), location.reload())
                }), t(document).on("ForceDeleteAll", function (e) {
                    f(), is_widget_opened = !1, t("#invideo").hide(), localStorage.removeItem("prd"), localStorage.removeItem("hasPrivileges"), location.reload()
                }), t("#fullscreenButton").on("click", function () {
                    t("#fullScreen").hide(), t("#exitFullScreen").show(), toggleFullScreen()
                }), t("#exitFullscreenButton").on("click", function () {
                    t("#fullScreen").show(), t("#exitFullScreen").hide(), toggleFullScreen()
                }), t("#call_video").off(), t("#call_audio").off(), t("#call_video").on("click", function () {
                    video_on = !0, T(!0)
                }), t("#call_audio").on("click", function () {
                    isiPhone ? (video_on = !0, video_iphone_on = !1) : video_on = !1, T(!0)
                }), t(".wd-v-text").on("click", function () {
                    T(!1)
                }), t("#slide_video").on("click", function () {
                    T(!1)
                }), (isAndroid || isiPhone) && (t("#mainleft_div").on("swipe", function () {
                    T(!1)
                }), t(".wd-chat-box").on("swipe", function () {
                    T(!1)
                })), t("#showHideAudio").on("click", function () {
                    audio_on || video_on || comm_controller.initCall("Audio", !1, videoSource, comm_controller.getSessionId(), audioSource, svConfigs.videoScreen.videoConstraint, svConfigs.videoScreen.audioConstraint), audio_on = !audio_on;
                    var e = localStorage.getItem("prd");
                    (e = JSON.parse(e)).muted = !audio_on, localStorage.setItem("prd", JSON.stringify(e)), comm_controller.toggleAudio()
                }), t("#showHideVideo").on("click", function () {
                    audio_on || video_on || comm_controller.initCall("Video", !1, videoSource, comm_controller.getSessionId(), audioSource, svConfigs.videoScreen.videoConstraint, svConfigs.videoScreen.audioConstraint), video_on = !video_on;
                    var e = localStorage.getItem("prd");
                    (e = JSON.parse(e)).video = video_on, localStorage.setItem("prd", JSON.stringify(e)), comm_controller.toggleVideo()
                }), t("#muteAttendee").on("click", function () {
                    comm_controller.setMute(peer_name_id)
                }), t(document).on("RemoteVideoStopped", function (e) {
                    t("#video_back").show()
                }), t(document).on("MediaDevices", function (e) {
                    (videoDevices = e.devices).length > 1 && (t("#cameraSwitch").show(), t("#cameraSwitch").off(), t("#cameraSwitch").click(function () {
                        (videoCurrentId += 1) === videoDevices.length && (videoCurrentId = 0), video_on = !0, isiPhone ? comm_controller.forceStopCall() : comm_controller.renegotiate(videoDevices[videoCurrentId].value)
                    }))
                }), t(document).on("RestartVideo", function (e) {
                    f(), video_on = !0, ui_handler.displayVideoOnly(), setTimeout(function () {
                        h(!0)
                    }, 1e3)
                }), t(document).on("CallAccepted", function (e) {
                    stopIncomingCall()
                }), t(document).on("CallRejected", function (e) {
                    stopIncomingCall()
                }), t(document).on("CallFailed", function (e) {
                    stopIncomingCall()
                }), t(document).on("LocalVideoStopped", function (e) {
                }), t(document).on("ChatRejected", function (e) {
                }), t(document).off("CallEnded"), t(document).on("CallEnded", function (e) {
                    a(e.sessionId)
                }), t(document).off("TogglePermissionDenied"), t(document).on("TogglePermissionDenied", function (e) {
                    a(e.sessionId), ui_handler.togglePermissionWidget(!1)
                }), t(document).on("CheckPopup", function (e) {
                    comm_controller.setPing(comm_controller.getSessionId())
                }), t(document).off("CallerInfo"), t(document).on("CallerInfo", function (e) {
                    e.callerInfo && e.callerInfo.name && (passRoom || e.callerInfo.password ? (queryString.isAdmin && comm_controller.sendCallerBack(e.callerInfo.password == passRoom, e.sessionId), e.callerInfo.password == passRoom && i(e)) : i(e))
                }), t(document).off("AdminPopupOffline"), t(document).on("AdminPopupOffline", function (e) {
                    "conference" != conferenceStyle && (isOnline = !1, E())
                }), t(document).off("PopupOffline"), t(document).on("PopupOffline", function (e) {
                    "conference" != conferenceStyle && (isOnline = !1, E())
                }), t(document).off("PopupLeft"), t(document).on("PopupLeft", function (e) {
                    if (names[e.sessionId] && names[e.sessionId].name) {
                        var n = smartVideoLocale.msgStore.leftChat.replace("{{caller_name}}", names[e.sessionId].name);
                        svConfigs.videoScreen && svConfigs.videoScreen.waitingRoom ? toggleError(n, 5e3) : (showMessage("", n, null, "leftChat"), svConfigs.serverSide.chatHistory && saveChat(n, "", "leftChat", agentId, "", names))
                    }
                    var o = document.getElementById(e.sessionId);
                    o && (o.parentNode.removeChild(o), t("#remoteVideoSpan" + e.sessionId).remove()), delete names[e.sessionId], r()
                }), t(".box-title").on("click", function () {
                    ui_handler.toggleVisitors(!0)
                }), t("#toVideo").on("click", function () {
                    comm_controller.getStream() || "conference" == conferenceStyle ? (ui_handler.displayVideoOnly(), comm_controller.toVideo()) : ui_handler.toggleInstaChat()
                }), t(document).on("ToVideo", function (e) {
                    ui_handler.displayVideoOnly()
                }), t("#cleanCanvas").on("click", function () {
                    comm_controller.clearCanvas()
                }), t(document).on("WhiteboardSync", function (e) {
                    d(), ui_handler.toggleInstaWhiteboard()
                }), t("#mainleft_div").hover(function () {
                    t(".wd-video-c").delay(200).show()
                }, function () {
                    t(".wd-video-c").delay(200).hide()
                }), t("#whiteboard").off(), t("#whiteboard").on("click", function () {
                    d(), ui_handler.toggleInstaWhiteboard(), t("#cleanCanvas").show(), (queryString.isAdmin || localStorage.getItem("hasPrivileges")) && comm_controller.startWhiteboard()
                }), t("#raisehand").off(), t("#raisehand").on("click", function () {
                    S("raiseHand");
                    var e = smartVideoLocale.msgStore.raiseHandText.replace("{{caller_name}}", names[comm_controller.getSessionId()].name);
                    t(".fa-hand-paper-o").closest("a").addClass("active"), showMessage("", e, null, "raiseHand")
                }), t("#raisehand1").off(), t("#raisehand1").on("click", function () {
                    S("raiseHand");
                    var e = smartVideoLocale.msgStore.raiseHandText.replace("{{caller_name}}", names[comm_controller.getSessionId()].name);
                    t(".fa-hand-paper-o").closest("a").addClass("active"), showMessage("", e, null, "raiseHand")
                }), 1 == svConfigs.whiteboard.enabled && (queryString.isAdmin && (t("#whiteboard_div").show(), t("#whiteboardLi").show()), loadScript("../js/canvas-designer-widget.js", function () {
                })), 1 == svConfigs.serverSide.roomInfo && queryString.isAdmin && t("#exitmeeting_div").show(), 1 == svConfigs.serverSide.feedback && loadScript("../js/jquery.rateit.js", function () {
                }), t(document).off("ChatMessage"), t(document).on("ChatMessage", function (e) {
                    var n = names[e.sessionId] ? names[e.sessionId].name : peer_name, o = names[e.sessionId] ? names[e.sessionId].avatar : peer_avatar;
                    if ("raiseHand" == e.msg) {
                        var i = smartVideoLocale.msgStore.raiseHandText.replace("{{caller_name}}", names[e.sessionId].name);
                        showMessage("", i, null, "raiseHand"), names[e.sessionId].raiseHand = !0, r(), setTimeout(function () {
                            names[e.sessionId].raiseHand = !1, r()
                        }, 15e4)
                    } else if ("sendFile" == e.msg) {
                        var a = e.sessionId ? names[e.sessionId].name : peer_name, s = smartVideoLocale.msgStore.incomingFile;
                        s = s.replace("{{caller_name}}", a), showMessage("", s, null, "sendFile")
                    } else showMessage(n, e.msg, null, null, o);
                    "conference" == conferenceStyle ? t("#formito_chat").hasClass("is-open") ? t(".new_chat_badge_container").hide() : t(".new_chat_badge_container").show() : svConfigs.videoScreen && !0 === svConfigs.videoScreen.chat ? t(".wd-v-text").hide() : t(".new_chat_badge_container").show()
                }), t(document).off("TranslateMessage"), t(document).on("TranslateMessage", function (e) {
                    var t = names[e.sessionId] ? names[e.sessionId].name : peer_name;
                    names[e.sessionId] && names[e.sessionId].avatar;
                    ui_handler.showTranslateMessage(t + ": " + e.msg)
                }), t(document).off("SendTyping"), t(document).on("SendTyping", function (e) {
                    if (e.typing) {
                        t('li[data-system-attribue="chatTyping"]').remove(), t('div[data-system-attribue="chatTyping"]').remove();
                        var n = names[e.sessionId] ? names[e.sessionId].name : guestName(e.sessionId);
                        showMessage("", n + " is typing", null, "chatTyping")
                    } else t('li[data-system-attribue="chatTyping"]').remove(), t('div[data-system-attribue="chatTyping"]').remove()
                });
                var P = 0;
                t("#newdev_chat_message1").keyup(function (e) {
                    if (clearTimeout(k), ++P % 3 == 0 && comm_controller.sendTyping(!0), k = setTimeout(function () {
                            comm_controller.sendTyping(!1)
                        }, 1200), "conference" == conferenceStyle)var n = t("#newdev_chat_message1").val(); else n = t("#newdev_chat_message1").text();
                    13 == e.keyCode && n && (user_act = !0, S(n, !0), t("#newdev_chat_message1").html(""), t("#newdev_chat_message1").val(""), comm_controller.sendTyping(!1))
                }), svConfigs.videoScreen && svConfigs.videoScreen.waitingRoom || isOnline || queryString.isAdmin ? setTimeout(function () {
                    R()
                }, 100) : E(), t(document).off("IncomingFileTransfer"), t(document).on("IncomingFileTransfer", function (e) {
                    if (e.sender) {
                        var t = smartVideoLocale.msgStore.sendingFile;
                        showMessage("", t + e.name + '<br/><div class="progress"><progress id="progress' + e.fileId + '" max="0" value="0"></progress></div>', null, "fileTransfer")
                    } else {
                        var n = e.fileId, o = e.name + '<br/><div class="progress"><progress id="progress' + n + '" max="0" value="0"></progress></div><span id="download' + n + '"></span>';
                        showMessage("", o, null, "fileTransfer"), svConfigs.serverSide.chatHistory && saveChat(smartVideoLocale.msgStore.receivingFile + e.name, "", "fileTransfer", agentId, "", names)
                    }
                }), t("#file_transfer").off(), t("#file_transfer").on("click", function (e) {
                    (new FileSelector).selectSingleFile(function (e) {
                        S("sendFile"), comm_controller.sendFile(e)
                    })
                }), t(document).off("SendCallerBack"), t(document).on("SendCallerBack", function (e) {
                    if (!queryString.isAdmin && e.sessionId == comm_controller.getSessionId() && !is_callerback) {
                        if (is_callerback = !0, toggleNotification("", !1), !e.access)return localStorage.removeItem("prd"), localStorage.removeItem("prdTmp"), location.reload(), !1;
                        isOnline = !0, ui_handler.setDisabled(!1), t("#ng_info").hide(), t("#continue-button").off(), localStorage.getItem("prdTmp") && (localStorage.setItem("prd", localStorage.getItem("prdTmp")), localStorage.removeItem("prdTmp"));
                        var n = localStorage.getItem("prd");
                        names[comm_controller.getSessionId()] = {
                            name: n ? n.name : caller_name,
                            avatar: n ? n.avatar : caller_avatar,
                            email: n ? n.email : caller_email
                        }, "conference" == conferenceStyle && I()
                    }
                }), t("#newdev_chat_button1").click(function (e) {
                    C("newdev_chat_message1")
                }), t(document).off("AdminPopupOnline"), t(document).on("AdminPopupOnline", function (e) {
                    isOnline = !0, requirePass = null != e.pass && e.pass, R(e.sessionId)
                }), t(document).off("PopupOnline"), t(document).on("PopupOnline", function (e) {
                    e.sessionId && "visitor" !== e.sessionId && (names[e.sessionId] || (names[e.sessionId] = {
                        avatar: e.avatar ? e.avatar : lsRepUrl + "img/small-avatar.jpg",
                        name: e.name ? e.name : guestName(e.sessionId)
                    }, e.callerInfo && i(e), u()), isOnline = !0, requirePass = null != e.pass && e.pass, R(e.sessionId))
                }), t(".wd-v-recording").on("click", function () {
                    multiStreamRecorder && "recording" == multiStreamRecorder.getState() ? m(!0) : l()
                }), t("#startRecording").on("click", function () {
                    multiStreamRecorder && "recording" == multiStreamRecorder.getState() ? m(!0) : l()
                }), t(document).on("RemoteStartRecording", function (e) {
                    t(".recordingIcon").show()
                }), t(document).on("RemoteStopRecording", function (e) {
                    t(".recordingIcon").hide()
                }), t(document).on("ScreenShareFailed", function (e) {
                    toggleError("Screen Share failed"), w(!1)
                }), t(document).off("RemoteScreenShareStarted"), t(document).on("RemoteScreenShareStarted", function (e) {
                    !queryString.broadcast && svConfigs.videoScreen.separateScreenShare && d(), ui_handler.displayScreenShare(), t("#remoteScreen").show(), ui_handler.setScreenDisabled(!0)
                }), t(document).off("ScreenShareEnded"), t(document).on("ScreenShareEnded", function (e) {
                    console.log("ScreenShareEnded"), ui_handler.setScreenDisabled(!1), w(!1), t("#remoteScreen").is(":visible") || comm_controller.getStream() || ("conference" == conferenceStyle ? ui_handler.displayVideoOnly() : ui_handler.toggleInstaChat())
                }), t(document).on("EndMeeting", function (e) {
                    A(!1)
                }), t("#exit_meeting").on("click", function () {
                    t("#hangupBroadcastButton").trigger("click"), f(), comm_controller.endMeeting(), A(!0)
                }), (isChrome || isFirefox || isOpera || isSafariA) && !isiPhone && (queryString.room || queryString.broadcast || localStorage.getItem("hasPrivileges")) && (t(".wd-v-share").show(), t("#screenshare_div").show(), t(document).on("PluginDetected", function (e) {
                    pluginInstalled = !0
                }), t(document).on("PluginNotDetected", function (e) {
                    pluginInstalled = !1
                }), t(".control-ss > a").click(function () {
                    t(".control-ss").hide()
                }));
                var O = function () {
                    b()
                };
                t(".wd-v-share").on("click", function () {
                    O()
                }), t("#startscreenshare").off("click", function () {
                }), t("#startscreenshare").on("click", function () {
                    isOnline ? (ui_handler.displayVideoOnly(), O()) : E()
                }), t(".wd-v-stopshare").on("click", function () {
                    y()
                }), t("#stopscreenshare").on("click", function () {
                    y()
                }), (queryString.isAdmin || queryString.broadcast) && (isChrome || isFirefox || isOpera) && !isiPhone && 1 == svConfigs.recording.enabled && loadScript(lsRepUrl + "js/msr.js", function () {
                }), svConfigs.videoScreen && svConfigs.videoScreen.onlyAgentButtons && !queryString.isAdmin && ui_handler.setAgentOnlyButtons(), disableVideo && ui_handler.disableVideo(), disableAudio && ui_handler.disableAudio(), disableScreenShare && ui_handler.disableScreenShare(), disableWhiteboard && ui_handler.disableWhiteboard(), disableTransfer && ui_handler.disableTransfer(), t(document).on("click", ".closebtn", function () {
                    t("body").removeClass("menuopen"), t(".menu-link").removeClass("active")
                }), t(document).on("click", ".fo-icon", function () {
                    t(".formito-launcher").toggleClass("is-open"), t(".new_chat_badge_container").hide()
                }), t(document).on("click", ".fa-users", function (e) {
                    t("#attendees").toggle(), e.stopPropagation()
                }), t(document.body).on("click", function (e) {
                    var n = e.target.id;
                    "private_message_small" !== n && "fausers" !== n && (t("#attendees").hide(), t("#visitor_message").hide())
                }), t(document).mouseup(function (e) {
                    var n;
                    (n = t("#nd_widget_visitors")).is(e.target) || 0 !== n.has(e.target).length || ui_handler.toggleVisitors(!1), (n = t("#feedback_form")).is(e.target) || 0 !== n.has(e.target).length || t("#feedback_form").hide()
                }), r(), loadScript(lsRepUrl + "js/additional.js", function () {
                })
            })
        }

        (ui_handler = new uiHandler).init(jQuery, o, comm_controller), jQuery(document).on("CommConnected", function (e) {
            function t() {
                deleteCookie("lsvGreenRoom")
            }

            if (window.addEventListener ? window.addEventListener("beforeunload", t, !1) : window.attachEvent("onbeforeunload", t), isAndroid || isiPhone) {
                loadScript("https://webrtc.github.io/adapter/adapter-latest.js", void loadScript("https://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.js", M()))
            } else loadScript(isIEA ? "https://cdn.temasys.com.sg/adapterjs/0.15.x/adapter.screenshare.js" : "https://webrtc.github.io/adapter/adapter-latest.js", M())
        })
    });
    const o = e =>
    {
        switch (e.type) {
            case"pagehide":
            case"pageshow":
                e.persisted;
                break;
            case"focus":
                isiPhone && comm_controller.startStopIphone()
        }
    }
    ;
    ["pagehide", "pageshow", "focus", "unload", "load", "blur"].forEach(e => window.addEventListener(e, o)
    )
};
function loadScript(e, t) {
    var n = document.createElement("script");
    n.type = "text/javascript", n.readyState ? n.onreadystatechange = function () {
        "loaded" != n.readyState && "complete" != n.readyState || (n.onreadystatechange = null, t && t())
    } : n.onload = function () {
        t && t()
    }, n.src = e + "?v=" + currVersion, document.getElementsByTagName("head")[0].appendChild(n)
}
var init = new main;