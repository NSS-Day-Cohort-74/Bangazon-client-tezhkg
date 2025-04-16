import React from 'react';

// Define the interface for option objects
interface Option {
  id: string | number;
  name: string;
}

// Define the props interface for the Select component
interface SelectProps {
  id?: string;
  refEl: React.RefObject<HTMLSelectElement>;
  options: Option[];
  title: string;
  label?: string;
  addlClass?: string;
}

export function Select({
  id,
  refEl,
  options,
  title,
  label,
  addlClass = ""
}: SelectProps): JSX.Element {
  return (
    <div className="field is-expanded">
      {label ? <label className="label">{label}</label> : <></>}
      <div className={`select ${addlClass} is-fullwidth`}>
        <select id={id} ref={refEl}>
          <option value="0">{title}</option>
          {
            options.map(option => (
              <option key={option.id} value={option.id}>{option.name}</option>
            ))
          }
        </select>
      </div>
    </div>
  )
}