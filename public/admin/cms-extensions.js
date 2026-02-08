/**
 * Decap CMS 扩展：正文中可插入「下划线」「彩色文字」「指定字体」
 * 在编辑器中通过「添加组件」插入，会写入对应 HTML，站点渲染时会保留。
 */
(function () {
  if (typeof window.CMS === 'undefined') return;

  // 下划线
  window.CMS.registerEditorComponent({
    id: 'underline',
    label: '下划线',
    fields: [{ name: 'content', label: '文字', widget: 'text' }],
    pattern: /<u>([\s\S]*?)<\/u>/,
    fromBlock: function (match) {
      return { content: match[1] };
    },
    toBlock: function (data) {
      return '<u>' + (data.content || '') + '</u>';
    },
    toPreview: function (data) {
      return '<u>' + (data.content || '') + '</u>';
    },
  });

  // 彩色文字
  window.CMS.registerEditorComponent({
    id: 'color',
    label: '彩色文字',
    fields: [
      {
        name: 'color',
        label: '颜色',
        widget: 'select',
        options: [
          { label: '红色', value: '#c00' },
          { label: '蓝色', value: '#06c' },
          { label: '绿色', value: '#080' },
          { label: '灰色', value: '#666' },
          { label: '黑色', value: '#1c1917' },
        ],
      },
      { name: 'content', label: '文字', widget: 'text' },
    ],
    pattern: /<span style="color:\s*([^"]+)">([\s\S]*?)<\/span>/,
    fromBlock: function (match) {
      return { color: match[1], content: match[2] };
    },
    toBlock: function (data) {
      return '<span style="color: ' + (data.color || '#c00') + '">' + (data.content || '') + '</span>';
    },
    toPreview: function (data) {
      return '<span style="color: ' + (data.color || '#c00') + '">' + (data.content || '') + '</span>';
    },
  });

  // 指定字体
  window.CMS.registerEditorComponent({
    id: 'font',
    label: '指定字体',
    fields: [
      { name: 'font', label: '字体名称（如：Libre Baskerville、宋体）', widget: 'string' },
      { name: 'content', label: '文字', widget: 'text' },
    ],
    pattern: /<span style="font-family:\s*[^"]+">([\s\S]*?)<\/span>/,
    fromBlock: function (match) {
      var styleMatch = (match[0] || '').match(/font-family:\s*['"]?([^'"]+)['"]?/);
      return { font: styleMatch ? styleMatch[1].trim() : '', content: match[1] };
    },
    toBlock: function (data) {
      var font = (data.font || '').trim() || 'inherit';
      var quoted = font.indexOf(' ') >= 0 ? "'" + font.replace(/'/g, "\\'") + "'" : font;
      return '<span style="font-family: ' + quoted + '">' + (data.content || '') + '</span>';
    },
    toPreview: function (data) {
      var font = (data.font || '').trim() || 'inherit';
      var quoted = font.indexOf(' ') >= 0 ? "'" + font.replace(/'/g, "\\'") + "'" : font;
      return '<span style="font-family: ' + quoted + '">' + (data.content || '') + '</span>';
    },
  });
})();
