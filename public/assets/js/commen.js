//时间格式化
template.defaults.imports.dateformat=function(d){
    return d.slice(0,10)
}

//form表单参数转换为对象封装函数
function serializeobj(form) {
    var arr = form.serializeArray();
    var obj = {};
    arr.forEach((item) => {
        obj[item.name] = item.value;
    })
    return obj;
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