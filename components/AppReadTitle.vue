<style lang="scss" scoped>

.app-read-title {
  display: block;
  font-size: 12px;
  font-family: fonts.$helvetica;
  letter-spacing: 0.02em;
  line-height: 1.04;

  @include mixins.tab-vertical() {
    font-size: 10px;
  }

  @include state.sp() {
    font-size: 10px;
  }
}

//modifier

.app-read-title--section {
  & .app-read-title-wrapper-00 {
    font-size: 36px;
    text-indent: -2px;
    line-height: 0.79;

    @include mixins.tab-vertical() {
      font-size: 30px;
      text-indent: -1.6px;
    }

    @include mixins.sp() {
      display: inline-block;
      margin: 0 0 0 -4.5px;
      font-size: 28px;
      text-indent: 0;
    }
  }
}

.app-read-title--project-section {
  & .app-read-title-wrapper-00 {
    position: relative;
    right: -6px;
    font-size: 36px;
    text-indent: -2px;
    line-height: 0.79;

    @include mixins.sp() {
      font-size: 28px;
      text-indent: 0;
      line-height: 1;
    }
  }
}

.app-read-title--pickup-section {
  font-size: 14px;
  text-align: right;

  @include state.sp() {
    font-size: 10px;
  }

  & .app-read-title-wrapper-00 {
    position: relative;
    left: 4px;
    font-size: 36px;
    line-height: 0.79;

    @include mixins.sp() {
      font-size: 28px;
      text-indent: 0;
      line-height: 0.86;
    }
  }
}

.app-read-title--contact-section {
  & .app-read-title-wrapper-00 {
    display: block;
    margin: 0 0 6px 0;
    font-size: 36px;
    text-indent: -2px;
    line-height: 0.8;

    @include mixins.tab-vertical() {
      margin: 0 0 3px 0;
      font-size: 28px;
      text-indent: -1px;
    }

    @include mixins.sp() {
      margin: 0 0 3px 0;
      font-size: 28px;
      text-indent: -1.5px;
    }
  }

  & .app-read-title-wrapper-01 {
    font-size: 20px;

    @include mixins.tab-vertical() {
      font-size: 16px;
    }

    @include state.sp() {
      font-size: 10px;
    }
  }
}

.app-read-title--award-section {
  & .app-read-title-wrapper-00 {
    font-size: 36px;
    text-indent: -2px;
    line-height: 0.79;

    @include mixins.sp() {
      display: inline-block;
      margin: 0 0 0 -4.5px;
      font-size: 28px;
      text-indent: 0;
    }
  }

  & .app-read-title-wrapper-01 {
    font-size: 14px;

    @include state.sp() {
      font-size: 10px;
    }
  }
}

.app-read-title--about-project-section {
  color: colors.$black;

  & .app-read-title-wrapper-00 {
    font-size: 36px;
    text-indent: -2px;
    line-height: 0.79;

    @include mixins.sp() {
      display: inline-block;
      margin: 0 0 0 -4.5px;
      font-size: 28px;
      text-indent: 0;
    }
  }

  & .app-read-title-wrapper-01,
  & .app-read-title-wrapper-02 {
    font-size: 14px;

    @include state.sp() {
      font-size: 10px;
    }
  }
}

.app-read-title--works-section {
  font-size: 14px;

  @include state.sp() {
    font-size: 10px;
    line-height: 1.1;
  }

  & .app-read-title-wrapper-00 {
    font-size: 36px;
    text-indent: -2px;
    line-height: 0.79;

    @include mixins.sp() {
      display: inline-block;
      margin: 0 0 0 -4.5px;
      font-size: 26px;
      text-indent: 0;
    }
  }
}

/* stylelint-disable */
.is-windows {
  & .app-read-title--section {
    & .app-read-title-wrapper-00 {
      position: relative;
      left: -8px;
    }
  }

  & .app-read-title--pickup-section {
    & .app-read-title-wrapper-00 {
      position: relative;
      left: 14px;
    }
  }

  & .app-read-title--project-section {
    & .app-read-title-wrapper-00 {
      position: relative;
      right: -14px;
    }
  }

  & .app-read-title--contact-section {
    & .app-read-title-wrapper-00 {
      position: relative;
      left: -8px;
    }
  }

  & .app-read-title--award-section {
    & .app-read-title-wrapper-00 {
      position: relative;
      left: -8px;
    }
  }

  & .app-read-title--about-project-section {
    & .app-read-title-wrapper-00 {
      position: relative;
      left: -8px;
    }
  }

  & .app-read-title--works-section {
    & .app-read-title-wrapper-00 {
      position: relative;
      left: -8px;
    }
  }
}
/* stylelint-enable */
</style>

<template>
  <span class="app-read-title" :class="`app-read-title--${modifier}`">
    <span v-for="(char, index) of text" :key="index" class="app-read-title-wrapper" :class="`app-read-title-wrapper-0${index}`">
      <AppTextAnimation :state="state" :start="start + index * 0.12" :rotate="$BASEROTATE.right" :text="char" :sp-animation="spAnimation" />
    </span>
  </span>
</template>

<script>
export default {
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
