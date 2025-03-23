import React from "react";
import { Link } from "react-router-dom"; // Link for navigation
import "./Policy.css";

function PrivacyPolicy() {
  return (<>
    <div className="container privacy-policy-page">
      <h1 className="text-center mt-5">Privacy Policy</h1>
      <div className="content mt-4">
        <section className="section1">
          <h3 className="inf">Introduction</h3>
          <p className="para">
            At MyShopify, we value your privacy and are committed to protecting your personal data. This Privacy Policy outlines the types of personal information we collect, how we use it, and the measures we take to safeguard your data. By using our website and services, you agree to the collection and use of information in accordance with this policy.
          </p>
        </section>

        <section className="section1">
          <h3  className="inf">Information Collection</h3>
          <p className="para">
            We collect several types of information for various purposes to provide and improve our services to you.
          </p>
          <ul className="ull">
            <li className="lii"><strong>Personal Data:</strong> While using our services, we may ask you to provide certain personally identifiable information, including but not limited to your name, email address, phone number, and shipping address.</li>
            <li  className="lii"><strong>Usage Data:</strong> We may also collect information on how you access and use our website, such as your IP address, browser type, and other diagnostic data.</li>
            <li  className="lii"><strong>Cookies:</strong> We use cookies to track activity on our site and improve user experience. Please see our Cookies section for more information.</li>
          </ul>
        </section>

        <section className="section1">
          <h3 className="inf">How We Use Your Information</h3>
          <p className="para">
            The information we collect is used in various ways, including:
          </p>
          <ul className="ull">
            <li className="lii">To provide, operate, and maintain our website and services.</li>
            <li className="lii">To personalize and improve your experience.</li>
            <li className="lii">To communicate with you, including responding to your inquiries and sending promotional emails (if you opt-in).</li>
            <li className="lii">To comply with legal obligations and protect our rights.</li>
          </ul>
        </section>

        <section className="section1">
          <h3 className="inf">Cookies</h3>
          <p className="para">
            Cookies are small files that are placed on your device to improve user experience. We use cookies to collect data and track activity on our website. You can choose to disable cookies in your browser settings, but this may affect some features of the website.
          </p>
        </section>

        <section className="section1">
          <h3 className="inf">Your Rights</h3>
          <p className="para">
            As Link user, you have the following rights concerning your personal data:
          </p>
          <ul className="ull">
            <li className="lii"><strong>Access:</strong> You can request access to the personal data we hold about you.</li>
            <li className="lii"><strong>Correction:</strong> You can request that we correct any inaccurate data.</li>
            <li className="lii"><strong>Deletion:</strong> You can request that we delete your personal data.</li>
            <li className="lii"><strong>Opt-Out:</strong> You can opt-out of receiving promotional communications from us at any time.</li>
            <li className="lii"><strong>Data Portability:</strong> You have the right to request Link copy of your data in Link machine-readable format.</li>
          </ul>
        </section>

        <section className="section1">
          <h3 className="inf">Data Security</h3>
          <p className="para">
            We take the security of your personal information seriously. We use Link variety of security measures to protect your data, including encryption, firewalls, and secure servers. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section className="section1">
          <h3 className="inf"> Third-Party Services</h3>
          <p className="para">
            We may share your personal information with trusted third-party service providers to help us operate our website and services. These third parties are obligated to maintain the confidentiality of your data. We may also share data to comply with legal obligations, enforce our terms, or protect our rights.
          </p>
        </section>

        <section className="section1">
          <h3 className="inf">Changes to This Privacy Policy</h3>
          <p className="para">
            We may update our Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date. We encourage you to review this Privacy Policy periodically for any updates.
          </p>
        </section>

        <section className="section1">
          <h3 className="inf">Contact Us</h3>
          <p className="para">
            If you have any questions or concerns about this Privacy Policy or how we handle your personal information, please contact us at:
          </p>
          <ul className="ull">
            <li className="lii">Email: <Link href="mailto:support@example.com">myshopify@example.com</Link></li>
            <li className="lii">Phone: +91 8929935892</li>
            <li className="lii">Address: 123 Ecommerce St, City, Country</li>
          </ul>
        </section>
      </div>
    </div>
  
    </>
  );
}

export default PrivacyPolicy;
