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
    // 커서를 마우스 위치에 따라 이동
    cursor.style.left = `${event.pageX}px`;
    cursor.style.top = `${event.pageY}px`;
});


/* - homecontent - */
document.addEventListener("DOMContentLoaded", function () {
    const toggleButton = document.querySelector(".toggleButton");
    const eventContent = document.getElementById("eventContent");

    toggleButton.addEventListener("click", function () {
        if (eventContent.style.display === "none" || eventContent.style.display === "") {
            eventContent.style.display = "flex"; // ✅ 숨김 해제 시 flex 적용
        } else {
            eventContent.style.display = "none"; // ✅ 다시 숨김
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

            // 상품 정보 가져오기
            const item = {
                modelSrc: modelViewer.getAttribute("src"),
                alt: modelViewer.getAttribute("alt"),
                price: "￥100",
                color: colorInput.value
            };

            // 기존 장바구니 데이터 가져오기
            let cart = JSON.parse(localStorage.getItem("cart")) || [];

            // 장바구니에 상품 추가
            cart.push(item);
            localStorage.setItem("cart", JSON.stringify(cart));

            alert(`${item.alt} がカートに追加されました！`);
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
    newBlock.style.width = "100px";
    newBlock.style.height = "100px";
    newBlock.style.transformOrigin = "center";
    newBlock.style.zIndex = "10";

    // 📌 랜덤 위치 설정
    let viewerRect = viewer.getBoundingClientRect();
    let maxX = viewerRect.width - 100;
    let maxY = viewerRect.height - 100;
    let randomX = Math.random() * maxX;
    let randomY = Math.random() * maxY;

    newBlock.style.left = `${randomX}px`;
    newBlock.style.top = `${randomY}px`;

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
document.querySelector(".play-control button:nth-child(1)").addEventListener("click", () => {
    blocks.forEach(block => block.remove());
    blocks = [];
});



/* - cart - */
document.addEventListener("DOMContentLoaded", function () {
    const cartContainer = document.getElementById("cart-container");
    const clearCartButton = document.getElementById("clear-cart");

    function loadCart() {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        console.log("장바구니 데이터:", cart); // 콘솔에서 데이터 확인

        cartContainer.innerHTML = "";

        if (cart.length === 0) {
            cartContainer.innerHTML = "<p>カートに商品がありません。</p>";
            return;
        }

        cart.forEach((item, index) => {
            const itemElement = document.createElement("div");
            itemElement.classList.add("cart-item");

            itemElement.innerHTML = `
                <div>
                    <model-viewer src="${item.modelSrc}" alt="${item.alt}" style="width: 100px; height: 100px;" camera-controls></model-viewer>
                    <p>${item.alt}</p>
                    <p>${item.price}</p>
                    <div style="background: ${item.color}; width: 50px; height: 20px;"></div>
                    <button class="remove-item" data-index="${index}">削除</button>
                </div>
            `;

            cartContainer.appendChild(itemElement);
        });

        document.querySelectorAll(".remove-item").forEach(button => {
            button.addEventListener("click", function () {
                const index = this.dataset.index;
                removeFromCart(index);
            });
        });
    }

    function removeFromCart(index) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        loadCart();
    }

    clearCartButton.addEventListener("click", function () {
        localStorage.removeItem("cart");
        loadCart();
    });

    loadCart();
});
