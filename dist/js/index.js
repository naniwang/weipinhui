$(function(){
    //轮播图
    var i=0;
    var timer=setInterval(autoPlay,3000);
    function autoPlay(){
        $(".swiper").find("li").eq(i).fadeIn(1000).siblings().fadeOut(1000);
        $(".bot").stop().animate({"left":190+i*198+"px"},400);
        i++;
        if(i>=$(".swiper").find("li").length){
            i=0;
        }
    }
    autoPlay();
    //显示左右箭头
    $(".banner-con").mouseenter(function(){
        $(this).find("span").css("opacity","0.5");
        clearInterval(timer);
    }).mouseleave(function(){
        $(this).find("span").css("opacity","0");
        timer=setInterval(autoPlay,2000);
    })
    //点击右箭头
    $(".next").click(function(){
        i=i+1;
        if(i==$(".swiper").find("li").length){
            i=0;
        }
        console.log(i)
        autoPlay();
    })
    //点击左箭头
    $(".prev").click(function(){
        i=i-1;
        if(i==-1){
            i=$(".swiper").find("li").length-1;
        }
        console.log(i)
        autoPlay();
    })
    //移到某个角标上显示对应的图片
    $(".triggle").find("li").mouseenter(function(){
        i=$(this).index();
        autoPlay();
    })

    //ajax请求列表图
    $.ajax({
        type: "get",
        url: "http://jx.xuzhixiang.top/ap/api/productlist.php",
        data: {uid:1153},
        dataType: "json",
        success: function (data) {
            var str="";
            data.data.map(function(item,i){
                str+=`
                    <li>
                        <a href="detail.html?id=${item.pid}">
                            <img src="${item.pimg}"/>
                            <div class="desc">
                                <span class="dazhe"><strong>0.8</strong>折起</span>
                                <span class="pdesc">${item.pdesc}</span>
                                <p><i class="iconfont icon-zuji"></i>剩3天</p>
                            </div>
                        </a>
                        <span class="shoucang"><i class="iconfont icon-guanzhu"></i>收藏品牌</span>
                    </li>
                `
            })
            $(".nvzhuang-pic-list").html(str);
            $(".xiebao-pic-list").html(str);
            $(".nanzhuang-pic-list").html(str);
            $(".yundong-pic-list").html(str);
            $(".shipin-pic-list").html(str);
        }
    });
    //楼梯
    $(".wrap").find("a").eq(0).addClass("active1");
    $(window).scroll(function(){
        var flag=true;
        var sTop=$(window).scrollTop();
        if(sTop>$(".floor1").offset().top){
            $(".index-nav-wrap").css({"position":"fixed","top":"35%"});
        }else{
            $(".index-nav-wrap").css({"position":"absolute","top":"150px"});
        }

        if(flag){
            $(".temai-con").each(function(){
                if(sTop>=$(this).offset().top-$(this).outerHeight()/5){
                    $(".wrap").find("a").eq($(this).index()-1).addClass("active1").siblings().removeClass("active1");
                }
            })
        }
    })

    $(".wrap a").each(function(){
        $(this).click(function(){
            flag=false;
            $("html,body").animate({"scrollTop":$(".temai-con").eq($(this).index()).offset().top},0,function(){
                flag=true;
            })
            $(this).addClass("active1").siblings().removeClass("active1");
        })
    })
    
})
