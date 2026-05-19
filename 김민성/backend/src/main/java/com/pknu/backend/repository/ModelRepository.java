package com.pknu.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.pknu.backend.model.Model;

@Repository
public interface ModelRepository extends JpaRepository<Model, Integer> {
    @Query("SELECT m FROM Model m WHERE m.mem_id = :mem_id")
    List<Model> findByMEM_ID(String mem_id);
        
}   
