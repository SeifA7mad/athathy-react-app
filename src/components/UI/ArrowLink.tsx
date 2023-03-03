interface ArrowLinkProps {
  className?: string;
}

const ArrowLink = ({ className }: ArrowLinkProps) => {
  const arrowShape = `before:content[''] after:content[''] before:h-[1px] after:h-[1px] 
  before:bg-OuterSpace after:bg-OuterSpace before:absolute after:absolute 
  before:top-0 after:top-0 before:right-0 after:right-0 before:w-1 after:w-1 `;
  return (
    <span
      className={`block cursor-pointer w-16 h-[1px] relative bg-OuterSpace ${arrowShape} 
      before:origin-top-right before:rotate-45
      after:origin-bottom-right after:-rotate-45 ${className} `}
    />
  );
};

export default ArrowLink;
