$(function() {
    var form = layui.form
    var layer = layui.layer
        // form属性是layui提供的表单校验规则
    form.verify({
            // form.verify用来定义表单的规则
            // required（ 必填项）
            // phone（ 手机号）
            // email（ 邮箱）
            // url（ 网址）
            // number（ 数字）
            // date（ 日期）
            // identity（ 身份证）
            // 以上这些个方法都是layui里面内置的规则可以直接使用
            // 定义密码框规则
            pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
            sampwd: function(value) {
                // 这里的value值是给谁设定这个规则那么就是那个输入框里面的值
                var pwd = $('[name=oldPwd]').val()
                if (value === pwd) {
                    return '新密码不能与原密码相同'
                        // return layer.msg('新密码不能与原密码相同')
                }
            },
            rePwd: function(value) {
                if (value !== $('[name=newPwd]').val()) {
                    return '两次密码输入不一致，密码重置失败'
                }
            }
        })
        // 监听表单的提交事件
    $('.layui-form').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            // data: {
            //     oldPwd: $('[name=oldPwd]').val(),
            //     newPwd: $('[name=newPwd]').val()
            // },
            data: $(this).serialize(),
            success: function(res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('更新密码失败')
                }
                layer.msg('更新密码成功')
                    // 重置表单
                $('.layui-form')[0].reset()
                window.parent.location.href = '/login.html'


            }
        })
    })
})