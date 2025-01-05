<template>
  <div class="success-page" :class="{ 'dark-mode': isDarkMode }">
    <div class="success-content">
      <div class="success-icon">✅</div>
      <h1>Order Successfully Placed!</h1>
      
      <div class="order-details">
        <h2>Order Summary</h2>
        <div class="location-details">
          <p><strong>Location:</strong> {{ orderDetails.room }}</p>
          <p><strong>Date:</strong> {{ orderDetails.day }}</p>
        </div>

        <div class="items-list">
          <h3>Items Ordered:</h3>
          <div v-for="(item, index) in orderDetails.items" :key="index" class="order-item">
            <span class="item-name">{{ item.name }}</span>
            <span class="item-price">€{{ item.price }}</span>
          </div>
        </div>

        <div class="payment-details">
          <div class="total">
            <span>Total Amount:</span>
            <span>€{{ orderDetails.total.toFixed(2) }}</span>
          </div>
          <p class="payment-method">
            Payment Method: {{ orderDetails.paymentMethod === 'credit' ? 'Student Credit' : 'Cash' }}
          </p>
        </div>
      </div>

      <router-link to="/" class="back-button">
        Return to Menu
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SuccessPage',
  data() {
    return {
      orderDetails: {},
      isDarkMode: false
    }
  },
  created() {
    // Parse order details from URL query parameter
    try {
      this.orderDetails = JSON.parse(this.$route.query.orderDetails)
      // Add order to PlacedOrders component
      const existingOrders = JSON.parse(localStorage.getItem('placedOrders') || '[]')
      existingOrders.push(this.orderDetails)
      localStorage.setItem('placedOrders', JSON.stringify(existingOrders))
    } catch (e) {
      console.error('Error parsing order details:', e)
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.success-page {
  min-height: 100vh;
  padding: 40px 20px;
  background-color: #f5f5f5;
}

.success-content {
  max-width: 800px;
  margin: 0 auto;
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.success-icon {
  font-size: 64px;
  text-align: center;
  margin-bottom: 20px;
}

h1 {
  text-align: center;
  color: #4CAF50;
  margin-bottom: 30px;
}

.order-details {
  background: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  margin: 20px 0;
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

.back-button {
  display: block;
  width: fit-content;
  margin: 30px auto 0;
  padding: 12px 24px;
  background: #4CAF50;
  color: white;
  text-decoration: none;
  border-radius: 6px;
  transition: background-color 0.3s;
}

.back-button:hover {
  background: #45a049;
}

.dark-mode {
  background-color: #1a1a1a;
  color: #fff;
}

.dark-mode .success-content {
  background: #2d2d2d;
}

.dark-mode .order-details {
  background: #3d3d3d;
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
</style>
