import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader/loader";
import { PageClickEvent } from "../interfaces";
import useGetPost from "../queries/useGetPost";
const ItemList = () => {
  const { data: posts, isLoading } = useGetPost();
  const navigate = useNavigate();

  const [dataOffset, setDataOffset] = useState<number>(0);
  const datasPerPage = 10;

  // Pagination variables
  const endOffset = dataOffset + datasPerPage;
  const currentItems = posts?.slice(dataOffset, endOffset);
  // Ensure posts is treated as an array when calculating pageCount
  const pageCount = Math.ceil((posts?.length ?? 0) / datasPerPage);

  const handlePageClick = (event: PageClickEvent) => {
    // Calculate new data offset based on pagination
    const newOffset = (event.selected * datasPerPage) % (posts?.length ?? 0);
    setDataOffset(newOffset);
  };

  const handleItemClick = (id?: number) => {
    navigate(`/item/${id}`);
  };


  return (
    <div className="container">
      <h1>Posts</h1>
      <div className="flex-colum">
        <div className="flex-large">
          <table>
            <thead>
              <tr>
                <th>Body</th>
                <th>Title</th>
                <th>Id</th>
              </tr>
            </thead>

            {isLoading ? (
              <div className="loader-container">
                <Loader />
              </div>
            ) : (
              <>
                <tbody>
                  {currentItems && currentItems.length > 0 ? (
                    currentItems.map((post) => (
                      <tr
                        onClick={() => handleItemClick(post?.id)}
                        key={post.id}
                      >
                        <td className="post-body">{post.body}</td>
                        <td className="post-body">{post.title}</td>
                        <td className="post-body">{post.id}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3}>No Users....</td>
                    </tr>
                  )}
                </tbody>
                <tfoot>
                  <p>
                    <span>
                      {" "}
                      {endOffset} / {posts?.length}
                    </span>{" "}
                    Total Per Page
                  </p>

                  <ReactPaginate
                    breakLabel="..."
                    nextLabel="&rarr;"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel="&larr;"
                    renderOnZeroPageCount={null}
                    containerClassName="pagination"
                    pageLinkClassName="page-num"
                    previousLinkClassName="page-num"
                    nextLinkClassName="page-num"
                    activeLinkClassName="active"
                  />
                </tfoot>
              </>
            )}
          </table>
        </div>
      </div>
    </div>
  );
};

export default ItemList;
