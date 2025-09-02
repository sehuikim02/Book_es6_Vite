## 프로젝트 구조

```
student-es6-vite/
├── index.html
├── package.json  
├── vite.config.js
└── src/
    ├── main.js              # 메인 앱 로직
    ├── modules/
    │   ├── api.js           # API 통신 담당
    │   ├── validation.js    # 유효성 검사 담당
    │   └── ui.js            # UI 관리 담당
    ├── utils/
    │   └── helpers.js       # 유틸리티 함수들
    └── css/
        └── style.css        # 스타일시트
```


## 핵심 ECMAScript 기능 (Level2)


### 1. 모듈 시스템 (ES6 Modules)
```javascript
// api.js에서 내보내기
export const apiService = {
    getStudents: async () => { ... }
}

// main.js에서 가져오기
import { apiService } from './modules/api.js'
import { validateStudent } from './modules/validation.js'
```


### 2. 구조분해할당 (Destructuring) - 기본편
```javascript
// 객체에서 값 추출
const { name, studentNumber } = student

// 기본값과 함께 사용
const { name = '', studentNumber = '', detail = {} } = student
const { address = '', phoneNumber = '' } = detail


// 함수에서 활용
const getFormData = () => {
    const name = formData.get('name') || ''
    const studentNumber = formData.get('studentNumber') || ''
   
    return { name: name.trim(), studentNumber: studentNumber.trim() }
}
```

### 3. 화살표 함수 (Arrow Functions) - 기본편
```javascript
// 기존 함수
function showMessage(message) {
    console.log(message)
}

// 화살표 함수
const showMessage = (message) => {
    console.log(message)
}

// 한 줄 함수
const getName = (student) => student.name
```

### 4. async/await - 기본편
```javascript
// 기존 방식 (Promise)
fetch('/api/students')
    .then(response => response.json())
    .then(data => console.log(data))

// async/await 방식
const loadStudents = async () => {
    try {
        const response = await fetch('/api/students')
        const data = await response.json()
        console.log(data)
    } catch (error) {
        console.error(error)
    }
}
```

### 5. 템플릿 리터럴 (Template Literals)
```javascript
// 기존 방식
const message = "이름 = " + studentName + " 학생을 삭제하시겠습니까?"


// 템플릿 리터럴
const message = `이름 = ${studentName} 학생을 삭제하시겠습니까?`

// HTML 생성에 활용
const html = `
    <tr>
        <td>${name}</td>
        <td>${studentNumber}</td>
    </tr>
`
```

### 6. const와 let 사용
```javascript
// 변하지 않는 값 (상수)
const API_BASE_URL = 'http://localhost:8080'


// 나중에 값이 바뀔 수 있는 변수
let editingStudentId = null
let messageTimer = null
```