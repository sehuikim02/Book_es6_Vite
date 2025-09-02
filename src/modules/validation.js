import { stringUtils } from "../utils/helpers"

const { isEmpty, safeTrim } = stringUtils

// 유효성 검사 모듈 - 구조분해할당과 화살표 함수 사용

// 정규식 패턴들 - 각 필드의 유효한 형식을 정의
export const patterns = {
    studentNumber: /^[A-Za-z]\d{5}$/,
    phoneNumber: /^[0-9-\s]+$/,
    pageCount: /^[1-9][0-9]*$/, // 1 이상의 정수만 허용
    coverImageUrl: /^(https?:\/\/)?([\w\-]+\.)+[\w\-]+(\/\S*)?$/,
    publishDate: /^\d{4}-\d{2}-\d{2}$/ // YYYY-MM-DD 형식
}

// 에러 메시지들을 타입별로 분류하여 관리
export const messages = {
    // 필수 입력 필드가 비어있을 때 표시할 메시지들
    required: {
        title: '제목을 입력해주세요.',
        author: '저자를 입력해주세요.',
        isbn: 'ISBN을 입력해주세요.',
        price: '가격을 입력해주세요.',
        publishDate: '출판일을 입력해주세요.',
        detail: {
            description: '정보를 입력해주세요.',
            language: '언어를 입력해주세요.',
            pageCount: '페이지 수를 입력해주세요.',
            publisher: '출판사를 입력해주세요.',
            coverImageUrl: '표지 이미지 URL을 입력해주세요.',
            edition: '판형을 입력해주세요.'
        }

    },

    // 입력 형식이 올바르지 않을 때 표시할 메시지들
    format: {
        isbn: 'ISBN은 하이픈을 포함한 10-13자리로 설정해주세요. 예: 978-3-16-148410-0',
        coverImageUrl: '올바른 이미지 URL 형식이 아닙니다. 예: http://example.com/image.jpg',
        price: '올바른 가격 형식이 아닙니다. 예: 10000',
        pageCount: '페이지 수는 0보다 큰 숫자여야 합니다. 예: 300'
    }
}

// 개별 필드별 검증 함수들을 담은 객체 (화살표 함수 사용)
const validators = {
    title: (title) => {
        if (isEmpty(title)) {
            return {
                isValid: false,                    // 검증 실패
                message: messages.required.title,   // 에러 메시지
                field: 'title'                      // 문제가 발생한 필드명
            }
        }
        // 3단계: 모든 검증 통과
        return { isValid: true }
    },
    // 제목 필드 검증 함수
    isbn: (isbn) => {
        // 1단계: 필수 입력 확인 - 값이 없거나 공백만 있는 경우
        // !isbn : null, undefined, 빈 문자열을 체크
        // isbn.trim().length === 0 : 공백만 있는 문자열을 체크
        if (isEmpty(isbn)) {
            return {
                isValid: false,                    // 검증 실패
                message: messages.required.isbn,   // 에러 메시지
                field: 'isbn'                      // 문제가 발생한 필드명
            }
        }

        // 2단계: ISBN 형식 확인 - 하이픈 포함 10~13자리
        // ^\d{1,5}-\d{1,7}-\d{1,7}-[\dX]{1,7}$ : ISBN-10/13 기본 패턴 (하이픈 포함)
        // 또는 978-3-16-148410-0 같은 형식 허용
        const isbnPattern = /^(97(8|9))?\d{1,5}-\d{1,7}-\d{1,7}-[\dX]{1,7}$/;
        if (!isbnPattern.test(safeTrim(isbn))) {
            return {
            isValid: false,
            message: messages.format.isbn,
            field: 'isbn'
            }
        }
        // 3단계: 모든 검증 통과
        return { isValid: true }
    },

    author: (author) => {
        if (isEmpty(author)) {
            return {
                isValid: false,
                message: messages.required.author,
                field: 'author'
            }
        }
        return { isValid: true }
    },

    // 저자 필드 검증 함수
    coverImageUrl: (coverImageUrl) => {
        // 1단계: 필수 입력 확인
        if (isEmpty(coverImageUrl)) {
            return {
                isValid: false,
                message: messages.required.coverImageUrl,
                field: 'coverImageUrl'
            }
        }

        // 2단계: 정규식 패턴 매칭 확인
        // patterns.coverImageUrl.test() : 정규식이 문자열과 매치되는지 확인 (true/false 반환)
        // .trim() : 앞뒤 공백 제거 후 검사
        if (!patterns.coverImageUrl.test(safeTrim(coverImageUrl))) {
            return {
                isValid: false,
                message: messages.format.coverImageUrl,
                field: 'coverImageUrl'
            }
        }

        // 3단계: 모든 검증 통과
        return { isValid: true }
    },

    // 가격 필드 검증 함수
    price: (price) => {
        // 1단계: 필수 입력 확인
        if (isEmpty(price)) {
            return {
                isValid: false,
                message: messages.required.price,
                field: 'price'
            }
        }

        // 2단계: 최소 길이 확인 - 가격은 너무 짧으면 유효하지 않을 가능성이 높음
        if (safeTrim(price) > 0) {
            return {
                isValid: false,
                message: '가격은 0보다 큰 숫자여야 합니다.',
                field: 'price'
            }
        }

        // 3단계: 모든 검증 통과
        return { isValid: true }
    },

    // 전화번호 필드 검증 함수
    pageCount: (pageCount) => {
        // 1단계: 필수 입력 확인
        if (isEmpty(pageCount)) {
            return {
                isValid: false,
                message: messages.required.pageCount,
                field: 'pageCount'
            }
        }

        // 2단계: 페이지 수 형식 확인 - 숫자만 허용
        if (!patterns.pageCount.test(safeTrim(pageCount))) {
            return {
                isValid: false,
                message: messages.format.pageCount,
                field: 'pageCount'
            }
        }

        // 3단계: 모든 검증 통과
        return { isValid: true }
    },

    // 출판일 필드 검증 함수
    publishDate: (publishDate) => {
        // 1단계: 필수 입력 확인
        if (isEmpty(publishDate)) {
            return {
                isValid: false,
                message: messages.required.publishDate,
                field: 'publishDate'
            }
        }

        // 2단계: 출판일 형식 확인 - 기본적인 날짜 패턴 매칭
        if (!patterns.publishDate.test(safeTrim(publishDate))) {
            return {
                isValid: false,
                message: messages.format.publishDate,
                field: 'publishDate'
            }
        }

        // 3단계: 모든 검증 통과
        return { isValid: true }
    },

    detail: (detail) => {
        // 1단계: 필수 입력 확인
        if (isEmpty(detail)) {
            return {
                isValid: false,
                message: messages.required.publishDate,
                field: 'publishDate'
            }
        }

        // 3단계: 모든 검증 통과
        return { isValid: true }
    }
}

// 메인 검증 함수 - 책 객체 전체를 검증 (구조분해할당 사용)
export const validateBook = (book) => {
    // 1단계: 입력 데이터 자체가 존재하는지 확인
    if (!book) {
        return { isValid: false, message: '책 데이터가 필요합니다.' }
    }

    // 2단계: 구조분해할당으로 필요한 데이터 추출
    // book 객체에서 title, author, isbn, coverImageUrl, price, pageCount, publishDate 속성을 추출
    const { title, author, isbn, coverImageUrl, price, pageCount, publishDate } = book

    // 3단계: 기본 필드들 순차적 검증 (title, author, isbn)

    // 제목 검증
    const titleResult = validators.title(title)
    if (!titleResult.isValid) {
        return titleResult  // 검증 실패 시 즉시 결과 반환 (Early Return 패턴)
    }

    // 저자 검증
    const authorResult = validators.author(author)
    if (!authorResult.isValid) {
        return authorResult  // 검증 실패 시 즉시 결과 반환
    }

    // 4단계: 상세 정보(detailRequest)가 있는 경우에만 세부 검증 수행
    if (book.detail) {
        // 구조분해할당으로 상세 정보에서 필요한 필드들 추출
        const { pageCount, coverImageUrl } = book.detail

        // 페이지 수 검증
        const pageCountResult = validators.pageCount(pageCount)
        if (!pageCountResult.isValid) {
            return pageCountResult  // 검증 실패 시 즉시 결과 반환
        }

        // 표지 이미지 URL 검증
        const coverImageUrlResult = validators.coverImageUrl(coverImageUrl)
        if (!coverImageUrlResult.isValid) {
            return coverImageUrlResult  // 검증 실패 시 즉시 결과 반환
        }
    }

    // 5단계: 모든 검증을 통과한 경우
    return { isValid: true }
}

// 실시간 검증 함수 - 사용자가 입력하는 중에 개별 필드를 검증할 때 사용
export const validateField = (fieldName, value) => {
    // 1단계: 해당 필드명에 대응하는 검증 함수가 있는지 확인
    // validators 객체에서 fieldName에 해당하는 함수를 찾음
    const validator = validators[fieldName]

    // 2단계: 검증 함수가 없는 경우 (잘못된 필드명)
    if (!validator) {
        return {
            isValid: true,  // 알 수 없는 필드는 일단 통과로 처리
            message: '알 수 없는 필드입니다.'
        }
    }

    // 3단계: 해당 검증 함수 실행하여 결과 반환
    return validator(value)
}

/*
사용 예시:

// 전체 학생 데이터 검증
const studentData = {
    name: '홍길동',
    studentNumber: 'S12345',
    detailRequest: {
        address: '서울시 강남구',
        phoneNumber: '010-1234-5678',
        email: 'hong@example.com'
    }
}

const result = validateStudent(studentData)
if (!result.isValid) {
    console.log(`검증 실패: ${result.message}`)
    console.log(`문제 필드: ${result.field}`)
}

// 개별 필드 검증 (실시간 검증용)
const emailResult = validateField('email', 'invalid-email')
if (!emailResult.isValid) {
    console.log(`이메일 오류: ${emailResult.message}`)
}
*/