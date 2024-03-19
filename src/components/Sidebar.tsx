import { useEffect, useState } from 'react';
import { Doc } from '@blocksuite/store';
import { useEditor } from '../editor/context';
import { AffineEditorContainer } from '@blocksuite/presets';

const Sidebar = () => {
  const { collection, editor, mode } = useEditor()!;
  const [docs, setDocs] = useState<Doc[]>([]);

  useEffect(() => {
    if (!collection || !editor) return;
    const updateDocs = () => {
      setDocs([...collection.docs.values()]);
    };
    updateDocs();

    const disposable = [
      collection.slots.docUpdated.on(updateDocs),
    ].concat(mode === 'default' ? [(editor as AffineEditorContainer).slots.docLinkClicked.on(updateDocs)]: []);

    return () => disposable.forEach(d => d.dispose());
  }, [collection, editor]);

  return (
    <div className="sidebar">
      <div className="header">All Docs</div>
      <div className="doc-list">
        {docs.map(doc => (
          <div
            className={`doc-item ${editor?.doc === doc ? 'active' : ''}`}
            key={doc.id}
            onClick={() => {
              if (editor) editor.doc = doc;
              setDocs([...collection!.docs.values()]);
            }}
          >
            {doc.meta?.title || 'Untitled'}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
