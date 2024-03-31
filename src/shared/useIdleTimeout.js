import { logout } from "@/containers/App/auth";
import { useState } from "react"
import { useIdleTimer } from "react-idle-timer"

/**
 * @param onActive - Function to call when user becomes active.
 * @param onPrompt - Function to be called after the user becomes idle.
 */
const useIdleTimeout = ({ onActive, onPrompt, timeout, promptBeforeIdle }) => {
    const [isIdle, setIdle] = useState(false)
    const handleIdle = () => {
        setIdle(true)
        logout(true)
    }
    const idleTimer = useIdleTimer({
        timeout,
        onActive,
        onPrompt,
        onIdle : handleIdle,
        stopOnIdle: true,
        startManually: true,
        promptBeforeIdle,
        debounce: 500
    })
    return {
        isIdle,
        setIdle,
        idleTimer
    }
}
export default useIdleTimeout;