import { FaGithub, FaItchIo, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-left">
        <p>Made by Shourjo Maitra 🖤</p>
      </div>

      <div className="footer-middle">
        <p>Your file is processed entirely in your browser and never leaves your device.</p>
      </div>

      <div className="footer-right">
        <p>Check out my other stuff 👇</p>
        <div className="footer-links">
          <a href="https://linkedin.com/in/shourjo-maitra" target="_blank" rel="noreferrer">
            <FaLinkedin size={16} /> LinkedIn
          </a>
          <a href="https://wolffire21.itch.io/" target="_blank" rel="noreferrer">
            <FaItchIo size={16} /> itch.io
          </a>
          <a href="https://github.com/Wolffang021" target="_blank" rel="noreferrer">
            <FaGithub size={16} /> GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}