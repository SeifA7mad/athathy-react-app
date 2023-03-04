import { Divider } from 'antd';

interface HeadingProps {
  tile: string;
  subTitle?: string;
  className?: string;
  dividerClassName?: string;
}

const Heading = ({
  tile,
  className,
  subTitle,
  dividerClassName
}: HeadingProps) => {
  const headingTitle = tile.split(' ');

  return (
    <div
      className={`flex flex-col justify-center items-center gap-y-7 ${className}`}
    >
      <div className="flex flex-col text-center gap-y-3 max-w-xl">
        <h1 className="font-bold text-4xl text-OuterSpace">
          {headingTitle.slice(0, headingTitle.length - 1).join(' ')}{' '}
          <span className="text-turkishRose">
            {headingTitle.slice(headingTitle.length - 1)}
          </span>
        </h1>
        {subTitle && (
          <h2 className="text-whiteSmoke font-semibold text-2xl">{subTitle}</h2>
        )}
      </div>
      <Divider
        className={`!m-0 border-turkishRose border-2 rounded max-w-sm !min-w-0 ${dividerClassName}`}
      />
    </div>
  );
};

export default Heading;
