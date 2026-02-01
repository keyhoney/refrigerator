import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Firebase 설정
// 아래 값들을 Firebase Console에서 복사한 값으로 교체해주세요.
// Firebase Console > 프로젝트 설정 > 일반 > 내 앱 > 웹 앱 > SDK 설정 및 구성
const firebaseConfig = {
  apiKey: "AIzaSyBSfmmAYJAi3vXg3ZclB0PiBaNyV2lJ24s",
  authDomain: "self-check-3d44e.firebaseapp.com",
  projectId: "self-check-3d44e",
  storageBucket: "self-check-3d44e.firebasestorage.app",
  messagingSenderId: "1013380899103",
  appId: "1:1013380899103:web:3f3125f116446835c3d02a"
}

// Firebase 초기화
const app = initializeApp(firebaseConfig)

// Firestore 데이터베이스
export const db = getFirestore(app)

export default app
