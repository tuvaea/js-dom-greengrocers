const state = {
    items: [
      {
        id: "001-beetroot",
        name: "beetroot",
        price: 0.45,
        type: "vegetable"
      },
      {
        id: "002-carrot",
        name: "carrot",
        price: 0.36,
        type: "vegetable"
      },
      {
        id: "003-apple",
        name: "apple",
        price: 0.99,
        type: "fruit"
      },
      {
        id: "004-apricot",
        name: "apricot",
        price: 0.18,
        type: "fruit"
      },
      {
        id: "005-avocado",
        name: "avocado",
        price: 0.56,
        type: "vegetable"
      },
      {
        id: "006-bananas",
        name: "bananas",
        price: 0.20,
        type: "fruit"
      },
      {
        id: "007-bell-pepper",
        name: "bell pepper",
        price: 0.38,
        type: "vegetable"
      },
      {
        id: "008-berry",
        name: "berry",
        price: 0.11,
        type: "berry"
      },
      {
        id: "009-blueberry",
        name: "blueberry",
        price: 0.10,
        type: "berry"
      },
      {
        id: "010-eggplant",
        name: "eggplant",
        price: 0.39,
        type: "vegetable"
      }
    ],
    cart: []
  };


let currentFilter = null;
const storeItemList = document.querySelector('.store--item-list');
let sortsort = false;

function sorting(currentFilter) {
    storeItemList.innerHTML = ''; // Clear the current displayed items in DOM

    // If there's a filter, apply it directly on state.items
    let itemsToRender = currentFilter 
        ? state.items.filter(item => item.type === currentFilter) 
        : state.items; // No filter means rendering all items

    // Sort the items by price in ascending order
    itemsToRender.sort((a, b) => a.price - b.price);

    // Render the sorted items back into the store item list
    itemsToRender.forEach((item) => {
        const li = document.createElement('li');

        const divIcon = document.createElement('div');
        divIcon.className = 'store--item-icon';

        const img = document.createElement('img');
        img.src = `assets/icons/${item.id}.svg`;
        img.alt = item.name;

        const button = document.createElement('button');
        button.textContent = 'Add to cart';
        button.addEventListener('click', () => {
            addItemToCart(item);
        });

        divIcon.appendChild(img);
        li.appendChild(divIcon);
        li.appendChild(button);
        storeItemList.appendChild(li);
    });
}

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

const filterContainer = document.querySelector('.store--filter');

// Array of button labels


function createFilterButtons() {
    const buttonBerry = document.createElement('button'); 
    buttonBerry.textContent = 'Berries'; 
    filterContainer.appendChild(buttonBerry); 

    buttonBerry.addEventListener('click', () => {
        currentFilter = 'berry'
        if (sortsort === true){
            sorting(currentFilter)
        } else{
            filterType('berry');
        }
        });

    const buttonVeg = document.createElement('button'); 
    buttonVeg.textContent = 'Vegetables'; 
    filterContainer.appendChild(buttonVeg); 

    buttonVeg.addEventListener('click', () => {
        currentFilter = 'vegetable'
        if (sortsort === true){
            sorting(currentFilter)
        } else{
            filterType('vegetable');
        }
        });

    const buttonFruit = document.createElement('button'); 
    buttonFruit.textContent = 'Fruits'; 
    filterContainer.appendChild(buttonFruit); 

    buttonFruit.addEventListener('click', () => {
        currentFilter = 'fruit'
        if (sortsort === true){
            sorting(currentFilter)
        } else{
            filterType('fruit');
        }
        });

    const buttonSort = document.createElement('button'); 
    buttonSort.textContent = 'Sort by price'; 
    buttonSort.className = 'sort-button';
    filterContainer.appendChild(buttonSort); 

    buttonSort.addEventListener('click', () => {
        sorting(currentFilter);
        sortsort = true;
        });

}



// Function to render store items
function filterType(type) {
    storeItemList.innerHTML = '';

    // Loop through each item in the state.items array
    state.items.forEach((item) => {
        if (item.type === type){
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
            button.addEventListener('click', () => {
                addItemToCart(item);
            });
        
            storeItemList.appendChild(li);
        };
    })
}





createFilterButtons();
renderStoreItems();
renderCartItems();
calculateTotal();
