package com.pknu.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pknu.backend.model.Comment;
import com.pknu.backend.model.CommentId;

public interface CommentRepository
    extends JpaRepository<Comment, CommentId>{

    /**
     * 게시글별 댓글 조회
    */
    List<Comment>findByComid(Integer comid);

    /**
     * 작성자별 댓글 조회
    */
    List<Comment>
        findByMemid(String memid);
}