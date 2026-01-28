// import { ArrowRight } from 'lucide-react';

// interface ActionButtonProps {
//   children: React.ReactNode;
//   onClick?: () => void;
//   disabled?: boolean;
//   className?: string;
// }

// const ActionButton = ({
//   children,
//   onClick,
//   disabled = false,
//   className = '',
// }: ActionButtonProps) => {
//   return (
//     <button
//       onClick={onClick}
//       disabled={disabled}
//       className={`relative group px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 overflow-hidden
//         ${
//           disabled
//             ? 'bg-muted text-muted-foreground cursor-not-allowed'
//             : 'bg-gradient-brand text-white hover:scale-105 active:scale-95'
//         }
//         ${className}
//       `}
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

//       {/* Glow */}
//       {!disabled && (
//         <div className="absolute inset-0 rounded-2xl glow-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
//       )}
//     </button>
//   );
// };

// export default ActionButton;

import { ArrowRight, Loader2 } from 'lucide-react';

interface ActionButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  loading?: boolean;
}

const ActionButton = ({
  children,
  onClick,
  disabled = false,
  loading = false,
  className = '',
}: ActionButtonProps) => {
  const isDisabled = disabled || loading;

  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={`relative group px-8 py-4 rounded-2xl font-semibold text-lg overflow-hidden
        transition-all duration-300
        ${
          isDisabled
            ? 'bg-muted text-muted-foreground cursor-not-allowed'
            : 'bg-gradient-brand text-white hover:scale-105 active:scale-95'
        }
        ${className}
      `}
    >
      {/* Animated loading stripe (NOT full overlay) */}
      {loading && (
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-white/30 blur-sm animate-loading-bar z-10" />
      )}

      {/* Shine effect (only when idle) */}
      {!isDisabled && (
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
        </div>
      )}

      {/* Content */}
      <span className="relative z-20 flex items-center justify-center  gap-2">
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Processing...</span>
          </>
        ) : (
          <>
            {children}
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </>
        )}
      </span>

      {/* Glow */}
      {!isDisabled && (
        <div className="absolute inset-0 rounded-2xl glow-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
      )}
    </button>
  );
};

export default ActionButton;
