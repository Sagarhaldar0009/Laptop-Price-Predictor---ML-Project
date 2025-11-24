import { useState } from "react";
import "./App.css";
import api from "./api/api";

export default function App() {
  const [form, setForm] = useState({
    Company: "",
    TypeName: "",
    Ram: "",
    Weight: "",
    Touchscreen: "",
    Ips: "",
    ScreenSize: "",
    Resolution: "",
    Cpu: "",
    HDD: "",
    SSD: "",
    Gpu: "",
    OS: ""
  });

  const [price, setPrice] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePredict = async () => {
    const payload = {
      Company: form.Company,
      TypeName: form.TypeName,
      Ram: form.Ram ? parseInt(form.Ram) : 0,
      Weight: form.Weight ? parseFloat(form.Weight) : 0,
      Touchscreen: form.Touchscreen,
      Ips: form.Ips,
      ScreenSize: form.ScreenSize ? parseFloat(form.ScreenSize) : 0,
      Resolution: form.Resolution,
      Cpu: form.Cpu,
      HDD: form.HDD ? parseInt(form.HDD) : 0,
      SSD: form.SSD ? parseInt(form.SSD) : 0,
      Gpu: form.Gpu,
      OS: form.OS
    };

    try {
      const res = await api.post("/predict", payload);

      if (res.data.predicted_price) {
        setPrice(Math.round(res.data.predicted_price));
      } else {
        alert("Error: " + JSON.stringify(res.data));
      }

    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };




  return (
    <div className="container">
      <div className="card">

        <h2>Laptop Price Predictor 💻</h2>

        {/* Company */}
        <div className="form-group">
          <label>Company</label>
          <select name="Company" onChange={handleChange}>
            <option value="">Select Company</option>
              <option>Dell</option>
              <option>HP</option>
              <option>Lenovo</option>
              <option>MSI</option>
              <option>Acer</option>
              <option>Asus</option>
              <option>Apple</option>
          </select>
        </div>

        {/* Type */}
        <div className="form-group">
          <label>Type</label>
          <select name="TypeName" onChange={handleChange}>
            <option value="">Select Type</option>
            <option>Ultrabook</option>
            <option>Notebook</option>
            <option>Gaming</option>
            <option>Workstation</option>
            <option>2 in 1 Convertible</option>
          </select>
        </div>

        {/* Ram */}
        <div className="form-group">
          <label>RAM (GB)</label>
          <select name="Ram" onChange={handleChange}>
            <option value="">Select RAM</option>
            <option>4</option>
            <option>8</option>
            <option>12</option>
            <option>16</option>
            <option>24</option>
            <option>32</option>
            <option>64</option>
          </select>
        </div>

        {/* Weight */}
        <div className="form-group">
          <label>Weight (kg)</label>
          <input type="number" name="Weight" onChange={handleChange} />
        </div>

        {/* Touchscreen */}
        <div className="form-group">
          <label>Touchscreen</label>
          <div className="radio-group">
            <label><input type="radio" name="Touchscreen" value="Yes" onChange={handleChange} /> Yes</label>
            <label><input type="radio" name="Touchscreen" value="No" onChange={handleChange} /> No</label>
          </div>
        </div>

        {/* IPS */}
        <div className="form-group">
          <label>IPS Display</label>
          <div className="radio-group">
            <label><input type="radio" name="Ips" value="Yes" onChange={handleChange} /> Yes</label>
            <label><input type="radio" name="Ips" value="No" onChange={handleChange} /> No</label>
          </div>
        </div>

        {/* Screen Size */}
        <div className="form-group">
          <label>Screen Size (inches)</label>
          <input type="number" name="ScreenSize" onChange={handleChange} />
        </div>

        {/* Resolution */}
        <div className="form-group">
          <label>Resolution</label>
          <select name="Resolution" onChange={handleChange}>
            <option value="">Select Resolution</option>
            <option>1366x768</option>
            <option>1920x1080</option>
            <option>2560x1440</option>
            <option>3840x2160</option>
          </select>
        </div>

        {/* CPU */}
        <div className="form-group">
          <label>CPU</label>
          <select name="Cpu" onChange={handleChange}>
            <option value="">Select CPU</option>
            <option>Intel Core i3</option><option>Intel Core i5</option>
            <option>Intel Core i7</option><option>Intel Core i9</option>
            <option>AMD Ryzen 3</option><option>AMD Ryzen 5</option>
            <option>AMD Ryzen 7</option><option>AMD Ryzen 9</option>
          </select>
        </div>

        {/* HDD */}
        <div className="form-group">
          <label>HDD Storage (GB)</label>
          <select name="HDD" onChange={handleChange}>
            <option value="0">0</option>
            <option>500</option><option>1024</option>
          </select>
        </div>

        {/* SSD */}
        <div className="form-group">
          <label>SSD Storage (GB)</label>
          <select name="SSD" onChange={handleChange}>
            <option value="">Select SSD</option>
            <option>128</option><option>256</option>
            <option>512</option><option>1024</option>
          </select>
        </div>

        {/* GPU */}
        <div className="form-group">
          <label>GPU Brand</label>
          <select name="Gpu" onChange={handleChange}>
            <option value="">Select GPU</option>
            <option>Nvidia</option>
            <option>AMD</option>
            <option>Intel</option>
          </select>
        </div>

        {/* OS */}
        <div className="form-group">
          <label>Operating System</label>
          <select name="OS" onChange={handleChange}>
            <option value="">Select OS</option>
            <option>Windows</option>
            <option>macOS</option>
            <option>Linux</option>
            <option>No OS</option>
          </select>
        </div>

        <button onClick={handlePredict}>Predict Price</button>

        {price && (
          <div className="result-card">
            <p>Predicted Price:</p>
            <p className="price">₹ {price.toLocaleString()}</p>
          </div>
        )}

      </div>
    </div>
  );
}











// import { useState } from "react";
// import LaptopForm from "./components/LaptopForm";
// import ResultCard from "./components/ResultCard";

// function App() {
//   const [prediction, setPrediction] = useState(null);

//   return (
//     <div className="main-container">
//       <h1>Laptop Price Predictor</h1>
//       <LaptopForm setPrediction={setPrediction} />
//       <ResultCard price={prediction} />
//     </div>
//   );
// }

// export default App;

