(() => {
  // node_modules/@vue/shared/dist/shared.esm-bundler.js
  function makeMap(str) {
    const map = /* @__PURE__ */ Object.create(null);
    for (const key of str.split(","))
      map[key] = 1;
    return (val) => (val in map);
  }
  var EMPTY_OBJ = Object.freeze({});
  var EMPTY_ARR = Object.freeze([]);
  var NOOP = () => {};
  var NO = () => false;
  var isOn = (key) => key.charCodeAt(0) === 111 && key.charCodeAt(1) === 110 && (key.charCodeAt(2) > 122 || key.charCodeAt(2) < 97);
  var isModelListener = (key) => key.startsWith("onUpdate:");
  var extend = Object.assign;
  var remove = (arr, el) => {
    const i = arr.indexOf(el);
    if (i > -1) {
      arr.splice(i, 1);
    }
  };
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var hasOwn = (val, key) => hasOwnProperty.call(val, key);
  var isArray = Array.isArray;
  var isMap = (val) => toTypeString(val) === "[object Map]";
  var isSet = (val) => toTypeString(val) === "[object Set]";
  var isDate = (val) => toTypeString(val) === "[object Date]";
  var isFunction = (val) => typeof val === "function";
  var isString = (val) => typeof val === "string";
  var isSymbol = (val) => typeof val === "symbol";
  var isObject = (val) => val !== null && typeof val === "object";
  var isPromise = (val) => {
    return (isObject(val) || isFunction(val)) && isFunction(val.then) && isFunction(val.catch);
  };
  var objectToString = Object.prototype.toString;
  var toTypeString = (value) => objectToString.call(value);
  var toRawType = (value) => {
    return toTypeString(value).slice(8, -1);
  };
  var isPlainObject = (val) => toTypeString(val) === "[object Object]";
  var isIntegerKey = (key) => isString(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
  var isReservedProp = /* @__PURE__ */ makeMap(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted");
  var isBuiltInDirective = /* @__PURE__ */ makeMap("bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo");
  var cacheStringFunction = (fn) => {
    const cache = /* @__PURE__ */ Object.create(null);
    return (str) => {
      const hit = cache[str];
      return hit || (cache[str] = fn(str));
    };
  };
  var camelizeRE = /-\w/g;
  var camelize = cacheStringFunction((str) => {
    return str.replace(camelizeRE, (c) => c.slice(1).toUpperCase());
  });
  var hyphenateRE = /\B([A-Z])/g;
  var hyphenate = cacheStringFunction((str) => str.replace(hyphenateRE, "-$1").toLowerCase());
  var capitalize = cacheStringFunction((str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  });
  var toHandlerKey = cacheStringFunction((str) => {
    const s = str ? `on${capitalize(str)}` : ``;
    return s;
  });
  var hasChanged = (value, oldValue) => !Object.is(value, oldValue);
  var invokeArrayFns = (fns, ...arg) => {
    for (let i = 0;i < fns.length; i++) {
      fns[i](...arg);
    }
  };
  var def = (obj, key, value, writable = false) => {
    Object.defineProperty(obj, key, {
      configurable: true,
      enumerable: false,
      writable,
      value
    });
  };
  var looseToNumber = (val) => {
    const n = parseFloat(val);
    return isNaN(n) ? val : n;
  };
  var _globalThis;
  var getGlobalThis = () => {
    return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
  };
  function normalizeStyle(value) {
    if (isArray(value)) {
      const res = {};
      for (let i = 0;i < value.length; i++) {
        const item = value[i];
        const normalized = isString(item) ? parseStringStyle(item) : normalizeStyle(item);
        if (normalized) {
          for (const key in normalized) {
            res[key] = normalized[key];
          }
        }
      }
      return res;
    } else if (isString(value) || isObject(value)) {
      return value;
    }
  }
  var listDelimiterRE = /;(?![^(]*\))/g;
  var propertyDelimiterRE = /:([^]+)/;
  var styleCommentRE = /\/\*[^]*?\*\//g;
  function parseStringStyle(cssText) {
    const ret = {};
    cssText.replace(styleCommentRE, "").split(listDelimiterRE).forEach((item) => {
      if (item) {
        const tmp = item.split(propertyDelimiterRE);
        tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
      }
    });
    return ret;
  }
  function normalizeClass(value) {
    let res = "";
    if (isString(value)) {
      res = value;
    } else if (isArray(value)) {
      for (let i = 0;i < value.length; i++) {
        const normalized = normalizeClass(value[i]);
        if (normalized) {
          res += normalized + " ";
        }
      }
    } else if (isObject(value)) {
      for (const name in value) {
        if (value[name]) {
          res += name + " ";
        }
      }
    }
    return res.trim();
  }
  var HTML_TAGS = "html,body,base,head,link,meta,style,title,address,article,aside,footer,header,hgroup,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot";
  var SVG_TAGS = "svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistantLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view";
  var MATH_TAGS = "annotation,annotation-xml,maction,maligngroup,malignmark,math,menclose,merror,mfenced,mfrac,mfraction,mglyph,mi,mlabeledtr,mlongdiv,mmultiscripts,mn,mo,mover,mpadded,mphantom,mprescripts,mroot,mrow,ms,mscarries,mscarry,msgroup,msline,mspace,msqrt,msrow,mstack,mstyle,msub,msubsup,msup,mtable,mtd,mtext,mtr,munder,munderover,none,semantics";
  var isHTMLTag = /* @__PURE__ */ makeMap(HTML_TAGS);
  var isSVGTag = /* @__PURE__ */ makeMap(SVG_TAGS);
  var isMathMLTag = /* @__PURE__ */ makeMap(MATH_TAGS);
  var specialBooleanAttrs = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
  var isSpecialBooleanAttr = /* @__PURE__ */ makeMap(specialBooleanAttrs);
  var isBooleanAttr = /* @__PURE__ */ makeMap(specialBooleanAttrs + `,async,autofocus,autoplay,controls,default,defer,disabled,hidden,inert,loop,open,required,reversed,scoped,seamless,checked,muted,multiple,selected`);
  function includeBooleanAttr(value) {
    return !!value || value === "";
  }
  function looseCompareArrays(a, b) {
    if (a.length !== b.length)
      return false;
    let equal = true;
    for (let i = 0;equal && i < a.length; i++) {
      equal = looseEqual(a[i], b[i]);
    }
    return equal;
  }
  function looseEqual(a, b) {
    if (a === b)
      return true;
    let aValidType = isDate(a);
    let bValidType = isDate(b);
    if (aValidType || bValidType) {
      return aValidType && bValidType ? a.getTime() === b.getTime() : false;
    }
    aValidType = isSymbol(a);
    bValidType = isSymbol(b);
    if (aValidType || bValidType) {
      return a === b;
    }
    aValidType = isArray(a);
    bValidType = isArray(b);
    if (aValidType || bValidType) {
      return aValidType && bValidType ? looseCompareArrays(a, b) : false;
    }
    aValidType = isObject(a);
    bValidType = isObject(b);
    if (aValidType || bValidType) {
      if (!aValidType || !bValidType) {
        return false;
      }
      const aKeysCount = Object.keys(a).length;
      const bKeysCount = Object.keys(b).length;
      if (aKeysCount !== bKeysCount) {
        return false;
      }
      for (const key in a) {
        const aHasKey = a.hasOwnProperty(key);
        const bHasKey = b.hasOwnProperty(key);
        if (aHasKey && !bHasKey || !aHasKey && bHasKey || !looseEqual(a[key], b[key])) {
          return false;
        }
      }
    }
    return String(a) === String(b);
  }
  var isRef = (val) => {
    return !!(val && val["__v_isRef"] === true);
  };
  var toDisplayString = (val) => {
    return isString(val) ? val : val == null ? "" : isArray(val) || isObject(val) && (val.toString === objectToString || !isFunction(val.toString)) ? isRef(val) ? toDisplayString(val.value) : JSON.stringify(val, replacer, 2) : String(val);
  };
  var replacer = (_key, val) => {
    if (isRef(val)) {
      return replacer(_key, val.value);
    } else if (isMap(val)) {
      return {
        [`Map(${val.size})`]: [...val.entries()].reduce((entries, [key, val2], i) => {
          entries[stringifySymbol(key, i) + " =>"] = val2;
          return entries;
        }, {})
      };
    } else if (isSet(val)) {
      return {
        [`Set(${val.size})`]: [...val.values()].map((v) => stringifySymbol(v))
      };
    } else if (isSymbol(val)) {
      return stringifySymbol(val);
    } else if (isObject(val) && !isArray(val) && !isPlainObject(val)) {
      return String(val);
    }
    return val;
  };
  var stringifySymbol = (v, i = "") => {
    var _a;
    return isSymbol(v) ? `Symbol(${(_a = v.description) != null ? _a : i})` : v;
  };

  // node_modules/@vue/reactivity/dist/reactivity.esm-bundler.js
  function warn(msg, ...args) {
    console.warn(`[Vue warn] ${msg}`, ...args);
  }
  var activeEffectScope;

  class EffectScope {
    constructor(detached = false) {
      this.detached = detached;
      this._active = true;
      this._on = 0;
      this.effects = [];
      this.cleanups = [];
      this._isPaused = false;
      this.__v_skip = true;
      this.parent = activeEffectScope;
      if (!detached && activeEffectScope) {
        this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(this) - 1;
      }
    }
    get active() {
      return this._active;
    }
    pause() {
      if (this._active) {
        this._isPaused = true;
        let i, l;
        if (this.scopes) {
          for (i = 0, l = this.scopes.length;i < l; i++) {
            this.scopes[i].pause();
          }
        }
        for (i = 0, l = this.effects.length;i < l; i++) {
          this.effects[i].pause();
        }
      }
    }
    resume() {
      if (this._active) {
        if (this._isPaused) {
          this._isPaused = false;
          let i, l;
          if (this.scopes) {
            for (i = 0, l = this.scopes.length;i < l; i++) {
              this.scopes[i].resume();
            }
          }
          for (i = 0, l = this.effects.length;i < l; i++) {
            this.effects[i].resume();
          }
        }
      }
    }
    run(fn) {
      if (this._active) {
        const currentEffectScope = activeEffectScope;
        try {
          activeEffectScope = this;
          return fn();
        } finally {
          activeEffectScope = currentEffectScope;
        }
      } else if (true) {
        warn(`cannot run an inactive effect scope.`);
      }
    }
    on() {
      if (++this._on === 1) {
        this.prevScope = activeEffectScope;
        activeEffectScope = this;
      }
    }
    off() {
      if (this._on > 0 && --this._on === 0) {
        activeEffectScope = this.prevScope;
        this.prevScope = undefined;
      }
    }
    stop(fromParent) {
      if (this._active) {
        this._active = false;
        let i, l;
        for (i = 0, l = this.effects.length;i < l; i++) {
          this.effects[i].stop();
        }
        this.effects.length = 0;
        for (i = 0, l = this.cleanups.length;i < l; i++) {
          this.cleanups[i]();
        }
        this.cleanups.length = 0;
        if (this.scopes) {
          for (i = 0, l = this.scopes.length;i < l; i++) {
            this.scopes[i].stop(true);
          }
          this.scopes.length = 0;
        }
        if (!this.detached && this.parent && !fromParent) {
          const last = this.parent.scopes.pop();
          if (last && last !== this) {
            this.parent.scopes[this.index] = last;
            last.index = this.index;
          }
        }
        this.parent = undefined;
      }
    }
  }
  function effectScope(detached) {
    return new EffectScope(detached);
  }
  function getCurrentScope() {
    return activeEffectScope;
  }
  function onScopeDispose(fn, failSilently = false) {
    if (activeEffectScope) {
      activeEffectScope.cleanups.push(fn);
    } else if (!failSilently) {
      warn(`onScopeDispose() is called when there is no active effect scope to be associated with.`);
    }
  }
  var activeSub;
  var pausedQueueEffects = /* @__PURE__ */ new WeakSet;

  class ReactiveEffect {
    constructor(fn) {
      this.fn = fn;
      this.deps = undefined;
      this.depsTail = undefined;
      this.flags = 1 | 4;
      this.next = undefined;
      this.cleanup = undefined;
      this.scheduler = undefined;
      if (activeEffectScope && activeEffectScope.active) {
        activeEffectScope.effects.push(this);
      }
    }
    pause() {
      this.flags |= 64;
    }
    resume() {
      if (this.flags & 64) {
        this.flags &= -65;
        if (pausedQueueEffects.has(this)) {
          pausedQueueEffects.delete(this);
          this.trigger();
        }
      }
    }
    notify() {
      if (this.flags & 2 && !(this.flags & 32)) {
        return;
      }
      if (!(this.flags & 8)) {
        batch(this);
      }
    }
    run() {
      if (!(this.flags & 1)) {
        return this.fn();
      }
      this.flags |= 2;
      cleanupEffect(this);
      prepareDeps(this);
      const prevEffect = activeSub;
      const prevShouldTrack = shouldTrack;
      activeSub = this;
      shouldTrack = true;
      try {
        return this.fn();
      } finally {
        if (activeSub !== this) {
          warn("Active effect was not restored correctly - this is likely a Vue internal bug.");
        }
        cleanupDeps(this);
        activeSub = prevEffect;
        shouldTrack = prevShouldTrack;
        this.flags &= -3;
      }
    }
    stop() {
      if (this.flags & 1) {
        for (let link = this.deps;link; link = link.nextDep) {
          removeSub(link);
        }
        this.deps = this.depsTail = undefined;
        cleanupEffect(this);
        this.onStop && this.onStop();
        this.flags &= -2;
      }
    }
    trigger() {
      if (this.flags & 64) {
        pausedQueueEffects.add(this);
      } else if (this.scheduler) {
        this.scheduler();
      } else {
        this.runIfDirty();
      }
    }
    runIfDirty() {
      if (isDirty(this)) {
        this.run();
      }
    }
    get dirty() {
      return isDirty(this);
    }
  }
  var batchDepth = 0;
  var batchedSub;
  var batchedComputed;
  function batch(sub, isComputed = false) {
    sub.flags |= 8;
    if (isComputed) {
      sub.next = batchedComputed;
      batchedComputed = sub;
      return;
    }
    sub.next = batchedSub;
    batchedSub = sub;
  }
  function startBatch() {
    batchDepth++;
  }
  function endBatch() {
    if (--batchDepth > 0) {
      return;
    }
    if (batchedComputed) {
      let e = batchedComputed;
      batchedComputed = undefined;
      while (e) {
        const next = e.next;
        e.next = undefined;
        e.flags &= -9;
        e = next;
      }
    }
    let error;
    while (batchedSub) {
      let e = batchedSub;
      batchedSub = undefined;
      while (e) {
        const next = e.next;
        e.next = undefined;
        e.flags &= -9;
        if (e.flags & 1) {
          try {
            e.trigger();
          } catch (err) {
            if (!error)
              error = err;
          }
        }
        e = next;
      }
    }
    if (error)
      throw error;
  }
  function prepareDeps(sub) {
    for (let link = sub.deps;link; link = link.nextDep) {
      link.version = -1;
      link.prevActiveLink = link.dep.activeLink;
      link.dep.activeLink = link;
    }
  }
  function cleanupDeps(sub) {
    let head;
    let tail = sub.depsTail;
    let link = tail;
    while (link) {
      const prev = link.prevDep;
      if (link.version === -1) {
        if (link === tail)
          tail = prev;
        removeSub(link);
        removeDep(link);
      } else {
        head = link;
      }
      link.dep.activeLink = link.prevActiveLink;
      link.prevActiveLink = undefined;
      link = prev;
    }
    sub.deps = head;
    sub.depsTail = tail;
  }
  function isDirty(sub) {
    for (let link = sub.deps;link; link = link.nextDep) {
      if (link.dep.version !== link.version || link.dep.computed && (refreshComputed(link.dep.computed) || link.dep.version !== link.version)) {
        return true;
      }
    }
    if (sub._dirty) {
      return true;
    }
    return false;
  }
  function refreshComputed(computed) {
    if (computed.flags & 4 && !(computed.flags & 16)) {
      return;
    }
    computed.flags &= -17;
    if (computed.globalVersion === globalVersion) {
      return;
    }
    computed.globalVersion = globalVersion;
    if (!computed.isSSR && computed.flags & 128 && (!computed.deps && !computed._dirty || !isDirty(computed))) {
      return;
    }
    computed.flags |= 2;
    const dep = computed.dep;
    const prevSub = activeSub;
    const prevShouldTrack = shouldTrack;
    activeSub = computed;
    shouldTrack = true;
    try {
      prepareDeps(computed);
      const value = computed.fn(computed._value);
      if (dep.version === 0 || hasChanged(value, computed._value)) {
        computed.flags |= 128;
        computed._value = value;
        dep.version++;
      }
    } catch (err) {
      dep.version++;
      throw err;
    } finally {
      activeSub = prevSub;
      shouldTrack = prevShouldTrack;
      cleanupDeps(computed);
      computed.flags &= -3;
    }
  }
  function removeSub(link, soft = false) {
    const { dep, prevSub, nextSub } = link;
    if (prevSub) {
      prevSub.nextSub = nextSub;
      link.prevSub = undefined;
    }
    if (nextSub) {
      nextSub.prevSub = prevSub;
      link.nextSub = undefined;
    }
    if (dep.subsHead === link) {
      dep.subsHead = nextSub;
    }
    if (dep.subs === link) {
      dep.subs = prevSub;
      if (!prevSub && dep.computed) {
        dep.computed.flags &= -5;
        for (let l = dep.computed.deps;l; l = l.nextDep) {
          removeSub(l, true);
        }
      }
    }
    if (!soft && !--dep.sc && dep.map) {
      dep.map.delete(dep.key);
    }
  }
  function removeDep(link) {
    const { prevDep, nextDep } = link;
    if (prevDep) {
      prevDep.nextDep = nextDep;
      link.prevDep = undefined;
    }
    if (nextDep) {
      nextDep.prevDep = prevDep;
      link.nextDep = undefined;
    }
  }
  var shouldTrack = true;
  var trackStack = [];
  function pauseTracking() {
    trackStack.push(shouldTrack);
    shouldTrack = false;
  }
  function resetTracking() {
    const last = trackStack.pop();
    shouldTrack = last === undefined ? true : last;
  }
  function cleanupEffect(e) {
    const { cleanup } = e;
    e.cleanup = undefined;
    if (cleanup) {
      const prevSub = activeSub;
      activeSub = undefined;
      try {
        cleanup();
      } finally {
        activeSub = prevSub;
      }
    }
  }
  var globalVersion = 0;

  class Link {
    constructor(sub, dep) {
      this.sub = sub;
      this.dep = dep;
      this.version = dep.version;
      this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = undefined;
    }
  }

  class Dep {
    constructor(computed) {
      this.computed = computed;
      this.version = 0;
      this.activeLink = undefined;
      this.subs = undefined;
      this.map = undefined;
      this.key = undefined;
      this.sc = 0;
      this.__v_skip = true;
      if (true) {
        this.subsHead = undefined;
      }
    }
    track(debugInfo) {
      if (!activeSub || !shouldTrack || activeSub === this.computed) {
        return;
      }
      let link = this.activeLink;
      if (link === undefined || link.sub !== activeSub) {
        link = this.activeLink = new Link(activeSub, this);
        if (!activeSub.deps) {
          activeSub.deps = activeSub.depsTail = link;
        } else {
          link.prevDep = activeSub.depsTail;
          activeSub.depsTail.nextDep = link;
          activeSub.depsTail = link;
        }
        addSub(link);
      } else if (link.version === -1) {
        link.version = this.version;
        if (link.nextDep) {
          const next = link.nextDep;
          next.prevDep = link.prevDep;
          if (link.prevDep) {
            link.prevDep.nextDep = next;
          }
          link.prevDep = activeSub.depsTail;
          link.nextDep = undefined;
          activeSub.depsTail.nextDep = link;
          activeSub.depsTail = link;
          if (activeSub.deps === link) {
            activeSub.deps = next;
          }
        }
      }
      if (activeSub.onTrack) {
        activeSub.onTrack(extend({
          effect: activeSub
        }, debugInfo));
      }
      return link;
    }
    trigger(debugInfo) {
      this.version++;
      globalVersion++;
      this.notify(debugInfo);
    }
    notify(debugInfo) {
      startBatch();
      try {
        if (true) {
          for (let head = this.subsHead;head; head = head.nextSub) {
            if (head.sub.onTrigger && !(head.sub.flags & 8)) {
              head.sub.onTrigger(extend({
                effect: head.sub
              }, debugInfo));
            }
          }
        }
        for (let link = this.subs;link; link = link.prevSub) {
          if (link.sub.notify()) {
            link.sub.dep.notify();
          }
        }
      } finally {
        endBatch();
      }
    }
  }
  function addSub(link) {
    link.dep.sc++;
    if (link.sub.flags & 4) {
      const computed = link.dep.computed;
      if (computed && !link.dep.subs) {
        computed.flags |= 4 | 16;
        for (let l = computed.deps;l; l = l.nextDep) {
          addSub(l);
        }
      }
      const currentTail = link.dep.subs;
      if (currentTail !== link) {
        link.prevSub = currentTail;
        if (currentTail)
          currentTail.nextSub = link;
      }
      if (link.dep.subsHead === undefined) {
        link.dep.subsHead = link;
      }
      link.dep.subs = link;
    }
  }
  var targetMap = /* @__PURE__ */ new WeakMap;
  var ITERATE_KEY = /* @__PURE__ */ Symbol("Object iterate");
  var MAP_KEY_ITERATE_KEY = /* @__PURE__ */ Symbol("Map keys iterate");
  var ARRAY_ITERATE_KEY = /* @__PURE__ */ Symbol("Array iterate");
  function track(target, type, key) {
    if (shouldTrack && activeSub) {
      let depsMap = targetMap.get(target);
      if (!depsMap) {
        targetMap.set(target, depsMap = /* @__PURE__ */ new Map);
      }
      let dep = depsMap.get(key);
      if (!dep) {
        depsMap.set(key, dep = new Dep);
        dep.map = depsMap;
        dep.key = key;
      }
      if (true) {
        dep.track({
          target,
          type,
          key
        });
      } else {}
    }
  }
  function trigger(target, type, key, newValue, oldValue, oldTarget) {
    const depsMap = targetMap.get(target);
    if (!depsMap) {
      globalVersion++;
      return;
    }
    const run = (dep) => {
      if (dep) {
        if (true) {
          dep.trigger({
            target,
            type,
            key,
            newValue,
            oldValue,
            oldTarget
          });
        } else {}
      }
    };
    startBatch();
    if (type === "clear") {
      depsMap.forEach(run);
    } else {
      const targetIsArray = isArray(target);
      const isArrayIndex = targetIsArray && isIntegerKey(key);
      if (targetIsArray && key === "length") {
        const newLength = Number(newValue);
        depsMap.forEach((dep, key2) => {
          if (key2 === "length" || key2 === ARRAY_ITERATE_KEY || !isSymbol(key2) && key2 >= newLength) {
            run(dep);
          }
        });
      } else {
        if (key !== undefined || depsMap.has(undefined)) {
          run(depsMap.get(key));
        }
        if (isArrayIndex) {
          run(depsMap.get(ARRAY_ITERATE_KEY));
        }
        switch (type) {
          case "add":
            if (!targetIsArray) {
              run(depsMap.get(ITERATE_KEY));
              if (isMap(target)) {
                run(depsMap.get(MAP_KEY_ITERATE_KEY));
              }
            } else if (isArrayIndex) {
              run(depsMap.get("length"));
            }
            break;
          case "delete":
            if (!targetIsArray) {
              run(depsMap.get(ITERATE_KEY));
              if (isMap(target)) {
                run(depsMap.get(MAP_KEY_ITERATE_KEY));
              }
            }
            break;
          case "set":
            if (isMap(target)) {
              run(depsMap.get(ITERATE_KEY));
            }
            break;
        }
      }
    }
    endBatch();
  }
  function getDepFromReactive(object, key) {
    const depMap = targetMap.get(object);
    return depMap && depMap.get(key);
  }
  function reactiveReadArray(array) {
    const raw = toRaw(array);
    if (raw === array)
      return raw;
    track(raw, "iterate", ARRAY_ITERATE_KEY);
    return isShallow(array) ? raw : raw.map(toReactive);
  }
  function shallowReadArray(arr) {
    track(arr = toRaw(arr), "iterate", ARRAY_ITERATE_KEY);
    return arr;
  }
  function toWrapped(target, item) {
    if (isReadonly(target)) {
      return isReactive(target) ? toReadonly(toReactive(item)) : toReadonly(item);
    }
    return toReactive(item);
  }
  var arrayInstrumentations = {
    __proto__: null,
    [Symbol.iterator]() {
      return iterator(this, Symbol.iterator, (item) => toWrapped(this, item));
    },
    concat(...args) {
      return reactiveReadArray(this).concat(...args.map((x) => isArray(x) ? reactiveReadArray(x) : x));
    },
    entries() {
      return iterator(this, "entries", (value) => {
        value[1] = toWrapped(this, value[1]);
        return value;
      });
    },
    every(fn, thisArg) {
      return apply(this, "every", fn, thisArg, undefined, arguments);
    },
    filter(fn, thisArg) {
      return apply(this, "filter", fn, thisArg, (v) => v.map((item) => toWrapped(this, item)), arguments);
    },
    find(fn, thisArg) {
      return apply(this, "find", fn, thisArg, (item) => toWrapped(this, item), arguments);
    },
    findIndex(fn, thisArg) {
      return apply(this, "findIndex", fn, thisArg, undefined, arguments);
    },
    findLast(fn, thisArg) {
      return apply(this, "findLast", fn, thisArg, (item) => toWrapped(this, item), arguments);
    },
    findLastIndex(fn, thisArg) {
      return apply(this, "findLastIndex", fn, thisArg, undefined, arguments);
    },
    forEach(fn, thisArg) {
      return apply(this, "forEach", fn, thisArg, undefined, arguments);
    },
    includes(...args) {
      return searchProxy(this, "includes", args);
    },
    indexOf(...args) {
      return searchProxy(this, "indexOf", args);
    },
    join(separator) {
      return reactiveReadArray(this).join(separator);
    },
    lastIndexOf(...args) {
      return searchProxy(this, "lastIndexOf", args);
    },
    map(fn, thisArg) {
      return apply(this, "map", fn, thisArg, undefined, arguments);
    },
    pop() {
      return noTracking(this, "pop");
    },
    push(...args) {
      return noTracking(this, "push", args);
    },
    reduce(fn, ...args) {
      return reduce(this, "reduce", fn, args);
    },
    reduceRight(fn, ...args) {
      return reduce(this, "reduceRight", fn, args);
    },
    shift() {
      return noTracking(this, "shift");
    },
    some(fn, thisArg) {
      return apply(this, "some", fn, thisArg, undefined, arguments);
    },
    splice(...args) {
      return noTracking(this, "splice", args);
    },
    toReversed() {
      return reactiveReadArray(this).toReversed();
    },
    toSorted(comparer) {
      return reactiveReadArray(this).toSorted(comparer);
    },
    toSpliced(...args) {
      return reactiveReadArray(this).toSpliced(...args);
    },
    unshift(...args) {
      return noTracking(this, "unshift", args);
    },
    values() {
      return iterator(this, "values", (item) => toWrapped(this, item));
    }
  };
  function iterator(self2, method, wrapValue) {
    const arr = shallowReadArray(self2);
    const iter = arr[method]();
    if (arr !== self2 && !isShallow(self2)) {
      iter._next = iter.next;
      iter.next = () => {
        const result = iter._next();
        if (!result.done) {
          result.value = wrapValue(result.value);
        }
        return result;
      };
    }
    return iter;
  }
  var arrayProto = Array.prototype;
  function apply(self2, method, fn, thisArg, wrappedRetFn, args) {
    const arr = shallowReadArray(self2);
    const needsWrap = arr !== self2 && !isShallow(self2);
    const methodFn = arr[method];
    if (methodFn !== arrayProto[method]) {
      const result2 = methodFn.apply(self2, args);
      return needsWrap ? toReactive(result2) : result2;
    }
    let wrappedFn = fn;
    if (arr !== self2) {
      if (needsWrap) {
        wrappedFn = function(item, index) {
          return fn.call(this, toWrapped(self2, item), index, self2);
        };
      } else if (fn.length > 2) {
        wrappedFn = function(item, index) {
          return fn.call(this, item, index, self2);
        };
      }
    }
    const result = methodFn.call(arr, wrappedFn, thisArg);
    return needsWrap && wrappedRetFn ? wrappedRetFn(result) : result;
  }
  function reduce(self2, method, fn, args) {
    const arr = shallowReadArray(self2);
    const needsWrap = arr !== self2 && !isShallow(self2);
    let wrappedFn = fn;
    let wrapInitialAccumulator = false;
    if (arr !== self2) {
      if (needsWrap) {
        wrapInitialAccumulator = args.length === 0;
        wrappedFn = function(acc, item, index) {
          if (wrapInitialAccumulator) {
            wrapInitialAccumulator = false;
            acc = toWrapped(self2, acc);
          }
          return fn.call(this, acc, toWrapped(self2, item), index, self2);
        };
      } else if (fn.length > 3) {
        wrappedFn = function(acc, item, index) {
          return fn.call(this, acc, item, index, self2);
        };
      }
    }
    const result = arr[method](wrappedFn, ...args);
    return wrapInitialAccumulator ? toWrapped(self2, result) : result;
  }
  function searchProxy(self2, method, args) {
    const arr = toRaw(self2);
    track(arr, "iterate", ARRAY_ITERATE_KEY);
    const res = arr[method](...args);
    if ((res === -1 || res === false) && isProxy(args[0])) {
      args[0] = toRaw(args[0]);
      return arr[method](...args);
    }
    return res;
  }
  function noTracking(self2, method, args = []) {
    pauseTracking();
    startBatch();
    const res = toRaw(self2)[method].apply(self2, args);
    endBatch();
    resetTracking();
    return res;
  }
  var isNonTrackableKeys = /* @__PURE__ */ makeMap(`__proto__,__v_isRef,__isVue`);
  var builtInSymbols = new Set(/* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((key) => key !== "arguments" && key !== "caller").map((key) => Symbol[key]).filter(isSymbol));
  function hasOwnProperty2(key) {
    if (!isSymbol(key))
      key = String(key);
    const obj = toRaw(this);
    track(obj, "has", key);
    return obj.hasOwnProperty(key);
  }

  class BaseReactiveHandler {
    constructor(_isReadonly = false, _isShallow = false) {
      this._isReadonly = _isReadonly;
      this._isShallow = _isShallow;
    }
    get(target, key, receiver) {
      if (key === "__v_skip")
        return target["__v_skip"];
      const isReadonly2 = this._isReadonly, isShallow2 = this._isShallow;
      if (key === "__v_isReactive") {
        return !isReadonly2;
      } else if (key === "__v_isReadonly") {
        return isReadonly2;
      } else if (key === "__v_isShallow") {
        return isShallow2;
      } else if (key === "__v_raw") {
        if (receiver === (isReadonly2 ? isShallow2 ? shallowReadonlyMap : readonlyMap : isShallow2 ? shallowReactiveMap : reactiveMap).get(target) || Object.getPrototypeOf(target) === Object.getPrototypeOf(receiver)) {
          return target;
        }
        return;
      }
      const targetIsArray = isArray(target);
      if (!isReadonly2) {
        let fn;
        if (targetIsArray && (fn = arrayInstrumentations[key])) {
          return fn;
        }
        if (key === "hasOwnProperty") {
          return hasOwnProperty2;
        }
      }
      const res = Reflect.get(target, key, isRef2(target) ? target : receiver);
      if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
        return res;
      }
      if (!isReadonly2) {
        track(target, "get", key);
      }
      if (isShallow2) {
        return res;
      }
      if (isRef2(res)) {
        const value = targetIsArray && isIntegerKey(key) ? res : res.value;
        return isReadonly2 && isObject(value) ? readonly(value) : value;
      }
      if (isObject(res)) {
        return isReadonly2 ? readonly(res) : reactive(res);
      }
      return res;
    }
  }

  class MutableReactiveHandler extends BaseReactiveHandler {
    constructor(isShallow2 = false) {
      super(false, isShallow2);
    }
    set(target, key, value, receiver) {
      let oldValue = target[key];
      const isArrayWithIntegerKey = isArray(target) && isIntegerKey(key);
      if (!this._isShallow) {
        const isOldValueReadonly = isReadonly(oldValue);
        if (!isShallow(value) && !isReadonly(value)) {
          oldValue = toRaw(oldValue);
          value = toRaw(value);
        }
        if (!isArrayWithIntegerKey && isRef2(oldValue) && !isRef2(value)) {
          if (isOldValueReadonly) {
            if (true) {
              warn(`Set operation on key "${String(key)}" failed: target is readonly.`, target[key]);
            }
            return true;
          } else {
            oldValue.value = value;
            return true;
          }
        }
      }
      const hadKey = isArrayWithIntegerKey ? Number(key) < target.length : hasOwn(target, key);
      const result = Reflect.set(target, key, value, isRef2(target) ? target : receiver);
      if (target === toRaw(receiver)) {
        if (!hadKey) {
          trigger(target, "add", key, value);
        } else if (hasChanged(value, oldValue)) {
          trigger(target, "set", key, value, oldValue);
        }
      }
      return result;
    }
    deleteProperty(target, key) {
      const hadKey = hasOwn(target, key);
      const oldValue = target[key];
      const result = Reflect.deleteProperty(target, key);
      if (result && hadKey) {
        trigger(target, "delete", key, undefined, oldValue);
      }
      return result;
    }
    has(target, key) {
      const result = Reflect.has(target, key);
      if (!isSymbol(key) || !builtInSymbols.has(key)) {
        track(target, "has", key);
      }
      return result;
    }
    ownKeys(target) {
      track(target, "iterate", isArray(target) ? "length" : ITERATE_KEY);
      return Reflect.ownKeys(target);
    }
  }

  class ReadonlyReactiveHandler extends BaseReactiveHandler {
    constructor(isShallow2 = false) {
      super(true, isShallow2);
    }
    set(target, key) {
      if (true) {
        warn(`Set operation on key "${String(key)}" failed: target is readonly.`, target);
      }
      return true;
    }
    deleteProperty(target, key) {
      if (true) {
        warn(`Delete operation on key "${String(key)}" failed: target is readonly.`, target);
      }
      return true;
    }
  }
  var mutableHandlers = /* @__PURE__ */ new MutableReactiveHandler;
  var readonlyHandlers = /* @__PURE__ */ new ReadonlyReactiveHandler;
  var shallowReactiveHandlers = /* @__PURE__ */ new MutableReactiveHandler(true);
  var shallowReadonlyHandlers = /* @__PURE__ */ new ReadonlyReactiveHandler(true);
  var toShallow = (value) => value;
  var getProto = (v) => Reflect.getPrototypeOf(v);
  function createIterableMethod(method, isReadonly2, isShallow2) {
    return function(...args) {
      const target = this["__v_raw"];
      const rawTarget = toRaw(target);
      const targetIsMap = isMap(rawTarget);
      const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
      const isKeyOnly = method === "keys" && targetIsMap;
      const innerIterator = target[method](...args);
      const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
      !isReadonly2 && track(rawTarget, "iterate", isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY);
      return extend(Object.create(innerIterator), {
        next() {
          const { value, done } = innerIterator.next();
          return done ? { value, done } : {
            value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
            done
          };
        }
      });
    };
  }
  function createReadonlyMethod(type) {
    return function(...args) {
      if (true) {
        const key = args[0] ? `on key "${args[0]}" ` : ``;
        warn(`${capitalize(type)} operation ${key}failed: target is readonly.`, toRaw(this));
      }
      return type === "delete" ? false : type === "clear" ? undefined : this;
    };
  }
  function createInstrumentations(readonly, shallow) {
    const instrumentations = {
      get(key) {
        const target = this["__v_raw"];
        const rawTarget = toRaw(target);
        const rawKey = toRaw(key);
        if (!readonly) {
          if (hasChanged(key, rawKey)) {
            track(rawTarget, "get", key);
          }
          track(rawTarget, "get", rawKey);
        }
        const { has } = getProto(rawTarget);
        const wrap = shallow ? toShallow : readonly ? toReadonly : toReactive;
        if (has.call(rawTarget, key)) {
          return wrap(target.get(key));
        } else if (has.call(rawTarget, rawKey)) {
          return wrap(target.get(rawKey));
        } else if (target !== rawTarget) {
          target.get(key);
        }
      },
      get size() {
        const target = this["__v_raw"];
        !readonly && track(toRaw(target), "iterate", ITERATE_KEY);
        return target.size;
      },
      has(key) {
        const target = this["__v_raw"];
        const rawTarget = toRaw(target);
        const rawKey = toRaw(key);
        if (!readonly) {
          if (hasChanged(key, rawKey)) {
            track(rawTarget, "has", key);
          }
          track(rawTarget, "has", rawKey);
        }
        return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
      },
      forEach(callback, thisArg) {
        const observed = this;
        const target = observed["__v_raw"];
        const rawTarget = toRaw(target);
        const wrap = shallow ? toShallow : readonly ? toReadonly : toReactive;
        !readonly && track(rawTarget, "iterate", ITERATE_KEY);
        return target.forEach((value, key) => {
          return callback.call(thisArg, wrap(value), wrap(key), observed);
        });
      }
    };
    extend(instrumentations, readonly ? {
      add: createReadonlyMethod("add"),
      set: createReadonlyMethod("set"),
      delete: createReadonlyMethod("delete"),
      clear: createReadonlyMethod("clear")
    } : {
      add(value) {
        const target = toRaw(this);
        const proto = getProto(target);
        const rawValue = toRaw(value);
        const valueToAdd = !shallow && !isShallow(value) && !isReadonly(value) ? rawValue : value;
        const hadKey = proto.has.call(target, valueToAdd) || hasChanged(value, valueToAdd) && proto.has.call(target, value) || hasChanged(rawValue, valueToAdd) && proto.has.call(target, rawValue);
        if (!hadKey) {
          target.add(valueToAdd);
          trigger(target, "add", valueToAdd, valueToAdd);
        }
        return this;
      },
      set(key, value) {
        if (!shallow && !isShallow(value) && !isReadonly(value)) {
          value = toRaw(value);
        }
        const target = toRaw(this);
        const { has, get } = getProto(target);
        let hadKey = has.call(target, key);
        if (!hadKey) {
          key = toRaw(key);
          hadKey = has.call(target, key);
        } else if (true) {
          checkIdentityKeys(target, has, key);
        }
        const oldValue = get.call(target, key);
        target.set(key, value);
        if (!hadKey) {
          trigger(target, "add", key, value);
        } else if (hasChanged(value, oldValue)) {
          trigger(target, "set", key, value, oldValue);
        }
        return this;
      },
      delete(key) {
        const target = toRaw(this);
        const { has, get } = getProto(target);
        let hadKey = has.call(target, key);
        if (!hadKey) {
          key = toRaw(key);
          hadKey = has.call(target, key);
        } else if (true) {
          checkIdentityKeys(target, has, key);
        }
        const oldValue = get ? get.call(target, key) : undefined;
        const result = target.delete(key);
        if (hadKey) {
          trigger(target, "delete", key, undefined, oldValue);
        }
        return result;
      },
      clear() {
        const target = toRaw(this);
        const hadItems = target.size !== 0;
        const oldTarget = isMap(target) ? new Map(target) : new Set(target);
        const result = target.clear();
        if (hadItems) {
          trigger(target, "clear", undefined, undefined, oldTarget);
        }
        return result;
      }
    });
    const iteratorMethods = [
      "keys",
      "values",
      "entries",
      Symbol.iterator
    ];
    iteratorMethods.forEach((method) => {
      instrumentations[method] = createIterableMethod(method, readonly, shallow);
    });
    return instrumentations;
  }
  function createInstrumentationGetter(isReadonly2, shallow) {
    const instrumentations = createInstrumentations(isReadonly2, shallow);
    return (target, key, receiver) => {
      if (key === "__v_isReactive") {
        return !isReadonly2;
      } else if (key === "__v_isReadonly") {
        return isReadonly2;
      } else if (key === "__v_raw") {
        return target;
      }
      return Reflect.get(hasOwn(instrumentations, key) && key in target ? instrumentations : target, key, receiver);
    };
  }
  var mutableCollectionHandlers = {
    get: /* @__PURE__ */ createInstrumentationGetter(false, false)
  };
  var shallowCollectionHandlers = {
    get: /* @__PURE__ */ createInstrumentationGetter(false, true)
  };
  var readonlyCollectionHandlers = {
    get: /* @__PURE__ */ createInstrumentationGetter(true, false)
  };
  var shallowReadonlyCollectionHandlers = {
    get: /* @__PURE__ */ createInstrumentationGetter(true, true)
  };
  function checkIdentityKeys(target, has, key) {
    const rawKey = toRaw(key);
    if (rawKey !== key && has.call(target, rawKey)) {
      const type = toRawType(target);
      warn(`Reactive ${type} contains both the raw and reactive versions of the same object${type === `Map` ? ` as keys` : ``}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`);
    }
  }
  var reactiveMap = /* @__PURE__ */ new WeakMap;
  var shallowReactiveMap = /* @__PURE__ */ new WeakMap;
  var readonlyMap = /* @__PURE__ */ new WeakMap;
  var shallowReadonlyMap = /* @__PURE__ */ new WeakMap;
  function targetTypeMap(rawType) {
    switch (rawType) {
      case "Object":
      case "Array":
        return 1;
      case "Map":
      case "Set":
      case "WeakMap":
      case "WeakSet":
        return 2;
      default:
        return 0;
    }
  }
  function getTargetType(value) {
    return value["__v_skip"] || !Object.isExtensible(value) ? 0 : targetTypeMap(toRawType(value));
  }
  function reactive(target) {
    if (/* @__PURE__ */ isReadonly(target)) {
      return target;
    }
    return createReactiveObject(target, false, mutableHandlers, mutableCollectionHandlers, reactiveMap);
  }
  function shallowReactive(target) {
    return createReactiveObject(target, false, shallowReactiveHandlers, shallowCollectionHandlers, shallowReactiveMap);
  }
  function readonly(target) {
    return createReactiveObject(target, true, readonlyHandlers, readonlyCollectionHandlers, readonlyMap);
  }
  function shallowReadonly(target) {
    return createReactiveObject(target, true, shallowReadonlyHandlers, shallowReadonlyCollectionHandlers, shallowReadonlyMap);
  }
  function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
    if (!isObject(target)) {
      if (true) {
        warn(`value cannot be made ${isReadonly2 ? "readonly" : "reactive"}: ${String(target)}`);
      }
      return target;
    }
    if (target["__v_raw"] && !(isReadonly2 && target["__v_isReactive"])) {
      return target;
    }
    const targetType = getTargetType(target);
    if (targetType === 0) {
      return target;
    }
    const existingProxy = proxyMap.get(target);
    if (existingProxy) {
      return existingProxy;
    }
    const proxy = new Proxy(target, targetType === 2 ? collectionHandlers : baseHandlers);
    proxyMap.set(target, proxy);
    return proxy;
  }
  function isReactive(value) {
    if (/* @__PURE__ */ isReadonly(value)) {
      return /* @__PURE__ */ isReactive(value["__v_raw"]);
    }
    return !!(value && value["__v_isReactive"]);
  }
  function isReadonly(value) {
    return !!(value && value["__v_isReadonly"]);
  }
  function isShallow(value) {
    return !!(value && value["__v_isShallow"]);
  }
  function isProxy(value) {
    return value ? !!value["__v_raw"] : false;
  }
  function toRaw(observed) {
    const raw = observed && observed["__v_raw"];
    return raw ? /* @__PURE__ */ toRaw(raw) : observed;
  }
  function markRaw(value) {
    if (!hasOwn(value, "__v_skip") && Object.isExtensible(value)) {
      def(value, "__v_skip", true);
    }
    return value;
  }
  var toReactive = (value) => isObject(value) ? /* @__PURE__ */ reactive(value) : value;
  var toReadonly = (value) => isObject(value) ? /* @__PURE__ */ readonly(value) : value;
  function isRef2(r) {
    return r ? r["__v_isRef"] === true : false;
  }
  function ref(value) {
    return createRef(value, false);
  }
  function createRef(rawValue, shallow) {
    if (/* @__PURE__ */ isRef2(rawValue)) {
      return rawValue;
    }
    return new RefImpl(rawValue, shallow);
  }

  class RefImpl {
    constructor(value, isShallow2) {
      this.dep = new Dep;
      this["__v_isRef"] = true;
      this["__v_isShallow"] = false;
      this._rawValue = isShallow2 ? value : toRaw(value);
      this._value = isShallow2 ? value : toReactive(value);
      this["__v_isShallow"] = isShallow2;
    }
    get value() {
      if (true) {
        this.dep.track({
          target: this,
          type: "get",
          key: "value"
        });
      } else {}
      return this._value;
    }
    set value(newValue) {
      const oldValue = this._rawValue;
      const useDirectValue = this["__v_isShallow"] || isShallow(newValue) || isReadonly(newValue);
      newValue = useDirectValue ? newValue : toRaw(newValue);
      if (hasChanged(newValue, oldValue)) {
        this._rawValue = newValue;
        this._value = useDirectValue ? newValue : toReactive(newValue);
        if (true) {
          this.dep.trigger({
            target: this,
            type: "set",
            key: "value",
            newValue,
            oldValue
          });
        } else {}
      }
    }
  }
  function unref(ref2) {
    return /* @__PURE__ */ isRef2(ref2) ? ref2.value : ref2;
  }
  var shallowUnwrapHandlers = {
    get: (target, key, receiver) => key === "__v_raw" ? target : unref(Reflect.get(target, key, receiver)),
    set: (target, key, value, receiver) => {
      const oldValue = target[key];
      if (/* @__PURE__ */ isRef2(oldValue) && !/* @__PURE__ */ isRef2(value)) {
        oldValue.value = value;
        return true;
      } else {
        return Reflect.set(target, key, value, receiver);
      }
    }
  };
  function proxyRefs(objectWithRefs) {
    return isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
  }
  function toRefs(object) {
    if (!isProxy(object)) {
      warn(`toRefs() expects a reactive object but received a plain one.`);
    }
    const ret = isArray(object) ? new Array(object.length) : {};
    for (const key in object) {
      ret[key] = propertyToRef(object, key);
    }
    return ret;
  }

  class ObjectRefImpl {
    constructor(_object, key, _defaultValue) {
      this._object = _object;
      this._defaultValue = _defaultValue;
      this["__v_isRef"] = true;
      this._value = undefined;
      this._key = isSymbol(key) ? key : String(key);
      this._raw = toRaw(_object);
      let shallow = true;
      let obj = _object;
      if (!isArray(_object) || isSymbol(this._key) || !isIntegerKey(this._key)) {
        do {
          shallow = !isProxy(obj) || isShallow(obj);
        } while (shallow && (obj = obj["__v_raw"]));
      }
      this._shallow = shallow;
    }
    get value() {
      let val = this._object[this._key];
      if (this._shallow) {
        val = unref(val);
      }
      return this._value = val === undefined ? this._defaultValue : val;
    }
    set value(newVal) {
      if (this._shallow && /* @__PURE__ */ isRef2(this._raw[this._key])) {
        const nestedRef = this._object[this._key];
        if (/* @__PURE__ */ isRef2(nestedRef)) {
          nestedRef.value = newVal;
          return;
        }
      }
      this._object[this._key] = newVal;
    }
    get dep() {
      return getDepFromReactive(this._raw, this._key);
    }
  }

  class GetterRefImpl {
    constructor(_getter) {
      this._getter = _getter;
      this["__v_isRef"] = true;
      this["__v_isReadonly"] = true;
      this._value = undefined;
    }
    get value() {
      return this._value = this._getter();
    }
  }
  function toRef(source, key, defaultValue) {
    if (/* @__PURE__ */ isRef2(source)) {
      return source;
    } else if (isFunction(source)) {
      return new GetterRefImpl(source);
    } else if (isObject(source) && arguments.length > 1) {
      return propertyToRef(source, key, defaultValue);
    } else {
      return /* @__PURE__ */ ref(source);
    }
  }
  function propertyToRef(source, key, defaultValue) {
    return new ObjectRefImpl(source, key, defaultValue);
  }

  class ComputedRefImpl {
    constructor(fn, setter, isSSR) {
      this.fn = fn;
      this.setter = setter;
      this._value = undefined;
      this.dep = new Dep(this);
      this.__v_isRef = true;
      this.deps = undefined;
      this.depsTail = undefined;
      this.flags = 16;
      this.globalVersion = globalVersion - 1;
      this.next = undefined;
      this.effect = this;
      this["__v_isReadonly"] = !setter;
      this.isSSR = isSSR;
    }
    notify() {
      this.flags |= 16;
      if (!(this.flags & 8) && activeSub !== this) {
        batch(this, true);
        return true;
      } else if (true)
        ;
    }
    get value() {
      const link = this.dep.track({
        target: this,
        type: "get",
        key: "value"
      });
      refreshComputed(this);
      if (link) {
        link.version = this.dep.version;
      }
      return this._value;
    }
    set value(newValue) {
      if (this.setter) {
        this.setter(newValue);
      } else if (true) {
        warn("Write operation failed: computed value is readonly");
      }
    }
  }
  function computed(getterOrOptions, debugOptions, isSSR = false) {
    let getter;
    let setter;
    if (isFunction(getterOrOptions)) {
      getter = getterOrOptions;
    } else {
      getter = getterOrOptions.get;
      setter = getterOrOptions.set;
    }
    const cRef = new ComputedRefImpl(getter, setter, isSSR);
    if (debugOptions && !isSSR) {
      cRef.onTrack = debugOptions.onTrack;
      cRef.onTrigger = debugOptions.onTrigger;
    }
    return cRef;
  }
  var INITIAL_WATCHER_VALUE = {};
  var cleanupMap = /* @__PURE__ */ new WeakMap;
  var activeWatcher = undefined;
  function onWatcherCleanup(cleanupFn, failSilently = false, owner = activeWatcher) {
    if (owner) {
      let cleanups = cleanupMap.get(owner);
      if (!cleanups)
        cleanupMap.set(owner, cleanups = []);
      cleanups.push(cleanupFn);
    } else if (!failSilently) {
      warn(`onWatcherCleanup() was called when there was no active watcher to associate with.`);
    }
  }
  function watch(source, cb, options = EMPTY_OBJ) {
    const { immediate, deep, once, scheduler, augmentJob, call } = options;
    const warnInvalidSource = (s) => {
      (options.onWarn || warn)(`Invalid watch source: `, s, `A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.`);
    };
    const reactiveGetter = (source2) => {
      if (deep)
        return source2;
      if (isShallow(source2) || deep === false || deep === 0)
        return traverse(source2, 1);
      return traverse(source2);
    };
    let effect;
    let getter;
    let cleanup;
    let boundCleanup;
    let forceTrigger = false;
    let isMultiSource = false;
    if (isRef2(source)) {
      getter = () => source.value;
      forceTrigger = isShallow(source);
    } else if (isReactive(source)) {
      getter = () => reactiveGetter(source);
      forceTrigger = true;
    } else if (isArray(source)) {
      isMultiSource = true;
      forceTrigger = source.some((s) => isReactive(s) || isShallow(s));
      getter = () => source.map((s) => {
        if (isRef2(s)) {
          return s.value;
        } else if (isReactive(s)) {
          return reactiveGetter(s);
        } else if (isFunction(s)) {
          return call ? call(s, 2) : s();
        } else {
          warnInvalidSource(s);
        }
      });
    } else if (isFunction(source)) {
      if (cb) {
        getter = call ? () => call(source, 2) : source;
      } else {
        getter = () => {
          if (cleanup) {
            pauseTracking();
            try {
              cleanup();
            } finally {
              resetTracking();
            }
          }
          const currentEffect = activeWatcher;
          activeWatcher = effect;
          try {
            return call ? call(source, 3, [boundCleanup]) : source(boundCleanup);
          } finally {
            activeWatcher = currentEffect;
          }
        };
      }
    } else {
      getter = NOOP;
      warnInvalidSource(source);
    }
    if (cb && deep) {
      const baseGetter = getter;
      const depth = deep === true ? Infinity : deep;
      getter = () => traverse(baseGetter(), depth);
    }
    const scope = getCurrentScope();
    const watchHandle = () => {
      effect.stop();
      if (scope && scope.active) {
        remove(scope.effects, effect);
      }
    };
    if (once && cb) {
      const _cb = cb;
      cb = (...args) => {
        _cb(...args);
        watchHandle();
      };
    }
    let oldValue = isMultiSource ? new Array(source.length).fill(INITIAL_WATCHER_VALUE) : INITIAL_WATCHER_VALUE;
    const job = (immediateFirstRun) => {
      if (!(effect.flags & 1) || !effect.dirty && !immediateFirstRun) {
        return;
      }
      if (cb) {
        const newValue = effect.run();
        if (deep || forceTrigger || (isMultiSource ? newValue.some((v, i) => hasChanged(v, oldValue[i])) : hasChanged(newValue, oldValue))) {
          if (cleanup) {
            cleanup();
          }
          const currentWatcher = activeWatcher;
          activeWatcher = effect;
          try {
            const args = [
              newValue,
              oldValue === INITIAL_WATCHER_VALUE ? undefined : isMultiSource && oldValue[0] === INITIAL_WATCHER_VALUE ? [] : oldValue,
              boundCleanup
            ];
            oldValue = newValue;
            call ? call(cb, 3, args) : cb(...args);
          } finally {
            activeWatcher = currentWatcher;
          }
        }
      } else {
        effect.run();
      }
    };
    if (augmentJob) {
      augmentJob(job);
    }
    effect = new ReactiveEffect(getter);
    effect.scheduler = scheduler ? () => scheduler(job, false) : job;
    boundCleanup = (fn) => onWatcherCleanup(fn, false, effect);
    cleanup = effect.onStop = () => {
      const cleanups = cleanupMap.get(effect);
      if (cleanups) {
        if (call) {
          call(cleanups, 4);
        } else {
          for (const cleanup2 of cleanups)
            cleanup2();
        }
        cleanupMap.delete(effect);
      }
    };
    if (true) {
      effect.onTrack = options.onTrack;
      effect.onTrigger = options.onTrigger;
    }
    if (cb) {
      if (immediate) {
        job(true);
      } else {
        oldValue = effect.run();
      }
    } else if (scheduler) {
      scheduler(job.bind(null, true), true);
    } else {
      effect.run();
    }
    watchHandle.pause = effect.pause.bind(effect);
    watchHandle.resume = effect.resume.bind(effect);
    watchHandle.stop = watchHandle;
    return watchHandle;
  }
  function traverse(value, depth = Infinity, seen) {
    if (depth <= 0 || !isObject(value) || value["__v_skip"]) {
      return value;
    }
    seen = seen || /* @__PURE__ */ new Map;
    if ((seen.get(value) || 0) >= depth) {
      return value;
    }
    seen.set(value, depth);
    depth--;
    if (isRef2(value)) {
      traverse(value.value, depth, seen);
    } else if (isArray(value)) {
      for (let i = 0;i < value.length; i++) {
        traverse(value[i], depth, seen);
      }
    } else if (isSet(value) || isMap(value)) {
      value.forEach((v) => {
        traverse(v, depth, seen);
      });
    } else if (isPlainObject(value)) {
      for (const key in value) {
        traverse(value[key], depth, seen);
      }
      for (const key of Object.getOwnPropertySymbols(value)) {
        if (Object.prototype.propertyIsEnumerable.call(value, key)) {
          traverse(value[key], depth, seen);
        }
      }
    }
    return value;
  }
  // node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js
  var stack = [];
  function pushWarningContext(vnode) {
    stack.push(vnode);
  }
  function popWarningContext() {
    stack.pop();
  }
  var isWarning = false;
  function warn$1(msg, ...args) {
    if (isWarning)
      return;
    isWarning = true;
    pauseTracking();
    const instance = stack.length ? stack[stack.length - 1].component : null;
    const appWarnHandler = instance && instance.appContext.config.warnHandler;
    const trace = getComponentTrace();
    if (appWarnHandler) {
      callWithErrorHandling(appWarnHandler, instance, 11, [
        msg + args.map((a) => {
          var _a, _b;
          return (_b = (_a = a.toString) == null ? undefined : _a.call(a)) != null ? _b : JSON.stringify(a);
        }).join(""),
        instance && instance.proxy,
        trace.map(({ vnode }) => `at <${formatComponentName(instance, vnode.type)}>`).join(`
`),
        trace
      ]);
    } else {
      const warnArgs = [`[Vue warn]: ${msg}`, ...args];
      if (trace.length && true) {
        warnArgs.push(`
`, ...formatTrace(trace));
      }
      console.warn(...warnArgs);
    }
    resetTracking();
    isWarning = false;
  }
  function getComponentTrace() {
    let currentVNode = stack[stack.length - 1];
    if (!currentVNode) {
      return [];
    }
    const normalizedStack = [];
    while (currentVNode) {
      const last = normalizedStack[0];
      if (last && last.vnode === currentVNode) {
        last.recurseCount++;
      } else {
        normalizedStack.push({
          vnode: currentVNode,
          recurseCount: 0
        });
      }
      const parentInstance = currentVNode.component && currentVNode.component.parent;
      currentVNode = parentInstance && parentInstance.vnode;
    }
    return normalizedStack;
  }
  function formatTrace(trace) {
    const logs = [];
    trace.forEach((entry, i) => {
      logs.push(...i === 0 ? [] : [`
`], ...formatTraceEntry(entry));
    });
    return logs;
  }
  function formatTraceEntry({ vnode, recurseCount }) {
    const postfix = recurseCount > 0 ? `... (${recurseCount} recursive calls)` : ``;
    const isRoot = vnode.component ? vnode.component.parent == null : false;
    const open2 = ` at <${formatComponentName(vnode.component, vnode.type, isRoot)}`;
    const close = `>` + postfix;
    return vnode.props ? [open2, ...formatProps(vnode.props), close] : [open2 + close];
  }
  function formatProps(props) {
    const res = [];
    const keys = Object.keys(props);
    keys.slice(0, 3).forEach((key) => {
      res.push(...formatProp(key, props[key]));
    });
    if (keys.length > 3) {
      res.push(` ...`);
    }
    return res;
  }
  function formatProp(key, value, raw) {
    if (isString(value)) {
      value = JSON.stringify(value);
      return raw ? value : [`${key}=${value}`];
    } else if (typeof value === "number" || typeof value === "boolean" || value == null) {
      return raw ? value : [`${key}=${value}`];
    } else if (isRef2(value)) {
      value = formatProp(key, toRaw(value.value), true);
      return raw ? value : [`${key}=Ref<`, value, `>`];
    } else if (isFunction(value)) {
      return [`${key}=fn${value.name ? `<${value.name}>` : ``}`];
    } else {
      value = toRaw(value);
      return raw ? value : [`${key}=`, value];
    }
  }
  var ErrorTypeStrings$1 = {
    ["sp"]: "serverPrefetch hook",
    ["bc"]: "beforeCreate hook",
    ["c"]: "created hook",
    ["bm"]: "beforeMount hook",
    ["m"]: "mounted hook",
    ["bu"]: "beforeUpdate hook",
    ["u"]: "updated",
    ["bum"]: "beforeUnmount hook",
    ["um"]: "unmounted hook",
    ["a"]: "activated hook",
    ["da"]: "deactivated hook",
    ["ec"]: "errorCaptured hook",
    ["rtc"]: "renderTracked hook",
    ["rtg"]: "renderTriggered hook",
    [0]: "setup function",
    [1]: "render function",
    [2]: "watcher getter",
    [3]: "watcher callback",
    [4]: "watcher cleanup function",
    [5]: "native event handler",
    [6]: "component event handler",
    [7]: "vnode hook",
    [8]: "directive hook",
    [9]: "transition hook",
    [10]: "app errorHandler",
    [11]: "app warnHandler",
    [12]: "ref function",
    [13]: "async component loader",
    [14]: "scheduler flush",
    [15]: "component update",
    [16]: "app unmount cleanup function"
  };
  function callWithErrorHandling(fn, instance, type, args) {
    try {
      return args ? fn(...args) : fn();
    } catch (err) {
      handleError(err, instance, type);
    }
  }
  function callWithAsyncErrorHandling(fn, instance, type, args) {
    if (isFunction(fn)) {
      const res = callWithErrorHandling(fn, instance, type, args);
      if (res && isPromise(res)) {
        res.catch((err) => {
          handleError(err, instance, type);
        });
      }
      return res;
    }
    if (isArray(fn)) {
      const values = [];
      for (let i = 0;i < fn.length; i++) {
        values.push(callWithAsyncErrorHandling(fn[i], instance, type, args));
      }
      return values;
    } else if (true) {
      warn$1(`Invalid value type passed to callWithAsyncErrorHandling(): ${typeof fn}`);
    }
  }
  function handleError(err, instance, type, throwInDev = true) {
    const contextVNode = instance ? instance.vnode : null;
    const { errorHandler, throwUnhandledErrorInProduction } = instance && instance.appContext.config || EMPTY_OBJ;
    if (instance) {
      let cur = instance.parent;
      const exposedInstance = instance.proxy;
      const errorInfo = ErrorTypeStrings$1[type];
      while (cur) {
        const errorCapturedHooks = cur.ec;
        if (errorCapturedHooks) {
          for (let i = 0;i < errorCapturedHooks.length; i++) {
            if (errorCapturedHooks[i](err, exposedInstance, errorInfo) === false) {
              return;
            }
          }
        }
        cur = cur.parent;
      }
      if (errorHandler) {
        pauseTracking();
        callWithErrorHandling(errorHandler, null, 10, [
          err,
          exposedInstance,
          errorInfo
        ]);
        resetTracking();
        return;
      }
    }
    logError(err, type, contextVNode, throwInDev, throwUnhandledErrorInProduction);
  }
  function logError(err, type, contextVNode, throwInDev = true, throwInProd = false) {
    if (true) {
      const info = ErrorTypeStrings$1[type];
      if (contextVNode) {
        pushWarningContext(contextVNode);
      }
      warn$1(`Unhandled error${info ? ` during execution of ${info}` : ``}`);
      if (contextVNode) {
        popWarningContext();
      }
      if (throwInDev) {
        throw err;
      } else {
        console.error(err);
      }
    } else
      ;
  }
  var queue = [];
  var flushIndex = -1;
  var pendingPostFlushCbs = [];
  var activePostFlushCbs = null;
  var postFlushIndex = 0;
  var resolvedPromise = /* @__PURE__ */ Promise.resolve();
  var currentFlushPromise = null;
  var RECURSION_LIMIT = 100;
  function nextTick(fn) {
    const p = currentFlushPromise || resolvedPromise;
    return fn ? p.then(this ? fn.bind(this) : fn) : p;
  }
  function findInsertionIndex(id) {
    let start = flushIndex + 1;
    let end = queue.length;
    while (start < end) {
      const middle = start + end >>> 1;
      const middleJob = queue[middle];
      const middleJobId = getId(middleJob);
      if (middleJobId < id || middleJobId === id && middleJob.flags & 2) {
        start = middle + 1;
      } else {
        end = middle;
      }
    }
    return start;
  }
  function queueJob(job) {
    if (!(job.flags & 1)) {
      const jobId = getId(job);
      const lastJob = queue[queue.length - 1];
      if (!lastJob || !(job.flags & 2) && jobId >= getId(lastJob)) {
        queue.push(job);
      } else {
        queue.splice(findInsertionIndex(jobId), 0, job);
      }
      job.flags |= 1;
      queueFlush();
    }
  }
  function queueFlush() {
    if (!currentFlushPromise) {
      currentFlushPromise = resolvedPromise.then(flushJobs);
    }
  }
  function queuePostFlushCb(cb) {
    if (!isArray(cb)) {
      if (activePostFlushCbs && cb.id === -1) {
        activePostFlushCbs.splice(postFlushIndex + 1, 0, cb);
      } else if (!(cb.flags & 1)) {
        pendingPostFlushCbs.push(cb);
        cb.flags |= 1;
      }
    } else {
      pendingPostFlushCbs.push(...cb);
    }
    queueFlush();
  }
  function flushPreFlushCbs(instance, seen, i = flushIndex + 1) {
    if (true) {
      seen = seen || /* @__PURE__ */ new Map;
    }
    for (;i < queue.length; i++) {
      const cb = queue[i];
      if (cb && cb.flags & 2) {
        if (instance && cb.id !== instance.uid) {
          continue;
        }
        if (checkRecursiveUpdates(seen, cb)) {
          continue;
        }
        queue.splice(i, 1);
        i--;
        if (cb.flags & 4) {
          cb.flags &= -2;
        }
        cb();
        if (!(cb.flags & 4)) {
          cb.flags &= -2;
        }
      }
    }
  }
  function flushPostFlushCbs(seen) {
    if (pendingPostFlushCbs.length) {
      const deduped = [...new Set(pendingPostFlushCbs)].sort((a, b) => getId(a) - getId(b));
      pendingPostFlushCbs.length = 0;
      if (activePostFlushCbs) {
        activePostFlushCbs.push(...deduped);
        return;
      }
      activePostFlushCbs = deduped;
      if (true) {
        seen = seen || /* @__PURE__ */ new Map;
      }
      for (postFlushIndex = 0;postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
        const cb = activePostFlushCbs[postFlushIndex];
        if (checkRecursiveUpdates(seen, cb)) {
          continue;
        }
        if (cb.flags & 4) {
          cb.flags &= -2;
        }
        if (!(cb.flags & 8))
          cb();
        cb.flags &= -2;
      }
      activePostFlushCbs = null;
      postFlushIndex = 0;
    }
  }
  var getId = (job) => job.id == null ? job.flags & 2 ? -1 : Infinity : job.id;
  function flushJobs(seen) {
    if (true) {
      seen = seen || /* @__PURE__ */ new Map;
    }
    const check = (job) => checkRecursiveUpdates(seen, job);
    try {
      for (flushIndex = 0;flushIndex < queue.length; flushIndex++) {
        const job = queue[flushIndex];
        if (job && !(job.flags & 8)) {
          if (check(job)) {
            continue;
          }
          if (job.flags & 4) {
            job.flags &= ~1;
          }
          callWithErrorHandling(job, job.i, job.i ? 15 : 14);
          if (!(job.flags & 4)) {
            job.flags &= ~1;
          }
        }
      }
    } finally {
      for (;flushIndex < queue.length; flushIndex++) {
        const job = queue[flushIndex];
        if (job) {
          job.flags &= -2;
        }
      }
      flushIndex = -1;
      queue.length = 0;
      flushPostFlushCbs(seen);
      currentFlushPromise = null;
      if (queue.length || pendingPostFlushCbs.length) {
        flushJobs(seen);
      }
    }
  }
  function checkRecursiveUpdates(seen, fn) {
    const count = seen.get(fn) || 0;
    if (count > RECURSION_LIMIT) {
      const instance = fn.i;
      const componentName = instance && getComponentName(instance.type);
      handleError(`Maximum recursive updates exceeded${componentName ? ` in component <${componentName}>` : ``}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`, null, 10);
      return true;
    }
    seen.set(fn, count + 1);
    return false;
  }
  var isHmrUpdating = false;
  var setHmrUpdating = (v) => {
    try {
      return isHmrUpdating;
    } finally {
      isHmrUpdating = v;
    }
  };
  var hmrDirtyComponents = /* @__PURE__ */ new Map;
  if (true) {
    getGlobalThis().__VUE_HMR_RUNTIME__ = {
      createRecord: tryWrap(createRecord),
      rerender: tryWrap(rerender),
      reload: tryWrap(reload)
    };
  }
  var map = /* @__PURE__ */ new Map;
  function registerHMR(instance) {
    const id = instance.type.__hmrId;
    let record = map.get(id);
    if (!record) {
      createRecord(id, instance.type);
      record = map.get(id);
    }
    record.instances.add(instance);
  }
  function unregisterHMR(instance) {
    map.get(instance.type.__hmrId).instances.delete(instance);
  }
  function createRecord(id, initialDef) {
    if (map.has(id)) {
      return false;
    }
    map.set(id, {
      initialDef: normalizeClassComponent(initialDef),
      instances: /* @__PURE__ */ new Set
    });
    return true;
  }
  function normalizeClassComponent(component) {
    return isClassComponent(component) ? component.__vccOpts : component;
  }
  function rerender(id, newRender) {
    const record = map.get(id);
    if (!record) {
      return;
    }
    record.initialDef.render = newRender;
    [...record.instances].forEach((instance) => {
      if (newRender) {
        instance.render = newRender;
        normalizeClassComponent(instance.type).render = newRender;
      }
      instance.renderCache = [];
      isHmrUpdating = true;
      if (!(instance.job.flags & 8)) {
        instance.update();
      }
      isHmrUpdating = false;
    });
  }
  function reload(id, newComp) {
    const record = map.get(id);
    if (!record)
      return;
    newComp = normalizeClassComponent(newComp);
    updateComponentDef(record.initialDef, newComp);
    const instances = [...record.instances];
    for (let i = 0;i < instances.length; i++) {
      const instance = instances[i];
      const oldComp = normalizeClassComponent(instance.type);
      let dirtyInstances = hmrDirtyComponents.get(oldComp);
      if (!dirtyInstances) {
        if (oldComp !== record.initialDef) {
          updateComponentDef(oldComp, newComp);
        }
        hmrDirtyComponents.set(oldComp, dirtyInstances = /* @__PURE__ */ new Set);
      }
      dirtyInstances.add(instance);
      instance.appContext.propsCache.delete(instance.type);
      instance.appContext.emitsCache.delete(instance.type);
      instance.appContext.optionsCache.delete(instance.type);
      if (instance.ceReload) {
        dirtyInstances.add(instance);
        instance.ceReload(newComp.styles);
        dirtyInstances.delete(instance);
      } else if (instance.parent) {
        queueJob(() => {
          if (!(instance.job.flags & 8)) {
            isHmrUpdating = true;
            instance.parent.update();
            isHmrUpdating = false;
            dirtyInstances.delete(instance);
          }
        });
      } else if (instance.appContext.reload) {
        instance.appContext.reload();
      } else if (typeof window !== "undefined") {
        window.location.reload();
      } else {
        console.warn("[HMR] Root or manually mounted instance modified. Full reload required.");
      }
      if (instance.root.ce && instance !== instance.root) {
        instance.root.ce._removeChildStyle(oldComp);
      }
    }
    queuePostFlushCb(() => {
      hmrDirtyComponents.clear();
    });
  }
  function updateComponentDef(oldComp, newComp) {
    extend(oldComp, newComp);
    for (const key in oldComp) {
      if (key !== "__file" && !(key in newComp)) {
        delete oldComp[key];
      }
    }
  }
  function tryWrap(fn) {
    return (id, arg) => {
      try {
        return fn(id, arg);
      } catch (e) {
        console.error(e);
        console.warn(`[HMR] Something went wrong during Vue component hot-reload. Full reload required.`);
      }
    };
  }
  var devtools$1;
  var buffer = [];
  var devtoolsNotInstalled = false;
  function emit$1(event, ...args) {
    if (devtools$1) {
      devtools$1.emit(event, ...args);
    } else if (!devtoolsNotInstalled) {
      buffer.push({ event, args });
    }
  }
  function setDevtoolsHook$1(hook, target) {
    var _a, _b;
    devtools$1 = hook;
    if (devtools$1) {
      devtools$1.enabled = true;
      buffer.forEach(({ event, args }) => devtools$1.emit(event, ...args));
      buffer = [];
    } else if (typeof window !== "undefined" && window.HTMLElement && !((_b = (_a = window.navigator) == null ? undefined : _a.userAgent) == null ? undefined : _b.includes("jsdom"))) {
      const replay = target.__VUE_DEVTOOLS_HOOK_REPLAY__ = target.__VUE_DEVTOOLS_HOOK_REPLAY__ || [];
      replay.push((newHook) => {
        setDevtoolsHook$1(newHook, target);
      });
      setTimeout(() => {
        if (!devtools$1) {
          target.__VUE_DEVTOOLS_HOOK_REPLAY__ = null;
          devtoolsNotInstalled = true;
          buffer = [];
        }
      }, 3000);
    } else {
      devtoolsNotInstalled = true;
      buffer = [];
    }
  }
  function devtoolsInitApp(app, version) {
    emit$1("app:init", app, version, {
      Fragment,
      Text,
      Comment,
      Static
    });
  }
  function devtoolsUnmountApp(app) {
    emit$1("app:unmount", app);
  }
  var devtoolsComponentAdded = /* @__PURE__ */ createDevtoolsComponentHook("component:added");
  var devtoolsComponentUpdated = /* @__PURE__ */ createDevtoolsComponentHook("component:updated");
  var _devtoolsComponentRemoved = /* @__PURE__ */ createDevtoolsComponentHook("component:removed");
  var devtoolsComponentRemoved = (component) => {
    if (devtools$1 && typeof devtools$1.cleanupBuffer === "function" && !devtools$1.cleanupBuffer(component)) {
      _devtoolsComponentRemoved(component);
    }
  };
  function createDevtoolsComponentHook(hook) {
    return (component) => {
      emit$1(hook, component.appContext.app, component.uid, component.parent ? component.parent.uid : undefined, component);
    };
  }
  var devtoolsPerfStart = /* @__PURE__ */ createDevtoolsPerformanceHook("perf:start");
  var devtoolsPerfEnd = /* @__PURE__ */ createDevtoolsPerformanceHook("perf:end");
  function createDevtoolsPerformanceHook(hook) {
    return (component, type, time) => {
      emit$1(hook, component.appContext.app, component.uid, component, type, time);
    };
  }
  function devtoolsComponentEmit(component, event, params) {
    emit$1("component:emit", component.appContext.app, component, event, params);
  }
  var currentRenderingInstance = null;
  var currentScopeId = null;
  function setCurrentRenderingInstance(instance) {
    const prev = currentRenderingInstance;
    currentRenderingInstance = instance;
    currentScopeId = instance && instance.type.__scopeId || null;
    return prev;
  }
  function withCtx(fn, ctx = currentRenderingInstance, isNonScopedSlot) {
    if (!ctx)
      return fn;
    if (fn._n) {
      return fn;
    }
    const renderFnWithContext = (...args) => {
      if (renderFnWithContext._d) {
        setBlockTracking(-1);
      }
      const prevInstance = setCurrentRenderingInstance(ctx);
      let res;
      try {
        res = fn(...args);
      } finally {
        setCurrentRenderingInstance(prevInstance);
        if (renderFnWithContext._d) {
          setBlockTracking(1);
        }
      }
      if (true) {
        devtoolsComponentUpdated(ctx);
      }
      return res;
    };
    renderFnWithContext._n = true;
    renderFnWithContext._c = true;
    renderFnWithContext._d = true;
    return renderFnWithContext;
  }
  function validateDirectiveName(name) {
    if (isBuiltInDirective(name)) {
      warn$1("Do not use built-in directive ids as custom directive id: " + name);
    }
  }
  function invokeDirectiveHook(vnode, prevVNode, instance, name) {
    const bindings = vnode.dirs;
    const oldBindings = prevVNode && prevVNode.dirs;
    for (let i = 0;i < bindings.length; i++) {
      const binding = bindings[i];
      if (oldBindings) {
        binding.oldValue = oldBindings[i].value;
      }
      let hook = binding.dir[name];
      if (hook) {
        pauseTracking();
        callWithAsyncErrorHandling(hook, instance, 8, [
          vnode.el,
          binding,
          vnode,
          prevVNode
        ]);
        resetTracking();
      }
    }
  }
  function provide(key, value) {
    if (true) {
      if (!currentInstance || currentInstance.isMounted) {
        warn$1(`provide() can only be used inside setup().`);
      }
    }
    if (currentInstance) {
      let provides = currentInstance.provides;
      const parentProvides = currentInstance.parent && currentInstance.parent.provides;
      if (parentProvides === provides) {
        provides = currentInstance.provides = Object.create(parentProvides);
      }
      provides[key] = value;
    }
  }
  function inject(key, defaultValue, treatDefaultAsFactory = false) {
    const instance = getCurrentInstance();
    if (instance || currentApp) {
      let provides = currentApp ? currentApp._context.provides : instance ? instance.parent == null || instance.ce ? instance.vnode.appContext && instance.vnode.appContext.provides : instance.parent.provides : undefined;
      if (provides && key in provides) {
        return provides[key];
      } else if (arguments.length > 1) {
        return treatDefaultAsFactory && isFunction(defaultValue) ? defaultValue.call(instance && instance.proxy) : defaultValue;
      } else if (true) {
        warn$1(`injection "${String(key)}" not found.`);
      }
    } else if (true) {
      warn$1(`inject() can only be used inside setup() or functional components.`);
    }
  }
  function hasInjectionContext() {
    return !!(getCurrentInstance() || currentApp);
  }
  var ssrContextKey = /* @__PURE__ */ Symbol.for("v-scx");
  var useSSRContext = () => {
    {
      const ctx = inject(ssrContextKey);
      if (!ctx) {
        warn$1(`Server rendering context not provided. Make sure to only call useSSRContext() conditionally in the server build.`);
      }
      return ctx;
    }
  };
  function watch2(source, cb, options) {
    if (!isFunction(cb)) {
      warn$1(`\`watch(fn, options?)\` signature has been moved to a separate API. Use \`watchEffect(fn, options?)\` instead. \`watch\` now only supports \`watch(source, cb, options?) signature.`);
    }
    return doWatch(source, cb, options);
  }
  function doWatch(source, cb, options = EMPTY_OBJ) {
    const { immediate, deep, flush, once } = options;
    if (!cb) {
      if (immediate !== undefined) {
        warn$1(`watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.`);
      }
      if (deep !== undefined) {
        warn$1(`watch() "deep" option is only respected when using the watch(source, callback, options?) signature.`);
      }
      if (once !== undefined) {
        warn$1(`watch() "once" option is only respected when using the watch(source, callback, options?) signature.`);
      }
    }
    const baseWatchOptions = extend({}, options);
    if (true)
      baseWatchOptions.onWarn = warn$1;
    const runsImmediately = cb && immediate || !cb && flush !== "post";
    let ssrCleanup;
    if (isInSSRComponentSetup) {
      if (flush === "sync") {
        const ctx = useSSRContext();
        ssrCleanup = ctx.__watcherHandles || (ctx.__watcherHandles = []);
      } else if (!runsImmediately) {
        const watchStopHandle = () => {};
        watchStopHandle.stop = NOOP;
        watchStopHandle.resume = NOOP;
        watchStopHandle.pause = NOOP;
        return watchStopHandle;
      }
    }
    const instance = currentInstance;
    baseWatchOptions.call = (fn, type, args) => callWithAsyncErrorHandling(fn, instance, type, args);
    let isPre = false;
    if (flush === "post") {
      baseWatchOptions.scheduler = (job) => {
        queuePostRenderEffect(job, instance && instance.suspense);
      };
    } else if (flush !== "sync") {
      isPre = true;
      baseWatchOptions.scheduler = (job, isFirstRun) => {
        if (isFirstRun) {
          job();
        } else {
          queueJob(job);
        }
      };
    }
    baseWatchOptions.augmentJob = (job) => {
      if (cb) {
        job.flags |= 4;
      }
      if (isPre) {
        job.flags |= 2;
        if (instance) {
          job.id = instance.uid;
          job.i = instance;
        }
      }
    };
    const watchHandle = watch(source, cb, baseWatchOptions);
    if (isInSSRComponentSetup) {
      if (ssrCleanup) {
        ssrCleanup.push(watchHandle);
      } else if (runsImmediately) {
        watchHandle();
      }
    }
    return watchHandle;
  }
  function instanceWatch(source, value, options) {
    const publicThis = this.proxy;
    const getter = isString(source) ? source.includes(".") ? createPathGetter(publicThis, source) : () => publicThis[source] : source.bind(publicThis, publicThis);
    let cb;
    if (isFunction(value)) {
      cb = value;
    } else {
      cb = value.handler;
      options = value;
    }
    const reset = setCurrentInstance(this);
    const res = doWatch(getter, cb.bind(publicThis), options);
    reset();
    return res;
  }
  function createPathGetter(ctx, path) {
    const segments = path.split(".");
    return () => {
      let cur = ctx;
      for (let i = 0;i < segments.length && cur; i++) {
        cur = cur[segments[i]];
      }
      return cur;
    };
  }
  var pendingMounts = /* @__PURE__ */ new WeakMap;
  var TeleportEndKey = /* @__PURE__ */ Symbol("_vte");
  var isTeleport = (type) => type.__isTeleport;
  var isTeleportDisabled = (props) => props && (props.disabled || props.disabled === "");
  var isTeleportDeferred = (props) => props && (props.defer || props.defer === "");
  var isTargetSVG = (target) => typeof SVGElement !== "undefined" && target instanceof SVGElement;
  var isTargetMathML = (target) => typeof MathMLElement === "function" && target instanceof MathMLElement;
  var resolveTarget = (props, select) => {
    const targetSelector = props && props.to;
    if (isString(targetSelector)) {
      if (!select) {
        warn$1(`Current renderer does not support string target for Teleports. (missing querySelector renderer option)`);
        return null;
      } else {
        const target = select(targetSelector);
        if (!target && !isTeleportDisabled(props)) {
          warn$1(`Failed to locate Teleport target with selector "${targetSelector}". Note the target element must exist before the component is mounted - i.e. the target cannot be rendered by the component itself, and ideally should be outside of the entire Vue component tree.`);
        }
        return target;
      }
    } else {
      if (!targetSelector && !isTeleportDisabled(props)) {
        warn$1(`Invalid Teleport target: ${targetSelector}`);
      }
      return targetSelector;
    }
  };
  var TeleportImpl = {
    name: "Teleport",
    __isTeleport: true,
    process(n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, internals) {
      const {
        mc: mountChildren,
        pc: patchChildren,
        pbc: patchBlockChildren,
        o: { insert, querySelector, createText, createComment }
      } = internals;
      const disabled = isTeleportDisabled(n2.props);
      let { dynamicChildren } = n2;
      if (isHmrUpdating) {
        optimized = false;
        dynamicChildren = null;
      }
      const mount = (vnode, container2, anchor2) => {
        if (vnode.shapeFlag & 16) {
          mountChildren(vnode.children, container2, anchor2, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
        }
      };
      const mountToTarget = (vnode = n2) => {
        const disabled2 = isTeleportDisabled(vnode.props);
        const target = vnode.target = resolveTarget(vnode.props, querySelector);
        const targetAnchor = prepareAnchor(target, vnode, createText, insert);
        if (target) {
          if (namespace !== "svg" && isTargetSVG(target)) {
            namespace = "svg";
          } else if (namespace !== "mathml" && isTargetMathML(target)) {
            namespace = "mathml";
          }
          if (parentComponent && parentComponent.isCE) {
            (parentComponent.ce._teleportTargets || (parentComponent.ce._teleportTargets = /* @__PURE__ */ new Set)).add(target);
          }
          if (!disabled2) {
            mount(vnode, target, targetAnchor);
            updateCssVars(vnode, false);
          }
        } else if (!disabled2) {
          warn$1("Invalid Teleport target on mount:", target, `(${typeof target})`);
        }
      };
      const queuePendingMount = (vnode) => {
        const mountJob = () => {
          if (pendingMounts.get(vnode) !== mountJob)
            return;
          pendingMounts.delete(vnode);
          if (isTeleportDisabled(vnode.props)) {
            mount(vnode, container, vnode.anchor);
            updateCssVars(vnode, true);
          }
          mountToTarget(vnode);
        };
        pendingMounts.set(vnode, mountJob);
        queuePostRenderEffect(mountJob, parentSuspense);
      };
      if (n1 == null) {
        const placeholder = n2.el = createComment("teleport start");
        const mainAnchor = n2.anchor = createComment("teleport end");
        insert(placeholder, container, anchor);
        insert(mainAnchor, container, anchor);
        if (isTeleportDeferred(n2.props) || parentSuspense && parentSuspense.pendingBranch) {
          queuePendingMount(n2);
          return;
        }
        if (disabled) {
          mount(n2, container, mainAnchor);
          updateCssVars(n2, true);
        }
        mountToTarget();
      } else {
        n2.el = n1.el;
        const mainAnchor = n2.anchor = n1.anchor;
        const pendingMount = pendingMounts.get(n1);
        if (pendingMount) {
          pendingMount.flags |= 8;
          pendingMounts.delete(n1);
          queuePendingMount(n2);
          return;
        }
        n2.targetStart = n1.targetStart;
        const target = n2.target = n1.target;
        const targetAnchor = n2.targetAnchor = n1.targetAnchor;
        const wasDisabled = isTeleportDisabled(n1.props);
        const currentContainer = wasDisabled ? container : target;
        const currentAnchor = wasDisabled ? mainAnchor : targetAnchor;
        if (namespace === "svg" || isTargetSVG(target)) {
          namespace = "svg";
        } else if (namespace === "mathml" || isTargetMathML(target)) {
          namespace = "mathml";
        }
        if (dynamicChildren) {
          patchBlockChildren(n1.dynamicChildren, dynamicChildren, currentContainer, parentComponent, parentSuspense, namespace, slotScopeIds);
          traverseStaticChildren(n1, n2, false);
        } else if (!optimized) {
          patchChildren(n1, n2, currentContainer, currentAnchor, parentComponent, parentSuspense, namespace, slotScopeIds, false);
        }
        if (disabled) {
          if (!wasDisabled) {
            moveTeleport(n2, container, mainAnchor, internals, 1);
          } else {
            if (n2.props && n1.props && n2.props.to !== n1.props.to) {
              n2.props.to = n1.props.to;
            }
          }
        } else {
          if ((n2.props && n2.props.to) !== (n1.props && n1.props.to)) {
            const nextTarget = n2.target = resolveTarget(n2.props, querySelector);
            if (nextTarget) {
              moveTeleport(n2, nextTarget, null, internals, 0);
            } else if (true) {
              warn$1("Invalid Teleport target on update:", target, `(${typeof target})`);
            }
          } else if (wasDisabled) {
            moveTeleport(n2, target, targetAnchor, internals, 1);
          }
        }
        updateCssVars(n2, disabled);
      }
    },
    remove(vnode, parentComponent, parentSuspense, { um: unmount, o: { remove: hostRemove } }, doRemove) {
      const {
        shapeFlag,
        children,
        anchor,
        targetStart,
        targetAnchor,
        target,
        props
      } = vnode;
      let shouldRemove = doRemove || !isTeleportDisabled(props);
      const pendingMount = pendingMounts.get(vnode);
      if (pendingMount) {
        pendingMount.flags |= 8;
        pendingMounts.delete(vnode);
        shouldRemove = false;
      }
      if (target) {
        hostRemove(targetStart);
        hostRemove(targetAnchor);
      }
      doRemove && hostRemove(anchor);
      if (shapeFlag & 16) {
        for (let i = 0;i < children.length; i++) {
          const child = children[i];
          unmount(child, parentComponent, parentSuspense, shouldRemove, !!child.dynamicChildren);
        }
      }
    },
    move: moveTeleport,
    hydrate: hydrateTeleport
  };
  function moveTeleport(vnode, container, parentAnchor, { o: { insert }, m: move }, moveType = 2) {
    if (moveType === 0) {
      insert(vnode.targetAnchor, container, parentAnchor);
    }
    const { el, anchor, shapeFlag, children, props } = vnode;
    const isReorder = moveType === 2;
    if (isReorder) {
      insert(el, container, parentAnchor);
    }
    if (!isReorder || isTeleportDisabled(props)) {
      if (shapeFlag & 16) {
        for (let i = 0;i < children.length; i++) {
          move(children[i], container, parentAnchor, 2);
        }
      }
    }
    if (isReorder) {
      insert(anchor, container, parentAnchor);
    }
  }
  function hydrateTeleport(node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized, {
    o: { nextSibling, parentNode, querySelector, insert, createText }
  }, hydrateChildren) {
    function hydrateAnchor(target2, targetNode) {
      let targetAnchor = targetNode;
      while (targetAnchor) {
        if (targetAnchor && targetAnchor.nodeType === 8) {
          if (targetAnchor.data === "teleport start anchor") {
            vnode.targetStart = targetAnchor;
          } else if (targetAnchor.data === "teleport anchor") {
            vnode.targetAnchor = targetAnchor;
            target2._lpa = vnode.targetAnchor && nextSibling(vnode.targetAnchor);
            break;
          }
        }
        targetAnchor = nextSibling(targetAnchor);
      }
    }
    function hydrateDisabledTeleport(node2, vnode2) {
      vnode2.anchor = hydrateChildren(nextSibling(node2), vnode2, parentNode(node2), parentComponent, parentSuspense, slotScopeIds, optimized);
    }
    const target = vnode.target = resolveTarget(vnode.props, querySelector);
    const disabled = isTeleportDisabled(vnode.props);
    if (target) {
      const targetNode = target._lpa || target.firstChild;
      if (vnode.shapeFlag & 16) {
        if (disabled) {
          hydrateDisabledTeleport(node, vnode);
          hydrateAnchor(target, targetNode);
          if (!vnode.targetAnchor) {
            prepareAnchor(target, vnode, createText, insert, parentNode(node) === target ? node : null);
          }
        } else {
          vnode.anchor = nextSibling(node);
          hydrateAnchor(target, targetNode);
          if (!vnode.targetAnchor) {
            prepareAnchor(target, vnode, createText, insert);
          }
          hydrateChildren(targetNode && nextSibling(targetNode), vnode, target, parentComponent, parentSuspense, slotScopeIds, optimized);
        }
      }
      updateCssVars(vnode, disabled);
    } else if (disabled) {
      if (vnode.shapeFlag & 16) {
        hydrateDisabledTeleport(node, vnode);
        vnode.targetStart = node;
        vnode.targetAnchor = nextSibling(node);
      }
    }
    return vnode.anchor && nextSibling(vnode.anchor);
  }
  var Teleport = TeleportImpl;
  function updateCssVars(vnode, isDisabled) {
    const ctx = vnode.ctx;
    if (ctx && ctx.ut) {
      let node, anchor;
      if (isDisabled) {
        node = vnode.el;
        anchor = vnode.anchor;
      } else {
        node = vnode.targetStart;
        anchor = vnode.targetAnchor;
      }
      while (node && node !== anchor) {
        if (node.nodeType === 1)
          node.setAttribute("data-v-owner", ctx.uid);
        node = node.nextSibling;
      }
      ctx.ut();
    }
  }
  function prepareAnchor(target, vnode, createText, insert, anchor = null) {
    const targetStart = vnode.targetStart = createText("");
    const targetAnchor = vnode.targetAnchor = createText("");
    targetStart[TeleportEndKey] = targetAnchor;
    if (target) {
      insert(targetStart, target, anchor);
      insert(targetAnchor, target, anchor);
    }
    return targetAnchor;
  }
  var leaveCbKey = /* @__PURE__ */ Symbol("_leaveCb");
  function setTransitionHooks(vnode, hooks) {
    if (vnode.shapeFlag & 6 && vnode.component) {
      vnode.transition = hooks;
      setTransitionHooks(vnode.component.subTree, hooks);
    } else if (vnode.shapeFlag & 128) {
      vnode.ssContent.transition = hooks.clone(vnode.ssContent);
      vnode.ssFallback.transition = hooks.clone(vnode.ssFallback);
    } else {
      vnode.transition = hooks;
    }
  }
  function defineComponent(options, extraOptions) {
    return isFunction(options) ? /* @__PURE__ */ (() => extend({ name: options.name }, extraOptions, { setup: options }))() : options;
  }
  function markAsyncBoundary(instance) {
    instance.ids = [instance.ids[0] + instance.ids[2]++ + "-", 0, 0];
  }
  var knownTemplateRefs = /* @__PURE__ */ new WeakSet;
  function isTemplateRefKey(refs, key) {
    let desc;
    return !!((desc = Object.getOwnPropertyDescriptor(refs, key)) && !desc.configurable);
  }
  var pendingSetRefMap = /* @__PURE__ */ new WeakMap;
  function setRef(rawRef, oldRawRef, parentSuspense, vnode, isUnmount = false) {
    if (isArray(rawRef)) {
      rawRef.forEach((r, i) => setRef(r, oldRawRef && (isArray(oldRawRef) ? oldRawRef[i] : oldRawRef), parentSuspense, vnode, isUnmount));
      return;
    }
    if (isAsyncWrapper(vnode) && !isUnmount) {
      if (vnode.shapeFlag & 512 && vnode.type.__asyncResolved && vnode.component.subTree.component) {
        setRef(rawRef, oldRawRef, parentSuspense, vnode.component.subTree);
      }
      return;
    }
    const refValue = vnode.shapeFlag & 4 ? getComponentPublicInstance(vnode.component) : vnode.el;
    const value = isUnmount ? null : refValue;
    const { i: owner, r: ref2 } = rawRef;
    if (!owner) {
      warn$1(`Missing ref owner context. ref cannot be used on hoisted vnodes. A vnode with ref must be created inside the render function.`);
      return;
    }
    const oldRef = oldRawRef && oldRawRef.r;
    const refs = owner.refs === EMPTY_OBJ ? owner.refs = {} : owner.refs;
    const setupState = owner.setupState;
    const rawSetupState = toRaw(setupState);
    const canSetSetupRef = setupState === EMPTY_OBJ ? NO : (key) => {
      if (true) {
        if (hasOwn(rawSetupState, key) && !isRef2(rawSetupState[key])) {
          warn$1(`Template ref "${key}" used on a non-ref value. It will not work in the production build.`);
        }
        if (knownTemplateRefs.has(rawSetupState[key])) {
          return false;
        }
      }
      if (isTemplateRefKey(refs, key)) {
        return false;
      }
      return hasOwn(rawSetupState, key);
    };
    const canSetRef = (ref22, key) => {
      if (knownTemplateRefs.has(ref22)) {
        return false;
      }
      if (key && isTemplateRefKey(refs, key)) {
        return false;
      }
      return true;
    };
    if (oldRef != null && oldRef !== ref2) {
      invalidatePendingSetRef(oldRawRef);
      if (isString(oldRef)) {
        refs[oldRef] = null;
        if (canSetSetupRef(oldRef)) {
          setupState[oldRef] = null;
        }
      } else if (isRef2(oldRef)) {
        const oldRawRefAtom = oldRawRef;
        if (canSetRef(oldRef, oldRawRefAtom.k)) {
          oldRef.value = null;
        }
        if (oldRawRefAtom.k)
          refs[oldRawRefAtom.k] = null;
      }
    }
    if (isFunction(ref2)) {
      callWithErrorHandling(ref2, owner, 12, [value, refs]);
    } else {
      const _isString = isString(ref2);
      const _isRef = isRef2(ref2);
      if (_isString || _isRef) {
        const doSet = () => {
          if (rawRef.f) {
            const existing = _isString ? canSetSetupRef(ref2) ? setupState[ref2] : refs[ref2] : canSetRef(ref2) || !rawRef.k ? ref2.value : refs[rawRef.k];
            if (isUnmount) {
              isArray(existing) && remove(existing, refValue);
            } else {
              if (!isArray(existing)) {
                if (_isString) {
                  refs[ref2] = [refValue];
                  if (canSetSetupRef(ref2)) {
                    setupState[ref2] = refs[ref2];
                  }
                } else {
                  const newVal = [refValue];
                  if (canSetRef(ref2, rawRef.k)) {
                    ref2.value = newVal;
                  }
                  if (rawRef.k)
                    refs[rawRef.k] = newVal;
                }
              } else if (!existing.includes(refValue)) {
                existing.push(refValue);
              }
            }
          } else if (_isString) {
            refs[ref2] = value;
            if (canSetSetupRef(ref2)) {
              setupState[ref2] = value;
            }
          } else if (_isRef) {
            if (canSetRef(ref2, rawRef.k)) {
              ref2.value = value;
            }
            if (rawRef.k)
              refs[rawRef.k] = value;
          } else if (true) {
            warn$1("Invalid template ref type:", ref2, `(${typeof ref2})`);
          }
        };
        if (value) {
          const job = () => {
            doSet();
            pendingSetRefMap.delete(rawRef);
          };
          job.id = -1;
          pendingSetRefMap.set(rawRef, job);
          queuePostRenderEffect(job, parentSuspense);
        } else {
          invalidatePendingSetRef(rawRef);
          doSet();
        }
      } else if (true) {
        warn$1("Invalid template ref type:", ref2, `(${typeof ref2})`);
      }
    }
  }
  function invalidatePendingSetRef(rawRef) {
    const pendingSetRef = pendingSetRefMap.get(rawRef);
    if (pendingSetRef) {
      pendingSetRef.flags |= 8;
      pendingSetRefMap.delete(rawRef);
    }
  }
  var requestIdleCallback = getGlobalThis().requestIdleCallback || ((cb) => setTimeout(cb, 1));
  var cancelIdleCallback = getGlobalThis().cancelIdleCallback || ((id) => clearTimeout(id));
  var isAsyncWrapper = (i) => !!i.type.__asyncLoader;
  var isKeepAlive = (vnode) => vnode.type.__isKeepAlive;
  function onActivated(hook, target) {
    registerKeepAliveHook(hook, "a", target);
  }
  function onDeactivated(hook, target) {
    registerKeepAliveHook(hook, "da", target);
  }
  function registerKeepAliveHook(hook, type, target = currentInstance) {
    const wrappedHook = hook.__wdc || (hook.__wdc = () => {
      let current = target;
      while (current) {
        if (current.isDeactivated) {
          return;
        }
        current = current.parent;
      }
      return hook();
    });
    injectHook(type, wrappedHook, target);
    if (target) {
      let current = target.parent;
      while (current && current.parent) {
        if (isKeepAlive(current.parent.vnode)) {
          injectToKeepAliveRoot(wrappedHook, type, target, current);
        }
        current = current.parent;
      }
    }
  }
  function injectToKeepAliveRoot(hook, type, target, keepAliveRoot) {
    const injected = injectHook(type, hook, keepAliveRoot, true);
    onUnmounted(() => {
      remove(keepAliveRoot[type], injected);
    }, target);
  }
  function injectHook(type, hook, target = currentInstance, prepend = false) {
    if (target) {
      const hooks = target[type] || (target[type] = []);
      const wrappedHook = hook.__weh || (hook.__weh = (...args) => {
        pauseTracking();
        const reset = setCurrentInstance(target);
        const res = callWithAsyncErrorHandling(hook, target, type, args);
        reset();
        resetTracking();
        return res;
      });
      if (prepend) {
        hooks.unshift(wrappedHook);
      } else {
        hooks.push(wrappedHook);
      }
      return wrappedHook;
    } else if (true) {
      const apiName = toHandlerKey(ErrorTypeStrings$1[type].replace(/ hook$/, ""));
      warn$1(`${apiName} is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup().` + ` If you are using async setup(), make sure to register lifecycle hooks before the first await statement.`);
    }
  }
  var createHook = (lifecycle) => (hook, target = currentInstance) => {
    if (!isInSSRComponentSetup || lifecycle === "sp") {
      injectHook(lifecycle, (...args) => hook(...args), target);
    }
  };
  var onBeforeMount = createHook("bm");
  var onMounted = createHook("m");
  var onBeforeUpdate = createHook("bu");
  var onUpdated = createHook("u");
  var onBeforeUnmount = createHook("bum");
  var onUnmounted = createHook("um");
  var onServerPrefetch = createHook("sp");
  var onRenderTriggered = createHook("rtg");
  var onRenderTracked = createHook("rtc");
  function onErrorCaptured(hook, target = currentInstance) {
    injectHook("ec", hook, target);
  }
  var NULL_DYNAMIC_COMPONENT = /* @__PURE__ */ Symbol.for("v-ndc");
  function renderList(source, renderItem, cache, index) {
    let ret;
    const cached = cache && cache[index];
    const sourceIsArray = isArray(source);
    if (sourceIsArray || isString(source)) {
      const sourceIsReactiveArray = sourceIsArray && isReactive(source);
      let needsWrap = false;
      let isReadonlySource = false;
      if (sourceIsReactiveArray) {
        needsWrap = !isShallow(source);
        isReadonlySource = isReadonly(source);
        source = shallowReadArray(source);
      }
      ret = new Array(source.length);
      for (let i = 0, l = source.length;i < l; i++) {
        ret[i] = renderItem(needsWrap ? isReadonlySource ? toReadonly(toReactive(source[i])) : toReactive(source[i]) : source[i], i, undefined, cached && cached[i]);
      }
    } else if (typeof source === "number") {
      if (!Number.isInteger(source) || source < 0) {
        warn$1(`The v-for range expects a positive integer value but got ${source}.`);
        ret = [];
      } else {
        ret = new Array(source);
        for (let i = 0;i < source; i++) {
          ret[i] = renderItem(i + 1, i, undefined, cached && cached[i]);
        }
      }
    } else if (isObject(source)) {
      if (source[Symbol.iterator]) {
        ret = Array.from(source, (item, i) => renderItem(item, i, undefined, cached && cached[i]));
      } else {
        const keys = Object.keys(source);
        ret = new Array(keys.length);
        for (let i = 0, l = keys.length;i < l; i++) {
          const key = keys[i];
          ret[i] = renderItem(source[key], key, i, cached && cached[i]);
        }
      }
    } else {
      ret = [];
    }
    if (cache) {
      cache[index] = ret;
    }
    return ret;
  }
  var getPublicInstance = (i) => {
    if (!i)
      return null;
    if (isStatefulComponent(i))
      return getComponentPublicInstance(i);
    return getPublicInstance(i.parent);
  };
  var publicPropertiesMap = /* @__PURE__ */ extend(/* @__PURE__ */ Object.create(null), {
    $: (i) => i,
    $el: (i) => i.vnode.el,
    $data: (i) => i.data,
    $props: (i) => shallowReadonly(i.props),
    $attrs: (i) => shallowReadonly(i.attrs),
    $slots: (i) => shallowReadonly(i.slots),
    $refs: (i) => shallowReadonly(i.refs),
    $parent: (i) => getPublicInstance(i.parent),
    $root: (i) => getPublicInstance(i.root),
    $host: (i) => i.ce,
    $emit: (i) => i.emit,
    $options: (i) => resolveMergedOptions(i),
    $forceUpdate: (i) => i.f || (i.f = () => {
      queueJob(i.update);
    }),
    $nextTick: (i) => i.n || (i.n = nextTick.bind(i.proxy)),
    $watch: (i) => instanceWatch.bind(i)
  });
  var isReservedPrefix = (key) => key === "_" || key === "$";
  var hasSetupBinding = (state, key) => state !== EMPTY_OBJ && !state.__isScriptSetup && hasOwn(state, key);
  var PublicInstanceProxyHandlers = {
    get({ _: instance }, key) {
      if (key === "__v_skip") {
        return true;
      }
      const { ctx, setupState, data, props, accessCache, type, appContext } = instance;
      if (key === "__isVue") {
        return true;
      }
      if (key[0] !== "$") {
        const n = accessCache[key];
        if (n !== undefined) {
          switch (n) {
            case 1:
              return setupState[key];
            case 2:
              return data[key];
            case 4:
              return ctx[key];
            case 3:
              return props[key];
          }
        } else if (hasSetupBinding(setupState, key)) {
          accessCache[key] = 1;
          return setupState[key];
        } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
          accessCache[key] = 2;
          return data[key];
        } else if (hasOwn(props, key)) {
          accessCache[key] = 3;
          return props[key];
        } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
          accessCache[key] = 4;
          return ctx[key];
        } else if (shouldCacheAccess) {
          accessCache[key] = 0;
        }
      }
      const publicGetter = publicPropertiesMap[key];
      let cssModule, globalProperties;
      if (publicGetter) {
        if (key === "$attrs") {
          track(instance.attrs, "get", "");
          markAttrsAccessed();
        } else if (key === "$slots") {
          track(instance, "get", key);
        }
        return publicGetter(instance);
      } else if ((cssModule = type.__cssModules) && (cssModule = cssModule[key])) {
        return cssModule;
      } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
        accessCache[key] = 4;
        return ctx[key];
      } else if (globalProperties = appContext.config.globalProperties, hasOwn(globalProperties, key)) {
        {
          return globalProperties[key];
        }
      } else if (currentRenderingInstance && (!isString(key) || key.indexOf("__v") !== 0)) {
        if (data !== EMPTY_OBJ && isReservedPrefix(key[0]) && hasOwn(data, key)) {
          warn$1(`Property ${JSON.stringify(key)} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`);
        } else if (instance === currentRenderingInstance) {
          warn$1(`Property ${JSON.stringify(key)} was accessed during render but is not defined on instance.`);
        }
      }
    },
    set({ _: instance }, key, value) {
      const { data, setupState, ctx } = instance;
      if (hasSetupBinding(setupState, key)) {
        setupState[key] = value;
        return true;
      } else if (setupState.__isScriptSetup && hasOwn(setupState, key)) {
        warn$1(`Cannot mutate <script setup> binding "${key}" from Options API.`);
        return false;
      } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
        data[key] = value;
        return true;
      } else if (hasOwn(instance.props, key)) {
        warn$1(`Attempting to mutate prop "${key}". Props are readonly.`);
        return false;
      }
      if (key[0] === "$" && key.slice(1) in instance) {
        warn$1(`Attempting to mutate public property "${key}". Properties starting with $ are reserved and readonly.`);
        return false;
      } else {
        if (key in instance.appContext.config.globalProperties) {
          Object.defineProperty(ctx, key, {
            enumerable: true,
            configurable: true,
            value
          });
        } else {
          ctx[key] = value;
        }
      }
      return true;
    },
    has({
      _: { data, setupState, accessCache, ctx, appContext, props, type }
    }, key) {
      let cssModules;
      return !!(accessCache[key] || data !== EMPTY_OBJ && key[0] !== "$" && hasOwn(data, key) || hasSetupBinding(setupState, key) || hasOwn(props, key) || hasOwn(ctx, key) || hasOwn(publicPropertiesMap, key) || hasOwn(appContext.config.globalProperties, key) || (cssModules = type.__cssModules) && cssModules[key]);
    },
    defineProperty(target, key, descriptor) {
      if (descriptor.get != null) {
        target._.accessCache[key] = 0;
      } else if (hasOwn(descriptor, "value")) {
        this.set(target, key, descriptor.value, null);
      }
      return Reflect.defineProperty(target, key, descriptor);
    }
  };
  if (true) {
    PublicInstanceProxyHandlers.ownKeys = (target) => {
      warn$1(`Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead.`);
      return Reflect.ownKeys(target);
    };
  }
  function createDevRenderContext(instance) {
    const target = {};
    Object.defineProperty(target, `_`, {
      configurable: true,
      enumerable: false,
      get: () => instance
    });
    Object.keys(publicPropertiesMap).forEach((key) => {
      Object.defineProperty(target, key, {
        configurable: true,
        enumerable: false,
        get: () => publicPropertiesMap[key](instance),
        set: NOOP
      });
    });
    return target;
  }
  function exposePropsOnRenderContext(instance) {
    const {
      ctx,
      propsOptions: [propsOptions]
    } = instance;
    if (propsOptions) {
      Object.keys(propsOptions).forEach((key) => {
        Object.defineProperty(ctx, key, {
          enumerable: true,
          configurable: true,
          get: () => instance.props[key],
          set: NOOP
        });
      });
    }
  }
  function exposeSetupStateOnRenderContext(instance) {
    const { ctx, setupState } = instance;
    Object.keys(toRaw(setupState)).forEach((key) => {
      if (!setupState.__isScriptSetup) {
        if (isReservedPrefix(key[0])) {
          warn$1(`setup() return property ${JSON.stringify(key)} should not start with "$" or "_" which are reserved prefixes for Vue internals.`);
          return;
        }
        Object.defineProperty(ctx, key, {
          enumerable: true,
          configurable: true,
          get: () => setupState[key],
          set: NOOP
        });
      }
    });
  }
  function normalizePropsOrEmits(props) {
    return isArray(props) ? props.reduce((normalized, p) => (normalized[p] = null, normalized), {}) : props;
  }
  function createDuplicateChecker() {
    const cache = /* @__PURE__ */ Object.create(null);
    return (type, key) => {
      if (cache[key]) {
        warn$1(`${type} property "${key}" is already defined in ${cache[key]}.`);
      } else {
        cache[key] = type;
      }
    };
  }
  var shouldCacheAccess = true;
  function applyOptions(instance) {
    const options = resolveMergedOptions(instance);
    const publicThis = instance.proxy;
    const ctx = instance.ctx;
    shouldCacheAccess = false;
    if (options.beforeCreate) {
      callHook(options.beforeCreate, instance, "bc");
    }
    const {
      data: dataOptions,
      computed: computedOptions,
      methods,
      watch: watchOptions,
      provide: provideOptions,
      inject: injectOptions,
      created,
      beforeMount,
      mounted,
      beforeUpdate,
      updated,
      activated,
      deactivated,
      beforeDestroy,
      beforeUnmount,
      destroyed,
      unmounted,
      render,
      renderTracked,
      renderTriggered,
      errorCaptured,
      serverPrefetch,
      expose,
      inheritAttrs,
      components,
      directives,
      filters
    } = options;
    const checkDuplicateProperties = createDuplicateChecker();
    if (true) {
      const [propsOptions] = instance.propsOptions;
      if (propsOptions) {
        for (const key in propsOptions) {
          checkDuplicateProperties("Props", key);
        }
      }
    }
    if (injectOptions) {
      resolveInjections(injectOptions, ctx, checkDuplicateProperties);
    }
    if (methods) {
      for (const key in methods) {
        const methodHandler = methods[key];
        if (isFunction(methodHandler)) {
          if (true) {
            Object.defineProperty(ctx, key, {
              value: methodHandler.bind(publicThis),
              configurable: true,
              enumerable: true,
              writable: true
            });
          } else {}
          if (true) {
            checkDuplicateProperties("Methods", key);
          }
        } else if (true) {
          warn$1(`Method "${key}" has type "${typeof methodHandler}" in the component definition. Did you reference the function correctly?`);
        }
      }
    }
    if (dataOptions) {
      if (!isFunction(dataOptions)) {
        warn$1(`The data option must be a function. Plain object usage is no longer supported.`);
      }
      const data = dataOptions.call(publicThis, publicThis);
      if (isPromise(data)) {
        warn$1(`data() returned a Promise - note data() cannot be async; If you intend to perform data fetching before component renders, use async setup() + <Suspense>.`);
      }
      if (!isObject(data)) {
        warn$1(`data() should return an object.`);
      } else {
        instance.data = reactive(data);
        if (true) {
          for (const key in data) {
            checkDuplicateProperties("Data", key);
            if (!isReservedPrefix(key[0])) {
              Object.defineProperty(ctx, key, {
                configurable: true,
                enumerable: true,
                get: () => data[key],
                set: NOOP
              });
            }
          }
        }
      }
    }
    shouldCacheAccess = true;
    if (computedOptions) {
      for (const key in computedOptions) {
        const opt = computedOptions[key];
        const get = isFunction(opt) ? opt.bind(publicThis, publicThis) : isFunction(opt.get) ? opt.get.bind(publicThis, publicThis) : NOOP;
        if (get === NOOP) {
          warn$1(`Computed property "${key}" has no getter.`);
        }
        const set = !isFunction(opt) && isFunction(opt.set) ? opt.set.bind(publicThis) : () => {
          warn$1(`Write operation failed: computed property "${key}" is readonly.`);
        };
        const c = computed2({
          get,
          set
        });
        Object.defineProperty(ctx, key, {
          enumerable: true,
          configurable: true,
          get: () => c.value,
          set: (v) => c.value = v
        });
        if (true) {
          checkDuplicateProperties("Computed", key);
        }
      }
    }
    if (watchOptions) {
      for (const key in watchOptions) {
        createWatcher(watchOptions[key], ctx, publicThis, key);
      }
    }
    if (provideOptions) {
      const provides = isFunction(provideOptions) ? provideOptions.call(publicThis) : provideOptions;
      Reflect.ownKeys(provides).forEach((key) => {
        provide(key, provides[key]);
      });
    }
    if (created) {
      callHook(created, instance, "c");
    }
    function registerLifecycleHook(register, hook) {
      if (isArray(hook)) {
        hook.forEach((_hook) => register(_hook.bind(publicThis)));
      } else if (hook) {
        register(hook.bind(publicThis));
      }
    }
    registerLifecycleHook(onBeforeMount, beforeMount);
    registerLifecycleHook(onMounted, mounted);
    registerLifecycleHook(onBeforeUpdate, beforeUpdate);
    registerLifecycleHook(onUpdated, updated);
    registerLifecycleHook(onActivated, activated);
    registerLifecycleHook(onDeactivated, deactivated);
    registerLifecycleHook(onErrorCaptured, errorCaptured);
    registerLifecycleHook(onRenderTracked, renderTracked);
    registerLifecycleHook(onRenderTriggered, renderTriggered);
    registerLifecycleHook(onBeforeUnmount, beforeUnmount);
    registerLifecycleHook(onUnmounted, unmounted);
    registerLifecycleHook(onServerPrefetch, serverPrefetch);
    if (isArray(expose)) {
      if (expose.length) {
        const exposed = instance.exposed || (instance.exposed = {});
        expose.forEach((key) => {
          Object.defineProperty(exposed, key, {
            get: () => publicThis[key],
            set: (val) => publicThis[key] = val,
            enumerable: true
          });
        });
      } else if (!instance.exposed) {
        instance.exposed = {};
      }
    }
    if (render && instance.render === NOOP) {
      instance.render = render;
    }
    if (inheritAttrs != null) {
      instance.inheritAttrs = inheritAttrs;
    }
    if (components)
      instance.components = components;
    if (directives)
      instance.directives = directives;
    if (serverPrefetch) {
      markAsyncBoundary(instance);
    }
  }
  function resolveInjections(injectOptions, ctx, checkDuplicateProperties = NOOP) {
    if (isArray(injectOptions)) {
      injectOptions = normalizeInject(injectOptions);
    }
    for (const key in injectOptions) {
      const opt = injectOptions[key];
      let injected;
      if (isObject(opt)) {
        if ("default" in opt) {
          injected = inject(opt.from || key, opt.default, true);
        } else {
          injected = inject(opt.from || key);
        }
      } else {
        injected = inject(opt);
      }
      if (isRef2(injected)) {
        Object.defineProperty(ctx, key, {
          enumerable: true,
          configurable: true,
          get: () => injected.value,
          set: (v) => injected.value = v
        });
      } else {
        ctx[key] = injected;
      }
      if (true) {
        checkDuplicateProperties("Inject", key);
      }
    }
  }
  function callHook(hook, instance, type) {
    callWithAsyncErrorHandling(isArray(hook) ? hook.map((h) => h.bind(instance.proxy)) : hook.bind(instance.proxy), instance, type);
  }
  function createWatcher(raw, ctx, publicThis, key) {
    let getter = key.includes(".") ? createPathGetter(publicThis, key) : () => publicThis[key];
    if (isString(raw)) {
      const handler = ctx[raw];
      if (isFunction(handler)) {
        {
          watch2(getter, handler);
        }
      } else if (true) {
        warn$1(`Invalid watch handler specified by key "${raw}"`, handler);
      }
    } else if (isFunction(raw)) {
      {
        watch2(getter, raw.bind(publicThis));
      }
    } else if (isObject(raw)) {
      if (isArray(raw)) {
        raw.forEach((r) => createWatcher(r, ctx, publicThis, key));
      } else {
        const handler = isFunction(raw.handler) ? raw.handler.bind(publicThis) : ctx[raw.handler];
        if (isFunction(handler)) {
          watch2(getter, handler, raw);
        } else if (true) {
          warn$1(`Invalid watch handler specified by key "${raw.handler}"`, handler);
        }
      }
    } else if (true) {
      warn$1(`Invalid watch option: "${key}"`, raw);
    }
  }
  function resolveMergedOptions(instance) {
    const base = instance.type;
    const { mixins, extends: extendsOptions } = base;
    const {
      mixins: globalMixins,
      optionsCache: cache,
      config: { optionMergeStrategies }
    } = instance.appContext;
    const cached = cache.get(base);
    let resolved;
    if (cached) {
      resolved = cached;
    } else if (!globalMixins.length && !mixins && !extendsOptions) {
      {
        resolved = base;
      }
    } else {
      resolved = {};
      if (globalMixins.length) {
        globalMixins.forEach((m) => mergeOptions(resolved, m, optionMergeStrategies, true));
      }
      mergeOptions(resolved, base, optionMergeStrategies);
    }
    if (isObject(base)) {
      cache.set(base, resolved);
    }
    return resolved;
  }
  function mergeOptions(to, from, strats, asMixin = false) {
    const { mixins, extends: extendsOptions } = from;
    if (extendsOptions) {
      mergeOptions(to, extendsOptions, strats, true);
    }
    if (mixins) {
      mixins.forEach((m) => mergeOptions(to, m, strats, true));
    }
    for (const key in from) {
      if (asMixin && key === "expose") {
        warn$1(`"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.`);
      } else {
        const strat = internalOptionMergeStrats[key] || strats && strats[key];
        to[key] = strat ? strat(to[key], from[key]) : from[key];
      }
    }
    return to;
  }
  var internalOptionMergeStrats = {
    data: mergeDataFn,
    props: mergeEmitsOrPropsOptions,
    emits: mergeEmitsOrPropsOptions,
    methods: mergeObjectOptions,
    computed: mergeObjectOptions,
    beforeCreate: mergeAsArray,
    created: mergeAsArray,
    beforeMount: mergeAsArray,
    mounted: mergeAsArray,
    beforeUpdate: mergeAsArray,
    updated: mergeAsArray,
    beforeDestroy: mergeAsArray,
    beforeUnmount: mergeAsArray,
    destroyed: mergeAsArray,
    unmounted: mergeAsArray,
    activated: mergeAsArray,
    deactivated: mergeAsArray,
    errorCaptured: mergeAsArray,
    serverPrefetch: mergeAsArray,
    components: mergeObjectOptions,
    directives: mergeObjectOptions,
    watch: mergeWatchOptions,
    provide: mergeDataFn,
    inject: mergeInject
  };
  function mergeDataFn(to, from) {
    if (!from) {
      return to;
    }
    if (!to) {
      return from;
    }
    return function mergedDataFn() {
      return extend(isFunction(to) ? to.call(this, this) : to, isFunction(from) ? from.call(this, this) : from);
    };
  }
  function mergeInject(to, from) {
    return mergeObjectOptions(normalizeInject(to), normalizeInject(from));
  }
  function normalizeInject(raw) {
    if (isArray(raw)) {
      const res = {};
      for (let i = 0;i < raw.length; i++) {
        res[raw[i]] = raw[i];
      }
      return res;
    }
    return raw;
  }
  function mergeAsArray(to, from) {
    return to ? [...new Set([].concat(to, from))] : from;
  }
  function mergeObjectOptions(to, from) {
    return to ? extend(/* @__PURE__ */ Object.create(null), to, from) : from;
  }
  function mergeEmitsOrPropsOptions(to, from) {
    if (to) {
      if (isArray(to) && isArray(from)) {
        return [.../* @__PURE__ */ new Set([...to, ...from])];
      }
      return extend(/* @__PURE__ */ Object.create(null), normalizePropsOrEmits(to), normalizePropsOrEmits(from != null ? from : {}));
    } else {
      return from;
    }
  }
  function mergeWatchOptions(to, from) {
    if (!to)
      return from;
    if (!from)
      return to;
    const merged = extend(/* @__PURE__ */ Object.create(null), to);
    for (const key in from) {
      merged[key] = mergeAsArray(to[key], from[key]);
    }
    return merged;
  }
  function createAppContext() {
    return {
      app: null,
      config: {
        isNativeTag: NO,
        performance: false,
        globalProperties: {},
        optionMergeStrategies: {},
        errorHandler: undefined,
        warnHandler: undefined,
        compilerOptions: {}
      },
      mixins: [],
      components: {},
      directives: {},
      provides: /* @__PURE__ */ Object.create(null),
      optionsCache: /* @__PURE__ */ new WeakMap,
      propsCache: /* @__PURE__ */ new WeakMap,
      emitsCache: /* @__PURE__ */ new WeakMap
    };
  }
  var uid$1 = 0;
  function createAppAPI(render, hydrate) {
    return function createApp(rootComponent, rootProps = null) {
      if (!isFunction(rootComponent)) {
        rootComponent = extend({}, rootComponent);
      }
      if (rootProps != null && !isObject(rootProps)) {
        warn$1(`root props passed to app.mount() must be an object.`);
        rootProps = null;
      }
      const context = createAppContext();
      const installedPlugins = /* @__PURE__ */ new WeakSet;
      const pluginCleanupFns = [];
      let isMounted = false;
      const app = context.app = {
        _uid: uid$1++,
        _component: rootComponent,
        _props: rootProps,
        _container: null,
        _context: context,
        _instance: null,
        version,
        get config() {
          return context.config;
        },
        set config(v) {
          if (true) {
            warn$1(`app.config cannot be replaced. Modify individual options instead.`);
          }
        },
        use(plugin, ...options) {
          if (installedPlugins.has(plugin)) {
            warn$1(`Plugin has already been applied to target app.`);
          } else if (plugin && isFunction(plugin.install)) {
            installedPlugins.add(plugin);
            plugin.install(app, ...options);
          } else if (isFunction(plugin)) {
            installedPlugins.add(plugin);
            plugin(app, ...options);
          } else if (true) {
            warn$1(`A plugin must either be a function or an object with an "install" function.`);
          }
          return app;
        },
        mixin(mixin) {
          if (true) {
            if (!context.mixins.includes(mixin)) {
              context.mixins.push(mixin);
            } else if (true) {
              warn$1("Mixin has already been applied to target app" + (mixin.name ? `: ${mixin.name}` : ""));
            }
          } else
            ;
          return app;
        },
        component(name, component) {
          if (true) {
            validateComponentName(name, context.config);
          }
          if (!component) {
            return context.components[name];
          }
          if (context.components[name]) {
            warn$1(`Component "${name}" has already been registered in target app.`);
          }
          context.components[name] = component;
          return app;
        },
        directive(name, directive) {
          if (true) {
            validateDirectiveName(name);
          }
          if (!directive) {
            return context.directives[name];
          }
          if (context.directives[name]) {
            warn$1(`Directive "${name}" has already been registered in target app.`);
          }
          context.directives[name] = directive;
          return app;
        },
        mount(rootContainer, isHydrate, namespace) {
          if (!isMounted) {
            if (rootContainer.__vue_app__) {
              warn$1(`There is already an app instance mounted on the host container.
 If you want to mount another app on the same host container, you need to unmount the previous app by calling \`app.unmount()\` first.`);
            }
            const vnode = app._ceVNode || createVNode(rootComponent, rootProps);
            vnode.appContext = context;
            if (namespace === true) {
              namespace = "svg";
            } else if (namespace === false) {
              namespace = undefined;
            }
            if (true) {
              context.reload = () => {
                const cloned = cloneVNode(vnode);
                cloned.el = null;
                render(cloned, rootContainer, namespace);
              };
            }
            if (isHydrate && hydrate) {
              hydrate(vnode, rootContainer);
            } else {
              render(vnode, rootContainer, namespace);
            }
            isMounted = true;
            app._container = rootContainer;
            rootContainer.__vue_app__ = app;
            if (true) {
              app._instance = vnode.component;
              devtoolsInitApp(app, version);
            }
            return getComponentPublicInstance(vnode.component);
          } else if (true) {
            warn$1(`App has already been mounted.
If you want to remount the same app, move your app creation logic into a factory function and create fresh app instances for each mount - e.g. \`const createMyApp = () => createApp(App)\``);
          }
        },
        onUnmount(cleanupFn) {
          if (typeof cleanupFn !== "function") {
            warn$1(`Expected function as first argument to app.onUnmount(), but got ${typeof cleanupFn}`);
          }
          pluginCleanupFns.push(cleanupFn);
        },
        unmount() {
          if (isMounted) {
            callWithAsyncErrorHandling(pluginCleanupFns, app._instance, 16);
            render(null, app._container);
            if (true) {
              app._instance = null;
              devtoolsUnmountApp(app);
            }
            delete app._container.__vue_app__;
          } else if (true) {
            warn$1(`Cannot unmount an app that is not mounted.`);
          }
        },
        provide(key, value) {
          if (key in context.provides) {
            if (hasOwn(context.provides, key)) {
              warn$1(`App already provides property with key "${String(key)}". It will be overwritten with the new value.`);
            } else {
              warn$1(`App already provides property with key "${String(key)}" inherited from its parent element. It will be overwritten with the new value.`);
            }
          }
          context.provides[key] = value;
          return app;
        },
        runWithContext(fn) {
          const lastApp = currentApp;
          currentApp = app;
          try {
            return fn();
          } finally {
            currentApp = lastApp;
          }
        }
      };
      return app;
    };
  }
  var currentApp = null;
  var getModelModifiers = (props, modelName) => {
    return modelName === "modelValue" || modelName === "model-value" ? props.modelModifiers : props[`${modelName}Modifiers`] || props[`${camelize(modelName)}Modifiers`] || props[`${hyphenate(modelName)}Modifiers`];
  };
  function emit(instance, event, ...rawArgs) {
    if (instance.isUnmounted)
      return;
    const props = instance.vnode.props || EMPTY_OBJ;
    if (true) {
      const {
        emitsOptions,
        propsOptions: [propsOptions]
      } = instance;
      if (emitsOptions) {
        if (!(event in emitsOptions) && true) {
          if (!propsOptions || !(toHandlerKey(camelize(event)) in propsOptions)) {
            warn$1(`Component emitted event "${event}" but it is neither declared in the emits option nor as an "${toHandlerKey(camelize(event))}" prop.`);
          }
        } else {
          const validator = emitsOptions[event];
          if (isFunction(validator)) {
            const isValid = validator(...rawArgs);
            if (!isValid) {
              warn$1(`Invalid event arguments: event validation failed for event "${event}".`);
            }
          }
        }
      }
    }
    let args = rawArgs;
    const isModelListener2 = event.startsWith("update:");
    const modifiers = isModelListener2 && getModelModifiers(props, event.slice(7));
    if (modifiers) {
      if (modifiers.trim) {
        args = rawArgs.map((a) => isString(a) ? a.trim() : a);
      }
      if (modifiers.number) {
        args = rawArgs.map(looseToNumber);
      }
    }
    if (true) {
      devtoolsComponentEmit(instance, event, args);
    }
    if (true) {
      const lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && props[toHandlerKey(lowerCaseEvent)]) {
        warn$1(`Event "${lowerCaseEvent}" is emitted in component ${formatComponentName(instance, instance.type)} but the handler is registered for "${event}". Note that HTML attributes are case-insensitive and you cannot use v-on to listen to camelCase events when using in-DOM templates. You should probably use "${hyphenate(event)}" instead of "${event}".`);
      }
    }
    let handlerName;
    let handler = props[handlerName = toHandlerKey(event)] || props[handlerName = toHandlerKey(camelize(event))];
    if (!handler && isModelListener2) {
      handler = props[handlerName = toHandlerKey(hyphenate(event))];
    }
    if (handler) {
      callWithAsyncErrorHandling(handler, instance, 6, args);
    }
    const onceHandler = props[handlerName + `Once`];
    if (onceHandler) {
      if (!instance.emitted) {
        instance.emitted = {};
      } else if (instance.emitted[handlerName]) {
        return;
      }
      instance.emitted[handlerName] = true;
      callWithAsyncErrorHandling(onceHandler, instance, 6, args);
    }
  }
  var mixinEmitsCache = /* @__PURE__ */ new WeakMap;
  function normalizeEmitsOptions(comp, appContext, asMixin = false) {
    const cache = asMixin ? mixinEmitsCache : appContext.emitsCache;
    const cached = cache.get(comp);
    if (cached !== undefined) {
      return cached;
    }
    const raw = comp.emits;
    let normalized = {};
    let hasExtends = false;
    if (!isFunction(comp)) {
      const extendEmits = (raw2) => {
        const normalizedFromExtend = normalizeEmitsOptions(raw2, appContext, true);
        if (normalizedFromExtend) {
          hasExtends = true;
          extend(normalized, normalizedFromExtend);
        }
      };
      if (!asMixin && appContext.mixins.length) {
        appContext.mixins.forEach(extendEmits);
      }
      if (comp.extends) {
        extendEmits(comp.extends);
      }
      if (comp.mixins) {
        comp.mixins.forEach(extendEmits);
      }
    }
    if (!raw && !hasExtends) {
      if (isObject(comp)) {
        cache.set(comp, null);
      }
      return null;
    }
    if (isArray(raw)) {
      raw.forEach((key) => normalized[key] = null);
    } else {
      extend(normalized, raw);
    }
    if (isObject(comp)) {
      cache.set(comp, normalized);
    }
    return normalized;
  }
  function isEmitListener(options, key) {
    if (!options || !isOn(key)) {
      return false;
    }
    key = key.slice(2).replace(/Once$/, "");
    return hasOwn(options, key[0].toLowerCase() + key.slice(1)) || hasOwn(options, hyphenate(key)) || hasOwn(options, key);
  }
  var accessedAttrs = false;
  function markAttrsAccessed() {
    accessedAttrs = true;
  }
  function renderComponentRoot(instance) {
    const {
      type: Component,
      vnode,
      proxy,
      withProxy,
      propsOptions: [propsOptions],
      slots,
      attrs,
      emit: emit2,
      render,
      renderCache,
      props,
      data,
      setupState,
      ctx,
      inheritAttrs
    } = instance;
    const prev = setCurrentRenderingInstance(instance);
    let result;
    let fallthroughAttrs;
    if (true) {
      accessedAttrs = false;
    }
    try {
      if (vnode.shapeFlag & 4) {
        const proxyToUse = withProxy || proxy;
        const thisProxy = setupState.__isScriptSetup ? new Proxy(proxyToUse, {
          get(target, key, receiver) {
            warn$1(`Property '${String(key)}' was accessed via 'this'. Avoid using 'this' in templates.`);
            return Reflect.get(target, key, receiver);
          }
        }) : proxyToUse;
        result = normalizeVNode(render.call(thisProxy, proxyToUse, renderCache, shallowReadonly(props), setupState, data, ctx));
        fallthroughAttrs = attrs;
      } else {
        const render2 = Component;
        if (attrs === props) {
          markAttrsAccessed();
        }
        result = normalizeVNode(render2.length > 1 ? render2(shallowReadonly(props), {
          get attrs() {
            markAttrsAccessed();
            return shallowReadonly(attrs);
          },
          slots,
          emit: emit2
        }) : render2(shallowReadonly(props), null));
        fallthroughAttrs = Component.props ? attrs : getFunctionalFallthrough(attrs);
      }
    } catch (err) {
      blockStack.length = 0;
      handleError(err, instance, 1);
      result = createVNode(Comment);
    }
    let root = result;
    let setRoot = undefined;
    if (result.patchFlag > 0 && result.patchFlag & 2048) {
      [root, setRoot] = getChildRoot(result);
    }
    if (fallthroughAttrs && inheritAttrs !== false) {
      const keys = Object.keys(fallthroughAttrs);
      const { shapeFlag } = root;
      if (keys.length) {
        if (shapeFlag & (1 | 6)) {
          if (propsOptions && keys.some(isModelListener)) {
            fallthroughAttrs = filterModelListeners(fallthroughAttrs, propsOptions);
          }
          root = cloneVNode(root, fallthroughAttrs, false, true);
        } else if (!accessedAttrs && root.type !== Comment) {
          const allAttrs = Object.keys(attrs);
          const eventAttrs = [];
          const extraAttrs = [];
          for (let i = 0, l = allAttrs.length;i < l; i++) {
            const key = allAttrs[i];
            if (isOn(key)) {
              if (!isModelListener(key)) {
                eventAttrs.push(key[2].toLowerCase() + key.slice(3));
              }
            } else {
              extraAttrs.push(key);
            }
          }
          if (extraAttrs.length) {
            warn$1(`Extraneous non-props attributes (${extraAttrs.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text or teleport root nodes.`);
          }
          if (eventAttrs.length) {
            warn$1(`Extraneous non-emits event listeners (${eventAttrs.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text root nodes. If the listener is intended to be a component custom event listener only, declare it using the "emits" option.`);
          }
        }
      }
    }
    if (vnode.dirs) {
      if (!isElementRoot(root)) {
        warn$1(`Runtime directive used on component with non-element root node. The directives will not function as intended.`);
      }
      root = cloneVNode(root, null, false, true);
      root.dirs = root.dirs ? root.dirs.concat(vnode.dirs) : vnode.dirs;
    }
    if (vnode.transition) {
      if (!isElementRoot(root)) {
        warn$1(`Component inside <Transition> renders non-element root node that cannot be animated.`);
      }
      setTransitionHooks(root, vnode.transition);
    }
    if (setRoot) {
      setRoot(root);
    } else {
      result = root;
    }
    setCurrentRenderingInstance(prev);
    return result;
  }
  var getChildRoot = (vnode) => {
    const rawChildren = vnode.children;
    const dynamicChildren = vnode.dynamicChildren;
    const childRoot = filterSingleRoot(rawChildren, false);
    if (!childRoot) {
      return [vnode, undefined];
    } else if (childRoot.patchFlag > 0 && childRoot.patchFlag & 2048) {
      return getChildRoot(childRoot);
    }
    const index = rawChildren.indexOf(childRoot);
    const dynamicIndex = dynamicChildren ? dynamicChildren.indexOf(childRoot) : -1;
    const setRoot = (updatedRoot) => {
      rawChildren[index] = updatedRoot;
      if (dynamicChildren) {
        if (dynamicIndex > -1) {
          dynamicChildren[dynamicIndex] = updatedRoot;
        } else if (updatedRoot.patchFlag > 0) {
          vnode.dynamicChildren = [...dynamicChildren, updatedRoot];
        }
      }
    };
    return [normalizeVNode(childRoot), setRoot];
  };
  function filterSingleRoot(children, recurse = true) {
    let singleRoot;
    for (let i = 0;i < children.length; i++) {
      const child = children[i];
      if (isVNode(child)) {
        if (child.type !== Comment || child.children === "v-if") {
          if (singleRoot) {
            return;
          } else {
            singleRoot = child;
            if (recurse && singleRoot.patchFlag > 0 && singleRoot.patchFlag & 2048) {
              return filterSingleRoot(singleRoot.children);
            }
          }
        }
      } else {
        return;
      }
    }
    return singleRoot;
  }
  var getFunctionalFallthrough = (attrs) => {
    let res;
    for (const key in attrs) {
      if (key === "class" || key === "style" || isOn(key)) {
        (res || (res = {}))[key] = attrs[key];
      }
    }
    return res;
  };
  var filterModelListeners = (attrs, props) => {
    const res = {};
    for (const key in attrs) {
      if (!isModelListener(key) || !(key.slice(9) in props)) {
        res[key] = attrs[key];
      }
    }
    return res;
  };
  var isElementRoot = (vnode) => {
    return vnode.shapeFlag & (6 | 1) || vnode.type === Comment;
  };
  function shouldUpdateComponent(prevVNode, nextVNode, optimized) {
    const { props: prevProps, children: prevChildren, component } = prevVNode;
    const { props: nextProps, children: nextChildren, patchFlag } = nextVNode;
    const emits = component.emitsOptions;
    if ((prevChildren || nextChildren) && isHmrUpdating) {
      return true;
    }
    if (nextVNode.dirs || nextVNode.transition) {
      return true;
    }
    if (optimized && patchFlag >= 0) {
      if (patchFlag & 1024) {
        return true;
      }
      if (patchFlag & 16) {
        if (!prevProps) {
          return !!nextProps;
        }
        return hasPropsChanged(prevProps, nextProps, emits);
      } else if (patchFlag & 8) {
        const dynamicProps = nextVNode.dynamicProps;
        for (let i = 0;i < dynamicProps.length; i++) {
          const key = dynamicProps[i];
          if (hasPropValueChanged(nextProps, prevProps, key) && !isEmitListener(emits, key)) {
            return true;
          }
        }
      }
    } else {
      if (prevChildren || nextChildren) {
        if (!nextChildren || !nextChildren.$stable) {
          return true;
        }
      }
      if (prevProps === nextProps) {
        return false;
      }
      if (!prevProps) {
        return !!nextProps;
      }
      if (!nextProps) {
        return true;
      }
      return hasPropsChanged(prevProps, nextProps, emits);
    }
    return false;
  }
  function hasPropsChanged(prevProps, nextProps, emitsOptions) {
    const nextKeys = Object.keys(nextProps);
    if (nextKeys.length !== Object.keys(prevProps).length) {
      return true;
    }
    for (let i = 0;i < nextKeys.length; i++) {
      const key = nextKeys[i];
      if (hasPropValueChanged(nextProps, prevProps, key) && !isEmitListener(emitsOptions, key)) {
        return true;
      }
    }
    return false;
  }
  function hasPropValueChanged(nextProps, prevProps, key) {
    const nextProp = nextProps[key];
    const prevProp = prevProps[key];
    if (key === "style" && isObject(nextProp) && isObject(prevProp)) {
      return !looseEqual(nextProp, prevProp);
    }
    return nextProp !== prevProp;
  }
  function updateHOCHostEl({ vnode, parent, suspense }, el) {
    while (parent) {
      const root = parent.subTree;
      if (root.suspense && root.suspense.activeBranch === vnode) {
        root.suspense.vnode.el = root.el = el;
        vnode = root;
      }
      if (root === vnode) {
        (vnode = parent.vnode).el = el;
        parent = parent.parent;
      } else {
        break;
      }
    }
    if (suspense && suspense.activeBranch === vnode) {
      suspense.vnode.el = el;
    }
  }
  var internalObjectProto = {};
  var createInternalObject = () => Object.create(internalObjectProto);
  var isInternalObject = (obj) => Object.getPrototypeOf(obj) === internalObjectProto;
  function initProps(instance, rawProps, isStateful, isSSR = false) {
    const props = {};
    const attrs = createInternalObject();
    instance.propsDefaults = /* @__PURE__ */ Object.create(null);
    setFullProps(instance, rawProps, props, attrs);
    for (const key in instance.propsOptions[0]) {
      if (!(key in props)) {
        props[key] = undefined;
      }
    }
    if (true) {
      validateProps(rawProps || {}, props, instance);
    }
    if (isStateful) {
      instance.props = isSSR ? props : shallowReactive(props);
    } else {
      if (!instance.type.props) {
        instance.props = attrs;
      } else {
        instance.props = props;
      }
    }
    instance.attrs = attrs;
  }
  function isInHmrContext(instance) {
    while (instance) {
      if (instance.type.__hmrId)
        return true;
      instance = instance.parent;
    }
  }
  function updateProps(instance, rawProps, rawPrevProps, optimized) {
    const {
      props,
      attrs,
      vnode: { patchFlag }
    } = instance;
    const rawCurrentProps = toRaw(props);
    const [options] = instance.propsOptions;
    let hasAttrsChanged = false;
    if (!isInHmrContext(instance) && (optimized || patchFlag > 0) && !(patchFlag & 16)) {
      if (patchFlag & 8) {
        const propsToUpdate = instance.vnode.dynamicProps;
        for (let i = 0;i < propsToUpdate.length; i++) {
          let key = propsToUpdate[i];
          if (isEmitListener(instance.emitsOptions, key)) {
            continue;
          }
          const value = rawProps[key];
          if (options) {
            if (hasOwn(attrs, key)) {
              if (value !== attrs[key]) {
                attrs[key] = value;
                hasAttrsChanged = true;
              }
            } else {
              const camelizedKey = camelize(key);
              props[camelizedKey] = resolvePropValue(options, rawCurrentProps, camelizedKey, value, instance, false);
            }
          } else {
            if (value !== attrs[key]) {
              attrs[key] = value;
              hasAttrsChanged = true;
            }
          }
        }
      }
    } else {
      if (setFullProps(instance, rawProps, props, attrs)) {
        hasAttrsChanged = true;
      }
      let kebabKey;
      for (const key in rawCurrentProps) {
        if (!rawProps || !hasOwn(rawProps, key) && ((kebabKey = hyphenate(key)) === key || !hasOwn(rawProps, kebabKey))) {
          if (options) {
            if (rawPrevProps && (rawPrevProps[key] !== undefined || rawPrevProps[kebabKey] !== undefined)) {
              props[key] = resolvePropValue(options, rawCurrentProps, key, undefined, instance, true);
            }
          } else {
            delete props[key];
          }
        }
      }
      if (attrs !== rawCurrentProps) {
        for (const key in attrs) {
          if (!rawProps || !hasOwn(rawProps, key) && true) {
            delete attrs[key];
            hasAttrsChanged = true;
          }
        }
      }
    }
    if (hasAttrsChanged) {
      trigger(instance.attrs, "set", "");
    }
    if (true) {
      validateProps(rawProps || {}, props, instance);
    }
  }
  function setFullProps(instance, rawProps, props, attrs) {
    const [options, needCastKeys] = instance.propsOptions;
    let hasAttrsChanged = false;
    let rawCastValues;
    if (rawProps) {
      for (let key in rawProps) {
        if (isReservedProp(key)) {
          continue;
        }
        const value = rawProps[key];
        let camelKey;
        if (options && hasOwn(options, camelKey = camelize(key))) {
          if (!needCastKeys || !needCastKeys.includes(camelKey)) {
            props[camelKey] = value;
          } else {
            (rawCastValues || (rawCastValues = {}))[camelKey] = value;
          }
        } else if (!isEmitListener(instance.emitsOptions, key)) {
          if (!(key in attrs) || value !== attrs[key]) {
            attrs[key] = value;
            hasAttrsChanged = true;
          }
        }
      }
    }
    if (needCastKeys) {
      const rawCurrentProps = toRaw(props);
      const castValues = rawCastValues || EMPTY_OBJ;
      for (let i = 0;i < needCastKeys.length; i++) {
        const key = needCastKeys[i];
        props[key] = resolvePropValue(options, rawCurrentProps, key, castValues[key], instance, !hasOwn(castValues, key));
      }
    }
    return hasAttrsChanged;
  }
  function resolvePropValue(options, props, key, value, instance, isAbsent) {
    const opt = options[key];
    if (opt != null) {
      const hasDefault = hasOwn(opt, "default");
      if (hasDefault && value === undefined) {
        const defaultValue = opt.default;
        if (opt.type !== Function && !opt.skipFactory && isFunction(defaultValue)) {
          const { propsDefaults } = instance;
          if (key in propsDefaults) {
            value = propsDefaults[key];
          } else {
            const reset = setCurrentInstance(instance);
            value = propsDefaults[key] = defaultValue.call(null, props);
            reset();
          }
        } else {
          value = defaultValue;
        }
        if (instance.ce) {
          instance.ce._setProp(key, value);
        }
      }
      if (opt[0]) {
        if (isAbsent && !hasDefault) {
          value = false;
        } else if (opt[1] && (value === "" || value === hyphenate(key))) {
          value = true;
        }
      }
    }
    return value;
  }
  var mixinPropsCache = /* @__PURE__ */ new WeakMap;
  function normalizePropsOptions(comp, appContext, asMixin = false) {
    const cache = asMixin ? mixinPropsCache : appContext.propsCache;
    const cached = cache.get(comp);
    if (cached) {
      return cached;
    }
    const raw = comp.props;
    const normalized = {};
    const needCastKeys = [];
    let hasExtends = false;
    if (!isFunction(comp)) {
      const extendProps = (raw2) => {
        hasExtends = true;
        const [props, keys] = normalizePropsOptions(raw2, appContext, true);
        extend(normalized, props);
        if (keys)
          needCastKeys.push(...keys);
      };
      if (!asMixin && appContext.mixins.length) {
        appContext.mixins.forEach(extendProps);
      }
      if (comp.extends) {
        extendProps(comp.extends);
      }
      if (comp.mixins) {
        comp.mixins.forEach(extendProps);
      }
    }
    if (!raw && !hasExtends) {
      if (isObject(comp)) {
        cache.set(comp, EMPTY_ARR);
      }
      return EMPTY_ARR;
    }
    if (isArray(raw)) {
      for (let i = 0;i < raw.length; i++) {
        if (!isString(raw[i])) {
          warn$1(`props must be strings when using array syntax.`, raw[i]);
        }
        const normalizedKey = camelize(raw[i]);
        if (validatePropName(normalizedKey)) {
          normalized[normalizedKey] = EMPTY_OBJ;
        }
      }
    } else if (raw) {
      if (!isObject(raw)) {
        warn$1(`invalid props options`, raw);
      }
      for (const key in raw) {
        const normalizedKey = camelize(key);
        if (validatePropName(normalizedKey)) {
          const opt = raw[key];
          const prop = normalized[normalizedKey] = isArray(opt) || isFunction(opt) ? { type: opt } : extend({}, opt);
          const propType = prop.type;
          let shouldCast = false;
          let shouldCastTrue = true;
          if (isArray(propType)) {
            for (let index = 0;index < propType.length; ++index) {
              const type = propType[index];
              const typeName = isFunction(type) && type.name;
              if (typeName === "Boolean") {
                shouldCast = true;
                break;
              } else if (typeName === "String") {
                shouldCastTrue = false;
              }
            }
          } else {
            shouldCast = isFunction(propType) && propType.name === "Boolean";
          }
          prop[0] = shouldCast;
          prop[1] = shouldCastTrue;
          if (shouldCast || hasOwn(prop, "default")) {
            needCastKeys.push(normalizedKey);
          }
        }
      }
    }
    const res = [normalized, needCastKeys];
    if (isObject(comp)) {
      cache.set(comp, res);
    }
    return res;
  }
  function validatePropName(key) {
    if (key[0] !== "$" && !isReservedProp(key)) {
      return true;
    } else if (true) {
      warn$1(`Invalid prop name: "${key}" is a reserved property.`);
    }
    return false;
  }
  function getType(ctor) {
    if (ctor === null) {
      return "null";
    }
    if (typeof ctor === "function") {
      return ctor.name || "";
    } else if (typeof ctor === "object") {
      const name = ctor.constructor && ctor.constructor.name;
      return name || "";
    }
    return "";
  }
  function validateProps(rawProps, props, instance) {
    const resolvedValues = toRaw(props);
    const options = instance.propsOptions[0];
    const camelizePropsKey = Object.keys(rawProps).map((key) => camelize(key));
    for (const key in options) {
      let opt = options[key];
      if (opt == null)
        continue;
      validateProp(key, resolvedValues[key], opt, shallowReadonly(resolvedValues), !camelizePropsKey.includes(key));
    }
  }
  function validateProp(name, value, prop, props, isAbsent) {
    const { type, required, validator, skipCheck } = prop;
    if (required && isAbsent) {
      warn$1('Missing required prop: "' + name + '"');
      return;
    }
    if (value == null && !required) {
      return;
    }
    if (type != null && type !== true && !skipCheck) {
      let isValid = false;
      const types = isArray(type) ? type : [type];
      const expectedTypes = [];
      for (let i = 0;i < types.length && !isValid; i++) {
        const { valid, expectedType } = assertType(value, types[i]);
        expectedTypes.push(expectedType || "");
        isValid = valid;
      }
      if (!isValid) {
        warn$1(getInvalidTypeMessage(name, value, expectedTypes));
        return;
      }
    }
    if (validator && !validator(value, props)) {
      warn$1('Invalid prop: custom validator check failed for prop "' + name + '".');
    }
  }
  var isSimpleType = /* @__PURE__ */ makeMap("String,Number,Boolean,Function,Symbol,BigInt");
  function assertType(value, type) {
    let valid;
    const expectedType = getType(type);
    if (expectedType === "null") {
      valid = value === null;
    } else if (isSimpleType(expectedType)) {
      const t = typeof value;
      valid = t === expectedType.toLowerCase();
      if (!valid && t === "object") {
        valid = value instanceof type;
      }
    } else if (expectedType === "Object") {
      valid = isObject(value);
    } else if (expectedType === "Array") {
      valid = isArray(value);
    } else {
      valid = value instanceof type;
    }
    return {
      valid,
      expectedType
    };
  }
  function getInvalidTypeMessage(name, value, expectedTypes) {
    if (expectedTypes.length === 0) {
      return `Prop type [] for prop "${name}" won't match anything. Did you mean to use type Array instead?`;
    }
    let message = `Invalid prop: type check failed for prop "${name}". Expected ${expectedTypes.map(capitalize).join(" | ")}`;
    const expectedType = expectedTypes[0];
    const receivedType = toRawType(value);
    const expectedValue = styleValue(value, expectedType);
    const receivedValue = styleValue(value, receivedType);
    if (expectedTypes.length === 1 && isExplicable(expectedType) && !isBoolean(expectedType, receivedType)) {
      message += ` with value ${expectedValue}`;
    }
    message += `, got ${receivedType} `;
    if (isExplicable(receivedType)) {
      message += `with value ${receivedValue}.`;
    }
    return message;
  }
  function styleValue(value, type) {
    if (type === "String") {
      return `"${value}"`;
    } else if (type === "Number") {
      return `${Number(value)}`;
    } else {
      return `${value}`;
    }
  }
  function isExplicable(type) {
    const explicitTypes = ["string", "number", "boolean"];
    return explicitTypes.some((elem) => type.toLowerCase() === elem);
  }
  function isBoolean(...args) {
    return args.some((elem) => elem.toLowerCase() === "boolean");
  }
  var isInternalKey = (key) => key === "_" || key === "_ctx" || key === "$stable";
  var normalizeSlotValue = (value) => isArray(value) ? value.map(normalizeVNode) : [normalizeVNode(value)];
  var normalizeSlot = (key, rawSlot, ctx) => {
    if (rawSlot._n) {
      return rawSlot;
    }
    const normalized = withCtx((...args) => {
      if (currentInstance && !(ctx === null && currentRenderingInstance) && !(ctx && ctx.root !== currentInstance.root)) {
        warn$1(`Slot "${key}" invoked outside of the render function: this will not track dependencies used in the slot. Invoke the slot function inside the render function instead.`);
      }
      return normalizeSlotValue(rawSlot(...args));
    }, ctx);
    normalized._c = false;
    return normalized;
  };
  var normalizeObjectSlots = (rawSlots, slots, instance) => {
    const ctx = rawSlots._ctx;
    for (const key in rawSlots) {
      if (isInternalKey(key))
        continue;
      const value = rawSlots[key];
      if (isFunction(value)) {
        slots[key] = normalizeSlot(key, value, ctx);
      } else if (value != null) {
        if (true) {
          warn$1(`Non-function value encountered for slot "${key}". Prefer function slots for better performance.`);
        }
        const normalized = normalizeSlotValue(value);
        slots[key] = () => normalized;
      }
    }
  };
  var normalizeVNodeSlots = (instance, children) => {
    if (!isKeepAlive(instance.vnode) && true) {
      warn$1(`Non-function value encountered for default slot. Prefer function slots for better performance.`);
    }
    const normalized = normalizeSlotValue(children);
    instance.slots.default = () => normalized;
  };
  var assignSlots = (slots, children, optimized) => {
    for (const key in children) {
      if (optimized || !isInternalKey(key)) {
        slots[key] = children[key];
      }
    }
  };
  var initSlots = (instance, children, optimized) => {
    const slots = instance.slots = createInternalObject();
    if (instance.vnode.shapeFlag & 32) {
      const type = children._;
      if (type) {
        assignSlots(slots, children, optimized);
        if (optimized) {
          def(slots, "_", type, true);
        }
      } else {
        normalizeObjectSlots(children, slots);
      }
    } else if (children) {
      normalizeVNodeSlots(instance, children);
    }
  };
  var updateSlots = (instance, children, optimized) => {
    const { vnode, slots } = instance;
    let needDeletionCheck = true;
    let deletionComparisonTarget = EMPTY_OBJ;
    if (vnode.shapeFlag & 32) {
      const type = children._;
      if (type) {
        if (isHmrUpdating) {
          assignSlots(slots, children, optimized);
          trigger(instance, "set", "$slots");
        } else if (optimized && type === 1) {
          needDeletionCheck = false;
        } else {
          assignSlots(slots, children, optimized);
        }
      } else {
        needDeletionCheck = !children.$stable;
        normalizeObjectSlots(children, slots);
      }
      deletionComparisonTarget = children;
    } else if (children) {
      normalizeVNodeSlots(instance, children);
      deletionComparisonTarget = { default: 1 };
    }
    if (needDeletionCheck) {
      for (const key in slots) {
        if (!isInternalKey(key) && deletionComparisonTarget[key] == null) {
          delete slots[key];
        }
      }
    }
  };
  var supported;
  var perf;
  function startMeasure(instance, type) {
    if (instance.appContext.config.performance && isSupported()) {
      perf.mark(`vue-${type}-${instance.uid}`);
    }
    if (true) {
      devtoolsPerfStart(instance, type, isSupported() ? perf.now() : Date.now());
    }
  }
  function endMeasure(instance, type) {
    if (instance.appContext.config.performance && isSupported()) {
      const startTag = `vue-${type}-${instance.uid}`;
      const endTag = startTag + `:end`;
      const measureName = `<${formatComponentName(instance, instance.type)}> ${type}`;
      perf.mark(endTag);
      perf.measure(measureName, startTag, endTag);
      perf.clearMeasures(measureName);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
    }
    if (true) {
      devtoolsPerfEnd(instance, type, isSupported() ? perf.now() : Date.now());
    }
  }
  function isSupported() {
    if (supported !== undefined) {
      return supported;
    }
    if (typeof window !== "undefined" && window.performance) {
      supported = true;
      perf = window.performance;
    } else {
      supported = false;
    }
    return supported;
  }
  function initFeatureFlags() {
    const needWarn = [];
    if (false) {}
    if (false) {}
    if (false) {}
    if (needWarn.length) {
      const multi = needWarn.length > 1;
      console.warn(`Feature flag${multi ? `s` : ``} ${needWarn.join(", ")} ${multi ? `are` : `is`} not explicitly defined. You are running the esm-bundler build of Vue, which expects these compile-time feature flags to be globally injected via the bundler config in order to get better tree-shaking in the production bundle.

For more details, see https://link.vuejs.org/feature-flags.`);
    }
  }
  var queuePostRenderEffect = queueEffectWithSuspense;
  function createRenderer(options) {
    return baseCreateRenderer(options);
  }
  function baseCreateRenderer(options, createHydrationFns) {
    {
      initFeatureFlags();
    }
    const target = getGlobalThis();
    target.__VUE__ = true;
    if (true) {
      setDevtoolsHook$1(target.__VUE_DEVTOOLS_GLOBAL_HOOK__, target);
    }
    const {
      insert: hostInsert,
      remove: hostRemove,
      patchProp: hostPatchProp,
      createElement: hostCreateElement,
      createText: hostCreateText,
      createComment: hostCreateComment,
      setText: hostSetText,
      setElementText: hostSetElementText,
      parentNode: hostParentNode,
      nextSibling: hostNextSibling,
      setScopeId: hostSetScopeId = NOOP,
      insertStaticContent: hostInsertStaticContent
    } = options;
    const patch = (n1, n2, container, anchor = null, parentComponent = null, parentSuspense = null, namespace = undefined, slotScopeIds = null, optimized = isHmrUpdating ? false : !!n2.dynamicChildren) => {
      if (n1 === n2) {
        return;
      }
      if (n1 && !isSameVNodeType(n1, n2)) {
        anchor = getNextHostNode(n1);
        unmount(n1, parentComponent, parentSuspense, true);
        n1 = null;
      }
      if (n2.patchFlag === -2) {
        optimized = false;
        n2.dynamicChildren = null;
      }
      const { type, ref: ref2, shapeFlag } = n2;
      switch (type) {
        case Text:
          processText(n1, n2, container, anchor);
          break;
        case Comment:
          processCommentNode(n1, n2, container, anchor);
          break;
        case Static:
          if (n1 == null) {
            mountStaticNode(n2, container, anchor, namespace);
          } else if (true) {
            patchStaticNode(n1, n2, container, namespace);
          }
          break;
        case Fragment:
          processFragment(n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
          break;
        default:
          if (shapeFlag & 1) {
            processElement(n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
          } else if (shapeFlag & 6) {
            processComponent(n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
          } else if (shapeFlag & 64) {
            type.process(n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, internals);
          } else if (shapeFlag & 128) {
            type.process(n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, internals);
          } else if (true) {
            warn$1("Invalid VNode type:", type, `(${typeof type})`);
          }
      }
      if (ref2 != null && parentComponent) {
        setRef(ref2, n1 && n1.ref, parentSuspense, n2 || n1, !n2);
      } else if (ref2 == null && n1 && n1.ref != null) {
        setRef(n1.ref, null, parentSuspense, n1, true);
      }
    };
    const processText = (n1, n2, container, anchor) => {
      if (n1 == null) {
        hostInsert(n2.el = hostCreateText(n2.children), container, anchor);
      } else {
        const el = n2.el = n1.el;
        if (n2.children !== n1.children) {
          hostSetText(el, n2.children);
        }
      }
    };
    const processCommentNode = (n1, n2, container, anchor) => {
      if (n1 == null) {
        hostInsert(n2.el = hostCreateComment(n2.children || ""), container, anchor);
      } else {
        n2.el = n1.el;
      }
    };
    const mountStaticNode = (n2, container, anchor, namespace) => {
      [n2.el, n2.anchor] = hostInsertStaticContent(n2.children, container, anchor, namespace, n2.el, n2.anchor);
    };
    const patchStaticNode = (n1, n2, container, namespace) => {
      if (n2.children !== n1.children) {
        const anchor = hostNextSibling(n1.anchor);
        removeStaticNode(n1);
        [n2.el, n2.anchor] = hostInsertStaticContent(n2.children, container, anchor, namespace);
      } else {
        n2.el = n1.el;
        n2.anchor = n1.anchor;
      }
    };
    const moveStaticNode = ({ el, anchor }, container, nextSibling) => {
      let next;
      while (el && el !== anchor) {
        next = hostNextSibling(el);
        hostInsert(el, container, nextSibling);
        el = next;
      }
      hostInsert(anchor, container, nextSibling);
    };
    const removeStaticNode = ({ el, anchor }) => {
      let next;
      while (el && el !== anchor) {
        next = hostNextSibling(el);
        hostRemove(el);
        el = next;
      }
      hostRemove(anchor);
    };
    const processElement = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
      if (n2.type === "svg") {
        namespace = "svg";
      } else if (n2.type === "math") {
        namespace = "mathml";
      }
      if (n1 == null) {
        mountElement(n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
      } else {
        const customElement = n1.el && n1.el._isVueCE ? n1.el : null;
        try {
          if (customElement) {
            customElement._beginPatch();
          }
          patchElement(n1, n2, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
        } finally {
          if (customElement) {
            customElement._endPatch();
          }
        }
      }
    };
    const mountElement = (vnode, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
      let el;
      let vnodeHook;
      const { props, shapeFlag, transition, dirs } = vnode;
      el = vnode.el = hostCreateElement(vnode.type, namespace, props && props.is, props);
      if (shapeFlag & 8) {
        hostSetElementText(el, vnode.children);
      } else if (shapeFlag & 16) {
        mountChildren(vnode.children, el, null, parentComponent, parentSuspense, resolveChildrenNamespace(vnode, namespace), slotScopeIds, optimized);
      }
      if (dirs) {
        invokeDirectiveHook(vnode, null, parentComponent, "created");
      }
      setScopeId(el, vnode, vnode.scopeId, slotScopeIds, parentComponent);
      if (props) {
        for (const key in props) {
          if (key !== "value" && !isReservedProp(key)) {
            hostPatchProp(el, key, null, props[key], namespace, parentComponent);
          }
        }
        if ("value" in props) {
          hostPatchProp(el, "value", null, props.value, namespace);
        }
        if (vnodeHook = props.onVnodeBeforeMount) {
          invokeVNodeHook(vnodeHook, parentComponent, vnode);
        }
      }
      if (true) {
        def(el, "__vnode", vnode, true);
        def(el, "__vueParentComponent", parentComponent, true);
      }
      if (dirs) {
        invokeDirectiveHook(vnode, null, parentComponent, "beforeMount");
      }
      const needCallTransitionHooks = needTransition(parentSuspense, transition);
      if (needCallTransitionHooks) {
        transition.beforeEnter(el);
      }
      hostInsert(el, container, anchor);
      if ((vnodeHook = props && props.onVnodeMounted) || needCallTransitionHooks || dirs) {
        const isHmr = isHmrUpdating;
        queuePostRenderEffect(() => {
          let prev;
          if (true)
            prev = setHmrUpdating(isHmr);
          try {
            vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
            needCallTransitionHooks && transition.enter(el);
            dirs && invokeDirectiveHook(vnode, null, parentComponent, "mounted");
          } finally {
            if (true)
              setHmrUpdating(prev);
          }
        }, parentSuspense);
      }
    };
    const setScopeId = (el, vnode, scopeId, slotScopeIds, parentComponent) => {
      if (scopeId) {
        hostSetScopeId(el, scopeId);
      }
      if (slotScopeIds) {
        for (let i = 0;i < slotScopeIds.length; i++) {
          hostSetScopeId(el, slotScopeIds[i]);
        }
      }
      if (parentComponent) {
        let subTree = parentComponent.subTree;
        if (subTree.patchFlag > 0 && subTree.patchFlag & 2048) {
          subTree = filterSingleRoot(subTree.children) || subTree;
        }
        if (vnode === subTree || isSuspense(subTree.type) && (subTree.ssContent === vnode || subTree.ssFallback === vnode)) {
          const parentVNode = parentComponent.vnode;
          setScopeId(el, parentVNode, parentVNode.scopeId, parentVNode.slotScopeIds, parentComponent.parent);
        }
      }
    };
    const mountChildren = (children, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, start = 0) => {
      for (let i = start;i < children.length; i++) {
        const child = children[i] = optimized ? cloneIfMounted(children[i]) : normalizeVNode(children[i]);
        patch(null, child, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
      }
    };
    const patchElement = (n1, n2, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
      const el = n2.el = n1.el;
      if (true) {
        el.__vnode = n2;
      }
      let { patchFlag, dynamicChildren, dirs } = n2;
      patchFlag |= n1.patchFlag & 16;
      const oldProps = n1.props || EMPTY_OBJ;
      const newProps = n2.props || EMPTY_OBJ;
      let vnodeHook;
      parentComponent && toggleRecurse(parentComponent, false);
      if (vnodeHook = newProps.onVnodeBeforeUpdate) {
        invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
      }
      if (dirs) {
        invokeDirectiveHook(n2, n1, parentComponent, "beforeUpdate");
      }
      parentComponent && toggleRecurse(parentComponent, true);
      if (isHmrUpdating) {
        patchFlag = 0;
        optimized = false;
        dynamicChildren = null;
      }
      if (oldProps.innerHTML && newProps.innerHTML == null || oldProps.textContent && newProps.textContent == null) {
        hostSetElementText(el, "");
      }
      if (dynamicChildren) {
        patchBlockChildren(n1.dynamicChildren, dynamicChildren, el, parentComponent, parentSuspense, resolveChildrenNamespace(n2, namespace), slotScopeIds);
        if (true) {
          traverseStaticChildren(n1, n2);
        }
      } else if (!optimized) {
        patchChildren(n1, n2, el, null, parentComponent, parentSuspense, resolveChildrenNamespace(n2, namespace), slotScopeIds, false);
      }
      if (patchFlag > 0) {
        if (patchFlag & 16) {
          patchProps(el, oldProps, newProps, parentComponent, namespace);
        } else {
          if (patchFlag & 2) {
            if (oldProps.class !== newProps.class) {
              hostPatchProp(el, "class", null, newProps.class, namespace);
            }
          }
          if (patchFlag & 4) {
            hostPatchProp(el, "style", oldProps.style, newProps.style, namespace);
          }
          if (patchFlag & 8) {
            const propsToUpdate = n2.dynamicProps;
            for (let i = 0;i < propsToUpdate.length; i++) {
              const key = propsToUpdate[i];
              const prev = oldProps[key];
              const next = newProps[key];
              if (next !== prev || key === "value") {
                hostPatchProp(el, key, prev, next, namespace, parentComponent);
              }
            }
          }
        }
        if (patchFlag & 1) {
          if (n1.children !== n2.children) {
            hostSetElementText(el, n2.children);
          }
        }
      } else if (!optimized && dynamicChildren == null) {
        patchProps(el, oldProps, newProps, parentComponent, namespace);
      }
      if ((vnodeHook = newProps.onVnodeUpdated) || dirs) {
        queuePostRenderEffect(() => {
          vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
          dirs && invokeDirectiveHook(n2, n1, parentComponent, "updated");
        }, parentSuspense);
      }
    };
    const patchBlockChildren = (oldChildren, newChildren, fallbackContainer, parentComponent, parentSuspense, namespace, slotScopeIds) => {
      for (let i = 0;i < newChildren.length; i++) {
        const oldVNode = oldChildren[i];
        const newVNode = newChildren[i];
        const container = oldVNode.el && (oldVNode.type === Fragment || !isSameVNodeType(oldVNode, newVNode) || oldVNode.shapeFlag & (6 | 64 | 128)) ? hostParentNode(oldVNode.el) : fallbackContainer;
        patch(oldVNode, newVNode, container, null, parentComponent, parentSuspense, namespace, slotScopeIds, true);
      }
    };
    const patchProps = (el, oldProps, newProps, parentComponent, namespace) => {
      if (oldProps !== newProps) {
        if (oldProps !== EMPTY_OBJ) {
          for (const key in oldProps) {
            if (!isReservedProp(key) && !(key in newProps)) {
              hostPatchProp(el, key, oldProps[key], null, namespace, parentComponent);
            }
          }
        }
        for (const key in newProps) {
          if (isReservedProp(key))
            continue;
          const next = newProps[key];
          const prev = oldProps[key];
          if (next !== prev && key !== "value") {
            hostPatchProp(el, key, prev, next, namespace, parentComponent);
          }
        }
        if ("value" in newProps) {
          hostPatchProp(el, "value", oldProps.value, newProps.value, namespace);
        }
      }
    };
    const processFragment = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
      const fragmentStartAnchor = n2.el = n1 ? n1.el : hostCreateText("");
      const fragmentEndAnchor = n2.anchor = n1 ? n1.anchor : hostCreateText("");
      let { patchFlag, dynamicChildren, slotScopeIds: fragmentSlotScopeIds } = n2;
      if (isHmrUpdating || patchFlag & 2048) {
        patchFlag = 0;
        optimized = false;
        dynamicChildren = null;
      }
      if (fragmentSlotScopeIds) {
        slotScopeIds = slotScopeIds ? slotScopeIds.concat(fragmentSlotScopeIds) : fragmentSlotScopeIds;
      }
      if (n1 == null) {
        hostInsert(fragmentStartAnchor, container, anchor);
        hostInsert(fragmentEndAnchor, container, anchor);
        mountChildren(n2.children || [], container, fragmentEndAnchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
      } else {
        if (patchFlag > 0 && patchFlag & 64 && dynamicChildren && n1.dynamicChildren && n1.dynamicChildren.length === dynamicChildren.length) {
          patchBlockChildren(n1.dynamicChildren, dynamicChildren, container, parentComponent, parentSuspense, namespace, slotScopeIds);
          if (true) {
            traverseStaticChildren(n1, n2);
          } else
            ;
        } else {
          patchChildren(n1, n2, container, fragmentEndAnchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
        }
      }
    };
    const processComponent = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
      n2.slotScopeIds = slotScopeIds;
      if (n1 == null) {
        if (n2.shapeFlag & 512) {
          parentComponent.ctx.activate(n2, container, anchor, namespace, optimized);
        } else {
          mountComponent(n2, container, anchor, parentComponent, parentSuspense, namespace, optimized);
        }
      } else {
        updateComponent(n1, n2, optimized);
      }
    };
    const mountComponent = (initialVNode, container, anchor, parentComponent, parentSuspense, namespace, optimized) => {
      const instance = initialVNode.component = createComponentInstance(initialVNode, parentComponent, parentSuspense);
      if (instance.type.__hmrId) {
        registerHMR(instance);
      }
      if (true) {
        pushWarningContext(initialVNode);
        startMeasure(instance, `mount`);
      }
      if (isKeepAlive(initialVNode)) {
        instance.ctx.renderer = internals;
      }
      {
        if (true) {
          startMeasure(instance, `init`);
        }
        setupComponent(instance, false, optimized);
        if (true) {
          endMeasure(instance, `init`);
        }
      }
      if (isHmrUpdating)
        initialVNode.el = null;
      if (instance.asyncDep) {
        parentSuspense && parentSuspense.registerDep(instance, setupRenderEffect, optimized);
        if (!initialVNode.el) {
          const placeholder = instance.subTree = createVNode(Comment);
          processCommentNode(null, placeholder, container, anchor);
          initialVNode.placeholder = placeholder.el;
        }
      } else {
        setupRenderEffect(instance, initialVNode, container, anchor, parentSuspense, namespace, optimized);
      }
      if (true) {
        popWarningContext();
        endMeasure(instance, `mount`);
      }
    };
    const updateComponent = (n1, n2, optimized) => {
      const instance = n2.component = n1.component;
      if (shouldUpdateComponent(n1, n2, optimized)) {
        if (instance.asyncDep && !instance.asyncResolved) {
          if (true) {
            pushWarningContext(n2);
          }
          updateComponentPreRender(instance, n2, optimized);
          if (true) {
            popWarningContext();
          }
          return;
        } else {
          instance.next = n2;
          instance.update();
        }
      } else {
        n2.el = n1.el;
        instance.vnode = n2;
      }
    };
    const setupRenderEffect = (instance, initialVNode, container, anchor, parentSuspense, namespace, optimized) => {
      const componentUpdateFn = () => {
        if (!instance.isMounted) {
          let vnodeHook;
          const { el, props } = initialVNode;
          const { bm, m, parent, root, type } = instance;
          const isAsyncWrapperVNode = isAsyncWrapper(initialVNode);
          toggleRecurse(instance, false);
          if (bm) {
            invokeArrayFns(bm);
          }
          if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeBeforeMount)) {
            invokeVNodeHook(vnodeHook, parent, initialVNode);
          }
          toggleRecurse(instance, true);
          if (el && hydrateNode) {
            const hydrateSubTree = () => {
              if (true) {
                startMeasure(instance, `render`);
              }
              instance.subTree = renderComponentRoot(instance);
              if (true) {
                endMeasure(instance, `render`);
              }
              if (true) {
                startMeasure(instance, `hydrate`);
              }
              hydrateNode(el, instance.subTree, instance, parentSuspense, null);
              if (true) {
                endMeasure(instance, `hydrate`);
              }
            };
            if (isAsyncWrapperVNode && type.__asyncHydrate) {
              type.__asyncHydrate(el, instance, hydrateSubTree);
            } else {
              hydrateSubTree();
            }
          } else {
            if (root.ce && root.ce._hasShadowRoot()) {
              root.ce._injectChildStyle(type, instance.parent ? instance.parent.type : undefined);
            }
            if (true) {
              startMeasure(instance, `render`);
            }
            const subTree = instance.subTree = renderComponentRoot(instance);
            if (true) {
              endMeasure(instance, `render`);
            }
            if (true) {
              startMeasure(instance, `patch`);
            }
            patch(null, subTree, container, anchor, instance, parentSuspense, namespace);
            if (true) {
              endMeasure(instance, `patch`);
            }
            initialVNode.el = subTree.el;
          }
          if (m) {
            queuePostRenderEffect(m, parentSuspense);
          }
          if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeMounted)) {
            const scopedInitialVNode = initialVNode;
            queuePostRenderEffect(() => invokeVNodeHook(vnodeHook, parent, scopedInitialVNode), parentSuspense);
          }
          if (initialVNode.shapeFlag & 256 || parent && isAsyncWrapper(parent.vnode) && parent.vnode.shapeFlag & 256) {
            instance.a && queuePostRenderEffect(instance.a, parentSuspense);
          }
          instance.isMounted = true;
          if (true) {
            devtoolsComponentAdded(instance);
          }
          initialVNode = container = anchor = null;
        } else {
          let { next, bu, u, parent, vnode } = instance;
          {
            const nonHydratedAsyncRoot = locateNonHydratedAsyncRoot(instance);
            if (nonHydratedAsyncRoot) {
              if (next) {
                next.el = vnode.el;
                updateComponentPreRender(instance, next, optimized);
              }
              nonHydratedAsyncRoot.asyncDep.then(() => {
                queuePostRenderEffect(() => {
                  if (!instance.isUnmounted)
                    update();
                }, parentSuspense);
              });
              return;
            }
          }
          let originNext = next;
          let vnodeHook;
          if (true) {
            pushWarningContext(next || instance.vnode);
          }
          toggleRecurse(instance, false);
          if (next) {
            next.el = vnode.el;
            updateComponentPreRender(instance, next, optimized);
          } else {
            next = vnode;
          }
          if (bu) {
            invokeArrayFns(bu);
          }
          if (vnodeHook = next.props && next.props.onVnodeBeforeUpdate) {
            invokeVNodeHook(vnodeHook, parent, next, vnode);
          }
          toggleRecurse(instance, true);
          if (true) {
            startMeasure(instance, `render`);
          }
          const nextTree = renderComponentRoot(instance);
          if (true) {
            endMeasure(instance, `render`);
          }
          const prevTree = instance.subTree;
          instance.subTree = nextTree;
          if (true) {
            startMeasure(instance, `patch`);
          }
          patch(prevTree, nextTree, hostParentNode(prevTree.el), getNextHostNode(prevTree), instance, parentSuspense, namespace);
          if (true) {
            endMeasure(instance, `patch`);
          }
          next.el = nextTree.el;
          if (originNext === null) {
            updateHOCHostEl(instance, nextTree.el);
          }
          if (u) {
            queuePostRenderEffect(u, parentSuspense);
          }
          if (vnodeHook = next.props && next.props.onVnodeUpdated) {
            queuePostRenderEffect(() => invokeVNodeHook(vnodeHook, parent, next, vnode), parentSuspense);
          }
          if (true) {
            devtoolsComponentUpdated(instance);
          }
          if (true) {
            popWarningContext();
          }
        }
      };
      instance.scope.on();
      const effect2 = instance.effect = new ReactiveEffect(componentUpdateFn);
      instance.scope.off();
      const update = instance.update = effect2.run.bind(effect2);
      const job = instance.job = effect2.runIfDirty.bind(effect2);
      job.i = instance;
      job.id = instance.uid;
      effect2.scheduler = () => queueJob(job);
      toggleRecurse(instance, true);
      if (true) {
        effect2.onTrack = instance.rtc ? (e) => invokeArrayFns(instance.rtc, e) : undefined;
        effect2.onTrigger = instance.rtg ? (e) => invokeArrayFns(instance.rtg, e) : undefined;
      }
      update();
    };
    const updateComponentPreRender = (instance, nextVNode, optimized) => {
      nextVNode.component = instance;
      const prevProps = instance.vnode.props;
      instance.vnode = nextVNode;
      instance.next = null;
      updateProps(instance, nextVNode.props, prevProps, optimized);
      updateSlots(instance, nextVNode.children, optimized);
      pauseTracking();
      flushPreFlushCbs(instance);
      resetTracking();
    };
    const patchChildren = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized = false) => {
      const c1 = n1 && n1.children;
      const prevShapeFlag = n1 ? n1.shapeFlag : 0;
      const c2 = n2.children;
      const { patchFlag, shapeFlag } = n2;
      if (patchFlag > 0) {
        if (patchFlag & 128) {
          patchKeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
          return;
        } else if (patchFlag & 256) {
          patchUnkeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
          return;
        }
      }
      if (shapeFlag & 8) {
        if (prevShapeFlag & 16) {
          unmountChildren(c1, parentComponent, parentSuspense);
        }
        if (c2 !== c1) {
          hostSetElementText(container, c2);
        }
      } else {
        if (prevShapeFlag & 16) {
          if (shapeFlag & 16) {
            patchKeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
          } else {
            unmountChildren(c1, parentComponent, parentSuspense, true);
          }
        } else {
          if (prevShapeFlag & 8) {
            hostSetElementText(container, "");
          }
          if (shapeFlag & 16) {
            mountChildren(c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
          }
        }
      }
    };
    const patchUnkeyedChildren = (c1, c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
      c1 = c1 || EMPTY_ARR;
      c2 = c2 || EMPTY_ARR;
      const oldLength = c1.length;
      const newLength = c2.length;
      const commonLength = Math.min(oldLength, newLength);
      let i;
      for (i = 0;i < commonLength; i++) {
        const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
        patch(c1[i], nextChild, container, null, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
      }
      if (oldLength > newLength) {
        unmountChildren(c1, parentComponent, parentSuspense, true, false, commonLength);
      } else {
        mountChildren(c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, commonLength);
      }
    };
    const patchKeyedChildren = (c1, c2, container, parentAnchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
      let i = 0;
      const l2 = c2.length;
      let e1 = c1.length - 1;
      let e2 = l2 - 1;
      while (i <= e1 && i <= e2) {
        const n1 = c1[i];
        const n2 = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
        if (isSameVNodeType(n1, n2)) {
          patch(n1, n2, container, null, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
        } else {
          break;
        }
        i++;
      }
      while (i <= e1 && i <= e2) {
        const n1 = c1[e1];
        const n2 = c2[e2] = optimized ? cloneIfMounted(c2[e2]) : normalizeVNode(c2[e2]);
        if (isSameVNodeType(n1, n2)) {
          patch(n1, n2, container, null, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
        } else {
          break;
        }
        e1--;
        e2--;
      }
      if (i > e1) {
        if (i <= e2) {
          const nextPos = e2 + 1;
          const anchor = nextPos < l2 ? c2[nextPos].el : parentAnchor;
          while (i <= e2) {
            patch(null, c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]), container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
            i++;
          }
        }
      } else if (i > e2) {
        while (i <= e1) {
          unmount(c1[i], parentComponent, parentSuspense, true);
          i++;
        }
      } else {
        const s1 = i;
        const s2 = i;
        const keyToNewIndexMap = /* @__PURE__ */ new Map;
        for (i = s2;i <= e2; i++) {
          const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
          if (nextChild.key != null) {
            if (keyToNewIndexMap.has(nextChild.key)) {
              warn$1(`Duplicate keys found during update:`, JSON.stringify(nextChild.key), `Make sure keys are unique.`);
            }
            keyToNewIndexMap.set(nextChild.key, i);
          }
        }
        let j;
        let patched = 0;
        const toBePatched = e2 - s2 + 1;
        let moved = false;
        let maxNewIndexSoFar = 0;
        const newIndexToOldIndexMap = new Array(toBePatched);
        for (i = 0;i < toBePatched; i++)
          newIndexToOldIndexMap[i] = 0;
        for (i = s1;i <= e1; i++) {
          const prevChild = c1[i];
          if (patched >= toBePatched) {
            unmount(prevChild, parentComponent, parentSuspense, true);
            continue;
          }
          let newIndex;
          if (prevChild.key != null) {
            newIndex = keyToNewIndexMap.get(prevChild.key);
          } else {
            for (j = s2;j <= e2; j++) {
              if (newIndexToOldIndexMap[j - s2] === 0 && isSameVNodeType(prevChild, c2[j])) {
                newIndex = j;
                break;
              }
            }
          }
          if (newIndex === undefined) {
            unmount(prevChild, parentComponent, parentSuspense, true);
          } else {
            newIndexToOldIndexMap[newIndex - s2] = i + 1;
            if (newIndex >= maxNewIndexSoFar) {
              maxNewIndexSoFar = newIndex;
            } else {
              moved = true;
            }
            patch(prevChild, c2[newIndex], container, null, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
            patched++;
          }
        }
        const increasingNewIndexSequence = moved ? getSequence(newIndexToOldIndexMap) : EMPTY_ARR;
        j = increasingNewIndexSequence.length - 1;
        for (i = toBePatched - 1;i >= 0; i--) {
          const nextIndex = s2 + i;
          const nextChild = c2[nextIndex];
          const anchorVNode = c2[nextIndex + 1];
          const anchor = nextIndex + 1 < l2 ? anchorVNode.el || resolveAsyncComponentPlaceholder(anchorVNode) : parentAnchor;
          if (newIndexToOldIndexMap[i] === 0) {
            patch(null, nextChild, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
          } else if (moved) {
            if (j < 0 || i !== increasingNewIndexSequence[j]) {
              move(nextChild, container, anchor, 2);
            } else {
              j--;
            }
          }
        }
      }
    };
    const move = (vnode, container, anchor, moveType, parentSuspense = null) => {
      const { el, type, transition, children, shapeFlag } = vnode;
      if (shapeFlag & 6) {
        move(vnode.component.subTree, container, anchor, moveType);
        return;
      }
      if (shapeFlag & 128) {
        vnode.suspense.move(container, anchor, moveType);
        return;
      }
      if (shapeFlag & 64) {
        type.move(vnode, container, anchor, internals);
        return;
      }
      if (type === Fragment) {
        hostInsert(el, container, anchor);
        for (let i = 0;i < children.length; i++) {
          move(children[i], container, anchor, moveType);
        }
        hostInsert(vnode.anchor, container, anchor);
        return;
      }
      if (type === Static) {
        moveStaticNode(vnode, container, anchor);
        return;
      }
      const needTransition2 = moveType !== 2 && shapeFlag & 1 && transition;
      if (needTransition2) {
        if (moveType === 0) {
          transition.beforeEnter(el);
          hostInsert(el, container, anchor);
          queuePostRenderEffect(() => transition.enter(el), parentSuspense);
        } else {
          const { leave, delayLeave, afterLeave } = transition;
          const remove22 = () => {
            if (vnode.ctx.isUnmounted) {
              hostRemove(el);
            } else {
              hostInsert(el, container, anchor);
            }
          };
          const performLeave = () => {
            if (el._isLeaving) {
              el[leaveCbKey](true);
            }
            leave(el, () => {
              remove22();
              afterLeave && afterLeave();
            });
          };
          if (delayLeave) {
            delayLeave(el, remove22, performLeave);
          } else {
            performLeave();
          }
        }
      } else {
        hostInsert(el, container, anchor);
      }
    };
    const unmount = (vnode, parentComponent, parentSuspense, doRemove = false, optimized = false) => {
      const {
        type,
        props,
        ref: ref2,
        children,
        dynamicChildren,
        shapeFlag,
        patchFlag,
        dirs,
        cacheIndex,
        memo
      } = vnode;
      if (patchFlag === -2) {
        optimized = false;
      }
      if (ref2 != null) {
        pauseTracking();
        setRef(ref2, null, parentSuspense, vnode, true);
        resetTracking();
      }
      if (cacheIndex != null) {
        parentComponent.renderCache[cacheIndex] = undefined;
      }
      if (shapeFlag & 256) {
        parentComponent.ctx.deactivate(vnode);
        return;
      }
      const shouldInvokeDirs = shapeFlag & 1 && dirs;
      const shouldInvokeVnodeHook = !isAsyncWrapper(vnode);
      let vnodeHook;
      if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeBeforeUnmount)) {
        invokeVNodeHook(vnodeHook, parentComponent, vnode);
      }
      if (shapeFlag & 6) {
        unmountComponent(vnode.component, parentSuspense, doRemove);
      } else {
        if (shapeFlag & 128) {
          vnode.suspense.unmount(parentSuspense, doRemove);
          return;
        }
        if (shouldInvokeDirs) {
          invokeDirectiveHook(vnode, null, parentComponent, "beforeUnmount");
        }
        if (shapeFlag & 64) {
          vnode.type.remove(vnode, parentComponent, parentSuspense, internals, doRemove);
        } else if (dynamicChildren && !dynamicChildren.hasOnce && (type !== Fragment || patchFlag > 0 && patchFlag & 64)) {
          unmountChildren(dynamicChildren, parentComponent, parentSuspense, false, true);
        } else if (type === Fragment && patchFlag & (128 | 256) || !optimized && shapeFlag & 16) {
          unmountChildren(children, parentComponent, parentSuspense);
        }
        if (doRemove) {
          remove2(vnode);
        }
      }
      const shouldInvalidateMemo = memo != null && cacheIndex == null;
      if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeUnmounted) || shouldInvokeDirs || shouldInvalidateMemo) {
        queuePostRenderEffect(() => {
          vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
          shouldInvokeDirs && invokeDirectiveHook(vnode, null, parentComponent, "unmounted");
          if (shouldInvalidateMemo) {
            vnode.el = null;
          }
        }, parentSuspense);
      }
    };
    const remove2 = (vnode) => {
      const { type, el, anchor, transition } = vnode;
      if (type === Fragment) {
        if (vnode.patchFlag > 0 && vnode.patchFlag & 2048 && transition && !transition.persisted) {
          vnode.children.forEach((child) => {
            if (child.type === Comment) {
              hostRemove(child.el);
            } else {
              remove2(child);
            }
          });
        } else {
          removeFragment(el, anchor);
        }
        return;
      }
      if (type === Static) {
        removeStaticNode(vnode);
        return;
      }
      const performRemove = () => {
        hostRemove(el);
        if (transition && !transition.persisted && transition.afterLeave) {
          transition.afterLeave();
        }
      };
      if (vnode.shapeFlag & 1 && transition && !transition.persisted) {
        const { leave, delayLeave } = transition;
        const performLeave = () => leave(el, performRemove);
        if (delayLeave) {
          delayLeave(vnode.el, performRemove, performLeave);
        } else {
          performLeave();
        }
      } else {
        performRemove();
      }
    };
    const removeFragment = (cur, end) => {
      let next;
      while (cur !== end) {
        next = hostNextSibling(cur);
        hostRemove(cur);
        cur = next;
      }
      hostRemove(end);
    };
    const unmountComponent = (instance, parentSuspense, doRemove) => {
      if (instance.type.__hmrId) {
        unregisterHMR(instance);
      }
      const { bum, scope, job, subTree, um, m, a } = instance;
      invalidateMount(m);
      invalidateMount(a);
      if (bum) {
        invokeArrayFns(bum);
      }
      scope.stop();
      if (job) {
        job.flags |= 8;
        unmount(subTree, instance, parentSuspense, doRemove);
      }
      if (um) {
        queuePostRenderEffect(um, parentSuspense);
      }
      queuePostRenderEffect(() => {
        instance.isUnmounted = true;
      }, parentSuspense);
      if (true) {
        devtoolsComponentRemoved(instance);
      }
    };
    const unmountChildren = (children, parentComponent, parentSuspense, doRemove = false, optimized = false, start = 0) => {
      for (let i = start;i < children.length; i++) {
        unmount(children[i], parentComponent, parentSuspense, doRemove, optimized);
      }
    };
    const getNextHostNode = (vnode) => {
      if (vnode.shapeFlag & 6) {
        return getNextHostNode(vnode.component.subTree);
      }
      if (vnode.shapeFlag & 128) {
        return vnode.suspense.next();
      }
      const el = hostNextSibling(vnode.anchor || vnode.el);
      const teleportEnd = el && el[TeleportEndKey];
      return teleportEnd ? hostNextSibling(teleportEnd) : el;
    };
    let isFlushing = false;
    const render = (vnode, container, namespace) => {
      let instance;
      if (vnode == null) {
        if (container._vnode) {
          unmount(container._vnode, null, null, true);
          instance = container._vnode.component;
        }
      } else {
        patch(container._vnode || null, vnode, container, null, null, null, namespace);
      }
      container._vnode = vnode;
      if (!isFlushing) {
        isFlushing = true;
        flushPreFlushCbs(instance);
        flushPostFlushCbs();
        isFlushing = false;
      }
    };
    const internals = {
      p: patch,
      um: unmount,
      m: move,
      r: remove2,
      mt: mountComponent,
      mc: mountChildren,
      pc: patchChildren,
      pbc: patchBlockChildren,
      n: getNextHostNode,
      o: options
    };
    let hydrate;
    let hydrateNode;
    if (createHydrationFns) {
      [hydrate, hydrateNode] = createHydrationFns(internals);
    }
    return {
      render,
      hydrate,
      createApp: createAppAPI(render, hydrate)
    };
  }
  function resolveChildrenNamespace({ type, props }, currentNamespace) {
    return currentNamespace === "svg" && type === "foreignObject" || currentNamespace === "mathml" && type === "annotation-xml" && props && props.encoding && props.encoding.includes("html") ? undefined : currentNamespace;
  }
  function toggleRecurse({ effect: effect2, job }, allowed) {
    if (allowed) {
      effect2.flags |= 32;
      job.flags |= 4;
    } else {
      effect2.flags &= -33;
      job.flags &= -5;
    }
  }
  function needTransition(parentSuspense, transition) {
    return (!parentSuspense || parentSuspense && !parentSuspense.pendingBranch) && transition && !transition.persisted;
  }
  function traverseStaticChildren(n1, n2, shallow = false) {
    const ch1 = n1.children;
    const ch2 = n2.children;
    if (isArray(ch1) && isArray(ch2)) {
      for (let i = 0;i < ch1.length; i++) {
        const c1 = ch1[i];
        let c2 = ch2[i];
        if (c2.shapeFlag & 1 && !c2.dynamicChildren) {
          if (c2.patchFlag <= 0 || c2.patchFlag === 32) {
            c2 = ch2[i] = cloneIfMounted(ch2[i]);
            c2.el = c1.el;
          }
          if (!shallow && c2.patchFlag !== -2)
            traverseStaticChildren(c1, c2);
        }
        if (c2.type === Text) {
          if (c2.patchFlag === -1) {
            c2 = ch2[i] = cloneIfMounted(c2);
          }
          c2.el = c1.el;
        }
        if (c2.type === Comment && !c2.el) {
          c2.el = c1.el;
        }
        if (true) {
          c2.el && (c2.el.__vnode = c2);
        }
      }
    }
  }
  function getSequence(arr) {
    const p = arr.slice();
    const result = [0];
    let i, j, u, v, c;
    const len = arr.length;
    for (i = 0;i < len; i++) {
      const arrI = arr[i];
      if (arrI !== 0) {
        j = result[result.length - 1];
        if (arr[j] < arrI) {
          p[i] = j;
          result.push(i);
          continue;
        }
        u = 0;
        v = result.length - 1;
        while (u < v) {
          c = u + v >> 1;
          if (arr[result[c]] < arrI) {
            u = c + 1;
          } else {
            v = c;
          }
        }
        if (arrI < arr[result[u]]) {
          if (u > 0) {
            p[i] = result[u - 1];
          }
          result[u] = i;
        }
      }
    }
    u = result.length;
    v = result[u - 1];
    while (u-- > 0) {
      result[u] = v;
      v = p[v];
    }
    return result;
  }
  function locateNonHydratedAsyncRoot(instance) {
    const subComponent = instance.subTree.component;
    if (subComponent) {
      if (subComponent.asyncDep && !subComponent.asyncResolved) {
        return subComponent;
      } else {
        return locateNonHydratedAsyncRoot(subComponent);
      }
    }
  }
  function invalidateMount(hooks) {
    if (hooks) {
      for (let i = 0;i < hooks.length; i++)
        hooks[i].flags |= 8;
    }
  }
  function resolveAsyncComponentPlaceholder(anchorVnode) {
    if (anchorVnode.placeholder) {
      return anchorVnode.placeholder;
    }
    const instance = anchorVnode.component;
    if (instance) {
      return resolveAsyncComponentPlaceholder(instance.subTree);
    }
    return null;
  }
  var isSuspense = (type) => type.__isSuspense;
  function queueEffectWithSuspense(fn, suspense) {
    if (suspense && suspense.pendingBranch) {
      if (isArray(fn)) {
        suspense.effects.push(...fn);
      } else {
        suspense.effects.push(fn);
      }
    } else {
      queuePostFlushCb(fn);
    }
  }
  var Fragment = /* @__PURE__ */ Symbol.for("v-fgt");
  var Text = /* @__PURE__ */ Symbol.for("v-txt");
  var Comment = /* @__PURE__ */ Symbol.for("v-cmt");
  var Static = /* @__PURE__ */ Symbol.for("v-stc");
  var blockStack = [];
  var currentBlock = null;
  function openBlock(disableTracking = false) {
    blockStack.push(currentBlock = disableTracking ? null : []);
  }
  function closeBlock() {
    blockStack.pop();
    currentBlock = blockStack[blockStack.length - 1] || null;
  }
  var isBlockTreeEnabled = 1;
  function setBlockTracking(value, inVOnce = false) {
    isBlockTreeEnabled += value;
    if (value < 0 && currentBlock && inVOnce) {
      currentBlock.hasOnce = true;
    }
  }
  function setupBlock(vnode) {
    vnode.dynamicChildren = isBlockTreeEnabled > 0 ? currentBlock || EMPTY_ARR : null;
    closeBlock();
    if (isBlockTreeEnabled > 0 && currentBlock) {
      currentBlock.push(vnode);
    }
    return vnode;
  }
  function createElementBlock(type, props, children, patchFlag, dynamicProps, shapeFlag) {
    return setupBlock(createBaseVNode(type, props, children, patchFlag, dynamicProps, shapeFlag, true));
  }
  function createBlock(type, props, children, patchFlag, dynamicProps) {
    return setupBlock(createVNode(type, props, children, patchFlag, dynamicProps, true));
  }
  function isVNode(value) {
    return value ? value.__v_isVNode === true : false;
  }
  function isSameVNodeType(n1, n2) {
    if (n2.shapeFlag & 6 && n1.component) {
      const dirtyInstances = hmrDirtyComponents.get(n2.type);
      if (dirtyInstances && dirtyInstances.has(n1.component)) {
        n1.shapeFlag &= -257;
        n2.shapeFlag &= -513;
        return false;
      }
    }
    return n1.type === n2.type && n1.key === n2.key;
  }
  var vnodeArgsTransformer;
  var createVNodeWithArgsTransform = (...args) => {
    return _createVNode(...vnodeArgsTransformer ? vnodeArgsTransformer(args, currentRenderingInstance) : args);
  };
  var normalizeKey = ({ key }) => key != null ? key : null;
  var normalizeRef = ({
    ref: ref2,
    ref_key,
    ref_for
  }) => {
    if (typeof ref2 === "number") {
      ref2 = "" + ref2;
    }
    return ref2 != null ? isString(ref2) || isRef2(ref2) || isFunction(ref2) ? { i: currentRenderingInstance, r: ref2, k: ref_key, f: !!ref_for } : ref2 : null;
  };
  function createBaseVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, shapeFlag = type === Fragment ? 0 : 1, isBlockNode = false, needFullChildrenNormalization = false) {
    const vnode = {
      __v_isVNode: true,
      __v_skip: true,
      type,
      props,
      key: props && normalizeKey(props),
      ref: props && normalizeRef(props),
      scopeId: currentScopeId,
      slotScopeIds: null,
      children,
      component: null,
      suspense: null,
      ssContent: null,
      ssFallback: null,
      dirs: null,
      transition: null,
      el: null,
      anchor: null,
      target: null,
      targetStart: null,
      targetAnchor: null,
      staticCount: 0,
      shapeFlag,
      patchFlag,
      dynamicProps,
      dynamicChildren: null,
      appContext: null,
      ctx: currentRenderingInstance
    };
    if (needFullChildrenNormalization) {
      normalizeChildren(vnode, children);
      if (shapeFlag & 128) {
        type.normalize(vnode);
      }
    } else if (children) {
      vnode.shapeFlag |= isString(children) ? 8 : 16;
    }
    if (vnode.key !== vnode.key) {
      warn$1(`VNode created with invalid key (NaN). VNode type:`, vnode.type);
    }
    if (isBlockTreeEnabled > 0 && !isBlockNode && currentBlock && (vnode.patchFlag > 0 || shapeFlag & 6) && vnode.patchFlag !== 32) {
      currentBlock.push(vnode);
    }
    return vnode;
  }
  var createVNode = createVNodeWithArgsTransform;
  function _createVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, isBlockNode = false) {
    if (!type || type === NULL_DYNAMIC_COMPONENT) {
      if (!type) {
        warn$1(`Invalid vnode type when creating vnode: ${type}.`);
      }
      type = Comment;
    }
    if (isVNode(type)) {
      const cloned = cloneVNode(type, props, true);
      if (children) {
        normalizeChildren(cloned, children);
      }
      if (isBlockTreeEnabled > 0 && !isBlockNode && currentBlock) {
        if (cloned.shapeFlag & 6) {
          currentBlock[currentBlock.indexOf(type)] = cloned;
        } else {
          currentBlock.push(cloned);
        }
      }
      cloned.patchFlag = -2;
      return cloned;
    }
    if (isClassComponent(type)) {
      type = type.__vccOpts;
    }
    if (props) {
      props = guardReactiveProps(props);
      let { class: klass, style } = props;
      if (klass && !isString(klass)) {
        props.class = normalizeClass(klass);
      }
      if (isObject(style)) {
        if (isProxy(style) && !isArray(style)) {
          style = extend({}, style);
        }
        props.style = normalizeStyle(style);
      }
    }
    const shapeFlag = isString(type) ? 1 : isSuspense(type) ? 128 : isTeleport(type) ? 64 : isObject(type) ? 4 : isFunction(type) ? 2 : 0;
    if (shapeFlag & 4 && isProxy(type)) {
      type = toRaw(type);
      warn$1(`Vue received a Component that was made a reactive object. This can lead to unnecessary performance overhead and should be avoided by marking the component with \`markRaw\` or using \`shallowRef\` instead of \`ref\`.`, `
Component that was made reactive: `, type);
    }
    return createBaseVNode(type, props, children, patchFlag, dynamicProps, shapeFlag, isBlockNode, true);
  }
  function guardReactiveProps(props) {
    if (!props)
      return null;
    return isProxy(props) || isInternalObject(props) ? extend({}, props) : props;
  }
  function cloneVNode(vnode, extraProps, mergeRef = false, cloneTransition = false) {
    const { props, ref: ref2, patchFlag, children, transition } = vnode;
    const mergedProps = extraProps ? mergeProps(props || {}, extraProps) : props;
    const cloned = {
      __v_isVNode: true,
      __v_skip: true,
      type: vnode.type,
      props: mergedProps,
      key: mergedProps && normalizeKey(mergedProps),
      ref: extraProps && extraProps.ref ? mergeRef && ref2 ? isArray(ref2) ? ref2.concat(normalizeRef(extraProps)) : [ref2, normalizeRef(extraProps)] : normalizeRef(extraProps) : ref2,
      scopeId: vnode.scopeId,
      slotScopeIds: vnode.slotScopeIds,
      children: patchFlag === -1 && isArray(children) ? children.map(deepCloneVNode) : children,
      target: vnode.target,
      targetStart: vnode.targetStart,
      targetAnchor: vnode.targetAnchor,
      staticCount: vnode.staticCount,
      shapeFlag: vnode.shapeFlag,
      patchFlag: extraProps && vnode.type !== Fragment ? patchFlag === -1 ? 16 : patchFlag | 16 : patchFlag,
      dynamicProps: vnode.dynamicProps,
      dynamicChildren: vnode.dynamicChildren,
      appContext: vnode.appContext,
      dirs: vnode.dirs,
      transition,
      component: vnode.component,
      suspense: vnode.suspense,
      ssContent: vnode.ssContent && cloneVNode(vnode.ssContent),
      ssFallback: vnode.ssFallback && cloneVNode(vnode.ssFallback),
      placeholder: vnode.placeholder,
      el: vnode.el,
      anchor: vnode.anchor,
      ctx: vnode.ctx,
      ce: vnode.ce
    };
    if (transition && cloneTransition) {
      setTransitionHooks(cloned, transition.clone(cloned));
    }
    return cloned;
  }
  function deepCloneVNode(vnode) {
    const cloned = cloneVNode(vnode);
    if (isArray(vnode.children)) {
      cloned.children = vnode.children.map(deepCloneVNode);
    }
    return cloned;
  }
  function createTextVNode(text = " ", flag = 0) {
    return createVNode(Text, null, text, flag);
  }
  function createCommentVNode(text = "", asBlock = false) {
    return asBlock ? (openBlock(), createBlock(Comment, null, text)) : createVNode(Comment, null, text);
  }
  function normalizeVNode(child) {
    if (child == null || typeof child === "boolean") {
      return createVNode(Comment);
    } else if (isArray(child)) {
      return createVNode(Fragment, null, child.slice());
    } else if (isVNode(child)) {
      return cloneIfMounted(child);
    } else {
      return createVNode(Text, null, String(child));
    }
  }
  function cloneIfMounted(child) {
    return child.el === null && child.patchFlag !== -1 || child.memo ? child : cloneVNode(child);
  }
  function normalizeChildren(vnode, children) {
    let type = 0;
    const { shapeFlag } = vnode;
    if (children == null) {
      children = null;
    } else if (isArray(children)) {
      type = 16;
    } else if (typeof children === "object") {
      if (shapeFlag & (1 | 64)) {
        const slot = children.default;
        if (slot) {
          slot._c && (slot._d = false);
          normalizeChildren(vnode, slot());
          slot._c && (slot._d = true);
        }
        return;
      } else {
        type = 32;
        const slotFlag = children._;
        if (!slotFlag && !isInternalObject(children)) {
          children._ctx = currentRenderingInstance;
        } else if (slotFlag === 3 && currentRenderingInstance) {
          if (currentRenderingInstance.slots._ === 1) {
            children._ = 1;
          } else {
            children._ = 2;
            vnode.patchFlag |= 1024;
          }
        }
      }
    } else if (isFunction(children)) {
      children = { default: children, _ctx: currentRenderingInstance };
      type = 32;
    } else {
      children = String(children);
      if (shapeFlag & 64) {
        type = 16;
        children = [createTextVNode(children)];
      } else {
        type = 8;
      }
    }
    vnode.children = children;
    vnode.shapeFlag |= type;
  }
  function mergeProps(...args) {
    const ret = {};
    for (let i = 0;i < args.length; i++) {
      const toMerge = args[i];
      for (const key in toMerge) {
        if (key === "class") {
          if (ret.class !== toMerge.class) {
            ret.class = normalizeClass([ret.class, toMerge.class]);
          }
        } else if (key === "style") {
          ret.style = normalizeStyle([ret.style, toMerge.style]);
        } else if (isOn(key)) {
          const existing = ret[key];
          const incoming = toMerge[key];
          if (incoming && existing !== incoming && !(isArray(existing) && existing.includes(incoming))) {
            ret[key] = existing ? [].concat(existing, incoming) : incoming;
          } else if (incoming == null && existing == null && !isModelListener(key)) {
            ret[key] = incoming;
          }
        } else if (key !== "") {
          ret[key] = toMerge[key];
        }
      }
    }
    return ret;
  }
  function invokeVNodeHook(hook, instance, vnode, prevVNode = null) {
    callWithAsyncErrorHandling(hook, instance, 7, [
      vnode,
      prevVNode
    ]);
  }
  var emptyAppContext = createAppContext();
  var uid = 0;
  function createComponentInstance(vnode, parent, suspense) {
    const type = vnode.type;
    const appContext = (parent ? parent.appContext : vnode.appContext) || emptyAppContext;
    const instance = {
      uid: uid++,
      vnode,
      type,
      parent,
      appContext,
      root: null,
      next: null,
      subTree: null,
      effect: null,
      update: null,
      job: null,
      scope: new EffectScope(true),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: parent ? parent.provides : Object.create(appContext.provides),
      ids: parent ? parent.ids : ["", 0, 0],
      accessCache: null,
      renderCache: [],
      components: null,
      directives: null,
      propsOptions: normalizePropsOptions(type, appContext),
      emitsOptions: normalizeEmitsOptions(type, appContext),
      emit: null,
      emitted: null,
      propsDefaults: EMPTY_OBJ,
      inheritAttrs: type.inheritAttrs,
      ctx: EMPTY_OBJ,
      data: EMPTY_OBJ,
      props: EMPTY_OBJ,
      attrs: EMPTY_OBJ,
      slots: EMPTY_OBJ,
      refs: EMPTY_OBJ,
      setupState: EMPTY_OBJ,
      setupContext: null,
      suspense,
      suspenseId: suspense ? suspense.pendingId : 0,
      asyncDep: null,
      asyncResolved: false,
      isMounted: false,
      isUnmounted: false,
      isDeactivated: false,
      bc: null,
      c: null,
      bm: null,
      m: null,
      bu: null,
      u: null,
      um: null,
      bum: null,
      da: null,
      a: null,
      rtg: null,
      rtc: null,
      ec: null,
      sp: null
    };
    if (true) {
      instance.ctx = createDevRenderContext(instance);
    } else {}
    instance.root = parent ? parent.root : instance;
    instance.emit = emit.bind(null, instance);
    if (vnode.ce) {
      vnode.ce(instance);
    }
    return instance;
  }
  var currentInstance = null;
  var getCurrentInstance = () => currentInstance || currentRenderingInstance;
  var internalSetCurrentInstance;
  var setInSSRSetupState;
  {
    const g = getGlobalThis();
    const registerGlobalSetter = (key, setter) => {
      let setters;
      if (!(setters = g[key]))
        setters = g[key] = [];
      setters.push(setter);
      return (v) => {
        if (setters.length > 1)
          setters.forEach((set) => set(v));
        else
          setters[0](v);
      };
    };
    internalSetCurrentInstance = registerGlobalSetter(`__VUE_INSTANCE_SETTERS__`, (v) => currentInstance = v);
    setInSSRSetupState = registerGlobalSetter(`__VUE_SSR_SETTERS__`, (v) => isInSSRComponentSetup = v);
  }
  var setCurrentInstance = (instance) => {
    const prev = currentInstance;
    internalSetCurrentInstance(instance);
    instance.scope.on();
    return () => {
      instance.scope.off();
      internalSetCurrentInstance(prev);
    };
  };
  var unsetCurrentInstance = () => {
    currentInstance && currentInstance.scope.off();
    internalSetCurrentInstance(null);
  };
  var isBuiltInTag = /* @__PURE__ */ makeMap("slot,component");
  function validateComponentName(name, { isNativeTag }) {
    if (isBuiltInTag(name) || isNativeTag(name)) {
      warn$1("Do not use built-in or reserved HTML elements as component id: " + name);
    }
  }
  function isStatefulComponent(instance) {
    return instance.vnode.shapeFlag & 4;
  }
  var isInSSRComponentSetup = false;
  function setupComponent(instance, isSSR = false, optimized = false) {
    isSSR && setInSSRSetupState(isSSR);
    const { props, children } = instance.vnode;
    const isStateful = isStatefulComponent(instance);
    initProps(instance, props, isStateful, isSSR);
    initSlots(instance, children, optimized || isSSR);
    const setupResult = isStateful ? setupStatefulComponent(instance, isSSR) : undefined;
    isSSR && setInSSRSetupState(false);
    return setupResult;
  }
  function setupStatefulComponent(instance, isSSR) {
    const Component = instance.type;
    if (true) {
      if (Component.name) {
        validateComponentName(Component.name, instance.appContext.config);
      }
      if (Component.components) {
        const names = Object.keys(Component.components);
        for (let i = 0;i < names.length; i++) {
          validateComponentName(names[i], instance.appContext.config);
        }
      }
      if (Component.directives) {
        const names = Object.keys(Component.directives);
        for (let i = 0;i < names.length; i++) {
          validateDirectiveName(names[i]);
        }
      }
      if (Component.compilerOptions && isRuntimeOnly()) {
        warn$1(`"compilerOptions" is only supported when using a build of Vue that includes the runtime compiler. Since you are using a runtime-only build, the options should be passed via your build tool config instead.`);
      }
    }
    instance.accessCache = /* @__PURE__ */ Object.create(null);
    instance.proxy = new Proxy(instance.ctx, PublicInstanceProxyHandlers);
    if (true) {
      exposePropsOnRenderContext(instance);
    }
    const { setup } = Component;
    if (setup) {
      pauseTracking();
      const setupContext = instance.setupContext = setup.length > 1 ? createSetupContext(instance) : null;
      const reset = setCurrentInstance(instance);
      const setupResult = callWithErrorHandling(setup, instance, 0, [
        shallowReadonly(instance.props),
        setupContext
      ]);
      const isAsyncSetup = isPromise(setupResult);
      resetTracking();
      reset();
      if ((isAsyncSetup || instance.sp) && !isAsyncWrapper(instance)) {
        markAsyncBoundary(instance);
      }
      if (isAsyncSetup) {
        setupResult.then(unsetCurrentInstance, unsetCurrentInstance);
        if (isSSR) {
          return setupResult.then((resolvedResult) => {
            handleSetupResult(instance, resolvedResult, isSSR);
          }).catch((e) => {
            handleError(e, instance, 0);
          });
        } else {
          instance.asyncDep = setupResult;
          if (!instance.suspense) {
            const name = formatComponentName(instance, Component);
            warn$1(`Component <${name}>: setup function returned a promise, but no <Suspense> boundary was found in the parent component tree. A component with async setup() must be nested in a <Suspense> in order to be rendered.`);
          }
        }
      } else {
        handleSetupResult(instance, setupResult, isSSR);
      }
    } else {
      finishComponentSetup(instance, isSSR);
    }
  }
  function handleSetupResult(instance, setupResult, isSSR) {
    if (isFunction(setupResult)) {
      if (instance.type.__ssrInlineRender) {
        instance.ssrRender = setupResult;
      } else {
        instance.render = setupResult;
      }
    } else if (isObject(setupResult)) {
      if (isVNode(setupResult)) {
        warn$1(`setup() should not return VNodes directly - return a render function instead.`);
      }
      if (true) {
        instance.devtoolsRawSetupState = setupResult;
      }
      instance.setupState = proxyRefs(setupResult);
      if (true) {
        exposeSetupStateOnRenderContext(instance);
      }
    } else if (setupResult !== undefined) {
      warn$1(`setup() should return an object. Received: ${setupResult === null ? "null" : typeof setupResult}`);
    }
    finishComponentSetup(instance, isSSR);
  }
  var compile;
  var installWithProxy;
  var isRuntimeOnly = () => !compile;
  function finishComponentSetup(instance, isSSR, skipOptions) {
    const Component = instance.type;
    if (!instance.render) {
      if (!isSSR && compile && !Component.render) {
        const template = Component.template || resolveMergedOptions(instance).template;
        if (template) {
          if (true) {
            startMeasure(instance, `compile`);
          }
          const { isCustomElement, compilerOptions } = instance.appContext.config;
          const { delimiters, compilerOptions: componentCompilerOptions } = Component;
          const finalCompilerOptions = extend(extend({
            isCustomElement,
            delimiters
          }, compilerOptions), componentCompilerOptions);
          Component.render = compile(template, finalCompilerOptions);
          if (true) {
            endMeasure(instance, `compile`);
          }
        }
      }
      instance.render = Component.render || NOOP;
      if (installWithProxy) {
        installWithProxy(instance);
      }
    }
    if (true) {
      const reset = setCurrentInstance(instance);
      pauseTracking();
      try {
        applyOptions(instance);
      } finally {
        resetTracking();
        reset();
      }
    }
    if (!Component.render && instance.render === NOOP && !isSSR) {
      if (!compile && Component.template) {
        warn$1(`Component provided template option but runtime compilation is not supported in this build of Vue.` + ` Configure your bundler to alias "vue" to "vue/dist/vue.esm-bundler.js".`);
      } else {
        warn$1(`Component is missing template or render function: `, Component);
      }
    }
  }
  var attrsProxyHandlers = {
    get(target, key) {
      markAttrsAccessed();
      track(target, "get", "");
      return target[key];
    },
    set() {
      warn$1(`setupContext.attrs is readonly.`);
      return false;
    },
    deleteProperty() {
      warn$1(`setupContext.attrs is readonly.`);
      return false;
    }
  };
  function getSlotsProxy(instance) {
    return new Proxy(instance.slots, {
      get(target, key) {
        track(instance, "get", "$slots");
        return target[key];
      }
    });
  }
  function createSetupContext(instance) {
    const expose = (exposed) => {
      if (true) {
        if (instance.exposed) {
          warn$1(`expose() should be called only once per setup().`);
        }
        if (exposed != null) {
          let exposedType = typeof exposed;
          if (exposedType === "object") {
            if (isArray(exposed)) {
              exposedType = "array";
            } else if (isRef2(exposed)) {
              exposedType = "ref";
            }
          }
          if (exposedType !== "object") {
            warn$1(`expose() should be passed a plain object, received ${exposedType}.`);
          }
        }
      }
      instance.exposed = exposed || {};
    };
    if (true) {
      let attrsProxy;
      let slotsProxy;
      return Object.freeze({
        get attrs() {
          return attrsProxy || (attrsProxy = new Proxy(instance.attrs, attrsProxyHandlers));
        },
        get slots() {
          return slotsProxy || (slotsProxy = getSlotsProxy(instance));
        },
        get emit() {
          return (event, ...args) => instance.emit(event, ...args);
        },
        expose
      });
    } else {}
  }
  function getComponentPublicInstance(instance) {
    if (instance.exposed) {
      return instance.exposeProxy || (instance.exposeProxy = new Proxy(proxyRefs(markRaw(instance.exposed)), {
        get(target, key) {
          if (key in target) {
            return target[key];
          } else if (key in publicPropertiesMap) {
            return publicPropertiesMap[key](instance);
          }
        },
        has(target, key) {
          return key in target || key in publicPropertiesMap;
        }
      }));
    } else {
      return instance.proxy;
    }
  }
  var classifyRE = /(?:^|[-_])\w/g;
  var classify = (str) => str.replace(classifyRE, (c) => c.toUpperCase()).replace(/[-_]/g, "");
  function getComponentName(Component, includeInferred = true) {
    return isFunction(Component) ? Component.displayName || Component.name : Component.name || includeInferred && Component.__name;
  }
  function formatComponentName(instance, Component, isRoot = false) {
    let name = getComponentName(Component);
    if (!name && Component.__file) {
      const match = Component.__file.match(/([^/\\]+)\.\w+$/);
      if (match) {
        name = match[1];
      }
    }
    if (!name && instance) {
      const inferFromRegistry = (registry) => {
        for (const key in registry) {
          if (registry[key] === Component) {
            return key;
          }
        }
      };
      name = inferFromRegistry(instance.components) || instance.parent && inferFromRegistry(instance.parent.type.components) || inferFromRegistry(instance.appContext.components);
    }
    return name ? classify(name) : isRoot ? `App` : `Anonymous`;
  }
  function isClassComponent(value) {
    return isFunction(value) && "__vccOpts" in value;
  }
  var computed2 = (getterOrOptions, debugOptions) => {
    const c = computed(getterOrOptions, debugOptions, isInSSRComponentSetup);
    if (true) {
      const i = getCurrentInstance();
      if (i && i.appContext.config.warnRecursiveComputed) {
        c._warnRecursive = true;
      }
    }
    return c;
  };
  function h(type, propsOrChildren, children) {
    try {
      setBlockTracking(-1);
      const l = arguments.length;
      if (l === 2) {
        if (isObject(propsOrChildren) && !isArray(propsOrChildren)) {
          if (isVNode(propsOrChildren)) {
            return createVNode(type, null, [propsOrChildren]);
          }
          return createVNode(type, propsOrChildren);
        } else {
          return createVNode(type, null, propsOrChildren);
        }
      } else {
        if (l > 3) {
          children = Array.prototype.slice.call(arguments, 2);
        } else if (l === 3 && isVNode(children)) {
          children = [children];
        }
        return createVNode(type, propsOrChildren, children);
      }
    } finally {
      setBlockTracking(1);
    }
  }
  function initCustomFormatter() {
    if (typeof window === "undefined") {
      return;
    }
    const vueStyle = { style: "color:#3ba776" };
    const numberStyle = { style: "color:#1677ff" };
    const stringStyle = { style: "color:#f5222d" };
    const keywordStyle = { style: "color:#eb2f96" };
    const formatter = {
      __vue_custom_formatter: true,
      header(obj) {
        if (!isObject(obj)) {
          return null;
        }
        if (obj.__isVue) {
          return ["div", vueStyle, `VueInstance`];
        } else if (isRef2(obj)) {
          pauseTracking();
          const value = obj.value;
          resetTracking();
          return [
            "div",
            {},
            ["span", vueStyle, genRefFlag(obj)],
            "<",
            formatValue(value),
            `>`
          ];
        } else if (isReactive(obj)) {
          return [
            "div",
            {},
            ["span", vueStyle, isShallow(obj) ? "ShallowReactive" : "Reactive"],
            "<",
            formatValue(obj),
            `>${isReadonly(obj) ? ` (readonly)` : ``}`
          ];
        } else if (isReadonly(obj)) {
          return [
            "div",
            {},
            ["span", vueStyle, isShallow(obj) ? "ShallowReadonly" : "Readonly"],
            "<",
            formatValue(obj),
            ">"
          ];
        }
        return null;
      },
      hasBody(obj) {
        return obj && obj.__isVue;
      },
      body(obj) {
        if (obj && obj.__isVue) {
          return [
            "div",
            {},
            ...formatInstance(obj.$)
          ];
        }
      }
    };
    function formatInstance(instance) {
      const blocks = [];
      if (instance.type.props && instance.props) {
        blocks.push(createInstanceBlock("props", toRaw(instance.props)));
      }
      if (instance.setupState !== EMPTY_OBJ) {
        blocks.push(createInstanceBlock("setup", instance.setupState));
      }
      if (instance.data !== EMPTY_OBJ) {
        blocks.push(createInstanceBlock("data", toRaw(instance.data)));
      }
      const computed3 = extractKeys(instance, "computed");
      if (computed3) {
        blocks.push(createInstanceBlock("computed", computed3));
      }
      const injected = extractKeys(instance, "inject");
      if (injected) {
        blocks.push(createInstanceBlock("injected", injected));
      }
      blocks.push([
        "div",
        {},
        [
          "span",
          {
            style: keywordStyle.style + ";opacity:0.66"
          },
          "$ (internal): "
        ],
        ["object", { object: instance }]
      ]);
      return blocks;
    }
    function createInstanceBlock(type, target) {
      target = extend({}, target);
      if (!Object.keys(target).length) {
        return ["span", {}];
      }
      return [
        "div",
        { style: "line-height:1.25em;margin-bottom:0.6em" },
        [
          "div",
          {
            style: "color:#476582"
          },
          type
        ],
        [
          "div",
          {
            style: "padding-left:1.25em"
          },
          ...Object.keys(target).map((key) => {
            return [
              "div",
              {},
              ["span", keywordStyle, key + ": "],
              formatValue(target[key], false)
            ];
          })
        ]
      ];
    }
    function formatValue(v, asRaw = true) {
      if (typeof v === "number") {
        return ["span", numberStyle, v];
      } else if (typeof v === "string") {
        return ["span", stringStyle, JSON.stringify(v)];
      } else if (typeof v === "boolean") {
        return ["span", keywordStyle, v];
      } else if (isObject(v)) {
        return ["object", { object: asRaw ? toRaw(v) : v }];
      } else {
        return ["span", stringStyle, String(v)];
      }
    }
    function extractKeys(instance, type) {
      const Comp = instance.type;
      if (isFunction(Comp)) {
        return;
      }
      const extracted = {};
      for (const key in instance.ctx) {
        if (isKeyOfType(Comp, key, type)) {
          extracted[key] = instance.ctx[key];
        }
      }
      return extracted;
    }
    function isKeyOfType(Comp, key, type) {
      const opts = Comp[type];
      if (isArray(opts) && opts.includes(key) || isObject(opts) && key in opts) {
        return true;
      }
      if (Comp.extends && isKeyOfType(Comp.extends, key, type)) {
        return true;
      }
      if (Comp.mixins && Comp.mixins.some((m) => isKeyOfType(m, key, type))) {
        return true;
      }
    }
    function genRefFlag(v) {
      if (isShallow(v)) {
        return `ShallowRef`;
      }
      if (v.effect) {
        return `ComputedRef`;
      }
      return `Ref`;
    }
    if (window.devtoolsFormatters) {
      window.devtoolsFormatters.push(formatter);
    } else {
      window.devtoolsFormatters = [formatter];
    }
  }
  var version = "3.5.32";
  var warn2 = warn$1;
  // node_modules/@vue/runtime-dom/dist/runtime-dom.esm-bundler.js
  var policy = undefined;
  var tt = typeof window !== "undefined" && window.trustedTypes;
  if (tt) {
    try {
      policy = /* @__PURE__ */ tt.createPolicy("vue", {
        createHTML: (val) => val
      });
    } catch (e) {
      warn2(`Error creating trusted types policy: ${e}`);
    }
  }
  var unsafeToTrustedHTML = policy ? (val) => policy.createHTML(val) : (val) => val;
  var svgNS = "http://www.w3.org/2000/svg";
  var mathmlNS = "http://www.w3.org/1998/Math/MathML";
  var doc = typeof document !== "undefined" ? document : null;
  var templateContainer = doc && /* @__PURE__ */ doc.createElement("template");
  var nodeOps = {
    insert: (child, parent, anchor) => {
      parent.insertBefore(child, anchor || null);
    },
    remove: (child) => {
      const parent = child.parentNode;
      if (parent) {
        parent.removeChild(child);
      }
    },
    createElement: (tag, namespace, is, props) => {
      const el = namespace === "svg" ? doc.createElementNS(svgNS, tag) : namespace === "mathml" ? doc.createElementNS(mathmlNS, tag) : is ? doc.createElement(tag, { is }) : doc.createElement(tag);
      if (tag === "select" && props && props.multiple != null) {
        el.setAttribute("multiple", props.multiple);
      }
      return el;
    },
    createText: (text) => doc.createTextNode(text),
    createComment: (text) => doc.createComment(text),
    setText: (node, text) => {
      node.nodeValue = text;
    },
    setElementText: (el, text) => {
      el.textContent = text;
    },
    parentNode: (node) => node.parentNode,
    nextSibling: (node) => node.nextSibling,
    querySelector: (selector) => doc.querySelector(selector),
    setScopeId(el, id) {
      el.setAttribute(id, "");
    },
    insertStaticContent(content, parent, anchor, namespace, start, end) {
      const before = anchor ? anchor.previousSibling : parent.lastChild;
      if (start && (start === end || start.nextSibling)) {
        while (true) {
          parent.insertBefore(start.cloneNode(true), anchor);
          if (start === end || !(start = start.nextSibling))
            break;
        }
      } else {
        templateContainer.innerHTML = unsafeToTrustedHTML(namespace === "svg" ? `<svg>${content}</svg>` : namespace === "mathml" ? `<math>${content}</math>` : content);
        const template = templateContainer.content;
        if (namespace === "svg" || namespace === "mathml") {
          const wrapper = template.firstChild;
          while (wrapper.firstChild) {
            template.appendChild(wrapper.firstChild);
          }
          template.removeChild(wrapper);
        }
        parent.insertBefore(template, anchor);
      }
      return [
        before ? before.nextSibling : parent.firstChild,
        anchor ? anchor.previousSibling : parent.lastChild
      ];
    }
  };
  var vtcKey = /* @__PURE__ */ Symbol("_vtc");
  function patchClass(el, value, isSVG) {
    const transitionClasses = el[vtcKey];
    if (transitionClasses) {
      value = (value ? [value, ...transitionClasses] : [...transitionClasses]).join(" ");
    }
    if (value == null) {
      el.removeAttribute("class");
    } else if (isSVG) {
      el.setAttribute("class", value);
    } else {
      el.className = value;
    }
  }
  var vShowOriginalDisplay = /* @__PURE__ */ Symbol("_vod");
  var vShowHidden = /* @__PURE__ */ Symbol("_vsh");
  var CSS_VAR_TEXT = /* @__PURE__ */ Symbol("CSS_VAR_TEXT");
  var displayRE = /(?:^|;)\s*display\s*:/;
  function patchStyle(el, prev, next) {
    const style = el.style;
    const isCssString = isString(next);
    let hasControlledDisplay = false;
    if (next && !isCssString) {
      if (prev) {
        if (!isString(prev)) {
          for (const key in prev) {
            if (next[key] == null) {
              setStyle(style, key, "");
            }
          }
        } else {
          for (const prevStyle of prev.split(";")) {
            const key = prevStyle.slice(0, prevStyle.indexOf(":")).trim();
            if (next[key] == null) {
              setStyle(style, key, "");
            }
          }
        }
      }
      for (const key in next) {
        if (key === "display") {
          hasControlledDisplay = true;
        }
        setStyle(style, key, next[key]);
      }
    } else {
      if (isCssString) {
        if (prev !== next) {
          const cssVarText = style[CSS_VAR_TEXT];
          if (cssVarText) {
            next += ";" + cssVarText;
          }
          style.cssText = next;
          hasControlledDisplay = displayRE.test(next);
        }
      } else if (prev) {
        el.removeAttribute("style");
      }
    }
    if (vShowOriginalDisplay in el) {
      el[vShowOriginalDisplay] = hasControlledDisplay ? style.display : "";
      if (el[vShowHidden]) {
        style.display = "none";
      }
    }
  }
  var semicolonRE = /[^\\];\s*$/;
  var importantRE = /\s*!important$/;
  function setStyle(style, name, val) {
    if (isArray(val)) {
      val.forEach((v) => setStyle(style, name, v));
    } else {
      if (val == null)
        val = "";
      if (true) {
        if (semicolonRE.test(val)) {
          warn2(`Unexpected semicolon at the end of '${name}' style value: '${val}'`);
        }
      }
      if (name.startsWith("--")) {
        style.setProperty(name, val);
      } else {
        const prefixed = autoPrefix(style, name);
        if (importantRE.test(val)) {
          style.setProperty(hyphenate(prefixed), val.replace(importantRE, ""), "important");
        } else {
          style[prefixed] = val;
        }
      }
    }
  }
  var prefixes = ["Webkit", "Moz", "ms"];
  var prefixCache = {};
  function autoPrefix(style, rawName) {
    const cached = prefixCache[rawName];
    if (cached) {
      return cached;
    }
    let name = camelize(rawName);
    if (name !== "filter" && name in style) {
      return prefixCache[rawName] = name;
    }
    name = capitalize(name);
    for (let i = 0;i < prefixes.length; i++) {
      const prefixed = prefixes[i] + name;
      if (prefixed in style) {
        return prefixCache[rawName] = prefixed;
      }
    }
    return rawName;
  }
  var xlinkNS = "http://www.w3.org/1999/xlink";
  function patchAttr(el, key, value, isSVG, instance, isBoolean2 = isSpecialBooleanAttr(key)) {
    if (isSVG && key.startsWith("xlink:")) {
      if (value == null) {
        el.removeAttributeNS(xlinkNS, key.slice(6, key.length));
      } else {
        el.setAttributeNS(xlinkNS, key, value);
      }
    } else {
      if (value == null || isBoolean2 && !includeBooleanAttr(value)) {
        el.removeAttribute(key);
      } else {
        el.setAttribute(key, isBoolean2 ? "" : isSymbol(value) ? String(value) : value);
      }
    }
  }
  function patchDOMProp(el, key, value, parentComponent, attrName) {
    if (key === "innerHTML" || key === "textContent") {
      if (value != null) {
        el[key] = key === "innerHTML" ? unsafeToTrustedHTML(value) : value;
      }
      return;
    }
    const tag = el.tagName;
    if (key === "value" && tag !== "PROGRESS" && !tag.includes("-")) {
      const oldValue = tag === "OPTION" ? el.getAttribute("value") || "" : el.value;
      const newValue = value == null ? el.type === "checkbox" ? "on" : "" : String(value);
      if (oldValue !== newValue || !("_value" in el)) {
        el.value = newValue;
      }
      if (value == null) {
        el.removeAttribute(key);
      }
      el._value = value;
      return;
    }
    let needRemove = false;
    if (value === "" || value == null) {
      const type = typeof el[key];
      if (type === "boolean") {
        value = includeBooleanAttr(value);
      } else if (value == null && type === "string") {
        value = "";
        needRemove = true;
      } else if (type === "number") {
        value = 0;
        needRemove = true;
      }
    }
    try {
      el[key] = value;
    } catch (e) {
      if (!needRemove) {
        warn2(`Failed setting prop "${key}" on <${tag.toLowerCase()}>: value ${value} is invalid.`, e);
      }
    }
    needRemove && el.removeAttribute(attrName || key);
  }
  function addEventListener(el, event, handler, options) {
    el.addEventListener(event, handler, options);
  }
  function removeEventListener(el, event, handler, options) {
    el.removeEventListener(event, handler, options);
  }
  var veiKey = /* @__PURE__ */ Symbol("_vei");
  function patchEvent(el, rawName, prevValue, nextValue, instance = null) {
    const invokers = el[veiKey] || (el[veiKey] = {});
    const existingInvoker = invokers[rawName];
    if (nextValue && existingInvoker) {
      existingInvoker.value = sanitizeEventValue(nextValue, rawName);
    } else {
      const [name, options] = parseName(rawName);
      if (nextValue) {
        const invoker = invokers[rawName] = createInvoker(sanitizeEventValue(nextValue, rawName), instance);
        addEventListener(el, name, invoker, options);
      } else if (existingInvoker) {
        removeEventListener(el, name, existingInvoker, options);
        invokers[rawName] = undefined;
      }
    }
  }
  var optionsModifierRE = /(?:Once|Passive|Capture)$/;
  function parseName(name) {
    let options;
    if (optionsModifierRE.test(name)) {
      options = {};
      let m;
      while (m = name.match(optionsModifierRE)) {
        name = name.slice(0, name.length - m[0].length);
        options[m[0].toLowerCase()] = true;
      }
    }
    const event = name[2] === ":" ? name.slice(3) : hyphenate(name.slice(2));
    return [event, options];
  }
  var cachedNow = 0;
  var p = /* @__PURE__ */ Promise.resolve();
  var getNow = () => cachedNow || (p.then(() => cachedNow = 0), cachedNow = Date.now());
  function createInvoker(initialValue, instance) {
    const invoker = (e) => {
      if (!e._vts) {
        e._vts = Date.now();
      } else if (e._vts <= invoker.attached) {
        return;
      }
      callWithAsyncErrorHandling(patchStopImmediatePropagation(e, invoker.value), instance, 5, [e]);
    };
    invoker.value = initialValue;
    invoker.attached = getNow();
    return invoker;
  }
  function sanitizeEventValue(value, propName) {
    if (isFunction(value) || isArray(value)) {
      return value;
    }
    warn2(`Wrong type passed as event handler to ${propName} - did you forget @ or : in front of your prop?
Expected function or array of functions, received type ${typeof value}.`);
    return NOOP;
  }
  function patchStopImmediatePropagation(e, value) {
    if (isArray(value)) {
      const originalStop = e.stopImmediatePropagation;
      e.stopImmediatePropagation = () => {
        originalStop.call(e);
        e._stopped = true;
      };
      return value.map((fn) => (e2) => !e2._stopped && fn && fn(e2));
    } else {
      return value;
    }
  }
  var isNativeOn = (key) => key.charCodeAt(0) === 111 && key.charCodeAt(1) === 110 && key.charCodeAt(2) > 96 && key.charCodeAt(2) < 123;
  var patchProp = (el, key, prevValue, nextValue, namespace, parentComponent) => {
    const isSVG = namespace === "svg";
    if (key === "class") {
      patchClass(el, nextValue, isSVG);
    } else if (key === "style") {
      patchStyle(el, prevValue, nextValue);
    } else if (isOn(key)) {
      if (!isModelListener(key)) {
        patchEvent(el, key, prevValue, nextValue, parentComponent);
      }
    } else if (key[0] === "." ? (key = key.slice(1), true) : key[0] === "^" ? (key = key.slice(1), false) : shouldSetAsProp(el, key, nextValue, isSVG)) {
      patchDOMProp(el, key, nextValue);
      if (!el.tagName.includes("-") && (key === "value" || key === "checked" || key === "selected")) {
        patchAttr(el, key, nextValue, isSVG, parentComponent, key !== "value");
      }
    } else if (el._isVueCE && (shouldSetAsPropForVueCE(el, key) || el._def.__asyncLoader && (/[A-Z]/.test(key) || !isString(nextValue)))) {
      patchDOMProp(el, camelize(key), nextValue, parentComponent, key);
    } else {
      if (key === "true-value") {
        el._trueValue = nextValue;
      } else if (key === "false-value") {
        el._falseValue = nextValue;
      }
      patchAttr(el, key, nextValue, isSVG);
    }
  };
  function shouldSetAsProp(el, key, value, isSVG) {
    if (isSVG) {
      if (key === "innerHTML" || key === "textContent") {
        return true;
      }
      if (key in el && isNativeOn(key) && isFunction(value)) {
        return true;
      }
      return false;
    }
    if (key === "spellcheck" || key === "draggable" || key === "translate" || key === "autocorrect") {
      return false;
    }
    if (key === "sandbox" && el.tagName === "IFRAME") {
      return false;
    }
    if (key === "form") {
      return false;
    }
    if (key === "list" && el.tagName === "INPUT") {
      return false;
    }
    if (key === "type" && el.tagName === "TEXTAREA") {
      return false;
    }
    if (key === "width" || key === "height") {
      const tag = el.tagName;
      if (tag === "IMG" || tag === "VIDEO" || tag === "CANVAS" || tag === "SOURCE") {
        return false;
      }
    }
    if (isNativeOn(key) && isString(value)) {
      return false;
    }
    return key in el;
  }
  function shouldSetAsPropForVueCE(el, key) {
    const props = el._def.props;
    if (!props) {
      return false;
    }
    const camelKey = camelize(key);
    return Array.isArray(props) ? props.some((prop) => camelize(prop) === camelKey) : Object.keys(props).some((prop) => camelize(prop) === camelKey);
  }
  var systemModifiers = ["ctrl", "shift", "alt", "meta"];
  var modifierGuards = {
    stop: (e) => e.stopPropagation(),
    prevent: (e) => e.preventDefault(),
    self: (e) => e.target !== e.currentTarget,
    ctrl: (e) => !e.ctrlKey,
    shift: (e) => !e.shiftKey,
    alt: (e) => !e.altKey,
    meta: (e) => !e.metaKey,
    left: (e) => ("button" in e) && e.button !== 0,
    middle: (e) => ("button" in e) && e.button !== 1,
    right: (e) => ("button" in e) && e.button !== 2,
    exact: (e, modifiers) => systemModifiers.some((m) => e[`${m}Key`] && !modifiers.includes(m))
  };
  var withModifiers = (fn, modifiers) => {
    if (!fn)
      return fn;
    const cache = fn._withMods || (fn._withMods = {});
    const cacheKey = modifiers.join(".");
    return cache[cacheKey] || (cache[cacheKey] = (event, ...args) => {
      for (let i = 0;i < modifiers.length; i++) {
        const guard = modifierGuards[modifiers[i]];
        if (guard && guard(event, modifiers))
          return;
      }
      return fn(event, ...args);
    });
  };
  var keyNames = {
    esc: "escape",
    space: " ",
    up: "arrow-up",
    left: "arrow-left",
    right: "arrow-right",
    down: "arrow-down",
    delete: "backspace"
  };
  var withKeys = (fn, modifiers) => {
    const cache = fn._withKeys || (fn._withKeys = {});
    const cacheKey = modifiers.join(".");
    return cache[cacheKey] || (cache[cacheKey] = (event) => {
      if (!("key" in event)) {
        return;
      }
      const eventKey = hyphenate(event.key);
      if (modifiers.some((k) => k === eventKey || keyNames[k] === eventKey)) {
        return fn(event);
      }
    });
  };
  var rendererOptions = /* @__PURE__ */ extend({ patchProp }, nodeOps);
  var renderer;
  function ensureRenderer() {
    return renderer || (renderer = createRenderer(rendererOptions));
  }
  var createApp = (...args) => {
    const app = ensureRenderer().createApp(...args);
    if (true) {
      injectNativeTagCheck(app);
      injectCompilerOptionsCheck(app);
    }
    const { mount } = app;
    app.mount = (containerOrSelector) => {
      const container = normalizeContainer(containerOrSelector);
      if (!container)
        return;
      const component = app._component;
      if (!isFunction(component) && !component.render && !component.template) {
        component.template = container.innerHTML;
      }
      if (container.nodeType === 1) {
        container.textContent = "";
      }
      const proxy = mount(container, false, resolveRootNamespace(container));
      if (container instanceof Element) {
        container.removeAttribute("v-cloak");
        container.setAttribute("data-v-app", "");
      }
      return proxy;
    };
    return app;
  };
  function resolveRootNamespace(container) {
    if (container instanceof SVGElement) {
      return "svg";
    }
    if (typeof MathMLElement === "function" && container instanceof MathMLElement) {
      return "mathml";
    }
  }
  function injectNativeTagCheck(app) {
    Object.defineProperty(app.config, "isNativeTag", {
      value: (tag) => isHTMLTag(tag) || isSVGTag(tag) || isMathMLTag(tag),
      writable: false
    });
  }
  function injectCompilerOptionsCheck(app) {
    if (isRuntimeOnly()) {
      const isCustomElement = app.config.isCustomElement;
      Object.defineProperty(app.config, "isCustomElement", {
        get() {
          return isCustomElement;
        },
        set() {
          warn2(`The \`isCustomElement\` config option is deprecated. Use \`compilerOptions.isCustomElement\` instead.`);
        }
      });
      const compilerOptions = app.config.compilerOptions;
      const msg = `The \`compilerOptions\` config option is only respected when using a build of Vue.js that includes the runtime compiler (aka "full build"). Since you are using the runtime-only build, \`compilerOptions\` must be passed to \`@vue/compiler-dom\` in the build setup instead.
- For vue-loader: pass it via vue-loader's \`compilerOptions\` loader option.
- For vue-cli: see https://cli.vuejs.org/guide/webpack.html#modifying-options-of-a-loader
- For vite: pass it via @vitejs/plugin-vue options. See https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue#example-for-passing-options-to-vuecompiler-sfc`;
      Object.defineProperty(app.config, "compilerOptions", {
        get() {
          warn2(msg);
          return compilerOptions;
        },
        set() {
          warn2(msg);
        }
      });
    }
  }
  function normalizeContainer(container) {
    if (isString(container)) {
      const res = document.querySelector(container);
      if (!res) {
        warn2(`Failed to mount app: mount target selector "${container}" returned null.`);
      }
      return res;
    }
    if (window.ShadowRoot && container instanceof window.ShadowRoot && container.mode === "closed") {
      warn2(`mounting on a ShadowRoot with \`{mode: "closed"}\` may lead to unpredictable bugs`);
    }
    return container;
  }

  // node_modules/vue/dist/vue.runtime.esm-bundler.js
  function initDev() {
    {
      initCustomFormatter();
    }
  }
  if (true) {
    initDev();
  }

  // node_modules/@vue/devtools-shared/dist/index.js
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target2) => (target2 = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target2, "default", { value: mod, enumerable: true }) : target2, mod));
  var init_esm_shims = __esm({
    "../../node_modules/.pnpm/tsup@8.4.0_@microsoft+api-extractor@7.51.1_@types+node@22.13.14__jiti@2.4.2_postcss@8.5_96eb05a9d65343021e53791dd83f3773/node_modules/tsup/assets/esm_shims.js"() {}
  });
  var require_rfdc = __commonJS({
    "../../node_modules/.pnpm/rfdc@1.4.1/node_modules/rfdc/index.js"(exports, module) {
      init_esm_shims();
      module.exports = rfdc2;
      function copyBuffer(cur) {
        if (cur instanceof Buffer) {
          return Buffer.from(cur);
        }
        return new cur.constructor(cur.buffer.slice(), cur.byteOffset, cur.length);
      }
      function rfdc2(opts) {
        opts = opts || {};
        if (opts.circles)
          return rfdcCircles(opts);
        const constructorHandlers = /* @__PURE__ */ new Map;
        constructorHandlers.set(Date, (o) => new Date(o));
        constructorHandlers.set(Map, (o, fn) => new Map(cloneArray(Array.from(o), fn)));
        constructorHandlers.set(Set, (o, fn) => new Set(cloneArray(Array.from(o), fn)));
        if (opts.constructorHandlers) {
          for (const handler2 of opts.constructorHandlers) {
            constructorHandlers.set(handler2[0], handler2[1]);
          }
        }
        let handler = null;
        return opts.proto ? cloneProto : clone;
        function cloneArray(a, fn) {
          const keys = Object.keys(a);
          const a2 = new Array(keys.length);
          for (let i = 0;i < keys.length; i++) {
            const k = keys[i];
            const cur = a[k];
            if (typeof cur !== "object" || cur === null) {
              a2[k] = cur;
            } else if (cur.constructor !== Object && (handler = constructorHandlers.get(cur.constructor))) {
              a2[k] = handler(cur, fn);
            } else if (ArrayBuffer.isView(cur)) {
              a2[k] = copyBuffer(cur);
            } else {
              a2[k] = fn(cur);
            }
          }
          return a2;
        }
        function clone(o) {
          if (typeof o !== "object" || o === null)
            return o;
          if (Array.isArray(o))
            return cloneArray(o, clone);
          if (o.constructor !== Object && (handler = constructorHandlers.get(o.constructor))) {
            return handler(o, clone);
          }
          const o2 = {};
          for (const k in o) {
            if (Object.hasOwnProperty.call(o, k) === false)
              continue;
            const cur = o[k];
            if (typeof cur !== "object" || cur === null) {
              o2[k] = cur;
            } else if (cur.constructor !== Object && (handler = constructorHandlers.get(cur.constructor))) {
              o2[k] = handler(cur, clone);
            } else if (ArrayBuffer.isView(cur)) {
              o2[k] = copyBuffer(cur);
            } else {
              o2[k] = clone(cur);
            }
          }
          return o2;
        }
        function cloneProto(o) {
          if (typeof o !== "object" || o === null)
            return o;
          if (Array.isArray(o))
            return cloneArray(o, cloneProto);
          if (o.constructor !== Object && (handler = constructorHandlers.get(o.constructor))) {
            return handler(o, cloneProto);
          }
          const o2 = {};
          for (const k in o) {
            const cur = o[k];
            if (typeof cur !== "object" || cur === null) {
              o2[k] = cur;
            } else if (cur.constructor !== Object && (handler = constructorHandlers.get(cur.constructor))) {
              o2[k] = handler(cur, cloneProto);
            } else if (ArrayBuffer.isView(cur)) {
              o2[k] = copyBuffer(cur);
            } else {
              o2[k] = cloneProto(cur);
            }
          }
          return o2;
        }
      }
      function rfdcCircles(opts) {
        const refs = [];
        const refsNew = [];
        const constructorHandlers = /* @__PURE__ */ new Map;
        constructorHandlers.set(Date, (o) => new Date(o));
        constructorHandlers.set(Map, (o, fn) => new Map(cloneArray(Array.from(o), fn)));
        constructorHandlers.set(Set, (o, fn) => new Set(cloneArray(Array.from(o), fn)));
        if (opts.constructorHandlers) {
          for (const handler2 of opts.constructorHandlers) {
            constructorHandlers.set(handler2[0], handler2[1]);
          }
        }
        let handler = null;
        return opts.proto ? cloneProto : clone;
        function cloneArray(a, fn) {
          const keys = Object.keys(a);
          const a2 = new Array(keys.length);
          for (let i = 0;i < keys.length; i++) {
            const k = keys[i];
            const cur = a[k];
            if (typeof cur !== "object" || cur === null) {
              a2[k] = cur;
            } else if (cur.constructor !== Object && (handler = constructorHandlers.get(cur.constructor))) {
              a2[k] = handler(cur, fn);
            } else if (ArrayBuffer.isView(cur)) {
              a2[k] = copyBuffer(cur);
            } else {
              const index = refs.indexOf(cur);
              if (index !== -1) {
                a2[k] = refsNew[index];
              } else {
                a2[k] = fn(cur);
              }
            }
          }
          return a2;
        }
        function clone(o) {
          if (typeof o !== "object" || o === null)
            return o;
          if (Array.isArray(o))
            return cloneArray(o, clone);
          if (o.constructor !== Object && (handler = constructorHandlers.get(o.constructor))) {
            return handler(o, clone);
          }
          const o2 = {};
          refs.push(o);
          refsNew.push(o2);
          for (const k in o) {
            if (Object.hasOwnProperty.call(o, k) === false)
              continue;
            const cur = o[k];
            if (typeof cur !== "object" || cur === null) {
              o2[k] = cur;
            } else if (cur.constructor !== Object && (handler = constructorHandlers.get(cur.constructor))) {
              o2[k] = handler(cur, clone);
            } else if (ArrayBuffer.isView(cur)) {
              o2[k] = copyBuffer(cur);
            } else {
              const i = refs.indexOf(cur);
              if (i !== -1) {
                o2[k] = refsNew[i];
              } else {
                o2[k] = clone(cur);
              }
            }
          }
          refs.pop();
          refsNew.pop();
          return o2;
        }
        function cloneProto(o) {
          if (typeof o !== "object" || o === null)
            return o;
          if (Array.isArray(o))
            return cloneArray(o, cloneProto);
          if (o.constructor !== Object && (handler = constructorHandlers.get(o.constructor))) {
            return handler(o, cloneProto);
          }
          const o2 = {};
          refs.push(o);
          refsNew.push(o2);
          for (const k in o) {
            const cur = o[k];
            if (typeof cur !== "object" || cur === null) {
              o2[k] = cur;
            } else if (cur.constructor !== Object && (handler = constructorHandlers.get(cur.constructor))) {
              o2[k] = handler(cur, cloneProto);
            } else if (ArrayBuffer.isView(cur)) {
              o2[k] = copyBuffer(cur);
            } else {
              const i = refs.indexOf(cur);
              if (i !== -1) {
                o2[k] = refsNew[i];
              } else {
                o2[k] = cloneProto(cur);
              }
            }
          }
          refs.pop();
          refsNew.pop();
          return o2;
        }
      }
    }
  });
  init_esm_shims();
  init_esm_shims();
  init_esm_shims();
  var isBrowser = typeof navigator !== "undefined";
  var target = typeof window !== "undefined" ? window : typeof globalThis !== "undefined" ? globalThis : typeof global !== "undefined" ? global : {};
  var isInChromePanel = typeof target.chrome !== "undefined" && !!target.chrome.devtools;
  var isInIframe = isBrowser && target.self !== target.top;
  var _a;
  var isInElectron = typeof navigator !== "undefined" && ((_a = navigator.userAgent) == null ? undefined : _a.toLowerCase().includes("electron"));
  var isNuxtApp = typeof window !== "undefined" && !!window.__NUXT__;
  init_esm_shims();
  var import_rfdc = __toESM(require_rfdc(), 1);
  var classifyRE2 = /(?:^|[-_/])(\w)/g;
  function toUpper(_, c) {
    return c ? c.toUpperCase() : "";
  }
  function classify2(str) {
    return str && `${str}`.replace(classifyRE2, toUpper);
  }
  function basename(filename, ext) {
    let normalizedFilename = filename.replace(/^[a-z]:/i, "").replace(/\\/g, "/");
    if (normalizedFilename.endsWith(`index${ext}`)) {
      normalizedFilename = normalizedFilename.replace(`/index${ext}`, ext);
    }
    const lastSlashIndex = normalizedFilename.lastIndexOf("/");
    const baseNameWithExt = normalizedFilename.substring(lastSlashIndex + 1);
    if (ext) {
      const extIndex = baseNameWithExt.lastIndexOf(ext);
      return baseNameWithExt.substring(0, extIndex);
    }
    return "";
  }
  var deepClone = (0, import_rfdc.default)({ circles: true });

  // node_modules/perfect-debounce/dist/index.mjs
  var DEBOUNCE_DEFAULTS = {
    trailing: true
  };
  function debounce(fn, wait = 25, options = {}) {
    options = { ...DEBOUNCE_DEFAULTS, ...options };
    if (!Number.isFinite(wait)) {
      throw new TypeError("Expected `wait` to be a finite number");
    }
    let leadingValue;
    let timeout;
    let resolveList = [];
    let currentPromise;
    let trailingArgs;
    const applyFn = (_this, args) => {
      currentPromise = _applyPromised(fn, _this, args);
      currentPromise.finally(() => {
        currentPromise = null;
        if (options.trailing && trailingArgs && !timeout) {
          const promise = applyFn(_this, trailingArgs);
          trailingArgs = null;
          return promise;
        }
      });
      return currentPromise;
    };
    return function(...args) {
      if (currentPromise) {
        if (options.trailing) {
          trailingArgs = args;
        }
        return currentPromise;
      }
      return new Promise((resolve) => {
        const shouldCallNow = !timeout && options.leading;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          timeout = null;
          const promise = options.leading ? leadingValue : applyFn(this, args);
          for (const _resolve of resolveList) {
            _resolve(promise);
          }
          resolveList = [];
        }, wait);
        if (shouldCallNow) {
          leadingValue = applyFn(this, args);
          resolve(leadingValue);
        } else {
          resolveList.push(resolve);
        }
      });
    };
  }
  async function _applyPromised(fn, _this, args) {
    return await fn.apply(_this, args);
  }

  // node_modules/hookable/dist/index.mjs
  function flatHooks(configHooks, hooks = {}, parentName) {
    for (const key in configHooks) {
      const subHook = configHooks[key];
      const name = parentName ? `${parentName}:${key}` : key;
      if (typeof subHook === "object" && subHook !== null) {
        flatHooks(subHook, hooks, name);
      } else if (typeof subHook === "function") {
        hooks[name] = subHook;
      }
    }
    return hooks;
  }
  var defaultTask = { run: (function_) => function_() };
  var _createTask = () => defaultTask;
  var createTask = typeof console.createTask !== "undefined" ? console.createTask : _createTask;
  function serialTaskCaller(hooks, args) {
    const name = args.shift();
    const task = createTask(name);
    return hooks.reduce((promise, hookFunction) => promise.then(() => task.run(() => hookFunction(...args))), Promise.resolve());
  }
  function parallelTaskCaller(hooks, args) {
    const name = args.shift();
    const task = createTask(name);
    return Promise.all(hooks.map((hook) => task.run(() => hook(...args))));
  }
  function callEachWith(callbacks, arg0) {
    for (const callback of [...callbacks]) {
      callback(arg0);
    }
  }

  class Hookable {
    constructor() {
      this._hooks = {};
      this._before = undefined;
      this._after = undefined;
      this._deprecatedMessages = undefined;
      this._deprecatedHooks = {};
      this.hook = this.hook.bind(this);
      this.callHook = this.callHook.bind(this);
      this.callHookWith = this.callHookWith.bind(this);
    }
    hook(name, function_, options = {}) {
      if (!name || typeof function_ !== "function") {
        return () => {};
      }
      const originalName = name;
      let dep;
      while (this._deprecatedHooks[name]) {
        dep = this._deprecatedHooks[name];
        name = dep.to;
      }
      if (dep && !options.allowDeprecated) {
        let message = dep.message;
        if (!message) {
          message = `${originalName} hook has been deprecated` + (dep.to ? `, please use ${dep.to}` : "");
        }
        if (!this._deprecatedMessages) {
          this._deprecatedMessages = /* @__PURE__ */ new Set;
        }
        if (!this._deprecatedMessages.has(message)) {
          console.warn(message);
          this._deprecatedMessages.add(message);
        }
      }
      if (!function_.name) {
        try {
          Object.defineProperty(function_, "name", {
            get: () => "_" + name.replace(/\W+/g, "_") + "_hook_cb",
            configurable: true
          });
        } catch {}
      }
      this._hooks[name] = this._hooks[name] || [];
      this._hooks[name].push(function_);
      return () => {
        if (function_) {
          this.removeHook(name, function_);
          function_ = undefined;
        }
      };
    }
    hookOnce(name, function_) {
      let _unreg;
      let _function = (...arguments_) => {
        if (typeof _unreg === "function") {
          _unreg();
        }
        _unreg = undefined;
        _function = undefined;
        return function_(...arguments_);
      };
      _unreg = this.hook(name, _function);
      return _unreg;
    }
    removeHook(name, function_) {
      if (this._hooks[name]) {
        const index = this._hooks[name].indexOf(function_);
        if (index !== -1) {
          this._hooks[name].splice(index, 1);
        }
        if (this._hooks[name].length === 0) {
          delete this._hooks[name];
        }
      }
    }
    deprecateHook(name, deprecated) {
      this._deprecatedHooks[name] = typeof deprecated === "string" ? { to: deprecated } : deprecated;
      const _hooks = this._hooks[name] || [];
      delete this._hooks[name];
      for (const hook of _hooks) {
        this.hook(name, hook);
      }
    }
    deprecateHooks(deprecatedHooks) {
      Object.assign(this._deprecatedHooks, deprecatedHooks);
      for (const name in deprecatedHooks) {
        this.deprecateHook(name, deprecatedHooks[name]);
      }
    }
    addHooks(configHooks) {
      const hooks = flatHooks(configHooks);
      const removeFns = Object.keys(hooks).map((key) => this.hook(key, hooks[key]));
      return () => {
        for (const unreg of removeFns.splice(0, removeFns.length)) {
          unreg();
        }
      };
    }
    removeHooks(configHooks) {
      const hooks = flatHooks(configHooks);
      for (const key in hooks) {
        this.removeHook(key, hooks[key]);
      }
    }
    removeAllHooks() {
      for (const key in this._hooks) {
        delete this._hooks[key];
      }
    }
    callHook(name, ...arguments_) {
      arguments_.unshift(name);
      return this.callHookWith(serialTaskCaller, name, ...arguments_);
    }
    callHookParallel(name, ...arguments_) {
      arguments_.unshift(name);
      return this.callHookWith(parallelTaskCaller, name, ...arguments_);
    }
    callHookWith(caller, name, ...arguments_) {
      const event = this._before || this._after ? { name, args: arguments_, context: {} } : undefined;
      if (this._before) {
        callEachWith(this._before, event);
      }
      const result = caller(name in this._hooks ? [...this._hooks[name]] : [], arguments_);
      if (result instanceof Promise) {
        return result.finally(() => {
          if (this._after && event) {
            callEachWith(this._after, event);
          }
        });
      }
      if (this._after && event) {
        callEachWith(this._after, event);
      }
      return result;
    }
    beforeEach(function_) {
      this._before = this._before || [];
      this._before.push(function_);
      return () => {
        if (this._before !== undefined) {
          const index = this._before.indexOf(function_);
          if (index !== -1) {
            this._before.splice(index, 1);
          }
        }
      };
    }
    afterEach(function_) {
      this._after = this._after || [];
      this._after.push(function_);
      return () => {
        if (this._after !== undefined) {
          const index = this._after.indexOf(function_);
          if (index !== -1) {
            this._after.splice(index, 1);
          }
        }
      };
    }
  }
  function createHooks() {
    return new Hookable;
  }

  // node_modules/@vue/devtools-kit/dist/index.js
  var __create2 = Object.create;
  var __defProp2 = Object.defineProperty;
  var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames2 = Object.getOwnPropertyNames;
  var __getProtoOf2 = Object.getPrototypeOf;
  var __hasOwnProp2 = Object.prototype.hasOwnProperty;
  var __esm2 = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames2(fn)[0]])(fn = 0)), res;
  };
  var __commonJS2 = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames2(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps2 = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames2(from))
        if (!__hasOwnProp2.call(to, key) && key !== except)
          __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM2 = (mod, isNodeMode, target22) => (target22 = mod != null ? __create2(__getProtoOf2(mod)) : {}, __copyProps2(isNodeMode || !mod || !mod.__esModule ? __defProp2(target22, "default", { value: mod, enumerable: true }) : target22, mod));
  var init_esm_shims2 = __esm2({
    "../../node_modules/.pnpm/tsup@8.4.0_@microsoft+api-extractor@7.51.1_@types+node@22.13.14__jiti@2.4.2_postcss@8.5_96eb05a9d65343021e53791dd83f3773/node_modules/tsup/assets/esm_shims.js"() {}
  });
  var require_speakingurl = __commonJS2({
    "../../node_modules/.pnpm/speakingurl@14.0.1/node_modules/speakingurl/lib/speakingurl.js"(exports, module) {
      init_esm_shims2();
      (function(root) {
        var charMap = {
          "À": "A",
          "Á": "A",
          "Â": "A",
          "Ã": "A",
          "Ä": "Ae",
          "Å": "A",
          "Æ": "AE",
          "Ç": "C",
          "È": "E",
          "É": "E",
          "Ê": "E",
          "Ë": "E",
          "Ì": "I",
          "Í": "I",
          "Î": "I",
          "Ï": "I",
          "Ð": "D",
          "Ñ": "N",
          "Ò": "O",
          "Ó": "O",
          "Ô": "O",
          "Õ": "O",
          "Ö": "Oe",
          "Ő": "O",
          "Ø": "O",
          "Ù": "U",
          "Ú": "U",
          "Û": "U",
          "Ü": "Ue",
          "Ű": "U",
          "Ý": "Y",
          "Þ": "TH",
          "ß": "ss",
          "à": "a",
          "á": "a",
          "â": "a",
          "ã": "a",
          "ä": "ae",
          "å": "a",
          "æ": "ae",
          "ç": "c",
          "è": "e",
          "é": "e",
          "ê": "e",
          "ë": "e",
          "ì": "i",
          "í": "i",
          "î": "i",
          "ï": "i",
          "ð": "d",
          "ñ": "n",
          "ò": "o",
          "ó": "o",
          "ô": "o",
          "õ": "o",
          "ö": "oe",
          "ő": "o",
          "ø": "o",
          "ù": "u",
          "ú": "u",
          "û": "u",
          "ü": "ue",
          "ű": "u",
          "ý": "y",
          "þ": "th",
          "ÿ": "y",
          "ẞ": "SS",
          "ا": "a",
          "أ": "a",
          "إ": "i",
          "آ": "aa",
          "ؤ": "u",
          "ئ": "e",
          "ء": "a",
          "ب": "b",
          "ت": "t",
          "ث": "th",
          "ج": "j",
          "ح": "h",
          "خ": "kh",
          "د": "d",
          "ذ": "th",
          "ر": "r",
          "ز": "z",
          "س": "s",
          "ش": "sh",
          "ص": "s",
          "ض": "dh",
          "ط": "t",
          "ظ": "z",
          "ع": "a",
          "غ": "gh",
          "ف": "f",
          "ق": "q",
          "ك": "k",
          "ل": "l",
          "م": "m",
          "ن": "n",
          "ه": "h",
          "و": "w",
          "ي": "y",
          "ى": "a",
          "ة": "h",
          "ﻻ": "la",
          "ﻷ": "laa",
          "ﻹ": "lai",
          "ﻵ": "laa",
          "گ": "g",
          "چ": "ch",
          "پ": "p",
          "ژ": "zh",
          "ک": "k",
          "ی": "y",
          "َ": "a",
          "ً": "an",
          "ِ": "e",
          "ٍ": "en",
          "ُ": "u",
          "ٌ": "on",
          "ْ": "",
          "٠": "0",
          "١": "1",
          "٢": "2",
          "٣": "3",
          "٤": "4",
          "٥": "5",
          "٦": "6",
          "٧": "7",
          "٨": "8",
          "٩": "9",
          "۰": "0",
          "۱": "1",
          "۲": "2",
          "۳": "3",
          "۴": "4",
          "۵": "5",
          "۶": "6",
          "۷": "7",
          "۸": "8",
          "۹": "9",
          "က": "k",
          "ခ": "kh",
          "ဂ": "g",
          "ဃ": "ga",
          "င": "ng",
          "စ": "s",
          "ဆ": "sa",
          "ဇ": "z",
          "စျ": "za",
          "ည": "ny",
          "ဋ": "t",
          "ဌ": "ta",
          "ဍ": "d",
          "ဎ": "da",
          "ဏ": "na",
          "တ": "t",
          "ထ": "ta",
          "ဒ": "d",
          "ဓ": "da",
          "န": "n",
          "ပ": "p",
          "ဖ": "pa",
          "ဗ": "b",
          "ဘ": "ba",
          "မ": "m",
          "ယ": "y",
          "ရ": "ya",
          "လ": "l",
          "ဝ": "w",
          "သ": "th",
          "ဟ": "h",
          "ဠ": "la",
          "အ": "a",
          "ြ": "y",
          "ျ": "ya",
          "ွ": "w",
          "ြွ": "yw",
          "ျွ": "ywa",
          "ှ": "h",
          "ဧ": "e",
          "၏": "-e",
          "ဣ": "i",
          "ဤ": "-i",
          "ဉ": "u",
          "ဦ": "-u",
          "ဩ": "aw",
          "သြော": "aw",
          "ဪ": "aw",
          "၀": "0",
          "၁": "1",
          "၂": "2",
          "၃": "3",
          "၄": "4",
          "၅": "5",
          "၆": "6",
          "၇": "7",
          "၈": "8",
          "၉": "9",
          "္": "",
          "့": "",
          "း": "",
          "č": "c",
          "ď": "d",
          "ě": "e",
          "ň": "n",
          "ř": "r",
          "š": "s",
          "ť": "t",
          "ů": "u",
          "ž": "z",
          "Č": "C",
          "Ď": "D",
          "Ě": "E",
          "Ň": "N",
          "Ř": "R",
          "Š": "S",
          "Ť": "T",
          "Ů": "U",
          "Ž": "Z",
          "ހ": "h",
          "ށ": "sh",
          "ނ": "n",
          "ރ": "r",
          "ބ": "b",
          "ޅ": "lh",
          "ކ": "k",
          "އ": "a",
          "ވ": "v",
          "މ": "m",
          "ފ": "f",
          "ދ": "dh",
          "ތ": "th",
          "ލ": "l",
          "ގ": "g",
          "ޏ": "gn",
          "ސ": "s",
          "ޑ": "d",
          "ޒ": "z",
          "ޓ": "t",
          "ޔ": "y",
          "ޕ": "p",
          "ޖ": "j",
          "ޗ": "ch",
          "ޘ": "tt",
          "ޙ": "hh",
          "ޚ": "kh",
          "ޛ": "th",
          "ޜ": "z",
          "ޝ": "sh",
          "ޞ": "s",
          "ޟ": "d",
          "ޠ": "t",
          "ޡ": "z",
          "ޢ": "a",
          "ޣ": "gh",
          "ޤ": "q",
          "ޥ": "w",
          "ަ": "a",
          "ާ": "aa",
          "ި": "i",
          "ީ": "ee",
          "ު": "u",
          "ޫ": "oo",
          "ެ": "e",
          "ޭ": "ey",
          "ޮ": "o",
          "ޯ": "oa",
          "ް": "",
          "ა": "a",
          "ბ": "b",
          "გ": "g",
          "დ": "d",
          "ე": "e",
          "ვ": "v",
          "ზ": "z",
          "თ": "t",
          "ი": "i",
          "კ": "k",
          "ლ": "l",
          "მ": "m",
          "ნ": "n",
          "ო": "o",
          "პ": "p",
          "ჟ": "zh",
          "რ": "r",
          "ს": "s",
          "ტ": "t",
          "უ": "u",
          "ფ": "p",
          "ქ": "k",
          "ღ": "gh",
          "ყ": "q",
          "შ": "sh",
          "ჩ": "ch",
          "ც": "ts",
          "ძ": "dz",
          "წ": "ts",
          "ჭ": "ch",
          "ხ": "kh",
          "ჯ": "j",
          "ჰ": "h",
          "α": "a",
          "β": "v",
          "γ": "g",
          "δ": "d",
          "ε": "e",
          "ζ": "z",
          "η": "i",
          "θ": "th",
          "ι": "i",
          "κ": "k",
          "λ": "l",
          "μ": "m",
          "ν": "n",
          "ξ": "ks",
          "ο": "o",
          "π": "p",
          "ρ": "r",
          "σ": "s",
          "τ": "t",
          "υ": "y",
          "φ": "f",
          "χ": "x",
          "ψ": "ps",
          "ω": "o",
          "ά": "a",
          "έ": "e",
          "ί": "i",
          "ό": "o",
          "ύ": "y",
          "ή": "i",
          "ώ": "o",
          "ς": "s",
          "ϊ": "i",
          "ΰ": "y",
          "ϋ": "y",
          "ΐ": "i",
          "Α": "A",
          "Β": "B",
          "Γ": "G",
          "Δ": "D",
          "Ε": "E",
          "Ζ": "Z",
          "Η": "I",
          "Θ": "TH",
          "Ι": "I",
          "Κ": "K",
          "Λ": "L",
          "Μ": "M",
          "Ν": "N",
          "Ξ": "KS",
          "Ο": "O",
          "Π": "P",
          "Ρ": "R",
          "Σ": "S",
          "Τ": "T",
          "Υ": "Y",
          "Φ": "F",
          "Χ": "X",
          "Ψ": "PS",
          "Ω": "O",
          "Ά": "A",
          "Έ": "E",
          "Ί": "I",
          "Ό": "O",
          "Ύ": "Y",
          "Ή": "I",
          "Ώ": "O",
          "Ϊ": "I",
          "Ϋ": "Y",
          "ā": "a",
          "ē": "e",
          "ģ": "g",
          "ī": "i",
          "ķ": "k",
          "ļ": "l",
          "ņ": "n",
          "ū": "u",
          "Ā": "A",
          "Ē": "E",
          "Ģ": "G",
          "Ī": "I",
          "Ķ": "k",
          "Ļ": "L",
          "Ņ": "N",
          "Ū": "U",
          "Ќ": "Kj",
          "ќ": "kj",
          "Љ": "Lj",
          "љ": "lj",
          "Њ": "Nj",
          "њ": "nj",
          "Тс": "Ts",
          "тс": "ts",
          "ą": "a",
          "ć": "c",
          "ę": "e",
          "ł": "l",
          "ń": "n",
          "ś": "s",
          "ź": "z",
          "ż": "z",
          "Ą": "A",
          "Ć": "C",
          "Ę": "E",
          "Ł": "L",
          "Ń": "N",
          "Ś": "S",
          "Ź": "Z",
          "Ż": "Z",
          "Є": "Ye",
          "І": "I",
          "Ї": "Yi",
          "Ґ": "G",
          "є": "ye",
          "і": "i",
          "ї": "yi",
          "ґ": "g",
          "ă": "a",
          "Ă": "A",
          "ș": "s",
          "Ș": "S",
          "ț": "t",
          "Ț": "T",
          "ţ": "t",
          "Ţ": "T",
          "а": "a",
          "б": "b",
          "в": "v",
          "г": "g",
          "д": "d",
          "е": "e",
          "ё": "yo",
          "ж": "zh",
          "з": "z",
          "и": "i",
          "й": "i",
          "к": "k",
          "л": "l",
          "м": "m",
          "н": "n",
          "о": "o",
          "п": "p",
          "р": "r",
          "с": "s",
          "т": "t",
          "у": "u",
          "ф": "f",
          "х": "kh",
          "ц": "c",
          "ч": "ch",
          "ш": "sh",
          "щ": "sh",
          "ъ": "",
          "ы": "y",
          "ь": "",
          "э": "e",
          "ю": "yu",
          "я": "ya",
          "А": "A",
          "Б": "B",
          "В": "V",
          "Г": "G",
          "Д": "D",
          "Е": "E",
          "Ё": "Yo",
          "Ж": "Zh",
          "З": "Z",
          "И": "I",
          "Й": "I",
          "К": "K",
          "Л": "L",
          "М": "M",
          "Н": "N",
          "О": "O",
          "П": "P",
          "Р": "R",
          "С": "S",
          "Т": "T",
          "У": "U",
          "Ф": "F",
          "Х": "Kh",
          "Ц": "C",
          "Ч": "Ch",
          "Ш": "Sh",
          "Щ": "Sh",
          "Ъ": "",
          "Ы": "Y",
          "Ь": "",
          "Э": "E",
          "Ю": "Yu",
          "Я": "Ya",
          "ђ": "dj",
          "ј": "j",
          "ћ": "c",
          "џ": "dz",
          "Ђ": "Dj",
          "Ј": "j",
          "Ћ": "C",
          "Џ": "Dz",
          "ľ": "l",
          "ĺ": "l",
          "ŕ": "r",
          "Ľ": "L",
          "Ĺ": "L",
          "Ŕ": "R",
          "ş": "s",
          "Ş": "S",
          "ı": "i",
          "İ": "I",
          "ğ": "g",
          "Ğ": "G",
          "ả": "a",
          "Ả": "A",
          "ẳ": "a",
          "Ẳ": "A",
          "ẩ": "a",
          "Ẩ": "A",
          "đ": "d",
          "Đ": "D",
          "ẹ": "e",
          "Ẹ": "E",
          "ẽ": "e",
          "Ẽ": "E",
          "ẻ": "e",
          "Ẻ": "E",
          "ế": "e",
          "Ế": "E",
          "ề": "e",
          "Ề": "E",
          "ệ": "e",
          "Ệ": "E",
          "ễ": "e",
          "Ễ": "E",
          "ể": "e",
          "Ể": "E",
          "ỏ": "o",
          "ọ": "o",
          "Ọ": "o",
          "ố": "o",
          "Ố": "O",
          "ồ": "o",
          "Ồ": "O",
          "ổ": "o",
          "Ổ": "O",
          "ộ": "o",
          "Ộ": "O",
          "ỗ": "o",
          "Ỗ": "O",
          "ơ": "o",
          "Ơ": "O",
          "ớ": "o",
          "Ớ": "O",
          "ờ": "o",
          "Ờ": "O",
          "ợ": "o",
          "Ợ": "O",
          "ỡ": "o",
          "Ỡ": "O",
          "Ở": "o",
          "ở": "o",
          "ị": "i",
          "Ị": "I",
          "ĩ": "i",
          "Ĩ": "I",
          "ỉ": "i",
          "Ỉ": "i",
          "ủ": "u",
          "Ủ": "U",
          "ụ": "u",
          "Ụ": "U",
          "ũ": "u",
          "Ũ": "U",
          "ư": "u",
          "Ư": "U",
          "ứ": "u",
          "Ứ": "U",
          "ừ": "u",
          "Ừ": "U",
          "ự": "u",
          "Ự": "U",
          "ữ": "u",
          "Ữ": "U",
          "ử": "u",
          "Ử": "ư",
          "ỷ": "y",
          "Ỷ": "y",
          "ỳ": "y",
          "Ỳ": "Y",
          "ỵ": "y",
          "Ỵ": "Y",
          "ỹ": "y",
          "Ỹ": "Y",
          "ạ": "a",
          "Ạ": "A",
          "ấ": "a",
          "Ấ": "A",
          "ầ": "a",
          "Ầ": "A",
          "ậ": "a",
          "Ậ": "A",
          "ẫ": "a",
          "Ẫ": "A",
          "ắ": "a",
          "Ắ": "A",
          "ằ": "a",
          "Ằ": "A",
          "ặ": "a",
          "Ặ": "A",
          "ẵ": "a",
          "Ẵ": "A",
          "⓪": "0",
          "①": "1",
          "②": "2",
          "③": "3",
          "④": "4",
          "⑤": "5",
          "⑥": "6",
          "⑦": "7",
          "⑧": "8",
          "⑨": "9",
          "⑩": "10",
          "⑪": "11",
          "⑫": "12",
          "⑬": "13",
          "⑭": "14",
          "⑮": "15",
          "⑯": "16",
          "⑰": "17",
          "⑱": "18",
          "⑲": "18",
          "⑳": "18",
          "⓵": "1",
          "⓶": "2",
          "⓷": "3",
          "⓸": "4",
          "⓹": "5",
          "⓺": "6",
          "⓻": "7",
          "⓼": "8",
          "⓽": "9",
          "⓾": "10",
          "⓿": "0",
          "⓫": "11",
          "⓬": "12",
          "⓭": "13",
          "⓮": "14",
          "⓯": "15",
          "⓰": "16",
          "⓱": "17",
          "⓲": "18",
          "⓳": "19",
          "⓴": "20",
          "Ⓐ": "A",
          "Ⓑ": "B",
          "Ⓒ": "C",
          "Ⓓ": "D",
          "Ⓔ": "E",
          "Ⓕ": "F",
          "Ⓖ": "G",
          "Ⓗ": "H",
          "Ⓘ": "I",
          "Ⓙ": "J",
          "Ⓚ": "K",
          "Ⓛ": "L",
          "Ⓜ": "M",
          "Ⓝ": "N",
          "Ⓞ": "O",
          "Ⓟ": "P",
          "Ⓠ": "Q",
          "Ⓡ": "R",
          "Ⓢ": "S",
          "Ⓣ": "T",
          "Ⓤ": "U",
          "Ⓥ": "V",
          "Ⓦ": "W",
          "Ⓧ": "X",
          "Ⓨ": "Y",
          "Ⓩ": "Z",
          "ⓐ": "a",
          "ⓑ": "b",
          "ⓒ": "c",
          "ⓓ": "d",
          "ⓔ": "e",
          "ⓕ": "f",
          "ⓖ": "g",
          "ⓗ": "h",
          "ⓘ": "i",
          "ⓙ": "j",
          "ⓚ": "k",
          "ⓛ": "l",
          "ⓜ": "m",
          "ⓝ": "n",
          "ⓞ": "o",
          "ⓟ": "p",
          "ⓠ": "q",
          "ⓡ": "r",
          "ⓢ": "s",
          "ⓣ": "t",
          "ⓤ": "u",
          "ⓦ": "v",
          "ⓥ": "w",
          "ⓧ": "x",
          "ⓨ": "y",
          "ⓩ": "z",
          "“": '"',
          "”": '"',
          "‘": "'",
          "’": "'",
          "∂": "d",
          "ƒ": "f",
          "™": "(TM)",
          "©": "(C)",
          "œ": "oe",
          "Œ": "OE",
          "®": "(R)",
          "†": "+",
          "℠": "(SM)",
          "…": "...",
          "˚": "o",
          "º": "o",
          "ª": "a",
          "•": "*",
          "၊": ",",
          "။": ".",
          $: "USD",
          "€": "EUR",
          "₢": "BRN",
          "₣": "FRF",
          "£": "GBP",
          "₤": "ITL",
          "₦": "NGN",
          "₧": "ESP",
          "₩": "KRW",
          "₪": "ILS",
          "₫": "VND",
          "₭": "LAK",
          "₮": "MNT",
          "₯": "GRD",
          "₱": "ARS",
          "₲": "PYG",
          "₳": "ARA",
          "₴": "UAH",
          "₵": "GHS",
          "¢": "cent",
          "¥": "CNY",
          "元": "CNY",
          "円": "YEN",
          "﷼": "IRR",
          "₠": "EWE",
          "฿": "THB",
          "₨": "INR",
          "₹": "INR",
          "₰": "PF",
          "₺": "TRY",
          "؋": "AFN",
          "₼": "AZN",
          "лв": "BGN",
          "៛": "KHR",
          "₡": "CRC",
          "₸": "KZT",
          "ден": "MKD",
          "zł": "PLN",
          "₽": "RUB",
          "₾": "GEL"
        };
        var lookAheadCharArray = [
          "်",
          "ް"
        ];
        var diatricMap = {
          "ာ": "a",
          "ါ": "a",
          "ေ": "e",
          "ဲ": "e",
          "ိ": "i",
          "ီ": "i",
          "ို": "o",
          "ု": "u",
          "ူ": "u",
          "ေါင်": "aung",
          "ော": "aw",
          "ော်": "aw",
          "ေါ": "aw",
          "ေါ်": "aw",
          "်": "်",
          "က်": "et",
          "ိုက်": "aik",
          "ောက်": "auk",
          "င်": "in",
          "ိုင်": "aing",
          "ောင်": "aung",
          "စ်": "it",
          "ည်": "i",
          "တ်": "at",
          "ိတ်": "eik",
          "ုတ်": "ok",
          "ွတ်": "ut",
          "ေတ်": "it",
          "ဒ်": "d",
          "ိုဒ်": "ok",
          "ုဒ်": "ait",
          "န်": "an",
          "ာန်": "an",
          "ိန်": "ein",
          "ုန်": "on",
          "ွန်": "un",
          "ပ်": "at",
          "ိပ်": "eik",
          "ုပ်": "ok",
          "ွပ်": "ut",
          "န်ုပ်": "nub",
          "မ်": "an",
          "ိမ်": "ein",
          "ုမ်": "on",
          "ွမ်": "un",
          "ယ်": "e",
          "ိုလ်": "ol",
          "ဉ်": "in",
          "ံ": "an",
          "ိံ": "ein",
          "ုံ": "on",
          "ައް": "ah",
          "ަށް": "ah"
        };
        var langCharMap = {
          en: {},
          az: {
            "ç": "c",
            "ə": "e",
            "ğ": "g",
            "ı": "i",
            "ö": "o",
            "ş": "s",
            "ü": "u",
            "Ç": "C",
            "Ə": "E",
            "Ğ": "G",
            "İ": "I",
            "Ö": "O",
            "Ş": "S",
            "Ü": "U"
          },
          cs: {
            "č": "c",
            "ď": "d",
            "ě": "e",
            "ň": "n",
            "ř": "r",
            "š": "s",
            "ť": "t",
            "ů": "u",
            "ž": "z",
            "Č": "C",
            "Ď": "D",
            "Ě": "E",
            "Ň": "N",
            "Ř": "R",
            "Š": "S",
            "Ť": "T",
            "Ů": "U",
            "Ž": "Z"
          },
          fi: {
            "ä": "a",
            "Ä": "A",
            "ö": "o",
            "Ö": "O"
          },
          hu: {
            "ä": "a",
            "Ä": "A",
            "ö": "o",
            "Ö": "O",
            "ü": "u",
            "Ü": "U",
            "ű": "u",
            "Ű": "U"
          },
          lt: {
            "ą": "a",
            "č": "c",
            "ę": "e",
            "ė": "e",
            "į": "i",
            "š": "s",
            "ų": "u",
            "ū": "u",
            "ž": "z",
            "Ą": "A",
            "Č": "C",
            "Ę": "E",
            "Ė": "E",
            "Į": "I",
            "Š": "S",
            "Ų": "U",
            "Ū": "U"
          },
          lv: {
            "ā": "a",
            "č": "c",
            "ē": "e",
            "ģ": "g",
            "ī": "i",
            "ķ": "k",
            "ļ": "l",
            "ņ": "n",
            "š": "s",
            "ū": "u",
            "ž": "z",
            "Ā": "A",
            "Č": "C",
            "Ē": "E",
            "Ģ": "G",
            "Ī": "i",
            "Ķ": "k",
            "Ļ": "L",
            "Ņ": "N",
            "Š": "S",
            "Ū": "u",
            "Ž": "Z"
          },
          pl: {
            "ą": "a",
            "ć": "c",
            "ę": "e",
            "ł": "l",
            "ń": "n",
            "ó": "o",
            "ś": "s",
            "ź": "z",
            "ż": "z",
            "Ą": "A",
            "Ć": "C",
            "Ę": "e",
            "Ł": "L",
            "Ń": "N",
            "Ó": "O",
            "Ś": "S",
            "Ź": "Z",
            "Ż": "Z"
          },
          sv: {
            "ä": "a",
            "Ä": "A",
            "ö": "o",
            "Ö": "O"
          },
          sk: {
            "ä": "a",
            "Ä": "A"
          },
          sr: {
            "љ": "lj",
            "њ": "nj",
            "Љ": "Lj",
            "Њ": "Nj",
            "đ": "dj",
            "Đ": "Dj"
          },
          tr: {
            "Ü": "U",
            "Ö": "O",
            "ü": "u",
            "ö": "o"
          }
        };
        var symbolMap = {
          ar: {
            "∆": "delta",
            "∞": "la-nihaya",
            "♥": "hob",
            "&": "wa",
            "|": "aw",
            "<": "aqal-men",
            ">": "akbar-men",
            "∑": "majmou",
            "¤": "omla"
          },
          az: {},
          ca: {
            "∆": "delta",
            "∞": "infinit",
            "♥": "amor",
            "&": "i",
            "|": "o",
            "<": "menys que",
            ">": "mes que",
            "∑": "suma dels",
            "¤": "moneda"
          },
          cs: {
            "∆": "delta",
            "∞": "nekonecno",
            "♥": "laska",
            "&": "a",
            "|": "nebo",
            "<": "mensi nez",
            ">": "vetsi nez",
            "∑": "soucet",
            "¤": "mena"
          },
          de: {
            "∆": "delta",
            "∞": "unendlich",
            "♥": "Liebe",
            "&": "und",
            "|": "oder",
            "<": "kleiner als",
            ">": "groesser als",
            "∑": "Summe von",
            "¤": "Waehrung"
          },
          dv: {
            "∆": "delta",
            "∞": "kolunulaa",
            "♥": "loabi",
            "&": "aai",
            "|": "noonee",
            "<": "ah vure kuda",
            ">": "ah vure bodu",
            "∑": "jumula",
            "¤": "faisaa"
          },
          en: {
            "∆": "delta",
            "∞": "infinity",
            "♥": "love",
            "&": "and",
            "|": "or",
            "<": "less than",
            ">": "greater than",
            "∑": "sum",
            "¤": "currency"
          },
          es: {
            "∆": "delta",
            "∞": "infinito",
            "♥": "amor",
            "&": "y",
            "|": "u",
            "<": "menos que",
            ">": "mas que",
            "∑": "suma de los",
            "¤": "moneda"
          },
          fa: {
            "∆": "delta",
            "∞": "bi-nahayat",
            "♥": "eshgh",
            "&": "va",
            "|": "ya",
            "<": "kamtar-az",
            ">": "bishtar-az",
            "∑": "majmooe",
            "¤": "vahed"
          },
          fi: {
            "∆": "delta",
            "∞": "aarettomyys",
            "♥": "rakkaus",
            "&": "ja",
            "|": "tai",
            "<": "pienempi kuin",
            ">": "suurempi kuin",
            "∑": "summa",
            "¤": "valuutta"
          },
          fr: {
            "∆": "delta",
            "∞": "infiniment",
            "♥": "Amour",
            "&": "et",
            "|": "ou",
            "<": "moins que",
            ">": "superieure a",
            "∑": "somme des",
            "¤": "monnaie"
          },
          ge: {
            "∆": "delta",
            "∞": "usasruloba",
            "♥": "siqvaruli",
            "&": "da",
            "|": "an",
            "<": "naklebi",
            ">": "meti",
            "∑": "jami",
            "¤": "valuta"
          },
          gr: {},
          hu: {
            "∆": "delta",
            "∞": "vegtelen",
            "♥": "szerelem",
            "&": "es",
            "|": "vagy",
            "<": "kisebb mint",
            ">": "nagyobb mint",
            "∑": "szumma",
            "¤": "penznem"
          },
          it: {
            "∆": "delta",
            "∞": "infinito",
            "♥": "amore",
            "&": "e",
            "|": "o",
            "<": "minore di",
            ">": "maggiore di",
            "∑": "somma",
            "¤": "moneta"
          },
          lt: {
            "∆": "delta",
            "∞": "begalybe",
            "♥": "meile",
            "&": "ir",
            "|": "ar",
            "<": "maziau nei",
            ">": "daugiau nei",
            "∑": "suma",
            "¤": "valiuta"
          },
          lv: {
            "∆": "delta",
            "∞": "bezgaliba",
            "♥": "milestiba",
            "&": "un",
            "|": "vai",
            "<": "mazak neka",
            ">": "lielaks neka",
            "∑": "summa",
            "¤": "valuta"
          },
          my: {
            "∆": "kwahkhyaet",
            "∞": "asaonasme",
            "♥": "akhyait",
            "&": "nhin",
            "|": "tho",
            "<": "ngethaw",
            ">": "kyithaw",
            "∑": "paungld",
            "¤": "ngwekye"
          },
          mk: {},
          nl: {
            "∆": "delta",
            "∞": "oneindig",
            "♥": "liefde",
            "&": "en",
            "|": "of",
            "<": "kleiner dan",
            ">": "groter dan",
            "∑": "som",
            "¤": "valuta"
          },
          pl: {
            "∆": "delta",
            "∞": "nieskonczonosc",
            "♥": "milosc",
            "&": "i",
            "|": "lub",
            "<": "mniejsze niz",
            ">": "wieksze niz",
            "∑": "suma",
            "¤": "waluta"
          },
          pt: {
            "∆": "delta",
            "∞": "infinito",
            "♥": "amor",
            "&": "e",
            "|": "ou",
            "<": "menor que",
            ">": "maior que",
            "∑": "soma",
            "¤": "moeda"
          },
          ro: {
            "∆": "delta",
            "∞": "infinit",
            "♥": "dragoste",
            "&": "si",
            "|": "sau",
            "<": "mai mic ca",
            ">": "mai mare ca",
            "∑": "suma",
            "¤": "valuta"
          },
          ru: {
            "∆": "delta",
            "∞": "beskonechno",
            "♥": "lubov",
            "&": "i",
            "|": "ili",
            "<": "menshe",
            ">": "bolshe",
            "∑": "summa",
            "¤": "valjuta"
          },
          sk: {
            "∆": "delta",
            "∞": "nekonecno",
            "♥": "laska",
            "&": "a",
            "|": "alebo",
            "<": "menej ako",
            ">": "viac ako",
            "∑": "sucet",
            "¤": "mena"
          },
          sr: {},
          tr: {
            "∆": "delta",
            "∞": "sonsuzluk",
            "♥": "ask",
            "&": "ve",
            "|": "veya",
            "<": "kucuktur",
            ">": "buyuktur",
            "∑": "toplam",
            "¤": "para birimi"
          },
          uk: {
            "∆": "delta",
            "∞": "bezkinechnist",
            "♥": "lubov",
            "&": "i",
            "|": "abo",
            "<": "menshe",
            ">": "bilshe",
            "∑": "suma",
            "¤": "valjuta"
          },
          vn: {
            "∆": "delta",
            "∞": "vo cuc",
            "♥": "yeu",
            "&": "va",
            "|": "hoac",
            "<": "nho hon",
            ">": "lon hon",
            "∑": "tong",
            "¤": "tien te"
          }
        };
        var uricChars = [";", "?", ":", "@", "&", "=", "+", "$", ",", "/"].join("");
        var uricNoSlashChars = [";", "?", ":", "@", "&", "=", "+", "$", ","].join("");
        var markChars = [".", "!", "~", "*", "'", "(", ")"].join("");
        var getSlug = function getSlug2(input, opts) {
          var separator = "-";
          var result = "";
          var diatricString = "";
          var convertSymbols = true;
          var customReplacements = {};
          var maintainCase;
          var titleCase;
          var truncate;
          var uricFlag;
          var uricNoSlashFlag;
          var markFlag;
          var symbol;
          var langChar;
          var lucky;
          var i;
          var ch;
          var l;
          var lastCharWasSymbol;
          var lastCharWasDiatric;
          var allowedChars = "";
          if (typeof input !== "string") {
            return "";
          }
          if (typeof opts === "string") {
            separator = opts;
          }
          symbol = symbolMap.en;
          langChar = langCharMap.en;
          if (typeof opts === "object") {
            maintainCase = opts.maintainCase || false;
            customReplacements = opts.custom && typeof opts.custom === "object" ? opts.custom : customReplacements;
            truncate = +opts.truncate > 1 && opts.truncate || false;
            uricFlag = opts.uric || false;
            uricNoSlashFlag = opts.uricNoSlash || false;
            markFlag = opts.mark || false;
            convertSymbols = opts.symbols === false || opts.lang === false ? false : true;
            separator = opts.separator || separator;
            if (uricFlag) {
              allowedChars += uricChars;
            }
            if (uricNoSlashFlag) {
              allowedChars += uricNoSlashChars;
            }
            if (markFlag) {
              allowedChars += markChars;
            }
            symbol = opts.lang && symbolMap[opts.lang] && convertSymbols ? symbolMap[opts.lang] : convertSymbols ? symbolMap.en : {};
            langChar = opts.lang && langCharMap[opts.lang] ? langCharMap[opts.lang] : opts.lang === false || opts.lang === true ? {} : langCharMap.en;
            if (opts.titleCase && typeof opts.titleCase.length === "number" && Array.prototype.toString.call(opts.titleCase)) {
              opts.titleCase.forEach(function(v) {
                customReplacements[v + ""] = v + "";
              });
              titleCase = true;
            } else {
              titleCase = !!opts.titleCase;
            }
            if (opts.custom && typeof opts.custom.length === "number" && Array.prototype.toString.call(opts.custom)) {
              opts.custom.forEach(function(v) {
                customReplacements[v + ""] = v + "";
              });
            }
            Object.keys(customReplacements).forEach(function(v) {
              var r;
              if (v.length > 1) {
                r = new RegExp("\\b" + escapeChars(v) + "\\b", "gi");
              } else {
                r = new RegExp(escapeChars(v), "gi");
              }
              input = input.replace(r, customReplacements[v]);
            });
            for (ch in customReplacements) {
              allowedChars += ch;
            }
          }
          allowedChars += separator;
          allowedChars = escapeChars(allowedChars);
          input = input.replace(/(^\s+|\s+$)/g, "");
          lastCharWasSymbol = false;
          lastCharWasDiatric = false;
          for (i = 0, l = input.length;i < l; i++) {
            ch = input[i];
            if (isReplacedCustomChar(ch, customReplacements)) {
              lastCharWasSymbol = false;
            } else if (langChar[ch]) {
              ch = lastCharWasSymbol && langChar[ch].match(/[A-Za-z0-9]/) ? " " + langChar[ch] : langChar[ch];
              lastCharWasSymbol = false;
            } else if (ch in charMap) {
              if (i + 1 < l && lookAheadCharArray.indexOf(input[i + 1]) >= 0) {
                diatricString += ch;
                ch = "";
              } else if (lastCharWasDiatric === true) {
                ch = diatricMap[diatricString] + charMap[ch];
                diatricString = "";
              } else {
                ch = lastCharWasSymbol && charMap[ch].match(/[A-Za-z0-9]/) ? " " + charMap[ch] : charMap[ch];
              }
              lastCharWasSymbol = false;
              lastCharWasDiatric = false;
            } else if (ch in diatricMap) {
              diatricString += ch;
              ch = "";
              if (i === l - 1) {
                ch = diatricMap[diatricString];
              }
              lastCharWasDiatric = true;
            } else if (symbol[ch] && !(uricFlag && uricChars.indexOf(ch) !== -1) && !(uricNoSlashFlag && uricNoSlashChars.indexOf(ch) !== -1)) {
              ch = lastCharWasSymbol || result.substr(-1).match(/[A-Za-z0-9]/) ? separator + symbol[ch] : symbol[ch];
              ch += input[i + 1] !== undefined && input[i + 1].match(/[A-Za-z0-9]/) ? separator : "";
              lastCharWasSymbol = true;
            } else {
              if (lastCharWasDiatric === true) {
                ch = diatricMap[diatricString] + ch;
                diatricString = "";
                lastCharWasDiatric = false;
              } else if (lastCharWasSymbol && (/[A-Za-z0-9]/.test(ch) || result.substr(-1).match(/A-Za-z0-9]/))) {
                ch = " " + ch;
              }
              lastCharWasSymbol = false;
            }
            result += ch.replace(new RegExp("[^\\w\\s" + allowedChars + "_-]", "g"), separator);
          }
          if (titleCase) {
            result = result.replace(/(\w)(\S*)/g, function(_, i2, r) {
              var j = i2.toUpperCase() + (r !== null ? r : "");
              return Object.keys(customReplacements).indexOf(j.toLowerCase()) < 0 ? j : j.toLowerCase();
            });
          }
          result = result.replace(/\s+/g, separator).replace(new RegExp("\\" + separator + "+", "g"), separator).replace(new RegExp("(^\\" + separator + "+|\\" + separator + "+$)", "g"), "");
          if (truncate && result.length > truncate) {
            lucky = result.charAt(truncate) === separator;
            result = result.slice(0, truncate);
            if (!lucky) {
              result = result.slice(0, result.lastIndexOf(separator));
            }
          }
          if (!maintainCase && !titleCase) {
            result = result.toLowerCase();
          }
          return result;
        };
        var createSlug = function createSlug2(opts) {
          return function getSlugWithConfig(input) {
            return getSlug(input, opts);
          };
        };
        var escapeChars = function escapeChars2(input) {
          return input.replace(/[-\\^$*+?.()|[\]{}\/]/g, "\\$&");
        };
        var isReplacedCustomChar = function(ch, customReplacements) {
          for (var c in customReplacements) {
            if (customReplacements[c] === ch) {
              return true;
            }
          }
        };
        if (typeof module !== "undefined" && module.exports) {
          module.exports = getSlug;
          module.exports.createSlug = createSlug;
        } else if (typeof define !== "undefined" && define.amd) {
          define([], function() {
            return getSlug;
          });
        } else {
          try {
            if (root.getSlug || root.createSlug) {
              throw "speakingurl: globals exists /(getSlug|createSlug)/";
            } else {
              root.getSlug = getSlug;
              root.createSlug = createSlug;
            }
          } catch (e) {}
        }
      })(exports);
    }
  });
  var require_speakingurl2 = __commonJS2({
    "../../node_modules/.pnpm/speakingurl@14.0.1/node_modules/speakingurl/index.js"(exports, module) {
      init_esm_shims2();
      module.exports = require_speakingurl();
    }
  });
  init_esm_shims2();
  init_esm_shims2();
  init_esm_shims2();
  init_esm_shims2();
  init_esm_shims2();
  init_esm_shims2();
  init_esm_shims2();
  init_esm_shims2();
  function getComponentTypeName(options) {
    var _a25;
    const name = options.name || options._componentTag || options.__VUE_DEVTOOLS_COMPONENT_GUSSED_NAME__ || options.__name;
    if (name === "index" && ((_a25 = options.__file) == null ? undefined : _a25.endsWith("index.vue"))) {
      return "";
    }
    return name;
  }
  function getComponentFileName(options) {
    const file = options.__file;
    if (file)
      return classify2(basename(file, ".vue"));
  }
  function saveComponentGussedName(instance, name) {
    instance.type.__VUE_DEVTOOLS_COMPONENT_GUSSED_NAME__ = name;
    return name;
  }
  function getAppRecord(instance) {
    if (instance.__VUE_DEVTOOLS_NEXT_APP_RECORD__)
      return instance.__VUE_DEVTOOLS_NEXT_APP_RECORD__;
    else if (instance.root)
      return instance.appContext.app.__VUE_DEVTOOLS_NEXT_APP_RECORD__;
  }
  function isFragment(instance) {
    var _a25, _b25;
    const subTreeType = (_a25 = instance.subTree) == null ? undefined : _a25.type;
    const appRecord = getAppRecord(instance);
    if (appRecord) {
      return ((_b25 = appRecord == null ? undefined : appRecord.types) == null ? undefined : _b25.Fragment) === subTreeType;
    }
    return false;
  }
  function getInstanceName(instance) {
    var _a25, _b25, _c;
    const name = getComponentTypeName((instance == null ? undefined : instance.type) || {});
    if (name)
      return name;
    if ((instance == null ? undefined : instance.root) === instance)
      return "Root";
    for (const key in (_b25 = (_a25 = instance.parent) == null ? undefined : _a25.type) == null ? undefined : _b25.components) {
      if (instance.parent.type.components[key] === (instance == null ? undefined : instance.type))
        return saveComponentGussedName(instance, key);
    }
    for (const key in (_c = instance.appContext) == null ? undefined : _c.components) {
      if (instance.appContext.components[key] === (instance == null ? undefined : instance.type))
        return saveComponentGussedName(instance, key);
    }
    const fileName = getComponentFileName((instance == null ? undefined : instance.type) || {});
    if (fileName)
      return fileName;
    return "Anonymous Component";
  }
  function getUniqueComponentId(instance) {
    var _a25, _b25, _c;
    const appId = (_c = (_b25 = (_a25 = instance == null ? undefined : instance.appContext) == null ? undefined : _a25.app) == null ? undefined : _b25.__VUE_DEVTOOLS_NEXT_APP_RECORD_ID__) != null ? _c : 0;
    const instanceId = instance === (instance == null ? undefined : instance.root) ? "root" : instance.uid;
    return `${appId}:${instanceId}`;
  }
  function getComponentInstance(appRecord, instanceId) {
    instanceId = instanceId || `${appRecord.id}:root`;
    const instance = appRecord.instanceMap.get(instanceId);
    return instance || appRecord.instanceMap.get(":root");
  }
  function createRect() {
    const rect = {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      get width() {
        return rect.right - rect.left;
      },
      get height() {
        return rect.bottom - rect.top;
      }
    };
    return rect;
  }
  var range;
  function getTextRect(node) {
    if (!range)
      range = document.createRange();
    range.selectNode(node);
    return range.getBoundingClientRect();
  }
  function getFragmentRect(vnode) {
    const rect = createRect();
    if (!vnode.children)
      return rect;
    for (let i = 0, l = vnode.children.length;i < l; i++) {
      const childVnode = vnode.children[i];
      let childRect;
      if (childVnode.component) {
        childRect = getComponentBoundingRect(childVnode.component);
      } else if (childVnode.el) {
        const el = childVnode.el;
        if (el.nodeType === 1 || el.getBoundingClientRect)
          childRect = el.getBoundingClientRect();
        else if (el.nodeType === 3 && el.data.trim())
          childRect = getTextRect(el);
      }
      if (childRect)
        mergeRects(rect, childRect);
    }
    return rect;
  }
  function mergeRects(a, b) {
    if (!a.top || b.top < a.top)
      a.top = b.top;
    if (!a.bottom || b.bottom > a.bottom)
      a.bottom = b.bottom;
    if (!a.left || b.left < a.left)
      a.left = b.left;
    if (!a.right || b.right > a.right)
      a.right = b.right;
    return a;
  }
  var DEFAULT_RECT = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: 0,
    height: 0
  };
  function getComponentBoundingRect(instance) {
    const el = instance.subTree.el;
    if (typeof window === "undefined") {
      return DEFAULT_RECT;
    }
    if (isFragment(instance))
      return getFragmentRect(instance.subTree);
    else if ((el == null ? undefined : el.nodeType) === 1)
      return el == null ? undefined : el.getBoundingClientRect();
    else if (instance.subTree.component)
      return getComponentBoundingRect(instance.subTree.component);
    else
      return DEFAULT_RECT;
  }
  init_esm_shims2();
  function getRootElementsFromComponentInstance(instance) {
    if (isFragment(instance))
      return getFragmentRootElements(instance.subTree);
    if (!instance.subTree)
      return [];
    return [instance.subTree.el];
  }
  function getFragmentRootElements(vnode) {
    if (!vnode.children)
      return [];
    const list = [];
    vnode.children.forEach((childVnode) => {
      if (childVnode.component)
        list.push(...getRootElementsFromComponentInstance(childVnode.component));
      else if (childVnode == null ? undefined : childVnode.el)
        list.push(childVnode.el);
    });
    return list;
  }
  var CONTAINER_ELEMENT_ID = "__vue-devtools-component-inspector__";
  var CARD_ELEMENT_ID = "__vue-devtools-component-inspector__card__";
  var COMPONENT_NAME_ELEMENT_ID = "__vue-devtools-component-inspector__name__";
  var INDICATOR_ELEMENT_ID = "__vue-devtools-component-inspector__indicator__";
  var containerStyles = {
    display: "block",
    zIndex: 2147483640,
    position: "fixed",
    backgroundColor: "#42b88325",
    border: "1px solid #42b88350",
    borderRadius: "5px",
    transition: "all 0.1s ease-in",
    pointerEvents: "none"
  };
  var cardStyles = {
    fontFamily: "Arial, Helvetica, sans-serif",
    padding: "5px 8px",
    borderRadius: "4px",
    textAlign: "left",
    position: "absolute",
    left: 0,
    color: "#e9e9e9",
    fontSize: "14px",
    fontWeight: 600,
    lineHeight: "24px",
    backgroundColor: "#42b883",
    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)"
  };
  var indicatorStyles = {
    display: "inline-block",
    fontWeight: 400,
    fontStyle: "normal",
    fontSize: "12px",
    opacity: 0.7
  };
  function getContainerElement() {
    return document.getElementById(CONTAINER_ELEMENT_ID);
  }
  function getCardElement() {
    return document.getElementById(CARD_ELEMENT_ID);
  }
  function getIndicatorElement() {
    return document.getElementById(INDICATOR_ELEMENT_ID);
  }
  function getNameElement() {
    return document.getElementById(COMPONENT_NAME_ELEMENT_ID);
  }
  function getStyles(bounds) {
    return {
      left: `${Math.round(bounds.left * 100) / 100}px`,
      top: `${Math.round(bounds.top * 100) / 100}px`,
      width: `${Math.round(bounds.width * 100) / 100}px`,
      height: `${Math.round(bounds.height * 100) / 100}px`
    };
  }
  function create(options) {
    var _a25;
    const containerEl = document.createElement("div");
    containerEl.id = (_a25 = options.elementId) != null ? _a25 : CONTAINER_ELEMENT_ID;
    Object.assign(containerEl.style, {
      ...containerStyles,
      ...getStyles(options.bounds),
      ...options.style
    });
    const cardEl = document.createElement("span");
    cardEl.id = CARD_ELEMENT_ID;
    Object.assign(cardEl.style, {
      ...cardStyles,
      top: options.bounds.top < 35 ? 0 : "-35px"
    });
    const nameEl = document.createElement("span");
    nameEl.id = COMPONENT_NAME_ELEMENT_ID;
    nameEl.innerHTML = `&lt;${options.name}&gt;&nbsp;&nbsp;`;
    const indicatorEl = document.createElement("i");
    indicatorEl.id = INDICATOR_ELEMENT_ID;
    indicatorEl.innerHTML = `${Math.round(options.bounds.width * 100) / 100} x ${Math.round(options.bounds.height * 100) / 100}`;
    Object.assign(indicatorEl.style, indicatorStyles);
    cardEl.appendChild(nameEl);
    cardEl.appendChild(indicatorEl);
    containerEl.appendChild(cardEl);
    document.body.appendChild(containerEl);
    return containerEl;
  }
  function update(options) {
    const containerEl = getContainerElement();
    const cardEl = getCardElement();
    const nameEl = getNameElement();
    const indicatorEl = getIndicatorElement();
    if (containerEl) {
      Object.assign(containerEl.style, {
        ...containerStyles,
        ...getStyles(options.bounds)
      });
      Object.assign(cardEl.style, {
        top: options.bounds.top < 35 ? 0 : "-35px"
      });
      nameEl.innerHTML = `&lt;${options.name}&gt;&nbsp;&nbsp;`;
      indicatorEl.innerHTML = `${Math.round(options.bounds.width * 100) / 100} x ${Math.round(options.bounds.height * 100) / 100}`;
    }
  }
  function highlight(instance) {
    const bounds = getComponentBoundingRect(instance);
    if (!bounds.width && !bounds.height)
      return;
    const name = getInstanceName(instance);
    const container = getContainerElement();
    container ? update({ bounds, name }) : create({ bounds, name });
  }
  function unhighlight() {
    const el = getContainerElement();
    if (el)
      el.style.display = "none";
  }
  var inspectInstance = null;
  function inspectFn(e) {
    const target22 = e.target;
    if (target22) {
      const instance = target22.__vueParentComponent;
      if (instance) {
        inspectInstance = instance;
        const el = instance.vnode.el;
        if (el) {
          const bounds = getComponentBoundingRect(instance);
          const name = getInstanceName(instance);
          const container = getContainerElement();
          container ? update({ bounds, name }) : create({ bounds, name });
        }
      }
    }
  }
  function selectComponentFn(e, cb) {
    e.preventDefault();
    e.stopPropagation();
    if (inspectInstance) {
      const uniqueComponentId = getUniqueComponentId(inspectInstance);
      cb(uniqueComponentId);
    }
  }
  var inspectComponentHighLighterSelectFn = null;
  function cancelInspectComponentHighLighter() {
    unhighlight();
    window.removeEventListener("mouseover", inspectFn);
    window.removeEventListener("click", inspectComponentHighLighterSelectFn, true);
    inspectComponentHighLighterSelectFn = null;
  }
  function inspectComponentHighLighter() {
    window.addEventListener("mouseover", inspectFn);
    return new Promise((resolve) => {
      function onSelect(e) {
        e.preventDefault();
        e.stopPropagation();
        selectComponentFn(e, (id) => {
          window.removeEventListener("click", onSelect, true);
          inspectComponentHighLighterSelectFn = null;
          window.removeEventListener("mouseover", inspectFn);
          const el = getContainerElement();
          if (el)
            el.style.display = "none";
          resolve(JSON.stringify({ id }));
        });
      }
      inspectComponentHighLighterSelectFn = onSelect;
      window.addEventListener("click", onSelect, true);
    });
  }
  function scrollToComponent(options) {
    const instance = getComponentInstance(activeAppRecord.value, options.id);
    if (instance) {
      const [el] = getRootElementsFromComponentInstance(instance);
      if (typeof el.scrollIntoView === "function") {
        el.scrollIntoView({
          behavior: "smooth"
        });
      } else {
        const bounds = getComponentBoundingRect(instance);
        const scrollTarget = document.createElement("div");
        const styles = {
          ...getStyles(bounds),
          position: "absolute"
        };
        Object.assign(scrollTarget.style, styles);
        document.body.appendChild(scrollTarget);
        scrollTarget.scrollIntoView({
          behavior: "smooth"
        });
        setTimeout(() => {
          document.body.removeChild(scrollTarget);
        }, 2000);
      }
      setTimeout(() => {
        const bounds = getComponentBoundingRect(instance);
        if (bounds.width || bounds.height) {
          const name = getInstanceName(instance);
          const el2 = getContainerElement();
          el2 ? update({ ...options, name, bounds }) : create({ ...options, name, bounds });
          setTimeout(() => {
            if (el2)
              el2.style.display = "none";
          }, 1500);
        }
      }, 1200);
    }
  }
  init_esm_shims2();
  var _a2;
  var _b;
  (_b = (_a2 = target).__VUE_DEVTOOLS_COMPONENT_INSPECTOR_ENABLED__) != null || (_a2.__VUE_DEVTOOLS_COMPONENT_INSPECTOR_ENABLED__ = true);
  function waitForInspectorInit(cb) {
    let total = 0;
    const timer = setInterval(() => {
      if (target.__VUE_INSPECTOR__) {
        clearInterval(timer);
        total += 30;
        cb();
      }
      if (total >= 5000)
        clearInterval(timer);
    }, 30);
  }
  function setupInspector() {
    const inspector = target.__VUE_INSPECTOR__;
    const _openInEditor = inspector.openInEditor;
    inspector.openInEditor = async (...params) => {
      inspector.disable();
      _openInEditor(...params);
    };
  }
  function getComponentInspector() {
    return new Promise((resolve) => {
      function setup() {
        setupInspector();
        resolve(target.__VUE_INSPECTOR__);
      }
      if (!target.__VUE_INSPECTOR__) {
        waitForInspectorInit(() => {
          setup();
        });
      } else {
        setup();
      }
    });
  }
  init_esm_shims2();
  init_esm_shims2();
  function isReadonly2(value) {
    return !!(value && value["__v_isReadonly"]);
  }
  function isReactive2(value) {
    if (isReadonly2(value)) {
      return isReactive2(value["__v_raw"]);
    }
    return !!(value && value["__v_isReactive"]);
  }
  function isRef3(r) {
    return !!(r && r.__v_isRef === true);
  }
  function toRaw2(observed) {
    const raw = observed && observed["__v_raw"];
    return raw ? toRaw2(raw) : observed;
  }
  var Fragment2 = Symbol.for("v-fgt");
  var StateEditor = class {
    constructor() {
      this.refEditor = new RefStateEditor;
    }
    set(object, path, value, cb) {
      const sections = Array.isArray(path) ? path : path.split(".");
      const markRef = false;
      while (sections.length > 1) {
        const section = sections.shift();
        if (object instanceof Map)
          object = object.get(section);
        else if (object instanceof Set)
          object = Array.from(object.values())[section];
        else
          object = object[section];
        if (this.refEditor.isRef(object))
          object = this.refEditor.get(object);
      }
      const field = sections[0];
      const item = this.refEditor.get(object)[field];
      if (cb) {
        cb(object, field, value);
      } else {
        if (this.refEditor.isRef(item))
          this.refEditor.set(item, value);
        else if (markRef)
          object[field] = value;
        else
          object[field] = value;
      }
    }
    get(object, path) {
      const sections = Array.isArray(path) ? path : path.split(".");
      for (let i = 0;i < sections.length; i++) {
        if (object instanceof Map)
          object = object.get(sections[i]);
        else
          object = object[sections[i]];
        if (this.refEditor.isRef(object))
          object = this.refEditor.get(object);
        if (!object)
          return;
      }
      return object;
    }
    has(object, path, parent = false) {
      if (typeof object === "undefined")
        return false;
      const sections = Array.isArray(path) ? path.slice() : path.split(".");
      const size = !parent ? 1 : 2;
      while (object && sections.length > size) {
        const section = sections.shift();
        object = object[section];
        if (this.refEditor.isRef(object))
          object = this.refEditor.get(object);
      }
      return object != null && Object.prototype.hasOwnProperty.call(object, sections[0]);
    }
    createDefaultSetCallback(state) {
      return (object, field, value) => {
        if (state.remove || state.newKey) {
          if (Array.isArray(object))
            object.splice(field, 1);
          else if (toRaw2(object) instanceof Map)
            object.delete(field);
          else if (toRaw2(object) instanceof Set)
            object.delete(Array.from(object.values())[field]);
          else
            Reflect.deleteProperty(object, field);
        }
        if (!state.remove) {
          const target22 = object[state.newKey || field];
          if (this.refEditor.isRef(target22))
            this.refEditor.set(target22, value);
          else if (toRaw2(object) instanceof Map)
            object.set(state.newKey || field, value);
          else if (toRaw2(object) instanceof Set)
            object.add(value);
          else
            object[state.newKey || field] = value;
        }
      };
    }
  };
  var RefStateEditor = class {
    set(ref2, value) {
      if (isRef3(ref2)) {
        ref2.value = value;
      } else {
        if (ref2 instanceof Set && Array.isArray(value)) {
          ref2.clear();
          value.forEach((v) => ref2.add(v));
          return;
        }
        const currentKeys = Object.keys(value);
        if (ref2 instanceof Map) {
          const previousKeysSet2 = new Set(ref2.keys());
          currentKeys.forEach((key) => {
            ref2.set(key, Reflect.get(value, key));
            previousKeysSet2.delete(key);
          });
          previousKeysSet2.forEach((key) => ref2.delete(key));
          return;
        }
        const previousKeysSet = new Set(Object.keys(ref2));
        currentKeys.forEach((key) => {
          Reflect.set(ref2, key, Reflect.get(value, key));
          previousKeysSet.delete(key);
        });
        previousKeysSet.forEach((key) => Reflect.deleteProperty(ref2, key));
      }
    }
    get(ref2) {
      return isRef3(ref2) ? ref2.value : ref2;
    }
    isRef(ref2) {
      return isRef3(ref2) || isReactive2(ref2);
    }
  };
  var stateEditor = new StateEditor;
  init_esm_shims2();
  init_esm_shims2();
  init_esm_shims2();
  var TIMELINE_LAYERS_STATE_STORAGE_ID = "__VUE_DEVTOOLS_KIT_TIMELINE_LAYERS_STATE__";
  function getTimelineLayersStateFromStorage() {
    if (typeof window === "undefined" || !isBrowser || typeof localStorage === "undefined" || localStorage === null) {
      return {
        recordingState: false,
        mouseEventEnabled: false,
        keyboardEventEnabled: false,
        componentEventEnabled: false,
        performanceEventEnabled: false,
        selected: ""
      };
    }
    const state = typeof localStorage.getItem !== "undefined" ? localStorage.getItem(TIMELINE_LAYERS_STATE_STORAGE_ID) : null;
    return state ? JSON.parse(state) : {
      recordingState: false,
      mouseEventEnabled: false,
      keyboardEventEnabled: false,
      componentEventEnabled: false,
      performanceEventEnabled: false,
      selected: ""
    };
  }
  init_esm_shims2();
  init_esm_shims2();
  init_esm_shims2();
  var _a22;
  var _b2;
  (_b2 = (_a22 = target).__VUE_DEVTOOLS_KIT_TIMELINE_LAYERS) != null || (_a22.__VUE_DEVTOOLS_KIT_TIMELINE_LAYERS = []);
  var devtoolsTimelineLayers = new Proxy(target.__VUE_DEVTOOLS_KIT_TIMELINE_LAYERS, {
    get(target22, prop, receiver) {
      return Reflect.get(target22, prop, receiver);
    }
  });
  function addTimelineLayer(options, descriptor) {
    devtoolsState.timelineLayersState[descriptor.id] = false;
    devtoolsTimelineLayers.push({
      ...options,
      descriptorId: descriptor.id,
      appRecord: getAppRecord(descriptor.app)
    });
  }
  var _a3;
  var _b3;
  (_b3 = (_a3 = target).__VUE_DEVTOOLS_KIT_INSPECTOR__) != null || (_a3.__VUE_DEVTOOLS_KIT_INSPECTOR__ = []);
  var devtoolsInspector = new Proxy(target.__VUE_DEVTOOLS_KIT_INSPECTOR__, {
    get(target22, prop, receiver) {
      return Reflect.get(target22, prop, receiver);
    }
  });
  var callInspectorUpdatedHook = debounce(() => {
    devtoolsContext.hooks.callHook("sendInspectorToClient", getActiveInspectors());
  });
  function addInspector(inspector, descriptor) {
    var _a25, _b25;
    devtoolsInspector.push({
      options: inspector,
      descriptor,
      treeFilterPlaceholder: (_a25 = inspector.treeFilterPlaceholder) != null ? _a25 : "Search tree...",
      stateFilterPlaceholder: (_b25 = inspector.stateFilterPlaceholder) != null ? _b25 : "Search state...",
      treeFilter: "",
      selectedNodeId: "",
      appRecord: getAppRecord(descriptor.app)
    });
    callInspectorUpdatedHook();
  }
  function getActiveInspectors() {
    return devtoolsInspector.filter((inspector) => inspector.descriptor.app === activeAppRecord.value.app).filter((inspector) => inspector.descriptor.id !== "components").map((inspector) => {
      var _a25;
      const descriptor = inspector.descriptor;
      const options = inspector.options;
      return {
        id: options.id,
        label: options.label,
        logo: descriptor.logo,
        icon: `custom-ic-baseline-${(_a25 = options == null ? undefined : options.icon) == null ? undefined : _a25.replace(/_/g, "-")}`,
        packageName: descriptor.packageName,
        homepage: descriptor.homepage,
        pluginId: descriptor.id
      };
    });
  }
  function getInspector(id, app) {
    return devtoolsInspector.find((inspector) => inspector.options.id === id && (app ? inspector.descriptor.app === app : true));
  }
  function createDevToolsCtxHooks() {
    const hooks2 = createHooks();
    hooks2.hook("addInspector", ({ inspector, plugin }) => {
      addInspector(inspector, plugin.descriptor);
    });
    const debounceSendInspectorTree = debounce(async ({ inspectorId, plugin }) => {
      var _a25;
      if (!inspectorId || !((_a25 = plugin == null ? undefined : plugin.descriptor) == null ? undefined : _a25.app) || devtoolsState.highPerfModeEnabled)
        return;
      const inspector = getInspector(inspectorId, plugin.descriptor.app);
      const _payload = {
        app: plugin.descriptor.app,
        inspectorId,
        filter: (inspector == null ? undefined : inspector.treeFilter) || "",
        rootNodes: []
      };
      await new Promise((resolve) => {
        hooks2.callHookWith(async (callbacks) => {
          await Promise.all(callbacks.map((cb) => cb(_payload)));
          resolve();
        }, "getInspectorTree");
      });
      hooks2.callHookWith(async (callbacks) => {
        await Promise.all(callbacks.map((cb) => cb({
          inspectorId,
          rootNodes: _payload.rootNodes
        })));
      }, "sendInspectorTreeToClient");
    }, 120);
    hooks2.hook("sendInspectorTree", debounceSendInspectorTree);
    const debounceSendInspectorState = debounce(async ({ inspectorId, plugin }) => {
      var _a25;
      if (!inspectorId || !((_a25 = plugin == null ? undefined : plugin.descriptor) == null ? undefined : _a25.app) || devtoolsState.highPerfModeEnabled)
        return;
      const inspector = getInspector(inspectorId, plugin.descriptor.app);
      const _payload = {
        app: plugin.descriptor.app,
        inspectorId,
        nodeId: (inspector == null ? undefined : inspector.selectedNodeId) || "",
        state: null
      };
      const ctx = {
        currentTab: `custom-inspector:${inspectorId}`
      };
      if (_payload.nodeId) {
        await new Promise((resolve) => {
          hooks2.callHookWith(async (callbacks) => {
            await Promise.all(callbacks.map((cb) => cb(_payload, ctx)));
            resolve();
          }, "getInspectorState");
        });
      }
      hooks2.callHookWith(async (callbacks) => {
        await Promise.all(callbacks.map((cb) => cb({
          inspectorId,
          nodeId: _payload.nodeId,
          state: _payload.state
        })));
      }, "sendInspectorStateToClient");
    }, 120);
    hooks2.hook("sendInspectorState", debounceSendInspectorState);
    hooks2.hook("customInspectorSelectNode", ({ inspectorId, nodeId, plugin }) => {
      const inspector = getInspector(inspectorId, plugin.descriptor.app);
      if (!inspector)
        return;
      inspector.selectedNodeId = nodeId;
    });
    hooks2.hook("timelineLayerAdded", ({ options, plugin }) => {
      addTimelineLayer(options, plugin.descriptor);
    });
    hooks2.hook("timelineEventAdded", ({ options, plugin }) => {
      var _a25;
      const internalLayerIds = ["performance", "component-event", "keyboard", "mouse"];
      if (devtoolsState.highPerfModeEnabled || !((_a25 = devtoolsState.timelineLayersState) == null ? undefined : _a25[plugin.descriptor.id]) && !internalLayerIds.includes(options.layerId))
        return;
      hooks2.callHookWith(async (callbacks) => {
        await Promise.all(callbacks.map((cb) => cb(options)));
      }, "sendTimelineEventToClient");
    });
    hooks2.hook("getComponentInstances", async ({ app }) => {
      const appRecord = app.__VUE_DEVTOOLS_NEXT_APP_RECORD__;
      if (!appRecord)
        return null;
      const appId = appRecord.id.toString();
      const instances = [...appRecord.instanceMap].filter(([key]) => key.split(":")[0] === appId).map(([, instance]) => instance);
      return instances;
    });
    hooks2.hook("getComponentBounds", async ({ instance }) => {
      const bounds = getComponentBoundingRect(instance);
      return bounds;
    });
    hooks2.hook("getComponentName", ({ instance }) => {
      const name = getInstanceName(instance);
      return name;
    });
    hooks2.hook("componentHighlight", ({ uid: uid2 }) => {
      const instance = activeAppRecord.value.instanceMap.get(uid2);
      if (instance) {
        highlight(instance);
      }
    });
    hooks2.hook("componentUnhighlight", () => {
      unhighlight();
    });
    return hooks2;
  }
  var _a4;
  var _b4;
  (_b4 = (_a4 = target).__VUE_DEVTOOLS_KIT_APP_RECORDS__) != null || (_a4.__VUE_DEVTOOLS_KIT_APP_RECORDS__ = []);
  var _a5;
  var _b5;
  (_b5 = (_a5 = target).__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD__) != null || (_a5.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD__ = {});
  var _a6;
  var _b6;
  (_b6 = (_a6 = target).__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD_ID__) != null || (_a6.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD_ID__ = "");
  var _a7;
  var _b7;
  (_b7 = (_a7 = target).__VUE_DEVTOOLS_KIT_CUSTOM_TABS__) != null || (_a7.__VUE_DEVTOOLS_KIT_CUSTOM_TABS__ = []);
  var _a8;
  var _b8;
  (_b8 = (_a8 = target).__VUE_DEVTOOLS_KIT_CUSTOM_COMMANDS__) != null || (_a8.__VUE_DEVTOOLS_KIT_CUSTOM_COMMANDS__ = []);
  var STATE_KEY = "__VUE_DEVTOOLS_KIT_GLOBAL_STATE__";
  function initStateFactory() {
    return {
      connected: false,
      clientConnected: false,
      vitePluginDetected: true,
      appRecords: [],
      activeAppRecordId: "",
      tabs: [],
      commands: [],
      highPerfModeEnabled: true,
      devtoolsClientDetected: {},
      perfUniqueGroupId: 0,
      timelineLayersState: getTimelineLayersStateFromStorage()
    };
  }
  var _a9;
  var _b9;
  (_b9 = (_a9 = target)[STATE_KEY]) != null || (_a9[STATE_KEY] = initStateFactory());
  var callStateUpdatedHook = debounce((state) => {
    devtoolsContext.hooks.callHook("devtoolsStateUpdated", { state });
  });
  var callConnectedUpdatedHook = debounce((state, oldState) => {
    devtoolsContext.hooks.callHook("devtoolsConnectedUpdated", { state, oldState });
  });
  var devtoolsAppRecords = new Proxy(target.__VUE_DEVTOOLS_KIT_APP_RECORDS__, {
    get(_target, prop, receiver) {
      if (prop === "value")
        return target.__VUE_DEVTOOLS_KIT_APP_RECORDS__;
      return target.__VUE_DEVTOOLS_KIT_APP_RECORDS__[prop];
    }
  });
  var activeAppRecord = new Proxy(target.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD__, {
    get(_target, prop, receiver) {
      if (prop === "value")
        return target.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD__;
      else if (prop === "id")
        return target.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD_ID__;
      return target.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD__[prop];
    }
  });
  function updateAllStates() {
    callStateUpdatedHook({
      ...target[STATE_KEY],
      appRecords: devtoolsAppRecords.value,
      activeAppRecordId: activeAppRecord.id,
      tabs: target.__VUE_DEVTOOLS_KIT_CUSTOM_TABS__,
      commands: target.__VUE_DEVTOOLS_KIT_CUSTOM_COMMANDS__
    });
  }
  function setActiveAppRecord(app) {
    target.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD__ = app;
    updateAllStates();
  }
  function setActiveAppRecordId(id) {
    target.__VUE_DEVTOOLS_KIT_ACTIVE_APP_RECORD_ID__ = id;
    updateAllStates();
  }
  var devtoolsState = new Proxy(target[STATE_KEY], {
    get(target22, property) {
      if (property === "appRecords") {
        return devtoolsAppRecords;
      } else if (property === "activeAppRecordId") {
        return activeAppRecord.id;
      } else if (property === "tabs") {
        return target.__VUE_DEVTOOLS_KIT_CUSTOM_TABS__;
      } else if (property === "commands") {
        return target.__VUE_DEVTOOLS_KIT_CUSTOM_COMMANDS__;
      }
      return target[STATE_KEY][property];
    },
    deleteProperty(target22, property) {
      delete target22[property];
      return true;
    },
    set(target22, property, value) {
      const oldState = { ...target[STATE_KEY] };
      target22[property] = value;
      target[STATE_KEY][property] = value;
      return true;
    }
  });
  function openInEditor(options = {}) {
    var _a25, _b25, _c;
    const { file, host, baseUrl = window.location.origin, line = 0, column = 0 } = options;
    if (file) {
      if (host === "chrome-extension") {
        const fileName = file.replace(/\\/g, "\\\\");
        const _baseUrl = (_b25 = (_a25 = window.VUE_DEVTOOLS_CONFIG) == null ? undefined : _a25.openInEditorHost) != null ? _b25 : "/";
        fetch(`${_baseUrl}__open-in-editor?file=${encodeURI(file)}`).then((response) => {
          if (!response.ok) {
            const msg = `Opening component ${fileName} failed`;
            console.log(`%c${msg}`, "color:red");
          }
        });
      } else if (devtoolsState.vitePluginDetected) {
        const _baseUrl = (_c = target.__VUE_DEVTOOLS_OPEN_IN_EDITOR_BASE_URL__) != null ? _c : baseUrl;
        target.__VUE_INSPECTOR__.openInEditor(_baseUrl, file, line, column);
      }
    }
  }
  init_esm_shims2();
  init_esm_shims2();
  init_esm_shims2();
  init_esm_shims2();
  init_esm_shims2();
  var _a10;
  var _b10;
  (_b10 = (_a10 = target).__VUE_DEVTOOLS_KIT_PLUGIN_BUFFER__) != null || (_a10.__VUE_DEVTOOLS_KIT_PLUGIN_BUFFER__ = []);
  var devtoolsPluginBuffer = new Proxy(target.__VUE_DEVTOOLS_KIT_PLUGIN_BUFFER__, {
    get(target22, prop, receiver) {
      return Reflect.get(target22, prop, receiver);
    }
  });
  function _getSettings(settings) {
    const _settings = {};
    Object.keys(settings).forEach((key) => {
      _settings[key] = settings[key].defaultValue;
    });
    return _settings;
  }
  function getPluginLocalKey(pluginId) {
    return `__VUE_DEVTOOLS_NEXT_PLUGIN_SETTINGS__${pluginId}__`;
  }
  function getPluginSettingsOptions(pluginId) {
    var _a25, _b25, _c;
    const item = (_b25 = (_a25 = devtoolsPluginBuffer.find((item2) => {
      var _a26;
      return item2[0].id === pluginId && !!((_a26 = item2[0]) == null ? undefined : _a26.settings);
    })) == null ? undefined : _a25[0]) != null ? _b25 : null;
    return (_c = item == null ? undefined : item.settings) != null ? _c : null;
  }
  function getPluginSettings(pluginId, fallbackValue) {
    var _a25, _b25, _c;
    const localKey = getPluginLocalKey(pluginId);
    if (localKey) {
      const localSettings = localStorage.getItem(localKey);
      if (localSettings) {
        return JSON.parse(localSettings);
      }
    }
    if (pluginId) {
      const item = (_b25 = (_a25 = devtoolsPluginBuffer.find((item2) => item2[0].id === pluginId)) == null ? undefined : _a25[0]) != null ? _b25 : null;
      return _getSettings((_c = item == null ? undefined : item.settings) != null ? _c : {});
    }
    return _getSettings(fallbackValue);
  }
  function initPluginSettings(pluginId, settings) {
    const localKey = getPluginLocalKey(pluginId);
    const localSettings = localStorage.getItem(localKey);
    if (!localSettings) {
      localStorage.setItem(localKey, JSON.stringify(_getSettings(settings)));
    }
  }
  function setPluginSettings(pluginId, key, value) {
    const localKey = getPluginLocalKey(pluginId);
    const localSettings = localStorage.getItem(localKey);
    const parsedLocalSettings = JSON.parse(localSettings || "{}");
    const updated = {
      ...parsedLocalSettings,
      [key]: value
    };
    localStorage.setItem(localKey, JSON.stringify(updated));
    devtoolsContext.hooks.callHookWith((callbacks) => {
      callbacks.forEach((cb) => cb({
        pluginId,
        key,
        oldValue: parsedLocalSettings[key],
        newValue: value,
        settings: updated
      }));
    }, "setPluginSettings");
  }
  init_esm_shims2();
  init_esm_shims2();
  init_esm_shims2();
  init_esm_shims2();
  init_esm_shims2();
  init_esm_shims2();
  init_esm_shims2();
  init_esm_shims2();
  init_esm_shims2();
  init_esm_shims2();
  init_esm_shims2();
  var _a11;
  var _b11;
  var devtoolsHooks = (_b11 = (_a11 = target).__VUE_DEVTOOLS_HOOK) != null ? _b11 : _a11.__VUE_DEVTOOLS_HOOK = createHooks();
  var on = {
    vueAppInit(fn) {
      devtoolsHooks.hook("app:init", fn);
    },
    vueAppUnmount(fn) {
      devtoolsHooks.hook("app:unmount", fn);
    },
    vueAppConnected(fn) {
      devtoolsHooks.hook("app:connected", fn);
    },
    componentAdded(fn) {
      return devtoolsHooks.hook("component:added", fn);
    },
    componentEmit(fn) {
      return devtoolsHooks.hook("component:emit", fn);
    },
    componentUpdated(fn) {
      return devtoolsHooks.hook("component:updated", fn);
    },
    componentRemoved(fn) {
      return devtoolsHooks.hook("component:removed", fn);
    },
    setupDevtoolsPlugin(fn) {
      devtoolsHooks.hook("devtools-plugin:setup", fn);
    },
    perfStart(fn) {
      return devtoolsHooks.hook("perf:start", fn);
    },
    perfEnd(fn) {
      return devtoolsHooks.hook("perf:end", fn);
    }
  };
  var hook = {
    on,
    setupDevToolsPlugin(pluginDescriptor, setupFn) {
      return devtoolsHooks.callHook("devtools-plugin:setup", pluginDescriptor, setupFn);
    }
  };
  var DevToolsV6PluginAPI = class {
    constructor({ plugin, ctx }) {
      this.hooks = ctx.hooks;
      this.plugin = plugin;
    }
    get on() {
      return {
        visitComponentTree: (handler) => {
          this.hooks.hook("visitComponentTree", handler);
        },
        inspectComponent: (handler) => {
          this.hooks.hook("inspectComponent", handler);
        },
        editComponentState: (handler) => {
          this.hooks.hook("editComponentState", handler);
        },
        getInspectorTree: (handler) => {
          this.hooks.hook("getInspectorTree", handler);
        },
        getInspectorState: (handler) => {
          this.hooks.hook("getInspectorState", handler);
        },
        editInspectorState: (handler) => {
          this.hooks.hook("editInspectorState", handler);
        },
        inspectTimelineEvent: (handler) => {
          this.hooks.hook("inspectTimelineEvent", handler);
        },
        timelineCleared: (handler) => {
          this.hooks.hook("timelineCleared", handler);
        },
        setPluginSettings: (handler) => {
          this.hooks.hook("setPluginSettings", handler);
        }
      };
    }
    notifyComponentUpdate(instance) {
      var _a25;
      if (devtoolsState.highPerfModeEnabled) {
        return;
      }
      const inspector = getActiveInspectors().find((i) => i.packageName === this.plugin.descriptor.packageName);
      if (inspector == null ? undefined : inspector.id) {
        if (instance) {
          const args = [
            instance.appContext.app,
            instance.uid,
            (_a25 = instance.parent) == null ? undefined : _a25.uid,
            instance
          ];
          devtoolsHooks.callHook("component:updated", ...args);
        } else {
          devtoolsHooks.callHook("component:updated");
        }
        this.hooks.callHook("sendInspectorState", { inspectorId: inspector.id, plugin: this.plugin });
      }
    }
    addInspector(options) {
      this.hooks.callHook("addInspector", { inspector: options, plugin: this.plugin });
      if (this.plugin.descriptor.settings) {
        initPluginSettings(options.id, this.plugin.descriptor.settings);
      }
    }
    sendInspectorTree(inspectorId) {
      if (devtoolsState.highPerfModeEnabled) {
        return;
      }
      this.hooks.callHook("sendInspectorTree", { inspectorId, plugin: this.plugin });
    }
    sendInspectorState(inspectorId) {
      if (devtoolsState.highPerfModeEnabled) {
        return;
      }
      this.hooks.callHook("sendInspectorState", { inspectorId, plugin: this.plugin });
    }
    selectInspectorNode(inspectorId, nodeId) {
      this.hooks.callHook("customInspectorSelectNode", { inspectorId, nodeId, plugin: this.plugin });
    }
    visitComponentTree(payload) {
      return this.hooks.callHook("visitComponentTree", payload);
    }
    now() {
      if (devtoolsState.highPerfModeEnabled) {
        return 0;
      }
      return Date.now();
    }
    addTimelineLayer(options) {
      this.hooks.callHook("timelineLayerAdded", { options, plugin: this.plugin });
    }
    addTimelineEvent(options) {
      if (devtoolsState.highPerfModeEnabled) {
        return;
      }
      this.hooks.callHook("timelineEventAdded", { options, plugin: this.plugin });
    }
    getSettings(pluginId) {
      return getPluginSettings(pluginId != null ? pluginId : this.plugin.descriptor.id, this.plugin.descriptor.settings);
    }
    getComponentInstances(app) {
      return this.hooks.callHook("getComponentInstances", { app });
    }
    getComponentBounds(instance) {
      return this.hooks.callHook("getComponentBounds", { instance });
    }
    getComponentName(instance) {
      return this.hooks.callHook("getComponentName", { instance });
    }
    highlightElement(instance) {
      const uid2 = instance.__VUE_DEVTOOLS_NEXT_UID__;
      return this.hooks.callHook("componentHighlight", { uid: uid2 });
    }
    unhighlightElement() {
      return this.hooks.callHook("componentUnhighlight");
    }
  };
  var DevToolsPluginAPI = DevToolsV6PluginAPI;
  init_esm_shims2();
  init_esm_shims2();
  init_esm_shims2();
  init_esm_shims2();
  var UNDEFINED = "__vue_devtool_undefined__";
  var INFINITY = "__vue_devtool_infinity__";
  var NEGATIVE_INFINITY = "__vue_devtool_negative_infinity__";
  var NAN = "__vue_devtool_nan__";
  init_esm_shims2();
  init_esm_shims2();
  var tokenMap = {
    [UNDEFINED]: "undefined",
    [NAN]: "NaN",
    [INFINITY]: "Infinity",
    [NEGATIVE_INFINITY]: "-Infinity"
  };
  var reversedTokenMap = Object.entries(tokenMap).reduce((acc, [key, value]) => {
    acc[value] = key;
    return acc;
  }, {});
  init_esm_shims2();
  init_esm_shims2();
  init_esm_shims2();
  init_esm_shims2();
  init_esm_shims2();
  var _a12;
  var _b12;
  (_b12 = (_a12 = target).__VUE_DEVTOOLS_KIT__REGISTERED_PLUGIN_APPS__) != null || (_a12.__VUE_DEVTOOLS_KIT__REGISTERED_PLUGIN_APPS__ = /* @__PURE__ */ new Set);
  function setupDevToolsPlugin(pluginDescriptor, setupFn) {
    return hook.setupDevToolsPlugin(pluginDescriptor, setupFn);
  }
  function callDevToolsPluginSetupFn(plugin, app) {
    const [pluginDescriptor, setupFn] = plugin;
    if (pluginDescriptor.app !== app)
      return;
    const api = new DevToolsPluginAPI({
      plugin: {
        setupFn,
        descriptor: pluginDescriptor
      },
      ctx: devtoolsContext
    });
    if (pluginDescriptor.packageName === "vuex") {
      api.on.editInspectorState((payload) => {
        api.sendInspectorState(payload.inspectorId);
      });
    }
    setupFn(api);
  }
  function registerDevToolsPlugin(app, options) {
    if (target.__VUE_DEVTOOLS_KIT__REGISTERED_PLUGIN_APPS__.has(app)) {
      return;
    }
    if (devtoolsState.highPerfModeEnabled && !(options == null ? undefined : options.inspectingComponent)) {
      return;
    }
    target.__VUE_DEVTOOLS_KIT__REGISTERED_PLUGIN_APPS__.add(app);
    devtoolsPluginBuffer.forEach((plugin) => {
      callDevToolsPluginSetupFn(plugin, app);
    });
  }
  init_esm_shims2();
  init_esm_shims2();
  var ROUTER_KEY = "__VUE_DEVTOOLS_ROUTER__";
  var ROUTER_INFO_KEY = "__VUE_DEVTOOLS_ROUTER_INFO__";
  var _a13;
  var _b13;
  (_b13 = (_a13 = target)[ROUTER_INFO_KEY]) != null || (_a13[ROUTER_INFO_KEY] = {
    currentRoute: null,
    routes: []
  });
  var _a14;
  var _b14;
  (_b14 = (_a14 = target)[ROUTER_KEY]) != null || (_a14[ROUTER_KEY] = {});
  var devtoolsRouterInfo = new Proxy(target[ROUTER_INFO_KEY], {
    get(target22, property) {
      return target[ROUTER_INFO_KEY][property];
    }
  });
  var devtoolsRouter = new Proxy(target[ROUTER_KEY], {
    get(target22, property) {
      if (property === "value") {
        return target[ROUTER_KEY];
      }
    }
  });
  function getRoutes(router) {
    const routesMap = /* @__PURE__ */ new Map;
    return ((router == null ? undefined : router.getRoutes()) || []).filter((i) => !routesMap.has(i.path) && routesMap.set(i.path, 1));
  }
  function filterRoutes(routes) {
    return routes.map((item) => {
      let { path, name, children, meta } = item;
      if (children == null ? undefined : children.length)
        children = filterRoutes(children);
      return {
        path,
        name,
        children,
        meta
      };
    });
  }
  function filterCurrentRoute(route) {
    if (route) {
      const { fullPath, hash, href, path, name, matched, params, query } = route;
      return {
        fullPath,
        hash,
        href,
        path,
        name,
        params,
        query,
        matched: filterRoutes(matched)
      };
    }
    return route;
  }
  function normalizeRouterInfo(appRecord, activeAppRecord2) {
    function init() {
      var _a25;
      const router = (_a25 = appRecord.app) == null ? undefined : _a25.config.globalProperties.$router;
      const currentRoute = filterCurrentRoute(router == null ? undefined : router.currentRoute.value);
      const routes = filterRoutes(getRoutes(router));
      const c = console.warn;
      console.warn = () => {};
      target[ROUTER_INFO_KEY] = {
        currentRoute: currentRoute ? deepClone(currentRoute) : {},
        routes: deepClone(routes)
      };
      target[ROUTER_KEY] = router;
      console.warn = c;
    }
    init();
    hook.on.componentUpdated(debounce(() => {
      var _a25;
      if (((_a25 = activeAppRecord2.value) == null ? undefined : _a25.app) !== appRecord.app)
        return;
      init();
      if (devtoolsState.highPerfModeEnabled)
        return;
      devtoolsContext.hooks.callHook("routerInfoUpdated", { state: target[ROUTER_INFO_KEY] });
    }, 200));
  }
  function createDevToolsApi(hooks2) {
    return {
      async getInspectorTree(payload) {
        const _payload = {
          ...payload,
          app: activeAppRecord.value.app,
          rootNodes: []
        };
        await new Promise((resolve) => {
          hooks2.callHookWith(async (callbacks) => {
            await Promise.all(callbacks.map((cb) => cb(_payload)));
            resolve();
          }, "getInspectorTree");
        });
        return _payload.rootNodes;
      },
      async getInspectorState(payload) {
        const _payload = {
          ...payload,
          app: activeAppRecord.value.app,
          state: null
        };
        const ctx = {
          currentTab: `custom-inspector:${payload.inspectorId}`
        };
        await new Promise((resolve) => {
          hooks2.callHookWith(async (callbacks) => {
            await Promise.all(callbacks.map((cb) => cb(_payload, ctx)));
            resolve();
          }, "getInspectorState");
        });
        return _payload.state;
      },
      editInspectorState(payload) {
        const stateEditor2 = new StateEditor;
        const _payload = {
          ...payload,
          app: activeAppRecord.value.app,
          set: (obj, path = payload.path, value = payload.state.value, cb) => {
            stateEditor2.set(obj, path, value, cb || stateEditor2.createDefaultSetCallback(payload.state));
          }
        };
        hooks2.callHookWith((callbacks) => {
          callbacks.forEach((cb) => cb(_payload));
        }, "editInspectorState");
      },
      sendInspectorState(inspectorId) {
        const inspector = getInspector(inspectorId);
        hooks2.callHook("sendInspectorState", { inspectorId, plugin: {
          descriptor: inspector.descriptor,
          setupFn: () => ({})
        } });
      },
      inspectComponentInspector() {
        return inspectComponentHighLighter();
      },
      cancelInspectComponentInspector() {
        return cancelInspectComponentHighLighter();
      },
      getComponentRenderCode(id) {
        const instance = getComponentInstance(activeAppRecord.value, id);
        if (instance)
          return !(typeof (instance == null ? undefined : instance.type) === "function") ? instance.render.toString() : instance.type.toString();
      },
      scrollToComponent(id) {
        return scrollToComponent({ id });
      },
      openInEditor,
      getVueInspector: getComponentInspector,
      toggleApp(id, options) {
        const appRecord = devtoolsAppRecords.value.find((record) => record.id === id);
        if (appRecord) {
          setActiveAppRecordId(id);
          setActiveAppRecord(appRecord);
          normalizeRouterInfo(appRecord, activeAppRecord);
          callInspectorUpdatedHook();
          registerDevToolsPlugin(appRecord.app, options);
        }
      },
      inspectDOM(instanceId) {
        const instance = getComponentInstance(activeAppRecord.value, instanceId);
        if (instance) {
          const [el] = getRootElementsFromComponentInstance(instance);
          if (el) {
            target.__VUE_DEVTOOLS_INSPECT_DOM_TARGET__ = el;
          }
        }
      },
      updatePluginSettings(pluginId, key, value) {
        setPluginSettings(pluginId, key, value);
      },
      getPluginSettings(pluginId) {
        return {
          options: getPluginSettingsOptions(pluginId),
          values: getPluginSettings(pluginId)
        };
      }
    };
  }
  init_esm_shims2();
  var _a15;
  var _b15;
  (_b15 = (_a15 = target).__VUE_DEVTOOLS_ENV__) != null || (_a15.__VUE_DEVTOOLS_ENV__ = {
    vitePluginDetected: false
  });
  var hooks = createDevToolsCtxHooks();
  var _a16;
  var _b16;
  (_b16 = (_a16 = target).__VUE_DEVTOOLS_KIT_CONTEXT__) != null || (_a16.__VUE_DEVTOOLS_KIT_CONTEXT__ = {
    hooks,
    get state() {
      return {
        ...devtoolsState,
        activeAppRecordId: activeAppRecord.id,
        activeAppRecord: activeAppRecord.value,
        appRecords: devtoolsAppRecords.value
      };
    },
    api: createDevToolsApi(hooks)
  });
  var devtoolsContext = target.__VUE_DEVTOOLS_KIT_CONTEXT__;
  init_esm_shims2();
  var import_speakingurl = __toESM2(require_speakingurl2(), 1);
  var _a17;
  var _b17;
  var appRecordInfo = (_b17 = (_a17 = target).__VUE_DEVTOOLS_NEXT_APP_RECORD_INFO__) != null ? _b17 : _a17.__VUE_DEVTOOLS_NEXT_APP_RECORD_INFO__ = {
    id: 0,
    appIds: /* @__PURE__ */ new Set
  };
  init_esm_shims2();
  init_esm_shims2();
  function toggleHighPerfMode(state) {
    devtoolsState.highPerfModeEnabled = state != null ? state : !devtoolsState.highPerfModeEnabled;
    if (!state && activeAppRecord.value) {
      registerDevToolsPlugin(activeAppRecord.value.app);
    }
  }
  init_esm_shims2();
  init_esm_shims2();
  init_esm_shims2();
  function updateDevToolsClientDetected(params) {
    devtoolsState.devtoolsClientDetected = {
      ...devtoolsState.devtoolsClientDetected,
      ...params
    };
    const devtoolsClientVisible = Object.values(devtoolsState.devtoolsClientDetected).some(Boolean);
    toggleHighPerfMode(!devtoolsClientVisible);
  }
  var _a18;
  var _b18;
  (_b18 = (_a18 = target).__VUE_DEVTOOLS_UPDATE_CLIENT_DETECTED__) != null || (_a18.__VUE_DEVTOOLS_UPDATE_CLIENT_DETECTED__ = updateDevToolsClientDetected);
  init_esm_shims2();
  init_esm_shims2();
  init_esm_shims2();
  init_esm_shims2();
  init_esm_shims2();
  init_esm_shims2();
  init_esm_shims2();
  var DoubleIndexedKV = class {
    constructor() {
      this.keyToValue = /* @__PURE__ */ new Map;
      this.valueToKey = /* @__PURE__ */ new Map;
    }
    set(key, value) {
      this.keyToValue.set(key, value);
      this.valueToKey.set(value, key);
    }
    getByKey(key) {
      return this.keyToValue.get(key);
    }
    getByValue(value) {
      return this.valueToKey.get(value);
    }
    clear() {
      this.keyToValue.clear();
      this.valueToKey.clear();
    }
  };
  var Registry = class {
    constructor(generateIdentifier) {
      this.generateIdentifier = generateIdentifier;
      this.kv = new DoubleIndexedKV;
    }
    register(value, identifier) {
      if (this.kv.getByValue(value)) {
        return;
      }
      if (!identifier) {
        identifier = this.generateIdentifier(value);
      }
      this.kv.set(identifier, value);
    }
    clear() {
      this.kv.clear();
    }
    getIdentifier(value) {
      return this.kv.getByValue(value);
    }
    getValue(identifier) {
      return this.kv.getByKey(identifier);
    }
  };
  var ClassRegistry = class extends Registry {
    constructor() {
      super((c) => c.name);
      this.classToAllowedProps = /* @__PURE__ */ new Map;
    }
    register(value, options) {
      if (typeof options === "object") {
        if (options.allowProps) {
          this.classToAllowedProps.set(value, options.allowProps);
        }
        super.register(value, options.identifier);
      } else {
        super.register(value, options);
      }
    }
    getAllowedProps(value) {
      return this.classToAllowedProps.get(value);
    }
  };
  init_esm_shims2();
  init_esm_shims2();
  function valuesOfObj(record) {
    if ("values" in Object) {
      return Object.values(record);
    }
    const values = [];
    for (const key in record) {
      if (record.hasOwnProperty(key)) {
        values.push(record[key]);
      }
    }
    return values;
  }
  function find(record, predicate) {
    const values = valuesOfObj(record);
    if ("find" in values) {
      return values.find(predicate);
    }
    const valuesNotNever = values;
    for (let i = 0;i < valuesNotNever.length; i++) {
      const value = valuesNotNever[i];
      if (predicate(value)) {
        return value;
      }
    }
    return;
  }
  function forEach(record, run) {
    Object.entries(record).forEach(([key, value]) => run(value, key));
  }
  function includes(arr, value) {
    return arr.indexOf(value) !== -1;
  }
  function findArr(record, predicate) {
    for (let i = 0;i < record.length; i++) {
      const value = record[i];
      if (predicate(value)) {
        return value;
      }
    }
    return;
  }
  var CustomTransformerRegistry = class {
    constructor() {
      this.transfomers = {};
    }
    register(transformer) {
      this.transfomers[transformer.name] = transformer;
    }
    findApplicable(v) {
      return find(this.transfomers, (transformer) => transformer.isApplicable(v));
    }
    findByName(name) {
      return this.transfomers[name];
    }
  };
  init_esm_shims2();
  init_esm_shims2();
  var getType2 = (payload) => Object.prototype.toString.call(payload).slice(8, -1);
  var isUndefined = (payload) => typeof payload === "undefined";
  var isNull = (payload) => payload === null;
  var isPlainObject2 = (payload) => {
    if (typeof payload !== "object" || payload === null)
      return false;
    if (payload === Object.prototype)
      return false;
    if (Object.getPrototypeOf(payload) === null)
      return true;
    return Object.getPrototypeOf(payload) === Object.prototype;
  };
  var isEmptyObject = (payload) => isPlainObject2(payload) && Object.keys(payload).length === 0;
  var isArray2 = (payload) => Array.isArray(payload);
  var isString2 = (payload) => typeof payload === "string";
  var isNumber = (payload) => typeof payload === "number" && !isNaN(payload);
  var isBoolean2 = (payload) => typeof payload === "boolean";
  var isRegExp2 = (payload) => payload instanceof RegExp;
  var isMap2 = (payload) => payload instanceof Map;
  var isSet2 = (payload) => payload instanceof Set;
  var isSymbol2 = (payload) => getType2(payload) === "Symbol";
  var isDate2 = (payload) => payload instanceof Date && !isNaN(payload.valueOf());
  var isError = (payload) => payload instanceof Error;
  var isNaNValue = (payload) => typeof payload === "number" && isNaN(payload);
  var isPrimitive2 = (payload) => isBoolean2(payload) || isNull(payload) || isUndefined(payload) || isNumber(payload) || isString2(payload) || isSymbol2(payload);
  var isBigint = (payload) => typeof payload === "bigint";
  var isInfinite = (payload) => payload === Infinity || payload === -Infinity;
  var isTypedArray = (payload) => ArrayBuffer.isView(payload) && !(payload instanceof DataView);
  var isURL = (payload) => payload instanceof URL;
  init_esm_shims2();
  var escapeKey = (key) => key.replace(/\./g, "\\.");
  var stringifyPath = (path) => path.map(String).map(escapeKey).join(".");
  var parsePath = (string) => {
    const result = [];
    let segment = "";
    for (let i = 0;i < string.length; i++) {
      let char = string.charAt(i);
      const isEscapedDot = char === "\\" && string.charAt(i + 1) === ".";
      if (isEscapedDot) {
        segment += ".";
        i++;
        continue;
      }
      const isEndOfSegment = char === ".";
      if (isEndOfSegment) {
        result.push(segment);
        segment = "";
        continue;
      }
      segment += char;
    }
    const lastSegment = segment;
    result.push(lastSegment);
    return result;
  };
  init_esm_shims2();
  function simpleTransformation(isApplicable, annotation, transform, untransform) {
    return {
      isApplicable,
      annotation,
      transform,
      untransform
    };
  }
  var simpleRules = [
    simpleTransformation(isUndefined, "undefined", () => null, () => {
      return;
    }),
    simpleTransformation(isBigint, "bigint", (v) => v.toString(), (v) => {
      if (typeof BigInt !== "undefined") {
        return BigInt(v);
      }
      console.error("Please add a BigInt polyfill.");
      return v;
    }),
    simpleTransformation(isDate2, "Date", (v) => v.toISOString(), (v) => new Date(v)),
    simpleTransformation(isError, "Error", (v, superJson) => {
      const baseError = {
        name: v.name,
        message: v.message
      };
      superJson.allowedErrorProps.forEach((prop) => {
        baseError[prop] = v[prop];
      });
      return baseError;
    }, (v, superJson) => {
      const e = new Error(v.message);
      e.name = v.name;
      e.stack = v.stack;
      superJson.allowedErrorProps.forEach((prop) => {
        e[prop] = v[prop];
      });
      return e;
    }),
    simpleTransformation(isRegExp2, "regexp", (v) => "" + v, (regex) => {
      const body = regex.slice(1, regex.lastIndexOf("/"));
      const flags = regex.slice(regex.lastIndexOf("/") + 1);
      return new RegExp(body, flags);
    }),
    simpleTransformation(isSet2, "set", (v) => [...v.values()], (v) => new Set(v)),
    simpleTransformation(isMap2, "map", (v) => [...v.entries()], (v) => new Map(v)),
    simpleTransformation((v) => isNaNValue(v) || isInfinite(v), "number", (v) => {
      if (isNaNValue(v)) {
        return "NaN";
      }
      if (v > 0) {
        return "Infinity";
      } else {
        return "-Infinity";
      }
    }, Number),
    simpleTransformation((v) => v === 0 && 1 / v === -Infinity, "number", () => {
      return "-0";
    }, Number),
    simpleTransformation(isURL, "URL", (v) => v.toString(), (v) => new URL(v))
  ];
  function compositeTransformation(isApplicable, annotation, transform, untransform) {
    return {
      isApplicable,
      annotation,
      transform,
      untransform
    };
  }
  var symbolRule = compositeTransformation((s, superJson) => {
    if (isSymbol2(s)) {
      const isRegistered = !!superJson.symbolRegistry.getIdentifier(s);
      return isRegistered;
    }
    return false;
  }, (s, superJson) => {
    const identifier = superJson.symbolRegistry.getIdentifier(s);
    return ["symbol", identifier];
  }, (v) => v.description, (_, a, superJson) => {
    const value = superJson.symbolRegistry.getValue(a[1]);
    if (!value) {
      throw new Error("Trying to deserialize unknown symbol");
    }
    return value;
  });
  var constructorToName = [
    Int8Array,
    Uint8Array,
    Int16Array,
    Uint16Array,
    Int32Array,
    Uint32Array,
    Float32Array,
    Float64Array,
    Uint8ClampedArray
  ].reduce((obj, ctor) => {
    obj[ctor.name] = ctor;
    return obj;
  }, {});
  var typedArrayRule = compositeTransformation(isTypedArray, (v) => ["typed-array", v.constructor.name], (v) => [...v], (v, a) => {
    const ctor = constructorToName[a[1]];
    if (!ctor) {
      throw new Error("Trying to deserialize unknown typed array");
    }
    return new ctor(v);
  });
  function isInstanceOfRegisteredClass(potentialClass, superJson) {
    if (potentialClass == null ? undefined : potentialClass.constructor) {
      const isRegistered = !!superJson.classRegistry.getIdentifier(potentialClass.constructor);
      return isRegistered;
    }
    return false;
  }
  var classRule = compositeTransformation(isInstanceOfRegisteredClass, (clazz, superJson) => {
    const identifier = superJson.classRegistry.getIdentifier(clazz.constructor);
    return ["class", identifier];
  }, (clazz, superJson) => {
    const allowedProps = superJson.classRegistry.getAllowedProps(clazz.constructor);
    if (!allowedProps) {
      return { ...clazz };
    }
    const result = {};
    allowedProps.forEach((prop) => {
      result[prop] = clazz[prop];
    });
    return result;
  }, (v, a, superJson) => {
    const clazz = superJson.classRegistry.getValue(a[1]);
    if (!clazz) {
      throw new Error(`Trying to deserialize unknown class '${a[1]}' - check https://github.com/blitz-js/superjson/issues/116#issuecomment-773996564`);
    }
    return Object.assign(Object.create(clazz.prototype), v);
  });
  var customRule = compositeTransformation((value, superJson) => {
    return !!superJson.customTransformerRegistry.findApplicable(value);
  }, (value, superJson) => {
    const transformer = superJson.customTransformerRegistry.findApplicable(value);
    return ["custom", transformer.name];
  }, (value, superJson) => {
    const transformer = superJson.customTransformerRegistry.findApplicable(value);
    return transformer.serialize(value);
  }, (v, a, superJson) => {
    const transformer = superJson.customTransformerRegistry.findByName(a[1]);
    if (!transformer) {
      throw new Error("Trying to deserialize unknown custom value");
    }
    return transformer.deserialize(v);
  });
  var compositeRules = [classRule, symbolRule, customRule, typedArrayRule];
  var transformValue = (value, superJson) => {
    const applicableCompositeRule = findArr(compositeRules, (rule) => rule.isApplicable(value, superJson));
    if (applicableCompositeRule) {
      return {
        value: applicableCompositeRule.transform(value, superJson),
        type: applicableCompositeRule.annotation(value, superJson)
      };
    }
    const applicableSimpleRule = findArr(simpleRules, (rule) => rule.isApplicable(value, superJson));
    if (applicableSimpleRule) {
      return {
        value: applicableSimpleRule.transform(value, superJson),
        type: applicableSimpleRule.annotation
      };
    }
    return;
  };
  var simpleRulesByAnnotation = {};
  simpleRules.forEach((rule) => {
    simpleRulesByAnnotation[rule.annotation] = rule;
  });
  var untransformValue = (json, type, superJson) => {
    if (isArray2(type)) {
      switch (type[0]) {
        case "symbol":
          return symbolRule.untransform(json, type, superJson);
        case "class":
          return classRule.untransform(json, type, superJson);
        case "custom":
          return customRule.untransform(json, type, superJson);
        case "typed-array":
          return typedArrayRule.untransform(json, type, superJson);
        default:
          throw new Error("Unknown transformation: " + type);
      }
    } else {
      const transformation = simpleRulesByAnnotation[type];
      if (!transformation) {
        throw new Error("Unknown transformation: " + type);
      }
      return transformation.untransform(json, superJson);
    }
  };
  init_esm_shims2();
  var getNthKey = (value, n) => {
    if (n > value.size)
      throw new Error("index out of bounds");
    const keys = value.keys();
    while (n > 0) {
      keys.next();
      n--;
    }
    return keys.next().value;
  };
  function validatePath(path) {
    if (includes(path, "__proto__")) {
      throw new Error("__proto__ is not allowed as a property");
    }
    if (includes(path, "prototype")) {
      throw new Error("prototype is not allowed as a property");
    }
    if (includes(path, "constructor")) {
      throw new Error("constructor is not allowed as a property");
    }
  }
  var getDeep = (object, path) => {
    validatePath(path);
    for (let i = 0;i < path.length; i++) {
      const key = path[i];
      if (isSet2(object)) {
        object = getNthKey(object, +key);
      } else if (isMap2(object)) {
        const row = +key;
        const type = +path[++i] === 0 ? "key" : "value";
        const keyOfRow = getNthKey(object, row);
        switch (type) {
          case "key":
            object = keyOfRow;
            break;
          case "value":
            object = object.get(keyOfRow);
            break;
        }
      } else {
        object = object[key];
      }
    }
    return object;
  };
  var setDeep = (object, path, mapper) => {
    validatePath(path);
    if (path.length === 0) {
      return mapper(object);
    }
    let parent = object;
    for (let i = 0;i < path.length - 1; i++) {
      const key = path[i];
      if (isArray2(parent)) {
        const index = +key;
        parent = parent[index];
      } else if (isPlainObject2(parent)) {
        parent = parent[key];
      } else if (isSet2(parent)) {
        const row = +key;
        parent = getNthKey(parent, row);
      } else if (isMap2(parent)) {
        const isEnd = i === path.length - 2;
        if (isEnd) {
          break;
        }
        const row = +key;
        const type = +path[++i] === 0 ? "key" : "value";
        const keyOfRow = getNthKey(parent, row);
        switch (type) {
          case "key":
            parent = keyOfRow;
            break;
          case "value":
            parent = parent.get(keyOfRow);
            break;
        }
      }
    }
    const lastKey = path[path.length - 1];
    if (isArray2(parent)) {
      parent[+lastKey] = mapper(parent[+lastKey]);
    } else if (isPlainObject2(parent)) {
      parent[lastKey] = mapper(parent[lastKey]);
    }
    if (isSet2(parent)) {
      const oldValue = getNthKey(parent, +lastKey);
      const newValue = mapper(oldValue);
      if (oldValue !== newValue) {
        parent.delete(oldValue);
        parent.add(newValue);
      }
    }
    if (isMap2(parent)) {
      const row = +path[path.length - 2];
      const keyToRow = getNthKey(parent, row);
      const type = +lastKey === 0 ? "key" : "value";
      switch (type) {
        case "key": {
          const newKey = mapper(keyToRow);
          parent.set(newKey, parent.get(keyToRow));
          if (newKey !== keyToRow) {
            parent.delete(keyToRow);
          }
          break;
        }
        case "value": {
          parent.set(keyToRow, mapper(parent.get(keyToRow)));
          break;
        }
      }
    }
    return object;
  };
  function traverse2(tree, walker2, origin = []) {
    if (!tree) {
      return;
    }
    if (!isArray2(tree)) {
      forEach(tree, (subtree, key) => traverse2(subtree, walker2, [...origin, ...parsePath(key)]));
      return;
    }
    const [nodeValue, children] = tree;
    if (children) {
      forEach(children, (child, key) => {
        traverse2(child, walker2, [...origin, ...parsePath(key)]);
      });
    }
    walker2(nodeValue, origin);
  }
  function applyValueAnnotations(plain, annotations, superJson) {
    traverse2(annotations, (type, path) => {
      plain = setDeep(plain, path, (v) => untransformValue(v, type, superJson));
    });
    return plain;
  }
  function applyReferentialEqualityAnnotations(plain, annotations) {
    function apply2(identicalPaths, path) {
      const object = getDeep(plain, parsePath(path));
      identicalPaths.map(parsePath).forEach((identicalObjectPath) => {
        plain = setDeep(plain, identicalObjectPath, () => object);
      });
    }
    if (isArray2(annotations)) {
      const [root, other] = annotations;
      root.forEach((identicalPath) => {
        plain = setDeep(plain, parsePath(identicalPath), () => plain);
      });
      if (other) {
        forEach(other, apply2);
      }
    } else {
      forEach(annotations, apply2);
    }
    return plain;
  }
  var isDeep = (object, superJson) => isPlainObject2(object) || isArray2(object) || isMap2(object) || isSet2(object) || isInstanceOfRegisteredClass(object, superJson);
  function addIdentity(object, path, identities) {
    const existingSet = identities.get(object);
    if (existingSet) {
      existingSet.push(path);
    } else {
      identities.set(object, [path]);
    }
  }
  function generateReferentialEqualityAnnotations(identitites, dedupe) {
    const result = {};
    let rootEqualityPaths = undefined;
    identitites.forEach((paths) => {
      if (paths.length <= 1) {
        return;
      }
      if (!dedupe) {
        paths = paths.map((path) => path.map(String)).sort((a, b) => a.length - b.length);
      }
      const [representativePath, ...identicalPaths] = paths;
      if (representativePath.length === 0) {
        rootEqualityPaths = identicalPaths.map(stringifyPath);
      } else {
        result[stringifyPath(representativePath)] = identicalPaths.map(stringifyPath);
      }
    });
    if (rootEqualityPaths) {
      if (isEmptyObject(result)) {
        return [rootEqualityPaths];
      } else {
        return [rootEqualityPaths, result];
      }
    } else {
      return isEmptyObject(result) ? undefined : result;
    }
  }
  var walker = (object, identities, superJson, dedupe, path = [], objectsInThisPath = [], seenObjects = /* @__PURE__ */ new Map) => {
    var _a25;
    const primitive = isPrimitive2(object);
    if (!primitive) {
      addIdentity(object, path, identities);
      const seen = seenObjects.get(object);
      if (seen) {
        return dedupe ? {
          transformedValue: null
        } : seen;
      }
    }
    if (!isDeep(object, superJson)) {
      const transformed2 = transformValue(object, superJson);
      const result2 = transformed2 ? {
        transformedValue: transformed2.value,
        annotations: [transformed2.type]
      } : {
        transformedValue: object
      };
      if (!primitive) {
        seenObjects.set(object, result2);
      }
      return result2;
    }
    if (includes(objectsInThisPath, object)) {
      return {
        transformedValue: null
      };
    }
    const transformationResult = transformValue(object, superJson);
    const transformed = (_a25 = transformationResult == null ? undefined : transformationResult.value) != null ? _a25 : object;
    const transformedValue = isArray2(transformed) ? [] : {};
    const innerAnnotations = {};
    forEach(transformed, (value, index) => {
      if (index === "__proto__" || index === "constructor" || index === "prototype") {
        throw new Error(`Detected property ${index}. This is a prototype pollution risk, please remove it from your object.`);
      }
      const recursiveResult = walker(value, identities, superJson, dedupe, [...path, index], [...objectsInThisPath, object], seenObjects);
      transformedValue[index] = recursiveResult.transformedValue;
      if (isArray2(recursiveResult.annotations)) {
        innerAnnotations[index] = recursiveResult.annotations;
      } else if (isPlainObject2(recursiveResult.annotations)) {
        forEach(recursiveResult.annotations, (tree, key) => {
          innerAnnotations[escapeKey(index) + "." + key] = tree;
        });
      }
    });
    const result = isEmptyObject(innerAnnotations) ? {
      transformedValue,
      annotations: transformationResult ? [transformationResult.type] : undefined
    } : {
      transformedValue,
      annotations: transformationResult ? [transformationResult.type, innerAnnotations] : innerAnnotations
    };
    if (!primitive) {
      seenObjects.set(object, result);
    }
    return result;
  };
  init_esm_shims2();
  init_esm_shims2();
  function getType22(payload) {
    return Object.prototype.toString.call(payload).slice(8, -1);
  }
  function isArray22(payload) {
    return getType22(payload) === "Array";
  }
  function isPlainObject3(payload) {
    if (getType22(payload) !== "Object")
      return false;
    const prototype = Object.getPrototypeOf(payload);
    return !!prototype && prototype.constructor === Object && prototype === Object.prototype;
  }
  function isNull2(payload) {
    return getType22(payload) === "Null";
  }
  function isOneOf(a, b, c, d, e) {
    return (value) => a(value) || b(value) || !!c && c(value) || !!d && d(value) || !!e && e(value);
  }
  function isUndefined2(payload) {
    return getType22(payload) === "Undefined";
  }
  var isNullOrUndefined = isOneOf(isNull2, isUndefined2);
  function assignProp(carry, key, newVal, originalObject, includeNonenumerable) {
    const propType = {}.propertyIsEnumerable.call(originalObject, key) ? "enumerable" : "nonenumerable";
    if (propType === "enumerable")
      carry[key] = newVal;
    if (includeNonenumerable && propType === "nonenumerable") {
      Object.defineProperty(carry, key, {
        value: newVal,
        enumerable: false,
        writable: true,
        configurable: true
      });
    }
  }
  function copy(target22, options = {}) {
    if (isArray22(target22)) {
      return target22.map((item) => copy(item, options));
    }
    if (!isPlainObject3(target22)) {
      return target22;
    }
    const props = Object.getOwnPropertyNames(target22);
    const symbols = Object.getOwnPropertySymbols(target22);
    return [...props, ...symbols].reduce((carry, key) => {
      if (isArray22(options.props) && !options.props.includes(key)) {
        return carry;
      }
      const val = target22[key];
      const newVal = copy(val, options);
      assignProp(carry, key, newVal, target22, options.nonenumerable);
      return carry;
    }, {});
  }
  var SuperJSON = class {
    constructor({ dedupe = false } = {}) {
      this.classRegistry = new ClassRegistry;
      this.symbolRegistry = new Registry((s) => {
        var _a25;
        return (_a25 = s.description) != null ? _a25 : "";
      });
      this.customTransformerRegistry = new CustomTransformerRegistry;
      this.allowedErrorProps = [];
      this.dedupe = dedupe;
    }
    serialize(object) {
      const identities = /* @__PURE__ */ new Map;
      const output = walker(object, identities, this, this.dedupe);
      const res = {
        json: output.transformedValue
      };
      if (output.annotations) {
        res.meta = {
          ...res.meta,
          values: output.annotations
        };
      }
      const equalityAnnotations = generateReferentialEqualityAnnotations(identities, this.dedupe);
      if (equalityAnnotations) {
        res.meta = {
          ...res.meta,
          referentialEqualities: equalityAnnotations
        };
      }
      return res;
    }
    deserialize(payload) {
      const { json, meta } = payload;
      let result = copy(json);
      if (meta == null ? undefined : meta.values) {
        result = applyValueAnnotations(result, meta.values, this);
      }
      if (meta == null ? undefined : meta.referentialEqualities) {
        result = applyReferentialEqualityAnnotations(result, meta.referentialEqualities);
      }
      return result;
    }
    stringify(object) {
      return JSON.stringify(this.serialize(object));
    }
    parse(string) {
      return this.deserialize(JSON.parse(string));
    }
    registerClass(v, options) {
      this.classRegistry.register(v, options);
    }
    registerSymbol(v, identifier) {
      this.symbolRegistry.register(v, identifier);
    }
    registerCustom(transformer, name) {
      this.customTransformerRegistry.register({
        name,
        ...transformer
      });
    }
    allowErrorProps(...props) {
      this.allowedErrorProps.push(...props);
    }
  };
  SuperJSON.defaultInstance = new SuperJSON;
  SuperJSON.serialize = SuperJSON.defaultInstance.serialize.bind(SuperJSON.defaultInstance);
  SuperJSON.deserialize = SuperJSON.defaultInstance.deserialize.bind(SuperJSON.defaultInstance);
  SuperJSON.stringify = SuperJSON.defaultInstance.stringify.bind(SuperJSON.defaultInstance);
  SuperJSON.parse = SuperJSON.defaultInstance.parse.bind(SuperJSON.defaultInstance);
  SuperJSON.registerClass = SuperJSON.defaultInstance.registerClass.bind(SuperJSON.defaultInstance);
  SuperJSON.registerSymbol = SuperJSON.defaultInstance.registerSymbol.bind(SuperJSON.defaultInstance);
  SuperJSON.registerCustom = SuperJSON.defaultInstance.registerCustom.bind(SuperJSON.defaultInstance);
  SuperJSON.allowErrorProps = SuperJSON.defaultInstance.allowErrorProps.bind(SuperJSON.defaultInstance);
  var serialize = SuperJSON.serialize;
  var deserialize = SuperJSON.deserialize;
  var stringify = SuperJSON.stringify;
  var parse = SuperJSON.parse;
  var registerClass = SuperJSON.registerClass;
  var registerCustom = SuperJSON.registerCustom;
  var registerSymbol = SuperJSON.registerSymbol;
  var allowErrorProps = SuperJSON.allowErrorProps;
  init_esm_shims2();
  init_esm_shims2();
  init_esm_shims2();
  init_esm_shims2();
  init_esm_shims2();
  init_esm_shims2();
  init_esm_shims2();
  init_esm_shims2();
  init_esm_shims2();
  init_esm_shims2();
  init_esm_shims2();
  init_esm_shims2();
  init_esm_shims2();
  init_esm_shims2();
  init_esm_shims2();
  init_esm_shims2();
  init_esm_shims2();
  init_esm_shims2();
  init_esm_shims2();
  init_esm_shims2();
  init_esm_shims2();
  init_esm_shims2();
  init_esm_shims2();
  var _a19;
  var _b19;
  (_b19 = (_a19 = target).__VUE_DEVTOOLS_KIT_MESSAGE_CHANNELS__) != null || (_a19.__VUE_DEVTOOLS_KIT_MESSAGE_CHANNELS__ = []);
  var _a20;
  var _b20;
  (_b20 = (_a20 = target).__VUE_DEVTOOLS_KIT_RPC_CLIENT__) != null || (_a20.__VUE_DEVTOOLS_KIT_RPC_CLIENT__ = null);
  var _a21;
  var _b21;
  (_b21 = (_a21 = target).__VUE_DEVTOOLS_KIT_RPC_SERVER__) != null || (_a21.__VUE_DEVTOOLS_KIT_RPC_SERVER__ = null);
  var _a222;
  var _b22;
  (_b22 = (_a222 = target).__VUE_DEVTOOLS_KIT_VITE_RPC_CLIENT__) != null || (_a222.__VUE_DEVTOOLS_KIT_VITE_RPC_CLIENT__ = null);
  var _a23;
  var _b23;
  (_b23 = (_a23 = target).__VUE_DEVTOOLS_KIT_VITE_RPC_SERVER__) != null || (_a23.__VUE_DEVTOOLS_KIT_VITE_RPC_SERVER__ = null);
  var _a24;
  var _b24;
  (_b24 = (_a24 = target).__VUE_DEVTOOLS_KIT_BROADCAST_RPC_SERVER__) != null || (_a24.__VUE_DEVTOOLS_KIT_BROADCAST_RPC_SERVER__ = null);
  init_esm_shims2();
  init_esm_shims2();
  init_esm_shims2();
  init_esm_shims2();
  init_esm_shims2();
  init_esm_shims2();
  init_esm_shims2();
  var MAX_SERIALIZED_SIZE = 2 * 1024 * 1024;

  // node_modules/pinia/dist/pinia.mjs
  /*!
   * pinia v3.0.4
   * (c) 2025 Eduardo San Martin Morote
   * @license MIT
   */
  var IS_CLIENT = typeof window !== "undefined";
  var activePinia;
  var setActivePinia = (pinia) => activePinia = pinia;
  var piniaSymbol = Symbol("pinia");
  function isPlainObject4(o) {
    return o && typeof o === "object" && Object.prototype.toString.call(o) === "[object Object]" && typeof o.toJSON !== "function";
  }
  var MutationType;
  (function(MutationType2) {
    MutationType2["direct"] = "direct";
    MutationType2["patchObject"] = "patch object";
    MutationType2["patchFunction"] = "patch function";
  })(MutationType || (MutationType = {}));
  var _global = /* @__PURE__ */ (() => typeof window === "object" && window.window === window ? window : typeof self === "object" && self.self === self ? self : typeof global === "object" && global.global === global ? global : typeof globalThis === "object" ? globalThis : { HTMLElement: null })();
  function bom(blob, { autoBom = false } = {}) {
    if (autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(blob.type)) {
      return new Blob([String.fromCharCode(65279), blob], { type: blob.type });
    }
    return blob;
  }
  function download(url, name, opts) {
    const xhr = new XMLHttpRequest;
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.onload = function() {
      saveAs(xhr.response, name, opts);
    };
    xhr.onerror = function() {
      console.error("could not download file");
    };
    xhr.send();
  }
  function corsEnabled(url) {
    const xhr = new XMLHttpRequest;
    xhr.open("HEAD", url, false);
    try {
      xhr.send();
    } catch (e) {}
    return xhr.status >= 200 && xhr.status <= 299;
  }
  function click(node) {
    try {
      node.dispatchEvent(new MouseEvent("click"));
    } catch (e) {
      const evt = new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window,
        detail: 0,
        screenX: 80,
        screenY: 20,
        clientX: 80,
        clientY: 20,
        ctrlKey: false,
        altKey: false,
        shiftKey: false,
        metaKey: false,
        button: 0,
        relatedTarget: null
      });
      node.dispatchEvent(evt);
    }
  }
  var _navigator = typeof navigator === "object" ? navigator : { userAgent: "" };
  var isMacOSWebView = /* @__PURE__ */ (() => /Macintosh/.test(_navigator.userAgent) && /AppleWebKit/.test(_navigator.userAgent) && !/Safari/.test(_navigator.userAgent))();
  var saveAs = !IS_CLIENT ? () => {} : typeof HTMLAnchorElement !== "undefined" && ("download" in HTMLAnchorElement.prototype) && !isMacOSWebView ? downloadSaveAs : ("msSaveOrOpenBlob" in _navigator) ? msSaveAs : fileSaverSaveAs;
  function downloadSaveAs(blob, name = "download", opts) {
    const a = document.createElement("a");
    a.download = name;
    a.rel = "noopener";
    if (typeof blob === "string") {
      a.href = blob;
      if (a.origin !== location.origin) {
        if (corsEnabled(a.href)) {
          download(blob, name, opts);
        } else {
          a.target = "_blank";
          click(a);
        }
      } else {
        click(a);
      }
    } else {
      a.href = URL.createObjectURL(blob);
      setTimeout(function() {
        URL.revokeObjectURL(a.href);
      }, 40000);
      setTimeout(function() {
        click(a);
      }, 0);
    }
  }
  function msSaveAs(blob, name = "download", opts) {
    if (typeof blob === "string") {
      if (corsEnabled(blob)) {
        download(blob, name, opts);
      } else {
        const a = document.createElement("a");
        a.href = blob;
        a.target = "_blank";
        setTimeout(function() {
          click(a);
        });
      }
    } else {
      navigator.msSaveOrOpenBlob(bom(blob, opts), name);
    }
  }
  function fileSaverSaveAs(blob, name, opts, popup) {
    popup = popup || open("", "_blank");
    if (popup) {
      popup.document.title = popup.document.body.innerText = "downloading...";
    }
    if (typeof blob === "string")
      return download(blob, name, opts);
    const force = blob.type === "application/octet-stream";
    const isSafari = /constructor/i.test(String(_global.HTMLElement)) || "safari" in _global;
    const isChromeIOS = /CriOS\/[\d]+/.test(navigator.userAgent);
    if ((isChromeIOS || force && isSafari || isMacOSWebView) && typeof FileReader !== "undefined") {
      const reader = new FileReader;
      reader.onloadend = function() {
        let url = reader.result;
        if (typeof url !== "string") {
          popup = null;
          throw new Error("Wrong reader.result type");
        }
        url = isChromeIOS ? url : url.replace(/^data:[^;]*;/, "data:attachment/file;");
        if (popup) {
          popup.location.href = url;
        } else {
          location.assign(url);
        }
        popup = null;
      };
      reader.readAsDataURL(blob);
    } else {
      const url = URL.createObjectURL(blob);
      if (popup)
        popup.location.assign(url);
      else
        location.href = url;
      popup = null;
      setTimeout(function() {
        URL.revokeObjectURL(url);
      }, 40000);
    }
  }
  function toastMessage(message, type) {
    const piniaMessage = "\uD83C\uDF4D " + message;
    if (typeof __VUE_DEVTOOLS_TOAST__ === "function") {
      __VUE_DEVTOOLS_TOAST__(piniaMessage, type);
    } else if (type === "error") {
      console.error(piniaMessage);
    } else if (type === "warn") {
      console.warn(piniaMessage);
    } else {
      console.log(piniaMessage);
    }
  }
  function isPinia(o) {
    return "_a" in o && "install" in o;
  }
  function checkClipboardAccess() {
    if (!("clipboard" in navigator)) {
      toastMessage(`Your browser doesn't support the Clipboard API`, "error");
      return true;
    }
  }
  function checkNotFocusedError(error) {
    if (error instanceof Error && error.message.toLowerCase().includes("document is not focused")) {
      toastMessage('You need to activate the "Emulate a focused page" setting in the "Rendering" panel of devtools.', "warn");
      return true;
    }
    return false;
  }
  async function actionGlobalCopyState(pinia) {
    if (checkClipboardAccess())
      return;
    try {
      await navigator.clipboard.writeText(JSON.stringify(pinia.state.value));
      toastMessage("Global state copied to clipboard.");
    } catch (error) {
      if (checkNotFocusedError(error))
        return;
      toastMessage(`Failed to serialize the state. Check the console for more details.`, "error");
      console.error(error);
    }
  }
  async function actionGlobalPasteState(pinia) {
    if (checkClipboardAccess())
      return;
    try {
      loadStoresState(pinia, JSON.parse(await navigator.clipboard.readText()));
      toastMessage("Global state pasted from clipboard.");
    } catch (error) {
      if (checkNotFocusedError(error))
        return;
      toastMessage(`Failed to deserialize the state from clipboard. Check the console for more details.`, "error");
      console.error(error);
    }
  }
  async function actionGlobalSaveState(pinia) {
    try {
      saveAs(new Blob([JSON.stringify(pinia.state.value)], {
        type: "text/plain;charset=utf-8"
      }), "pinia-state.json");
    } catch (error) {
      toastMessage(`Failed to export the state as JSON. Check the console for more details.`, "error");
      console.error(error);
    }
  }
  var fileInput;
  function getFileOpener() {
    if (!fileInput) {
      fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.accept = ".json";
    }
    function openFile() {
      return new Promise((resolve, reject) => {
        fileInput.onchange = async () => {
          const files = fileInput.files;
          if (!files)
            return resolve(null);
          const file = files.item(0);
          if (!file)
            return resolve(null);
          return resolve({ text: await file.text(), file });
        };
        fileInput.oncancel = () => resolve(null);
        fileInput.onerror = reject;
        fileInput.click();
      });
    }
    return openFile;
  }
  async function actionGlobalOpenStateFile(pinia) {
    try {
      const open2 = getFileOpener();
      const result = await open2();
      if (!result)
        return;
      const { text, file } = result;
      loadStoresState(pinia, JSON.parse(text));
      toastMessage(`Global state imported from "${file.name}".`);
    } catch (error) {
      toastMessage(`Failed to import the state from JSON. Check the console for more details.`, "error");
      console.error(error);
    }
  }
  function loadStoresState(pinia, state) {
    for (const key in state) {
      const storeState = pinia.state.value[key];
      if (storeState) {
        Object.assign(storeState, state[key]);
      } else {
        pinia.state.value[key] = state[key];
      }
    }
  }
  function formatDisplay(display) {
    return {
      _custom: {
        display
      }
    };
  }
  var PINIA_ROOT_LABEL = "\uD83C\uDF4D Pinia (root)";
  var PINIA_ROOT_ID = "_root";
  function formatStoreForInspectorTree(store) {
    return isPinia(store) ? {
      id: PINIA_ROOT_ID,
      label: PINIA_ROOT_LABEL
    } : {
      id: store.$id,
      label: store.$id
    };
  }
  function formatStoreForInspectorState(store) {
    if (isPinia(store)) {
      const storeNames = Array.from(store._s.keys());
      const storeMap = store._s;
      const state2 = {
        state: storeNames.map((storeId) => ({
          editable: true,
          key: storeId,
          value: store.state.value[storeId]
        })),
        getters: storeNames.filter((id) => storeMap.get(id)._getters).map((id) => {
          const store2 = storeMap.get(id);
          return {
            editable: false,
            key: id,
            value: store2._getters.reduce((getters, key) => {
              getters[key] = store2[key];
              return getters;
            }, {})
          };
        })
      };
      return state2;
    }
    const state = {
      state: Object.keys(store.$state).map((key) => ({
        editable: true,
        key,
        value: store.$state[key]
      }))
    };
    if (store._getters && store._getters.length) {
      state.getters = store._getters.map((getterName) => ({
        editable: false,
        key: getterName,
        value: store[getterName]
      }));
    }
    if (store._customProperties.size) {
      state.customProperties = Array.from(store._customProperties).map((key) => ({
        editable: true,
        key,
        value: store[key]
      }));
    }
    return state;
  }
  function formatEventData(events) {
    if (!events)
      return {};
    if (Array.isArray(events)) {
      return events.reduce((data, event) => {
        data.keys.push(event.key);
        data.operations.push(event.type);
        data.oldValue[event.key] = event.oldValue;
        data.newValue[event.key] = event.newValue;
        return data;
      }, {
        oldValue: {},
        keys: [],
        operations: [],
        newValue: {}
      });
    } else {
      return {
        operation: formatDisplay(events.type),
        key: formatDisplay(events.key),
        oldValue: events.oldValue,
        newValue: events.newValue
      };
    }
  }
  function formatMutationType(type) {
    switch (type) {
      case MutationType.direct:
        return "mutation";
      case MutationType.patchFunction:
        return "$patch";
      case MutationType.patchObject:
        return "$patch";
      default:
        return "unknown";
    }
  }
  var isTimelineActive = true;
  var componentStateTypes = [];
  var MUTATIONS_LAYER_ID = "pinia:mutations";
  var INSPECTOR_ID = "pinia";
  var { assign: assign$1 } = Object;
  var getStoreType = (id) => "\uD83C\uDF4D " + id;
  function registerPiniaDevtools(app, pinia) {
    setupDevToolsPlugin({
      id: "dev.esm.pinia",
      label: "Pinia \uD83C\uDF4D",
      logo: "https://pinia.vuejs.org/logo.svg",
      packageName: "pinia",
      homepage: "https://pinia.vuejs.org",
      componentStateTypes,
      app
    }, (api) => {
      if (typeof api.now !== "function") {
        toastMessage("You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html.");
      }
      api.addTimelineLayer({
        id: MUTATIONS_LAYER_ID,
        label: `Pinia \uD83C\uDF4D`,
        color: 15064968
      });
      api.addInspector({
        id: INSPECTOR_ID,
        label: "Pinia \uD83C\uDF4D",
        icon: "storage",
        treeFilterPlaceholder: "Search stores",
        actions: [
          {
            icon: "content_copy",
            action: () => {
              actionGlobalCopyState(pinia);
            },
            tooltip: "Serialize and copy the state"
          },
          {
            icon: "content_paste",
            action: async () => {
              await actionGlobalPasteState(pinia);
              api.sendInspectorTree(INSPECTOR_ID);
              api.sendInspectorState(INSPECTOR_ID);
            },
            tooltip: "Replace the state with the content of your clipboard"
          },
          {
            icon: "save",
            action: () => {
              actionGlobalSaveState(pinia);
            },
            tooltip: "Save the state as a JSON file"
          },
          {
            icon: "folder_open",
            action: async () => {
              await actionGlobalOpenStateFile(pinia);
              api.sendInspectorTree(INSPECTOR_ID);
              api.sendInspectorState(INSPECTOR_ID);
            },
            tooltip: "Import the state from a JSON file"
          }
        ],
        nodeActions: [
          {
            icon: "restore",
            tooltip: 'Reset the state (with "$reset")',
            action: (nodeId) => {
              const store = pinia._s.get(nodeId);
              if (!store) {
                toastMessage(`Cannot reset "${nodeId}" store because it wasn't found.`, "warn");
              } else if (typeof store.$reset !== "function") {
                toastMessage(`Cannot reset "${nodeId}" store because it doesn't have a "$reset" method implemented.`, "warn");
              } else {
                store.$reset();
                toastMessage(`Store "${nodeId}" reset.`);
              }
            }
          }
        ]
      });
      api.on.inspectComponent((payload) => {
        const proxy = payload.componentInstance && payload.componentInstance.proxy;
        if (proxy && proxy._pStores) {
          const piniaStores = payload.componentInstance.proxy._pStores;
          Object.values(piniaStores).forEach((store) => {
            payload.instanceData.state.push({
              type: getStoreType(store.$id),
              key: "state",
              editable: true,
              value: store._isOptionsAPI ? {
                _custom: {
                  value: toRaw(store.$state),
                  actions: [
                    {
                      icon: "restore",
                      tooltip: "Reset the state of this store",
                      action: () => store.$reset()
                    }
                  ]
                }
              } : Object.keys(store.$state).reduce((state, key) => {
                state[key] = store.$state[key];
                return state;
              }, {})
            });
            if (store._getters && store._getters.length) {
              payload.instanceData.state.push({
                type: getStoreType(store.$id),
                key: "getters",
                editable: false,
                value: store._getters.reduce((getters, key) => {
                  try {
                    getters[key] = store[key];
                  } catch (error) {
                    getters[key] = error;
                  }
                  return getters;
                }, {})
              });
            }
          });
        }
      });
      api.on.getInspectorTree((payload) => {
        if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
          let stores = [pinia];
          stores = stores.concat(Array.from(pinia._s.values()));
          payload.rootNodes = (payload.filter ? stores.filter((store) => ("$id" in store) ? store.$id.toLowerCase().includes(payload.filter.toLowerCase()) : PINIA_ROOT_LABEL.toLowerCase().includes(payload.filter.toLowerCase())) : stores).map(formatStoreForInspectorTree);
        }
      });
      globalThis.$pinia = pinia;
      api.on.getInspectorState((payload) => {
        if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
          const inspectedStore = payload.nodeId === PINIA_ROOT_ID ? pinia : pinia._s.get(payload.nodeId);
          if (!inspectedStore) {
            return;
          }
          if (inspectedStore) {
            if (payload.nodeId !== PINIA_ROOT_ID)
              globalThis.$store = toRaw(inspectedStore);
            payload.state = formatStoreForInspectorState(inspectedStore);
          }
        }
      });
      api.on.editInspectorState((payload) => {
        if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
          const inspectedStore = payload.nodeId === PINIA_ROOT_ID ? pinia : pinia._s.get(payload.nodeId);
          if (!inspectedStore) {
            return toastMessage(`store "${payload.nodeId}" not found`, "error");
          }
          const { path } = payload;
          if (!isPinia(inspectedStore)) {
            if (path.length !== 1 || !inspectedStore._customProperties.has(path[0]) || path[0] in inspectedStore.$state) {
              path.unshift("$state");
            }
          } else {
            path.unshift("state");
          }
          isTimelineActive = false;
          payload.set(inspectedStore, path, payload.state.value);
          isTimelineActive = true;
        }
      });
      api.on.editComponentState((payload) => {
        if (payload.type.startsWith("\uD83C\uDF4D")) {
          const storeId = payload.type.replace(/^🍍\s*/, "");
          const store = pinia._s.get(storeId);
          if (!store) {
            return toastMessage(`store "${storeId}" not found`, "error");
          }
          const { path } = payload;
          if (path[0] !== "state") {
            return toastMessage(`Invalid path for store "${storeId}":
${path}
Only state can be modified.`);
          }
          path[0] = "$state";
          isTimelineActive = false;
          payload.set(store, path, payload.state.value);
          isTimelineActive = true;
        }
      });
    });
  }
  function addStoreToDevtools(app, store) {
    if (!componentStateTypes.includes(getStoreType(store.$id))) {
      componentStateTypes.push(getStoreType(store.$id));
    }
    setupDevToolsPlugin({
      id: "dev.esm.pinia",
      label: "Pinia \uD83C\uDF4D",
      logo: "https://pinia.vuejs.org/logo.svg",
      packageName: "pinia",
      homepage: "https://pinia.vuejs.org",
      componentStateTypes,
      app,
      settings: {
        logStoreChanges: {
          label: "Notify about new/deleted stores",
          type: "boolean",
          defaultValue: true
        }
      }
    }, (api) => {
      const now = typeof api.now === "function" ? api.now.bind(api) : Date.now;
      store.$onAction(({ after, onError, name, args }) => {
        const groupId = runningActionId++;
        api.addTimelineEvent({
          layerId: MUTATIONS_LAYER_ID,
          event: {
            time: now(),
            title: "\uD83D\uDEEB " + name,
            subtitle: "start",
            data: {
              store: formatDisplay(store.$id),
              action: formatDisplay(name),
              args
            },
            groupId
          }
        });
        after((result) => {
          activeAction = undefined;
          api.addTimelineEvent({
            layerId: MUTATIONS_LAYER_ID,
            event: {
              time: now(),
              title: "\uD83D\uDEEC " + name,
              subtitle: "end",
              data: {
                store: formatDisplay(store.$id),
                action: formatDisplay(name),
                args,
                result
              },
              groupId
            }
          });
        });
        onError((error) => {
          activeAction = undefined;
          api.addTimelineEvent({
            layerId: MUTATIONS_LAYER_ID,
            event: {
              time: now(),
              logType: "error",
              title: "\uD83D\uDCA5 " + name,
              subtitle: "end",
              data: {
                store: formatDisplay(store.$id),
                action: formatDisplay(name),
                args,
                error
              },
              groupId
            }
          });
        });
      }, true);
      store._customProperties.forEach((name) => {
        watch2(() => unref(store[name]), (newValue, oldValue) => {
          api.notifyComponentUpdate();
          api.sendInspectorState(INSPECTOR_ID);
          if (isTimelineActive) {
            api.addTimelineEvent({
              layerId: MUTATIONS_LAYER_ID,
              event: {
                time: now(),
                title: "Change",
                subtitle: name,
                data: {
                  newValue,
                  oldValue
                },
                groupId: activeAction
              }
            });
          }
        }, { deep: true });
      });
      store.$subscribe(({ events, type }, state) => {
        api.notifyComponentUpdate();
        api.sendInspectorState(INSPECTOR_ID);
        if (!isTimelineActive)
          return;
        const eventData = {
          time: now(),
          title: formatMutationType(type),
          data: assign$1({ store: formatDisplay(store.$id) }, formatEventData(events)),
          groupId: activeAction
        };
        if (type === MutationType.patchFunction) {
          eventData.subtitle = "⤵️";
        } else if (type === MutationType.patchObject) {
          eventData.subtitle = "\uD83E\uDDE9";
        } else if (events && !Array.isArray(events)) {
          eventData.subtitle = events.type;
        }
        if (events) {
          eventData.data["rawEvent(s)"] = {
            _custom: {
              display: "DebuggerEvent",
              type: "object",
              tooltip: "raw DebuggerEvent[]",
              value: events
            }
          };
        }
        api.addTimelineEvent({
          layerId: MUTATIONS_LAYER_ID,
          event: eventData
        });
      }, { detached: true, flush: "sync" });
      const hotUpdate = store._hotUpdate;
      store._hotUpdate = markRaw((newStore) => {
        hotUpdate(newStore);
        api.addTimelineEvent({
          layerId: MUTATIONS_LAYER_ID,
          event: {
            time: now(),
            title: "\uD83D\uDD25 " + store.$id,
            subtitle: "HMR update",
            data: {
              store: formatDisplay(store.$id),
              info: formatDisplay(`HMR update`)
            }
          }
        });
        api.notifyComponentUpdate();
        api.sendInspectorTree(INSPECTOR_ID);
        api.sendInspectorState(INSPECTOR_ID);
      });
      const { $dispose } = store;
      store.$dispose = () => {
        $dispose();
        api.notifyComponentUpdate();
        api.sendInspectorTree(INSPECTOR_ID);
        api.sendInspectorState(INSPECTOR_ID);
        api.getSettings().logStoreChanges && toastMessage(`Disposed "${store.$id}" store \uD83D\uDDD1`);
      };
      api.notifyComponentUpdate();
      api.sendInspectorTree(INSPECTOR_ID);
      api.sendInspectorState(INSPECTOR_ID);
      api.getSettings().logStoreChanges && toastMessage(`"${store.$id}" store installed \uD83C\uDD95`);
    });
  }
  var runningActionId = 0;
  var activeAction;
  function patchActionForGrouping(store, actionNames, wrapWithProxy) {
    const actions = actionNames.reduce((storeActions, actionName) => {
      storeActions[actionName] = toRaw(store)[actionName];
      return storeActions;
    }, {});
    for (const actionName in actions) {
      store[actionName] = function() {
        const _actionId = runningActionId;
        const trackedStore = wrapWithProxy ? new Proxy(store, {
          get(...args) {
            activeAction = _actionId;
            return Reflect.get(...args);
          },
          set(...args) {
            activeAction = _actionId;
            return Reflect.set(...args);
          }
        }) : store;
        activeAction = _actionId;
        const retValue = actions[actionName].apply(trackedStore, arguments);
        activeAction = undefined;
        return retValue;
      };
    }
  }
  function devtoolsPlugin({ app, store, options }) {
    if (store.$id.startsWith("__hot:")) {
      return;
    }
    store._isOptionsAPI = !!options.state;
    if (!store._p._testing) {
      patchActionForGrouping(store, Object.keys(options.actions), store._isOptionsAPI);
      const originalHotUpdate = store._hotUpdate;
      toRaw(store)._hotUpdate = function(newStore) {
        originalHotUpdate.apply(this, arguments);
        patchActionForGrouping(store, Object.keys(newStore._hmrPayload.actions), !!store._isOptionsAPI);
      };
    }
    addStoreToDevtools(app, store);
  }
  function createPinia() {
    const scope = effectScope(true);
    const state = scope.run(() => ref({}));
    let _p = [];
    let toBeInstalled = [];
    const pinia = markRaw({
      install(app) {
        setActivePinia(pinia);
        pinia._a = app;
        app.provide(piniaSymbol, pinia);
        app.config.globalProperties.$pinia = pinia;
        if (IS_CLIENT) {
          registerPiniaDevtools(app, pinia);
        }
        toBeInstalled.forEach((plugin) => _p.push(plugin));
        toBeInstalled = [];
      },
      use(plugin) {
        if (!this._a) {
          toBeInstalled.push(plugin);
        } else {
          _p.push(plugin);
        }
        return this;
      },
      _p,
      _a: null,
      _e: scope,
      _s: new Map,
      state
    });
    if (IS_CLIENT && typeof Proxy !== "undefined") {
      pinia.use(devtoolsPlugin);
    }
    return pinia;
  }
  function patchObject(newState, oldState) {
    for (const key in oldState) {
      const subPatch = oldState[key];
      if (!(key in newState)) {
        continue;
      }
      const targetValue = newState[key];
      if (isPlainObject4(targetValue) && isPlainObject4(subPatch) && !isRef2(subPatch) && !isReactive(subPatch)) {
        newState[key] = patchObject(targetValue, subPatch);
      } else {
        newState[key] = subPatch;
      }
    }
    return newState;
  }
  var noop = () => {};
  function addSubscription(subscriptions, callback, detached, onCleanup = noop) {
    subscriptions.add(callback);
    const removeSubscription = () => {
      const isDel = subscriptions.delete(callback);
      isDel && onCleanup();
    };
    if (!detached && getCurrentScope()) {
      onScopeDispose(removeSubscription);
    }
    return removeSubscription;
  }
  function triggerSubscriptions(subscriptions, ...args) {
    subscriptions.forEach((callback) => {
      callback(...args);
    });
  }
  var fallbackRunWithContext = (fn) => fn();
  var ACTION_MARKER = Symbol();
  var ACTION_NAME = Symbol();
  function mergeReactiveObjects(target2, patchToApply) {
    if (target2 instanceof Map && patchToApply instanceof Map) {
      patchToApply.forEach((value, key) => target2.set(key, value));
    } else if (target2 instanceof Set && patchToApply instanceof Set) {
      patchToApply.forEach(target2.add, target2);
    }
    for (const key in patchToApply) {
      if (!patchToApply.hasOwnProperty(key))
        continue;
      const subPatch = patchToApply[key];
      const targetValue = target2[key];
      if (isPlainObject4(targetValue) && isPlainObject4(subPatch) && target2.hasOwnProperty(key) && !isRef2(subPatch) && !isReactive(subPatch)) {
        target2[key] = mergeReactiveObjects(targetValue, subPatch);
      } else {
        target2[key] = subPatch;
      }
    }
    return target2;
  }
  var skipHydrateSymbol = Symbol("pinia:skipHydration");
  function shouldHydrate(obj) {
    return !isPlainObject4(obj) || !Object.prototype.hasOwnProperty.call(obj, skipHydrateSymbol);
  }
  var { assign } = Object;
  function isComputed(o) {
    return !!(isRef2(o) && o.effect);
  }
  function createOptionsStore(id, options, pinia, hot) {
    const { state, actions, getters } = options;
    const initialState = pinia.state.value[id];
    let store;
    function setup() {
      if (!initialState && !hot) {
        pinia.state.value[id] = state ? state() : {};
      }
      const localState = hot ? toRefs(ref(state ? state() : {}).value) : toRefs(pinia.state.value[id]);
      return assign(localState, actions, Object.keys(getters || {}).reduce((computedGetters, name) => {
        if (name in localState) {
          console.warn(`[\uD83C\uDF4D]: A getter cannot have the same name as another state property. Rename one of them. Found with "${name}" in store "${id}".`);
        }
        computedGetters[name] = markRaw(computed2(() => {
          setActivePinia(pinia);
          const store2 = pinia._s.get(id);
          return getters[name].call(store2, store2);
        }));
        return computedGetters;
      }, {}));
    }
    store = createSetupStore(id, setup, options, pinia, hot, true);
    return store;
  }
  function createSetupStore($id, setup, options = {}, pinia, hot, isOptionsStore) {
    let scope;
    const optionsForPlugin = assign({ actions: {} }, options);
    if (!pinia._e.active) {
      throw new Error("Pinia destroyed");
    }
    const $subscribeOptions = { deep: true };
    if (true) {
      $subscribeOptions.onTrigger = (event) => {
        if (isListening) {
          debuggerEvents = event;
        } else if (isListening == false && !store._hotUpdating) {
          if (Array.isArray(debuggerEvents)) {
            debuggerEvents.push(event);
          } else {
            console.error("\uD83C\uDF4D debuggerEvents should be an array. This is most likely an internal Pinia bug.");
          }
        }
      };
    }
    let isListening;
    let isSyncListening;
    let subscriptions = new Set;
    let actionSubscriptions = new Set;
    let debuggerEvents;
    const initialState = pinia.state.value[$id];
    if (!isOptionsStore && !initialState && !hot) {
      pinia.state.value[$id] = {};
    }
    const hotState = ref({});
    let activeListener;
    function $patch(partialStateOrMutator) {
      let subscriptionMutation;
      isListening = isSyncListening = false;
      if (true) {
        debuggerEvents = [];
      }
      if (typeof partialStateOrMutator === "function") {
        partialStateOrMutator(pinia.state.value[$id]);
        subscriptionMutation = {
          type: MutationType.patchFunction,
          storeId: $id,
          events: debuggerEvents
        };
      } else {
        mergeReactiveObjects(pinia.state.value[$id], partialStateOrMutator);
        subscriptionMutation = {
          type: MutationType.patchObject,
          payload: partialStateOrMutator,
          storeId: $id,
          events: debuggerEvents
        };
      }
      const myListenerId = activeListener = Symbol();
      nextTick().then(() => {
        if (activeListener === myListenerId) {
          isListening = true;
        }
      });
      isSyncListening = true;
      triggerSubscriptions(subscriptions, subscriptionMutation, pinia.state.value[$id]);
    }
    const $reset = isOptionsStore ? function $reset2() {
      const { state } = options;
      const newState = state ? state() : {};
      this.$patch(($state) => {
        assign($state, newState);
      });
    } : () => {
      throw new Error(`\uD83C\uDF4D: Store "${$id}" is built using the setup syntax and does not implement $reset().`);
    };
    function $dispose() {
      scope.stop();
      subscriptions.clear();
      actionSubscriptions.clear();
      pinia._s.delete($id);
    }
    const action = (fn, name = "") => {
      if (ACTION_MARKER in fn) {
        fn[ACTION_NAME] = name;
        return fn;
      }
      const wrappedAction = function() {
        setActivePinia(pinia);
        const args = Array.from(arguments);
        const afterCallbackSet = new Set;
        const onErrorCallbackSet = new Set;
        function after(callback) {
          afterCallbackSet.add(callback);
        }
        function onError(callback) {
          onErrorCallbackSet.add(callback);
        }
        triggerSubscriptions(actionSubscriptions, {
          args,
          name: wrappedAction[ACTION_NAME],
          store,
          after,
          onError
        });
        let ret;
        try {
          ret = fn.apply(this && this.$id === $id ? this : store, args);
        } catch (error) {
          triggerSubscriptions(onErrorCallbackSet, error);
          throw error;
        }
        if (ret instanceof Promise) {
          return ret.then((value) => {
            triggerSubscriptions(afterCallbackSet, value);
            return value;
          }).catch((error) => {
            triggerSubscriptions(onErrorCallbackSet, error);
            return Promise.reject(error);
          });
        }
        triggerSubscriptions(afterCallbackSet, ret);
        return ret;
      };
      wrappedAction[ACTION_MARKER] = true;
      wrappedAction[ACTION_NAME] = name;
      return wrappedAction;
    };
    const _hmrPayload = /* @__PURE__ */ markRaw({
      actions: {},
      getters: {},
      state: [],
      hotState
    });
    const partialStore = {
      _p: pinia,
      $id,
      $onAction: addSubscription.bind(null, actionSubscriptions),
      $patch,
      $reset,
      $subscribe(callback, options2 = {}) {
        const removeSubscription = addSubscription(subscriptions, callback, options2.detached, () => stopWatcher());
        const stopWatcher = scope.run(() => watch2(() => pinia.state.value[$id], (state) => {
          if (options2.flush === "sync" ? isSyncListening : isListening) {
            callback({
              storeId: $id,
              type: MutationType.direct,
              events: debuggerEvents
            }, state);
          }
        }, assign({}, $subscribeOptions, options2)));
        return removeSubscription;
      },
      $dispose
    };
    const store = reactive(assign({
      _hmrPayload,
      _customProperties: markRaw(new Set)
    }, partialStore));
    pinia._s.set($id, store);
    const runWithContext = pinia._a && pinia._a.runWithContext || fallbackRunWithContext;
    const setupStore = runWithContext(() => pinia._e.run(() => (scope = effectScope()).run(() => setup({ action }))));
    for (const key in setupStore) {
      const prop = setupStore[key];
      if (isRef2(prop) && !isComputed(prop) || isReactive(prop)) {
        if (hot) {
          hotState.value[key] = toRef(setupStore, key);
        } else if (!isOptionsStore) {
          if (initialState && shouldHydrate(prop)) {
            if (isRef2(prop)) {
              prop.value = initialState[key];
            } else {
              mergeReactiveObjects(prop, initialState[key]);
            }
          }
          pinia.state.value[$id][key] = prop;
        }
        if (true) {
          _hmrPayload.state.push(key);
        }
      } else if (typeof prop === "function") {
        const actionValue = hot ? prop : action(prop, key);
        setupStore[key] = actionValue;
        if (true) {
          _hmrPayload.actions[key] = prop;
        }
        optionsForPlugin.actions[key] = prop;
      } else if (true) {
        if (isComputed(prop)) {
          _hmrPayload.getters[key] = isOptionsStore ? options.getters[key] : prop;
          if (IS_CLIENT) {
            const getters = setupStore._getters || (setupStore._getters = markRaw([]));
            getters.push(key);
          }
        }
      }
    }
    assign(store, setupStore);
    assign(toRaw(store), setupStore);
    Object.defineProperty(store, "$state", {
      get: () => hot ? hotState.value : pinia.state.value[$id],
      set: (state) => {
        if (hot) {
          throw new Error("cannot set hotState");
        }
        $patch(($state) => {
          assign($state, state);
        });
      }
    });
    if (true) {
      store._hotUpdate = markRaw((newStore) => {
        store._hotUpdating = true;
        newStore._hmrPayload.state.forEach((stateKey) => {
          if (stateKey in store.$state) {
            const newStateTarget = newStore.$state[stateKey];
            const oldStateSource = store.$state[stateKey];
            if (typeof newStateTarget === "object" && isPlainObject4(newStateTarget) && isPlainObject4(oldStateSource)) {
              patchObject(newStateTarget, oldStateSource);
            } else {
              newStore.$state[stateKey] = oldStateSource;
            }
          }
          store[stateKey] = toRef(newStore.$state, stateKey);
        });
        Object.keys(store.$state).forEach((stateKey) => {
          if (!(stateKey in newStore.$state)) {
            delete store[stateKey];
          }
        });
        isListening = false;
        isSyncListening = false;
        pinia.state.value[$id] = toRef(newStore._hmrPayload, "hotState");
        isSyncListening = true;
        nextTick().then(() => {
          isListening = true;
        });
        for (const actionName in newStore._hmrPayload.actions) {
          const actionFn = newStore[actionName];
          store[actionName] = action(actionFn, actionName);
        }
        for (const getterName in newStore._hmrPayload.getters) {
          const getter = newStore._hmrPayload.getters[getterName];
          const getterValue = isOptionsStore ? computed2(() => {
            setActivePinia(pinia);
            return getter.call(store, store);
          }) : getter;
          store[getterName] = getterValue;
        }
        Object.keys(store._hmrPayload.getters).forEach((key) => {
          if (!(key in newStore._hmrPayload.getters)) {
            delete store[key];
          }
        });
        Object.keys(store._hmrPayload.actions).forEach((key) => {
          if (!(key in newStore._hmrPayload.actions)) {
            delete store[key];
          }
        });
        store._hmrPayload = newStore._hmrPayload;
        store._getters = newStore._getters;
        store._hotUpdating = false;
      });
    }
    if (IS_CLIENT) {
      const nonEnumerable = {
        writable: true,
        configurable: true,
        enumerable: false
      };
      ["_p", "_hmrPayload", "_getters", "_customProperties"].forEach((p2) => {
        Object.defineProperty(store, p2, assign({ value: store[p2] }, nonEnumerable));
      });
    }
    pinia._p.forEach((extender) => {
      if (IS_CLIENT) {
        const extensions = scope.run(() => extender({
          store,
          app: pinia._a,
          pinia,
          options: optionsForPlugin
        }));
        Object.keys(extensions || {}).forEach((key) => store._customProperties.add(key));
        assign(store, extensions);
      } else {
        assign(store, scope.run(() => extender({
          store,
          app: pinia._a,
          pinia,
          options: optionsForPlugin
        })));
      }
    });
    if (store.$state && typeof store.$state === "object" && typeof store.$state.constructor === "function" && !store.$state.constructor.toString().includes("[native code]")) {
      console.warn(`[\uD83C\uDF4D]: The "state" must be a plain object. It cannot be
` + `	state: () => new MyClass()
` + `Found in store "${store.$id}".`);
    }
    if (initialState && isOptionsStore && options.hydrate) {
      options.hydrate(store.$state, initialState);
    }
    isListening = true;
    isSyncListening = true;
    return store;
  }
  /*! #__NO_SIDE_EFFECTS__ */
  function defineStore(id, setup, setupOptions) {
    let options;
    const isSetupStore = typeof setup === "function";
    options = isSetupStore ? setupOptions : setup;
    function useStore(pinia, hot) {
      const hasContext = hasInjectionContext();
      pinia = pinia || (hasContext ? inject(piniaSymbol, null) : null);
      if (pinia)
        setActivePinia(pinia);
      if (!activePinia) {
        throw new Error(`[\uD83C\uDF4D]: "getActivePinia()" was called but there was no active Pinia. Are you trying to use a store before calling "app.use(pinia)"?
` + `See https://pinia.vuejs.org/core-concepts/outside-component-usage.html for help.
` + `This will fail in production.`);
      }
      pinia = activePinia;
      if (!pinia._s.has(id)) {
        if (isSetupStore) {
          createSetupStore(id, setup, options, pinia);
        } else {
          createOptionsStore(id, options, pinia);
        }
        if (true) {
          useStore._pinia = pinia;
        }
      }
      const store = pinia._s.get(id);
      if (hot) {
        const hotId = "__hot:" + id;
        const newStore = isSetupStore ? createSetupStore(hotId, setup, options, pinia, true) : createOptionsStore(hotId, assign({}, options), pinia, true);
        hot._hotUpdate(newStore);
        delete pinia.state.value[hotId];
        pinia._s.delete(hotId);
      }
      if (IS_CLIENT) {
        const currentInstance2 = getCurrentInstance();
        if (currentInstance2 && currentInstance2.proxy && !hot) {
          const vm = currentInstance2.proxy;
          const cache = "_pStores" in vm ? vm._pStores : vm._pStores = {};
          cache[id] = store;
        }
      }
      return store;
    }
    useStore.$id = id;
    return useStore;
  }
  function storeToRefs(store) {
    const rawStore = toRaw(store);
    const refs = {};
    for (const key in rawStore) {
      const value = rawStore[key];
      if (value.effect) {
        refs[key] = computed2({
          get: () => store[key],
          set(value2) {
            store[key] = value2;
          }
        });
      } else if (isRef2(value) || isReactive(value)) {
        refs[key] = toRef(store, key);
      }
    }
    return refs;
  }

  // resources/islands/setup.ts
  var setup_default = (app) => {
    const pinia = createPinia();
    app.use(pinia);
  };

  // resources/islands/message-header.vue
  var __component__ = {};
  var _hoisted_1 = { class: "message-container" };
  function render(_ctx, _cache) {
    return openBlock(), createElementBlock("div", _hoisted_1, [..._cache[0] || (_cache[0] = [
      createBaseVNode("div", { class: "message assistant-message" }, [
        createBaseVNode("p", null, "Hi! I'm Liva, a software engineer who builds clean, scalable web applications."),
        createBaseVNode("p", null, "Ask me anything, or pick a question below to get started.")
      ], -1)
    ])]);
  }
  __component__.render = render;
  var message_header_default = __component__;

  // resources/islands/stores/messageStore.ts
  var useMessageStore = defineStore("messages", () => {
    const messages = ref([]);
    const conversation = ref(null);
    const currentSessionId = ref(null);
    const isLoading = ref(false);
    const error = ref(null);
    const isPending = ref(false);
    const currentMessages = computed2(() => {
      return messages.value;
    });
    const messageCount = computed2(() => currentMessages.value.length);
    const hasMessages = computed2(() => messageCount.value > 0);
    const lastMessage = computed2(() => {
      const msgs = currentMessages.value;
      return msgs.length > 0 ? msgs[msgs.length - 1] : null;
    });
    async function fetchHistory(sessionId) {
      try {
        isLoading.value = true;
        error.value = null;
        currentSessionId.value = sessionId;
        const response = await fetch(`/api/chat/history/${sessionId}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch chat history: ${response.statusText}`);
        }
        const data = await response.json();
        if (Array.isArray(data)) {
          messages.value = data.map((msg, index) => ({
            id: `history_${index}`,
            conversation_id: "",
            role: msg.role,
            content: msg.content,
            created_at: msg.createdAt || msg.created_at || new Date().toISOString(),
            updated_at: msg.createdAt || msg.created_at || new Date().toISOString()
          }));
        }
      } catch (err) {
        error.value = err instanceof Error ? err.message : "Failed to fetch messages";
        console.error("Error fetching chat history:", err);
      } finally {
        isLoading.value = false;
      }
    }
    function addMessage(message) {
      const existingIndex = messages.value.findIndex((m) => m.id === message.id);
      if (existingIndex >= 0) {
        messages.value[existingIndex] = message;
      } else {
        messages.value.push(message);
      }
    }
    function addUserMessage(content) {
      const tempId = `temp_${Date.now()}`;
      const userMessage = {
        id: tempId,
        conversation_id: conversation.value?.id || "",
        role: "user",
        content,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      addMessage(userMessage);
      return tempId;
    }
    function addAssistantMessage(content, isTyping = false) {
      const tempId = `assistant_${Date.now()}`;
      const assistantMessage = {
        id: tempId,
        conversation_id: conversation.value?.id || "",
        role: "assistant",
        content,
        is_typing: isTyping,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      addMessage(assistantMessage);
      if (!isTyping) {
        setPending(false);
      }
      return tempId;
    }
    function updateMessage(messageId, updates) {
      const index = messages.value.findIndex((m) => m.id === messageId);
      if (index >= 0) {
        messages.value[index] = { ...messages.value[index], ...updates };
      }
    }
    function sendMessage(content) {
      if (!content.trim() || !currentSessionId.value) {
        return;
      }
      addUserMessage(content);
      setPending(true);
    }
    function setPending(state) {
      isPending.value = state;
    }
    function initializeStore(sessionId) {
      currentSessionId.value = sessionId;
      fetchHistory(sessionId);
    }
    return {
      messages,
      conversation,
      currentSessionId,
      isLoading,
      error,
      isPending,
      currentMessages,
      messageCount,
      hasMessages,
      lastMessage,
      fetchHistory,
      addMessage,
      addUserMessage,
      addAssistantMessage,
      updateMessage,
      sendMessage,
      setPending,
      initializeStore
    };
  });

  // resources/islands/composables/useSessionId.ts
  var sessionId = ref(null);
  var LOCAL_STORAGE_KEY = "chatSessionId";
  function useSessionId() {
    function getOrCreateSessionId() {
      if (sessionId.value) {
        return sessionId.value;
      }
      let storedSessionId = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (!storedSessionId) {
        const sessionInput = document.getElementById("available-session-id");
        if (sessionInput && sessionInput.value) {
          storedSessionId = sessionInput.value;
          localStorage.setItem(LOCAL_STORAGE_KEY, storedSessionId);
        }
      }
      if (!storedSessionId) {
        throw new Error("No session ID available. Make sure the available-session-id input element is set by the server.");
      }
      sessionId.value = storedSessionId;
      return storedSessionId;
    }
    function initializeSessionId() {
      return getOrCreateSessionId();
    }
    function refreshSessionId() {
      sessionId.value = null;
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      return getOrCreateSessionId();
    }
    function getCurrentSessionId() {
      return sessionId.value;
    }
    if (!sessionId.value) {
      try {
        initializeSessionId();
      } catch (error) {
        console.warn("Session ID not available yet:", error);
      }
    }
    return {
      sessionId: readonly(sessionId),
      getOrCreateSessionId,
      initializeSessionId,
      refreshSessionId,
      getCurrentSessionId
    };
  }

  // node_modules/marked/lib/marked.esm.js
  function M() {
    return { async: false, breaks: false, extensions: null, gfm: true, hooks: null, pedantic: false, renderer: null, silent: false, tokenizer: null, walkTokens: null };
  }
  var O = M();
  function G(u) {
    O = u;
  }
  var _ = { exec: () => null };
  function k(u, e = "") {
    let t = typeof u == "string" ? u : u.source, n = { replace: (r, i) => {
      let s = typeof i == "string" ? i : i.source;
      return s = s.replace(m.caret, "$1"), t = t.replace(r, s), n;
    }, getRegex: () => new RegExp(t, e) };
    return n;
  }
  var be = (() => {
    try {
      return !!new RegExp("(?<=1)(?<!1)");
    } catch {
      return false;
    }
  })();
  var m = { codeRemoveIndent: /^(?: {1,4}| {0,3}\t)/gm, outputLinkReplace: /\\([\[\]])/g, indentCodeCompensation: /^(\s+)(?:```)/, beginningSpace: /^\s+/, endingHash: /#$/, startingSpaceChar: /^ /, endingSpaceChar: / $/, nonSpaceChar: /[^ ]/, newLineCharGlobal: /\n/g, tabCharGlobal: /\t/g, multipleSpaceGlobal: /\s+/g, blankLine: /^[ \t]*$/, doubleBlankLine: /\n[ \t]*\n[ \t]*$/, blockquoteStart: /^ {0,3}>/, blockquoteSetextReplace: /\n {0,3}((?:=+|-+) *)(?=\n|$)/g, blockquoteSetextReplace2: /^ {0,3}>[ \t]?/gm, listReplaceNesting: /^ {1,4}(?=( {4})*[^ ])/g, listIsTask: /^\[[ xX]\] +\S/, listReplaceTask: /^\[[ xX]\] +/, listTaskCheckbox: /\[[ xX]\]/, anyLine: /\n.*\n/, hrefBrackets: /^<(.*)>$/, tableDelimiter: /[:|]/, tableAlignChars: /^\||\| *$/g, tableRowBlankLine: /\n[ \t]*$/, tableAlignRight: /^ *-+: *$/, tableAlignCenter: /^ *:-+: *$/, tableAlignLeft: /^ *:-+ *$/, startATag: /^<a /i, endATag: /^<\/a>/i, startPreScriptTag: /^<(pre|code|kbd|script)(\s|>)/i, endPreScriptTag: /^<\/(pre|code|kbd|script)(\s|>)/i, startAngleBracket: /^</, endAngleBracket: />$/, pedanticHrefTitle: /^([^'"]*[^\s])\s+(['"])(.*)\2/, unicodeAlphaNumeric: /[\p{L}\p{N}]/u, escapeTest: /[&<>"']/, escapeReplace: /[&<>"']/g, escapeTestNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/, escapeReplaceNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g, caret: /(^|[^\[])\^/g, percentDecode: /%25/g, findPipe: /\|/g, splitPipe: / \|/, slashPipe: /\\\|/g, carriageReturn: /\r\n|\r/g, spaceLine: /^ +$/gm, notSpaceStart: /^\S*/, endingNewline: /\n$/, listItemRegex: (u) => new RegExp(`^( {0,3}${u})((?:[	 ][^\\n]*)?(?:\\n|$))`), nextBulletRegex: (u) => new RegExp(`^ {0,${Math.min(3, u - 1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`), hrRegex: (u) => new RegExp(`^ {0,${Math.min(3, u - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`), fencesBeginRegex: (u) => new RegExp(`^ {0,${Math.min(3, u - 1)}}(?:\`\`\`|~~~)`), headingBeginRegex: (u) => new RegExp(`^ {0,${Math.min(3, u - 1)}}#`), htmlBeginRegex: (u) => new RegExp(`^ {0,${Math.min(3, u - 1)}}<(?:[a-z].*>|!--)`, "i"), blockquoteBeginRegex: (u) => new RegExp(`^ {0,${Math.min(3, u - 1)}}>`) };
  var Re = /^(?:[ \t]*(?:\n|$))+/;
  var Oe = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/;
  var Te = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/;
  var C = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/;
  var we = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/;
  var Q = / {0,3}(?:[*+-]|\d{1,9}[.)])/;
  var se = /^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/;
  var ie = k(se).replace(/bull/g, Q).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/\|table/g, "").getRegex();
  var ye = k(se).replace(/bull/g, Q).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/table/g, / {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex();
  var j = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/;
  var Pe = /^[^\n]+/;
  var F = /(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/;
  var Se = k(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label", F).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex();
  var $e = k(/^(bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g, Q).getRegex();
  var v = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul";
  var U = /<!--(?:-?>|[\s\S]*?(?:-->|$))/;
  var _e = k("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ \t]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ \t]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ \t]*)+\\n|$))", "i").replace("comment", U).replace("tag", v).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex();
  var oe = k(j).replace("hr", C).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", v).getRegex();
  var Le = k(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", oe).getRegex();
  var K = { blockquote: Le, code: Oe, def: Se, fences: Te, heading: we, hr: C, html: _e, lheading: ie, list: $e, newline: Re, paragraph: oe, table: _, text: Pe };
  var ne = k("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr", C).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", "(?: {4}| {0,3}\t)[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", v).getRegex();
  var Me = { ...K, lheading: ye, table: ne, paragraph: k(j).replace("hr", C).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", ne).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", v).getRegex() };
  var ze = { ...K, html: k(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment", U).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(), def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/, heading: /^(#{1,6})(.*)(?:\n+|$)/, fences: _, lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/, paragraph: k(j).replace("hr", C).replace("heading", ` *#{1,6} *[^
]`).replace("lheading", ie).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex() };
  var Ee = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/;
  var Ie = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/;
  var ae = /^( {2,}|\\)\n(?!\s*$)/;
  var Ae = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/;
  var z = /[\p{P}\p{S}]/u;
  var H = /[\s\p{P}\p{S}]/u;
  var W = /[^\s\p{P}\p{S}]/u;
  var Ce = k(/^((?![*_])punctSpace)/, "u").replace(/punctSpace/g, H).getRegex();
  var le = /(?!~)[\p{P}\p{S}]/u;
  var Be = /(?!~)[\s\p{P}\p{S}]/u;
  var De = /(?:[^\s\p{P}\p{S}]|~)/u;
  var qe = k(/link|precode-code|html/, "g").replace("link", /\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-", be ? "(?<!`)()" : "(^^|[^`])").replace("code", /(?<b>`+)[^`]+\k<b>(?!`)/).replace("html", /<(?! )[^<>]*?>/).getRegex();
  var ue = /^(?:\*+(?:((?!\*)punct)|([^\s*]))?)|^_+(?:((?!_)punct)|([^\s_]))?/;
  var ve = k(ue, "u").replace(/punct/g, z).getRegex();
  var He = k(ue, "u").replace(/punct/g, le).getRegex();
  var pe = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)";
  var Ze = k(pe, "gu").replace(/notPunctSpace/g, W).replace(/punctSpace/g, H).replace(/punct/g, z).getRegex();
  var Ge = k(pe, "gu").replace(/notPunctSpace/g, De).replace(/punctSpace/g, Be).replace(/punct/g, le).getRegex();
  var Ne = k("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)", "gu").replace(/notPunctSpace/g, W).replace(/punctSpace/g, H).replace(/punct/g, z).getRegex();
  var Qe = k(/^~~?(?:((?!~)punct)|[^\s~])/, "u").replace(/punct/g, z).getRegex();
  var je = "^[^~]+(?=[^~])|(?!~)punct(~~?)(?=[\\s]|$)|notPunctSpace(~~?)(?!~)(?=punctSpace|$)|(?!~)punctSpace(~~?)(?=notPunctSpace)|[\\s](~~?)(?!~)(?=punct)|(?!~)punct(~~?)(?!~)(?=punct)|notPunctSpace(~~?)(?=notPunctSpace)";
  var Fe = k(je, "gu").replace(/notPunctSpace/g, W).replace(/punctSpace/g, H).replace(/punct/g, z).getRegex();
  var Ue = k(/\\(punct)/, "gu").replace(/punct/g, z).getRegex();
  var Ke = k(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex();
  var We = k(U).replace("(?:-->|$)", "-->").getRegex();
  var Xe = k("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment", We).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex();
  var q = /(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+(?!`)[^`]*?`+(?!`)|``+(?=\])|[^\[\]\\`])*?/;
  var Je = k(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]+(?:\n[ \t]*)?|\n[ \t]*)(title))?\s*\)/).replace("label", q).replace("href", /<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex();
  var ce = k(/^!?\[(label)\]\[(ref)\]/).replace("label", q).replace("ref", F).getRegex();
  var he = k(/^!?\[(ref)\](?:\[\])?/).replace("ref", F).getRegex();
  var Ve = k("reflink|nolink(?!\\()", "g").replace("reflink", ce).replace("nolink", he).getRegex();
  var re = /[hH][tT][tT][pP][sS]?|[fF][tT][pP]/;
  var X = { _backpedal: _, anyPunctuation: Ue, autolink: Ke, blockSkip: qe, br: ae, code: Ie, del: _, delLDelim: _, delRDelim: _, emStrongLDelim: ve, emStrongRDelimAst: Ze, emStrongRDelimUnd: Ne, escape: Ee, link: Je, nolink: he, punctuation: Ce, reflink: ce, reflinkSearch: Ve, tag: Xe, text: Ae, url: _ };
  var Ye = { ...X, link: k(/^!?\[(label)\]\((.*?)\)/).replace("label", q).getRegex(), reflink: k(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", q).getRegex() };
  var N = { ...X, emStrongRDelimAst: Ge, emStrongLDelim: He, delLDelim: Qe, delRDelim: Fe, url: k(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol", re).replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(), _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/, del: /^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/, text: k(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol", re).getRegex() };
  var et = { ...N, br: k(ae).replace("{2,}", "*").getRegex(), text: k(N.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex() };
  var B = { normal: K, gfm: Me, pedantic: ze };
  var E = { normal: X, gfm: N, breaks: et, pedantic: Ye };
  var tt2 = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
  var ke = (u) => tt2[u];
  function T(u, e) {
    if (e) {
      if (m.escapeTest.test(u))
        return u.replace(m.escapeReplace, ke);
    } else if (m.escapeTestNoEncode.test(u))
      return u.replace(m.escapeReplaceNoEncode, ke);
    return u;
  }
  function J(u) {
    try {
      u = encodeURI(u).replace(m.percentDecode, "%");
    } catch {
      return null;
    }
    return u;
  }
  function V(u, e) {
    let t = u.replace(m.findPipe, (i, s, a) => {
      let o = false, l = s;
      for (;--l >= 0 && a[l] === "\\"; )
        o = !o;
      return o ? "|" : " |";
    }), n = t.split(m.splitPipe), r = 0;
    if (n[0].trim() || n.shift(), n.length > 0 && !n.at(-1)?.trim() && n.pop(), e)
      if (n.length > e)
        n.splice(e);
      else
        for (;n.length < e; )
          n.push("");
    for (;r < n.length; r++)
      n[r] = n[r].trim().replace(m.slashPipe, "|");
    return n;
  }
  function I(u, e, t) {
    let n = u.length;
    if (n === 0)
      return "";
    let r = 0;
    for (;r < n; ) {
      let i = u.charAt(n - r - 1);
      if (i === e && !t)
        r++;
      else if (i !== e && t)
        r++;
      else
        break;
    }
    return u.slice(0, n - r);
  }
  function de(u, e) {
    if (u.indexOf(e[1]) === -1)
      return -1;
    let t = 0;
    for (let n = 0;n < u.length; n++)
      if (u[n] === "\\")
        n++;
      else if (u[n] === e[0])
        t++;
      else if (u[n] === e[1] && (t--, t < 0))
        return n;
    return t > 0 ? -2 : -1;
  }
  function ge(u, e = 0) {
    let t = e, n = "";
    for (let r of u)
      if (r === "\t") {
        let i = 4 - t % 4;
        n += " ".repeat(i), t += i;
      } else
        n += r, t++;
    return n;
  }
  function fe(u, e, t, n, r) {
    let i = e.href, s = e.title || null, a = u[1].replace(r.other.outputLinkReplace, "$1");
    n.state.inLink = true;
    let o = { type: u[0].charAt(0) === "!" ? "image" : "link", raw: t, href: i, title: s, text: a, tokens: n.inlineTokens(a) };
    return n.state.inLink = false, o;
  }
  function nt(u, e, t) {
    let n = u.match(t.other.indentCodeCompensation);
    if (n === null)
      return e;
    let r = n[1];
    return e.split(`
`).map((i) => {
      let s = i.match(t.other.beginningSpace);
      if (s === null)
        return i;
      let [a] = s;
      return a.length >= r.length ? i.slice(r.length) : i;
    }).join(`
`);
  }
  var w = class {
    options;
    rules;
    lexer;
    constructor(e) {
      this.options = e || O;
    }
    space(e) {
      let t = this.rules.block.newline.exec(e);
      if (t && t[0].length > 0)
        return { type: "space", raw: t[0] };
    }
    code(e) {
      let t = this.rules.block.code.exec(e);
      if (t) {
        let n = t[0].replace(this.rules.other.codeRemoveIndent, "");
        return { type: "code", raw: t[0], codeBlockStyle: "indented", text: this.options.pedantic ? n : I(n, `
`) };
      }
    }
    fences(e) {
      let t = this.rules.block.fences.exec(e);
      if (t) {
        let n = t[0], r = nt(n, t[3] || "", this.rules);
        return { type: "code", raw: n, lang: t[2] ? t[2].trim().replace(this.rules.inline.anyPunctuation, "$1") : t[2], text: r };
      }
    }
    heading(e) {
      let t = this.rules.block.heading.exec(e);
      if (t) {
        let n = t[2].trim();
        if (this.rules.other.endingHash.test(n)) {
          let r = I(n, "#");
          (this.options.pedantic || !r || this.rules.other.endingSpaceChar.test(r)) && (n = r.trim());
        }
        return { type: "heading", raw: t[0], depth: t[1].length, text: n, tokens: this.lexer.inline(n) };
      }
    }
    hr(e) {
      let t = this.rules.block.hr.exec(e);
      if (t)
        return { type: "hr", raw: I(t[0], `
`) };
    }
    blockquote(e) {
      let t = this.rules.block.blockquote.exec(e);
      if (t) {
        let n = I(t[0], `
`).split(`
`), r = "", i = "", s = [];
        for (;n.length > 0; ) {
          let a = false, o = [], l;
          for (l = 0;l < n.length; l++)
            if (this.rules.other.blockquoteStart.test(n[l]))
              o.push(n[l]), a = true;
            else if (!a)
              o.push(n[l]);
            else
              break;
          n = n.slice(l);
          let p2 = o.join(`
`), c = p2.replace(this.rules.other.blockquoteSetextReplace, `
    $1`).replace(this.rules.other.blockquoteSetextReplace2, "");
          r = r ? `${r}
${p2}` : p2, i = i ? `${i}
${c}` : c;
          let d = this.lexer.state.top;
          if (this.lexer.state.top = true, this.lexer.blockTokens(c, s, true), this.lexer.state.top = d, n.length === 0)
            break;
          let h2 = s.at(-1);
          if (h2?.type === "code")
            break;
          if (h2?.type === "blockquote") {
            let R = h2, f = R.raw + `
` + n.join(`
`), S = this.blockquote(f);
            s[s.length - 1] = S, r = r.substring(0, r.length - R.raw.length) + S.raw, i = i.substring(0, i.length - R.text.length) + S.text;
            break;
          } else if (h2?.type === "list") {
            let R = h2, f = R.raw + `
` + n.join(`
`), S = this.list(f);
            s[s.length - 1] = S, r = r.substring(0, r.length - h2.raw.length) + S.raw, i = i.substring(0, i.length - R.raw.length) + S.raw, n = f.substring(s.at(-1).raw.length).split(`
`);
            continue;
          }
        }
        return { type: "blockquote", raw: r, tokens: s, text: i };
      }
    }
    list(e) {
      let t = this.rules.block.list.exec(e);
      if (t) {
        let n = t[1].trim(), r = n.length > 1, i = { type: "list", raw: "", ordered: r, start: r ? +n.slice(0, -1) : "", loose: false, items: [] };
        n = r ? `\\d{1,9}\\${n.slice(-1)}` : `\\${n}`, this.options.pedantic && (n = r ? n : "[*+-]");
        let s = this.rules.other.listItemRegex(n), a = false;
        for (;e; ) {
          let l = false, p2 = "", c = "";
          if (!(t = s.exec(e)) || this.rules.block.hr.test(e))
            break;
          p2 = t[0], e = e.substring(p2.length);
          let d = ge(t[2].split(`
`, 1)[0], t[1].length), h2 = e.split(`
`, 1)[0], R = !d.trim(), f = 0;
          if (this.options.pedantic ? (f = 2, c = d.trimStart()) : R ? f = t[1].length + 1 : (f = d.search(this.rules.other.nonSpaceChar), f = f > 4 ? 1 : f, c = d.slice(f), f += t[1].length), R && this.rules.other.blankLine.test(h2) && (p2 += h2 + `
`, e = e.substring(h2.length + 1), l = true), !l) {
            let S = this.rules.other.nextBulletRegex(f), Y = this.rules.other.hrRegex(f), ee = this.rules.other.fencesBeginRegex(f), te = this.rules.other.headingBeginRegex(f), me = this.rules.other.htmlBeginRegex(f), xe = this.rules.other.blockquoteBeginRegex(f);
            for (;e; ) {
              let Z = e.split(`
`, 1)[0], A;
              if (h2 = Z, this.options.pedantic ? (h2 = h2.replace(this.rules.other.listReplaceNesting, "  "), A = h2) : A = h2.replace(this.rules.other.tabCharGlobal, "    "), ee.test(h2) || te.test(h2) || me.test(h2) || xe.test(h2) || S.test(h2) || Y.test(h2))
                break;
              if (A.search(this.rules.other.nonSpaceChar) >= f || !h2.trim())
                c += `
` + A.slice(f);
              else {
                if (R || d.replace(this.rules.other.tabCharGlobal, "    ").search(this.rules.other.nonSpaceChar) >= 4 || ee.test(d) || te.test(d) || Y.test(d))
                  break;
                c += `
` + h2;
              }
              R = !h2.trim(), p2 += Z + `
`, e = e.substring(Z.length + 1), d = A.slice(f);
            }
          }
          i.loose || (a ? i.loose = true : this.rules.other.doubleBlankLine.test(p2) && (a = true)), i.items.push({ type: "list_item", raw: p2, task: !!this.options.gfm && this.rules.other.listIsTask.test(c), loose: false, text: c, tokens: [] }), i.raw += p2;
        }
        let o = i.items.at(-1);
        if (o)
          o.raw = o.raw.trimEnd(), o.text = o.text.trimEnd();
        else
          return;
        i.raw = i.raw.trimEnd();
        for (let l of i.items) {
          if (this.lexer.state.top = false, l.tokens = this.lexer.blockTokens(l.text, []), l.task) {
            if (l.text = l.text.replace(this.rules.other.listReplaceTask, ""), l.tokens[0]?.type === "text" || l.tokens[0]?.type === "paragraph") {
              l.tokens[0].raw = l.tokens[0].raw.replace(this.rules.other.listReplaceTask, ""), l.tokens[0].text = l.tokens[0].text.replace(this.rules.other.listReplaceTask, "");
              for (let c = this.lexer.inlineQueue.length - 1;c >= 0; c--)
                if (this.rules.other.listIsTask.test(this.lexer.inlineQueue[c].src)) {
                  this.lexer.inlineQueue[c].src = this.lexer.inlineQueue[c].src.replace(this.rules.other.listReplaceTask, "");
                  break;
                }
            }
            let p2 = this.rules.other.listTaskCheckbox.exec(l.raw);
            if (p2) {
              let c = { type: "checkbox", raw: p2[0] + " ", checked: p2[0] !== "[ ]" };
              l.checked = c.checked, i.loose ? l.tokens[0] && ["paragraph", "text"].includes(l.tokens[0].type) && "tokens" in l.tokens[0] && l.tokens[0].tokens ? (l.tokens[0].raw = c.raw + l.tokens[0].raw, l.tokens[0].text = c.raw + l.tokens[0].text, l.tokens[0].tokens.unshift(c)) : l.tokens.unshift({ type: "paragraph", raw: c.raw, text: c.raw, tokens: [c] }) : l.tokens.unshift(c);
            }
          }
          if (!i.loose) {
            let p2 = l.tokens.filter((d) => d.type === "space"), c = p2.length > 0 && p2.some((d) => this.rules.other.anyLine.test(d.raw));
            i.loose = c;
          }
        }
        if (i.loose)
          for (let l of i.items) {
            l.loose = true;
            for (let p2 of l.tokens)
              p2.type === "text" && (p2.type = "paragraph");
          }
        return i;
      }
    }
    html(e) {
      let t = this.rules.block.html.exec(e);
      if (t)
        return { type: "html", block: true, raw: t[0], pre: t[1] === "pre" || t[1] === "script" || t[1] === "style", text: t[0] };
    }
    def(e) {
      let t = this.rules.block.def.exec(e);
      if (t) {
        let n = t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal, " "), r = t[2] ? t[2].replace(this.rules.other.hrefBrackets, "$1").replace(this.rules.inline.anyPunctuation, "$1") : "", i = t[3] ? t[3].substring(1, t[3].length - 1).replace(this.rules.inline.anyPunctuation, "$1") : t[3];
        return { type: "def", tag: n, raw: t[0], href: r, title: i };
      }
    }
    table(e) {
      let t = this.rules.block.table.exec(e);
      if (!t || !this.rules.other.tableDelimiter.test(t[2]))
        return;
      let n = V(t[1]), r = t[2].replace(this.rules.other.tableAlignChars, "").split("|"), i = t[3]?.trim() ? t[3].replace(this.rules.other.tableRowBlankLine, "").split(`
`) : [], s = { type: "table", raw: t[0], header: [], align: [], rows: [] };
      if (n.length === r.length) {
        for (let a of r)
          this.rules.other.tableAlignRight.test(a) ? s.align.push("right") : this.rules.other.tableAlignCenter.test(a) ? s.align.push("center") : this.rules.other.tableAlignLeft.test(a) ? s.align.push("left") : s.align.push(null);
        for (let a = 0;a < n.length; a++)
          s.header.push({ text: n[a], tokens: this.lexer.inline(n[a]), header: true, align: s.align[a] });
        for (let a of i)
          s.rows.push(V(a, s.header.length).map((o, l) => ({ text: o, tokens: this.lexer.inline(o), header: false, align: s.align[l] })));
        return s;
      }
    }
    lheading(e) {
      let t = this.rules.block.lheading.exec(e);
      if (t) {
        let n = t[1].trim();
        return { type: "heading", raw: t[0], depth: t[2].charAt(0) === "=" ? 1 : 2, text: n, tokens: this.lexer.inline(n) };
      }
    }
    paragraph(e) {
      let t = this.rules.block.paragraph.exec(e);
      if (t) {
        let n = t[1].charAt(t[1].length - 1) === `
` ? t[1].slice(0, -1) : t[1];
        return { type: "paragraph", raw: t[0], text: n, tokens: this.lexer.inline(n) };
      }
    }
    text(e) {
      let t = this.rules.block.text.exec(e);
      if (t)
        return { type: "text", raw: t[0], text: t[0], tokens: this.lexer.inline(t[0]) };
    }
    escape(e) {
      let t = this.rules.inline.escape.exec(e);
      if (t)
        return { type: "escape", raw: t[0], text: t[1] };
    }
    tag(e) {
      let t = this.rules.inline.tag.exec(e);
      if (t)
        return !this.lexer.state.inLink && this.rules.other.startATag.test(t[0]) ? this.lexer.state.inLink = true : this.lexer.state.inLink && this.rules.other.endATag.test(t[0]) && (this.lexer.state.inLink = false), !this.lexer.state.inRawBlock && this.rules.other.startPreScriptTag.test(t[0]) ? this.lexer.state.inRawBlock = true : this.lexer.state.inRawBlock && this.rules.other.endPreScriptTag.test(t[0]) && (this.lexer.state.inRawBlock = false), { type: "html", raw: t[0], inLink: this.lexer.state.inLink, inRawBlock: this.lexer.state.inRawBlock, block: false, text: t[0] };
    }
    link(e) {
      let t = this.rules.inline.link.exec(e);
      if (t) {
        let n = t[2].trim();
        if (!this.options.pedantic && this.rules.other.startAngleBracket.test(n)) {
          if (!this.rules.other.endAngleBracket.test(n))
            return;
          let s = I(n.slice(0, -1), "\\");
          if ((n.length - s.length) % 2 === 0)
            return;
        } else {
          let s = de(t[2], "()");
          if (s === -2)
            return;
          if (s > -1) {
            let o = (t[0].indexOf("!") === 0 ? 5 : 4) + t[1].length + s;
            t[2] = t[2].substring(0, s), t[0] = t[0].substring(0, o).trim(), t[3] = "";
          }
        }
        let r = t[2], i = "";
        if (this.options.pedantic) {
          let s = this.rules.other.pedanticHrefTitle.exec(r);
          s && (r = s[1], i = s[3]);
        } else
          i = t[3] ? t[3].slice(1, -1) : "";
        return r = r.trim(), this.rules.other.startAngleBracket.test(r) && (this.options.pedantic && !this.rules.other.endAngleBracket.test(n) ? r = r.slice(1) : r = r.slice(1, -1)), fe(t, { href: r && r.replace(this.rules.inline.anyPunctuation, "$1"), title: i && i.replace(this.rules.inline.anyPunctuation, "$1") }, t[0], this.lexer, this.rules);
      }
    }
    reflink(e, t) {
      let n;
      if ((n = this.rules.inline.reflink.exec(e)) || (n = this.rules.inline.nolink.exec(e))) {
        let r = (n[2] || n[1]).replace(this.rules.other.multipleSpaceGlobal, " "), i = t[r.toLowerCase()];
        if (!i) {
          let s = n[0].charAt(0);
          return { type: "text", raw: s, text: s };
        }
        return fe(n, i, n[0], this.lexer, this.rules);
      }
    }
    emStrong(e, t, n = "") {
      let r = this.rules.inline.emStrongLDelim.exec(e);
      if (!r || !r[1] && !r[2] && !r[3] && !r[4] || r[4] && n.match(this.rules.other.unicodeAlphaNumeric))
        return;
      if (!(r[1] || r[3] || "") || !n || this.rules.inline.punctuation.exec(n)) {
        let s = [...r[0]].length - 1, a, o, l = s, p2 = 0, c = r[0][0] === "*" ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
        for (c.lastIndex = 0, t = t.slice(-1 * e.length + s);(r = c.exec(t)) !== null; ) {
          if (a = r[1] || r[2] || r[3] || r[4] || r[5] || r[6], !a)
            continue;
          if (o = [...a].length, r[3] || r[4]) {
            l += o;
            continue;
          } else if ((r[5] || r[6]) && s % 3 && !((s + o) % 3)) {
            p2 += o;
            continue;
          }
          if (l -= o, l > 0)
            continue;
          o = Math.min(o, o + l + p2);
          let d = [...r[0]][0].length, h2 = e.slice(0, s + r.index + d + o);
          if (Math.min(s, o) % 2) {
            let f = h2.slice(1, -1);
            return { type: "em", raw: h2, text: f, tokens: this.lexer.inlineTokens(f) };
          }
          let R = h2.slice(2, -2);
          return { type: "strong", raw: h2, text: R, tokens: this.lexer.inlineTokens(R) };
        }
      }
    }
    codespan(e) {
      let t = this.rules.inline.code.exec(e);
      if (t) {
        let n = t[2].replace(this.rules.other.newLineCharGlobal, " "), r = this.rules.other.nonSpaceChar.test(n), i = this.rules.other.startingSpaceChar.test(n) && this.rules.other.endingSpaceChar.test(n);
        return r && i && (n = n.substring(1, n.length - 1)), { type: "codespan", raw: t[0], text: n };
      }
    }
    br(e) {
      let t = this.rules.inline.br.exec(e);
      if (t)
        return { type: "br", raw: t[0] };
    }
    del(e, t, n = "") {
      let r = this.rules.inline.delLDelim.exec(e);
      if (!r)
        return;
      if (!(r[1] || "") || !n || this.rules.inline.punctuation.exec(n)) {
        let s = [...r[0]].length - 1, a, o, l = s, p2 = this.rules.inline.delRDelim;
        for (p2.lastIndex = 0, t = t.slice(-1 * e.length + s);(r = p2.exec(t)) !== null; ) {
          if (a = r[1] || r[2] || r[3] || r[4] || r[5] || r[6], !a || (o = [...a].length, o !== s))
            continue;
          if (r[3] || r[4]) {
            l += o;
            continue;
          }
          if (l -= o, l > 0)
            continue;
          o = Math.min(o, o + l);
          let c = [...r[0]][0].length, d = e.slice(0, s + r.index + c + o), h2 = d.slice(s, -s);
          return { type: "del", raw: d, text: h2, tokens: this.lexer.inlineTokens(h2) };
        }
      }
    }
    autolink(e) {
      let t = this.rules.inline.autolink.exec(e);
      if (t) {
        let n, r;
        return t[2] === "@" ? (n = t[1], r = "mailto:" + n) : (n = t[1], r = n), { type: "link", raw: t[0], text: n, href: r, tokens: [{ type: "text", raw: n, text: n }] };
      }
    }
    url(e) {
      let t;
      if (t = this.rules.inline.url.exec(e)) {
        let n, r;
        if (t[2] === "@")
          n = t[0], r = "mailto:" + n;
        else {
          let i;
          do
            i = t[0], t[0] = this.rules.inline._backpedal.exec(t[0])?.[0] ?? "";
          while (i !== t[0]);
          n = t[0], t[1] === "www." ? r = "http://" + t[0] : r = t[0];
        }
        return { type: "link", raw: t[0], text: n, href: r, tokens: [{ type: "text", raw: n, text: n }] };
      }
    }
    inlineText(e) {
      let t = this.rules.inline.text.exec(e);
      if (t) {
        let n = this.lexer.state.inRawBlock;
        return { type: "text", raw: t[0], text: t[0], escaped: n };
      }
    }
  };
  var x = class u {
    tokens;
    options;
    state;
    inlineQueue;
    tokenizer;
    constructor(e) {
      this.tokens = [], this.tokens.links = Object.create(null), this.options = e || O, this.options.tokenizer = this.options.tokenizer || new w, this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = { inLink: false, inRawBlock: false, top: true };
      let t = { other: m, block: B.normal, inline: E.normal };
      this.options.pedantic ? (t.block = B.pedantic, t.inline = E.pedantic) : this.options.gfm && (t.block = B.gfm, this.options.breaks ? t.inline = E.breaks : t.inline = E.gfm), this.tokenizer.rules = t;
    }
    static get rules() {
      return { block: B, inline: E };
    }
    static lex(e, t) {
      return new u(t).lex(e);
    }
    static lexInline(e, t) {
      return new u(t).inlineTokens(e);
    }
    lex(e) {
      e = e.replace(m.carriageReturn, `
`), this.blockTokens(e, this.tokens);
      for (let t = 0;t < this.inlineQueue.length; t++) {
        let n = this.inlineQueue[t];
        this.inlineTokens(n.src, n.tokens);
      }
      return this.inlineQueue = [], this.tokens;
    }
    blockTokens(e, t = [], n = false) {
      for (this.tokenizer.lexer = this, this.options.pedantic && (e = e.replace(m.tabCharGlobal, "    ").replace(m.spaceLine, ""));e; ) {
        let r;
        if (this.options.extensions?.block?.some((s) => (r = s.call({ lexer: this }, e, t)) ? (e = e.substring(r.raw.length), t.push(r), true) : false))
          continue;
        if (r = this.tokenizer.space(e)) {
          e = e.substring(r.raw.length);
          let s = t.at(-1);
          r.raw.length === 1 && s !== undefined ? s.raw += `
` : t.push(r);
          continue;
        }
        if (r = this.tokenizer.code(e)) {
          e = e.substring(r.raw.length);
          let s = t.at(-1);
          s?.type === "paragraph" || s?.type === "text" ? (s.raw += (s.raw.endsWith(`
`) ? "" : `
`) + r.raw, s.text += `
` + r.text, this.inlineQueue.at(-1).src = s.text) : t.push(r);
          continue;
        }
        if (r = this.tokenizer.fences(e)) {
          e = e.substring(r.raw.length), t.push(r);
          continue;
        }
        if (r = this.tokenizer.heading(e)) {
          e = e.substring(r.raw.length), t.push(r);
          continue;
        }
        if (r = this.tokenizer.hr(e)) {
          e = e.substring(r.raw.length), t.push(r);
          continue;
        }
        if (r = this.tokenizer.blockquote(e)) {
          e = e.substring(r.raw.length), t.push(r);
          continue;
        }
        if (r = this.tokenizer.list(e)) {
          e = e.substring(r.raw.length), t.push(r);
          continue;
        }
        if (r = this.tokenizer.html(e)) {
          e = e.substring(r.raw.length), t.push(r);
          continue;
        }
        if (r = this.tokenizer.def(e)) {
          e = e.substring(r.raw.length);
          let s = t.at(-1);
          s?.type === "paragraph" || s?.type === "text" ? (s.raw += (s.raw.endsWith(`
`) ? "" : `
`) + r.raw, s.text += `
` + r.raw, this.inlineQueue.at(-1).src = s.text) : this.tokens.links[r.tag] || (this.tokens.links[r.tag] = { href: r.href, title: r.title }, t.push(r));
          continue;
        }
        if (r = this.tokenizer.table(e)) {
          e = e.substring(r.raw.length), t.push(r);
          continue;
        }
        if (r = this.tokenizer.lheading(e)) {
          e = e.substring(r.raw.length), t.push(r);
          continue;
        }
        let i = e;
        if (this.options.extensions?.startBlock) {
          let s = 1 / 0, a = e.slice(1), o;
          this.options.extensions.startBlock.forEach((l) => {
            o = l.call({ lexer: this }, a), typeof o == "number" && o >= 0 && (s = Math.min(s, o));
          }), s < 1 / 0 && s >= 0 && (i = e.substring(0, s + 1));
        }
        if (this.state.top && (r = this.tokenizer.paragraph(i))) {
          let s = t.at(-1);
          n && s?.type === "paragraph" ? (s.raw += (s.raw.endsWith(`
`) ? "" : `
`) + r.raw, s.text += `
` + r.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = s.text) : t.push(r), n = i.length !== e.length, e = e.substring(r.raw.length);
          continue;
        }
        if (r = this.tokenizer.text(e)) {
          e = e.substring(r.raw.length);
          let s = t.at(-1);
          s?.type === "text" ? (s.raw += (s.raw.endsWith(`
`) ? "" : `
`) + r.raw, s.text += `
` + r.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = s.text) : t.push(r);
          continue;
        }
        if (e) {
          let s = "Infinite loop on byte: " + e.charCodeAt(0);
          if (this.options.silent) {
            console.error(s);
            break;
          } else
            throw new Error(s);
        }
      }
      return this.state.top = true, t;
    }
    inline(e, t = []) {
      return this.inlineQueue.push({ src: e, tokens: t }), t;
    }
    inlineTokens(e, t = []) {
      this.tokenizer.lexer = this;
      let n = e, r = null;
      if (this.tokens.links) {
        let o = Object.keys(this.tokens.links);
        if (o.length > 0)
          for (;(r = this.tokenizer.rules.inline.reflinkSearch.exec(n)) !== null; )
            o.includes(r[0].slice(r[0].lastIndexOf("[") + 1, -1)) && (n = n.slice(0, r.index) + "[" + "a".repeat(r[0].length - 2) + "]" + n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex));
      }
      for (;(r = this.tokenizer.rules.inline.anyPunctuation.exec(n)) !== null; )
        n = n.slice(0, r.index) + "++" + n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);
      let i;
      for (;(r = this.tokenizer.rules.inline.blockSkip.exec(n)) !== null; )
        i = r[2] ? r[2].length : 0, n = n.slice(0, r.index + i) + "[" + "a".repeat(r[0].length - i - 2) + "]" + n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
      n = this.options.hooks?.emStrongMask?.call({ lexer: this }, n) ?? n;
      let s = false, a = "";
      for (;e; ) {
        s || (a = ""), s = false;
        let o;
        if (this.options.extensions?.inline?.some((p2) => (o = p2.call({ lexer: this }, e, t)) ? (e = e.substring(o.raw.length), t.push(o), true) : false))
          continue;
        if (o = this.tokenizer.escape(e)) {
          e = e.substring(o.raw.length), t.push(o);
          continue;
        }
        if (o = this.tokenizer.tag(e)) {
          e = e.substring(o.raw.length), t.push(o);
          continue;
        }
        if (o = this.tokenizer.link(e)) {
          e = e.substring(o.raw.length), t.push(o);
          continue;
        }
        if (o = this.tokenizer.reflink(e, this.tokens.links)) {
          e = e.substring(o.raw.length);
          let p2 = t.at(-1);
          o.type === "text" && p2?.type === "text" ? (p2.raw += o.raw, p2.text += o.text) : t.push(o);
          continue;
        }
        if (o = this.tokenizer.emStrong(e, n, a)) {
          e = e.substring(o.raw.length), t.push(o);
          continue;
        }
        if (o = this.tokenizer.codespan(e)) {
          e = e.substring(o.raw.length), t.push(o);
          continue;
        }
        if (o = this.tokenizer.br(e)) {
          e = e.substring(o.raw.length), t.push(o);
          continue;
        }
        if (o = this.tokenizer.del(e, n, a)) {
          e = e.substring(o.raw.length), t.push(o);
          continue;
        }
        if (o = this.tokenizer.autolink(e)) {
          e = e.substring(o.raw.length), t.push(o);
          continue;
        }
        if (!this.state.inLink && (o = this.tokenizer.url(e))) {
          e = e.substring(o.raw.length), t.push(o);
          continue;
        }
        let l = e;
        if (this.options.extensions?.startInline) {
          let p2 = 1 / 0, c = e.slice(1), d;
          this.options.extensions.startInline.forEach((h2) => {
            d = h2.call({ lexer: this }, c), typeof d == "number" && d >= 0 && (p2 = Math.min(p2, d));
          }), p2 < 1 / 0 && p2 >= 0 && (l = e.substring(0, p2 + 1));
        }
        if (o = this.tokenizer.inlineText(l)) {
          e = e.substring(o.raw.length), o.raw.slice(-1) !== "_" && (a = o.raw.slice(-1)), s = true;
          let p2 = t.at(-1);
          p2?.type === "text" ? (p2.raw += o.raw, p2.text += o.text) : t.push(o);
          continue;
        }
        if (e) {
          let p2 = "Infinite loop on byte: " + e.charCodeAt(0);
          if (this.options.silent) {
            console.error(p2);
            break;
          } else
            throw new Error(p2);
        }
      }
      return t;
    }
  };
  var y = class {
    options;
    parser;
    constructor(e) {
      this.options = e || O;
    }
    space(e) {
      return "";
    }
    code({ text: e, lang: t, escaped: n }) {
      let r = (t || "").match(m.notSpaceStart)?.[0], i = e.replace(m.endingNewline, "") + `
`;
      return r ? '<pre><code class="language-' + T(r) + '">' + (n ? i : T(i, true)) + `</code></pre>
` : "<pre><code>" + (n ? i : T(i, true)) + `</code></pre>
`;
    }
    blockquote({ tokens: e }) {
      return `<blockquote>
${this.parser.parse(e)}</blockquote>
`;
    }
    html({ text: e }) {
      return e;
    }
    def(e) {
      return "";
    }
    heading({ tokens: e, depth: t }) {
      return `<h${t}>${this.parser.parseInline(e)}</h${t}>
`;
    }
    hr(e) {
      return `<hr>
`;
    }
    list(e) {
      let { ordered: t, start: n } = e, r = "";
      for (let a = 0;a < e.items.length; a++) {
        let o = e.items[a];
        r += this.listitem(o);
      }
      let i = t ? "ol" : "ul", s = t && n !== 1 ? ' start="' + n + '"' : "";
      return "<" + i + s + `>
` + r + "</" + i + `>
`;
    }
    listitem(e) {
      return `<li>${this.parser.parse(e.tokens)}</li>
`;
    }
    checkbox({ checked: e }) {
      return "<input " + (e ? 'checked="" ' : "") + 'disabled="" type="checkbox"> ';
    }
    paragraph({ tokens: e }) {
      return `<p>${this.parser.parseInline(e)}</p>
`;
    }
    table(e) {
      let t = "", n = "";
      for (let i = 0;i < e.header.length; i++)
        n += this.tablecell(e.header[i]);
      t += this.tablerow({ text: n });
      let r = "";
      for (let i = 0;i < e.rows.length; i++) {
        let s = e.rows[i];
        n = "";
        for (let a = 0;a < s.length; a++)
          n += this.tablecell(s[a]);
        r += this.tablerow({ text: n });
      }
      return r && (r = `<tbody>${r}</tbody>`), `<table>
<thead>
` + t + `</thead>
` + r + `</table>
`;
    }
    tablerow({ text: e }) {
      return `<tr>
${e}</tr>
`;
    }
    tablecell(e) {
      let t = this.parser.parseInline(e.tokens), n = e.header ? "th" : "td";
      return (e.align ? `<${n} align="${e.align}">` : `<${n}>`) + t + `</${n}>
`;
    }
    strong({ tokens: e }) {
      return `<strong>${this.parser.parseInline(e)}</strong>`;
    }
    em({ tokens: e }) {
      return `<em>${this.parser.parseInline(e)}</em>`;
    }
    codespan({ text: e }) {
      return `<code>${T(e, true)}</code>`;
    }
    br(e) {
      return "<br>";
    }
    del({ tokens: e }) {
      return `<del>${this.parser.parseInline(e)}</del>`;
    }
    link({ href: e, title: t, tokens: n }) {
      let r = this.parser.parseInline(n), i = J(e);
      if (i === null)
        return r;
      e = i;
      let s = '<a href="' + e + '"';
      return t && (s += ' title="' + T(t) + '"'), s += ">" + r + "</a>", s;
    }
    image({ href: e, title: t, text: n, tokens: r }) {
      r && (n = this.parser.parseInline(r, this.parser.textRenderer));
      let i = J(e);
      if (i === null)
        return T(n);
      e = i;
      let s = `<img src="${e}" alt="${T(n)}"`;
      return t && (s += ` title="${T(t)}"`), s += ">", s;
    }
    text(e) {
      return "tokens" in e && e.tokens ? this.parser.parseInline(e.tokens) : ("escaped" in e) && e.escaped ? e.text : T(e.text);
    }
  };
  var $ = class {
    strong({ text: e }) {
      return e;
    }
    em({ text: e }) {
      return e;
    }
    codespan({ text: e }) {
      return e;
    }
    del({ text: e }) {
      return e;
    }
    html({ text: e }) {
      return e;
    }
    text({ text: e }) {
      return e;
    }
    link({ text: e }) {
      return "" + e;
    }
    image({ text: e }) {
      return "" + e;
    }
    br() {
      return "";
    }
    checkbox({ raw: e }) {
      return e;
    }
  };
  var b = class u2 {
    options;
    renderer;
    textRenderer;
    constructor(e) {
      this.options = e || O, this.options.renderer = this.options.renderer || new y, this.renderer = this.options.renderer, this.renderer.options = this.options, this.renderer.parser = this, this.textRenderer = new $;
    }
    static parse(e, t) {
      return new u2(t).parse(e);
    }
    static parseInline(e, t) {
      return new u2(t).parseInline(e);
    }
    parse(e) {
      this.renderer.parser = this;
      let t = "";
      for (let n = 0;n < e.length; n++) {
        let r = e[n];
        if (this.options.extensions?.renderers?.[r.type]) {
          let s = r, a = this.options.extensions.renderers[s.type].call({ parser: this }, s);
          if (a !== false || !["space", "hr", "heading", "code", "table", "blockquote", "list", "html", "def", "paragraph", "text"].includes(s.type)) {
            t += a || "";
            continue;
          }
        }
        let i = r;
        switch (i.type) {
          case "space": {
            t += this.renderer.space(i);
            break;
          }
          case "hr": {
            t += this.renderer.hr(i);
            break;
          }
          case "heading": {
            t += this.renderer.heading(i);
            break;
          }
          case "code": {
            t += this.renderer.code(i);
            break;
          }
          case "table": {
            t += this.renderer.table(i);
            break;
          }
          case "blockquote": {
            t += this.renderer.blockquote(i);
            break;
          }
          case "list": {
            t += this.renderer.list(i);
            break;
          }
          case "checkbox": {
            t += this.renderer.checkbox(i);
            break;
          }
          case "html": {
            t += this.renderer.html(i);
            break;
          }
          case "def": {
            t += this.renderer.def(i);
            break;
          }
          case "paragraph": {
            t += this.renderer.paragraph(i);
            break;
          }
          case "text": {
            t += this.renderer.text(i);
            break;
          }
          default: {
            let s = 'Token with "' + i.type + '" type was not found.';
            if (this.options.silent)
              return console.error(s), "";
            throw new Error(s);
          }
        }
      }
      return t;
    }
    parseInline(e, t = this.renderer) {
      this.renderer.parser = this;
      let n = "";
      for (let r = 0;r < e.length; r++) {
        let i = e[r];
        if (this.options.extensions?.renderers?.[i.type]) {
          let a = this.options.extensions.renderers[i.type].call({ parser: this }, i);
          if (a !== false || !["escape", "html", "link", "image", "strong", "em", "codespan", "br", "del", "text"].includes(i.type)) {
            n += a || "";
            continue;
          }
        }
        let s = i;
        switch (s.type) {
          case "escape": {
            n += t.text(s);
            break;
          }
          case "html": {
            n += t.html(s);
            break;
          }
          case "link": {
            n += t.link(s);
            break;
          }
          case "image": {
            n += t.image(s);
            break;
          }
          case "checkbox": {
            n += t.checkbox(s);
            break;
          }
          case "strong": {
            n += t.strong(s);
            break;
          }
          case "em": {
            n += t.em(s);
            break;
          }
          case "codespan": {
            n += t.codespan(s);
            break;
          }
          case "br": {
            n += t.br(s);
            break;
          }
          case "del": {
            n += t.del(s);
            break;
          }
          case "text": {
            n += t.text(s);
            break;
          }
          default: {
            let a = 'Token with "' + s.type + '" type was not found.';
            if (this.options.silent)
              return console.error(a), "";
            throw new Error(a);
          }
        }
      }
      return n;
    }
  };
  var P = class {
    options;
    block;
    constructor(e) {
      this.options = e || O;
    }
    static passThroughHooks = new Set(["preprocess", "postprocess", "processAllTokens", "emStrongMask"]);
    static passThroughHooksRespectAsync = new Set(["preprocess", "postprocess", "processAllTokens"]);
    preprocess(e) {
      return e;
    }
    postprocess(e) {
      return e;
    }
    processAllTokens(e) {
      return e;
    }
    emStrongMask(e) {
      return e;
    }
    provideLexer(e = this.block) {
      return e ? x.lex : x.lexInline;
    }
    provideParser(e = this.block) {
      return e ? b.parse : b.parseInline;
    }
  };
  var D = class {
    defaults = M();
    options = this.setOptions;
    parse = this.parseMarkdown(true);
    parseInline = this.parseMarkdown(false);
    Parser = b;
    Renderer = y;
    TextRenderer = $;
    Lexer = x;
    Tokenizer = w;
    Hooks = P;
    constructor(...e) {
      this.use(...e);
    }
    walkTokens(e, t) {
      let n = [];
      for (let r of e)
        switch (n = n.concat(t.call(this, r)), r.type) {
          case "table": {
            let i = r;
            for (let s of i.header)
              n = n.concat(this.walkTokens(s.tokens, t));
            for (let s of i.rows)
              for (let a of s)
                n = n.concat(this.walkTokens(a.tokens, t));
            break;
          }
          case "list": {
            let i = r;
            n = n.concat(this.walkTokens(i.items, t));
            break;
          }
          default: {
            let i = r;
            this.defaults.extensions?.childTokens?.[i.type] ? this.defaults.extensions.childTokens[i.type].forEach((s) => {
              let a = i[s].flat(1 / 0);
              n = n.concat(this.walkTokens(a, t));
            }) : i.tokens && (n = n.concat(this.walkTokens(i.tokens, t)));
          }
        }
      return n;
    }
    use(...e) {
      let t = this.defaults.extensions || { renderers: {}, childTokens: {} };
      return e.forEach((n) => {
        let r = { ...n };
        if (r.async = this.defaults.async || r.async || false, n.extensions && (n.extensions.forEach((i) => {
          if (!i.name)
            throw new Error("extension name required");
          if ("renderer" in i) {
            let s = t.renderers[i.name];
            s ? t.renderers[i.name] = function(...a) {
              let o = i.renderer.apply(this, a);
              return o === false && (o = s.apply(this, a)), o;
            } : t.renderers[i.name] = i.renderer;
          }
          if ("tokenizer" in i) {
            if (!i.level || i.level !== "block" && i.level !== "inline")
              throw new Error("extension level must be 'block' or 'inline'");
            let s = t[i.level];
            s ? s.unshift(i.tokenizer) : t[i.level] = [i.tokenizer], i.start && (i.level === "block" ? t.startBlock ? t.startBlock.push(i.start) : t.startBlock = [i.start] : i.level === "inline" && (t.startInline ? t.startInline.push(i.start) : t.startInline = [i.start]));
          }
          "childTokens" in i && i.childTokens && (t.childTokens[i.name] = i.childTokens);
        }), r.extensions = t), n.renderer) {
          let i = this.defaults.renderer || new y(this.defaults);
          for (let s in n.renderer) {
            if (!(s in i))
              throw new Error(`renderer '${s}' does not exist`);
            if (["options", "parser"].includes(s))
              continue;
            let a = s, o = n.renderer[a], l = i[a];
            i[a] = (...p2) => {
              let c = o.apply(i, p2);
              return c === false && (c = l.apply(i, p2)), c || "";
            };
          }
          r.renderer = i;
        }
        if (n.tokenizer) {
          let i = this.defaults.tokenizer || new w(this.defaults);
          for (let s in n.tokenizer) {
            if (!(s in i))
              throw new Error(`tokenizer '${s}' does not exist`);
            if (["options", "rules", "lexer"].includes(s))
              continue;
            let a = s, o = n.tokenizer[a], l = i[a];
            i[a] = (...p2) => {
              let c = o.apply(i, p2);
              return c === false && (c = l.apply(i, p2)), c;
            };
          }
          r.tokenizer = i;
        }
        if (n.hooks) {
          let i = this.defaults.hooks || new P;
          for (let s in n.hooks) {
            if (!(s in i))
              throw new Error(`hook '${s}' does not exist`);
            if (["options", "block"].includes(s))
              continue;
            let a = s, o = n.hooks[a], l = i[a];
            P.passThroughHooks.has(s) ? i[a] = (p2) => {
              if (this.defaults.async && P.passThroughHooksRespectAsync.has(s))
                return (async () => {
                  let d = await o.call(i, p2);
                  return l.call(i, d);
                })();
              let c = o.call(i, p2);
              return l.call(i, c);
            } : i[a] = (...p2) => {
              if (this.defaults.async)
                return (async () => {
                  let d = await o.apply(i, p2);
                  return d === false && (d = await l.apply(i, p2)), d;
                })();
              let c = o.apply(i, p2);
              return c === false && (c = l.apply(i, p2)), c;
            };
          }
          r.hooks = i;
        }
        if (n.walkTokens) {
          let i = this.defaults.walkTokens, s = n.walkTokens;
          r.walkTokens = function(a) {
            let o = [];
            return o.push(s.call(this, a)), i && (o = o.concat(i.call(this, a))), o;
          };
        }
        this.defaults = { ...this.defaults, ...r };
      }), this;
    }
    setOptions(e) {
      return this.defaults = { ...this.defaults, ...e }, this;
    }
    lexer(e, t) {
      return x.lex(e, t ?? this.defaults);
    }
    parser(e, t) {
      return b.parse(e, t ?? this.defaults);
    }
    parseMarkdown(e) {
      return (n, r) => {
        let i = { ...r }, s = { ...this.defaults, ...i }, a = this.onError(!!s.silent, !!s.async);
        if (this.defaults.async === true && i.async === false)
          return a(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));
        if (typeof n > "u" || n === null)
          return a(new Error("marked(): input parameter is undefined or null"));
        if (typeof n != "string")
          return a(new Error("marked(): input parameter is of type " + Object.prototype.toString.call(n) + ", string expected"));
        if (s.hooks && (s.hooks.options = s, s.hooks.block = e), s.async)
          return (async () => {
            let o = s.hooks ? await s.hooks.preprocess(n) : n, p2 = await (s.hooks ? await s.hooks.provideLexer(e) : e ? x.lex : x.lexInline)(o, s), c = s.hooks ? await s.hooks.processAllTokens(p2) : p2;
            s.walkTokens && await Promise.all(this.walkTokens(c, s.walkTokens));
            let h2 = await (s.hooks ? await s.hooks.provideParser(e) : e ? b.parse : b.parseInline)(c, s);
            return s.hooks ? await s.hooks.postprocess(h2) : h2;
          })().catch(a);
        try {
          s.hooks && (n = s.hooks.preprocess(n));
          let l = (s.hooks ? s.hooks.provideLexer(e) : e ? x.lex : x.lexInline)(n, s);
          s.hooks && (l = s.hooks.processAllTokens(l)), s.walkTokens && this.walkTokens(l, s.walkTokens);
          let c = (s.hooks ? s.hooks.provideParser(e) : e ? b.parse : b.parseInline)(l, s);
          return s.hooks && (c = s.hooks.postprocess(c)), c;
        } catch (o) {
          return a(o);
        }
      };
    }
    onError(e, t) {
      return (n) => {
        if (n.message += `
Please report this to https://github.com/markedjs/marked.`, e) {
          let r = "<p>An error occurred:</p><pre>" + T(n.message + "", true) + "</pre>";
          return t ? Promise.resolve(r) : r;
        }
        if (t)
          return Promise.reject(n);
        throw n;
      };
    }
  };
  var L = new D;
  function g(u3, e) {
    return L.parse(u3, e);
  }
  g.options = g.setOptions = function(u3) {
    return L.setOptions(u3), g.defaults = L.defaults, G(g.defaults), g;
  };
  g.getDefaults = M;
  g.defaults = O;
  g.use = function(...u3) {
    return L.use(...u3), g.defaults = L.defaults, G(g.defaults), g;
  };
  g.walkTokens = function(u3, e) {
    return L.walkTokens(u3, e);
  };
  g.parseInline = L.parseInline;
  g.Parser = b;
  g.parser = b.parse;
  g.Renderer = y;
  g.TextRenderer = $;
  g.Lexer = x;
  g.lexer = x.lex;
  g.Tokenizer = w;
  g.Hooks = P;
  g.parse = g;
  var Qt = g.options;
  var jt = g.setOptions;
  var Ft = g.use;
  var Ut = g.walkTokens;
  var Kt = g.parseInline;
  var Xt = b.parse;
  var Jt = x.lex;

  // node_modules/dompurify/dist/purify.es.mjs
  /*! @license DOMPurify 3.3.3 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.3.3/LICENSE */
  var {
    entries,
    setPrototypeOf,
    isFrozen,
    getPrototypeOf,
    getOwnPropertyDescriptor
  } = Object;
  var {
    freeze,
    seal,
    create: create2
  } = Object;
  var {
    apply: apply2,
    construct
  } = typeof Reflect !== "undefined" && Reflect;
  if (!freeze) {
    freeze = function freeze2(x2) {
      return x2;
    };
  }
  if (!seal) {
    seal = function seal2(x2) {
      return x2;
    };
  }
  if (!apply2) {
    apply2 = function apply3(func, thisArg) {
      for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2;_key < _len; _key++) {
        args[_key - 2] = arguments[_key];
      }
      return func.apply(thisArg, args);
    };
  }
  if (!construct) {
    construct = function construct2(Func) {
      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1;_key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }
      return new Func(...args);
    };
  }
  var arrayForEach = unapply(Array.prototype.forEach);
  var arrayLastIndexOf = unapply(Array.prototype.lastIndexOf);
  var arrayPop = unapply(Array.prototype.pop);
  var arrayPush = unapply(Array.prototype.push);
  var arraySplice = unapply(Array.prototype.splice);
  var stringToLowerCase = unapply(String.prototype.toLowerCase);
  var stringToString = unapply(String.prototype.toString);
  var stringMatch = unapply(String.prototype.match);
  var stringReplace = unapply(String.prototype.replace);
  var stringIndexOf = unapply(String.prototype.indexOf);
  var stringTrim = unapply(String.prototype.trim);
  var objectHasOwnProperty = unapply(Object.prototype.hasOwnProperty);
  var regExpTest = unapply(RegExp.prototype.test);
  var typeErrorCreate = unconstruct(TypeError);
  function unapply(func) {
    return function(thisArg) {
      if (thisArg instanceof RegExp) {
        thisArg.lastIndex = 0;
      }
      for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1;_key3 < _len3; _key3++) {
        args[_key3 - 1] = arguments[_key3];
      }
      return apply2(func, thisArg, args);
    };
  }
  function unconstruct(Func) {
    return function() {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0;_key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }
      return construct(Func, args);
    };
  }
  function addToSet(set, array) {
    let transformCaseFunc = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : stringToLowerCase;
    if (setPrototypeOf) {
      setPrototypeOf(set, null);
    }
    let l = array.length;
    while (l--) {
      let element = array[l];
      if (typeof element === "string") {
        const lcElement = transformCaseFunc(element);
        if (lcElement !== element) {
          if (!isFrozen(array)) {
            array[l] = lcElement;
          }
          element = lcElement;
        }
      }
      set[element] = true;
    }
    return set;
  }
  function cleanArray(array) {
    for (let index = 0;index < array.length; index++) {
      const isPropertyExist = objectHasOwnProperty(array, index);
      if (!isPropertyExist) {
        array[index] = null;
      }
    }
    return array;
  }
  function clone(object) {
    const newObject = create2(null);
    for (const [property, value] of entries(object)) {
      const isPropertyExist = objectHasOwnProperty(object, property);
      if (isPropertyExist) {
        if (Array.isArray(value)) {
          newObject[property] = cleanArray(value);
        } else if (value && typeof value === "object" && value.constructor === Object) {
          newObject[property] = clone(value);
        } else {
          newObject[property] = value;
        }
      }
    }
    return newObject;
  }
  function lookupGetter(object, prop) {
    while (object !== null) {
      const desc = getOwnPropertyDescriptor(object, prop);
      if (desc) {
        if (desc.get) {
          return unapply(desc.get);
        }
        if (typeof desc.value === "function") {
          return unapply(desc.value);
        }
      }
      object = getPrototypeOf(object);
    }
    function fallbackValue() {
      return null;
    }
    return fallbackValue;
  }
  var html$1 = freeze(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "search", "section", "select", "shadow", "slot", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]);
  var svg$1 = freeze(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "enterkeyhint", "exportparts", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "inputmode", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "part", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]);
  var svgFilters = freeze(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]);
  var svgDisallowed = freeze(["animate", "color-profile", "cursor", "discard", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]);
  var mathMl$1 = freeze(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover", "mprescripts"]);
  var mathMlDisallowed = freeze(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]);
  var text = freeze(["#text"]);
  var html = freeze(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "exportparts", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inert", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "part", "pattern", "placeholder", "playsinline", "popover", "popovertarget", "popovertargetaction", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "slot", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "wrap", "xmlns", "slot"]);
  var svg = freeze(["accent-height", "accumulate", "additive", "alignment-baseline", "amplitude", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "exponent", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "intercept", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "mask-type", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "slope", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "tablevalues", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]);
  var mathMl = freeze(["accent", "accentunder", "align", "bevelled", "close", "columnsalign", "columnlines", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lspace", "lquote", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]);
  var xml = freeze(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]);
  var MUSTACHE_EXPR = seal(/\{\{[\w\W]*|[\w\W]*\}\}/gm);
  var ERB_EXPR = seal(/<%[\w\W]*|[\w\W]*%>/gm);
  var TMPLIT_EXPR = seal(/\$\{[\w\W]*/gm);
  var DATA_ATTR = seal(/^data-[\-\w.\u00B7-\uFFFF]+$/);
  var ARIA_ATTR = seal(/^aria-[\-\w]+$/);
  var IS_ALLOWED_URI = seal(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i);
  var IS_SCRIPT_OR_DATA = seal(/^(?:\w+script|data):/i);
  var ATTR_WHITESPACE = seal(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g);
  var DOCTYPE_NAME = seal(/^html$/i);
  var CUSTOM_ELEMENT = seal(/^[a-z][.\w]*(-[.\w]+)+$/i);
  var EXPRESSIONS = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    ARIA_ATTR,
    ATTR_WHITESPACE,
    CUSTOM_ELEMENT,
    DATA_ATTR,
    DOCTYPE_NAME,
    ERB_EXPR,
    IS_ALLOWED_URI,
    IS_SCRIPT_OR_DATA,
    MUSTACHE_EXPR,
    TMPLIT_EXPR
  });
  var NODE_TYPE = {
    element: 1,
    attribute: 2,
    text: 3,
    cdataSection: 4,
    entityReference: 5,
    entityNode: 6,
    progressingInstruction: 7,
    comment: 8,
    document: 9,
    documentType: 10,
    documentFragment: 11,
    notation: 12
  };
  var getGlobal = function getGlobal2() {
    return typeof window === "undefined" ? null : window;
  };
  var _createTrustedTypesPolicy = function _createTrustedTypesPolicy2(trustedTypes, purifyHostElement) {
    if (typeof trustedTypes !== "object" || typeof trustedTypes.createPolicy !== "function") {
      return null;
    }
    let suffix = null;
    const ATTR_NAME = "data-tt-policy-suffix";
    if (purifyHostElement && purifyHostElement.hasAttribute(ATTR_NAME)) {
      suffix = purifyHostElement.getAttribute(ATTR_NAME);
    }
    const policyName = "dompurify" + (suffix ? "#" + suffix : "");
    try {
      return trustedTypes.createPolicy(policyName, {
        createHTML(html2) {
          return html2;
        },
        createScriptURL(scriptUrl) {
          return scriptUrl;
        }
      });
    } catch (_2) {
      console.warn("TrustedTypes policy " + policyName + " could not be created.");
      return null;
    }
  };
  var _createHooksMap = function _createHooksMap2() {
    return {
      afterSanitizeAttributes: [],
      afterSanitizeElements: [],
      afterSanitizeShadowDOM: [],
      beforeSanitizeAttributes: [],
      beforeSanitizeElements: [],
      beforeSanitizeShadowDOM: [],
      uponSanitizeAttribute: [],
      uponSanitizeElement: [],
      uponSanitizeShadowNode: []
    };
  };
  function createDOMPurify() {
    let window2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getGlobal();
    const DOMPurify = (root) => createDOMPurify(root);
    DOMPurify.version = "3.3.3";
    DOMPurify.removed = [];
    if (!window2 || !window2.document || window2.document.nodeType !== NODE_TYPE.document || !window2.Element) {
      DOMPurify.isSupported = false;
      return DOMPurify;
    }
    let {
      document: document2
    } = window2;
    const originalDocument = document2;
    const currentScript = originalDocument.currentScript;
    const {
      DocumentFragment,
      HTMLTemplateElement,
      Node,
      Element: Element2,
      NodeFilter,
      NamedNodeMap = window2.NamedNodeMap || window2.MozNamedAttrMap,
      HTMLFormElement,
      DOMParser,
      trustedTypes
    } = window2;
    const ElementPrototype = Element2.prototype;
    const cloneNode = lookupGetter(ElementPrototype, "cloneNode");
    const remove2 = lookupGetter(ElementPrototype, "remove");
    const getNextSibling = lookupGetter(ElementPrototype, "nextSibling");
    const getChildNodes = lookupGetter(ElementPrototype, "childNodes");
    const getParentNode = lookupGetter(ElementPrototype, "parentNode");
    if (typeof HTMLTemplateElement === "function") {
      const template = document2.createElement("template");
      if (template.content && template.content.ownerDocument) {
        document2 = template.content.ownerDocument;
      }
    }
    let trustedTypesPolicy;
    let emptyHTML = "";
    const {
      implementation,
      createNodeIterator,
      createDocumentFragment,
      getElementsByTagName
    } = document2;
    const {
      importNode
    } = originalDocument;
    let hooks2 = _createHooksMap();
    DOMPurify.isSupported = typeof entries === "function" && typeof getParentNode === "function" && implementation && implementation.createHTMLDocument !== undefined;
    const {
      MUSTACHE_EXPR: MUSTACHE_EXPR2,
      ERB_EXPR: ERB_EXPR2,
      TMPLIT_EXPR: TMPLIT_EXPR2,
      DATA_ATTR: DATA_ATTR2,
      ARIA_ATTR: ARIA_ATTR2,
      IS_SCRIPT_OR_DATA: IS_SCRIPT_OR_DATA2,
      ATTR_WHITESPACE: ATTR_WHITESPACE2,
      CUSTOM_ELEMENT: CUSTOM_ELEMENT2
    } = EXPRESSIONS;
    let {
      IS_ALLOWED_URI: IS_ALLOWED_URI$1
    } = EXPRESSIONS;
    let ALLOWED_TAGS = null;
    const DEFAULT_ALLOWED_TAGS = addToSet({}, [...html$1, ...svg$1, ...svgFilters, ...mathMl$1, ...text]);
    let ALLOWED_ATTR = null;
    const DEFAULT_ALLOWED_ATTR = addToSet({}, [...html, ...svg, ...mathMl, ...xml]);
    let CUSTOM_ELEMENT_HANDLING = Object.seal(create2(null, {
      tagNameCheck: {
        writable: true,
        configurable: false,
        enumerable: true,
        value: null
      },
      attributeNameCheck: {
        writable: true,
        configurable: false,
        enumerable: true,
        value: null
      },
      allowCustomizedBuiltInElements: {
        writable: true,
        configurable: false,
        enumerable: true,
        value: false
      }
    }));
    let FORBID_TAGS = null;
    let FORBID_ATTR = null;
    const EXTRA_ELEMENT_HANDLING = Object.seal(create2(null, {
      tagCheck: {
        writable: true,
        configurable: false,
        enumerable: true,
        value: null
      },
      attributeCheck: {
        writable: true,
        configurable: false,
        enumerable: true,
        value: null
      }
    }));
    let ALLOW_ARIA_ATTR = true;
    let ALLOW_DATA_ATTR = true;
    let ALLOW_UNKNOWN_PROTOCOLS = false;
    let ALLOW_SELF_CLOSE_IN_ATTR = true;
    let SAFE_FOR_TEMPLATES = false;
    let SAFE_FOR_XML = true;
    let WHOLE_DOCUMENT = false;
    let SET_CONFIG = false;
    let FORCE_BODY = false;
    let RETURN_DOM = false;
    let RETURN_DOM_FRAGMENT = false;
    let RETURN_TRUSTED_TYPE = false;
    let SANITIZE_DOM = true;
    let SANITIZE_NAMED_PROPS = false;
    const SANITIZE_NAMED_PROPS_PREFIX = "user-content-";
    let KEEP_CONTENT = true;
    let IN_PLACE = false;
    let USE_PROFILES = {};
    let FORBID_CONTENTS = null;
    const DEFAULT_FORBID_CONTENTS = addToSet({}, ["annotation-xml", "audio", "colgroup", "desc", "foreignobject", "head", "iframe", "math", "mi", "mn", "mo", "ms", "mtext", "noembed", "noframes", "noscript", "plaintext", "script", "style", "svg", "template", "thead", "title", "video", "xmp"]);
    let DATA_URI_TAGS = null;
    const DEFAULT_DATA_URI_TAGS = addToSet({}, ["audio", "video", "img", "source", "image", "track"]);
    let URI_SAFE_ATTRIBUTES = null;
    const DEFAULT_URI_SAFE_ATTRIBUTES = addToSet({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]);
    const MATHML_NAMESPACE = "http://www.w3.org/1998/Math/MathML";
    const SVG_NAMESPACE = "http://www.w3.org/2000/svg";
    const HTML_NAMESPACE = "http://www.w3.org/1999/xhtml";
    let NAMESPACE = HTML_NAMESPACE;
    let IS_EMPTY_INPUT = false;
    let ALLOWED_NAMESPACES = null;
    const DEFAULT_ALLOWED_NAMESPACES = addToSet({}, [MATHML_NAMESPACE, SVG_NAMESPACE, HTML_NAMESPACE], stringToString);
    let MATHML_TEXT_INTEGRATION_POINTS = addToSet({}, ["mi", "mo", "mn", "ms", "mtext"]);
    let HTML_INTEGRATION_POINTS = addToSet({}, ["annotation-xml"]);
    const COMMON_SVG_AND_HTML_ELEMENTS = addToSet({}, ["title", "style", "font", "a", "script"]);
    let PARSER_MEDIA_TYPE = null;
    const SUPPORTED_PARSER_MEDIA_TYPES = ["application/xhtml+xml", "text/html"];
    const DEFAULT_PARSER_MEDIA_TYPE = "text/html";
    let transformCaseFunc = null;
    let CONFIG = null;
    const formElement = document2.createElement("form");
    const isRegexOrFunction = function isRegexOrFunction2(testValue) {
      return testValue instanceof RegExp || testValue instanceof Function;
    };
    const _parseConfig = function _parseConfig2() {
      let cfg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      if (CONFIG && CONFIG === cfg) {
        return;
      }
      if (!cfg || typeof cfg !== "object") {
        cfg = {};
      }
      cfg = clone(cfg);
      PARSER_MEDIA_TYPE = SUPPORTED_PARSER_MEDIA_TYPES.indexOf(cfg.PARSER_MEDIA_TYPE) === -1 ? DEFAULT_PARSER_MEDIA_TYPE : cfg.PARSER_MEDIA_TYPE;
      transformCaseFunc = PARSER_MEDIA_TYPE === "application/xhtml+xml" ? stringToString : stringToLowerCase;
      ALLOWED_TAGS = objectHasOwnProperty(cfg, "ALLOWED_TAGS") ? addToSet({}, cfg.ALLOWED_TAGS, transformCaseFunc) : DEFAULT_ALLOWED_TAGS;
      ALLOWED_ATTR = objectHasOwnProperty(cfg, "ALLOWED_ATTR") ? addToSet({}, cfg.ALLOWED_ATTR, transformCaseFunc) : DEFAULT_ALLOWED_ATTR;
      ALLOWED_NAMESPACES = objectHasOwnProperty(cfg, "ALLOWED_NAMESPACES") ? addToSet({}, cfg.ALLOWED_NAMESPACES, stringToString) : DEFAULT_ALLOWED_NAMESPACES;
      URI_SAFE_ATTRIBUTES = objectHasOwnProperty(cfg, "ADD_URI_SAFE_ATTR") ? addToSet(clone(DEFAULT_URI_SAFE_ATTRIBUTES), cfg.ADD_URI_SAFE_ATTR, transformCaseFunc) : DEFAULT_URI_SAFE_ATTRIBUTES;
      DATA_URI_TAGS = objectHasOwnProperty(cfg, "ADD_DATA_URI_TAGS") ? addToSet(clone(DEFAULT_DATA_URI_TAGS), cfg.ADD_DATA_URI_TAGS, transformCaseFunc) : DEFAULT_DATA_URI_TAGS;
      FORBID_CONTENTS = objectHasOwnProperty(cfg, "FORBID_CONTENTS") ? addToSet({}, cfg.FORBID_CONTENTS, transformCaseFunc) : DEFAULT_FORBID_CONTENTS;
      FORBID_TAGS = objectHasOwnProperty(cfg, "FORBID_TAGS") ? addToSet({}, cfg.FORBID_TAGS, transformCaseFunc) : clone({});
      FORBID_ATTR = objectHasOwnProperty(cfg, "FORBID_ATTR") ? addToSet({}, cfg.FORBID_ATTR, transformCaseFunc) : clone({});
      USE_PROFILES = objectHasOwnProperty(cfg, "USE_PROFILES") ? cfg.USE_PROFILES : false;
      ALLOW_ARIA_ATTR = cfg.ALLOW_ARIA_ATTR !== false;
      ALLOW_DATA_ATTR = cfg.ALLOW_DATA_ATTR !== false;
      ALLOW_UNKNOWN_PROTOCOLS = cfg.ALLOW_UNKNOWN_PROTOCOLS || false;
      ALLOW_SELF_CLOSE_IN_ATTR = cfg.ALLOW_SELF_CLOSE_IN_ATTR !== false;
      SAFE_FOR_TEMPLATES = cfg.SAFE_FOR_TEMPLATES || false;
      SAFE_FOR_XML = cfg.SAFE_FOR_XML !== false;
      WHOLE_DOCUMENT = cfg.WHOLE_DOCUMENT || false;
      RETURN_DOM = cfg.RETURN_DOM || false;
      RETURN_DOM_FRAGMENT = cfg.RETURN_DOM_FRAGMENT || false;
      RETURN_TRUSTED_TYPE = cfg.RETURN_TRUSTED_TYPE || false;
      FORCE_BODY = cfg.FORCE_BODY || false;
      SANITIZE_DOM = cfg.SANITIZE_DOM !== false;
      SANITIZE_NAMED_PROPS = cfg.SANITIZE_NAMED_PROPS || false;
      KEEP_CONTENT = cfg.KEEP_CONTENT !== false;
      IN_PLACE = cfg.IN_PLACE || false;
      IS_ALLOWED_URI$1 = cfg.ALLOWED_URI_REGEXP || IS_ALLOWED_URI;
      NAMESPACE = cfg.NAMESPACE || HTML_NAMESPACE;
      MATHML_TEXT_INTEGRATION_POINTS = cfg.MATHML_TEXT_INTEGRATION_POINTS || MATHML_TEXT_INTEGRATION_POINTS;
      HTML_INTEGRATION_POINTS = cfg.HTML_INTEGRATION_POINTS || HTML_INTEGRATION_POINTS;
      CUSTOM_ELEMENT_HANDLING = cfg.CUSTOM_ELEMENT_HANDLING || {};
      if (cfg.CUSTOM_ELEMENT_HANDLING && isRegexOrFunction(cfg.CUSTOM_ELEMENT_HANDLING.tagNameCheck)) {
        CUSTOM_ELEMENT_HANDLING.tagNameCheck = cfg.CUSTOM_ELEMENT_HANDLING.tagNameCheck;
      }
      if (cfg.CUSTOM_ELEMENT_HANDLING && isRegexOrFunction(cfg.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)) {
        CUSTOM_ELEMENT_HANDLING.attributeNameCheck = cfg.CUSTOM_ELEMENT_HANDLING.attributeNameCheck;
      }
      if (cfg.CUSTOM_ELEMENT_HANDLING && typeof cfg.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements === "boolean") {
        CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements = cfg.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements;
      }
      if (SAFE_FOR_TEMPLATES) {
        ALLOW_DATA_ATTR = false;
      }
      if (RETURN_DOM_FRAGMENT) {
        RETURN_DOM = true;
      }
      if (USE_PROFILES) {
        ALLOWED_TAGS = addToSet({}, text);
        ALLOWED_ATTR = create2(null);
        if (USE_PROFILES.html === true) {
          addToSet(ALLOWED_TAGS, html$1);
          addToSet(ALLOWED_ATTR, html);
        }
        if (USE_PROFILES.svg === true) {
          addToSet(ALLOWED_TAGS, svg$1);
          addToSet(ALLOWED_ATTR, svg);
          addToSet(ALLOWED_ATTR, xml);
        }
        if (USE_PROFILES.svgFilters === true) {
          addToSet(ALLOWED_TAGS, svgFilters);
          addToSet(ALLOWED_ATTR, svg);
          addToSet(ALLOWED_ATTR, xml);
        }
        if (USE_PROFILES.mathMl === true) {
          addToSet(ALLOWED_TAGS, mathMl$1);
          addToSet(ALLOWED_ATTR, mathMl);
          addToSet(ALLOWED_ATTR, xml);
        }
      }
      if (!objectHasOwnProperty(cfg, "ADD_TAGS")) {
        EXTRA_ELEMENT_HANDLING.tagCheck = null;
      }
      if (!objectHasOwnProperty(cfg, "ADD_ATTR")) {
        EXTRA_ELEMENT_HANDLING.attributeCheck = null;
      }
      if (cfg.ADD_TAGS) {
        if (typeof cfg.ADD_TAGS === "function") {
          EXTRA_ELEMENT_HANDLING.tagCheck = cfg.ADD_TAGS;
        } else {
          if (ALLOWED_TAGS === DEFAULT_ALLOWED_TAGS) {
            ALLOWED_TAGS = clone(ALLOWED_TAGS);
          }
          addToSet(ALLOWED_TAGS, cfg.ADD_TAGS, transformCaseFunc);
        }
      }
      if (cfg.ADD_ATTR) {
        if (typeof cfg.ADD_ATTR === "function") {
          EXTRA_ELEMENT_HANDLING.attributeCheck = cfg.ADD_ATTR;
        } else {
          if (ALLOWED_ATTR === DEFAULT_ALLOWED_ATTR) {
            ALLOWED_ATTR = clone(ALLOWED_ATTR);
          }
          addToSet(ALLOWED_ATTR, cfg.ADD_ATTR, transformCaseFunc);
        }
      }
      if (cfg.ADD_URI_SAFE_ATTR) {
        addToSet(URI_SAFE_ATTRIBUTES, cfg.ADD_URI_SAFE_ATTR, transformCaseFunc);
      }
      if (cfg.FORBID_CONTENTS) {
        if (FORBID_CONTENTS === DEFAULT_FORBID_CONTENTS) {
          FORBID_CONTENTS = clone(FORBID_CONTENTS);
        }
        addToSet(FORBID_CONTENTS, cfg.FORBID_CONTENTS, transformCaseFunc);
      }
      if (cfg.ADD_FORBID_CONTENTS) {
        if (FORBID_CONTENTS === DEFAULT_FORBID_CONTENTS) {
          FORBID_CONTENTS = clone(FORBID_CONTENTS);
        }
        addToSet(FORBID_CONTENTS, cfg.ADD_FORBID_CONTENTS, transformCaseFunc);
      }
      if (KEEP_CONTENT) {
        ALLOWED_TAGS["#text"] = true;
      }
      if (WHOLE_DOCUMENT) {
        addToSet(ALLOWED_TAGS, ["html", "head", "body"]);
      }
      if (ALLOWED_TAGS.table) {
        addToSet(ALLOWED_TAGS, ["tbody"]);
        delete FORBID_TAGS.tbody;
      }
      if (cfg.TRUSTED_TYPES_POLICY) {
        if (typeof cfg.TRUSTED_TYPES_POLICY.createHTML !== "function") {
          throw typeErrorCreate('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
        }
        if (typeof cfg.TRUSTED_TYPES_POLICY.createScriptURL !== "function") {
          throw typeErrorCreate('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
        }
        trustedTypesPolicy = cfg.TRUSTED_TYPES_POLICY;
        emptyHTML = trustedTypesPolicy.createHTML("");
      } else {
        if (trustedTypesPolicy === undefined) {
          trustedTypesPolicy = _createTrustedTypesPolicy(trustedTypes, currentScript);
        }
        if (trustedTypesPolicy !== null && typeof emptyHTML === "string") {
          emptyHTML = trustedTypesPolicy.createHTML("");
        }
      }
      if (freeze) {
        freeze(cfg);
      }
      CONFIG = cfg;
    };
    const ALL_SVG_TAGS = addToSet({}, [...svg$1, ...svgFilters, ...svgDisallowed]);
    const ALL_MATHML_TAGS = addToSet({}, [...mathMl$1, ...mathMlDisallowed]);
    const _checkValidNamespace = function _checkValidNamespace2(element) {
      let parent = getParentNode(element);
      if (!parent || !parent.tagName) {
        parent = {
          namespaceURI: NAMESPACE,
          tagName: "template"
        };
      }
      const tagName = stringToLowerCase(element.tagName);
      const parentTagName = stringToLowerCase(parent.tagName);
      if (!ALLOWED_NAMESPACES[element.namespaceURI]) {
        return false;
      }
      if (element.namespaceURI === SVG_NAMESPACE) {
        if (parent.namespaceURI === HTML_NAMESPACE) {
          return tagName === "svg";
        }
        if (parent.namespaceURI === MATHML_NAMESPACE) {
          return tagName === "svg" && (parentTagName === "annotation-xml" || MATHML_TEXT_INTEGRATION_POINTS[parentTagName]);
        }
        return Boolean(ALL_SVG_TAGS[tagName]);
      }
      if (element.namespaceURI === MATHML_NAMESPACE) {
        if (parent.namespaceURI === HTML_NAMESPACE) {
          return tagName === "math";
        }
        if (parent.namespaceURI === SVG_NAMESPACE) {
          return tagName === "math" && HTML_INTEGRATION_POINTS[parentTagName];
        }
        return Boolean(ALL_MATHML_TAGS[tagName]);
      }
      if (element.namespaceURI === HTML_NAMESPACE) {
        if (parent.namespaceURI === SVG_NAMESPACE && !HTML_INTEGRATION_POINTS[parentTagName]) {
          return false;
        }
        if (parent.namespaceURI === MATHML_NAMESPACE && !MATHML_TEXT_INTEGRATION_POINTS[parentTagName]) {
          return false;
        }
        return !ALL_MATHML_TAGS[tagName] && (COMMON_SVG_AND_HTML_ELEMENTS[tagName] || !ALL_SVG_TAGS[tagName]);
      }
      if (PARSER_MEDIA_TYPE === "application/xhtml+xml" && ALLOWED_NAMESPACES[element.namespaceURI]) {
        return true;
      }
      return false;
    };
    const _forceRemove = function _forceRemove2(node) {
      arrayPush(DOMPurify.removed, {
        element: node
      });
      try {
        getParentNode(node).removeChild(node);
      } catch (_2) {
        remove2(node);
      }
    };
    const _removeAttribute = function _removeAttribute2(name, element) {
      try {
        arrayPush(DOMPurify.removed, {
          attribute: element.getAttributeNode(name),
          from: element
        });
      } catch (_2) {
        arrayPush(DOMPurify.removed, {
          attribute: null,
          from: element
        });
      }
      element.removeAttribute(name);
      if (name === "is") {
        if (RETURN_DOM || RETURN_DOM_FRAGMENT) {
          try {
            _forceRemove(element);
          } catch (_2) {}
        } else {
          try {
            element.setAttribute(name, "");
          } catch (_2) {}
        }
      }
    };
    const _initDocument = function _initDocument2(dirty) {
      let doc2 = null;
      let leadingWhitespace = null;
      if (FORCE_BODY) {
        dirty = "<remove></remove>" + dirty;
      } else {
        const matches = stringMatch(dirty, /^[\r\n\t ]+/);
        leadingWhitespace = matches && matches[0];
      }
      if (PARSER_MEDIA_TYPE === "application/xhtml+xml" && NAMESPACE === HTML_NAMESPACE) {
        dirty = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + dirty + "</body></html>";
      }
      const dirtyPayload = trustedTypesPolicy ? trustedTypesPolicy.createHTML(dirty) : dirty;
      if (NAMESPACE === HTML_NAMESPACE) {
        try {
          doc2 = new DOMParser().parseFromString(dirtyPayload, PARSER_MEDIA_TYPE);
        } catch (_2) {}
      }
      if (!doc2 || !doc2.documentElement) {
        doc2 = implementation.createDocument(NAMESPACE, "template", null);
        try {
          doc2.documentElement.innerHTML = IS_EMPTY_INPUT ? emptyHTML : dirtyPayload;
        } catch (_2) {}
      }
      const body = doc2.body || doc2.documentElement;
      if (dirty && leadingWhitespace) {
        body.insertBefore(document2.createTextNode(leadingWhitespace), body.childNodes[0] || null);
      }
      if (NAMESPACE === HTML_NAMESPACE) {
        return getElementsByTagName.call(doc2, WHOLE_DOCUMENT ? "html" : "body")[0];
      }
      return WHOLE_DOCUMENT ? doc2.documentElement : body;
    };
    const _createNodeIterator = function _createNodeIterator2(root) {
      return createNodeIterator.call(root.ownerDocument || root, root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_COMMENT | NodeFilter.SHOW_TEXT | NodeFilter.SHOW_PROCESSING_INSTRUCTION | NodeFilter.SHOW_CDATA_SECTION, null);
    };
    const _isClobbered = function _isClobbered2(element) {
      return element instanceof HTMLFormElement && (typeof element.nodeName !== "string" || typeof element.textContent !== "string" || typeof element.removeChild !== "function" || !(element.attributes instanceof NamedNodeMap) || typeof element.removeAttribute !== "function" || typeof element.setAttribute !== "function" || typeof element.namespaceURI !== "string" || typeof element.insertBefore !== "function" || typeof element.hasChildNodes !== "function");
    };
    const _isNode = function _isNode2(value) {
      return typeof Node === "function" && value instanceof Node;
    };
    function _executeHooks(hooks3, currentNode, data) {
      arrayForEach(hooks3, (hook2) => {
        hook2.call(DOMPurify, currentNode, data, CONFIG);
      });
    }
    const _sanitizeElements = function _sanitizeElements2(currentNode) {
      let content = null;
      _executeHooks(hooks2.beforeSanitizeElements, currentNode, null);
      if (_isClobbered(currentNode)) {
        _forceRemove(currentNode);
        return true;
      }
      const tagName = transformCaseFunc(currentNode.nodeName);
      _executeHooks(hooks2.uponSanitizeElement, currentNode, {
        tagName,
        allowedTags: ALLOWED_TAGS
      });
      if (SAFE_FOR_XML && currentNode.hasChildNodes() && !_isNode(currentNode.firstElementChild) && regExpTest(/<[/\w!]/g, currentNode.innerHTML) && regExpTest(/<[/\w!]/g, currentNode.textContent)) {
        _forceRemove(currentNode);
        return true;
      }
      if (currentNode.nodeType === NODE_TYPE.progressingInstruction) {
        _forceRemove(currentNode);
        return true;
      }
      if (SAFE_FOR_XML && currentNode.nodeType === NODE_TYPE.comment && regExpTest(/<[/\w]/g, currentNode.data)) {
        _forceRemove(currentNode);
        return true;
      }
      if (!(EXTRA_ELEMENT_HANDLING.tagCheck instanceof Function && EXTRA_ELEMENT_HANDLING.tagCheck(tagName)) && (!ALLOWED_TAGS[tagName] || FORBID_TAGS[tagName])) {
        if (!FORBID_TAGS[tagName] && _isBasicCustomElement(tagName)) {
          if (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, tagName)) {
            return false;
          }
          if (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(tagName)) {
            return false;
          }
        }
        if (KEEP_CONTENT && !FORBID_CONTENTS[tagName]) {
          const parentNode = getParentNode(currentNode) || currentNode.parentNode;
          const childNodes = getChildNodes(currentNode) || currentNode.childNodes;
          if (childNodes && parentNode) {
            const childCount = childNodes.length;
            for (let i = childCount - 1;i >= 0; --i) {
              const childClone = cloneNode(childNodes[i], true);
              childClone.__removalCount = (currentNode.__removalCount || 0) + 1;
              parentNode.insertBefore(childClone, getNextSibling(currentNode));
            }
          }
        }
        _forceRemove(currentNode);
        return true;
      }
      if (currentNode instanceof Element2 && !_checkValidNamespace(currentNode)) {
        _forceRemove(currentNode);
        return true;
      }
      if ((tagName === "noscript" || tagName === "noembed" || tagName === "noframes") && regExpTest(/<\/no(script|embed|frames)/i, currentNode.innerHTML)) {
        _forceRemove(currentNode);
        return true;
      }
      if (SAFE_FOR_TEMPLATES && currentNode.nodeType === NODE_TYPE.text) {
        content = currentNode.textContent;
        arrayForEach([MUSTACHE_EXPR2, ERB_EXPR2, TMPLIT_EXPR2], (expr) => {
          content = stringReplace(content, expr, " ");
        });
        if (currentNode.textContent !== content) {
          arrayPush(DOMPurify.removed, {
            element: currentNode.cloneNode()
          });
          currentNode.textContent = content;
        }
      }
      _executeHooks(hooks2.afterSanitizeElements, currentNode, null);
      return false;
    };
    const _isValidAttribute = function _isValidAttribute2(lcTag, lcName, value) {
      if (FORBID_ATTR[lcName]) {
        return false;
      }
      if (SANITIZE_DOM && (lcName === "id" || lcName === "name") && ((value in document2) || (value in formElement))) {
        return false;
      }
      if (ALLOW_DATA_ATTR && !FORBID_ATTR[lcName] && regExpTest(DATA_ATTR2, lcName))
        ;
      else if (ALLOW_ARIA_ATTR && regExpTest(ARIA_ATTR2, lcName))
        ;
      else if (EXTRA_ELEMENT_HANDLING.attributeCheck instanceof Function && EXTRA_ELEMENT_HANDLING.attributeCheck(lcName, lcTag))
        ;
      else if (!ALLOWED_ATTR[lcName] || FORBID_ATTR[lcName]) {
        if (_isBasicCustomElement(lcTag) && (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, lcTag) || CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(lcTag)) && (CUSTOM_ELEMENT_HANDLING.attributeNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.attributeNameCheck, lcName) || CUSTOM_ELEMENT_HANDLING.attributeNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.attributeNameCheck(lcName, lcTag)) || lcName === "is" && CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements && (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, value) || CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(value)))
          ;
        else {
          return false;
        }
      } else if (URI_SAFE_ATTRIBUTES[lcName])
        ;
      else if (regExpTest(IS_ALLOWED_URI$1, stringReplace(value, ATTR_WHITESPACE2, "")))
        ;
      else if ((lcName === "src" || lcName === "xlink:href" || lcName === "href") && lcTag !== "script" && stringIndexOf(value, "data:") === 0 && DATA_URI_TAGS[lcTag])
        ;
      else if (ALLOW_UNKNOWN_PROTOCOLS && !regExpTest(IS_SCRIPT_OR_DATA2, stringReplace(value, ATTR_WHITESPACE2, "")))
        ;
      else if (value) {
        return false;
      } else
        ;
      return true;
    };
    const _isBasicCustomElement = function _isBasicCustomElement2(tagName) {
      return tagName !== "annotation-xml" && stringMatch(tagName, CUSTOM_ELEMENT2);
    };
    const _sanitizeAttributes = function _sanitizeAttributes2(currentNode) {
      _executeHooks(hooks2.beforeSanitizeAttributes, currentNode, null);
      const {
        attributes
      } = currentNode;
      if (!attributes || _isClobbered(currentNode)) {
        return;
      }
      const hookEvent = {
        attrName: "",
        attrValue: "",
        keepAttr: true,
        allowedAttributes: ALLOWED_ATTR,
        forceKeepAttr: undefined
      };
      let l = attributes.length;
      while (l--) {
        const attr = attributes[l];
        const {
          name,
          namespaceURI,
          value: attrValue
        } = attr;
        const lcName = transformCaseFunc(name);
        const initValue = attrValue;
        let value = name === "value" ? initValue : stringTrim(initValue);
        hookEvent.attrName = lcName;
        hookEvent.attrValue = value;
        hookEvent.keepAttr = true;
        hookEvent.forceKeepAttr = undefined;
        _executeHooks(hooks2.uponSanitizeAttribute, currentNode, hookEvent);
        value = hookEvent.attrValue;
        if (SANITIZE_NAMED_PROPS && (lcName === "id" || lcName === "name")) {
          _removeAttribute(name, currentNode);
          value = SANITIZE_NAMED_PROPS_PREFIX + value;
        }
        if (SAFE_FOR_XML && regExpTest(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i, value)) {
          _removeAttribute(name, currentNode);
          continue;
        }
        if (lcName === "attributename" && stringMatch(value, "href")) {
          _removeAttribute(name, currentNode);
          continue;
        }
        if (hookEvent.forceKeepAttr) {
          continue;
        }
        if (!hookEvent.keepAttr) {
          _removeAttribute(name, currentNode);
          continue;
        }
        if (!ALLOW_SELF_CLOSE_IN_ATTR && regExpTest(/\/>/i, value)) {
          _removeAttribute(name, currentNode);
          continue;
        }
        if (SAFE_FOR_TEMPLATES) {
          arrayForEach([MUSTACHE_EXPR2, ERB_EXPR2, TMPLIT_EXPR2], (expr) => {
            value = stringReplace(value, expr, " ");
          });
        }
        const lcTag = transformCaseFunc(currentNode.nodeName);
        if (!_isValidAttribute(lcTag, lcName, value)) {
          _removeAttribute(name, currentNode);
          continue;
        }
        if (trustedTypesPolicy && typeof trustedTypes === "object" && typeof trustedTypes.getAttributeType === "function") {
          if (namespaceURI)
            ;
          else {
            switch (trustedTypes.getAttributeType(lcTag, lcName)) {
              case "TrustedHTML": {
                value = trustedTypesPolicy.createHTML(value);
                break;
              }
              case "TrustedScriptURL": {
                value = trustedTypesPolicy.createScriptURL(value);
                break;
              }
            }
          }
        }
        if (value !== initValue) {
          try {
            if (namespaceURI) {
              currentNode.setAttributeNS(namespaceURI, name, value);
            } else {
              currentNode.setAttribute(name, value);
            }
            if (_isClobbered(currentNode)) {
              _forceRemove(currentNode);
            } else {
              arrayPop(DOMPurify.removed);
            }
          } catch (_2) {
            _removeAttribute(name, currentNode);
          }
        }
      }
      _executeHooks(hooks2.afterSanitizeAttributes, currentNode, null);
    };
    const _sanitizeShadowDOM = function _sanitizeShadowDOM2(fragment) {
      let shadowNode = null;
      const shadowIterator = _createNodeIterator(fragment);
      _executeHooks(hooks2.beforeSanitizeShadowDOM, fragment, null);
      while (shadowNode = shadowIterator.nextNode()) {
        _executeHooks(hooks2.uponSanitizeShadowNode, shadowNode, null);
        _sanitizeElements(shadowNode);
        _sanitizeAttributes(shadowNode);
        if (shadowNode.content instanceof DocumentFragment) {
          _sanitizeShadowDOM2(shadowNode.content);
        }
      }
      _executeHooks(hooks2.afterSanitizeShadowDOM, fragment, null);
    };
    DOMPurify.sanitize = function(dirty) {
      let cfg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      let body = null;
      let importedNode = null;
      let currentNode = null;
      let returnNode = null;
      IS_EMPTY_INPUT = !dirty;
      if (IS_EMPTY_INPUT) {
        dirty = "<!-->";
      }
      if (typeof dirty !== "string" && !_isNode(dirty)) {
        if (typeof dirty.toString === "function") {
          dirty = dirty.toString();
          if (typeof dirty !== "string") {
            throw typeErrorCreate("dirty is not a string, aborting");
          }
        } else {
          throw typeErrorCreate("toString is not a function");
        }
      }
      if (!DOMPurify.isSupported) {
        return dirty;
      }
      if (!SET_CONFIG) {
        _parseConfig(cfg);
      }
      DOMPurify.removed = [];
      if (typeof dirty === "string") {
        IN_PLACE = false;
      }
      if (IN_PLACE) {
        if (dirty.nodeName) {
          const tagName = transformCaseFunc(dirty.nodeName);
          if (!ALLOWED_TAGS[tagName] || FORBID_TAGS[tagName]) {
            throw typeErrorCreate("root node is forbidden and cannot be sanitized in-place");
          }
        }
      } else if (dirty instanceof Node) {
        body = _initDocument("<!---->");
        importedNode = body.ownerDocument.importNode(dirty, true);
        if (importedNode.nodeType === NODE_TYPE.element && importedNode.nodeName === "BODY") {
          body = importedNode;
        } else if (importedNode.nodeName === "HTML") {
          body = importedNode;
        } else {
          body.appendChild(importedNode);
        }
      } else {
        if (!RETURN_DOM && !SAFE_FOR_TEMPLATES && !WHOLE_DOCUMENT && dirty.indexOf("<") === -1) {
          return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? trustedTypesPolicy.createHTML(dirty) : dirty;
        }
        body = _initDocument(dirty);
        if (!body) {
          return RETURN_DOM ? null : RETURN_TRUSTED_TYPE ? emptyHTML : "";
        }
      }
      if (body && FORCE_BODY) {
        _forceRemove(body.firstChild);
      }
      const nodeIterator = _createNodeIterator(IN_PLACE ? dirty : body);
      while (currentNode = nodeIterator.nextNode()) {
        _sanitizeElements(currentNode);
        _sanitizeAttributes(currentNode);
        if (currentNode.content instanceof DocumentFragment) {
          _sanitizeShadowDOM(currentNode.content);
        }
      }
      if (IN_PLACE) {
        return dirty;
      }
      if (RETURN_DOM) {
        if (RETURN_DOM_FRAGMENT) {
          returnNode = createDocumentFragment.call(body.ownerDocument);
          while (body.firstChild) {
            returnNode.appendChild(body.firstChild);
          }
        } else {
          returnNode = body;
        }
        if (ALLOWED_ATTR.shadowroot || ALLOWED_ATTR.shadowrootmode) {
          returnNode = importNode.call(originalDocument, returnNode, true);
        }
        return returnNode;
      }
      let serializedHTML = WHOLE_DOCUMENT ? body.outerHTML : body.innerHTML;
      if (WHOLE_DOCUMENT && ALLOWED_TAGS["!doctype"] && body.ownerDocument && body.ownerDocument.doctype && body.ownerDocument.doctype.name && regExpTest(DOCTYPE_NAME, body.ownerDocument.doctype.name)) {
        serializedHTML = "<!DOCTYPE " + body.ownerDocument.doctype.name + `>
` + serializedHTML;
      }
      if (SAFE_FOR_TEMPLATES) {
        arrayForEach([MUSTACHE_EXPR2, ERB_EXPR2, TMPLIT_EXPR2], (expr) => {
          serializedHTML = stringReplace(serializedHTML, expr, " ");
        });
      }
      return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? trustedTypesPolicy.createHTML(serializedHTML) : serializedHTML;
    };
    DOMPurify.setConfig = function() {
      let cfg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      _parseConfig(cfg);
      SET_CONFIG = true;
    };
    DOMPurify.clearConfig = function() {
      CONFIG = null;
      SET_CONFIG = false;
    };
    DOMPurify.isValidAttribute = function(tag, attr, value) {
      if (!CONFIG) {
        _parseConfig({});
      }
      const lcTag = transformCaseFunc(tag);
      const lcName = transformCaseFunc(attr);
      return _isValidAttribute(lcTag, lcName, value);
    };
    DOMPurify.addHook = function(entryPoint, hookFunction) {
      if (typeof hookFunction !== "function") {
        return;
      }
      arrayPush(hooks2[entryPoint], hookFunction);
    };
    DOMPurify.removeHook = function(entryPoint, hookFunction) {
      if (hookFunction !== undefined) {
        const index = arrayLastIndexOf(hooks2[entryPoint], hookFunction);
        return index === -1 ? undefined : arraySplice(hooks2[entryPoint], index, 1)[0];
      }
      return arrayPop(hooks2[entryPoint]);
    };
    DOMPurify.removeHooks = function(entryPoint) {
      hooks2[entryPoint] = [];
    };
    DOMPurify.removeAllHooks = function() {
      hooks2 = _createHooksMap();
    };
    return DOMPurify;
  }
  var purify = createDOMPurify();

  // resources/islands/composables/useMarkdown.ts
  function useMarkdown() {
    g.setOptions({
      breaks: true,
      gfm: true,
      pedantic: false
    });
    function renderMarkdown(content) {
      if (!content)
        return "";
      try {
        const rawHtml = g.parse(content);
        const cleanHtml = purify.sanitize(rawHtml, {
          ALLOWED_TAGS: [
            "p",
            "br",
            "strong",
            "em",
            "u",
            "s",
            "code",
            "pre",
            "blockquote",
            "ul",
            "ol",
            "li",
            "a",
            "h1",
            "h2",
            "h3",
            "h4",
            "h5",
            "h6",
            "hr",
            "table",
            "thead",
            "tbody",
            "tr",
            "th",
            "td",
            "img"
          ],
          ALLOWED_ATTR: ["href", "target", "rel", "src", "alt", "title", "class"],
          ALLOW_DATA_ATTR: false,
          ADD_ATTR: ["target"],
          FORCE_BODY: true
        });
        return cleanHtml;
      } catch (error) {
        return purify.sanitize(content);
      }
    }
    function configureRenderer() {
      const renderer2 = new g.Renderer;
      renderer2.code = ({ text: text2, lang }) => {
        const language = lang || "plaintext";
        return `<pre class="code-block"><code class="language-${language}">${text2}</code></pre>`;
      };
      g.use({ renderer: renderer2 });
    }
    configureRenderer();
    return {
      renderMarkdown
    };
  }

  // ../../../Strav.dev/sources/strav/packages/signal/src/broadcast/client.ts
  class Subscription {
    channel;
    sendFn;
    leaveFn;
    listeners = new Map;
    constructor(channel, sendFn, leaveFn) {
      this.channel = channel;
      this.sendFn = sendFn;
      this.leaveFn = leaveFn;
    }
    on(event, callback) {
      let set = this.listeners.get(event);
      if (!set) {
        set = new Set;
        this.listeners.set(event, set);
      }
      set.add(callback);
      return () => {
        set.delete(callback);
      };
    }
    send(event, data) {
      this.sendFn({ t: "msg", c: this.channel, e: event, d: data });
    }
    leave() {
      this.sendFn({ t: "unsub", c: this.channel });
      this.listeners.clear();
      this.leaveFn();
    }
    _dispatch(event, data) {
      const set = this.listeners.get(event);
      if (set)
        for (const cb of set)
          cb(data);
    }
  }

  class Broadcast {
    ws = null;
    url;
    maxReconnectAttempts;
    reconnectAttempt = 0;
    reconnectTimer = null;
    subscriptions = new Map;
    listeners = new Map;
    queue = [];
    _connected = false;
    _clientId = null;
    constructor(options) {
      this.url = options?.url ?? this.autoUrl();
      this.maxReconnectAttempts = options?.maxReconnectAttempts ?? Infinity;
      this.connect();
    }
    get connected() {
      return this._connected;
    }
    get clientId() {
      return this._clientId;
    }
    subscribe(channel) {
      const existing = this.subscriptions.get(channel);
      if (existing)
        return existing;
      const sub = new Subscription(channel, (msg) => this.send(msg), () => this.subscriptions.delete(channel));
      this.subscriptions.set(channel, sub);
      if (this._connected) {
        this.rawSend({ t: "sub", c: channel });
      }
      return sub;
    }
    on(event, callback) {
      let set = this.listeners.get(event);
      if (!set) {
        set = new Set;
        this.listeners.set(event, set);
      }
      set.add(callback);
      return () => {
        set.delete(callback);
      };
    }
    close() {
      this.reconnectAttempt = Infinity;
      if (this.reconnectTimer)
        clearTimeout(this.reconnectTimer);
      this.ws?.close();
      this.ws = null;
    }
    autoUrl() {
      const proto = location.protocol === "https:" ? "wss:" : "ws:";
      return `${proto}//${location.host}/_broadcast`;
    }
    connect() {
      this.ws = new WebSocket(this.url);
      this.ws.onopen = () => {
        this._connected = true;
        this.reconnectAttempt = 0;
        this.emit("connected");
      };
      this.ws.onmessage = (event) => {
        try {
          const msg = JSON.parse(event.data);
          this.handleMessage(msg);
        } catch {}
      };
      this.ws.onclose = () => {
        const wasConnected = this._connected;
        this._connected = false;
        if (wasConnected)
          this.emit("disconnected");
        this.scheduleReconnect();
      };
      this.ws.onerror = () => {
        this.ws?.close();
      };
    }
    handleMessage(msg) {
      switch (msg.t) {
        case "welcome":
          this._clientId = msg.id;
          for (const channel of this.subscriptions.keys()) {
            this.rawSend({ t: "sub", c: channel });
          }
          for (const raw of this.queue) {
            this.ws.send(raw);
          }
          this.queue = [];
          break;
        case "ok":
          this.emit("subscribed", msg.c);
          break;
        case "err":
          this.emit("error", { channel: msg.c, reason: msg.r });
          break;
        case "msg":
          this.subscriptions.get(msg.c)?._dispatch(msg.e, msg.d);
          break;
        case "ping":
          this.rawSend({ t: "pong" });
          break;
      }
    }
    send(msg) {
      const raw = JSON.stringify(msg);
      if (this._connected && this.ws?.readyState === WebSocket.OPEN) {
        this.ws.send(raw);
      } else {
        this.queue.push(raw);
      }
    }
    rawSend(msg) {
      if (this.ws?.readyState === WebSocket.OPEN) {
        this.ws.send(JSON.stringify(msg));
      }
    }
    scheduleReconnect() {
      if (this.reconnectAttempt >= this.maxReconnectAttempts)
        return;
      this.reconnectAttempt++;
      const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempt - 1), 30000);
      this.emit("reconnecting", this.reconnectAttempt);
      this.reconnectTimer = setTimeout(() => this.connect(), delay);
    }
    emit(event, data) {
      const set = this.listeners.get(event);
      if (set)
        for (const cb of set)
          cb(data);
    }
  }

  // resources/islands/predefined-questions.vue
  var _hoisted_12 = { class: "predefined-questions" };
  var predefined_questions_default = /* @__PURE__ */ defineComponent({
    __name: "predefined-questions",
    setup(__props) {
      const messageStore = useMessageStore();
      const { getOrCreateSessionId } = useSessionId();
      const sessionId2 = getOrCreateSessionId();
      const bc = new Broadcast;
      const chat = bc.subscribe(`chat/${sessionId2}`);
      function sendPredefinedMessage(content) {
        if (!messageStore.currentSessionId) {
          messageStore.initializeStore(sessionId2);
        }
        messageStore.sendMessage(content);
        chat.send("send", { content });
      }
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock("div", _hoisted_12, [
          createBaseVNode("span", {
            onClick: _cache[0] || (_cache[0] = ($event) => sendPredefinedMessage("What is your tech stack?"))
          }, "What's your tech stack?"),
          createBaseVNode("span", {
            onClick: _cache[1] || (_cache[1] = ($event) => sendPredefinedMessage("How can I reach you?"))
          }, "How can I reach you?"),
          createBaseVNode("span", {
            onClick: _cache[2] || (_cache[2] = ($event) => sendPredefinedMessage("Can you send me your resume?"))
          }, "Can you send me your resume?"),
          createBaseVNode("span", {
            onClick: _cache[3] || (_cache[3] = ($event) => sendPredefinedMessage("Tell me about your experience"))
          }, "Tell me about your experience"),
          createBaseVNode("span", {
            onClick: _cache[4] || (_cache[4] = ($event) => sendPredefinedMessage("Walk me through your projects"))
          }, "Walk me through your projects")
        ]);
      };
    }
  });

  // resources/islands/message-thread.vue
  var _hoisted_13 = ["innerHTML"];
  var _hoisted_2 = {
    key: 0,
    class: "activity-indicator"
  };
  var _hoisted_3 = { key: 0 };
  var message_thread_default = /* @__PURE__ */ defineComponent({
    __name: "message-thread",
    setup(__props) {
      const messageStore = useMessageStore();
      const { getOrCreateSessionId } = useSessionId();
      const { renderMarkdown } = useMarkdown();
      const { currentMessages, hasMessages, isLoading, error, isPending } = storeToRefs(messageStore);
      const scrollToBottom = async () => {
        await nextTick();
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth"
        });
      };
      watch2(currentMessages, () => {
        scrollToBottom();
      }, { deep: true });
      watch2(isPending, () => {
        scrollToBottom();
      });
      onMounted(() => {
        const sessionId2 = getOrCreateSessionId();
        messageStore.initializeStore(sessionId2);
      });
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock("div", null, [
          createBaseVNode("div", null, [
            createVNode(message_header_default),
            createVNode(predefined_questions_default),
            (openBlock(true), createElementBlock(Fragment, null, renderList(unref(currentMessages), (message) => {
              return openBlock(), createElementBlock("div", {
                key: message.id,
                class: normalizeClass(["message-container", {
                  "user-message": message.role === "user",
                  "assistant-message": message.role === "assistant"
                }])
              }, [
                createBaseVNode("div", {
                  class: normalizeClass(["message", {
                    "user-message": message.role === "user",
                    "assistant-message": message.role === "assistant"
                  }]),
                  innerHTML: unref(renderMarkdown)(message.content)
                }, null, 10, _hoisted_13)
              ], 2);
            }), 128)),
            createCommentVNode(" Activity indicator when processing "),
            unref(isPending) ? (openBlock(), createElementBlock("div", _hoisted_2, " Processing... ")) : createCommentVNode("v-if", true)
          ]),
          unref(error) ? (openBlock(), createElementBlock("div", _hoisted_3, toDisplayString(unref(error)), 1)) : createCommentVNode("v-if", true)
        ]);
      };
    }
  });

  // resources/islands/navbar/mode-selector.vue
  var mode_selector_default = {
    __name: "mode-selector",
    setup(__props) {
      onMounted(() => {
        const saved = localStorage.getItem("theme") || "dark";
        const b2 = document.body.classList;
        b2.remove("dark");
        b2.remove("light");
        b2.add(saved);
      });
      function toggleMode() {
        const saved = localStorage.getItem("theme") || "light";
        const newTheme = saved === "light" ? "dark" : "light";
        const html2 = document.documentElement;
        html2.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
      }
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock("span", {
          onClick: withModifiers(toggleMode, ["prevent"])
        }, [..._cache[0] || (_cache[0] = [
          createBaseVNode("i", { class: "far fa-adjust" }, null, -1)
        ])]);
      };
    }
  };

  // resources/islands/prompt-input.vue
  var _hoisted_14 = ["onKeydown", "data-placeholder"];
  var prompt_input_default = {
    __name: "prompt-input",
    props: {
      placeholder: {
        type: String,
        default: "Ask me anything..."
      }
    },
    setup(__props) {
      const props = __props;
      const messageStore = useMessageStore();
      const { getOrCreateSessionId } = useSessionId();
      const sessionId2 = getOrCreateSessionId();
      const bc = new Broadcast;
      const chat = bc.subscribe(`chat/${sessionId2}`);
      chat.on("message", (data) => {
        if (data.role === "assistant") {
          messageStore.addAssistantMessage(data.content);
        }
      });
      const editableDiv = ref(null);
      const isFocused = ref(false);
      onMounted(() => {
        if (editableDiv.value) {
          editableDiv.value.focus();
        }
        if (!messageStore.currentSessionId) {
          messageStore.initializeStore(sessionId2);
        }
      });
      function handleInput(event) {}
      function handleFocus() {
        isFocused.value = true;
      }
      function handleBlur() {
        isFocused.value = false;
      }
      async function handleSubmit() {
        if (!editableDiv.value)
          return;
        const content = editableDiv.value.innerText.trim();
        if (!content)
          return;
        messageStore.sendMessage(content);
        chat.send("send", { content });
        editableDiv.value.innerText = "";
        await nextTick();
        editableDiv.value.focus();
      }
      return (_ctx, _cache) => {
        return openBlock(), createElementBlock("div", {
          ref_key: "editableDiv",
          ref: editableDiv,
          class: "prompt-field",
          contenteditable: "true",
          onInput: handleInput,
          onKeydown: withKeys(withModifiers(handleSubmit, ["prevent"]), ["enter"]),
          onFocus: handleFocus,
          onBlur: handleBlur,
          "data-placeholder": __props.placeholder
        }, null, 40, _hoisted_14);
      };
    }
  };

  // island-entry:virtual:islands-entry
  var components = {
    "message-header": message_header_default,
    "message-thread": message_thread_default,
    "navbar/mode-selector": mode_selector_default,
    "predefined-questions": predefined_questions_default,
    "prompt-input": prompt_input_default
  };
  function mountIslands() {
    var islands = [];
    document.querySelectorAll("[data-vue]").forEach(function(el) {
      var name = el.dataset.vue;
      if (!name)
        return;
      var Component = components[name];
      if (!Component) {
        console.warn("[islands] Unknown component: " + name);
        return;
      }
      var props = JSON.parse(el.dataset.props || "{}");
      islands.push({ Component, props, el });
    });
    if (islands.length === 0)
      return;
    var Root = defineComponent({
      render: function() {
        return islands.map(function(island) {
          return h(Teleport, { to: island.el }, [h(island.Component, island.props)]);
        });
      }
    });
    var app = createApp(Root);
    if (typeof setup_default === "function")
      setup_default(app);
    var root = document.createElement("div");
    root.style.display = "contents";
    document.body.appendChild(root);
    app.mount(root);
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mountIslands);
  } else {
    mountIslands();
  }
})();
