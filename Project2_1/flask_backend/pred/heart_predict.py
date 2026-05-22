import joblib
import numpy as np
import pandas as pd

# 1. 모델과 웹 서버용 35개 컬럼 리스트 로드
heart_model = joblib.load("./models/heart_model_last.pkl")
model_features = joblib.load("./models/model_features.pkl") # 아까 저장한 35개 컬럼 리스트

def getheartPredict(features):
    print(">>>>>> 예측 시작 (확률 출력 모드)")
    
    # 2. 프론트에서 준 19개 변수 순서대로 딕셔너리 매핑 
    # (주의: DB에 넣으실 때 선언한 순서와 반드시 일치해야 합니다!)
    feature_names_19 = [
        'di1_dg', 'di2_dg', 'de1_dg', 'di3_dg', 'he_hp', 'he_glu', 'he_hba1c', 'he_chol',
        'he_bmi', 'he_wc', 'bs1_1', 'bd1_11', 'bd2_1', 'pa_aerobic', 'be8_1',
        'sex', 'age', 'edu', 'incm'
    ]
        
    # 1행짜리 원본 데이터프레임 생성
    df_raw = pd.DataFrame([features], columns=feature_names_19)
    
    # 3. 범주형 변수들을 원핫 인코딩 (pd.get_dummies)
    # 국건영 범주형 데이터 변수들 지정
    cate_cols = ['di1_dg', 'di2_dg', 'de1_dg', 'di3_dg', 'he_hp', 'bs1_1', 'bd1_11', 'bd2_1', 'be8_1', 'pa_aerobic', 'sex', 'edu', 'incm']
    df_encoded = pd.get_dummies(df_raw, columns=cate_cols, drop_first=True)
    
    # 4. ⭐ [핵심] 35개 컬럼 틀에 강제로 맞추기
    # 누락된 범주형 컬럼은 0으로 채우고 순서를 완전히 일치시킵니다.
    df_final = df_encoded.reindex(columns=model_features, fill_value=0)
    
    # 5. predict_proba()로 확률 계산
    heart_prob = heart_model.predict_proba(df_final)[0]
    
    # 6. 심근경색(1)일 확률 추출 및 반올림
    heart_positive_prob = round(float(heart_prob[1]), 4)
    
    print(">>>>>>> 예측 확률 결과 (1일 확률) : ", heart_positive_prob)
    return heart_positive_prob