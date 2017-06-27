var PS = {};
(function(exports) 
{  
  "use strict";
  var Semigroupoid = function (compose) 
  {
      this.compose = compose;
  };
  var semigroupoidFn = new Semigroupoid(function (f) {
      return function (g) {
          return function (x) {
              return f(g(x));
          };
      };
  });
  var compose = function (dict) {
      return dict.compose;
  };
  exports["Semigroupoid"] = Semigroupoid;
  exports["compose"] = compose;
  exports["semigroupoidFn"] = semigroupoidFn;
})(PS["Control.Semigroupoid"] = PS["Control.Semigroupoid"] || {});
(function(exports) {
  "use strict";
  var Control_Semigroupoid = PS["Control.Semigroupoid"];        
  var Category = function (Semigroupoid0, id) {
      this.Semigroupoid0 = Semigroupoid0;
      this.id = id;
  };
  var id = function (dict) {
      return dict.id;
  };
  var categoryFn = new Category(function () {
      return Control_Semigroupoid.semigroupoidFn;
  }, function (x) {
      return x;
  });
  exports["Category"] = Category;
  exports["id"] = id;
  exports["categoryFn"] = categoryFn;
})(PS["Control.Category"] = PS["Control.Category"] || {});
(function(exports) {
  "use strict";
  var Control_Category = PS["Control.Category"];
  var $$const = function (a) {
      return function (v) {
          return a;
      };
  };
  exports["const"] = $$const;
})(PS["Data.Function"] = PS["Data.Function"] || {});
(function(exports) {
    "use strict";

  exports.unit = {};
})(PS["Data.Unit"] = PS["Data.Unit"] || {});
(function(exports) {
  "use strict";
  var $foreign = PS["Data.Unit"];
  var Data_Show = PS["Data.Show"];
  exports["unit"] = $foreign.unit;
})(PS["Data.Unit"] = PS["Data.Unit"] || {});
(function(exports) {
  "use strict";
  var $foreign = PS["Data.Functor"];
  var Control_Semigroupoid = PS["Control.Semigroupoid"];
  var Data_Function = PS["Data.Function"];
  var Data_Unit = PS["Data.Unit"];        
  var Functor = function (map) {
      this.map = map;
  };
  var map = function (dict) {
      return dict.map;
  };
  var $$void = function (dictFunctor) {
      return map(dictFunctor)(Data_Function["const"](Data_Unit.unit));
  };
  exports["Functor"] = Functor;
  exports["map"] = map;
  exports["void"] = $$void;
})(PS["Data.Functor"] = PS["Data.Functor"] || {});
(function(exports) {
  "use strict";
  var $foreign = PS["Control.Apply"];
  var Control_Category = PS["Control.Category"];
  var Data_Function = PS["Data.Function"];
  var Data_Functor = PS["Data.Functor"];        
  var Apply = function (Functor0, apply) {
      this.Functor0 = Functor0;
      this.apply = apply;
  };                      
  var apply = function (dict) {
      return dict.apply;
  };
  exports["Apply"] = Apply;
  exports["apply"] = apply;
})(PS["Control.Apply"] = PS["Control.Apply"] || {});
(function(exports) {
  "use strict";
  var Control_Apply = PS["Control.Apply"];
  var Data_Functor = PS["Data.Functor"];
  var Data_Unit = PS["Data.Unit"];        
  var Applicative = function (Apply0, pure) {
      this.Apply0 = Apply0;
      this.pure = pure;
  };
  var pure = function (dict) {
      return dict.pure;
  };
  var liftA1 = function (dictApplicative) {
      return function (f) {
          return function (a) {
              return Control_Apply.apply(dictApplicative.Apply0())(pure(dictApplicative)(f))(a);
          };
      };
  };
  exports["Applicative"] = Applicative;
  exports["liftA1"] = liftA1;
  exports["pure"] = pure;
})(PS["Control.Applicative"] = PS["Control.Applicative"] || {});
(function(exports) {
  "use strict";
  var $foreign = PS["Control.Bind"];
  var Control_Applicative = PS["Control.Applicative"];
  var Control_Apply = PS["Control.Apply"];
  var Control_Category = PS["Control.Category"];
  var Data_Function = PS["Data.Function"];
  var Data_Functor = PS["Data.Functor"];
  var Data_Unit = PS["Data.Unit"];        
  var Bind = function (Apply0, bind) {
      this.Apply0 = Apply0;
      this.bind = bind;
  };                     
  var bind = function (dict) {
      return dict.bind;
  };
  exports["Bind"] = Bind;
  exports["bind"] = bind;
})(PS["Control.Bind"] = PS["Control.Bind"] || {});
(function(exports) {
  "use strict";
  var Control_Applicative = PS["Control.Applicative"];
  var Control_Apply = PS["Control.Apply"];
  var Control_Bind = PS["Control.Bind"];
  var Data_Functor = PS["Data.Functor"];
  var Data_Unit = PS["Data.Unit"];        
  var Monad = function (Applicative0, Bind1) {
      this.Applicative0 = Applicative0;
      this.Bind1 = Bind1;
  };
  var ap = function (dictMonad) {
      return function (f) {
          return function (a) {
              return Control_Bind.bind(dictMonad.Bind1())(f)(function (v) {
                  return Control_Bind.bind(dictMonad.Bind1())(a)(function (v1) {
                      return Control_Applicative.pure(dictMonad.Applicative0())(v(v1));
                  });
              });
          };
      };
  };
  exports["Monad"] = Monad;
  exports["ap"] = ap;
})(PS["Control.Monad"] = PS["Control.Monad"] || {});
(function(exports) {
    "use strict";

  exports.pureE = function (a) {
    return function () {
      return a;
    };
  };

  exports.bindE = function (a) {
    return function (f) {
      return function () {
        return f(a())();
      };
    };
  };

  exports.forE = function (lo) {
    return function (hi) {
      return function (f) {
        return function () {
          for (var i = lo; i < hi; i++) {
            f(i)();
          }
        };
      };
    };
  };
})(PS["Control.Monad.Eff"] = PS["Control.Monad.Eff"] || {});
(function(exports) {
  "use strict";
  var $foreign = PS["Control.Monad.Eff"];
  var Control_Applicative = PS["Control.Applicative"];
  var Control_Apply = PS["Control.Apply"];
  var Control_Bind = PS["Control.Bind"];
  var Control_Monad = PS["Control.Monad"];
  var Data_Functor = PS["Data.Functor"];
  var Data_Unit = PS["Data.Unit"];        
  var monadEff = new Control_Monad.Monad(function () {
      return applicativeEff;
  }, function () {
      return bindEff;
  });
  var bindEff = new Control_Bind.Bind(function () {
      return applyEff;
  }, $foreign.bindE);
  var applyEff = new Control_Apply.Apply(function () {
      return functorEff;
  }, Control_Monad.ap(monadEff));
  var applicativeEff = new Control_Applicative.Applicative(function () {
      return applyEff;
  }, $foreign.pureE);
  var functorEff = new Data_Functor.Functor(Control_Applicative.liftA1(applicativeEff));
  exports["functorEff"] = functorEff;
  exports["applyEff"] = applyEff;
  exports["applicativeEff"] = applicativeEff;
  exports["bindEff"] = bindEff;
  exports["monadEff"] = monadEff;
  exports["forE"] = $foreign.forE;
})(PS["Control.Monad.Eff"] = PS["Control.Monad.Eff"] || {});
(function(exports) {
    "use strict";

  exports.newSTRef = function (val) {
    return function () {
      return { value: val };
    };
  };

  exports.readSTRef = function (ref) {
    return function () {
      return ref.value;
    };
  };

  exports.writeSTRef = function (ref) {
    return function (a) {
      return function () {
        return ref.value = a; 
      };
    };
  };
})(PS["Control.Monad.ST"] = PS["Control.Monad.ST"] || {});
(function(exports) {
  "use strict";
  var $foreign = PS["Control.Monad.ST"];
  var Control_Monad_Eff = PS["Control.Monad.Eff"];
  exports["newSTRef"] = $foreign.newSTRef;
  exports["readSTRef"] = $foreign.readSTRef;
  exports["writeSTRef"] = $foreign.writeSTRef;
})(PS["Control.Monad.ST"] = PS["Control.Monad.ST"] || {});
(function(exports) {
  "use strict";

  exports.window = function () {
    return window;
  };
})(PS["DOM.HTML"] = PS["DOM.HTML"] || {});
(function(exports) {
  "use strict";
  var $foreign = PS["DOM.HTML"];
  var Control_Monad_Eff = PS["Control.Monad.Eff"];
  var DOM = PS["DOM"];
  var DOM_HTML_Types = PS["DOM.HTML.Types"];
  exports["window"] = $foreign.window;
})(PS["DOM.HTML"] = PS["DOM.HTML"] || {});
(function(exports) {
    "use strict";
  var requestAnimationFrame = null;
  exports.requestAnimationFrame_ = function(window_) {
      return function(action) {

          if (!requestAnimationFrame) {
              requestAnimationFrame = (function() {
                  return window_.requestAnimationFrame ||
                      window_.webkitRequestAnimationFrame ||
                      window_.mozRequestAnimationFrame ||
                      function(callback) {
                          window_.setTimeout(callback, 1000 / 60);
                      };
              })();
          }

          return function() {
              return requestAnimationFrame(action);
          };
      }
  };
})(PS["DOM.RequestAnimationFrame"] = PS["DOM.RequestAnimationFrame"] || {});
(function(exports) {
  "use strict";
  var $foreign = PS["DOM.RequestAnimationFrame"];
  var Control_Bind = PS["Control.Bind"];
  var Control_Monad_Eff = PS["Control.Monad.Eff"];
  var DOM = PS["DOM"];
  var DOM_HTML = PS["DOM.HTML"];
  var DOM_HTML_Types = PS["DOM.HTML.Types"];
  var Prelude = PS["Prelude"];        
  var requestAnimationFrame = function (action) {
      return function __do() {
          var v = DOM_HTML.window();
          return $foreign.requestAnimationFrame_(v)(action)();
      };
  };
  exports["requestAnimationFrame"] = requestAnimationFrame;
})(PS["DOM.RequestAnimationFrame"] = PS["DOM.RequestAnimationFrame"] || {});
(function(exports) {
    "use strict";
  exports.length = function (xs) {
    return xs.length;
  };
  exports.indexImpl = function (just) {
    return function (nothing) {
      return function (xs) {
        return function (i) {
          return i < 0 || i >= xs.length ? nothing :  just(xs[i]);
        };
      };
    };
  };
})(PS["Data.Array"] = PS["Data.Array"] || {});
(function(exports) {
    "use strict";

  exports.emptySTArray = function () {
    return [];
  };

  exports.peekSTArrayImpl = function (just) {
    return function (nothing) {
      return function (xs) {
        return function (i) {
          return function () {
            return i >= 0 && i < xs.length ? just(xs[i]) : nothing;
          };
        };
      };
    };
  };

  exports.pushAllSTArray = function (xs) {
    return function (as) {
      return function () {
        return xs.push.apply(xs, as);
      };
    };
  };
})(PS["Data.Array.ST"] = PS["Data.Array.ST"] || {});
(function(exports) {
  "use strict";
  var Control_Alt = PS["Control.Alt"];
  var Control_Alternative = PS["Control.Alternative"];
  var Control_Applicative = PS["Control.Applicative"];
  var Control_Apply = PS["Control.Apply"];
  var Control_Bind = PS["Control.Bind"];
  var Control_Category = PS["Control.Category"];
  var Control_Extend = PS["Control.Extend"];
  var Control_Monad = PS["Control.Monad"];
  var Control_MonadZero = PS["Control.MonadZero"];
  var Control_Plus = PS["Control.Plus"];
  var Data_Bounded = PS["Data.Bounded"];
  var Data_Eq = PS["Data.Eq"];
  var Data_Function = PS["Data.Function"];
  var Data_Functor = PS["Data.Functor"];
  var Data_Functor_Invariant = PS["Data.Functor.Invariant"];
  var Data_Monoid = PS["Data.Monoid"];
  var Data_Ord = PS["Data.Ord"];
  var Data_Ordering = PS["Data.Ordering"];
  var Data_Semigroup = PS["Data.Semigroup"];
  var Data_Show = PS["Data.Show"];
  var Data_Unit = PS["Data.Unit"];
  var Prelude = PS["Prelude"];        
  var Nothing = (function () {
      function Nothing() {

      };
      Nothing.value = new Nothing();
      return Nothing;
  })();
  var Just = (function () {
      function Just(value0) {
          this.value0 = value0;
      };
      Just.create = function (value0) {
          return new Just(value0);
      };
      return Just;
  })();
  var maybe = function (v) {
      return function (v1) {
          return function (v2) {
              if (v2 instanceof Nothing) {
                  return v;
              };
              if (v2 instanceof Just) {
                  return v1(v2.value0);
              };
              throw new Error("Failed pattern match at Data.Maybe line 220, column 1 - line 220, column 22: " + [ v.constructor.name, v1.constructor.name, v2.constructor.name ]);
          };
      };
  };
  var fromMaybe = function (a) {
      return maybe(a)(Control_Category.id(Control_Category.categoryFn));
  };
  exports["Nothing"] = Nothing;
  exports["Just"] = Just;
  exports["fromMaybe"] = fromMaybe;
  exports["maybe"] = maybe;
})(PS["Data.Maybe"] = PS["Data.Maybe"] || {});
(function(exports) {
  "use strict";
  var $foreign = PS["Data.Array.ST"];
  var Control_Applicative = PS["Control.Applicative"];
  var Control_Monad_Eff = PS["Control.Monad.Eff"];
  var Control_Monad_ST = PS["Control.Monad.ST"];
  var Control_Semigroupoid = PS["Control.Semigroupoid"];
  var Data_Maybe = PS["Data.Maybe"];
  var Prelude = PS["Prelude"];
  var Unsafe_Coerce = PS["Unsafe.Coerce"];
  var pushSTArray = function (arr) {
      return function (a) {
          return $foreign.pushAllSTArray(arr)([ a ]);
      };
  };
  var peekSTArray = $foreign.peekSTArrayImpl(Data_Maybe.Just.create)(Data_Maybe.Nothing.value);
  exports["peekSTArray"] = peekSTArray;
  exports["pushSTArray"] = pushSTArray;
  exports["emptySTArray"] = $foreign.emptySTArray;
})(PS["Data.Array.ST"] = PS["Data.Array.ST"] || {});
(function(exports) {
    "use strict";

  exports.numAdd = function (n1) {
    return function (n2) {
      return n1 + n2;
    };
  };

  exports.numMul = function (n1) {
    return function (n2) {
      return n1 * n2;
    };
  };
})(PS["Data.Semiring"] = PS["Data.Semiring"] || {});
(function(exports) {
  // Generated by purs version 0.11.4
  "use strict";
  var $foreign = PS["Data.Semiring"];
  var Data_Unit = PS["Data.Unit"];        
  var Semiring = function (add, mul, one, zero) {
      this.add = add;
      this.mul = mul;
      this.one = one;
      this.zero = zero;
  };
  var zero = function (dict) {
      return dict.zero;
  };                                 
  var semiringNumber = new Semiring($foreign.numAdd, $foreign.numMul, 1.0, 0.0);
  var one = function (dict) {
      return dict.one;
  };
  var mul = function (dict) {
      return dict.mul;
  };
  var add = function (dict) {
      return dict.add;
  };
  exports["Semiring"] = Semiring;
  exports["add"] = add;
  exports["mul"] = mul;
  exports["one"] = one;
  exports["zero"] = zero;
  exports["semiringNumber"] = semiringNumber;
})(PS["Data.Semiring"] = PS["Data.Semiring"] || {});
(function(exports) {
  // Generated by purs version 0.11.4
  "use strict";
  var $foreign = PS["Data.Array"];
  var Control_Alt = PS["Control.Alt"];
  var Control_Alternative = PS["Control.Alternative"];
  var Control_Applicative = PS["Control.Applicative"];
  var Control_Apply = PS["Control.Apply"];
  var Control_Bind = PS["Control.Bind"];
  var Control_Category = PS["Control.Category"];
  var Control_Lazy = PS["Control.Lazy"];
  var Control_Monad_Eff = PS["Control.Monad.Eff"];
  var Control_Monad_Rec_Class = PS["Control.Monad.Rec.Class"];
  var Control_Monad_ST = PS["Control.Monad.ST"];
  var Control_Semigroupoid = PS["Control.Semigroupoid"];
  var Data_Array_ST = PS["Data.Array.ST"];
  var Data_Array_ST_Iterator = PS["Data.Array.ST.Iterator"];
  var Data_Boolean = PS["Data.Boolean"];
  var Data_Eq = PS["Data.Eq"];
  var Data_Foldable = PS["Data.Foldable"];
  var Data_Function = PS["Data.Function"];
  var Data_Functor = PS["Data.Functor"];
  var Data_HeytingAlgebra = PS["Data.HeytingAlgebra"];
  var Data_Maybe = PS["Data.Maybe"];
  var Data_NonEmpty = PS["Data.NonEmpty"];
  var Data_Ord = PS["Data.Ord"];
  var Data_Ordering = PS["Data.Ordering"];
  var Data_Ring = PS["Data.Ring"];
  var Data_Semigroup = PS["Data.Semigroup"];
  var Data_Semiring = PS["Data.Semiring"];
  var Data_Traversable = PS["Data.Traversable"];
  var Data_Tuple = PS["Data.Tuple"];
  var Data_Unfoldable = PS["Data.Unfoldable"];
  var Partial_Unsafe = PS["Partial.Unsafe"];
  var Prelude = PS["Prelude"];
  var index = $foreign.indexImpl(Data_Maybe.Just.create)(Data_Maybe.Nothing.value);
  exports["index"] = index;
})(PS["Data.Array"] = PS["Data.Array"] || {});
(function(exports) {
  "use strict";

  exports.body = function() {
      return jQuery(document.body);
  };

  exports.on = function(evt) {
      return function(act) {
          return function(ob) {
              return function() {
                  ob.on(evt, function(e) {
                      act(e)(jQuery(this))();
                  });
              };
          };
      };
  };

  exports.getPageX = function(e) {
      return function() {
          return e.pageX;
      };
  };

  exports.getElementById = function(name) {
      return function() {
          return jQuery("#" + name);
      };
  };

  exports.getPageY = function(e) {
      return function() {
          return e.pageY;
      };
  };
})(PS["Element"] = PS["Element"] || {});
(function(exports) {
  "use strict";
  var $foreign = PS["Element"];
  var Control_Monad_Eff = PS["Control.Monad.Eff"];
  var DOM = PS["DOM"];
  var Data_Foreign = PS["Data.Foreign"];
  var Prelude = PS["Prelude"];
  exports["body"] = $foreign.body;
  exports["getElementById"] = $foreign.getElementById;
  exports["getPageX"] = $foreign.getPageX;
  exports["getPageY"] = $foreign.getPageY;
  exports["on"] = $foreign.on;
})(PS["Element"] = PS["Element"] || {});
(function(exports) {
  "use strict";

  exports.getCanvasElementByIdImpl = function(id, Just, Nothing) {
      return function() {
          var el = document.getElementById(id);
          if (el && el instanceof HTMLCanvasElement) {
              return Just(el);
          } else {
              return Nothing;
          }
      };
  };

  exports.getContext2D = function(c) {
      return function() {
          return c.getContext('2d');
      };
  };

  exports.setFillStyle = function(style) {
      return function(ctx) {
          return function() {
              ctx.fillStyle = style;
              return ctx;
          };
      };
  };

  exports.setStrokeStyle = function(style) {
      return function(ctx) {
          return function() {
              ctx.strokeStyle = style;
              return ctx;
          };
      };
  };

  exports.beginPath = function(ctx) {
      return function() {
          ctx.beginPath();
          return ctx;
      };
  };

  exports.stroke = function(ctx) {
      return function() {
          ctx.stroke();
          return ctx;
      };
  };

  exports.fill = function(ctx) {
      return function() {
          ctx.fill();
          return ctx;
      };
  };

  exports.lineTo = function(ctx) {
      return function(x) {
          return function(y) {
              return function() {
                  ctx.lineTo(x, y);
                  return ctx;
              };
          };
      };
  };

  exports.moveTo = function(ctx) {
      return function(x) {
          return function(y) {
              return function() {
                  ctx.moveTo(x, y);
                  return ctx;
              };
          };
      };
  };

  exports.closePath = function(ctx) {
      return function() {
          ctx.closePath();
          return ctx;
      };
  };

  exports.arc = function(ctx) {
      return function(a) {
          return function() {
              ctx.arc(a.x, a.y, a.r, a.start, a.end);
              return ctx;
          };
      };
  };

  exports.clearRect = function(ctx) {
      return function(r) {
          return function() {
              ctx.clearRect(r.x, r.y, r.w, r.h);
              return ctx;
          };
      };
  };
})(PS["Graphics.Canvas"] = PS["Graphics.Canvas"] || {});
(function(exports) {
  "use strict";
  var $foreign = PS["Graphics.Canvas"];
  var Control_Applicative = PS["Control.Applicative"];
  var Control_Bind = PS["Control.Bind"];
  var Control_Monad_Eff = PS["Control.Monad.Eff"];
  var Control_Monad_Eff_Exception_Unsafe = PS["Control.Monad.Eff.Exception.Unsafe"];
  var Control_Semigroupoid = PS["Control.Semigroupoid"];
  var Data_ArrayBuffer_Types = PS["Data.ArrayBuffer.Types"];
  var Data_Function = PS["Data.Function"];
  var Data_Function_Uncurried = PS["Data.Function.Uncurried"];
  var Data_Functor = PS["Data.Functor"];
  var Data_Maybe = PS["Data.Maybe"];
  var Data_Semigroup = PS["Data.Semigroup"];
  var Data_Show = PS["Data.Show"];
  var Prelude = PS["Prelude"];
  var strokePath = function (ctx) {
      return function (path) {
          return function __do() {
              var v = $foreign.beginPath(ctx)();
              var v1 = path();
              var v2 = $foreign.stroke(ctx)();
              return v1;
          };
      };
  };
  var getCanvasElementById = function (elId) {
      return $foreign.getCanvasElementByIdImpl(elId, Data_Maybe.Just.create, Data_Maybe.Nothing.value);
  };
  var fillPath = function (ctx) {
      return function (path) {
          return function __do() {
              var v = $foreign.beginPath(ctx)();
              var v1 = path();
              var v2 = $foreign.fill(ctx)();
              return v1;
          };
      };
  };
  exports["fillPath"] = fillPath;
  exports["getCanvasElementById"] = getCanvasElementById;
  exports["strokePath"] = strokePath;
  exports["arc"] = $foreign.arc;
  exports["clearRect"] = $foreign.clearRect;
  exports["closePath"] = $foreign.closePath;
  exports["getContext2D"] = $foreign.getContext2D;
  exports["lineTo"] = $foreign.lineTo;
  exports["moveTo"] = $foreign.moveTo;
  exports["setFillStyle"] = $foreign.setFillStyle;
  exports["setStrokeStyle"] = $foreign.setStrokeStyle;
})(PS["Graphics.Canvas"] = PS["Graphics.Canvas"] || {});
(function(exports) {
    "use strict";          

  exports.cos = Math.cos;    

  exports.sin = Math.sin;      

  exports.pi = Math.PI;
})(PS["Math"] = PS["Math"] || {});
(function(exports) {
  "use strict";
  var $foreign = PS["Math"];
  exports["cos"] = $foreign.cos;
  exports["pi"] = $foreign.pi;
  exports["sin"] = $foreign.sin;
})(PS["Math"] = PS["Math"] || {});
(function(exports) {
  "use strict";
  var Control_Bind = PS["Control.Bind"];
  var Control_Monad_Eff = PS["Control.Monad.Eff"];
  var Control_Monad_Eff_Console = PS["Control.Monad.Eff.Console"];
  var Control_Monad_Eff_Exception = PS["Control.Monad.Eff.Exception"];
  var Control_Monad_Eff_Ref = PS["Control.Monad.Eff.Ref"];
  var Control_Monad_Except = PS["Control.Monad.Except"];
  var Control_Monad_ST = PS["Control.Monad.ST"];
  var DOM = PS["DOM"];
  var DOM_HTML = PS["DOM.HTML"];
  var DOM_HTML_Types = PS["DOM.HTML.Types"];
  var DOM_RequestAnimationFrame = PS["DOM.RequestAnimationFrame"];
  var Data_Array = PS["Data.Array"];
  var Data_Array_ST = PS["Data.Array.ST"];
  var Data_Eq = PS["Data.Eq"];
  var Data_EuclideanRing = PS["Data.EuclideanRing"];
  var Data_Foldable = PS["Data.Foldable"];
  var Data_Foreign = PS["Data.Foreign"];
  var Data_Function = PS["Data.Function"];
  var Data_Functor = PS["Data.Functor"];
  var Data_Int = PS["Data.Int"];
  var Data_Maybe = PS["Data.Maybe"];
  var Data_Ring = PS["Data.Ring"];
  var Data_Semiring = PS["Data.Semiring"];
  var Data_Traversable = PS["Data.Traversable"];
  var Element = PS["Element"];
  var Global_Unsafe = PS["Global.Unsafe"];
  var Graphics_Canvas = PS["Graphics.Canvas"];
  var $$Math = PS["Math"];
  var Partial_Unsafe = PS["Partial.Unsafe"];
  var Prelude = PS["Prelude"];        
  var x = function (pt) {
      return pt.x;
  };
  var stroke = function (v00) {
      return function (v01) {
          return function (v10) {
              return function (v11) {
                  return function (v20) {
                      return function (v21) {
                          return function (v30) {
                              return function (v31) {
                                  return function (ctx) {
                                      return function __do() {
                                          var v = Data_Array_ST.emptySTArray();
                                          var v1 = Graphics_Canvas.strokePath(ctx)(function __do() {
                                              var v1 = Graphics_Canvas.moveTo(ctx)(v00)(v01)();
                                              var v2 = Graphics_Canvas.lineTo(ctx)(v10)(v11)();
                                              var v3 = Graphics_Canvas.lineTo(ctx)(v20)(v21)();
                                              var v4 = Graphics_Canvas.lineTo(ctx)(v30)(v31)();
                                              var v5 = Graphics_Canvas.closePath(ctx)();
                                              return Data_Functor["void"](Control_Monad_Eff.functorEff)(Data_Array_ST.pushSTArray(v)(1))();
                                          })();
                                          return Data_Functor["void"](Control_Monad_Eff.functorEff)(Data_Array_ST.pushSTArray(v)(1))();
                                      };
                                  };
                              };
                          };
                      };
                  };
              };
          };
      };
  };
  var rotateY = function (angle) {
      return function (x1) {
          return function (y) {
              return function (z) {
                  var rad = (angle * $$Math.pi) / 180.0;
                  var cosa = $$Math.cos(rad);
                  var sina = $$Math.sin(rad);
                  var xx = z * sina + x1 * cosa;
                  var zz = z * cosa - x1 * sina;
                  return [ xx, y, zz ];
              };
          };
      };
  };
  var rotateX = function (angle) {
      return function (x1) {
          return function (y) {
              return function (z) {
                  var rad = (angle * $$Math.pi) / 180.0;
                  var cosa = $$Math.cos(rad);
                  var sina = $$Math.sin(rad);
                  var yy = y * cosa - z * sina;
                  var zz = y * sina + z * cosa;
                  return [ x1, yy, zz ];
              };
          };
      };
  };
  var qz = $$Math.pi / 4.0;
  var qy = $$Math.pi / 3.0;
  var qx = $$Math.pi / 4.0;
  var project = function (x1) {
      return function (y) {
          return function (z) {
              var xRotQz = x1 * $$Math.cos(qz) + y * $$Math.sin(qz);
              var yRotQz = y * $$Math.cos(qz) - x1 * $$Math.sin(qz);
              var yRotQzQx = yRotQz * $$Math.cos(qx) + z * $$Math.sin(qx);
              var zRotQzQx = z * $$Math.cos(qx) - yRotQz * $$Math.sin(qx);
              var xRotQzQxQy = xRotQz * $$Math.cos(qy) + zRotQzQx * $$Math.sin(qy);
              return [ xRotQzQxQy, yRotQzQx ];
          };
      };
  };
  var multiply = function (dictSemiring) {
      return function (a) {
          return function (b) {
              return Data_Semiring.mul(dictSemiring)(a)(b);
          };
      };
  };
  var mouseUp = function (input) {
      return function (drag) {
          return function (e) {
              return function (v) {
                  return function __do() {
                      var v1 = Control_Monad_ST.writeSTRef(drag)(false)();
                      var v2 = Data_Array_ST.emptySTArray();
                      return Data_Functor["void"](Control_Monad_Eff.functorEff)(Data_Array_ST.pushSTArray(v2)(1))();
                  };
              };
          };
      };
  };
  var mouseDown = function (input) {
      return function (drag) {
          return function (oldx) {
              return function (oldy) {
                  return function (e) {
                      return function (v) {
                          return function __do() {
                              var v1 = Element.getPageX(e)();
                              var v2 = Element.getPageY(e)();
                              var v3 = Control_Monad_ST.writeSTRef(drag)(true)();
                              var v4 = Control_Monad_ST.writeSTRef(oldx)(v1)();
                              var v5 = Control_Monad_ST.writeSTRef(oldy)(v2)();
                              var v6 = Data_Array_ST.emptySTArray();
                              return Data_Functor["void"](Control_Monad_Eff.functorEff)(Data_Array_ST.pushSTArray(v6)(1))();
                          };
                      };
                  };
              };
          };
      };
  };
  var modify = function (a) {
      return function (b) {
          return function (c) {
              return ((a - b) * 2.0 * $$Math.pi) / c;
          };
      };
  };
  var fill = function (v00) {
      return function (v01) {
          return function (v10) {
              return function (v11) {
                  return function (v20) {
                      return function (v21) {
                          return function (v30) {
                              return function (v31) {
                                  return function (ctx) {
                                      return function __do() {
                                          var v = Data_Array_ST.emptySTArray();
                                          var v1 = Graphics_Canvas.fillPath(ctx)(function __do() {
                                              var v1 = Graphics_Canvas.moveTo(ctx)(v00)(v01)();
                                              var v2 = Graphics_Canvas.lineTo(ctx)(v10)(v11)();
                                              var v3 = Graphics_Canvas.lineTo(ctx)(v20)(v21)();
                                              var v4 = Graphics_Canvas.lineTo(ctx)(v30)(v31)();
                                              var v5 = Graphics_Canvas.closePath(ctx)();
                                              return Data_Functor["void"](Control_Monad_Eff.functorEff)(Data_Array_ST.pushSTArray(v)(1))();
                                          })();
                                          return Data_Functor["void"](Control_Monad_Eff.functorEff)(Data_Array_ST.pushSTArray(v)(1))();
                                      };
                                  };
                              };
                          };
                      };
                  };
              };
          };
      };
  };
  var drawCube = function (vertices) {
      return function (faces) {
          return function (ctx) {
              return function __do() {
                  var v = Graphics_Canvas.clearRect(ctx)({
                      x: 0.0, 
                      y: 0.0, 
                      w: 650.0, 
                      h: 650.0
                  })();
                  var v1 = Data_Array_ST.emptySTArray();
                  Data_Functor["void"](Control_Monad_Eff.functorEff)(Control_Monad_Eff.forE(0)(8)(function (i) {
                      return function __do() {
                          var v2 = Data_Array_ST.peekSTArray(vertices)(i)();
                          var yy = Data_Maybe.fromMaybe([  ])(v2);
                          var zz = Data_Array.index(yy)(0);
                          var aa = Data_Maybe.fromMaybe(0.0)(zz);
                          var zz1 = Data_Array.index(yy)(1);
                          var bb = Data_Maybe.fromMaybe(0.0)(zz1);
                          var zz2 = Data_Array.index(yy)(2);
                          var cc = Data_Maybe.fromMaybe(0.0)(zz2);
                          var xyLoc = project(aa)(bb)(cc);
                          var m_xy0 = Data_Array.index(xyLoc)(0);
                          var m_xy1 = Data_Array.index(xyLoc)(1);
                          var xy0 = Data_Maybe.fromMaybe(0.0)(m_xy0);
                          var xy1 = Data_Maybe.fromMaybe(0.0)(m_xy1);
                          var pix0 = xy0 + 650.0 / 2.0;
                          var pix1 = -1.0 * xy1 + 400.0 / 2.0;
                          var v3 = Graphics_Canvas.strokePath(ctx)(Graphics_Canvas.arc(ctx)({
                              x: pix0, 
                              y: pix1, 
                              r: 4.0, 
                              start: 0.0, 
                              end: $$Math.pi * 2.0
                          }))();
                          return Data_Functor["void"](Control_Monad_Eff.functorEff)(Data_Array_ST.pushSTArray(v1)([ pix0, pix1 ]))();
                      };
                  }))();
                  var v2 = Graphics_Canvas.setFillStyle("rgb(255, 0, 0)")(ctx)();
                  var v3 = Graphics_Canvas.setStrokeStyle("rgb(0, 0, 0)")(ctx)();
                  return Data_Functor["void"](Control_Monad_Eff.functorEff)(Control_Monad_Eff.forE(0)(6)(function (i) {
                      var m_i_face = Data_Array.index(faces)(i);
                      var i_face = Data_Maybe.fromMaybe([  ])(m_i_face);
                      var mf0 = Data_Array.index(i_face)(0);
                      var mf1 = Data_Array.index(i_face)(1);
                      var mf2 = Data_Array.index(i_face)(2);
                      var mf3 = Data_Array.index(i_face)(3);
                      var f0 = Data_Maybe.fromMaybe(0)(mf0);
                      var f1 = Data_Maybe.fromMaybe(0)(mf1);
                      var f2 = Data_Maybe.fromMaybe(0)(mf2);
                      var f3 = Data_Maybe.fromMaybe(0)(mf3);
                      return function __do() {
                          var v4 = Data_Array_ST.peekSTArray(v1)(f0)();
                          var v5 = Data_Array_ST.peekSTArray(v1)(f1)();
                          var v6 = Data_Array_ST.peekSTArray(v1)(f2)();
                          var v7 = Data_Array_ST.peekSTArray(v1)(f3)();
                          var v0 = Data_Maybe.fromMaybe([  ])(v4);
                          var v11 = Data_Maybe.fromMaybe([  ])(v5);
                          var v21 = Data_Maybe.fromMaybe([  ])(v6);
                          var v31 = Data_Maybe.fromMaybe([  ])(v7);
                          var mv00 = Data_Array.index(v0)(0);
                          var mv01 = Data_Array.index(v0)(1);
                          var mv10 = Data_Array.index(v11)(0);
                          var mv11 = Data_Array.index(v11)(1);
                          var mv20 = Data_Array.index(v21)(0);
                          var mv21 = Data_Array.index(v21)(1);
                          var mv30 = Data_Array.index(v31)(0);
                          var mv31 = Data_Array.index(v31)(1);
                          var v00 = Data_Maybe.fromMaybe(0.0)(mv00);
                          var v01 = Data_Maybe.fromMaybe(0.0)(mv01);
                          var v10 = Data_Maybe.fromMaybe(0.0)(mv10);
                          var v111 = Data_Maybe.fromMaybe(0.0)(mv11);
                          var v20 = Data_Maybe.fromMaybe(0.0)(mv20);
                          var v211 = Data_Maybe.fromMaybe(0.0)(mv21);
                          var v30 = Data_Maybe.fromMaybe(0.0)(mv30);
                          var v311 = Data_Maybe.fromMaybe(0.0)(mv31);
                          stroke(v00)(v01)(v10)(v111)(v20)(v211)(v30)(v311)(ctx)();
                          var v8 = Data_Array_ST.emptySTArray();
                          return Data_Functor["void"](Control_Monad_Eff.functorEff)(Data_Array_ST.pushSTArray(v8)(1))();
                      };
                  }))();
              };
          };
      };
  };
  var deceleration = 0.92;
  var add = function (dictSemiring) {
      return function (a) {
          return function (b) {
              return Data_Semiring.add(dictSemiring)(a)(b);
          };
      };
  };
  var mouseMove = function (input) {
      return function (drag) {
          return function (oldx) {
              return function (oldy) {
                  return function (dx) {
                      return function (dy) {
                          return function (xangle) {
                              return function (yangle) {
                                  return function (e) {
                                      return function (v) {
                                          return Data_Functor["void"](Control_Monad_Eff.functorEff)(function __do() {
                                              var v1 = Control_Monad_ST.readSTRef(drag)();
                                              var $106 = v1 === true;
                                              if ($106) {
                                                  var v2 = Element.getPageX(e)();
                                                  var v3 = Element.getPageY(e)();
                                                  var v4 = Control_Monad_ST.readSTRef(oldx)();
                                                  var v5 = Control_Monad_ST.readSTRef(oldy)();
                                                  var v6 = Control_Monad_ST.writeSTRef(dx)(modify(v2)(v4)(600.0))();
                                                  var v7 = Control_Monad_ST.writeSTRef(dy)(modify(v3)(v5)(600.0))();
                                                  var v8 = Control_Monad_ST.readSTRef(dx)();
                                                  var v9 = Control_Monad_ST.readSTRef(dx)();
                                                  var v10 = Control_Monad_ST.readSTRef(xangle)();
                                                  var v11 = Control_Monad_ST.readSTRef(yangle)();
                                                  var v12 = Control_Monad_ST.writeSTRef(xangle)(add(Data_Semiring.semiringNumber)(v10)(v8))();
                                                  var v13 = Control_Monad_ST.writeSTRef(yangle)(add(Data_Semiring.semiringNumber)(v11)(v9))();
                                                  var v14 = Control_Monad_ST.writeSTRef(oldx)(v2)();
                                                  var v15 = Control_Monad_ST.writeSTRef(oldy)(v3)();
                                                  var v16 = Data_Array_ST.emptySTArray();
                                                  return Data_Functor["void"](Control_Monad_Eff.functorEff)(Data_Array_ST.pushSTArray(v16)(1))();
                                              };
                                              var v2 = Data_Array_ST.emptySTArray();
                                              return Data_Functor["void"](Control_Monad_Eff.functorEff)(Data_Array_ST.pushSTArray(v2)(1))();
                                          });
                                      };
                                  };
                              };
                          };
                      };
                  };
              };
          };
      };
  };
  var main = Data_Functor["void"](Control_Monad_Eff.functorEff)(function __do() {
      var v = Graphics_Canvas.getCanvasElementById("canvas")();
      var __unused = function (dictPartial1) {
          return function ($dollar89) {
              return $dollar89;
          };
      };
      return __unused()((function () {
          if (v instanceof Data_Maybe.Just) {
              return function __do() {
                  var v1 = Graphics_Canvas.getContext2D(v.value0)();
                  var v2 = Element.body();
                  var v3 = Element.getElementById("canvas")();
                  var v4 = Graphics_Canvas.setFillStyle("rgb(39, 40, 34)")(v1)();
                  var v5 = Control_Monad_ST.newSTRef(false)();
                  var v6 = Control_Monad_ST.newSTRef(0.0)();
                  var v7 = Control_Monad_ST.newSTRef(0.0)();
                  var v8 = Control_Monad_ST.newSTRef(0.0)();
                  var v9 = Control_Monad_ST.newSTRef(0.0)();
                  var v10 = Control_Monad_ST.newSTRef(0.0)();
                  var v11 = Control_Monad_ST.newSTRef(0.0)();
                  var v12 = Control_Monad_ST.newSTRef(0.0)();
                  var msz = -100.0;
                  var vertices = [ [ msz, 100.0, msz ], [ 100.0, 100.0, msz ], [ 100.0, msz, msz ], [ msz, msz, msz ], [ msz, 100.0, 100.0 ], [ 100.0, 100.0, 100.0 ], [ 100.0, msz, 100.0 ], [ msz, msz, 100.0 ] ];
                  var faces = [ [ 0, 1, 2, 3 ], [ 1, 5, 6, 2 ], [ 5, 4, 7, 6 ], [ 4, 0, 3, 7 ], [ 0, 4, 5, 1 ], [ 3, 2, 6, 7 ] ];
                  var v13 = Data_Array_ST.emptySTArray();
                  Data_Functor["void"](Control_Monad_Eff.functorEff)(Control_Monad_Eff.forE(0)(8)(function (i) {
                      var xx = Data_Array.index(vertices)(i);
                      var yy = Data_Maybe.fromMaybe([  ])(xx);
                      return Data_Functor["void"](Control_Monad_Eff.functorEff)(Data_Array_ST.pushSTArray(v13)(yy));
                  }))();
                  var updateCube = function __do() {
                      var v14 = Data_Array_ST.emptySTArray();
                      var v15 = Control_Monad_ST.readSTRef(v5)();
                      var v16 = Control_Monad_ST.readSTRef(v8)();
                      var v17 = Control_Monad_ST.readSTRef(v9)();
                      (function () {
                          var $134 = v15 === false;
                          if ($134) {
                              return function __do() {
                                  var v18 = Control_Monad_ST.writeSTRef(v8)(multiply(Data_Semiring.semiringNumber)(v16)(deceleration))();
                                  var v19 = Control_Monad_ST.writeSTRef(v9)(multiply(Data_Semiring.semiringNumber)(v17)(deceleration))();
                                  var v20 = Control_Monad_ST.readSTRef(v8)();
                                  var v21 = Control_Monad_ST.readSTRef(v9)();
                                  var v22 = Control_Monad_ST.readSTRef(v11)();
                                  var v23 = Control_Monad_ST.readSTRef(v12)();
                                  var v24 = Control_Monad_ST.writeSTRef(v11)(add(Data_Semiring.semiringNumber)(v22)(v20))();
                                  var v25 = Control_Monad_ST.readSTRef(v11)();
                                  var v26 = Control_Monad_ST.writeSTRef(v12)(add(Data_Semiring.semiringNumber)(v23)(v21))();
                                  var v27 = Data_Array_ST.emptySTArray();
                                  return Data_Functor["void"](Control_Monad_Eff.functorEff)(Data_Array_ST.pushSTArray(v27)(1))();
                              };
                          };
                          return function __do() {
                              var v18 = Data_Array_ST.emptySTArray();
                              return Data_Functor["void"](Control_Monad_Eff.functorEff)(Data_Array_ST.pushSTArray(v18)(1))();
                          };
                      })()();
                      Data_Functor["void"](Control_Monad_Eff.functorEff)(Control_Monad_Eff.forE(0)(8)(function (i) {
                          return function __do() {
                              var v18 = Data_Array_ST.peekSTArray(v13)(i)();
                              var vi = Data_Maybe.fromMaybe([  ])(v18);
                              var mx = Data_Array.index(vi)(0);
                              var my = Data_Array.index(vi)(1);
                              var mz = Data_Array.index(vi)(2);
                              var x1 = Data_Maybe.fromMaybe(0.0)(mx);
                              var y = Data_Maybe.fromMaybe(0.0)(my);
                              var z = Data_Maybe.fromMaybe(0.0)(mz);
                              var v19 = Control_Monad_ST.readSTRef(v12)();
                              var v20 = Control_Monad_ST.readSTRef(v11)();
                              var v21 = rotateX(v19 * 20.0)(x1)(y)(z);
                              var mvx = Data_Array.index(v21)(0);
                              var mvy = Data_Array.index(v21)(1);
                              var mvz = Data_Array.index(v21)(2);
                              var vx = Data_Maybe.fromMaybe(0.0)(mvx);
                              var vy = Data_Maybe.fromMaybe(0.0)(mvy);
                              var vz = Data_Maybe.fromMaybe(0.0)(mvz);
                              var vv = rotateY(20.0 * v20)(vx)(vy)(vz);
                              Data_Functor["void"](Control_Monad_Eff.functorEff)(Data_Array_ST.pushSTArray(v14)(vv))();
                              var v22 = Data_Array_ST.emptySTArray();
                              return Data_Functor["void"](Control_Monad_Eff.functorEff)(Data_Array_ST.pushSTArray(v22)(1))();
                          };
                      }))();
                      drawCube(v14)(faces)(v1)();
                      return DOM_RequestAnimationFrame.requestAnimationFrame(updateCube)();
                  };
                  drawCube(v13)(faces)(v1)();
                  Element.on("mousedown")(mouseDown(v.value0)(v5)(v6)(v7))(v3)();
                  Element.on("mouseup")(mouseUp(v.value0)(v5))(v2)();
                  Element.on("mousemove")(mouseMove(v.value0)(v5)(v6)(v7)(v8)(v9)(v11)(v12))(v3)();
                  Element.on("mouseout")(mouseMove(v.value0)(v5)(v6)(v7)(v8)(v9)(v11)(v12))(v3)();
                  return updateCube();
              };
          };
          throw new Error("Failed pattern match at Cube line 205, column 3 - line 206, column 3: " + [ v.constructor.name ]);
      })())();
  });
  exports["add"] = add;
  exports["deceleration"] = deceleration;
  exports["drawCube"] = drawCube;
  exports["fill"] = fill;
  exports["main"] = main;
  exports["modify"] = modify;
  exports["mouseDown"] = mouseDown;
  exports["mouseMove"] = mouseMove;
  exports["mouseUp"] = mouseUp;
  exports["multiply"] = multiply;
  exports["project"] = project;
  exports["qx"] = qx;
  exports["qy"] = qy;
  exports["qz"] = qz;
  exports["rotateX"] = rotateX;
  exports["rotateY"] = rotateY;
  exports["stroke"] = stroke;
  exports["x"] = x;
})(PS["Cube"] = PS["Cube"] || {});
PS["Cube"].main();
