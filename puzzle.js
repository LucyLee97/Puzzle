;window.onload=function(){
    var operate=$$("operate");
    var sel=operate.children[0];
    var btn=operate.children[1];
    var imgs=$$("imgs")
    var step=operate.children[2];
    
    function $$(idName){
        return document.getElementById(idName);
    }
    
    var level,data, steps=0;
    
    function load(level){
        if(level==3){
            imgs.innerHTML=(data+"").replace(/(\d+)\D*/g,'<div><img src="img/3/$1.jpg"/> </div>');
        }else{
            imgs.innerHTML=(data+"").replace(/(\d+)\D*/g,'<div><img src="img/4/$1.jpg"/> </div>');
        }
        imgs.children[data.indexOf(Math.pow(level,2))].innerHTML="";
    }
    
    function imgsStyle(level){
        if(level==3){
            imgs.setAttribute("style",'width:240px;height:240px;display:block');
        }else {
            imgs.setAttribute("style",'width:320px;height:320px;display:block');
        }
        //imgs.setAttribute("style",'width:${80*level}px;height:${80*level}px;display:block');
    }
    
    function getStyle(ele,attr){
        var res =null;
        if(ele.currentStyle){
            res=ele.currentStyle[attr];
        }
        else{
            res=window.getComputedStyle(ele,null)[attr];
        }
        return parseFloat(res);
    }
    //隨機數字
    function randData(n){
        var randDigits=[];
        var max=Math.pow(n,2)-1;
        while(randDigits.length <max){
            var rd=Math.floor(Math.random()*max +1);
            if(randDigits.indexOf(rd)== -1){
                randDigits.push(rd);
            }
        }
        randDigits.push(max+1);
        return randDigits;
    }
    
    //拼圖完成時
    function rightData(level){
        var str="";
        for(var i=1,len=Math.pow(level,2);i<=len;i++){
            str+=i;
        }
        return str;
    }
    
    btn.onclick=function(){
        level=parseInt(sel.value);
        imgsStyle(level);
        data =randData(level);
        load(level);
        document.onkeyup=function(e){
            var evt=e||window.event;
            var c = evt.keyCode;
            //找空白方格的位置
            var nbox=data.indexOf(Math.pow(level,2));
            if(c>=37 && c<=40){
                step.innerHTML=++steps;
            }
;            //左37上38右39下40
            switch(true){
                case c==37:
                    var repla=nbox+1;
                    if(nbox%level==level-1) return;
                    data[nbox]=data[repla];
                    data[repla]=Math.pow(level,2);
                    load(level); 
                    break;
                case c==38:
                    var repla=nbox+level;
                    if(repla>data.length-1) return;
                    data[nbox]=data[repla];
                    data[repla]=Math.pow(level,2);
                    load(level);
                    break;
                case c==39:
                    var repla=nbox-1;
                    if(nbox%level==0) return;
                    data[nbox]=data[repla];
                    data[repla]=Math.pow(level,2);
                    load(level);
                    break;
                case c==40:
                    var repla=nbox-level;
                    if(repla<0) return;
                    data[nbox]=data[repla];
                    data[repla]=Math.pow(level,2);
                    load(level);
                    break;
            }
            if(data.join("") == rightData(level)){
                alert("GOOD JOB!!");
            }
        }
    }
}
