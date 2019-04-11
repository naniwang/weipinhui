$(function(){
    //购物车商品展示
    $.ajax({
        type: "get",
        url: "http://jx.xuzhixiang.top/ap/api/cart-list.php",
        data: {id:1153},
        dataType: "json",
        success: function (data) {
            // console.log(data);
            var str="";
            data.data.map(function(item,i){
                str+=`
                    <li data-id="${item.pid}">
                        <div class="pro-desc">
                            <div class="imag">
                                <img src="${item.pimg}"/>
                                <div class="posit">即将告罄</div>
                            </div>
                            <div class="desc">
                                <h6>${item.pdesc}</h6>
                                <p>尺码：36</p>
                            </div>
                        </div>
                        <div class="pro-price">￥<strong class="perPrice">${item.pprice}</strong></div>
                        <div class="change-num">
                            <button class="minus">-</button>
                            <strong class="num">${item.pnum}</strong>
                            <button class="plus">+</button>
                        </div>
                        <div class="xiaoji">
                            ￥<strong class="sumPrice">${item.pprice*item.pnum}</strong>
                        </div>
                        <div class="shanchu"><a href="#" class="del">删除</a></div>
                    </li>
                `
            })
            $(".cart-prolist").html(str);
            getTotalprice()
            //点击加号
            var sumNum=0;
            for(var i=0; i<$(".plus").length; i++){
                var num=$('.num').eq(i).html();
                $(".plus").eq(i).click(function(){
                    var that=$(this);
                    var id=$(this).parent().parent().attr("data-id");
                    $(this).prev().html(++num);
                    $(this).parent().next().find(".sumPrice").html($(this).prev().html()*$(this).parent().prev().find(".perPrice").html());
                    $.ajax({
                        type:'get',
                        url:'http://jx.xuzhixiang.top/ap/api/cart-update-num.php',
                        data:{uid:1153,pid:id,pnum:num},
                        dataType:'json',
                        success:function(data){
                            // console.log(data);
                            getTotalprice();
                        }
                    })
                })
                //点击减号
                $(".minus").eq(i).click(function(){
                    var that=$(this);
                    var id=$(this).parent().parent().attr("data-id");
                    if(num<=1){
                        alert("此宝贝不能再少了哦！");
                    }else{
                        $(this).next().html(--num);
                    }
                    $(this).parent().next().find(".sumPrice").html($(this).next().html()*$(this).parent().prev().find(".perPrice").html());
                    $.ajax({
                        type:'get',
                        url:'http://jx.xuzhixiang.top/ap/api/cart-update-num.php',
                        data:{uid:1153,pid:id,pnum:num},
                        dataType:'json',
                        success:function(data){
                            getTotalprice();
                        }
                    })
                })
                //点击删除
                $(".del").eq(i).click(function(){
                    var _this=$(this);
                    var id=$(this).parent().parent().attr("data-id");
                    $.ajax({
                        type:'get',
                        url:'http://jx.xuzhixiang.top/ap/api/cart-delete.php',
                        data:{uid:1153,pid:id},
                        dataType:'json',
                        success:function(data){
                            if(confirm("确定删除？")){
                                _this.parent().parent().remove();
                                getTotalprice();
                            }
                        }
                    })
                })
                
                sumNum+=parseInt($('.num').eq(i).html());
                localStorage.setItem("sumNum",sumNum);
            }
            //总金额
            function getTotalprice(){
               var sum=0;
               for(var i=0; i<$(".plus").length; i++){
                   sum+=parseInt($(".sumPrice").eq(i).html());
               }
               $("#totalPrice").html("￥"+sum);
            }
        }
    });
})