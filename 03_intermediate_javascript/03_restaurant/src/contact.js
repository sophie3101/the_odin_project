// import "bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/contact.css";
export const createContactPage = () => {
  const contactSection = document.createElement("section");
  contactSection.classList.add("contact");

  contactSection.innerHTML = `
    <div class="form-container">
        <h1>Contact us</h1>
        <form action="#" >
            <input type="text" placeholder="Subject" required=""/>
            <input type="text" placeholder="Your name" required=""/>
            <input type="email" placeholder="Your mail" required=""/>
            <textarea placeholder="Message" required=""></textarea>
            <div class="submit1"><input type="submit" value="submit"></div>
        </form>   
    </div>

    <div class="map-container">
        <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13862.102840568103!2d-95.5495943!3d29.7045276!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640c30886ef3055%3A0xee7a2a2813660adf!2sTiger%20Sugar!5e0!3m2!1sen!2sus!4v1681276592079!5m2!1sen!2sus"  allowfullscreen="true" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>
  `;
  //

  document.querySelector("main").appendChild(contactSection);
};
