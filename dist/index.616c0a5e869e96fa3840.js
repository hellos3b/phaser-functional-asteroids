!function(t){function n(n){for(var r,u,a=n[0],c=n[1],s=n[2],l=0,p=[];l<a.length;l++)u=a[l],o[u]&&p.push(o[u][0]),o[u]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(t[r]=c[r]);for(f&&f(n);p.length;)p.shift()();return i.push.apply(i,s||[]),e()}function e(){for(var t,n=0;n<i.length;n++){for(var e=i[n],r=!0,a=1;a<e.length;a++){var c=e[a];0!==o[c]&&(r=!1)}r&&(i.splice(n--,1),t=u(u.s=e[0]))}return t}var r={},o={0:0},i=[];function u(n){if(r[n])return r[n].exports;var e=r[n]={i:n,l:!1,exports:{}};return t[n].call(e.exports,e,e.exports,u),e.l=!0,e.exports}u.m=t,u.c=r,u.d=function(t,n,e){u.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:e})},u.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},u.t=function(t,n){if(1&n&&(t=u(t)),8&n)return t;if(4&n&&"object"==typeof t&&t&&t.__esModule)return t;var e=Object.create(null);if(u.r(e),Object.defineProperty(e,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var r in t)u.d(e,r,function(n){return t[n]}.bind(null,r));return e},u.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return u.d(n,"a",n),n},u.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},u.p="";var a=window.webpackJsonp=window.webpackJsonp||[],c=a.push.bind(a);a.push=n,a=a.slice();for(var s=0;s<a.length;s++)n(a[s]);var f=c;i.push([352,1,2]),e()}({351:function(t,n,e){},352:function(t,n,e){"use strict";e.r(n);var r={};e.r(r),e.d(r,"spritesheet",function(){return c}),e.d(r,"spaceship",function(){return s}),e.d(r,"explosion",function(){return f});var o={};e.r(o),e.d(o,"boost",function(){return l}),e.d(o,"dead",function(){return p}),e.d(o,"flip",function(){return y}),e.d(o,"gameOST",function(){return m});var i={};e.r(i),e.d(i,"Splash",function(){return d}),e.d(i,"Game",function(){return Te});e(155),e(320);var u=e(34),a=e.n(u),c=(e(351),{path:"assets/sprites/spritesheet.png",width:32,height:32,frames:16}),s={path:"assets/sprites/spaceship.png",width:32,height:32,frames:24},f={path:"assets/sprites/explosion.png",width:128,height:128,frames:5},l={path:["assets/audio/boost.wav"]},p={path:["assets/audio/dead.wav"]},y={path:["assets/audio/flip-up.wav"]},m={path:["assets/music/space-ost-game.mp3"]},d={preload:function(){var t;t=this,Object.keys(r).forEach(function(n){return function(t,n,e){return t.load.spritesheet(n,e.path,e.width,e.height,e.frames)}(t,n,r[n])}),Object.keys(o).forEach(function(n){return function(t,n,e){return t.game.load.audio(n,e.path)}(t,n,o[n])})},create:function(){this.state.start("Game")}};function h(t,n,e){return n in t?Object.defineProperty(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[n]=e,t}function v(t,n){return function(t){if(Array.isArray(t))return t}(t)||function(t,n){var e=[],r=!0,o=!1,i=void 0;try{for(var u,a=t[Symbol.iterator]();!(r=(u=a.next()).done)&&(e.push(u.value),!n||e.length!==n);r=!0);}catch(t){o=!0,i=t}finally{try{r||null==a.return||a.return()}finally{if(o)throw i}}return e}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function b(t){return(b="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function g(t){return function(t){if(Array.isArray(t)){for(var n=0,e=new Array(t.length);n<t.length;n++)e[n]=t[n];return e}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}var w=function(t){return{apply:function(n){return t&&n(t)},get:function(){return t},getOrElse:function(n){return void 0===t?n:t},getOrThrow:function(n){if(void 0===t)throw new Error(n);return t}}},O=function(t){var n=t.length;return function e(r){return function(){var o=g(r).concat(Array.prototype.slice.call(arguments));return o.length>=n?t.apply(this,o):e(o)}}([])},x=(O(function(t,n){return console.log(t,n),n}),function(t){return"object"===b(t)&&!(t instanceof Array)&&null!==t}),j=O(function(t,n){for(var e in t)if(t[e]!==n[e])return!1;return!0}),S=function t(n){var e=new Set([]),r=Object.entries(n).reduce(function(n,e){var r=v(e,2),o=r[0],i=r[1];return function(t){for(var n=1;n<arguments.length;n++){var e=null!=arguments[n]?arguments[n]:{},r=Object.keys(e);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(e).filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.forEach(function(n){h(t,n,e[n])})}return t}({},n,h({},o,x(i)?t(i):i))},{}),o={},i={get:function(t,n){var i=this;return"$dirty"===n?g(e):"$clean"===n?function(){e=new Set([]),o={}}:"$old"===n?function(t,n){return new Proxy(t,{get:function(t,e){return void 0!==n[e]?n[e]:t[e]},set:function(){throw new Error("Cannot modify original state")}})}(r,o):"$commit"===n?function(n){return Object.entries(n).map(function(n){var e=v(n,2),r=e[0],o=e[1];return i.set(t,r,o)}),t}:t[n]},set:function(n,r,i){return n[r]===i||(!(!x(i)||!j(n[r],i))||(e.add(r),void 0===o[r]&&(o[r]=n[r]),n[r]=x(i)?t(i):i,!0))}};return new Proxy(r,i)};O(function(t,n){n});function $(t){return function(t){if(Array.isArray(t)){for(var n=0,e=new Array(t.length);n<t.length;n++)e[n]=t[n];return e}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function E(t,n){return function(t){if(Array.isArray(t))return t}(t)||function(t,n){var e=[],r=!0,o=!1,i=void 0;try{for(var u,a=t[Symbol.iterator]();!(r=(u=a.next()).done)&&(e.push(u.value),!n||e.length!==n);r=!0);}catch(t){o=!0,i=t}finally{try{r||null==a.return||a.return()}finally{if(o)throw i}}return e}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}window.c_=O;var P=O(function(t,n){return w(t[n])}),A=O(function(t){return t.time.physicsElapsed}),_=O(function(t,n){return Object.assign(t,n)}),k=(O(function(t,n){return Object.assign(n,t)}),O(function(t,n,e){return w(e[t]).getOrElse([]).length?n(e):e}),O(function(t,n){for(var e=Object.keys(n),r=0;r<e.length;r++){var o=e[r];n[o]instanceof Object&&o in t&&Object.assign(n[o],_(t[o],n[o]))}return Object.assign(t||{},n),t}),O(function(t,n){return t.concat(n)}),O(function(t,n){return Math.floor(Math.random()*(n-t))+t})),T=O(function(t,n){return n.map(t)}),R=(O(function(t,n){return t>=n}),O(function(t,n){return t+k(-1*n,n)})),C=O(function(t){return t*(Math.PI/180)}),M=O(function(t){return Number(t).toLocaleString()}),B=(O(function(t,n){return console.log(t,n),n}),O(function(t,n,e){return e[t]?e:n(e)}),O(function(t,n,e){return e[t]?n(e):e})),D=O(function(t,n,e){return!0===e[t]?n(e):e}),I=O(function(t,n){return n.filter(t)}),F=O(function(t,n,e){var r=e-t;return r<t?0:r>n?1:r/(n-t)}),G=O(function(t,n,e){return t+(e=(e=e>1?1:e)<0?0:e)*(n-t)}),q=O(function(t,n,e){return t-(e=(e=e>1?n:e)<0?t:e)*(t-n)}),H=O(function(t,n){return n.reduce(function(n,e){return n[e]=t,n},{})}),L=(O(function(t){return function(n,e){n||(n={}),n[e]=t}}),O(function(t,n,e){return t[n]=e,e}),O(function(t,n){return n.forEach(t)})),N=O(function(t,n){return Object.entries(n).map(function(n){var e=E(n,2),r=e[0],o=e[1];return t(r,o)})}),V=O(function(t,n){return $(t).concat([n])});O(function(t,n){return w(n).getOrElse(t)});var z={setPosition:O(function(t,n){var e=n.position;t.x=e.x,t.y=e.y}),setFrame:O(function(t,n){t.frame=n.frame}),setAnchor:O(function(t,n){var e=n.anchor;t.anchor.setTo(e.x,e.y)}),setAnimation:O(function(t,n){var e=n.frame,r=n.animation;r?t.animations.play(r):(t.animations.stop(),t.frame=e)}),setAlive:O(function(t,n){n.alive||t.destroy()}),setAngle:O(function(t,n){var e=n.angle;t.angle=e}),setBodyRadius:O(function(t,n){var e=n.physicsEnabled,r=n.bodyRadius;e&&t.body.setCircle(r,-r+.5*t.width/t.scale.x,-r+.5*t.height/t.scale.y)})},J=(O(function(t,n){return N(function(n,e){return J(t,n,e)},n)}),O(function(t,n,e){var r=t.animations.add(n,e.frames,e.fps,e.loop);e.onDone&&r.onComplete.add(function(){return Q(t,e.onDone)})})),Q=O(function(t,n){return t.eventQueue=V(t.eventQueue,n)}),U=O(function(t,n,e){return e.getOrElse(function(){}).call(null,t,n)}),X=(O(function(t,n,e){var r,o,i;return o="set"+(i=e).charAt(0).toUpperCase()+i.substring(1),r=P(z)(o),U(t,n)(r)}),{}),Y=O(function(t,n){return w(X[t]).getOrThrow("No Entity found with name: '".concat(t))(n)}),K=O(function(t,n){return X[t]=n}),W=function(t){return{x:t.centerX,y:t.centerY}},Z=O(function(t,n){return n.$spawn(t),t.$state.$commit({gameObjects:V(t.$state.gameObjects,n)}),n}),tt=O(function(t,n){return t.$state.$commit({timers:V(t.$state.timers,n)}),n});function nt(t,n,e){return n in t?Object.defineProperty(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[n]=e,t}var et=function(t){return function(t){for(var n=1;n<arguments.length;n++){var e=null!=arguments[n]?arguments[n]:{},r=Object.keys(e);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(e).filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.forEach(function(n){nt(t,n,e[n])})}return t}({count:function(){},current:0,loop:!1,done:function(){}},t)},rt=c_(function(t,n){var e,r;return r=n,e=I(it)(r),T(ot(A(t.game,1)))(e)}),ot=c_(function(t,n){var e,r;return r=n,e=ut(t)(r),at(e)}),it=function(t){return t.loop||t.current<t.count()},ut=c_(function(t,n){return _(n,{current:n.current+t})}),at=function(t){return t.current>=t.count()?(t.done(),t.loop?_(t,{current:0}):t):t};var ct=function t(n,e){!function(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}(this,t);for(var r="",o=0;o<e.length;o++)this[r=e[o]]=n.add.group(),this[r].name=r};function st(t){return function(t){if(Array.isArray(t)){for(var n=0,e=new Array(t.length);n<t.length;n++)e[n]=t[n];return e}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function ft(t,n,e){return n in t?Object.defineProperty(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[n]=e,t}function lt(t,n){return function(t){if(Array.isArray(t))return t}(t)||function(t,n){var e=[],r=!0,o=!1,i=void 0;try{for(var u,a=t[Symbol.iterator]();!(r=(u=a.next()).done)&&(e.push(u.value),!n||e.length!==n);r=!0);}catch(t){o=!0,i=t}finally{try{r||null==a.return||a.return()}finally{if(o)throw i}}return e}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function pt(t){return(pt="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}var yt=c_(function(t,n){for(var e in t)if(t[e]!==n[e])return!1;return!0}),mt=function(t){var n=new Set([]),e=Object.entries(t).reduce(function(t,n){var e=lt(n,2);return function(t){for(var n=1;n<arguments.length;n++){var e=null!=arguments[n]?arguments[n]:{},r=Object.keys(e);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(e).filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.forEach(function(n){ft(t,n,e[n])})}return t}({},t,ft({},e[0],e[1]))},{}),r={},o={get:function(t,o){var i=this;return"$dirty"===o?st(n):"$clean"===o?function(){n=new Set([]),r={}}:"$old"===o?function(t,n){return new Proxy(t,{get:function(t,e){return void 0!==n[e]?n[e]:t[e]},set:function(){throw new Error("Cannot modify original state")}})}(e,r):"$commit"===o?function(n){return Object.entries(n).map(function(n){var e=lt(n,2),r=e[0],o=e[1];return i.set(t,r,o)}),t}:t[o]},set:function(t,e,o){return t[e]===o||!("object"!==pt(i=o)||i instanceof Array||null===i||!yt(t[e],o))||(n.add(e),void 0===r[e]&&(r[e]=t[e]),t[e]=o,!0);var i}};return new Proxy(e,o)};function dt(t){return(dt="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function ht(t,n){for(var e=0;e<n.length;e++){var r=n[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function vt(t){return(vt=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function bt(t,n){return(bt=Object.setPrototypeOf||function(t,n){return t.__proto__=n,t})(t,n)}function gt(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}var wt=1,Ot={setPosition:O(function(t,n){var e=n.position;t.x=e.x,t.y=e.y}),setFrame:O(function(t,n){t.frame=n.frame}),setAnchor:O(function(t,n){var e=n.anchor;t.anchor.setTo(e.x,e.y)}),setAnimation:O(function(t,n){var e=n.frame,r=n.animation;r?t.animations.play(r):(t.animations.stop(),t.frame=e)}),setAlive:O(function(t,n){n.alive||t.destroy()}),setAngle:O(function(t,n){var e=n.angle;t.angle=e}),setBodyRadius:O(function(t,n){var e=n.physicsEnabled,r=n.bodyRadius;e&&t.body.setCircle(r,-r+.5*t.width/t.scale.x,-r+.5*t.height/t.scale.y)})},xt=O(function(t,n){return N(function(n,e){return jt(t,n,e)},n)}),jt=O(function(t,n,e){var r=t.animations.add(n,e.frames,e.fps,e.loop);e.onDone&&r.onComplete.add(function(){return St(t,e.onDone)})}),St=O(function(t,n){return t.emit(n)}),$t=O(function(t,n,e){return e.getOrElse(function(){}).call(null,t,n)}),Et=O(function(t,n,e){var r,o,i;return o="set"+(i=e).charAt(0).toUpperCase()+i.substring(1),r=P(Ot)(o),$t(t,n)(r)}),Pt=function(t){function n(t,e,r){var o,i,u;!function(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}(this,n),i=this,(o=!(u=vt(n).call(this,e,r.position.x,r.position.y,r.asset))||"object"!==dt(u)&&"function"!=typeof u?gt(i):u).entity=t,o.id=wt++,o.game=e;var a=o.state=new S(r);return a.physicsEnabled&&(o.game.physics.arcade.enable(gt(gt(o))),o.enableBody=!0),xt(gt(gt(o)),a.animations),o.commit(a,Object.keys(a)),o}var e,r,o;return function(t,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(n&&n.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),n&&bt(t,n)}(n,a.a.Sprite),e=n,(r=[{key:"emit",value:function(t){this.entity.emit(t)}},{key:"commit",value:function(t,n){var e=this;return this.state.$commit(t),(n=n||this.state.$dirty).forEach(function(t){return Et(e,e.state,t)}),this.state.$clean(),t}}])&&ht(e.prototype,r),o&&ht(e,o),n}();function At(t,n,e){return n in t?Object.defineProperty(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[n]=e,t}function _t(t,n){for(var e=0;e<n.length;e++){var r=n[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var kt=function(){return{alive:!0,events:{},update:function(t){return t},create:function(){},asset:"",frame:0,position:{x:0,y:0},anchor:{x:.5,y:.5},animations:{},animation:null,angle:0,physicsEnabled:!1,bodyRadius:8,collisionGroup:-1,collisions:{},gravity:!1,velocity:{x:0,y:0},angVelocity:0}},Tt=function(){function t(n){!function(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}(this,t),this.state=new mt(function(t){for(var n=1;n<arguments.length;n++){var e=null!=arguments[n]?arguments[n]:{},r=Object.keys(e);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(e).filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.forEach(function(n){At(t,n,e[n])})}return t}({},kt(),n)),this.sprite=null,Rt(this,this.state)}var n,e,r;return n=t,(e=[{key:"emit",value:function(t){return void 0!==this.state.events[t]?this.state.events[t].call(null,this):(console.warn("No event listeners for event '".concat(t,"' in Object<Entity>")),this)}},{key:"$spawn",value:function(t){var n,e;return this.stage=t,this.sprite=new Pt(this,t.game,this.state),n=t.game,e=this.sprite,n.add.existing(e),function(t,n){var e=n.state.group||n.state.collisionGroup||"default";t.$groups[e].add(n)}(t,this.sprite),this.create(this),this}},{key:"$commit",value:function(t){return this.state.$commit(t),this}}])&&_t(n.prototype,e),r&&_t(n,r),t}(),Rt=function(t,n){return L(function(n){return Ct(t,n)},Object.keys(n))},Ct=function(t,n){return Object.defineProperty(t,n,{get:function(){if(void 0===t.state[n])throw new Error("No prop named '".concat(n,"' on object<Entity>"));return t.state[n]},set:function(t){throw new Error("Object<Entity> is set to read-only > set '".concat(n,"' to '").concat(t,"'"))}})},Mt=function(t){return!!t.sprite},Bt=function(t){return t.alive},Dt=function(t){return t.$commit({alive:!1})};function It(t,n){this.x=void 0===t?0:t,this.y=void 0===n?0:n}It.prototype={set:function(t,n){this.x=t||0,this.y=n||0},clone:function(){return new It(this.x,this.y)},add:function(t){return new It(this.x+t.x,this.y+t.y)},subtract:function(t){return new It(this.x-t.x,this.y-t.y)},multiply:function(t){return new It(this.x*t,this.y*t)},divide:function(t){return new It(this.x/t,this.y/t)},scale:function(t){return new It(this.x*t,this.y*t)},dot:function(t){return this.x*t.x+this.y*t.y},moveTowards:function(t,n){n=Math.min(n,1);var e=t.subtract(this);return this.add(e.scale(n))},magnitude:function(){return Math.sqrt(this.magnitudeSqr())},magnitudeSqr:function(){return this.x*this.x+this.y*this.y},distance:function(t){return Math.sqrt(this.distanceSqr(t))},distanceSqr:function(t){var n=this.x-t.x,e=this.y-t.y;return n*n+e*e},normalize:function(){var t=this.magnitude();return new It(this.x/t,this.y/t)},angle:function(){return Math.atan2(this.y,this.x)},angleBetween:function(t){return this.angle()-t.angle()},rotate:function(t){var n=Math.cos(t),e=Math.sin(t),r=new It;return r.x=this.x*n-this.y*e,r.y=this.x*e+this.y*n,r},toPrecision:function(t){var n=this.clone();return n.x=n.x.toFixed(t),n.y=n.y.toFixed(t),n},perpRight:function(){return new It(-this.y,this.x)},toString:function(){var t=this.toPrecision(1);return"["+t.x+"; "+t.y+"]"}};var Ft=c_(function(t,n){return new It(n.x,n.y).subtract(new It(t.x,t.y))}),Gt=function(t){return new It(0,1).rotate(C(t))},qt=c_(function(t,n){return n.multiply(t)}),Ht=c_(function(t,n){return Ft(t,n).normalize()}),Lt=c_(function(t,n){return new It(t.x,t.y).add(n)}),Nt=function(t){return new It(t.x,t.y).magnitude()},Vt=c_(function(t,n){return(n=new It(n.x,n.y)).magnitude()>t?n.normalize().multiply(t):n});function zt(t,n){return function(t){if(Array.isArray(t))return t}(t)||function(t,n){var e=[],r=!0,o=!1,i=void 0;try{for(var u,a=t[Symbol.iterator]();!(r=(u=a.next()).done)&&(e.push(u.value),!n||e.length!==n);r=!0);}catch(t){o=!0,i=t}finally{try{r||null==a.return||a.return()}finally{if(o)throw i}}return e}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var Jt={x:0,y:-150},Qt={Player:"player",Asteroid:"asteroid",Pickup:"pickup"},Ut=O(function(t,n){var e,r,o;return o=n,r=D("gravity",Yt(Jt,t))(o),e=Xt(t)(r),tn(t)(e)}),Xt=O(function(t,n){return n.$commit({position:{x:n.position.x+n.velocity.x*t,y:n.position.y+n.velocity.y*t}})}),Yt=O(function(t,n,e){return e.$commit({velocity:{x:e.velocity.x-t.x*n,y:e.velocity.y-t.y*n}})}),Kt=function(t){var n,e;return e=Object.entries(t.collisions),n=T(Wt(t))(e),_(t)(n)},Wt=O(function(t,n){var e,r=zt(n,2),o=r[0],i=r[1];return e=T(function(n){return t.stage.game.physics.arcade.overlap(t.sprite,n)?i(t,n):t},t.stage.$groups[o].children),e.reduce(function(t,n){return _(t,n)},{})}),Zt=O(function(t,n){return n.$commit({velocity:Vt(t,n.velocity)})}),tn=O(function(t,n){return n.$commit({angle:n.angle+n.angVelocity*t})}),nn=(O(function(t,n){return e=t.position,r=n.position,new It(e.x,e.y).distance(new It(r.x,r.y))<=t.collisionRadius||distance<=n.collisionRadius;var e,r}),function(t){return t.position.x>0&&t.position.x<t.stage.game.width}),en=function(t){return t.position.y>0},rn=function(t){return t.position.x<-50||t.position.x>t.stage.game.width+50||t.position.y<-50||t.position.y>t.stage.game.height+50};K("Asteroid",function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=Object.assign({update:on,asset:"spritesheet",frame:0,physicsEnabled:!0,bodyRadius:8,collisionGroup:Qt.Asteroid},t);return new Tt(n)});var on=function(t){return rn(t)?Dt(t):t},un=function(t){var n;return n=W(t.game.world),an(400)(n)},an=O(function(t,n){return{x:R(n.x,t),y:R(n.y,t)}}),cn=function(t){var n;return{0:{x:-32,y:(n=function(t){return{x:k(0,t.game.width),y:k(0,t.game.height)}}(t)).y},1:{x:t.game.width+32,y:n.y},2:{x:n.x,y:-32},3:{x:n.x,y:t.game.height+32}}},sn=function(t){var n;return n=k(0,4),P(cn(t))(n).getOrElse({x:0,y:0})};K("Pickup",function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=Object.assign({update:fn,asset:"spritesheet",frame:0,animations:{play:{frames:[8,9,10,11,12,13],loop:!0,fps:10}},animation:"play",physicsEnabled:!0,bodyRadius:8,collisionGroup:Qt.Pickup},t);return new Tt(n)});var fn=function(t){return rn(t)?Dt(t):t};O(function(t,n){return{x:R(n.x,t),y:R(n.y,t)}}),c_(function(t,n,e,r){return P(n,r).getOrElse(function(){console.warn("No event '".concat(r,"' found for entity:"),e)}).call(null,t,e)});function ln(t,n){return function(t){if(Array.isArray(t))return t}(t)||function(t,n){var e=[],r=!0,o=!1,i=void 0;try{for(var u,a=t[Symbol.iterator]();!(r=(u=a.next()).done)&&(e.push(u.value),!n||e.length!==n);r=!0);}catch(t){o=!0,i=t}finally{try{r||null==a.return||a.return()}finally{if(o)throw i}}return e}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var pn={Accelerate:87,RotateRight:68,RotateLeft:65,Boost:32,Restart:70},yn=H(!1,Object.values(pn)),mn=new S(yn),dn=O(function(t,n,e){return mn[t]?n(e):e}),hn=O(function(t,n,e){return!mn[t]&&mn.$old[t]?n(e):e}),vn=O(function(t,n,e){return mn[t]&&!mn.$old[t]?n(e):e});O(function(t,n){return Object.entries(mn).find(function(t){var n=ln(t,2);n[0];return!0===n[1]})?t(n):n});document.addEventListener("keydown",function(t){return function(t){t.preventDefault(),mn.hasOwnProperty(t.keyCode)&&(mn[t.keyCode]=!0)}(t)}),document.addEventListener("keyup",function(t){return function(t){mn.hasOwnProperty(t.keyCode)&&(mn[t.keyCode]=!1)}(t)});var bn={},gn=function(t,n){bn[t]=n},wn=function(t){bn[t].play()},On=function(t){bn[t].loopFull()},xn=function(t){bn[t].stop()},jn=function(t){return wn(t)},Sn=O(function(t,n){var e=t.game.add.audio(n);gn(n,e)});var $n="done";K("Boost",function(){var t,n,e,r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},o=Object.assign({create:En,events:(t={},n=$n,e=Dt,n in t?Object.defineProperty(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[n]=e,t),asset:"spaceship",group:"default",frame:0,animations:{play:{frames:[6,7,8,9],fps:20,onDone:$n}},animation:"play"},r);return new Tt(o)});var En=function(t){return t.stage.game.camera.shake(.01,60)};var Pn="done";K("Flip",function(){var t,n,e,r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},o=Object.assign({create:An,events:(t={},n=Pn,e=Dt,n in t?Object.defineProperty(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[n]=e,t),asset:"spaceship",group:"default",frame:0,animations:{play:{frames:[12,13,14,15],fps:20,onDone:Pn}},animation:"play"},r);return new Tt(o)});var An=function(t){jn("flip")};var _n="done";K("Explosion",function(){var t,n,e,r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},o=Object.assign({create:kn,events:(t={},n=_n,e=Dt,n in t?Object.defineProperty(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[n]=e,t),asset:"explosion",group:"default",frame:0,animations:{play:{frames:[0,1,2,3],fps:20,onDone:_n}},animation:"play"},r);return new Tt(o)});var kn=function(t){jn("dead"),t.stage.game.camera.shake(.04,120)};var Tn="done";function Rn(t,n,e){return n in t?Object.defineProperty(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[n]=e,t}K("VelocityEffect",function(){var t,n,e,r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},o=Object.assign({events:(t={},n=Tn,e=Dt,n in t?Object.defineProperty(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[n]=e,t),asset:"spaceship",group:"default",frame:0,animations:{play:{frames:[18,19,20],fps:30,onDone:Tn}},animation:"play"},r);return new Tt(o)});var Cn={Boost:"boost",Die:"died"};K("Spaceship",function(){var t,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=function(t){for(var n=1;n<arguments.length;n++){var e=null!=arguments[n]?arguments[n]:{},r=Object.keys(e);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(e).filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.forEach(function(n){Rn(t,n,e[n])})}return t}((Rn(t={},Cn.Boost,Hn),Rn(t,Cn.FlipBonus,Ln),t),n.events||{}),r=Object.assign({thrustSpeed:400,rotateSpeed:270,flipRotation:0,update:Bn,input:Dn,asset:"spaceship",frame:0,animations:{boost:{frames:[1,2,3,4],loop:!0,fps:10}},physicsEnabled:!0,bodyRadius:8,collisionGroup:Qt.Player,collisions:Rn({},Qt.Asteroid,Nn),gravity:!0},n,{events:e});return new Tt(r)});var Mn,Bn=function(t){var n,e,r,o;return o=function(t){return en(t)?t:(t.stage.game.camera.shake(.01,60),t.$commit({position:{x:t.position.x,y:5},velocity:{x:t.velocity.x,y:-1*t.velocity.y}}))}(function(t){return nn(t)?t:(t.stage.game.camera.shake(.01,60),t.$commit({position:{x:t.position.x<0?5:t.stage.game.width-5,y:t.position.y},velocity:{x:-1*t.velocity.x,y:t.velocity.y}}))}(t.input(t))),r=Zt(400)(o),e=Vn(r),n=Jn(e),Xn(n)},Dn=function(t){var n,e,r,o,i,u=dn,a=hn,c=vn,s=pn;return i=t,o=u(s.Accelerate,In)(i),r=a(s.Accelerate,Fn)(o),e=u(s.RotateRight,Gn(1))(r),n=u(s.RotateLeft,Gn(-1))(e),c(s.Boost,qn)(n)},In=function(t){var n,e;return t.$commit({animation:"boost",flipRotation:0,velocity:(e=Gt(t.angle),n=qt(-t.thrustSpeed*A(t.stage.game))(e),Lt(t.velocity)(n))})},Fn=function(t){return t.$commit({animation:null})},Gn=function(t){return function(n){var e=t*n.rotateSpeed*A(n.stage.game);return n.$commit({angle:n.angle+e,flipRotation:e<0&&n.flipRotation<0||e>0&&n.flipRotation>0?n.flipRotation+e:e})}},qn=function(t){var n,e;return t.stage.$state.$commit({jumps:t.stage.$state.jumps+1}),jn("boost"),t.emit(Cn.Boost),t.$commit({velocity:(e=Gt(t.angle),n=qt(25*-t.thrustSpeed*A(t.stage.game))(e),Lt(t.velocity)(n))})},Hn=function(t){var n;return n=Y("Boost",{position:Yn(t)}),Z(t.stage)(n),t},Ln=function(t){var n,e;n=Y("Flip",{position:t.position,angle:t.angle}),Z(t.stage)(n);var r=(e=F(100,400,Nt(t.velocity)),G(.05,.2)(e));return t.stage.$state.$commit({score:t.stage.$state.score+t.stage.$state.score*r,flips:t.stage.$state.flips+1}),t},Nn=c_(function(t,n){return zn(t)}),Vn=function(t){return t.position.y<t.stage.game.height?t:zn(t)},zn=function(t){var n;return n=Y("Explosion",{position:t.position}),Z(t.stage)(n),t.emit(Cn.Die),t.stage.$state.$commit({end:!0}),Dt(t)},Jn=function(t){return Qn(t)?Un(t):t},Qn=function(t){return Math.abs(t.flipRotation)>=360},Un=function(t){return t.emit(Cn.FlipBonus),t.$commit({flipRotation:0})},Xn=function(t){var n;Nt(t.velocity)>380&&(n=Y("VelocityEffect",{position:t.position,angle:t.angle}),Z(t.stage)(n));return t},Yn=function(t){var n,e;return e=Gt(t.angle),n=qt(16)(e),Lt(t.position)(n)},Kn={font:"bold 24px Orbitron",fill:"#999"},Wn={font:"bold 16px Orbitron",fill:"#666"},Zn={font:"bold 32px Helvetica, Arial",fill:"#999",boundsAlignH:"center"},te={font:"48px Orbitron",fill:"#fff",boundsAlignH:"center"},ne={font:"16px Orbitron",fill:"#757575",boundsAlignH:"center"},ee={font:"16px Orbitron",fill:"#757575",boundsAlignH:"center"},re={font:"24px Orbitron",fill:"#0f0",boundsAlignH:"center"},oe=760,ie=480,ue=(Mn={paused:!1,started:!0,end:!1,jumps:0,flips:0,bonus:0,score:0,elapsedTime:1,gameObjects:[],spawnQueue:[],timers:[]},function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Object.assign({},Mn,t)}),ae=c_(function(t,n,e,r){t.game.add.text(0,e,r,n).setTextBounds(0,0,t.game.width,100)}),ce=function(t){jn("boost"),t.game.camera.shake(.04,120)},se=c_(function(t){ae(t,ne,140,"Press [F] to restart"),pe(t,-140,"JUMPS",t.$state.jumps),pe(t,0,"TIME",le(t.$state.elapsedTime)),pe(t,140,"FLIPS",t.$state.flips)}),fe=function(t){return t<10?"0"+t:t},le=function(t){var n=Math.floor(t/60);return t=Math.floor(t%60),"".concat(fe(n),":").concat(fe(t))},pe=function(t,n,e,r){t.game.add.text(0,0,e,ee).setTextBounds(t.game.world.centerX+n-50,210,100,100),t.game.add.text(0,0,r,re).setTextBounds(t.game.world.centerX+n-50,180,100,100)},ye=(c_(function(t,n,e,r,o){return stage.game.add.text(0,0,r,o).setTextBounds(t,n,e,0),r}),function(t){tt(t,function(t){return et({count:function(){return 1.5},done:function(){ce(t),ae(t,Zn,50,"SCORE")}})}(t)),tt(t,function(t){return et({count:function(){return 2},done:function(){var n;ce(t),n=he(t),ae(t,te,86)(n)}})}(t)),tt(t,function(t){return et({count:function(){return 2.5},done:function(){return se(t)}})}(t))}),me=function(t){var n,e;return e=Nt(t.$refs.player.velocity),n=F(100,400)(e),G(0,20)(n)},de=function(t){return"x"+Math.floor(t)},he=function(t){var n;return n=Math.floor(t.$state.score),M(n)};function ve(t){return function(t){if(Array.isArray(t)){for(var n=0,e=new Array(t.length);n<t.length;n++)e[n]=t[n];return e}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}var be=function(t,n){t.stage.backgroundColor="#111d38",t.$refs={},t.$state=new S(ue(n)),t.$groups=new ct(t.game,["default"].concat(ve(Object.values(Qt)))),function(t){L(Sn(t),Object.keys(o))}(t),window.sg=t},ge=function(t){var n,e,r,o;t.$refs.player=(n=Y("Spaceship",{position:W(t.world),events:(e={},r=Cn.Die,o=Ae,r in e?Object.defineProperty(e,r,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[r]=o,e)}),Z(t)(n)),function(t){t.$refs.score=t.game.add.text(20,20,0,Kn),t.$refs.bonus=t.game.add.text(20,46,0,Wn)}(t),we(t)},we=function(t){On("gameOST"),$e(t)},Oe=function(t){var n;t.$state.end&&vn(pn.Restart,function(){return ke(t)},{}),n=xe(t),t.$state.$commit(n),mn.$clean(),function(t){var n=me(t);t.$refs.score.text=he(t),t.$refs.bonus.text=de(n);var e="#666";n>19?e="#e51ee9":n>15?e="#48ce27":n>10&&(e="#20381a"),t.$refs.bonus.addColor(e,0)}(t)},xe=function(t){var n=t.$state;return rt(t)(t.$state.timers),je(t),t.$state.$commit({gameObjects:I(Bt,n.gameObjects),elapsedTime:n.end?n.elapsedTime:n.elapsedTime+A(t.game,1),score:n.end?n.score:_e(t)}),n},je=function(t){var n,e;return e=t.$state.gameObjects,n=I(Mt)(e),L(Se)(n)},Se=function(t){var n,e,r;return e=(r=t).update(r),n=B("physicsEnabled")(Ut(A(t.stage.game)))(e),function(t){return t.sprite.commit(t.state),t}(B("physicsEnabled")(Kt)(n))},$e=function(t){var n;n=et({count:function(){return Pe(t)},loop:!0,done:function(){return Ee(t)}}),tt(t)(n)},Ee=function(t){var n;n=Y("Asteroid",function(t){var n,e=sn(t);return{position:e,velocity:(n=Ht(e,un(t)),qt(k(50,150))(n)),frame:k(0,4),angle:k(0,359),angVelocity:k(-270,270)}}(t)),Z(t)(n)},Pe=function(t){var n;return n=F(0,60,t.$state.elapsedTime),q(1,.15)(n)},Ae=function(t){xn("gameOST"),ye(t.stage),t.stage.$state.$commit({end:!0})},_e=function(t){return t.$state.score+(t.$state.flips+1)*(me(t)+1)*A(t.game)},ke=function(t){return t.state.start("Game")},Te={init:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};be(this,t)},create:function(){ge(this)},update:function(){Oe(this)}};function Re(t){return(Re="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function Ce(t,n){return!n||"object"!==Re(n)&&"function"!=typeof n?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):n}function Me(t){return(Me=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function Be(t,n){return(Be=Object.setPrototypeOf||function(t,n){return t.__proto__=n,t})(t,n)}new(function(t){function n(){var t;!function(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}(this,n);document.documentElement;for(var e in t=Ce(this,Me(n).call(this,oe,ie,a.a.CANVAS,"content",null)),i)t.state.add(e,i[e],!1);return t.state.start("Splash"),t}return function(t,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(n&&n.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),n&&Be(t,n)}(n,a.a.Game),n}())}});