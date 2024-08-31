import React from 'react';
import { useSecret } from './SecretContext';

import "../../style/secret.css"

const Secret = () => {
  const { secrets, setSecret, getSecret} = useSecret();
  if(Object.keys(secrets).length === 1 && !getSecret("pageSecret")){
    setSecret("pageSecret", true, "mais...qui a mis ça....", "La page Secret")
  }

  return (
    <div className='main-container'>
      <div className='secret-box'>
        <h2>Les secret</h2>
        {!secrets || Object.keys(secrets).length === 0 ? (
            <p>Cette page ne sert a rien.</p>
        ) : (
            <ul>
                {Object.keys(secrets).map((key) => (
                  <div>
                  {key !== "pageSecret" ? (
                  <li key={key}>
                    <strong>{secrets[key].title}:</strong><div className='secret-description'>{secrets[key].description}</div>
                  </li>
                  ) : (
                    <></>
                  )}
                  </div>
                ))}
            </ul>
        )}
      </div>
    </div>
  );
};

export default Secret;
