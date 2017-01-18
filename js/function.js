window.onload = function(){
    // 搜索框显示
    soform();
    function soform(){
        var oSoform = common.$('#soform');//搜索框
        var oSoform_span = common.$('span',oSoform)[0];
        oSoform_span.onclick = function(){
            if(oSoform.className === ''){
                oSoform.className = 'open';
            }else{
                oSoform.className = '';
            }
        }
    }
    
    // 鼠标经过。对应显示的元素显示。
    mouseEvent('#hnavmore','#hnavmore_ul');
    mouseEvent('#mnnav','#mnnav_div');
    mouseEvent('#soowner','ul');
    mouseEvent('#sofield','ul');
    mouseEvent('#sonew','ul');
    function mouseEvent(obj,subobj){
        var obj = common.$(obj);
        if(subobj.charAt() === '#'){ //判断传的第二个参数是否是id
            var subobj = common.$(subobj); 
        }else{
            var subobj = common.$(subobj,obj)[0];//如果第二个参数不是id,那么获取第一个
        }
        obj.onmouseover = function(){
            subobj.style.display = 'block';
        }
        obj.onmouseout = function(){
            subobj.style.display = 'none';
        }
    }

    //登录
    login();
    function login(){
        var oLogin = common.$('#loginbtn');
        var oMask = common.$('#mask');
        var oUserLogin = common.$('#userLogin');
        var oClbtn = common.$('#clbtn');
        oLogin.onclick = function(){
            oMask.style.display = 'block';
            common.doMove(oUserLogin,'top',30,'0',function(){
                common.shake(oUserLogin,'top',20);
            });
        }

        oClbtn.onclick = document.ondblclick = function(){
            common.doMove(oUserLogin,'top',30,'-550');
            oMask.style.display = 'none';
        }
    }

    //倒计时

    countdown(2016,12,20,0,0,0);
    //传递的时间是数字的话   月份要减1
    function countdown(year,month,day,hour,minute,second){
        var oBanner = common.$('#banner');
        if(!oBanner){
            return;
        }
        var future = new Date(year,month,day,hour,minute,second);
        
        setInterval(function(){
            var now = new Date();
            var differ = future.getTime() - now.getTime();
            var differ = differ/1000; 
            var day = Math.floor(differ/86400);
            var hour = Math.floor(differ%86400/3600);
            var minute = Math.floor(differ%3600/60);
            var second = Math.floor(differ%60);
            var oDiv = common.$('div',common.$('#bannerbody'))[0];
            var aSpan = common.$('span',oDiv);
            aSpan[0].innerHTML = addZero(day);
            aSpan[2].innerHTML = addZero(hour);
            aSpan[4].innerHTML = addZero(minute);
            aSpan[6].innerHTML = addZero(second);
        },30);

        function addZero(x){ //单个数前面加0
            return x < 10 ?  '0'+x : x ;
        }
    }
    

    //注册
    reg();
    function reg(){
        var oMuregbtn = common.$('#muregbtn'),
            oQuickReg = common.$('#quickReg'),
            oRegbox = common.$('#regbox'),
            oBackBtn = common.$('a',oRegbox)[0],
            oUserLogin = common.$('#userLogin'),
            oMask = common.$('#mask'),
            oAgent = window.navigator.userAgent;

            oRegbox.style.left = view().x +'px';

            if(oAgent.indexOf('MSIE 6.0') !== -1){ //ie6未测试
                oRegbox.style.position = 'absolute';
                oRegbox.style.width = view().x +'px';
                oRegbox.style.height = view().y +'px';
            }
            
        oMuregbtn.onclick = function(){
            oRegbox.style.display = 'block';
            common.doMove(oRegbox,'left',60,0);
        }

        //点击登录时如果未注册，点击注册。
        if(oQuickReg){
            oQuickReg.onclick = function(){
                oUserLogin.style.display = 'none';
                oMask.style.display = 'none';
                oRegbox.style.display = 'block';
                common.doMove(oRegbox,'left',60,0);
            }
        }

        oBackBtn.onclick = function(){
            common.doMove(oRegbox,'left',60,view().x);
        }

        function view(){
            return {
                "x":document.documentElement.clientWidth,
                "y":document.documentElement.clientHeight
            }
        }
    }

    
    //当页面滚动时，二级导航跟随顶部固定
    follows();
    function follows(){
        var  oBanner = common.$('#banner');
        if(!oBanner) return;
        var oSoption = common.$('#sooptions'),
             oHeader = common.$('#header'),
             oBannerH = oBanner.offsetHeight,
             oHeaderH = oHeader.offsetHeight;

        window.onscroll = function(){
            if( common.scrollT() > oBannerH){
                oSoption.style.position  = 'fixed';
                oSoption.style.top = oHeaderH +'px';
            }else{
                oSoption.style.position  = 'relative';
                oSoption.style.top = (oHeaderH+oBanner) +'px';
            }
        }
    }

    //content里面鼠标放到图片上面，显示图片标题
    showTitle();
    function showTitle(){
        var oCon = common.$('#content'),
            aDiv = common.$('.citem',oCon);

        for(var i=0; i<aDiv.length; i++){
            var oH4 = common.$('h4',aDiv[i])[0];
            if(oH4){
                show(aDiv[i],oH4);
            }
        } 
        function show(obj,subobj){
            obj.onmouseover = function(){
                subobj.style.top = '140px';
            }
            obj.onmouseout = function(){ 
                 subobj.style.top = '180px';                
            }
        }
    }

    //显示提示层
    showPrompt();
    function showPrompt(){
        var oCon = common.$('#content');
        if(!oCon) oCon = common.$('#listcontent');
        var aCitemfoot = common.$('.citemfoot',oCon);
        var oPromptBox = common.$('#promptbox');
        if(!oPromptBox) return;
        var oPrompt = common.$('#prompt',oPromptBox);
        var oPromptBot = common.$('i',oPromptBox)[0];

        for(var i=0; i<aCitemfoot.length; i++){
            aCitemfoot[i].index = i;
            aCitemfoot[i].onmouseover = function(){
                oPromptBox.style.display = 'block';
                var oSpan = common.$('span',aCitemfoot[this.index])[0];
                showt(aCitemfoot[this.index],oSpan);
            } 
            aCitemfoot[i].onmouseout = function(){
                oPromptBox.style.display = 'none';
            }
            oPromptBox.onmouseover = function(){
                this.style.display = 'block';
            }
             oPromptBox.onmouseout = function(){
                this.style.display = 'none';
            }
            
        }

        function showt(obj,subobj){           
            var objH = obj.offsetHeight;
            var objW = obj.offsetWidth;
            var oProH = oPrompt.offsetHeight;
            var oProW = oPrompt.offsetWidth;
            var objLeft = common.offset(obj).x ;
            var objTop = common.offset(obj).y ;
            var conLeft = common.offset(oCon).x; //提示框不能超越的父级的距离浏览器的距离
            var conTop = common.offset(oCon).y;
            var conW = oCon.offsetWidth ;
            var conH = oCon.offsetHeight;

            var oSpanLeft = common.offset(subobj).x;
            
            var objPaddL = parseFloat(common.getStyle(obj,'paddingLeft'));
            var objPaddT = parseFloat(common.getStyle(obj,'paddingTop'));

            var l = objLeft + objPaddL;
            var t = objTop + objH ;
           
            //三角形显示的位置
            oPromptBot.style.left = oSpanLeft  + 'px';
            oPromptBot.style.top = t - oPromptBot.offsetHeight +'px';
            oPromptBot.style.transform = 'rotate(180deg)';

            //提示框显示的位置
            if(objLeft + oProW + objPaddL > conW + conLeft ){ //如果超出大父级宽度。向右边移动
                l = conW + conLeft - oProW ;
            }
            
            if( objTop - common.scrollT() + oProH + objH > common.view().x ){
                
                 t = t - oProH - objH + objPaddT;
                 oPromptBot.style.transform = 'rotate(360deg)';
                 oPromptBot.style.top = t + oProH + 'px';
            }

            oPrompt.style.left = l +'px';
            oPrompt.style.top =  t +'px';

        }
    }
    
    //首图 无缝滚动
    seamlessScroll();
    function seamlessScroll(){
        var citemFirst = common.$('#citemfirst');
        var oBox = common.$('.citemfirstbox',citemFirst)[0];
        var oCircle = common.$('.circle',citemFirst)[0];
        var oPrev = common.$('.prev',citemFirst)[0];
        var oNext = common.$('.next',citemFirst)[0];
        var aLi1 = common.$('li',oBox);
        var aLi2 = common.$('li',oCircle);
        var len1 = aLi1.length;
        var len2 = aLi2.length;
        var n = 0;
        var w = 580;
        var timer = null;
        var onOff = false;
        
        var oLast = common.last(oBox).cloneNode(true);
        var oFirst = common.first(oBox).cloneNode(true);
        oBox.appendChild(oFirst);
        oBox.insertBefore(oLast,common.first(oBox));

        oBox.style.width = aLi1.length * w +'px';
        oBox.style.left = - w +'px';
        play();

        citemFirst.onmouseover = function(){
            oPrev.style.display = 'inline-block';
            oNext.style.display = 'inline-block';
            clearInterval(timer);
            timer = null;
        }

        citemFirst.onmouseout = function(){
            oPrev.style.display = 'none';
            oNext.style.display = 'none';
            play();
        }

        oPrev.onclick = function(){
            if (onOff) return;
            onOff = true;
            n --;
            common.Move(oBox,{"left":-(n+1)*w},500,function(){
                    if( n < 0 ){
                        oBox.style.left = -w*len1 +'px';
                        n = len1 - 1;
                    }
                    fn();
                    onOff = false;
                }
            );
        }

        oNext.onclick = function(){
            if (onOff) return;
            onOff = true;
            n ++;
            common.Move(oBox,{"left":-(n+1)*w},500,function(){
                    if( n > len1 - 1){
                        oBox.style.left = -w +'px';
                        n = 0;
                    }
                    fn();
                    onOff = false;
                }
            );
        }

        function play(){
             timer = setInterval(function(){
                n++;
                common.Move(oBox,{"left":-(n+1)*w},500,function(){
                    if( n > len1 - 1){
                        n = 0;
                        oBox.style.left = - w +'px';
                    }
                    fn();
                });
            },2100);
        }

        function fn(){
            for(var i=0; i<len2; i++){
                aLi2[i].className = '';
            }
            aLi2[n].className = 'active';
        }

        for(var i=0; i<aLi2.length; i++){
            aLi2[i].index = i;
            aLi2[i].onclick = function(){
                n = this.index;
                fn();
                common.Move(oBox,{"left":-(n+1)*w},500);
            }
        }
       
    };

    //拖拽图片 
    Imgmove();
    function Imgmove(){
        var oPage = common.$('#found');
        if(!oPage) return;
        var oCon = common.$('#listcontent',oPage);
        var aCitem = common.$('.citem',oCon);
        var arr = [];
        var zIndex = 1;

        for(var i=0; i<aCitem.length; i++){
            arr.push({left:aCitem[i].offsetLeft,top:aCitem[i].offsetTop});
        }

        for(var j=0; j<aCitem.length; j++){
            aCitem[j].style.cssText = 'position:absolute; left:'+ arr[j].left +'px; top:'+ arr[j].top +'px;';
            aCitem[j].index = j;
            fn(aCitem[j]);
        }

        function fn(obj){
            obj.onmousedown = function(ev){
                clearInterval(obj.timer);
                obj.timer = null;
                zIndex++;
                obj.style.zIndex = zIndex;

                var that = this;
                var e = ev||event;
                var disx = e.clientX - this.offsetLeft ;
                var disy = e.clientY - this.offsetTop ;
                var obj2 = null;

                if(e.preventDefault){
                    e.preventDefault();
                }
                if(obj.setCapture){
                    obj.setCapture();
                }


         document.onmousemove = function(ev){

                var arr1 = [];
                var nearObj = null;
                var e = ev||event;
                t = e.clientY - disy;
                l = e.clientX - disx;

                if( t < 0){
                    t =0;
                }
                if( l < 0){
                    l = 0;
                }
                if( t > obj.parentNode.clientHeight - obj.offsetHeight){
                    t = obj.parentNode.clientHeight - obj.offsetHeight;
                }
                if( l > obj.parentNode.clientWidth ){
                    l = obj.parentNode.clientWidth ;
                }

                obj.style.top = t + 'px';
                obj.style.left = l + 'px';

                for(var x =0; x < aCitem.length; x++){
                    aCitem[x].style.margin = 0;
                    aCitem[x].className = '';
                    if(aCitem[x] !== obj){
                        if(common.pengshang(obj,aCitem[x])){
                            arr1.push(aCitem[x]);
                        }
                    }
                }

                var maxNum = 9999;                  

                for(var y=0; y<arr1.length; y++){ 
                    var arrl = obj.offsetLeft - arr1[y].offsetLeft;
                    var arrt = obj.offsetTop - arr1[y].offsetTop;
                    var s = Math.sqrt(arrl*arrl + arrt*arrt);
                    if( maxNum > s ) {
                        maxNum = s;
                        nearObj = arr1[y];
                    }
                }

                if(nearObj){
                    nearObj.className = 'near'; 
                    nearObj.style.margin = "-2px 0 0 -2px";
                }
                obj2 = nearObj;
            }

                document.onmouseup = function(){
                    document.onmousemove = null;
                    document.onmouseup = null;
                    
                    if(obj2){
                        obj2.style.zIndex = zIndex;
                        common.startMove(obj,{"top":arr[obj2.index].top,"left":arr[obj2.index].left});
                        common.startMove(obj2,{"top":arr[obj.index].top,"left":arr[obj.index].left});
                        
                        var temp = obj.index;
                        obj.index = obj2.index;
                        obj2.index = temp;
                        obj2.className = '';
                        obj2.style.margin = 0;
                    }else{
                        common.startMove(obj,{"top":arr[obj.index].top,"left":arr[obj.index].left});
                    }

                    if(obj.releaseCapture){
                        obj.releaseCapture();
                    }
                }   
            }
        }
    }

    //回到顶部
    window.onscroll = goTop;
    function goTop(){
        if(common.scrollT() > 20 ){ 
            var oGoTop = common.$("#goTop");
            oGoTop.style.display = 'block';
            oGoTop.onclick = function(){
                document.documentElement.scrollTop = 0;
                document.body.scrollTop = 0;
            }
        }else{
            var oGoTop = common.$("#goTop");
            oGoTop.style.display = 'none';
        }
    }


}
