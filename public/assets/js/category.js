loadCategory()

function serializeobj(form) {
    var arr = form.serializeArray();
    var obj = {};
    arr.forEach((item) => {
        obj[item.name] = item.value;
    })
    return obj;
}

//分类管理提交事件
$('#addCategory').on('submit', function () {
    // e.preventDefault()
    //获取输入的表单内容
    var obj = serializeobj($(this));

        console.log(obj);
        
    $.ajax({
        type: 'post',
        url: '/categories',
        data: obj,
        success: function (data) {
            // console.log(data);
            loadCategory()
        }
    })
    return false;
});   
//加载重新渲染页面 (分类列表展示功能)         
function loadCategory(){
    $.ajax({
        type: 'get',
        url: '/categories',
        success:function(data){
            // console.log(data);
            var html = template('categoryListTpl',{category:data});
            $('#categoryBox').html(html)
        }
    })
}

//分类属性修改
$('#categoryBox').on('click','#edit',function(){
    //根据希求获取编辑的id
    var id = $(this).data('id');
    // console.log(id);
    $.ajax({
        type:'get',
        url:'/categories/'+id,
        success:function(data){
            // console.log(data);
            var html = template('modifyTpl',data);
            $('#formBox').html(html)
            
        }

    })
});

//给修改分类的修改按钮绑定提交事件
$('#formBox').on('submit','#modifyCategory',function(){
    //获取表单输入的修改的信息
    var formData = serializeobj($(this));
    // var formData = $(this).serialize()
    console.log(formData);
    
    //获取要修改分类的id
    var id = $(this).data('id');
    console.log(id);
    
    //发送请求调用接口
    $.ajax({
        url: '/categories/' + id,
        type:'put',
        data:formData,
        success:function(){
            loadCategory()
        }
    })
    return false;
});

//分类删除功能
$('#categoryBox').on('click','#delete',function(){
    //获取id
    var id = $(this).attr('data-id')
    console.log(id);
    $.ajax({
        type:'delete',
        url:'/categories/'+id,
        success:function(){
            loadCategory()
        }
    })
})