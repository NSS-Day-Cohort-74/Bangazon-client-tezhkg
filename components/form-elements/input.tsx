import React, { ChangeEvent, ReactNode } from 'react';

interface InputProps {
  id?: number;
  type?: string;
  placeholder?: string;
  refEl?: React.RefObject<HTMLInputElement>;
  label?: string;
  onChangeEvent?: (e: ChangeEvent<HTMLInputElement>) => void;
  addlClass?: string;
  children?: ReactNode;
  extra?: ReactNode;
}

export function Input({ 
  id, 
  type = "text", 
  placeholder = "", 
  refEl, 
  label, 
  onChangeEvent, 
  addlClass = "", 
  children,
  extra
}: InputProps): JSX.Element {
  return (
    <div className={`field ${addlClass}`}>
      {label && <label className="label">{label}</label>}
      <div className="control">
        <input
          id={id}
          placeholder={placeholder}
          className="input"
          type={type}
          ref={refEl}
          onChange={onChangeEvent}
        ></input>
        {extra}
      </div>
      {children}
    </div>
  )
}