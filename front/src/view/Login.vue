<template>
  <div id="grid">
    <div id="signin">
      <h3>登录账号</h3>
      <form>
        <div class="form-elem">
          <span>账号：</span>
          <input v-model="signinName" type="text" placeholder="输入用户名" />
        </div>

        <div class="form-elem">
          <span>密码：</span>
          <input v-model="signinPwd" type="password" placeholder="输入密码" />
        </div>

        <div class="form-elem">
          <button v-on:click.prevent="signin">登录</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { getToken} from "../api/user.js";
export default {
    name: "login",
    // components: {},
    data: function () {
        return {
            signinName: '',
            signinPwd: '',
        }
    },
    methods: {
        signup() {},
        signin() {
            getToken(this.signinName, this.signinPwd).then((response) => {
                const data = response.data
                console.log(data)

                const storage = localStorage;
                // Date.parse(...) 返回1970年1月1日UTC以来的毫秒数
                // Token 被设置为1分钟，因此这里加上60000毫秒
                const expiredTime = (new Date()).getTime() + 300000;
                console.log(expiredTime)
                    // 设置 localStorage
                storage.setItem('refresh.myblog', data.refresh);
                storage.setItem('access.myblog', data.access);
                storage.setItem('expiredTime.myblog', expiredTime);
                storage.setItem('username.myblog', this.signinName);
                // 路由跳转
                // 登录成功后回到博客首页
                this.$router.push({name: 'TestcasesResult'});
        })
        },
    }
}
</script>

<style scoped>
#signin {
  text-align: center;
}
</style>
