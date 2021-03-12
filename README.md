# 게시판 프로젝트(1인개발)

본래의 게시판기능과 자주사용하는 웹사이트의 기능들을 조금씩 붙여서 넣어서 프로젝트를 만듦.

기술스택
Html,Css,React,Firebase

---------------------------------------
## 폴더 및 파일 정리설명
1. /src/component 폴더(필요한 컴포넌트를 모아놓음)
2. /src/component/Items 폴더(필요한 버튼, 그리드, 리스트 등 간단하게 떼와서 사용가능한 아이템을 모아놓음)
3. /src/component/store 폴더(FireStore의 사용을 위한 Firebase의 설정 및 다크모드 구현을 위한 Redux의 Store를 모아놓음)
4. /src/component/css 폴더(css폴더를 모아놓음)

---------------------------------------
## 주요기능
1. Firebase를 이용한 전반적인 CRUD 기능.
2. Firebase의 Storage를 통한 이미지 업로드

---------------------------------------
## 개발중 막혔던점이나 힘들었던점
1. 이번에 Firebase를 처음 구현해보는것이라 Firebase의 정보를 찾아야했음.
2. 여러가지 화면이있는데 화면마다 어떤 요소를 넣을지 혼자 고민하는것이 힘들었음.
3. 최대한 하드코딩을 안하도록 유도하느라 힘들었음.
4. newsapi가 localhost에서만 무료로 지원을 하기때문에 다른 api를 찾아야했음.

### 위의 기재해놓은 막힌점이나 힘들었던점을 어떻게 해소했는지
Firebase의 경우 처음엔 구글링을하여 다른사람들이 구현을 한것을 보면서 어떻게 하는지 파악하고,
Firebase의 공식문서를 보며 연동법 및 사용법을 익힘.

2번의 경우 시간이 지남으로써 무엇을 넣을지 고민을 하여 하나씩 추가하게됬음.

3번의 경우 하드코딩이 본인이 생각하기에는 정말 효율이 떨어지고 하면 안되는 코딩이라고 생각하여서
해당 문제점을 최대한 해소하도록 코드를 어떻게 짤지 고민을하고 천천히 구현하였음.
하지만 그럼에도 아직 하드코드는 조금은 존재하는것같음.
또한 언젠가는 할 다른사람과의 협업을 위해서 이부분은 보완해야할 문제점임.

---------------------------------------
## 해당 프로젝트의 문제점
1. 게시글의 이미지구현.
2. 전반적인 디자인이 조금 부족한것같음.
3. Firebase로 백엔드를 대신하여서 본인이 원하는 쿼리가 실행이안되었음.(검색기능)

---------------------------------------
## 개발을 하며 조금이나마 깨달았던점
1인개발이라 자신이 어느곳에서 무엇을 구현하였고 어떤 코드를 썼는지 알지만,
다른사람이 보면 가독성이 조금 떨어질만한 코드를 조금 많이 쓴 것같다.
이로인해서 나 자신이 스스로 좀 불편한 코딩을 한것같아서 조금 걸린다
때문에 정말 이해가 안갈것같은 코드에선 주석을 어느정도 기재하였음.
앞으로 다른 프로젝트를 진행할때에 주석을 자주쓰고 유지보수가 쉽도록 코딩을 해야할것같음.

그리고 너무 혼자 자만하지말고 구글링을 하며 정보수집을 하고,
여러가지의 코드를 경험해봐야 할것같음.
