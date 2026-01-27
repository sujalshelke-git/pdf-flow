// import { ArrowRight } from 'lucide-react';

// interface ActionButtonProps {
//   children: React.ReactNode;
//   onClick?: () => void;
//   disabled?: boolean;
// }

// const ActionButton = ({ children, onClick, disabled = false }: ActionButtonProps) => {
//   return (
//     <button
//       onClick={onClick}
//       disabled={disabled}
//       className={`relative group px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 overflow-hidden ${
//         disabled
//           ? 'bg-muted text-muted-foreground cursor-not-allowed'
//           : 'bg-gradient-brand text-white hover:scale-105 active:scale-95'
//       }`}
//     >
//       {/* Shine effect */}
//       {!disabled && (
//         <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//           <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
//         </div>
//       )}

//       {/* Content */}
//       <span className="relative z-10 flex items-center justify-center gap-2">
//         {children}
//         {!disabled && (
//           <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
//         )}
//       </span>

//       {/* Glow effect */}
//       {!disabled && (
//         <div className="absolute inset-0 rounded-2xl glow-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
//       )}
//     </button>
//   );
// };

// export default ActionButton;

import { ArrowRight } from 'lucide-react';

interface ActionButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const ActionButton = ({
  children,
  onClick,
  disabled = false,
  className = '',
}: ActionButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`relative group px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 overflow-hidden
        ${
          disabled
            ? 'bg-muted text-muted-foreground cursor-not-allowed'
            : 'bg-gradient-brand text-white hover:scale-105 active:scale-95'
        }
        ${className}
      `}
    >
      {/* Shine effect */}
      {!disabled && (
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
        </div>
      )}

      {/* Content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
        {!disabled && (
          <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
        )}
      </span>

      {/* Glow */}
      {!disabled && (
        <div className="absolute inset-0 rounded-2xl glow-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
      )}
    </button>
  );
};

export default ActionButton;
