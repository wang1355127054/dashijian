$(function() {
    var form=layui.form
    // 获取用户基本信息
initUserInfo();
function initUserInfo() {
    $.ajax({
        method:"get",
        url:"http://ajax.frontend.itheima.net/my/userinfo",
        headers: {
            Authorization: localStorage.getItem ('token') ||''
        },
        success: function(res) {
            if(res.status!==0){
                return layer.msg("获取用户信息失败！");

            }
            form.val("formUserInfo",res.data)
        }
    })

}

//    修改信息
$('.layui-form').on('submit',function(e){
    //    阻止表单默认提交
    e.preventDefault()
    // 发起ajax
    $.ajax({
        method: 'POST',
        url:'http://ajax.frontend.itheima.net/my/userinfo',
        data:$(this).serialize(),
        headers: {
            Authorization: localStorage.getItem ('token') ||''
        },
        
        success:function(res){
            console.log(res);
            if(res.status!==0){
                return layui.layer.msg('更新用户资料失败')
            }
            layui.layer.msg('更新用户资料成功')
            window.parent.getUserInfo()
        }
    })
    
})
// 重置表单数据
$('#btnReset').on('click',function(e){
    //    阻止表单默认提交
    e.preventDefault()
    initUserInfo()
   })

})