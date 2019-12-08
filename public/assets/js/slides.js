$('#file').on('change',function(){
    // alert(123)
    //提取选择到文件
    var file = this.files[0]
    // console.log(file);
    //进行二进制上传
    var formData = new FormData();
    // console.log(formData);
    //将选择到的文件添加到formData中
        formData.append('image',file)
    //向服务器发送请求
    $.ajax({
        type:'post',
        url:'/upload',
        data:formData,
        //不要处理formData的参数格式
        processData:false,
        //不要处理文件类型
        contentType:false,
        success:function(data){
            console.log(data);
            $('#image').val(data[0].image)
            
        }
    })

});

//添加表单绑定事件
$('#addSlides').on('submit',function(e){
    e.preventDefault()
    // alert(123);
    //获取用户输入的表单信息
    var form =serializeobj($(this))
    $.ajax({
        type:'post',
        url:'/slides',
        data:form,
        success:function(data){
            console.log(data);
            
            location.reload()
        }
    })
    
    // return false;
});

//获取轮播图类表
$.ajax({
    type:'get',
    url:'/slides',
    success:function(data){
        var html = template('slidesTpl',{data:data});
        $('#slidesForm').html(html)
    }
});
//删除轮播图图片

$('#slidesForm').on('click','.delete',function(){
    //获取删除按钮的id
    var id = $(this).data('id')
    // alert(123)
    $.ajax({
        type:'delete',
        url:'/slides/'+id,
        success:function(){
            location.reload()
        }
    })
})