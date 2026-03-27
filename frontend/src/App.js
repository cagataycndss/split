import React, { useEffect, useState } from 'react';
import GroupDetails from './components/GroupDetails';
import { authAPI, groupAPI } from './api/services';

function App() {
  const [ready, setReady] = useState(false);
  const [groupId, setGroupId] = useState(null);

  useEffect(() => {
    const initDemo = async () => {
      // Daha önce oluşturulmuş demo verileri varsa direkt onları kullan (sayfa yenileme desteği)
      const savedGroupId = localStorage.getItem('demo_group_id');
      const token = localStorage.getItem('token');
      
      if (savedGroupId && token) {
        setGroupId(savedGroupId);
        setReady(true);
        return;
      }

      try {
        const credentials = { email: 'demo@splitbro.com', password: 'password123', firstName: 'Demo', lastName: 'User' };
        let res;
        
        // Önce giriş yapmayı dene, kullanıcı yoksa kayıt ol
        try {
          res = await authAPI.login(credentials);
        } catch (e) {
          res = await authAPI.register(credentials);
        }
        
        // Token'ı kaydet (Axios interceptor otomatik alacak)
        localStorage.setItem('token', res.data.token);
        
        // Orijinal bir Mongoose ObjectId'sine sahip geçerli bir grup oluştur
        const groupRes = await groupAPI.create({ name: 'Ankara Tatili (Demo)', description: 'Uygulama Test Grubu' });
        const newGroupId = groupRes.data._id || groupRes.data.id;
        
        localStorage.setItem('demo_group_id', newGroupId);
        setGroupId(newGroupId);
        setReady(true);
      } catch (err) {
        console.error("Demo baslatilirken hata (Backend kapali olabilir):", err);
        alert("Bağlantı hatası: Lütfen Vercel backend adresinizi ve MongoDB bağlantınızı kontrol edin.");
      }
    };
    
    initDemo();
  }, []);

  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-xl text-gray-500 font-medium animate-pulse">
          Bağlantı kuruluyor (Vercel Serverless sistemi uyanıyor olabilir)... 💤
        </p>
      </div>
    );
  }

  return (
    <div className="App">
      <GroupDetails groupId={groupId} groupName="Ankara Tatili (Demo)" />
    </div>
  );
}

export default App;
