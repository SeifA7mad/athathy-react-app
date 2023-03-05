import { Divider } from 'antd';

interface HeadingProps {
  tile: string;
  subTitle?: string;
  wrapperClassName?: string;
  titleClassName?: string;
  dividerClassName?: string;
}

const Heading = ({
  tile,
  subTitle,
  wrapperClassName,
  titleClassName,
  dividerClassName
}: HeadingProps) => {
  const headingTitle = tile.split(' ');

  return (
    <div
      className={`flex flex-col justify-center items-center gap-y-7 ${wrapperClassName}`}
    >
      <div className="flex flex-col text-center gap-y-3 max-w-xl">
        <h1 className={`font-bold text-4xl text-OuterSpace ${titleClassName}`}>
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
        className={`!m-0 border-turkishRose border-2 rounded w-96 !min-w-0 ${dividerClassName}`}
      />
    </div>
  );
};

export default Heading;
