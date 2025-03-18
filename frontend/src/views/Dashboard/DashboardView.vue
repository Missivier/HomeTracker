<template>
  <div class="dashboard">
    <header class="dashboard-header">
      <div class="container">
        <div class="header-content">
          <h1 class="app-title">🏠 HomeTracker</h1>
          <div class="header-actions">
            <ThemeToggle />
            <button class="button_secondary" @click="logout">
              <span>Se déconnecter</span>
            </button>
          </div>
        </div>
      </div>
    </header>

    <main class="dashboard-main">
      <div class="container">
        <div class="welcome-section">
          <h2>Bienvenue sur votre tableau de bord</h2>
          <p>Ceci est une version prototype de l'application HomeTracker.</p>
        </div>

        <div class="dashboard-cards">
          <div class="dashboard-card">
            <div class="card-icon">📊</div>
            <h3>Vue d'ensemble</h3>
            <p>Consultez une vue d'ensemble de vos propriétés et données.</p>
          </div>

          <div class="dashboard-card">
            <div class="card-icon">🏡</div>
            <h3>Propriétés</h3>
            <p>Gérez vos propriétés et leurs informations.</p>
          </div>

          <div class="dashboard-card">
            <div class="card-icon">💰</div>
            <h3>Finances</h3>
            <p>Suivez vos revenus et dépenses.</p>
          </div>

          <div class="dashboard-card">
            <div class="card-icon">📅</div>
            <h3>Calendrier</h3>
            <p>Organisez vos rendez-vous et échéances.</p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import ThemeToggle from "../../components/ThemeToggle.vue";
import { useAuthStore } from "../../stores/auth";

const router = useRouter();
const authStore = useAuthStore();

const logout = async () => {
  await authStore.logout();
  router.push("/login");
};
</script>

<style scoped>
.dashboard {
  min-height: 100vh;
  background-color: var(--color-background);
  color: var(--color-foreground);
}

:global(.dark) .dashboard {
  background-color: var(--color-background-dark);
  color: var(--color-foreground-dark);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.dashboard-header {
  background-color: var(--color-background);
  border-bottom: 1px solid rgba(var(--color-foreground-rgb), 0.1);
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 10;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

:global(.dark) .dashboard-header {
  background-color: var(--color-background-dark);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.app-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-primary);
}

:global(.dark) .app-title {
  color: var(--color-primary-dark);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.dashboard-main {
  padding: 2rem 0;
}

.welcome-section {
  margin-bottom: 2rem;
  text-align: center;
}

.welcome-section h2 {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: var(--color-primary);
}

:global(.dark) .welcome-section h2 {
  color: var(--color-primary-dark);
}

.welcome-section p {
  font-size: 1.1rem;
  color: var(--color-secondary);
}

:global(.dark) .welcome-section p {
  color: var(--color-secondary-dark);
}

.dashboard-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.dashboard-card {
  background-color: var(--color-background);
  border: 1px solid rgba(var(--color-foreground-rgb), 0.1);
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

:global(.dark) .dashboard-card {
  background-color: var(--color-background-dark);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.dashboard-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}

.card-icon {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.dashboard-card h3 {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--color-primary);
}

:global(.dark) .dashboard-card h3 {
  color: var(--color-primary-dark);
}

.dashboard-card p {
  color: var(--color-secondary);
  font-size: 0.95rem;
}

:global(.dark) .dashboard-card p {
  color: var(--color-secondary-dark);
}

@media (max-width: 768px) {
  .dashboard-cards {
    grid-template-columns: 1fr;
  }

  .header-content {
    flex-direction: column;
    gap: 1rem;
  }

  .header-actions {
    width: 100%;
    justify-content: space-between;
  }
}
</style>
