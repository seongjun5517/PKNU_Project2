import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function AnalysisPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    highBloodPressureDoctor: '없음',
    dyslipidemiaDoctor: '있음',
    diabetesDoctor: '없음',
    strokeDoctor: '있음',
    bloodPressureType: '정상',
    fastingGlucose: '95.2',
    hba1c: '5.5',
    cholesterol: '200.1',
    neutralFat: '150.2',
    bmi: '22.5',
    waist: '85.3',
    smoking: '5갑(100개비) 미만',
    drinkingFrequency: '월 1회미만',
    drinkingAmount: '1~2잔',
    sittingTime: '10',
    exercise: '실천하지 않음',
    gender: '남자',
    age: '45',
    education: '중졸',
    income: '중상'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/result', {
      state: {
        result: {
          risk: 12.8,
          score: 86,
          formData: formData
        }
      }
    });
  };

  return (
    <main className="page analysis-page">
      <section className="card form-card">
        <h2>심근경색 발생 확률 구하기</h2>

        <form onSubmit={handleSubmit} className="heart-form">
          <div className="form-two-column">
            <div>
              <div className="form-row radio-row"><label>고혈압 의사진단여부 :</label><RadioGroup name="highBloodPressureDoctor" value={formData.highBloodPressureDoctor} options={['있음', '없음']} onChange={handleChange} /></div>
              <div className="form-row radio-row"><label>이상지질혈증 의사진단여부 :</label><RadioGroup name="dyslipidemiaDoctor" value={formData.dyslipidemiaDoctor} options={['있음', '없음']} onChange={handleChange} /></div>
              <div className="form-row radio-row"><label>당뇨병 의사진단여부 :</label><RadioGroup name="diabetesDoctor" value={formData.diabetesDoctor} options={['있음', '없음']} onChange={handleChange} /></div>
              <div className="form-row radio-row"><label>뇌졸중 의사진단여부 :</label><RadioGroup name="strokeDoctor" value={formData.strokeDoctor} options={['있음', '없음']} onChange={handleChange} /></div>
              <div className="form-row radio-row"><label>고혈압 유형여부 :</label><RadioGroup name="bloodPressureType" value={formData.bloodPressureType} options={['정상', '고혈압전단계', '고혈압']} onChange={handleChange} /></div>

              <InputRow label="공복 혈당" name="fastingGlucose" value={formData.fastingGlucose} unit="mg/dL" onChange={handleChange} />
              <InputRow label="당화혈색소" name="hba1c" value={formData.hba1c} unit="%" onChange={handleChange} />
              <InputRow label="총콜레스테롤" name="cholesterol" value={formData.cholesterol} unit="mg/dL" onChange={handleChange} />
              <InputRow label="중성지방" name="neutralFat" value={formData.neutralFat} unit="mg/dL" onChange={handleChange} />
              <InputRow label="체질량지수(BMI)" name="bmi" value={formData.bmi} unit="kg/m²" onChange={handleChange} />
              <InputRow label="허리둘레" name="waist" value={formData.waist} unit="cm" onChange={handleChange} />
            </div>

            <div>
              <div className="form-row radio-row vertical-radio"><label>평생 일반담배 흡연 여부 :</label><RadioGroup name="smoking" value={formData.smoking} options={['5갑(100개비) 미만', '5갑(100개비) 이상', '피운적 없음']} onChange={handleChange} /></div>
              <div className="form-row radio-row vertical-radio"><label>1년간 음주 빈도 :</label><RadioGroup name="drinkingFrequency" value={formData.drinkingFrequency} options={['최근 1년간 전혀 마시지 않았다.', '월 1회미만', '월 1회정도', '주 2~3회정도', '주 4회정도']} onChange={handleChange} /></div>
              <div className="form-row radio-row vertical-radio"><label>한번에 마시는 음주량 :</label><RadioGroup name="drinkingAmount" value={formData.drinkingAmount} options={['1~2잔', '3~4잔', '5~6잔', '7~9잔', '10잔 이상']} onChange={handleChange} /></div>

              <InputRow label="하루에 앉아서 보내는 시간" name="sittingTime" value={formData.sittingTime} unit="시간" onChange={handleChange} />

              <div className="form-row radio-row"><label>유산소 신체 활동 실천율 :</label><RadioGroup name="exercise" value={formData.exercise} options={['실천하지 않음', '실천함']} onChange={handleChange} /></div>
              <div className="form-row radio-row"><label>성별 :</label><RadioGroup name="gender" value={formData.gender} options={['남자', '여자']} onChange={handleChange} /></div>

              <InputRow label="나이" name="age" value={formData.age} unit="세" onChange={handleChange} />

              <div className="form-row radio-row"><label>최종 학력 :</label><RadioGroup name="education" value={formData.education} options={['초졸 이하', '중졸', '고졸', '대졸 이상']} onChange={handleChange} /></div>
              <div className="form-row radio-row"><label>소득 분위수 :</label><RadioGroup name="income" value={formData.income} options={['하', '중하', '중상', '상']} onChange={handleChange} /></div>
            </div>
          </div>

          <div className="form-button-area">
            <button type="submit" className="btn-primary large">예측하기</button>
          </div>
        </form>
      </section>
    </main>
  );
}

function InputRow({ label, name, value, unit, onChange }) {
  return (
    <div className="form-row input-row">
      <label>{label} :</label>
      <input name={name} value={value} onChange={onChange} />
      <span>{unit}</span>
    </div>
  );
}

function RadioGroup({ name, value, options, onChange }) {
  return (
    <div className="radio-group">
      {options.map((option) => (
        <label key={option}>
          <input type="radio" name={name} value={option} checked={value === option} onChange={onChange} />
          {option}
        </label>
      ))}
    </div>
  );
}

export default AnalysisPage;
