import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Users } from 'lucide-react';

const Crowdfunding = () => {
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [totalRaised, setTotalRaised] = useState(0);
  const [contributors, setContributors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (amount <= 0) {
      setMessage('Please enter a valid amount.');
      return;
    }
    processPayment(amount);
  };

  const processPayment = (amount) => {
    console.log(`Processing payment of G₵${amount}`);
    setTotalRaised(prev => prev + parseFloat(amount));
    setContributors([...contributors, { id: contributors.length + 1, amount }]);
    setMessage(`Thank you for your contribution of G₵${amount}!`);
    setAmount('');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-500 via-teal-500 to-blue-600 p-4 md:p-8">

      {/* Header Section */}
      <motion.section className="text-center text-white mb-12" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-7xl font-extrabold mb-4 drop-shadow-lg tracking-wide">Empower Ideas 💡</h1>
        <p className="text-xl max-w-3xl mx-auto">Your contributions bring dreams to life. Every cedi makes a difference.</p>
      </motion.section>

      {/* Stats Section */}
      <motion.div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-lg text-center" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
        <h2 className="text-5xl font-bold mb-2 text-purple-600">G₵{totalRaised.toFixed(2)}</h2>
        <p className="text-gray-600">Total Raised</p>
        <div className="flex items-center justify-center gap-2 mt-4">
          <Users className="text-purple-500" />
          <p className="text-gray-500">Contributors: {contributors.length}</p>
        </div>
      </motion.div>

      {/* Form Section */}
      <motion.form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-lg mt-8" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
        <label className="block mb-4 text-lg font-semibold text-gray-700" htmlFor="amount">Enter Amount (GHS):</label>
        <input type="number" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-4 focus:ring-purple-300" required />
        <button type="submit" className="w-full mt-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg text-lg font-bold hover:scale-105 transform transition-transform">Contribute</button>
      </motion.form>

      {message && (<motion.p className="mt-4 text-green-500 text-lg" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><CheckCircle className="inline-block mr-2" />{message}</motion.p>)}

      {/* Contributors List */}
      <motion.div className="mt-8 bg-white p-6 rounded-3xl shadow-xl w-full max-w-lg" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h3 className="text-2xl font-bold mb-4 text-purple-600">Recent Contributors</h3>
        <ul className="text-gray-700">
          {contributors.slice(-5).map((c) => (
            <li key={c.id}>Contributor {c.id}: G₵{c.amount}</li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
};

export default Crowdfunding;