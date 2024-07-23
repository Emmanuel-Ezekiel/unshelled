import React, { useState, useEffect } from "react";
import Loader from "../components/Loader/loader";
import { useParams } from "react-router-dom";
import useGetPostDetails from "../queries/useGetPostDetails";
import { PostTypes } from "../interfaces";
import { updatePost } from "../services";

const EditItem = () => {
  const { id } = useParams();
  const parsedId = parseInt(id ?? "0");
  const { data: post, isLoading } = useGetPostDetails({ id: parsedId });
  const [localPost, setLocalPost] = useState<null | PostTypes>(null);
  const [editingPost, setEditingPost] = useState<null | PostTypes>(null);
  const [input, setInput] = useState<{ body: string; title: string }>({
    body: "",
    title: "",
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (post) {
      setLocalPost(post);
      setInput({
        body: post.body,
        title: post.title,
      });
    }
  }, [post]);

  const handleEdit = (post: PostTypes) => {
    setEditingPost(post);
  };

  const handleCancelEdit = () => {
    setEditingPost(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  const handleSaveEdit = async () => {
    if (editingPost) {
      const updatedPost = {
        ...editingPost,
        title: input.title,
        body: input.body,
      };
      setIsSaving(true);
      try {
        await updatePost(updatedPost, updatedPost.id);
        setLocalPost(updatedPost);
        setEditingPost(null);
      } catch (error) {
        console.error("Error updating post:", error);
      } finally {
        setIsSaving(false);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="loader-container">
        <Loader />
      </div>
    );
  }

  if (!localPost) {
    return <div>No post found</div>;
  }

  return (
    <div className="container">
      <h1>Edit Post</h1>
      <div className="flex-column">
        <div className="flex-large">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Body</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="post-body" style={{ width: "30%" }}>
                  {editingPost ? (
                    <input
                      type="text"
                      name="title"
                      value={input.title}
                      onChange={handleChange}
                    />
                  ) : (
                    localPost.title
                  )}
                </td>
                <td className="post-body" style={{ width: "50%" }}>
                  {editingPost ? (
                    <input
                      type="text"
                      name="body"
                      value={input.body}
                      onChange={handleChange}
                    />
                  ) : (
                    localPost.body
                  )}
                </td>
                <td style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                  {editingPost ? (
                    <>
                      <button
                        onClick={handleSaveEdit}
                        className="btn btn-success"
                        disabled={isSaving}
                      >
                        {isSaving ? "Saving..." : "Save"}
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="btn btn-secondary"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => handleEdit(localPost)}
                      className="btn btn-warning"
                    >
                      Edit
                    </button>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EditItem;
