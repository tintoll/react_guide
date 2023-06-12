import NewPost from "./NewPost";
import Post from "./Post";
import classes from "./PostList.module.css";
export default function PostList() {
  return (
    <>
      <NewPost />
      <ul className={classes.posts}>
        <Post author="Max" body="React" />
        <Post author="Hani" body="Vue" />
      </ul>
    </>
  );
}
