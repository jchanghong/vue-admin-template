var datagrid = null;
$(document).ready(function () {
  $('.modify-setting').click(function () {
    window.location.href = path + "/jobinfo";
  });
  $('.logout').click(function () {
    $.ajax({
      url: path + "/logout",
      type: 'post',
      success: function (result) {
        window.location.href = path;
      },
      error: function () {
        jAlert("内部错误", '退出失败！', 'error');
      }
    });
  });

  //修改密码
  $('.modify-password').click(function () {
    var dialog = $('#editPasswDialog').dialog(
        {
          autoOpen: true,
          modal: true,
          width: 420,
          height: 200,
          draggable: true,
          resizable: false,
          buttons: {
            "ok": {
              text: '确认', 'class': 'button button-minor',
              click: function () {
                if (!$("#eold_loginpassword").validate() || !$(
                    "#e_loginpassword").validate()) {
                  $.sticky('请按要求填写！', 'error', {position: 'center-center'});
                  return;
                }
                var oldpassw = $("#eold_loginpassword").val();
                var passw = $("#e_loginpassword").val();

                $.ajax({
                  url: path + "/manage/editPassw",
                  data: {
                    oldpassw: oldpassw,
                    passw: passw
                  },
                  success: function (
                      result) {
                    if (result.success) {
                      $.sticky('修改成功！', 'ok',
                          {
                            position: 'center-center'
                          });
                      dialog.dialog("close");

                    } else {
                      jAlert(result.message, '修改失败！', 'error');
                    }
                  },
                  error: function () {
                    jAlert("内部错误", '保存失败！', 'error');
                  }
                });
              }
            },
            "cancel": {
              text: '取消',
              'class': 'button button-cancel',
              click: function () {
                dialog.dialog("close");
              }
            }
          }
        });
  });

  $('.pk-nav').pkNav();
  var height = $(document).height() - 100;

  var fields = [
    {
      field: '_serial',
      weight: 10
    },
    {
      field: 'orgName',
      text: '地区',
      weight: 20
    },
    {
      field: 'orgId',
      text: 'ID',
      weight: 8
    },
    {
      field: 'version',
      text: '版本',
      weight: 20,
      align: 'left',
      renderer: function (rowData) {
        var version = rowData.version;
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
      }
    },
    {
      field: 'onlineCount',
      text: '在线数 / 总数',
      weight: 20,
      align: 'left',
      renderer: function (rowData) {
        var id = rowData.orgId;
        var onlineCount = rowData.onlineCount;
        var count = rowData.itemcount;
        var div = "<a href=\""
            + path
            + "/detail/page?page=0&id="
            + id
            + "\" title='点击查看'  target='_blank' >"
            + onlineCount + " / "
            + count + "</a>";
        return div;
      }
    },
    {
      field: 'selfCount',
      text: '<div style="font-size:14px;line-height:17px">&nbsp;&nbsp;&nbsp;&nbsp;应指</div><div style="font-size:12px;line-height:15px">(在线数 / 总数)</div>',
      weight: 20,
      align: 'left',
      renderer: function (rowData) {
        return rowData.selfOnlineCount + " / " + rowData.selfCount;
      }
    },
    {
      field: 'erroritems',
      text: '<div style="font-size:14px;line-height:17px" title="校验项目：在线状态、一机一档、国标编码、经纬度、校时、osd、视频质量">&nbsp;&nbsp;应指</div><div style="font-size:12px;line-height:15px">(不合格数)</div>',
      weight: 15,
      align: 'left',
      renderer: function (rowData) {
        var id = rowData.orgId;
        var count = rowData.erroritems;
        var div = "<a href=\""
            + path
            + "/detail/page?page=1&id="
            + id
            + "\" title='点击查看' target='_blank' >"
            + count + "</a>";
        return div;
      }
    },
    {
      field: 'nomalCount',
      text: '<div style="font-size:14px;line-height:17px" title="校验项目：在线状态、一机一档、国标编码、经纬度、校时、osd、视频质量">&nbsp;&nbsp;应指</div><div style="font-size:12px;line-height:15px">(合格总数)</div>',
      weight: 15,
      align: 'left'
    },
    {
      field: 'thirdCount',
      text: '<div style="font-size:14px;line-height:17px">&nbsp;&nbsp;&nbsp;&nbsp;其它</div><div style="font-size:12px;line-height:15px">(在线数 / 总数)</div>',
      weight: 20,
      align: 'left',
      renderer: function (rowData) {
        return rowData.thirdOnlineCount + " / " + rowData.thirdCount;
      }
    },
    {
      field: 'third_erroritems',
      text: '<div style="font-size:14px;line-height:17px" title="校验项目：在线状态、经纬度">&nbsp;&nbsp;其它</div><div style="font-size:12px;line-height:15px">(不合格数)</div>',
      weight: 15,
      align: 'left',
      renderer: function (rowData) {
        var id = rowData.orgId;
        var count = rowData.third_erroritems;
        var div = "<a href=\""
            + path
            + "/detail/page?page=2&id="
            + id
            + "\" title='点击查看' target='_blank' >"
            + count + "</a>";
        return div;
      }
    },
    {
      field: 'third_nomalCount',
      text: '<div style="font-size:14px;line-height:17px" title="校验项目：在线状态、经纬度">&nbsp;&nbsp;其它</div><div style="font-size:12px;line-height:15px">(合格总数)</div>',
      weight: 15,
      align: 'left'
    },
    {
      field: 'pushCount',
      text: '推送公安部总数',
      weight: 20,
      align: 'left'
    },
    {
      field: 'jobtimes',
      text: '考核时间',
      weight: 20,
      align: 'left'
    },
    {
      field: 'parentId',
      text: '配置',
      weight: 15,
      halign: 'right',
      align: 'right',
      renderer: function (rowData) {

        var id = rowData.orgId;
        var div = "<a href=\"javascript:edit("
            + id
            + ")\" title='修改数据库连接' ><i class=\"icon14-12 i-list\"></i></a>";
        div += "&nbsp;&nbsp;<a href=\"javascript:openExcelTemplate(" + id
            + ")\" title='编辑雪亮工程统计数据'><i class=\"icon14 i-list\"></i></a>";
        div += "&nbsp;&nbsp;<a href=\"javascript:del()\" title='删除该区县' ><i class=\"icon16 i-delete\"></i></a>";
        return div;
      }
    }];
  if (!isAdmin) {
    fields.pop();
  }
  datagrid = new pk.GridTree(
      {
        el: $('#DataGrid'),
        url: path + '/manage',
        idField: 'orgId',
        treeField: 'orgName',
        fitable: false,
        height: height,
        singleSelect: false,
        fields: fields,
        onBeforeExpand: function (row) {
          // TODO
        },
        onLoadSuccess: function () {
          // TODO

        }
      });
});

function openExcelTemplate(id) {
  window.open(path + "/xueliang/getpage?id=" + id, "_blank");
}

var add = function (id) {
  $("#orgname").empty();
  $("#platversion").val(1);
  $("#dburl").val('');
  $("#dbuser").val('');
  $("#dbpassword").val('');
  $
  .ajax({
    url: path + "/manage/loadcascade",
    data: {
      orgId: id
    },
    success: function (result) {
      if (result.success) {

        var chirldren = result.cascade;

        if (chirldren.length == 0) {
          jAlert("没有下级平台", '添加失败！', 'error');
          return;
        }
        for (var i = 0; i < chirldren.length; i++) {
          if (!chirldren[i].added) {
            $("#orgname").append(
                "<option value='" + chirldren[i].id
                + "'>" + chirldren[i].name
                + "</option>");
          }
        }

        var dialog = $('#addOrgDialog')
        .dialog(
            {
              autoOpen: true,
              modal: true,
              width: 620,
              height: 450,
              draggable: true,
              resizable: false,
              buttons: {
                "ok": {
                  text: '确认',
                  'class': 'button button-minor',
                  click: function () {
                    if (!$("#dburl")
                        .validate()
                        || !$("#dbuser")
                        .validate()
                        || !$(
                            "#dbpassword")
                        .validate()) {
                      $
                      .sticky(
                          '请按要求填写！',
                          'error',
                          {
                            position: 'center-center'
                          });
                      return;
                    }
                    var orgCaseId = $(
                        "#orgname")
                    .val();
                    var orgName = $(
                        "#orgname")
                    .find(
                        "option:selected")
                    .text();
                    var platType = $(
                        "#platversion")
                    .val();
                    var dburl = $("#dburl")
                    .val();
                    var dbuser = $(
                        "#dbuser")
                    .val();
                    var dbpassword = $(
                        "#dbpassword")
                    .val();
                    $
                    .ajax({
                      url: path + "/manage/add",
                      data: {
                        parentId: id,
                        orgCaseId: orgCaseId,
                        orgName: orgName,
                        platType: platType,
                        dburl: dburl,
                        dbuser: dbuser,
                        dbpassword: dbpassword
                      },
                      success: function (
                          result) {
                        if (result.success) {
                          $
                          .sticky(
                              '添加成功！',
                              'ok',
                              {
                                position: 'center-center'
                              });
                          dialog
                          .dialog("close");
                          datagrid
                          .reload();
                        } else {
                          jAlert(
                              result.message,
                              '保存失败！',
                              'error');
                        }
                      },
                      error: function () {
                        jAlert(
                            "内部错误",
                            '保存失败！',
                            'error');
                      }
                    });
                  }
                },
                "cancel": {
                  text: '取消',
                  'class': 'button button-cancel',
                  click: function () {
                    dialog.dialog("close");
                  }
                }
              }
            });
      } else {
        jAlert(result.message, '加载信息失败！', 'error');
      }
    },
    error: function () {
      jAlert("内部错误", '加载信息失败！', 'error');
    }
  });

};
var refresh = function () {
  datagrid.reload();
};

var edit = function (id) {
  $("#e_orgname").empty();
  $
  .ajax({
    url: path + "/manage/loadcascade",
    data: {
      orgId: id
    },
    success: function (result) {
      if (result.success) {

        var chirldren = result.cascade;

        if (chirldren.length == 0) {
          jAlert("没有下级平台", '获取失败！', 'error');
          // return;
        }
        if (id == 1) {
          $("#e_orgname").append(
              "<option value='-1'>市局</option>");
        } else {
          for (var i = 0; i < chirldren.length; i++) {
            $("#e_orgname").append(
                "<option value='" + chirldren[i].id
                + "'>" + chirldren[i].name
                + "</option>");
          }
        }

        var data = result.data;
        var cmsCascadeId = data.cmsCascadeId ? data.cmsCascadeId
            : 0;
        $("#e_orgname").val(cmsCascadeId);
        $("#e_platversion").val(data.dbType);
        $("#e_dburl").val(data.dburl);
        $("#e_dbuser").val(data.dbuser);
        $("#e_dbpassword").val('');
        var dialog = $('#editOrgDialog')
        .dialog(
            {
              autoOpen: true,
              modal: true,
              width: 620,
              height: 450,
              draggable: true,
              resizable: false,
              buttons: {
                "ok": {
                  text: '确认',
                  'class': 'button button-minor',
                  click: function () {
                    if (!$("#e_orgname")
                        .validate()
                        || !$(
                            "#e_dburl")
                        .validate()
                        || !$(
                            "#e_dbuser")
                        .validate()) {
                      $
                      .sticky(
                          '请按要求填写！',
                          'error',
                          {
                            position: 'center-center'
                          });
                      return;
                    }

                    var orgCaseId = $(
                        "#e_orgname")
                    .val();
                    var orgName = $(
                        "#e_orgname")
                    .find(
                        "option:selected")
                    .text();
                    var platType = $(
                        "#e_platversion")
                    .val();
                    var dburl = $(
                        "#e_dburl")
                    .val();
                    var dbuser = $(
                        "#e_dbuser")
                    .val();
                    var dbpassword = $(
                        "#e_dbpassword")
                    .val();
                    $
                    .ajax({
                      url: path + "/manage/edit",
                      data: {
                        orgId: id,
                        orgName: orgName,
                        platType: platType,
                        dburl: dburl,
                        dbuser: dbuser,
                        dbpassword: dbpassword,
                        orgCaseId: orgCaseId
                      },
                      success: function (
                          result) {
                        if (result.success) {
                          $
                          .sticky(
                              '编辑成功！',
                              'ok',
                              {
                                position: 'center-center'
                              });
                          dialog
                          .dialog("close");
                          datagrid
                          .reload();
                        } else {
                          jAlert(
                              result.message,
                              '编辑失败！',
                              'error');
                        }
                      },
                      error: function () {
                        jAlert(
                            "内部错误",
                            '编辑失败！',
                            'error');
                      }
                    });
                  }
                },
                "cancel": {
                  text: '取消',
                  'class': 'button button-cancel',
                  click: function () {
                    dialog.dialog("close");
                  }
                }
              }
            });

      } else {
        jAlert(result.message, '加载信息失败！', 'error');
      }
    },
    error: function () {
      jAlert("内部错误", '加载信息失败！', 'error');
    }
  });

};

var historyPage = function () {
  window.open(path + "/manage/history", "_blank");
};
