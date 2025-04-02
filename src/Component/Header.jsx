import { useState } from "react";
import { motion } from "framer-motion";

export default function CrowdfundingApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginDetails, setLoginDetails] = useState({ username: "", password: "", phone: "", otp: "" });
  const [generatedOTP, setGeneratedOTP] = useState(null);
  const [otpSent, setOtpSent] = useState(false);
  const [otpError, setOtpError] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [contributors, setContributors] = useState([]);
  const totalRaised = contributors.reduce((sum, c) => sum + c.amount, 0);

  const validatePassword = (password) => {
    const strongPasswordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    return strongPasswordRegex.test(password);
  };

  const sendOTP = () => {
    if (loginDetails.phone.length === 10) {
      const otp = Math.floor(100000 + Math.random() * 900000);
      setGeneratedOTP(otp);
      setOtpSent(true);
      setOtpError(false);
      alert(`Your OTP is: ${otp}`);
    } else {
      setOtpError(true);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!validatePassword(loginDetails.password)) {
      setPasswordError("Password must be at least 8 characters long, include a number and a special character.");
      return;
    }
    setPasswordError("");
    if (generatedOTP && loginDetails.otp === generatedOTP) {
      setIsLoggedIn(true);
    } else {
      setOtpError(true);
    }
  };

  const handleContribution = (e) => {
    e.preventDefault();
    if (!isNaN(amount) && amount > 0) {
      setContributors([...contributors, { id: contributors.length + 1, amount: parseFloat(amount) }]);
      setMessage(`Thank you for contributing €${amount}!`);
      setAmount("");
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-4 md:p-16 md:flex-row md:space-x-12">
        <motion.section className="text-center text-white mb-12 md:mb-0 md:w-1/2" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">Welcome to Crowdfunding App</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">Support ideas and empower innovations by contributing.</p>
        </motion.section>

        <motion.form onSubmit={handleLogin} className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-lg md:w-1/2" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
          <input type="text" placeholder="Username" className="w-full p-3 border rounded-lg mb-4" value={loginDetails.username} onChange={(e) => setLoginDetails({ ...loginDetails, username: e.target.value })} required />
          <input type="password" placeholder="Password" className="w-full p-3 border rounded-lg mb-4" value={loginDetails.password} onChange={(e) => setLoginDetails({ ...loginDetails, password: e.target.value })} required />
          {passwordError && <p className="text-red-600 text-sm mb-4">{passwordError}</p>}
          <input type="text" placeholder="Phone Number" className="w-full p-3 border rounded-lg mb-4" value={loginDetails.phone} onChange={(e) => setLoginDetails({ ...loginDetails, phone: e.target.value })} required />
          <button type="button" onClick={sendOTP} className="w-full bg-blue-500 text-white py-2 rounded-lg mb-4">Send OTP</button>
          {otpSent && <input type="text" placeholder="Enter OTP" className="w-full p-3 border rounded-lg mb-4" value={loginDetails.otp} onChange={(e) => setLoginDetails({ ...loginDetails, otp: e.target.value })} required />}
          {otpError && <p className="text-red-600">Invalid OTP. Please try again.</p>}
          <button type="submit" className="w-full bg-green-500 text-white py-2 rounded-lg">Login</button>
        </motion.form>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 p-4 md:p-16 md:flex-row md:space-x-12">
      <motion.section className="text-center text-white mb-12 md:mb-0 md:w-1/2" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">Support the Cause</h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto">Help us raise funds for the cause by contributing!</p>
      </motion.section>

      <motion.div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-lg md:w-1/2">
        <form onSubmit={handleContribution} className="mb-8">
          <input
            type="number"
            placeholder="Enter amount (€)"
            className="w-full p-3 border rounded-lg mb-4"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg">Contribute</button>
        </form>

        {message && <p className="text-green-600">{message}</p>}
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Contributors</h2>
          <ul>
            {contributors.map((contributor) => (
              <li key={contributor.id} className="text-lg">
                Contributed €{contributor.amount}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold">Total Raised: €{totalRaised}</h2>
        </div>
      </motion.div>
    </div>
  );
}
