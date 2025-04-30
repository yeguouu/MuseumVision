<template>
  <Header></Header>
  <div class="era-artifacts-container">
    <!-- 左侧 导航栏 -->
    <Nav></Nav>
    <!-- 右侧 内容栏 -->
    <div class="content-container">
      <div class="small-nav">
        <span @click="navigateTo('/collections/sub3')">藏品</span> > <span>{{ category }}</span>
      </div>
      <div class="section">
        <h2>{{ category }} 藏品</h2>
        <div class="items item" v-for="artifact in eraArtifacts" :key="artifact.id" @click="showModal(artifact)">
          <img :src="artifact.image" alt="artifact image" />
          <p>{{ artifact.name }}</p>
        </div>
      </div>
      <a-modal v-model:visible="isModalVisible" title="文物信息" :footer="null">
        <div v-if="selectedArtifact">
          <img :src="selectedArtifact.image" alt="artifact image" />
          <p>{{ selectedArtifact.description }}</p>
        </div>
      </a-modal>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Nav from '../../components/Nav.vue'; // 确保引入 Nav 组件
import Col1 from '../../assets/col/col1.png';
import Header from '../../components/Header.vue';

interface Artifact {
  id: number;
  image: string;
  title: string;
  description: string;
  era: string;
  category: string;
  name: string;
}

const route = useRoute();
const router = useRouter();
const category = route.params.category as string;
const eraArtifacts = ref<Artifact[]>([]);
const isModalVisible = ref(false);
const selectedArtifact = ref<Artifact | null>(null);

onMounted(() => {
  fetch('/api/cols', {
    method: 'GET',
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('not ok ' + response.statusText);
    }
    return response.json();
  })
  .then(data => {
    eraArtifacts.value = data.filter((artifact: Artifact) => artifact.category === category).map((item: any) => ({
      ...item,
      image: Col1, // 统一使用前端图片
    }));
  })
  .catch(error => console.error('problem', error));
});

const showModal = (artifact: Artifact) => {
  selectedArtifact.value = artifact;
  isModalVisible.value = true;
};

const navigateTo = (path: string) => {
  router.push(path);
};
</script>

<style lang='scss' scoped>
.era-artifacts-container {
  display: flex;
  width: 100vw;
  height: 100vh;
}

.small-nav {
  // width: 85%;
  height: 50px;
  background-color: #f0f0f0;
  padding: 10px;
  border-bottom: 1px solid #ccc;
}

.small-nav span {
  cursor: pointer;
  margin-right: 10px;
}

.small-nav span:hover {
  text-decoration: underline;
}

.content-container {
  width: 85%;
  height: 100%;
  background-color: #f0f0f0;
  padding: 20px;
}

.section {
  margin-bottom: 20px;
  display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

  h2 {
    margin-bottom: 10px;
  }

  .items {
    display: flex;
    flex-wrap: wrap;
    // gap: 10px;
    margin-top: 20px;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .item {
      width: 300px;
      height: 300px;
      cursor: pointer;
      margin-bottom: 20px;

      img {
        width: 100%;
        height: auto;
        transition: box-shadow 0.3s ease;
      }

      p {
        text-align: center;
      }

      &:hover {
        img {
          box-shadow: 4px 4px 4px 4px #888888;
        }
      }
    }
  }
}

.ant-modal-body img {
  width: 460px; // 固定宽度
  height: 460px; // 固定高度
  object-fit: cover; // 保持图片比例并裁剪
}
</style>