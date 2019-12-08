//显示用户登录信息
$.ajax({
    type: 'get',
    url: '/users/' + userId,
    success: function (data) {
      $('.avatar').attr('src', data.avatar)
      $('.profile .name').html(data.nickName)
    }
  })