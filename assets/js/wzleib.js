$(function() {
    var  q={
        pagenum:1,
        pagesize:3,
        cate_id:'',
        state:'',
    }
    var form = layui.form
    var layer = layui.layer
    var laypage = layui.laypage

     //  定义时间过滤器
     template.defaults.imports.dataFormat = function (date){

        const dt =new Date(date)

        var y=dt.getFullYear()
        var m=padZero(dt.getMonth()+1)
        var d=padZero(dt.getDate())
        var hh=padZero(dt.getHours())
        var mm=padZero(dt.getMinutes())
        var ss=padZero(dt.getSeconds())

        return  y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
     }
    function  padZero(n){
        return n>9?n:'0'+n
    }

    //  获取文章数据
   
    initTable()
    function initTable() {
        $.ajax({
             method: 'get',
             url: '/my/article/list',
             data:q,
             success:function(res) {
                 if(res.status !== 0) {
                    return layer.msg('获取文章列表失败！')
                }
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
                renderPage(res.total)
            }
        })
        
       
    }
    // 渲染下拉
    initCate()
    function initCate(){
         $.ajax({
             method:'get',
             url:'/my/article/cates',
             success:function(res){
                 if(res.status!==0){
                     return layer.msg('获取文章列表失败')
                 }
                 var htmlStr= template('tpl-cate', res)
                 $('[name=cate_id]').html(htmlStr)
                 form.render()
                }
         })
    }
    // 为筛选表单绑定submit事件
    $('#form-search').on('submit', function (e){
         e.preventDefault()
         var cate_id = $('[name=cate_id]').val()
         var state = $('[name=state]').val()
         q.cate_id=cate_id
         q.state=state
         initTable()
    })

    // 页数选择
    function renderPage(total){         
          //总页数大于页码总数
         laypage.render({
             elem: 'pageBox',//分页容器id
             count: total,//数据总数
             limit:q.pagesize,//  每页显示几条
             curr:q.pagenum,//设置默认被选中的分页
             layout:["count","limit","prev","page","refresh","next","skip"],
             limits:[2,3,4,5,6,7,8,9,10],
             //  分页发生切换的时候触发jump
             jump: function(obj,dj){
                 q.pagenum=obj.curr
                 q.pagesize=obj.limit
                //  initTable()
                 if(!dj){
                     initTable()
                 }
            }
          });
        
    }

    // 实现编辑
    // $('tbody').on('click', '#bianji',function(){
    //     var id=$(this).attr('bj-id');
    //     indexEdit= layer.open({
    //         type:1,
    //         area:['800px,600px'],
    //         title:'编辑内容'，
    //         content:$()
    //     })
    // })
    


    // 实现删除
    $('tbody').on('click','#btn-delete',function (){
        // console.log(123);
        // 询问用户是否删除
        var len=$('#btn-delete').length;
        var id = $(this).attr('data-id')
        layer.confirm('确认删除?', {icon: 3, title:'提示'}, function(index){
            $.ajax({
                method: 'get',
                url:'/my/article/delete/'+id,
                success: function(res){
                    if(res.status !==0){
                        return layer.msg('删除失败！')
                    }
                    layer.msg('删除成功！')
                    if(len===1){
                        q.pagenum=q.pagenum===1 ? 1 : q.pagenum-1
                    }
                    initTable()  
                }
            })
            layer.close(index);
          });
    })
})

