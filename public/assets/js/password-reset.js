//表单提交封装
function serializeobj(form){
    var arr = form.serializeArray();
    var obj ={};
    arr.forEach((item)=>{
        obj[item.name] = item.value;
    })
    return obj;
}

$('#resetForm').on('submit',function(){
   var obj = $(this).serialize();
   $.ajax({
       type:'put',
       url:'/users/password',
       data:obj,
       success:function(data){
           console.log(data);
           location.href='/admin/login.html'
       }
   })
   return false
})
