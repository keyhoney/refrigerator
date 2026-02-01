# 냉장고 식재료 관리 웹앱 🧊

냉장고와 냉동실의 식재료를 쉽게 관리할 수 있는 웹 애플리케이션입니다.

## 주요 기능

- **냉장/냉동 구분**: 탭 UI로 냉장실과 냉동실 식재료를 분리하여 관리
- **식재료 관리**: 추가, 수정, 삭제 기능
- **소비기한 알림**: 기한 임박(노란색), 기한 초과(빨간색) 시각적 표시
- **카테고리 시스템**: 기본 카테고리 + 사용자 정의 카테고리
- **순서 조정**: 위/아래 버튼으로 식재료 순서 변경 가능
- **반응형 디자인**: 모바일에서도 편리하게 사용

## 기술 스택

- React + Vite
- Tailwind CSS
- Firebase Firestore
- GitHub Pages

## 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. Firebase 설정

1. [Firebase Console](https://console.firebase.google.com/)에서 새 프로젝트 생성
2. Firestore Database 활성화 (테스트 모드로 시작)
3. 웹 앱 추가
4. `src/firebase/config.js` 파일에서 Firebase 설정값 교체:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
}
```

### 3. 개발 서버 실행

```bash
npm run dev
```

### 4. 배포

Firebase 설정 후 [DEPLOY.md](DEPLOY.md)를 참고하세요.

**Git + Node.js 사용 시** (권장):

```powershell
git add .
git commit -m "변경 내용"
git push
npm run deploy
```

GitHub Settings → Pages에서 **gh-pages** 브랜치를 선택하면  
**https://keyhoney.github.io/refrigerator/** 에서 접속 가능합니다.

## Firestore 보안 규칙

프로덕션 환경에서는 아래 보안 규칙을 적용하세요:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

> 참고: 위 규칙은 모든 사용자에게 읽기/쓰기를 허용합니다. 
> 개인용으로 사용 시 문제없지만, 필요에 따라 보안 규칙을 강화하세요.

## 라이선스

MIT License
