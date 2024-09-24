const state = {
    items: [
      {
        id: "001-beetroot",
        name: "beetroot",
        price: 0.35
      },
      {
        id: "002-carrot",
        name: "carrot",
        price: 0.35
      },
      {
        id: "003-apple",
        name: "apple",
        price: 0.35
      },
      {
        id: "004-apricot",
        name: "apricot",
        price: 0.35
      },
      {
        id: "005-avocado",
        name: "avocado",
        price: 0.35
      },
      {
        id: "006-bananas",
        name: "bananas",
        price: 0.35
      },
      {
        id: "007-bell-pepper",
        name: "bell pepper",
        price: 0.35
      },
      {
        id: "008-berry",
        name: "berry",
        price: 0.35
      },
      {
        id: "009-blueberry",
        name: "blueberry",
        price: 0.35
      },
      {
        id: "010-eggplant",
        name: "eggplant",
        price: 0.35
      }
    ],
    cart: []
  };

const storeItemList = document.querySelector('.store--item-list');

// Function to render store items
function renderStoreItems() {
  // Clear all existing items
  storeItemList.innerHTML = '';

  // Loop through each item in the state.items array
  state.items.forEach((item) => {

    /*
    Create the elements based on the store item template.
    li stands for list item.
    */ 
    const li = document.createElement('li');

    // Create a <div> to hold fit the item icon. 
    const divIcon = document.createElement('div');
    
    // Set the class to 'store--item-icon for styling.
    divIcon.className = 'store--item-icon';

    // Create <img> element to display the item's image.
    const img = document.createElement('img');
    // Set the source of the image to the file path of the item's icon
    img.src = `assets/icons/${item.id}.svg`;
    // Sets the alternative text for the image. 
    img.alt = item.name;

    // Create a <button> element with the text 'Add to cart'
    const button = document.createElement('button');
    button.textContent = 'Add to cart';

    // Appendchild -> Adds child node to parent note.

    // Add the <img> element inside the div element. 
    divIcon.appendChild(img);
    // Adds the div containing the icon to the list item.
    li.appendChild(divIcon);
    // Add the button to the list item.
    li.appendChild(button);

    /*
    This operation provides the following html: 
    <li>
      <div class="store--item-icon">
        <img src="..." alt="..." />
      </div>
      <button>Add to cart</button>
    </li>
    */

    /*
      Add event listener to the button.
      The event is set to 'click', 
      triggering the function addItemToCart when the button is clicked.

    */
    button.addEventListener('click', () => {
      addItemToCart(item);
    });


    /* 
      Add the <li> we've been creating to the <ul> element in the HTML.
      This makes it visible on the page. 
    */
    storeItemList.appendChild(li);
  });
}

function addItemToCart(item) {
    const cartItem = state.cart.find((cartItem) => cartItem.id === item.id);

    if (cartItem) {
        cartItem.quantity++;
    } else {
        state.cart.push({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: 1
            });
    }
    renderCartItems();
    calculateTotal();
  }
  
const cartItemList = document.querySelector('.cart--item-list');
  
function renderCartItems() {
    cartItemList.innerHTML = '';

    // Loop through each item in the state.items array
    state.cart.forEach((item) => {

        const li = document.createElement('li');

        // Create <img> element to display the item's image.
        const img = document.createElement('img');
        // Set the source of the image to the file path of the item's icon
        img.src = `assets/icons/${item.id}.svg`;
        // Set the img class
        img.className = 'cart--item-icon';
        // Sets the alternative text for the image. 
        img.alt = item.name;

        const p = document.createElement('p');
        p.textContent = item.name;

        // Create a <button> element with the text 'Add to cart'
        const buttonInc = document.createElement('button');
        buttonInc.className = 'quantity-btn add-btn center'
        buttonInc.textContent = '+';

        const spanning = document.createElement('span');
        spanning.className = 'quantity-text center'
        spanning.textContent = item.quantity;

        // Create a <button> element with the text 'Add to cart'
        const buttonDec = document.createElement('button');
        buttonDec.className = 'quantity-btn remove-btn center'
        buttonDec.textContent = '-';

        // Appendchild -> Adds child node to parent note.

        // Adds the div containing the icon to the list item.
        li.appendChild(img);
        // Add the button to the list item.
        li.appendChild(p);

        li.appendChild(buttonDec);
        li.appendChild(spanning);
        li.appendChild(buttonInc);

        buttonInc.addEventListener('click', () => {
        increaseItem(item);
        });

        buttonDec.addEventListener('click', () => {
        decreaseItem(item);
        });

        cartItemList.appendChild(li);
    });

}

function increaseItem(item) {
    const cartItem = state.cart.find((cartItem) => cartItem.id === item.id);
    cartItem.quantity++;
    renderCartItems();
    calculateTotal();

}

function decreaseItem(item) {
    const cartItem = state.cart.find((cartItem) => cartItem.id === item.id);
    cartItem.quantity--;
    if(cartItem.quantity === 0){
        const index = state.cart.findIndex((removeItem) => removeItem.id === item.id);
        state.cart.splice(index, 1);
    }
    renderCartItems();
    calculateTotal();
}

const totaltCost = document.querySelector('.total-number');

function calculateTotal(){
    let totalAmount = 0; 
    state.cart.forEach((item) => {
        totalAmount += item.price * item.quantity;
    })

    totaltCost.textContent = `£${totalAmount.toFixed(2)}`;
}
  


renderStoreItems();
renderCartItems();
calculateTotal();
