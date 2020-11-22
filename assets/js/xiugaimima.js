$(function(){

    var form=layui.form

// 为密码设置校验规则
    form.verify({
        pwd: [/^[\S]{6,12}$/,'密码为6到12位，且不能出现空格'],
        samaPwd:function (value) {
            // console.log(value);
            if(value ===$('[name=oldPwd]').val()){
                return '新密码不能与旧密码相同'
            }
        }, 
        // 判断两次输入的新密码是否一致
        repwd:function(value){
            console.log(value);
           if(value !==$('[name=newPwd]').val()){
               return '两次输入的密码不一致'
           }
        }
    })
// 重置密码
    // $('.layui-form').on('submit',function(e) {
    //     // 组织表单默认提交
    //     e.preventDefault()
    //     $.ajax({
    //         method:'POST',
    //         url:'my/updatepwd',
    //         // 快速获取表单信息
    //         data:$(this).serialize(),
    //         success:function(res){
    //             console.log(res);
    //             if(res.status!==0){
    //                 return layui.layer.msg('更新密码失败！请重新尝试')
    //             }
    //             layui.layer.msg('密码更改成功！')
    //             $('.layui-form')[0].reset()
    //         }
    //     })

    // })
     $('.layui-form').on('submit',function(e){
                e.preventDefault();
                $.ajax({
                    type:'POST',
                    url:'/my/updatepwd',
                    data:$(this).serialize(),
                    success:function (res) { 
                        console.log(res);
                        if(res.status != 0){
                            return layui.layer.msg(res.message)
                        }
                        layui.layer.msg("修改成功,请重新登录!",{time:1500},function () { 
                            window.parent.location.href = '/index.html'
                         })
                     }
                })
            })
})