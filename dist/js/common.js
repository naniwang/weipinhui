$(function(){
    //点击地点显示省份和城市并添加样式
    $(".area ul li:last-child").addClass("active");
    $(".area ul li").click(function(){
        $(this).addClass("active").siblings().removeClass("active");
    })
    $(".addr span").click(function(){
        $(this).addClass("bac");
        $(".addrHide").show();
    })
    $(".hide").click(function(){
        $(".addrHide").hide();
        $(".addr span").removeClass("bac");
    })
    // 点击搜索框显示相应的内容
    $("#search").click(function(event){
        event.stopPropagation();
        $(".search-helper").show();
    })
    $(document).click(function(e){
        var e=e||event;
        var tg=$(".search,.search-helper");
        if(!tg.is(e.target)&&tg.has(e.target).length===0){
            $(".search-helper").hide();
        }
    })
    //鼠标移到商品分类上，显示对应的商品分类
    $(".fenlei,.menu-list").hover(function(){
        $(".menu-list").stop().animate({"height":"495px"},300);
    },function(){
        $(".menu-list").stop().animate({"height":"0"});
    })
    //滚动条滚动到一定距离，导航栏顶部悬浮
    $(window).scroll(function(){
        var ST=$(window).scrollTop();
        if(ST>$(".banner").offset().top){
            $(".main-nav").css({"position":"fixed","top":"0","left":"0","zIndex":"20","box-shadow":"0 1px 3px 0 #a7a7a7"});
        }else{
            console.log(333)
            $(".main-nav").css({"position":"relative","box-shadow":"0"});
        }
    })
    //回到顶部
    $(".goTop").click(function(){
        $(window).scrollTop()=0;
    })
    //购物袋中的商品数量
    $(".sumNum").html(localStorage.getItem("sumNum"));
})