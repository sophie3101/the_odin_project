import "./styles/home.css";
const images = [
  {
    url: require("./images/harvest.jpg"),
    caption: "We harvest best quality beans",
  },
  {
    url: require("./images/prep.jpg"),
    caption: "We prioritize best customer service",
  },
  {
    url: require("./images/beans.jpg"),
    caption: "We roast inhouse",
  },
  {
    url: require("./images/acup.jpg"),
    caption: "Best quality",
  },
  {
    url: require("./images/farmer.jpg"),
    caption: "We care about our community",
  },
];
const customerNames = "ABCDEFGHIJKLMN".split("");
const quotes = [
  "Lyrically sweet, stunningly deep, engagingly complex. Dried black cherry, black sage, wild honey sandalwood, honeysuckle in aroma and cup",
  "First time visiting this spot. It was very clean with a chill atmosphere. I can't give 5☆ though because I didn't try anything, my Wife did. Based off of the few sips I had from my wife's drink though, it was very tasty and not to sweet, exactly how I like it",
  "I’m sorry KungFu Tea would never. The Oreo drink was not worth it…more ice than actually drink. The bathroom was nasty, walking in there I immediately felt my shoes stick to the ground. Boxes were everywhere in the back. Unfriendly staff, would not recommend.",
];
const addHomeSection = () => {
  const homeSection = document.createElement("section");
  homeSection.classList.add("home");

  document.querySelector("main").appendChild(homeSection);
  createImageSlider(images);
  createTestimonialSlick();
};

const createImageSlider = (imgs) => {
  let slideContainer = document.createElement("div");
  slideContainer.classList.add("slideshow-container");
  // slideContainer.classList.add("fade");
  // shuffle
  imgs = imgs.sort(() => (Math.random() > 0.5 ? 1 : -1));

  imgs.forEach((img, imgIndex) => {
    let slideDiv = document.createElement("div");
    slideDiv.classList.add("mySlides");
    slideDiv.innerHTML = `
    <img src="${img.url}" alt="Image ${imgIndex}">
    <div class="image-caption">${img.caption}</div>
    `;
    slideContainer.appendChild(slideDiv);
  });
  // add dot
  let navigationSlider = document.createElement("div");
  navigationSlider.classList.add("image-slider-navigation");
  imgs.forEach((img, imgIndex) => {
    let slideDiv = document.createElement("span");
    slideDiv.innerHTML = `<span class="dot" data-image-idx=${imgIndex}></span>`;
    navigationSlider.appendChild(slideDiv);
  });

  const home = document.querySelector(".home");
  const imageSliderDiv = document.createElement("div");
  imageSliderDiv.className = "image-slide-container";
  imageSliderDiv.appendChild(slideContainer);
  imageSliderDiv.appendChild(navigationSlider);
  home.appendChild(imageSliderDiv);

  // show image slider
  showSlides(0);
};

const showSlides = (imageIndex = 0) => {
  let slides = document.querySelectorAll(".mySlides");
  let dots = document.querySelectorAll(".dot");

  // set display:none by default
  dots.forEach((dot) => {
    dot.classList.remove("active-dot");
    dot.onclick = (e) => {
      const selectedImgIndex = e.target.dataset.imageIdx;
      console.log("click image idx ", selectedImgIndex);
      showSlides(Number(selectedImgIndex));
    };
  });

  slides.forEach((slide, index) => {
    slide.style.display = "none";
  });

  slides[imageIndex].style.display = "block";
  dots[imageIndex].classList.add("active-dot");
  // if (imageIndex > slides.length - 1) imageIndex = 0; // reset
  // imageIndex++;
};

const createTestimonialSlick = () => {
  let testimonialDiv = document.createElement("div");
  testimonialDiv.className = "testimonial";

  quotes.forEach((quote, quoteIdx) => {
    let quoteDiv = document.createElement("div");
    quoteDiv.className = "blockquote-container";
    quoteDiv.innerHTML = `<blockquote ><p>${quote}</p> <span>Customer ${customerNames[quoteIdx]}</span></blockquote>`;
    testimonialDiv.appendChild(quoteDiv);
  });
  document.querySelector(".home").appendChild(testimonialDiv);
};
export { addHomeSection };
