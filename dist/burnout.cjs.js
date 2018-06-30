"use strict";var createMap=function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:20,o=(arguments.length>2&&void 0!==arguments[2]?arguments[2]:window).document.createElement("div");return t&&(o.style="\n      display: grid;\n      grid-template-columns: repeat("+t.cols+", "+n+"px);\n      grid-template-rows: repeat("+t.rows+", "+n+"px);\n      width: "+t.cols*n+"px;\n      height: "+t.rows*n+"px;\n      overflow: hidden;\n    "),o},createCamera=function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:20,o=(arguments.length>2&&void 0!==arguments[2]?arguments[2]:window).document.createElement("div");return t&&(o.style="\n      width: "+t.cols*n+"px;\n      height: "+t.rows*n+"px;\n    "),o},stringifyPosition=function(t){return"grid-area:\n    "+t.rowStart+" / \n    "+t.columnStart+" / \n    "+t.rowEnd+" / \n    "+t.columnEnd},createBlock=function(t){var n=(arguments.length>1&&void 0!==arguments[1]?arguments[1]:window).document.createElement("div");return t.className&&n.classList.add(t.className),t.position&&(n.style=stringifyPosition(t.position)),n},createAvatar=function(t){var n=(arguments.length>1&&void 0!==arguments[1]?arguments[1]:window).document.createElement("div");return t.className&&n.classList.add(t.className),t.position&&(n.style=stringifyPosition(t.position)),n},moveUp=function(t){return{rowStart:t.rowStart-1,columnStart:t.columnStart,rowEnd:t.rowEnd-1,columnEnd:t.columnEnd}},moveDown=function(t){return{rowStart:t.rowStart+1,columnStart:t.columnStart,rowEnd:t.rowEnd+1,columnEnd:t.columnEnd}},moveLeft=function(t){return{rowStart:t.rowStart,columnStart:t.columnStart-1,rowEnd:t.rowEnd,columnEnd:t.columnEnd-1}},moveRight=function(t){return{rowStart:t.rowStart,columnStart:t.columnStart+1,rowEnd:t.rowEnd,columnEnd:t.columnEnd+1}},allAxis=[{side:"up",movement:moveUp,updatedCameraPositionState:function(t,n){return t.y+=n}},{side:"down",movement:moveDown,updatedCameraPositionState:function(t,n){return t.y-=n}},{side:"left",movement:moveLeft,updatedCameraPositionState:function(t,n){return t.x+=n}},{side:"right",movement:moveRight,updatedCameraPositionState:function(t,n){return t.x-=n}}],wasBumped=function(t,n){var o=void 0;return{result:n.some(function(n){var e=t.columnStart===n.columnStart,r=t.columnEnd===n.columnEnd,i=t.rowStart===n.rowStart,a=t.rowEnd===n.rowEnd;return o=n,e&&r&&(i&&a)}),block:o}},stringifyTranslate=function(t){return"translate("+t.x+"px, "+t.y+"px)"},getBlockPositions=function(t){return{rowStart:t.rowStart,columnStart:t.columnStart,rowEnd:t.rowEnd,columnEnd:t.columnEnd}},movements=function(t,n,o,e,r){var i={currentAvatarPosition:t.startPosition,currentAvatarSide:null,currentCameraPosition:{x:0,y:0}},a=function(a){return function(){t.side&&!(i.currentAvatarSide===a.side)&&(t.ref.className=t.side[a.side],i.currentAvatarSide=a.side);var s=a.movement(i.currentAvatarPosition),l=wasBumped(s,o);if(l.result){if(l.block.action){var c=getBlockPositions(l.block);return l.block.action(c)}return!1}t.static&&(a.updatedCameraPositionState(i.currentCameraPosition,r),n.style.transform=stringifyTranslate(i.currentCameraPosition)),t.ref.style=stringifyPosition(s),i.currentAvatarPosition=s;var u=wasBumped(s,e);if(u.result&&u.block.action){var d=getBlockPositions(u.block);return u.block.action(d)}return!0}};return{up:a(allAxis[0]),down:a(allAxis[1]),left:a(allAxis[2]),right:a(allAxis[3])}},burnout=function(){var t={mapRef:null,viewRef:null,blocksRefs:[],collisionBlocksPositions:[],overBlocksPositions:[],blockSize:null,avatar:{ref:null,startPosition:null,side:null,static:!0}};return{defineMap:function(n){var o=createMap(n.map,n.blockSize),e=createCamera(n.view,n.blockSize);n.developer&&(o.style.border="1px solid",e.style.border="1px solid red",e.style.overflow="visible"),e.appendChild(o),t.viewRef=e,t.mapRef=o,t.blockSize=n.blockSize},defineBlock:function(n){var o=createBlock(n);n.collision&&t.collisionBlocksPositions.push(n.position),n.over&&t.overBlocksPositions.push(n.position),t.blocksRefs.push(o)},defineAvatar:function(n){var o=createAvatar(n);t.avatar.ref=o,t.avatar.startPosition=n.position,t.avatar.side=n.side,t.avatar.static=n.static},renderMap:function(n){t.blocksRefs.forEach(function(n){t.mapRef.appendChild(n)}),t.mapRef.appendChild(t.avatar.ref),n.appendChild(t.viewRef)},defineControlsPlugin:function(n){if(!n)return console.error("Burnout: No plugin added in defineControls() method");n(movements(t.avatar,t.mapRef,t.collisionBlocksPositions,t.overBlocksPositions,t.blockSize))},getAvatar:function(){return t.avatar.ref},getMap:function(){return t.mapRef},getView:function(){return t.viewRef},getBlock:function(n){return t.blocksRefs.filter(function(t){return stringifyPosition(n).replace(/\s/g,"")==t.style.cssText.replace(/\s/g,"").replace(/\;/g,"")})[0]}}},burnout$1=burnout();module.exports=burnout$1;
