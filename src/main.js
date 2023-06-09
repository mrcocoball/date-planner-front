import App from './App.svelte'
import './styles/button.css'
import './styles/layout.css'
import './styles/place.css'
import './styles/plan.css'
import './styles/bookmark.css'
import './styles/review.css'
import './styles/mypages.css'
import './styles/support.css'
import './styles/announcement.css'
import './styles/faq.css'
import './styles/qna.css'
import './styles/main.css'
import { auth } from './store/auth/authStore'

await auth.refresh()

const app = new App({
  target: document.getElementById('app'),
})

export default app
