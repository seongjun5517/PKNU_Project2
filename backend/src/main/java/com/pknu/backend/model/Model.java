package com.pknu.backend.model;

import java.math.BigDecimal;
import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name="data_test")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class Model {

    @Id
    private Integer DATA_ID;

    @Column(name= "MEM_ID")
    private String mem_id;
    
    private LocalDate CHECK_DATE;
    private Integer DI1_DG;
    private Integer DI2_DG;
    private Integer DE1_DG;
    private Integer DI3_DG;
    private Integer HE_HP;
    private BigDecimal HE_GLU;
    private BigDecimal HE_HBA1C;
    private BigDecimal HE_CHOL;
    private BigDecimal HE_TG;
    private BigDecimal HE_BMI;
    private BigDecimal HE_WC;
    private BigDecimal BS1_1;
    private BigDecimal BD1_11;
    private BigDecimal BD2_1;
    private BigDecimal PA_AEROBIC;
    private BigDecimal BE8_1;
    private BigDecimal SEX;
    private BigDecimal AGE;
    private BigDecimal EDU;
    private BigDecimal INCM;
    private BigDecimal PREDICT;
    
}
