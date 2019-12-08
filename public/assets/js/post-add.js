


// 向服务器端发送请求 获取文章分类数据
$.ajax({
	url: '/categories',
	type: 'get',
	success: function (data) {
		// console.log(data)
		var html = template('categoryTpl', { data: data });
		$('#category').html(html);
	}
})

// 当管理员选择文件的时候 触发事件
$('#feature').on('change', function () {
	// alert(123)
	// // 获取到管理员选择到的文件
	var file = this.files[0]
	// // 创建formData对象 实现二进制文件上传
	var formData = new FormData ()
	// // 将管理员选择到的文件追加到formData对象中
	formData.append('image', file);
	// // 实现文章封面图片上传
	$.ajax({
		type: 'post',
		url: '/upload',
		data: formData,
	
		processData: false,
		// 告诉$.ajax方法不要设置参数类型
		contentType: false,
		success: function (data) {
			console.log(data)
			$('#thumbnail').val(data[0].image);
		}
	})
});

// 当添加文章表单提交的时候
$('#addForm').on('submit', function () {
	// 获取管理员在表单中输入的内容
	// alert(123)
	var formData =serializeobj($(this))
	// // 向服务器端发送请求 实现添加文章功能
	$.ajax({
		type: 'post',
		url: '/posts',
		data: formData,
		success: function () {
			// 文章添加成功 跳转到文章列表页面
			location.href = '/admin/posts.html'
		}
	})
	// 阻止表单默认提交的行为
	return false;
});


// 获取浏览器地址栏中的id参数
var id = getUrlParams('id');
// 当前管理员是在做修改文章操作
if (id != -1) {
	// 根据id获取文章的详细信息
	$.ajax({
		type: 'get',
		url: '/posts/' + id,
		success: function (response) {
			$.ajax({
				url: '/categories',
				type: 'get',
				success: function (categories) {
					response.categories = categories;
					// console.log(response)
					var html = template('modifyTpl', response);
					$('#parentBox').html(html);
				}
			})

		}
	})
}

// 从浏览器的地址栏中获取查询参数
function getUrlParams(name) {
	var paramsAry = location.search.substr(1).split('&');
	// 循环数据
	for (var i = 0; i < paramsAry.length; i++) {
		var tmp = paramsAry[i].split('=');
		if (tmp[0] == name) {
			return tmp[1];
		}
	}
	return -1;
}