export const addFavicon = (src) => {
  let link = document.createElement("link");
  link.rel = "shortcut icon";
  link.href = src;
  link.type = "image/x-icon";

  document.head.appendChild(link);
};

export const addFooter = () => {
  let link = document.createElement("link");
  link.rel = "stylesheet";
  link.href =
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css";
  document.head.appendChild(link);

  let footer = document.createElement("footer");
  footer.innerHTML = `
  <p>
    Copyright &#169;
    <script>
      document.write(new Date().getFullYear());
    </script>
    by Sophie Nguyen
    <a
      href="https://github.com/sophie3101/the_odin_project/tree/main/03_intermediate_javascript/02_tictactoe"
      ><i style="font-size: 24px; color: rgb(50, 50, 50)" class="fa"
        >&#xf09b;</i
      ></a
    >
</p>`;
  document.body.append(footer);
};
