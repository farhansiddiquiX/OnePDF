import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import './PdfMerger.css';

import {
  DndContext,
  closestCenter,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FaGripLines, FaTimes } from 'react-icons/fa';

export default function PdfMerger() {
  const [files, setFiles] = useState([]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor)
  );

  const onFilesAdded = (e) => {
    const selected = Array.from(e.target.files)
      .filter((f) => f.type === 'application/pdf')
      .map((f) => ({ file: f, id: crypto.randomUUID() }));
    setFiles((prev) => [...prev, ...selected]);
  };

  const onDrop = (e) => {
    e.preventDefault();
    const dropped = Array.from(e.dataTransfer.files)
      .filter((f) => f.type === 'application/pdf')
      .map((f) => ({ file: f, id: crypto.randomUUID() }));
    setFiles((prev) => [...prev, ...dropped]);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) return;
    const oldIndex = files.findIndex((item) => item.id === active.id);
    const newIndex = files.findIndex((item) => item.id === over.id);
    if (oldIndex !== -1 && newIndex !== -1) {
      setFiles((files) => arrayMove(files, oldIndex, newIndex));
    }
  };

  const handleRemove = (id) => {
    setFiles((prev) => prev.filter((item) => item.id !== id));
  };

  const mergeAndDownload = async () => {
    if (files.length < 2) return alert('Select at least 2 PDFs');

    try {
      const merged = await PDFDocument.create();
      for (let { file } of files) {
        const buf = await file.arrayBuffer();
        const doc = await PDFDocument.load(buf);
        const pages = await merged.copyPages(doc, doc.getPageIndices());
        pages.forEach((p) => merged.addPage(p));
      }
      const bytes = await merged.save();
      const blob = new Blob([bytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = 'merged.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      setTimeout(() => {
        window.open(url, '_blank');
        URL.revokeObjectURL(url);
      }, 500);
    } catch (error) {
      alert('Failed to merge. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className="pdf-merger">
      <h2>OnePDF - Merge PDFs Easily</h2>
      <div
        className="drop-zone"
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDrop}
      >
        Drag & drop PDFs here, or{' '}
        <label className="file-label">
          browse
          <input
            type="file"
            accept="application/pdf"
            multiple
            onChange={onFilesAdded}
          />
        </label>
      </div>

      {files.length > 0 && (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={files.map((file) => file.id)}
            strategy={verticalListSortingStrategy}
          >
            <ul className="file-list">
              {files.map((item) => (
                <SortableItem
                  key={item.id}
                  item={item}
                  onRemove={() => handleRemove(item.id)}
                />
              ))}
            </ul>
          </SortableContext>
        </DndContext>
      )}

      <button
        className="merge-btn"
        onClick={mergeAndDownload}
        disabled={files.length < 2}
      >
        Merge PDFs
      </button>
    </div>
  );
}

function SortableItem({ item, onRemove }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    background: '#f9f9f9',
    marginBottom: '8px',
    cursor: 'grab',
  };

  return (
    <li ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <FaGripLines style={{ marginRight: '8px', color: '#555' }} />
        <span className="file-name">{item.file.name}</span>
      </div>
      <button onClick={onRemove} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
        <FaTimes color="#e74c3c" size={18} />
      </button>
    </li>
  );
}
