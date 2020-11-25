$(function(){
    var layer = layui.layer
    var form = layui.form

    initCate()
    function initCate(){
         $.ajax({
             method:'get',
             url:'/my/article/cates',
             success:function(res){
                 if(res.status !==0){
                     return layer.msg('获取文章列表失败！')
                 }
                //  layer.msg('获取文章分类成功！')
                //  调用模板引擎 ,渲染下拉菜单
                var htmlStr= template('tpl-cate',res)
                $('[name=cate_id]').html(htmlStr)
                form.render()
             }
         })
    }
    // 实现富文本框
    initEditor()
    // 实现图片选择
      // 1. 初始化图片裁剪器
      var $image = $('#image')
  
     // 2. 裁剪选项
       var options = {
       aspectRatio: 400 / 280,
       preview: '.img-preview'
    }
     $image.cropper(options)

    // 为封面按钮绑定点击事件
    $('#btnChooseImage').on('click',function(){
        $('#coverFile').click();
    })
    $('#coverFile').on('change',function(e){
        var files = e.target.files
    // 判断用户是否选择了文件
    if (files.length === 0) {
      return
    }
    // 根据文件，创建对应的 URL 地址
    var newImgURL = URL.createObjectURL(files[0])
    // 为裁剪区域重新设置图片
    $image
      .cropper('destroy') // 销毁旧的裁剪区域
      .attr('src', newImgURL) // 重新设置图片路径
      .cropper(options) // 重新初始化裁剪区域
    })
   
    // 定义文章的发布状态
    var art_state='已发布'
    // 为存为草稿按钮,绑定点击事件
    $('#btnSave2').on('click', function() {
        art_state = '草稿'
    })
     
    // 为表单绑定submit提交事件
    $('#form-pub').on('submit', function(e) {
        // 组织表单默认提交
        e.preventDefault()

        var fd=new FormData($(this)[0])

        fd.append('state',art_state)
        $image
           .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
        .toBlob(function(blob) {       
            // 将 Canvas 画布上的内容，转化为文件对象
            // 得到文件对象后，进行后续的操作

            // 将文件对象存储到fd中
            fd.append('cover_img',blob)

            publishArticle(fd)
         })
    })
    
    function publishArticle (fd) {
        $.ajax({
            method: 'post',
            url:'/my/article/add', 
            data:fd,
            contentType: false,
            processData: false,
            success: function (res) {
                if(res.status!==0){
                    return  layui.layer.msg('发表失败')
                }
                layui.layer.msg('发布成功')
                location.href='/home/wzleib.html'
            }
        })
    }

})