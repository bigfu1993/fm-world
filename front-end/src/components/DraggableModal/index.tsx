import { Modal } from 'antd';
import type { ModalProps } from 'antd';
import { createContext } from 'react';
import type { CSSProperties, PointerEvent as ReactPointerEvent } from 'react';
import LanguageLabel from '@/components/LanguageLabel';
import { selectCurrentLanguage, useAuthStore } from '@/store/useAuthStore';
import './index.css';

const DEFAULT_MODAL_THEME_COLOR = '#1677ff';
const DraggableModalThemeContext = createContext(DEFAULT_MODAL_THEME_COLOR);

const getModalOkButtonStyle = (themeColor: string): CSSProperties => ({
  backgroundColor: themeColor,
  borderColor: themeColor,
  color: '#fff',
});

interface DragPosition {
  x: number;
  y: number;
}

interface DragState {
  startX: number;
  startY: number;
  startPosition: DragPosition;
}

interface DraggableModalProps extends ModalProps {
  themeColor?: string;
}

export default function DraggableModal({
  afterClose,
  cancelText,
  modalRender,
  okButtonProps,
  okText,
  themeColor,
  ...modalProps
}: DraggableModalProps) {
  const language = useAuthStore(selectCurrentLanguage);
  const inheritedThemeColor = useContext(DraggableModalThemeContext);
  const modalThemeColor = themeColor ?? inheritedThemeColor;
  const [position, setPosition] = useState<DragPosition>({ x: 0, y: 0 });
  const dragStateRef = useRef<DragState | null>(null);

  const stopDragging = () => {
    dragStateRef.current = null;
    window.removeEventListener('pointermove', handlePointerMove);
    window.removeEventListener('pointerup', stopDragging);
  };

  const handlePointerMove = (event: PointerEvent) => {
    const dragState = dragStateRef.current;
    if (!dragState) return;
    setPosition({
      x:
        dragState.startPosition.x +
        event.clientX -
        dragState.startX,
      y:
        dragState.startPosition.y +
        event.clientY -
        dragState.startY,
    });
  };

  const startDragging = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    const target = event.target as HTMLElement;
    if (!target.closest('.ant-modal-header') || target.closest('.ant-modal-close')) {
      return;
    }
    event.preventDefault();
    dragStateRef.current = {
      startX: event.clientX,
      startY: event.clientY,
      startPosition: position,
    };
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', stopDragging);
  };

  useEffect(() => stopDragging, []);

  const handleAfterClose = () => {
    setPosition({ x: 0, y: 0 });
    afterClose?.();
  };

  return (
    <Modal
      {...modalProps}
      mask={false}
      closable={false}
      afterClose={handleAfterClose}
      okText={
        okText ?? <LanguageLabel langKey={language} labelKey="confirm" />
      }
      cancelText={
        cancelText ?? <LanguageLabel langKey={language} labelKey="cancel" />
      }
      okButtonProps={{
        ...okButtonProps,
        style: {
          ...okButtonProps?.style,
          ...getModalOkButtonStyle(modalThemeColor),
        },
      }}
      modalRender={(node) => (
        <DraggableModalThemeContext.Provider
          value={modalThemeColor}
        >
          <div
            className="draggable-modal-panel"
            onPointerDown={startDragging}
            style={{
              '--draggable-modal-theme-color': modalThemeColor,
              transform: `translate(${position.x}px, ${position.y}px)`,
            } as CSSProperties}
          >
            {modalRender ? modalRender(node) : node}
          </div>
        </DraggableModalThemeContext.Provider>
      )}
    />
  );
}
