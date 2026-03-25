import { useState, useEffect } from 'react';

export default () => {
  const [clubs, setClubs] = useState<any[]>(() => 
    JSON.parse(localStorage.getItem('th5_clubs') || '[]')
  );
  const [apps, setApps] = useState<any[]>(() => 
    JSON.parse(localStorage.getItem('th5_apps') || '[]')
  );

  useEffect(() => {
    localStorage.setItem('th5_clubs', JSON.stringify(clubs));
    localStorage.setItem('th5_apps', JSON.stringify(apps));
  }, [clubs, apps]);

  return { clubs, setClubs, apps, setApps };
};