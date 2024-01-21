import React from 'react';
import { MdContentCopy } from 'react-icons/md';
import { FaShare } from 'react-icons/fa';

import './ShareLink.scss';

interface ShareLinkProps {
  children: string;
}

const ShareLink: React.FC<ShareLinkProps> = ({ children }) => {

  const copy = () => {
    // clipboard is undefined if connection is unsecure
    window.navigator.clipboard?.writeText(children)
  }

  return (
    <div className='share-link'>
      <p className='share-link__value'>{children}</p>

      <div className="share-link__buttons">
        <button className='share-link__button' onClick={copy}>
          <MdContentCopy size={'100%'} />
        </button>

        <button className='share-link__button'>
          <FaShare size={'100%'} />
        </button>
      </div>
    </div>
  );
};

export default ShareLink;
