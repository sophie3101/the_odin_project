const Favicon = (src) => {
  let link = document.createElement("link");
  link.rel = "shortcut icon";
  link.href = src;
  link.type = "image/x-icon";
  console.log("get favicon");

  return link;
};

export default Favicon;
