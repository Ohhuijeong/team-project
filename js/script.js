//js
/* 
    PC 
    -1) 마우스를 올리면 2depth 메뉴가 표시
    -2) 마우스가 벗어나면 메뉴 닫기

    MObile
    -1) 햄버거버튼 클릭 -> 전체메뉴 열기(gnb)
    -2) 1depth를 클릭 -> 2depth 아코디언 기능으로 메뉴가 보여짐
*/
//html 요소 선택자
const menuBtn = document.querySelector(".menu-btn");
const gnb = document.querySelector(".gnb");

//모든 1depth 메뉴 가져오기
const gnbItems = document.querySelectorAll(".gnb-item");//li

/* 모바일 햄버거 메뉴 */
menuBtn.addEventListener('click', () => {
    //버튼에 active에 있으면 X
    //없으면 햄버거모양
    menuBtn.classList.toggle('active')

    //navigation 열기
    gnb.classList.toggle('open')

    /* 메뉴가 열려있는지 확인 */
    const isOpen = gnb.classList.contains('open');
    menuBtn.setAttribute('aria-expanded', isOpen)

    //메뉴 상태에 버튼 설명
    if (isOpen) {
        //true- gnb가 열린 상태
        menuBtn.setAttribute('aria-label', '메뉴닫기')
    } else {
        menuBtn.setAttribute('aria-label', '메뉴열기')
    }
}); //모바일 버튼을 클릭했을 때

/* 각각의 1depth 메뉴 이벤트 */
gnbItems.forEach((item) => {
    //console.log(item)
    //현재 메뉴 안에 있는 1depth 링크 찾기
    const link = item.querySelector('.gnb-link') //a요소
    //console.log(link)

    //현재 메뉴 안에 2depth가 있는지 확인
    const subMenu = item.querySelector(".sub-menu")//sub ul요소

    /*================ pc_menu =================*/
    //mouse가 메뉴에 올라가면
    item.addEventListener('mouseenter', () => {
        if (window.innerWidth > 768) {
            //현재 열려있는 메뉴들을 먼저 닫는다
            closeAllMenu();
            //현재 메뉴에 active 추가
            item.classList.add('active')
        }
    });

    //마우스가 영역에서 벗어났을 때
    item.addEventListener('mouseleave', () => {
        if (window.innerWidth > 768) {
            item.classList.remove('active')
        }
    })


    /* ============ Mobile Menu ================== */
    link.addEventListener('click', (event) => {
        //모바일 화면일때만 실행
        if (window.innerWidth <= 768) {
            //현재 메뉴에 2depth가 없으면 아래코드를 실행안함.
            if (!subMenu) {
                return;
            }

            /* # 링크로 이동하는 기본 동작 막기 */
            event.preventDefault();

            //현재 메뉴가 열려있는지 확인
            const isActive = item.classList.contains('active')
            console.log('isActive :', isActive); //false

            //다른 메뉴들은 닫기
            closeAllMenu()

            if (!isActive) {
                item.classList.add('active')
            }
        }
    })
});

/* 모든 2depth 메뉴 닫기 - 여러곳에서 호출하므로 함수로 만듦. */
function closeAllMenu() {
    gnbItems.forEach((item) => {
        item.classList.remove('active')
    })
}

/* 화면 크기가 변경되었을 때 초기화 */
window.add('resize', () => {
    closeAllMenu();

    if (window.innerWidth > 768) {
        gnb.classList.remove('open');
        menuBtn.classList.remove('active');
        menuBtn.setAttribute('aria-expanded', 'false')
        menuBtn.setAttribute('aria-label', '메뉴열기')
    }
})

