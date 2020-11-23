$(function(){
    var layer = layui.layer
    var form=layui.form

    initArtCateList()
    // 获取文章列表
    function initArtCateList() {
       $.ajax({
           method: 'get',
           url: '/my/article/cates',
           success: function(res) {
               var htmlStr=template('tpl-table',res)
               $('tbody').html(htmlStr)
           }
       })
    }

    // 实现弹出层效果
    var indexAdd=null
    $('#btnAddCate').on('click',function() {
        indexAdd=layer.open({
           type: 1,
           area: ['500px', '300px'], 
           title: '添加文章分类',
           content: $('#dialog-add').html(),
       })
    })

// 为发表文章绑定submit事件
$('body').on('submit', '#form-add', function (e) {
    // 阻止表单默认提交
    e.preventDefault()
    $.ajax({
        method: 'POST',
        url:'/my/article/addcates',
        data:$(this).serialize(),
       
        success:function(res){
            
            if(res.status!==0){
                return layer.msg("新增分类失败")
            }
            initArtCateList()
            layer.msg("新增分类成功！")
            layer.close(indexAdd)
        }
    })
   
})
  // 为编辑按钮添加点击事件
    var indexEdit = null
    $('tbody').on('click', '#btn-edit', function() {
        // 弹出一个修改文章分类信息的层
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#dialog-edit').html()
        })
        // 根据点击的id值 将数据返回到表单中 渲染弹出表单
        var id = $(this).attr('data-id')
        // 发起请求获取对应分类的数据
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function(res) {
                form.val('form-edit', res.data)
            }
        })
    })
    // 更新文章数据
    $('body').on('submit', '#form-edit', function(e){
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: "/my/article/updatecate",
            data:$(this).serialize(),
            success: function(res) {
                if(res.status!==0){
                    return layer.msg('更新失败！')
                }
                layer.msg('更新数据成功！')
                layer.close(indexEdit)
                initArtCateList()   
            }
        })
    })

    // 为删除按钮绑定点击事件
    $('tbody').on('click', '.btn-delete', function () {
        var id = $(this).attr('data-id')
        // 提示是否要删除
        layer.confirm('确认删除？',{icon:3,title:'提示'},
        function(index) {
            $.ajax({
                method: 'get',
                url:'/my/article/deletecate/' + id,
                success: function(res) {
                    if(res.status!==0){
                        return layer.msg('删除失败！')
                    }
                    layer.msg('删除成功！')
                    layer.close(index)
                    initArtCateList()
                }
            })
        })
    })

})
