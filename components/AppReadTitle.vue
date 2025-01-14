<template>
  <span class="app-read-title" :class="`app-read-title--${modifier}`">
    <span v-for="(char, index) of text" :key="index" class="app-read-title-wrapper" :class="`app-read-title-wrapper-0${index}`">
      <AppTextAnimation :state="state" :start="start + index * 0.12" :rotate="$BASEROTATE.right" :text="char" :sp-animation="spAnimation" />
    </span>
  </span>
</template>

<script>
export default {
  /**
   * text : 中身のテキスト、配列で渡ってくる
   * start : 数値分アニメーションをdelayさせる
   * modifier : 見た目を変更するクラス
   * state : 親コンポーネントから監視されているアニメーションの状態管理用のprops
   * spAnimation : SPでアニメーションさせるか、させないかを決める
   * */
  props: {
    text: {
      type: Array,
      required: true,
    },
    start: {
      type: Number,
      default: 0,
    },
    modifier: {
      type: String,
      default: '',
    },
    state: {
      type: String,
      default: '',
    },
    spAnimation: {
      type: Boolean,
      default: true,
    },
  },
}
</script>

<style lang="scss" scoped>
@use "~/assets/scss/constants/break-points" as *;
@use "~/assets/scss/constants/color" as *;
@use "~/assets/scss/constants/font" as *;
@use "~/assets/scss/functions/mixins" as *;

.app-read-title {
  display: block;
  font-size: 12px;
  font-family: $helvetica;
  letter-spacing: 0.02em;
  line-height: 1.04;
}

.app-read-title-tab-vertical {
  font-size: 10px;
}

.app-read-title-sp {
  font-size: 10px;
}

.app-read-title--section {
  display: block;
  margin: 0 0 36px 0;
  color: $black;
  font-size: 12px;
  font-family: $helvetica;
  letter-spacing: 0.02em;
}

.app-read-title--section-wrapper-00 {
  font-size: 36px;
  text-indent: -2px;
  line-height: 0.79;
}

.app-read-title--section-wrapper-00-tab-vertical {
  font-size: 30px;
  text-indent: -1.6px;
}

.app-read-title--section-wrapper-00-sp {
  display: inline-block;
  margin: 0 0 0 -4.5px;
  font-size: 28px;
  text-indent: 0;
}

.app-read-title--project-section {
  display: block;
  margin: 0 0 36px 0;
  color: $black;
  font-size: 12px;
  font-family: $helvetica;
  letter-spacing: 0.02em;
}

.app-read-title--project-section-wrapper-00 {
  position: relative;
  right: -6px;
  font-size: 36px;
  text-indent: -2px;
  line-height: 0.79;
}

.app-read-title--project-section-wrapper-00-sp {
  font-size: 28px;
  text-indent: 0;
  line-height: 1;
}

.app-read-title--pickup-section {
  font-size: 14px;
  text-align: right;
}

.app-read-title--pickup-section-sp {
  font-size: 10px;
}

.app-read-title--pickup-section-wrapper-00 {
  position: relative;
  left: 4px;
  font-size: 36px;
  line-height: 0.79;
}

.app-read-title--pickup-section-wrapper-00-sp {
  font-size: 28px;
  text-indent: 0;
  line-height: 0.86;
}

.is-windows .app-read-title--section-wrapper-00 {
  position: relative;
  left: -8px;
}

.is-windows .app-read-title--pickup-section-wrapper-00 {
  position: relative;
  left: 14px;
}

.is-windows .app-read-title--project-section-wrapper-00 {
  position: relative;
  right: -14px;
}

@include sp {
  .app-read-title--section {
    margin: 0 0 24px 0;
    font-size: 10px;
  }
  
  .app-read-title--project-section {
    margin: 0 0 24px 0;
    font-size: 10px;
  }
}

.app-read-title--section-text {
  display: block;
  margin: 0 0 10px 0;
}

.app-read-title--project-section-text {
  display: block;
  margin: 0 0 10px 0;
}

.app-read-title--section-text-first {
  display: block;
  font-size: 26px;
  text-indent: -4px;
}

.app-read-title--project-section-text-first {
  display: block;
  font-size: 26px;
  text-indent: -4px;
}

@include sp {
  .app-read-title--section-text-first {
    font-size: 20px;
  }
  
  .app-read-title--project-section-text-first {
    font-size: 20px;
  }
}

.is-windows .app-read-title--section-text-first {
  position: relative;
  left: -8px;
}

.is-windows .app-read-title--project-section-text-first {
  position: relative;
  left: -8px;
}
</style>
