'use client';

import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, X } from 'lucide-react';
import { colors } from '../../tokens/colors';
import { typography } from '../../tokens/typography';
import { radius } from '../../tokens/radius';

export interface FilePickerFile {
  file: File;
  id: string;
  preview?: string;
}

export interface FilePickerProps {
  value?: FilePickerFile[];
  onChange?: (files: FilePickerFile[]) => void;
  accept?: string;
  multiple?: boolean;
  maxSize?: number;
  maxFiles?: number;
  disabled?: boolean;
  capture?: 'user' | 'environment';
  style?: React.CSSProperties;
}

let _id = 0;
const makeId = () => { return `fp-${++_id}`; }

const formatSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

export const FilePicker = ({ value = [], onChange, accept, multiple = true, maxSize, maxFiles, disabled, capture, style }: FilePickerProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addFiles = (raw: File[]) => {
    setError(null);
    let files = raw;
    if (maxSize) {
      const oversized = files.filter((f) => f.size > maxSize);
      if (oversized.length) { setError(`파일 크기 초과: ${oversized.map((f) => f.name).join(', ')}`); files = files.filter((f) => f.size <= maxSize); }
    }
    const newEntries: FilePickerFile[] = files.map((f) => ({
      id: makeId(),
      file: f,
      preview: f.type.startsWith('image/') ? URL.createObjectURL(f) : undefined,
    }));
    const merged = multiple ? [...value, ...newEntries] : [newEntries[0]].filter(Boolean);
    const limited = maxFiles ? merged.slice(0, maxFiles) : merged;
    onChange?.(limited as FilePickerFile[]);
  };

  const removeFile = (id: string) => {
    const file = value.find((f) => f.id === id);
    if (file?.preview) URL.revokeObjectURL(file.preview);
    onChange?.(value.filter((f) => f.id !== id));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) addFiles(Array.from(e.target.files));
    e.target.value = '';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    if (disabled) return;
    addFiles(Array.from(e.dataTransfer.files));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, ...style }}>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        capture={capture}
        style={{ display: 'none' }}
        onChange={handleInputChange}
        disabled={disabled}
      />

      <motion.div
        style={{
          ...styles.dropzone,
          ...(dragging && styles.dropzoneDragging),
          ...(disabled && styles.dropzoneDisabled),
        }}
        onClick={() => !disabled && inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); if (!disabled) setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        whileHover={disabled ? {} : { borderColor: colors.primary.DEFAULT }}
      >
        <motion.span
          style={{ color: dragging ? colors.primary.DEFAULT : colors.text.dim, display: 'flex' }}
          animate={{ y: dragging ? -4 : 0 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
        >
          <Upload size={28} />
        </motion.span>
        <span style={styles.dropLabel}>
          {dragging ? '여기에 놓기' : '클릭하거나 파일을 드래그하세요'}
        </span>
        {accept && <span style={styles.dropHint}>{accept}</span>}
        {maxSize && <span style={styles.dropHint}>최대 {formatSize(maxSize)}</span>}
      </motion.div>

      {error && (
        <motion.span
          style={styles.errorText}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {error}
        </motion.span>
      )}

      <AnimatePresence>
        {value.length > 0 && (
          <motion.div
            style={styles.fileList}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            {value.map(({ id, file, preview }) => (
              <motion.div
                key={id}
                style={styles.fileItem}
                layout
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10, height: 0, marginBottom: 0 }}
                transition={{ duration: 0.2 }}
              >
                {preview ? (
                  <img src={preview} alt={file.name} style={styles.preview} />
                ) : (
                  <div style={styles.fileIcon}><FileText size={18} /></div>
                )}
                <div style={styles.fileInfo}>
                  <span style={styles.fileName}>{file.name}</span>
                  <span style={styles.fileSize}>{formatSize(file.size)}</span>
                </div>
                <motion.button
                  type="button"
                  style={styles.removeBtn}
                  whileHover={{ background: colors.danger.muted, opacity: 0.8 }}
                  onClick={() => removeFile(id)}
                >
                  <X size={13} />
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}



const styles: Record<string, React.CSSProperties> = {
  dropzone: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: 24,
    background: colors.surface[2],
    border: `2px dashed ${colors.border.DEFAULT}`,
    borderRadius: radius.lg,
    cursor: 'pointer',
    transition: 'border-color 0.15s ease, background 0.15s ease',
    userSelect: 'none',
  },
  dropzoneDragging: {
    borderColor: colors.primary.DEFAULT,
    background: colors.primary.muted,
  },
  dropzoneDisabled: {
    opacity: 0.45,
    cursor: 'not-allowed',
    pointerEvents: 'none',
  },
  dropLabel: {
    fontSize: typography.fontSize.md,
    color: colors.text.sub,
    fontFamily: typography.fontFamily.sans,
    fontWeight: typography.fontWeight.medium,
  },
  dropHint: {
    fontSize: typography.fontSize.xs,
    color: colors.text.dim,
    fontFamily: typography.fontFamily.sans,
  },
  errorText: {
    fontSize: typography.fontSize.xs,
    color: colors.danger.DEFAULT,
    fontFamily: typography.fontFamily.sans,
  },
  fileList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
    overflow: 'hidden',
  },
  fileItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '8px 12px',
    background: colors.surface[2],
    borderRadius: radius.md,
    border: `1px solid ${colors.border.sub}`,
  },
  preview: {
    width: 36,
    height: 36,
    objectFit: 'cover',
    borderRadius: radius.sm,
    flexShrink: 0,
  },
  fileIcon: {
    width: 36,
    height: 36,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: colors.surface[3],
    borderRadius: radius.sm,
    color: colors.text.dim,
    flexShrink: 0,
  },
  fileInfo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    minWidth: 0,
  },
  fileName: {
    fontSize: typography.fontSize.sm,
    color: colors.text.DEFAULT,
    fontFamily: typography.fontFamily.sans,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  fileSize: {
    fontSize: typography.fontSize.xs,
    color: colors.text.dim,
    fontFamily: typography.fontFamily.sans,
  },
  removeBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 28,
    height: 28,
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: colors.text.dim,
    borderRadius: radius.sm,
    flexShrink: 0,
    transition: 'background 0.15s ease',
    padding: 0,
  },
};
