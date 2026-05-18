import { springApi } from "../config/axiosInstance";

/**
 * 댓글 전체 조회
*/
export const getCommentList = (comId) =>
    springApi.get(`/comment/list/${comId}`);

/**
 * 댓글 등록
*/
export const setCommentInsert = (comment) =>
    springApi.post("/comment/insert", comment);

/**
 * 댓글 수정
*/
export const setCommentUpdate = (comment) =>
    springApi.put("/comment/update",comment);

/**
 * 댓글 삭제
*/
export const setCommentDelete =
    (comId, memId, commentCreated) =>

        springApi.delete(`/comment/delete?comId=${comId}&memId=${memId}
                         &commentCreated=${commentCreated}`);