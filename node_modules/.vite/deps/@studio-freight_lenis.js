import "./chunk-UXIASGQL.js";

// node_modules/@studio-freight/lenis/dist/lenis.modern.mjs
function t() {
  return t = Object.assign ? Object.assign.bind() : function(t2) {
    for (var e2 = 1; e2 < arguments.length; e2++) {
      var i2 = arguments[e2];
      for (var s2 in i2)
        Object.prototype.hasOwnProperty.call(i2, s2) && (t2[s2] = i2[s2]);
    }
    return t2;
  }, t.apply(this, arguments);
}
function e(t2, e2, i2) {
  return Math.max(t2, Math.min(e2, i2));
}
var i = class {
  advance(t2) {
    var i2;
    if (!this.isRunning)
      return;
    let s2 = false;
    if (this.lerp)
      this.value = (o2 = this.value, n2 = this.to, (1 - (r2 = 1 - Math.exp(-60 * this.lerp * t2))) * o2 + r2 * n2), Math.round(this.value) === this.to && (this.value = this.to, s2 = true);
    else {
      this.currentTime += t2;
      const i3 = e(0, this.currentTime / this.duration, 1);
      s2 = i3 >= 1;
      const o3 = s2 ? 1 : this.easing(i3);
      this.value = this.from + (this.to - this.from) * o3;
    }
    var o2, n2, r2;
    null == (i2 = this.onUpdate) || i2.call(this, this.value, { completed: s2 }), s2 && this.stop();
  }
  stop() {
    this.isRunning = false;
  }
  fromTo(t2, e2, { lerp: i2 = 0.1, duration: s2 = 1, easing: o2 = (t3) => t3, onUpdate: n2 }) {
    this.from = this.value = t2, this.to = e2, this.lerp = i2, this.duration = s2, this.easing = o2, this.currentTime = 0, this.isRunning = true, this.onUpdate = n2;
  }
};
function s(t2, e2) {
  let i2;
  return function() {
    let s2 = arguments, o2 = this;
    clearTimeout(i2), i2 = setTimeout(function() {
      t2.apply(o2, s2);
    }, e2);
  };
}
var o = class {
  constructor(t2, e2) {
    this.onWindowResize = () => {
      this.width = window.innerWidth, this.height = window.innerHeight;
    }, this.onWrapperResize = () => {
      this.width = this.wrapper.clientWidth, this.height = this.wrapper.clientHeight;
    }, this.onContentResize = () => {
      const t3 = this.wrapper === window ? document.documentElement : this.wrapper;
      this.scrollHeight = t3.scrollHeight, this.scrollWidth = t3.scrollWidth;
    }, this.wrapper = t2, this.content = e2, this.wrapper === window ? (window.addEventListener("resize", this.onWindowResize, false), this.onWindowResize()) : (this.wrapperResizeObserver = new ResizeObserver(s(this.onWrapperResize, 100)), this.wrapperResizeObserver.observe(this.wrapper), this.onWrapperResize()), this.contentResizeObserver = new ResizeObserver(s(this.onContentResize, 100)), this.contentResizeObserver.observe(this.content), this.onContentResize();
  }
  destroy() {
    var t2, e2;
    window.removeEventListener("resize", this.onWindowResize, false), null == (t2 = this.wrapperResizeObserver) || t2.disconnect(), null == (e2 = this.contentResizeObserver) || e2.disconnect();
  }
  get limit() {
    return { x: this.scrollWidth - this.width, y: this.scrollHeight - this.height };
  }
};
var n = () => ({ events: {}, emit(t2, ...e2) {
  let i2 = this.events[t2] || [];
  for (let t3 = 0, s2 = i2.length; t3 < s2; t3++)
    i2[t3](...e2);
}, on(t2, e2) {
  var i2;
  return (null == (i2 = this.events[t2]) ? void 0 : i2.push(e2)) || (this.events[t2] = [e2]), () => {
    var i3;
    this.events[t2] = null == (i3 = this.events[t2]) ? void 0 : i3.filter((t3) => e2 !== t3);
  };
} });
var r = class {
  constructor(t2, { wheelMultiplier: i2 = 1, touchMultiplier: s2 = 2, normalizeWheel: o2 = false }) {
    this.onTouchStart = (t3) => {
      const { clientX: e2, clientY: i3 } = t3.targetTouches ? t3.targetTouches[0] : t3;
      this.touchStart.x = e2, this.touchStart.y = i3, this.lastDelta = { x: 0, y: 0 };
    }, this.onTouchMove = (t3) => {
      const { clientX: e2, clientY: i3 } = t3.targetTouches ? t3.targetTouches[0] : t3, s3 = -(e2 - this.touchStart.x) * this.touchMultiplier, o3 = -(i3 - this.touchStart.y) * this.touchMultiplier;
      this.touchStart.x = e2, this.touchStart.y = i3, this.lastDelta = { x: s3, y: o3 }, this.emitter.emit("scroll", { type: "touch", deltaX: s3, deltaY: o3, event: t3 });
    }, this.onTouchEnd = (t3) => {
      this.emitter.emit("scroll", { type: "touch", inertia: true, deltaX: this.lastDelta.x, deltaY: this.lastDelta.y, event: t3 });
    }, this.onWheel = (t3) => {
      let { deltaX: i3, deltaY: s3 } = t3;
      this.normalizeWheel && (i3 = e(-100, i3, 100), s3 = e(-100, s3, 100)), i3 *= this.wheelMultiplier, s3 *= this.wheelMultiplier, this.emitter.emit("scroll", { type: "wheel", deltaX: i3, deltaY: s3, event: t3 });
    }, this.element = t2, this.wheelMultiplier = i2, this.touchMultiplier = s2, this.normalizeWheel = o2, this.touchStart = { x: null, y: null }, this.emitter = n(), this.element.addEventListener("wheel", this.onWheel, { passive: false }), this.element.addEventListener("touchstart", this.onTouchStart, { passive: false }), this.element.addEventListener("touchmove", this.onTouchMove, { passive: false }), this.element.addEventListener("touchend", this.onTouchEnd, { passive: false });
  }
  on(t2, e2) {
    return this.emitter.on(t2, e2);
  }
  destroy() {
    this.emitter.events = {}, this.element.removeEventListener("wheel", this.onWheel, { passive: false }), this.element.removeEventListener("touchstart", this.onTouchStart, { passive: false }), this.element.removeEventListener("touchmove", this.onTouchMove, { passive: false }), this.element.removeEventListener("touchend", this.onTouchEnd, { passive: false });
  }
};
var l = class {
  constructor({ direction: e2, gestureDirection: s2, mouseMultiplier: l2, smooth: h, wrapper: a = window, content: c = document.documentElement, wheelEventsTarget: u = a, smoothWheel: p = null == h || h, smoothTouch: d = false, syncTouch: m = false, syncTouchLerp: v = 0.1, touchInertiaMultiplier: g = 35, duration: S, easing: w = (t2) => Math.min(1, 1.001 - Math.pow(2, -10 * t2)), lerp: f = S ? null : 0.1, infinite: y = false, orientation: T = null != e2 ? e2 : "vertical", gestureOrientation: z = null != s2 ? s2 : "vertical", touchMultiplier: M = 1, wheelMultiplier: E = null != l2 ? l2 : 1, normalizeWheel: L = false } = {}) {
    this.onVirtualScroll = ({ type: e3, inertia: i2, deltaX: s3, deltaY: o2, event: n2 }) => {
      if (n2.ctrlKey)
        return;
      const r2 = "touch" === e3, l3 = "wheel" === e3;
      if ("vertical" === this.options.gestureOrientation && 0 === o2 || "horizontal" === this.options.gestureOrientation && 0 === s3 || r2 && "vertical" === this.options.gestureOrientation && 0 === this.scroll && !this.options.infinite && o2 <= 0)
        return;
      if (n2.composedPath().find((t2) => null == t2 || null == t2.hasAttribute ? void 0 : t2.hasAttribute("data-lenis-prevent")))
        return;
      if (this.isStopped || this.isLocked)
        return void n2.preventDefault();
      if (this.isSmooth = (this.options.smoothTouch || this.options.syncTouch) && r2 || this.options.smoothWheel && l3, !this.isSmooth)
        return this.isScrolling = false, void this.animate.stop();
      n2.preventDefault();
      let h2 = o2;
      "both" === this.options.gestureOrientation ? h2 = Math.abs(o2) > Math.abs(s3) ? o2 : s3 : "horizontal" === this.options.gestureOrientation && (h2 = s3);
      const a2 = r2 && this.options.syncTouch, c2 = r2 && i2 && Math.abs(h2) > 1;
      c2 && (h2 = this.velocity * this.options.touchInertiaMultiplier), this.scrollTo(this.targetScroll + h2, t({ programmatic: false }, a2 && { lerp: c2 ? this.syncTouchLerp : 0.4 }));
    }, this.onScroll = () => {
      if (!this.isScrolling) {
        const t2 = this.animatedScroll;
        this.animatedScroll = this.targetScroll = this.actualScroll, this.velocity = 0, this.direction = Math.sign(this.animatedScroll - t2), this.emit();
      }
    }, e2 && console.warn("Lenis: `direction` option is deprecated, use `orientation` instead"), s2 && console.warn("Lenis: `gestureDirection` option is deprecated, use `gestureOrientation` instead"), l2 && console.warn("Lenis: `mouseMultiplier` option is deprecated, use `wheelMultiplier` instead"), h && console.warn("Lenis: `smooth` option is deprecated, use `smoothWheel` instead"), window.lenisVersion = "1.0.12", a !== document.documentElement && a !== document.body || (a = window), this.options = { wrapper: a, content: c, wheelEventsTarget: u, smoothWheel: p, smoothTouch: d, syncTouch: m, syncTouchLerp: v, touchInertiaMultiplier: g, duration: S, easing: w, lerp: f, infinite: y, gestureOrientation: z, orientation: T, touchMultiplier: M, wheelMultiplier: E, normalizeWheel: L }, this.dimensions = new o(a, c), this.rootElement.classList.add("lenis"), this.velocity = 0, this.isStopped = false, this.isSmooth = p || d, this.isScrolling = false, this.targetScroll = this.animatedScroll = this.actualScroll, this.animate = new i(), this.emitter = n(), this.options.wrapper.addEventListener("scroll", this.onScroll, { passive: false }), this.virtualScroll = new r(u, { touchMultiplier: M, wheelMultiplier: E, normalizeWheel: L }), this.virtualScroll.on("scroll", this.onVirtualScroll);
  }
  destroy() {
    this.emitter.events = {}, this.options.wrapper.removeEventListener("scroll", this.onScroll, { passive: false }), this.virtualScroll.destroy();
  }
  on(t2, e2) {
    return this.emitter.on(t2, e2);
  }
  off(t2, e2) {
    var i2;
    this.emitter.events[t2] = null == (i2 = this.emitter.events[t2]) ? void 0 : i2.filter((t3) => e2 !== t3);
  }
  setScroll(t2) {
    this.isHorizontal ? this.rootElement.scrollLeft = t2 : this.rootElement.scrollTop = t2;
  }
  emit() {
    this.emitter.emit("scroll", this);
  }
  reset() {
    this.isLocked = false, this.isScrolling = false, this.velocity = 0, this.animate.stop();
  }
  start() {
    this.isStopped = false, this.reset();
  }
  stop() {
    this.isStopped = true, this.animate.stop(), this.reset();
  }
  raf(t2) {
    const e2 = t2 - (this.time || t2);
    this.time = t2, this.animate.advance(1e-3 * e2);
  }
  scrollTo(t2, { offset: i2 = 0, immediate: s2 = false, lock: o2 = false, duration: n2 = this.options.duration, easing: r2 = this.options.easing, lerp: l2 = !n2 && this.options.lerp, onComplete: h = null, force: a = false, programmatic: c = true } = {}) {
    if (!this.isStopped || a) {
      if (["top", "left", "start"].includes(t2))
        t2 = 0;
      else if (["bottom", "right", "end"].includes(t2))
        t2 = this.limit;
      else {
        var u;
        let e2;
        if ("string" == typeof t2 ? e2 = document.querySelector(t2) : null != (u = t2) && u.nodeType && (e2 = t2), e2) {
          if (this.options.wrapper !== window) {
            const t3 = this.options.wrapper.getBoundingClientRect();
            i2 -= this.isHorizontal ? t3.left : t3.top;
          }
          const s3 = e2.getBoundingClientRect();
          t2 = (this.isHorizontal ? s3.left : s3.top) + this.animatedScroll;
        }
      }
      if ("number" == typeof t2) {
        if (t2 += i2, t2 = Math.round(t2), this.options.infinite ? c && (this.targetScroll = this.animatedScroll = this.scroll) : t2 = e(0, t2, this.limit), s2)
          return this.animatedScroll = this.targetScroll = t2, this.setScroll(this.scroll), this.reset(), this.emit(), void (null == h || h());
        if (!c) {
          if (t2 === this.targetScroll)
            return;
          this.targetScroll = t2;
        }
        this.animate.fromTo(this.animatedScroll, t2, { duration: n2, easing: r2, lerp: l2, onUpdate: (t3, { completed: e2 }) => {
          o2 && (this.isLocked = true), this.isScrolling = true, this.velocity = t3 - this.animatedScroll, this.direction = Math.sign(this.velocity), this.animatedScroll = t3, this.setScroll(this.scroll), c && (this.targetScroll = t3), e2 && (o2 && (this.isLocked = false), requestAnimationFrame(() => {
            this.isScrolling = false;
          }), this.velocity = 0, null == h || h()), this.emit();
        } });
      }
    }
  }
  get rootElement() {
    return this.options.wrapper === window ? this.options.content : this.options.wrapper;
  }
  get limit() {
    return this.isHorizontal ? this.dimensions.limit.x : this.dimensions.limit.y;
  }
  get isHorizontal() {
    return "horizontal" === this.options.orientation;
  }
  get actualScroll() {
    return this.isHorizontal ? this.rootElement.scrollLeft : this.rootElement.scrollTop;
  }
  get scroll() {
    return this.options.infinite ? (this.animatedScroll % (t2 = this.limit) + t2) % t2 : this.animatedScroll;
    var t2;
  }
  get progress() {
    return 0 === this.limit ? 1 : this.scroll / this.limit;
  }
  get isSmooth() {
    return this.__isSmooth;
  }
  set isSmooth(t2) {
    this.__isSmooth !== t2 && (this.rootElement.classList.toggle("lenis-smooth", t2), this.__isSmooth = t2);
  }
  get isScrolling() {
    return this.__isScrolling;
  }
  set isScrolling(t2) {
    this.__isScrolling !== t2 && (this.rootElement.classList.toggle("lenis-scrolling", t2), this.__isScrolling = t2);
  }
  get isStopped() {
    return this.__isStopped;
  }
  set isStopped(t2) {
    this.__isStopped !== t2 && (this.rootElement.classList.toggle("lenis-stopped", t2), this.__isStopped = t2);
  }
};
export {
  l as default
};
//# sourceMappingURL=@studio-freight_lenis.js.map
