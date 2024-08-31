<template>
  <a-card :loading="loading" :bordered="false" :body-style="{ padding: '10px' }">
    <div style="margin-bottom: 16px;">
      <a-input-search placeholder="Search by last name" enter-button @search="onSearch" v-model="searchQuery" />
    </div>
    <a-list class="demo-loadmore-list" :loading="loading" item-layout="horizontal" :data-source="data">
      <div
        v-if="showLoadingMore"
        slot="loadMore"
        :style="{ textAlign: 'center', marginTop: '12px', height: '32px', lineHeight: '32px' }">
        <a-spin v-if="loadingMore" />
        <a-button v-else @click="onLoadMore">
          loading more
        </a-button>
      </div>
      <a-list-item slot="renderItem" slot-scope="item">
        <a slot="actions">delete</a>
        <a slot="actions">edit</a>
        <a slot="actions">more</a>
        <a-list-item-meta
          description="Ant Design, a design language for background applications, is refined by Ant UED Team">
          <a slot="title" href="https://www.antdv.com/">{{ item.name.last }}</a>
          <a-avatar slot="avatar" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
        </a-list-item-meta>
      </a-list-item>
    </a-list>
  </a-card>
</template>
<script>
import axios from 'axios'
const fakeDataUrl = 'https://randomuser.me/api/?results=5&inc=name,gender,email,nat,picture&noinfo'

export default {
  data () {
    return {
      loading: true,
      loadingMore: false,
      showLoadingMore: true,
      data: [],
      list: []
    }
  },
  mounted () {
    this.getData().then(res => {
      this.loading = false
      this.data = res.data.results
      this.list = res.data.results
    })
  },
  methods: {
    getData () {
      return axios.get(fakeDataUrl)
    },
    onLoadMore () {
      this.loadingMore = true
      this.list = this.data.concat(
        [...new Array(3)].map(() => ({ loading: true, name: {}, picture: {} }))
      )
      this.getData().then(res => {
        const newData = this.data.concat(res.data.results)
        this.data = this.data.concat(res.data.results)
        this.loadingMore = false
        this.list = newData
        this.$nextTick(() => {
          window.dispatchEvent(new Event('resize'))
        })
      })
    }
  }
}
</script>
<style scoped>
.demo-loadmore-list {
  min-height: 350px;
}
</style>
