import React from 'react';
import './Promo.css';
import { RiFilePdfLine, RiLinksLine, RiDownloadCloud2Line } from 'react-icons/ri';

const Promo = () => {
  return (
    <>
      <div className='ad-cont'>
        <div className='ad-text'>
          <h1>OnePDF: <br />Merge PDFs Effortlessly</h1>
          <p>Combine multiple PDFs into a single file with ease.<br />
             Fast, organized, and secure merging right in your browser.</p>
        </div>
        <div className='ad-img'>
          <img src='/images/ad.svg' alt="OnePDF Preview" />
        </div>
      </div>

      <div className="usecases-cont">
        <h2>What can you do with OnePDF?</h2>
        <div className="usecases-cards">
          <div className="usecase-card">
            <RiFilePdfLine size={30} className="usecase-icon" />
            <h3>Easy Upload</h3>
            <p>Drag and drop your PDF files or browse to select them in seconds.</p>
          </div>
          <div className="usecase-card">
            <RiLinksLine size={30} className="usecase-icon" />
            <h3>Reorder Quickly</h3>
            <p>Arrange your PDFs in any order before merging with a simple interface.</p>
          </div>
          <div className="usecase-card">
            <RiDownloadCloud2Line size={30} className="usecase-icon" />
            <h3>Instant Download</h3>
            <p>Download your merged PDF immediately without waiting or sign-ups.</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Promo;
