------------------------------------------------------------
-- DB 테이블 생성
------------------------------------------------------------

-- 사용자 계정 생성 + 접속권한 설정
-- Alter session set "_ORACLE_SCRIPT" = true;

------------------------------------------------------------
-- 1. 계정 생성
------------------------------------------------------------

-- 계정 이름 : project
-- 비밀번호 : 1234

-- CREATE USER project IDENTIFIED BY 1234;

------------------------------------------------------------
-- 2. 권한 부여
------------------------------------------------------------

-- 생성된 사용자에게 DB 접근 권한 부여

-- GRANT CONNECT, RESOURCE TO project;

------------------------------------------------------------
-- 3. 저장 공간 할당
------------------------------------------------------------

-- DB에 데이터를 저장할 수 있는 공간 확보

-- ALTER USER project QUOTA UNLIMITED ON USERS;

------------------------------------------------------------
-- 4. 기존 테이블 삭제(오류 무시해도 됨)
------------------------------------------------------------

DROP TABLE COMMUNITY_TEST CASCADE CONSTRAINTS;
DROP TABLE HEALTH_DIAGNOSE_TEST CASCADE CONSTRAINTS;
DROP TABLE MEMBER_TEST CASCADE CONSTRAINTS;

------------------------------------------------------------
-- MEMBER 테이블
------------------------------------------------------------

CREATE TABLE MEMBER_TEST (

    MEM_ID          VARCHAR2(15) PRIMARY KEY,
    MEM_PASS        VARCHAR2(100) NOT NULL,
    MEM_NAME        VARCHAR2(20) NOT NULL,

    -------------------------------------------------
    -- 회원 정보
    -------------------------------------------------

    MEM_ADD         VARCHAR2(100),
    MEM_MAIL        VARCHAR2(50),

    -------------------------------------------------
    -- 날짜
    -------------------------------------------------
    MEM_CREATED     DATE DEFAULT SYSDATE
    
);

------------------------------------------------------------
-- HEALTH_DIAGNOSE 테이블
------------------------------------------------------------

CREATE TABLE HEALTH_DIAGNOSE_TEST (

    DIAGNOSIS_ID    NUMBER PRIMARY KEY,
    MEM_ID          VARCHAR2(15) NOT NULL,
    CHECK_DATE      DATE DEFAULT SYSDATE,

    -------------------------------------------------
    -- 인구사회학 정보
    -------------------------------------------------

    SEX             VARCHAR2(10),
    AGE             NUMBER(3),
    EDU             NUMBER(1),
    INCM            NUMBER(1),

    -------------------------------------------------
    -- 질환 여부
    -------------------------------------------------

    DI1_DG          NUMBER(1),
    DI2_DG          NUMBER(1),
    DE1_DG          NUMBER(1),
    DI3_DG          NUMBER(1),

    -------------------------------------------------
    -- 혈압
    -------------------------------------------------

    HE_SBP          NUMBER(5,1),
    HE_DBP          NUMBER(5,1),
    HE_HP           NUMBER(1),

    -------------------------------------------------
    -- 당뇨
    -------------------------------------------------

    HE_GLU          NUMBER(6,2),
    HE_HBA1C        NUMBER(4,2),

    -------------------------------------------------
    -- 지질검사
    -------------------------------------------------

    HE_CHOL         NUMBER(6,2),
    HE_HDL          NUMBER(6,2),
    HE_LDL          NUMBER(6,2),
    HE_TG           NUMBER(6,2),

    -------------------------------------------------
    -- 비만
    -------------------------------------------------

    HE_WC           NUMBER(5,2),
    HE_BMI          NUMBER(4,2),

    -------------------------------------------------
    -- 생활습관
    -------------------------------------------------

    BS1_1           NUMBER(2),
    BD1_11          NUMBER(2),
    BD2_1           NUMBER(2),
    PA_AEROBIC      NUMBER(1),
    BE8_1           NUMBER(4),

    -------------------------------------------------
    -- FK
    -------------------------------------------------

    CONSTRAINT FK_MEMBER
        FOREIGN KEY (MEM_ID)
        REFERENCES MEMBER_TEST(MEM_ID)

);

------------------------------------------------------------
-- COMMUNITY 테이블
------------------------------------------------------------

CREATE TABLE COMMUNITY_TEST (

    COM_ID          NUMBER PRIMARY KEY,
    MEM_ID          VARCHAR2(15) NOT NULL,
    COM_TITLE       VARCHAR2(200),
    COM_CONTENT     CLOB,
    COM_VIEW        NUMBER,
    COM_LIKE        NUMBER,
    COM_CREATED     DATE DEFAULT SYSDATE,

    -------------------------------------------------
    -- FK
    -------------------------------------------------

    CONSTRAINT FK_COMMUNITY_MEMBER
        FOREIGN KEY (MEM_ID)
        REFERENCES MEMBER_TEST(MEM_ID)

);

---------------------------------------------------------------
-- MEMBER_TEST 테스트 데이터
------------------------------------------------------------

INSERT INTO MEMBER_TEST (

    MEM_ID,
    MEM_PASS,
    MEM_NAME,
    MEM_ADD,
    MEM_MAIL

)

VALUES (

    'user01',
    '1234',
    '홍길동',
    '부산광역시',
    'hong@test.com'

);

------------------------------------------------------------
-- HEALTH_DIAGNOSE_TEST 테스트 데이터
------------------------------------------------------------

INSERT INTO HEALTH_DIAGNOSE_TEST (

    DIAGNOSIS_ID,
    MEM_ID,
    CHECK_DATE,
    SEX,
    AGE,
    EDU,
    INCM,
    DI1_DG,
    DI2_DG,
    DE1_DG,
    DI3_DG,
    HE_SBP,
    HE_DBP,
    HE_HP,
    HE_GLU,
    HE_HBA1C,
    HE_CHOL,
    HE_HDL,
    HE_LDL,
    HE_TG,
    HE_WC,
    HE_BMI,
    BS1_1,
    BD1_11,
    BD2_1,
    PA_AEROBIC,
    BE8_1

)

VALUES (

    1,
    'user01',
    SYSDATE,
    '남',
    27,
    4,
    3,
    1,
    1,
    1,
    0,
    135,
    88,
    4,
    126.5,
    6.5,
    220.5,
    45.2,
    140.3,
    180.5,
    92.5,
    27.3,
    2,
    5,
    3,
    0,
    9

);

------------------------------------------------------------
-- COMMUNITY_TEST 테스트 데이터
------------------------------------------------------------

INSERT INTO COMMUNITY_TEST (

    COM_ID,
    MEM_ID,
    COM_TITLE,
    COM_CONTENT,
    COM_VIEW,
    COM_LIKE,
    COM_CREATED

)

VALUES (

    1,
    'user01',
    '건강 관리 팁 공유',
    '매일 30분 이상 걷기 운동을 하고 있습니다.',
    10,
    3,
    SYSDATE

);

------------------------------------------------------------
-- 조회
------------------------------------------------------------

SELECT * FROM MEMBER_TEST;
SELECT * FROM HEALTH_DIAGNOSE_TEST;
SELECT * FROM COMMUNITY_TEST;

------------------------------------------------------------
-- 저장
------------------------------------------------------------

COMMIT;


