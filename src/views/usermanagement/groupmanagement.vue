<template>
  <div style="background-color: #ececec; padding: 20px;">
    <a-row :gutter="16">
      <a-col :span="8">
        <a-card title="Admin" :bordered="false">
          <div style="margin-bottom: 16px;">
            <a-input-search placeholder="Search by last name" enter-button @search="onSearch" v-model="searchQuery" />
          </div>
          <a-list class="demo-loadmore-list" :loading="loadingAdmin" item-layout="horizontal" :data-source="dataAdmin">
            <div
              v-if="showLoadingMoreAdmin"
              slot="loadMore"
              :style="{ textAlign: 'center', marginTop: '12px', height: '32px', lineHeight: '32px' }">
              <a-spin v-if="loadingMoreAdmin" />
              <a-button v-else @click="onLoadMore('Admin')">
                loading more
              </a-button>
            </div>
            <a-list-item slot="renderItem" slot-scope="item">
              <a slot="actions">move to other group</a>
              <a slot="actions">more information</a>
              <a-list-item-meta>
                <a slot="title" href="https://www.antdv.com/">{{ item.name.last }}</a>
                <a-avatar slot="avatar" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              </a-list-item-meta>
            </a-list-item>
          </a-list>
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card title="Viewer" :bordered="false">
          <div style="margin-bottom: 16px;">
            <a-input-search placeholder="Search by last name" enter-button @search="onSearch" v-model="searchQuery" />
          </div>
          <a-list
            class="demo-loadmore-list"
            :loading="loadingViewer"
            item-layout="horizontal"
            :data-source="dataViewer">
            <div
              v-if="showLoadingMoreViewer"
              slot="loadMore"
              :style="{ textAlign: 'center', marginTop: '12px', height: '32px', lineHeight: '32px' }">
              <a-spin v-if="loadingMoreViewer" />
              <a-button v-else @click="onLoadMore('Viewer')">
                loading more
              </a-button>
            </div>
            <a-list-item slot="renderItem" slot-scope="item">
              <a slot="actions">move to other group</a>
              <a slot="actions">more information</a>
              <a-list-item-meta>
                <a slot="title" href="https://www.antdv.com/">{{ item.name.last }}</a>
                <a-avatar slot="avatar" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              </a-list-item-meta>
            </a-list-item>
          </a-list>
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card title="Normal user" :bordered="false">
          <div style="margin-bottom: 16px;">
            <a-input-search placeholder="Search by last name" enter-button @search="onSearch" v-model="searchQuery" />
          </div>
          <a-list
            class="demo-loadmore-list"
            :loading="loadingNormal"
            item-layout="horizontal"
            :data-source="dataNormal">
            <div
              v-if="showLoadingMoreNormal"
              slot="loadMore"
              :style="{ textAlign: 'center', marginTop: '12px', height: '32px', lineHeight: '32px' }">
              <a-spin v-if="loadingMoreNormal" />
              <a-button v-else @click="onLoadMore('Normal')">
                loading more
              </a-button>
            </div>
            <a-list-item slot="renderItem" slot-scope="item">
              <a slot="actions">move to other group</a>
              <a slot="actions">more information</a>
              <a-list-item-meta>
                <a slot="title" href="https://www.antdv.com/">{{ item.name.last }}</a>
                <a-avatar slot="avatar" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              </a-list-item-meta>
            </a-list-item>
          </a-list>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import axios from 'axios'
const fakeDataUrl = 'https://randomuser.me/api/?results=3&inc=name,gender,email,nat,picture&noinfo'

export default {
  data () {
    return {
      // Admin list data
      loadingAdmin: false,
      loadingMoreAdmin: false,
      showLoadingMoreAdmin: true,
      dataAdmin: [],

      // Viewer list data
      loadingViewer: false,
      loadingMoreViewer: false,
      showLoadingMoreViewer: true,
      dataViewer: [],

      // Normal user list data
      loadingNormal: false,
      loadingMoreNormal: false,
      showLoadingMoreNormal: true,
      dataNormal: []
    }
  },
  mounted () {
    this.loadAdminData()
    this.loadViewerData()
    this.loadNormalData()
  },
  methods: {
    getData () {
      return axios.get(fakeDataUrl)
    },
    loadAdminData () {
      this.loadingAdmin = true
      this.getData().then(res => {
        this.loadingAdmin = false
        this.dataAdmin = res.data.results
      })
    },
    loadViewerData () {
      this.loadingViewer = true
      this.getData().then(res => {
        this.loadingViewer = false
        this.dataViewer = res.data.results
      })
    },
    loadNormalData () {
      this.loadingNormal = true
      this.getData().then(res => {
        this.loadingNormal = false
        this.dataNormal = res.data.results
      })
    },
    onLoadMore (type) {
      let loadingMoreKey, dataKey

      switch (type) {
        case 'Admin':
          loadingMoreKey = 'loadingMoreAdmin'
          dataKey = 'dataAdmin'
          break
        case 'Viewer':
          loadingMoreKey = 'loadingMoreViewer'
          dataKey = 'dataViewer'
          break
        case 'Normal':
          loadingMoreKey = 'loadingMoreNormal'
          dataKey = 'dataNormal'
          break
        default:
          return
      }

      this[loadingMoreKey] = true
      this.getData().then(res => {
        this[dataKey] = this[dataKey].concat(res.data.results)
        this[loadingMoreKey] = false
      })
    }
  }
}
</script>
