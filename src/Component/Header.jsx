import { useState } from "react";
import { motion } from "framer-motion";

export default function Header() {
  const [input, setInput] = useState(""); // For weather input
  const [weather, setWeather] = useState({ loading: false, data: {}, error: false });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginDetails, setLoginDetails] = useState({ username: "", password: "", phone: "", otp: "" });
  const [generatedOTP, setGeneratedOTP] = useState(null);
  const [otpSent, setOtpSent] = useState(false);
  const [otpError, setOtpError] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [amount, setAmount] = useState(""); // For contribution amount
  const [message, setMessage] = useState(""); // For contribution message
  const [contributors, setContributors] = useState([]); // List of contributors

  const validatePassword = (password) => /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/.test(password);

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

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validatePassword(loginDetails.password)) {
      setPasswordError("Password must be at least 8 characters long, include a number and a special character.");
      return;
    }
    setPasswordError("");

    if (generatedOTP && loginDetails.otp == generatedOTP) {
      try {
        const response = await fetch('http://localhost:3002/create-user', {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(loginDetails)
        });
        const data = await response.json();
        alert(data.message);
        setIsLoggedIn(data.success);
      } catch (err) {
        console.error("Error connecting to the server:", err);
        setIsLoggedIn(false);
      }
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

  // Weather Fetch Function
  const fetchWeather = async () => {
    if (!input) {
      alert("Please enter a location!");
      return;
    }
    setWeather({ loading: true, data: {}, error: false });

    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=YOUR_API_KEY&units=metric`);
      const data = await response.json();
      if (data.cod === 200) {
        setWeather({ loading: false, data, error: false });
      } else {
        setWeather({ loading: false, data: {}, error: true });
      }
    } catch (err) {
      setWeather({ loading: false, data: {}, error: true });
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
          <h2 className="text-xl font-semibold">Total Raised: €{contributors.reduce((total, contributor) => total + contributor.amount, 0)}</h2>
        </div>

        {/* Weather input and button */}
        <div className="mt-8 w-full">
          <input
            type="text"
            placeholder="Enter city for weather"
            className="w-full p-3 border rounded-lg mb-4"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={fetchWeather} className="w-full bg-blue-500 text-white py-2 rounded-lg">Get Weather</button>
        </div>

        {/* Weather details */}
        {weather.loading && <p className="mt-4">Loading...</p>}
        {weather.error && <p className="mt-4 text-red-600">Error fetching weather data.</p>}
        {weather.data.main && (
          <div className="mt-4 text-white">
            <h3 className="text-2xl font-bold">{weather.data.name}</h3>
            <p>Temperature: {weather.data.main.temp}°C</p>
            <p>Weather: {weather.data.weather[0].description}</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
