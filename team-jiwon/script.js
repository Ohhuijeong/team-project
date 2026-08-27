/* 
    PC
    1) 마우스 올리면 2depth 메뉴가 표시
    2) 마우스 벗어나면 메뉴 닫기

    mobile
    1) 햄버거버튼 클릭 -> 전체메뉴 열기 (gnb)
    2) 1depth 클릭 -> 2depth 아코디언 기능으로 메뉴가 보여짐
*/

const menuBtn = document.querySelector(".menu-btn");
const gnb = document.querySelector(".gnb");
/* 1depth */
const gnbItems = document.querySelectorAll(".gnb-item");

menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active')
    gnb.classList.toggle('open')

    /* 메뉴가 열려있는지 확인 */
    const isOpen = gnb.classList.contains('open');
    menuBtn.setAttribute('aria-expanded', isOpen)

    /* 메뉴 상태에 버튼 설명 */
    if (isOpen) {
        menuBtn.setAttribute('aria-label', '메뉴닫기')
    } else {
        menuBtn.setAttribute('aria-label', '메뉴열기')
    }
})

/* 각각의 1depth 메뉴 이벤트 */
gnbItems.forEach((item) => {
    //1depth 찾기
    const link = item.querySelector('.gnb-link')

    //2depth 찾기
    const subMenu = item.querySelector('.sub-menu')

    /* ==================PC메뉴================== */
    item.addEventListener('mouseenter', () => {
        if (window.innerWidth > 768) {
            //현재 열려있는 메뉴 닫기
            closeAllMenu()
            //현재 메뉴에 active 클래스 추가
            item.classList.add('active')
        }
    })
    item.addEventListener('mouseleave', () => {
        if (window.innerWidth > 768) {
            //현재 메뉴에 active 클래스 제거
            item.classList.remove('active')
        }
    })
    /* ==================모바일메뉴================== */
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            //현재메뉴에 2depth가 없으면 아래 코드 실행 안함
            if (!subMenu) {
                return;
            }
            /* # 링크로 이동하는 기본 동작 막기 */
            event.preventDefault();

            //현재 메뉴가 열려있는지 확인
            const isActive = item.classList.contains('active');

            closeAllMenu();
            if (!isActive) {
                item.classList.add('active')
            }
        }
    })
})

/* 모든 2depth 메뉴 닫기 (여러 곳에서 호출하므로 함수로 만듦) */
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