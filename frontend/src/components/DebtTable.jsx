import React, { useEffect, useState } from 'react';
import { expenseAPI } from '../api/services';

const DebtTable = ({ expenseId }) => {
  const [debts, setDebts] = useState([]);

  useEffect(() => {
    expenseAPI.calculateDebts(expenseId).then((res) => setDebts(res.data));
  }, [expenseId]);

  return (
    <div className="bg-white shadow rounded-lg p-6 mt-4">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Borç Dağılımı</h3>
      {debts.length === 0 ? (
        <p className="text-gray-500">Hesaplanmış bir borç bulunmamaktadır.</p>
      ) : (
        <table className="min-w-full table-auto text-left border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-gray-600 font-medium">Kim Ödeyecek</th>
              <th className="px-4 py-3 text-gray-600 font-medium">Kime Ödeyecek</th>
              <th className="px-4 py-3 text-gray-600 font-medium text-right">Tutar</th>
            </tr>
          </thead>
          <tbody>
            {debts.map((debt, index) => (
              <tr key={index} className="border-b hover:bg-gray-50 transition">
                <td className="px-4 py-3 text-red-500 font-medium">Kullanıcı {debt.fromUserId.substring(0,6)}</td>
                <td className="px-4 py-3 text-green-500 font-medium">Kullanıcı {debt.toUserId.substring(0,6)}</td>
                <td className="px-4 py-3 font-bold text-right">{debt.amount.toFixed(2)} ₺</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DebtTable;
