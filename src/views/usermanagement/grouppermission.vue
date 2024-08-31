<template>
    <div style="padding: 20px;">
        <a-select default-value="Admin" style="width: 20%; padding: 10px;" @change="handleChange">
            <a-select-option v-for="group in userGroups" :key="group.id" :value="group.id">
                {{ group.name }}
            </a-select-option>
        </a-select>

        <a-table :data-source="permissions" :columns="columns" row-key="page">
            <template slot="checkboxes" slot-scope="record">
                <a-checkbox-group v-model="selectedCheckboxes[record.page]" :options="Options" :default-value="['新增', '导入', '查看详情', '修改', '删除', '导出']" />
            </template>
        </a-table>

        <div style="margin-top: 20px;">
            <a-button type="primary" @click="savePermissions">Save Permissions</a-button>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            Options: ['新增', '导入', '查看详情', '修改', '删除', '导出'],
            userGroups: [
                { id: 1, name: 'Admin' },
                { id: 2, name: 'Viewer' },
                { id: 3, name: 'Normal User' }
            ],
            selectedGroup: null,
            permissions: [
                { page: '仪表盘' },
                { page: '表单页' },
                { page: '列表页' },
                { page: '详情页' },
                { page: '结果页' },
                { page: '异常页' },
                { page: '个人页' },
                { page: '用户管理' }
            ],
            columns: [
                {
                    title: 'Page',
                    dataIndex: 'page',
                    key: 'page'
                },
                {
                    title: 'Permissions',
                    key: 'select',
                    scopedSlots: { customRender: 'checkboxes' }
                }
            ],
            selectedCheckboxes: {}
        }
    },
    methods: {
        savePermissions () {
            console.log('Selected Group:', this.selectedGroup)
            console.log('Permissions:', this.permissions)
            this.$message.success('Permissions saved!')
        }
    }
}
</script>

<style scoped>
/* 样式根据需要调整 */
</style>
