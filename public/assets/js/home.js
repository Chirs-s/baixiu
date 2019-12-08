
function banner(){
    var swiper = Swipe(document.querySelector('.swipe'), {
        auto: 3000,
        transitionEnd: function (index) {
          // index++;
  
          $('.cursor span').eq(index).addClass('active').siblings('.active').removeClass('active');
        }
      });
  
      // 上/下一张
      $('.swipe .arrow').on('click', function () {
        var _this = $(this);
  
        if (_this.is('.prev')) {
          swiper.prev();
        } else if (_this.is('.next')) {
          swiper.next();
        }
      })
}

//展示轮播图
$.ajax({
    type:'get',
    url:'/slides',
    success:function(data){
    console.log(data);
    //渲染到页面中
    var html = template('slidesTpl',{data:data});
    $('#homeIndex').html(html)
    banner()
    }
})