window.addEventListener("beforeunload", () => {
    window.scrollTo(0, 0); // 새로고침 시 스크롤을 맨 위로 이동
});

document.addEventListener("scroll", () => {
    const hiddenSection = document.querySelector(".entrancehidden");
    const entrancemain = document.querySelector(".entrancemain");
    const scrollY = window.scrollY;

    // 스크롤 위치에 따라 투명도 조정
    if (scrollY > 0) {
        hiddenSection.classList.add("active");
    } else {
        hiddenSection.classList.remove("active");
    }
});

// 커서 요소 가져오기
const cursor = document.querySelector('.cursor');

// 마우스 이동 이벤트
document.addEventListener('mousemove', (event) => {
    // clientX, clientY를 사용하여 커서를 마우스 위치에 따라 이동
    cursor.style.left = `${event.clientX}px`;
    cursor.style.top = `${event.clientY}px`;
});

/* - ec - */
document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("search-input");
    const searchButton = document.getElementById("search-button");

    searchButton.addEventListener("click", function () {
        const searchTerm = searchInput.value.toLowerCase(); // 검색어 소문자로 변환
        const items = document.querySelectorAll(".search-item"); // 페이지 내의 검색 항목들 (예시로 'search-item' 클래스가 붙은 요소들)

        items.forEach(item => {
            const itemText = item.textContent.toLowerCase(); // 항목의 텍스트를 소문자로 변환

            if (itemText.includes(searchTerm)) {
                item.style.display = ""; // 검색어가 포함되면 표시
            } else {
                item.style.display = "none"; // 포함되지 않으면 숨김
            }
        });
    });
});


/* - homecontent - */
document.addEventListener("DOMContentLoaded", function () {
    const toggleButton = document.querySelector(".toggleButton");
    const eventContent = document.getElementById("eventContent");
    const arrowIcon = toggleButton.querySelector("span"); // 아이콘 변경을 위한 요소

    // 처음에는 내용 숨김
    eventContent.style.maxHeight = "0";
    eventContent.style.overflow = "hidden";
    eventContent.style.opacity = "0";

    toggleButton.addEventListener("click", function () {
        if (eventContent.style.maxHeight === "0px" || eventContent.style.maxHeight === "") {
            eventContent.style.maxHeight = eventContent.scrollHeight + "px"; // 실제 높이만큼 열기
            eventContent.style.opacity = "1"; // 투명도 조정
            arrowIcon.innerHTML = "&#11208;"; // ▼ 아래 방향 화살표로 변경
        } else {
            eventContent.style.maxHeight = "0";
            eventContent.style.opacity = "0"; // 다시 숨김
            arrowIcon.innerHTML = "&#11206;"; // ▶ 오른쪽 화살표로 변경
        }
    });
});


/* - toycontent - */
document.addEventListener("DOMContentLoaded", function () {
    const toggleButton = document.getElementById("toggleButton");
    const exampleContent = document.getElementById("exampleContent");

    toggleButton.addEventListener("click", function () {
        if (exampleContent.style.display === "none" || exampleContent.style.display === "") {
            exampleContent.style.display = "grid"; // 보이게 변경
        } else {
            exampleContent.style.display = "none"; // 숨김
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    // 모든 장난감 모델 섹션을 가져옴
    document.querySelectorAll(".toy-model").forEach(section => {
        const modelViewer = section.querySelector("model-viewer");
        const colorInput = section.querySelector("input[type='color']");

        colorInput.addEventListener("input", function () {
            const hexColor = colorInput.value; // 사용자가 선택한 색상
            const rgbColor = hexToRgb(hexColor); // HEX를 RGB로 변환
            if (modelViewer) {
                applyColorToModel(modelViewer, rgbColor);
            }
        });
    });

    function applyColorToModel(modelViewer, rgbColor) {
        const materials = modelViewer.model?.materials;
        if (materials) {
            materials.forEach(material => {
                material.pbrMetallicRoughness.setBaseColorFactor([rgbColor.r / 255, rgbColor.g / 255, rgbColor.b / 255, 1]);
            });
        }
    }

    function hexToRgb(hex) {
        let r = parseInt(hex.substring(1, 3), 16);
        let g = parseInt(hex.substring(3, 5), 16);
        let b = parseInt(hex.substring(5, 7), 16);
        return { r, g, b };
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const cartButton = document.querySelectorAll(".add-to-cart");

    cartButton.forEach(button => {
        button.addEventListener("click", function () {
            const toyModel = this.closest(".toy-model");
            const modelViewer = toyModel.querySelector("model-viewer");
            const colorInput = toyModel.querySelector(".colorInput");

            // 색상에 맞는 모델 색상 변경 (재질 속성 적용)
            const color = colorInput.value;

            // 상품 정보 가져오기
            const item = {
                modelSrc: modelViewer.getAttribute("src"),
                price: "￥100", // 가격
                color: color, // 선택된 색상 저장
            };

            // 기존 장바구니 데이터 가져오기
            let cart = JSON.parse(localStorage.getItem("cart")) || [];

            // 장바구니에 상품 추가
            cart.push(item);
            localStorage.setItem("cart", JSON.stringify(cart));

            // 1. 메시지 박스와 텍스트 요소 가져오기
            const alertBox = document.getElementById("custom-alert");
            const alertMessage = document.getElementById("alert-message");

            // 2. 메시지 텍스트 설정
            alertMessage.textContent = `カートに追加されました！`;

            // 3. 커스터마이즈된 알림 표시
            alertBox.classList.add("show");

            // 4. 알림 숨기기
            setTimeout(function () {
                alertBox.classList.remove("show");
                alertBox.classList.add("hide");
            }, 1000);
        });
    });
});


/* - virtualcontent - */
let viewer = document.getElementById("viewer");
let blocks = [];
let selectedBlock = null;
let isDragging = false;

// 📌 블럭 추가 기능 (갤러리에서 클릭하면 추가됨)
function addBlock(modelPath) {
    let newBlock = document.createElement("model-viewer");
    newBlock.src = modelPath;
    newBlock.setAttribute("alt", "3D Block");

    newBlock.style.position = "absolute";
    newBlock.style.width = "120px";
    newBlock.style.height = "120px";
    newBlock.style.transformOrigin = "center";

    // 자연스러운 전환 효과 (여기서 1초 동안 애니메이션)
    newBlock.style.transition = "transform 0.4s ease";
    
    // 📌 랜덤 위치 설정
    let viewerRect = viewer.getBoundingClientRect();
    let maxX = viewerRect.width - 100;
    let maxY = viewerRect.height - 100;
    let randomX = Math.random() * maxX;
    let randomY = Math.random() * maxY;

    // 📌 블럭 이동 기능 (마우스로 클릭 후 드래그)
    newBlock.addEventListener("mousedown", (event) => {
        event.preventDefault();
        selectedBlock = newBlock;
        isDragging = true;
    });

    document.addEventListener("mousemove", (event) => {
        if (!selectedBlock || !isDragging) return;  
        let rect = viewer.getBoundingClientRect();
        let newX = event.clientX - rect.left - 50;
        let newY = event.clientY - rect.top - 50;
        selectedBlock.style.left = `${newX}px`;
        selectedBlock.style.top = `${newY}px`;
    });

    // 📌 마우스를 떼면 이동 종료
    document.addEventListener("mouseup", () => {
        isDragging = false;
        selectedBlock = null;
    });

    // 📌 휠로 크기 조절 (최소 50px ~ 최대 1000px)
    newBlock.addEventListener("wheel", (event) => {
        event.preventDefault();
        let currentSize = parseFloat(newBlock.style.width);
        let newSize = currentSize + event.deltaY * -0.5;
        newSize = Math.min(Math.max(newSize, 50), 1000);
        newBlock.style.width = `${newSize}px`;
        newBlock.style.height = `${newSize}px`;
    });

    // 📌 더블클릭하면 블럭 삭제
    newBlock.addEventListener("dblclick", () => {
        newBlock.remove();
        blocks = blocks.filter(block => block !== newBlock);
    });

    // 📌 기본 우클릭 메뉴 방지
    document.addEventListener("contextmenu", (event) => {
        event.preventDefault();
    });

    viewer.appendChild(newBlock);
    blocks.push(newBlock);
}

// 📌 `やり直し` 버튼 → 모든 블럭 삭제
document.querySelector(".replay").addEventListener("click", () => {
    blocks.forEach(block => block.remove()); // 모든 블록 제거
    blocks = []; // 배열 초기화
});

// 📌 좌우 반전 (미러 효과) 기능
// "rotate-left" 버튼: 반전 적용 (scaleX(-1))
document.getElementById("rotate-left").addEventListener("click", () => {
    let block = selectedBlock || (blocks.length > 0 ? blocks[blocks.length - 1] : null);
    if (!block) return;
    block.dataset.flipped = "true";
    block.style.transform = "scaleX(-1)";
});

// "rotate-right" 버튼: 반전 해제 (scaleX(1))
document.getElementById("rotate-right").addEventListener("click", () => {
    let block = selectedBlock || (blocks.length > 0 ? blocks[blocks.length - 1] : null);
    if (!block) return;
    block.dataset.flipped = "false";
    block.style.transform = "scaleX(1)";
});


/* - contact - */

