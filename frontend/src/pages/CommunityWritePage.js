import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function CommunityWritePage() {
  const navigate = useNavigate();
  const [post, setPost] = useState({ category: '건강 정보', title: '', content: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('게시글이 등록되었습니다. DB 연결 전이라 실제 저장은 되지 않습니다.');
    navigate('/community');
  };

  return (
    <main className="page community-write-page">
      <section className="card write-card">
        <h2>게시글 작성</h2>
        <form onSubmit={handleSubmit} className="write-form">
          <label>카테고리</label>
          <select name="category" value={post.category} onChange={handleChange}>
            <option>건강 정보</option>
            <option>식단 이야기</option>
            <option>운동 공유</option>
            <option>질문 & 답변</option>
            <option>자유 게시판</option>
          </select>

          <label>제목</label>
          <input name="title" value={post.title} onChange={handleChange} placeholder="제목을 입력하세요" required />

          <label>내용</label>
          <textarea name="content" value={post.content} onChange={handleChange} placeholder="내용을 입력하세요" required />

          <div className="write-buttons">
            <button type="button" className="btn-outline" onClick={() => navigate('/community')}>취소</button>
            <button type="submit" className="btn-primary">등록하기</button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default CommunityWritePage;
