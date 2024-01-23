// 在 addDataToHTML() 函數中添加以下代碼，用於根據產品數量的值添加相應的 class
function addDataToHTML() {
    // ...
    let listProductHTML = document.querySelector('.listProduct');
    listProductHTML.innerHTML = '';

    if (products != null) {
        products.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.classList.add('item');
            
          
            if (product.quantity === 0) {
                newProduct.classList.add('quantity-zero');
            }
            
            if (product.quantity === 0) {
                // 商品數量為 0，顯示 "賣完了"，並在滑鼠放上時隱藏加入購物車按鈕
                newProduct.innerHTML = `
                    <div class="sold-out">売り切れ</div>
                    <img src="${product.image}" alt="">
                    <h2>${product.name}</h2>
                    <div class="price">$${product.price}</div>
                `;
            } else {
                // 商品數量不為 0，顯示正常內容，包括加入購物車按鈕
                newProduct.innerHTML = `
                    <img src="${product.image}" alt="">
                    <h2>${product.name}</h2>
                    <div class="price">$${product.price}</div>
                    <button onclick="addCart(${product.id})">加入購物車</button>
                `;
            }

            listProductHTML.appendChild(newProduct);
        });
    }
}

// 在 changeQuantity() 函數中更新 DOM，根據產品數量添加或移除相應的 class
function changeQuantity($idProduct, $type) {
    switch ($type) {
        case '+':
            listCart[$idProduct].quantity++;
            break;
        case '-':
            listCart[$idProduct].quantity--;

            if (listCart[$idProduct].quantity <= 0) {
                delete listCart[$idProduct];
            }
            break;
        default:
            break;
    }

    // 保存新的數據到 cookie
    document.cookie = "listCart=" + JSON.stringify(listCart) + "; expires=Thu, 31 Dec 2025 23:59:59 UTC; path=/;";

    // 重新加載 HTML 查看賣完狀態
    addCartToHTML();
    addDataToHTML();
}

//清空購物車
function clearCart() {
    // 清空購物車的邏輯，可以將 listCart 數組清空
    listCart = [];
    
    // 將新的購物車數據保存到 cookie
    document.cookie = "listCart=" + JSON.stringify(listCart) + "; expires=Thu, 31 Dec 2025 23:59:59 UTC; path=/;";

    // 重新加載 HTML 查看新的購物車內容
    addCartToHTML();
    addDataToHTML();

    // 關閉購物車
    toggleCart();
}