document.addEventListener("DOMContentLoaded", function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartList = document.getElementById("cart-items");

    if (cart.length === 0) {
        cartList.innerHTML = "<li class='empty-cart'>カートは空です。</li>";
    } else {
        cart.forEach(item => {
            let li = document.createElement("li");
            li.classList.add("cart-item");
            
            // undefined 방지 & 가격 중복 표시 제거
            let itemName = item.name ? item.name : "商品名なし";
            let itemPrice = item.price ? `¥${item.price}` : "価格未設定";
            
            li.innerHTML = `<span>${itemName}</span> <span class="price">${itemPrice}</span>`;
            cartList.appendChild(li);
        });
    }
});
