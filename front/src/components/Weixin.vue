<template>
  <div>
    <div id="wx_login_container" style="height: 300px;position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);"></div>
  </div>
</template>


<script>
export default {
  name: "Login",
  data() {
    return {}
  },
  mounted() {
    this.get_wx_qrcode();
  },
  methods: {
    get_wx_qrcode() {
      let wx_login = new WxLogin({
        id: "wx_login_container",
        // appid: "wxf200e30fb49fdb0e",
        appid: "wx53cf447461989356",
        scope: "snsapi_login",
        redirect_uri: encodeURIComponent("http://www.template.matrix-studio.top/#/login"),
        state: Math.ceil(Math.random() * 100),
        style: "black",
        href: "",
        self_redirect: false,
      });
    }
  }
}
</script>
