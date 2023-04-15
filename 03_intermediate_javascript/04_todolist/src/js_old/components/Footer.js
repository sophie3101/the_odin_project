const Footer = () => {
  let footer = document.createElement("footer");
  footer.innerHTML = `
  <p>
    Copyright &#169;
    <script>
      document.write(new Date().getFullYear());
    </script>
    by Sophie Nguyen
    <a
      href="https://github.com/sophie3101/the_odin_project/tree/main/03_intermediate_javascript/04_todolist">
      <i class="fa-brands fa-github" style="color: #09172f;"></i>
    </a>
</p>`;

  return footer;
};

export default Footer;
