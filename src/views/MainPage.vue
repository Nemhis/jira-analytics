<script lang="ts" setup>
import { VUE_APP_DOMAIN } from '@/config';
const accessToken = localStorage.getItem('token');
if (accessToken) {
  window.location.href = VUE_APP_DOMAIN + '/dashboard/';
} else {
  window.location.href = VUE_APP_DOMAIN + '/login/';
}
</script>

<style scoped></style>
