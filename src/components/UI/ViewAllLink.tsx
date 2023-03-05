import { Link } from 'react-router-dom';

interface ViewAllLinkProps {
  to: string;
  className?: string;
  children?: React.ReactNode;
}

const ViewAllLink = ({ to, className, children }: ViewAllLinkProps) => {
  return (
    <Link
      to={to}
      className={`underline underline-offset-2 text-whiteSmoke hover:text-turkishRose font-medium flex items-center gap-x-3 ${className}`}
    >
      View All {children}
    </Link>
  );
};

export default ViewAllLink;
