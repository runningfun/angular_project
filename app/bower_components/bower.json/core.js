!function (t, e) {
    var r = t.AppStates = t.AppStates || {}, n = (Object.create(HTMLElement.prototype), r.util = r.util || {});
    n.clearContent = function (t) {
        for (; t.firstChild;)t.removeChild(t.firstChild)
    }, n.isParentOf = function (t, e) {
        for (var r = t.parentNode; r;) {
            if (r === e)return !0;
            r = r.parentNode
        }
        return !1
    }, n.directChildren = function (t, e) {
        var r = Array.isArray(t) ? t : [t], n = [];
        return [].forEach.call(r, function (t) {
            [].forEach.call(t.children, function (t) {
                t.tagName == e.toUpperCase() && n.push(t)
            })
        }), n
    }, n.createStateModel = function (e, r, n, a, s) {
        var i = Object.create(e);
        for (var h in r)i[h] = r[h];
        if (n) {
            var c = "undefined" != typeof s ? s : "model";
            if ("" !== c || "object" != typeof n || t.AppStates.util.isArray(n))i[c] = n; else for (var o in n)n.hasOwnProperty(o) && (i[o] = n[o])
        }
        if (a) {
            var u = {};
            return u[a] = i, u
        }
        return i
    }, n.isArray = function (t) {
        return "[object Array]" === Object.prototype.toString.call(t)
    }, n.fireEvent = function (t, r, n) {
        var a = e.createEvent("CustomEvent");
        return a.initCustomEvent(t, !1, !0, r), n.dispatchEvent(a)
    }, n.buildUrl = function (t, e, r) {
        var n, a = "";
        if ("pushstate" != r && "#" != t[0] && (a = ""), n = a + t, e) {
            var s = n.match(/:[a-zA-Z0-9%_]+/g) || [], i = [];
            s.forEach(function (t) {
                var r = t.slice(1);
                "undefined" != typeof e[r] && (n = n.replace(t, encodeURIComponent(e[r])), i.push(r))
            });
            for (var h in e)i.indexOf(h) < 0 && (n += n.indexOf("?") < 0 ? "?" + encodeURIComponent(h) + "=" + encodeURIComponent(e[h]) : "&" + encodeURIComponent(h) + "=" + encodeURIComponent(e[h]))
        }
        return n
    }, n.parseUrl = function (t, r) {
        var n = {isHashPath: "hash" === r};
        if ("function" == typeof URLx) {
            var a = new URL(t);
            n.path = a.pathname, n.hash = a.hash, n.search = a.search
        } else {
            var s = e.createElement("a");
            s.href = t, n.path = s.pathname, "/" !== n.path.charAt(0) && (n.path = "/" + n.path), n.hash = s.hash, n.search = s.search
        }
        if ("pushstate" !== r && ("#/" === n.hash.substring(0, 2) ? (n.isHashPath = !0, n.path = n.hash.substring(1)) : "#!/" === n.hash.substring(0, 3) ? (n.isHashPath = !0, n.path = n.hash.substring(2)) : n.isHashPath && (n.path = 0 === n.hash.length ? "/" : n.hash.substring(1)), n.isHashPath)) {
            n.hash = "";
            var i = n.path.indexOf("#");
            -1 !== i && (n.hash = n.path.substring(i), n.path = n.path.substring(0, i));
            var h = n.path.indexOf("?");
            -1 !== h && (n.search = n.path.substring(h), n.path = n.path.substring(0, h))
        }
        return n
    }, n.testRoute = function (t, e, r, n) {
        return "ignore" === r && ("/" === e.slice(-1) && (e = e.slice(0, -1)), "/" !== t.slice(-1) || n || (t = t.slice(0, -1))), n ? this.testRegExString(t, e) : t === e || "*" === t ? !0 : ("/" !== t.charAt(0) && (t = "/**/" + t), this.segmentsMatch(t.split("/"), 1, e.split("/"), 1))
    }, n.segmentsMatch = function (t, e, r, n, a) {
        var s = t[e] || "", i = r[n] || "";
        if ("**" === s && e === t.length - 1)return !0;
        if ("" === s || "" === i)return s === i;
        if (s === i || "*" === s || ":" === s.charAt(0))return ":" === s.charAt(0) && "undefined" != typeof a && (a[s.substring(1)] = r[n]), this.segmentsMatch(t, e + 1, r, n + 1, a);
        if ("**" === s)for (var h = n; h < r.length; h++)if (this.segmentsMatch(t, e + 1, r, h, a))return !0;
        return !1
    }, n.routeArguments = function (t, e, r, n, a) {
        var s = {};
        n || ("/" !== t.charAt(0) && (t = "/**/" + t), this.segmentsMatch(t.split("/"), 1, e.split("/"), 1, s));
        var i = r.substring(1).split("&");
        1 === i.length && "" === i[0] && (i = []);
        for (var h = 0; h < i.length; h++) {
            var c = i[h], o = c.split("=");
            s[o[0]] = o.splice(1, o.length - 1).join("=")
        }
        if (a)for (var u in s)s[u] = this.typecast(s[u]);
        return s
    }, n.typecast = function (t) {
        return "true" === t ? !0 : "false" === t ? !1 : isNaN(t) || "" === t || "0" === t.charAt(0) ? decodeURIComponent(t) : +t
    }, n.testRegExString = function (t, e) {
        if ("/" !== t.charAt(0))return !1;
        t = t.slice(1);
        var r = "";
        if ("/" === t.slice(-1))t = t.slice(0, -1); else {
            if ("/i" !== t.slice(-2))return !1;
            t = t.slice(0, -2), r = "i"
        }
        return new RegExp(t, r).test(e)
    }
}(window, document);