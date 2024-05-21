import Image from 'next/image';

interface FakeProps{
  src: string;
  width: number;
  height: number;
  alt: string;
  handleShowModalFake: () => void;
}

interface RealProps{
  src: string;
  width: number;
  height: number;
  alt: string;
  handleShowModalReal: () => void;
}

export function FakeItem({
  src,
  width,
  height,
  alt,
  handleShowModalFake,
}: FakeProps) {

  return(
    <button onClick={handleShowModalFake}>
      <Image 
        src={src}
        width={width}
        height={height}
        alt={alt}
      />
    </button>
  )
}

export function RealItem({
  src,
  width,
  height,
  alt,
  handleShowModalReal,
}: RealProps) {

  return(
    <button onClick={handleShowModalReal}>
      <Image 
        src={src}
        width={width}
        height={height}
        alt={alt}
      />
    </button>
  )
}
