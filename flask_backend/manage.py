from flask import Flask, request, jsonify
from flask_cors import CORS
from pred.heart_predict import getheartPredict
from db import save_prediction

app = Flask(__name__)

CORS(app)


@app.route("/")
def index():
    
    return "Flask test"

@app.route("/predict/heart_pred_form", methods=["POST"])
def getheartPred():
    print("===========getheartPredict============")

    data = request.get_json()
    print(">>>>>>전송받은 파라메터 request.get_json() : ", data)

    if isinstance(data, dict) and "features" in data and "mem_id" in data:
        features = data["features"]
        mem_id = data["mem_id"]

    else :
        return jsonify({"error : 잘못된 입력"}), 400

    prob_result = getheartPredict(features)
    print(f"예측 확률 결과 : {prob_result}")

    # DB 저장
    try :
        save_prediction(mem_id, features, prob_result)
    
    except Exception as e :
        print(f"저장 오류 :{e}")

    return jsonify({"probability" : prob_result})

if __name__ == "__main__":
    app.run(debug=True)