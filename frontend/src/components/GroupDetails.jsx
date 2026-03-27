import React, { useState } from 'react';
import ExpenseForm from './ExpenseForm';
import DebtTable from './DebtTable';

const GroupDetails = ({ groupId, groupName }) => {
  const [expenses, setExpenses] = useState([]);

  const handleExpenseAdded = (newExpense) => {
    setExpenses([newExpense, ...expenses]);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="bg-white shadow-sm rounded-xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">{groupName || 'Harcama Grubu'}</h1>
            <p className="text-gray-500 mt-2">Grup içi masrafları yönetin, ürünleri onaylayın ve borç durumunu görün.</p>
          </div>
          <button className="mt-4 md:mt-0 bg-red-50 text-red-600 px-5 py-2 font-medium rounded-lg hover:bg-red-100 transition border border-red-100">Grubu Sil</button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sol Kolon - Gider Ekleme Formu */}
          <div className="lg:col-span-5">
            <ExpenseForm groupId={groupId} onExpenseAdded={handleExpenseAdded} />
          </div>

          {/* Sağ Kolon - Ortak Borç Durumu */}
          <div className="lg:col-span-7">
             <div className="bg-white shadow-sm rounded-xl p-6 h-full">
               <h2 className="text-2xl font-bold mb-4 text-gray-800 border-b pb-2">Hesap Özeti</h2>
               <DebtTable expenses={expenses} />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupDetails;
