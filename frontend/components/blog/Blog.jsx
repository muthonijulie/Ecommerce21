import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa"; 
import styles from "./Blog.module.css"; // Importing the CSS module
import Acne from "../../src/assets/blog/Acne.jpg"
import Simple from "../../src/assets/blog/Simple.jpeg"
import SkinType from "../../src/assets/blog/SkinType.jpeg"
import Men from "../../src/assets/blog/Men.jpeg"

const blogPosts = [
  {
    id: 1,
    image: Acne,
    title: "Getting rid of acne and blemishes",
    description:
      "It just takes time and effort to improve your skin and remove texture...",
    date: "12/02",
  },
  {
    id: 2,
    image: Simple,
    title: "Simple will always be Best!",
    description:
      "A simple and minimal routine is always best because it is easier to follow...",
    date: "12/02",
  },
  {
    id: 3,
    image: SkinType,
    title: "Know your skin type!",
    description:
      "Different skin types have different needs. Knowing your skin type allows...",
    date: "12/02",
  },
  {
    id: 4,
    image: Men,
    title: "Don't worry gents, We got you",
    description:
      "Men are embracing skincare more and more. It can be intimidating at first...",
    date: "12/02",
  },
];

const BlogSection = () => {
  return (
    <section className={styles.blog}>
      {blogPosts.map((post) => (
        <div key={post.id} className={styles.blogBox}>
          <div className={styles.blogImg}>
            <img src={post.image} alt={post.title} />
          </div>
          <div className={styles.blogDetails}>
            <h4>{post.title}</h4>
            <p>{post.description}</p>
            <a href="#">CONTINUE READING</a>
          </div>
          <h1>{post.date}</h1>
        </div>
      ))}
      <div className={styles.pagination}>
  <a href="#">1</a>
  <a href="#">2</a>
  <a href="#">
    <FaLongArrowAltRight />
  </a>
</div>
    </section>
  );
};

export default BlogSection;
