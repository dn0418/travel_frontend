import dynamic from 'next/dynamic';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File

const SunEditor = dynamic(() => import('suneditor-react'), {
  ssr: false,
});

const TextEditor = ({ text, onChange }: any) => {

  return (
    <>
      <SunEditor
        placeholder="Please type here..."
        onChange={onChange}
        setOptions={{
          minHeight: '220px',
          maxHeight: '320px',
          font: [
            '"Open Sans"',
            '"Tiro Bangla"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            '"Noto Sans"',
          ],
          buttonList: [
            [
              'bold',
              'underline',
              'italic',
              'strike',
              'subscript',
              'superscript',
            ],
            ['font', 'fontSize', 'formatBlock'],
            [
              'paragraphStyle',
              'blockquote',
              'list',
              'table',
              'horizontalRule',
              'link',
              'image',
            ],
            [
              'outdent',
              'indent',
              'fontColor',
              'hiliteColor',
              'textStyle',
              'align',
              'lineHeight',
            ],
            ['fullScreen', 'showBlocks', 'codeView'],
            ['removeFormat', 'undo', 'redo'],
          ],
        }}
        setContents={text}
      />
    </>
  );
};
export default TextEditor;