!function(t){function n(n){for(var r,u,a=n[0],c=n[1],s=n[2],l=0,p=[];l<a.length;l++)u=a[l],o[u]&&p.push(o[u][0]),o[u]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(t[r]=c[r]);for(f&&f(n);p.length;)p.shift()();return i.push.apply(i,s||[]),e()}function e(){for(var t,n=0;n<i.length;n++){for(var e=i[n],r=!0,a=1;a<e.length;a++){var c=e[a];0!==o[c]&&(r=!1)}r&&(i.splice(n--,1),t=u(u.s=e[0]))}return t}var r={},o={0:0},i=[];function u(n){if(r[n])return r[n].exports;var e=r[n]={i:n,l:!1,exports:{}};return t[n].call(e.exports,e,e.exports,u),e.l=!0,e.exports}u.m=t,u.c=r,u.d=function(t,n,e){u.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:e})},u.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},u.t=function(t,n){if(1&n&&(t=u(t)),8&n)return t;if(4&n&&"object"==typeof t&&t&&t.__esModule)return t;var e=Object.create(null);if(u.r(e),Object.defineProperty(e,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var r in t)u.d(e,r,function(n){return t[n]}.bind(null,r));return e},u.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return u.d(n,"a",n),n},u.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},u.p="";var a=window.webpackJsonp=window.webpackJsonp||[],c=a.push.bind(a);a.push=n,a=a.slice();for(var s=0;s<a.length;s++)n(a[s]);var f=c;i.push([287,1,2]),e()}({286:function(t,n,e){},287:function(t,n,e){"use strict";e.r(n);var r={};e.r(r),e.d(r,"spritesheet",function(){return c}),e.d(r,"spaceship",function(){return s}),e.d(r,"explosion",function(){return f});var o={};e.r(o),e.d(o,"boost",function(){return l}),e.d(o,"dead",function(){return p}),e.d(o,"flip",function(){return y}),e.d(o,"gameOST",function(){return d});var i={};e.r(i),e.d(i,"Splash",function(){return h}),e.d(i,"Game",function(){return ye});e(117),e(282);var u=e(36),a=e.n(u),c=(e(286),{path:"assets/sprites/spritesheet.png",width:32,height:32,frames:16}),s={path:"assets/sprites/spaceship.png",width:32,height:32,frames:18},f={path:"assets/sprites/explosion.png",width:128,height:128,frames:5},l={path:["assets/audio/boost.wav"]},p={path:["assets/audio/dead.wav"]},y={path:["assets/audio/flip-up.wav"]},d={path:["assets/music/space-ost-game.mp3"]},h={preload:function(){var t;t=this,Object.keys(r).forEach(function(n){return function(t,n,e){return t.load.spritesheet(n,e.path,e.width,e.height,e.frames)}(t,n,r[n])}),Object.keys(o).forEach(function(n){return function(t,n,e){return t.game.load.audio(n,e.path)}(t,n,o[n])})},create:function(){this.state.start("Game")}};function v(t,n,e){return n in t?Object.defineProperty(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[n]=e,t}function m(t,n){return function(t){if(Array.isArray(t))return t}(t)||function(t,n){var e=[],r=!0,o=!1,i=void 0;try{for(var u,a=t[Symbol.iterator]();!(r=(u=a.next()).done)&&(e.push(u.value),!n||e.length!==n);r=!0);}catch(t){o=!0,i=t}finally{try{r||null==a.return||a.return()}finally{if(o)throw i}}return e}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function g(t){return(g="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function b(t){return function(t){if(Array.isArray(t)){for(var n=0,e=new Array(t.length);n<t.length;n++)e[n]=t[n];return e}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}var w=function(t){return{apply:function(n){return t&&n(t)},get:function(){return t},getOrElse:function(n){return void 0===t?n:t}}},x=function(t){var n=t.length;return function e(r){return function(){var o=b(r).concat(Array.prototype.slice.call(arguments));return o.length>=n?t.apply(this,o):e(o)}}([])},O=(x(function(t,n){return console.log(t,n),n}),function(t){return"object"===g(t)&&!(t instanceof Array)&&null!==t}),_=x(function(t,n){for(var e in t)if(t[e]!==n[e])return!1;return!0}),S=function t(n){var e=new Set([]),r=Object.entries(n).reduce(function(n,e){var r=m(e,2),o=r[0],i=r[1];return function(t){for(var n=1;n<arguments.length;n++){var e=null!=arguments[n]?arguments[n]:{},r=Object.keys(e);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(e).filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.forEach(function(n){v(t,n,e[n])})}return t}({},n,v({},o,O(i)?t(i):i))},{}),o={},i={get:function(t,n){var i=this;return"$dirty"===n?b(e):"$clean"===n?function(){e=new Set([]),o={}}:"$old"===n?function(t,n){return new Proxy(t,{get:function(t,e){return void 0!==n[e]?n[e]:t[e]},set:function(){throw new Error("Cannot modify original state")}})}(r,o):"$commit"===n?function(n){return Object.entries(n).map(function(n){var e=m(n,2),r=e[0],o=e[1];return i.set(t,r,o)}),t}:t[n]},set:function(n,r,i){return n[r]===i||(!(!O(i)||!_(n[r],i))||(e.add(r),void 0===o[r]&&(o[r]=n[r]),n[r]=O(i)?t(i):i,!0))}};return new Proxy(r,i)};x(function(t,n){n});function j(t){return function(t){if(Array.isArray(t)){for(var n=0,e=new Array(t.length);n<t.length;n++)e[n]=t[n];return e}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function A(t,n){return function(t){if(Array.isArray(t))return t}(t)||function(t,n){var e=[],r=!0,o=!1,i=void 0;try{for(var u,a=t[Symbol.iterator]();!(r=(u=a.next()).done)&&(e.push(u.value),!n||e.length!==n);r=!0);}catch(t){o=!0,i=t}finally{try{r||null==a.return||a.return()}finally{if(o)throw i}}return e}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}window.c_=x;var E=x(function(t,n){return w(t[n])}),P=x(function(t){return t.time.physicsElapsed}),T=x(function(t,n){return Object.assign(t,n)}),k=x(function(t,n){return Object.assign(n,t)}),R=(x(function(t,n,e){return w(e[t]).getOrElse([]).length?n(e):e}),x(function(t,n){for(var e=Object.keys(n),r=0;r<e.length;r++){var o=e[r];n[o]instanceof Object&&o in t&&Object.assign(n[o],T(t[o],n[o]))}return Object.assign(t||{},n),t}),x(function(t,n){return t.concat(n)})),M=x(function(t,n){return Math.floor(Math.random()*(n-t))+t}),$=x(function(t,n){return n.map(t)}),B=function(t){return new Promise(function(n){setTimeout(n,t)})},C=(x(function(t,n){return t>=n}),x(function(t,n){return t+M(-1*n,n)})),Q=x(function(t){return t*(Math.PI/180)}),D=x(function(t){return Number(t).toLocaleString()}),F=(x(function(t,n){return console.log(t,n),n}),x(function(t,n,e){return e[t]?e:n(e)}),x(function(t,n,e){return e[t]?n(e):e})),G=x(function(t,n,e){return!0===e[t]?n(e):e}),I=x(function(t,n){return n.filter(t)}),V=x(function(t,n,e){var r=e-t;return r<t?0:r>n?1:r/(n-t)}),q=x(function(t,n,e){return t+(e=(e=e>1?n:e)<0?t:e)*(n-t)}),H=x(function(t,n,e){return t-(e=(e=e>1?n:e)<0?t:e)*(t-n)}),L=function(t){return t.reduce(function(t,n){return T(t,n)},{})},N=x(function(t,n){return n.reduce(function(n,e){return n[e]=t,n},{})}),z=(x(function(t){return function(n,e){n||(n={}),n[e]=t}}),x(function(t,n,e){return t[n]=e,e}),x(function(t,n){return n.forEach(t)})),J=function(t){return function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Object.assign({},t,n)}},W=x(function(t,n){return Object.entries(n).map(function(n){var e=A(n,2),r=e[0],o=e[1];return t(r,o)})}),U=x(function(t,n){return j(t).concat([n])});x(function(t,n){return w(n).getOrElse(t)});function X(t){return(X="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function Y(t,n){for(var e=0;e<n.length;e++){var r=n[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function K(t){return(K=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function Z(t,n){return(Z=Object.setPrototypeOf||function(t,n){return t.__proto__=n,t})(t,n)}function tt(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}var nt=1,et={setPosition:x(function(t,n){var e=n.position;t.x=e.x,t.y=e.y}),setFrame:x(function(t,n){t.frame=n.frame}),setAnchor:x(function(t,n){var e=n.anchor;t.anchor.setTo(e.x,e.y)}),setAnimation:x(function(t,n){var e=n.frame,r=n.animation;r?t.animations.play(r):(t.animations.stop(),t.frame=e)}),setAlive:x(function(t,n){n.alive||t.destroy()}),setAngle:x(function(t,n){var e=n.angle;t.angle=e}),setBodyRadius:x(function(t,n){var e=n.physicsEnabled,r=n.bodyRadius;e&&t.body.setCircle(r,-r+.5*t.width/t.scale.x,-r+.5*t.height/t.scale.y)})},rt=x(function(t,n){return W(function(n,e){return ot(t,n,e)},n)}),ot=x(function(t,n,e){var r=t.animations.add(n,e.frames,e.fps,e.loop);e.onDone&&r.onComplete.add(function(){return it(t,e.onDone)})}),it=x(function(t,n){return t.eventQueue=U(t.eventQueue,n)}),ut=x(function(t,n,e){return e.getOrElse(function(){}).call(null,t,n)}),at=x(function(t,n,e){var r,o,i;return o="set"+(i=e).charAt(0).toUpperCase()+i.substring(1),r=E(et)(o),ut(t,n)(r)}),ct=function(t){function n(t,e){var r,o,i;!function(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}(this,n),o=this,(r=!(i=K(n).call(this,t,e.position.x,e.position.y,e.asset))||"object"!==X(i)&&"function"!=typeof i?tt(o):i).id=nt++,r.game=t,r.eventQueue=[];var u=r.state=new S(e);return u.physicsEnabled&&(r.game.physics.arcade.enable(tt(tt(r))),r.enableBody=!0),rt(tt(tt(r)),u.animations),r.commit(u,Object.keys(u)),r}var e,r,o;return function(t,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(n&&n.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),n&&Z(t,n)}(n,a.a.Sprite),e=n,(r=[{key:"getEventQueue",value:function(){var t=this.eventQueue;return this.eventQueue=[],t}},{key:"commit",value:function(t,n){var e=this;return this.state.$commit(t),(n=n||this.state.$dirty).forEach(function(t){return at(e,e.state,t)}),this.state.$clean(),t}}])&&Y(e.prototype,r),o&&Y(e,o),n}(),st=x(function(t,n){return new ct(t,n)}),ft=x(function(t,n){return t.add.existing(n),n}),lt=x(function(t,n){var e=n.state.group||n.state.collisionGroup||"default";return t.groups[e].add(n),n}),pt=x(function(t,n){var e,r,o;return T(n,{sprite:(o=n,r=st(t.game)(o),e=ft(t.game)(r),lt(t)(e))})}),yt=function(t){return{x:t.centerX,y:t.centerY}},dt=x(function(t,n){var e=U(t._state.spawnQueue,n);return t._state.$commit({spawnQueue:e}),n}),ht=c_(function(t,n){var e,r;return r=n,e=$(vt(P(t.game,1)))(r),I(mt)(e)}),vt=c_(function(t,n){var e,r;return r=n,e=gt(t)(r),bt(e)}),mt=function(t){return t.loop||t.current<t.count()},gt=c_(function(t,n){return T(n,{current:n.current+t})}),bt=function(t){return t.current>=t.count()?(t.done(),t.loop?T(t,{current:0}):t):t};var wt=function t(n,e){!function(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}(this,t);for(var r="",o=0;o<e.length;o++)this[r=e[o]]=n.add.group(),this[r].name=r},xt=J({alive:!0,events:null,asset:"",frame:0,position:{x:0,y:0},anchor:{x:.5,y:.5},animations:{},animation:null,angle:0,physicsEnabled:!1,bodyRadius:8,collisionGroup:-1,collisions:{},gravity:!1,velocity:{x:0,y:0},angVelocity:0,update:x(function(t,n){return n})}),Ot=function(t){return T(t,{alive:!1})},_t=function(t){return t.alive};function St(t,n){this.x=void 0===t?0:t,this.y=void 0===n?0:n}St.prototype={set:function(t,n){this.x=t||0,this.y=n||0},clone:function(){return new St(this.x,this.y)},add:function(t){return new St(this.x+t.x,this.y+t.y)},subtract:function(t){return new St(this.x-t.x,this.y-t.y)},multiply:function(t){return new St(this.x*t,this.y*t)},divide:function(t){return new St(this.x/t,this.y/t)},scale:function(t){return new St(this.x*t,this.y*t)},dot:function(t){return this.x*t.x+this.y*t.y},moveTowards:function(t,n){n=Math.min(n,1);var e=t.subtract(this);return this.add(e.scale(n))},magnitude:function(){return Math.sqrt(this.magnitudeSqr())},magnitudeSqr:function(){return this.x*this.x+this.y*this.y},distance:function(t){return Math.sqrt(this.distanceSqr(t))},distanceSqr:function(t){var n=this.x-t.x,e=this.y-t.y;return n*n+e*e},normalize:function(){var t=this.magnitude();return new St(this.x/t,this.y/t)},angle:function(){return Math.atan2(this.y,this.x)},angleBetween:function(t){return this.angle()-t.angle()},rotate:function(t){var n=Math.cos(t),e=Math.sin(t),r=new St;return r.x=this.x*n-this.y*e,r.y=this.x*e+this.y*n,r},toPrecision:function(t){var n=this.clone();return n.x=n.x.toFixed(t),n.y=n.y.toFixed(t),n},perpRight:function(){return new St(-this.y,this.x)},toString:function(){var t=this.toPrecision(1);return"["+t.x+"; "+t.y+"]"}};var jt=c_(function(t,n){return new St(n.x,n.y).subtract(new St(t.x,t.y))}),At=function(t){return new St(0,1).rotate(Q(t))},Et=c_(function(t,n){return n.multiply(t)}),Pt=c_(function(t,n){return jt(t,n).normalize()}),Tt=c_(function(t,n){return new St(t.x,t.y).add(n)}),kt=c_(function(t,n){return(n=new St(n.x,n.y)).magnitude()>t?n.normalize().multiply(t):n});function Rt(t,n){return function(t){if(Array.isArray(t))return t}(t)||function(t,n){var e=[],r=!0,o=!1,i=void 0;try{for(var u,a=t[Symbol.iterator]();!(r=(u=a.next()).done)&&(e.push(u.value),!n||e.length!==n);r=!0);}catch(t){o=!0,i=t}finally{try{r||null==a.return||a.return()}finally{if(o)throw i}}return e}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var Mt={x:0,y:-150},$t=x(function(t,n){var e,r,o;return o=n,r=G("gravity",Ct(Mt,t))(o),e=Bt(t)(r),Gt(t)(e)}),Bt=x(function(t,n){return n.position={x:n.position.x+n.velocity.x*t,y:n.position.y+n.velocity.y*t},n}),Ct=x(function(t,n,e){var r=e.velocity;return e.velocity={x:r.x-t.x*n,y:r.y-t.y*n},e}),Qt=x(function(t,n){var e,r;return r=Object.entries(n.collisions),e=$(Dt(t,n))(r),T(n)(e)}),Dt=x(function(t,n,e){var r,o=Rt(e,2),i=o[0],u=o[1];return r=$(function(e){return t.game.physics.arcade.overlap(n.sprite,e)?(console.log("collision",i,u),u(t,n,e)):n},t.groups[i].children),L(r)}),Ft=x(function(t,n){return T(n,{velocity:kt(t,n.velocity)})}),Gt=x(function(t,n){return n.angle+=n.angVelocity*t,n}),It={Player:"player",Asteroid:"asteroid"},Vt=(x(function(t,n){return e=t.position,r=n.position,new St(e.x,e.y).distance(new St(r.x,r.y))<=t.collisionRadius||distance<=n.collisionRadius;var e,r}),x(function(t,n){var e,r=zt(t);return T(xt({alive:!0,asset:"spritesheet",frame:0,animations:{},angle:0,physicsEnabled:!0,bodyRadius:8,collisionGroup:It.Asteroid,update:qt}),{position:r,velocity:(e=Pt(r,Ht(t)),Et(M(50,150))(e)),frame:M(0,4),angle:M(0,359),angVelocity:M(-180,180)})})),qt=x(function(t,n){return Jt(t,n)?Ot(n):n}),Ht=function(t){var n;return n=yt(t.game.world),Lt(400)(n)},Lt=x(function(t,n){return{x:C(n.x,t),y:C(n.y,t)}}),Nt=function(t){var n;return{0:{x:-32,y:(n=function(t){return{x:M(0,t.game.width),y:M(0,t.game.height)}}(t)).y},1:{x:t.game.width+32,y:n.y},2:{x:n.x,y:-32},3:{x:n.x,y:t.game.height+32}}},zt=x(function(t){var n;return n=M(0,4),E(Nt(t))(n).getOrElse({x:0,y:0})}),Jt=x(function(t,n){return n.position.x<-50||n.position.x>t.game.width+50||n.position.y<-50||n.position.y>t.game.height+50}),Wt=x(function(t,n){return e={count:n,loop:!0,done:function(){var n;return n=Vt(t,{}),dt(t)(n)}},J({count:function(){},current:0,loop:!1,done:function(){}})(e);var e}),Ut=c_(function(t,n,e,r){return E(n,r).getOrElse(function(){console.warn("No event '".concat(r,"' found for entity:"),e)}).call(null,t,e)}),Xt={Accelerate:87,RotateRight:68,RotateLeft:65,Boost:32,Restart:70},Yt=N(!1,Object.values(Xt)),Kt=new S(Yt),Zt=x(function(t,n,e){return Kt[t]?n(e):e}),tn=x(function(t,n,e){return!Kt[t]&&Kt.$old[t]?n(e):e}),nn=x(function(t,n,e){return Kt[t]&&!Kt.$old[t]?n(e):e});document.addEventListener("keydown",function(t){return function(t){t.preventDefault(),Kt.hasOwnProperty(t.keyCode)&&(Kt[t.keyCode]=!0)}(t)}),document.addEventListener("keyup",function(t){return function(t){Kt.hasOwnProperty(t.keyCode)&&(Kt[t.keyCode]=!1)}(t)});var en="done",rn=function(t){return function(t){for(var n=arguments.length,e=new Array(n>1?n-1:0),r=1;r<n;r++)e[r-1]=arguments[r];return function(){for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return e.reduce(function(t,n){return n(t)},t.apply(null,r))}}(At,Et(16),Tt(t.position))(t.angle)},on=function(){return e=function(t,n){return Ot(n)},(n=en)in(t={})?Object.defineProperty(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[n]=e,t;var t,n,e},un=c_(function(t,n){return T(xt({alive:!0,group:"default",position:{x:100,y:100},frame:0,anchor:{x:.5,y:.5},asset:"spaceship",animations:{play:{frames:[6,7,8,9],fps:20,onDone:en}},animation:"play"}),{position:rn(n),events:Ut(t,on())})});var an="done",cn=function(){return e=function(t,n){return Ot(n)},(n=an)in(t={})?Object.defineProperty(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[n]=e,t;var t,n,e},sn=c_(function(t,n){return T(xt({alive:!0,group:"default",position:{x:100,y:100},frame:0,anchor:{x:.5,y:.5},asset:"spaceship",animations:{flip:{frames:[12,13,14,15],fps:10,onDone:an}},animation:"flip"}),{position:n.position,angle:n.angle,events:Ut(t,cn())})});var fn="done",ln=function(){return e=function(t,n){return Ot(n)},(n=fn)in(t={})?Object.defineProperty(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[n]=e,t;var t,n,e},pn=c_(function(t,n){return T(xt({alive:!0,group:"default",position:{x:100,y:100},frame:0,anchor:{x:.5,y:.5},asset:"explosion",animations:{play:{frames:[0,1,2,3],fps:10,onDone:fn}},animation:"play"}),{position:n.position,events:Ut(t,ln())})}),yn={},dn=function(t,n){yn[t]=n},hn=function(t){yn[t].play()},vn=function(t){yn[t].loopFull()},mn=function(t){yn[t].stop()},gn=function(t){return hn(t)},bn=x(function(t,n){var e=t.game.add.audio(n);dn(n,e)});function wn(t,n,e){return n in t?Object.defineProperty(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[n]=e,t}var xn={Boost:"boost",Die:"died"},On=c_(function(t,n){var e,r,o,i,u,a=Zt,c=tn,s=nn,f=Xt;return u=n,i=a(f.Accelerate,Dn(t))(u),o=c(f.Accelerate,Fn)(i),r=a(f.RotateRight,Gn(t,1))(o),e=a(f.RotateLeft,Gn(t,-1))(r),s(f.Boost,In(t))(e)}),_n=c_(function(t,n,e){return Pn(t,n)}),Sn=c_(function(t,n){var e;return e=un(t,n),dt(t)(e),t.game.camera.shake(.01,60),n}),jn=c_(function(t,n){var e,r;gn("flip"),e=sn(t,n),dt(t)(e);var o=(r=V(100,400,t._state.playerVelocity),q(.05,.2)(r));return t._state.$commit({score:t._state.score+t._state.score*o}),n}),An=c_(function(t,n){var e,r,o,i,u,a;return a=n.input(n),u=Mn(a),i=Tn(t)(u),o=Rn(t)(i),r=Ft(400)(o),e=kn(t)(r),En(t)(e)}),En=c_(function(t,n){var e;return t._state.$commit({playerVelocity:(e=n.velocity,new St(e.x,e.y).magnitude())}),n}),Pn=c_(function(t,n){var e;return gn("dead"),t.game.camera.shake(.04,120),e=pn(t,n),dt(t)(e),n.events(n,xn.Die),t._state.$commit({end:!0}),Ot(n)}),Tn=c_(function(t,n){return Cn(t,n)?n:(t.game.camera.shake(.01,60),T(n,{position:{x:n.position.x<0?5:t.game.width-5,y:n.position.y},velocity:{x:-1*n.velocity.x,y:n.velocity.y}}))}),kn=c_(function(t,n){return n.position.y<t.game.height?n:Pn(t,n)}),Rn=c_(function(t,n){return Qn(t,n)?n:(t.game.camera.shake(.01,60),T(n,{position:{x:n.position.x,y:5},velocity:{x:n.velocity.x,y:-1*n.velocity.y}}))}),Mn=function(t){return $n(t)?Bn(t):t},$n=function(t){return Math.abs(t.rotationSinceAcceleration)>=360},Bn=function(t){return T(t.events(t,xn.FlipBonus),{rotationSinceAcceleration:0})},Cn=c_(function(t,n){return n.position.x>0&&n.position.x<t.game.width}),Qn=c_(function(t,n){return n.position.y>0}),Dn=function(t){return function(n){var e,r;return T(n,{animation:"boost",rotationSinceAcceleration:0,velocity:(r=At(n.angle),e=Et(-n.state.thrustSpeed*P(t.game))(r),Tt(n.velocity)(e))})}},Fn=function(t){return T(t,{animation:null})},Gn=c_(function(t,n,e){var r=n*e.state.rotateSpeed*P(t.game);return T(e,{angle:e.angle+r,rotationSinceAcceleration:e.rotationSinceAcceleration+r})}),In=c_(function(t,n){var e,r;return gn("boost"),T(n.events(n,xn.Boost),{velocity:(r=At(n.angle),e=Et(25*-n.state.thrustSpeed*P(t.game))(r),Tt(n.velocity)(e))})}),Vn=function(){return xt({state:{thrustSpeed:400,rotateSpeed:270,rotationSinceAcceleration:0},asset:"spaceship",frame:0,animations:{boost:{frames:[1,2,3,4],loop:!0,fps:10}},physicsEnabled:!0,bodyRadius:8,collisionGroup:It.Spaceship,collisions:wn({},It.Asteroid,_n),gravity:!0,update:An})},qn={font:"bold 24px Orbitron",fill:"#999"},Hn={font:"bold 16px Orbitron",fill:"#666"},Ln={font:"bold 32px Helvetica, Arial",fill:"#999",boundsAlignH:"center"},Nn={font:"48px Orbitron",fill:"#fff",boundsAlignH:"center"},zn={font:"16px Orbitron",fill:"#757575",boundsAlignH:"center"},Jn=760,Wn=480,Un=J({paused:!1,end:!1,bonus:0,score:0,elapsedTime:1,playerVelocity:1,gameObjects:[],spawnQueue:[],timers:[]});function Xn(t,n,e,r,o,i,u){try{var a=t[i](u),c=a.value}catch(t){return void e(t)}a.done?n(c):Promise.resolve(c).then(r,o)}var Yn=function(t,n){t.refs={},t._state=new S(Un(n)),console.log("INIT STATE",t._state),t.groups=new wt(t.game,R(["default"],Object.values(It))),function(t){z(bn(t),Object.keys(o))}(t),window.sg=t},Kn=function(t){var n,e;t.refs.score=t.game.add.text(20,20,0,qn),t.refs.bonus=t.game.add.text(20,46,0,Hn),n=function(t,n){var e,r;return T(Vn(),{position:yt(t.world),input:On(t),events:(e=T((wn(r={},xn.Boost,Sn),wn(r,xn.FlipBonus,jn),r),n),Ut(t)(e))})}(t,fe()),dt(t)(n),t._state.timers=(e=Wt(t,function(){return le(t)}),U(t._state.timers)(e)),vn("gameOST")},Zn=function(t,n){var e;t._state.end&&nn(Xt.Restart,function(){console.log("PRESS F"),ae(t)},{}),e=te(t,n),n.$commit(e),Kt.$clean(),ue(t)},te=function(t,n){var e;return n.elapsedTime=n.end?n.elapsedTime:n.elapsedTime+P(t.game,1),n.gameObjects=oe(t)(n.gameObjects),n.timers=ht(t)(n.timers),n.gameObjects=(e=re(t,n.spawnQueue),R(n.gameObjects)(e)),n.spawnQueue=[],n.score=n.end?n.score:ee(t),n},ne=function(t){var n;return n=V(100,400,t.playerVelocity),q(0,20)(n)},ee=function(t){var n=t._state,e=t.game;return n.score+P(e,1)*n.elapsedTime*(ne(n)+1)},re=c_(function(t,n){var e,r;return r=n,e=I(function(t){return!t.sprite})(r),$(function(n){return pt(t,n)})(e)}),oe=c_(function(t,n){var e,r;return r=n,e=$(ie(t))(r),I(_t)(e)}),ie=c_(function(t,n){var e,r,o,i,u;return u=n,i=F("physicsEnabled")($t(P(t.game)))(u),o=F("update")(function(n){return n.update(t,n)})(i),r=F("events")(ce)(o),e=F("physicsEnabled")(Qt(t))(r),se(e)}),ue=function(t){var n,e;t.refs.score.text=(n=Math.floor(t._state.score),D(n));var r,o=(e=ne(t._state),r=e,Math.floor(10*r)/10);t.refs.bonus.text="x"+o},ae=function(t){return t.state.start("Game")},ce=function(t){var n,e,r;return r=t.sprite.getEventQueue(),e=$(t.events(t))(r),n=L(e),k(t)(n)},se=function(t){return t.sprite.commit(t)},fe=function(){return e=function(t,n){mn("gameOST"),pe(t)},(n=xn.Die)in(t={})?Object.defineProperty(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[n]=e,t;var t,n,e},le=function(t){var n;return n=V(0,60,t._state.elapsedTime),H(1,.15)(n)},pe=function(){var t,n=(t=regeneratorRuntime.mark(function t(n){var e;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,B(1500);case 2:return n.game.camera.shake(.04,120),gn("boost"),n.game.add.text(0,100,"SCORE",Ln).setTextBounds(0,0,n.game.width,100),t.next=8,B(500);case 8:return n.game.camera.shake(.04,120),gn("boost"),n.game.add.text(0,136,(e=Math.floor(n._state.score),D(e)),Nn).setTextBounds(0,0,n.game.width,100),t.next=14,B(500);case 14:n.game.add.text(0,200,"Press F to restart",zn).setTextBounds(0,0,n.game.width,100);case 16:case"end":return t.stop()}},t,this)}),function(){var n=this,e=arguments;return new Promise(function(r,o){var i=t.apply(n,e);function u(t){Xn(i,r,o,u,a,"next",t)}function a(t){Xn(i,r,o,u,a,"throw",t)}u(void 0)})});return function(t){return n.apply(this,arguments)}}(),ye={init:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};Yn(this,t)},create:function(){Kn(this,this._state)},update:function(){Zn(this,this._state)}};function de(t){return(de="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function he(t,n){return!n||"object"!==de(n)&&"function"!=typeof n?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):n}function ve(t){return(ve=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function me(t,n){return(me=Object.setPrototypeOf||function(t,n){return t.__proto__=n,t})(t,n)}new(function(t){function n(){var t;!function(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}(this,n);var e=document.documentElement,r=e.clientWidth>Jn?Jn:e.clientWidth,o=e.clientHeight>Wn?Wn:e.clientHeight;for(var u in t=he(this,ve(n).call(this,r,o,a.a.CANVAS,"content",null)),i)t.state.add(u,i[u],!1);return t.state.start("Splash"),t}return function(t,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(n&&n.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),n&&me(t,n)}(n,a.a.Game),n}())}});