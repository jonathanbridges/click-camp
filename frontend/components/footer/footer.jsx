import React from 'react';

const Footer = () => {

  return (
    <footer>
      <div className="footer-wrapper">
        <section className="main-footer">
          <div className="footer-content">
            <div className="footer-left">
              <big>ClickCamp is everywhere you want to camp.</big>
              <p>Discover unique experiences on ranches, nature preserves, farms, vineyards, and public campgrounds across the U.S. Book tent camping, treehouses, cabins, yurts, primitive backcountry sites, car camping, airstreams, tiny houses, RV camping, glamping tents and more.</p>
            </div>
            <div className="footer-right"></div>
          </div>
        </section>
        <section className="footer-secondary">
          <div className="footer-secondary-content">
            <div className="footer-secondary-left">
              <p>Made in California.</p>
            </div>
            <div className="footer-secondary-right">
              <p>©2019 Jonathan Bridges</p>
            </div>
          </div>
        </section>
      </div>
    </footer>
  );

}

export default Footer;
