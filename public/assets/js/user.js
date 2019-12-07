
function serializeobj(form) {
    var arr = form.serializeArray();
    var obj = {};
    arr.forEach((item) => {
        obj[item.name] = item.value;
    })
    return obj;
}

//绑定提交事件
$('#userForm').on('submit', function (e) {

    // e.preventDefault();
    var obj = serializeobj($(this));
    $.ajax({
        url: '/users',
        type: 'post',
        data: obj,
        success: function (data) {
            location.reload();
            // console.log(data);
        },
        error: function () {
            alert('用户添加失败')
        }
    });
    return false;
});
//上传头像功能
$('#userBox').on('change', '#avatar', function () {
    var formData = new FormData();
    // console.log(this.files);
    //用户选择到的文件
    formData.append('avatar', this.files[0])
    //发送ajax请求
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        // 告诉$.ajax方法不要解析请求参数
        processData: false,
        // 告诉$.ajax方法不要设置请求参数的类型
        contentType: false,

        success: function (data) {
            // console.log(data);
            //实现图片预览功能
            $('#preview').attr('src', data[0].avatar);
            $('#hiddenInput').val(data[0].avatar)

        }
    })
})
//获取用户列表
loadCategory()
function loadCategory() {
    $.ajax({
        type: 'get',
        url: '/users',
        success: function (data) {
            // console.log(data);
            var html = template('tpl', { userList: data })
            $('#container').html(html)
        }
    })
}
// 根据用户列表编辑用户信息
$('#container').on('click', '.edit', function () {
    var id = $(this).data('id')
    // console.log(id);
    $.ajax({
        type: 'get',
        url: '/users/' + id,
        success: function (data) {
            // console.log(data);
            var html = template('tplForm', data);
            $('#userBox').html(html)
        }
    })

})

// 编辑用户列表修改提交事件
$('#userBox').on('submit', '#modifyForm', function () {
    //获取用户在表单输入的内容
    var formData = serializeobj($(this));
    console.log(formData);
    //    获取根据用户修改的id值
    var id = $(this).attr('data-id');
    console.log(id);
    $.ajax({
        type: 'put',
        url: '/users/' + id,
        data: formData,
        success: function (data) {
            // 修改用户信息成功 重新加载页面
            loadCategory()
        }
    })
    return false;

});

// 删除用户列表事件
$('#container').on('click', '.delete', function () {
    if (confirm('确定要进行删除操作吗')) {
        var id = $(this).data('id');
        // console.log(id);
        $.ajax({
            type: 'delete',
            url: '/users/' + id,
            success: function (data) {
                loadCategory()
            }
        })
    };
});

//批量删除用户
//获取全选按钮
var selectAll = $('#selectAll');
//获取批量操作按钮
var deleteMany = $('#deleteMany')

selectAll.on('change', function () {
    //获取全选按钮的当前状态
    var status = $(this).prop('checked');
    console.log(status);
    //获取所有的用户状态并且和全选按钮的状态保持一致
    $('#container').find('input').prop('checked', status);
    //如果全选按钮触发则显示批量操作按钮
    if (status) {
        deleteMany.show()
    } else {
        deleteMany.hide()

    }
});
//用户按钮触发全选按钮
$('#container').on('change', '#userStatus', function () {
    var input = $('#container').find('input');
    //用户列表的长度是否等于被选中的长度
    if (input.length == input.filter(":checked").length) {
        //所有用户被选中的则触发全选按钮
        selectAll.prop('checked', true)
    } else {
        //不是所有用户被选中
        selectAll.prop('checked', false)
    };
    //当用户列表前面的复选框触发时则显示批量操作按钮
    if (input.filter(":checked").length > 0) {
        deleteMany.show()
    } else {
        deleteMany.hide()
    }

});
//触发批量操作事件进行批量删除
deleteMany.on('click', function () {
    var ids = []
    // alert(123);
    //获取选中的用户
    var checkStatus = $('#container').find('input').filter(':checked')
    //循环复选框从复选框获取data-id属性
    checkStatus.each(function (index, e) {
        ids.push($(e).data('id'));
        console.log(ids);

    });
    if (confirm('你确定要进行批量删除操作吗')) {
        $.ajax({
            type: 'delete',
            url: '/users/' + ids.join('-'),
            success: function (data) {
                loadCategory()
            }
        })
    }
})
