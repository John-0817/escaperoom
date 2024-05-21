interface FakeItem {
  src: string;
  width: number;
  height: number;
  alt: string;
  description: string;
}

interface RealItem {
  id: number;
  name: string;
  scr: string;
  width: number;
  height: number;
  alt: string;
  isVisible: boolean;
  isCorrect: boolean;
  description: string;
  conditionalDescription: string;
  type: 'quiz' | 'click' | 'prerequisite';
  ans: string
}

interface RenderComponentProps {
  fakeItems: { [key: string]: FakeItem };
  realItems: RealItem[];
  showModal: (content: React.ReactNode) => void;
  closeModal: () => void;
  updateItem: (id: number, update: Partial<RealItem>) => void;
}

interface RenderMainPageProps {
  fakeItems: { [key: string]: FakeItem };
  initialRealItems: RealItem[];
}

interface ModalProps {
  isModalVisible: boolean;
  modalContent: React.ReactNode;
  closeModal: () => void;
}