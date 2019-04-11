$(function(){
    $.ajax({
        type:'get',
        url:'http://jx.xuzhixiang.top/ap/api/productlist.php',
        data:{uid:1153},
        dataType:'json',
        success:function(data){
            console.log(data.data);
            var str="";
            data.data.map(function(item,i){
                str+=`
                    <li>
                        <a href="detail.html?id=${item.pid}">
                            <img src="${item.pimg}"/>
                            <span><em>折后价</em><strong>￥${item.pprice}</strong></span>
                            <p class="pname">${item.pname}</p>
                            <p class="pdesc">${item.pdesc}</p>
                        </a>
                    </li>
                `
            })
            $(".proList").html(str);
        }
    })
})