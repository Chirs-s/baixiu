// 查询文章的分类
$.ajax({
    type: 'get',
    url: '/categories',
    success: function (data) {
        // console.log(data);
        var html = template('tpl-options', { options: data });
        $('#category').html(html)
    }
});
// 处理上传图片
$('#feature').on('change', function () {
    //创建formData对象 实现二进制文件上传
    var formData = new FormData();
    //将管理员选择到的文件追加到formData对象中 
    formData.append('picture', this.files[0])
    // console.log(this.files);
    // $.ajax({
    //     type:'post',
    //     url:'/upload',
    //     data:formData,
    //     //不要处理data的属性
    //     processData:false,
    //     //不要设值参数类型的制作
    //     contentType:false,
    //     success:function(data){
    //         // console.log(data);
    //         $('#thumbnailFile').val(data[0].picture);
    //     }
    // })
    
})