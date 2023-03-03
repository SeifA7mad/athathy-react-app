import { Link } from 'react-router-dom';

interface ViewAllLinkProps {
  to: string;
  className?: string;
}

const ViewAllLink = ({ to, className }: ViewAllLinkProps) => {
  return (
    <Link
      to={to}
      className={`underline underline-offset-2 text-whiteSmoke font-medium ${className}`}
    >
      View All
    </Link>
  );
};

export default ViewAllLink;
