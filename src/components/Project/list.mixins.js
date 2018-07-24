export default {
  data() {
    return {
      pageNumber: 1,
      pageSize: 10,
      protocols: [{
        value: 1,
        name: 'http',
      },
      {
        value: 2,
        name: 'https',
      },
      {
        value: 3,
        name: '//',
      },
      ],
      columns: [{
        title: '项目名称',
        key: 'name',
        align: 'center',
      },
      {
        title: '路径',
        key: 'url',
        align: 'center',
      },
      {
        title: '协议',
        key: 'protocol',
        align: 'center',
        render(h, {
          row,
          column,
          index
        }) {
          console.log(row, column, index);
          const value = row[column.key];
          let text = '';
          switch (value) {
            case 1:
              text = 'http';
              break;
            case 2:
              text = 'https';
              break;
            default:
              text = '//';
              break;
          }
          return h('span', text);
        }
      },
      {
        title: '版本',
        key: 'version',
        align: 'center',
      },
      {
        title: '描述',
        key: 'description',
        align: 'center',
      },
      {
        title: '状态',
        key: 'status',
        align: 'center',
      },
      {
        title: '创建时间',
        key: 'createTime',
        align: 'center',
      },
      {
        title: '更新时间',
        key: 'updateTime',
        align: 'center',
      },
      ]
    };
  },
};
