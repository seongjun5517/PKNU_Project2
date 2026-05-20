package com.pknu.backend.controller;


import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;


import com.pknu.backend.service.ModelService;
import com.pknu.backend.model.Model;


@RestController
@RequestMapping("/modeldata")
@RequiredArgsConstructor
@Slf4j
public class ModelController {
    private final ModelService modelservice;

    @GetMapping("/view/{mem_id}")
    public ResponseEntity<List<Model>> getModelData(@PathVariable("mem_id") String mem_id) {
        log.info("요청된 mem_id = {}", mem_id);
        List<Model> result = this.modelservice.getModelDataByMemId(mem_id);
        return ResponseEntity.ok(result);
    }
    
}
