
// 向服务器端发送请求 获取文章列表数据
$.ajax({
	type: 'get',
	url: '/posts',
	success: function (data) {
		// console.log(data);
		var html = template('postsTpl', data);
		$('#postsBox').html(html);
		var page = template('pageTpl', data);
		$('#page').html(page);
	}
});


// 分页
function changePage (page) {
	//文章列表数据
	$.ajax({
		type: 'get',
		url: '/posts',
		data: {
			page: page
		},
		success: function (data) {
			var html = template('postsTpl', data);
			$('#postsBox').html(html);
			var page = template('pageTpl', data);
		}
	});
}

// 分类数据
$.ajax({
	type: 'get',
	url: '/categories',
	success: function (data) {
		
		var html = template('categoryTpl', {data: data});
		$('#categoryBox').html(html);
	}
})

// 用户进行文章列表筛选
$('#filterForm').on('submit', function () {
	// alert(123)

	var formData = serializeobj($(this))
	// 服务器端发送请求
	$.ajax({
		type: 'get',
		url: '/posts',
		data: formData,
		success: function (data) {
			console.log(data);
			var html = template('postsTpl', data);
			$('#postsBox').html(html);
			var page = template('pageTpl', data);
			$('#page').html(page);
		}
	});
	
	return false;
});