$(function() {
  // 登录注册栏切换
  $('.form-1 .dl-a').on('click', function() {
    $('.form-1').hide();
    $('.form-2').show();
  })

  $('.form-2 .dl-a').on('click', function() {
    $('.form-2').hide();
    $('.form-1').show();
  })

// 从layui中获取from对象
var form=layui.form
var layer = layui.layer

//  通过 form.verify() 函数自定义校验规则
 form.verify({
  // 自定义了一个叫做 pwd 校验规则
  pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
  // 校验两次密码是否一致的规则
  repwd: function(value) {
    var pwd = $('.form-2 [name=password]').val()
    if (pwd !== value) {
      
      return '两次密码不一致！' 
    }
  }
})

// 注册
$('#form-reg').submit(function(e) {
// 阻止表单默认提交
e.preventDefault(); 
// 发起ajax post请求
$.post('http://ajax.frontend.itheima.net/api/reguser',{
  username:$('#form-reg [name=username]').val(),password:$('#form-reg [name=password]').val() 
}, function(res){
  console.log(res);
  // 判断是否注册成功
  if(res.status !== 0 ) {
    return layer.msg('用户名已被占用');
  }
  layer.msg('注册成功');
})
})

// 监听登陆表单的提交事件
$('#form-dl').submit(function(e) {
  // 阻止表单默认提交
  e.preventDefault();
  // console.log($(this).serialize());
  var ser=$(this).serialize()
  // 发起post请求
$.ajax({
  url: 'http://ajax.frontend.itheima.net/api/login',
  method: 'post',
  // 快速获取表单中的数据
  data:ser,
  success:function(res){
    // console.log(res);
    if(res.status!==0){
      return layer.msg('登陆失败!');
    }
    layer.msg('登陆成功!')
    localStorage.setItem('token', res.token)
    location.href='/ht.html'
  }
})
})

})


