package com.pknu.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pknu.backend.model.Community;

@Repository
public interface CommunityRepository
                extends JpaRepository<Community, Integer> {

}