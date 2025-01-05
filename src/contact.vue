<template>
  <div class="contact-container">
    <h1>Contact us</h1>
    <div class="form-box" :class="{ 'slide-right': isSubmitting }">
      <form class="contact-form" @submit.prevent="submitForm">
        <div class="form-group">
          <label for="fullName">Full Name:</label>
          <input type="text" id="fullName" v-model="formData.fullName" required>
        </div>

        <div class="form-group">
          <label for="email">Email Address:</label>
          <input type="email" id="email" v-model="formData.email" required>
        </div>

        <div class="form-group">
          <label for="role">Role:</label>
          <select id="role" v-model="formData.role" required>
            <option value="">Select your role</option>
            <option value="teacher">Teacher</option>
            <option value="student">Student</option>
          </select>
        </div>

        <div class="form-group">
          <label for="problem">Describe your problem:</label>
          <textarea id="problem" v-model="formData.problem" rows="5" required></textarea>
        </div>

        <button type="submit" class="submit-btn">Send</button>
      </form>
    </div>

    <!-- Success Message -->
    <div v-if="showSuccessMessage" class="success-message">
      <p>Your message has been sent successfully! We'll contact you soon.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContactPage',
  data() {
    return {
      formData: {
        fullName: '',
        email: '',
        role: '',
        problem: ''
      },
      isSubmitting: false,
      showSuccessMessage: false
    }
  },
  methods: {
    submitForm() {
      this.isSubmitting = true;
      // Handle form submission here
      console.log('Form submitted:', this.formData)
      
      // Show success message
      this.showSuccessMessage = true;
      
      // Reset form after animation completes
      setTimeout(() => {
        this.formData = {
          fullName: '',
          email: '',
          role: '',
          problem: ''
        }
        this.isSubmitting = false;
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          this.showSuccessMessage = false;
        }, 5000);
      }, 1000);
    }
  }
}
</script>

<style scoped>
.contact-container {
  padding: 20px;
  position: relative;
  max-width: 600px;
  margin: 0 auto;
  overflow: hidden;
}

h1 {
  text-align: center;
  margin-top: 20px;
  margin-bottom: 30px;
}

.form-box {
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  transition: transform 1s ease;
  position: relative;
}

.dark-mode .form-box {
  background: #2d2d2d;
  color: #ffffff;
}

.form-box.slide-right {
  transform: translateX(150%);
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

label {
  font-weight: bold;
}

.dark-mode label {
  color: #ffffff;
}

input, select, textarea {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

.dark-mode input,
.dark-mode select,
.dark-mode textarea {
  background-color: #3d3d3d;
  color: #ffffff;
  border-color: #444;
}

textarea {
  resize: vertical;
}

.submit-btn {
  background-color: #27ae60;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  width: 100%;
}

.submit-btn:hover {
  background-color: #219a52;
}

.success-message {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #27ae60;
  color: white;
  padding: 15px 30px;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.2);
  animation: slideDown 0.5s ease-out;
}

@keyframes slideDown {
  from {
    transform: translate(-50%, -100%);
  }
  to {
    transform: translate(-50%, 0);
  }
}

.dark-mode .success-message {
  background-color: #219a52;
}
</style>
