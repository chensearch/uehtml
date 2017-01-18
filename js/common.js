var common = {
	$:function $( selector,content ){
		var first = selector.charAt(),
			arr = [],content = content || document;

		if( first === "#" ){ //id
			return document.getElementById( selector.slice(1) );
		}else if( first === "." ){  //class
			var allEle = content.getElementsByTagName("*");//找到所有的标签
			for( var i = 0; i < allEle.length; i++ ){	
				var allClassName = allEle[i].className.split(" ");
				for( var j = 0; j < allClassName.length; j++ ){
					if( selector.slice(1) === allClassName[j] ){
						arr.push( allEle[i] );
						break;
					}
				};
			}
			return arr;
		}else{
			return content.getElementsByTagName( selector );
		}
	},

	getStyle:function ( obj,attr ){
		return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj)[attr];		
	},

	doMove:function (obj,attr,speed,target,callBack){
		if( obj.timer ) {return;}
		//当前元素所处的初始位置
		var l = parseFloat( common.getStyle( obj,attr ) );
		speed = l > target ? -Math.abs(speed) : Math.abs(speed);

		obj.timer = setInterval(function (){
			if( speed > 0 &&  l >= target || speed < 0 && l <= target){
				l = target;
				obj.style[attr] = l + "px";
				clearInterval( obj.timer );
				obj.timer = null;
				if( typeof callBack === "function" ) callBack();
			}else{
				l += speed;
				obj.style[attr] = l + "px";
			};
		},30);

	},

	shake:function ( obj,attr,n,callBack ){
		if( obj.timer ) return;
		var arr = [],m = 0,
			l = parseFloat(common.getStyle(obj,attr));
		for( var i = n; i >= 0 ; i-=2 ){
			arr.push( -i,i );
		};
		arr.push( 0 ); //数组的最后一定要归为0
		obj.timer = setInterval(function (){
			obj.style[attr] = l + arr[m] + "px";
			m++;
			if( m > arr.length - 1 ){
				clearInterval( obj.timer );
				obj.timer = null;
				callBack&&callBack();
			}
		},30);
	},

	offset:function ( obj ){
            var l = 0,t = 0;

            var border_l_w = parseFloat(common.getStyle(obj,"borderLeftWidth"));
            var border_t_w = parseFloat(common.getStyle(obj,"borderTopWidth"));

            border_l_w = isNaN( border_l_w ) ? 0 : border_l_w;
            border_t_w = isNaN( border_t_w ) ? 0 : border_t_w;

            while( obj ){

                var border_l_w2 = parseFloat(common.getStyle(obj,"borderLeftWidth"));
                var border_t_w2 = parseFloat(common.getStyle(obj,"borderTopWidth"));

                border_l_w2 = isNaN( border_l_w2) ? 0 : border_l_w2;
                border_t_w2 = isNaN( border_t_w2 ) ? 0 : border_t_w2;

                l += obj.offsetLeft + border_l_w2;
                t += obj.offsetTop + border_t_w2;
                obj = obj.offsetParent;
            };

            return {
                x: l-border_l_w,
                y: t-border_t_w
            }
        },

    scrollT:function (){
	        return document.body.scrollTop || document.documentElement.scrollTop;
	    },

    view:function (){
            return {
                x:document.documentElement.clientHeight,
                y:document.documentElement.clientWidth
            }
        },

    first:function ( obj ){
                var firstChild = obj.firstElementChild || obj.firstChild;

                if( !firstChild || firstChild.nodeType !== 1 ) {
                    return null;
                }else{
                    return firstChild;
                }
            },

    pengshang:function ( obj1,obj2 ){

			var obj1L = obj1.offsetLeft;
			var obj1T = obj1.offsetTop;
			var obj1W = obj1.offsetWidth;
			var obj1H = obj1.offsetHeight;

			var obj2L = obj2.offsetLeft;
			var obj2T = obj2.offsetTop;
			var obj2W = obj2.offsetWidth;
			var obj2H = obj2.offsetHeight;

			//如果没有碰上 return false
			if( obj1L+ obj1W < obj2L || obj1L > obj2L + obj2W || obj1T + obj1H < obj2T || obj1T > obj2T + obj2H){

				return false;

			}else{  //如果碰上了，return true
				return true;
			}
		},

	startMove:function (obj, json, fn)
	{	
		
		clearInterval(obj.timer);
		obj.timer=setInterval(function (){
			var bStop=true;		
			for(var attr in json)
			{
				var iCur=0;
				
				if(attr=='opacity')
				{
					iCur=parseInt(parseFloat(common.getStyle(obj, attr))*100);
				}
				else
				{
					iCur=parseInt(common.getStyle(obj, attr));
				}
				var iSpeed=(json[attr]-iCur)/8;
				iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);
				
				if(iCur!=json[attr])
				{
					bStop=false;
				}
				
				if(attr=='opacity')
				{
					obj.style.filter='alpha(opacity:'+(iCur+iSpeed)+')';
					obj.style.opacity=(iCur+iSpeed)/100;
				}
				else
				{
					obj.style[attr]=iCur+iSpeed+'px';
				}
			}
			
			if(bStop)
			{
				clearInterval(obj.timer);
				obj.timer = null;
				fn &&　fn();
			}
		}, 30)
	},
	/*
        obj: 元素
        json: 运动的属性 { left：500, width:300 }
        d: 持续时间
        fx： 运动形式 默认是 "linear"  （可以传也可以省略，省略的话运动形式为"linear"）
        callBack: 执行完动画回调
    */
    Move:function ( obj,json,d,fx,callBack ){

        if( obj.timer ) return;

        var startTime = new Date().getTime();

        if( typeof fx === "function" ){
            callBack = fx;
            fx = "linear";
        };

        fx = fx || "linear";

        var attrValue = {};  

        for( var attr in json ){
            attrValue[attr] = {};

            attrValue[attr].b = parseFloat(  common.getStyle( obj,attr ) );

            attrValue[attr].c = json[attr] - attrValue[attr].b; 
        };
        obj.timer = setInterval(function (){

            var currentTime = new Date().getTime();

            var t = currentTime - startTime;

            if( t > d ){
                t = d;
            };
            for( var attr2 in attrValue ){

                var v = Tween[fx]( t, attrValue[attr2].b, attrValue[attr2].c,d );

                if( attr2 === "opacity" ){
                    obj.style.opacity = v;
                    obj.style.filter = "alpha(opacity="+ (v*100) +")"
                }else{
                    obj.style[attr2] = v + "px";
                }    

            };

            if( t === d ){
                clearInterval( obj.timer );
                obj.timer = null;
                callBack && callBack();
            }

        },16);
    },

    last:function ( obj ){
        var lastChild = obj.lastElementChild || obj.lastChild;

        //alert( firstChild )
        if( !lastChild || lastChild.nodeType !== 1 ) {
            return null;
        }else{
            return lastChild;
        }
    }

	
}