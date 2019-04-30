$(function () {

  var jobTable = $("#push_list").dataTable({
    "deferRender": true,
    "processing": true,
    "serverSide": true,
    "ajax": {
      url: base_url + "/pushadmin/pageList",
      type: "post",
      data: function (d) {
        var obj = {};
        obj.offset = d.start;
        obj.pagesize = d.length;
        return obj;
      }
    },
    "searching": false,
    "ordering": false,
    //"scrollX": true,	// scroll x，close self-adaption
    "columns": [
      {
        "data": 'indexCode',
        "bSortable": false,
        "visible": true,
        "width": '40%'
      },
      {
        "data": 'name',
        "bSortable": false,
        "visible": true,
        "width": '40%'
      },
      {
        "data": "",
        "width": '20%',
        "render": function (data, type, row) {
          return function () {
            var indexCode = row.indexCode;
            var html = '<button class="btn btn-danger btn-xs job_operate" _type="job_del" type="button" indexCode="'
                + indexCode + '">删除</button>';
            return html;
          };
        }
      }
    ],
    "language": {
      "sProcessing": I18n.dataTable_sProcessing,
      "sLengthMenu": I18n.dataTable_sLengthMenu,
      "sZeroRecords": I18n.dataTable_sZeroRecords,
      "sInfo": I18n.dataTable_sInfo,
      "sInfoEmpty": I18n.dataTable_sInfoEmpty,
      "sInfoFiltered": I18n.dataTable_sInfoFiltered,
      "sInfoPostFix": "",
      "sSearch": I18n.dataTable_sSearch,
      "sUrl": "",
      "sEmptyTable": I18n.dataTable_sEmptyTable,
      "sLoadingRecords": I18n.dataTable_sLoadingRecords,
      "sInfoThousands": ",",
      "oPaginate": {
        "sFirst": I18n.dataTable_sFirst,
        "sPrevious": I18n.dataTable_sPrevious,
        "sNext": I18n.dataTable_sNext,
        "sLast": I18n.dataTable_sLast
      },
      "oAria": {
        "sSortAscending": I18n.dataTable_sSortAscending,
        "sSortDescending": I18n.dataTable_sSortDescending
      }
    }
  });

  // job operate
  $("#push_list").on('click', '.job_operate', function () {
    var indexCode = $(this).attr("indexCode");
    layer.confirm(I18n.system_ok + "删除" + '?', {
      icon: 3,
      title: I18n.system_tips,
      btn: [I18n.system_ok, I18n.system_cancel]
    }, function (index) {
      layer.close(index);

      $.ajax({
        type: 'POST',
        url: base_url + "/pushadmin/remove",
        data: {
          "indexCode": indexCode
        },
        dataType: "json",
        success: function (data) {
          if (data.code == 200) {

            layer.open({
              title: I18n.system_tips,
              btn: [I18n.system_ok],
              content: typeName + I18n.system_success,
              icon: '1',
              end: function (layero, index) {
                if (needFresh) {
                  //window.location.reload();
                  jobTable.fnDraw();
                }
              }
            });
          } else {
            layer.open({
              title: I18n.system_tips,
              btn: [I18n.system_ok],
              content: (data.msg || typeName + I18n.system_fail),
              icon: '2'
            });
          }
        },
      });
    });
  });

  $('#AddFileBtn').on('change', function () {
    $('#AddFileBtn .formTarget').remove();
    var $newIframe = $(
        '<iframe class="formTarget" name="formTarget" src="about:blank" style="display:none;"></iframe>');
    $newIframe.appendTo('#AddFileBtn');
    $newIframe.on('load', function () {
      var result = $($('#AddFileBtn .formTarget')[0].contentDocument).text();
      result = eval("(" + result + ")");
      if (result.success) {
        alert("导入成功");
      } else if (result.message) {
        alert(result.message);
      }
      $('#file').remove();
      var $file = $(
          '<input type="file" id="file" name="file" style="display:inline;">');
      $('#uploadForm').append($file);

      jobTable.fnDraw();
    });

    document.forms["uploadForm"].submit();
  });
});
