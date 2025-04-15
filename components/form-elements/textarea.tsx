interface TextAreaProps {
  id:  string | undefined;
  label: string;
  placeholder: string
}

export function Textarea ({id, label, placeholder}: TextAreaProps) {
  return (
    <div className="field">
      <label className="label">{label}</label>
      <div className="control">
        <textarea id={id} className="textarea" placeholder={placeholder}></textarea>
      </div>
    </div>
  )
}
