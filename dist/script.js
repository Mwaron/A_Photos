(() => {
  // node_modules/animejs/lib/anime.esm.js
  var isBrowser = typeof window !== "undefined";
  var win = isBrowser ? (
    /** @type {Window & {AnimeJS: Array}} */
    /** @type {unknown} */
    window
  ) : null;
  var doc = isBrowser ? document : null;
  var tweenTypes = {
    OBJECT: 0,
    ATTRIBUTE: 1,
    CSS: 2,
    TRANSFORM: 3,
    CSS_VAR: 4
  };
  var valueTypes = {
    NUMBER: 0,
    UNIT: 1,
    COLOR: 2,
    COMPLEX: 3
  };
  var tickModes = {
    NONE: 0,
    AUTO: 1,
    FORCE: 2
  };
  var compositionTypes = {
    replace: 0,
    none: 1,
    blend: 2
  };
  var isRegisteredTargetSymbol = Symbol();
  var isDomSymbol = Symbol();
  var isSvgSymbol = Symbol();
  var transformsSymbol = Symbol();
  var morphPointsSymbol = Symbol();
  var proxyTargetSymbol = Symbol();
  var minValue = 1e-11;
  var maxValue = 1e12;
  var K = 1e3;
  var maxFps = 120;
  var emptyString = "";
  var shortTransforms = /* @__PURE__ */ (() => {
    const map = /* @__PURE__ */ new Map();
    map.set("x", "translateX");
    map.set("y", "translateY");
    map.set("z", "translateZ");
    return map;
  })();
  var validTransforms = [
    "translateX",
    "translateY",
    "translateZ",
    "rotate",
    "rotateX",
    "rotateY",
    "rotateZ",
    "scale",
    "scaleX",
    "scaleY",
    "scaleZ",
    "skew",
    "skewX",
    "skewY",
    "perspective",
    "matrix",
    "matrix3d"
  ];
  var transformsFragmentStrings = /* @__PURE__ */ validTransforms.reduce((a, v) => ({ ...a, [v]: v + "(" }), {});
  var noop = () => {
  };
  var hexTestRgx = /(^#([\da-f]{3}){1,2}$)|(^#([\da-f]{4}){1,2}$)/i;
  var rgbExecRgx = /rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/i;
  var rgbaExecRgx = /rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(-?\d+|-?\d*.\d+)\s*\)/i;
  var hslExecRgx = /hsl\(\s*(-?\d+|-?\d*.\d+)\s*,\s*(-?\d+|-?\d*.\d+)%\s*,\s*(-?\d+|-?\d*.\d+)%\s*\)/i;
  var hslaExecRgx = /hsla\(\s*(-?\d+|-?\d*.\d+)\s*,\s*(-?\d+|-?\d*.\d+)%\s*,\s*(-?\d+|-?\d*.\d+)%\s*,\s*(-?\d+|-?\d*.\d+)\s*\)/i;
  var digitWithExponentRgx = /[-+]?\d*\.?\d+(?:e[-+]?\d)?/gi;
  var unitsExecRgx = /^([-+]?\d*\.?\d+(?:e[-+]?\d+)?)([a-z]+|%)$/i;
  var lowerCaseRgx = /([a-z])([A-Z])/g;
  var transformsExecRgx = /(\w+)(\([^)]+\)+)/g;
  var relativeValuesExecRgx = /(\*=|\+=|-=)/;
  var defaults = {
    id: null,
    keyframes: null,
    playbackEase: null,
    playbackRate: 1,
    frameRate: maxFps,
    loop: 0,
    reversed: false,
    alternate: false,
    autoplay: true,
    duration: K,
    delay: 0,
    loopDelay: 0,
    ease: "out(2)",
    composition: compositionTypes.replace,
    modifier: (v) => v,
    onBegin: noop,
    onBeforeUpdate: noop,
    onUpdate: noop,
    onLoop: noop,
    onPause: noop,
    onComplete: noop,
    onRender: noop
  };
  var scope = {
    /** @type {Scope} */
    current: null,
    /** @type {Document|DOMTarget} */
    root: doc
  };
  var globals = {
    /** @type {DefaultsParams} */
    defaults,
    /** @type {Number} */
    precision: 4,
    /** @type {Number} equals 1 in ms mode, 0.001 in s mode */
    timeScale: 1,
    /** @type {Number} */
    tickThreshold: 200
  };
  var globalVersions = { version: "4.1.3", engine: null };
  if (isBrowser) {
    if (!win.AnimeJS) win.AnimeJS = [];
    win.AnimeJS.push(globalVersions);
  }
  var toLowerCase = (str) => str.replace(lowerCaseRgx, "$1-$2").toLowerCase();
  var stringStartsWith = (str, sub) => str.indexOf(sub) === 0;
  var now = Date.now;
  var isArr = Array.isArray;
  var isObj = (a) => a && a.constructor === Object;
  var isNum = (a) => typeof a === "number" && !isNaN(a);
  var isStr = (a) => typeof a === "string";
  var isFnc = (a) => typeof a === "function";
  var isUnd = (a) => typeof a === "undefined";
  var isNil = (a) => isUnd(a) || a === null;
  var isSvg = (a) => isBrowser && a instanceof SVGElement;
  var isHex = (a) => hexTestRgx.test(a);
  var isRgb = (a) => stringStartsWith(a, "rgb");
  var isHsl = (a) => stringStartsWith(a, "hsl");
  var isCol = (a) => isHex(a) || isRgb(a) || isHsl(a);
  var isKey = (a) => !globals.defaults.hasOwnProperty(a);
  var parseNumber = (str) => isStr(str) ? parseFloat(
    /** @type {String} */
    str
  ) : (
    /** @type {Number} */
    str
  );
  var pow = Math.pow;
  var sqrt = Math.sqrt;
  var sin = Math.sin;
  var cos = Math.cos;
  var abs = Math.abs;
  var ceil = Math.ceil;
  var floor = Math.floor;
  var asin = Math.asin;
  var max = Math.max;
  var PI = Math.PI;
  var _round = Math.round;
  var clamp = (v, min, max2) => v < min ? min : v > max2 ? max2 : v;
  var powCache = {};
  var round = (v, decimalLength) => {
    if (decimalLength < 0) return v;
    if (!decimalLength) return _round(v);
    let p = powCache[decimalLength];
    if (!p) p = powCache[decimalLength] = 10 ** decimalLength;
    return _round(v * p) / p;
  };
  var snap = (v, increment) => isArr(increment) ? increment.reduce((closest, cv) => abs(cv - v) < abs(closest - v) ? cv : closest) : increment ? _round(v / increment) * increment : v;
  var interpolate = (start, end, progress) => start + (end - start) * progress;
  var random = (min, max2, decimalLength) => {
    const m = 10 ** (decimalLength || 0);
    return floor((Math.random() * (max2 - min + 1 / m) + min) * m) / m;
  };
  var shuffle = (items) => {
    let m = items.length, t, i;
    while (m) {
      i = random(0, --m);
      t = items[m];
      items[m] = items[i];
      items[i] = t;
    }
    return items;
  };
  var clampInfinity = (v) => v === Infinity ? maxValue : v === -Infinity ? -1e12 : v;
  var normalizeTime = (v) => v <= minValue ? minValue : clampInfinity(round(v, 11));
  var cloneArray = (a) => isArr(a) ? [...a] : a;
  var mergeObjects = (o1, o2) => {
    const merged = (
      /** @type {T & U} */
      { ...o1 }
    );
    for (let p in o2) {
      const o1p = (
        /** @type {T & U} */
        o1[p]
      );
      merged[p] = isUnd(o1p) ? (
        /** @type {T & U} */
        o2[p]
      ) : o1p;
    }
    return merged;
  };
  var forEachChildren = (parent, callback, reverse, prevProp = "_prev", nextProp = "_next") => {
    let next = parent._head;
    let adjustedNextProp = nextProp;
    if (reverse) {
      next = parent._tail;
      adjustedNextProp = prevProp;
    }
    while (next) {
      const currentNext = next[adjustedNextProp];
      callback(next);
      next = currentNext;
    }
  };
  var removeChild = (parent, child, prevProp = "_prev", nextProp = "_next") => {
    const prev = child[prevProp];
    const next = child[nextProp];
    prev ? prev[nextProp] = next : parent._head = next;
    next ? next[prevProp] = prev : parent._tail = prev;
    child[prevProp] = null;
    child[nextProp] = null;
  };
  var addChild = (parent, child, sortMethod, prevProp = "_prev", nextProp = "_next") => {
    let prev = parent._tail;
    while (prev && sortMethod && sortMethod(prev, child)) prev = prev[prevProp];
    const next = prev ? prev[nextProp] : parent._head;
    prev ? prev[nextProp] = child : parent._head = child;
    next ? next[prevProp] = child : parent._tail = child;
    child[prevProp] = prev;
    child[nextProp] = next;
  };
  var createRefreshable = (constructor) => {
    let tracked;
    return (...args) => {
      let currentIteration, currentIterationProgress, reversed, alternate;
      if (tracked) {
        currentIteration = tracked.currentIteration;
        currentIterationProgress = tracked.iterationProgress;
        reversed = tracked.reversed;
        alternate = tracked._alternate;
        tracked.revert();
      }
      const cleanup = constructor(...args);
      if (cleanup && !isFnc(cleanup) && cleanup.revert) tracked = cleanup;
      if (!isUnd(currentIterationProgress)) {
        tracked.currentIteration = currentIteration;
        tracked.iterationProgress = (alternate ? !(currentIteration % 2) ? reversed : !reversed : reversed) ? 1 - currentIterationProgress : currentIterationProgress;
      }
      return cleanup || noop;
    };
  };
  var Clock = class {
    /** @param {Number} [initTime] */
    constructor(initTime = 0) {
      this.deltaTime = 0;
      this._currentTime = initTime;
      this._elapsedTime = initTime;
      this._startTime = initTime;
      this._lastTime = initTime;
      this._scheduledTime = 0;
      this._frameDuration = round(K / maxFps, 0);
      this._fps = maxFps;
      this._speed = 1;
      this._hasChildren = false;
      this._head = null;
      this._tail = null;
    }
    get fps() {
      return this._fps;
    }
    set fps(frameRate) {
      const previousFrameDuration = this._frameDuration;
      const fr = +frameRate;
      const fps = fr < minValue ? minValue : fr;
      const frameDuration = round(K / fps, 0);
      this._fps = fps;
      this._frameDuration = frameDuration;
      this._scheduledTime += frameDuration - previousFrameDuration;
    }
    get speed() {
      return this._speed;
    }
    set speed(playbackRate) {
      const pbr = +playbackRate;
      this._speed = pbr < minValue ? minValue : pbr;
    }
    /**
     * @param  {Number} time
     * @return {tickModes}
     */
    requestTick(time) {
      const scheduledTime = this._scheduledTime;
      const elapsedTime = this._elapsedTime;
      this._elapsedTime += time - elapsedTime;
      if (elapsedTime < scheduledTime) return tickModes.NONE;
      const frameDuration = this._frameDuration;
      const frameDelta = elapsedTime - scheduledTime;
      this._scheduledTime += frameDelta < frameDuration ? frameDuration : frameDelta;
      return tickModes.AUTO;
    }
    /**
     * @param  {Number} time
     * @return {Number}
     */
    computeDeltaTime(time) {
      const delta = time - this._lastTime;
      this.deltaTime = delta;
      this._lastTime = time;
      return delta;
    }
  };
  var render = (tickable, time, muteCallbacks, internalRender, tickMode) => {
    const parent = tickable.parent;
    const duration = tickable.duration;
    const completed = tickable.completed;
    const iterationDuration = tickable.iterationDuration;
    const iterationCount = tickable.iterationCount;
    const _currentIteration = tickable._currentIteration;
    const _loopDelay = tickable._loopDelay;
    const _reversed = tickable._reversed;
    const _alternate = tickable._alternate;
    const _hasChildren = tickable._hasChildren;
    const tickableDelay = tickable._delay;
    const tickablePrevAbsoluteTime = tickable._currentTime;
    const tickableEndTime = tickableDelay + iterationDuration;
    const tickableAbsoluteTime = time - tickableDelay;
    const tickablePrevTime = clamp(tickablePrevAbsoluteTime, -tickableDelay, duration);
    const tickableCurrentTime = clamp(tickableAbsoluteTime, -tickableDelay, duration);
    const deltaTime = tickableAbsoluteTime - tickablePrevAbsoluteTime;
    const isCurrentTimeAboveZero = tickableCurrentTime > 0;
    const isCurrentTimeEqualOrAboveDuration = tickableCurrentTime >= duration;
    const isSetter = duration <= minValue;
    const forcedTick = tickMode === tickModes.FORCE;
    let isOdd = 0;
    let iterationElapsedTime = tickableAbsoluteTime;
    let hasRendered = 0;
    if (iterationCount > 1) {
      const currentIteration = ~~(tickableCurrentTime / (iterationDuration + (isCurrentTimeEqualOrAboveDuration ? 0 : _loopDelay)));
      tickable._currentIteration = clamp(currentIteration, 0, iterationCount);
      if (isCurrentTimeEqualOrAboveDuration) tickable._currentIteration--;
      isOdd = tickable._currentIteration % 2;
      iterationElapsedTime = tickableCurrentTime % (iterationDuration + _loopDelay) || 0;
    }
    const isReversed = _reversed ^ (_alternate && isOdd);
    const _ease = (
      /** @type {Renderable} */
      tickable._ease
    );
    let iterationTime = isCurrentTimeEqualOrAboveDuration ? isReversed ? 0 : duration : isReversed ? iterationDuration - iterationElapsedTime : iterationElapsedTime;
    if (_ease) iterationTime = iterationDuration * _ease(iterationTime / iterationDuration) || 0;
    const isRunningBackwards = (parent ? parent.backwards : tickableAbsoluteTime < tickablePrevAbsoluteTime) ? !isReversed : !!isReversed;
    tickable._currentTime = tickableAbsoluteTime;
    tickable._iterationTime = iterationTime;
    tickable.backwards = isRunningBackwards;
    if (isCurrentTimeAboveZero && !tickable.began) {
      tickable.began = true;
      if (!muteCallbacks && !(parent && (isRunningBackwards || !parent.began))) {
        tickable.onBegin(
          /** @type {CallbackArgument} */
          tickable
        );
      }
    } else if (tickableAbsoluteTime <= 0) {
      tickable.began = false;
    }
    if (!muteCallbacks && !_hasChildren && isCurrentTimeAboveZero && tickable._currentIteration !== _currentIteration) {
      tickable.onLoop(
        /** @type {CallbackArgument} */
        tickable
      );
    }
    if (forcedTick || tickMode === tickModes.AUTO && (time >= tickableDelay && time <= tickableEndTime || // Normal render
    time <= tickableDelay && tickablePrevTime > tickableDelay || // Playhead is before the animation start time so make sure the animation is at its initial state
    time >= tickableEndTime && tickablePrevTime !== duration) || iterationTime >= tickableEndTime && tickablePrevTime !== duration || iterationTime <= tickableDelay && tickablePrevTime > 0 || time <= tickablePrevTime && tickablePrevTime === duration && completed || // Force a render if a seek occurs on an completed animation
    isCurrentTimeEqualOrAboveDuration && !completed && isSetter) {
      if (isCurrentTimeAboveZero) {
        tickable.computeDeltaTime(tickablePrevTime);
        if (!muteCallbacks) tickable.onBeforeUpdate(
          /** @type {CallbackArgument} */
          tickable
        );
      }
      if (!_hasChildren) {
        const forcedRender = forcedTick || (isRunningBackwards ? deltaTime * -1 : deltaTime) >= globals.tickThreshold;
        const absoluteTime = tickable._offset + (parent ? parent._offset : 0) + tickableDelay + iterationTime;
        let tween = (
          /** @type {Tween} */
          /** @type {JSAnimation} */
          tickable._head
        );
        let tweenTarget;
        let tweenStyle;
        let tweenTargetTransforms;
        let tweenTargetTransformsProperties;
        let tweenTransformsNeedUpdate = 0;
        while (tween) {
          const tweenComposition = tween._composition;
          const tweenCurrentTime = tween._currentTime;
          const tweenChangeDuration = tween._changeDuration;
          const tweenAbsEndTime = tween._absoluteStartTime + tween._changeDuration;
          const tweenNextRep = tween._nextRep;
          const tweenPrevRep = tween._prevRep;
          const tweenHasComposition = tweenComposition !== compositionTypes.none;
          if ((forcedRender || (tweenCurrentTime !== tweenChangeDuration || absoluteTime <= tweenAbsEndTime + (tweenNextRep ? tweenNextRep._delay : 0)) && (tweenCurrentTime !== 0 || absoluteTime >= tween._absoluteStartTime)) && (!tweenHasComposition || !tween._isOverridden && (!tween._isOverlapped || absoluteTime <= tweenAbsEndTime) && (!tweenNextRep || (tweenNextRep._isOverridden || absoluteTime <= tweenNextRep._absoluteStartTime)) && (!tweenPrevRep || (tweenPrevRep._isOverridden || absoluteTime >= tweenPrevRep._absoluteStartTime + tweenPrevRep._changeDuration + tween._delay)))) {
            const tweenNewTime = tween._currentTime = clamp(iterationTime - tween._startTime, 0, tweenChangeDuration);
            const tweenProgress = tween._ease(tweenNewTime / tween._updateDuration);
            const tweenModifier = tween._modifier;
            const tweenValueType = tween._valueType;
            const tweenType = tween._tweenType;
            const tweenIsObject = tweenType === tweenTypes.OBJECT;
            const tweenIsNumber = tweenValueType === valueTypes.NUMBER;
            const tweenPrecision = tweenIsNumber && tweenIsObject || tweenProgress === 0 || tweenProgress === 1 ? -1 : globals.precision;
            let value;
            let number;
            if (tweenIsNumber) {
              value = number = /** @type {Number} */
              tweenModifier(round(interpolate(tween._fromNumber, tween._toNumber, tweenProgress), tweenPrecision));
            } else if (tweenValueType === valueTypes.UNIT) {
              number = /** @type {Number} */
              tweenModifier(round(interpolate(tween._fromNumber, tween._toNumber, tweenProgress), tweenPrecision));
              value = `${number}${tween._unit}`;
            } else if (tweenValueType === valueTypes.COLOR) {
              const fn = tween._fromNumbers;
              const tn = tween._toNumbers;
              const r = round(clamp(
                /** @type {Number} */
                tweenModifier(interpolate(fn[0], tn[0], tweenProgress)),
                0,
                255
              ), 0);
              const g = round(clamp(
                /** @type {Number} */
                tweenModifier(interpolate(fn[1], tn[1], tweenProgress)),
                0,
                255
              ), 0);
              const b = round(clamp(
                /** @type {Number} */
                tweenModifier(interpolate(fn[2], tn[2], tweenProgress)),
                0,
                255
              ), 0);
              const a = clamp(
                /** @type {Number} */
                tweenModifier(round(interpolate(fn[3], tn[3], tweenProgress), tweenPrecision)),
                0,
                1
              );
              value = `rgba(${r},${g},${b},${a})`;
              if (tweenHasComposition) {
                const ns = tween._numbers;
                ns[0] = r;
                ns[1] = g;
                ns[2] = b;
                ns[3] = a;
              }
            } else if (tweenValueType === valueTypes.COMPLEX) {
              value = tween._strings[0];
              for (let j = 0, l = tween._toNumbers.length; j < l; j++) {
                const n = (
                  /** @type {Number} */
                  tweenModifier(round(interpolate(tween._fromNumbers[j], tween._toNumbers[j], tweenProgress), tweenPrecision))
                );
                const s = tween._strings[j + 1];
                value += `${s ? n + s : n}`;
                if (tweenHasComposition) {
                  tween._numbers[j] = n;
                }
              }
            }
            if (tweenHasComposition) {
              tween._number = number;
            }
            if (!internalRender && tweenComposition !== compositionTypes.blend) {
              const tweenProperty = tween.property;
              tweenTarget = tween.target;
              if (tweenIsObject) {
                tweenTarget[tweenProperty] = value;
              } else if (tweenType === tweenTypes.ATTRIBUTE) {
                tweenTarget.setAttribute(
                  tweenProperty,
                  /** @type {String} */
                  value
                );
              } else {
                tweenStyle = /** @type {DOMTarget} */
                tweenTarget.style;
                if (tweenType === tweenTypes.TRANSFORM) {
                  if (tweenTarget !== tweenTargetTransforms) {
                    tweenTargetTransforms = tweenTarget;
                    tweenTargetTransformsProperties = tweenTarget[transformsSymbol];
                  }
                  tweenTargetTransformsProperties[tweenProperty] = value;
                  tweenTransformsNeedUpdate = 1;
                } else if (tweenType === tweenTypes.CSS) {
                  tweenStyle[tweenProperty] = value;
                } else if (tweenType === tweenTypes.CSS_VAR) {
                  tweenStyle.setProperty(
                    tweenProperty,
                    /** @type {String} */
                    value
                  );
                }
              }
              if (isCurrentTimeAboveZero) hasRendered = 1;
            } else {
              tween._value = value;
            }
          }
          if (tweenTransformsNeedUpdate && tween._renderTransforms) {
            let str = emptyString;
            for (let key2 in tweenTargetTransformsProperties) {
              str += `${transformsFragmentStrings[key2]}${tweenTargetTransformsProperties[key2]}) `;
            }
            tweenStyle.transform = str;
            tweenTransformsNeedUpdate = 0;
          }
          tween = tween._next;
        }
        if (!muteCallbacks && hasRendered) {
          tickable.onRender(
            /** @type {JSAnimation} */
            tickable
          );
        }
      }
      if (!muteCallbacks && isCurrentTimeAboveZero) {
        tickable.onUpdate(
          /** @type {CallbackArgument} */
          tickable
        );
      }
    }
    if (parent && isSetter) {
      if (!muteCallbacks && (parent.began && !isRunningBackwards && tickableAbsoluteTime >= duration && !completed || isRunningBackwards && tickableAbsoluteTime <= minValue && completed)) {
        tickable.onComplete(
          /** @type {CallbackArgument} */
          tickable
        );
        tickable.completed = !isRunningBackwards;
      }
    } else if (isCurrentTimeAboveZero && isCurrentTimeEqualOrAboveDuration) {
      if (iterationCount === Infinity) {
        tickable._startTime += tickable.duration;
      } else if (tickable._currentIteration >= iterationCount - 1) {
        tickable.paused = true;
        if (!completed && !_hasChildren) {
          tickable.completed = true;
          if (!muteCallbacks && !(parent && (isRunningBackwards || !parent.began))) {
            tickable.onComplete(
              /** @type {CallbackArgument} */
              tickable
            );
            tickable._resolve(
              /** @type {CallbackArgument} */
              tickable
            );
          }
        }
      }
    } else {
      tickable.completed = false;
    }
    return hasRendered;
  };
  var tick = (tickable, time, muteCallbacks, internalRender, tickMode) => {
    const _currentIteration = tickable._currentIteration;
    render(tickable, time, muteCallbacks, internalRender, tickMode);
    if (tickable._hasChildren) {
      const tl = (
        /** @type {Timeline} */
        tickable
      );
      const tlIsRunningBackwards = tl.backwards;
      const tlChildrenTime = internalRender ? time : tl._iterationTime;
      const tlCildrenTickTime = now();
      let tlChildrenHasRendered = 0;
      let tlChildrenHaveCompleted = true;
      if (!internalRender && tl._currentIteration !== _currentIteration) {
        const tlIterationDuration = tl.iterationDuration;
        forEachChildren(tl, (child) => {
          if (!tlIsRunningBackwards) {
            if (!child.completed && !child.backwards && child._currentTime < child.iterationDuration) {
              render(child, tlIterationDuration, muteCallbacks, 1, tickModes.FORCE);
            }
            child.began = false;
            child.completed = false;
          } else {
            const childDuration = child.duration;
            const childStartTime = child._offset + child._delay;
            const childEndTime = childStartTime + childDuration;
            if (!muteCallbacks && childDuration <= minValue && (!childStartTime || childEndTime === tlIterationDuration)) {
              child.onComplete(child);
            }
          }
        });
        if (!muteCallbacks) tl.onLoop(
          /** @type {CallbackArgument} */
          tl
        );
      }
      forEachChildren(tl, (child) => {
        const childTime = round((tlChildrenTime - child._offset) * child._speed, 12);
        const childTickMode = child._fps < tl._fps ? child.requestTick(tlCildrenTickTime) : tickMode;
        tlChildrenHasRendered += render(child, childTime, muteCallbacks, internalRender, childTickMode);
        if (!child.completed && tlChildrenHaveCompleted) tlChildrenHaveCompleted = false;
      }, tlIsRunningBackwards);
      if (!muteCallbacks && tlChildrenHasRendered) tl.onRender(
        /** @type {CallbackArgument} */
        tl
      );
      if ((tlChildrenHaveCompleted || tlIsRunningBackwards) && tl._currentTime >= tl.duration) {
        tl.paused = true;
        if (!tl.completed) {
          tl.completed = true;
          if (!muteCallbacks) {
            tl.onComplete(
              /** @type {CallbackArgument} */
              tl
            );
            tl._resolve(
              /** @type {CallbackArgument} */
              tl
            );
          }
        }
      }
    }
  };
  var additive = {
    animation: null,
    update: noop
  };
  var addAdditiveAnimation = (lookups2) => {
    let animation = additive.animation;
    if (!animation) {
      animation = {
        duration: minValue,
        computeDeltaTime: noop,
        _offset: 0,
        _delay: 0,
        _head: null,
        _tail: null
      };
      additive.animation = animation;
      additive.update = () => {
        lookups2.forEach((propertyAnimation) => {
          for (let propertyName in propertyAnimation) {
            const tweens = propertyAnimation[propertyName];
            const lookupTween = tweens._head;
            if (lookupTween) {
              const valueType = lookupTween._valueType;
              const additiveValues = valueType === valueTypes.COMPLEX || valueType === valueTypes.COLOR ? cloneArray(lookupTween._fromNumbers) : null;
              let additiveValue = lookupTween._fromNumber;
              let tween = tweens._tail;
              while (tween && tween !== lookupTween) {
                if (additiveValues) {
                  for (let i = 0, l = tween._numbers.length; i < l; i++) additiveValues[i] += tween._numbers[i];
                } else {
                  additiveValue += tween._number;
                }
                tween = tween._prevAdd;
              }
              lookupTween._toNumber = additiveValue;
              lookupTween._toNumbers = additiveValues;
            }
          }
        });
        render(animation, 1, 1, 0, tickModes.FORCE);
      };
    }
    return animation;
  };
  var engineTickMethod = /* @__PURE__ */ (() => isBrowser ? requestAnimationFrame : setImmediate)();
  var engineCancelMethod = /* @__PURE__ */ (() => isBrowser ? cancelAnimationFrame : clearImmediate)();
  var Engine = class extends Clock {
    /** @param {Number} [initTime] */
    constructor(initTime) {
      super(initTime);
      this.useDefaultMainLoop = true;
      this.pauseOnDocumentHidden = true;
      this.defaults = defaults;
      this.paused = true;
      this.reqId = 0;
    }
    update() {
      const time = this._currentTime = now();
      if (this.requestTick(time)) {
        this.computeDeltaTime(time);
        const engineSpeed = this._speed;
        const engineFps = this._fps;
        let activeTickable = (
          /** @type {Tickable} */
          this._head
        );
        while (activeTickable) {
          const nextTickable = activeTickable._next;
          if (!activeTickable.paused) {
            tick(
              activeTickable,
              (time - activeTickable._startTime) * activeTickable._speed * engineSpeed,
              0,
              // !muteCallbacks
              0,
              // !internalRender
              activeTickable._fps < engineFps ? activeTickable.requestTick(time) : tickModes.AUTO
            );
          } else {
            removeChild(this, activeTickable);
            this._hasChildren = !!this._tail;
            activeTickable._running = false;
            if (activeTickable.completed && !activeTickable._cancelled) {
              activeTickable.cancel();
            }
          }
          activeTickable = nextTickable;
        }
        additive.update();
      }
    }
    wake() {
      if (this.useDefaultMainLoop && !this.reqId) {
        this.requestTick(now());
        this.reqId = engineTickMethod(tickEngine);
      }
      return this;
    }
    pause() {
      if (!this.reqId) return;
      this.paused = true;
      return killEngine();
    }
    resume() {
      if (!this.paused) return;
      this.paused = false;
      forEachChildren(this, (child) => child.resetTime());
      return this.wake();
    }
    // Getter and setter for speed
    get speed() {
      return this._speed * (globals.timeScale === 1 ? 1 : K);
    }
    set speed(playbackRate) {
      this._speed = playbackRate * globals.timeScale;
      forEachChildren(this, (child) => child.speed = child._speed);
    }
    // Getter and setter for timeUnit
    get timeUnit() {
      return globals.timeScale === 1 ? "ms" : "s";
    }
    set timeUnit(unit) {
      const secondsScale = 1e-3;
      const isSecond = unit === "s";
      const newScale = isSecond ? secondsScale : 1;
      if (globals.timeScale !== newScale) {
        globals.timeScale = newScale;
        globals.tickThreshold = 200 * newScale;
        const scaleFactor = isSecond ? secondsScale : K;
        this.defaults.duration *= scaleFactor;
        this._speed *= scaleFactor;
      }
    }
    // Getter and setter for precision
    get precision() {
      return globals.precision;
    }
    set precision(precision) {
      globals.precision = precision;
    }
  };
  var engine = /* @__PURE__ */ (() => {
    const engine2 = new Engine(now());
    if (isBrowser) {
      globalVersions.engine = engine2;
      doc.addEventListener("visibilitychange", () => {
        if (!engine2.pauseOnDocumentHidden) return;
        doc.hidden ? engine2.pause() : engine2.resume();
      });
    }
    return engine2;
  })();
  var tickEngine = () => {
    if (engine._head) {
      engine.reqId = engineTickMethod(tickEngine);
      engine.update();
    } else {
      engine.reqId = 0;
    }
  };
  var killEngine = () => {
    engineCancelMethod(
      /** @type {NodeJS.Immediate & Number} */
      engine.reqId
    );
    engine.reqId = 0;
    return engine;
  };
  var parseInlineTransforms = (target, propName, animationInlineStyles) => {
    const inlineTransforms = target.style.transform;
    let inlinedStylesPropertyValue;
    if (inlineTransforms) {
      const cachedTransforms = target[transformsSymbol];
      let t;
      while (t = transformsExecRgx.exec(inlineTransforms)) {
        const inlinePropertyName = t[1];
        const inlinePropertyValue = t[2].slice(1, -1);
        cachedTransforms[inlinePropertyName] = inlinePropertyValue;
        if (inlinePropertyName === propName) {
          inlinedStylesPropertyValue = inlinePropertyValue;
          if (animationInlineStyles) {
            animationInlineStyles[propName] = inlinePropertyValue;
          }
        }
      }
    }
    return inlineTransforms && !isUnd(inlinedStylesPropertyValue) ? inlinedStylesPropertyValue : stringStartsWith(propName, "scale") ? "1" : stringStartsWith(propName, "rotate") || stringStartsWith(propName, "skew") ? "0deg" : "0px";
  };
  function getNodeList(v) {
    const n = isStr(v) ? scope.root.querySelectorAll(v) : v;
    if (n instanceof NodeList || n instanceof HTMLCollection) return n;
  }
  function parseTargets(targets) {
    if (isNil(targets)) return (
      /** @type {TargetsArray} */
      []
    );
    if (!isBrowser) return (
      /** @type {JSTargetsArray} */
      isArr(targets) && targets.flat(Infinity) || [targets]
    );
    if (isArr(targets)) {
      const flattened = targets.flat(Infinity);
      const parsed = [];
      for (let i = 0, l = flattened.length; i < l; i++) {
        const item = flattened[i];
        if (!isNil(item)) {
          const nodeList2 = getNodeList(item);
          if (nodeList2) {
            for (let j = 0, jl = nodeList2.length; j < jl; j++) {
              const subItem = nodeList2[j];
              if (!isNil(subItem)) {
                let isDuplicate = false;
                for (let k = 0, kl = parsed.length; k < kl; k++) {
                  if (parsed[k] === subItem) {
                    isDuplicate = true;
                    break;
                  }
                }
                if (!isDuplicate) {
                  parsed.push(subItem);
                }
              }
            }
          } else {
            let isDuplicate = false;
            for (let j = 0, jl = parsed.length; j < jl; j++) {
              if (parsed[j] === item) {
                isDuplicate = true;
                break;
              }
            }
            if (!isDuplicate) {
              parsed.push(item);
            }
          }
        }
      }
      return parsed;
    }
    const nodeList = getNodeList(targets);
    if (nodeList) return (
      /** @type {DOMTargetsArray} */
      Array.from(nodeList)
    );
    return (
      /** @type {TargetsArray} */
      [targets]
    );
  }
  function registerTargets(targets) {
    const parsedTargetsArray = parseTargets(targets);
    const parsedTargetsLength = parsedTargetsArray.length;
    if (parsedTargetsLength) {
      for (let i = 0; i < parsedTargetsLength; i++) {
        const target = parsedTargetsArray[i];
        if (!target[isRegisteredTargetSymbol]) {
          target[isRegisteredTargetSymbol] = true;
          const isSvgType = isSvg(target);
          const isDom = (
            /** @type {DOMTarget} */
            target.nodeType || isSvgType
          );
          if (isDom) {
            target[isDomSymbol] = true;
            target[isSvgSymbol] = isSvgType;
            target[transformsSymbol] = {};
          }
        }
      }
    }
    return parsedTargetsArray;
  }
  var cssReservedProperties = ["opacity", "rotate", "overflow", "color"];
  var isValidSVGAttribute = (el, propertyName) => {
    if (cssReservedProperties.includes(propertyName)) return false;
    if (el.getAttribute(propertyName) || propertyName in el) {
      if (propertyName === "scale") {
        const elParentNode = (
          /** @type {SVGGeometryElement} */
          /** @type {DOMTarget} */
          el.parentNode
        );
        return elParentNode && elParentNode.tagName === "filter";
      }
      return true;
    }
  };
  var rgbToRgba = (rgbValue) => {
    const rgba = rgbExecRgx.exec(rgbValue) || rgbaExecRgx.exec(rgbValue);
    const a = !isUnd(rgba[4]) ? +rgba[4] : 1;
    return [
      +rgba[1],
      +rgba[2],
      +rgba[3],
      a
    ];
  };
  var hexToRgba = (hexValue) => {
    const hexLength = hexValue.length;
    const isShort = hexLength === 4 || hexLength === 5;
    return [
      +("0x" + hexValue[1] + hexValue[isShort ? 1 : 2]),
      +("0x" + hexValue[isShort ? 2 : 3] + hexValue[isShort ? 2 : 4]),
      +("0x" + hexValue[isShort ? 3 : 5] + hexValue[isShort ? 3 : 6]),
      hexLength === 5 || hexLength === 9 ? +(+("0x" + hexValue[isShort ? 4 : 7] + hexValue[isShort ? 4 : 8]) / 255).toFixed(3) : 1
    ];
  };
  var hue2rgb = (p, q, t) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    return t < 1 / 6 ? p + (q - p) * 6 * t : t < 1 / 2 ? q : t < 2 / 3 ? p + (q - p) * (2 / 3 - t) * 6 : p;
  };
  var hslToRgba = (hslValue) => {
    const hsla = hslExecRgx.exec(hslValue) || hslaExecRgx.exec(hslValue);
    const h = +hsla[1] / 360;
    const s = +hsla[2] / 100;
    const l = +hsla[3] / 100;
    const a = !isUnd(hsla[4]) ? +hsla[4] : 1;
    let r, g, b;
    if (s === 0) {
      r = g = b = l;
    } else {
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = round(hue2rgb(p, q, h + 1 / 3) * 255, 0);
      g = round(hue2rgb(p, q, h) * 255, 0);
      b = round(hue2rgb(p, q, h - 1 / 3) * 255, 0);
    }
    return [r, g, b, a];
  };
  var convertColorStringValuesToRgbaArray = (colorString) => {
    return isRgb(colorString) ? rgbToRgba(colorString) : isHex(colorString) ? hexToRgba(colorString) : isHsl(colorString) ? hslToRgba(colorString) : [0, 0, 0, 1];
  };
  var setValue = (targetValue, defaultValue) => {
    return isUnd(targetValue) ? defaultValue : targetValue;
  };
  var getFunctionValue = (value, target, index, total, store) => {
    if (isFnc(value)) {
      const func = () => {
        const computed = (
          /** @type {Function} */
          value(target, index, total)
        );
        return !isNaN(+computed) ? +computed : computed || 0;
      };
      if (store) {
        store.func = func;
      }
      return func();
    } else {
      return value;
    }
  };
  var getTweenType = (target, prop) => {
    return !target[isDomSymbol] ? tweenTypes.OBJECT : (
      // Handle SVG attributes
      target[isSvgSymbol] && isValidSVGAttribute(target, prop) ? tweenTypes.ATTRIBUTE : (
        // Handle CSS Transform properties differently than CSS to allow individual animations
        validTransforms.includes(prop) || shortTransforms.get(prop) ? tweenTypes.TRANSFORM : (
          // CSS variables
          stringStartsWith(prop, "--") ? tweenTypes.CSS_VAR : (
            // All other CSS properties
            prop in /** @type {DOMTarget} */
            target.style ? tweenTypes.CSS : (
              // Handle other DOM Attributes
              prop in target ? tweenTypes.OBJECT : tweenTypes.ATTRIBUTE
            )
          )
        )
      )
    );
  };
  var getCSSValue = (target, propName, animationInlineStyles) => {
    const inlineStyles = target.style[propName];
    if (inlineStyles && animationInlineStyles) {
      animationInlineStyles[propName] = inlineStyles;
    }
    const value = inlineStyles || getComputedStyle(target[proxyTargetSymbol] || target).getPropertyValue(propName);
    return value === "auto" ? "0" : value;
  };
  var getOriginalAnimatableValue = (target, propName, tweenType, animationInlineStyles) => {
    const type = !isUnd(tweenType) ? tweenType : getTweenType(target, propName);
    return type === tweenTypes.OBJECT ? target[propName] || 0 : type === tweenTypes.ATTRIBUTE ? (
      /** @type {DOMTarget} */
      target.getAttribute(propName)
    ) : type === tweenTypes.TRANSFORM ? parseInlineTransforms(
      /** @type {DOMTarget} */
      target,
      propName,
      animationInlineStyles
    ) : type === tweenTypes.CSS_VAR ? getCSSValue(
      /** @type {DOMTarget} */
      target,
      propName,
      animationInlineStyles
    ).trimStart() : getCSSValue(
      /** @type {DOMTarget} */
      target,
      propName,
      animationInlineStyles
    );
  };
  var getRelativeValue = (x, y, operator) => {
    return operator === "-" ? x - y : operator === "+" ? x + y : x * y;
  };
  var createDecomposedValueTargetObject = () => {
    return {
      /** @type {valueTypes} */
      t: valueTypes.NUMBER,
      n: 0,
      u: null,
      o: null,
      d: null,
      s: null
    };
  };
  var decomposeRawValue = (rawValue, targetObject) => {
    targetObject.t = valueTypes.NUMBER;
    targetObject.n = 0;
    targetObject.u = null;
    targetObject.o = null;
    targetObject.d = null;
    targetObject.s = null;
    if (!rawValue) return targetObject;
    const num = +rawValue;
    if (!isNaN(num)) {
      targetObject.n = num;
      return targetObject;
    } else {
      let str = (
        /** @type {String} */
        rawValue
      );
      if (str[1] === "=") {
        targetObject.o = str[0];
        str = str.slice(2);
      }
      const unitMatch = str.includes(" ") ? false : unitsExecRgx.exec(str);
      if (unitMatch) {
        targetObject.t = valueTypes.UNIT;
        targetObject.n = +unitMatch[1];
        targetObject.u = unitMatch[2];
        return targetObject;
      } else if (targetObject.o) {
        targetObject.n = +str;
        return targetObject;
      } else if (isCol(str)) {
        targetObject.t = valueTypes.COLOR;
        targetObject.d = convertColorStringValuesToRgbaArray(str);
        return targetObject;
      } else {
        const matchedNumbers = str.match(digitWithExponentRgx);
        targetObject.t = valueTypes.COMPLEX;
        targetObject.d = matchedNumbers ? matchedNumbers.map(Number) : [];
        targetObject.s = str.split(digitWithExponentRgx) || [];
        return targetObject;
      }
    }
  };
  var decomposeTweenValue = (tween, targetObject) => {
    targetObject.t = tween._valueType;
    targetObject.n = tween._toNumber;
    targetObject.u = tween._unit;
    targetObject.o = null;
    targetObject.d = cloneArray(tween._toNumbers);
    targetObject.s = cloneArray(tween._strings);
    return targetObject;
  };
  var decomposedOriginalValue = createDecomposedValueTargetObject();
  var lookups = {
    /** @type {TweenReplaceLookups} */
    _rep: /* @__PURE__ */ new WeakMap(),
    /** @type {TweenAdditiveLookups} */
    _add: /* @__PURE__ */ new Map()
  };
  var getTweenSiblings = (target, property, lookup = "_rep") => {
    const lookupMap = lookups[lookup];
    let targetLookup = lookupMap.get(target);
    if (!targetLookup) {
      targetLookup = {};
      lookupMap.set(target, targetLookup);
    }
    return targetLookup[property] ? targetLookup[property] : targetLookup[property] = {
      _head: null,
      _tail: null
    };
  };
  var addTweenSortMethod = (p, c) => {
    return p._isOverridden || p._absoluteStartTime > c._absoluteStartTime;
  };
  var overrideTween = (tween) => {
    tween._isOverlapped = 1;
    tween._isOverridden = 1;
    tween._changeDuration = minValue;
    tween._currentTime = minValue;
  };
  var composeTween = (tween, siblings) => {
    const tweenCompositionType = tween._composition;
    if (tweenCompositionType === compositionTypes.replace) {
      const tweenAbsStartTime = tween._absoluteStartTime;
      addChild(siblings, tween, addTweenSortMethod, "_prevRep", "_nextRep");
      const prevSibling = tween._prevRep;
      if (prevSibling) {
        const prevParent = prevSibling.parent;
        const prevAbsEndTime = prevSibling._absoluteStartTime + prevSibling._changeDuration;
        if (
          // Check if the previous tween is from a different animation
          tween.parent.id !== prevParent.id && // Check if the animation has loops
          prevParent.iterationCount > 1 && // Check if _absoluteChangeEndTime of last loop overlaps the current tween
          prevAbsEndTime + (prevParent.duration - prevParent.iterationDuration) > tweenAbsStartTime
        ) {
          overrideTween(prevSibling);
          let prevPrevSibling = prevSibling._prevRep;
          while (prevPrevSibling && prevPrevSibling.parent.id === prevParent.id) {
            overrideTween(prevPrevSibling);
            prevPrevSibling = prevPrevSibling._prevRep;
          }
        }
        const absoluteUpdateStartTime = tweenAbsStartTime - tween._delay;
        if (prevAbsEndTime > absoluteUpdateStartTime) {
          const prevChangeStartTime = prevSibling._startTime;
          const prevTLOffset = prevAbsEndTime - (prevChangeStartTime + prevSibling._updateDuration);
          const updatedPrevChangeDuration = round(absoluteUpdateStartTime - prevTLOffset - prevChangeStartTime, 12);
          prevSibling._changeDuration = updatedPrevChangeDuration;
          prevSibling._currentTime = updatedPrevChangeDuration;
          prevSibling._isOverlapped = 1;
          if (updatedPrevChangeDuration < minValue) {
            overrideTween(prevSibling);
          }
        }
        let pausePrevParentAnimation = true;
        forEachChildren(prevParent, (t) => {
          if (!t._isOverlapped) pausePrevParentAnimation = false;
        });
        if (pausePrevParentAnimation) {
          const prevParentTL = prevParent.parent;
          if (prevParentTL) {
            let pausePrevParentTL = true;
            forEachChildren(prevParentTL, (a) => {
              if (a !== prevParent) {
                forEachChildren(a, (t) => {
                  if (!t._isOverlapped) pausePrevParentTL = false;
                });
              }
            });
            if (pausePrevParentTL) {
              prevParentTL.cancel();
            }
          } else {
            prevParent.cancel();
          }
        }
      }
    } else if (tweenCompositionType === compositionTypes.blend) {
      const additiveTweenSiblings = getTweenSiblings(tween.target, tween.property, "_add");
      const additiveAnimation = addAdditiveAnimation(lookups._add);
      let lookupTween = additiveTweenSiblings._head;
      if (!lookupTween) {
        lookupTween = { ...tween };
        lookupTween._composition = compositionTypes.replace;
        lookupTween._updateDuration = minValue;
        lookupTween._startTime = 0;
        lookupTween._numbers = cloneArray(tween._fromNumbers);
        lookupTween._number = 0;
        lookupTween._next = null;
        lookupTween._prev = null;
        addChild(additiveTweenSiblings, lookupTween);
        addChild(additiveAnimation, lookupTween);
      }
      const toNumber = tween._toNumber;
      tween._fromNumber = lookupTween._fromNumber - toNumber;
      tween._toNumber = 0;
      tween._numbers = cloneArray(tween._fromNumbers);
      tween._number = 0;
      lookupTween._fromNumber = toNumber;
      if (tween._toNumbers) {
        const toNumbers = cloneArray(tween._toNumbers);
        if (toNumbers) {
          toNumbers.forEach((value, i) => {
            tween._fromNumbers[i] = lookupTween._fromNumbers[i] - value;
            tween._toNumbers[i] = 0;
          });
        }
        lookupTween._fromNumbers = toNumbers;
      }
      addChild(additiveTweenSiblings, tween, null, "_prevAdd", "_nextAdd");
    }
    return tween;
  };
  var removeTweenSliblings = (tween) => {
    const tweenComposition = tween._composition;
    if (tweenComposition !== compositionTypes.none) {
      const tweenTarget = tween.target;
      const tweenProperty = tween.property;
      const replaceTweensLookup = lookups._rep;
      const replaceTargetProps = replaceTweensLookup.get(tweenTarget);
      const tweenReplaceSiblings = replaceTargetProps[tweenProperty];
      removeChild(tweenReplaceSiblings, tween, "_prevRep", "_nextRep");
      if (tweenComposition === compositionTypes.blend) {
        const addTweensLookup = lookups._add;
        const addTargetProps = addTweensLookup.get(tweenTarget);
        if (!addTargetProps) return;
        const additiveTweenSiblings = addTargetProps[tweenProperty];
        const additiveAnimation = additive.animation;
        removeChild(additiveTweenSiblings, tween, "_prevAdd", "_nextAdd");
        const lookupTween = additiveTweenSiblings._head;
        if (lookupTween && lookupTween === additiveTweenSiblings._tail) {
          removeChild(additiveTweenSiblings, lookupTween, "_prevAdd", "_nextAdd");
          removeChild(additiveAnimation, lookupTween);
          let shouldClean = true;
          for (let prop in addTargetProps) {
            if (addTargetProps[prop]._head) {
              shouldClean = false;
              break;
            }
          }
          if (shouldClean) {
            addTweensLookup.delete(tweenTarget);
          }
        }
      }
    }
    return tween;
  };
  var resetTimerProperties = (timer) => {
    timer.paused = true;
    timer.began = false;
    timer.completed = false;
    return timer;
  };
  var reviveTimer = (timer) => {
    if (!timer._cancelled) return timer;
    if (timer._hasChildren) {
      forEachChildren(timer, reviveTimer);
    } else {
      forEachChildren(timer, (tween) => {
        if (tween._composition !== compositionTypes.none) {
          composeTween(tween, getTweenSiblings(tween.target, tween.property));
        }
      });
    }
    timer._cancelled = 0;
    return timer;
  };
  var timerId = 0;
  var Timer = class extends Clock {
    /**
     * @param {TimerParams} [parameters]
     * @param {Timeline} [parent]
     * @param {Number} [parentPosition]
     */
    constructor(parameters = {}, parent = null, parentPosition = 0) {
      super(0);
      const {
        id,
        delay,
        duration,
        reversed,
        alternate,
        loop,
        loopDelay,
        autoplay,
        frameRate,
        playbackRate,
        onComplete,
        onLoop,
        onPause,
        onBegin,
        onBeforeUpdate,
        onUpdate
      } = parameters;
      if (scope.current) scope.current.register(this);
      const timerInitTime = parent ? 0 : engine._elapsedTime;
      const timerDefaults = parent ? parent.defaults : globals.defaults;
      const timerDelay = (
        /** @type {Number} */
        isFnc(delay) || isUnd(delay) ? timerDefaults.delay : +delay
      );
      const timerDuration = isFnc(duration) || isUnd(duration) ? Infinity : +duration;
      const timerLoop = setValue(loop, timerDefaults.loop);
      const timerLoopDelay = setValue(loopDelay, timerDefaults.loopDelay);
      const timerIterationCount = timerLoop === true || timerLoop === Infinity || /** @type {Number} */
      timerLoop < 0 ? Infinity : (
        /** @type {Number} */
        timerLoop + 1
      );
      let offsetPosition = 0;
      if (parent) {
        offsetPosition = parentPosition;
      } else {
        if (!engine.reqId) engine.requestTick(now());
        offsetPosition = (engine._elapsedTime - engine._startTime) * globals.timeScale;
      }
      this.id = !isUnd(id) ? id : ++timerId;
      this.parent = parent;
      this.duration = clampInfinity((timerDuration + timerLoopDelay) * timerIterationCount - timerLoopDelay) || minValue;
      this.backwards = false;
      this.paused = true;
      this.began = false;
      this.completed = false;
      this.onBegin = onBegin || timerDefaults.onBegin;
      this.onBeforeUpdate = onBeforeUpdate || timerDefaults.onBeforeUpdate;
      this.onUpdate = onUpdate || timerDefaults.onUpdate;
      this.onLoop = onLoop || timerDefaults.onLoop;
      this.onPause = onPause || timerDefaults.onPause;
      this.onComplete = onComplete || timerDefaults.onComplete;
      this.iterationDuration = timerDuration;
      this.iterationCount = timerIterationCount;
      this._autoplay = parent ? false : setValue(autoplay, timerDefaults.autoplay);
      this._offset = offsetPosition;
      this._delay = timerDelay;
      this._loopDelay = timerLoopDelay;
      this._iterationTime = 0;
      this._currentIteration = 0;
      this._resolve = noop;
      this._running = false;
      this._reversed = +setValue(reversed, timerDefaults.reversed);
      this._reverse = this._reversed;
      this._cancelled = 0;
      this._alternate = setValue(alternate, timerDefaults.alternate);
      this._prev = null;
      this._next = null;
      this._elapsedTime = timerInitTime;
      this._startTime = timerInitTime;
      this._lastTime = timerInitTime;
      this._fps = setValue(frameRate, timerDefaults.frameRate);
      this._speed = setValue(playbackRate, timerDefaults.playbackRate);
    }
    get cancelled() {
      return !!this._cancelled;
    }
    /** @param {Boolean} cancelled  */
    set cancelled(cancelled) {
      cancelled ? this.cancel() : this.reset(1).play();
    }
    get currentTime() {
      return clamp(round(this._currentTime, globals.precision), -this._delay, this.duration);
    }
    /** @param {Number} time  */
    set currentTime(time) {
      const paused = this.paused;
      this.pause().seek(+time);
      if (!paused) this.resume();
    }
    get iterationCurrentTime() {
      return round(this._iterationTime, globals.precision);
    }
    /** @param {Number} time  */
    set iterationCurrentTime(time) {
      this.currentTime = this.iterationDuration * this._currentIteration + time;
    }
    get progress() {
      return clamp(round(this._currentTime / this.duration, 10), 0, 1);
    }
    /** @param {Number} progress  */
    set progress(progress) {
      this.currentTime = this.duration * progress;
    }
    get iterationProgress() {
      return clamp(round(this._iterationTime / this.iterationDuration, 10), 0, 1);
    }
    /** @param {Number} progress  */
    set iterationProgress(progress) {
      const iterationDuration = this.iterationDuration;
      this.currentTime = iterationDuration * this._currentIteration + iterationDuration * progress;
    }
    get currentIteration() {
      return this._currentIteration;
    }
    /** @param {Number} iterationCount  */
    set currentIteration(iterationCount) {
      this.currentTime = this.iterationDuration * clamp(+iterationCount, 0, this.iterationCount - 1);
    }
    get reversed() {
      return !!this._reversed;
    }
    /** @param {Boolean} reverse  */
    set reversed(reverse) {
      reverse ? this.reverse() : this.play();
    }
    get speed() {
      return super.speed;
    }
    /** @param {Number} playbackRate  */
    set speed(playbackRate) {
      super.speed = playbackRate;
      this.resetTime();
    }
    /**
     * @param  {Number} internalRender
     * @return {this}
     */
    reset(internalRender = 0) {
      reviveTimer(this);
      if (this._reversed && !this._reverse) this.reversed = false;
      this._iterationTime = this.iterationDuration;
      tick(this, 0, 1, internalRender, tickModes.FORCE);
      resetTimerProperties(this);
      if (this._hasChildren) {
        forEachChildren(this, resetTimerProperties);
      }
      return this;
    }
    /**
     * @param  {Number} internalRender
     * @return {this}
     */
    init(internalRender = 0) {
      this.fps = this._fps;
      this.speed = this._speed;
      if (!internalRender && this._hasChildren) {
        tick(this, this.duration, 1, internalRender, tickModes.FORCE);
      }
      this.reset(internalRender);
      const autoplay = this._autoplay;
      if (autoplay === true) {
        this.resume();
      } else if (autoplay && !isUnd(
        /** @type {ScrollObserver} */
        autoplay.linked
      )) {
        autoplay.link(this);
      }
      return this;
    }
    /** @return {this} */
    resetTime() {
      const timeScale = 1 / (this._speed * engine._speed);
      this._startTime = now() - (this._currentTime + this._delay) * timeScale;
      return this;
    }
    /** @return {this} */
    pause() {
      if (this.paused) return this;
      this.paused = true;
      this.onPause(this);
      return this;
    }
    /** @return {this} */
    resume() {
      if (!this.paused) return this;
      this.paused = false;
      if (this.duration <= minValue && !this._hasChildren) {
        tick(this, minValue, 0, 0, tickModes.FORCE);
      } else {
        if (!this._running) {
          addChild(engine, this);
          engine._hasChildren = true;
          this._running = true;
        }
        this.resetTime();
        this._startTime -= 12;
        engine.wake();
      }
      return this;
    }
    /** @return {this} */
    restart() {
      return this.reset(0).resume();
    }
    /**
     * @param  {Number} time
     * @param  {Boolean|Number} [muteCallbacks]
     * @param  {Boolean|Number} [internalRender]
     * @return {this}
     */
    seek(time, muteCallbacks = 0, internalRender = 0) {
      reviveTimer(this);
      this.completed = false;
      const isPaused = this.paused;
      this.paused = true;
      tick(this, time + this._delay, ~~muteCallbacks, ~~internalRender, tickModes.AUTO);
      return isPaused ? this : this.resume();
    }
    /** @return {this} */
    alternate() {
      const reversed = this._reversed;
      const count = this.iterationCount;
      const duration = this.iterationDuration;
      const iterations = count === Infinity ? floor(maxValue / duration) : count;
      this._reversed = +(this._alternate && !(iterations % 2) ? reversed : !reversed);
      if (count === Infinity) {
        this.iterationProgress = this._reversed ? 1 - this.iterationProgress : this.iterationProgress;
      } else {
        this.seek(duration * iterations - this._currentTime);
      }
      this.resetTime();
      return this;
    }
    /** @return {this} */
    play() {
      if (this._reversed) this.alternate();
      return this.resume();
    }
    /** @return {this} */
    reverse() {
      if (!this._reversed) this.alternate();
      return this.resume();
    }
    // TODO: Move all the animation / tweens / children related code to Animation / Timeline
    /** @return {this} */
    cancel() {
      if (this._hasChildren) {
        forEachChildren(this, (child) => child.cancel(), true);
      } else {
        forEachChildren(this, removeTweenSliblings);
      }
      this._cancelled = 1;
      return this.pause();
    }
    /**
     * @param  {Number} newDuration
     * @return {this}
     */
    stretch(newDuration) {
      const currentDuration = this.duration;
      const normlizedDuration = normalizeTime(newDuration);
      if (currentDuration === normlizedDuration) return this;
      const timeScale = newDuration / currentDuration;
      const isSetter = newDuration <= minValue;
      this.duration = isSetter ? minValue : normlizedDuration;
      this.iterationDuration = isSetter ? minValue : normalizeTime(this.iterationDuration * timeScale);
      this._offset *= timeScale;
      this._delay *= timeScale;
      this._loopDelay *= timeScale;
      return this;
    }
    /**
      * Cancels the timer by seeking it back to 0 and reverting the attached scroller if necessary
      * @return {this}
      */
    revert() {
      tick(this, 0, 1, 0, tickModes.AUTO);
      const ap = (
        /** @type {ScrollObserver} */
        this._autoplay
      );
      if (ap && ap.linked && ap.linked === this) ap.revert();
      return this.cancel();
    }
    /**
      * Imediatly completes the timer, cancels it and triggers the onComplete callback
      * @return {this}
      */
    complete() {
      return this.seek(this.duration).cancel();
    }
    /**
     * @param  {Callback<this>} [callback]
     * @return {Promise}
     */
    then(callback = noop) {
      const then = this.then;
      const onResolve = () => {
        this.then = null;
        callback(this);
        this.then = then;
        this._resolve = noop;
      };
      return new Promise((r) => {
        this._resolve = () => r(onResolve());
        if (this.completed) this._resolve();
        return this;
      });
    }
  };
  var none = (t) => t;
  var calcBezier = (aT, aA1, aA2) => (((1 - 3 * aA2 + 3 * aA1) * aT + (3 * aA2 - 6 * aA1)) * aT + 3 * aA1) * aT;
  var binarySubdivide = (aX, mX1, mX2) => {
    let aA = 0, aB = 1, currentX, currentT, i = 0;
    do {
      currentT = aA + (aB - aA) / 2;
      currentX = calcBezier(currentT, mX1, mX2) - aX;
      if (currentX > 0) {
        aB = currentT;
      } else {
        aA = currentT;
      }
    } while (abs(currentX) > 1e-7 && ++i < 100);
    return currentT;
  };
  var cubicBezier = (mX1 = 0.5, mY1 = 0, mX2 = 0.5, mY2 = 1) => mX1 === mY1 && mX2 === mY2 ? none : (t) => t === 0 || t === 1 ? t : calcBezier(binarySubdivide(t, mX1, mX2), mY1, mY2);
  var steps = (steps2 = 10, fromStart) => {
    const roundMethod = fromStart ? ceil : floor;
    return (t) => roundMethod(clamp(t, 0, 1) * steps2) * (1 / steps2);
  };
  var linear = (...args) => {
    const argsLength = args.length;
    if (!argsLength) return none;
    const totalPoints = argsLength - 1;
    const firstArg = args[0];
    const lastArg = args[totalPoints];
    const xPoints = [0];
    const yPoints = [parseNumber(firstArg)];
    for (let i = 1; i < totalPoints; i++) {
      const arg = args[i];
      const splitValue = isStr(arg) ? (
        /** @type {String} */
        arg.trim().split(" ")
      ) : [arg];
      const value = splitValue[0];
      const percent = splitValue[1];
      xPoints.push(!isUnd(percent) ? parseNumber(percent) / 100 : i / totalPoints);
      yPoints.push(parseNumber(value));
    }
    yPoints.push(parseNumber(lastArg));
    xPoints.push(1);
    return function easeLinear(t) {
      for (let i = 1, l = xPoints.length; i < l; i++) {
        const currentX = xPoints[i];
        if (t <= currentX) {
          const prevX = xPoints[i - 1];
          const prevY = yPoints[i - 1];
          return prevY + (yPoints[i] - prevY) * (t - prevX) / (currentX - prevX);
        }
      }
      return yPoints[yPoints.length - 1];
    };
  };
  var irregular = (length = 10, randomness = 1) => {
    const values = [0];
    const total = length - 1;
    for (let i = 1; i < total; i++) {
      const previousValue = values[i - 1];
      const spacing = i / total;
      const segmentEnd = (i + 1) / total;
      const randomVariation = spacing + (segmentEnd - spacing) * Math.random();
      const randomValue = spacing * (1 - randomness) + randomVariation * randomness;
      values.push(clamp(randomValue, previousValue, 1));
    }
    values.push(1);
    return linear(...values);
  };
  var halfPI = PI / 2;
  var doublePI = PI * 2;
  var easeInPower = (p = 1.68) => (t) => pow(t, +p);
  var easeInFunctions = {
    [emptyString]: easeInPower,
    Quad: easeInPower(2),
    Cubic: easeInPower(3),
    Quart: easeInPower(4),
    Quint: easeInPower(5),
    /** @type {EasingFunction} */
    Sine: (t) => 1 - cos(t * halfPI),
    /** @type {EasingFunction} */
    Circ: (t) => 1 - sqrt(1 - t * t),
    /** @type {EasingFunction} */
    Expo: (t) => t ? pow(2, 10 * t - 10) : 0,
    /** @type {EasingFunction} */
    Bounce: (t) => {
      let pow2, b = 4;
      while (t < ((pow2 = pow(2, --b)) - 1) / 11) ;
      return 1 / pow(4, 3 - b) - 7.5625 * pow((pow2 * 3 - 2) / 22 - t, 2);
    },
    /** @type {BackEasing} */
    Back: (overshoot = 1.70158) => (t) => (+overshoot + 1) * t * t * t - +overshoot * t * t,
    /** @type {ElasticEasing} */
    Elastic: (amplitude = 1, period = 0.3) => {
      const a = clamp(+amplitude, 1, 10);
      const p = clamp(+period, minValue, 2);
      const s = p / doublePI * asin(1 / a);
      const e = doublePI / p;
      return (t) => t === 0 || t === 1 ? t : -a * pow(2, -10 * (1 - t)) * sin((1 - t - s) * e);
    }
  };
  var easeTypes = {
    in: (easeIn) => (t) => easeIn(t),
    out: (easeIn) => (t) => 1 - easeIn(1 - t),
    inOut: (easeIn) => (t) => t < 0.5 ? easeIn(t * 2) / 2 : 1 - easeIn(t * -2 + 2) / 2,
    outIn: (easeIn) => (t) => t < 0.5 ? (1 - easeIn(1 - t * 2)) / 2 : (easeIn(t * 2 - 1) + 1) / 2
  };
  var parseEaseString = (string, easesFunctions, easesLookups) => {
    if (easesLookups[string]) return easesLookups[string];
    if (string.indexOf("(") <= -1) {
      const hasParams = easeTypes[string] || string.includes("Back") || string.includes("Elastic");
      const parsedFn = (
        /** @type {EasingFunction} */
        hasParams ? (
          /** @type {EasesFactory} */
          easesFunctions[string]()
        ) : easesFunctions[string]
      );
      return parsedFn ? easesLookups[string] = parsedFn : none;
    } else {
      const split2 = string.slice(0, -1).split("(");
      const parsedFn = (
        /** @type {EasesFactory} */
        easesFunctions[split2[0]]
      );
      return parsedFn ? easesLookups[string] = parsedFn(...split2[1].split(",")) : none;
    }
  };
  var eases = /* @__PURE__ */ (() => {
    const list = { linear, irregular, steps, cubicBezier };
    for (let type in easeTypes) {
      for (let name in easeInFunctions) {
        const easeIn = easeInFunctions[name];
        const easeType = easeTypes[type];
        list[type + name] = /** @type {EasesFactory|EasingFunction} */
        name === emptyString || name === "Back" || name === "Elastic" ? (a, b) => easeType(
          /** @type {EasesFactory} */
          easeIn(a, b)
        ) : easeType(
          /** @type {EasingFunction} */
          easeIn
        );
      }
    }
    return (
      /** @type {EasesFunctions} */
      list
    );
  })();
  var JSEasesLookups = { linear: none };
  var parseEasings = (ease) => isFnc(ease) ? ease : isStr(ease) ? parseEaseString(
    /** @type {String} */
    ease,
    eases,
    JSEasesLookups
  ) : none;
  var propertyNamesCache = {};
  var sanitizePropertyName = (propertyName, target, tweenType) => {
    if (tweenType === tweenTypes.TRANSFORM) {
      const t = shortTransforms.get(propertyName);
      return t ? t : propertyName;
    } else if (tweenType === tweenTypes.CSS || // Handle special cases where properties like "strokeDashoffset" needs to be set as "stroke-dashoffset"
    // but properties like "baseFrequency" should stay in lowerCamelCase
    tweenType === tweenTypes.ATTRIBUTE && (isSvg(target) && propertyName in /** @type {DOMTarget} */
    target.style)) {
      const cachedPropertyName = propertyNamesCache[propertyName];
      if (cachedPropertyName) {
        return cachedPropertyName;
      } else {
        const lowerCaseName = propertyName ? toLowerCase(propertyName) : propertyName;
        propertyNamesCache[propertyName] = lowerCaseName;
        return lowerCaseName;
      }
    } else {
      return propertyName;
    }
  };
  var angleUnitsMap = { "deg": 1, "rad": 180 / PI, "turn": 360 };
  var convertedValuesCache = {};
  var convertValueUnit = (el, decomposedValue, unit, force = false) => {
    const currentUnit = decomposedValue.u;
    const currentNumber = decomposedValue.n;
    if (decomposedValue.t === valueTypes.UNIT && currentUnit === unit) {
      return decomposedValue;
    }
    const cachedKey = currentNumber + currentUnit + unit;
    const cached = convertedValuesCache[cachedKey];
    if (!isUnd(cached) && !force) {
      decomposedValue.n = cached;
    } else {
      let convertedValue;
      if (currentUnit in angleUnitsMap) {
        convertedValue = currentNumber * angleUnitsMap[currentUnit] / angleUnitsMap[unit];
      } else {
        const baseline = 100;
        const tempEl = (
          /** @type {DOMTarget} */
          el.cloneNode()
        );
        const parentNode = el.parentNode;
        const parentEl = parentNode && parentNode !== doc ? parentNode : doc.body;
        parentEl.appendChild(tempEl);
        const elStyle = tempEl.style;
        elStyle.width = baseline + currentUnit;
        const currentUnitWidth = (
          /** @type {HTMLElement} */
          tempEl.offsetWidth || baseline
        );
        elStyle.width = baseline + unit;
        const newUnitWidth = (
          /** @type {HTMLElement} */
          tempEl.offsetWidth || baseline
        );
        const factor = currentUnitWidth / newUnitWidth;
        parentEl.removeChild(tempEl);
        convertedValue = factor * currentNumber;
      }
      decomposedValue.n = convertedValue;
      convertedValuesCache[cachedKey] = convertedValue;
    }
    decomposedValue.t === valueTypes.UNIT;
    decomposedValue.u = unit;
    return decomposedValue;
  };
  var cleanInlineStyles = (renderable) => {
    if (renderable._hasChildren) {
      forEachChildren(renderable, cleanInlineStyles, true);
    } else {
      const animation = (
        /** @type {JSAnimation} */
        renderable
      );
      animation.pause();
      forEachChildren(animation, (tween) => {
        const tweenProperty = tween.property;
        const tweenTarget = tween.target;
        if (tweenTarget[isDomSymbol]) {
          const targetStyle = (
            /** @type {DOMTarget} */
            tweenTarget.style
          );
          const originalInlinedValue = animation._inlineStyles[tweenProperty];
          if (tween._tweenType === tweenTypes.TRANSFORM) {
            const cachedTransforms = tweenTarget[transformsSymbol];
            if (isUnd(originalInlinedValue) || originalInlinedValue === emptyString) {
              delete cachedTransforms[tweenProperty];
            } else {
              cachedTransforms[tweenProperty] = originalInlinedValue;
            }
            if (tween._renderTransforms) {
              if (!Object.keys(cachedTransforms).length) {
                targetStyle.removeProperty("transform");
              } else {
                let str = emptyString;
                for (let key2 in cachedTransforms) {
                  str += transformsFragmentStrings[key2] + cachedTransforms[key2] + ") ";
                }
                targetStyle.transform = str;
              }
            }
          } else {
            if (isUnd(originalInlinedValue) || originalInlinedValue === emptyString) {
              targetStyle.removeProperty(tweenProperty);
            } else {
              targetStyle[tweenProperty] = originalInlinedValue;
            }
          }
          if (animation._tail === tween) {
            animation.targets.forEach((t) => {
              if (t.getAttribute && t.getAttribute("style") === emptyString) {
                t.removeAttribute("style");
              }
            });
          }
        }
      });
    }
    return renderable;
  };
  var fromTargetObject = createDecomposedValueTargetObject();
  var toTargetObject = createDecomposedValueTargetObject();
  var toFunctionStore = { func: null };
  var keyframesTargetArray = [null];
  var fastSetValuesArray = [null, null];
  var keyObjectTarget = { to: null };
  var tweenId = 0;
  var keyframes;
  var key;
  var generateKeyframes = (keyframes2, parameters) => {
    const properties = {};
    if (isArr(keyframes2)) {
      const propertyNames = [].concat(.../** @type {DurationKeyframes} */
      keyframes2.map((key2) => Object.keys(key2))).filter(isKey);
      for (let i = 0, l = propertyNames.length; i < l; i++) {
        const propName = propertyNames[i];
        const propArray = (
          /** @type {DurationKeyframes} */
          keyframes2.map((key2) => {
            const newKey = {};
            for (let p in key2) {
              const keyValue = (
                /** @type {TweenPropValue} */
                key2[p]
              );
              if (isKey(p)) {
                if (p === propName) {
                  newKey.to = keyValue;
                }
              } else {
                newKey[p] = keyValue;
              }
            }
            return newKey;
          })
        );
        properties[propName] = /** @type {ArraySyntaxValue} */
        propArray;
      }
    } else {
      const totalDuration = (
        /** @type {Number} */
        setValue(parameters.duration, globals.defaults.duration)
      );
      const keys = Object.keys(keyframes2).map((key2) => {
        return { o: parseFloat(key2) / 100, p: keyframes2[key2] };
      }).sort((a, b) => a.o - b.o);
      keys.forEach((key2) => {
        const offset = key2.o;
        const prop = key2.p;
        for (let name in prop) {
          if (isKey(name)) {
            let propArray = (
              /** @type {Array} */
              properties[name]
            );
            if (!propArray) propArray = properties[name] = [];
            const duration = offset * totalDuration;
            let length = propArray.length;
            let prevKey = propArray[length - 1];
            const keyObj = { to: prop[name] };
            let durProgress = 0;
            for (let i = 0; i < length; i++) {
              durProgress += propArray[i].duration;
            }
            if (length === 1) {
              keyObj.from = prevKey.to;
            }
            if (prop.ease) {
              keyObj.ease = prop.ease;
            }
            keyObj.duration = duration - (length ? durProgress : 0);
            propArray.push(keyObj);
          }
        }
        return key2;
      });
      for (let name in properties) {
        const propArray = (
          /** @type {Array} */
          properties[name]
        );
        let prevEase;
        for (let i = 0, l = propArray.length; i < l; i++) {
          const prop = propArray[i];
          const currentEase = prop.ease;
          prop.ease = prevEase ? prevEase : void 0;
          prevEase = currentEase;
        }
        if (!propArray[0].duration) {
          propArray.shift();
        }
      }
    }
    return properties;
  };
  var JSAnimation = class extends Timer {
    /**
     * @param {TargetsParam} targets
     * @param {AnimationParams} parameters
     * @param {Timeline} [parent]
     * @param {Number} [parentPosition]
     * @param {Boolean} [fastSet=false]
     * @param {Number} [index=0]
     * @param {Number} [length=0]
     */
    constructor(targets, parameters, parent, parentPosition, fastSet = false, index = 0, length = 0) {
      super(
        /** @type {TimerParams&AnimationParams} */
        parameters,
        parent,
        parentPosition
      );
      const parsedTargets = registerTargets(targets);
      const targetsLength = parsedTargets.length;
      const kfParams = (
        /** @type {AnimationParams} */
        parameters.keyframes
      );
      const params = (
        /** @type {AnimationParams} */
        kfParams ? mergeObjects(generateKeyframes(
          /** @type {DurationKeyframes} */
          kfParams,
          parameters
        ), parameters) : parameters
      );
      const {
        delay,
        duration,
        ease,
        playbackEase,
        modifier,
        composition,
        onRender
      } = params;
      const animDefaults = parent ? parent.defaults : globals.defaults;
      const animaPlaybackEase = setValue(playbackEase, animDefaults.playbackEase);
      const animEase = animaPlaybackEase ? parseEasings(animaPlaybackEase) : null;
      const hasSpring = !isUnd(ease) && !isUnd(
        /** @type {Spring} */
        ease.ease
      );
      const tEasing = hasSpring ? (
        /** @type {Spring} */
        ease.ease
      ) : setValue(ease, animEase ? "linear" : animDefaults.ease);
      const tDuration = hasSpring ? (
        /** @type {Spring} */
        ease.duration
      ) : setValue(duration, animDefaults.duration);
      const tDelay = setValue(delay, animDefaults.delay);
      const tModifier = modifier || animDefaults.modifier;
      const tComposition = isUnd(composition) && targetsLength >= K ? compositionTypes.none : !isUnd(composition) ? composition : animDefaults.composition;
      const animInlineStyles = {};
      const absoluteOffsetTime = this._offset + (parent ? parent._offset : 0);
      let iterationDuration = NaN;
      let iterationDelay = NaN;
      let animationAnimationLength = 0;
      let shouldTriggerRender = 0;
      for (let targetIndex = 0; targetIndex < targetsLength; targetIndex++) {
        const target = parsedTargets[targetIndex];
        const ti = index || targetIndex;
        const tl = length || targetsLength;
        let lastTransformGroupIndex = NaN;
        let lastTransformGroupLength = NaN;
        for (let p in params) {
          if (isKey(p)) {
            const tweenType = getTweenType(target, p);
            const propName = sanitizePropertyName(p, target, tweenType);
            let propValue = params[p];
            const isPropValueArray = isArr(propValue);
            if (fastSet && !isPropValueArray) {
              fastSetValuesArray[0] = propValue;
              fastSetValuesArray[1] = propValue;
              propValue = fastSetValuesArray;
            }
            if (isPropValueArray) {
              const arrayLength = (
                /** @type {Array} */
                propValue.length
              );
              const isNotObjectValue = !isObj(propValue[0]);
              if (arrayLength === 2 && isNotObjectValue) {
                keyObjectTarget.to = /** @type {TweenParamValue} */
                /** @type {unknown} */
                propValue;
                keyframesTargetArray[0] = keyObjectTarget;
                keyframes = keyframesTargetArray;
              } else if (arrayLength > 2 && isNotObjectValue) {
                keyframes = [];
                propValue.forEach((v, i) => {
                  if (!i) {
                    fastSetValuesArray[0] = v;
                  } else if (i === 1) {
                    fastSetValuesArray[1] = v;
                    keyframes.push(fastSetValuesArray);
                  } else {
                    keyframes.push(v);
                  }
                });
              } else {
                keyframes = /** @type {Array.<TweenKeyValue>} */
                propValue;
              }
            } else {
              keyframesTargetArray[0] = propValue;
              keyframes = keyframesTargetArray;
            }
            let siblings = null;
            let prevTween = null;
            let firstTweenChangeStartTime = NaN;
            let lastTweenChangeEndTime = 0;
            let tweenIndex = 0;
            for (let l = keyframes.length; tweenIndex < l; tweenIndex++) {
              const keyframe = keyframes[tweenIndex];
              if (isObj(keyframe)) {
                key = keyframe;
              } else {
                keyObjectTarget.to = /** @type {TweenParamValue} */
                keyframe;
                key = keyObjectTarget;
              }
              toFunctionStore.func = null;
              const computedToValue = getFunctionValue(key.to, target, ti, tl, toFunctionStore);
              let tweenToValue;
              if (isObj(computedToValue) && !isUnd(computedToValue.to)) {
                key = computedToValue;
                tweenToValue = computedToValue.to;
              } else {
                tweenToValue = computedToValue;
              }
              const tweenFromValue = getFunctionValue(key.from, target, ti, tl);
              const keyEasing = key.ease;
              const hasSpring2 = !isUnd(keyEasing) && !isUnd(
                /** @type {Spring} */
                keyEasing.ease
              );
              const tweenEasing = hasSpring2 ? (
                /** @type {Spring} */
                keyEasing.ease
              ) : keyEasing || tEasing;
              const tweenDuration = hasSpring2 ? (
                /** @type {Spring} */
                keyEasing.duration
              ) : getFunctionValue(setValue(key.duration, l > 1 ? getFunctionValue(tDuration, target, ti, tl) / l : tDuration), target, ti, tl);
              const tweenDelay = getFunctionValue(setValue(key.delay, !tweenIndex ? tDelay : 0), target, ti, tl);
              const computedComposition = getFunctionValue(setValue(key.composition, tComposition), target, ti, tl);
              const tweenComposition = isNum(computedComposition) ? computedComposition : compositionTypes[computedComposition];
              const tweenModifier = key.modifier || tModifier;
              const hasFromvalue = !isUnd(tweenFromValue);
              const hasToValue = !isUnd(tweenToValue);
              const isFromToArray = isArr(tweenToValue);
              const isFromToValue = isFromToArray || hasFromvalue && hasToValue;
              const tweenStartTime = prevTween ? lastTweenChangeEndTime + tweenDelay : tweenDelay;
              const absoluteStartTime = round(absoluteOffsetTime + tweenStartTime, 12);
              if (!shouldTriggerRender && (hasFromvalue || isFromToArray)) shouldTriggerRender = 1;
              let prevSibling = prevTween;
              if (tweenComposition !== compositionTypes.none) {
                if (!siblings) siblings = getTweenSiblings(target, propName);
                let nextSibling = siblings._head;
                while (nextSibling && !nextSibling._isOverridden && nextSibling._absoluteStartTime <= absoluteStartTime) {
                  prevSibling = nextSibling;
                  nextSibling = nextSibling._nextRep;
                  if (nextSibling && nextSibling._absoluteStartTime >= absoluteStartTime) {
                    while (nextSibling) {
                      overrideTween(nextSibling);
                      nextSibling = nextSibling._nextRep;
                    }
                  }
                }
              }
              if (isFromToValue) {
                decomposeRawValue(isFromToArray ? getFunctionValue(tweenToValue[0], target, ti, tl) : tweenFromValue, fromTargetObject);
                decomposeRawValue(isFromToArray ? getFunctionValue(tweenToValue[1], target, ti, tl, toFunctionStore) : tweenToValue, toTargetObject);
                if (fromTargetObject.t === valueTypes.NUMBER) {
                  if (prevSibling) {
                    if (prevSibling._valueType === valueTypes.UNIT) {
                      fromTargetObject.t = valueTypes.UNIT;
                      fromTargetObject.u = prevSibling._unit;
                    }
                  } else {
                    decomposeRawValue(
                      getOriginalAnimatableValue(target, propName, tweenType, animInlineStyles),
                      decomposedOriginalValue
                    );
                    if (decomposedOriginalValue.t === valueTypes.UNIT) {
                      fromTargetObject.t = valueTypes.UNIT;
                      fromTargetObject.u = decomposedOriginalValue.u;
                    }
                  }
                }
              } else {
                if (hasToValue) {
                  decomposeRawValue(tweenToValue, toTargetObject);
                } else {
                  if (prevTween) {
                    decomposeTweenValue(prevTween, toTargetObject);
                  } else {
                    decomposeRawValue(parent && prevSibling && prevSibling.parent.parent === parent ? prevSibling._value : getOriginalAnimatableValue(target, propName, tweenType, animInlineStyles), toTargetObject);
                  }
                }
                if (hasFromvalue) {
                  decomposeRawValue(tweenFromValue, fromTargetObject);
                } else {
                  if (prevTween) {
                    decomposeTweenValue(prevTween, fromTargetObject);
                  } else {
                    decomposeRawValue(parent && prevSibling && prevSibling.parent.parent === parent ? prevSibling._value : (
                      // No need to get and parse the original value if the tween is part of a timeline and has a previous sibling part of the same timeline
                      getOriginalAnimatableValue(target, propName, tweenType, animInlineStyles)
                    ), fromTargetObject);
                  }
                }
              }
              if (fromTargetObject.o) {
                fromTargetObject.n = getRelativeValue(
                  !prevSibling ? decomposeRawValue(
                    getOriginalAnimatableValue(target, propName, tweenType, animInlineStyles),
                    decomposedOriginalValue
                  ).n : prevSibling._toNumber,
                  fromTargetObject.n,
                  fromTargetObject.o
                );
              }
              if (toTargetObject.o) {
                toTargetObject.n = getRelativeValue(fromTargetObject.n, toTargetObject.n, toTargetObject.o);
              }
              if (fromTargetObject.t !== toTargetObject.t) {
                if (fromTargetObject.t === valueTypes.COMPLEX || toTargetObject.t === valueTypes.COMPLEX) {
                  const complexValue = fromTargetObject.t === valueTypes.COMPLEX ? fromTargetObject : toTargetObject;
                  const notComplexValue = fromTargetObject.t === valueTypes.COMPLEX ? toTargetObject : fromTargetObject;
                  notComplexValue.t = valueTypes.COMPLEX;
                  notComplexValue.s = cloneArray(complexValue.s);
                  notComplexValue.d = complexValue.d.map(() => notComplexValue.n);
                } else if (fromTargetObject.t === valueTypes.UNIT || toTargetObject.t === valueTypes.UNIT) {
                  const unitValue = fromTargetObject.t === valueTypes.UNIT ? fromTargetObject : toTargetObject;
                  const notUnitValue = fromTargetObject.t === valueTypes.UNIT ? toTargetObject : fromTargetObject;
                  notUnitValue.t = valueTypes.UNIT;
                  notUnitValue.u = unitValue.u;
                } else if (fromTargetObject.t === valueTypes.COLOR || toTargetObject.t === valueTypes.COLOR) {
                  const colorValue = fromTargetObject.t === valueTypes.COLOR ? fromTargetObject : toTargetObject;
                  const notColorValue = fromTargetObject.t === valueTypes.COLOR ? toTargetObject : fromTargetObject;
                  notColorValue.t = valueTypes.COLOR;
                  notColorValue.s = colorValue.s;
                  notColorValue.d = [0, 0, 0, 1];
                }
              }
              if (fromTargetObject.u !== toTargetObject.u) {
                let valueToConvert = toTargetObject.u ? fromTargetObject : toTargetObject;
                valueToConvert = convertValueUnit(
                  /** @type {DOMTarget} */
                  target,
                  valueToConvert,
                  toTargetObject.u ? toTargetObject.u : fromTargetObject.u,
                  false
                );
              }
              if (toTargetObject.d && fromTargetObject.d && toTargetObject.d.length !== fromTargetObject.d.length) {
                const longestValue = fromTargetObject.d.length > toTargetObject.d.length ? fromTargetObject : toTargetObject;
                const shortestValue = longestValue === fromTargetObject ? toTargetObject : fromTargetObject;
                shortestValue.d = longestValue.d.map((_, i) => isUnd(shortestValue.d[i]) ? 0 : shortestValue.d[i]);
                shortestValue.s = cloneArray(longestValue.s);
              }
              const tweenUpdateDuration = round(+tweenDuration || minValue, 12);
              const tween = {
                parent: this,
                id: tweenId++,
                property: propName,
                target,
                _value: null,
                _func: toFunctionStore.func,
                _ease: parseEasings(tweenEasing),
                _fromNumbers: cloneArray(fromTargetObject.d),
                _toNumbers: cloneArray(toTargetObject.d),
                _strings: cloneArray(toTargetObject.s),
                _fromNumber: fromTargetObject.n,
                _toNumber: toTargetObject.n,
                _numbers: cloneArray(fromTargetObject.d),
                // For additive tween and animatables
                _number: fromTargetObject.n,
                // For additive tween and animatables
                _unit: toTargetObject.u,
                _modifier: tweenModifier,
                _currentTime: 0,
                _startTime: tweenStartTime,
                _delay: +tweenDelay,
                _updateDuration: tweenUpdateDuration,
                _changeDuration: tweenUpdateDuration,
                _absoluteStartTime: absoluteStartTime,
                // NOTE: Investigate bit packing to stores ENUM / BOOL
                _tweenType: tweenType,
                _valueType: toTargetObject.t,
                _composition: tweenComposition,
                _isOverlapped: 0,
                _isOverridden: 0,
                _renderTransforms: 0,
                _prevRep: null,
                // For replaced tween
                _nextRep: null,
                // For replaced tween
                _prevAdd: null,
                // For additive tween
                _nextAdd: null,
                // For additive tween
                _prev: null,
                _next: null
              };
              if (tweenComposition !== compositionTypes.none) {
                composeTween(tween, siblings);
              }
              if (isNaN(firstTweenChangeStartTime)) {
                firstTweenChangeStartTime = tween._startTime;
              }
              lastTweenChangeEndTime = round(tweenStartTime + tweenUpdateDuration, 12);
              prevTween = tween;
              animationAnimationLength++;
              addChild(this, tween);
            }
            if (isNaN(iterationDelay) || firstTweenChangeStartTime < iterationDelay) {
              iterationDelay = firstTweenChangeStartTime;
            }
            if (isNaN(iterationDuration) || lastTweenChangeEndTime > iterationDuration) {
              iterationDuration = lastTweenChangeEndTime;
            }
            if (tweenType === tweenTypes.TRANSFORM) {
              lastTransformGroupIndex = animationAnimationLength - tweenIndex;
              lastTransformGroupLength = animationAnimationLength;
            }
          }
        }
        if (!isNaN(lastTransformGroupIndex)) {
          let i = 0;
          forEachChildren(this, (tween) => {
            if (i >= lastTransformGroupIndex && i < lastTransformGroupLength) {
              tween._renderTransforms = 1;
              if (tween._composition === compositionTypes.blend) {
                forEachChildren(additive.animation, (additiveTween) => {
                  if (additiveTween.id === tween.id) {
                    additiveTween._renderTransforms = 1;
                  }
                });
              }
            }
            i++;
          });
        }
      }
      if (!targetsLength) {
        console.warn(`No target found. Make sure the element you're trying to animate is accessible before creating your animation.`);
      }
      if (iterationDelay) {
        forEachChildren(this, (tween) => {
          if (!(tween._startTime - tween._delay)) {
            tween._delay -= iterationDelay;
          }
          tween._startTime -= iterationDelay;
        });
        iterationDuration -= iterationDelay;
      } else {
        iterationDelay = 0;
      }
      if (!iterationDuration) {
        iterationDuration = minValue;
        this.iterationCount = 0;
      }
      this.targets = parsedTargets;
      this.duration = iterationDuration === minValue ? minValue : clampInfinity((iterationDuration + this._loopDelay) * this.iterationCount - this._loopDelay) || minValue;
      this.onRender = onRender || animDefaults.onRender;
      this._ease = animEase;
      this._delay = iterationDelay;
      this.iterationDuration = iterationDuration;
      this._inlineStyles = animInlineStyles;
      if (!this._autoplay && shouldTriggerRender) this.onRender(this);
    }
    /**
     * @param  {Number} newDuration
     * @return {this}
     */
    stretch(newDuration) {
      const currentDuration = this.duration;
      if (currentDuration === normalizeTime(newDuration)) return this;
      const timeScale = newDuration / currentDuration;
      forEachChildren(this, (tween) => {
        tween._updateDuration = normalizeTime(tween._updateDuration * timeScale);
        tween._changeDuration = normalizeTime(tween._changeDuration * timeScale);
        tween._currentTime *= timeScale;
        tween._startTime *= timeScale;
        tween._absoluteStartTime *= timeScale;
      });
      return super.stretch(newDuration);
    }
    /**
     * @return {this}
     */
    refresh() {
      forEachChildren(this, (tween) => {
        const tweenFunc = tween._func;
        if (tweenFunc) {
          const ogValue = getOriginalAnimatableValue(tween.target, tween.property, tween._tweenType);
          decomposeRawValue(ogValue, decomposedOriginalValue);
          decomposeRawValue(tweenFunc(), toTargetObject);
          tween._fromNumbers = cloneArray(decomposedOriginalValue.d);
          tween._fromNumber = decomposedOriginalValue.n;
          tween._toNumbers = cloneArray(toTargetObject.d);
          tween._strings = cloneArray(toTargetObject.s);
          tween._toNumber = toTargetObject.o ? getRelativeValue(decomposedOriginalValue.n, toTargetObject.n, toTargetObject.o) : toTargetObject.n;
        }
      });
      return this;
    }
    /**
     * Cancel the animation and revert all the values affected by this animation to their original state
     * @return {this}
     */
    revert() {
      super.revert();
      return cleanInlineStyles(this);
    }
    /**
     * @param  {Callback<this>} [callback]
     * @return {Promise}
     */
    then(callback) {
      return super.then(callback);
    }
  };
  var animate = (targets, parameters) => new JSAnimation(targets, parameters, null, 0, false).init();
  var transformsShorthands = ["x", "y", "z"];
  var commonDefaultPXProperties = [
    "perspective",
    "width",
    "height",
    "margin",
    "padding",
    "top",
    "right",
    "bottom",
    "left",
    "borderWidth",
    "fontSize",
    "borderRadius",
    ...transformsShorthands
  ];
  var WAAPIAnimationsLookups = {
    _head: null,
    _tail: null
  };
  var removeWAAPIAnimation = ($el, property, parent) => {
    let nextLookup = WAAPIAnimationsLookups._head;
    while (nextLookup) {
      const next = nextLookup._next;
      const matchTarget = nextLookup.$el === $el;
      const matchProperty = !property || nextLookup.property === property;
      const matchParent = !parent || nextLookup.parent === parent;
      if (matchTarget && matchProperty && matchParent) {
        const anim = nextLookup.animation;
        try {
          anim.commitStyles();
        } catch {
        }
        anim.cancel();
        removeChild(WAAPIAnimationsLookups, nextLookup);
        const lookupParent = nextLookup.parent;
        if (lookupParent) {
          lookupParent._completed++;
          if (lookupParent.animations.length === lookupParent._completed) {
            lookupParent.completed = true;
            if (!lookupParent.muteCallbacks) {
              lookupParent.paused = true;
              lookupParent.onComplete(lookupParent);
              lookupParent._resolve(lookupParent);
            }
          }
        }
      }
      nextLookup = next;
    }
  };
  var sync = (callback = noop) => {
    return new Timer({ duration: 1 * globals.timeScale, onComplete: callback }, null, 0).resume();
  };
  function getTargetValue(targetSelector, propName, unit) {
    const targets = registerTargets(targetSelector);
    if (!targets.length) return;
    const [target] = targets;
    const tweenType = getTweenType(target, propName);
    const normalizePropName = sanitizePropertyName(propName, target, tweenType);
    let originalValue = getOriginalAnimatableValue(target, normalizePropName);
    if (isUnd(unit)) {
      return originalValue;
    } else {
      decomposeRawValue(originalValue, decomposedOriginalValue);
      if (decomposedOriginalValue.t === valueTypes.NUMBER || decomposedOriginalValue.t === valueTypes.UNIT) {
        if (unit === false) {
          return decomposedOriginalValue.n;
        } else {
          const convertedValue = convertValueUnit(
            /** @type {DOMTarget} */
            target,
            decomposedOriginalValue,
            /** @type {String} */
            unit,
            false
          );
          return `${round(convertedValue.n, globals.precision)}${convertedValue.u}`;
        }
      }
    }
  }
  var setTargetValues = (targets, parameters) => {
    if (isUnd(parameters)) return;
    parameters.duration = minValue;
    parameters.composition = setValue(parameters.composition, compositionTypes.none);
    return new JSAnimation(targets, parameters, null, 0, true).resume();
  };
  var removeTargetsFromAnimation = (targetsArray, animation, propertyName) => {
    let tweensMatchesTargets = false;
    forEachChildren(animation, (tween) => {
      const tweenTarget = tween.target;
      if (targetsArray.includes(tweenTarget)) {
        const tweenName = tween.property;
        const tweenType = tween._tweenType;
        const normalizePropName = sanitizePropertyName(propertyName, tweenTarget, tweenType);
        if (!normalizePropName || normalizePropName && normalizePropName === tweenName) {
          if (tween.parent._tail === tween && tween._tweenType === tweenTypes.TRANSFORM && tween._prev && tween._prev._tweenType === tweenTypes.TRANSFORM) {
            tween._prev._renderTransforms = 1;
          }
          removeChild(animation, tween);
          removeTweenSliblings(tween);
          tweensMatchesTargets = true;
        }
      }
    }, true);
    return tweensMatchesTargets;
  };
  var remove = (targets, renderable, propertyName) => {
    const targetsArray = parseTargets(targets);
    const parent = (
      /** @type {Renderable|typeof engine} **/
      renderable ? renderable : engine
    );
    const waapiAnimation = renderable && /** @type {WAAPIAnimation} */
    renderable.controlAnimation && /** @type {WAAPIAnimation} */
    renderable;
    for (let i = 0, l = targetsArray.length; i < l; i++) {
      const $el = (
        /** @type {DOMTarget}  */
        targetsArray[i]
      );
      removeWAAPIAnimation($el, propertyName, waapiAnimation);
    }
    let removeMatches;
    if (parent._hasChildren) {
      let iterationDuration = 0;
      forEachChildren(parent, (child) => {
        if (!child._hasChildren) {
          removeMatches = removeTargetsFromAnimation(
            targetsArray,
            /** @type {JSAnimation} */
            child,
            propertyName
          );
          if (removeMatches && !child._head) {
            child.cancel();
            removeChild(parent, child);
          } else {
            const childTLOffset = child._offset + child._delay;
            const childDur = childTLOffset + child.duration;
            if (childDur > iterationDuration) {
              iterationDuration = childDur;
            }
          }
        }
        if (child._head) {
          remove(targets, child, propertyName);
        } else {
          child._hasChildren = false;
        }
      }, true);
      if (!isUnd(
        /** @type {Renderable} */
        parent.iterationDuration
      )) {
        parent.iterationDuration = iterationDuration;
      }
    } else {
      removeMatches = removeTargetsFromAnimation(
        targetsArray,
        /** @type {JSAnimation} */
        parent,
        propertyName
      );
    }
    if (removeMatches && !parent._head) {
      parent._hasChildren = false;
      if (
        /** @type {Renderable} */
        parent.cancel
      ) parent.cancel();
    }
    return targetsArray;
  };
  var keepTime = createRefreshable;
  var randomPick = (items) => items[random(0, items.length - 1)];
  var roundPad = (v, decimalLength) => (+v).toFixed(decimalLength);
  var padStart = (v, totalLength, padString) => `${v}`.padStart(totalLength, padString);
  var padEnd = (v, totalLength, padString) => `${v}`.padEnd(totalLength, padString);
  var wrap = (v, min, max2) => ((v - min) % (max2 - min) + (max2 - min)) % (max2 - min) + min;
  var mapRange = (value, inLow, inHigh, outLow, outHigh) => outLow + (value - inLow) / (inHigh - inLow) * (outHigh - outLow);
  var degToRad = (degrees) => degrees * PI / 180;
  var radToDeg = (radians) => radians * 180 / PI;
  var lerp = (start, end, amount, renderable) => {
    let dt = K / globals.defaults.frameRate;
    if (renderable !== false) {
      const ticker = (
        /** @type Renderable */
        renderable || engine._hasChildren && engine
      );
      if (ticker && ticker.deltaTime) {
        dt = ticker.deltaTime;
      }
    }
    const t = 1 - Math.exp(-amount * dt * 0.1);
    return !amount ? start : amount === 1 ? end : (1 - t) * start + t * end;
  };
  var curry = (fn, last = 0) => (...args) => last ? (v) => fn(...args, v) : (v) => fn(v, ...args);
  var chain = (fn) => {
    return (...args) => {
      const result = fn(...args);
      return new Proxy(noop, {
        apply: (_, __, [v]) => result(v),
        get: (_, prop) => chain(
          /**@param {...Number|String} nextArgs */
          (...nextArgs) => {
            const nextResult = utils[prop](...nextArgs);
            return (v) => nextResult(result(v));
          }
        )
      });
    };
  };
  var makeChainable = (fn, right = 0) => (...args) => (args.length < fn.length ? chain(curry(fn, right)) : fn)(...args);
  var utils = {
    $: registerTargets,
    get: getTargetValue,
    set: setTargetValues,
    remove,
    cleanInlineStyles,
    random,
    randomPick,
    shuffle,
    lerp,
    sync,
    keepTime,
    clamp: (
      /** @type {typeof clamp & ChainedClamp} */
      makeChainable(clamp)
    ),
    round: (
      /** @type {typeof round & ChainedRound} */
      makeChainable(round)
    ),
    snap: (
      /** @type {typeof snap & ChainedSnap} */
      makeChainable(snap)
    ),
    wrap: (
      /** @type {typeof wrap & ChainedWrap} */
      makeChainable(wrap)
    ),
    interpolate: (
      /** @type {typeof interpolate & ChainedInterpolate} */
      makeChainable(interpolate, 1)
    ),
    mapRange: (
      /** @type {typeof mapRange & ChainedMapRange} */
      makeChainable(mapRange)
    ),
    roundPad: (
      /** @type {typeof roundPad & ChainedRoundPad} */
      makeChainable(roundPad)
    ),
    padStart: (
      /** @type {typeof padStart & ChainedPadStart} */
      makeChainable(padStart)
    ),
    padEnd: (
      /** @type {typeof padEnd & ChainedPadEnd} */
      makeChainable(padEnd)
    ),
    degToRad: (
      /** @type {typeof degToRad & ChainedDegToRad} */
      makeChainable(degToRad)
    ),
    radToDeg: (
      /** @type {typeof radToDeg & ChainedRadToDeg} */
      makeChainable(radToDeg)
    )
  };
  var getPrevChildOffset = (timeline, timePosition) => {
    if (stringStartsWith(timePosition, "<")) {
      const goToPrevAnimationOffset = timePosition[1] === "<";
      const prevAnimation = (
        /** @type {Tickable} */
        timeline._tail
      );
      const prevOffset = prevAnimation ? prevAnimation._offset + prevAnimation._delay : 0;
      return goToPrevAnimationOffset ? prevOffset : prevOffset + prevAnimation.duration;
    }
  };
  var parseTimelinePosition = (timeline, timePosition) => {
    let tlDuration = timeline.iterationDuration;
    if (tlDuration === minValue) tlDuration = 0;
    if (isUnd(timePosition)) return tlDuration;
    if (isNum(+timePosition)) return +timePosition;
    const timePosStr = (
      /** @type {String} */
      timePosition
    );
    const tlLabels = timeline ? timeline.labels : null;
    const hasLabels = !isNil(tlLabels);
    const prevOffset = getPrevChildOffset(timeline, timePosStr);
    const hasSibling = !isUnd(prevOffset);
    const matchedRelativeOperator = relativeValuesExecRgx.exec(timePosStr);
    if (matchedRelativeOperator) {
      const fullOperator = matchedRelativeOperator[0];
      const split2 = timePosStr.split(fullOperator);
      const labelOffset = hasLabels && split2[0] ? tlLabels[split2[0]] : tlDuration;
      const parsedOffset = hasSibling ? prevOffset : hasLabels ? labelOffset : tlDuration;
      const parsedNumericalOffset = +split2[1];
      return getRelativeValue(parsedOffset, parsedNumericalOffset, fullOperator[0]);
    } else {
      return hasSibling ? prevOffset : hasLabels ? !isUnd(tlLabels[timePosStr]) ? tlLabels[timePosStr] : tlDuration : tlDuration;
    }
  };
  var maxSpringParamValue = K * 10;
  var getMaxViewHeight = () => {
    const $el = doc.createElement("div");
    doc.body.appendChild($el);
    $el.style.height = "100lvh";
    const height = $el.offsetHeight;
    doc.body.removeChild($el);
    return height;
  };
  var parseScrollObserverFunctionParameter = (value, scroller) => value && isFnc(value) ? (
    /** @type {Function} */
    value(scroller)
  ) : value;
  var scrollContainers = /* @__PURE__ */ new Map();
  var ScrollContainer = class {
    /**
     * @param {HTMLElement} $el
     */
    constructor($el) {
      this.element = $el;
      this.useWin = this.element === doc.body;
      this.winWidth = 0;
      this.winHeight = 0;
      this.width = 0;
      this.height = 0;
      this.left = 0;
      this.top = 0;
      this.zIndex = 0;
      this.scrollX = 0;
      this.scrollY = 0;
      this.prevScrollX = 0;
      this.prevScrollY = 0;
      this.scrollWidth = 0;
      this.scrollHeight = 0;
      this.velocity = 0;
      this.backwardX = false;
      this.backwardY = false;
      this.scrollTicker = new Timer({
        autoplay: false,
        onBegin: () => this.dataTimer.resume(),
        onUpdate: () => {
          const backwards = this.backwardX || this.backwardY;
          forEachChildren(this, (child) => child.handleScroll(), backwards);
        },
        onComplete: () => this.dataTimer.pause()
      }).init();
      this.dataTimer = new Timer({
        autoplay: false,
        frameRate: 30,
        onUpdate: (self) => {
          const dt = self.deltaTime;
          const px = this.prevScrollX;
          const py = this.prevScrollY;
          const nx = this.scrollX;
          const ny = this.scrollY;
          const dx = px - nx;
          const dy = py - ny;
          this.prevScrollX = nx;
          this.prevScrollY = ny;
          if (dx) this.backwardX = px > nx;
          if (dy) this.backwardY = py > ny;
          this.velocity = round(dt > 0 ? Math.sqrt(dx * dx + dy * dy) / dt : 0, 5);
        }
      }).init();
      this.resizeTicker = new Timer({
        autoplay: false,
        duration: 250 * globals.timeScale,
        onComplete: () => {
          this.updateWindowBounds();
          this.refreshScrollObservers();
          this.handleScroll();
        }
      }).init();
      this.wakeTicker = new Timer({
        autoplay: false,
        duration: 500 * globals.timeScale,
        onBegin: () => {
          this.scrollTicker.resume();
        },
        onComplete: () => {
          this.scrollTicker.pause();
        }
      }).init();
      this._head = null;
      this._tail = null;
      this.updateScrollCoords();
      this.updateWindowBounds();
      this.updateBounds();
      this.refreshScrollObservers();
      this.handleScroll();
      this.resizeObserver = new ResizeObserver(() => this.resizeTicker.restart());
      this.resizeObserver.observe(this.element);
      (this.useWin ? win : this.element).addEventListener("scroll", this, false);
    }
    updateScrollCoords() {
      const useWin = this.useWin;
      const $el = this.element;
      this.scrollX = round(useWin ? win.scrollX : $el.scrollLeft, 0);
      this.scrollY = round(useWin ? win.scrollY : $el.scrollTop, 0);
    }
    updateWindowBounds() {
      this.winWidth = win.innerWidth;
      this.winHeight = getMaxViewHeight();
    }
    updateBounds() {
      const style = getComputedStyle(this.element);
      const $el = this.element;
      this.scrollWidth = $el.scrollWidth + parseFloat(style.marginLeft) + parseFloat(style.marginRight);
      this.scrollHeight = $el.scrollHeight + parseFloat(style.marginTop) + parseFloat(style.marginBottom);
      this.updateWindowBounds();
      let width, height;
      if (this.useWin) {
        width = this.winWidth;
        height = this.winHeight;
      } else {
        const elRect = $el.getBoundingClientRect();
        width = $el.clientWidth;
        height = $el.clientHeight;
        this.top = elRect.top;
        this.left = elRect.left;
      }
      this.width = width;
      this.height = height;
    }
    refreshScrollObservers() {
      forEachChildren(this, (child) => {
        if (child._debug) {
          child.removeDebug();
        }
      });
      this.updateBounds();
      forEachChildren(this, (child) => {
        child.refresh();
        if (child._debug) {
          child.debug();
        }
      });
    }
    refresh() {
      this.updateWindowBounds();
      this.updateBounds();
      this.refreshScrollObservers();
      this.handleScroll();
    }
    handleScroll() {
      this.updateScrollCoords();
      this.wakeTicker.restart();
    }
    /**
     * @param {Event} e
     */
    handleEvent(e) {
      switch (e.type) {
        case "scroll":
          this.handleScroll();
          break;
      }
    }
    revert() {
      this.scrollTicker.cancel();
      this.dataTimer.cancel();
      this.resizeTicker.cancel();
      this.wakeTicker.cancel();
      this.resizeObserver.disconnect();
      (this.useWin ? win : this.element).removeEventListener("scroll", this);
      scrollContainers.delete(this.element);
    }
  };
  var registerAndGetScrollContainer = (target) => {
    const $el = (
      /** @type {HTMLElement} */
      target ? parseTargets(target)[0] || doc.body : doc.body
    );
    let scrollContainer = scrollContainers.get($el);
    if (!scrollContainer) {
      scrollContainer = new ScrollContainer($el);
      scrollContainers.set($el, scrollContainer);
    }
    return scrollContainer;
  };
  var convertValueToPx = ($el, v, size, under, over) => {
    const clampMin = v === "min";
    const clampMax = v === "max";
    const value = v === "top" || v === "left" || v === "start" || clampMin ? 0 : v === "bottom" || v === "right" || v === "end" || clampMax ? "100%" : v === "center" ? "50%" : v;
    const { n, u } = decomposeRawValue(value, decomposedOriginalValue);
    let px = n;
    if (u === "%") {
      px = n / 100 * size;
    } else if (u) {
      px = convertValueUnit($el, decomposedOriginalValue, "px", true).n;
    }
    if (clampMax && under < 0) px += under;
    if (clampMin && over > 0) px += over;
    return px;
  };
  var parseBoundValue = ($el, v, size, under, over) => {
    let value;
    if (isStr(v)) {
      const matchedOperator = relativeValuesExecRgx.exec(
        /** @type {String} */
        v
      );
      if (matchedOperator) {
        const splitter = matchedOperator[0];
        const operator = splitter[0];
        const splitted = (
          /** @type {String} */
          v.split(splitter)
        );
        const clampMin = splitted[0] === "min";
        const clampMax = splitted[0] === "max";
        const valueAPx = convertValueToPx($el, splitted[0], size, under, over);
        const valueBPx = convertValueToPx($el, splitted[1], size, under, over);
        if (clampMin) {
          const min = getRelativeValue(convertValueToPx($el, "min", size), valueBPx, operator);
          value = min < valueAPx ? valueAPx : min;
        } else if (clampMax) {
          const max2 = getRelativeValue(convertValueToPx($el, "max", size), valueBPx, operator);
          value = max2 > valueAPx ? valueAPx : max2;
        } else {
          value = getRelativeValue(valueAPx, valueBPx, operator);
        }
      } else {
        value = convertValueToPx($el, v, size, under, over);
      }
    } else {
      value = /** @type {Number} */
      v;
    }
    return round(value, 0);
  };
  var getAnimationDomTarget = (linked) => {
    let $linkedTarget;
    const linkedTargets = linked.targets;
    for (let i = 0, l = linkedTargets.length; i < l; i++) {
      const target = linkedTargets[i];
      if (target[isDomSymbol]) {
        $linkedTarget = /** @type {HTMLElement} */
        target;
        break;
      }
    }
    return $linkedTarget;
  };
  var scrollerIndex = 0;
  var debugColors$1 = ["#FF4B4B", "#FF971B", "#FFC730", "#F9F640", "#7AFF5A", "#18FF74", "#17E09B", "#3CFFEC", "#05DBE9", "#33B3F1", "#638CF9", "#C563FE", "#FF4FCF", "#F93F8A"];
  var ScrollObserver = class {
    /**
     * @param {ScrollObserverParams} parameters
     */
    constructor(parameters = {}) {
      if (scope.current) scope.current.register(this);
      const syncMode = setValue(parameters.sync, "play pause");
      const ease = syncMode ? parseEasings(
        /** @type {EasingParam} */
        syncMode
      ) : null;
      const isLinear = syncMode && (syncMode === "linear" || syncMode === none);
      const isEase = syncMode && !(ease === none && !isLinear);
      const isSmooth = syncMode && (isNum(syncMode) || syncMode === true || isLinear);
      const isMethods = syncMode && (isStr(syncMode) && !isEase && !isSmooth);
      const syncMethods = isMethods ? (
        /** @type {String} */
        syncMode.split(" ").map(
          (m) => () => {
            const linked = this.linked;
            return linked && linked[m] ? linked[m]() : null;
          }
        )
      ) : null;
      const biDirSync = isMethods && syncMethods.length > 2;
      this.index = scrollerIndex++;
      this.id = !isUnd(parameters.id) ? parameters.id : this.index;
      this.container = registerAndGetScrollContainer(parameters.container);
      this.target = null;
      this.linked = null;
      this.repeat = null;
      this.horizontal = null;
      this.enter = null;
      this.leave = null;
      this.sync = isEase || isSmooth || !!syncMethods;
      this.syncEase = isEase ? ease : null;
      this.syncSmooth = isSmooth ? syncMode === true || isLinear ? 1 : (
        /** @type {Number} */
        syncMode
      ) : null;
      this.onSyncEnter = syncMethods && !biDirSync && syncMethods[0] ? syncMethods[0] : noop;
      this.onSyncLeave = syncMethods && !biDirSync && syncMethods[1] ? syncMethods[1] : noop;
      this.onSyncEnterForward = syncMethods && biDirSync && syncMethods[0] ? syncMethods[0] : noop;
      this.onSyncLeaveForward = syncMethods && biDirSync && syncMethods[1] ? syncMethods[1] : noop;
      this.onSyncEnterBackward = syncMethods && biDirSync && syncMethods[2] ? syncMethods[2] : noop;
      this.onSyncLeaveBackward = syncMethods && biDirSync && syncMethods[3] ? syncMethods[3] : noop;
      this.onEnter = parameters.onEnter || noop;
      this.onLeave = parameters.onLeave || noop;
      this.onEnterForward = parameters.onEnterForward || noop;
      this.onLeaveForward = parameters.onLeaveForward || noop;
      this.onEnterBackward = parameters.onEnterBackward || noop;
      this.onLeaveBackward = parameters.onLeaveBackward || noop;
      this.onUpdate = parameters.onUpdate || noop;
      this.onSyncComplete = parameters.onSyncComplete || noop;
      this.reverted = false;
      this.completed = false;
      this.began = false;
      this.isInView = false;
      this.forceEnter = false;
      this.hasEntered = false;
      this.offset = 0;
      this.offsetStart = 0;
      this.offsetEnd = 0;
      this.distance = 0;
      this.prevProgress = 0;
      this.thresholds = ["start", "end", "end", "start"];
      this.coords = [0, 0, 0, 0];
      this.debugStyles = null;
      this.$debug = null;
      this._params = parameters;
      this._debug = setValue(parameters.debug, false);
      this._next = null;
      this._prev = null;
      addChild(this.container, this);
      sync(() => {
        if (this.reverted) return;
        if (!this.target) {
          const target = (
            /** @type {HTMLElement} */
            parseTargets(parameters.target)[0]
          );
          this.target = target || doc.body;
          this.refresh();
        }
        if (this._debug) this.debug();
      });
    }
    /**
     * @param {Tickable|WAAPIAnimation} linked
     */
    link(linked) {
      if (linked) {
        linked.pause();
        this.linked = linked;
        if (!this._params.target) {
          let $linkedTarget;
          if (!isUnd(
            /** @type {JSAnimation} */
            linked.targets
          )) {
            $linkedTarget = getAnimationDomTarget(
              /** @type {JSAnimation} */
              linked
            );
          } else {
            forEachChildren(
              /** @type {Timeline} */
              linked,
              (child) => {
                if (child.targets && !$linkedTarget) {
                  $linkedTarget = getAnimationDomTarget(
                    /** @type {JSAnimation} */
                    child
                  );
                }
              }
            );
          }
          this.target = $linkedTarget || doc.body;
          this.refresh();
        }
      }
      return this;
    }
    get velocity() {
      return this.container.velocity;
    }
    get backward() {
      return this.horizontal ? this.container.backwardX : this.container.backwardY;
    }
    get scroll() {
      return this.horizontal ? this.container.scrollX : this.container.scrollY;
    }
    get progress() {
      const p = (this.scroll - this.offsetStart) / this.distance;
      return p === Infinity || isNaN(p) ? 0 : round(clamp(p, 0, 1), 6);
    }
    refresh() {
      this.reverted = false;
      const params = this._params;
      this.repeat = setValue(parseScrollObserverFunctionParameter(params.repeat, this), true);
      this.horizontal = setValue(parseScrollObserverFunctionParameter(params.axis, this), "y") === "x";
      this.enter = setValue(parseScrollObserverFunctionParameter(params.enter, this), "end start");
      this.leave = setValue(parseScrollObserverFunctionParameter(params.leave, this), "start end");
      this.updateBounds();
      this.handleScroll();
      return this;
    }
    removeDebug() {
      if (this.$debug) {
        this.$debug.parentNode.removeChild(this.$debug);
        this.$debug = null;
      }
      if (this.debugStyles) {
        this.debugStyles.revert();
        this.$debug = null;
      }
      return this;
    }
    debug() {
      this.removeDebug();
      const container = this.container;
      const isHori = this.horizontal;
      const $existingDebug = container.element.querySelector(":scope > .animejs-onscroll-debug");
      const $debug = doc.createElement("div");
      const $thresholds = doc.createElement("div");
      const $triggers = doc.createElement("div");
      const color = debugColors$1[this.index % debugColors$1.length];
      const useWin = container.useWin;
      const containerWidth = useWin ? container.winWidth : container.width;
      const containerHeight = useWin ? container.winHeight : container.height;
      const scrollWidth = container.scrollWidth;
      const scrollHeight = container.scrollHeight;
      const size = this.container.width > 360 ? 320 : 260;
      const offLeft = isHori ? 0 : 10;
      const offTop = isHori ? 10 : 0;
      const half = isHori ? 24 : size / 2;
      const labelHeight = isHori ? half : 15;
      const labelWidth = isHori ? 60 : half;
      const labelSize = isHori ? labelWidth : labelHeight;
      const repeat = isHori ? "repeat-x" : "repeat-y";
      const gradientOffset = (v) => isHori ? "0px " + v + "px" : v + "px 2px";
      const lineCSS = (c) => `linear-gradient(${isHori ? 90 : 0}deg, ${c} 2px, transparent 1px)`;
      const baseCSS = (p, l, t, w, h) => `position:${p};left:${l}px;top:${t}px;width:${w}px;height:${h}px;`;
      $debug.style.cssText = `${baseCSS("absolute", offLeft, offTop, isHori ? scrollWidth : size, isHori ? size : scrollHeight)}
      pointer-events: none;
      z-index: ${this.container.zIndex++};
      display: flex;
      flex-direction: ${isHori ? "column" : "row"};
      filter: drop-shadow(0px 1px 0px rgba(0,0,0,.75));
    `;
      $thresholds.style.cssText = `${baseCSS("sticky", 0, 0, isHori ? containerWidth : half, isHori ? half : containerHeight)}`;
      if (!$existingDebug) {
        $thresholds.style.cssText += `background:
        ${lineCSS("#FFFF")}${gradientOffset(half - 10)} / ${isHori ? "100px 100px" : "100px 100px"} ${repeat},
        ${lineCSS("#FFF8")}${gradientOffset(half - 10)} / ${isHori ? "10px 10px" : "10px 10px"} ${repeat};
      `;
      }
      $triggers.style.cssText = `${baseCSS("relative", 0, 0, isHori ? scrollWidth : half, isHori ? half : scrollHeight)}`;
      if (!$existingDebug) {
        $triggers.style.cssText += `background:
        ${lineCSS("#FFFF")}${gradientOffset(0)} / ${isHori ? "100px 10px" : "10px 100px"} ${repeat},
        ${lineCSS("#FFF8")}${gradientOffset(0)} / ${isHori ? "10px 0px" : "0px 10px"} ${repeat};
      `;
      }
      const labels = [" enter: ", " leave: "];
      this.coords.forEach((v, i) => {
        const isView = i > 1;
        const value = (isView ? 0 : this.offset) + v;
        const isTail = i % 2;
        const isFirst = value < labelSize;
        const isOver = value > (isView ? isHori ? containerWidth : containerHeight : isHori ? scrollWidth : scrollHeight) - labelSize;
        const isFlip = (isView ? isTail && !isFirst : !isTail && !isFirst) || isOver;
        const $label = doc.createElement("div");
        const $text = doc.createElement("div");
        const dirProp = isHori ? isFlip ? "right" : "left" : isFlip ? "bottom" : "top";
        const flipOffset = isFlip ? (isHori ? labelWidth : labelHeight) + (!isView ? isHori ? -1 : -2 : isHori ? -1 : isOver ? 0 : -2) : !isView ? isHori ? 1 : 0 : isHori ? 1 : 0;
        $text.innerHTML = `${this.id}${labels[isTail]}${this.thresholds[i]}`;
        $label.style.cssText = `${baseCSS("absolute", 0, 0, labelWidth, labelHeight)}
        display: flex;
        flex-direction: ${isHori ? "column" : "row"};
        justify-content: flex-${isView ? "start" : "end"};
        align-items: flex-${isFlip ? "end" : "start"};
        border-${dirProp}: 2px ${isTail ? "solid" : "solid"} ${color};
      `;
        $text.style.cssText = `
        overflow: hidden;
        max-width: ${size / 2 - 10}px;
        height: ${labelHeight};
        margin-${isHori ? isFlip ? "right" : "left" : isFlip ? "bottom" : "top"}: -2px;
        padding: 1px;
        font-family: ui-monospace, monospace;
        font-size: 10px;
        letter-spacing: -.025em;
        line-height: 9px;
        font-weight: 600;
        text-align: ${isHori && isFlip || !isHori && !isView ? "right" : "left"};
        white-space: pre;
        text-overflow: ellipsis;
        color: ${isTail ? color : "rgba(0,0,0,.75)"};
        background-color: ${isTail ? "rgba(0,0,0,.65)" : color};
        border: 2px solid ${isTail ? color : "transparent"};
        border-${isHori ? isFlip ? "top-left" : "top-right" : isFlip ? "top-left" : "bottom-left"}-radius: 5px;
        border-${isHori ? isFlip ? "bottom-left" : "bottom-right" : isFlip ? "top-right" : "bottom-right"}-radius: 5px;
      `;
        $label.appendChild($text);
        let position = value - flipOffset + (isHori ? 1 : 0);
        $label.style[isHori ? "left" : "top"] = `${position}px`;
        (isView ? $thresholds : $triggers).appendChild($label);
      });
      $debug.appendChild($thresholds);
      $debug.appendChild($triggers);
      container.element.appendChild($debug);
      if (!$existingDebug) $debug.classList.add("animejs-onscroll-debug");
      this.$debug = $debug;
      const containerPosition = getTargetValue(container.element, "position");
      if (containerPosition === "static") {
        this.debugStyles = setTargetValues(container.element, { position: "relative " });
      }
    }
    updateBounds() {
      if (this._debug) {
        this.removeDebug();
      }
      let stickys;
      const $target = this.target;
      const container = this.container;
      const isHori = this.horizontal;
      const linked = this.linked;
      let linkedTime;
      let $el = $target;
      if (linked) {
        linkedTime = linked.currentTime;
        linked.seek(0, true);
      }
      $el.parentElement;
      while ($el && $el !== container.element && $el !== doc.body) {
        const isSticky = getTargetValue($el, "position") === "sticky" ? setTargetValues($el, { position: "static" }) : false;
        $el = $el.parentElement;
        if (isSticky) {
          if (!stickys) stickys = [];
          stickys.push(isSticky);
        }
      }
      const rect = $target.getBoundingClientRect();
      const offset = isHori ? rect.left + container.scrollX - container.left : rect.top + container.scrollY - container.top;
      const targetSize = isHori ? rect.width : rect.height;
      const containerSize = isHori ? container.width : container.height;
      const scrollSize = isHori ? container.scrollWidth : container.scrollHeight;
      const maxScroll = scrollSize - containerSize;
      const enter = this.enter;
      const leave = this.leave;
      let enterTarget = "start";
      let leaveTarget = "end";
      let enterContainer = "end";
      let leaveContainer = "start";
      if (isStr(enter)) {
        const splitted = (
          /** @type {String} */
          enter.split(" ")
        );
        enterContainer = splitted[0];
        enterTarget = splitted.length > 1 ? splitted[1] : enterTarget;
      } else if (isObj(enter)) {
        const e = (
          /** @type {ScrollThresholdParam} */
          enter
        );
        if (!isUnd(e.container)) enterContainer = e.container;
        if (!isUnd(e.target)) enterTarget = e.target;
      } else if (isNum(enter)) {
        enterContainer = /** @type {Number} */
        enter;
      }
      if (isStr(leave)) {
        const splitted = (
          /** @type {String} */
          leave.split(" ")
        );
        leaveContainer = splitted[0];
        leaveTarget = splitted.length > 1 ? splitted[1] : leaveTarget;
      } else if (isObj(leave)) {
        const t = (
          /** @type {ScrollThresholdParam} */
          leave
        );
        if (!isUnd(t.container)) leaveContainer = t.container;
        if (!isUnd(t.target)) leaveTarget = t.target;
      } else if (isNum(leave)) {
        leaveContainer = /** @type {Number} */
        leave;
      }
      const parsedEnterTarget = parseBoundValue($target, enterTarget, targetSize);
      const parsedLeaveTarget = parseBoundValue($target, leaveTarget, targetSize);
      const under = parsedEnterTarget + offset - containerSize;
      const over = parsedLeaveTarget + offset - maxScroll;
      const parsedEnterContainer = parseBoundValue($target, enterContainer, containerSize, under, over);
      const parsedLeaveContainer = parseBoundValue($target, leaveContainer, containerSize, under, over);
      const offsetStart = parsedEnterTarget + offset - parsedEnterContainer;
      const offsetEnd = parsedLeaveTarget + offset - parsedLeaveContainer;
      const scrollDelta = offsetEnd - offsetStart;
      this.offset = offset;
      this.offsetStart = offsetStart;
      this.offsetEnd = offsetEnd;
      this.distance = scrollDelta <= 0 ? 0 : scrollDelta;
      this.thresholds = [enterTarget, leaveTarget, enterContainer, leaveContainer];
      this.coords = [parsedEnterTarget, parsedLeaveTarget, parsedEnterContainer, parsedLeaveContainer];
      if (stickys) {
        stickys.forEach((sticky) => sticky.revert());
      }
      if (linked) {
        linked.seek(linkedTime, true);
      }
      if (this._debug) {
        this.debug();
      }
    }
    handleScroll() {
      const linked = this.linked;
      const sync2 = this.sync;
      const syncEase = this.syncEase;
      const syncSmooth = this.syncSmooth;
      const shouldSeek = linked && (syncEase || syncSmooth);
      const isHori = this.horizontal;
      const container = this.container;
      const scroll = this.scroll;
      const isBefore = scroll <= this.offsetStart;
      const isAfter = scroll >= this.offsetEnd;
      const isInView = !isBefore && !isAfter;
      const isOnTheEdge = scroll === this.offsetStart || scroll === this.offsetEnd;
      const forceEnter = !this.hasEntered && isOnTheEdge;
      const $debug = this._debug && this.$debug;
      let hasUpdated = false;
      let syncCompleted = false;
      let p = this.progress;
      if (isBefore && this.began) {
        this.began = false;
      }
      if (p > 0 && !this.began) {
        this.began = true;
      }
      if (shouldSeek) {
        const lp = linked.progress;
        if (syncSmooth && isNum(syncSmooth)) {
          if (
            /** @type {Number} */
            syncSmooth < 1
          ) {
            const step = 1e-4;
            const snap2 = lp < p && p === 1 ? step : lp > p && !p ? -1e-4 : 0;
            p = round(lerp(lp, p, interpolate(
              0.01,
              0.2,
              /** @type {Number} */
              syncSmooth
            ), false) + snap2, 6);
          }
        } else if (syncEase) {
          p = syncEase(p);
        }
        hasUpdated = p !== this.prevProgress;
        syncCompleted = lp === 1;
        if (hasUpdated && !syncCompleted && (syncSmooth && lp)) {
          container.wakeTicker.restart();
        }
      }
      if ($debug) {
        const sticky = isHori ? container.scrollY : container.scrollX;
        $debug.style[isHori ? "top" : "left"] = sticky + 10 + "px";
      }
      if (isInView && !this.isInView || forceEnter && !this.forceEnter && !this.hasEntered) {
        if (isInView) this.isInView = true;
        if (!this.forceEnter || !this.hasEntered) {
          if ($debug && isInView) $debug.style.zIndex = `${this.container.zIndex++}`;
          this.onSyncEnter(this);
          this.onEnter(this);
          if (this.backward) {
            this.onSyncEnterBackward(this);
            this.onEnterBackward(this);
          } else {
            this.onSyncEnterForward(this);
            this.onEnterForward(this);
          }
          this.hasEntered = true;
          if (forceEnter) this.forceEnter = true;
        } else if (isInView) {
          this.forceEnter = false;
        }
      }
      if (isInView || !isInView && this.isInView) {
        hasUpdated = true;
      }
      if (hasUpdated) {
        if (shouldSeek) linked.seek(linked.duration * p);
        this.onUpdate(this);
      }
      if (!isInView && this.isInView) {
        this.isInView = false;
        this.onSyncLeave(this);
        this.onLeave(this);
        if (this.backward) {
          this.onSyncLeaveBackward(this);
          this.onLeaveBackward(this);
        } else {
          this.onSyncLeaveForward(this);
          this.onLeaveForward(this);
        }
        if (sync2 && !syncSmooth) {
          syncCompleted = true;
        }
      }
      if (p >= 1 && this.began && !this.completed && (sync2 && syncCompleted || !sync2)) {
        if (sync2) {
          this.onSyncComplete(this);
        }
        this.completed = true;
        if (!this.repeat && !linked || !this.repeat && linked && linked.completed) {
          this.revert();
        }
      }
      if (p < 1 && this.completed) {
        this.completed = false;
      }
      this.prevProgress = p;
    }
    revert() {
      if (this.reverted) return;
      const container = this.container;
      removeChild(container, this);
      if (!container._head) {
        container.revert();
      }
      if (this._debug) {
        this.removeDebug();
      }
      this.reverted = true;
      return this;
    }
  };
  var onScroll = (parameters = {}) => new ScrollObserver(parameters);
  var segmenter = typeof Intl !== "undefined" && Intl.Segmenter;
  var valueRgx = /\{value\}/g;
  var indexRgx = /\{i\}/g;
  var whiteSpaceGroupRgx = /(\s+)/;
  var whiteSpaceRgx = /^\s+$/;
  var lineType = "line";
  var wordType = "word";
  var charType = "char";
  var dataLine = `data-line`;
  var wordSegmenter = null;
  var graphemeSegmenter = null;
  var $splitTemplate = null;
  var isSegmentWordLike = (seg) => {
    return seg.isWordLike || seg.segment === " " || // Consider spaces as words first, then handle them diffrently later
    isNum(+seg.segment);
  };
  var setAriaHidden = ($el) => $el.setAttribute("aria-hidden", "true");
  var getAllTopLevelElements = ($el, type) => [.../** @type {*} */
  $el.querySelectorAll(`[data-${type}]:not([data-${type}] [data-${type}])`)];
  var debugColors = { line: "#00D672", word: "#FF4B4B", char: "#5A87FF" };
  var filterEmptyElements = ($el) => {
    if (!$el.childElementCount && !$el.textContent.trim()) {
      const $parent = $el.parentElement;
      $el.remove();
      if ($parent) filterEmptyElements($parent);
    }
  };
  var filterLineElements = ($el, lineIndex, bin) => {
    const dataLineAttr = $el.getAttribute(dataLine);
    if (dataLineAttr !== null && +dataLineAttr !== lineIndex || $el.tagName === "BR") bin.add($el);
    let i = $el.childElementCount;
    while (i--) filterLineElements(
      /** @type {HTMLElement} */
      $el.children[i],
      lineIndex,
      bin
    );
    return bin;
  };
  var generateTemplate = (type, params = {}) => {
    let template = ``;
    const classString = isStr(params.class) ? ` class="${params.class}"` : "";
    const cloneType = setValue(params.clone, false);
    const wrapType = setValue(params.wrap, false);
    const overflow = wrapType ? wrapType === true ? "clip" : wrapType : cloneType ? "clip" : false;
    if (wrapType) template += `<span${overflow ? ` style="overflow:${overflow};"` : ""}>`;
    template += `<span${classString}${cloneType ? ` style="position:relative;"` : ""} data-${type}="{i}">`;
    if (cloneType) {
      const left = cloneType === "left" ? "-100%" : cloneType === "right" ? "100%" : "0";
      const top = cloneType === "top" ? "-100%" : cloneType === "bottom" ? "100%" : "0";
      template += `<span>{value}</span>`;
      template += `<span inert style="position:absolute;top:${top};left:${left};white-space:nowrap;">{value}</span>`;
    } else {
      template += `{value}`;
    }
    template += `</span>`;
    if (wrapType) template += `</span>`;
    return template;
  };
  var processHTMLTemplate = (htmlTemplate, store, node, $parentFragment, type, debug, lineIndex, wordIndex, charIndex) => {
    const isLine = type === lineType;
    const isChar = type === charType;
    const className = `_${type}_`;
    const template = isFnc(htmlTemplate) ? htmlTemplate(node) : htmlTemplate;
    const displayStyle = isLine ? "block" : "inline-block";
    $splitTemplate.innerHTML = template.replace(valueRgx, `<i class="${className}"></i>`).replace(indexRgx, `${isChar ? charIndex : isLine ? lineIndex : wordIndex}`);
    const $content = $splitTemplate.content;
    const $highestParent = (
      /** @type {HTMLElement} */
      $content.firstElementChild
    );
    const $split = (
      /** @type {HTMLElement} */
      $content.querySelector(`[data-${type}]`) || $highestParent
    );
    const $replacables = (
      /** @type {NodeListOf<HTMLElement>} */
      $content.querySelectorAll(`i.${className}`)
    );
    const replacablesLength = $replacables.length;
    if (replacablesLength) {
      $highestParent.style.display = displayStyle;
      $split.style.display = displayStyle;
      $split.setAttribute(dataLine, `${lineIndex}`);
      if (!isLine) {
        $split.setAttribute("data-word", `${wordIndex}`);
        if (isChar) $split.setAttribute("data-char", `${charIndex}`);
      }
      let i = replacablesLength;
      while (i--) {
        const $replace = $replacables[i];
        const $closestParent = $replace.parentElement;
        $closestParent.style.display = displayStyle;
        if (isLine) {
          $closestParent.innerHTML = /** @type {HTMLElement} */
          node.innerHTML;
        } else {
          $closestParent.replaceChild(node.cloneNode(true), $replace);
        }
      }
      store.push($split);
      $parentFragment.appendChild($content);
    } else {
      console.warn(`The expression "{value}" is missing from the provided template.`);
    }
    if (debug) $highestParent.style.outline = `1px dotted ${debugColors[type]}`;
    return $highestParent;
  };
  var TextSplitter = class {
    /**
     * @param  {HTMLElement|NodeList|String|Array<HTMLElement>} target
     * @param  {TextSplitterParams} [parameters]
     */
    constructor(target, parameters = {}) {
      if (!wordSegmenter) wordSegmenter = segmenter ? new segmenter([], { granularity: wordType }) : {
        segment: (text2) => {
          const segments = [];
          const words2 = text2.split(whiteSpaceGroupRgx);
          for (let i = 0, l = words2.length; i < l; i++) {
            const segment = words2[i];
            segments.push({
              segment,
              isWordLike: !whiteSpaceRgx.test(segment)
              // Consider non-whitespace as word-like
            });
          }
          return segments;
        }
      };
      if (!graphemeSegmenter) graphemeSegmenter = segmenter ? new segmenter([], { granularity: "grapheme" }) : {
        segment: (text2) => [...text2].map((char) => ({ segment: char }))
      };
      if (!$splitTemplate && isBrowser) $splitTemplate = doc.createElement("template");
      if (scope.current) scope.current.register(this);
      const { words, chars: chars2, lines, accessible, includeSpaces, debug } = parameters;
      const $target = (
        /** @type {HTMLElement} */
        (target = isArr(target) ? target[0] : target) && /** @type {Node} */
        target.nodeType ? target : (getNodeList(target) || [])[0]
      );
      const lineParams = lines === true ? {} : lines;
      const wordParams = words === true || isUnd(words) ? {} : words;
      const charParams = chars2 === true ? {} : chars2;
      this.debug = setValue(debug, false);
      this.includeSpaces = setValue(includeSpaces, false);
      this.accessible = setValue(accessible, true);
      this.linesOnly = lineParams && (!wordParams && !charParams);
      this.lineTemplate = isObj(lineParams) ? generateTemplate(
        lineType,
        /** @type {splitTemplateParams} */
        lineParams
      ) : lineParams;
      this.wordTemplate = isObj(wordParams) || this.linesOnly ? generateTemplate(
        wordType,
        /** @type {splitTemplateParams} */
        wordParams
      ) : wordParams;
      this.charTemplate = isObj(charParams) ? generateTemplate(
        charType,
        /** @type {splitTemplateParams} */
        charParams
      ) : charParams;
      this.$target = $target;
      this.html = $target && $target.innerHTML;
      this.lines = [];
      this.words = [];
      this.chars = [];
      this.effects = [];
      this.effectsCleanups = [];
      this.cache = null;
      this.ready = false;
      this.width = 0;
      this.resizeTimeout = null;
      const handleSplit = () => this.html && (lineParams || wordParams || charParams) && this.split();
      this.resizeObserver = new ResizeObserver(() => {
        clearTimeout(this.resizeTimeout);
        this.resizeTimeout = setTimeout(() => {
          const currentWidth = (
            /** @type {HTMLElement} */
            $target.offsetWidth
          );
          if (currentWidth === this.width) return;
          this.width = currentWidth;
          handleSplit();
        }, 150);
      });
      if (this.lineTemplate && !this.ready) {
        doc.fonts.ready.then(handleSplit);
      } else {
        handleSplit();
      }
      $target ? this.resizeObserver.observe($target) : console.warn("No Text Splitter target found.");
    }
    /**
     * @param  {(...args: any[]) => Tickable | (() => void)} effect
     * @return this
     */
    addEffect(effect) {
      if (!isFnc(effect)) return console.warn("Effect must return a function.");
      const refreshableEffect = createRefreshable(effect);
      this.effects.push(refreshableEffect);
      if (this.ready) this.effectsCleanups[this.effects.length - 1] = refreshableEffect(this);
      return this;
    }
    revert() {
      clearTimeout(this.resizeTimeout);
      this.lines.length = this.words.length = this.chars.length = 0;
      this.resizeObserver.disconnect();
      this.effectsCleanups.forEach((cleanup) => isFnc(cleanup) ? cleanup(this) : cleanup.revert && cleanup.revert());
      this.$target.innerHTML = this.html;
      return this;
    }
    /**
     * Recursively processes a node and its children
     * @param {Node} node
     */
    splitNode(node) {
      const wordTemplate = this.wordTemplate;
      const charTemplate = this.charTemplate;
      const includeSpaces = this.includeSpaces;
      const debug = this.debug;
      const nodeType = node.nodeType;
      if (nodeType === 3) {
        const nodeText = node.nodeValue;
        if (nodeText.trim()) {
          const tempWords = [];
          const words = this.words;
          const chars2 = this.chars;
          const wordSegments = wordSegmenter.segment(nodeText);
          const $wordsFragment = doc.createDocumentFragment();
          let prevSeg = null;
          for (const wordSegment of wordSegments) {
            const segment = wordSegment.segment;
            const isWordLike = isSegmentWordLike(wordSegment);
            if (!prevSeg || isWordLike && (prevSeg && isSegmentWordLike(prevSeg))) {
              tempWords.push(segment);
            } else {
              const lastWordIndex = tempWords.length - 1;
              const lastWord = tempWords[lastWordIndex];
              if (!lastWord.includes(" ") && !segment.includes(" ")) {
                tempWords[lastWordIndex] += segment;
              } else {
                tempWords.push(segment);
              }
            }
            prevSeg = wordSegment;
          }
          for (let i = 0, l = tempWords.length; i < l; i++) {
            const word = tempWords[i];
            if (!word.trim()) {
              if (i && includeSpaces) continue;
              $wordsFragment.appendChild(doc.createTextNode(word));
            } else {
              const nextWord = tempWords[i + 1];
              const hasWordFollowingSpace = includeSpaces && nextWord && !nextWord.trim();
              const wordToProcess = word;
              const charSegments = charTemplate ? graphemeSegmenter.segment(wordToProcess) : null;
              const $charsFragment = charTemplate ? doc.createDocumentFragment() : doc.createTextNode(hasWordFollowingSpace ? word + "\xA0" : word);
              if (charTemplate) {
                const charSegmentsArray = [...charSegments];
                for (let j = 0, jl = charSegmentsArray.length; j < jl; j++) {
                  const charSegment = charSegmentsArray[j];
                  const isLastChar = j === jl - 1;
                  const charText = isLastChar && hasWordFollowingSpace ? charSegment.segment + "\xA0" : charSegment.segment;
                  const $charNode = doc.createTextNode(charText);
                  processHTMLTemplate(
                    charTemplate,
                    chars2,
                    $charNode,
                    /** @type {DocumentFragment} */
                    $charsFragment,
                    charType,
                    debug,
                    -1,
                    words.length,
                    chars2.length
                  );
                }
              }
              if (wordTemplate) {
                processHTMLTemplate(wordTemplate, words, $charsFragment, $wordsFragment, wordType, debug, -1, words.length, chars2.length);
              } else if (charTemplate) {
                $wordsFragment.appendChild($charsFragment);
              } else {
                $wordsFragment.appendChild(doc.createTextNode(word));
              }
              if (hasWordFollowingSpace) i++;
            }
          }
          node.parentNode.replaceChild($wordsFragment, node);
        }
      } else if (nodeType === 1) {
        const childNodes = (
          /** @type {Array<Node>} */
          [.../** @type {*} */
          node.childNodes]
        );
        for (let i = 0, l = childNodes.length; i < l; i++) this.splitNode(childNodes[i]);
      }
    }
    /**
     * @param {Boolean} clearCache
     * @return {this}
     */
    split(clearCache = false) {
      const $el = this.$target;
      const isCached = !!this.cache && !clearCache;
      const lineTemplate = this.lineTemplate;
      const wordTemplate = this.wordTemplate;
      const charTemplate = this.charTemplate;
      const fontsReady = doc.fonts.status !== "loading";
      const canSplitLines = lineTemplate && fontsReady;
      this.ready = !lineTemplate || fontsReady;
      if (canSplitLines || clearCache) {
        this.effectsCleanups.forEach((cleanup) => isFnc(cleanup) && cleanup(this));
      }
      if (!isCached) {
        if (clearCache) {
          $el.innerHTML = this.html;
          this.words.length = this.chars.length = 0;
        }
        this.splitNode($el);
        this.cache = $el.innerHTML;
      }
      if (canSplitLines) {
        if (isCached) $el.innerHTML = this.cache;
        this.lines.length = 0;
        if (wordTemplate) this.words = getAllTopLevelElements($el, wordType);
      }
      if (charTemplate && (canSplitLines || wordTemplate)) {
        this.chars = getAllTopLevelElements($el, charType);
      }
      const elementsArray = this.words.length ? this.words : this.chars;
      let y, linesCount = 0;
      for (let i = 0, l = elementsArray.length; i < l; i++) {
        const $el2 = elementsArray[i];
        const { top, height } = $el2.getBoundingClientRect();
        if (y && top - y > height * 0.5) linesCount++;
        $el2.setAttribute(dataLine, `${linesCount}`);
        const nested = $el2.querySelectorAll(`[${dataLine}]`);
        let c = nested.length;
        while (c--) nested[c].setAttribute(dataLine, `${linesCount}`);
        y = top;
      }
      if (canSplitLines) {
        const linesFragment = doc.createDocumentFragment();
        const parents = /* @__PURE__ */ new Set();
        const clones = [];
        for (let lineIndex = 0; lineIndex < linesCount + 1; lineIndex++) {
          const $clone = (
            /** @type {HTMLElement} */
            $el.cloneNode(true)
          );
          filterLineElements($clone, lineIndex, /* @__PURE__ */ new Set()).forEach(($el2) => {
            const $parent = $el2.parentElement;
            if ($parent) parents.add($parent);
            $el2.remove();
          });
          clones.push($clone);
        }
        parents.forEach(filterEmptyElements);
        for (let cloneIndex = 0, clonesLength = clones.length; cloneIndex < clonesLength; cloneIndex++) {
          processHTMLTemplate(lineTemplate, this.lines, clones[cloneIndex], linesFragment, lineType, this.debug, cloneIndex);
        }
        $el.innerHTML = "";
        $el.appendChild(linesFragment);
        if (wordTemplate) this.words = getAllTopLevelElements($el, wordType);
        if (charTemplate) this.chars = getAllTopLevelElements($el, charType);
      }
      if (this.linesOnly) {
        const words = this.words;
        let w = words.length;
        while (w--) {
          const $word = words[w];
          $word.replaceWith($word.textContent);
        }
        words.length = 0;
      }
      if (this.accessible && (canSplitLines || !isCached)) {
        const $accessible = doc.createElement("span");
        $accessible.style.cssText = `position:absolute;overflow:hidden;clip:rect(0 0 0 0);clip-path:inset(50%);width:1px;height:1px;white-space:nowrap;`;
        $accessible.innerHTML = this.html;
        $el.insertBefore($accessible, $el.firstChild);
        this.lines.forEach(setAriaHidden);
        this.words.forEach(setAriaHidden);
        this.chars.forEach(setAriaHidden);
      }
      this.width = /** @type {HTMLElement} */
      $el.offsetWidth;
      if (canSplitLines || clearCache) {
        this.effects.forEach((effect, i) => this.effectsCleanups[i] = effect(this));
      }
      return this;
    }
    refresh() {
      this.split(true);
    }
  };
  var split = (target, parameters) => new TextSplitter(target, parameters);
  var text = {
    split
  };
  var stagger = (val, params = {}) => {
    let values = [];
    let maxValue2 = 0;
    const from = params.from;
    const reversed = params.reversed;
    const ease = params.ease;
    const hasEasing = !isUnd(ease);
    const hasSpring = hasEasing && !isUnd(
      /** @type {Spring} */
      ease.ease
    );
    const staggerEase = hasSpring ? (
      /** @type {Spring} */
      ease.ease
    ) : hasEasing ? parseEasings(ease) : null;
    const grid = params.grid;
    const axis = params.axis;
    const customTotal = params.total;
    const fromFirst = isUnd(from) || from === 0 || from === "first";
    const fromCenter = from === "center";
    const fromLast = from === "last";
    const fromRandom = from === "random";
    const isRange = isArr(val);
    const useProp = params.use;
    const val1 = isRange ? parseNumber(val[0]) : parseNumber(val);
    const val2 = isRange ? parseNumber(val[1]) : 0;
    const unitMatch = unitsExecRgx.exec((isRange ? val[1] : val) + emptyString);
    const start = params.start || 0 + (isRange ? val1 : 0);
    let fromIndex = fromFirst ? 0 : isNum(from) ? from : 0;
    return (target, i, t, tl) => {
      const [registeredTarget] = registerTargets(target);
      const total = isUnd(customTotal) ? t : customTotal;
      const customIndex = !isUnd(useProp) ? isFnc(useProp) ? useProp(registeredTarget, i, total) : getOriginalAnimatableValue(registeredTarget, useProp) : false;
      const staggerIndex = isNum(customIndex) || isStr(customIndex) && isNum(+customIndex) ? +customIndex : i;
      if (fromCenter) fromIndex = (total - 1) / 2;
      if (fromLast) fromIndex = total - 1;
      if (!values.length) {
        for (let index = 0; index < total; index++) {
          if (!grid) {
            values.push(abs(fromIndex - index));
          } else {
            const fromX = !fromCenter ? fromIndex % grid[0] : (grid[0] - 1) / 2;
            const fromY = !fromCenter ? floor(fromIndex / grid[0]) : (grid[1] - 1) / 2;
            const toX = index % grid[0];
            const toY = floor(index / grid[0]);
            const distanceX = fromX - toX;
            const distanceY = fromY - toY;
            let value = sqrt(distanceX * distanceX + distanceY * distanceY);
            if (axis === "x") value = -distanceX;
            if (axis === "y") value = -distanceY;
            values.push(value);
          }
          maxValue2 = max(...values);
        }
        if (staggerEase) values = values.map((val3) => staggerEase(val3 / maxValue2) * maxValue2);
        if (reversed) values = values.map((val3) => axis ? val3 < 0 ? val3 * -1 : -val3 : abs(maxValue2 - val3));
        if (fromRandom) values = shuffle(values);
      }
      const spacing = isRange ? (val2 - val1) / maxValue2 : val1;
      const offset = tl ? parseTimelinePosition(tl, isUnd(params.start) ? tl.iterationDuration : start) : (
        /** @type {Number} */
        start
      );
      let output = offset + (spacing * round(values[staggerIndex], 2) || 0);
      if (params.modifier) output = params.modifier(output);
      if (unitMatch) output = `${output}${unitMatch[2]}`;
      return output;
    };
  };

  // src/script.js
  var btn = document.getElementById("ddbtn");
  var content = document.getElementById("ddct");
  btn.addEventListener("click", function(event) {
    event.stopPropagation();
    content.classList.toggle("show");
    console.log(content.classList.contains("show"));
  });
  document.addEventListener("click", function() {
    if (content.classList.contains("show")) {
      content.classList.remove("show");
      console.log(content.classList.contains("show"));
    }
  });
  animate(".text", {
    scale: [0.8, 1],
    opacity: [0, 1],
    duration: 500,
    autoplay: onScroll({
      debug: true
    })
  });
  var { chars } = text.split("p", {
    chars: { wrap: "clip" }
  });
  animate(chars, {
    y: [
      { to: ["100%", "0%"] }
    ],
    duration: 150,
    ease: "out(3)",
    delay: stagger(5),
    autoplay: onScroll()
  });
})();
/*! Bundled license information:

animejs/lib/anime.esm.js:
  (**
   * anime.js - ESM
   * @version v4.1.3
   * @author Julian Garnier
   * @license MIT
   * @copyright (c) 2025 Julian Garnier
   * @see https://animejs.com
   *)
*/
