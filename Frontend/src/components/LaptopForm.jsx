import { useState } from "react";
import api from "../api/api";

const LaptopForm = ({ setPrediction }) => {
  const [formData, setFormData] = useState({
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
    OS: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/predict", formData);
      setPrediction(res.data.predicted_price);
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-box">

      {/* Company */}
      <label>Company</label>
      <select name="Company" value={formData.Company} onChange={handleChange}>
        <option value="">Select</option>
        <option value="Dell">Dell</option>
        <option value="HP">HP</option>
        <option value="Lenovo">Lenovo</option>
        <option value="Asus">Asus</option>
        <option value="Acer">Acer</option>
        <option value="Apple">Apple</option>
      </select>

      {/* TypeName */}
      <label>Type</label>
      <select name="TypeName" value={formData.TypeName} onChange={handleChange}>
        <option value="">Select</option>
        <option value="Ultrabook">Ultrabook</option>
        <option value="Notebook">Notebook</option>
        <option value="Gaming">Gaming</option>
        <option value="2 in 1 Convertible">2 in 1 Convertible</option>
        <option value="Workstation">Workstation</option>
      </select>

      {/* Ram */}
      <label>Ram (GB)</label>
      <input type="number" name="Ram" value={formData.Ram} onChange={handleChange} />

      {/* Weight */}
      <label>Weight (kg)</label>
      <input type="number" step="0.01" name="Weight" value={formData.Weight} onChange={handleChange} />

      {/* Touchscreen */}
      <label>Touchscreen</label>
      <select name="Touchscreen" value={formData.Touchscreen} onChange={handleChange}>
        <option value="">Select</option>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>

      {/* IPS */}
      <label>IPS Display</label>
      <select name="Ips" value={formData.Ips} onChange={handleChange}>
        <option value="">Select</option>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>

      {/* Screen Size */}
      <label>Screen Size (inches)</label>
      <input type="number" name="ScreenSize" value={formData.ScreenSize} onChange={handleChange} />

      {/* Resolution */}
      <label>Resolution</label>
      <select name="Resolution" value={formData.Resolution} onChange={handleChange}>
        <option value="">Select</option>
        <option value="1366x768">1366x768</option>
        <option value="1920x1080">1920x1080</option>
        <option value="2560x1440">2560x1440</option>
        <option value="3840x2160">3840x2160</option>
      </select>

      {/* CPU */}
      <label>CPU</label>
      <select name="Cpu" value={formData.Cpu} onChange={handleChange}>
        <option value="">Select</option>
        <option value="Intel Core i3">Intel Core i3</option>
        <option value="Intel Core i5">Intel Core i5</option>
        <option value="Intel Core i7">Intel Core i7</option>
        <option value="AMD Ryzen 5">AMD Ryzen 5</option>
        <option value="AMD Ryzen 7">AMD Ryzen 7</option>
      </select>

      {/* HDD */}
      <label>HDD (GB)</label>
      <input type="number" name="HDD" value={formData.HDD} onChange={handleChange} />

      {/* SSD */}
      <label>SSD (GB)</label>
      <input type="number" name="SSD" value={formData.SSD} onChange={handleChange} />

      {/* GPU */}
      <label>GPU Brand</label>
      <select name="Gpu" value={formData.Gpu} onChange={handleChange}>
        <option value="">Select</option>
        <option value="Nvidia">Nvidia</option>
        <option value="AMD">AMD</option>
        <option value="Intel">Intel</option>
      </select>

      {/* OS */}
      <label>Operating System</label>
      <select name="OS" value={formData.OS} onChange={handleChange}>
        <option value="">Select</option>
        <option value="Windows">Windows</option>
        <option value="Mac">Mac</option>
        <option value="Linux">Linux</option>
      </select>

      <button type="submit">Predict Price</button>
    </form>
  );
};

export default LaptopForm;
