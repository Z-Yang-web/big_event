$(function() {
        // 调用获取用户基本信息的函数
        getUserinfo()
        var layer = layui.layer
        $('#tuichu').on('click', function() {
                layer.confirm('确认退出登录吗?', {
                    icon: 3,
                    title: '提示'
                }, function(index) {
                    //do something
                    localStorage.removeItem('token')
                    location.href = '/login.html'
                    layer.close(index);
                });
            })
            // 提示用户是否退出 


    })
    // 获取用户信息
function getUserinfo() {
    $.ajax({
        type: 'GET',
        url: '/my/userinfo',
        // headers: {
        //    Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            // 调用渲染用户头像函数
            renderAvatar(res.data)
        },

    })
}
// 渲染用户头像函数
function renderAvatar(user) {
    // 1,获取用户名称
    var name = user.nickname || user.username
        // 2,设置欢迎的文本
    $("#welcome").html('欢迎&nbsp&nbsp' + name)
        // 3，按需渲染用户头像
    if (user.user_pic !== null) {
        // 3.1 渲染用户头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        // 3.2 渲染文本头像
        // 让图片头像隐藏
        $('.layui-nav-img').hide()
            // 利用toupperCase将字符串转换为大写
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}