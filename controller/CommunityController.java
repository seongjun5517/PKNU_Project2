package com.pknu.project.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.pknu.project.model.Community;
import com.pknu.project.service.CommunityService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController

@RequestMapping("/community")

@RequiredArgsConstructor

@Slf4j

@CrossOrigin("*")
public class CommunityController {

    private final CommunityService communityService;

    /**
     * 링크 테스트
     * url : http://localhost:8080/community/check
    */
    @GetMapping("/check")
    public String checkLink(){

        return "CommunityController 정상";
    }

    /**
     * 전체 조회
     * url : http://localhost:8080/community/list
    */
    @GetMapping("/list")
    public ResponseEntity<List<Community>>
    getCommunityList(){

        log.info("게시판 전체 조회");

        return ResponseEntity.ok(this.communityService.getCommunityList()
        );
    }

    /**
     * 상세 조회
     * url : http://localhost:8080/community/view/{com_id}
    */
    @GetMapping("/view/{com_id}")
    public ResponseEntity<Community>
    getCommunityView(@PathVariable Integer com_id){

        log.info("게시글 상세 조회 : {}",com_id);
        return ResponseEntity.ok(this.communityService.getCommunityView(com_id));
    }

    /**
     * 등록
     * http://localhost:8080/community/insert
    */
    @PostMapping("/insert")
    public ResponseEntity<?>
    setCommunityInsert(@RequestBody Community community){

        Community insert_community =this.communityService.setCommunityInsert(community);

        if(insert_community == null){

            return ResponseEntity.status(HttpStatus.CONFLICT).body("게시글 번호 중복");}

        return ResponseEntity.ok( insert_community);
    }

    /**
     * 수정
     * http://localhost:8080/community/update
    */
    @PutMapping("/update")
    public ResponseEntity<Community>
    setCommunityUpdate(
            @RequestBody
            Community community){

        return ResponseEntity.ok(this.communityService.setCommunityUpdate(community)
                    
        );
    }

    /**
     * 삭제
     * http://localhost:8080/community/delete/{com_id}
    */
    @DeleteMapping("/delete/{com_id}")
    public ResponseEntity<Void>
    setCommunityDelete(@PathVariable Integer com_id){

        this.communityService.setCommunityDelete(com_id);
        return ResponseEntity.noContent().build();
    }

    /**
     * 좋아요
    */
    @PostMapping("/like/{com_id}")
    public ResponseEntity<Community>
    setCommunityLike(@PathVariable Integer com_id){

            return ResponseEntity.ok(this.communityService.setCommunityLike(com_id)
        );
    }

    /**
     * Paging
    */
    @GetMapping("/list_paging")
    public ResponseEntity<Page<Community>>
    getCommunityListPaging(

            @RequestParam(name = "page", defaultValue = "1")
            int page,

            @RequestParam(name = "size", defaultValue = "10")
            int size){

        Page<Community> community_list = this.communityService.getCommunityListPaging(page - 1, size);

        return ResponseEntity.ok(community_list);
    }
}