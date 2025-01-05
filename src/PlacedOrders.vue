<template>
  <div class="placed-orders" :class="{ 'dark-mode': isDarkMode }">
    <h1>Your Placed Orders</h1>

    <div class="orders-list">
      <button @click="clearOrders" class="clear-orders-btn">Clear All Orders</button>
      
      <div v-if="orders.length === 0" class="no-orders">
        <p>You haven't placed any orders yet.</p>
      </div>

      <div v-else v-for="(order, index) in orders" :key="index" class="order-card">
        <div class="order-header">
          <h2>Order #{{ index + 1 }}</h2>
          <div class="order-status">Status: Processing</div>
        </div>

        <div class="order-details">
          <div class="location-details">
            <p><strong>Location:</strong> {{ order.room }}</p>
            <p><strong>Date:</strong> {{ order.day }}</p>
          </div>

          <div class="items-list">
            <h3>Items Ordered:</h3>
            <div v-for="(item, itemIndex) in order.items" :key="itemIndex" class="order-item">
              <span class="item-name">{{ item.name }}</span>
              <span class="item-price">€{{ item.price }}</span>
            </div>
          </div>

          <div class="payment-details">
            <div class="total">
              <span>Total Amount:</span>
              <span>€{{ order.total.toFixed(2) }}</span>
            </div>
            <p class="payment-method">
              Payment Method: {{ order.paymentMethod === 'credit' ? 'Student Credit' : 'Cash' }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PlacedOrders',
  data() {
    return {
      orders: [],
      isDarkMode: false
    }
  },
  created() {
    // Get orders from localStorage that were saved in success.vue
    const savedOrders = localStorage.getItem('placedOrders')
    if (savedOrders) {
      this.orders = JSON.parse(savedOrders)
    }
  },
  methods: {
    clearOrders() {
      this.orders = []
      localStorage.removeItem('placedOrders')
    }
  }
}
</script>

<style scoped>
.placed-orders {
  min-height: 100vh;
  padding: 40px 20px;
  background-color: #f5f5f5;
}

.orders-list {
  max-width: 800px;
  margin: 0 auto;
}

.no-orders {
  text-align: center;
  padding: 40px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.clear-orders-btn {
  display: block;
  margin: 0 0 20px auto;
  padding: 10px 20px;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.clear-orders-btn:hover {
  background: #c82333;
}

.order-card {
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}

.order-status {
  padding: 8px 16px;
  background: #4CAF50;
  color: white;
  border-radius: 20px;
  font-size: 0.9em;
}

.order-details {
  background: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
}

.location-details {
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}

.items-list {
  margin-bottom: 20px;
}

.order-item {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}

.payment-details {
  margin-top: 20px;
  padding-top: 15px;
  border-top: 2px solid #eee;
}

.total {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  font-size: 1.2em;
  margin-bottom: 10px;
}

.payment-method {
  color: #666;
  font-style: italic;
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
}

.dark-mode {
  background-color: #1a1a1a;
  color: #fff;
}

.dark-mode .order-card,
.dark-mode .no-orders {
  background: #2d2d2d;
}

.dark-mode .order-details {
  background: #3d3d3d;
}

.dark-mode .order-header {
  border-bottom-color: #4d4d4d;
}

.dark-mode .order-item {
  border-bottom-color: #4d4d4d;
}

.dark-mode .payment-details {
  border-top-color: #4d4d4d;
}

.dark-mode .payment-method {
  color: #bbb;
}

.dark-mode .clear-orders-btn {
  background: #dc3545;
}

.dark-mode .clear-orders-btn:hover {
  background: #c82333;
}
</style>
