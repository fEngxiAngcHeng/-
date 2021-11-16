(function($){
$.easyui={indexOfArray:function(a,o,id){
for(var i=0,_1=a.length;i<_1;i++){
if(id==undefined){
if(a[i]==o){
return i;
}
}else{
if(a[i][o]==id){
return i;
}
}
}
return -1;
},removeArrayItem:function(a,o,id){
if(typeof o=="string"){
for(var i=0,_2=a.length;i<_2;i++){
if(a[i][o]==id){
a.splice(i,1);
return;
}
}
}else{
var _3=this.indexOfArray(a,o);
if(_3!=-1){
a.splice(_3,1);
}
}
},addArrayItem:function(a,o,r){
var _4=this.indexOfArray(a,o,r?r[o]:undefined);
if(_4==-1){
a.push(r?r:o);
}else{
a[_4]=r?r:o;
}
},getArrayItem:function(a,o,id){
var _5=this.indexOfArray(a,o,id);
return _5==-1?null:a[_5];
},forEach:function(_6,_7,_8){
var _9=[];
for(var i=0;i<_6.length;i++){
_9.push(_6[i]);
}
while(_9.length){
var _a=_9.shift();
if(_8(_a)==false){
return;
}
if(_7&&_a.children){
for(var i=_a.children.length-1;i>=0;i--){
_9.unshift(_a.children[i]);
}
}
}
}};
$.parser={auto:true,onComplete:function(_b){
},plugins:["draggable","droppable","resizable","pagination","tooltip","linkbutton","menu","menubutton","splitbutton","switchbutton","progressbar","tree","textbox","passwordbox","filebox","combo","combobox","combotree","combogrid","combotreegrid","tagbox","numberbox","validatebox","searchbox","spinner","numberspinner","timespinner","datetimespinner","calendar","datebox","datetimebox","slider","layout","panel","datagrid","propertygrid","treegrid","datalist","tabs","accordion","window","dialog","form"],parse:function(_c){
var aa=[];
for(var i=0;i<$.parser.plugins.length;i++){
var _d=$.parser.plugins[i];
var r=$(".easyui-"+_d,_c);
if(r.length){
if(r[_d]){
r.each(function(){
$(this)[_d]($.data(this,"options")||{});
});
}else{
aa.push({name:_d,jq:r});
}
}
}
if(aa.length&&window.easyloader){
var _e=[];
for(var i=0;i<aa.length;i++){
_e.push(aa[i].name);
}
easyloader.load(_e,function(){
for(var i=0;i<aa.length;i++){
var _f=aa[i].name;
var jq=aa[i].jq;
jq.each(function(){
$(this)[_f]($.data(this,"options")||{});
});
}
$.parser.onComplete.call($.parser,_c);
});
}else{
$.parser.onComplete.call($.parser,_c);
}
},parseValue:function(_10,_11,_12,_13){
_13=_13||0;
var v=$.trim(String(_11||""));
var _14=v.substr(v.length-1,1);
if(_14=="%"){
v=parseFloat(v.substr(0,v.length-1));
if(_10.toLowerCase().indexOf("width")>=0){
v=Math.floor((_12.width()-_13)*v/100);
}else{
v=Math.floor((_12.height()-_13)*v/100);
}
}else{
v=parseInt(v)||undefined;
}
return v;
},parseOptions:function(_15,_16){
var t=$(_15);
var _17={};
var s=$.trim(t.attr("data-options"));
if(s){
if(s.substring(0,1)!="{"){
s="{"+s+"}";
}
_17=(new Function("return "+s))();
}
$.map(["width","height","left","top","minWidth","maxWidth","minHeight","maxHeight"],function(p){
var pv=$.trim(_15.style[p]||"");
if(pv){
if(pv.indexOf("%")==-1){
pv=parseInt(pv);
if(isNaN(pv)){
pv=undefined;
}
}
_17[p]=pv;
}
});
if(_16){
var _18={};
for(var i=0;i<_16.length;i++){
var pp=_16[i];
if(typeof pp=="string"){
_18[pp]=t.attr(pp);
}else{
for(var _19 in pp){
var _1a=pp[_19];
if(_1a=="boolean"){
_18[_19]=t.attr(_19)?(t.attr(_19)=="true"):undefined;
}else{
if(_1a=="number"){
_18[_19]=t.attr(_19)=="0"?0:parseFloat(t.attr(_19))||undefined;
}
}
}
}
}
$.extend(_17,_18);
}
return _17;
}};
$(function(){
var d=$("<div style=\"position:absolute;top:-1000px;width:100px;height:100px;padding:5px\"></div>").appendTo("body");
$._boxModel=d.outerWidth()!=100;
d.remove();
d=$("<div style=\"position:fixed\"></div>").appendTo("body");
$._positionFixed=(d.css("position")=="fixed");
d.remove();
if(!window.easyloader&&$.parser.auto){
$.parser.parse();
}
});
$.fn._outerWidth=function(_1b){
if(_1b==undefined){
if(this[0]==window){
return this.width()||document.body.clientWidth;
}
return this.outerWidth()||0;
}
return this._size("width",_1b);
};
$.fn._outerHeight=function(_1c){
if(_1c==undefined){
if(this[0]==window){
return this.height()||document.body.clientHeight;
}
return this.outerHeight()||0;
}
return this._size("height",_1c);
};
$.fn._scrollLeft=function(_1d){
if(_1d==undefined){
return this.scrollLeft();
}else{
return this.each(function(){
$(this).scrollLeft(_1d);
});
}
};
$.fn._propAttr=$.fn.prop||$.fn.attr;
$.fn._size=function(_1e,_1f){
if(typeof _1e=="string"){
if(_1e=="clear"){
return this.each(function(){
$(this).css({width:"",minWidth:"",maxWidth:"",height:"",minHeight:"",maxHeight:""});
});
}else{
if(_1e=="fit"){
return this.each(function(){
_20(this,this.tagName=="BODY"?$("body"):$(this).parent(),true);
});
}else{
if(_1e=="unfit"){
return this.each(function(){
_20(this,$(this).parent(),false);
});
}else{
if(_1f==undefined){
return _21(this[0],_1e);
}else{
return this.each(function(){
_21(this,_1e,_1f);
});
}
}
}
}
}else{
return this.each(function(){
_1f=_1f||$(this).parent();
$.extend(_1e,_20(this,_1f,_1e.fit)||{});
var r1=_22(this,"width",_1f,_1e);
var r2=_22(this,"height",_1f,_1e);
if(r1||r2){
$(this).addClass("easyui-fluid");
}else{
$(this).removeClass("easyui-fluid");
}
});
}
function _20(_23,_24,fit){
if(!_24.length){
return false;
}
var t=$(_23)[0];
var p=_24[0];
var _25=p.fcount||0;
if(fit){
if(!t.fitted){
t.fitted=true;
p.fcount=_25+1;
$(p).addClass("panel-noscroll");
if(p.tagName=="BODY"){
$("html").addClass("panel-fit");
}
}
return {width:($(p).width()||1),height:($(p).height()||1)};
}else{
if(t.fitted){
t.fitted=false;
p.fcount=_25-1;
if(p.fcount==0){
$(p).removeClass("panel-noscroll");
if(p.tagName=="BODY"){
$("html").removeClass("panel-fit");
}
}
}
return false;
}
};
function _22(_26,_27,_28,_29){
var t=$(_26);
var p=_27;
var p1=p.substr(0,1).toUpperCase()+p.substr(1);
var min=$.parser.parseValue("min"+p1,_29["min"+p1],_28);
var max=$.parser.parseValue("max"+p1,_29["max"+p1],_28);
var val=$.parser.parseValue(p,_29[p],_28);
var _2a=(String(_29[p]||"").indexOf("%")>=0?true:false);
if(!isNaN(val)){
var v=Math.min(Math.max(val,min||0),max||99999);
if(!_2a){
_29[p]=v;
}
t._size("min"+p1,"");
t._size("max"+p1,"");
t._size(p,v);
}else{
t._size(p,"");
t._size("min"+p1,min);
t._size("max"+p1,max);
}
return _2a||_29.fit;
};
function _21(_2b,_2c,_2d){
var t=$(_2b);
if(_2d==undefined){
_2d=parseInt(_2b.style[_2c]);
if(isNaN(_2d)){
return undefined;
}
if($._boxModel){
_2d+=_2e();
}
return _2d;
}else{
if(_2d===""){
t.css(_2c,"");
}else{
if($._boxModel){
_2d-=_2e();
if(_2d<0){
_2d=0;
}
}
t.css(_2c,_2d+"px");
}
}
function _2e(){
if(_2c.toLowerCase().indexOf("width")>=0){
return t.outerWidth()-t.width();
}else{
return t.outerHeight()-t.height();
}
};
};
};
})(jQuery);
(function($){
var _2f=null;
var _30=null;
var _31=false;
function _32(e){
if(e.touches.length!=1){
return;
}
if(!_31){
_31=true;
dblClickTimer=setTimeout(function(){
_31=false;
},500);
}else{
clearTimeout(dblClickTimer);
_31=false;
_33(e,"dblclick");
}
_2f=setTimeout(function(){
_33(e,"contextmenu",3);
},1000);
_33(e,"mousedown");
if($.fn.draggable.isDragging||$.fn.resizable.isResizing){
e.preventDefault();
}
};
function _34(e){
if(e.touches.length!=1){
return;
}
if(_2f){
clearTimeout(_2f);
}
_33(e,"mousemove");
if($.fn.draggable.isDragging||$.fn.resizable.isResizing){
e.preventDefault();
}
};
function _35(e){
if(_2f){
clearTimeout(_2f);
}
_33(e,"mouseup");
if($.fn.draggable.isDragging||$.fn.resizable.isResizing){
e.preventDefault();
}
};
function _33(e,_36,_37){
var _38=new $.Event(_36);
_38.pageX=e.changedTouches[0].pageX;
_38.pageY=e.changedTouches[0].pageY;
_38.which=_37||1;
$(e.target).trigger(_38);
};
if(document.addEventListener){
document.addEventListener("touchstart",_32,true);
document.addEventListener("touchmove",_34,true);
document.addEventListener("touchend",_35,true);
}
})(jQuery);
(function($){
function _39(e){
var _3a=$.data(e.data.target,"draggable");
var _3b=_3a.options;
var _3c=_3a.proxy;
var _3d=e.data;
var _3e=_3d.startLeft+e.pageX-_3d.startX;
var top=_3d.startTop+e.pageY-_3d.startY;
if(_3c){
if(_3c.parent()[0]==document.body){
if(_3b.deltaX!=null&&_3b.deltaX!=undefined){
_3e=e.pageX+_3b.deltaX;
}else{
_3e=e.pageX-e.data.offsetWidth;
}
if(_3b.deltaY!=null&&_3b.deltaY!=undefined){
top=e.pageY+_3b.deltaY;
}else{
top=e.pageY-e.data.offsetHeight;
}
}else{
if(_3b.deltaX!=null&&_3b.deltaX!=undefined){
_3e+=e.data.offsetWidth+_3b.deltaX;
}
if(_3b.deltaY!=null&&_3b.deltaY!=undefined){
top+=e.data.offsetHeight+_3b.deltaY;
}
}
}
if(e.data.parent!=document.body){
_3e+=$(e.data.parent).scrollLeft();
top+=$(e.data.parent).scrollTop();
}
if(_3b.axis=="h"){
_3d.left=_3e;
}else{
if(_3b.axis=="v"){
_3d.top=top;
}else{
_3d.left=_3e;
_3d.top=top;
}
}
};
function _3f(e){
var _40=$.data(e.data.target,"draggable");
var _41=_40.options;
var _42=_40.proxy;
if(!_42){
_42=$(e.data.target);
}
_42.css({left:e.data.left,top:e.data.top});
$("body").css("cursor",_41.cursor);
};
function _43(e){
if(!$.fn.draggable.isDragging){
return false;
}
var _44=$.data(e.data.target,"draggable");
var _45=_44.options;
var _46=$(".droppable:visible").filter(function(){
return e.data.target!=this;
}).filter(function(){
var _47=$.data(this,"droppable").options.accept;
if(_47){
return $(_47).filter(function(){
return this==e.data.target;
}).length>0;
}else{
return true;
}
});
_44.droppables=_46;
var _48=_44.proxy;
if(!_48){
if(_45.proxy){
if(_45.proxy=="clone"){
_48=$(e.data.target).clone().insertAfter(e.data.target);
}else{
_48=_45.proxy.call(e.data.target,e.data.target);
}
_44.proxy=_48;
}else{
_48=$(e.data.target);
}
}
_48.css("position","absolute");
_39(e);
_3f(e);
_45.onStartDrag.call(e.data.target,e);
return false;
};
function _49(e){
if(!$.fn.draggable.isDragging){
return false;
}
var _4a=$.data(e.data.target,"draggable");
_39(e);
if(_4a.options.onDrag.call(e.data.target,e)!=false){
_3f(e);
}
var _4b=e.data.target;
_4a.droppables.each(function(){
var _4c=$(this);
if(_4c.droppable("options").disabled){
return;
}
var p2=_4c.offset();
if(e.pageX>p2.left&&e.pageX<p2.left+_4c.outerWidth()&&e.pageY>p2.top&&e.pageY<p2.top+_4c.outerHeight()){
if(!this.entered){
$(this).trigger("_dragenter",[_4b]);
this.entered=true;
}
$(this).trigger("_dragover",[_4b]);
}else{
if(this.entered){
$(this).trigger("_dragleave",[_4b]);
this.entered=false;
}
}
});
return false;
};
function _4d(e){
if(!$.fn.draggable.isDragging){
_4e();
return false;
}
_49(e);
var _4f=$.data(e.data.target,"draggable");
var _50=_4f.proxy;
var _51=_4f.options;
if(_51.revert){
if(_52()==true){
$(e.data.target).css({position:e.data.startPosition,left:e.data.startLeft,top:e.data.startTop});
}else{
if(_50){
var _53,top;
if(_50.parent()[0]==document.body){
_53=e.data.startX-e.data.offsetWidth;
top=e.data.startY-e.data.offsetHeight;
}else{
_53=e.data.startLeft;
top=e.data.startTop;
}
_50.animate({left:_53,top:top},function(){
_54();
});
}else{
$(e.data.target).animate({left:e.data.startLeft,top:e.data.startTop},function(){
$(e.data.target).css("position",e.data.startPosition);
});
}
}
}else{
$(e.data.target).css({position:"absolute",left:e.data.left,top:e.data.top});
_52();
}
_51.onStopDrag.call(e.data.target,e);
_4e();
function _54(){
if(_50){
_50.remove();
}
_4f.proxy=null;
};
function _52(){
var _55=false;
_4f.droppables.each(function(){
var _56=$(this);
if(_56.droppable("options").disabled){
return;
}
var p2=_56.offset();
if(e.pageX>p2.left&&e.pageX<p2.left+_56.outerWidth()&&e.pageY>p2.top&&e.pageY<p2.top+_56.outerHeight()){
if(_51.revert){
$(e.data.target).css({position:e.data.startPosition,left:e.data.startLeft,top:e.data.startTop});
}
$(this).trigger("_drop",[e.data.target]);
_54();
_55=true;
this.entered=false;
return false;
}
});
if(!_55&&!_51.revert){
_54();
}
return _55;
};
return false;
};
function _4e(){
if($.fn.draggable.timer){
clearTimeout($.fn.draggable.timer);
$.fn.draggable.timer=undefined;
}
$(document).unbind(".draggable");
$.fn.draggable.isDragging=false;
setTimeout(function(){
$("body").css("cursor","");
},100);
};
$.fn.draggable=function(_57,_58){
if(typeof _57=="string"){
return $.fn.draggable.methods[_57](this,_58);
}
return this.each(function(){
var _59;
var _5a=$.data(this,"draggable");
if(_5a){
_5a.handle.unbind(".draggable");
_59=$.extend(_5a.options,_57);
}else{
_59=$.extend({},$.fn.draggable.defaults,$.fn.draggable.parseOptions(this),_57||{});
}
var _5b=_59.handle?(typeof _59.handle=="string"?$(_59.handle,this):_59.handle):$(this);
$.data(this,"draggable",{options:_59,handle:_5b});
if(_59.disabled){
$(this).css("cursor","");
return;
}
_5b.unbind(".draggable").bind("mousemove.draggable",{target:this},function(e){
if($.fn.draggable.isDragging){
return;
}
var _5c=$.data(e.data.target,"draggable").options;
if(_5d(e)){
$(this).css("cursor",_5c.cursor);
}else{
$(this).css("cursor","");
}
}).bind("mouseleave.draggable",{target:this},function(e){
$(this).css("cursor","");
}).bind("mousedown.draggable",{target:this},function(e){
if(_5d(e)==false){
return;
}
$(this).css("cursor","");
var _5e=$(e.data.target).position();
var _5f=$(e.data.target).offset();
var _60={startPosition:$(e.data.target).css("position"),startLeft:_5e.left,startTop:_5e.top,left:_5e.left,top:_5e.top,startX:e.pageX,startY:e.pageY,width:$(e.data.target).outerWidth(),height:$(e.data.target).outerHeight(),offsetWidth:(e.pageX-_5f.left),offsetHeight:(e.pageY-_5f.top),target:e.data.target,parent:$(e.data.target).parent()[0]};
$.extend(e.data,_60);
var _61=$.data(e.data.target,"draggable").options;
if(_61.onBeforeDrag.call(e.data.target,e)==false){
return;
}
$(document).bind("mousedown.draggable",e.data,_43);
$(document).bind("mousemove.draggable",e.data,_49);
$(document).bind("mouseup.draggable",e.data,_4d);
$.fn.draggable.timer=setTimeout(function(){
$.fn.draggable.isDragging=true;
_43(e);
},_61.delay);
return false;
});
function _5d(e){
var _62=$.data(e.data.target,"draggable");
var _63=_62.handle;
var _64=$(_63).offset();
var _65=$(_63).outerWidth();
var _66=$(_63).outerHeight();
var t=e.pageY-_64.top;
var r=_64.left+_65-e.pageX;
var b=_64.top+_66-e.pageY;
var l=e.pageX-_64.left;
return Math.min(t,r,b,l)>_62.options.edge;
};
});
};
$.fn.draggable.methods={options:function(jq){
return $.data(jq[0],"draggable").options;
},proxy:function(jq){
return $.data(jq[0],"draggable").proxy;
},enable:function(jq){
return jq.each(function(){
$(this).draggable({disabled:false});
});
},disable:function(jq){
return jq.each(function(){
$(this).draggable({disabled:true});
});
}};
$.fn.draggable.parseOptions=function(_67){
var t=$(_67);
return $.extend({},$.parser.parseOptions(_67,["cursor","handle","axis",{"revert":"boolean","deltaX":"number","deltaY":"number","edge":"number","delay":"number"}]),{disabled:(t.attr("disabled")?true:undefined)});
};
$.fn.draggable.defaults={proxy:null,revert:false,cursor:"move",deltaX:null,deltaY:null,handle:null,disabled:false,edge:0,axis:null,delay:100,onBeforeDrag:function(e){
},onStartDrag:function(e){
},onDrag:function(e){
},onStopDrag:function(e){
}};
$.fn.draggable.isDragging=false;
})(jQuery);
(function($){
function _68(_69){
$(_69).addClass("droppable");
$(_69).bind("_dragenter",function(e,_6a){
$.data(_69,"droppable").options.onDragEnter.apply(_69,[e,_6a]);
});
$(_69).bind("_dragleave",function(e,_6b){
$.data(_69,"droppable").options.onDragLeave.apply(_69,[e,_6b]);
});
$(_69).bind("_dragover",function(e,_6c){
$.data(_69,"droppable").options.onDragOver.apply(_69,[e,_6c]);
});
$(_69).bind("_drop",function(e,_6d){
$.data(_69,"droppable").options.onDrop.apply(_69,[e,_6d]);
});
};
$.fn.droppable=function(_6e,_6f){
if(typeof _6e=="string"){
return $.fn.droppable.methods[_6e](this,_6f);
}
_6e=_6e||{};
return this.each(function(){
var _70=$.data(this,"droppable");
if(_70){
$.extend(_70.options,_6e);
}else{
_68(this);
$.data(this,"droppable",{options:$.extend({},$.fn.droppable.defaults,$.fn.droppable.parseOptions(this),_6e)});
}
});
};
$.fn.droppable.methods={options:function(jq){
return $.data(jq[0],"droppable").options;
},enable:function(jq){
return jq.each(function(){
$(this).droppable({disabled:false});
});
},disable:function(jq){
return jq.each(function(){
$(this).droppable({disabled:true});
});
}};
$.fn.droppable.parseOptions=function(_71){
var t=$(_71);
return $.extend({},$.parser.parseOptions(_71,["accept"]),{disabled:(t.attr("disabled")?true:undefined)});
};
$.fn.droppable.defaults={accept:null,disabled:false,onDragEnter:function(e,_72){
},onDragOver:function(e,_73){
},onDragLeave:function(e,_74){
},onDrop:function(e,_75){
}};
})(jQuery);
(function($){
$.fn.resizable=function(_76,_77){
if(typeof _76=="string"){
return $.fn.resizable.methods[_76](this,_77);
}
function _78(e){
var _79=e.data;
var _7a=$.data(_79.target,"resizable").options;
if(_79.dir.indexOf("e")!=-1){
var _7b=_79.startWidth+e.pageX-_79.startX;
_7b=Math.min(Math.max(_7b,_7a.minWidth),_7a.maxWidth);
_79.width=_7b;
}
if(_79.dir.indexOf("s")!=-1){
var _7c=_79.startHeight+e.pageY-_79.startY;
_7c=Math.min(Math.max(_7c,_7a.minHeight),_7a.maxHeight);
_79.height=_7c;
}
if(_79.dir.indexOf("w")!=-1){
var _7b=_79.startWidth-e.pageX+_79.startX;
_7b=Math.min(Math.max(_7b,_7a.minWidth),_7a.maxWidth);
_79.width=_7b;
_79.left=_79.startLeft+_79.startWidth-_79.width;
}
if(_79.dir.indexOf("n")!=-1){
var _7c=_79.startHeight-e.pageY+_79.startY;
_7c=Math.min(Math.max(_7c,_7a.minHeight),_7a.maxHeight);
_79.height=_7c;
_79.top=_79.startTop+_79.startHeight-_79.height;
}
};
function _7d(e){
var _7e=e.data;
var t=$(_7e.target);
t.css({left:_7e.left,top:_7e.top});
if(t.outerWidth()!=_7e.width){
t._outerWidth(_7e.width);
}
if(t.outerHeight()!=_7e.height){
t._outerHeight(_7e.height);
}
};
function _7f(e){
$.fn.resizable.isResizing=true;
$.data(e.data.target,"resizable").options.onStartResize.call(e.data.target,e);
return false;
};
function _80(e){
_78(e);
if($.data(e.data.target,"resizable").options.onResize.call(e.data.target,e)!=false){
_7d(e);
}
return false;
};
function _81(e){
$.fn.resizable.isResizing=false;
_78(e,true);
_7d(e);
$.data(e.data.target,"resizable").options.onStopResize.call(e.data.target,e);
$(document).unbind(".resizable");
$("body").css("cursor","");
return false;
};
return this.each(function(){
var _82=null;
var _83=$.data(this,"resizable");
if(_83){
$(this).unbind(".resizable");
_82=$.extend(_83.options,_76||{});
}else{
_82=$.extend({},$.fn.resizable.defaults,$.fn.resizable.parseOptions(this),_76||{});
$.data(this,"resizable",{options:_82});
}
if(_82.disabled==true){
return;
}
$(this).bind("mousemove.resizable",{target:this},function(e){
if($.fn.resizable.isResizing){
return;
}
var dir=_84(e);
if(dir==""){
$(e.data.target).css("cursor","");
}else{
$(e.data.target).css("cursor",dir+"-resize");
}
}).bind("mouseleave.resizable",{target:this},function(e){
$(e.data.target).css("cursor","");
}).bind("mousedown.resizable",{target:this},function(e){
var dir=_84(e);
if(dir==""){
return;
}
function _85(css){
var val=parseInt($(e.data.target).css(css));
if(isNaN(val)){
return 0;
}else{
return val;
}
};
var _86={target:e.data.target,dir:dir,startLeft:_85("left"),startTop:_85("top"),left:_85("left"),top:_85("top"),startX:e.pageX,startY:e.pageY,startWidth:$(e.data.target).outerWidth(),startHeight:$(e.data.target).outerHeight(),width:$(e.data.target).outerWidth(),height:$(e.data.target).outerHeight(),deltaWidth:$(e.data.target).outerWidth()-$(e.data.target).width(),deltaHeight:$(e.data.target).outerHeight()-$(e.data.target).height()};
$(document).bind("mousedown.resizable",_86,_7f);
$(document).bind("mousemove.resizable",_86,_80);
$(document).bind("mouseup.resizable",_86,_81);
$("body").css("cursor",dir+"-resize");
});
function _84(e){
var tt=$(e.data.target);
var dir="";
var _87=tt.offset();
var _88=tt.outerWidth();
var _89=tt.outerHeight();
var _8a=_82.edge;
if(e.pageY>_87.top&&e.pageY<_87.top+_8a){
dir+="n";
}else{
if(e.pageY<_87.top+_89&&e.pageY>_87.top+_89-_8a){
dir+="s";
}
}
if(e.pageX>_87.left&&e.pageX<_87.left+_8a){
dir+="w";
}else{
if(e.pageX<_87.left+_88&&e.pageX>_87.left+_88-_8a){
dir+="e";
}
}
var _8b=_82.handles.split(",");
for(var i=0;i<_8b.length;i++){
var _8c=_8b[i].replace(/(^\s*)|(\s*$)/g,"");
if(_8c=="all"||_8c==dir){
return dir;
}
}
return "";
};
});
};
$.fn.resizable.methods={options:function(jq){
return $.data(jq[0],"resizable").options;
},enable:function(jq){
return jq.each(function(){
$(this).resizable({disabled:false});
});
},disable:function(jq){
return jq.each(function(){
$(this).resizable({disabled:true});
});
}};
$.fn.resizable.parseOptions=function(_8d){
var t=$(_8d);
return $.extend({},$.parser.parseOptions(_8d,["handles",{minWidth:"number",minHeight:"number",maxWidth:"number",maxHeight:"number",edge:"number"}]),{disabled:(t.attr("disabled")?true:undefined)});
};
$.fn.resizable.defaults={disabled:false,handles:"n, e, s, w, ne, se, sw, nw, all",minWidth:10,minHeight:10,maxWidth:10000,maxHeight:10000,edge:5,onStartResize:function(e){
},onResize:function(e){
},onStopResize:function(e){
}};
$.fn.resizable.isResizing=false;
})(jQuery);
(function($){
function _8e(_8f,_90){
var _91=$.data(_8f,"linkbutton").options;
if(_90){
$.extend(_91,_90);
}
if(_91.width||_91.height||_91.fit){
var btn=$(_8f);
var _92=btn.parent();
var _93=btn.is(":visible");
if(!_93){
var _94=$("<div style=\"display:none\"></div>").insertBefore(_8f);
var _95={position:btn.css("position"),display:btn.css("display"),left:btn.css("left")};
btn.appendTo("body");
btn.css({position:"absolute",display:"inline-block",left:-20000});
}
btn._size(_91,_92);
var _96=btn.find(".l-btn-left");
_96.css("margin-top",0);
_96.css("margin-top",parseInt((btn.height()-_96.height())/2)+"px");
if(!_93){
btn.insertAfter(_94);
btn.css(_95);
_94.remove();
}
}
};
function _97(_98){
var _99=$.data(_98,"linkbutton").options;
var t=$(_98).empty();
t.addClass("l-btn").removeClass("l-btn-plain l-btn-selected l-btn-plain-selected l-btn-outline");
t.removeClass("l-btn-small l-btn-medium l-btn-large").addClass("l-btn-"+_99.size);
if(_99.plain){
t.addClass("l-btn-plain");
}
if(_99.outline){
t.addClass("l-btn-outline");
}
if(_99.selected){
t.addClass(_99.plain?"l-btn-selected l-btn-plain-selected":"l-btn-selected");
}
t.attr("group",_99.group||"");
t.attr("id",_99.id||"");
var _9a=$("<span class=\"l-btn-left\"></span>").appendTo(t);
if(_99.text){
$("<span class=\"l-btn-text\"></span>").html(_99.text).appendTo(_9a);
}else{
$("<span class=\"l-btn-text l-btn-empty\">&nbsp;</span>").appendTo(_9a);
}
if(_99.iconCls){
$("<span class=\"l-btn-icon\">&nbsp;</span>").addClass(_99.iconCls).appendTo(_9a);
_9a.addClass("l-btn-icon-"+_99.iconAlign);
}
t.unbind(".linkbutton").bind("focus.linkbutton",function(){
if(!_99.disabled){
$(this).addClass("l-btn-focus");
}
}).bind("blur.linkbutton",function(){
$(this).removeClass("l-btn-focus");
}).bind("click.linkbutton",function(){
if(!_99.disabled){
if(_99.toggle){
if(_99.selected){
$(this).linkbutton("unselect");
}else{
$(this).linkbutton("select");
}
}
_99.onClick.call(this);
}
});
_9b(_98,_99.selected);
_9c(_98,_99.disabled);
};
function _9b(_9d,_9e){
var _9f=$.data(_9d,"linkbutton").options;
if(_9e){
if(_9f.group){
$("a.l-btn[group=\""+_9f.group+"\"]").each(function(){
var o=$(this).linkbutton("options");
if(o.toggle){
$(this).removeClass("l-btn-selected l-btn-plain-selected");
o.selected=false;
}
});
}
$(_9d).addClass(_9f.plain?"l-btn-selected l-btn-plain-selected":"l-btn-selected");
_9f.selected=true;
}else{
if(!_9f.group){
$(_9d).removeClass("l-btn-selected l-btn-plain-selected");
_9f.selected=false;
}
}
};
function _9c(_a0,_a1){
var _a2=$.data(_a0,"linkbutton");
var _a3=_a2.options;
$(_a0).removeClass("l-btn-disabled l-btn-plain-disabled");
if(_a1){
_a3.disabled=true;
var _a4=$(_a0).attr("href");
if(_a4){
_a2.href=_a4;
$(_a0).attr("href","javascript:;");
}
if(_a0.onclick){
_a2.onclick=_a0.onclick;
_a0.onclick=null;
}
_a3.plain?$(_a0).addClass("l-btn-disabled l-btn-plain-disabled"):$(_a0).addClass("l-btn-disabled");
}else{
_a3.disabled=false;
if(_a2.href){
$(_a0).attr("href",_a2.href);
}
if(_a2.onclick){
_a0.onclick=_a2.onclick;
}
}
};
$.fn.linkbutton=function(_a5,_a6){
if(typeof _a5=="string"){
return $.fn.linkbutton.methods[_a5](this,_a6);
}
_a5=_a5||{};
return this.each(function(){
var _a7=$.data(this,"linkbutton");
if(_a7){
$.extend(_a7.options,_a5);
}else{
$.data(this,"linkbutton",{options:$.extend({},$.fn.linkbutton.defaults,$.fn.linkbutton.parseOptions(this),_a5)});
$(this).removeAttr("disabled");
$(this).bind("_resize",function(e,_a8){
if($(this).hasClass("easyui-fluid")||_a8){
_8e(this);
}
return false;
});
}
_97(this);
_8e(this);
});
};
$.fn.linkbutton.methods={options:function(jq){
return $.data(jq[0],"linkbutton").options;
},resize:function(jq,_a9){
return jq.each(function(){
_8e(this,_a9);
});
},enable:function(jq){
return jq.each(function(){
_9c(this,false);
});
},disable:function(jq){
return jq.each(function(){
_9c(this,true);
});
},select:function(jq){
return jq.each(function(){
_9b(this,true);
});
},unselect:function(jq){
return jq.each(function(){
_9b(this,false);
});
}};
$.fn.linkbutton.parseOptions=function(_aa){
var t=$(_aa);
return $.extend({},$.parser.parseOptions(_aa,["id","iconCls","iconAlign","group","size","text",{plain:"boolean",toggle:"boolean",selected:"boolean",outline:"boolean"}]),{disabled:(t.attr("disabled")?true:undefined),text:($.trim(t.html())||undefined),iconCls:(t.attr("icon")||t.attr("iconCls"))});
};
$.fn.linkbutton.defaults={id:null,disabled:false,toggle:false,selected:false,outline:false,group:null,plain:false,text:"",iconCls:null,iconAlign:"left",size:"small",onClick:function(){
}};
})(jQuery);
(function($){
function _ab(_ac){
var _ad=$.data(_ac,"pagination");
var _ae=_ad.options;
var bb=_ad.bb={};
var _af=$(_ac).addClass("pagination").html("<table cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><tr></tr></table>");
var tr=_af.find("tr");
var aa=$.extend([],_ae.layout);
if(!_ae.showPageList){
_b0(aa,"list");
}
if(!_ae.showPageInfo){
_b0(aa,"info");
}
if(!_ae.showRefresh){
_b0(aa,"refresh");
}
if(aa[0]=="sep"){
aa.shift();
}
if(aa[aa.length-1]=="sep"){
aa.pop();
}
for(var _b1=0;_b1<aa.length;_b1++){
var _b2=aa[_b1];
if(_b2=="list"){
var ps=$("<select class=\"pagination-page-list\"></select>");
ps.bind("change",function(){
_ae.pageSize=parseInt($(this).val());
_ae.onChangePageSize.call(_ac,_ae.pageSize);
_b8(_ac,_ae.pageNumber);
});
for(var i=0;i<_ae.pageList.length;i++){
$("<option></option>").text(_ae.pageList[i]).appendTo(ps);
}
$("<td></td>").append(ps).appendTo(tr);
}else{
if(_b2=="sep"){
$("<td><div class=\"pagination-btn-separator\"></div></td>").appendTo(tr);
}else{
if(_b2=="first"){
bb.first=_b3("first");
}else{
if(_b2=="prev"){
bb.prev=_b3("prev");
}else{
if(_b2=="next"){
bb.next=_b3("next");
}else{
if(_b2=="last"){
bb.last=_b3("last");
}else{
if(_b2=="manual"){
$("<span style=\"padding-left:6px;\"></span>").html(_ae.beforePageText).appendTo(tr).wrap("<td></td>");
bb.num=$("<input class=\"pagination-num\" type=\"text\" value=\"1\" size=\"2\">").appendTo(tr).wrap("<td></td>");
bb.num.unbind(".pagination").bind("keydown.pagination",function(e){
if(e.keyCode==13){
var _b4=parseInt($(this).val())||1;
_b8(_ac,_b4);
return false;
}
});
bb.after=$("<span style=\"padding-right:6px;\"></span>").appendTo(tr).wrap("<td></td>");
}else{
if(_b2=="refresh"){
bb.refresh=_b3("refresh");
}else{
if(_b2=="links"){
$("<td class=\"pagination-links\"></td>").appendTo(tr);
}else{
if(_b2=="info"){
if(_b1==aa.length-1){
$("<div class=\"pagination-info\"></div>").appendTo(_af);
$("<div style=\"clear:both;\"></div>").appendTo(_af);
}else{
$("<td><div class=\"pagination-info\"></div></td>").appendTo(tr);
}
}
}
}
}
}
}
}
}
}
}
}
if(_ae.buttons){
$("<td><div class=\"pagination-btn-separator\"></div></td>").appendTo(tr);
if($.isArray(_ae.buttons)){
for(var i=0;i<_ae.buttons.length;i++){
var btn=_ae.buttons[i];
if(btn=="-"){
$("<td><div class=\"pagination-btn-separator\"></div></td>").appendTo(tr);
}else{
var td=$("<td></td>").appendTo(tr);
var a=$("<a href=\"javascript:;\"></a>").appendTo(td);
a[0].onclick=eval(btn.handler||function(){
});
a.linkbutton($.extend({},btn,{plain:true}));
}
}
}else{
var td=$("<td></td>").appendTo(tr);
$(_ae.buttons).appendTo(td).show();
}
}
function _b3(_b5){
var btn=_ae.nav[_b5];
var a=$("<a href=\"javascript:;\"></a>").appendTo(tr);
a.wrap("<td></td>");
a.linkbutton({iconCls:btn.iconCls,plain:true}).unbind(".pagination").bind("click.pagination",function(){
btn.handler.call(_ac);
});
return a;
};
function _b0(aa,_b6){
var _b7=$.inArray(_b6,aa);
if(_b7>=0){
aa.splice(_b7,1);
}
return aa;
};
};
function _b8(_b9,_ba){
var _bb=$.data(_b9,"pagination").options;
_bc(_b9,{pageNumber:_ba});
_bb.onSelectPage.call(_b9,_bb.pageNumber,_bb.pageSize);
};
function _bc(_bd,_be){
var _bf=$.data(_bd,"pagination");
var _c0=_bf.options;
var bb=_bf.bb;
$.extend(_c0,_be||{});
var ps=$(_bd).find("select.pagination-page-list");
if(ps.length){
ps.val(_c0.pageSize+"");
_c0.pageSize=parseInt(ps.val());
}
var _c1=Math.ceil(_c0.total/_c0.pageSize)||1;
if(_c0.pageNumber<1){
_c0.pageNumber=1;
}
if(_c0.pageNumber>_c1){
_c0.pageNumber=_c1;
}
if(_c0.total==0){
_c0.pageNumber=0;
_c1=0;
}
if(bb.num){
bb.num.val(_c0.pageNumber);
}
if(bb.after){
bb.after.html(_c0.afterPageText.replace(/{pages}/,_c1));
}
var td=$(_bd).find("td.pagination-links");
if(td.length){
td.empty();
var _c2=_c0.pageNumber-Math.floor(_c0.links/2);
if(_c2<1){
_c2=1;
}
var _c3=_c2+_c0.links-1;
if(_c3>_c1){
_c3=_c1;
}
_c2=_c3-_c0.links+1;
if(_c2<1){
_c2=1;
}
for(var i=_c2;i<=_c3;i++){
var a=$("<a class=\"pagination-link\" href=\"javascript:;\"></a>").appendTo(td);
a.linkbutton({plain:true,text:i});
if(i==_c0.pageNumber){
a.linkbutton("select");
}else{
a.unbind(".pagination").bind("click.pagination",{pageNumber:i},function(e){
_b8(_bd,e.data.pageNumber);
});
}
}
}
var _c4=_c0.displayMsg;
_c4=_c4.replace(/{from}/,_c0.total==0?0:_c0.pageSize*(_c0.pageNumber-1)+1);
_c4=_c4.replace(/{to}/,Math.min(_c0.pageSize*(_c0.pageNumber),_c0.total));
_c4=_c4.replace(/{total}/,_c0.total);
$(_bd).find("div.pagination-info").html(_c4);
if(bb.first){
bb.first.linkbutton({disabled:((!_c0.total)||_c0.pageNumber==1)});
}
if(bb.prev){
bb.prev.linkbutton({disabled:((!_c0.total)||_c0.pageNumber==1)});
}
if(bb.next){
bb.next.linkbutton({disabled:(_c0.pageNumber==_c1)});
}
if(bb.last){
bb.last.linkbutton({disabled:(_c0.pageNumber==_c1)});
}
_c5(_bd,_c0.loading);
};
function _c5(_c6,_c7){
var _c8=$.data(_c6,"pagination");
var _c9=_c8.options;
_c9.loading=_c7;
if(_c9.showRefresh&&_c8.bb.refresh){
_c8.bb.refresh.linkbutton({iconCls:(_c9.loading?"pagination-loading":"pagination-load")});
}
};
$.fn.pagination=function(_ca,_cb){
if(typeof _ca=="string"){
return $.fn.pagination.methods[_ca](this,_cb);
}
_ca=_ca||{};
return this.each(function(){
var _cc;
var _cd=$.data(this,"pagination");
if(_cd){
_cc=$.extend(_cd.options,_ca);
}else{
_cc=$.extend({},$.fn.pagination.defaults,$.fn.pagination.parseOptions(this),_ca);
$.data(this,"pagination",{options:_cc});
}
_ab(this);
_bc(this);
});
};
$.fn.pagination.methods={options:function(jq){
return $.data(jq[0],"pagination").options;
},loading:function(jq){
return jq.each(function(){
_c5(this,true);
});
},loaded:function(jq){
return jq.each(function(){
_c5(this,false);
});
},refresh:function(jq,_ce){
return jq.each(function(){
_bc(this,_ce);
});
},select:function(jq,_cf){
return jq.each(function(){
_b8(this,_cf);
});
}};
$.fn.pagination.parseOptions=function(_d0){
var t=$(_d0);
return $.extend({},$.parser.parseOptions(_d0,[{total:"number",pageSize:"number",pageNumber:"number",links:"number"},{loading:"boolean",showPageList:"boolean",showPageInfo:"boolean",showRefresh:"boolean"}]),{pageList:(t.attr("pageList")?eval(t.attr("pageList")):undefined)});
};
$.fn.pagination.defaults={total:1,pageSize:10,pageNumber:1,pageList:[10,20,30,50],loading:false,buttons:null,showPageList:true,showPageInfo:true,showRefresh:true,links:10,layout:["list","sep","first","prev","sep","manual","sep","next","last","sep","refresh","info"],onSelectPage:function(_d1,_d2){
},onBeforeRefresh:function(_d3,_d4){
},onRefresh:function(_d5,_d6){
},onChangePageSize:function(_d7){
},beforePageText:"Page",afterPageText:"of {pages}",displayMsg:"Displaying {from} to {to} of {total} items",nav:{first:{iconCls:"pagination-first",handler:function(){
var _d8=$(this).pagination("options");
if(_d8.pageNumber>1){
$(this).pagination("select",1);
}
}},prev:{iconCls:"pagination-prev",handler:function(){
var _d9=$(this).pagination("options");
if(_d9.pageNumber>1){
$(this).pagination("select",_d9.pageNumber-1);
}
}},next:{iconCls:"pagination-next",handler:function(){
var _da=$(this).pagination("options");
var _db=Math.ceil(_da.total/_da.pageSize);
if(_da.pageNumber<_db){
$(this).pagination("select",_da.pageNumber+1);
}
}},last:{iconCls:"pagination-last",handler:function(){
var _dc=$(this).pagination("options");
var _dd=Math.ceil(_dc.total/_dc.pageSize);
if(_dc.pageNumber<_dd){
$(this).pagination("select",_dd);
}
}},refresh:{iconCls:"pagination-refresh",handler:function(){
var _de=$(this).pagination("options");
if(_de.onBeforeRefresh.call(this,_de.pageNumber,_de.pageSize)!=false){
$(this).pagination("select",_de.pageNumber);
_de.onRefresh.call(this,_de.pageNumber,_de.pageSize);
}
}}}};
})(jQuery);
(function($){
function _df(_e0){
var _e1=$(_e0);
_e1.addClass("tree");
return _e1;
};
function _e2(_e3){
var _e4=$.data(_e3,"tree").options;
$(_e3).unbind().bind("mouseover",function(e){
var tt=$(e.target);
var _e5=tt.closest("div.tree-node");
if(!_e5.length){
return;
}
_e5.addClass("tree-node-hover");
if(tt.hasClass("tree-hit")){
if(tt.hasClass("tree-expanded")){
tt.addClass("tree-expanded-hover");
}else{
tt.addClass("tree-collapsed-hover");
}
}
e.stopPropagation();
}).bind("mouseout",function(e){
var tt=$(e.target);
var _e6=tt.closest("div.tree-node");
if(!_e6.length){
return;
}
_e6.removeClass("tree-node-hover");
if(tt.hasClass("tree-hit")){
if(tt.hasClass("tree-expanded")){
tt.removeClass("tree-expanded-hover");
}else{
tt.removeClass("tree-collapsed-hover");
}
}
e.stopPropagation();
}).bind("click",function(e){
var tt=$(e.target);
var _e7=tt.closest("div.tree-node");
if(!_e7.length){
return;
}
if(tt.hasClass("tree-hit")){
_145(_e3,_e7[0]);
return false;
}else{
if(tt.hasClass("tree-checkbox")){
_10c(_e3,_e7[0]);
return false;
}else{
_188(_e3,_e7[0]);
_e4.onClick.call(_e3,_ea(_e3,_e7[0]));
}
}
e.stopPropagation();
}).bind("dblclick",function(e){
var _e8=$(e.target).closest("div.tree-node");
if(!_e8.length){
return;
}
_188(_e3,_e8[0]);
_e4.onDblClick.call(_e3,_ea(_e3,_e8[0]));
e.stopPropagation();
}).bind("contextmenu",function(e){
var _e9=$(e.target).closest("div.tree-node");
if(!_e9.length){
return;
}
_e4.onContextMenu.call(_e3,e,_ea(_e3,_e9[0]));
e.stopPropagation();
});
};
function _eb(_ec){
var _ed=$.data(_ec,"tree").options;
_ed.dnd=false;
var _ee=$(_ec).find("div.tree-node");
_ee.draggable("disable");
_ee.css("cursor","pointer");
};
function _ef(_f0){
var _f1=$.data(_f0,"tree");
var _f2=_f1.options;
var _f3=_f1.tree;
_f1.disabledNodes=[];
_f2.dnd=true;
_f3.find("div.tree-node").draggable({disabled:false,revert:true,cursor:"pointer",proxy:function(_f4){
var p=$("<div class=\"tree-node-proxy\"></div>").appendTo("body");
p.html("<span class=\"tree-dnd-icon tree-dnd-no\">&nbsp;</span>"+$(_f4).find(".tree-title").html());
p.hide();
return p;
},deltaX:15,deltaY:15,onBeforeDrag:function(e){
if(_f2.onBeforeDrag.call(_f0,_ea(_f0,this))==false){
return false;
}
if($(e.target).hasClass("tree-hit")||$(e.target).hasClass("tree-checkbox")){
return false;
}
if(e.which!=1){
return false;
}
var _f5=$(this).find("span.tree-indent");
if(_f5.length){
e.data.offsetWidth-=_f5.length*_f5.width();
}
},onStartDrag:function(e){
$(this).next("ul").find("div.tree-node").each(function(){
$(this).droppable("disable");
_f1.disabledNodes.push(this);
});
$(this).draggable("proxy").css({left:-10000,top:-10000});
_f2.onStartDrag.call(_f0,_ea(_f0,this));
var _f6=_ea(_f0,this);
if(_f6.id==undefined){
_f6.id="easyui_tree_node_id_temp";
_12c(_f0,_f6);
}
_f1.draggingNodeId=_f6.id;
},onDrag:function(e){
var x1=e.pageX,y1=e.pageY,x2=e.data.startX,y2=e.data.startY;
var d=Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));
if(d>3){
$(this).draggable("proxy").show();
}
this.pageY=e.pageY;
},onStopDrag:function(){
for(var i=0;i<_f1.disabledNodes.length;i++){
$(_f1.disabledNodes[i]).droppable("enable");
}
_f1.disabledNodes=[];
var _f7=_182(_f0,_f1.draggingNodeId);
if(_f7&&_f7.id=="easyui_tree_node_id_temp"){
_f7.id="";
_12c(_f0,_f7);
}
_f2.onStopDrag.call(_f0,_f7);
}}).droppable({accept:"div.tree-node",onDragEnter:function(e,_f8){
if(_f2.onDragEnter.call(_f0,this,_f9(_f8))==false){
_fa(_f8,false);
$(this).removeClass("tree-node-append tree-node-top tree-node-bottom");
$(this).droppable("disable");
_f1.disabledNodes.push(this);
}
},onDragOver:function(e,_fb){
if($(this).droppable("options").disabled){
return;
}
var _fc=_fb.pageY;
var top=$(this).offset().top;
var _fd=top+$(this).outerHeight();
_fa(_fb,true);
$(this).removeClass("tree-node-append tree-node-top tree-node-bottom");
if(_fc>top+(_fd-top)/2){
if(_fd-_fc<5){
$(this).addClass("tree-node-bottom");
}else{
$(this).addClass("tree-node-append");
}
}else{
if(_fc-top<5){
$(this).addClass("tree-node-top");
}else{
$(this).addClass("tree-node-append");
}
}
if(_f2.onDragOver.call(_f0,this,_f9(_fb))==false){
_fa(_fb,false);
$(this).removeClass("tree-node-append tree-node-top tree-node-bottom");
$(this).droppable("disable");
_f1.disabledNodes.push(this);
}
},onDragLeave:function(e,_fe){
_fa(_fe,false);
$(this).removeClass("tree-node-append tree-node-top tree-node-bottom");
_f2.onDragLeave.call(_f0,this,_f9(_fe));
},onDrop:function(e,_ff){
var dest=this;
var _100,_101;
if($(this).hasClass("tree-node-append")){
_100=_102;
_101="append";
}else{
_100=_103;
_101=$(this).hasClass("tree-node-top")?"top":"bottom";
}
if(_f2.onBeforeDrop.call(_f0,dest,_f9(_ff),_101)==false){
$(this).removeClass("tree-node-append tree-node-top tree-node-bottom");
return;
}
_100(_ff,dest,_101);
$(this).removeClass("tree-node-append tree-node-top tree-node-bottom");
}});
function _f9(_104,pop){
return $(_104).closest("ul.tree").tree(pop?"pop":"getData",_104);
};
function _fa(_105,_106){
var icon=$(_105).draggable("proxy").find("span.tree-dnd-icon");
icon.removeClass("tree-dnd-yes tree-dnd-no").addClass(_106?"tree-dnd-yes":"tree-dnd-no");
};
function _102(_107,dest){
if(_ea(_f0,dest).state=="closed"){
_13d(_f0,dest,function(){
_108();
});
}else{
_108();
}
function _108(){
var node=_f9(_107,true);
$(_f0).tree("append",{parent:dest,data:[node]});
_f2.onDrop.call(_f0,dest,node,"append");
};
};
function _103(_109,dest,_10a){
var _10b={};
if(_10a=="top"){
_10b.before=dest;
}else{
_10b.after=dest;
}
var node=_f9(_109,true);
_10b.data=node;
$(_f0).tree("insert",_10b);
_f2.onDrop.call(_f0,dest,node,_10a);
};
};
function _10c(_10d,_10e,_10f,_110){
var _111=$.data(_10d,"tree");
var opts=_111.options;
if(!opts.checkbox){
return;
}
var _112=_ea(_10d,_10e);
if(!_112.checkState){
return;
}
var ck=$(_10e).find(".tree-checkbox");
if(_10f==undefined){
if(ck.hasClass("tree-checkbox1")){
_10f=false;
}else{
if(ck.hasClass("tree-checkbox0")){
_10f=true;
}else{
if(_112._checked==undefined){
_112._checked=$(_10e).find(".tree-checkbox").hasClass("tree-checkbox1");
}
_10f=!_112._checked;
}
}
}
_112._checked=_10f;
if(_10f){
if(ck.hasClass("tree-checkbox1")){
return;
}
}else{
if(ck.hasClass("tree-checkbox0")){
return;
}
}
if(!_110){
if(opts.onBeforeCheck.call(_10d,_112,_10f)==false){
return;
}
}
if(opts.cascadeCheck){
_113(_10d,_112,_10f);
_114(_10d,_112);
}else{
_115(_10d,_112,_10f?"1":"0");
}
if(!_110){
opts.onCheck.call(_10d,_112,_10f);
}
};
function _113(_116,_117,_118){
var opts=$.data(_116,"tree").options;
var flag=_118?1:0;
_115(_116,_117,flag);
if(opts.deepCheck){
$.easyui.forEach(_117.children||[],true,function(n){
_115(_116,n,flag);
});
}else{
var _119=[];
if(_117.children&&_117.children.length){
_119.push(_117);
}
$.easyui.forEach(_117.children||[],true,function(n){
if(!n.hidden){
_115(_116,n,flag);
if(n.children&&n.children.length){
_119.push(n);
}
}
});
for(var i=_119.length-1;i>=0;i--){
var node=_119[i];
_115(_116,node,_11a(node));
}
}
};
function _115(_11b,_11c,flag){
var opts=$.data(_11b,"tree").options;
if(!_11c.checkState||flag==undefined){
return;
}
if(_11c.hidden&&!opts.deepCheck){
return;
}
var ck=$("#"+_11c.domId).find(".tree-checkbox");
_11c.checkState=["unchecked","checked","indeterminate"][flag];
_11c.checked=(_11c.checkState=="checked");
ck.removeClass("tree-checkbox0 tree-checkbox1 tree-checkbox2");
ck.addClass("tree-checkbox"+flag);
};
function _114(_11d,_11e){
var pd=_11f(_11d,$("#"+_11e.domId)[0]);
if(pd){
_115(_11d,pd,_11a(pd));
_114(_11d,pd);
}
};
function _11a(row){
var c0=0;
var c1=0;
var len=0;
$.easyui.forEach(row.children||[],false,function(r){
if(r.checkState){
len++;
if(r.checkState=="checked"){
c1++;
}else{
if(r.checkState=="unchecked"){
c0++;
}
}
}
});
if(len==0){
return undefined;
}
var flag=0;
if(c0==len){
flag=0;
}else{
if(c1==len){
flag=1;
}else{
flag=2;
}
}
return flag;
};
function _120(_121,_122){
var opts=$.data(_121,"tree").options;
if(!opts.checkbox){
return;
}
var node=$(_122);
var ck=node.find(".tree-checkbox");
var _123=_ea(_121,_122);
if(opts.view.hasCheckbox(_121,_123)){
if(!ck.length){
_123.checkState=_123.checkState||"unchecked";
$("<span class=\"tree-checkbox\"></span>").insertBefore(node.find(".tree-title"));
}
if(_123.checkState=="checked"){
_10c(_121,_122,true,true);
}else{
if(_123.checkState=="unchecked"){
_10c(_121,_122,false,true);
}else{
var flag=_11a(_123);
if(flag===0){
_10c(_121,_122,false,true);
}else{
if(flag===1){
_10c(_121,_122,true,true);
}
}
}
}
}else{
ck.remove();
_123.checkState=undefined;
_123.checked=undefined;
_114(_121,_123);
}
};
function _124(_125,ul,data,_126,_127){
var _128=$.data(_125,"tree");
var opts=_128.options;
var _129=$(ul).prevAll("div.tree-node:first");
data=opts.loadFilter.call(_125,data,_129[0]);
var _12a=_12b(_125,"domId",_129.attr("id"));
if(!_126){
_12a?_12a.children=data:_128.data=data;
$(ul).empty();
}else{
if(_12a){
_12a.children?_12a.children=_12a.children.concat(data):_12a.children=data;
}else{
_128.data=_128.data.concat(data);
}
}
opts.view.render.call(opts.view,_125,ul,data);
if(opts.dnd){
_ef(_125);
}
if(_12a){
_12c(_125,_12a);
}
for(var i=0;i<_128.tmpIds.length;i++){
_10c(_125,$("#"+_128.tmpIds[i])[0],true,true);
}
_128.tmpIds=[];
setTimeout(function(){
_12d(_125,_125);
},0);
if(!_127){
opts.onLoadSuccess.call(_125,_12a,data);
}
};
function _12d(_12e,ul,_12f){
var opts=$.data(_12e,"tree").options;
if(opts.lines){
$(_12e).addClass("tree-lines");
}else{
$(_12e).removeClass("tree-lines");
return;
}
if(!_12f){
_12f=true;
$(_12e).find("span.tree-indent").removeClass("tree-line tree-join tree-joinbottom");
$(_12e).find("div.tree-node").removeClass("tree-node-last tree-root-first tree-root-one");
var _130=$(_12e).tree("getRoots");
if(_130.length>1){
$(_130[0].target).addClass("tree-root-first");
}else{
if(_130.length==1){
$(_130[0].target).addClass("tree-root-one");
}
}
}
$(ul).children("li").each(function(){
var node=$(this).children("div.tree-node");
var ul=node.next("ul");
if(ul.length){
if($(this).next().length){
_131(node);
}
_12d(_12e,ul,_12f);
}else{
_132(node);
}
});
var _133=$(ul).children("li:last").children("div.tree-node").addClass("tree-node-last");
_133.children("span.tree-join").removeClass("tree-join").addClass("tree-joinbottom");
function _132(node,_134){
var icon=node.find("span.tree-icon");
icon.prev("span.tree-indent").addClass("tree-join");
};
function _131(node){
var _135=node.find("span.tree-indent, span.tree-hit").length;
node.next().find("div.tree-node").each(function(){
$(this).children("span:eq("+(_135-1)+")").addClass("tree-line");
});
};
};
function _136(_137,ul,_138,_139){
var opts=$.data(_137,"tree").options;
_138=$.extend({},opts.queryParams,_138||{});
var _13a=null;
if(_137!=ul){
var node=$(ul).prev();
_13a=_ea(_137,node[0]);
}
if(opts.onBeforeLoad.call(_137,_13a,_138)==false){
return;
}
var _13b=$(ul).prev().children("span.tree-folder");
_13b.addClass("tree-loading");
var _13c=opts.loader.call(_137,_138,function(data){
_13b.removeClass("tree-loading");
_124(_137,ul,data);
if(_139){
_139();
}
},function(){
_13b.removeClass("tree-loading");
opts.onLoadError.apply(_137,arguments);
if(_139){
_139();
}
});
if(_13c==false){
_13b.removeClass("tree-loading");
}
};
function _13d(_13e,_13f,_140){
var opts=$.data(_13e,"tree").options;
var hit=$(_13f).children("span.tree-hit");
if(hit.length==0){
return;
}
if(hit.hasClass("tree-expanded")){
return;
}
var node=_ea(_13e,_13f);
if(opts.onBeforeExpand.call(_13e,node)==false){
return;
}
hit.removeClass("tree-collapsed tree-collapsed-hover").addClass("tree-expanded");
hit.next().addClass("tree-folder-open");
var ul=$(_13f).next();
if(ul.length){
if(opts.animate){
ul.slideDown("normal",function(){
node.state="open";
opts.onExpand.call(_13e,node);
if(_140){
_140();
}
});
}else{
ul.css("display","block");
node.state="open";
opts.onExpand.call(_13e,node);
if(_140){
_140();
}
}
}else{
var _141=$("<ul style=\"display:none\"></ul>").insertAfter(_13f);
_136(_13e,_141[0],{id:node.id},function(){
if(_141.is(":empty")){
_141.remove();
}
if(opts.animate){
_141.slideDown("normal",function(){
node.state="open";
opts.onExpand.call(_13e,node);
if(_140){
_140();
}
});
}else{
_141.css("display","block");
node.state="open";
opts.onExpand.call(_13e,node);
if(_140){
_140();
}
}
});
}
};
function _142(_143,_144){
var opts=$.data(_143,"tree").options;
var hit=$(_144).children("span.tree-hit");
if(hit.length==0){
return;
}
if(hit.hasClass("tree-collapsed")){
return;
}
var node=_ea(_143,_144);
if(opts.onBeforeCollapse.call(_143,node)==false){
return;
}
hit.removeClass("tree-expanded tree-expanded-hover").addClass("tree-collapsed");
hit.next().removeClass("tree-folder-open");
var ul=$(_144).next();
if(opts.animate){
ul.slideUp("normal",function(){
node.state="closed";
opts.onCollapse.call(_143,node);
});
}else{
ul.css("display","none");
node.state="closed";
opts.onCollapse.call(_143,node);
}
};
function _145(_146,_147){
var hit=$(_147).children("span.tree-hit");
if(hit.length==0){
return;
}
if(hit.hasClass("tree-expanded")){
_142(_146,_147);
}else{
_13d(_146,_147);
}
};
function _148(_149,_14a){
var _14b=_14c(_149,_14a);
if(_14a){
_14b.unshift(_ea(_149,_14a));
}
for(var i=0;i<_14b.length;i++){
_13d(_149,_14b[i].target);
}
};
function _14d(_14e,_14f){
var _150=[];
var p=_11f(_14e,_14f);
while(p){
_150.unshift(p);
p=_11f(_14e,p.target);
}
for(var i=0;i<_150.length;i++){
_13d(_14e,_150[i].target);
}
};
function _151(_152,_153){
var c=$(_152).parent();
while(c[0].tagName!="BODY"&&c.css("overflow-y")!="auto"){
c=c.parent();
}
var n=$(_153);
var ntop=n.offset().top;
if(c[0].tagName!="BODY"){
var ctop=c.offset().top;
if(ntop<ctop){
c.scrollTop(c.scrollTop()+ntop-ctop);
}else{
if(ntop+n.outerHeight()>ctop+c.outerHeight()-18){
c.scrollTop(c.scrollTop()+ntop+n.outerHeight()-ctop-c.outerHeight()+18);
}
}
}else{
c.scrollTop(ntop);
}
};
function _154(_155,_156){
var _157=_14c(_155,_156);
if(_156){
_157.unshift(_ea(_155,_156));
}
for(var i=0;i<_157.length;i++){
_142(_155,_157[i].target);
}
};
function _158(_159,_15a){
var node=$(_15a.parent);
var data=_15a.data;
if(!data){
return;
}
data=$.isArray(data)?data:[data];
if(!data.length){
return;
}
var ul;
if(node.length==0){
ul=$(_159);
}else{
if(_15b(_159,node[0])){
var _15c=node.find("span.tree-icon");
_15c.removeClass("tree-file").addClass("tree-folder tree-folder-open");
var hit=$("<span class=\"tree-hit tree-expanded\"></span>").insertBefore(_15c);
if(hit.prev().length){
hit.prev().remove();
}
}
ul=node.next();
if(!ul.length){
ul=$("<ul></ul>").insertAfter(node);
}
}
_124(_159,ul[0],data,true,true);
};
function _15d(_15e,_15f){
var ref=_15f.before||_15f.after;
var _160=_11f(_15e,ref);
var data=_15f.data;
if(!data){
return;
}
data=$.isArray(data)?data:[data];
if(!data.length){
return;
}
_158(_15e,{parent:(_160?_160.target:null),data:data});
var _161=_160?_160.children:$(_15e).tree("getRoots");
for(var i=0;i<_161.length;i++){
if(_161[i].domId==$(ref).attr("id")){
for(var j=data.length-1;j>=0;j--){
_161.splice((_15f.before?i:(i+1)),0,data[j]);
}
_161.splice(_161.length-data.length,data.length);
break;
}
}
var li=$();
for(var i=0;i<data.length;i++){
li=li.add($("#"+data[i].domId).parent());
}
if(_15f.before){
li.insertBefore($(ref).parent());
}else{
li.insertAfter($(ref).parent());
}
};
function _162(_163,_164){
var _165=del(_164);
$(_164).parent().remove();
if(_165){
if(!_165.children||!_165.children.length){
var node=$(_165.target);
node.find(".tree-icon").removeClass("tree-folder").addClass("tree-file");
node.find(".tree-hit").remove();
$("<span class=\"tree-indent\"></span>").prependTo(node);
node.next().remove();
}
_12c(_163,_165);
}
_12d(_163,_163);
function del(_166){
var id=$(_166).attr("id");
var _167=_11f(_163,_166);
var cc=_167?_167.children:$.data(_163,"tree").data;
for(var i=0;i<cc.length;i++){
if(cc[i].domId==id){
cc.splice(i,1);
break;
}
}
return _167;
};
};
function _12c(_168,_169){
var opts=$.data(_168,"tree").options;
var node=$(_169.target);
var data=_ea(_168,_169.target);
if(data.iconCls){
node.find(".tree-icon").removeClass(data.iconCls);
}
$.extend(data,_169);
node.find(".tree-title").html(opts.formatter.call(_168,data));
if(data.iconCls){
node.find(".tree-icon").addClass(data.iconCls);
}
_120(_168,_169.target);
};
function _16a(_16b,_16c){
if(_16c){
var p=_11f(_16b,_16c);
while(p){
_16c=p.target;
p=_11f(_16b,_16c);
}
return _ea(_16b,_16c);
}else{
var _16d=_16e(_16b);
return _16d.length?_16d[0]:null;
}
};
function _16e(_16f){
var _170=$.data(_16f,"tree").data;
for(var i=0;i<_170.length;i++){
_171(_170[i]);
}
return _170;
};
function _14c(_172,_173){
var _174=[];
var n=_ea(_172,_173);
var data=n?(n.children||[]):$.data(_172,"tree").data;
$.easyui.forEach(data,true,function(node){
_174.push(_171(node));
});
return _174;
};
function _11f(_175,_176){
var p=$(_176).closest("ul").prevAll("div.tree-node:first");
return _ea(_175,p[0]);
};
function _177(_178,_179){
_179=_179||"checked";
if(!$.isArray(_179)){
_179=[_179];
}
var _17a=[];
$.easyui.forEach($.data(_178,"tree").data,true,function(n){
if(n.checkState&&$.easyui.indexOfArray(_179,n.checkState)!=-1){
_17a.push(_171(n));
}
});
return _17a;
};
function _17b(_17c){
var node=$(_17c).find("div.tree-node-selected");
return node.length?_ea(_17c,node[0]):null;
};
function _17d(_17e,_17f){
var data=_ea(_17e,_17f);
if(data&&data.children){
$.easyui.forEach(data.children,true,function(node){
_171(node);
});
}
return data;
};
function _ea(_180,_181){
return _12b(_180,"domId",$(_181).attr("id"));
};
function _182(_183,id){
return _12b(_183,"id",id);
};
function _12b(_184,_185,_186){
var data=$.data(_184,"tree").data;
var _187=null;
$.easyui.forEach(data,true,function(node){
if(node[_185]==_186){
_187=_171(node);
return false;
}
});
return _187;
};
function _171(node){
node.target=$("#"+node.domId)[0];
return node;
};
function _188(_189,_18a){
var opts=$.data(_189,"tree").options;
var node=_ea(_189,_18a);
if(opts.onBeforeSelect.call(_189,node)==false){
return;
}
$(_189).find("div.tree-node-selected").removeClass("tree-node-selected");
$(_18a).addClass("tree-node-selected");
opts.onSelect.call(_189,node);
};
function _15b(_18b,_18c){
return $(_18c).children("span.tree-hit").length==0;
};
function _18d(_18e,_18f){
var opts=$.data(_18e,"tree").options;
var node=_ea(_18e,_18f);
if(opts.onBeforeEdit.call(_18e,node)==false){
return;
}
$(_18f).css("position","relative");
var nt=$(_18f).find(".tree-title");
var _190=nt.outerWidth();
nt.empty();
var _191=$("<input class=\"tree-editor\">").appendTo(nt);
_191.val(node.text).focus();
_191.width(_190+20);
_191._outerHeight(18);
_191.bind("click",function(e){
return false;
}).bind("mousedown",function(e){
e.stopPropagation();
}).bind("mousemove",function(e){
e.stopPropagation();
}).bind("keydown",function(e){
if(e.keyCode==13){
_192(_18e,_18f);
return false;
}else{
if(e.keyCode==27){
_196(_18e,_18f);
return false;
}
}
}).bind("blur",function(e){
e.stopPropagation();
_192(_18e,_18f);
});
};
function _192(_193,_194){
var opts=$.data(_193,"tree").options;
$(_194).css("position","");
var _195=$(_194).find("input.tree-editor");
var val=_195.val();
_195.remove();
var node=_ea(_193,_194);
node.text=val;
_12c(_193,node);
opts.onAfterEdit.call(_193,node);
};
function _196(_197,_198){
var opts=$.data(_197,"tree").options;
$(_198).css("position","");
$(_198).find("input.tree-editor").remove();
var node=_ea(_197,_198);
_12c(_197,node);
opts.onCancelEdit.call(_197,node);
};
function _199(_19a,q){
var _19b=$.data(_19a,"tree");
var opts=_19b.options;
var ids={};
$.easyui.forEach(_19b.data,true,function(node){
if(opts.filter.call(_19a,q,node)){
$("#"+node.domId).removeClass("tree-node-hidden");
ids[node.domId]=1;
node.hidden=false;
}else{
$("#"+node.domId).addClass("tree-node-hidden");
node.hidden=true;
}
});
for(var id in ids){
_19c(id);
}
function _19c(_19d){
var p=$(_19a).tree("getParent",$("#"+_19d)[0]);
while(p){
$(p.target).removeClass("tree-node-hidden");
p.hidden=false;
p=$(_19a).tree("getParent",p.target);
}
};
};
$.fn.tree=function(_19e,_19f){
if(typeof _19e=="string"){
return $.fn.tree.methods[_19e](this,_19f);
}
var _19e=_19e||{};
return this.each(function(){
var _1a0=$.data(this,"tree");
var opts;
if(_1a0){
opts=$.extend(_1a0.options,_19e);
_1a0.options=opts;
}else{
opts=$.extend({},$.fn.tree.defaults,$.fn.tree.parseOptions(this),_19e);
$.data(this,"tree",{options:opts,tree:_df(this),data:[],tmpIds:[]});
var data=$.fn.tree.parseData(this);
if(data.length){
_124(this,this,data);
}
}
_e2(this);
if(opts.data){
_124(this,this,$.extend(true,[],opts.data));
}
_136(this,this);
});
};
$.fn.tree.methods={options:function(jq){
return $.data(jq[0],"tree").options;
},loadData:function(jq,data){
return jq.each(function(){
_124(this,this,data);
});
},getNode:function(jq,_1a1){
return _ea(jq[0],_1a1);
},getData:function(jq,_1a2){
return _17d(jq[0],_1a2);
},reload:function(jq,_1a3){
return jq.each(function(){
if(_1a3){
var node=$(_1a3);
var hit=node.children("span.tree-hit");
hit.removeClass("tree-expanded tree-expanded-hover").addClass("tree-collapsed");
node.next().remove();
_13d(this,_1a3);
}else{
$(this).empty();
_136(this,this);
}
});
},getRoot:function(jq,_1a4){
return _16a(jq[0],_1a4);
},getRoots:function(jq){
return _16e(jq[0]);
},getParent:function(jq,_1a5){
return _11f(jq[0],_1a5);
},getChildren:function(jq,_1a6){
return _14c(jq[0],_1a6);
},getChecked:function(jq,_1a7){
return _177(jq[0],_1a7);
},getSelected:function(jq){
return _17b(jq[0]);
},isLeaf:function(jq,_1a8){
return _15b(jq[0],_1a8);
},find:function(jq,id){
return _182(jq[0],id);
},select:function(jq,_1a9){
return jq.each(function(){
_188(this,_1a9);
});
},check:function(jq,_1aa){
return jq.each(function(){
_10c(this,_1aa,true);
});
},uncheck:function(jq,_1ab){
return jq.each(function(){
_10c(this,_1ab,false);
});
},collapse:function(jq,_1ac){
return jq.each(function(){
_142(this,_1ac);
});
},expand:function(jq,_1ad){
return jq.each(function(){
_13d(this,_1ad);
});
},collapseAll:function(jq,_1ae){
return jq.each(function(){
_154(this,_1ae);
});
},expandAll:function(jq,_1af){
return jq.each(function(){
_148(this,_1af);
});
},expandTo:function(jq,_1b0){
return jq.each(function(){
_14d(this,_1b0);
});
},scrollTo:function(jq,_1b1){
return jq.each(function(){
_151(this,_1b1);
});
},toggle:function(jq,_1b2){
return jq.each(function(){
_145(this,_1b2);
});
},append:function(jq,_1b3){
return jq.each(function(){
_158(this,_1b3);
});
},insert:function(jq,_1b4){
return jq.each(function(){
_15d(this,_1b4);
});
},remove:function(jq,_1b5){
return jq.each(function(){
_162(this,_1b5);
});
},pop:function(jq,_1b6){
var node=jq.tree("getData",_1b6);
jq.tree("remove",_1b6);
return node;
},update:function(jq,_1b7){
return jq.each(function(){
_12c(this,$.extend({},_1b7,{checkState:_1b7.checked?"checked":(_1b7.checked===false?"unchecked":undefined)}));
});
},enableDnd:function(jq){
return jq.each(function(){
_ef(this);
});
},disableDnd:function(jq){
return jq.each(function(){
_eb(this);
});
},beginEdit:function(jq,_1b8){
return jq.each(function(){
_18d(this,_1b8);
});
},endEdit:function(jq,_1b9){
return jq.each(function(){
_192(this,_1b9);
});
},cancelEdit:function(jq,_1ba){
return jq.each(function(){
_196(this,_1ba);
});
},doFilter:function(jq,q){
return jq.each(function(){
_199(this,q);
});
}};
$.fn.tree.parseOptions=function(_1bb){
var t=$(_1bb);
return $.extend({},$.parser.parseOptions(_1bb,["url","method",{checkbox:"boolean",cascadeCheck:"boolean",onlyLeafCheck:"boolean"},{animate:"boolean",lines:"boolean",dnd:"boolean"}]));
};
$.fn.tree.parseData=function(_1bc){
var data=[];
_1bd(data,$(_1bc));
return data;
function _1bd(aa,tree){
tree.children("li").each(function(){
var node=$(this);
var item=$.extend({},$.parser.parseOptions(this,["id","iconCls","state"]),{checked:(node.attr("checked")?true:undefined)});
item.text=node.children("span").html();
if(!item.text){
item.text=node.html();
}
var _1be=node.children("ul");
if(_1be.length){
item.children=[];
_1bd(item.children,_1be);
}
aa.push(item);
});
};
};
var _1bf=1;
var _1c0={render:function(_1c1,ul,data){
var _1c2=$.data(_1c1,"tree");
var opts=_1c2.options;
var _1c3=$(ul).prev(".tree-node");
var _1c4=_1c3.length?$(_1c1).tree("getNode",_1c3[0]):null;
var _1c5=_1c3.find("span.tree-indent, span.tree-hit").length;
var cc=_1c6.call(this,_1c5,data);
$(ul).append(cc.join(""));
function _1c6(_1c7,_1c8){
var cc=[];
for(var i=0;i<_1c8.length;i++){
var item=_1c8[i];
if(item.state!="open"&&item.state!="closed"){
item.state="open";
}
item.domId="_easyui_tree_"+_1bf++;
cc.push("<li>");
cc.push("<div id=\""+item.domId+"\" class=\"tree-node\">");
for(var j=0;j<_1c7;j++){
cc.push("<span class=\"tree-indent\"></span>");
}
if(item.state=="closed"){
cc.push("<span class=\"tree-hit tree-collapsed\"></span>");
cc.push("<span class=\"tree-icon tree-folder "+(item.iconCls?item.iconCls:"")+"\"></span>");
}else{
if(item.children&&item.children.length){
cc.push("<span class=\"tree-hit tree-expanded\"></span>");
cc.push("<span class=\"tree-icon tree-folder tree-folder-open "+(item.iconCls?item.iconCls:"")+"\"></span>");
}else{
cc.push("<span class=\"tree-indent\"></span>");
cc.push("<span class=\"tree-icon tree-file "+(item.iconCls?item.iconCls:"")+"\"></span>");
}
}
if(this.hasCheckbox(_1c1,item)){
var flag=0;
if(_1c4&&_1c4.checkState=="checked"&&opts.cascadeCheck){
flag=1;
item.checked=true;
}else{
if(item.checked){
$.easyui.addArrayItem(_1c2.tmpIds,item.domId);
}
}
item.checkState=flag?"checked":"unchecked";
cc.push("<span class=\"tree-checkbox tree-checkbox"+flag+"\"></span>");
}else{
item.checkState=undefined;
item.checked=undefined;
}
cc.push("<span class=\"tree-title\">"+opts.formatter.call(_1c1,item)+"</span>");
cc.push("</div>");
if(item.children&&item.children.length){
var tmp=_1c6.call(this,_1c7+1,item.children);
cc.push("<ul style=\"display:"+(item.state=="closed"?"none":"block")+"\">");
cc=cc.concat(tmp);
cc.push("</ul>");
}
cc.push("</li>");
}
return cc;
};
},hasCheckbox:function(_1c9,item){
var _1ca=$.data(_1c9,"tree");
var opts=_1ca.options;
if(opts.checkbox){
if($.isFunction(opts.checkbox)){
if(opts.checkbox.call(_1c9,item)){
return true;
}else{
return false;
}
}else{
if(opts.onlyLeafCheck){
if(item.state=="open"&&!(item.children&&item.children.length)){
return true;
}
}else{
return true;
}
}
}
return false;
}};
$.fn.tree.defaults={url:null,method:"post",animate:false,checkbox:false,cascadeCheck:true,onlyLeafCheck:false,lines:false,dnd:false,data:null,queryParams:{},formatter:function(node){
return node.text;
},filter:function(q,node){
var qq=[];
$.map($.isArray(q)?q:[q],function(q){
q=$.trim(q);
if(q){
qq.push(q);
}
});
for(var i=0;i<qq.length;i++){
var _1cb=node.text.toLowerCase().indexOf(qq[i].toLowerCase());
if(_1cb>=0){
return true;
}
}
return !qq.length;
},loader:function(_1cc,_1cd,_1ce){
var opts=$(this).tree("options");
if(!opts.url){
return false;
}
$.ajax({type:opts.method,url:opts.url,data:_1cc,dataType:"json",success:function(data){
_1cd(data);
},error:function(){
_1ce.apply(this,arguments);
}});
},loadFilter:function(data,_1cf){
return data;
},view:_1c0,onBeforeLoad:function(node,_1d0){
},onLoadSuccess:function(node,data){
},onLoadError:function(){
},onClick:function(node){
},onDblClick:function(node){
},onBeforeExpand:function(node){
},onExpand:function(node){
},onBeforeCollapse:function(node){
},onCollapse:function(node){
},onBeforeCheck:function(node,_1d1){
},onCheck:function(node,_1d2){
},onBeforeSelect:function(node){
},onSelect:function(node){
},onContextMenu:function(e,node){
},onBeforeDrag:function(node){
},onStartDrag:function(node){
},onStopDrag:function(node){
},onDragEnter:function(_1d3,_1d4){
},onDragOver:function(_1d5,_1d6){
},onDragLeave:function(_1d7,_1d8){
},onBeforeDrop:function(_1d9,_1da,_1db){
},onDrop:function(_1dc,_1dd,_1de){
},onBeforeEdit:function(node){
},onAfterEdit:function(node){
},onCancelEdit:function(node){
}};
})(jQuery);
(function($){
function init(_1df){
$(_1df).addClass("progressbar");
$(_1df).html("<div class=\"progressbar-text\"></div><div class=\"progressbar-value\"><div class=\"progressbar-text\"></div></div>");
$(_1df).bind("_resize",function(e,_1e0){
if($(this).hasClass("easyui-fluid")||_1e0){
_1e1(_1df);
}
return false;
});
return $(_1df);
};
function _1e1(_1e2,_1e3){
var opts=$.data(_1e2,"progressbar").options;
var bar=$.data(_1e2,"progressbar").bar;
if(_1e3){
opts.width=_1e3;
}
bar._size(opts);
bar.find("div.progressbar-text").css("width",bar.width());
bar.find("div.progressbar-text,div.progressbar-value").css({height:bar.height()+"px",lineHeight:bar.height()+"px"});
};
$.fn.progressbar=function(_1e4,_1e5){
if(typeof _1e4=="string"){
var _1e6=$.fn.progressbar.methods[_1e4];
if(_1e6){
return _1e6(this,_1e5);
}
}
_1e4=_1e4||{};
return this.each(function(){
var _1e7=$.data(this,"progressbar");
if(_1e7){
$.extend(_1e7.options,_1e4);
}else{
_1e7=$.data(this,"progressbar",{options:$.extend({},$.fn.progressbar.defaults,$.fn.progressbar.parseOptions(this),_1e4),bar:init(this)});
}
$(this).progressbar("setValue",_1e7.options.value);
_1e1(this);
});
};
$.fn.progressbar.methods={options:function(jq){
return $.data(jq[0],"progressbar").options;
},resize:function(jq,_1e8){
return jq.each(function(){
_1e1(this,_1e8);
});
},getValue:function(jq){
return $.data(jq[0],"progressbar").options.value;
},setValue:function(jq,_1e9){
if(_1e9<0){
_1e9=0;
}
if(_1e9>100){
_1e9=100;
}
return jq.each(function(){
var opts=$.data(this,"progressbar").options;
var text=opts.text.replace(/{value}/,_1e9);
var _1ea=opts.value;
opts.value=_1e9;
$(this).find("div.progressbar-value").width(_1e9+"%");
$(this).find("div.progressbar-text").html(text);
if(_1ea!=_1e9){
opts.onChange.call(this,_1e9,_1ea);
}
});
}};
$.fn.progressbar.parseOptions=function(_1eb){
return $.extend({},$.parser.parseOptions(_1eb,["width","height","text",{value:"number"}]));
};
$.fn.progressbar.defaults={width:"auto",height:22,value:0,text:"{value}%",onChange:function(_1ec,_1ed){
}};
})(jQuery);
(function($){
function init(_1ee){
$(_1ee).addClass("tooltip-f");
};
function _1ef(_1f0){
var opts=$.data(_1f0,"tooltip").options;
$(_1f0).unbind(".tooltip").bind(opts.showEvent+".tooltip",function(e){
$(_1f0).tooltip("show",e);
}).bind(opts.hideEvent+".tooltip",function(e){
$(_1f0).tooltip("hide",e);
}).bind("mousemove.tooltip",function(e){
if(opts.trackMouse){
opts.trackMouseX=e.pageX;
opts.trackMouseY=e.pageY;
$(_1f0).tooltip("reposition");
}
});
};
function _1f1(_1f2){
var _1f3=$.data(_1f2,"tooltip");
if(_1f3.showTimer){
clearTimeout(_1f3.showTimer);
_1f3.showTimer=null;
}
if(_1f3.hideTimer){
clearTimeout(_1f3.hideTimer);
_1f3.hideTimer=null;
}
};
function _1f4(_1f5){
var _1f6=$.data(_1f5,"tooltip");
if(!_1f6||!_1f6.tip){
return;
}
var opts=_1f6.options;
var tip=_1f6.tip;
var pos={left:-100000,top:-100000};
if($(_1f5).is(":visible")){
pos=_1f7(opts.position);
if(opts.position=="top"&&pos.top<0){
pos=_1f7("bottom");
}else{
if((opts.position=="bottom")&&(pos.top+tip._outerHeight()>$(window)._outerHeight()+$(document).scrollTop())){
pos=_1f7("top");
}
}
if(pos.left<0){
if(opts.position=="left"){
pos=_1f7("right");
}else{
$(_1f5).tooltip("arrow").css("left",tip._outerWidth()/2+pos.left);
pos.left=0;
}
}else{
if(pos.left+tip._outerWidth()>$(window)._outerWidth()+$(document)._scrollLeft()){
if(opts.position=="right"){
pos=_1f7("left");
}else{
var left=pos.left;
pos.left=$(window)._outerWidth()+$(document)._scrollLeft()-tip._outerWidth();
$(_1f5).tooltip("arrow").css("left",tip._outerWidth()/2-(pos.left-left));
}
}
}
}
tip.css({left:pos.left,top:pos.top,zIndex:(opts.zIndex!=undefined?opts.zIndex:($.fn.window?$.fn.window.defaults.zIndex++:""))});
opts.onPosition.call(_1f5,pos.left,pos.top);
function _1f7(_1f8){
opts.position=_1f8||"bottom";
tip.removeClass("tooltip-top tooltip-bottom tooltip-left tooltip-right").addClass("tooltip-"+opts.position);
var left,top;
var _1f9=$.isFunction(opts.deltaX)?opts.deltaX.call(_1f5,opts.position):opts.deltaX;
var _1fa=$.isFunction(opts.deltaY)?opts.deltaY.call(_1f5,opts.position):opts.deltaY;
if(opts.trackMouse){
t=$();
left=opts.trackMouseX+_1f9;
top=opts.trackMouseY+_1fa;
}else{
var t=$(_1f5);
left=t.offset().left+_1f9;
top=t.offset().top+_1fa;
}
switch(opts.position){
case "right":
left+=t._outerWidth()+12+(opts.trackMouse?12:0);
top-=(tip._outerHeight()-t._outerHeight())/2;
break;
case "left":
left-=tip._outerWidth()+12+(opts.trackMouse?12:0);
top-=(tip._outerHeight()-t._outerHeight())/2;
break;
case "top":
left-=(tip._outerWidth()-t._outerWidth())/2;
top-=tip._outerHeight()+12+(opts.trackMouse?12:0);
break;
case "bottom":
left-=(tip._outerWidth()-t._outerWidth())/2;
top+=t._outerHeight()+12+(opts.trackMouse?12:0);
break;
}
return {left:left,top:top};
};
};
function _1fb(_1fc,e){
var _1fd=$.data(_1fc,"tooltip");
var opts=_1fd.options;
var tip=_1fd.tip;
if(!tip){
tip=$("<div tabindex=\"-1\" class=\"tooltip\">"+"<div class=\"tooltip-content\"></div>"+"<div class=\"tooltip-arrow-outer\"></div>"+"<div class=\"tooltip-arrow\"></div>"+"</div>").appendTo("body");
_1fd.tip=tip;
_1fe(_1fc);
}
_1f1(_1fc);
_1fd.showTimer=setTimeout(function(){
$(_1fc).tooltip("reposition");
tip.show();
opts.onShow.call(_1fc,e);
var _1ff=tip.children(".tooltip-arrow-outer");
var _200=tip.children(".tooltip-arrow");
var bc="border-"+opts.position+"-color";
_1ff.add(_200).css({borderTopColor:"",borderBottomColor:"",borderLeftColor:"",borderRightColor:""});
_1ff.css(bc,tip.css(bc));
_200.css(bc,tip.css("backgroundColor"));
},opts.showDelay);
};
function _201(_202,e){
var _203=$.data(_202,"tooltip");
if(_203&&_203.tip){
_1f1(_202);
_203.hideTimer=setTimeout(function(){
_203.tip.hide();
_203.options.onHide.call(_202,e);
},_203.options.hideDelay);
}
};
function _1fe(_204,_205){
var _206=$.data(_204,"tooltip");
var opts=_206.options;
if(_205){
opts.content=_205;
}
if(!_206.tip){
return;
}
var cc=typeof opts.content=="function"?opts.content.call(_204):opts.content;
_206.tip.children(".tooltip-content").html(cc);
opts.onUpdate.call(_204,cc);
};
function _207(_208){
var _209=$.data(_208,"tooltip");
if(_209){
_1f1(_208);
var opts=_209.options;
if(_209.tip){
_209.tip.remove();
}
if(opts._title){
$(_208).attr("title",opts._title);
}
$.removeData(_208,"tooltip");
$(_208).unbind(".tooltip").removeClass("tooltip-f");
opts.onDestroy.call(_208);
}
};
$.fn.tooltip=function(_20a,_20b){
if(typeof _20a=="string"){
return $.fn.tooltip.methods[_20a](this,_20b);
}
_20a=_20a||{};
return this.each(function(){
var _20c=$.data(this,"tooltip");
if(_20c){
$.extend(_20c.options,_20a);
}else{
$.data(this,"tooltip",{options:$.extend({},$.fn.tooltip.defaults,$.fn.tooltip.parseOptions(this),_20a)});
init(this);
}
_1ef(this);
_1fe(this);
});
};
$.fn.tooltip.methods={options:function(jq){
return $.data(jq[0],"tooltip").options;
},tip:function(jq){
return $.data(jq[0],"tooltip").tip;
},arrow:function(jq){
return jq.tooltip("tip").children(".tooltip-arrow-outer,.tooltip-arrow");
},show:function(jq,e){
return jq.each(function(){
_1fb(this,e);
});
},hide:function(jq,e){
return jq.each(function(){
_201(this,e);
});
},update:function(jq,_20d){
return jq.each(function(){
_1fe(this,_20d);
});
},reposition:function(jq){
return jq.each(function(){
_1f4(this);
});
},destroy:function(jq){
return jq.each(function(){
_207(this);
});
}};
$.fn.tooltip.parseOptions=function(_20e){
var t=$(_20e);
var opts=$.extend({},$.parser.parseOptions(_20e,["position","showEvent","hideEvent","content",{trackMouse:"boolean",deltaX:"number",deltaY:"number",showDelay:"number",hideDelay:"number"}]),{_title:t.attr("title")});
t.attr("title","");
if(!opts.content){
opts.content=opts._title;
}
return opts;
};
$.fn.tooltip.defaults={position:"bottom",content:null,trackMouse:false,deltaX:0,deltaY:0,showEvent:"mouseenter",hideEvent:"mouseleave",showDelay:200,hideDelay:100,onShow:function(e){
},onHide:function(e){
},onUpdate:function(_20f){
},onPosition:function(left,top){
},onDestroy:function(){
}};
})(jQuery);
(function($){
$.fn._remove=function(){
return this.each(function(){
$(this).remove();
try{
this.outerHTML="";
}
catch(err){
}
});
};
function _210(node){
node._remove();
};
function _211(_212,_213){
var _214=$.data(_212,"panel");
var opts=_214.options;
var _215=_214.panel;
var _216=_215.children(".panel-header");
var _217=_215.children(".panel-body");
var _218=_215.children(".panel-footer");
var _219=(opts.halign=="left"||opts.halign=="right");
if(_213){
$.extend(opts,{width:_213.width,height:_213.height,minWidth:_213.minWidth,maxWidth:_213.maxWidth,minHeight:_213.minHeight,maxHeight:_213.maxHeight,left:_213.left,top:_213.top});
}
_215._size(opts);
if(!_219){
_216._outerWidth(_215.width());
}
_217._outerWidth(_215.width());
if(!isNaN(parseInt(opts.height))){
if(_219){
if(opts.header){
var _21a=$(opts.header)._outerWidth();
}else{
_216.css("width","");
var _21a=_216._outerWidth();
}
var _21b=_216.find(".panel-title");
_21a+=Math.min(_21b._outerWidth(),_21b._outerHeight());
var _21c=_215.height();
_216._outerWidth(_21a)._outerHeight(_21c);
_21b._outerWidth(_216.height());
_217._outerWidth(_215.width()-_21a-_218._outerWidth())._outerHeight(_21c);
_218._outerHeight(_21c);
_217.css({left:"",right:""}).css(opts.halign,(_216.position()[opts.halign]+_21a)+"px");
opts.panelCssWidth=_215.css("width");
if(opts.collapsed){
_215._outerWidth(_21a+_218._outerWidth());
}
}else{
_217._outerHeight(_215.height()-_216._outerHeight()-_218._outerHeight());
}
}else{
_217.css("height","");
var min=$.parser.parseValue("minHeight",opts.minHeight,_215.parent());
var max=$.parser.parseValue("maxHeight",opts.maxHeight,_215.parent());
var _21d=_216._outerHeight()+_218._outerHeight()+_215._outerHeight()-_215.height();
_217._size("minHeight",min?(min-_21d):"");
_217._size("maxHeight",max?(max-_21d):"");
}
_215.css({height:(_219?undefined:""),minHeight:"",maxHeight:"",left:opts.left,top:opts.top});
opts.onResize.apply(_212,[opts.width,opts.height]);
$(_212).panel("doLayout");
};
function _21e(_21f,_220){
var _221=$.data(_21f,"panel");
var opts=_221.options;
var _222=_221.panel;
if(_220){
if(_220.left!=null){
opts.left=_220.left;
}
if(_220.top!=null){
opts.top=_220.top;
}
}
_222.css({left:opts.left,top:opts.top});
_222.find(".tooltip-f").each(function(){
$(this).tooltip("reposition");
});
opts.onMove.apply(_21f,[opts.left,opts.top]);
};
function _223(_224){
$(_224).addClass("panel-body")._size("clear");
var _225=$("<div class=\"panel\"></div>").insertBefore(_224);
_225[0].appendChild(_224);
_225.bind("_resize",function(e,_226){
if($(this).hasClass("easyui-fluid")||_226){
_211(_224);
}
return false;
});
return _225;
};
function _227(_228){
var _229=$.data(_228,"panel");
var opts=_229.options;
var _22a=_229.panel;
_22a.css(opts.style);
_22a.addClass(opts.cls);
_22a.removeClass("panel-hleft panel-hright").addClass("panel-h"+opts.halign);
_22b();
_22c();
var _22d=$(_228).panel("header");
var body=$(_228).panel("body");
var _22e=$(_228).siblings(".panel-footer");
if(opts.border){
_22d.removeClass("panel-header-noborder");
body.removeClass("panel-body-noborder");
_22e.removeClass("panel-footer-noborder");
}else{
_22d.addClass("panel-header-noborder");
body.addClass("panel-body-noborder");
_22e.addClass("panel-footer-noborder");
}
_22d.addClass(opts.headerCls);
body.addClass(opts.bodyCls);
$(_228).attr("id",opts.id||"");
if(opts.content){
$(_228).panel("clear");
$(_228).html(opts.content);
$.parser.parse($(_228));
}
function _22b(){
if(opts.noheader||(!opts.title&&!opts.header)){
_210(_22a.children(".panel-header"));
_22a.children(".panel-body").addClass("panel-body-noheader");
}else{
if(opts.header){
$(opts.header).addClass("panel-header").prependTo(_22a);
}else{
var _22f=_22a.children(".panel-header");
if(!_22f.length){
_22f=$("<div class=\"panel-header\"></div>").prependTo(_22a);
}
if(!$.isArray(opts.tools)){
_22f.find("div.panel-tool .panel-tool-a").appendTo(opts.tools);
}
_22f.empty();
var _230=$("<div class=\"panel-title\"></div>").html(opts.title).appendTo(_22f);
if(opts.iconCls){
_230.addClass("panel-with-icon");
$("<div class=\"panel-icon\"></div>").addClass(opts.iconCls).appendTo(_22f);
}
if(opts.halign=="left"||opts.halign=="right"){
_230.addClass("panel-title-"+opts.titleDirection);
}
var tool=$("<div class=\"panel-tool\"></div>").appendTo(_22f);
tool.bind("click",function(e){
e.stopPropagation();
});
if(opts.tools){
if($.isArray(opts.tools)){
$.map(opts.tools,function(t){
_231(tool,t.iconCls,eval(t.handler));
});
}else{
$(opts.tools).children().each(function(){
$(this).addClass($(this).attr("iconCls")).addClass("panel-tool-a").appendTo(tool);
});
}
}
if(opts.collapsible){
_231(tool,"panel-tool-collapse",function(){
if(opts.collapsed==true){
_251(_228,true);
}else{
_242(_228,true);
}
});
}
if(opts.minimizable){
_231(tool,"panel-tool-min",function(){
_257(_228);
});
}
if(opts.maximizable){
_231(tool,"panel-tool-max",function(){
if(opts.maximized==true){
_25a(_228);
}else{
_241(_228);
}
});
}
if(opts.closable){
_231(tool,"panel-tool-close",function(){
_243(_228);
});
}
}
_22a.children("div.panel-body").removeClass("panel-body-noheader");
}
};
function _231(c,icon,_232){
var a=$("<a href=\"javascript:;\"></a>").addClass(icon).appendTo(c);
a.bind("click",_232);
};
function _22c(){
if(opts.footer){
$(opts.footer).addClass("panel-footer").appendTo(_22a);
$(_228).addClass("panel-body-nobottom");
}else{
_22a.children(".panel-footer").remove();
$(_228).removeClass("panel-body-nobottom");
}
};
};
function _233(_234,_235){
var _236=$.data(_234,"panel");
var opts=_236.options;
if(_237){
opts.queryParams=_235;
}
if(!opts.href){
return;
}
if(!_236.isLoaded||!opts.cache){
var _237=$.extend({},opts.queryParams);
if(opts.onBeforeLoad.call(_234,_237)==false){
return;
}
_236.isLoaded=false;
if(opts.loadingMessage){
$(_234).panel("clear");
$(_234).html($("<div class=\"panel-loading\"></div>").html(opts.loadingMessage));
}
opts.loader.call(_234,_237,function(data){
var _238=opts.extractor.call(_234,data);
$(_234).panel("clear");
$(_234).html(_238);
$.parser.parse($(_234));
opts.onLoad.apply(_234,arguments);
_236.isLoaded=true;
},function(){
opts.onLoadError.apply(_234,arguments);
});
}
};
function _239(_23a){
var t=$(_23a);
t.find(".combo-f").each(function(){
$(this).combo("destroy");
});
t.find(".m-btn").each(function(){
$(this).menubutton("destroy");
});
t.find(".s-btn").each(function(){
$(this).splitbutton("destroy");
});
t.find(".tooltip-f").each(function(){
$(this).tooltip("destroy");
});
t.children("div").each(function(){
$(this)._size("unfit");
});
t.empty();
};
function _23b(_23c){
$(_23c).panel("doLayout",true);
};
function _23d(_23e,_23f){
var opts=$.data(_23e,"panel").options;
var _240=$.data(_23e,"panel").panel;
if(_23f!=true){
if(opts.onBeforeOpen.call(_23e)==false){
return;
}
}
_240.stop(true,true);
if($.isFunction(opts.openAnimation)){
opts.openAnimation.call(_23e,cb);
}else{
switch(opts.openAnimation){
case "slide":
_240.slideDown(opts.openDuration,cb);
break;
case "fade":
_240.fadeIn(opts.openDuration,cb);
break;
case "show":
_240.show(opts.openDuration,cb);
break;
default:
_240.show();
cb();
}
}
function cb(){
opts.closed=false;
opts.minimized=false;
var tool=_240.children(".panel-header").find("a.panel-tool-restore");
if(tool.length){
opts.maximized=true;
}
opts.onOpen.call(_23e);
if(opts.maximized==true){
opts.maximized=false;
_241(_23e);
}
if(opts.collapsed==true){
opts.collapsed=false;
_242(_23e);
}
if(!opts.collapsed){
_233(_23e);
_23b(_23e);
}
};
};
function _243(_244,_245){
var _246=$.data(_244,"panel");
var opts=_246.options;
var _247=_246.panel;
if(_245!=true){
if(opts.onBeforeClose.call(_244)==false){
return;
}
}
_247.find(".tooltip-f").each(function(){
$(this).tooltip("hide");
});
_247.stop(true,true);
_247._size("unfit");
if($.isFunction(opts.closeAnimation)){
opts.closeAnimation.call(_244,cb);
}else{
switch(opts.closeAnimation){
case "slide":
_247.slideUp(opts.closeDuration,cb);
break;
case "fade":
_247.fadeOut(opts.closeDuration,cb);
break;
case "hide":
_247.hide(opts.closeDuration,cb);
break;
default:
_247.hide();
cb();
}
}
function cb(){
opts.closed=true;
opts.onClose.call(_244);
};
};
function _248(_249,_24a){
var _24b=$.data(_249,"panel");
var opts=_24b.options;
var _24c=_24b.panel;
if(_24a!=true){
if(opts.onBeforeDestroy.call(_249)==false){
return;
}
}
$(_249).panel("clear").panel("clear","footer");
_210(_24c);
opts.onDestroy.call(_249);
};
function _242(_24d,_24e){
var opts=$.data(_24d,"panel").options;
var _24f=$.data(_24d,"panel").panel;
var body=_24f.children(".panel-body");
var _250=_24f.children(".panel-header");
var tool=_250.find("a.panel-tool-collapse");
if(opts.collapsed==true){
return;
}
body.stop(true,true);
if(opts.onBeforeCollapse.call(_24d)==false){
return;
}
tool.addClass("panel-tool-expand");
if(_24e==true){
if(opts.halign=="left"||opts.halign=="right"){
_24f.animate({width:_250._outerWidth()+_24f.children(".panel-footer")._outerWidth()},function(){
cb();
});
}else{
body.slideUp("normal",function(){
cb();
});
}
}else{
if(opts.halign=="left"||opts.halign=="right"){
_24f._outerWidth(_250._outerWidth()+_24f.children(".panel-footer")._outerWidth());
}
cb();
}
function cb(){
body.hide();
opts.collapsed=true;
opts.onCollapse.call(_24d);
};
};
function _251(_252,_253){
var opts=$.data(_252,"panel").options;
var _254=$.data(_252,"panel").panel;
var body=_254.children(".panel-body");
var tool=_254.children(".panel-header").find("a.panel-tool-collapse");
if(opts.collapsed==false){
return;
}
body.stop(true,true);
if(opts.onBeforeExpand.call(_252)==false){
return;
}
tool.removeClass("panel-tool-expand");
if(_253==true){
if(opts.halign=="left"||opts.halign=="right"){
body.show();
_254.animate({width:opts.panelCssWidth},function(){
cb();
});
}else{
body.slideDown("normal",function(){
cb();
});
}
}else{
if(opts.halign=="left"||opts.halign=="right"){
_254.css("width",opts.panelCssWidth);
}
cb();
}
function cb(){
body.show();
opts.collapsed=false;
opts.onExpand.call(_252);
_233(_252);
_23b(_252);
};
};
function _241(_255){
var opts=$.data(_255,"panel").options;
var _256=$.data(_255,"panel").panel;
var tool=_256.children(".panel-header").find("a.panel-tool-max");
if(opts.maximized==true){
return;
}
tool.addClass("panel-tool-restore");
if(!$.data(_255,"panel").original){
$.data(_255,"panel").original={width:opts.width,height:opts.height,left:opts.left,top:opts.top,fit:opts.fit};
}
opts.left=0;
opts.top=0;
opts.fit=true;
_211(_255);
opts.minimized=false;
opts.maximized=true;
opts.onMaximize.call(_255);
};
function _257(_258){
var opts=$.data(_258,"panel").options;
var _259=$.data(_258,"panel").panel;
_259._size("unfit");
_259.hide();
opts.minimized=true;
opts.maximized=false;
opts.onMinimize.call(_258);
};
function _25a(_25b){
var opts=$.data(_25b,"panel").options;
var _25c=$.data(_25b,"panel").panel;
var tool=_25c.children(".panel-header").find("a.panel-tool-max");
if(opts.maximized==false){
return;
}
_25c.show();
tool.removeClass("panel-tool-restore");
$.extend(opts,$.data(_25b,"panel").original);
_211(_25b);
opts.minimized=false;
opts.maximized=false;
$.data(_25b,"panel").original=null;
opts.onRestore.call(_25b);
};
function _25d(_25e,_25f){
$.data(_25e,"panel").options.title=_25f;
$(_25e).panel("header").find("div.panel-title").html(_25f);
};
var _260=null;
$(window).unbind(".panel").bind("resize.panel",function(){
if(_260){
clearTimeout(_260);
}
_260=setTimeout(function(){
var _261=$("body.layout");
if(_261.length){
_261.layout("resize");
$("body").children(".easyui-fluid:visible").each(function(){
$(this).triggerHandler("_resize");
});
}else{
$("body").panel("doLayout");
}
_260=null;
},100);
});
$.fn.panel=function(_262,_263){
if(typeof _262=="string"){
return $.fn.panel.methods[_262](this,_263);
}
_262=_262||{};
return this.each(function(){
var _264=$.data(this,"panel");
var opts;
if(_264){
opts=$.extend(_264.options,_262);
_264.isLoaded=false;
}else{
opts=$.extend({},$.fn.panel.defaults,$.fn.panel.parseOptions(this),_262);
$(this).attr("title","");
_264=$.data(this,"panel",{options:opts,panel:_223(this),isLoaded:false});
}
_227(this);
$(this).show();
if(opts.doSize==true){
_264.panel.css("display","block");
_211(this);
}
if(opts.closed==true||opts.minimized==true){
_264.panel.hide();
}else{
_23d(this);
}
});
};
$.fn.panel.methods={options:function(jq){
return $.data(jq[0],"panel").options;
},panel:function(jq){
return $.data(jq[0],"panel").panel;
},header:function(jq){
return $.data(jq[0],"panel").panel.children(".panel-header");
},footer:function(jq){
return jq.panel("panel").children(".panel-footer");
},body:function(jq){
return $.data(jq[0],"panel").panel.children(".panel-body");
},setTitle:function(jq,_265){
return jq.each(function(){
_25d(this,_265);
});
},open:function(jq,_266){
return jq.each(function(){
_23d(this,_266);
});
},close:function(jq,_267){
return jq.each(function(){
_243(this,_267);
});
},destroy:function(jq,_268){
return jq.each(function(){
_248(this,_268);
});
},clear:function(jq,type){
return jq.each(function(){
_239(type=="footer"?$(this).panel("footer"):this);
});
},refresh:function(jq,href){
return jq.each(function(){
var _269=$.data(this,"panel");
_269.isLoaded=false;
if(href){
if(typeof href=="string"){
_269.options.href=href;
}else{
_269.options.queryParams=href;
}
}
_233(this);
});
},resize:function(jq,_26a){
return jq.each(function(){
_211(this,_26a);
});
},doLayout:function(jq,all){
return jq.each(function(){
_26b(this,"body");
_26b($(this).siblings(".panel-footer")[0],"footer");
function _26b(_26c,type){
if(!_26c){
return;
}
var _26d=_26c==$("body")[0];
var s=$(_26c).find("div.panel:visible,div.accordion:visible,div.tabs-container:visible,div.layout:visible,.easyui-fluid:visible").filter(function(_26e,el){
var p=$(el).parents(".panel-"+type+":first");
return _26d?p.length==0:p[0]==_26c;
});
s.each(function(){
$(this).triggerHandler("_resize",[all||false]);
});
};
});
},move:function(jq,_26f){
return jq.each(function(){
_21e(this,_26f);
});
},maximize:function(jq){
return jq.each(function(){
_241(this);
});
},minimize:function(jq){
return jq.each(function(){
_257(this);
});
},restore:function(jq){
return jq.each(function(){
_25a(this);
});
},collapse:function(jq,_270){
return jq.each(function(){
_242(this,_270);
});
},expand:function(jq,_271){
return jq.each(function(){
_251(this,_271);
});
}};
$.fn.panel.parseOptions=function(_272){
var t=$(_272);
var hh=t.children(".panel-header,header");
var ff=t.children(".panel-footer,footer");
return $.extend({},$.parser.parseOptions(_272,["id","width","height","left","top","title","iconCls","cls","headerCls","bodyCls","tools","href","method","header","footer","halign","titleDirection",{cache:"boolean",fit:"boolean",border:"boolean",noheader:"boolean"},{collapsible:"boolean",minimizable:"boolean",maximizable:"boolean"},{closable:"boolean",collapsed:"boolean",minimized:"boolean",maximized:"boolean",closed:"boolean"},"openAnimation","closeAnimation",{openDuration:"number",closeDuration:"number"},]),{loadingMessage:(t.attr("loadingMessage")!=undefined?t.attr("loadingMessage"):undefined),header:(hh.length?hh.removeClass("panel-header"):undefined),footer:(ff.length?ff.removeClass("panel-footer"):undefined)});
};
$.fn.panel.defaults={id:null,title:null,iconCls:null,width:"auto",height:"auto",left:null,top:null,cls:null,headerCls:null,bodyCls:null,style:{},href:null,cache:true,fit:false,border:true,doSize:true,noheader:false,content:null,halign:"top",titleDirection:"down",collapsible:false,minimizable:false,maximizable:false,closable:false,collapsed:false,minimized:false,maximized:false,closed:false,openAnimation:false,openDuration:400,closeAnimation:false,closeDuration:400,tools:null,footer:null,header:null,queryParams:{},method:"get",href:null,loadingMessage:"Loading...",loader:function(_273,_274,_275){
var opts=$(this).panel("options");
if(!opts.href){
return false;
}
$.ajax({type:opts.method,url:opts.href,cache:false,data:_273,dataType:"html",success:function(data){
_274(data);
},error:function(){
_275.apply(this,arguments);
}});
},extractor:function(data){
var _276=/<body[^>]*>((.|[\n\r])*)<\/body>/im;
var _277=_276.exec(data);
if(_277){
return _277[1];
}else{
return data;
}
},onBeforeLoad:function(_278){
},onLoad:function(){
},onLoadError:function(){
},onBeforeOpen:function(){
},onOpen:function(){
},onBeforeClose:function(){
},onClose:function(){
},onBeforeDestroy:function(){
},onDestroy:function(){
},onResize:function(_279,_27a){
},onMove:function(left,top){
},onMaximize:function(){
},onRestore:function(){
},onMinimize:function(){
},onBeforeCollapse:function(){
},onBeforeExpand:function(){
},onCollapse:function(){
},onExpand:function(){
}};
})(jQuery);
(function($){
function _27b(_27c,_27d){
var _27e=$.data(_27c,"window");
if(_27d){
if(_27d.left!=null){
_27e.options.left=_27d.left;
}
if(_27d.top!=null){
_27e.options.top=_27d.top;
}
}
$(_27c).panel("move",_27e.options);
if(_27e.shadow){
_27e.shadow.css({left:_27e.options.left,top:_27e.options.top});
}
};
function _27f(_280,_281){
var opts=$.data(_280,"window").options;
var pp=$(_280).window("panel");
var _282=pp._outerWidth();
if(opts.inline){
var _283=pp.parent();
opts.left=Math.ceil((_283.width()-_282)/2+_283.scrollLeft());
}else{
opts.left=Math.ceil(($(window)._outerWidth()-_282)/2+$(document).scrollLeft());
}
if(_281){
_27b(_280);
}
};
function _284(_285,_286){
var opts=$.data(_285,"window").options;
var pp=$(_285).window("panel");
var _287=pp._outerHeight();
if(opts.inline){
var _288=pp.parent();
opts.top=Math.ceil((_288.height()-_287)/2+_288.scrollTop());
}else{
opts.top=Math.ceil(($(window)._outerHeight()-_287)/2+$(document).scrollTop());
}
if(_286){
_27b(_285);
}
};
function _289(_28a){
var _28b=$.data(_28a,"window");
var opts=_28b.options;
var win=$(_28a).panel($.extend({},_28b.options,{border:false,doSize:true,closed:true,cls:"window "+(!opts.border?"window-thinborder window-noborder ":(opts.border=="thin"?"window-thinborder ":""))+(opts.cls||""),headerCls:"window-header "+(opts.headerCls||""),bodyCls:"window-body "+(opts.noheader?"window-body-noheader ":" ")+(opts.bodyCls||""),onBeforeDestroy:function(){
if(opts.onBeforeDestroy.call(_28a)==false){
return false;
}
if(_28b.shadow){
_28b.shadow.remove();
}
if(_28b.mask){
_28b.mask.remove();
}
},onClose:function(){
if(_28b.shadow){
_28b.shadow.hide();
}
if(_28b.mask){
_28b.mask.hide();
}
opts.onClose.call(_28a);
},onOpen:function(){
if(_28b.mask){
_28b.mask.css($.extend({display:"block",zIndex:$.fn.window.defaults.zIndex++},$.fn.window.getMaskSize(_28a)));
}
if(_28b.shadow){
_28b.shadow.css({display:"block",zIndex:$.fn.window.defaults.zIndex++,left:opts.left,top:opts.top,width:_28b.window._outerWidth(),height:_28b.window._outerHeight()});
}
_28b.window.css("z-index",$.fn.window.defaults.zIndex++);
opts.onOpen.call(_28a);
},onResize:function(_28c,_28d){
var _28e=$(this).panel("options");
$.extend(opts,{width:_28e.width,height:_28e.height,left:_28e.left,top:_28e.top});
if(_28b.shadow){
_28b.shadow.css({left:opts.left,top:opts.top,width:_28b.window._outerWidth(),height:_28b.window._outerHeight()});
}
opts.onResize.call(_28a,_28c,_28d);
},onMinimize:function(){
if(_28b.shadow){
_28b.shadow.hide();
}
if(_28b.mask){
_28b.mask.hide();
}
_28b.options.onMinimize.call(_28a);
},onBeforeCollapse:function(){
if(opts.onBeforeCollapse.call(_28a)==false){
return false;
}
if(_28b.shadow){
_28b.shadow.hide();
}
},onExpand:function(){
if(_28b.shadow){
_28b.shadow.show();
}
opts.onExpand.call(_28a);
}}));
_28b.window=win.panel("panel");
if(_28b.mask){
_28b.mask.remove();
}
if(opts.modal){
_28b.mask=$("<div class=\"window-mask\" style=\"display:none\"></div>").insertAfter(_28b.window);
}
if(_28b.shadow){
_28b.shadow.remove();
}
if(opts.shadow){
_28b.shadow=$("<div class=\"window-shadow\" style=\"display:none\"></div>").insertAfter(_28b.window);
}
var _28f=opts.closed;
if(opts.left==null){
_27f(_28a);
}
if(opts.top==null){
_284(_28a);
}
_27b(_28a);
if(!_28f){
win.window("open");
}
};
function _290(left,top,_291,_292){
var _293=this;
var _294=$.data(_293,"window");
var opts=_294.options;
if(!opts.constrain){
return {};
}
if($.isFunction(opts.constrain)){
return opts.constrain.call(_293,left,top,_291,_292);
}
var win=$(_293).window("window");
var _295=opts.inline?win.parent():$(window);
if(left<0){
left=0;
}
if(top<_295.scrollTop()){
top=_295.scrollTop();
}
if(left+_291>_295.width()){
if(_291==win.outerWidth()){
left=_295.width()-_291;
}else{
_291=_295.width()-left;
}
}
if(top-_295.scrollTop()+_292>_295.height()){
if(_292==win.outerHeight()){
top=_295.height()-_292+_295.scrollTop();
}else{
_292=_295.height()-top+_295.scrollTop();
}
}
return {left:left,top:top,width:_291,height:_292};
};
function _296(_297){
var _298=$.data(_297,"window");
_298.window.draggable({handle:">div.panel-header>div.panel-title",disabled:_298.options.draggable==false,onBeforeDrag:function(e){
if(_298.mask){
_298.mask.css("z-index",$.fn.window.defaults.zIndex++);
}
if(_298.shadow){
_298.shadow.css("z-index",$.fn.window.defaults.zIndex++);
}
_298.window.css("z-index",$.fn.window.defaults.zIndex++);
},onStartDrag:function(e){
_299(e);
},onDrag:function(e){
_29a(e);
return false;
},onStopDrag:function(e){
_29b(e,"move");
}});
_298.window.resizable({disabled:_298.options.resizable==false,onStartResize:function(e){
_299(e);
},onResize:function(e){
_29a(e);
return false;
},onStopResize:function(e){
_29b(e,"resize");
}});
function _299(e){
if(_298.pmask){
_298.pmask.remove();
}
_298.pmask=$("<div class=\"window-proxy-mask\"></div>").insertAfter(_298.window);
_298.pmask.css({display:"none",zIndex:$.fn.window.defaults.zIndex++,left:e.data.left,top:e.data.top,width:_298.window._outerWidth(),height:_298.window._outerHeight()});
if(_298.proxy){
_298.proxy.remove();
}
_298.proxy=$("<div class=\"window-proxy\"></div>").insertAfter(_298.window);
_298.proxy.css({display:"none",zIndex:$.fn.window.defaults.zIndex++,left:e.data.left,top:e.data.top});
_298.proxy._outerWidth(e.data.width)._outerHeight(e.data.height);
_298.proxy.hide();
setTimeout(function(){
if(_298.pmask){
_298.pmask.show();
}
if(_298.proxy){
_298.proxy.show();
}
},500);
};
function _29a(e){
$.extend(e.data,_290.call(_297,e.data.left,e.data.top,e.data.width,e.data.height));
_298.pmask.show();
_298.proxy.css({display:"block",left:e.data.left,top:e.data.top});
_298.proxy._outerWidth(e.data.width);
_298.proxy._outerHeight(e.data.height);
};
function _29b(e,_29c){
$.extend(e.data,_290.call(_297,e.data.left,e.data.top,e.data.width+0.1,e.data.height+0.1));
$(_297).window(_29c,e.data);
_298.pmask.remove();
_298.pmask=null;
_298.proxy.remove();
_298.proxy=null;
};
};
$(function(){
if(!$._positionFixed){
$(window).resize(function(){
$("body>div.window-mask:visible").css({width:"",height:""});
setTimeout(function(){
$("body>div.window-mask:visible").css($.fn.window.getMaskSize());
},50);
});
}
});
$.fn.window=function(_29d,_29e){
if(typeof _29d=="string"){
var _29f=$.fn.window.methods[_29d];
if(_29f){
return _29f(this,_29e);
}else{
return this.panel(_29d,_29e);
}
}
_29d=_29d||{};
return this.each(function(){
var _2a0=$.data(this,"window");
if(_2a0){
$.extend(_2a0.options,_29d);
}else{
_2a0=$.data(this,"window",{options:$.extend({},$.fn.window.defaults,$.fn.window.parseOptions(this),_29d)});
if(!_2a0.options.inline){
document.body.appendChild(this);
}
}
_289(this);
_296(this);
});
};
$.fn.window.methods={options:function(jq){
var _2a1=jq.panel("options");
var _2a2=$.data(jq[0],"window").options;
return $.extend(_2a2,{closed:_2a1.closed,collapsed:_2a1.collapsed,minimized:_2a1.minimized,maximized:_2a1.maximized});
},window:function(jq){
return $.data(jq[0],"window").window;
},move:function(jq,_2a3){
return jq.each(function(){
_27b(this,_2a3);
});
},hcenter:function(jq){
return jq.each(function(){
_27f(this,true);
});
},vcenter:function(jq){
return jq.each(function(){
_284(this,true);
});
},center:function(jq){
return jq.each(function(){
_27f(this);
_284(this);
_27b(this);
});
}};
$.fn.window.getMaskSize=function(_2a4){
var _2a5=$(_2a4).data("window");
if(_2a5&&_2a5.options.inline){
return {};
}else{
if($._positionFixed){
return {position:"fixed"};
}else{
return {width:$(document).width(),height:$(document).height()};
}
}
};
$.fn.window.parseOptions=function(_2a6){
return $.extend({},$.fn.panel.parseOptions(_2a6),$.parser.parseOptions(_2a6,[{draggable:"boolean",resizable:"boolean",shadow:"boolean",modal:"boolean",inline:"boolean"}]));
};
$.fn.window.defaults=$.extend({},$.fn.panel.defaults,{zIndex:9000,draggable:true,resizable:true,shadow:true,modal:false,border:true,inline:false,title:"New Window",collapsible:true,minimizable:true,maximizable:true,closable:true,closed:false,constrain:false});
})(jQuery);
(function($){
function _2a7(_2a8){
var opts=$.data(_2a8,"dialog").options;
opts.inited=false;
$(_2a8).window($.extend({},opts,{onResize:function(w,h){
if(opts.inited){
_2ad(this);
opts.onResize.call(this,w,h);
}
}}));
var win=$(_2a8).window("window");
if(opts.toolbar){
if($.isArray(opts.toolbar)){
$(_2a8).siblings("div.dialog-toolbar").remove();
var _2a9=$("<div class=\"dialog-toolbar\"><table cellspacing=\"0\" cellpadding=\"0\"><tr></tr></table></div>").appendTo(win);
var tr=_2a9.find("tr");
for(var i=0;i<opts.toolbar.length;i++){
var btn=opts.toolbar[i];
if(btn=="-"){
$("<td><div class=\"dialog-tool-separator\"></div></td>").appendTo(tr);
}else{
var td=$("<td></td>").appendTo(tr);
var tool=$("<a href=\"javascript:;\"></a>").appendTo(td);
tool[0].onclick=eval(btn.handler||function(){
});
tool.linkbutton($.extend({},btn,{plain:true}));
}
}
}else{
$(opts.toolbar).addClass("dialog-toolbar").appendTo(win);
$(opts.toolbar).show();
}
}else{
$(_2a8).siblings("div.dialog-toolbar").remove();
}
if(opts.buttons){
if($.isArray(opts.buttons)){
$(_2a8).siblings("div.dialog-button").remove();
var _2aa=$("<div class=\"dialog-button\"></div>").appendTo(win);
for(var i=0;i<opts.buttons.length;i++){
var p=opts.buttons[i];
var _2ab=$("<a href=\"javascript:;\"></a>").appendTo(_2aa);
if(p.handler){
_2ab[0].onclick=p.handler;
}
_2ab.linkbutton(p);
}
}else{
$(opts.buttons).addClass("dialog-button").appendTo(win);
$(opts.buttons).show();
}
}else{
$(_2a8).siblings("div.dialog-button").remove();
}
opts.inited=true;
var _2ac=opts.closed;
win.show();
$(_2a8).window("resize");
if(_2ac){
win.hide();
}
};
function _2ad(_2ae,_2af){
var t=$(_2ae);
var opts=t.dialog("options");
var _2b0=opts.noheader;
var tb=t.siblings(".dialog-toolbar");
var bb=t.siblings(".dialog-button");
tb.insertBefore(_2ae).css({borderTopWidth:(_2b0?1:0),top:(_2b0?tb.length:0)});
bb.insertAfter(_2ae);
tb.add(bb)._outerWidth(t._outerWidth()).find(".easyui-fluid:visible").each(function(){
$(this).triggerHandler("_resize");
});
var _2b1=tb._outerHeight()+bb._outerHeight();
if(!isNaN(parseInt(opts.height))){
t._outerHeight(t._outerHeight()-_2b1);
}else{
var _2b2=t._size("min-height");
if(_2b2){
t._size("min-height",_2b2-_2b1);
}
var _2b3=t._size("max-height");
if(_2b3){
t._size("max-height",_2b3-_2b1);
}
}
var _2b4=$.data(_2ae,"window").shadow;
if(_2b4){
var cc=t.panel("panel");
_2b4.css({width:cc._outerWidth(),height:cc._outerHeight()});
}
};
$.fn.dialog=function(_2b5,_2b6){
if(typeof _2b5=="string"){
var _2b7=$.fn.dialog.methods[_2b5];
if(_2b7){
return _2b7(this,_2b6);
}else{
return this.window(_2b5,_2b6);
}
}
_2b5=_2b5||{};
return this.each(function(){
var _2b8=$.data(this,"dialog");
if(_2b8){
$.extend(_2b8.options,_2b5);
}else{
$.data(this,"dialog",{options:$.extend({},$.fn.dialog.defaults,$.fn.dialog.parseOptions(this),_2b5)});
}
_2a7(this);
});
};
$.fn.dialog.methods={options:function(jq){
var _2b9=$.data(jq[0],"dialog").options;
var _2ba=jq.panel("options");
$.extend(_2b9,{width:_2ba.width,height:_2ba.height,left:_2ba.left,top:_2ba.top,closed:_2ba.closed,collapsed:_2ba.collapsed,minimized:_2ba.minimized,maximized:_2ba.maximized});
return _2b9;
},dialog:function(jq){
return jq.window("window");
}};
$.fn.dialog.parseOptions=function(_2bb){
var t=$(_2bb);
return $.extend({},$.fn.window.parseOptions(_2bb),$.parser.parseOptions(_2bb,["toolbar","buttons"]),{toolbar:(t.children(".dialog-toolbar").length?t.children(".dialog-toolbar").removeClass("dialog-toolbar"):undefined),buttons:(t.children(".dialog-button").length?t.children(".dialog-button").removeClass("dialog-button"):undefined)});
};
$.fn.dialog.defaults=$.extend({},$.fn.window.defaults,{title:"New Dialog",collapsible:false,minimizable:false,maximizable:false,resizable:false,toolbar:null,buttons:null});
})(jQuery);
(function($){
function _2bc(){
$(document).unbind(".messager").bind("keydown.messager",function(e){
if(e.keyCode==27){
$("body").children("div.messager-window").children("div.messager-body").each(function(){
$(this).dialog("close");
});
}else{
if(e.keyCode==9){
var win=$("body").children("div.messager-window");
if(!win.length){
return;
}
var _2bd=win.find(".messager-input,.messager-button .l-btn");
for(var i=0;i<_2bd.length;i++){
if($(_2bd[i]).is(":focus")){
$(_2bd[i>=_2bd.length-1?0:i+1]).focus();
return false;
}
}
}else{
if(e.keyCode==13){
var _2be=$(e.target).closest("input.messager-input");
if(_2be.length){
var dlg=_2be.closest(".messager-body");
_2bf(dlg,_2be.val());
}
}
}
}
});
};
function _2c0(){
$(document).unbind(".messager");
};
function _2c1(_2c2){
var opts=$.extend({},$.messager.defaults,{modal:false,shadow:false,draggable:false,resizable:false,closed:true,style:{left:"",top:"",right:0,zIndex:$.fn.window.defaults.zIndex++,bottom:-document.body.scrollTop-document.documentElement.scrollTop},title:"",width:250,height:100,minHeight:0,showType:"slide",showSpeed:600,content:_2c2.msg,timeout:4000},_2c2);
var dlg=$("<div class=\"messager-body\"></div>").appendTo("body");
dlg.dialog($.extend({},opts,{noheader:(opts.title?false:true),openAnimation:(opts.showType),closeAnimation:(opts.showType=="show"?"hide":opts.showType),openDuration:opts.showSpeed,closeDuration:opts.showSpeed,onOpen:function(){
dlg.dialog("dialog").hover(function(){
if(opts.timer){
clearTimeout(opts.timer);
}
},function(){
_2c3();
});
_2c3();
function _2c3(){
if(opts.timeout>0){
opts.timer=setTimeout(function(){
if(dlg.length&&dlg.data("dialog")){
dlg.dialog("close");
}
},opts.timeout);
}
};
if(_2c2.onOpen){
_2c2.onOpen.call(this);
}else{
opts.onOpen.call(this);
}
},onClose:function(){
if(opts.timer){
clearTimeout(opts.timer);
}
if(_2c2.onClose){
_2c2.onClose.call(this);
}else{
opts.onClose.call(this);
}
dlg.dialog("destroy");
}}));
dlg.dialog("dialog").css(opts.style);
dlg.dialog("open");
return dlg;
};
function _2c4(_2c5){
_2bc();
var dlg=$("<div class=\"messager-body\"></div>").appendTo("body");
dlg.dialog($.extend({},_2c5,{noheader:(_2c5.title?false:true),onClose:function(){
_2c0();
if(_2c5.onClose){
_2c5.onClose.call(this);
}
setTimeout(function(){
dlg.dialog("destroy");
},100);
}}));
var win=dlg.dialog("dialog").addClass("messager-window");
win.find(".dialog-button").addClass("messager-button").find("a:first").focus();
return dlg;
};
function _2bf(dlg,_2c6){
dlg.dialog("close");
dlg.dialog("options").fn(_2c6);
};
$.messager={show:function(_2c7){
return _2c1(_2c7);
},alert:function(_2c8,msg,icon,fn){
var opts=typeof _2c8=="object"?_2c8:{title:_2c8,msg:msg,icon:icon,fn:fn};
var cls=opts.icon?"messager-icon messager-"+opts.icon:"";
opts=$.extend({},$.messager.defaults,{content:"<div class=\""+cls+"\"></div>"+"<div>"+opts.msg+"</div>"+"<div style=\"clear:both;\"/>"},opts);
if(!opts.buttons){
opts.buttons=[{text:opts.ok,onClick:function(){
_2bf(dlg);
}}];
}
var dlg=_2c4(opts);
return dlg;
},confirm:function(_2c9,msg,fn){
var opts=typeof _2c9=="object"?_2c9:{title:_2c9,msg:msg,fn:fn};
opts=$.extend({},$.messager.defaults,{content:"<div class=\"messager-icon messager-question\"></div>"+"<div>"+opts.msg+"</div>"+"<div style=\"clear:both;\"/>"},opts);
if(!opts.buttons){
opts.buttons=[{text:opts.ok,onClick:function(){
_2bf(dlg,true);
}},{text:opts.cancel,onClick:function(){
_2bf(dlg,false);
}}];
}
var dlg=_2c4(opts);
return dlg;
},prompt:function(_2ca,msg,fn){
var opts=typeof _2ca=="object"?_2ca:{title:_2ca,msg:msg,fn:fn};
opts=$.extend({},$.messager.defaults,{content:"<div class=\"messager-icon messager-question\"></div>"+"<div>"+opts.msg+"</div>"+"<br/>"+"<div style=\"clear:both;\"/>"+"<div><input class=\"messager-input\" type=\"text\"/></div>"},opts);
if(!opts.buttons){
opts.buttons=[{text:opts.ok,onClick:function(){
_2bf(dlg,dlg.find(".messager-input").val());
}},{text:opts.cancel,onClick:function(){
_2bf(dlg);
}}];
}
var dlg=_2c4(opts);
dlg.find(".messager-input").focus();
return dlg;
},progress:function(_2cb){
var _2cc={bar:function(){
return $("body>div.messager-window").find("div.messager-p-bar");
},close:function(){
var dlg=$("body>div.messager-window>div.messager-body:has(div.messager-progress)");
if(dlg.length){
dlg.dialog("close");
}
}};
if(typeof _2cb=="string"){
var _2cd=_2cc[_2cb];
return _2cd();
}
_2cb=_2cb||{};
var opts=$.extend({},{title:"",minHeight:0,content:undefined,msg:"",text:undefined,interval:300},_2cb);
var dlg=_2c4($.extend({},$.messager.defaults,{content:"<div class=\"messager-progress\"><div class=\"messager-p-msg\">"+opts.msg+"</div><div class=\"messager-p-bar\"></div></div>",closable:false,doSize:false},opts,{onClose:function(){
if(this.timer){
clearInterval(this.timer);
}
if(_2cb.onClose){
_2cb.onClose.call(this);
}else{
$.messager.defaults.onClose.call(this);
}
}}));
var bar=dlg.find("div.messager-p-bar");
bar.progressbar({text:opts.text});
dlg.dialog("resize");
if(opts.interval){
dlg[0].timer=setInterval(function(){
var v=bar.progressbar("getValue");
v+=10;
if(v>100){
v=0;
}
bar.progressbar("setValue",v);
},opts.interval);
}
return dlg;
}};
$.messager.defaults=$.extend({},$.fn.dialog.defaults,{ok:"Ok",cancel:"Cancel",width:300,height:"auto",minHeight:150,modal:true,collapsible:false,minimizable:false,maximizable:false,resizable:false,fn:function(){
}});
})(jQuery);
(function($){
function _2ce(_2cf,_2d0){
var _2d1=$.data(_2cf,"accordion");
var opts=_2d1.options;
var _2d2=_2d1.panels;
var cc=$(_2cf);
var _2d3=(opts.halign=="left"||opts.halign=="right");
cc.children(".panel-last").removeClass("panel-last");
cc.children(".panel:last").addClass("panel-last");
if(_2d0){
$.extend(opts,{width:_2d0.width,height:_2d0.height});
}
cc._size(opts);
var _2d4=0;
var _2d5="auto";
var _2d6=cc.find(">.panel>.accordion-header");
if(_2d6.length){
if(_2d3){
$(_2d2[0]).panel("resize",{width:cc.width(),height:cc.height()});
_2d4=$(_2d6[0])._outerWidth();
}else{
_2d4=$(_2d6[0]).css("height","")._outerHeight();
}
}
if(!isNaN(parseInt(opts.height))){
if(_2d3){
_2d5=cc.width()-_2d4*_2d6.length;
}else{
_2d5=cc.height()-_2d4*_2d6.length;
}
}
_2d7(true,_2d5-_2d7(false));
function _2d7(_2d8,_2d9){
var _2da=0;
for(var i=0;i<_2d2.length;i++){
var p=_2d2[i];
if(_2d3){
var h=p.panel("header")._outerWidth(_2d4);
}else{
var h=p.panel("header")._outerHeight(_2d4);
}
if(p.panel("options").collapsible==_2d8){
var _2db=isNaN(_2d9)?undefined:(_2d9+_2d4*h.length);
if(_2d3){
p.panel("resize",{height:cc.height(),width:(_2d8?_2db:undefined)});
_2da+=p.panel("panel")._outerWidth()-_2d4*h.length;
}else{
p.panel("resize",{width:cc.width(),height:(_2d8?_2db:undefined)});
_2da+=p.panel("panel").outerHeight()-_2d4*h.length;
}
}
}
return _2da;
};
};
function _2dc(_2dd,_2de,_2df,all){
var _2e0=$.data(_2dd,"accordion").panels;
var pp=[];
for(var i=0;i<_2e0.length;i++){
var p=_2e0[i];
if(_2de){
if(p.panel("options")[_2de]==_2df){
pp.push(p);
}
}else{
if(p[0]==$(_2df)[0]){
return i;
}
}
}
if(_2de){
return all?pp:(pp.length?pp[0]:null);
}else{
return -1;
}
};
function _2e1(_2e2){
return _2dc(_2e2,"collapsed",false,true);
};
function _2e3(_2e4){
var pp=_2e1(_2e4);
return pp.length?pp[0]:null;
};
function _2e5(_2e6,_2e7){
return _2dc(_2e6,null,_2e7);
};
function _2e8(_2e9,_2ea){
var _2eb=$.data(_2e9,"accordion").panels;
if(typeof _2ea=="number"){
if(_2ea<0||_2ea>=_2eb.length){
return null;
}else{
return _2eb[_2ea];
}
}
return _2dc(_2e9,"title",_2ea);
};
function _2ec(_2ed){
var opts=$.data(_2ed,"accordion").options;
var cc=$(_2ed);
if(opts.border){
cc.removeClass("accordion-noborder");
}else{
cc.addClass("accordion-noborder");
}
};
function init(_2ee){
var _2ef=$.data(_2ee,"accordion");
var cc=$(_2ee);
cc.addClass("accordion");
_2ef.panels=[];
cc.children("div").each(function(){
var opts=$.extend({},$.parser.parseOptions(this),{selected:($(this).attr("selected")?true:undefined)});
var pp=$(this);
_2ef.panels.push(pp);
_2f1(_2ee,pp,opts);
});
cc.bind("_resize",function(e,_2f0){
if($(this).hasClass("easyui-fluid")||_2f0){
_2ce(_2ee);
}
return false;
});
};
function _2f1(_2f2,pp,_2f3){
var opts=$.data(_2f2,"accordion").options;
pp.panel($.extend({},{collapsible:true,minimizable:false,maximizable:false,closable:false,doSize:false,collapsed:true,headerCls:"accordion-header",bodyCls:"accordion-body",halign:opts.halign},_2f3,{onBeforeExpand:function(){
if(_2f3.onBeforeExpand){
if(_2f3.onBeforeExpand.call(this)==false){
return false;
}
}
if(!opts.multiple){
var all=$.grep(_2e1(_2f2),function(p){
return p.panel("options").collapsible;
});
for(var i=0;i<all.length;i++){
_2fb(_2f2,_2e5(_2f2,all[i]));
}
}
var _2f4=$(this).panel("header");
_2f4.addClass("accordion-header-selected");
_2f4.find(".accordion-collapse").removeClass("accordion-expand");
},onExpand:function(){
$(_2f2).find(">.panel-last>.accordion-header").removeClass("accordion-header-border");
if(_2f3.onExpand){
_2f3.onExpand.call(this);
}
opts.onSelect.call(_2f2,$(this).panel("options").title,_2e5(_2f2,this));
},onBeforeCollapse:function(){
if(_2f3.onBeforeCollapse){
if(_2f3.onBeforeCollapse.call(this)==false){
return false;
}
}
$(_2f2).find(">.panel-last>.accordion-header").addClass("accordion-header-border");
var _2f5=$(this).panel("header");
_2f5.removeClass("accordion-header-selected");
_2f5.find(".accordion-collapse").addClass("accordion-expand");
},onCollapse:function(){
if(isNaN(parseInt(opts.height))){
$(_2f2).find(">.panel-last>.accordion-header").removeClass("accordion-header-border");
}
if(_2f3.onCollapse){
_2f3.onCollapse.call(this);
}
opts.onUnselect.call(_2f2,$(this).panel("options").title,_2e5(_2f2,this));
}}));
var _2f6=pp.panel("header");
var tool=_2f6.children("div.panel-tool");
tool.children("a.panel-tool-collapse").hide();
var t=$("<a href=\"javascript:;\"></a>").addClass("accordion-collapse accordion-expand").appendTo(tool);
t.bind("click",function(){
_2f7(pp);
return false;
});
pp.panel("options").collapsible?t.show():t.hide();
if(opts.halign=="left"||opts.halign=="right"){
t.hide();
}
_2f6.click(function(){
_2f7(pp);
return false;
});
function _2f7(p){
var _2f8=p.panel("options");
if(_2f8.collapsible){
var _2f9=_2e5(_2f2,p);
if(_2f8.collapsed){
_2fa(_2f2,_2f9);
}else{
_2fb(_2f2,_2f9);
}
}
};
};
function _2fa(_2fc,_2fd){
var p=_2e8(_2fc,_2fd);
if(!p){
return;
}
_2fe(_2fc);
var opts=$.data(_2fc,"accordion").options;
p.panel("expand",opts.animate);
};
function _2fb(_2ff,_300){
var p=_2e8(_2ff,_300);
if(!p){
return;
}
_2fe(_2ff);
var opts=$.data(_2ff,"accordion").options;
p.panel("collapse",opts.animate);
};
function _301(_302){
var opts=$.data(_302,"accordion").options;
$(_302).find(">.panel-last>.accordion-header").addClass("accordion-header-border");
var p=_2dc(_302,"selected",true);
if(p){
_303(_2e5(_302,p));
}else{
_303(opts.selected);
}
function _303(_304){
var _305=opts.animate;
opts.animate=false;
_2fa(_302,_304);
opts.animate=_305;
};
};
function _2fe(_306){
var _307=$.data(_306,"accordion").panels;
for(var i=0;i<_307.length;i++){
_307[i].stop(true,true);
}
};
function add(_308,_309){
var _30a=$.data(_308,"accordion");
var opts=_30a.options;
var _30b=_30a.panels;
if(_309.selected==undefined){
_309.selected=true;
}
_2fe(_308);
var pp=$("<div></div>").appendTo(_308);
_30b.push(pp);
_2f1(_308,pp,_309);
_2ce(_308);
opts.onAdd.call(_308,_309.title,_30b.length-1);
if(_309.selected){
_2fa(_308,_30b.length-1);
}
};
function _30c(_30d,_30e){
var _30f=$.data(_30d,"accordion");
var opts=_30f.options;
var _310=_30f.panels;
_2fe(_30d);
var _311=_2e8(_30d,_30e);
var _312=_311.panel("options").title;
var _313=_2e5(_30d,_311);
if(!_311){
return;
}
if(opts.onBeforeRemove.call(_30d,_312,_313)==false){
return;
}
_310.splice(_313,1);
_311.panel("destroy");
if(_310.length){
_2ce(_30d);
var curr=_2e3(_30d);
if(!curr){
_2fa(_30d,0);
}
}
opts.onRemove.call(_30d,_312,_313);
};
$.fn.accordion=function(_314,_315){
if(typeof _314=="string"){
return $.fn.accordion.methods[_314](this,_315);
}
_314=_314||{};
return this.each(function(){
var _316=$.data(this,"accordion");
if(_316){
$.extend(_316.options,_314);
}else{
$.data(this,"accordion",{options:$.extend({},$.fn.accordion.defaults,$.fn.accordion.parseOptions(this),_314),accordion:$(this).addClass("accordion"),panels:[]});
init(this);
}
_2ec(this);
_2ce(this);
_301(this);
});
};
$.fn.accordion.methods={options:function(jq){
return $.data(jq[0],"accordion").options;
},panels:function(jq){
return $.data(jq[0],"accordion").panels;
},resize:function(jq,_317){
return jq.each(function(){
_2ce(this,_317);
});
},getSelections:function(jq){
return _2e1(jq[0]);
},getSelected:function(jq){
return _2e3(jq[0]);
},getPanel:function(jq,_318){
return _2e8(jq[0],_318);
},getPanelIndex:function(jq,_319){
return _2e5(jq[0],_319);
},select:function(jq,_31a){
return jq.each(function(){
_2fa(this,_31a);
});
},unselect:function(jq,_31b){
return jq.each(function(){
_2fb(this,_31b);
});
},add:function(jq,_31c){
return jq.each(function(){
add(this,_31c);
});
},remove:function(jq,_31d){
return jq.each(function(){
_30c(this,_31d);
});
}};
$.fn.accordion.parseOptions=function(_31e){
var t=$(_31e);
return $.extend({},$.parser.parseOptions(_31e,["width","height","halign",{fit:"boolean",border:"boolean",animate:"boolean",multiple:"boolean",selected:"number"}]));
};
$.fn.accordion.defaults={width:"auto",height:"auto",fit:false,border:true,animate:true,multiple:false,selected:0,halign:"top",onSelect:function(_31f,_320){
},onUnselect:function(_321,_322){
},onAdd:function(_323,_324){
},onBeforeRemove:function(_325,_326){
},onRemove:function(_327,_328){
}};
})(jQuery);
(function($){
function _329(c){
var w=0;
$(c).children().each(function(){
w+=$(this).outerWidth(true);
});
return w;
};
function _32a(_32b){
var opts=$.data(_32b,"tabs").options;
if(opts.tabPosition=="left"||opts.tabPosition=="right"||!opts.showHeader){
return;
}
var _32c=$(_32b).children("div.tabs-header");
var tool=_32c.children("div.tabs-tool:not(.tabs-tool-hidden)");
var _32d=_32c.children("div.tabs-scroller-left");
var _32e=_32c.children("div.tabs-scroller-right");
var wrap=_32c.children("div.tabs-wrap");
var _32f=_32c.outerHeight();
if(opts.plain){
_32f-=_32f-_32c.height();
}
tool._outerHeight(_32f);
var _330=_329(_32c.find("ul.tabs"));
var _331=_32c.width()-tool._outerWidth();
if(_330>_331){
_32d.add(_32e).show()._outerHeight(_32f);
if(opts.toolPosition=="left"){
tool.css({left:_32d.outerWidth(),right:""});
wrap.css({marginLeft:_32d.outerWidth()+tool._outerWidth(),marginRight:_32e._outerWidth(),width:_331-_32d.outerWidth()-_32e.outerWidth()});
}else{
tool.css({left:"",right:_32e.outerWidth()});
wrap.css({marginLeft:_32d.outerWidth(),marginRight:_32e.outerWidth()+tool._outerWidth(),width:_331-_32d.outerWidth()-_32e.outerWidth()});
}
}else{
_32d.add(_32e).hide();
if(opts.toolPosition=="left"){
tool.css({left:0,right:""});
wrap.css({marginLeft:tool._outerWidth(),marginRight:0,width:_331});
}else{
tool.css({left:"",right:0});
wrap.css({marginLeft:0,marginRight:tool._outerWidth(),width:_331});
}
}
};
function _332(_333){
var opts=$.data(_333,"tabs").options;
var _334=$(_333).children("div.tabs-header");
if(opts.tools){
if(typeof opts.tools=="string"){
$(opts.tools).addClass("tabs-tool").appendTo(_334);
$(opts.tools).show();
}else{
_334.children("div.tabs-tool").remove();
var _335=$("<div class=\"tabs-tool\"><table cellspacing=\"0\" cellpadding=\"0\" style=\"height:100%\"><tr></tr></table></div>").appendTo(_334);
var tr=_335.find("tr");
for(var i=0;i<opts.tools.length;i++){
var td=$("<td></td>").appendTo(tr);
var tool=$("<a href=\"javascript:;\"></a>").appendTo(td);
tool[0].onclick=eval(opts.tools[i].handler||function(){
});
tool.linkbutton($.extend({},opts.tools[i],{plain:true}));
}
}
}else{
_334.children("div.tabs-tool").remove();
}
};
function _336(_337,_338){
var _339=$.data(_337,"tabs");
var opts=_339.options;
var cc=$(_337);
if(!opts.doSize){
return;
}
if(_338){
$.extend(opts,{width:_338.width,height:_338.height});
}
cc._size(opts);
var _33a=cc.children("div.tabs-header");
var _33b=cc.children("div.tabs-panels");
var wrap=_33a.find("div.tabs-wrap");
var ul=wrap.find(".tabs");
ul.children("li").removeClass("tabs-first tabs-last");
ul.children("li:first").addClass("tabs-first");
ul.children("li:last").addClass("tabs-last");
if(opts.tabPosition=="left"||opts.tabPosition=="right"){
_33a._outerWidth(opts.showHeader?opts.headerWidth:0);
_33b._outerWidth(cc.width()-_33a.outerWidth());
_33a.add(_33b)._size("height",isNaN(parseInt(opts.height))?"":cc.height());
wrap._outerWidth(_33a.width());
ul._outerWidth(wrap.width()).css("height","");
}else{
_33a.children("div.tabs-scroller-left,div.tabs-scroller-right,div.tabs-tool:not(.tabs-tool-hidden)").css("display",opts.showHeader?"block":"none");
_33a._outerWidth(cc.width()).css("height","");
if(opts.showHeader){
_33a.css("background-color","");
wrap.css("height","");
}else{
_33a.css("background-color","transparent");
_33a._outerHeight(0);
wrap._outerHeight(0);
}
ul._outerHeight(opts.tabHeight).css("width","");
ul._outerHeight(ul.outerHeight()-ul.height()-1+opts.tabHeight).css("width","");
_33b._size("height",isNaN(parseInt(opts.height))?"":(cc.height()-_33a.outerHeight()));
_33b._size("width",cc.width());
}
if(_339.tabs.length){
var d1=ul.outerWidth(true)-ul.width();
var li=ul.children("li:first");
var d2=li.outerWidth(true)-li.width();
var _33c=_33a.width()-_33a.children(".tabs-tool:not(.tabs-tool-hidden)")._outerWidth();
var _33d=Math.floor((_33c-d1-d2*_339.tabs.length)/_339.tabs.length);
$.map(_339.tabs,function(p){
_33e(p,(opts.justified&&$.inArray(opts.tabPosition,["top","bottom"])>=0)?_33d:undefined);
});
if(opts.justified&&$.inArray(opts.tabPosition,["top","bottom"])>=0){
var _33f=_33c-d1-_329(ul);
_33e(_339.tabs[_339.tabs.length-1],_33d+_33f);
}
}
_32a(_337);
function _33e(p,_340){
var _341=p.panel("options");
var p_t=_341.tab.find("a.tabs-inner");
var _340=_340?_340:(parseInt(_341.tabWidth||opts.tabWidth||undefined));
if(_340){
p_t._outerWidth(_340);
}else{
p_t.css("width","");
}
p_t._outerHeight(opts.tabHeight);
p_t.css("lineHeight",p_t.height()+"px");
p_t.find(".easyui-fluid:visible").triggerHandler("_resize");
};
};
function _342(_343){
var opts=$.data(_343,"tabs").options;
var tab=_344(_343);
if(tab){
var _345=$(_343).children("div.tabs-panels");
var _346=opts.width=="auto"?"auto":_345.width();
var _347=opts.height=="auto"?"auto":_345.height();
tab.panel("resize",{width:_346,height:_347});
}
};
function _348(_349){
var tabs=$.data(_349,"tabs").tabs;
var cc=$(_349).addClass("tabs-container");
var _34a=$("<div class=\"tabs-panels\"></div>").insertBefore(cc);
cc.children("div").each(function(){
_34a[0].appendChild(this);
});
cc[0].appendChild(_34a[0]);
$("<div class=\"tabs-header\">"+"<div class=\"tabs-scroller-left\"></div>"+"<div class=\"tabs-scroller-right\"></div>"+"<div class=\"tabs-wrap\">"+"<ul class=\"tabs\"></ul>"+"</div>"+"</div>").prependTo(_349);
cc.children("div.tabs-panels").children("div").each(function(i){
var opts=$.extend({},$.parser.parseOptions(this),{disabled:($(this).attr("disabled")?true:undefined),selected:($(this).attr("selected")?true:undefined)});
_357(_349,opts,$(this));
});
cc.children("div.tabs-header").find(".tabs-scroller-left, .tabs-scroller-right").hover(function(){
$(this).addClass("tabs-scroller-over");
},function(){
$(this).removeClass("tabs-scroller-over");
});
cc.bind("_resize",function(e,_34b){
if($(this).hasClass("easyui-fluid")||_34b){
_336(_349);
_342(_349);
}
return false;
});
};
function _34c(_34d){
var _34e=$.data(_34d,"tabs");
var opts=_34e.options;
$(_34d).children("div.tabs-header").unbind().bind("click",function(e){
if($(e.target).hasClass("tabs-scroller-left")){
$(_34d).tabs("scrollBy",-opts.scrollIncrement);
}else{
if($(e.target).hasClass("tabs-scroller-right")){
$(_34d).tabs("scrollBy",opts.scrollIncrement);
}else{
var li=$(e.target).closest("li");
if(li.hasClass("tabs-disabled")){
return false;
}
var a=$(e.target).closest("a.tabs-close");
if(a.length){
_370(_34d,_34f(li));
}else{
if(li.length){
var _350=_34f(li);
var _351=_34e.tabs[_350].panel("options");
if(_351.collapsible){
_351.closed?_367(_34d,_350):_384(_34d,_350);
}else{
_367(_34d,_350);
}
}
}
return false;
}
}
}).bind("contextmenu",function(e){
var li=$(e.target).closest("li");
if(li.hasClass("tabs-disabled")){
return;
}
if(li.length){
opts.onContextMenu.call(_34d,e,li.find("span.tabs-title").html(),_34f(li));
}
});
function _34f(li){
var _352=0;
li.parent().children("li").each(function(i){
if(li[0]==this){
_352=i;
return false;
}
});
return _352;
};
};
function _353(_354){
var opts=$.data(_354,"tabs").options;
var _355=$(_354).children("div.tabs-header");
var _356=$(_354).children("div.tabs-panels");
_355.removeClass("tabs-header-top tabs-header-bottom tabs-header-left tabs-header-right");
_356.removeClass("tabs-panels-top tabs-panels-bottom tabs-panels-left tabs-panels-right");
if(opts.tabPosition=="top"){
_355.insertBefore(_356);
}else{
if(opts.tabPosition=="bottom"){
_355.insertAfter(_356);
_355.addClass("tabs-header-bottom");
_356.addClass("tabs-panels-top");
}else{
if(opts.tabPosition=="left"){
_355.addClass("tabs-header-left");
_356.addClass("tabs-panels-right");
}else{
if(opts.tabPosition=="right"){
_355.addClass("tabs-header-right");
_356.addClass("tabs-panels-left");
}
}
}
}
if(opts.plain==true){
_355.addClass("tabs-header-plain");
}else{
_355.removeClass("tabs-header-plain");
}
_355.removeClass("tabs-header-narrow").addClass(opts.narrow?"tabs-header-narrow":"");
var tabs=_355.find(".tabs");
tabs.removeClass("tabs-pill").addClass(opts.pill?"tabs-pill":"");
tabs.removeClass("tabs-narrow").addClass(opts.narrow?"tabs-narrow":"");
tabs.removeClass("tabs-justified").addClass(opts.justified?"tabs-justified":"");
if(opts.border==true){
_355.removeClass("tabs-header-noborder");
_356.removeClass("tabs-panels-noborder");
}else{
_355.addClass("tabs-header-noborder");
_356.addClass("tabs-panels-noborder");
}
opts.doSize=true;
};
function _357(_358,_359,pp){
_359=_359||{};
var _35a=$.data(_358,"tabs");
var tabs=_35a.tabs;
if(_359.index==undefined||_359.index>tabs.length){
_359.index=tabs.length;
}
if(_359.index<0){
_359.index=0;
}
var ul=$(_358).children("div.tabs-header").find("ul.tabs");
var _35b=$(_358).children("div.tabs-panels");
var tab=$("<li>"+"<a href=\"javascript:;\" class=\"tabs-inner\">"+"<span class=\"tabs-title\"></span>"+"<span class=\"tabs-icon\"></span>"+"</a>"+"</li>");
if(!pp){
pp=$("<div></div>");
}
if(_359.index>=tabs.length){
tab.appendTo(ul);
pp.appendTo(_35b);
tabs.push(pp);
}else{
tab.insertBefore(ul.children("li:eq("+_359.index+")"));
pp.insertBefore(_35b.children("div.panel:eq("+_359.index+")"));
tabs.splice(_359.index,0,pp);
}
pp.panel($.extend({},_359,{tab:tab,border:false,noheader:true,closed:true,doSize:false,iconCls:(_359.icon?_359.icon:undefined),onLoad:function(){
if(_359.onLoad){
_359.onLoad.call(this,arguments);
}
_35a.options.onLoad.call(_358,$(this));
},onBeforeOpen:function(){
if(_359.onBeforeOpen){
if(_359.onBeforeOpen.call(this)==false){
return false;
}
}
var p=$(_358).tabs("getSelected");
if(p){
if(p[0]!=this){
$(_358).tabs("unselect",_362(_358,p));
p=$(_358).tabs("getSelected");
if(p){
return false;
}
}else{
_342(_358);
return false;
}
}
var _35c=$(this).panel("options");
_35c.tab.addClass("tabs-selected");
var wrap=$(_358).find(">div.tabs-header>div.tabs-wrap");
var left=_35c.tab.position().left;
var _35d=left+_35c.tab.outerWidth();
if(left<0||_35d>wrap.width()){
var _35e=left-(wrap.width()-_35c.tab.width())/2;
$(_358).tabs("scrollBy",_35e);
}else{
$(_358).tabs("scrollBy",0);
}
var _35f=$(this).panel("panel");
_35f.css("display","block");
_342(_358);
_35f.css("display","none");
},onOpen:function(){
if(_359.onOpen){
_359.onOpen.call(this);
}
var _360=$(this).panel("options");
_35a.selectHis.push(_360.title);
_35a.options.onSelect.call(_358,_360.title,_362(_358,this));
},onBeforeClose:function(){
if(_359.onBeforeClose){
if(_359.onBeforeClose.call(this)==false){
return false;
}
}
$(this).panel("options").tab.removeClass("tabs-selected");
},onClose:function(){
if(_359.onClose){
_359.onClose.call(this);
}
var _361=$(this).panel("options");
_35a.options.onUnselect.call(_358,_361.title,_362(_358,this));
}}));
$(_358).tabs("update",{tab:pp,options:pp.panel("options"),type:"header"});
};
function _363(_364,_365){
var _366=$.data(_364,"tabs");
var opts=_366.options;
if(_365.selected==undefined){
_365.selected=true;
}
_357(_364,_365);
opts.onAdd.call(_364,_365.title,_365.index);
if(_365.selected){
_367(_364,_365.index);
}
};
function _368(_369,_36a){
_36a.type=_36a.type||"all";
var _36b=$.data(_369,"tabs").selectHis;
var pp=_36a.tab;
var opts=pp.panel("options");
var _36c=opts.title;
$.extend(opts,_36a.options,{iconCls:(_36a.options.icon?_36a.options.icon:undefined)});
if(_36a.type=="all"||_36a.type=="body"){
pp.panel();
}
if(_36a.type=="all"||_36a.type=="header"){
var tab=opts.tab;
if(opts.header){
tab.find(".tabs-inner").html($(opts.header));
}else{
var _36d=tab.find("span.tabs-title");
var _36e=tab.find("span.tabs-icon");
_36d.html(opts.title);
_36e.attr("class","tabs-icon");
tab.find("a.tabs-close").remove();
if(opts.closable){
_36d.addClass("tabs-closable");
$("<a href=\"javascript:;\" class=\"tabs-close\"></a>").appendTo(tab);
}else{
_36d.removeClass("tabs-closable");
}
if(opts.iconCls){
_36d.addClass("tabs-with-icon");
_36e.addClass(opts.iconCls);
}else{
_36d.removeClass("tabs-with-icon");
}
if(opts.tools){
var _36f=tab.find("span.tabs-p-tool");
if(!_36f.length){
var _36f=$("<span class=\"tabs-p-tool\"></span>").insertAfter(tab.find("a.tabs-inner"));
}
if($.isArray(opts.tools)){
_36f.empty();
for(var i=0;i<opts.tools.length;i++){
var t=$("<a href=\"javascript:;\"></a>").appendTo(_36f);
t.addClass(opts.tools[i].iconCls);
if(opts.tools[i].handler){
t.bind("click",{handler:opts.tools[i].handler},function(e){
if($(this).parents("li").hasClass("tabs-disabled")){
return;
}
e.data.handler.call(this);
});
}
}
}else{
$(opts.tools).children().appendTo(_36f);
}
var pr=_36f.children().length*12;
if(opts.closable){
pr+=8;
_36f.css("right","");
}else{
pr-=3;
_36f.css("right","5px");
}
_36d.css("padding-right",pr+"px");
}else{
tab.find("span.tabs-p-tool").remove();
_36d.css("padding-right","");
}
}
if(_36c!=opts.title){
for(var i=0;i<_36b.length;i++){
if(_36b[i]==_36c){
_36b[i]=opts.title;
}
}
}
}
if(opts.disabled){
opts.tab.addClass("tabs-disabled");
}else{
opts.tab.removeClass("tabs-disabled");
}
_336(_369);
$.data(_369,"tabs").options.onUpdate.call(_369,opts.title,_362(_369,pp));
};
function _370(_371,_372){
var opts=$.data(_371,"tabs").options;
var tabs=$.data(_371,"tabs").tabs;
var _373=$.data(_371,"tabs").selectHis;
if(!_374(_371,_372)){
return;
}
var tab=_375(_371,_372);
var _376=tab.panel("options").title;
var _377=_362(_371,tab);
if(opts.onBeforeClose.call(_371,_376,_377)==false){
return;
}
var tab=_375(_371,_372,true);
tab.panel("options").tab.remove();
tab.panel("destroy");
opts.onClose.call(_371,_376,_377);
_336(_371);
for(var i=0;i<_373.length;i++){
if(_373[i]==_376){
_373.splice(i,1);
i--;
}
}
var _378=_373.pop();
if(_378){
_367(_371,_378);
}else{
if(tabs.length){
_367(_371,0);
}
}
};
function _375(_379,_37a,_37b){
var tabs=$.data(_379,"tabs").tabs;
var tab=null;
if(typeof _37a=="number"){
if(_37a>=0&&_37a<tabs.length){
tab=tabs[_37a];
if(_37b){
tabs.splice(_37a,1);
}
}
}else{
var tmp=$("<span></span>");
for(var i=0;i<tabs.length;i++){
var p=tabs[i];
tmp.html(p.panel("options").title);
if(tmp.text()==_37a){
tab=p;
if(_37b){
tabs.splice(i,1);
}
break;
}
}
tmp.remove();
}
return tab;
};
function _362(_37c,tab){
var tabs=$.data(_37c,"tabs").tabs;
for(var i=0;i<tabs.length;i++){
if(tabs[i][0]==$(tab)[0]){
return i;
}
}
return -1;
};
function _344(_37d){
var tabs=$.data(_37d,"tabs").tabs;
for(var i=0;i<tabs.length;i++){
var tab=tabs[i];
if(tab.panel("options").tab.hasClass("tabs-selected")){
return tab;
}
}
return null;
};
function _37e(_37f){
var _380=$.data(_37f,"tabs");
var tabs=_380.tabs;
for(var i=0;i<tabs.length;i++){
var opts=tabs[i].panel("options");
if(opts.selected&&!opts.disabled){
_367(_37f,i);
return;
}
}
_367(_37f,_380.options.selected);
};
function _367(_381,_382){
var p=_375(_381,_382);
if(p&&!p.is(":visible")){
_383(_381);
if(!p.panel("options").disabled){
p.panel("open");
}
}
};
function _384(_385,_386){
var p=_375(_385,_386);
if(p&&p.is(":visible")){
_383(_385);
p.panel("close");
}
};
function _383(_387){
$(_387).children("div.tabs-panels").each(function(){
$(this).stop(true,true);
});
};
function _374(_388,_389){
return _375(_388,_389)!=null;
};
function _38a(_38b,_38c){
var opts=$.data(_38b,"tabs").options;
opts.showHeader=_38c;
$(_38b).tabs("resize");
};
function _38d(_38e,_38f){
var tool=$(_38e).find(">.tabs-header>.tabs-tool");
if(_38f){
tool.removeClass("tabs-tool-hidden").show();
}else{
tool.addClass("tabs-tool-hidden").hide();
}
$(_38e).tabs("resize").tabs("scrollBy",0);
};
$.fn.tabs=function(_390,_391){
if(typeof _390=="string"){
return $.fn.tabs.methods[_390](this,_391);
}
_390=_390||{};
return this.each(function(){
var _392=$.data(this,"tabs");
if(_392){
$.extend(_392.options,_390);
}else{
$.data(this,"tabs",{options:$.extend({},$.fn.tabs.defaults,$.fn.tabs.parseOptions(this),_390),tabs:[],selectHis:[]});
_348(this);
}
_332(this);
_353(this);
_336(this);
_34c(this);
_37e(this);
});
};
$.fn.tabs.methods={options:function(jq){
var cc=jq[0];
var opts=$.data(cc,"tabs").options;
var s=_344(cc);
opts.selected=s?_362(cc,s):-1;
return opts;
},tabs:function(jq){
return $.data(jq[0],"tabs").tabs;
},resize:function(jq,_393){
return jq.each(function(){
_336(this,_393);
_342(this);
});
},add:function(jq,_394){
return jq.each(function(){
_363(this,_394);
});
},close:function(jq,_395){
return jq.each(function(){
_370(this,_395);
});
},getTab:function(jq,_396){
return _375(jq[0],_396);
},getTabIndex:function(jq,tab){
return _362(jq[0],tab);
},getSelected:function(jq){
return _344(jq[0]);
},select:function(jq,_397){
return jq.each(function(){
_367(this,_397);
});
},unselect:function(jq,_398){
return jq.each(function(){
_384(this,_398);
});
},exists:function(jq,_399){
return _374(jq[0],_399);
},update:function(jq,_39a){
return jq.each(function(){
_368(this,_39a);
});
},enableTab:function(jq,_39b){
return jq.each(function(){
var opts=$(this).tabs("getTab",_39b).panel("options");
opts.tab.removeClass("tabs-disabled");
opts.disabled=false;
});
},disableTab:function(jq,_39c){
return jq.each(function(){
var opts=$(this).tabs("getTab",_39c).panel("options");
opts.tab.addClass("tabs-disabled");
opts.disabled=true;
});
},showHeader:function(jq){
return jq.each(function(){
_38a(this,true);
});
},hideHeader:function(jq){
return jq.each(function(){
_38a(this,false);
});
},showTool:function(jq){
return jq.each(function(){
_38d(this,true);
});
},hideTool:function(jq){
return jq.each(function(){
_38d(this,false);
});
},scrollBy:function(jq,_39d){
return jq.each(function(){
var opts=$(this).tabs("options");
var wrap=$(this).find(">div.tabs-header>div.tabs-wrap");
var pos=Math.min(wrap._scrollLeft()+_39d,_39e());
wrap.animate({scrollLeft:pos},opts.scrollDuration);
function _39e(){
var w=0;
var ul=wrap.children("ul");
ul.children("li").each(function(){
w+=$(this).outerWidth(true);
});
return w-wrap.width()+(ul.outerWidth()-ul.width());
};
});
}};
$.fn.tabs.parseOptions=function(_39f){
return $.extend({},$.parser.parseOptions(_39f,["tools","toolPosition","tabPosition",{fit:"boolean",border:"boolean",plain:"boolean"},{headerWidth:"number",tabWidth:"number",tabHeight:"number",selected:"number"},{showHeader:"boolean",justified:"boolean",narrow:"boolean",pill:"boolean"}]));
};
$.fn.tabs.defaults={width:"auto",height:"auto",headerWidth:150,tabWidth:"auto",tabHeight:27,selected:0,showHeader:true,plain:false,fit:false,border:true,justified:false,narrow:false,pill:false,tools:null,toolPosition:"right",tabPosition:"top",scrollIncrement:100,scrollDuration:400,onLoad:function(_3a0){
},onSelect:function(_3a1,_3a2){
},onUnselect:function(_3a3,_3a4){
},onBeforeClose:function(_3a5,_3a6){
},onClose:function(_3a7,_3a8){
},onAdd:function(_3a9,_3aa){
},onUpdate:function(_3ab,_3ac){
},onContextMenu:function(e,_3ad,_3ae){
}};
})(jQuery);
(function($){
var _3af=false;
function _3b0(_3b1,_3b2){
var _3b3=$.data(_3b1,"layout");
var opts=_3b3.options;
var _3b4=_3b3.panels;
var cc=$(_3b1);
if(_3b2){
$.extend(opts,{width:_3b2.width,height:_3b2.height});
}
if(_3b1.tagName.toLowerCase()=="body"){
cc._size("fit");
}else{
cc._size(opts);
}
var cpos={top:0,left:0,width:cc.width(),height:cc.height()};
_3b5(_3b6(_3b4.expandNorth)?_3b4.expandNorth:_3b4.north,"n");
_3b5(_3b6(_3b4.expandSouth)?_3b4.expandSouth:_3b4.south,"s");
_3b7(_3b6(_3b4.expandEast)?_3b4.expandEast:_3b4.east,"e");
_3b7(_3b6(_3b4.expandWest)?_3b4.expandWest:_3b4.west,"w");
_3b4.center.panel("resize",cpos);
function _3b5(pp,type){
if(!pp.length||!_3b6(pp)){
return;
}
var opts=pp.panel("options");
pp.panel("resize",{width:cc.width(),height:opts.height});
var _3b8=pp.panel("panel").outerHeight();
pp.panel("move",{left:0,top:(type=="n"?0:cc.height()-_3b8)});
cpos.height-=_3b8;
if(type=="n"){
cpos.top+=_3b8;
if(!opts.split&&opts.border){
cpos.top--;
}
}
if(!opts.split&&opts.border){
cpos.height++;
}
};
function _3b7(pp,type){
if(!pp.length||!_3b6(pp)){
return;
}
var opts=pp.panel("options");
pp.panel("resize",{width:opts.width,height:cpos.height});
var _3b9=pp.panel("panel").outerWidth();
pp.panel("move",{left:(type=="e"?cc.width()-_3b9:0),top:cpos.top});
cpos.width-=_3b9;
if(type=="w"){
cpos.left+=_3b9;
if(!opts.split&&opts.border){
cpos.left--;
}
}
if(!opts.split&&opts.border){
cpos.width++;
}
};
};
function init(_3ba){
var cc=$(_3ba);
cc.addClass("layout");
function _3bb(el){
var _3bc=$.fn.layout.parsePanelOptions(el);
if("north,south,east,west,center".indexOf(_3bc.region)>=0){
_3bf(_3ba,_3bc,el);
}
};
var opts=cc.layout("options");
var _3bd=opts.onAdd;
opts.onAdd=function(){
};
cc.find(">div,>form>div").each(function(){
_3bb(this);
});
opts.onAdd=_3bd;
cc.append("<div class=\"layout-split-proxy-h\"></div><div class=\"layout-split-proxy-v\"></div>");
cc.bind("_resize",function(e,_3be){
if($(this).hasClass("easyui-fluid")||_3be){
_3b0(_3ba);
}
return false;
});
};
function _3bf(_3c0,_3c1,el){
_3c1.region=_3c1.region||"center";
var _3c2=$.data(_3c0,"layout").panels;
var cc=$(_3c0);
var dir=_3c1.region;
if(_3c2[dir].length){
return;
}
var pp=$(el);
if(!pp.length){
pp=$("<div></div>").appendTo(cc);
}
var _3c3=$.extend({},$.fn.layout.paneldefaults,{width:(pp.length?parseInt(pp[0].style.width)||pp.outerWidth():"auto"),height:(pp.length?parseInt(pp[0].style.height)||pp.outerHeight():"auto"),doSize:false,collapsible:true,onOpen:function(){
var tool=$(this).panel("header").children("div.panel-tool");
tool.children("a.panel-tool-collapse").hide();
var _3c4={north:"up",south:"down",east:"right",west:"left"};
if(!_3c4[dir]){
return;
}
var _3c5="layout-button-"+_3c4[dir];
var t=tool.children("a."+_3c5);
if(!t.length){
t=$("<a href=\"javascript:;\"></a>").addClass(_3c5).appendTo(tool);
t.bind("click",{dir:dir},function(e){
_3dc(_3c0,e.data.dir);
return false;
});
}
$(this).panel("options").collapsible?t.show():t.hide();
}},_3c1,{cls:((_3c1.cls||"")+" layout-panel layout-panel-"+dir),bodyCls:((_3c1.bodyCls||"")+" layout-body")});
pp.panel(_3c3);
_3c2[dir]=pp;
var _3c6={north:"s",south:"n",east:"w",west:"e"};
var _3c7=pp.panel("panel");
if(pp.panel("options").split){
_3c7.addClass("layout-split-"+dir);
}
_3c7.resizable($.extend({},{handles:(_3c6[dir]||""),disabled:(!pp.panel("options").split),onStartResize:function(e){
_3af=true;
if(dir=="north"||dir=="south"){
var _3c8=$(">div.layout-split-proxy-v",_3c0);
}else{
var _3c8=$(">div.layout-split-proxy-h",_3c0);
}
var top=0,left=0,_3c9=0,_3ca=0;
var pos={display:"block"};
if(dir=="north"){
pos.top=parseInt(_3c7.css("top"))+_3c7.outerHeight()-_3c8.height();
pos.left=parseInt(_3c7.css("left"));
pos.width=_3c7.outerWidth();
pos.height=_3c8.height();
}else{
if(dir=="south"){
pos.top=parseInt(_3c7.css("top"));
pos.left=parseInt(_3c7.css("left"));
pos.width=_3c7.outerWidth();
pos.height=_3c8.height();
}else{
if(dir=="east"){
pos.top=parseInt(_3c7.css("top"))||0;
pos.left=parseInt(_3c7.css("left"))||0;
pos.width=_3c8.width();
pos.height=_3c7.outerHeight();
}else{
if(dir=="west"){
pos.top=parseInt(_3c7.css("top"))||0;
pos.left=_3c7.outerWidth()-_3c8.width();
pos.width=_3c8.width();
pos.height=_3c7.outerHeight();
}
}
}
}
_3c8.css(pos);
$("<div class=\"layout-mask\"></div>").css({left:0,top:0,width:cc.width(),height:cc.height()}).appendTo(cc);
},onResize:function(e){
if(dir=="north"||dir=="south"){
var _3cb=_3cc(this);
$(this).resizable("options").maxHeight=_3cb;
var _3cd=$(">div.layout-split-proxy-v",_3c0);
var top=dir=="north"?e.data.height-_3cd.height():$(_3c0).height()-e.data.height;
_3cd.css("top",top);
}else{
var _3ce=_3cc(this);
$(this).resizable("options").maxWidth=_3ce;
var _3cd=$(">div.layout-split-proxy-h",_3c0);
var left=dir=="west"?e.data.width-_3cd.width():$(_3c0).width()-e.data.width;
_3cd.css("left",left);
}
return false;
},onStopResize:function(e){
cc.children("div.layout-split-proxy-v,div.layout-split-proxy-h").hide();
pp.panel("resize",e.data);
_3b0(_3c0);
_3af=false;
cc.find(">div.layout-mask").remove();
}},_3c1));
cc.layout("options").onAdd.call(_3c0,dir);
function _3cc(p){
var _3cf="expand"+dir.substring(0,1).toUpperCase()+dir.substring(1);
var _3d0=_3c2["center"];
var _3d1=(dir=="north"||dir=="south")?"minHeight":"minWidth";
var _3d2=(dir=="north"||dir=="south")?"maxHeight":"maxWidth";
var _3d3=(dir=="north"||dir=="south")?"_outerHeight":"_outerWidth";
var _3d4=$.parser.parseValue(_3d2,_3c2[dir].panel("options")[_3d2],$(_3c0));
var _3d5=$.parser.parseValue(_3d1,_3d0.panel("options")[_3d1],$(_3c0));
var _3d6=_3d0.panel("panel")[_3d3]()-_3d5;
if(_3b6(_3c2[_3cf])){
_3d6+=_3c2[_3cf][_3d3]()-1;
}else{
_3d6+=$(p)[_3d3]();
}
if(_3d6>_3d4){
_3d6=_3d4;
}
return _3d6;
};
};
function _3d7(_3d8,_3d9){
var _3da=$.data(_3d8,"layout").panels;
if(_3da[_3d9].length){
_3da[_3d9].panel("destroy");
_3da[_3d9]=$();
var _3db="expand"+_3d9.substring(0,1).toUpperCase()+_3d9.substring(1);
if(_3da[_3db]){
_3da[_3db].panel("destroy");
_3da[_3db]=undefined;
}
$(_3d8).layout("options").onRemove.call(_3d8,_3d9);
}
};
function _3dc(_3dd,_3de,_3df){
if(_3df==undefined){
_3df="normal";
}
var _3e0=$.data(_3dd,"layout").panels;
var p=_3e0[_3de];
var _3e1=p.panel("options");
if(_3e1.onBeforeCollapse.call(p)==false){
return;
}
var _3e2="expand"+_3de.substring(0,1).toUpperCase()+_3de.substring(1);
if(!_3e0[_3e2]){
_3e0[_3e2]=_3e3(_3de);
var ep=_3e0[_3e2].panel("panel");
if(!_3e1.expandMode){
ep.css("cursor","default");
}else{
ep.bind("click",function(){
if(_3e1.expandMode=="dock"){
_3ef(_3dd,_3de);
}else{
p.panel("expand",false).panel("open");
var _3e4=_3e5();
p.panel("resize",_3e4.collapse);
p.panel("panel").animate(_3e4.expand,function(){
$(this).unbind(".layout").bind("mouseleave.layout",{region:_3de},function(e){
if(_3af==true){
return;
}
if($("body>div.combo-p>div.combo-panel:visible").length){
return;
}
_3dc(_3dd,e.data.region);
});
$(_3dd).layout("options").onExpand.call(_3dd,_3de);
});
}
return false;
});
}
}
var _3e6=_3e5();
if(!_3b6(_3e0[_3e2])){
_3e0.center.panel("resize",_3e6.resizeC);
}
p.panel("panel").animate(_3e6.collapse,_3df,function(){
p.panel("collapse",false).panel("close");
_3e0[_3e2].panel("open").panel("resize",_3e6.expandP);
$(this).unbind(".layout");
$(_3dd).layout("options").onCollapse.call(_3dd,_3de);
});
function _3e3(dir){
var _3e7={"east":"left","west":"right","north":"down","south":"up"};
var isns=(_3e1.region=="north"||_3e1.region=="south");
var icon="layout-button-"+_3e7[dir];
var p=$("<div></div>").appendTo(_3dd);
p.panel($.extend({},$.fn.layout.paneldefaults,{cls:("layout-expand layout-expand-"+dir),title:"&nbsp;",titleDirection:_3e1.titleDirection,iconCls:(_3e1.hideCollapsedContent?null:_3e1.iconCls),closed:true,minWidth:0,minHeight:0,doSize:false,region:_3e1.region,collapsedSize:_3e1.collapsedSize,noheader:(!isns&&_3e1.hideExpandTool),tools:((isns&&_3e1.hideExpandTool)?null:[{iconCls:icon,handler:function(){
_3ef(_3dd,_3de);
return false;
}}]),onResize:function(){
var _3e8=$(this).children(".layout-expand-title");
if(_3e8.length){
_3e8._outerWidth($(this).height());
var left=($(this).width()-Math.min(_3e8._outerWidth(),_3e8._outerHeight()))/2;
var top=Math.max(_3e8._outerWidth(),_3e8._outerHeight());
if(_3e8.hasClass("layout-expand-title-down")){
left+=Math.min(_3e8._outerWidth(),_3e8._outerHeight());
top=0;
}
_3e8.css({left:(left+"px"),top:(top+"px")});
}
}}));
if(!_3e1.hideCollapsedContent){
var _3e9=typeof _3e1.collapsedContent=="function"?_3e1.collapsedContent.call(p[0],_3e1.title):_3e1.collapsedContent;
isns?p.panel("setTitle",_3e9):p.html(_3e9);
}
p.panel("panel").hover(function(){
$(this).addClass("layout-expand-over");
},function(){
$(this).removeClass("layout-expand-over");
});
return p;
};
function _3e5(){
var cc=$(_3dd);
var _3ea=_3e0.center.panel("options");
var _3eb=_3e1.collapsedSize;
if(_3de=="east"){
var _3ec=p.panel("panel")._outerWidth();
var _3ed=_3ea.width+_3ec-_3eb;
if(_3e1.split||!_3e1.border){
_3ed++;
}
return {resizeC:{width:_3ed},expand:{left:cc.width()-_3ec},expandP:{top:_3ea.top,left:cc.width()-_3eb,width:_3eb,height:_3ea.height},collapse:{left:cc.width(),top:_3ea.top,height:_3ea.height}};
}else{
if(_3de=="west"){
var _3ec=p.panel("panel")._outerWidth();
var _3ed=_3ea.width+_3ec-_3eb;
if(_3e1.split||!_3e1.border){
_3ed++;
}
return {resizeC:{width:_3ed,left:_3eb-1},expand:{left:0},expandP:{left:0,top:_3ea.top,width:_3eb,height:_3ea.height},collapse:{left:-_3ec,top:_3ea.top,height:_3ea.height}};
}else{
if(_3de=="north"){
var _3ee=p.panel("panel")._outerHeight();
var hh=_3ea.height;
if(!_3b6(_3e0.expandNorth)){
hh+=_3ee-_3eb+((_3e1.split||!_3e1.border)?1:0);
}
_3e0.east.add(_3e0.west).add(_3e0.expandEast).add(_3e0.expandWest).panel("resize",{top:_3eb-1,height:hh});
return {resizeC:{top:_3eb-1,height:hh},expand:{top:0},expandP:{top:0,left:0,width:cc.width(),height:_3eb},collapse:{top:-_3ee,width:cc.width()}};
}else{
if(_3de=="south"){
var _3ee=p.panel("panel")._outerHeight();
var hh=_3ea.height;
if(!_3b6(_3e0.expandSouth)){
hh+=_3ee-_3eb+((_3e1.split||!_3e1.border)?1:0);
}
_3e0.east.add(_3e0.west).add(_3e0.expandEast).add(_3e0.expandWest).panel("resize",{height:hh});
return {resizeC:{height:hh},expand:{top:cc.height()-_3ee},expandP:{top:cc.height()-_3eb,left:0,width:cc.width(),height:_3eb},collapse:{top:cc.height(),width:cc.width()}};
}
}
}
}
};
};
function _3ef(_3f0,_3f1){
var _3f2=$.data(_3f0,"layout").panels;
var p=_3f2[_3f1];
var _3f3=p.panel("options");
if(_3f3.onBeforeExpand.call(p)==false){
return;
}
var _3f4="expand"+_3f1.substring(0,1).toUpperCase()+_3f1.substring(1);
if(_3f2[_3f4]){
_3f2[_3f4].panel("close");
p.panel("panel").stop(true,true);
p.panel("expand",false).panel("open");
var _3f5=_3f6();
p.panel("resize",_3f5.collapse);
p.panel("panel").animate(_3f5.expand,function(){
_3b0(_3f0);
$(_3f0).layout("options").onExpand.call(_3f0,_3f1);
});
}
function _3f6(){
var cc=$(_3f0);
var _3f7=_3f2.center.panel("options");
if(_3f1=="east"&&_3f2.expandEast){
return {collapse:{left:cc.width(),top:_3f7.top,height:_3f7.height},expand:{left:cc.width()-p.panel("panel")._outerWidth()}};
}else{
if(_3f1=="west"&&_3f2.expandWest){
return {collapse:{left:-p.panel("panel")._outerWidth(),top:_3f7.top,height:_3f7.height},expand:{left:0}};
}else{
if(_3f1=="north"&&_3f2.expandNorth){
return {collapse:{top:-p.panel("panel")._outerHeight(),width:cc.width()},expand:{top:0}};
}else{
if(_3f1=="south"&&_3f2.expandSouth){
return {collapse:{top:cc.height(),width:cc.width()},expand:{top:cc.height()-p.panel("panel")._outerHeight()}};
}
}
}
}
};
};
function _3b6(pp){
if(!pp){
return false;
}
if(pp.length){
return pp.panel("panel").is(":visible");
}else{
return false;
}
};
function _3f8(_3f9){
var _3fa=$.data(_3f9,"layout");
var opts=_3fa.options;
var _3fb=_3fa.panels;
var _3fc=opts.onCollapse;
opts.onCollapse=function(){
};
_3fd("east");
_3fd("west");
_3fd("north");
_3fd("south");
opts.onCollapse=_3fc;
function _3fd(_3fe){
var p=_3fb[_3fe];
if(p.length&&p.panel("options").collapsed){
_3dc(_3f9,_3fe,0);
}
};
};
function _3ff(_400,_401,_402){
var p=$(_400).layout("panel",_401);
p.panel("options").split=_402;
var cls="layout-split-"+_401;
var _403=p.panel("panel").removeClass(cls);
if(_402){
_403.addClass(cls);
}
_403.resizable({disabled:(!_402)});
_3b0(_400);
};
$.fn.layout=function(_404,_405){
if(typeof _404=="string"){
return $.fn.layout.methods[_404](this,_405);
}
_404=_404||{};
return this.each(function(){
var _406=$.data(this,"layout");
if(_406){
$.extend(_406.options,_404);
}else{
var opts=$.extend({},$.fn.layout.defaults,$.fn.layout.parseOptions(this),_404);
$.data(this,"layout",{options:opts,panels:{center:$(),north:$(),south:$(),east:$(),west:$()}});
init(this);
}
_3b0(this);
_3f8(this);
});
};
$.fn.layout.methods={options:function(jq){
return $.data(jq[0],"layout").options;
},resize:function(jq,_407){
return jq.each(function(){
_3b0(this,_407);
});
},panel:function(jq,_408){
return $.data(jq[0],"layout").panels[_408];
},collapse:function(jq,_409){
return jq.each(function(){
_3dc(this,_409);
});
},expand:function(jq,_40a){
return jq.each(function(){
_3ef(this,_40a);
});
},add:function(jq,_40b){
return jq.each(function(){
_3bf(this,_40b);
_3b0(this);
if($(this).layout("panel",_40b.region).panel("options").collapsed){
_3dc(this,_40b.region,0);
}
});
},remove:function(jq,_40c){
return jq.each(function(){
_3d7(this,_40c);
_3b0(this);
});
},split:function(jq,_40d){
return jq.each(function(){
_3ff(this,_40d,true);
});
},unsplit:function(jq,_40e){
return jq.each(function(){
_3ff(this,_40e,false);
});
}};
$.fn.layout.parseOptions=function(_40f){
return $.extend({},$.parser.parseOptions(_40f,[{fit:"boolean"}]));
};
$.fn.layout.defaults={fit:false,onExpand:function(_410){
},onCollapse:function(_411){
},onAdd:function(_412){
},onRemove:function(_413){
}};
$.fn.layout.parsePanelOptions=function(_414){
var t=$(_414);
return $.extend({},$.fn.panel.parseOptions(_414),$.parser.parseOptions(_414,["region",{split:"boolean",collpasedSize:"number",minWidth:"number",minHeight:"number",maxWidth:"number",maxHeight:"number"}]));
};
$.fn.layout.paneldefaults=$.extend({},$.fn.panel.defaults,{region:null,split:false,collapsedSize:28,expandMode:"float",hideExpandTool:false,hideCollapsedContent:true,collapsedContent:function(_415){
var p=$(this);
var opts=p.panel("options");
if(opts.region=="north"||opts.region=="south"){
return _415;
}
var cc=[];
if(opts.iconCls){
cc.push("<div class=\"panel-icon "+opts.iconCls+"\"></div>");
}
cc.push("<div class=\"panel-title layout-expand-title");
cc.push(" layout-expand-title-"+opts.titleDirection);
cc.push(opts.iconCls?" layout-expand-with-icon":"");
cc.push("\">");
cc.push(_415);
cc.push("</div>");
return cc.join("");
},minWidth:10,minHeight:10,maxWidth:10000,maxHeight:10000});
})(jQuery);
(function($){
$(function(){
$(document).unbind(".menu").bind("mousedown.menu",function(e){
var m=$(e.target).closest("div.menu,div.combo-p");
if(m.length){
return;
}
$("body>div.menu-top:visible").not(".menu-inline").menu("hide");
_416($("body>div.menu:visible").not(".menu-inline"));
});
});
function init(_417){
var opts=$.data(_417,"menu").options;
$(_417).addClass("menu-top");
opts.inline?$(_417).addClass("menu-inline"):$(_417).appendTo("body");
$(_417).bind("_resize",function(e,_418){
if($(this).hasClass("easyui-fluid")||_418){
$(_417).menu("resize",_417);
}
return false;
});
var _419=_41a($(_417));
for(var i=0;i<_419.length;i++){
_41d(_417,_419[i]);
}
function _41a(menu){
var _41b=[];
menu.addClass("menu");
_41b.push(menu);
if(!menu.hasClass("menu-content")){
menu.children("div").each(function(){
var _41c=$(this).children("div");
if(_41c.length){
_41c.appendTo("body");
this.submenu=_41c;
var mm=_41a(_41c);
_41b=_41b.concat(mm);
}
});
}
return _41b;
};
};
function _41d(_41e,div){
var menu=$(div).addClass("menu");
if(!menu.data("menu")){
menu.data("menu",{options:$.parser.parseOptions(menu[0],["width","height"])});
}
if(!menu.hasClass("menu-content")){
menu.children("div").each(function(){
_41f(_41e,this);
});
$("<div class=\"menu-line\"></div>").prependTo(menu);
}
_420(_41e,menu);
if(!menu.hasClass("menu-inline")){
menu.hide();
}
_421(_41e,menu);
};
function _41f(_422,div,_423){
var item=$(div);
var _424=$.extend({},$.parser.parseOptions(item[0],["id","name","iconCls","href",{separator:"boolean"}]),{disabled:(item.attr("disabled")?true:undefined),text:$.trim(item.html()),onclick:item[0].onclick},_423||{});
_424.onclick=_424.onclick||_424.handler||null;
item.data("menuitem",{options:_424});
if(_424.separator){
item.addClass("menu-sep");
}
if(!item.hasClass("menu-sep")){
item.addClass("menu-item");
item.empty().append($("<div class=\"menu-text\"></div>").html(_424.text));
if(_424.iconCls){
$("<div class=\"menu-icon\"></div>").addClass(_424.iconCls).appendTo(item);
}
if(_424.id){
item.attr("id",_424.id);
}
if(_424.onclick){
if(typeof _424.onclick=="string"){
item.attr("onclick",_424.onclick);
}else{
item[0].onclick=eval(_424.onclick);
}
}
if(_424.disabled){
_425(_422,item[0],true);
}
if(item[0].submenu){
$("<div class=\"menu-rightarrow\"></div>").appendTo(item);
}
}
};
function _420(_426,menu){
var opts=$.data(_426,"menu").options;
var _427=menu.attr("style")||"";
var _428=menu.is(":visible");
menu.css({display:"block",left:-10000,height:"auto",overflow:"hidden"});
menu.find(".menu-item").each(function(){
$(this)._outerHeight(opts.itemHeight);
$(this).find(".menu-text").css({height:(opts.itemHeight-2)+"px",lineHeight:(opts.itemHeight-2)+"px"});
});
menu.removeClass("menu-noline").addClass(opts.noline?"menu-noline":"");
var _429=menu.data("menu").options;
var _42a=_429.width;
var _42b=_429.height;
if(isNaN(parseInt(_42a))){
_42a=0;
menu.find("div.menu-text").each(function(){
if(_42a<$(this).outerWidth()){
_42a=$(this).outerWidth();
}
});
_42a=_42a?_42a+40:"";
}
var _42c=menu.outerHeight();
if(isNaN(parseInt(_42b))){
_42b=_42c;
if(menu.hasClass("menu-top")&&opts.alignTo){
var at=$(opts.alignTo);
var h1=at.offset().top-$(document).scrollTop();
var h2=$(window)._outerHeight()+$(document).scrollTop()-at.offset().top-at._outerHeight();
_42b=Math.min(_42b,Math.max(h1,h2));
}else{
if(_42b>$(window)._outerHeight()){
_42b=$(window).height();
}
}
}
menu.attr("style",_427);
menu.show();
menu._size($.extend({},_429,{width:_42a,height:_42b,minWidth:_429.minWidth||opts.minWidth,maxWidth:_429.maxWidth||opts.maxWidth}));
menu.find(".easyui-fluid").triggerHandler("_resize",[true]);
menu.css("overflow",menu.outerHeight()<_42c?"auto":"hidden");
menu.children("div.menu-line")._outerHeight(_42c-2);
if(!_428){
menu.hide();
}
};
function _421(_42d,menu){
var _42e=$.data(_42d,"menu");
var opts=_42e.options;
menu.unbind(".menu");
for(var _42f in opts.events){
menu.bind(_42f+".menu",{target:_42d},opts.events[_42f]);
}
};
function _430(e){
var _431=e.data.target;
var _432=$.data(_431,"menu");
if(_432.timer){
clearTimeout(_432.timer);
_432.timer=null;
}
};
function _433(e){
var _434=e.data.target;
var _435=$.data(_434,"menu");
if(_435.options.hideOnUnhover){
_435.timer=setTimeout(function(){
_436(_434,$(_434).hasClass("menu-inline"));
},_435.options.duration);
}
};
function _437(e){
var _438=e.data.target;
var item=$(e.target).closest(".menu-item");
if(item.length){
item.siblings().each(function(){
if(this.submenu){
_416(this.submenu);
}
$(this).removeClass("menu-active");
});
item.addClass("menu-active");
if(item.hasClass("menu-item-disabled")){
item.addClass("menu-active-disabled");
return;
}
var _439=item[0].submenu;
if(_439){
$(_438).menu("show",{menu:_439,parent:item});
}
}
};
function _43a(e){
var item=$(e.target).closest(".menu-item");
if(item.length){
item.removeClass("menu-active menu-active-disabled");
var _43b=item[0].submenu;
if(_43b){
if(e.pageX>=parseInt(_43b.css("left"))){
item.addClass("menu-active");
}else{
_416(_43b);
}
}else{
item.removeClass("menu-active");
}
}
};
function _43c(e){
var _43d=e.data.target;
var item=$(e.target).closest(".menu-item");
if(item.length){
var opts=$(_43d).data("menu").options;
var _43e=item.data("menuitem").options;
if(_43e.disabled){
return;
}
if(!item[0].submenu){
_436(_43d,opts.inline);
if(_43e.href){
location.href=_43e.href;
}
}
item.trigger("mouseenter");
opts.onClick.call(_43d,$(_43d).menu("getItem",item[0]));
}
};
function _436(_43f,_440){
var _441=$.data(_43f,"menu");
if(_441){
if($(_43f).is(":visible")){
_416($(_43f));
if(_440){
$(_43f).show();
}else{
_441.options.onHide.call(_43f);
}
}
}
return false;
};
function _442(_443,_444){
_444=_444||{};
var left,top;
var opts=$.data(_443,"menu").options;
var menu=$(_444.menu||_443);
$(_443).menu("resize",menu[0]);
if(menu.hasClass("menu-top")){
$.extend(opts,_444);
left=opts.left;
top=opts.top;
if(opts.alignTo){
var at=$(opts.alignTo);
left=at.offset().left;
top=at.offset().top+at._outerHeight();
if(opts.align=="right"){
left+=at.outerWidth()-menu.outerWidth();
}
}
if(left+menu.outerWidth()>$(window)._outerWidth()+$(document)._scrollLeft()){
left=$(window)._outerWidth()+$(document).scrollLeft()-menu.outerWidth()-5;
}
if(left<0){
left=0;
}
top=_445(top,opts.alignTo);
}else{
var _446=_444.parent;
left=_446.offset().left+_446.outerWidth()-2;
if(left+menu.outerWidth()+5>$(window)._outerWidth()+$(document).scrollLeft()){
left=_446.offset().left-menu.outerWidth()+2;
}
top=_445(_446.offset().top-3);
}
function _445(top,_447){
if(top+menu.outerHeight()>$(window)._outerHeight()+$(document).scrollTop()){
if(_447){
top=$(_447).offset().top-menu._outerHeight();
}else{
top=$(window)._outerHeight()+$(document).scrollTop()-menu.outerHeight();
}
}
if(top<0){
top=0;
}
return top;
};
menu.css(opts.position.call(_443,menu[0],left,top));
menu.show(0,function(){
if(!menu[0].shadow){
menu[0].shadow=$("<div class=\"menu-shadow\"></div>").insertAfter(menu);
}
menu[0].shadow.css({display:(menu.hasClass("menu-inline")?"none":"block"),zIndex:$.fn.menu.defaults.zIndex++,left:menu.css("left"),top:menu.css("top"),width:menu.outerWidth(),height:menu.outerHeight()});
menu.css("z-index",$.fn.menu.defaults.zIndex++);
if(menu.hasClass("menu-top")){
opts.onShow.call(_443);
}
});
};
function _416(menu){
if(menu&&menu.length){
_448(menu);
menu.find("div.menu-item").each(function(){
if(this.submenu){
_416(this.submenu);
}
$(this).removeClass("menu-active");
});
}
function _448(m){
m.stop(true,true);
if(m[0].shadow){
m[0].shadow.hide();
}
m.hide();
};
};
function _449(_44a,text){
var _44b=null;
var tmp=$("<div></div>");
function find(menu){
menu.children("div.menu-item").each(function(){
var item=$(_44a).menu("getItem",this);
var s=tmp.empty().html(item.text).text();
if(text==$.trim(s)){
_44b=item;
}else{
if(this.submenu&&!_44b){
find(this.submenu);
}
}
});
};
find($(_44a));
tmp.remove();
return _44b;
};
function _425(_44c,_44d,_44e){
var t=$(_44d);
if(t.hasClass("menu-item")){
var opts=t.data("menuitem").options;
opts.disabled=_44e;
if(_44e){
t.addClass("menu-item-disabled");
t[0].onclick=null;
}else{
t.removeClass("menu-item-disabled");
t[0].onclick=opts.onclick;
}
}
};
function _44f(_450,_451){
var opts=$.data(_450,"menu").options;
var menu=$(_450);
if(_451.parent){
if(!_451.parent.submenu){
var _452=$("<div></div>").appendTo("body");
_451.parent.submenu=_452;
$("<div class=\"menu-rightarrow\"></div>").appendTo(_451.parent);
_41d(_450,_452);
}
menu=_451.parent.submenu;
}
var div=$("<div></div>").appendTo(menu);
_41f(_450,div,_451);
};
function _453(_454,_455){
function _456(el){
if(el.submenu){
el.submenu.children("div.menu-item").each(function(){
_456(this);
});
var _457=el.submenu[0].shadow;
if(_457){
_457.remove();
}
el.submenu.remove();
}
$(el).remove();
};
_456(_455);
};
function _458(_459,_45a,_45b){
var menu=$(_45a).parent();
if(_45b){
$(_45a).show();
}else{
$(_45a).hide();
}
_420(_459,menu);
};
function _45c(_45d){
$(_45d).children("div.menu-item").each(function(){
_453(_45d,this);
});
if(_45d.shadow){
_45d.shadow.remove();
}
$(_45d).remove();
};
$.fn.menu=function(_45e,_45f){
if(typeof _45e=="string"){
return $.fn.menu.methods[_45e](this,_45f);
}
_45e=_45e||{};
return this.each(function(){
var _460=$.data(this,"menu");
if(_460){
$.extend(_460.options,_45e);
}else{
_460=$.data(this,"menu",{options:$.extend({},$.fn.menu.defaults,$.fn.menu.parseOptions(this),_45e)});
init(this);
}
$(this).css({left:_460.options.left,top:_460.options.top});
});
};
$.fn.menu.methods={options:function(jq){
return $.data(jq[0],"menu").options;
},show:function(jq,pos){
return jq.each(function(){
_442(this,pos);
});
},hide:function(jq){
return jq.each(function(){
_436(this);
});
},destroy:function(jq){
return jq.each(function(){
_45c(this);
});
},setText:function(jq,_461){
return jq.each(function(){
var item=$(_461.target).data("menuitem").options;
item.text=_461.text;
$(_461.target).children("div.menu-text").html(_461.text);
});
},setIcon:function(jq,_462){
return jq.each(function(){
var item=$(_462.target).data("menuitem").options;
item.iconCls=_462.iconCls;
$(_462.target).children("div.menu-icon").remove();
if(_462.iconCls){
$("<div class=\"menu-icon\"></div>").addClass(_462.iconCls).appendTo(_462.target);
}
});
},getItem:function(jq,_463){
var item=$(_463).data("menuitem").options;
return $.extend({},item,{target:$(_463)[0]});
},findItem:function(jq,text){
return _449(jq[0],text);
},appendItem:function(jq,_464){
return jq.each(function(){
_44f(this,_464);
});
},removeItem:function(jq,_465){
return jq.each(function(){
_453(this,_465);
});
},enableItem:function(jq,_466){
return jq.each(function(){
_425(this,_466,false);
});
},disableItem:function(jq,_467){
return jq.each(function(){
_425(this,_467,true);
});
},showItem:function(jq,_468){
return jq.each(function(){
_458(this,_468,true);
});
},hideItem:function(jq,_469){
return jq.each(function(){
_458(this,_469,false);
});
},resize:function(jq,_46a){
return jq.each(function(){
_420(this,_46a?$(_46a):$(this));
});
}};
$.fn.menu.parseOptions=function(_46b){
return $.extend({},$.parser.parseOptions(_46b,[{minWidth:"number",itemHeight:"number",duration:"number",hideOnUnhover:"boolean"},{fit:"boolean",inline:"boolean",noline:"boolean"}]));
};
$.fn.menu.defaults={zIndex:110000,left:0,top:0,alignTo:null,align:"left",minWidth:120,itemHeight:22,duration:100,hideOnUnhover:true,inline:false,fit:false,noline:false,events:{mouseenter:_430,mouseleave:_433,mouseover:_437,mouseout:_43a,click:_43c},position:function(_46c,left,top){
return {left:left,top:top};
},onShow:function(){
},onHide:function(){
},onClick:function(item){
}};
})(jQuery);
(function($){
function init(_46d){
var opts=$.data(_46d,"menubutton").options;
var btn=$(_46d);
btn.linkbutton(opts);
if(opts.hasDownArrow){
btn.removeClass(opts.cls.btn1+" "+opts.cls.btn2).addClass("m-btn");
btn.removeClass("m-btn-small m-btn-medium m-btn-large").addClass("m-btn-"+opts.size);
var _46e=btn.find(".l-btn-left");
$("<span></span>").addClass(opts.cls.arrow).appendTo(_46e);
$("<span></span>").addClass("m-btn-line").appendTo(_46e);
}
$(_46d).menubutton("resize");
if(opts.menu){
$(opts.menu).menu({duration:opts.duration});
var _46f=$(opts.menu).menu("options");
var _470=_46f.onShow;
var _471=_46f.onHide;
$.extend(_46f,{onShow:function(){
var _472=$(this).menu("options");
var btn=$(_472.alignTo);
var opts=btn.menubutton("options");
btn.addClass((opts.plain==true)?opts.cls.btn2:opts.cls.btn1);
_470.call(this);
},onHide:function(){
var _473=$(this).menu("options");
var btn=$(_473.alignTo);
var opts=btn.menubutton("options");
btn.removeClass((opts.plain==true)?opts.cls.btn2:opts.cls.btn1);
_471.call(this);
}});
}
};
function _474(_475){
var opts=$.data(_475,"menubutton").options;
var btn=$(_475);
var t=btn.find("."+opts.cls.trigger);
if(!t.length){
t=btn;
}
t.unbind(".menubutton");
var _476=null;
t.bind("click.menubutton",function(){
if(!_477()){
_478(_475);
return false;
}
}).bind("mouseenter.menubutton",function(){
if(!_477()){
_476=setTimeout(function(){
_478(_475);
},opts.duration);
return false;
}
}).bind("mouseleave.menubutton",function(){
if(_476){
clearTimeout(_476);
}
$(opts.menu).triggerHandler("mouseleave");
});
function _477(){
return $(_475).linkbutton("options").disabled;
};
};
function _478(_479){
var opts=$(_479).menubutton("options");
if(opts.disabled||!opts.menu){
return;
}
$("body>div.menu-top").menu("hide");
var btn=$(_479);
var mm=$(opts.menu);
if(mm.length){
mm.menu("options").alignTo=btn;
mm.menu("show",{alignTo:btn,align:opts.menuAlign});
}
btn.blur();
};
$.fn.menubutton=function(_47a,_47b){
if(typeof _47a=="string"){
var _47c=$.fn.menubutton.methods[_47a];
if(_47c){
return _47c(this,_47b);
}else{
return this.linkbutton(_47a,_47b);
}
}
_47a=_47a||{};
return this.each(function(){
var _47d=$.data(this,"menubutton");
if(_47d){
$.extend(_47d.options,_47a);
}else{
$.data(this,"menubutton",{options:$.extend({},$.fn.menubutton.defaults,$.fn.menubutton.parseOptions(this),_47a)});
$(this).removeAttr("disabled");
}
init(this);
_474(this);
});
};
$.fn.menubutton.methods={options:function(jq){
var _47e=jq.linkbutton("options");
return $.extend($.data(jq[0],"menubutton").options,{toggle:_47e.toggle,selected:_47e.selected,disabled:_47e.disabled});
},destroy:function(jq){
return jq.each(function(){
var opts=$(this).menubutton("options");
if(opts.menu){
$(opts.menu).menu("destroy");
}
$(this).remove();
});
}};
$.fn.menubutton.parseOptions=function(_47f){
var t=$(_47f);
return $.extend({},$.fn.linkbutton.parseOptions(_47f),$.parser.parseOptions(_47f,["menu",{plain:"boolean",hasDownArrow:"boolean",duration:"number"}]));
};
$.fn.menubutton.defaults=$.extend({},$.fn.linkbutton.defaults,{plain:true,hasDownArrow:true,menu:null,menuAlign:"left",duration:100,cls:{btn1:"m-btn-active",btn2:"m-btn-plain-active",arrow:"m-btn-downarrow",trigger:"m-btn"}});
})(jQuery);
(function($){
function init(_480){
var opts=$.data(_480,"splitbutton").options;
$(_480).menubutton(opts);
$(_480).addClass("s-btn");
};
$.fn.splitbutton=function(_481,_482){
if(typeof _481=="string"){
var _483=$.fn.splitbutton.methods[_481];
if(_483){
return _483(this,_482);
}else{
return this.menubutton(_481,_482);
}
}
_481=_481||{};
return this.each(function(){
var _484=$.data(this,"splitbutton");
if(_484){
$.extend(_484.options,_481);
}else{
$.data(this,"splitbutton",{options:$.extend({},$.fn.splitbutton.defaults,$.fn.splitbutton.parseOptions(this),_481)});
$(this).removeAttr("disabled");
}
init(this);
});
};
$.fn.splitbutton.methods={options:function(jq){
var _485=jq.menubutton("options");
var _486=$.data(jq[0],"splitbutton").options;
$.extend(_486,{disabled:_485.disabled,toggle:_485.toggle,selected:_485.selected});
return _486;
}};
$.fn.splitbutton.parseOptions=function(_487){
var t=$(_487);
return $.extend({},$.fn.linkbutton.parseOptions(_487),$.parser.parseOptions(_487,["menu",{plain:"boolean",duration:"number"}]));
};
$.fn.splitbutton.defaults=$.extend({},$.fn.linkbutton.defaults,{plain:true,menu:null,duration:100,cls:{btn1:"m-btn-active s-btn-active",btn2:"m-btn-plain-active s-btn-plain-active",arrow:"m-btn-downarrow",trigger:"m-btn-line"}});
})(jQuery);
(function($){
function init(_488){
var _489=$("<span class=\"switchbutton\">"+"<span class=\"switchbutton-inner\">"+"<span class=\"switchbutton-on\"></span>"+"<span class=\"switchbutton-handle\"></span>"+"<span class=\"switchbutton-off\"></span>"+"<input class=\"switchbutton-value\" type=\"checkbox\">"+"</span>"+"</span>").insertAfter(_488);
var t=$(_488);
t.addClass("switchbutton-f").hide();
var name=t.attr("name");
if(name){
t.removeAttr("name").attr("switchbuttonName",name);
_489.find(".switchbutton-value").attr("name",name);
}
_489.bind("_resize",function(e,_48a){
if($(this).hasClass("easyui-fluid")||_48a){
_48b(_488);
}
return false;
});
return _489;
};
function _48b(_48c,_48d){
var _48e=$.data(_48c,"switchbutton");
var opts=_48e.options;
var _48f=_48e.switchbutton;
if(_48d){
$.extend(opts,_48d);
}
var _490=_48f.is(":visible");
if(!_490){
_48f.appendTo("body");
}
_48f._size(opts);
var w=_48f.width();
var h=_48f.height();
var w=_48f.outerWidth();
var h=_48f.outerHeight();
var _491=parseInt(opts.handleWidth)||_48f.height();
var _492=w*2-_491;
_48f.find(".switchbutton-inner").css({width:_492+"px",height:h+"px",lineHeight:h+"px"});
_48f.find(".switchbutton-handle")._outerWidth(_491)._outerHeight(h).css({marginLeft:-_491/2+"px"});
_48f.find(".switchbutton-on").css({width:(w-_491/2)+"px",textIndent:(opts.reversed?"":"-")+_491/2+"px"});
_48f.find(".switchbutton-off").css({width:(w-_491/2)+"px",textIndent:(opts.reversed?"-":"")+_491/2+"px"});
opts.marginWidth=w-_491;
_493(_48c,opts.checked,false);
if(!_490){
_48f.insertAfter(_48c);
}
};
function _494(_495){
var _496=$.data(_495,"switchbutton");
var opts=_496.options;
var _497=_496.switchbutton;
var _498=_497.find(".switchbutton-inner");
var on=_498.find(".switchbutton-on").html(opts.onText);
var off=_498.find(".switchbutton-off").html(opts.offText);
var _499=_498.find(".switchbutton-handle").html(opts.handleText);
if(opts.reversed){
off.prependTo(_498);
on.insertAfter(_499);
}else{
on.prependTo(_498);
off.insertAfter(_499);
}
_497.find(".switchbutton-value")._propAttr("checked",opts.checked);
_497.removeClass("switchbutton-disabled").addClass(opts.disabled?"switchbutton-disabled":"");
_497.removeClass("switchbutton-reversed").addClass(opts.reversed?"switchbutton-reversed":"");
_493(_495,opts.checked);
_49a(_495,opts.readonly);
$(_495).switchbutton("setValue",opts.value);
};
function _493(_49b,_49c,_49d){
var _49e=$.data(_49b,"switchbutton");
var opts=_49e.options;
opts.checked=_49c;
var _49f=_49e.switchbutton.find(".switchbutton-inner");
var _4a0=_49f.find(".switchbutton-on");
var _4a1=opts.reversed?(opts.checked?opts.marginWidth:0):(opts.checked?0:opts.marginWidth);
var dir=_4a0.css("float").toLowerCase();
var css={};
css["margin-"+dir]=-_4a1+"px";
_49d?_49f.animate(css,200):_49f.css(css);
var _4a2=_49f.find(".switchbutton-value");
var ck=_4a2.is(":checked");
$(_49b).add(_4a2)._propAttr("checked",opts.checked);
if(ck!=opts.checked){
opts.onChange.call(_49b,opts.checked);
}
};
function _4a3(_4a4,_4a5){
var _4a6=$.data(_4a4,"switchbutton");
var opts=_4a6.options;
var _4a7=_4a6.switchbutton;
var _4a8=_4a7.find(".switchbutton-value");
if(_4a5){
opts.disabled=true;
$(_4a4).add(_4a8).attr("disabled","disabled");
_4a7.addClass("switchbutton-disabled");
}else{
opts.disabled=false;
$(_4a4).add(_4a8).removeAttr("disabled");
_4a7.removeClass("switchbutton-disabled");
}
};
function _49a(_4a9,mode){
var _4aa=$.data(_4a9,"switchbutton");
var opts=_4aa.options;
opts.readonly=mode==undefined?true:mode;
_4aa.switchbutton.removeClass("switchbutton-readonly").addClass(opts.readonly?"switchbutton-readonly":"");
};
function _4ab(_4ac){
var _4ad=$.data(_4ac,"switchbutton");
var opts=_4ad.options;
_4ad.switchbutton.unbind(".switchbutton").bind("click.switchbutton",function(){
if(!opts.disabled&&!opts.readonly){
_493(_4ac,opts.checked?false:true,true);
}
});
};
$.fn.switchbutton=function(_4ae,_4af){
if(typeof _4ae=="string"){
return $.fn.switchbutton.methods[_4ae](this,_4af);
}
_4ae=_4ae||{};
return this.each(function(){
var _4b0=$.data(this,"switchbutton");
if(_4b0){
$.extend(_4b0.options,_4ae);
}else{
_4b0=$.data(this,"switchbutton",{options:$.extend({},$.fn.switchbutton.defaults,$.fn.switchbutton.parseOptions(this),_4ae),switchbutton:init(this)});
}
_4b0.options.originalChecked=_4b0.options.checked;
_494(this);
_48b(this);
_4ab(this);
});
};
$.fn.switchbutton.methods={options:function(jq){
var _4b1=jq.data("switchbutton");
return $.extend(_4b1.options,{value:_4b1.switchbutton.find(".switchbutton-value").val()});
},resize:function(jq,_4b2){
return jq.each(function(){
_48b(this,_4b2);
});
},enable:function(jq){
return jq.each(function(){
_4a3(this,false);
});
},disable:function(jq){
return jq.each(function(){
_4a3(this,true);
});
},readonly:function(jq,mode){
return jq.each(function(){
_49a(this,mode);
});
},check:function(jq){
return jq.each(function(){
_493(this,true);
});
},uncheck:function(jq){
return jq.each(function(){
_493(this,false);
});
},clear:function(jq){
return jq.each(function(){
_493(this,false);
});
},reset:function(jq){
return jq.each(function(){
var opts=$(this).switchbutton("options");
_493(this,opts.originalChecked);
});
},setValue:function(jq,_4b3){
return jq.each(function(){
$(this).val(_4b3);
$.data(this,"switchbutton").switchbutton.find(".switchbutton-value").val(_4b3);
});
}};
$.fn.switchbutton.parseOptions=function(_4b4){
var t=$(_4b4);
return $.extend({},$.parser.parseOptions(_4b4,["onText","offText","handleText",{handleWidth:"number",reversed:"boolean"}]),{value:(t.val()||undefined),checked:(t.attr("checked")?true:undefined),disabled:(t.attr("disabled")?true:undefined),readonly:(t.attr("readonly")?true:undefined)});
};
$.fn.switchbutton.defaults={handleWidth:"auto",width:60,height:26,checked:false,disabled:false,readonly:false,reversed:false,onText:"ON",offText:"OFF",handleText:"",value:"on",onChange:function(_4b5){
}};
})(jQuery);
(function($){
function init(_4b6){
$(_4b6).addClass("validatebox-text");
};
function _4b7(_4b8){
var _4b9=$.data(_4b8,"validatebox");
_4b9.validating=false;
if(_4b9.vtimer){
clearTimeout(_4b9.vtimer);
}
if(_4b9.ftimer){
clearTimeout(_4b9.ftimer);
}
$(_4b8).tooltip("destroy");
$(_4b8).unbind();
$(_4b8).remove();
};
function _4ba(_4bb){
var opts=$.data(_4bb,"validatebox").options;
$(_4bb).unbind(".validatebox");
if(opts.novalidate||opts.disabled){
return;
}
for(var _4bc in opts.events){
$(_4bb).bind(_4bc+".validatebox",{target:_4bb},opts.events[_4bc]);
}
};
function _4bd(e){
var _4be=e.data.target;
var _4bf=$.data(_4be,"validatebox");
var opts=_4bf.options;
if($(_4be).attr("readonly")){
return;
}
_4bf.validating=true;
_4bf.value=opts.val(_4be);
(function(){
if(!$(_4be).is(":visible")){
_4bf.validating=false;
}
if(_4bf.validating){
var _4c0=opts.val(_4be);
if(_4bf.value!=_4c0){
_4bf.value=_4c0;
if(_4bf.vtimer){
clearTimeout(_4bf.vtimer);
}
_4bf.vtimer=setTimeout(function(){
$(_4be).validatebox("validate");
},opts.delay);
}else{
if(_4bf.message){
opts.err(_4be,_4bf.message);
}
}
_4bf.ftimer=setTimeout(arguments.callee,opts.interval);
}
})();
};
function _4c1(e){
var _4c2=e.data.target;
var _4c3=$.data(_4c2,"validatebox");
var opts=_4c3.options;
_4c3.validating=false;
if(_4c3.vtimer){
clearTimeout(_4c3.vtimer);
_4c3.vtimer=undefined;
}
if(_4c3.ftimer){
clearTimeout(_4c3.ftimer);
_4c3.ftimer=undefined;
}
if(opts.validateOnBlur){
setTimeout(function(){
$(_4c2).validatebox("validate");
},0);
}
opts.err(_4c2,_4c3.message,"hide");
};
function _4c4(e){
var _4c5=e.data.target;
var _4c6=$.data(_4c5,"validatebox");
_4c6.options.err(_4c5,_4c6.message,"show");
};
function _4c7(e){
var _4c8=e.data.target;
var _4c9=$.data(_4c8,"validatebox");
if(!_4c9.validating){
_4c9.options.err(_4c8,_4c9.message,"hide");
}
};
function _4ca(_4cb,_4cc,_4cd){
var _4ce=$.data(_4cb,"validatebox");
var opts=_4ce.options;
var t=$(_4cb);
if(_4cd=="hide"||!_4cc){
t.tooltip("hide");
}else{
if((t.is(":focus")&&_4ce.validating)||_4cd=="show"){
t.tooltip($.extend({},opts.tipOptions,{content:_4cc,position:opts.tipPosition,deltaX:opts.deltaX,deltaY:opts.deltaY})).tooltip("show");
}
}
};
function _4cf(_4d0){
var _4d1=$.data(_4d0,"validatebox");
var opts=_4d1.options;
var box=$(_4d0);
opts.onBeforeValidate.call(_4d0);
var _4d2=_4d3();
_4d2?box.removeClass("validatebox-invalid"):box.addClass("validatebox-invalid");
opts.err(_4d0,_4d1.message);
opts.onValidate.call(_4d0,_4d2);
return _4d2;
function _4d4(msg){
_4d1.message=msg;
};
function _4d5(_4d6,_4d7){
var _4d8=opts.val(_4d0);
var _4d9=/([a-zA-Z_]+)(.*)/.exec(_4d6);
var rule=opts.rules[_4d9[1]];
if(rule&&_4d8){
var _4da=_4d7||opts.validParams||eval(_4d9[2]);
if(!rule["validator"].call(_4d0,_4d8,_4da)){
var _4db=rule["message"];
if(_4da){
for(var i=0;i<_4da.length;i++){
_4db=_4db.replace(new RegExp("\\{"+i+"\\}","g"),_4da[i]);
}
}
_4d4(opts.invalidMessage||_4db);
return false;
}
}
return true;
};
function _4d3(){
_4d4("");
if(!opts._validateOnCreate){
setTimeout(function(){
opts._validateOnCreate=true;
},0);
return true;
}
if(opts.novalidate||opts.disabled){
return true;
}
if(opts.required){
if(opts.val(_4d0)==""){
_4d4(opts.missingMessage);
return false;
}
}
if(opts.validType){
if($.isArray(opts.validType)){
for(var i=0;i<opts.validType.length;i++){
if(!_4d5(opts.validType[i])){
return false;
}
}
}else{
if(typeof opts.validType=="string"){
if(!_4d5(opts.validType)){
return false;
}
}else{
for(var _4dc in opts.validType){
var _4dd=opts.validType[_4dc];
if(!_4d5(_4dc,_4dd)){
return false;
}
}
}
}
}
return true;
};
};
function _4de(_4df,_4e0){
var opts=$.data(_4df,"validatebox").options;
if(_4e0!=undefined){
opts.disabled=_4e0;
}
if(opts.disabled){
$(_4df).addClass("validatebox-disabled").attr("disabled","disabled");
}else{
$(_4df).removeClass("validatebox-disabled").removeAttr("disabled");
}
};
function _4e1(_4e2,mode){
var opts=$.data(_4e2,"validatebox").options;
opts.readonly=mode==undefined?true:mode;
if(opts.readonly||!opts.editable){
$(_4e2).triggerHandler("blur.validatebox");
$(_4e2).addClass("validatebox-readonly").attr("readonly","readonly");
}else{
$(_4e2).removeClass("validatebox-readonly").removeAttr("readonly");
}
};
$.fn.validatebox=function(_4e3,_4e4){
if(typeof _4e3=="string"){
return $.fn.validatebox.methods[_4e3](this,_4e4);
}
_4e3=_4e3||{};
return this.each(function(){
var _4e5=$.data(this,"validatebox");
if(_4e5){
$.extend(_4e5.options,_4e3);
}else{
init(this);
_4e5=$.data(this,"validatebox",{options:$.extend({},$.fn.validatebox.defaults,$.fn.validatebox.parseOptions(this),_4e3)});
}
_4e5.options._validateOnCreate=_4e5.options.validateOnCreate;
_4de(this,_4e5.options.disabled);
_4e1(this,_4e5.options.readonly);
_4ba(this);
_4cf(this);
});
};
$.fn.validatebox.methods={options:function(jq){
return $.data(jq[0],"validatebox").options;
},destroy:function(jq){
return jq.each(function(){
_4b7(this);
});
},validate:function(jq){
return jq.each(function(){
_4cf(this);
});
},isValid:function(jq){
return _4cf(jq[0]);
},enableValidation:function(jq){
return jq.each(function(){
$(this).validatebox("options").novalidate=false;
_4ba(this);
_4cf(this);
});
},disableValidation:function(jq){
return jq.each(function(){
$(this).validatebox("options").novalidate=true;
_4ba(this);
_4cf(this);
});
},resetValidation:function(jq){
return jq.each(function(){
var opts=$(this).validatebox("options");
opts._validateOnCreate=opts.validateOnCreate;
_4cf(this);
});
},enable:function(jq){
return jq.each(function(){
_4de(this,false);
_4ba(this);
_4cf(this);
});
},disable:function(jq){
return jq.each(function(){
_4de(this,true);
_4ba(this);
_4cf(this);
});
},readonly:function(jq,mode){
return jq.each(function(){
_4e1(this,mode);
_4ba(this);
_4cf(this);
});
}};
$.fn.validatebox.parseOptions=function(_4e6){
var t=$(_4e6);
return $.extend({},$.parser.parseOptions(_4e6,["validType","missingMessage","invalidMessage","tipPosition",{delay:"number",interval:"number",deltaX:"number"},{editable:"boolean",validateOnCreate:"boolean",validateOnBlur:"boolean"}]),{required:(t.attr("required")?true:undefined),disabled:(t.attr("disabled")?true:undefined),readonly:(t.attr("readonly")?true:undefined),novalidate:(t.attr("novalidate")!=undefined?true:undefined)});
};
$.fn.validatebox.defaults={required:false,validType:null,validParams:null,delay:200,interval:200,missingMessage:"This field is required.",invalidMessage:null,tipPosition:"right",deltaX:0,deltaY:0,novalidate:false,editable:true,disabled:false,readonly:false,validateOnCreate:true,validateOnBlur:false,events:{focus:_4bd,blur:_4c1,mouseenter:_4c4,mouseleave:_4c7,click:function(e){
var t=$(e.data.target);
if(t.attr("type")=="checkbox"||t.attr("type")=="radio"){
t.focus().validatebox("validate");
}
}},val:function(_4e7){
return $(_4e7).val();
},err:function(_4e8,_4e9,_4ea){
_4ca(_4e8,_4e9,_4ea);
},tipOptions:{showEvent:"none",hideEvent:"none",showDelay:0,hideDelay:0,zIndex:"",onShow:function(){
$(this).tooltip("tip").css({color:"#000",borderColor:"#CC9933",backgroundColor:"#FFFFCC"});
},onHide:function(){
$(this).tooltip("destroy");
}},rules:{email:{validator:function(_4eb){
return /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(_4eb);
},message:"Please enter a valid email address."},url:{validator:function(_4ec){
return /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(_4ec);
},message:"Please enter a valid URL."},length:{validator:function(_4ed,_4ee){
var len=$.trim(_4ed).length;
return len>=_4ee[0]&&len<=_4ee[1];
},message:"Please enter a value between {0} and {1}."},remote:{validator:function(_4ef,_4f0){
var data={};
data[_4f0[1]]=_4ef;
var _4f1=$.ajax({url:_4f0[0],dataType:"json",data:data,async:false,cache:false,type:"post"}).responseText;
return _4f1=="true";
},message:"Please fix this field."}},onBeforeValidate:function(){
},onValidate:function(_4f2){
}};
})(jQuery);
(function($){
var _4f3=0;
function init(_4f4){
$(_4f4).addClass("textbox-f").hide();
var span=$("<span class=\"textbox\">"+"<input class=\"textbox-text\" autocomplete=\"off\">"+"<input type=\"hidden\" class=\"textbox-value\">"+"</span>").insertAfter(_4f4);
var name=$(_4f4).attr("name");
if(name){
span.find("input.textbox-value").attr("name",name);
$(_4f4).removeAttr("name").attr("textboxName",name);
}
return span;
};
function _4f5(_4f6){
var _4f7=$.data(_4f6,"textbox");
var opts=_4f7.options;
var tb=_4f7.textbox;
var _4f8="_easyui_textbox_input"+(++_4f3);
tb.addClass(opts.cls);
tb.find(".textbox-text").remove();
if(opts.multiline){
$("<textarea id=\""+_4f8+"\" class=\"textbox-text\" autocomplete=\"off\"></textarea>").prependTo(tb);
}else{
$("<input id=\""+_4f8+"\" type=\""+opts.type+"\" class=\"textbox-text\" autocomplete=\"off\">").prependTo(tb);
}
$("#"+_4f8).attr("tabindex",$(_4f6).attr("tabindex")||"").css("text-align",_4f6.style.textAlign||"");
tb.find(".textbox-addon").remove();
var bb=opts.icons?$.extend(true,[],opts.icons):[];
if(opts.iconCls){
bb.push({iconCls:opts.iconCls,disabled:true});
}
if(bb.length){
var bc=$("<span class=\"textbox-addon\"></span>").prependTo(tb);
bc.addClass("textbox-addon-"+opts.iconAlign);
for(var i=0;i<bb.length;i++){
bc.append("<a href=\"javascript:;\" class=\"textbox-icon "+bb[i].iconCls+"\" icon-index=\""+i+"\" tabindex=\"-1\"></a>");
}
}
tb.find(".textbox-button").remove();
if(opts.buttonText||opts.buttonIcon){
var btn=$("<a href=\"javascript:;\" class=\"textbox-button\"></a>").prependTo(tb);
btn.addClass("textbox-button-"+opts.buttonAlign).linkbutton({text:opts.buttonText,iconCls:opts.buttonIcon,onClick:function(){
var t=$(this).parent().prev();
t.textbox("options").onClickButton.call(t[0]);
}});
}
if(opts.label){
if(typeof opts.label=="object"){
_4f7.label=$(opts.label);
_4f7.label.attr("for",_4f8);
}else{
$(_4f7.label).remove();
_4f7.label=$("<label class=\"textbox-label\"></label>").html(opts.label);
_4f7.label.css("textAlign",opts.labelAlign).attr("for",_4f8);
if(opts.labelPosition=="after"){
_4f7.label.insertAfter(tb);
}else{
_4f7.label.insertBefore(_4f6);
}
_4f7.label.removeClass("textbox-label-left textbox-label-right textbox-label-top");
_4f7.label.addClass("textbox-label-"+opts.labelPosition);
}
}else{
$(_4f7.label).remove();
}
_4f9(_4f6);
_4fa(_4f6,opts.disabled);
_4fb(_4f6,opts.readonly);
};
function _4fc(_4fd){
var _4fe=$.data(_4fd,"textbox");
var tb=_4fe.textbox;
tb.find(".textbox-text").validatebox("destroy");
tb.remove();
$(_4fe.label).remove();
$(_4fd).remove();
};
function _4ff(_500,_501){
var _502=$.data(_500,"textbox");
var opts=_502.options;
var tb=_502.textbox;
var _503=tb.parent();
if(_501){
if(typeof _501=="object"){
$.extend(opts,_501);
}else{
opts.width=_501;
}
}
if(isNaN(parseInt(opts.width))){
var c=$(_500).clone();
c.css("visibility","hidden");
c.insertAfter(_500);
opts.width=c.outerWidth();
c.remove();
}
var _504=tb.is(":visible");
if(!_504){
tb.appendTo("body");
}
var _505=tb.find(".textbox-text");
var btn=tb.find(".textbox-button");
var _506=tb.find(".textbox-addon");
var _507=_506.find(".textbox-icon");
if(opts.height=="auto"){
_505.css({margin:"",paddingTop:"",paddingBottom:"",height:"",lineHeight:""});
}
tb._size(opts,_503);
if(opts.label&&opts.labelPosition){
if(opts.labelPosition=="top"){
_502.label._size({width:opts.labelWidth=="auto"?tb.outerWidth():opts.labelWidth},tb);
if(opts.height!="auto"){
tb._size("height",tb.outerHeight()-_502.label.outerHeight());
}
}else{
_502.label._size({width:opts.labelWidth,height:tb.outerHeight()},tb);
if(!opts.multiline){
_502.label.css("lineHeight",_502.label.height()+"px");
}
tb._size("width",tb.outerWidth()-_502.label.outerWidth());
}
}
if(opts.buttonAlign=="left"||opts.buttonAlign=="right"){
btn.linkbutton("resize",{height:tb.height()});
}else{
btn.linkbutton("resize",{width:"100%"});
}
var _508=tb.width()-_507.length*opts.iconWidth-_509("left")-_509("right");
var _50a=opts.height=="auto"?_505.outerHeight():(tb.height()-_509("top")-_509("bottom"));
_506.css(opts.iconAlign,_509(opts.iconAlign)+"px");
_506.css("top",_509("top")+"px");
_507.css({width:opts.iconWidth+"px",height:_50a+"px"});
_505.css({paddingLeft:(_500.style.paddingLeft||""),paddingRight:(_500.style.paddingRight||""),marginLeft:_50b("left"),marginRight:_50b("right"),marginTop:_509("top"),marginBottom:_509("bottom")});
if(opts.multiline){
_505.css({paddingTop:(_500.style.paddingTop||""),paddingBottom:(_500.style.paddingBottom||"")});
_505._outerHeight(_50a);
}else{
_505.css({paddingTop:0,paddingBottom:0,height:_50a+"px",lineHeight:_50a+"px"});
}
_505._outerWidth(_508);
opts.onResizing.call(_500,opts.width,opts.height);
if(!_504){
tb.insertAfter(_500);
}
opts.onResize.call(_500,opts.width,opts.height);
function _50b(_50c){
return (opts.iconAlign==_50c?_506._outerWidth():0)+_509(_50c);
};
function _509(_50d){
var w=0;
btn.filter(".textbox-button-"+_50d).each(function(){
if(_50d=="left"||_50d=="right"){
w+=$(this).outerWidth();
}else{
w+=$(this).outerHeight();
}
});
return w;
};
};
function _4f9(_50e){
var opts=$(_50e).textbox("options");
var _50f=$(_50e).textbox("textbox");
_50f.validatebox($.extend({},opts,{deltaX:function(_510){
return $(_50e).textbox("getTipX",_510);
},deltaY:function(_511){
return $(_50e).textbox("getTipY",_511);
},onBeforeValidate:function(){
opts.onBeforeValidate.call(_50e);
var box=$(this);
if(!box.is(":focus")){
if(box.val()!==opts.value){
opts.oldInputValue=box.val();
box.val(opts.value);
}
}
},onValidate:function(_512){
var box=$(this);
if(opts.oldInputValue!=undefined){
box.val(opts.oldInputValue);
opts.oldInputValue=undefined;
}
var tb=box.parent();
if(_512){
tb.removeClass("textbox-invalid");
}else{
tb.addClass("textbox-invalid");
}
opts.onValidate.call(_50e,_512);
}}));
};
function _513(_514){
var _515=$.data(_514,"textbox");
var opts=_515.options;
var tb=_515.textbox;
var _516=tb.find(".textbox-text");
_516.attr("placeholder",opts.prompt);
_516.unbind(".textbox");
$(_515.label).unbind(".textbox");
if(!opts.disabled&&!opts.readonly){
if(_515.label){
$(_515.label).bind("click.textbox",function(e){
if(!opts.hasFocusMe){
_516.focus();
$(_514).textbox("setSelectionRange",{start:0,end:_516.val().length});
}
});
}
_516.bind("blur.textbox",function(e){
if(!tb.hasClass("textbox-focused")){
return;
}
opts.value=$(this).val();
if(opts.value==""){
$(this).val(opts.prompt).addClass("textbox-prompt");
}else{
$(this).removeClass("textbox-prompt");
}
tb.removeClass("textbox-focused");
}).bind("focus.textbox",function(e){
opts.hasFocusMe=true;
if(tb.hasClass("textbox-focused")){
return;
}
if($(this).val()!=opts.value){
$(this).val(opts.value);
}
$(this).removeClass("textbox-prompt");
tb.addClass("textbox-focused");
});
for(var _517 in opts.inputEvents){
_516.bind(_517+".textbox",{target:_514},opts.inputEvents[_517]);
}
}
var _518=tb.find(".textbox-addon");
_518.unbind().bind("click",{target:_514},function(e){
var icon=$(e.target).closest("a.textbox-icon:not(.textbox-icon-disabled)");
if(icon.length){
var _519=parseInt(icon.attr("icon-index"));
var conf=opts.icons[_519];
if(conf&&conf.handler){
conf.handler.call(icon[0],e);
}
opts.onClickIcon.call(_514,_519);
}
});
_518.find(".textbox-icon").each(function(_51a){
var conf=opts.icons[_51a];
var icon=$(this);
if(!conf||conf.disabled||opts.disabled||opts.readonly){
icon.addClass("textbox-icon-disabled");
}else{
icon.removeClass("textbox-icon-disabled");
}
});
var btn=tb.find(".textbox-button");
btn.linkbutton((opts.disabled||opts.readonly)?"disable":"enable");
tb.unbind(".textbox").bind("_resize.textbox",function(e,_51b){
if($(this).hasClass("easyui-fluid")||_51b){
_4ff(_514);
}
return false;
});
};
function _4fa(_51c,_51d){
var _51e=$.data(_51c,"textbox");
var opts=_51e.options;
var tb=_51e.textbox;
var _51f=tb.find(".textbox-text");
var ss=$(_51c).add(tb.find(".textbox-value"));
opts.disabled=_51d;
if(opts.disabled){
_51f.blur();
_51f.validatebox("disable");
tb.addClass("textbox-disabled");
ss.attr("disabled","disabled");
$(_51e.label).addClass("textbox-label-disabled");
}else{
_51f.validatebox("enable");
tb.removeClass("textbox-disabled");
ss.removeAttr("disabled");
$(_51e.label).removeClass("textbox-label-disabled");
}
};
function _4fb(_520,mode){
var _521=$.data(_520,"textbox");
var opts=_521.options;
var tb=_521.textbox;
var _522=tb.find(".textbox-text");
opts.readonly=mode==undefined?true:mode;
if(opts.readonly){
_522.triggerHandler("blur.textbox");
}
_522.validatebox("readonly",opts.readonly);
tb.removeClass("textbox-readonly").addClass(opts.readonly?"textbox-readonly":"");
};
$.fn.textbox=function(_523,_524){
if(typeof _523=="string"){
var _525=$.fn.textbox.methods[_523];
if(_525){
return _525(this,_524);
}else{
return this.each(function(){
var _526=$(this).textbox("textbox");
_526.validatebox(_523,_524);
});
}
}
_523=_523||{};
return this.each(function(){
var _527=$.data(this,"textbox");
if(_527){
$.extend(_527.options,_523);
if(_523.value!=undefined){
_527.options.originalValue=_523.value;
}
}else{
_527=$.data(this,"textbox",{options:$.extend({},$.fn.textbox.defaults,$.fn.textbox.parseOptions(this),_523),textbox:init(this)});
_527.options.originalValue=_527.options.value;
}
_4f5(this);
_513(this);
if(_527.options.doSize){
_4ff(this);
}
var _528=_527.options.value;
_527.options.value="";
$(this).textbox("initValue",_528);
});
};
$.fn.textbox.methods={options:function(jq){
return $.data(jq[0],"textbox").options;
},cloneFrom:function(jq,from){
return jq.each(function(){
var t=$(this);
if(t.data("textbox")){
return;
}
if(!$(from).data("textbox")){
$(from).textbox();
}
var opts=$.extend(true,{},$(from).textbox("options"));
var name=t.attr("name")||"";
t.addClass("textbox-f").hide();
t.removeAttr("name").attr("textboxName",name);
var span=$(from).next().clone().insertAfter(t);
var _529="_easyui_textbox_input"+(++_4f3);
span.find(".textbox-value").attr("name",name);
span.find(".textbox-text").attr("id",_529);
var _52a=$($(from).textbox("label")).clone();
if(_52a.length){
_52a.attr("for",_529);
if(opts.labelPosition=="after"){
_52a.insertAfter(t.next());
}else{
_52a.insertBefore(t);
}
}
$.data(this,"textbox",{options:opts,textbox:span,label:(_52a.length?_52a:undefined)});
var _52b=$(from).textbox("button");
if(_52b.length){
t.textbox("button").linkbutton($.extend(true,{},_52b.linkbutton("options")));
}
_513(this);
_4f9(this);
});
},textbox:function(jq){
return $.data(jq[0],"textbox").textbox.find(".textbox-text");
},button:function(jq){
return $.data(jq[0],"textbox").textbox.find(".textbox-button");
},label:function(jq){
return $.data(jq[0],"textbox").label;
},destroy:function(jq){
return jq.each(function(){
_4fc(this);
});
},resize:function(jq,_52c){
return jq.each(function(){
_4ff(this,_52c);
});
},disable:function(jq){
return jq.each(function(){
_4fa(this,true);
_513(this);
});
},enable:function(jq){
return jq.each(function(){
_4fa(this,false);
_513(this);
});
},readonly:function(jq,mode){
return jq.each(function(){
_4fb(this,mode);
_513(this);
});
},isValid:function(jq){
return jq.textbox("textbox").validatebox("isValid");
},clear:function(jq){
return jq.each(function(){
$(this).textbox("setValue","");
});
},setText:function(jq,_52d){
return jq.each(function(){
var opts=$(this).textbox("options");
var _52e=$(this).textbox("textbox");
_52d=_52d==undefined?"":String(_52d);
if($(this).textbox("getText")!=_52d){
_52e.val(_52d);
}
opts.value=_52d;
if(!_52e.is(":focus")){
if(_52d){
_52e.removeClass("textbox-prompt");
}else{
_52e.val(opts.prompt).addClass("textbox-prompt");
}
}
$(this).textbox("validate");
});
},initValue:function(jq,_52f){
return jq.each(function(){
var _530=$.data(this,"textbox");
$(this).textbox("setText",_52f);
_530.textbox.find(".textbox-value").val(_52f);
$(this).val(_52f);
});
},setValue:function(jq,_531){
return jq.each(function(){
var opts=$.data(this,"textbox").options;
var _532=$(this).textbox("getValue");
$(this).textbox("initValue",_531);
if(_532!=_531){
opts.onChange.call(this,_531,_532);
$(this).closest("form").trigger("_change",[this]);
}
});
},getText:function(jq){
var _533=jq.textbox("textbox");
if(_533.is(":focus")){
return _533.val();
}else{
return jq.textbox("options").value;
}
},getValue:function(jq){
return jq.data("textbox").textbox.find(".textbox-value").val();
},reset:function(jq){
return jq.each(function(){
var opts=$(this).textbox("options");
$(this).textbox("textbox").val(opts.originalValue);
$(this).textbox("setValue",opts.originalValue);
});
},getIcon:function(jq,_534){
return jq.data("textbox").textbox.find(".textbox-icon:eq("+_534+")");
},getTipX:function(jq,_535){
var _536=jq.data("textbox");
var opts=_536.options;
var tb=_536.textbox;
var _537=tb.find(".textbox-text");
var _535=_535||opts.tipPosition;
var p1=tb.offset();
var p2=_537.offset();
var w1=tb.outerWidth();
var w2=_537.outerWidth();
if(_535=="right"){
return w1-w2-p2.left+p1.left;
}else{
if(_535=="left"){
return p1.left-p2.left;
}else{
return (w1-w2-p2.left+p1.left)/2-(p2.left-p1.left)/2;
}
}
},getTipY:function(jq,_538){
var _539=jq.data("textbox");
var opts=_539.options;
var tb=_539.textbox;
var _53a=tb.find(".textbox-text");
var _538=_538||opts.tipPosition;
var p1=tb.offset();
var p2=_53a.offset();
var h1=tb.outerHeight();
var h2=_53a.outerHeight();
if(_538=="left"||_538=="right"){
return (h1-h2-p2.top+p1.top)/2-(p2.top-p1.top)/2;
}else{
if(_538=="bottom"){
return (h1-h2-p2.top+p1.top);
}else{
return (p1.top-p2.top);
}
}
},getSelectionStart:function(jq){
return jq.textbox("getSelectionRange").start;
},getSelectionRange:function(jq){
var _53b=jq.textbox("textbox")[0];
var _53c=0;
var end=0;
if(typeof _53b.selectionStart=="number"){
_53c=_53b.selectionStart;
end=_53b.selectionEnd;
}else{
if(_53b.createTextRange){
var s=document.selection.createRange();
var _53d=_53b.createTextRange();
_53d.setEndPoint("EndToStart",s);
_53c=_53d.text.length;
end=_53c+s.text.length;
}
}
return {start:_53c,end:end};
},setSelectionRange:function(jq,_53e){
return jq.each(function(){
var _53f=$(this).textbox("textbox")[0];
var _540=_53e.start;
var end=_53e.end;
if(_53f.setSelectionRange){
_53f.setSelectionRange(_540,end);
}else{
if(_53f.createTextRange){
var _541=_53f.createTextRange();
_541.collapse();
_541.moveEnd("character",end);
_541.moveStart("character",_540);
_541.select();
}
}
});
}};
$.fn.textbox.parseOptions=function(_542){
var t=$(_542);
return $.extend({},$.fn.validatebox.parseOptions(_542),$.parser.parseOptions(_542,["prompt","iconCls","iconAlign","buttonText","buttonIcon","buttonAlign","label","labelPosition","labelAlign",{multiline:"boolean",iconWidth:"number",labelWidth:"number"}]),{value:(t.val()||undefined),type:(t.attr("type")?t.attr("type"):undefined)});
};
$.fn.textbox.defaults=$.extend({},$.fn.validatebox.defaults,{doSize:true,width:"auto",height:"auto",cls:null,prompt:"",value:"",type:"text",multiline:false,icons:[],iconCls:null,iconAlign:"right",iconWidth:18,buttonText:"",buttonIcon:null,buttonAlign:"right",label:null,labelWidth:"auto",labelPosition:"before",labelAlign:"left",inputEvents:{blur:function(e){
var t=$(e.data.target);
var opts=t.textbox("options");
if(t.textbox("getValue")!=opts.value){
t.textbox("setValue",opts.value);
}
},keydown:function(e){
if(e.keyCode==13){
var t=$(e.data.target);
t.textbox("setValue",t.textbox("getText"));
}
}},onChange:function(_543,_544){
},onResizing:function(_545,_546){
},onResize:function(_547,_548){
},onClickButton:function(){
},onClickIcon:function(_549){
}});
})(jQuery);
(function($){
function _54a(_54b){
var _54c=$.data(_54b,"passwordbox");
var opts=_54c.options;
var _54d=$.extend(true,[],opts.icons);
if(opts.showEye){
_54d.push({iconCls:"passwordbox-open",handler:function(e){
opts.revealed=!opts.revealed;
_54e(_54b);
}});
}
$(_54b).addClass("passwordbox-f").textbox($.extend({},opts,{icons:_54d}));
_54e(_54b);
};
function _54f(_550,_551,all){
var t=$(_550);
var opts=t.passwordbox("options");
if(opts.revealed){
t.textbox("setValue",_551);
return;
}
var _552=unescape(opts.passwordChar);
var cc=_551.split("");
var vv=t.passwordbox("getValue").split("");
for(var i=0;i<cc.length;i++){
var c=cc[i];
if(c!=vv[i]){
if(c!=_552){
vv.splice(i,0,c);
}
}
}
var pos=t.passwordbox("getSelectionStart");
if(cc.length<vv.length){
vv.splice(pos,vv.length-cc.length,"");
}
for(var i=0;i<cc.length;i++){
if(all||i!=pos-1){
cc[i]=_552;
}
}
t.textbox("setValue",vv.join(""));
t.textbox("setText",cc.join(""));
t.textbox("setSelectionRange",{start:pos,end:pos});
};
function _54e(_553,_554){
var t=$(_553);
var opts=t.passwordbox("options");
var icon=t.next().find(".passwordbox-open");
var _555=unescape(opts.passwordChar);
_554=_554==undefined?t.textbox("getValue"):_554;
t.textbox("setValue",_554);
t.textbox("setText",opts.revealed?_554:_554.replace(/./ig,_555));
opts.revealed?icon.addClass("passwordbox-close"):icon.removeClass("passwordbox-close");
};
function _556(e){
var _557=e.data.target;
var t=$(e.data.target);
var _558=t.data("passwordbox");
var opts=t.data("passwordbox").options;
_558.checking=true;
_558.value=t.passwordbox("getText");
(function(){
if(_558.checking){
var _559=t.passwordbox("getText");
if(_558.value!=_559){
_558.value=_559;
if(_558.lastTimer){
clearTimeout(_558.lastTimer);
_558.lastTimer=undefined;
}
_54f(_557,_559);
_558.lastTimer=setTimeout(function(){
_54f(_557,t.passwordbox("getText"),true);
_558.lastTimer=undefined;
},opts.lastDelay);
}
setTimeout(arguments.callee,opts.checkInterval);
}
})();
};
function _55a(e){
var _55b=e.data.target;
var _55c=$(_55b).data("passwordbox");
_55c.checking=false;
if(_55c.lastTimer){
clearTimeout(_55c.lastTimer);
_55c.lastTimer=undefined;
}
_54e(_55b);
};
$.fn.passwordbox=function(_55d,_55e){
if(typeof _55d=="string"){
var _55f=$.fn.passwordbox.methods[_55d];
if(_55f){
return _55f(this,_55e);
}else{
return this.textbox(_55d,_55e);
}
}
_55d=_55d||{};
return this.each(function(){
var _560=$.data(this,"passwordbox");
if(_560){
$.extend(_560.options,_55d);
}else{
_560=$.data(this,"passwordbox",{options:$.extend({},$.fn.passwordbox.defaults,$.fn.passwordbox.parseOptions(this),_55d)});
}
_54a(this);
});
};
$.fn.passwordbox.methods={options:function(jq){
return $.data(jq[0],"passwordbox").options;
},setValue:function(jq,_561){
return jq.each(function(){
_54e(this,_561);
});
},clear:function(jq){
return jq.each(function(){
_54e(this,"");
});
},reset:function(jq){
return jq.each(function(){
$(this).textbox("reset");
_54e(this);
});
},showPassword:function(jq){
return jq.each(function(){
var opts=$(this).passwordbox("options");
opts.revealed=true;
_54e(this);
});
},hidePassword:function(jq){
return jq.each(function(){
var opts=$(this).passwordbox("options");
opts.revealed=false;
_54e(this);
});
}};
$.fn.passwordbox.parseOptions=function(_562){
return $.extend({},$.fn.textbox.parseOptions(_562),$.parser.parseOptions(_562,["passwordChar",{checkInterval:"number",lastDelay:"number",revealed:"boolean",showEye:"boolean"}]));
};
$.fn.passwordbox.defaults=$.extend({},$.fn.textbox.defaults,{passwordChar:"%u25CF",checkInterval:200,lastDelay:500,revealed:false,showEye:true,inputEvents:{focus:_556,blur:_55a},val:function(_563){
return $(_563).parent().prev().passwordbox("getValue");
}});
})(jQuery);
(function($){
var _564=0;
function _565(_566){
var _567=$.data(_566,"filebox");
var opts=_567.options;
opts.fileboxId="filebox_file_id_"+(++_564);
$(_566).addClass("filebox-f").textbox(opts);
$(_566).textbox("textbox").attr("readonly","readonly");
_567.filebox=$(_566).next().addClass("filebox");
var file=_568(_566);
var btn=$(_566).filebox("button");
if(btn.length){
$("<label class=\"filebox-label\" for=\""+opts.fileboxId+"\"></label>").appendTo(btn);
if(btn.linkbutton("options").disabled){
file.attr("disabled","disabled");
}else{
file.removeAttr("disabled");
}
}
};
function _568(_569){
var _56a=$.data(_569,"filebox");
var opts=_56a.options;
_56a.filebox.find(".textbox-value").remove();
opts.oldValue="";
var file=$("<input type=\"file\" class=\"textbox-value\">").appendTo(_56a.filebox);
file.attr("id",opts.fileboxId).attr("name",$(_569).attr("textboxName")||"");
file.attr("accept",opts.accept);
file.attr("capture",opts.capture);
if(opts.multiple){
file.attr("multiple","multiple");
}
file.change(function(){
var _56b=this.value;
if(this.files){
_56b=$.map(this.files,function(file){
return file.name;
}).join(opts.separator);
}
$(_569).filebox("setText",_56b);
opts.onChange.call(_569,_56b,opts.oldValue);
opts.oldValue=_56b;
});
return file;
};
$.fn.filebox=function(_56c,_56d){
if(typeof _56c=="string"){
var _56e=$.fn.filebox.methods[_56c];
if(_56e){
return _56e(this,_56d);
}else{
return this.textbox(_56c,_56d);
}
}
_56c=_56c||{};
return this.each(function(){
var _56f=$.data(this,"filebox");
if(_56f){
$.extend(_56f.options,_56c);
}else{
$.data(this,"filebox",{options:$.extend({},$.fn.filebox.defaults,$.fn.filebox.parseOptions(this),_56c)});
}
_565(this);
});
};
$.fn.filebox.methods={options:function(jq){
var opts=jq.textbox("options");
return $.extend($.data(jq[0],"filebox").options,{width:opts.width,value:opts.value,originalValue:opts.originalValue,disabled:opts.disabled,readonly:opts.readonly});
},clear:function(jq){
return jq.each(function(){
$(this).textbox("clear");
_568(this);
});
},reset:function(jq){
return jq.each(function(){
$(this).filebox("clear");
});
},setValue:function(jq){
return jq;
},setValues:function(jq){
return jq;
}};
$.fn.filebox.parseOptions=function(_570){
var t=$(_570);
return $.extend({},$.fn.textbox.parseOptions(_570),$.parser.parseOptions(_570,["accept","capture","separator"]),{multiple:(t.attr("multiple")?true:undefined)});
};
$.fn.filebox.defaults=$.extend({},$.fn.textbox.defaults,{buttonIcon:null,buttonText:"Choose File",buttonAlign:"right",inputEvents:{},accept:"",capture:"",separator:",",multiple:false});
})(jQuery);
(function($){
function _571(_572){
var _573=$.data(_572,"searchbox");
var opts=_573.options;
var _574=$.extend(true,[],opts.icons);
_574.push({iconCls:"searchbox-button",handler:function(e){
var t=$(e.data.target);
var opts=t.searchbox("options");
opts.searcher.call(e.data.target,t.searchbox("getValue"),t.searchbox("getName"));
}});
_575();
var _576=_577();
$(_572).addClass("searchbox-f").textbox($.extend({},opts,{icons:_574,buttonText:(_576?_576.text:"")}));
$(_572).attr("searchboxName",$(_572).attr("textboxName"));
_573.searchbox=$(_572).next();
_573.searchbox.addClass("searchbox");
_578(_576);
function _575(){
if(opts.menu){
_573.menu=$(opts.menu).menu();
var _579=_573.menu.menu("options");
var _57a=_579.onClick;
_579.onClick=function(item){
_578(item);
_57a.call(this,item);
};
}else{
if(_573.menu){
_573.menu.menu("destroy");
}
_573.menu=null;
}
};
function _577(){
if(_573.menu){
var item=_573.menu.children("div.menu-item:first");
_573.menu.children("div.menu-item").each(function(){
var _57b=$.extend({},$.parser.parseOptions(this),{selected:($(this).attr("selected")?true:undefined)});
if(_57b.selected){
item=$(this);
return false;
}
});
return _573.menu.menu("getItem",item[0]);
}else{
return null;
}
};
function _578(item){
if(!item){
return;
}
$(_572).textbox("button").menubutton({text:item.text,iconCls:(item.iconCls||null),menu:_573.menu,menuAlign:opts.buttonAlign,plain:false});
_573.searchbox.find("input.textbox-value").attr("name",item.name||item.text);
$(_572).searchbox("resize");
};
};
$.fn.searchbox=function(_57c,_57d){
if(typeof _57c=="string"){
var _57e=$.fn.searchbox.methods[_57c];
if(_57e){
return _57e(this,_57d);
}else{
return this.textbox(_57c,_57d);
}
}
_57c=_57c||{};
return this.each(function(){
var _57f=$.data(this,"searchbox");
if(_57f){
$.extend(_57f.options,_57c);
}else{
$.data(this,"searchbox",{options:$.extend({},$.fn.searchbox.defaults,$.fn.searchbox.parseOptions(this),_57c)});
}
_571(this);
});
};
$.fn.searchbox.methods={options:function(jq){
var opts=jq.textbox("options");
return $.extend($.data(jq[0],"searchbox").options,{width:opts.width,value:opts.value,originalValue:opts.originalValue,disabled:opts.disabled,readonly:opts.readonly});
},menu:function(jq){
return $.data(jq[0],"searchbox").menu;
},getName:function(jq){
return $.data(jq[0],"searchbox").searchbox.find("input.textbox-value").attr("name");
},selectName:function(jq,name){
return jq.each(function(){
var menu=$.data(this,"searchbox").menu;
if(menu){
menu.children("div.menu-item").each(function(){
var item=menu.menu("getItem",this);
if(item.name==name){
$(this).triggerHandler("click");
return false;
}
});
}
});
},destroy:function(jq){
return jq.each(function(){
var menu=$(this).searchbox("menu");
if(menu){
menu.menu("destroy");
}
$(this).textbox("destroy");
});
}};
$.fn.searchbox.parseOptions=function(_580){
var t=$(_580);
return $.extend({},$.fn.textbox.parseOptions(_580),$.parser.parseOptions(_580,["menu"]),{searcher:(t.attr("searcher")?eval(t.attr("searcher")):undefined)});
};
$.fn.searchbox.defaults=$.extend({},$.fn.textbox.defaults,{inputEvents:$.extend({},$.fn.textbox.defaults.inputEvents,{keydown:function(e){
if(e.keyCode==13){
e.preventDefault();
var t=$(e.data.target);
var opts=t.searchbox("options");
t.searchbox("setValue",$(this).val());
opts.searcher.call(e.data.target,t.searchbox("getValue"),t.searchbox("getName"));
return false;
}
}}),buttonAlign:"left",menu:null,searcher:function(_581,name){
}});
})(jQuery);
(function($){
function _582(_583,_584){
var opts=$.data(_583,"form").options;
$.extend(opts,_584||{});
var _585=$.extend({},opts.queryParams);
if(opts.onSubmit.call(_583,_585)==false){
return;
}
var _586=$(_583).find(".textbox-text:focus");
_586.triggerHandler("blur");
_586.focus();
var _587=null;
if(opts.dirty){
var ff=[];
$.map(opts.dirtyFields,function(f){
if($(f).hasClass("textbox-f")){
$(f).next().find(".textbox-value").each(function(){
ff.push(this);
});
}else{
ff.push(f);
}
});
_587=$(_583).find("input[name]:enabled,textarea[name]:enabled,select[name]:enabled").filter(function(){
return $.inArray(this,ff)==-1;
});
_587.attr("disabled","disabled");
}
if(opts.ajax){
if(opts.iframe){
_588(_583,_585);
}else{
if(window.FormData!==undefined){
_589(_583,_585);
}else{
_588(_583,_585);
}
}
}else{
$(_583).submit();
}
if(opts.dirty){
_587.removeAttr("disabled");
}
};
function _588(_58a,_58b){
var opts=$.data(_58a,"form").options;
var _58c="easyui_frame_"+(new Date().getTime());
var _58d=$("<iframe id="+_58c+" name="+_58c+"></iframe>").appendTo("body");
_58d.attr("src",window.ActiveXObject?"javascript:false":"about:blank");
_58d.css({position:"absolute",top:-1000,left:-1000});
_58d.bind("load",cb);
_58e(_58b);
function _58e(_58f){
var form=$(_58a);
if(opts.url){
form.attr("action",opts.url);
}
var t=form.attr("target"),a=form.attr("action");
form.attr("target",_58c);
var _590=$();
try{
for(var n in _58f){
var _591=$("<input type=\"hidden\" name=\""+n+"\">").val(_58f[n]).appendTo(form);
_590=_590.add(_591);
}
_592();
form[0].submit();
}
finally{
form.attr("action",a);
t?form.attr("target",t):form.removeAttr("target");
_590.remove();
}
};
function _592(){
var f=$("#"+_58c);
if(!f.length){
return;
}
try{
var s=f.contents()[0].readyState;
if(s&&s.toLowerCase()=="uninitialized"){
setTimeout(_592,100);
}
}
catch(e){
cb();
}
};
var _593=10;
function cb(){
var f=$("#"+_58c);
if(!f.length){
return;
}
f.unbind();
var data="";
try{
var body=f.contents().find("body");
data=body.html();
if(data==""){
if(--_593){
setTimeout(cb,100);
return;
}
}
var ta=body.find(">textarea");
if(ta.length){
data=ta.val();
}else{
var pre=body.find(">pre");
if(pre.length){
data=pre.html();
}
}
}
catch(e){
}
opts.success.call(_58a,data);
setTimeout(function(){
f.unbind();
f.remove();
},100);
};
};
function _589(_594,_595){
var opts=$.data(_594,"form").options;
var _596=new FormData($(_594)[0]);
for(var name in _595){
_596.append(name,_595[name]);
}
$.ajax({url:opts.url,type:"post",xhr:function(){
var xhr=$.ajaxSettings.xhr();
if(xhr.upload){
xhr.upload.addEventListener("progress",function(e){
if(e.lengthComputable){
var _597=e.total;
var _598=e.loaded||e.position;
var _599=Math.ceil(_598*100/_597);
opts.onProgress.call(_594,_599);
}
},false);
}
return xhr;
},data:_596,dataType:"html",cache:false,contentType:false,processData:false,complete:function(res){
opts.success.call(_594,res.responseText);
}});
};
function load(_59a,data){
var opts=$.data(_59a,"form").options;
if(typeof data=="string"){
var _59b={};
if(opts.onBeforeLoad.call(_59a,_59b)==false){
return;
}
$.ajax({url:data,data:_59b,dataType:"json",success:function(data){
_59c(data);
},error:function(){
opts.onLoadError.apply(_59a,arguments);
}});
}else{
_59c(data);
}
function _59c(data){
var form=$(_59a);
for(var name in data){
var val=data[name];
if(!_59d(name,val)){
if(!_59e(name,val)){
form.find("input[name=\""+name+"\"]").val(val);
form.find("textarea[name=\""+name+"\"]").val(val);
form.find("select[name=\""+name+"\"]").val(val);
}
}
}
opts.onLoadSuccess.call(_59a,data);
form.form("validate");
};
function _59d(name,val){
var cc=$(_59a).find("[switchbuttonName=\""+name+"\"]");
if(cc.length){
cc.switchbutton("uncheck");
cc.each(function(){
if(_59f($(this).switchbutton("options").value,val)){
$(this).switchbutton("check");
}
});
return true;
}
cc=$(_59a).find("input[name=\""+name+"\"][type=radio], input[name=\""+name+"\"][type=checkbox]");
if(cc.length){
cc._propAttr("checked",false);
cc.each(function(){
if(_59f($(this).val(),val)){
$(this)._propAttr("checked",true);
}
});
return true;
}
return false;
};
function _59f(v,val){
if(v==String(val)||$.inArray(v,$.isArray(val)?val:[val])>=0){
return true;
}else{
return false;
}
};
function _59e(name,val){
var _5a0=$(_59a).find("[textboxName=\""+name+"\"],[sliderName=\""+name+"\"]");
if(_5a0.length){
for(var i=0;i<opts.fieldTypes.length;i++){
var type=opts.fieldTypes[i];
var _5a1=_5a0.data(type);
if(_5a1){
if(_5a1.options.multiple||_5a1.options.range){
_5a0[type]("setValues",val);
}else{
_5a0[type]("setValue",val);
}
return true;
}
}
}
return false;
};
};
function _5a2(_5a3){
$("input,select,textarea",_5a3).each(function(){
if($(this).hasClass("textbox-value")){
return;
}
var t=this.type,tag=this.tagName.toLowerCase();
if(t=="text"||t=="hidden"||t=="password"||tag=="textarea"){
this.value="";
}else{
if(t=="file"){
var file=$(this);
if(!file.hasClass("textbox-value")){
var _5a4=file.clone().val("");
_5a4.insertAfter(file);
if(file.data("validatebox")){
file.validatebox("destroy");
_5a4.validatebox();
}else{
file.remove();
}
}
}else{
if(t=="checkbox"||t=="radio"){
this.checked=false;
}else{
if(tag=="select"){
this.selectedIndex=-1;
}
}
}
}
});
var tmp=$();
var form=$(_5a3);
var opts=$.data(_5a3,"form").options;
for(var i=0;i<opts.fieldTypes.length;i++){
var type=opts.fieldTypes[i];
var _5a5=form.find("."+type+"-f").not(tmp);
if(_5a5.length&&_5a5[type]){
_5a5[type]("clear");
tmp=tmp.add(_5a5);
}
}
form.form("validate");
};
function _5a6(_5a7){
_5a7.reset();
var form=$(_5a7);
var opts=$.data(_5a7,"form").options;
for(var i=opts.fieldTypes.length-1;i>=0;i--){
var type=opts.fieldTypes[i];
var _5a8=form.find("."+type+"-f");
if(_5a8.length&&_5a8[type]){
_5a8[type]("reset");
}
}
form.form("validate");
};
function _5a9(_5aa){
var _5ab=$.data(_5aa,"form").options;
$(_5aa).unbind(".form");
if(_5ab.ajax){
$(_5aa).bind("submit.form",function(){
setTimeout(function(){
_582(_5aa,_5ab);
},0);
return false;
});
}
$(_5aa).bind("_change.form",function(e,t){
if($.inArray(t,_5ab.dirtyFields)==-1){
_5ab.dirtyFields.push(t);
}
_5ab.onChange.call(this,t);
}).bind("change.form",function(e){
var t=e.target;
if(!$(t).hasClass("textbox-text")){
if($.inArray(t,_5ab.dirtyFields)==-1){
_5ab.dirtyFields.push(t);
}
_5ab.onChange.call(this,t);
}
});
_5ac(_5aa,_5ab.novalidate);
};
function _5ad(_5ae,_5af){
_5af=_5af||{};
var _5b0=$.data(_5ae,"form");
if(_5b0){
$.extend(_5b0.options,_5af);
}else{
$.data(_5ae,"form",{options:$.extend({},$.fn.form.defaults,$.fn.form.parseOptions(_5ae),_5af)});
}
};
function _5b1(_5b2){
if($.fn.validatebox){
var t=$(_5b2);
t.find(".validatebox-text:not(:disabled)").validatebox("validate");
var _5b3=t.find(".validatebox-invalid");
_5b3.filter(":not(:disabled):first").focus();
return _5b3.length==0;
}
return true;
};
function _5ac(_5b4,_5b5){
var opts=$.data(_5b4,"form").options;
opts.novalidate=_5b5;
$(_5b4).find(".validatebox-text:not(:disabled)").validatebox(_5b5?"disableValidation":"enableValidation");
};
$.fn.form=function(_5b6,_5b7){
if(typeof _5b6=="string"){
this.each(function(){
_5ad(this);
});
return $.fn.form.methods[_5b6](this,_5b7);
}
return this.each(function(){
_5ad(this,_5b6);
_5a9(this);
});
};
$.fn.form.methods={options:function(jq){
return $.data(jq[0],"form").options;
},submit:function(jq,_5b8){
return jq.each(function(){
_582(this,_5b8);
});
},load:function(jq,data){
return jq.each(function(){
load(this,data);
});
},clear:function(jq){
return jq.each(function(){
_5a2(this);
});
},reset:function(jq){
return jq.each(function(){
_5a6(this);
});
},validate:function(jq){
return _5b1(jq[0]);
},disableValidation:function(jq){
return jq.each(function(){
_5ac(this,true);
});
},enableValidation:function(jq){
return jq.each(function(){
_5ac(this,false);
});
},resetValidation:function(jq){
return jq.each(function(){
$(this).find(".validatebox-text:not(:disabled)").validatebox("resetValidation");
});
},resetDirty:function(jq){
return jq.each(function(){
$(this).form("options").dirtyFields=[];
});
}};
$.fn.form.parseOptions=function(_5b9){
var t=$(_5b9);
return $.extend({},$.parser.parseOptions(_5b9,[{ajax:"boolean",dirty:"boolean"}]),{url:(t.attr("action")?t.attr("action"):undefined)});
};
$.fn.form.defaults={fieldTypes:["combobox","combotree","combogrid","combotreegrid","datetimebox","datebox","combo","datetimespinner","timespinner","numberspinner","spinner","slider","searchbox","numberbox","passwordbox","filebox","textbox","switchbutton"],novalidate:false,ajax:true,iframe:true,dirty:false,dirtyFields:[],url:null,queryParams:{},onSubmit:function(_5ba){
return $(this).form("validate");
},onProgress:function(_5bb){
},success:function(data){
},onBeforeLoad:function(_5bc){
},onLoadSuccess:function(data){
},onLoadError:function(){
},onChange:function(_5bd){
}};
})(jQuery);
(function($){
function _5be(_5bf){
var _5c0=$.data(_5bf,"numberbox");
var opts=_5c0.options;
$(_5bf).addClass("numberbox-f").textbox(opts);
$(_5bf).textbox("textbox").css({imeMode:"disabled"});
$(_5bf).attr("numberboxName",$(_5bf).attr("textboxName"));
_5c0.numberbox=$(_5bf).next();
_5c0.numberbox.addClass("numberbox");
var _5c1=opts.parser.call(_5bf,opts.value);
var _5c2=opts.formatter.call(_5bf,_5c1);
$(_5bf).numberbox("initValue",_5c1).numberbox("setText",_5c2);
};
function _5c3(_5c4,_5c5){
var _5c6=$.data(_5c4,"numberbox");
var opts=_5c6.options;
opts.value=parseFloat(_5c5);
var _5c5=opts.parser.call(_5c4,_5c5);
var text=opts.formatter.call(_5c4,_5c5);
opts.value=_5c5;
$(_5c4).textbox("setText",text).textbox("setValue",_5c5);
text=opts.formatter.call(_5c4,$(_5c4).textbox("getValue"));
$(_5c4).textbox("setText",text);
};
$.fn.numberbox=function(_5c7,_5c8){
if(typeof _5c7=="string"){
var _5c9=$.fn.numberbox.methods[_5c7];
if(_5c9){
return _5c9(this,_5c8);
}else{
return this.textbox(_5c7,_5c8);
}
}
_5c7=_5c7||{};
return this.each(function(){
var _5ca=$.data(this,"numberbox");
if(_5ca){
$.extend(_5ca.options,_5c7);
}else{
_5ca=$.data(this,"numberbox",{options:$.extend({},$.fn.numberbox.defaults,$.fn.numberbox.parseOptions(this),_5c7)});
}
_5be(this);
});
};
$.fn.numberbox.methods={options:function(jq){
var opts=jq.data("textbox")?jq.textbox("options"):{};
return $.extend($.data(jq[0],"numberbox").options,{width:opts.width,originalValue:opts.originalValue,disabled:opts.disabled,readonly:opts.readonly});
},fix:function(jq){
return jq.each(function(){
var opts=$(this).numberbox("options");
opts.value=null;
var _5cb=opts.parser.call(this,$(this).numberbox("getText"));
$(this).numberbox("setValue",_5cb);
});
},setValue:function(jq,_5cc){
return jq.each(function(){
_5c3(this,_5cc);
});
},clear:function(jq){
return jq.each(function(){
$(this).textbox("clear");
$(this).numberbox("options").value="";
});
},reset:function(jq){
return jq.each(function(){
$(this).textbox("reset");
$(this).numberbox("setValue",$(this).numberbox("getValue"));
});
}};
$.fn.numberbox.parseOptions=function(_5cd){
var t=$(_5cd);
return $.extend({},$.fn.textbox.parseOptions(_5cd),$.parser.parseOptions(_5cd,["decimalSeparator","groupSeparator","suffix",{min:"number",max:"number",precision:"number"}]),{prefix:(t.attr("prefix")?t.attr("prefix"):undefined)});
};
$.fn.numberbox.defaults=$.extend({},$.fn.textbox.defaults,{inputEvents:{keypress:function(e){
var _5ce=e.data.target;
var opts=$(_5ce).numberbox("options");
return opts.filter.call(_5ce,e);
},blur:function(e){
$(e.data.target).numberbox("fix");
},keydown:function(e){
if(e.keyCode==13){
$(e.data.target).numberbox("fix");
}
}},min:null,max:null,precision:0,decimalSeparator:".",groupSeparator:"",prefix:"",suffix:"",filter:function(e){
var opts=$(this).numberbox("options");
var s=$(this).numberbox("getText");
if(e.metaKey||e.ctrlKey){
return true;
}
if($.inArray(String(e.which),["46","8","13","0"])>=0){
return true;
}
var tmp=$("<span></span>");
tmp.html(String.fromCharCode(e.which));
var c=tmp.text();
tmp.remove();
if(!c){
return true;
}
if(c=="-"||c==opts.decimalSeparator){
return (s.indexOf(c)==-1)?true:false;
}else{
if(c==opts.groupSeparator){
return true;
}else{
if("0123456789".indexOf(c)>=0){
return true;
}else{
return false;
}
}
}
},formatter:function(_5cf){
if(!_5cf){
return _5cf;
}
_5cf=_5cf+"";
var opts=$(this).numberbox("options");
var s1=_5cf,s2="";
var dpos=_5cf.indexOf(".");
if(dpos>=0){
s1=_5cf.substring(0,dpos);
s2=_5cf.substring(dpos+1,_5cf.length);
}
if(opts.groupSeparator){
var p=/(\d+)(\d{3})/;
while(p.test(s1)){
s1=s1.replace(p,"$1"+opts.groupSeparator+"$2");
}
}
if(s2){
return opts.prefix+s1+opts.decimalSeparator+s2+opts.suffix;
}else{
return opts.prefix+s1+opts.suffix;
}
},parser:function(s){
s=s+"";
var opts=$(this).numberbox("options");
if(opts.prefix){
s=$.trim(s.replace(new RegExp("\\"+$.trim(opts.prefix),"g"),""));
}
if(opts.suffix){
s=$.trim(s.replace(new RegExp("\\"+$.trim(opts.suffix),"g"),""));
}
if(parseFloat(s)!=opts.value){
if(opts.groupSeparator){
s=$.trim(s.replace(new RegExp("\\"+opts.groupSeparator,"g"),""));
}
if(opts.decimalSeparator){
s=$.trim(s.replace(new RegExp("\\"+opts.decimalSeparator,"g"),"."));
}
s=s.replace(/\s/g,"");
}
var val=parseFloat(s).toFixed(opts.precision);
if(isNaN(val)){
val="";
}else{
if(typeof (opts.min)=="number"&&val<opts.min){
val=opts.min.toFixed(opts.precision);
}else{
if(typeof (opts.max)=="number"&&val>opts.max){
val=opts.max.toFixed(opts.precision);
}
}
}
return val;
}});
})(jQuery);
(function($){
function _5d0(_5d1,_5d2){
var opts=$.data(_5d1,"calendar").options;
var t=$(_5d1);
if(_5d2){
$.extend(opts,{width:_5d2.width,height:_5d2.height});
}
t._size(opts,t.parent());
t.find(".calendar-body")._outerHeight(t.height()-t.find(".calendar-header")._outerHeight());
if(t.find(".calendar-menu").is(":visible")){
_5d3(_5d1);
}
};
function init(_5d4){
$(_5d4).addClass("calendar").html("<div class=\"calendar-header\">"+"<div class=\"calendar-nav calendar-prevmonth\"></div>"+"<div class=\"calendar-nav calendar-nextmonth\"></div>"+"<div class=\"calendar-nav calendar-prevyear\"></div>"+"<div class=\"calendar-nav calendar-nextyear\"></div>"+"<div class=\"calendar-title\">"+"<span class=\"calendar-text\"></span>"+"</div>"+"</div>"+"<div class=\"calendar-body\">"+"<div class=\"calendar-menu\">"+"<div class=\"calendar-menu-year-inner\">"+"<span class=\"calendar-nav calendar-menu-prev\"></span>"+"<span><input class=\"calendar-menu-year\" type=\"text\"></input></span>"+"<span class=\"calendar-nav calendar-menu-next\"></span>"+"</div>"+"<div class=\"calendar-menu-month-inner\">"+"</div>"+"</div>"+"</div>");
$(_5d4).bind("_resize",function(e,_5d5){
if($(this).hasClass("easyui-fluid")||_5d5){
_5d0(_5d4);
}
return false;
});
};
function _5d6(_5d7){
var opts=$.data(_5d7,"calendar").options;
var menu=$(_5d7).find(".calendar-menu");
menu.find(".calendar-menu-year").unbind(".calendar").bind("keypress.calendar",function(e){
if(e.keyCode==13){
_5d8(true);
}
});
$(_5d7).unbind(".calendar").bind("mouseover.calendar",function(e){
var t=_5d9(e.target);
if(t.hasClass("calendar-nav")||t.hasClass("calendar-text")||(t.hasClass("calendar-day")&&!t.hasClass("calendar-disabled"))){
t.addClass("calendar-nav-hover");
}
}).bind("mouseout.calendar",function(e){
var t=_5d9(e.target);
if(t.hasClass("calendar-nav")||t.hasClass("calendar-text")||(t.hasClass("calendar-day")&&!t.hasClass("calendar-disabled"))){
t.removeClass("calendar-nav-hover");
}
}).bind("click.calendar",function(e){
var t=_5d9(e.target);
if(t.hasClass("calendar-menu-next")||t.hasClass("calendar-nextyear")){
_5da(1);
}else{
if(t.hasClass("calendar-menu-prev")||t.hasClass("calendar-prevyear")){
_5da(-1);
}else{
if(t.hasClass("calendar-menu-month")){
menu.find(".calendar-selected").removeClass("calendar-selected");
t.addClass("calendar-selected");
_5d8(true);
}else{
if(t.hasClass("calendar-prevmonth")){
_5db(-1);
}else{
if(t.hasClass("calendar-nextmonth")){
_5db(1);
}else{
if(t.hasClass("calendar-text")){
if(menu.is(":visible")){
menu.hide();
}else{
_5d3(_5d7);
}
}else{
if(t.hasClass("calendar-day")){
if(t.hasClass("calendar-disabled")){
return;
}
var _5dc=opts.current;
t.closest("div.calendar-body").find(".calendar-selected").removeClass("calendar-selected");
t.addClass("calendar-selected");
var _5dd=t.attr("abbr").split(",");
var y=parseInt(_5dd[0]);
var m=parseInt(_5dd[1]);
var d=parseInt(_5dd[2]);
opts.current=new Date(y,m-1,d);
opts.onSelect.call(_5d7,opts.current);
if(!_5dc||_5dc.getTime()!=opts.current.getTime()){
opts.onChange.call(_5d7,opts.current,_5dc);
}
if(opts.year!=y||opts.month!=m){
opts.year=y;
opts.month=m;
show(_5d7);
}
}
}
}
}
}
}
}
});
function _5d9(t){
var day=$(t).closest(".calendar-day");
if(day.length){
return day;
}else{
return $(t);
}
};
function _5d8(_5de){
var menu=$(_5d7).find(".calendar-menu");
var year=menu.find(".calendar-menu-year").val();
var _5df=menu.find(".calendar-selected").attr("abbr");
if(!isNaN(year)){
opts.year=parseInt(year);
opts.month=parseInt(_5df);
show(_5d7);
}
if(_5de){
menu.hide();
}
};
function _5da(_5e0){
opts.year+=_5e0;
show(_5d7);
menu.find(".calendar-menu-year").val(opts.year);
};
function _5db(_5e1){
opts.month+=_5e1;
if(opts.month>12){
opts.year++;
opts.month=1;
}else{
if(opts.month<1){
opts.year--;
opts.month=12;
}
}
show(_5d7);
menu.find("td.calendar-selected").removeClass("calendar-selected");
menu.find("td:eq("+(opts.month-1)+")").addClass("calendar-selected");
};
};
function _5d3(_5e2){
var opts=$.data(_5e2,"calendar").options;
$(_5e2).find(".calendar-menu").show();
if($(_5e2).find(".calendar-menu-month-inner").is(":empty")){
$(_5e2).find(".calendar-menu-month-inner").empty();
var t=$("<table class=\"calendar-mtable\"></table>").appendTo($(_5e2).find(".calendar-menu-month-inner"));
var idx=0;
for(var i=0;i<3;i++){
var tr=$("<tr></tr>").appendTo(t);
for(var j=0;j<4;j++){
$("<td class=\"calendar-nav calendar-menu-month\"></td>").html(opts.months[idx++]).attr("abbr",idx).appendTo(tr);
}
}
}
var body=$(_5e2).find(".calendar-body");
var sele=$(_5e2).find(".calendar-menu");
var _5e3=sele.find(".calendar-menu-year-inner");
var _5e4=sele.find(".calendar-menu-month-inner");
_5e3.find("input").val(opts.year).focus();
_5e4.find("td.calendar-selected").removeClass("calendar-selected");
_5e4.find("td:eq("+(opts.month-1)+")").addClass("calendar-selected");
sele._outerWidth(body._outerWidth());
sele._outerHeight(body._outerHeight());
_5e4._outerHeight(sele.height()-_5e3._outerHeight());
};
function _5e5(_5e6,year,_5e7){
var opts=$.data(_5e6,"calendar").options;
var _5e8=[];
var _5e9=new Date(year,_5e7,0).getDate();
for(var i=1;i<=_5e9;i++){
_5e8.push([year,_5e7,i]);
}
var _5ea=[],week=[];
var _5eb=-1;
while(_5e8.length>0){
var date=_5e8.shift();
week.push(date);
var day=new Date(date[0],date[1]-1,date[2]).getDay();
if(_5eb==day){
day=0;
}else{
if(day==(opts.firstDay==0?7:opts.firstDay)-1){
_5ea.push(week);
week=[];
}
}
_5eb=day;
}
if(week.length){
_5ea.push(week);
}
var _5ec=_5ea[0];
if(_5ec.length<7){
while(_5ec.length<7){
var _5ed=_5ec[0];
var date=new Date(_5ed[0],_5ed[1]-1,_5ed[2]-1);
_5ec.unshift([date.getFullYear(),date.getMonth()+1,date.getDate()]);
}
}else{
var _5ed=_5ec[0];
var week=[];
for(var i=1;i<=7;i++){
var date=new Date(_5ed[0],_5ed[1]-1,_5ed[2]-i);
week.unshift([date.getFullYear(),date.getMonth()+1,date.getDate()]);
}
_5ea.unshift(week);
}
var _5ee=_5ea[_5ea.length-1];
while(_5ee.length<7){
var _5ef=_5ee[_5ee.length-1];
var date=new Date(_5ef[0],_5ef[1]-1,_5ef[2]+1);
_5ee.push([date.getFullYear(),date.getMonth()+1,date.getDate()]);
}
if(_5ea.length<6){
var _5ef=_5ee[_5ee.length-1];
var week=[];
for(var i=1;i<=7;i++){
var date=new Date(_5ef[0],_5ef[1]-1,_5ef[2]+i);
week.push([date.getFullYear(),date.getMonth()+1,date.getDate()]);
}
_5ea.push(week);
}
return _5ea;
};
function show(_5f0){
var opts=$.data(_5f0,"calendar").options;
if(opts.current&&!opts.validator.call(_5f0,opts.current)){
opts.current=null;
}
var now=new Date();
var _5f1=now.getFullYear()+","+(now.getMonth()+1)+","+now.getDate();
var _5f2=opts.current?(opts.current.getFullYear()+","+(opts.current.getMonth()+1)+","+opts.current.getDate()):"";
var _5f3=6-opts.firstDay;
var _5f4=_5f3+1;
if(_5f3>=7){
_5f3-=7;
}
if(_5f4>=7){
_5f4-=7;
}
$(_5f0).find(".calendar-title span").html(opts.months[opts.month-1]+" "+opts.year);
var body=$(_5f0).find("div.calendar-body");
body.children("table").remove();
var data=["<table class=\"calendar-dtable\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\">"];
data.push("<thead><tr>");
if(opts.showWeek){
data.push("<th class=\"calendar-week\">"+opts.weekNumberHeader+"</th>");
}
for(var i=opts.firstDay;i<opts.weeks.length;i++){
data.push("<th>"+opts.weeks[i]+"</th>");
}
for(var i=0;i<opts.firstDay;i++){
data.push("<th>"+opts.weeks[i]+"</th>");
}
data.push("</tr></thead>");
data.push("<tbody>");
var _5f5=_5e5(_5f0,opts.year,opts.month);
for(var i=0;i<_5f5.length;i++){
var week=_5f5[i];
var cls="";
if(i==0){
cls="calendar-first";
}else{
if(i==_5f5.length-1){
cls="calendar-last";
}
}
data.push("<tr class=\""+cls+"\">");
if(opts.showWeek){
var _5f6=opts.getWeekNumber(new Date(week[0][0],parseInt(week[0][1])-1,week[0][2]));
data.push("<td class=\"calendar-week\">"+_5f6+"</td>");
}
for(var j=0;j<week.length;j++){
var day=week[j];
var s=day[0]+","+day[1]+","+day[2];
var _5f7=new Date(day[0],parseInt(day[1])-1,day[2]);
var d=opts.formatter.call(_5f0,_5f7);
var css=opts.styler.call(_5f0,_5f7);
var _5f8="";
var _5f9="";
if(typeof css=="string"){
_5f9=css;
}else{
if(css){
_5f8=css["class"]||"";
_5f9=css["style"]||"";
}
}
var cls="calendar-day";
if(!(opts.year==day[0]&&opts.month==day[1])){
cls+=" calendar-other-month";
}
if(s==_5f1){
cls+=" calendar-today";
}
if(s==_5f2){
cls+=" calendar-selected";
}
if(j==_5f3){
cls+=" calendar-saturday";
}else{
if(j==_5f4){
cls+=" calendar-sunday";
}
}
if(j==0){
cls+=" calendar-first";
}else{
if(j==week.length-1){
cls+=" calendar-last";
}
}
cls+=" "+_5f8;
if(!opts.validator.call(_5f0,_5f7)){
cls+=" calendar-disabled";
}
data.push("<td class=\""+cls+"\" abbr=\""+s+"\" style=\""+_5f9+"\">"+d+"</td>");
}
data.push("</tr>");
}
data.push("</tbody>");
data.push("</table>");
body.append(data.join(""));
body.children("table.calendar-dtable").prependTo(body);
opts.onNavigate.call(_5f0,opts.year,opts.month);
};
$.fn.calendar=function(_5fa,_5fb){
if(typeof _5fa=="string"){
return $.fn.calendar.methods[_5fa](this,_5fb);
}
_5fa=_5fa||{};
return this.each(function(){
var _5fc=$.data(this,"calendar");
if(_5fc){
$.extend(_5fc.options,_5fa);
}else{
_5fc=$.data(this,"calendar",{options:$.extend({},$.fn.calendar.defaults,$.fn.calendar.parseOptions(this),_5fa)});
init(this);
}
if(_5fc.options.border==false){
$(this).addClass("calendar-noborder");
}
_5d0(this);
_5d6(this);
show(this);
$(this).find("div.calendar-menu").hide();
});
};
$.fn.calendar.methods={options:function(jq){
return $.data(jq[0],"calendar").options;
},resize:function(jq,_5fd){
return jq.each(function(){
_5d0(this,_5fd);
});
},moveTo:function(jq,date){
return jq.each(function(){
if(!date){
var now=new Date();
$(this).calendar({year:now.getFullYear(),month:now.getMonth()+1,current:date});
return;
}
var opts=$(this).calendar("options");
if(opts.validator.call(this,date)){
var _5fe=opts.current;
$(this).calendar({year:date.getFullYear(),month:date.getMonth()+1,current:date});
if(!_5fe||_5fe.getTime()!=date.getTime()){
opts.onChange.call(this,opts.current,_5fe);
}
}
});
}};
$.fn.calendar.parseOptions=function(_5ff){
var t=$(_5ff);
return $.extend({},$.parser.parseOptions(_5ff,["weekNumberHeader",{firstDay:"number",fit:"boolean",border:"boolean",showWeek:"boolean"}]));
};
$.fn.calendar.defaults={width:180,height:180,fit:false,border:true,showWeek:false,firstDay:0,weeks:["S","M","T","W","T","F","S"],months:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],year:new Date().getFullYear(),month:new Date().getMonth()+1,current:(function(){
var d=new Date();
return new Date(d.getFullYear(),d.getMonth(),d.getDate());
})(),weekNumberHeader:"",getWeekNumber:function(date){
var _600=new Date(date.getTime());
_600.setDate(_600.getDate()+4-(_600.getDay()||7));
var time=_600.getTime();
_600.setMonth(0);
_600.setDate(1);
return Math.floor(Math.round((time-_600)/86400000)/7)+1;
},formatter:function(date){
return date.getDate();
},styler:function(date){
return "";
},validator:function(date){
return true;
},onSelect:function(date){
},onChange:function(_601,_602){
},onNavigate:function(year,_603){
}};
})(jQuery);
(function($){
function _604(_605){
var _606=$.data(_605,"spinner");
var opts=_606.options;
var _607=$.extend(true,[],opts.icons);
if(opts.spinAlign=="left"||opts.spinAlign=="right"){
opts.spinArrow=true;
opts.iconAlign=opts.spinAlign;
var _608={iconCls:"spinner-arrow",handler:function(e){
var spin=$(e.target).closest(".spinner-arrow-up,.spinner-arrow-down");
_612(e.data.target,spin.hasClass("spinner-arrow-down"));
}};
if(opts.spinAlign=="left"){
_607.unshift(_608);
}else{
_607.push(_608);
}
}else{
opts.spinArrow=false;
if(opts.spinAlign=="vertical"){
if(opts.buttonAlign!="top"){
opts.buttonAlign="bottom";
}
opts.clsLeft="textbox-button-bottom";
opts.clsRight="textbox-button-top";
}else{
opts.clsLeft="textbox-button-left";
opts.clsRight="textbox-button-right";
}
}
$(_605).addClass("spinner-f").textbox($.extend({},opts,{icons:_607,doSize:false,onResize:function(_609,_60a){
if(!opts.spinArrow){
var span=$(this).next();
var btn=span.find(".textbox-button:not(.spinner-button)");
if(btn.length){
var _60b=btn.outerWidth();
var _60c=btn.outerHeight();
var _60d=span.find(".spinner-button."+opts.clsLeft);
var _60e=span.find(".spinner-button."+opts.clsRight);
if(opts.buttonAlign=="right"){
_60e.css("marginRight",_60b+"px");
}else{
if(opts.buttonAlign=="left"){
_60d.css("marginLeft",_60b+"px");
}else{
if(opts.buttonAlign=="top"){
_60e.css("marginTop",_60c+"px");
}else{
_60d.css("marginBottom",_60c+"px");
}
}
}
}
}
opts.onResize.call(this,_609,_60a);
}}));
$(_605).attr("spinnerName",$(_605).attr("textboxName"));
_606.spinner=$(_605).next();
_606.spinner.addClass("spinner");
if(opts.spinArrow){
var _60f=_606.spinner.find(".spinner-arrow");
_60f.append("<a href=\"javascript:;\" class=\"spinner-arrow-up\" tabindex=\"-1\"></a>");
_60f.append("<a href=\"javascript:;\" class=\"spinner-arrow-down\" tabindex=\"-1\"></a>");
}else{
var _610=$("<a href=\"javascript:;\" class=\"textbox-button spinner-button\"></a>").addClass(opts.clsLeft).appendTo(_606.spinner);
var _611=$("<a href=\"javascript:;\" class=\"textbox-button spinner-button\"></a>").addClass(opts.clsRight).appendTo(_606.spinner);
_610.linkbutton({iconCls:opts.reversed?"spinner-button-up":"spinner-button-down",onClick:function(){
_612(_605,!opts.reversed);
}});
_611.linkbutton({iconCls:opts.reversed?"spinner-button-down":"spinner-button-up",onClick:function(){
_612(_605,opts.reversed);
}});
if(opts.disabled){
$(_605).spinner("disable");
}
if(opts.readonly){
$(_605).spinner("readonly");
}
}
$(_605).spinner("resize");
};
function _612(_613,down){
var opts=$(_613).spinner("options");
opts.spin.call(_613,down);
opts[down?"onSpinDown":"onSpinUp"].call(_613);
$(_613).spinner("validate");
};
$.fn.spinner=function(_614,_615){
if(typeof _614=="string"){
var _616=$.fn.spinner.methods[_614];
if(_616){
return _616(this,_615);
}else{
return this.textbox(_614,_615);
}
}
_614=_614||{};
return this.each(function(){
var _617=$.data(this,"spinner");
if(_617){
$.extend(_617.options,_614);
}else{
_617=$.data(this,"spinner",{options:$.extend({},$.fn.spinner.defaults,$.fn.spinner.parseOptions(this),_614)});
}
_604(this);
});
};
$.fn.spinner.methods={options:function(jq){
var opts=jq.textbox("options");
return $.extend($.data(jq[0],"spinner").options,{width:opts.width,value:opts.value,originalValue:opts.originalValue,disabled:opts.disabled,readonly:opts.readonly});
}};
$.fn.spinner.parseOptions=function(_618){
return $.extend({},$.fn.textbox.parseOptions(_618),$.parser.parseOptions(_618,["min","max","spinAlign",{increment:"number",reversed:"boolean"}]));
};
$.fn.spinner.defaults=$.extend({},$.fn.textbox.defaults,{min:null,max:null,increment:1,spinAlign:"right",reversed:false,spin:function(down){
},onSpinUp:function(){
},onSpinDown:function(){
}});
})(jQuery);
(function($){
function _619(_61a){
$(_61a).addClass("numberspinner-f");
var opts=$.data(_61a,"numberspinner").options;
$(_61a).numberbox($.extend({},opts,{doSize:false})).spinner(opts);
$(_61a).numberbox("setValue",opts.value);
};
function _61b(_61c,down){
var opts=$.data(_61c,"numberspinner").options;
var v=parseFloat($(_61c).numberbox("getValue")||opts.value)||0;
if(down){
v-=opts.increment;
}else{
v+=opts.increment;
}
$(_61c).numberbox("setValue",v);
};
$.fn.numberspinner=function(_61d,_61e){
if(typeof _61d=="string"){
var _61f=$.fn.numberspinner.methods[_61d];
if(_61f){
return _61f(this,_61e);
}else{
return this.numberbox(_61d,_61e);
}
}
_61d=_61d||{};
return this.each(function(){
var _620=$.data(this,"numberspinner");
if(_620){
$.extend(_620.options,_61d);
}else{
$.data(this,"numberspinner",{options:$.extend({},$.fn.numberspinner.defaults,$.fn.numberspinner.parseOptions(this),_61d)});
}
_619(this);
});
};
$.fn.numberspinner.methods={options:function(jq){
var opts=jq.numberbox("options");
return $.extend($.data(jq[0],"numberspinner").options,{width:opts.width,value:opts.value,originalValue:opts.originalValue,disabled:opts.disabled,readonly:opts.readonly});
}};
$.fn.numberspinner.parseOptions=function(_621){
return $.extend({},$.fn.spinner.parseOptions(_621),$.fn.numberbox.parseOptions(_621),{});
};
$.fn.numberspinner.defaults=$.extend({},$.fn.spinner.defaults,$.fn.numberbox.defaults,{spin:function(down){
_61b(this,down);
}});
})(jQuery);
(function($){
function _622(_623){
var opts=$.data(_623,"timespinner").options;
$(_623).addClass("timespinner-f").spinner(opts);
var _624=opts.formatter.call(_623,opts.parser.call(_623,opts.value));
$(_623).timespinner("initValue",_624);
};
function _625(e){
var _626=e.data.target;
var opts=$.data(_626,"timespinner").options;
var _627=$(_626).timespinner("getSelectionStart");
for(var i=0;i<opts.selections.length;i++){
var _628=opts.selections[i];
if(_627>=_628[0]&&_627<=_628[1]){
_629(_626,i);
return;
}
}
};
function _629(_62a,_62b){
var opts=$.data(_62a,"timespinner").options;
if(_62b!=undefined){
opts.highlight=_62b;
}
var _62c=opts.selections[opts.highlight];
if(_62c){
var tb=$(_62a).timespinner("textbox");
$(_62a).timespinner("setSelectionRange",{start:_62c[0],end:_62c[1]});
tb.focus();
}
};
function _62d(_62e,_62f){
var opts=$.data(_62e,"timespinner").options;
var _62f=opts.parser.call(_62e,_62f);
var text=opts.formatter.call(_62e,_62f);
$(_62e).spinner("setValue",text);
};
function _630(_631,down){
var opts=$.data(_631,"timespinner").options;
var s=$(_631).timespinner("getValue");
var _632=opts.selections[opts.highlight];
var s1=s.substring(0,_632[0]);
var s2=s.substring(_632[0],_632[1]);
var s3=s.substring(_632[1]);
var v=s1+((parseInt(s2,10)||0)+opts.increment*(down?-1:1))+s3;
$(_631).timespinner("setValue",v);
_629(_631);
};
$.fn.timespinner=function(_633,_634){
if(typeof _633=="string"){
var _635=$.fn.timespinner.methods[_633];
if(_635){
return _635(this,_634);
}else{
return this.spinner(_633,_634);
}
}
_633=_633||{};
return this.each(function(){
var _636=$.data(this,"timespinner");
if(_636){
$.extend(_636.options,_633);
}else{
$.data(this,"timespinner",{options:$.extend({},$.fn.timespinner.defaults,$.fn.timespinner.parseOptions(this),_633)});
}
_622(this);
});
};
$.fn.timespinner.methods={options:function(jq){
var opts=jq.data("spinner")?jq.spinner("options"):{};
return $.extend($.data(jq[0],"timespinner").options,{width:opts.width,value:opts.value,originalValue:opts.originalValue,disabled:opts.disabled,readonly:opts.readonly});
},setValue:function(jq,_637){
return jq.each(function(){
_62d(this,_637);
});
},getHours:function(jq){
var opts=$.data(jq[0],"timespinner").options;
var vv=jq.timespinner("getValue").split(opts.separator);
return parseInt(vv[0],10);
},getMinutes:function(jq){
var opts=$.data(jq[0],"timespinner").options;
var vv=jq.timespinner("getValue").split(opts.separator);
return parseInt(vv[1],10);
},getSeconds:function(jq){
var opts=$.data(jq[0],"timespinner").options;
var vv=jq.timespinner("getValue").split(opts.separator);
return parseInt(vv[2],10)||0;
}};
$.fn.timespinner.parseOptions=function(_638){
return $.extend({},$.fn.spinner.parseOptions(_638),$.parser.parseOptions(_638,["separator",{showSeconds:"boolean",highlight:"number"}]));
};
$.fn.timespinner.defaults=$.extend({},$.fn.spinner.defaults,{inputEvents:$.extend({},$.fn.spinner.defaults.inputEvents,{click:function(e){
_625.call(this,e);
},blur:function(e){
var t=$(e.data.target);
t.timespinner("setValue",t.timespinner("getText"));
},keydown:function(e){
if(e.keyCode==13){
var t=$(e.data.target);
t.timespinner("setValue",t.timespinner("getText"));
}
}}),formatter:function(date){
if(!date){
return "";
}
var opts=$(this).timespinner("options");
var tt=[_639(date.getHours()),_639(date.getMinutes())];
if(opts.showSeconds){
tt.push(_639(date.getSeconds()));
}
return tt.join(opts.separator);
function _639(_63a){
return (_63a<10?"0":"")+_63a;
};
},parser:function(s){
var opts=$(this).timespinner("options");
var date=_63b(s);
if(date){
var min=_63b(opts.min);
var max=_63b(opts.max);
if(min&&min>date){
date=min;
}
if(max&&max<date){
date=max;
}
}
return date;
function _63b(s){
if(!s){
return null;
}
var tt=s.split(opts.separator);
return new Date(1900,0,0,parseInt(tt[0],10)||0,parseInt(tt[1],10)||0,parseInt(tt[2],10)||0);
};
},selections:[[0,2],[3,5],[6,8]],separator:":",showSeconds:false,highlight:0,spin:function(down){
_630(this,down);
}});
})(jQuery);
(function($){
function _63c(_63d){
var opts=$.data(_63d,"datetimespinner").options;
$(_63d).addClass("datetimespinner-f").timespinner(opts);
};
$.fn.datetimespinner=function(_63e,_63f){
if(typeof _63e=="string"){
var _640=$.fn.datetimespinner.methods[_63e];
if(_640){
return _640(this,_63f);
}else{
return this.timespinner(_63e,_63f);
}
}
_63e=_63e||{};
return this.each(function(){
var _641=$.data(this,"datetimespinner");
if(_641){
$.extend(_641.options,_63e);
}else{
$.data(this,"datetimespinner",{options:$.extend({},$.fn.datetimespinner.defaults,$.fn.datetimespinner.parseOptions(this),_63e)});
}
_63c(this);
});
};
$.fn.datetimespinner.methods={options:function(jq){
var opts=jq.timespinner("options");
return $.extend($.data(jq[0],"datetimespinner").options,{width:opts.width,value:opts.value,originalValue:opts.originalValue,disabled:opts.disabled,readonly:opts.readonly});
}};
$.fn.datetimespinner.parseOptions=function(_642){
return $.extend({},$.fn.timespinner.parseOptions(_642),$.parser.parseOptions(_642,[]));
};
$.fn.datetimespinner.defaults=$.extend({},$.fn.timespinner.defaults,{formatter:function(date){
if(!date){
return "";
}
return $.fn.datebox.defaults.formatter.call(this,date)+" "+$.fn.timespinner.defaults.formatter.call(this,date);
},parser:function(s){
s=$.trim(s);
if(!s){
return null;
}
var dt=s.split(" ");
var _643=$.fn.datebox.defaults.parser.call(this,dt[0]);
if(dt.length<2){
return _643;
}
var _644=$.fn.timespinner.defaults.parser.call(this,dt[1]);
return new Date(_643.getFullYear(),_643.getMonth(),_643.getDate(),_644.getHours(),_644.getMinutes(),_644.getSeconds());
},selections:[[0,2],[3,5],[6,10],[11,13],[14,16],[17,19]]});
})(jQuery);
(function($){
var _645=0;
function _646(a,o){
return $.easyui.indexOfArray(a,o);
};
function _647(a,o,id){
$.easyui.removeArrayItem(a,o,id);
};
function _648(a,o,r){
$.easyui.addArrayItem(a,o,r);
};
function _649(_64a,aa){
return $.data(_64a,"treegrid")?aa.slice(1):aa;
};
function _64b(_64c){
var _64d=$.data(_64c,"datagrid");
var opts=_64d.options;
var _64e=_64d.panel;
var dc=_64d.dc;
var ss=null;
if(opts.sharedStyleSheet){
ss=typeof opts.sharedStyleSheet=="boolean"?"head":opts.sharedStyleSheet;
}else{
ss=_64e.closest("div.datagrid-view");
if(!ss.length){
ss=dc.view;
}
}
var cc=$(ss);
var _64f=$.data(cc[0],"ss");
if(!_64f){
_64f=$.data(cc[0],"ss",{cache:{},dirty:[]});
}
return {add:function(_650){
var ss=["<style type=\"text/css\" easyui=\"true\">"];
for(var i=0;i<_650.length;i++){
_64f.cache[_650[i][0]]={width:_650[i][1]};
}
var _651=0;
for(var s in _64f.cache){
var item=_64f.cache[s];
item.index=_651++;
ss.push(s+"{width:"+item.width+"}");
}
ss.push("</style>");
$(ss.join("\n")).appendTo(cc);
cc.children("style[easyui]:not(:last)").remove();
},getRule:function(_652){
var _653=cc.children("style[easyui]:last")[0];
var _654=_653.styleSheet?_653.styleSheet:(_653.sheet||document.styleSheets[document.styleSheets.length-1]);
var _655=_654.cssRules||_654.rules;
return _655[_652];
},set:function(_656,_657){
var item=_64f.cache[_656];
if(item){
item.width=_657;
var rule=this.getRule(item.index);
if(rule){
rule.style["width"]=_657;
}
}
},remove:function(_658){
var tmp=[];
for(var s in _64f.cache){
if(s.indexOf(_658)==-1){
tmp.push([s,_64f.cache[s].width]);
}
}
_64f.cache={};
this.add(tmp);
},dirty:function(_659){
if(_659){
_64f.dirty.push(_659);
}
},clean:function(){
for(var i=0;i<_64f.dirty.length;i++){
this.remove(_64f.dirty[i]);
}
_64f.dirty=[];
}};
};
function _65a(_65b,_65c){
var _65d=$.data(_65b,"datagrid");
var opts=_65d.options;
var _65e=_65d.panel;
if(_65c){
$.extend(opts,_65c);
}
if(opts.fit==true){
var p=_65e.panel("panel").parent();
opts.width=p.width();
opts.height=p.height();
}
_65e.panel("resize",opts);
};
function _65f(_660){
var _661=$.data(_660,"datagrid");
var opts=_661.options;
var dc=_661.dc;
var wrap=_661.panel;
var _662=wrap.width();
var _663=wrap.height();
var view=dc.view;
var _664=dc.view1;
var _665=dc.view2;
var _666=_664.children("div.datagrid-header");
var _667=_665.children("div.datagrid-header");
var _668=_666.find("table");
var _669=_667.find("table");
view.width(_662);
var _66a=_666.children("div.datagrid-header-inner").show();
_664.width(_66a.find("table").width());
if(!opts.showHeader){
_66a.hide();
}
_665.width(_662-_664._outerWidth());
_664.children()._outerWidth(_664.width());
_665.children()._outerWidth(_665.width());
var all=_666.add(_667).add(_668).add(_669);
all.css("height","");
var hh=Math.max(_668.height(),_669.height());
all._outerHeight(hh);
view.children(".datagrid-empty").css("top",hh+"px");
dc.body1.add(dc.body2).children("table.datagrid-btable-frozen").css({position:"absolute",top:dc.header2._outerHeight()});
var _66b=dc.body2.children("table.datagrid-btable-frozen")._outerHeight();
var _66c=_66b+_667._outerHeight()+_665.children(".datagrid-footer")._outerHeight();
wrap.children(":not(.datagrid-view,.datagrid-mask,.datagrid-mask-msg)").each(function(){
_66c+=$(this)._outerHeight();
});
var _66d=wrap.outerHeight()-wrap.height();
var _66e=wrap._size("minHeight")||"";
var _66f=wrap._size("maxHeight")||"";
_664.add(_665).children("div.datagrid-body").css({marginTop:_66b,height:(isNaN(parseInt(opts.height))?"":(_663-_66c)),minHeight:(_66e?_66e-_66d-_66c:""),maxHeight:(_66f?_66f-_66d-_66c:"")});
view.height(_665.height());
};
function _670(_671,_672,_673){
var rows=$.data(_671,"datagrid").data.rows;
var opts=$.data(_671,"datagrid").options;
var dc=$.data(_671,"datagrid").dc;
if(!dc.body1.is(":empty")&&(!opts.nowrap||opts.autoRowHeight||_673)){
if(_672!=undefined){
var tr1=opts.finder.getTr(_671,_672,"body",1);
var tr2=opts.finder.getTr(_671,_672,"body",2);
_674(tr1,tr2);
}else{
var tr1=opts.finder.getTr(_671,0,"allbody",1);
var tr2=opts.finder.getTr(_671,0,"allbody",2);
_674(tr1,tr2);
if(opts.showFooter){
var tr1=opts.finder.getTr(_671,0,"allfooter",1);
var tr2=opts.finder.getTr(_671,0,"allfooter",2);
_674(tr1,tr2);
}
}
}
_65f(_671);
if(opts.height=="auto"){
var _675=dc.body1.parent();
var _676=dc.body2;
var _677=_678(_676);
var _679=_677.height;
if(_677.width>_676.width()){
_679+=18;
}
_679-=parseInt(_676.css("marginTop"))||0;
_675.height(_679);
_676.height(_679);
dc.view.height(dc.view2.height());
}
dc.body2.triggerHandler("scroll");
function _674(trs1,trs2){
for(var i=0;i<trs2.length;i++){
var tr1=$(trs1[i]);
var tr2=$(trs2[i]);
tr1.css("height","");
tr2.css("height","");
var _67a=Math.max(tr1.height(),tr2.height());
tr1.css("height",_67a);
tr2.css("height",_67a);
}
};
function _678(cc){
var _67b=0;
var _67c=0;
$(cc).children().each(function(){
var c=$(this);
if(c.is(":visible")){
_67c+=c._outerHeight();
if(_67b<c._outerWidth()){
_67b=c._outerWidth();
}
}
});
return {width:_67b,height:_67c};
};
};
function _67d(_67e,_67f){
var _680=$.data(_67e,"datagrid");
var opts=_680.options;
var dc=_680.dc;
if(!dc.body2.children("table.datagrid-btable-frozen").length){
dc.body1.add(dc.body2).prepend("<table class=\"datagrid-btable datagrid-btable-frozen\" cellspacing=\"0\" cellpadding=\"0\"></table>");
}
_681(true);
_681(false);
_65f(_67e);
function _681(_682){
var _683=_682?1:2;
var tr=opts.finder.getTr(_67e,_67f,"body",_683);
(_682?dc.body1:dc.body2).children("table.datagrid-btable-frozen").append(tr);
};
};
function _684(_685,_686){
function _687(){
var _688=[];
var _689=[];
$(_685).children("thead").each(function(){
var opt=$.parser.parseOptions(this,[{frozen:"boolean"}]);
$(this).find("tr").each(function(){
var cols=[];
$(this).find("th").each(function(){
var th=$(this);
var col=$.extend({},$.parser.parseOptions(this,["id","field","align","halign","order","width",{sortable:"boolean",checkbox:"boolean",resizable:"boolean",fixed:"boolean"},{rowspan:"number",colspan:"number"}]),{title:(th.html()||undefined),hidden:(th.attr("hidden")?true:undefined),formatter:(th.attr("formatter")?eval(th.attr("formatter")):undefined),styler:(th.attr("styler")?eval(th.attr("styler")):undefined),sorter:(th.attr("sorter")?eval(th.attr("sorter")):undefined)});
if(col.width&&String(col.width).indexOf("%")==-1){
col.width=parseInt(col.width);
}
if(th.attr("editor")){
var s=$.trim(th.attr("editor"));
if(s.substr(0,1)=="{"){
col.editor=eval("("+s+")");
}else{
col.editor=s;
}
}
cols.push(col);
});
opt.frozen?_688.push(cols):_689.push(cols);
});
});
return [_688,_689];
};
var _68a=$("<div class=\"datagrid-wrap\">"+"<div class=\"datagrid-view\">"+"<div class=\"datagrid-view1\">"+"<div class=\"datagrid-header\">"+"<div class=\"datagrid-header-inner\"></div>"+"</div>"+"<div class=\"datagrid-body\">"+"<div class=\"datagrid-body-inner\"></div>"+"</div>"+"<div class=\"datagrid-footer\">"+"<div class=\"datagrid-footer-inner\"></div>"+"</div>"+"</div>"+"<div class=\"datagrid-view2\">"+"<div class=\"datagrid-header\">"+"<div class=\"datagrid-header-inner\"></div>"+"</div>"+"<div class=\"datagrid-body\"></div>"+"<div class=\"datagrid-footer\">"+"<div class=\"datagrid-footer-inner\"></div>"+"</div>"+"</div>"+"</div>"+"</div>").insertAfter(_685);
_68a.panel({doSize:false,cls:"datagrid"});
$(_685).addClass("datagrid-f").hide().appendTo(_68a.children("div.datagrid-view"));
var cc=_687();
var view=_68a.children("div.datagrid-view");
var _68b=view.children("div.datagrid-view1");
var _68c=view.children("div.datagrid-view2");
return {panel:_68a,frozenColumns:cc[0],columns:cc[1],dc:{view:view,view1:_68b,view2:_68c,header1:_68b.children("div.datagrid-header").children("div.datagrid-header-inner"),header2:_68c.children("div.datagrid-header").children("div.datagrid-header-inner"),body1:_68b.children("div.datagrid-body").children("div.datagrid-body-inner"),body2:_68c.children("div.datagrid-body"),footer1:_68b.children("div.datagrid-footer").children("div.datagrid-footer-inner"),footer2:_68c.children("div.datagrid-footer").children("div.datagrid-footer-inner")}};
};
function _68d(_68e){
var _68f=$.data(_68e,"datagrid");
var opts=_68f.options;
var dc=_68f.dc;
var _690=_68f.panel;
_68f.ss=$(_68e).datagrid("createStyleSheet");
_690.panel($.extend({},opts,{id:null,doSize:false,onResize:function(_691,_692){
if($.data(_68e,"datagrid")){
_65f(_68e);
$(_68e).datagrid("fitColumns");
opts.onResize.call(_690,_691,_692);
}
},onExpand:function(){
if($.data(_68e,"datagrid")){
$(_68e).datagrid("fixRowHeight").datagrid("fitColumns");
opts.onExpand.call(_690);
}
}}));
_68f.rowIdPrefix="datagrid-row-r"+(++_645);
_68f.cellClassPrefix="datagrid-cell-c"+_645;
_693(dc.header1,opts.frozenColumns,true);
_693(dc.header2,opts.columns,false);
_694();
dc.header1.add(dc.header2).css("display",opts.showHeader?"block":"none");
dc.footer1.add(dc.footer2).css("display",opts.showFooter?"block":"none");
if(opts.toolbar){
if($.isArray(opts.toolbar)){
$("div.datagrid-toolbar",_690).remove();
var tb=$("<div class=\"datagrid-toolbar\"><table cellspacing=\"0\" cellpadding=\"0\"><tr></tr></table></div>").prependTo(_690);
var tr=tb.find("tr");
for(var i=0;i<opts.toolbar.length;i++){
var btn=opts.toolbar[i];
if(btn=="-"){
$("<td><div class=\"datagrid-btn-separator\"></div></td>").appendTo(tr);
}else{
var td=$("<td></td>").appendTo(tr);
var tool=$("<a href=\"javascript:;\"></a>").appendTo(td);
tool[0].onclick=eval(btn.handler||function(){
});
tool.linkbutton($.extend({},btn,{plain:true}));
}
}
}else{
$(opts.toolbar).addClass("datagrid-toolbar").prependTo(_690);
$(opts.toolbar).show();
}
}else{
$("div.datagrid-toolbar",_690).remove();
}
$("div.datagrid-pager",_690).remove();
if(opts.pagination){
var _695=$("<div class=\"datagrid-pager\"></div>");
if(opts.pagePosition=="bottom"){
_695.appendTo(_690);
}else{
if(opts.pagePosition=="top"){
_695.addClass("datagrid-pager-top").prependTo(_690);
}else{
var ptop=$("<div class=\"datagrid-pager datagrid-pager-top\"></div>").prependTo(_690);
_695.appendTo(_690);
_695=_695.add(ptop);
}
}
_695.pagination({total:0,pageNumber:opts.pageNumber,pageSize:opts.pageSize,pageList:opts.pageList,onSelectPage:function(_696,_697){
opts.pageNumber=_696||1;
opts.pageSize=_697;
_695.pagination("refresh",{pageNumber:_696,pageSize:_697});
_6df(_68e);
}});
opts.pageSize=_695.pagination("options").pageSize;
}
function _693(_698,_699,_69a){
if(!_699){
return;
}
$(_698).show();
$(_698).empty();
var tmp=$("<div class=\"datagrid-cell\" style=\"position:absolute;left:-99999px\"></div>").appendTo("body");
tmp._outerWidth(99);
var _69b=100-parseInt(tmp[0].style.width);
tmp.remove();
var _69c=[];
var _69d=[];
var _69e=[];
if(opts.sortName){
_69c=opts.sortName.split(",");
_69d=opts.sortOrder.split(",");
}
var t=$("<table class=\"datagrid-htable\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\"><tbody></tbody></table>").appendTo(_698);
for(var i=0;i<_699.length;i++){
var tr=$("<tr class=\"datagrid-header-row\"></tr>").appendTo($("tbody",t));
var cols=_699[i];
for(var j=0;j<cols.length;j++){
var col=cols[j];
var attr="";
if(col.rowspan){
attr+="rowspan=\""+col.rowspan+"\" ";
}
if(col.colspan){
attr+="colspan=\""+col.colspan+"\" ";
if(!col.id){
col.id=["datagrid-td-group"+_645,i,j].join("-");
}
}
if(col.id){
attr+="id=\""+col.id+"\"";
}
var td=$("<td "+attr+"></td>").appendTo(tr);
if(col.checkbox){
td.attr("field",col.field);
$("<div class=\"datagrid-header-check\"></div>").html("<input type=\"checkbox\"/>").appendTo(td);
}else{
if(col.field){
td.attr("field",col.field);
td.append("<div class=\"datagrid-cell\"><span></span><span class=\"datagrid-sort-icon\"></span></div>");
td.find("span:first").html(col.title);
var cell=td.find("div.datagrid-cell");
var pos=_646(_69c,col.field);
if(pos>=0){
cell.addClass("datagrid-sort-"+_69d[pos]);
}
if(col.sortable){
cell.addClass("datagrid-sort");
}
if(col.resizable==false){
cell.attr("resizable","false");
}
if(col.width){
var _69f=$.parser.parseValue("width",col.width,dc.view,opts.scrollbarSize+(opts.rownumbers?opts.rownumberWidth:0));
col.deltaWidth=_69b;
col.boxWidth=_69f-_69b;
}else{
col.auto=true;
}
cell.css("text-align",(col.halign||col.align||""));
col.cellClass=_68f.cellClassPrefix+"-"+col.field.replace(/[\.|\s]/g,"-");
cell.addClass(col.cellClass);
}else{
$("<div class=\"datagrid-cell-group\"></div>").html(col.title).appendTo(td);
}
}
if(col.hidden){
td.hide();
_69e.push(col.field);
}
}
}
if(_69a&&opts.rownumbers){
var td=$("<td rowspan=\""+opts.frozenColumns.length+"\"><div class=\"datagrid-header-rownumber\"></div></td>");
if($("tr",t).length==0){
td.wrap("<tr class=\"datagrid-header-row\"></tr>").parent().appendTo($("tbody",t));
}else{
td.prependTo($("tr:first",t));
}
}
for(var i=0;i<_69e.length;i++){
_6e1(_68e,_69e[i],-1);
}
};
function _694(){
var _6a0=[[".datagrid-header-rownumber",(opts.rownumberWidth-1)+"px"],[".datagrid-cell-rownumber",(opts.rownumberWidth-1)+"px"]];
var _6a1=_6a2(_68e,true).concat(_6a2(_68e));
for(var i=0;i<_6a1.length;i++){
var col=_6a3(_68e,_6a1[i]);
if(col&&!col.checkbox){
_6a0.push(["."+col.cellClass,col.boxWidth?col.boxWidth+"px":"auto"]);
}
}
_68f.ss.add(_6a0);
_68f.ss.dirty(_68f.cellSelectorPrefix);
_68f.cellSelectorPrefix="."+_68f.cellClassPrefix;
};
};
function _6a4(_6a5){
var _6a6=$.data(_6a5,"datagrid");
var _6a7=_6a6.panel;
var opts=_6a6.options;
var dc=_6a6.dc;
var _6a8=dc.header1.add(dc.header2);
_6a8.unbind(".datagrid");
for(var _6a9 in opts.headerEvents){
_6a8.bind(_6a9+".datagrid",opts.headerEvents[_6a9]);
}
var _6aa=_6a8.find("div.datagrid-cell");
var _6ab=opts.resizeHandle=="right"?"e":(opts.resizeHandle=="left"?"w":"e,w");
_6aa.each(function(){
$(this).resizable({handles:_6ab,disabled:($(this).attr("resizable")?$(this).attr("resizable")=="false":false),minWidth:25,onStartResize:function(e){
_6a6.resizing=true;
_6a8.css("cursor",$("body").css("cursor"));
if(!_6a6.proxy){
_6a6.proxy=$("<div class=\"datagrid-resize-proxy\"></div>").appendTo(dc.view);
}
_6a6.proxy.css({left:e.pageX-$(_6a7).offset().left-1,display:"none"});
setTimeout(function(){
if(_6a6.proxy){
_6a6.proxy.show();
}
},500);
},onResize:function(e){
_6a6.proxy.css({left:e.pageX-$(_6a7).offset().left-1,display:"block"});
return false;
},onStopResize:function(e){
_6a8.css("cursor","");
$(this).css("height","");
var _6ac=$(this).parent().attr("field");
var col=_6a3(_6a5,_6ac);
col.width=$(this)._outerWidth();
col.boxWidth=col.width-col.deltaWidth;
col.auto=undefined;
$(this).css("width","");
$(_6a5).datagrid("fixColumnSize",_6ac);
_6a6.proxy.remove();
_6a6.proxy=null;
if($(this).parents("div:first.datagrid-header").parent().hasClass("datagrid-view1")){
_65f(_6a5);
}
$(_6a5).datagrid("fitColumns");
opts.onResizeColumn.call(_6a5,_6ac,col.width);
setTimeout(function(){
_6a6.resizing=false;
},0);
}});
});
var bb=dc.body1.add(dc.body2);
bb.unbind();
for(var _6a9 in opts.rowEvents){
bb.bind(_6a9,opts.rowEvents[_6a9]);
}
dc.body1.bind("mousewheel DOMMouseScroll",function(e){
e.preventDefault();
var e1=e.originalEvent||window.event;
var _6ad=e1.wheelDelta||e1.detail*(-1);
if("deltaY" in e1){
_6ad=e1.deltaY*-1;
}
var dg=$(e.target).closest("div.datagrid-view").children(".datagrid-f");
var dc=dg.data("datagrid").dc;
dc.body2.scrollTop(dc.body2.scrollTop()-_6ad);
});
dc.body2.bind("scroll",function(){
var b1=dc.view1.children("div.datagrid-body");
b1.scrollTop($(this).scrollTop());
var c1=dc.body1.children(":first");
var c2=dc.body2.children(":first");
if(c1.length&&c2.length){
var top1=c1.offset().top;
var top2=c2.offset().top;
if(top1!=top2){
b1.scrollTop(b1.scrollTop()+top1-top2);
}
}
dc.view2.children("div.datagrid-header,div.datagrid-footer")._scrollLeft($(this)._scrollLeft());
dc.body2.children("table.datagrid-btable-frozen").css("left",-$(this)._scrollLeft());
});
};
function _6ae(_6af){
return function(e){
var td=$(e.target).closest("td[field]");
if(td.length){
var _6b0=_6b1(td);
if(!$(_6b0).data("datagrid").resizing&&_6af){
td.addClass("datagrid-header-over");
}else{
td.removeClass("datagrid-header-over");
}
}
};
};
function _6b2(e){
var _6b3=_6b1(e.target);
var opts=$(_6b3).datagrid("options");
var ck=$(e.target).closest("input[type=checkbox]");
if(ck.length){
if(opts.singleSelect&&opts.selectOnCheck){
return false;
}
if(ck.is(":checked")){
_6b4(_6b3);
}else{
_6b5(_6b3);
}
e.stopPropagation();
}else{
var cell=$(e.target).closest(".datagrid-cell");
if(cell.length){
var p1=cell.offset().left+5;
var p2=cell.offset().left+cell._outerWidth()-5;
if(e.pageX<p2&&e.pageX>p1){
_6b6(_6b3,cell.parent().attr("field"));
}
}
}
};
function _6b7(e){
var _6b8=_6b1(e.target);
var opts=$(_6b8).datagrid("options");
var cell=$(e.target).closest(".datagrid-cell");
if(cell.length){
var p1=cell.offset().left+5;
var p2=cell.offset().left+cell._outerWidth()-5;
var cond=opts.resizeHandle=="right"?(e.pageX>p2):(opts.resizeHandle=="left"?(e.pageX<p1):(e.pageX<p1||e.pageX>p2));
if(cond){
var _6b9=cell.parent().attr("field");
var col=_6a3(_6b8,_6b9);
if(col.resizable==false){
return;
}
$(_6b8).datagrid("autoSizeColumn",_6b9);
col.auto=false;
}
}
};
function _6ba(e){
var _6bb=_6b1(e.target);
var opts=$(_6bb).datagrid("options");
var td=$(e.target).closest("td[field]");
opts.onHeaderContextMenu.call(_6bb,e,td.attr("field"));
};
function _6bc(_6bd){
return function(e){
var tr=_6be(e.target);
if(!tr){
return;
}
var _6bf=_6b1(tr);
if($.data(_6bf,"datagrid").resizing){
return;
}
var _6c0=_6c1(tr);
if(_6bd){
_6c2(_6bf,_6c0);
}else{
var opts=$.data(_6bf,"datagrid").options;
opts.finder.getTr(_6bf,_6c0).removeClass("datagrid-row-over");
}
};
};
function _6c3(e){
var tr=_6be(e.target);
if(!tr){
return;
}
var _6c4=_6b1(tr);
var opts=$.data(_6c4,"datagrid").options;
var _6c5=_6c1(tr);
var tt=$(e.target);
if(tt.parent().hasClass("datagrid-cell-check")){
if(opts.singleSelect&&opts.selectOnCheck){
tt._propAttr("checked",!tt.is(":checked"));
_6c6(_6c4,_6c5);
}else{
if(tt.is(":checked")){
tt._propAttr("checked",false);
_6c6(_6c4,_6c5);
}else{
tt._propAttr("checked",true);
_6c7(_6c4,_6c5);
}
}
}else{
var row=opts.finder.getRow(_6c4,_6c5);
var td=tt.closest("td[field]",tr);
if(td.length){
var _6c8=td.attr("field");
opts.onClickCell.call(_6c4,_6c5,_6c8,row[_6c8]);
}
if(opts.singleSelect==true){
_6c9(_6c4,_6c5);
}else{
if(opts.ctrlSelect){
if(e.metaKey||e.ctrlKey){
if(tr.hasClass("datagrid-row-selected")){
_6ca(_6c4,_6c5);
}else{
_6c9(_6c4,_6c5);
}
}else{
if(e.shiftKey){
$(_6c4).datagrid("clearSelections");
var _6cb=Math.min(opts.lastSelectedIndex||0,_6c5);
var _6cc=Math.max(opts.lastSelectedIndex||0,_6c5);
for(var i=_6cb;i<=_6cc;i++){
_6c9(_6c4,i);
}
}else{
$(_6c4).datagrid("clearSelections");
_6c9(_6c4,_6c5);
opts.lastSelectedIndex=_6c5;
}
}
}else{
if(tr.hasClass("datagrid-row-selected")){
_6ca(_6c4,_6c5);
}else{
_6c9(_6c4,_6c5);
}
}
}
opts.onClickRow.apply(_6c4,_649(_6c4,[_6c5,row]));
}
};
function _6cd(e){
var tr=_6be(e.target);
if(!tr){
return;
}
var _6ce=_6b1(tr);
var opts=$.data(_6ce,"datagrid").options;
var _6cf=_6c1(tr);
var row=opts.finder.getRow(_6ce,_6cf);
var td=$(e.target).closest("td[field]",tr);
if(td.length){
var _6d0=td.attr("field");
opts.onDblClickCell.call(_6ce,_6cf,_6d0,row[_6d0]);
}
opts.onDblClickRow.apply(_6ce,_649(_6ce,[_6cf,row]));
};
function _6d1(e){
var tr=_6be(e.target);
if(tr){
var _6d2=_6b1(tr);
var opts=$.data(_6d2,"datagrid").options;
var _6d3=_6c1(tr);
var row=opts.finder.getRow(_6d2,_6d3);
opts.onRowContextMenu.call(_6d2,e,_6d3,row);
}else{
var body=_6be(e.target,".datagrid-body");
if(body){
var _6d2=_6b1(body);
var opts=$.data(_6d2,"datagrid").options;
opts.onRowContextMenu.call(_6d2,e,-1,null);
}
}
};
function _6b1(t){
return $(t).closest("div.datagrid-view").children(".datagrid-f")[0];
};
function _6be(t,_6d4){
var tr=$(t).closest(_6d4||"tr.datagrid-row");
if(tr.length&&tr.parent().length){
return tr;
}else{
return undefined;
}
};
function _6c1(tr){
if(tr.attr("datagrid-row-index")){
return parseInt(tr.attr("datagrid-row-index"));
}else{
return tr.attr("node-id");
}
};
function _6b6(_6d5,_6d6){
var _6d7=$.data(_6d5,"datagrid");
var opts=_6d7.options;
_6d6=_6d6||{};
var _6d8={sortName:opts.sortName,sortOrder:opts.sortOrder};
if(typeof _6d6=="object"){
$.extend(_6d8,_6d6);
}
var _6d9=[];
var _6da=[];
if(_6d8.sortName){
_6d9=_6d8.sortName.split(",");
_6da=_6d8.sortOrder.split(",");
}
if(typeof _6d6=="string"){
var _6db=_6d6;
var col=_6a3(_6d5,_6db);
if(!col.sortable||_6d7.resizing){
return;
}
var _6dc=col.order||"asc";
var pos=_646(_6d9,_6db);
if(pos>=0){
var _6dd=_6da[pos]=="asc"?"desc":"asc";
if(opts.multiSort&&_6dd==_6dc){
_6d9.splice(pos,1);
_6da.splice(pos,1);
}else{
_6da[pos]=_6dd;
}
}else{
if(opts.multiSort){
_6d9.push(_6db);
_6da.push(_6dc);
}else{
_6d9=[_6db];
_6da=[_6dc];
}
}
_6d8.sortName=_6d9.join(",");
_6d8.sortOrder=_6da.join(",");
}
if(opts.onBeforeSortColumn.call(_6d5,_6d8.sortName,_6d8.sortOrder)==false){
return;
}
$.extend(opts,_6d8);
var dc=_6d7.dc;
var _6de=dc.header1.add(dc.header2);
_6de.find("div.datagrid-cell").removeClass("datagrid-sort-asc datagrid-sort-desc");
for(var i=0;i<_6d9.length;i++){
var col=_6a3(_6d5,_6d9[i]);
_6de.find("div."+col.cellClass).addClass("datagrid-sort-"+_6da[i]);
}
if(opts.remoteSort){
_6df(_6d5);
}else{
_6e0(_6d5,$(_6d5).datagrid("getData"));
}
opts.onSortColumn.call(_6d5,opts.sortName,opts.sortOrder);
};
function _6e1(_6e2,_6e3,_6e4){
_6e5(true);
_6e5(false);
function _6e5(_6e6){
var aa=_6e7(_6e2,_6e6);
if(aa.length){
var _6e8=aa[aa.length-1];
var _6e9=_646(_6e8,_6e3);
if(_6e9>=0){
for(var _6ea=0;_6ea<aa.length-1;_6ea++){
var td=$("#"+aa[_6ea][_6e9]);
var _6eb=parseInt(td.attr("colspan")||1)+(_6e4||0);
td.attr("colspan",_6eb);
if(_6eb){
td.show();
}else{
td.hide();
}
}
}
}
};
};
function _6ec(_6ed){
var _6ee=$.data(_6ed,"datagrid");
var opts=_6ee.options;
var dc=_6ee.dc;
var _6ef=dc.view2.children("div.datagrid-header");
dc.body2.css("overflow-x","");
_6f0();
_6f1();
_6f2();
_6f0(true);
if(_6ef.width()>=_6ef.find("table").width()){
dc.body2.css("overflow-x","hidden");
}
function _6f2(){
if(!opts.fitColumns){
return;
}
if(!_6ee.leftWidth){
_6ee.leftWidth=0;
}
var _6f3=0;
var cc=[];
var _6f4=_6a2(_6ed,false);
for(var i=0;i<_6f4.length;i++){
var col=_6a3(_6ed,_6f4[i]);
if(_6f5(col)){
_6f3+=col.width;
cc.push({field:col.field,col:col,addingWidth:0});
}
}
if(!_6f3){
return;
}
cc[cc.length-1].addingWidth-=_6ee.leftWidth;
var _6f6=_6ef.children("div.datagrid-header-inner").show();
var _6f7=_6ef.width()-_6ef.find("table").width()-opts.scrollbarSize+_6ee.leftWidth;
var rate=_6f7/_6f3;
if(!opts.showHeader){
_6f6.hide();
}
for(var i=0;i<cc.length;i++){
var c=cc[i];
var _6f8=parseInt(c.col.width*rate);
c.addingWidth+=_6f8;
_6f7-=_6f8;
}
cc[cc.length-1].addingWidth+=_6f7;
for(var i=0;i<cc.length;i++){
var c=cc[i];
if(c.col.boxWidth+c.addingWidth>0){
c.col.boxWidth+=c.addingWidth;
c.col.width+=c.addingWidth;
}
}
_6ee.leftWidth=_6f7;
$(_6ed).datagrid("fixColumnSize");
};
function _6f1(){
var _6f9=false;
var _6fa=_6a2(_6ed,true).concat(_6a2(_6ed,false));
$.map(_6fa,function(_6fb){
var col=_6a3(_6ed,_6fb);
if(String(col.width||"").indexOf("%")>=0){
var _6fc=$.parser.parseValue("width",col.width,dc.view,opts.scrollbarSize+(opts.rownumbers?opts.rownumberWidth:0))-col.deltaWidth;
if(_6fc>0){
col.boxWidth=_6fc;
_6f9=true;
}
}
});
if(_6f9){
$(_6ed).datagrid("fixColumnSize");
}
};
function _6f0(fit){
var _6fd=dc.header1.add(dc.header2).find(".datagrid-cell-group");
if(_6fd.length){
_6fd.each(function(){
$(this)._outerWidth(fit?$(this).parent().width():10);
});
if(fit){
_65f(_6ed);
}
}
};
function _6f5(col){
if(String(col.width||"").indexOf("%")>=0){
return false;
}
if(!col.hidden&&!col.checkbox&&!col.auto&&!col.fixed){
return true;
}
};
};
function _6fe(_6ff,_700){
var _701=$.data(_6ff,"datagrid");
var opts=_701.options;
var dc=_701.dc;
var tmp=$("<div class=\"datagrid-cell\" style=\"position:absolute;left:-9999px\"></div>").appendTo("body");
if(_700){
_65a(_700);
$(_6ff).datagrid("fitColumns");
}else{
var _702=false;
var _703=_6a2(_6ff,true).concat(_6a2(_6ff,false));
for(var i=0;i<_703.length;i++){
var _700=_703[i];
var col=_6a3(_6ff,_700);
if(col.auto){
_65a(_700);
_702=true;
}
}
if(_702){
$(_6ff).datagrid("fitColumns");
}
}
tmp.remove();
function _65a(_704){
var _705=dc.view.find("div.datagrid-header td[field=\""+_704+"\"] div.datagrid-cell");
_705.css("width","");
var col=$(_6ff).datagrid("getColumnOption",_704);
col.width=undefined;
col.boxWidth=undefined;
col.auto=true;
$(_6ff).datagrid("fixColumnSize",_704);
var _706=Math.max(_707("header"),_707("allbody"),_707("allfooter"))+1;
_705._outerWidth(_706-1);
col.width=_706;
col.boxWidth=parseInt(_705[0].style.width);
col.deltaWidth=_706-col.boxWidth;
_705.css("width","");
$(_6ff).datagrid("fixColumnSize",_704);
opts.onResizeColumn.call(_6ff,_704,col.width);
function _707(type){
var _708=0;
if(type=="header"){
_708=_709(_705);
}else{
opts.finder.getTr(_6ff,0,type).find("td[field=\""+_704+"\"] div.datagrid-cell").each(function(){
var w=_709($(this));
if(_708<w){
_708=w;
}
});
}
return _708;
function _709(cell){
return cell.is(":visible")?cell._outerWidth():tmp.html(cell.html())._outerWidth();
};
};
};
};
function _70a(_70b,_70c){
var _70d=$.data(_70b,"datagrid");
var opts=_70d.options;
var dc=_70d.dc;
var _70e=dc.view.find("table.datagrid-btable,table.datagrid-ftable");
_70e.css("table-layout","fixed");
if(_70c){
fix(_70c);
}else{
var ff=_6a2(_70b,true).concat(_6a2(_70b,false));
for(var i=0;i<ff.length;i++){
fix(ff[i]);
}
}
_70e.css("table-layout","");
_70f(_70b);
_670(_70b);
_710(_70b);
function fix(_711){
var col=_6a3(_70b,_711);
if(col.cellClass){
_70d.ss.set("."+col.cellClass,col.boxWidth?col.boxWidth+"px":"auto");
}
};
};
function _70f(_712,tds){
var dc=$.data(_712,"datagrid").dc;
tds=tds||dc.view.find("td.datagrid-td-merged");
tds.each(function(){
var td=$(this);
var _713=td.attr("colspan")||1;
if(_713>1){
var col=_6a3(_712,td.attr("field"));
var _714=col.boxWidth+col.deltaWidth-1;
for(var i=1;i<_713;i++){
td=td.next();
col=_6a3(_712,td.attr("field"));
_714+=col.boxWidth+col.deltaWidth;
}
$(this).children("div.datagrid-cell")._outerWidth(_714);
}
});
};
function _710(_715){
var dc=$.data(_715,"datagrid").dc;
dc.view.find("div.datagrid-editable").each(function(){
var cell=$(this);
var _716=cell.parent().attr("field");
var col=$(_715).datagrid("getColumnOption",_716);
cell._outerWidth(col.boxWidth+col.deltaWidth-1);
var ed=$.data(this,"datagrid.editor");
if(ed.actions.resize){
ed.actions.resize(ed.target,cell.width());
}
});
};
function _6a3(_717,_718){
function find(_719){
if(_719){
for(var i=0;i<_719.length;i++){
var cc=_719[i];
for(var j=0;j<cc.length;j++){
var c=cc[j];
if(c.field==_718){
return c;
}
}
}
}
return null;
};
var opts=$.data(_717,"datagrid").options;
var col=find(opts.columns);
if(!col){
col=find(opts.frozenColumns);
}
return col;
};
function _6e7(_71a,_71b){
var opts=$.data(_71a,"datagrid").options;
var _71c=_71b?opts.frozenColumns:opts.columns;
var aa=[];
var _71d=_71e();
for(var i=0;i<_71c.length;i++){
aa[i]=new Array(_71d);
}
for(var _71f=0;_71f<_71c.length;_71f++){
$.map(_71c[_71f],function(col){
var _720=_721(aa[_71f]);
if(_720>=0){
var _722=col.field||col.id||"";
for(var c=0;c<(col.colspan||1);c++){
for(var r=0;r<(col.rowspan||1);r++){
aa[_71f+r][_720]=_722;
}
_720++;
}
}
});
}
return aa;
function _71e(){
var _723=0;
$.map(_71c[0]||[],function(col){
_723+=col.colspan||1;
});
return _723;
};
function _721(a){
for(var i=0;i<a.length;i++){
if(a[i]==undefined){
return i;
}
}
return -1;
};
};
function _6a2(_724,_725){
var aa=_6e7(_724,_725);
return aa.length?aa[aa.length-1]:aa;
};
function _6e0(_726,data){
var _727=$.data(_726,"datagrid");
var opts=_727.options;
var dc=_727.dc;
data=opts.loadFilter.call(_726,data);
if($.isArray(data)){
data={total:data.length,rows:data};
}
data.total=parseInt(data.total);
_727.data=data;
if(data.footer){
_727.footer=data.footer;
}
if(!opts.remoteSort&&opts.sortName){
var _728=opts.sortName.split(",");
var _729=opts.sortOrder.split(",");
data.rows.sort(function(r1,r2){
var r=0;
for(var i=0;i<_728.length;i++){
var sn=_728[i];
var so=_729[i];
var col=_6a3(_726,sn);
var _72a=col.sorter||function(a,b){
return a==b?0:(a>b?1:-1);
};
r=_72a(r1[sn],r2[sn])*(so=="asc"?1:-1);
if(r!=0){
return r;
}
}
return r;
});
}
if(opts.view.onBeforeRender){
opts.view.onBeforeRender.call(opts.view,_726,data.rows);
}
opts.view.render.call(opts.view,_726,dc.body2,false);
opts.view.render.call(opts.view,_726,dc.body1,true);
if(opts.showFooter){
opts.view.renderFooter.call(opts.view,_726,dc.footer2,false);
opts.view.renderFooter.call(opts.view,_726,dc.footer1,true);
}
if(opts.view.onAfterRender){
opts.view.onAfterRender.call(opts.view,_726);
}
_727.ss.clean();
var _72b=$(_726).datagrid("getPager");
if(_72b.length){
var _72c=_72b.pagination("options");
if(_72c.total!=data.total){
_72b.pagination("refresh",{total:data.total});
if(opts.pageNumber!=_72c.pageNumber&&_72c.pageNumber>0){
opts.pageNumber=_72c.pageNumber;
_6df(_726);
}
}
}
_670(_726);
dc.body2.triggerHandler("scroll");
$(_726).datagrid("setSelectionState");
$(_726).datagrid("autoSizeColumn");
opts.onLoadSuccess.call(_726,data);
};
function _72d(_72e){
var _72f=$.data(_72e,"datagrid");
var opts=_72f.options;
var dc=_72f.dc;
dc.header1.add(dc.header2).find("input[type=checkbox]")._propAttr("checked",false);
if(opts.idField){
var _730=$.data(_72e,"treegrid")?true:false;
var _731=opts.onSelect;
var _732=opts.onCheck;
opts.onSelect=opts.onCheck=function(){
};
var rows=opts.finder.getRows(_72e);
for(var i=0;i<rows.length;i++){
var row=rows[i];
var _733=_730?row[opts.idField]:$(_72e).datagrid("getRowIndex",row[opts.idField]);
if(_734(_72f.selectedRows,row)){
_6c9(_72e,_733,true,true);
}
if(_734(_72f.checkedRows,row)){
_6c6(_72e,_733,true);
}
}
opts.onSelect=_731;
opts.onCheck=_732;
}
function _734(a,r){
for(var i=0;i<a.length;i++){
if(a[i][opts.idField]==r[opts.idField]){
a[i]=r;
return true;
}
}
return false;
};
};
function _735(_736,row){
var _737=$.data(_736,"datagrid");
var opts=_737.options;
var rows=_737.data.rows;
if(typeof row=="object"){
return _646(rows,row);
}else{
for(var i=0;i<rows.length;i++){
if(rows[i][opts.idField]==row){
return i;
}
}
return -1;
}
};
function _738(_739){
var _73a=$.data(_739,"datagrid");
var opts=_73a.options;
var data=_73a.data;
if(opts.idField){
return _73a.selectedRows;
}else{
var rows=[];
opts.finder.getTr(_739,"","selected",2).each(function(){
rows.push(opts.finder.getRow(_739,$(this)));
});
return rows;
}
};
function _73b(_73c){
var _73d=$.data(_73c,"datagrid");
var opts=_73d.options;
if(opts.idField){
return _73d.checkedRows;
}else{
var rows=[];
opts.finder.getTr(_73c,"","checked",2).each(function(){
rows.push(opts.finder.getRow(_73c,$(this)));
});
return rows;
}
};
function _73e(_73f,_740){
var _741=$.data(_73f,"datagrid");
var dc=_741.dc;
var opts=_741.options;
var tr=opts.finder.getTr(_73f,_740);
if(tr.length){
if(tr.closest("table").hasClass("datagrid-btable-frozen")){
return;
}
var _742=dc.view2.children("div.datagrid-header")._outerHeight();
var _743=dc.body2;
var _744=opts.scrollbarSize;
if(_743[0].offsetHeight&&_743[0].clientHeight&&_743[0].offsetHeight<=_743[0].clientHeight){
_744=0;
}
var _745=_743.outerHeight(true)-_743.outerHeight();
var top=tr.position().top-_742-_745;
if(top<0){
_743.scrollTop(_743.scrollTop()+top);
}else{
if(top+tr._outerHeight()>_743.height()-_744){
_743.scrollTop(_743.scrollTop()+top+tr._outerHeight()-_743.height()+_744);
}
}
}
};
function _6c2(_746,_747){
var _748=$.data(_746,"datagrid");
var opts=_748.options;
opts.finder.getTr(_746,_748.highlightIndex).removeClass("datagrid-row-over");
opts.finder.getTr(_746,_747).addClass("datagrid-row-over");
_748.highlightIndex=_747;
};
function _6c9(_749,_74a,_74b,_74c){
var _74d=$.data(_749,"datagrid");
var opts=_74d.options;
var row=opts.finder.getRow(_749,_74a);
if(!row){
return;
}
if(opts.onBeforeSelect.apply(_749,_649(_749,[_74a,row]))==false){
return;
}
if(opts.singleSelect){
_74e(_749,true);
_74d.selectedRows=[];
}
if(!_74b&&opts.checkOnSelect){
_6c6(_749,_74a,true);
}
if(opts.idField){
_648(_74d.selectedRows,opts.idField,row);
}
opts.finder.getTr(_749,_74a).addClass("datagrid-row-selected");
opts.onSelect.apply(_749,_649(_749,[_74a,row]));
if(!_74c&&opts.scrollOnSelect){
_73e(_749,_74a);
}
};
function _6ca(_74f,_750,_751){
var _752=$.data(_74f,"datagrid");
var dc=_752.dc;
var opts=_752.options;
var row=opts.finder.getRow(_74f,_750);
if(!row){
return;
}
if(opts.onBeforeUnselect.apply(_74f,_649(_74f,[_750,row]))==false){
return;
}
if(!_751&&opts.checkOnSelect){
_6c7(_74f,_750,true);
}
opts.finder.getTr(_74f,_750).removeClass("datagrid-row-selected");
if(opts.idField){
_647(_752.selectedRows,opts.idField,row[opts.idField]);
}
opts.onUnselect.apply(_74f,_649(_74f,[_750,row]));
};
function _753(_754,_755){
var _756=$.data(_754,"datagrid");
var opts=_756.options;
var rows=opts.finder.getRows(_754);
var _757=$.data(_754,"datagrid").selectedRows;
if(!_755&&opts.checkOnSelect){
_6b4(_754,true);
}
opts.finder.getTr(_754,"","allbody").addClass("datagrid-row-selected");
if(opts.idField){
for(var _758=0;_758<rows.length;_758++){
_648(_757,opts.idField,rows[_758]);
}
}
opts.onSelectAll.call(_754,rows);
};
function _74e(_759,_75a){
var _75b=$.data(_759,"datagrid");
var opts=_75b.options;
var rows=opts.finder.getRows(_759);
var _75c=$.data(_759,"datagrid").selectedRows;
if(!_75a&&opts.checkOnSelect){
_6b5(_759,true);
}
opts.finder.getTr(_759,"","selected").removeClass("datagrid-row-selected");
if(opts.idField){
for(var _75d=0;_75d<rows.length;_75d++){
_647(_75c,opts.idField,rows[_75d][opts.idField]);
}
}
opts.onUnselectAll.call(_759,rows);
};
function _6c6(_75e,_75f,_760){
var _761=$.data(_75e,"datagrid");
var opts=_761.options;
var row=opts.finder.getRow(_75e,_75f);
if(!row){
return;
}
if(opts.onBeforeCheck.apply(_75e,_649(_75e,[_75f,row]))==false){
return;
}
if(opts.singleSelect&&opts.selectOnCheck){
_6b5(_75e,true);
_761.checkedRows=[];
}
if(!_760&&opts.selectOnCheck){
_6c9(_75e,_75f,true);
}
var tr=opts.finder.getTr(_75e,_75f).addClass("datagrid-row-checked");
tr.find("div.datagrid-cell-check input[type=checkbox]")._propAttr("checked",true);
tr=opts.finder.getTr(_75e,"","checked",2);
if(tr.length==opts.finder.getRows(_75e).length){
var dc=_761.dc;
dc.header1.add(dc.header2).find("input[type=checkbox]")._propAttr("checked",true);
}
if(opts.idField){
_648(_761.checkedRows,opts.idField,row);
}
opts.onCheck.apply(_75e,_649(_75e,[_75f,row]));
};
function _6c7(_762,_763,_764){
var _765=$.data(_762,"datagrid");
var opts=_765.options;
var row=opts.finder.getRow(_762,_763);
if(!row){
return;
}
if(opts.onBeforeUncheck.apply(_762,_649(_762,[_763,row]))==false){
return;
}
if(!_764&&opts.selectOnCheck){
_6ca(_762,_763,true);
}
var tr=opts.finder.getTr(_762,_763).removeClass("datagrid-row-checked");
tr.find("div.datagrid-cell-check input[type=checkbox]")._propAttr("checked",false);
var dc=_765.dc;
var _766=dc.header1.add(dc.header2);
_766.find("input[type=checkbox]")._propAttr("checked",false);
if(opts.idField){
_647(_765.checkedRows,opts.idField,row[opts.idField]);
}
opts.onUncheck.apply(_762,_649(_762,[_763,row]));
};
function _6b4(_767,_768){
var _769=$.data(_767,"datagrid");
var opts=_769.options;
var rows=opts.finder.getRows(_767);
if(!_768&&opts.selectOnCheck){
_753(_767,true);
}
var dc=_769.dc;
var hck=dc.header1.add(dc.header2).find("input[type=checkbox]");
var bck=opts.finder.getTr(_767,"","allbody").addClass("datagrid-row-checked").find("div.datagrid-cell-check input[type=checkbox]");
hck.add(bck)._propAttr("checked",true);
if(opts.idField){
for(var i=0;i<rows.length;i++){
_648(_769.checkedRows,opts.idField,rows[i]);
}
}
opts.onCheckAll.call(_767,rows);
};
function _6b5(_76a,_76b){
var _76c=$.data(_76a,"datagrid");
var opts=_76c.options;
var rows=opts.finder.getRows(_76a);
if(!_76b&&opts.selectOnCheck){
_74e(_76a,true);
}
var dc=_76c.dc;
var hck=dc.header1.add(dc.header2).find("input[type=checkbox]");
var bck=opts.finder.getTr(_76a,"","checked").removeClass("datagrid-row-checked").find("div.datagrid-cell-check input[type=checkbox]");
hck.add(bck)._propAttr("checked",false);
if(opts.idField){
for(var i=0;i<rows.length;i++){
_647(_76c.checkedRows,opts.idField,rows[i][opts.idField]);
}
}
opts.onUncheckAll.call(_76a,rows);
};
function _76d(_76e,_76f){
var opts=$.data(_76e,"datagrid").options;
var tr=opts.finder.getTr(_76e,_76f);
var row=opts.finder.getRow(_76e,_76f);
if(tr.hasClass("datagrid-row-editing")){
return;
}
if(opts.onBeforeEdit.apply(_76e,_649(_76e,[_76f,row]))==false){
return;
}
tr.addClass("datagrid-row-editing");
_770(_76e,_76f);
_710(_76e);
tr.find("div.datagrid-editable").each(function(){
var _771=$(this).parent().attr("field");
var ed=$.data(this,"datagrid.editor");
ed.actions.setValue(ed.target,row[_771]);
});
_772(_76e,_76f);
opts.onBeginEdit.apply(_76e,_649(_76e,[_76f,row]));
};
function _773(_774,_775,_776){
var _777=$.data(_774,"datagrid");
var opts=_777.options;
var _778=_777.updatedRows;
var _779=_777.insertedRows;
var tr=opts.finder.getTr(_774,_775);
var row=opts.finder.getRow(_774,_775);
if(!tr.hasClass("datagrid-row-editing")){
return;
}
if(!_776){
if(!_772(_774,_775)){
return;
}
var _77a=false;
var _77b={};
tr.find("div.datagrid-editable").each(function(){
var _77c=$(this).parent().attr("field");
var ed=$.data(this,"datagrid.editor");
var t=$(ed.target);
var _77d=t.data("textbox")?t.textbox("textbox"):t;
if(_77d.is(":focus")){
_77d.triggerHandler("blur");
}
var _77e=ed.actions.getValue(ed.target);
if(row[_77c]!==_77e){
row[_77c]=_77e;
_77a=true;
_77b[_77c]=_77e;
}
});
if(_77a){
if(_646(_779,row)==-1){
if(_646(_778,row)==-1){
_778.push(row);
}
}
}
opts.onEndEdit.apply(_774,_649(_774,[_775,row,_77b]));
}
tr.removeClass("datagrid-row-editing");
_77f(_774,_775);
$(_774).datagrid("refreshRow",_775);
if(!_776){
opts.onAfterEdit.apply(_774,_649(_774,[_775,row,_77b]));
}else{
opts.onCancelEdit.apply(_774,_649(_774,[_775,row]));
}
};
function _780(_781,_782){
var opts=$.data(_781,"datagrid").options;
var tr=opts.finder.getTr(_781,_782);
var _783=[];
tr.children("td").each(function(){
var cell=$(this).find("div.datagrid-editable");
if(cell.length){
var ed=$.data(cell[0],"datagrid.editor");
_783.push(ed);
}
});
return _783;
};
function _784(_785,_786){
var _787=_780(_785,_786.index!=undefined?_786.index:_786.id);
for(var i=0;i<_787.length;i++){
if(_787[i].field==_786.field){
return _787[i];
}
}
return null;
};
function _770(_788,_789){
var opts=$.data(_788,"datagrid").options;
var tr=opts.finder.getTr(_788,_789);
tr.children("td").each(function(){
var cell=$(this).find("div.datagrid-cell");
var _78a=$(this).attr("field");
var col=_6a3(_788,_78a);
if(col&&col.editor){
var _78b,_78c;
if(typeof col.editor=="string"){
_78b=col.editor;
}else{
_78b=col.editor.type;
_78c=col.editor.options;
}
var _78d=opts.editors[_78b];
if(_78d){
var _78e=cell.html();
var _78f=cell._outerWidth();
cell.addClass("datagrid-editable");
cell._outerWidth(_78f);
cell.html("<table border=\"0\" cellspacing=\"0\" cellpadding=\"1\"><tr><td></td></tr></table>");
cell.children("table").bind("click dblclick contextmenu",function(e){
e.stopPropagation();
});
$.data(cell[0],"datagrid.editor",{actions:_78d,target:_78d.init(cell.find("td"),$.extend({height:opts.editorHeight},_78c)),field:_78a,type:_78b,oldHtml:_78e});
}
}
});
_670(_788,_789,true);
};
function _77f(_790,_791){
var opts=$.data(_790,"datagrid").options;
var tr=opts.finder.getTr(_790,_791);
tr.children("td").each(function(){
var cell=$(this).find("div.datagrid-editable");
if(cell.length){
var ed=$.data(cell[0],"datagrid.editor");
if(ed.actions.destroy){
ed.actions.destroy(ed.target);
}
cell.html(ed.oldHtml);
$.removeData(cell[0],"datagrid.editor");
cell.removeClass("datagrid-editable");
cell.css("width","");
}
});
};
function _772(_792,_793){
var tr=$.data(_792,"datagrid").options.finder.getTr(_792,_793);
if(!tr.hasClass("datagrid-row-editing")){
return true;
}
var vbox=tr.find(".validatebox-text");
vbox.validatebox("validate");
vbox.trigger("mouseleave");
var _794=tr.find(".validatebox-invalid");
return _794.length==0;
};
function _795(_796,_797){
var _798=$.data(_796,"datagrid").insertedRows;
var _799=$.data(_796,"datagrid").deletedRows;
var _79a=$.data(_796,"datagrid").updatedRows;
if(!_797){
var rows=[];
rows=rows.concat(_798);
rows=rows.concat(_799);
rows=rows.concat(_79a);
return rows;
}else{
if(_797=="inserted"){
return _798;
}else{
if(_797=="deleted"){
return _799;
}else{
if(_797=="updated"){
return _79a;
}
}
}
}
return [];
};
function _79b(_79c,_79d){
var _79e=$.data(_79c,"datagrid");
var opts=_79e.options;
var data=_79e.data;
var _79f=_79e.insertedRows;
var _7a0=_79e.deletedRows;
$(_79c).datagrid("cancelEdit",_79d);
var row=opts.finder.getRow(_79c,_79d);
if(_646(_79f,row)>=0){
_647(_79f,row);
}else{
_7a0.push(row);
}
_647(_79e.selectedRows,opts.idField,row[opts.idField]);
_647(_79e.checkedRows,opts.idField,row[opts.idField]);
opts.view.deleteRow.call(opts.view,_79c,_79d);
if(opts.height=="auto"){
_670(_79c);
}
$(_79c).datagrid("getPager").pagination("refresh",{total:data.total});
};
function _7a1(_7a2,_7a3){
var data=$.data(_7a2,"datagrid").data;
var view=$.data(_7a2,"datagrid").options.view;
var _7a4=$.data(_7a2,"datagrid").insertedRows;
view.insertRow.call(view,_7a2,_7a3.index,_7a3.row);
_7a4.push(_7a3.row);
$(_7a2).datagrid("getPager").pagination("refresh",{total:data.total});
};
function _7a5(_7a6,row){
var data=$.data(_7a6,"datagrid").data;
var view=$.data(_7a6,"datagrid").options.view;
var _7a7=$.data(_7a6,"datagrid").insertedRows;
view.insertRow.call(view,_7a6,null,row);
_7a7.push(row);
$(_7a6).datagrid("getPager").pagination("refresh",{total:data.total});
};
function _7a8(_7a9,_7aa){
var _7ab=$.data(_7a9,"datagrid");
var opts=_7ab.options;
var row=opts.finder.getRow(_7a9,_7aa.index);
var _7ac=false;
_7aa.row=_7aa.row||{};
for(var _7ad in _7aa.row){
if(row[_7ad]!==_7aa.row[_7ad]){
_7ac=true;
break;
}
}
if(_7ac){
if(_646(_7ab.insertedRows,row)==-1){
if(_646(_7ab.updatedRows,row)==-1){
_7ab.updatedRows.push(row);
}
}
opts.view.updateRow.call(opts.view,_7a9,_7aa.index,_7aa.row);
}
};
function _7ae(_7af){
var _7b0=$.data(_7af,"datagrid");
var data=_7b0.data;
var rows=data.rows;
var _7b1=[];
for(var i=0;i<rows.length;i++){
_7b1.push($.extend({},rows[i]));
}
_7b0.originalRows=_7b1;
_7b0.updatedRows=[];
_7b0.insertedRows=[];
_7b0.deletedRows=[];
};
function _7b2(_7b3){
var data=$.data(_7b3,"datagrid").data;
var ok=true;
for(var i=0,len=data.rows.length;i<len;i++){
if(_772(_7b3,i)){
$(_7b3).datagrid("endEdit",i);
}else{
ok=false;
}
}
if(ok){
_7ae(_7b3);
}
};
function _7b4(_7b5){
var _7b6=$.data(_7b5,"datagrid");
var opts=_7b6.options;
var _7b7=_7b6.originalRows;
var _7b8=_7b6.insertedRows;
var _7b9=_7b6.deletedRows;
var _7ba=_7b6.selectedRows;
var _7bb=_7b6.checkedRows;
var data=_7b6.data;
function _7bc(a){
var ids=[];
for(var i=0;i<a.length;i++){
ids.push(a[i][opts.idField]);
}
return ids;
};
function _7bd(ids,_7be){
for(var i=0;i<ids.length;i++){
var _7bf=_735(_7b5,ids[i]);
if(_7bf>=0){
(_7be=="s"?_6c9:_6c6)(_7b5,_7bf,true);
}
}
};
for(var i=0;i<data.rows.length;i++){
$(_7b5).datagrid("cancelEdit",i);
}
var _7c0=_7bc(_7ba);
var _7c1=_7bc(_7bb);
_7ba.splice(0,_7ba.length);
_7bb.splice(0,_7bb.length);
data.total+=_7b9.length-_7b8.length;
data.rows=_7b7;
_6e0(_7b5,data);
_7bd(_7c0,"s");
_7bd(_7c1,"c");
_7ae(_7b5);
};
function _6df(_7c2,_7c3,cb){
var opts=$.data(_7c2,"datagrid").options;
if(_7c3){
opts.queryParams=_7c3;
}
var _7c4=$.extend({},opts.queryParams);
if(opts.pagination){
$.extend(_7c4,{page:opts.pageNumber||1,rows:opts.pageSize});
}
if(opts.sortName){
$.extend(_7c4,{sort:opts.sortName,order:opts.sortOrder});
}
if(opts.onBeforeLoad.call(_7c2,_7c4)==false){
return;
}
$(_7c2).datagrid("loading");
var _7c5=opts.loader.call(_7c2,_7c4,function(data){
$(_7c2).datagrid("loaded");
$(_7c2).datagrid("loadData",data);
if(cb){
cb();
}
},function(){
$(_7c2).datagrid("loaded");
opts.onLoadError.apply(_7c2,arguments);
});
if(_7c5==false){
$(_7c2).datagrid("loaded");
}
};
function _7c6(_7c7,_7c8){
var opts=$.data(_7c7,"datagrid").options;
_7c8.type=_7c8.type||"body";
_7c8.rowspan=_7c8.rowspan||1;
_7c8.colspan=_7c8.colspan||1;
if(_7c8.rowspan==1&&_7c8.colspan==1){
return;
}
var tr=opts.finder.getTr(_7c7,(_7c8.index!=undefined?_7c8.index:_7c8.id),_7c8.type);
if(!tr.length){
return;
}
var td=tr.find("td[field=\""+_7c8.field+"\"]");
td.attr("rowspan",_7c8.rowspan).attr("colspan",_7c8.colspan);
td.addClass("datagrid-td-merged");
_7c9(td.next(),_7c8.colspan-1);
for(var i=1;i<_7c8.rowspan;i++){
tr=tr.next();
if(!tr.length){
break;
}
_7c9(tr.find("td[field=\""+_7c8.field+"\"]"),_7c8.colspan);
}
_70f(_7c7,td);
function _7c9(td,_7ca){
for(var i=0;i<_7ca;i++){
td.hide();
td=td.next();
}
};
};
$.fn.datagrid=function(_7cb,_7cc){
if(typeof _7cb=="string"){
return $.fn.datagrid.methods[_7cb](this,_7cc);
}
_7cb=_7cb||{};
return this.each(function(){
var _7cd=$.data(this,"datagrid");
var opts;
if(_7cd){
opts=$.extend(_7cd.options,_7cb);
_7cd.options=opts;
}else{
opts=$.extend({},$.extend({},$.fn.datagrid.defaults,{queryParams:{}}),$.fn.datagrid.parseOptions(this),_7cb);
$(this).css("width","").css("height","");
var _7ce=_684(this,opts.rownumbers);
if(!opts.columns){
opts.columns=_7ce.columns;
}
if(!opts.frozenColumns){
opts.frozenColumns=_7ce.frozenColumns;
}
opts.columns=$.extend(true,[],opts.columns);
opts.frozenColumns=$.extend(true,[],opts.frozenColumns);
opts.view=$.extend({},opts.view);
$.data(this,"datagrid",{options:opts,panel:_7ce.panel,dc:_7ce.dc,ss:null,selectedRows:[],checkedRows:[],data:{total:0,rows:[]},originalRows:[],updatedRows:[],insertedRows:[],deletedRows:[]});
}
_68d(this);
_6a4(this);
_65a(this);
if(opts.data){
$(this).datagrid("loadData",opts.data);
}else{
var data=$.fn.datagrid.parseData(this);
if(data.total>0){
$(this).datagrid("loadData",data);
}else{
opts.view.setEmptyMsg(this);
$(this).datagrid("autoSizeColumn");
}
}
_6df(this);
});
};
function _7cf(_7d0){
var _7d1={};
$.map(_7d0,function(name){
_7d1[name]=_7d2(name);
});
return _7d1;
function _7d2(name){
function isA(_7d3){
return $.data($(_7d3)[0],name)!=undefined;
};
return {init:function(_7d4,_7d5){
var _7d6=$("<input type=\"text\" class=\"datagrid-editable-input\">").appendTo(_7d4);
if(_7d6[name]&&name!="text"){
return _7d6[name](_7d5);
}else{
return _7d6;
}
},destroy:function(_7d7){
if(isA(_7d7,name)){
$(_7d7)[name]("destroy");
}
},getValue:function(_7d8){
if(isA(_7d8,name)){
var opts=$(_7d8)[name]("options");
if(opts.multiple){
return $(_7d8)[name]("getValues").join(opts.separator);
}else{
return $(_7d8)[name]("getValue");
}
}else{
return $(_7d8).val();
}
},setValue:function(_7d9,_7da){
if(isA(_7d9,name)){
var opts=$(_7d9)[name]("options");
if(opts.multiple){
if(_7da){
$(_7d9)[name]("setValues",_7da.split(opts.separator));
}else{
$(_7d9)[name]("clear");
}
}else{
$(_7d9)[name]("setValue",_7da);
}
}else{
$(_7d9).val(_7da);
}
},resize:function(_7db,_7dc){
if(isA(_7db,name)){
$(_7db)[name]("resize",_7dc);
}else{
$(_7db)._size({width:_7dc,height:$.fn.datagrid.defaults.editorHeight});
}
}};
};
};
var _7dd=$.extend({},_7cf(["text","textbox","passwordbox","filebox","numberbox","numberspinner","combobox","combotree","combogrid","combotreegrid","datebox","datetimebox","timespinner","datetimespinner"]),{textarea:{init:function(_7de,_7df){
var _7e0=$("<textarea class=\"datagrid-editable-input\"></textarea>").appendTo(_7de);
_7e0.css("vertical-align","middle")._outerHeight(_7df.height);
return _7e0;
},getValue:function(_7e1){
return $(_7e1).val();
},setValue:function(_7e2,_7e3){
$(_7e2).val(_7e3);
},resize:function(_7e4,_7e5){
$(_7e4)._outerWidth(_7e5);
}},checkbox:{init:function(_7e6,_7e7){
var _7e8=$("<input type=\"checkbox\">").appendTo(_7e6);
_7e8.val(_7e7.on);
_7e8.attr("offval",_7e7.off);
return _7e8;
},getValue:function(_7e9){
if($(_7e9).is(":checked")){
return $(_7e9).val();
}else{
return $(_7e9).attr("offval");
}
},setValue:function(_7ea,_7eb){
var _7ec=false;
if($(_7ea).val()==_7eb){
_7ec=true;
}
$(_7ea)._propAttr("checked",_7ec);
}},validatebox:{init:function(_7ed,_7ee){
var _7ef=$("<input type=\"text\" class=\"datagrid-editable-input\">").appendTo(_7ed);
_7ef.validatebox(_7ee);
return _7ef;
},destroy:function(_7f0){
$(_7f0).validatebox("destroy");
},getValue:function(_7f1){
return $(_7f1).val();
},setValue:function(_7f2,_7f3){
$(_7f2).val(_7f3);
},resize:function(_7f4,_7f5){
$(_7f4)._outerWidth(_7f5)._outerHeight($.fn.datagrid.defaults.editorHeight);
}}});
$.fn.datagrid.methods={options:function(jq){
var _7f6=$.data(jq[0],"datagrid").options;
var _7f7=$.data(jq[0],"datagrid").panel.panel("options");
var opts=$.extend(_7f6,{width:_7f7.width,height:_7f7.height,closed:_7f7.closed,collapsed:_7f7.collapsed,minimized:_7f7.minimized,maximized:_7f7.maximized});
return opts;
},setSelectionState:function(jq){
return jq.each(function(){
_72d(this);
});
},createStyleSheet:function(jq){
return _64b(jq[0]);
},getPanel:function(jq){
return $.data(jq[0],"datagrid").panel;
},getPager:function(jq){
return $.data(jq[0],"datagrid").panel.children("div.datagrid-pager");
},getColumnFields:function(jq,_7f8){
return _6a2(jq[0],_7f8);
},getColumnOption:function(jq,_7f9){
return _6a3(jq[0],_7f9);
},resize:function(jq,_7fa){
return jq.each(function(){
_65a(this,_7fa);
});
},load:function(jq,_7fb){
return jq.each(function(){
var opts=$(this).datagrid("options");
if(typeof _7fb=="string"){
opts.url=_7fb;
_7fb=null;
}
opts.pageNumber=1;
var _7fc=$(this).datagrid("getPager");
_7fc.pagination("refresh",{pageNumber:1});
_6df(this,_7fb);
});
},reload:function(jq,_7fd){
return jq.each(function(){
var opts=$(this).datagrid("options");
if(typeof _7fd=="string"){
opts.url=_7fd;
_7fd=null;
}
_6df(this,_7fd);
});
},reloadFooter:function(jq,_7fe){
return jq.each(function(){
var opts=$.data(this,"datagrid").options;
var dc=$.data(this,"datagrid").dc;
if(_7fe){
$.data(this,"datagrid").footer=_7fe;
}
if(opts.showFooter){
opts.view.renderFooter.call(opts.view,this,dc.footer2,false);
opts.view.renderFooter.call(opts.view,this,dc.footer1,true);
if(opts.view.onAfterRender){
opts.view.onAfterRender.call(opts.view,this);
}
$(this).datagrid("fixRowHeight");
}
});
},loading:function(jq){
return jq.each(function(){
var opts=$.data(this,"datagrid").options;
$(this).datagrid("getPager").pagination("loading");
if(opts.loadMsg){
var _7ff=$(this).datagrid("getPanel");
if(!_7ff.children("div.datagrid-mask").length){
$("<div class=\"datagrid-mask\" style=\"display:block\"></div>").appendTo(_7ff);
var msg=$("<div class=\"datagrid-mask-msg\" style=\"display:block;left:50%\"></div>").html(opts.loadMsg).appendTo(_7ff);
msg._outerHeight(40);
msg.css({marginLeft:(-msg.outerWidth()/2),lineHeight:(msg.height()+"px")});
}
}
});
},loaded:function(jq){
return jq.each(function(){
$(this).datagrid("getPager").pagination("loaded");
var _800=$(this).datagrid("getPanel");
_800.children("div.datagrid-mask-msg").remove();
_800.children("div.datagrid-mask").remove();
});
},fitColumns:function(jq){
return jq.each(function(){
_6ec(this);
});
},fixColumnSize:function(jq,_801){
return jq.each(function(){
_70a(this,_801);
});
},fixRowHeight:function(jq,_802){
return jq.each(function(){
_670(this,_802);
});
},freezeRow:function(jq,_803){
return jq.each(function(){
_67d(this,_803);
});
},autoSizeColumn:function(jq,_804){
return jq.each(function(){
_6fe(this,_804);
});
},loadData:function(jq,data){
return jq.each(function(){
_6e0(this,data);
_7ae(this);
});
},getData:function(jq){
return $.data(jq[0],"datagrid").data;
},getRows:function(jq){
return $.data(jq[0],"datagrid").data.rows;
},getFooterRows:function(jq){
return $.data(jq[0],"datagrid").footer;
},getRowIndex:function(jq,id){
return _735(jq[0],id);
},getChecked:function(jq){
return _73b(jq[0]);
},getSelected:function(jq){
var rows=_738(jq[0]);
return rows.length>0?rows[0]:null;
},getSelections:function(jq){
return _738(jq[0]);
},clearSelections:function(jq){
return jq.each(function(){
var _805=$.data(this,"datagrid");
var _806=_805.selectedRows;
var _807=_805.checkedRows;
_806.splice(0,_806.length);
_74e(this);
if(_805.options.checkOnSelect){
_807.splice(0,_807.length);
}
});
},clearChecked:function(jq){
return jq.each(function(){
var _808=$.data(this,"datagrid");
var _809=_808.selectedRows;
var _80a=_808.checkedRows;
_80a.splice(0,_80a.length);
_6b5(this);
if(_808.options.selectOnCheck){
_809.splice(0,_809.length);
}
});
},scrollTo:function(jq,_80b){
return jq.each(function(){
_73e(this,_80b);
});
},highlightRow:function(jq,_80c){
return jq.each(function(){
_6c2(this,_80c);
_73e(this,_80c);
});
},selectAll:function(jq){
return jq.each(function(){
_753(this);
});
},unselectAll:function(jq){
return jq.each(function(){
_74e(this);
});
},selectRow:function(jq,_80d){
return jq.each(function(){
_6c9(this,_80d);
});
},selectRecord:function(jq,id){
return jq.each(function(){
var opts=$.data(this,"datagrid").options;
if(opts.idField){
var _80e=_735(this,id);
if(_80e>=0){
$(this).datagrid("selectRow",_80e);
}
}
});
},unselectRow:function(jq,_80f){
return jq.each(function(){
_6ca(this,_80f);
});
},checkRow:function(jq,_810){
return jq.each(function(){
_6c6(this,_810);
});
},uncheckRow:function(jq,_811){
return jq.each(function(){
_6c7(this,_811);
});
},checkAll:function(jq){
return jq.each(function(){
_6b4(this);
});
},uncheckAll:function(jq){
return jq.each(function(){
_6b5(this);
});
},beginEdit:function(jq,_812){
return jq.each(function(){
_76d(this,_812);
});
},endEdit:function(jq,_813){
return jq.each(function(){
_773(this,_813,false);
});
},cancelEdit:function(jq,_814){
return jq.each(function(){
_773(this,_814,true);
});
},getEditors:function(jq,_815){
return _780(jq[0],_815);
},getEditor:function(jq,_816){
return _784(jq[0],_816);
},refreshRow:function(jq,_817){
return jq.each(function(){
var opts=$.data(this,"datagrid").options;
opts.view.refreshRow.call(opts.view,this,_817);
});
},validateRow:function(jq,_818){
return _772(jq[0],_818);
},updateRow:function(jq,_819){
return jq.each(function(){
_7a8(this,_819);
});
},appendRow:function(jq,row){
return jq.each(function(){
_7a5(this,row);
});
},insertRow:function(jq,_81a){
return jq.each(function(){
_7a1(this,_81a);
});
},deleteRow:function(jq,_81b){
return jq.each(function(){
_79b(this,_81b);
});
},getChanges:function(jq,_81c){
return _795(jq[0],_81c);
},acceptChanges:function(jq){
return jq.each(function(){
_7b2(this);
});
},rejectChanges:function(jq){
return jq.each(function(){
_7b4(this);
});
},mergeCells:function(jq,_81d){
return jq.each(function(){
_7c6(this,_81d);
});
},showColumn:function(jq,_81e){
return jq.each(function(){
var col=$(this).datagrid("getColumnOption",_81e);
if(col.hidden){
col.hidden=false;
$(this).datagrid("getPanel").find("td[field=\""+_81e+"\"]").show();
_6e1(this,_81e,1);
$(this).datagrid("fitColumns");
}
});
},hideColumn:function(jq,_81f){
return jq.each(function(){
var col=$(this).datagrid("getColumnOption",_81f);
if(!col.hidden){
col.hidden=true;
$(this).datagrid("getPanel").find("td[field=\""+_81f+"\"]").hide();
_6e1(this,_81f,-1);
$(this).datagrid("fitColumns");
}
});
},sort:function(jq,_820){
return jq.each(function(){
_6b6(this,_820);
});
},gotoPage:function(jq,_821){
return jq.each(function(){
var _822=this;
var page,cb;
if(typeof _821=="object"){
page=_821.page;
cb=_821.callback;
}else{
page=_821;
}
$(_822).datagrid("options").pageNumber=page;
$(_822).datagrid("getPager").pagination("refresh",{pageNumber:page});
_6df(_822,null,function(){
if(cb){
cb.call(_822,page);
}
});
});
}};
$.fn.datagrid.parseOptions=function(_823){
var t=$(_823);
return $.extend({},$.fn.panel.parseOptions(_823),$.parser.parseOptions(_823,["url","toolbar","idField","sortName","sortOrder","pagePosition","resizeHandle",{sharedStyleSheet:"boolean",fitColumns:"boolean",autoRowHeight:"boolean",striped:"boolean",nowrap:"boolean"},{rownumbers:"boolean",singleSelect:"boolean",ctrlSelect:"boolean",checkOnSelect:"boolean",selectOnCheck:"boolean"},{pagination:"boolean",pageSize:"number",pageNumber:"number"},{multiSort:"boolean",remoteSort:"boolean",showHeader:"boolean",showFooter:"boolean"},{scrollbarSize:"number",scrollOnSelect:"boolean"}]),{pageList:(t.attr("pageList")?eval(t.attr("pageList")):undefined),loadMsg:(t.attr("loadMsg")!=undefined?t.attr("loadMsg"):undefined),rowStyler:(t.attr("rowStyler")?eval(t.attr("rowStyler")):undefined)});
};
$.fn.datagrid.parseData=function(_824){
var t=$(_824);
var data={total:0,rows:[]};
var _825=t.datagrid("getColumnFields",true).concat(t.datagrid("getColumnFields",false));
t.find("tbody tr").each(function(){
data.total++;
var row={};
$.extend(row,$.parser.parseOptions(this,["iconCls","state"]));
for(var i=0;i<_825.length;i++){
row[_825[i]]=$(this).find("td:eq("+i+")").html();
}
data.rows.push(row);
});
return data;
};
var _826={render:function(_827,_828,_829){
var rows=$(_827).datagrid("getRows");
$(_828).html(this.renderTable(_827,0,rows,_829));
},renderFooter:function(_82a,_82b,_82c){
var opts=$.data(_82a,"datagrid").options;
var rows=$.data(_82a,"datagrid").footer||[];
var _82d=$(_82a).datagrid("getColumnFields",_82c);
var _82e=["<table class=\"datagrid-ftable\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><tbody>"];
for(var i=0;i<rows.length;i++){
_82e.push("<tr class=\"datagrid-row\" datagrid-row-index=\""+i+"\">");
_82e.push(this.renderRow.call(this,_82a,_82d,_82c,i,rows[i]));
_82e.push("</tr>");
}
_82e.push("</tbody></table>");
$(_82b).html(_82e.join(""));
},renderTable:function(_82f,_830,rows,_831){
var _832=$.data(_82f,"datagrid");
var opts=_832.options;
if(_831){
if(!(opts.rownumbers||(opts.frozenColumns&&opts.frozenColumns.length))){
return "";
}
}
var _833=$(_82f).datagrid("getColumnFields",_831);
var _834=["<table class=\"datagrid-btable\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><tbody>"];
for(var i=0;i<rows.length;i++){
var row=rows[i];
var css=opts.rowStyler?opts.rowStyler.call(_82f,_830,row):"";
var cs=this.getStyleValue(css);
var cls="class=\"datagrid-row "+(_830%2&&opts.striped?"datagrid-row-alt ":" ")+cs.c+"\"";
var _835=cs.s?"style=\""+cs.s+"\"":"";
var _836=_832.rowIdPrefix+"-"+(_831?1:2)+"-"+_830;
_834.push("<tr id=\""+_836+"\" datagrid-row-index=\""+_830+"\" "+cls+" "+_835+">");
_834.push(this.renderRow.call(this,_82f,_833,_831,_830,row));
_834.push("</tr>");
_830++;
}
_834.push("</tbody></table>");
return _834.join("");
},renderRow:function(_837,_838,_839,_83a,_83b){
var opts=$.data(_837,"datagrid").options;
var cc=[];
if(_839&&opts.rownumbers){
var _83c=_83a+1;
if(opts.pagination){
_83c+=(opts.pageNumber-1)*opts.pageSize;
}
cc.push("<td class=\"datagrid-td-rownumber\"><div class=\"datagrid-cell-rownumber\">"+_83c+"</div></td>");
}
for(var i=0;i<_838.length;i++){
var _83d=_838[i];
var col=$(_837).datagrid("getColumnOption",_83d);
if(col){
var _83e=_83b[_83d];
var css=col.styler?(col.styler.call(_837,_83e,_83b,_83a)||""):"";
var cs=this.getStyleValue(css);
var cls=cs.c?"class=\""+cs.c+"\"":"";
var _83f=col.hidden?"style=\"display:none;"+cs.s+"\"":(cs.s?"style=\""+cs.s+"\"":"");
cc.push("<td field=\""+_83d+"\" "+cls+" "+_83f+">");
var _83f="";
if(!col.checkbox){
if(col.align){
_83f+="text-align:"+col.align+";";
}
if(!opts.nowrap){
_83f+="white-space:normal;height:auto;";
}else{
if(opts.autoRowHeight){
_83f+="height:auto;";
}
}
}
cc.push("<div style=\""+_83f+"\" ");
cc.push(col.checkbox?"class=\"datagrid-cell-check\"":"class=\"datagrid-cell "+col.cellClass+"\"");
cc.push(">");
if(col.checkbox){
cc.push("<input type=\"checkbox\" "+(_83b.checked?"checked=\"checked\"":""));
cc.push(" name=\""+_83d+"\" value=\""+(_83e!=undefined?_83e:"")+"\">");
}else{
if(col.formatter){
cc.push(col.formatter(_83e,_83b,_83a));
}else{
cc.push(_83e);
}
}
cc.push("</div>");
cc.push("</td>");
}
}
return cc.join("");
},getStyleValue:function(css){
var _840="";
var _841="";
if(typeof css=="string"){
_841=css;
}else{
if(css){
_840=css["class"]||"";
_841=css["style"]||"";
}
}
return {c:_840,s:_841};
},refreshRow:function(_842,_843){
this.updateRow.call(this,_842,_843,{});
},updateRow:function(_844,_845,row){
var opts=$.data(_844,"datagrid").options;
var _846=opts.finder.getRow(_844,_845);
$.extend(_846,row);
var cs=_847.call(this,_845);
var _848=cs.s;
var cls="datagrid-row "+(_845%2&&opts.striped?"datagrid-row-alt ":" ")+cs.c;
function _847(_849){
var css=opts.rowStyler?opts.rowStyler.call(_844,_849,_846):"";
return this.getStyleValue(css);
};
function _84a(_84b){
var tr=opts.finder.getTr(_844,_845,"body",(_84b?1:2));
if(!tr.length){
return;
}
var _84c=$(_844).datagrid("getColumnFields",_84b);
var _84d=tr.find("div.datagrid-cell-check input[type=checkbox]").is(":checked");
tr.html(this.renderRow.call(this,_844,_84c,_84b,_845,_846));
var _84e=(tr.hasClass("datagrid-row-checked")?" datagrid-row-checked":"")+(tr.hasClass("datagrid-row-selected")?" datagrid-row-selected":"");
tr.attr("style",_848).attr("class",cls+_84e);
if(_84d){
tr.find("div.datagrid-cell-check input[type=checkbox]")._propAttr("checked",true);
}
};
_84a.call(this,true);
_84a.call(this,false);
$(_844).datagrid("fixRowHeight",_845);
},insertRow:function(_84f,_850,row){
var _851=$.data(_84f,"datagrid");
var opts=_851.options;
var dc=_851.dc;
var data=_851.data;
if(_850==undefined||_850==null){
_850=data.rows.length;
}
if(_850>data.rows.length){
_850=data.rows.length;
}
function _852(_853){
var _854=_853?1:2;
for(var i=data.rows.length-1;i>=_850;i--){
var tr=opts.finder.getTr(_84f,i,"body",_854);
tr.attr("datagrid-row-index",i+1);
tr.attr("id",_851.rowIdPrefix+"-"+_854+"-"+(i+1));
if(_853&&opts.rownumbers){
var _855=i+2;
if(opts.pagination){
_855+=(opts.pageNumber-1)*opts.pageSize;
}
tr.find("div.datagrid-cell-rownumber").html(_855);
}
if(opts.striped){
tr.removeClass("datagrid-row-alt").addClass((i+1)%2?"datagrid-row-alt":"");
}
}
};
function _856(_857){
var _858=_857?1:2;
var _859=$(_84f).datagrid("getColumnFields",_857);
var _85a=_851.rowIdPrefix+"-"+_858+"-"+_850;
var tr="<tr id=\""+_85a+"\" class=\"datagrid-row\" datagrid-row-index=\""+_850+"\"></tr>";
if(_850>=data.rows.length){
if(data.rows.length){
opts.finder.getTr(_84f,"","last",_858).after(tr);
}else{
var cc=_857?dc.body1:dc.body2;
cc.html("<table class=\"datagrid-btable\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><tbody>"+tr+"</tbody></table>");
}
}else{
opts.finder.getTr(_84f,_850+1,"body",_858).before(tr);
}
};
_852.call(this,true);
_852.call(this,false);
_856.call(this,true);
_856.call(this,false);
data.total+=1;
data.rows.splice(_850,0,row);
this.setEmptyMsg(_84f);
this.refreshRow.call(this,_84f,_850);
},deleteRow:function(_85b,_85c){
var _85d=$.data(_85b,"datagrid");
var opts=_85d.options;
var data=_85d.data;
function _85e(_85f){
var _860=_85f?1:2;
for(var i=_85c+1;i<data.rows.length;i++){
var tr=opts.finder.getTr(_85b,i,"body",_860);
tr.attr("datagrid-row-index",i-1);
tr.attr("id",_85d.rowIdPrefix+"-"+_860+"-"+(i-1));
if(_85f&&opts.rownumbers){
var _861=i;
if(opts.pagination){
_861+=(opts.pageNumber-1)*opts.pageSize;
}
tr.find("div.datagrid-cell-rownumber").html(_861);
}
if(opts.striped){
tr.removeClass("datagrid-row-alt").addClass((i-1)%2?"datagrid-row-alt":"");
}
}
};
opts.finder.getTr(_85b,_85c).remove();
_85e.call(this,true);
_85e.call(this,false);
data.total-=1;
data.rows.splice(_85c,1);
this.setEmptyMsg(_85b);
},onBeforeRender:function(_862,rows){
},onAfterRender:function(_863){
var _864=$.data(_863,"datagrid");
var opts=_864.options;
if(opts.showFooter){
var _865=$(_863).datagrid("getPanel").find("div.datagrid-footer");
_865.find("div.datagrid-cell-rownumber,div.datagrid-cell-check").css("visibility","hidden");
}
this.setEmptyMsg(_863);
},setEmptyMsg:function(_866){
var _867=$.data(_866,"datagrid");
var opts=_867.options;
var _868=opts.finder.getRows(_866).length==0;
if(_868){
this.renderEmptyRow(_866);
}
if(opts.emptyMsg){
_867.dc.view.children(".datagrid-empty").remove();
if(_868){
var h=_867.dc.header2.parent().outerHeight();
var d=$("<div class=\"datagrid-empty\"></div>").appendTo(_867.dc.view);
d.html(opts.emptyMsg).css("top",h+"px");
}
}
},renderEmptyRow:function(_869){
var cols=$.map($(_869).datagrid("getColumnFields"),function(_86a){
return $(_869).datagrid("getColumnOption",_86a);
});
$.map(cols,function(col){
col.formatter1=col.formatter;
col.styler1=col.styler;
col.formatter=col.styler=undefined;
});
var _86b=$.data(_869,"datagrid").dc.body2;
_86b.html(this.renderTable(_869,0,[{}],false));
_86b.find("tbody *").css({height:1,borderColor:"transparent",background:"transparent"});
var tr=_86b.find(".datagrid-row");
tr.removeClass("datagrid-row").removeAttr("datagrid-row-index");
tr.find(".datagrid-cell,.datagrid-cell-check").empty();
$.map(cols,function(col){
col.formatter=col.formatter1;
col.styler=col.styler1;
col.formatter1=col.styler1=undefined;
});
}};
$.fn.datagrid.defaults=$.extend({},$.fn.panel.defaults,{sharedStyleSheet:false,frozenColumns:undefined,columns:undefined,fitColumns:false,resizeHandle:"right",autoRowHeight:true,toolbar:null,striped:false,method:"post",nowrap:true,idField:null,url:null,data:null,loadMsg:"Processing, please wait ...",emptyMsg:"",rownumbers:false,singleSelect:false,ctrlSelect:false,selectOnCheck:true,checkOnSelect:true,pagination:false,pagePosition:"bottom",pageNumber:1,pageSize:10,pageList:[10,20,30,40,50],queryParams:{},sortName:null,sortOrder:"asc",multiSort:false,remoteSort:true,showHeader:true,showFooter:false,scrollOnSelect:true,scrollbarSize:18,rownumberWidth:30,editorHeight:24,headerEvents:{mouseover:_6ae(true),mouseout:_6ae(false),click:_6b2,dblclick:_6b7,contextmenu:_6ba},rowEvents:{mouseover:_6bc(true),mouseout:_6bc(false),click:_6c3,dblclick:_6cd,contextmenu:_6d1},rowStyler:function(_86c,_86d){
},loader:function(_86e,_86f,_870){
var opts=$(this).datagrid("options");
if(!opts.url){
return false;
}
$.ajax({type:opts.method,url:opts.url,data:_86e,dataType:"json",success:function(data){
_86f(data);
},error:function(){
_870.apply(this,arguments);
}});
},loadFilter:function(data){
return data;
},editors:_7dd,finder:{getTr:function(_871,_872,type,_873){
type=type||"body";
_873=_873||0;
var _874=$.data(_871,"datagrid");
var dc=_874.dc;
var opts=_874.options;
if(_873==0){
var tr1=opts.finder.getTr(_871,_872,type,1);
var tr2=opts.finder.getTr(_871,_872,type,2);
return tr1.add(tr2);
}else{
if(type=="body"){
var tr=$("#"+_874.rowIdPrefix+"-"+_873+"-"+_872);
if(!tr.length){
tr=(_873==1?dc.body1:dc.body2).find(">table>tbody>tr[datagrid-row-index="+_872+"]");
}
return tr;
}else{
if(type=="footer"){
return (_873==1?dc.footer1:dc.footer2).find(">table>tbody>tr[datagrid-row-index="+_872+"]");
}else{
if(type=="selected"){
return (_873==1?dc.body1:dc.body2).find(">table>tbody>tr.datagrid-row-selected");
}else{
if(type=="highlight"){
return (_873==1?dc.body1:dc.body2).find(">table>tbody>tr.datagrid-row-over");
}else{
if(type=="checked"){
return (_873==1?dc.body1:dc.body2).find(">table>tbody>tr.datagrid-row-checked");
}else{
if(type=="editing"){
return (_873==1?dc.body1:dc.body2).find(">table>tbody>tr.datagrid-row-editing");
}else{
if(type=="last"){
return (_873==1?dc.body1:dc.body2).find(">table>tbody>tr[datagrid-row-index]:last");
}else{
if(type=="allbody"){
return (_873==1?dc.body1:dc.body2).find(">table>tbody>tr[datagrid-row-index]");
}else{
if(type=="allfooter"){
return (_873==1?dc.footer1:dc.footer2).find(">table>tbody>tr[datagrid-row-index]");
}
}
}
}
}
}
}
}
}
}
},getRow:function(_875,p){
var _876=(typeof p=="object")?p.attr("datagrid-row-index"):p;
return $.data(_875,"datagrid").data.rows[parseInt(_876)];
},getRows:function(_877){
return $(_877).datagrid("getRows");
}},view:_826,onBeforeLoad:function(_878){
},onLoadSuccess:function(){
},onLoadError:function(){
},onClickRow:function(_879,_87a){
},onDblClickRow:function(_87b,_87c){
},onClickCell:function(_87d,_87e,_87f){
},onDblClickCell:function(_880,_881,_882){
},onBeforeSortColumn:function(sort,_883){
},onSortColumn:function(sort,_884){
},onResizeColumn:function(_885,_886){
},onBeforeSelect:function(_887,_888){
},onSelect:function(_889,_88a){
},onBeforeUnselect:function(_88b,_88c){
},onUnselect:function(_88d,_88e){
},onSelectAll:function(rows){
},onUnselectAll:function(rows){
},onBeforeCheck:function(_88f,_890){
},onCheck:function(_891,_892){
},onBeforeUncheck:function(_893,_894){
},onUncheck:function(_895,_896){
},onCheckAll:function(rows){
},onUncheckAll:function(rows){
},onBeforeEdit:function(_897,_898){
},onBeginEdit:function(_899,_89a){
},onEndEdit:function(_89b,_89c,_89d){
},onAfterEdit:function(_89e,_89f,_8a0){
},onCancelEdit:function(_8a1,_8a2){
},onHeaderContextMenu:function(e,_8a3){
},onRowContextMenu:function(e,_8a4,_8a5){
}});
})(jQuery);
(function($){
var _8a6;
$(document).unbind(".propertygrid").bind("mousedown.propertygrid",function(e){
var p=$(e.target).closest("div.datagrid-view,div.combo-panel");
if(p.length){
return;
}
_8a7(_8a6);
_8a6=undefined;
});
function _8a8(_8a9){
var _8aa=$.data(_8a9,"propertygrid");
var opts=$.data(_8a9,"propertygrid").options;
$(_8a9).datagrid($.extend({},opts,{cls:"propertygrid",view:(opts.showGroup?opts.groupView:opts.view),onBeforeEdit:function(_8ab,row){
if(opts.onBeforeEdit.call(_8a9,_8ab,row)==false){
return false;
}
var dg=$(this);
var row=dg.datagrid("getRows")[_8ab];
var col=dg.datagrid("getColumnOption","value");
col.editor=row.editor;
},onClickCell:function(_8ac,_8ad,_8ae){
if(_8a6!=this){
_8a7(_8a6);
_8a6=this;
}
if(opts.editIndex!=_8ac){
_8a7(_8a6);
$(this).datagrid("beginEdit",_8ac);
var ed=$(this).datagrid("getEditor",{index:_8ac,field:_8ad});
if(!ed){
ed=$(this).datagrid("getEditor",{index:_8ac,field:"value"});
}
if(ed){
var t=$(ed.target);
var _8af=t.data("textbox")?t.textbox("textbox"):t;
_8af.focus();
opts.editIndex=_8ac;
}
}
opts.onClickCell.call(_8a9,_8ac,_8ad,_8ae);
},loadFilter:function(data){
_8a7(this);
return opts.loadFilter.call(this,data);
}}));
};
function _8a7(_8b0){
var t=$(_8b0);
if(!t.length){
return;
}
var opts=$.data(_8b0,"propertygrid").options;
opts.finder.getTr(_8b0,null,"editing").each(function(){
var _8b1=parseInt($(this).attr("datagrid-row-index"));
if(t.datagrid("validateRow",_8b1)){
t.datagrid("endEdit",_8b1);
}else{
t.datagrid("cancelEdit",_8b1);
}
});
opts.editIndex=undefined;
};
$.fn.propertygrid=function(_8b2,_8b3){
if(typeof _8b2=="string"){
var _8b4=$.fn.propertygrid.methods[_8b2];
if(_8b4){
return _8b4(this,_8b3);
}else{
return this.datagrid(_8b2,_8b3);
}
}
_8b2=_8b2||{};
return this.each(function(){
var _8b5=$.data(this,"propertygrid");
if(_8b5){
$.extend(_8b5.options,_8b2);
}else{
var opts=$.extend({},$.fn.propertygrid.defaults,$.fn.propertygrid.parseOptions(this),_8b2);
opts.frozenColumns=$.extend(true,[],opts.frozenColumns);
opts.columns=$.extend(true,[],opts.columns);
$.data(this,"propertygrid",{options:opts});
}
_8a8(this);
});
};
$.fn.propertygrid.methods={options:function(jq){
return $.data(jq[0],"propertygrid").options;
}};
$.fn.propertygrid.parseOptions=function(_8b6){
return $.extend({},$.fn.datagrid.parseOptions(_8b6),$.parser.parseOptions(_8b6,[{showGroup:"boolean"}]));
};
var _8b7=$.extend({},$.fn.datagrid.defaults.view,{render:function(_8b8,_8b9,_8ba){
var _8bb=[];
var _8bc=this.groups;
for(var i=0;i<_8bc.length;i++){
_8bb.push(this.renderGroup.call(this,_8b8,i,_8bc[i],_8ba));
}
$(_8b9).html(_8bb.join(""));
},renderGroup:function(_8bd,_8be,_8bf,_8c0){
var _8c1=$.data(_8bd,"datagrid");
var opts=_8c1.options;
var _8c2=$(_8bd).datagrid("getColumnFields",_8c0);
var _8c3=[];
_8c3.push("<div class=\"datagrid-group\" group-index="+_8be+">");
if((_8c0&&(opts.rownumbers||opts.frozenColumns.length))||(!_8c0&&!(opts.rownumbers||opts.frozenColumns.length))){
_8c3.push("<span class=\"datagrid-group-expander\">");
_8c3.push("<span class=\"datagrid-row-expander datagrid-row-collapse\">&nbsp;</span>");
_8c3.push("</span>");
}
if(!_8c0){
_8c3.push("<span class=\"datagrid-group-title\">");
_8c3.push(opts.groupFormatter.call(_8bd,_8bf.value,_8bf.rows));
_8c3.push("</span>");
}
_8c3.push("</div>");
_8c3.push("<table class=\"datagrid-btable\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><tbody>");
var _8c4=_8bf.startIndex;
for(var j=0;j<_8bf.rows.length;j++){
var css=opts.rowStyler?opts.rowStyler.call(_8bd,_8c4,_8bf.rows[j]):"";
var _8c5="";
var _8c6="";
if(typeof css=="string"){
_8c6=css;
}else{
if(css){
_8c5=css["class"]||"";
_8c6=css["style"]||"";
}
}
var cls="class=\"datagrid-row "+(_8c4%2&&opts.striped?"datagrid-row-alt ":" ")+_8c5+"\"";
var _8c7=_8c6?"style=\""+_8c6+"\"":"";
var _8c8=_8c1.rowIdPrefix+"-"+(_8c0?1:2)+"-"+_8c4;
_8c3.push("<tr id=\""+_8c8+"\" datagrid-row-index=\""+_8c4+"\" "+cls+" "+_8c7+">");
_8c3.push(this.renderRow.call(this,_8bd,_8c2,_8c0,_8c4,_8bf.rows[j]));
_8c3.push("</tr>");
_8c4++;
}
_8c3.push("</tbody></table>");
return _8c3.join("");
},bindEvents:function(_8c9){
var _8ca=$.data(_8c9,"datagrid");
var dc=_8ca.dc;
var body=dc.body1.add(dc.body2);
var _8cb=($.data(body[0],"events")||$._data(body[0],"events")).click[0].handler;
body.unbind("click").bind("click",function(e){
var tt=$(e.target);
var _8cc=tt.closest("span.datagrid-row-expander");
if(_8cc.length){
var _8cd=_8cc.closest("div.datagrid-group").attr("group-index");
if(_8cc.hasClass("datagrid-row-collapse")){
$(_8c9).datagrid("collapseGroup",_8cd);
}else{
$(_8c9).datagrid("expandGroup",_8cd);
}
}else{
_8cb(e);
}
e.stopPropagation();
});
},onBeforeRender:function(_8ce,rows){
var _8cf=$.data(_8ce,"datagrid");
var opts=_8cf.options;
_8d0();
var _8d1=[];
for(var i=0;i<rows.length;i++){
var row=rows[i];
var _8d2=_8d3(row[opts.groupField]);
if(!_8d2){
_8d2={value:row[opts.groupField],rows:[row]};
_8d1.push(_8d2);
}else{
_8d2.rows.push(row);
}
}
var _8d4=0;
var _8d5=[];
for(var i=0;i<_8d1.length;i++){
var _8d2=_8d1[i];
_8d2.startIndex=_8d4;
_8d4+=_8d2.rows.length;
_8d5=_8d5.concat(_8d2.rows);
}
_8cf.data.rows=_8d5;
this.groups=_8d1;
var that=this;
setTimeout(function(){
that.bindEvents(_8ce);
},0);
function _8d3(_8d6){
for(var i=0;i<_8d1.length;i++){
var _8d7=_8d1[i];
if(_8d7.value==_8d6){
return _8d7;
}
}
return null;
};
function _8d0(){
if(!$("#datagrid-group-style").length){
$("head").append("<style id=\"datagrid-group-style\">"+".datagrid-group{height:"+opts.groupHeight+"px;overflow:hidden;font-weight:bold;border-bottom:1px solid #ccc;}"+".datagrid-group-title,.datagrid-group-expander{display:inline-block;vertical-align:bottom;height:100%;line-height:"+opts.groupHeight+"px;padding:0 4px;}"+".datagrid-group-expander{width:"+opts.expanderWidth+"px;text-align:center;padding:0}"+".datagrid-row-expander{margin:"+Math.floor((opts.groupHeight-16)/2)+"px 0;display:inline-block;width:16px;height:16px;cursor:pointer}"+"</style>");
}
};
}});
$.extend($.fn.datagrid.methods,{groups:function(jq){
return jq.datagrid("options").view.groups;
},expandGroup:function(jq,_8d8){
return jq.each(function(){
var view=$.data(this,"datagrid").dc.view;
var _8d9=view.find(_8d8!=undefined?"div.datagrid-group[group-index=\""+_8d8+"\"]":"div.datagrid-group");
var _8da=_8d9.find("span.datagrid-row-expander");
if(_8da.hasClass("datagrid-row-expand")){
_8da.removeClass("datagrid-row-expand").addClass("datagrid-row-collapse");
_8d9.next("table").show();
}
$(this).datagrid("fixRowHeight");
});
},collapseGroup:function(jq,_8db){
return jq.each(function(){
var view=$.data(this,"datagrid").dc.view;
var _8dc=view.find(_8db!=undefined?"div.datagrid-group[group-index=\""+_8db+"\"]":"div.datagrid-group");
var _8dd=_8dc.find("span.datagrid-row-expander");
if(_8dd.hasClass("datagrid-row-collapse")){
_8dd.removeClass("datagrid-row-collapse").addClass("datagrid-row-expand");
_8dc.next("table").hide();
}
$(this).datagrid("fixRowHeight");
});
}});
$.extend(_8b7,{refreshGroupTitle:function(_8de,_8df){
var _8e0=$.data(_8de,"datagrid");
var opts=_8e0.options;
var dc=_8e0.dc;
var _8e1=this.groups[_8df];
var span=dc.body2.children("div.datagrid-group[group-index="+_8df+"]").find("span.datagrid-group-title");
span.html(opts.groupFormatter.call(_8de,_8e1.value,_8e1.rows));
},insertRow:function(_8e2,_8e3,row){
var _8e4=$.data(_8e2,"datagrid");
var opts=_8e4.options;
var dc=_8e4.dc;
var _8e5=null;
var _8e6;
if(!_8e4.data.rows.length){
$(_8e2).datagrid("loadData",[row]);
return;
}
for(var i=0;i<this.groups.length;i++){
if(this.groups[i].value==row[opts.groupField]){
_8e5=this.groups[i];
_8e6=i;
break;
}
}
if(_8e5){
if(_8e3==undefined||_8e3==null){
_8e3=_8e4.data.rows.length;
}
if(_8e3<_8e5.startIndex){
_8e3=_8e5.startIndex;
}else{
if(_8e3>_8e5.startIndex+_8e5.rows.length){
_8e3=_8e5.startIndex+_8e5.rows.length;
}
}
$.fn.datagrid.defaults.view.insertRow.call(this,_8e2,_8e3,row);
if(_8e3>=_8e5.startIndex+_8e5.rows.length){
_8e7(_8e3,true);
_8e7(_8e3,false);
}
_8e5.rows.splice(_8e3-_8e5.startIndex,0,row);
}else{
_8e5={value:row[opts.groupField],rows:[row],startIndex:_8e4.data.rows.length};
_8e6=this.groups.length;
dc.body1.append(this.renderGroup.call(this,_8e2,_8e6,_8e5,true));
dc.body2.append(this.renderGroup.call(this,_8e2,_8e6,_8e5,false));
this.groups.push(_8e5);
_8e4.data.rows.push(row);
}
this.refreshGroupTitle(_8e2,_8e6);
function _8e7(_8e8,_8e9){
var _8ea=_8e9?1:2;
var _8eb=opts.finder.getTr(_8e2,_8e8-1,"body",_8ea);
var tr=opts.finder.getTr(_8e2,_8e8,"body",_8ea);
tr.insertAfter(_8eb);
};
},updateRow:function(_8ec,_8ed,row){
var opts=$.data(_8ec,"datagrid").options;
$.fn.datagrid.defaults.view.updateRow.call(this,_8ec,_8ed,row);
var tb=opts.finder.getTr(_8ec,_8ed,"body",2).closest("table.datagrid-btable");
var _8ee=parseInt(tb.prev().attr("group-index"));
this.refreshGroupTitle(_8ec,_8ee);
},deleteRow:function(_8ef,_8f0){
var _8f1=$.data(_8ef,"datagrid");
var opts=_8f1.options;
var dc=_8f1.dc;
var body=dc.body1.add(dc.body2);
var tb=opts.finder.getTr(_8ef,_8f0,"body",2).closest("table.datagrid-btable");
var _8f2=parseInt(tb.prev().attr("group-index"));
$.fn.datagrid.defaults.view.deleteRow.call(this,_8ef,_8f0);
var _8f3=this.groups[_8f2];
if(_8f3.rows.length>1){
_8f3.rows.splice(_8f0-_8f3.startIndex,1);
this.refreshGroupTitle(_8ef,_8f2);
}else{
body.children("div.datagrid-group[group-index="+_8f2+"]").remove();
for(var i=_8f2+1;i<this.groups.length;i++){
body.children("div.datagrid-group[group-index="+i+"]").attr("group-index",i-1);
}
this.groups.splice(_8f2,1);
}
var _8f0=0;
for(var i=0;i<this.groups.length;i++){
var _8f3=this.groups[i];
_8f3.startIndex=_8f0;
_8f0+=_8f3.rows.length;
}
}});
$.fn.propertygrid.defaults=$.extend({},$.fn.datagrid.defaults,{groupHeight:21,expanderWidth:16,singleSelect:true,remoteSort:false,fitColumns:true,loadMsg:"",frozenColumns:[[{field:"f",width:16,resizable:false}]],columns:[[{field:"name",title:"Name",width:100,sortable:true},{field:"value",title:"Value",width:100,resizable:false}]],showGroup:false,groupView:_8b7,groupField:"group",groupFormatter:function(_8f4,rows){
return _8f4;
}});
})(jQuery);
(function($){
function _8f5(_8f6){
var _8f7=$.data(_8f6,"treegrid");
var opts=_8f7.options;
$(_8f6).datagrid($.extend({},opts,{url:null,data:null,loader:function(){
return false;
},onBeforeLoad:function(){
return false;
},onLoadSuccess:function(){
},onResizeColumn:function(_8f8,_8f9){
_906(_8f6);
opts.onResizeColumn.call(_8f6,_8f8,_8f9);
},onBeforeSortColumn:function(sort,_8fa){
if(opts.onBeforeSortColumn.call(_8f6,sort,_8fa)==false){
return false;
}
},onSortColumn:function(sort,_8fb){
opts.sortName=sort;
opts.sortOrder=_8fb;
if(opts.remoteSort){
_905(_8f6);
}else{
var data=$(_8f6).treegrid("getData");
_934(_8f6,null,data);
}
opts.onSortColumn.call(_8f6,sort,_8fb);
},onClickCell:function(_8fc,_8fd){
opts.onClickCell.call(_8f6,_8fd,find(_8f6,_8fc));
},onDblClickCell:function(_8fe,_8ff){
opts.onDblClickCell.call(_8f6,_8ff,find(_8f6,_8fe));
},onRowContextMenu:function(e,_900){
opts.onContextMenu.call(_8f6,e,find(_8f6,_900));
}}));
var _901=$.data(_8f6,"datagrid").options;
opts.columns=_901.columns;
opts.frozenColumns=_901.frozenColumns;
_8f7.dc=$.data(_8f6,"datagrid").dc;
if(opts.pagination){
var _902=$(_8f6).datagrid("getPager");
_902.pagination({pageNumber:opts.pageNumber,pageSize:opts.pageSize,pageList:opts.pageList,onSelectPage:function(_903,_904){
opts.pageNumber=_903;
opts.pageSize=_904;
_905(_8f6);
}});
opts.pageSize=_902.pagination("options").pageSize;
}
};
function _906(_907,_908){
var opts=$.data(_907,"datagrid").options;
var dc=$.data(_907,"datagrid").dc;
if(!dc.body1.is(":empty")&&(!opts.nowrap||opts.autoRowHeight)){
if(_908!=undefined){
var _909=_90a(_907,_908);
for(var i=0;i<_909.length;i++){
_90b(_909[i][opts.idField]);
}
}
}
$(_907).datagrid("fixRowHeight",_908);
function _90b(_90c){
var tr1=opts.finder.getTr(_907,_90c,"body",1);
var tr2=opts.finder.getTr(_907,_90c,"body",2);
tr1.css("height","");
tr2.css("height","");
var _90d=Math.max(tr1.height(),tr2.height());
tr1.css("height",_90d);
tr2.css("height",_90d);
};
};
function _90e(_90f){
var dc=$.data(_90f,"datagrid").dc;
var opts=$.data(_90f,"treegrid").options;
if(!opts.rownumbers){
return;
}
dc.body1.find("div.datagrid-cell-rownumber").each(function(i){
$(this).html(i+1);
});
};
function _910(_911){
return function(e){
$.fn.datagrid.defaults.rowEvents[_911?"mouseover":"mouseout"](e);
var tt=$(e.target);
var fn=_911?"addClass":"removeClass";
if(tt.hasClass("tree-hit")){
tt.hasClass("tree-expanded")?tt[fn]("tree-expanded-hover"):tt[fn]("tree-collapsed-hover");
}
};
};
function _912(e){
var tt=$(e.target);
var tr=tt.closest("tr.datagrid-row");
if(!tr.length||!tr.parent().length){
return;
}
var _913=tr.attr("node-id");
var _914=_915(tr);
if(tt.hasClass("tree-hit")){
_916(_914,_913);
}else{
if(tt.hasClass("tree-checkbox")){
_917(_914,_913);
}else{
var opts=$(_914).datagrid("options");
if(!tt.parent().hasClass("datagrid-cell-check")&&!opts.singleSelect&&e.shiftKey){
var rows=$(_914).treegrid("getChildren");
var idx1=$.easyui.indexOfArray(rows,opts.idField,opts.lastSelectedIndex);
var idx2=$.easyui.indexOfArray(rows,opts.idField,_913);
var from=Math.min(Math.max(idx1,0),idx2);
var to=Math.max(idx1,idx2);
var row=rows[idx2];
var td=tt.closest("td[field]",tr);
if(td.length){
var _918=td.attr("field");
opts.onClickCell.call(_914,_913,_918,row[_918]);
}
$(_914).treegrid("clearSelections");
for(var i=from;i<=to;i++){
$(_914).treegrid("selectRow",rows[i][opts.idField]);
}
opts.onClickRow.call(_914,row);
}else{
$.fn.datagrid.defaults.rowEvents.click(e);
}
}
}
};
function _915(t){
return $(t).closest("div.datagrid-view").children(".datagrid-f")[0];
};
function _917(_919,_91a,_91b,_91c){
var _91d=$.data(_919,"treegrid");
var _91e=_91d.checkedRows;
var opts=_91d.options;
if(!opts.checkbox){
return;
}
var row=find(_919,_91a);
if(!row.checkState){
return;
}
var tr=opts.finder.getTr(_919,_91a);
var ck=tr.find(".tree-checkbox");
if(_91b==undefined){
if(ck.hasClass("tree-checkbox1")){
_91b=false;
}else{
if(ck.hasClass("tree-checkbox0")){
_91b=true;
}else{
if(row._checked==undefined){
row._checked=ck.hasClass("tree-checkbox1");
}
_91b=!row._checked;
}
}
}
row._checked=_91b;
if(_91b){
if(ck.hasClass("tree-checkbox1")){
return;
}
}else{
if(ck.hasClass("tree-checkbox0")){
return;
}
}
if(!_91c){
if(opts.onBeforeCheckNode.call(_919,row,_91b)==false){
return;
}
}
if(opts.cascadeCheck){
_91f(_919,row,_91b);
_920(_919,row);
}else{
_921(_919,row,_91b?"1":"0");
}
if(!_91c){
opts.onCheckNode.call(_919,row,_91b);
}
};
function _921(_922,row,flag){
var _923=$.data(_922,"treegrid");
var _924=_923.checkedRows;
var opts=_923.options;
if(!row.checkState||flag==undefined){
return;
}
var tr=opts.finder.getTr(_922,row[opts.idField]);
var ck=tr.find(".tree-checkbox");
if(!ck.length){
return;
}
row.checkState=["unchecked","checked","indeterminate"][flag];
row.checked=(row.checkState=="checked");
ck.removeClass("tree-checkbox0 tree-checkbox1 tree-checkbox2");
ck.addClass("tree-checkbox"+flag);
if(flag==0){
$.easyui.removeArrayItem(_924,opts.idField,row[opts.idField]);
}else{
$.easyui.addArrayItem(_924,opts.idField,row);
}
};
function _91f(_925,row,_926){
var flag=_926?1:0;
_921(_925,row,flag);
$.easyui.forEach(row.children||[],true,function(r){
_921(_925,r,flag);
});
};
function _920(_927,row){
var opts=$.data(_927,"treegrid").options;
var prow=_928(_927,row[opts.idField]);
if(prow){
_921(_927,prow,_929(prow));
_920(_927,prow);
}
};
function _929(row){
var len=0;
var c0=0;
var c1=0;
$.easyui.forEach(row.children||[],false,function(r){
if(r.checkState){
len++;
if(r.checkState=="checked"){
c1++;
}else{
if(r.checkState=="unchecked"){
c0++;
}
}
}
});
if(len==0){
return undefined;
}
var flag=0;
if(c0==len){
flag=0;
}else{
if(c1==len){
flag=1;
}else{
flag=2;
}
}
return flag;
};
function _92a(_92b,_92c){
var opts=$.data(_92b,"treegrid").options;
if(!opts.checkbox){
return;
}
var row=find(_92b,_92c);
var tr=opts.finder.getTr(_92b,_92c);
var ck=tr.find(".tree-checkbox");
if(opts.view.hasCheckbox(_92b,row)){
if(!ck.length){
row.checkState=row.checkState||"unchecked";
$("<span class=\"tree-checkbox\"></span>").insertBefore(tr.find(".tree-title"));
}
if(row.checkState=="checked"){
_917(_92b,_92c,true,true);
}else{
if(row.checkState=="unchecked"){
_917(_92b,_92c,false,true);
}else{
var flag=_929(row);
if(flag===0){
_917(_92b,_92c,false,true);
}else{
if(flag===1){
_917(_92b,_92c,true,true);
}
}
}
}
}else{
ck.remove();
row.checkState=undefined;
row.checked=undefined;
_920(_92b,row);
}
};
function _92d(_92e,_92f){
var opts=$.data(_92e,"treegrid").options;
var tr1=opts.finder.getTr(_92e,_92f,"body",1);
var tr2=opts.finder.getTr(_92e,_92f,"body",2);
var _930=$(_92e).datagrid("getColumnFields",true).length+(opts.rownumbers?1:0);
var _931=$(_92e).datagrid("getColumnFields",false).length;
_932(tr1,_930);
_932(tr2,_931);
function _932(tr,_933){
$("<tr class=\"treegrid-tr-tree\">"+"<td style=\"border:0px\" colspan=\""+_933+"\">"+"<div></div>"+"</td>"+"</tr>").insertAfter(tr);
};
};
function _934(_935,_936,data,_937,_938){
var _939=$.data(_935,"treegrid");
var opts=_939.options;
var dc=_939.dc;
data=opts.loadFilter.call(_935,data,_936);
var node=find(_935,_936);
if(node){
var _93a=opts.finder.getTr(_935,_936,"body",1);
var _93b=opts.finder.getTr(_935,_936,"body",2);
var cc1=_93a.next("tr.treegrid-tr-tree").children("td").children("div");
var cc2=_93b.next("tr.treegrid-tr-tree").children("td").children("div");
if(!_937){
node.children=[];
}
}else{
var cc1=dc.body1;
var cc2=dc.body2;
if(!_937){
_939.data=[];
}
}
if(!_937){
cc1.empty();
cc2.empty();
}
if(opts.view.onBeforeRender){
opts.view.onBeforeRender.call(opts.view,_935,_936,data);
}
opts.view.render.call(opts.view,_935,cc1,true);
opts.view.render.call(opts.view,_935,cc2,false);
if(opts.showFooter){
opts.view.renderFooter.call(opts.view,_935,dc.footer1,true);
opts.view.renderFooter.call(opts.view,_935,dc.footer2,false);
}
if(opts.view.onAfterRender){
opts.view.onAfterRender.call(opts.view,_935);
}
if(!_936&&opts.pagination){
var _93c=$.data(_935,"treegrid").total;
var _93d=$(_935).datagrid("getPager");
if(_93d.pagination("options").total!=_93c){
_93d.pagination({total:_93c});
}
}
_906(_935);
_90e(_935);
$(_935).treegrid("showLines");
$(_935).treegrid("setSelectionState");
$(_935).treegrid("autoSizeColumn");
if(!_938){
opts.onLoadSuccess.call(_935,node,data);
}
};
function _905(_93e,_93f,_940,_941,_942){
var opts=$.data(_93e,"treegrid").options;
var body=$(_93e).datagrid("getPanel").find("div.datagrid-body");
if(_93f==undefined&&opts.queryParams){
opts.queryParams.id=undefined;
}
if(_940){
opts.queryParams=_940;
}
var _943=$.extend({},opts.queryParams);
if(opts.pagination){
$.extend(_943,{page:opts.pageNumber,rows:opts.pageSize});
}
if(opts.sortName){
$.extend(_943,{sort:opts.sortName,order:opts.sortOrder});
}
var row=find(_93e,_93f);
if(opts.onBeforeLoad.call(_93e,row,_943)==false){
return;
}
var _944=body.find("tr[node-id=\""+_93f+"\"] span.tree-folder");
_944.addClass("tree-loading");
$(_93e).treegrid("loading");
var _945=opts.loader.call(_93e,_943,function(data){
_944.removeClass("tree-loading");
$(_93e).treegrid("loaded");
_934(_93e,_93f,data,_941);
if(_942){
_942();
}
},function(){
_944.removeClass("tree-loading");
$(_93e).treegrid("loaded");
opts.onLoadError.apply(_93e,arguments);
if(_942){
_942();
}
});
if(_945==false){
_944.removeClass("tree-loading");
$(_93e).treegrid("loaded");
}
};
function _946(_947){
var _948=_949(_947);
return _948.length?_948[0]:null;
};
function _949(_94a){
return $.data(_94a,"treegrid").data;
};
function _928(_94b,_94c){
var row=find(_94b,_94c);
if(row._parentId){
return find(_94b,row._parentId);
}else{
return null;
}
};
function _90a(_94d,_94e){
var data=$.data(_94d,"treegrid").data;
if(_94e){
var _94f=find(_94d,_94e);
data=_94f?(_94f.children||[]):[];
}
var _950=[];
$.easyui.forEach(data,true,function(node){
_950.push(node);
});
return _950;
};
function _951(_952,_953){
var opts=$.data(_952,"treegrid").options;
var tr=opts.finder.getTr(_952,_953);
var node=tr.children("td[field=\""+opts.treeField+"\"]");
return node.find("span.tree-indent,span.tree-hit").length;
};
function find(_954,_955){
var _956=$.data(_954,"treegrid");
var opts=_956.options;
var _957=null;
$.easyui.forEach(_956.data,true,function(node){
if(node[opts.idField]==_955){
_957=node;
return false;
}
});
return _957;
};
function _958(_959,_95a){
var opts=$.data(_959,"treegrid").options;
var row=find(_959,_95a);
var tr=opts.finder.getTr(_959,_95a);
var hit=tr.find("span.tree-hit");
if(hit.length==0){
return;
}
if(hit.hasClass("tree-collapsed")){
return;
}
if(opts.onBeforeCollapse.call(_959,row)==false){
return;
}
hit.removeClass("tree-expanded tree-expanded-hover").addClass("tree-collapsed");
hit.next().removeClass("tree-folder-open");
row.state="closed";
tr=tr.next("tr.treegrid-tr-tree");
var cc=tr.children("td").children("div");
if(opts.animate){
cc.slideUp("normal",function(){
$(_959).treegrid("autoSizeColumn");
_906(_959,_95a);
opts.onCollapse.call(_959,row);
});
}else{
cc.hide();
$(_959).treegrid("autoSizeColumn");
_906(_959,_95a);
opts.onCollapse.call(_959,row);
}
};
function _95b(_95c,_95d){
var opts=$.data(_95c,"treegrid").options;
var tr=opts.finder.getTr(_95c,_95d);
var hit=tr.find("span.tree-hit");
var row=find(_95c,_95d);
if(hit.length==0){
return;
}
if(hit.hasClass("tree-expanded")){
return;
}
if(opts.onBeforeExpand.call(_95c,row)==false){
return;
}
hit.removeClass("tree-collapsed tree-collapsed-hover").addClass("tree-expanded");
hit.next().addClass("tree-folder-open");
var _95e=tr.next("tr.treegrid-tr-tree");
if(_95e.length){
var cc=_95e.children("td").children("div");
_95f(cc);
}else{
_92d(_95c,row[opts.idField]);
var _95e=tr.next("tr.treegrid-tr-tree");
var cc=_95e.children("td").children("div");
cc.hide();
var _960=$.extend({},opts.queryParams||{});
_960.id=row[opts.idField];
_905(_95c,row[opts.idField],_960,true,function(){
if(cc.is(":empty")){
_95e.remove();
}else{
_95f(cc);
}
});
}
function _95f(cc){
row.state="open";
if(opts.animate){
cc.slideDown("normal",function(){
$(_95c).treegrid("autoSizeColumn");
_906(_95c,_95d);
opts.onExpand.call(_95c,row);
});
}else{
cc.show();
$(_95c).treegrid("autoSizeColumn");
_906(_95c,_95d);
opts.onExpand.call(_95c,row);
}
};
};
function _916(_961,_962){
var opts=$.data(_961,"treegrid").options;
var tr=opts.finder.getTr(_961,_962);
var hit=tr.find("span.tree-hit");
if(hit.hasClass("tree-expanded")){
_958(_961,_962);
}else{
_95b(_961,_962);
}
};
function _963(_964,_965){
var opts=$.data(_964,"treegrid").options;
var _966=_90a(_964,_965);
if(_965){
_966.unshift(find(_964,_965));
}
for(var i=0;i<_966.length;i++){
_958(_964,_966[i][opts.idField]);
}
};
function _967(_968,_969){
var opts=$.data(_968,"treegrid").options;
var _96a=_90a(_968,_969);
if(_969){
_96a.unshift(find(_968,_969));
}
for(var i=0;i<_96a.length;i++){
_95b(_968,_96a[i][opts.idField]);
}
};
function _96b(_96c,_96d){
var opts=$.data(_96c,"treegrid").options;
var ids=[];
var p=_928(_96c,_96d);
while(p){
var id=p[opts.idField];
ids.unshift(id);
p=_928(_96c,id);
}
for(var i=0;i<ids.length;i++){
_95b(_96c,ids[i]);
}
};
function _96e(_96f,_970){
var _971=$.data(_96f,"treegrid");
var opts=_971.options;
if(_970.parent){
var tr=opts.finder.getTr(_96f,_970.parent);
if(tr.next("tr.treegrid-tr-tree").length==0){
_92d(_96f,_970.parent);
}
var cell=tr.children("td[field=\""+opts.treeField+"\"]").children("div.datagrid-cell");
var _972=cell.children("span.tree-icon");
if(_972.hasClass("tree-file")){
_972.removeClass("tree-file").addClass("tree-folder tree-folder-open");
var hit=$("<span class=\"tree-hit tree-expanded\"></span>").insertBefore(_972);
if(hit.prev().length){
hit.prev().remove();
}
}
}
_934(_96f,_970.parent,_970.data,_971.data.length>0,true);
};
function _973(_974,_975){
var ref=_975.before||_975.after;
var opts=$.data(_974,"treegrid").options;
var _976=_928(_974,ref);
_96e(_974,{parent:(_976?_976[opts.idField]:null),data:[_975.data]});
var _977=_976?_976.children:$(_974).treegrid("getRoots");
for(var i=0;i<_977.length;i++){
if(_977[i][opts.idField]==ref){
var _978=_977[_977.length-1];
_977.splice(_975.before?i:(i+1),0,_978);
_977.splice(_977.length-1,1);
break;
}
}
_979(true);
_979(false);
_90e(_974);
$(_974).treegrid("showLines");
function _979(_97a){
var _97b=_97a?1:2;
var tr=opts.finder.getTr(_974,_975.data[opts.idField],"body",_97b);
var _97c=tr.closest("table.datagrid-btable");
tr=tr.parent().children();
var dest=opts.finder.getTr(_974,ref,"body",_97b);
if(_975.before){
tr.insertBefore(dest);
}else{
var sub=dest.next("tr.treegrid-tr-tree");
tr.insertAfter(sub.length?sub:dest);
}
_97c.remove();
};
};
function _97d(_97e,_97f){
var _980=$.data(_97e,"treegrid");
var opts=_980.options;
var prow=_928(_97e,_97f);
$(_97e).datagrid("deleteRow",_97f);
$.easyui.removeArrayItem(_980.checkedRows,opts.idField,_97f);
_90e(_97e);
if(prow){
_92a(_97e,prow[opts.idField]);
}
_980.total-=1;
$(_97e).datagrid("getPager").pagination("refresh",{total:_980.total});
$(_97e).treegrid("showLines");
};
function _981(_982){
var t=$(_982);
var opts=t.treegrid("options");
if(opts.lines){
t.treegrid("getPanel").addClass("tree-lines");
}else{
t.treegrid("getPanel").removeClass("tree-lines");
return;
}
t.treegrid("getPanel").find("span.tree-indent").removeClass("tree-line tree-join tree-joinbottom");
t.treegrid("getPanel").find("div.datagrid-cell").removeClass("tree-node-last tree-root-first tree-root-one");
var _983=t.treegrid("getRoots");
if(_983.length>1){
_984(_983[0]).addClass("tree-root-first");
}else{
if(_983.length==1){
_984(_983[0]).addClass("tree-root-one");
}
}
_985(_983);
_986(_983);
function _985(_987){
$.map(_987,function(node){
if(node.children&&node.children.length){
_985(node.children);
}else{
var cell=_984(node);
cell.find(".tree-icon").prev().addClass("tree-join");
}
});
if(_987.length){
var cell=_984(_987[_987.length-1]);
cell.addClass("tree-node-last");
cell.find(".tree-join").removeClass("tree-join").addClass("tree-joinbottom");
}
};
function _986(_988){
$.map(_988,function(node){
if(node.children&&node.children.length){
_986(node.children);
}
});
for(var i=0;i<_988.length-1;i++){
var node=_988[i];
var _989=t.treegrid("getLevel",node[opts.idField]);
var tr=opts.finder.getTr(_982,node[opts.idField]);
var cc=tr.next().find("tr.datagrid-row td[field=\""+opts.treeField+"\"] div.datagrid-cell");
cc.find("span:eq("+(_989-1)+")").addClass("tree-line");
}
};
function _984(node){
var tr=opts.finder.getTr(_982,node[opts.idField]);
var cell=tr.find("td[field=\""+opts.treeField+"\"] div.datagrid-cell");
return cell;
};
};
$.fn.treegrid=function(_98a,_98b){
if(typeof _98a=="string"){
var _98c=$.fn.treegrid.methods[_98a];
if(_98c){
return _98c(this,_98b);
}else{
return this.datagrid(_98a,_98b);
}
}
_98a=_98a||{};
return this.each(function(){
var _98d=$.data(this,"treegrid");
if(_98d){
$.extend(_98d.options,_98a);
}else{
_98d=$.data(this,"treegrid",{options:$.extend({},$.fn.treegrid.defaults,$.fn.treegrid.parseOptions(this),_98a),data:[],checkedRows:[],tmpIds:[]});
}
_8f5(this);
if(_98d.options.data){
$(this).treegrid("loadData",_98d.options.data);
}
_905(this);
});
};
$.fn.treegrid.methods={options:function(jq){
return $.data(jq[0],"treegrid").options;
},resize:function(jq,_98e){
return jq.each(function(){
$(this).datagrid("resize",_98e);
});
},fixRowHeight:function(jq,_98f){
return jq.each(function(){
_906(this,_98f);
});
},loadData:function(jq,data){
return jq.each(function(){
_934(this,data.parent,data);
});
},load:function(jq,_990){
return jq.each(function(){
$(this).treegrid("options").pageNumber=1;
$(this).treegrid("getPager").pagination({pageNumber:1});
$(this).treegrid("reload",_990);
});
},reload:function(jq,id){
return jq.each(function(){
var opts=$(this).treegrid("options");
var _991={};
if(typeof id=="object"){
_991=id;
}else{
_991=$.extend({},opts.queryParams);
_991.id=id;
}
if(_991.id){
var node=$(this).treegrid("find",_991.id);
if(node.children){
node.children.splice(0,node.children.length);
}
opts.queryParams=_991;
var tr=opts.finder.getTr(this,_991.id);
tr.next("tr.treegrid-tr-tree").remove();
tr.find("span.tree-hit").removeClass("tree-expanded tree-expanded-hover").addClass("tree-collapsed");
_95b(this,_991.id);
}else{
_905(this,null,_991);
}
});
},reloadFooter:function(jq,_992){
return jq.each(function(){
var opts=$.data(this,"treegrid").options;
var dc=$.data(this,"datagrid").dc;
if(_992){
$.data(this,"treegrid").footer=_992;
}
if(opts.showFooter){
opts.view.renderFooter.call(opts.view,this,dc.footer1,true);
opts.view.renderFooter.call(opts.view,this,dc.footer2,false);
if(opts.view.onAfterRender){
opts.view.onAfterRender.call(opts.view,this);
}
$(this).treegrid("fixRowHeight");
}
});
},getData:function(jq){
return $.data(jq[0],"treegrid").data;
},getFooterRows:function(jq){
return $.data(jq[0],"treegrid").footer;
},getRoot:function(jq){
return _946(jq[0]);
},getRoots:function(jq){
return _949(jq[0]);
},getParent:function(jq,id){
return _928(jq[0],id);
},getChildren:function(jq,id){
return _90a(jq[0],id);
},getLevel:function(jq,id){
return _951(jq[0],id);
},find:function(jq,id){
return find(jq[0],id);
},isLeaf:function(jq,id){
var opts=$.data(jq[0],"treegrid").options;
var tr=opts.finder.getTr(jq[0],id);
var hit=tr.find("span.tree-hit");
return hit.length==0;
},select:function(jq,id){
return jq.each(function(){
$(this).datagrid("selectRow",id);
});
},unselect:function(jq,id){
return jq.each(function(){
$(this).datagrid("unselectRow",id);
});
},collapse:function(jq,id){
return jq.each(function(){
_958(this,id);
});
},expand:function(jq,id){
return jq.each(function(){
_95b(this,id);
});
},toggle:function(jq,id){
return jq.each(function(){
_916(this,id);
});
},collapseAll:function(jq,id){
return jq.each(function(){
_963(this,id);
});
},expandAll:function(jq,id){
return jq.each(function(){
_967(this,id);
});
},expandTo:function(jq,id){
return jq.each(function(){
_96b(this,id);
});
},append:function(jq,_993){
return jq.each(function(){
_96e(this,_993);
});
},insert:function(jq,_994){
return jq.each(function(){
_973(this,_994);
});
},remove:function(jq,id){
return jq.each(function(){
_97d(this,id);
});
},pop:function(jq,id){
var row=jq.treegrid("find",id);
jq.treegrid("remove",id);
return row;
},refresh:function(jq,id){
return jq.each(function(){
var opts=$.data(this,"treegrid").options;
opts.view.refreshRow.call(opts.view,this,id);
});
},update:function(jq,_995){
return jq.each(function(){
var opts=$.data(this,"treegrid").options;
var row=_995.row;
opts.view.updateRow.call(opts.view,this,_995.id,row);
if(row.checked!=undefined){
row=find(this,_995.id);
$.extend(row,{checkState:row.checked?"checked":(row.checked===false?"unchecked":undefined)});
_92a(this,_995.id);
}
});
},beginEdit:function(jq,id){
return jq.each(function(){
$(this).datagrid("beginEdit",id);
$(this).treegrid("fixRowHeight",id);
});
},endEdit:function(jq,id){
return jq.each(function(){
$(this).datagrid("endEdit",id);
});
},cancelEdit:function(jq,id){
return jq.each(function(){
$(this).datagrid("cancelEdit",id);
});
},showLines:function(jq){
return jq.each(function(){
_981(this);
});
},setSelectionState:function(jq){
return jq.each(function(){
$(this).datagrid("setSelectionState");
var _996=$(this).data("treegrid");
for(var i=0;i<_996.tmpIds.length;i++){
_917(this,_996.tmpIds[i],true,true);
}
_996.tmpIds=[];
});
},getCheckedNodes:function(jq,_997){
_997=_997||"checked";
var rows=[];
$.easyui.forEach(jq.data("treegrid").checkedRows,false,function(row){
if(row.checkState==_997){
rows.push(row);
}
});
return rows;
},checkNode:function(jq,id){
return jq.each(function(){
_917(this,id,true);
});
},uncheckNode:function(jq,id){
return jq.each(function(){
_917(this,id,false);
});
},clearChecked:function(jq){
return jq.each(function(){
var _998=this;
var opts=$(_998).treegrid("options");
$(_998).datagrid("clearChecked");
$.map($(_998).treegrid("getCheckedNodes"),function(row){
_917(_998,row[opts.idField],false,true);
});
});
}};
$.fn.treegrid.parseOptions=function(_999){
return $.extend({},$.fn.datagrid.parseOptions(_999),$.parser.parseOptions(_999,["treeField",{checkbox:"boolean",cascadeCheck:"boolean",onlyLeafCheck:"boolean"},{animate:"boolean"}]));
};
var _99a=$.extend({},$.fn.datagrid.defaults.view,{render:function(_99b,_99c,_99d){
var opts=$.data(_99b,"treegrid").options;
var _99e=$(_99b).datagrid("getColumnFields",_99d);
var _99f=$.data(_99b,"datagrid").rowIdPrefix;
if(_99d){
if(!(opts.rownumbers||(opts.frozenColumns&&opts.frozenColumns.length))){
return;
}
}
var view=this;
if(this.treeNodes&&this.treeNodes.length){
var _9a0=_9a1.call(this,_99d,this.treeLevel,this.treeNodes);
$(_99c).append(_9a0.join(""));
}
function _9a1(_9a2,_9a3,_9a4){
var _9a5=$(_99b).treegrid("getParent",_9a4[0][opts.idField]);
var _9a6=(_9a5?_9a5.children.length:$(_99b).treegrid("getRoots").length)-_9a4.length;
var _9a7=["<table class=\"datagrid-btable\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><tbody>"];
for(var i=0;i<_9a4.length;i++){
var row=_9a4[i];
if(row.state!="open"&&row.state!="closed"){
row.state="open";
}
var css=opts.rowStyler?opts.rowStyler.call(_99b,row):"";
var cs=this.getStyleValue(css);
var cls="class=\"datagrid-row "+(_9a6++%2&&opts.striped?"datagrid-row-alt ":" ")+cs.c+"\"";
var _9a8=cs.s?"style=\""+cs.s+"\"":"";
var _9a9=_99f+"-"+(_9a2?1:2)+"-"+row[opts.idField];
_9a7.push("<tr id=\""+_9a9+"\" node-id=\""+row[opts.idField]+"\" "+cls+" "+_9a8+">");
_9a7=_9a7.concat(view.renderRow.call(view,_99b,_99e,_9a2,_9a3,row));
_9a7.push("</tr>");
if(row.children&&row.children.length){
var tt=_9a1.call(this,_9a2,_9a3+1,row.children);
var v=row.state=="closed"?"none":"block";
_9a7.push("<tr class=\"treegrid-tr-tree\"><td style=\"border:0px\" colspan="+(_99e.length+(opts.rownumbers?1:0))+"><div style=\"display:"+v+"\">");
_9a7=_9a7.concat(tt);
_9a7.push("</div></td></tr>");
}
}
_9a7.push("</tbody></table>");
return _9a7;
};
},renderFooter:function(_9aa,_9ab,_9ac){
var opts=$.data(_9aa,"treegrid").options;
var rows=$.data(_9aa,"treegrid").footer||[];
var _9ad=$(_9aa).datagrid("getColumnFields",_9ac);
var _9ae=["<table class=\"datagrid-ftable\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><tbody>"];
for(var i=0;i<rows.length;i++){
var row=rows[i];
row[opts.idField]=row[opts.idField]||("foot-row-id"+i);
_9ae.push("<tr class=\"datagrid-row\" node-id=\""+row[opts.idField]+"\">");
_9ae.push(this.renderRow.call(this,_9aa,_9ad,_9ac,0,row));
_9ae.push("</tr>");
}
_9ae.push("</tbody></table>");
$(_9ab).html(_9ae.join(""));
},renderRow:function(_9af,_9b0,_9b1,_9b2,row){
var _9b3=$.data(_9af,"treegrid");
var opts=_9b3.options;
var cc=[];
if(_9b1&&opts.rownumbers){
cc.push("<td class=\"datagrid-td-rownumber\"><div class=\"datagrid-cell-rownumber\">0</div></td>");
}
for(var i=0;i<_9b0.length;i++){
var _9b4=_9b0[i];
var col=$(_9af).datagrid("getColumnOption",_9b4);
if(col){
var css=col.styler?(col.styler(row[_9b4],row)||""):"";
var cs=this.getStyleValue(css);
var cls=cs.c?"class=\""+cs.c+"\"":"";
var _9b5=col.hidden?"style=\"display:none;"+cs.s+"\"":(cs.s?"style=\""+cs.s+"\"":"");
cc.push("<td field=\""+_9b4+"\" "+cls+" "+_9b5+">");
var _9b5="";
if(!col.checkbox){
if(col.align){
_9b5+="text-align:"+col.align+";";
}
if(!opts.nowrap){
_9b5+="white-space:normal;height:auto;";
}else{
if(opts.autoRowHeight){
_9b5+="height:auto;";
}
}
}
cc.push("<div style=\""+_9b5+"\" ");
if(col.checkbox){
cc.push("class=\"datagrid-cell-check ");
}else{
cc.push("class=\"datagrid-cell "+col.cellClass);
}
cc.push("\">");
if(col.checkbox){
if(row.checked){
cc.push("<input type=\"checkbox\" checked=\"checked\"");
}else{
cc.push("<input type=\"checkbox\"");
}
cc.push(" name=\""+_9b4+"\" value=\""+(row[_9b4]!=undefined?row[_9b4]:"")+"\">");
}else{
var val=null;
if(col.formatter){
val=col.formatter(row[_9b4],row);
}else{
val=row[_9b4];
}
if(_9b4==opts.treeField){
for(var j=0;j<_9b2;j++){
cc.push("<span class=\"tree-indent\"></span>");
}
if(row.state=="closed"){
cc.push("<span class=\"tree-hit tree-collapsed\"></span>");
cc.push("<span class=\"tree-icon tree-folder "+(row.iconCls?row.iconCls:"")+"\"></span>");
}else{
if(row.children&&row.children.length){
cc.push("<span class=\"tree-hit tree-expanded\"></span>");
cc.push("<span class=\"tree-icon tree-folder tree-folder-open "+(row.iconCls?row.iconCls:"")+"\"></span>");
}else{
cc.push("<span class=\"tree-indent\"></span>");
cc.push("<span class=\"tree-icon tree-file "+(row.iconCls?row.iconCls:"")+"\"></span>");
}
}
if(this.hasCheckbox(_9af,row)){
var flag=0;
var crow=$.easyui.getArrayItem(_9b3.checkedRows,opts.idField,row[opts.idField]);
if(crow){
flag=crow.checkState=="checked"?1:2;
row.checkState=crow.checkState;
row.checked=crow.checked;
$.easyui.addArrayItem(_9b3.checkedRows,opts.idField,row);
}else{
var prow=$.easyui.getArrayItem(_9b3.checkedRows,opts.idField,row._parentId);
if(prow&&prow.checkState=="checked"&&opts.cascadeCheck){
flag=1;
row.checked=true;
$.easyui.addArrayItem(_9b3.checkedRows,opts.idField,row);
}else{
if(row.checked){
$.easyui.addArrayItem(_9b3.tmpIds,row[opts.idField]);
}
}
row.checkState=flag?"checked":"unchecked";
}
cc.push("<span class=\"tree-checkbox tree-checkbox"+flag+"\"></span>");
}else{
row.checkState=undefined;
row.checked=undefined;
}
cc.push("<span class=\"tree-title\">"+val+"</span>");
}else{
cc.push(val);
}
}
cc.push("</div>");
cc.push("</td>");
}
}
return cc.join("");
},hasCheckbox:function(_9b6,row){
var opts=$.data(_9b6,"treegrid").options;
if(opts.checkbox){
if($.isFunction(opts.checkbox)){
if(opts.checkbox.call(_9b6,row)){
return true;
}else{
return false;
}
}else{
if(opts.onlyLeafCheck){
if(row.state=="open"&&!(row.children&&row.children.length)){
return true;
}
}else{
return true;
}
}
}
return false;
},refreshRow:function(_9b7,id){
this.updateRow.call(this,_9b7,id,{});
},updateRow:function(_9b8,id,row){
var opts=$.data(_9b8,"treegrid").options;
var _9b9=$(_9b8).treegrid("find",id);
$.extend(_9b9,row);
var _9ba=$(_9b8).treegrid("getLevel",id)-1;
var _9bb=opts.rowStyler?opts.rowStyler.call(_9b8,_9b9):"";
var _9bc=$.data(_9b8,"datagrid").rowIdPrefix;
var _9bd=_9b9[opts.idField];
function _9be(_9bf){
var _9c0=$(_9b8).treegrid("getColumnFields",_9bf);
var tr=opts.finder.getTr(_9b8,id,"body",(_9bf?1:2));
var _9c1=tr.find("div.datagrid-cell-rownumber").html();
var _9c2=tr.find("div.datagrid-cell-check input[type=checkbox]").is(":checked");
tr.html(this.renderRow(_9b8,_9c0,_9bf,_9ba,_9b9));
tr.attr("style",_9bb||"");
tr.find("div.datagrid-cell-rownumber").html(_9c1);
if(_9c2){
tr.find("div.datagrid-cell-check input[type=checkbox]")._propAttr("checked",true);
}
if(_9bd!=id){
tr.attr("id",_9bc+"-"+(_9bf?1:2)+"-"+_9bd);
tr.attr("node-id",_9bd);
}
};
_9be.call(this,true);
_9be.call(this,false);
$(_9b8).treegrid("fixRowHeight",id);
},deleteRow:function(_9c3,id){
var opts=$.data(_9c3,"treegrid").options;
var tr=opts.finder.getTr(_9c3,id);
tr.next("tr.treegrid-tr-tree").remove();
tr.remove();
var _9c4=del(id);
if(_9c4){
if(_9c4.children.length==0){
tr=opts.finder.getTr(_9c3,_9c4[opts.idField]);
tr.next("tr.treegrid-tr-tree").remove();
var cell=tr.children("td[field=\""+opts.treeField+"\"]").children("div.datagrid-cell");
cell.find(".tree-icon").removeClass("tree-folder").addClass("tree-file");
cell.find(".tree-hit").remove();
$("<span class=\"tree-indent\"></span>").prependTo(cell);
}
}
this.setEmptyMsg(_9c3);
function del(id){
var cc;
var _9c5=$(_9c3).treegrid("getParent",id);
if(_9c5){
cc=_9c5.children;
}else{
cc=$(_9c3).treegrid("getData");
}
for(var i=0;i<cc.length;i++){
if(cc[i][opts.idField]==id){
cc.splice(i,1);
break;
}
}
return _9c5;
};
},onBeforeRender:function(_9c6,_9c7,data){
if($.isArray(_9c7)){
data={total:_9c7.length,rows:_9c7};
_9c7=null;
}
if(!data){
return false;
}
var _9c8=$.data(_9c6,"treegrid");
var opts=_9c8.options;
if(data.length==undefined){
if(data.footer){
_9c8.footer=data.footer;
}
if(data.total){
_9c8.total=data.total;
}
data=this.transfer(_9c6,_9c7,data.rows);
}else{
function _9c9(_9ca,_9cb){
for(var i=0;i<_9ca.length;i++){
var row=_9ca[i];
row._parentId=_9cb;
if(row.children&&row.children.length){
_9c9(row.children,row[opts.idField]);
}
}
};
_9c9(data,_9c7);
}
this.sort(_9c6,data);
this.treeNodes=data;
this.treeLevel=$(_9c6).treegrid("getLevel",_9c7);
var node=find(_9c6,_9c7);
if(node){
if(node.children){
node.children=node.children.concat(data);
}else{
node.children=data;
}
}else{
_9c8.data=_9c8.data.concat(data);
}
},sort:function(_9cc,data){
var opts=$.data(_9cc,"treegrid").options;
if(!opts.remoteSort&&opts.sortName){
var _9cd=opts.sortName.split(",");
var _9ce=opts.sortOrder.split(",");
_9cf(data);
}
function _9cf(rows){
rows.sort(function(r1,r2){
var r=0;
for(var i=0;i<_9cd.length;i++){
var sn=_9cd[i];
var so=_9ce[i];
var col=$(_9cc).treegrid("getColumnOption",sn);
var _9d0=col.sorter||function(a,b){
return a==b?0:(a>b?1:-1);
};
r=_9d0(r1[sn],r2[sn])*(so=="asc"?1:-1);
if(r!=0){
return r;
}
}
return r;
});
for(var i=0;i<rows.length;i++){
var _9d1=rows[i].children;
if(_9d1&&_9d1.length){
_9cf(_9d1);
}
}
};
},transfer:function(_9d2,_9d3,data){
var opts=$.data(_9d2,"treegrid").options;
var rows=$.extend([],data);
var _9d4=_9d5(_9d3,rows);
var toDo=$.extend([],_9d4);
while(toDo.length){
var node=toDo.shift();
var _9d6=_9d5(node[opts.idField],rows);
if(_9d6.length){
if(node.children){
node.children=node.children.concat(_9d6);
}else{
node.children=_9d6;
}
toDo=toDo.concat(_9d6);
}
}
return _9d4;
function _9d5(_9d7,rows){
var rr=[];
for(var i=0;i<rows.length;i++){
var row=rows[i];
if(row._parentId==_9d7){
rr.push(row);
rows.splice(i,1);
i--;
}
}
return rr;
};
}});
$.fn.treegrid.defaults=$.extend({},$.fn.datagrid.defaults,{treeField:null,checkbox:false,cascadeCheck:true,onlyLeafCheck:false,lines:false,animate:false,singleSelect:true,view:_99a,rowEvents:$.extend({},$.fn.datagrid.defaults.rowEvents,{mouseover:_910(true),mouseout:_910(false),click:_912}),loader:function(_9d8,_9d9,_9da){
var opts=$(this).treegrid("options");
if(!opts.url){
return false;
}
$.ajax({type:opts.method,url:opts.url,data:_9d8,dataType:"json",success:function(data){
_9d9(data);
},error:function(){
_9da.apply(this,arguments);
}});
},loadFilter:function(data,_9db){
return data;
},finder:{getTr:function(_9dc,id,type,_9dd){
type=type||"body";
_9dd=_9dd||0;
var dc=$.data(_9dc,"datagrid").dc;
if(_9dd==0){
var opts=$.data(_9dc,"treegrid").options;
var tr1=opts.finder.getTr(_9dc,id,type,1);
var tr2=opts.finder.getTr(_9dc,id,type,2);
return tr1.add(tr2);
}else{
if(type=="body"){
var tr=$("#"+$.data(_9dc,"datagrid").rowIdPrefix+"-"+_9dd+"-"+id);
if(!tr.length){
tr=(_9dd==1?dc.body1:dc.body2).find("tr[node-id=\""+id+"\"]");
}
return tr;
}else{
if(type=="footer"){
return (_9dd==1?dc.footer1:dc.footer2).find("tr[node-id=\""+id+"\"]");
}else{
if(type=="selected"){
return (_9dd==1?dc.body1:dc.body2).find("tr.datagrid-row-selected");
}else{
if(type=="highlight"){
return (_9dd==1?dc.body1:dc.body2).find("tr.datagrid-row-over");
}else{
if(type=="checked"){
return (_9dd==1?dc.body1:dc.body2).find("tr.datagrid-row-checked");
}else{
if(type=="last"){
return (_9dd==1?dc.body1:dc.body2).find("tr:last[node-id]");
}else{
if(type=="allbody"){
return (_9dd==1?dc.body1:dc.body2).find("tr[node-id]");
}else{
if(type=="allfooter"){
return (_9dd==1?dc.footer1:dc.footer2).find("tr[node-id]");
}
}
}
}
}
}
}
}
}
},getRow:function(_9de,p){
var id=(typeof p=="object")?p.attr("node-id"):p;
return $(_9de).treegrid("find",id);
},getRows:function(_9df){
return $(_9df).treegrid("getChildren");
}},onBeforeLoad:function(row,_9e0){
},onLoadSuccess:function(row,data){
},onLoadError:function(){
},onBeforeCollapse:function(row){
},onCollapse:function(row){
},onBeforeExpand:function(row){
},onExpand:function(row){
},onClickRow:function(row){
},onDblClickRow:function(row){
},onClickCell:function(_9e1,row){
},onDblClickCell:function(_9e2,row){
},onContextMenu:function(e,row){
},onBeforeEdit:function(row){
},onAfterEdit:function(row,_9e3){
},onCancelEdit:function(row){
},onBeforeCheckNode:function(row,_9e4){
},onCheckNode:function(row,_9e5){
}});
})(jQuery);
(function($){
function _9e6(_9e7){
var opts=$.data(_9e7,"datalist").options;
$(_9e7).datagrid($.extend({},opts,{cls:"datalist"+(opts.lines?" datalist-lines":""),frozenColumns:(opts.frozenColumns&&opts.frozenColumns.length)?opts.frozenColumns:(opts.checkbox?[[{field:"_ck",checkbox:true}]]:undefined),columns:(opts.columns&&opts.columns.length)?opts.columns:[[{field:opts.textField,width:"100%",formatter:function(_9e8,row,_9e9){
return opts.textFormatter?opts.textFormatter(_9e8,row,_9e9):_9e8;
}}]]}));
};
var _9ea=$.extend({},$.fn.datagrid.defaults.view,{render:function(_9eb,_9ec,_9ed){
var _9ee=$.data(_9eb,"datagrid");
var opts=_9ee.options;
if(opts.groupField){
var g=this.groupRows(_9eb,_9ee.data.rows);
this.groups=g.groups;
_9ee.data.rows=g.rows;
var _9ef=[];
for(var i=0;i<g.groups.length;i++){
_9ef.push(this.renderGroup.call(this,_9eb,i,g.groups[i],_9ed));
}
$(_9ec).html(_9ef.join(""));
}else{
$(_9ec).html(this.renderTable(_9eb,0,_9ee.data.rows,_9ed));
}
},renderGroup:function(_9f0,_9f1,_9f2,_9f3){
var _9f4=$.data(_9f0,"datagrid");
var opts=_9f4.options;
var _9f5=$(_9f0).datagrid("getColumnFields",_9f3);
var _9f6=[];
_9f6.push("<div class=\"datagrid-group\" group-index="+_9f1+">");
if(!_9f3){
_9f6.push("<span class=\"datagrid-group-title\">");
_9f6.push(opts.groupFormatter.call(_9f0,_9f2.value,_9f2.rows));
_9f6.push("</span>");
}
_9f6.push("</div>");
_9f6.push(this.renderTable(_9f0,_9f2.startIndex,_9f2.rows,_9f3));
return _9f6.join("");
},groupRows:function(_9f7,rows){
var _9f8=$.data(_9f7,"datagrid");
var opts=_9f8.options;
var _9f9=[];
for(var i=0;i<rows.length;i++){
var row=rows[i];
var _9fa=_9fb(row[opts.groupField]);
if(!_9fa){
_9fa={value:row[opts.groupField],rows:[row]};
_9f9.push(_9fa);
}else{
_9fa.rows.push(row);
}
}
var _9fc=0;
var rows=[];
for(var i=0;i<_9f9.length;i++){
var _9fa=_9f9[i];
_9fa.startIndex=_9fc;
_9fc+=_9fa.rows.length;
rows=rows.concat(_9fa.rows);
}
return {groups:_9f9,rows:rows};
function _9fb(_9fd){
for(var i=0;i<_9f9.length;i++){
var _9fe=_9f9[i];
if(_9fe.value==_9fd){
return _9fe;
}
}
return null;
};
}});
$.fn.datalist=function(_9ff,_a00){
if(typeof _9ff=="string"){
var _a01=$.fn.datalist.methods[_9ff];
if(_a01){
return _a01(this,_a00);
}else{
return this.datagrid(_9ff,_a00);
}
}
_9ff=_9ff||{};
return this.each(function(){
var _a02=$.data(this,"datalist");
if(_a02){
$.extend(_a02.options,_9ff);
}else{
var opts=$.extend({},$.fn.datalist.defaults,$.fn.datalist.parseOptions(this),_9ff);
opts.columns=$.extend(true,[],opts.columns);
_a02=$.data(this,"datalist",{options:opts});
}
_9e6(this);
if(!_a02.options.data){
var data=$.fn.datalist.parseData(this);
if(data.total){
$(this).datalist("loadData",data);
}
}
});
};
$.fn.datalist.methods={options:function(jq){
return $.data(jq[0],"datalist").options;
}};
$.fn.datalist.parseOptions=function(_a03){
return $.extend({},$.fn.datagrid.parseOptions(_a03),$.parser.parseOptions(_a03,["valueField","textField","groupField",{checkbox:"boolean",lines:"boolean"}]));
};
$.fn.datalist.parseData=function(_a04){
var opts=$.data(_a04,"datalist").options;
var data={total:0,rows:[]};
$(_a04).children().each(function(){
var _a05=$.parser.parseOptions(this,["value","group"]);
var row={};
var html=$(this).html();
row[opts.valueField]=_a05.value!=undefined?_a05.value:html;
row[opts.textField]=html;
if(opts.groupField){
row[opts.groupField]=_a05.group;
}
data.total++;
data.rows.push(row);
});
return data;
};
$.fn.datalist.defaults=$.extend({},$.fn.datagrid.defaults,{fitColumns:true,singleSelect:true,showHeader:false,checkbox:false,lines:false,valueField:"value",textField:"text",groupField:"",view:_9ea,textFormatter:function(_a06,row){
return _a06;
},groupFormatter:function(_a07,rows){
return _a07;
}});
})(jQuery);
(function($){
$(function(){
$(document).unbind(".combo").bind("mousedown.combo mousewheel.combo",function(e){
var p=$(e.target).closest("span.combo,div.combo-p,div.menu");
if(p.length){
_a08(p);
return;
}
$("body>div.combo-p>div.combo-panel:visible").panel("close");
});
});
function _a09(_a0a){
var _a0b=$.data(_a0a,"combo");
var opts=_a0b.options;
if(!_a0b.panel){
_a0b.panel=$("<div class=\"combo-panel\"></div>").appendTo("body");
_a0b.panel.panel({minWidth:opts.panelMinWidth,maxWidth:opts.panelMaxWidth,minHeight:opts.panelMinHeight,maxHeight:opts.panelMaxHeight,doSize:false,closed:true,cls:"combo-p",style:{position:"absolute",zIndex:10},onOpen:function(){
var _a0c=$(this).panel("options").comboTarget;
var _a0d=$.data(_a0c,"combo");
if(_a0d){
_a0d.options.onShowPanel.call(_a0c);
}
},onBeforeClose:function(){
_a08($(this).parent());
},onClose:function(){
var _a0e=$(this).panel("options").comboTarget;
var _a0f=$(_a0e).data("combo");
if(_a0f){
_a0f.options.onHidePanel.call(_a0e);
}
}});
}
var _a10=$.extend(true,[],opts.icons);
if(opts.hasDownArrow){
_a10.push({iconCls:"combo-arrow",handler:function(e){
_a14(e.data.target);
}});
}
$(_a0a).addClass("combo-f").textbox($.extend({},opts,{icons:_a10,onChange:function(){
}}));
$(_a0a).attr("comboName",$(_a0a).attr("textboxName"));
_a0b.combo=$(_a0a).next();
_a0b.combo.addClass("combo");
};
function _a11(_a12){
var _a13=$.data(_a12,"combo");
var opts=_a13.options;
var p=_a13.panel;
if(p.is(":visible")){
p.panel("close");
}
if(!opts.cloned){
p.panel("destroy");
}
$(_a12).textbox("destroy");
};
function _a14(_a15){
var _a16=$.data(_a15,"combo").panel;
if(_a16.is(":visible")){
var _a17=_a16.combo("combo");
_a18(_a17);
if(_a17!=_a15){
$(_a15).combo("showPanel");
}
}else{
var p=$(_a15).closest("div.combo-p").children(".combo-panel");
$("div.combo-panel:visible").not(_a16).not(p).panel("close");
$(_a15).combo("showPanel");
}
$(_a15).combo("textbox").focus();
};
function _a08(_a19){
$(_a19).find(".combo-f").each(function(){
var p=$(this).combo("panel");
if(p.is(":visible")){
p.panel("close");
}
});
};
function _a1a(e){
var _a1b=e.data.target;
var _a1c=$.data(_a1b,"combo");
var opts=_a1c.options;
if(!opts.editable){
_a14(_a1b);
}else{
var p=$(_a1b).closest("div.combo-p").children(".combo-panel");
$("div.combo-panel:visible").not(p).each(function(){
var _a1d=$(this).combo("combo");
if(_a1d!=_a1b){
_a18(_a1d);
}
});
}
};
function _a1e(e){
var _a1f=e.data.target;
var t=$(_a1f);
var _a20=t.data("combo");
var opts=t.combo("options");
_a20.panel.panel("options").comboTarget=_a1f;
switch(e.keyCode){
case 38:
opts.keyHandler.up.call(_a1f,e);
break;
case 40:
opts.keyHandler.down.call(_a1f,e);
break;
case 37:
opts.keyHandler.left.call(_a1f,e);
break;
case 39:
opts.keyHandler.right.call(_a1f,e);
break;
case 13:
e.preventDefault();
opts.keyHandler.enter.call(_a1f,e);
return false;
case 9:
case 27:
_a18(_a1f);
break;
default:
if(opts.editable){
if(_a20.timer){
clearTimeout(_a20.timer);
}
_a20.timer=setTimeout(function(){
var q=t.combo("getText");
if(_a20.previousText!=q){
_a20.previousText=q;
t.combo("showPanel");
opts.keyHandler.query.call(_a1f,q,e);
t.combo("validate");
}
},opts.delay);
}
}
};
function _a21(_a22){
var _a23=$.data(_a22,"combo");
var _a24=_a23.combo;
var _a25=_a23.panel;
var opts=$(_a22).combo("options");
var _a26=_a25.panel("options");
_a26.comboTarget=_a22;
if(_a26.closed){
_a25.panel("panel").show().css({zIndex:($.fn.menu?$.fn.menu.defaults.zIndex++:($.fn.window?$.fn.window.defaults.zIndex++:99)),left:-999999});
_a25.panel("resize",{width:(opts.panelWidth?opts.panelWidth:_a24._outerWidth()),height:opts.panelHeight});
_a25.panel("panel").hide();
_a25.panel("open");
}
(function(){
if(_a26.comboTarget==_a22&&_a25.is(":visible")){
_a25.panel("move",{left:_a27(),top:_a28()});
setTimeout(arguments.callee,200);
}
})();
function _a27(){
var left=_a24.offset().left;
if(opts.panelAlign=="right"){
left+=_a24._outerWidth()-_a25._outerWidth();
}
if(left+_a25._outerWidth()>$(window)._outerWidth()+$(document).scrollLeft()){
left=$(window)._outerWidth()+$(document).scrollLeft()-_a25._outerWidth();
}
if(left<0){
left=0;
}
return left;
};
function _a28(){
var top=_a24.offset().top+_a24._outerHeight();
if(top+_a25._outerHeight()>$(window)._outerHeight()+$(document).scrollTop()){
top=_a24.offset().top-_a25._outerHeight();
}
if(top<$(document).scrollTop()){
top=_a24.offset().top+_a24._outerHeight();
}
return top;
};
};
function _a18(_a29){
var _a2a=$.data(_a29,"combo").panel;
_a2a.panel("close");
};
function _a2b(_a2c,text){
var _a2d=$.data(_a2c,"combo");
var _a2e=$(_a2c).textbox("getText");
if(_a2e!=text){
$(_a2c).textbox("setText",text);
}
_a2d.previousText=text;
};
function _a2f(_a30){
var _a31=$.data(_a30,"combo");
var opts=_a31.options;
var _a32=$(_a30).next();
var _a33=[];
_a32.find(".textbox-value").each(function(){
_a33.push($(this).val());
});
if(opts.multivalue){
return _a33;
}else{
return _a33.length?_a33[0].split(opts.separator):_a33;
}
};
function _a34(_a35,_a36){
var _a37=$.data(_a35,"combo");
var _a38=_a37.combo;
var opts=$(_a35).combo("options");
if(!$.isArray(_a36)){
_a36=_a36.split(opts.separator);
}
var _a39=_a2f(_a35);
_a38.find(".textbox-value").remove();
if(_a36.length){
if(opts.multivalue){
for(var i=0;i<_a36.length;i++){
_a3a(_a36[i]);
}
}else{
_a3a(_a36.join(opts.separator));
}
}
function _a3a(_a3b){
var name=$(_a35).attr("textboxName")||"";
var _a3c=$("<input type=\"hidden\" class=\"textbox-value\">").appendTo(_a38);
_a3c.attr("name",name);
if(opts.disabled){
_a3c.attr("disabled","disabled");
}
_a3c.val(_a3b);
};
var _a3d=(function(){
if(_a39.length!=_a36.length){
return true;
}
for(var i=0;i<_a36.length;i++){
if(_a36[i]!=_a39[i]){
return true;
}
}
return false;
})();
if(_a3d){
$(_a35).val(_a36.join(opts.separator));
if(opts.multiple){
opts.onChange.call(_a35,_a36,_a39);
}else{
opts.onChange.call(_a35,_a36[0],_a39[0]);
}
$(_a35).closest("form").trigger("_change",[_a35]);
}
};
function _a3e(_a3f){
var _a40=_a2f(_a3f);
return _a40[0];
};
function _a41(_a42,_a43){
_a34(_a42,[_a43]);
};
function _a44(_a45){
var opts=$.data(_a45,"combo").options;
var _a46=opts.onChange;
opts.onChange=function(){
};
if(opts.multiple){
_a34(_a45,opts.value?opts.value:[]);
}else{
_a41(_a45,opts.value);
}
opts.onChange=_a46;
};
$.fn.combo=function(_a47,_a48){
if(typeof _a47=="string"){
var _a49=$.fn.combo.methods[_a47];
if(_a49){
return _a49(this,_a48);
}else{
return this.textbox(_a47,_a48);
}
}
_a47=_a47||{};
return this.each(function(){
var _a4a=$.data(this,"combo");
if(_a4a){
$.extend(_a4a.options,_a47);
if(_a47.value!=undefined){
_a4a.options.originalValue=_a47.value;
}
}else{
_a4a=$.data(this,"combo",{options:$.extend({},$.fn.combo.defaults,$.fn.combo.parseOptions(this),_a47),previousText:""});
_a4a.options.originalValue=_a4a.options.value;
}
_a09(this);
_a44(this);
});
};
$.fn.combo.methods={options:function(jq){
var opts=jq.textbox("options");
return $.extend($.data(jq[0],"combo").options,{width:opts.width,height:opts.height,disabled:opts.disabled,readonly:opts.readonly});
},cloneFrom:function(jq,from){
return jq.each(function(){
$(this).textbox("cloneFrom",from);
$.data(this,"combo",{options:$.extend(true,{cloned:true},$(from).combo("options")),combo:$(this).next(),panel:$(from).combo("panel")});
$(this).addClass("combo-f").attr("comboName",$(this).attr("textboxName"));
});
},combo:function(jq){
return jq.closest(".combo-panel").panel("options").comboTarget;
},panel:function(jq){
return $.data(jq[0],"combo").panel;
},destroy:function(jq){
return jq.each(function(){
_a11(this);
});
},showPanel:function(jq){
return jq.each(function(){
_a21(this);
});
},hidePanel:function(jq){
return jq.each(function(){
_a18(this);
});
},clear:function(jq){
return jq.each(function(){
$(this).textbox("setText","");
var opts=$.data(this,"combo").options;
if(opts.multiple){
$(this).combo("setValues",[]);
}else{
$(this).combo("setValue","");
}
});
},reset:function(jq){
return jq.each(function(){
var opts=$.data(this,"combo").options;
if(opts.multiple){
$(this).combo("setValues",opts.originalValue);
}else{
$(this).combo("setValue",opts.originalValue);
}
});
},setText:function(jq,text){
return jq.each(function(){
_a2b(this,text);
});
},getValues:function(jq){
return _a2f(jq[0]);
},setValues:function(jq,_a4b){
return jq.each(function(){
_a34(this,_a4b);
});
},getValue:function(jq){
return _a3e(jq[0]);
},setValue:function(jq,_a4c){
return jq.each(function(){
_a41(this,_a4c);
});
}};
$.fn.combo.parseOptions=function(_a4d){
var t=$(_a4d);
return $.extend({},$.fn.textbox.parseOptions(_a4d),$.parser.parseOptions(_a4d,["separator","panelAlign",{panelWidth:"number",hasDownArrow:"boolean",delay:"number",reversed:"boolean",multivalue:"boolean",selectOnNavigation:"boolean"},{panelMinWidth:"number",panelMaxWidth:"number",panelMinHeight:"number",panelMaxHeight:"number"}]),{panelHeight:(t.attr("panelHeight")=="auto"?"auto":parseInt(t.attr("panelHeight"))||undefined),multiple:(t.attr("multiple")?true:undefined)});
};
$.fn.combo.defaults=$.extend({},$.fn.textbox.defaults,{inputEvents:{click:_a1a,keydown:_a1e,paste:_a1e,drop:_a1e},panelWidth:null,panelHeight:200,panelMinWidth:null,panelMaxWidth:null,panelMinHeight:null,panelMaxHeight:null,panelAlign:"left",reversed:false,multiple:false,multivalue:true,selectOnNavigation:true,separator:",",hasDownArrow:true,delay:200,keyHandler:{up:function(e){
},down:function(e){
},left:function(e){
},right:function(e){
},enter:function(e){
},query:function(q,e){
}},onShowPanel:function(){
},onHidePanel:function(){
},onChange:function(_a4e,_a4f){
}});
})(jQuery);
(function($){
function _a50(_a51,_a52){
var _a53=$.data(_a51,"combobox");
return $.easyui.indexOfArray(_a53.data,_a53.options.valueField,_a52);
};
function _a54(_a55,_a56){
var opts=$.data(_a55,"combobox").options;
var _a57=$(_a55).combo("panel");
var item=opts.finder.getEl(_a55,_a56);
if(item.length){
if(item.position().top<=0){
var h=_a57.scrollTop()+item.position().top;
_a57.scrollTop(h);
}else{
if(item.position().top+item.outerHeight()>_a57.height()){
var h=_a57.scrollTop()+item.position().top+item.outerHeight()-_a57.height();
_a57.scrollTop(h);
}
}
}
_a57.triggerHandler("scroll");
};
function nav(_a58,dir){
var opts=$.data(_a58,"combobox").options;
var _a59=$(_a58).combobox("panel");
var item=_a59.children("div.combobox-item-hover");
if(!item.length){
item=_a59.children("div.combobox-item-selected");
}
item.removeClass("combobox-item-hover");
var _a5a="div.combobox-item:visible:not(.combobox-item-disabled):first";
var _a5b="div.combobox-item:visible:not(.combobox-item-disabled):last";
if(!item.length){
item=_a59.children(dir=="next"?_a5a:_a5b);
}else{
if(dir=="next"){
item=item.nextAll(_a5a);
if(!item.length){
item=_a59.children(_a5a);
}
}else{
item=item.prevAll(_a5a);
if(!item.length){
item=_a59.children(_a5b);
}
}
}
if(item.length){
item.addClass("combobox-item-hover");
var row=opts.finder.getRow(_a58,item);
if(row){
$(_a58).combobox("scrollTo",row[opts.valueField]);
if(opts.selectOnNavigation){
_a5c(_a58,row[opts.valueField]);
}
}
}
};
function _a5c(_a5d,_a5e,_a5f){
var opts=$.data(_a5d,"combobox").options;
var _a60=$(_a5d).combo("getValues");
if($.inArray(_a5e+"",_a60)==-1){
if(opts.multiple){
_a60.push(_a5e);
}else{
_a60=[_a5e];
}
_a61(_a5d,_a60,_a5f);
}
};
function _a62(_a63,_a64){
var opts=$.data(_a63,"combobox").options;
var _a65=$(_a63).combo("getValues");
var _a66=$.inArray(_a64+"",_a65);
if(_a66>=0){
_a65.splice(_a66,1);
_a61(_a63,_a65);
}
};
function _a61(_a67,_a68,_a69){
var opts=$.data(_a67,"combobox").options;
var _a6a=$(_a67).combo("panel");
if(!$.isArray(_a68)){
_a68=_a68.split(opts.separator);
}
if(!opts.multiple){
_a68=_a68.length?[_a68[0]]:[""];
}
var _a6b=$(_a67).combo("getValues");
if(_a6a.is(":visible")){
_a6a.find(".combobox-item-selected").each(function(){
var row=opts.finder.getRow(_a67,$(this));
if(row){
if($.easyui.indexOfArray(_a6b,row[opts.valueField])==-1){
$(this).removeClass("combobox-item-selected");
}
}
});
}
$.map(_a6b,function(v){
if($.easyui.indexOfArray(_a68,v)==-1){
var el=opts.finder.getEl(_a67,v);
if(el.hasClass("combobox-item-selected")){
el.removeClass("combobox-item-selected");
opts.onUnselect.call(_a67,opts.finder.getRow(_a67,v));
}
}
});
var _a6c=null;
var vv=[],ss=[];
for(var i=0;i<_a68.length;i++){
var v=_a68[i];
var s=v;
var row=opts.finder.getRow(_a67,v);
if(row){
s=row[opts.textField];
_a6c=row;
var el=opts.finder.getEl(_a67,v);
if(!el.hasClass("combobox-item-selected")){
el.addClass("combobox-item-selected");
opts.onSelect.call(_a67,row);
}
}
vv.push(v);
ss.push(s);
}
if(!_a69){
$(_a67).combo("setText",ss.join(opts.separator));
}
if(opts.showItemIcon){
var tb=$(_a67).combobox("textbox");
tb.removeClass("textbox-bgicon "+opts.textboxIconCls);
if(_a6c&&_a6c.iconCls){
tb.addClass("textbox-bgicon "+_a6c.iconCls);
opts.textboxIconCls=_a6c.iconCls;
}
}
$(_a67).combo("setValues",vv);
_a6a.triggerHandler("scroll");
};
function _a6d(_a6e,data,_a6f){
var _a70=$.data(_a6e,"combobox");
var opts=_a70.options;
_a70.data=opts.loadFilter.call(_a6e,data);
opts.view.render.call(opts.view,_a6e,$(_a6e).combo("panel"),_a70.data);
var vv=$(_a6e).combobox("getValues");
$.easyui.forEach(_a70.data,false,function(row){
if(row["selected"]){
$.easyui.addArrayItem(vv,row[opts.valueField]+"");
}
});
if(opts.multiple){
_a61(_a6e,vv,_a6f);
}else{
_a61(_a6e,vv.length?[vv[vv.length-1]]:[],_a6f);
}
opts.onLoadSuccess.call(_a6e,data);
};
function _a71(_a72,url,_a73,_a74){
var opts=$.data(_a72,"combobox").options;
if(url){
opts.url=url;
}
_a73=$.extend({},opts.queryParams,_a73||{});
if(opts.onBeforeLoad.call(_a72,_a73)==false){
return;
}
opts.loader.call(_a72,_a73,function(data){
_a6d(_a72,data,_a74);
},function(){
opts.onLoadError.apply(this,arguments);
});
};
function _a75(_a76,q){
var _a77=$.data(_a76,"combobox");
var opts=_a77.options;
var _a78=$();
var qq=opts.multiple?q.split(opts.separator):[q];
if(opts.mode=="remote"){
_a79(qq);
_a71(_a76,null,{q:q},true);
}else{
var _a7a=$(_a76).combo("panel");
_a7a.find(".combobox-item-hover").removeClass("combobox-item-hover");
_a7a.find(".combobox-item,.combobox-group").hide();
var data=_a77.data;
var vv=[];
$.map(qq,function(q){
q=$.trim(q);
var _a7b=q;
var _a7c=undefined;
_a78=$();
for(var i=0;i<data.length;i++){
var row=data[i];
if(opts.filter.call(_a76,q,row)){
var v=row[opts.valueField];
var s=row[opts.textField];
var g=row[opts.groupField];
var item=opts.finder.getEl(_a76,v).show();
if(s.toLowerCase()==q.toLowerCase()){
_a7b=v;
if(opts.reversed){
_a78=item;
}else{
_a5c(_a76,v,true);
}
}
if(opts.groupField&&_a7c!=g){
opts.finder.getGroupEl(_a76,g).show();
_a7c=g;
}
}
}
vv.push(_a7b);
});
_a79(vv);
}
function _a79(vv){
if(opts.reversed){
_a78.addClass("combobox-item-hover");
}else{
_a61(_a76,opts.multiple?(q?vv:[]):vv,true);
}
};
};
function _a7d(_a7e){
var t=$(_a7e);
var opts=t.combobox("options");
var _a7f=t.combobox("panel");
var item=_a7f.children("div.combobox-item-hover");
if(item.length){
item.removeClass("combobox-item-hover");
var row=opts.finder.getRow(_a7e,item);
var _a80=row[opts.valueField];
if(opts.multiple){
if(item.hasClass("combobox-item-selected")){
t.combobox("unselect",_a80);
}else{
t.combobox("select",_a80);
}
}else{
t.combobox("select",_a80);
}
}
var vv=[];
$.map(t.combobox("getValues"),function(v){
if(_a50(_a7e,v)>=0){
vv.push(v);
}
});
t.combobox("setValues",vv);
if(!opts.multiple){
t.combobox("hidePanel");
}
};
function _a81(_a82){
var _a83=$.data(_a82,"combobox");
var opts=_a83.options;
$(_a82).addClass("combobox-f");
$(_a82).combo($.extend({},opts,{onShowPanel:function(){
$(this).combo("panel").find("div.combobox-item:hidden,div.combobox-group:hidden").show();
_a61(this,$(this).combobox("getValues"),true);
$(this).combobox("scrollTo",$(this).combobox("getValue"));
opts.onShowPanel.call(this);
}}));
var p=$(_a82).combo("panel");
p.unbind(".combobox");
for(var _a84 in opts.panelEvents){
p.bind(_a84+".combobox",{target:_a82},opts.panelEvents[_a84]);
}
};
function _a85(e){
$(this).children("div.combobox-item-hover").removeClass("combobox-item-hover");
var item=$(e.target).closest("div.combobox-item");
if(!item.hasClass("combobox-item-disabled")){
item.addClass("combobox-item-hover");
}
e.stopPropagation();
};
function _a86(e){
$(e.target).closest("div.combobox-item").removeClass("combobox-item-hover");
e.stopPropagation();
};
function _a87(e){
var _a88=$(this).panel("options").comboTarget;
if(!_a88){
return;
}
var opts=$(_a88).combobox("options");
var item=$(e.target).closest("div.combobox-item");
if(!item.length||item.hasClass("combobox-item-disabled")){
return;
}
var row=opts.finder.getRow(_a88,item);
if(!row){
return;
}
if(opts.blurTimer){
clearTimeout(opts.blurTimer);
opts.blurTimer=null;
}
opts.onClick.call(_a88,row);
var _a89=row[opts.valueField];
if(opts.multiple){
if(item.hasClass("combobox-item-selected")){
_a62(_a88,_a89);
}else{
_a5c(_a88,_a89);
}
}else{
$(_a88).combobox("setValue",_a89).combobox("hidePanel");
}
e.stopPropagation();
};
function _a8a(e){
var _a8b=$(this).panel("options").comboTarget;
if(!_a8b){
return;
}
var opts=$(_a8b).combobox("options");
if(opts.groupPosition=="sticky"){
var _a8c=$(this).children(".combobox-stick");
if(!_a8c.length){
_a8c=$("<div class=\"combobox-stick\"></div>").appendTo(this);
}
_a8c.hide();
var _a8d=$(_a8b).data("combobox");
$(this).children(".combobox-group:visible").each(function(){
var g=$(this);
var _a8e=opts.finder.getGroup(_a8b,g);
var _a8f=_a8d.data[_a8e.startIndex+_a8e.count-1];
var last=opts.finder.getEl(_a8b,_a8f[opts.valueField]);
if(g.position().top<0&&last.position().top>0){
_a8c.show().html(g.html());
return false;
}
});
}
};
$.fn.combobox=function(_a90,_a91){
if(typeof _a90=="string"){
var _a92=$.fn.combobox.methods[_a90];
if(_a92){
return _a92(this,_a91);
}else{
return this.combo(_a90,_a91);
}
}
_a90=_a90||{};
return this.each(function(){
var _a93=$.data(this,"combobox");
if(_a93){
$.extend(_a93.options,_a90);
}else{
_a93=$.data(this,"combobox",{options:$.extend({},$.fn.combobox.defaults,$.fn.combobox.parseOptions(this),_a90),data:[]});
}
_a81(this);
if(_a93.options.data){
_a6d(this,_a93.options.data);
}else{
var data=$.fn.combobox.parseData(this);
if(data.length){
_a6d(this,data);
}
}
_a71(this);
});
};
$.fn.combobox.methods={options:function(jq){
var _a94=jq.combo("options");
return $.extend($.data(jq[0],"combobox").options,{width:_a94.width,height:_a94.height,originalValue:_a94.originalValue,disabled:_a94.disabled,readonly:_a94.readonly});
},cloneFrom:function(jq,from){
return jq.each(function(){
$(this).combo("cloneFrom",from);
$.data(this,"combobox",$(from).data("combobox"));
$(this).addClass("combobox-f").attr("comboboxName",$(this).attr("textboxName"));
});
},getData:function(jq){
return $.data(jq[0],"combobox").data;
},setValues:function(jq,_a95){
return jq.each(function(){
_a61(this,_a95);
});
},setValue:function(jq,_a96){
return jq.each(function(){
_a61(this,$.isArray(_a96)?_a96:[_a96]);
});
},clear:function(jq){
return jq.each(function(){
_a61(this,[]);
});
},reset:function(jq){
return jq.each(function(){
var opts=$(this).combobox("options");
if(opts.multiple){
$(this).combobox("setValues",opts.originalValue);
}else{
$(this).combobox("setValue",opts.originalValue);
}
});
},loadData:function(jq,data){
return jq.each(function(){
_a6d(this,data);
});
},reload:function(jq,url){
return jq.each(function(){
if(typeof url=="string"){
_a71(this,url);
}else{
if(url){
var opts=$(this).combobox("options");
opts.queryParams=url;
}
_a71(this);
}
});
},select:function(jq,_a97){
return jq.each(function(){
_a5c(this,_a97);
});
},unselect:function(jq,_a98){
return jq.each(function(){
_a62(this,_a98);
});
},scrollTo:function(jq,_a99){
return jq.each(function(){
_a54(this,_a99);
});
}};
$.fn.combobox.parseOptions=function(_a9a){
var t=$(_a9a);
return $.extend({},$.fn.combo.parseOptions(_a9a),$.parser.parseOptions(_a9a,["valueField","textField","groupField","groupPosition","mode","method","url",{showItemIcon:"boolean",limitToList:"boolean"}]));
};
$.fn.combobox.parseData=function(_a9b){
var data=[];
var opts=$(_a9b).combobox("options");
$(_a9b).children().each(function(){
if(this.tagName.toLowerCase()=="optgroup"){
var _a9c=$(this).attr("label");
$(this).children().each(function(){
_a9d(this,_a9c);
});
}else{
_a9d(this);
}
});
return data;
function _a9d(el,_a9e){
var t=$(el);
var row={};
row[opts.valueField]=t.attr("value")!=undefined?t.attr("value"):t.text();
row[opts.textField]=t.text();
row["selected"]=t.is(":selected");
row["disabled"]=t.is(":disabled");
if(_a9e){
opts.groupField=opts.groupField||"group";
row[opts.groupField]=_a9e;
}
data.push(row);
};
};
var _a9f=0;
var _aa0={render:function(_aa1,_aa2,data){
var _aa3=$.data(_aa1,"combobox");
var opts=_aa3.options;
_a9f++;
_aa3.itemIdPrefix="_easyui_combobox_i"+_a9f;
_aa3.groupIdPrefix="_easyui_combobox_g"+_a9f;
_aa3.groups=[];
var dd=[];
var _aa4=undefined;
for(var i=0;i<data.length;i++){
var row=data[i];
var v=row[opts.valueField]+"";
var s=row[opts.textField];
var g=row[opts.groupField];
if(g){
if(_aa4!=g){
_aa4=g;
_aa3.groups.push({value:g,startIndex:i,count:1});
dd.push("<div id=\""+(_aa3.groupIdPrefix+"_"+(_aa3.groups.length-1))+"\" class=\"combobox-group\">");
dd.push(opts.groupFormatter?opts.groupFormatter.call(_aa1,g):g);
dd.push("</div>");
}else{
_aa3.groups[_aa3.groups.length-1].count++;
}
}else{
_aa4=undefined;
}
var cls="combobox-item"+(row.disabled?" combobox-item-disabled":"")+(g?" combobox-gitem":"");
dd.push("<div id=\""+(_aa3.itemIdPrefix+"_"+i)+"\" class=\""+cls+"\">");
if(opts.showItemIcon&&row.iconCls){
dd.push("<span class=\"combobox-icon "+row.iconCls+"\"></span>");
}
dd.push(opts.formatter?opts.formatter.call(_aa1,row):s);
dd.push("</div>");
}
$(_aa2).html(dd.join(""));
}};
$.fn.combobox.defaults=$.extend({},$.fn.combo.defaults,{valueField:"value",textField:"text",groupPosition:"static",groupField:null,groupFormatter:function(_aa5){
return _aa5;
},mode:"local",method:"post",url:null,data:null,queryParams:{},showItemIcon:false,limitToList:false,view:_aa0,keyHandler:{up:function(e){
nav(this,"prev");
e.preventDefault();
},down:function(e){
nav(this,"next");
e.preventDefault();
},left:function(e){
},right:function(e){
},enter:function(e){
_a7d(this);
},query:function(q,e){
_a75(this,q);
}},inputEvents:$.extend({},$.fn.combo.defaults.inputEvents,{blur:function(e){
var _aa6=e.data.target;
var opts=$(_aa6).combobox("options");
if(opts.reversed||opts.limitToList){
if(opts.blurTimer){
clearTimeout(opts.blurTimer);
}
opts.blurTimer=setTimeout(function(){
var _aa7=$(_aa6).parent().length;
if(_aa7){
if(opts.reversed){
$(_aa6).combobox("setValues",$(_aa6).combobox("getValues"));
}else{
if(opts.limitToList){
_a7d(_aa6);
}
}
opts.blurTimer=null;
}
},50);
}
}}),panelEvents:{mouseover:_a85,mouseout:_a86,click:_a87,scroll:_a8a},filter:function(q,row){
var opts=$(this).combobox("options");
return row[opts.textField].toLowerCase().indexOf(q.toLowerCase())>=0;
},formatter:function(row){
var opts=$(this).combobox("options");
return row[opts.textField];
},loader:function(_aa8,_aa9,_aaa){
var opts=$(this).combobox("options");
if(!opts.url){
return false;
}
$.ajax({type:opts.method,url:opts.url,data:_aa8,dataType:"json",success:function(data){
_aa9(data);
},error:function(){
_aaa.apply(this,arguments);
}});
},loadFilter:function(data){
return data;
},finder:{getEl:function(_aab,_aac){
var _aad=_a50(_aab,_aac);
var id=$.data(_aab,"combobox").itemIdPrefix+"_"+_aad;
return $("#"+id);
},getGroupEl:function(_aae,_aaf){
var _ab0=$.data(_aae,"combobox");
var _ab1=$.easyui.indexOfArray(_ab0.groups,"value",_aaf);
var id=_ab0.groupIdPrefix+"_"+_ab1;
return $("#"+id);
},getGroup:function(_ab2,p){
var _ab3=$.data(_ab2,"combobox");
var _ab4=p.attr("id").substr(_ab3.groupIdPrefix.length+1);
return _ab3.groups[parseInt(_ab4)];
},getRow:function(_ab5,p){
var _ab6=$.data(_ab5,"combobox");
var _ab7=(p instanceof $)?p.attr("id").substr(_ab6.itemIdPrefix.length+1):_a50(_ab5,p);
return _ab6.data[parseInt(_ab7)];
}},onBeforeLoad:function(_ab8){
},onLoadSuccess:function(data){
},onLoadError:function(){
},onSelect:function(_ab9){
},onUnselect:function(_aba){
},onClick:function(_abb){
}});
})(jQuery);
(function($){
function _abc(_abd){
var _abe=$.data(_abd,"combotree");
var opts=_abe.options;
var tree=_abe.tree;
$(_abd).addClass("combotree-f");
$(_abd).combo($.extend({},opts,{onShowPanel:function(){
if(opts.editable){
tree.tree("doFilter","");
}
opts.onShowPanel.call(this);
}}));
var _abf=$(_abd).combo("panel");
if(!tree){
tree=$("<ul></ul>").appendTo(_abf);
_abe.tree=tree;
}
tree.tree($.extend({},opts,{checkbox:opts.multiple,onLoadSuccess:function(node,data){
var _ac0=$(_abd).combotree("getValues");
if(opts.multiple){
$.map(tree.tree("getChecked"),function(node){
$.easyui.addArrayItem(_ac0,node.id);
});
}
_ac5(_abd,_ac0,_abe.remainText);
opts.onLoadSuccess.call(this,node,data);
},onClick:function(node){
if(opts.multiple){
$(this).tree(node.checked?"uncheck":"check",node.target);
}else{
$(_abd).combo("hidePanel");
}
_abe.remainText=false;
_ac2(_abd);
opts.onClick.call(this,node);
},onCheck:function(node,_ac1){
_abe.remainText=false;
_ac2(_abd);
opts.onCheck.call(this,node,_ac1);
}}));
};
function _ac2(_ac3){
var _ac4=$.data(_ac3,"combotree");
var opts=_ac4.options;
var tree=_ac4.tree;
var vv=[];
if(opts.multiple){
vv=$.map(tree.tree("getChecked"),function(node){
return node.id;
});
}else{
var node=tree.tree("getSelected");
if(node){
vv.push(node.id);
}
}
vv=vv.concat(opts.unselectedValues);
_ac5(_ac3,vv,_ac4.remainText);
};
function _ac5(_ac6,_ac7,_ac8){
var _ac9=$.data(_ac6,"combotree");
var opts=_ac9.options;
var tree=_ac9.tree;
var _aca=tree.tree("options");
var _acb=_aca.onBeforeCheck;
var _acc=_aca.onCheck;
var _acd=_aca.onSelect;
_aca.onBeforeCheck=_aca.onCheck=_aca.onSelect=function(){
};
if(!$.isArray(_ac7)){
_ac7=_ac7.split(opts.separator);
}
if(!opts.multiple){
_ac7=_ac7.length?[_ac7[0]]:[""];
}
var vv=$.map(_ac7,function(_ace){
return String(_ace);
});
tree.find("div.tree-node-selected").removeClass("tree-node-selected");
$.map(tree.tree("getChecked"),function(node){
if($.inArray(String(node.id),vv)==-1){
tree.tree("uncheck",node.target);
}
});
var ss=[];
opts.unselectedValues=[];
$.map(vv,function(v){
var node=tree.tree("find",v);
if(node){
tree.tree("check",node.target).tree("select",node.target);
ss.push(_acf(node));
}else{
ss.push(_ad0(v,opts.mappingRows)||v);
opts.unselectedValues.push(v);
}
});
if(opts.multiple){
$.map(tree.tree("getChecked"),function(node){
var id=String(node.id);
if($.inArray(id,vv)==-1){
vv.push(id);
ss.push(_acf(node));
}
});
}
_aca.onBeforeCheck=_acb;
_aca.onCheck=_acc;
_aca.onSelect=_acd;
if(!_ac8){
var s=ss.join(opts.separator);
if($(_ac6).combo("getText")!=s){
$(_ac6).combo("setText",s);
}
}
$(_ac6).combo("setValues",vv);
function _ad0(_ad1,a){
var item=$.easyui.getArrayItem(a,"id",_ad1);
return item?_acf(item):undefined;
};
function _acf(node){
return node[opts.textField||""]||node.text;
};
};
function _ad2(_ad3,q){
var _ad4=$.data(_ad3,"combotree");
var opts=_ad4.options;
var tree=_ad4.tree;
_ad4.remainText=true;
tree.tree("doFilter",opts.multiple?q.split(opts.separator):q);
};
function _ad5(_ad6){
var _ad7=$.data(_ad6,"combotree");
_ad7.remainText=false;
$(_ad6).combotree("setValues",$(_ad6).combotree("getValues"));
$(_ad6).combotree("hidePanel");
};
$.fn.combotree=function(_ad8,_ad9){
if(typeof _ad8=="string"){
var _ada=$.fn.combotree.methods[_ad8];
if(_ada){
return _ada(this,_ad9);
}else{
return this.combo(_ad8,_ad9);
}
}
_ad8=_ad8||{};
return this.each(function(){
var _adb=$.data(this,"combotree");
if(_adb){
$.extend(_adb.options,_ad8);
}else{
$.data(this,"combotree",{options:$.extend({},$.fn.combotree.defaults,$.fn.combotree.parseOptions(this),_ad8)});
}
_abc(this);
});
};
$.fn.combotree.methods={options:function(jq){
var _adc=jq.combo("options");
return $.extend($.data(jq[0],"combotree").options,{width:_adc.width,height:_adc.height,originalValue:_adc.originalValue,disabled:_adc.disabled,readonly:_adc.readonly});
},clone:function(jq,_add){
var t=jq.combo("clone",_add);
t.data("combotree",{options:$.extend(true,{},jq.combotree("options")),tree:jq.combotree("tree")});
return t;
},tree:function(jq){
return $.data(jq[0],"combotree").tree;
},loadData:function(jq,data){
return jq.each(function(){
var opts=$.data(this,"combotree").options;
opts.data=data;
var tree=$.data(this,"combotree").tree;
tree.tree("loadData",data);
});
},reload:function(jq,url){
return jq.each(function(){
var opts=$.data(this,"combotree").options;
var tree=$.data(this,"combotree").tree;
if(url){
opts.url=url;
}
tree.tree({url:opts.url});
});
},setValues:function(jq,_ade){
return jq.each(function(){
var opts=$(this).combotree("options");
if($.isArray(_ade)){
_ade=$.map(_ade,function(_adf){
if(_adf&&typeof _adf=="object"){
$.easyui.addArrayItem(opts.mappingRows,"id",_adf);
return _adf.id;
}else{
return _adf;
}
});
}
_ac5(this,_ade);
});
},setValue:function(jq,_ae0){
return jq.each(function(){
$(this).combotree("setValues",$.isArray(_ae0)?_ae0:[_ae0]);
});
},clear:function(jq){
return jq.each(function(){
$(this).combotree("setValues",[]);
});
},reset:function(jq){
return jq.each(function(){
var opts=$(this).combotree("options");
if(opts.multiple){
$(this).combotree("setValues",opts.originalValue);
}else{
$(this).combotree("setValue",opts.originalValue);
}
});
}};
$.fn.combotree.parseOptions=function(_ae1){
return $.extend({},$.fn.combo.parseOptions(_ae1),$.fn.tree.parseOptions(_ae1));
};
$.fn.combotree.defaults=$.extend({},$.fn.combo.defaults,$.fn.tree.defaults,{editable:false,textField:null,unselectedValues:[],mappingRows:[],keyHandler:{up:function(e){
},down:function(e){
},left:function(e){
},right:function(e){
},enter:function(e){
_ad5(this);
},query:function(q,e){
_ad2(this,q);
}}});
})(jQuery);
(function($){
function _ae2(_ae3){
var _ae4=$.data(_ae3,"combogrid");
var opts=_ae4.options;
var grid=_ae4.grid;
$(_ae3).addClass("combogrid-f").combo($.extend({},opts,{onShowPanel:function(){
_af9(this,$(this).combogrid("getValues"),true);
var p=$(this).combogrid("panel");
var _ae5=p.outerHeight()-p.height();
var _ae6=p._size("minHeight");
var _ae7=p._size("maxHeight");
var dg=$(this).combogrid("grid");
dg.datagrid("resize",{width:"100%",height:(isNaN(parseInt(opts.panelHeight))?"auto":"100%"),minHeight:(_ae6?_ae6-_ae5:""),maxHeight:(_ae7?_ae7-_ae5:"")});
var row=dg.datagrid("getSelected");
if(row){
dg.datagrid("scrollTo",dg.datagrid("getRowIndex",row));
}
opts.onShowPanel.call(this);
}}));
var _ae8=$(_ae3).combo("panel");
if(!grid){
grid=$("<table></table>").appendTo(_ae8);
_ae4.grid=grid;
}
grid.datagrid($.extend({},opts,{border:false,singleSelect:(!opts.multiple),onLoadSuccess:_ae9,onClickRow:_aea,onSelect:_aeb("onSelect"),onUnselect:_aeb("onUnselect"),onSelectAll:_aeb("onSelectAll"),onUnselectAll:_aeb("onUnselectAll")}));
function _aec(dg){
return $(dg).closest(".combo-panel").panel("options").comboTarget||_ae3;
};
function _ae9(data){
var _aed=_aec(this);
var _aee=$(_aed).data("combogrid");
var opts=_aee.options;
var _aef=$(_aed).combo("getValues");
_af9(_aed,_aef,_aee.remainText);
opts.onLoadSuccess.call(this,data);
};
function _aea(_af0,row){
var _af1=_aec(this);
var _af2=$(_af1).data("combogrid");
var opts=_af2.options;
_af2.remainText=false;
_af3.call(this);
if(!opts.multiple){
$(_af1).combo("hidePanel");
}
opts.onClickRow.call(this,_af0,row);
};
function _aeb(_af4){
return function(_af5,row){
var _af6=_aec(this);
var opts=$(_af6).combogrid("options");
if(_af4=="onUnselectAll"){
if(opts.multiple){
_af3.call(this);
}
}else{
_af3.call(this);
}
opts[_af4].call(this,_af5,row);
};
};
function _af3(){
var dg=$(this);
var _af7=_aec(dg);
var _af8=$(_af7).data("combogrid");
var opts=_af8.options;
var vv=$.map(dg.datagrid("getSelections"),function(row){
return row[opts.idField];
});
vv=vv.concat(opts.unselectedValues);
_af9(_af7,vv,_af8.remainText);
};
};
function nav(_afa,dir){
var _afb=$.data(_afa,"combogrid");
var opts=_afb.options;
var grid=_afb.grid;
var _afc=grid.datagrid("getRows").length;
if(!_afc){
return;
}
var tr=opts.finder.getTr(grid[0],null,"highlight");
if(!tr.length){
tr=opts.finder.getTr(grid[0],null,"selected");
}
var _afd;
if(!tr.length){
_afd=(dir=="next"?0:_afc-1);
}else{
var _afd=parseInt(tr.attr("datagrid-row-index"));
_afd+=(dir=="next"?1:-1);
if(_afd<0){
_afd=_afc-1;
}
if(_afd>=_afc){
_afd=0;
}
}
grid.datagrid("highlightRow",_afd);
if(opts.selectOnNavigation){
_afb.remainText=false;
grid.datagrid("selectRow",_afd);
}
};
function _af9(_afe,_aff,_b00){
var _b01=$.data(_afe,"combogrid");
var opts=_b01.options;
var grid=_b01.grid;
var _b02=$(_afe).combo("getValues");
var _b03=$(_afe).combo("options");
var _b04=_b03.onChange;
_b03.onChange=function(){
};
var _b05=grid.datagrid("options");
var _b06=_b05.onSelect;
var _b07=_b05.onUnselectAll;
_b05.onSelect=_b05.onUnselectAll=function(){
};
if(!$.isArray(_aff)){
_aff=_aff.split(opts.separator);
}
if(!opts.multiple){
_aff=_aff.length?[_aff[0]]:[""];
}
var vv=$.map(_aff,function(_b08){
return String(_b08);
});
vv=$.grep(vv,function(v,_b09){
return _b09===$.inArray(v,vv);
});
var _b0a=$.grep(grid.datagrid("getSelections"),function(row,_b0b){
return $.inArray(String(row[opts.idField]),vv)>=0;
});
grid.datagrid("clearSelections");
grid.data("datagrid").selectedRows=_b0a;
var ss=[];
opts.unselectedValues=[];
$.map(vv,function(v){
var _b0c=grid.datagrid("getRowIndex",v);
if(_b0c>=0){
grid.datagrid("selectRow",_b0c);
}else{
opts.unselectedValues.push(v);
}
ss.push(_b0d(v,grid.datagrid("getRows"))||_b0d(v,_b0a)||_b0d(v,opts.mappingRows)||v);
});
$(_afe).combo("setValues",_b02);
_b03.onChange=_b04;
_b05.onSelect=_b06;
_b05.onUnselectAll=_b07;
if(!_b00){
var s=ss.join(opts.separator);
if($(_afe).combo("getText")!=s){
$(_afe).combo("setText",s);
}
}
$(_afe).combo("setValues",_aff);
function _b0d(_b0e,a){
var item=$.easyui.getArrayItem(a,opts.idField,_b0e);
return item?item[opts.textField]:undefined;
};
};
function _b0f(_b10,q){
var _b11=$.data(_b10,"combogrid");
var opts=_b11.options;
var grid=_b11.grid;
_b11.remainText=true;
var qq=opts.multiple?q.split(opts.separator):[q];
qq=$.grep(qq,function(q){
return $.trim(q)!="";
});
if(opts.mode=="remote"){
_b12(qq);
grid.datagrid("load",$.extend({},opts.queryParams,{q:q}));
}else{
grid.datagrid("highlightRow",-1);
var rows=grid.datagrid("getRows");
var vv=[];
$.map(qq,function(q){
q=$.trim(q);
var _b13=q;
_b14(opts.mappingRows,q);
_b14(grid.datagrid("getSelections"),q);
var _b15=_b14(rows,q);
if(_b15>=0){
if(opts.reversed){
grid.datagrid("highlightRow",_b15);
}
}else{
$.map(rows,function(row,i){
if(opts.filter.call(_b10,q,row)){
grid.datagrid("highlightRow",i);
}
});
}
});
_b12(vv);
}
function _b14(rows,q){
for(var i=0;i<rows.length;i++){
var row=rows[i];
if((row[opts.textField]||"").toLowerCase()==q.toLowerCase()){
vv.push(row[opts.idField]);
return i;
}
}
return -1;
};
function _b12(vv){
if(!opts.reversed){
_af9(_b10,vv,true);
}
};
};
function _b16(_b17){
var _b18=$.data(_b17,"combogrid");
var opts=_b18.options;
var grid=_b18.grid;
var tr=opts.finder.getTr(grid[0],null,"highlight");
_b18.remainText=false;
if(tr.length){
var _b19=parseInt(tr.attr("datagrid-row-index"));
if(opts.multiple){
if(tr.hasClass("datagrid-row-selected")){
grid.datagrid("unselectRow",_b19);
}else{
grid.datagrid("selectRow",_b19);
}
}else{
grid.datagrid("selectRow",_b19);
}
}
var vv=[];
$.map(grid.datagrid("getSelections"),function(row){
vv.push(row[opts.idField]);
});
$.map(opts.unselectedValues,function(v){
if($.easyui.indexOfArray(opts.mappingRows,opts.idField,v)>=0){
$.easyui.addArrayItem(vv,v);
}
});
$(_b17).combogrid("setValues",vv);
if(!opts.multiple){
$(_b17).combogrid("hidePanel");
}
};
$.fn.combogrid=function(_b1a,_b1b){
if(typeof _b1a=="string"){
var _b1c=$.fn.combogrid.methods[_b1a];
if(_b1c){
return _b1c(this,_b1b);
}else{
return this.combo(_b1a,_b1b);
}
}
_b1a=_b1a||{};
return this.each(function(){
var _b1d=$.data(this,"combogrid");
if(_b1d){
$.extend(_b1d.options,_b1a);
}else{
_b1d=$.data(this,"combogrid",{options:$.extend({},$.fn.combogrid.defaults,$.fn.combogrid.parseOptions(this),_b1a)});
}
_ae2(this);
});
};
$.fn.combogrid.methods={options:function(jq){
var _b1e=jq.combo("options");
return $.extend($.data(jq[0],"combogrid").options,{width:_b1e.width,height:_b1e.height,originalValue:_b1e.originalValue,disabled:_b1e.disabled,readonly:_b1e.readonly});
},cloneFrom:function(jq,from){
return jq.each(function(){
$(this).combo("cloneFrom",from);
$.data(this,"combogrid",{options:$.extend(true,{cloned:true},$(from).combogrid("options")),combo:$(this).next(),panel:$(from).combo("panel"),grid:$(from).combogrid("grid")});
});
},grid:function(jq){
return $.data(jq[0],"combogrid").grid;
},setValues:function(jq,_b1f){
return jq.each(function(){
var opts=$(this).combogrid("options");
if($.isArray(_b1f)){
_b1f=$.map(_b1f,function(_b20){
if(_b20&&typeof _b20=="object"){
$.easyui.addArrayItem(opts.mappingRows,opts.idField,_b20);
return _b20[opts.idField];
}else{
return _b20;
}
});
}
_af9(this,_b1f);
});
},setValue:function(jq,_b21){
return jq.each(function(){
$(this).combogrid("setValues",$.isArray(_b21)?_b21:[_b21]);
});
},clear:function(jq){
return jq.each(function(){
$(this).combogrid("setValues",[]);
});
},reset:function(jq){
return jq.each(function(){
var opts=$(this).combogrid("options");
if(opts.multiple){
$(this).combogrid("setValues",opts.originalValue);
}else{
$(this).combogrid("setValue",opts.originalValue);
}
});
}};
$.fn.combogrid.parseOptions=function(_b22){
var t=$(_b22);
return $.extend({},$.fn.combo.parseOptions(_b22),$.fn.datagrid.parseOptions(_b22),$.parser.parseOptions(_b22,["idField","textField","mode"]));
};
$.fn.combogrid.defaults=$.extend({},$.fn.combo.defaults,$.fn.datagrid.defaults,{loadMsg:null,idField:null,textField:null,unselectedValues:[],mappingRows:[],mode:"local",keyHandler:{up:function(e){
nav(this,"prev");
e.preventDefault();
},down:function(e){
nav(this,"next");
e.preventDefault();
},left:function(e){
},right:function(e){
},enter:function(e){
_b16(this);
},query:function(q,e){
_b0f(this,q);
}},inputEvents:$.extend({},$.fn.combo.defaults.inputEvents,{blur:function(e){
var _b23=e.data.target;
var opts=$(_b23).combogrid("options");
if(opts.reversed){
$(_b23).combogrid("setValues",$(_b23).combogrid("getValues"));
}
}}),filter:function(q,row){
var opts=$(this).combogrid("options");
return (row[opts.textField]||"").toLowerCase().indexOf(q.toLowerCase())>=0;
}});
})(jQuery);
(function($){
function _b24(_b25){
var _b26=$.data(_b25,"combotreegrid");
var opts=_b26.options;
$(_b25).addClass("combotreegrid-f").combo($.extend({},opts,{onShowPanel:function(){
var p=$(this).combotreegrid("panel");
var _b27=p.outerHeight()-p.height();
var _b28=p._size("minHeight");
var _b29=p._size("maxHeight");
var dg=$(this).combotreegrid("grid");
dg.treegrid("resize",{width:"100%",height:(isNaN(parseInt(opts.panelHeight))?"auto":"100%"),minHeight:(_b28?_b28-_b27:""),maxHeight:(_b29?_b29-_b27:"")});
var row=dg.treegrid("getSelected");
if(row){
dg.treegrid("scrollTo",row[opts.idField]);
}
opts.onShowPanel.call(this);
}}));
if(!_b26.grid){
var _b2a=$(_b25).combo("panel");
_b26.grid=$("<table></table>").appendTo(_b2a);
}
_b26.grid.treegrid($.extend({},opts,{border:false,checkbox:opts.multiple,onLoadSuccess:function(row,data){
var _b2b=$(_b25).combotreegrid("getValues");
if(opts.multiple){
$.map($(this).treegrid("getCheckedNodes"),function(row){
$.easyui.addArrayItem(_b2b,row[opts.idField]);
});
}
_b30(_b25,_b2b);
opts.onLoadSuccess.call(this,row,data);
_b26.remainText=false;
},onClickRow:function(row){
if(opts.multiple){
$(this).treegrid(row.checked?"uncheckNode":"checkNode",row[opts.idField]);
$(this).treegrid("unselect",row[opts.idField]);
}else{
$(_b25).combo("hidePanel");
}
_b2d(_b25);
opts.onClickRow.call(this,row);
},onCheckNode:function(row,_b2c){
_b2d(_b25);
opts.onCheckNode.call(this,row,_b2c);
}}));
};
function _b2d(_b2e){
var _b2f=$.data(_b2e,"combotreegrid");
var opts=_b2f.options;
var grid=_b2f.grid;
var vv=[];
if(opts.multiple){
vv=$.map(grid.treegrid("getCheckedNodes"),function(row){
return row[opts.idField];
});
}else{
var row=grid.treegrid("getSelected");
if(row){
vv.push(row[opts.idField]);
}
}
vv=vv.concat(opts.unselectedValues);
_b30(_b2e,vv);
};
function _b30(_b31,_b32){
var _b33=$.data(_b31,"combotreegrid");
var opts=_b33.options;
var grid=_b33.grid;
if(!$.isArray(_b32)){
_b32=_b32.split(opts.separator);
}
if(!opts.multiple){
_b32=_b32.length?[_b32[0]]:[""];
}
var vv=$.map(_b32,function(_b34){
return String(_b34);
});
vv=$.grep(vv,function(v,_b35){
return _b35===$.inArray(v,vv);
});
var _b36=grid.treegrid("getSelected");
if(_b36){
grid.treegrid("unselect",_b36[opts.idField]);
}
$.map(grid.treegrid("getCheckedNodes"),function(row){
if($.inArray(String(row[opts.idField]),vv)==-1){
grid.treegrid("uncheckNode",row[opts.idField]);
}
});
var ss=[];
opts.unselectedValues=[];
$.map(vv,function(v){
var row=grid.treegrid("find",v);
if(row){
if(opts.multiple){
grid.treegrid("checkNode",v);
}else{
grid.treegrid("select",v);
}
ss.push(_b37(row));
}else{
ss.push(_b38(v,opts.mappingRows)||v);
opts.unselectedValues.push(v);
}
});
if(opts.multiple){
$.map(grid.treegrid("getCheckedNodes"),function(row){
var id=String(row[opts.idField]);
if($.inArray(id,vv)==-1){
vv.push(id);
ss.push(_b37(row));
}
});
}
if(!_b33.remainText){
var s=ss.join(opts.separator);
if($(_b31).combo("getText")!=s){
$(_b31).combo("setText",s);
}
}
$(_b31).combo("setValues",vv);
function _b38(_b39,a){
var item=$.easyui.getArrayItem(a,opts.idField,_b39);
return item?_b37(item):undefined;
};
function _b37(row){
return row[opts.textField||""]||row[opts.treeField];
};
};
function _b3a(_b3b,q){
var _b3c=$.data(_b3b,"combotreegrid");
var opts=_b3c.options;
var grid=_b3c.grid;
_b3c.remainText=true;
grid.treegrid("clearSelections").treegrid("clearChecked").treegrid("highlightRow",-1);
if(opts.mode=="remote"){
$(_b3b).combotreegrid("clear");
grid.treegrid("load",$.extend({},opts.queryParams,{q:q}));
}else{
if(q){
var data=grid.treegrid("getData");
var vv=[];
var qq=opts.multiple?q.split(opts.separator):[q];
$.map(qq,function(q){
q=$.trim(q);
if(q){
var v=undefined;
$.easyui.forEach(data,true,function(row){
if(q.toLowerCase()==String(row[opts.treeField]).toLowerCase()){
v=row[opts.idField];
return false;
}else{
if(opts.filter.call(_b3b,q,row)){
grid.treegrid("expandTo",row[opts.idField]);
grid.treegrid("highlightRow",row[opts.idField]);
return false;
}
}
});
if(v==undefined){
$.easyui.forEach(opts.mappingRows,false,function(row){
if(q.toLowerCase()==String(row[opts.treeField])){
v=row[opts.idField];
return false;
}
});
}
if(v!=undefined){
vv.push(v);
}
}
});
_b30(_b3b,vv);
_b3c.remainText=false;
}
}
};
function _b3d(_b3e){
_b2d(_b3e);
};
$.fn.combotreegrid=function(_b3f,_b40){
if(typeof _b3f=="string"){
var _b41=$.fn.combotreegrid.methods[_b3f];
if(_b41){
return _b41(this,_b40);
}else{
return this.combo(_b3f,_b40);
}
}
_b3f=_b3f||{};
return this.each(function(){
var _b42=$.data(this,"combotreegrid");
if(_b42){
$.extend(_b42.options,_b3f);
}else{
_b42=$.data(this,"combotreegrid",{options:$.extend({},$.fn.combotreegrid.defaults,$.fn.combotreegrid.parseOptions(this),_b3f)});
}
_b24(this);
});
};
$.fn.combotreegrid.methods={options:function(jq){
var _b43=jq.combo("options");
return $.extend($.data(jq[0],"combotreegrid").options,{width:_b43.width,height:_b43.height,originalValue:_b43.originalValue,disabled:_b43.disabled,readonly:_b43.readonly});
},grid:function(jq){
return $.data(jq[0],"combotreegrid").grid;
},setValues:function(jq,_b44){
return jq.each(function(){
var opts=$(this).combotreegrid("options");
if($.isArray(_b44)){
_b44=$.map(_b44,function(_b45){
if(_b45&&typeof _b45=="object"){
$.easyui.addArrayItem(opts.mappingRows,opts.idField,_b45);
return _b45[opts.idField];
}else{
return _b45;
}
});
}
_b30(this,_b44);
});
},setValue:function(jq,_b46){
return jq.each(function(){
$(this).combotreegrid("setValues",$.isArray(_b46)?_b46:[_b46]);
});
},clear:function(jq){
return jq.each(function(){
$(this).combotreegrid("setValues",[]);
});
},reset:function(jq){
return jq.each(function(){
var opts=$(this).combotreegrid("options");
if(opts.multiple){
$(this).combotreegrid("setValues",opts.originalValue);
}else{
$(this).combotreegrid("setValue",opts.originalValue);
}
});
}};
$.fn.combotreegrid.parseOptions=function(_b47){
var t=$(_b47);
return $.extend({},$.fn.combo.parseOptions(_b47),$.fn.treegrid.parseOptions(_b47),$.parser.parseOptions(_b47,["mode",{limitToGrid:"boolean"}]));
};
$.fn.combotreegrid.defaults=$.extend({},$.fn.combo.defaults,$.fn.treegrid.defaults,{editable:false,singleSelect:true,limitToGrid:false,unselectedValues:[],mappingRows:[],mode:"local",textField:null,keyHandler:{up:function(e){
},down:function(e){
},left:function(e){
},right:function(e){
},enter:function(e){
_b3d(this);
},query:function(q,e){
_b3a(this,q);
}},inputEvents:$.extend({},$.fn.combo.defaults.inputEvents,{blur:function(e){
var _b48=e.data.target;
var opts=$(_b48).combotreegrid("options");
if(opts.limitToGrid){
_b3d(_b48);
}
}}),filter:function(q,row){
var opts=$(this).combotreegrid("options");
return (row[opts.treeField]||"").toLowerCase().indexOf(q.toLowerCase())>=0;
}});
})(jQuery);
(function($){
function _b49(_b4a){
var _b4b=$.data(_b4a,"tagbox");
var opts=_b4b.options;
$(_b4a).addClass("tagbox-f").combobox($.extend({},opts,{cls:"tagbox",reversed:true,onChange:function(_b4c,_b4d){
_b4e();
$(this).combobox("hidePanel");
opts.onChange.call(_b4a,_b4c,_b4d);
},onResizing:function(_b4f,_b50){
var _b51=$(this).combobox("textbox");
var tb=$(this).data("textbox").textbox;
tb.css({height:"",paddingLeft:_b51.css("marginLeft"),paddingRight:_b51.css("marginRight")});
_b51.css("margin",0);
tb._size({width:opts.width},$(this).parent());
_b64(_b4a);
_b56(this);
opts.onResizing.call(_b4a,_b4f,_b50);
},onLoadSuccess:function(data){
_b4e();
opts.onLoadSuccess.call(_b4a,data);
}}));
_b4e();
_b64(_b4a);
function _b4e(){
$(_b4a).next().find(".tagbox-label").remove();
var _b52=$(_b4a).tagbox("textbox");
var ss=[];
$.map($(_b4a).tagbox("getValues"),function(_b53,_b54){
var row=opts.finder.getRow(_b4a,_b53);
var text=opts.tagFormatter.call(_b4a,_b53,row);
var cs={};
var css=opts.tagStyler.call(_b4a,_b53,row)||"";
if(typeof css=="string"){
cs={s:css};
}else{
cs={c:css["class"]||"",s:css["style"]||""};
}
var _b55=$("<span class=\"tagbox-label\"></span>").insertBefore(_b52).html(text);
_b55.attr("tagbox-index",_b54);
_b55.attr("style",cs.s).addClass(cs.c);
$("<a href=\"javascript:;\" class=\"tagbox-remove\"></a>").appendTo(_b55);
});
_b56(_b4a);
$(_b4a).combobox("setText","");
};
};
function _b56(_b57,_b58){
var span=$(_b57).next();
var _b59=_b58?$(_b58):span.find(".tagbox-label");
if(_b59.length){
var _b5a=$(_b57).tagbox("textbox");
var _b5b=$(_b59[0]);
var _b5c=_b5b.outerHeight(true)-_b5b.outerHeight();
var _b5d=_b5a.outerHeight()-_b5c*2;
_b59.css({height:_b5d+"px",lineHeight:_b5d+"px"});
var _b5e=span.find(".textbox-addon").css("height","100%");
_b5e.find(".textbox-icon").css("height","100%");
span.find(".textbox-button").linkbutton("resize",{height:"100%"});
}
};
function _b5f(_b60){
var span=$(_b60).next();
span.unbind(".tagbox").bind("click.tagbox",function(e){
var opts=$(_b60).tagbox("options");
if(opts.disabled||opts.readonly){
return;
}
if($(e.target).hasClass("tagbox-remove")){
var _b61=parseInt($(e.target).parent().attr("tagbox-index"));
var _b62=$(_b60).tagbox("getValues");
if(opts.onBeforeRemoveTag.call(_b60,_b62[_b61])==false){
return;
}
opts.onRemoveTag.call(_b60,_b62[_b61]);
_b62.splice(_b61,1);
$(_b60).tagbox("setValues",_b62);
}else{
var _b63=$(e.target).closest(".tagbox-label");
if(_b63.length){
var _b61=parseInt(_b63.attr("tagbox-index"));
var _b62=$(_b60).tagbox("getValues");
opts.onClickTag.call(_b60,_b62[_b61]);
}
}
$(this).find(".textbox-text").focus();
}).bind("keyup.tagbox",function(e){
_b64(_b60);
}).bind("mouseover.tagbox",function(e){
if($(e.target).closest(".textbox-button,.textbox-addon,.tagbox-label").length){
$(this).triggerHandler("mouseleave");
}else{
$(this).find(".textbox-text").triggerHandler("mouseenter");
}
}).bind("mouseleave.tagbox",function(e){
$(this).find(".textbox-text").triggerHandler("mouseleave");
});
};
function _b64(_b65){
var opts=$(_b65).tagbox("options");
var _b66=$(_b65).tagbox("textbox");
var span=$(_b65).next();
var tmp=$("<span></span>").appendTo("body");
tmp.attr("style",_b66.attr("style"));
tmp.css({position:"absolute",top:-9999,left:-9999,width:"auto",fontFamily:_b66.css("fontFamily"),fontSize:_b66.css("fontSize"),fontWeight:_b66.css("fontWeight"),whiteSpace:"nowrap"});
var _b67=_b68(_b66.val());
var _b69=_b68(opts.prompt||"");
tmp.remove();
var _b6a=Math.min(Math.max(_b67,_b69)+20,span.width());
_b66._outerWidth(_b6a);
span.find(".textbox-button").linkbutton("resize",{height:"100%"});
function _b68(val){
var s=val.replace(/&/g,"&amp;").replace(/\s/g," ").replace(/</g,"&lt;").replace(/>/g,"&gt;");
tmp.html(s);
return tmp.outerWidth();
};
};
function _b6b(_b6c){
var t=$(_b6c);
var opts=t.tagbox("options");
if(opts.limitToList){
var _b6d=t.tagbox("panel");
var item=_b6d.children("div.combobox-item-hover");
if(item.length){
item.removeClass("combobox-item-hover");
var row=opts.finder.getRow(_b6c,item);
var _b6e=row[opts.valueField];
$(_b6c).tagbox(item.hasClass("combobox-item-selected")?"unselect":"select",_b6e);
}
$(_b6c).tagbox("hidePanel");
}else{
var v=$.trim($(_b6c).tagbox("getText"));
if(v!==""){
var _b6f=$(_b6c).tagbox("getValues");
_b6f.push(v);
$(_b6c).tagbox("setValues",_b6f);
}
}
};
function _b70(_b71,_b72){
$(_b71).combobox("setText","");
_b64(_b71);
$(_b71).combobox("setValues",_b72);
$(_b71).combobox("setText","");
$(_b71).tagbox("validate");
};
$.fn.tagbox=function(_b73,_b74){
if(typeof _b73=="string"){
var _b75=$.fn.tagbox.methods[_b73];
if(_b75){
return _b75(this,_b74);
}else{
return this.combobox(_b73,_b74);
}
}
_b73=_b73||{};
return this.each(function(){
var _b76=$.data(this,"tagbox");
if(_b76){
$.extend(_b76.options,_b73);
}else{
$.data(this,"tagbox",{options:$.extend({},$.fn.tagbox.defaults,$.fn.tagbox.parseOptions(this),_b73)});
}
_b49(this);
_b5f(this);
});
};
$.fn.tagbox.methods={options:function(jq){
var _b77=jq.combobox("options");
return $.extend($.data(jq[0],"tagbox").options,{width:_b77.width,height:_b77.height,originalValue:_b77.originalValue,disabled:_b77.disabled,readonly:_b77.readonly});
},setValues:function(jq,_b78){
return jq.each(function(){
_b70(this,_b78);
});
}};
$.fn.tagbox.parseOptions=function(_b79){
return $.extend({},$.fn.combobox.parseOptions(_b79),$.parser.parseOptions(_b79,[]));
};
$.fn.tagbox.defaults=$.extend({},$.fn.combobox.defaults,{hasDownArrow:false,multiple:true,reversed:true,selectOnNavigation:false,tipOptions:$.extend({},$.fn.textbox.defaults.tipOptions,{showDelay:200}),val:function(_b7a){
var vv=$(_b7a).parent().prev().tagbox("getValues");
if($(_b7a).is(":focus")){
vv.push($(_b7a).val());
}
return vv.join(",");
},inputEvents:$.extend({},$.fn.combo.defaults.inputEvents,{blur:function(e){
var _b7b=e.data.target;
var opts=$(_b7b).tagbox("options");
if(opts.limitToList){
_b6b(_b7b);
}
}}),keyHandler:$.extend({},$.fn.combobox.defaults.keyHandler,{enter:function(e){
_b6b(this);
},query:function(q,e){
var opts=$(this).tagbox("options");
if(opts.limitToList){
$.fn.combobox.defaults.keyHandler.query.call(this,q,e);
}else{
$(this).combobox("hidePanel");
}
}}),tagFormatter:function(_b7c,row){
var opts=$(this).tagbox("options");
return row?row[opts.textField]:_b7c;
},tagStyler:function(_b7d,row){
return "";
},onClickTag:function(_b7e){
},onBeforeRemoveTag:function(_b7f){
},onRemoveTag:function(_b80){
}});
})(jQuery);
(function($){
function _b81(_b82){
var _b83=$.data(_b82,"datebox");
var opts=_b83.options;
$(_b82).addClass("datebox-f").combo($.extend({},opts,{onShowPanel:function(){
_b84(this);
_b85(this);
_b86(this);
_b94(this,$(this).datebox("getText"),true);
opts.onShowPanel.call(this);
}}));
if(!_b83.calendar){
var _b87=$(_b82).combo("panel").css("overflow","hidden");
_b87.panel("options").onBeforeDestroy=function(){
var c=$(this).find(".calendar-shared");
if(c.length){
c.insertBefore(c[0].pholder);
}
};
var cc=$("<div class=\"datebox-calendar-inner\"></div>").prependTo(_b87);
if(opts.sharedCalendar){
var c=$(opts.sharedCalendar);
if(!c[0].pholder){
c[0].pholder=$("<div class=\"calendar-pholder\" style=\"display:none\"></div>").insertAfter(c);
}
c.addClass("calendar-shared").appendTo(cc);
if(!c.hasClass("calendar")){
c.calendar();
}
_b83.calendar=c;
}else{
_b83.calendar=$("<div></div>").appendTo(cc).calendar();
}
$.extend(_b83.calendar.calendar("options"),{fit:true,border:false,onSelect:function(date){
var _b88=this.target;
var opts=$(_b88).datebox("options");
_b94(_b88,opts.formatter.call(_b88,date));
$(_b88).combo("hidePanel");
opts.onSelect.call(_b88,date);
}});
}
$(_b82).combo("textbox").parent().addClass("datebox");
$(_b82).datebox("initValue",opts.value);
function _b84(_b89){
var opts=$(_b89).datebox("options");
var _b8a=$(_b89).combo("panel");
_b8a.unbind(".datebox").bind("click.datebox",function(e){
if($(e.target).hasClass("datebox-button-a")){
var _b8b=parseInt($(e.target).attr("datebox-button-index"));
opts.buttons[_b8b].handler.call(e.target,_b89);
}
});
};
function _b85(_b8c){
var _b8d=$(_b8c).combo("panel");
if(_b8d.children("div.datebox-button").length){
return;
}
var _b8e=$("<div class=\"datebox-button\"><table cellspacing=\"0\" cellpadding=\"0\" style=\"width:100%\"><tr></tr></table></div>").appendTo(_b8d);
var tr=_b8e.find("tr");
for(var i=0;i<opts.buttons.length;i++){
var td=$("<td></td>").appendTo(tr);
var btn=opts.buttons[i];
var t=$("<a class=\"datebox-button-a\" href=\"javascript:;\"></a>").html($.isFunction(btn.text)?btn.text(_b8c):btn.text).appendTo(td);
t.attr("datebox-button-index",i);
}
tr.find("td").css("width",(100/opts.buttons.length)+"%");
};
function _b86(_b8f){
var _b90=$(_b8f).combo("panel");
var cc=_b90.children("div.datebox-calendar-inner");
_b90.children()._outerWidth(_b90.width());
_b83.calendar.appendTo(cc);
_b83.calendar[0].target=_b8f;
if(opts.panelHeight!="auto"){
var _b91=_b90.height();
_b90.children().not(cc).each(function(){
_b91-=$(this).outerHeight();
});
cc._outerHeight(_b91);
}
_b83.calendar.calendar("resize");
};
};
function _b92(_b93,q){
_b94(_b93,q,true);
};
function _b95(_b96){
var _b97=$.data(_b96,"datebox");
var opts=_b97.options;
var _b98=_b97.calendar.calendar("options").current;
if(_b98){
_b94(_b96,opts.formatter.call(_b96,_b98));
$(_b96).combo("hidePanel");
}
};
function _b94(_b99,_b9a,_b9b){
var _b9c=$.data(_b99,"datebox");
var opts=_b9c.options;
var _b9d=_b9c.calendar;
_b9d.calendar("moveTo",opts.parser.call(_b99,_b9a));
if(_b9b){
$(_b99).combo("setValue",_b9a);
}else{
if(_b9a){
_b9a=opts.formatter.call(_b99,_b9d.calendar("options").current);
}
$(_b99).combo("setText",_b9a).combo("setValue",_b9a);
}
};
$.fn.datebox=function(_b9e,_b9f){
if(typeof _b9e=="string"){
var _ba0=$.fn.datebox.methods[_b9e];
if(_ba0){
return _ba0(this,_b9f);
}else{
return this.combo(_b9e,_b9f);
}
}
_b9e=_b9e||{};
return this.each(function(){
var _ba1=$.data(this,"datebox");
if(_ba1){
$.extend(_ba1.options,_b9e);
}else{
$.data(this,"datebox",{options:$.extend({},$.fn.datebox.defaults,$.fn.datebox.parseOptions(this),_b9e)});
}
_b81(this);
});
};
$.fn.datebox.methods={options:function(jq){
var _ba2=jq.combo("options");
return $.extend($.data(jq[0],"datebox").options,{width:_ba2.width,height:_ba2.height,originalValue:_ba2.originalValue,disabled:_ba2.disabled,readonly:_ba2.readonly});
},cloneFrom:function(jq,from){
return jq.each(function(){
$(this).combo("cloneFrom",from);
$.data(this,"datebox",{options:$.extend(true,{},$(from).datebox("options")),calendar:$(from).datebox("calendar")});
$(this).addClass("datebox-f");
});
},calendar:function(jq){
return $.data(jq[0],"datebox").calendar;
},initValue:function(jq,_ba3){
return jq.each(function(){
var opts=$(this).datebox("options");
var _ba4=opts.value;
if(_ba4){
_ba4=opts.formatter.call(this,opts.parser.call(this,_ba4));
}
$(this).combo("initValue",_ba4).combo("setText",_ba4);
});
},setValue:function(jq,_ba5){
return jq.each(function(){
_b94(this,_ba5);
});
},reset:function(jq){
return jq.each(function(){
var opts=$(this).datebox("options");
$(this).datebox("setValue",opts.originalValue);
});
}};
$.fn.datebox.parseOptions=function(_ba6){
return $.extend({},$.fn.combo.parseOptions(_ba6),$.parser.parseOptions(_ba6,["sharedCalendar"]));
};
$.fn.datebox.defaults=$.extend({},$.fn.combo.defaults,{panelWidth:180,panelHeight:"auto",sharedCalendar:null,keyHandler:{up:function(e){
},down:function(e){
},left:function(e){
},right:function(e){
},enter:function(e){
_b95(this);
},query:function(q,e){
_b92(this,q);
}},currentText:"Today",closeText:"Close",okText:"Ok",buttons:[{text:function(_ba7){
return $(_ba7).datebox("options").currentText;
},handler:function(_ba8){
var now=new Date();
$(_ba8).datebox("calendar").calendar({year:now.getFullYear(),month:now.getMonth()+1,current:new Date(now.getFullYear(),now.getMonth(),now.getDate())});
_b95(_ba8);
}},{text:function(_ba9){
return $(_ba9).datebox("options").closeText;
},handler:function(_baa){
$(this).closest("div.combo-panel").panel("close");
}}],formatter:function(date){
var y=date.getFullYear();
var m=date.getMonth()+1;
var d=date.getDate();
return (m<10?("0"+m):m)+"/"+(d<10?("0"+d):d)+"/"+y;
},parser:function(s){
if(!s){
return new Date();
}
var ss=s.split("/");
var m=parseInt(ss[0],10);
var d=parseInt(ss[1],10);
var y=parseInt(ss[2],10);
if(!isNaN(y)&&!isNaN(m)&&!isNaN(d)){
return new Date(y,m-1,d);
}else{
return new Date();
}
},onSelect:function(date){
}});
})(jQuery);
(function($){
function _bab(_bac){
var _bad=$.data(_bac,"datetimebox");
var opts=_bad.options;
$(_bac).datebox($.extend({},opts,{onShowPanel:function(){
var _bae=$(this).datetimebox("getValue");
_bb4(this,_bae,true);
opts.onShowPanel.call(this);
},formatter:$.fn.datebox.defaults.formatter,parser:$.fn.datebox.defaults.parser}));
$(_bac).removeClass("datebox-f").addClass("datetimebox-f");
$(_bac).datebox("calendar").calendar({onSelect:function(date){
opts.onSelect.call(this.target,date);
}});
if(!_bad.spinner){
var _baf=$(_bac).datebox("panel");
var p=$("<div style=\"padding:2px\"><input></div>").insertAfter(_baf.children("div.datebox-calendar-inner"));
_bad.spinner=p.children("input");
}
_bad.spinner.timespinner({width:opts.spinnerWidth,showSeconds:opts.showSeconds,separator:opts.timeSeparator});
$(_bac).datetimebox("initValue",opts.value);
};
function _bb0(_bb1){
var c=$(_bb1).datetimebox("calendar");
var t=$(_bb1).datetimebox("spinner");
var date=c.calendar("options").current;
return new Date(date.getFullYear(),date.getMonth(),date.getDate(),t.timespinner("getHours"),t.timespinner("getMinutes"),t.timespinner("getSeconds"));
};
function _bb2(_bb3,q){
_bb4(_bb3,q,true);
};
function _bb5(_bb6){
var opts=$.data(_bb6,"datetimebox").options;
var date=_bb0(_bb6);
_bb4(_bb6,opts.formatter.call(_bb6,date));
$(_bb6).combo("hidePanel");
};
function _bb4(_bb7,_bb8,_bb9){
var opts=$.data(_bb7,"datetimebox").options;
$(_bb7).combo("setValue",_bb8);
if(!_bb9){
if(_bb8){
var date=opts.parser.call(_bb7,_bb8);
$(_bb7).combo("setText",opts.formatter.call(_bb7,date));
$(_bb7).combo("setValue",opts.formatter.call(_bb7,date));
}else{
$(_bb7).combo("setText",_bb8);
}
}
var date=opts.parser.call(_bb7,_bb8);
$(_bb7).datetimebox("calendar").calendar("moveTo",date);
$(_bb7).datetimebox("spinner").timespinner("setValue",_bba(date));
function _bba(date){
function _bbb(_bbc){
return (_bbc<10?"0":"")+_bbc;
};
var tt=[_bbb(date.getHours()),_bbb(date.getMinutes())];
if(opts.showSeconds){
tt.push(_bbb(date.getSeconds()));
}
return tt.join($(_bb7).datetimebox("spinner").timespinner("options").separator);
};
};
$.fn.datetimebox=function(_bbd,_bbe){
if(typeof _bbd=="string"){
var _bbf=$.fn.datetimebox.methods[_bbd];
if(_bbf){
return _bbf(this,_bbe);
}else{
return this.datebox(_bbd,_bbe);
}
}
_bbd=_bbd||{};
return this.each(function(){
var _bc0=$.data(this,"datetimebox");
if(_bc0){
$.extend(_bc0.options,_bbd);
}else{
$.data(this,"datetimebox",{options:$.extend({},$.fn.datetimebox.defaults,$.fn.datetimebox.parseOptions(this),_bbd)});
}
_bab(this);
});
};
$.fn.datetimebox.methods={options:function(jq){
var _bc1=jq.datebox("options");
return $.extend($.data(jq[0],"datetimebox").options,{originalValue:_bc1.originalValue,disabled:_bc1.disabled,readonly:_bc1.readonly});
},cloneFrom:function(jq,from){
return jq.each(function(){
$(this).datebox("cloneFrom",from);
$.data(this,"datetimebox",{options:$.extend(true,{},$(from).datetimebox("options")),spinner:$(from).datetimebox("spinner")});
$(this).removeClass("datebox-f").addClass("datetimebox-f");
});
},spinner:function(jq){
return $.data(jq[0],"datetimebox").spinner;
},initValue:function(jq,_bc2){
return jq.each(function(){
var opts=$(this).datetimebox("options");
var _bc3=opts.value;
if(_bc3){
_bc3=opts.formatter.call(this,opts.parser.call(this,_bc3));
}
$(this).combo("initValue",_bc3).combo("setText",_bc3);
});
},setValue:function(jq,_bc4){
return jq.each(function(){
_bb4(this,_bc4);
});
},reset:function(jq){
return jq.each(function(){
var opts=$(this).datetimebox("options");
$(this).datetimebox("setValue",opts.originalValue);
});
}};
$.fn.datetimebox.parseOptions=function(_bc5){
var t=$(_bc5);
return $.extend({},$.fn.datebox.parseOptions(_bc5),$.parser.parseOptions(_bc5,["timeSeparator","spinnerWidth",{showSeconds:"boolean"}]));
};
$.fn.datetimebox.defaults=$.extend({},$.fn.datebox.defaults,{spinnerWidth:"100%",showSeconds:true,timeSeparator:":",keyHandler:{up:function(e){
},down:function(e){
},left:function(e){
},right:function(e){
},enter:function(e){
_bb5(this);
},query:function(q,e){
_bb2(this,q);
}},buttons:[{text:function(_bc6){
return $(_bc6).datetimebox("options").currentText;
},handler:function(_bc7){
var opts=$(_bc7).datetimebox("options");
_bb4(_bc7,opts.formatter.call(_bc7,new Date()));
$(_bc7).datetimebox("hidePanel");
}},{text:function(_bc8){
return $(_bc8).datetimebox("options").okText;
},handler:function(_bc9){
_bb5(_bc9);
}},{text:function(_bca){
return $(_bca).datetimebox("options").closeText;
},handler:function(_bcb){
$(_bcb).datetimebox("hidePanel");
}}],formatter:function(date){
var h=date.getHours();
var M=date.getMinutes();
var s=date.getSeconds();
function _bcc(_bcd){
return (_bcd<10?"0":"")+_bcd;
};
var _bce=$(this).datetimebox("spinner").timespinner("options").separator;
var r=$.fn.datebox.defaults.formatter(date)+" "+_bcc(h)+_bce+_bcc(M);
if($(this).datetimebox("options").showSeconds){
r+=_bce+_bcc(s);
}
return r;
},parser:function(s){
if($.trim(s)==""){
return new Date();
}
var dt=s.split(" ");
var d=$.fn.datebox.defaults.parser(dt[0]);
if(dt.length<2){
return d;
}
var _bcf=$(this).datetimebox("spinner").timespinner("options").separator;
var tt=dt[1].split(_bcf);
var hour=parseInt(tt[0],10)||0;
var _bd0=parseInt(tt[1],10)||0;
var _bd1=parseInt(tt[2],10)||0;
return new Date(d.getFullYear(),d.getMonth(),d.getDate(),hour,_bd0,_bd1);
}});
})(jQuery);
(function($){
function init(_bd2){
var _bd3=$("<div class=\"slider\">"+"<div class=\"slider-inner\">"+"<a href=\"javascript:;\" class=\"slider-handle\"></a>"+"<span class=\"slider-tip\"></span>"+"</div>"+"<div class=\"slider-rule\"></div>"+"<div class=\"slider-rulelabel\"></div>"+"<div style=\"clear:both\"></div>"+"<input type=\"hidden\" class=\"slider-value\">"+"</div>").insertAfter(_bd2);
var t=$(_bd2);
t.addClass("slider-f").hide();
var name=t.attr("name");
if(name){
_bd3.find("input.slider-value").attr("name",name);
t.removeAttr("name").attr("sliderName",name);
}
_bd3.bind("_resize",function(e,_bd4){
if($(this).hasClass("easyui-fluid")||_bd4){
_bd5(_bd2);
}
return false;
});
return _bd3;
};
function _bd5(_bd6,_bd7){
var _bd8=$.data(_bd6,"slider");
var opts=_bd8.options;
var _bd9=_bd8.slider;
if(_bd7){
if(_bd7.width){
opts.width=_bd7.width;
}
if(_bd7.height){
opts.height=_bd7.height;
}
}
_bd9._size(opts);
if(opts.mode=="h"){
_bd9.css("height","");
_bd9.children("div").css("height","");
}else{
_bd9.css("width","");
_bd9.children("div").css("width","");
_bd9.children("div.slider-rule,div.slider-rulelabel,div.slider-inner")._outerHeight(_bd9._outerHeight());
}
_bda(_bd6);
};
function _bdb(_bdc){
var _bdd=$.data(_bdc,"slider");
var opts=_bdd.options;
var _bde=_bdd.slider;
var aa=opts.mode=="h"?opts.rule:opts.rule.slice(0).reverse();
if(opts.reversed){
aa=aa.slice(0).reverse();
}
_bdf(aa);
function _bdf(aa){
var rule=_bde.find("div.slider-rule");
var _be0=_bde.find("div.slider-rulelabel");
rule.empty();
_be0.empty();
for(var i=0;i<aa.length;i++){
var _be1=i*100/(aa.length-1)+"%";
var span=$("<span></span>").appendTo(rule);
span.css((opts.mode=="h"?"left":"top"),_be1);
if(aa[i]!="|"){
span=$("<span></span>").appendTo(_be0);
span.html(aa[i]);
if(opts.mode=="h"){
span.css({left:_be1,marginLeft:-Math.round(span.outerWidth()/2)});
}else{
span.css({top:_be1,marginTop:-Math.round(span.outerHeight()/2)});
}
}
}
};
};
function _be2(_be3){
var _be4=$.data(_be3,"slider");
var opts=_be4.options;
var _be5=_be4.slider;
_be5.removeClass("slider-h slider-v slider-disabled");
_be5.addClass(opts.mode=="h"?"slider-h":"slider-v");
_be5.addClass(opts.disabled?"slider-disabled":"");
var _be6=_be5.find(".slider-inner");
_be6.html("<a href=\"javascript:;\" class=\"slider-handle\"></a>"+"<span class=\"slider-tip\"></span>");
if(opts.range){
_be6.append("<a href=\"javascript:;\" class=\"slider-handle\"></a>"+"<span class=\"slider-tip\"></span>");
}
_be5.find("a.slider-handle").draggable({axis:opts.mode,cursor:"pointer",disabled:opts.disabled,onDrag:function(e){
var left=e.data.left;
var _be7=_be5.width();
if(opts.mode!="h"){
left=e.data.top;
_be7=_be5.height();
}
if(left<0||left>_be7){
return false;
}else{
_be8(left,this);
return false;
}
},onStartDrag:function(){
_be4.isDragging=true;
opts.onSlideStart.call(_be3,opts.value);
},onStopDrag:function(e){
_be8(opts.mode=="h"?e.data.left:e.data.top,this);
opts.onSlideEnd.call(_be3,opts.value);
opts.onComplete.call(_be3,opts.value);
_be4.isDragging=false;
}});
_be5.find("div.slider-inner").unbind(".slider").bind("mousedown.slider",function(e){
if(_be4.isDragging||opts.disabled){
return;
}
var pos=$(this).offset();
_be8(opts.mode=="h"?(e.pageX-pos.left):(e.pageY-pos.top));
opts.onComplete.call(_be3,opts.value);
});
function _be8(pos,_be9){
var _bea=_beb(_be3,pos);
var s=Math.abs(_bea%opts.step);
if(s<opts.step/2){
_bea-=s;
}else{
_bea=_bea-s+opts.step;
}
if(opts.range){
var v1=opts.value[0];
var v2=opts.value[1];
var m=parseFloat((v1+v2)/2);
if(_be9){
var _bec=$(_be9).nextAll(".slider-handle").length>0;
if(_bea<=v2&&_bec){
v1=_bea;
}else{
if(_bea>=v1&&(!_bec)){
v2=_bea;
}
}
}else{
if(_bea<v1){
v1=_bea;
}else{
if(_bea>v2){
v2=_bea;
}else{
_bea<m?v1=_bea:v2=_bea;
}
}
}
$(_be3).slider("setValues",[v1,v2]);
}else{
$(_be3).slider("setValue",_bea);
}
};
};
function _bed(_bee,_bef){
var _bf0=$.data(_bee,"slider");
var opts=_bf0.options;
var _bf1=_bf0.slider;
var _bf2=$.isArray(opts.value)?opts.value:[opts.value];
var _bf3=[];
if(!$.isArray(_bef)){
_bef=$.map(String(_bef).split(opts.separator),function(v){
return parseFloat(v);
});
}
_bf1.find(".slider-value").remove();
var name=$(_bee).attr("sliderName")||"";
for(var i=0;i<_bef.length;i++){
var _bf4=_bef[i];
if(_bf4<opts.min){
_bf4=opts.min;
}
if(_bf4>opts.max){
_bf4=opts.max;
}
var _bf5=$("<input type=\"hidden\" class=\"slider-value\">").appendTo(_bf1);
_bf5.attr("name",name);
_bf5.val(_bf4);
_bf3.push(_bf4);
var _bf6=_bf1.find(".slider-handle:eq("+i+")");
var tip=_bf6.next();
var pos=_bf7(_bee,_bf4);
if(opts.showTip){
tip.show();
tip.html(opts.tipFormatter.call(_bee,_bf4));
}else{
tip.hide();
}
if(opts.mode=="h"){
var _bf8="left:"+pos+"px;";
_bf6.attr("style",_bf8);
tip.attr("style",_bf8+"margin-left:"+(-Math.round(tip.outerWidth()/2))+"px");
}else{
var _bf8="top:"+pos+"px;";
_bf6.attr("style",_bf8);
tip.attr("style",_bf8+"margin-left:"+(-Math.round(tip.outerWidth()))+"px");
}
}
opts.value=opts.range?_bf3:_bf3[0];
$(_bee).val(opts.range?_bf3.join(opts.separator):_bf3[0]);
if(_bf2.join(",")!=_bf3.join(",")){
opts.onChange.call(_bee,opts.value,(opts.range?_bf2:_bf2[0]));
}
};
function _bda(_bf9){
var opts=$.data(_bf9,"slider").options;
var fn=opts.onChange;
opts.onChange=function(){
};
_bed(_bf9,opts.value);
opts.onChange=fn;
};
function _bf7(_bfa,_bfb){
var _bfc=$.data(_bfa,"slider");
var opts=_bfc.options;
var _bfd=_bfc.slider;
var size=opts.mode=="h"?_bfd.width():_bfd.height();
var pos=opts.converter.toPosition.call(_bfa,_bfb,size);
if(opts.mode=="v"){
pos=_bfd.height()-pos;
}
if(opts.reversed){
pos=size-pos;
}
return pos.toFixed(0);
};
function _beb(_bfe,pos){
var _bff=$.data(_bfe,"slider");
var opts=_bff.options;
var _c00=_bff.slider;
var size=opts.mode=="h"?_c00.width():_c00.height();
var pos=opts.mode=="h"?(opts.reversed?(size-pos):pos):(opts.reversed?pos:(size-pos));
var _c01=opts.converter.toValue.call(_bfe,pos,size);
return _c01.toFixed(0);
};
$.fn.slider=function(_c02,_c03){
if(typeof _c02=="string"){
return $.fn.slider.methods[_c02](this,_c03);
}
_c02=_c02||{};
return this.each(function(){
var _c04=$.data(this,"slider");
if(_c04){
$.extend(_c04.options,_c02);
}else{
_c04=$.data(this,"slider",{options:$.extend({},$.fn.slider.defaults,$.fn.slider.parseOptions(this),_c02),slider:init(this)});
$(this).removeAttr("disabled");
}
var opts=_c04.options;
opts.min=parseFloat(opts.min);
opts.max=parseFloat(opts.max);
if(opts.range){
if(!$.isArray(opts.value)){
opts.value=$.map(String(opts.value).split(opts.separator),function(v){
return parseFloat(v);
});
}
if(opts.value.length<2){
opts.value.push(opts.max);
}
}else{
opts.value=parseFloat(opts.value);
}
opts.step=parseFloat(opts.step);
opts.originalValue=opts.value;
_be2(this);
_bdb(this);
_bd5(this);
});
};
$.fn.slider.methods={options:function(jq){
return $.data(jq[0],"slider").options;
},destroy:function(jq){
return jq.each(function(){
$.data(this,"slider").slider.remove();
$(this).remove();
});
},resize:function(jq,_c05){
return jq.each(function(){
_bd5(this,_c05);
});
},getValue:function(jq){
return jq.slider("options").value;
},getValues:function(jq){
return jq.slider("options").value;
},setValue:function(jq,_c06){
return jq.each(function(){
_bed(this,[_c06]);
});
},setValues:function(jq,_c07){
return jq.each(function(){
_bed(this,_c07);
});
},clear:function(jq){
return jq.each(function(){
var opts=$(this).slider("options");
_bed(this,opts.range?[opts.min,opts.max]:[opts.min]);
});
},reset:function(jq){
return jq.each(function(){
var opts=$(this).slider("options");
$(this).slider(opts.range?"setValues":"setValue",opts.originalValue);
});
},enable:function(jq){
return jq.each(function(){
$.data(this,"slider").options.disabled=false;
_be2(this);
});
},disable:function(jq){
return jq.each(function(){
$.data(this,"slider").options.disabled=true;
_be2(this);
});
}};
$.fn.slider.parseOptions=function(_c08){
var t=$(_c08);
return $.extend({},$.parser.parseOptions(_c08,["width","height","mode",{reversed:"boolean",showTip:"boolean",range:"boolean",min:"number",max:"number",step:"number"}]),{value:(t.val()||undefined),disabled:(t.attr("disabled")?true:undefined),rule:(t.attr("rule")?eval(t.attr("rule")):undefined)});
};
$.fn.slider.defaults={width:"auto",height:"auto",mode:"h",reversed:false,showTip:false,disabled:false,range:false,value:0,separator:",",min:0,max:100,step:1,rule:[],tipFormatter:function(_c09){
return _c09;
},converter:{toPosition:function(_c0a,size){
var opts=$(this).slider("options");
return (_c0a-opts.min)/(opts.max-opts.min)*size;
},toValue:function(pos,size){
var opts=$(this).slider("options");
return opts.min+(opts.max-opts.min)*(pos/size);
}},onChange:function(_c0b,_c0c){
},onSlideStart:function(_c0d){
},onSlideEnd:function(_c0e){
},onComplete:function(_c0f){
}};
})(jQuery);

;(function($){
	function getPluginName(target){
		if ($(target).data('treegrid')){
			return 'treegrid';
		} else {
			return 'datagrid';
		}
	}

	var autoSizeColumn1 = $.fn.datagrid.methods.autoSizeColumn;
	var loadDataMethod1 = $.fn.datagrid.methods.loadData;
	var appendMethod1 = $.fn.datagrid.methods.appendRow;
	var deleteMethod1 = $.fn.datagrid.methods.deleteRow;
	$.extend($.fn.datagrid.methods, {
		autoSizeColumn: function(jq, field){
			return jq.each(function(){
				var fc = $(this).datagrid('getPanel').find('.datagrid-header .datagrid-filter-c');
				fc.hide();
				autoSizeColumn1.call($.fn.datagrid.methods, $(this), field);
				fc.show();
				resizeFilter(this, field);
			});
		},
		loadData: function(jq, data){
			jq.each(function(){
				$.data(this, 'datagrid').filterSource = null;
			});
			return loadDataMethod1.call($.fn.datagrid.methods, jq, data);
		},
		appendRow: function(jq, row){
			var result = appendMethod1.call($.fn.datagrid.methods, jq, row);
			jq.each(function(){
				var state = $(this).data('datagrid');
				if (state.filterSource){
					state.filterSource.total++;
					if (state.filterSource.rows != state.data.rows){
						state.filterSource.rows.push(row);
					}
				}
			});
			return result;
		},
		deleteRow: function(jq, index){
			jq.each(function(){
				var state = $(this).data('datagrid');
				var opts = state.options;
				if (state.filterSource && opts.idField){
					if (state.filterSource.rows == state.data.rows){
						state.filterSource.total--;
					} else {
						for(var i=0; i<state.filterSource.rows.length; i++){
							var row = state.filterSource.rows[i];
							if (row[opts.idField] == state.data.rows[index][opts.idField]){
								state.filterSource.rows.splice(i,1);
								state.filterSource.total--;
								break;
							}
						}
					}
				}
			});
			return deleteMethod1.call($.fn.datagrid.methods, jq, index);		
		}
	});

	var loadDataMethod2 = $.fn.treegrid.methods.loadData;
	var appendMethod2 = $.fn.treegrid.methods.append;
	var insertMethod2 = $.fn.treegrid.methods.insert;
	var removeMethod2 = $.fn.treegrid.methods.remove;
	$.extend($.fn.treegrid.methods, {
		loadData: function(jq, data){
			jq.each(function(){
				$.data(this, 'treegrid').filterSource = null;
			});
			return loadDataMethod2.call($.fn.treegrid.methods, jq, data);
		},
		append: function(jq, param){
			return jq.each(function(){
				var state = $(this).data('treegrid');
				var opts = state.options;
				if (opts.oldLoadFilter){
					var rows = translateTreeData(this, param.data, param.parent);
					state.filterSource.total += rows.length;
					state.filterSource.rows = state.filterSource.rows.concat(rows);
					$(this).treegrid('loadData', state.filterSource)
				} else {
					appendMethod2($(this), param);
				}
			});
		},
		insert: function(jq, param){
			return jq.each(function(){
				var state = $(this).data('treegrid');
				var opts = state.options;
				if (opts.oldLoadFilter){
					var ref = param.before || param.after;
					var index = getNodeIndex(param.before || param.after);
					var pid = index>=0 ? state.filterSource.rows[index]._parentId : null;
					var rows = translateTreeData(this, [param.data], pid);
					var newRows = state.filterSource.rows.splice(0, index>=0 ? (param.before ? index : index+1) : (state.filterSource.rows.length));
					newRows = newRows.concat(rows);
					newRows = newRows.concat(state.filterSource.rows);
					state.filterSource.total += rows.length;
					state.filterSource.rows = newRows;
					$(this).treegrid('loadData', state.filterSource);

					//noinspection JSAnnotator
					function getNodeIndex(id){
						var rows = state.filterSource.rows;
						for(var i=0; i<rows.length; i++){
							if (rows[i][opts.idField] == id){
								return i;
							}
						}
						return -1;
					}
				} else {
					insertMethod2($(this), param);
				}
			});
		},
		remove: function(jq, id){
			jq.each(function(){
				var state = $(this).data('treegrid');
				if (state.filterSource){
					var opts = state.options;
					var rows = state.filterSource.rows;
					for(var i=0; i<rows.length; i++){
						if (rows[i][opts.idField] == id){
							rows.splice(i, 1);
							state.filterSource.total--;
							break;
						}
					}
				}
			});
			return removeMethod2(jq, id);
		}
	});

	var extendedOptions = {
		filterMenuIconCls: 'icon-ok',
		filterBtnIconCls: 'icon-filter',
		filterBtnPosition: 'right',
		filterPosition: 'bottom',
		remoteFilter: false,
		showFilterBar: true,
		filterDelay: 400,
		filterRules: [],
		// specify whether the filtered records need to match ALL or ANY of the applied filters
		filterMatchingType: 'all',	// possible values: 'all','any'
		// filterCache: {},
		filterMatcher: function(data){
			var name = getPluginName(this);
			var dg = $(this);
			var state = $.data(this, name);
			var opts = state.options;
			if (opts.filterRules.length){
				var rows = [];
				if (name == 'treegrid'){
					var rr = {};
					$.map(data.rows, function(row){
						if (isMatch(row, row[opts.idField])){
							rr[row[opts.idField]] = row;
							row = getRow(data.rows, row._parentId);
							while(row){
								rr[row[opts.idField]] = row;
								row = getRow(data.rows, row._parentId);
							}
						}
					});
					for(var id in rr){
						rows.push(rr[id]);
					}
				} else {
					for(var i=0; i<data.rows.length; i++){
						var row = data.rows[i];
						if (isMatch(row, i)){
							rows.push(row);
						}
					}
				}
				data = {
					total: data.total - (data.rows.length - rows.length),
					rows: rows
				};
			}
			return data;
			
			function isMatch(row, index){
				var rules = opts.filterRules;
				if (!rules.length){return true;}
				for(var i=0; i<rules.length; i++){
					var rule = rules[i];
					var source = row[rule.field];
					var col = dg.datagrid('getColumnOption', rule.field);
					if (col && col.formatter){
						source = col.formatter(row[rule.field], row, index);
					}
					if (source == undefined){
						source = '';
					}
					var op = opts.operators[rule.op];
					// if (!op.isMatch(source, rule.value)){return false}
					var matched = op.isMatch(source, rule.value);
					if (opts.filterMatchingType == 'any'){
						if (matched){return true;}
					} else {
						if (!matched){return false;}
					}
				}
				return opts.filterMatchingType == 'all';
			}
			function getRow(rows, id){
				for(var i=0; i<rows.length; i++){
					var row = rows[i];
					if (row[opts.idField] == id){
						return row;
					}
				}
				return null;
			}
		},
		defaultFilterType: 'text',
		defaultFilterOperator: 'contains',
		defaultFilterOptions: {
			onInit: function(target){
				var name = getPluginName(target);
				var opts = $(target)[name]('options');
				var field = $(this).attr('name');
				var input = $(this);
				if (input.data('textbox')){
					input = input.textbox('textbox');
				}
				input.unbind('.filter').bind('keydown.filter', function(e){
					var t = $(this);
					if (this.timer){
						clearTimeout(this.timer);
					}
					if (e.keyCode == 13){
						_doFilter();
					} else {
						this.timer = setTimeout(function(){
							_doFilter();
						}, opts.filterDelay);
					}
				});
				function _doFilter(){
					var rule = $(target)[name]('getFilterRule', field);
					var value = input.val();
					if (value != ''){
						if ((rule && rule.value!=value) || !rule){
							$(target)[name]('addFilterRule', {
								field: field,
								op: opts.defaultFilterOperator,
								value: value
							});
							$(target)[name]('doFilter');
						}
					} else {
						if (rule){
							$(target)[name]('removeFilterRule', field);
							$(target)[name]('doFilter');
						}
					}
				}
			}
		},
		filterStringify: function(data){
			return JSON.stringify(data);
		},
		onClickMenu: function(item,button){}
	};
	$.extend($.fn.datagrid.defaults, extendedOptions);
	$.extend($.fn.treegrid.defaults, extendedOptions);
	
	// filter types
	$.fn.datagrid.defaults.filters = $.extend({}, $.fn.datagrid.defaults.editors, {
		label: {
			init: function(container, options){
				return $('<span></span>').appendTo(container);
			},
			getValue: function(target){
				return $(target).html();
			},
			setValue: function(target, value){
				$(target).html(value);
			},
			resize: function(target, width){
				$(target)._outerWidth(width)._outerHeight(22);
			}
		}
	});
	$.fn.treegrid.defaults.filters = $.fn.datagrid.defaults.filters;
	
	// filter operators
	$.fn.datagrid.defaults.operators = {
		nofilter: {
			text: 'No Filter'
		},
		contains: {
			text: 'Contains',
			isMatch: function(source, value){
				source = String(source);
				value = String(value);
				return source.toLowerCase().indexOf(value.toLowerCase()) >= 0;
			}
		},
		equal: {
			text: 'Equal',
			isMatch: function(source, value){
				return source == value;
			}
		},
		notequal: {
			text: 'Not Equal',
			isMatch: function(source, value){
				return source != value;
			}
		},
		beginwith: {
			text: 'Begin With',
			isMatch: function(source, value){
				source = String(source);
				value = String(value);
				return source.toLowerCase().indexOf(value.toLowerCase()) == 0;
			}
		},
		endwith: {
			text: 'End With',
			isMatch: function(source, value){
				source = String(source);
				value = String(value);
				return source.toLowerCase().indexOf(value.toLowerCase(), source.length - value.length) !== -1;
			}
		},
		less: {
			text: 'Less',
			isMatch: function(source, value){
				return source < value;
			}
		},
		lessorequal: {
			text: 'Less Or Equal',
			isMatch: function(source, value){
				return source <= value;
			}
		},
		greater: {
			text: 'Greater',
			isMatch: function(source, value){
				return source > value;
			}
		},
		greaterorequal: {
			text: 'Greater Or Equal',
			isMatch: function(source, value){
				return source >= value;
			}
		}
	};
	$.fn.treegrid.defaults.operators = $.fn.datagrid.defaults.operators;
	
	function resizeFilter(target, field){
		var toFixColumnSize = false;
		var dg = $(target);
		var header = dg.datagrid('getPanel').find('div.datagrid-header');
		var tr = header.find('.datagrid-header-row:not(.datagrid-filter-row)');
		var ff = field ? header.find('.datagrid-filter[name="'+field+'"]') : header.find('.datagrid-filter');
		ff.each(function(){
			var name = $(this).attr('name');
			var col = dg.datagrid('getColumnOption', name);
			var cc = $(this).closest('div.datagrid-filter-c');
			var btn = cc.find('a.datagrid-filter-btn');
			var cell = tr.find('td[field="'+name+'"] .datagrid-cell');
			var cellWidth = cell._outerWidth();
			if (cellWidth != _getContentWidth(cc)){
				this.filter.resize(this, cellWidth - btn._outerWidth());
			}
			if (cc.width() > col.boxWidth+col.deltaWidth-1){
				col.boxWidth = cc.width() - col.deltaWidth + 1;
				col.width = col.boxWidth + col.deltaWidth;
				toFixColumnSize = true;
			}
		});
		if (toFixColumnSize){
			$(target).datagrid('fixColumnSize');			
		}

		function _getContentWidth(cc){
			var w = 0;
			$(cc).children(':visible').each(function(){
				w += $(this)._outerWidth();
			});
			return w;
		}
	}
	
	function getFilterComponent(target, field){
		var header = $(target).datagrid('getPanel').find('div.datagrid-header');
		return header.find('tr.datagrid-filter-row td[field="'+field+'"] .datagrid-filter');
	}
	
	/**
	 * get filter rule index, return -1 if not found.
	 */
	function getRuleIndex(target, field){
		var name = getPluginName(target);
		var rules = $(target)[name]('options').filterRules;
		for(var i=0; i<rules.length; i++){
			if (rules[i].field == field){
				return i;
			}
		}
		return -1;
	}

	function getFilterRule(target, field){
		var name = getPluginName(target);
		var rules = $(target)[name]('options').filterRules;
		var index = getRuleIndex(target, field);
		if (index >= 0){
			return rules[index];
		} else {
			return null;
		}
	}
	
	function addFilterRule(target, param){
		var name = getPluginName(target);
		var opts = $(target)[name]('options');
		var rules = opts.filterRules;

		if (param.op == 'nofilter'){
			removeFilterRule(target, param.field);
		} else {
			var index = getRuleIndex(target, param.field);
			if (index >= 0){
				$.extend(rules[index], param);
			} else {
				rules.push(param);
			}
		}

		var input = getFilterComponent(target, param.field);
		if (input.length){
			if (param.op != 'nofilter'){
				input[0].filter.setValue(input, param.value);
			}
			var menu = input[0].menu;
			if (menu){
				menu.find('.'+opts.filterMenuIconCls).removeClass(opts.filterMenuIconCls);
				var item = menu.menu('findItem', opts.operators[param.op]['text']);
				menu.menu('setIcon', {
					target: item.target,
					iconCls: opts.filterMenuIconCls
				});
			}
		}
	}
	
	function removeFilterRule(target, field){
		var name = getPluginName(target);
		var dg = $(target);
		var opts = dg[name]('options');
		if (field){
			var index = getRuleIndex(target, field);
			if (index >= 0){
				opts.filterRules.splice(index, 1);
			}
			_clear([field]);
		} else {
			opts.filterRules = [];
			var fields = dg.datagrid('getColumnFields',true).concat(dg.datagrid('getColumnFields'));
			_clear(fields);
		}
		
		function _clear(fields){
			for(var i=0; i<fields.length; i++){
				var input = getFilterComponent(target, fields[i]);
				if (input.length){
					input[0].filter.setValue(input, '');
					var menu = input[0].menu;
					if (menu){
						menu.find('.'+opts.filterMenuIconCls).removeClass(opts.filterMenuIconCls);
					}
				}
			}
		}
	}
	
	function doFilter(target){
		var name = getPluginName(target);
		var state = $.data(target, name);
		var opts = state.options;
		if (opts.remoteFilter){
			$(target)[name]('load');
		} else {
			$(target)[name]('getPager').pagination('refresh', {pageNumber:1});
			$(target)[name]('options').pageNumber = 1;
			$(target)[name]('loadData', state.filterSource || state.data);
		}
	}
	
	function translateTreeData(target, children, pid){
		var opts = $(target).treegrid('options');
		if (!children || !children.length){return []}
		var rows = [];
		$.map(children, function(item){
			item._parentId = pid;
			rows.push(item);
			rows = rows.concat(translateTreeData(target, item.children, item[opts.idField]));
		});
		$.map(rows, function(row){
			row.children = undefined;
		});
		return rows;
	}

	function myLoadFilter(data, parentId){
		var target = this;
		var name = getPluginName(target);
		var state = $.data(target, name);
		var opts = state.options;

		if (name == 'datagrid' && $.isArray(data)){
			data = {
				total: data.length,
				rows: data
			};
		} else if (name == 'treegrid' && $.isArray(data)){
			var rows = translateTreeData(target, data, parentId);
			data = {
				total: rows.length,
				rows: rows
			}
		}
		if (!opts.remoteFilter){
			if (!state.filterSource){
				state.filterSource = data;
			} else {
				if (!opts.isSorting) {
					if (name == 'datagrid'){
						state.filterSource = data;
					} else {
						state.filterSource.total += data.length;
						state.filterSource.rows = state.filterSource.rows.concat(data.rows);
						if (parentId){
							return opts.filterMatcher.call(target, data);
						}
					}
				} else {
					opts.isSorting = undefined;
				}
			}
			if (!opts.remoteSort && opts.sortName){
				var names = opts.sortName.split(',');
				var orders = opts.sortOrder.split(',');
				var dg = $(target);
				state.filterSource.rows.sort(function(r1,r2){
					var r = 0;
					for(var i=0; i<names.length; i++){
						var sn = names[i];
						var so = orders[i];
						var col = dg.datagrid('getColumnOption', sn);
						var sortFunc = col.sorter || function(a,b){
							return a==b ? 0 : (a>b?1:-1);
						};
						r = sortFunc(r1[sn], r2[sn]) * (so=='asc'?1:-1);
						if (r != 0){
							return r;
						}
					}
					return r;
				});
			}
			data = opts.filterMatcher.call(target, {
				total: state.filterSource.total,
				rows: state.filterSource.rows
			});

			if (opts.pagination){
				var dg = $(target);
				var pager = dg[name]('getPager');
				pager.pagination({
					onSelectPage:function(pageNum, pageSize){
	                    opts.pageNumber = pageNum;
	                    opts.pageSize = pageSize;
	                    pager.pagination('refresh',{
	                        pageNumber:pageNum,
	                        pageSize:pageSize
	                    });
	                    //dg.datagrid('loadData', state.filterSource);
	                    dg[name]('loadData', state.filterSource);
					},
					onBeforeRefresh:function(){
						dg[name]('reload');
						return false;
					}
				});
				if (name == 'datagrid'){
					var start = (opts.pageNumber-1)*parseInt(opts.pageSize);
					var end = start + parseInt(opts.pageSize);
					data.rows = data.rows.slice(start, end);
				} else {
			        var topRows = [];
			        var childRows = [];
			        $.map(data.rows, function(row){
			        	row._parentId ? childRows.push(row) : topRows.push(row);
			        });
			        data.total = topRows.length;
			        var start = (opts.pageNumber-1)*parseInt(opts.pageSize);  
			        var end = start + parseInt(opts.pageSize);  
					data.rows = topRows.slice(start, end).concat(childRows);
				}
			}
			$.map(data.rows, function(row){
				row.children = undefined;
			});
		}
		return data;
	}
	
	function init(target, filters){
		filters = filters || [];
		var name = getPluginName(target);
		var state = $.data(target, name);
		var opts = state.options;
		if (!opts.filterRules.length){
			opts.filterRules = [];
		}
		opts.filterCache = opts.filterCache || {};
		var dgOpts = $.data(target, 'datagrid').options;
		
		var onResize = dgOpts.onResize;
		dgOpts.onResize = function(width,height){
			resizeFilter(target);
			onResize.call(this, width, height);
		}
		var onBeforeSortColumn = dgOpts.onBeforeSortColumn;
		dgOpts.onBeforeSortColumn = function(sort, order){
			var result = onBeforeSortColumn.call(this, sort, order);
			if (result != false){
				opts.isSorting = true;				
			}
			return result;
		};

		var onResizeColumn = opts.onResizeColumn;
		opts.onResizeColumn = function(field,width){
			var fc = $(this).datagrid('getPanel').find('.datagrid-header .datagrid-filter-c');
			fc.hide();
			$(target).datagrid('fitColumns');
			if (opts.fitColumns){
				resizeFilter(target);
			} else {
				resizeFilter(target, field);
			}
			fc.show();
			onResizeColumn.call(target, field, width);
		};
		var onBeforeLoad = opts.onBeforeLoad;
		opts.onBeforeLoad = function(param1, param2){
			if (param1){
				param1.filterRules = opts.filterStringify(opts.filterRules);
			}
			if (param2){
				param2.filterRules = opts.filterStringify(opts.filterRules);
			}
			var result = onBeforeLoad.call(this, param1, param2);
			if (result != false){
				if (name == 'datagrid'){
					state.filterSource = null;
				} else if (name == 'treegrid' && state.filterSource){
					if (param1){
						var id = param1[opts.idField];	// the id of the expanding row
						var rows = state.filterSource.rows || [];
						for(var i=0; i<rows.length; i++){
							if (id == rows[i]._parentId){	// the expanding row has children
								return false;
							}
						}
					} else {
						state.filterSource = null;
					}
				}
			}
			return result;
		};

		// opts.loadFilter = myLoadFilter;
		opts.loadFilter = function(data, parentId){
			var d = opts.oldLoadFilter.call(this, data, parentId);
			return myLoadFilter.call(this, d, parentId);
		};
		
		initCss();
		createFilter(true);
		createFilter();
		if (opts.fitColumns){
			setTimeout(function(){
				resizeFilter(target);
			}, 0);
		}

		$.map(opts.filterRules, function(rule){
			addFilterRule(target, rule);
		});
		
		function initCss(){
			if (!$('#datagrid-filter-style').length){
				$('head').append(
					'<style id="datagrid-filter-style">' +
					'a.datagrid-filter-btn{display:inline-block;width:18px;height:22px;margin:8px 0 0 8px;vertical-align:middle;cursor:pointer;opacity:0.6;filter:alpha(opacity=60);}' +
					'a:hover.datagrid-filter-btn{opacity:1;filter:alpha(opacity=100);}' +
					'.datagrid-filter-row .textbox,.datagrid-filter-row .textbox .textbox-text{-moz-border-radius:0;-webkit-border-radius:0;border-radius:0;}' +
					'.datagrid-filter-row input{margin:0;-moz-border-radius:0;-webkit-border-radius:0;border-radius:0;}' +
					'.datagrid-filter-cache{position:absolute;width:10px;height:10px;left:-99999px;}' +
					'</style>'
				);
			}
		}
		
		/**
		 * create filter component
		 */
		function createFilter(frozen){
			var dc = state.dc;
			var fields = $(target).datagrid('getColumnFields', frozen);
			if (frozen && opts.rownumbers){
				fields.unshift('_');
			}
			var table = (frozen?dc.header1:dc.header2).find('table.datagrid-htable');
			
			// clear the old filter component
			table.find('.datagrid-filter').each(function(){
				if (this.filter.destroy){
					this.filter.destroy(this);
				}
				if (this.menu){
					$(this.menu).menu('destroy');
				}
			});
			table.find('tr.datagrid-filter-row').remove();
			
			var tr = $('<tr class="datagrid-header-row datagrid-filter-row"></tr>');
			if (opts.filterPosition == 'bottom'){
				tr.appendTo(table.find('tbody'));
			} else {
				tr.prependTo(table.find('tbody'));
			}
			if (!opts.showFilterBar){
				tr.hide();
			}
			
			for(var i=0; i<fields.length; i++){
				var field = fields[i];
				var col = $(target).datagrid('getColumnOption', field);
				var td = $('<td></td>').attr('field', field).appendTo(tr);
				if (col && col.hidden){
					td.hide();
				}
				if (field == '_'){
					continue;
				}
				if (col && (col.checkbox || col.expander)){
					continue;
				}

				var fopts = getFilter(field);
				if (fopts){
					$(target)[name]('destroyFilter', field);	// destroy the old filter component
				} else {
					fopts = $.extend({}, {
						field: field,
						type: opts.defaultFilterType,
						options: opts.defaultFilterOptions
					});
				}

				var div = opts.filterCache[field];
				if (!div){
					div = $('<div class="datagrid-filter-c"></div>').appendTo(td);
					var filter = opts.filters[fopts.type];
					var input = filter.init(div, fopts.options||{});
					input.addClass('datagrid-filter').attr('name', field);
					input[0].filter = filter;
					input[0].menu = createFilterButton(div, fopts.op);
					if (fopts.options){
						if (fopts.options.onInit){
							fopts.options.onInit.call(input[0], target);
						}
					} else {
						opts.defaultFilterOptions.onInit.call(input[0], target);
					}
					opts.filterCache[field] = div;
					resizeFilter(target, field);
				} else {
					div.appendTo(td);
				}
			}
		}
		
		function createFilterButton(container, operators){
			if (!operators){return null;}
			
			var btn = $('<a class="datagrid-filter-btn">&nbsp;</a>').addClass(opts.filterBtnIconCls);
			if (opts.filterBtnPosition == 'right'){
				btn.appendTo(container);
			} else {
				btn.prependTo(container);
			}

			var menu = $('<div></div>').appendTo('body');
			$.map(['nofilter'].concat(operators), function(item){
				var op = opts.operators[item];
				if (op){
					$('<div></div>').attr('name', item).html(op.text).appendTo(menu);
				}
			});
			menu.menu({
				alignTo:btn,
				onClick:function(item){
					var btn = $(this).menu('options').alignTo;
					var td = btn.closest('td[field]');
					var field = td.attr('field');
					var input = td.find('.datagrid-filter');
					var value = input[0].filter.getValue(input);
					
					if (opts.onClickMenu.call(target, item, btn, field) == false){
						return;
					}
					
					addFilterRule(target, {
						field: field,
						op: item.name,
						value: value
					});
					
					doFilter(target);
				}
			});

			btn[0].menu = menu;
			btn.bind('click', {menu:menu}, function(e){
				$(this.menu).menu('show');
				return false;
			});
			return menu;
		}
		
		function getFilter(field){
			for(var i=0; i<filters.length; i++){
				var filter = filters[i];
				if (filter.field == field){
					return filter;
				}
			}
			return null;
		}
	}
	
	$.extend($.fn.datagrid.methods, {
		enableFilter: function(jq, filters){
			return jq.each(function(){
				var name = getPluginName(this);
				var opts = $.data(this, name).options;
				if (opts.oldLoadFilter){
					if (filters){
						$(this)[name]('disableFilter');
					} else {
						return;
					}
				}
				opts.oldLoadFilter = opts.loadFilter;
				init(this, filters);
				$(this)[name]('resize');
				if (opts.filterRules.length){
					if (opts.remoteFilter){
						doFilter(this);
					} else if (opts.data){
						doFilter(this);
					}
				}
			});
		},
		disableFilter: function(jq){
			return jq.each(function(){
				var name = getPluginName(this);
				var state = $.data(this, name);
				var opts = state.options;
				var dc = $(this).data('datagrid').dc;
				var div = dc.view.children('.datagrid-filter-cache');
				if (!div.length){
					div = $('<div class="datagrid-filter-cache"></div>').appendTo(dc.view);
				}
				for(var field in opts.filterCache){
					$(opts.filterCache[field]).appendTo(div);
				}
				var data = state.data;
				if (state.filterSource){
					data = state.filterSource;
					$.map(data.rows, function(row){
						row.children = undefined;
					});
				}
				$(this)[name]({
					data: data,
					loadFilter: (opts.oldLoadFilter||undefined),
					oldLoadFilter: null
				});
			});
		},
		destroyFilter: function(jq, field){
			return jq.each(function(){
				var name = getPluginName(this);
				var state = $.data(this, name);
				var opts = state.options;
				if (field){
					_destroy(field);
				} else {
					for(var f in opts.filterCache){
						_destroy(f);
					}
					$(this).datagrid('getPanel').find('.datagrid-header .datagrid-filter-row').remove();
					$(this).data('datagrid').dc.view.children('.datagrid-filter-cache').remove();
					opts.filterCache = {};
					$(this)[name]('resize');
					$(this)[name]('disableFilter');
				}

				function _destroy(field){
					var c = $(opts.filterCache[field]);
					var input = c.find('.datagrid-filter');
					if (input.length){
						var filter = input[0].filter;
						if (filter.destroy){
							filter.destroy(input[0]);
						}
					}
					c.find('.datagrid-filter-btn').each(function(){
						$(this.menu).menu('destroy');
					});
					c.remove();
					opts.filterCache[field] = undefined;
				}
			});
		},
		getFilterRule: function(jq, field){
			return getFilterRule(jq[0], field);
		},
		addFilterRule: function(jq, param){
			return jq.each(function(){
				addFilterRule(this, param);
			});
		},
		removeFilterRule: function(jq, field){
			return jq.each(function(){
				removeFilterRule(this, field);
			});
		},
		doFilter: function(jq){
			return jq.each(function(){
				doFilter(this);
			});
		},
		getFilterComponent: function(jq, field){
			return getFilterComponent(jq[0], field);
		},
		resizeFilter: function(jq, field){
			return jq.each(function(){
				resizeFilter(this, field);
			});
		}
	});
})(jQuery);
;(function($){
	// var oldLoadDataMethod = $.fn.datagrid.methods.loadData;
	// $.fn.datagrid.methods.loadData = function(jq, data){
	// 	jq.each(function(){
	// 		$.data(this, 'datagrid').filterSource = null;
	// 	});
	// 	return oldLoadDataMethod.call($.fn.datagrid.methods, jq, data);
	// };

	var autoGrids = [];
	function checkAutoGrid(){
		autoGrids = $.grep(autoGrids, function(t){
			return t.length && t.data('edatagrid');
		});
	}
	function saveAutoGrid(omit){
		checkAutoGrid();
		$.map(autoGrids, function(t){
			if (t[0] != $(omit)[0]){
				t.edatagrid('saveRow');
			}
		});
		checkAutoGrid();
	}
	function addAutoGrid(dg){
		checkAutoGrid();
		for(var i=0; i<autoGrids.length; i++){
			if ($(autoGrids[i])[0] == $(dg)[0]){return;}
		}
		autoGrids.push($(dg));
	}
	function delAutoGrid(dg){
		checkAutoGrid();
		autoGrids = $.grep(autoGrids, function(t){
			return $(t)[0] != $(dg)[0];
		});
	}

	$(function(){
		$(document).unbind('.edatagrid').bind('mousedown.edatagrid', function(e){
			var p = $(e.target).closest('div.datagrid-view,div.combo-panel,div.window,div.window-mask');
			if (p.length){
				if (p.hasClass('datagrid-view')){
					saveAutoGrid(p.children('table'));
				}
				return;
			}
			saveAutoGrid();
		});
	});
	
	function buildGrid(target){
		var opts = $.data(target, 'edatagrid').options;
		$(target).datagrid($.extend({}, opts, {
			onDblClickCell:function(index,field,value){
				if (opts.editing){
					$(this).edatagrid('editRow', index);
					focusEditor(target, field);
				}
				if (opts.onDblClickCell){
					opts.onDblClickCell.call(target, index, field, value);
				}
			},
			onClickCell:function(index,field,value){
				if (opts.editing && opts.editIndex >= 0){
					$(this).edatagrid('editRow', index);
					focusEditor(target, field);
				}
				if (opts.onClickCell){
					opts.onClickCell.call(target, index, field, value);
				}
			},
			onBeforeEdit: function(index, row){
				if (opts.onBeforeEdit){
					if (opts.onBeforeEdit.call(target, index, row) == false){
						return false;
					}
				}
				if (opts.autoSave){
					addAutoGrid(this);
				}
				opts.originalRow = $.extend(true, [], row);
			},
			onAfterEdit: function(index, row){
				delAutoGrid(this);
				opts.editIndex = -1;
				var url = row.isNewRecord ? opts.saveUrl : opts.updateUrl;
				if (url){
					var changed = false;
					var fields = $(this).edatagrid('getColumnFields',true).concat($(this).edatagrid('getColumnFields'));
					for(var i=0; i<fields.length; i++){
						var field = fields[i];
						var col = $(this).edatagrid('getColumnOption', field);
						if (col.editor && opts.originalRow[field] != row[field]){
							changed = true;
							break;
						}
					}
					if (changed){
						$.post(url, row, function(data){
							if (data.isError){
								$(target).edatagrid('cancelRow',index);
								$(target).edatagrid('selectRow',index);
								$(target).edatagrid('editRow',index);
								opts.onError.call(target, index, data);
								return;
							}
							data.isNewRecord = null;
							$(target).datagrid('updateRow', {
								index: index,
								row: data
							});
							if (opts.tree){
								var idValue = row[opts.idField||'id'];
								var t = $(opts.tree);
								var node = t.tree('find', idValue);
								if (node){
									node.text = row[opts.treeTextField];
									t.tree('update', node);
								} else {
									var pnode = t.tree('find', row[opts.treeParentField]);
									t.tree('append', {
										parent: (pnode ? pnode.target : null),
										data: [{id:idValue,text:row[opts.treeTextField]}]
									});
								}
							}
							opts.onSuccess.call(target, index, row);
							opts.onSave.call(target, index, row);
						},'json');						
					} else {
						opts.onSave.call(target, index, row);
					}
				} else {
					opts.onSave.call(target, index, row);
				}
				if (opts.onAfterEdit) opts.onAfterEdit.call(target, index, row);
			},
			onCancelEdit: function(index, row){
				delAutoGrid(this);
				opts.editIndex = -1;
				if (row.isNewRecord) {
					$(this).datagrid('deleteRow', index);
				}
				if (opts.onCancelEdit) opts.onCancelEdit.call(target, index, row);
			},
			onBeforeLoad: function(param){
				if (opts.onBeforeLoad.call(target, param) == false){return false}
				$(this).edatagrid('cancelRow');
				if (opts.tree){
					var node = $(opts.tree).tree('getSelected');
					param[opts.treeParentField] = node ? node.id : undefined;
				}
			}
		}));
		
		
		
		if (opts.tree){
			$(opts.tree).tree({
				url: opts.treeUrl,
				onClick: function(node){
					$(target).datagrid('load');
				},
				onDrop: function(dest,source,point){
					var targetId = $(this).tree('getNode', dest).id;
					$.ajax({
						url: opts.treeDndUrl,
						type:'post',
						data:{
							id:source.id,
							targetId:targetId,
							point:point
						},
						dataType:'json',
						success:function(){
							$(target).datagrid('load');
						}
					});
				}
			});
		}
	}

	function focusEditor(target, field){
		var opts = $(target).edatagrid('options');
		var t;
		var editor = $(target).datagrid('getEditor', {index:opts.editIndex,field:field});
		if (editor){
			t = editor.target;
		} else {
			var editors = $(target).datagrid('getEditors', opts.editIndex);
			if (editors.length){
				t = editors[0].target;
			}
		}
		if (t){
			if ($(t).hasClass('textbox-f')){
				$(t).textbox('textbox').focus();
			} else {
				$(t).focus();					
			}
		}
	}
	
	$.fn.edatagrid = function(options, param){
		if (typeof options == 'string'){
			var method = $.fn.edatagrid.methods[options];
			if (method){
				return method(this, param);
			} else {
				return this.datagrid(options, param);
			}
		}
		
		options = options || {};
		return this.each(function(){
			var state = $.data(this, 'edatagrid');
			if (state){
				$.extend(state.options, options);
			} else {
				$.data(this, 'edatagrid', {
					options: $.extend({}, $.fn.edatagrid.defaults, $.fn.edatagrid.parseOptions(this), options)
				});
			}
			buildGrid(this);
		});
	};
	
	$.fn.edatagrid.parseOptions = function(target){
		return $.extend({}, $.fn.datagrid.parseOptions(target), {
		});
	};
	
	$.fn.edatagrid.methods = {
		options: function(jq){
			var opts = $.data(jq[0], 'edatagrid').options;
			return opts;
		},
		loadData: function(jq, data){
			return jq.each(function(){
				$(this).edatagrid('cancelRow');
				$(this).datagrid('loadData', data);
			});
		},
		enableEditing: function(jq){
			return jq.each(function(){
				var opts = $.data(this, 'edatagrid').options;
				opts.editing = true;
			});
		},
		disableEditing: function(jq){
			return jq.each(function(){
				var opts = $.data(this, 'edatagrid').options;
				opts.editing = false;
			});
		},
		isEditing: function(jq, index){
			var opts = $.data(jq[0], 'edatagrid').options;
			var tr = opts.finder.getTr(jq[0], index);
			return tr.length && tr.hasClass('datagrid-row-editing');
		},
		editRow: function(jq, index){
			return jq.each(function(){
				var dg = $(this);
				var opts = $.data(this, 'edatagrid').options;
				var editIndex = opts.editIndex;
				if (editIndex != index){
					if (dg.datagrid('validateRow', editIndex)){
						if (editIndex>=0){
							if (opts.onBeforeSave.call(this, editIndex) == false) {
								setTimeout(function(){
									dg.datagrid('selectRow', editIndex);
								},0);
								return;
							}
						}
						dg.datagrid('endEdit', editIndex);
						dg.datagrid('beginEdit', index);
						if (!dg.edatagrid('isEditing', index)){
							return;
						}
						opts.editIndex = index;
						focusEditor(this);
						
						var rows = dg.datagrid('getRows');
						opts.onEdit.call(this, index, rows[index]);
					} else {
						setTimeout(function(){
							dg.datagrid('selectRow', editIndex);
						}, 0);
					}
				}
			});
		},
		addRow: function(jq, index){
			return jq.each(function(){
				var dg = $(this);
				var opts = $.data(this, 'edatagrid').options;
				if (opts.editIndex >= 0){
					if (!dg.datagrid('validateRow', opts.editIndex)){
						dg.datagrid('selectRow', opts.editIndex);
						return;
					}
					if (opts.onBeforeSave.call(this, opts.editIndex) == false){
						setTimeout(function(){
							dg.datagrid('selectRow', opts.editIndex);
						},0);
						return;
					}
					dg.datagrid('endEdit', opts.editIndex);
				}
				var rows = dg.datagrid('getRows');
				
				function _add(index, row){
					if (index == undefined){
						dg.datagrid('appendRow', row);
						opts.editIndex = rows.length - 1;
					} else {
						dg.datagrid('insertRow', {index:index,row:row});
						opts.editIndex = index;
					}
				}
				if (typeof index == 'object'){
					_add(index.index, $.extend(index.row, {isNewRecord:true}))
				} else {
					_add(index, {isNewRecord:true});
				}
				
//				if (index == undefined){
//					dg.datagrid('appendRow', {isNewRecord:true});
//					opts.editIndex = rows.length - 1;
//				} else {
//					dg.datagrid('insertRow', {
//						index: index,
//						row: {isNewRecord:true}
//					});
//					opts.editIndex = index;
//				}
				
				dg.datagrid('beginEdit', opts.editIndex);
				dg.datagrid('selectRow', opts.editIndex);
				
				if (opts.tree){
					var node = $(opts.tree).tree('getSelected');
					rows[opts.editIndex][opts.treeParentField] = (node ? node.id : 0);
				}
				
				opts.onAdd.call(this, opts.editIndex, rows[opts.editIndex]);
			});
		},
		saveRow: function(jq){
			return jq.each(function(){
				var dg = $(this);
				var opts = $.data(this, 'edatagrid').options;
				if (opts.editIndex >= 0){
					if (opts.onBeforeSave.call(this, opts.editIndex) == false) {
						setTimeout(function(){
							dg.datagrid('selectRow', opts.editIndex);
						},0);
						return;
					}
					$(this).datagrid('endEdit', opts.editIndex);
				}
			});
		},
		cancelRow: function(jq){
			return jq.each(function(){
				var opts = $.data(this, 'edatagrid').options;
				if (opts.editIndex >= 0){
					$(this).datagrid('cancelEdit', opts.editIndex);
				}
			});
		},
		destroyRow: function(jq, index){
			return jq.each(function(){
				var dg = $(this);
				var opts = $.data(this, 'edatagrid').options;
				
				var rows = [];
				if (index == undefined){
					rows = dg.datagrid('getSelections');
				} else {
					var rowIndexes = $.isArray(index) ? index : [index];
					for(var i=0; i<rowIndexes.length; i++){
						var row = opts.finder.getRow(this, rowIndexes[i]);
						if (row){
							rows.push(row);
						}
					}
				}
				
				if (!rows.length){
					$.messager.show({
						title: opts.destroyMsg.norecord.title,
						msg: opts.destroyMsg.norecord.msg
					});
					return;
				}
				
				$.messager.confirm(opts.destroyMsg.confirm.title,opts.destroyMsg.confirm.msg,function(r){
					if (r){
						for(var i=0; i<rows.length; i++){
							_del(rows[i]);
						}
						dg.datagrid('clearSelections');
					}
				});
				
				function _del(row){
					var index = dg.datagrid('getRowIndex', row);
					if (index == -1){return}
					if (row.isNewRecord){
						dg.datagrid('cancelEdit', index);
					} else {
						if (opts.destroyUrl){
							var idValue = row[opts.idField||'id'];
							$.post(opts.destroyUrl, {id:idValue}, function(data){
								var index = dg.datagrid('getRowIndex', idValue);
								if (data.isError){
									dg.datagrid('selectRow', index);
									opts.onError.call(dg[0], index, data);
									return;
								}
								if (opts.tree){
									dg.datagrid('reload');
									var t = $(opts.tree);
									var node = t.tree('find', idValue);
									if (node){
										t.tree('remove', node.target);
									}
								} else {
									dg.datagrid('cancelEdit', index);
									dg.datagrid('deleteRow', index);
								}
								opts.onDestroy.call(dg[0], index, row);
								var pager = dg.datagrid('getPager');
								if (pager.length && !dg.datagrid('getRows').length){
									dg.datagrid('options').pageNumber = pager.pagination('options').pageNumber;
									dg.datagrid('reload');
								}
							}, 'json');
						} else {
							dg.datagrid('cancelEdit', index);
							dg.datagrid('deleteRow', index);
							opts.onDestroy.call(dg[0], index, row);
						}
					}
				}
			});
		}
	};
	
	$.fn.edatagrid.defaults = $.extend({}, $.fn.datagrid.defaults, {
		singleSelect: true,
		editing: true,
		editIndex: -1,
		destroyMsg:{
			norecord:{
				title:'Warning',
				msg:'No record is selected.'
			},
			confirm:{
				title:'Confirm',
				msg:'Are you sure you want to delete?'
			}
		},
//		destroyConfirmTitle: 'Confirm',
//		destroyConfirmMsg: 'Are you sure you want to delete?',
		
		autoSave: false,	// auto save the editing row when click out of datagrid
		url: null,	// return the datagrid data
		saveUrl: null,	// return the added row
		updateUrl: null,	// return the updated row
		destroyUrl: null,	// return {success:true}
		
		tree: null,		// the tree selector
		treeUrl: null,	// return tree data
		treeDndUrl: null,	// to process the drag and drop operation, return {success:true}
		treeTextField: 'name',
		treeParentField: 'parentId',
		
		onAdd: function(index, row){},
		onEdit: function(index, row){},
		onBeforeSave: function(index){},
		onSave: function(index, row){},
		onSuccess: function(index, row){},
		onDestroy: function(index, row){},
		onError: function(index, row){}
	});
	
	////////////////////////////////
	$.parser.plugins.push('edatagrid');
})(jQuery);;(function ($) {

    $.fn.iCombotree = function (options) {

        var defaults = {
            combotreeId: this.selector,
            url: ctx + '/system/codeItem/getListByCodeSetIdAndLevelId?codeSetId={codeSetId}&levelId={levelId}',
            expandUrl: ctx + '/system/codeItem/getListByPid?pid={pid}',
            getFatherIdsUrl: '',
            width: 153,
            panelHeight: 'auto',
            required: false,
            lines: false,
            multiple: false,
            checkbox: true,
            onlyLeafCheck: false,
            editable: false,
            readonly: false,
            animate: true,
            expandAll: false,
            onBeforeSelect: function (node) {
                if (options.onlyLeafCheck) {
                    // 判断是否是叶子节点
                    var isLeaf = $(this).tree('isLeaf', node.target);
                    if (!isLeaf) {
                        $.messager.alert('提示操作！', '请展开选择子节点！', 'warning');
                        // 返回false表示取消本次选择操作
                        return false;
                    }
                }
            }
        }

        var options = $.extend(defaults, options);

        if (options.url.indexOf("codeSetId") == -1) {
            if (options.url.indexOf("?") == -1) {
                options.url = options.url + "?codeSetId=" + options.codeSetId + "&levelId=" + options.levelId;
            } else {
                options.url = options.url + "&codeSetId=" + options.codeSetId + "&levelId=" + options.levelId;
            }
        } else {
            options.url = options.url.replace("{codeSetId}", options.codeSetId).replace("{levelId}", options.levelId);
        }

        if (options.combotreeId == "") {
            options.combotreeId = $(this).context;
        }

        var $combotreeObj = $(this);

        $combotreeObj.combotree({
            url: options.url,
            width: options.width,
            height: options.height,
            panelHeight: options.panelHeight,
            required: options.required,
            lines: options.lines,
            multiple: options.multiple,
            checkbox: options.checkbox,
            onlyLeafCheck: options.onlyLeafCheck,
            editable: options.editable,
            readonly: options.readonly,
            animate: options.animate,
            onBeforeExpand: function (node, param) {
                $(this).tree('options').url = replaceUrlParamValueByBrace(options.expandUrl, node);
            },
            onBeforeSelect: options.onBeforeSelect,
            onLoadSuccess: function (node, data) {
                var $treeObj = $("#" + options.id).combotree('tree');

                // 展开根节点
                $treeObj.tree("expand", $treeObj.tree('getRoot').target);

                if (options.expandAll) {
                    $treeObj.tree("expandAll");
                }

                if (options.getFatherIdsUrl) {
                    setTimeout(function () {
                        expandToTargetNode($treeObj, options);
                    }, 100);
                }
            },
            onSelect: function (node) {
                /*if (options.params) {
                 var dialogIdArr = options.dialog.id.split(",");
                 for (var i = 0; i < dialogIdArr.length; i++) {
                 var jsonData = getSelectedRowJson(options.params, node);
                 getTabWindow().$("#" + dialogIdArr[i]).form('load', jsonData);
                 }
                 }*/
                var $formObj = $("#" + options.id).closest('form');
                if (options.params) {
                    var jsonData = getSelectedRowJson(options.params, node);
                    getTabWindow().$("#" + $formObj.attr("id")).form('load', jsonData);
                }
                if (typeof options.backfill == "object") {
                    $.getJSON(replaceUrlParamValueByBrace(options.backfill.url, node), {}, function (backfillData) {
                        getTabWindow().$("#" + $formObj.attr("id")).form('load', backfillData);
                    });
                }
            },
            onShowPanel: function () {
                /*$(options.combotreeId).combotree('tree').tree("collapseAll");
                 var currentNode = $(options.combotreeId).combotree('tree').tree("getSelected");
                 if(currentNode) {
                 $(options.combotreeId).combotree('tree').tree("expandTo", currentNode.target);
                 }*/
            },
            onChange: options.onChange
        });

        function expandToTargetNode($treeObj, options) {
            var n = $treeObj.tree('getSelected');
            var dataObj = {id: $(options.combotreeId).combotree("getValue")};
            if (n == undefined && dataObj.id != "") {
                var findNode;
                $.ajax({
                    type: "POST",
                    url: replaceUrlParamValueByBrace(options.getFatherIdsUrl, dataObj),
                    //data : {"codeSetId":options.codeSetId, "id":id, "levelId":0},
                    success: function (data) {
                        //$(options.combotreeId).combotree('tree').tree("collapseAll");
                        var fatherIdsArray = data.split(",");
                        for (i = fatherIdsArray.length - 1; i >= 0; i--) {
                            findNode = $(options.combotreeId).combotree('tree').tree('find', fatherIdsArray[i].replace(/'/g, ""));
                            if (findNode) {
                                $(options.combotreeId).combotree('tree').tree('expand', findNode.target);
                            }
                        }
                    }
                });
                if (dataObj.id != undefined)
                    $(options.combotreeId).combotree('setValue', dataObj.id);//数据加载完毕可以设置值了
            }
        }

    }

})(jQuery);;function getTabWindow() {
    var curTabWin = null;
    if (topJUI.config.aloneUse) {
        curTabWin = window;
    } else {
        var curTab = parent.$('#index_tabs').tabs('getSelected');
        // var curTab = $('#index_tabs').tabs('getSelected');
        if (curTab && curTab.find('iframe').length > 0) {
            curTabWin = curTab.find('iframe')[0].contentWindow;
        }
    }
    return curTabWin;
}

//采用jquery easyui loading css效果
function showMask() {
    $("<div class=\"datagrid-mask\"></div>").css({
        display: "block",
        width: "100%",
        height: $(window).height()
    }).appendTo("body");
    $("<div class=\"datagrid-mask-msg\"></div>").html("正在处理，请稍候。。。").appendTo("body").css({
        display: "block",
        left: ($(document.body).outerWidth(true) - 190) / 2,
        top: ($(window).height() - 45) / 2
    });
}

function hideMask() {
    $(".datagrid-mask").remove();
    $(".datagrid-mask-msg").remove();
}

//在主框架内打开Tab页，如点击左边的菜单打开Tab窗口
function addTab(params) {
    var iframe = '<iframe src="' + params.url + '" scrolling="auto" frameborder="0" style="width:100%;height:100%;"></iframe>';
    var t = $('#index_tabs');
    var opts = {
        id: Math.random(),
        title: params.text,
        closable: typeof(params.closable) != "undefined" ? params.closable : true,
        iconCls: params.iconCls ? params.iconCls : 'fa fa-page',
        content: iframe,
        //href: params.url,
        border: params.border || false,
        fit: true
        //cls: 'leftBottomBorder'
    };
    if (t.tabs('exists', opts.title)) {
        t.tabs('select', opts.title);
    } else {
        var lastMenuClickTime = $.cookie("menuClickTime");
        var nowTime = new Date().getTime();
        if ((nowTime - lastMenuClickTime) >= 1000) {
            $.cookie("menuClickTime", new Date().getTime());
            t.tabs('myAdd', opts);
        } else {
            $.messager.show({
                title: '温馨提示',
                msg: '操作过快，请稍后重试！'
            });
        }
    }
}

addParentTab = function (options) {

    var src, title;
    if (typeof options.grid == "object") {
        if (options.grid.checkboxSelect == true) {
            var rows = getCheckedRowsData(options.grid.type, options.grid.id);
            if (rows.length == 0) {
                $.messager.alert(
                    topJUI.language.message.title.operationTips,
                    topJUI.language.message.msg.checkSelfGrid,
                    topJUI.language.message.icon.warning
                );
                return;
            }
            if (rows[0]["UUID"]) {
                src = options.tab.href.indexOf("?") >= 0 ? options.tab.href + "&UUID=" + getMultiRowsFieldValue(rows, "UUID") : options.tab.href + "?UUID=" + getMultiRowsFieldValue(rows, "UUID");
            } else {
                src = options.tab.href.indexOf("?") >= 0 ? options.tab.href + "&uuid=" + getMultiRowsFieldValue(rows, "uuid") : options.tab.href + "?uuid=" + getMultiRowsFieldValue(rows, "uuid");
            }
        } else {
            //var unselectedMsg = options.grid.unselectedMsg;
            var row = getSelectedRowData(options.grid.type, options.grid.id);
            if (!row) {
                $.messager.alert(
                    topJUI.language.message.title.operationTips,
                    topJUI.language.message.msg.selectSelfGrid,
                    topJUI.language.message.icon.warning
                );
                return;
            }
            src = replaceUrlParamValueByBrace(options.tab.href, row);
        }
        title = options.tab.title;
    } else {
        src = options.href;
        title = options.title;
    }

    var iframe = '<iframe src="' + src + '" frameborder="0" style="border:0;width:100%;height:100%;"></iframe>';
    parent.$('#index_tabs').tabs("add", {
        title: title,
        content: iframe,
        closable: true,
        iconCls: 'fa fa-th'
    });

}

/**
 * 打开新窗口
 * @param options
 */
openWindow = function (options) {
    var href;
    if (typeof options.grid == "object") {
        if (options.grid.checkboxSelect == true) {
            var rows = getCheckedRowsData(options.grid.type, options.grid.id);
            if (rows.length == 0) {
                $.messager.alert(
                    topJUI.language.message.title.operationTips,
                    topJUI.language.message.msg.checkSelfGrid,
                    topJUI.language.message.icon.warning
                );
                return;
            }
            href = replaceUrlParamValueByBrace(options.href, rows, "multiple");
        } else {
            var row = getSelectedRowData(options.grid.type, options.grid.id);
            if (!row) {
                $.messager.alert(
                    topJUI.language.message.title.operationTips,
                    topJUI.language.message.msg.selectSelfGrid,
                    topJUI.language.message.icon.warning
                );
                return;
            }
            href = replaceUrlParamValueByBrace(options.href, row);
        }
    } else {
        href = options.href;
    }
    window.open(href);
}

/**
 * 绑定按钮点击事件
 * @param options
 */
function bindMenuClickEvent($element, options) {
    //if (typeof options.grid != "object") {
    var toolbarOptions = getOptionsJson($element.closest("div"));
    options = $.extend(true, toolbarOptions, options);
    //}
    var defaults = {};
    // 打开dialog事件
    if (options.clickEvent == "openDialog") {
        defaults = {
            iconCls: 'fa fa-plus',
            parentGridUnselectedMsg: '请先选中一条主表数据！',
            dialog: {
                title: '数据详情',
                width: 700,
                height: 450
            }
        }
        options.dialog.width = options.dialog.width ? options.dialog.width : 700;
        options.dialog.height = options.dialog.height ? options.dialog.height : 'auto';
        options = $.extend(defaults, options);

        if (typeof options.dialog == "object") {
            generateDialogDoc(options);
        }

        /*var extendDoc = "";
         // 判断是否存在父grid
         if (typeof options.parentGrid == "object") {
         extendDoc += ',parentGrid:{type:\'' + options.parentGrid.type + '\',id:\'' + options.parentGrid.id + '\',params:\'' + options.parentGrid.params + '\',unselectedMsg:\'' + options.parentGrid.unselectedMsg + '\'}';
         }
         // 判断是否存在自身grid
         if (typeof options.grid == "object") {
         extendDoc += ',grid:{type:\'' + options.grid.type + '\',id:\'' + options.grid.id + '\',pkName:\'' + options.grid.pkName + '\',parentIdField:\'' + options.grid.parentIdField + '\',unselectedMsg:\'' + options.grid.unselectedMsg + '\',uncheckedMsg:\'' + options.grid.uncheckedMsg + '\'}';
         }
         // 判断dialog中是否存在editor编辑器
         if (typeof options.dialog.editor == "object") {
         var editorStr = "";
         var dh = "";
         for (var i = 0; i < options.dialog.editor.length; i++) {
         if (i != options.dialog.editor.length - 1)
         dh = ",";
         editorStr += '{id:\'' + options.dialog.editor[i].id + '\',type:\'' + options.dialog.editor[i].type + '\',field:\'' + options.dialog.editor[i].field + '\'}' + dh;
         }
         extendDoc += ',editor:[' + editorStr + ']';
         }

         // 如果未设置dialog标题，直接调用按钮名称
         !options.dialog.title ? options.dialog.title = $element.text().replace(/[\r\n]/g, "") : '';
         !options.dialog.url ? options.dialog.url = "" : '';
         !options.dialog.beforeOpenCheckUrl ? options.dialog.beforeOpenCheckUrl = "" : options.dialog.beforeOpenCheckUrl;

         var userDefineDialogId = true;
         if (options.dialog.id == "" || options.dialog.id == null) {
         userDefineDialogId = false;
         options.dialog.id = "dialog-" + parseInt(Math.random() * 99999999 + 1);
         }

         var dialogDom = "";
         var divOrForm = options.form == false ? "div" : "form";
         dialogDom = '<' + divOrForm + ' data-toggle="topjui-dialog" data-options="id:\'' + options.dialog.id + '\',href:\'' + options.dialog.href + '\',url:\'' + options.dialog.url + '\',title:\'' + options.dialog.title + '\',beforeOpenCheckUrl:\'' + options.dialog.beforeOpenCheckUrl + '\'' + extendDoc + '"></' + divOrForm + '>';

         // 判断dialog是否存在linkbutton按钮组
         var buttonsDom = "";
         if (typeof options.dialog.buttonsGroup == "object") {
         var buttonsArr = options.dialog.buttonsGroup;
         var btLength = buttonsArr.length;
         if (btLength > 0) {
         for (var i = 0; i < btLength; i++) {
         // 默认为ajaxForm提交方式
         if (!buttonsArr[i].handler) {
         buttonsArr[i].handler = 'ajaxForm';
         }
         // 传递本grid参数
         var gridDoc = "";
         if (typeof options.grid == "object") {
         gridDoc = ',grid:{type:\'' + options.grid.type + '\',id:\'' + options.grid.id + '\'}';
         }
         // 传递其它grid参数
         if (typeof buttonsArr[i].reload == "object") {
         var reloadStr = "";
         var dh2 = "";
         for (var j = 0; j < buttonsArr[i].reload.length; j++) {
         if (j != buttonsArr[i].reload.length - 1)
         dh2 = ",";

         reloadStr += '{type:\'' + buttonsArr[i].reload[j].type + '\', id:\'' + buttonsArr[i].reload[j].id + '\', clearQueryParams:\'' + buttonsArr[i].reload[j].clearQueryParams + '\'}' + dh2;
         }
         extendDoc += ',reload:[' + reloadStr + ']';
         }
         buttonsDom += '<a href="#" data-toggle="topjui-linkbutton" data-options="handlerBefore:\'' + buttonsArr[i].handlerBefore + '\',handler:\'' + buttonsArr[i].handler + '\',dialog:{id:\'' + options.dialog.id + '\'},url:\'' + buttonsArr[i].url + '\',iconCls:\'' + buttonsArr[i].iconCls + '\'' + extendDoc + '">' + buttonsArr[i].text + '</a>';
         }
         }
         }

         getTabWindow().$('body').append(
         dialogDom +
         '<div id="' + options.dialog.id + '-buttons" style="display:none">' +
         buttonsDom +
         '<a href="#" data-toggle="topjui-linkbutton" data-options="iconCls:\'icon-no\'" onclick="javascript:$(\'#' + options.dialog.id + '\').dialog(\'close\')">关闭</a>' +
         '</div>'
         )*/

        /*$element.on("click", function () {

         options.dialog.leftMargin = ($(document.body).width() * 0.5) - (options.dialog.width * 0.5);
         options.dialog.topMargin = ($(document.body).height() * 0.5) - (options.dialog.height * 0.5);

         if (typeof options.parentGrid == "object") {
         openDialogAndloadDataByParentGrid(options);
         } else if (options.dialog.url) {
         openDialogAndloadDataByUrl(options);
         } else {
         if (options.grid.uncheckedMsg) {
         var rows = getCheckedRowsData(options.grid.type, options.grid.id);
         if (rows.length == 0) {
         $.messager.alert(
         topJUI.language.message.title.operationTips,
         options.grid.uncheckedMsg,
         topJUI.language.message.icon.warning
         );
         return;
         }
         }
         if (options.dialog.onBeforeOpen != "undefined") {
         // 回调执行传入的自定义函数
         executeCallBackFun(options.dialog.onBeforeOpen, options);
         }
         var $dialogObj = $("#" + options.dialog.id);
         $dialogObj.dialog({
         width: options.dialog.width,
         height: options.dialog.height,
         maximized: options.dialog.maximized,
         maximizable: options.dialog.maximizable,
         left: options.dialog.leftMargin,
         top: options.dialog.topMargin,
         buttons: options.dialog.buttons
         });
         //$dialogObj.dialog('refresh', appendSourceUrlParam(options.dialog.href)); //加载两次href指定的页面
         $dialogObj.dialog({
         href: appendSourceUrlParam(options.dialog.href)
         });
         $dialogObj.dialog('open');
         }
         });*/
    } else if (options.clickEvent == "openTab") {
        defaults = {
            iconCls: 'fa fa-th'
        }
        options = $.extend(defaults, options);

        /*$element.on("click", function () {
         addParentTab(options);
         });*/
    } else if (options.clickEvent == "openWindow") {
        defaults = {
            iconCls: 'fa fa-link'
        }
        options = $.extend(defaults, options);

        /*$element.on("click", function () {
         openWindow(options);
         });*/
    } else if (options.clickEvent == "edatagrid") {
        defaults = {
            iconCls: 'fa fa-plus'
        }
        options = $.extend(defaults, options);

        $element.on("click", function () {
            if (options.type == "addRow")
                $('#' + options.grid.id).edatagrid('addRow', 0);
            if (options.type == "saveRow")
                $('#' + options.grid.id).edatagrid('saveRow');
            if (options.type == "cancelRow")
                $('#' + options.grid.id).edatagrid('cancelRow');
        });
    } else if (options.clickEvent == "doAjax") {
        defaults = {
            iconCls: 'fa fa-cog'
        }
        options = $.extend(defaults, options);

        /*$element.on("click", function () {
         //doAjaxHandler(options);
         });*/
    } else if (options.clickEvent == "request") {
        defaults = {
            iconCls: 'fa fa-cog'
        }
        options = $.extend(defaults, options);

        /*$element.on("click", function () {
         requestHandler(options);
         });*/
    } else if (options.clickEvent == "delete") {
        defaults = {
            iconCls: 'fa fa-trash'
        }
        options = $.extend(defaults, options);

        /* $element.on("click", function () {
         deleteHandler(options);
         });*/
    } else if (options.clickEvent == "filter") {
        defaults = {
            iconCls: 'fa fa-filter'
        }
        options = $.extend(defaults, options);

        /*$element.on("click", function () {
         filterHandler(options);
         });*/
    } else if (options.clickEvent == "search") {
        defaults = {
            iconCls: 'fa fa-search'
        }
        options = $.extend(defaults, options);

        /*$element.on("click", function () {
         searchHandler(options);
         });*/
    } else if (options.clickEvent == "export") {
        defaults = {
            iconCls: 'fa fa-file'
        }
        options = $.extend(defaults, options);

        /*$element.on("click", function () {
         exportHandler(options);
         });*/
    } else if (options.clickEvent == "import") {
        defaults = {
            iconCls: 'fa fa-file',
            href: '/system/excel/excelImport'
        }
        options = $.extend(defaults, options);

        /*$element.on("click", function () {
         importHandler(options);
         });*/
    }
    return options;
}

/**
 * 打开dialog,加载选中的表格数据到dialog中
 * @param options
 */
function openDialogAndloadDataByParentGrid(options) {
    var parentGridUnselectedMsg = "";
    var parentGridParam = "";
    if (typeof options.parentGrid == "object") {
        parentGridUnselectedMsg = options.parentGrid.unselectedMsg;
        parentGridParam = options.parentGrid.params;
        if (options.parentGrid.type == "datagrid") {

        } else if (options.parentGrid.type == "treegrid") {

        }
    }

    //判断父表数据是否被选中
    var parentRow = getSelectedRowData(options.parentGrid.type, options.parentGrid.id);
    if (!parentRow) {
        $.messager.alert(
            topJUI.language.message.title.operationTips,
            options.parentGrid.unselectedMsg || topJUI.language.message.msg.selectParentGrid,
            topJUI.language.message.icon.warning
        );
        return;
    }

    //打开dialog前判断是否还有其它操作限制
    if (options.dialog.beforeOpenCheckUrl) {
        if (!beforeOpenCheck(replaceUrlParamValueByBrace(options.dialog.beforeOpenCheckUrl, parentRow))) return;
    }

    var $dialogObj = $("#" + options.dialog.id);
    $dialogObj.iDialog(options);

    // 保存原始href，以便在占位参数替换后还原
    var oriHref = options.dialog.href;
    var newHref = oriHref;
    if (options.dialog.href.indexOf("{") != -1) {
        if (options.dialog.href.indexOf("{parent.") != -1) {
            // 替换父表中选中行占位值
            newHref = replaceUrlParamValueByBrace(appendSourceUrlParam(oriHref), parentRow, "parent");
        }
        if (newHref.indexOf("{") != -1) {
            // 替换本表中选中行占位值
            var row = getSelectedRowData(options.grid.type, options.grid.id);
            newHref = replaceUrlParamValueByBrace(appendSourceUrlParam(newHref), row);
        }
        $dialogObj.dialog({
            href: newHref
        });
        $dialogObj.dialog('open');
    } else {
        $dialogObj.dialog('open');
    }
}

/**
 * 通过dialog的url参数加载数据到dialog中
 * @param options
 */
function openDialogAndloadDataByUrl(options) {
    //判断本表数据是否被选中
    var row = getSelectedRowData(options.grid.type, options.grid.id);
    if (!row) {
        $.messager.alert(
            topJUI.language.message.title.operationTips,
            topJUI.language.message.msg.selectSelfGrid,
            topJUI.language.message.icon.warning
        );
        return;
    }

    //打开dialog前判断是否还有其它操作限制
    if (options.dialog.beforeOpenCheckUrl) {
        if (!beforeOpenCheck(replaceUrlParamValueByBrace(options.dialog.beforeOpenCheckUrl, row))) return;
    }

    var $dialogObj = $("#" + options.dialog.id);
    $dialogObj.iDialog(options);

    // 保存原始url，以便在占位参数替换后还原
    var oriHref = options.dialog.href;
    if (options.dialog.href.indexOf("{") != -1) {
        // 替换本表中选中行占位值
        var newHref = replaceUrlParamValueByBrace(appendSourceUrlParam(oriHref), row);
        $dialogObj.dialog({
            href: newHref
        });
        //$dialogObj.dialog('open').dialog("refresh", newHref); //加载两次href指定的页面
        $dialogObj.dialog('open');
    } else {
        $dialogObj.dialog('open');
    }

}

/**
 * 打开一个对话框窗口
 * @param options
 */
function dialogHandler(options) {
    if (options.component == "loadData") {
        editHandler(options);
    } else if (options.action == "loadParentData") {
        addChildHandler(options);
    } else {
        addHandler(options);
    }
}

/**
 * 新增表格数据
 * @param options
 */
function addHandler(options) {
    var controllerUrl = getUrl("controller");
    var defaults = {
        gridId: 'datagrid'
        //dialogId      : 'addDialog',
        //dialogHref    : options.dialogHref ? options.dialogHref : controllerUrl + "edit"
    };
    options = $.extend(defaults, options);

    //clearDialogHrefKeyValue(options.addDialogId, "action,uuid");
    var dialogObj = $("#" + options.dialogId);
    dialogObj.dialog({
        //title : '新增数据',
        iconCls: 'fa fa-plus',
        toolbar: '#' + options.dialogId + '-toolbar',
        buttons: '#' + options.dialogId + '-buttons'
    });

    if (options.dialogHref != undefined) {
        dialogObj.dialog('refresh', options.dialogHref);
    }
    dialogObj.dialog('open');


}

/**
 * 检查授权
 * @param resource 资源值，可以是url也可以是标识
 */
function authCheck(resource) {
    if (topJUI.config.authUrl == "") {
        return true;
    } else {
        var isAuth = false;
        $.ajax({
            type: 'post',
            url: ctx + "/system/authAccess/getAuthByRoleIdAndUrl",
            data: {url: resource},
            async: false,
            success: function (data) {
                if (data == 0) {
                    var msgJson = {
                        title: topJUI.language.message.title.operationTips,
                        msg: topJUI.language.message.msg.permissionDenied,
                        icon: topJUI.language.message.icon.warning
                    };
                    $.messager.alert(msgJson);
                    isAuth = false;
                } else {
                    isAuth = true;
                }
            }
        });
        return isAuth;
    }
}

function beforeOpenCheck($checkUrl) {
    var isAuth = false;
    $.ajax({
        type: 'get',
        url: $checkUrl,
        async: false,
        success: function (data) {
            if (data.statusCode == 300) {
                var msgJson = {
                    title: topJUI.language.message.title.operationTips,
                    msg: data.message
                };
                $.messager.alert(msgJson);
                isAuth = false;
            } else {
                isAuth = true;
            }
        }
    });
    return isAuth;
}

//新增子表数据
function addChildHandler(options) {

    var row = $("#" + options.parentGridId).treegrid('getSelected') ? $("#" + options.parentGridId).treegrid('getSelected') : $("#" + options.parentGridId).datagrid('getSelected');
    if (row) {
        var controllerUrl = getUrl("controller");
        var defaults = {
            gridId: 'datagrid',
            //dialogId      : 'addDialog',
            dialogHref: options.dialogHref ? options.dialogHref : controllerUrl + "edit"
        }
        options = $.extend(defaults, options);

        //clearDialogHrefKeyValue(options.addDialogId, "action,uuid");
        var dialogObj = $("#" + options.dialogId);
        dialogObj.dialog({
            //title : '新增数据',
            iconCls: 'fa fa-plus',
            toolbar: '#' + options.dialogId + '-toolbar',
            buttons: '#' + options.dialogId + '-buttons'
        });

        if (options.dialogHref != undefined) {
            dialogObj.dialog('refresh', options.dialogHref);
        }
        dialogObj.dialog('open');
        setTimeout(function () {
            getTabWindow().$("#" + options.dialogId + " iframe").each(function (i) {
                this.contentWindow.document.body.innerHTML = '';
            });

            var jsonData = {};
            if (options.gridParam) {
                var gridParamArr = options.gridParam.split(",");
                //传递给dialog输入框的参数
                for (var i = 0; i < gridParamArr.length; i++) {
                    jsonData[gridParamArr[i]] = row[gridParamArr[i]];
                }
            }
            jsonData.puuid = row.uuid;

            dialogObj.form('load', jsonData);
        }, 500);
    } else {
        $.messager.alert(
            topJUI.language.message.title.operationTips,
            topJUI.language.message.msg.selectParentGrid,
            topJUI.language.message.icon.warning
        );
    }
}

//编辑表格数据
function editHandler(options) {
    var controllerUrl = getUrl("controller");
    var defaults = {
        gridId: 'datagrid',
        //dialogId      : 'editDialog',
        dialogHref: options.dialogHref ? options.dialogHref : controllerUrl + "edit",
        dialogUrl: options.dialogUrl ? options.dialogUrl : controllerUrl + "getDetailByUuid?uuid={uuid}"
    }
    options = $.extend(defaults, options);

    loadDialogData(options);
}

/**
 * 在复选框被选中的时候返回所有行
 * @param gridType
 * @param gridId
 * @returns {jQuery}
 */
function getCheckedRowsData(gridType, gridId) {
    return $("#" + gridId).treegrid('getChecked');
}

/**
 * 获得选中的datagrid或treegrid一行数据
 * @param options
 * @returns {*}
 */
function getSelectedRowData(gridType, gridId) {
    return getRowsDataBySelected(gridType, gridId, false);
}

/**
 * 获得选中的datagrid或treegrid多行数据
 * @param options
 * @returns {*}
 */
function getSelectedRowsData(gridType, gridId) {
    return getRowsDataBySelected(gridType, gridId, true);
}

/**
 * 获得选中的datagrid或treegrid一行或多行数据
 * @param options
 * @returns {*}
 */
function getRowsDataBySelected(gridType, gridId, multiple) {
    var rows = multiple ? $("#" + gridId).datagrid('getSelections') : $("#" + gridId).datagrid('getSelected');
    /*
     var rows;
     if (gridType == "datagrid") {
     rows = multiple ? $("#" + gridId).datagrid('getSelections') : $("#" + gridId).datagrid('getSelected');
     } else if (gridType == "treegrid") {
     rows = multiple ? $("#" + gridId).treegrid('getSelections') : $("#" + gridId).treegrid('getSelected');
     }
     */
    return rows;
}

function getRowsDataBySelected2(options, multiple) {
    var rows;
    var gridId;

    if (typeof options.parentGrid == "object") {
        gridId = options.parentGrid.id;
        if (options.parentGrid.type == "datagrid") {
            rows = multiple ? $("#" + gridId).datagrid('getSelections') : $("#" + gridId).datagrid('getSelected');
        } else if (options.parentGrid.type == "treegrid") {
            rows = multiple ? $("#" + gridId).treegrid('getSelections') : $("#" + gridId).treegrid('getSelected');
        }
    } else if (typeof options.grid == "object") {
        gridId = options.grid.id;
        if (options.grid.type == "datagrid") {
            rows = multiple ? $("#" + gridId).datagrid('getSelections') : $("#" + gridId).datagrid('getSelected');
        } else if (options.grid.type == "treegrid") {
            rows = multiple ? $("#" + gridId).treegrid('getSelections') : $("#" + gridId).treegrid('getSelected');
        }
    }
    return rows;
}

/**
 * 刷新多个表格
 * @param gridObj
 */
function refreshGrids(gridObj) {
    // 重新加载Grid数据
    if (typeof gridObj == 'object') {
        for (var i = 0; i < gridObj.length; i++) {
            var obj = gridObj[i];
            // 通过闭包嵌套和不同时序的执行来刷新grid
            (function (i) {
                setTimeout(function () {
                    refreshGrid(obj.type, obj.id, obj.clearQueryParams);
                }, i * 100);
            })(i);
        }
    }
}

/**
 * 刷新一个datagrid或treegrid
 * @param options
 */
function refreshGrid(gridType, gridId, clearQueryParams) {
    if (gridType == "datagrid") {
        if (clearQueryParams == true) {
            $("#" + gridId).datagrid({
                queryParams: {
                    clearQueryParams: ''
                }
            });
        }
        $("#" + gridId).datagrid('reload');
        $("#" + gridId).datagrid('unselectAll');
    } else if (gridType == "treegrid") {
        // 刷新整合表格
        //$("#" + options.treegrid.id).treegrid('reload');
        // 只刷新当前节点
        $("#" + gridId).treegrid('reload');
        $("#" + gridId).treegrid('unselectAll');
    }
}

/**
 * Ajax操作
 * @param options
 */
function doAjaxHandler(options) {
    var defaults = {
        gridId: 'datagrid',
        iconCls: 'fa fa-cog',
        comfirmMsg: topJUI.language.message.msg.comfirmMsg,
        grid: {
            uncheckedMsg: topJUI.language.message.msg.checkSelfGrid
        }
    }
    options = $.extend({}, defaults, options);
    options.url = appendSourceUrlParam(options.url);

    // 替换父表的占位数据
    if (options.url.indexOf("{parent") != -1) {
        var parentRow = getSelectedRowData(options.parentGrid.type, options.parentGrid.id);
        if (!parentRow) {
            $.messager.alert(
                topJUI.language.message.title.operationTips,
                topJUI.language.message.msg.selectParentGrid,
                topJUI.language.message.icon.warning
            );
            return;
        }
        options.url = replaceUrlParamValueByBrace(options.url, parentRow, "parent");
    }

    if (typeof options.grid == "object") {
        var dgOpts = $("#" + options.grid.id).datagrid('options');

        if (options.grid.multiCheck == true || options.grid.uncheckedMsg != undefined) {
            // 勾选复选框提交多条数据
            $("#" + options.grid.id).datagrid('multiCheckedAjax', options);
        } else {
            if (dgOpts.singleSelect == false) {
                $("#" + options.grid.id).datagrid('multiSelectedAjax', options);
            } else { // 提交单条记录
                $("#" + options.grid.id).datagrid('singleSelectedAjax', options);
            }
        }
    }


}

/**
 * 普通请求操作
 * @param options
 */
function requestHandler(options) {
    options.url = appendSourceUrlParam(options.url);

    if (typeof options.grid == "object") {
        // 替换本表的占位数据
        var row = getSelectedRowData(options.grid.type, options.grid.id);
        if (row == null) {
            $.messager.alert(
                topJUI.language.message.title.operationTips,
                topJUI.language.message.msg.selectSelfGrid,
                topJUI.language.message.icon.warning
            );
            return;
        }
        // 替换本表中选择的单行字段值
        options.newUrl = replaceUrlParamValueByBrace(options.url, row);
    } else {
        options.newUrl = options.url;
    }

    window.location.href = options.newUrl;
}

/**
 * 删除表格数据
 * @param options
 */
function deleteHandler(options) {
    // 权限控制
    var oriUrl = options.url ? options.url : getUrl("controller") + "delete"

    var defaults = {
        gridId: 'datagrid',
        url: options.url ? appendSourceUrlParam(options.url) : getUrl("controller") + "delete" + location.search
    }
    options = $.extend(defaults, options);

    var rows = getCheckedRowsData(options.grid.type, options.grid.id);
    if (rows.length == 0) {
        $.messager.alert(
            topJUI.language.message.title.operationTips,
            topJUI.language.message.msg.checkSelfGrid,
            topJUI.language.message.icon.warning
        );
        return;
    }
    $.messager.confirm(
        topJUI.language.message.title.confirmTips,
        topJUI.language.message.msg.confirmDelete,
        function (flag) {
            if (flag) {
                options.ajaxData = {
                    uuid: getMultiRowsFieldValue(rows, "uuid"),
                    uuids: getMultiRowsFieldValue(rows, "uuid")
                };

                if (doAjax(options)) {
                    refreshGrid(options.grid.type, options.grid.id);
                }
            }
        });
}

/**
 * 过滤表格数据
 * @param options
 */
function filterHandler(options) {
    if (typeof options.grid == "object") {
        var gridId = options.grid.id;
        var gridOptions = $("#" + gridId).datagrid("options");
        var filter = gridOptions.filter ? gridOptions.filter : [];
        if (options.grid.type == "datagrid") {
            if ($(".datagrid-filter-row").length > 0) {
                $("#" + gridId).datagrid('disableFilter');
            } else {
                $("#" + gridId).datagrid('enableFilter', filter);
            }
        } else if (options.grid.type == "treegrid") {
            if ($(".datagrid-filter-row").length > 0) {
                $("#" + gridId).treegrid('disableFilter');
            } else {
                $("#" + gridId).treegrid('enableFilter', filter);
            }
        }
    }
}

/**
 * 高级查询表格数据
 * @param options
 */
function searchHandler(options) {
    // 获得查询字段信息
    if (typeof options.grid == "object") {
        getColumnsNameAndField(options.grid.type, options.grid.id);
    }

    // 组合查询对话框内容
    var searchContent = '<table id="advanceSearchTable" class="editTable">';
    searchContent += '<tr>';
    searchContent += '<td style="font-weight: bold;">方式</td>';
    searchContent += '<td style="font-weight: bold;">左括号</td>';
    searchContent += '<td style="font-weight: bold;">字段</td>';
    searchContent += '<td style="font-weight: bold;">条件</td>';
    searchContent += '<td style="font-weight: bold;">数值</td>';
    searchContent += '<td style="font-weight: bold;">右括号</td>';
    searchContent += '<td style="font-weight: bold;">操作</td>';
    searchContent += '</tr>';
    searchContent += '<tr>';
    searchContent += '<td><input type="text" class="join" name="join"></td>';
    searchContent += '<td><input type="text" class="lb" name="lb"></td>';
    searchContent += '<td><input type="text" class="field" name="field"></td>';
    searchContent += '<td><input type="text" class="op" name="op"></td>';
    searchContent += '<td><input type="text" class="value" name="value"></td>';
    searchContent += '<td><input type="text" class="rb" name="rb"></td>';
    searchContent += '<td><a id="addCondition" href="javascript:void(0)"></a>';
    searchContent += '</td>';
    searchContent += '</tr>';
    searchContent += '</table>';

    // 组合查询对话框默认属性
    var defaults = {
        dialog: {
            id: 'advanceSearchDialog',
            title: '组合查询',
            width: 700,
            height: 300,
            modal: false,
            collapsible: true,
            minimizable: false,
            maximized: false,
            resizable: true,
            closed: false,
            closable: true,
            zIndex: 10,
            iconCls: 'fa fa-search',
            //href: '/html/search/form.html',
            content: searchContent,
            buttons: '#advanceSearchDialog-buttons',
            onOpen: function () {
                //窗口打开时，触发事件
                $(this).trigger(topJUI.eventType.initUI.advanceSearchForm);
            }
        }
    };
    options = $.extend(defaults, options);

    // 组合查询对话框
    var searchForm = '<form id="advanceSearchDialog"></form>';
    searchForm += '<div id="advanceSearchDialog-buttons" style="display:none">';
    searchForm += '<a href="#" id="resetAdvanceSearchForm" data-toggle="easyui-linkbutton" data-options="iconCls:\'icon-reload\'">清空</a>';
    searchForm += '<a href="#" id="submitAdvanceSearchForm" data-toggle="topjui-linkbutton" data-options="iconCls:\'icon-search\'">查询</a>';
    searchForm += '<a href="#" id="closeAdvanceSearchDialog">关闭</a>';
    searchForm += '</div>';
    getTabWindow().$('body').append(searchForm);

    // 打开组合查询对话框
    var dialogObj = $("#" + options.dialog.id);
    dialogObj.dialog(options.dialog);

    // 重置查询条件
    $('#resetAdvanceSearchForm').linkbutton({
        iconCls: 'fa fa-refresh',
        onClick: function () {
            var formDataArr = [];
            loadGrid(formDataArr);
        }
    });

    // 提交查询请求
    $('#submitAdvanceSearchForm').linkbutton({
        iconCls: 'fa fa-search',
        onClick: function () {
            var formDataArr = [];
            var formData = $("#" + options.dialog.id).serializeArray();
            var num = formData.length / 6;
            for (var i = 0; i < num; i++) {
                var join = formData[i * 6 + 0].name;
                var joinValue = formData[i * 6 + 0].value;
                var lb = formData[i * 6 + 1].name;
                var lbValue = formData[i * 6 + 1].value;
                var field = formData[i * 6 + 2].name;
                var fieldValue = formData[i * 6 + 2].value;
                var op = formData[i * 6 + 3].name;
                var opValue = formData[i * 6 + 3].value;
                var value = formData[i * 6 + 4].name;
                var valValue = formData[i * 6 + 4].value;
                var rb = formData[i * 6 + 5].name;
                var rbValue = formData[i * 6 + 5].value;

                formDataArr.push({
                    join: joinValue,
                    lb: lbValue,
                    field: fieldValue,
                    op: opValue,
                    value: valValue,
                    rb: rbValue
                });
            }
            // console.log(JSON.stringify(formDataArr));
            loadGrid(formDataArr);
        }
    });

    // 关闭查询对话框
    $('#closeAdvanceSearchDialog').linkbutton({
        iconCls: 'fa fa-close',
        onClick: function () {
            $("#" + options.dialog.id).dialog('close');
            //$(this).closest(".window-body").dialog("destroy");
        }
    });

    // 新增查询条件
    var html = '<tr>';
    html += '<td><input type="text" class="join" name="join"></td>';
    html += '<td><input type="text" class="lb" name="lb"></td>';
    html += '<td><input type="text" class="field" name="field"></td>';
    html += '<td><input type="text" class="op" name="op"></td>';
    html += '<td><input type="text" class="value" name="value"></td>';
    html += '<td><input type="text" class="rb" name="rb"></td>';
    html += '<td><a class="deleteCondition" href="javascript:void(0)"></a></td></tr>';
    $("#addCondition").on('click', function () {
        $("#advanceSearchTable").append(html);
        $(this).trigger(topJUI.eventType.initUI.advanceSearchForm);
    });
}

/**
 * 导入表格数据
 * @param options
 */
function importHandler(options) {
    if (typeof options.grid == "object") {
        getColumnsNameAndField(options.grid.type, options.grid.id);

        var dialogObj = $("#importExcelDialog");
        dialogObj.dialog({
            title: '导入Excel数据',
            iconCls: 'icon-find',
            toolbar: '#importDialog-toolbar',
            buttons: '#importDialog-buttons'
        });

        dialogObj.dialog('open');
    }
}

/**
 * 获得grid的中文列名及字段名
 * @param gridType
 * @param gridId
 */
function getColumnsNameAndField(gridType, gridId) {
    var frozenFieldName = [];
    var liveFieldName = [];
    var fieldName = [];
    var colName = [];

    if (gridType == "datagrid") {
        frozenFieldName = $("#" + gridId).datagrid('getColumnFields', true);
        liveFieldName = $("#" + gridId).datagrid('getColumnFields');
        fieldName = frozenFieldName.concat(liveFieldName);
        for (var i = 0; i < fieldName.length; i++) {
            var col = $("#" + gridId).datagrid("getColumnOption", fieldName[i]);
            colName.push(col.title);
        }
    } else if (gridType == "treegrid") {
        frozenFieldName = $("#" + gridId).treegrid('getColumnFields', true);
        liveFieldName = $("#" + gridId).treegrid('getColumnFields');
        fieldName = frozenFieldName.concat(liveFieldName);
        for (var j = 0; j < fieldName.length; j++) {
            var col = $("#" + gridId).treegrid("getColumnOption", fieldName[j]);
            colName.push(col.title);
        }
    }

    var colNameStr = colName.join(',').replace(/,操作/g, "").replace(/操作,/g, "");
    var fieldNameStr = fieldName.join(',').replace(/,handle/g, "").replace(/handle,/g, "");

    $.cookie('gridId', gridId);
    $.cookie('gridType', gridType);
    $.cookie('colNameStr', colNameStr);
    $.cookie('fieldNameStr', fieldNameStr);
}

/**
 * 导出表格数据
 * @param options
 */
function exportHandler(options) {
    var controllerUrl = getUrl("controller");
    var defaults = {
        gridId: 'datagrid',
        //url: '/system/index/requestSuccess',
        excelTitle: parent.$('#index_tabs').tabs('getSelected').panel('options').title + "_导出数据_" + getCurrentDatetime("YmdHis"),
        url: options.url ? options.url : controllerUrl + "exportExcel"
    }
    options = $.extend(defaults, options);

    var gridId;
    var frozenFieldName;
    var liveFieldName;
    var fieldName;
    var columnOption;
    var colName = [];
    var hiddenMark = [];

    if (typeof options.grid == "object") {
        gridId = options.grid.id;
        if (options.grid.type == "datagrid") {
            frozenFieldName = $("#" + gridId).datagrid('getColumnFields', true);
            liveFieldName = $("#" + gridId).datagrid('getColumnFields');
            fieldName = frozenFieldName.concat(liveFieldName);
            for (var i = 0; i < fieldName.length; i++) {
                columnOption = $("#" + gridId).datagrid("getColumnOption", fieldName[i]);
                colName.push(columnOption.title);
                if (columnOption.hidden == true || columnOption.checkbox == true)
                    hiddenMark.push(true);
                else
                    hiddenMark.push(false);
            }
        } else if (options.grid.type == "treegrid") {
            frozenFieldName = $("#" + gridId).treegrid('getColumnFields', true);
            liveFieldName = $("#" + gridId).treegrid('getColumnFields');
            fieldName = frozenFieldName.concat(liveFieldName);
            for (var j = 0; j < fieldName.length; j++) {
                columnOption = $("#" + gridId).treegrid("getColumnOption", fieldName[j]);
                colName.push(columnOption.title);
                if (columnOption.hidden == true || columnOption.checkbox == true)
                    hiddenMark.push(true);
                else
                    hiddenMark.push(false);
            }
        }
    }

    // 去除隐藏的列
    for (var h = 0; h < hiddenMark.length; h++) {
        if (hiddenMark[h]) {
            colName.splice(h, 1);
            fieldName.splice(h, 1);
            hiddenMark.splice(h, 1);
            h--;
        }
    }

    var colNameStr = colName.join(',').replace(/,操作/g, "").replace(/操作,/g, "");
    var fieldNameStr = fieldName.join(',').replace(/,handle/g, "").replace(/handle,/g, "");

    options.ajaxData = {
        excelTitle: options.excelTitle,
        colName: colNameStr,
        fieldName: fieldNameStr
    };

    //if (doAjax(options)) {
    window.location.href = options.url + '?excelTitle=' + options.excelTitle + '&colName=' + colNameStr + '&fieldName=' + fieldNameStr;
    //}
}


//撤销表格数据
function redoHandler() {
    $(options.gridId).datagrid('rejectChanges');
    $(options.gridId).datagrid('unselectAll');
}

// ajax操作
function doAjax(options) {
    var result = false;

    var defaults = {
        //confirmMsg: '确定要进行该操作吗？'
    }
    options = $.extend(defaults, options);

    $.ajax({
        //url: options.url + location.search,
        url: options.url,
        type: 'post',
        data: options.ajaxData,
        dataType: "json",
        async: false,
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        beforeSend: function () {
            $.messager.progress({text: '正在操作...'});
        },
        success: function (data, response, status) {
            $.messager.progress('close');
            showMessage(data);

            // 重新加载指定的Grid数据
            refreshGrids(options.reload);

            if (data.statusCode == 1 || data.statusCode == 100 || data.statusCode == 200) {
                result = true;
            } else {
                result = false;
            }
        }
    });

    return result;
}

/**
 * 设置对话框href附加参数及值
 * @param dialogId
 */
function setDialogHrefKeyValue(dialogId, paramStr, paramValueStr) {

    var paramArr = paramStr.split(",");
    var paramValueArr = paramValueStr.split(",");

    var dialogHref = $(dialogId).dialog('options').href;
    var keyValue = "";
    for (i = 0; i < paramArr.length; i++) {
        if (dialogHref.indexOf("?") > 0) {
            if (dialogHref.indexOf(paramArr[i] + "=" + paramValueArr[i]) == -1) {
                keyValue += "&" + paramArr[i] + "=" + paramValueArr[i];
            }
        } else {
            if (i == 0) {
                keyValue = "?" + paramArr[i] + "=" + paramValueArr[i];
            } else {
                keyValue += "&" + paramArr[i] + "=" + paramValueArr[i];
            }

        }
    }
    $(dialogId).dialog('options').href = dialogHref + keyValue;
}

function clearDialogHrefKeyValue(dialogId, paramStr) {

    var paramArr = paramStr.split(",");
    var dialogHref = $(dialogId).dialog('options').href;
    if (dialogHref.indexOf("?") > 0) {
        var newUrlParam = ""
        var urlMain = dialogHref.substring(0, dialogHref.indexOf("?") + 1);
        var urlParam = dialogHref.substring(dialogHref.indexOf("?") + 1);
        var urlParamArray = urlParam.split("&");
        for (i = 0; i < urlParamArray.length; i++) {
            for (j = 0; j < paramArr.length; j++) {
                if (urlParamArray[i].indexOf(paramArr[j] + "=") >= 0) {
                    urlParamArray.remove(i);
                }
            }
        }
        if (urlParamArray.length == 1) {
            newUrlParam = urlParamArray[0];
        } else if (urlParamArray.length > 1) {
            newUrlParam = urlParamArray.join("&");
        }

        var newUrl = "";
        newUrl = urlMain + newUrlParam;
        var lastStr = newUrl.substring(newUrl.length - 1);
        if (lastStr == "?") {
            newUrl = newUrl.substring(0, newUrl.length - 1);
        }

    } else {
        newUrl = dialogHref;
    }

    $(dialogId).dialog('options').href = newUrl;
}

// 表单提交返回提示信息判断
// msgCode为1或200时，右下弹出自动关闭提示
// msgCode为100时，中间弹出手动关闭提示
function msgFn(data) {
    var msgJson = {};
    var msgCode = "";
    if (typeof(data) == "object") {
        msgCode = data.code;
        msgJson = {
            title: data.title,
            msg: data.message
        };
    } else {
        msgCode = data;
        if (data == 1) {
            msgJson = {
                title: '温馨提示',
                msg: '操作成功'
            };
        } else {
            msgJson = {
                title: '温馨提示',
                msg: '操作失败！未知错误，请重试！'
            };
        }
    }
    if (msgCode == 1 || msgCode == 100 || msgCode == 200) {
        if (msgCode == 1 || msgCode == 200)
            $.messager.show(msgJson);
        else
            $.messager.alert(msgJson);
        //$(options.currentDialogId).dialog('close').form('reset');
        //$(options.gridId).datagrid('reload');

        /*if(options.refreshTreeId) {
         var node = $(options.refreshTreeId).tree('getSelected');
         var parentNode = $(options.refreshTreeId).tree('getParent', node.target);
         $(options.refreshTreeId).tree('reload', parentNode.target);
         //$(options.refreshTreeId).tree('reload', node.target);
         }*/

    } else {
        $.messager.alert(msgJson);
    }
}

/**
 * 显示提供信息
 * @param data
 */
function showMessage(data) {
    var messageJson = {};
    var statusCode = "";
    if (typeof(data) == "object") {
        statusCode = data.statusCode;
        if (data.icon == undefined) {
            data.icon = topJUI.language.message.icon.info;
        }
        messageJson = {
            showType: topJUI.language.message.showType.slide,
            title: data.title,
            msg: data.message,
            icon: data.icon
        };
    } else {
        statusCode = data;
        if (data == 1) {
            messageJson = {
                showType: topJUI.language.message.showType.slide,
                title: topJUI.language.message.title.operationTips,
                msg: topJUI.language.message.msg.success,
                icon: topJUI.language.message.icon.info
            };
        } else {
            messageJson = {
                showType: topJUI.language.message.showType.slide,
                title: topJUI.language.message.title.operationTips,
                msg: topJUI.language.message.msg.failed,
                icon: topJUI.language.message.icon.error
            };
        }
    }

    if (statusCode == 1 || statusCode == 100 || statusCode == 200) {
        if (statusCode == 1 || statusCode == 200) {
            //showMask();
            //setTimeout(hideMask, 1000);
            messageJson.timeout = 1000;
            $.messager.show(messageJson); //状态码为1和200时，屏幕中上部弹出操作成功提示框
        } else {
            $.messager.alert(messageJson); //状态码为100时，屏幕中央弹出操作成功提示框
        }
    } else {
        $.messager.alert(messageJson);  //状态码为300时，屏幕中央弹出操作失败提示框
    }
}

/**
 * 替换url中的{}占位符值
 * @param url
 * @param dataObj
 * @param prefix
 * @returns {*}
 */
function replaceUrlParamValueByBrace(url, dataObj, prefix) {
    var newUrl = url;
    if (url && url.indexOf("{") >= 0) {

        // 如果是多维对象，则取第一条记录，用于替换选中的单选记录值
        var newDataObj = isMultiObj(dataObj) ? dataObj[0] : dataObj;

        // var regExp = /{([\s\S]*?)}/g;
        var newPrefix = isNull(prefix) ? "" : prefix + ".";
        var regExp = new RegExp("{" + newPrefix + "(.*?)}", "g");
        var paramArr = url.match(regExp);
        if (paramArr.length > 0) {
            for (var i = 0; i < paramArr.length; i++) {
                var field = paramArr[i].replace("{" + newPrefix, "").replace("}", "");
                if (prefix == "multiple") {
                    newUrl = newUrl.replace(paramArr[i], getMultiRowsFieldValue(dataObj, field));
                } else {
                    newUrl = newUrl.replace(paramArr[i], newDataObj[field]);
                }
            }
        }
    }
    return newUrl;
}

function convertParamValue2Object(url, dataObj, prefix) {
    var newUrl = url;
    if (url && url.indexOf("{") >= 0) {
        var obj = {};
        // 如果是多维对象，则取第一条记录，用于替换选中的单选记录值
        var newDataObj = isMultiObj(dataObj) ? dataObj[0] : dataObj;

        // var regExp = /{([\s\S]*?)}/g;
        var newPrefix = isNull(prefix) ? "" : prefix + ".";
        var regExp = new RegExp("{" + newPrefix + "(.*?)}", "g");
        var paramArr = url.match(regExp);
        if (paramArr.length > 0) {
            for (var i = 0; i < paramArr.length; i++) {
                var field = paramArr[i].replace("{" + newPrefix, "").replace("}", "");
                if (prefix == "multiple") {
                    obj[field] = newUrl.replace(paramArr[i], getMultiRowsFieldValue(dataObj, field));
                } else {
                    obj[field] = newUrl.replace(paramArr[i], newDataObj[field]);
                }
            }
        }
    }
    return obj;
}

/**
 * 根据传递过来的paramObj，替换其中对应的值
 * @param paramObj
 * @param dataObj
 * @returns {{}} 返回带实际值的对象数据
 */
function convertParamObj2ObjData(paramObj, dataObj) {
    var obj = {};
    var param, field;
    for (param in paramObj) {
        field = paramObj[param];
        if (isMultiObj(dataObj)) {
            obj[param] = getMultiRowsFieldValue(dataObj, field);
        } else {
            obj[param] = "'" + dataObj[field] + "'";
        }
    }
    return obj;
}

/**
 * 根据选中的多行记录，获得多行记录的以逗号分隔的某个字段值组合
 * @param rowsData
 * @param field
 * @returns {string}
 */
function getMultiRowsFieldValue(rowsData, field) {
    var fieldArr = [];
    for (var i = 0; i < rowsData.length; i++) {
        fieldArr.push("'" + rowsData[i][field] + "'");
    }
    return fieldArr.join(',');
}

/**
 * 将表单数据序列化为json数据
 * $("#form").serializeObject();
 * @returns {{}}
 */
$.fn.serializeObject = function () {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function () {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};;var defaultConfig = {
    pageLoadComplete: false,
    config: {
        ctx: "",
        mainPage: false,
        pkName: "uuid"
    },
    language: {
        message: {
            showType: {
                slide: "slide",
                fade: "fade",
                show: "show"
            },
            title: {
                operationTips: "操作提示",
                confirmTips: "确认提示"
            },
            msg: {
                success: "操作成功",
                failed: "操作失败",
                error: "未知错误",
                checkSelfGrid: "请先勾选要操作的数据前的复选框",
                selectSelfGrid: "请先选中要操作的数据",
                selectParentGrid: "请先选中主表中要操作的一条数据",
                permissionDenied: "对不起，你没有操作权限",
                confirmDelete: "你确定要删除所选的数据吗？"
            },
            icon: {
                error: "error",
                question: "question",
                info: "info",
                warning: "warning"
            }
        }
    },
    eventType: {
        //initUI     : 'topjui.initForm',         // When document load completed or ajax load completed, B-JUI && Plugins init
        initUI: {
            base: 'topjui.initUI.base',
            dialog: 'topjui.initUI.dialog',
            base2: 'topjui.initUI.base2',
            echarts: 'topjui.initUI.echarts',
            form: 'topjui.initUI.form',
            advanceSearchForm: 'topjui.initUI.advanceSearchForm',
            importExcelForm: 'topjui.initUI.importExcelForm'
        },
        beforeInitUI: 'topjui.beforeInitUI',   // If your DOM do not init [add to DOM attribute 'data-noinit="true"']
        afterInitUI: 'topjui.afterInitUI',    //
        ajaxStatus: 'topjui.ajaxStatus',     // When performing ajax request, display or hidden progress bar
        resizeGrid: 'topjui.resizeGrid',     // When the window or dialog resize completed
        beforeAjaxLoad: 'topjui.beforeAjaxLoad', // When perform '$.fn.ajaxUrl', to do something...

        beforeLoadNavtab: 'topjui.beforeLoadNavtab',
        beforeLoadDialog: 'topjui.beforeLoadDialog',
        afterLoadNavtab: 'topjui.afterLoadNavtab',
        afterLoadDialog: 'topjui.afterLoadDialog',
        beforeCloseNavtab: 'topjui.beforeCloseNavtab',
        beforeCloseDialog: 'topjui.beforeCloseDialog',
        afterCloseNavtab: 'topjui.afterCloseNavtab',
        afterCloseDialog: 'topjui.afterCloseDialog'
    }
};
topJUI = $.extend(true, defaultConfig, topJUI);

/* TopJUI默认属性 */
var defaultHeight = 34;
$.fn.switchbutton.defaults.height = defaultHeight;
$.fn.textbox.defaults.height = defaultHeight;
$.fn.passwordbox.defaults = defaultHeight;
$.fn.combo.defaults.height = defaultHeight;
$.fn.combobox.defaults.height = defaultHeight;
$.fn.combotree.defaults.height = defaultHeight;
$.fn.combogrid.defaults.height = defaultHeight;
$.fn.combotreegrid.defaults.height = defaultHeight;
$.fn.numberbox.defaults = defaultHeight;
$.fn.datebox.defaults = defaultHeight;
$.fn.datetimebox.defaults = defaultHeight;
$.fn.spinner.defaults = defaultHeight;
$.fn.numberspinner.defaults.height = defaultHeight;;(function ($) {
    $.fn.iDatagrid = function (options) {
        var defaults = {
            //datagridId       : element.get(0).id,
            datagridId: this.selector,
            width: '100%',
            height: '100%',
            autoRowHeight: false,
            nowrap: true,
            fit: true,
            fitColumns: false,
            border: false,
            striped: true,
            singleSelect: true,
            url: "",
            toolbar: this.selector + "-toolbar",
            columns: [[{field: 'uuid', title: 'UUID', align: 'center'},
                {field: 'title', title: '标题', align: 'left'},
                {field: 'creator', title: '发布人', align: 'center'},
                {field: 'createTime', title: '发布时间', align: 'center'}]],
            multiSort: false,
            sortName: "",
            sortOrder: "",
            //toolbar          : this.selector + 'Toolbar',
            addButton: true,
            editButton: true,
            deleteButton: true,
            searchButton: true,
            addDialogTitle: '新增',
            editDialogTitle: '编辑',
            rownumbers: true,
            pagination: true,
            pageNumber: 1,
            pageSize: 20,
            pageList: [20, 30, 40, 50, 100, 200],
            editable: true,
            queryFormId: "",      // search form id
            queryAction: "",      // search from action
            infoFormId: "",      // info form id
            infoAddAction: "",    	// info data add action
            infoUpdateAction: "", 		// info update action
            infoDlgDivId: "",     	// info data detail/edit dlg div id
            deleteAction: "",     	// data delete action  from ajax
            deleteMsg: "",      // show the message before do delete
            moveDlgDivId: "",     	// the div id of dialog for move show
            moveFormId: "",      // the form id for move
            moveTreeId: "",      // the combotree id for move
            queryParams: {},      // search params name for post, must to be {}
            queryParamsVCN: {},   	// search params value from htmlcontrol name, must to be {}
            checkOnSelect: false,
            selectOnCheck: false,
            kindEditor: [],
            addDialogId: '#editDialog',
            editDialogId: '#editDialog',
            gridParam: 'uuid'
        }

        var options = $.extend(defaults, options);

        var controllerUrl = getUrl('controller');
        options.url = options.url ? options.url : controllerUrl + "getPageSetData";
        options.getDetailUrl = options.getDetailUrl ? options.getDetailUrl : controllerUrl + "getDetailByUuid";
        options.addDialogHref = options.addDialogHref ? options.addDialogHref : controllerUrl + "add";
        options.saveUrl = options.saveUrl ? options.saveUrl : controllerUrl + "save";
        options.editDialogHref = options.editDialogHref ? options.editDialogHref : controllerUrl + "edit";
        options.updateUrl = options.updateUrl ? options.updateUrl : controllerUrl + "update";
        options.deleteUrl = options.deleteUrl ? options.deleteUrl : controllerUrl + "delete";

        $(this).datagrid({
            filterBtnIconCls: 'fa fa-filter',
            remoteFilter: true,
            width: options.width,
            height: options.height,
            autoRowHeight: options.autoRowHeight,
            nowrap: options.nowrap,
            striped: options.striped,
            singleSelect: options.singleSelect,
            url: appendSourceUrlParam(options.url),
            toolbar: options.toolbar,
            //queryParams : {},
            loadMsg: options.loadMsg,
            rownumbers: options.rownumbers,
            pagination: options.pagination,
            paginPosition: 'bottom',
            pageNumber: options.pageNumber,
            pageSize: options.pageSize,
            pageList: options.pageList,
            frozenColumns: options.frozenColumns,
            columns: options.columns,
            multiSort: options.multiSort,
            sortName: options.sortName,
            sortOrder: options.sortOrder,
            fit: options.fit,
            fitColumns: options.fitColumns,
            border: options.border,
            checkOnSelect: options.checkOnSelect,
            selectOnCheck: options.selectOnCheck,
            //bodyCls : "leftBottomBorder",
            onBeforeLoad: function (param) {

            },
            onLoadSuccess: function () {

                //$('#' + options.id).datagrid('doCellTip', {cls: {'background-color': 'red'}, delay: 500});
                $('#' + options.id).datagrid('doCellTip', {cls: {}, delay: 500});

                //$(this).datagrid("fixRownumber");
                if (typeof options.childGrid == "object") {
                    var refreshGridIdArr = options.childGrid.grids;
                    for (var i = 0; i < refreshGridIdArr.length; i++) {
                        var syncReload = refreshGridIdArr[i].syncReload;
                        if (syncReload) {
                            var $grid = $("#" + refreshGridIdArr[i].id);
                            if (refreshGridIdArr[i]["type"] == "datagrid") {
                                $grid.datagrid('load');
                            } else if (refreshGridIdArr[i].type == "treegrid") {
                                $grid.treegrid('load');
                            }
                        }
                    }
                }
            },
            onClickRow: function (index, row) {
                //传递给要刷新表格的参数
                if (typeof options.childGrid == "object") {
                    var newQueryParams = {};
                    newQueryParams = getSelectedRowJson(options.childGrid.params, row);

                    var refreshGridIdArr = options.childGrid.grids;
                    for (var i = 0; i < refreshGridIdArr.length; i++) {
                        // 通过闭包嵌套和不同时序的执行来刷新grid
                        (function (i) {
                            setTimeout(function () {
                                var $grid = $("#" + refreshGridIdArr[i].id);
                                if (refreshGridIdArr[i]["type"] == "datagrid") {
                                    //获得表格原有的参数
                                    var queryParams = $grid.datagrid('options').queryParams;
                                    $grid.datagrid('options').queryParams = $.extend({}, queryParams, newQueryParams);
                                    $grid.datagrid('load');
                                } else if (refreshGridIdArr[i].type == "treegrid") {
                                    //获得表格原有的参数
                                    var queryParams = $grid.treegrid('options').queryParams;
                                    $grid.treegrid('options').queryParams = $.extend({}, queryParams, newQueryParams);
                                    $grid.treegrid('load');
                                } else if (refreshGridIdArr[i].type == "panel") {
                                    var href = replaceUrlParamValueByBrace(refreshGridIdArr[i].href, newQueryParams);
                                    $grid.panel('refresh', href);
                                }
                            }, i * 100);
                        })(i);
                    }
                }

                if (typeof options.childTab == "object") {
                    var childTabArr = options.childTab.tabs;
                    for (var i = 0; i < childTabArr.length; i++) {
                        var $tabsElement = $('#' + childTabArr[i].id);
                        var $tabsOptions = $tabsElement.tabs('options');
                        var selectedIndex = $tabsElement.tabs('getTabIndex', $tabsElement.tabs('getSelected'));
                        var tabsComponent = $tabsOptions.tabs;
                        var $element = $("#" + tabsComponent[selectedIndex].id);

                        var newQueryParams = {};

                        newQueryParams = getSelectedRowJson(childTabArr[i].params, row);

                        if (tabsComponent[selectedIndex]["type"] == "datagrid") {
                            //获得表格原有的参数
                            var queryParams = $element.datagrid('options').queryParams;
                            $element.datagrid('options').queryParams = $.extend({}, queryParams, newQueryParams);
                            $element.datagrid('load');
                        } else if (tabsComponent[selectedIndex]["type"] == "treegrid") {
                            //获得表格原有的参数
                            var queryParams = $element.treegrid('options').queryParams;
                            $element.treegrid('options').queryParams = $.extend({}, queryParams, newQueryParams);
                            $element.treegrid('load');
                        } else if (tabsComponent[selectedIndex]["type"] == "panel") {
                            var panelOptions = $element.panel('options');
                            var newHref = replaceUrlParamValueByBrace(panelOptions.dynamicHref, row);
                            //$element.panel('refresh', newHref);
                            var iframe = '<iframe src="' + newHref + '" scrolling="auto" frameborder="0" style="width:100%;height:100%;"></iframe>';
                            $element.panel({
                                content: iframe
                            });
                        }
                    }
                }
            }

        });

        //$(this).datagrid('disableFilter', options.filterOption);

        //重新加载datagrid的数据
        //$(this).datagrid('reload');

    }

    /**
     * @author 小策一喋
     * @requires jQuery,EasyUI
     * 为datagrid、treegrid增加表头菜单，用于显示或隐藏列，注意：冻结列不在此菜单中
     */
    var createGridHeaderContextMenu = function (e, field) {
        e.preventDefault();
        var grid = $(this);
        /* grid本身 */
        var headerContextMenu = this.headerContextMenu;
        /* grid上的列头菜单对象 */
        var okCls = 'tree-checkbox1'; // 选中
        var emptyCls = 'tree-checkbox0'; // 取消
        if (!headerContextMenu) {
            var tmenu = $('<div style="width:150px;"></div>').appendTo('body');
            var fields = grid.datagrid('getColumnFields');
            for (var i = 0; i < fields.length; i++) {
                var fieldOption = grid.datagrid('getColumnOption', fields[i]);
                if (!fieldOption.hidden) {
                    $('<div iconCls="' + okCls + '" field="' + fields[i] + '"/>').html(fieldOption.title).appendTo(tmenu);
                } else {
                    $('<div iconCls="' + emptyCls + '" field="' + fields[i] + '"/>').html(fieldOption.title).appendTo(tmenu);
                }
            }
            headerContextMenu = this.headerContextMenu = tmenu.menu({
                onClick: function (item) {
                    var field = $(item.target).attr('field');
                    if (item.iconCls == okCls) {
                        grid.datagrid('hideColumn', field);
                        $(this).menu('setIcon', {
                            target: item.target,
                            iconCls: emptyCls
                        });
                    } else {
                        grid.datagrid('showColumn', field);
                        $(this).menu('setIcon', {
                            target: item.target,
                            iconCls: okCls
                        });
                    }
                    headerContextMenu.menu('show');
                }
            });
        }
        headerContextMenu.menu('show', {
            left: e.pageX,
            top: e.pageY
        });
    };
    $.fn.datagrid.defaults.onHeaderContextMenu = createGridHeaderContextMenu;
    $.fn.treegrid.defaults.onHeaderContextMenu = createGridHeaderContextMenu;

    $.extend($.fn.datagrid.methods, {
        /**
         * 单选ajax提交
         * @param target
         * @param options
         */
        singleSelectedAjax: function (target, options) {
            // 替换本表的占位数据
            var row = getSelectedRowData(options.grid.type, options.grid.id);
            if (row == null) {
                $.messager.alert(
                    topJUI.language.message.title.operationTips,
                    topJUI.language.message.msg.selectSelfGrid,
                    topJUI.language.message.icon.warning
                );
                return;
            }
            // 替换本表中选择的单行字段值
            options.url = replaceUrlParamValueByBrace(options.url, row);
            $.messager.confirm(
                topJUI.language.message.title.confirmTips,
                options.comfirmMsg,
                function (flag) {
                    if (flag && doAjax(options)) {
                        refreshGrid(options.grid.type, options.grid.id);
                    }
                }
            );
        },
        /**
         * 多选ajax提交
         * @param target
         * @param options
         */
        multiSelectedAjax: function (target, options) {
            //var datagridOpts = $.data(target[0], "datagrid").options;
            // 替换本表的占位数据
            var rows = getSelectedRowsData(options.grid.type, options.grid.id);
            if (rows.length == 0) {
                $.messager.alert(
                    topJUI.language.message.title.operationTips,
                    topJUI.language.message.msg.selectSelfGrid,
                    topJUI.language.message.icon.warning
                );
                return;
            }
            $.messager.confirm(
                topJUI.language.message.title.confirmTips,
                options.comfirmMsg,
                function (flag) {
                    if (options.grid.param == undefined) {
                        //options.grid.param = {uuid: topJUI.config.pkName};
                        options.grid.param = topJUI.config.pkName + ":" + topJUI.config.pkName;
                    }
                    options.grid.param = param2JsonObj(options.grid.param);
                    options.ajaxData = convertParamObj2ObjData(options.grid.param, rows);
                    if (flag && doAjax(options)) {
                        refreshGrid(options.grid.type, options.grid.id);
                    }
                }
            );
        },
        /**
         * 勾选ajax提交
         * @param target
         * @param options
         */
        multiCheckedAjax: function (target, options) {
            //var datagridOpts = $.data(target[0], "datagrid").options;
            // 替换本表的占位数据
            var rows = getCheckedRowsData(options.grid.type, options.grid.id);
            if (rows.length == 0) {
                $.messager.alert(
                    topJUI.language.message.title.operationTips,
                    options.grid.uncheckedMsg,
                    topJUI.language.message.icon.warning
                );
                return;
            }
            $.messager.confirm(
                topJUI.language.message.title.confirmTips,
                options.comfirmMsg,
                function (flag) {
                    if (options.grid.param == undefined) {
                        //options.grid.param = {uuid: topJUI.config.pkName};
                        options.grid.param = topJUI.config.pkName + ":" + topJUI.config.pkName;
                    }
                    //options.grid.param = param2JsonObj(options.grid.param);
                    //options.ajaxData = convertParamObj2ObjData(options.grid.param, rows);
                    options.ajaxData = convertParamObj2ObjData(param2JsonObj(options.grid.param), rows);
                    if (flag && doAjax(options)) {
                        refreshGrid(options.grid.type, options.grid.id);
                    }
                }
            );
        },
        /**
         * http://blog.csdn.net/aa1049372051/article/details/22849891
         * 开启消息提示功能
         * @param {} jq
         * @param {} params 提示消息框的样式
         * @return {}
         */
        doCellTip: function (jq, params) {
            function showTip(data, td, e) {
                if ($(td).text() == "")
                    return;
                data.tooltip.text($(td).text()).css({
                    top: (e.pageY + 10) + 'px',
                    left: (e.pageX + 20) + 'px',
                    'z-index': $.fn.window.defaults.zIndex,
                    display: 'block'
                });
            };
            return jq.each(function () {
                var grid = $(this);
                var options = $(this).data('datagrid'); //获取 datagrid 数据

                if (!options.tooltip) {
                    var panel = grid.datagrid('getPanel').panel('panel');
                    var defaultCls = {
                        'border': '1px solid #333',
                        'padding': '2px',
                        'color': '#333',
                        'background': '#f7f5d1',
                        'position': 'absolute',
                        'max-width': '800px',
                        'border-radius': '4px',
                        '-moz-border-radius': '4px',
                        '-webkit-border-radius': '4px',
                        'display': 'none'
                    }
                    var tooltip = $("<div id='celltip'></div>").appendTo('body');
                    tooltip.css($.extend({}, defaultCls, params.cls));
                    options.tooltip = tooltip;
                    panel.find('.datagrid-body').each(function () {
                        var delegateEle = $(this).find('> div.datagrid-body-inner').length
                            ? $(this).find('> div.datagrid-body-inner')[0]
                            : this;
                        $(delegateEle).undelegate('td', 'mouseover').undelegate(
                            'td', 'mouseout').undelegate('td', 'mousemove')
                            .delegate('td', {
                                'mouseover': function (e) {
                                    if (params.delay) {
                                        if (options.tipDelayTime)
                                            clearTimeout(options.tipDelayTime);
                                        var that = this;
                                        options.tipDelayTime = setTimeout(
                                            function () {
                                                showTip(options, that, e);
                                            }, params.delay);
                                    } else {
                                        showTip(options, this, e);
                                    }

                                },
                                'mouseout': function (e) {
                                    if (options.tipDelayTime)
                                        clearTimeout(options.tipDelayTime);
                                    options.tooltip.css({
                                        'display': 'none'
                                    });
                                },
                                'mousemove': function (e) {
                                    var that = this;
                                    if (options.tipDelayTime) {
                                        clearTimeout(options.tipDelayTime);
                                        options.tipDelayTime = setTimeout(
                                            function () {
                                                showTip(options, that, e);
                                            }, params.delay);
                                    } else {
                                        showTip(options, that, e);
                                    }
                                }
                            });
                    });

                }

            });
        },
        /**
         * 关闭消息提示功能
         * @param {} jq
         * @return {}
         */
        cancelCellTip: function (jq) {
            return jq.each(function () {
                var data = $(this).data('datagrid');
                if (data.tooltip) {
                    data.tooltip.remove();
                    data.tooltip = null;
                    var panel = $(this).datagrid('getPanel').panel('panel');
                    panel.find('.datagrid-body').undelegate('td',
                        'mouseover').undelegate('td', 'mouseout')
                        .undelegate('td', 'mousemove')
                }
                if (data.tipDelayTime) {
                    clearTimeout(data.tipDelayTime);
                    data.tipDelayTime = null;
                }
            });
        }
    });


})(jQuery);;(function ($) {

    $.fn.iDialog = function (options) {
        var dialogOptions = options.dialog;
        var $dialogObj = $("#" + dialogOptions.id);
        var defaults = {
            currentDialogId: this.selector,
            width: 700,
            height: 'auto',//宽高限制650*450,900*500
            title: '新增/编辑',
            modal: true,
            closed: true,
            iconCls: 'fa fa-windows',
            collapsible: true,
            maximizable: true,
            minimizable: false,
            maximized: false,
            resizable: true,
            openAnimation: 'show',
            openDuration: 100,
            closeAnimation: 'show',
            closeDuration: 400,
            zIndex: 10,
            toolbar: this.selector + '-toolbar',
            buttons: this.selector + '-buttons',
            postfix: 'Edit',
            combotreeFields: '',
            refreshTreeId: '',
            onBeforeOpen: function () {

            },
            onLoad: function () {
                $(this).trigger(topJUI.eventType.initUI.form);
                $(this).dialog("center");
                if (dialogOptions.url != undefined) {
                    // 获取选中行的数据
                    var row = getSelectedRowData(options.grid.type, options.grid.id);
                    // 如果指定了数据来源URL，则通过URL加载数据
                    var newDialogUrl = replaceUrlParamValueByBrace(dialogOptions.url, row);
                    $.getJSON(newDialogUrl, function (data) {
                        $dialogObj.form('load', data);
                        if (typeof dialogOptions.editor == "string" || typeof dialogOptions.editor == "object") {
                            // kindeditor编辑器处理
                            if (typeof dialogOptions.editor == "string") {
                                // 富文本编辑器字符串
                                var ke = [], keObj = [];
                                ke = dialogOptions.editor.replace(/'/g, '"').split(",");
                                for (var i = 0; i < ke.length; i++) {
                                    keObj.push(strToJson(ke[i]));
                                }
                            } else {
                                // 富文本编辑数组
                                keObj = dialogOptions.editor;
                            }
                            for (var i = 0; i < keObj.length; i++) {
                                var editorType = keObj[i]["type"];
                                var editorId = keObj[i]["id"];
                                var editorField = keObj[i]["field"];
                                if (editorType == "kindeditor") {
                                    getTabWindow().$("iframe").each(function (i) {
                                        this.contentWindow.document.body.innerHTML = html_decode(data[editorField]);
                                    });
                                } else {
                                    UE.getEditor(editorId).ready(function () {
                                        UE.getEditor(editorId).setContent(data[editorField]);
                                    });
                                }
                            }
                        }
                    });
                } else {
                    // 如果没有指定数据来源URL，则直接加载选中行的数据
                    // $dialogObj.form('load', row); // 防止新增时也加载选中行的数据，暂时屏蔽
                }

                // 如果存在父表，则将父表中指定的字段数据加载到本窗口中
                if (typeof options.parentGrid == "object") {
                    var parentRow = getSelectedRowData(options.parentGrid.type, options.parentGrid.id);
                    var jsonData = getSelectedRowJson(options.parentGrid.params, parentRow);
                    $dialogObj.form('load', jsonData);
                }
            },
            onClose: function () {
                $(dialogOptions.currentDialogId).form('clear');
            }
        }

        dialogOptions = $.extend(defaults, options.dialog);

        var controllerUrl = getUrl('controller');
        dialogOptions.href = dialogOptions.href ? dialogOptions.href + location.search : controllerUrl + "edit" + location.search;

        $(this).dialog(dialogOptions);
    }

    generateDialogDoc = function (options) {

        var defaults = {
            iconCls: 'fa fa-plus',
            parentGridUnselectedMsg: '请先选中一条主表数据！',
            dialog: {
                title: '数据详情',
                width: 650,
                height: 450
            }
        }

        options = $.extend(defaults, options);

        var divOrForm = options.dialog.form == false ? "div" : "form";
        var dialogDom = '<' + divOrForm + ' data-toggle="topjui-dialog" data-options="id:\'' + options.dialog.id + '\',href:\'' + options.dialog.href + '\',url:\'' + options.dialog.url + '\',title:\'' + options.dialog.title + '\',beforeOpenCheckUrl:\'' + options.dialog.beforeOpenCheckUrl + '\'"></' + divOrForm + '>';

        // 判断dialog是否存在linkbutton按钮组
        var buttonsDom = "";
        if (typeof options.dialog.buttonsGroup == "object") {
            var buttonsArr = options.dialog.buttonsGroup;
            var btLength = buttonsArr.length;
            if (btLength > 0) {
                for (var i = 0; i < btLength; i++) {
                    // 默认为ajaxForm提交方式
                    if (!buttonsArr[i].handler) {
                        buttonsArr[i].handler = 'ajaxForm';
                    }
                    buttonsDom += '<a href="#" data-toggle="topjui-linkbutton" data-options="menubuttonId:\'' + options.id + '\',handlerBefore:\'' + buttonsArr[i].handlerBefore + '\',handler:\'' + buttonsArr[i].handler + '\',dialog:{id:\'' + options.dialog.id + '\'},url:\'' + buttonsArr[i].url + '\',iconCls:\'' + buttonsArr[i].iconCls + '\'">' + buttonsArr[i].text + '</a>';
                }
            }
        }

        getTabWindow().$('body').append(
            dialogDom +
            '<div id="' + options.dialog.id + '-buttons" style="display:none">' +
            buttonsDom +
            '<a href="#" data-toggle="topjui-linkbutton" data-options="iconCls:\'fa fa-close\'" onclick="javascript:$(\'#' + options.dialog.id + '\').dialog(\'close\')">关闭</a>' +
            '</div>'
        );

    }

})(jQuery);;(function ($) {
    $.fn.iEdatagrid = function (options) {
        var defaults = {
            //datagridId       : element.get(0).id,
            datagridId: this.selector,
            width: '100%',
            height: '100%',
            autoRowHeight: false,
            nowrap: true,
            fit: true,
            fitColumns: false,
            border: false,
            striped: true,
            singleSelect: true,
            url: "",
            toolbar: this.selector + "-toolbar",
            columns: [[{field: 'uuid', title: 'UUID', align: 'center'},
                {field: 'title', title: '标题', align: 'left'},
                {field: 'creator', title: '发布人', align: 'center'},
                {field: 'createTime', title: '发布时间', align: 'center'}]],
            multiSort: false,
            sortName: "",
            sortOrder: "",
            //toolbar          : this.selector + 'Toolbar',
            addButton: true,
            editButton: true,
            deleteButton: true,
            searchButton: true,
            addDialogTitle: '新增',
            editDialogTitle: '编辑',
            rownumbers: true,
            pagination: true,
            pageNumber: 1,
            pageSize: 20,
            pageList: [10, 20, 30, 40, 50, 100, 200, 300, 400, 500],
            editable: true,
            queryFormId: "",      // search form id
            queryAction: "",      // search from action
            infoFormId: "",      // info form id
            infoAddAction: "",    	// info data add action
            infoUpdateAction: "", 		// info update action
            infoDlgDivId: "",     	// info data detail/edit dlg div id
            deleteAction: "",     	// data delete action  from ajax
            deleteMsg: "",      // show the message before do delete
            moveDlgDivId: "",     	// the div id of dialog for move show
            moveFormId: "",      // the form id for move
            moveTreeId: "",      // the combotree id for move
            queryParams: {},      // search params name for post, must to be {}
            queryParamsVCN: {},   	// search params value from htmlcontrol name, must to be {}
            checkOnSelect: false,
            selectOnCheck: false,
            kindEditor: [],
            addDialogId: '#editDialog',
            editDialogId: '#editDialog',
            gridParam: 'uuid'
        }

        var options = $.extend(defaults, options);

        var controllerUrl = getUrl('controller');
        options.url = options.url ? options.url : controllerUrl + "getPageSetData";
        options.getDetailUrl = options.getDetailUrl ? options.getDetailUrl : controllerUrl + "getDetailByUuid";
        options.addDialogHref = options.addDialogHref ? options.addDialogHref : controllerUrl + "add";
        options.saveUrl = options.saveUrl ? options.saveUrl : controllerUrl + "save";
        options.editDialogHref = options.editDialogHref ? options.editDialogHref : controllerUrl + "edit";
        options.updateUrl = options.updateUrl ? options.updateUrl : controllerUrl + "update";
        options.destroyUrl = options.destroyUrl ? options.destroyUrl : controllerUrl + "delete";

        $(this).edatagrid({
            filterBtnIconCls: 'fa fa-filter',
            remoteFilter: true,
            width: options.width,
            height: options.height,
            autoRowHeight: options.autoRowHeight,
            nowrap: options.nowrap,
            striped: options.striped,
            singleSelect: options.singleSelect,
            url: appendSourceUrlParam(options.url),
            toolbar: options.toolbar,
            //queryParams : {},
            loadMsg: options.loadMsg,
            rownumbers: options.rownumbers,
            pagination: options.pagination,
            paginPosition: 'bottom',
            pageNumber: options.pageNumber,
            pageSize: options.pageSize,
            pageList: options.pageList,
            frozenColumns: options.frozenColumns,
            columns: options.columns,
            multiSort: options.multiSort,
            sortName: options.sortName,
            sortOrder: options.sortOrder,
            fit: options.fit,
            fitColumns: options.fitColumns,
            border: options.border,
            checkOnSelect: options.checkOnSelect,
            selectOnCheck: options.selectOnCheck,
            //bodyCls : "leftBottomBorder",
            saveUrl: options.saveUrl,
            updateUrl: options.updateUrl,
            destroyUrl: options.destroyUrl,
            onBeforeLoad: function (param) {

            },
            onLoadSuccess: function () {
                //$(this).datagrid("fixRownumber");
            },
            onClickRow: function (index, row) {
                //传递给要刷新表格的参数
                if (typeof options.childGrid == "object") {
                    var newQueryParams = {};
                    newQueryParams = getSelectedRowJson(options.childGrid.param, row);

                    var refreshGridIdArr = options.childGrid.grid;
                    for (var i = 0; i < refreshGridIdArr.length; i++) {
                        // 通过闭包嵌套和不同时序的执行来刷新grid
                        (function (i) {
                            setTimeout(function () {
                                var $grid = $("#" + refreshGridIdArr[i].id);
                                if (refreshGridIdArr[i]["type"] == "datagrid") {
                                    //获得表格原有的参数
                                    var queryParams = $grid.datagrid('options').queryParams;
                                    $grid.datagrid('options').queryParams = $.extend({}, queryParams, newQueryParams);
                                    $grid.datagrid('load');
                                } else if (refreshGridIdArr[i].type == "treegrid") {
                                    //获得表格原有的参数
                                    var queryParams = $grid.treegrid('options').queryParams;
                                    $grid.treegrid('options').queryParams = $.extend({}, queryParams, newQueryParams);
                                    $grid.treegrid('load');
                                } else if (refreshGridIdArr[i].type == "panel") {
                                    var href = replaceUrlParamValueByBrace(refreshGridIdArr[i].href, newQueryParams);
                                    $grid.panel('refresh', href);
                                }
                            }, i * 100);
                        })(i);
                    }
                }
            }

        });

        //$(this).datagrid('disableFilter', options.filterOption);

        //重新加载datagrid的数据
        //$(this).datagrid('reload');

    }

    /**
     * @author 孙宇
     * @requires jQuery,EasyUI
     * 为datagrid、treegrid增加表头菜单，用于显示或隐藏列，注意：冻结列不在此菜单中
     */
    var createGridHeaderContextMenu = function (e, field) {
        e.preventDefault();
        var grid = $(this);
        /* grid本身 */
        var headerContextMenu = this.headerContextMenu;
        /* grid上的列头菜单对象 */
        var okCls = 'tree-checkbox1'; // 选中
        var emptyCls = 'tree-checkbox0'; // 取消
        if (!headerContextMenu) {
            var tmenu = $('<div style="width:150px;"></div>').appendTo('body');
            var fields = grid.datagrid('getColumnFields');
            for (var i = 0; i < fields.length; i++) {
                var fieldOption = grid.datagrid('getColumnOption', fields[i]);
                if (!fieldOption.hidden) {
                    $('<div iconCls="' + okCls + '" field="' + fields[i] + '"/>').html(fieldOption.title).appendTo(tmenu);
                } else {
                    $('<div iconCls="' + emptyCls + '" field="' + fields[i] + '"/>').html(fieldOption.title).appendTo(tmenu);
                }
            }
            headerContextMenu = this.headerContextMenu = tmenu.menu({
                onClick: function (item) {
                    var field = $(item.target).attr('field');
                    if (item.iconCls == okCls) {
                        grid.datagrid('hideColumn', field);
                        $(this).menu('setIcon', {
                            target: item.target,
                            iconCls: emptyCls
                        });
                    } else {
                        grid.datagrid('showColumn', field);
                        $(this).menu('setIcon', {
                            target: item.target,
                            iconCls: okCls
                        });
                    }
                    headerContextMenu.menu('show');
                }
            });
        }
        headerContextMenu.menu('show', {
            left: e.pageX,
            top: e.pageY
        });
    };
    $.fn.datagrid.defaults.onHeaderContextMenu = createGridHeaderContextMenu;
    $.fn.treegrid.defaults.onHeaderContextMenu = createGridHeaderContextMenu;


})(jQuery);;// 扩展datagrid方法，修复行号宽度显示问题
$.extend($.fn.datagrid.methods, {
	fixRownumber : function (jq) {
		return jq.each(function () {
			var panel = $(this).datagrid("getPanel");
			//获取最后一行的number容器,并拷贝一份
			var clone = $(".datagrid-cell-rownumber", panel).last().clone();
			//由于在某些浏览器里面,是不支持获取隐藏元素的宽度,所以取巧一下
			clone.css({
				"position" : "absolute",
				left : -1000
			}).appendTo("body");
			var width = clone.width("auto").width();
			//默认宽度是25,所以只有大于25的时候才进行fix
			if (width > 25) {
				//多加5个像素,保持一点边距
				$(".datagrid-header-rownumber,.datagrid-cell-rownumber", panel).width(width + 5);
				//修改了宽度之后,需要对容器进行重新计算,所以调用resize
				$(this).datagrid("resize");
				//一些清理工作
				clone.remove();
				clone = null;
			} else {
				//还原成默认状态
				$(".datagrid-header-rownumber,.datagrid-cell-rownumber", panel).removeAttr("style");
			}
		});
	},
	/*
	 *	$('#tt').datagrid("addToolbarItem",[{"text":"xxx"},"-",{"text":"xxxsss","iconCls":"icon-ok"}])
	 *	$('#tt').datagrid("removeToolbarItem","GetChanges") //根据btn的text删除
	 *	$('#tt').datagrid("removeToolbarItem",0) //根据下标删除
	 */
	addToolbarItem : function (jq, items) {
		return jq.each(function () {
			var dpanel = $(this);
			var toolbar = dpanel.children("div.datagrid-toolbar");
			if (!toolbar.length) {
				toolbar = $("<div class=\"datagrid-toolbar\"><table cellspacing=\"0\" cellpadding=\"0\"><tr></tr></table></div>").prependTo(dpanel);
				$(this).datagrid('resize');
			}
			var tr = toolbar.find("tr");
			for (var i = 0; i < items.length; i++) {
				var btn = items[i];
				if (btn == "-") {
					$("<td><div class=\"datagrid-btn-separator\"></div></td>").appendTo(tr);
				} else {
					var td = $("<td></td>").appendTo(tr);
					var b = $("<a href=\"javascript:void(0)\"></a>").appendTo(td);
					b[0].onclick = eval(btn.handler || function () {});
					b.linkbutton($.extend({}, btn, {
							plain : true
						}));
				}
			}
		});
	},
	removeToolbarItem : function (jq, param) {
		return jq.each(function () {
			var dpanel = $(this).datagrid("getPanel");
			var toolbar = dpanel.children("div.datagrid-toolbar");
			var cbtn = null;
			if (typeof param == "number") {
				cbtn = toolbar.find("td").eq(param).find('span.l-btn-text');
				//csep = toolbar.find("td").eq(param).find('.datagrid-btn-separator');
			} else if (typeof param == "string") {
				cbtn = toolbar.find("span.l-btn-text:contains('" + param + "')");
				//csep = toolbar.find(".datagrid-btn-separator:contains('" + param + "')");
			}
			if (cbtn && cbtn.length > 0) {
				cbtn.closest('td').remove();
				//csep.closest('td').remove();
				cbtn = null;
			}
		});
	}
});;(function ($) {

    var date = new Date();
    var currentYear = date.getFullYear();
    var currentMonth = date.getMonth() + 1;
    var currentDay = date.getDate();
    var currentHour = date.getHours();
    var currentMinute = date.getMinutes();
    var currentSecond = date.getSeconds();

    $.fn.iTextbox = function (options) {
        var defaults = {
            width: 153,
            prompt: '',
            type: 'text',
            multiline: false,
            readonly: false,
            disabled: false,
            iconCls: '',
            buttonText: '',
            buttonIcon: ''
        }

        var options = $.extend(defaults, options);

        $(this).textbox(options);
    }

    $.fn.iSwitchbutton = function (options) {
        var defaults = {
            width: 153,
            value: "1"
        }

        var options = $.extend(defaults, options);

        $(this).switchbutton(options);
    }

    $.fn.iFilebox = function (options) {
        var defaults = {
            width: 450,
            prompt: '',
            type: 'text',
            multiline: false,
            readonly: false,
            disabled: false,
            iconCls: '',
            buttonText: '选择文件',
            buttonAlign: 'right',
            required: false,
            missingMessage: '必填',
            onChange: function () {
            }
        }

        var options = $.extend(defaults, options);

        $(this).filebox(options);
    }

    $.fn.iNumberspinner = function (options) {
        var defaults = {
            width: 153,
            editable: true,
            defaultValueType: '',
            value: '',
            min: 0,
            max: 999999999,
            required: false
        }

        var options = $.extend(defaults, options);

        if (options.defaultValueType == 'currentYear') {
            options.value = currentYear;
            options.min = 1900,
                options.max = 2200
        } else if (options.defaultValueType == 'currentSeason') {
            if (currentMonth == 1 || currentMonth == 2 || currentMonth == 3) {
                options.value = 1;
            } else if (currentMonth == 4 || currentMonth == 5 || currentMonth == 6) {
                options.value = 2;
            } else if (currentMonth == 7 || currentMonth == 8 || currentMonth == 9) {
                options.value = 3;
            } else if (currentMonth == 10 || currentMonth == 11 || currentMonth == 12) {
                options.value = 4;
            }
            options.min = 1,
                options.max = 4
        } else if (options.defaultValueType == 'currentMonth') {
            options.value = currentMonth;
            options.min = 1,
                options.max = 12
        } else if (options.defaultValueType == 'currentDay') {
            options.value = currentDay;
            options.min = 1,
                options.max = 31
        } else if (options.defaultValueType == 'currentHour') {
            options.value = currentHour;
            options.min = 0,
                options.max = 24
        }

        $(this).numberspinner(options);
    }

    $.fn.iDatebox = function (options) {
        var defaults = {
            required: false,
            editable: true,
            value: "",
            width: 153,
            formatter: function (value) {
                var y = value.getFullYear();
                var m = value.getMonth() + 1;
                var d = value.getDate();
                if (options.pattern == "YYYY")
                    return y;
                else if (options.pattern == "YYYY-mm")
                    return y + '-' + convertDateToFullDate(m);
                else
                    return y + '-' + convertDateToFullDate(m) + '-' + convertDateToFullDate(d);
            },
            parser: function (s) {
                var t = Date.parse(s);
                if (!isNaN(t)) {
                    return new Date(t);
                } else {
                    return new Date();
                }

            },
            onSelect: function (date) {

            }
        }

        var options = $.extend(defaults, options);

        $(this).datebox(options);
    }

    $.fn.iNumberbox = function (options) {
        var defaults = {
            width: 153,
            min: 0,
            precision: 0,
            decimalSeparator: '.',
            groupSeparator: ',',
            required: false,
            buttonText: ''
        }

        var options = $.extend(defaults, options);

        $(this).numberbox(options);
    }

    $.fn.iValidatebox = function (options) {
        var defaults = {
            required: true,
            validType: 'email'
        }

        var options = $.extend(defaults, options);

        $(this).validatebox(options);
    }

    $.fn.iCombobox = function (options) {
        var defaults = {
            width: 153,
            url: ctx + '/system/codeItem/getListByCodeSetIdAndLevelId?codeSetId={codeSetId}&levelId={levelId}',
            codeSetId: 0,
            pid: 0,
            valueField: 'text',
            textField: 'text',
            editable: false,
            panelHeight: 'auto',
            onShowPanel: function () {
                if (options.url.indexOf("{") >= 0) {
                    //将form表单数据封装成json数据
                    var formData = $(this).closest("form").serializeObject();
                    $('#' + options.id).combobox('reload', replaceUrlParamValueByBrace(options.url, formData));
                }
            },
            onChange: function (newValue, oldValue) {
                //重载级联combobox内容
                if (typeof options.childCombobox == "object") {
                    var url = appendUrlParam(options.childCombobox.url, "parentParam=" + newValue);
                    $('#' + options.childCombobox.id).combobox('reload', url);
                }
            },
            onSelect: function (record) {
                var $formObj = $(this).closest('form');

                if (options.params) {
                    var jsonData = getSelectedRowJson(options.params, record);
                    getTabWindow().$("#" + $formObj.attr("id")).form('load', jsonData);
                }
            }
        }

        var options = $.extend(defaults, options);

        if (options.data)
            options.url = "";
        if (options.codeSetId)
            options.url = options.url.replace("{codeSetId}", options.codeSetId).replace("{levelId}", options.levelId);

        $(this).combobox(options);
    }

    $.fn.iCombogrid = function (options) {
        var defaults = {
            width: 153,
            panelWidth: 450,
            delay: 1000,
            mode: 'remote',
            url: ctx + '/system/user/getListByKeywords',
            idField: 'userNameId',
            textField: 'userName',
            fitColumns: true,
            columns: [[
                {field: 'userName', title: '姓名'},
                {field: 'userNameId', title: '用户名'},
                {field: 'orgName', title: '所属机构', width: 100},
                {field: 'post', title: '职位', width: 100}
            ]],
            onChange: function (newValue, oldValue) {
                $('#' + options.id).combogrid('grid').datagrid('load', {q: newValue});
                //$('#' + options.id).combogrid('grid').datagrid('options').queryParams.departid = newId;
                //$('#' + options.id).combogrid('grid').datagrid('reload');
                //setTimeout(function () {
                $('#' + options.id).combogrid('grid').datagrid('selectRecord', newValue);
                //}, 1000);
                /*if (options.editMode) {
                 setTimeout(function () {
                 var gridParamArr = options.param.split(",");
                 var gridKVArr = gridParamArr[0].split(":");
                 var textFieldName = gridKVArr[0];
                 var $formObj = $("#" + options.id).closest('form');
                 var textFieldValue = $('#' + $formObj.attr("id") + ' input[name="' + textFieldName + '"]').val();
                 if (textFieldValue) $('#' + options.id).combogrid('setText', textFieldValue);
                 }, 500);
                 }*/
            },
            onLoadSuccess: function (data) {
                //$("#gridid").combogrid('grid').datagrid('selectRecord', 'admin');
            },
            onSelect: function (index, row) {
                if (options.params) {
                    var $formObj = $("#" + options.id).closest('form');
                    var jsonData = getSelectedRowJson(options.params, row);
                    getTabWindow().$("#" + $formObj.attr("id")).form('load', jsonData);
                    $('#' + options.id).combogrid('textbox').focus();
                }
            }
        }

        var options = $.extend(defaults, options);

        $(this).combogrid(options);
    }

    $.fn.iCombotreegrid = function (options) {
        var defaults = {
            width: 153,
            panelWidth: 450,
            url: ctx + '/system/user/getListByKeywords',
            idField: 'id',
            treeField: 'text',
            fitColumns: true,
            animate: true,
            columns: [[
                {field: 'id', title: '标识', hidden: true},
                {field: 'text', title: '名称', width: 100},
                {field: 'levelId', title: '层级'},
                {field: 'sort', title: '排序'}
            ]],
            onBeforeExpand: function (node, param) {
                var grid = $('#' + options.id).combotreegrid('grid');
                grid.treegrid('options').url = replaceUrlParamValueByBrace(options.expandUrl, node);
            },
            onChange: function (newValue, oldValue) {

            },
            onLoadSuccess: function (node, data) {
                var grid = $('#' + options.id).combotreegrid('grid');
                // 展开根节点
                grid.treegrid("expand", grid.treegrid('getRoot').id);

                if (options.expandAll) {
                    grid.treegrid("expandAll");
                }

                if (options.getFatherIdsUrl) {
                    setTimeout(function () {
                        var selectedNode = grid.treegrid('getSelected');
                        var dataObj = {id: $('#' + options.id).combotreegrid("getValue")};
                        if (selectedNode == null && dataObj.id != "") {
                            var findNode;
                            $.ajax({
                                type: "POST",
                                url: replaceUrlParamValueByBrace(options.getFatherIdsUrl, dataObj),
                                success: function (data) {
                                    var fatherIdsArray = data.split(",");
                                    for (var i = fatherIdsArray.length - 1; i >= 0; i--) {
                                        findNode = grid.treegrid('find', fatherIdsArray[i].replace(/'/g, ""));
                                        if (findNode) {
                                            grid.treegrid('expand', findNode.id);
                                        }
                                    }
                                }
                            });
                            if (dataObj.id != undefined)
                                $("#" + options.id).combotreegrid('setValue', dataObj.id);//数据加载完毕可以设置值了
                        }
                    }, 100);
                }
            },
            onSelect: function (index, row) {
                if (options.param) {
                    var $formObj = $("#" + options.id).closest('form');
                    var jsonData = getSelectedRowJson(options.param, row);
                    getTabWindow().$("#" + $formObj.attr("id")).form('load', jsonData);
                    $('#' + options.id).combogrid('textbox').focus();
                }
            }
        }

        var options = $.extend(defaults, options);

        $(this).combotreegrid(options);
    }

    $.fn.iAutoComplete = function (options) {
        var defaults = {
            comboboxId: this.selector,
            url: ctx + "/system/user/getListByUserName?userName=",
            valueField: 'userNameId',
            textField: 'userName',
            width: 450,
            panelHeight: 250,
            fieldId: 'userNameId',
            required: false,
            formatter: '',
            onLoadSuccess: function (node, data) {
                setTimeout(function () {
                    var oriValue = $(options.comboboxId).combobox('getValue');
                    // 设置值为数据库中的值
                    //$(options.comboboxId).combobox('setValue', oriValue);
                    // 设置显示文本为数据库中的文本
                    //$(options.comboboxId).combobox('setText', oriValue);
                }, 400);
            },
            onShowPanel: function () {
                //$(this).combobox("reload", options.url);
            },
            onChange: function (newValue, oldValue) {
                if (newValue == null) {
                    newValue = $(options.comboboxId).combobox('getValue');
                }
                var paramArr = options.url.match(/{([\s\S]*?)}/g);
                var newUrl = options.url;
                if (paramArr.length > 0) {
                    for (var i = 0; i < paramArr.length; i++) {
                        newUrl = newUrl.replace(paramArr[i], encodeURI(encodeURI(newValue)));
                    }
                }
                $(this).combobox("reload", newUrl);
            },
            onSelect: function (record) {
                $(options.comboboxId).combobox('hidePanel');

                /*var dialogIdArr = options.dialogId.split(",");
                 for (var i = 0; i < dialogIdArr.length; i++) {
                 var jsonData = getSelectedRowJson(options.params, record);
                 getTabWindow().$("#" + dialogIdArr[i]).form('load', jsonData);
                 }*/

                if (options.params) {
                    //var $formObj = $comboboxObj.closest('form');
                    var $formObj = $("#" + options.id).closest('form');
                    var jsonData = getSelectedRowJson(options.params, record);
                    getTabWindow().$("#" + $formObj.attr("id")).form('load', jsonData);
                }

                setTimeout(function () {
                    // 设置值为数据库中的值
                    //$(options.comboboxId).combobox('setValue', record[options.valueField]);
                    // 设置显示文本为数据库中的文本
                    $(options.comboboxId).combobox('setText', record[options.textField]);
                }, 1000);

            },
            onUnselect: function (record) {
                setTimeout(function () {
                    //var oriValue = $(options.comboboxId).combobox('getValue');
                    // 设置值为数据库中的值
                    $(options.comboboxId).combobox('setValue', '');
                    // 设置显示文本为数据库中的文本
                    $(options.comboboxId).combobox('setText', '');
                }, 400);
            },
            onHidePanel: function () {
                // 没有选择的情况下清空输入框内容及值
                if (options.textField != options.valueField) {
                    var text = $(options.comboboxId).combobox('getText');
                    var value = $(options.comboboxId).combobox('getValue');
                    if (text == value) {
                        $(options.comboboxId).combobox("setText", "");
                        $(options.comboboxId).combobox("setValue", "");
                    }
                }
            }
        }

        var options = $.extend(defaults, options);

        if (options.comboboxId == "") {
            options.comboboxId = $(this).context;
        }

        $(this).combobox(options);
    }

})(jQuery);;// 获取地址栏参数
$.getUrlParam = function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

/**
 * 获得URL变量
 * 使用方法：$.getUrlVar("param")
 * @Description
 * @Author 小策一喋<xvpindex@qq.com>
 * @Date 2017/5/30 18:02
 */
$.extend({
    getUrlVars: function () {
        var vars = [],
            hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    },
    getUrlVar: function (name) {
        return $.getUrlVars()[name];
    }
});

// 获取网址字符串参数值
$.getUrlStrParam = function (urlStr, name) {
    var urlParam = urlStr.substring(urlStr.indexOf("?"));
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = urlParam.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

function loadGrid(formDataArr) {
    if ($.cookie("gridType") == "datagrid") {
        $("#" + $.cookie("gridId")).datagrid('load', {
            advanceFilter: JSON.stringify(formDataArr)
        });
    } else if ($.cookie("gridType") == "treegrid") {
        $("#" + $.cookie("gridId")).treegrid('load', {
            advanceFilter: JSON.stringify(formDataArr)
        });
    }
}

/**
 * 测试函数
 */
test = function (str) {
    alert(str);
}

/**
 * 截取字符串
 * @param dateStr
 * @param start
 * @param end
 * @returns {*}
 */
subString = function (dateStr, start, end) {
    if (dateStr != undefined) {
        return dateStr.substring(start, end);
    } else {
        return '';
    }
}

/**
 * 回调函数，用于点击提交按钮在提交表单之前选中select输入框中的所有项
 */
function selectAllOptions(selector) {
    $(selector + ' option').attr("selected", true);
}

/**
 * 转换传入的回调函数字条串，并执行
 * @param functionStr
 */
function executeCallBackFun(functionStr, options) {
    if (functionStr != undefined) {
        var handlerBeforeArr = functionStr.split("|");
        var handlerBeforeParamsArr = handlerBeforeArr[1].split(",");
        var handlerBeforeParams = "";
        for (var h = 0; h < handlerBeforeParamsArr.length; h++) {
            if (handlerBeforeParamsArr[h].indexOf("options.") > -1)
                handlerBeforeParams += handlerBeforeParamsArr[h] + ',';
            else
                handlerBeforeParams += '"' + handlerBeforeParamsArr[h] + '",';
        }
        eval(handlerBeforeArr[0] + "(" + handlerBeforeParams.substr(0, handlerBeforeParams.length - 1) + ")");
    }
}

/**
 * 判断一个数组是否是多维数组
 * @param arr
 * @returns {boolean}
 */
function isMultiArr(arr) {
    if (arr) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] instanceof Array)
                return true;
            else
                return false;
        }
    } else {
        return false;
    }
}

/**
 * 判断一个对象是否是多维对象
 * @param obj
 * @returns {boolean}
 */
function isMultiObj(obj) {
    if (obj) {
        for (var i = 0; i < obj.length; i++) {
            if (typeof obj[i] == "object")
                return true;
            else
                return false;
        }
    } else {
        return false;
    }
}

/**
 * 附件大小转换
 * @param bytes
 * @returns {*}
 */
function bytesToSize(bytes, precision) {
    if (precision == null) precision = 2;
    if (bytes === 0) return '0 B';
    var k = 1024;
    var sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    var i = Math.floor(Math.log(bytes) / Math.log(k));
    return (bytes / Math.pow(k, i)).toFixed(precision) + ' ' + sizes[i];
    // toPrecision(3) 后面保留一位小数，如1.0GB
    // return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
}

/**
 * 当前url后面追加来源url中的参数
 * @param url
 * @returns {*}
 */
function appendUrlParam(url, paramValue) {
    return url.indexOf("?") == -1 ? url + "?" + paramValue : url + "&" + paramValue;
}

/**
 * 当前url后面追加来源url中的参数
 * @param url
 * @returns {*}
 */
function appendSourceUrlParam(url) {
    return url.indexOf("?") == -1 ? url + location.search : url + location.search.replace("?", "&");
}

/**
 * 获得当前日期时间
 * @param formatter
 * @returns {*}
 */
function getCurrentDatetime(formatter) {
    var timeStamp = new Date();
    return timestamp2Datetime(timeStamp, formatter);
}

function timestamp2Datetime(timeStamp, formatter) {
    var d = new Date(timeStamp);
    var year = d.getFullYear();
    var month = (d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1;
    var day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
    var hour = d.getHours() < 10 ? '0' + d.getHours() : d.getHours();
    var minute = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();
    var second = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds();

    var result;
    if (formatter == "YmdHis") {
        result = year + "" + month + "" + day + "" + hour + "" + minute + "" + second;
    } else if (formatter == "Y-m-d H:i:s") {
        result = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
    } else if (formatter == "Y-m-d") {
        result = year + '-' + month + '-' + day;
    } else {
        result = year + '-' + month + '-' + day + ' ' + hour + ':' + minute;
    }
    return result;
}

/**
 * 获得地址栏URL
 * @param urlType
 * @returns {string|*}
 */
function getUrl(urlType) {
    var currentUrl = window.location.pathname;
    if (urlType == "controller") {
        url = currentUrl.substring(0, currentUrl.lastIndexOf("/") + 1);
    } else {
        url = currentUrl;
    }
    return url;
}

/**
 * 获得选项json数据
 * @param $element
 * @returns {*}
 */
function getOptionsJson($element) {
    var options = $element.data();

    if (options.options) {
        if (options.options.indexOf("{") == 0) {
            options = $.parseJSON(options.options.replace(/'/g, '"'));
        } else {
            options = strToJson('{' + options.options.replace(/'/g, '"') + '}');
        }
    }
    return options;
}

/**
 * 设置表单元素id属性
 * @param options
 */
function setFormElementId($element, options) {
    if (options.id == undefined) {
        options.id = getTimestamp();
        //options.id = $element[0].name; // 以字段名作为id值
        $element.attr("id", options.id);
    } else {
        $element.attr('id', options.id)
    }
    return options;
}

/**
 * 将形如2015-1-1的日期转换为2015-01-01的格式
 * @param value
 * @returns {string}
 */
function convertDateToFullDate(value) {
    return (value < 10 ? '0' : '') + value;
}

/**
 * 判断是否null
 * @param data
 */
function isNull(data) {
    return (data == "" || data == undefined || data == null) ? true : false;
}

/**
 * 根据指定参数获取grid中选中行值的JSON数据
 * @param gridParam
 * @param row
 * @returns {{}}
 */
function getSelectedRowJson(gridParam, row) {
    var jsonData = {};
    if (gridParam) {
        var gridParamArr = gridParam.split(",");
        //传递给dialog输入框的参数
        for (var i = 0; i < gridParamArr.length; i++) {
            if (gridParamArr[i].indexOf(":") == -1) {
                jsonData[gridParamArr[i]] = row[gridParamArr[i]];
            } else {
                var gridKVArr = gridParamArr[i].split(":");
                jsonData[gridKVArr[0]] = row[gridKVArr[1]];
            }
        }
    }
    return jsonData;
}

/**
 * 参数转json对象
 * 形如uuid:uuid,uid:uid转{"uuid":"uuid","uid":"uid"}
 * @param gridParam
 * @param row
 * @returns {{}}
 */
function param2JsonObj(param) {
    var jsonObj = {};
    if (param) {
        var paramArr = param.split(",");
        for (var i = 0; i < paramArr.length; i++) {
            if (paramArr[i].indexOf(":") == -1) {
                jsonObj[paramArr[i]] = paramArr[i];
            } else {
                var kvArr = paramArr[i].split(":");
                jsonObj[kvArr[0]] = kvArr[1];
            }
        }
    }
    return jsonObj;
}

/**
 * json字符串转json对象
 * @param str
 * @returns {Object}
 */
function strToJson(str) {
    var json = eval("(" + str + ")");
    return json;
}

/**
 * 获得json元素的个数
 * @param obj
 * @returns {number}
 * @constructor
 */
function jsonLength(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

/**
 * 获取了当前毫秒的时间戳
 * @returns {number}
 */
function getTimestamp() {
    return new Date().getTime();
}

/**
 * 生成指定范围内的随机整数
 * @param minNum
 * @param maxNum
 * @returns {*}
 */
function getRandomNum(minNum, maxNum) {
    switch (arguments.length) {
        case 1:
            return parseInt(Math.random() * minNum + 1);
            break;
        case 2:
            return parseInt(Math.random() * (maxNum - minNum + 1) + minNum);
            break;
        default:
            return 0;
            break;
    }
}

/*Array.prototype.remove = function (dx) {
 if (isNaN(dx) || dx > this.length) {
 return false;
 }
 for (var i = 0, n = 0; i < this.length; i++) {
 if (this[i] != this[dx]) {
 this[n++] = this[i]
 }
 }
 this.length -= 1
 }*/

/**
 * 扩展数组方法：查找指定元素的下标
 * @param val
 * @returns {number}
 */
Array.prototype.indexOf = function (val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
    }
    return -1;
};

/**
 * 扩展数组方法:删除指定元素
 * @param val
 */
Array.prototype.remove = function (val) {
    var index = this.indexOf(val);
    while (index > -1) {
        this.splice(index, 1);
        index = this.indexOf(val);
    }
};;(function ($) {

    $.fn.iLinkbutton = function (options) {
        var defaults = {
            iconCls: 'fa fa-cog',
            plain: false
        }

        var options = $.extend(defaults, options);

        $(this).linkbutton(options);
    }

    $.extend($.fn.linkbutton.defaults, {

        onClick: function () {
            var linkbuttonOptions = $(this).linkbutton('options'); //事件中获取参数

            if (linkbuttonOptions.handler == "ajaxForm" || linkbuttonOptions.handler == "multiAjaxForm") {
                if (linkbuttonOptions.handlerBefore != "undefined") {
                    // 回调执行传入的自定义函数
                    executeCallBackFun(linkbuttonOptions.handlerBefore);
                }

                var defaults = {
                    gridId: 'datagrid',
                    dialogId: 'editDialog'
                }
                linkbuttonOptions = $.extend(defaults, linkbuttonOptions);
                var menubuttonOptions = $("#" + linkbuttonOptions.menubuttonId).linkbutton('options');
                var gridOptions = menubuttonOptions.grid, dialogOptions = menubuttonOptions.dialog;

                // 判断数据是否通过验证
                if (getTabWindow().$("#" + dialogOptions.id).form('validate')) {
                    // 序列化表单数据
                    linkbuttonOptions.ajaxData = getTabWindow().$("#" + dialogOptions.id).serialize();
                    if (linkbuttonOptions.combotreeFields != undefined) {
                        var combotreeParams = '';
                        $.each(options.combotreeFields, function (k, v) {
                            combotreeParams += '&' + v.replace(linkbuttonOptions.postfix, "") + '=' + getTabWindow().$("#" + dialogOptions.id + ' input[textboxname="' + v + '"]').combotree('getValues').join(',') + ', ';
                        });
                        linkbuttonOptions.ajaxData += combotreeParams;
                    }
                    // 提交更新多条数据
                    if (linkbuttonOptions.handler == "multiAjaxForm") {
                        var rows = getCheckedRowsData(gridOptions.type, gridOptions.id);
                        if (rows.length == 0) {
                            $.messager.alert(
                                topJUI.language.message.title.operationTips,
                                topJUI.language.message.msg.checkSelfGrid,
                                topJUI.language.message.icon.warning
                            );
                            return;
                        }
                        var pkName = gridOptions.pkName == undefined ? topJUI.config.pkName : gridOptions.pkName;
                        linkbuttonOptions.ajaxData += '&' + pkName + 's=' + getMultiRowsFieldValue(rows, pkName);
                    }
                    // 执行ajax动作
                    getTabWindow().doAjax(linkbuttonOptions);
                    // 关闭dialog
                    getTabWindow().$("#" + dialogOptions.id).dialog("close");
                    // 重新加载本grid数据
                    if (typeof gridOptions == "object") {
                        if (gridOptions.type == "datagrid") {
                            getTabWindow().$("#" + gridOptions.id).datagrid("reload");
                        } else if (gridOptions.type == "treegrid") {
                            var row = getSelectedRowData(gridOptions.type, gridOptions.id);
                            if (row == null)
                                getTabWindow().$("#" + gridOptions.id).treegrid("reload");
                            else
                                getTabWindow().$("#" + gridOptions.id).treegrid("reload", row[gridOptions.parentIdField]);
                        }
                    }
                    // 重新加载指定的Grid数据
                    refreshGrids(linkbuttonOptions.reload);
                } else {
                    showMessage({
                        statusCode: 300,
                        title: topJUI.language.message.title.operationTips,
                        message: '显示红色边框的字段不能为空',
                        icon: topJUI.language.message.icon.warning
                    });
                }
            }

        }

    });

})(jQuery);;(function ($) {

    $.fn.iMenubutton = function (options) {
        var defaults = {
            plain: true,
            iconCls: 'fa fa-cog',
            hasDownArrow: false,
            onClick: function () {
                $(this).menubutton(options.clickEvent)
            }
        }

        var options = $.extend(defaults, options);

        $(this).menubutton(options);
    }

    $.extend($.fn.menubutton.methods, {

        openDialog: function (target, options) {
            //var options = $(this).menubutton('options'); // 事件中获取参数
            var options = $.data(target[0], "menubutton").options;
            //var options = target[0].dataset.options;
            var dialog = options.dialog;
            var grid = options.grid;
            var parentGrid = options.parentGrid;

            options.dialog.leftMargin = ($(document.body).width() * 0.5) - (dialog.width * 0.5);
            options.dialog.topMargin = ($(document.body).height() * 0.5) - (dialog.height * 0.5);

            if (typeof parentGrid == "object") {
                openDialogAndloadDataByParentGrid(options);
            } else if (dialog.url) {
                openDialogAndloadDataByUrl(options);
            } else {
                if (grid.uncheckedMsg) {
                    var rows = getCheckedRowsData(grid.type, grid.id);
                    if (rows.length == 0) {
                        $.messager.alert(
                            topJUI.language.message.title.operationTips,
                            options.grid.uncheckedMsg,
                            topJUI.language.message.icon.warning
                        );
                        return;
                    }
                }
                if (dialog.onBeforeOpen != "undefined") {
                    // 回调执行传入的自定义函数
                    executeCallBackFun(dialog.onBeforeOpen, options);
                }

                options.href = appendSourceUrlParam(dialog.href);
                var $dialogObj = $("#" + dialog.id);
                $dialogObj.iDialog(options);
                if (options.dialog.href.indexOf("{") != -1) {
                    var row = getSelectedRowData(options.grid.type, options.grid.id);
                    // 替换本表中选中行占位值
                    var newHref = replaceUrlParamValueByBrace(appendSourceUrlParam(dialog.href), row);
                    $dialogObj.dialog({
                        href: newHref
                    });
                    //$dialogObj.dialog('open').dialog("refresh", newHref); //加载两次href指定的页面
                    $dialogObj.dialog('open');
                } else {
                    $dialogObj.dialog('open');
                }
            }
        },
        openTab: function (target, options) {
            var options = $.data(target[0], "menubutton").options;
            addParentTab(options);
        },
        openWindow: function (target, options) {
            var options = $.data(target[0], "menubutton").options;
            openWindow(options);
        },
        doAjax: function (target, options) {
            var options = $.data(target[0], "menubutton").options;
            doAjaxHandler(options);
        },
        request: function (target, options) {
            var options = $.data(target[0], "menubutton").options;
            requestHandler(options);
        },
        delete: function (target, options) {
            var options = $.data(target[0], "menubutton").options;
            deleteHandler(options);
        },
        filter: function (target, options) {
            var options = $.data(target[0], "menubutton").options;
            filterHandler(options);
        },
        search: function (target, options) {
            var options = $.data(target[0], "menubutton").options;
            searchHandler(options);
        },
        export: function (target, options) {
            var options = $.data(target[0], "menubutton").options;
            exportHandler(options);
        },
        import: function (target, options) {
            var options = $.data(target[0], "menubutton").options;
            importHandler(options);
        }

    });

})(jQuery);;+function ($) {
    'use strict';

    $(document).on(topJUI.eventType.initUI.form, function (e) {
        //var $box = $(e.target);

        //var $iTextbox = $box.find('[data-toggle="topjui-textbox"]');

        $('[data-toggle="topjui-textbox"]').each(function (i) {
            var $element = $(this);
            var options = getOptionsJson($element);
            if (options.readonly) {
                options.buttonText = '只读';
            } else if (options.disabled) {
                options.buttonText = '禁止';
            }

            options = setFormElementId($element, options);
            $element.iTextbox(options);
        });

        $('[data-toggle="topjui-switchbutton"]').each(function (i) {
            var $element = $(this);
            var options = getOptionsJson($element);

            options = setFormElementId($element, options);
            $element.iSwitchbutton(options);
        });

        $('[data-toggle="topjui-filebox"]').each(function (i) {
            var $element = $(this);
            var options = getOptionsJson($element);

            options = setFormElementId($element, options);
            $element.iFilebox(options);
        });

        $('[data-toggle="topjui-numberspinner"]').each(function (i) {
            var $element = $(this);
            var options = getOptionsJson($element);

            options = setFormElementId($element, options);
            $element.iNumberspinner(options);
        });

        $('[data-toggle="topjui-numberbox"]').each(function (i) {
            var $element = $(this);
            var options = getOptionsJson($element);

            options = setFormElementId($element, options);
            $element.iNumberbox(options);
        });

        $('[data-toggle="topjui-datebox"]').each(function (i) {
            var $element = $(this);
            var options = getOptionsJson($element);

            options = setFormElementId($element, options);
            $element.iDatebox(options);
        });

        $('[data-toggle="topjui-combobox"]').each(function (i) {
            var $element = $(this);
            var options = getOptionsJson($element);

            options = setFormElementId($element, options);
            $element.iCombobox(options);
        });

        $('[data-toggle="topjui-combogrid"]').each(function (i) {
            var $element = $(this);
            var options = getOptionsJson($element);

            options = setFormElementId($element, options);
            $element.iCombogrid(options);
        });

        $('[data-toggle="topjui-combotree"]').each(function (i) {
            var $element = $(this);
            var options = getOptionsJson($element);

            options = setFormElementId($element, options);
            $element.iCombotree(options);
        });

        $('[data-toggle="topjui-combotreegrid"]').each(function (i) {
            var $element = $(this);
            var options = getOptionsJson($element);

            options = setFormElementId($element, options);
            $element.iCombotreegrid(options);
        });

        $('[data-toggle="topjui-textarea"]').each(function (i) {
            var $element = $(this);
            var options = getOptionsJson($element);

            options.multiline = true;
            if (options.width == null)
                options.width = 450;
            if (options.height == null)
                options.height = 66;

            options = setFormElementId($element, options);
            $element.iTextbox(options);
        });

        $('[data-toggle="topjui-autocomplete"]').each(function (i) {
            var $element = $(this);
            var options = getOptionsJson($element);

            options = setFormElementId($element, options);
            $element.iAutoComplete(options);
        });

        $('[data-toggle="topjui-ueditor"]').each(function (i) {
            var defaults = {
                height: 300
            };

            var $element = $(this);
            var options = getOptionsJson($element);
            options = $.extend(defaults, options);
            options = setFormElementId($element, options);

            UE.delEditor(options.id);
            <!-- 实例化编辑器 -->
            var toolbars = [['fullscreen', 'source', '|', 'undo', 'redo', '|',
                'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', '|',
                'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist',
                'insertunorderedlist', 'lineheight', '|',
                'horizontal', 'spechars', 'map', 'paragraph', 'fontfamily', 'fontsize', 'insertcode', '|',
                'indent', 'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|',
                'link', 'unlink', '|', 'emotion', 'attachment', 'simpleupload', 'insertimage', '|', 'preview']];
            var simpleToolbars = [["fullscreen", "source", "undo", "redo", "bold", "italic", "underline", "fontborder", "strikethrough", "superscript", "subscript", "insertunorderedlist", "insertorderedlist", "justifyleft", "justifycenter", "justifyright", "justifyjustify", "removeformat", "simpleupload", "snapscreen", "emotion", "attachment", "link", "unlink", "indent", "lineheight", "autotypeset"]];
            UE.getEditor(options.id, {
                toolbars: options.mode == "simple" ? simpleToolbars : toolbars,
                initialFrameWidth: 700,
                initialFrameHeight: options.height,
                autoHeightEnabled: true,
                autoFloatEnabled: true,
                readonly: options.readonly ? true : false
            });
        });

        $('[data-toggle="topjui-ueupload"]').each(function (i) {
            var $element = $(this);
            var options = getOptionsJson($element);
            options = setFormElementId($element, options);

            var defaults = {
                width: 450,
                buttonText: '选择图片',
                uploadType: 'image',
                buttonIcon: 'icon-picture_add'
            }
            var options = $.extend(defaults, options);

            var uploaderId = options.id + "Uploader";
            $('body').append('<script type="text/plain" id="' + uploaderId + '"></script>');

            //http://www.cnblogs.com/stupage/p/3145353.html
            //重新实例化一个编辑器，上传独立使用
            var ueUpload = UE.getEditor(uploaderId, {
                toolbars: [["insertimage", "attachment"]]
            });
            ueUpload.ready(function () {
                //设置编辑器不可用
                ueUpload.setDisabled();
                //隐藏编辑器，因为不会用到这个编辑器实例，所以要隐藏
                ueUpload.hide();
                var listener = "afterConfirmUploadedFile", pathAttr = "url";
                if (options.uploadType == "image") {
                    listener = "afterConfirmUploadedImage";
                    pathAttr = "src";
                }
                //侦听上传
                ueUpload.addListener(listener, function (t, arg) {
                    //将地址赋值给相应的input
                    $("#" + options.id).textbox("setText", arg[0][pathAttr]);
                    $("#" + options.id).textbox("setValue", arg[0][pathAttr]);
                    //图片预览
                    if (pathAttr == "src")
                        $("#" + options.previewImageId).attr(pathAttr, arg[0][pathAttr]);
                });

                options.onClickButton = function () {
                    if (options.uploadType == "image") {
                        var imageUploadDialog = ueUpload.getDialog("insertimage");
                        imageUploadDialog.open();
                    } else {
                        var fileUploadDialog = ueUpload.getDialog("attachment");
                        fileUploadDialog.open();
                    }
                };
                $element.iTextbox(options);
            });

        });

        $('[data-toggle="topjui-kindeditor"]').each(function (i) {
            var $element = $(this);
            var options = getOptionsJson($element);

            if (options.items)
                options.items = options.items.replaceAll('\'', '').replaceAll(' ', '').split(',')
            if (options.afterUpload)
                options.afterUpload = options.afterUpload.toFunc()
            if (options.afterSelectFile)
                options.afterSelectFile = options.afterSelectFile.toFunc()
            if (options.confirmSelect)
                options.confirmSelect = options.confirmSelect.toFunc()

            var htmlTags = {
                font: [/*'color', 'size', 'face', '.background-color'*/],
                span: ['.color', '.background-color', '.font-size', '.font-family'
                    /*'.color', '.background-color', '.font-size', '.font-family', '.background',
                     '.font-weight', '.font-style', '.text-decoration', '.vertical-align', '.line-height'*/
                ],
                div: ['.margin', '.padding', '.text-align'
                    /*'align', '.border', '.margin', '.padding', '.text-align', '.color',
                     '.background-color', '.font-size', '.font-family', '.font-weight', '.background',
                     '.font-style', '.text-decoration', '.vertical-align', '.margin-left'*/
                ],
                table: ['align', 'width'
                    /*'border', 'cellspacing', 'cellpadding', 'width', 'height', 'align', 'bordercolor',
                     '.padding', '.margin', '.border', 'bgcolor', '.text-align', '.color', '.background-color',
                     '.font-size', '.font-family', '.font-weight', '.font-style', '.text-decoration', '.background',
                     '.width', '.height', '.border-collapse'*/
                ],
                'td,th': ['align', 'valign', 'width', 'height', 'colspan', 'rowspan'
                    /*'align', 'valign', 'width', 'height', 'colspan', 'rowspan', 'bgcolor',
                     '.text-align', '.color', '.background-color', '.font-size', '.font-family', '.font-weight',
                     '.font-style', '.text-decoration', '.vertical-align', '.background', '.border'*/
                ],
                a: ['href', 'target', 'name'],
                embed: ['src', 'width', 'height', 'type', 'loop', 'autostart', 'quality', '.width', '.height', 'align', 'allowscriptaccess'],
                img: ['src', 'width', 'height', 'border', 'alt', 'title', 'align', '.width', '.height', '.border'],
                'p,ol,ul,li,blockquote,h1,h2,h3,h4,h5,h6': [
                    'class', 'align', '.text-align', '.color', /*'.background-color', '.font-size', '.font-family', '.background',*/
                    '.font-weight', '.font-style', '.text-decoration', '.vertical-align', '.text-indent', '.margin-left'
                ],
                pre: ['class'],
                hr: ['class', '.page-break-after'],
                'br,tbody,tr,strong,b,sub,sup,em,i,u,strike,s,del': []
            }
            KindEditor.create($element, {
                module: options.module ? options.module : '未设置',
                category: options.category ? options.category : 'default',
                width: options.width ? options.width + 'px' : '700px',
                height: options.height ? options.height + 'px' : '600px',
                pasteType: options.pasteType,
                minHeight: options.minHeight || 150,
                autoHeightMode: options.autoHeight || true,
                afterCreate: function () {
                    //this.loadPlugin('autoheight');
                },
                items: options.model == "simple" ? ['source', 'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold', 'italic', 'underline', 'removeformat', '|', 'justifyleft', 'justifycenter', 'justifyright', 'insertorderedlist', 'insertunorderedlist', '|', 'emoticons', 'image', 'insertfile', 'link'] : KindEditor.options.items,
                uploadJson: options.uploadJson || ctx + '/system/attachment/kindeditorUpload',
                fileManagerJson: options.fileManagerJson || ctx + '/static/kindeditor/4.1.5/jsp/file_manager_json.jsp',
                allowFileManager: options.allowFileManager || true,
                fillDescAfterUploadImage: options.fillDescAfterUploadImage || true, //上传图片成功后转到属性页，为false则直接插入图片[设为true方便自定义函数(X_afterSelect)]
                afterUpload: options.afterUpload,
                afterSelectFile: options.afterSelectFile,
                X_afterSelect: options.confirmSelect,
                htmlTags: htmlTags,
                cssPath: [
                    ctx + '/static/kindeditor/4.1.5/editor-content.css',
                    ctx + '/static/kindeditor/4.1.5/plugins/code/prettify.css'
                ],
                afterBlur: function () {
                    this.sync()
                }
            });
        });

        $('[data-toggle="topjui-upload"]').each(function (i) {
            var $element = $(this);
            var options = getOptionsJson($element);

            setTimeout(function () {

                var oriUrl = options.url;
                var newUrl = oriUrl;
                if (options.url.indexOf("{") != -1) {
                    var row = getSelectedRowData(options.grid.type, options.grid.id);
                    // 替换本表中选中行占位值
                    newUrl = replaceUrlParamValueByBrace(oriUrl, row);
                }
                var uploadbutton = KindEditor.uploadbutton({
                    button: KindEditor($element)[0],
                    fieldName: 'imgFile',
                    url: newUrl || ctx + '/system/attachment/kindeditorUpload?dir=file&module=article&category=default&puuid=11111111111111111111111111111111',
                    afterUpload: function (data) {
                        if (data.error === 0) {
                            console.log(data);
                            var url = KindEditor.formatUrl(data.url, 'absolute');
                            //KindEditor('#'.options.fieldId).val(url);
                            $('#' + options.fieldId).textbox('setText', url);
                            $('#' + options.fieldId).textbox('setValue', url);
                            refreshGrid(options.grid.type, options.grid.id);
                            //$("#attachTable").append('<tr><td class="label"></td><td class="label" style="text-align:left;white-space:nowrap;"><a href="' + url + '" target="_blank">' + data.fileName + '</a></td><td class="label"></td><td class="label"></td><td class="label"></td></tr>');
                        } else {
                            alert(data.message);
                        }
                    },
                    afterError: function (str) {
                        alert('自定义错误信息: ' + str);
                    }
                });
                uploadbutton.fileBox.change(function (e) {
                    uploadbutton.submit();
                });
            }, 500);
        });

        /*var tab = $("#index_tabs");//假设是tab
         var iframe = $("iframe",tab);//获取tab中的iframe
         $('[data-toggle="topjui-dialog"]', iframe.context).each(function(i){
         alert("abc");
         });*/

    });

    $(document).on(topJUI.eventType.initUI.base, function (e) {
        //setTimeout(function () {
        // 父框架获取子框架元素
        // var test = $("iframe").contents().find("#test").val();

        getTabWindow().$('[data-toggle="topjui-treegrid"]').each(function (i) {
            var $element = $(this);
            var options = getOptionsJson($element);

            var op = [];
            $element.find("th").each(function (i) {
                op.push(strToJson("{" + this.getAttribute("data-options") + "}"));
            });
            options.columns = [op];

            $element.attr('id', options.id);
            getTabWindow().$('#' + options.id).iTreegrid(options);
        });

        getTabWindow().$('[data-toggle="topjui-datagrid"]').each(function (i) {
            var $element = $(this);
            var options = getOptionsJson($element);

            var frozenColumns = $element.find("thead:first")[0];
            //console.log(frozenColumns.getAttribute("frozen"));
            if ($(frozenColumns).attr("frozen")) {
                var frozenColumns = [];
                $element.find("thead:first th").each(function (i) {
                    frozenColumns.push(strToJson("{" + this.getAttribute("data-options") + "}"));
                });
                options.frozenColumns = [frozenColumns];

                var columns = [];
                $element.find("thead:eq(1) th").each(function (i) {
                    columns.push(strToJson("{" + this.getAttribute("data-options") + "}"));
                });
            } else {
                var columns = [];
                $element.find("thead th").each(function (i) {
                    columns.push(strToJson("{" + this.getAttribute("data-options") + "}"));
                });
            }
            options.columns = [columns];

            var kindEditor = [];

            //console.log(op.join());

            $element.attr('id', options.id);
            getTabWindow().$('#' + options.id).iDatagrid(options);
        });

        getTabWindow().$('[data-toggle="topjui-edatagrid"]').each(function (i) {
            var $element = $(this);
            var options = getOptionsJson($element);

            var frozenColumns = $element.find("thead:first")[0];
            //console.log(frozenColumns.getAttribute("frozen"));
            if ($(frozenColumns).attr("frozen")) {
                var frozenColumns = [];
                $element.find("thead:first th").each(function (i) {
                    frozenColumns.push(strToJson("{" + this.getAttribute("data-options") + "}"));
                });
                options.frozenColumns = [frozenColumns];

                var columns = [];
                $element.find("thead:eq(1) th").each(function (i) {
                    columns.push(strToJson("{" + this.getAttribute("data-options") + "}"));
                });
            } else {
                var columns = [];
                $element.find("thead th").each(function (i) {
                    columns.push(strToJson("{" + this.getAttribute("data-options") + "}"));
                });
            }
            options.columns = [columns];

            var kindEditor = [];

            //console.log(op.join());

            $element.attr('id', options.id);
            getTabWindow().$('#' + options.id).iEdatagrid(options);
        });

        getTabWindow().$('[data-toggle="topjui-tabs"]').each(function () {
            var $element = $(this);
            var options = getOptionsJson($element);

            $element.attr('id', options.id);
            getTabWindow().$('#' + options.id).iTabs(options);
        });

        getTabWindow().$('[data-toggle="topjui-menubutton"]').each(function () {
            var $element = $(this);
            var options = getOptionsJson($element);

            options.id = getTimestamp();
            $(this).attr("id", options.id);

            options = bindMenuClickEvent($element, options);

            $(this).iMenubutton(options);
        });

        getTabWindow().$('[data-toggle="topjui-uploader"]').each(function () {
            var $element = $(this);
            var options = getOptionsJson($element);

            // 生成菜单按钮
            $(this).iMenubutton(options);

            var uploader;
            var upfileGrid;
            var state = 'pending';
            var initfilesize = 0;
            var md5value = "";
            var isUpFile = false;//判断是否有文件上传成功，来提示dialog进行下部操作
            var parentRow;

            var dialogDom = '<div id="uploaderDialog">' +
                '<div id="upfileGrid-toolbar" data-options="border:false">' +
                '<div style="float: left;margin-right:5px;">' +
                '<div id="chooseFile">选择文件</div>' +
                '</div>' +
                '<a id="addUpFile" style="margin-right:5px;">开始上传</a>' +
                '<a id="removeUpFile">移除文件</a>' +
                '</div>' +
                '<table id="upfileGrid"></table>' +
                '</div>';

            getTabWindow().$('body').append(
                dialogDom +
                '<div id="uploaderDialog-buttons" style="display:none">' +
                '<a href="#" id="closeUploaderDialog">关闭</a>' +
                '</div>'
            );

            upfileGrid = $("#upfileGrid").datagrid({
                fit: true,
                fitColumns: true,
                rownumbers: true,
                nowrap: true,
                animate: false,
                border: false,
                singleSelect: false,
                idField: 'fileId',
                pagination: false,
                toolbar: '#upfileGrid-toolbar',
                columns: [[
                    {field: 'ck', checkbox: true},
                    {field: 'fileId', title: 'fileId', hidden: true},
                    {field: 'fileName', title: '文件名称', width: 100},
                    {field: 'fileSize', title: '文件大小', width: 30},
                    {field: 'validateMd5', title: '文件验证', width: 20},
                    {
                        field: 'progress',
                        title: '上传进度',
                        width: 180,
                        fixed: true,
                        formatter: function (value, rec) {
                            var htmlstr = '<div class="easyui-progressbar progressbar" style="width: 170px; height: 20px;" value="' + value + '" text="' + value + '%">' +
                                '<div class="progressbar-text" style="width: 170px; height: 20px; line-height: 20px;">' + value + '%</div>' +
                                '<div class="progressbar-value" style="width: ' + value + '%; height: 20px; line-height: 20px;">' +
                                '<div class="progressbar-text" style="width: 170px; height: 20px; line-height: 20px;">' + value + '%</div>' +
                                '</div>' +
                                '</div>';
                            return htmlstr;
                        }
                    },
                    {field: 'fileState', title: '上传状态', width: 20},
                ]]
            });

            // 在文件开始发送前做些异步操作。做md5验证
            // WebUploader会等待此异步操作完成后，开始发送文件。
            WebUploader.Uploader.register({
                "before-send-file": "beforeSendFile"
            }, {
                beforeSendFile: function (file) {
                    var task = new $.Deferred();
                    (new WebUploader.Uploader()).md5File(file, 0, 10 * 1024 * 1024).progress(function (percentage) {
                        upfileGrid.datagrid('updateRow',
                            {
                                index: upfileGrid.datagrid('getRowIndex', file.id),
                                row: {validateMd5: (percentage * 100) + "%"}
                            });
                    }).then(function (val) {
                        $.ajax({
                            type: "POST",
                            url: "/system/attachment/md5Validate",
                            data: {
                                type: "md5Check", md5: val
                            },
                            cache: false,
                            timeout: 3000,
                            dataType: "json"
                        }).then(function (data, textStatus, jqXHR) {
                            if (data.isHave) {   //若存在，这返回失败给WebUploader，表明该文件不需要上传
                                task.reject();
                                uploader.skipFile(file);
                                upfileGrid.datagrid('updateRow',
                                    {
                                        index: upfileGrid.datagrid('getRowIndex', file.id),
                                        row: {fileState: "秒传", progress: 100}
                                    });
                            } else {
                                $.extend(uploader.options.formData, {md5: val});
                                task.resolve();
                            }
                        }, function (jqXHR, textStatus, errorThrown) {    //任何形式的验证失败，都触发重新上传
                            task.resolve();
                        });
                    });
                    return $.when(task);
                }
            });

            uploader = WebUploader.create({
                // 不压缩image
                resize: false,
                // swf文件路径
                swf: '/static/webuploader/js/Uploader.swf',
                // 默认文件接收服务端。
                server: '/system/attachment/upload',
                // 选择文件的按钮。可选。
                // 内部根据当前运行是创建，可能是input元素，也可能是flash.
                pick: '#chooseFile',
                fileSingleSizeLimit: 100 * 1024 * 1024,//单个文件大小
                accept: [{
                    title: 'file',
                    extensions: 'doc,docx,pdf,xls,xlsx,ppt,pptx,gif,jpg,jpeg,bmp,png,rar,zip',
                    mimeTypes: '.doc,.docx,.pdf,.xls,.xlsx,.ppt,.pptx,.gif,.jpg,.jpeg,.bmp,.png,.rar,.zip'
                }]
            });

            // 当有文件添加进来的时候
            uploader.on('fileQueued', function (file) {
                var fileSize = bytesToSize(file.size);
                var row = {
                    fileId: file.id,
                    fileName: file.name,
                    fileSize: fileSize,
                    validateMd5: '0%',
                    progress: 0,
                    fileState: "等待上传"
                };
                upfileGrid.datagrid('insertRow', {
                    index: 0,
                    row: row
                });
            });

            // 文件上传过程中创建进度条实时显示。
            uploader.on('uploadProgress', function (file, percentage) {
                upfileGrid.datagrid('updateRow',
                    {
                        index: upfileGrid.datagrid('getRowIndex', file.id),
                        row: {progress: (percentage * 100).toFixed(2)}
                    });
            });

            //文件上传成功
            uploader.on('uploadSuccess', function (file) {
                var rows = upfileGrid.datagrid("getRows");
                //上传成功设置checkbox不可用
                for (var i = 0; i < rows.length; i++) {
                    if (rows[i].fileId == file.id) {
                        $("input[type='checkbox']")[i + 1].disabled = true;
                    }
                }
                $("#removeUpFile").linkbutton("disable");
                upfileGrid.datagrid('updateRow',
                    {index: upfileGrid.datagrid('getRowIndex', file.id), row: {fileState: '上传成功'}});
                isUpFile = true;
            });
            //文件上传失败
            uploader.on('uploadError', function (file) {
                upfileGrid.datagrid('updateRow',
                    {index: upfileGrid.datagrid('getRowIndex', file.id), row: {fileState: '上传失败'}});
            });

            uploader.on('uploadComplete', function (file) {

            });

            uploader.on('uploadFinished', function () {//成功后
                $("#attachmentDg").datagrid('reload');
            });

            uploader.on('error', function (handler) {
                if (handler == 'F_EXCEED_SIZE') {
                    tim.parentAlert('error', '上传的单个文件不能大于' + initfilesize + '。<br>操作无法进行,如有需求请联系管理员', 'error');
                } else if (handler == 'Q_TYPE_DENIED') {
                    tim.parentAlert('error', '不允许上传此类文件!。<br>操作无法进行,如有需求请联系管理员', 'error');
                }
            });

            /*从队列中移除文件*/
            var removeFile = function () {
                var fileRows = upfileGrid.datagrid("getSelections");
                var copyRows = [];
                for (var j = 0; j < fileRows.length; j++) {
                    copyRows.push(fileRows[j]);
                }
                for (var i = 0; i < copyRows.length; i++) {
                    var index = upfileGrid.datagrid('getRowIndex', copyRows[i]);
                    uploader.removeFile(copyRows[i].fileId, true);
                    upfileGrid.datagrid('deleteRow', index);
                }
                upfileGrid.datagrid('clearSelections');
            }

            var uploadToServer = function (uploader, parentRow) {
                if (uploader.getFiles().length <= 0) {
                    $.messager.alert('提示', '没有上传的文件!', 'error');
                    return;
                }
                if (state === 'uploading') {
                    uploader.stop();
                }
                else {
                    uploader.option('formData', {
                        puuid: parentRow.uuid
                    });
                    uploader.upload();
                }
            }

            //初始化上传参数
            var initUpLoad = function (args) {
                var opts = {};
                if (args) {
                    if (args.url != null && args.url != "") {
                        opts.server = args.url;
                    }
                    if (args.size != null && args.size != "") {
                        initfilesize = args.size;
                        opts.fileSingleSizeLimit = args.size;
                    }
                    if (args.args != null && args.args != "") {
                        opts.formData = args.args;
                    }
                    if (opts) {
                        $.extend(uploader.options, opts);
                    }
                }
            }

            var getSuccess = function () {
                return isUpFile;
            }

            $element.on("click", function () {

                if (typeof options.parentGrid == "object") {
                    //判断父表数据是否被选中
                    parentRow = getSelectedRowData(options.parentGrid.type, options.parentGrid.id);
                    if (!parentRow) {
                        $.messager.alert(
                            topJUI.language.message.title.operationTips,
                            options.parentGrid.unselectedMsg || topJUI.language.message.msg.selectParentGrid,
                            topJUI.language.message.icon.warning
                        );
                        return;
                    }
                }

                var fileRows = upfileGrid.datagrid("getRows");
                if (fileRows.length > 0) {
                    upfileGrid.datagrid("selectAll");
                    removeFile();
                }

                var uploaderDialog = $("#uploaderDialog");

                var defaults = {
                    iconCls: 'fa fa-plus',
                    parentGridUnselectedMsg: '请先选中一条主表数据！',
                    dialog: {
                        title: '附件上传',
                        width: 900,
                        height: 500,
                        maximized: false,
                        maximizable: true,
                        buttons: '#uploaderDialog-buttons'
                    }
                };
                options = $.extend(defaults, options);

                uploaderDialog.dialog({
                    title: options.dialog.title,
                    width: options.dialog.width,
                    height: options.dialog.height,
                    maximized: options.dialog.maximized,
                    maximizable: options.dialog.maximizable,
                    buttons: options.dialog.buttons
                });
                uploaderDialog.dialog('open');

                $('#addUpFile').linkbutton({
                    iconCls: 'fa fa-plus',
                    height: 37,
                    onClick: function () {
                        uploadToServer(uploader, parentRow);
                    }
                });
                $('#removeUpFile').linkbutton({
                    iconCls: 'icon-no',
                    height: 37,
                    onClick: removeFile
                });
                $('#closeUploaderDialog').linkbutton({
                    iconCls: 'icon-no',
                    onClick: function () {
                        uploaderDialog.dialog('close');
                    }
                });
            });

        });

        getTabWindow().$('[data-toggle="topjui-submenubutton"]').each(function () {
            var $element = $(this);
            var options = getOptionsJson($element);
            bindMenuClickEvent($element, options);
            $(this).iSubMenubutton(options);
        });
        //}, 1);

        //setTimeout(function () {
        getTabWindow().$('[data-toggle="topjui-dialog"]').each(function () {
            var $element = $(this);
            var options = getOptionsJson($element);

            var href = $element.attr('href');
            if (href != undefined) {
                options.href = href;
                getTabWindow().$('body').append('<div id="' + options.id + '"></div>');
                getTabWindow().$('#' + options.id).iDialog(options);

                $element.on("click", function () {
                    getTabWindow().$('#' + options.id).dialog('open');
                    return false; //阻止链接跳转
                });

            } else {
                $element.attr('id', options.id);
                //getTabWindow().$('#' + options.id).iDialog(options);
            }
        });

        getTabWindow().$('[data-toggle="topjui-linkbutton"]').each(function (i) {
            var $element = $(this);
            var options = getOptionsJson($element);

            $element.iLinkbutton(options);
        });
        //}, 10);
    });

    $(document).on(topJUI.eventType.initUI.base2, function (e) {
        //setTimeout(function () {
        getTabWindow().$('[data-toggle="topjui-menu"]').each(function (i) {
            var $element = $(this);
            var options = getOptionsJson($element);

            $element.attr('id', options.id);
            getTabWindow().$('#' + options.id).iMenu(options);
        });

        getTabWindow().$('[data-toggle="topjui-tree"]').each(function (i) {
            var $element = $(this);
            var options = getOptionsJson($element);

            $element.attr('id', options.id);
            getTabWindow().$('#' + options.id).iTree(options);
        });
        //}, 15);
    });

    $(document).on(topJUI.eventType.initUI.echarts, function (e) {
        if (getTabWindow().$('[data-toggle="topjui-echarts"]').length > 0) {
            getTabWindow().$('[data-toggle="topjui-echarts"]').each(function (i) {
                var $element = $(this);
                var options = getOptionsJson($element);

                // 基于准备好的dom，初始化echarts实例
                var divId = getTabWindow().document.getElementById($element[0].id);
                var myChart = echarts.init(divId);

                // 指定图表的配置项和数据
                myChart.setOption({
                    title: {
                        text: ''
                    },
                    tooltip: {},
                    legend: {
                        data: []
                    },
                    series: []
                });

                // 异步加载数据
                $.ajax({
                    url: options.url,
                    type: 'post',
                    dataType: 'json',
                    success: function (data, response, status) {
                        //console.log(data.legend);
                        if (options.type == "bar" || options.type == "line") {
                            // 填入数据
                            myChart.setOption({
                                title: {
                                    text: data.title
                                },
                                xAxis: {
                                    data: data.categories
                                },
                                yAxis: {},
                                legend: {
                                    data: data.legend
                                },
                                series: data.series
                            });
                        }
                        if (options.type == "pie") {
                            // 填入数据
                            myChart.setOption({
                                title: {
                                    text: data.title,
                                    x: 'center'
                                },
                                tooltip: {
                                    trigger: 'item',
                                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                                },
                                legend: data.legend,
                                series: data.series
                            });
                        }
                        if (options.type == "gauge") {
                            // 填入数据
                            myChart.setOption({
                                tooltip: {
                                    formatter: "{a} <br/>{b} : {c}%"
                                },
                                series: [
                                    {
                                        name: '业务指标',
                                        type: 'gauge',
                                        detail: {formatter: '{value}%'},
                                        data: [{value: 17.1, name: '党员发展率'}]
                                    }
                                ]
                            });
                        }
                    },
                    error: function (errorMsg) {
                        alert("获取图表数据失败!");
                        myChart.hideLoading();
                    }
                });

            });
        }
    });

    /**
     * 查询界面初始化打开及每新增一行查询条件时触发显示各项内容,窗口onLoad时加载
     */
    $(document).on(topJUI.eventType.initUI.advanceSearchForm, function (e) {

        var valueArr = $.cookie('fieldNameStr').split(",");
        var textArr = $.cookie('colNameStr').split(",");
        var fieldArr = [];

        for (var i = 0; i < textArr.length; i++) {
            fieldArr.push({
                value: valueArr[i],
                text: textArr[i]
            });
        }

        $(".field:last").combobox({
            textField: 'text',
            valueField: 'value',
            data: fieldArr,
            editable: false,
            width: 140
        });

        $(".op:last").combobox({
            textField: 'text',
            valueField: 'value',
            data: [
                {"text": "包含", "value": "contains", "selected": true},
                {"text": "等于", "value": "equal"},
                {"text": "不等于", "value": "notequal"},
                {"text": "大于", "value": "greater"},
                {"text": "大于或等于", "value": "greaterorequal"},
                {"text": "小于", "value": "less"},
                {"text": "小于或等于", "value": "lessorequal"},
                {"text": "以...开头", "value": "beginwith"},
                {"text": "以...结尾", "value": "endwith"}
            ],
            width: 120,
            panelHeight: 220,
            editable: false
        });

        $(".value:last").textbox({});

        $(".lb:last").combobox({
            textField: 'text',
            valueField: 'value',
            data: [
                {"text": "无", "value": "", "selected": true},
                {"text": "(", "value": "("}
            ],
            width: 45,
            panelHeight: 70,
            editable: false
        });

        $(".rb:last").combobox({
            textField: 'text',
            valueField: 'value',
            data: [
                {"text": "无", "value": "", "selected": true},
                {"text": ")", "value": ")"}
            ],
            width: 45,
            panelHeight: 70,
            editable: false
        });

        $(".join:last").combobox({
            textField: 'text',
            valueField: 'value',
            data: [
                {"text": "并且", "value": "and", "selected": true},
                {"text": "或者", "value": "or"}
            ],
            width: 70,
            panelHeight: 70,
            editable: false
        });

        $("#addCondition").menubutton({
            iconCls: 'fa fa-plus',
            hasDownArrow: false
        });

        $(".deleteCondition:last").menubutton({
            iconCls: 'fa fa-minus',
            hasDownArrow: false
        });

        $(".deleteCondition:last").on('click', function () {
            var index = $(".deleteCondition").index(this) + 2;
            getTabWindow().$("#advanceSearchTable tr:eq(" + index + ")").remove();
        });
    });

    /**
     * 导入Excel事件，窗口onLoad时加载
     */
    $(document).on(topJUI.eventType.initUI.importExcelForm, function (e) {
        //触发界面初始化显示样式
        //$(this).trigger(topJUI.eventType.initUI.form);

        setTimeout(function () {
            var fieldStr = $.cookie('fieldNameStr');
            var fieldArr = fieldStr.split(",");
            var v = "";
            for (var i = 0; i < fieldArr.length; i++) {
                if (i == (fieldArr.length - 1))
                    v += "'{" + i + "}'";
                else
                    v += "'{" + i + "}',";
            }
            var importExcelSql = "INSERT INTO {table} (" + fieldStr + ") VALUES (" + v + ")";
            $("#importExcelSql").textbox("setValue", importExcelSql);
        }, 1000);
    });

}(jQuery);

$(function () {
    // 页面加载完成后触发基础表格及弹窗事件，主页面除外
    if (!topJUI.config.mainPage) {
        $(this).trigger(topJUI.eventType.initUI.base);
        $(this).trigger(topJUI.eventType.initUI.base2);
    }

    if ($.cookie("verify") != "y") {
        if (navigator.onLine) {
            $.ajax({
                type: 'GET',
                url: $.base64.decode("aHR0cDovL2xpY2Vuc2UuZXdzZC5jbi90b3BqdWkvY2xpZW50L3ZlcmlmeQ=="),
                data: "host=" + window.location.host + "&href=" + window.location.href,
                dataType: 'jsonp',
                jsonp: 'callback',
                processData: false,
                success: function (data) {
                    if (data.status == "1") {
                        var expiresDate = new Date();
                        expiresDate.setTime(expiresDate.getTime() + (data.intervalMinute * 60 * 1000));
                        $.cookie("verify", "y", {expires: expiresDate, path: '/'});
                        $.messager.alert(decodeURI($.base64.decode("JUU4JUFEJUE2JUU1JTkxJThB")), decodeURI($.base64.decode("JUU4JUFGJUE1JUU3JUIzJUJCJUU3JUJCJTlGJUU2JTg5JTgwJUU0JUJEJUJGJUU3JTk0JUE4JUU3JTlBJTg0VG9wSlVJJUU1JTg5JThEJUU3JUFCJUFGJUU2JUExJTg2JUU2JTlFJUI2JUU2JTlDJUFBJUU4JUEyJUFCJUU2JThFJTg4JUU2JTlEJTgzJUU0JUJEJUJGJUU3JTk0JUE4JUVGJUJDJThDJUU3JUIzJUJCJUU3JUJCJTlGJUU1JUFEJTk4JUU1JTlDJUE4JUU5JUEzJThFJUU5JTk5JUE5JUVGJUJDJTgxJUU4JUFGJUI3JUU0JUI4JThFJUU3JUIzJUJCJUU3JUJCJTlGJUU2JThGJTkwJUU0JUJFJTlCJUU4JTgwJTg1JUU4JTgxJTk0JUU3JUIzJUJCJUU2JTg4JTk2JUU0JUJCJThFJTNDYSUyMGhyZWY9JTIyaHR0cDovL3d3dy5ld3NkLmNuJTIyJTIwdGFyZ2V0PSUyMl9ibGFuayUyMiUyMHN0eWxlPSUyMmNvbG9yOnJlZDslMjIlM0UlRTUlQUUlOTglRTYlOTYlQjklRTclQkQlOTElRTclQUIlOTklM0MvYSUzRSVFOCU4RSVCNyVFNSVCRSU5NyVFNCVCRCVCRiVFNyU5NCVBOCVFNiU4RSU4OCVFNiU5RCU4MyVFRiVCQyU4MQ==")));
                    }
                }
            });
        }
    }

    /**
     * 高级查询对话框窗口
     */
    /*    $("#advanceSearchDialog").dialog({
     width: 620,
     height: 400,
     title: '组合查询',
     modal: false,
     collapsible: true,
     minimizable: false,
     maximized: false,
     resizable: true,
     closed: true,
     iconCls: 'fa fa-search',
     href: '/system/search/advanceSearch',
     zIndex: 10,
     buttons: '#advanceSearchDialog-buttons',
     onLoad: function () {
     //窗口打开时，触发事件
     $(this).trigger(topJUI.eventType.initUI.advanceSearchForm);
     }
     });*/

    /*$("#resetAdvanceSearchForm").on('click', function () {
     var formDataArr = [];
     loadGrid(formDataArr)
     });*/

    /*$("#submitAdvanceSearchForm").on('click', function () {

     });
     */

    setTimeout(function () {
        /**
         * 导入Excel对话框窗口,Common/footer.jsp中定义
         */
        $("#importExcelDialog").dialog({
            width: 650,
            height: 200,
            title: '高级查询',
            modal: false,
            collapsible: true,
            minimizable: false,
            maximized: false,
            resizable: true,
            closed: true,
            iconCls: 'icon-find',
            href: '/system/excel/excelImport',
            zIndex: 10,
            buttons: '#importExcelDialog-buttons',
            onLoad: function () {
                //窗口打开时，触发事件
                $(this).trigger(topJUI.eventType.initUI.importExcelForm);
            }
        });
    }, 1000);

    $("#submitImportExcelForm").on('click', function () {
        var ajaxData = $("#importExcelDialog").serializeArray();
        //console.log(ajaxData[0].value);
        $.ajax({
            type: "POST",
            url: getUrl("controller") + "importExcel",
            data: ajaxData,
            dataType: "json",
            success: function (data) {
                showMessage({statusCode: data.statusCode, title: data.title, message: data.message});
                $("#importExcelDialog").dialog('close').form('reset');
                refreshGrid($.cookie("gridType"), $.cookie("gridId"));
            },
            error: function (msg) {
                showMessage({statusCode: 300, title: "操作提示", message: msg});
            }
        });
    });

});;(function ($) {

    $.fn.iTabs = function (options) {

        var initShow = true;

        var defaults = {
            title: '',
            closable: true,
            iconCls: '',
            content: '',
            //href: '/system/page/selectRow',
            border: true,
            fit: true,
            onSelect: function (title, index) {
                var tabs = options.tabs;
                var $element = $('#' + options.id).tabs('getTab', index);

                var panelOptions = $element.panel('options');
                if (panelOptions.href != undefined) {
                    var iframe = '<iframe src="' + panelOptions.href + '" scrolling="auto" frameborder="0" style="width:100%;height:100%;"></iframe>';
                    $element.panel({
                        content: iframe
                    });
                    $element.panel('refresh');
                } else {
                    //初始化显示tabs时，不加载里面的内容
                    if (!initShow) {
                        // 获得grid或panel对象
                        var $gridOrPanelObj = $("#" + tabs[index].id);
                        var newQueryParams = {};
                        if (tabs[index].type == "datagrid") {
                            var gridOptions = $gridOrPanelObj.datagrid('options');
                            var $parentGrid = $('#' + gridOptions.parentGrid.id);
                            if (gridOptions.parentGrid.type == "datagrid")
                                var selectedRow = $parentGrid.datagrid("getSelected");
                            if (gridOptions.parentGrid.type == "treegrid")
                                var selectedRow = $parentGrid.treegrid("getSelected");
                            if (selectedRow) {
                                newQueryParams = getSelectedRowJson(gridOptions.parentGrid.param, selectedRow);
                                //获得表格原有的参数
                                var queryParams = $gridOrPanelObj.datagrid('options').queryParams;
                                $gridOrPanelObj.datagrid('options').queryParams = $.extend({}, queryParams, newQueryParams);
                                $gridOrPanelObj.datagrid('load');
                            } else {
                                $gridOrPanelObj.datagrid('load');
                            }
                        } else if (tabs[index].type == "treegrid") {
                            var gridOptions = $gridOrPanelObj.panel('options');
                            var $parentGrid = $('#' + gridOptions.parentGrid.id);
                            if (gridOptions.parentGrid.type == "datagrid")
                                var selectedRow = $parentGrid.datagrid("getSelected");
                            if (gridOptions.parentGrid.type == "treegrid")
                                var selectedRow = $parentGrid.treegrid("getSelected");
                            if (selectedRow) {
                                newQueryParams = getSelectedRowJson(gridOptions.parentGrid.param, selectedRow);
                                //获得表格原有的参数
                                var queryParams = $gridOrPanelObj.datagrid('options').queryParams;
                                $gridOrPanelObj.treegrid('options').queryParams = $.extend({}, queryParams, newQueryParams);
                                $gridOrPanelObj.treegrid('load');
                            } else {
                                $gridOrPanelObj.treegrid('load');
                            }
                        } else if (tabs[index].type == "panel") {
                            var panelOptions = $gridOrPanelObj.panel('options');
                            var $parentGrid = $('#' + panelOptions.parentGrid.id);
                            if (panelOptions.parentGrid.type == "datagrid")
                                var selectedRow = $parentGrid.datagrid("getSelected");
                            if (panelOptions.parentGrid.type == "treegrid")
                                var selectedRow = $parentGrid.treegrid("getSelected");
                            if (selectedRow) {
                                var newHref = replaceUrlParamValueByBrace(panelOptions.dynamicHref, selectedRow);
                                //$element.panel('refresh', newHref);
                                var iframe = '<iframe src="' + newHref + '" scrolling="auto" frameborder="0" style="width:100%;height:100%;"></iframe>';
                                $gridOrPanelObj.panel({
                                    content: iframe
                                });
                            } else {
                                $gridOrPanelObj.panel('refresh');
                            }
                        }
                    }
                    initShow = false;
                }
            },
            onLoad: function (panel) {
                //$(this).trigger(topJUI.eventType.initUI.base);
            }
        }

        var options = $.extend(defaults, options);

        $(this).tabs(options);
    }

    // 扩展tabs方法
    $.extend($.fn.tabs.methods, {
        myAdd: function (jq, param) {
            return jq.each(function () {
                $(this).tabs('add', param);
                // 打开Tab页时触发事件
                // $(this).trigger(topJUI.eventType.initUI.base);
            });
        },
        /**
         * 绑定双击事件
         * @param {Object} jq
         * @param {Object} caller 绑定的事件处理程序
         */
        bindDblclick: function (jq, caller) {
            return jq.each(function () {
                var that = this;
                $(this).children("div.tabs-header").find("ul.tabs").undelegate('li', 'dblclick.tabs').delegate('li', 'dblclick.tabs', function (e) {
                    if (caller && typeof(caller) == 'function') {
                        var title = $(this).text();
                        var index = $(that).tabs('getTabIndex', $(that).tabs('getTab', title));
                        caller(index, title);
                    }
                });
            });
        },
        /**
         * 解除绑定双击事件
         * @param {Object} jq
         */
        unbindDblclick: function (jq) {
            return jq.each(function () {
                $(this).children("div.tabs-header").find("ul.tabs").undelegate('li', 'dblclick.tabs');
            });
        }
    });

})(jQuery);;$(function(){
	var managerTool = {
		reload : function (options) {
			$(options.datagridId).datagrid('reload');
		},
		redo : function (options) {
			$(options.datagridId).datagrid('unselectAll');
		},
		add : function (options) {
			$(options.addDialogId).dialog('open').form('reset');
		},
		remove : function (options) {
			if(options) {
				var rows = $(options.datagridId).datagrid('getSelections');
				if (rows.length > 0) {
					$.messager.confirm('确定操作', '您确定要删除所选的记录吗？', function (flag) {
						if (flag) {
							var uuids = [];
							for (var i = 0; i < rows.length; i ++) {
								uuids.push("'"+rows[i].uuid+"'");
							}
							//console.log(uuids.join(','));
							$.ajax({
								type : 'POST',
								url : options.url,
								data : {
									uuids : uuids.join(',')
								},
								beforeSend : function () {
									$(options.datagridId).datagrid('loading');
								},
								success : function (data) {
									if (data) {
										$(options.datagridId).datagrid('loaded');
										$(options.datagridId).datagrid('load');
										$(options.datagridId).datagrid('unselectAll');
										$.messager.show({
											title : '温馨提示',
											msg : '成功删除【' + data + '】条记录！'
										});
									}
								}
							});
						}
					});
				} else {
					$.messager.alert('提示操作', '请选择要删除的记录！', 'info');
				}
			}
		},
		edit : function (options) {
			if(options) {
				var rows = $(options.datagridId).datagrid('getSelections');
				if (rows.length > 1) {
					$.messager.alert('提示操作！', '编辑数据只能选择一条记录！', 'warning');
				} else if (rows.length == 1) {
					$.ajax({
						url : options.url,
						type : 'post',
						dataType: 'json',
						data : {
							uuid : rows[0].uuid
						},
						beforeSend : function () {
							$.messager.progress({
								text : '正在获取中...'
							});
						},
						success : function (data, response, status) {
							$.messager.progress('close');
								
							if (data) {
								var params = '{';
								$.each(options.transferData, function (k, v) {
									params += '"' + v + '": "' + data[v.replace("Edit", "")] + '", ';
								});
								params += '"endStr": "1"}';
								
								$(options.editDialogId).dialog('open');
								setTimeout(function() {
									$(options.editDialogId).form('load', $.parseJSON(params));
							    }, 100);
							} else {
								$.messager.alert('获取失败！', '未知错误导致失败，请重试！', 'warning');
							}
						}
					});
				} else if (rows.length == 0) {
					$.messager.alert('提示操作！', '编辑数据请至少选择一条记录！', 'warning');
				}
			}
		}
	}
});(function($){
	
	$.fn.iTree = function(options) {
		var defaults = {
			treeId : this.selector,
			url    : ctx + '/system/codeItem/getListByCodeSetIdAndLevelId?codeSetId={codeSetId}&levelId={levelId}',
			expandUrl : ctx + '/system/codeItem/getListByPid?pid={pid}',
	        lines : false,
	        animate : true,
	        border : false,
	        clickEvent : 'clickEventName',
	        queryParams : {
				
			},
			onContextMenu: '',
			refreshDatagridId : '#datagrid'
		}
		
		var options = $.extend(defaults, options);
		
		if(options.url.indexOf("codeSetId") == -1) {
			options.url = options.url + "?codeSetId=" + options.codeSetId + "&levelId=" + options.levelId;
		} else {
			options.url = options.url.replace("{codeSetId}", options.codeSetId).replace("{levelId}", options.levelId);
		}
		
		if(options.treeId == "") {
			options.treeId = $(this).context;
		}
		
		$(this).tree({
            url: options.url,
            lines: options.lines,
            animate: options.animate,
            border: options.border,
            onContextMenu: options.onContextMenu,
            onBeforeExpand:function(node,param) {
                $(options.treeId).tree('options').url = options.expandUrl.replace("{pid}", node.id);
            },
            onClick : function(node) {
            	
            	if(options.clickEvent == 'postCodeItemIdAndRefreshDatagrid') {
            		
            		//if(node.attributes != undefined && typeof node.attributes != "object") {
            			//console.log(node.attributes);
                		//node.attributes = $.parseJSON(node.attributes);
             	    //}
                	//if(options.clickEvent == 'postCodeItemId') {
                	//if( node.attributes.event == 'postCodeItemId') {	
                    	//if(node.attributes) {
                    		var dg = $(options.refreshDatagridId);
                     	    var queryParams = dg.datagrid('options').queryParams;
                     	    var newQueryParams = options.queryParams;
                     	    newQueryParams.codeSetId = node.codesetid;
                     	    newQueryParams.codeItemId = node.id;
                     	    newQueryParams.pid = node.pid;
                     	    newQueryParams.code = node.code;
                     	    dg.datagrid('options').queryParams = $.extend({}, queryParams, newQueryParams);
                     	    dg.datagrid('reload');
                        //}
                    //}
                	
            	}else if(options.clickEvent == 'postTreeParamsAndRefreshDatagrid') {
            		var dg = $(options.refreshDatagridId);
             	    var queryParams = dg.datagrid('options').queryParams;
             	    newQueryParams = options.queryParams;
             	    newQueryParams.codeSetId = node.codesetid;
             	    newQueryParams.codeItemId = node.id;
             	    newQueryParams.id = node.id;
             	    newQueryParams.pid = node.pid;
             	    newQueryParams.text = node.text;
             	    newQueryParams.code = node.code;
             	    dg.datagrid('options').queryParams = $.extend({}, queryParams, newQueryParams);
             	    dg.datagrid('reload');
            	} else {
            		
            		if (node.state == "closed") {
                        $(options.treeId).tree('expand', node.target);
                    } else {
                    	$(options.treeId).tree('collapse', node.target);
                    }
            		
            	}
            	
            },
            onLoadSuccess : function() {
            	setTimeout(function(){
            		var rootNode = $(options.treeId).tree('getRoot');
                	$(options.treeId).tree("expand", rootNode.target);
            	},1000);
            	
            }
        });
		
	}

})(jQuery);;(function ($) {
    $.fn.iTreegrid = function (options) {
        var defaults = {
            //gridId       : element.get(0).id,
            gridId: this.selector,
            treegridContextId: 'treegridContext',
            url: ctx + '/system/codeItem/getListByCodeSetIdAndLevelId',
            queryParams: {"codeSetId": $.getUrlParam("codeSetId"), "levelId": $.getUrlParam("levelId")},//首次查询参数
            onBeforeExpandUrl: ctx + "/system/codeItem/getListByPid",
            idField: 'id',
            treeField: 'text',
            fit: true,
            fitColumns: true,
            border: false,
            toolbar: this.selector + "-toolbar",
            pagination: false,
            pageNumber: 1,
            pageSize: 20,
            pageList: [10, 20, 30, 40, 50],
            animate: true,
            columns: [[
                {field: 'text', title: '名称'},
                {field: 'codeSetId', title: '体系代码', width: 100},
                {field: 'id', title: '编号'},
                {field: 'pid', title: '父级编号'},
                {field: 'levelId', title: '层级', width: 100},
                {field: 'sort', title: '排序', width: 100},
                {field: 'code', title: '代码', width: 100},
                {field: 'status', title: '状态', width: 100}
            ]],
            checkOnSelect: false,
            selectOnCheck: false,
            onBeforeExpand: function (row) {
                $(this).treegrid('options').url = replaceUrlParamValueByBrace(options.expandUrl, row);
            },
            onLoadSuccess: function () {
                var rootNode = $(options.gridId).treegrid('getRoot');
                if (rootNode) {
                    $(options.gridId).treegrid("expand", rootNode.id);
                }
                $(this).treegrid('options').url = appendSourceUrlParam(options.url);
            },
            onContextMenu: function (e, row) {
                /*e.preventDefault();
                 // 查找节点
                 $(this).treegrid('select', row[options.idField]);
                 // 显示快捷菜单
                 $("#" + options.treegridContextId).menu('show', {
                 left: e.pageX,
                 top: e.pageY
                 });*/
            },
            onClickRow: function (row) {
                //级联选择
                $("#" + options.id).treegrid('cascadeCheck', {
                    id: row.id, //节点ID
                    deepCascade: true //深度级联
                });

                //传递给要刷新表格的参数
                if (typeof options.childGrid == "object") {
                    var newQueryParams = {};
                    newQueryParams = getSelectedRowJson(options.childGrid.params, row);

                    var refreshGridIdArr = options.childGrid.grids;
                    for (var i = 0; i < refreshGridIdArr.length; i++) {
                        var $grid = $("#" + refreshGridIdArr[i].id);

                        if (refreshGridIdArr[i].type == "datagrid") {
                            //获得表格原有的参数
                            var queryParams = $grid.datagrid('options').queryParams;
                            $grid.datagrid('options').queryParams = $.extend({}, queryParams, newQueryParams);
                            $grid.datagrid('load');
                        } else if (refreshGridIdArr[i].type == "treegrid") {
                            //获得表格原有的参数
                            var queryParams = $grid.treegrid('options').queryParams;
                            $grid.treegrid('options').queryParams = $.extend({}, queryParams, newQueryParams);
                            $grid.treegrid('load');
                        } else if (refreshGridIdArr[i].type == "panel") {
                            var href = replaceUrlParamValueByBrace(refreshGridIdArr[i].href, row);
                            $grid.panel('refresh', href);
                        }
                    }
                }

                if (typeof options.childTab == "object") {
                    var childTabArr = options.childTab.tabs;
                    for (var i = 0; i < childTabArr.length; i++) {
                        var $tabsElement = $('#' + childTabArr[i].id);
                        var $tabsOptions = $tabsElement.tabs('options');
                        var index = $tabsElement.tabs('getTabIndex', $tabsElement.tabs('getSelected'));
                        var tabsComponent = $tabsOptions.tabs;
                        var $element = $("#" + tabsComponent[index].id);

                        var newQueryParams = {};

                        newQueryParams = getSelectedRowJson(childTabArr[i].params, row);

                        if (tabsComponent[index]["type"] == "datagrid") {
                            //获得表格原有的参数
                            var queryParams = $element.datagrid('options').queryParams;
                            $element.datagrid('options').queryParams = $.extend({}, queryParams, newQueryParams);
                            $element.datagrid('load');
                        } else if (tabsComponent[index]["type"] == "treegrid") {
                            //获得表格原有的参数
                            var queryParams = $element.treegrid('options').queryParams;
                            $element.treegrid('options').queryParams = $.extend({}, queryParams, newQueryParams);
                            $element.treegrid('load');
                        } else if (tabsComponent[index]["type"] == "panel") {
                            var panelOptions = $element.panel('options');
                            var newHref = replaceUrlParamValueByBrace(panelOptions.dynamicHref, row);
                            //$element.panel('refresh', newHref);
                            var iframe = '<iframe src="' + newHref + '" scrolling="auto" frameborder="0" style="width:100%;height:100%;"></iframe>';
                            $element.panel({
                                content: iframe
                            });
                        }
                    }
                }

            }
        }

        var options = $.extend(defaults, options);
        options.url = appendSourceUrlParam(options.url);

        $(this).treegrid(options);
    }

    /* http://blog.csdn.net/yongjiandan/article/details/8061944 */

    /**
     * 扩展树表格级联勾选方法：
     * @param {Object} container
     * @param {Object} options
     * @return {TypeName}
     */
    $.extend($.fn.treegrid.methods, {
        /**
         * 级联选择
         * @param {Object} target
         * @param {Object} param
         *      param包括两个参数:
         *          id:勾选的节点ID
         *          deepCascade:是否深度级联
         * @return {TypeName}
         */
        cascadeCheck: function (target, param) {
            var opts = $.data(target[0], "treegrid").options;
            if (opts.singleSelect)
                return;
            var idField = opts.idField;//这里的idField其实就是API里方法的id参数
            var status = false;//用来标记当前节点的状态，true:勾选，false:未勾选
            var selectNodes = $(target.selector).treegrid('getSelections');//获取当前选中项
            for (var i = 0; i < selectNodes.length; i++) {
                if (selectNodes[i][idField] == param.id)
                    status = true;
            }
            //级联选择父节点
            selectParent(target, param.id, idField, status);
            selectChildren(target, param.id, idField, param.deepCascade, status);
            /**
             * 级联选择父节点
             * @param {Object} target
             * @param {Object} id 节点ID
             * @param {Object} status 节点状态，true:勾选，false:未勾选
             * @return {TypeName}
             */
            function selectParent(target, id, idField, status) {
                var parent = $(target.selector).treegrid('getParent', id);
                if (parent) {
                    var parentId = parent[idField];
                    if (status)
                        $(target.selector).treegrid('select', parentId);
                    else
                        $(target.selector).treegrid('unselect', parentId);
                    selectParent(target, parentId, idField, status);
                }
            }

            /**
             * 级联选择子节点
             * @param {Object} target
             * @param {Object} id 节点ID
             * @param {Object} deepCascade 是否深度级联
             * @param {Object} status 节点状态，true:勾选，false:未勾选
             * @return {TypeName}
             */
            function selectChildren(target, id, idField, deepCascade, status) {
                //深度级联时先展开节点
                if (!status && deepCascade)
                    $(target).treegrid('expand', id);
                //根据ID获取下层孩子节点
                var children = $(target).treegrid('getChildren', id);
                for (var i = 0; i < children.length; i++) {
                    var childId = children[i][idField];
                    if (status)
                        $(target).treegrid('select', childId);
                    else
                        $(target).treegrid('unselect', childId);
                    selectChildren(target, childId, idField, deepCascade, status);//递归选择子节点
                }
            }
        }
    });

    /**
     * 扩展树表格级联选择（点击checkbox才生效）：
     *        自定义两个属性：
     *        cascadeCheck ：普通级联（不包括未加载的子节点）
     *        deepCascadeCheck ：深度级联（包括未加载的子节点）
     */
    /*$.extend($.fn.treegrid.defaults, {
        onLoadSuccess: function () {
            var target = $(this);
            var opts = $.data(this, "treegrid").options;
            var panel = $(this).datagrid("getPanel");
            var gridBody = panel.find("div.datagrid-body");
            var idField = opts.idField;//这里的idField其实就是API里方法的id参数
            gridBody.find("div.datagrid-cell-check input[type=checkbox]").unbind(".treegrid").click(function (e) {
                if (opts.singleSelect) return;//单选不管
                if (opts.cascadeCheck || opts.deepCascadeCheck) {
                    var id = $(this).parent().parent().parent().attr("node-id");
                    var status = false;
                    if ($(this).attr("checked")) status = true;
                    //级联选择父节点
                    selectParent(target, id, idField, status);
                    selectChildren(target, id, idField, opts.deepCascadeCheck, status);
                    /!**
                     * 级联选择父节点
                     * @param {Object} target
                     * @param {Object} id 节点ID
                     * @param {Object} status 节点状态，true:勾选，false:未勾选
                     * @return {TypeName}
                     *!/
                    function selectParent(target, id, idField, status) {
                        var parent = target.treegrid('getParent', id);
                        if (parent) {
                            var parentId = parent[idField];
                            if (status)
                                target.treegrid('select', parentId);
                            else
                                target.treegrid('unselect', parentId);
                            selectParent(target, parentId, idField, status);
                        }
                    }

                    /!**
                     * 级联选择子节点
                     * @param {Object} target
                     * @param {Object} id 节点ID
                     * @param {Object} deepCascade 是否深度级联
                     * @param {Object} status 节点状态，true:勾选，false:未勾选
                     * @return {TypeName}
                     *!/
                    function selectChildren(target, id, idField, deepCascade, status) {
                        //深度级联时先展开节点
                        if (status && deepCascade)
                            target.treegrid('expand', id);
                        //根据ID获取下层孩子节点
                        var children = target.treegrid('getChildren', id);
                        for (var i = 0; i < children.length; i++) {
                            var childId = children[i][idField];
                            if (status)
                                target.treegrid('select', childId);
                            else
                                target.treegrid('unselect', childId);
                            selectChildren(target, childId, idField, deepCascade, status);//递归选择子节点
                        }
                    }
                }
                e.stopPropagation();//停止事件传播
            });
        }
    });*/

})(jQuery);;(function($){
	
	$.fn.myWindow = function(options) {
	    var defaults = {
	        width: 500,             //宽度
	        height: 400,            //高度
	        iconCls: '',            //图标class
	        collapsible: false,     //折叠
	        minimizable: false,     //最小化
	        maximizable: false,     //最大化
	        resizable: false,       //改变窗口大小
	        title: '窗口标题',         //窗口标题
	        modal: true,            //模态    
	        submit: function () {
	            alert('写入执行的代码。');
	        },
	        html: ''
	    }
	    
	    var options = $.extend(defaults,options);
	    var html = options.html;
	    $('#w').window({title:options.title,width:options.width,height:options.height,content:buildWindowContent(html,options.submit),
	        collapsible:options.collapsible,minimizable:options.minimizable,maximizable:options.maximizable,
	        modal:options.modal,iconCls:options.iconCls
	    }).window('open');
	    
	    function buildWindowContent(contentHTML,fn){
	        var centerDIV = $('<div region="center" border="false" style="padding:5px;"></div>').html(contentHTML);
	
	        $('<div class="easyui-layout" fit="true"></div>')
	        .append(centerDIV)
	        .append('<div region="south" border="false" style="padding-top:5px;height:40px; overflow:hidden; text-align:center;background:#fafafa;border-top:#eee 1px solid;">  <a iconCls="icon-ok">确定</a><a iconCls="icon-cancel">取消</a></div>')
	        .appendTo($('#w').empty())
	        .layout();
	
	        $('.easyui-layout a[iconCls]').linkbutton();
	
	        $('a[iconCls="icon-cancel"]').click(function(){
	            $('#w').window('close');
	        });
	
	        $('a[iconCls="icon-ok"]').unbind('click').click(fn);
	    }
	
	}
})(jQuery);;/*global jQuery: false, window: false */
"use strict";

/*
 * Original code (c) 2010 Nick Galbreath
 * http://code.google.com/p/stringencoders/source/browse/#svn/trunk/javascript
 *
 * jQuery port (c) 2010 Carlo Zottmann
 * http://github.com/carlo/jquery-base64
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */

/* base64 encode/decode compatible with window.btoa/atob
 *
 * window.atob/btoa is a Firefox extension to convert binary data (the "b")
 * to base64 (ascii, the "a").
 *
 * It is also found in Safari and Chrome.  It is not available in IE.
 *
 * if (!window.btoa) window.btoa = $.base64.encode
 * if (!window.atob) window.atob = $.base64.decode
 *
 * The original spec's for atob/btoa are a bit lacking
 * https://developer.mozilla.org/en/DOM/window.atob
 * https://developer.mozilla.org/en/DOM/window.btoa
 *
 * window.btoa and $.base64.encode takes a string where charCodeAt is [0,255]
 * If any character is not [0,255], then an exception is thrown.
 *
 * window.atob and $.base64.decode take a base64-encoded string
 * If the input length is not a multiple of 4, or contains invalid characters
 *   then an exception is thrown.
 */

jQuery.base64 = (function ($) {

    var _PADCHAR = "=",
        _ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
        _VERSION = "1.0";


    function _getbyte64(s, i) {
        // This is oddly fast, except on Chrome/V8.
        // Minimal or no improvement in performance by using a
        // object with properties mapping chars to value (eg. 'A': 0)

        var idx = _ALPHA.indexOf(s.charAt(i));

        if (idx === -1) {
            throw "Cannot decode base64";
        }

        return idx;
    }


    function _decode(s) {
        var pads = 0,
            i,
            b10,
            imax = s.length,
            x = [];

        s = String(s);

        if (imax === 0) {
            return s;
        }

        if (imax % 4 !== 0) {
            throw "Cannot decode base64";
        }

        if (s.charAt(imax - 1) === _PADCHAR) {
            pads = 1;

            if (s.charAt(imax - 2) === _PADCHAR) {
                pads = 2;
            }

            // either way, we want to ignore this last block
            imax -= 4;
        }

        for (i = 0; i < imax; i += 4) {
            b10 = ( _getbyte64(s, i) << 18 ) | ( _getbyte64(s, i + 1) << 12 ) | ( _getbyte64(s, i + 2) << 6 ) | _getbyte64(s, i + 3);
            x.push(String.fromCharCode(b10 >> 16, ( b10 >> 8 ) & 0xff, b10 & 0xff));
        }

        switch (pads) {
            case 1:
                b10 = ( _getbyte64(s, i) << 18 ) | ( _getbyte64(s, i + 1) << 12 ) | ( _getbyte64(s, i + 2) << 6 );
                x.push(String.fromCharCode(b10 >> 16, ( b10 >> 8 ) & 0xff));
                break;

            case 2:
                b10 = ( _getbyte64(s, i) << 18) | ( _getbyte64(s, i + 1) << 12 );
                x.push(String.fromCharCode(b10 >> 16));
                break;
        }

        return x.join("");
    }


    function _getbyte(s, i) {
        var x = s.charCodeAt(i);

        if (x > 255) {
            throw "INVALID_CHARACTER_ERR: DOM Exception 5";
        }

        return x;
    }


    function _encode(s) {
        if (arguments.length !== 1) {
            throw "SyntaxError: exactly one argument required";
        }

        s = String(s);

        var i,
            b10,
            x = [],
            imax = s.length - s.length % 3;

        if (s.length === 0) {
            return s;
        }

        for (i = 0; i < imax; i += 3) {
            b10 = ( _getbyte(s, i) << 16 ) | ( _getbyte(s, i + 1) << 8 ) | _getbyte(s, i + 2);
            x.push(_ALPHA.charAt(b10 >> 18));
            x.push(_ALPHA.charAt(( b10 >> 12 ) & 0x3F));
            x.push(_ALPHA.charAt(( b10 >> 6 ) & 0x3f));
            x.push(_ALPHA.charAt(b10 & 0x3f));
        }

        switch (s.length - imax) {
            case 1:
                b10 = _getbyte(s, i) << 16;
                x.push(_ALPHA.charAt(b10 >> 18) + _ALPHA.charAt(( b10 >> 12 ) & 0x3F) + _PADCHAR + _PADCHAR);
                break;

            case 2:
                b10 = ( _getbyte(s, i) << 16 ) | ( _getbyte(s, i + 1) << 8 );
                x.push(_ALPHA.charAt(b10 >> 18) + _ALPHA.charAt(( b10 >> 12 ) & 0x3F) + _ALPHA.charAt(( b10 >> 6 ) & 0x3f) + _PADCHAR);
                break;
        }

        return x.join("");
    }


    return {
        decode: _decode,
        encode: _encode,
        VERSION: _VERSION
    };

}(jQuery));