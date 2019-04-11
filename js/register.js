$(function(){
    function rand(min,max){
        return Math.round(Math.random()*(max-min)+min);
    }
    //生成随机验证码
    function getYzm(){
        var str="";
        for(var i=1; i<=6; i++){
            var tr=rand(48,102);
            if (tr>=58&&tr<=64||tr>=71&&tr<=96) {
                i--;
            }else{
                str+=String.fromCharCode(tr);
            }
        }
        return str;
    }
    $("#getYZM").html(getYzm());

//正则验证
    //ajax请求注册接口
    $("#regist").click(function(){
        if($("#select").prop("checked")==true){
            if(flagPhone && flagYZM && flagPWD && flagRepwd){
                $.ajax({
                    type: "get",
                    url: "http://jx.xuzhixiang.top/ap/api/reg.php",
                    data: {username:$("#phoneNum").val(),password:$("#pwd").val()},
                    dataType: "json",
                    success: function (data) {
                        console.log(data);
                        if(data.code==1){
                            location.href="login.html";
                        }
                    }
                })
            }else{
                alert("注册失败");
            }
        }else{
            alert("请同意各项条款");
        }
    })
    //验证手机号
    var flagPhone=null;
    $("#phoneNum").blur(function(){
        var reg=/^(13|15|17|18)\d{9}$/;
        if($(this).val()){
            if(reg.test($("#phoneNum").val())){
                $(".phoneTS").html("正确");
                flagPhone=true;
            }else{ 
                $(".phoneTS").html("请输入正确的11位手机号");
                flagPhone=false;
            }
        }else{
            $(".phoneTS").html("手机号不能为空");
            flagPhone=false;
        }
    })
    $("#phoneNum").focus(function(){
        $(".phoneTS").html("");
    })
    //验证验证码
    var flagYZM=null;
    $("#YZM").blur(function(){
        var yzm=$("#YZM").val();
        var getYZM=$("#getYZM").html();
        if(yzm==getYZM){
            $(".yzmTS").html("正确");
            flagYZM=true;
        }else{
            $(".yzmTS").html("验证码不正确");
            flagYZM=false;
        }
    })
    $("#YZM").focus(function(){
        $(".yzmTS").html("");
    })
    //验证密码
    var flagPWD=null;
    $("#pwd").blur(function(){
        var reg=/^[A-Za-z\d](\w|.){5,19}$/;
        if($(this).val()){
            if(reg.test($(this).val())){
                $(".pwdTS").html("正确");
                flagPWD=true;
            }else{
                $(".pwdTS").html("请输入由字母数字和符号组成的密码");
                flagPWD=false;
            }
        }else{
            $(".pwdTS").html("密码不能为空");
            flagPWD=false;
        }
    })
    $("#pwd").focus(function(){
        $(".pwdTS").html("");
    })
    //验证确认密码
    var flagRepwd=null;
    $("#rePwd").blur(function(){
        if($(this).val()==$("#pwd").val()){
            $(".qrpwdTS").html("正确");
            flagRepwd=true;
        }else{
            $(".qrpwdTS").html("密码不一致");
            flagRepwd=false;
        }
    })
    $("#rePwd").focus(function(){
        $(".qrpwdTS").html("");
    })
    
    
})
