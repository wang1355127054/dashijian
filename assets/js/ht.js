$(function() {

// 快速获取用户信息
    getUserInfo()
    var layer=layui.layer
    $('#btnLogout').on('click', function() {
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' },
        function(index){
            localStorage.removeItem('token');
            location.href='/index.html';
            layer.close(index)
        })
    })


    
})
// 快速获取用户信息
function getUserInfo(){
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        // 请求头像配置
        success: function(res){
            console.log(res);
            if(res.status!==0){
                return layui.layer.msg('获取用户信息失败')
            }
            // 渲染用户头像
            renderAvatar(res.data) 
        }
    })
}

// 渲染用户头像
function renderAvatar(user){
        // 获取用户名称
    var name=user.nickname||user.username
    // 设置欢迎文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
    // 按需渲染用户头像
    if(user.user_pic!==null){
        // 渲染头像
        $('.touxiang').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    }else{
        // 渲染文本头像
        $('.touxiang').hide();
        var first =name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }


}