from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import pandas as pd
import pickle
import traceback

app = Flask(__name__)
CORS(app)

# Load model and dataframe
pipe = pickle.load(open("pipe.pkl", "rb"))
df = pickle.load(open("df.pkl", "rb"))

# Exact order/model expects
EXPECTED_COLS = [
    "Company",
    "TypeName",
    "Ram",
    "Weight",
    "Touchscreen",
    "Ips",
    "ppi",
    "Cpu brand",
    "HDD",
    "SSD",
    "Gpu Brand",
    "os",
]


@app.route("/predict", methods=["POST"])
def predict_price():
    try:
        data = request.get_json()

        if data is None:
            return jsonify({"error": "Invalid JSON"}), 400

        # Required fields (except ppi)
        required = [
            "Company",
            "TypeName",
            "Ram",
            "Weight",
            "Touchscreen",
            "Ips",
            "ScreenSize",
            "Resolution",
            "Cpu",
            "HDD",
            "SSD",
            "Gpu",
            "OS"
        ]

        missing = [field for field in required if field not in data]
        if missing:
            return jsonify({"error": "Missing fields", "details": missing}), 400

        # TOUCHSCREEN + IPS normalize
        def to_bool(x):
            if str(x).lower() in ["yes", "1", "true"]:
                return 1
            return 0

        touchscreen = to_bool(data["Touchscreen"])
        ips = to_bool(data["Ips"])

        # CALCULATE PPI
        try:
            screen_size = float(data["ScreenSize"])
            res = data["Resolution"]
            X_res = int(res.split("x")[0])
            Y_res = int(res.split("x")[1])
            ppi = ((X_res ** 2 + Y_res ** 2) ** 0.5) / screen_size
        except:
            return jsonify({"error": "Invalid ScreenSize/Resolution format"}), 400

        # Prepare exact input
        input_dict = {
            "Company": data["Company"],
            "TypeName": data["TypeName"],
            "Ram": int(data["Ram"]),
            "Weight": float(data["Weight"]),
            "Touchscreen": touchscreen,
            "Ips": ips,
            "ppi": ppi,
            "Cpu brand": data["Cpu"],
            "HDD": int(data["HDD"]),
            "SSD": int(data["SSD"]),
            "Gpu Brand": data["Gpu"],
            "os": data["OS"],
        }

        # DataFrame for model
        input_df = pd.DataFrame([input_dict], columns=EXPECTED_COLS)

        predicted_log_price = pipe.predict(input_df)[0]
        predicted_price = int(np.exp(predicted_log_price))

        return jsonify({
            "predicted_price": predicted_price
        })

    except Exception as e:
        print(traceback.format_exc())
        return jsonify({"error": "Internal Server Error", "message": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
