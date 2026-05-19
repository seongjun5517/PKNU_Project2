import '../styles/pages/PolicyPage.css';
import { useState } from 'react';

function CustomerCenterPage() {
  const [formData, setFormData] = useState({
    title: '',
    email: '',
    content: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('문의가 접수되었습니다.');
    setFormData({ title: '', email: '', content: '' });
  };

  return (
    <main className="page policy-page">
      <section className="card policy-card">
        <h1>고객센터</h1>
        <p className="policy-desc">서비스 이용 중 궁금한 점이나 불편한 점을 남겨주세요.</p>

        <div className="customer-grid">
          <div className="customer-info-box">
            <h2>문의 안내</h2>
            <p>운영 시간 : 평일 09:00 ~ 18:00</p>
            <p>점심 시간 : 12:00 ~ 13:00</p>
            <p>답변은 순차적으로 처리됩니다.</p>
          </div>

          <form className="customer-form" onSubmit={handleSubmit}>
            <label>문의 제목</label>
            <input name="title" value={formData.title} onChange={handleChange} required />

            <label>답변 받을 이메일</label>
            <input name="email" type="email" value={formData.email} onChange={handleChange} required />

            <label>문의 내용</label>
            <textarea name="content" value={formData.content} onChange={handleChange} required />

            <button className="btn-primary small" type="submit">문의 접수</button>
          </form>
        </div>
      </section>
    </main>
  );
}

export default CustomerCenterPage;
