<!-- Header.vue -->
<script setup>
import { ref } from 'vue'

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<template>
  <header class="header">
    <!-- Main header bar -->
    <div class="header-container">
      <div class="header-content">
        <!-- Logo and title -->
        <div class="brand">
            <div class="brand-icon">
                <logo></logo>
            </div>
          <h1 class="brand-title">RemembeRand</h1>
        </div>

        <!-- Desktop navigation -->
        <nav class="desktop-nav">
          <!-- <a href="#" class="nav-link">
            <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span>Home</span>
          </a> -->
          <!-- <a href="#" class="nav-link">
            <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 3v16h14V3H5zM5 19h14M9 13l3-3 3 3" />
            </svg>
            <span>Leaderboard</span>
          </a> -->
          <a href="#" class="nav-link">
            <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
            </svg>
            <span>Settings</span>
          </a>
        </nav>

        <!-- Mobile menu button -->
        <div class="mobile-menu-button">
          <button @click="toggleMenu" class="menu-button">
            <svg 
              v-if="!isMenuOpen" 
              class="menu-icon" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              stroke-width="2"
            >
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="18" x2="20" y2="18" />
            </svg>
            <svg 
              v-else 
              class="menu-icon" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              stroke-width="2"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile menu -->
    <div v-if="isMenuOpen" class="mobile-menu">
      <a href="#" class="mobile-nav-link">
        <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        <span>Home</span>
      </a>
      <!-- <a href="#" class="mobile-nav-link">
        <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M5 3v16h14V3H5zM5 19h14M9 13l3-3 3 3" />
        </svg>
        <span>Leaderboard</span>
      </a> -->
      <a href="#" class="mobile-nav-link">
        <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
        </svg>
        <span>Settings</span>
      </a>
    </div>
  </header>
</template>

<style scoped>
.header {
  background-color: #1a1a1a;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
}

.header-container {
  max-width: 80rem;
  margin: 0 auto;
  padding: 0 1rem;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4rem;
}

.brand {
  display: flex;
  align-items: center;
}

.brand-icon {
  /* height: 100px; */
  width: 50;
  /* color: #60a5fa; Lighter blue for dark mode */
}

.brand-title {
  margin-left: 0.5rem;
  font-size: 1.25rem;
  font-weight: bold;
  color: #e5e7eb; /* Light gray for dark mode */
}

.desktop-nav {
  display: none;
  align-items: center;
  gap: 2rem;
}

.nav-link {
  display: flex;
  align-items: center;
  color: #9ca3af; /* Lighter gray for better visibility */
  text-decoration: none;
  transition: color 0.2s;
}

.nav-link:hover {
  color: #60a5fa; /* Lighter blue for dark mode */
}

.nav-icon {
  height: 1.25rem;
  width: 1.25rem;
  margin-right: 0.25rem;
}

.mobile-menu-button {
  display: block;
}

.menu-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 0.375rem;
  color: #9ca3af; /* Lighter gray for better visibility */
  background: transparent;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
}

.menu-button:hover {
  background-color: #2d2d2d; /* Darker background for hover */
  color: #60a5fa; /* Lighter blue for dark mode */
}

.menu-icon {
  height: 1.5rem;
  width: 1.5rem;
}

.mobile-menu {
  padding: 0.5rem;
  background-color: #1a1a1a; /* Dark background */
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
}

.mobile-nav-link {
  display: flex;
  align-items: center;
  padding: 0.75rem;
  color: #9ca3af; /* Lighter gray for better visibility */
  text-decoration: none;
  border-radius: 0.375rem;
  transition: background-color 0.2s;
}

.mobile-nav-link:hover {
  background-color: #2d2d2d; /* Darker background for hover */
  color: #60a5fa; /* Lighter blue for dark mode */
}

@media (min-width: 768px) {
  .desktop-nav {
    display: flex;
  }

  .mobile-menu-button {
    display: none;
  }

  .mobile-menu {
    display: none;
  }
}

/* .header {
  background-color: white;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
}

.header-container {
  max-width: 80rem;
  margin: 0 auto;
  padding: 0 1rem;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4rem;
}

.brand {
  display: flex;
  align-items: center;
}

.brand-icon {
  height: 2rem;
  width: 2rem;
  color: #2563eb;
}

.brand-title {
  margin-left: 0.5rem;
  font-size: 1.25rem;
  font-weight: bold;
  color: #111827;
}

.desktop-nav {
  display: none;
  align-items: center;
  gap: 2rem;
}

.nav-link {
  display: flex;
  align-items: center;
  color: #374151;
  text-decoration: none;
  transition: color 0.2s;
}

.nav-link:hover {
  color: #2563eb;
}

.nav-icon {
  height: 1.25rem;
  width: 1.25rem;
  margin-right: 0.25rem;
}

.mobile-menu-button {
  display: block;
}

.menu-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 0.375rem;
  color: #374151;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
}

.menu-button:hover {
  background-color: #f3f4f6;
  color: #2563eb;
}

.menu-icon {
  height: 1.5rem;
  width: 1.5rem;
}

.mobile-menu {
  padding: 0.5rem;
  background-color: white;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.mobile-nav-link {
  display: flex;
  align-items: center;
  padding: 0.75rem;
  color: #374151;
  text-decoration: none;
  border-radius: 0.375rem;
  transition: background-color 0.2s;
}

.mobile-nav-link:hover {
  background-color: #f3f4f6;
  color: #2563eb;
}

@media (min-width: 768px) {
  .desktop-nav {
    display: flex;
  }

  .mobile-menu-button {
    display: none;
  }

  .mobile-menu {
    display: none;
  }
} */
</style>