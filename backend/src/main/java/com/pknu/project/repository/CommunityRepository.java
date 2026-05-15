package com.pknu.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pknu.project.model.Community;

@Repository
public interface CommunityRepository
        extends JpaRepository<Community, Integer> {

}