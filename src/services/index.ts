import { Api } from "../configs/axios.config";
import { PostTypes } from "../interfaces";
import { showToast } from "../utils/helpers";
import { handleAxiosError } from "./handleApisError";

/**
 * Updates an existing post.
 * @param payload The updated post data.
 * @param id The ID of the post to be updated.
 * @returns Promise<PostTypes> A promise that resolves to the updated post data.
 */
export const updatePost = async (
  payload: PostTypes,
  id: number | undefined
) => {
  try {
    const posts = await Api.put(`/posts/${id}`, { ...payload });
    showToast("success", "Item edited successfully");
    return posts.data;
  } catch (error) {
    return handleAxiosError(error);
  }
};

/**
 * Fetches all posts from the API.
 * @returns Promise<PostTypes[]> A promise that resolves to an array of posts.
 */
export const getPosts = async () => {
  try {
    const posts = await Api.get("/posts");
    return posts.data;
  } catch (error) {
    return handleAxiosError(error);
  }
};

/**
 * Deletes a post with the specified ID.
 * @param id The ID of the post to be deleted.
 * @returns Promise<number> A promise that resolves to the HTTP status code indicating success or failure.
 */
export const deletePost = async (id: number | undefined) => {
  try {
    const posts = await Api.delete(`/posts/${id}`);
    showToast("success", "Item deleted successfully");
    return posts.status;
  } catch (error) {
    return handleAxiosError(error);
  }
};

/**
 *  This will return all the posts that belong to the  user
 * @param id The ID of the post to be filtered.
 * @returns Promise<number> A promise that resolves to the HTTP status code indicating success or failure.
 */
export const getPostDetails = async (id: number | undefined) => {
  try {
    const posts = await Api.get(`/posts/${id}`);
    return posts.data;
  } catch (error) {
    return handleAxiosError(error);
  }
};
