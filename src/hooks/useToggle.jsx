const { useState } = require("react")

const useToggle = () => {
    const [status, setStatus] = useState()
    const toggleStatus = () => setStatus(prev => !prev)

    return { status, toggleStatus }
}

export default useToggle