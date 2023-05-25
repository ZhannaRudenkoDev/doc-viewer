import { DocumentImagesModel } from "./document-images.model";
import { AnnotationsModel } from "./annotations.model";

export interface DocumentViewModel {
  id: number,
  images: DocumentImagesModel[],
  annotations: AnnotationsModel[]
}
