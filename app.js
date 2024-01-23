// 選取相應的 DOM 元素
let iconCart = document.querySelector('.iconCart');
let cart = document.querySelector('.cart');
let container = document.querySelector('.container');
let close = document.querySelector('.close');

// 切換購物車的顯示與隱藏
function toggleCart() {
    if (cart.style.right == '-100%') {
        cart.style.right = '0';
        container.style.transform = 'translateX(-400px)';
    } else {
        cart.style.right = '-100%';
        container.style.transform = 'translateX(0)';
    }
}

// 添加點擊事件監聽器
iconCart.addEventListener('click', toggleCart);
close.addEventListener('click', toggleCart);


// iconCart.addEventListener('click', function(){
//     if(cart.style.right == '-100%'){
//         cart.style.right = '0';
//         container.style.transform = 'translateX(-400px)';
//     }else{
//         cart.style.right = '-100%';
//         container.style.transform = 'translateX(0)';
//     }
// })
// close.addEventListener('click', function (){
//     cart.style.right = '-100%';
//     container.style.transform = 'translateX(0)';
// });



// 宣告一個變數來存儲商品數據
let products = null;

// 從 JSON 文件中獲取商品數據
fetch('product.json')
    .then(response => response.json())
    .then(data => {
        // 將獲取的數據賦值給變數
        products = data;
        // 呼叫函數將數據添加到 HTML 中
        addDataToHTML();
    });

// 將商品數據顯示在列表中的 HTML 元素
function addDataToHTML() {
    // 獲取用於顯示商品列表的 HTML 元素
    let listProductHTML = document.querySelector('.listProduct');
    // 清空 HTML 元素中的默認數據
    listProductHTML.innerHTML = '';

    // 如果商品數據不為空
    if (products != null) {
        // 遍歷每個商品，並動態添加到 HTML 中
        products.forEach(product => {
            // 創建一個新的商品元素
            let newProduct = document.createElement('div');
            newProduct.classList.add('item');
            newProduct.innerHTML =
                `<img src="${product.image}" alt="">
                <h2>${product.name}</h2>
                <div class="price">$${product.price}</div>
                <button onclick="addCart(${product.id})">加入購物車</button>`;

            // 將新的商品元素添加到商品列表中
            listProductHTML.appendChild(newProduct);
        });
    }
}

// 使用 cookie 以防刷新頁面時丟失購物車內容


// 建立一個空陣列來存放購物車商品
let listCart = [];

// 檢查是否有購物車的 cookie 資料
function checkCart() {
    // 取得購物車的 cookie 資料
    var cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith('listCart='));
    
    // 如果有購物車的 cookie 資料
    if (cookieValue) {
        // 解析並賦值給 listCart
        listCart = JSON.parse(cookieValue.split('=')[1]);
    } else {
        // 如果沒有購物車的 cookie 資料，初始化為空陣列
        listCart = [];
    }
}

// 初始化時檢查購物車
checkCart();

// 將商品加入購物車
function addCart($idProduct) {
    // 複製一份商品資料
    let productsCopy = JSON.parse(JSON.stringify(products));

    // 如果該商品還未在購物車中
    if (!listCart[$idProduct]) {
        // 找到該商品，並初始化數量為1
        listCart[$idProduct] = productsCopy.filter(product => product.id == $idProduct)[0];
        listCart[$idProduct].quantity = 1;
    } else {
        // 如果該商品已經在購物車中，增加數量
        listCart[$idProduct].quantity++;
    }

    // 將購物車資料存入 cookie
    document.cookie = "listCart=" + JSON.stringify(listCart) + "; expires=Thu, 31 Dec 2025 23:59:59 UTC; path=/";

    // 將購物車資料存入 localStorage
    localStorage.setItem('listCart', JSON.stringify(listCart));


    // 更新購物車顯示
    addCartToHTML();
}

// 初始化時顯示購物車
addCartToHTML();

// 將購物車資料顯示在 HTML 中
function addCartToHTML() {
    // 清空購物車顯示區域
    let listCartHTML = document.querySelector('.listCart');
    listCartHTML.innerHTML = '';

    // 取得總數顯示區域
    let totalHTML = document.querySelector('.totalQuantity');
    let totalQuantity = 0;

    // 如果購物車中有商品
    if (listCart) {
        // 顯示每一個商品的詳細資訊
        listCart.forEach(product => {
            if (product) {
                let newCart = document.createElement('div');
                newCart.classList.add('item');
                newCart.innerHTML = 
                    `<img src="${product.image}">
                    <div class="content">
                        <div class="name">${product.name}</div>
                        <div class="price">$${product.price} / 1 product</div>
                    </div>
                    <div class="quantity">
                        <button onclick="changeQuantity(${product.id}, '-')">-</button>
                        <span class="value">${product.quantity}</span>
                        <button onclick="changeQuantity(${product.id}, '+')">+</button>
                    </div>`;
                
                listCartHTML.appendChild(newCart);
                totalQuantity = totalQuantity + product.quantity;
            }
        })
    }

    // 更新總數顯示
    totalHTML.innerText = totalQuantity;
}

// 修改商品數量
function changeQuantity($idProduct, $type) {
    switch ($type) {
        case '+':
            listCart[$idProduct].quantity++;
            break;
        case '-':
            listCart[$idProduct].quantity--;

            // 如果數量小於等於0，則從購物車中移除該商品
            if (listCart[$idProduct].quantity <= 0) {
                delete listCart[$idProduct];
            }
            break;
        default:
            break;
    }

    // 將新的購物車資料存入 cookie
    document.cookie = "listCart=" + JSON.stringify(listCart) + "; expires=Thu, 31 Dec 2025 23:59:59 UTC; path=/";

    // 重新載入 HTML 顯示購物車
    addCartToHTML();
}



