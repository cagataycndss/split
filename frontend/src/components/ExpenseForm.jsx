import React, { useState } from 'react';
import { expenseAPI } from '../api/services';

const ExpenseForm = ({ groupId, onExpenseAdded }) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleManualSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await expenseAPI.createManual(groupId, { title, totalAmount: Number(amount) });
      onExpenseAdded();
      setTitle(''); setAmount('');
    } catch (err) {
      alert("Harcama eklenirken hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  const handleAiScan = async () => {
    if (!file) return alert("Lütfen fiş görseli seçin.");
    setLoading(true);
    const formData = new FormData();
    formData.append('receiptImage', file);
    try {
      await expenseAPI.scanAI(groupId, formData);
      onExpenseAdded();
      setFile(null);
    } catch(err) {
      alert("AI okumada hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 w-full max-w-xl mx-auto mt-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Yeni Gider Ekle</h2>
      
      <form onSubmit={handleManualSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Başlık</label>
          <input type="text" className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none" value={title} onChange={e => setTitle(e.target.value)} required />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Tutar (₺)</label>
          <input type="number" className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none" value={amount} onChange={e => setAmount(e.target.value)} required />
        </div>
        <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition shadow-sm">
          {loading ? 'Ekleniyor...' : 'Manuel Ekle'}
        </button>
      </form>

      <div className="my-8 border-t border-gray-200 relative">
        <span className="absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-gray-400 text-sm">VEYA</span>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold text-gray-700">Yapay Zeka ile Fiş Oku</h3>
        <p className="text-sm text-gray-500">Fişinizin fotoğrafını yükleyin, AI otomatik çıkarsın.</p>
        <input type="file" onChange={e => setFile(e.target.files[0])} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 transition cursor-pointer" />
        <button onClick={handleAiScan} disabled={loading} className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-700 transition shadow-sm flex justify-center items-center">
           {loading ? 'AI Tarıyor...' : 'Fiş Tarayıp Otomatik Ekle'}
        </button>
      </div>
    </div>
  );
};

export default ExpenseForm;
