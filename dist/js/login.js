$(function(){
	//给扫码登录和账号登录添加类名
    $(".toubu h3:first-of-type").addClass("saoma");
	$(".toubu h3").click(function(){
		$(this).addClass("saoma").siblings().removeClass("saoma");
	})
	//默认显示扫码登录界面
	$(".toubu h3:first-of-type").click(function(){
		$(".scan-login").show();
		$(".pc-login").hide();
		$(".message-login").hide();
	})
	//点击账号登录，显示其界面
	$(".toubu h3:last-of-type").click(function(){
		$(".pc-login").show();
		$(".scan-login").hide();
		$(".message-login").hide();
	})
	//扫码登录界面鼠标移入移出的动画效果
	$(".scan-box").mouseenter(function(){
		$(".erweima").stop().animate({"left":"-76px"},500,function(){
			$(".saomatu").show();
		})
	}).mouseleave(function(){
			$(".saomatu").hide();
			$(".erweima").stop().animate({"left":0},500);
	})
	//验证手机号
	var flagPhone=null;
    $("#txt").blur(function(){
        var reg=/^1(3|4|5|5|7|8)\d{9}$/;
        if($(this).val()){
            if(reg.test($("#txt").val())){
                flagPhone=true;
            }else{ 
                $("#txt").val("请输入正确的11位手机号").css({"color":"red","fontSize":"12px"});
                flagPhone=false;
            }
        }else{
            $("#txt").val("手机号不能为空").css({"color":"red","fontSize":"12px"});
            flagPhone=false;
        }
    })
    $("#txt").focus(function(){
        $("#txt").val("").css({"color":"#666","fontSize":"14px"});
	})
	//ajax请求登录接口
	$("#login-btn").click(function(){
		if(flagPhone){
			$.ajax({
				type: "get",
				url: "http://jx.xuzhixiang.top/ap/api/login.php",
				data: {username:$("#txt").val(),password:$("#pwd").val()},
				dataType: "json",
				success: function (data) {
					// console.log(data);
					if(data.code==1){
						localStorage.setItem("userID",data.data.id);
						location.href="index.html";
					}else{
						alert(data.msg);
					}
				}
			});
		}
	})
	$("#txt").val("");
	$("#pwd").val("");
})
