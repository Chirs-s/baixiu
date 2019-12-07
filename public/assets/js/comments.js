//取评论数据
$.ajax({
    type:'get',
    url:'/comments',
    success:function(data){
        console.log(data);
        
        var html =template('commentsTpl',data);
        $('#commentsBox').html(html)
    }
});

