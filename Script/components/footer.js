class Footer extends HTMLElement {
connectedCallback() {
    this.innerHTML = `
           <footer>
                <section class="section footer">
                    <div class="top-section">
                        <div class="top-section-left">
                            <h3>Subscribe for Updates</h3>
                            <p class="paragraph-small">Enter your email address to receive notifications whenever we publish new
                                content!</p>
                        </div>
        
                        <div class="top-section-right">
                            <input class="email-input contact-input" type="email" name="email" placeholder="Enter your email">
                            <input class="submit-email-value btn contact-button btn-inline btn-darken" type="submit"
                                value="Send">
                        </div>
                    </div>
        
                    <div class="bottom-section">
                        <div class="left-bottom-part">
                            <div class="contact-part">
                                <h3>Kadir's Digital Garden</h3>
        
                                <div class="icons-box">
                                    <i class="fa-solid fa-location-dot"></i>
                                    <p>Bulgaria</p>
                                </div>
        
                                <div class="icons-box">
                                    <i class="fa-solid fa-envelope"></i>
                                    <p>kadiryazadzhi@gmail.com</p>
                                </div>
                            </div>
        
                            <div class="social-part">
                                <h3>Social Media</h3>
        
                                <div class="social-icons">
                                    <div class="social-icon">
                                        <i class="fa-brands fa-facebook"></i>
                                    </div>
        
                                    <div class="social-icon">
                                        <i class="fa-brands fa-github"></i>
                                    </div>
        
                                    <div class="social-icon">
                                        <i class="fa-solid fa-globe"></i>
                                    </div>
        
                                    <div class="social-icon">
                                        <i class="fa-brands fa-instagram"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
        
                        <div class="footer-items">
                            <h3>Courses</h3>
        
                            <div class="items">
                                <p>Algorithm Fundamentals with C#</p>
                                <p>Data Structures Fundamentals</p>
                                <p>Programming Basics with C++</p>
                                <p>Software Technologies</p>
                                <p>Database</p>
                                <p>MySQL</p>
                            </div>
                        </div>
        
                        <div class="footer-items">
                            <h3>Tools</h3>
        
                            <div class="items">
                                <p>Hydra</p>
                                <p>Medusa</p>
                                <p>Metasploit</p>
                                <p>Nmap</p>
                                <p>Netexec</p>
                                <p>BurpSuite</p>
                            </div>
        
                        </div>
        
                        <div class="footer-items">
                            <h3>Blogs</h3>
        
                            <div class="items">
                                <p>Clean Code Principles</p>
                                <p>OOP Programming</p>
                                <p>Phishing Attack</p>
                                <p>Pentesting Basics</p>
                                <p>Javascript</p>
                            </div>
        
                        </div>
        
                    </div>
                </section>
        
                <div class="plus-part">
                    <p class="copyright-text"></p>
                </div>
           </footer>
        `;

    this.querySelector(".copyright-text").innerHTML = `Copyright © ${new Date().getFullYear()} - All rights reserved || Designed By: Kadir Yazadzhi`;
}
}
customElements.define('my-footer', Footer);