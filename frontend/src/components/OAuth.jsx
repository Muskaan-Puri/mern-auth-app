import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth'
import { app } from '../firebase'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { signinSuccess } from '../redux/user/userSlice'

const OAuth = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleGoogleAuth = async () => {
    try {
      const provider = new GoogleAuthProvider()
      const auth = getAuth(app)
      const result = await signInWithPopup(auth, provider)
      const resp = await axios.post('/auth/google', {
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
      })
      dispatch(signinSuccess(resp))
      navigate('/')
    } catch (error) {
      console.log('Could not login with google!', error)
    }
  }

  return (
    <button
      type="button"
      onClick={handleGoogleAuth}
      className="bg-red-700 text-white rounded-lg p-3 uppercase hover:opacity-95"
    >
      Continue with google
    </button>
  )
}
export default OAuth
