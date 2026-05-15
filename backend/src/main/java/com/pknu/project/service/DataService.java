package com.pknu.project.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.pknu.project.model.Data;
import com.pknu.project.repository.DataRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

// 해당 클래스가 service 클래스임을 정의하기 위한 어노테이션 정의
@Service

// final로 선언된 멤버 클래스 변수에 대한 클래스 자동 생성시키기
@RequiredArgsConstructor

// 실행 처리 진행중인 로그 남기기(터미널에 출력됨)
@Slf4j
public class DataService {

    private final DataRepository dataRepository;

    public List<Data> getDatalist() {

        log.info("회원 전체 목록 조회 Service 클래스 처리 시작...");

        // 조회 결과 Contorller 클래스에서 호출한 메소드에게 반환하기
        return this.dataRepository.findAll(); 
       
    }

    /**
     * 회원 상세 조회(한 건 조회)
     * @param data_id
     * @return
     */
    public Data getDataView(String data_id) {

        // Repository에 한 건 처리 요청 : 
        // -findById(mem_id) : 한 건 요청 시(조건 값 이용)
        Optional<Data> data = this.dataRepository.findById(data_id);

        // 조회 결과가 있다면 (null이 아니라면)
        if (data.isPresent()) {
            log.info("회원 아이디[%s]에 대한 정보를 정상적으로 조회하였음>>>".formatted(data_id));

            // Optional 안에 들어있는 실제 Member 클래스 추출하여 리턴하기
            return data.get();
        }

        return null;
       
    }

    /**
     * 자원 삭제하기
     * @param data_id
     * @return
     */
    public String setDataDelete(String data_id) {

        //  step 1.
        if (this.dataRepository.existsById(data_id)) {
            // step 2.
            this.dataRepository.deleteById(data_id);
            return "회원 아이디[%s]에 대한 정보가 삭제되었습니다.".formatted(data_id);
        }

        // step 3.

        return "회원 아이디[%s]에 대한 삭제할 정보가 존재하지 않습니다.".formatted(data_id);
    }

    public Data setDataInsert(Data data) {

        // step 1.
        if (this.dataRepository.existsById(data.getData_id())) {
            // step 2.
            // return "회원 아이디 [%s]에 대한 데이터가 이미 존재합니다.".formatted(member.getMem_id());

            return null;
        }

        // step 3.
        return this.dataRepository.save(data);

        // return "회원 아이디 [%s] 입력 성공".formatted(member.getMem_id());

    }

    public Page<Data> getDataListPaging(int page, int size) {

        log.info("회원 전체 목록 조회 Service 클래스 처리 시작...");

        Pageable pageable = PageRequest.of(page, size);

        Page<Data> data_list = this.dataRepository.findAll(pageable);

        return data_list;
    }

}