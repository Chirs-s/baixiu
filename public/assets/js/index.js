
//文章站点内容统计
$.ajax({
    type:'get',
    url:'/posts/count',
    success:function(data){
        console.log(data);
        var html = '<strong>'+data.postCount+'</strong>篇文章（<strong>'+data.draftCount+'</strong>篇草稿）';
        $('#post').html(html)
    }
});
//分类目录站点内容统计
$.ajax({
    type:'get',
    url:'/categories/count',
    success:function(data){
        console.log(data);
        var html = '<strong>'+data.categoryCount+'</strong>个分类';
        $('#categories').html(html)
        
    }
});

//评论站点内容统计
$.ajax({
    type:'get',
    url:'/comments/count',
    success:function(data){
        console.log(data);
        
        var html = '<strong>'+data.commentCount+'</strong>条评论（<strong>1</strong>条待审核）';
        $('#comments').html(html);
    }
})