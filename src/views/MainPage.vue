<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { Routes } from '@/router/routes';
const accessToken = localStorage.getItem('token');
const router = useRouter();
if (accessToken) {
  router.push(Routes.DASHBOARD);
} else {
  router.push(Routes.LOGIN);
}
</script>

<style scoped></style>
