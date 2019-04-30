$(document).ready(function () {
  $.ajax({
    url: path + "/detail/info",
    type: 'post',
    data: {orgId: orgId},
    success: function (result) {
      var typeName = "";
      if (pageId == 0) {
        typeName = "-所有镜头详情列表";
      } else if (pageId == 1) {
        typeName = "-应指镜头错误详情列表";
      } else if (pageId == 2) {
        typeName = "-其它镜头错误详情列表";
      }
      $(".info_name").text(result.name + typeName);

    },
    error: function () {
      jAlert(
          "内部错误",
          '加载失败！',
          'error');
    }
  });

  var height = $(document).height() - 120;
  $('#DataGrid').height(height);
  var grid = new pk.Ajaxgrid({
    el: $('#DataGrid'),
    url: path + '/detail', //用以获取分页数据的请求
    type: 'POST',
    idField: 'id',
    params: {
      orgId: orgId,
      pageId: pageId,
      condition: $("#condition").val(),
      showPublic: ($("#show_public").is(":checked") ? 1 : 0)
    },
    width: "1800px",
    autoHeight: false,
    pagination: true,
    pageSize: 20,
    fields: [{
      field: '_serial'
    }, {
      field: 'orgName',
      text: '地区',
      weight: 40,
      sortable: true
    }, {
      field: 'name',
      text: '监控点名称',
      weight: 100,
      sortable: true,
      title: function (rowData) {
        if (rowData.name.indexOf("[*]") != -1) {
          return '已推送公安部镜头: ' + rowData.name;
        }
        return '监控点名称: ' + rowData.name;
      },
      renderer: function (rowData) {
        if (rowData.name.indexOf("[*]") != -1) {
          return rowData.name.replace("\[\*\]", "<font color='red'>[*]</font>");
        }
        return rowData.name;
      }
    }, {
      field: 'indexCode',
      text: '编码',
      weight: 90
    }, {
      field: 'IP',
      text: 'IP',
      weight: 50,
      sortable: false
    }, {
      field: 'status',
      text: '在线状态',
      weight: 40,
      sortable: true,
      renderer: function (rowData) {
        var title = "校验时间：" + (rowData.checkStatusTime || "暂无");
        if (rowData.status == 1) {
          return "<div style='color:green' title='" + title + "'>在线 </div>";
        } else {
          return "<div style='color:red' title='" + title + "'>离线 </div>";
        }
      }
    }, {
      field: 'omoa',
      text: '一机一档',
      weight: 40,
      sortable: true,
      hidden: pageId == 2,
      renderer: function (rowData) {
        if (rowData.omoa == 0) {
          return "<div style='color:blue' ><a href='javascript:omoaInfo(\""
              + rowData.indexCode + "\")'>空</a> </div>";
        } else {
          if (rowData.omoa == -1) {
            return "<div style='color:red'><a href='javascript:omoaInfo(\""
                + rowData.indexCode + "\")'>错误</a>  </div>";
          } else {
            return "<div style='color:green'><a href='javascript:omoaInfo(\""
                + rowData.indexCode + "\")'>正确</a>  </div>";
          }
        }
      }
    }, {
      field: 'GBT',
      text: '国标编码',
      weight: 40,
      sortable: true,
      hidden: pageId == 2,
      renderer: function (rowData) {
        if (rowData.GBT == 0) {
          return "<div style='color:blue'>未检测 </div>";
        } else {
          if (rowData.GBT == -1) {
            return "<div style='color:red'>错误 </div>";
          } else {
            return "<div style='color:green'>正确 </div>";
          }
        }
      }
    }, {
      field: 'location',
      text: '经纬度',
      weight: 40,
      sortable: true,
      hidden: pageId == 2,
      renderer: function (rowData) {
        if (rowData.location == 0) {
          return "<div style='color:blue'>未检测 </div>";
        } else {
          if (rowData.location == -1) {
            return "<div style='color:red'>错误 [X:" + rowData.lon + ",Y:"
                + rowData.lat + "]</div>";
          } else {
            return "<div style='color:green'>正确 </div>";
          }
        }
      }
    }, {
      field: 'osd',
      text: 'OSD',
      weight: 40,
      sortable: true,
      hidden: pageId == 2,
      renderer: function (rowData) {
//            	var alink = "alert(\"未采集到图片\");";
//            	if(rowData.imageUrl){
//            		alink = "window.open(\""+rowData.imageUrl+"\", \"_blank\");";
//            	}
//            	var osdErrorInfo = rowData.osdErrorInfo;
//            	if(rowData.osd == 0){
//            		return "<div style='color:blue'><a href='javascript:void(0);' onclick='"+alink+"'>未检测</a></div>";
//            	}else{
//            		if(rowData.osd == -1){
//                		return "<div style='color:red' title='原因："+osdErrorInfo+"'><a href='javascript:void(0);' onclick='"+alink+"'>错误 </a></div>";
//                	}else{
//                		return "<div style='color:green'><a href='javascript:void(0);' onclick='"+alink+"'>正确 </a></div>";
//                	}
//            	}
        var alink = "alert(\"抓取图片失败\");";
        if (rowData.capture && rowData.capture.indexOf("http://") == 0) {
          alink = "window.open(\"" + rowData.capture + "\", \"_blank\");";
        }
        var osdErrorInfo = rowData.osdErrorInfo;
        if (rowData.osd == 0) {
          return "<div style='color:blue'>未检测</div>";
        } else {
          if (rowData.osd == -1) {
            return "<div style='color:red' title='原因：" + osdErrorInfo
                + "'><a href='javascript:void(0);' onclick='" + alink
                + "'>错误 </a></div>";
          } else {
            return "<div style='color:green'>正确</div>";
          }
        }
      }
    }, {
      field: 'time',
      text: '校时',
      weight: 40,
      sortable: true,
      hidden: pageId == 2,
      renderer: function (rowData) {
        var title = "校验时间：" + (rowData.checkOsdTime || "暂无");
        if (rowData.time == 8807590 || rowData.time == -8807590) {
          return "<div style='color:blue' title='" + title + "'>未检测 </div>";
        } else if (rowData.time == 8807591 || rowData.time == -8807591) {
          return "<div style='color:red' title='" + title + "'>登录失败 </div>";
        }
        else if (rowData.time == 8807592 || rowData.time == -8807592) {
          return "<div style='color:red' title='" + title + "'>相差太大 </div>";
        }else if (rowData.time > 40) {
          return "<div style='color:red' title='" + title + "'>错误[相差 : "
              + (rowData.time) + "秒] </div>";
        } else {
          return "<div style='color:green' title='" + title + "'>正确 </div>";
        }
      }
    }, {
      field: 'quality',
      text: '视频质量',
      weight: 40,
      sortable: true,
      hidden: pageId == 2,
      renderer: function (rowData) {
        switch (rowData.quality) {
          case 0:
            return "<div style='color:blue'>未检测 </div>";
          case 1:
            return "<div style='color:green'>正常 </div>";
          case 2:
            return "<div style='color:red'>异常[未达标] </div>";
          case 3:
            return "<div style='color:red'>异常[登录失败] </div>";
          case 4:
            return "<div style='color:red'>异常[取流异常] </div>";
          case 5:
            return "<div style='color:red'>异常[解码失败] </div>";
          case 6:
            return "<div style='color:red'>异常[取流延迟] </div>";
          default:
            return "<div style='color:red'>异常[未知] </div>";
        }
      }
    }, {
      field: 'cmsCascadeInfo',
      text: '下级',
      weight: 40,
      sortable: true,
      renderer: function (rowData) {
        if (rowData.cmsCascadeInfo == 0) {
          return "<div style='color:red'>否 </div>";
        } else {
          return "<div style='color:green'>是 </div>";
        }
      }
    }, {
      field: 'belong',
      text: '来源',
      weight: 40,
      sortable: true
    }, {
      field: 'op',
      text: '操作',
      weight: 40,
      sortable: false,
      renderer: function (rowData) {
        return "<div style='color:green'><a href='javascript:void(0);' class='recheck' orgid='"
            + rowData.orgId + "' indexcode='" + rowData.indexCode
            + "'>重新校验</a> </div>";
      }
    }]
  });

  window.resize = function () {
    var ct = $('#DataGrid'),
        w = ct.width(),
        h = ct.height(),
        n = [0, 1, 2, 3, 4, 5, -1, -2, -3, -4, -5];

    var timer = setInterval(function () {
      ct.width(w + 30 * n[Math.floor(Math.random() * 10)]);
      ct.height(h + 30 * n[Math.floor(Math.random() * 10)]);
      grid.resize();
    }, 500);
    setTimeout(function () {
      clearInterval(timer);
      ct.width(w);
      ct.height(h);
      grid.resize();
    }, 5000);
  };

  $("#search").click(function () {
    grid.load({
      orgId: orgId,
      pageId: pageId,
      condition: $("#condition").val(),
      showPublic: ($("#show_public").is(":checked") ? 1 : 0)
    });
  });
  $("#show_public").change(function () {
    grid.load({
      orgId: orgId,
      pageId: pageId,
      condition: $("#condition").val(),
      showPublic: ($("#show_public").is(":checked") ? 1 : 0)
    });
  });
  $("#DataGrid").on("click", ".recheck", function () {
    var orgId = $(this).attr("orgid");
    var indexCode = $(this).attr("indexcode");
    if (orgId > 0) {
      $.ajax({
        url: path + "/detail/triggerCheck",
        type: 'post',
        data: {orgId: orgId, indexCode: indexCode},
        success: function (result) {
          if (result) {
            jAlert("触发校验失败", 'error');
          } else {
            jAlert("触发校验成功，请稍等片刻，重新刷新界面");
          }
        },
        error: function () {
          jAlert("内部错误", '加载失败！', 'error');
        }
      });
    }
  });
});

var omoaInfo = function (indexCode) {
  if (!indexCode) {
    return;
  }
  $.ajax({
    url: path + "/detail/omoainfo",
    type: 'post',
    data: {indexCode: indexCode},
    success: function (result) {
      var omoa = {};
      if (result && result.omoa) {
        omoa = result.omoa;
      }
      $('#omoaInfoDialog .index_code').html(
          omoa.index_code || "<p style='color:red'>未填写</p>");
      $('#omoaInfoDialog .device_name').html(
          omoa.device_name || "<p style='color:red'>未填写</p>");
      $('#omoaInfoDialog .brand').html(
          omoa.brand || "<p style='color:red'>未填写</p>");
      $('#omoaInfoDialog .city_code').html(
          omoa.city_code || "<p style='color:red'>未填写</p>");
      $('#omoaInfoDialog .camera_type').html(
          omoa.camera_type || "<p style='color:red'>未填写</p>");
      $('#omoaInfoDialog .address').html(
          omoa.address || "<p style='color:red'>未填写</p>");
      $('#omoaInfoDialog .lon').html(
          omoa.lon || "<p style='color:red'>未填写</p>");
      $('#omoaInfoDialog .lat').html(
          omoa.lat || "<p style='color:red'>未填写</p>");
      $('#omoaInfoDialog .address_type').html(
          omoa.address_type || "<p style='color:red'>未填写</p>");
      $('#omoaInfoDialog .network').html(
          omoa.network || "<p style='color:red'>未填写</p>");
      $('#omoaInfoDialog .orgname').html(
          omoa.orgname || "<p style='color:red'>未填写</p>");
      $('#omoaInfoDialog .install_time').html(
          omoa.install_time || "<p style='color:red'>未填写</p>");
      $('#omoaInfoDialog .manage_org_name').html(
          omoa.manage_org_name || "<p style='color:red'>未填写</p>");
      $('#omoaInfoDialog .manage_org_tel').html(
          omoa.manage_org_tel || "<p style='color:red'>未填写</p>");
      $('#omoaInfoDialog .record_time').html(
          omoa.record_time || "<p style='color:red'>未填写</p>");
      $('#omoaInfoDialog .device_status').html(
          omoa.device_status || "<p style='color:red'>未填写</p>");
    },
    error: function () {
      jAlert("内部错误", '加载失败！', 'error');
    }
  });
  var dialog = $('#omoaInfoDialog').dialog(
      {
        autoOpen: true,
        modal: true,
        width: 420,
        height: 500,
        draggable: true,
        resizable: false,
        buttons: {
          "cancel": {
            text: '关闭',
            'class': 'button button-cancel',
            click: function () {
              dialog.dialog("close");
            }
          }
        }
      });
}
