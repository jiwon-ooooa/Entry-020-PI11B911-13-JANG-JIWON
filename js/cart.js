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


window.onload = function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartList = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");
    const clearCartButton = document.getElementById("clear-cart");
    const checkoutButton = document.getElementById("checkout");

    function loadCart() {
        console.log("🛒 장바구니 데이터 확인:", cart); // 데이터 확인

        if (cartList) {
            cartList.innerHTML = ""; // 기존 목록 초기화
            let totalPrice = 0; // 총금액 초기화

            if (cart.length === 0) {
                cartList.innerHTML = "<li class='empty-cart'>カートは空です。</li>";
                totalPriceElement.textContent = "¥0";
            } else {
                cart.forEach((item, index) => {
                    let li = document.createElement("li");
                    li.classList.add("cart-item");

                    li.innerHTML = `
                        <div style="display: flex; align-items: center;">
                            <model-viewer src="${item.modelSrc}" style="width: 250px; margin: -5px 0 5px;"></model-viewer>
                            <div style="background: ${item.color}; width: 25px; height: 25px; margin: 0 60px 0 -20px;"></div>
                            <span class="price" style="margin: 0 30px;">${item.price || "価格不明"}</span>
                            <button class="remove-item" style="padding: 5px 7px;" data-index="${index}">削除</button>
                        </div>
                    `;

                    // 가격을 합산 (가격에서 '￥' 기호를 제거하고 숫자로 변환)
                    let price = item.price.replace('￥', '').replace(',', ''); // '￥'와 쉼표 제거
                    totalPrice += parseFloat(price); // 가격을 숫자로 변환하여 합산

                    cartList.appendChild(li);
                });

                totalPriceElement.textContent = `¥${totalPrice.toLocaleString()}`;
            }
        }

        // 삭제 버튼 이벤트 추가
        document.querySelectorAll(".remove-item").forEach(button => {
            button.addEventListener("click", function () {
                const index = this.dataset.index;
                removeFromCart(index);
            });
        });
    }

    function removeFromCart(index) {
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        loadCart();
    }

    if (clearCartButton) {
        clearCartButton.addEventListener("click", function () {
            localStorage.removeItem("cart");
            cart = [];
            loadCart();
        });
    }

    if (checkoutButton) {
        checkoutButton.addEventListener("click", function () {
            alert("購入手続きへ進みます。"); // 결제 페이지로 이동 가능
        });
    }

    loadCart();
};