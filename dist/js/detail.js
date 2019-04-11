$(function(){
    console.log(location)
    var id=location.search.split("=")[1];
    $.ajax({
        type: "get",
        url: "http://jx.xuzhixiang.top/ap/api/detail.php",
        data: {id:id},
        dataType: "json",
        success: function (data) {
            var data=data.data;
            var str="";
            str=`
                <div class="content">
                    <div class="left-img">
                        <img src="${data.pimg}"/>
                    </div>
                    <div class="right-desc">
                        <p>${data.pdesc}</p>
                        <div class="price">￥<span>${data.pprice}</span></div>
                        <div class="chima">
                            <span>尺码</span>
                            <ul>
                                <li>38</li>
                                <li>40</li>
                            </ul>
                        </div>
                        <div class="number">
                            <span>数量</span>
                            <button class="minus">-</button>
                            <strong class="num">1</strong>
                            <button class="plus">+</button>
                        </div>
                        <button class="addCart">加入购物袋</button>
                        <div class="wpb">购买最多可获<em>305</em>个唯品币</div>
                    </div>
                </div>
            `
            $(".detail").html(str);
        
            //点击减号
            var num=$(".num").html();
            $(".number .minus").click(function(){
                if(num<=1){
                    alert("本商品一件起售")
                }else{
                    $(".num").html(--num);
                }
            })
            //点击加号
            $(".number .plus").click(function(){
                $(".num").html(++num);
            })
            //点击添加购物车
            $(".addCart").click(function(){
                // console.log(num);
                $.ajax({
                    type:'get',
                    url:'http://jx.xuzhixiang.top/ap/api/add-product.php',
                    data:{uid:1153,pid:id,pnum:num},
                    dataType:'json',
                    success:function(data){
                        location.href="cart.html";
                        // console.log(data)
                    }
                })
            })
        }
    });
})