

//取评论数据
$.ajax({
    type: 'get',
    url: '/comments',
    success: function (data) {
        // console.log(data);

        var html = template('commentsTpl', data);
        $('#commentsBox').html(html)
    }
});

//操作点击批准和驳回按钮获取状态
$('#commentsBox').on('click', '.status', function () {
    // alert(123);
    //先要获取当前评论的状态
    var status = $(this).data('status');
    // alert(status);
    //获取当前评论的id
    var id = $(this).data('id');
    //发送请求更改评论的状态
    $.ajax({
        type:'put',
        url:'/comments/'+id,
        data: {
            state: status ==0? 1:0
        },
        success:function(data){
            console.log(data);
            location.reload()
        },
    })
})

//点击删除按钮
$('#commentsBox').on('click', '.delete', function () {
    // alert(123);
    //获取当前删除的id
    var id = $(this).data('id')
    // alert(id)
    //发送删除当前评论的请求
    $.ajax({
        type:'delete',
        url:'/comments/'+id,
        success:function(){
            location.reload()
        }
    })

})