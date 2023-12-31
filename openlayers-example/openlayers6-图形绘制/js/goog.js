var COMPILED = !1,
goog = goog || {};
goog.global = this,
goog.global.CLOSURE_UNCOMPILED_DEFINES,
goog.global.CLOSURE_DEFINES,
goog.isDef = function(t) {
    return void 0 !== t
},
goog.exportPath_ = function(t, o, e) {
    var r = t.split("."),
    n = e || goog.global;
    r[0] in n || !n.execScript || n.execScript("var " + r[0]);
    for (var g; r.length && (g = r.shift());) ! r.length && goog.isDef(o) ? n[g] = o: n = n[g] ? n[g] : n[g] = {}
},
goog.define = function(t, o) {
    var e = o;
    COMPILED || (goog.global.CLOSURE_UNCOMPILED_DEFINES && Object.prototype.hasOwnProperty.call(goog.global.CLOSURE_UNCOMPILED_DEFINES, t) ? e = goog.global.CLOSURE_UNCOMPILED_DEFINES[t] : goog.global.CLOSURE_DEFINES && Object.prototype.hasOwnProperty.call(goog.global.CLOSURE_DEFINES, t) && (e = goog.global.CLOSURE_DEFINES[t])),
    goog.exportPath_(t, e)
},
goog.DEBUG = !0,
goog.define("goog.LOCALE", "en"),
goog.define("goog.TRUSTED_SITE", !0),
goog.define("goog.STRICT_MODE_COMPATIBLE", !1),
goog.provide = function(t) {
    if (!COMPILED && goog.isProvided_(t)) throw Error('Namespace "' + t + '" already declared.');
    goog.constructNamespace_(t)
},
goog.constructNamespace_ = function(t, o) {
    if (!COMPILED) {
        delete goog.implicitNamespaces_[t];
        for (var e = t; (e = e.substring(0, e.lastIndexOf("."))) && !goog.getObjectByName(e);) goog.implicitNamespaces_[e] = !0
    }
    goog.exportPath_(t, o)
},
goog.module = function(t) {
    if (!goog.isString(t) || !t) throw Error("Invalid module identifier");
    if (!goog.isInModuleLoader_()) throw Error("Module " + t + " has been loaded incorrectly.");
    if (goog.moduleLoaderState_.moduleName) throw Error("goog.module may only be called once per module.");
    if (goog.moduleLoaderState_.moduleName = t, !COMPILED) {
        if (goog.isProvided_(t)) throw Error('Namespace "' + t + '" already declared.');
        delete goog.implicitNamespaces_[t]
    }
},
goog.module.get = function(t) {
    return goog.module.getInternal_(t)
},
goog.module.getInternal_ = function(t) {
    return COMPILED ? void 0 : goog.isProvided_(t) ? t in goog.loadedModules_ ? goog.loadedModules_[t] : goog.getObjectByName(t) : null
},
goog.moduleLoaderState_ = null,
goog.isInModuleLoader_ = function() {
    return null != goog.moduleLoaderState_
},
goog.module.declareTestMethods = function() {
    if (!goog.isInModuleLoader_()) throw new Error("goog.module.declareTestMethods must be called from within a goog.module");
    goog.moduleLoaderState_.declareTestMethods = !0
},
goog.module.declareLegacyNamespace = function() {
    if (!COMPILED && !goog.isInModuleLoader_()) throw new Error("goog.module.declareLegacyNamespace must be called from within a goog.module");
    if (!COMPILED && !goog.moduleLoaderState_.moduleName) throw Error("goog.module must be called prior to goog.module.declareLegacyNamespace.");
    goog.moduleLoaderState_.declareLegacyNamespace = !0
},
goog.setTestOnly = function(t) {
    if (COMPILED && !goog.DEBUG) throw t = t || "",
    Error("Importing test-only code into non-debug environment" + (t ? ": " + t: "."))
},
goog.forwardDeclare = function(t) {},
COMPILED || (goog.isProvided_ = function(t) {
    return t in goog.loadedModules_ || !goog.implicitNamespaces_[t] && goog.isDefAndNotNull(goog.getObjectByName(t))
},
goog.implicitNamespaces_ = {
    "goog.module": !0
}),
goog.getObjectByName = function(t, o) {
    for (var e, r = t.split("."), n = o || goog.global; e = r.shift();) {
        if (!goog.isDefAndNotNull(n[e])) return null;
        n = n[e]
    }
    return n
},
goog.globalize = function(t, o) {
    var e = o || goog.global;
    for (var r in t) e[r] = t[r]
},
goog.addDependency = function(t, o, e, r) {
    if (goog.DEPENDENCIES_ENABLED) {
        for (var n, g, i = t.replace(/\\/g, "/"), s = goog.dependencies_, a = 0; n = o[a]; a++) s.nameToPath[n] = i,
        s.pathIsModule[i] = !!r;
        for (var l = 0; g = e[l]; l++) i in s.requires || (s.requires[i] = {}),
        s.requires[i][g] = !0
    }
},
goog.define("goog.ENABLE_DEBUG_LOADER", !0),
goog.logToConsole_ = function(t) {
    goog.global.console && goog.global.console.error(t)
},
goog.require = function(t) {
    if (!COMPILED) {
        if (goog.isProvided_(t)) return goog.isInModuleLoader_() ? goog.module.getInternal_(t) : null;
        if (goog.ENABLE_DEBUG_LOADER) {
            var o = goog.getPathFromDeps_(t);
            if (o) return goog.included_[o] = !0,
            goog.writeScripts_(),
            null
        }
        var e = "goog.require could not find: " + t;
        throw goog.logToConsole_(e),
        Error(e)
    }
},
goog.basePath = "",
goog.global.CLOSURE_BASE_PATH,
goog.global.CLOSURE_NO_DEPS,
goog.global.CLOSURE_IMPORT_SCRIPT,
goog.nullFunction = function() {},
goog.identityFunction = function(t, o) {
    return t
},
goog.abstractMethod = function() {
    throw Error("unimplemented abstract method")
},
goog.addSingletonGetter = function(t) {
    t.getInstance = function() {
        return t.instance_ ? t.instance_: (goog.DEBUG && (goog.instantiatedSingletons_[goog.instantiatedSingletons_.length] = t), t.instance_ = new t)
    }
},
goog.instantiatedSingletons_ = [],
goog.define("goog.LOAD_MODULE_USING_EVAL", !0),
goog.define("goog.SEAL_MODULE_EXPORTS", goog.DEBUG),
goog.loadedModules_ = {},
goog.DEPENDENCIES_ENABLED = !COMPILED && goog.ENABLE_DEBUG_LOADER,
goog.DEPENDENCIES_ENABLED && (goog.included_ = {},
goog.dependencies_ = {
    pathIsModule: {},
    nameToPath: {},
    requires: {},
    visited: {},
    written: {}
},
goog.inHtmlDocument_ = function() {
    var t = goog.global.document;
    return "undefined" != typeof t && "write" in t
},
goog.findBasePath_ = function() {
    if (goog.global.CLOSURE_BASE_PATH) return void(goog.basePath = goog.global.CLOSURE_BASE_PATH);
    if (goog.inHtmlDocument_()) for (var t = goog.global.document,
    o = t.getElementsByTagName("script"), e = o.length - 1; e >= 0; --e) {
        var r = o[e].src,
        n = r.lastIndexOf("?"),
        g = -1 == n ? r.length: n;
        if ("base.js" == r.substr(g - 7, 7)) return void(goog.basePath = r.substr(0, g - 7))
    }
},
goog.importScript_ = function(t, o) {
    var e = goog.global.CLOSURE_IMPORT_SCRIPT || goog.writeScriptTag_;
    e(t, o) && (goog.dependencies_.written[t] = !0)
},
goog.IS_OLD_IE_ = goog.global.document && goog.global.document.all && !goog.global.atob, goog.importModule_ = function(t) {
    var o = 'goog.retrieveAndExecModule_("' + t + '");';
    goog.importScript_("", o) && (goog.dependencies_.written[t] = !0)
},
goog.queuedModules_ = [], goog.retrieveAndExecModule_ = function(t) {
    for (var o; - 1 != (o = t.indexOf("/./"));) t = t.substr(0, o) + t.substr(o + "/.".length);
    for (; - 1 != (o = t.indexOf("/../"));) {
        var e = t.lastIndexOf("/", o - 1);
        t = t.substr(0, e) + t.substr(o + "/..".length)
    }
    var r = goog.global.CLOSURE_IMPORT_SCRIPT || goog.writeScriptTag_,
    n = null,
    g = new goog.global.XMLHttpRequest;
    if (g.onload = function() {
        n = this.responseText
    },
    g.open("get", t, !1), g.send(), n = g.responseText, null == n) throw new Error("load of " + t + "failed");
    var i = goog.wrapModule_(t, n),
    s = goog.IS_OLD_IE_;
    s ? goog.queuedModules_.push(i) : r(t, i),
    goog.dependencies_.written[t] = !0
},
goog.wrapModule_ = function(t, o) {
    return goog.LOAD_MODULE_USING_EVAL && goog.isDef(goog.global.JSON) ? "goog.loadModule(" + goog.global.JSON.stringify(o + "\n//# sourceURL=" + t + "\n") + ");": 'goog.loadModule(function(exports) {"use strict";' + o + "\n;return exports});\n//# sourceURL=" + t + "\n"
},
goog.loadQueuedModules_ = function() {
    var t = goog.queuedModules_.length;
    if (t > 0) {
        var o = goog.queuedModules_;
        goog.queuedModules_ = [];
        for (var e = 0; t > e; e++) {
            var r = o[e];
            goog.globalEval(r)
        }
    }
},
goog.loadModule = function(t) {
    try {
        goog.moduleLoaderState_ = {
            moduleName: void 0,
            declareTestMethods: !1
        };
        var o;
        if (goog.isFunction(t)) o = t.call(goog.global, {});
        else {
            if (!goog.isString(t)) throw Error("Invalid module definition");
            o = goog.loadModuleFromSource_.call(goog.global, t)
        }
        var e = goog.moduleLoaderState_.moduleName;
        if (!goog.isString(e) || !e) throw Error('Invalid module name "' + e + '"');
        if (goog.moduleLoaderState_.declareLegacyNamespace ? goog.constructNamespace_(e, o) : goog.SEAL_MODULE_EXPORTS && Object.seal && Object.seal(o), goog.loadedModules_[e] = o, goog.moduleLoaderState_.declareTestMethods) for (var r in o)(0 === r.indexOf("test", 0) || "tearDown" == r || "setup" == r) && (goog.global[r] = o[r])
    } finally {
        goog.moduleLoaderState_ = null
    }
},
goog.loadModuleFromSource_ = function() {
    "use strict";
    var exports = {};
    return eval(arguments[0]),
    exports
},
goog.writeScriptTag_ = function(t, o) {
    if (goog.inHtmlDocument_()) {
        var e = goog.global.document;
        if ("complete" == e.readyState) {
            var r = /\bdeps.js$/.test(t);
            if (r) return ! 1;
            throw Error('Cannot write "' + t + '" after document load')
        }
        var n = goog.IS_OLD_IE_;
        if (void 0 === o) if (n) {
            var g = " onreadystatechange='goog.onScriptLoad_(this, " + ++goog.lastNonModuleScriptIndex_ + ")' ";
            e.write('<script type="text/javascript" src="' + t + '"' + g + "></script>")
        } else e.write('<script type="text/javascript" src="' + t + '"></script>');
        else e.write('<script type="text/javascript">' + o + "</script>");
        return ! 0
    }
    return ! 1
},
goog.lastNonModuleScriptIndex_ = 0, goog.onScriptLoad_ = function(t, o) {
    return "complete" == t.readyState && goog.lastNonModuleScriptIndex_ == o && goog.loadQueuedModules_(),
    !0
},
goog.writeScripts_ = function() {
    function t(n) {
        if (! (n in r.written)) {
            if (n in r.visited) return void(n in e || (e[n] = !0, o.push(n)));
            if (r.visited[n] = !0, n in r.requires) for (var g in r.requires[n]) if (!goog.isProvided_(g)) {
                if (! (g in r.nameToPath)) throw Error("Undefined nameToPath for " + g);
                t(r.nameToPath[g])
            }
            n in e || (e[n] = !0, o.push(n))
        }
    }
    var o = [],
    e = {},
    r = goog.dependencies_;
    for (var n in goog.included_) r.written[n] || t(n);
    for (var g = 0; g < o.length; g++) {
        var n = o[g];
        goog.dependencies_.written[n] = !0
    }
    var i = goog.moduleLoaderState_;
    goog.moduleLoaderState_ = null;
    for (var s = !1,
    g = 0; g < o.length; g++) {
        var n = o[g];
        if (!n) throw goog.moduleLoaderState_ = i,
        Error("Undefined script input");
        r.pathIsModule[n] ? (s = !0, goog.importModule_(goog.basePath + n)) : goog.importScript_(goog.basePath + n)
    }
    goog.moduleLoaderState_ = i
},
goog.getPathFromDeps_ = function(t) {
    return t in goog.dependencies_.nameToPath ? goog.dependencies_.nameToPath[t] : null
},
goog.findBasePath_(), goog.global.CLOSURE_NO_DEPS || goog.importScript_(goog.basePath + "deps.js")),
goog.typeOf = function(t) {
    var o = typeof t;
    if ("object" == o) {
        if (!t) return "null";
        if (t instanceof Array) return "array";
        if (t instanceof Object) return o;
        var e = Object.prototype.toString.call(t);
        if ("[object Window]" == e) return "object";
        if ("[object Array]" == e || "number" == typeof t.length && "undefined" != typeof t.splice && "undefined" != typeof t.propertyIsEnumerable && !t.propertyIsEnumerable("splice")) return "array";
        if ("[object Function]" == e || "undefined" != typeof t.call && "undefined" != typeof t.propertyIsEnumerable && !t.propertyIsEnumerable("call")) return "function"
    } else if ("function" == o && "undefined" == typeof t.call) return "object";
    return o
},
goog.isNull = function(t) {
    return null === t
},
goog.isDefAndNotNull = function(t) {
    return null != t
},
goog.isArray = function(t) {
    return "array" == goog.typeOf(t)
},
goog.isArrayLike = function(t) {
    var o = goog.typeOf(t);
    return "array" == o || "object" == o && "number" == typeof t.length
},
goog.isDateLike = function(t) {
    return goog.isObject(t) && "function" == typeof t.getFullYear
},
goog.isString = function(t) {
    return "string" == typeof t
},
goog.isBoolean = function(t) {
    return "boolean" == typeof t
},
goog.isNumber = function(t) {
    return "number" == typeof t
},
goog.isFunction = function(t) {
    return "function" == goog.typeOf(t)
},
goog.isObject = function(t) {
    var o = typeof t;
    return "object" == o && null != t || "function" == o
},
goog.getUid = function(t) {
    return t[goog.UID_PROPERTY_] || (t[goog.UID_PROPERTY_] = ++goog.uidCounter_)
},
goog.hasUid = function(t) {
    return !! t[goog.UID_PROPERTY_]
},
goog.removeUid = function(t) {
    "removeAttribute" in t && t.removeAttribute(goog.UID_PROPERTY_);
    try {
        delete t[goog.UID_PROPERTY_]
    } catch(o) {}
},
goog.UID_PROPERTY_ = "closure_uid_" + (1e9 * Math.random() >>> 0),
goog.uidCounter_ = 0,
goog.getHashCode = goog.getUid,
goog.removeHashCode = goog.removeUid,
goog.cloneObject = function(t) {
    var o = goog.typeOf(t);
    if ("object" == o || "array" == o) {
        if (t.clone) return t.clone();
        var e = "array" == o ? [] : {};
        for (var r in t) e[r] = goog.cloneObject(t[r]);
        return e
    }
    return t
},
goog.bindNative_ = function(t, o, e) {
    return t.call.apply(t.bind, arguments)
},
goog.bindJs_ = function(t, o, e) {
    if (!t) throw new Error;
    if (arguments.length > 2) {
        var r = Array.prototype.slice.call(arguments, 2);
        return function() {
            var e = Array.prototype.slice.call(arguments);
            return Array.prototype.unshift.apply(e, r),
            t.apply(o, e)
        }
    }
    return function() {
        return t.apply(o, arguments)
    }
},
goog.bind = function(t, o, e) {
    return Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? goog.bind = goog.bindNative_: goog.bind = goog.bindJs_,
    goog.bind.apply(null, arguments)
},
goog.partial = function(t, o) {
    var e = Array.prototype.slice.call(arguments, 1);
    return function() {
        var o = e.slice();
        return o.push.apply(o, arguments),
        t.apply(this, o)
    }
},
goog.mixin = function(t, o) {
    for (var e in o) t[e] = o[e]
},
goog.now = goog.TRUSTED_SITE && Date.now ||
function() {
    return + new Date
},
goog.globalEval = function(t) {
    if (goog.global.execScript) goog.global.execScript(t, "JavaScript");
    else {
        if (!goog.global.eval) throw Error("goog.globalEval not available");
        if (null == goog.evalWorksForGlobals_ && (goog.global.eval("var _et_ = 1;"), "undefined" != typeof goog.global._et_ ? (delete goog.global._et_, goog.evalWorksForGlobals_ = !0) : goog.evalWorksForGlobals_ = !1), goog.evalWorksForGlobals_) goog.global.eval(t);
        else {
            var o = goog.global.document,
            e = o.createElement("script");
            e.type = "text/javascript",
            e.defer = !1,
            e.appendChild(o.createTextNode(t)),
            o.body.appendChild(e),
            o.body.removeChild(e)
        }
    }
},
goog.evalWorksForGlobals_ = null,
goog.cssNameMapping_,
goog.cssNameMappingStyle_,
goog.getCssName = function(t, o) {
    var e, r = function(t) {
        return goog.cssNameMapping_[t] || t
    },
    n = function(t) {
        for (var o = t.split("-"), e = [], n = 0; n < o.length; n++) e.push(r(o[n]));
        return e.join("-")
    };
    return e = goog.cssNameMapping_ ? "BY_WHOLE" == goog.cssNameMappingStyle_ ? r: n: function(t) {
        return t
    },
    o ? t + "-" + e(o) : e(t)
},
goog.setCssNameMapping = function(t, o) {
    goog.cssNameMapping_ = t,
    goog.cssNameMappingStyle_ = o
},
goog.global.CLOSURE_CSS_NAME_MAPPING,
!COMPILED && goog.global.CLOSURE_CSS_NAME_MAPPING && (goog.cssNameMapping_ = goog.global.CLOSURE_CSS_NAME_MAPPING),
goog.getMsg = function(t, o) {
    return o && (t = t.replace(/\{\$([^}]+)}/g,
    function(t, e) {
        return e in o ? o[e] : t
    })),
    t
},
goog.getMsgWithFallback = function(t, o) {
    return t
},
goog.exportSymbol = function(t, o, e) {
    goog.exportPath_(t, o, e)
},
goog.exportProperty = function(t, o, e) {
    t[o] = e
},
goog.inherits = function(t, o) {
    function e() {}
    e.prototype = o.prototype,
    t.superClass_ = o.prototype,
    t.prototype = new e,
    t.prototype.constructor = t,
    t.base = function(t, e, r) {
        var n = Array.prototype.slice.call(arguments, 2);
        return o.prototype[e].apply(t, n)
    }
},
goog.base = function(t, o, e) {
    var r = arguments.callee.caller;
    if (goog.STRICT_MODE_COMPATIBLE || goog.DEBUG && !r) throw Error("arguments.caller not defined.  goog.base() cannot be used with strict mode code. See http://www.ecma-international.org/ecma-262/5.1/#sec-C");
    if (r.superClass_) return r.superClass_.constructor.apply(t, Array.prototype.slice.call(arguments, 1));
    for (var n = Array.prototype.slice.call(arguments, 2), g = !1, i = t.constructor; i; i = i.superClass_ && i.superClass_.constructor) if (i.prototype[o] === r) g = !0;
    else if (g) return i.prototype[o].apply(t, n);
    if (t[o] === r) return t.constructor.prototype[o].apply(t, n);
    throw Error("goog.base called from a method of one name to a method of a different name")
},
goog.scope = function(t) {
    t.call(goog.global)
},
COMPILED || (goog.global.COMPILED = COMPILED),
goog.defineClass = function(t, o) {
    var e = o.constructor,
    r = o.statics;
    e && e != Object.prototype.constructor || (e = function() {
        throw Error("cannot instantiate an interface (no constructor defined).")
    });
    var n = goog.defineClass.createSealingConstructor_(e, t);
    return t && goog.inherits(n, t),
    delete o.constructor,
    delete o.statics,
    goog.defineClass.applyProperties_(n.prototype, o),
    null != r && (r instanceof Function ? r(n) : goog.defineClass.applyProperties_(n, r)),
    n
},
goog.defineClass.ClassDescriptor,
goog.define("goog.defineClass.SEAL_CLASS_INSTANCES", goog.DEBUG),
goog.defineClass.createSealingConstructor_ = function(t, o) {
    if (goog.defineClass.SEAL_CLASS_INSTANCES && Object.seal instanceof Function) {
        if (o && o.prototype && o.prototype[goog.UNSEALABLE_CONSTRUCTOR_PROPERTY_]) return t;
        var e = function() {
            var o = t.apply(this, arguments) || this;
            return o[goog.UID_PROPERTY_] = o[goog.UID_PROPERTY_],
            this.constructor === e && Object.seal(o),
            o
        };
        return e
    }
    return t
},
goog.defineClass.OBJECT_PROTOTYPE_FIELDS_ = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"],
goog.defineClass.applyProperties_ = function(t, o) {
    var e;
    for (e in o) Object.prototype.hasOwnProperty.call(o, e) && (t[e] = o[e]);
    for (var r = 0; r < goog.defineClass.OBJECT_PROTOTYPE_FIELDS_.length; r++) e = goog.defineClass.OBJECT_PROTOTYPE_FIELDS_[r],
    Object.prototype.hasOwnProperty.call(o, e) && (t[e] = o[e])
},
goog.tagUnsealableClass = function(t) { ! COMPILED && goog.defineClass.SEAL_CLASS_INSTANCES && (t.prototype[goog.UNSEALABLE_CONSTRUCTOR_PROPERTY_] = !0)
},
goog.UNSEALABLE_CONSTRUCTOR_PROPERTY_ = "goog_defineClass_legacy_unsealable",
goog.provide("goog.disposable.IDisposable"),
goog.disposable.IDisposable = function() {},
goog.disposable.IDisposable.prototype.dispose = goog.abstractMethod,
goog.disposable.IDisposable.prototype.isDisposed = goog.abstractMethod,
goog.provide("goog.Disposable"),
goog.provide("goog.dispose"),
goog.provide("goog.disposeAll"),
goog.require("goog.disposable.IDisposable"),
goog.Disposable = function() {
    goog.Disposable.MONITORING_MODE != goog.Disposable.MonitoringMode.OFF && (goog.Disposable.INCLUDE_STACK_ON_CREATION && (this.creationStack = (new Error).stack), goog.Disposable.instances_[goog.getUid(this)] = this),
    this.disposed_ = this.disposed_,
    this.onDisposeCallbacks_ = this.onDisposeCallbacks_
},
goog.Disposable.MonitoringMode = {
    OFF: 0,
    PERMANENT: 1,
    INTERACTIVE: 2
},
goog.define("goog.Disposable.MONITORING_MODE", 0),
goog.define("goog.Disposable.INCLUDE_STACK_ON_CREATION", !0),
goog.Disposable.instances_ = {},
goog.Disposable.getUndisposedObjects = function() {
    var t = [];
    for (var o in goog.Disposable.instances_) goog.Disposable.instances_.hasOwnProperty(o) && t.push(goog.Disposable.instances_[Number(o)]);
    return t
},
goog.Disposable.clearUndisposedObjects = function() {
    goog.Disposable.instances_ = {}
},
goog.Disposable.prototype.disposed_ = !1,
goog.Disposable.prototype.onDisposeCallbacks_,
goog.Disposable.prototype.creationStack,
goog.Disposable.prototype.isDisposed = function() {
    return this.disposed_
},
goog.Disposable.prototype.getDisposed = goog.Disposable.prototype.isDisposed,
goog.Disposable.prototype.dispose = function() {
    if (!this.disposed_ && (this.disposed_ = !0, this.disposeInternal(), goog.Disposable.MONITORING_MODE != goog.Disposable.MonitoringMode.OFF)) {
        var t = goog.getUid(this);
        if (goog.Disposable.MONITORING_MODE == goog.Disposable.MonitoringMode.PERMANENT && !goog.Disposable.instances_.hasOwnProperty(t)) throw Error(this + " did not call the goog.Disposable base constructor or was disposed of after a clearUndisposedObjects call");
        delete goog.Disposable.instances_[t]
    }
},
goog.Disposable.prototype.registerDisposable = function(t) {
    this.addOnDisposeCallback(goog.partial(goog.dispose, t))
},
goog.Disposable.prototype.addOnDisposeCallback = function(t, o) {
    this.onDisposeCallbacks_ || (this.onDisposeCallbacks_ = []),
    this.onDisposeCallbacks_.push(goog.isDef(o) ? goog.bind(t, o) : t)
},
goog.Disposable.prototype.disposeInternal = function() {
    if (this.onDisposeCallbacks_) for (; this.onDisposeCallbacks_.length;) this.onDisposeCallbacks_.shift()()
},
goog.Disposable.isDisposed = function(t) {
    return t && "function" == typeof t.isDisposed ? t.isDisposed() : !1
},
goog.dispose = function(t) {
    t && "function" == typeof t.dispose && t.dispose()
},
goog.disposeAll = function(t) {
    for (var o = 0,
    e = arguments.length; e > o; ++o) {
        var r = arguments[o];
        goog.isArrayLike(r) ? goog.disposeAll.apply(null, r) : goog.dispose(r)
    }
},
goog.provide("goog.events.EventId"),
goog.events.EventId = function(t) {
    this.id = t
},
goog.events.EventId.prototype.toString = function() {
    return this.id
},
goog.provide("goog.events.Event"),
goog.provide("goog.events.EventLike"),
goog.require("goog.Disposable"),
goog.require("goog.events.EventId"),
goog.events.EventLike,
goog.events.Event = function(t, o) {
    this.type = t instanceof goog.events.EventId ? String(t) : t,
    this.target = o,
    this.currentTarget = this.target,
    this.propagationStopped_ = !1,
    this.defaultPrevented = !1,
    this.returnValue_ = !0
},
goog.events.Event.prototype.disposeInternal = function() {},
goog.events.Event.prototype.dispose = function() {},
goog.events.Event.prototype.stopPropagation = function() {
    this.propagationStopped_ = !0
},
goog.events.Event.prototype.preventDefault = function() {
    this.defaultPrevented = !0,
    this.returnValue_ = !1
},
goog.events.Event.stopPropagation = function(t) {
    t.stopPropagation()
},
goog.events.Event.preventDefault = function(t) {
    t.preventDefault()
},
goog.provide("goog.debug.Error"),
goog.debug.Error = function(t) {
    if (Error.captureStackTrace) Error.captureStackTrace(this, goog.debug.Error);
    else {
        var o = (new Error).stack;
        o && (this.stack = o)
    }
    t && (this.message = String(t))
},
goog.inherits(goog.debug.Error, Error),
goog.debug.Error.prototype.name = "CustomError",
goog.provide("goog.dom.NodeType"),
goog.dom.NodeType = {
    ELEMENT: 1,
    ATTRIBUTE: 2,
    TEXT: 3,
    CDATA_SECTION: 4,
    ENTITY_REFERENCE: 5,
    ENTITY: 6,
    PROCESSING_INSTRUCTION: 7,
    COMMENT: 8,
    DOCUMENT: 9,
    DOCUMENT_TYPE: 10,
    DOCUMENT_FRAGMENT: 11,
    NOTATION: 12
},
goog.provide("goog.string"),
goog.provide("goog.string.Unicode"),
goog.define("goog.string.DETECT_DOUBLE_ESCAPING", !1),
goog.string.Unicode = {
    NBSP: " "
},
goog.string.startsWith = function(t, o) {
    return 0 == t.lastIndexOf(o, 0)
},
goog.string.endsWith = function(t, o) {
    var e = t.length - o.length;
    return e >= 0 && t.indexOf(o, e) == e
},
goog.string.caseInsensitiveStartsWith = function(t, o) {
    return 0 == goog.string.caseInsensitiveCompare(o, t.substr(0, o.length))
},
goog.string.caseInsensitiveEndsWith = function(t, o) {
    return 0 == goog.string.caseInsensitiveCompare(o, t.substr(t.length - o.length, o.length))
},
goog.string.caseInsensitiveEquals = function(t, o) {
    return t.toLowerCase() == o.toLowerCase()
},
goog.string.subs = function(t, o) {
    for (var e = t.split("%s"), r = "", n = Array.prototype.slice.call(arguments, 1); n.length && e.length > 1;) r += e.shift() + n.shift();
    return r + e.join("%s")
},
goog.string.collapseWhitespace = function(t) {
    return t.replace(/[\s\xa0]+/g, " ").replace(/^\s+|\s+$/g, "")
},
goog.string.isEmpty = function(t) {
    return /^[\s\xa0]*$/.test(t)
},
goog.string.isEmptySafe = function(t) {
    return goog.string.isEmpty(goog.string.makeSafe(t))
},
goog.string.isBreakingWhitespace = function(t) {
    return ! /[^\t\n\r ]/.test(t)
},
goog.string.isAlpha = function(t) {
    return ! /[^a-zA-Z]/.test(t)
},
goog.string.isNumeric = function(t) {
    return ! /[^0-9]/.test(t)
},
goog.string.isAlphaNumeric = function(t) {
    return ! /[^a-zA-Z0-9]/.test(t)
},
goog.string.isSpace = function(t) {
    return " " == t
},
goog.string.isUnicodeChar = function(t) {
    return 1 == t.length && t >= " " && "~" >= t || t >= "" && "�" >= t
},
goog.string.stripNewlines = function(t) {
    return t.replace(/(\r\n|\r|\n)+/g, " ")
},
goog.string.canonicalizeNewlines = function(t) {
    return t.replace(/(\r\n|\r|\n)/g, "\n")
},
goog.string.normalizeWhitespace = function(t) {
    return t.replace(/\xa0|\s/g, " ")
},
goog.string.normalizeSpaces = function(t) {
    return t.replace(/\xa0|[ \t]+/g, " ")
},
goog.string.collapseBreakingSpaces = function(t) {
    return t.replace(/[\t\r\n ]+/g, " ").replace(/^[\t\r\n ]+|[\t\r\n ]+$/g, "")
},
goog.string.trim = goog.TRUSTED_SITE && String.prototype.trim ?
function(t) {
    return t.trim()
}: function(t) {
    return t.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "")
},
goog.string.trimLeft = function(t) {
    return t.replace(/^[\s\xa0]+/, "")
},
goog.string.trimRight = function(t) {
    return t.replace(/[\s\xa0]+$/, "")
},
goog.string.caseInsensitiveCompare = function(t, o) {
    var e = String(t).toLowerCase(),
    r = String(o).toLowerCase();
    return r > e ? -1 : e == r ? 0 : 1
},
goog.string.numerateCompareRegExp_ = /(\.\d+)|(\d+)|(\D+)/g,
goog.string.numerateCompare = function(t, o) {
    if (t == o) return 0;
    if (!t) return - 1;
    if (!o) return 1;
    for (var e = t.toLowerCase().match(goog.string.numerateCompareRegExp_), r = o.toLowerCase().match(goog.string.numerateCompareRegExp_), n = Math.min(e.length, r.length), g = 0; n > g; g++) {
        var i = e[g],
        s = r[g];
        if (i != s) {
            var a = parseInt(i, 10);
            if (!isNaN(a)) {
                var l = parseInt(s, 10);
                if (!isNaN(l) && a - l) return a - l
            }
            return s > i ? -1 : 1
        }
    }
    return e.length != r.length ? e.length - r.length: o > t ? -1 : 1
},
goog.string.urlEncode = function(t) {
    return encodeURIComponent(String(t))
},
goog.string.urlDecode = function(t) {
    return decodeURIComponent(t.replace(/\+/g, " "))
},
goog.string.newLineToBr = function(t, o) {
    return t.replace(/(\r\n|\r|\n)/g, o ? "<br />": "<br>")
},
goog.string.htmlEscape = function(t, o) {
    return o ? (t = t.replace(goog.string.AMP_RE_, "&amp;").replace(goog.string.LT_RE_, "&lt;").replace(goog.string.GT_RE_, "&gt;").replace(goog.string.QUOT_RE_, "&quot;").replace(goog.string.SINGLE_QUOTE_RE_, "&#39;").replace(goog.string.NULL_RE_, "&#0;"), goog.string.DETECT_DOUBLE_ESCAPING && (t = t.replace(goog.string.E_RE_, "&#101;")), t) : goog.string.ALL_RE_.test(t) ? ( - 1 != t.indexOf("&") && (t = t.replace(goog.string.AMP_RE_, "&amp;")), -1 != t.indexOf("<") && (t = t.replace(goog.string.LT_RE_, "&lt;")), -1 != t.indexOf(">") && (t = t.replace(goog.string.GT_RE_, "&gt;")), -1 != t.indexOf('"') && (t = t.replace(goog.string.QUOT_RE_, "&quot;")), -1 != t.indexOf("'") && (t = t.replace(goog.string.SINGLE_QUOTE_RE_, "&#39;")), -1 != t.indexOf("\x00") && (t = t.replace(goog.string.NULL_RE_, "&#0;")), goog.string.DETECT_DOUBLE_ESCAPING && -1 != t.indexOf("e") && (t = t.replace(goog.string.E_RE_, "&#101;")), t) : t
},
goog.string.AMP_RE_ = /&/g,
goog.string.LT_RE_ = /</g,
goog.string.GT_RE_ = />/g,
goog.string.QUOT_RE_ = /"/g,
goog.string.SINGLE_QUOTE_RE_ = /'/g,
goog.string.NULL_RE_ = /\x00/g,
goog.string.E_RE_ = /e/g,
goog.string.ALL_RE_ = goog.string.DETECT_DOUBLE_ESCAPING ? /[\x00&<>"'e]/: /[\x00&<>"']/,
goog.string.unescapeEntities = function(t) {
    return goog.string.contains(t, "&") ? "document" in goog.global ? goog.string.unescapeEntitiesUsingDom_(t) : goog.string.unescapePureXmlEntities_(t) : t
},
goog.string.unescapeEntitiesWithDocument = function(t, o) {
    return goog.string.contains(t, "&") ? goog.string.unescapeEntitiesUsingDom_(t, o) : t
},
goog.string.unescapeEntitiesUsingDom_ = function(t, o) {
    var e, r = {
        "&amp;": "&",
        "&lt;": "<",
        "&gt;": ">",
        "&quot;": '"'
    };
    return e = o ? o.createElement("div") : goog.global.document.createElement("div"),
    t.replace(goog.string.HTML_ENTITY_PATTERN_,
    function(t, o) {
        var n = r[t];
        if (n) return n;
        if ("#" == o.charAt(0)) {
            var g = Number("0" + o.substr(1));
            isNaN(g) || (n = String.fromCharCode(g))
        }
        return n || (e.innerHTML = t + " ", n = e.firstChild.nodeValue.slice(0, -1)),
        r[t] = n
    })
},
goog.string.unescapePureXmlEntities_ = function(t) {
    return t.replace(/&([^;]+);/g,
    function(t, o) {
        switch (o) {
        case "amp":
            return "&";
        case "lt":
            return "<";
        case "gt":
            return ">";
        case "quot":
            return '"';
        default:
            if ("#" == o.charAt(0)) {
                var e = Number("0" + o.substr(1));
                if (!isNaN(e)) return String.fromCharCode(e)
            }
            return t
        }
    })
},
goog.string.HTML_ENTITY_PATTERN_ = /&([^;\s<&]+);?/g,
goog.string.whitespaceEscape = function(t, o) {
    return goog.string.newLineToBr(t.replace(/  /g, " &#160;"), o)
},
goog.string.preserveSpaces = function(t) {
    return t.replace(/(^|[\n ]) /g, "$1" + goog.string.Unicode.NBSP)
},
goog.string.stripQuotes = function(t, o) {
    for (var e = o.length,
    r = 0; e > r; r++) {
        var n = 1 == e ? o: o.charAt(r);
        if (t.charAt(0) == n && t.charAt(t.length - 1) == n) return t.substring(1, t.length - 1)
    }
    return t
},
goog.string.truncate = function(t, o, e) {
    return e && (t = goog.string.unescapeEntities(t)),
    t.length > o && (t = t.substring(0, o - 3) + "..."),
    e && (t = goog.string.htmlEscape(t)),
    t
},
goog.string.truncateMiddle = function(t, o, e, r) {
    if (e && (t = goog.string.unescapeEntities(t)), r && t.length > o) {
        r > o && (r = o);
        var n = t.length - r,
        g = o - r;
        t = t.substring(0, g) + "..." + t.substring(n)
    } else if (t.length > o) {
        var i = Math.floor(o / 2),
        s = t.length - i;
        i += o % 2,
        t = t.substring(0, i) + "..." + t.substring(s)
    }
    return e && (t = goog.string.htmlEscape(t)),
    t
},
goog.string.specialEscapeChars_ = {
    "\x00": "\\0",
    "\b": "\\b",
    "\f": "\\f",
    "\n": "\\n",
    "\r": "\\r",
    "	": "\\t",
    "": "\\x0B",
    '"': '\\"',
    "\\": "\\\\"
},
goog.string.jsEscapeCache_ = {
    "'": "\\'"
},
goog.string.quote = function(t) {
    if (t = String(t), t.quote) return t.quote();
    for (var o = ['"'], e = 0; e < t.length; e++) {
        var r = t.charAt(e),
        n = r.charCodeAt(0);
        o[e + 1] = goog.string.specialEscapeChars_[r] || (n > 31 && 127 > n ? r: goog.string.escapeChar(r))
    }
    return o.push('"'),
    o.join("")
},
goog.string.escapeString = function(t) {
    for (var o = [], e = 0; e < t.length; e++) o[e] = goog.string.escapeChar(t.charAt(e));
    return o.join("")
},
goog.string.escapeChar = function(t) {
    if (t in goog.string.jsEscapeCache_) return goog.string.jsEscapeCache_[t];
    if (t in goog.string.specialEscapeChars_) return goog.string.jsEscapeCache_[t] = goog.string.specialEscapeChars_[t];
    var o = t,
    e = t.charCodeAt(0);
    return e > 31 && 127 > e ? o = t: (256 > e ? (o = "\\x", (16 > e || e > 256) && (o += "0")) : (o = "\\u", 4096 > e && (o += "0")), o += e.toString(16).toUpperCase()),
    goog.string.jsEscapeCache_[t] = o
},
goog.string.contains = function(t, o) {
    return - 1 != t.indexOf(o)
},
goog.string.caseInsensitiveContains = function(t, o) {
    return goog.string.contains(t.toLowerCase(), o.toLowerCase())
},
goog.string.countOf = function(t, o) {
    return t && o ? t.split(o).length - 1 : 0
},
goog.string.removeAt = function(t, o, e) {
    var r = t;
    return o >= 0 && o < t.length && e > 0 && (r = t.substr(0, o) + t.substr(o + e, t.length - o - e)),
    r
},
goog.string.remove = function(t, o) {
    var e = new RegExp(goog.string.regExpEscape(o), "");
    return t.replace(e, "")
},
goog.string.removeAll = function(t, o) {
    var e = new RegExp(goog.string.regExpEscape(o), "g");
    return t.replace(e, "")
},
goog.string.regExpEscape = function(t) {
    return String(t).replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08")
},
goog.string.repeat = function(t, o) {
    return new Array(o + 1).join(t)
},
goog.string.padNumber = function(t, o, e) {
    var r = goog.isDef(e) ? t.toFixed(e) : String(t),
    n = r.indexOf(".");
    return - 1 == n && (n = r.length),
    goog.string.repeat("0", Math.max(0, o - n)) + r
},
goog.string.makeSafe = function(t) {
    return null == t ? "": String(t)
},
goog.string.buildString = function(t) {
    return Array.prototype.join.call(arguments, "")
},
goog.string.getRandomString = function() {
    var t = 2147483648;
    return Math.floor(Math.random() * t).toString(36) + Math.abs(Math.floor(Math.random() * t) ^ goog.now()).toString(36)
},
goog.string.compareVersions = function(t, o) {
    for (var e = 0,
    r = goog.string.trim(String(t)).split("."), n = goog.string.trim(String(o)).split("."), g = Math.max(r.length, n.length), i = 0; 0 == e && g > i; i++) {
        var s = r[i] || "",
        a = n[i] || "",
        l = new RegExp("(\\d*)(\\D*)", "g"),
        u = new RegExp("(\\d*)(\\D*)", "g");
        do {
            var c = l.exec(s) || ["", "", ""], P = u.exec(a) || ["", "", ""];
            if (0 == c[0].length && 0 == P[0].length) break;
            var p = 0 == c[1].length ? 0 : parseInt(c[1], 10), h = 0 == P[1].length ? 0 : parseInt(P[1], 10);
            e = goog.string.compareElements_(p, h) || goog.string.compareElements_(0 == c[2].length, 0 == P[2].length) || goog.string.compareElements_(c[2], P[2])
        } while ( 0 == e )
    }
    return e
},
goog.string.compareElements_ = function(t, o) {
    return o > t ? -1 : t > o ? 1 : 0
},
goog.string.HASHCODE_MAX_ = 4294967296,
goog.string.hashCode = function(t) {
    for (var o = 0,
    e = 0; e < t.length; ++e) o = 31 * o + t.charCodeAt(e),
    o %= goog.string.HASHCODE_MAX_;
    return o
},
goog.string.uniqueStringCounter_ = 2147483648 * Math.random() | 0,
goog.string.createUniqueString = function() {
    return "goog_" + goog.string.uniqueStringCounter_++
},
goog.string.toNumber = function(t) {
    var o = Number(t);
    return 0 == o && goog.string.isEmpty(t) ? NaN: o
},
goog.string.isLowerCamelCase = function(t) {
    return /^[a-z]+([A-Z][a-z]*)*$/.test(t)
},
goog.string.isUpperCamelCase = function(t) {
    return /^([A-Z][a-z]*)+$/.test(t)
},
goog.string.toCamelCase = function(t) {
    return String(t).replace(/\-([a-z])/g,
    function(t, o) {
        return o.toUpperCase()
    })
},
goog.string.toSelectorCase = function(t) {
    return String(t).replace(/([A-Z])/g, "-$1").toLowerCase()
},
goog.string.toTitleCase = function(t, o) {
    var e = goog.isString(o) ? goog.string.regExpEscape(o) : "\\s";
    e = e ? "|[" + e + "]+": "";
    var r = new RegExp("(^" + e + ")([a-z])", "g");
    return t.replace(r,
    function(t, o, e) {
        return o + e.toUpperCase()
    })
},
goog.string.parseInt = function(t) {
    return isFinite(t) && (t = String(t)),
    goog.isString(t) ? /^\s*-?0x/i.test(t) ? parseInt(t, 16) : parseInt(t, 10) : NaN
},
goog.string.splitLimit = function(t, o, e) {
    for (var r = t.split(o), n = []; e > 0 && r.length;) n.push(r.shift()),
    e--;
    return r.length && n.push(r.join(o)),
    n
},
goog.provide("goog.asserts"),
goog.provide("goog.asserts.AssertionError"),
goog.require("goog.debug.Error"),
goog.require("goog.dom.NodeType"),
goog.require("goog.string"),
goog.define("goog.asserts.ENABLE_ASSERTS", goog.DEBUG),
goog.asserts.AssertionError = function(t, o) {
    o.unshift(t),
    goog.debug.Error.call(this, goog.string.subs.apply(null, o)),
    o.shift(),
    this.messagePattern = t
},
goog.inherits(goog.asserts.AssertionError, goog.debug.Error),
goog.asserts.AssertionError.prototype.name = "AssertionError",
goog.asserts.DEFAULT_ERROR_HANDLER = function(t) {
    throw t
},
goog.asserts.errorHandler_ = goog.asserts.DEFAULT_ERROR_HANDLER,
goog.asserts.doAssertFailure_ = function(t, o, e, r) {
    var n = "Assertion failed";
    if (e) {
        n += ": " + e;
        var g = r
    } else t && (n += ": " + t, g = o);
    var i = new goog.asserts.AssertionError("" + n, g || []);
    goog.asserts.errorHandler_(i)
},
goog.asserts.setErrorHandler = function(t) {
    goog.asserts.ENABLE_ASSERTS && (goog.asserts.errorHandler_ = t)
},
goog.asserts.assert = function(t, o, e) {
    return goog.asserts.ENABLE_ASSERTS && !t && goog.asserts.doAssertFailure_("", null, o, Array.prototype.slice.call(arguments, 2)),
    t
},
goog.asserts.fail = function(t, o) {
    goog.asserts.ENABLE_ASSERTS && goog.asserts.errorHandler_(new goog.asserts.AssertionError("Failure" + (t ? ": " + t: ""), Array.prototype.slice.call(arguments, 1)))
},
goog.asserts.assertNumber = function(t, o, e) {
    return goog.asserts.ENABLE_ASSERTS && !goog.isNumber(t) && goog.asserts.doAssertFailure_("Expected number but got %s: %s.", [goog.typeOf(t), t], o, Array.prototype.slice.call(arguments, 2)),
    t
},
goog.asserts.assertString = function(t, o, e) {
    return goog.asserts.ENABLE_ASSERTS && !goog.isString(t) && goog.asserts.doAssertFailure_("Expected string but got %s: %s.", [goog.typeOf(t), t], o, Array.prototype.slice.call(arguments, 2)),
    t
},
goog.asserts.assertFunction = function(t, o, e) {
    return goog.asserts.ENABLE_ASSERTS && !goog.isFunction(t) && goog.asserts.doAssertFailure_("Expected function but got %s: %s.", [goog.typeOf(t), t], o, Array.prototype.slice.call(arguments, 2)),
    t
},
goog.asserts.assertObject = function(t, o, e) {
    return goog.asserts.ENABLE_ASSERTS && !goog.isObject(t) && goog.asserts.doAssertFailure_("Expected object but got %s: %s.", [goog.typeOf(t), t], o, Array.prototype.slice.call(arguments, 2)),
    t
},
goog.asserts.assertArray = function(t, o, e) {
    return goog.asserts.ENABLE_ASSERTS && !goog.isArray(t) && goog.asserts.doAssertFailure_("Expected array but got %s: %s.", [goog.typeOf(t), t], o, Array.prototype.slice.call(arguments, 2)),
    t
},
goog.asserts.assertBoolean = function(t, o, e) {
    return goog.asserts.ENABLE_ASSERTS && !goog.isBoolean(t) && goog.asserts.doAssertFailure_("Expected boolean but got %s: %s.", [goog.typeOf(t), t], o, Array.prototype.slice.call(arguments, 2)),
    t
},
goog.asserts.assertElement = function(t, o, e) {
    return ! goog.asserts.ENABLE_ASSERTS || goog.isObject(t) && t.nodeType == goog.dom.NodeType.ELEMENT || goog.asserts.doAssertFailure_("Expected Element but got %s: %s.", [goog.typeOf(t), t], o, Array.prototype.slice.call(arguments, 2)),
    t
},
goog.asserts.assertInstanceof = function(t, o, e, r) {
    return ! goog.asserts.ENABLE_ASSERTS || t instanceof o || goog.asserts.doAssertFailure_("instanceof check failed.", null, e, Array.prototype.slice.call(arguments, 3)),
    t
},
goog.asserts.assertObjectPrototypeIsIntact = function() {
    for (var t in Object.prototype) goog.asserts.fail(t + " should not be enumerable in Object.prototype.")
},
goog.provide("goog.array"),
goog.provide("goog.array.ArrayLike"),
goog.require("goog.asserts"),
goog.define("goog.NATIVE_ARRAY_PROTOTYPES", goog.TRUSTED_SITE),
goog.define("goog.array.ASSUME_NATIVE_FUNCTIONS", !1),
goog.array.ArrayLike,
goog.array.peek = function(t) {
    return t[t.length - 1]
},
goog.array.last = goog.array.peek,
goog.array.ARRAY_PROTOTYPE_ = Array.prototype,
goog.array.indexOf = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || goog.array.ARRAY_PROTOTYPE_.indexOf) ?
function(t, o, e) {
    return goog.asserts.assert(null != t.length),
    goog.array.ARRAY_PROTOTYPE_.indexOf.call(t, o, e)
}: function(t, o, e) {
    var r = null == e ? 0 : 0 > e ? Math.max(0, t.length + e) : e;
    if (goog.isString(t)) return goog.isString(o) && 1 == o.length ? t.indexOf(o, r) : -1;
    for (var n = r; n < t.length; n++) if (n in t && t[n] === o) return n;
    return - 1
},
goog.array.lastIndexOf = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || goog.array.ARRAY_PROTOTYPE_.lastIndexOf) ?
function(t, o, e) {
    goog.asserts.assert(null != t.length);
    var r = null == e ? t.length - 1 : e;
    return goog.array.ARRAY_PROTOTYPE_.lastIndexOf.call(t, o, r)
}: function(t, o, e) {
    var r = null == e ? t.length - 1 : e;
    if (0 > r && (r = Math.max(0, t.length + r)), goog.isString(t)) return goog.isString(o) && 1 == o.length ? t.lastIndexOf(o, r) : -1;
    for (var n = r; n >= 0; n--) if (n in t && t[n] === o) return n;
    return - 1
},
goog.array.forEach = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || goog.array.ARRAY_PROTOTYPE_.forEach) ?
function(t, o, e) {
    goog.asserts.assert(null != t.length),
    goog.array.ARRAY_PROTOTYPE_.forEach.call(t, o, e)
}: function(t, o, e) {
    for (var r = t.length,
    n = goog.isString(t) ? t.split("") : t, g = 0; r > g; g++) g in n && o.call(e, n[g], g, t)
},
goog.array.forEachRight = function(t, o, e) {
    for (var r = t.length,
    n = goog.isString(t) ? t.split("") : t, g = r - 1; g >= 0; --g) g in n && o.call(e, n[g], g, t)
},
goog.array.filter = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || goog.array.ARRAY_PROTOTYPE_.filter) ?
function(t, o, e) {
    return goog.asserts.assert(null != t.length),
    goog.array.ARRAY_PROTOTYPE_.filter.call(t, o, e)
}: function(t, o, e) {
    for (var r = t.length,
    n = [], g = 0, i = goog.isString(t) ? t.split("") : t, s = 0; r > s; s++) if (s in i) {
        var a = i[s];
        o.call(e, a, s, t) && (n[g++] = a)
    }
    return n
},
goog.array.map = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || goog.array.ARRAY_PROTOTYPE_.map) ?
function(t, o, e) {
    return goog.asserts.assert(null != t.length),
    goog.array.ARRAY_PROTOTYPE_.map.call(t, o, e)
}: function(t, o, e) {
    for (var r = t.length,
    n = new Array(r), g = goog.isString(t) ? t.split("") : t, i = 0; r > i; i++) i in g && (n[i] = o.call(e, g[i], i, t));
    return n
},
goog.array.reduce = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || goog.array.ARRAY_PROTOTYPE_.reduce) ?
function(t, o, e, r) {
    return goog.asserts.assert(null != t.length),
    r && (o = goog.bind(o, r)),
    goog.array.ARRAY_PROTOTYPE_.reduce.call(t, o, e)
}: function(t, o, e, r) {
    var n = e;
    return goog.array.forEach(t,
    function(e, g) {
        n = o.call(r, n, e, g, t)
    }),
    n
},
goog.array.reduceRight = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || goog.array.ARRAY_PROTOTYPE_.reduceRight) ?
function(t, o, e, r) {
    return goog.asserts.assert(null != t.length),
    r && (o = goog.bind(o, r)),
    goog.array.ARRAY_PROTOTYPE_.reduceRight.call(t, o, e)
}: function(t, o, e, r) {
    var n = e;
    return goog.array.forEachRight(t,
    function(e, g) {
        n = o.call(r, n, e, g, t)
    }),
    n
},
goog.array.some = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || goog.array.ARRAY_PROTOTYPE_.some) ?
function(t, o, e) {
    return goog.asserts.assert(null != t.length),
    goog.array.ARRAY_PROTOTYPE_.some.call(t, o, e)
}: function(t, o, e) {
    for (var r = t.length,
    n = goog.isString(t) ? t.split("") : t, g = 0; r > g; g++) if (g in n && o.call(e, n[g], g, t)) return ! 0;
    return ! 1
},
goog.array.every = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || goog.array.ARRAY_PROTOTYPE_.every) ?
function(t, o, e) {
    return goog.asserts.assert(null != t.length),
    goog.array.ARRAY_PROTOTYPE_.every.call(t, o, e)
}: function(t, o, e) {
    for (var r = t.length,
    n = goog.isString(t) ? t.split("") : t, g = 0; r > g; g++) if (g in n && !o.call(e, n[g], g, t)) return ! 1;
    return ! 0
},
goog.array.count = function(t, o, e) {
    var r = 0;
    return goog.array.forEach(t,
    function(t, n, g) {
        o.call(e, t, n, g) && ++r
    },
    e),
    r
},
goog.array.find = function(t, o, e) {
    var r = goog.array.findIndex(t, o, e);
    return 0 > r ? null: goog.isString(t) ? t.charAt(r) : t[r]
},
goog.array.findIndex = function(t, o, e) {
    for (var r = t.length,
    n = goog.isString(t) ? t.split("") : t, g = 0; r > g; g++) if (g in n && o.call(e, n[g], g, t)) return g;
    return - 1
},
goog.array.findRight = function(t, o, e) {
    var r = goog.array.findIndexRight(t, o, e);
    return 0 > r ? null: goog.isString(t) ? t.charAt(r) : t[r]
},
goog.array.findIndexRight = function(t, o, e) {
    for (var r = t.length,
    n = goog.isString(t) ? t.split("") : t, g = r - 1; g >= 0; g--) if (g in n && o.call(e, n[g], g, t)) return g;
    return - 1
},
goog.array.contains = function(t, o) {
    return goog.array.indexOf(t, o) >= 0
},
goog.array.isEmpty = function(t) {
    return 0 == t.length
},
goog.array.clear = function(t) {
    if (!goog.isArray(t)) for (var o = t.length - 1; o >= 0; o--) delete t[o];
    t.length = 0
},
goog.array.insert = function(t, o) {
    goog.array.contains(t, o) || t.push(o)
},
goog.array.insertAt = function(t, o, e) {
    goog.array.splice(t, e, 0, o)
},
goog.array.insertArrayAt = function(t, o, e) {
    goog.partial(goog.array.splice, t, e, 0).apply(null, o)
},
goog.array.insertBefore = function(t, o, e) {
    var r;
    2 == arguments.length || (r = goog.array.indexOf(t, e)) < 0 ? t.push(o) : goog.array.insertAt(t, o, r)
},
goog.array.remove = function(t, o) {
    var e, r = goog.array.indexOf(t, o);
    return (e = r >= 0) && goog.array.removeAt(t, r),
    e
},
goog.array.removeAt = function(t, o) {
    return goog.asserts.assert(null != t.length),
    1 == goog.array.ARRAY_PROTOTYPE_.splice.call(t, o, 1).length
},
goog.array.removeIf = function(t, o, e) {
    var r = goog.array.findIndex(t, o, e);
    return r >= 0 ? (goog.array.removeAt(t, r), !0) : !1
},
goog.array.removeAllIf = function(t, o, e) {
    var r = 0;
    return goog.array.forEachRight(t,
    function(n, g) {
        o.call(e, n, g, t) && goog.array.removeAt(t, g) && r++
    }),
    r
},
goog.array.concat = function(t) {
    return goog.array.ARRAY_PROTOTYPE_.concat.apply(goog.array.ARRAY_PROTOTYPE_, arguments)
},
goog.array.join = function(t) {
    return goog.array.ARRAY_PROTOTYPE_.concat.apply(goog.array.ARRAY_PROTOTYPE_, arguments)
},
goog.array.toArray = function(t) {
    var o = t.length;
    if (o > 0) {
        for (var e = new Array(o), r = 0; o > r; r++) e[r] = t[r];
        return e
    }
    return []
},
goog.array.clone = goog.array.toArray,
goog.array.extend = function(t, o) {
    for (var e = 1; e < arguments.length; e++) {
        var r, n = arguments[e];
        if (goog.isArray(n) || (r = goog.isArrayLike(n)) && Object.prototype.hasOwnProperty.call(n, "callee")) t.push.apply(t, n);
        else if (r) for (var g = t.length,
        i = n.length,
        s = 0; i > s; s++) t[g + s] = n[s];
        else t.push(n)
    }
},
goog.array.splice = function(t, o, e, r) {
    return goog.asserts.assert(null != t.length),
    goog.array.ARRAY_PROTOTYPE_.splice.apply(t, goog.array.slice(arguments, 1))
},
goog.array.slice = function(t, o, e) {
    return goog.asserts.assert(null != t.length),
    arguments.length <= 2 ? goog.array.ARRAY_PROTOTYPE_.slice.call(t, o) : goog.array.ARRAY_PROTOTYPE_.slice.call(t, o, e)
},
goog.array.removeDuplicates = function(t, o, e) {
    for (var r = o || t,
    n = function(t) {
        return goog.isObject(l) ? "o" + goog.getUid(l) : (typeof l).charAt(0) + l
    },
    g = e || n, i = {},
    s = 0, a = 0; a < t.length;) {
        var l = t[a++],
        u = g(l);
        Object.prototype.hasOwnProperty.call(i, u) || (i[u] = !0, r[s++] = l)
    }
    r.length = s
},
goog.array.binarySearch = function(t, o, e) {
    return goog.array.binarySearch_(t, e || goog.array.defaultCompare, !1, o)
},
goog.array.binarySelect = function(t, o, e) {
    return goog.array.binarySearch_(t, o, !0, void 0, e)
},
goog.array.binarySearch_ = function(t, o, e, r, n) {
    for (var g, i = 0,
    s = t.length; s > i;) {
        var a, l = i + s >> 1;
        a = e ? o.call(n, t[l], l, t) : o(r, t[l]),
        a > 0 ? i = l + 1 : (s = l, g = !a)
    }
    return g ? i: ~i
},
goog.array.sort = function(t, o) {
    t.sort(o || goog.array.defaultCompare)
},
goog.array.stableSort = function(t, o) {
    function e(t, o) {
        return n(t.value, o.value) || t.index - o.index
    }
    for (var r = 0; r < t.length; r++) t[r] = {
        index: r,
        value: t[r]
    };
    var n = o || goog.array.defaultCompare;
    goog.array.sort(t, e);
    for (var r = 0; r < t.length; r++) t[r] = t[r].value
},
goog.array.sortByKey = function(t, o, e) {
    var r = e || goog.array.defaultCompare;
    goog.array.sort(t,
    function(t, e) {
        return r(o(t), o(e))
    })
},
goog.array.sortObjectsByKey = function(t, o, e) {
    goog.array.sortByKey(t,
    function(t) {
        return t[o]
    },
    e)
},
goog.array.isSorted = function(t, o, e) {
    for (var r = o || goog.array.defaultCompare,
    n = 1; n < t.length; n++) {
        var g = r(t[n - 1], t[n]);
        if (g > 0 || 0 == g && e) return ! 1
    }
    return ! 0
},
goog.array.equals = function(t, o, e) {
    if (!goog.isArrayLike(t) || !goog.isArrayLike(o) || t.length != o.length) return ! 1;
    for (var r = t.length,
    n = e || goog.array.defaultCompareEquality,
    g = 0; r > g; g++) if (!n(t[g], o[g])) return ! 1;
    return ! 0
},
goog.array.compare3 = function(t, o, e) {
    for (var r = e || goog.array.defaultCompare,
    n = Math.min(t.length, o.length), g = 0; n > g; g++) {
        var i = r(t[g], o[g]);
        if (0 != i) return i
    }
    return goog.array.defaultCompare(t.length, o.length)
},
goog.array.defaultCompare = function(t, o) {
    return t > o ? 1 : o > t ? -1 : 0
},
goog.array.defaultCompareEquality = function(t, o) {
    return t === o
},
goog.array.binaryInsert = function(t, o, e) {
    var r = goog.array.binarySearch(t, o, e);
    return 0 > r ? (goog.array.insertAt(t, o, -(r + 1)), !0) : !1
},
goog.array.binaryRemove = function(t, o, e) {
    var r = goog.array.binarySearch(t, o, e);
    return r >= 0 ? goog.array.removeAt(t, r) : !1
},
goog.array.bucket = function(t, o, e) {
    for (var r = {},
    n = 0; n < t.length; n++) {
        var g = t[n],
        i = o.call(e, g, n, t);
        if (goog.isDef(i)) {
            var s = r[i] || (r[i] = []);
            s.push(g)
        }
    }
    return r
},
goog.array.toObject = function(t, o, e) {
    var r = {};
    return goog.array.forEach(t,
    function(n, g) {
        r[o.call(e, n, g, t)] = n
    }),
    r
},
goog.array.range = function(t, o, e) {
    var r = [],
    n = 0,
    g = t,
    i = e || 1;
    if (void 0 !== o && (n = t, g = o), 0 > i * (g - n)) return [];
    if (i > 0) for (var s = n; g > s; s += i) r.push(s);
    else for (var s = n; s > g; s += i) r.push(s);
    return r
},
goog.array.repeat = function(t, o) {
    for (var e = [], r = 0; o > r; r++) e[r] = t;
    return e
},
goog.array.flatten = function(t) {
    for (var o = [], e = 0; e < arguments.length; e++) {
        var r = arguments[e];
        goog.isArray(r) ? o.push.apply(o, goog.array.flatten.apply(null, r)) : o.push(r)
    }
    return o
},
goog.array.rotate = function(t, o) {
    return goog.asserts.assert(null != t.length),
    t.length && (o %= t.length, o > 0 ? goog.array.ARRAY_PROTOTYPE_.unshift.apply(t, t.splice( - o, o)) : 0 > o && goog.array.ARRAY_PROTOTYPE_.push.apply(t, t.splice(0, -o))),
    t
},
goog.array.moveItem = function(t, o, e) {
    goog.asserts.assert(o >= 0 && o < t.length),
    goog.asserts.assert(e >= 0 && e < t.length);
    var r = goog.array.ARRAY_PROTOTYPE_.splice.call(t, o, 1);
    goog.array.ARRAY_PROTOTYPE_.splice.call(t, e, 0, r[0])
},
goog.array.zip = function(t) {
    if (!arguments.length) return [];
    for (var o = [], e = 0; ! 0; e++) {
        for (var r = [], n = 0; n < arguments.length; n++) {
            var g = arguments[n];
            if (e >= g.length) return o;
            r.push(g[e])
        }
        o.push(r)
    }
},
goog.array.shuffle = function(t, o) {
    for (var e = o || Math.random,
    r = t.length - 1; r > 0; r--) {
        var n = Math.floor(e() * (r + 1)),
        g = t[r];
        t[r] = t[n],
        t[n] = g
    }
},
goog.provide("goog.object"),
goog.require("goog.array"),
goog.object.forEach = function(t, o, e) {
    for (var r in t) o.call(e, t[r], r, t)
},
goog.object.filter = function(t, o, e) {
    var r = {};
    for (var n in t) o.call(e, t[n], n, t) && (r[n] = t[n]);
    return r
},
goog.object.map = function(t, o, e) {
    var r = {};
    for (var n in t) r[n] = o.call(e, t[n], n, t);
    return r
},
goog.object.some = function(t, o, e) {
    for (var r in t) if (o.call(e, t[r], r, t)) return ! 0;
    return ! 1
},
goog.object.every = function(t, o, e) {
    for (var r in t) if (!o.call(e, t[r], r, t)) return ! 1;
    return ! 0
},
goog.object.getCount = function(t) {
    var o = 0;
    for (var e in t) o++;
    return o
},
goog.object.getAnyKey = function(t) {
    for (var o in t) return o
},
goog.object.getAnyValue = function(t) {
    for (var o in t) return t[o]
},
goog.object.contains = function(t, o) {
    return goog.object.containsValue(t, o)
},
goog.object.getValues = function(t) {
    var o = [],
    e = 0;
    for (var r in t) o[e++] = t[r];
    return o
},
goog.object.getKeys = function(t) {
    var o = [],
    e = 0;
    for (var r in t) o[e++] = r;
    return o
},
goog.object.getValueByKeys = function(t, o) {
    for (var e = goog.isArrayLike(o), r = e ? o: arguments, n = e ? 0 : 1; n < r.length && (t = t[r[n]], goog.isDef(t)); n++);
    return t
},
goog.object.containsKey = function(t, o) {
    return o in t
},
goog.object.containsValue = function(t, o) {
    for (var e in t) if (t[e] == o) return ! 0;
    return ! 1
},
goog.object.findKey = function(t, o, e) {
    for (var r in t) if (o.call(e, t[r], r, t)) return r;
    return void 0
},
goog.object.findValue = function(t, o, e) {
    var r = goog.object.findKey(t, o, e);
    return r && t[r]
},
goog.object.isEmpty = function(t) {
    for (var o in t) return ! 1;
    return ! 0
},
goog.object.clear = function(t) {
    for (var o in t) delete t[o]
},
goog.object.remove = function(t, o) {
    var e;
    return (e = o in t) && delete t[o],
    e
},
goog.object.add = function(t, o, e) {
    if (o in t) throw Error('The object already contains the key "' + o + '"');
    goog.object.set(t, o, e)
},
goog.object.get = function(t, o, e) {
    return o in t ? t[o] : e
},
goog.object.set = function(t, o, e) {
    t[o] = e
},
goog.object.setIfUndefined = function(t, o, e) {
    return o in t ? t[o] : t[o] = e
},
goog.object.equals = function(t, o) {
    if (!goog.array.equals(goog.object.getKeys(t), goog.object.getKeys(o))) return ! 1;
    for (var e in t) if (t[e] !== o[e]) return ! 1;
    return ! 0
},
goog.object.clone = function(t) {
    var o = {};
    for (var e in t) o[e] = t[e];
    return o
},
goog.object.unsafeClone = function(t) {
    var o = goog.typeOf(t);
    if ("object" == o || "array" == o) {
        if (t.clone) return t.clone();
        var e = "array" == o ? [] : {};
        for (var r in t) e[r] = goog.object.unsafeClone(t[r]);
        return e
    }
    return t
},
goog.object.transpose = function(t) {
    var o = {};
    for (var e in t) o[t[e]] = e;
    return o
},
goog.object.PROTOTYPE_FIELDS_ = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"],
goog.object.extend = function(t, o) {
    for (var e, r, n = 1; n < arguments.length; n++) {
        r = arguments[n];
        for (e in r) t[e] = r[e];
        for (var g = 0; g < goog.object.PROTOTYPE_FIELDS_.length; g++) e = goog.object.PROTOTYPE_FIELDS_[g],
        Object.prototype.hasOwnProperty.call(r, e) && (t[e] = r[e])
    }
},
goog.object.create = function(t) {
    var o = arguments.length;
    if (1 == o && goog.isArray(arguments[0])) return goog.object.create.apply(null, arguments[0]);
    if (o % 2) throw Error("Uneven number of arguments");
    for (var e = {},
    r = 0; o > r; r += 2) e[arguments[r]] = arguments[r + 1];
    return e
},
goog.object.createSet = function(t) {
    var o = arguments.length;
    if (1 == o && goog.isArray(arguments[0])) return goog.object.createSet.apply(null, arguments[0]);
    for (var e = {},
    r = 0; o > r; r++) e[arguments[r]] = !0;
    return e
},
goog.object.createImmutableView = function(t) {
    var o = t;
    return Object.isFrozen && !Object.isFrozen(t) && (o = Object.create(t), Object.freeze(o)),
    o
},
goog.object.isImmutableView = function(t) {
    return !! Object.isFrozen && Object.isFrozen(t)
},
goog.provide("goog.labs.userAgent.util"),
goog.require("goog.string"),
goog.labs.userAgent.util.getNativeUserAgentString_ = function() {
    var t = goog.labs.userAgent.util.getNavigator_();
    if (t) {
        var o = t.userAgent;
        if (o) return o
    }
    return ""
},
goog.labs.userAgent.util.getNavigator_ = function() {
    return goog.global.navigator
},
goog.labs.userAgent.util.userAgent_ = goog.labs.userAgent.util.getNativeUserAgentString_(),
goog.labs.userAgent.util.setUserAgent = function(t) {
    goog.labs.userAgent.util.userAgent_ = t || goog.labs.userAgent.util.getNativeUserAgentString_()
},
goog.labs.userAgent.util.getUserAgent = function() {
    return goog.labs.userAgent.util.userAgent_
},
goog.labs.userAgent.util.matchUserAgent = function(t) {
    var o = goog.labs.userAgent.util.getUserAgent();
    return goog.string.contains(o, t)
},
goog.labs.userAgent.util.matchUserAgentIgnoreCase = function(t) {
    var o = goog.labs.userAgent.util.getUserAgent();
    return goog.string.caseInsensitiveContains(o, t)
},
goog.labs.userAgent.util.extractVersionTuples = function(t) {
    for (var o, e = new RegExp("(\\w[\\w ]+)/([^\\s]+)\\s*(?:\\((.*?)\\))?", "g"), r = []; o = e.exec(t);) r.push([o[1], o[2], o[3] || void 0]);
    return r
},
goog.provide("goog.labs.userAgent.browser"),
goog.require("goog.array"),
goog.require("goog.labs.userAgent.util"),
goog.require("goog.object"),
goog.require("goog.string"),
goog.labs.userAgent.browser.matchOpera_ = function() {
    return goog.labs.userAgent.util.matchUserAgent("Opera") || goog.labs.userAgent.util.matchUserAgent("OPR")
},
goog.labs.userAgent.browser.matchIE_ = function() {
    return goog.labs.userAgent.util.matchUserAgent("Trident") || goog.labs.userAgent.util.matchUserAgent("MSIE")
},
goog.labs.userAgent.browser.matchFirefox_ = function() {
    return goog.labs.userAgent.util.matchUserAgent("Firefox")
},
goog.labs.userAgent.browser.matchSafari_ = function() {
    return goog.labs.userAgent.util.matchUserAgent("Safari") && !goog.labs.userAgent.util.matchUserAgent("Chrome") && !goog.labs.userAgent.util.matchUserAgent("CriOS") && !goog.labs.userAgent.util.matchUserAgent("Android")
},
goog.labs.userAgent.browser.matchChrome_ = function() {
    return goog.labs.userAgent.util.matchUserAgent("Chrome") || goog.labs.userAgent.util.matchUserAgent("CriOS")
},
goog.labs.userAgent.browser.matchAndroidBrowser_ = function() {
    return ! goog.labs.userAgent.browser.isChrome() && goog.labs.userAgent.util.matchUserAgent("Android")
},
goog.labs.userAgent.browser.isOpera = goog.labs.userAgent.browser.matchOpera_,
goog.labs.userAgent.browser.isIE = goog.labs.userAgent.browser.matchIE_,
goog.labs.userAgent.browser.isFirefox = goog.labs.userAgent.browser.matchFirefox_,
goog.labs.userAgent.browser.isSafari = goog.labs.userAgent.browser.matchSafari_,
goog.labs.userAgent.browser.isChrome = goog.labs.userAgent.browser.matchChrome_,
goog.labs.userAgent.browser.isAndroidBrowser = goog.labs.userAgent.browser.matchAndroidBrowser_,
goog.labs.userAgent.browser.isSilk = function() {
    return goog.labs.userAgent.util.matchUserAgent("Silk")
},
goog.labs.userAgent.browser.getVersion = function() {
    function t(t) {
        var o = goog.array.find(t, n);
        return r[o] || ""
    }
    var o = goog.labs.userAgent.util.getUserAgent();
    if (goog.labs.userAgent.browser.isIE()) return goog.labs.userAgent.browser.getIEVersion_(o);
    var e = goog.labs.userAgent.util.extractVersionTuples(o),
    r = {};
    goog.array.forEach(e,
    function(t) {
        var o = t[0],
        e = t[1];
        r[o] = e
    });
    var n = goog.partial(goog.object.containsKey, r);
    if (goog.labs.userAgent.browser.isOpera()) return t(["Version", "Opera", "OPR"]);
    if (goog.labs.userAgent.browser.isChrome()) return t(["Chrome", "CriOS"]);
    var g = e[2];
    return g && g[1] || ""
},
goog.labs.userAgent.browser.isVersionOrHigher = function(t) {
    return goog.string.compareVersions(goog.labs.userAgent.browser.getVersion(), t) >= 0
},
goog.labs.userAgent.browser.getIEVersion_ = function(t) {
    var o = /rv: *([\d\.]*)/.exec(t);
    if (o && o[1]) return o[1];
    var e = "",
    r = /MSIE +([\d\.]+)/.exec(t);
    if (r && r[1]) {
        var n = /Trident\/(\d.\d)/.exec(t);
        if ("7.0" == r[1]) if (n && n[1]) switch (n[1]) {
        case "4.0":
            e = "8.0";
            break;
        case "5.0":
            e = "9.0";
            break;
        case "6.0":
            e = "10.0";
            break;
        case "7.0":
            e = "11.0"
        } else e = "7.0";
        else e = r[1]
    }
    return e
},
goog.provide("goog.labs.userAgent.engine"),
goog.require("goog.array"),
goog.require("goog.labs.userAgent.util"),
goog.require("goog.string"),
goog.labs.userAgent.engine.isPresto = function() {
    return goog.labs.userAgent.util.matchUserAgent("Presto")
},
goog.labs.userAgent.engine.isTrident = function() {
    return goog.labs.userAgent.util.matchUserAgent("Trident") || goog.labs.userAgent.util.matchUserAgent("MSIE")
},
goog.labs.userAgent.engine.isWebKit = function() {
    return goog.labs.userAgent.util.matchUserAgentIgnoreCase("WebKit")
},
goog.labs.userAgent.engine.isGecko = function() {
    return goog.labs.userAgent.util.matchUserAgent("Gecko") && !goog.labs.userAgent.engine.isWebKit() && !goog.labs.userAgent.engine.isTrident()
},
goog.labs.userAgent.engine.getVersion = function() {
    var t = goog.labs.userAgent.util.getUserAgent();
    if (t) {
        var o = goog.labs.userAgent.util.extractVersionTuples(t),
        e = o[1];
        if (e) return "Gecko" == e[0] ? goog.labs.userAgent.engine.getVersionForKey_(o, "Firefox") : e[1];
        var r, n = o[0];
        if (n && (r = n[2])) {
            var g = /Trident\/([^\s;]+)/.exec(r);
            if (g) return g[1]
        }
    }
    return ""
},
goog.labs.userAgent.engine.isVersionOrHigher = function(t) {
    return goog.string.compareVersions(goog.labs.userAgent.engine.getVersion(), t) >= 0
},
goog.labs.userAgent.engine.getVersionForKey_ = function(t, o) {
    var e = goog.array.find(t,
    function(t) {
        return o == t[0]
    });
    return e && e[1] || ""
},
goog.provide("goog.reflect"),
goog.reflect.object = function(t, o) {
    return o
},
goog.reflect.sinkValue = function(t) {
    return goog.reflect.sinkValue[" "](t),
    t
},
goog.reflect.sinkValue[" "] = goog.nullFunction,
goog.reflect.canAccessProperty = function(t, o) {
    try {
        return goog.reflect.sinkValue(t[o]),
        !0
    } catch(e) {}
    return ! 1
},
goog.provide("goog.userAgent"),
goog.require("goog.labs.userAgent.browser"),
goog.require("goog.labs.userAgent.engine"),
goog.require("goog.labs.userAgent.util"),
goog.require("goog.string"),
goog.define("goog.userAgent.ASSUME_IE", !1),
goog.define("goog.userAgent.ASSUME_GECKO", !1),
goog.define("goog.userAgent.ASSUME_WEBKIT", !1),
goog.define("goog.userAgent.ASSUME_MOBILE_WEBKIT", !1),
goog.define("goog.userAgent.ASSUME_OPERA", !1),
goog.define("goog.userAgent.ASSUME_ANY_VERSION", !1),
goog.userAgent.BROWSER_KNOWN_ = goog.userAgent.ASSUME_IE || goog.userAgent.ASSUME_GECKO || goog.userAgent.ASSUME_MOBILE_WEBKIT || goog.userAgent.ASSUME_WEBKIT || goog.userAgent.ASSUME_OPERA,
goog.userAgent.getUserAgentString = function() {
    return goog.labs.userAgent.util.getUserAgent()
},
goog.userAgent.getNavigator = function() {
    return goog.global.navigator || null
},
goog.userAgent.OPERA = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_OPERA: goog.labs.userAgent.browser.isOpera(),
goog.userAgent.IE = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_IE: goog.labs.userAgent.browser.isIE(),
goog.userAgent.GECKO = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_GECKO: goog.labs.userAgent.engine.isGecko(),
goog.userAgent.WEBKIT = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_WEBKIT || goog.userAgent.ASSUME_MOBILE_WEBKIT: goog.labs.userAgent.engine.isWebKit(),
goog.userAgent.isMobile_ = function() {
    return goog.userAgent.WEBKIT && goog.labs.userAgent.util.matchUserAgent("Mobile")
},
goog.userAgent.MOBILE = goog.userAgent.ASSUME_MOBILE_WEBKIT || goog.userAgent.isMobile_(),
goog.userAgent.SAFARI = goog.userAgent.WEBKIT,
goog.userAgent.determinePlatform_ = function() {
    var t = goog.userAgent.getNavigator();
    return t && t.platform || ""
},
goog.userAgent.PLATFORM = goog.userAgent.determinePlatform_(),
goog.define("goog.userAgent.ASSUME_MAC", !1),
goog.define("goog.userAgent.ASSUME_WINDOWS", !1),
goog.define("goog.userAgent.ASSUME_LINUX", !1),
goog.define("goog.userAgent.ASSUME_X11", !1),
goog.define("goog.userAgent.ASSUME_ANDROID", !1),
goog.define("goog.userAgent.ASSUME_IPHONE", !1),
goog.define("goog.userAgent.ASSUME_IPAD", !1),
goog.userAgent.PLATFORM_KNOWN_ = goog.userAgent.ASSUME_MAC || goog.userAgent.ASSUME_WINDOWS || goog.userAgent.ASSUME_LINUX || goog.userAgent.ASSUME_X11 || goog.userAgent.ASSUME_ANDROID || goog.userAgent.ASSUME_IPHONE || goog.userAgent.ASSUME_IPAD,
goog.userAgent.initPlatform_ = function() {
    goog.userAgent.detectedMac_ = goog.string.contains(goog.userAgent.PLATFORM, "Mac"),
    goog.userAgent.detectedWindows_ = goog.string.contains(goog.userAgent.PLATFORM, "Win"),
    goog.userAgent.detectedLinux_ = goog.string.contains(goog.userAgent.PLATFORM, "Linux"),
    goog.userAgent.detectedX11_ = !!goog.userAgent.getNavigator() && goog.string.contains(goog.userAgent.getNavigator().appVersion || "", "X11");
    var t = goog.userAgent.getUserAgentString();
    goog.userAgent.detectedAndroid_ = !!t && goog.string.contains(t, "Android"),
    goog.userAgent.detectedIPhone_ = !!t && goog.string.contains(t, "iPhone"),
    goog.userAgent.detectedIPad_ = !!t && goog.string.contains(t, "iPad")
},
goog.userAgent.PLATFORM_KNOWN_ || goog.userAgent.initPlatform_(),
goog.userAgent.MAC = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_MAC: goog.userAgent.detectedMac_,
goog.userAgent.WINDOWS = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_WINDOWS: goog.userAgent.detectedWindows_,
goog.userAgent.LINUX = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_LINUX: goog.userAgent.detectedLinux_,
goog.userAgent.X11 = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_X11: goog.userAgent.detectedX11_,
goog.userAgent.ANDROID = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_ANDROID: goog.userAgent.detectedAndroid_,
goog.userAgent.IPHONE = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_IPHONE: goog.userAgent.detectedIPhone_,
goog.userAgent.IPAD = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_IPAD: goog.userAgent.detectedIPad_,
goog.userAgent.determineVersion_ = function() {
    var t, o = "";
    if (goog.userAgent.OPERA && goog.global.opera) {
        var e = goog.global.opera.version;
        return goog.isFunction(e) ? e() : e
    }
    if (goog.userAgent.GECKO ? t = /rv\:([^\);]+)(\)|;)/: goog.userAgent.IE ? t = /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/: goog.userAgent.WEBKIT && (t = /WebKit\/(\S+)/), t) {
        var r = t.exec(goog.userAgent.getUserAgentString());
        o = r ? r[1] : ""
    }
    if (goog.userAgent.IE) {
        var n = goog.userAgent.getDocumentMode_();
        if (n > parseFloat(o)) return String(n)
    }
    return o
},
goog.userAgent.getDocumentMode_ = function() {
    var t = goog.global.document;
    return t ? t.documentMode: void 0
},
goog.userAgent.VERSION = goog.userAgent.determineVersion_(),
goog.userAgent.compare = function(t, o) {
    return goog.string.compareVersions(t, o)
},
goog.userAgent.isVersionOrHigherCache_ = {},
goog.userAgent.isVersionOrHigher = function(t) {
    return goog.userAgent.ASSUME_ANY_VERSION || goog.userAgent.isVersionOrHigherCache_[t] || (goog.userAgent.isVersionOrHigherCache_[t] = goog.string.compareVersions(goog.userAgent.VERSION, t) >= 0)
},
goog.userAgent.isVersion = goog.userAgent.isVersionOrHigher,
goog.userAgent.isDocumentModeOrHigher = function(t) {
    return goog.userAgent.IE && goog.userAgent.DOCUMENT_MODE >= t
},
goog.userAgent.isDocumentMode = goog.userAgent.isDocumentModeOrHigher,
goog.userAgent.DOCUMENT_MODE = function() {
    var t = goog.global.document;
    if (!t || !goog.userAgent.IE) return void 0;
    var o = goog.userAgent.getDocumentMode_();
    return o || ("CSS1Compat" == t.compatMode ? parseInt(goog.userAgent.VERSION, 10) : 5)
} (),
goog.provide("goog.events.EventType"),
goog.require("goog.userAgent"),
goog.events.getVendorPrefixedName_ = function(t) {
    return goog.userAgent.WEBKIT ? "webkit" + t: goog.userAgent.OPERA ? "o" + t.toLowerCase() : t.toLowerCase()
},
goog.events.EventType = {
    CLICK: "click",
    RIGHTCLICK: "rightclick",
    DBLCLICK: "dblclick",
    MOUSEDOWN: "mousedown",
    MOUSEUP: "mouseup",
    MOUSEOVER: "mouseover",
    MOUSEOUT: "mouseout",
    MOUSEMOVE: "mousemove",
    MOUSEENTER: "mouseenter",
    MOUSELEAVE: "mouseleave",
    MOUSEWHEEL: goog.userAgent.GECKO ? "DOMMouseScroll": "mousewheel",
    SELECTSTART: "selectstart",
    WHEEL: "wheel",
    KEYPRESS: "keypress",
    KEYDOWN: "keydown",
    KEYUP: "keyup",
    BLUR: "blur",
    FOCUS: "focus",
    DEACTIVATE: "deactivate",
    FOCUSIN: goog.userAgent.IE ? "focusin": "DOMFocusIn",
    FOCUSOUT: goog.userAgent.IE ? "focusout": "DOMFocusOut",
    CHANGE: "change",
    SELECT: "select",
    SUBMIT: "submit",
    INPUT: "input",
    PROPERTYCHANGE: "propertychange",
    DRAGSTART: "dragstart",
    DRAG: "drag",
    DRAGENTER: "dragenter",
    DRAGOVER: "dragover",
    DRAGLEAVE: "dragleave",
    DROP: "drop",
    DRAGEND: "dragend",
    TOUCHSTART: "touchstart",
    TOUCHMOVE: "touchmove",
    TOUCHEND: "touchend",
    TOUCHCANCEL: "touchcancel",
    BEFOREUNLOAD: "beforeunload",
    CONSOLEMESSAGE: "consolemessage",
    CONTEXTMENU: "contextmenu",
    DOMCONTENTLOADED: "DOMContentLoaded",
    ERROR: "error",
    HELP: "help",
    LOAD: "load",
    LOSECAPTURE: "losecapture",
    ORIENTATIONCHANGE: "orientationchange",
    READYSTATECHANGE: "readystatechange",
    RESIZE: "resize",
    SCROLL: "scroll",
    UNLOAD: "unload",
    HASHCHANGE: "hashchange",
    PAGEHIDE: "pagehide",
    PAGESHOW: "pageshow",
    POPSTATE: "popstate",
    COPY: "copy",
    PASTE: "paste",
    CUT: "cut",
    BEFORECOPY: "beforecopy",
    BEFORECUT: "beforecut",
    BEFOREPASTE: "beforepaste",
    ONLINE: "online",
    OFFLINE: "offline",
    MESSAGE: "message",
    CONNECT: "connect",
    ANIMATIONSTART: goog.events.getVendorPrefixedName_("AnimationStart"),
    ANIMATIONEND: goog.events.getVendorPrefixedName_("AnimationEnd"),
    ANIMATIONITERATION: goog.events.getVendorPrefixedName_("AnimationIteration"),
    TRANSITIONEND: goog.events.getVendorPrefixedName_("TransitionEnd"),
    POINTERDOWN: "pointerdown",
    POINTERUP: "pointerup",
    POINTERCANCEL: "pointercancel",
    POINTERMOVE: "pointermove",
    POINTEROVER: "pointerover",
    POINTEROUT: "pointerout",
    POINTERENTER: "pointerenter",
    POINTERLEAVE: "pointerleave",
    GOTPOINTERCAPTURE: "gotpointercapture",
    LOSTPOINTERCAPTURE: "lostpointercapture",
    MSGESTURECHANGE: "MSGestureChange",
    MSGESTUREEND: "MSGestureEnd",
    MSGESTUREHOLD: "MSGestureHold",
    MSGESTURESTART: "MSGestureStart",
    MSGESTURETAP: "MSGestureTap",
    MSGOTPOINTERCAPTURE: "MSGotPointerCapture",
    MSINERTIASTART: "MSInertiaStart",
    MSLOSTPOINTERCAPTURE: "MSLostPointerCapture",
    MSPOINTERCANCEL: "MSPointerCancel",
    MSPOINTERDOWN: "MSPointerDown",
    MSPOINTERENTER: "MSPointerEnter",
    MSPOINTERHOVER: "MSPointerHover",
    MSPOINTERLEAVE: "MSPointerLeave",
    MSPOINTERMOVE: "MSPointerMove",
    MSPOINTEROUT: "MSPointerOut",
    MSPOINTEROVER: "MSPointerOver",
    MSPOINTERUP: "MSPointerUp",
    TEXTINPUT: "textinput",
    COMPOSITIONSTART: "compositionstart",
    COMPOSITIONUPDATE: "compositionupdate",
    COMPOSITIONEND: "compositionend",
    EXIT: "exit",
    LOADABORT: "loadabort",
    LOADCOMMIT: "loadcommit",
    LOADREDIRECT: "loadredirect",
    LOADSTART: "loadstart",
    LOADSTOP: "loadstop",
    RESPONSIVE: "responsive",
    SIZECHANGED: "sizechanged",
    UNRESPONSIVE: "unresponsive",
    VISIBILITYCHANGE: "visibilitychange",
    STORAGE: "storage",
    DOMSUBTREEMODIFIED: "DOMSubtreeModified",
    DOMNODEINSERTED: "DOMNodeInserted",
    DOMNODEREMOVED: "DOMNodeRemoved",
    DOMNODEREMOVEDFROMDOCUMENT: "DOMNodeRemovedFromDocument",
    DOMNODEINSERTEDINTODOCUMENT: "DOMNodeInsertedIntoDocument",
    DOMATTRMODIFIED: "DOMAttrModified",
    DOMCHARACTERDATAMODIFIED: "DOMCharacterDataModified"
},
goog.provide("goog.events.BrowserFeature"),
goog.require("goog.userAgent"),
goog.events.BrowserFeature = {
    HAS_W3C_BUTTON: !goog.userAgent.IE || goog.userAgent.isDocumentModeOrHigher(9),
    HAS_W3C_EVENT_SUPPORT: !goog.userAgent.IE || goog.userAgent.isDocumentModeOrHigher(9),
    SET_KEY_CODE_TO_PREVENT_DEFAULT: goog.userAgent.IE && !goog.userAgent.isVersionOrHigher("9"),
    HAS_NAVIGATOR_ONLINE_PROPERTY: !goog.userAgent.WEBKIT || goog.userAgent.isVersionOrHigher("528"),
    HAS_HTML5_NETWORK_EVENT_SUPPORT: goog.userAgent.GECKO && goog.userAgent.isVersionOrHigher("1.9b") || goog.userAgent.IE && goog.userAgent.isVersionOrHigher("8") || goog.userAgent.OPERA && goog.userAgent.isVersionOrHigher("9.5") || goog.userAgent.WEBKIT && goog.userAgent.isVersionOrHigher("528"),
    HTML5_NETWORK_EVENTS_FIRE_ON_BODY: goog.userAgent.GECKO && !goog.userAgent.isVersionOrHigher("8") || goog.userAgent.IE && !goog.userAgent.isVersionOrHigher("9"),
    TOUCH_ENABLED: "ontouchstart" in goog.global || !!(goog.global.document && document.documentElement && "ontouchstart" in document.documentElement) || !(!goog.global.navigator || !goog.global.navigator.msMaxTouchPoints)
},
goog.provide("goog.events.BrowserEvent"),
goog.provide("goog.events.BrowserEvent.MouseButton"),
goog.require("goog.events.BrowserFeature"),
goog.require("goog.events.Event"),
goog.require("goog.events.EventType"),
goog.require("goog.reflect"),
goog.require("goog.userAgent"),
goog.events.BrowserEvent = function(t, o) {
    goog.events.BrowserEvent.base(this, "constructor", t ? t.type: ""),
    this.target = null,
    this.currentTarget = null,
    this.relatedTarget = null,
    this.offsetX = 0,
    this.offsetY = 0,
    this.clientX = 0,
    this.clientY = 0,
    this.screenX = 0,
    this.screenY = 0,
    this.button = 0,
    this.keyCode = 0,
    this.charCode = 0,
    this.ctrlKey = !1,
    this.altKey = !1,
    this.shiftKey = !1,
    this.metaKey = !1,
    this.state = null,
    this.platformModifierKey = !1,
    this.event_ = null,
    t && this.init(t, o)
},
goog.inherits(goog.events.BrowserEvent, goog.events.Event),
goog.events.BrowserEvent.MouseButton = {
    LEFT: 0,
    MIDDLE: 1,
    RIGHT: 2
},
goog.events.BrowserEvent.IEButtonMap = [1, 4, 2],
goog.events.BrowserEvent.prototype.init = function(t, o) {
    var e = this.type = t.type;
    this.target = t.target || t.srcElement,
    this.currentTarget = o;
    var r = t.relatedTarget;
    r ? goog.userAgent.GECKO && (goog.reflect.canAccessProperty(r, "nodeName") || (r = null)) : e == goog.events.EventType.MOUSEOVER ? r = t.fromElement: e == goog.events.EventType.MOUSEOUT && (r = t.toElement),
    this.relatedTarget = r,
    this.offsetX = goog.userAgent.WEBKIT || void 0 !== t.offsetX ? t.offsetX: t.layerX,
    this.offsetY = goog.userAgent.WEBKIT || void 0 !== t.offsetY ? t.offsetY: t.layerY,
    this.clientX = void 0 !== t.clientX ? t.clientX: t.pageX,
    this.clientY = void 0 !== t.clientY ? t.clientY: t.pageY,
    this.screenX = t.screenX || 0,
    this.screenY = t.screenY || 0,
    this.button = t.button,
    this.keyCode = t.keyCode || 0,
    this.charCode = t.charCode || ("keypress" == e ? t.keyCode: 0),
    this.ctrlKey = t.ctrlKey,
    this.altKey = t.altKey,
    this.shiftKey = t.shiftKey,
    this.metaKey = t.metaKey,
    this.platformModifierKey = goog.userAgent.MAC ? t.metaKey: t.ctrlKey,
    this.state = t.state,
    this.event_ = t,
    t.defaultPrevented && this.preventDefault()
},
goog.events.BrowserEvent.prototype.isButton = function(t) {
    return goog.events.BrowserFeature.HAS_W3C_BUTTON ? this.event_.button == t: "click" == this.type ? t == goog.events.BrowserEvent.MouseButton.LEFT: !!(this.event_.button & goog.events.BrowserEvent.IEButtonMap[t])
},
goog.events.BrowserEvent.prototype.isMouseActionButton = function() {
    return this.isButton(goog.events.BrowserEvent.MouseButton.LEFT) && !(goog.userAgent.WEBKIT && goog.userAgent.MAC && this.ctrlKey)
},
goog.events.BrowserEvent.prototype.stopPropagation = function() {
    goog.events.BrowserEvent.superClass_.stopPropagation.call(this),
    this.event_.stopPropagation ? this.event_.stopPropagation() : this.event_.cancelBubble = !0
},
goog.events.BrowserEvent.prototype.preventDefault = function() {
    goog.events.BrowserEvent.superClass_.preventDefault.call(this);
    var t = this.event_;
    if (t.preventDefault) t.preventDefault();
    else if (t.returnValue = !1, goog.events.BrowserFeature.SET_KEY_CODE_TO_PREVENT_DEFAULT) try {
        var o = 112,
        e = 123; (t.ctrlKey || t.keyCode >= o && t.keyCode <= e) && (t.keyCode = -1)
    } catch(r) {}
},
goog.events.BrowserEvent.prototype.getBrowserEvent = function() {
    return this.event_
},
goog.events.BrowserEvent.prototype.disposeInternal = function() {},
goog.provide("goog.debug.EntryPointMonitor"),
goog.provide("goog.debug.entryPointRegistry"),
goog.require("goog.asserts"),
goog.debug.EntryPointMonitor = function() {},
goog.debug.EntryPointMonitor.prototype.wrap,
goog.debug.EntryPointMonitor.prototype.unwrap,
goog.debug.entryPointRegistry.refList_ = [],
goog.debug.entryPointRegistry.monitors_ = [],
goog.debug.entryPointRegistry.monitorsMayExist_ = !1,
goog.debug.entryPointRegistry.register = function(t) {
    if (goog.debug.entryPointRegistry.refList_[goog.debug.entryPointRegistry.refList_.length] = t, goog.debug.entryPointRegistry.monitorsMayExist_) for (var o = goog.debug.entryPointRegistry.monitors_,
    e = 0; e < o.length; e++) t(goog.bind(o[e].wrap, o[e]))
},
goog.debug.entryPointRegistry.monitorAll = function(t) {
    goog.debug.entryPointRegistry.monitorsMayExist_ = !0;
    for (var o = goog.bind(t.wrap, t), e = 0; e < goog.debug.entryPointRegistry.refList_.length; e++) goog.debug.entryPointRegistry.refList_[e](o);
    goog.debug.entryPointRegistry.monitors_.push(t)
},
goog.debug.entryPointRegistry.unmonitorAllIfPossible = function(t) {
    var o = goog.debug.entryPointRegistry.monitors_;
    goog.asserts.assert(t == o[o.length - 1], "Only the most recent monitor can be unwrapped.");
    for (var e = goog.bind(t.unwrap, t), r = 0; r < goog.debug.entryPointRegistry.refList_.length; r++) goog.debug.entryPointRegistry.refList_[r](e);
    o.length--
},
goog.provide("goog.events.Listenable"),
goog.provide("goog.events.ListenableKey"),
goog.require("goog.events.EventId"),
goog.events.Listenable = function() {},
goog.events.Listenable.IMPLEMENTED_BY_PROP = "closure_listenable_" + (1e6 * Math.random() | 0),
goog.events.Listenable.addImplementation = function(t) {
    t.prototype[goog.events.Listenable.IMPLEMENTED_BY_PROP] = !0
},
goog.events.Listenable.isImplementedBy = function(t) {
    return ! (!t || !t[goog.events.Listenable.IMPLEMENTED_BY_PROP])
},
goog.events.Listenable.prototype.listen,
goog.events.Listenable.prototype.listenOnce,
goog.events.Listenable.prototype.unlisten,
goog.events.Listenable.prototype.unlistenByKey,
goog.events.Listenable.prototype.dispatchEvent,
goog.events.Listenable.prototype.removeAllListeners,
goog.events.Listenable.prototype.getParentEventTarget,
goog.events.Listenable.prototype.fireListeners,
goog.events.Listenable.prototype.getListeners,
goog.events.Listenable.prototype.getListener,
goog.events.Listenable.prototype.hasListener,
goog.events.ListenableKey = function() {},
goog.events.ListenableKey.counter_ = 0,
goog.events.ListenableKey.reserveKey = function() {
    return++goog.events.ListenableKey.counter_
},
goog.events.ListenableKey.prototype.src,
goog.events.ListenableKey.prototype.type,
goog.events.ListenableKey.prototype.listener,
goog.events.ListenableKey.prototype.capture,
goog.events.ListenableKey.prototype.handler,
goog.events.ListenableKey.prototype.key,
goog.provide("goog.events.Listener"),
goog.require("goog.events.ListenableKey"),
goog.events.Listener = function(t, o, e, r, n, g) {
    goog.events.Listener.ENABLE_MONITORING && (this.creationStack = (new Error).stack),
    this.listener = t,
    this.proxy = o,
    this.src = e,
    this.type = r,
    this.capture = !!n,
    this.handler = g,
    this.key = goog.events.ListenableKey.reserveKey(),
    this.callOnce = !1,
    this.removed = !1
},
goog.define("goog.events.Listener.ENABLE_MONITORING", !1),
goog.events.Listener.prototype.creationStack,
goog.events.Listener.prototype.markAsRemoved = function() {
    this.removed = !0,
    this.listener = null,
    this.proxy = null,
    this.src = null,
    this.handler = null
},
goog.provide("goog.events.ListenerMap"),
goog.require("goog.array"),
goog.require("goog.events.Listener"),
goog.require("goog.object"),
goog.events.ListenerMap = function(t) {
    this.src = t,
    this.listeners = {},
    this.typeCount_ = 0
},
goog.events.ListenerMap.prototype.getTypeCount = function() {
    return this.typeCount_
},
goog.events.ListenerMap.prototype.getListenerCount = function() {
    var t = 0;
    for (var o in this.listeners) t += this.listeners[o].length;
    return t
},
goog.events.ListenerMap.prototype.add = function(t, o, e, r, n) {
    var g = t.toString(),
    i = this.listeners[g];
    i || (i = this.listeners[g] = [], this.typeCount_++);
    var s, a = goog.events.ListenerMap.findListenerIndex_(i, o, r, n);
    return a > -1 ? (s = i[a], e || (s.callOnce = !1)) : (s = new goog.events.Listener(o, null, this.src, g, !!r, n), s.callOnce = e, i.push(s)),
    s
},
goog.events.ListenerMap.prototype.remove = function(t, o, e, r) {
    var n = t.toString();
    if (! (n in this.listeners)) return ! 1;
    var g = this.listeners[n],
    i = goog.events.ListenerMap.findListenerIndex_(g, o, e, r);
    if (i > -1) {
        var s = g[i];
        return s.markAsRemoved(),
        goog.array.removeAt(g, i),
        0 == g.length && (delete this.listeners[n], this.typeCount_--),
        !0
    }
    return ! 1
},
goog.events.ListenerMap.prototype.removeByKey = function(t) {
    var o = t.type;
    if (! (o in this.listeners)) return ! 1;
    var e = goog.array.remove(this.listeners[o], t);
    return e && (t.markAsRemoved(), 0 == this.listeners[o].length && (delete this.listeners[o], this.typeCount_--)),
    e
},
goog.events.ListenerMap.prototype.removeAll = function(t) {
    var o = t && t.toString(),
    e = 0;
    for (var r in this.listeners) if (!o || r == o) {
        for (var n = this.listeners[r], g = 0; g < n.length; g++)++e,
        n[g].markAsRemoved();
        delete this.listeners[r],
        this.typeCount_--
    }
    return e
},
goog.events.ListenerMap.prototype.getListeners = function(t, o) {
    var e = this.listeners[t.toString()],
    r = [];
    if (e) for (var n = 0; n < e.length; ++n) {
        var g = e[n];
        g.capture == o && r.push(g)
    }
    return r
},
goog.events.ListenerMap.prototype.getListener = function(t, o, e, r) {
    var n = this.listeners[t.toString()],
    g = -1;
    return n && (g = goog.events.ListenerMap.findListenerIndex_(n, o, e, r)),
    g > -1 ? n[g] : null
},
goog.events.ListenerMap.prototype.hasListener = function(t, o) {
    var e = goog.isDef(t),
    r = e ? t.toString() : "",
    n = goog.isDef(o);
    return goog.object.some(this.listeners,
    function(t, g) {
        for (var i = 0; i < t.length; ++i) if (! (e && t[i].type != r || n && t[i].capture != o)) return ! 0;
        return ! 1
    })
},
goog.events.ListenerMap.findListenerIndex_ = function(t, o, e, r) {
    for (var n = 0; n < t.length; ++n) {
        var g = t[n];
        if (!g.removed && g.listener == o && g.capture == !!e && g.handler == r) return n
    }
    return - 1
},
goog.provide("goog.events"),
goog.provide("goog.events.CaptureSimulationMode"),
goog.provide("goog.events.Key"),
goog.provide("goog.events.ListenableType"),
goog.require("goog.asserts"),
goog.require("goog.debug.entryPointRegistry"),
goog.require("goog.events.BrowserEvent"),
goog.require("goog.events.BrowserFeature"),
goog.require("goog.events.Listenable"),
goog.require("goog.events.ListenerMap"),
goog.forwardDeclare("goog.debug.ErrorHandler"),
goog.forwardDeclare("goog.events.EventWrapper"),
goog.events.Key,
goog.events.ListenableType,
goog.events.LISTENER_MAP_PROP_ = "closure_lm_" + (1e6 * Math.random() | 0),
goog.events.onString_ = "on",
goog.events.onStringMap_ = {},
goog.events.CaptureSimulationMode = {
    OFF_AND_FAIL: 0,
    OFF_AND_SILENT: 1,
    ON: 2
},
goog.define("goog.events.CAPTURE_SIMULATION_MODE", 2),
goog.events.listenerCountEstimate_ = 0,
goog.events.listen = function(t, o, e, r, n) {
    if (goog.isArray(o)) {
        for (var g = 0; g < o.length; g++) goog.events.listen(t, o[g], e, r, n);
        return null
    }
    return e = goog.events.wrapListener(e),
    goog.events.Listenable.isImplementedBy(t) ? t.listen(o, e, r, n) : goog.events.listen_(t, o, e, !1, r, n)
},
goog.events.listen_ = function(t, o, e, r, n, g) {
    if (!o) throw Error("Invalid event type");
    var i = !!n;
    if (i && !goog.events.BrowserFeature.HAS_W3C_EVENT_SUPPORT) {
        if (goog.events.CAPTURE_SIMULATION_MODE == goog.events.CaptureSimulationMode.OFF_AND_FAIL) return goog.asserts.fail("Can not register capture listener in IE8-."),
        null;
        if (goog.events.CAPTURE_SIMULATION_MODE == goog.events.CaptureSimulationMode.OFF_AND_SILENT) return null
    }
    var s = goog.events.getListenerMap_(t);
    s || (t[goog.events.LISTENER_MAP_PROP_] = s = new goog.events.ListenerMap(t));
    var a = s.add(o, e, r, n, g);
    if (a.proxy) return a;
    var l = goog.events.getProxy();
    return a.proxy = l,
    l.src = t,
    l.listener = a,
    t.addEventListener ? t.addEventListener(o.toString(), l, i) : t.attachEvent(goog.events.getOnString_(o.toString()), l),
    goog.events.listenerCountEstimate_++,
    a
},
goog.events.getProxy = function() {
    var t = goog.events.handleBrowserEvent_,
    o = goog.events.BrowserFeature.HAS_W3C_EVENT_SUPPORT ?
    function(e) {
        return t.call(o.src, o.listener, e)
    }: function(e) {
        var r = t.call(o.src, o.listener, e);
        return r ? void 0 : r
    };
    return o
},
goog.events.listenOnce = function(t, o, e, r, n) {
    if (goog.isArray(o)) {
        for (var g = 0; g < o.length; g++) goog.events.listenOnce(t, o[g], e, r, n);
        return null
    }
    return e = goog.events.wrapListener(e),
    goog.events.Listenable.isImplementedBy(t) ? t.listenOnce(o, e, r, n) : goog.events.listen_(t, o, e, !0, r, n)
},
goog.events.listenWithWrapper = function(t, o, e, r, n) {
    o.listen(t, e, r, n)
},
goog.events.unlisten = function(t, o, e, r, n) {
    if (goog.isArray(o)) {
        for (var g = 0; g < o.length; g++) goog.events.unlisten(t, o[g], e, r, n);
        return null
    }
    if (e = goog.events.wrapListener(e), goog.events.Listenable.isImplementedBy(t)) return t.unlisten(o, e, r, n);
    if (!t) return ! 1;
    var i = !!r,
    s = goog.events.getListenerMap_(t);
    if (s) {
        var a = s.getListener(o, e, i, n);
        if (a) return goog.events.unlistenByKey(a)
    }
    return ! 1
},
goog.events.unlistenByKey = function(t) {
    if (goog.isNumber(t)) return ! 1;
    var o = t;
    if (!o || o.removed) return ! 1;
    var e = o.src;
    if (goog.events.Listenable.isImplementedBy(e)) return e.unlistenByKey(o);
    var r = o.type,
    n = o.proxy;
    e.removeEventListener ? e.removeEventListener(r, n, o.capture) : e.detachEvent && e.detachEvent(goog.events.getOnString_(r), n),
    goog.events.listenerCountEstimate_--;
    var g = goog.events.getListenerMap_(e);
    return g ? (g.removeByKey(o), 0 == g.getTypeCount() && (g.src = null, e[goog.events.LISTENER_MAP_PROP_] = null)) : o.markAsRemoved(),
    !0
},
goog.events.unlistenWithWrapper = function(t, o, e, r, n) {
    o.unlisten(t, e, r, n)
},
goog.events.removeAll = function(t, o) {
    if (!t) return 0;
    if (goog.events.Listenable.isImplementedBy(t)) return t.removeAllListeners(o);
    var e = goog.events.getListenerMap_(t);
    if (!e) return 0;
    var r = 0,
    n = o && o.toString();
    for (var g in e.listeners) if (!n || g == n) for (var i = e.listeners[g].concat(), s = 0; s < i.length; ++s) goog.events.unlistenByKey(i[s]) && ++r;
    return r
},
goog.events.removeAllNativeListeners = function() {
    return goog.events.listenerCountEstimate_ = 0,
    0
},
goog.events.getListeners = function(t, o, e) {
    if (goog.events.Listenable.isImplementedBy(t)) return t.getListeners(o, e);
    if (!t) return [];
    var r = goog.events.getListenerMap_(t);
    return r ? r.getListeners(o, e) : []
},
goog.events.getListener = function(t, o, e, r, n) {
    o = o,
    e = goog.events.wrapListener(e);
    var g = !!r;
    if (goog.events.Listenable.isImplementedBy(t)) return t.getListener(o, e, g, n);
    if (!t) return null;
    var i = goog.events.getListenerMap_(t);
    return i ? i.getListener(o, e, g, n) : null
},
goog.events.hasListener = function(t, o, e) {
    if (goog.events.Listenable.isImplementedBy(t)) return t.hasListener(o, e);
    var r = goog.events.getListenerMap_(t);
    return !! r && r.hasListener(o, e)
},
goog.events.expose = function(t) {
    var o = [];
    for (var e in t) t[e] && t[e].id ? o.push(e + " = " + t[e] + " (" + t[e].id + ")") : o.push(e + " = " + t[e]);
    return o.join("\n")
},
goog.events.getOnString_ = function(t) {
    return t in goog.events.onStringMap_ ? goog.events.onStringMap_[t] : goog.events.onStringMap_[t] = goog.events.onString_ + t
},
goog.events.fireListeners = function(t, o, e, r) {
    return goog.events.Listenable.isImplementedBy(t) ? t.fireListeners(o, e, r) : goog.events.fireListeners_(t, o, e, r)
},
goog.events.fireListeners_ = function(t, o, e, r) {
    var n = 1,
    g = goog.events.getListenerMap_(t);
    if (g) {
        var i = g.listeners[o.toString()];
        if (i) {
            i = i.concat();
            for (var s = 0; s < i.length; s++) {
                var a = i[s];
                a && a.capture == e && !a.removed && (n &= goog.events.fireListener(a, r) !== !1)
            }
        }
    }
    return Boolean(n)
},
goog.events.fireListener = function(t, o) {
    var e = t.listener,
    r = t.handler || t.src;
    return t.callOnce && goog.events.unlistenByKey(t),
    e.call(r, o)
},
goog.events.getTotalListenerCount = function() {
    return goog.events.listenerCountEstimate_
},
goog.events.dispatchEvent = function(t, o) {
    return goog.asserts.assert(goog.events.Listenable.isImplementedBy(t), "Can not use goog.events.dispatchEvent with non-goog.events.Listenable instance."),
    t.dispatchEvent(o)
},
goog.events.protectBrowserEventEntryPoint = function(t) {
    goog.events.handleBrowserEvent_ = t.protectEntryPoint(goog.events.handleBrowserEvent_)
},
goog.events.handleBrowserEvent_ = function(t, o) {
    if (t.removed) return ! 0;
    if (!goog.events.BrowserFeature.HAS_W3C_EVENT_SUPPORT) {
        var e = o || goog.getObjectByName("window.event"),
        r = new goog.events.BrowserEvent(e, this),
        n = !0;
        if (goog.events.CAPTURE_SIMULATION_MODE == goog.events.CaptureSimulationMode.ON) {
            if (!goog.events.isMarkedIeEvent_(e)) {
                goog.events.markIeEvent_(e);
                for (var g = [], i = r.currentTarget; i; i = i.parentNode) g.push(i);
                for (var s = t.type,
                a = g.length - 1; ! r.propagationStopped_ && a >= 0; a--) r.currentTarget = g[a],
                n &= goog.events.fireListeners_(g[a], s, !0, r);
                for (var a = 0; ! r.propagationStopped_ && a < g.length; a++) r.currentTarget = g[a],
                n &= goog.events.fireListeners_(g[a], s, !1, r)
            }
        } else n = goog.events.fireListener(t, r);
        return n
    }
    return goog.events.fireListener(t, new goog.events.BrowserEvent(o, this))
},
goog.events.markIeEvent_ = function(t) {
    var o = !1;
    if (0 == t.keyCode) try {
        return void(t.keyCode = -1)
    } catch(e) {
        o = !0
    } (o || void 0 == t.returnValue) && (t.returnValue = !0)
},
goog.events.isMarkedIeEvent_ = function(t) {
    return t.keyCode < 0 || void 0 != t.returnValue
},
goog.events.uniqueIdCounter_ = 0,
goog.events.getUniqueId = function(t) {
    return t + "_" + goog.events.uniqueIdCounter_++
},
goog.events.getListenerMap_ = function(t) {
    var o = t[goog.events.LISTENER_MAP_PROP_];
    return o instanceof goog.events.ListenerMap ? o: null
},
goog.events.LISTENER_WRAPPER_PROP_ = "__closure_events_fn_" + (1e9 * Math.random() >>> 0),
goog.events.wrapListener = function(t) {
    return goog.asserts.assert(t, "Listener can not be null."),
    goog.isFunction(t) ? t: (goog.asserts.assert(t.handleEvent, "An object listener must have handleEvent method."), t[goog.events.LISTENER_WRAPPER_PROP_] || (t[goog.events.LISTENER_WRAPPER_PROP_] = function(o) {
        return t.handleEvent(o)
    }), t[goog.events.LISTENER_WRAPPER_PROP_])
},
goog.debug.entryPointRegistry.register(function(t) {
    goog.events.handleBrowserEvent_ = t(goog.events.handleBrowserEvent_)
});