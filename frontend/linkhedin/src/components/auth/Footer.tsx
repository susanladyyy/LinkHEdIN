import React from 'react'

export default function Footer() {
    return (
        <>
            <div className="authFooter">
                <div className="image-copyright">
                    <img src="src/assets/linkhedin_logo_full.svg" alt="not found" />
                    <p>&copy; 2021</p>
                </div>
                <div className="useful-footer-sites">
                    <ul>
                        <li><a href="https://about.linkedin.com/?trk=registration_footer-about">About</a></li>
                        <li><a href="https://www.linkedin.com/accessibility?trk=registration_footer-accessibility">Accessibility</a></li>
                        <li><a href="https://www.linkedin.com/legal/copyright-policy?trk=registration_footer-copyright-policy">Copyright Policy</a></li>
                        <li><a href="https://brand.linkedin.com/policies?trk=registration_footer-brand-policy">Brand Policy</a></li>
                        <li><a href="https://www.linkedin.com/legal/professional-community-policies?trk=registration_footer-community-guide">Community Guidelines</a></li>
                    </ul>
                </div>
            </div>
        </>
    )
}
