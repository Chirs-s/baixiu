

//上传图像提交功能
$('#logo').on('change',function(){
    var formData = new FormData();
    formData.append('image',this.files[0])
    $.ajax({
        type:'post',
        url:'/upload',
        data:formData,
        processData:false,
        contentType:false,
        success:function(data){
            console.log(data);
           $('#site_logo').val(data[0].image);
           $('#settingImg').attr('src',data[0].image)
        }
    })
});
//表单数据提交功能
$('#settingForm').on('submit',function(){
    
    var obj = serializeobj($(this));
    if(!obj.comment){
        obj.comment =false;
    }
    if(!obj.review){
        obj.review=false
    }
    
    //发送请求
    $.ajax({
        type:'post',
        url:'/settings',
        data:obj,
        success:function(data){
            console.log(data);
            location.reload()
        }
    });
    return false;
});

//显示网站设置数据
$.ajax({
    type:'get',
    ul:'/settings',
    success:function(data){
        if(data){
           $('#hiddenLogo').val(data.logo)
           $('#settingImg').attr('src',data.logo)
           $('input[name="title"]').val(data.title);
           $('input[name="comment"]').prop('checked', data.comment)
           $('input[name="review"]').prop('checked', data.review)
        }
    }
})