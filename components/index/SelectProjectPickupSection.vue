.select-project-pickup-hover {
  transform: scale(0.9, 0.98);
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
}

@media (hover: hover) and (pointer: fine) {
  @include sp {
    .select-project-pickup.is-open .select-project-pickup-hover {
      transform: scale(1, 1);
    }
  }
}
