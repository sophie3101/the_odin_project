export const createHeader = () => {
  let header = document.createElement("header");

  header.innerHTML = `<div class="header">
                      <h1>Welcome To Beta CoffeeShop </h1>
                        <nav class="navigation">
                          <a href="#" class="navbar-logo"></a>                    
                          <ul class="navbar">
                            <li ><a href="">Home</a></li>
                            <li><a href="">Menu</a></li>
                            <li><a href="">Contact</a></li>
                          </ul>
                        </nav>
                      </div>`;

  document.body.appendChild(header);
};

export const addLogo = (imgUrl) => {
  let img = document.createElement("img");
  img.src = imgUrl;
  document.querySelector(".navbar-logo").appendChild(img);
};

export const addVideo = (videoUrl) => {
  let videoContainer = document.createElement("div");
  videoContainer.classList.add("video-container");
  videoContainer.innerHTML = `<video autoplay loop muted id="video-bg">
                                <source src=${videoUrl} type="video/mp4">
                             </video>`;

  let headerDiv = document.querySelector(".header");
  headerDiv.appendChild(videoContainer);
};
