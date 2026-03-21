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
                                    <a aria-label="facebook" href="https://www.instagram.com/_qzadji_/?igsh=bGx3djFjeHhheTFm#" target="_blank" class="social-icon">
                                        <i class="fa-brands fa-facebook"></i>
                                    </a>
            
                                    <a aria-label="github" href="https://github.com/KadirYazadzhi" target="_blank" class="social-icon">
                                        <i class="fa-brands fa-github"></i>
                                    </a>
            
                                    <a aria-label="website" href="https://kadiryazadzhi.tech" target="_blank" class="social-icon">
                                        <i class="fa-solid fa-globe"></i>
                                    </a>
            
                                    <a aria-label="insgram" href="https://www.instagram.com/_qzadji_/?igsh=bGx3djFjeHhheTFm#" target="_blank" class="social-icon">
                                        <i class="fa-brands fa-instagram"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
        
                        <div class="footer-items">
                            <h3>Courses</h3>
        
                            <div class="items">
                                <a href="course.html?title=Algorithm%20Fundamentals%20with%20C%23">Algorithm Fundamentals with C#</a>
                                <a href="course.html?title=Data%20Structures%20Fundamentals">Data Structures Fundamentals</a>
                                <a href="course.html?title=Programming%20Basics%20with%20C%2B%2B">Programming Basics with C++</a>
                                <a href="course.html?title=Software%20Technologies">Software Technologies</a>
                                <a href="course.html?title=Database">Database</a>
                                <a href="course.html?title=MySQL">MySQL</a>
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
                                <a href="blog.html?id=2">Clean Code Principles</a>
                                <a href="blog.html?id=1">OOP Programming</a>
                                <a href="blog.html?id=3">Phishing Attack</a>
                                <a href="blog.html?id=4">Pentesting Basics</a>
                                <a href="language.html">Javascript</a>
                            </div>
        
                        </div>
        
                    </div>
                </section>
        
                <div class="plus-part">
                    <p class="copyright-text"></p>
                </div>
           </footer>
        `;

    this.querySelector(".copyright-text").innerHTML = `Copyright © ${new Date().getFullYear()} - All rights reserved || Designed By: <a href="https://kadiryazadzhi.me" target="_blank" class="footer-name-link">Kadir Yazadzhi</a>`;
}
}
customElements.define('my-footer', Footer);