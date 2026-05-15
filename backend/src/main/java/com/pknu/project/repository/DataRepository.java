package com.pknu.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pknu.project.model.Data;

public interface DataRepository extends JpaRepository<Data, String> {

}
