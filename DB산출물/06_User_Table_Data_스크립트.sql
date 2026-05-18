------------------------------------------------------------
-- DB 테이블 생성
------------------------------------------------------------

-- 사용자 계정 생성 + 접속권한 설정
-- Alter session set "_ORACLE_SCRIPT" = true;

------------------------------------------------------------
-- 1. 계정 생성
------------------------------------------------------------

-- CREATE USER project IDENTIFIED BY 1234;

------------------------------------------------------------
-- 2. 권한 부여
------------------------------------------------------------

-- GRANT CONNECT, RESOURCE TO project;

------------------------------------------------------------
-- 3. 저장 공간 할당
------------------------------------------------------------

-- ALTER USER project QUOTA UNLIMITED ON USERS;

------------------------------------------------------------
-- 기존 테이블 삭제
------------------------------------------------------------

DROP TABLE COMMENT_TEST CASCADE CONSTRAINTS;
DROP TABLE COMMUNITY_TEST CASCADE CONSTRAINTS;
DROP TABLE DATA_TEST CASCADE CONSTRAINTS;
DROP TABLE MEMBER_TEST CASCADE CONSTRAINTS;

------------------------------------------------------------
-- MEMBER_TEST
------------------------------------------------------------

CREATE TABLE MEMBER_TEST (

    MEM_ID         VARCHAR2(50) PRIMARY KEY,
    MEM_PHONE      VARCHAR2(15),
    MEM_NAME       VARCHAR2(20) NOT NULL

);

------------------------------------------------------------
-- DATA_TEST
------------------------------------------------------------

CREATE TABLE DATA_TEST (

    DATA_ID         NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    MEM_ID          VARCHAR2(50) NOT NULL,
    CHECK_DATE      DATE DEFAULT SYSDATE,

    -------------------------------------------------
    -- 질환 여부
    -------------------------------------------------

    DI1_DG          NUMBER,
    DI2_DG          NUMBER,
    DE1_DG          NUMBER,
    DI3_DG          NUMBER,

    -------------------------------------------------
    -- 건강 데이터
    -------------------------------------------------

    HE_HP           NUMBER,
    HE_GLU          NUMBER(5,1),
    HE_HBA1C        NUMBER(3,1),
    HE_CHOL         NUMBER(5,1),
    HE_TG           NUMBER(6,1),
    HE_BMI          NUMBER(5,2),
    HE_WC           NUMBER(5,1),

    -------------------------------------------------
    -- 생활 습관
    -------------------------------------------------

    BS1_1           NUMBER(2),
    BD1_11          NUMBER(2),
    BD2_1           NUMBER(2),
    PA_AEROBIC      NUMBER(3),
    BE8_1           NUMBER(3),

    -------------------------------------------------
    -- 인구사회학 정보
    -------------------------------------------------

    SEX             NUMBER(1),
    AGE             NUMBER(3),
    EDU             NUMBER(1),
    INCM            NUMBER(3,1),

    -------------------------------------------------
    -- 예측 결과
    -------------------------------------------------

    PREDICT         NUMBER(5,4),

    -------------------------------------------------
    -- FK
    -------------------------------------------------

    CONSTRAINT FK_DATA_MEMBER
        FOREIGN KEY (MEM_ID)
        REFERENCES MEMBER_TEST(MEM_ID)

);

------------------------------------------------------------
-- COMMUNITY_TEST
------------------------------------------------------------

CREATE TABLE COMMUNITY_TEST (

    COM_ID          NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    MEM_ID          VARCHAR2(50) NOT NULL,
    COM_TITLE       VARCHAR2(200),
    COM_CONTENT     CLOB,
    COM_VIEW        NUMBER DEFAULT 0,
    COM_LIKE        NUMBER DEFAULT 0,
    COM_CREATED     DATE DEFAULT SYSDATE,
    CONSTRAINT FK_COMMUNITY_MEMBER
        FOREIGN KEY (MEM_ID)
        REFERENCES MEMBER_TEST(MEM_ID)

);

------------------------------------------------------------
-- COMMENT_TEST
------------------------------------------------------------

CREATE TABLE COMMENT_TEST (

    COM_ID              NUMBER NOT NULL,
    MEM_ID              VARCHAR2(50) NOT NULL,
    COMMENT_CREATED     DATE DEFAULT SYSDATE,
    COMMENT_CONTENT     VARCHAR2(1000),

    -------------------------------------------------
    -- 복합 기본키
    -------------------------------------------------

    CONSTRAINT PK_COMMENT
        PRIMARY KEY (
            COM_ID,
            MEM_ID,
            COMMENT_CREATED
        ),

    -------------------------------------------------
    -- FK
    -------------------------------------------------

    CONSTRAINT FK_COMMENT_COMMUNITY
        FOREIGN KEY (COM_ID)
        REFERENCES COMMUNITY_TEST(COM_ID),

    CONSTRAINT FK_COMMENT_MEMBER
        FOREIGN KEY (MEM_ID)
        REFERENCES MEMBER_TEST(MEM_ID)

);

------------------------------------------------------------
-- MEMBER_TEST 샘플 데이터
------------------------------------------------------------

INSERT INTO MEMBER_TEST VALUES ('user1', '010-1111-1111', '홍길동');
INSERT INTO MEMBER_TEST VALUES ('user2', '010-2222-2222', '이순신');
INSERT INTO MEMBER_TEST VALUES ('user3', '010-3333-3333', '강감찬');
INSERT INTO MEMBER_TEST VALUES ('user4', '010-3333-3333', '신사임당');
INSERT INTO MEMBER_TEST VALUES ('user5', '010-3333-3333', '강감찬1');
------------------------------------------------------------
-- COMMUNITY_TEST 샘플 데이터
------------------------------------------------------------

INSERT INTO COMMUNITY_TEST (
    MEM_ID,
    COM_TITLE,
    COM_CONTENT
)

VALUES (
    'user1',
    '첫 번째 게시글',
    '게시글 내용입니다.'
);

------------------------------------------------------------
-- COMMENT_TEST 샘플 데이터
------------------------------------------------------------

INSERT INTO COMMENT_TEST (
    COM_ID,
    MEM_ID,
    COMMENT_CREATED,
    COMMENT_CONTENT
)

VALUES (
    1,
    'user2',
    SYSDATE,
    '댓글 테스트입니다.'
);

------------------------------------------------------------
-- DATA_TEST 샘플 데이터
------------------------------------------------------------

INSERT INTO DATA_TEST (

    MEM_ID,
    CHECK_DATE,

    DI1_DG,
    DI2_DG,
    DE1_DG,
    DI3_DG,

    HE_HP,
    HE_GLU,
    HE_HBA1C,
    HE_CHOL,
    HE_TG,
    HE_BMI,
    HE_WC,

    BS1_1,
    BD1_11,
    BD2_1,
    PA_AEROBIC,
    BE8_1,

    SEX,
    AGE,
    EDU,
    INCM,

    PREDICT

)

VALUES (

    'user1',
    SYSDATE,

    1,
    0,
    0,
    0,

    1,
    98.5,
    5.4,
    180.2,
    120.5,
    23.45,
    82.1,

    1,
    2,
    3,
    150,
    8,

    1,
    25,
    4,
    3.5,

    0.1234

);

--------------------------------------------------------------
-- 조회
--------------------------------------------------------------
SELECT * FROM MEMBER_TEST;
SELECT * FROM DATA_TEST;
SELECT * FROM COMMUNITY_TEST;
SELECT * FROM COMMENT_TEST;

--------------------------------------------------------------
-- 저장
--------------------------------------------------------------
COMMIT;


