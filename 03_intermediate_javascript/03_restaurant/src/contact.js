import "./styles/contact.css";
export const addContactSection = () => {
  const contactSection = document.createElement("section");
  contactSection.classList.add("contact");
  // contactSection.style.display = "none";

  contactSection.innerHTML = `
    <div class="address-container"
    <address>
      <p> <i class="fa fa-coffee"></i> XXXX Street, YY State, USA</p>
      <p><i class="fa fa-clock-o"></i> M-F: 8am:8pm </p>
      <a href="mailto:beta_coffee@gmail.com">beta_coffee@gmail.com</a><br>
      <a href="tel:+1888888888">(888) 888-888</a>
    </address>
    </div>
    <div class="form-container">
        <h1>Eat with us</h1>
        <form action="#" >
            <input type="text" placeholder="Your name" required/>
            <input type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="Your phone number" required/>           
            <input type="email" pattern=".+@globex\.com" placeholder="Your email" />
            <input type="datetime-local" required>
            <div ><input type="submit" value="Make Reservation"></div>
        </form>   
    </div>

    <div class="map-container">
        <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13862.102840568103!2d-95.5495943!3d29.7045276!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640c30886ef3055%3A0xee7a2a2813660adf!2sTiger%20Sugar!5e0!3m2!1sen!2sus!4v1681276592079!5m2!1sen!2sus"  allowfullscreen="true" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>
  `;

  let main = document.querySelector("main");
  main.innerHTML = "";
  main.appendChild(contactSection);
};
