export interface Slide {
  number: number;
  title: string;
  text: string;
}

export interface UserPresentationData {
  slides: Slide[];
  title?: string;
}

export interface UserPresentation {
  id: number;
  title: string;
  data: UserPresentationData;
  image_prompt?: string;
  pptx_file: string | null;
  created_at: string;
}

export interface TemplateImage {
  id: number;
  image: string;
}

export interface PresentationTemplate {
  id: number;
  title: string;
  slides_count: number;
  images_count: number;
  description: string;
  images: TemplateImage[];
}
