import clsx from 'clsx';

export interface ButtonProps {
  /** Is this the principal call to action on the page? */
  primary?: boolean;
  /** What background color to use */
  backgroundColor?: string;
  /** How large should the button be? */
  size?: 'small' | 'medium' | 'large';
  /** Button contents */
  label: string;
  /** Optional click handler */
  onClick?: () => void;
}

/** Primary UI component for user interaction */
export const Button = ({
  primary = false,
  size = 'medium',
  backgroundColor,
  label,
  ...props
}: ButtonProps) => {
  return (
    <button
      type="button"
      style={{ backgroundColor }}
      className={clsx(
        'inline-block cursor-pointer rounded-full font-bold leading-none border-0 transition-colors',
        {
          // primary — plum fill
          'bg-primary-900 text-white hover:bg-primary-700 active:bg-primary-800':
            primary,
          // secondary — black outline
          'bg-secondary-500 text-white  hover:bg-secondary-700 active:bg-secondary-700':
            !primary,
        },
        {
          'px-4 py-2 text-xs':    size === 'small',
          'px-5 py-[11px] text-sm': size === 'medium',
          'px-6 py-3 text-base':  size === 'large',
        },
      )}
      {...props}
    >
      {label}
    </button>
  );
};
