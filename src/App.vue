<template>
  <div class="main-page" :class="{ 'dark-mode': isDarkMode }" @click="closeAllDropdowns()">
    <!-- Main Content -->
    <div class="content">
      <!-- Top Navigation Bar -->
      <div class="top-nav">
        <!-- Left Section with User Info and Navigation -->
        <div class="left-section">
          <!-- User Info -->
          <div class="user-info">
            <p class="user-name">Ali Abushariaa</p>
            <p class="user-credit">Credit: €20.00</p>
          </div>

          <div class="nav-links">
            <router-link to="/" class="nav-link">Home</router-link>
            <router-link to="/contact" class="nav-link">Contact</router-link>
            <router-link to="/allergies" class="nav-link">Allergies</router-link>
            <router-link to="/placed-orders" class="nav-link">Placed Orders</router-link>
            <!-- Language Toggle -->
            <button class="nav-link" @click.stop="toggleLanguage">{{ currentLanguage }}</button>
            <!-- Theme Toggle -->
            <button class="theme-toggle nav-link" @click.stop="toggleTheme">
              {{ isDarkMode ? '☀️' : '🌙' }}
            </button>
          </div>
        </div>
      </div>

      <!-- Router View -->
      <router-view 
        v-if="$route.path !== '/'" 
        :key="$route.fullPath"
        :menuByRoom="menuByRoom"
        :selectedDay="selectedDay"
        :selectedRoom="selectedRoom"
        :currentMenu="currentMenu"
      ></router-view>

      <!-- Selectors - Only show on home page -->
      <div v-if="$route.path === '/'" class="selectors">
        <div class="selector-layout">
          <div class="selector day-selector">
            <label>Select Day</label>
            <div class="selector-button" @click.stop="toggleDayDropdown">
              <span class="selected-value">{{ selectedDay }}</span>
              <span class="arrow" :class="{ 'arrow-up': dayDropdownOpen }">▼</span>
            </div>
            <transition name="fade">
              <ul v-if="dayDropdownOpen" class="dropdown">
                <li v-for="day in days" 
                    :key="day" 
                    @click="selectDay(day)"
                    :class="{ 'selected': selectedDay === day }">
                  {{ day }}
                </li>
              </ul>
            </transition>
          </div>

          <div style="width: 250px"></div>

          <div class="selector room-selector">
            <label>Select Room</label>
            <div class="selector-button" @click.stop="toggleRoomDropdown">
              <span class="selected-value">{{ selectedRoom }}</span>
              <span class="arrow" :class="{ 'arrow-up': roomDropdownOpen }">▼</span>
            </div>
            <transition name="fade">
              <ul v-if="roomDropdownOpen" class="dropdown">
                <li v-for="room in rooms" 
                    :key="room" 
                    @click="selectRoom(room)"
                    :class="{ 'selected': selectedRoom === room }">
                  {{ room }}
                </li>
              </ul>
            </transition>
          </div>
        </div>
      </div>

      <!-- Menu Categories -->
      <div v-if="$route.path === '/'" class="categories">
        <div v-for="(items, category) in currentMenu" :key="category" class="category">
          <h3>{{ formatCategoryName(category) }}</h3>
          <div class="menu-item" v-for="(item, index) in items" :key="index">
            <span class="item-name">
              {{ item.name }}
              <span class="info-number" @mouseover="showInfo = item.id" @mouseleave="showInfo = null">{{ item.id }}</span>
              <div v-if="showInfo === item.id" class="info-box">
                {{ item.description }}
              </div>
            </span>
            <span class="item-weight">{{ item.weight }}</span>
            <span class="item-price">€{{ item.price }}</span>
          </div>
        </div>
      </div>

      <!-- Order Button -->
      <router-link 
        v-if="$route.path === '/'" 
        :to="{ 
          path: '/order',
          query: { 
            day: selectedDay,
            room: selectedRoom
          }
        }" 
        class="order-button"
      >
        Order
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data() {
    return {
      selectedDay: "Monday 20/11",
      days: ["Monday 20/11", "Tuesday 21/11", "Wednesday 22/11", "Thursday 23/11", "Friday 24/11"],
      dayDropdownOpen: false,
      selectedRoom: "Room A",
      rooms: ["Room A", "Room B", "Room C"],
      roomDropdownOpen: false,
      showInfo: null,
      isDarkMode: false,
      currentLanguage: 'SK',
      menuByRoom: {
        "Room A": {
          "Monday 20/11": {
            soups: [{
              id: 1,
              name: "Tomato Basil Soup",
              description: "Fresh tomatoes and basil, slow-cooked with garlic and onions. Served with croutons.",
              weight: "300ml",
              price: "3.50"
            }],
            mains: [{
              id: 2,
              name: "Grilled Salmon",
              description: "Norwegian salmon fillet, grilled to perfection with lemon herb butter sauce.",
              weight: "200g",
              price: "12.90"
            }],
            sides: [{
              id: 3,
              name: "Roasted Vegetables",
              description: "Seasonal vegetables roasted with olive oil, herbs and garlic.",
              weight: "150g",
              price: "4.50"
            }],
            desserts: [{
              id: 4,
              name: "Chocolate Mousse",
              description: "Rich Belgian chocolate mousse topped with whipped cream and chocolate shavings.",
              weight: "120g",
              price: "5.00"
            }]
          },
          "Tuesday 21/11": {
            soups: [{
              id: 5,
              name: "French Onion Soup", 
              description: "Classic French onion soup topped with crusty bread and melted cheese.",
              weight: "300ml",
              price: "4.00"
            }],
            mains: [{
              id: 6,
              name: "Beef Bourguignon",
              description: "Tender beef stewed in red wine with mushrooms and pearl onions.",
              weight: "250g",
              price: "14.90"
            }],
            sides: [{
              id: 7,
              name: "Mashed Potatoes",
              description: "Creamy mashed potatoes with butter and herbs.",
              weight: "200g",
              price: "3.50"
            }],
            desserts: [{
              id: 8,
              name: "Crème Brûlée",
              description: "Classic French vanilla custard with caramelized sugar top.",
              weight: "150g",
              price: "6.00"
            }]
          },
          "Wednesday 22/11": {
            soups: [{
              id: 9,
              name: "Mushroom Cream Soup",
              description: "Creamy soup with mixed forest mushrooms and herbs.",
              weight: "300ml",
              price: "3.80"
            }],
            mains: [{
              id: 10,
              name: "Chicken Kiev",
              description: "Breaded chicken breast filled with herb butter.",
              weight: "220g",
              price: "11.90"
            }],
            sides: [{
              id: 11,
              name: "Wild Rice",
              description: "Steamed wild rice with herbs and butter.",
              weight: "180g",
              price: "4.00"
            }],
            desserts: [{
              id: 12,
              name: "Apple Strudel",
              description: "Traditional Austrian pastry with apples and cinnamon.",
              weight: "160g",
              price: "5.50"
            }]
          },
          "Thursday 23/11": {
            soups: [{
              id: 13,
              name: "Ramen",
              description: "Japanese noodle soup with pork and egg.",
              weight: "400ml",
              price: "5.00"
            }],
            mains: [{
              id: 214,
              name: "Beef Bulgogi",
              description: "Korean marinated beef with rice.",
              weight: "250g",
              price: "13.90"
            }],
            sides: [{
              id: 215,
              name: "Kimchi",
              description: "Traditional Korean fermented vegetables.",
              weight: "100g",
              price: "3.00"
            }],
            desserts: [{
              id: 216,
              name: "Sesame Balls",
              description: "Sweet rice balls with red bean filling.",
              weight: "150g",
              price: "4.00"
            }]
          },
          "Friday 24/11": {
            soups: [{
              id: 217,
              name: "Pho",
              description: "Vietnamese beef noodle soup with herbs.",
              weight: "400ml",
              price: "5.50"
            }],
            mains: [{
              id: 218,
              name: "Sushi Platter",
              description: "Assorted sushi rolls and nigiri.",
              weight: "300g",
              price: "15.90"
            }],
            sides: [{
              id: 219,
              name: "Edamame",
              description: "Steamed soybeans with sea salt.",
              weight: "120g",
              price: "3.50"
            }],
            desserts: [{
              id: 220,
              name: "Mochi Ice Cream",
              description: "Japanese rice cake with ice cream filling.",
              weight: "100g",
              price: "4.50"
            }]
          }
        }
      }
    };
  },
  computed: {
    currentMenu() {
      return this.getMenuForRoom(this.selectedRoom, this.selectedDay);
    }
  },
  methods: {
    toggleDayDropdown() {
      this.dayDropdownOpen = !this.dayDropdownOpen;
      this.roomDropdownOpen = false;
    },
    selectDay(day) {
      this.selectedDay = day;
      this.dayDropdownOpen = false;
    },
    toggleRoomDropdown() {
      this.roomDropdownOpen = !this.roomDropdownOpen;
      this.dayDropdownOpen = false;
    },
    selectRoom(room) {
      this.selectedRoom = room;
      this.roomDropdownOpen = false;
    },
    closeAllDropdowns() {
      this.dayDropdownOpen = false;
      this.roomDropdownOpen = false;
    },
    getMenuForRoom(room, day) {
      return this.menuByRoom[room]?.[day] || {
        soups: [],
        mains: [],
        sides: [],
        desserts: []
      };
    },
    toggleTheme() {
      this.isDarkMode = !this.isDarkMode;
    },
    formatCategoryName(category) {
      return category.charAt(0).toUpperCase() + category.slice(1);
    },
    toggleLanguage() {
      this.currentLanguage = this.currentLanguage === 'SK' ? 'EN' : 'SK';
    }
  }
};
</script>

<style scoped>
.main-page {
  display: flex;
  min-height: 100vh;
  background-color: white;
  font-family: Arial, sans-serif;
  position: relative;
  transition: all 0.3s ease;
}

.main-page.dark-mode {
  background-color: #1a1a1a;
  color: #ffffff;
}

.dark-mode .top-nav,
.dark-mode .category {
  background-color: #2d2d2d;
  color: #ffffff;
}

.dark-mode .dropdown {
  background-color: #2d2d2d;
  color: #ffffff;
  border-color: #444;
}

.dark-mode .dropdown li:hover {
  background-color: #3d3d3d;
}

.dark-mode .menu-item {
  border-bottom-color: #444;
}

.dark-mode .category h3 {
  border-bottom-color: #444;
}

.dark-mode .nav-link {
  background-color: #3d3d3d;
  color: #ffffff;
}

.dark-mode .nav-link:hover {
  background-color: #4d4d4d;
}

.dark-mode .order-button {
  background-color: #27ae60;
  color: #ffffff;
}

.dark-mode .order-button:hover {
  background-color: #219a52;
}

.dark-mode .info-box {
  background-color: #2d2d2d;
  color: #ffffff;
  border-color: #444;
}

.dark-mode .item-weight {
  color: #aaa;
}

.dark-mode .selector-button {
  background-color: #2d2d2d;
  border-color: #444;
}

.dark-mode .selector label {
  color: #aaa;
}

.selector-layout {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
  margin: 0 auto;
}

.left-section {
  display: flex;
  align-items: center;
  gap: 20px;
}

.nav-links {
  display: flex;
  gap: 10px;
}

.language-toggle {
  display: flex;
  gap: 5px;
}

.content {
  flex: 1;
  padding: 20px;
}

.top-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-bottom: 20px;
}

.selectors {
  margin: 30px 0;
  padding: 0 20px;
}

.selector {
  position: relative;
  width: 250px;
}

.selector label {
  display: block;
  margin-bottom: 12px;
  font-size: 14px;
  color: #555;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.selector-button {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 14px 20px;
  background: white;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.selector-button:hover {
  border-color: #2ecc71;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(46, 204, 113, 0.15);
}

.selected-value {
  font-weight: 600;
  color: #333;
}

.arrow {
  transition: transform 0.3s ease;
  color: #2ecc71;
  font-size: 12px;
}

.arrow-up {
  transform: rotate(180deg);
}

.dropdown {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  width: 100%;
  background: white;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  padding: 8px 0;
  list-style: none;
  box-shadow: 0 8px 16px rgba(0,0,0,0.1);
  z-index: 1000;
  backdrop-filter: blur(10px);
}

.dropdown li {
  padding: 12px 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;
}

.dropdown li:hover {
  background-color: #f8f9fa;
  color: #2ecc71;
  padding-left: 24px;
}

.dropdown li.selected {
  background-color: #e8f8f0;
  color: #2ecc71;
  font-weight: 600;
}

.categories {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.category {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.category h3 {
  margin-bottom: 15px;
  color: inherit;
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 10px;
}

.menu-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0;
}

.item-name {
  font-weight: bold;
  flex: 2;
  position: relative;
}

.item-weight {
  color: #666;
  flex: 1;
  text-align: center;
}

.item-price {
  font-weight: bold;
  color: #2ecc71;
  flex: 1;
  text-align: right;
}

.user-info {
  display: flex;
  flex-direction: column;
}

.user-name {
  font-weight: bold;
  margin: 0;
}

.user-credit {
  color: #2ecc71;
  margin: 0;
}

.nav-link {
  text-decoration: none;
  color: inherit;
  padding: 8px 15px;
  border-radius: 4px;
  background-color: #f5f5f5;
  cursor: pointer;
  border: none;
  font-size: 14px;
}

.nav-link:hover {
  background-color: #e0e0e0;
}

.info-number {
  display: inline-block;
  width: 18px;
  height: 18px;
  background-color: #2ecc71;
  color: white;
  border-radius: 50%;
  text-align: center;
  font-size: 12px;
  line-height: 18px;
  margin-left: 8px;
  cursor: pointer;
}

.info-box {
  position: absolute;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 10px;
  width: 200px;
  top: -40px;
  left: 100%;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  font-size: 14px;
  font-weight: normal;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.order-button {
  display: block;
  width: 200px;
  margin: 40px auto;
  padding: 15px 30px;
  background-color: #2ecc71;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
  text-decoration: none;
  text-align: center;
}

.order-button:hover {
  background-color: #27ae60;
}
</style>
