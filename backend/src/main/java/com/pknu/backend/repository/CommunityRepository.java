package com.pknu.backend.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.pknu.backend.model.Community;

@Repository
public interface CommunityRepository
        extends JpaRepository<Community, Integer> {

    @Query(value = """

        SELECT *
        FROM community_test
        WHERE TRIM(mem_id) = TRIM(:mem_id)

        """,

        countQuery = 
        """
        SELECT COUNT(*)
        FROM community_test
        WHERE TRIM(mem_id)= TRIM(:mem_id) 

        """,

        nativeQuery = true
    )

    Page<Community> findByMemId(

            @Param("mem_id")
            String mem_id,
            Pageable pageable
    );
}