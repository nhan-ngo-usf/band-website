if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", "ready");
} else {
  ready();
}
function ready() {
  let removeItemButton = document.getElementsByClassName("btn-danger");
  for (let i = 0; i < removeItemButton.length; i++) {
    let button = removeItemButton[i];
    button.addEventListener("click", removeCartItem);
  }

  let quantityChange = document.getElementsByClassName("cart-quantity-input");
  for (let i = 0; i < quantityChange.length; i++) {
    let input = quantityChange[i];
    input.addEventListener("change", quantityUpdate);
  }

  let addtoCartButtons = document.getElementsByClassName("shop-item-btn");
  for (let i = 0; i < addtoCartButtons.length; i++) {
    let button = addtoCartButtons[i];
    button.addEventListener("click", addtoCartClicked);
  }

  document
    .getElementsByClassName("cart-purchase-btn")[0]
    .addEventListener("click", purchaseClicked);
}

function purchaseClicked() {
  alert("Thank you for your purchase!");
  let cartItems = document.getElementsByClassName("cart-items")[0];
  while (cartItems.hasChildNodes()) {
    cartItems.removeChild(cartItems.firstChild);
  }
  updateCartTotal();
}

function addtoCartClicked(event) {
  let button = event.target;
  let shopItem = button.parentElement.parentElement;
  let title = shopItem.getElementsByClassName("shop-item-title")[0].innerText;
  let price = shopItem.getElementsByClassName("shop-item-price")[0].innerText;
  let image = shopItem.getElementsByClassName("shop-item-image")[0].src;
  addtoCartUpdate(title, price, image);
}
function addtoCartUpdate(title, price, image) {
  let cartRow = document.createElement("div");
  cartRow.classList.add("cart-row");
  let cartItems = document.getElementsByClassName("cart-items")[0];
  let cartItemName = cartItems.getElementsByClassName("cart-item-title");
  for (let i = 0; i < cartItemName.length; i++) {
    if (cartItemName[i].innerText == title) {
      alert("This item is already added to the cart!");
      return;
    }
  }
  cartRow.innerText = title;
  cartRowContent = `<div class="cart-item cart-column">
                      <img src=${image} alt=" " width="100" height="100" class="cart-item-image">
                      <span class="cart-item-title">${title}</span>
                    </div>
                      <span class="cart-price cart-column">${price}</span>
                    <div class="cart-column cart-quantity">
                      <input type="number" value="1" class="cart-quantity-input">
                      <button class="btn cart-quantity-btn btn-danger" role="button">REMOVE</button>
                    </div>`;
  cartRow.innerHTML = cartRowContent;
  cartItems.append(cartRow);
  updateCartTotal();
  cartRow
    .getElementsByClassName("btn-danger")[0]
    .addEventListener("click", removeCartItem);
  cartRow
    .getElementsByClassName("cart-quantity-input")[0]
    .addEventListener("change", quantityUpdate);
}

function quantityUpdate(event) {
  let input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateCartTotal();
}
function removeCartItem(event) {
  buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();
  updateCartTotal();
}

function updateCartTotal() {
  let cartItemContainer = document.getElementsByClassName("cart-items")[0];
  let cartRows = cartItemContainer.getElementsByClassName("cart-row");
  let total = 0;
  for (let i = 0; i < cartRows.length; i++) {
    let cartRow = cartRows[i];
    let PriceElement = cartRow.getElementsByClassName("cart-price")[0];
    let QuantityElement = cartRow.getElementsByClassName(
      "cart-quantity-input"
    )[0];
    let price = parseFloat(PriceElement.innerText.replace("$", ""));
    let quantity = QuantityElement.value;
    total = total + price * quantity;
  }
  total = Math.round(total * 100) / 100;
  let TotalPriceElement =
    document.getElementsByClassName("cart-total-price")[0];
  TotalPriceElement.textContent = "$" + total;
}
