// 宣告一個空陣列用來存儲購物車的商品資訊
let listCart = [];

// 檢查是否有購物車的 cookie
function checkCart() {
    var cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith('listCart='));
    // 如果有，解析 cookie 中的資訊，存入 listCart 陣列
    if (cookieValue) {
        listCart = JSON.parse(cookieValue.split('=')[1]);
    }
}

// 呼叫 checkCart 函數，執行檢查購物車 cookie 的操作
checkCart();

// 呼叫 addCartToHTML 函數，將購物車的商品資訊顯示在 HTML 中
addCartToHTML();

// 將購物車的商品資訊動態添加到 HTML 中
function addCartToHTML() {
    // 清空之前的購物車商品清單，以便重新顯示
    let listCartHTML = document.querySelector('.returnCart .list');
    listCartHTML.innerHTML = '';

    // 取得用於顯示總數量和總價格的 HTML 元素
    let totalQuantityHTML = document.querySelector('.totalQuantity');
    let totalPriceHTML = document.querySelector('.totalPrice');
    
    // 初始化總數量和總價格
    let totalQuantity = 0;
    let totalPrice = 0;

    // 如果購物車中有商品
    if (listCart) {
        // 遍歷購物車中的每個商品
        listCart.forEach(product => {
            // 如果商品存在
            if (product) {
                // 創建一個新的 div 元素，顯示商品資訊
                let newCart = document.createElement('div');
                newCart.classList.add('item');
                newCart.innerHTML =
                    `<img src="${product.image}">
                    <div class="info">
                        <div class="name">${product.name}</div>
                        <div class="price">$${product.price}/1 product</div>
                    </div>
                    <div class="quantity">${product.quantity}</div>
                    <div class="returnPrice">$${product.price * product.quantity}</div>`;

                // 將新的商品元素添加到 HTML 中的購物車清單
                listCartHTML.appendChild(newCart);

                // 更新總數量和總價格
                totalQuantity += product.quantity;
                totalPrice += product.price * product.quantity;
            }
        })
    }

    // 更新 HTML 中的總數量和總價格的顯示
    totalQuantityHTML.innerText = totalQuantity;
    totalPriceHTML.innerText = '$' + totalPrice;
}
