import { axiosAuth } from "./axiosAuth";
import type {
  PresentationTemplate,
  UserPresentation,
  UserPresentationData,
} from "../types/presentation";

export async function fetchPresentationTemplates(): Promise<PresentationTemplate[]> {
  const res = await axiosAuth.get("/presentations/templates/");
  return res.data;
}


export async function createUserPresentation(
  templateId: number,
  title: string
): Promise<UserPresentation> {
  const res = await axiosAuth.post("/presentations/user-presentations/", {
    template: templateId,
    title,
  });

  return res.data;
}


export async function generatePresentation(
  userPresentationId: number,
  theme: string,
  imagePrompt: string
): Promise<UserPresentation> {
  const res = await axiosAuth.post(
    `/presentations/user-presentations/${userPresentationId}/generate/`,
    {
      user_prompt: theme,
      image_prompt: imagePrompt,
    }
  );
  return res.data;
}


export async function saveUserPresentationData(
  userPresentationId: number,
  data: UserPresentationData
): Promise<UserPresentation> {
  const res = await axiosAuth.post(
    `/presentations/user-presentations/${userPresentationId}/save_data/`,
    { data }
  );
  return res.data;
}


export async function downloadUserPresentation(
  userPresentationId: number
): Promise<Blob> {
  const res = await axiosAuth.get(
    `/presentations/user-presentations/${userPresentationId}/download/`,
    { responseType: "blob" }
  );
  return res.data;
}


export async function fetchUserPresentations(): Promise<UserPresentation[]> {
  const res = await axiosAuth.get("/presentations/user-presentations/");
  return res.data;
}


export async function deleteUserPresentation(id: number): Promise<void> {
  await axiosAuth.delete(`/presentations/user-presentations/${id}/`);
}
