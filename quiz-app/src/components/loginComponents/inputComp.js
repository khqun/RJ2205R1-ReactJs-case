export default function CreateInput({ inpName, inpValue, inpChange, inpType, inpError }) {
    return (
        <input
            className={`form-control ${inpError ? 'error' : ''}`}
            required
            type={inpType || 'text'}
            name={inpName}
            value={inpValue || ''}
            onChange={inpChange} />
    )
}
