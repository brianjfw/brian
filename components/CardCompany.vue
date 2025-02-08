<style lang="scss" scoped>

.card-article {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 28px 18px;
  background-color: #d9d9d9;
  color: colors.$black;
  border-radius: 14px;

  @include state.sp() {
    padding: 20px 16px;
    border-radius: 7px;
  }
}

.card-inner {
  display: block;
  position: relative;
  height: 100%;
}

.card-link {
  display: block;
  width: 100%;
  height: 100%;
  text-align: left;
  line-height: 1;
}

.card-title-wrapper-01 {
  display: block;
  margin: 0 0 60px 0;
  color: colors.$darkBlack;

  @include state.sp() {
    margin: 0 0 40px 0;
  }
}

.card-title-wrapper-01-block {
  display: block;
  font-size: 20px;
  font-family: $helvetica;
  line-height: 1.2;

  @include state.sp() {
    font-size: 17px;
  }

  &:first-of-type {
    font-size: 36px;
    text-indent: -4px;
    line-height: 1;

    @include state.sp() {
      display: inline-block;
      margin: 0 0 0 -4px;
      font-size: 28px;
      line-height: 0.9;
      text-indent: 0;
    }
  }
}

.card-title-wrapper-02 {
  color: colors.$darkBlack;
}

.card-title-wrapper-02-block {
  display: block;
  width: 200px;
  font-size: 12px;
  font-family: $helvetica;
  letter-spacing: 0.02em;
  line-height: 1.24;

  @include state.sp() {
    width: 180px;
    font-size: 10px;
  }
}

.card-title-wrapper-03 {
  position: absolute;
  bottom: -11px;
  left: 0;
  width: 100%;
  color: colors.$darkBlack;
  font-size: 120px;
  font-family: $sixcaps;

  @include state.sp() {
    bottom: -5px;
    font-size: 80px;
  }

  & .card-sub-title {
    position: absolute;
    top: 12px;
    right: -4px;
    font-size: 12px;
    font-family: $helvetica;
    letter-spacing: 0.02em;

    @include state.sp() {
      top: 7px;
      font-size: 10px;
    }
  }
}

/* stylelint-disable */
.is-windows .card-title-wrapper-01-block {
  &:first-of-type {
    position: relative;
    left: -8px;
  }
}
/* stylelint-enable */

.card-read {
  color: colors.$darkBlack;
}
</style>

<template>
  <div :class="`card-company ${addClass}`">
    <div class="card-company-inner">
      <div class="card-company-content">
        <h2 class="card-company-title">{{ companyTitle }}</h2>
        <p class="card-company-text" v-html="companyText" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  /**
   * name : 会社名
   * title : 会社タイトル
   * subTitle : 会社サブタイトル
   * link : 会社URL
   * desc : 会社説明
   * state : テキストアニメーションの状態を変更するprops
   */
  props: {
    addClass: {
      type: String,
      default: '',
    },
    companyTitle: {
      type: String,
      default: '',
    },
    companyText: {
      type: String,
      default: '',
    },
  },
}
</script>
