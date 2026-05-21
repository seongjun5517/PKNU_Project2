package com.pknu.backend.controller;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import com.pknu.backend.model.Inquiry;
import com.pknu.backend.service.InquiryService;

@RestController
// http://localhost:8080/member/xx 형태 중에
// -> 8080 뒤에 /member가 있으면 무조건 MemberController 클래스가 캐치하여 사용하겠다는 의미의 어노테이션
// -> /member 뒤에 추가되는 url 패턴은 클래스 내부 메소드에서 캐치하여 사용

// 앞으로 여기서 쓰인 모든 GetMapping은 앞에 /member가 있다고 생각하면 됨
@RequestMapping("/inquiry")

// 최초 서버 실행 시에 미리 클래스들을 생성해 놓기 위한 어노테이션(라이브러리)
//  - 최초 서버 실행 시 final로 선언된 멤버 변수(클래스 변수)들을 자동으로 생성
@RequiredArgsConstructor

@Slf4j
public class InquiryController {

    private final InquiryService inquiryService;

    @PutMapping(path = "update")
    public ResponseEntity<Inquiry> setInquiryUpdate(@RequestBody Inquiry p_inquiry) {

        return ResponseEntity.ok(this.inquiryService.setInquiryUpdate(p_inquiry));
    }

    @PostMapping(path = "/insert")
    public ResponseEntity<?> setInquiryInsert(@RequestBody Inquiry inquiry) {

        // 반환값 null 처리
        // - React에서 null처리에 대한 응답을 처리하기 위해 응답 상태 코드 값 정의
        if (this.inquiryService.setInquiryInsert(inquiry) == null) {
            String errMsg = " 아이디가 중복되었습니다.";

            // http 응답 상태 코드 값 409(Conflict)과 메세지로 응답
            return ResponseEntity.status(HttpStatus.CONFLICT).body(errMsg);
        }

        return ResponseEntity.ok(this.inquiryService.setInquiryInsert(inquiry));
    }

    @DeleteMapping(path = "/delete/{inq_id}")
    public ResponseEntity<Void> setmemberDelete(@PathVariable("inq_id") Integer inq_id) {

        log.info("회원 삭제하기 : inq_id={}", inq_id);

        // 삭제 처리를 위한 Service 메소드 호출
        this.inquiryService.setInquiryDelete(inq_id);

        // noContent().build() : 반환할 값이 없다는 것을 명시적으로 의미.
        return ResponseEntity.noContent().build();
    }

    @GetMapping(path = "/list_paging")
    public ResponseEntity<Page<Inquiry>> getInquiryListPaging(
            @RequestParam(name = "page", defaultValue = "1") int page,
            @RequestParam(name = "size", defaultValue = "10") int size) {

        log.info("InquiryList() 메소드 호출");

        Page<Inquiry> inquiry_list = this.inquiryService.getInquiryListPaging(page, size);

        return ResponseEntity.ok(inquiry_list);
    }

    @GetMapping(path = "/view/{inq_id}")
    //                                        요청하는 값(파라미터) mem_id라는 PK 값으로 동일하게
    public ResponseEntity<Inquiry> getInquiryView(@PathVariable("inq_id") Integer inq_id) {

        return ResponseEntity.ok(this.inquiryService.getInquiryView(inq_id));
    }

    

}
