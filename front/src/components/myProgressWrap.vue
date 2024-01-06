<template>
  <div class="myProgressWrap">
    <div class="progressBar">
      <div :class="['progressBarBg', status]" :style="barStyle"></div>
      <div class="progressText" :style="[{'left':  +percentage >=70 ? `calc(${percentage}% - 50px)` : `${percentage}%`}]" v-if="showText">
        <!-- 没传递text插槽就显示百分比，反之显示插槽 -->
        <template v-if="!$slots.text">
          {{ percentage }}%
        </template>
        <slot v-else name="text"></slot>
      </div>
    </div>
  </div>
</template>

<script>
// 自带三种状态颜色，默认normal
const statusArr = ["success", "fail", "normal"];
export default {
  name: "myProgress1",
  props: {
    percentage: {
      type: Number,
      default: 0,
      validator: val => {
        return (val >= 0) & (val <= 100);
      }
    },
    status: {
      type: String,
      validator: val => {
        return statusArr.includes(val);
      }
    },
    // 进度条颜色设置，字符串或函数
    color: {
      type: [String, Function]
    },
    // 默认展示文本区域内容
    showText: {
      type: Boolean,
      default: true
    },
    // 是否开启动画
    showDongHua: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    showDongHua: {
      handler(newVal) {
        if (newVal) {
          this.displayVal = "";
        } else {
          this.displayVal = "none"; // 障眼法，隐藏伪元素，就没动画了
        }
      },
      immediate: true
    }
  },
  data() {
    return {
      displayVal: "" // css中使用js中变量的具体值
    };
  },
  computed: {
    barStyle() {
      // style是对象，故返回一个对象
      return {
        width: +this.percentage >=70 ? `calc(${this.percentage}% - 50px)` : `${this.percentage}%`,
        backgroundColor: this.setBg(), // 计算得出背景色
        "--displayVal": this.displayVal
      };
    }
  },
  methods: {
    setBg() {
      if (typeof this.color === "string") {
        return this.color;
      }
      if (typeof this.color === "function") {
        // 可根据不同百分比计算出对应背景色
        return this.color(+this.percentage);
      }
    }
  }
};
</script>

<style ref="xxx" lang="less" scoped>
.myProgressWrap {
  // display: flex;
  // align-items: center;
  .progressBar {
    // flex: 1;
    width: 100%;
    height: 15px;
    // background-color: #f3f3f3;
    background-color: #fff;

    border-radius: 6px;
    // overflow-x: hidden;
    position: relative;
    .progressBarBg {
      height: 100%;
      border-radius: 6px;
      // 默认normal
      background-color: #1677ff;
      // 加一个过渡，看着宽度变化自然些
      transition: width 0.36s ease;
      position: relative;
    }
    .progressBarBg::before {
      display: var(--displayVal);
      content: "";
      opacity: 0;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: #fff;
      border-radius: 10px;
      animation: donghua 2s infinite;
    }
    .success {
      background-color: #52c41a;
    }
    .fail {
      background-color: #ff4d4f;
    }
    .progressText {
      margin-left: 6px;
      width: fit-content; // 宽度随内容区自适应
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}

@keyframes donghua {
  0% {
    opacity: 0.5;
    width: 0;
  }
  100% {
    opacity: 0;
    width: 100%;
  }
}
</style>
