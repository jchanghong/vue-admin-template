<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-button type="primary" icon="el-icon-edit"></el-button>
      <el-button type="primary" icon="el-icon-share"></el-button>
      <el-button type="primary" icon="el-icon-delete"></el-button>
      <el-button type="primary" icon="el-icon-search">搜索</el-button>
      <el-button type="primary">上传<i class="el-icon-upload el-icon--right"></i></el-button>
<!--      <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>-->
<!--      <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>-->
<!--      <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>-->
<!--      <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>-->
    </el-row>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="地区" width="95">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="版本">
        <template slot-scope="scope">
          {{ version(scope.row.dbType) }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="总体">
        <el-table-column sortable prop="all_online" label="在线数" width="110" align="center">
          <!--  <template slot-scope="scope">
              <span>{{ scope.row.all_online }}</span>
            </template>-->
        </el-table-column>
        <el-table-column sortable label="总数" prop="all_all" width="110" align="center">
          <template slot-scope="scope">
            {{ scope.row.all_all }}
          </template>
        </el-table-column>
        <el-table-column label="在线率" width="110" align="center" >
          <template slot-scope="scope">
            {{ toPercent( scope.row.all_online/scope.row.all_all) }}
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="自建" align="center">
        <el-table-column sortable label="在线数" width="110" prop="yz_online" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.yz_online }}</span>
          </template>
        </el-table-column>
        <el-table-column sortable label="合规数" width="110" prop="yz_normal" align="center">
          <template slot-scope="scope">
            {{ scope.row.yz_normal }}
          </template>
        </el-table-column>
        <el-table-column sortable label="总数" width="110" prop="yz_all" align="center">
          <template slot-scope="scope">
            {{ scope.row.yz_all }}
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column align="center" label="其他">
        <el-table-column sortable label="在线数" width="110" prop="other_online" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.other_online }}</span>
          </template>
        </el-table-column>
        <el-table-column sortable label="合规数" width="110" prop="other_normal" align="center">
          <template slot-scope="scope">
            {{ scope.row.other_normal }}
          </template>
        </el-table-column>
        <el-table-column sortable label="总数" width="110" prop="other_all" align="center">
          <template slot-scope="scope">
            {{ scope.row.other_all }}
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column sortable label="推送数量" prop="push" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.push }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="jobtime" label="时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span>{{ scope.row.jobtime }}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="Status" width="110" align="center">
        <template slot-scope="scope">
          <el-row>
<!--            <el-button @click="handleClick(scope.row)" type="primary" size="small">查看</el-button>-->
            <!--          <el-button type="text" size="small">编辑</el-button>-->
            <el-button type="primary" icon="el-icon-edit" size="small"></el-button>
            <el-button type="primary" icon="el-icon-share" size="small"></el-button>
            <el-button type="primary" icon="el-icon-delete" size="small"></el-button>
          </el-row>

        </template>
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
  import {getListMnage} from '../../api/table'

  export default {
    filters: {
      statusFilter(status) {
        const statusMap = {
          published: 'success',
          draft: 'gray',
          deleted: 'danger'
        }
        return statusMap[status]
      }
    },
    data() {
      return {
        list: null,
        listLoading: true
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        this.listLoading = true
        getListMnage().then(response => {
          console.info(response)
          this.list = response.data.items
          this.listLoading = false
        })
      },
      version(version) {
        var version = version;
        var result = "8900 V3.0";
        if (version == 1) {
          result = "8900 V3.0";
        }
        if (version == 2) {
          result = "V3.4.1";
        }
        if (version == 3) {
          result = "8200 V3.x";
        }
        return result;
      },
      toPercent(point) {
        if (point == 0) {
          return 0;
        }
        var str = Number(point * 100).toFixed();
        str += "%";
        return str;
      }
    }
  }
</script>
