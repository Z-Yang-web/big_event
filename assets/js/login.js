$(function() {
    $('#login1').on('click', function() {
        $('.login_box').hide()
        $('.reg_box').show()
    })
    $('#reg1').on('click', function() {
            $('.login_box').show()
            $('.reg_box').hide()
        })
        //从layui中获取form对象
    var form = layui.form
    var layer = layui.layer
        // 通过form.verify()函数自定义校验规则
    form.verify({
            // 自定义了一个pwd的校验规则
            pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
            // 这是校验两次密码是否输入一致的规则
            repwd: function(value) {
                // 通过形参拿到的是确认密码框中的内容
                // 还需要拿到密码框中的内容
                // 然后进行判断
                // 如果不一致则提示消息
                var pwd = $('.reg_box [name=password]').val();
                if (pwd !== value) {
                    return '两次密码不一致'
                }
            }
        })
        // 监听注册表单的注册事件
    $('#form_reg').on('submit', function(e) {
            // 阻止默认提交行为
            e.preventDefault()
                // 发起ajax的post请求
            var data = {
                username: $('#form_reg [name=username] ').val(),
                password: $('#form_reg [name=password] ').val()
            }
            $.post("/api/reguser", data,
                function(res) {
                    // console.log(res);
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    layer.msg("注册成功")
                        // 提示注册成功自动触发点击事件切换到登录界面
                    $('#reg1').click()
                },
            );
        })
        // 监听登录表单的注册事件
    $('#form_login').on('submit', function(e) {
        // 组织表单默认提交行为
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败')
                }
                layer.msg('登录成功')
                    // 将登录成功得到的token字符串保存到本地缓存中
                localStorage.setItem('token', res.token)
                    // 登录成功自动跳转到后台主页
                location.href = '/index.html'
            },
            // 这个函数是jquery里面的ajax方法
            // 规定了ajax是否成功都会执行这个函数

        })
    })

    // 这是入口函数结尾
})