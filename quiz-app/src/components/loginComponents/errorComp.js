export default function CreateError({ user, error }) {
    if (error && user) {
        return (
            <label
            className="error-text">{error}</label>
        )
    }
    return null
}