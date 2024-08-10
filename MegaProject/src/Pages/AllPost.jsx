import React, { useEffect, useState } from "react";
import { Container, PostCard } from "../components";
import appwriteService from "../Appwrite/conf";

function AllPost() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch posts when the component mounts
    const fetchPosts = async () => {
      try {
        const response = await appwriteService.getPosts([]);
        if (response && response.documents) {
          console.log(response.documents);
          setPosts(response.documents);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []); // Empty dependency array ensures this runs only once

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard posts={post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPost;
