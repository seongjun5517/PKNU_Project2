import joblib
import numpy as np

# 1. 통합 저장된 파일 로드
heart_model_file = joblib.load("./models/best_extra_trees_model.pkl")

# 2. 파일 내부에서 스케일러와 모델을 각각 꺼내어 선언
scaler = heart_model_file['my_scaler']
model = heart_model_file['my_model']

def getheartPredict(features):
    print(">>>>>> 예측 시작 (확률 출력 모드)")
    
    # 3. 들어온 리스트 데이터를 numpy 배열로 변환
    heart_array = np.array(features)
    
    # 4. 중요: 모델에 넣기 전, 학습할 때 썼던 스케일러로 데이터 변환 (2차원 구조 [ [] ] 로 전달)
    heart_scaled = scaler.transform([heart_array])
    
    # 5. predict() 대신 predict_proba()를 사용해 클래스별 확률 계산
    # 결과 형태 예시: [[0일확률, 1일확률]] -> [[0.0281, 0.9719]]
    heart_prob = model.predict_proba(heart_scaled)[0]
    
    # 6. 우리가 필요한 건 '1 (심장질환 양성)'일 확률이므로 인덱스 1번 추출
    # 소수점 4자리까지 보기 좋게 반올림 (예: 0.9719)
    heart_positive_prob = round(float(heart_prob[1]), 4)
    
    print(">>>>>>> 예측 확률 결과 (1일 확률) : ", heart_positive_prob)
    
    return heart_positive_prob