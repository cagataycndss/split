import React from 'react';

const DebtTable = ({ expenses }) => {
  if (!expenses || expenses.length === 0) {
    return (
      <div className="bg-white p-6 mt-4">
        <p className="text-gray-500 text-center">Henüz bu gruba harcama eklenmedi.</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg p-6 mt-4">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Son Eklenen Harcamalar</h3>
      <table className="min-w-full table-auto text-left border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 text-gray-600 font-medium">Başlık</th>
            <th className="px-4 py-3 text-gray-600 font-medium">Kategori</th>
            <th className="px-4 py-3 text-gray-600 font-medium text-right">Tutar</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((exp, index) => (
            <tr key={index} className="border-b hover:bg-gray-50 transition">
              <td className="px-4 py-3 text-blue-600 font-medium">{exp.title}</td>
              <td className="px-4 py-3 text-gray-500 font-medium">{exp.items && exp.items.length > 0 ? exp.items[0].category : 'Genel'}</td>
              <td className="px-4 py-3 font-bold text-right text-green-600">{exp.totalAmount.toFixed(2)} ₺</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <div className="mt-6 p-4 bg-indigo-50 rounded-lg border border-indigo-100">
        <p className="text-sm text-indigo-800"><strong>Bilgi:</strong> Yapay zeka ile fiş okuttuğunda veya manuel masraf eklediğinde tutarlar yukarıya anında yansır. Üyeler eklendikçe Splitbro algoritması otomatik borçlandırma yapacaktır.</p>
      </div>
    </div>
  );
};

export default DebtTable;
