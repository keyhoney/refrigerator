# GitHub Pages 배포 가이드

Firebase 설정이 완료되었다면, 아래 순서대로 진행하면 됩니다.

---

## Git + Node.js로 배포 (권장)

Git과 Node.js가 설치되어 있으면 아래 명령으로 배포할 수 있습니다.

**배포 URL**: https://keyhoney.github.io/refrigerator/

### 최초 1회 (이미 완료된 상태)

- `git init` → `git add .` → `git commit` → `git branch -M main`
- `git remote add origin https://github.com/keyhoney/refrigerator.git`
- `git push -u origin main`
- `npm run deploy` (dist를 gh-pages 브랜치로 푸시)

### GitHub Pages 설정 (최초 1회)

**방법 A – GitHub Actions 사용 (gh-pages 브랜치가 안 보일 때)**

1. https://github.com/keyhoney/refrigerator → **Settings** → **Pages**
2. **Build and deployment**에서 **Source**를 **GitHub Actions**로 선택
3. 저장 후, main 브랜치에 푸시하면 자동으로 빌드·배포됨

**방법 B – gh-pages 브랜치 사용**

1. **Source**를 **Deploy from a branch**로 선택
2. **Branch**: `gh-pages` / **/(root)** 선택 후 **Save**

### 코드 수정 후 재배포

**GitHub Actions 사용 시** (Source를 GitHub Actions로 설정한 경우):

```powershell
cd C:\dev\refrigerator
git add .
git commit -m "변경 내용 설명"
git push
```
푸시만 하면 자동으로 빌드·배포됩니다.

**gh-pages 브랜치 사용 시**:

```powershell
git add .
git commit -m "변경 내용 설명"
git push
npm run deploy
```

---

## npm이 인식되지 않을 때 (Node.js 설치)

**"npm을(를) 찾을 수 없습니다"** 오류가 나면 Node.js가 설치되지 않은 것입니다. npm은 Node.js에 포함되어 있습니다.

1. **[Node.js 공식 사이트](https://nodejs.org/ko)** 접속
2. **LTS** 버전(권장) 다운로드 후 설치
3. 설치 시 **"Add to PATH"** 옵션이 있으면 반드시 체크
4. **PowerShell/명령 프롬프트를 완전히 닫았다가 다시 연 다음** 아래 명령으로 확인:

   ```powershell
   node -v
   npm -v
   ```
   버전 번호가 나오면 설치된 것입니다.

5. 그다음 프로젝트 폴더(`C:\dev\refrigerator`)로 이동해서 **의존성 설치** 한 번 실행:

   ```powershell
   cd C:\dev\refrigerator
   npm install
   ```

6. 이제 **1. 빌드하기** 단계로 진행하면 됩니다.

---

## 1. 빌드하기

프로젝트 폴더에서 PowerShell 또는 명령 프롬프트를 열고:

```powershell
cd C:\dev\refrigerator
npm run build
```

완료되면 **dist** 폴더가 생성됩니다.

## 2. GitHub 레포지토리 생성

1. [GitHub](https://github.com)에 로그인
2. 우측 상단 **+** → **New repository**
3. Repository name: **refrigerator**
4. Public 선택 후 **Create repository**
5. "uploading an existing file" 문구의 **uploading an existing file** 링크를 클릭

## 3. dist 폴더 내용 업로드

1. **dist** 폴더를 연 다음, **그 안에 있는 모든 파일·폴더**를 선택
   - `index.html` (파일)
   - `refrigerator` 폴더 (전체)
2. 이 파일·폴더를 GitHub 페이지의 드래그 앤 드롭 영역으로 끌어다 놓기  
   (또는 "choose your files"로 하나씩 선택)
3. 맨 아래 **Commit changes** 버튼 클릭

> 주의: **dist 폴더 자체**가 아니라, **dist 안에 있는 것들**을 업로드해야 합니다.

## 4. GitHub Pages 켜기

1. 해당 레포지토리에서 **Settings** 탭 클릭
2. 왼쪽 메뉴에서 **Pages** 클릭
3. **Source**에서 **Deploy from a branch** 선택
4. **Branch**에서 **main** 선택, **/(root)** 선택
5. **Save** 클릭

1~2분 정도 지나면 **https://본인GitHub아이디.github.io/refrigerator/** 에서 접속할 수 있습니다.

## 5. 나중에 수정 후 다시 배포할 때

1. 로컬에서 코드 수정
2. `npm run build` 다시 실행
3. GitHub 레포지토리 페이지로 이동
4. **dist** 안의 내용이 바뀐 파일만 골라서, 해당 파일이 있는 위치로 들어가 **Update** 또는 새로 업로드  
   (또는 기존 파일 삭제 후 새로 빌드한 dist 내용 전체를 다시 업로드해도 됩니다)

## 문제 해결

- **"npm을(를) 찾을 수 없습니다"**: 위 **"npm이 인식되지 않을 때"** 절차대로 Node.js를 설치한 뒤, 터미널을 **다시 연 다음** `npm install` → `npm run build` 실행
- **빈 화면이 나올 때**: 레포 이름이 **refrigerator**인지, Pages 설정에서 **gh-pages** 브랜치 **/(root)** 인지 확인 (Git 배포 시)
- **이미지·스타일이 안 보일 때**: dist 안의 **refrigerator** 폴더까지 함께 업로드했는지 확인
