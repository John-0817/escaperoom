import Image from 'next/image';

export function FakeItem(props: FakeItemProps) {
  const { src, width, height, alt, handleShowModalFake } = props;

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

export function RealItem(props: RealItemProps) {
  const { src, width, height, alt, handleShowModalReal } = props;

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


export function PrerequisiteItem(props: PrerequisiteItemProps) {
  const { src, width, height, alt, handleShowModalPrerequisite } = props;

  return(
    <button onClick={handleShowModalPrerequisite}>
      <Image 
        src={src}
        width={width}
        height={height}
        alt={alt}
      />
    </button>
  )
}


