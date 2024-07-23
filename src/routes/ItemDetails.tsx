import React, { useState, useEffect } from "react";
import Loader from "../components/Loader/loader";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deletePost } from "../services";
import useGetPostDetails from "../queries/useGetPostDetails";
import { PostTypes } from "../interfaces";

const ItemDetails = () => {
  const { id } = useParams();
  const parsedId = parseInt(id ?? "0");
  const { data: post, isLoading } = useGetPostDetails({ id: parsedId });
  const [localPost, setLocalPost] = useState<PostTypes | null>(post);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLocalPost(post);
  }, [post]);

  const handleDeletePost = async (id?: number) => {
    if (!id) return;

    setIsDeleting(true);
    try {
      await deletePost(id);
      // Update local state to reflect deletion
      setLocalPost(null);
    } catch (error) {
      console.error("Error deleting post:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEdit = (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent the event from bubbling up to the row click
    navigate(`/edit/${id}`);
  };

  if (isLoading) {
    return (
      <div className="loader-container">
        <Loader />
      </div>
    );
  }

  if (!localPost) {
    return (
      <div className="container">
        <h1>No Post Available</h1>
        <p>The post has been deleted or does not exist.</p>

        <p>
          go back <Link to={"/"}>Posts</Link>
        </p>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Post Details</h1>
      <div className="flex-column">
        <div className="flex-large">
          <table>
            <thead>
              <tr>
                <th>Body</th>
                <th>Title</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="post-body" style={{ width: "70%" }}>
                  {localPost.body}
                </td>
                <td className="post-body">{localPost.title}</td>
                <td
                  style={{
                    display: "flex",
                    gap: "6px",
                    alignItems: "center",
                  }}
                >
                  <button onClick={handleEdit} className="btn btn-warning">
                    Edit
                  </button>

                  <button
                    onClick={() => handleDeletePost(localPost.id)}
                    className="btn btn-danger"
                  >
                    {isDeleting ? "Deleting..." : "Delete"}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;
