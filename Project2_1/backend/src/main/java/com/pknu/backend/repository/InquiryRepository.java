package com.pknu.backend.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.pknu.backend.model.Inquiry;

@Repository
public interface InquiryRepository
    extends JpaRepository<Inquiry, Integer>{

    /**
     * 내 문의사항 조회
    */
    @Query(value = """

        SELECT *
        FROM inquiry_test
        WHERE TRIM(mem_id) =
              TRIM(:mem_id)
        ORDER BY inq_created DESC

        """,

        countQuery =

        """
        SELECT COUNT(*)
        FROM inquiry_test
        WHERE TRIM(mem_id) =
              TRIM(:mem_id)

        """,

        nativeQuery = true
    )

    Page<Inquiry> findByMemId(

        @Param("mem_id")
        String mem_id,

        Pageable pageable
    );
}