<template>
  <section class="select-project-pickup">
    <div v-for="(pickup, index) in pickupData" :key="index" class="select-project-pickup-item">
      <div class="select-project-pickup-hover">
        <img :src="pickup.image" :alt="pickup.title" class="select-project-pickup-image" />
        <div class="select-project-pickup-content">
          <h3 class="select-project-pickup-title">{{ pickup.title }}</h3>
          <p class="select-project-pickup-description">{{ pickup.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'SelectProjectPickupSection',
  
  props: {
    pickupData: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
@use "@/assets/scss/functions/mixins" as *;

.select-project-pickup {
  position: relative;
  width: 100%;
}

.select-project-pickup-item {
  margin-bottom: 2rem;
  
  &:last-child {
    margin-bottom: 0;
  }
}

.select-project-pickup-hover {
  position: relative;
  transition: transform 0.3s ease;
  transform: scale(0.9, 0.98);
}

.select-project-pickup-image {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.select-project-pickup-content {
  padding: 1rem;
}

.select-project-pickup-title {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.select-project-pickup-description {
  font-size: 1rem;
  line-height: 1.5;
}

@include sp {
  .select-project-pickup-hover {
    transform: scale(1, 1);
  }
}

@media (hover: hover) and (pointer: fine) {
  .select-project-pickup.is-open .select-project-pickup-hover {
    transform: scale(1.1, 1.1);
  }

  @include sp {
    .select-project-pickup.is-open .select-project-pickup-hover {
      transform: scale(1, 1);
    }
  }
}
</style>
