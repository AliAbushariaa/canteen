<template>
  <div class="order-page" :class="{ 'dark-mode': isDarkMode }">
    <h1>Place Your Order</h1>

    <div class="selected-details">
      <h2>{{ selectedRoom }} - {{ selectedDay }}</h2>
    </div>
    
    <div class="order-form">
      <div class="menu-selection">
        <h2>Select Items</h2>
        <div class="menu-categories">
          <div class="category">
            <h3>Soups</h3>
            <div v-for="soup in menuByRoom[selectedRoom]?.[selectedDay]?.soups" :key="soup.id" class="menu-item">
              <div class="item-details">
                <span class="item-name">
                  {{ soup.name }}
                  <span class="info-number" @mouseover="showInfo = soup.id" @mouseleave="showInfo = null">{{ soup.id }}</span>
                  <div v-if="showInfo === soup.id" class="info-box">
                    {{ soup.description }}
                  </div>
                </span>
                <span class="item-weight">{{ soup.weight }}</span>
                <span class="item-price">€{{ soup.price }}</span>
              </div>
              <button @click="addToOrder(soup)" class="add-button">+</button>
            </div>
          </div>

          <div class="category">
            <h3>Main Dishes</h3>
            <div v-for="main in menuByRoom[selectedRoom]?.[selectedDay]?.mains" :key="main.id" class="menu-item">
              <div class="item-details">
                <span class="item-name">
                  {{ main.name }}
                  <span class="info-number" @mouseover="showInfo = main.id" @mouseleave="showInfo = null">{{ main.id }}</span>
                  <div v-if="showInfo === main.id" class="info-box">
                    {{ main.description }}
                  </div>
                </span>
                <span class="item-weight">{{ main.weight }}</span>
                <span class="item-price">€{{ main.price }}</span>
              </div>
              <button @click="addToOrder(main)" class="add-button">+</button>
            </div>
          </div>

          <div class="category">
            <h3>Side Dishes</h3>
            <div v-for="side in menuByRoom[selectedRoom]?.[selectedDay]?.sides" :key="side.id" class="menu-item">
              <div class="item-details">
                <span class="item-name">
                  {{ side.name }}
                  <span class="info-number" @mouseover="showInfo = side.id" @mouseleave="showInfo = null">{{ side.id }}</span>
                  <div v-if="showInfo === side.id" class="info-box">
                    {{ side.description }}
                  </div>
                </span>
                <span class="item-weight">{{ side.weight }}</span>
                <span class="item-price">€{{ side.price }}</span>
              </div>
              <button @click="addToOrder(side)" class="add-button">+</button>
            </div>
          </div>

          <div class="category">
            <h3>Desserts</h3>
            <div v-for="dessert in menuByRoom[selectedRoom]?.[selectedDay]?.desserts" :key="dessert.id" class="menu-item">
              <div class="item-details">
                <span class="item-name">
                  {{ dessert.name }}
                  <span class="info-number" @mouseover="showInfo = dessert.id" @mouseleave="showInfo = null">{{ dessert.id }}</span>
                  <div v-if="showInfo === dessert.id" class="info-box">
                    {{ dessert.description }}
                  </div>
                </span>
                <span class="item-weight">{{ dessert.weight }}</span>
                <span class="item-price">€{{ dessert.price }}</span>
              </div>
              <button @click="addToOrder(dessert)" class="add-button">+</button>
            </div>
          </div>
        </div>
      </div>

      <div class="order-summary">
        <h2>Your Order</h2>
        <div class="order-items">
          <div v-for="(item, index) in orderItems" :key="index" class="order-item">
            <span>{{ item.name }}</span>
            <span>€{{ item.price }}</span>
            <button @click="removeFromOrder(index)" class="remove-button">×</button>
          </div>
        </div>
        <div class="order-total">
          <span>Total:</span>
          <span>€{{ orderTotal.toFixed(2) }}</span>
        </div>

        <div class="payment-method">
          <h3>Payment Method</h3>
          <div class="payment-cards">
            <div 
              class="payment-card" 
              :class="{ 'selected': paymentMethod === 'credit' }"
              @click="paymentMethod = 'credit'"
            >
              <div class="card-icon">💳</div>
              <div class="card-text">
                <h4>Student Credit</h4>
                <p>Pay with your student balance</p>
              </div>
              <div class="check-icon" v-if="paymentMethod === 'credit'">✓</div>
            </div>

            <div 
              class="payment-card"
              :class="{ 'selected': paymentMethod === 'cash' }"
              @click="paymentMethod = 'cash'"
            >
              <div class="card-icon">💶</div>
              <div class="card-text">
                <h4>Cash</h4>
                <p>Pay at pickup</p>
              </div>
              <div class="check-icon" v-if="paymentMethod === 'cash'">✓</div>
            </div>
          </div>
        </div>

        <button @click="submitOrder" class="submit-order" :disabled="!paymentMethod">
          Place Order
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderPage',
  props: {
    menuByRoom: {
      type: Object,
      required: true
    },
    selectedDay: {
      type: String,
      required: true  
    }
  },
  data() {
    return {
      orderItems: [],
      isDarkMode: false,
      showInfo: null,
      selectedRoom: '',
      paymentMethod: ''
    }
  },
  created() {
    // Get room from route query parameters
    this.selectedRoom = this.$route.query.room
  },
  computed: {
    orderTotal() {
      return this.orderItems.reduce((total, item) => total + parseFloat(item.price), 0)
    }
  },
  methods: {
    addToOrder(item) {
      this.orderItems.push({ ...item })
    },
    removeFromOrder(index) {
      this.orderItems.splice(index, 1)
    },
    submitOrder() {
      if (!this.paymentMethod) {
        alert('Please select a payment method')
        return
      }

      const orderDetails = {
        items: this.orderItems,
        total: this.orderTotal,
        paymentMethod: this.paymentMethod,
        room: this.selectedRoom,
        day: this.selectedDay
      }

      // Navigate to success page with order details
      this.$router.push({
        path: '/success',
        query: { orderDetails: JSON.stringify(orderDetails) }
      })
    }
  }
}
</script>

<style scoped>
.order-page {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.selected-details {
  text-align: center;
  margin: 20px 0;
  padding: 10px;
  background: #f0f0f0;
  border-radius: 8px;
}

.order-form {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
  margin-top: 20px;
}

.menu-categories {
  display: grid;
  gap: 20px;
}

.category {
  background: #f5f5f5;
  padding: 15px;
  border-radius: 8px;
}

.menu-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

.item-details {
  display: flex;
  justify-content: space-between;
  flex: 1;
  margin-right: 10px;
}

.add-button, .remove-button {
  padding: 5px 10px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
}

.add-button {
  background: #4CAF50;
  color: white;
}

.remove-button {
  background: #f44336;
  color: white;
}

.order-summary {
  background: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  position: sticky;
  top: 20px;
}

.order-items {
  margin: 15px 0;
}

.order-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
}

.order-total {
  margin-top: 20px;
  padding-top: 10px;
  border-top: 2px solid #ddd;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
}

.payment-method {
  margin-top: 20px;
  padding-top: 10px;
  border-top: 2px solid #ddd;
}

.payment-cards {
  display: grid;
  gap: 15px;
  margin-top: 15px;
}

.payment-card {
  display: flex;
  align-items: center;
  padding: 15px;
  background: white;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.payment-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.payment-card.selected {
  border-color: #4CAF50;
  background: #f0f9f0;
}

.card-icon {
  font-size: 24px;
  margin-right: 15px;
}

.card-text {
  flex: 1;
}

.card-text h4 {
  margin: 0;
  font-size: 16px;
  color: #333;
}

.card-text p {
  margin: 5px 0 0;
  font-size: 14px;
  color: #666;
}

.check-icon {
  color: #4CAF50;
  font-size: 20px;
  font-weight: bold;
}

.submit-order {
  width: 100%;
  padding: 15px;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  margin-top: 20px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.submit-order:disabled {
  background: #cccccc;
  cursor: not-allowed;
}

.submit-order:hover:not(:disabled) {
  background: #45a049;
}

.info-number {
  font-size: 0.8em;
  color: #666;
  margin-left: 5px;
  cursor: help;
}

.info-box {
  position: absolute;
  background: white;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  z-index: 1;
  max-width: 200px;
}

/* Dark mode styles */
.dark-mode {
  background-color: #1a1a1a;
  color: #ffffff;
}

.dark-mode .category {
  background-color: #2d2d2d;
}

.dark-mode .menu-item {
  border-bottom-color: #444;
}

.dark-mode .order-summary {
  background-color: #2d2d2d;
}

.dark-mode .order-item {
  border-bottom-color: #444;
}

.dark-mode .info-box {
  background-color: #2d2d2d;
  border-color: #444;
  color: #ffffff;
}

.dark-mode .selected-details {
  background-color: #2d2d2d;
}

.dark-mode .payment-card {
  background-color: #2d2d2d;
  border-color: #444;
}

.dark-mode .payment-card.selected {
  background-color: #1a3a1a;
  border-color: #4CAF50;
}

.dark-mode .card-text h4 {
  color: #fff;
}

.dark-mode .card-text p {
  color: #aaa;
}
</style>
