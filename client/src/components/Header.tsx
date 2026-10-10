import { FaGithub } from "react-icons/fa";

export default function Header() {
  return (
    <header className="header">
      <h1>Who Unfollowed Me</h1>
      <p>See who you follow that doesn't follow you back.</p>
      <p>
        <a
          className="source-link"
          href="https://github.com/Wolffang021/Who-Unfollowed-Me"
          target="_blank"
          rel="noreferrer"
        >
          <FaGithub size={14} /> View source
        </a>
      </p>
    </header>
  );
}