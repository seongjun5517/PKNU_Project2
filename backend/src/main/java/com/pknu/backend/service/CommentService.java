package com.pknu.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.pknu.backend.model.Comment;
import com.pknu.backend.model.CommentId;
import com.pknu.backend.repository.CommentRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor

public class CommentService {

    private final CommentRepository
        commentRepository;

    /**
     * 댓글 조회
    */
    public List<Comment>
        getCommentList(Integer comid){

        return this.commentRepository.findByComid(comid);
    }

    /**
     * 댓글 등록
    */
    public Comment
        setCommentInsert(Comment comment){

        return this.commentRepository.save(comment);
    }

    /**
     * 댓글 삭제
    */
    public String
        setCommentDelete(
                CommentId commentId){

        if(this.commentRepository
                .existsById(commentId)){

            this.commentRepository
                .deleteById(commentId);

            return "댓글 삭제 성공하였습니다!!!";
        }

        return "삭제할 댓글 없습니다!!!";
    }

    /**
     * 댓글 수정
    */
    public Comment setCommentUpdate(Comment p_comment){

        CommentId commentId =
            new CommentId(
                          p_comment.getComid(),
                          p_comment.getMemid(),
                          p_comment.getCommentcreated()
                    );

        Optional<Comment> comment =this.commentRepository.findById(commentId);

        if(comment.isPresent()){

            Comment comment_update = comment.get();

            comment_update.setCommentcontent(
                p_comment.getCommentcontent()
            );

            return this.commentRepository
                .save(comment_update);
        }

        return null;
    }
}