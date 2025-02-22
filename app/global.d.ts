import { ImageFadeMaterial } from "./work-section/ProjectCard"; // Correct path

declare global {
  namespace JSX {
    interface IntrinsicElements {
      imageFadeMaterial: ReactThreeFiber.Object3DNode<
        ImageFadeMaterial,
        typeof ImageFadeMaterial
      >;
    }
  }
} 